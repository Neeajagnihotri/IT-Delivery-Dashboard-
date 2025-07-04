
-- =============================================================================
-- TRIGGER FUNCTIONS
-- =============================================================================

-- Function to update updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Function for audit logging
CREATE OR REPLACE FUNCTION audit_trigger_function()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'DELETE' THEN
        INSERT INTO audit_logs (table_name, record_id, action, old_values, changed_at)
        VALUES (TG_TABLE_NAME, OLD.id, 'DELETE', row_to_json(OLD), CURRENT_TIMESTAMP);
        RETURN OLD;
    ELSIF TG_OP = 'UPDATE' THEN
        INSERT INTO audit_logs (table_name, record_id, action, old_values, new_values, changed_at)
        VALUES (TG_TABLE_NAME, NEW.id, 'UPDATE', row_to_json(OLD), row_to_json(NEW), CURRENT_TIMESTAMP);
        RETURN NEW;
    ELSIF TG_OP = 'INSERT' THEN
        INSERT INTO audit_logs (table_name, record_id, action, new_values, changed_at)
        VALUES (TG_TABLE_NAME, NEW.id, 'INSERT', row_to_json(NEW), CURRENT_TIMESTAMP);
        RETURN NEW;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Function to auto-update shadow status based on progress
CREATE OR REPLACE FUNCTION update_shadow_status()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.shadow_progress != OLD.shadow_progress THEN
        IF NEW.shadow_progress >= 90 THEN
            NEW.shadow_status = 'Completed';
        ELSIF NEW.shadow_progress >= 70 THEN
            NEW.shadow_status = 'Transition';
        ELSIF NEW.shadow_progress >= 30 THEN
            NEW.shadow_status = 'Learning';
        ELSIF NEW.shadow_progress > 0 THEN
            NEW.shadow_status = 'Observation';
        END IF;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Fixed Function to update project health score
CREATE OR REPLACE FUNCTION update_project_health()
RETURNS TRIGGER AS $$
DECLARE
    target_project_id INTEGER;
    health_score INTEGER;
    deliverable_score INTEGER;
    budget_score INTEGER;
    timeline_score INTEGER;
BEGIN
    -- Get project ID from context
    IF TG_TABLE_NAME = 'deliverables' THEN
        target_project_id = COALESCE(NEW.project_id, OLD.project_id);
    ELSIF TG_TABLE_NAME = 'financial_tracking' THEN
        target_project_id = COALESCE(NEW.project_id, OLD.project_id);
    ELSIF TG_TABLE_NAME = 'escalations' THEN
        target_project_id = COALESCE(NEW.project_id, OLD.project_id);
    END IF;

    -- Calculate deliverable score
    SELECT ROUND(
        (COUNT(CASE WHEN status = 'Completed' THEN 1 END)::DECIMAL / 
         NULLIF(COUNT(*), 0)) * 100
    ) INTO deliverable_score 
    FROM deliverables WHERE project_id = target_project_id;

    -- Calculate budget score
    SELECT CASE 
        WHEN budget_allocated > 0 THEN 
            GREATEST(0, 100 - ((budget_utilized / budget_allocated) * 100))
        ELSE 100 
    END INTO budget_score
    FROM financial_tracking WHERE project_id = target_project_id
    ORDER BY period_end DESC LIMIT 1;

    -- Calculate overall health score
    health_score = COALESCE(
        (COALESCE(deliverable_score, 85) + COALESCE(budget_score, 85)) / 2, 
        85
    );

    -- Update project health
    UPDATE projects SET 
        health_score = health_score,
        health_status = CASE 
            WHEN health_score >= 80 THEN 'Green'
            WHEN health_score >= 60 THEN 'Yellow'
            ELSE 'Red'
        END,
        escalation_count = (
            SELECT COUNT(*) FROM escalations 
            WHERE project_id = target_project_id 
            AND status = 'Open'
        )
    WHERE id = target_project_id;

    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;
