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

  // New handler functions for the CTA buttons
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
          <div className="space-y-6">
            {/* Section Title with WhatsApp Icon */}
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">Your WhatsApp Performance</h2>
            </div>

            {/* WhatsApp Performance Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Card 1 - New WhatsApp Leads */}
              <Card className="group hover:shadow-md transition-all duration-300 border border-gray-100 shadow-sm bg-white rounded-xl overflow-hidden">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                  <div className="flex-1 space-y-3 mb-4">
                    <div className="text-3xl font-bold text-gray-900">8</div>
                    <div className="text-sm font-medium text-gray-700">New leads this week — Start the conversation.</div>
                  </div>
                  <div className="mb-4">
                    <Progress value={75} className="h-1 bg-green-50">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: '75%' }}></div>
                    </Progress>
                  </div>
                  <Button 
                    onClick={handleViewLeadsClick}
                    className="w-full bg-green-600 hover:bg-green-700 text-white group mt-auto"
                  >
                    View Leads
                    <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>

              {/* Card 2 - Active Conversations */}
              <Card className="group hover:shadow-md transition-all duration-300 border border-gray-100 shadow-sm bg-white rounded-xl overflow-hidden">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center">
                      <MessageSquare className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                  <div className="flex-1 space-y-3 mb-4">
                    <div className="text-3xl font-bold text-gray-900">3</div>
                    <div className="text-sm font-medium text-gray-700">Stay responsive to convert leads.</div>
                  </div>
                  <div className="mb-4">
                    <Progress value={50} className="h-1 bg-green-50">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: '50%' }}></div>
                    </Progress>
                  </div>
                  <Button 
                    onClick={handleOpenChatsClick}
                    className="w-full bg-green-600 hover:bg-green-700 text-white group mt-auto"
                  >
                    Open Chats
                    <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>

              {/* Card 3 - Replies Waiting */}
              <Card className="group hover:shadow-md transition-all duration-300 border border-gray-100 shadow-sm bg-white rounded-xl overflow-hidden">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center">
                      <Clock className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                  <div className="flex-1 space-y-3 mb-4">
                    <div className="text-3xl font-bold text-gray-900">2</div>
                    <div className="text-sm font-medium text-gray-700">People waiting for your reply — Don't let leads go cold.</div>
                  </div>
                  <div className="mb-4">
                    <Progress value={100} className="h-1 bg-green-50">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: '100%' }}></div>
                    </Progress>
                  </div>
                  <Button 
                    onClick={handleReplyNowClick}
                    className="w-full bg-green-600 hover:bg-green-700 text-white group mt-auto"
                  >
                    Reply Now
                    <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>

              {/* Card 4 - Messages Sent */}
              <Card className="group hover:shadow-md transition-all duration-300 border border-gray-100 shadow-sm bg-white rounded-xl overflow-hidden">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center">
                      <Mail className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                  <div className="flex-1 space-y-3 mb-4">
                    <div className="text-3xl font-bold text-gray-900">84</div>
                    <div className="text-sm font-medium text-gray-700">Messages sent this month — Keep engaging your customers.</div>
                  </div>
                  <div className="mb-4">
                    <Progress value={80} className="h-1 bg-green-50">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: '80%' }}></div>
                    </Progress>
                  </div>
                  <Button 
                    onClick={handleViewMessageSummaryClick}
                    className="w-full bg-green-600 hover:bg-green-700 text-white group mt-auto"
                  >
                    View Summary
                    <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Quick Actions Section */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="group hover:shadow-md transition-all duration-300 border border-gray-100 shadow-sm cursor-pointer bg-white">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 mx-auto bg-gray-50 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-gray-100 transition-colors duration-300">
                    <Feather className="w-8 h-8 text-gray-400" />
                  </div>
                  <CardTitle className="text-lg font-semibold text-gray-900">Create Your First Post</CardTitle>
                  <CardDescription className="text-gray-500">
                    Design engaging content with AI assistance
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <Button 
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white group"
                    onClick={handleCreatePostClick}
                  >
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
                  <Button 
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white group"
                    onClick={handleLaunchAdClick}
                  >
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
                  <Button 
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white group"
                    onClick={handleViewSummaryClick}
                  >
                    View Summary
                    <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* CRM Access Card - Simplified without Automations */}
          <Card className="group hover:shadow-md transition-all duration-300 border border-gray-100 shadow-sm bg-gradient-to-r from-green-50 to-blue-50 relative overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center border border-gray-200">
                    <Users className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-semibold text-gray-900 mb-1">WhatsApp CRM & Lead Management</CardTitle>
                    <p className="text-gray-600 text-sm">
                      Manage your WhatsApp leads and track your sales pipeline.
                    </p>
                  </div>
                </div>
                <div className="flex justify-center md:justify-end">
                  <Button 
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 group"
                    onClick={handleCRMClick}
                  >
                    Open CRM
                    <MessageCircle className="w-4 h-4 ml-2 group-hover:scale-110 transition-transform" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

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
                  <Button 
                    className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 group"
                    onClick={handleUpgradeToProClick}
                  >
                    Upgrade to Pro
                    <Crown className="w-4 h-4 ml-2 group-hover:scale-110 transition-transform" />
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
