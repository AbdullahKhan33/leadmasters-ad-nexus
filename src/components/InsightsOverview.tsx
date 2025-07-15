import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Facebook, Instagram, Twitter, Linkedin, ChevronDown, Users, MessageSquare, Heart, Eye, MousePointer, BarChart3 } from "lucide-react";

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

function InsightsPlatformMenu({ activePlatform = "overview", onPlatformChange }: InsightsPlatformMenuProps) {
  const [selectedPlatform, setSelectedPlatform] = useState(activePlatform);

  const handlePlatformClick = (platformId: string) => {
    setSelectedPlatform(platformId);
    onPlatformChange?.(platformId);
  };

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-5">
      <div className="flex items-center space-x-2">
        {platforms.map((platform) => {
          const isActive = selectedPlatform === platform.id;
          const isImplemented = platform.id === "overview" || platform.id === "facebook";
          
          return (
            <Button
              key={platform.name}
              variant="ghost"
              onClick={() => isImplemented && handlePlatformClick(platform.id)}
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
    { id: "lead-masters-ai", name: "Lead Masters AI" },
    { id: "secondary-page", name: "Secondary Business Page" },
    { id: "test-page", name: "Test Page" }
  ];

  const discoveryMetrics = [
    { title: "Post Reach", value: "—", icon: Users, color: "from-purple-500 to-purple-600" },
    { title: "Post Engagement", value: "0", icon: Heart, color: "from-pink-500 to-pink-600" },
    { title: "New Page Likes", value: "0", icon: Heart, color: "from-blue-500 to-blue-600" },
    { title: "New Page Followers", value: "0", icon: Users, color: "from-indigo-500 to-indigo-600" }
  ];

  const interactionMetrics = [
    { title: "Reactions", value: "0", icon: Heart, color: "from-purple-500 to-purple-600" },
    { title: "Comments", value: "0", icon: MessageSquare, color: "from-blue-500 to-blue-600" },
    { title: "Shares", value: "0", icon: Users, color: "from-green-500 to-green-600" },
    { title: "Photo Views", value: "0", icon: Eye, color: "from-orange-500 to-orange-600" },
    { title: "Link Clicks", value: "1", icon: MousePointer, color: "from-red-500 to-red-600" }
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 bg-gray-50 min-h-screen">
      {/* Facebook Performance Overview Header */}
      <Card className="border-none shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 p-6 text-white">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-black/20 rounded-full flex items-center justify-center overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face" 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-4 flex items-center space-x-2">
                <span>Facebook Performance Overview</span>
                <span className="text-xl">✨</span>
              </h2>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <div className="grid grid-cols-5 gap-6 text-center">
                  <div>
                    <div className="text-sm opacity-90 mb-1">Followers</div>
                    <div className="text-2xl font-bold">1175</div>
                  </div>
                  <div>
                    <div className="text-sm opacity-90 mb-1">Following</div>
                    <div className="text-2xl font-bold">1</div>
                  </div>
                  <div>
                    <div className="text-sm opacity-90 mb-1">Total posts</div>
                    <div className="text-2xl font-bold">—</div>
                  </div>
                  <div>
                    <div className="text-sm opacity-90 mb-1">Posts Impressions</div>
                    <div className="text-2xl font-bold">—</div>
                  </div>
                  <div>
                    <div className="text-sm opacity-90 mb-1">Replies avg</div>
                    <div className="text-2xl font-bold">1175</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Page Selection Dropdown */}
      <div className="flex items-center space-x-3">
        <span className="text-sm font-medium text-gray-600">Selected:</span>
        <Select value={selectedPage} onValueChange={setSelectedPage}>
          <SelectTrigger className="w-64 bg-white border-gray-200 shadow-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {pages.map((page) => (
              <SelectItem key={page.id} value={page.id}>
                {page.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Page Overview Section */}
      <div className="space-y-6">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Page Overview</h3>
          <p className="text-gray-600">Last 28 days</p>
        </div>

        {/* Discovery Section */}
        <div>
          <h4 className="text-xl font-bold text-gray-900 mb-4">Discovery</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {discoveryMetrics.map((metric) => (
              <Card key={metric.title} className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow bg-white">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${metric.color} flex items-center justify-center`}>
                      <metric.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">{metric.title}</p>
                      <p className="text-2xl font-bold text-purple-600">{metric.value}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Interactions Section */}
        <div>
          <h4 className="text-xl font-bold text-gray-900 mb-4">Interactions</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {interactionMetrics.map((metric) => (
              <Card key={metric.title} className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow bg-white">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${metric.color} flex items-center justify-center`}>
                      <metric.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">{metric.title}</p>
                      <p className="text-2xl font-bold text-purple-600">{metric.value}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const ComingSoonPlatform = ({ platform }: { platform: string }) => (
  <div className="p-6 max-w-7xl mx-auto bg-gray-50 min-h-screen">
    <div className="flex flex-col items-center justify-center h-64 space-y-4">
      <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
        <span className="text-2xl">🚧</span>
      </div>
      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{platform} Insights</h3>
        <p className="text-gray-600">Coming soon! We're working hard to bring you detailed insights for {platform}.</p>
      </div>
    </div>
  </div>
);

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
        return <ComingSoonPlatform platform="Instagram" />;
      case 'threads':
        return <ComingSoonPlatform platform="Threads" />;
      case 'linkedin':
        return <ComingSoonPlatform platform="LinkedIn" />;
      default:
        return <OverviewInsights />;
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50/30">
      <InsightsPlatformMenu 
        activePlatform={selectedPlatform} 
        onPlatformChange={handlePlatformChange} 
      />
      <div className="flex-1">
        {renderPlatformInsights()}
      </div>
    </div>
  );
}