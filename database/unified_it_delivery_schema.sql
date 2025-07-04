
-- =============================================================================
-- IT DELIVERY DASHBOARD - COMPREHENSIVE DATABASE SCHEMA
-- =============================================================================
-- Version: 4.0
-- Created: 2024-07-04
-- Description: Complete database schema matching IT Delivery Dashboard requirements
-- =============================================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =============================================================================
-- AUTHENTICATION AND USER MANAGEMENT
-- =============================================================================

-- Users table for authentication and role-based access
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

-- =============================================================================
-- CORE BUSINESS ENTITIES
-- =============================================================================

-- Departments table
CREATE TABLE departments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    budget DECIMAL(15,2),
    head_of_department VARCHAR(100),
    location VARCHAR(100),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Skills table
CREATE TABLE skills (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    category VARCHAR(50) NOT NULL,
    market_demand VARCHAR(20) DEFAULT 'Medium',
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT chk_market_demand CHECK (market_demand IN ('Low', 'Medium', 'High', 'Critical'))
);

-- Clients table
CREATE TABLE clients (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    industry VARCHAR(100),
    contact_person VARCHAR(100),
    email VARCHAR(255),
    phone VARCHAR(20),
    address TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Resources table (main employee/contractor table)
CREATE TABLE resources (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE,
    department_id INTEGER,
    role VARCHAR(100) NOT NULL,
    status VARCHAR(50) DEFAULT 'Available',
    level VARCHAR(20) DEFAULT 'Junior',
    hire_date DATE,
    location VARCHAR(100),
    phone VARCHAR(20),
    is_active BOOLEAN DEFAULT TRUE,
    shadow_progress INTEGER DEFAULT 0,
    shadow_status VARCHAR(30),
    bench_reason VARCHAR(200),
    bench_start_date DATE,
    performance_rating DECIMAL(3,2) DEFAULT 3.0,
    billable_rate DECIMAL(10,2),
    base_salary DECIMAL(12,2),
    bonus DECIMAL(10,2) DEFAULT 0,
    last_review_date DATE,
    next_review_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT chk_resource_status CHECK (status IN ('Billable', 'Benched', 'Shadow', 'Available', 'On Leave', 'Transition')),
    CONSTRAINT chk_resource_level CHECK (level IN ('Junior', 'Mid', 'Senior', 'Lead', 'Principal')),
    CONSTRAINT chk_shadow_progress CHECK (shadow_progress >= 0 AND shadow_progress <= 100),
    CONSTRAINT chk_performance_rating CHECK (performance_rating >= 1.0 AND performance_rating <= 5.0),
    FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL
);

-- Resource Skills mapping table
CREATE TABLE resource_skills (
    id SERIAL PRIMARY KEY,
    resource_id INTEGER NOT NULL,
    skill_id INTEGER NOT NULL,
    proficiency_level INTEGER DEFAULT 3,
    years_experience DECIMAL(3,1) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT chk_proficiency CHECK (proficiency_level >= 1 AND proficiency_level <= 5),
    FOREIGN KEY (resource_id) REFERENCES resources(id) ON DELETE CASCADE,
    FOREIGN KEY (skill_id) REFERENCES skills(id) ON DELETE CASCADE,
    UNIQUE(resource_id, skill_id)
);

-- Projects table
CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    client_id INTEGER,
    manager_id INTEGER,
    status VARCHAR(50) DEFAULT 'Planning',
    start_date DATE NOT NULL,
    end_date DATE,
    budget DECIMAL(15,2),
    priority VARCHAR(20) DEFAULT 'Medium',
    technology_stack TEXT[],
    health_score INTEGER DEFAULT 50,
    health_status VARCHAR(20) DEFAULT 'Yellow',
    delivery_risk VARCHAR(20) DEFAULT 'Medium',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT chk_project_status CHECK (status IN ('Planning', 'In Progress', 'Completed', 'On Hold', 'Cancelled')),
    CONSTRAINT chk_project_priority CHECK (priority IN ('Low', 'Medium', 'High', 'Critical')),
    CONSTRAINT chk_health_score CHECK (health_score >= 0 AND health_score <= 100),
    CONSTRAINT chk_health_status CHECK (health_status IN ('Green', 'Yellow', 'Red')),
    CONSTRAINT chk_delivery_risk CHECK (delivery_risk IN ('Low', 'Medium', 'High', 'Critical')),
    CONSTRAINT chk_project_dates CHECK (end_date IS NULL OR start_date <= end_date),
    FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE SET NULL,
    FOREIGN KEY (manager_id) REFERENCES resources(id) ON DELETE SET NULL
);

-- Project Resources (many-to-many relationship)
CREATE TABLE project_resources (
    id SERIAL PRIMARY KEY,
    project_id INTEGER NOT NULL,
    resource_id INTEGER NOT NULL,
    allocation_percentage INTEGER DEFAULT 100,
    start_date DATE DEFAULT CURRENT_DATE,
    end_date DATE,
    role_in_project VARCHAR(100),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT chk_allocation CHECK (allocation_percentage >= 0 AND allocation_percentage <= 100),
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    FOREIGN KEY (resource_id) REFERENCES resources(id) ON DELETE CASCADE
);

-- Deliverables table
CREATE TABLE deliverables (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    project_id INTEGER NOT NULL,
    assigned_to INTEGER,
    status VARCHAR(30) DEFAULT 'Pending',
    priority VARCHAR(20) DEFAULT 'Medium',
    due_date DATE NOT NULL,
    completion_date DATE,
    completion_percentage INTEGER DEFAULT 0,
    estimated_hours INTEGER,
    actual_hours INTEGER,
    deliverable_type VARCHAR(50) DEFAULT 'Feature',
    acceptance_criteria TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT chk_deliverable_status CHECK (status IN ('Pending', 'In Progress', 'Completed', 'Delayed', 'Blocked')),
    CONSTRAINT chk_deliverable_priority CHECK (priority IN ('Low', 'Medium', 'High', 'Critical')),
    CONSTRAINT chk_completion_percentage CHECK (completion_percentage >= 0 AND completion_percentage <= 100),
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    FOREIGN KEY (assigned_to) REFERENCES resources(id) ON DELETE SET NULL
);

-- Escalations table
CREATE TABLE escalations (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    project_id INTEGER,
    priority VARCHAR(20) NOT NULL DEFAULT 'Medium',
    status VARCHAR(20) DEFAULT 'Open',
    escalation_type VARCHAR(50) DEFAULT 'Technical',
    raised_by INTEGER NOT NULL,
    assigned_to INTEGER,
    raised_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    due_date TIMESTAMP,
    resolution_notes TEXT,
    resolved_date TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT chk_escalation_priority CHECK (priority IN ('Low', 'Medium', 'High', 'Critical')),
    CONSTRAINT chk_escalation_status CHECK (status IN ('Open', 'In Progress', 'Resolved', 'Closed', 'Escalated')),
    CONSTRAINT chk_escalation_type CHECK (escalation_type IN ('Technical', 'Resource', 'Budget', 'Timeline', 'Quality', 'Client')),
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE SET NULL,
    FOREIGN KEY (raised_by) REFERENCES resources(id) ON DELETE CASCADE,
    FOREIGN KEY (assigned_to) REFERENCES resources(id) ON DELETE SET NULL
);

-- =============================================================================
-- METRICS AND ANALYTICS TABLES
-- =============================================================================

-- Engineering Metrics table
CREATE TABLE engineering_metrics (
    id SERIAL PRIMARY KEY,
    project_id INTEGER NOT NULL,
    metric_date DATE NOT NULL DEFAULT CURRENT_DATE,
    commits_count INTEGER DEFAULT 0,
    lines_of_code INTEGER DEFAULT 0,
    code_quality_score INTEGER DEFAULT 0,
    test_coverage INTEGER DEFAULT 0,
    bugs_reported INTEGER DEFAULT 0,
    bugs_resolved INTEGER DEFAULT 0,
    code_review_time_avg DECIMAL(5,2) DEFAULT 0,
    deployment_frequency INTEGER DEFAULT 0,
    lead_time_hours DECIMAL(8,2) DEFAULT 0,
    developer_productivity_score INTEGER DEFAULT 0,
    technical_debt_ratio DECIMAL(5,2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT chk_code_quality CHECK (code_quality_score >= 0 AND code_quality_score <= 100),
    CONSTRAINT chk_test_coverage CHECK (test_coverage >= 0 AND test_coverage <= 100),
    CONSTRAINT chk_productivity CHECK (developer_productivity_score >= 0 AND developer_productivity_score <= 100),
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    UNIQUE(project_id, metric_date)
);

-- QA Metrics table
CREATE TABLE qa_metrics (
    id SERIAL PRIMARY KEY,
    project_id INTEGER NOT NULL,
    metric_date DATE NOT NULL DEFAULT CURRENT_DATE,
    test_cases_total INTEGER DEFAULT 0,
    test_cases_passed INTEGER DEFAULT 0,
    test_cases_failed INTEGER DEFAULT 0,
    automation_coverage INTEGER DEFAULT 0,
    manual_test_hours INTEGER DEFAULT 0,
    defects_found INTEGER DEFAULT 0,
    defects_fixed INTEGER DEFAULT 0,
    defect_removal_efficiency DECIMAL(5,2) DEFAULT 0,
    test_execution_rate DECIMAL(5,2) DEFAULT 0,
    regression_test_success DECIMAL(5,2) DEFAULT 0,
    performance_test_score INTEGER DEFAULT 0,
    security_test_score INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT chk_automation_coverage CHECK (automation_coverage >= 0 AND automation_coverage <= 100),
    CONSTRAINT chk_defect_removal CHECK (defect_removal_efficiency >= 0 AND defect_removal_efficiency <= 100),
    CONSTRAINT chk_test_execution CHECK (test_execution_rate >= 0 AND test_execution_rate <= 100),
    CONSTRAINT chk_regression_success CHECK (regression_test_success >= 0 AND regression_test_success <= 100),
    CONSTRAINT chk_performance_score CHECK (performance_test_score >= 0 AND performance_test_score <= 100),
    CONSTRAINT chk_security_score CHECK (security_test_score >= 0 AND security_test_score <= 100),
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    UNIQUE(project_id, metric_date)
);

-- Financial Overview table
CREATE TABLE financial_overview (
    id SERIAL PRIMARY KEY,
    month DATE NOT NULL,
    total_budget DECIMAL(15,2) DEFAULT 0,
    budget_utilized DECIMAL(15,2) DEFAULT 0,
    revenue_generated DECIMAL(15,2) DEFAULT 0,
    profit_margin DECIMAL(5,2) DEFAULT 0,
    burn_rate DECIMAL(12,2) DEFAULT 0,
    project_count INTEGER DEFAULT 0,
    billable_resources INTEGER DEFAULT 0,
    cost_per_resource DECIMAL(10,2) DEFAULT 0,
    revenue_per_resource DECIMAL(10,2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(month)
);

-- Company KPIs (for dashboard summary)
CREATE TABLE company_kpis (
    id SERIAL PRIMARY KEY,
    kpi_date DATE NOT NULL DEFAULT CURRENT_DATE,
    revenue DECIMAL(15,2) DEFAULT 0,
    profit_margin DECIMAL(5,2) DEFAULT 0,
    employee_utilization DECIMAL(5,2) DEFAULT 0,
    client_satisfaction DECIMAL(3,2) DEFAULT 0,
    project_delivery_rate DECIMAL(5,2) DEFAULT 0,
    quality_score DECIMAL(5,2) DEFAULT 0,
    employee_satisfaction DECIMAL(3,2) DEFAULT 0,
    innovation_index DECIMAL(5,2) DEFAULT 0,
    market_share DECIMAL(5,2) DEFAULT 0,
    customer_retention DECIMAL(5,2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT chk_client_satisfaction CHECK (client_satisfaction >= 1.0 AND client_satisfaction <= 5.0),
    CONSTRAINT chk_employee_satisfaction CHECK (employee_satisfaction >= 1.0 AND employee_satisfaction <= 5.0),
    UNIQUE(kpi_date)
);

-- =============================================================================
-- INDEXES FOR PERFORMANCE
-- =============================================================================

-- Users indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_active ON users(is_active);

-- Departments indexes
CREATE INDEX idx_departments_active ON departments(is_active);
CREATE INDEX idx_departments_name ON departments(name);

-- Skills indexes
CREATE INDEX idx_skills_category ON skills(category);
CREATE INDEX idx_skills_demand ON skills(market_demand);

-- Clients indexes
CREATE INDEX idx_clients_active ON clients(is_active);
CREATE INDEX idx_clients_industry ON clients(industry);

-- Resources indexes  
CREATE INDEX idx_resources_status ON resources(status);
CREATE INDEX idx_resources_department ON resources(department_id);
CREATE INDEX idx_resources_active ON resources(is_active);
CREATE INDEX idx_resources_email ON resources(email);
CREATE INDEX idx_resources_level ON resources(level);

-- Resource Skills indexes
CREATE INDEX idx_resource_skills_resource ON resource_skills(resource_id);
CREATE INDEX idx_resource_skills_skill ON resource_skills(skill_id);

-- Projects indexes
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_active ON projects(is_active);
CREATE INDEX idx_projects_dates ON projects(start_date, end_date);
CREATE INDEX idx_projects_client ON projects(client_id);
CREATE INDEX idx_projects_manager ON projects(manager_id);
CREATE INDEX idx_projects_health ON projects(health_status);

-- Project Resources indexes
CREATE INDEX idx_project_resources_project ON project_resources(project_id);
CREATE INDEX idx_project_resources_resource ON project_resources(resource_id);
CREATE INDEX idx_project_resources_active ON project_resources(is_active);

-- Deliverables indexes
CREATE INDEX idx_deliverables_project ON deliverables(project_id);
CREATE INDEX idx_deliverables_assigned ON deliverables(assigned_to);
CREATE INDEX idx_deliverables_status ON deliverables(status);
CREATE INDEX idx_deliverables_due_date ON deliverables(due_date);

-- Escalations indexes
CREATE INDEX idx_escalations_project ON escalations(project_id);
CREATE INDEX idx_escalations_status ON escalations(status);
CREATE INDEX idx_escalations_priority ON escalations(priority);
CREATE INDEX idx_escalations_assigned ON escalations(assigned_to);
CREATE INDEX idx_escalations_raised_by ON escalations(raised_by);

-- Metrics indexes
CREATE INDEX idx_engineering_metrics_project ON engineering_metrics(project_id);
CREATE INDEX idx_engineering_metrics_date ON engineering_metrics(metric_date);
CREATE INDEX idx_qa_metrics_project ON qa_metrics(project_id);
CREATE INDEX idx_qa_metrics_date ON qa_metrics(metric_date);

-- Financial indexes
CREATE INDEX idx_financial_overview_month ON financial_overview(month);
CREATE INDEX idx_company_kpis_date ON company_kpis(kpi_date);

-- =============================================================================
-- FUNCTIONS AND TRIGGERS
-- =============================================================================

-- Function to update updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Function to update resource status based on project allocation
CREATE OR REPLACE FUNCTION update_resource_status()
RETURNS TRIGGER AS $$
BEGIN
    -- Update resource status when project allocation changes
    IF TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN
        UPDATE resources 
        SET status = CASE 
            WHEN EXISTS (
                SELECT 1 FROM project_resources pr 
                JOIN projects p ON pr.project_id = p.id 
                WHERE pr.resource_id = NEW.resource_id 
                AND pr.is_active = TRUE 
                AND p.is_active = TRUE
                AND p.status = 'In Progress'
            ) THEN 'Billable'
            ELSE 'Benched'
        END
        WHERE id = NEW.resource_id;
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE resources 
        SET status = CASE 
            WHEN EXISTS (
                SELECT 1 FROM project_resources pr 
                JOIN projects p ON pr.project_id = p.id 
                WHERE pr.resource_id = OLD.resource_id 
                AND pr.is_active = TRUE 
                AND p.is_active = TRUE
                AND p.status = 'In Progress'
                AND pr.id != OLD.id
            ) THEN 'Billable'
            ELSE 'Benched'
        END
        WHERE id = OLD.resource_id;
        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Simplified function to calculate project health score without recursion
CREATE OR REPLACE FUNCTION calculate_project_health_score(project_id_param INTEGER)
RETURNS INTEGER AS $$
DECLARE
    budget_health INTEGER := 100;
    timeline_health INTEGER := 100;
    deliverable_health INTEGER := 100;
    final_score INTEGER;
    project_budget DECIMAL(15,2);
    project_start_date DATE;
    project_end_date DATE;
    total_actual_hours INTEGER;
    total_deliverables INTEGER;
    completed_deliverables INTEGER;
    days_elapsed INTEGER;
    total_days INTEGER;
BEGIN
    -- Get project details
    SELECT budget, start_date, end_date 
    INTO project_budget, project_start_date, project_end_date
    FROM projects WHERE id = project_id_param;

    -- Calculate budget health
    IF project_budget > 0 THEN
        SELECT COALESCE(SUM(actual_hours), 0) INTO total_actual_hours
        FROM deliverables WHERE project_id = project_id_param;
        
        budget_health := LEAST(100, GREATEST(0, 100 - ((total_actual_hours * 75.0 / project_budget * 100) - 80) * 5));
    END IF;

    -- Calculate timeline health
    IF project_end_date IS NOT NULL THEN
        IF CURRENT_DATE > project_end_date THEN
            timeline_health := 0;
        ELSIF CURRENT_DATE > project_start_date THEN
            days_elapsed := CURRENT_DATE - project_start_date;
            total_days := project_end_date - project_start_date;
            IF total_days > 0 THEN
                timeline_health := GREATEST(0, 100 - ((days_elapsed * 100 / total_days) - 50) * 2);
            END IF;
        END IF;
    END IF;

    -- Calculate deliverable health
    SELECT COUNT(*), COUNT(CASE WHEN status = 'Completed' THEN 1 END)
    INTO total_deliverables, completed_deliverables
    FROM deliverables WHERE project_id = project_id_param;

    IF total_deliverables > 0 THEN
        deliverable_health := (completed_deliverables * 100 / total_deliverables);
    END IF;

    -- Calculate final weighted score
    final_score := (budget_health * 0.3 + timeline_health * 0.4 + deliverable_health * 0.3)::INTEGER;

    RETURN final_score;
END;
$$ LANGUAGE plpgsql;

-- Function to update project health without causing recursion
CREATE OR REPLACE FUNCTION update_project_health()
RETURNS TRIGGER AS $$
DECLARE
    target_project_id INTEGER;
    health_score INTEGER;
    health_status_val VARCHAR(20);
    risk_level VARCHAR(20);
BEGIN
    -- Determine which project to update
    IF TG_TABLE_NAME = 'deliverables' THEN
        target_project_id := COALESCE(NEW.project_id, OLD.project_id);
    ELSE
        RETURN COALESCE(NEW, OLD);
    END IF;

    -- Calculate health score
    health_score := calculate_project_health_score(target_project_id);

    -- Determine status and risk
    IF health_score >= 80 THEN
        health_status_val := 'Green';
        risk_level := 'Low';
    ELSIF health_score >= 60 THEN
        health_status_val := 'Yellow';
        risk_level := 'Medium';
    ELSE
        health_status_val := 'Red';
        risk_level := 'High';
    END IF;

    -- Update project (only if different to avoid unnecessary updates)
    UPDATE projects 
    SET health_score = health_score,
        health_status = health_status_val,
        delivery_risk = risk_level
    WHERE id = target_project_id 
    AND (projects.health_score != health_score 
         OR projects.health_status != health_status_val 
         OR projects.delivery_risk != risk_level);

    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- =============================================================================
-- APPLY TRIGGERS
-- =============================================================================

-- Update timestamp triggers
CREATE TRIGGER update_users_updated_at 
    BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_departments_updated_at 
    BEFORE UPDATE ON departments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_resources_updated_at 
    BEFORE UPDATE ON resources FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_clients_updated_at 
    BEFORE UPDATE ON clients FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at 
    BEFORE UPDATE ON projects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_deliverables_updated_at 
    BEFORE UPDATE ON deliverables FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_escalations_updated_at 
    BEFORE UPDATE ON escalations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_financial_overview_updated_at 
    BEFORE UPDATE ON financial_overview FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_company_kpis_updated_at 
    BEFORE UPDATE ON company_kpis FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Business logic triggers (removed recursive project health trigger)
CREATE TRIGGER update_resource_status_on_project_change
    AFTER INSERT OR UPDATE OR DELETE ON project_resources 
    FOR EACH ROW EXECUTE FUNCTION update_resource_status();

-- Only trigger health calculation on deliverable changes to avoid recursion
CREATE TRIGGER update_project_health_on_deliverable_change
    AFTER INSERT OR UPDATE OR DELETE ON deliverables 
    FOR EACH ROW EXECUTE FUNCTION update_project_health();

-- =============================================================================
-- DASHBOARD VIEWS
-- =============================================================================

-- Current dashboard overview
CREATE OR REPLACE VIEW v_dashboard_overview AS
SELECT 
    (SELECT COUNT(*) FROM projects WHERE is_active = TRUE) as total_projects,
    (SELECT COUNT(*) FROM projects WHERE status = 'In Progress' AND is_active = TRUE) as active_projects,
    (SELECT COUNT(*) FROM projects WHERE health_status = 'Green' AND is_active = TRUE) as green_projects,
    (SELECT COUNT(*) FROM projects WHERE health_status = 'Yellow' AND is_active = TRUE) as yellow_projects,
    (SELECT COUNT(*) FROM projects WHERE health_status = 'Red' AND is_active = TRUE) as red_projects,
    (SELECT COALESCE(AVG(health_score), 0) FROM projects WHERE is_active = TRUE) as avg_health_score,
    (SELECT COUNT(*) FROM resources WHERE is_active = TRUE) as total_resources,
    (SELECT COUNT(*) FROM resources WHERE status = 'Billable' AND is_active = TRUE) as billable_resources,
    (SELECT COUNT(*) FROM resources WHERE status = 'Benched' AND is_active = TRUE) as benched_resources,
    (SELECT COUNT(*) FROM deliverables WHERE status = 'Completed') as completed_deliverables,
    (SELECT COUNT(*) FROM deliverables WHERE status = 'Delayed') as delayed_deliverables,
    (SELECT COUNT(*) FROM escalations WHERE status = 'Open') as open_escalations;

-- Resource allocation view
CREATE OR REPLACE VIEW v_resource_allocation AS
SELECT 
    r.id,
    r.name,
    r.email,
    d.name as department_name,
    r.role,
    r.status,
    r.level,
    r.location,
    r.performance_rating,
    r.shadow_progress,
    r.shadow_status,
    r.bench_reason,
    ARRAY_AGG(DISTINCT s.name) FILTER (WHERE s.name IS NOT NULL) as skills,
    COUNT(DISTINCT pr.project_id) as active_projects
FROM resources r
LEFT JOIN departments d ON r.department_id = d.id
LEFT JOIN resource_skills rs ON r.id = rs.resource_id
LEFT JOIN skills s ON rs.skill_id = s.id
LEFT JOIN project_resources pr ON r.id = pr.resource_id AND pr.is_active = TRUE
WHERE r.is_active = TRUE
GROUP BY r.id, r.name, r.email, d.name, r.role, r.status, r.level, 
         r.location, r.performance_rating, r.shadow_progress, r.shadow_status, r.bench_reason;

-- Project overview with metrics
CREATE OR REPLACE VIEW v_project_overview AS
SELECT 
    p.id,
    p.name,
    p.description,
    c.name as client_name,
    r.name as manager_name,
    p.status,
    p.priority,
    p.budget,
    p.start_date,
    p.end_date,
    p.health_score,
    p.health_status,
    p.delivery_risk,
    p.technology_stack,
    COUNT(DISTINCT pr.resource_id) as resource_count,
    COUNT(DISTINCT d.id) as total_deliverables,
    COUNT(DISTINCT CASE WHEN d.status = 'Completed' THEN d.id END) as completed_deliverables,
    COUNT(DISTINCT CASE WHEN e.status = 'Open' THEN e.id END) as open_escalations
FROM projects p
LEFT JOIN clients c ON p.client_id = c.id
LEFT JOIN resources r ON p.manager_id = r.id
LEFT JOIN project_resources pr ON p.id = pr.project_id AND pr.is_active = TRUE
LEFT JOIN deliverables d ON p.id = d.project_id
LEFT JOIN escalations e ON p.id = e.project_id
WHERE p.is_active = TRUE
GROUP BY p.id, p.name, p.description, c.name, r.name, p.status, p.priority, 
         p.budget, p.start_date, p.end_date, p.health_score, p.health_status, 
         p.delivery_risk, p.technology_stack;

-- =============================================================================
-- SAMPLE DATA
-- =============================================================================

-- Insert sample departments
INSERT INTO departments (name, description, budget, head_of_department, location) VALUES
('Engineering', 'Software development and technical teams', 2000000.00, 'Sarah Johnson', 'Bangalore'),
('Design', 'UI/UX and graphic design teams', 500000.00, 'Mike Chen', 'Mumbai'),
('Quality Assurance', 'Testing and quality control teams', 800000.00, 'Lisa Brown', 'Pune'),
('DevOps', 'Infrastructure and deployment teams', 600000.00, 'David Wilson', 'Hyderabad');

-- Insert sample skills
INSERT INTO skills (name, category, market_demand, description) VALUES
('React', 'Frontend', 'High', 'JavaScript library for building user interfaces'),
('Node.js', 'Backend', 'High', 'JavaScript runtime for server-side development'),
('Python', 'Backend', 'High', 'High-level programming language'),
('PostgreSQL', 'Database', 'Medium', 'Open source relational database'),
('AWS', 'Cloud', 'High', 'Amazon Web Services cloud platform'),
('Docker', 'DevOps', 'High', 'Containerization platform'),
('Figma', 'Design', 'Medium', 'UI/UX design tool'),
('Selenium', 'Testing', 'Medium', 'Web browser automation tool'),
('Kubernetes', 'DevOps', 'High', 'Container orchestration platform'),
('TypeScript', 'Frontend', 'High', 'Typed superset of JavaScript');

-- Insert sample users
INSERT INTO users (name, email, password_hash, role) VALUES
('Admin User', 'admin@zapcg.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/lewdBenozk7B0/WH6', 'admin'),
('HR Manager', 'hr@zapcg.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/lewdBenozk7B0/WH6', 'hr'),
('Resource Manager', 'rm@zapcg.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/lewdBenozk7B0/WH6', 'resource_manager'),
('Leadership User', 'leadership@zapcg.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/lewdBenozk7B0/WH6', 'leadership'),
('Delivery Owner', 'delivery@zapcg.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/lewdBenozk7B0/WH6', 'delivery_owner');

-- Insert sample clients
INSERT INTO clients (name, industry, contact_person, email, phone, address) VALUES
('TechCorp Solutions', 'Technology', 'John Smith', 'john@techcorp.com', '+1-555-0123', '123 Tech Street, Silicon Valley'),
('FinanceFlow Inc', 'Financial Services', 'Sarah Johnson', 'sarah@financeflow.com', '+1-555-0124', '456 Finance Ave, New York'),
('HealthTech Solutions', 'Healthcare', 'Mike Chen', 'mike@healthtech.com', '+1-555-0125', '789 Health Blvd, Boston'),
('InnovateCorp', 'Technology', 'Emily Davis', 'emily@innovate.com', '+1-555-0126', '321 Innovation Dr, Austin'),
('GlobalTech', 'Technology', 'David Wilson', 'david@globaltech.com', '+1-555-0127', '654 Global Way, Seattle');

-- Insert sample resources
INSERT INTO resources (name, email, department_id, role, status, level, hire_date, location, phone, performance_rating, billable_rate, base_salary) VALUES
('Alex Rodriguez', 'alex@zapcg.com', 1, 'Senior Frontend Developer', 'Billable', 'Senior', '2022-03-15', 'Bangalore', '+91-9876543210', 4.2, 75.00, 80000.00),
('Emily Davis', 'emily@zapcg.com', 1, 'Backend Developer', 'Billable', 'Mid', '2023-01-10', 'Mumbai', '+91-9876543211', 4.0, 65.00, 70000.00),
('Michael Chen', 'michael@zapcg.com', 1, 'Full Stack Developer', 'Billable', 'Senior', '2021-08-20', 'Pune', '+91-9876543212', 4.5, 85.00, 95000.00),
('Sarah Wilson', 'sarah@zapcg.com', 3, 'QA Engineer', 'Benched', 'Mid', '2023-05-12', 'Hyderabad', '+91-9876543213', 3.8, 55.00, 60000.00),
('David Brown', 'david@zapcg.com', 4, 'DevOps Engineer', 'Billable', 'Senior', '2022-11-03', 'Bangalore', '+91-9876543214', 4.1, 80.00, 85000.00),
('Lisa Johnson', 'lisa@zapcg.com', 2, 'UI/UX Designer', 'Shadow', 'Junior', '2024-02-01', 'Mumbai', '+91-9876543215', 3.5, 45.00, 50000.00),
('John Martinez', 'john@zapcg.com', 1, 'Software Engineer', 'Available', 'Junior', '2024-01-15', 'Pune', '+91-9876543216', 3.2, 50.00, 55000.00);

-- Insert sample resource skills
INSERT INTO resource_skills (resource_id, skill_id, proficiency_level, years_experience) VALUES
(1, 1, 5, 4.0), (1, 10, 4, 3.0), (1, 7, 3, 2.0),
(2, 2, 4, 2.5), (2, 3, 4, 3.0), (2, 4, 3, 2.0),
(3, 1, 4, 3.0), (3, 2, 5, 4.0), (3, 4, 4, 3.5),
(4, 8, 4, 2.5), (4, 3, 3, 1.5),
(5, 6, 5, 3.0), (5, 9, 4, 2.5), (5, 5, 4, 3.0),
(6, 7, 3, 1.0),
(7, 1, 2, 0.5), (7, 2, 2, 0.5);

-- Insert sample projects
INSERT INTO projects (name, description, client_id, manager_id, status, start_date, end_date, budget, priority, technology_stack) VALUES
('E-commerce Platform', 'Modern e-commerce solution with advanced features', 1, 3, 'In Progress', '2024-03-01', '2024-12-31', 250000.00, 'High', ARRAY['React', 'Node.js', 'PostgreSQL']),
('Banking Portal', 'Secure online banking application', 2, 1, 'In Progress', '2024-02-01', '2024-08-31', 400000.00, 'Critical', ARRAY['React', 'Node.js', 'PostgreSQL', 'AWS']),
('Healthcare Dashboard', 'Patient management and analytics platform', 3, 5, 'Planning', '2024-07-15', '2025-02-28', 180000.00, 'Medium', ARRAY['React', 'Python', 'PostgreSQL']),
('Innovation Lab', 'Research and development platform', 4, 3, 'In Progress', '2024-01-15', '2024-09-30', 320000.00, 'High', ARRAY['React', 'Node.js', 'AWS']),
('Global Analytics', 'Enterprise analytics and reporting system', 5, 1, 'Planning', '2024-08-01', '2025-06-30', 500000.00, 'Critical', ARRAY['React', 'Python', 'AWS', 'Docker']);

-- Insert sample project resources
INSERT INTO project_resources (project_id, resource_id, allocation_percentage, role_in_project) VALUES
(1, 1, 100, 'Frontend Lead'),
(1, 2, 80, 'Backend Developer'),
(2, 3, 100, 'Full Stack Lead'),
(2, 5, 50, 'DevOps Engineer'),
(4, 1, 50, 'Frontend Developer'),
(4, 3, 60, 'Technical Lead');

-- Insert sample deliverables
INSERT INTO deliverables (name, description, project_id, assigned_to, status, priority, due_date, completion_percentage, estimated_hours, deliverable_type) VALUES
('User Authentication System', 'Complete user login and registration system', 1, 2, 'Completed', 'High', '2024-05-15', 100, 40, 'Feature'),
('Product Catalog', 'Product browsing and search functionality', 1, 1, 'In Progress', 'High', '2024-07-30', 75, 60, 'Feature'),
('Payment Gateway Integration', 'Integration with multiple payment providers', 1, 2, 'Pending', 'Critical', '2024-08-15', 0, 50, 'Feature'),
('Account Management', 'User account and profile management', 2, 3, 'In Progress', 'High', '2024-06-30', 60, 45, 'Feature'),
('Transaction History', 'Complete transaction tracking system', 2, 3, 'Pending', 'Medium', '2024-07-15', 20, 35, 'Feature');

-- Insert sample escalations
INSERT INTO escalations (title, description, project_id, priority, escalation_type, raised_by, assigned_to, due_date) VALUES
('API Performance Issues', 'Payment API response times exceeding 5 seconds', 1, 'Critical', 'Technical', 2, 3, '2024-07-10 18:00:00'),
('Resource Allocation Conflict', 'Competing priorities between projects', 2, 'High', 'Resource', 3, 1, '2024-07-15 17:00:00'),
('Budget Overrun Discussion', 'Project costs exceeding initial estimates', 4, 'Medium', 'Budget', 1, 3, '2024-07-20 16:00:00');

-- Insert sample engineering metrics
INSERT INTO engineering_metrics (project_id, commits_count, lines_of_code, code_quality_score, test_coverage, bugs_reported, bugs_resolved, developer_productivity_score) VALUES
(1, 45, 2500, 88, 82, 8, 6, 85),
(2, 38, 3200, 91, 87, 5, 5, 90),
(4, 25, 1800, 85, 75, 12, 9, 78);

-- Insert sample QA metrics
INSERT INTO qa_metrics (project_id, test_cases_total, test_cases_passed, test_cases_failed, automation_coverage, defects_found, defects_fixed, defect_removal_efficiency, test_execution_rate) VALUES
(1, 120, 108, 12, 75, 15, 12, 88.5, 94.2),
(2, 180, 165, 15, 82, 10, 9, 91.8, 96.1),
(4, 95, 87, 8, 68, 18, 14, 85.2, 92.3);

-- Insert sample financial data
INSERT INTO financial_overview (month, total_budget, budget_utilized, revenue_generated, profit_margin, burn_rate, project_count, billable_resources) VALUES
('2024-07-01', 500000.00, 375000.00, 625000.00, 25.5, 62500.00, 5, 18),
('2024-06-01', 480000.00, 360000.00, 590000.00, 28.2, 60000.00, 4, 16),
('2024-05-01', 450000.00, 320000.00, 580000.00, 31.1, 58000.00, 4, 15);

-- Insert sample company KPIs
INSERT INTO company_kpis (revenue, profit_margin, employee_utilization, client_satisfaction, project_delivery_rate, quality_score, employee_satisfaction, innovation_index, market_share, customer_retention) VALUES
(625000.00, 25.5, 78.2, 4.3, 94.2, 87.5, 4.1, 82.0, 12.5, 89.3);

COMMENT ON DATABASE CURRENT_DATABASE() IS 'IT Delivery Dashboard - Complete database schema with all required tables and relationships';
