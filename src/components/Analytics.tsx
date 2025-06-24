import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  TrendingUp, 
  Eye, 
  MousePointer, 
  Target, 
  DollarSign,
  Users,
  Smartphone,
  MapPin,
  Download,
  Bot,
  Play
} from "lucide-react";
import { MetricCard } from "@/components/MetricCard";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar,
  Legend
} from "recharts";

export function Analytics() {
  const [activeTab, setActiveTab] = useState("performance");

  // Summary metrics data
  const summaryMetrics = [
    { title: "Total Ad Spend", value: "$24,847", icon: DollarSign, trend: "+12.5%", color: "text-green-600" },
    { title: "Total Impressions", value: "2.4M", icon: Eye, trend: "+8.3%", color: "text-blue-600" },
    { title: "Total Clicks", value: "142K", icon: MousePointer, trend: "+15.2%", color: "text-purple-600" },
    { title: "Conversions", value: "3,247", icon: Target, trend: "+22.1%", color: "text-pink-600" },
    { title: "CTR %", value: "5.91%", icon: TrendingUp, trend: "+0.8%", color: "text-indigo-600" },
    { title: "CPC", value: "$0.17", icon: DollarSign, trend: "-5.2%", color: "text-emerald-600" },
  ];

  // Performance over time data
  const performanceData = [
    { date: "Mon", impressions: 45000, clicks: 2100, conversions: 420 },
    { date: "Tue", impressions: 52000, clicks: 2800, conversions: 580 },
    { date: "Wed", impressions: 48000, clicks: 2400, conversions: 510 },
    { date: "Thu", impressions: 61000, clicks: 3200, conversions: 690 },
    { date: "Fri", impressions: 55000, clicks: 2900, conversions: 620 },
    { date: "Sat", impressions: 43000, clicks: 2000, conversions: 380 },
    { date: "Sun", impressions: 38000, clicks: 1800, conversions: 340 },
  ];

  // Ad spend distribution data
  const spendData = [
    { platform: "Facebook", spend: 8500, color: "#1877F2" },
    { platform: "Google", spend: 7200, color: "#4285F4" },
    { platform: "Instagram", spend: 5100, color: "#E4405F" },
    { platform: "LinkedIn", spend: 2800, color: "#0077B5" },
    { platform: "Twitter", spend: 1247, color: "#1DA1F2" },
  ];

  // Demographics data
  const ageData = [
    { range: "18-24", count: 2400 },
    { range: "25-34", count: 4200 },
    { range: "35-44", count: 3800 },
    { range: "45-54", count: 2100 },
    { range: "55+", count: 1200 },
  ];

  const genderData = [
    { gender: "Female", count: 7200, color: "#EC4899" },
    { gender: "Male", count: 6500, color: "#3B82F6" },
    { gender: "Other", count: 300, color: "#8B5CF6" },
  ];

  const deviceData = [
    { device: "Mobile", percentage: 68, color: "#10B981" },
    { device: "Desktop", percentage: 24, color: "#F59E0B" },
    { device: "Tablet", percentage: 8, color: "#EF4444" },
  ];

  // CTR trend data
  const ctrData = [
    { date: "Week 1", ctr: 4.2 },
    { date: "Week 2", ctr: 5.1 },
    { date: "Week 3", ctr: 4.8 },
    { date: "Week 4", ctr: 5.9 },
  ];

  // Engagement data
  const engagementData = [
    { metric: "Likes", count: 24500 },
    { metric: "Shares", count: 8900 },
    { metric: "Comments", count: 5200 },
    { metric: "Saves", count: 3100 },
  ];

  // Top performing ads
  const topAds = [
    {
      id: 1,
      title: "Summer Collection Launch",
      platform: "Instagram",
      clicks: 4200,
      conversions: 890,
      spend: 1200,
      image: "/placeholder.svg"
    },
    {
      id: 2,
      title: "Holiday Special Offer",
      platform: "Facebook",
      clicks: 3800,
      conversions: 760,
      spend: 980,
      image: "/placeholder.svg"
    },
    {
      id: 3,
      title: "Product Demo Video",
      platform: "YouTube",
      clicks: 3200,
      conversions: 640,
      spend: 850,
      image: "/placeholder.svg"
    },
  ];

  // Keyword performance data
  const keywordData = [
    { keyword: "ai marketing", clicks: 12500, conversions: 890, cpc: 0.15, position: 2.3 },
    { keyword: "lead generation", clicks: 9800, conversions: 720, cpc: 0.18, position: 1.8 },
    { keyword: "automation tools", clicks: 7200, conversions: 580, cpc: 0.22, position: 3.1 },
    { keyword: "digital marketing", clicks: 6500, conversions: 420, cpc: 0.19, position: 2.7 },
  ];

  return (
    <div className="flex-1 p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent mb-2">
              Analytics Dashboard
            </h1>
            <p className="text-gray-600 flex items-center">
              AI-powered insights and campaign performance metrics
              <Badge className="ml-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                <Bot className="w-3 h-3 mr-1" />
                AI Powered
              </Badge>
            </p>
          </div>
          <Button className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 hover:from-blue-700 hover:via-purple-700 hover:to-pink-600 text-white">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>

        {/* Top-Level Summary Tiles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          {summaryMetrics.map((metric, index) => (
            <Card key={index} className="hover:shadow-lg hover:-translate-y-1 transition-all duration-200 border-gray-200 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <metric.icon className="w-8 h-8 text-gray-600" />
                  <span className={`text-sm font-medium ${metric.color}`}>
                    {metric.trend}
                  </span>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</p>
                  <p className="text-sm text-gray-600">{metric.title}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Visual Campaign Performance Section */}
        <Card className="border-gray-200 shadow-sm bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-200">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900">Campaign Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="performance">📊 Performance Over Time</TabsTrigger>
                <TabsTrigger value="distribution">🧩 Ad Spend Distribution</TabsTrigger>
              </TabsList>
              
              <TabsContent value="performance" className="mt-6">
                <div className="h-80">
                  <ChartContainer
                    config={{
                      impressions: { label: "Impressions", color: "#3B82F6" },
                      clicks: { label: "Clicks", color: "#8B5CF6" },
                      conversions: { label: "Conversions", color: "#EC4899" },
                    }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={performanceData}>
                        <XAxis dataKey="date" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line type="monotone" dataKey="impressions" stroke="#3B82F6" strokeWidth={3} />
                        <Line type="monotone" dataKey="clicks" stroke="#8B5CF6" strokeWidth={3} />
                        <Line type="monotone" dataKey="conversions" stroke="#EC4899" strokeWidth={3} />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </TabsContent>
              
              <TabsContent value="distribution" className="mt-6">
                <div className="h-80">
                  <ChartContainer
                    config={{
                      spend: { label: "Ad Spend", color: "#8B5CF6" },
                    }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={spendData}>
                        <XAxis dataKey="platform" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="spend" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Audience Insights Section */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-6">
          {/* Age Demographics */}
          <Card className="border-gray-200 shadow-sm bg-white/80 backdrop-blur-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
                <Users className="w-5 h-5 mr-2 text-blue-600" />
                Age Demographics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48">
                <ChartContainer
                  config={{
                    count: { label: "Users", color: "#3B82F6" },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={ageData}>
                      <XAxis dataKey="range" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="count" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>

          {/* Gender Split */}
          <Card className="border-gray-200 shadow-sm bg-white/80 backdrop-blur-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
                <Users className="w-5 h-5 mr-2 text-purple-600" />
                Gender Split
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48">
                <ChartContainer
                  config={{
                    count: { label: "Users", color: "#8B5CF6" },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={genderData}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={80}
                        dataKey="count"
                      >
                        {genderData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>

          {/* Device Usage */}
          <Card className="border-gray-200 shadow-sm bg-white/80 backdrop-blur-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
                <Smartphone className="w-5 h-5 mr-2 text-green-600" />
                Device Usage
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {deviceData.map((device, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">{device.device}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full rounded-full transition-all duration-300"
                          style={{ 
                            width: `${device.percentage}%`, 
                            backgroundColor: device.color 
                          }}
                        />
                      </div>
                      <span className="text-sm font-semibold text-gray-900 w-8">
                        {device.percentage}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Geolocation */}
          <Card className="border-gray-200 shadow-sm bg-white/80 backdrop-blur-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-red-600" />
                Top Locations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {["United States (42%)", "Canada (18%)", "United Kingdom (12%)", "Australia (8%)", "Germany (6%)"].map((location, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-700">{location}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Engagement & Top Ads Section */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* CTR Trend */}
          <Card className="border-gray-200 shadow-sm bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-200">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900">CTR Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ChartContainer
                  config={{
                    ctr: { label: "CTR %", color: "#10B981" },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={ctrData}>
                      <XAxis dataKey="date" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line type="monotone" dataKey="ctr" stroke="#10B981" strokeWidth={3} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>

          {/* Engagement Metrics */}
          <Card className="border-gray-200 shadow-sm bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-200">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900">Engagement Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ChartContainer
                  config={{
                    count: { label: "Engagement", color: "#F59E0B" },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={engagementData}>
                      <XAxis dataKey="metric" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="count" fill="#F59E0B" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Top Performing Ads */}
        <Card className="border-gray-200 shadow-sm bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-200">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900">Top Performing Ads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {topAds.map((ad) => (
                <Card key={ad.id} className="border border-gray-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
                  <CardContent className="p-4">
                    <div className="aspect-video bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                      <Play className="w-12 h-12 text-gray-400" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{ad.title}</h3>
                    <Badge className="mb-3">{ad.platform}</Badge>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex justify-between">
                        <span>Clicks:</span>
                        <span className="font-semibold">{ad.clicks.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Conversions:</span>
                        <span className="font-semibold">{ad.conversions}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Spend:</span>
                        <span className="font-semibold">${ad.spend}</span>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full mt-4">
                      Quick View
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Keyword & Platform Comparison */}
        <Card className="border-gray-200 shadow-sm bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-200">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900">Keyword Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Keyword</TableHead>
                  <TableHead>Clicks</TableHead>
                  <TableHead>Conversions</TableHead>
                  <TableHead>CPC</TableHead>
                  <TableHead>Avg. Position</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {keywordData.map((keyword, index) => (
                  <TableRow key={index} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{keyword.keyword}</TableCell>
                    <TableCell>{keyword.clicks.toLocaleString()}</TableCell>
                    <TableCell>{keyword.conversions}</TableCell>
                    <TableCell>${keyword.cpc}</TableCell>
                    <TableCell>{keyword.position}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
