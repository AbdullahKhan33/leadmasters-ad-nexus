import { Lead } from "@/data/dummyLeads";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { AlertCircle, TrendingUp, Clock, ChevronDown } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface PriorityItemsViewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  urgent: Lead[];
  highValue: Lead[];
  expiring: Lead[];
  onLeadClick: (leadId: string) => void;
}

export function PriorityItemsView({
  open,
  onOpenChange,
  urgent,
  highValue,
  expiring,
  onLeadClick
}: PriorityItemsViewProps) {
  const [urgentOpen, setUrgentOpen] = useState(true);
  const [highValueOpen, setHighValueOpen] = useState(true);
  const [expiringOpen, setExpiringOpen] = useState(true);

  const LeadRow = ({ lead, reason, icon: Icon }: { lead: Lead; reason: string; icon: any }) => (
    <div
      onClick={() => onLeadClick(lead.id)}
      className="flex items-center gap-3 p-3 border-b last:border-b-0 hover:bg-muted/50 cursor-pointer group"
    >
      <Icon className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors shrink-0" />
      <div className="flex-1 min-w-0 grid grid-cols-1 sm:grid-cols-3 gap-2">
        <div>
          <div className="font-medium text-sm truncate">{lead.name}</div>
          <div className="text-xs text-muted-foreground">{lead.phone}</div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs">{lead.source}</Badge>
          <Badge 
            variant={lead.priority === 'urgent' ? 'destructive' : 'outline'}
            className="text-xs"
          >
            {lead.priority}
          </Badge>
        </div>
        <div className="text-sm text-muted-foreground truncate">{reason}</div>
      </div>
      <div className="flex gap-2 shrink-0">
        <Button size="sm" variant="ghost" onClick={(e) => e.stopPropagation()}>
          Reassign
        </Button>
        <Button size="sm" variant="ghost" onClick={(e) => e.stopPropagation()}>
          Snooze
        </Button>
      </div>
    </div>
  );

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-3xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
            Priority Items
          </SheetTitle>
          <SheetDescription>
            {urgent.length + highValue.length + expiring.length} items requiring attention
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-4">
          {/* Urgent Actions */}
          {urgent.length > 0 && (
            <Collapsible open={urgentOpen} onOpenChange={setUrgentOpen}>
              <div className="border rounded-lg overflow-hidden">
                <CollapsibleTrigger className="w-full flex items-center justify-between p-4 bg-red-50 dark:bg-red-950/20 hover:bg-red-100 dark:hover:bg-red-950/30 transition-colors">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                    <span className="font-semibold text-red-600 dark:text-red-400">
                      Urgent Actions
                    </span>
                    <Badge variant="destructive" className="animate-pulse">
                      {urgent.length}
                    </Badge>
                  </div>
                  <ChevronDown className={cn(
                    "h-4 w-4 transition-transform",
                    urgentOpen && "rotate-180"
                  )} />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  {urgent.map(lead => (
                    <LeadRow
                      key={lead.id}
                      lead={lead}
                      icon={AlertCircle}
                      reason={
                        lead.stage === 'no-reply' 
                          ? 'No reply - final attempt' 
                          : 'Qualified but unassigned'
                      }
                    />
                  ))}
                </CollapsibleContent>
              </div>
            </Collapsible>
          )}

          {/* High Value Leads */}
          {highValue.length > 0 && (
            <Collapsible open={highValueOpen} onOpenChange={setHighValueOpen}>
              <div className="border rounded-lg overflow-hidden">
                <CollapsibleTrigger className="w-full flex items-center justify-between p-4 bg-orange-50 dark:bg-orange-950/20 hover:bg-orange-100 dark:hover:bg-orange-950/30 transition-colors">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                    <span className="font-semibold text-orange-600 dark:text-orange-400">
                      High Value Leads
                    </span>
                    <Badge className="bg-orange-600">
                      {highValue.length}
                    </Badge>
                  </div>
                  <ChevronDown className={cn(
                    "h-4 w-4 transition-transform",
                    highValueOpen && "rotate-180"
                  )} />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  {highValue.map(lead => (
                    <LeadRow
                      key={lead.id}
                      lead={lead}
                      icon={TrendingUp}
                      reason={`${lead.budget} • AI Score ${Math.round((lead.aiScore || 0) * 100)}%`}
                    />
                  ))}
                </CollapsibleContent>
              </div>
            </Collapsible>
          )}

          {/* Expiring Soon */}
          {expiring.length > 0 && (
            <Collapsible open={expiringOpen} onOpenChange={setExpiringOpen}>
              <div className="border rounded-lg overflow-hidden">
                <CollapsibleTrigger className="w-full flex items-center justify-between p-4 bg-yellow-50 dark:bg-yellow-950/20 hover:bg-yellow-100 dark:hover:bg-yellow-950/30 transition-colors">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                    <span className="font-semibold text-yellow-600 dark:text-yellow-400">
                      Expiring Soon
                    </span>
                    <Badge className="bg-yellow-600">
                      {expiring.length}
                    </Badge>
                  </div>
                  <ChevronDown className={cn(
                    "h-4 w-4 transition-transform",
                    expiringOpen && "rotate-180"
                  )} />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  {expiring.map(lead => (
                    <LeadRow
                      key={lead.id}
                      lead={lead}
                      icon={Clock}
                      reason={`Next action: ${formatTimeUntil(lead.nextAction!)}`}
                    />
                  ))}
                </CollapsibleContent>
              </div>
            </Collapsible>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

function formatTimeUntil(date: Date): string {
  const seconds = Math.floor((date.getTime() - new Date().getTime()) / 1000);
  
  if (seconds < 0) return 'Overdue';
  if (seconds < 3600) return `${Math.floor(seconds / 60)} mins`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours`;
  return `${Math.floor(seconds / 86400)} days`;
}
