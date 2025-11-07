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
      gradient: "from-blue-500 via-blue-600 to-blue-700",
    },
    {
      title: "Conversion Rate",
      value: `${conversionRate}%`,
      trend: "+2.1%",
      icon: TrendingUp,
      gradient: "from-green-500 via-green-600 to-green-700",
    },
    {
      title: "Click Rate",
      value: `${clickThroughRate}%`,
      trend: "+5.4%",
      icon: MousePointer,
      gradient: "from-purple-500 via-purple-600 to-purple-700",
    },
    {
      title: "Total Revenue",
      value: `$${totalRevenue.toLocaleString()}`,
      trend: "+18.2%",
      icon: DollarSign,
      gradient: "from-emerald-500 via-emerald-600 to-emerald-700",
    },
  ];

  return (
    <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-background via-muted/20 to-background shadow-xl">
      {/* Premium border effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 opacity-30 rounded-lg" />
      
      <CardHeader className="relative border-b border-border/50">
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
          Campaign Performance
        </CardTitle>
      </CardHeader>
      <CardContent className="relative pt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <div 
                key={metric.title} 
                className="group relative p-5 rounded-xl bg-gradient-to-br from-background to-muted/10 border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg"
              >
                {/* Hover glow */}
                <div className={`absolute inset-0 bg-gradient-to-br ${metric.gradient} opacity-0 group-hover:opacity-5 rounded-xl transition-opacity`} />
                
                <div className="relative space-y-3">
                  <div className="flex items-center justify-between">
                    <div className={`p-2.5 rounded-lg bg-gradient-to-br ${metric.gradient} shadow-md`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                      {metric.trend}
                    </span>
                  </div>
                  
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-1">
                      {metric.title}
                    </p>
                    <p className={`text-3xl font-bold bg-gradient-to-r ${metric.gradient} bg-clip-text text-transparent`}>
                      {metric.value}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
