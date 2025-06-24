
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
  Crown,
  MessageCircle,
  Clock,
  Mail,
  Lightbulb
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

        {/* WhatsApp Business Control Center Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 - New WhatsApp Leads */}
          <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 shadow-md bg-white rounded-xl overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-700 border-0 text-xs">This Week</Badge>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold text-gray-900">8</div>
                <div className="text-base font-medium text-gray-700">New Leads on WhatsApp</div>
                <div className="text-sm text-gray-500">Start a conversation now</div>
              </div>
              <div className="mt-4 w-full bg-green-100 rounded-full h-1.5">
                <div className="bg-green-500 h-1.5 rounded-full w-3/4"></div>
              </div>
            </CardContent>
          </Card>

          {/* Card 2 - Conversations in Progress */}
          <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 shadow-md bg-white rounded-xl overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-blue-600" />
                </div>
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold text-gray-900">3</div>
                <div className="text-base font-medium text-gray-700">Chats Happening Right Now</div>
                <div className="text-sm text-gray-500">Stay responsive to win more leads</div>
              </div>
              <div className="mt-4 w-full bg-blue-100 rounded-full h-1.5">
                <div className="bg-blue-500 h-1.5 rounded-full w-1/2"></div>
              </div>
            </CardContent>
          </Card>

          {/* Card 3 - Follow-ups Due Today */}
          <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 shadow-md bg-white rounded-xl overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6 text-orange-600" />
                </div>
                <Badge className="bg-orange-100 text-orange-700 border-0 text-xs">Today</Badge>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold text-gray-900">2</div>
                <div className="text-base font-medium text-gray-700">People Awaiting Your Reply</div>
                <div className="text-sm text-gray-500">Don't let hot leads go cold</div>
              </div>
              <div className="mt-4 w-full bg-orange-100 rounded-full h-1.5">
                <div className="bg-orange-500 h-1.5 rounded-full w-full"></div>
              </div>
            </CardContent>
          </Card>

          {/* Card 4 - Messages Sent This Month */}
          <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 shadow-md bg-white rounded-xl overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center">
                  <Mail className="w-6 h-6 text-purple-600" />
                </div>
                <Badge className="bg-purple-100 text-purple-700 border-0 text-xs">This Month</Badge>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold text-gray-900">74</div>
                <div className="text-base font-medium text-gray-700">Total WhatsApp Messages Sent</div>
                <div className="text-sm text-gray-500">Your business is staying active</div>
              </div>
              <div className="mt-4 w-full bg-purple-100 rounded-full h-1.5">
                <div className="bg-purple-500 h-1.5 rounded-full w-4/5"></div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Reply Templates CTA */}
        <div className="flex justify-center">
          <Button variant="outline" className="bg-white border-purple-200 text-purple-700 hover:bg-purple-50 hover:border-purple-300 px-6 py-3 rounded-full shadow-sm">
            <Lightbulb className="w-4 h-4 mr-2" />
            Create Quick Reply Templates
          </Button>
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
