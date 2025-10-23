-- Phase 1: AI Sales Automation Database Setup

-- 1. Extend leads table with automation columns
ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS lead_type TEXT DEFAULT 'manual' CHECK (lead_type IN ('automation', 'manual')),
  ADD COLUMN IF NOT EXISTS current_workflow_id UUID,
  ADD COLUMN IF NOT EXISTS workflow_stage TEXT CHECK (workflow_stage IN ('qualified', 'no_reply', 'nurturing_7day', 'long_term', 'won')),
  ADD COLUMN IF NOT EXISTS last_interaction_at TIMESTAMP WITH TIME ZONE,
  ADD COLUMN IF NOT EXISTS reminder_count INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS ai_qualification_status TEXT CHECK (ai_qualification_status IN ('pending', 'qualified', 'not_qualified', 'no_response')),
  ADD COLUMN IF NOT EXISTS ai_interest_level TEXT CHECK (ai_interest_level IN ('high', 'medium', 'low', 'none')),
  ADD COLUMN IF NOT EXISTS ai_confidence_score NUMERIC(3,2) CHECK (ai_confidence_score BETWEEN 0 AND 1);

-- 2. Create automation_workflows table
CREATE TABLE IF NOT EXISTS public.automation_workflows (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL CHECK (type IN ('no_reply', 'qualified_nurturing', 'long_term')),
  trigger_config JSONB NOT NULL DEFAULT '{}',
  actions JSONB NOT NULL DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 3. Create workflow_executions table
CREATE TABLE IF NOT EXISTS public.workflow_executions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workflow_id UUID REFERENCES public.automation_workflows(id) ON DELETE CASCADE,
  lead_id UUID NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'paused', 'completed', 'failed')),
  current_step INTEGER DEFAULT 0,
  step_data JSONB DEFAULT '{}',
  next_step_at TIMESTAMP WITH TIME ZONE,
  started_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 4. Create workflow_message_log table
CREATE TABLE IF NOT EXISTS public.workflow_message_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workflow_execution_id UUID REFERENCES public.workflow_executions(id) ON DELETE CASCADE,
  lead_id UUID NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
  message_template TEXT,
  message_sent TEXT,
  channel TEXT DEFAULT 'whatsapp' CHECK (channel IN ('whatsapp', 'email', 'sms')),
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  delivery_status TEXT DEFAULT 'pending' CHECK (delivery_status IN ('pending', 'sent', 'delivered', 'read', 'failed')),
  reply_received_at TIMESTAMP WITH TIME ZONE,
  reply_content TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 5. Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_leads_workflow_stage ON public.leads(workflow_stage) WHERE workflow_stage IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_leads_last_interaction ON public.leads(last_interaction_at) WHERE last_interaction_at IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_leads_lead_type ON public.leads(lead_type);
CREATE INDEX IF NOT EXISTS idx_workflow_executions_status ON public.workflow_executions(status);
CREATE INDEX IF NOT EXISTS idx_workflow_executions_lead ON public.workflow_executions(lead_id);
CREATE INDEX IF NOT EXISTS idx_workflow_executions_next_step ON public.workflow_executions(next_step_at) WHERE status = 'in_progress';
CREATE INDEX IF NOT EXISTS idx_message_log_lead ON public.workflow_message_log(lead_id);

-- 6. Add foreign key constraint for current_workflow_id
ALTER TABLE public.leads
  ADD CONSTRAINT fk_leads_current_workflow
  FOREIGN KEY (current_workflow_id) 
  REFERENCES public.automation_workflows(id) 
  ON DELETE SET NULL;

-- 7. Enable RLS on new tables
ALTER TABLE public.automation_workflows ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workflow_executions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workflow_message_log ENABLE ROW LEVEL SECURITY;

-- 8. RLS Policies for automation_workflows
CREATE POLICY "Admins can view all workflows"
  ON public.automation_workflows FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Users can view their own workflows"
  ON public.automation_workflows FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own workflows"
  ON public.automation_workflows FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own workflows"
  ON public.automation_workflows FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own workflows"
  ON public.automation_workflows FOR DELETE
  USING (auth.uid() = user_id);

-- 9. RLS Policies for workflow_executions
CREATE POLICY "Admins can view all executions"
  ON public.workflow_executions FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Users can view executions of their workflows"
  ON public.workflow_executions FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.automation_workflows
      WHERE automation_workflows.id = workflow_executions.workflow_id
      AND automation_workflows.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert executions for their workflows"
  ON public.workflow_executions FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.automation_workflows
      WHERE automation_workflows.id = workflow_executions.workflow_id
      AND automation_workflows.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update executions of their workflows"
  ON public.workflow_executions FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.automation_workflows
      WHERE automation_workflows.id = workflow_executions.workflow_id
      AND automation_workflows.user_id = auth.uid()
    )
  );

-- 10. RLS Policies for workflow_message_log
CREATE POLICY "Admins can view all message logs"
  ON public.workflow_message_log FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Users can view message logs of their workflows"
  ON public.workflow_message_log FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.workflow_executions we
      JOIN public.automation_workflows aw ON we.workflow_id = aw.id
      WHERE we.id = workflow_message_log.workflow_execution_id
      AND aw.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert message logs for their workflows"
  ON public.workflow_message_log FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.workflow_executions we
      JOIN public.automation_workflows aw ON we.workflow_id = aw.id
      WHERE we.id = workflow_message_log.workflow_execution_id
      AND aw.user_id = auth.uid()
    )
  );

-- 11. Add update trigger for automation_workflows
CREATE OR REPLACE FUNCTION public.update_automation_workflows_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER update_automation_workflows_updated_at
  BEFORE UPDATE ON public.automation_workflows
  FOR EACH ROW
  EXECUTE FUNCTION public.update_automation_workflows_updated_at();