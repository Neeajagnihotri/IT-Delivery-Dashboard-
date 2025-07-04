
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

-- ... keep existing code (all other sample data from departments, skills, clients, etc.)

-- Insert sample departments
INSERT INTO departments (name, description, budget_allocated, budget_utilized, burn_rate, health_score, location, cost_center) VALUES
('Engineering', 'Software Development and Architecture', 2500000.00, 1875000.00, 156250.00, 92, 'New York', 'ENG001'),
('Quality Assurance', 'Testing and Quality Control', 800000.00, 560000.00, 46667.00, 88, 'Austin', 'QA001'),
('DevOps', 'Infrastructure and Deployment', 1200000.00, 900000.00, 75000.00, 95, 'Seattle', 'DEV001'),
('Design', 'UI/UX and Product Design', 600000.00, 420000.00, 35000.00, 90, 'San Francisco', 'DES001'),
('Project Management', 'Project Coordination and Delivery', 900000.00, 675000.00, 56250.00, 85, 'Chicago', 'PM001'),
('Data Science', 'Analytics and Machine Learning', 1500000.00, 1125000.00, 93750.00, 87, 'Boston', 'DS001');

-- ... keep existing code (all remaining sample data inserts)

COMMENT ON DATABASE CURRENT_DATABASE() IS 'IT Delivery Dashboard - Unified database schema for comprehensive project and resource management';
