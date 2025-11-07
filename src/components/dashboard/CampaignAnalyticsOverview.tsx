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
      gradient: "from-blue-500 via-blue-600 to-indigo-600",
    },
    {
      title: "Conversion Rate",
      value: `${conversionRate}%`,
      trend: "+2.1%",
      icon: TrendingUp,
      gradient: "from-green-500 via-emerald-600 to-teal-600",
    },
    {
      title: "Click Rate",
      value: `${clickThroughRate}%`,
      trend: "+5.4%",
      icon: MousePointer,
      gradient: "from-purple-500 via-purple-600 to-pink-600",
    },
    {
      title: "Total Revenue",
      value: `$${totalRevenue.toLocaleString()}`,
      trend: "+18.2%",
      icon: DollarSign,
      gradient: "from-emerald-500 via-green-600 to-teal-600",
    },
  ];

  return (
    <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-background via-muted/5 to-background shadow-2xl">
      {/* Premium border effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/30 via-secondary/30 to-primary/30 opacity-20 rounded-xl" />
      
      {/* Animated gradient orb */}
      <div className="absolute -top-20 -right-20 w-60 h-60 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-3xl animate-pulse-slow" />
      
      <CardHeader className="relative border-b border-border/50 pb-4">
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
          Campaign Performance
        </CardTitle>
      </CardHeader>
      <CardContent className="relative pt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <div 
                key={metric.title} 
                className="group relative p-6 rounded-2xl bg-gradient-to-br from-background to-muted/5 border-2 border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-xl hover:scale-105"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Hover glow */}
                <div className={`absolute inset-0 bg-gradient-to-br ${metric.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500`} />
                
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-2xl" />
                
                <div className="relative space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${metric.gradient} shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xs font-bold text-white bg-gradient-to-r from-green-500 to-emerald-500 px-3 py-1.5 rounded-full shadow-md">
                      {metric.trend}
                    </span>
                  </div>
                  
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                      {metric.title}
                    </p>
                    <p className={`text-4xl font-bold bg-gradient-to-r ${metric.gradient} bg-clip-text text-transparent`}>
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
