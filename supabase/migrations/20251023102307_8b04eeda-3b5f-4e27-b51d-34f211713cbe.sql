-- Update existing leads to distribute across different workflow stages
-- Using correct stage names: qualified, no_reply, nurturing_7day, long_term, won

-- Update leads 1-10 to 'no_reply' stage (urgent priority)
UPDATE leads 
SET workflow_stage = 'no_reply',
    ai_score = 90,
    last_interaction_at = now() - interval '2 days'
WHERE id IN (
  SELECT id FROM leads 
  WHERE lead_source_type = 'ai_automation' 
  ORDER BY created_at 
  LIMIT 10
);

-- Update leads 11-20 to 'qualified' stage with high ai_score
UPDATE leads 
SET workflow_stage = 'qualified',
    ai_score = 88,
    last_interaction_at = now() - interval '1 day'
WHERE id IN (
  SELECT id FROM leads 
  WHERE lead_source_type = 'ai_automation' 
    AND workflow_stage IS NULL
  ORDER BY created_at 
  LIMIT 10
);

-- Update leads 21-30 to 'nurturing_7day' stage
UPDATE leads 
SET workflow_stage = 'nurturing_7day',
    ai_score = 70,
    last_interaction_at = now() - interval '3 days'
WHERE id IN (
  SELECT id FROM leads 
  WHERE lead_source_type = 'ai_automation' 
    AND workflow_stage IS NULL
  ORDER BY created_at 
  LIMIT 10
);

-- Update leads 31-40 to 'long_term' stage with old dates
UPDATE leads 
SET workflow_stage = 'long_term',
    ai_score = 60,
    last_interaction_at = now() - interval '10 days'
WHERE id IN (
  SELECT id FROM leads 
  WHERE lead_source_type = 'ai_automation' 
    AND workflow_stage IS NULL
  ORDER BY created_at 
  LIMIT 10
);

-- Update leads 41-45 to 'won' stage
UPDATE leads 
SET workflow_stage = 'won',
    ai_score = 95,
    last_interaction_at = now() - interval '1 day'
WHERE id IN (
  SELECT id FROM leads 
  WHERE lead_source_type = 'ai_automation' 
    AND workflow_stage IS NULL
  ORDER BY created_at 
  LIMIT 5
);

-- Keep remaining with NULL workflow_stage but varying ai_scores
UPDATE leads 
SET ai_score = CASE 
  WHEN random() < 0.3 THEN 85 + floor(random() * 10)::integer
  WHEN random() < 0.6 THEN 70 + floor(random() * 15)::integer
  ELSE 50 + floor(random() * 20)::integer
END,
last_interaction_at = now() - (interval '1 hour' * floor(random() * 48)::integer)
WHERE lead_source_type = 'ai_automation' 
  AND workflow_stage IS NULL;

-- Insert 30 more leads with proper stage distribution
INSERT INTO leads (
  user_id,
  name,
  phone,
  email,
  source,
  status,
  lead_source_type,
  workflow_stage,
  ai_score,
  last_interaction_at
)
SELECT 
  user_id,
  'Lead ' || (row_number() OVER () + 50),
  '+91' || (9000000000 + floor(random() * 999999999)::bigint)::text,
  'lead' || (row_number() OVER () + 50) || '@example.com',
  CASE 
    WHEN random() < 0.3 THEN 'Facebook Lead Ads'
    WHEN random() < 0.6 THEN 'Google Ads'
    ELSE 'Website Form'
  END,
  'Active',
  'ai_automation',
  CASE 
    WHEN row_number() OVER () <= 5 THEN 'no_reply'
    WHEN row_number() OVER () <= 10 THEN 'qualified'
    WHEN row_number() OVER () <= 15 THEN 'nurturing_7day'
    WHEN row_number() OVER () <= 20 THEN 'long_term'
    WHEN row_number() OVER () <= 25 THEN 'won'
    ELSE NULL
  END,
  CASE 
    WHEN row_number() OVER () <= 8 THEN 85 + floor(random() * 15)::integer
    WHEN row_number() OVER () <= 18 THEN 70 + floor(random() * 15)::integer
    ELSE 50 + floor(random() * 20)::integer
  END,
  now() - (interval '1 day' * floor(random() * 14)::integer)
FROM leads 
WHERE lead_source_type = 'ai_automation'
LIMIT 30;