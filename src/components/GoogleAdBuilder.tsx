
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Edit, Copy, BarChart3, DollarSign, MousePointer, Eye, ArrowLeft, Trash2 } from "lucide-react";
import { CampaignCard } from "@/components/CampaignCard";
import { MetricCard } from "@/components/MetricCard";
import { GoogleAdCampaignFlow } from "./GoogleAdCampaignFlow";
import { useGoogleCampaigns } from "@/hooks/useGoogleCampaigns";
import { toast } from "sonner";

export function GoogleAdBuilder() {
  const [showCampaignFlow, setShowCampaignFlow] = useState(false);
  const [selectedDraftId, setSelectedDraftId] = useState<string | null>(null);
  const { campaigns, isLoading, deleteCampaign, refetch } = useGoogleCampaigns();

  const draftCampaigns = campaigns.filter(c => c.status === 'draft');

  useEffect(() => {
    if (!showCampaignFlow) {
      refetch();
    }
  }, [showCampaignFlow, refetch]);

  const handleEditDraft = (campaignId: string) => {
    setSelectedDraftId(campaignId);
    setShowCampaignFlow(true);
  };

  const handleDeleteDraft = async (campaignId: string) => {
    if (confirm('Are you sure you want to delete this draft?')) {
      await deleteCampaign(campaignId);
      toast.success('Draft deleted successfully');
      refetch();
    }
  };

  const handleBackToDashboard = () => {
    setSelectedDraftId(null);
    setShowCampaignFlow(false);
  };

  const recentCampaigns = [
    { id: 1, name: "Search Ads Campaign", status: "Live", performance: "Excellent" },
    { id: 2, name: "Display Network 2024", status: "Draft", performance: "N/A" },
    { id: 3, name: "Shopping Ads Pro", status: "Live", performance: "Good" },
  ];

  const metrics = [
    { title: "Click-Through Rate", value: "3.2%", icon: MousePointer, trend: "+0.8%" },
    { title: "Impressions", value: "128.5K", icon: Eye, trend: "+22%" },
    { title: "Total Spend", value: "$2,149", icon: DollarSign, trend: "+18%" },
    { title: "Conversions", value: "203", icon: BarChart3, trend: "+15%" },
  ];

  if (showCampaignFlow) {
    return (
      <div className="flex flex-col">
        {/* Back Button */}
        <div className="p-4 border-b border-gray-200 bg-white">
          <Button
            variant="ghost"
            onClick={handleBackToDashboard}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </Button>
        </div>
        <GoogleAdCampaignFlow key={selectedDraftId || 'new'} draftId={selectedDraftId} />
      </div>
    );
  }

  return (
    <div className="flex-1 p-6 bg-gray-50">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#7C3AED] to-[#D946EF] bg-clip-text text-transparent mb-2">Google Campaign Hub</h1>
          <p className="text-gray-600">Create and manage your Google Ads campaigns with AI-powered tools for search and display optimization</p>
        </div>

        {/* Create New Campaign */}
        <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 bg-white">
          <CardContent className="p-8 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Create New Campaign</h3>
              <p className="text-gray-600 mb-6">Start building your next Google Ads campaign with our AI-powered tools for search and display optimization</p>
              <Button 
                size="default" 
                className="bg-gradient-to-r from-[#7C3AED] to-[#D946EF] hover:from-purple-700 hover:to-pink-600 text-white transition-all duration-200 shadow-lg hover:shadow-xl px-6 py-2.5"
                onClick={() => {
                  setSelectedDraftId(null);
                  setShowCampaignFlow(true);
                }}
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Campaign
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Draft Campaigns */}
        {draftCampaigns.length > 0 && (
          <Card className="border-2 border-amber-200 bg-amber-50/30 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-semibold text-amber-900 flex items-center gap-2">
                <span>📝</span> Draft Campaigns
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {draftCampaigns.map((campaign) => (
                <div key={campaign.id} className="bg-white p-4 rounded-lg border border-amber-200 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{campaign.name}</h4>
                      <p className="text-sm text-gray-500">
                        Last edited: {new Date(campaign.updated_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleEditDraft(campaign.id)}
                        className="bg-purple-600 hover:bg-purple-700 text-white"
                      >
                        Continue Editing
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDeleteDraft(campaign.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

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
  );
}
