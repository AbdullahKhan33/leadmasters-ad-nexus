import { useState } from "react";
import { Campaign, CampaignFolder } from "@/types/campaigns";
import { ChevronDown, ChevronRight, Folder, MoreVertical, Edit2, Trash2 } from "lucide-react";
import { CampaignCard } from "./CampaignCard";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface FolderSectionProps {
  folder: CampaignFolder | null;
  campaigns: Campaign[];
  onDuplicate: (id: string) => void;
  onDelete: (id: string) => void;
  onViewAnalytics: (id: string) => void;
  onEditFolder?: (folder: CampaignFolder) => void;
  onDeleteFolder?: (folderId: string) => void;
  onMoveCampaign?: (campaignId: string, targetFolderId: string | null) => void;
  availableFolders?: CampaignFolder[];
}

export function FolderSection({
  folder,
  campaigns,
  onDuplicate,
  onDelete,
  onViewAnalytics,
  onEditFolder,
  onDeleteFolder,
  onMoveCampaign,
  availableFolders = [],
}: FolderSectionProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  const handleMoveCampaign = (campaignId: string, targetFolderId: string | null) => {
    if (onMoveCampaign) {
      onMoveCampaign(campaignId, targetFolderId);
    }
  };

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3 group">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 hover:bg-white/50 rounded-lg px-2 py-1.5 transition-colors"
        >
          {isExpanded ? (
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          ) : (
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          )}
          <Folder
            className="w-5 h-5"
            style={{ color: folder?.color || "#6B7280" }}
          />
          <span className="font-semibold text-gray-900">
            {folder?.name || "Uncategorized"}
          </span>
          <span className="text-sm text-muted-foreground">
            ({campaigns.length})
          </span>
        </button>

        {folder && onEditFolder && onDeleteFolder && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEditFolder(folder)}>
                <Edit2 className="w-4 h-4 mr-2" />
                Edit Folder
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onDeleteFolder(folder.id)}
                className="text-destructive"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Folder
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      {isExpanded && (
        <div className="space-y-3 pl-7">
          {campaigns.map((campaign) => (
            <CampaignCard
              key={campaign.id}
              campaign={campaign}
              onDuplicate={onDuplicate}
              onDelete={onDelete}
              onViewAnalytics={onViewAnalytics}
              onMoveToFolder={
                onMoveCampaign
                  ? (targetFolderId) => handleMoveCampaign(campaign.id, targetFolderId)
                  : undefined
              }
              availableFolders={availableFolders}
              currentFolderId={folder?.id || null}
            />
          ))}
        </div>
      )}
    </div>
  );
}
