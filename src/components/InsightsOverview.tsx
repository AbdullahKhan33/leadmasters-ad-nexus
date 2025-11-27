import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PremiumLockCard } from "@/components/premium/PremiumLockCard";
import { usePremium } from "@/contexts/PremiumContext";
import { PremiumUpgradeModal } from "@/components/premium/PremiumUpgradeModal";
import { Facebook, Instagram, Twitter, Linkedin, ChevronDown, Users, MessageSquare, Heart, Eye, MousePointer, BarChart3, UserCheck, Lock } from "lucide-react";

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
  const [selectedPage, setSelectedPage] = useState("lead-masters-ai");

  const pages = [
    { id: "lead-masters-ai", name: "Lead Masters AI", followers: "1,175", engagement: "3.2%" },
    { id: "secondary-page", name: "Secondary Business Page", followers: "892", engagement: "2.8%" },
    { id: "test-page", name: "Test Page", followers: "245", engagement: "1.9%" }
  ];

  const currentPage = pages.find(p => p.id === selectedPage) || pages[0];

  const discoveryMetrics = [
    { 
      title: "Post Reach", 
      value: "12,543", 
      change: "+15.2%", 
      trend: "up",
      icon: Users, 
      color: "from-violet-100 to-purple-100",
      iconColor: "from-violet-400 to-purple-400",
      progress: 78
    },
    { 
      title: "Post Engagement", 
      value: "892", 
      change: "+8.4%", 
      trend: "up",
      icon: Heart, 
      color: "from-purple-100 to-indigo-100",
      iconColor: "from-purple-400 to-indigo-400",
      progress: 65
    },
    { 
      title: "New Page Likes", 
      value: "156", 
      change: "+23.1%", 
      trend: "up",
      icon: Heart, 
      color: "from-indigo-100 to-violet-100",
      iconColor: "from-indigo-400 to-violet-400",
      progress: 45
    },
    { 
      title: "New Page Followers", 
      value: "89", 
      change: "+12.8%", 
      trend: "up",
      icon: Users, 
      color: "from-violet-100 to-purple-100",
      iconColor: "from-violet-400 to-purple-400",
      progress: 56
    }
  ];

  const interactionMetrics = [
    { 
      title: "Reactions", 
      value: "1,234", 
      change: "+18.5%", 
      trend: "up",
      icon: Heart, 
      color: "from-violet-100 to-purple-100",
      iconColor: "from-violet-400 to-purple-400",
      breakdown: [
        { type: "Love", count: 567, percentage: 46 },
        { type: "Like", count: 445, percentage: 36 },
        { type: "Wow", count: 222, percentage: 18 }
      ]
    },
    { 
      title: "Comments", 
      value: "387", 
      change: "+12.3%", 
      trend: "up",
      icon: MessageSquare, 
      color: "from-purple-100 to-indigo-100",
      iconColor: "from-purple-400 to-indigo-400"
    },
    { 
      title: "Shares", 
      value: "156", 
      change: "+7.8%", 
      trend: "up",
      icon: Users, 
      color: "from-indigo-100 to-violet-100",
      iconColor: "from-indigo-400 to-violet-400"
    },
    { 
      title: "Photo Views", 
      value: "3,421", 
      change: "+25.4%", 
      trend: "up",
      icon: Eye, 
      color: "from-violet-100 to-purple-100",
      iconColor: "from-violet-400 to-purple-400"
    },
    { 
      title: "Link Clicks", 
      value: "234", 
      change: "+45.2%", 
      trend: "up",
      icon: MousePointer, 
      color: "from-purple-100 to-indigo-100",
      iconColor: "from-purple-400 to-indigo-400"
    }
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 bg-gradient-to-br from-violet-50/50 via-purple-50/30 to-indigo-50/40 min-h-screen font-inter">
      {/* Clean, Modern Header Section */}
      <Card className="shadow-sm border-violet-100/50 transition-all duration-500 bg-white/80 backdrop-blur-sm hover:shadow-md hover:border-violet-200/60 animate-fade-in">
        <div className="p-8">
          <div className="flex items-start justify-between mb-8">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-violet-100 to-purple-100 rounded-2xl overflow-hidden border border-violet-200/50 shadow-sm transition-transform duration-300 hover:scale-105">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face" 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full border-2 border-white shadow-sm flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse-slow"></div>
                </div>
              </div>
              
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2 font-inter tracking-tight">Facebook Performance</h1>
                <p className="text-base font-medium text-gray-600 mb-3 font-inter">{currentPage.name}</p>
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2 transition-all duration-200 hover:translate-x-1">
                    <Users className="w-4 h-4 text-violet-500" />
                    <span className="text-gray-600 text-sm font-medium font-inter">{currentPage.followers} followers</span>
                  </div>
                  <div className="flex items-center space-x-2 transition-all duration-200 hover:translate-x-1">
                    <Heart className="w-4 h-4 text-purple-500" />
                    <span className="text-gray-600 text-sm font-medium font-inter">{currentPage.engagement} engagement</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Page Selector */}
            <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-xl p-4 border border-violet-100/50 transition-all duration-300 hover:shadow-sm">
              <Select value={selectedPage} onValueChange={setSelectedPage}>
                <SelectTrigger className="w-64 bg-white/80 backdrop-blur-sm border-violet-200/50 text-gray-900 font-inter transition-all duration-200 hover:border-violet-300">
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

          {/* Key Stats Grid with Proper Icons */}
          <div className="grid grid-cols-5 gap-6">
            {[
              { 
                label: "Followers", 
                value: "1,175", 
                sublabel: "Total audience", 
                icon: Users,
                color: "from-violet-100 to-purple-100",
                iconColor: "from-violet-400 to-purple-500"
              },
              { 
                label: "Page Likes", 
                value: "1,089", 
                sublabel: "Total page likes", 
                icon: Heart,
                color: "from-purple-100 to-indigo-100",
                iconColor: "from-purple-400 to-indigo-500"
              },
              { 
                label: "Posts", 
                value: "87", 
                sublabel: "This month", 
                icon: MessageSquare,
                color: "from-indigo-100 to-violet-100",
                iconColor: "from-indigo-400 to-violet-500"
              },
              { 
                label: "Impressions", 
                value: "45.2K", 
                sublabel: "Monthly reach", 
                icon: Eye,
                color: "from-violet-100 to-purple-100",
                iconColor: "from-violet-400 to-purple-500"
              },
              { 
                label: "Engagement Rate", 
                value: "3.2%", 
                sublabel: "Average interaction", 
                icon: Heart,
                color: "from-purple-100 to-indigo-100",
                iconColor: "from-purple-400 to-indigo-500"
              }
            ].map((stat, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-violet-100/50 hover:shadow-lg hover:border-violet-200 transition-all duration-500 hover:scale-[1.03] hover:-translate-y-1 group animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="text-center">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} mx-auto mb-4 flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-300 group-hover:scale-110`}>
                    <stat.icon className={`w-6 h-6 bg-gradient-to-br ${stat.iconColor} bg-clip-text text-transparent`} style={{ WebkitTextFillColor: 'transparent', WebkitBackgroundClip: 'text' }} />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-1 font-inter tracking-tight">{stat.value}</div>
                  <div className="text-sm text-gray-700 font-semibold mb-1 font-inter">{stat.label}</div>
                  <div className="text-xs text-gray-500 font-inter">{stat.sublabel}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Performance Analytics Section Header */}
      <div className="flex items-center justify-between animate-fade-in" style={{ animationDelay: '300ms' }}>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 font-inter tracking-tight">Performance Analytics</h2>
          <p className="text-gray-600 mt-1 font-inter text-sm">Detailed insights for the last 28 days</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500 font-inter bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-violet-100/50">
          <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse-slow"></div>
          <span>Live data • Updated 5 minutes ago</span>
        </div>
      </div>

      {/* Discovery Section */}
      <div className="space-y-6 animate-fade-in" style={{ animationDelay: '400ms' }}>
        <h3 className="text-xl font-semibold text-gray-900 flex items-center font-inter tracking-tight">
          <div className="w-1 h-6 bg-gradient-to-b from-violet-400 to-purple-500 rounded mr-3 shadow-sm"></div>
          Discovery & Reach
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {discoveryMetrics.map((metric, index) => (
            <Card key={metric.title} className="group border-violet-100/50 shadow-sm hover:shadow-lg transition-all duration-500 bg-white/80 backdrop-blur-sm hover:scale-[1.03] hover:-translate-y-1 hover:border-violet-200" style={{ animationDelay: `${(index + 1) * 100}ms` }}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${metric.color} flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-300 group-hover:scale-110`}>
                    <metric.icon className={`w-6 h-6 bg-gradient-to-br ${metric.iconColor} bg-clip-text text-transparent transition-transform duration-300 group-hover:scale-110`} style={{ WebkitTextFillColor: 'transparent', WebkitBackgroundClip: 'text' }} />
                  </div>
                  <div className={`px-3 py-1.5 rounded-full text-xs font-semibold font-inter transition-all duration-300 ${
                    metric.trend === 'up' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-rose-50 text-rose-600 border border-rose-100'
                  }`}>
                    {metric.change}
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <p className="text-2xl font-bold text-gray-900 font-inter tracking-tight">{metric.value}</p>
                    <p className="text-sm text-gray-600 font-medium font-inter mt-1">{metric.title}</p>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="space-y-2 pt-1">
                    <div className="flex justify-between text-xs font-inter">
                      <span className="text-gray-500">Progress</span>
                      <span className="text-gray-700 font-semibold">{metric.progress}%</span>
                    </div>
                    <div className="w-full bg-violet-50 rounded-full h-2 overflow-hidden">
                      <div 
                        className={`h-2 rounded-full bg-gradient-to-r ${metric.iconColor} transition-all duration-1000 ease-out shadow-sm`}
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
      <div className="space-y-6 animate-fade-in" style={{ animationDelay: '500ms' }}>
        <h3 className="text-xl font-semibold text-gray-900 flex items-center font-inter tracking-tight">
          <div className="w-1 h-6 bg-gradient-to-b from-purple-400 to-indigo-500 rounded mr-3 shadow-sm"></div>
          Engagement & Interactions
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {interactionMetrics.map((metric, index) => (
            <Card key={metric.title} className="group border-violet-100/50 shadow-sm hover:shadow-lg transition-all duration-500 bg-white/80 backdrop-blur-sm hover:scale-[1.03] hover:-translate-y-1 hover:border-violet-200" style={{ animationDelay: `${(index + 1) * 100}ms` }}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${metric.color} flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-300 group-hover:scale-110`}>
                    <metric.icon className={`w-5 h-5 bg-gradient-to-br ${metric.iconColor} bg-clip-text text-transparent transition-transform duration-300 group-hover:scale-110`} style={{ WebkitTextFillColor: 'transparent', WebkitBackgroundClip: 'text' }} />
                  </div>
                  <div className="text-right">
                    <div className={`px-2.5 py-1 rounded-full text-xs font-semibold font-inter transition-all duration-300 ${
                      metric.trend === 'up' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-rose-50 text-rose-600 border border-rose-100'
                    }`}>
                      {metric.change}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <p className="text-2xl font-bold text-gray-900 font-inter tracking-tight">{metric.value}</p>
                  <p className="text-sm text-gray-600 font-medium font-inter">{metric.title}</p>
                  
                  {/* Special breakdown for Reactions */}
                  {metric.breakdown && (
                    <div className="mt-3 pt-3 space-y-1.5 border-t border-violet-100/50">
                      {metric.breakdown.map((item, idx) => (
                        <div key={idx} className="flex justify-between text-xs font-inter group/item">
                          <span className="text-gray-500 group-hover/item:text-gray-700 transition-colors duration-200">{item.type}</span>
                          <span className="text-gray-700 font-semibold group-hover/item:text-gray-900 transition-colors duration-200">{item.count}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
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