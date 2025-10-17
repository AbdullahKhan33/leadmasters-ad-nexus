import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";
import { Resend } from "npm:resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface SendCampaignRequest {
  campaignId: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { campaignId }: SendCampaignRequest = await req.json();

    console.log(`Processing campaign: ${campaignId}`);

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch campaign details
    const { data: campaign, error: campaignError } = await supabase
      .from("campaigns")
      .select("*")
      .eq("id", campaignId)
      .single();

    if (campaignError || !campaign) {
      throw new Error(`Campaign not found: ${campaignError?.message}`);
    }

    console.log(`Campaign found: ${campaign.name}, type: ${campaign.type}`);

    // Only process email campaigns
    if (campaign.type !== "email") {
      throw new Error("Only email campaigns are supported by this function");
    }

    // Fetch recipients for this campaign
    const { data: recipients, error: recipientsError } = await supabase
      .from("campaign_recipients")
      .select(`
        id,
        lead_id,
        leads (
          name,
          email
        )
      `)
      .eq("campaign_id", campaignId)
      .eq("status", "pending");

    if (recipientsError) {
      throw new Error(`Failed to fetch recipients: ${recipientsError.message}`);
    }

    console.log(`Found ${recipients?.length || 0} recipients to process`);

    if (!recipients || recipients.length === 0) {
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: "No pending recipients found",
          sent: 0
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Process emails
    let successCount = 0;
    let failureCount = 0;

    for (const recipient of recipients) {
      const lead = recipient.leads as any;
      
      if (!lead?.email) {
        console.log(`Skipping recipient ${recipient.id}: No email address`);
        await supabase
          .from("campaign_recipients")
          .update({
            status: "failed",
            failed_reason: "No email address",
          })
          .eq("id", recipient.id);
        failureCount++;
        continue;
      }

      try {
        // Send email via Resend
        const emailResponse = await resend.emails.send({
          from: "LeadMasters <onboarding@resend.dev>",
          to: [lead.email],
          subject: campaign.subject || "Message from LeadMasters",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2>Hello ${lead.name || "there"}!</h2>
              <div style="line-height: 1.6; white-space: pre-wrap;">
                ${campaign.message_content}
              </div>
              <hr style="margin-top: 30px; border: none; border-top: 1px solid #eee;">
              <p style="color: #666; font-size: 12px;">
                This email was sent from LeadMasters campaign system.
              </p>
            </div>
          `,
        });

        console.log(`Email sent successfully to ${lead.email}:`, emailResponse);

        // Update recipient status to sent
        await supabase
          .from("campaign_recipients")
          .update({
            status: "sent",
            sent_at: new Date().toISOString(),
            metadata: { resend_id: emailResponse.id },
          })
          .eq("id", recipient.id);

        successCount++;
      } catch (error: any) {
        console.error(`Failed to send email to ${lead.email}:`, error);

        // Update recipient status to failed
        await supabase
          .from("campaign_recipients")
          .update({
            status: "failed",
            failed_reason: error.message || "Unknown error",
          })
          .eq("id", recipient.id);

        failureCount++;
      }
    }

    // Update campaign status
    const { error: updateError } = await supabase
      .from("campaigns")
      .update({
        status: "sent",
        sent_at: new Date().toISOString(),
      })
      .eq("id", campaignId);

    if (updateError) {
      console.error("Failed to update campaign status:", updateError);
    }

    console.log(`Campaign processing complete: ${successCount} sent, ${failureCount} failed`);

    return new Response(
      JSON.stringify({
        success: true,
        sent: successCount,
        failed: failureCount,
        total: recipients.length,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-campaign-emails function:", error);
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
