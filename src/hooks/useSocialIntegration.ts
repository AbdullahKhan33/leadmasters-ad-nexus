import { useState, useEffect } from 'react';

interface ConnectedAccount {
  id: string;
  platform: string;
  email: string;
}

// Mock connected accounts - in a real app, this would come from an API or context
// Currently only Google and some others are connected to demonstrate the popup functionality
const mockConnectedAccounts: ConnectedAccount[] = [
  {
    id: "google_1",
    platform: "Google",
    email: "marketing@leadmasters.ai"
  }
  // Facebook, Instagram, Twitter, LinkedIn, and Threads are intentionally not included
  // so the integration popups will show when users try to post
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

  const isThreadsConnected = () => {
    return connectedAccounts.some(account => account.platform.toLowerCase() === 'threads');
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
    isThreadsConnected,
    isPlatformConnected
  };
}