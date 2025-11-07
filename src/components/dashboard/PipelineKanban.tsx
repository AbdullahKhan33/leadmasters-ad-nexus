import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface Lead {
  id: string;
  name: string;
  value?: number;
  source?: string;
  status?: string;
}

interface PipelineStage {
  id: string;
  title: string;
  leads: Lead[];
  color: string;
}

interface PipelineKanbanProps {
  stages: PipelineStage[];
  onLeadClick?: (leadId: string) => void;
  onViewAll?: (stageId: string) => void;
  isLoading?: boolean;
}

export function PipelineKanban({ stages, onLeadClick, onViewAll, isLoading }: PipelineKanbanProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Sales Pipeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="space-y-2 animate-pulse">
                <div className="h-6 bg-muted rounded" />
                <div className="h-32 bg-muted rounded" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales Pipeline</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {stages.map((stage) => (
            <div key={stage.id} className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={cn("h-2 w-2 rounded-full", stage.color)} />
                  <h3 className="font-semibold text-sm">{stage.title}</h3>
                </div>
                <Badge variant="secondary">{stage.leads.length}</Badge>
              </div>

              <ScrollArea className="h-[400px]">
                <div className="space-y-2 pr-4">
                  {stage.leads.slice(0, 10).map((lead) => (
                    <div
                      key={lead.id}
                      onClick={() => onLeadClick?.(lead.id)}
                      className="p-3 rounded-lg bg-muted/30 hover:bg-muted/60 cursor-pointer transition-all group border border-transparent hover:border-border"
                    >
                      <p className="font-medium text-sm truncate">{lead.name}</p>
                      {lead.value && (
                        <p className="text-xs text-muted-foreground mt-1">
                          ${lead.value.toLocaleString()}
                        </p>
                      )}
                      {lead.status && (
                        <Badge variant="outline" className="mt-2 text-xs">
                          {lead.status}
                        </Badge>
                      )}
                    </div>
                  ))}
                  {stage.leads.length > 10 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full"
                      onClick={() => onViewAll?.(stage.id)}
                    >
                      +{stage.leads.length - 10} more
                    </Button>
                  )}
                </div>
              </ScrollArea>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
