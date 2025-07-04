
# IT Delivery Dashboard Database Schema

This directory contains the modular database schema for the IT Delivery Dashboard. The schema has been broken down into logical modules for better maintainability and organization.

## File Structure

1. **01_core_tables.sql** - Core system tables (users, departments, skills, clients)
2. **02_resource_tables.sql** - Resource management tables (resources, skills mapping, salary)
3. **03_project_tables.sql** - Project management tables (projects, allocations, deliverables)
4. **04_metrics_tables.sql** - Metrics and analytics tables (engineering, QA, escalations, KPIs)
5. **05_financial_tables.sql** - Financial and performance tracking tables
6. **06_communication_tables.sql** - Communication tables (notifications, comments, audit logs)
7. **07_indexes.sql** - Database indexes for performance optimization
8. **08_constraints.sql** - Additional foreign key constraints
9. **09_views.sql** - Database views for analytics and reporting
10. **10_functions.sql** - Database functions and business logic
11. **11_triggers.sql** - Database triggers for automation
12. **12_sample_data.sql** - Sample data for testing and development

## Installation Order

Execute the files in numerical order to properly set up the database:

```bash
psql -d your_database -f 01_core_tables.sql
psql -d your_database -f 02_resource_tables.sql
psql -d your_database -f 03_project_tables.sql
psql -d your_database -f 04_metrics_tables.sql
psql -d your_database -f 05_financial_tables.sql
psql -d your_database -f 06_communication_tables.sql
psql -d your_database -f 07_indexes.sql
psql -d your_database -f 08_constraints.sql
psql -d your_database -f 09_views.sql
psql -d your_database -f 10_functions.sql
psql -d your_database -f 11_triggers.sql
psql -d your_database -f 12_sample_data.sql
```

## Key Features

- **Modular Design**: Each file focuses on a specific aspect of the system
- **Comprehensive RBAC**: Role-based access control for different user types
- **Advanced Metrics**: Engineering and QA metrics tracking
- **Financial Tracking**: Budget management and cost analysis
- **Automated Business Logic**: Triggers for shadow status updates and project health calculation
- **Performance Optimized**: Comprehensive indexing strategy
- **Audit Trail**: Complete audit logging for sensitive operations

## Business Logic

The schema includes several automated business processes:

1. **Shadow Status Updates**: Automatically updates shadow status based on progress percentage
2. **Project Health Calculation**: Dynamic health score calculation based on deliverables and budget
3. **Audit Logging**: Automatic logging of changes to sensitive tables
4. **Timestamp Management**: Automatic updated_at timestamp management

## Views and Analytics

Several views are provided for easy data access:

- `v_resource_allocation`: Active resource allocation overview
- `v_project_health`: Project health dashboard data
- `v_department_performance`: Department performance metrics
- `v_kpi_summary`: Key performance indicators summary

## Security Considerations

- Row Level Security (RLS) policies can be implemented based on user roles
- Sensitive salary information is separated into dedicated tables
- Audit logging tracks all changes to critical data
- Password hashing is implemented for user authentication
