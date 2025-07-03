
-- Sample Data for Zapcom Resource Management System
-- Run this after creating the database schema

-- Insert Users
INSERT INTO users (name, email, password_hash, role) VALUES 
('Admin User', 'admin@zapcom.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewJUxBRLGF9qxdJ6', 'resource_manager'),
('Manager Alice', 'alice@zapcom.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewJUxBRLGF9qxdJ6', 'project_manager'),
('Analyst Bob', 'bob@zapcom.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewJUxBRLGF9qxdJ6', 'analyst'),
('Developer Carol', 'carol@zapcom.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewJUxBRLGF9qxdJ6', 'user');

-- Insert Skills
INSERT INTO skills (name, category, description, market_demand) VALUES 
('React', 'Frontend', 'Modern JavaScript library for building user interfaces', 90),
('Node.js', 'Backend', 'JavaScript runtime for server-side development', 85),
('Python', 'Backend', 'Versatile programming language for web, data science, and automation', 95),
('Java', 'Backend', 'Enterprise-grade programming language', 80),
('TypeScript', 'Frontend', 'Typed superset of JavaScript', 88),
('AWS', 'Cloud', 'Amazon Web Services cloud platform', 92),
('Docker', 'DevOps', 'Containerization platform', 85),
('Kubernetes', 'DevOps', 'Container orchestration platform', 82),
('PostgreSQL', 'Database', 'Advanced open-source relational database', 78),
('MongoDB', 'Database', 'NoSQL document database', 75),
('Vue.js', 'Frontend', 'Progressive JavaScript framework', 70),
('Angular', 'Frontend', 'Full-featured TypeScript framework', 65),
('Spring Boot', 'Backend', 'Java-based framework for microservices', 75),
('Django', 'Backend', 'High-level Python web framework', 80),
('React Native', 'Mobile', 'Cross-platform mobile development framework', 85),
('Flutter', 'Mobile', 'Google mobile app SDK', 78),
('Azure', 'Cloud', 'Microsoft cloud computing platform', 88),
('GCP', 'Cloud', 'Google Cloud Platform', 82),
('Jenkins', 'DevOps', 'Automation server for CI/CD', 70),
('Terraform', 'DevOps', 'Infrastructure as Code tool', 85),
('GraphQL', 'API', 'Query language for APIs', 75),
('Redis', 'Database', 'In-memory data structure store', 70),
('Elasticsearch', 'Search', 'Distributed search and analytics engine', 72),
('Machine Learning', 'AI/ML', 'Artificial intelligence and machine learning', 95),
('TensorFlow', 'AI/ML', 'Open-source machine learning platform', 88),
('PyTorch', 'AI/ML', 'Machine learning library', 85),
('Figma', 'Design', 'Collaborative interface design tool', 82),
('Adobe XD', 'Design', 'User experience design software', 75),
('Sketch', 'Design', 'Digital design toolkit', 68),
('Unity', 'Game Dev', 'Game development platform', 70);

-- Insert Departments
INSERT INTO departments (name, description, budget, location) VALUES 
('Engineering', 'Software development and technical implementation', 2500000, 'New York'),
('Design', 'User experience and interface design', 800000, 'San Francisco'),
('Quality Assurance', 'Software testing and quality control', 600000, 'Austin'),
('DevOps', 'Infrastructure and deployment automation', 900000, 'Seattle'),
('Product Management', 'Product strategy and roadmap planning', 700000, 'Los Angeles'),
('Data Science', 'Data analysis and machine learning', 1200000, 'Boston'),
('Sales', 'Business development and client acquisition', 1000000, 'Chicago'),
('Marketing', 'Brand promotion and digital marketing', 650000, 'Miami'),
('Human Resources', 'Talent management and employee relations', 400000, 'Denver'),
('Finance', 'Financial planning and accounting', 500000, 'Dallas');

-- Insert Clients
INSERT INTO clients (name, contact_person, email, phone, industry, tier) VALUES 
('TechCorp Inc.', 'John Smith', 'john.smith@techcorp.com', '+1-555-0101', 'Technology', 'Enterprise'),
('FinanceHub', 'Sarah Johnson', 'sarah.j@financehub.com', '+1-555-0102', 'Finance', 'Enterprise'),
('DataCore Solutions', 'Michael Chen', 'mchen@datacore.com', '+1-555-0103', 'Data Analytics', 'Premium'),
('SmartTech Ltd.', 'Lisa Wang', 'lisa.wang@smarttech.com', '+1-555-0104', 'IoT', 'Premium'),
('CryptoVenture', 'David Lee', 'david@cryptoventure.com', '+1-555-0105', 'Cryptocurrency', 'Standard'),
('EcoGreen Corp', 'Emma Brown', 'emma.brown@ecogreen.com', '+1-555-0106', 'Sustainability', 'Standard'),
('HealthTech Plus', 'Robert Wilson', 'rwilson@healthtech.com', '+1-555-0107', 'Healthcare', 'Premium'),
('EduLearn Systems', 'Jennifer Garcia', 'jgarcia@edulearn.com', '+1-555-0108', 'Education', 'Standard'),
('RetailMax', 'Tom Anderson', 'tanderson@retailmax.com', '+1-555-0109', 'Retail', 'Enterprise'),
('LogiFlow Inc.', 'Maria Rodriguez', 'mrodriguez@logiflow.com', '+1-555-0110', 'Logistics', 'Premium');

-- Insert Resources (sample employees)
INSERT INTO resources (employee_id, name, email, phone, department_id, role, level, status, hire_date, salary, location, performance_rating) VALUES 
-- Engineering Department
('ENG001', 'Alex Thompson', 'alex.thompson@zapcom.com', '+1-555-1001', 1, 'Senior Full Stack Developer', 'Senior', 'Billable', '2020-03-15', 125000, 'New York', 4.2),
('ENG002', 'Maria Santos', 'maria.santos@zapcom.com', '+1-555-1002', 1, 'Frontend Developer', 'Mid', 'Billable', '2021-06-10', 95000, 'New York', 4.0),
('ENG003', 'James Wilson', 'james.wilson@zapcom.com', '+1-555-1003', 1, 'Backend Developer', 'Senior', 'Benched', '2019-11-20', 120000, 'New York', 4.1),
('ENG004', 'Priya Patel', 'priya.patel@zapcom.com', '+1-555-1004', 1, 'Junior Developer', 'Junior', 'Shadow', '2023-01-08', 75000, 'New York', 3.8),
('ENG005', 'Carlos Rodriguez', 'carlos.rodriguez@zapcom.com', '+1-555-1005', 1, 'Tech Lead', 'Lead', 'Billable', '2018-04-12', 145000, 'New York', 4.5),
('ENG006', 'Sophie Kim', 'sophie.kim@zapcom.com', '+1-555-1006', 1, 'Full Stack Developer', 'Mid', 'Billable', '2022-02-14', 105000, 'New York', 3.9),
('ENG007', 'Ahmed Hassan', 'ahmed.hassan@zapcom.com', '+1-555-1007', 1, 'Senior Backend Developer', 'Senior', 'Billable', '2020-08-30', 130000, 'New York', 4.3),
('ENG008', 'Emily Chen', 'emily.chen@zapcom.com', '+1-555-1008', 1, 'Mobile Developer', 'Mid', 'Benched', '2021-12-01', 100000, 'New York', 4.0),

-- Design Department
('DES001', 'Lucas Brown', 'lucas.brown@zapcom.com', '+1-555-2001', 2, 'Senior UX Designer', 'Senior', 'Billable', '2019-07-22', 110000, 'San Francisco', 4.4),
('DES002', 'Olivia Martinez', 'olivia.martinez@zapcom.com', '+1-555-2002', 2, 'UI Designer', 'Mid', 'Billable', '2022-05-18', 85000, 'San Francisco', 4.1),
('DES003', 'Ryan Taylor', 'ryan.taylor@zapcom.com', '+1-555-2003', 2, 'Product Designer', 'Senior', 'Billable', '2020-10-05', 115000, 'San Francisco', 4.2),
('DES004', 'Zoe Wang', 'zoe.wang@zapcom.com', '+1-555-2004', 2, 'Junior Designer', 'Junior', 'Shadow', '2023-03-12', 65000, 'San Francisco', 3.7),

-- QA Department
('QA001', 'Michael Johnson', 'michael.johnson@zapcom.com', '+1-555-3001', 3, 'Senior QA Engineer', 'Senior', 'Billable', '2019-05-14', 105000, 'Austin', 4.0),
('QA002', 'Rachel Green', 'rachel.green@zapcom.com', '+1-555-3002', 3, 'QA Analyst', 'Mid', 'Billable', '2021-09-07', 80000, 'Austin', 3.9),
('QA003', 'Daniel Kim', 'daniel.kim@zapcom.com', '+1-555-3003', 3, 'Automation Engineer', 'Senior', 'Benched', '2020-12-20', 110000, 'Austin', 4.2),
('QA004', 'Lisa Zhang', 'lisa.zhang@zapcom.com', '+1-555-3004', 3, 'Junior QA Engineer', 'Junior', 'Shadow', '2023-02-28', 70000, 'Austin', 3.8),

-- DevOps Department
('DEV001', 'Kevin O\'Connor', 'kevin.oconnor@zapcom.com', '+1-555-4001', 4, 'Senior DevOps Engineer', 'Senior', 'Billable', '2018-12-03', 135000, 'Seattle', 4.6),
('DEV002', 'Anna Kowalski', 'anna.kowalski@zapcom.com', '+1-555-4002', 4, 'Cloud Engineer', 'Mid', 'Billable', '2021-07-25', 115000, 'Seattle', 4.3),
('DEV003', 'Mohammed Ali', 'mohammed.ali@zapcom.com', '+1-555-4003', 4, 'Infrastructure Engineer', 'Senior', 'Billable', '2019-09-18', 125000, 'Seattle', 4.1),

-- Product Management
('PM001', 'Sarah Davis', 'sarah.davis@zapcom.com', '+1-555-5001', 5, 'Senior Product Manager', 'Senior', 'Billable', '2019-02-11', 130000, 'Los Angeles', 4.4),
('PM002', 'Jack Thompson', 'jack.thompson@zapcom.com', '+1-555-5002', 5, 'Product Owner', 'Mid', 'Billable', '2022-01-16', 105000, 'Los Angeles', 4.0),
('PM003', 'Nina Petrov', 'nina.petrov@zapcom.com', '+1-555-5003', 5, 'Junior Product Manager', 'Junior', 'Associate', '2023-04-10', 85000, 'Los Angeles', 3.6),

-- Data Science
('DS001', 'Dr. Robert Smith', 'robert.smith@zapcom.com', '+1-555-6001', 6, 'Senior Data Scientist', 'Senior', 'Benched', '2018-06-28', 145000, 'Boston', 4.5),
('DS002', 'Jennifer Liu', 'jennifer.liu@zapcom.com', '+1-555-6002', 6, 'Machine Learning Engineer', 'Mid', 'Shadow', '2021-11-14', 125000, 'Boston', 4.2),
('DS003', 'Thomas Anderson', 'thomas.anderson@zapcom.com', '+1-555-6003', 6, 'Data Analyst', 'Mid', 'Shadow', '2022-08-22', 95000, 'Boston', 3.9),
('DS004', 'Maya Singh', 'maya.singh@zapcom.com', '+1-555-6004', 6, 'Junior Data Scientist', 'Junior', 'Associate', '2023-05-01', 80000, 'Boston', 3.7);

-- Update some resources with bench information
UPDATE resources SET bench_reason = 'Between Projects', bench_start_date = '2024-05-15' WHERE status = 'Benched';
UPDATE resources SET bench_reason = 'Skills Training', bench_start_date = '2024-06-01' WHERE employee_id = 'DS001';

-- Set up manager relationships
UPDATE resources SET manager_id = (SELECT id FROM resources WHERE employee_id = 'ENG005') WHERE department_id = 1 AND employee_id != 'ENG005';
UPDATE resources SET manager_id = (SELECT id FROM resources WHERE employee_id = 'DES001') WHERE department_id = 2 AND employee_id != 'DES001';
UPDATE resources SET manager_id = (SELECT id FROM resources WHERE employee_id = 'QA001') WHERE department_id = 3 AND employee_id != 'QA001';
UPDATE resources SET manager_id = (SELECT id FROM resources WHERE employee_id = 'DEV001') WHERE department_id = 4 AND employee_id != 'DEV001';
UPDATE resources SET manager_id = (SELECT id FROM resources WHERE employee_id = 'PM001') WHERE department_id = 5 AND employee_id != 'PM001';
UPDATE resources SET manager_id = (SELECT id FROM resources WHERE employee_id = 'DS001') WHERE department_id = 6 AND employee_id != 'DS001';

-- Set department heads
UPDATE departments SET head_id = (SELECT id FROM resources WHERE employee_id = 'ENG005') WHERE name = 'Engineering';
UPDATE departments SET head_id = (SELECT id FROM resources WHERE employee_id = 'DES001') WHERE name = 'Design';
UPDATE departments SET head_id = (SELECT id FROM resources WHERE employee_id = 'QA001') WHERE name = 'Quality Assurance';
UPDATE departments SET head_id = (SELECT id FROM resources WHERE employee_id = 'DEV001') WHERE name = 'DevOps';
UPDATE departments SET head_id = (SELECT id FROM resources WHERE employee_id = 'PM001') WHERE name = 'Product Management';
UPDATE departments SET head_id = (SELECT id FROM resources WHERE employee_id = 'DS001') WHERE name = 'Data Science';

-- Insert Resource Skills (mapping resources to their skills)
INSERT INTO resource_skills (resource_id, skill_id, proficiency_level, years_experience, certified) VALUES 
-- Alex Thompson (Full Stack)
((SELECT id FROM resources WHERE employee_id = 'ENG001'), (SELECT id FROM skills WHERE name = 'React'), 5, 4.5, true),
((SELECT id FROM resources WHERE employee_id = 'ENG001'), (SELECT id FROM skills WHERE name = 'Node.js'), 5, 4.0, true),
((SELECT id FROM resources WHERE employee_id = 'ENG001'), (SELECT id FROM skills WHERE name = 'TypeScript'), 4, 3.5, false),
((SELECT id FROM resources WHERE employee_id = 'ENG001'), (SELECT id FROM skills WHERE name = 'AWS'), 4, 3.0, true),
((SELECT id FROM resources WHERE employee_id = 'ENG001'), (SELECT id FROM skills WHERE name = 'PostgreSQL'), 4, 4.0, false),

-- Maria Santos (Frontend)
((SELECT id FROM resources WHERE employee_id = 'ENG002'), (SELECT id FROM skills WHERE name = 'React'), 4, 2.5, false),
((SELECT id FROM resources WHERE employee_id = 'ENG002'), (SELECT id FROM skills WHERE name = 'TypeScript'), 4, 2.0, false),
((SELECT id FROM resources WHERE employee_id = 'ENG002'), (SELECT id FROM skills WHERE name = 'Vue.js'), 3, 1.5, false),

-- James Wilson (Backend)
((SELECT id FROM resources WHERE employee_id = 'ENG003'), (SELECT id FROM skills WHERE name = 'Python'), 5, 5.0, true),
((SELECT id FROM resources WHERE employee_id = 'ENG003'), (SELECT id FROM skills WHERE name = 'Django'), 5, 4.5, true),
((SELECT id FROM resources WHERE employee_id = 'ENG003'), (SELECT id FROM skills WHERE name = 'PostgreSQL'), 4, 4.0, false),
((SELECT id FROM resources WHERE employee_id = 'ENG003'), (SELECT id FROM skills WHERE name = 'Docker'), 4, 3.0, false),

-- Priya Patel (Junior)
((SELECT id FROM resources WHERE employee_id = 'ENG004'), (SELECT id FROM skills WHERE name = 'React'), 2, 1.0, false),
((SELECT id FROM resources WHERE employee_id = 'ENG004'), (SELECT id FROM skills WHERE name = 'Node.js'), 2, 0.8, false),
((SELECT id FROM resources WHERE employee_id = 'ENG004'), (SELECT id FROM skills WHERE name = 'JavaScript'), 3, 1.2, false),

-- Carlos Rodriguez (Tech Lead)
((SELECT id FROM resources WHERE employee_id = 'ENG005'), (SELECT id FROM skills WHERE name = 'Java'), 5, 8.0, true),
((SELECT id FROM resources WHERE employee_id = 'ENG005'), (SELECT id FROM skills WHERE name = 'Spring Boot'), 5, 6.0, true),
((SELECT id FROM resources WHERE employee_id = 'ENG005'), (SELECT id FROM skills WHERE name = 'Kubernetes'), 4, 4.0, true),
((SELECT id FROM resources WHERE employee_id = 'ENG005'), (SELECT id FROM skills WHERE name = 'AWS'), 5, 5.0, true),

-- Design Team Skills
((SELECT id FROM resources WHERE employee_id = 'DES001'), (SELECT id FROM skills WHERE name = 'Figma'), 5, 4.0, true),
((SELECT id FROM resources WHERE employee_id = 'DES001'), (SELECT id FROM skills WHERE name = 'Adobe XD'), 4, 3.5, false),
((SELECT id FROM resources WHERE employee_id = 'DES002'), (SELECT id FROM skills WHERE name = 'Figma'), 4, 2.0, false),
((SELECT id FROM resources WHERE employee_id = 'DES003'), (SELECT id FROM skills WHERE name = 'Figma'), 5, 3.5, true),

-- DevOps Team Skills
((SELECT id FROM resources WHERE employee_id = 'DEV001'), (SELECT id FROM skills WHERE name = 'AWS'), 5, 6.0, true),
((SELECT id FROM resources WHERE employee_id = 'DEV001'), (SELECT id FROM skills WHERE name = 'Docker'), 5, 5.0, true),
((SELECT id FROM resources WHERE employee_id = 'DEV001'), (SELECT id FROM skills WHERE name = 'Kubernetes'), 5, 4.5, true),
((SELECT id FROM resources WHERE employee_id = 'DEV001'), (SELECT id FROM skills WHERE name = 'Terraform'), 5, 4.0, true),
((SELECT id FROM resources WHERE employee_id = 'DEV002'), (SELECT id FROM skills WHERE name = 'AWS'), 4, 3.0, true),
((SELECT id FROM resources WHERE employee_id = 'DEV002'), (SELECT id FROM skills WHERE name = 'Docker'), 4, 2.5, false),
((SELECT id FROM resources WHERE employee_id = 'DEV003'), (SELECT id FROM skills WHERE name = 'Jenkins'), 4, 3.5, false),

-- Data Science Team Skills
((SELECT id FROM resources WHERE employee_id = 'DS001'), (SELECT id FROM skills WHERE name = 'Python'), 5, 10.0, true),
((SELECT id FROM resources WHERE employee_id = 'DS001'), (SELECT id FROM skills WHERE name = 'Machine Learning'), 5, 8.0, true),
((SELECT id FROM resources WHERE employee_id = 'DS001'), (SELECT id FROM skills WHERE name = 'TensorFlow'), 5, 6.0, true),
((SELECT id FROM resources WHERE employee_id = 'DS002'), (SELECT id FROM skills WHERE name = 'Python'), 4, 3.5, false),
((SELECT id FROM resources WHERE employee_id = 'DS002'), (SELECT id FROM skills WHERE name = 'Machine Learning'), 4, 3.0, false),
((SELECT id FROM resources WHERE employee_id = 'DS002'), (SELECT id FROM skills WHERE name = 'PyTorch'), 4, 2.5, false);

-- Insert Projects
INSERT INTO projects (name, description, client_id, manager_id, status, priority, start_date, end_date, budget, progress_percentage, technology_stack, methodology) VALUES 
('E-commerce Platform Redesign', 'Complete overhaul of the existing e-commerce platform with modern UI/UX and improved performance', 
 (SELECT id FROM clients WHERE name = 'TechCorp Inc.'), 
 (SELECT id FROM resources WHERE employee_id = 'PM001'), 
 'Active', 'High', '2024-01-15', '2024-08-30', 450000, 65,
 ARRAY['React', 'Node.js', 'PostgreSQL', 'AWS', 'Docker'], 'Agile'),

('Mobile Banking Application', 'Secure mobile banking app with biometric authentication and real-time transactions',
 (SELECT id FROM clients WHERE name = 'FinanceHub'),
 (SELECT id FROM resources WHERE employee_id = 'PM002'),
 'Active', 'Critical', '2024-02-01', '2024-09-15', 680000, 45,
 ARRAY['React Native', 'Node.js', 'MongoDB', 'AWS'], 'Agile'),

('AI Analytics Dashboard', 'Advanced analytics dashboard with machine learning insights and predictive modeling',
 (SELECT id FROM clients WHERE name = 'DataCore Solutions'),
 (SELECT id FROM resources WHERE employee_id = 'DS001'),
 'Planning', 'High', '2024-07-01', '2024-12-31', 520000, 15,
 ARRAY['Python', 'TensorFlow', 'React', 'PostgreSQL', 'AWS'], 'Scrum'),

('IoT Management System', 'Comprehensive IoT device management platform with real-time monitoring',
 (SELECT id FROM clients WHERE name = 'SmartTech Ltd.'),
 (SELECT id FROM resources WHERE employee_id = 'ENG005'),
 'Active', 'Medium', '2023-10-01', '2024-06-30', 750000, 85,
 ARRAY['Java', 'Spring Boot', 'PostgreSQL', 'Kubernetes', 'AWS'], 'Agile'),

('Blockchain Wallet Application', 'Secure cryptocurrency wallet with multi-chain support',
 (SELECT id FROM clients WHERE name = 'CryptoVenture'),
 (SELECT id FROM resources WHERE employee_id = 'PM001'),
 'On Hold', 'Medium', '2024-03-01', '2024-10-30', 380000, 25,
 ARRAY['React', 'Node.js', 'MongoDB', 'Web3'], 'Kanban'),

('Sustainability Platform', 'Environmental impact tracking and reporting platform',
 (SELECT id FROM clients WHERE name = 'EcoGreen Corp'),
 (SELECT id FROM resources WHERE employee_id = 'PM002'),
 'Planning', 'Low', '2024-08-01', '2025-02-28', 280000, 5,
 ARRAY['Vue.js', 'Python', 'PostgreSQL', 'AWS'], 'Agile'),

('Healthcare Data Analytics', 'HIPAA-compliant healthcare data analysis and visualization platform',
 (SELECT id FROM clients WHERE name = 'HealthTech Plus'),
 (SELECT id FROM resources WHERE employee_id = 'DS001'),
 'Active', 'High', '2024-04-15', '2024-11-30', 620000, 35,
 ARRAY['Python', 'Django', 'PostgreSQL', 'TensorFlow', 'AWS'], 'Agile');

-- Insert Project Allocations
INSERT INTO project_allocations (project_id, resource_id, allocation_percentage, start_date, end_date, role_in_project, hourly_rate, total_hours_allocated) VALUES 
-- E-commerce Platform Redesign
((SELECT id FROM projects WHERE name = 'E-commerce Platform Redesign'), (SELECT id FROM resources WHERE employee_id = 'ENG001'), 100, '2024-01-15', '2024-08-30', 'Lead Full Stack Developer', 150, 1400),
((SELECT id FROM projects WHERE name = 'E-commerce Platform Redesign'), (SELECT id FROM resources WHERE employee_id = 'ENG002'), 100, '2024-01-15', '2024-08-30', 'Frontend Developer', 115, 1400),
((SELECT id FROM projects WHERE name = 'E-commerce Platform Redesign'), (SELECT id FROM resources WHERE employee_id = 'DES001'), 80, '2024-01-15', '2024-06-30', 'Senior UX Designer', 135, 900),
((SELECT id FROM projects WHERE name = 'E-commerce Platform Redesign'), (SELECT id FROM resources WHERE employee_id = 'QA001'), 75, '2024-03-01', '2024-08-30', 'QA Lead', 125, 900),

-- Mobile Banking Application
((SELECT id FROM projects WHERE name = 'Mobile Banking Application'), (SELECT id FROM resources WHERE employee_id = 'ENG006'), 100, '2024-02-01', '2024-09-15', 'Mobile Developer', 125, 1500),
((SELECT id FROM projects WHERE name = 'Mobile Banking Application'), (SELECT id FROM resources WHERE employee_id = 'ENG007'), 100, '2024-02-01', '2024-09-15', 'Backend Developer', 155, 1500),
((SELECT id FROM projects WHERE name = 'Mobile Banking Application'), (SELECT id FROM resources WHERE employee_id = 'DES002'), 60, '2024-02-01', '2024-07-15', 'UI Designer', 105, 700),
((SELECT id FROM projects WHERE name = 'Mobile Banking Application'), (SELECT id FROM resources WHERE employee_id = 'QA002'), 80, '2024-03-15', '2024-09-15', 'QA Engineer', 95, 1000),

-- IoT Management System
((SELECT id FROM projects WHERE name = 'IoT Management System'), (SELECT id FROM resources WHERE employee_id = 'ENG005'), 90, '2023-10-01', '2024-06-30', 'Technical Lead', 175, 1400),
((SELECT id FROM projects WHERE name = 'IoT Management System'), (SELECT id FROM resources WHERE employee_id = 'DEV001'), 100, '2023-10-01', '2024-06-30', 'DevOps Lead', 165, 1400),
((SELECT id FROM projects WHERE name = 'IoT Management System'), (SELECT id FROM resources WHERE employee_id = 'DEV002'), 80, '2023-12-01', '2024-06-30', 'Cloud Engineer', 135, 1000),

-- Healthcare Data Analytics
((SELECT id FROM projects WHERE name = 'Healthcare Data Analytics'), (SELECT id FROM resources WHERE employee_id = 'DS002'), 100, '2024-04-15', '2024-11-30', 'ML Engineer', 150, 1300),
((SELECT id FROM projects WHERE name = 'Healthcare Data Analytics'), (SELECT id FROM resources WHERE employee_id = 'DS003'), 100, '2024-04-15', '2024-11-30', 'Data Analyst', 115, 1300);

-- Insert some time entries
INSERT INTO time_entries (allocation_id, entry_date, hours_worked, description, task_type, billable, approved) VALUES 
(1, '2024-06-17', 8.0, 'Implemented user authentication module', 'Development', true, true),
(1, '2024-06-16', 7.5, 'Code review and bug fixes', 'Development', true, true),
(2, '2024-06-17', 8.0, 'Designed responsive product catalog', 'Development', true, true),
(3, '2024-06-17', 6.0, 'Created user journey wireframes', 'Design', true, false),
(5, '2024-06-17', 8.0, 'Developed authentication API', 'Development', true, true),
(6, '2024-06-17', 8.0, 'Backend security implementation', 'Development', true, true);

-- Insert resource availability (vacation, training, etc.)
INSERT INTO resource_availability (resource_id, start_date, end_date, availability_percentage, reason, type) VALUES 
((SELECT id FROM resources WHERE employee_id = 'ENG002'), '2024-07-15', '2024-07-26', 0, 'Summer vacation', 'Vacation'),
((SELECT id FROM resources WHERE employee_id = 'DES001'), '2024-08-05', '2024-08-09', 0, 'Design conference', 'Training'),
((SELECT id FROM resources WHERE employee_id = 'DEV001'), '2024-09-10', '2024-09-12', 50, 'AWS certification training', 'Training');

-- Insert performance reviews
INSERT INTO performance_reviews (resource_id, reviewer_id, review_period_start, review_period_end, overall_rating, technical_skills_rating, communication_rating, leadership_rating, goals_achievements, areas_improvement, feedback) VALUES 
((SELECT id FROM resources WHERE employee_id = 'ENG001'), (SELECT id FROM resources WHERE employee_id = 'ENG005'), '2023-07-01', '2023-12-31', 4.2, 4.5, 4.0, 4.0, 'Successfully led the e-commerce project migration', 'Could improve documentation practices', 'Excellent technical leadership and mentoring skills'),
((SELECT id FROM resources WHERE employee_id = 'ENG002'), (SELECT id FROM resources WHERE employee_id = 'ENG005'), '2023-07-01', '2023-12-31', 4.0, 4.2, 3.8, 3.5, 'Delivered high-quality frontend components', 'Needs to work on cross-team communication', 'Strong technical skills, growing into a leadership role'),
((SELECT id FROM resources WHERE employee_id = 'DES001'), (SELECT id FROM resources WHERE employee_id = 'PM001'), '2023-07-01', '2023-12-31', 4.4, 4.3, 4.5, 4.5, 'Led design system standardization across projects', 'Continue expanding prototyping skills', 'Outstanding design leadership and user advocacy');

-- Create some sample audit log entries (these would normally be created by triggers)
INSERT INTO audit_logs (table_name, record_id, action, new_values, changed_by, changed_at) VALUES 
('resources', 1, 'UPDATE', '{"status": "Billable", "updated_at": "2024-06-18T10:00:00Z"}', 1, '2024-06-18 10:00:00'),
('projects', 1, 'UPDATE', '{"progress_percentage": 65, "updated_at": "2024-06-18T14:30:00Z"}', 1, '2024-06-18 14:30:00'),
('project_allocations', 1, 'INSERT', '{"project_id": 1, "resource_id": 1, "allocation_percentage": 100}', 1, '2024-01-15 09:00:00');

-- Update resource status based on current allocations
UPDATE resources SET status = 'Billable' WHERE id IN (
    SELECT DISTINCT resource_id FROM project_allocations 
    WHERE is_active = TRUE AND start_date <= CURRENT_DATE 
    AND (end_date IS NULL OR end_date >= CURRENT_DATE)
);

-- Create some indexes for better performance on sample data
ANALYZE resources;
ANALYZE projects;
ANALYZE project_allocations;
ANALYZE resource_skills;
ANALYZE time_entries;

-- Verify data integrity
SELECT 'Resources created: ' || COUNT(*) FROM resources;
SELECT 'Projects created: ' || COUNT(*) FROM projects;
SELECT 'Allocations created: ' || COUNT(*) FROM project_allocations;
SELECT 'Skills mapped: ' || COUNT(*) FROM resource_skills;
SELECT 'Time entries: ' || COUNT(*) FROM time_entries;
