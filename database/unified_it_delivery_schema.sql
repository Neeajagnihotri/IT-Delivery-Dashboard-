
-- =============================================================================
-- IT DELIVERY DASHBOARD - COMPREHENSIVE DATABASE SCHEMA
-- =============================================================================
-- Version: 3.0
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

-- Clients table
CREATE TABLE clients (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    contact_person VARCHAR(100),
    email VARCHAR(255),
    phone VARCHAR(20),
    industry VARCHAR(100),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Resources table (main employee/contractor table)
CREATE TABLE resources (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    role VARCHAR(100) NOT NULL,
    status VARCHAR(50) DEFAULT 'Available',
    allocation VARCHAR(20) DEFAULT '0%',
    skills TEXT[],
    project_id INTEGER,
    email VARCHAR(255),
    phone VARCHAR(20),
    hire_date DATE,
    performance_rating DECIMAL(3,2) DEFAULT 3.0,
    billable_rate DECIMAL(10,2),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT chk_resource_status CHECK (status IN ('Billable', 'Benched', 'Available', 'On Leave')),
    CONSTRAINT chk_performance_rating CHECK (performance_rating >= 1.0 AND performance_rating <= 5.0)
);

-- Projects table
CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    client VARCHAR(200) NOT NULL,
    status VARCHAR(50) DEFAULT 'Planning',
    priority VARCHAR(20) DEFAULT 'Medium',
    progress INTEGER DEFAULT 0,
    budget DECIMAL(15,2),
    spent DECIMAL(15,2) DEFAULT 0,
    start_date DATE NOT NULL,
    end_date DATE,
    description TEXT,
    project_manager VARCHAR(100),
    team_lead VARCHAR(100),
    technologies TEXT[],
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT chk_project_status CHECK (status IN ('Planning', 'In Progress', 'Completed', 'On Hold', 'Cancelled')),
    CONSTRAINT chk_project_priority CHECK (priority IN ('Low', 'Medium', 'High', 'Critical')),
    CONSTRAINT chk_progress CHECK (progress >= 0 AND progress <= 100),
    CONSTRAINT chk_project_dates CHECK (end_date IS NULL OR start_date <= end_date)
);

-- Project Resources (many-to-many relationship)
CREATE TABLE project_resources (
    id SERIAL PRIMARY KEY,
    project_id INTEGER NOT NULL,
    resource_name VARCHAR(100) NOT NULL,
    role VARCHAR(100) NOT NULL,
    allocation VARCHAR(20) DEFAULT '100%',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

-- Project Milestones
CREATE TABLE project_milestones (
    id SERIAL PRIMARY KEY,
    project_id INTEGER NOT NULL,
    name VARCHAR(200) NOT NULL,
    date DATE NOT NULL,
    status VARCHAR(30) DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT chk_milestone_status CHECK (status IN ('Pending', 'In Progress', 'Completed', 'Delayed')),
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

-- Project Deliverables
CREATE TABLE project_deliverables (
    id SERIAL PRIMARY KEY,
    project_id INTEGER NOT NULL,
    name VARCHAR(200) NOT NULL,
    status VARCHAR(30) DEFAULT 'Pending',
    due_date DATE NOT NULL,
    completion_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT chk_deliverable_status CHECK (status IN ('Pending', 'In Progress', 'Completed', 'Delayed')),
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

-- =============================================================================
-- KPI AND METRICS TABLES
-- =============================================================================

-- Company KPIs (for dashboard summary)
CREATE TABLE company_kpis (
    id SERIAL PRIMARY KEY,
    kpi_date DATE NOT NULL DEFAULT CURRENT_DATE,
    total_projects INTEGER DEFAULT 0,
    active_projects INTEGER DEFAULT 0,
    completed_projects INTEGER DEFAULT 0,
    total_resources INTEGER DEFAULT 0,
    billable_resources INTEGER DEFAULT 0,
    benched_resources INTEGER DEFAULT 0,
    resource_utilization DECIMAL(5,2) DEFAULT 0,
    average_health_score DECIMAL(5,2) DEFAULT 0,
    financial_health DECIMAL(5,2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT chk_resource_utilization CHECK (resource_utilization >= 0 AND resource_utilization <= 100),
    CONSTRAINT chk_avg_health_score CHECK (average_health_score >= 0 AND average_health_score <= 100),
    CONSTRAINT chk_financial_health CHECK (financial_health >= 0 AND financial_health <= 100)
);

-- =============================================================================
-- INDEXES FOR PERFORMANCE
-- =============================================================================

-- Users indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_active ON users(is_active);

-- Resources indexes
CREATE INDEX idx_resources_status ON resources(status);
CREATE INDEX idx_resources_project ON resources(project_id);
CREATE INDEX idx_resources_active ON resources(is_active);

-- Projects indexes
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_active ON projects(is_active);
CREATE INDEX idx_projects_dates ON projects(start_date, end_date);
CREATE INDEX idx_projects_client ON projects(client);

-- Project relationships indexes
CREATE INDEX idx_project_resources_project ON project_resources(project_id);
CREATE INDEX idx_project_milestones_project ON project_milestones(project_id);
CREATE INDEX idx_project_deliverables_project ON project_deliverables(project_id);

-- KPI indexes
CREATE INDEX idx_company_kpis_date ON company_kpis(kpi_date);

-- =============================================================================
-- FOREIGN KEY CONSTRAINTS
-- =============================================================================

-- Add foreign key for resources to projects (optional relationship)
ALTER TABLE resources ADD CONSTRAINT fk_resources_project 
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE SET NULL;

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

-- Function to calculate and update KPIs
CREATE OR REPLACE FUNCTION update_company_kpis()
RETURNS TRIGGER AS $$
DECLARE
    today_date DATE := CURRENT_DATE;
    total_proj INTEGER;
    active_proj INTEGER;
    completed_proj INTEGER;
    total_res INTEGER;
    billable_res INTEGER;
    benched_res INTEGER;
    utilization DECIMAL(5,2);
    avg_health DECIMAL(5,2);
    fin_health DECIMAL(5,2);
BEGIN
    -- Calculate project metrics
    SELECT COUNT(*) INTO total_proj FROM projects WHERE is_active = TRUE;
    SELECT COUNT(*) INTO active_proj FROM projects WHERE status = 'In Progress' AND is_active = TRUE;
    SELECT COUNT(*) INTO completed_proj FROM projects WHERE status = 'Completed';
    
    -- Calculate resource metrics
    SELECT COUNT(*) INTO total_res FROM resources WHERE is_active = TRUE;
    SELECT COUNT(*) INTO billable_res FROM resources WHERE status = 'Billable' AND is_active = TRUE;
    SELECT COUNT(*) INTO benched_res FROM resources WHERE status = 'Benched' AND is_active = TRUE;
    
    -- Calculate utilization
    utilization := CASE WHEN total_res > 0 THEN (billable_res::DECIMAL / total_res::DECIMAL) * 100 ELSE 0 END;
    
    -- Calculate average project health (based on progress)
    SELECT COALESCE(AVG(progress), 0) INTO avg_health FROM projects WHERE is_active = TRUE;
    
    -- Calculate financial health (budget vs spent ratio)
    SELECT COALESCE(AVG(CASE WHEN budget > 0 THEN ((budget - spent) / budget) * 100 ELSE 100 END), 100)
    INTO fin_health FROM projects WHERE is_active = TRUE AND budget > 0;
    
    -- Insert or update KPI record for today
    INSERT INTO company_kpis (
        kpi_date, total_projects, active_projects, completed_projects,
        total_resources, billable_resources, benched_resources,
        resource_utilization, average_health_score, financial_health
    ) VALUES (
        today_date, total_proj, active_proj, completed_proj,
        total_res, billable_res, benched_res,
        utilization, avg_health, fin_health
    )
    ON CONFLICT (kpi_date) DO UPDATE SET
        total_projects = EXCLUDED.total_projects,
        active_projects = EXCLUDED.active_projects,
        completed_projects = EXCLUDED.completed_projects,
        total_resources = EXCLUDED.total_resources,
        billable_resources = EXCLUDED.billable_resources,
        benched_resources = EXCLUDED.benched_resources,
        resource_utilization = EXCLUDED.resource_utilization,
        average_health_score = EXCLUDED.average_health_score,
        financial_health = EXCLUDED.financial_health,
        updated_at = CURRENT_TIMESTAMP;
    
    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Add unique constraint for KPI date
ALTER TABLE company_kpis ADD CONSTRAINT unique_kpi_date UNIQUE (kpi_date);

-- =============================================================================
-- APPLY TRIGGERS
-- =============================================================================

-- Update timestamp triggers
CREATE TRIGGER update_users_updated_at 
    BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_resources_updated_at 
    BEFORE UPDATE ON resources FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at 
    BEFORE UPDATE ON projects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_clients_updated_at 
    BEFORE UPDATE ON clients FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_company_kpis_updated_at 
    BEFORE UPDATE ON company_kpis FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- KPI update triggers
CREATE TRIGGER update_kpis_on_project_change 
    AFTER INSERT OR UPDATE OR DELETE ON projects FOR EACH ROW EXECUTE FUNCTION update_company_kpis();

CREATE TRIGGER update_kpis_on_resource_change 
    AFTER INSERT OR UPDATE OR DELETE ON resources FOR EACH ROW EXECUTE FUNCTION update_company_kpis();

-- =============================================================================
-- DASHBOARD VIEWS
-- =============================================================================

-- Current KPI view for dashboard
CREATE OR REPLACE VIEW v_current_kpis AS
SELECT 
    total_projects,
    active_projects,
    completed_projects,
    total_resources,
    billable_resources,
    benched_resources,
    resource_utilization,
    average_health_score,
    financial_health
FROM company_kpis 
WHERE kpi_date = CURRENT_DATE
ORDER BY created_at DESC 
LIMIT 1;

-- Project overview with resource count
CREATE OR REPLACE VIEW v_project_overview AS
SELECT 
    p.id,
    p.name,
    p.client,
    p.status,
    p.priority,
    p.progress,
    p.budget,
    p.spent,
    p.start_date,
    p.end_date,
    p.description,
    p.project_manager,
    p.team_lead,
    p.technologies,
    COUNT(pr.id) as resource_count,
    COUNT(pm.id) as milestone_count,
    COUNT(pd.id) as deliverable_count,
    COUNT(CASE WHEN pd.status = 'Completed' THEN 1 END) as completed_deliverables
FROM projects p
LEFT JOIN project_resources pr ON p.id = pr.project_id
LEFT JOIN project_milestones pm ON p.id = pm.project_id
LEFT JOIN project_deliverables pd ON p.id = pd.project_id
WHERE p.is_active = TRUE
GROUP BY p.id, p.name, p.client, p.status, p.priority, p.progress, 
         p.budget, p.spent, p.start_date, p.end_date, p.description,
         p.project_manager, p.team_lead, p.technologies;

-- Resource allocation view
CREATE OR REPLACE VIEW v_resource_allocation AS
SELECT 
    r.id,
    r.name,
    r.role,
    r.status,
    r.allocation,
    r.skills,
    r.email,
    r.phone,
    r.performance_rating,
    r.billable_rate,
    p.name as project_name,
    p.client as project_client
FROM resources r
LEFT JOIN projects p ON r.project_id = p.id
WHERE r.is_active = TRUE;

-- =============================================================================
-- SAMPLE DATA
-- =============================================================================

-- Insert sample users
INSERT INTO users (name, email, password_hash, role) VALUES
('Admin User', 'admin@zapcg.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/lewdBenozk7B0/WH6', 'admin'),
('HR Manager', 'hr@zapcg.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/lewdBenozk7B0/WH6', 'hr'),
('Resource Manager', 'rm@zapcg.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/lewdBenozk7B0/WH6', 'resource_manager'),
('Leadership User', 'leadership@zapcg.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/lewdBenozk7B0/WH6', 'leadership'),
('Delivery Owner', 'delivery@zapcg.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/lewdBenozk7B0/WH6', 'delivery_owner');

-- Insert sample clients
INSERT INTO clients (name, contact_person, email, phone, industry) VALUES
('TechCorp Industries', 'John Smith', 'john@techcorp.com', '+1-555-1001', 'Technology'),
('FinanceFlow Inc', 'Sarah Johnson', 'sarah@financeflow.com', '+1-555-1002', 'Financial Services'),
('HealthTech Solutions', 'Mike Chen', 'mike@healthtech.com', '+1-555-1003', 'Healthcare');

-- Insert sample projects
INSERT INTO projects (name, client, status, priority, progress, budget, spent, start_date, end_date, description, project_manager, team_lead, technologies) VALUES
('Project Alpha', 'TechCorp Industries', 'In Progress', 'High', 92, 450000, 414000, '2024-01-15', '2024-06-30', 'Complete development and deployment of Project Alpha with enhanced user experience.', 'Sarah Johnson', 'Michael Chen', ARRAY['React', 'Node.js', 'MongoDB', 'AWS', 'TypeScript']),
('Banking Portal', 'FinanceFlow Inc', 'In Progress', 'Critical', 78, 650000, 520000, '2024-02-01', '2024-08-31', 'Secure banking portal with advanced features.', 'David Wilson', 'Alex Rodriguez', ARRAY['Angular', 'Java', 'PostgreSQL', 'Docker']),
('Healthcare Dashboard', 'HealthTech Solutions', 'Planning', 'Medium', 25, 380000, 95000, '2024-03-15', '2024-10-15', 'Patient management and analytics dashboard.', 'Emily Davis', 'Lisa Brown', ARRAY['Vue.js', 'Python', 'MongoDB']);

-- Insert sample resources
INSERT INTO resources (name, role, status, allocation, skills, project_id, email, phone, performance_rating, billable_rate) VALUES
('Alex Rodriguez', 'Frontend Developer', 'Billable', '100%', ARRAY['React', 'TypeScript', 'CSS'], 1, 'alex@company.com', '+1-555-2001', 4.2, 75.00),
('Emily Davis', 'Backend Developer', 'Billable', '80%', ARRAY['Node.js', 'MongoDB', 'AWS'], 1, 'emily@company.com', '+1-555-2002', 4.0, 85.00),
('Michael Chen', 'Full Stack Developer', 'Billable', '100%', ARRAY['React', 'Node.js', 'PostgreSQL'], 2, 'michael@company.com', '+1-555-2003', 4.5, 95.00),
('Sarah Wilson', 'QA Engineer', 'Benched', '0%', ARRAY['Testing', 'Automation', 'Selenium'], NULL, 'sarah@company.com', '+1-555-2004', 3.8, 65.00),
('David Brown', 'DevOps Engineer', 'Available', '50%', ARRAY['Docker', 'Kubernetes', 'AWS'], NULL, 'david@company.com', '+1-555-2005', 4.1, 90.00);

-- Insert project resources
INSERT INTO project_resources (project_id, resource_name, role, allocation) VALUES
(1, 'Alex Rodriguez', 'Frontend Developer', '100%'),
(1, 'Emily Davis', 'Backend Developer', '80%'),
(2, 'Michael Chen', 'Full Stack Developer', '100%');

-- Insert project milestones
INSERT INTO project_milestones (project_id, name, date, status) VALUES
(1, 'Requirements Analysis', '2024-02-01', 'Completed'),
(1, 'Development Phase 2', '2024-06-15', 'In Progress'),
(2, 'System Architecture', '2024-03-01', 'Completed'),
(2, 'Backend Development', '2024-05-15', 'In Progress');

-- Insert project deliverables
INSERT INTO project_deliverables (project_id, name, status, due_date) VALUES
(1, 'Frontend Application', 'In Progress', '2024-06-30'),
(1, 'Backend API', 'Completed', '2024-06-15'),
(2, 'User Authentication System', 'In Progress', '2024-07-31'),
(2, 'Dashboard Interface', 'Pending', '2024-08-15');

-- Initialize KPIs
INSERT INTO company_kpis (kpi_date) VALUES (CURRENT_DATE);

COMMENT ON DATABASE CURRENT_DATABASE() IS 'IT Delivery Dashboard - Streamlined database schema matching dashboard requirements';
