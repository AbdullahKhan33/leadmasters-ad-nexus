import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Send, Pause, Play } from "lucide-react";
import { useCampaigns } from "@/hooks/useCampaigns";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export function CampaignScheduler() {
  const { campaigns, isLoading, updateCampaign } = useCampaigns();
  const { toast } = useToast();

  const scheduledCampaigns = campaigns.filter(
    (c) => c.status === "scheduled" && c.scheduled_at
  );

  const handlePauseCampaign = async (id: string) => {
    await updateCampaign(id, { status: "draft" });
    toast({
      title: "Campaign Paused",
      description: "Campaign has been paused and won't be sent",
    });
  };

  const handleResumeCampaign = async (id: string, scheduledAt: string) => {
    await updateCampaign(id, { status: "scheduled", scheduled_at: scheduledAt });
    toast({
      title: "Campaign Resumed",
      description: "Campaign will be sent at the scheduled time",
    });
  };

  const handleSendNow = async (id: string) => {
    try {
      // Update to send immediately
      await updateCampaign(id, {
        status: "draft",
        scheduled_at: null,
      });

      // Trigger send
      const { data, error } = await supabase.functions.invoke("send-campaign-emails", {
        body: { campaignId: id },
      });

      if (error) throw error;

      toast({
        title: "Campaign Sent",
        description: `Successfully sent ${data.sent} emails`,
      });
    } catch (error: any) {
      console.error("Error sending campaign:", error);
      toast({
        title: "Error",
        description: "Failed to send campaign",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-muted-foreground">Loading scheduled campaigns...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
          Scheduled Campaigns
        </h2>
        <p className="text-muted-foreground mt-1">
          Manage campaigns scheduled to send automatically
        </p>
      </div>

      {scheduledCampaigns.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Calendar className="w-12 h-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No scheduled campaigns</h3>
            <p className="text-sm text-muted-foreground text-center max-w-sm">
              Schedule campaigns to be sent automatically at a specific date and time
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {scheduledCampaigns.map((campaign) => (
            <Card key={campaign.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-lg">{campaign.name}</CardTitle>
                      <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                        {campaign.type}
                      </Badge>
                    </div>
                    <CardDescription className="mt-1">
                      {campaign.subject || "No subject"}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-6 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {format(new Date(campaign.scheduled_at!), "PPP")}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>
                        {format(new Date(campaign.scheduled_at!), "p")}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="font-medium">Recipients:</span>
                    <span>{campaign.recipient_count || 0} leads</span>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleSendNow(campaign.id)}
                      className="flex-1"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Send Now
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePauseCampaign(campaign.id)}
                      className="flex-1"
                    >
                      <Pause className="w-4 h-4 mr-2" />
                      Pause
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-sm flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Automated Processing
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Scheduled campaigns are automatically processed every 15 minutes. Campaigns
            scheduled in the past will be sent immediately when the cron job runs.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
