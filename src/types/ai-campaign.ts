export interface AIBusinessContext {
  industry: string;
  businessType: string;
  targetMarket: string;
  campaignGoal: string;
  budgetRange?: string;
  platform: 'facebook' | 'instagram' | 'google' | 'linkedin';
}

export interface AICampaignSuggestions {
  campaignSetup: {
    objective: string;
    recommendedBudget: { min: number; max: number; reasoning: string };
    bidStrategy: string;
    tips: string[];
  };
  targetAudience: {
    demographics: {
      ageRange: [number, number];
      gender: string;
      reasoning: string;
    };
    locations: { name: string; reasoning: string }[];
    interests?: string[];
    jobTitles?: string[];
    industries?: string[];
    keywords?: string[];
  };
  adContent: {
    headlines: { text: string; confidence: 'high' | 'medium' }[];
    descriptions: { text: string; confidence: 'high' | 'medium' }[];
    primaryText: string[];
    callToAction: string[];
    visualSuggestions: string[];
  };
}
