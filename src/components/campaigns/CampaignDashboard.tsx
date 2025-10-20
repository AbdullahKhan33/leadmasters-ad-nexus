import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Mail, MessageSquare, Plus, Search, FolderPlus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useCampaigns } from "@/hooks/useCampaigns";
import { useCampaignFolders } from "@/hooks/useCampaignFolders";
import { CampaignList } from "./CampaignList";
import { CampaignDetailedView } from "./CampaignDetailedView";
import { FolderSection } from "./FolderSection";
import { CreateFolderDialog } from "./CreateFolderDialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CampaignStatus, CampaignFolder } from "@/types/campaigns";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export function CampaignDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const campaignType = "email"; // CRM only handles email campaigns
  
  const { campaigns, isLoading, duplicateCampaign, deleteCampaign, updateCampaign, refetch } = useCampaigns(campaignType);
  const { folders, createFolder, updateFolder, deleteFolder } = useCampaignFolders(campaignType);

  // Refetch campaigns if needed
  useEffect(() => {
    const state = location.state as { refetch?: boolean };
    if (state?.refetch) {
      refetch();
      window.history.replaceState({}, document.title);
    }
  }, [location.state, refetch]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<CampaignStatus | "all">("all");
  const [selectedCampaignId, setSelectedCampaignId] = useState<string | null>(null);
  const [createFolderOpen, setCreateFolderOpen] = useState(false);
  const [editingFolder, setEditingFolder] = useState<CampaignFolder | null>(null);

  const filteredCampaigns = campaigns.filter((campaign) => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || campaign.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleViewAnalytics = (id: string) => {
    setSelectedCampaignId(id);
  };

  const handleCreateCampaign = () => {
    navigate(`/app/campaigns/create?type=${campaignType}`);
  };

  const handleCreateFolder = async (name: string, color: string) => {
    await createFolder(name, color, campaignType);
  };

  const handleMoveCampaign = async (campaignId: string, folderId: string | null) => {
    await updateCampaign(campaignId, { folder_id: folderId });
    toast({
      title: "Success",
      description: "Campaign moved successfully",
    });
  };

  const handleDeleteFolder = async (folderId: string) => {
    await deleteFolder(folderId);
  };

  // Group campaigns by folder
  const campaignsByFolder = filteredCampaigns.reduce((acc, campaign) => {
    const key = campaign.folder_id || 'uncategorized';
    if (!acc[key]) acc[key] = [];
    acc[key].push(campaign);
    return acc;
  }, {} as Record<string, typeof filteredCampaigns>);

  // If a campaign is selected, show detailed analytics view
  if (selectedCampaignId) {
    const campaign = campaigns.find(c => c.id === selectedCampaignId);
    if (campaign) {
      return <CampaignDetailedView campaign={campaign} onBack={() => setSelectedCampaignId(null)} />;
    }
  }

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/60 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
              Campaign Management
            </h2>
            <p className="text-sm text-muted-foreground">Create and manage your email campaigns</p>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={() => setCreateFolderOpen(true)}
              className="border-purple-200 text-purple-700 hover:bg-purple-50"
            >
              <FolderPlus className="w-4 h-4 mr-2" />
              New Folder
            </Button>
            <Button 
              className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 hover:from-blue-700 hover:via-purple-700 hover:to-pink-600 text-white shadow-lg" 
              onClick={handleCreateCampaign}
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Campaign
            </Button>
          </div>
        </div>
      </div>

      {/* WhatsApp Campaigns Banner */}
      <div className="bg-gradient-to-r from-green-50 via-emerald-50 to-teal-50 border-b border-green-200/50 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <MessageSquare className="w-5 h-5 text-green-600" />
            <div>
              <p className="text-sm font-semibold text-green-900">Looking for WhatsApp campaigns?</p>
              <p className="text-xs text-green-700">WhatsApp campaigns are now managed in Campaign Hub</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/app', { state: { view: 'ad-builder', platform: 'whatsapp' } })}
            className="border-green-300 text-green-700 hover:bg-green-100"
          >
            Go to Campaign Hub
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white/60 backdrop-blur-sm border-b border-gray-200/50 px-6 py-3">
        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search campaigns..." 
              className="pl-10 bg-white/80 border-gray-200/80"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as CampaignStatus | "all")}>
            <SelectTrigger className="w-[180px] bg-white/80 border-gray-200/80">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="scheduled">Scheduled</SelectItem>
              <SelectItem value="sending">Sending</SelectItem>
              <SelectItem value="sent">Sent</SelectItem>
              <SelectItem value="paused">Paused</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-auto p-6">
        {filteredCampaigns.length > 0 || folders.length > 0 ? (
          <div className="space-y-1">
            {/* Render folders with their campaigns */}
            {folders.map((folder) => {
              const folderCampaigns = campaignsByFolder[folder.id] || [];
              
              return (
                <FolderSection
                  key={folder.id}
                  folder={folder}
                  campaigns={folderCampaigns}
                  onDuplicate={duplicateCampaign}
                  onDelete={deleteCampaign}
                  onViewAnalytics={handleViewAnalytics}
                  onEditFolder={setEditingFolder}
                  onDeleteFolder={handleDeleteFolder}
                  onMoveCampaign={handleMoveCampaign}
                  availableFolders={folders}
                />
              );
            })}

            {/* Render uncategorized campaigns */}
            {campaignsByFolder['uncategorized']?.length > 0 && (
              <FolderSection
                folder={null}
                campaigns={campaignsByFolder['uncategorized']}
                onDuplicate={duplicateCampaign}
                onDelete={deleteCampaign}
                onViewAnalytics={handleViewAnalytics}
                onMoveCampaign={handleMoveCampaign}
                availableFolders={folders}
              />
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center py-12">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/60 shadow-lg max-w-md">
              <Mail className="w-16 h-16 mx-auto mb-4 text-purple-600" />
              <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
                No Email Campaigns Yet
              </h3>
              <p className="text-muted-foreground mb-6">
                Create your first email campaign to reach your segments with personalized messages and track engagement.
              </p>
              <Button onClick={handleCreateCampaign} className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 hover:from-blue-700 hover:via-purple-700 hover:to-pink-600 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Create Email Campaign
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Create Folder Dialog */}
      <CreateFolderDialog
        open={createFolderOpen}
        onOpenChange={setCreateFolderOpen}
        onCreateFolder={handleCreateFolder}
      />
    </div>
  );
}
