-- Drop the old check constraint
ALTER TABLE automation_workflows DROP CONSTRAINT IF EXISTS automation_workflows_type_check;

-- Add updated check constraint with new types
ALTER TABLE automation_workflows ADD CONSTRAINT automation_workflows_type_check 
  CHECK (type IN ('no_reply', 'qualified_nurturing', 'long_term', 'custom', 'ai_automation'));