import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.52.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });

    // Get the authenticated user
    const authHeader = req.headers.get('Authorization')!;
    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      throw new Error('Unauthorized');
    }

    // Check if user is admin
    const { data: roleData, error: roleError } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .single();

    if (roleError || roleData?.role !== 'admin') {
      throw new Error('Only admins can reset agent passwords');
    }

    console.log('Fetching all agents...');

    // Get all agents
    const { data: agents, error: agentsError } = await supabase
      .from('agents')
      .select('id, user_id, profiles!inner(display_name, email)');

    if (agentsError) {
      console.error('Error fetching agents:', agentsError);
      throw agentsError;
    }

    if (!agents || agents.length === 0) {
      return new Response(
        JSON.stringify({
          success: true,
          message: 'No agents found to reset passwords',
          updatedAgents: []
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200 
        }
      );
    }

    console.log(`Found ${agents.length} agents. Resetting passwords...`);

    const updatedAgents = [];
    const newPassword = 'Password123!';

    // Update password for each agent
    for (const agent of agents) {
      try {
        // Update password using admin API
        const { data: updatedUser, error: updateError } = await supabase.auth.admin.updateUserById(
          agent.user_id,
          { password: newPassword }
        );

        if (updateError) {
          console.error(`Error updating password for agent ${agent.id}:`, updateError);
          continue;
        }

        // Update first_login_password_changed flag
        const { error: agentUpdateError } = await supabase
          .from('agents')
          .update({ first_login_password_changed: false })
          .eq('id', agent.id);

        if (agentUpdateError) {
          console.error(`Error updating agent flag for ${agent.id}:`, agentUpdateError);
        }

        updatedAgents.push({
          agent_id: agent.id,
          user_id: agent.user_id,
          email: agent.profiles?.email,
          display_name: agent.profiles?.display_name
        });

        console.log(`Successfully reset password for agent: ${agent.profiles?.display_name || agent.user_id}`);
      } catch (error: any) {
        console.error(`Failed to update agent ${agent.id}:`, error.message);
      }
    }

    console.log(`Password reset complete. Updated ${updatedAgents.length} of ${agents.length} agents`);

    return new Response(
      JSON.stringify({
        success: true,
        message: `Successfully reset passwords for ${updatedAgents.length} agents to "Password123!"`,
        newPassword: newPassword,
        updatedAgents
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error: any) {
    console.error('Error in reset-agent-passwords function:', error);
    return new Response(
      JSON.stringify({ 
        success: false,
        error: error.message 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400 
      }
    );
  }
});
