import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@4.0.0";
import React from 'npm:react@18.3.1';
import { renderAsync } from 'npm:@react-email/components@0.0.22';
import { AgentWelcomeEmail } from './templates/agent-welcome.tsx';

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface AgentWelcomeRequest {
  agentName: string;
  agentEmail: string;
  agentCode: string;
  tempPassword: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { agentName, agentEmail, agentCode, tempPassword }: AgentWelcomeRequest = await req.json();

    const loginUrl = `${Deno.env.get('SUPABASE_URL')?.replace('.supabase.co', '')}.supabase.co/auth`;

    const html = await renderAsync(
      React.createElement(AgentWelcomeEmail, {
        agentName,
        agentCode,
        loginUrl,
        tempPassword,
      })
    );

    const emailResponse = await resend.emails.send({
      from: "LeadMasters <onboarding@resend.dev>",
      to: [agentEmail],
      subject: "Welcome to LeadMasters - Your Agent Account is Ready",
      html,
    });

    console.log("Agent welcome email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-agent-welcome function:", error);
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