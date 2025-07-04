
-- =============================================================================
-- INDEXES FOR PERFORMANCE OPTIMIZATION
-- =============================================================================

-- Users and Authentication
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_active ON users(is_active);

-- Departments
CREATE INDEX idx_departments_head ON departments(head_id);
CREATE INDEX idx_departments_active ON departments(is_active);

-- Resources
CREATE INDEX idx_resources_department ON resources(department_id);
CREATE INDEX idx_resources_status ON resources(status);
CREATE INDEX idx_resources_manager ON resources(manager_id);
CREATE INDEX idx_resources_employee_id ON resources(employee_id);
CREATE INDEX idx_resources_active ON resources(is_active);
CREATE INDEX idx_resources_shadow_status ON resources(shadow_status);

-- Skills and Resource Skills
CREATE INDEX idx_resource_skills_resource ON resource_skills(resource_id);
CREATE INDEX idx_resource_skills_skill ON resource_skills(skill_id);
CREATE INDEX idx_skills_category ON skills(category);

-- Projects
CREATE INDEX idx_projects_client ON projects(client_id);
CREATE INDEX idx_projects_manager ON projects(manager_id);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_active ON projects(is_active);
CREATE INDEX idx_projects_dates ON projects(start_date, end_date);
CREATE INDEX idx_projects_health_status ON projects(health_status);

-- Project Allocations
CREATE INDEX idx_project_allocations_project ON project_allocations(project_id);
CREATE INDEX idx_project_allocations_resource ON project_allocations(resource_id);
CREATE INDEX idx_project_allocations_active ON project_allocations(is_active);
CREATE INDEX idx_project_allocations_dates ON project_allocations(start_date, end_date);

-- Deliverables
CREATE INDEX idx_deliverables_project ON deliverables(project_id);
CREATE INDEX idx_deliverables_status ON deliverables(status);
CREATE INDEX idx_deliverables_assigned ON deliverables(assigned_to);
CREATE INDEX idx_deliverables_due_date ON deliverables(due_date);

-- Metrics
CREATE INDEX idx_engineering_metrics_project ON engineering_metrics(project_id);
CREATE INDEX idx_engineering_metrics_date ON engineering_metrics(metric_date);
CREATE INDEX idx_qa_metrics_project ON qa_metrics(project_id);
CREATE INDEX idx_qa_metrics_date ON qa_metrics(metric_date);

-- Escalations
CREATE INDEX idx_escalations_project ON escalations(project_id);
CREATE INDEX idx_escalations_status ON escalations(status);
CREATE INDEX idx_escalations_raised_by ON escalations(raised_by);
CREATE INDEX idx_escalations_priority ON escalations(priority);

-- Financial
CREATE INDEX idx_financial_tracking_project ON financial_tracking(project_id);
CREATE INDEX idx_financial_tracking_department ON financial_tracking(department_id);
CREATE INDEX idx_financial_tracking_period ON financial_tracking(period_start, period_end);

-- Time and Availability
CREATE INDEX idx_time_entries_allocation ON time_entries(allocation_id);
CREATE INDEX idx_time_entries_resource ON time_entries(resource_id);
CREATE INDEX idx_time_entries_project ON time_entries(project_id);
CREATE INDEX idx_time_entries_date ON time_entries(entry_date);
CREATE INDEX idx_resource_availability_resource ON resource_availability(resource_id);
CREATE INDEX idx_resource_availability_dates ON resource_availability(start_date, end_date);

-- Notifications
CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_read ON notifications(is_read);
CREATE INDEX idx_notifications_created ON notifications(created_at);

-- Comments
CREATE INDEX idx_comments_entity ON comments(entity_type, entity_id);
CREATE INDEX idx_comments_user ON comments(user_id);

-- Audit
CREATE INDEX idx_audit_logs_table ON audit_logs(table_name, record_id);
CREATE INDEX idx_audit_logs_date ON audit_logs(changed_at);
CREATE INDEX idx_audit_logs_user ON audit_logs(changed_by);
