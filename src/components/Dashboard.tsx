
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  PenTool, 
  Target, 
  BarChart3, 
  Sparkles,
  ChevronRight,
  Crown,
  MessageCircle,
  Clock,
  Mail,
  Lightbulb,
  Users
} from "lucide-react";

export function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50/30 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Welcome Header */}
        <div className="text-center space-y-4 py-8">
          <div className="flex items-center justify-center space-x-3">
            <span className="text-4xl">👋</span>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Welcome back, Abdullah!
            </h1>
            <Sparkles className="w-8 h-8 text-gray-400 animate-pulse" />
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Let's grow your campaigns and posts with AI-powered ease.
          </p>
        </div>

        {/* WhatsApp Performance Section */}
        <div className="space-y-4">
          {/* Section Title */}
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
            <h2 className="text-xl font-semibold text-gray-800">Your WhatsApp Performance</h2>
          </div>

          {/* WhatsApp Business Control Center Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 - New WhatsApp Leads */}
            <Card className="group hover:shadow-md transition-all duration-300 border border-gray-100 shadow-sm bg-white rounded-xl overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                    </div>
                    <Badge className="bg-green-50 text-green-600 border-0 text-xs font-medium">This Week</Badge>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-gray-900">8</div>
                  <div className="text-sm font-medium text-gray-700">New leads this week — Start the conversation.</div>
                </div>
                <div className="mt-4 w-full bg-green-50 rounded-full h-1">
                  <div className="bg-green-500 h-1 rounded-full w-3/4"></div>
                </div>
              </CardContent>
            </Card>

            {/* Card 2 - Chats Happening Right Now */}
            <Card className="group hover:shadow-md transition-all duration-300 border border-gray-100 shadow-sm bg-white rounded-xl overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
                      <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                    </div>
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-gray-900">3</div>
                  <div className="text-sm font-medium text-gray-700">Stay responsive to convert leads.</div>
                </div>
                <div className="mt-4 w-full bg-green-50 rounded-full h-1">
                  <div className="bg-green-500 h-1 rounded-full w-1/2"></div>
                </div>
              </CardContent>
            </Card>

            {/* Card 3 - People Awaiting Your Reply */}
            <Card className="group hover:shadow-md transition-all duration-300 border border-gray-100 shadow-sm bg-white rounded-xl overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center">
                    <Clock className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                    </div>
                    <Badge className="bg-orange-50 text-orange-600 border-0 text-xs font-medium">Today</Badge>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-gray-900">2</div>
                  <div className="text-sm font-medium text-gray-700">2 people waiting for your reply — Don't let leads go cold.</div>
                </div>
                <div className="mt-4 w-full bg-green-50 rounded-full h-1">
                  <div className="bg-green-500 h-1 rounded-full w-full"></div>
                </div>
              </CardContent>
            </Card>

            {/* Card 4 - Total WhatsApp Messages Sent */}
            <Card className="group hover:shadow-md transition-all duration-300 border border-gray-100 shadow-sm bg-white rounded-xl overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                    </div>
                    <Badge className="bg-green-50 text-green-600 border-0 text-xs font-medium">This Month</Badge>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-gray-900">84</div>
                  <div className="text-sm font-medium text-gray-700">84 messages sent this month — Keep engaging your customers.</div>
                </div>
                <div className="mt-4 w-full bg-green-50 rounded-full h-1">
                  <div className="bg-green-500 h-1 rounded-full w-4/5"></div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Reply Templates CTA */}
        <div className="flex justify-center">
          <Button variant="outline" className="bg-white border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300 px-6 py-3 rounded-full shadow-sm">
            <Lightbulb className="w-4 h-4 mr-2" />
            Create Quick Reply Templates
          </Button>
        </div>

        {/* Quick Action Tiles */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="group hover:shadow-md transition-all duration-300 border border-gray-100 shadow-sm cursor-pointer bg-white">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 mx-auto bg-gray-50 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-gray-100 transition-colors duration-300">
                  <PenTool className="w-8 h-8 text-gray-400" />
                </div>
                <CardTitle className="text-lg font-semibold text-gray-900">Create Your First Post</CardTitle>
                <CardDescription className="text-gray-500">
                  Design engaging content with AI assistance
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white group">
                  Create Post
                  <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-md transition-all duration-300 border border-gray-100 shadow-sm cursor-pointer bg-white">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 mx-auto bg-gray-50 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-gray-100 transition-colors duration-300">
                  <Target className="w-8 h-8 text-gray-400" />
                </div>
                <CardTitle className="text-lg font-semibold text-gray-900">Launch Your First Ad Campaign</CardTitle>
                <CardDescription className="text-gray-500">
                  Reach your audience with targeted advertising
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white group">
                  Launch Ad
                  <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-md transition-all duration-300 border border-gray-100 shadow-sm cursor-pointer bg-white">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 mx-auto bg-gray-50 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-gray-100 transition-colors duration-300">
                  <BarChart3 className="w-8 h-8 text-gray-400" />
                </div>
                <CardTitle className="text-lg font-semibold text-gray-900">View Posts & Campaign Summary</CardTitle>
                <CardDescription className="text-gray-500">
                  Track performance and insights
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white group">
                  View Summary
                  <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Premium Upgrade Teaser */}
        <Card className="group hover:shadow-md transition-all duration-300 border border-gray-100 shadow-sm bg-gray-50/50 relative overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center border border-gray-200">
                  <Crown className="w-6 h-6 text-gray-400" />
                </div>
                <div>
                  <CardTitle className="text-lg font-semibold text-gray-900 mb-1">Unlock Premium Features</CardTitle>
                  <p className="text-gray-600 text-sm">
                    Access unlimited campaigns, advanced WhatsApp insights, and priority support.
                  </p>
                </div>
              </div>
              <div className="flex justify-center md:justify-end">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 group">
                  Upgrade to Pro
                  <Crown className="w-4 h-4 ml-2 group-hover:scale-110 transition-transform" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
