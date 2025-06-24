
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  BarChart3, 
  TrendingUp, 
  Eye, 
  MessageSquare, 
  Heart,
  Share,
  Target,
  Users,
  DollarSign,
  Calendar
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const postPerformanceData = [
  { date: 'Jan 1', views: 1200, likes: 89, shares: 12, comments: 23 },
  { date: 'Jan 8', views: 1800, likes: 142, shares: 18, comments: 31 },
  { date: 'Jan 15', views: 2200, likes: 198, shares: 24, comments: 45 },
  { date: 'Jan 22', views: 1900, likes: 156, shares: 21, comments: 38 },
  { date: 'Jan 29', views: 2800, likes: 234, shares: 32, comments: 52 }
];

const adPerformanceData = [
  { date: 'Jan 1', impressions: 5200, clicks: 156, conversions: 12, spend: 89 },
  { date: 'Jan 8', impressions: 6800, clicks: 234, conversions: 18, spend: 142 },
  { date: 'Jan 15', impressions: 7400, clicks: 289, conversions: 24, spend: 178 },
  { date: 'Jan 22', impressions: 6900, clicks: 267, conversions: 21, spend: 156 },
  { date: 'Jan 29', impressions: 8200, clicks: 334, conversions: 28, spend: 201 }
];

export function InsightsSummary() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50/30 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Posts & Campaign Summary</h1>
              <p className="text-gray-600 mt-2">Combined overview of your content and advertising performance</p>
            </div>
            <div className="flex items-center space-x-3">
              <Badge className="bg-green-100 text-green-800 border-green-200">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                Last 30 Days
              </Badge>
              <Button variant="outline" size="sm">
                <Calendar className="w-4 h-4 mr-2" />
                Change Period
              </Button>
            </div>
          </div>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Post Views</p>
                  <p className="text-3xl font-bold text-gray-900">9.9K</p>
                  <p className="text-sm text-green-600 flex items-center mt-1">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    +23% vs last month
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                  <Eye className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Ad Impressions</p>
                  <p className="text-3xl font-bold text-gray-900">34.5K</p>
                  <p className="text-sm text-green-600 flex items-center mt-1">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    +18% vs last month
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center">
                  <Target className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Engagement</p>
                  <p className="text-3xl font-bold text-gray-900">2.1K</p>
                  <p className="text-sm text-green-600 flex items-center mt-1">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    +31% vs last month
                  </p>
                </div>
                <div className="w-12 h-12 bg-pink-50 rounded-full flex items-center justify-center">
                  <Heart className="w-6 h-6 text-pink-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Ad Spend</p>
                  <p className="text-3xl font-bold text-gray-900">$766</p>
                  <p className="text-sm text-green-600 flex items-center mt-1">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    -12% vs last month
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Post Performance Chart */}
          <Card className="hover:shadow-md transition-shadow duration-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5 text-blue-600" />
                <span>Post Performance</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={postPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="views" stroke="#3b82f6" strokeWidth={2} />
                  <Line type="monotone" dataKey="likes" stroke="#ef4444" strokeWidth={2} />
                  <Line type="monotone" dataKey="shares" stroke="#10b981" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Ad Performance Chart */}
          <Card className="hover:shadow-md transition-shadow duration-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="w-5 h-5 text-purple-600" />
                <span>Ad Campaign Performance</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={adPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="impressions" fill="#8b5cf6" />
                  <Bar dataKey="clicks" fill="#06b6d4" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activities */}
        <Card className="hover:shadow-md transition-shadow duration-200">
          <CardHeader>
            <CardTitle>Recent Activity Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Eye className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">Instagram post reached 2.8K views</p>
                  <p className="text-sm text-gray-500">Your latest post about product launch is performing well</p>
                </div>
                <Badge className="bg-blue-100 text-blue-800">High Performance</Badge>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-purple-50 rounded-lg">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <Target className="w-5 h-5 text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">Facebook ad campaign generated 28 conversions</p>
                  <p className="text-sm text-gray-500">Your current campaign is converting at 3.2% rate</p>
                </div>
                <Badge className="bg-purple-100 text-purple-800">Converting</Badge>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">WhatsApp engagement increased by 45%</p>
                  <p className="text-sm text-gray-500">More customers are reaching out through WhatsApp</p>
                </div>
                <Badge className="bg-green-100 text-green-800">Trending Up</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
