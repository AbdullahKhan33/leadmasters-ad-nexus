-- Create agent-workspace relationship table
CREATE TABLE public.agent_workspaces (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  agent_id UUID NOT NULL,
  workspace_id UUID NOT NULL,
  assigned_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  assigned_by UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(agent_id, workspace_id)
);

-- Enable RLS
ALTER TABLE public.agent_workspaces ENABLE ROW LEVEL SECURITY;

-- Create policies for agent_workspaces
CREATE POLICY "Admins can manage agent workspace assignments" 
ON public.agent_workspaces 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Agents can view their workspace assignments" 
ON public.agent_workspaces 
FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM agents 
  WHERE agents.id = agent_workspaces.agent_id 
  AND agents.user_id = auth.uid()
));

-- Create workspaces table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.workspaces (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  created_by UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on workspaces
ALTER TABLE public.workspaces ENABLE ROW LEVEL SECURITY;

-- Create policies for workspaces
CREATE POLICY "Admins can manage all workspaces" 
ON public.workspaces 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Agents can view assigned workspaces" 
ON public.workspaces 
FOR SELECT 
USING (
  has_role(auth.uid(), 'agent'::app_role) AND
  EXISTS (
    SELECT 1 FROM agent_workspaces 
    JOIN agents ON agents.id = agent_workspaces.agent_id
    WHERE agent_workspaces.workspace_id = workspaces.id 
    AND agents.user_id = auth.uid()
  )
);

-- Add trigger for workspace timestamps
CREATE TRIGGER update_workspaces_updated_at
BEFORE UPDATE ON public.workspaces
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();