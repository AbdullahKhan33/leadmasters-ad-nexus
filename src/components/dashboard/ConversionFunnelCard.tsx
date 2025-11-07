import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface FunnelStage {
  label: string;
  count: number;
  color: string;
  onClick?: () => void;
}

interface ConversionFunnelCardProps {
  stages: FunnelStage[];
  isLoading?: boolean;
}

export function ConversionFunnelCard({ stages, isLoading }: ConversionFunnelCardProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Sales Funnel</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 animate-pulse">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-12 bg-muted rounded" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const maxCount = Math.max(...stages.map(s => s.count), 1);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Sales Funnel</span>
          <span className="text-sm font-normal text-muted-foreground">
            {stages.reduce((acc, s) => acc + s.count, 0)} Total Leads
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {stages.map((stage, index) => {
          const percentage = (stage.count / maxCount) * 100;
          const conversionRate = index > 0 
            ? ((stage.count / stages[index - 1].count) * 100).toFixed(1)
            : "100";

          return (
            <div
              key={stage.label}
              className={cn(
                "space-y-2 p-3 rounded-lg transition-all",
                stage.onClick && "cursor-pointer hover:bg-muted/50"
              )}
              onClick={stage.onClick}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={cn("h-3 w-3 rounded-full", stage.color)} />
                  <span className="font-medium">{stage.label}</span>
                </div>
                <div className="flex items-center gap-3">
                  {index > 0 && (
                    <span className="text-xs text-muted-foreground">
                      {conversionRate}% conversion
                    </span>
                  )}
                  <span className="text-lg font-bold">{stage.count}</span>
                </div>
              </div>
              <Progress value={percentage} className="h-2" />
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
