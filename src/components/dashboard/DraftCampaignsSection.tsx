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

const platformGradients = {
  facebook: "from-blue-500 to-blue-600",
  instagram: "from-pink-500 via-purple-500 to-orange-500",
  linkedin: "from-blue-600 to-blue-700",
  google: "from-green-500 via-yellow-500 to-red-500",
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
      <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-amber-500/10 via-orange-400/5 to-background shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 via-orange-400/20 to-amber-400/20 rounded-lg opacity-30 animate-pulse" />
        <CardHeader>
          <CardTitle className="text-xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
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
    <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-amber-500/10 via-orange-400/5 to-background shadow-2xl">
      {/* Premium gradient border effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-amber-400/30 via-orange-400/30 to-amber-400/30 rounded-xl opacity-40" />
      
      {/* Animated gradient orb */}
      <div className="absolute -top-20 right-1/3 w-60 h-60 bg-gradient-to-br from-amber-500/30 to-orange-500/30 rounded-full blur-3xl animate-pulse-slow" />
      
      <CardHeader className="relative pb-4 border-b border-border/50">
        <CardTitle className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 text-white shadow-xl">
            <FileText className="w-6 h-6" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-amber-600 via-orange-600 to-amber-600 bg-clip-text text-transparent">
            Draft Campaigns
          </span>
          <Badge variant="secondary" className="ml-auto bg-gradient-to-r from-amber-100 to-orange-100 text-amber-900 border-2 border-amber-300 font-bold px-3 py-1">
            {allDrafts.length} {allDrafts.length === 1 ? 'Draft' : 'Drafts'}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="relative space-y-4 pt-6">
        {displayedDrafts.map((draft) => {
          const Icon = platformIcons[draft.platform];
          const gradient = platformGradients[draft.platform];
          
          return (
            <div
              key={`${draft.platform}-${draft.id}`}
              className="group relative bg-background/80 backdrop-blur-sm p-5 rounded-2xl border-2 border-border/50 hover:border-primary/50 hover:shadow-xl transition-all duration-500"
            >
              {/* Hover glow effect */}
              <div className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-500`} />
              
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-2xl" />
              
              <div className="relative flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`p-2.5 rounded-xl bg-gradient-to-br ${gradient} border-2 border-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <h4 className="font-bold text-lg text-foreground truncate group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-secondary group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                      {draft.name}
                    </h4>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>Last edited: {new Date(draft.updated_at).toLocaleDateString()}</span>
                  </div>
                </div>
                <Button
                  size="lg"
                  onClick={() => navigate("/", { state: { view: "ad-builder", platform: draft.platform } })}
                  className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 px-6 group"
                >
                  Continue
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          );
        })}
        
        {allDrafts.length > 3 && (
          <Button
            variant="outline"
            size="lg"
            onClick={() => setExpandedView(!expandedView)}
            className="w-full border-2 border-amber-300 hover:border-amber-400 text-amber-700 hover:text-amber-800 hover:bg-gradient-to-r hover:from-amber-50 hover:to-orange-50 transition-all duration-300 font-semibold"
          >
            {expandedView ? 'Show Less' : `View All ${allDrafts.length} Drafts`}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
