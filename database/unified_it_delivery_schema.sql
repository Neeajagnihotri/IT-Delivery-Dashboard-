
-- =============================================================================
-- IT DELIVERY DASHBOARD - UNIFIED DATABASE SCHEMA
-- PostgreSQL Database Schema for Complete IT Delivery Management System
-- =============================================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Drop existing tables if they exist (for clean setup)
DROP TABLE IF EXISTS audit_logs CASCADE;
DROP TABLE IF EXISTS time_entries CASCADE;
DROP TABLE IF EXISTS resource_availability CASCADE;
DROP TABLE IF EXISTS performance_reviews CASCADE;
DROP TABLE IF EXISTS project_allocations CASCADE;
DROP TABLE IF EXISTS resource_skills CASCADE;
DROP TABLE IF EXISTS deliverables CASCADE;
DROP TABLE IF EXISTS engineering_metrics CASCADE;
DROP TABLE IF EXISTS qa_metrics CASCADE;
DROP TABLE IF EXISTS escalations CASCADE;
DROP TABLE IF EXISTS financial_tracking CASCADE;
DROP TABLE IF EXISTS salary_details CASCADE;
DROP TABLE IF EXISTS company_kpis CASCADE;
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS resources CASCADE;
DROP TABLE IF EXISTS clients CASCADE;
DROP TABLE IF EXISTS skills CASCADE;
DROP TABLE IF EXISTS departments CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- =============================================================================
-- CORE SYSTEM TABLES
-- =============================================================================

-- Users table for authentication and system access
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    uuid UUID DEFAULT uuid_generate_v4() UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'user',
    is_active BOOLEAN DEFAULT TRUE,
    last_login TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT chk_user_role CHECK (role IN ('hr', 'resource_manager', 'leadership', 'delivery_owner', 'admin'))
);

-- Departments table for organizational structure
CREATE TABLE departments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    head_id INTEGER,
    budget_allocated DECIMAL(15,2) DEFAULT 0,
    budget_utilized DECIMAL(15,2) DEFAULT 0,
    burn_rate DECIMAL(10,2) DEFAULT 0,
    health_score INTEGER DEFAULT 85,
    location VARCHAR(100),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT chk_health_score CHECK (health_score >= 0 AND health_score <= 100)
);

-- Skills catalog for competency tracking
CREATE TABLE skills (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    category VARCHAR(50) NOT NULL,
    description TEXT,
    market_demand INTEGER DEFAULT 50,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT chk_market_demand CHECK (market_demand >= 0 AND market_demand <= 100),
    CONSTRAINT chk_skill_category CHECK (category IN ('Frontend', 'Backend', 'DevOps', 'Cloud', 'Database', 'Mobile', 'AI/ML', 'Design', 'Management', 'Testing'))
);

-- Clients table for customer management
CREATE TABLE clients (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    contact_person VARCHAR(100),
    email VARCHAR(255),
    phone VARCHAR(20),
    address TEXT,
    industry VARCHAR(100),
    tier VARCHAR(20) DEFAULT 'Standard',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT chk_client_tier CHECK (tier IN ('Standard', 'Premium', 'Enterprise'))
);

-- =============================================================================
-- RESOURCE MANAGEMENT TABLES
-- =============================================================================

-- Resources table (main employee/contractor table)
CREATE TABLE resources (
    id SERIAL PRIMARY KEY,
    employee_id VARCHAR(20) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    department_id INTEGER REFERENCES departments(id),
    role VARCHAR(100) NOT NULL,
    level VARCHAR(50) DEFAULT 'Junior',
    status VARCHAR(50) DEFAULT 'Available',
    hire_date DATE,
    manager_id INTEGER REFERENCES resources(id),
    location VARCHAR(100),
    bench_reason TEXT,
    bench_start_date DATE,
    shadow_progress INTEGER DEFAULT 0,
    shadow_status VARCHAR(50) DEFAULT 'Not Applicable',
    performance_rating DECIMAL(3,2) DEFAULT 3.0,
    billable_rate DECIMAL(10,2),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT chk_resource_status CHECK (status IN ('Billable', 'Benched', 'Shadow', 'Associate', 'Available', 'On Leave')),
    CONSTRAINT chk_resource_level CHECK (level IN ('Junior', 'Mid', 'Senior', 'Lead', 'Principal', 'Architect')),
    CONSTRAINT chk_shadow_status CHECK (shadow_status IN ('Not Applicable', 'Observation', 'Learning', 'Transition', 'Completed')),
    CONSTRAINT chk_shadow_progress CHECK (shadow_progress >= 0 AND shadow_progress <= 100),
    CONSTRAINT chk_performance_rating CHECK (performance_rating >= 1.0 AND performance_rating <= 5.0)
);

-- Resource Skills mapping (many-to-many)
CREATE TABLE resource_skills (
    id SERIAL PRIMARY KEY,
    resource_id INTEGER NOT NULL REFERENCES resources(id) ON DELETE CASCADE,
    skill_id INTEGER NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
    proficiency_level INTEGER DEFAULT 3,
    years_experience DECIMAL(3,1) DEFAULT 0,
    last_used DATE,
    is_certified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT chk_proficiency_level CHECK (proficiency_level >= 1 AND proficiency_level <= 5),
    UNIQUE(resource_id, skill_id)
);

-- Salary information (HR access only)
CREATE TABLE salary_details (
    id SERIAL PRIMARY KEY,
    resource_id INTEGER NOT NULL REFERENCES resources(id) ON DELETE CASCADE,
    base_salary DECIMAL(12,2) NOT NULL,
    bonus DECIMAL(12,2) DEFAULT 0,
    benefits DECIMAL(12,2) DEFAULT 0,
    total_compensation DECIMAL(12,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    effective_date DATE NOT NULL,
    review_date DATE,
    grade_level VARCHAR(10),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================================================
-- PROJECT MANAGEMENT TABLES
-- =============================================================================

-- Projects table
CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    client_id INTEGER NOT NULL REFERENCES clients(id),
    manager_id INTEGER REFERENCES resources(id),
    status VARCHAR(50) DEFAULT 'Planning',
    priority VARCHAR(20) DEFAULT 'Medium',
    health_score INTEGER DEFAULT 85,
    health_status VARCHAR(10) DEFAULT 'Green',
    delivery_risk VARCHAR(20) DEFAULT 'Low',
    escalation_count INTEGER DEFAULT 0,
    last_escalation_date DATE,
    start_date DATE NOT NULL,
    end_date DATE,
    actual_end_date DATE,
    budget DECIMAL(15,2),
    actual_cost DECIMAL(15,2) DEFAULT 0,
    progress_percentage INTEGER DEFAULT 0,
    technology_stack TEXT[],
    methodology VARCHAR(50) DEFAULT 'Agile',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT chk_project_status CHECK (status IN ('Planning', 'Active', 'On Hold', 'Completed', 'Cancelled')),
    CONSTRAINT chk_project_priority CHECK (priority IN ('Low', 'Medium', 'High', 'Critical')),
    CONSTRAINT chk_project_health_status CHECK (health_status IN ('Green', 'Yellow', 'Red')),
    CONSTRAINT chk_delivery_risk CHECK (delivery_risk IN ('Low', 'Medium', 'High', 'Critical')),
    CONSTRAINT chk_project_health_score CHECK (health_score >= 0 AND health_score <= 100),
    CONSTRAINT chk_progress_percentage CHECK (progress_percentage >= 0 AND progress_percentage <= 100),
    CONSTRAINT chk_project_dates CHECK (end_date IS NULL OR start_date <= end_date)
);

-- Project resource allocations
CREATE TABLE project_allocations (
    id SERIAL PRIMARY KEY,
    project_id INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    resource_id INTEGER NOT NULL REFERENCES resources(id) ON DELETE CASCADE,
    allocation_percentage INTEGER DEFAULT 100,
    start_date DATE NOT NULL,
    end_date DATE,
    actual_end_date DATE,
    role_in_project VARCHAR(100),
    hourly_rate DECIMAL(8,2),
    total_hours_allocated INTEGER,
    total_hours_worked INTEGER DEFAULT 0,
    efficiency_rating DECIMAL(3,2) DEFAULT 3.0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT chk_allocation_percentage CHECK (allocation_percentage > 0 AND allocation_percentage <= 100),
    CONSTRAINT chk_allocation_dates CHECK (end_date IS NULL OR start_date <= end_date),
    CONSTRAINT chk_allocation_efficiency CHECK (efficiency_rating >= 1.0 AND efficiency_rating <= 5.0),
    UNIQUE(project_id, resource_id, start_date)
);

-- Deliverables tracking
CREATE TABLE deliverables (
    id SERIAL PRIMARY KEY,
    project_id INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    due_date DATE NOT NULL,
    completion_date DATE,
    status VARCHAR(30) DEFAULT 'Pending',
    priority VARCHAR(20) DEFAULT 'Medium',
    assigned_to INTEGER REFERENCES resources(id),
    completion_percentage INTEGER DEFAULT 0,
    quality_score INTEGER DEFAULT 85,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT chk_deliverable_status CHECK (status IN ('Pending', 'In Progress', 'Completed', 'Delayed', 'Cancelled')),
    CONSTRAINT chk_deliverable_priority CHECK (priority IN ('Low', 'Medium', 'High', 'Critical')),
    CONSTRAINT chk_completion_percentage CHECK (completion_percentage >= 0 AND completion_percentage <= 100),
    CONSTRAINT chk_deliverable_quality_score CHECK (quality_score >= 0 AND quality_score <= 100)
);

-- =============================================================================
-- METRICS AND ANALYTICS TABLES
-- =============================================================================

-- Engineering metrics
CREATE TABLE engineering_metrics (
    id SERIAL PRIMARY KEY,
    project_id INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    metric_date DATE NOT NULL DEFAULT CURRENT_DATE,
    code_quality_score INTEGER DEFAULT 85,
    test_coverage DECIMAL(5,2) DEFAULT 80.0,
    bugs_reported INTEGER DEFAULT 0,
    bugs_resolved INTEGER DEFAULT 0,
    technical_debt_hours INTEGER DEFAULT 0,
    deployment_frequency INTEGER DEFAULT 0,
    lead_time_hours INTEGER DEFAULT 72,
    commits_count INTEGER DEFAULT 0,
    lines_of_code INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT chk_code_quality_score CHECK (code_quality_score >= 0 AND code_quality_score <= 100),
    CONSTRAINT chk_test_coverage CHECK (test_coverage >= 0 AND test_coverage <= 100)
);

-- QA metrics  
CREATE TABLE qa_metrics (
    id SERIAL PRIMARY KEY,
    project_id INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    metric_date DATE NOT NULL DEFAULT CURRENT_DATE,
    test_cases_total INTEGER DEFAULT 0,
    test_cases_passed INTEGER DEFAULT 0,
    test_cases_failed INTEGER DEFAULT 0,
    automation_coverage DECIMAL(5,2) DEFAULT 70.0,
    defect_density DECIMAL(8,2) DEFAULT 0.0,
    defect_removal_efficiency DECIMAL(5,2) DEFAULT 90.0,
    regression_test_time INTEGER DEFAULT 240,
    test_execution_rate DECIMAL(5,2) DEFAULT 95.0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT chk_qa_automation_coverage CHECK (automation_coverage >= 0 AND automation_coverage <= 100),
    CONSTRAINT chk_test_execution_rate CHECK (test_execution_rate >= 0 AND test_execution_rate <= 100)
);

-- Escalations tracking
CREATE TABLE escalations (
    id SERIAL PRIMARY KEY,
    project_id INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    severity VARCHAR(20) DEFAULT 'Medium',
    status VARCHAR(30) DEFAULT 'Open',
    raised_by INTEGER NOT NULL REFERENCES resources(id),
    assigned_to INTEGER REFERENCES resources(id),
    raised_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    resolved_date TIMESTAMP,
    resolution_time_hours INTEGER,
    impact_assessment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT chk_escalation_severity CHECK (severity IN ('Low', 'Medium', 'High', 'Critical')),
    CONSTRAINT chk_escalation_status CHECK (status IN ('Open', 'In Progress', 'Resolved', 'Closed'))
);

-- =============================================================================
-- FINANCIAL AND PERFORMANCE TRACKING
-- =============================================================================

-- Financial tracking (HR and Leadership access)
CREATE TABLE financial_tracking (
    id SERIAL PRIMARY KEY,
    project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
    department_id INTEGER REFERENCES departments(id) ON DELETE CASCADE,
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    budget_allocated DECIMAL(15,2) NOT NULL,
    budget_utilized DECIMAL(15,2) DEFAULT 0,
    revenue_generated DECIMAL(15,2) DEFAULT 0,
    profit_margin DECIMAL(5,2) DEFAULT 0,
    resource_cost DECIMAL(15,2) DEFAULT 0,
    operational_cost DECIMAL(15,2) DEFAULT 0,
    burn_rate DECIMAL(10,2) DEFAULT 0,
    forecast_completion_cost DECIMAL(15,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Company KPIs
CREATE TABLE company_kpis (
    id SERIAL PRIMARY KEY,
    kpi_date DATE NOT NULL DEFAULT CURRENT_DATE,
    total_employees INTEGER DEFAULT 0,
    billable_utilization DECIMAL(5,2) DEFAULT 75.0,
    revenue_per_employee DECIMAL(12,2) DEFAULT 0,
    project_success_rate DECIMAL(5,2) DEFAULT 85.0,
    client_satisfaction_score DECIMAL(3,1) DEFAULT 4.2,
    employee_satisfaction_score DECIMAL(3,1) DEFAULT 4.0,
    on_time_delivery_rate DECIMAL(5,2) DEFAULT 80.0,
    budget_variance DECIMAL(5,2) DEFAULT 5.0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================================================
-- TIME TRACKING AND AVAILABILITY
-- =============================================================================

-- Time tracking
CREATE TABLE time_entries (
    id SERIAL PRIMARY KEY,
    allocation_id INTEGER NOT NULL REFERENCES project_allocations(id) ON DELETE CASCADE,
    entry_date DATE NOT NULL,
    hours_worked DECIMAL(4,2) NOT NULL,
    description TEXT,
    task_type VARCHAR(50),
    is_billable BOOLEAN DEFAULT TRUE,
    is_approved BOOLEAN DEFAULT FALSE,
    approved_by INTEGER REFERENCES resources(id),
    approved_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT chk_hours_worked CHECK (hours_worked > 0 AND hours_worked <= 24)
);

-- Resource availability
CREATE TABLE resource_availability (
    id SERIAL PRIMARY KEY,
    resource_id INTEGER NOT NULL REFERENCES resources(id) ON DELETE CASCADE,
    start_date DATE NOT NULL,
    end_date DATE,
    availability_percentage INTEGER DEFAULT 100,
    reason TEXT,
    type VARCHAR(50) DEFAULT 'Available',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT chk_availability_percentage CHECK (availability_percentage >= 0 AND availability_percentage <= 100),
    CONSTRAINT chk_availability_type CHECK (type IN ('Available', 'Vacation', 'Sick Leave', 'Training', 'Other')),
    CONSTRAINT chk_availability_dates CHECK (end_date IS NULL OR start_date <= end_date)
);

-- Performance reviews
CREATE TABLE performance_reviews (
    id SERIAL PRIMARY KEY,
    resource_id INTEGER NOT NULL REFERENCES resources(id) ON DELETE CASCADE,
    reviewer_id INTEGER NOT NULL REFERENCES resources(id),
    review_period_start DATE NOT NULL,
    review_period_end DATE NOT NULL,
    overall_rating DECIMAL(3,2) NOT NULL,
    technical_skills_rating DECIMAL(3,2),
    communication_rating DECIMAL(3,2),
    leadership_rating DECIMAL(3,2),
    goals_achievements TEXT,
    areas_improvement TEXT,
    feedback TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT chk_overall_rating CHECK (overall_rating >= 1.0 AND overall_rating <= 5.0),
    CONSTRAINT chk_technical_rating CHECK (technical_skills_rating >= 1.0 AND technical_skills_rating <= 5.0),
    CONSTRAINT chk_communication_rating CHECK (communication_rating >= 1.0 AND communication_rating <= 5.0),
    CONSTRAINT chk_leadership_rating CHECK (leadership_rating >= 1.0 AND leadership_rating <= 5.0)
);

-- =============================================================================
-- AUDIT AND LOGGING
-- =============================================================================

-- Audit logs for compliance and tracking
CREATE TABLE audit_logs (
    id SERIAL PRIMARY KEY,
    table_name VARCHAR(50) NOT NULL,
    record_id INTEGER NOT NULL,
    action VARCHAR(20) NOT NULL,
    old_values JSONB,
    new_values JSONB,
    changed_by INTEGER REFERENCES users(id),
    changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ip_address INET,
    user_agent TEXT,
    
    CONSTRAINT chk_audit_action CHECK (action IN ('INSERT', 'UPDATE', 'DELETE'))
);

-- =============================================================================
-- INDEXES FOR PERFORMANCE OPTIMIZATION
-- =============================================================================

-- Users and Authentication
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_active ON users(is_active);

-- Departments
CREATE INDEX idx_departments_head ON departments(head_id);
CREATE INDEX idx_departments_active ON departments(is_active);

-- Resources
CREATE INDEX idx_resources_department ON resources(department_id);
CREATE INDEX idx_resources_status ON resources(status);
CREATE INDEX idx_resources_manager ON resources(manager_id);
CREATE INDEX idx_resources_employee_id ON resources(employee_id);
CREATE INDEX idx_resources_active ON resources(is_active);

-- Skills and Resource Skills
CREATE INDEX idx_resource_skills_resource ON resource_skills(resource_id);
CREATE INDEX idx_resource_skills_skill ON resource_skills(skill_id);
CREATE INDEX idx_skills_category ON skills(category);

-- Projects
CREATE INDEX idx_projects_client ON projects(client_id);
CREATE INDEX idx_projects_manager ON projects(manager_id);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_active ON projects(is_active);
CREATE INDEX idx_projects_dates ON projects(start_date, end_date);

-- Project Allocations
CREATE INDEX idx_project_allocations_project ON project_allocations(project_id);
CREATE INDEX idx_project_allocations_resource ON project_allocations(resource_id);
CREATE INDEX idx_project_allocations_active ON project_allocations(is_active);
CREATE INDEX idx_project_allocations_dates ON project_allocations(start_date, end_date);

-- Deliverables
CREATE INDEX idx_deliverables_project ON deliverables(project_id);
CREATE INDEX idx_deliverables_status ON deliverables(status);
CREATE INDEX idx_deliverables_assigned ON deliverables(assigned_to);

-- Metrics
CREATE INDEX idx_engineering_metrics_project ON engineering_metrics(project_id);
CREATE INDEX idx_engineering_metrics_date ON engineering_metrics(metric_date);
CREATE INDEX idx_qa_metrics_project ON qa_metrics(project_id);
CREATE INDEX idx_qa_metrics_date ON qa_metrics(metric_date);

-- Escalations
CREATE INDEX idx_escalations_project ON escalations(project_id);
CREATE INDEX idx_escalations_status ON escalations(status);
CREATE INDEX idx_escalations_raised_by ON escalations(raised_by);

-- Financial
CREATE INDEX idx_financial_tracking_project ON financial_tracking(project_id);
CREATE INDEX idx_financial_tracking_department ON financial_tracking(department_id);
CREATE INDEX idx_financial_tracking_period ON financial_tracking(period_start, period_end);

-- Time and Availability
CREATE INDEX idx_time_entries_allocation ON time_entries(allocation_id);
CREATE INDEX idx_time_entries_date ON time_entries(entry_date);
CREATE INDEX idx_resource_availability_resource ON resource_availability(resource_id);
CREATE INDEX idx_resource_availability_dates ON resource_availability(start_date, end_date);

-- Audit
CREATE INDEX idx_audit_logs_table ON audit_logs(table_name, record_id);
CREATE INDEX idx_audit_logs_date ON audit_logs(changed_at);

-- =============================================================================
-- FOREIGN KEY CONSTRAINTS
-- =============================================================================

-- Add foreign key constraints that were referenced but not yet defined
ALTER TABLE departments ADD CONSTRAINT fk_dept_head FOREIGN KEY (head_id) REFERENCES resources(id);

-- =============================================================================
-- DATABASE VIEWS FOR ANALYTICS
-- =============================================================================

-- Active resource allocation overview
CREATE OR REPLACE VIEW v_resource_allocation AS
SELECT 
    r.id,
    r.employee_id,
    r.name,
    r.email,
    r.role,
    r.level,
    r.status,
    r.shadow_progress,
    r.shadow_status,
    d.name as department_name,
    p.name as current_project,
    pa.allocation_percentage,
    pa.start_date as allocation_start,
    pa.end_date as allocation_end,
    pa.role_in_project
FROM resources r
LEFT JOIN departments d ON r.department_id = d.id
LEFT JOIN project_allocations pa ON r.id = pa.resource_id AND pa.is_active = TRUE
LEFT JOIN projects p ON pa.project_id = p.id AND p.is_active = TRUE
WHERE r.is_active = TRUE;

-- Project health dashboard view
CREATE OR REPLACE VIEW v_project_health AS
SELECT 
    p.id,
    p.name,
    p.status,
    p.health_score,
    p.health_status,
    p.delivery_risk,
    p.escalation_count,
    p.progress_percentage,
    c.name as client_name,
    pm.name as manager_name,
    d.name as department_name,
    COUNT(DISTINCT pa.resource_id) as allocated_resources,
    COUNT(DISTINCT del.id) as total_deliverables,
    COUNT(DISTINCT CASE WHEN del.status = 'Completed' THEN del.id END) as completed_deliverables,
    AVG(em.code_quality_score) as avg_code_quality,
    AVG(qm.automation_coverage) as avg_test_coverage,
    ft.budget_allocated,
    ft.budget_utilized,
    ft.burn_rate
FROM projects p
LEFT JOIN clients c ON p.client_id = c.id
LEFT JOIN resources pm ON p.manager_id = pm.id
LEFT JOIN departments d ON pm.department_id = d.id
LEFT JOIN project_allocations pa ON p.id = pa.project_id AND pa.is_active = TRUE
LEFT JOIN deliverables del ON p.id = del.project_id
LEFT JOIN engineering_metrics em ON p.id = em.project_id
LEFT JOIN qa_metrics qm ON p.id = qm.project_id
LEFT JOIN financial_tracking ft ON p.id = ft.project_id
WHERE p.is_active = TRUE
GROUP BY p.id, c.name, pm.name, d.name, ft.budget_allocated, ft.budget_utilized, ft.burn_rate;

-- Department performance overview
CREATE OR REPLACE VIEW v_department_performance AS
SELECT 
    d.id,
    d.name as department_name,
    d.budget_allocated,
    d.budget_utilized,
    d.burn_rate,
    d.health_score as dept_health_score,
    COUNT(DISTINCT r.id) as total_resources,
    COUNT(DISTINCT CASE WHEN r.status = 'Billable' THEN r.id END) as billable_resources,
    COUNT(DISTINCT CASE WHEN r.status = 'Benched' THEN r.id END) as benched_resources,
    COUNT(DISTINCT CASE WHEN r.status = 'Shadow' THEN r.id END) as shadow_resources,
    COUNT(DISTINCT p.id) as active_projects,
    AVG(p.health_score) as avg_project_health,
    ROUND(
        COUNT(CASE WHEN r.status = 'Billable' THEN 1 END)::decimal / 
        NULLIF(COUNT(r.id), 0) * 100, 2
    ) as utilization_percentage
FROM departments d
LEFT JOIN resources r ON d.id = r.department_id AND r.is_active = TRUE
LEFT JOIN projects p ON r.id = p.manager_id AND p.is_active = TRUE
GROUP BY d.id, d.name, d.budget_allocated, d.budget_utilized, d.burn_rate, d.health_score;

-- Resource performance with skills (HR view)
CREATE OR REPLACE VIEW v_resource_performance_hr AS
SELECT 
    r.id,
    r.employee_id,
    r.name,
    r.email,
    r.role,
    r.level,
    r.status,
    r.performance_rating,
    r.shadow_progress,
    r.shadow_status,
    d.name as department_name,
    sd.base_salary,
    sd.total_compensation,
    COUNT(DISTINCT pa.project_id) as projects_count,
    AVG(pa.efficiency_rating) as avg_efficiency,
    SUM(te.hours_worked) as total_hours_worked,
    STRING_AGG(DISTINCT s.name, ', ') as skills_list
FROM resources r
LEFT JOIN departments d ON r.department_id = d.id
LEFT JOIN salary_details sd ON r.id = sd.resource_id
LEFT JOIN project_allocations pa ON r.id = pa.resource_id AND pa.is_active = TRUE
LEFT JOIN time_entries te ON pa.id = te.allocation_id
LEFT JOIN resource_skills rs ON r.id = rs.resource_id
LEFT JOIN skills s ON rs.skill_id = s.id
WHERE r.is_active = TRUE
GROUP BY r.id, d.name, sd.base_salary, sd.total_compensation;

-- Financial summary (Leadership view)
CREATE OR REPLACE VIEW v_financial_summary AS
SELECT 
    DATE_TRUNC('month', ft.period_start) as month,
    SUM(ft.budget_allocated) as total_budget_allocated,
    SUM(ft.budget_utilized) as total_budget_utilized,
    SUM(ft.revenue_generated) as total_revenue,
    AVG(ft.profit_margin) as avg_profit_margin,
    SUM(ft.resource_cost) as total_resource_cost,
    SUM(ft.operational_cost) as total_operational_cost,
    AVG(ft.burn_rate) as avg_burn_rate
FROM financial_tracking ft
GROUP BY DATE_TRUNC('month', ft.period_start)
ORDER BY month DESC;

-- =============================================================================
-- TRIGGER FUNCTIONS
-- =============================================================================

-- Function to update updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Function for audit logging
CREATE OR REPLACE FUNCTION audit_trigger_function()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'DELETE' THEN
        INSERT INTO audit_logs (table_name, record_id, action, old_values, changed_at)
        VALUES (TG_TABLE_NAME, OLD.id, 'DELETE', row_to_json(OLD), CURRENT_TIMESTAMP);
        RETURN OLD;
    ELSIF TG_OP = 'UPDATE' THEN
        INSERT INTO audit_logs (table_name, record_id, action, old_values, new_values, changed_at)
        VALUES (TG_TABLE_NAME, NEW.id, 'UPDATE', row_to_json(OLD), row_to_json(NEW), CURRENT_TIMESTAMP);
        RETURN NEW;
    ELSIF TG_OP = 'INSERT' THEN
        INSERT INTO audit_logs (table_name, record_id, action, new_values, changed_at)
        VALUES (TG_TABLE_NAME, NEW.id, 'INSERT', row_to_json(NEW), CURRENT_TIMESTAMP);
        RETURN NEW;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- =============================================================================
-- APPLY TRIGGERS
-- =============================================================================

-- Update timestamp triggers
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_departments_updated_at BEFORE UPDATE ON departments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_resources_updated_at BEFORE UPDATE ON resources FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_project_allocations_updated_at BEFORE UPDATE ON project_allocations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_deliverables_updated_at BEFORE UPDATE ON deliverables FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_engineering_metrics_updated_at BEFORE UPDATE ON engineering_metrics FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_qa_metrics_updated_at BEFORE UPDATE ON qa_metrics FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_escalations_updated_at BEFORE UPDATE ON escalations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_financial_tracking_updated_at BEFORE UPDATE ON financial_tracking FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_salary_details_updated_at BEFORE UPDATE ON salary_details FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Audit triggers for sensitive tables
CREATE TRIGGER audit_resources AFTER INSERT OR UPDATE OR DELETE ON resources FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();
CREATE TRIGGER audit_projects AFTER INSERT OR UPDATE OR DELETE ON projects FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();
CREATE TRIGGER audit_project_allocations AFTER INSERT OR UPDATE OR DELETE ON project_allocations FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();
CREATE TRIGGER audit_salary_details AFTER INSERT OR UPDATE OR DELETE ON salary_details FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();
CREATE TRIGGER audit_financial_tracking AFTER INSERT OR UPDATE OR DELETE ON financial_tracking FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();
CREATE TRIGGER audit_escalations AFTER INSERT OR UPDATE OR DELETE ON escalations FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();

-- =============================================================================
-- SAMPLE DATA FOR TESTING
-- =============================================================================

-- Insert sample users
INSERT INTO users (name, email, password_hash, role) VALUES
('Admin User', 'admin@zapcg.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/lewdBenozk7B0/WH6', 'admin'),
('HR Manager', 'hr@zapcg.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/lewdBenozk7B0/WH6', 'hr'),
('Resource Manager', 'rm@zapcg.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/lewdBenozk7B0/WH6', 'resource_manager'),
('Leadership User', 'leadership@zapcg.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/lewdBenozk7B0/WH6', 'leadership'),
('Delivery Owner', 'delivery@zapcg.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/lewdBenozk7B0/WH6', 'delivery_owner');

-- Insert sample departments
INSERT INTO departments (name, description, budget_allocated, budget_utilized, burn_rate, health_score, location) VALUES
('Engineering', 'Software Development and Architecture', 2500000.00, 1875000.00, 156250.00, 92, 'New York'),
('Quality Assurance', 'Testing and Quality Control', 800000.00, 560000.00, 46667.00, 88, 'Austin'),
('DevOps', 'Infrastructure and Deployment', 1200000.00, 900000.00, 75000.00, 95, 'Seattle'),
('Design', 'UI/UX and Product Design', 600000.00, 420000.00, 35000.00, 90, 'San Francisco'),
('Project Management', 'Project Coordination and Delivery', 900000.00, 675000.00, 56250.00, 85, 'Chicago'),
('Data Science', 'Analytics and Machine Learning', 1500000.00, 1125000.00, 93750.00, 87, 'Boston');

-- Insert sample skills
INSERT INTO skills (name, category, description, market_demand) VALUES
('React', 'Frontend', 'JavaScript library for building user interfaces', 95),
('Node.js', 'Backend', 'JavaScript runtime for server-side development', 90),
('Python', 'Backend', 'High-level programming language', 92),
('AWS', 'Cloud', 'Amazon Web Services cloud platform', 88),
('Docker', 'DevOps', 'Containerization platform', 85),
('Kubernetes', 'DevOps', 'Container orchestration system', 82),
('PostgreSQL', 'Database', 'Open source relational database', 80),
('MongoDB', 'Database', 'NoSQL document database', 78),
('TypeScript', 'Frontend', 'Typed superset of JavaScript', 87),
('Vue.js', 'Frontend', 'Progressive JavaScript framework', 75),
('Java', 'Backend', 'Object-oriented programming language', 83),
('Figma', 'Design', 'Collaborative design tool', 90),
('Selenium', 'Testing', 'Web application testing framework', 70),
('Jest', 'Testing', 'JavaScript testing framework', 72),
('TensorFlow', 'AI/ML', 'Machine learning framework', 85);

-- Insert sample clients
INSERT INTO clients (name, contact_person, email, phone, industry, tier) VALUES
('TechCorp Solutions', 'John Smith', 'john.smith@techcorp.com', '+1-555-0101', 'Technology', 'Enterprise'),
('StartupXYZ', 'Sarah Johnson', 'sarah@startupxyz.com', '+1-555-0102', 'Fintech', 'Standard'),
('MegaRetail Inc', 'Michael Brown', 'mbrown@megaretail.com', '+1-555-0103', 'Retail', 'Premium'),
('HealthTech Pro', 'Emily Davis', 'emily.davis@healthtech.com', '+1-555-0104', 'Healthcare', 'Enterprise'),
('EduPlatform', 'David Wilson', 'dwilson@eduplatform.com', '+1-555-0105', 'Education', 'Standard');

-- Insert sample resources
INSERT INTO resources (employee_id, name, email, department_id, role, level, status, hire_date, performance_rating, billable_rate, shadow_progress, shadow_status) VALUES
('EMP001', 'Alice Johnson', 'alice.johnson@zapcg.com', 1, 'Senior Full Stack Developer', 'Senior', 'Billable', '2022-03-15', 4.5, 125.00, 0, 'Not Applicable'),
('EMP002', 'Bob Wilson', 'bob.wilson@zapcg.com', 1, 'Frontend Developer', 'Mid', 'Billable', '2023-01-10', 4.0, 95.00, 0, 'Not Applicable'),
('EMP003', 'Carol Davis', 'carol.davis@zapcg.com', 2, 'QA Engineer', 'Senior', 'Billable', '2021-08-20', 4.2, 110.00, 0, 'Not Applicable'),
('EMP004', 'David Brown', 'david.brown@zapcg.com', 3, 'DevOps Engineer', 'Lead', 'Billable', '2020-05-12', 4.8, 140.00, 0, 'Not Applicable'),
('EMP005', 'Eva Martinez', 'eva.martinez@zapcg.com', 4, 'UI/UX Designer', 'Mid', 'Benched', '2023-06-01', 3.8, 85.00, 0, 'Not Applicable'),
('EMP006', 'Frank Thompson', 'frank.thompson@zapcg.com', 5, 'Project Manager', 'Senior', 'Billable', '2021-11-08', 4.3, 115.00, 0, 'Not Applicable'),
('EMP007', 'Grace Lee', 'grace.lee@zapcg.com', 6, 'Data Scientist', 'Mid', 'Billable', '2022-09-14', 4.1, 105.00, 0, 'Not Applicable'),
('EMP008', 'Henry Kim', 'henry.kim@zapcg.com', 1, 'Junior Developer', 'Junior', 'Shadow', '2024-01-15', 3.5, 65.00, 45, 'Learning'),
('EMP009', 'Iris Chen', 'iris.chen@zapcg.com', 2, 'Associate QA', 'Junior', 'Shadow', '2024-02-01', 3.2, 55.00, 30, 'Observation'),
('EMP010', 'Jack Miller', 'jack.miller@zapcg.com', 1, 'Backend Developer', 'Mid', 'Available', '2023-04-22', 3.9, 90.00, 0, 'Not Applicable');

-- Insert sample resource skills
INSERT INTO resource_skills (resource_id, skill_id, proficiency_level, years_experience, is_certified) VALUES
(1, 1, 5, 4.5, true), (1, 2, 4, 3.0, false), (1, 9, 5, 4.0, true),
(2, 1, 4, 2.5, false), (2, 9, 4, 3.0, false), (2, 10, 3, 1.5, false),
(3, 13, 5, 5.0, true), (3, 14, 4, 3.5, false), (3, 1, 3, 2.0, false),
(4, 4, 5, 6.0, true), (4, 5, 5, 4.5, true), (4, 6, 4, 3.0, false),
(5, 12, 5, 3.5, true), (5, 1, 3, 2.0, false),
(6, 1, 3, 4.0, false), (6, 2, 2, 2.0, false),
(7, 3, 5, 4.0, true), (7, 15, 4, 2.5, false), (7, 8, 3, 2.0, false),
(8, 1, 2, 0.5, false), (8, 9, 2, 0.5, false),
(9, 13, 2, 0.3, false), (9, 14, 2, 0.3, false),
(10, 2, 4, 2.5, false), (10, 3, 3, 2.0, false), (10, 7, 4, 3.0, false);

-- Insert sample projects
INSERT INTO projects (name, description, client_id, manager_id, status, priority, health_score, health_status, delivery_risk, start_date, end_date, budget, actual_cost, progress_percentage, technology_stack, methodology) VALUES
('E-Commerce Platform Redesign', 'Complete overhaul of existing e-commerce platform', 1, 6, 'Active', 'High', 88, 'Green', 'Low', '2024-01-15', '2024-08-15', 850000.00, 425000.00, 65, ARRAY['React', 'Node.js', 'PostgreSQL', 'AWS'], 'Agile'),
('Mobile Banking App', 'New mobile application for banking services', 2, 6, 'Active', 'Critical', 75, 'Yellow', 'Medium', '2024-02-01', '2024-09-30', 1200000.00, 600000.00, 45, ARRAY['React Native', 'Node.js', 'MongoDB', 'AWS'], 'Agile'),
('Inventory Management System', 'Automated inventory tracking and management', 3, 6, 'Planning', 'Medium', 95, 'Green', 'Low', '2024-04-01', '2024-11-30', 650000.00, 0.00, 10, ARRAY['Vue.js', 'Python', 'PostgreSQL'], 'Waterfall'),
('Patient Portal Enhancement', 'Improved patient experience and data management', 4, 6, 'Active', 'High', 82, 'Green', 'Medium', '2024-01-20', '2024-07-20', 750000.00, 300000.00, 55, ARRAY['React', 'Java', 'PostgreSQL', 'AWS'], 'Agile'),
('Learning Management System', 'Comprehensive online education platform', 5, 6, 'On Hold', 'Low', 60, 'Red', 'High', '2024-03-01', '2024-12-15', 900000.00, 180000.00, 20, ARRAY['Angular', 'Node.js', 'MongoDB'], 'Agile');

-- Insert sample project allocations
INSERT INTO project_allocations (project_id, resource_id, allocation_percentage, start_date, end_date, role_in_project, hourly_rate, total_hours_allocated, efficiency_rating) VALUES
(1, 1, 80, '2024-01-15', '2024-08-15', 'Lead Developer', 125.00, 1280, 4.5),
(1, 2, 100, '2024-01-20', '2024-08-15', 'Frontend Developer', 95.00, 1240, 4.0),
(1, 3, 60, '2024-02-01', '2024-07-30', 'QA Lead', 110.00, 780, 4.2),
(2, 1, 20, '2024-02-01', '2024-09-30', 'Technical Architect', 125.00, 640, 4.5),
(2, 7, 80, '2024-02-05', '2024-09-30', 'Data Analyst', 105.00, 1280, 4.1),
(2, 4, 50, '2024-02-10', '2024-09-30', 'DevOps Engineer', 140.00, 800, 4.8),
(4, 10, 90, '2024-01-20', '2024-07-20', 'Backend Developer', 90.00, 1080, 3.9),
(4, 3, 40, '2024-03-01', '2024-06-30', 'QA Engineer', 110.00, 520, 4.2);

-- Insert sample deliverables
INSERT INTO deliverables (project_id, name, description, due_date, completion_date, status, priority, assigned_to, completion_percentage, quality_score) VALUES
(1, 'User Interface Redesign', 'Complete UI overhaul for e-commerce platform', '2024-04-15', '2024-04-10', 'Completed', 'High', 2, 100, 92),
(1, 'Backend API Development', 'RESTful API for product catalog and orders', '2024-06-15', NULL, 'In Progress', 'Critical', 1, 75, 88),
(1, 'Payment Integration', 'Integration with multiple payment gateways', '2024-07-01', NULL, 'Pending', 'High', 1, 0, 0),
(2, 'Mobile App MVP', 'Minimum viable product for mobile banking', '2024-05-30', NULL, 'In Progress', 'Critical', 7, 60, 85),
(2, 'Security Framework', 'Implementation of banking security standards', '2024-04-30', NULL, 'Delayed', 'Critical', 4, 40, 80),
(4, 'Patient Dashboard', 'Patient information and appointment system', '2024-05-15', NULL, 'In Progress', 'Medium', 10, 70, 87);

-- Insert sample engineering metrics
INSERT INTO engineering_metrics (project_id, metric_date, code_quality_score, test_coverage, bugs_reported, bugs_resolved, technical_debt_hours, deployment_frequency, lead_time_hours, commits_count, lines_of_code) VALUES
(1, '2024-03-01', 88, 85.5, 12, 10, 40, 15, 48, 245, 15000),
(1, '2024-03-15', 90, 87.2, 8, 8, 35, 18, 36, 189, 16500),
(2, '2024-03-01', 82, 78.3, 18, 15, 65, 12, 72, 156, 12000),
(2, '2024-03-15', 85, 81.7, 14, 14, 55, 14, 60, 203, 13200),
(4, '2024-03-01', 91, 92.1, 6, 6, 25, 20, 24, 178, 9500),
(4, '2024-03-15', 89, 89.8, 9, 8, 30, 16, 36, 145, 10200);

-- Insert sample QA metrics
INSERT INTO qa_metrics (project_id, metric_date, test_cases_total, test_cases_passed, test_cases_failed, automation_coverage, defect_density, defect_removal_efficiency, regression_test_time, test_execution_rate) VALUES
(1, '2024-03-01', 450, 425, 25, 75.5, 2.1, 91.5, 180, 94.4),
(1, '2024-03-15', 520, 498, 22, 78.2, 1.9, 93.2, 165, 95.8),
(2, '2024-03-01', 380, 342, 38, 68.7, 3.2, 87.3, 240, 90.0),
(2, '2024-03-15', 425, 389, 36, 72.1, 2.8, 89.1, 220, 91.5),
(4, '2024-03-01', 285, 275, 10, 82.5, 1.5, 95.2, 140, 96.5),
(4, '2024-03-15', 320, 308, 12, 80.8, 1.7, 94.1, 155, 96.3);

-- Insert sample escalations
INSERT INTO escalations (project_id, title, description, severity, status, raised_by, assigned_to, raised_date, resolved_date, resolution_time_hours, impact_assessment) VALUES
(2, 'Security Vulnerability in Authentication', 'Critical security flaw discovered in user authentication module', 'Critical', 'Resolved', 7, 4, '2024-03-05 09:30:00', '2024-03-06 14:45:00', 29, 'High impact on user data security, immediate fix required'),
(1, 'Performance Issues with Product Search', 'Slow response times affecting user experience', 'High', 'In Progress', 3, 1, '2024-03-10 11:20:00', NULL, NULL, 'Medium impact on user satisfaction, optimization needed'),
(5, 'Integration Failure with LMS Platform', 'Third-party integration not working as expected', 'Medium', 'Open', 6, NULL, '2024-03-12 16:15:00', NULL, NULL, 'Low impact, alternative solutions being evaluated');

-- Insert sample financial tracking
INSERT INTO financial_tracking (project_id, department_id, period_start, period_end, budget_allocated, budget_utilized, revenue_generated, profit_margin, resource_cost, operational_cost, burn_rate) VALUES
(1, 1, '2024-01-01', '2024-03-31', 425000.00, 318750.00, 510000.00, 37.5, 280000.00, 38750.00, 106250.00),
(2, 1, '2024-02-01', '2024-04-30', 600000.00, 400000.00, 720000.00, 44.4, 350000.00, 50000.00, 133333.00),
(4, 1, '2024-01-01', '2024-03-31', 300000.00, 200000.00, 375000.00, 46.7, 175000.00, 25000.00, 66667.00);

-- Insert sample salary details
INSERT INTO salary_details (resource_id, base_salary, bonus, benefits, total_compensation, effective_date, review_date, grade_level) VALUES
(1, 120000.00, 15000.00, 18000.00, 153000.00, '2024-01-01', '2024-12-31', 'L4'),
(2, 85000.00, 8500.00, 12750.00, 106250.00, '2024-01-01', '2024-12-31', 'L3'),
(3, 95000.00, 10000.00, 14250.00, 119250.00, '2024-01-01', '2024-12-31', 'L4'),
(4, 130000.00, 20000.00, 19500.00, 169500.00, '2024-01-01', '2024-12-31', 'L5'),
(5, 75000.00, 7500.00, 11250.00, 93750.00, '2024-01-01', '2024-12-31', 'L3'),
(6, 110000.00, 15000.00, 16500.00, 141500.00, '2024-01-01', '2024-12-31', 'L4'),
(7, 95000.00, 12000.00, 14250.00, 121250.00, '2024-01-01', '2024-12-31', 'L3'),
(8, 60000.00, 3000.00, 9000.00, 72000.00, '2024-01-01', '2024-12-31', 'L1'),
(9, 55000.00, 2500.00, 8250.00, 65750.00, '2024-01-01', '2024-12-31', 'L1'),
(10, 80000.00, 6000.00, 12000.00, 98000.00, '2024-01-01', '2024-12-31', 'L2');

-- Insert sample company KPIs
INSERT INTO company_kpis (kpi_date, total_employees, billable_utilization, revenue_per_employee, project_success_rate, client_satisfaction_score, employee_satisfaction_score, on_time_delivery_rate, budget_variance) VALUES
('2024-01-31', 10, 78.5, 152000.00, 88.2, 4.3, 4.1, 82.5, 4.2),
('2024-02-29', 10, 82.3, 165000.00, 91.5, 4.4, 4.2, 85.0, 3.8),
('2024-03-31', 10, 79.8, 158000.00, 89.7, 4.2, 4.0, 78.5, 5.1);

-- Insert sample performance reviews
INSERT INTO performance_reviews (resource_id, reviewer_id, review_period_start, review_period_end, overall_rating, technical_skills_rating, communication_rating, leadership_rating, goals_achievements, areas_improvement, feedback) VALUES
(1, 6, '2023-07-01', '2023-12-31', 4.5, 4.8, 4.2, 4.3, 'Delivered 3 major features ahead of schedule. Mentored 2 junior developers.', 'Could improve documentation practices', 'Excellent technical contributor with strong leadership potential'),
(2, 1, '2023-07-01', '2023-12-31', 4.0, 4.2, 3.8, 3.5, 'Successfully completed frontend redesign project', 'Needs to improve backend knowledge', 'Solid frontend developer, encourage full-stack learning'),
(3, 6, '2023-07-01', '2023-12-31', 4.2, 4.0, 4.5, 4.0, 'Implemented comprehensive testing strategy', 'Could automate more test scenarios', 'Reliable QA engineer with good communication skills');

-- Insert sample time entries
INSERT INTO time_entries (allocation_id, entry_date, hours_worked, description, task_type, is_billable, is_approved, approved_by) VALUES
(1, '2024-03-01', 8.0, 'API development for product catalog', 'Development', true, true, 6),
(1, '2024-03-02', 7.5, 'Code review and bug fixes', 'Development', true, true, 6),
(2, '2024-03-01', 8.0, 'UI component development', 'Development', true, true, 1),
(2, '2024-03-02', 8.0, 'Frontend integration testing', 'Testing', true, true, 1),
(3, '2024-03-01', 4.8, 'Test case creation and execution', 'Testing', true, true, 6),
(5, '2024-03-01', 6.4, 'Data analysis and reporting', 'Analysis', true, true, 6);

-- Insert sample resource availability
INSERT INTO resource_availability (resource_id, start_date, end_date, availability_percentage, reason, type) VALUES
(5, '2024-03-15', '2024-03-22', 0, 'Scheduled vacation', 'Vacation'),
(8, '2024-03-01', '2024-03-31', 50, 'Training program', 'Training'),
(9, '2024-04-01', '2024-04-07', 0, 'Sick leave', 'Sick Leave');

-- =============================================================================
-- PERMISSIONS AND SECURITY (Commented for reference)
-- =============================================================================

-- Row Level Security policies would go here in production
-- Example: Enable RLS on sensitive tables
-- ALTER TABLE salary_details ENABLE ROW LEVEL SECURITY;

-- Create policies for different user roles
-- CREATE POLICY hr_salary_access ON salary_details FOR ALL TO hr_role;
-- CREATE POLICY resource_manager_basic_access ON resources FOR SELECT TO resource_manager_role;

-- Grant appropriate permissions
-- GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO it_delivery_admin;
-- GRANT SELECT ON ALL TABLES IN SCHEMA public TO it_delivery_user;
-- GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO it_delivery_admin;

-- =============================================================================
-- END OF SCHEMA
-- =============================================================================

COMMENT ON DATABASE CURRENT_DATABASE() IS 'IT Delivery Dashboard - Unified database schema for comprehensive project and resource management';

