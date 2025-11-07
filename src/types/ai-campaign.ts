export interface AIBusinessContext {
  industry: string;
  businessType: string;
  targetCountries: string[];
  targetCities?: string;
  campaignGoal: string;
  budgetRange?: string;
  currency: string;
  platform: 'facebook' | 'instagram' | 'google' | 'linkedin';
  websiteUrl?: string;
}

export interface AICampaignSuggestions {
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
