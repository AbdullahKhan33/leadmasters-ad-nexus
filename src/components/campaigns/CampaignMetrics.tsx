import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Campaign } from "@/types/campaigns";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Mail, Send, Eye, MousePointerClick, XCircle, Calendar } from "lucide-react";

interface CampaignMetricsProps {
  campaign: Campaign;
}

export function CampaignMetrics({ campaign }: CampaignMetricsProps) {
  const deliveryRate = campaign.recipient_count
    ? ((campaign.delivered_count || 0) / campaign.recipient_count * 100).toFixed(1)
    : "0";
  
  const openRate = campaign.delivered_count
    ? ((campaign.opened_count || 0) / campaign.delivered_count * 100).toFixed(1)
    : "0";
  
  const clickRate = campaign.opened_count
    ? ((campaign.clicked_count || 0) / campaign.opened_count * 100).toFixed(1)
    : "0";

  const bounceRate = campaign.recipient_count
    ? ((campaign.failed_count || 0) / campaign.recipient_count * 100).toFixed(1)
    : "0";

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              {campaign.name}
              <Badge variant="secondary" className="text-xs">
                {campaign.type}
              </Badge>
            </CardTitle>
            <CardDescription className="flex items-center gap-2 mt-1">
              <Calendar className="w-3 h-3" />
              {campaign.sent_at ? format(new Date(campaign.sent_at), "PPP 'at' p") : "Not sent"}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
              <Send className="w-3 h-3" />
              <span className="text-xs">Sent</span>
            </div>
            <div className="text-2xl font-bold">{campaign.recipient_count || 0}</div>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
              <Mail className="w-3 h-3" />
              <span className="text-xs">Delivered</span>
            </div>
            <div className="text-2xl font-bold text-green-600">{deliveryRate}%</div>
            <div className="text-xs text-muted-foreground">
              {campaign.delivered_count || 0}
            </div>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
              <Eye className="w-3 h-3" />
              <span className="text-xs">Opened</span>
            </div>
            <div className="text-2xl font-bold text-blue-600">{openRate}%</div>
            <div className="text-xs text-muted-foreground">
              {campaign.opened_count || 0}
            </div>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
              <MousePointerClick className="w-3 h-3" />
              <span className="text-xs">Clicked</span>
            </div>
            <div className="text-2xl font-bold text-purple-600">{clickRate}%</div>
            <div className="text-xs text-muted-foreground">
              {campaign.clicked_count || 0}
            </div>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
              <XCircle className="w-3 h-3" />
              <span className="text-xs">Bounced</span>
            </div>
            <div className="text-2xl font-bold text-red-600">{bounceRate}%</div>
            <div className="text-xs text-muted-foreground">
              {campaign.failed_count || 0}
            </div>
          </div>
        </div>

        {campaign.subject && (
          <div className="mt-4 pt-4 border-t">
            <div className="text-xs text-muted-foreground mb-1">Subject</div>
            <div className="text-sm font-medium">{campaign.subject}</div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
