
-- Zapcom Enterprise IT Delivery Platform Database Schema
-- Extended schema for comprehensive enterprise functionality

-- Drop existing constraints and add new ones
ALTER TABLE users DROP CONSTRAINT IF EXISTS chk_user_role;
ALTER TABLE users ADD CONSTRAINT chk_user_role CHECK (role IN ('hr', 'resource_manager', 'leadership'));

-- Add new tables for enterprise functionality

-- Departments table enhancement
ALTER TABLE departments ADD COLUMN IF NOT EXISTS budget_allocated DECIMAL(15,2);
ALTER TABLE departments ADD COLUMN IF NOT EXISTS budget_utilized DECIMAL(15,2);
ALTER TABLE departments ADD COLUMN IF NOT EXISTS burn_rate DECIMAL(10,2);
ALTER TABLE departments ADD COLUMN IF NOT EXISTS health_score INTEGER DEFAULT 85 CHECK (health_score >= 0 AND health_score <= 100);

-- Projects enhancement for health tracking
ALTER TABLE projects ADD COLUMN IF NOT EXISTS health_score INTEGER DEFAULT 85 CHECK (health_score >= 0 AND health_score <= 100);
ALTER TABLE projects ADD COLUMN IF NOT EXISTS health_status VARCHAR(10) DEFAULT 'Green' CHECK (health_status IN ('Green', 'Yellow', 'Red'));
ALTER TABLE projects ADD COLUMN IF NOT EXISTS escalation_count INTEGER DEFAULT 0;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS last_escalation_date DATE;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS delivery_risk VARCHAR(20) DEFAULT 'Low' CHECK (delivery_risk IN ('Low', 'Medium', 'High', 'Critical'));

-- Deliverables tracking table
CREATE TABLE IF NOT EXISTS deliverables (
    id SERIAL PRIMARY KEY,
    project_id INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    due_date DATE NOT NULL,
    completion_date DATE,
    status VARCHAR(30) DEFAULT 'Pending' CHECK (status IN ('Pending', 'In Progress', 'Completed', 'Delayed', 'Cancelled')),
    priority VARCHAR(20) DEFAULT 'Medium' CHECK (priority IN ('Low', 'Medium', 'High', 'Critical')),
    assigned_to INTEGER REFERENCES resources(id),
    completion_percentage INTEGER DEFAULT 0 CHECK (completion_percentage >= 0 AND completion_percentage <= 100),
    quality_score INTEGER DEFAULT 85 CHECK (quality_score >= 0 AND quality_score <= 100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Engineering metrics table
CREATE TABLE IF NOT EXISTS engineering_metrics (
    id SERIAL PRIMARY KEY,
    project_id INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    metric_date DATE NOT NULL DEFAULT CURRENT_DATE,
    code_quality_score INTEGER DEFAULT 85 CHECK (code_quality_score >= 0 AND code_quality_score <= 100),
    test_coverage DECIMAL(5,2) DEFAULT 80.0 CHECK (test_coverage >= 0 AND test_coverage <= 100),
    bugs_reported INTEGER DEFAULT 0,
    bugs_resolved INTEGER DEFAULT 0,
    technical_debt_hours INTEGER DEFAULT 0,
    deployment_frequency INTEGER DEFAULT 0,
    lead_time_hours INTEGER DEFAULT 72,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- QA metrics table
CREATE TABLE IF NOT EXISTS qa_metrics (
    id SERIAL PRIMARY KEY,
    project_id INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    metric_date DATE NOT NULL DEFAULT CURRENT_DATE,
    test_cases_total INTEGER DEFAULT 0,
    test_cases_passed INTEGER DEFAULT 0,
    test_cases_failed INTEGER DEFAULT 0,
    automation_coverage DECIMAL(5,2) DEFAULT 70.0 CHECK (automation_coverage >= 0 AND automation_coverage <= 100),
    defect_density DECIMAL(8,2) DEFAULT 0.0,
    defect_removal_efficiency DECIMAL(5,2) DEFAULT 90.0,
    regression_test_time INTEGER DEFAULT 240, -- minutes
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Escalations tracking table
CREATE TABLE IF NOT EXISTS escalations (
    id SERIAL PRIMARY KEY,
    project_id INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    severity VARCHAR(20) DEFAULT 'Medium' CHECK (severity IN ('Low', 'Medium', 'High', 'Critical')),
    status VARCHAR(30) DEFAULT 'Open' CHECK (status IN ('Open', 'In Progress', 'Resolved', 'Closed')),
    raised_by INTEGER NOT NULL REFERENCES resources(id),
    assigned_to INTEGER REFERENCES resources(id),
    raised_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    resolved_date TIMESTAMP,
    resolution_time_hours INTEGER,
    impact_assessment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Financial tracking table (HR and Leadership only)
CREATE TABLE IF NOT EXISTS financial_tracking (
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

-- Salary information (HR only access)
CREATE TABLE IF NOT EXISTS salary_details (
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

-- Company-wide KPIs table
CREATE TABLE IF NOT EXISTS company_kpis (
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

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_deliverables_project ON deliverables(project_id);
CREATE INDEX IF NOT EXISTS idx_deliverables_status ON deliverables(status);
CREATE INDEX IF NOT EXISTS idx_engineering_metrics_project ON engineering_metrics(project_id);
CREATE INDEX IF NOT EXISTS idx_engineering_metrics_date ON engineering_metrics(metric_date);
CREATE INDEX IF NOT EXISTS idx_qa_metrics_project ON qa_metrics(project_id);
CREATE INDEX IF NOT EXISTS idx_qa_metrics_date ON qa_metrics(metric_date);
CREATE INDEX IF NOT EXISTS idx_escalations_project ON escalations(project_id);
CREATE INDEX IF NOT EXISTS idx_escalations_status ON escalations(status);
CREATE INDEX IF NOT EXISTS idx_financial_tracking_project ON financial_tracking(project_id);
CREATE INDEX IF NOT EXISTS idx_financial_tracking_department ON financial_tracking(department_id);
CREATE INDEX IF NOT EXISTS idx_salary_details_resource ON salary_details(resource_id);

-- Enhanced views for enterprise dashboard

-- Project health overview
CREATE OR REPLACE VIEW v_project_health AS
SELECT 
    p.id,
    p.name,
    p.health_score,
    p.health_status,
    p.escalation_count,
    p.delivery_risk,
    c.name as client_name,
    d.name as department_name,
    COUNT(del.id) as total_deliverables,
    COUNT(CASE WHEN del.status = 'Completed' THEN 1 END) as completed_deliverables,
    AVG(em.code_quality_score) as avg_code_quality,
    AVG(qm.automation_coverage) as avg_test_coverage,
    ft.budget_allocated,
    ft.budget_utilized,
    ft.burn_rate
FROM projects p
LEFT JOIN clients c ON p.client_id = c.id
LEFT JOIN departments d ON p.manager_id = pm.id AND pm.department_id = d.id
LEFT JOIN resources pm ON p.manager_id = pm.id
LEFT JOIN deliverables del ON p.id = del.project_id
LEFT JOIN engineering_metrics em ON p.id = em.project_id
LEFT JOIN qa_metrics qm ON p.id = qm.project_id
LEFT JOIN financial_tracking ft ON p.id = ft.project_id
WHERE p.is_active = TRUE
GROUP BY p.id, c.name, d.name, ft.budget_allocated, ft.budget_utilized, ft.burn_rate;

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
    COUNT(DISTINCT p.id) as active_projects,
    AVG(p.health_score) as avg_project_health,
    SUM(ft.revenue_generated) as total_revenue,
    AVG(ft.profit_margin) as avg_profit_margin
FROM departments d
LEFT JOIN resources r ON d.id = r.department_id AND r.is_active = TRUE
LEFT JOIN projects p ON r.id = p.manager_id AND p.is_active = TRUE
LEFT JOIN financial_tracking ft ON d.id = ft.department_id
GROUP BY d.id, d.name, d.budget_allocated, d.budget_utilized, d.burn_rate, d.health_score;

-- Resource performance with salary (HR view only)
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
    d.name as department_name,
    sd.base_salary,
    sd.total_compensation,
    COUNT(DISTINCT pa.project_id) as projects_count,
    AVG(pa.efficiency_rating) as avg_efficiency,
    SUM(te.hours_worked) as total_hours_worked
FROM resources r
LEFT JOIN departments d ON r.department_id = d.id
LEFT JOIN salary_details sd ON r.id = sd.resource_id
LEFT JOIN project_allocations pa ON r.id = pa.resource_id AND pa.is_active = TRUE
LEFT JOIN time_entries te ON pa.id = te.allocation_id
WHERE r.is_active = TRUE
GROUP BY r.id, d.name, sd.base_salary, sd.total_compensation;

-- Financial summary (HR and Leadership only)
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

-- Apply update triggers to new tables
CREATE TRIGGER update_deliverables_updated_at BEFORE UPDATE ON deliverables FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_engineering_metrics_updated_at BEFORE UPDATE ON engineering_metrics FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_qa_metrics_updated_at BEFORE UPDATE ON qa_metrics FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_escalations_updated_at BEFORE UPDATE ON escalations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_financial_tracking_updated_at BEFORE UPDATE ON financial_tracking FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_salary_details_updated_at BEFORE UPDATE ON salary_details FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_company_kpis_updated_at BEFORE UPDATE ON company_kpis FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Apply audit triggers to sensitive tables
CREATE TRIGGER audit_salary_details AFTER INSERT OR UPDATE OR DELETE ON salary_details FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();
CREATE TRIGGER audit_financial_tracking AFTER INSERT OR UPDATE OR DELETE ON financial_tracking FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();
CREATE TRIGGER audit_escalations AFTER INSERT OR UPDATE OR DELETE ON escalations FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();
