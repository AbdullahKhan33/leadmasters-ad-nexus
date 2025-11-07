import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Clock, Facebook, Instagram, Linkedin, ArrowRight } from "lucide-react";
import { useFacebookCampaigns } from "@/hooks/useFacebookCampaigns";
import { useInstagramCampaigns } from "@/hooks/useInstagramCampaigns";
import { useLinkedInCampaigns } from "@/hooks/useLinkedInCampaigns";
import { useGoogleCampaigns } from "@/hooks/useGoogleCampaigns";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const platformIcons = {
  facebook: Facebook,
  instagram: Instagram,
  linkedin: Linkedin,
  google: FileText,
};

const platformColors = {
  facebook: "bg-blue-500/10 text-blue-600 border-blue-200",
  instagram: "bg-pink-500/10 text-pink-600 border-pink-200",
  linkedin: "bg-blue-700/10 text-blue-700 border-blue-300",
  google: "bg-green-500/10 text-green-600 border-green-200",
};

export function DraftCampaignsSection() {
  const navigate = useNavigate();
  const [expandedView, setExpandedView] = useState(false);
  
  const { campaigns: fbCampaigns, isLoading: fbLoading } = useFacebookCampaigns();
  const { campaigns: igCampaigns, isLoading: igLoading } = useInstagramCampaigns();
  const { campaigns: liCampaigns, isLoading: liLoading } = useLinkedInCampaigns();
  const { campaigns: gCampaigns, isLoading: gLoading } = useGoogleCampaigns();

  const allDrafts = [
    ...fbCampaigns.filter(c => c.status === 'draft').map(c => ({ ...c, platform: 'facebook' as const })),
    ...igCampaigns.filter(c => c.status === 'draft').map(c => ({ ...c, platform: 'instagram' as const })),
    ...liCampaigns.filter(c => c.status === 'draft').map(c => ({ ...c, platform: 'linkedin' as const })),
    ...gCampaigns.filter(c => c.status === 'draft').map(c => ({ ...c, platform: 'google' as const })),
  ].sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());

  const displayedDrafts = expandedView ? allDrafts : allDrafts.slice(0, 3);
  const isLoading = fbLoading || igLoading || liLoading || gLoading;

  if (isLoading) {
    return (
      <Card className="border-2 border-amber-200 bg-amber-50/30">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-amber-900 flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Draft Campaigns
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Loading drafts...</p>
        </CardContent>
      </Card>
    );
  }

  if (allDrafts.length === 0) {
    return null;
  }

  return (
    <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-amber-500/10 via-amber-400/5 to-background shadow-xl">
      {/* Premium gradient border effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 via-orange-400/20 to-amber-400/20 rounded-lg opacity-50" />
      
      <CardHeader className="relative pb-4 border-b border-amber-200/50">
        <CardTitle className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 text-white shadow-lg">
            <FileText className="w-5 h-5" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-amber-700 via-orange-600 to-amber-700 bg-clip-text text-transparent">
            Draft Campaigns
          </span>
          <Badge variant="secondary" className="ml-auto bg-amber-100 text-amber-900 border border-amber-200">
            {allDrafts.length} {allDrafts.length === 1 ? 'Draft' : 'Drafts'}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="relative space-y-3 pt-4">
        {displayedDrafts.map((draft) => {
          const Icon = platformIcons[draft.platform];
          const colorClass = platformColors[draft.platform];
          
          return (
            <div
              key={`${draft.platform}-${draft.id}`}
              className="group relative bg-background/80 backdrop-blur-sm p-4 rounded-xl border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300"
            >
              {/* Hover glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
              
              <div className="relative flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`p-2 rounded-lg ${colorClass} border shadow-sm`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <h4 className="font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                      {draft.name}
                    </h4>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Last edited: {new Date(draft.updated_at).toLocaleDateString()}</span>
                  </div>
                </div>
                <Button
                  size="sm"
                  onClick={() => navigate("/", { state: { view: "ad-builder", platform: draft.platform } })}
                  className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary hover:to-primary/90 text-primary-foreground shadow-md hover:shadow-lg transition-all duration-300"
                >
                  Continue
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5 transition-transform" />
                </Button>
              </div>
            </div>
          );
        })}
        
        {allDrafts.length > 3 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setExpandedView(!expandedView)}
            className="w-full text-amber-700 hover:text-amber-800 hover:bg-amber-50 border border-amber-200/50 hover:border-amber-300 transition-all"
          >
            {expandedView ? 'Show Less' : `View All ${allDrafts.length} Drafts`}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
