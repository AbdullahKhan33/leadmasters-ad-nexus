import { Campaign } from "@/types/campaigns";
import { CampaignCard } from "./CampaignCard";
import { Loader2 } from "lucide-react";

interface CampaignListProps {
  campaigns: Campaign[];
  isLoading: boolean;
  onDuplicate: (id: string) => void;
  onDelete: (id: string) => void;
  onViewAnalytics: (id: string) => void;
}

export function CampaignList({ campaigns, isLoading, onDuplicate, onDelete, onViewAnalytics }: CampaignListProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
      </div>
    );
  }

  if (campaigns.length === 0) {
    return null; // Empty state is handled by parent component
  }

  return (
    <div className="grid gap-4">
      {campaigns.map((campaign) => (
        <CampaignCard
          key={campaign.id}
          campaign={campaign}
          onDuplicate={onDuplicate}
          onDelete={onDelete}
          onViewAnalytics={onViewAnalytics}
        />
      ))}
    </div>
  );
}
