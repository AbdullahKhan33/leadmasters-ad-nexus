-- Add workspace and password management fields to agents table
ALTER TABLE public.agents 
ADD COLUMN workspace_id UUID REFERENCES auth.users(id),
ADD COLUMN first_login_password_changed BOOLEAN DEFAULT FALSE,
ADD COLUMN assigned_by UUID REFERENCES auth.users(id);

-- Create index for workspace queries
CREATE INDEX idx_agents_workspace_id ON public.agents(workspace_id);