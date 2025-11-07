import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { PricingScreen } from "./PricingScreen";
import {
  CampaignHeroTiles,
  DraftCampaignsSection,
  QuickAccessGrid,
  CampaignAnalyticsOverview
} from "./dashboard";

export function Dashboard() {
  const { user } = useAuth();
  const [showPricing, setShowPricing] = useState(false);

  if (showPricing) {
    return <PricingScreen onClose={() => setShowPricing(false)} />;
  }

  return (
    <div className="flex-1 overflow-y-auto bg-gradient-to-br from-primary/5 via-background to-secondary/5 min-h-screen">
      {/* Animated gradient orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute -bottom-40 right-1/3 w-96 h-96 bg-accent/15 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      <div className="relative p-4 lg:p-8 space-y-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="space-y-3 text-center lg:text-left">
          <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-gradient">
            Campaign Launchpad
          </h1>
          <p className="text-muted-foreground text-lg">
            Create, manage, and optimize your marketing campaigns with AI-powered tools
          </p>
        </div>

        {/* Hero Tiles - Create Ad Campaign & Create Social Post */}
        <CampaignHeroTiles />

        {/* Draft Campaigns Section */}
        <DraftCampaignsSection />

        {/* Quick Access Grid */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Quick Access
          </h2>
          <QuickAccessGrid />
        </div>

        {/* Campaign Analytics Overview */}
        <CampaignAnalyticsOverview />
      </div>
    </div>
  );
}
