
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
