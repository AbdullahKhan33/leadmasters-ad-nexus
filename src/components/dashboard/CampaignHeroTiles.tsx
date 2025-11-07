import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Megaphone, PenTool, Sparkles, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function CampaignHeroTiles() {
  const navigate = useNavigate();
  
  const handleAdPlatformClick = (platform: string) => {
    navigate("/app", { state: { view: "ad-builder", platform }, replace: true });
  };
  
  const handlePostBuilderClick = () => {
    navigate("/app", { state: { view: "post-builder" }, replace: true });
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Create Ad Campaign */}
      <Card className="group relative overflow-hidden border border-border bg-card hover:border-primary/50 hover:shadow-xl transition-all duration-300">
        <CardContent className="p-8 lg:p-10 flex flex-col space-y-6">
          {/* Icon */}
          <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10 group-hover:bg-primary/15 transition-colors">
            <Megaphone className="w-10 h-10 text-primary" />
          </div>
          
          {/* Content */}
          <div className="space-y-3">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">
              Create Ad Campaign
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Launch targeted advertising campaigns with AI-powered optimization across major platforms
            </p>
          </div>

          {/* Platform buttons */}
          <div className="flex flex-wrap gap-2">
            {[
              { name: "Facebook", platform: "facebook" },
              { name: "Instagram", platform: "instagram" },
              { name: "Google", platform: "google" },
              { name: "LinkedIn", platform: "linkedin" }
            ].map((item) => (
              <Button
                key={item.platform}
                onClick={() => handleAdPlatformClick(item.platform)}
                variant="outline"
                size="sm"
                className="text-sm"
              >
                {item.name}
              </Button>
            ))}
          </div>

          {/* Main CTA */}
          <Button
            onClick={() => navigate("/app", { state: { view: "ad-builder" }, replace: true })}
            size="lg"
            className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold group"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Start Ad Campaign
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </CardContent>
      </Card>

      {/* Create Social Post */}
      <Card className="group relative overflow-hidden border border-border bg-card hover:border-primary/50 hover:shadow-xl transition-all duration-300">
        <CardContent className="p-8 lg:p-10 flex flex-col space-y-6">
          {/* Icon */}
          <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10 group-hover:bg-primary/15 transition-colors">
            <PenTool className="w-10 h-10 text-primary" />
          </div>
          
          {/* Content */}
          <div className="space-y-3">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">
              Create Social Post
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Design and publish engaging content across multiple platforms with AI-generated copy
            </p>
          </div>

          {/* Quick action buttons */}
          <div className="flex flex-wrap gap-2">
            {[
              { name: "All Platforms", action: handlePostBuilderClick },
              { name: "View Published", action: () => navigate("/app", { state: { view: "published-posts" }, replace: true }) },
              { name: "Scheduler", action: () => navigate("/app", { state: { view: "schedule" }, replace: true }) }
            ].map((item, index) => (
              <Button
                key={index}
                onClick={item.action}
                variant="outline"
                size="sm"
                className="text-sm"
              >
                {item.name}
              </Button>
            ))}
          </div>

          {/* Main CTA */}
          <Button
            onClick={handlePostBuilderClick}
            size="lg"
            className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold group"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Create Post Now
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
