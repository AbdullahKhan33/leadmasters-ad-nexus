-- Create auto_assignment_rules table for Phase 3
CREATE TABLE public.auto_assignment_rules (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    enabled BOOLEAN NOT NULL DEFAULT true,
    criteria JSONB NOT NULL DEFAULT '{}',
    assignment_method TEXT NOT NULL CHECK (assignment_method IN ('round_robin', 'least_load', 'specialization', 'performance')),
    agent_filters JSONB NOT NULL DEFAULT '{}',
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    created_by UUID
);

-- Enable RLS
ALTER TABLE public.auto_assignment_rules ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Admins can manage assignment rules" 
ON public.auto_assignment_rules 
FOR ALL 
USING (public.has_role(auth.uid(), 'admin'));

-- Create trigger for updated_at
CREATE TRIGGER update_auto_assignment_rules_updated_at
BEFORE UPDATE ON public.auto_assignment_rules
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes
CREATE INDEX idx_auto_assignment_rules_enabled ON public.auto_assignment_rules(enabled);
CREATE INDEX idx_auto_assignment_rules_created_by ON public.auto_assignment_rules(created_by);