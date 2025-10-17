import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Processing scheduled campaigns...");

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Find campaigns that are scheduled and ready to send
    const now = new Date().toISOString();
    const { data: scheduledCampaigns, error: fetchError } = await supabase
      .from("campaigns")
      .select("*")
      .eq("status", "scheduled")
      .lte("scheduled_at", now)
      .is("sent_at", null);

    if (fetchError) {
      throw new Error(`Failed to fetch scheduled campaigns: ${fetchError.message}`);
    }

    console.log(`Found ${scheduledCampaigns?.length || 0} campaigns ready to send`);

    if (!scheduledCampaigns || scheduledCampaigns.length === 0) {
      return new Response(
        JSON.stringify({
          success: true,
          message: "No campaigns ready to send",
          processed: 0,
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    let successCount = 0;
    let failureCount = 0;

    // Process each scheduled campaign
    for (const campaign of scheduledCampaigns) {
      try {
        console.log(`Processing campaign: ${campaign.id} (${campaign.name})`);

        // Only process email campaigns
        if (campaign.type === "email") {
          // Invoke the send-campaign-emails function
          const { data, error: invokeError } = await supabase.functions.invoke(
            "send-campaign-emails",
            {
              body: { campaignId: campaign.id },
            }
          );

          if (invokeError) {
            throw new Error(`Failed to invoke send function: ${invokeError.message}`);
          }

          console.log(`Campaign ${campaign.id} sent successfully:`, data);
          successCount++;
        } else {
          // For non-email campaigns, just mark as sent for now
          await supabase
            .from("campaigns")
            .update({
              status: "sent",
              sent_at: new Date().toISOString(),
            })
            .eq("id", campaign.id);

          console.log(`Campaign ${campaign.id} marked as sent (non-email type)`);
          successCount++;
        }
      } catch (error: any) {
        console.error(`Failed to process campaign ${campaign.id}:`, error);
        
        // Update campaign status to failed
        await supabase
          .from("campaigns")
          .update({
            status: "draft",
            metadata: {
              ...campaign.metadata,
              last_error: error.message,
              last_attempt: new Date().toISOString(),
            },
          })
          .eq("id", campaign.id);

        failureCount++;
      }
    }

    console.log(
      `Processing complete: ${successCount} successful, ${failureCount} failed`
    );

    return new Response(
      JSON.stringify({
        success: true,
        processed: scheduledCampaigns.length,
        successful: successCount,
        failed: failureCount,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in process-scheduled-campaigns function:", error);
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
