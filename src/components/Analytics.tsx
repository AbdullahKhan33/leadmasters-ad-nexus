
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CustomSelect } from "@/components/ui/custom-select";
import { 
  TrendingUp, 
  TrendingDown,
  Eye, 
  MousePointer, 
  Target, 
  DollarSign,
  Users,
  MessageSquare,
  Heart,
  Share2,
  Download,
  Bot,
  Zap,
  Clock,
  BarChart3,
  FileText
} from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  ResponsiveContainer,
  BarChart,
  Bar
} from "recharts";

export function Analytics() {
  const [selectedPlatform, setSelectedPlatform] = useState("all");
  const [selectedTimeRange, setSelectedTimeRange] = useState("30days");
  const [engagementView, setEngagementView] = useState("weekly");

  // Platform filter options
  const platformOptions = [
    { value: "all", label: "All Platforms", icon: BarChart3 },
    { value: "facebook", label: "Facebook", icon: Users },
    { value: "instagram", label: "Instagram", icon: Heart },
    { value: "linkedin", label: "LinkedIn", icon: Users },
    { value: "twitter", label: "Twitter", icon: MessageSquare },
  ];

  // Date range filter options
  const dateRangeOptions = [
    { value: "7days", label: "Last 7 Days", icon: Clock },
    { value: "30days", label: "Last 30 Days", icon: Clock },
    { value: "90days", label: "Last 90 Days", icon: Clock },
    { value: "1year", label: "Last Year", icon: Clock },
  ];

  // Key stats data
  const keyStats = [
    { 
      title: "Total Posts", 
      value: "247", 
      change: "+12.3%", 
      isPositive: true, 
      icon: FileText 
    },
    { 
      title: "Total Ad Spend", 
      value: "$24,847", 
      change: "+8.5%", 
      isPositive: true, 
      icon: DollarSign 
    },
    { 
      title: "Avg Engagement Rate", 
      value: "6.8%", 
      change: "+2.1%", 
      isPositive: true, 
      icon: Heart 
    },
    { 
      title: "Total Leads", 
      value: "3,247", 
      change: "+18.7%", 
      isPositive: true, 
      icon: Target 
    },
  ];

  // Engagement trend data
  const engagementData = [
    { period: "Week 1", engagement: 4200 },
    { period: "Week 2", engagement: 5800 },
    { period: "Week 3", engagement: 4900 },
    { period: "Week 4", engagement: 6400 },
    { period: "Week 5", engagement: 7200 },
  ];

  // Top performing posts
  const topPosts = [
    {
      id: 1,
      title: "Summer Product Launch",
      platform: "Instagram",
      likes: 2400,
      comments: 156,
      clicks: 890,
      image: "/placeholder.svg"
    },
    {
      id: 2,
      title: "Customer Success Story",
      platform: "LinkedIn",
      likes: 1800,
      comments: 92,
      clicks: 640,
      image: "/placeholder.svg"
    },
    {
      id: 3,
      title: "Behind the Scenes",
      platform: "Facebook",
      likes: 1600,
      comments: 78,
      clicks: 520,
      image: "/placeholder.svg"
    },
  ];

  // AI recommendations
  const aiRecommendations = [
    {
      icon: TrendingUp,
      text: "Boost your top Instagram post for 3 days to increase reach by up to 40%",
      action: "Boost Post"
    },
    {
      icon: Target,
      text: "Try retargeting Facebook audience based on recent link clicks for better conversion",
      action: "Create Audience"
    },
    {
      icon: Clock,
      text: "Consider posting more during 6PM - 9PM window based on engagement trends",
      action: "Schedule Posts"
    },
    {
      icon: Zap,
      text: "Your video content performs 60% better - consider creating more video posts",
      action: "Create Video"
    },
  ];

  // Platform breakdown data
  const platformData = [
    { platform: "Instagram", performance: 85 },
    { platform: "Facebook", performance: 72 },
    { platform: "LinkedIn", performance: 68 },
    { platform: "Twitter", performance: 54 },
  ];

  return (
    <div className="flex-1 p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#7C3AED] to-[#D946EF] bg-clip-text text-transparent mb-2">
              Analytics Overview
            </h1>
            <p className="text-gray-600 flex items-center">
              Track your marketing performance across all platforms
              <Badge className="ml-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                <Bot className="w-3 h-3 mr-1" />
                AI Powered
              </Badge>
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <CustomSelect
              options={platformOptions}
              value={selectedPlatform}
              onValueChange={setSelectedPlatform}
              placeholder="All Platforms"
              className="w-48"
            />
            <CustomSelect
              options={dateRangeOptions}
              value={selectedTimeRange}
              onValueChange={setSelectedTimeRange}
              placeholder="Last 30 Days"
              className="w-48"
            />
            <Button className="bg-gradient-to-r from-[#7C3AED] to-[#D946EF] hover:from-purple-700 hover:to-pink-600 text-white">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Key Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {keyStats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg hover:-translate-y-1 transition-all duration-200 border-gray-200 bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <stat.icon className="w-8 h-8 text-purple-600" />
                  <div className={`flex items-center text-sm font-medium ${stat.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.isPositive ? (
                      <TrendingUp className="w-4 h-4 mr-1" />
                    ) : (
                      <TrendingDown className="w-4 h-4 mr-1" />
                    )}
                    {stat.change}
                  </div>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Visual Section */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Engagement Trend Graph */}
          <Card className="border-gray-200 shadow-sm bg-white hover:shadow-lg transition-all duration-200">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-semibold text-gray-900">Engagement Trends</CardTitle>
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setEngagementView("weekly")}
                    className={`px-4 py-2 text-sm rounded-md transition-all duration-200 ${
                      engagementView === "weekly"
                        ? "bg-white text-purple-600 shadow-sm"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Weekly
                  </button>
                  <button
                    onClick={() => setEngagementView("monthly")}
                    className={`px-4 py-2 text-sm rounded-md transition-all duration-200 ${
                      engagementView === "monthly"
                        ? "bg-white text-purple-600 shadow-sm"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Monthly
                  </button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ChartContainer
                  config={{
                    engagement: { label: "Engagement", color: "#7C3AED" },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={engagementData}>
                      <XAxis 
                        dataKey="period" 
                        tick={{ fontSize: 12 }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis 
                        tick={{ fontSize: 12 }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line 
                        type="monotone" 
                        dataKey="engagement" 
                        stroke="#7C3AED" 
                        strokeWidth={3}
                        dot={{ fill: "#7C3AED", strokeWidth: 2, r: 6 }}
                        activeDot={{ r: 8, stroke: "#7C3AED", strokeWidth: 2 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>

          {/* Top Performing Posts */}
          <Card className="border-gray-200 shadow-sm bg-white hover:shadow-lg transition-all duration-200">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900">Top Performing Posts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topPosts.map((post) => (
                  <div key={post.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg flex items-center justify-center">
                      <FileText className="w-8 h-8 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">{post.title}</h4>
                      <Badge variant="secondary" className="mb-2">{post.platform}</Badge>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Heart className="w-4 h-4 mr-1 text-red-500" />
                          {post.likes.toLocaleString()}
                        </div>
                        <div className="flex items-center">
                          <MessageSquare className="w-4 h-4 mr-1 text-blue-500" />
                          {post.comments}
                        </div>
                        <div className="flex items-center">
                          <MousePointer className="w-4 h-4 mr-1 text-green-500" />
                          {post.clicks}
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">View Post</Button>
                      <Button size="sm" className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                        Boost Post
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Recommendations */}
        <Card className="border-gray-200 shadow-sm bg-white hover:shadow-lg transition-all duration-200">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900 flex items-center">
              <Bot className="w-6 h-6 mr-2 text-purple-600" />
              AI-Powered Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {aiRecommendations.map((rec, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg hover:from-purple-100 hover:to-pink-100 transition-all duration-200">
                  <div className="flex-shrink-0">
                    <rec.icon className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-700 mb-3">{rec.text}</p>
                    <Button size="sm" variant="outline" className="border-purple-200 text-purple-700 hover:bg-purple-50">
                      {rec.action}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Platform Performance Breakdown */}
        <Card className="border-gray-200 shadow-sm bg-white hover:shadow-lg transition-all duration-200">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900">Platform Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ChartContainer
                config={{
                  performance: { label: "Performance Score", color: "#7C3AED" },
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={platformData}>
                    <XAxis 
                      dataKey="platform" 
                      tick={{ fontSize: 12 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis 
                      tick={{ fontSize: 12 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar 
                      dataKey="performance" 
                      fill="#7C3AED" 
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
