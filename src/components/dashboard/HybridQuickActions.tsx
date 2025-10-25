import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  MessageCircle,
  Send,
  Bot,
  Feather,
  Target,
  BarChart3,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface HybridQuickActionsProps {
  agingLeads: number;
  activeWorkflows: number;
}

export function HybridQuickActions({
  agingLeads,
  activeWorkflows,
}: HybridQuickActionsProps) {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* WhatsApp Actions Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
            <MessageCircle className="w-4 h-4 text-white" />
          </div>
          <h2 className="text-lg font-bold text-gray-900">Quick Actions for WhatsApp</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Reply to Urgent Leads */}
          <Card className="group hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-red-50 to-orange-50 border-0">
            <CardHeader className="text-center pb-3">
              <div className="w-14 h-14 mx-auto bg-gradient-to-br from-red-100 to-orange-100 rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <MessageCircle className="w-7 h-7 text-red-600" />
              </div>
              <CardTitle className="text-base font-bold">Reply to Urgent Leads</CardTitle>
              <CardDescription className="text-xs">
                {agingLeads} waiting for response
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() =>
                  navigate("/", {
                    state: { view: "crm", filter: { aging: true, source: "whatsapp" } },
                  })
                }
                className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white group/btn"
              >
                Reply Now
                <ChevronRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
              </Button>
            </CardContent>
          </Card>

          {/* Send Bulk WhatsApp Message */}
          <Card className="group hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-green-50 to-emerald-50 border-0">
            <CardHeader className="text-center pb-3">
              <div className="w-14 h-14 mx-auto bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Send className="w-7 h-7 text-green-600" />
              </div>
              <CardTitle className="text-base font-bold">Send Bulk Message</CardTitle>
              <CardDescription className="text-xs">
                To segment or all contacts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() => navigate("/", { state: { view: "templates" } })}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white group/btn"
              >
                Send
                <ChevronRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
              </Button>
            </CardContent>
          </Card>

          {/* Launch AI Sales Campaign */}
          <Card className="group hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-purple-50 to-pink-50 border-0">
            <CardHeader className="text-center pb-3">
              <div className="w-14 h-14 mx-auto bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Bot className="w-7 h-7 text-purple-600" />
              </div>
              <CardTitle className="text-base font-bold">Launch AI Campaign</CardTitle>
              <CardDescription className="text-xs">
                {activeWorkflows} active workflow{activeWorkflows !== 1 ? "s" : ""}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() => navigate("/", { state: { view: "ai-sales" } })}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white group/btn"
              >
                Launch
                <ChevronRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Create & Promote Section */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-gray-900">Create & Promote</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Create Post Card */}
          <Card className="group relative overflow-hidden bg-gradient-to-br from-white via-purple-50/30 to-pink-50/20 border-0 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2 hover:scale-[1.02]">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500"></div>
            <CardHeader className="text-center pb-3 relative z-10">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl flex items-center justify-center mb-4 group-hover:from-purple-200 group-hover:to-pink-200 transition-all duration-300 shadow-lg group-hover:shadow-xl group-hover:scale-110">
                <Feather className="w-8 h-8 text-purple-600 group-hover:text-purple-700 transition-colors" />
              </div>
              <CardTitle className="text-base font-bold text-gray-900 mb-1 group-hover:text-purple-900 transition-colors">
                Create Your First Post
              </CardTitle>
              <CardDescription className="text-xs text-gray-600 leading-relaxed">
                Design engaging content with AI assistance
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0 relative z-10">
              <Button
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl group/btn transition-all duration-300 py-2 text-sm font-semibold"
                onClick={() => navigate("/post-builder")}
              >
                Create Post
                <ChevronRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform duration-300" />
              </Button>
            </CardContent>
          </Card>

          {/* Launch Ad Card */}
          <Card className="group relative overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/20 border-0 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2 hover:scale-[1.02]">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500"></div>
            <CardHeader className="text-center pb-3 relative z-10">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-100 to-indigo-100 rounded-3xl flex items-center justify-center mb-4 group-hover:from-blue-200 group-hover:to-indigo-200 transition-all duration-300 shadow-lg group-hover:shadow-xl group-hover:scale-110">
                <Target className="w-8 h-8 text-blue-600 group-hover:text-blue-700 transition-colors" />
              </div>
              <CardTitle className="text-base font-bold text-gray-900 mb-1 group-hover:text-blue-900 transition-colors">
                Launch Your First Ad Campaign
              </CardTitle>
              <CardDescription className="text-xs text-gray-600 leading-relaxed">
                Reach your audience with targeted advertising
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0 relative z-10">
              <Button
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl group/btn transition-all duration-300 py-2 text-sm font-semibold"
                onClick={() => navigate("/ad-builder")}
              >
                Launch Ad
                <ChevronRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform duration-300" />
              </Button>
            </CardContent>
          </Card>

          {/* View Summary Card */}
          <Card className="group relative overflow-hidden bg-gradient-to-br from-white via-emerald-50/30 to-teal-50/20 border-0 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2 hover:scale-[1.02]">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-teal-500"></div>
            <CardHeader className="text-center pb-3 relative z-10">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-emerald-100 to-teal-100 rounded-3xl flex items-center justify-center mb-4 group-hover:from-emerald-200 group-hover:to-teal-200 transition-all duration-300 shadow-lg group-hover:shadow-xl group-hover:scale-110">
                <BarChart3 className="w-8 h-8 text-emerald-600 group-hover:text-emerald-700 transition-colors" />
              </div>
              <CardTitle className="text-base font-bold text-gray-900 mb-1 group-hover:text-emerald-900 transition-colors">
                View Posts & Campaign Summary
              </CardTitle>
              <CardDescription className="text-xs text-gray-600 leading-relaxed">
                Track performance and insights
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0 relative z-10">
              <Button
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg hover:shadow-xl group/btn transition-all duration-300 py-2 text-sm font-semibold"
                onClick={() => navigate("/", { state: { view: "insights-summary" } })}
              >
                View Summary
                <ChevronRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform duration-300" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
