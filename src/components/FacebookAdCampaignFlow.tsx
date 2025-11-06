
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { CampaignSetupStep } from "./campaign-flow/CampaignSetupStep";
import { TargetAudienceStep } from "./campaign-flow/TargetAudienceStep";
import { AdContentStep } from "./campaign-flow/AdContentStep";
import { AIContextModal } from "./campaign-flow/AIContextModal";
import { AIAssistantPanel } from "./campaign-flow/AIAssistantPanel";
import { useCampaignAI } from "@/hooks/useCampaignAI";
import { toast } from "sonner";

export interface CarouselCard {
  id: string;
  image: File;
  imagePreview: string;
  headline: string;
  description: string;
  url: string;
}

export interface CampaignData {
  // Campaign Setup
  adAccount?: string;
  campaignName?: string;
  specialCategory?: string;
  objective?: string;
  budgetType?: string;
  budgetAmount?: number;
  bidStrategy?: string;
  
  // Target Audience
  facebookPage?: string;
  targetLocations?: string[];
  targetGender?: string;
  ageRange?: [number, number];
  
  // Ad Content
  primaryText?: string;
  adLinkUrl?: string;
  heading?: string;
  description?: string;
  adFormat?: string;
  uploadedImage?: File | null;
  carouselCards?: CarouselCard[];
  callToAction?: string;
}

export function FacebookAdCampaignFlow() {
  const [currentStep, setCurrentStep] = useState(1);
  const [campaignData, setCampaignData] = useState<CampaignData>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [aiEnabled, setAiEnabled] = useState(false);
  const { isLoading: aiLoading, suggestions, businessContext, generateSuggestions } = useCampaignAI();

  const updateCampaignData = (data: Partial<CampaignData>) => {
    setCampaignData(prev => ({ ...prev, ...data }));
  };

  const handleAIToggle = () => {
    if (!aiEnabled) {
      setShowAIModal(true);
    } else {
      setAiEnabled(false);
    }
  };

  const handleAISubmit = async (context: any) => {
    const result = await generateSuggestions(context);
    if (result) {
      setAiEnabled(true);
      setShowAIModal(false);
    }
  };

  // Map AI suggestion values to dropdown values
  const mapAIValueToDropdown = (field: string, aiValue: string): string => {
    const mappings: Record<string, Record<string, string>> = {
      objective: {
        'Awareness': 'awareness',
        'Brand Awareness': 'awareness',
        'Traffic': 'traffic',
        'Website Traffic': 'traffic',
        'Engagement': 'engagement',
        'Leads': 'leads',
        'Lead Generation': 'leads',
        'App Promotion': 'app_promotion',
        'App Installs': 'app_promotion',
        'Sales': 'sales',
        'Conversions': 'sales'
      },
      bidStrategy: {
        'Lowest Cost': 'lowest_cost',
        'Cost Cap': 'cost_cap',
        'Bid Cap': 'bid_cap',
        'Target Cost': 'target_cost',
        'Lowest Cost (with a cap if leads are consistently expensive)': 'lowest_cost'
      }
    };

    const fieldMappings = mappings[field];
    if (fieldMappings) {
      // Try exact match first
      if (fieldMappings[aiValue]) {
        return fieldMappings[aiValue];
      }
      // Try case-insensitive match
      const lowerAiValue = aiValue.toLowerCase();
      for (const [key, val] of Object.entries(fieldMappings)) {
        if (key.toLowerCase() === lowerAiValue) {
          return val;
        }
      }
    }
    
    return aiValue;
  };

  const handleApplyAISuggestion = (field: string, value: any) => {
    console.log('Applying AI suggestion:', field, value);
    const mappedValue = typeof value === 'string' ? mapAIValueToDropdown(field, value) : value;
    console.log('Mapped value:', field, mappedValue);
    updateCampaignData({ [field]: mappedValue });
    toast.success('AI suggestion applied successfully!');
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return "Campaign Setup";
      case 2: return "Target Audience";
      case 3: return "Ad Content & Creative";
      default: return "Campaign Setup";
    }
  };

  const getProgressValue = () => {
    return (currentStep / 3) * 100;
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <CampaignSetupStep
            data={campaignData}
            onUpdate={updateCampaignData}
            onNext={nextStep}
            aiSuggestions={suggestions}
          />
        );
      case 2:
        return (
          <TargetAudienceStep
            data={campaignData}
            onUpdate={updateCampaignData}
            onNext={nextStep}
            onBack={prevStep}
            aiSuggestions={suggestions}
          />
        );
      case 3:
        return (
          <AdContentStep
            data={campaignData}
            onUpdate={updateCampaignData}
            onBack={prevStep}
            aiSuggestions={suggestions}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex-1 p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#7C3AED] to-[#D946EF] bg-clip-text text-transparent mb-2">
              Create Facebook Campaign
            </h1>
            <p className="text-gray-600">
              Follow these steps to create your Facebook advertising campaign
            </p>
          </div>
          <Button
            onClick={handleAIToggle}
            variant={aiEnabled ? "default" : "outline"}
            className={aiEnabled ? "bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 text-white" : ""}
          >
            <Sparkles className="w-4 h-4 mr-2" />
            AI Assistant {aiEnabled ? "ON" : "OFF"}
          </Button>
        </div>

        {/* Progress Bar */}
        <Card className="mb-8 border border-gray-200 shadow-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between mb-4">
              <CardTitle className="text-lg font-semibold text-gray-900">
                {getStepTitle()}
              </CardTitle>
              <span className="text-sm text-gray-500">
                Step {currentStep} of 3
              </span>
            </div>
            <Progress value={getProgressValue()} className="h-2" />
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span className={currentStep >= 1 ? "text-purple-600 font-medium" : ""}>
                Campaign Setup
              </span>
              <span className={currentStep >= 2 ? "text-purple-600 font-medium" : ""}>
                Target Audience
              </span>
              <span className={currentStep >= 3 ? "text-purple-600 font-medium" : ""}>
                Ad Content
              </span>
            </div>
          </CardHeader>
        </Card>

        {/* Current Step Content */}
        <div className="flex gap-6">
          <div className="flex-1">
            {renderCurrentStep()}
          </div>
          {aiEnabled && suggestions && (
            <AIAssistantPanel
              suggestions={suggestions}
              step={currentStep === 1 ? 'setup' : currentStep === 2 ? 'audience' : 'content'}
              onApplySuggestion={handleApplyAISuggestion}
              businessContext={businessContext}
            />
          )}
        </div>
      </div>

      <AIContextModal
        open={showAIModal}
        onClose={() => setShowAIModal(false)}
        onSubmit={handleAISubmit}
        platform="facebook"
        isLoading={aiLoading}
      />
    </div>
  );
}
