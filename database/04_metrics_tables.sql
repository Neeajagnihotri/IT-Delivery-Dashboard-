
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
