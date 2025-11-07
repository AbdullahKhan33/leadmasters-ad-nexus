import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricData {
  label: string;
  value: string | number;
  trend: "up" | "down" | "stable";
  trendValue?: string;
  onClick?: () => void;
}

interface DashboardMetricsBarProps {
  metrics: MetricData[];
  isLoading?: boolean;
}

export function DashboardMetricsBar({ metrics, isLoading }: DashboardMetricsBarProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="p-4 animate-pulse">
            <div className="h-4 bg-muted rounded w-20 mb-2" />
            <div className="h-8 bg-muted rounded w-16" />
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {metrics.map((metric, index) => (
        <Card
          key={index}
          className={cn(
            "p-4 transition-all hover:shadow-md border-l-4",
            metric.trend === "up" && "border-l-green-500",
            metric.trend === "down" && "border-l-red-500",
            metric.trend === "stable" && "border-l-muted",
            metric.onClick && "cursor-pointer"
          )}
          onClick={metric.onClick}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm text-muted-foreground mb-1">{metric.label}</p>
              <p className="text-2xl font-bold">{metric.value}</p>
            </div>
            <div className="flex flex-col items-end gap-1">
              {metric.trend === "up" && (
                <TrendingUp className="h-5 w-5 text-green-500" />
              )}
              {metric.trend === "down" && (
                <TrendingDown className="h-5 w-5 text-red-500" />
              )}
              {metric.trend === "stable" && (
                <Minus className="h-5 w-5 text-muted-foreground" />
              )}
              {metric.trendValue && (
                <span
                  className={cn(
                    "text-xs font-medium",
                    metric.trend === "up" && "text-green-600",
                    metric.trend === "down" && "text-red-600",
                    metric.trend === "stable" && "text-muted-foreground"
                  )}
                >
                  {metric.trendValue}
                </span>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
