
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Zap, 
  TrendingUp, 
  Users, 
  PenTool, 
  Target, 
  BarChart3, 
  Sparkles,
  ChevronRight,
  Crown
} from "lucide-react";

export function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Welcome Header */}
        <div className="text-center space-y-4 py-8">
          <div className="flex items-center justify-center space-x-3">
            <span className="text-4xl">👋</span>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Welcome back, Abdullah!
            </h1>
            <Sparkles className="w-8 h-8 text-purple-500 animate-pulse" />
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Let's grow your campaigns and posts with AI-powered ease.
          </p>
        </div>

        {/* Portfolio Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg bg-gradient-to-br from-white to-blue-50/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Active Campaigns</CardTitle>
              <Target className="h-5 w-5 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900 mb-2">12</div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span className="text-sm text-green-600 font-medium">+2 this week</span>
              </div>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg bg-gradient-to-br from-white to-purple-50/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Platforms Connected</CardTitle>
              <Users className="h-5 w-5 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900 mb-2">5</div>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="text-xs">Facebook, Instagram, LinkedIn</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg bg-gradient-to-br from-white to-green-50/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Posts Published</CardTitle>
              <PenTool className="h-5 w-5 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900 mb-2">84</div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span className="text-sm text-green-600 font-medium">+15 this month</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Action Tiles */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg cursor-pointer bg-gradient-to-br from-white to-blue-50/30 hover:from-blue-50/50 hover:to-blue-100/50">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <PenTool className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-lg font-semibold text-gray-900">Create your first post</CardTitle>
                <CardDescription className="text-gray-600">
                  Design engaging content with AI assistance
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white group">
                  Get Started
                  <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg cursor-pointer bg-gradient-to-br from-white to-orange-50/30 hover:from-orange-50/50 hover:to-orange-100/50">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-lg font-semibold text-gray-900">Launch your first ad campaign</CardTitle>
                <CardDescription className="text-gray-600">
                  Reach your audience with targeted advertising
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Button className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white group">
                  Start Campaign
                  <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg cursor-pointer bg-gradient-to-br from-white to-green-50/30 hover:from-green-50/50 hover:to-green-100/50">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <BarChart3 className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-lg font-semibold text-gray-900">View posts & campaign summary</CardTitle>
                <CardDescription className="text-gray-600">
                  Track performance and insights
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Button className="w-full bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white group">
                  View Analytics
                  <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Premium Upgrade Teaser */}
        <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg bg-gradient-to-br from-purple-50 to-blue-50 relative overflow-hidden">
          <div className="absolute top-4 right-4">
            <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
              <Crown className="w-3 h-3 mr-1" />
              Premium
            </Badge>
          </div>
          <CardHeader className="pb-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl font-semibold text-gray-900">Unlock Premium Features</CardTitle>
                <div className="flex items-center space-x-2 mt-1">
                  <Badge variant="outline" className="text-xs">Basic Plan</Badge>
                  <span className="text-sm text-gray-600">→ Upgrade for unlimited access</span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="space-y-3">
                <p className="text-gray-700">
                  Get unlimited campaigns, advanced analytics, and priority AI assistance.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                    <span>Unlimited campaigns & posts</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                    <span>Advanced AI insights</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                    <span>Priority support</span>
                  </li>
                </ul>
              </div>
              <div className="flex justify-center md:justify-end">
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 text-lg font-semibold group">
                  Upgrade to Pro
                  <Crown className="w-5 h-5 ml-2 group-hover:scale-110 transition-transform" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
