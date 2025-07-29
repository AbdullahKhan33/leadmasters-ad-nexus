-- Create admin user directly in auth.users table
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
  NOW(),
  NOW(),
  NOW(),
  '{"provider": "email", "providers": ["email"]}',
  '{"display_name": "Admin User"}',
  NOW(),
  NOW(),
  '',
  '',
  '',
  ''
)
ON CONFLICT (id) DO UPDATE SET
  encrypted_password = EXCLUDED.encrypted_password;

-- Create profile for admin user (in case trigger didn't run)
INSERT INTO public.profiles (user_id, display_name, email) 
VALUES (
  'f47ac10b-58cc-4372-a567-0e02b2c3d479',
  'Admin User', 
  'admin@leadmasters.ai'
)
ON CONFLICT (user_id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  email = EXCLUDED.email;

-- Set admin role
INSERT INTO public.user_roles (user_id, role)
VALUES ('f47ac10b-58cc-4372-a567-0e02b2c3d479', 'admin'::app_role)
ON CONFLICT (user_id, role) DO NOTHING;