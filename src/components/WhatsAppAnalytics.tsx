import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  ArrowLeft, 
  MessageSquare, 
  CheckCircle, 
  Eye, 
  MessageCircle,
  Download,
  BarChart3,
  TableIcon
} from "lucide-react";
import { MetricCard } from "@/components/MetricCard";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { useState } from "react";

interface WhatsAppAnalyticsProps {
  onBack: () => void;
}

export function WhatsAppAnalytics({ onBack }: WhatsAppAnalyticsProps) {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [showChart, setShowChart] = useState(false);

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

  // Button Click Analysis data
  const buttonClickData = [
    { name: "URL Clicks", value: 850, color: "#7C3AED" },
    { name: "Unique Clicks", value: 650, color: "#D946EF" }
  ];

  // Cost Efficiency Breakdown data
  const costEfficiencyData = [
    { name: "ferocious", totalCost: 0.8 },
    { name: "kingdom", totalCost: 0 },
    { name: "entropy", totalCost: 0 }
  ];

  // Cost Distribution data
  const costDistributionData = [
    { name: "leadmastersad", value: 100, color: "#7C3AED" },
    { name: "ferocious", value: 0, color: "#EC4899" },
    { name: "botcampusai", value: 0, color: "#F97316" },
    { name: "kingdom", value: 0, color: "#8B5CF6" },
    { name: "entropy", value: 0, color: "#06B6D4" }
  ];

  // Read Rate Trends data
  const readRateData = [
    { name: "ferocious", readRate: 100 },
    { name: "kingdom", readRate: 0 },
    { name: "entropy", readRate: 0 }
  ];

  // Campaign chart data for table toggle
  const campaignChartData = campaignData.map(campaign => ({
    name: campaign.name.length > 20 ? campaign.name.substring(0, 20) + "..." : campaign.name,
    sent: campaign.sent,
    delivered: campaign.delivered,
    readRate: parseFloat(campaign.readRate.replace('%', '')),
    responseRate: parseFloat(campaign.responseRate.replace('%', ''))
  }));

  const handleFetchAnalytics = () => {
    // Add your analytics fetching logic here
    console.log(`Fetching analytics from ${fromDate} to ${toDate}`);
  };

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
        {/* Top Navigation Bar */}
        <div className="flex items-center justify-between">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <Button 
            className="bg-gradient-to-r from-[#7C3AED] to-[#D946EF] hover:from-purple-700 hover:to-pink-600 text-white transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </Button>
        </div>

        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#7C3AED] to-[#D946EF] bg-clip-text text-transparent mb-2">
            Performance & Analytics
          </h1>
          <p className="text-gray-600">
            Track your WhatsApp campaign performance and engagement metrics
          </p>
        </div>

        {/* Date Filters */}
        <Card className="border border-gray-200 shadow-sm bg-white">
          <CardContent className="p-6">
            <div className="flex items-end gap-4">
              <div className="flex-1">
                <Label htmlFor="fromDate" className="text-sm font-medium text-gray-700 mb-2 block">
                  From Date
                </Label>
                <Input
                  id="fromDate"
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  className="border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                />
              </div>
              <div className="flex-1">
                <Label htmlFor="toDate" className="text-sm font-medium text-gray-700 mb-2 block">
                  To Date
                </Label>
                <Input
                  id="toDate"
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  className="border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                />
              </div>
              <Button 
                onClick={handleFetchAnalytics}
                className="bg-gradient-to-r from-[#7C3AED] to-[#D946EF] hover:from-purple-700 hover:to-pink-600 text-white transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Fetch Analytics
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <MetricCard key={index} metric={metric} />
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Campaign Performance Table with Chart Toggle */}
          <div className="lg:col-span-2">
            <Card className="border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2 text-gray-600" />
                    Campaign Performance
                  </CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowChart(!showChart)}
                    className="hover:bg-gray-50"
                  >
                    {showChart ? (
                      <>
                        <TableIcon className="w-4 h-4 mr-2" />
                        Table View
                      </>
                    ) : (
                      <>
                        <BarChart3 className="w-4 h-4 mr-2" />
                        Chart View
                      </>
                    )}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                {!showChart ? (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="font-medium">Campaign Name</TableHead>
                          <TableHead className="font-medium">Sent</TableHead>
                          <TableHead className="font-medium">Delivered</TableHead>
                          <TableHead className="font-medium">Read Rate</TableHead>
                          <TableHead className="font-medium">Response Rate</TableHead>
                          <TableHead className="font-medium">Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {campaignData.map((campaign, index) => (
                          <TableRow 
                            key={index} 
                            className="hover:bg-gray-50"
                          >
                            <TableCell className="font-medium">{campaign.name}</TableCell>
                            <TableCell>{campaign.sent.toLocaleString()}</TableCell>
                            <TableCell>{campaign.delivered.toLocaleString()}</TableCell>
                            <TableCell>{campaign.readRate}</TableCell>
                            <TableCell>{campaign.responseRate}</TableCell>
                            <TableCell>{getStatusBadge(campaign.status)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="p-6">
                    <div className="w-full" style={{ height: '400px' }}>
                      <ChartContainer
                        config={{
                          sent: { label: "Messages Sent", color: "#7C3AED" },
                          delivered: { label: "Messages Delivered", color: "#D946EF" },
                          readRate: { label: "Read Rate %", color: "#10B981" },
                          responseRate: { label: "Response Rate %", color: "#F59E0B" }
                        }}
                        className="w-full h-full"
                      >
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={campaignChartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                            <XAxis 
                              dataKey="name" 
                              tick={{ fontSize: 10 }}
                              angle={-45}
                              textAnchor="end"
                              height={80}
                            />
                            <YAxis tick={{ fontSize: 12 }} />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Bar dataKey="sent" fill="#7C3AED" name="Sent" />
                            <Bar dataKey="delivered" fill="#D946EF" name="Delivered" />
                            <Bar dataKey="readRate" fill="#10B981" name="Read Rate %" />
                            <Bar dataKey="responseRate" fill="#F59E0B" name="Response Rate %" />
                          </BarChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Analytics Overview */}
          <div>
            <Card className="border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="border-b border-gray-100">
                <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
                  <Eye className="w-5 h-5 mr-2 text-gray-600" />
                  Analytics Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-6">
                <div className="grid grid-cols-1 gap-4 text-center">
                  <div className="space-y-2 p-4 rounded-lg bg-gray-50 border border-gray-100">
                    <h3 className="text-sm font-medium text-gray-600">Total Campaigns</h3>
                    <p className="text-2xl font-bold text-gray-900">24</p>
                    <p className="text-xs text-green-600">+3 this month</p>
                  </div>
                  <div className="space-y-2 p-4 rounded-lg bg-gray-50 border border-gray-100">
                    <h3 className="text-sm font-medium text-gray-600">Average Delivery Rate</h3>
                    <p className="text-2xl font-bold text-gray-900">94.8%</p>
                    <p className="text-xs text-green-600">+1.2% from last month</p>
                  </div>
                  <div className="space-y-2 p-4 rounded-lg bg-gray-50 border border-gray-100">
                    <h3 className="text-sm font-medium text-gray-600">Best Performing Time</h3>
                    <p className="text-2xl font-bold text-gray-900">2-4 PM</p>
                    <p className="text-xs text-gray-500">Peak engagement window</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* New Analytics Charts Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Button Click Analysis */}
          <Card className="border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="border-b border-gray-100">
              <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
                <MessageCircle className="w-5 h-5 mr-2 text-gray-600" />
                Button Click Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="w-full" style={{ height: '300px' }}>
                <ChartContainer
                  config={{
                    urlClicks: { label: "URL Clicks", color: "#7C3AED" },
                    uniqueClicks: { label: "Unique Clicks", color: "#D946EF" }
                  }}
                  className="w-full h-full"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={buttonClickData} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
                      <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="value" fill="#7C3AED" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>

          {/* Cost Efficiency Breakdown */}
          <Card className="border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="border-b border-gray-100">
              <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
                <CheckCircle className="w-5 h-5 mr-2 text-gray-600" />
                Cost Efficiency Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 bg-white">
              <div className="w-full" style={{ height: '300px' }}>
                <ChartContainer
                  config={{
                    totalCost: { label: "Total Cost", color: "#7C3AED" }
                  }}
                  className="w-full h-full"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={costEfficiencyData} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
                      <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} domain={[0, 1]} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="totalCost" fill="#7C3AED" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>

          {/* Cost Distribution Across Templates */}
          <Card className="border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="border-b border-gray-100">
              <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
                <MessageSquare className="w-5 h-5 mr-2 text-gray-600" />
                Cost Distribution Across Templates
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="w-full" style={{ height: '300px' }}>
                <ChartContainer
                  config={{
                    distribution: { label: "Distribution", color: "#7C3AED" }
                  }}
                  className="w-full h-full"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={costDistributionData}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={100}
                        dataKey="value"
                      >
                        {costDistributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {costDistributionData.map((item, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-gray-600">{item.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Read Rate Trends */}
          <Card className="border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="border-b border-gray-100">
              <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
                <Eye className="w-5 h-5 mr-2 text-gray-600" />
                Read Rate Trends (%)
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="w-full" style={{ height: '300px' }}>
                <ChartContainer
                  config={{
                    readRate: { label: "Read Rate", color: "#10B981" }
                  }}
                  className="w-full h-full"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={readRateData} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
                      <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} domain={[0, 100]} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="readRate" fill="#10B981" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
