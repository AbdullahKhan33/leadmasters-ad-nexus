import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Flame, MessageSquare, Clock, TrendingUp, ChevronRight } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface WhatsAppMetricsRowProps {
  qualifiedLeads: number;
  activeChats: number;
  agingLeads: number;
  responseRate: number;
  totalLeads: number;
  isLoading: boolean;
  onNavigate: (view: string, filter?: any) => void;
}

export function WhatsAppMetricsRow({
  qualifiedLeads,
  activeChats,
  agingLeads,
  responseRate,
  totalLeads,
  isLoading,
  onNavigate,
}: WhatsAppMetricsRowProps) {
  const metrics = [
    {
      icon: Flame,
      label: "Hot Leads",
      value: qualifiedLeads,
      description: "Qualified",
      color: "from-red-500 to-orange-500",
      bgColor: "from-red-50 to-orange-50",
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
      action: "Contact",
      onClick: () => onNavigate("crm", { status: "Qualified", source: "whatsapp" }),
      progress: totalLeads > 0 ? (qualifiedLeads / totalLeads) * 100 : 0,
    },
    {
      icon: MessageSquare,
      label: "Active Chats",
      value: activeChats,
      description: "In Progress",
      color: "from-green-500 to-emerald-500",
      bgColor: "from-green-50 to-emerald-50",
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      action: "Reply",
      onClick: () => onNavigate("crm", { status: "Active", source: "whatsapp" }),
      progress: totalLeads > 0 ? (activeChats / totalLeads) * 100 : 0,
    },
    {
      icon: Clock,
      label: "Aging Leads",
      value: agingLeads,
      description: "Need Reply",
      color: "from-amber-500 to-yellow-500",
      bgColor: "from-amber-50 to-yellow-50",
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
      action: "View",
      onClick: () => onNavigate("crm", { aging: true, source: "whatsapp" }),
      progress: totalLeads > 0 ? (agingLeads / totalLeads) * 100 : 0,
    },
    {
      icon: TrendingUp,
      label: "Response Rate",
      value: responseRate,
      description: "This Week",
      color: "from-blue-500 to-indigo-500",
      bgColor: "from-blue-50 to-indigo-50",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      action: "Improve",
      onClick: () => onNavigate("insights-whatsapp"),
      progress: responseRate,
      isPercentage: true,
    },
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-10 w-10 bg-muted rounded-full mb-4"></div>
              <div className="h-8 bg-muted rounded w-16 mb-2"></div>
              <div className="h-4 bg-muted rounded w-24"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, index) => {
        const Icon = metric.icon;
        return (
          <Card
            key={index}
            className={`group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br ${metric.bgColor}`}
          >
            <CardContent className="p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div className={`w-12 h-12 ${metric.iconBg} rounded-xl flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 ${metric.iconColor}`} />
                </div>
              </div>

              <div>
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {metric.value}
                  {metric.isPercentage && "%"}
                </div>
                <div className="text-sm font-semibold text-gray-700 mb-1">
                  {metric.label}
                </div>
                <div className="text-xs text-muted-foreground">
                  {metric.description}
                </div>
              </div>

              <div className="space-y-2">
                <Progress value={metric.progress} className="h-1.5" />
                <Button
                  onClick={metric.onClick}
                  size="sm"
                  className={`w-full bg-gradient-to-r ${metric.color} hover:opacity-90 text-white group/btn`}
                >
                  {metric.action}
                  <ChevronRight className="w-3 h-3 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
