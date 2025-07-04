
-- =============================================================================
-- DATABASE VIEWS FOR ANALYTICS
-- =============================================================================

-- Active resource allocation overview
CREATE OR REPLACE VIEW v_resource_allocation AS
SELECT 
    r.id,
    r.employee_id,
    r.name,
    r.email,
    r.role,
    r.level,
    r.status,
    r.shadow_progress,
    r.shadow_status,
    d.name as department_name,
    p.name as current_project,
    pa.allocation_percentage,
    pa.start_date as allocation_start,
    pa.end_date as allocation_end,
    pa.role_in_project,
    pa.utilization_percentage
FROM resources r
LEFT JOIN departments d ON r.department_id = d.id
LEFT JOIN project_allocations pa ON r.id = pa.resource_id AND pa.is_active = TRUE
LEFT JOIN projects p ON pa.project_id = p.id AND p.is_active = TRUE
WHERE r.is_active = TRUE;

-- Project health dashboard view
CREATE OR REPLACE VIEW v_project_health AS
SELECT 
    p.id,
    p.name,
    p.status,
    p.health_score,
    p.health_status,
    p.delivery_risk,
    p.escalation_count,
    p.progress_percentage,
    p.budget,
    p.actual_cost,
    p.revenue,
    c.name as client_name,
    pm.name as manager_name,
    tl.name as team_lead_name,
    d.name as department_name,
    COUNT(DISTINCT pa.resource_id) as allocated_resources,
    COUNT(DISTINCT del.id) as total_deliverables,
    COUNT(DISTINCT CASE WHEN del.status = 'Completed' THEN del.id END) as completed_deliverables,
    COUNT(DISTINCT CASE WHEN del.status = 'Delayed' THEN del.id END) as delayed_deliverables,
    AVG(em.code_quality_score) as avg_code_quality,
    AVG(qm.automation_coverage) as avg_test_coverage,
    SUM(te.hours_worked) as total_hours_logged,
    ft.budget_allocated,
    ft.budget_utilized,
    ft.burn_rate
FROM projects p
LEFT JOIN clients c ON p.client_id = c.id
LEFT JOIN resources pm ON p.manager_id = pm.id
LEFT JOIN resources tl ON p.team_lead_id = tl.id
LEFT JOIN departments d ON pm.department_id = d.id
LEFT JOIN project_allocations pa ON p.id = pa.project_id AND pa.is_active = TRUE
LEFT JOIN deliverables del ON p.id = del.project_id
LEFT JOIN engineering_metrics em ON p.id = em.project_id
LEFT JOIN qa_metrics qm ON p.id = qm.project_id
LEFT JOIN time_entries te ON p.id = te.project_id
LEFT JOIN financial_tracking ft ON p.id = ft.project_id
WHERE p.is_active = TRUE
GROUP BY p.id, c.name, pm.name, tl.name, d.name, ft.budget_allocated, ft.budget_utilized, ft.burn_rate;

-- Department performance overview
CREATE OR REPLACE VIEW v_department_performance AS
SELECT 
    d.id,
    d.name as department_name,
    d.budget_allocated,
    d.budget_utilized,
    d.burn_rate,
    d.health_score as dept_health_score,
    COUNT(DISTINCT r.id) as total_resources,
    COUNT(DISTINCT CASE WHEN r.status = 'Billable' THEN r.id END) as billable_resources,
    COUNT(DISTINCT CASE WHEN r.status = 'Benched' THEN r.id END) as benched_resources,
    COUNT(DISTINCT CASE WHEN r.status = 'Shadow' THEN r.id END) as shadow_resources,
    COUNT(DISTINCT p.id) as active_projects,
    AVG(p.health_score) as avg_project_health,
    SUM(ft.revenue_generated) as total_revenue,
    SUM(ft.resource_cost) as total_resource_cost,
    ROUND(
        COUNT(CASE WHEN r.status = 'Billable' THEN 1 END)::numeric / 
        NULLIF(COUNT(r.id), 0) * 100, 2
    ) as utilization_percentage
FROM departments d
LEFT JOIN resources r ON d.id = r.department_id AND r.is_active = TRUE
LEFT JOIN projects p ON r.id = p.manager_id AND p.is_active = TRUE
LEFT JOIN financial_tracking ft ON d.id = ft.department_id
GROUP BY d.id, d.name, d.budget_allocated, d.budget_utilized, d.burn_rate, d.health_score;

-- KPI Summary View
CREATE OR REPLACE VIEW v_kpi_summary AS
SELECT 
    (SELECT COUNT(*) FROM projects WHERE is_active = TRUE) as total_projects,
    (SELECT COUNT(*) FROM projects WHERE status = 'Active' OR status = 'In Progress') as active_projects,
    (SELECT COUNT(*) FROM projects WHERE status = 'Completed') as completed_projects,
    (SELECT COUNT(*) FROM resources WHERE is_active = TRUE) as total_resources,
    (SELECT COUNT(*) FROM resources WHERE status = 'Billable') as billable_resources,
    (SELECT COUNT(*) FROM resources WHERE status = 'Benched') as benched_resources,
    (SELECT AVG(health_score) FROM projects WHERE is_active = TRUE) as avg_project_health,
    (SELECT COUNT(*) FROM escalations WHERE status = 'Open') as open_escalations,
    (SELECT COUNT(*) FROM deliverables WHERE status = 'Delayed') as delayed_deliverables,
    (SELECT AVG(code_quality_score) FROM engineering_metrics WHERE metric_date >= CURRENT_DATE - INTERVAL '30 days') as avg_code_quality,
    (SELECT AVG(automation_coverage) FROM qa_metrics WHERE metric_date >= CURRENT_DATE - INTERVAL '30 days') as avg_automation_coverage;
