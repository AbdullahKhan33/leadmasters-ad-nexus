import { Card, CardContent } from "@/components/ui/card";
import { FileText, Play, Pause, CheckCircle } from "lucide-react";

interface CampaignStatusSummaryProps {
  total: number;
  active: number;
  paused: number;
  draft: number;
}

export function CampaignStatusSummary({ total, active, paused, draft }: CampaignStatusSummaryProps) {
  const stats = [
    {
      label: "Total Campaigns",
      value: total,
      icon: FileText,
      bgColor: "bg-primary/10",
      textColor: "text-primary",
    },
    {
      label: "Active",
      value: active,
      icon: Play,
      bgColor: "bg-emerald-500/10",
      textColor: "text-emerald-600",
    },
    {
      label: "Paused",
      value: paused,
      icon: Pause,
      bgColor: "bg-amber-500/10",
      textColor: "text-amber-600",
    },
    {
      label: "Draft",
      value: draft,
      icon: CheckCircle,
      bgColor: "bg-muted",
      textColor: "text-muted-foreground",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.label}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 ${stat.textColor}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
