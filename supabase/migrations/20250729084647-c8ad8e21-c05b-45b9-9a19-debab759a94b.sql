-- Create admin user using auth.signup function
SELECT auth.signup(
  'admin@leadmasters.ai',
  'Password123!',
  '{"display_name": "Admin User"}'::jsonb,
  '{"provider": "email", "providers": ["email"]}'::jsonb
);

-- Wait a moment for the trigger to create the profile, then update the role
-- We'll do this in a separate transaction to ensure the user exists first