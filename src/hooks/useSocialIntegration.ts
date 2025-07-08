import { useState, useEffect } from 'react';

interface ConnectedAccount {
  id: string;
  platform: string;
  email: string;
}

// Mock connected accounts - in a real app, this would come from an API or context
const mockConnectedAccounts: ConnectedAccount[] = [
  {
    id: "facebook_1",
    platform: "Facebook",
    email: "business@leadmasters.ai"
  },
  {
    id: "linkedin_1",
    platform: "LinkedIn",
    email: "team@leadmasters.ai"
  },
  {
    id: "google_1",
    platform: "Google",
    email: "marketing@leadmasters.ai"
  },
  {
    id: "threads_1",
    platform: "Threads",
    email: "@leadmasters_official"
  }
];

export function useSocialIntegration() {
  const [connectedAccounts, setConnectedAccounts] = useState<ConnectedAccount[]>(mockConnectedAccounts);

  const isInstagramConnected = () => {
    return connectedAccounts.some(account => account.platform.toLowerCase() === 'instagram');
  };

  const isFacebookConnected = () => {
    return connectedAccounts.some(account => account.platform.toLowerCase() === 'facebook');
  };

  const isTwitterConnected = () => {
    return connectedAccounts.some(account => account.platform.toLowerCase() === 'twitter');
  };

  const isLinkedInConnected = () => {
    return connectedAccounts.some(account => account.platform.toLowerCase() === 'linkedin');
  };

  const isPlatformConnected = (platform: string) => {
    return connectedAccounts.some(account => account.platform.toLowerCase() === platform.toLowerCase());
  };

  return {
    connectedAccounts,
    isInstagramConnected,
    isFacebookConnected,
    isTwitterConnected,
    isLinkedInConnected,
    isPlatformConnected
  };
}