
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
import psycopg2
from psycopg2.extras import RealDictCursor
import bcrypt
from datetime import datetime, timedelta
import os
from dotenv import load_dotenv

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

# Resource Management Routes
@app.route('/api/resources', methods=['GET'])
@jwt_required()
def get_resources():
    try:
        conn = get_db_connection()
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        
        query = """
        SELECT r.*, d.name as department_name,
               ARRAY_AGG(DISTINCT s.name) as skills
        FROM resources r
        LEFT JOIN departments d ON r.department_id = d.id
        LEFT JOIN resource_skills rs ON r.id = rs.resource_id
        LEFT JOIN skills s ON rs.skill_id = s.id
        GROUP BY r.id, d.name
        ORDER BY r.name
        """
        
        cursor.execute(query)
        resources = cursor.fetchall()
        
        return jsonify([dict(resource) for resource in resources]), 200
        
    except Exception as e:
        return jsonify({'message': f'Error fetching resources: {str(e)}'}), 500
    finally:
        if conn:
            conn.close()

@app.route('/api/resources', methods=['POST'])
@jwt_required()
def create_resource():
    try:
        data = request.get_json()
        user_id = get_jwt_identity()
        
        # Verify user has permission
        conn = get_db_connection()
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        cursor.execute("SELECT role FROM users WHERE id = %s", (user_id,))
        user = cursor.fetchone()
        
        if not user or user['role'] != 'resource_manager':
            return jsonify({'message': 'Unauthorized'}), 403
        
        # Insert resource
        insert_query = """
        INSERT INTO resources (name, email, department_id, role, status, level, 
                             salary, hire_date, manager_id, location, phone)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        RETURNING id
        """
        
        cursor.execute(insert_query, (
            data['name'], data['email'], data['department_id'], data['role'],
            data.get('status', 'Available'), data.get('level', 'Junior'),
            data.get('salary'), data.get('hire_date'), data.get('manager_id'),
            data.get('location'), data.get('phone')
        ))
        
        resource_id = cursor.fetchone()['id']
        
        # Add skills if provided
        if 'skills' in data and data['skills']:
            for skill_id in data['skills']:
                cursor.execute(
                    "INSERT INTO resource_skills (resource_id, skill_id) VALUES (%s, %s)",
                    (resource_id, skill_id)
                )
        
        conn.commit()
        return jsonify({'message': 'Resource created successfully', 'id': resource_id}), 201
        
    except Exception as e:
        conn.rollback()
        return jsonify({'message': f'Error creating resource: {str(e)}'}), 500
    finally:
        if conn:
            conn.close()

@app.route('/api/resources/<int:resource_id>', methods=['PUT'])
@jwt_required()
def update_resource(resource_id):
    try:
        data = request.get_json()
        user_id = get_jwt_identity()
        
        conn = get_db_connection()
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        
        # Verify permissions
        cursor.execute("SELECT role FROM users WHERE id = %s", (user_id,))
        user = cursor.fetchone()
        
        if not user or user['role'] != 'resource_manager':
            return jsonify({'message': 'Unauthorized'}), 403
        
        # Update resource
        update_query = """
        UPDATE resources SET 
            name = %s, email = %s, department_id = %s, role = %s,
            status = %s, level = %s, salary = %s, location = %s, phone = %s
        WHERE id = %s
        """
        
        cursor.execute(update_query, (
            data['name'], data['email'], data['department_id'], data['role'],
            data['status'], data['level'], data.get('salary'),
            data.get('location'), data.get('phone'), resource_id
        ))
        
        # Update skills
        if 'skills' in data:
            cursor.execute("DELETE FROM resource_skills WHERE resource_id = %s", (resource_id,))
            for skill_id in data['skills']:
                cursor.execute(
                    "INSERT INTO resource_skills (resource_id, skill_id) VALUES (%s, %s)",
                    (resource_id, skill_id)
                )
        
        conn.commit()
        return jsonify({'message': 'Resource updated successfully'}), 200
        
    except Exception as e:
        conn.rollback()
        return jsonify({'message': f'Error updating resource: {str(e)}'}), 500
    finally:
        if conn:
            conn.close()

# Project Management Routes
@app.route('/api/projects', methods=['GET'])
@jwt_required()
def get_projects():
    try:
        conn = get_db_connection()
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        
        query = """
        SELECT p.*, c.name as client_name, pm.name as manager_name,
               COUNT(pa.resource_id) as resource_count
        FROM projects p
        LEFT JOIN clients c ON p.client_id = c.id
        LEFT JOIN resources pm ON p.manager_id = pm.id
        LEFT JOIN project_allocations pa ON p.id = pa.project_id
        GROUP BY p.id, c.name, pm.name
        ORDER BY p.start_date DESC
        """
        
        cursor.execute(query)
        projects = cursor.fetchall()
        
        return jsonify([dict(project) for project in projects]), 200
        
    except Exception as e:
        return jsonify({'message': f'Error fetching projects: {str(e)}'}), 500
    finally:
        if conn:
            conn.close()

@app.route('/api/projects', methods=['POST'])
@jwt_required()
def create_project():
    try:
        data = request.get_json()
        user_id = get_jwt_identity()
        
        conn = get_db_connection()
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        
        # Verify permissions
        cursor.execute("SELECT role FROM users WHERE id = %s", (user_id,))
        user = cursor.fetchone()
        
        if not user or user['role'] != 'resource_manager':
            return jsonify({'message': 'Unauthorized'}), 403
        
        # Insert project
        insert_query = """
        INSERT INTO projects (name, description, client_id, manager_id, status,
                            start_date, end_date, budget, priority, technology_stack)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        RETURNING id
        """
        
        cursor.execute(insert_query, (
            data['name'], data.get('description'), data['client_id'],
            data['manager_id'], data.get('status', 'Planning'),
            data['start_date'], data['end_date'], data.get('budget'),
            data.get('priority', 'Medium'), data.get('technology_stack', [])
        ))
        
        project_id = cursor.fetchone()['id']
        conn.commit()
        
        return jsonify({'message': 'Project created successfully', 'id': project_id}), 201
        
    except Exception as e:
        conn.rollback()
        return jsonify({'message': f'Error creating project: {str(e)}'}), 500
    finally:
        if conn:
            conn.close()

# Allocation Routes
@app.route('/api/allocations', methods=['POST'])
@jwt_required()
def create_allocation():
    try:
        data = request.get_json()
        user_id = get_jwt_identity()
        
        conn = get_db_connection()
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        
        # Verify permissions
        cursor.execute("SELECT role FROM users WHERE id = %s", (user_id,))
        user = cursor.fetchone()
        
        if not user or user['role'] != 'resource_manager':
            return jsonify({'message': 'Unauthorized'}), 403
        
        # Create allocation
        insert_query = """
        INSERT INTO project_allocations (project_id, resource_id, allocation_percentage,
                                       start_date, end_date, role_in_project)
        VALUES (%s, %s, %s, %s, %s, %s)
        RETURNING id
        """
        
        cursor.execute(insert_query, (
            data['project_id'], data['resource_id'], data.get('allocation_percentage', 100),
            data['start_date'], data.get('end_date'), data.get('role_in_project')
        ))
        
        allocation_id = cursor.fetchone()['id']
        
        # Update resource status to Billable
        cursor.execute(
            "UPDATE resources SET status = 'Billable' WHERE id = %s",
            (data['resource_id'],)
        )
        
        conn.commit()
        return jsonify({'message': 'Allocation created successfully', 'id': allocation_id}), 201
        
    except Exception as e:
        conn.rollback()
        return jsonify({'message': f'Error creating allocation: {str(e)}'}), 500
    finally:
        if conn:
            conn.close()

# Analytics Routes
@app.route('/api/analytics/allocation', methods=['GET'])
@jwt_required()
def get_allocation_analytics():
    try:
        conn = get_db_connection()
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        
        # Monthly allocation trends
        allocation_query = """
        SELECT 
            DATE_TRUNC('month', CURRENT_DATE - INTERVAL '5 months' + INTERVAL '%s months') as month,
            SUM(CASE WHEN status = 'Billable' THEN 1 ELSE 0 END) as billable,
            SUM(CASE WHEN status = 'Benched' THEN 1 ELSE 0 END) as benched,
            SUM(CASE WHEN status = 'Shadow' THEN 1 ELSE 0 END) as shadow,
            SUM(CASE WHEN status = 'Associate' THEN 1 ELSE 0 END) as associate,
            COUNT(*) as total
        FROM resources
        GROUP BY month
        ORDER BY month
        """
        
        # Current status distribution
        status_query = """
        SELECT status, COUNT(*) as count,
               ROUND(COUNT(*)::decimal / (SELECT COUNT(*) FROM resources) * 100, 1) as percentage
        FROM resources
        GROUP BY status
        ORDER BY count DESC
        """
        
        cursor.execute(status_query)
        status_data = cursor.fetchall()
        
        # Department utilization
        dept_query = """
        SELECT d.name as department,
               COUNT(r.id) as total,
               SUM(CASE WHEN r.status = 'Billable' THEN 1 ELSE 0 END) as billable,
               ROUND(
                   SUM(CASE WHEN r.status = 'Billable' THEN 1 ELSE 0 END)::decimal / 
                   NULLIF(COUNT(r.id), 0) * 100, 1
               ) as utilization
        FROM departments d
        LEFT JOIN resources r ON d.id = r.department_id
        GROUP BY d.name
        ORDER BY utilization DESC
        """
        
        cursor.execute(dept_query)
        dept_data = cursor.fetchall()
        
        return jsonify({
            'status_distribution': [dict(row) for row in status_data],
            'department_utilization': [dict(row) for row in dept_data]
        }), 200
        
    except Exception as e:
        return jsonify({'message': f'Error fetching analytics: {str(e)}'}), 500
    finally:
        if conn:
            conn.close()

@app.route('/api/analytics/skills', methods=['GET'])
@jwt_required()
def get_skills_analytics():
    try:
        conn = get_db_connection()
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        
        query = """
        SELECT s.name as skill,
               COUNT(rs.resource_id) as count,
               s.market_demand,
               AVG(rs.proficiency_level) as avg_proficiency
        FROM skills s
        LEFT JOIN resource_skills rs ON s.id = rs.skill_id
        GROUP BY s.id, s.name, s.market_demand
        HAVING COUNT(rs.resource_id) > 0
        ORDER BY count DESC
        LIMIT 20
        """
        
        cursor.execute(query)
        skills_data = cursor.fetchall()
        
        return jsonify([dict(row) for row in skills_data]), 200
        
    except Exception as e:
        return jsonify({'message': f'Error fetching skills analytics: {str(e)}'}), 500
    finally:
        if conn:
            conn.close()

@app.route('/api/analytics/bench', methods=['GET'])
@jwt_required()
def get_bench_analytics():
    try:
        conn = get_db_connection()
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        
        # Bench reasons and counts
        bench_query = """
        SELECT bench_reason as reason,
               COUNT(*) as count,
               ROUND(COUNT(*)::decimal / (SELECT COUNT(*) FROM resources WHERE status = 'Benched') * 100, 1) as percentage,
               AVG(EXTRACT(days FROM (CURRENT_DATE - bench_start_date))) as avg_days
        FROM resources
        WHERE status = 'Benched' AND bench_reason IS NOT NULL
        GROUP BY bench_reason
        ORDER BY count DESC
        """
        
        cursor.execute(bench_query)
        bench_data = cursor.fetchall()
        
        # Bench cost calculation
        cost_query = """
        SELECT SUM(salary / 12) as monthly_cost
        FROM resources
        WHERE status = 'Benched' AND salary IS NOT NULL
        """
        
        cursor.execute(cost_query)
        cost_data = cursor.fetchone()
        
        return jsonify({
            'bench_breakdown': [dict(row) for row in bench_data],
            'monthly_cost': float(cost_data['monthly_cost']) if cost_data['monthly_cost'] else 0
        }), 200
        
    except Exception as e:
        return jsonify({'message': f'Error fetching bench analytics: {str(e)}'}), 500
    finally:
        if conn:
            conn.close()

# Utility Routes
@app.route('/api/departments', methods=['GET'])
@jwt_required()
def get_departments():
    try:
        conn = get_db_connection()
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        
        cursor.execute("SELECT * FROM departments ORDER BY name")
        departments = cursor.fetchall()
        
        return jsonify([dict(dept) for dept in departments]), 200
        
    except Exception as e:
        return jsonify({'message': f'Error fetching departments: {str(e)}'}), 500
    finally:
        if conn:
            conn.close()

@app.route('/api/skills', methods=['GET'])
@jwt_required()
def get_skills():
    try:
        conn = get_db_connection()
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        
        cursor.execute("SELECT * FROM skills ORDER BY name")
        skills = cursor.fetchall()
        
        return jsonify([dict(skill) for skill in skills]), 200
        
    except Exception as e:
        return jsonify({'message': f'Error fetching skills: {str(e)}'}), 500
    finally:
        if conn:
            conn.close()

@app.route('/api/clients', methods=['GET'])
@jwt_required()
def get_clients():
    try:
        conn = get_db_connection()
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        
        cursor.execute("SELECT * FROM clients ORDER BY name")
        clients = cursor.fetchall()
        
        return jsonify([dict(client) for client in clients]), 200
        
    except Exception as e:
        return jsonify({'message': f'Error fetching clients: {str(e)}'}), 500
    finally:
        if conn:
            conn.close()

# Health check
@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy', 'timestamp': datetime.utcnow().isoformat()}), 200

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
