import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Lead } from "@/data/dummyLeads";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

const stageConfig = {
  new: {
    title: "New Leads",
    gradient: "from-blue-500 to-blue-600",
    borderColor: "border-l-blue-500"
  },
  "no-reply": {
    title: "No Reply",
    gradient: "from-orange-500 to-orange-600",
    borderColor: "border-l-orange-500"
  },
  qualified: {
    title: "Qualified",
    gradient: "from-purple-500 to-purple-600",
    borderColor: "border-l-purple-500"
  },
  nurturing: {
    title: "Nurturing",
    gradient: "from-green-500 to-green-600",
    borderColor: "border-l-green-500"
  },
  "long-term": {
    title: "Long-Term",
    gradient: "from-gray-500 to-gray-600",
    borderColor: "border-l-gray-500"
  },
  won: {
    title: "Won",
    gradient: "from-emerald-500 to-emerald-600",
    borderColor: "border-l-emerald-500"
  }
};

interface StageSummaryCardProps {
  stage: Lead['stage'];
  leads: Lead[];
  metric: string;
  onViewAll: () => void;
  onLeadClick: (leadId: string) => void;
}

export function StageSummaryCard({ 
  stage, 
  leads, 
  metric, 
  onViewAll, 
  onLeadClick 
}: StageSummaryCardProps) {
  const config = stageConfig[stage];
  const topLeads = leads.slice(0, 3);
  const trend = Math.random() > 0.5 ? 'up' : Math.random() > 0.3 ? 'down' : 'stable';

  return (
    <Card className={cn("border-l-4 hover:shadow-lg transition-shadow", config.borderColor)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <div className={`h-2 w-2 rounded-full bg-gradient-to-r ${config.gradient}`} />
            {config.title}
          </CardTitle>
          <div className="flex items-center gap-2">
            {trend === 'up' && <TrendingUp className="h-3 w-3 text-green-500" />}
            {trend === 'down' && <TrendingDown className="h-3 w-3 text-red-500" />}
            {trend === 'stable' && <Minus className="h-3 w-3 text-muted-foreground" />}
            <Badge 
              variant="secondary" 
              className={cn("bg-gradient-to-r text-white border-0", config.gradient)}
            >
              {leads.length}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Top 3 Leads Preview */}
        <div className="space-y-2">
          {topLeads.map(lead => (
            <div
              key={lead.id}
              onClick={() => onLeadClick(lead.id)}
              className="p-2 rounded-lg bg-muted/30 hover:bg-muted/60 cursor-pointer transition-colors group"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium truncate">{lead.name}</span>
                    {lead.aiScore && lead.aiScore > 0.8 && (
                      <Badge variant="outline" className="text-xs bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950">
                        AI {Math.round(lead.aiScore * 100)}%
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{lead.status}</p>
                </div>
                <Badge variant="outline" className="text-xs shrink-0">
                  {lead.source}
                </Badge>
              </div>
            </div>
          ))}
        </div>

        {/* Key Metric */}
        <div className="py-2 px-3 rounded-lg bg-gradient-to-r from-muted/30 to-muted/10">
          <p className="text-xs text-muted-foreground mb-1">Performance</p>
          <p className="text-sm font-semibold">{metric}</p>
        </div>

        {/* View All Button */}
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full hover:bg-gradient-to-r hover:from-muted hover:to-muted/50"
          onClick={onViewAll}
        >
          View All {leads.length} Leads
        </Button>
      </CardContent>
    </Card>
  );
}
