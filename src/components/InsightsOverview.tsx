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
  const metrics = [
    { 
      label: "Total Reach", 
      value: "128,543", 
      change: "+15.2%",
      changeValue: "+16.5K",
      period: "vs last 7 days",
      trend: [45, 52, 48, 65, 59, 80, 81],
      progress: 78,
      icon: Eye,
      color: "text-blue-600"
    },
    { 
      label: "Engagement Rate", 
      value: "8.42", 
      suffix: "%",
      change: "+2.3%",
      changeValue: "+0.19%",
      period: "vs last 7 days",
      trend: [3.2, 4.1, 3.8, 5.2, 6.1, 7.8, 8.42],
      progress: 65,
      icon: Heart,
      color: "text-rose-600"
    },
    { 
      label: "Total Followers", 
      value: "45,289", 
      change: "+12.1%",
      changeValue: "+4,892",
      period: "vs last 30 days",
      trend: [38, 39, 40, 41, 42, 44, 45],
      progress: 92,
      icon: Users,
      color: "text-purple-600"
    },
    { 
      label: "Post Impressions", 
      value: "234,567", 
      change: "+23.4%",
      changeValue: "+44.5K",
      period: "vs last 7 days",
      trend: [180, 190, 195, 210, 215, 225, 235],
      progress: 87,
      icon: BarChart3,
      color: "text-emerald-600"
    }
  ];

  const detailedMetrics = [
    { label: "Post Reach", value: "12,543", change: "+15.2%", trend: "up", sparkline: [8, 12, 10, 15, 13, 18, 19] },
    { label: "Post Engagement", value: "892", change: "+8.4%", trend: "up", sparkline: [5, 7, 6, 9, 8, 12, 14] },
    { label: "Page Likes", value: "156", change: "+23.1%", trend: "up", sparkline: [3, 4, 5, 6, 8, 10, 12] },
    { label: "Page Followers", value: "89", change: "+12.8%", trend: "up", sparkline: [4, 5, 6, 7, 8, 10, 11] },
    { label: "Comments", value: "387", change: "+12.3%", trend: "up", sparkline: [6, 7, 8, 9, 10, 11, 13] },
    { label: "Shares", value: "156", change: "+7.8%", trend: "up", sparkline: [5, 6, 7, 8, 9, 10, 11] },
    { label: "Photo Views", value: "3,421", change: "+25.4%", trend: "up", sparkline: [10, 12, 15, 18, 20, 25, 28] },
    { label: "Link Clicks", value: "234", change: "+45.2%", trend: "up", sparkline: [3, 4, 6, 8, 10, 15, 18] }
  ];

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-[1600px] mx-auto space-y-6">
        {/* Header */}
        <div className="border-b border-gray-200 pb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-1">Facebook Analytics</h1>
              <p className="text-sm text-gray-600">Real-time performance metrics</p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-emerald-700">Live</span>
            </div>
          </div>
        </div>

        {/* Main Metrics Grid with Radial Progress */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            const maxValue = Math.max(...metric.trend);
            const normalizedTrend = metric.trend.map(v => (v / maxValue) * 100);
            
            return (
              <Card key={index} className="border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 hover:border-gray-300 group">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center group-hover:bg-gray-100 transition-colors`}>
                        <Icon className={`w-5 h-5 ${metric.color}`} />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">{metric.label}</p>
                        <div className="flex items-baseline gap-1 mt-1">
                          <span className="text-3xl font-bold text-gray-900 font-mono">{metric.value}</span>
                          {metric.suffix && <span className="text-lg font-semibold text-gray-600 font-mono">{metric.suffix}</span>}
                        </div>
                      </div>
                    </div>
                    
                    {/* Radial Progress */}
                    <div className="relative w-16 h-16">
                      <svg className="w-16 h-16 transform -rotate-90">
                        <circle
                          cx="32"
                          cy="32"
                          r="28"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                          className="text-gray-100"
                        />
                        <circle
                          cx="32"
                          cy="32"
                          r="28"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                          strokeDasharray={`${2 * Math.PI * 28}`}
                          strokeDashoffset={`${2 * Math.PI * 28 * (1 - metric.progress / 100)}`}
                          className={metric.color}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xs font-bold text-gray-700 font-mono">{metric.progress}%</span>
                      </div>
                    </div>
                  </div>

                  {/* Inline Sparkline */}
                  <div className="mb-3 h-12 flex items-end gap-1">
                    {normalizedTrend.map((value, i) => (
                      <div
                        key={i}
                        className={`flex-1 rounded-t transition-all duration-300 ${metric.color.replace('text-', 'bg-')} opacity-60 hover:opacity-100`}
                        style={{ height: `${value}%` }}
                      />
                    ))}
                  </div>

                  {/* Change Indicator */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-50 text-emerald-700">
                        <TrendingUp className="w-3 h-3" />
                        <span className="text-xs font-semibold font-mono">{metric.change}</span>
                      </div>
                      <span className="text-xs text-gray-500 font-mono">{metric.changeValue}</span>
                    </div>
                    <span className="text-xs text-gray-400">{metric.period}</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Detailed Metrics Table */}
        <Card className="border border-gray-200 shadow-sm">
          <CardHeader className="border-b border-gray-100 bg-gray-50">
            <CardTitle className="text-lg font-semibold text-gray-900">Detailed Metrics</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-gray-100">
              {detailedMetrics.map((metric, index) => {
                const maxValue = Math.max(...metric.sparkline);
                const normalizedSparkline = metric.sparkline.map(v => (v / maxValue) * 100);
                
                return (
                  <div key={index} className="grid grid-cols-12 gap-4 items-center p-4 hover:bg-gray-50 transition-colors group">
                    {/* Label */}
                    <div className="col-span-3">
                      <p className="text-sm font-medium text-gray-900">{metric.label}</p>
                    </div>
                    
                    {/* Value */}
                    <div className="col-span-2">
                      <p className="text-xl font-bold text-gray-900 font-mono">{metric.value}</p>
                    </div>
                    
                    {/* Sparkline */}
                    <div className="col-span-4">
                      <div className="h-8 flex items-end gap-0.5">
                        {normalizedSparkline.map((value, i) => (
                          <div
                            key={i}
                            className="flex-1 rounded-t bg-gray-300 group-hover:bg-blue-500 transition-all duration-200"
                            style={{ height: `${value}%` }}
                          />
                        ))}
                      </div>
                    </div>
                    
                    {/* Change */}
                    <div className="col-span-2">
                      <div className="flex items-center gap-1 px-2 py-1 rounded bg-emerald-50 text-emerald-700 w-fit">
                        <TrendingUp className="w-3 h-3" />
                        <span className="text-sm font-semibold font-mono">{metric.change}</span>
                      </div>
                    </div>
                    
                    {/* Period */}
                    <div className="col-span-1 text-right">
                      <span className="text-xs text-gray-400">7d</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Engagement Breakdown with Heat Map */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border border-gray-200 shadow-sm">
            <CardHeader className="border-b border-gray-100">
              <CardTitle className="text-lg font-semibold text-gray-900">Engagement Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {[
                  { type: "Reactions", count: "4,234", percentage: 68, color: "bg-rose-500" },
                  { type: "Comments", count: "1,892", percentage: 30, color: "bg-blue-500" },
                  { type: "Shares", count: "892", percentage: 14, color: "bg-purple-500" }
                ].map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">{item.type}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-bold text-gray-900 font-mono">{item.count}</span>
                        <span className="text-sm text-gray-500 font-mono w-12 text-right">{item.percentage}%</span>
                      </div>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${item.color} transition-all duration-500`}
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 shadow-sm">
            <CardHeader className="border-b border-gray-100">
              <CardTitle className="text-lg font-semibold text-gray-900">Top Posts Performance</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {[
                  { title: "Summer Launch", engagement: "2.4K", score: 95 },
                  { title: "Behind the Scenes", engagement: "1.8K", score: 82 },
                  { title: "Customer Story", engagement: "1.2K", score: 68 }
                ].map((post, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-all group">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center">
                        <span className="text-sm font-bold text-gray-700 font-mono">#{index + 1}</span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{post.title}</p>
                        <p className="text-xs text-gray-500 font-mono">{post.engagement} engagements</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                          style={{ width: `${post.score}%` }}
                        />
                      </div>
                      <span className="text-sm font-bold text-gray-900 font-mono w-8">{post.score}</span>
                    </div>
                  </div>
                ))}
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