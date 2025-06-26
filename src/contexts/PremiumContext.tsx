
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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
  // Load premium status from localStorage or default to false
  const [isPremium, setIsPremiumState] = useState(() => {
    const saved = localStorage.getItem('isPremium');
    return saved ? JSON.parse(saved) : false;
  });

  // Load premium features from localStorage or default values
  const [premiumFeatures, setPremiumFeaturesState] = useState<PremiumFeatures>(() => {
    const saved = localStorage.getItem('premiumFeatures');
    return saved ? JSON.parse(saved) : {
      aiLeadScoring: true,
      aiSuggestedTemplates: true,
      smartWhatsAppDrips: true,
      postSaleReviewFlows: true,
    };
  });

  // Persist premium status to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('isPremium', JSON.stringify(isPremium));
  }, [isPremium]);

  // Persist premium features to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('premiumFeatures', JSON.stringify(premiumFeatures));
  }, [premiumFeatures]);

  const setIsPremium = (premium: boolean) => {
    setIsPremiumState(premium);
  };

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
