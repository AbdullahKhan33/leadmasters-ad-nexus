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

  const topPriorityLeads = [...urgent.slice(0, 2), ...highValue.slice(0, 1)].slice(0, 3);

  return (
    <Card className="border-l-4 border-l-red-500 bg-gradient-to-br from-red-50/50 to-orange-50/50 dark:from-red-950/20 dark:to-orange-950/20">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
            Priority Queue
          </CardTitle>
          <Badge variant="destructive" className="animate-pulse">
            {totalPriority}
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          Needs immediate attention
        </p>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Top Priority Leads Preview */}
        <div className="space-y-2">
          {topPriorityLeads.length > 0 ? (
            topPriorityLeads.map(lead => {
              const Icon = urgent.includes(lead) ? AlertCircle : TrendingUp;
              return (
                <div
                  key={lead.id}
                  onClick={() => onLeadClick(lead.id)}
                  className="flex items-center gap-2 p-2 rounded-md hover:bg-muted/50 cursor-pointer transition-colors group"
                >
                  <Icon className="h-3.5 w-3.5 text-red-500" />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm truncate">{lead.name}</div>
                    <div className="text-xs text-muted-foreground truncate">{lead.source}</div>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-xs text-muted-foreground text-center py-2">No priority items</p>
          )}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t">
          <div className="text-center">
            <div className="text-lg font-bold text-red-600 dark:text-red-400">{urgent.length}</div>
            <div className="text-xs text-muted-foreground">Urgent</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-orange-600 dark:text-orange-400">{highValue.length}</div>
            <div className="text-xs text-muted-foreground">High Value</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-yellow-600 dark:text-yellow-400">{expiring.length}</div>
            <div className="text-xs text-muted-foreground">Expiring</div>
          </div>
        </div>

        <Button 
          variant="outline" 
          size="sm" 
          className="w-full mt-2"
          onClick={onViewAll}
        >
          View All ({totalPriority})
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
