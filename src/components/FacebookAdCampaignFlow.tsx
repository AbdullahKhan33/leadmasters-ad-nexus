
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { CampaignSetupStep } from "./campaign-flow/CampaignSetupStep";
import { TargetAudienceStep } from "./campaign-flow/TargetAudienceStep";
import { AdContentStep } from "./campaign-flow/AdContentStep";
import { AIContextModal } from "./campaign-flow/AIContextModal";
import { FloatingAIDrawer } from "./campaign-flow/FloatingAIDrawer";
import { useCampaignAI } from "@/hooks/useCampaignAI";
import { useFacebookCampaigns, type CampaignData } from "@/hooks/useFacebookCampaigns";
import { AICampaignSuggestions } from "@/types/ai-campaign";
import { toast } from "sonner";

interface FacebookAdCampaignFlowProps {
  draftId?: string | null;
}

export interface CarouselCard {
  id: string;
  image: File;
  imagePreview: string;
  headline: string;
  description: string;
  url: string;
}

export interface CarouselCard {
  id: string;
  image: File;
  imagePreview: string;
  headline: string;
  description: string;
  url: string;
}

export type { CampaignData };

export function FacebookAdCampaignFlow({ draftId }: FacebookAdCampaignFlowProps = {}) {
  const [currentStep, setCurrentStep] = useState(1);
  const [campaignData, setCampaignData] = useState<CampaignData>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [aiEnabled, setAiEnabled] = useState(false);
  const [isAIDrawerOpen, setIsAIDrawerOpen] = useState(false);
  const [currentCampaignId, setCurrentCampaignId] = useState<string | null>(null);
  const { isLoading: aiLoading, suggestions, businessContext, generateSuggestions, restoreFromDraft } = useCampaignAI();
  const { campaigns, saveCampaign, updateCampaign, refetch } = useFacebookCampaigns();

  useEffect(() => {
    if (draftId && campaigns.length > 0) {
      const draft = campaigns.find(c => c.id === draftId);
      if (draft) {
        console.log('Loading draft:', draft.campaignData);
        setCampaignData(draft.campaignData);
        setCurrentCampaignId(draftId);
        const step = (draft.campaignData as any)?._currentStep;
        if (step && step >= 1 && step <= 3) {
          console.log('Restoring step:', step);
          setCurrentStep(step);
        }
        // Restore AI context and suggestions
        const aiContext = (draft.campaignData as any)?._aiContext;
        const aiSuggestions = (draft.campaignData as any)?._aiSuggestions;
        if (aiContext && aiSuggestions) {
          console.log('Restoring AI suggestions');
          restoreFromDraft(aiContext, aiSuggestions);
          setAiEnabled(true);
        }
      }
    }
  }, [draftId, campaigns, restoreFromDraft]);

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

  const handleAISubmit = async (context: any, autoBuild: boolean = false): Promise<boolean> => {
    const result = await generateSuggestions(context);
    if (!result) {
      return false;
    }
    
    // Immediately apply user's inputs for objective, budget and URL
    const goalToObjectiveMap: Record<string, string> = {
      'brand awareness': 'awareness',
      'lead generation': 'leads',
      'website traffic': 'traffic',
      'conversions': 'sales',
      'app installs': 'app_promotion',
      'engagement': 'engagement',
      'store visits': 'reach'
    };
    const goalLc = (context.campaignGoal || context.campaign_goal || '').toLowerCase();
    if (goalLc) {
      updateCampaignData({ objective: goalToObjectiveMap[goalLc] || 'awareness' });
    }
    const budgetRaw = context.budgetRange || context.budget_range || context.budget;
    if (budgetRaw) {
      const match = String(budgetRaw).match(/[\d,.]+/);
      const amount = match ? Number(match[0].replace(/,/g, '')) : undefined;
      updateCampaignData({
        budgetAmount: amount && !isNaN(amount) ? amount : (campaignData.budgetAmount || 100),
        budgetType: 'daily'
      });
    }
    const url = context.websiteUrl || context.website_url;
    if (url) {
      updateCampaignData({ adLinkUrl: url });
    }
    
    setAiEnabled(true);
    if (autoBuild) {
      await handleAutoApplyAllSuggestions(result);
      setShowAIModal(false);
    } else {
      setShowAIModal(false);
    }
    return true;
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
      facebookPage: (campaignData as any).facebookPage || 'page1',
      targetLocations: campaignData.targetLocations?.length ? campaignData.targetLocations : ['india'],
      targetGender: campaignData.targetGender || 'all',
      ageRange: campaignData.ageRange || [18, 65],
      adFormat: (campaignData as any).adFormat || 'single',
      callToAction: (campaignData as any).callToAction || 'learn_more',
      adLinkUrl: (campaignData as any).adLinkUrl || (businessContext?.websiteUrl || ''),
      heading: (campaignData as any).heading || 'Quick Launch Headline',
      primaryText: (campaignData as any).primaryText || 'This campaign was auto-built. Tweak and launch!'
    } as any);
  };

  const handleAutoApplyAllSuggestions = async (s?: import('@/types/ai-campaign').AICampaignSuggestions) => {
    const sug = s || suggestions;

    // STEP 1: Campaign Setup - Apply USER inputs directly
    if (businessContext?.campaignGoal) {
      const goalToObjectiveMap: Record<string, string> = {
        'brand awareness': 'awareness',
        'lead generation': 'leads',
        'website traffic': 'traffic',
        'conversions': 'sales',
        'app installs': 'app_promotion',
        'engagement': 'engagement',
        'store visits': 'reach'
      };
      const goalLc = (businessContext.campaignGoal || '').toLowerCase();
      updateCampaignData({ objective: goalToObjectiveMap[goalLc] || 'awareness' });
    }
    
    if (businessContext?.budgetRange) {
      const match = businessContext.budgetRange.match(/[\d,.]+/);
      const amount = match ? Number(match[0].replace(/,/g, '')) : undefined;
      updateCampaignData({
        budgetAmount: amount && !isNaN(amount) ? amount : (campaignData.budgetAmount || 100),
        budgetType: 'daily'
      });
    }
    
    if (businessContext?.websiteUrl) {
      updateCampaignData({ adLinkUrl: businessContext.websiteUrl });
    }

    // STEP 2: Target Audience - Apply AI suggestions
    if (sug?.targetAudience) {
      const { targetAudience } = sug;
      if (targetAudience.demographics) {
        if (targetAudience.demographics.ageRange) {
          handleApplyAISuggestion('ageRange', targetAudience.demographics.ageRange);
        }
        if (targetAudience.demographics.gender) {
          handleApplyAISuggestion('targetGender', targetAudience.demographics.gender);
        }
      }
      if (targetAudience.locations?.length) {
        handleApplyAISuggestion('targetLocations', targetAudience.locations.map(loc => loc.name));
      }
      if (targetAudience.interests?.length) {
        handleApplyAISuggestion('targetInterests', targetAudience.interests);
      }
    }

    // STEP 3: Ad Content - Apply AI suggestions
    if (sug?.adContent) {
      const { adContent } = sug;
      if (adContent.headlines?.length) handleApplyAISuggestion('heading', adContent.headlines[0].text);
      if (adContent.descriptions?.length) handleApplyAISuggestion('description', adContent.descriptions[0].text);
      if (adContent.primaryText?.length) handleApplyAISuggestion('primaryText', adContent.primaryText[0]);
      if (adContent.callToAction?.length) handleApplyAISuggestion('callToAction', adContent.callToAction[0]);
    }
    
    // Fill remaining required fields with defaults without overriding previously applied values
    setCampaignData(prev => ({
      ...prev,
      adAccount: prev.adAccount || 'account1',
      campaignName: prev.campaignName || `${businessContext?.campaignGoal || 'Quick Launch'} Campaign`,
      bidStrategy: prev.bidStrategy || 'lowest_cost',
      facebookPage: prev.facebookPage || 'page1',
      adFormat: (prev as any).adFormat || 'single',
      callToAction: (prev as any).callToAction || 'learn_more',
      heading: (prev as any).heading || 'Quick Launch Headline',
      primaryText: (prev as any).primaryText || 'This campaign was auto-built. Tweak and launch!'
    } as any));

    // Jump to step 3
    setCurrentStep(3);
    setTimeout(() => setCurrentStep(3), 0);
    toast.success('🎉 Campaign auto-built! Review and launch when ready.');
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
        'Lead Generation - Lead Ads': 'leads',
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
      },
      targetGender: {
        'Male': 'male',
        'Female': 'female',
        'All': 'all'
      },
      callToAction: {
        'Learn More': 'learn_more',
        'Sign Up': 'sign_up',
        'Get Offer': 'get_offer',
        'Shop Now': 'shop_now',
        'Download': 'download',
        'Contact Us': 'contact_us',
        'Book Now': 'book_now',
        'Apply Now': 'apply_now'
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
      // Try partial match for compound values like "Lead Generation - Lead Ads"
      for (const [key, val] of Object.entries(fieldMappings)) {
        if (aiValue.includes(key) || key.includes(aiValue)) {
          return val;
        }
      }
    }
    
    return aiValue;
  };

  const handleApplyAISuggestion = (field: string, value: any) => {
    console.log('AI suggestion apply:', field, value);
    
    if (field === 'targetLocations' && Array.isArray(value)) {
      const currentLocations = campaignData.targetLocations || [];
      const newLocations = value.filter(loc => !currentLocations.includes(loc));
      if (newLocations.length > 0) {
        updateCampaignData({ targetLocations: [...currentLocations, ...newLocations] });
        toast.success(`Added ${newLocations.length} location(s)`);
      } else {
        toast.info('Locations already added');
      }
    } else if (field === 'targetLocations') {
      const currentLocations = campaignData.targetLocations || [];
      if (!currentLocations.includes(value)) {
        updateCampaignData({ targetLocations: [...currentLocations, value] });
        toast.success(`Added ${value} to locations`);
      } else {
        toast.info('Location already added');
      }
    } else if (field === 'targetInterests' && Array.isArray(value)) {
      const currentInterests = campaignData.targetInterests || [];
      const newInterests = value.filter(int => !currentInterests.includes(int));
      if (newInterests.length > 0) {
        updateCampaignData({ targetInterests: [...currentInterests, ...newInterests] });
        toast.success(`Added ${newInterests.length} interest(s)`);
      } else {
        toast.info('Interests already added');
      }
    } else if (field === 'targetInterests') {
      const currentInterests = campaignData.targetInterests || [];
      if (!currentInterests.includes(value)) {
        updateCampaignData({ targetInterests: [...currentInterests, value] });
        toast.success(`Added "${value}" to interests`);
      } else {
        toast.info('Interest already added');
      }
    } else if (field === 'ageRange') {
      let min: number | undefined;
      let max: number | undefined;
      if (Array.isArray(value)) {
        min = Number(value[0]);
        max = Number(value[1]);
      } else if (typeof value === 'object' && value) {
        const v: any = value;
        min = Number(v.min ?? v.from ?? v.start);
        max = Number(v.max ?? v.to ?? v.end);
      } else if (typeof value === 'string') {
        const m = value.match(/(\d{1,2})\D+(\d{1,2})/);
        if (m) {
          min = Number(m[1]);
          max = Number(m[2]);
        }
      }
      if (typeof min === 'number' && !isNaN(min) && typeof max === 'number' && !isNaN(max)) {
        const clamped: [number, number] = [
          Math.max(18, Math.min(65, Math.min(min, max))),
          Math.max(18, Math.min(65, Math.max(min, max)))
        ];
        updateCampaignData({ ageRange: clamped });
        toast.success('Age range updated');
      } else {
        console.warn('Invalid ageRange suggestion:', value);
      }
    } else {
      const mappedValue = typeof value === 'string' ? mapAIValueToDropdown(field, value) : value;
      console.log('Mapped value:', field, mappedValue);
      updateCampaignData({ [field]: mappedValue });
      toast.success(`${field.replace(/([A-Z])/g, ' $1').trim()} updated`);
    }
  };

  const handleSaveDraft = async () => {
    const metadata = { 
      ...campaignData, 
      _currentStep: currentStep,
      _aiContext: businessContext,
      _aiSuggestions: suggestions
    } as CampaignData;
    if (currentCampaignId) {
      await updateCampaign(currentCampaignId, metadata);
    } else {
      const id = await saveCampaign(metadata);
      if (id) {
        setCurrentCampaignId(id);
      }
    }
    // Force refresh campaigns list
    refetch();
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

  const calculateSuggestionCount = () => {
    if (!suggestions) return 0;
    let count = 0;
    
    if (currentStep === 2 && suggestions.targetAudience) {
      // Count audience suggestions
      if (suggestions.targetAudience.demographics) count += 2; // age + gender
      if (suggestions.targetAudience.locations) count += suggestions.targetAudience.locations.length;
      if (suggestions.targetAudience.interests) count += suggestions.targetAudience.interests.length;
    } else if (currentStep === 3 && suggestions.adContent) {
      // Count content suggestions
      if (suggestions.adContent.headlines) count += suggestions.adContent.headlines.length;
      if (suggestions.adContent.descriptions) count += suggestions.adContent.descriptions.length;
      if (suggestions.adContent.primaryText) count += suggestions.adContent.primaryText.length;
      if (suggestions.adContent.callToAction) count += suggestions.adContent.callToAction.length;
    }
    
    return Math.min(count, 9); // Cap at 9 for display
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
            onSaveDraft={handleSaveDraft}
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
            onSaveDraft={handleSaveDraft}
            aiSuggestions={suggestions}
          />
        );
      case 3:
        return (
          <AdContentStep
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
        <div className="w-full">
          {renderCurrentStep()}
        </div>
      </div>

      {aiEnabled && suggestions && (
        <FloatingAIDrawer
          isOpen={isAIDrawerOpen}
          onOpenChange={setIsAIDrawerOpen}
          suggestions={suggestions}
          currentStep={currentStep}
          onApplySuggestion={handleApplyAISuggestion}
          businessContext={businessContext}
          suggestionCount={calculateSuggestionCount()}
        />
      )}

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
