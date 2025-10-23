import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertCircle, TrendingUp, Clock } from "lucide-react";
import { Lead } from "@/data/dummyLeads";
import { cn } from "@/lib/utils";

interface PriorityQueueCardProps {
  urgent: Lead[];
  highValue: Lead[];
  expiring: Lead[];
  onViewAll: () => void;
  onLeadClick: (leadId: string) => void;
}

export function PriorityQueueCard({ 
  urgent, 
  highValue, 
  expiring, 
  onViewAll, 
  onLeadClick 
}: PriorityQueueCardProps) {
  const totalPriority = urgent.length + highValue.length + expiring.length;

  const PriorityItem = ({ lead, icon: Icon, reason }: { lead: Lead; icon: any; reason: string }) => (
    <div
      onClick={() => onLeadClick(lead.id)}
      className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors group"
    >
      <Icon className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-medium text-sm truncate">{lead.name}</span>
          <Badge variant="outline" className="text-xs">
            {lead.source}
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground truncate">{reason}</p>
      </div>
      <span className="text-xs text-muted-foreground whitespace-nowrap">
        {formatTimeAgo(lead.lastContact)}
      </span>
    </div>
  );

  return (
    <Card className="border-l-4 border-l-red-500 bg-gradient-to-r from-red-50/50 via-orange-50/50 to-yellow-50/50 dark:from-red-950/20 dark:via-orange-950/20 dark:to-yellow-950/20">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
            Priority Queue
          </CardTitle>
          <Badge variant="destructive" className="animate-pulse">
            {totalPriority} items
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Urgent Actions */}
        {urgent.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium text-red-600 dark:text-red-400">
              <AlertCircle className="h-4 w-4" />
              Urgent Actions ({urgent.length})
            </div>
            <div className="space-y-1">
              {urgent.slice(0, 3).map(lead => (
                <PriorityItem
                  key={lead.id}
                  lead={lead}
                  icon={AlertCircle}
                  reason={lead.stage === 'no-reply' ? 'No reply - final attempt' : 'Qualified but unassigned'}
                />
              ))}
            </div>
          </div>
        )}

        {/* High Value Leads */}
        {highValue.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium text-orange-600 dark:text-orange-400">
              <TrendingUp className="h-4 w-4" />
              High Value ({highValue.length})
            </div>
            <div className="space-y-1">
              {highValue.slice(0, 2).map(lead => (
                <PriorityItem
                  key={lead.id}
                  lead={lead}
                  icon={TrendingUp}
                  reason={`${lead.budget} • AI Score ${Math.round((lead.aiScore || 0) * 100)}%`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Expiring Soon */}
        {expiring.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium text-yellow-600 dark:text-yellow-400">
              <Clock className="h-4 w-4" />
              Expiring Soon ({expiring.length})
            </div>
            <div className="space-y-1">
              {expiring.slice(0, 3).map(lead => (
                <PriorityItem
                  key={lead.id}
                  lead={lead}
                  icon={Clock}
                  reason={`Next action: ${formatTimeUntil(lead.nextAction!)}`}
                />
              ))}
            </div>
          </div>
        )}

        <Button 
          variant="outline" 
          size="sm" 
          className="w-full hover:bg-gradient-to-r hover:from-red-50 hover:to-orange-50 dark:hover:from-red-950 dark:hover:to-orange-950"
          onClick={onViewAll}
        >
          View All Priority Items ({totalPriority})
        </Button>
      </CardContent>
    </Card>
  );
}

function formatTimeAgo(date: Date): string {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  
  if (seconds < 60) return 'Just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}

function formatTimeUntil(date: Date): string {
  const seconds = Math.floor((date.getTime() - new Date().getTime()) / 1000);
  
  if (seconds < 0) return 'Overdue';
  if (seconds < 3600) return `${Math.floor(seconds / 60)} mins`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours`;
  return `${Math.floor(seconds / 86400)} days`;
}
