import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Clock, Facebook, Instagram, Linkedin, ArrowRight, Zap } from "lucide-react";
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
  google: Zap,
};

const platformColors = {
  facebook: "bg-blue-50 text-blue-600 border-blue-100",
  instagram: "bg-pink-50 text-pink-600 border-pink-100",
  linkedin: "bg-blue-50 text-blue-700 border-blue-100",
  google: "bg-green-50 text-green-600 border-green-100",
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
      <Card className="border border-amber-200 bg-amber-50/50">
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
    <Card className="border border-amber-200 bg-amber-50/50">
      <CardHeader className="border-b border-amber-200/50 pb-4">
        <CardTitle className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-amber-100">
            <FileText className="w-5 h-5 text-amber-700" />
          </div>
          <span className="text-xl font-bold text-amber-900">
            Draft Campaigns
          </span>
          <Badge variant="secondary" className="ml-auto bg-amber-100 text-amber-900 border border-amber-200">
            {allDrafts.length} {allDrafts.length === 1 ? 'Draft' : 'Drafts'}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 pt-4">
        {displayedDrafts.map((draft) => {
          const Icon = platformIcons[draft.platform];
          const colorClass = platformColors[draft.platform];
          
          return (
            <div
              key={`${draft.platform}-${draft.id}`}
              className="group bg-background p-4 rounded-xl border border-border hover:border-primary/50 hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`p-1.5 rounded ${colorClass} border`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <h4 className="font-semibold text-foreground truncate">
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
                  className="bg-primary hover:bg-primary/90 text-primary-foreground group"
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
            variant="outline"
            size="sm"
            onClick={() => setExpandedView(!expandedView)}
            className="w-full border-amber-200 text-amber-700 hover:bg-amber-50"
          >
            {expandedView ? 'Show Less' : `View All ${allDrafts.length} Drafts`}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
