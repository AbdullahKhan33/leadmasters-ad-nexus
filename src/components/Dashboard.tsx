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
      <div className="p-4 lg:p-6 space-y-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Campaign Launchpad</h1>
          <p className="text-muted-foreground">
            Create, manage, and optimize your marketing campaigns all in one place
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
