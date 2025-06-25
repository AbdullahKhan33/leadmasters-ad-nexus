
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Feather, 
  Target, 
  BarChart3, 
  Sparkles,
  ChevronRight,
  Crown,
  MessageCircle,
  Clock,
  Mail,
  Lightbulb,
  Users,
  MessageSquare
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PricingScreen } from "./PricingScreen";

export function Dashboard() {
  const navigate = useNavigate();
  const [showPricing, setShowPricing] = useState(false);

  const handleNewLeadsClick = () => {
    navigate('/', { state: { view: 'crm' } });
  };

  const handleActiveChatsClick = () => {
    navigate('/', { state: { view: 'crm' } });
  };

  const handleAwaitingReplyClick = () => {
    navigate('/', { state: { view: 'crm' } });
  };

  const handleMessagesSentClick = () => {
    navigate('/', { state: { view: 'insights-whatsapp' } });
  };

  const handleCreatePostClick = () => {
    navigate('/post-builder');
  };

  const handleLaunchAdClick = () => {
    navigate('/ad-builder');
  };

  const handleViewSummaryClick = () => {
    navigate('/', { state: { view: 'insights-summary' } });
  };

  const handleCRMClick = () => {
    navigate('/', { state: { view: 'crm' } });
  };

  const handleUpgradeToProClick = () => {
    setShowPricing(true);
  };

  const handleViewLeadsClick = () => {
    navigate('/', { 
      state: { 
        view: 'crm',
        filter: { status: 'new' }
      } 
    });
  };

  const handleOpenChatsClick = () => {
    navigate('/', { 
      state: { 
        view: 'crm',
        filter: { status: 'active' }
      } 
    });
  };

  const handleReplyNowClick = () => {
    navigate('/', { 
      state: { 
        view: 'crm',
        filter: { status: 'awaitingReply' }
      } 
    });
  };

  const handleViewMessageSummaryClick = () => {
    navigate('/', { state: { view: 'insights-whatsapp' } });
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50/30 p-4">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Welcome Header */}
          <div className="text-center space-y-3 py-6">
            <div className="flex items-center justify-center space-x-2">
              <span className="text-2xl">👋</span>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Welcome back, Abdullah!
              </h1>
              <Sparkles className="w-6 h-6 text-gray-400 animate-pulse" />
            </div>
            <p className="text-sm text-gray-600 max-w-2xl mx-auto">
              Let's grow your campaigns and posts with AI-powered ease.
            </p>
          </div>

          {/* Quick Actions Section - Enhanced */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-gray-900">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Create Post Card - Enhanced */}
              <Card className="group relative overflow-hidden bg-gradient-to-br from-white via-purple-50/30 to-pink-50/20 border-0 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2 hover:scale-[1.02]">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500"></div>
                <CardHeader className="text-center pb-3 relative z-10">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl flex items-center justify-center mb-4 group-hover:from-purple-200 group-hover:to-pink-200 transition-all duration-300 shadow-lg group-hover:shadow-xl group-hover:scale-110">
                    <Feather className="w-8 h-8 text-purple-600 group-hover:text-purple-700 transition-colors" />
                  </div>
                  <CardTitle className="text-base font-bold text-gray-900 mb-1 group-hover:text-purple-900 transition-colors">Create Your First Post</CardTitle>
                  <CardDescription className="text-xs text-gray-600 leading-relaxed">
                    Design engaging content with AI assistance
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0 relative z-10">
                  <Button 
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl group/btn transition-all duration-300 py-2 text-sm font-semibold"
                    onClick={handleCreatePostClick}
                  >
                    Create Post
                    <ChevronRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </Button>
                </CardContent>
              </Card>

              {/* Launch Ad Card - Enhanced */}
              <Card className="group relative overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/20 border-0 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2 hover:scale-[1.02]">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500"></div>
                <CardHeader className="text-center pb-3 relative z-10">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-100 to-indigo-100 rounded-3xl flex items-center justify-center mb-4 group-hover:from-blue-200 group-hover:to-indigo-200 transition-all duration-300 shadow-lg group-hover:shadow-xl group-hover:scale-110">
                    <Target className="w-8 h-8 text-blue-600 group-hover:text-blue-700 transition-colors" />
                  </div>
                  <CardTitle className="text-base font-bold text-gray-900 mb-1 group-hover:text-blue-900 transition-colors">Launch Your First Ad Campaign</CardTitle>
                  <CardDescription className="text-xs text-gray-600 leading-relaxed">
                    Reach your audience with targeted advertising
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0 relative z-10">
                  <Button 
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl group/btn transition-all duration-300 py-2 text-sm font-semibold"
                    onClick={handleLaunchAdClick}
                  >
                    Launch Ad
                    <ChevronRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </Button>
                </CardContent>
              </Card>

              {/* View Summary Card - Enhanced */}
              <Card className="group relative overflow-hidden bg-gradient-to-br from-white via-emerald-50/30 to-teal-50/20 border-0 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2 hover:scale-[1.02]">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-teal-500"></div>
                <CardHeader className="text-center pb-3 relative z-10">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-emerald-100 to-teal-100 rounded-3xl flex items-center justify-center mb-4 group-hover:from-emerald-200 group-hover:to-teal-200 transition-all duration-300 shadow-lg group-hover:shadow-xl group-hover:scale-110">
                    <BarChart3 className="w-8 h-8 text-emerald-600 group-hover:text-emerald-700 transition-colors" />
                  </div>
                  <CardTitle className="text-base font-bold text-gray-900 mb-1 group-hover:text-emerald-900 transition-colors">View Posts & Campaign Summary</CardTitle>
                  <CardDescription className="text-xs text-gray-600 leading-relaxed">
                    Track performance and insights
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0 relative z-10">
                  <Button 
                    className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg hover:shadow-xl group/btn transition-all duration-300 py-2 text-sm font-semibold"
                    onClick={handleViewSummaryClick}
                  >
                    View Summary
                    <ChevronRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* WhatsApp Performance Section */}
          <div className="space-y-4">
            {/* Section Title with WhatsApp Icon */}
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <MessageSquare className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-base font-semibold text-gray-800">Your WhatsApp Performance</h2>
            </div>

            {/* WhatsApp Performance Cards - All Green Theme */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Card 1 - New WhatsApp Leads */}
              <Card className="group hover:shadow-md transition-all duration-300 border border-gray-100 shadow-sm bg-white rounded-xl overflow-hidden">
                <CardContent className="p-4 flex flex-col h-full">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-50 to-green-100 rounded-full flex items-center justify-center">
                      <Users className="w-5 h-5 text-green-600" />
                    </div>
                  </div>
                  <div className="flex-1 space-y-2 mb-3">
                    <div className="text-2xl font-bold text-gray-900">8</div>
                    <div className="text-xs font-medium text-gray-700">New leads this week — Start the conversation.</div>
                  </div>
                  <div className="mb-3">
                    <Progress value={75} className="h-1 bg-green-50">
                      <div className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full" style={{ width: '75%' }}></div>
                    </Progress>
                  </div>
                  <Button 
                    onClick={handleViewLeadsClick}
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white group mt-auto text-xs py-2"
                  >
                    View Leads
                    <ChevronRight className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>

              {/* Card 2 - Active Conversations */}
              <Card className="group hover:shadow-md transition-all duration-300 border border-gray-100 shadow-sm bg-white rounded-xl overflow-hidden">
                <CardContent className="p-4 flex flex-col h-full">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-50 to-green-100 rounded-full flex items-center justify-center">
                      <MessageSquare className="w-5 h-5 text-green-600" />
                    </div>
                  </div>
                  <div className="flex-1 space-y-2 mb-3">
                    <div className="text-2xl font-bold text-gray-900">3</div>
                    <div className="text-xs font-medium text-gray-700">Stay responsive to convert leads.</div>
                  </div>
                  <div className="mb-3">
                    <Progress value={50} className="h-1 bg-green-50">
                      <div className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full" style={{ width: '50%' }}></div>
                    </Progress>
                  </div>
                  <Button 
                    onClick={handleOpenChatsClick}
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white group mt-auto text-xs py-2"
                  >
                    Open Chats
                    <ChevronRight className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>

              {/* Card 3 - Replies Waiting */}
              <Card className="group hover:shadow-md transition-all duration-300 border border-gray-100 shadow-sm bg-white rounded-xl overflow-hidden">
                <CardContent className="p-4 flex flex-col h-full">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-50 to-green-100 rounded-full flex items-center justify-center">
                      <Clock className="w-5 h-5 text-green-600" />
                    </div>
                  </div>
                  <div className="flex-1 space-y-2 mb-3">
                    <div className="text-2xl font-bold text-gray-900">2</div>
                    <div className="text-xs font-medium text-gray-700">People waiting for your reply — Don't let leads go cold.</div>
                  </div>
                  <div className="mb-3">
                    <Progress value={100} className="h-1 bg-green-50">
                      <div className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full" style={{ width: '100%' }}></div>
                    </Progress>
                  </div>
                  <Button 
                    onClick={handleReplyNowClick}
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white group mt-auto text-xs py-2"
                  >
                    Reply Now
                    <ChevronRight className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>

              {/* Card 4 - Messages Sent */}
              <Card className="group hover:shadow-md transition-all duration-300 border border-gray-100 shadow-sm bg-white rounded-xl overflow-hidden">
                <CardContent className="p-4 flex flex-col h-full">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-50 to-green-100 rounded-full flex items-center justify-center">
                      <Mail className="w-5 h-5 text-green-600" />
                    </div>
                  </div>
                  <div className="flex-1 space-y-2 mb-3">
                    <div className="text-2xl font-bold text-gray-900">84</div>
                    <div className="text-xs font-medium text-gray-700">Messages sent this month — Keep engaging your customers.</div>
                  </div>
                  <div className="mb-3">
                    <Progress value={80} className="h-1 bg-green-50">
                      <div className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full" style={{ width: '80%' }}></div>
                    </Progress>
                  </div>
                  <Button 
                    onClick={handleViewMessageSummaryClick}
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white group mt-auto text-xs py-2"
                  >
                    View Summary
                    <ChevronRight className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* CRM Access Card - Simplified without Automations */}
          <Card className="group hover:shadow-md transition-all duration-300 border border-gray-100 shadow-sm bg-gradient-to-r from-green-50 to-blue-50 relative overflow-hidden">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center border border-gray-200">
                    <Users className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <CardTitle className="text-base font-semibold text-gray-900 mb-1">WhatsApp CRM & Lead Management</CardTitle>
                    <p className="text-gray-600 text-xs">
                      Manage your WhatsApp leads and track your sales pipeline.
                    </p>
                  </div>
                </div>
                <div className="flex justify-center md:justify-end">
                  <Button 
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 group text-xs"
                    onClick={handleCRMClick}
                  >
                    Open CRM
                    <MessageCircle className="w-3 h-3 ml-2 group-hover:scale-110 transition-transform" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Premium Upgrade Teaser */}
          <Card className="group hover:shadow-md transition-all duration-300 border border-gray-100 shadow-sm bg-gray-50/50 relative overflow-hidden">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center border border-gray-200">
                    <Crown className="w-5 h-5 text-gray-400" />
                  </div>
                  <div>
                    <CardTitle className="text-base font-semibold text-gray-900 mb-1">Unlock Premium Features</CardTitle>
                    <p className="text-gray-600 text-xs">
                      Access unlimited campaigns, advanced WhatsApp insights, and priority support.
                    </p>
                  </div>
                </div>
                <div className="flex justify-center md:justify-end">
                  <Button 
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 group text-xs"
                    onClick={handleUpgradeToProClick}
                  >
                    Upgrade to Pro
                    <Crown className="w-3 h-3 ml-2 group-hover:scale-110 transition-transform" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {showPricing && <PricingScreen onClose={() => setShowPricing(false)} />}
    </>
  );
}
