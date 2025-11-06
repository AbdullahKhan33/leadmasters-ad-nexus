
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Save } from "lucide-react";
import { CampaignData } from "../FacebookAdCampaignFlow";

import { AICampaignSuggestions } from "@/types/ai-campaign";

interface CampaignSetupStepProps {
  data: CampaignData;
  onUpdate: (data: Partial<CampaignData>) => void;
  onNext: () => void;
  aiSuggestions?: AICampaignSuggestions | null;
}

export function CampaignSetupStep({ data, onUpdate, onNext }: CampaignSetupStepProps) {
  const [formData, setFormData] = useState({
    adAccount: data.adAccount || "",
    campaignName: data.campaignName || "",
    specialCategory: data.specialCategory || "",
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
      specialCategory: data.specialCategory || "",
      objective: data.objective || "",
      budgetType: data.budgetType || "",
      budgetAmount: data.budgetAmount || 0,
      bidStrategy: data.bidStrategy || ""
    });
  }, [data]);

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
           Number(formData.budgetAmount) > 0 && 
           formData.bidStrategy;
  };

  const saveDraft = () => {
    console.log("Saving draft:", formData);
    // TODO: Implement save draft functionality
  };

  return (
    <Card className="border border-gray-200 shadow-sm bg-white">
      <CardContent className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Ad Account */}
          <div className="space-y-2">
            <Label htmlFor="adAccount" className="text-sm font-medium text-gray-700">
              Select Facebook Ad Account *
            </Label>
            <Select value={formData.adAccount} onValueChange={(value) => handleChange("adAccount", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Choose your ad account" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="account1">LeadMasters Main Account</SelectItem>
                <SelectItem value="account2">Business Account 2</SelectItem>
                <SelectItem value="account3">Marketing Account</SelectItem>
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

          {/* Special Ad Category */}
          <div className="space-y-2">
            <Label htmlFor="specialCategory" className="text-sm font-medium text-gray-700">
              Special Ad Category
            </Label>
            <Select value={formData.specialCategory} onValueChange={(value) => handleChange("specialCategory", value)}>
              <SelectTrigger>
                <SelectValue placeholder="None (default)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="credit">Credit</SelectItem>
                <SelectItem value="employment">Employment</SelectItem>
                <SelectItem value="housing">Housing</SelectItem>
                <SelectItem value="political">Political</SelectItem>
              </SelectContent>
            </Select>
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
                <SelectItem value="awareness">Awareness</SelectItem>
                <SelectItem value="traffic">Traffic</SelectItem>
                <SelectItem value="engagement">Engagement</SelectItem>
                <SelectItem value="leads">Leads</SelectItem>
                <SelectItem value="app_promotion">App Promotion</SelectItem>
                <SelectItem value="sales">Sales</SelectItem>
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
                <SelectItem value="lifetime">Lifetime Budget</SelectItem>
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
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="bidStrategy" className="text-sm font-medium text-gray-700">
              Bid Strategy *
            </Label>
            <Select value={formData.bidStrategy} onValueChange={(value) => handleChange("bidStrategy", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select bid strategy" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="lowest_cost">Lowest Cost</SelectItem>
                <SelectItem value="cost_cap">Cost Cap</SelectItem>
                <SelectItem value="bid_cap">Bid Cap</SelectItem>
                <SelectItem value="target_cost">Target Cost</SelectItem>
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
