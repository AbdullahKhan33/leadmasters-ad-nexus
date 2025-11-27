import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PremiumLockCard } from "@/components/premium/PremiumLockCard";
import { usePremium } from "@/contexts/PremiumContext";
import { PremiumUpgradeModal } from "@/components/premium/PremiumUpgradeModal";
import { Facebook, Instagram, Twitter, Linkedin, ChevronDown, Users, MessageSquare, Heart, Eye, MousePointer, BarChart3, UserCheck, Lock, TrendingUp, Share2, ThumbsUp, Activity } from "lucide-react";

// Platform Navigation Component (matching AdPlatformMenu style)
const platforms = [
  { name: "Overview", icon: BarChart3, id: "overview" },
  { name: "Facebook", icon: Facebook, id: "facebook" },
  { name: "Instagram", icon: Instagram, id: "instagram" },
  { name: "Threads", icon: Twitter, id: "threads" },
  { name: "LinkedIn", icon: Linkedin, id: "linkedin" },
];

interface InsightsPlatformMenuProps {
  activePlatform?: string;
  onPlatformChange?: (platformId: string) => void;
}

function InsightsPlatformMenu({ activePlatform = "overview", onPlatformChange, onUpgradeClick }: InsightsPlatformMenuProps & { onUpgradeClick: (feature: string) => void }) {
  const [selectedPlatform, setSelectedPlatform] = useState(activePlatform);
  const { isPremium } = usePremium();

  const handlePlatformClick = (platformId: string) => {
    // Check if platform requires premium
    if ((platformId === 'instagram' || platformId === 'linkedin') && !isPremium) {
      onUpgradeClick(platformId === 'instagram' ? 'Instagram Insights' : 'LinkedIn Insights');
      return;
    }
    
    setSelectedPlatform(platformId);
    onPlatformChange?.(platformId);
  };

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-5">
      <div className="flex items-center space-x-2">
        {platforms.map((platform) => {
          const isActive = selectedPlatform === platform.id;
          const isLocked = (platform.id === 'instagram' || platform.id === 'linkedin') && !isPremium;
          const isImplemented = true;
          
          return (
            <Button
              key={platform.name}
              variant="ghost"
              onClick={() => handlePlatformClick(platform.id)}
              disabled={!isImplemented}
              className={`
                px-5 py-2 rounded-full transition-all duration-200 ease-out flex items-center space-x-2.5 relative group cursor-pointer
                ${isActive 
                  ? 'bg-gradient-to-r from-[#7C3AED] to-[#D946EF] text-white font-semibold shadow-lg hover:from-purple-700 hover:to-pink-600 hover:text-white' 
                  : isImplemented
                    ? 'text-gray-600 hover:text-white hover:bg-gray-700 font-medium'
                    : 'text-gray-400 cursor-not-allowed opacity-50'
                }
              `}
            >
              <platform.icon className={`w-4 h-4 transition-colors duration-200 ${isActive ? 'text-white' : ''}`} />
              <span className="text-sm transition-colors duration-200">{platform.name}</span>
              {isLocked && <Lock className="w-3 h-3 ml-1" />}
              {isActive && (
                <div className="absolute -bottom-0.5 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-white rounded-full shadow-sm" />
              )}
              {!isImplemented && (
                <span className="text-xs opacity-60 ml-1">(Coming Soon)</span>
              )}
            </Button>
          );
        })}
      </div>
    </div>
  );
}

const FacebookInsights = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-stone-50 to-neutral-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-semibold text-gray-900 mb-2">Facebook Insights</h1>
          <p className="text-gray-600">Your performance at a glance</p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-12 gap-4 auto-rows-[140px]">
          {/* Large Hero Card - Total Followers */}
          <Card className="col-span-12 md:col-span-6 lg:col-span-4 row-span-2 bg-gradient-to-br from-blue-500 to-blue-600 border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] group overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <CardContent className="p-8 h-full flex flex-col justify-between relative z-10">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <p className="text-blue-100 text-sm font-medium mb-2">Total Followers</p>
              </div>
              <div>
                <h2 className="text-5xl font-bold text-white mb-2">45.2K</h2>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-medium">
                    <TrendingUp className="w-3 h-3" />
                    +12% this month
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Medium Card - Engagement Rate */}
          <Card className="col-span-6 md:col-span-3 lg:col-span-4 row-span-2 bg-white border-0 shadow-md hover:shadow-xl transition-all duration-500 hover:scale-[1.02] group">
            <CardContent className="p-6 h-full flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-100 to-pink-100 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                  <Heart className="w-5 h-5 text-rose-500" />
                </div>
                <p className="text-gray-600 text-sm font-medium mb-1">Engagement Rate</p>
              </div>
              <div>
                <h3 className="text-4xl font-bold text-gray-900 mb-2">8.4%</h3>
                <p className="text-sm text-emerald-600 font-medium">+2.3% vs last week</p>
              </div>
            </CardContent>
          </Card>

          {/* Tall Card - Reach */}
          <Card className="col-span-6 md:col-span-3 lg:col-span-4 row-span-2 bg-gradient-to-br from-purple-500 to-purple-600 border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] group overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <CardContent className="p-6 h-full flex flex-col justify-between relative z-10">
              <div>
                <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <p className="text-purple-100 text-sm font-medium mb-1">Total Reach</p>
              </div>
              <div>
                <h3 className="text-4xl font-bold text-white mb-2">128K</h3>
                <div className="flex items-center gap-2">
                  <div className="px-2 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-medium">
                    +18% growth
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Small Cards Row */}
          <Card className="col-span-6 md:col-span-4 lg:col-span-3 bg-white border-0 shadow-md hover:shadow-xl transition-all duration-500 hover:scale-[1.02]">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center">
                  <Eye className="w-4 h-4 text-amber-600" />
                </div>
                <TrendingUp className="w-4 h-4 text-emerald-500" />
              </div>
              <p className="text-gray-600 text-xs font-medium mb-1">Page Views</p>
              <h4 className="text-2xl font-bold text-gray-900">23.5K</h4>
            </CardContent>
          </Card>

          <Card className="col-span-6 md:col-span-4 lg:col-span-3 bg-white border-0 shadow-md hover:shadow-xl transition-all duration-500 hover:scale-[1.02]">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center">
                  <MessageSquare className="w-4 h-4 text-emerald-600" />
                </div>
                <TrendingUp className="w-4 h-4 text-emerald-500" />
              </div>
              <p className="text-gray-600 text-xs font-medium mb-1">Comments</p>
              <h4 className="text-2xl font-bold text-gray-900">1,234</h4>
            </CardContent>
          </Card>

          <Card className="col-span-6 md:col-span-4 lg:col-span-3 bg-white border-0 shadow-md hover:shadow-xl transition-all duration-500 hover:scale-[1.02]">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                  <Share2 className="w-4 h-4 text-blue-600" />
                </div>
                <TrendingUp className="w-4 h-4 text-emerald-500" />
              </div>
              <p className="text-gray-600 text-xs font-medium mb-1">Shares</p>
              <h4 className="text-2xl font-bold text-gray-900">892</h4>
            </CardContent>
          </Card>

          <Card className="col-span-6 md:col-span-4 lg:col-span-3 bg-white border-0 shadow-md hover:shadow-xl transition-all duration-500 hover:scale-[1.02]">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-violet-100 to-purple-100 flex items-center justify-center">
                  <ThumbsUp className="w-4 h-4 text-violet-600" />
                </div>
                <TrendingUp className="w-4 h-4 text-emerald-500" />
              </div>
              <p className="text-gray-600 text-xs font-medium mb-1">Reactions</p>
              <h4 className="text-2xl font-bold text-gray-900">4.2K</h4>
            </CardContent>
          </Card>

          {/* Wide Card - Top Posts */}
          <Card className="col-span-12 lg:col-span-8 row-span-2 bg-white border-0 shadow-md hover:shadow-xl transition-all duration-500">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-semibold text-gray-900">Top Performing Posts</CardTitle>
                  <p className="text-sm text-gray-500 mt-1">Your best content this week</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { title: "Summer Product Launch Post", engagement: "1.2K", comments: "234", type: "Photo" },
                { title: "Behind the Scenes Video", engagement: "980", comments: "156", type: "Video" },
                { title: "Customer Success Story", engagement: "756", comments: "89", type: "Link" }
              ].map((post, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-br from-gray-50 to-stone-50 hover:from-gray-100 hover:to-stone-100 transition-all duration-300 border border-gray-100">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                      #{i + 1}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 mb-1">{post.title}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-600">
                        <span className="flex items-center gap-1">
                          <Heart className="w-3 h-3" />
                          {post.engagement}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageSquare className="w-3 h-3" />
                          {post.comments}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-gradient-to-r from-gray-100 to-stone-100 text-gray-700 text-xs font-medium">
                    {post.type}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Medium Card - Audience Growth */}
          <Card className="col-span-12 md:col-span-6 lg:col-span-4 row-span-2 bg-gradient-to-br from-emerald-500 to-teal-600 border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] group overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <CardContent className="p-6 h-full flex flex-col justify-between relative z-10">
              <div>
                <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Activity className="w-5 h-5 text-white" />
                </div>
                <p className="text-emerald-100 text-sm font-medium mb-2">Audience Growth</p>
                <p className="text-emerald-50/80 text-xs">Past 30 days</p>
              </div>
              <div>
                <h3 className="text-4xl font-bold text-white mb-2">+5,420</h3>
                <p className="text-sm text-white/90 font-medium">New followers</p>
                <div className="mt-4 pt-4 border-t border-white/20">
                  <div className="flex items-center justify-between text-xs text-white/80">
                    <span>Daily avg: +180</span>
                    <span className="flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      +24%
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

const InstagramInsights = () => {
  const [selectedAccount, setSelectedAccount] = useState("lead-masters-ai");

  const accounts = [
    { id: "lead-masters-ai", name: "Lead Masters AI", followers: "2,543", engagement: "4.8%" },
    { id: "secondary-account", name: "Secondary Business Account", followers: "1,234", engagement: "3.2%" },
    { id: "test-account", name: "Test Account", followers: "567", engagement: "2.1%" }
  ];

  const currentAccount = accounts.find(a => a.id === selectedAccount) || accounts[0];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 bg-gradient-to-br from-slate-50 via-white to-pink-50/20 min-h-screen font-inter">
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white border border-gray-200">
        <div className="p-8">
          <div className="flex items-start justify-between mb-8">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl overflow-hidden border-2 border-gray-100 shadow-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face" 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-3 border-white shadow-md flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
              
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2 font-inter">Instagram Performance</h1>
                <p className="text-lg font-medium text-gray-700 mb-3 font-inter">{currentAccount.name}</p>
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-pink-500" />
                    <span className="text-gray-600 text-sm font-medium font-inter">{currentAccount.followers} followers</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Heart className="w-4 h-4 text-pink-500" />
                    <span className="text-gray-600 text-sm font-medium font-inter">{currentAccount.engagement} engagement</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
              <Select value={selectedAccount} onValueChange={setSelectedAccount}>
                <SelectTrigger className="w-64 bg-white border-gray-300 text-gray-900 font-inter">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {accounts.map((account) => (
                    <SelectItem key={account.id} value={account.id} className="font-inter">
                      <div className="flex items-center justify-between w-full">
                        <span>{account.name}</span>
                        <span className="text-gray-500 text-sm ml-4">{account.followers}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-5 gap-6">
            {[
              { 
                label: "Followers", 
                value: "2,543", 
                sublabel: "Total audience", 
                icon: Users,
                color: "from-pink-500 to-pink-600",
                bgColor: "bg-pink-50"
              },
              { 
                label: "Following", 
                value: "234", 
                sublabel: "Accounts followed", 
                icon: UserCheck,
                color: "from-gray-500 to-gray-600",
                bgColor: "bg-gray-50"
              },
              { 
                label: "Posts", 
                value: "156", 
                sublabel: "This month", 
                icon: MessageSquare,
                color: "from-purple-500 to-purple-600",
                bgColor: "bg-purple-50"
              },
              { 
                label: "Impressions", 
                value: "89.3K", 
                sublabel: "Monthly reach", 
                icon: Eye,
                color: "from-indigo-500 to-indigo-600",
                bgColor: "bg-indigo-50"
              },
              { 
                label: "Engagement Rate", 
                value: "4.8%", 
                sublabel: "Average interaction", 
                icon: Heart,
                color: "from-pink-500 to-pink-600",
                bgColor: "bg-pink-50"
              }
            ].map((stat, index) => (
              <div key={index} className={`${stat.bgColor} rounded-xl p-6 border border-gray-100 hover:shadow-md transition-all duration-300 hover:scale-105`}>
                <div className="text-center">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} mx-auto mb-4 flex items-center justify-center shadow-lg`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-1 font-inter">{stat.value}</div>
                  <div className="text-sm text-gray-700 font-semibold mb-1 font-inter">{stat.label}</div>
                  <div className="text-xs text-gray-500 font-inter">{stat.sublabel}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Performance Analytics Section Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 font-inter">Performance Analytics</h2>
          <p className="text-gray-600 mt-1 font-inter">Detailed insights for the last 28 days</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500 font-inter">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span>Live data • Updated 5 minutes ago</span>
        </div>
      </div>

      {/* Discovery Section */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-gray-900 flex items-center font-inter">
          <div className="w-1 h-6 bg-gradient-to-b from-pink-500 to-purple-600 rounded mr-3"></div>
          Discovery & Reach
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { 
              title: "Story Reach", 
              value: "18,432", 
              change: "+22.3%", 
              trend: "up",
              icon: Users, 
              color: "from-pink-500 to-pink-600",
              progress: 85
            },
            { 
              title: "Post Engagement", 
              value: "1,245", 
              change: "+15.7%", 
              trend: "up",
              icon: Heart, 
              color: "from-purple-500 to-purple-600",
              progress: 72
            },
            { 
              title: "Profile Views", 
              value: "3,421", 
              change: "+18.9%", 
              trend: "up",
              icon: Eye, 
              color: "from-indigo-500 to-indigo-600",
              progress: 68
            },
            { 
              title: "New Followers", 
              value: "234", 
              change: "+28.1%", 
              trend: "up",
              icon: Users, 
              color: "from-blue-500 to-blue-600",
              progress: 61
            }
          ].map((metric, index) => (
            <Card key={metric.title} className="group border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 bg-white hover:scale-105">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${metric.color} flex items-center justify-center shadow-lg`}>
                    <metric.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-semibold font-inter ${
                    metric.trend === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {metric.change}
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <p className="text-2xl font-bold text-gray-900 font-inter">{metric.value}</p>
                    <p className="text-sm text-gray-600 font-medium font-inter">{metric.title}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-inter">
                      <span className="text-gray-500">Progress</span>
                      <span className="text-gray-700 font-semibold">{metric.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full bg-gradient-to-r ${metric.color} transition-all duration-1000 ease-out`}
                        style={{ width: `${metric.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Interactions Section */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-gray-900 flex items-center font-inter">
          <div className="w-1 h-6 bg-gradient-to-b from-pink-500 to-red-600 rounded mr-3"></div>
          Engagement & Interactions
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {[
            { 
              title: "Likes", 
              value: "2,143", 
              change: "+25.3%", 
              trend: "up",
              icon: Heart, 
              color: "from-pink-500 to-pink-600"
            },
            { 
              title: "Comments", 
              value: "456", 
              change: "+18.7%", 
              trend: "up",
              icon: MessageSquare, 
              color: "from-blue-500 to-blue-600"
            },
            { 
              title: "Shares", 
              value: "234", 
              change: "+12.4%", 
              trend: "up",
              icon: Users, 
              color: "from-green-500 to-green-600"
            },
            { 
              title: "Story Views", 
              value: "5,632", 
              change: "+31.2%", 
              trend: "up",
              icon: Eye, 
              color: "from-orange-500 to-orange-600"
            },
            { 
              title: "Profile Visits", 
              value: "892", 
              change: "+19.8%", 
              trend: "up",
              icon: MousePointer, 
              color: "from-purple-500 to-purple-600"
            }
          ].map((metric, index) => (
            <Card key={metric.title} className="group border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 bg-white hover:scale-105">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${metric.color} flex items-center justify-center shadow-md`}>
                    <metric.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-right">
                    <div className={`px-2 py-1 rounded-full text-xs font-semibold font-inter ${
                      metric.trend === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {metric.change}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <p className="text-2xl font-bold text-gray-900 font-inter">{metric.value}</p>
                  <p className="text-sm text-gray-600 font-medium font-inter">{metric.title}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

const ThreadsInsights = () => {
  const [selectedAccount, setSelectedAccount] = useState("lead-masters-ai");

  const accounts = [
    { id: "lead-masters-ai", name: "Lead Masters AI", followers: "892", engagement: "5.2%" },
    { id: "secondary-account", name: "Secondary Business Account", followers: "456", engagement: "3.8%" },
    { id: "test-account", name: "Test Account", followers: "123", engagement: "2.5%" }
  ];

  const currentAccount = accounts.find(a => a.id === selectedAccount) || accounts[0];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 bg-gradient-to-br from-slate-50 via-white to-gray-50/20 min-h-screen font-inter">
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white border border-gray-200">
        <div className="p-8">
          <div className="flex items-start justify-between mb-8">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-gray-50 to-slate-50 rounded-2xl overflow-hidden border-2 border-gray-100 shadow-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face" 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-3 border-white shadow-md flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
              
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2 font-inter">Threads Performance</h1>
                <p className="text-lg font-medium text-gray-700 mb-3 font-inter">{currentAccount.name}</p>
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-gray-600" />
                    <span className="text-gray-600 text-sm font-medium font-inter">{currentAccount.followers} followers</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Heart className="w-4 h-4 text-pink-500" />
                    <span className="text-gray-600 text-sm font-medium font-inter">{currentAccount.engagement} engagement</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
              <Select value={selectedAccount} onValueChange={setSelectedAccount}>
                <SelectTrigger className="w-64 bg-white border-gray-300 text-gray-900 font-inter">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {accounts.map((account) => (
                    <SelectItem key={account.id} value={account.id} className="font-inter">
                      <div className="flex items-center justify-between w-full">
                        <span>{account.name}</span>
                        <span className="text-gray-500 text-sm ml-4">{account.followers}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-5 gap-6">
            {[
              { 
                label: "Followers", 
                value: "892", 
                sublabel: "Total audience", 
                icon: Users,
                color: "from-gray-500 to-gray-600",
                bgColor: "bg-gray-50"
              },
              { 
                label: "Following", 
                value: "67", 
                sublabel: "Accounts followed", 
                icon: UserCheck,
                color: "from-slate-500 to-slate-600",
                bgColor: "bg-slate-50"
              },
              { 
                label: "Posts", 
                value: "43", 
                sublabel: "This month", 
                icon: MessageSquare,
                color: "from-indigo-500 to-indigo-600",
                bgColor: "bg-indigo-50"
              },
              { 
                label: "Impressions", 
                value: "23.1K", 
                sublabel: "Monthly reach", 
                icon: Eye,
                color: "from-blue-500 to-blue-600",
                bgColor: "bg-blue-50"
              },
              { 
                label: "Engagement Rate", 
                value: "5.2%", 
                sublabel: "Average interaction", 
                icon: Heart,
                color: "from-pink-500 to-pink-600",
                bgColor: "bg-pink-50"
              }
            ].map((stat, index) => (
              <div key={index} className={`${stat.bgColor} rounded-xl p-6 border border-gray-100 hover:shadow-md transition-all duration-300 hover:scale-105`}>
                <div className="text-center">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} mx-auto mb-4 flex items-center justify-center shadow-lg`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-1 font-inter">{stat.value}</div>
                  <div className="text-sm text-gray-700 font-semibold mb-1 font-inter">{stat.label}</div>
                  <div className="text-xs text-gray-500 font-inter">{stat.sublabel}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Performance Analytics Section Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 font-inter">Performance Analytics</h2>
          <p className="text-gray-600 mt-1 font-inter">Detailed insights for the last 28 days</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500 font-inter">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span>Live data • Updated 5 minutes ago</span>
        </div>
      </div>

      {/* Discovery Section */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-gray-900 flex items-center font-inter">
          <div className="w-1 h-6 bg-gradient-to-b from-gray-500 to-slate-600 rounded mr-3"></div>
          Discovery & Reach
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { 
              title: "Thread Reach", 
              value: "8,234", 
              change: "+19.4%", 
              trend: "up",
              icon: Users, 
              color: "from-gray-500 to-gray-600",
              progress: 76
            },
            { 
              title: "Thread Engagement", 
              value: "567", 
              change: "+14.2%", 
              trend: "up",
              icon: Heart, 
              color: "from-slate-500 to-slate-600",
              progress: 63
            },
            { 
              title: "Profile Views", 
              value: "1,892", 
              change: "+21.7%", 
              trend: "up",
              icon: Eye, 
              color: "from-indigo-500 to-indigo-600",
              progress: 71
            },
            { 
              title: "New Followers", 
              value: "89", 
              change: "+16.3%", 
              trend: "up",
              icon: Users, 
              color: "from-blue-500 to-blue-600",
              progress: 58
            }
          ].map((metric, index) => (
            <Card key={metric.title} className="group border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 bg-white hover:scale-105">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${metric.color} flex items-center justify-center shadow-lg`}>
                    <metric.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-semibold font-inter ${
                    metric.trend === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {metric.change}
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <p className="text-2xl font-bold text-gray-900 font-inter">{metric.value}</p>
                    <p className="text-sm text-gray-600 font-medium font-inter">{metric.title}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-inter">
                      <span className="text-gray-500">Progress</span>
                      <span className="text-gray-700 font-semibold">{metric.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full bg-gradient-to-r ${metric.color} transition-all duration-1000 ease-out`}
                        style={{ width: `${metric.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Interactions Section */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-gray-900 flex items-center font-inter">
          <div className="w-1 h-6 bg-gradient-to-b from-pink-500 to-red-600 rounded mr-3"></div>
          Engagement & Interactions
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {[
            { 
              title: "Likes", 
              value: "892", 
              change: "+20.1%", 
              trend: "up",
              icon: Heart, 
              color: "from-pink-500 to-pink-600"
            },
            { 
              title: "Replies", 
              value: "234", 
              change: "+15.4%", 
              trend: "up",
              icon: MessageSquare, 
              color: "from-blue-500 to-blue-600"
            },
            { 
              title: "Reposts", 
              value: "156", 
              change: "+9.8%", 
              trend: "up",
              icon: Users, 
              color: "from-green-500 to-green-600"
            },
            { 
              title: "Quote Posts", 
              value: "67", 
              change: "+12.7%", 
              trend: "up",
              icon: MessageSquare, 
              color: "from-purple-500 to-purple-600"
            },
            { 
              title: "Profile Visits", 
              value: "445", 
              change: "+18.3%", 
              trend: "up",
              icon: MousePointer, 
              color: "from-orange-500 to-orange-600"
            }
          ].map((metric, index) => (
            <Card key={metric.title} className="group border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 bg-white hover:scale-105">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${metric.color} flex items-center justify-center shadow-md`}>
                    <metric.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-right">
                    <div className={`px-2 py-1 rounded-full text-xs font-semibold font-inter ${
                      metric.trend === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {metric.change}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <p className="text-2xl font-bold text-gray-900 font-inter">{metric.value}</p>
                  <p className="text-sm text-gray-600 font-medium font-inter">{metric.title}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

const LinkedInInsights = () => {
  const [selectedPage, setSelectedPage] = useState("lead-masters-ai");

  const pages = [
    { id: "lead-masters-ai", name: "Lead Masters AI", followers: "3,421", engagement: "6.1%" },
    { id: "secondary-page", name: "Secondary Business Page", followers: "1,876", engagement: "4.3%" },
    { id: "test-page", name: "Test Page", followers: "567", engagement: "2.8%" }
  ];

  const currentPage = pages.find(p => p.id === selectedPage) || pages[0];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 bg-gradient-to-br from-slate-50 via-white to-blue-50/20 min-h-screen font-inter">
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white border border-gray-200">
        <div className="p-8">
          <div className="flex items-start justify-between mb-8">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl overflow-hidden border-2 border-gray-100 shadow-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face" 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-3 border-white shadow-md flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
              
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2 font-inter">LinkedIn Performance</h1>
                <p className="text-lg font-medium text-gray-700 mb-3 font-inter">{currentPage.name}</p>
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-blue-600" />
                    <span className="text-gray-600 text-sm font-medium font-inter">{currentPage.followers} followers</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Heart className="w-4 h-4 text-pink-500" />
                    <span className="text-gray-600 text-sm font-medium font-inter">{currentPage.engagement} engagement</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
              <Select value={selectedPage} onValueChange={setSelectedPage}>
                <SelectTrigger className="w-64 bg-white border-gray-300 text-gray-900 font-inter">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {pages.map((page) => (
                    <SelectItem key={page.id} value={page.id} className="font-inter">
                      <div className="flex items-center justify-between w-full">
                        <span>{page.name}</span>
                        <span className="text-gray-500 text-sm ml-4">{page.followers}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-5 gap-6">
            {[
              { 
                label: "Followers", 
                value: "3,421", 
                sublabel: "Total audience", 
                icon: Users,
                color: "from-blue-500 to-blue-600",
                bgColor: "bg-blue-50"
              },
              { 
                label: "Page Likes", 
                value: "2,987", 
                sublabel: "Total page likes", 
                icon: Heart,
                color: "from-pink-500 to-pink-600",
                bgColor: "bg-pink-50"
              },
              { 
                label: "Posts", 
                value: "62", 
                sublabel: "This month", 
                icon: MessageSquare,
                color: "from-indigo-500 to-indigo-600",
                bgColor: "bg-indigo-50"
              },
              { 
                label: "Impressions", 
                value: "127.8K", 
                sublabel: "Monthly reach", 
                icon: Eye,
                color: "from-purple-500 to-purple-600",
                bgColor: "bg-purple-50"
              },
              { 
                label: "Engagement Rate", 
                value: "6.1%", 
                sublabel: "Average interaction", 
                icon: Heart,
                color: "from-pink-500 to-pink-600",
                bgColor: "bg-pink-50"
              }
            ].map((stat, index) => (
              <div key={index} className={`${stat.bgColor} rounded-xl p-6 border border-gray-100 hover:shadow-md transition-all duration-300 hover:scale-105`}>
                <div className="text-center">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} mx-auto mb-4 flex items-center justify-center shadow-lg`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-1 font-inter">{stat.value}</div>
                  <div className="text-sm text-gray-700 font-semibold mb-1 font-inter">{stat.label}</div>
                  <div className="text-xs text-gray-500 font-inter">{stat.sublabel}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Performance Analytics Section Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 font-inter">Performance Analytics</h2>
          <p className="text-gray-600 mt-1 font-inter">Detailed insights for the last 28 days</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500 font-inter">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span>Live data • Updated 5 minutes ago</span>
        </div>
      </div>

      {/* Discovery Section */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-gray-900 flex items-center font-inter">
          <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-indigo-600 rounded mr-3"></div>
          Discovery & Reach
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { 
              title: "Post Reach", 
              value: "25,432", 
              change: "+28.7%", 
              trend: "up",
              icon: Users, 
              color: "from-blue-500 to-blue-600",
              progress: 89
            },
            { 
              title: "Post Engagement", 
              value: "1,876", 
              change: "+24.1%", 
              trend: "up",
              icon: Heart, 
              color: "from-indigo-500 to-indigo-600",
              progress: 82
            },
            { 
              title: "Company Page Views", 
              value: "8,543", 
              change: "+32.4%", 
              trend: "up",
              icon: Eye, 
              color: "from-purple-500 to-purple-600",
              progress: 75
            },
            { 
              title: "New Followers", 
              value: "312", 
              change: "+19.8%", 
              trend: "up",
              icon: Users, 
              color: "from-teal-500 to-teal-600",
              progress: 67
            }
          ].map((metric, index) => (
            <Card key={metric.title} className="group border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 bg-white hover:scale-105">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${metric.color} flex items-center justify-center shadow-lg`}>
                    <metric.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-semibold font-inter ${
                    metric.trend === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {metric.change}
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <p className="text-2xl font-bold text-gray-900 font-inter">{metric.value}</p>
                    <p className="text-sm text-gray-600 font-medium font-inter">{metric.title}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-inter">
                      <span className="text-gray-500">Progress</span>
                      <span className="text-gray-700 font-semibold">{metric.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full bg-gradient-to-r ${metric.color} transition-all duration-1000 ease-out`}
                        style={{ width: `${metric.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Interactions Section */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-gray-900 flex items-center font-inter">
          <div className="w-1 h-6 bg-gradient-to-b from-pink-500 to-red-600 rounded mr-3"></div>
          Engagement & Interactions
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {[
            { 
              title: "Reactions", 
              value: "3,542", 
              change: "+26.8%", 
              trend: "up",
              icon: Heart, 
              color: "from-pink-500 to-pink-600"
            },
            { 
              title: "Comments", 
              value: "892", 
              change: "+18.9%", 
              trend: "up",
              icon: MessageSquare, 
              color: "from-blue-500 to-blue-600"
            },
            { 
              title: "Shares", 
              value: "567", 
              change: "+22.1%", 
              trend: "up",
              icon: Users, 
              color: "from-green-500 to-green-600"
            },
            { 
              title: "Article Views", 
              value: "4,231", 
              change: "+35.7%", 
              trend: "up",
              icon: Eye, 
              color: "from-orange-500 to-orange-600"
            },
            { 
              title: "Profile Clicks", 
              value: "1,234", 
              change: "+29.4%", 
              trend: "up",
              icon: MousePointer, 
              color: "from-purple-500 to-purple-600"
            }
          ].map((metric, index) => (
            <Card key={metric.title} className="group border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 bg-white hover:scale-105">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${metric.color} flex items-center justify-center shadow-md`}>
                    <metric.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-right">
                    <div className={`px-2 py-1 rounded-full text-xs font-semibold font-inter ${
                      metric.trend === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {metric.change}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <p className="text-2xl font-bold text-gray-900 font-inter">{metric.value}</p>
                  <p className="text-sm text-gray-600 font-medium font-inter">{metric.title}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

// Import existing InsightsSummary component content
const OverviewInsights = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Cross-Platform Overview</h1>
        <p className="text-gray-600">Monitor your performance across all connected social media platforms</p>
      </div>
      
      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="border border-gray-200 shadow-sm bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Post Views</p>
                <p className="text-2xl font-bold text-gray-900">24,563</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Eye className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span className="text-sm text-green-600 font-medium">+12.5%</span>
              <span className="text-sm text-gray-500 ml-2">vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 shadow-sm bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Ad Impressions</p>
                <p className="text-2xl font-bold text-gray-900">185,420</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span className="text-sm text-green-600 font-medium">+8.2%</span>
              <span className="text-sm text-gray-500 ml-2">vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 shadow-sm bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Engagement</p>
                <p className="text-2xl font-bold text-gray-900">3,247</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span className="text-sm text-red-600 font-medium">-2.1%</span>
              <span className="text-sm text-gray-500 ml-2">vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 shadow-sm bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Ad Spend</p>
                <p className="text-2xl font-bold text-gray-900">$1,245</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-orange-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span className="text-sm text-green-600 font-medium">+15.3%</span>
              <span className="text-sm text-gray-500 ml-2">vs last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Platform Performance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border border-gray-200 shadow-sm bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold flex items-center">
              <Facebook className="w-5 h-5 mr-2 text-blue-600" />
              Facebook
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Reach</span>
                <span className="text-sm font-medium">12,543</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Engagement</span>
                <span className="text-sm font-medium">892</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 shadow-sm bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold flex items-center">
              <Instagram className="w-5 h-5 mr-2 text-pink-600" />
              Instagram
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Reach</span>
                <span className="text-sm font-medium">8,432</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Engagement</span>
                <span className="text-sm font-medium">1,245</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 shadow-sm bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold flex items-center">
              <Twitter className="w-5 h-5 mr-2 text-black" />
              Threads
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Reach</span>
                <span className="text-sm font-medium">—</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Engagement</span>
                <span className="text-sm font-medium">—</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 shadow-sm bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold flex items-center">
              <Linkedin className="w-5 h-5 mr-2 text-blue-700" />
              LinkedIn
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Reach</span>
                <span className="text-sm font-medium">—</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Engagement</span>
                <span className="text-sm font-medium">—</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export function InsightsOverview() {
  const [selectedPlatform, setSelectedPlatform] = useState("overview");
  const { isPremium, setIsPremium } = usePremium();
  const [upgradeModal, setUpgradeModal] = useState({ isOpen: false, feature: "" });

  const handleUpgradeClick = (feature: string) => {
    setUpgradeModal({ isOpen: true, feature });
  };

  const handleUpgrade = () => {
    setIsPremium(true);
    setUpgradeModal({ isOpen: false, feature: "" });
  };

  const handlePlatformChange = (platformId: string) => {
    setSelectedPlatform(platformId);
  };

  const renderPlatformInsights = () => {
    switch (selectedPlatform) {
      case 'overview':
        return <OverviewInsights />;
      case 'facebook':
        return <FacebookInsights />;
      case 'instagram':
        if (!isPremium) {
          return (
            <div className="p-8">
              <PremiumLockCard
                title="Instagram Insights - Premium Feature"
                description="Access detailed Instagram analytics, engagement metrics, and performance insights with our Premium plan."
                onUpgrade={() => handleUpgradeClick("Instagram Insights")}
                className="max-w-2xl mx-auto"
              />
            </div>
          );
        }
        return <InstagramInsights />;
      case 'threads':
        return <ThreadsInsights />;
      case 'linkedin':
        if (!isPremium) {
          return (
            <div className="p-8">
              <PremiumLockCard
                title="LinkedIn Insights - Premium Feature"
                description="Get comprehensive LinkedIn analytics, professional network insights, and business performance metrics with Premium."
                onUpgrade={() => handleUpgradeClick("LinkedIn Insights")}
                className="max-w-2xl mx-auto"
              />
            </div>
          );
        }
        return <LinkedInInsights />;
      default:
        return <OverviewInsights />;
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50/30">
      <InsightsPlatformMenu 
        activePlatform={selectedPlatform} 
        onPlatformChange={handlePlatformChange}
        onUpgradeClick={handleUpgradeClick}
      />
      <div className="flex-1">
        {renderPlatformInsights()}
      </div>
      
      <PremiumUpgradeModal
        isOpen={upgradeModal.isOpen}
        onClose={() => setUpgradeModal({ isOpen: false, feature: "" })}
        feature={upgradeModal.feature}
        onUpgrade={handleUpgrade}
      />
    </div>
  );
}