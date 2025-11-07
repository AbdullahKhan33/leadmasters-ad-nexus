
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Sparkles, Save } from "lucide-react";
import { LinkedInCampaignSetupStep } from "./campaign-flow/LinkedInCampaignSetupStep";
import { LinkedInTargetAudienceStep } from "./campaign-flow/LinkedInTargetAudienceStep";
import { LinkedInAdContentStep } from "./campaign-flow/LinkedInAdContentStep";
import { AIContextModal } from "./campaign-flow/AIContextModal";
import { AIAssistantPanel } from "./campaign-flow/AIAssistantPanel";
import { useCampaignAI } from "@/hooks/useCampaignAI";
import { useLinkedInCampaigns } from "@/hooks/useLinkedInCampaigns";
import { toast } from "sonner";

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

interface LinkedInAdCampaignFlowProps {
  draftId?: string | null;
}

export function LinkedInAdCampaignFlow({ draftId }: LinkedInAdCampaignFlowProps = {}) {
  const [currentStep, setCurrentStep] = useState(1);
  const [campaignData, setCampaignData] = useState<LinkedInCampaignData>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [aiEnabled, setAiEnabled] = useState(false);
  const [currentCampaignId, setCurrentCampaignId] = useState<string | null>(draftId || null);
  const { isLoading: aiLoading, suggestions, businessContext, generateSuggestions, restoreFromDraft } = useCampaignAI();
  const { campaigns, saveCampaign, updateCampaign, refetch } = useLinkedInCampaigns();

  // Load draft data when draftId is provided
  useEffect(() => {
    if (draftId && campaigns.length > 0) {
      console.log('Loading LinkedIn draft:', draftId);
      const draft = campaigns.find(c => c.id === draftId);
      if (draft && draft.campaignData) {
        console.log('LinkedIn Draft found:', draft);
        const data = draft.campaignData as any;
        setCampaignData(data);
        
        // Restore step
        if (data._currentStep) {
          setCurrentStep(data._currentStep);
          console.log('Restored step:', data._currentStep);
        }
        
        // Restore AI context and suggestions
        if (data._aiContext && data._aiSuggestions) {
          console.log('Restoring AI context and suggestions');
          restoreFromDraft(data._aiContext, data._aiSuggestions);
          setAiEnabled(true);
        }
      }
    }
  }, [draftId, campaigns, restoreFromDraft]);

  const handleSaveDraft = async () => {
    try {
      const metadata = {
        ...campaignData,
        _currentStep: currentStep,
        _aiContext: businessContext,
        _aiSuggestions: suggestions
      } as any;

      if (currentCampaignId) {
        await updateCampaign(currentCampaignId, metadata);
        toast.success('Draft updated successfully!');
      } else {
        const campaignName = campaignData.campaignName || `LinkedIn Campaign ${new Date().toLocaleDateString()}`;
        const savedId = await saveCampaign(metadata, campaignName);
        if (savedId) {
          setCurrentCampaignId(savedId);
        }
        toast.success('Draft saved successfully!');
      }
      await refetch();
    } catch (error) {
      console.error('Error saving draft:', error);
      toast.error('Failed to save draft');
    }
  };

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
        'Target Cost': 'target_cost'
      }
    };

    const fieldMappings = mappings[field];
    if (fieldMappings) {
      if (fieldMappings[aiValue]) return fieldMappings[aiValue];
      const lowerAiValue = aiValue.toLowerCase();
      for (const [key, val] of Object.entries(fieldMappings)) {
        if (key.toLowerCase() === lowerAiValue) return val;
      }
    }
    return aiValue;
  };

  const handleApplyAISuggestion = (field: string, value: any) => {
    const mappedValue = typeof value === 'string' ? mapAIValueToDropdown(field, value) : value;
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
          <LinkedInCampaignSetupStep
            data={campaignData}
            onUpdate={updateCampaignData}
            onNext={nextStep}
            onSaveDraft={handleSaveDraft}
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
            onSaveDraft={handleSaveDraft}
            aiSuggestions={suggestions}
          />
        );
      case 3:
        return (
          <LinkedInAdContentStep
            data={campaignData}
            onUpdate={updateCampaignData}
            onBack={prevStep}
            onSaveDraft={handleSaveDraft}
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
              {draftId ? 'Edit LinkedIn Campaign' : 'Create LinkedIn Campaign'}
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
              businessContext={businessContext}
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
