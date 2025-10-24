import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Users, CheckCircle, Clock, Target } from "lucide-react";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, FunnelChart, Funnel, LabelList } from "recharts";
import { useWorkflowAnalytics } from "@/hooks/useWorkflowAnalytics";
import { Skeleton } from "@/components/ui/skeleton";

const getMetricCards = (analytics: any) => [
  {
    title: "Total Leads Processed",
    value: analytics?.totalLeadsProcessed?.toString() || "0",
    trend: "+23%",
    isPositive: true,
    icon: Users,
    description: "from last week"
  },
  {
    title: "Response Rate",
    value: `${analytics?.responseRate || 0}%`,
    trend: "+5%",
    isPositive: true,
    icon: CheckCircle,
    description: "from last week"
  },
  {
    title: "Qualification Rate",
    value: `${analytics?.qualificationRate || 0}%`,
    trend: "-2%",
    isPositive: false,
    icon: Target,
    description: "from last week"
  },
  {
    title: "Avg Time to Qualify",
    value: `${analytics?.avgTimeToQualify || 0}h`,
    trend: "-30min",
    isPositive: true,
    icon: Clock,
    description: "from last week"
  },
  {
    title: "Conversion Rate (Won)",
    value: `${analytics?.conversionRate || 0}%`,
    trend: "+3%",
    isPositive: true,
    icon: TrendingUp,
    description: "from last week"
  }
];

export function AutomationAnalytics() {
  const { analytics, isLoading } = useWorkflowAnalytics();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {[1, 2, 3, 4, 5].map(i => (
            <Card key={i}>
              <CardHeader><Skeleton className="h-10 w-10" /></CardHeader>
              <CardContent><Skeleton className="h-8 w-20" /></CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  const metricCards = getMetricCards(analytics);
  const funnelData = analytics?.funnelData || [];
  const workflowPerformance = analytics?.workflowPerformance || [];
  const sourceBreakdown = analytics?.sourceBreakdown || [];

  return (
    <div className="space-y-6">
      {/* Top Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {metricCards.map((metric) => {
          const Icon = metric.icon;
          return (
            <Card key={metric.title} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
                    metric.isPositive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {metric.isPositive ? (
                      <TrendingUp className="w-3 h-3" />
                    ) : (
                      <TrendingDown className="w-3 h-3" />
                    )}
                    {metric.trend}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
                <p className="text-xs text-muted-foreground mt-1">{metric.title}</p>
                <p className="text-xs text-muted-foreground">{metric.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Lead Funnel & Workflow Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Lead Conversion Funnel</CardTitle>
            <CardDescription>Track leads moving through automation stages</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <FunnelChart>
                <Tooltip />
                <Funnel dataKey="value" data={funnelData} isAnimationActive>
                  <LabelList position="right" fill="#000" stroke="none" dataKey="name" />
                </Funnel>
              </FunnelChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Workflow Performance</CardTitle>
            <CardDescription>Success rates by automation type</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={workflowPerformance} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={120} tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="responseRate" fill="hsl(var(--primary))" name="Response %" radius={[0, 4, 4, 0]} />
                <Bar dataKey="conversion" fill="hsl(var(--chart-3))" name="Conversion %" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Source Breakdown & AI Accuracy */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Lead Source Distribution</CardTitle>
            <CardDescription>Breakdown by integration source</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={sourceBreakdown}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {sourceBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>AI Accuracy Metrics</CardTitle>
            <CardDescription>Quality of AI-powered qualification</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Average Confidence Score</span>
                <span className="font-bold text-lg">82%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full" style={{ width: "82%" }} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-green-50 rounded-lg">
                <p className="text-xs text-muted-foreground">False Positive Rate</p>
                <p className="text-2xl font-bold text-green-700">8.5%</p>
                <p className="text-xs text-muted-foreground mt-1">AI said qualified but wasn't</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-xs text-muted-foreground">False Negative Rate</p>
                <p className="text-2xl font-bold text-blue-700">4.2%</p>
                <p className="text-xs text-muted-foreground mt-1">AI missed qualified leads</p>
              </div>
            </div>

            <div className="p-3 bg-orange-50 rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">Review Queue</p>
              <p className="text-lg font-bold text-orange-700">3 pending decisions</p>
              <p className="text-xs text-muted-foreground">Low-confidence leads awaiting review</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
