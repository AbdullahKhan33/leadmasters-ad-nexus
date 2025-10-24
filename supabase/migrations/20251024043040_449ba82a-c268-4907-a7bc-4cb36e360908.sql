-- Insert mock workflow sequences (5 sequences)
-- Sequence 1: No Reply Follow-up Sequence
INSERT INTO workflow_sequences (user_id, name, description, icon, color, is_active)
SELECT 
  auth.uid(),
  'No Reply Follow-up Sequence',
  'Automated 3-day follow-up for non-responsive leads',
  'MessageSquareReply',
  '#8B5CF6',
  true
FROM auth.users
WHERE id = auth.uid()
LIMIT 1;

-- Sequence 2: Qualified Lead → Sales Routing
INSERT INTO workflow_sequences (user_id, name, description, icon, color, is_active)
SELECT 
  auth.uid(),
  'Qualified Lead → Sales Routing',
  'High-priority routing for qualified prospects',
  'UserCheck',
  '#10B981',
  true
FROM auth.users
WHERE id = auth.uid()
LIMIT 1;

-- Sequence 3: 7-Day Nurturing Sequence
INSERT INTO workflow_sequences (user_id, name, description, icon, color, is_active)
SELECT 
  auth.uid(),
  '7-Day Nurturing Sequence',
  'Week-long educational journey to build trust',
  'GraduationCap',
  '#F59E0B',
  true
FROM auth.users
WHERE id = auth.uid()
LIMIT 1;

-- Sequence 4: Long-Term Nurturing Pool
INSERT INTO workflow_sequences (user_id, name, description, icon, color, is_active)
SELECT 
  auth.uid(),
  'Long-Term Nurturing Pool',
  'Stay top-of-mind with periodic touchpoints',
  'Clock',
  '#6366F1',
  true
FROM auth.users
WHERE id = auth.uid()
LIMIT 1;

-- Sequence 5: VIP Fast Track
INSERT INTO workflow_sequences (user_id, name, description, icon, color, is_active)
SELECT 
  auth.uid(),
  'VIP Fast Track',
  'Priority handling for high-value prospects',
  'Crown',
  '#EC4899',
  true
FROM auth.users
WHERE id = auth.uid()
LIMIT 1;

-- Insert workflow sequence steps
-- Steps for "No Reply Follow-up Sequence"
WITH seq AS (
  SELECT id FROM workflow_sequences WHERE name = 'No Reply Follow-up Sequence' AND user_id = auth.uid() LIMIT 1
),
t1 AS (SELECT id FROM campaign_templates WHERE name = 'No Reply Day 1 - Initial Follow-up' AND user_id = auth.uid() LIMIT 1),
t2 AS (SELECT id FROM campaign_templates WHERE name = 'No Reply Day 2 - Gentle Reminder' AND user_id = auth.uid() LIMIT 1),
t3 AS (SELECT id FROM campaign_templates WHERE name = 'No Reply Day 3 - Final Check-in' AND user_id = auth.uid() LIMIT 1)
INSERT INTO workflow_sequence_steps (sequence_id, template_id, step_order, delay_hours, channel)
SELECT 
  (SELECT id FROM seq), 
  (SELECT id FROM t1), 
  1, 24, 'whatsapp'
WHERE EXISTS (SELECT 1 FROM seq) AND EXISTS (SELECT 1 FROM t1)
UNION ALL
SELECT 
  (SELECT id FROM seq), 
  (SELECT id FROM t2), 
  2, 48, 'whatsapp'
WHERE EXISTS (SELECT 1 FROM seq) AND EXISTS (SELECT 1 FROM t2)
UNION ALL
SELECT 
  (SELECT id FROM seq), 
  (SELECT id FROM t3), 
  3, 72, 'email'
WHERE EXISTS (SELECT 1 FROM seq) AND EXISTS (SELECT 1 FROM t3);

-- Steps for "Qualified Lead → Sales Routing"
WITH seq AS (
  SELECT id FROM workflow_sequences WHERE name = 'Qualified Lead → Sales Routing' AND user_id = auth.uid() LIMIT 1
),
t1 AS (SELECT id FROM campaign_templates WHERE name = 'Qualified - Confirmation Message' AND user_id = auth.uid() LIMIT 1),
t2 AS (SELECT id FROM campaign_templates WHERE name = 'Qualified - Meeting Request' AND user_id = auth.uid() LIMIT 1),
t3 AS (SELECT id FROM campaign_templates WHERE name = 'Qualified - Calendar Invite Sent' AND user_id = auth.uid() LIMIT 1),
t4 AS (SELECT id FROM campaign_templates WHERE name = 'Qualified - Pre-Meeting Reminder' AND user_id = auth.uid() LIMIT 1)
INSERT INTO workflow_sequence_steps (sequence_id, template_id, step_order, delay_hours, channel)
SELECT 
  (SELECT id FROM seq), 
  (SELECT id FROM t1), 
  1, 0, 'whatsapp'
WHERE EXISTS (SELECT 1 FROM seq) AND EXISTS (SELECT 1 FROM t1)
UNION ALL
SELECT 
  (SELECT id FROM seq), 
  (SELECT id FROM t2), 
  2, 2, 'email'
WHERE EXISTS (SELECT 1 FROM seq) AND EXISTS (SELECT 1 FROM t2)
UNION ALL
SELECT 
  (SELECT id FROM seq), 
  (SELECT id FROM t3), 
  3, 24, 'email'
WHERE EXISTS (SELECT 1 FROM seq) AND EXISTS (SELECT 1 FROM t3)
UNION ALL
SELECT 
  (SELECT id FROM seq), 
  (SELECT id FROM t4), 
  4, 48, 'whatsapp'
WHERE EXISTS (SELECT 1 FROM seq) AND EXISTS (SELECT 1 FROM t4);

-- Steps for "7-Day Nurturing Sequence"
WITH seq AS (
  SELECT id FROM workflow_sequences WHERE name = '7-Day Nurturing Sequence' AND user_id = auth.uid() LIMIT 1
),
t1 AS (SELECT id FROM campaign_templates WHERE name = 'Nurturing Day 1 - Welcome' AND user_id = auth.uid() LIMIT 1),
t2 AS (SELECT id FROM campaign_templates WHERE name = 'Nurturing Day 2 - Problem ID' AND user_id = auth.uid() LIMIT 1),
t3 AS (SELECT id FROM campaign_templates WHERE name = 'Nurturing Day 3 - Solution Overview' AND user_id = auth.uid() LIMIT 1),
t4 AS (SELECT id FROM campaign_templates WHERE name = 'Nurturing Day 4 - Case Study' AND user_id = auth.uid() LIMIT 1),
t5 AS (SELECT id FROM campaign_templates WHERE name = 'Nurturing Day 5 - Social Proof' AND user_id = auth.uid() LIMIT 1),
t6 AS (SELECT id FROM campaign_templates WHERE name = 'Nurturing Day 6 - Demo Invitation' AND user_id = auth.uid() LIMIT 1),
t7 AS (SELECT id FROM campaign_templates WHERE name = 'Nurturing Day 7 - Call to Action' AND user_id = auth.uid() LIMIT 1)
INSERT INTO workflow_sequence_steps (sequence_id, template_id, step_order, delay_hours, channel)
SELECT 
  (SELECT id FROM seq), 
  (SELECT id FROM t1), 
  1, 0, 'email'
WHERE EXISTS (SELECT 1 FROM seq) AND EXISTS (SELECT 1 FROM t1)
UNION ALL
SELECT 
  (SELECT id FROM seq), 
  (SELECT id FROM t2), 
  2, 24, 'whatsapp'
WHERE EXISTS (SELECT 1 FROM seq) AND EXISTS (SELECT 1 FROM t2)
UNION ALL
SELECT 
  (SELECT id FROM seq), 
  (SELECT id FROM t3), 
  3, 48, 'email'
WHERE EXISTS (SELECT 1 FROM seq) AND EXISTS (SELECT 1 FROM t3)
UNION ALL
SELECT 
  (SELECT id FROM seq), 
  (SELECT id FROM t4), 
  4, 72, 'email'
WHERE EXISTS (SELECT 1 FROM seq) AND EXISTS (SELECT 1 FROM t4)
UNION ALL
SELECT 
  (SELECT id FROM seq), 
  (SELECT id FROM t5), 
  5, 96, 'whatsapp'
WHERE EXISTS (SELECT 1 FROM seq) AND EXISTS (SELECT 1 FROM t5)
UNION ALL
SELECT 
  (SELECT id FROM seq), 
  (SELECT id FROM t6), 
  6, 120, 'email'
WHERE EXISTS (SELECT 1 FROM seq) AND EXISTS (SELECT 1 FROM t6)
UNION ALL
SELECT 
  (SELECT id FROM seq), 
  (SELECT id FROM t7), 
  7, 144, 'whatsapp'
WHERE EXISTS (SELECT 1 FROM seq) AND EXISTS (SELECT 1 FROM t7);

-- Steps for "Long-Term Nurturing Pool"
WITH seq AS (
  SELECT id FROM workflow_sequences WHERE name = 'Long-Term Nurturing Pool' AND user_id = auth.uid() LIMIT 1
),
t1 AS (SELECT id FROM campaign_templates WHERE name = 'Long-term - Monthly Newsletter' AND user_id = auth.uid() LIMIT 1),
t2 AS (SELECT id FROM campaign_templates WHERE name = 'Long-term - Quarterly Insights' AND user_id = auth.uid() LIMIT 1),
t3 AS (SELECT id FROM campaign_templates WHERE name = 'Long-term - Product Update' AND user_id = auth.uid() LIMIT 1),
t4 AS (SELECT id FROM campaign_templates WHERE name = 'Long-term - Re-engagement' AND user_id = auth.uid() LIMIT 1),
t5 AS (SELECT id FROM campaign_templates WHERE name = 'Long-term - Win-back Offer' AND user_id = auth.uid() LIMIT 1)
INSERT INTO workflow_sequence_steps (sequence_id, template_id, step_order, delay_hours, channel)
SELECT 
  (SELECT id FROM seq), 
  (SELECT id FROM t1), 
  1, 0, 'email'
WHERE EXISTS (SELECT 1 FROM seq) AND EXISTS (SELECT 1 FROM t1)
UNION ALL
SELECT 
  (SELECT id FROM seq), 
  (SELECT id FROM t2), 
  2, 720, 'email'
WHERE EXISTS (SELECT 1 FROM seq) AND EXISTS (SELECT 1 FROM t2)
UNION ALL
SELECT 
  (SELECT id FROM seq), 
  (SELECT id FROM t3), 
  3, 1440, 'whatsapp'
WHERE EXISTS (SELECT 1 FROM seq) AND EXISTS (SELECT 1 FROM t3)
UNION ALL
SELECT 
  (SELECT id FROM seq), 
  (SELECT id FROM t4), 
  4, 2160, 'email'
WHERE EXISTS (SELECT 1 FROM seq) AND EXISTS (SELECT 1 FROM t4)
UNION ALL
SELECT 
  (SELECT id FROM seq), 
  (SELECT id FROM t5), 
  5, 2880, 'email'
WHERE EXISTS (SELECT 1 FROM seq) AND EXISTS (SELECT 1 FROM t5);

-- Steps for "VIP Fast Track"
WITH seq AS (
  SELECT id FROM workflow_sequences WHERE name = 'VIP Fast Track' AND user_id = auth.uid() LIMIT 1
),
t1 AS (SELECT id FROM campaign_templates WHERE name = 'VIP - Immediate Response' AND user_id = auth.uid() LIMIT 1),
t2 AS (SELECT id FROM campaign_templates WHERE name = 'VIP - Value Proposition' AND user_id = auth.uid() LIMIT 1),
t3 AS (SELECT id FROM campaign_templates WHERE name = 'VIP - Meeting Booking' AND user_id = auth.uid() LIMIT 1)
INSERT INTO workflow_sequence_steps (sequence_id, template_id, step_order, delay_hours, channel)
SELECT 
  (SELECT id FROM seq), 
  (SELECT id FROM t1), 
  1, 0, 'whatsapp'
WHERE EXISTS (SELECT 1 FROM seq) AND EXISTS (SELECT 1 FROM t1)
UNION ALL
SELECT 
  (SELECT id FROM seq), 
  (SELECT id FROM t2), 
  2, 2, 'email'
WHERE EXISTS (SELECT 1 FROM seq) AND EXISTS (SELECT 1 FROM t2)
UNION ALL
SELECT 
  (SELECT id FROM seq), 
  (SELECT id FROM t3), 
  3, 24, 'whatsapp'
WHERE EXISTS (SELECT 1 FROM seq) AND EXISTS (SELECT 1 FROM t3);