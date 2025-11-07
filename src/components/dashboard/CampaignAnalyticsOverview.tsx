import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Users, MousePointer, DollarSign } from "lucide-react";

export function CampaignAnalyticsOverview() {
  // Mock data for now - in a real app, this would come from actual campaign analytics
  const totalLeads = 2847;
  const conversionRate = 3.2;
  const clickThroughRate = 2.8;
  const totalRevenue = 124500;

  const metrics = [
    {
      title: "Total Reach",
      value: `${totalLeads.toLocaleString()}`,
      trend: "+12.3%",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Conversion Rate",
      value: `${conversionRate}%`,
      trend: "+2.1%",
      icon: TrendingUp,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Click Rate",
      value: `${clickThroughRate}%`,
      trend: "+5.4%",
      icon: MousePointer,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Total Revenue",
      value: `$${totalRevenue.toLocaleString()}`,
      trend: "+18.2%",
      icon: DollarSign,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
    },
  ];

  return (
    <Card className="border border-border shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">Campaign Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <div key={metric.title} className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className={`p-2 rounded-lg ${metric.bgColor}`}>
                    <Icon className={`w-4 h-4 ${metric.color}`} />
                  </div>
                  <span className="text-xs font-medium text-muted-foreground">{metric.title}</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-foreground">{metric.value}</span>
                  <span className="text-xs font-medium text-green-600">{metric.trend}</span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
