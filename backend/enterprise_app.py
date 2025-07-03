
from flask import Flask, request, jsonify, abort
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity, get_jwt
import psycopg2
from psycopg2.extras import RealDictCursor
import bcrypt
from datetime import datetime, timedelta
import os
from dotenv import load_dotenv
from functools import wraps

load_dotenv()

app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'your-secret-key-here')
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=24)

jwt = JWTManager(app)
CORS(app, origins=["http://localhost:5173"])

# Database configuration
DB_CONFIG = {
    'host': os.getenv('DB_HOST', 'localhost'),
    'database': os.getenv('DB_NAME', 'zapcom_resource_db'),
    'user': os.getenv('DB_USER', 'postgres'),
    'password': os.getenv('DB_PASSWORD', 'password'),
    'port': os.getenv('DB_PORT', '5432')
}

def get_db_connection():
    """Get database connection"""
    try:
        conn = psycopg2.connect(**DB_CONFIG)
        return conn
    except Exception as e:
        print(f"Database connection error: {e}")
        return None

# Role-based access control decorators
def require_role(*allowed_roles):
    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            claims = get_jwt()
            user_role = claims.get('role')
            if user_role not in allowed_roles:
                return jsonify({'message': 'Access denied'}), 403
            return f(*args, **kwargs)
        return decorated_function
    return decorator

# Authentication Routes
@app.route('/api/auth/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')
        
        if not email or not password:
            return jsonify({'message': 'Email and password required'}), 400
        
        conn = get_db_connection()
        if not conn:
            return jsonify({'message': 'Database connection failed'}), 500
            
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
        user = cursor.fetchone()
        
        if user and bcrypt.checkpw(password.encode('utf-8'), user['password_hash'].encode('utf-8')):
            access_token = create_access_token(
                identity=user['id'],
                additional_claims={
                    'email': user['email'],
                    'role': user['role']
                }
            )
            
            return jsonify({
                'access_token': access_token,
                'user': {
                    'id': user['id'],
                    'name': user['name'],
                    'email': user['email'],
                    'role': user['role']
                }
            }), 200
        else:
            return jsonify({'message': 'Invalid credentials'}), 401
            
    except Exception as e:
        return jsonify({'message': f'Login error: {str(e)}'}), 500
    finally:
        if conn:
            conn.close()

# Dashboard Overview Routes
@app.route('/api/dashboard/overview', methods=['GET'])
@jwt_required()
def get_dashboard_overview():
    try:
        claims = get_jwt()
        user_role = claims.get('role')
        
        conn = get_db_connection()
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        
        # Common metrics for all roles
        overview = {}
        
        # Project health summary
        cursor.execute("""
            SELECT 
                COUNT(*) as total_projects,
                COUNT(CASE WHEN health_status = 'Green' THEN 1 END) as green_projects,
                COUNT(CASE WHEN health_status = 'Yellow' THEN 1 END) as yellow_projects,
                COUNT(CASE WHEN health_status = 'Red' THEN 1 END) as red_projects,
                AVG(health_score) as avg_health_score
            FROM projects WHERE is_active = TRUE
        """)
        overview['project_health'] = cursor.fetchone()
        
        # Resource utilization
        cursor.execute("""
            SELECT 
                COUNT(*) as total_resources,
                COUNT(CASE WHEN status = 'Billable' THEN 1 END) as billable_resources,
                COUNT(CASE WHEN status = 'Benched' THEN 1 END) as benched_resources,
                ROUND(COUNT(CASE WHEN status = 'Billable' THEN 1 END)::decimal / COUNT(*) * 100, 2) as utilization_rate
            FROM resources WHERE is_active = TRUE
        """)
        overview['resource_utilization'] = cursor.fetchone()
        
        # Deliverables summary
        cursor.execute("""
            SELECT 
                COUNT(*) as total_deliverables,
                COUNT(CASE WHEN status = 'Completed' THEN 1 END) as completed_deliverables,
                COUNT(CASE WHEN status = 'Delayed' THEN 1 END) as delayed_deliverables,
                COUNT(CASE WHEN due_date < CURRENT_DATE AND status != 'Completed' THEN 1 END) as overdue_deliverables
            FROM deliverables
        """)
        overview['deliverables'] = cursor.fetchone()
        
        # Engineering metrics
        cursor.execute("""
            SELECT 
                AVG(code_quality_score) as avg_code_quality,
                AVG(test_coverage) as avg_test_coverage,
                SUM(bugs_reported) as total_bugs_reported,
                SUM(bugs_resolved) as total_bugs_resolved
            FROM engineering_metrics 
            WHERE metric_date >= CURRENT_DATE - INTERVAL '30 days'
        """)
        overview['engineering_metrics'] = cursor.fetchone()
        
        # QA metrics
        cursor.execute("""
            SELECT 
                AVG(automation_coverage) as avg_automation_coverage,
                AVG(defect_removal_efficiency) as avg_defect_removal_efficiency,
                SUM(test_cases_total) as total_test_cases,
                SUM(test_cases_passed) as total_passed
            FROM qa_metrics 
            WHERE metric_date >= CURRENT_DATE - INTERVAL '30 days'
        """)
        overview['qa_metrics'] = cursor.fetchone()
        
        # Role-specific data
        if user_role in ['hr', 'leadership']:
            # Financial overview
            cursor.execute("""
                SELECT 
                    SUM(budget_allocated) as total_budget,
                    SUM(budget_utilized) as total_utilized,
                    SUM(revenue_generated) as total_revenue,
                    AVG(profit_margin) as avg_profit_margin,
                    AVG(burn_rate) as avg_burn_rate
                FROM financial_tracking 
                WHERE period_start >= CURRENT_DATE - INTERVAL '3 months'
            """)
            overview['financial'] = cursor.fetchone()
            
        if user_role == 'hr':
            # HR-specific metrics
            cursor.execute("""
                SELECT 
                    AVG(base_salary) as avg_salary,
                    AVG(total_compensation) as avg_total_compensation,
                    COUNT(*) as total_employees_with_salary
                FROM salary_details sd
                JOIN resources r ON sd.resource_id = r.id
                WHERE r.is_active = TRUE
            """)
            overview['hr_metrics'] = cursor.fetchone()
        
        return jsonify(overview), 200
        
    except Exception as e:
        return jsonify({'message': f'Error fetching dashboard overview: {str(e)}'}), 500
    finally:
        if conn:
            conn.close()

# Project Health Routes
@app.route('/api/projects/health', methods=['GET'])
@jwt_required()
def get_projects_health():
    try:
        conn = get_db_connection()
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        
        cursor.execute("""
            SELECT * FROM v_project_health 
            ORDER BY health_score DESC
        """)
        projects = cursor.fetchall()
        
        return jsonify([dict(project) for project in projects]), 200
        
    except Exception as e:
        return jsonify({'message': f'Error fetching project health: {str(e)}'}), 500
    finally:
        if conn:
            conn.close()

# Deliverables Routes
@app.route('/api/deliverables', methods=['GET'])
@jwt_required()
def get_deliverables():
    try:
        project_id = request.args.get('project_id')
        status = request.args.get('status')
        
        conn = get_db_connection()
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        
        query = """
            SELECT d.*, p.name as project_name, r.name as assigned_to_name
            FROM deliverables d
            LEFT JOIN projects p ON d.project_id = p.id
            LEFT JOIN resources r ON d.assigned_to = r.id
            WHERE 1=1
        """
        params = []
        
        if project_id:
            query += " AND d.project_id = %s"
            params.append(project_id)
            
        if status:
            query += " AND d.status = %s"
            params.append(status)
            
        query += " ORDER BY d.due_date"
        
        cursor.execute(query, params)
        deliverables = cursor.fetchall()
        
        return jsonify([dict(deliverable) for deliverable in deliverables]), 200
        
    except Exception as e:
        return jsonify({'message': f'Error fetching deliverables: {str(e)}'}), 500
    finally:
        if conn:
            conn.close()

# Engineering Metrics Routes
@app.route('/api/metrics/engineering', methods=['GET'])
@jwt_required()
def get_engineering_metrics():
    try:
        project_id = request.args.get('project_id')
        days = int(request.args.get('days', 30))
        
        conn = get_db_connection()
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        
        query = """
            SELECT em.*, p.name as project_name
            FROM engineering_metrics em
            LEFT JOIN projects p ON em.project_id = p.id
            WHERE em.metric_date >= CURRENT_DATE - INTERVAL '%s days'
        """
        params = [days]
        
        if project_id:
            query += " AND em.project_id = %s"
            params.append(project_id)
            
        query += " ORDER BY em.metric_date DESC, p.name"
        
        cursor.execute(query, params)
        metrics = cursor.fetchall()
        
        return jsonify([dict(metric) for metric in metrics]), 200
        
    except Exception as e:
        return jsonify({'message': f'Error fetching engineering metrics: {str(e)}'}), 500
    finally:
        if conn:
            conn.close()

# QA Metrics Routes
@app.route('/api/metrics/qa', methods=['GET'])
@jwt_required()
def get_qa_metrics():
    try:
        project_id = request.args.get('project_id')
        days = int(request.args.get('days', 30))
        
        conn = get_db_connection()
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        
        query = """
            SELECT qm.*, p.name as project_name
            FROM qa_metrics qm
            LEFT JOIN projects p ON qm.project_id = p.id
            WHERE qm.metric_date >= CURRENT_DATE - INTERVAL '%s days'
        """
        params = [days]
        
        if project_id:
            query += " AND qm.project_id = %s"
            params.append(project_id)
            
        query += " ORDER BY qm.metric_date DESC, p.name"
        
        cursor.execute(query, params)
        metrics = cursor.fetchall()
        
        return jsonify([dict(metric) for metric in metrics]), 200
        
    except Exception as e:
        return jsonify({'message': f'Error fetching QA metrics: {str(e)}'}), 500
    finally:
        if conn:
            conn.close()

# Escalations Routes
@app.route('/api/escalations', methods=['GET'])
@jwt_required()
def get_escalations():
    try:
        project_id = request.args.get('project_id')
        status = request.args.get('status', 'Open')
        
        conn = get_db_connection()
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        
        query = """
            SELECT e.*, p.name as project_name, 
                   rb.name as raised_by_name, ab.name as assigned_to_name
            FROM escalations e
            LEFT JOIN projects p ON e.project_id = p.id
            LEFT JOIN resources rb ON e.raised_by = rb.id
            LEFT JOIN resources ab ON e.assigned_to = ab.id
            WHERE e.status = %s
        """
        params = [status]
        
        if project_id:
            query += " AND e.project_id = %s"
            params.append(project_id)
            
        query += " ORDER BY e.raised_date DESC"
        
        cursor.execute(query, params)
        escalations = cursor.fetchall()
        
        return jsonify([dict(escalation) for escalation in escalations]), 200
        
    except Exception as e:
        return jsonify({'message': f'Error fetching escalations: {str(e)}'}), 500
    finally:
        if conn:
            conn.close()

# Financial Routes (HR and Leadership only)
@app.route('/api/financial/overview', methods=['GET'])
@jwt_required()
@require_role('hr', 'leadership')
def get_financial_overview():
    try:
        months = int(request.args.get('months', 6))
        
        conn = get_db_connection()
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        
        cursor.execute("""
            SELECT * FROM v_financial_summary 
            WHERE month >= CURRENT_DATE - INTERVAL '%s months'
            ORDER BY month DESC
        """, [months])
        financial_data = cursor.fetchall()
        
        return jsonify([dict(row) for row in financial_data]), 200
        
    except Exception as e:
        return jsonify({'message': f'Error fetching financial overview: {str(e)}'}), 500
    finally:
        if conn:
            conn.close()

# Department Performance Routes
@app.route('/api/departments/performance', methods=['GET'])
@jwt_required()
def get_department_performance():
    try:
        conn = get_db_connection()
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        
        cursor.execute("SELECT * FROM v_department_performance ORDER BY dept_health_score DESC")
        departments = cursor.fetchall()
        
        return jsonify([dict(dept) for dept in departments]), 200
        
    except Exception as e:
        return jsonify({'message': f'Error fetching department performance: {str(e)}'}), 500
    finally:
        if conn:
            conn.close()

# HR-specific Routes
@app.route('/api/hr/resources', methods=['GET'])
@jwt_required()
@require_role('hr')
def get_resources_with_salary():
    try:
        conn = get_db_connection()
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        
        cursor.execute("SELECT * FROM v_resource_performance_hr ORDER BY name")
        resources = cursor.fetchall()
        
        return jsonify([dict(resource) for resource in resources]), 200
        
    except Exception as e:
        return jsonify({'message': f'Error fetching HR resources: {str(e)}'}), 500
    finally:
        if conn:
            conn.close()

# Company KPIs Routes
@app.route('/api/kpis/company', methods=['GET'])
@jwt_required()
def get_company_kpis():
    try:
        days = int(request.args.get('days', 90))
        
        conn = get_db_connection()
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        
        cursor.execute("""
            SELECT * FROM company_kpis 
            WHERE kpi_date >= CURRENT_DATE - INTERVAL '%s days'
            ORDER BY kpi_date DESC
        """, [days])
        kpis = cursor.fetchall()
        
        return jsonify([dict(kpi) for kpi in kpis]), 200
        
    except Exception as e:
        return jsonify({'message': f'Error fetching company KPIs: {str(e)}'}), 500
    finally:
        if conn:
            conn.close()

# Health check
@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy', 'timestamp': datetime.utcnow().isoformat()}), 200

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
