import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Eye, Heart, DollarSign, BarChart3 } from "lucide-react";
import { CampaignCard } from "@/components/CampaignCard";
import { MetricCard } from "@/components/MetricCard";
import { AdPlatformMenu } from "@/components/AdPlatformMenu";
import { FacebookAdBuilder } from "@/components/FacebookAdBuilder";
import { GoogleAdBuilder } from "@/components/GoogleAdBuilder";
import { LinkedInAdBuilder } from "@/components/LinkedInAdBuilder";
import { WhatsAppAdBuilder } from "@/components/WhatsAppAdBuilder";
import { useState } from "react";

export function InstagramAdBuilder() {
  const [activePlatform, setActivePlatform] = useState("instagram");

  const handlePlatformChange = (platformId: string) => {
    setActivePlatform(platformId);
  };

  // If Facebook is selected, render the Facebook Ad Builder instead
  if (activePlatform === "facebook") {
    return (
      <div className="flex flex-col h-full">
        <AdPlatformMenu activePlatform={activePlatform} onPlatformChange={handlePlatformChange} />
        <FacebookAdBuilder />
      </div>
    );
  }

  // If Google is selected, render the Google Ad Builder instead
  if (activePlatform === "google") {
    return (
      <div className="flex flex-col h-full">
        <AdPlatformMenu activePlatform={activePlatform} onPlatformChange={handlePlatformChange} />
        <GoogleAdBuilder />
      </div>
    );
  }

  // If LinkedIn is selected, render the LinkedIn Ad Builder instead
  if (activePlatform === "linkedin") {
    return (
      <div className="flex flex-col h-full">
        <AdPlatformMenu activePlatform={activePlatform} onPlatformChange={handlePlatformChange} />
        <LinkedInAdBuilder />
      </div>
    );
  }

  // If WhatsApp is selected, render the WhatsApp Ad Builder instead
  if (activePlatform === "whatsapp") {
    return (
      <div className="flex flex-col h-full">
        <AdPlatformMenu activePlatform={activePlatform} onPlatformChange={handlePlatformChange} />
        <WhatsAppAdBuilder />
      </div>
    );
  }

  const recentCampaigns = [
    { id: 1, name: "Story Ads Campaign", status: "Live", performance: "Excellent" },
    { id: 2, name: "Reel Promotion 2024", status: "Draft", performance: "N/A" },
    { id: 3, name: "Feed Post Boost", status: "Live", performance: "Good" },
  ];

  const metrics = [
    { title: "Impressions", value: "45.2K", icon: Eye, trend: "+15%" },
    { title: "Engagement Rate", value: "3.8%", icon: Heart, trend: "+0.5%" },
    { title: "Total Spend", value: "$892", icon: DollarSign, trend: "+8%" },
    { title: "Conversions", value: "124", icon: BarChart3, trend: "+12%" },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Ad Platform Sub-Menu */}
      <AdPlatformMenu activePlatform={activePlatform} onPlatformChange={handlePlatformChange} />
      
      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-50">
        <div className="max-w-7xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#7C3AED] to-[#D946EF] bg-clip-text text-transparent mb-2">Instagram Ad Builder</h1>
            <p className="text-gray-600">Create and manage your Instagram advertising campaigns with AI-powered tools and performance insights</p>
          </div>

          {/* Create New Campaign */}
          <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 bg-white">
            <CardContent className="p-8 text-center">
              <div className="max-w-md mx-auto">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Plus className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Create New Campaign</h3>
                <p className="text-gray-600 mb-6">Start building your next Instagram ad campaign with our AI-powered tools and performance insights</p>
                <Button 
                  size="default" 
                  className="bg-gradient-to-r from-[#7C3AED] to-[#D946EF] hover:from-purple-700 hover:to-pink-600 text-white transition-all duration-200 shadow-lg hover:shadow-xl px-6 py-2.5"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Campaign
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid lg:grid-cols-3 gap-10">
            {/* Recent Campaigns */}
            <div className="lg:col-span-2">
              <Card className="border border-gray-200 shadow-sm bg-white">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl font-semibold text-gray-900">Recent Campaigns</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {recentCampaigns.map((campaign) => (
                    <CampaignCard key={campaign.id} campaign={campaign} />
                  ))}
                  <div className="pt-4 border-t border-gray-100">
                    <Button variant="ghost" className="w-full text-purple-600 hover:text-purple-700 hover:bg-purple-50 transition-colors duration-200">
                      View All Campaigns
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Analytics Overview */}
            <div>
              <Card className="border border-gray-200 shadow-sm bg-white">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl font-semibold text-gray-900">Analytics Overview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {metrics.map((metric, index) => (
                    <MetricCard key={index} metric={metric} />
                  ))}
                  <div className="pt-4 border-t border-gray-100">
                    <Button variant="ghost" className="w-full text-purple-600 hover:text-purple-700 hover:bg-purple-50 transition-colors duration-200">
                      View Detailed Analytics
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
