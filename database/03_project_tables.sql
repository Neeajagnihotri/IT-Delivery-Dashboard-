
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
