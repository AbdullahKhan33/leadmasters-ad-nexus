import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Facebook, Instagram, Twitter, Linkedin, ChevronDown, Users, MessageSquare, Heart, Eye, MousePointer } from "lucide-react";

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
    <div className="space-y-6">
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
          <SelectTrigger className="w-64 bg-gray-100 border-gray-200">
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
              <Card key={metric.title} className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
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
              <Card key={metric.title} className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
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
  <div className="flex flex-col items-center justify-center h-64 space-y-4">
    <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
      <span className="text-2xl">🚧</span>
    </div>
    <div className="text-center">
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{platform} Insights</h3>
      <p className="text-gray-600">Coming soon! We're working hard to bring you detailed insights for {platform}.</p>
    </div>
  </div>
);

export function InsightsOverview() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Insights Overview</h1>
        <p className="text-gray-600">Monitor your social media performance across all platforms</p>
      </div>

      <Tabs defaultValue="facebook" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-gray-100 p-1 rounded-lg">
          <TabsTrigger 
            value="facebook" 
            className="flex items-center space-x-2 data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            <Facebook className="w-4 h-4" />
            <span>Facebook</span>
          </TabsTrigger>
          <TabsTrigger 
            value="instagram" 
            className="flex items-center space-x-2 data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            <Instagram className="w-4 h-4" />
            <span>Instagram</span>
          </TabsTrigger>
          <TabsTrigger 
            value="threads" 
            className="flex items-center space-x-2 data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            <Twitter className="w-4 h-4" />
            <span>Threads</span>
          </TabsTrigger>
          <TabsTrigger 
            value="linkedin" 
            className="flex items-center space-x-2 data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            <Linkedin className="w-4 h-4" />
            <span>LinkedIn</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="facebook" className="space-y-6">
          <FacebookInsights />
        </TabsContent>

        <TabsContent value="instagram" className="space-y-6">
          <ComingSoonPlatform platform="Instagram" />
        </TabsContent>

        <TabsContent value="threads" className="space-y-6">
          <ComingSoonPlatform platform="Threads" />
        </TabsContent>

        <TabsContent value="linkedin" className="space-y-6">
          <ComingSoonPlatform platform="LinkedIn" />
        </TabsContent>
      </Tabs>
    </div>
  );
}