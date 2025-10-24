-- Allow admins to fully manage workflow sequences and steps (fix RLS blocking saves when editing as admin)

-- Drop and recreate policies to avoid conflicts
DROP POLICY IF EXISTS "Admins can manage sequence steps" ON public.workflow_sequence_steps;
DROP POLICY IF EXISTS "Admins can manage sequences" ON public.workflow_sequences;

-- Admins can manage all sequence steps
CREATE POLICY "Admins can manage sequence steps"
ON public.workflow_sequence_steps
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Admins can manage all sequences  
CREATE POLICY "Admins can manage sequences"
ON public.workflow_sequences
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));