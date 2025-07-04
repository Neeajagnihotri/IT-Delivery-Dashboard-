
-- =============================================================================
-- CORE TABLES - User Management, Departments, Skills, Clients
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
