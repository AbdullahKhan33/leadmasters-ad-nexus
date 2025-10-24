import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    console.log('Starting workflow execution creation process...');

    // Fetch all active workflows
    const { data: workflows, error: workflowsError } = await supabase
      .from('automation_workflows')
      .select('*')
      .eq('is_active', true);

    if (workflowsError) {
      console.error('Error fetching workflows:', workflowsError);
      throw workflowsError;
    }

    console.log(`Found ${workflows?.length || 0} active workflows`);

    let totalCreated = 0;

    for (const workflow of workflows || []) {
      console.log(`Processing workflow: ${workflow.name} (${workflow.id})`);
      
      const triggerConfig = workflow.trigger_config as any;
      
      // Build query based on trigger conditions
      let leadsQuery = supabase
        .from('leads')
        .select('id, status, workflow_stage, current_workflow_id')
        .eq('user_id', workflow.user_id);

      // Apply trigger filters
      if (triggerConfig.status) {
        leadsQuery = leadsQuery.eq('status', triggerConfig.status);
      }
      if (triggerConfig.source) {
        leadsQuery = leadsQuery.eq('source', triggerConfig.source);
      }
      if (triggerConfig.workflow_stage) {
        leadsQuery = leadsQuery.eq('workflow_stage', triggerConfig.workflow_stage);
      }

      const { data: matchingLeads, error: leadsError } = await leadsQuery;

      if (leadsError) {
        console.error(`Error fetching leads for workflow ${workflow.id}:`, leadsError);
        continue;
      }

      console.log(`Found ${matchingLeads?.length || 0} matching leads for workflow ${workflow.name}`);

      // Filter out leads already in a workflow (unless workflow allows re-entry)
      const leadsToStart = matchingLeads?.filter(lead => 
        !lead.current_workflow_id || triggerConfig.allow_reentry
      ) || [];

      console.log(`${leadsToStart.length} leads eligible to start workflow`);

      // Create workflow executions for matching leads
      for (const lead of leadsToStart) {
        // Check if execution already exists
        const { data: existingExecution } = await supabase
          .from('workflow_executions')
          .select('id')
          .eq('lead_id', lead.id)
          .eq('workflow_id', workflow.id)
          .eq('status', 'active')
          .single();

        if (existingExecution) {
          console.log(`Execution already exists for lead ${lead.id}`);
          continue;
        }

        // Create new execution
        const { error: executionError } = await supabase
          .from('workflow_executions')
          .insert({
            workflow_id: workflow.id,
            lead_id: lead.id,
            current_step: 0,
            step_data: {},
            next_step_at: new Date().toISOString(),
            status: 'active'
          });

        if (executionError) {
          console.error(`Error creating execution for lead ${lead.id}:`, executionError);
          continue;
        }

        // Update lead's current workflow
        await supabase
          .from('leads')
          .update({ 
            current_workflow_id: workflow.id,
            workflow_stage: workflow.type === 'follow_up' ? 'follow_up' : 
                          workflow.type === 'nurturing' ? 'nurturing' : 
                          'routing'
          })
          .eq('id', lead.id);

        totalCreated++;
        console.log(`Created execution for lead ${lead.id} in workflow ${workflow.name}`);
      }
    }

    console.log(`Workflow execution creation complete. Total created: ${totalCreated}`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Created ${totalCreated} workflow executions`,
        totalCreated 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error: any) {
    console.error('Error in start-workflow-executions:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});
