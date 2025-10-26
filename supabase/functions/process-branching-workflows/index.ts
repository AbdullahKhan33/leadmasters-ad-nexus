import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface FlowNode {
  id: string;
  type: string;
  data: {
    label?: string;
    content?: string;
    delay?: number;
    delayUnit?: string;
    channel?: string;
    condition?: string;
  };
}

interface FlowEdge {
  id: string;
  source: string;
  target: string;
  sourceHandle?: string;
  targetHandle?: string;
}

interface Flowchart {
  nodes: FlowNode[];
  edges: FlowEdge[];
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    console.log("🔄 Starting branching workflow processor...");

    // Fetch all active workflow executions for ai_automation workflows
    const { data: executions, error: execError } = await supabase
      .from('workflow_executions')
      .select(`
        *,
        workflow:automation_workflows(
          id,
          type,
          actions,
          user_id
        )
      `)
      .eq('status', 'active')
      .lte('next_step_at', new Date().toISOString())
      .limit(50);

    if (execError) {
      console.error("Error fetching executions:", execError);
      throw execError;
    }

    // Filter only ai_automation (branching) workflows
    const branchingExecutions = executions?.filter(
      (ex: any) => ex.workflow?.type === 'ai_automation'
    ) || [];

    console.log(`📊 Found ${branchingExecutions.length} branching workflow executions to process`);

    if (branchingExecutions.length === 0) {
      return new Response(
        JSON.stringify({ message: "No branching workflows to process", processed: 0 }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
      );
    }

    let processed = 0;
    let failed = 0;

    for (const execution of branchingExecutions) {
      try {
        const workflow = execution.workflow;
        const flowchart = workflow.actions?.flowchart as Flowchart;

        if (!flowchart || !flowchart.nodes || !flowchart.edges) {
          console.error(`No flowchart data for workflow ${workflow.id}`);
          continue;
        }

        // Get current node from step_data
        const stepData = execution.step_data || {};
        const currentNodeId = stepData.current_node_id || 'start-node';

        console.log(`⚙️ Processing execution ${execution.id}, current node: ${currentNodeId}`);

        // Find current node
        const currentNode = flowchart.nodes.find(n => n.id === currentNodeId);
        if (!currentNode) {
          console.error(`Current node ${currentNodeId} not found`);
          continue;
        }

        // Fetch lead data
        const { data: lead, error: leadError } = await supabase
          .from('leads')
          .select('*')
          .eq('id', execution.lead_id)
          .single();

        if (leadError || !lead) {
          console.error(`Lead ${execution.lead_id} not found`);
          continue;
        }

        // Process based on node type
        let nextNodeId: string | null = null;
        let delayHours = 0;

        switch (currentNode.type) {
          case 'start':
            // Just move to next node immediately
            nextNodeId = getNextNodeId(flowchart, currentNodeId);
            break;

          case 'message':
            // Send message to lead
            const messageContent = replaceVariables(
              currentNode.data.content || '',
              lead
            );
            const channel = currentNode.data.channel || 'whatsapp';

            console.log(`📧 Sending ${channel} message to ${lead.name}`);

            await supabase.from('workflow_message_log').insert({
              workflow_execution_id: execution.id,
              lead_id: lead.id,
              message_template: currentNode.data.content,
              message_sent: messageContent,
              channel: channel,
              delivery_status: 'sent',
              sent_at: new Date().toISOString()
            });

            nextNodeId = getNextNodeId(flowchart, currentNodeId);
            break;

          case 'delay':
            // Calculate delay
            const delayValue = currentNode.data.delay || 24;
            const delayUnit = currentNode.data.delayUnit || 'hours';
            
            delayHours = delayUnit === 'days' ? delayValue * 24 : delayValue;
            
            console.log(`⏱️ Delay node: waiting ${delayValue} ${delayUnit}`);
            nextNodeId = getNextNodeId(flowchart, currentNodeId);
            break;

          case 'branch':
            // Evaluate condition and choose path
            const condition = currentNode.data.condition || '';
            const branchPath = evaluateCondition(condition, lead);
            
            console.log(`🔀 Branch node: condition "${condition}" => ${branchPath}`);
            
            // Find edge with matching sourceHandle (yes/no)
            const branchEdge = flowchart.edges.find(
              e => e.source === currentNodeId && e.sourceHandle === branchPath
            );
            nextNodeId = branchEdge?.target || null;
            break;

          case 'end':
            // Workflow complete
            console.log(`✅ Reached end node for execution ${execution.id}`);
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

        if (!nextNodeId) {
          console.log(`✅ No next node - completing execution ${execution.id}`);
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

        // Calculate next execution time
        const nextStepAt = new Date();
        nextStepAt.setHours(nextStepAt.getHours() + delayHours);

        // Update execution with next node
        await supabase
          .from('workflow_executions')
          .update({
            step_data: { 
              ...stepData, 
              current_node_id: nextNodeId,
              last_node_id: currentNodeId 
            },
            next_step_at: nextStepAt.toISOString()
          })
          .eq('id', execution.id);

        // Update lead's last interaction
        await supabase
          .from('leads')
          .update({ last_interaction_at: new Date().toISOString() })
          .eq('id', lead.id);

        processed++;
        console.log(`✅ Moved to next node: ${nextNodeId}`);

      } catch (stepError) {
        console.error(`Error processing execution ${execution.id}:`, stepError);
        failed++;
        
        await supabase
          .from('workflow_executions')
          .update({ status: 'failed' })
          .eq('id', execution.id);
      }
    }

    console.log(`✅ Processing complete: ${processed} succeeded, ${failed} failed`);

    return new Response(
      JSON.stringify({ 
        message: "Branching workflow processing complete",
        processed,
        failed,
        total: branchingExecutions.length
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200
      }
    );

  } catch (error: any) {
    console.error("❌ Error in process-branching-workflows:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500
      }
    );
  }
};

// Helper: Get next node from flowchart edges
function getNextNodeId(flowchart: Flowchart, currentNodeId: string): string | null {
  const edge = flowchart.edges.find(e => e.source === currentNodeId);
  return edge?.target || null;
}

// Helper: Replace template variables with lead data
function replaceVariables(template: string, lead: any): string {
  const replacements: Record<string, string> = {
    '{{name}}': lead.name || '',
    '{{email}}': lead.email || '',
    '{{phone}}': lead.phone || '',
    '{{company}}': lead.source_metadata?.company || '',
    '{{status}}': lead.status || '',
  };

  let result = template;
  for (const [placeholder, value] of Object.entries(replacements)) {
    result = result.replace(new RegExp(placeholder, 'g'), value);
  }
  return result;
}

// Helper: Evaluate branch conditions
function evaluateCondition(condition: string, lead: any): string {
  // Simple condition evaluation
  // In production, this could be much more sophisticated
  
  if (condition.toLowerCase().includes('replied')) {
    // Check if lead has replies in message log
    return lead.last_message ? 'yes' : 'no';
  }
  
  if (condition.toLowerCase().includes('qualified')) {
    return lead.status === 'Qualified' ? 'yes' : 'no';
  }
  
  if (condition.toLowerCase().includes('interested')) {
    return ['Interested', 'Qualified'].includes(lead.status) ? 'yes' : 'no';
  }
  
  // Default to 'no' path if condition not recognized
  return 'no';
}

serve(handler);
