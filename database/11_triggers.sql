
-- =============================================================================
-- APPLY TRIGGERS
-- =============================================================================

-- Update timestamp triggers
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_departments_updated_at BEFORE UPDATE ON departments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_resources_updated_at BEFORE UPDATE ON resources FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_project_allocations_updated_at BEFORE UPDATE ON project_allocations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_deliverables_updated_at BEFORE UPDATE ON deliverables FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_engineering_metrics_updated_at BEFORE UPDATE ON engineering_metrics FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_qa_metrics_updated_at BEFORE UPDATE ON qa_metrics FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_escalations_updated_at BEFORE UPDATE ON escalations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_financial_tracking_updated_at BEFORE UPDATE ON financial_tracking FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_salary_details_updated_at BEFORE UPDATE ON salary_details FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_notifications_updated_at BEFORE UPDATE ON notifications FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_comments_updated_at BEFORE UPDATE ON comments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Shadow status auto-update trigger
CREATE TRIGGER update_shadow_status_trigger BEFORE UPDATE ON resources FOR EACH ROW EXECUTE FUNCTION update_shadow_status();

-- Project health update triggers
CREATE TRIGGER update_project_health_deliverables AFTER INSERT OR UPDATE OR DELETE ON deliverables FOR EACH ROW EXECUTE FUNCTION update_project_health();
CREATE TRIGGER update_project_health_financial AFTER INSERT OR UPDATE OR DELETE ON financial_tracking FOR EACH ROW EXECUTE FUNCTION update_project_health();
CREATE TRIGGER update_project_health_escalations AFTER INSERT OR UPDATE OR DELETE ON escalations FOR EACH ROW EXECUTE FUNCTION update_project_health();

-- Audit triggers for sensitive tables
CREATE TRIGGER audit_resources AFTER INSERT OR UPDATE OR DELETE ON resources FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();
CREATE TRIGGER audit_projects AFTER INSERT OR UPDATE OR DELETE ON projects FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();
CREATE TRIGGER audit_project_allocations AFTER INSERT OR UPDATE OR DELETE ON project_allocations FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();
CREATE TRIGGER audit_salary_details AFTER INSERT OR UPDATE OR DELETE ON salary_details FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();
CREATE TRIGGER audit_financial_tracking AFTER INSERT OR UPDATE OR DELETE ON financial_tracking FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();
CREATE TRIGGER audit_escalations AFTER INSERT OR UPDATE OR DELETE ON escalations FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();
CREATE TRIGGER audit_deliverables AFTER INSERT OR UPDATE OR DELETE ON deliverables FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();
