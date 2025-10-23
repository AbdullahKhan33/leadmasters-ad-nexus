import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Circle, LucideIcon } from "lucide-react";

interface IntegrationCardProps {
  name: string;
  icon: LucideIcon;
  isConnected: boolean;
  status?: string;
  stats?: { label: string; value: string }[];
  actionLabel: string;
  isFuture?: boolean;
}

export function IntegrationCard({
  name,
  icon: Icon,
  isConnected,
  status,
  stats,
  actionLabel,
  isFuture
}: IntegrationCardProps) {
  return (
    <Card className={`hover:shadow-lg transition-all duration-200 group relative overflow-hidden ${
      isConnected ? 'border-green-200' : 'border-gray-200'
    }`}>
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity ${
        isConnected 
          ? 'bg-gradient-to-br from-green-50/50 to-emerald-50/30' 
          : 'bg-gradient-to-br from-gray-50/50 to-slate-50/30'
      }`} />
      
      <CardHeader className="relative pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
              isConnected 
                ? 'bg-gradient-to-br from-green-100 to-emerald-100' 
                : 'bg-gradient-to-br from-gray-100 to-slate-100'
            }`}>
              <Icon className={`w-5 h-5 ${isConnected ? 'text-green-600' : 'text-gray-500'}`} />
            </div>
            <div>
              <CardTitle className="text-sm font-semibold">{name}</CardTitle>
              {status && <p className="text-xs text-muted-foreground mt-0.5">{status}</p>}
            </div>
          </div>
          {isConnected ? (
            <CheckCircle2 className="w-5 h-5 text-green-600" />
          ) : isFuture ? (
            <Badge variant="secondary" className="text-xs">Coming Soon</Badge>
          ) : (
            <Circle className="w-5 h-5 text-gray-300" />
          )}
        </div>
      </CardHeader>

      <CardContent className="relative space-y-3">
        {stats && stats.length > 0 && (
          <div className="grid grid-cols-2 gap-2">
            {stats.map((stat, idx) => (
              <div key={idx}>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
                <p className="text-sm font-semibold">{stat.value}</p>
              </div>
            ))}
          </div>
        )}

        <Button 
          size="sm" 
          variant={isConnected ? "outline" : "default"}
          className={`w-full ${
            isConnected 
              ? 'hover:bg-green-50' 
              : 'bg-gradient-to-r from-purple-600 via-pink-600 to-blue-500 hover:opacity-90'
          }`}
          disabled={isFuture}
        >
          {actionLabel}
        </Button>
      </CardContent>
    </Card>
  );
}
