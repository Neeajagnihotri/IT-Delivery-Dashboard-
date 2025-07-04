
-- =============================================================================
-- IT DELIVERY DASHBOARD - UNIFIED DATABASE SCHEMA
-- =============================================================================
-- Version: 2.0
-- Created: 2024-07-04
-- Description: Complete database schema for IT Delivery Dashboard
-- =============================================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

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

-- Fixed Function to update project health score
CREATE OR REPLACE FUNCTION update_project_health()
RETURNS TRIGGER AS $$
DECLARE
    target_project_id INTEGER;
    health_score INTEGER;
    deliverable_score INTEGER;
    budget_score INTEGER;
    timeline_score INTEGER;
BEGIN
    -- Get project ID from context
    IF TG_TABLE_NAME = 'deliverables' THEN
        target_project_id = COALESCE(NEW.project_id, OLD.project_id);
    ELSIF TG_TABLE_NAME = 'financial_tracking' THEN
        target_project_id = COALESCE(NEW.project_id, OLD.project_id);
    ELSIF TG_TABLE_NAME = 'escalations' THEN
        target_project_id = COALESCE(NEW.project_id, OLD.project_id);
    END IF;

    -- Calculate deliverable score
    SELECT ROUND(
        (COUNT(CASE WHEN status = 'Completed' THEN 1 END)::DECIMAL / 
         NULLIF(COUNT(*), 0)) * 100
    ) INTO deliverable_score 
    FROM deliverables WHERE project_id = target_project_id;

    -- Calculate budget score
    SELECT CASE 
        WHEN budget_allocated > 0 THEN 
            GREATEST(0, 100 - ((budget_utilized / budget_allocated) * 100))
        ELSE 100 
    END INTO budget_score
    FROM financial_tracking WHERE project_id = target_project_id
    ORDER BY period_end DESC LIMIT 1;

    -- Calculate overall health score
    health_score = COALESCE(
        (COALESCE(deliverable_score, 85) + COALESCE(budget_score, 85)) / 2, 
        85
    );

    -- Update project health
    UPDATE projects SET 
        health_score = health_score,
        health_status = CASE 
            WHEN health_score >= 80 THEN 'Green'
            WHEN health_score >= 60 THEN 'Yellow'
            ELSE 'Red'
        END,
        escalation_count = (
            SELECT COUNT(*) FROM escalations 
            WHERE project_id = target_project_id 
            AND status = 'Open'
        )
    WHERE id = target_project_id;

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
('Python', 'Backend', 'High-level programming language', 88, 2),
('AWS', 'Cloud', 'Amazon Web Services cloud platform', 92, 4),
('PostgreSQL', 'Database', 'Advanced open-source relational database', 75, 3),
('Docker', 'DevOps', 'Containerization platform', 85, 3),
('Kubernetes', 'DevOps', 'Container orchestration platform', 80, 4),
('TypeScript', 'Frontend', 'Typed superset of JavaScript', 85, 3),
('GraphQL', 'Backend', 'Query language for APIs', 70, 3),
('Jest', 'Testing', 'JavaScript testing framework', 75, 2),
('Cypress', 'Testing', 'End-to-end testing framework', 68, 3),
('Redis', 'Database', 'In-memory data structure store', 65, 3),
('MongoDB', 'Database', 'NoSQL document database', 78, 2),
('Vue.js', 'Frontend', 'Progressive JavaScript framework', 70, 3),
('Angular', 'Frontend', 'Platform for building mobile and desktop applications', 75, 4),
('Java', 'Backend', 'Object-oriented programming language', 82, 3),
('Spring Boot', 'Backend', 'Java-based framework', 78, 4),
('Microservices', 'Backend', 'Architectural approach', 85, 4),
('Jenkins', 'DevOps', 'Automation server for CI/CD', 70, 3),
('Terraform', 'DevOps', 'Infrastructure as code tool', 75, 4);

-- Insert sample clients
INSERT INTO clients (name, contact_person, email, phone, industry, tier, contract_value) VALUES
('TechCorp Solutions', 'John Smith', 'john@techcorp.com', '+1-555-1001', 'Technology', 'Enterprise', 2500000.00),
('FinanceFlow Inc', 'Sarah Johnson', 'sarah@financeflow.com', '+1-555-1002', 'Financial Services', 'Premium', 1800000.00),
('HealthTech Innovations', 'Mike Chen', 'mike@healthtech.com', '+1-555-1003', 'Healthcare', 'Enterprise', 3200000.00),
('RetailMax Corp', 'Lisa Williams', 'lisa@retailmax.com', '+1-555-1004', 'Retail', 'Standard', 950000.00),
('EduPlatform Ltd', 'David Brown', 'david@eduplatform.com', '+1-555-1005', 'Education', 'Premium', 1200000.00);

-- Insert sample resources
INSERT INTO resources (employee_id, name, email, department_id, role, level, status, hire_date, location, phone, shadow_progress, shadow_status, performance_rating, billable_rate, cost_to_company) VALUES
('EMP001', 'Alice Johnson', 'alice.johnson@zapcg.com', 1, 'Senior Full Stack Developer', 'Senior', 'Billable', '2022-01-15', 'New York', '+1-555-2001', NULL, 'Not Applicable', 4.2, 95.00, 120000.00),
('EMP002', 'Bob Smith', 'bob.smith@zapcg.com', 1, 'React Developer', 'Mid', 'Billable', '2022-03-20', 'New York', '+1-555-2002', NULL, 'Not Applicable', 3.8, 75.00, 95000.00),
('EMP003', 'Carol Davis', 'carol.davis@zapcg.com', 2, 'QA Engineer', 'Senior', 'Billable', '2021-11-10', 'Austin', '+1-555-2003', NULL, 'Not Applicable', 4.0, 70.00, 85000.00),
('EMP004', 'David Wilson', 'david.wilson@zapcg.com', 3, 'DevOps Engineer', 'Lead', 'Billable', '2021-06-01', 'Seattle', '+1-555-2004', NULL, 'Not Applicable', 4.5, 110.00, 135000.00),
('EMP005', 'Emma Brown', 'emma.brown@zapcg.com', 4, 'UI/UX Designer', 'Senior', 'Billable', '2022-02-14', 'San Francisco', '+1-555-2005', NULL, 'Not Applicable', 4.1, 85.00, 105000.00),
('EMP006', 'Frank Miller', 'frank.miller@zapcg.com', 1, 'Junior Developer', 'Junior', 'Shadow', '2024-01-15', 'New York', '+1-555-2006', 45, 'Learning', 3.2, 45.00, 65000.00),
('EMP007', 'Grace Lee', 'grace.lee@zapcg.com', 5, 'Project Manager', 'Senior', 'Billable', '2021-09-01', 'Chicago', '+1-555-2007', NULL, 'Not Applicable', 4.3, 90.00, 115000.00),
('EMP008', 'Henry Taylor', 'henry.taylor@zapcg.com', 1, 'Backend Developer', 'Mid', 'Benched', '2022-08-20', 'New York', '+1-555-2008', NULL, 'Not Applicable', 3.7, 80.00, 100000.00),
('EMP009', 'Ivy Chen', 'ivy.chen@zapcg.com', 6, 'Data Scientist', 'Senior', 'Billable', '2021-04-12', 'Boston', '+1-555-2009', NULL, 'Not Applicable', 4.4, 105.00, 130000.00),
('EMP010', 'Jack Robinson', 'jack.robinson@zapcg.com', 2, 'Test Automation Engineer', 'Mid', 'Billable', '2022-05-30', 'Austin', '+1-555-2010', NULL, 'Not Applicable', 3.9, 75.00, 90000.00);

-- Update department heads (after resources are inserted)
UPDATE departments SET head_id = 1 WHERE name = 'Engineering';
UPDATE departments SET head_id = 3 WHERE name = 'Quality Assurance';
UPDATE departments SET head_id = 4 WHERE name = 'DevOps';
UPDATE departments SET head_id = 5 WHERE name = 'Design';
UPDATE departments SET head_id = 7 WHERE name = 'Project Management';
UPDATE departments SET head_id = 9 WHERE name = 'Data Science';

-- Insert sample projects
INSERT INTO projects (name, description, client_id, manager_id, team_lead_id, status, priority, start_date, end_date, budget, technology_stack, health_score, health_status) VALUES
('E-commerce Platform', 'Modern e-commerce solution with React and Node.js', 1, 7, 1, 'Active', 'High', '2024-01-15', '2024-12-31', 850000.00, ARRAY['React', 'Node.js', 'PostgreSQL', 'AWS'], 88, 'Green'),
('Banking Mobile App', 'Secure mobile banking application', 2, 7, 2, 'Active', 'Critical', '2024-02-01', '2025-01-31', 1200000.00, ARRAY['React Native', 'Java', 'MongoDB'], 75, 'Yellow'),
('Healthcare Dashboard', 'Patient management system', 3, 7, 1, 'Active', 'High', '2024-03-01', '2024-11-30', 950000.00, ARRAY['Vue.js', 'Python', 'PostgreSQL'], 92, 'Green'),
('Retail Analytics Platform', 'Customer analytics and reporting', 4, 7, 9, 'Planning', 'Medium', '2024-07-01', '2025-03-31', 650000.00, ARRAY['React', 'Python', 'Redis'], 85, 'Green'),
('Education Portal', 'Online learning management system', 5, 7, 2, 'Active', 'Medium', '2024-04-15', '2024-12-15', 750000.00, ARRAY['Angular', 'Node.js', 'MongoDB'], 70, 'Yellow');

-- Insert sample project allocations
INSERT INTO project_allocations (project_id, resource_id, allocation_percentage, start_date, end_date, role_in_project, hourly_rate, total_hours_allocated, total_hours_worked, utilization_percentage) VALUES
(1, 1, 100, '2024-01-15', '2024-12-31', 'Technical Lead', 95.00, 1600, 1200, 85.5),
(1, 2, 80, '2024-01-20', '2024-12-31', 'Frontend Developer', 75.00, 1280, 980, 82.3),
(1, 3, 60, '2024-02-01', '2024-11-30', 'QA Engineer', 70.00, 960, 720, 78.9),
(2, 1, 80, '2024-02-01', '2025-01-31', 'Technical Architect', 95.00, 1600, 800, 90.2),
(2, 8, 100, '2024-02-15', '2025-01-31', 'Backend Developer', 80.00, 1800, 900, 88.7),
(3, 2, 100, '2024-03-01', '2024-11-30', 'Frontend Lead', 75.00, 1400, 1050, 87.1),
(3, 5, 50, '2024-03-01', '2024-11-30', 'UI/UX Designer', 85.00, 700, 525, 79.5),
(4, 9, 100, '2024-07-01', '2025-03-31', 'Data Science Lead', 105.00, 1600, 400, 92.3),
(5, 2, 60, '2024-04-15', '2024-12-15', 'Frontend Developer', 75.00, 960, 720, 84.2);

COMMENT ON DATABASE CURRENT_DATABASE() IS 'IT Delivery Dashboard - Unified database schema for comprehensive project and resource management';
