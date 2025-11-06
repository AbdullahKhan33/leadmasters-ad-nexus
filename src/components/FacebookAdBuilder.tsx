
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Edit, BarChart3, DollarSign, MousePointer, ArrowLeft, FileText, Trash2 } from "lucide-react";
import { CampaignCard } from "@/components/CampaignCard";
import { MetricCard } from "@/components/MetricCard";
import { FacebookAdCampaignFlow } from "./FacebookAdCampaignFlow";
import { useFacebookCampaigns } from "@/hooks/useFacebookCampaigns";

export function FacebookAdBuilder() {
  const [showCampaignFlow, setShowCampaignFlow] = useState(false);
  const [selectedDraftId, setSelectedDraftId] = useState<string | null>(null);
  const { campaigns, isLoading, deleteCampaign } = useFacebookCampaigns();

  const draftCampaigns = campaigns.filter(c => c.status === 'draft');
  
  const handleEditDraft = (draftId: string) => {
    setSelectedDraftId(draftId);
    setShowCampaignFlow(true);
  };
  
  const handleDeleteDraft = async (id: string) => {
    if (confirm('Are you sure you want to delete this draft?')) {
      await deleteCampaign(id);
    }
  };

  const handleBackToDashboard = () => {
    setShowCampaignFlow(false);
    setSelectedDraftId(null);
  };

  const recentCampaigns = [
    { id: 1, name: "Summer Sale Campaign", status: "Live", performance: "Good" },
    { id: 2, name: "Product Launch 2024", status: "Draft", performance: "N/A" },
    { id: 3, name: "Holiday Special", status: "Live", performance: "Excellent" },
  ];

  const metrics = [
    { title: "Click-Through Rate", value: "2.4%", icon: MousePointer, trend: "+0.3%" },
    { title: "Total Spend", value: "$1,247", icon: DollarSign, trend: "+12%" },
    { title: "Conversions", value: "156", icon: BarChart3, trend: "+8%" },
  ];

  if (showCampaignFlow) {
    return (
      <div className="flex flex-col">
        {/* Back Button */}
        <div className="p-3 border-b border-gray-200 bg-white">
          <Button
            variant="ghost"
            onClick={handleBackToDashboard}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </Button>
        </div>
        <FacebookAdCampaignFlow draftId={selectedDraftId} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-[#7C3AED] to-[#D946EF] bg-clip-text text-transparent mb-1">Facebook Campaign Hub</h1>
        <p className="text-sm text-gray-600">Create and manage your Facebook advertising campaigns with AI-powered tools</p>
      </div>

      {/* Create New Campaign */}
      <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 bg-white">
        <CardContent className="p-6 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Plus className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Create New Campaign</h3>
            <p className="text-sm text-gray-600 mb-4">Start building your next Facebook ad campaign with our AI-powered tools and optimization features</p>
            <Button 
              size="default" 
              className="bg-gradient-to-r from-[#7C3AED] to-[#D946EF] hover:from-purple-700 hover:to-pink-600 text-white transition-all duration-200 shadow-lg hover:shadow-xl px-6 py-2 text-sm"
              onClick={() => setShowCampaignFlow(true)}
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Campaign
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Draft Campaigns Section */}
      {draftCampaigns.length > 0 && (
        <Card className="border border-amber-200 bg-amber-50/30 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-amber-600" />
              Draft Campaigns ({draftCampaigns.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {draftCampaigns.map(campaign => (
              <div
                key={campaign.id}
                className="flex items-center justify-between p-3 bg-white rounded-lg border border-amber-200 hover:border-amber-300 transition-colors"
              >
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{campaign.name}</h4>
                  <p className="text-xs text-gray-500">
                    Last edited: {new Date(campaign.updated_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEditDraft(campaign.id)}
                  >
                    <Edit className="w-4 h-4 mr-1" />
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
            ))}
          </CardContent>
        </Card>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Campaigns */}
        <div className="lg:col-span-2">
          <Card className="border border-gray-200 shadow-sm bg-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold text-gray-900">Recent Campaigns</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentCampaigns.map((campaign) => (
                <CampaignCard key={campaign.id} campaign={campaign} />
              ))}
              <div className="pt-3 border-t border-gray-100">
                <Button variant="ghost" className="w-full text-purple-600 hover:text-purple-700 hover:bg-purple-50 transition-colors duration-200 text-sm">
                  View All Campaigns
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Analytics Overview */}
        <div>
          <Card className="border border-gray-200 shadow-sm bg-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold text-gray-900">Analytics Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {metrics.map((metric, index) => (
                <MetricCard key={index} metric={metric} />
              ))}
              <div className="pt-3 border-t border-gray-100">
                <Button variant="ghost" className="w-full text-purple-600 hover:text-purple-700 hover:bg-purple-50 transition-colors duration-200 text-sm">
                  View Detailed Analytics
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
