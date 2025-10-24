-- Insert seed data for AI Sales Automation workflows, sequences, and templates
-- Using correct workflow types: no_reply, qualified_nurturing, long_term

-- First, let's create workflow sequences (reusable template sequences)
INSERT INTO workflow_sequences (id, user_id, name, description, icon, color, is_active) VALUES
(gen_random_uuid(), (SELECT id FROM auth.users LIMIT 1), 'No Reply Follow-up Sequence', 'Automated follow-up for leads who haven''t responded', 'MessageCircle', '#8B5CF6', true),
(gen_random_uuid(), (SELECT id FROM auth.users LIMIT 1), 'Qualified Lead Routing', 'Route qualified leads to sales agents', 'UserCheck', '#EC4899', true),
(gen_random_uuid(), (SELECT id FROM auth.users LIMIT 1), '7-Day Nurturing Sequence', 'Week-long engagement sequence', 'Calendar', '#3B82F6', true),
(gen_random_uuid(), (SELECT id FROM auth.users LIMIT 1), 'Long-Term Nurturing Pool', 'Long-term engagement for cold leads', 'RefreshCw', '#10B981', true);

-- Create campaign templates for WhatsApp messages
INSERT INTO campaign_templates (user_id, name, type, content, subject, is_active) VALUES
-- No Reply Follow-up templates
((SELECT id FROM auth.users LIMIT 1), 'Initial Follow-up (Day 1)', 'whatsapp', 
'Hi {{name}}, I noticed you showed interest in {{property_type}}. I wanted to follow up and see if you have any questions. I''d be happy to share more details!', 
NULL, true),

((SELECT id FROM auth.users LIMIT 1), 'Second Follow-up (Day 2)', 'whatsapp', 
'Hello {{name}}, just checking in again about the {{property_type}} you were interested in. We have some great options available. Would you like to schedule a viewing?', 
NULL, true),

((SELECT id FROM auth.users LIMIT 1), 'Final Follow-up (Day 3)', 'whatsapp', 
'Hi {{name}}, this is my last follow-up regarding the {{property_type}}. If you''re still interested, I''m here to help. Otherwise, feel free to reach out anytime in the future!', 
NULL, true),

-- Qualification templates
((SELECT id FROM auth.users LIMIT 1), 'Qualification Question', 'whatsapp', 
'Hi {{name}}, thanks for your interest! To help you better, could you tell me: 1) Your budget range, 2) Preferred location, 3) When are you looking to move? This will help me find the perfect property for you.', 
NULL, true),

-- 7-Day Nurturing templates
((SELECT id FROM auth.users LIMIT 1), 'Day 1 - Introduction', 'whatsapp', 
'Welcome {{name}}! I''m excited to help you find your dream {{property_type}}. Over the next week, I''ll share some great options and answer any questions you have.', 
NULL, true),

((SELECT id FROM auth.users LIMIT 1), 'Day 3 - Property Showcase', 'whatsapp', 
'Hi {{name}}, I wanted to share some {{property_type}} listings that match your criteria. Here are 3 options I think you''ll love. Would you like more details on any of them?', 
NULL, true),

((SELECT id FROM auth.users LIMIT 1), 'Day 5 - Tour Invitation', 'whatsapp', 
'Hello {{name}}, how about scheduling a property tour this weekend? I can show you some great {{property_type}} options in person. What day works best for you?', 
NULL, true),

((SELECT id FROM auth.users LIMIT 1), 'Day 7 - Interest Check', 'whatsapp', 
'Hi {{name}}, it''s been a week since we started looking for properties. Have any of the options I shared caught your interest? I''m here to answer any questions!', 
NULL, true),

-- Long-term nurturing
((SELECT id FROM auth.users LIMIT 1), 'Bi-weekly Check-in', 'whatsapp', 
'Hi {{name}}, just wanted to check in and see if you''re still looking for a {{property_type}}. We have some new listings that might interest you. Let me know if you''d like to see them!', 
NULL, true),

-- Email templates
((SELECT id FROM auth.users LIMIT 1), 'Welcome Email', 'email', 
'<h1>Welcome, {{name}}!</h1><p>Thank you for your interest in finding the perfect property. We''re here to help you every step of the way.</p><p>Our team has received your inquiry and will get back to you shortly with personalized recommendations.</p>', 
'Welcome to Your Property Search!', true),

((SELECT id FROM auth.users LIMIT 1), 'Property Match Email', 'email', 
'<h1>Properties Matching Your Criteria</h1><p>Hi {{name}},</p><p>We''ve found some great {{property_type}} options that match what you''re looking for. Check them out and let us know which ones you''d like to learn more about!</p>', 
'Great Properties Just For You', true);

-- Link templates to sequences via workflow_sequence_steps
DO $$
DECLARE
  followup_seq_id uuid;
  routing_seq_id uuid;
  nurture_seq_id uuid;
  longterm_seq_id uuid;
  
  template_id_1 uuid;
  template_id_2 uuid;
  template_id_3 uuid;
  template_id_4 uuid;
  template_id_5 uuid;
  template_id_6 uuid;
  template_id_7 uuid;
  template_id_8 uuid;
  template_id_9 uuid;
BEGIN
  -- Get sequence IDs
  SELECT id INTO followup_seq_id FROM workflow_sequences WHERE name = 'No Reply Follow-up Sequence';
  SELECT id INTO routing_seq_id FROM workflow_sequences WHERE name = 'Qualified Lead Routing';
  SELECT id INTO nurture_seq_id FROM workflow_sequences WHERE name = '7-Day Nurturing Sequence';
  SELECT id INTO longterm_seq_id FROM workflow_sequences WHERE name = 'Long-Term Nurturing Pool';
  
  -- Get template IDs
  SELECT id INTO template_id_1 FROM campaign_templates WHERE name = 'Initial Follow-up (Day 1)';
  SELECT id INTO template_id_2 FROM campaign_templates WHERE name = 'Second Follow-up (Day 2)';
  SELECT id INTO template_id_3 FROM campaign_templates WHERE name = 'Final Follow-up (Day 3)';
  SELECT id INTO template_id_4 FROM campaign_templates WHERE name = 'Qualification Question';
  SELECT id INTO template_id_5 FROM campaign_templates WHERE name = 'Day 1 - Introduction';
  SELECT id INTO template_id_6 FROM campaign_templates WHERE name = 'Day 3 - Property Showcase';
  SELECT id INTO template_id_7 FROM campaign_templates WHERE name = 'Day 5 - Tour Invitation';
  SELECT id INTO template_id_8 FROM campaign_templates WHERE name = 'Day 7 - Interest Check';
  SELECT id INTO template_id_9 FROM campaign_templates WHERE name = 'Bi-weekly Check-in';
  
  -- Create workflow_sequence_steps for Follow-up sequence
  INSERT INTO workflow_sequence_steps (sequence_id, template_id, step_order, delay_hours, channel) VALUES
  (followup_seq_id, template_id_1, 1, 24, 'whatsapp'),   -- Day 1
  (followup_seq_id, template_id_2, 2, 48, 'whatsapp'),   -- Day 2  
  (followup_seq_id, template_id_3, 3, 72, 'whatsapp');   -- Day 3
  
  -- Create workflow_sequence_steps for Qualification routing
  INSERT INTO workflow_sequence_steps (sequence_id, template_id, step_order, delay_hours, channel) VALUES
  (routing_seq_id, template_id_4, 1, 0, 'whatsapp');     -- Immediate
  
  -- Create workflow_sequence_steps for 7-Day nurturing
  INSERT INTO workflow_sequence_steps (sequence_id, template_id, step_order, delay_hours, channel) VALUES
  (nurture_seq_id, template_id_5, 1, 0, 'whatsapp'),     -- Day 1
  (nurture_seq_id, template_id_6, 2, 72, 'whatsapp'),    -- Day 3
  (nurture_seq_id, template_id_7, 3, 120, 'whatsapp'),   -- Day 5
  (nurture_seq_id, template_id_8, 4, 168, 'whatsapp');   -- Day 7
  
  -- Create workflow_sequence_steps for Long-term nurturing
  INSERT INTO workflow_sequence_steps (sequence_id, template_id, step_order, delay_hours, channel) VALUES
  (longterm_seq_id, template_id_9, 1, 336, 'whatsapp');  -- Every 14 days
END $$;

-- Now create automation_workflows linked to these sequences
-- IMPORTANT: Using correct types: no_reply, qualified_nurturing, long_term
DO $$
DECLARE
  followup_seq_id uuid;
  routing_seq_id uuid;
  nurture_seq_id uuid;
  longterm_seq_id uuid;
  user_id_val uuid;
BEGIN
  -- Get user ID
  SELECT id INTO user_id_val FROM auth.users LIMIT 1;
  
  -- Get sequence IDs
  SELECT id INTO followup_seq_id FROM workflow_sequences WHERE name = 'No Reply Follow-up Sequence';
  SELECT id INTO routing_seq_id FROM workflow_sequences WHERE name = 'Qualified Lead Routing';
  SELECT id INTO nurture_seq_id FROM workflow_sequences WHERE name = '7-Day Nurturing Sequence';
  SELECT id INTO longterm_seq_id FROM workflow_sequences WHERE name = 'Long-Term Nurturing Pool';
  
  -- Insert automation workflows with correct type values
  INSERT INTO automation_workflows (user_id, name, description, type, workflow_sequence_id, trigger_config, actions, is_active) VALUES
  (user_id_val, 
   'No Reply Follow-up Sequence', 
   'Automatically follow up with leads who haven''t responded within 24-72 hours',
   'no_reply',
   followup_seq_id,
   '{"status": "New", "no_response_hours": 24}'::jsonb,
   '{"send_message": true, "update_status": true}'::jsonb,
   true),
   
  (user_id_val,
   'Qualified Lead → Sales Routing',
   'Route AI-qualified leads to available sales agents using round-robin assignment',
   'qualified_nurturing',
   routing_seq_id,
   '{"ai_qualification_status": "qualified"}'::jsonb,
   '{"assign_agent": true, "notify_agent": true}'::jsonb,
   true),
   
  (user_id_val,
   '7-Day Nurturing Sequence',
   'Engage interested leads over a 7-day period with property showcases and tour invitations',
   'qualified_nurturing',
   nurture_seq_id,
   '{"workflow_stage": "interested"}'::jsonb,
   '{"send_message": true, "track_engagement": true}'::jsonb,
   true),
   
  (user_id_val,
   'Long-Term Nurturing Pool',
   'Re-engage cold leads every 15 days with new property listings and market updates',
   'long_term',
   longterm_seq_id,
   '{"status": "Cold", "workflow_stage": "long_term"}'::jsonb,
   '{"send_message": true, "check_interest": true}'::jsonb,
   true);
END $$;