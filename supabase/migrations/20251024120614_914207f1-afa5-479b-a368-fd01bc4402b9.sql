-- Add segment relationship and launch tracking to automation_workflows
ALTER TABLE automation_workflows 
ADD COLUMN segment_id uuid REFERENCES segments(id),
ADD COLUMN launched_at timestamp with time zone,
ADD COLUMN launched_by uuid REFERENCES auth.users(id),
ADD COLUMN target_lead_count integer DEFAULT 0,
ADD COLUMN processed_lead_count integer DEFAULT 0,
ADD COLUMN workflow_status text DEFAULT 'draft' CHECK (workflow_status IN ('draft', 'active', 'paused', 'completed'));

-- Create indexes for performance
CREATE INDEX idx_workflows_segment ON automation_workflows(segment_id);
CREATE INDEX idx_workflows_status ON automation_workflows(workflow_status);

-- Add comment for documentation
COMMENT ON COLUMN automation_workflows.segment_id IS 'Links workflow to a specific segment of leads';
COMMENT ON COLUMN automation_workflows.workflow_status IS 'Status: draft (not launched), active (running), paused (stopped), completed (finished)';
COMMENT ON COLUMN automation_workflows.launched_at IS 'Timestamp when workflow was first launched';
COMMENT ON COLUMN automation_workflows.target_lead_count IS 'Total number of leads targeted by this workflow';
COMMENT ON COLUMN automation_workflows.processed_lead_count IS 'Number of leads that have been processed so far';