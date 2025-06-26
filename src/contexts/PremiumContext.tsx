
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface PremiumFeatures {
  aiLeadScoring: boolean;
  aiSuggestedTemplates: boolean;
  smartWhatsAppDrips: boolean;
  postSaleReviewFlows: boolean;
}

interface PremiumContextType {
  isPremium: boolean;
  setIsPremium: (premium: boolean) => void;
  premiumFeatures: PremiumFeatures;
  setPremiumFeatures: (features: Partial<PremiumFeatures>) => void;
  togglePremiumFeature: (feature: keyof PremiumFeatures) => void;
}

const PremiumContext = createContext<PremiumContextType | undefined>(undefined);

export function PremiumProvider({ children }: { children: ReactNode }) {
  const [isPremium, setIsPremium] = useState(false); // Default to free user for testing
  const [premiumFeatures, setPremiumFeaturesState] = useState<PremiumFeatures>({
    aiLeadScoring: true,
    aiSuggestedTemplates: true,
    smartWhatsAppDrips: true,
    postSaleReviewFlows: true,
  });

  const setPremiumFeatures = (features: Partial<PremiumFeatures>) => {
    setPremiumFeaturesState(prev => ({ ...prev, ...features }));
  };

  const togglePremiumFeature = (feature: keyof PremiumFeatures) => {
    setPremiumFeaturesState(prev => ({
      ...prev,
      [feature]: !prev[feature]
    }));
  };

  const value = {
    isPremium,
    setIsPremium,
    premiumFeatures,
    setPremiumFeatures,
    togglePremiumFeature,
  };

  return (
    <PremiumContext.Provider value={value}>
      {children}
    </PremiumContext.Provider>
  );
}

export function usePremium() {
  const context = useContext(PremiumContext);
  if (context === undefined) {
    throw new Error('usePremium must be used within a PremiumProvider');
  }
  return context;
}

export type { PremiumFeatures };
