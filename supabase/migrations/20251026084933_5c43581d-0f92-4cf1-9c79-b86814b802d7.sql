-- Add columns to workflow_sequence_steps to support branching
ALTER TABLE workflow_sequence_steps 
ADD COLUMN IF NOT EXISTS parent_step_id uuid REFERENCES workflow_sequence_steps(id) ON DELETE CASCADE,
ADD COLUMN IF NOT EXISTS branch_path text CHECK (branch_path IN ('yes', 'no', 'main'));

-- Add index for better query performance
CREATE INDEX IF NOT EXISTS idx_workflow_sequence_steps_parent 
ON workflow_sequence_steps(parent_step_id);

-- Add comment for clarity
COMMENT ON COLUMN workflow_sequence_steps.parent_step_id IS 'References the parent branch node if this step is part of a conditional branch';
COMMENT ON COLUMN workflow_sequence_steps.branch_path IS 'Indicates which branch path this step belongs to: yes, no, or main (for non-branching steps)';
