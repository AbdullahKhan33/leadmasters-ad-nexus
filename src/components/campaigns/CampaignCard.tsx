import { Campaign, CampaignFolder } from "@/types/campaigns";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Mail, MessageSquare, Calendar, Users, Eye, MousePointerClick, AlertCircle, Copy, Trash2, BarChart3, FolderInput } from "lucide-react";
import { format } from "date-fns";

interface CampaignCardProps {
  campaign: Campaign;
  onDuplicate: (id: string) => void;
  onDelete: (id: string) => void;
  onViewAnalytics: (id: string) => void;
  onMoveToFolder?: (folderId: string | null) => void;
  availableFolders?: CampaignFolder[];
  currentFolderId?: string | null;
}

export function CampaignCard({ 
  campaign, 
  onDuplicate, 
  onDelete, 
  onViewAnalytics,
  onMoveToFolder,
  availableFolders = [],
  currentFolderId,
}: CampaignCardProps) {
  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: "default" | "secondary" | "destructive" | "outline"; label: string; color: string }> = {
      draft: { variant: "outline", label: "Draft", color: "text-gray-600" },
      scheduled: { variant: "secondary", label: "Scheduled", color: "text-blue-600" },
      sending: { variant: "default", label: "Sending", color: "text-purple-600" },
      sent: { variant: "default", label: "Sent", color: "text-green-600" },
      paused: { variant: "secondary", label: "Paused", color: "text-orange-600" },
      failed: { variant: "destructive", label: "Failed", color: "text-red-600" },
    };
    
    const config = variants[status] || variants.draft;
    return (
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${status === 'sent' ? 'bg-green-500' : status === 'draft' ? 'bg-gray-400' : 'bg-blue-500'}`} />
        <span className={`text-sm font-medium ${config.color}`}>{config.label}</span>
      </div>
    );
  };

  const calculateRate = (count: number, total: number) => {
    if (!total) return "0%";
    return `${Math.round((count / total) * 100)}%`;
  };

  const handleCardClick = (e: React.MouseEvent) => {
    // Don't trigger if clicking on dropdown or its children
    const target = e.target as HTMLElement;
    if (target.closest('[role="menu"]') || target.closest('button[role="combobox"]')) {
      return;
    }
    onViewAnalytics(campaign.id);
  };

  const handleDropdownClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      className="cursor-pointer"
      onClick={handleCardClick}
    >
      <Card 
        className="p-5 bg-white/80 backdrop-blur-sm border-gray-200/60 hover:shadow-lg hover:border-purple-300/60 transition-all duration-200 animate-fade-in"
      >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start gap-3 flex-1">
          <div className="p-2 rounded-lg bg-gradient-to-br from-blue-50 to-purple-50 border border-purple-200/40">
            {campaign.type === 'email' ? (
              <Mail className="w-5 h-5 text-purple-600" />
            ) : (
              <MessageSquare className="w-5 h-5 text-purple-600" />
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-semibold text-gray-900">{campaign.name}</h3>
              {getStatusBadge(campaign.status)}
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              {campaign.status === 'sent' && campaign.sent_at ? (
                <>
                  <span>Sent on {format(new Date(campaign.sent_at), "MMM d, yyyy 'at' h:mm a")}</span>
                </>
              ) : campaign.status === 'scheduled' && campaign.scheduled_at ? (
                <>
                  <Calendar className="w-4 h-4" />
                  <span>Scheduled for {format(new Date(campaign.scheduled_at), "MMM d, yyyy 'at' h:mm a")}</span>
                </>
              ) : campaign.status === 'draft' ? (
                <span>Draft - Ready to configure and send</span>
              ) : null}
            </div>
          </div>
        </div>

        <div onClick={handleDropdownClick}>
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
              {onMoveToFolder && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      <FolderInput className="w-4 h-4 mr-2" />
                      Move to Folder
                    </DropdownMenuSubTrigger>
                    <DropdownMenuSubContent>
                      {currentFolderId && (
                        <DropdownMenuItem onClick={() => onMoveToFolder(null)}>
                          Uncategorized
                        </DropdownMenuItem>
                      )}
                      {availableFolders
                        .filter(f => f.id !== currentFolderId)
                        .map((folder) => (
                          <DropdownMenuItem
                            key={folder.id}
                            onClick={() => onMoveToFolder(folder.id)}
                          >
                            <div
                              className="w-3 h-3 rounded-full mr-2"
                              style={{ backgroundColor: folder.color }}
                            />
                            {folder.name}
                          </DropdownMenuItem>
                        ))}
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>
                  <DropdownMenuSeparator />
                </>
              )}
              <DropdownMenuItem onClick={() => onDelete(campaign.id)} className="text-destructive">
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Metrics - Brevo style */}
      {campaign.status === 'sent' && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 pt-3 border-t border-gray-200/60">
          <div>
            <div className="text-xs text-muted-foreground mb-1">Recipients</div>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-semibold text-gray-900">{campaign.recipient_count || 0}</span>
              <span className="text-xs text-muted-foreground">100%</span>
            </div>
          </div>

          {campaign.type === 'email' && (
            <>
              <div>
                <div className="text-xs text-muted-foreground mb-1">Opens</div>
                <div className="flex items-baseline gap-1">
                  <span className="text-lg font-semibold text-gray-900">{campaign.opened_count || 0}</span>
                  <span className="text-xs text-muted-foreground">
                    {calculateRate(campaign.opened_count || 0, campaign.recipient_count || 0)}
                  </span>
                </div>
              </div>

              <div>
                <div className="text-xs text-muted-foreground mb-1">Clicks</div>
                <div className="flex items-baseline gap-1">
                  <span className="text-lg font-semibold text-gray-900">{campaign.clicked_count || 0}</span>
                  <span className="text-xs text-muted-foreground">
                    {calculateRate(campaign.clicked_count || 0, campaign.recipient_count || 0)}
                  </span>
                </div>
              </div>

              <div>
                <div className="text-xs text-muted-foreground mb-1">Unsubscribed</div>
                <div className="flex items-baseline gap-1">
                  <span className="text-lg font-semibold text-gray-900">0</span>
                  <span className="text-xs text-muted-foreground">0%</span>
                </div>
              </div>
            </>
          )}

          {campaign.failed_count ? (
            <div>
              <div className="text-xs text-muted-foreground mb-1">Failed</div>
              <div className="flex items-baseline gap-1">
                <span className="text-lg font-semibold text-destructive">{campaign.failed_count}</span>
                <span className="text-xs text-muted-foreground">
                  {calculateRate(campaign.failed_count, campaign.recipient_count || 0)}
                </span>
              </div>
            </div>
          ) : null}
        </div>
      )}
    </Card>
    </div>
  );
}
