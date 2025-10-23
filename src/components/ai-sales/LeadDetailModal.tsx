import { Lead } from "@/data/dummyLeads";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Phone,
  Mail,
  MapPin,
  Calendar,
  TrendingUp,
  MessageSquare,
  Clock,
  Sparkles,
  User,
  ExternalLink
} from "lucide-react";
import { cn } from "@/lib/utils";

interface LeadDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  lead: Lead | null;
}

const stageColors = {
  new: "bg-blue-500",
  "no-reply": "bg-orange-500",
  qualified: "bg-purple-500",
  nurturing: "bg-green-500",
  "long-term": "bg-gray-500",
  won: "bg-emerald-500"
};

export function LeadDetailModal({ open, onOpenChange, lead }: LeadDetailModalProps) {
  if (!lead) return null;

  const engagementRate = lead.engagement.messagesSent > 0
    ? Math.round((lead.engagement.messagesOpened / lead.engagement.messagesSent) * 100)
    : 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-2xl">{lead.name}</DialogTitle>
              <DialogDescription className="flex items-center gap-2 mt-2">
                <Badge variant="outline">{lead.source}</Badge>
                <Badge 
                  variant={lead.priority === 'urgent' ? 'destructive' : 'outline'}
                  className={cn(
                    lead.priority === 'high' && 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
                  )}
                >
                  {lead.priority}
                </Badge>
                <div className={cn("h-2 w-2 rounded-full", stageColors[lead.stage])} />
                <span className="text-sm capitalize">{lead.stage.replace('-', ' ')}</span>
              </DialogDescription>
            </div>
            {lead.aiScore && (
              <div className="text-right">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {Math.round(lead.aiScore * 100)}%
                </div>
                <div className="text-xs text-muted-foreground">AI Score</div>
              </div>
            )}
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Contact Info */}
          <div className="space-y-3">
            <h3 className="font-semibold flex items-center gap-2">
              <User className="h-4 w-4" />
              Contact Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <a href={`tel:${lead.phone}`} className="text-sm hover:underline">
                  {lead.phone}
                </a>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <a href={`mailto:${lead.email}`} className="text-sm hover:underline truncate">
                  {lead.email}
                </a>
              </div>
            </div>
            {lead.location && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{lead.location}</span>
              </div>
            )}
          </div>

          <Separator />

          {/* AI Insights */}
          {lead.aiScore && (
            <>
              <div className="space-y-3">
                <h3 className="font-semibold flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-purple-600" />
                  AI Insights
                </h3>
                <div className="p-4 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Confidence Score</span>
                    <span className="text-sm font-bold">{Math.round(lead.aiScore * 100)}%</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {lead.aiScore > 0.85 
                      ? "🎯 High conversion probability - prioritize for immediate follow-up"
                      : lead.aiScore > 0.7
                      ? "✅ Good potential - maintain regular engagement"
                      : "⏰ Moderate interest - continue nurturing"}
                  </div>
                  {lead.budget && (
                    <div className="pt-2 border-t border-purple-200 dark:border-purple-800">
                      <div className="text-sm">
                        <span className="text-muted-foreground">Budget: </span>
                        <span className="font-semibold">{lead.budget}</span>
                      </div>
                    </div>
                  )}
                  {lead.timeline && (
                    <div className="text-sm">
                      <span className="text-muted-foreground">Timeline: </span>
                      <span className="font-semibold">{lead.timeline}</span>
                    </div>
                  )}
                </div>
              </div>
              <Separator />
            </>
          )}

          {/* Engagement History */}
          <div className="space-y-3">
            <h3 className="font-semibold flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Engagement
            </h3>
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 rounded-lg bg-muted/50 text-center">
                <div className="text-2xl font-bold">{lead.engagement.messagesSent}</div>
                <div className="text-xs text-muted-foreground">Messages Sent</div>
              </div>
              <div className="p-3 rounded-lg bg-muted/50 text-center">
                <div className="text-2xl font-bold">{lead.engagement.messagesOpened}</div>
                <div className="text-xs text-muted-foreground">Opened</div>
              </div>
              <div className="p-3 rounded-lg bg-muted/50 text-center">
                <div className="text-2xl font-bold">{engagementRate}%</div>
                <div className="text-xs text-muted-foreground">Engagement</div>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <div className="text-sm">
                <span className="text-muted-foreground">Last interaction: </span>
                <span className="font-medium">{formatTimeAgo(lead.lastContact)}</span>
              </div>
            </div>
            {lead.nextAction && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div className="text-sm">
                  <span className="text-muted-foreground">Next action: </span>
                  <span className="font-medium">{formatTimeUntil(lead.nextAction)}</span>
                </div>
              </div>
            )}
          </div>

          <Separator />

          {/* Assignment */}
          <div className="space-y-3">
            <h3 className="font-semibold flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Assignment & Status
            </h3>
            <div className="p-3 rounded-lg bg-muted/50">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Assigned to:</span>
                <span className="text-sm font-medium">
                  {lead.assignedTo || <span className="italic text-muted-foreground">Unassigned</span>}
                </span>
              </div>
              <div className="mt-2 pt-2 border-t">
                <div className="text-sm">{lead.status}</div>
              </div>
            </div>
            {lead.tags && lead.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {lead.tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-2 pt-4">
            <Button variant="outline" size="sm">
              Change Stage
            </Button>
            <Button variant="outline" size="sm">
              Reassign
            </Button>
            <Button variant="outline" size="sm">
              Add Note
            </Button>
            <Button variant="outline" size="sm">
              Send Message
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              View in CRM
              <ExternalLink className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function formatTimeAgo(date: Date): string {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  
  if (seconds < 60) return 'Just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
  return `${Math.floor(seconds / 86400)} days ago`;
}

function formatTimeUntil(date: Date): string {
  const seconds = Math.floor((date.getTime() - new Date().getTime()) / 1000);
  
  if (seconds < 0) return 'Overdue';
  if (seconds < 3600) return `in ${Math.floor(seconds / 60)} minutes`;
  if (seconds < 86400) return `in ${Math.floor(seconds / 3600)} hours`;
  return `in ${Math.floor(seconds / 86400)} days`;
}
