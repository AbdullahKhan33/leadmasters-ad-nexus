import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface WorkflowExecution {
  id: string;
  workflow_id: string;
  lead_id: string;
  current_step: number;
  status: string;
  next_step_at: string | null;
}

interface WorkflowSequenceStep {
  id: string;
  step_order: number;
  delay_hours: number;
  channel: 'email' | 'whatsapp';
  template_id: string;
}

interface Lead {
  id: string;
  name: string;
  email?: string;
  phone: string;
  source_metadata?: any;
}

interface Template {
  id: string;
  content: string;
  subject?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    console.log("🔄 Starting workflow step processor...");

    // Step 1: Fetch all pending workflow executions that are ready to be processed
    const { data: executions, error: execError } = await supabase
      .from('workflow_executions')
      .select('*')
      .eq('status', 'active')
      .lte('next_step_at', new Date().toISOString())
      .limit(50);

    if (execError) {
      console.error("Error fetching executions:", execError);
      throw execError;
    }

    console.log(`📊 Found ${executions?.length || 0} executions to process`);

    if (!executions || executions.length === 0) {
      return new Response(
        JSON.stringify({ message: "No pending workflow steps to process", processed: 0 }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
      );
    }

    // Step 2: Process each execution
    let processed = 0;
    let failed = 0;

    for (const execution of executions as WorkflowExecution[]) {
      try {
        console.log(`⚙️ Processing execution ${execution.id} for lead ${execution.lead_id}`);

        // Fetch the workflow to get sequence_id
        const { data: workflow, error: workflowError } = await supabase
          .from('automation_workflows')
          .select('workflow_sequence_id')
          .eq('id', execution.workflow_id)
          .single();

        if (workflowError || !workflow?.workflow_sequence_id) {
          console.error(`No sequence configured for workflow ${execution.workflow_id}`);
          continue;
        }

        // Fetch all steps for this sequence
        const { data: steps, error: stepsError } = await supabase
          .from('workflow_sequence_steps')
          .select('*, template:campaign_templates(*)')
          .eq('sequence_id', workflow.workflow_sequence_id)
          .order('step_order', { ascending: true });

        if (stepsError || !steps) {
          console.error(`Error fetching steps for sequence ${workflow.workflow_sequence_id}:`, stepsError);
          continue;
        }

        // Find the current step
        const currentStepIndex = execution.current_step || 0;
        const currentStep = steps[currentStepIndex];

        if (!currentStep) {
          // No more steps - mark as completed
          console.log(`✅ Execution ${execution.id} completed - no more steps`);
          await supabase
            .from('workflow_executions')
            .update({
              status: 'completed',
              completed_at: new Date().toISOString()
            })
            .eq('id', execution.id);
          processed++;
          continue;
        }

        // Fetch lead data
        const { data: lead, error: leadError } = await supabase
          .from('leads')
          .select('*')
          .eq('id', execution.lead_id)
          .single();

        if (leadError || !lead) {
          console.error(`Lead ${execution.lead_id} not found:`, leadError);
          continue;
        }

        // Replace variables in template content
        const template = currentStep.template as Template;
        let messageContent = template.content;
        let messageSubject = template.subject || '';

        // Replace common variables
        const replacements: Record<string, string> = {
          '{{name}}': lead.name || '',
          '{{email}}': lead.email || '',
          '{{phone}}': lead.phone || '',
          '{{company}}': (lead.source_metadata?.company || ''),
          '{{goal}}': (lead.source_metadata?.goal || ''),
          '{{solution}}': (lead.source_metadata?.solution || ''),
          '{{topic}}': (lead.source_metadata?.topic || ''),
          '{{benefit}}': (lead.source_metadata?.benefit || ''),
          '{{your_name}}': 'LeadMasters Team',
          '{{your_company}}': 'LeadMasters',
          '{{calendar_link}}': 'https://calendly.com/example',
        };

        for (const [placeholder, value] of Object.entries(replacements)) {
          messageContent = messageContent.replace(new RegExp(placeholder, 'g'), value);
          messageSubject = messageSubject.replace(new RegExp(placeholder, 'g'), value);
        }

        console.log(`📧 Sending ${currentStep.channel} message for step ${currentStep.step_order} to ${lead.name}`);

        // Log the message (in production, this would actually send via email/WhatsApp API)
        const { error: logError } = await supabase
          .from('workflow_message_log')
          .insert({
            workflow_execution_id: execution.id,
            lead_id: lead.id,
            message_template: template.content,
            message_sent: messageContent,
            channel: currentStep.channel,
            delivery_status: 'sent',
            sent_at: new Date().toISOString()
          });

        if (logError) {
          console.error("Error logging message:", logError);
        }

        // Update execution: increment step and schedule next
        const nextStepIndex = currentStepIndex + 1;
        const nextStep = steps[nextStepIndex];
        
        let updateData: any = {
          current_step: nextStepIndex,
        };

        if (nextStep) {
          // Calculate next execution time
          const nextStepAt = new Date();
          nextStepAt.setHours(nextStepAt.getHours() + nextStep.delay_hours);
          updateData.next_step_at = nextStepAt.toISOString();
          console.log(`⏱️ Next step scheduled for ${nextStepAt.toISOString()}`);
        } else {
          // No more steps - mark as completed
          updateData.status = 'completed';
          updateData.completed_at = new Date().toISOString();
          console.log(`✅ Workflow completed for lead ${lead.name}`);
        }

        const { error: updateError } = await supabase
          .from('workflow_executions')
          .update(updateData)
          .eq('id', execution.id);

        if (updateError) {
          console.error("Error updating execution:", updateError);
          failed++;
        } else {
          // Update lead's last_interaction_at
          await supabase
            .from('leads')
            .update({ last_interaction_at: new Date().toISOString() })
            .eq('id', lead.id);
          
          processed++;
        }

      } catch (stepError) {
        console.error(`Error processing execution ${execution.id}:`, stepError);
        failed++;
        
        // Mark execution as failed
        await supabase
          .from('workflow_executions')
          .update({ status: 'failed' })
          .eq('id', execution.id);
      }
    }

    console.log(`✅ Processing complete: ${processed} succeeded, ${failed} failed`);

    return new Response(
      JSON.stringify({ 
        message: "Workflow processing complete",
        processed,
        failed,
        total: executions.length
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200
      }
    );

  } catch (error: any) {
    console.error("❌ Error in process-workflow-steps function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500
      }
    );
  }
};

serve(handler);