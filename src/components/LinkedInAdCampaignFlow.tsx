
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { LinkedInCampaignSetupStep } from "./campaign-flow/LinkedInCampaignSetupStep";
import { LinkedInTargetAudienceStep } from "./campaign-flow/LinkedInTargetAudienceStep";
import { LinkedInAdContentStep } from "./campaign-flow/LinkedInAdContentStep";
import { AIContextModal } from "./campaign-flow/AIContextModal";
import { AIAssistantPanel } from "./campaign-flow/AIAssistantPanel";
import { useCampaignAI } from "@/hooks/useCampaignAI";

export interface LinkedInCampaignData {
  // Campaign Setup
  adAccount?: string;
  campaignName?: string;
  objective?: string;
  budgetType?: string;
  budgetAmount?: number;
  bidStrategy?: string;
  
  // Target Audience
  targetLocations?: string[];
  jobTitles?: string[];
  companies?: string[];
  industries?: string[];
  skills?: string[];
  seniority?: string[];
  companySize?: string[];
  targetGender?: string;
  ageRange?: [number, number];
  
  // Ad Content
  adFormat?: string;
  headline?: string;
  description?: string;
  callToAction?: string;
  destinationUrl?: string;
  uploadedImage?: File | null;
  companyName?: string;
}

export function LinkedInAdCampaignFlow() {
  const [currentStep, setCurrentStep] = useState(1);
  const [campaignData, setCampaignData] = useState<LinkedInCampaignData>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [aiEnabled, setAiEnabled] = useState(false);
  const { isLoading: aiLoading, suggestions, generateSuggestions } = useCampaignAI();

  const updateCampaignData = (data: Partial<LinkedInCampaignData>) => {
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

  const handleApplyAISuggestion = (field: string, value: any) => {
    updateCampaignData({ [field]: value });
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
          <LinkedInCampaignSetupStep
            data={campaignData}
            onUpdate={updateCampaignData}
            onNext={nextStep}
            aiSuggestions={suggestions}
          />
        );
      case 2:
        return (
          <LinkedInTargetAudienceStep
            data={campaignData}
            onUpdate={updateCampaignData}
            onNext={nextStep}
            onBack={prevStep}
            aiSuggestions={suggestions}
          />
        );
      case 3:
        return (
          <LinkedInAdContentStep
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
              Create LinkedIn Campaign
            </h1>
            <p className="text-gray-600">
              Follow these steps to create your LinkedIn advertising campaign
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
            />
          )}
        </div>
      </div>

      <AIContextModal
        open={showAIModal}
        onClose={() => setShowAIModal(false)}
        onSubmit={handleAISubmit}
        platform="linkedin"
        isLoading={aiLoading}
      />
    </div>
  );
}
