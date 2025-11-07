
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Save } from "lucide-react";
import { LinkedInCampaignData } from "../LinkedInAdCampaignFlow";

import { AICampaignSuggestions } from "@/types/ai-campaign";

interface LinkedInCampaignSetupStepProps {
  data: LinkedInCampaignData;
  onUpdate: (data: Partial<LinkedInCampaignData>) => void;
  onNext: () => void;
  onSaveDraft?: () => Promise<void>;
  aiSuggestions?: AICampaignSuggestions | null;
}

export function LinkedInCampaignSetupStep({ data, onUpdate, onNext, onSaveDraft }: LinkedInCampaignSetupStepProps) {
  const [formData, setFormData] = useState({
    adAccount: data.adAccount || "",
    campaignName: data.campaignName || "",
    objective: data.objective || "",
    budgetType: data.budgetType || "",
    budgetAmount: data.budgetAmount || 0,
    bidStrategy: data.bidStrategy || ""
  });

  // Update formData when data prop changes (from AI suggestions)
  useEffect(() => {
    setFormData({
      adAccount: data.adAccount || "",
      campaignName: data.campaignName || "",
      objective: data.objective || "",
      budgetType: data.budgetType || "",
      budgetAmount: data.budgetAmount || 0,
      bidStrategy: data.bidStrategy || ""
    });
  }, [data.adAccount, data.campaignName, data.objective, data.budgetType, data.budgetAmount, data.bidStrategy]);

  const handleChange = (field: string, value: string | number) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    onUpdate(newData);
  };

  const isFormValid = () => {
    return formData.adAccount && 
           formData.campaignName && 
           formData.objective && 
           formData.budgetType && 
           formData.budgetAmount > 0 && 
           formData.bidStrategy;
  };

  const saveDraft = async () => {
    if (onSaveDraft) {
      await onSaveDraft();
    }
  };

  return (
    <Card className="border border-gray-200 shadow-sm bg-white">
      <CardContent className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Ad Account */}
          <div className="space-y-2">
            <Label htmlFor="adAccount" className="text-sm font-medium text-gray-700">
              Select LinkedIn Ad Account *
            </Label>
            <Select value={formData.adAccount} onValueChange={(value) => handleChange("adAccount", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Choose your LinkedIn ad account" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="account1">LeadMasters LinkedIn</SelectItem>
                <SelectItem value="account2">Business LinkedIn</SelectItem>
                <SelectItem value="account3">Marketing LinkedIn</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Campaign Name */}
          <div className="space-y-2">
            <Label htmlFor="campaignName" className="text-sm font-medium text-gray-700">
              Campaign Name *
            </Label>
            <Input
              id="campaignName"
              value={formData.campaignName}
              onChange={(e) => handleChange("campaignName", e.target.value)}
              placeholder="Enter campaign name"
            />
          </div>

          {/* Campaign Objective */}
          <div className="space-y-2">
            <Label htmlFor="objective" className="text-sm font-medium text-gray-700">
              Campaign Objective *
            </Label>
            <Select value={formData.objective} onValueChange={(value) => handleChange("objective", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select objective" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="brand_awareness">Brand Awareness</SelectItem>
                <SelectItem value="website_visits">Website Visits</SelectItem>
                <SelectItem value="engagement">Engagement</SelectItem>
                <SelectItem value="video_views">Video Views</SelectItem>
                <SelectItem value="lead_generation">Lead Generation</SelectItem>
                <SelectItem value="website_conversions">Website Conversions</SelectItem>
                <SelectItem value="job_applicants">Job Applicants</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Budget Type */}
          <div className="space-y-2">
            <Label htmlFor="budgetType" className="text-sm font-medium text-gray-700">
              Budget Type *
            </Label>
            <Select value={formData.budgetType} onValueChange={(value) => handleChange("budgetType", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select budget type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily Budget</SelectItem>
                <SelectItem value="total">Total Budget</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Budget Amount */}
          <div className="space-y-2">
            <Label htmlFor="budgetAmount" className="text-sm font-medium text-gray-700">
              Budget Amount (INR) *
            </Label>
            <Input
              id="budgetAmount"
              type="number"
              value={formData.budgetAmount}
              onChange={(e) => handleChange("budgetAmount", parseInt(e.target.value) || 0)}
              placeholder="Enter amount"
              min="1"
            />
          </div>

          {/* Bid Strategy */}
          <div className="space-y-2">
            <Label htmlFor="bidStrategy" className="text-sm font-medium text-gray-700">
              Bid Strategy *
            </Label>
            <Select value={formData.bidStrategy} onValueChange={(value) => handleChange("bidStrategy", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select bid strategy" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="automated_bid">Automated Bidding</SelectItem>
                <SelectItem value="maximum_delivery">Maximum Delivery</SelectItem>
                <SelectItem value="cost_cap">Cost Cap</SelectItem>
                <SelectItem value="manual_bid">Manual Bidding</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
          <Button 
            variant="outline" 
            onClick={saveDraft}
            className="flex items-center space-x-2"
          >
            <Save className="w-4 h-4" />
            <span>Save as Draft</span>
          </Button>
          
          <Button 
            onClick={onNext}
            disabled={!isFormValid()}
            className="bg-gradient-to-r from-[#7C3AED] to-[#D946EF] hover:from-purple-700 hover:to-pink-600 text-white px-8"
          >
            Next
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
