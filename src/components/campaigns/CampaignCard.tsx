import { Campaign } from "@/types/campaigns";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Mail, MessageSquare, Calendar, Users, Eye, MousePointerClick, AlertCircle, Copy, Trash2, BarChart3 } from "lucide-react";
import { format } from "date-fns";

interface CampaignCardProps {
  campaign: Campaign;
  onDuplicate: (id: string) => void;
  onDelete: (id: string) => void;
  onViewAnalytics: (id: string) => void;
}

export function CampaignCard({ campaign, onDuplicate, onDelete, onViewAnalytics }: CampaignCardProps) {
  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: "default" | "secondary" | "destructive" | "outline"; label: string }> = {
      draft: { variant: "outline", label: "Draft" },
      scheduled: { variant: "secondary", label: "Scheduled" },
      sending: { variant: "default", label: "Sending" },
      sent: { variant: "default", label: "Sent" },
      paused: { variant: "secondary", label: "Paused" },
      failed: { variant: "destructive", label: "Failed" },
    };
    
    const config = variants[status] || variants.draft;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const calculateRate = (count: number, total: number) => {
    if (!total) return "0%";
    return `${Math.round((count / total) * 100)}%`;
  };

  return (
    <Card className="p-5 bg-white/80 backdrop-blur-sm border-gray-200/60 hover:shadow-lg transition-all duration-200 animate-fade-in">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-br from-blue-50 to-purple-50 border border-purple-200/40">
            {campaign.type === 'email' ? (
              <Mail className="w-5 h-5 text-purple-600" />
            ) : (
              <MessageSquare className="w-5 h-5 text-purple-600" />
            )}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">{campaign.name}</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              {campaign.status === 'sent' && campaign.sent_at ? (
                <>
                  <Calendar className="w-4 h-4" />
                  <span>Sent {format(new Date(campaign.sent_at), "MMM d, yyyy 'at' h:mm a")}</span>
                </>
              ) : campaign.status === 'scheduled' && campaign.scheduled_at ? (
                <>
                  <Calendar className="w-4 h-4" />
                  <span>Scheduled for {format(new Date(campaign.scheduled_at), "MMM d, yyyy 'at' h:mm a")}</span>
                </>
              ) : (
                <span>{getStatusBadge(campaign.status)}</span>
              )}
            </div>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onViewAnalytics(campaign.id)}>
              <BarChart3 className="w-4 h-4 mr-2" />
              View Analytics
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDuplicate(campaign.id)}>
              <Copy className="w-4 h-4 mr-2" />
              Duplicate
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDelete(campaign.id)} className="text-destructive">
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Metrics */}
      {campaign.status === 'sent' && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-4 border-t border-gray-200/60">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-muted-foreground" />
            <div>
              <div className="text-sm font-semibold text-gray-900">{campaign.recipient_count || 0}</div>
              <div className="text-xs text-muted-foreground">Recipients</div>
            </div>
          </div>

          {campaign.type === 'email' && (
            <>
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-blue-600" />
                <div>
                  <div className="text-sm font-semibold text-gray-900">
                    {campaign.opened_count || 0} 
                    <span className="text-xs text-muted-foreground ml-1">
                      ({calculateRate(campaign.opened_count || 0, campaign.recipient_count || 0)})
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground">Opens</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <MousePointerClick className="w-4 h-4 text-purple-600" />
                <div>
                  <div className="text-sm font-semibold text-gray-900">
                    {campaign.clicked_count || 0}
                    <span className="text-xs text-muted-foreground ml-1">
                      ({calculateRate(campaign.clicked_count || 0, campaign.recipient_count || 0)})
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground">Clicks</div>
                </div>
              </div>
            </>
          )}

          {campaign.failed_count ? (
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-destructive" />
              <div>
                <div className="text-sm font-semibold text-gray-900">{campaign.failed_count}</div>
                <div className="text-xs text-muted-foreground">Failed</div>
              </div>
            </div>
          ) : null}
        </div>
      )}

      {campaign.status === 'draft' && (
        <div className="pt-4 border-t border-gray-200/60">
          <p className="text-sm text-muted-foreground">Draft - Ready to configure and send</p>
        </div>
      )}
    </Card>
  );
}
