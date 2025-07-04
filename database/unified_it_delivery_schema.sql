
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
    profile_picture_url TEXT,
    phone VARCHAR(20),
    timezone VARCHAR(50) DEFAULT 'UTC',
    preferences JSONB DEFAULT '{}',
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
    cost_center VARCHAR(50),
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
    skill_level_required INTEGER DEFAULT 1,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT chk_market_demand CHECK (market_demand >= 0 AND market_demand <= 100),
    CONSTRAINT chk_skill_level CHECK (skill_level_required >= 1 AND skill_level_required <= 5),
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
    contract_value DECIMAL(15,2) DEFAULT 0,
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
    cost_to_company DECIMAL(12,2),
    profile_picture_url TEXT,
    linkedin_url TEXT,
    github_url TEXT,
    emergency_contact JSONB,
    personal_info JSONB,
    visa_status VARCHAR(50),
    visa_expiry DATE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT chk_resource_status CHECK (status IN ('Billable', 'Benched', 'Shadow', 'Associate', 'Available', 'On Leave', 'Intern')),
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
    certification_name VARCHAR(200),
    certification_expiry DATE,
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
    salary_band VARCHAR(20),
    equity_percentage DECIMAL(5,2) DEFAULT 0,
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
    team_lead_id INTEGER REFERENCES resources(id),
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
    revenue DECIMAL(15,2) DEFAULT 0,
    progress_percentage INTEGER DEFAULT 0,
    technology_stack TEXT[],
    methodology VARCHAR(50) DEFAULT 'Agile',
    project_type VARCHAR(50) DEFAULT 'Development',
    contract_type VARCHAR(50) DEFAULT 'Fixed Bid',
    billable_hours DECIMAL(8,2) DEFAULT 0,
    non_billable_hours DECIMAL(8,2) DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT chk_project_status CHECK (status IN ('Planning', 'Active', 'On Hold', 'Completed', 'Cancelled', 'In Progress')),
    CONSTRAINT chk_project_priority CHECK (priority IN ('Low', 'Medium', 'High', 'Critical')),
    CONSTRAINT chk_project_health_status CHECK (health_status IN ('Green', 'Yellow', 'Red')),
    CONSTRAINT chk_delivery_risk CHECK (delivery_risk IN ('Low', 'Medium', 'High', 'Critical')),
    CONSTRAINT chk_project_health_score CHECK (health_score >= 0 AND health_score <= 100),
    CONSTRAINT chk_progress_percentage CHECK (progress_percentage >= 0 AND progress_percentage <= 100),
    CONSTRAINT chk_project_type CHECK (project_type IN ('Development', 'Maintenance', 'Support', 'Consulting', 'Testing')),
    CONSTRAINT chk_contract_type CHECK (contract_type IN ('Fixed Bid', 'Time & Material', 'Retainer', 'Outcome Based')),
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
    utilization_percentage DECIMAL(5,2) DEFAULT 0,
    is_billable BOOLEAN DEFAULT TRUE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT chk_allocation_percentage CHECK (allocation_percentage > 0 AND allocation_percentage <= 100),
    CONSTRAINT chk_allocation_dates CHECK (end_date IS NULL OR start_date <= end_date),
    CONSTRAINT chk_allocation_efficiency CHECK (efficiency_rating >= 1.0 AND efficiency_rating <= 5.0),
    CONSTRAINT chk_utilization_percentage CHECK (utilization_percentage >= 0 AND utilization_percentage <= 100),
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
    reviewed_by INTEGER REFERENCES resources(id),
    completion_percentage INTEGER DEFAULT 0,
    quality_score INTEGER DEFAULT 85,
    deliverable_type VARCHAR(50) DEFAULT 'Feature',
    estimated_hours DECIMAL(6,2) DEFAULT 0,
    actual_hours DECIMAL(6,2) DEFAULT 0,
    acceptance_criteria TEXT,
    attachments JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT chk_deliverable_status CHECK (status IN ('Pending', 'In Progress', 'Completed', 'Delayed', 'Cancelled', 'Under Review')),
    CONSTRAINT chk_deliverable_priority CHECK (priority IN ('Low', 'Medium', 'High', 'Critical')),
    CONSTRAINT chk_deliverable_type CHECK (deliverable_type IN ('Feature', 'Bug Fix', 'Enhancement', 'Documentation', 'Testing', 'Deployment')),
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
    bugs_critical INTEGER DEFAULT 0,
    bugs_high INTEGER DEFAULT 0,
    bugs_medium INTEGER DEFAULT 0,
    bugs_low INTEGER DEFAULT 0,
    technical_debt_hours INTEGER DEFAULT 0,
    deployment_frequency INTEGER DEFAULT 0,
    deployment_success_rate DECIMAL(5,2) DEFAULT 95.0,
    lead_time_hours INTEGER DEFAULT 72,
    cycle_time_hours INTEGER DEFAULT 48,
    commits_count INTEGER DEFAULT 0,
    lines_of_code INTEGER DEFAULT 0,
    code_churn_percentage DECIMAL(5,2) DEFAULT 0,
    code_coverage DECIMAL(5,2) DEFAULT 0,
    code_review_time_avg DECIMAL(5,2) DEFAULT 2.0,
    developer_productivity_score INTEGER DEFAULT 85,
    technical_debt_ratio DECIMAL(5,2) DEFAULT 5.0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT chk_code_quality_score CHECK (code_quality_score >= 0 AND code_quality_score <= 100),
    CONSTRAINT chk_test_coverage CHECK (test_coverage >= 0 AND test_coverage <= 100),
    CONSTRAINT chk_deployment_success_rate CHECK (deployment_success_rate >= 0 AND deployment_success_rate <= 100),
    CONSTRAINT chk_developer_productivity_score CHECK (developer_productivity_score >= 0 AND developer_productivity_score <= 100)
);

-- QA metrics  
CREATE TABLE qa_metrics (
    id SERIAL PRIMARY KEY,
    project_id INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    metric_date DATE NOT NULL DEFAULT CURRENT_DATE,
    test_cases_total INTEGER DEFAULT 0,
    test_cases_passed INTEGER DEFAULT 0,
    test_cases_failed INTEGER DEFAULT 0,
    test_cases_blocked INTEGER DEFAULT 0,
    test_cases_skipped INTEGER DEFAULT 0,
    automation_coverage DECIMAL(5,2) DEFAULT 70.0,
    manual_test_hours DECIMAL(6,2) DEFAULT 0,
    automated_test_hours DECIMAL(6,2) DEFAULT 0,
    defects_found INTEGER DEFAULT 0,
    defects_fixed INTEGER DEFAULT 0,
    defects_rejected INTEGER DEFAULT 0,
    defects_deferred INTEGER DEFAULT 0,
    defect_density DECIMAL(8,2) DEFAULT 0.0,
    defect_removal_efficiency DECIMAL(5,2) DEFAULT 90.0,
    regression_test_time INTEGER DEFAULT 240,
    test_execution_rate DECIMAL(5,2) DEFAULT 95.0,
    regression_test_success DECIMAL(5,2) DEFAULT 95.0,
    performance_test_score INTEGER DEFAULT 85,
    security_test_score INTEGER DEFAULT 85,
    usability_test_score INTEGER DEFAULT 85,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT chk_qa_automation_coverage CHECK (automation_coverage >= 0 AND automation_coverage <= 100),
    CONSTRAINT chk_test_execution_rate CHECK (test_execution_rate >= 0 AND test_execution_rate <= 100),
    CONSTRAINT chk_defect_removal_efficiency CHECK (defect_removal_efficiency >= 0 AND defect_removal_efficiency <= 100),
    CONSTRAINT chk_performance_test_score CHECK (performance_test_score >= 0 AND performance_test_score <= 100),
    CONSTRAINT chk_security_test_score CHECK (security_test_score >= 0 AND security_test_score <= 100)
);

-- Escalations tracking
CREATE TABLE escalations (
    id SERIAL PRIMARY KEY,
    project_id INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    priority VARCHAR(20) DEFAULT 'Medium',
    severity VARCHAR(20) DEFAULT 'Medium',
    status VARCHAR(30) DEFAULT 'Open',
    escalation_type VARCHAR(50) DEFAULT 'Technical',
    raised_by INTEGER NOT NULL REFERENCES resources(id),
    assigned_to INTEGER REFERENCES resources(id),
    raised_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    due_date TIMESTAMP,
    resolved_date TIMESTAMP,
    resolution_time_hours INTEGER,
    resolution_notes TEXT,
    impact_assessment TEXT,
    root_cause_analysis TEXT,
    preventive_measures TEXT,
    attachments JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT chk_escalation_severity CHECK (severity IN ('Low', 'Medium', 'High', 'Critical')),
    CONSTRAINT chk_escalation_priority CHECK (priority IN ('Low', 'Medium', 'High', 'Critical')),
    CONSTRAINT chk_escalation_status CHECK (status IN ('Open', 'In Progress', 'Resolved', 'Closed', 'Cancelled')),
    CONSTRAINT chk_escalation_type CHECK (escalation_type IN ('Technical', 'Resource', 'Budget', 'Timeline', 'Quality', 'Client', 'Process'))
);

-- =============================================================================
-- FINANCIAL AND PERFORMANCE TRACKING
-- =============================================================================

-- Financial tracking (HR and Leadership access)
CREATE TABLE financial_tracking (
    id SERIAL PRIMARY KEY,
    project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
    department_id INTEGER REFERENCES departments(id) ON DELETE CASCADE,
    resource_id INTEGER REFERENCES resources(id) ON DELETE CASCADE,
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    budget_allocated DECIMAL(15,2) NOT NULL,
    budget_utilized DECIMAL(15,2) DEFAULT 0,
    revenue_generated DECIMAL(15,2) DEFAULT 0,
    revenue_recognized DECIMAL(15,2) DEFAULT 0,
    profit_margin DECIMAL(5,2) DEFAULT 0,
    resource_cost DECIMAL(15,2) DEFAULT 0,
    operational_cost DECIMAL(15,2) DEFAULT 0,
    travel_cost DECIMAL(12,2) DEFAULT 0,
    infrastructure_cost DECIMAL(12,2) DEFAULT 0,
    burn_rate DECIMAL(10,2) DEFAULT 0,
    forecast_completion_cost DECIMAL(15,2),
    roi_percentage DECIMAL(5,2) DEFAULT 0,
    billing_rate DECIMAL(8,2) DEFAULT 0,
    cost_per_hour DECIMAL(8,2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT chk_profit_margin CHECK (profit_margin >= -100 AND profit_margin <= 100)
);

-- Company KPIs
CREATE TABLE company_kpis (
    id SERIAL PRIMARY KEY,
    kpi_date DATE NOT NULL DEFAULT CURRENT_DATE,
    total_employees INTEGER DEFAULT 0,
    billable_employees INTEGER DEFAULT 0,
    bench_employees INTEGER DEFAULT 0,
    billable_utilization DECIMAL(5,2) DEFAULT 75.0,
    revenue_per_employee DECIMAL(12,2) DEFAULT 0,
    cost_per_employee DECIMAL(12,2) DEFAULT 0,
    project_success_rate DECIMAL(5,2) DEFAULT 85.0,
    on_time_delivery_rate DECIMAL(5,2) DEFAULT 80.0,
    client_satisfaction_score DECIMAL(3,1) DEFAULT 4.2,
    client_retention_rate DECIMAL(5,2) DEFAULT 90.0,
    employee_satisfaction_score DECIMAL(3,1) DEFAULT 4.0,
    employee_turnover_rate DECIMAL(5,2) DEFAULT 10.0,
    budget_variance DECIMAL(5,2) DEFAULT 5.0,
    quality_score DECIMAL(5,2) DEFAULT 85.0,
    innovation_index DECIMAL(5,2) DEFAULT 70.0,
    market_share DECIMAL(5,2) DEFAULT 5.0,
    total_revenue DECIMAL(15,2) DEFAULT 0,
    total_profit DECIMAL(15,2) DEFAULT 0,
    ebitda DECIMAL(15,2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT chk_billable_utilization CHECK (billable_utilization >= 0 AND billable_utilization <= 100),
    CONSTRAINT chk_client_satisfaction CHECK (client_satisfaction_score >= 1.0 AND client_satisfaction_score <= 5.0),
    CONSTRAINT chk_employee_satisfaction CHECK (employee_satisfaction_score >= 1.0 AND employee_satisfaction_score <= 5.0)
);

-- =============================================================================
-- TIME TRACKING AND AVAILABILITY
-- =============================================================================

-- Time tracking
CREATE TABLE time_entries (
    id SERIAL PRIMARY KEY,
    allocation_id INTEGER NOT NULL REFERENCES project_allocations(id) ON DELETE CASCADE,
    resource_id INTEGER NOT NULL REFERENCES resources(id) ON DELETE CASCADE,
    project_id INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    entry_date DATE NOT NULL,
    hours_worked DECIMAL(4,2) NOT NULL,
    description TEXT,
    task_type VARCHAR(50),
    activity_type VARCHAR(50) DEFAULT 'Development',
    is_billable BOOLEAN DEFAULT TRUE,
    is_approved BOOLEAN DEFAULT FALSE,
    approved_by INTEGER REFERENCES resources(id),
    approved_at TIMESTAMP,
    rejection_reason TEXT,
    overtime_hours DECIMAL(4,2) DEFAULT 0,
    location VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT chk_hours_worked CHECK (hours_worked > 0 AND hours_worked <= 24),
    CONSTRAINT chk_overtime_hours CHECK (overtime_hours >= 0 AND overtime_hours <= 8),
    CONSTRAINT chk_activity_type CHECK (activity_type IN ('Development', 'Testing', 'Design', 'Analysis', 'Documentation', 'Meeting', 'Training', 'Support'))
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
    approved_by INTEGER REFERENCES resources(id),
    requested_by INTEGER REFERENCES resources(id),
    status VARCHAR(30) DEFAULT 'Approved',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT chk_availability_percentage CHECK (availability_percentage >= 0 AND availability_percentage <= 100),
    CONSTRAINT chk_availability_type CHECK (type IN ('Available', 'Vacation', 'Sick Leave', 'Personal Leave', 'Training', 'Conference', 'Other')),
    CONSTRAINT chk_availability_status CHECK (status IN ('Pending', 'Approved', 'Rejected', 'Cancelled')),
    CONSTRAINT chk_availability_dates CHECK (end_date IS NULL OR start_date <= end_date)
);

-- Performance reviews
CREATE TABLE performance_reviews (
    id SERIAL PRIMARY KEY,
    resource_id INTEGER NOT NULL REFERENCES resources(id) ON DELETE CASCADE,
    reviewer_id INTEGER NOT NULL REFERENCES resources(id),
    review_type VARCHAR(50) DEFAULT 'Annual',
    review_period_start DATE NOT NULL,
    review_period_end DATE NOT NULL,
    overall_rating DECIMAL(3,2) NOT NULL,
    technical_skills_rating DECIMAL(3,2),
    communication_rating DECIMAL(3,2),
    leadership_rating DECIMAL(3,2),
    problem_solving_rating DECIMAL(3,2),
    teamwork_rating DECIMAL(3,2),
    innovation_rating DECIMAL(3,2),
    reliability_rating DECIMAL(3,2),
    goals_achievements TEXT,
    areas_improvement TEXT,
    feedback TEXT,
    development_plan TEXT,
    promotion_readiness VARCHAR(50) DEFAULT 'Not Ready',
    salary_recommendation DECIMAL(12,2),
    bonus_recommendation DECIMAL(12,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT chk_overall_rating CHECK (overall_rating >= 1.0 AND overall_rating <= 5.0),
    CONSTRAINT chk_technical_rating CHECK (technical_skills_rating >= 1.0 AND technical_skills_rating <= 5.0),
    CONSTRAINT chk_communication_rating CHECK (communication_rating >= 1.0 AND communication_rating <= 5.0),
    CONSTRAINT chk_leadership_rating CHECK (leadership_rating >= 1.0 AND leadership_rating <= 5.0),
    CONSTRAINT chk_review_type CHECK (review_type IN ('Annual', 'Mid-Year', 'Quarterly', 'Probation', 'Exit')),
    CONSTRAINT chk_promotion_readiness CHECK (promotion_readiness IN ('Ready', 'Partially Ready', 'Not Ready', 'Exceeds Expectations'))
);

-- =============================================================================
-- NOTIFICATIONS AND COMMUNICATION
-- =============================================================================

-- Notifications table
CREATE TABLE notifications (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(50) DEFAULT 'Info',
    priority VARCHAR(20) DEFAULT 'Medium',
    is_read BOOLEAN DEFAULT FALSE,
    action_url TEXT,
    metadata JSONB,
    expires_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    read_at TIMESTAMP,
    
    CONSTRAINT chk_notification_type CHECK (type IN ('Info', 'Warning', 'Error', 'Success', 'Reminder')),
    CONSTRAINT chk_notification_priority CHECK (priority IN ('Low', 'Medium', 'High', 'Critical'))
);

-- Comments table for general commenting system
CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    entity_type VARCHAR(50) NOT NULL,
    entity_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    parent_comment_id INTEGER REFERENCES comments(id),
    content TEXT NOT NULL,
    is_internal BOOLEAN DEFAULT FALSE,
    attachments JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT chk_entity_type CHECK (entity_type IN ('project', 'resource', 'deliverable', 'escalation', 'performance_review'))
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
    session_id VARCHAR(100),
    
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
CREATE INDEX idx_resources_shadow_status ON resources(shadow_status);

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
CREATE INDEX idx_projects_health_status ON projects(health_status);

-- Project Allocations
CREATE INDEX idx_project_allocations_project ON project_allocations(project_id);
CREATE INDEX idx_project_allocations_resource ON project_allocations(resource_id);
CREATE INDEX idx_project_allocations_active ON project_allocations(is_active);
CREATE INDEX idx_project_allocations_dates ON project_allocations(start_date, end_date);

-- Deliverables
CREATE INDEX idx_deliverables_project ON deliverables(project_id);
CREATE INDEX idx_deliverables_status ON deliverables(status);
CREATE INDEX idx_deliverables_assigned ON deliverables(assigned_to);
CREATE INDEX idx_deliverables_due_date ON deliverables(due_date);

-- Metrics
CREATE INDEX idx_engineering_metrics_project ON engineering_metrics(project_id);
CREATE INDEX idx_engineering_metrics_date ON engineering_metrics(metric_date);
CREATE INDEX idx_qa_metrics_project ON qa_metrics(project_id);
CREATE INDEX idx_qa_metrics_date ON qa_metrics(metric_date);

-- Escalations
CREATE INDEX idx_escalations_project ON escalations(project_id);
CREATE INDEX idx_escalations_status ON escalations(status);
CREATE INDEX idx_escalations_raised_by ON escalations(raised_by);
CREATE INDEX idx_escalations_priority ON escalations(priority);

-- Financial
CREATE INDEX idx_financial_tracking_project ON financial_tracking(project_id);
CREATE INDEX idx_financial_tracking_department ON financial_tracking(department_id);
CREATE INDEX idx_financial_tracking_period ON financial_tracking(period_start, period_end);

-- Time and Availability
CREATE INDEX idx_time_entries_allocation ON time_entries(allocation_id);
CREATE INDEX idx_time_entries_resource ON time_entries(resource_id);
CREATE INDEX idx_time_entries_project ON time_entries(project_id);
CREATE INDEX idx_time_entries_date ON time_entries(entry_date);
CREATE INDEX idx_resource_availability_resource ON resource_availability(resource_id);
CREATE INDEX idx_resource_availability_dates ON resource_availability(start_date, end_date);

-- Notifications
CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_read ON notifications(is_read);
CREATE INDEX idx_notifications_created ON notifications(created_at);

-- Comments
CREATE INDEX idx_comments_entity ON comments(entity_type, entity_id);
CREATE INDEX idx_comments_user ON comments(user_id);

-- Audit
CREATE INDEX idx_audit_logs_table ON audit_logs(table_name, record_id);
CREATE INDEX idx_audit_logs_date ON audit_logs(changed_at);
CREATE INDEX idx_audit_logs_user ON audit_logs(changed_by);

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
    pa.role_in_project,
    pa.utilization_percentage
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
    p.budget,
    p.actual_cost,
    p.revenue,
    c.name as client_name,
    pm.name as manager_name,
    tl.name as team_lead_name,
    d.name as department_name,
    COUNT(DISTINCT pa.resource_id) as allocated_resources,
    COUNT(DISTINCT del.id) as total_deliverables,
    COUNT(DISTINCT CASE WHEN del.status = 'Completed' THEN del.id END) as completed_deliverables,
    COUNT(DISTINCT CASE WHEN del.status = 'Delayed' THEN del.id END) as delayed_deliverables,
    AVG(em.code_quality_score) as avg_code_quality,
    AVG(qm.automation_coverage) as avg_test_coverage,
    SUM(te.hours_worked) as total_hours_logged,
    ft.budget_allocated,
    ft.budget_utilized,
    ft.burn_rate
FROM projects p
LEFT JOIN clients c ON p.client_id = c.id
LEFT JOIN resources pm ON p.manager_id = pm.id
LEFT JOIN resources tl ON p.team_lead_id = tl.id
LEFT JOIN departments d ON pm.department_id = d.id
LEFT JOIN project_allocations pa ON p.id = pa.project_id AND pa.is_active = TRUE
LEFT JOIN deliverables del ON p.id = del.project_id
LEFT JOIN engineering_metrics em ON p.id = em.project_id
LEFT JOIN qa_metrics qm ON p.id = qm.project_id
LEFT JOIN time_entries te ON p.id = te.project_id
LEFT JOIN financial_tracking ft ON p.id = ft.project_id
WHERE p.is_active = TRUE
GROUP BY p.id, c.name, pm.name, tl.name, d.name, ft.budget_allocated, ft.budget_utilized, ft.burn_rate;

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
    SUM(ft.revenue_generated) as total_revenue,
    SUM(ft.resource_cost) as total_resource_cost,
    ROUND(
        COUNT(CASE WHEN r.status = 'Billable' THEN 1 END)::numeric / 
        NULLIF(COUNT(r.id), 0) * 100, 2
    ) as utilization_percentage
FROM departments d
LEFT JOIN resources r ON d.id = r.department_id AND r.is_active = TRUE
LEFT JOIN projects p ON r.id = p.manager_id AND p.is_active = TRUE
LEFT JOIN financial_tracking ft ON d.id = ft.department_id
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
    AVG(pa.utilization_percentage) as avg_utilization,
    SUM(te.hours_worked) as total_hours_worked,
    SUM(CASE WHEN te.is_billable THEN te.hours_worked ELSE 0 END) as billable_hours_worked,
    STRING_AGG(DISTINCT s.name, ', ') as skills_list,
    AVG(pr.overall_rating) as avg_performance_rating
FROM resources r
LEFT JOIN departments d ON r.department_id = d.id
LEFT JOIN salary_details sd ON r.id = sd.resource_id
LEFT JOIN project_allocations pa ON r.id = pa.resource_id AND pa.is_active = TRUE
LEFT JOIN time_entries te ON pa.id = te.allocation_id
LEFT JOIN resource_skills rs ON r.id = rs.resource_id
LEFT JOIN skills s ON rs.skill_id = s.id
LEFT JOIN performance_reviews pr ON r.id = pr.resource_id
WHERE r.is_active = TRUE
GROUP BY r.id, d.name, sd.base_salary, sd.total_compensation;

-- Financial summary (Leadership view)
CREATE OR REPLACE VIEW v_financial_summary AS
SELECT 
    DATE_TRUNC('month', ft.period_start) as month,
    SUM(ft.budget_allocated) as total_budget_allocated,
    SUM(ft.budget_utilized) as total_budget_utilized,
    SUM(ft.revenue_generated) as total_revenue,
    SUM(ft.revenue_recognized) as total_revenue_recognized,
    AVG(ft.profit_margin) as avg_profit_margin,
    SUM(ft.resource_cost) as total_resource_cost,
    SUM(ft.operational_cost) as total_operational_cost,
    AVG(ft.burn_rate) as avg_burn_rate,
    AVG(ft.roi_percentage) as avg_roi_percentage
FROM financial_tracking ft
GROUP BY DATE_TRUNC('month', ft.period_start)
ORDER BY month DESC;

-- KPI Summary View
CREATE OR REPLACE VIEW v_kpi_summary AS
SELECT 
    (SELECT COUNT(*) FROM projects WHERE is_active = TRUE) as total_projects,
    (SELECT COUNT(*) FROM projects WHERE status = 'Active' OR status = 'In Progress') as active_projects,
    (SELECT COUNT(*) FROM projects WHERE status = 'Completed') as completed_projects,
    (SELECT COUNT(*) FROM resources WHERE is_active = TRUE) as total_resources,
    (SELECT COUNT(*) FROM resources WHERE status = 'Billable') as billable_resources,
    (SELECT COUNT(*) FROM resources WHERE status = 'Benched') as benched_resources,
    (SELECT AVG(health_score) FROM projects WHERE is_active = TRUE) as avg_project_health,
    (SELECT COUNT(*) FROM escalations WHERE status = 'Open') as open_escalations,
    (SELECT COUNT(*) FROM deliverables WHERE status = 'Delayed') as delayed_deliverables,
    (SELECT AVG(code_quality_score) FROM engineering_metrics WHERE metric_date >= CURRENT_DATE - INTERVAL '30 days') as avg_code_quality,
    (SELECT AVG(automation_coverage) FROM qa_metrics WHERE metric_date >= CURRENT_DATE - INTERVAL '30 days') as avg_automation_coverage;

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

-- Function to auto-update shadow status based on progress
CREATE OR REPLACE FUNCTION update_shadow_status()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.shadow_progress != OLD.shadow_progress THEN
        IF NEW.shadow_progress >= 90 THEN
            NEW.shadow_status = 'Completed';
        ELSIF NEW.shadow_progress >= 70 THEN
            NEW.shadow_status = 'Transition';
        ELSIF NEW.shadow_progress >= 30 THEN
            NEW.shadow_status = 'Learning';
        ELSIF NEW.shadow_progress > 0 THEN
            NEW.shadow_status = 'Observation';
        END IF;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function to update project health score
CREATE OR REPLACE FUNCTION update_project_health()
RETURNS TRIGGER AS $$
DECLARE
    project_id INTEGER;
    health_score INTEGER;
    deliverable_score INTEGER;
    budget_score INTEGER;
    timeline_score INTEGER;
BEGIN
    -- Get project ID from context
    IF TG_TABLE_NAME = 'deliverables' THEN
        project_id = COALESCE(NEW.project_id, OLD.project_id);
    ELSIF TG_TABLE_NAME = 'financial_tracking' THEN
        project_id = COALESCE(NEW.project_id, OLD.project_id);
    ELSIF TG_TABLE_NAME = 'escalations' THEN
        project_id = COALESCE(NEW.project_id, OLD.project_id);
    END IF;

    -- Calculate deliverable score
    SELECT ROUND(
        (COUNT(CASE WHEN status = 'Completed' THEN 1 END)::DECIMAL / 
         NULLIF(COUNT(*), 0)) * 100
    ) INTO deliverable_score 
    FROM deliverables WHERE deliverables.project_id = update_project_health.project_id;

    -- Calculate budget score
    SELECT CASE 
        WHEN budget_allocated > 0 THEN 
            GREATEST(0, 100 - ((budget_utilized / budget_allocated) * 100))
        ELSE 100 
    END INTO budget_score
    FROM financial_tracking WHERE financial_tracking.project_id = update_project_health.project_id
    ORDER BY period_end DESC LIMIT 1;

    -- Calculate overall health score
    health_score = COALESCE(
        (COALESCE(deliverable_score, 85) + COALESCE(budget_score, 85)) / 2, 
        85
    );

    -- Update project health
    UPDATE projects SET 
        health_score = update_project_health.health_score,
        health_status = CASE 
            WHEN update_project_health.health_score >= 80 THEN 'Green'
            WHEN update_project_health.health_score >= 60 THEN 'Yellow'
            ELSE 'Red'
        END,
        escalation_count = (
            SELECT COUNT(*) FROM escalations 
            WHERE escalations.project_id = update_project_health.project_id 
            AND status = 'Open'
        )
    WHERE id = update_project_health.project_id;

    RETURN COALESCE(NEW, OLD);
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
CREATE TRIGGER update_notifications_updated_at BEFORE UPDATE ON notifications FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_comments_updated_at BEFORE UPDATE ON comments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Shadow status auto-update trigger
CREATE TRIGGER update_shadow_status_trigger BEFORE UPDATE ON resources FOR EACH ROW EXECUTE FUNCTION update_shadow_status();

-- Project health update triggers
CREATE TRIGGER update_project_health_deliverables AFTER INSERT OR UPDATE OR DELETE ON deliverables FOR EACH ROW EXECUTE FUNCTION update_project_health();
CREATE TRIGGER update_project_health_financial AFTER INSERT OR UPDATE OR DELETE ON financial_tracking FOR EACH ROW EXECUTE FUNCTION update_project_health();
CREATE TRIGGER update_project_health_escalations AFTER INSERT OR UPDATE OR DELETE ON escalations FOR EACH ROW EXECUTE FUNCTION update_project_health();

-- Audit triggers for sensitive tables
CREATE TRIGGER audit_resources AFTER INSERT OR UPDATE OR DELETE ON resources FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();
CREATE TRIGGER audit_projects AFTER INSERT OR UPDATE OR DELETE ON projects FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();
CREATE TRIGGER audit_project_allocations AFTER INSERT OR UPDATE OR DELETE ON project_allocations FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();
CREATE TRIGGER audit_salary_details AFTER INSERT OR UPDATE OR DELETE ON salary_details FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();
CREATE TRIGGER audit_financial_tracking AFTER INSERT OR UPDATE OR DELETE ON financial_tracking FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();
CREATE TRIGGER audit_escalations AFTER INSERT OR UPDATE OR DELETE ON escalations FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();
CREATE TRIGGER audit_deliverables AFTER INSERT OR UPDATE OR DELETE ON deliverables FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();

-- =============================================================================
-- SAMPLE DATA FOR TESTING
-- =============================================================================

-- Insert sample users
INSERT INTO users (name, email, password_hash, role, phone, timezone) VALUES
('Admin User', 'admin@zapcg.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/lewdBenozk7B0/WH6', 'admin', '+1-555-0001', 'America/New_York'),
('HR Manager', 'hr@zapcg.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/lewdBenozk7B0/WH6', 'hr', '+1-555-0002', 'America/New_York'),
('Resource Manager', 'rm@zapcg.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/lewdBenozk7B0/WH6', 'resource_manager', '+1-555-0003', 'America/New_York'),
('Leadership User', 'leadership@zapcg.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/lewdBenozk7B0/WH6', 'leadership', '+1-555-0004', 'America/New_York'),
('Delivery Owner', 'delivery@zapcg.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/lewdBenozk7B0/WH6', 'delivery_owner', '+1-555-0005', 'America/New_York');

-- Insert sample departments
INSERT INTO departments (name, description, budget_allocated, budget_utilized, burn_rate, health_score, location, cost_center) VALUES
('Engineering', 'Software Development and Architecture', 2500000.00, 1875000.00, 156250.00, 92, 'New York', 'ENG001'),
('Quality Assurance', 'Testing and Quality Control', 800000.00, 560000.00, 46667.00, 88, 'Austin', 'QA001'),
('DevOps', 'Infrastructure and Deployment', 1200000.00, 900000.00, 75000.00, 95, 'Seattle', 'DEV001'),
('Design', 'UI/UX and Product Design', 600000.00, 420000.00, 35000.00, 90, 'San Francisco', 'DES001'),
('Project Management', 'Project Coordination and Delivery', 900000.00, 675000.00, 56250.00, 85, 'Chicago', 'PM001'),
('Data Science', 'Analytics and Machine Learning', 1500000.00, 1125000.00, 93750.00, 87, 'Boston', 'DS001');

-- Insert sample skills
INSERT INTO skills (name, category, description, market_demand, skill_level_required) VALUES
('React', 'Frontend', 'JavaScript library for building user interfaces', 95, 3),
('Node.js', 'Backend', 'JavaScript runtime for server-side development', 90, 3),
('Python', 'Backend', 'High-level programming language', 92, 3),
('AWS', 'Cloud', 'Amazon Web Services cloud platform', 88, 4),
('Docker', 'DevOps', 'Containerization platform', 85, 3),
('Kubernetes', 'DevOps', 'Container orchestration system', 82, 4),
('PostgreSQL', 'Database', 'Open source relational database', 80, 3),
('MongoDB', 'Database', 'NoSQL document database', 78, 3),
('TypeScript', 'Frontend', 'Typed superset of JavaScript', 87, 3),
('Vue.js', 'Frontend', 'Progressive JavaScript framework', 75, 3),
('Java', 'Backend', 'Object-oriented programming language', 83, 3),
('Figma', 'Design', 'Collaborative design tool', 90, 2),
('Selenium', 'Testing', 'Web application testing framework', 70, 3),
('Jest', 'Testing', 'JavaScript testing framework', 72, 2),
('TensorFlow', 'AI/ML', 'Machine learning framework', 85, 4);

-- Insert sample clients
INSERT INTO clients (name, contact_person, email, phone, industry, tier, contract_value) VALUES
('TechCorp Solutions', 'John Smith', 'john.smith@techcorp.com', '+1-555-0101', 'Technology', 'Enterprise', 2500000.00),
('StartupXYZ', 'Sarah Johnson', 'sarah@startupxyz.com', '+1-555-0102', 'Fintech', 'Standard', 800000.00),
('MegaRetail Inc', 'Michael Brown', 'mbrown@megaretail.com', '+1-555-0103', 'Retail', 'Premium', 1500000.00),
('HealthTech Pro', 'Emily Davis', 'emily.davis@healthtech.com', '+1-555-0104', 'Healthcare', 'Enterprise', 3000000.00),
('EduPlatform', 'David Wilson', 'dwilson@eduplatform.com', '+1-555-0105', 'Education', 'Standard', 600000.00);

-- Insert sample resources
INSERT INTO resources (employee_id, name, email, department_id, role, level, status, hire_date, performance_rating, billable_rate, cost_to_company, location, visa_status) VALUES
('EMP001', 'Alice Johnson', 'alice.johnson@zapcg.com', 1, 'Senior Full Stack Developer', 'Senior', 'Billable', '2022-03-15', 4.5, 125.00, 180000.00, 'New York', 'Citizen'),
('EMP002', 'Bob Wilson', 'bob.wilson@zapcg.com', 1, 'Frontend Developer', 'Mid', 'Billable', '2023-01-10', 4.0, 95.00, 140000.00, 'New York', 'H1B'),
('EMP003', 'Carol Davis', 'carol.davis@zapcg.com', 2, 'QA Engineer', 'Senior', 'Billable', '2021-08-20', 4.2, 110.00, 160000.00, 'Austin', 'Citizen'),
('EMP004', 'David Brown', 'david.brown@zapcg.com', 3, 'DevOps Engineer', 'Lead', 'Billable', '2020-05-12', 4.8, 140.00, 200000.00, 'Seattle', 'Green Card'),
('EMP005', 'Eva Martinez', 'eva.martinez@zapcg.com', 4, 'UI/UX Designer', 'Mid', 'Benched', '2023-06-01', 3.8, 85.00, 120000.00, 'San Francisco', 'Citizen'),
('EMP006', 'Frank Thompson', 'frank.thompson@zapcg.com', 5, 'Project Manager', 'Senior', 'Billable', '2021-11-08', 4.3, 115.00, 170000.00, 'Chicago', 'Citizen'),
('EMP007', 'Grace Lee', 'grace.lee@zapcg.com', 6, 'Data Scientist', 'Mid', 'Billable', '2022-09-14', 4.1, 105.00, 150000.00, 'Boston', 'H1B'),
('EMP008', 'Henry Kim', 'henry.kim@zapcg.com', 1, 'Junior Developer', 'Junior', 'Shadow', '2024-01-15', 3.5, 65.00, 95000.00, 'New York', 'Student Visa'),
('EMP009', 'Iris Chen', 'iris.chen@zapcg.com', 2, 'Associate QA', 'Junior', 'Shadow', '2024-02-01', 3.2, 55.00, 85000.00, 'Austin', 'OPT'),
('EMP010', 'Jack Miller', 'jack.miller@zapcg.com', 1, 'Backend Developer', 'Mid', 'Available', '2023-04-22', 3.9, 90.00, 130000.00, 'New York', 'Citizen');

-- Insert sample resource skills
INSERT INTO resource_skills (resource_id, skill_id, proficiency_level, years_experience, is_certified, certification_name) VALUES
(1, 1, 5, 4.5, true, 'React Professional Developer'), (1, 2, 4, 3.0, false, NULL), (1, 9, 5, 4.0, true, 'TypeScript Expert'),
(2, 1, 4, 2.5, false, NULL), (2, 9, 4, 3.0, false, NULL), (2, 10, 3, 1.5, false, NULL),
(3, 13, 5, 5.0, true, 'Selenium WebDriver'), (3, 14, 4, 3.5, false, NULL), (3, 1, 3, 2.0, false, NULL),
(4, 4, 5, 6.0, true, 'AWS Solutions Architect'), (4, 5, 5, 4.5, true, 'Docker Certified'), (4, 6, 4, 3.0, false, NULL),
(5, 12, 5, 3.5, true, 'Figma Professional'), (5, 1, 3, 2.0, false, NULL),
(6, 1, 3, 4.0, false, NULL), (6, 2, 2, 2.0, false, NULL),
(7, 3, 5, 4.0, true, 'Python Institute'), (7, 15, 4, 2.5, false, NULL), (7, 8, 3, 2.0, false, NULL),
(8, 1, 2, 0.5, false, NULL), (8, 9, 2, 0.5, false, NULL),
(9, 13, 2, 0.3, false, NULL), (9, 14, 2, 0.3, false, NULL),
(10, 2, 4, 2.5, false, NULL), (10, 3, 3, 2.0, false, NULL), (10, 7, 4, 3.0, false, NULL);

-- Insert sample projects
INSERT INTO projects (name, description, client_id, manager_id, team_lead_id, status, priority, health_score, health_status, delivery_risk, start_date, end_date, budget, actual_cost, revenue, progress_percentage, technology_stack, methodology, project_type, contract_type) VALUES
('E-Commerce Platform Redesign', 'Complete overhaul of existing e-commerce platform with modern UI/UX', 1, 6, 1, 'In Progress', 'High', 88, 'Green', 'Low', '2024-01-15', '2024-08-15', 850000.00, 425000.00, 1020000.00, 65, ARRAY['React', 'Node.js', 'PostgreSQL', 'AWS'], 'Agile', 'Development', 'Fixed Bid'),
('Mobile Banking App', 'New mobile application for banking services with enhanced security', 2, 6, 4, 'In Progress', 'Critical', 75, 'Yellow', 'Medium', '2024-02-01', '2024-09-30', 1200000.00, 600000.00, 1440000.00, 45, ARRAY['React Native', 'Node.js', 'MongoDB', 'AWS'], 'Agile', 'Development', 'Time & Material'),
('Inventory Management System', 'Automated inventory tracking and management system', 3, 6, 10, 'Planning', 'Medium', 95, 'Green', 'Low', '2024-04-01', '2024-11-30', 650000.00, 0.00, 780000.00, 10, ARRAY['Vue.js', 'Python', 'PostgreSQL'], 'Waterfall', 'Development', 'Fixed Bid'),
('Patient Portal Enhancement', 'Improved patient experience and data management portal', 4, 6, 1, 'In Progress', 'High', 82, 'Green', 'Medium', '2024-01-20', '2024-07-20', 750000.00, 300000.00, 900000.00, 55, ARRAY['React', 'Java', 'PostgreSQL', 'AWS'], 'Agile', 'Development', 'Outcome Based'),
('Learning Management System', 'Comprehensive online education platform', 5, 6, 7, 'On Hold', 'Low', 60, 'Red', 'High', '2024-03-01', '2024-12-15', 900000.00, 180000.00, 1080000.00, 20, ARRAY['Angular', 'Node.js', 'MongoDB'], 'Agile', 'Development', 'Retainer');

-- Insert sample project allocations
INSERT INTO project_allocations (project_id, resource_id, allocation_percentage, start_date, end_date, role_in_project, hourly_rate, total_hours_allocated, efficiency_rating, utilization_percentage, is_billable) VALUES
(1, 1, 80, '2024-01-15', '2024-08-15', 'Lead Developer', 125.00, 1280, 4.5, 78.0, true),
(1, 2, 100, '2024-01-20', '2024-08-15', 'Frontend Developer', 95.00, 1240, 4.0, 95.0, true),
(1, 3, 60, '2024-02-01', '2024-07-30', 'QA Lead', 110.00, 780, 4.2, 58.0, true),
(2, 1, 20, '2024-02-01', '2024-09-30', 'Technical Architect', 125.00, 640, 4.5, 22.0, true),
(2, 7, 80, '2024-02-05', '2024-09-30', 'Data Analyst', 105.00, 1280, 4.1, 82.0, true),
(2, 4, 50, '2024-02-10', '2024-09-30', 'DevOps Engineer', 140.00, 800, 4.8, 52.0, true),
(4, 10, 90, '2024-01-20', '2024-07-20', 'Backend Developer', 90.00, 1080, 3.9, 88.0, true),
(4, 3, 40, '2024-03-01', '2024-06-30', 'QA Engineer', 110.00, 520, 4.2, 42.0, true);

-- Insert sample deliverables
INSERT INTO deliverables (project_id, name, description, due_date, completion_date, status, priority, assigned_to, reviewed_by, completion_percentage, quality_score, deliverable_type, estimated_hours, actual_hours, acceptance_criteria) VALUES
(1, 'User Interface Redesign', 'Complete UI overhaul for e-commerce platform', '2024-04-15', '2024-04-10', 'Completed', 'High', 2, 1, 100, 92, 'Feature', 120.0, 115.0, 'Responsive design, accessibility compliant, cross-browser compatible'),
(1, 'Backend API Development', 'RESTful API for product catalog and orders', '2024-06-15', NULL, 'In Progress', 'Critical', 1, 6, 75, 88, 'Feature', 200.0, 150.0, 'Full CRUD operations, proper error handling, documentation'),
(1, 'Payment Integration', 'Integration with multiple payment gateways', '2024-07-01', NULL, 'Pending', 'High', 1, 6, 0, 0, 'Feature', 80.0, 0.0, 'Support for 3 payment methods, PCI compliance, error handling'),
(2, 'Mobile App MVP', 'Minimum viable product for mobile banking', '2024-05-30', NULL, 'In Progress', 'Critical', 7, 4, 60, 85, 'Feature', 300.0, 180.0, 'Basic banking functions, biometric authentication, secure transactions'),
(2, 'Security Framework', 'Implementation of banking security standards', '2024-04-30', NULL, 'Delayed', 'Critical', 4, 6, 40, 80, 'Feature', 160.0, 64.0, 'Multi-factor authentication, encryption, audit trails'),
(4, 'Patient Dashboard', 'Patient information and appointment system', '2024-05-15', NULL, 'In Progress', 'Medium', 10, 1, 70, 87, 'Feature', 100.0, 70.0, 'Patient data display, appointment scheduling, secure messaging');

-- Insert sample engineering metrics
INSERT INTO engineering_metrics (project_id, metric_date, code_quality_score, test_coverage, bugs_reported, bugs_resolved, bugs_critical, bugs_high, technical_debt_hours, deployment_frequency, deployment_success_rate, lead_time_hours, commits_count, lines_of_code, code_review_time_avg, developer_productivity_score, technical_debt_ratio) VALUES
(1, '2024-03-01', 88, 85.5, 12, 10, 0, 2, 40, 15, 96.5, 48, 245, 15000, 3.5, 92, 6.8),
(1, '2024-03-15', 90, 87.2, 8, 8, 1, 1, 35, 18, 98.2, 36, 189, 16500, 2.8, 95, 5.2),
(2, '2024-03-01', 82, 78.3, 18, 15, 2, 4, 65, 12, 94.1, 72, 156, 12000, 4.2, 78, 8.9),
(2, '2024-03-15', 85, 81.7, 14, 14, 1, 3, 55, 14, 96.8, 60, 203, 13200, 3.8, 82, 7.5),
(4, '2024-03-01', 91, 92.1, 6, 6, 0, 1, 25, 20, 99.1, 24, 178, 9500, 2.1, 96, 4.2),
(4, '2024-03-15', 89, 89.8, 9, 8, 0, 2, 30, 16, 97.5, 36, 145, 10200, 2.6, 93, 5.1);

-- Insert sample QA metrics
INSERT INTO qa_metrics (project_id, metric_date, test_cases_total, test_cases_passed, test_cases_failed, test_cases_blocked, automation_coverage, manual_test_hours, automated_test_hours, defects_found, defects_fixed, defect_removal_efficiency, regression_test_time, test_execution_rate, performance_test_score, security_test_score) VALUES
(1, '2024-03-01', 450, 425, 25, 5, 75.5, 120.0, 80.0, 15, 13, 91.5, 180, 94.4, 88, 92),
(1, '2024-03-15', 520, 498, 22, 8, 78.2, 110.0, 90.0, 12, 11, 93.2, 165, 95.8, 90, 94),
(2, '2024-03-01', 380, 342, 38, 12, 68.7, 160.0, 60.0, 22, 18, 87.3, 240, 90.0, 82, 88),
(2, '2024-03-15', 425, 389, 36, 8, 72.1, 145.0, 75.0, 20, 18, 89.1, 220, 91.5, 85, 90),
(4, '2024-03-01', 285, 275, 10, 2, 82.5, 80.0, 100.0, 8, 7, 95.2, 140, 96.5, 92, 95),
(4, '2024-03-15', 320, 308, 12, 4, 80.8, 85.0, 110.0, 10, 9, 94.1, 155, 96.3, 90, 93);

-- Insert sample escalations
INSERT INTO escalations (project_id, title, description, priority, severity, status, escalation_type, raised_by, assigned_to, raised_date, due_date, resolved_date, resolution_time_hours, resolution_notes, impact_assessment) VALUES
(2, 'Security Vulnerability in Authentication', 'Critical security flaw discovered in user authentication module', 'Critical', 'Critical', 'Resolved', 'Technical', 7, 4, '2024-03-05 09:30:00', '2024-03-06 18:00:00', '2024-03-06 14:45:00', 29, 'Implemented additional encryption layer and updated authentication flow', 'High impact on user data security, immediate fix required'),
(1, 'Performance Issues with Product Search', 'Slow response times affecting user experience during peak hours', 'High', 'High', 'In Progress', 'Technical', 3, 1, '2024-03-10 11:20:00', '2024-03-15 17:00:00', NULL, NULL, NULL, 'Medium impact on user satisfaction, optimization needed for search algorithms'),
(5, 'Integration Failure with LMS Platform', 'Third-party integration not working as expected due to API changes', 'Medium', 'Medium', 'Open', 'Technical', 6, NULL, '2024-03-12 16:15:00', '2024-03-20 17:00:00', NULL, NULL, NULL, 'Low impact on core functionality, alternative solutions being evaluated');

-- Insert sample financial tracking
INSERT INTO financial_tracking (project_id, department_id, period_start, period_end, budget_allocated, budget_utilized, revenue_generated, revenue_recognized, profit_margin, resource_cost, operational_cost, burn_rate, roi_percentage, billing_rate, cost_per_hour) VALUES
(1, 1, '2024-01-01', '2024-03-31', 425000.00, 318750.00, 510000.00, 459000.00, 37.5, 280000.00, 38750.00, 106250.00, 42.3, 120.00, 85.50),
(2, 1, '2024-02-01', '2024-04-30', 600000.00, 400000.00, 720000.00, 648000.00, 44.4, 350000.00, 50000.00, 133333.00, 38.7, 135.00, 95.20),
(4, 1, '2024-01-01', '2024-03-31', 300000.00, 200000.00, 375000.00, 337500.00, 46.7, 175000.00, 25000.00, 66667.00, 52.1, 115.00, 78.30);

-- Insert sample salary details
INSERT INTO salary_details (resource_id, base_salary, bonus, benefits, total_compensation, effective_date, review_date, grade_level, salary_band, equity_percentage) VALUES
(1, 120000.00, 15000.00, 18000.00, 153000.00, '2024-01-01', '2024-12-31', 'L4', 'Senior', 0.15),
(2, 85000.00, 8500.00, 12750.00, 106250.00, '2024-01-01', '2024-12-31', 'L3', 'Mid', 0.08),
(3, 95000.00, 10000.00, 14250.00, 119250.00, '2024-01-01', '2024-12-31', 'L4', 'Senior', 0.12),
(4, 130000.00, 20000.00, 19500.00, 169500.00, '2024-01-01', '2024-12-31', 'L5', 'Lead', 0.25),
(5, 75000.00, 7500.00, 11250.00, 93750.00, '2024-01-01', '2024-12-31', 'L3', 'Mid', 0.05),
(6, 110000.00, 15000.00, 16500.00, 141500.00, '2024-01-01', '2024-12-31', 'L4', 'Senior', 0.18),
(7, 95000.00, 12000.00, 14250.00, 121250.00, '2024-01-01', '2024-12-31', 'L3', 'Mid', 0.10),
(8, 60000.00, 3000.00, 9000.00, 72000.00, '2024-01-01', '2024-12-31', 'L1', 'Junior', 0.02),
(9, 55000.00, 2500.00, 8250.00, 65750.00, '2024-01-01', '2024-12-31', 'L1', 'Junior', 0.02),
(10, 80000.00, 6000.00, 12000.00, 98000.00, '2024-01-01', '2024-12-31', 'L2', 'Mid', 0.06);

-- Insert sample company KPIs
INSERT INTO company_kpis (kpi_date, total_employees, billable_employees, bench_employees, billable_utilization, revenue_per_employee, cost_per_employee, project_success_rate, client_satisfaction_score, employee_satisfaction_score, on_time_delivery_rate, budget_variance, quality_score, total_revenue, total_profit) VALUES
('2024-01-31', 10, 7, 2, 78.5, 152000.00, 115000.00, 88.2, 4.3, 4.1, 82.5, 4.2, 87.5, 1520000.00, 380000.00),
('2024-02-29', 10, 8, 1, 82.3, 165000.00, 118000.00, 91.5, 4.4, 4.2, 85.0, 3.8, 89.2, 1650000.00, 412000.00),
('2024-03-31', 10, 7, 2, 79.8, 158000.00, 120000.00, 89.7, 4.2, 4.0, 78.5, 5.1, 86.8, 1580000.00, 395000.00);

-- Insert sample performance reviews
INSERT INTO performance_reviews (resource_id, reviewer_id, review_type, review_period_start, review_period_end, overall_rating, technical_skills_rating, communication_rating, leadership_rating, problem_solving_rating, teamwork_rating, goals_achievements, areas_improvement, feedback, promotion_readiness, salary_recommendation, bonus_recommendation) VALUES
(1, 6, 'Annual', '2023-07-01', '2023-12-31', 4.5, 4.8, 4.2, 4.3, 4.6, 4.4, 'Delivered 3 major features ahead of schedule. Mentored 2 junior developers successfully.', 'Could improve documentation practices and knowledge sharing', 'Excellent technical contributor with strong leadership potential. Ready for promotion to Lead role.', 'Ready', 135000.00, 18000.00),
(2, 1, 'Annual', '2023-07-01', '2023-12-31', 4.0, 4.2, 3.8, 3.5, 4.1, 4.0, 'Successfully completed frontend redesign project with good quality standards', 'Needs to improve backend knowledge and system design skills', 'Solid frontend developer, encourage full-stack learning for career growth', 'Partially Ready', 92000.00, 10000.00),
(3, 6, 'Annual', '2023-07-01', '2023-12-31', 4.2, 4.0, 4.5, 4.0, 4.3, 4.4, 'Implemented comprehensive testing strategy that improved overall product quality', 'Could automate more test scenarios and improve CI/CD integration', 'Reliable QA engineer with excellent communication skills and attention to detail', 'Partially Ready', 102000.00, 12000.00);

-- Insert sample time entries
INSERT INTO time_entries (allocation_id, resource_id, project_id, entry_date, hours_worked, description, task_type, activity_type, is_billable, is_approved, approved_by, overtime_hours) VALUES
(1, 1, 1, '2024-03-01', 8.0, 'API development for product catalog with search functionality', 'Backend Development', 'Development', true, true, 6, 0.0),
(1, 1, 1, '2024-03-02', 7.5, 'Code review and bug fixes for authentication module', 'Code Review', 'Development', true, true, 6, 0.0),
(2, 2, 1, '2024-03-01', 8.0, 'UI component development for product listing page', 'Frontend Development', 'Development', true, true, 1, 0.0),
(2, 2, 1, '2024-03-02', 8.0, 'Frontend integration testing with backend APIs', 'Integration Testing', 'Testing', true, true, 1, 0.0),
(3, 3, 1, '2024-03-01', 4.8, 'Test case creation and execution for checkout flow', 'Test Case Development', 'Testing', true, true, 6, 0.0),
(5, 7, 2, '2024-03-01', 6.4, 'Data analysis and reporting dashboard development', 'Data Analysis', 'Analysis', true, true, 6, 0.0);

-- Insert sample resource availability
INSERT INTO resource_availability (resource_id, start_date, end_date, availability_percentage, reason, type, status, approved_by, requested_by) VALUES
(5, '2024-03-15', '2024-03-22', 0, 'Annual vacation to Europe', 'Vacation', 'Approved', 6, 5),
(8, '2024-03-01', '2024-03-31', 50, 'React Advanced Training Program', 'Training', 'Approved', 1, 8),
(9, '2024-04-01', '2024-04-07', 0, 'Medical leave for surgery', 'Sick Leave', 'Approved', 6, 9);

-- Insert sample notifications
INSERT INTO notifications (user_id, title, message, type, priority, action_url, metadata) VALUES
(3, 'New Project Assignment', 'You have been assigned to E-Commerce Platform Redesign project', 'Info', 'Medium', '/projects/1', '{"project_id": 1, "role": "QA Lead"}'),
(1, 'Code Review Required', 'Backend API Development deliverable is ready for review', 'Warning', 'High', '/deliverables/2', '{"deliverable_id": 2, "project_id": 1}'),
(6, 'Escalation Alert', 'New critical escalation raised for Mobile Banking App', 'Error', 'Critical', '/escalations/1', '{"escalation_id": 1, "project_id": 2}');

-- Insert sample comments
INSERT INTO comments (entity_type, entity_id, user_id, content, is_internal) VALUES
('project', 1, 1, 'Project is progressing well. API development is ahead of schedule.', false),
('deliverable', 2, 6, 'Please ensure proper error handling is implemented before final review.', true),
('escalation', 1, 4, 'Security patch has been applied. Running additional penetration tests.', false);

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
