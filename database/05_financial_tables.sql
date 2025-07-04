
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
