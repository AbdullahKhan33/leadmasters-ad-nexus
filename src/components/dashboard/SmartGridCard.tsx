import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

interface SmartGridCardProps {
  title: string;
  icon: LucideIcon;
  value: string | number;
  subtitle?: string;
  trend?: {
    value: string;
    positive: boolean;
  };
  progress?: number;
  gradient: string;
  onClick?: () => void;
}

export function SmartGridCard({
  title,
  icon: Icon,
  value,
  subtitle,
  trend,
  progress,
  gradient,
  onClick,
}: SmartGridCardProps) {
  return (
    <Card
      className={cn(
        "relative overflow-hidden border-2 transition-all hover:shadow-lg hover:scale-105 hover:border-primary/40",
        onClick && "cursor-pointer"
      )}
      onClick={onClick}
    >
      {/* Holographic border effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-purple-500/5 to-transparent pointer-events-none rounded-lg" />
      
      {/* Gradient mesh background */}
      <div className={cn("absolute inset-0 opacity-5", gradient)} />

      <CardHeader className="relative pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {title}
          </CardTitle>
          <div className={cn("p-2 rounded-lg", gradient, "bg-opacity-10")}>
            <Icon className="h-4 w-4" />
          </div>
        </div>
      </CardHeader>

      <CardContent className="relative space-y-3">
        <div className="space-y-1">
          <div className="text-3xl font-bold">{value}</div>
          {subtitle && (
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          )}
        </div>

        {trend && (
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "text-xs font-medium",
                trend.positive ? "text-green-600" : "text-red-600"
              )}
            >
              {trend.positive ? "↑" : "↓"} {trend.value}
            </span>
            <span className="text-xs text-muted-foreground">vs last period</span>
          </div>
        )}

        {progress !== undefined && (
          <div className="space-y-1">
            <Progress value={progress} className="h-2" />
            <p className="text-xs text-muted-foreground text-right">
              {progress}% of target
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
