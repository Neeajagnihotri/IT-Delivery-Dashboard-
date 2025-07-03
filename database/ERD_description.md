
# Zapcom Resource Management System - Entity Relationship Diagram

## Database Overview
The Zapcom Resource Management System uses a comprehensive PostgreSQL database designed to handle enterprise-level resource allocation, project management, and analytics. The database follows normalization principles and includes audit trails, performance tracking, and real-time analytics capabilities.

## Core Entities and Relationships

### 1. **Users Table**
- **Purpose**: Authentication and authorization management
- **Key Fields**: id, name, email, password_hash, role, is_active
- **Relationships**: 
  - References resources (for employee users)
  - Referenced by audit_logs (tracking changes)

### 2. **Departments Table** 
- **Purpose**: Organizational structure and resource grouping
- **Key Fields**: id, name, description, head_id, budget, location
- **Relationships**:
  - Self-referencing to resources.id (head_id) - Department Head
  - One-to-Many with resources (department_id)

### 3. **Resources Table** (Central Entity)
- **Purpose**: Employee/contractor information and status tracking
- **Key Fields**: id, employee_id, name, email, department_id, role, level, status, salary, manager_id
- **Status Values**: 'Billable', 'Benched', 'Shadow', 'Associate', 'Available', 'On Leave'
- **Level Values**: 'Junior', 'Mid', 'Senior', 'Lead', 'Principal', 'Architect'
- **Relationships**:
  - Many-to-One with departments (department_id)
  - Self-referencing (manager_id) - Hierarchical management structure
  - One-to-Many with project_allocations
  - Many-to-Many with skills (via resource_skills)
  - One-to-Many with time_entries, performance_reviews, resource_availability

### 4. **Skills Table**
- **Purpose**: Technology and competency catalog
- **Key Fields**: id, name, category, market_demand, description
- **Categories**: 'Frontend', 'Backend', 'DevOps', 'Cloud', 'Database', 'Mobile', 'AI/ML', 'Design'
- **Relationships**:
  - Many-to-Many with resources (via resource_skills)

### 5. **Resource_Skills Table** (Junction Table)
- **Purpose**: Maps resources to their skills with proficiency tracking
- **Key Fields**: resource_id, skill_id, proficiency_level, years_experience, certified
- **Proficiency Scale**: 1-5 (1=Beginner, 5=Expert)
- **Relationships**:
  - Many-to-One with resources and skills

### 6. **Clients Table**
- **Purpose**: Customer/client information management
- **Key Fields**: id, name, contact_person, email, industry, tier
- **Tier Values**: 'Standard', 'Premium', 'Enterprise'
- **Relationships**:
  - One-to-Many with projects

### 7. **Projects Table**
- **Purpose**: Project lifecycle and metadata management
- **Key Fields**: id, name, client_id, manager_id, status, priority, start_date, end_date, budget
- **Status Values**: 'Planning', 'Active', 'On Hold', 'Completed', 'Cancelled'
- **Priority Values**: 'Low', 'Medium', 'High', 'Critical'
- **Relationships**:
  - Many-to-One with clients (client_id)
  - Many-to-One with resources (manager_id) - Project Manager
  - One-to-Many with project_allocations

### 8. **Project_Allocations Table** (Central Junction)
- **Purpose**: Resource assignment to projects with time tracking
- **Key Fields**: project_id, resource_id, allocation_percentage, start_date, end_date, role_in_project
- **Allocation Range**: 1-100% (supports partial allocations)
- **Relationships**:
  - Many-to-One with projects and resources
  - One-to-Many with time_entries

### 9. **Time_Entries Table**
- **Purpose**: Detailed time tracking and billing
- **Key Fields**: allocation_id, entry_date, hours_worked, description, billable, approved
- **Relationships**:
  - Many-to-One with project_allocations
  - Many-to-One with resources (approved_by)

### 10. **Performance_Reviews Table**
- **Purpose**: Employee performance evaluation and tracking
- **Key Fields**: resource_id, reviewer_id, overall_rating, technical_skills_rating, review_period
- **Rating Scale**: 1.0-5.0 (decimal precision for detailed evaluations)
- **Relationships**:
  - Many-to-One with resources (both employee and reviewer)

### 11. **Resource_Availability Table**
- **Purpose**: Vacation, training, and availability tracking
- **Key Fields**: resource_id, start_date, end_date, availability_percentage, type, reason
- **Type Values**: 'Available', 'Vacation', 'Sick Leave', 'Training', 'Other'
- **Relationships**:
  - Many-to-One with resources

### 12. **Audit_Logs Table**
- **Purpose**: Change tracking and compliance
- **Key Fields**: table_name, record_id, action, old_values, new_values, changed_by, changed_at
- **Action Values**: 'INSERT', 'UPDATE', 'DELETE'
- **Relationships**:
  - Many-to-One with users (changed_by)

## Database Views

### 1. **v_resource_allocation**
Combines resource information with current project assignments for real-time allocation overview.

### 2. **v_project_summary** 
Aggregates project data with client information, manager details, and resource counts.

### 3. **v_department_utilization**
Calculates department-wise utilization rates and resource distribution.

## Key Business Rules Enforced

### Resource Management
- Resources can have multiple skills with different proficiency levels
- Resources can be allocated to multiple projects with percentage splits
- Total allocation percentage across all projects should not exceed 100%
- Manager hierarchy prevents circular references

### Project Management
- Projects must have valid start dates and logical end dates
- Project managers must be active resources
- Budget tracking includes actual costs vs. planned budget
- Progress percentage ranges from 0-100%

### Time Tracking
- Hours worked per day cannot exceed 24 hours
- Time entries must be linked to valid project allocations
- Billable hours require approval workflow
- Time entries must fall within project date ranges

### Skills and Performance
- Skill proficiency ratings use 1-5 scale
- Performance reviews require both reviewer and reviewee to be active
- Market demand for skills ranges from 0-100%
- Certification tracking for professional development

## Indexes and Performance Optimization

### Primary Indexes
- All tables have primary key indexes
- Foreign key relationships are indexed
- Status and date fields are indexed for faster queries

### Composite Indexes
- (resource_id, skill_id) for skills lookup
- (project_id, resource_id, start_date) for allocation queries
- (allocation_id, entry_date) for time tracking

### Analytics Optimization
- Partial indexes on active records only
- Materialized views for complex analytics queries
- Query optimization for dashboard real-time updates

## Data Integrity and Constraints

### Referential Integrity
- All foreign keys have proper CASCADE/RESTRICT rules
- Soft deletes using is_active flags where appropriate
- Orphan record prevention through constraints

### Data Validation
- CHECK constraints for status values, ratings, and percentages
- Date validation to prevent logical inconsistencies
- Email format validation and uniqueness constraints

### Audit Trail
- Automatic timestamp updates using triggers
- Complete change history in audit_logs table
- User attribution for all modifications

## Security Considerations

### Access Control
- Role-based permissions (resource_manager, project_manager, analyst, user)
- Row-level security for sensitive salary information
- Audit logging for compliance requirements

### Data Protection
- Password hashing using bcrypt
- Sensitive data encryption at rest
- Connection security with SSL/TLS

## Scalability Features

### Horizontal Scaling
- Partitioning strategies for time_entries by date
- Archive tables for historical data
- Read replicas for analytics queries

### Performance Monitoring
- Query performance tracking
- Index usage analysis
- Connection pooling optimization

## Analytics and Reporting Capabilities

### Real-time Dashboards
- Resource utilization by department
- Project progress and budget tracking
- Skills demand vs. supply analysis
- Bench cost calculations

### Historical Analysis
- Trend analysis over time periods
- Performance correlation studies
- Predictive allocation modeling
- ROI calculations per project

### Export and Integration
- REST API endpoints for all entities
- JSON export capabilities for external tools
- Integration hooks for third-party systems
- Webhook notifications for status changes

This ERD provides a comprehensive foundation for enterprise resource management with built-in analytics, audit trails, and scalability features.
