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
    <div className="flex-1 overflow-y-auto bg-background">
      <div className="relative p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
            Campaign Launchpad
          </h1>
          <p className="text-muted-foreground text-base">
            Create, manage, and optimize your marketing campaigns with AI-powered tools
          </p>
        </div>

        {/* Hero Tiles */}
        <CampaignHeroTiles />

        {/* Draft Campaigns */}
        <DraftCampaignsSection />

        {/* Quick Access Grid */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Quick Access</h2>
          <QuickAccessGrid />
        </div>

        {/* Campaign Analytics */}
        <CampaignAnalyticsOverview />
      </div>
    </div>
  );
}
