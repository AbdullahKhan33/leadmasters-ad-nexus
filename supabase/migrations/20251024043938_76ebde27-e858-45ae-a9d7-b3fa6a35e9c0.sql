-- Insert automation workflows and link them to sequences
-- Create workflows with generated UUIDs and link to sequences

-- First, let's create a temporary table to store our workflow mappings
CREATE TEMP TABLE temp_workflow_mappings (
  workflow_name TEXT,
  workflow_key TEXT,
  workflow_id UUID DEFAULT gen_random_uuid()
);

-- Insert mappings
INSERT INTO temp_workflow_mappings (workflow_name, workflow_key)
VALUES 
  ('No Reply Follow-up Sequence', 'no-reply-workflow'),
  ('Qualified Lead → Sales Routing', 'qualified-routing-workflow'),
  ('7-Day Nurturing Sequence', 'nurturing-7day-workflow'),
  ('Long-Term Nurturing Pool', 'long-term-pool-workflow');

-- Workflow 1: No Reply Follow-up Sequence
INSERT INTO automation_workflows (user_id, name, type, description, trigger_config, actions, is_active, workflow_sequence_id)
SELECT 
  auth.uid(),
  'No Reply Follow-up Sequence',
  'follow_up',
  'Automated reminder system for non-responsive leads',
  '{"trigger_type": "no_reply", "delay_hours": 24}'::jsonb,
  '{"send_reminders": true, "max_attempts": 3}'::jsonb,
  true,
  (SELECT id FROM workflow_sequences WHERE name = 'No Reply Follow-up Sequence' AND user_id = auth.uid() LIMIT 1)
FROM auth.users
WHERE id = auth.uid()
LIMIT 1;

-- Workflow 2: Qualified Lead → Sales Routing  
INSERT INTO automation_workflows (user_id, name, type, description, trigger_config, actions, is_active, workflow_sequence_id)
SELECT 
  auth.uid(),
  'Qualified Lead → Sales Routing',
  'routing',
  'Intelligent auto-assignment for qualified prospects',
  '{"trigger_type": "qualified", "auto_assign": true}'::jsonb,
  '{"assignment_method": "round_robin", "notify_agent": true}'::jsonb,
  true,
  (SELECT id FROM workflow_sequences WHERE name = 'Qualified Lead → Sales Routing' AND user_id = auth.uid() LIMIT 1)
FROM auth.users
WHERE id = auth.uid()
LIMIT 1;

-- Workflow 3: 7-Day Nurturing Sequence
INSERT INTO automation_workflows (user_id, name, type, description, trigger_config, actions, is_active, workflow_sequence_id)
SELECT 
  auth.uid(),
  '7-Day Nurturing Sequence',
  'nurturing',
  'Progressive engagement campaign over 7 days',
  '{"trigger_type": "new_lead", "delay_hours": 0}'::jsonb,
  '{"sequence_days": 7, "progressive_engagement": true}'::jsonb,
  true,
  (SELECT id FROM workflow_sequences WHERE name = '7-Day Nurturing Sequence' AND user_id = auth.uid() LIMIT 1)
FROM auth.users
WHERE id = auth.uid()
LIMIT 1;

-- Workflow 4: Long-Term Nurturing Pool
INSERT INTO automation_workflows (user_id, name, type, description, trigger_config, actions, is_active, workflow_sequence_id)
SELECT 
  auth.uid(),
  'Long-Term Nurturing Pool',
  'nurturing',
  'Re-engagement automation for long-term leads',
  '{"trigger_type": "long_term", "check_interval_days": 15}'::jsonb,
  '{"periodic_check": true, "branch_logic": true}'::jsonb,
  true,
  (SELECT id FROM workflow_sequences WHERE name = 'Long-Term Nurturing Pool' AND user_id = auth.uid() LIMIT 1)
FROM auth.users
WHERE id = auth.uid()
LIMIT 1;