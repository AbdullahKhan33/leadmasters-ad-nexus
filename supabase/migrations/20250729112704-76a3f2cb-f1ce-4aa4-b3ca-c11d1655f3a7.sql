-- Create a default workspace for the admin user admin@leadmasters.ai
-- First, let's create the workspace
INSERT INTO public.workspaces (
  name,
  description,
  created_by
) 
SELECT 
  'BotCampus AI',
  'AI training and education company based in Karnataka, India. Specializing in educational technology solutions.',
  auth.uid()
FROM auth.users 
WHERE email = 'admin@leadmasters.ai'
ON CONFLICT DO NOTHING;