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

    const { email, displayName, phone, agentCode, status, permissions }: CreateAgentRequest = await req.json();

    console.log("Creating agent user:", { email, displayName, agentCode });

    // Use default password for testing
    const tempPassword = "Password123!";

    // Create user with admin privileges
    const { data: userData, error: userError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password: tempPassword,
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
      .single();

    if (agentError) {
      console.error("Error creating agent:", agentError);
      throw agentError;
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

    // Send welcome email
    const { error: emailError } = await supabaseAdmin.functions.invoke("send-agent-welcome", {
      body: {
        agentName: displayName,
        agentEmail: email,
        agentCode,
        tempPassword,
      },
    });

    if (emailError) {
      console.error("Error sending welcome email:", emailError);
      // Don't throw here as the agent was created successfully
    }

    return new Response(JSON.stringify({ 
      success: true, 
      agent: agentData,
      tempPassword 
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