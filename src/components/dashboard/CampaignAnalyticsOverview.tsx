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
    },
    {
      title: "Conversion Rate",
      value: `${conversionRate}%`,
      trend: "+2.1%",
      icon: TrendingUp,
    },
    {
      title: "Click Rate",
      value: `${clickThroughRate}%`,
      trend: "+5.4%",
      icon: MousePointer,
    },
    {
      title: "Total Revenue",
      value: `$${totalRevenue.toLocaleString()}`,
      trend: "+18.2%",
      icon: DollarSign,
    },
  ];

  return (
    <Card className="border border-border bg-card">
      <CardHeader className="border-b border-border pb-4">
        <CardTitle className="text-xl font-bold text-foreground">
          Campaign Performance
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <div 
                key={metric.title} 
                className="space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-lg bg-primary/10">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                    {metric.trend}
                  </span>
                </div>
                
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">
                    {metric.title}
                  </p>
                  <p className="text-3xl font-bold text-foreground">
                    {metric.value}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
