-- Create workflow_sequences table
CREATE TABLE workflow_sequences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT DEFAULT 'Workflow',
  color TEXT DEFAULT '#8B5CF6',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- RLS Policies for workflow_sequences
ALTER TABLE workflow_sequences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own sequences"
  ON workflow_sequences FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own sequences"
  ON workflow_sequences FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own sequences"
  ON workflow_sequences FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own sequences"
  ON workflow_sequences FOR DELETE
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all sequences"
  ON workflow_sequences FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Create workflow_sequence_steps table
CREATE TABLE workflow_sequence_steps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sequence_id UUID NOT NULL REFERENCES workflow_sequences(id) ON DELETE CASCADE,
  template_id UUID NOT NULL REFERENCES campaign_templates(id) ON DELETE CASCADE,
  step_order INTEGER NOT NULL,
  delay_hours INTEGER NOT NULL DEFAULT 0,
  channel TEXT NOT NULL CHECK (channel IN ('email', 'whatsapp')),
  condition JSONB DEFAULT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(sequence_id, step_order)
);

-- RLS Policies for workflow_sequence_steps
ALTER TABLE workflow_sequence_steps ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view steps of their sequences"
  ON workflow_sequence_steps FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM workflow_sequences
    WHERE workflow_sequences.id = workflow_sequence_steps.sequence_id
    AND workflow_sequences.user_id = auth.uid()
  ));

CREATE POLICY "Users can create steps for their sequences"
  ON workflow_sequence_steps FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM workflow_sequences
    WHERE workflow_sequences.id = workflow_sequence_steps.sequence_id
    AND workflow_sequences.user_id = auth.uid()
  ));

CREATE POLICY "Users can update steps of their sequences"
  ON workflow_sequence_steps FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM workflow_sequences
    WHERE workflow_sequences.id = workflow_sequence_steps.sequence_id
    AND workflow_sequences.user_id = auth.uid()
  ));

CREATE POLICY "Users can delete steps of their sequences"
  ON workflow_sequence_steps FOR DELETE
  USING (EXISTS (
    SELECT 1 FROM workflow_sequences
    WHERE workflow_sequences.id = workflow_sequence_steps.sequence_id
    AND workflow_sequences.user_id = auth.uid()
  ));

CREATE POLICY "Admins can view all steps"
  ON workflow_sequence_steps FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Update automation_workflows table
ALTER TABLE automation_workflows 
ADD COLUMN workflow_sequence_id UUID REFERENCES workflow_sequences(id) ON DELETE SET NULL;

-- Create trigger for updated_at
CREATE TRIGGER update_workflow_sequences_updated_at
  BEFORE UPDATE ON workflow_sequences
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert mock templates (22 templates)
-- No Reply Follow-up Sequence (3 templates)
INSERT INTO campaign_templates (user_id, name, type, content, subject, variables, is_active)
SELECT 
  auth.uid(),
  'No Reply Day 1 - Initial Follow-up',
  'whatsapp',
  E'Hi {{name}}! 👋\n\nI noticed you filled out our form but we haven''t connected yet.\nI''d love to understand how we can help {{company}} achieve {{goal}}.\n\nQuick question: What''s the best time for a 10-minute chat this week? 📞',
  NULL,
  '{"variables": ["name", "company", "goal"]}'::jsonb,
  true
FROM auth.users
WHERE email = (SELECT email FROM auth.users WHERE id = auth.uid())
LIMIT 1;

INSERT INTO campaign_templates (user_id, name, type, content, subject, variables, is_active)
SELECT 
  auth.uid(),
  'No Reply Day 2 - Gentle Reminder',
  'whatsapp',
  E'Hi {{name}}, just circling back! 🔄\n\nI know schedules get busy. I wanted to make sure you got my message about helping {{company}} with {{solution}}.\n\nEven a 5-minute call would be valuable. How about tomorrow? 💪',
  NULL,
  '{"variables": ["name", "company", "solution"]}'::jsonb,
  true
FROM auth.users
WHERE email = (SELECT email FROM auth.users WHERE id = auth.uid())
LIMIT 1;

INSERT INTO campaign_templates (user_id, name, type, content, subject, variables, is_active)
SELECT 
  auth.uid(),
  'No Reply Day 3 - Final Check-in',
  'email',
  E'Hi {{name}},\n\nI''ve tried reaching you a couple of times about {{topic}}. I don''t want to be a bother, but I genuinely believe we could help {{company}} achieve {{benefit}}.\n\nIf now isn''t the right time, that''s totally fine! Just let me know and I''ll check back in a few months.\n\nOtherwise, here''s my calendar: {{calendar_link}}\n\nBest,\n{{your_name}}',
  'Last Check-in - {{company}}',
  '{"variables": ["name", "topic", "company", "benefit", "calendar_link", "your_name"]}'::jsonb,
  true
FROM auth.users
WHERE email = (SELECT email FROM auth.users WHERE id = auth.uid())
LIMIT 1;

-- Qualified Lead → Sales Routing (4 templates)
INSERT INTO campaign_templates (user_id, name, type, content, subject, variables, is_active)
SELECT 
  auth.uid(),
  'Qualified - Confirmation Message',
  'whatsapp',
  E'Great news, {{name}}! ✅\n\nYou''ve been qualified for our premium service. Based on your needs at {{company}}, I believe we can deliver {{specific_value}}.\n\nOur sales team will reach out within 2 hours to schedule a detailed discussion.\n\nExcited to work with you! 🚀',
  NULL,
  '{"variables": ["name", "company", "specific_value"]}'::jsonb,
  true
FROM auth.users
WHERE email = (SELECT email FROM auth.users WHERE id = auth.uid())
LIMIT 1;

INSERT INTO campaign_templates (user_id, name, type, content, subject, variables, is_active)
SELECT 
  auth.uid(),
  'Qualified - Meeting Request',
  'email',
  E'Hi {{name}},\n\nThank you for your interest in our services! Based on our initial conversation, I''d love to schedule a 30-minute discovery call to:\n\n• Understand your specific needs at {{company}}\n• Show you how we''ve helped similar businesses achieve {{outcome}}\n• Discuss a custom solution tailored to your goals\n\nPlease select a time that works best for you:\n{{calendar_link}}\n\nLooking forward to speaking with you!\n\nBest regards,\n{{your_name}}\n{{your_title}}',
  'Let''s Schedule Your Discovery Call - {{company}}',
  '{"variables": ["name", "company", "outcome", "calendar_link", "your_name", "your_title"]}'::jsonb,
  true
FROM auth.users
WHERE email = (SELECT email FROM auth.users WHERE id = auth.uid())
LIMIT 1;

INSERT INTO campaign_templates (user_id, name, type, content, subject, variables, is_active)
SELECT 
  auth.uid(),
  'Qualified - Calendar Invite Sent',
  'email',
  E'Hi {{name}},\n\nPerfect! I''ve sent you a calendar invite for our meeting on {{meeting_date}} at {{meeting_time}}.\n\nTo make the most of our time together, please review:\n• {{resource_1}}\n• {{resource_2}}\n\nIf you have any questions before our call, feel free to reply to this email.\n\nSee you soon!\n\n{{your_name}}',
  'Meeting Confirmed: {{meeting_date}} at {{meeting_time}}',
  '{"variables": ["name", "meeting_date", "meeting_time", "resource_1", "resource_2", "your_name"]}'::jsonb,
  true
FROM auth.users
WHERE email = (SELECT email FROM auth.users WHERE id = auth.uid())
LIMIT 1;

INSERT INTO campaign_templates (user_id, name, type, content, subject, variables, is_active)
SELECT 
  auth.uid(),
  'Qualified - Pre-Meeting Reminder',
  'whatsapp',
  E'Hi {{name}}! 👋\n\nJust a friendly reminder about our meeting tomorrow at {{meeting_time}}.\n\nQuick prep checklist:\n✅ Have your current {{data_point}} ready\n✅ Think about your top 3 goals\n✅ Any questions you want answered\n\nLooking forward to it! 💼',
  NULL,
  '{"variables": ["name", "meeting_time", "data_point"]}'::jsonb,
  true
FROM auth.users
WHERE email = (SELECT email FROM auth.users WHERE id = auth.uid())
LIMIT 1;

-- 7-Day Nurturing Sequence (7 templates)
INSERT INTO campaign_templates (user_id, name, type, content, subject, variables, is_active)
SELECT 
  auth.uid(),
  'Nurturing Day 1 - Welcome',
  'email',
  E'Hi {{name}},\n\nWelcome! 🎉\n\nI''m {{your_name}} from {{your_company}}. We''re thrilled to have you here.\n\nOver the next 7 days, I''ll share valuable insights on how {{company}} can benefit from {{solution_category}}.\n\nToday''s insight: {{key_insight}}\n\nStay tuned for tomorrow''s email!\n\nBest,\n{{your_name}}',
  'Welcome to {{your_company}}! 🎉',
  '{"variables": ["name", "your_name", "your_company", "company", "solution_category", "key_insight"]}'::jsonb,
  true
FROM auth.users
WHERE email = (SELECT email FROM auth.users WHERE id = auth.uid())
LIMIT 1;

INSERT INTO campaign_templates (user_id, name, type, content, subject, variables, is_active)
SELECT 
  auth.uid(),
  'Nurturing Day 2 - Problem ID',
  'whatsapp',
  E'Hi {{name}}! 💡\n\nDay 2: Understanding the Challenge\n\nMost businesses in {{industry}} face {{common_problem}}. Does this sound familiar?\n\nThe good news? There''s a proven solution.\n\nI''ll share more tomorrow! 📈',
  NULL,
  '{"variables": ["name", "industry", "common_problem"]}'::jsonb,
  true
FROM auth.users
WHERE email = (SELECT email FROM auth.users WHERE id = auth.uid())
LIMIT 1;

INSERT INTO campaign_templates (user_id, name, type, content, subject, variables, is_active)
SELECT 
  auth.uid(),
  'Nurturing Day 3 - Solution Overview',
  'email',
  E'Hi {{name}},\n\nDay 3: The Solution\n\nYesterday we talked about {{problem}}. Today, let me show you how {{solution_name}} solves it.\n\nKey features:\n• {{feature_1}}\n• {{feature_2}}\n• {{feature_3}}\n\nThis is exactly how {{similar_company}} increased their {{metric}} by {{percentage}}.\n\nWant to see how it works for {{company}}?\n\nBest,\n{{your_name}}',
  'Here''s How We Solve {{problem}}',
  '{"variables": ["name", "problem", "solution_name", "feature_1", "feature_2", "feature_3", "similar_company", "metric", "percentage", "company", "your_name"]}'::jsonb,
  true
FROM auth.users
WHERE email = (SELECT email FROM auth.users WHERE id = auth.uid())
LIMIT 1;

INSERT INTO campaign_templates (user_id, name, type, content, subject, variables, is_active)
SELECT 
  auth.uid(),
  'Nurturing Day 4 - Case Study',
  'email',
  E'Hi {{name}},\n\nDay 4: Real Results\n\nLet me share a success story: {{client_name}} in {{industry}}.\n\nTheir challenge: {{challenge}}\nOur solution: {{solution_applied}}\nThe results: {{impressive_results}}\n\n"{{client_testimonial}}" - {{client_name}}, {{client_title}}\n\nCould {{company}} achieve similar results? Let''s find out.\n\nBest,\n{{your_name}}',
  'Case Study: How {{client_name}} Achieved {{result}}',
  '{"variables": ["name", "client_name", "industry", "challenge", "solution_applied", "impressive_results", "client_testimonial", "client_title", "company", "your_name", "result"]}'::jsonb,
  true
FROM auth.users
WHERE email = (SELECT email FROM auth.users WHERE id = auth.uid())
LIMIT 1;

INSERT INTO campaign_templates (user_id, name, type, content, subject, variables, is_active)
SELECT 
  auth.uid(),
  'Nurturing Day 5 - Social Proof',
  'whatsapp',
  E'Hi {{name}}! ⭐\n\nDay 5: What Others Are Saying\n\n"{{review_1}}" - {{reviewer_1}}\n"{{review_2}}" - {{reviewer_2}}\n\nOver {{number}} businesses trust us. Ready to join them? 🚀',
  NULL,
  '{"variables": ["name", "review_1", "reviewer_1", "review_2", "reviewer_2", "number"]}'::jsonb,
  true
FROM auth.users
WHERE email = (SELECT email FROM auth.users WHERE id = auth.uid())
LIMIT 1;

INSERT INTO campaign_templates (user_id, name, type, content, subject, variables, is_active)
SELECT 
  auth.uid(),
  'Nurturing Day 6 - Demo Invitation',
  'email',
  E'Hi {{name}},\n\nDay 6: See It In Action\n\nReady to see how {{solution_name}} works for {{company}}?\n\nI''d like to offer you a personalized 20-minute demo where we''ll:\n• Customize the solution for your specific needs\n• Answer all your questions\n• Show you the ROI calculator\n\nBook your demo here: {{calendar_link}}\n\nLimited slots available this week!\n\nBest,\n{{your_name}}',
  'Your Personal Demo Awaits - {{company}}',
  '{"variables": ["name", "solution_name", "company", "calendar_link", "your_name"]}'::jsonb,
  true
FROM auth.users
WHERE email = (SELECT email FROM auth.users WHERE id = auth.uid())
LIMIT 1;

INSERT INTO campaign_templates (user_id, name, type, content, subject, variables, is_active)
SELECT 
  auth.uid(),
  'Nurturing Day 7 - Call to Action',
  'whatsapp',
  E'Hi {{name}}! 🎯\n\nDay 7: Let''s Get Started!\n\nYou''ve seen:\n✅ The problem\n✅ Our solution\n✅ Real results\n✅ Happy customers\n\nNext step: Let''s talk! 💬\n\nReply YES to schedule a call, or NO if now isn''t the right time.\n\nEither way, thanks for following along! 🙌',
  NULL,
  '{"variables": ["name"]}'::jsonb,
  true
FROM auth.users
WHERE email = (SELECT email FROM auth.users WHERE id = auth.uid())
LIMIT 1;

-- Long-Term Nurturing Pool (5 templates)
INSERT INTO campaign_templates (user_id, name, type, content, subject, variables, is_active)
SELECT 
  auth.uid(),
  'Long-term - Monthly Newsletter',
  'email',
  E'Hi {{name}},\n\nYour Monthly Update from {{your_company}}\n\nWhat''s new this month:\n• {{update_1}}\n• {{update_2}}\n• {{update_3}}\n\nIndustry insight: {{insight}}\n\nThought of the month: {{quote}}\n\nStay connected,\n{{your_name}}',
  '{{your_company}} Monthly Update - {{month}}',
  '{"variables": ["name", "your_company", "update_1", "update_2", "update_3", "insight", "quote", "your_name", "month"]}'::jsonb,
  true
FROM auth.users
WHERE email = (SELECT email FROM auth.users WHERE id = auth.uid())
LIMIT 1;

INSERT INTO campaign_templates (user_id, name, type, content, subject, variables, is_active)
SELECT 
  auth.uid(),
  'Long-term - Quarterly Insights',
  'email',
  E'Hi {{name}},\n\nQ{{quarter}} Industry Report: {{industry}} Trends\n\nWe''ve analyzed the latest data for {{industry}}, and here''s what {{company}} should know:\n\n1. {{trend_1}}\n2. {{trend_2}}\n3. {{trend_3}}\n\nWhat this means for you: {{implication}}\n\nDownload the full report: {{download_link}}\n\nBest,\n{{your_name}}',
  'Q{{quarter}} {{industry}} Trends Report',
  '{"variables": ["name", "quarter", "industry", "company", "trend_1", "trend_2", "trend_3", "implication", "download_link", "your_name"]}'::jsonb,
  true
FROM auth.users
WHERE email = (SELECT email FROM auth.users WHERE id = auth.uid())
LIMIT 1;

INSERT INTO campaign_templates (user_id, name, type, content, subject, variables, is_active)
SELECT 
  auth.uid(),
  'Long-term - Product Update',
  'whatsapp',
  E'Hi {{name}}! 🎉\n\nExciting news! We just launched {{new_feature}}.\n\nThis means {{company}} can now:\n✨ {{benefit_1}}\n✨ {{benefit_2}}\n\nWant to see it in action? Reply ''DEMO'' 📱',
  NULL,
  '{"variables": ["name", "new_feature", "company", "benefit_1", "benefit_2"]}'::jsonb,
  true
FROM auth.users
WHERE email = (SELECT email FROM auth.users WHERE id = auth.uid())
LIMIT 1;

INSERT INTO campaign_templates (user_id, name, type, content, subject, variables, is_active)
SELECT 
  auth.uid(),
  'Long-term - Re-engagement',
  'email',
  E'Hi {{name}},\n\nIt''s been a while since we last connected.\n\nI wanted to check in: Are you still interested in {{topic}}?\n\nThings have changed a lot since we last spoke:\n• {{change_1}}\n• {{change_2}}\n\nIf timing is better now, I''d love to reconnect. If not, no worries at all!\n\nReply YES to reconnect, or NO to pause updates.\n\nBest,\n{{your_name}}',
  'Still Interested in {{topic}}?',
  '{"variables": ["name", "topic", "change_1", "change_2", "your_name"]}'::jsonb,
  true
FROM auth.users
WHERE email = (SELECT email FROM auth.users WHERE id = auth.uid())
LIMIT 1;

INSERT INTO campaign_templates (user_id, name, type, content, subject, variables, is_active)
SELECT 
  auth.uid(),
  'Long-term - Win-back Offer',
  'email',
  E'Hi {{name}},\n\nWe Miss You at {{your_company}}!\n\nIt''s been {{time_period}} since we last heard from you. We''d love to have {{company}} back.\n\nAs a returning customer, we''re offering:\n🎁 {{special_offer_1}}\n🎁 {{special_offer_2}}\n🎁 {{special_offer_3}}\n\nValid until {{expiry_date}}.\n\nReady to give us another try? Book a call: {{calendar_link}}\n\nBest,\n{{your_name}}',
  'Special Offer Just for You - {{company}}',
  '{"variables": ["name", "your_company", "time_period", "company", "special_offer_1", "special_offer_2", "special_offer_3", "expiry_date", "calendar_link", "your_name"]}'::jsonb,
  true
FROM auth.users
WHERE email = (SELECT email FROM auth.users WHERE id = auth.uid())
LIMIT 1;

-- VIP Fast Track (3 templates)
INSERT INTO campaign_templates (user_id, name, type, content, subject, variables, is_active)
SELECT 
  auth.uid(),
  'VIP - Immediate Response',
  'whatsapp',
  E'Hi {{name}}! 🌟\n\nWelcome to our VIP Fast Track!\n\nI''m {{your_name}}, your dedicated account manager. I''ll be personally handling your {{company}} account.\n\nI''m available right now to answer any questions. What would you like to discuss first? 💬',
  NULL,
  '{"variables": ["name", "your_name", "company"]}'::jsonb,
  true
FROM auth.users
WHERE email = (SELECT email FROM auth.users WHERE id = auth.uid())
LIMIT 1;

INSERT INTO campaign_templates (user_id, name, type, content, subject, variables, is_active)
SELECT 
  auth.uid(),
  'VIP - Value Proposition',
  'email',
  E'Hi {{name}},\n\nThank you for your interest in our VIP service!\n\nAs a VIP client, {{company}} will receive:\n\n🌟 Priority Support (24/7 dedicated team)\n🌟 Custom Solution Design\n🌟 {{exclusive_benefit_1}}\n🌟 {{exclusive_benefit_2}}\n🌟 {{exclusive_benefit_3}}\n\nEstimated ROI: {{roi_estimate}}\nImplementation timeline: {{timeline}}\n\nI''ve prepared a custom proposal for you: {{proposal_link}}\n\nLet''s schedule a call to discuss: {{calendar_link}}\n\nBest regards,\n{{your_name}}\n{{your_title}}',
  'Your Custom VIP Proposal - {{company}}',
  '{"variables": ["name", "company", "exclusive_benefit_1", "exclusive_benefit_2", "exclusive_benefit_3", "roi_estimate", "timeline", "proposal_link", "calendar_link", "your_name", "your_title"]}'::jsonb,
  true
FROM auth.users
WHERE email = (SELECT email FROM auth.users WHERE id = auth.uid())
LIMIT 1;

INSERT INTO campaign_templates (user_id, name, type, content, subject, variables, is_active)
SELECT 
  auth.uid(),
  'VIP - Meeting Booking',
  'whatsapp',
  E'Hi {{name}}! 📅\n\nI''ve reviewed your requirements for {{company}}. This looks like a perfect fit!\n\nI''d like to schedule a priority call to:\n✅ Walk through the custom proposal\n✅ Answer all questions\n✅ Fast-track your implementation\n\nMy calendar: {{calendar_link}}\n\nOr reply with your preferred time! 🚀',
  NULL,
  '{"variables": ["name", "company", "calendar_link"]}'::jsonb,
  true
FROM auth.users
WHERE email = (SELECT email FROM auth.users WHERE id = auth.uid())
LIMIT 1;