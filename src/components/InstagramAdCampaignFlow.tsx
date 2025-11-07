
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Sparkles, Save } from "lucide-react";
import { InstagramCampaignSetupStep } from "./campaign-flow/InstagramCampaignSetupStep";
import { InstagramTargetAudienceStep } from "./campaign-flow/InstagramTargetAudienceStep";
import { InstagramAdContentStep } from "./campaign-flow/InstagramAdContentStep";
import { AIContextModal } from "./campaign-flow/AIContextModal";
import { AIAssistantPanel } from "./campaign-flow/AIAssistantPanel";
import { useCampaignAI } from "@/hooks/useCampaignAI";
import { useInstagramCampaigns } from "@/hooks/useInstagramCampaigns";
import { toast } from "sonner";

export interface InstagramCampaignData {
  // Campaign Setup
  adAccount?: string;
  campaignName?: string;
  objective?: string;
  budgetType?: string;
  budgetAmount?: number;
  bidStrategy?: string;
  
  // Target Audience
  instagramAccount?: string;
  targetLocations?: string[];
  targetGender?: string;
  ageRange?: [number, number];
  interests?: string[];
  
  // Ad Content
  primaryText?: string;
  adLinkUrl?: string;
  heading?: string;
  description?: string;
  adFormat?: string;
  callToAction?: string;
  uploadedImage?: File | null;
  
  // Channel Selection
  selectedChannel?: 'website' | 'whatsapp' | 'instagram';
  websiteUrl?: string;
  whatsappNumber?: string;
  instagramHandle?: string;
}

interface InstagramAdCampaignFlowProps {
  draftId?: string | null;
}

export function InstagramAdCampaignFlow({ draftId }: InstagramAdCampaignFlowProps = {}) {
  const [currentStep, setCurrentStep] = useState(1);
  const [campaignData, setCampaignData] = useState<InstagramCampaignData>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [aiEnabled, setAiEnabled] = useState(false);
  const [currentCampaignId, setCurrentCampaignId] = useState<string | null>(draftId || null);
  const { isLoading: aiLoading, suggestions, businessContext, generateSuggestions, restoreFromDraft } = useCampaignAI();
  const { campaigns, saveCampaign, updateCampaign, refetch } = useInstagramCampaigns();

  // Load draft data when draftId is provided
  useEffect(() => {
    if (draftId && campaigns.length > 0) {
      console.log('Loading Instagram draft:', draftId);
      const draft = campaigns.find(c => c.id === draftId);
      if (draft && draft.campaignData) {
        console.log('Instagram Draft found:', draft);
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
        const campaignName = campaignData.campaignName || `Instagram Campaign ${new Date().toLocaleDateString()}`;
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

  const updateCampaignData = (data: Partial<InstagramCampaignData>) => {
    setCampaignData(prev => ({ ...prev, ...data }));
  };

  const handleAIToggle = () => {
    if (!aiEnabled) {
      setShowAIModal(true);
    } else {
      setAiEnabled(false);
    }
  };

  const handleAISubmit = async (context: any, autoBuild: boolean = false) => {
    const result = await generateSuggestions(context);
    if (result) {
      setAiEnabled(true);
      if (autoBuild) {
        await handleAutoApplyAllSuggestions(result);
        setShowAIModal(false);
      } else {
        setShowAIModal(false);
      }
    }
  };

  // Apply sensible defaults when AI doesn't provide a value
  const applyDefaultValues = () => {
    updateCampaignData({
      adAccount: campaignData.adAccount || 'account1',
      campaignName: campaignData.campaignName || 'Quick Launch Campaign',
      objective: campaignData.objective || 'awareness',
      budgetType: campaignData.budgetType || 'daily',
      budgetAmount: campaignData.budgetAmount || 100,
      bidStrategy: campaignData.bidStrategy || 'lowest_cost',
      instagramAccount: campaignData.instagramAccount || 'account1',
      targetLocations: campaignData.targetLocations?.length ? campaignData.targetLocations : ['india'],
      targetGender: campaignData.targetGender || 'all',
      ageRange: campaignData.ageRange || [18, 65],
      adFormat: (campaignData as any).adFormat || 'single',
      callToAction: (campaignData as any).callToAction || 'learn_more',
      selectedChannel: (campaignData as any).selectedChannel || 'website',
      websiteUrl: (campaignData as any).websiteUrl || 'https://example.com',
      heading: (campaignData as any).heading || 'Quick Launch Headline',
      primaryText: (campaignData as any).primaryText || 'This campaign was auto-built. Tweak and launch!'
    } as any);
  };

  const handleAutoApplyAllSuggestions = async (s?: import('@/types/ai-campaign').AICampaignSuggestions) => {
    const sug = s || suggestions;
    if (!sug) return;

    // STEP 1: Campaign Setup
    const { campaignSetup } = sug;
    if (campaignSetup) {
      if (campaignSetup.objective) handleApplyAISuggestion('objective', campaignSetup.objective);
      if (campaignSetup.recommendedBudget) {
        handleApplyAISuggestion('budgetAmount', campaignSetup.recommendedBudget.min);
        handleApplyAISuggestion('budgetType', 'daily');
      }
      if (campaignSetup.bidStrategy) handleApplyAISuggestion('bidStrategy', campaignSetup.bidStrategy);
    }

    // STEP 2: Target Audience
    const { targetAudience } = sug;
    if (targetAudience) {
      if (targetAudience.demographics) {
        if (targetAudience.demographics.ageRange) handleApplyAISuggestion('ageRange', targetAudience.demographics.ageRange);
        if (targetAudience.demographics.gender) handleApplyAISuggestion('targetGender', targetAudience.demographics.gender);
      }
      if (targetAudience.locations?.length) handleApplyAISuggestion('targetLocations', targetAudience.locations.map(loc => loc.name));
      if (targetAudience.interests?.length) handleApplyAISuggestion('interests', targetAudience.interests);
    }

    // STEP 3: Ad Content
    const { adContent } = sug;
    if (adContent) {
      if (adContent.headlines?.length) handleApplyAISuggestion('heading', adContent.headlines[0].text);
      if (adContent.descriptions?.length) handleApplyAISuggestion('description', adContent.descriptions[0].text);
      if (adContent.primaryText?.length) handleApplyAISuggestion('primaryText', adContent.primaryText[0]);
      if (adContent.callToAction?.length) handleApplyAISuggestion('callToAction', adContent.callToAction[0]);
    }

    // Fill any remaining required fields with defaults
    applyDefaultValues();

    // Jump to step 3 (ensure once now and once on next tick)
    setCurrentStep(3);
    setTimeout(() => setCurrentStep(3), 0);
    toast.success('🎉 Campaign auto-built! Review and launch when ready.');
  };

  // Map AI suggestion values to dropdown values (Instagram-specific)
  const mapAIValueToDropdown = (field: string, aiValue: string): string => {
    const mappings: Record<string, Record<string, string>> = {
      objective: {
        'awareness': 'awareness',
        'brand awareness': 'awareness',
        'traffic': 'traffic',
        'website traffic': 'traffic',
        'engagement': 'engagement',
        'leads': 'leads',
        'lead generation': 'leads',
        'app promotion': 'app_promotion',
        'app installs': 'app_promotion',
        'sales': 'sales',
        'conversions': 'sales',
        'reach': 'reach',
        'video views': 'video_views'
      },
      budgetType: {
        'daily': 'daily',
        'daily budget': 'daily',
        'lifetime': 'lifetime',
        'total': 'lifetime',
        'total budget': 'lifetime'
      },
      bidStrategy: {
        'lowest cost': 'lowest_cost',
        'cost cap': 'cost_cap',
        'bid cap': 'bid_cap',
        'target cost': 'target_cost'
      },
      targetGender: {
        'all': 'all',
        'any': 'all',
        'male': 'male',
        'female': 'female'
      },
      callToAction: {
        'learn more': 'learn_more',
        'shop now': 'shop_now',
        'sign up': 'sign_up',
        'download': 'download',
        'get quote': 'get_quote'
      },
      adFormat: {
        'single': 'single',
        'single image': 'single',
        'carousel': 'carousel',
        'video': 'video'
      }
    };

    const lower = aiValue.toLowerCase();
    const fieldMappings = mappings[field];
    if (fieldMappings) {
      // direct match or synonym
      if (fieldMappings[lower]) return fieldMappings[lower];
    }
    return aiValue;
  };

  // Normalize incoming AI field names to our state shape
  const normalizeField = (field: string): string => {
    switch (field) {
      case 'targetInterests':
        return 'interests';
      case 'keyword':
        return 'keywords';
      default:
        return field;
    }
  };

  const handleApplyAISuggestion = (field: string, value: any) => {
    const normalizedField = normalizeField(field);

    // Map strings to dropdown-safe values
    let mappedValue: any = typeof value === 'string'
      ? mapAIValueToDropdown(normalizedField, value)
      : value;

    // Ensure age range is a tuple of numbers and clamp to allowed bounds (18-65)
    if (normalizedField === 'ageRange' && Array.isArray(mappedValue)) {
      const min = 18;
      const max = 65;
      const a = Math.max(min, Math.min(max, Number(mappedValue[0])));
      const b = Math.max(min, Math.min(max, Number(mappedValue[1])));
      mappedValue = [Math.min(a, b), Math.max(a, b)] as [number, number];
    }

    // Fields that are arrays: add uniquely instead of replacing
    const arrayFields = new Set(['targetLocations', 'targetLanguages', 'keywords', 'interests']);
    if (arrayFields.has(normalizedField)) {
      const prev = (campaignData as any)[normalizedField] as any[] || [];
      const next = Array.isArray(mappedValue) ? mappedValue : [...prev, mappedValue];
      mappedValue = Array.from(new Set(next.filter(Boolean)));
    }

    updateCampaignData({ [normalizedField]: mappedValue } as Partial<InstagramCampaignData>);
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
          <InstagramCampaignSetupStep
            data={campaignData}
            onUpdate={updateCampaignData}
            onNext={nextStep}
            onSaveDraft={handleSaveDraft}
            aiSuggestions={suggestions}
          />
        );
      case 2:
        return (
          <InstagramTargetAudienceStep
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
          <InstagramAdContentStep
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
              {draftId ? 'Edit Instagram Campaign' : 'Create Instagram Campaign'}
            </h1>
            <p className="text-gray-600">
              Follow these steps to create your Instagram advertising campaign
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
        platform="instagram"
        isLoading={aiLoading}
      />
    </div>
  );
}
