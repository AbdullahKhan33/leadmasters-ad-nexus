-- Create the app_role enum type
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- Create admin user account (using manual password hashing approach)
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  recovery_sent_at,
  last_sign_in_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  'f47ac10b-58cc-4372-a567-0e02b2c3d479',
  'authenticated',
  'authenticated',
  'admin@leadmasters.ai',
  crypt('Password123!', gen_salt('bf')),
  now(),
  now(),
  now(),
  '{"provider": "email", "providers": ["email"]}',
  '{"display_name": "Admin User"}',
  now(),
  now(),
  '',
  '',
  '',
  ''
);

-- Create profile for admin user
INSERT INTO public.profiles (user_id, display_name, email) 
VALUES (
  'f47ac10b-58cc-4372-a567-0e02b2c3d479',
  'Admin User', 
  'admin@leadmasters.ai'
);

-- Set admin role
INSERT INTO public.user_roles (user_id, role)
VALUES ('f47ac10b-58cc-4372-a567-0e02b2c3d479', 'admin'::app_role);

-- Create sample agents
INSERT INTO public.agents (id, user_id, agent_code, status, specialization, performance_score, assigned_leads_count, total_leads_handled)
VALUES 
  (gen_random_uuid(), 'f47ac10b-58cc-4372-a567-0e02b2c3d479', 'AGT001', 'active', ARRAY['sales', 'customer_service'], 85.5, 5, 25),
  (gen_random_uuid(), 'f47ac10b-58cc-4372-a567-0e02b2c3d479', 'AGT002', 'active', ARRAY['technical_support'], 92.0, 3, 18);

-- Create sample leads
INSERT INTO public.leads (id, user_id, name, phone, email, status, source, ai_score, category, list)
VALUES 
  (gen_random_uuid(), 'f47ac10b-58cc-4372-a567-0e02b2c3d479', 'John Smith', '+1234567890', 'john@example.com', 'New', 'Website', 75, 'prospect', 'general'),
  (gen_random_uuid(), 'f47ac10b-58cc-4372-a567-0e02b2c3d479', 'Sarah Johnson', '+1987654321', 'sarah@example.com', 'Contacted', 'Referral', 85, 'customer', 'vip'),
  (gen_random_uuid(), 'f47ac10b-58cc-4372-a567-0e02b2c3d479', 'Mike Davis', '+1122334455', 'mike@example.com', 'Qualified', 'Cold Call', 90, 'prospect', 'general');