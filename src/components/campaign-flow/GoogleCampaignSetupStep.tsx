
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Save } from "lucide-react";
import { GoogleCampaignData } from "../GoogleAdCampaignFlow";

import { AICampaignSuggestions } from "@/types/ai-campaign";

interface GoogleCampaignSetupStepProps {
  data: GoogleCampaignData;
  onUpdate: (data: Partial<GoogleCampaignData>) => void;
  onNext: () => void;
  onSaveDraft?: () => Promise<void>;
  aiSuggestions?: AICampaignSuggestions | null;
}

export function GoogleCampaignSetupStep({ data, onUpdate, onNext, onSaveDraft }: GoogleCampaignSetupStepProps) {
  const [formData, setFormData] = useState({
    adAccount: data.adAccount || "",
    campaignName: data.campaignName || "",
    campaignType: data.campaignType || "",
    budgetType: data.budgetType || "",
    budgetAmount: data.budgetAmount || 0,
    bidStrategy: data.bidStrategy || ""
  });

  // Update formData when data prop changes (from AI suggestions)
  useEffect(() => {
    setFormData({
      adAccount: data.adAccount || "",
      campaignName: data.campaignName || "",
      campaignType: data.campaignType || "",
      budgetType: data.budgetType || "",
      budgetAmount: data.budgetAmount || 0,
      bidStrategy: data.bidStrategy || ""
    });
  }, [data.adAccount, data.campaignName, data.campaignType, data.budgetType, data.budgetAmount, data.bidStrategy]);

  const handleChange = (field: string, value: string | number) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    onUpdate(newData);
  };

  const isFormValid = () => {
    return formData.adAccount && 
           formData.campaignName && 
           formData.campaignType && 
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
              Select Google Ads Account *
            </Label>
            <Select value={formData.adAccount} onValueChange={(value) => handleChange("adAccount", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Choose your Google Ads account" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="account1">LeadMasters Google Ads</SelectItem>
                <SelectItem value="account2">Business Google Ads</SelectItem>
                <SelectItem value="account3">Marketing Google Ads</SelectItem>
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

          {/* Campaign Type */}
          <div className="space-y-2">
            <Label htmlFor="campaignType" className="text-sm font-medium text-gray-700">
              Campaign Type *
            </Label>
            <Select value={formData.campaignType} onValueChange={(value) => handleChange("campaignType", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select campaign type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="search">Search</SelectItem>
                <SelectItem value="display">Display</SelectItem>
                <SelectItem value="shopping">Shopping</SelectItem>
                <SelectItem value="video">Video</SelectItem>
                <SelectItem value="app">App</SelectItem>
                <SelectItem value="performance_max">Performance Max</SelectItem>
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
                <SelectItem value="campaign_total">Campaign Total</SelectItem>
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
                <SelectItem value="maximize_clicks">Maximize Clicks</SelectItem>
                <SelectItem value="maximize_conversions">Maximize Conversions</SelectItem>
                <SelectItem value="target_cpa">Target CPA</SelectItem>
                <SelectItem value="target_roas">Target ROAS</SelectItem>
                <SelectItem value="manual_cpc">Manual CPC</SelectItem>
                <SelectItem value="enhanced_cpc">Enhanced CPC</SelectItem>
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
