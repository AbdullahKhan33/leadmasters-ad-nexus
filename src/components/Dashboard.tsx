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
    <div className="flex-1 overflow-y-auto bg-gradient-to-br from-background via-primary/5 to-secondary/5">
      <div className="p-4 lg:p-8 space-y-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="space-y-3">
          <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary via-primary/90 to-secondary bg-clip-text text-transparent">
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
        <div className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">Quick Access</h2>
          <QuickAccessGrid />
        </div>

        {/* Campaign Analytics Overview */}
        <CampaignAnalyticsOverview />
      </div>
    </div>
  );
}
