import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  ArrowLeft, 
  MessageSquare, 
  CheckCircle, 
  Eye, 
  MessageCircle,
  Download,
  TrendingUp
} from "lucide-react";
import { MetricCard } from "@/components/MetricCard";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";

interface WhatsAppAnalyticsProps {
  onBack: () => void;
}

export function WhatsAppAnalytics({ onBack }: WhatsAppAnalyticsProps) {
  const metrics = [
    { title: "Messages Sent", value: "12,547", icon: MessageSquare, trend: "+8.2%" },
    { title: "Messages Delivered", value: "11,892", icon: CheckCircle, trend: "+7.1%" },
    { title: "Read Rate", value: "78.5%", icon: Eye, trend: "+2.3%" },
    { title: "Response Rate", value: "24.7%", icon: MessageCircle, trend: "+5.1%" },
  ];

  const campaignData = [
    {
      name: "Summer Sale 2024",
      sent: 2547,
      delivered: 2489,
      readRate: "82.3%",
      responseRate: "28.1%",
      status: "Completed"
    },
    {
      name: "Product Launch Announcement",
      sent: 1892,
      delivered: 1847,
      readRate: "75.8%",
      responseRate: "22.4%",
      status: "Completed"
    },
    {
      name: "Holiday Special Offer",
      sent: 3247,
      delivered: 3089,
      readRate: "79.2%",
      responseRate: "26.3%",
      status: "In Progress"
    },
    {
      name: "Customer Feedback Survey",
      sent: 1456,
      delivered: 1398,
      readRate: "68.9%",
      responseRate: "15.7%",
      status: "Completed"
    },
    {
      name: "Welcome Series - Week 1",
      sent: 892,
      delivered: 867,
      readRate: "84.1%",
      responseRate: "31.2%",
      status: "In Progress"
    }
  ];

  const chartData = [
    { day: "Mon", delivered: 2100 },
    { day: "Tue", delivered: 2300 },
    { day: "Wed", delivered: 2200 },
    { day: "Thu", delivered: 2400 },
    { day: "Fri", delivered: 2600 },
    { day: "Sat", delivered: 2200 },
    { day: "Sun", delivered: 1900 },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Completed":
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-200 whitespace-nowrap">Completed</Badge>;
      case "In Progress":
        return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 whitespace-nowrap">In Progress</Badge>;
      default:
        return <Badge variant="secondary" className="whitespace-nowrap">{status}</Badge>;
    }
  };

  return (
    <div className="flex-1 p-6 bg-gray-50 overflow-auto">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              onClick={onBack}
              className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-[#7C3AED] to-[#D946EF] bg-clip-text text-transparent mb-2">
                Performance & Analytics
              </h1>
              <p className="text-gray-600">
                Track your WhatsApp campaign performance and engagement metrics
              </p>
            </div>
          </div>
          <Button 
            className="bg-gradient-to-r from-[#7C3AED] to-[#D946EF] hover:from-purple-700 hover:to-pink-600 text-white transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </Button>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <MetricCard key={index} metric={metric} />
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Campaign Performance Table */}
          <div className="lg:col-span-2">
            <Card className="border border-gray-200 shadow-sm bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-900">Campaign Performance</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="font-semibold text-gray-700">Campaign Name</TableHead>
                        <TableHead className="font-semibold text-gray-700">Sent</TableHead>
                        <TableHead className="font-semibold text-gray-700">Delivered</TableHead>
                        <TableHead className="font-semibold text-gray-700">Read Rate</TableHead>
                        <TableHead className="font-semibold text-gray-700">Response Rate</TableHead>
                        <TableHead className="font-semibold text-gray-700">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {campaignData.map((campaign, index) => (
                        <TableRow 
                          key={index} 
                          className="hover:bg-gray-50 cursor-pointer transition-colors duration-150"
                        >
                          <TableCell className="font-medium text-gray-900">{campaign.name}</TableCell>
                          <TableCell className="text-gray-700">{campaign.sent.toLocaleString()}</TableCell>
                          <TableCell className="text-gray-700">{campaign.delivered.toLocaleString()}</TableCell>
                          <TableCell className="text-gray-700">{campaign.readRate}</TableCell>
                          <TableCell className="text-gray-700">{campaign.responseRate}</TableCell>
                          <TableCell>{getStatusBadge(campaign.status)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Analytics Overview */}
          <div>
            <Card className="border border-gray-200 shadow-sm bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-semibold text-gray-900">Analytics Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-6 text-center">
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-gray-600">Total Campaigns</h3>
                    <p className="text-2xl font-bold text-gray-900">24</p>
                    <p className="text-xs text-green-600">+3 this month</p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-gray-600">Average Delivery Rate</h3>
                    <p className="text-2xl font-bold text-gray-900">94.8%</p>
                    <p className="text-xs text-green-600">+1.2% from last month</p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-gray-600">Best Performing Time</h3>
                    <p className="text-2xl font-bold text-gray-900">2-4 PM</p>
                    <p className="text-xs text-gray-500">Peak engagement window</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Message Delivery Trends Chart - Fixed overflow container */}
        <Card className="border border-gray-200 shadow-sm bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-semibold text-gray-900 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-purple-600" />
              Message Delivery Trends
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="w-full h-80 overflow-hidden">
              <ChartContainer
                config={{
                  delivered: {
                    label: "Messages Delivered",
                    color: "#7C3AED",
                  },
                }}
                className="w-full h-full max-w-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart 
                    data={chartData} 
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                    width={undefined}
                    height={undefined}
                  >
                    <XAxis 
                      dataKey="day" 
                      tick={{ fontSize: 12 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis 
                      tick={{ fontSize: 12 }}
                      axisLine={false}
                      tickLine={false}
                      width={50}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line 
                      type="monotone" 
                      dataKey="delivered" 
                      stroke="#7C3AED" 
                      strokeWidth={3}
                      dot={{ fill: "#7C3AED", strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, stroke: "#7C3AED", strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
            <div className="pt-4 border-t border-gray-100 mt-4">
              <p className="text-sm text-gray-600">
                Weekly message delivery performance shows consistent engagement with peak activity on Friday.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
