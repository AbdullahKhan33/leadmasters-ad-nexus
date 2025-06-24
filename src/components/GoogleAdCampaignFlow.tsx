
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { GoogleCampaignSetupStep } from "./campaign-flow/GoogleCampaignSetupStep";
import { GoogleTargetAudienceStep } from "./campaign-flow/GoogleTargetAudienceStep";
import { GoogleAdContentStep } from "./campaign-flow/GoogleAdContentStep";

export interface GoogleCampaignData {
  // Campaign Setup
  adAccount?: string;
  campaignName?: string;
  campaignType?: string;
  budgetType?: string;
  budgetAmount?: number;
  bidStrategy?: string;
  
  // Target Audience
  targetLocations?: string[];
  targetLanguages?: string[];
  targetGender?: string;
  ageRange?: [number, number];
  keywords?: string[];
  audienceType?: string;
  
  // Ad Content
  headline1?: string;
  headline2?: string;
  headline3?: string;
  description1?: string;
  description2?: string;
  finalUrl?: string;
  displayUrl?: string;
  adFormat?: string;
  callToAction?: string;
}

export function GoogleAdCampaignFlow() {
  const [currentStep, setCurrentStep] = useState(1);
  const [campaignData, setCampaignData] = useState<GoogleCampaignData>({});

  const updateCampaignData = (data: Partial<GoogleCampaignData>) => {
    setCampaignData(prev => ({ ...prev, ...data }));
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
          <GoogleCampaignSetupStep 
            data={campaignData} 
            onUpdate={updateCampaignData}
            onNext={nextStep}
          />
        );
      case 2:
        return (
          <GoogleTargetAudienceStep 
            data={campaignData} 
            onUpdate={updateCampaignData}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 3:
        return (
          <GoogleAdContentStep 
            data={campaignData} 
            onUpdate={updateCampaignData}
            onBack={prevStep}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex-1 p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#7C3AED] to-[#D946EF] bg-clip-text text-transparent mb-2">
            Create Google Ads Campaign
          </h1>
          <p className="text-gray-600">
            Follow these steps to create your Google Ads campaign
          </p>
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
        {renderCurrentStep()}
      </div>
    </div>
  );
}
