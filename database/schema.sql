
-- Zapcom Resource Management Database Schema
-- PostgreSQL Database

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table for authentication
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE
);

-- Departments table
CREATE TABLE departments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    head_id INTEGER,
    budget DECIMAL(12,2),
    location VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Skills table
CREATE TABLE skills (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    category VARCHAR(50),
    description TEXT,
    market_demand INTEGER DEFAULT 50 CHECK (market_demand >= 0 AND market_demand <= 100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Clients table
CREATE TABLE clients (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    contact_person VARCHAR(100),
    email VARCHAR(255),
    phone VARCHAR(20),
    address TEXT,
    industry VARCHAR(100),
    tier VARCHAR(20) DEFAULT 'Standard',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE
);

-- Resources table (main employee/resource table)
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
    salary DECIMAL(10,2),
    manager_id INTEGER REFERENCES resources(id),
    location VARCHAR(100),
    bench_reason VARCHAR(200),
    bench_start_date DATE,
    performance_rating DECIMAL(3,2) DEFAULT 3.0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    
    -- Constraints
    CONSTRAINT chk_status CHECK (status IN ('Billable', 'Benched', 'Shadow', 'Associate', 'Available', 'On Leave')),
    CONSTRAINT chk_level CHECK (level IN ('Junior', 'Mid', 'Senior', 'Lead', 'Principal', 'Architect')),
    CONSTRAINT chk_performance CHECK (performance_rating >= 1.0 AND performance_rating <= 5.0)
);

-- Resource Skills mapping table (many-to-many)
CREATE TABLE resource_skills (
    id SERIAL PRIMARY KEY,
    resource_id INTEGER NOT NULL REFERENCES resources(id) ON DELETE CASCADE,
    skill_id INTEGER NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
    proficiency_level INTEGER DEFAULT 3 CHECK (proficiency_level >= 1 AND proficiency_level <= 5),
    years_experience DECIMAL(3,1) DEFAULT 0,
    last_used DATE,
    certified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(resource_id, skill_id)
);

-- Projects table
CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    client_id INTEGER NOT NULL REFERENCES clients(id),
    manager_id INTEGER REFERENCES resources(id),
    status VARCHAR(50) DEFAULT 'Planning',
    priority VARCHAR(20) DEFAULT 'Medium',
    start_date DATE NOT NULL,
    end_date DATE,
    actual_end_date DATE,
    budget DECIMAL(12,2),
    actual_cost DECIMAL(12,2),
    progress_percentage INTEGER DEFAULT 0 CHECK (progress_percentage >= 0 AND progress_percentage <= 100),
    technology_stack TEXT[],
    methodology VARCHAR(50) DEFAULT 'Agile',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    
    -- Constraints
    CONSTRAINT chk_project_status CHECK (status IN ('Planning', 'Active', 'On Hold', 'Completed', 'Cancelled')),
    CONSTRAINT chk_priority CHECK (priority IN ('Low', 'Medium', 'High', 'Critical')),
    CONSTRAINT chk_dates CHECK (end_date IS NULL OR start_date <= end_date)
);

-- Project Allocations table (many-to-many between projects and resources)
CREATE TABLE project_allocations (
    id SERIAL PRIMARY KEY,
    project_id INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    resource_id INTEGER NOT NULL REFERENCES resources(id) ON DELETE CASCADE,
    allocation_percentage INTEGER DEFAULT 100 CHECK (allocation_percentage > 0 AND allocation_percentage <= 100),
    start_date DATE NOT NULL,
    end_date DATE,
    actual_end_date DATE,
    role_in_project VARCHAR(100),
    hourly_rate DECIMAL(8,2),
    total_hours_allocated INTEGER,
    total_hours_worked INTEGER DEFAULT 0,
    efficiency_rating DECIMAL(3,2) DEFAULT 3.0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    
    -- Constraints
    CONSTRAINT chk_allocation_dates CHECK (end_date IS NULL OR start_date <= end_date),
    CONSTRAINT chk_efficiency CHECK (efficiency_rating >= 1.0 AND efficiency_rating <= 5.0),
    UNIQUE(project_id, resource_id, start_date)
);

-- Time Tracking table
CREATE TABLE time_entries (
    id SERIAL PRIMARY KEY,
    allocation_id INTEGER NOT NULL REFERENCES project_allocations(id) ON DELETE CASCADE,
    entry_date DATE NOT NULL,
    hours_worked DECIMAL(4,2) NOT NULL CHECK (hours_worked > 0 AND hours_worked <= 24),
    description TEXT,
    task_type VARCHAR(50),
    billable BOOLEAN DEFAULT TRUE,
    approved BOOLEAN DEFAULT FALSE,
    approved_by INTEGER REFERENCES resources(id),
    approved_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Resource Availability table (for tracking availability periods)
CREATE TABLE resource_availability (
    id SERIAL PRIMARY KEY,
    resource_id INTEGER NOT NULL REFERENCES resources(id) ON DELETE CASCADE,
    start_date DATE NOT NULL,
    end_date DATE,
    availability_percentage INTEGER DEFAULT 100 CHECK (availability_percentage >= 0 AND availability_percentage <= 100),
    reason VARCHAR(200),
    type VARCHAR(50) DEFAULT 'Available',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Constraints
    CONSTRAINT chk_availability_type CHECK (type IN ('Available', 'Vacation', 'Sick Leave', 'Training', 'Other')),
    CONSTRAINT chk_availability_dates CHECK (end_date IS NULL OR start_date <= end_date)
);

-- Performance Reviews table
CREATE TABLE performance_reviews (
    id SERIAL PRIMARY KEY,
    resource_id INTEGER NOT NULL REFERENCES resources(id) ON DELETE CASCADE,
    reviewer_id INTEGER NOT NULL REFERENCES resources(id),
    review_period_start DATE NOT NULL,
    review_period_end DATE NOT NULL,
    overall_rating DECIMAL(3,2) NOT NULL CHECK (overall_rating >= 1.0 AND overall_rating <= 5.0),
    technical_skills_rating DECIMAL(3,2) CHECK (technical_skills_rating >= 1.0 AND technical_skills_rating <= 5.0),
    communication_rating DECIMAL(3,2) CHECK (communication_rating >= 1.0 AND communication_rating <= 5.0),
    leadership_rating DECIMAL(3,2) CHECK (leadership_rating >= 1.0 AND leadership_rating <= 5.0),
    goals_achievements TEXT,
    areas_improvement TEXT,
    feedback TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Audit Log table for tracking changes
CREATE TABLE audit_logs (
    id SERIAL PRIMARY KEY,
    table_name VARCHAR(50) NOT NULL,
    record_id INTEGER NOT NULL,
    action VARCHAR(20) NOT NULL,
    old_values JSONB,
    new_values JSONB,
    changed_by INTEGER REFERENCES users(id),
    changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT chk_action CHECK (action IN ('INSERT', 'UPDATE', 'DELETE'))
);

-- Indexes for better performance
CREATE INDEX idx_resources_department ON resources(department_id);
CREATE INDEX idx_resources_status ON resources(status);
CREATE INDEX idx_resources_manager ON resources(manager_id);
CREATE INDEX idx_project_allocations_project ON project_allocations(project_id);
CREATE INDEX idx_project_allocations_resource ON project_allocations(resource_id);
CREATE INDEX idx_project_allocations_active ON project_allocations(is_active);
CREATE INDEX idx_projects_client ON projects(client_id);
CREATE INDEX idx_projects_manager ON projects(manager_id);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_time_entries_allocation ON time_entries(allocation_id);
CREATE INDEX idx_time_entries_date ON time_entries(entry_date);
CREATE INDEX idx_resource_skills_resource ON resource_skills(resource_id);
CREATE INDEX idx_resource_skills_skill ON resource_skills(skill_id);

-- Views for commonly used queries

-- Active resource allocation view
CREATE VIEW v_resource_allocation AS
SELECT 
    r.id,
    r.employee_id,
    r.name,
    r.email,
    r.role,
    r.level,
    r.status,
    d.name as department_name,
    p.name as current_project,
    pa.allocation_percentage,
    pa.start_date as allocation_start,
    pa.end_date as allocation_end
FROM resources r
LEFT JOIN departments d ON r.department_id = d.id
LEFT JOIN project_allocations pa ON r.id = pa.resource_id AND pa.is_active = TRUE
LEFT JOIN projects p ON pa.project_id = p.id AND p.is_active = TRUE
WHERE r.is_active = TRUE;

-- Project summary view
CREATE VIEW v_project_summary AS
SELECT 
    p.id,
    p.name,
    p.status,
    p.start_date,
    p.end_date,
    p.budget,
    p.progress_percentage,
    c.name as client_name,
    rm.name as manager_name,
    COUNT(pa.resource_id) as allocated_resources,
    SUM(pa.allocation_percentage) as total_allocation_percentage
FROM projects p
LEFT JOIN clients c ON p.client_id = c.id
LEFT JOIN resources rm ON p.manager_id = rm.id
LEFT JOIN project_allocations pa ON p.id = pa.project_id AND pa.is_active = TRUE
WHERE p.is_active = TRUE
GROUP BY p.id, c.name, rm.name;

-- Department utilization view
CREATE VIEW v_department_utilization AS
SELECT 
    d.id,
    d.name as department_name,
    COUNT(r.id) as total_resources,
    COUNT(CASE WHEN r.status = 'Billable' THEN 1 END) as billable_resources,
    COUNT(CASE WHEN r.status = 'Benched' THEN 1 END) as benched_resources,
    COUNT(CASE WHEN r.status = 'Shadow' THEN 1 END) as shadow_resources,
    ROUND(
        COUNT(CASE WHEN r.status = 'Billable' THEN 1 END)::decimal / 
        NULLIF(COUNT(r.id), 0) * 100, 2
    ) as utilization_percentage
FROM departments d
LEFT JOIN resources r ON d.id = r.department_id AND r.is_active = TRUE
GROUP BY d.id, d.name;

-- Triggers for maintaining data integrity and audit logs

-- Function to update timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply update trigger to all relevant tables
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_departments_updated_at BEFORE UPDATE ON departments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_resources_updated_at BEFORE UPDATE ON resources FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_project_allocations_updated_at BEFORE UPDATE ON project_allocations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to log changes to audit table
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

-- Apply audit triggers to critical tables
CREATE TRIGGER audit_resources AFTER INSERT OR UPDATE OR DELETE ON resources FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();
CREATE TRIGGER audit_projects AFTER INSERT OR UPDATE OR DELETE ON projects FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();
CREATE TRIGGER audit_project_allocations AFTER INSERT OR UPDATE OR DELETE ON project_allocations FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();

-- Add foreign key constraints that were referenced but not defined
ALTER TABLE departments ADD CONSTRAINT fk_dept_head FOREIGN KEY (head_id) REFERENCES resources(id);

-- Grant permissions (adjust as needed for your setup)
-- GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO zapcom_user;
-- GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO zapcom_user;
