import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface CreateAgentRequest {
  email: string;
  displayName: string;
  phone?: string;
  agentCode: string;
  workspaceIds?: string[];
  status: string;
  permissions: Record<string, boolean>;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Initialize Supabase with service role for admin operations
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );

    const { email, displayName, phone, agentCode, workspaceIds, status, permissions }: CreateAgentRequest = await req.json();

    console.log("Creating agent user:", { email, displayName, agentCode });

    // Check if user already exists
    const { data: existingUsers, error: listError } = await supabaseAdmin.auth.admin.listUsers();
    
    if (listError) {
      console.error("Error checking existing users:", listError);
      throw listError;
    }

    const existingUser = existingUsers.users.find(user => user.email === email);
    
    if (existingUser) {
      return new Response(
        JSON.stringify({ 
          error: `A user with email ${email} already exists. Please use a different email address.` 
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Create user with admin privileges (no password - will be set via reset link)
    const { data: userData, error: userError } = await supabaseAdmin.auth.admin.createUser({
      email,
      email_confirm: true,
      user_metadata: {
        display_name: displayName,
      },
    });

    if (userError) {
      console.error("Error creating user:", userError);
      throw userError;
    }

    console.log("User created successfully:", userData.user?.id);

    // Update profile with additional information
    const { error: profileError } = await supabaseAdmin
      .from("profiles")
      .update({
        display_name: displayName,
        phone: phone || null,
      })
      .eq("user_id", userData.user.id);

    if (profileError) {
      console.error("Error updating profile:", profileError);
      throw profileError;
    }

    // Check if agent code already exists
    const { data: existingAgent, error: agentCheckError } = await supabaseAdmin
      .from("agents")
      .select("agent_code")
      .eq("agent_code", agentCode)
      .maybeSingle();

    if (agentCheckError) {
      console.error("Error checking existing agent:", agentCheckError);
      throw agentCheckError;
    }

    if (existingAgent) {
      return new Response(
        JSON.stringify({ 
          error: `An agent with code ${agentCode} already exists. Please use a different agent code.` 
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Create agent record
    const { data: agentData, error: agentError } = await supabaseAdmin
      .from("agents")
      .insert({
        user_id: userData.user.id,
        agent_code: agentCode,
        status,
        permissions,
        first_login_password_changed: false, // Track if password has been changed
      })
      .select()
      .maybeSingle();

    if (agentError) {
      console.error("Error creating agent:", agentError);
      console.error("Agent error details:", JSON.stringify(agentError, null, 2));
      return new Response(
        JSON.stringify({ 
          error: `Failed to create agent: ${agentError.message}. Details: ${agentError.details || 'No additional details'}` 
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Assign agent to workspaces if provided
    if (workspaceIds && workspaceIds.length > 0 && agentData) {
      const workspaceAssignments = workspaceIds.map(workspaceId => ({
        agent_id: agentData.id,
        workspace_id: workspaceId,
        assigned_by: userData.user.id, // The user who created the agent
      }));

      const { error: assignmentError } = await supabaseAdmin
        .from("agent_workspaces")
        .insert(workspaceAssignments);

      if (assignmentError) {
        console.error("Error assigning workspaces:", assignmentError);
        // Don't throw here as the agent was created successfully
      }
    }

    // Assign agent role
    const { error: roleError } = await supabaseAdmin
      .from("user_roles")
      .insert({
        user_id: userData.user.id,
        role: "agent",
      });

    if (roleError) {
      console.error("Error assigning agent role:", roleError);
      throw roleError;
    }

    console.log("Agent created successfully:", agentData);

    // Generate password reset link
    const { data: resetData, error: resetError } = await supabaseAdmin.auth.admin.generateLink({
      type: 'recovery',
      email: email,
      options: {
        redirectTo: `${Deno.env.get('SUPABASE_URL')?.replace('.supabase.co', '')}.supabase.co/reset-password`,
      },
    });

    if (resetError) {
      console.error("Error generating reset link:", resetError);
      throw resetError;
    }

    const resetLink = resetData.properties?.action_link;
    console.log("Password reset link generated for agent");

    // Send welcome email with reset link
    const { error: emailError } = await supabaseAdmin.functions.invoke("send-agent-welcome", {
      body: {
        agentName: displayName,
        agentEmail: email,
        agentCode,
        resetLink,
      },
    });

    if (emailError) {
      console.error("Error sending welcome email:", emailError);
      // Don't throw here as the agent was created successfully
    }

    return new Response(JSON.stringify({ 
      success: true, 
      agent: agentData,
      message: 'Agent created successfully. Welcome email sent with password reset link.'
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in create-agent-user function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);