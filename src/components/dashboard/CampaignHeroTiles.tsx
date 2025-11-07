import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Megaphone, PenTool, Sparkles, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function CampaignHeroTiles() {
  const navigate = useNavigate();
  
  const handleAdPlatformClick = (platform: string) => {
    navigate("/", { state: { view: "ad-builder", platform } });
  };
  
  const handlePostBuilderClick = () => {
    navigate("/post-builder");
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Create Ad Campaign */}
      <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-primary/10 via-primary/5 to-background shadow-2xl hover:shadow-primary/20 transition-all duration-500 group">
        {/* Premium glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <CardContent className="relative p-10 flex flex-col items-center text-center space-y-6">
          {/* Icon with premium gradient */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary/40 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
            <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-primary via-primary to-primary/70 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-500 border-2 border-primary/20">
              <Megaphone className="w-12 h-12 text-primary-foreground" />
            </div>
          </div>
          
          <div className="space-y-3">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-primary via-primary/90 to-primary/70 bg-clip-text text-transparent">
              Create Ad Campaign
            </h2>
            <p className="text-muted-foreground text-sm max-w-md leading-relaxed">
              Launch targeted advertising campaigns with AI-powered optimization across major platforms
            </p>
          </div>

          {/* Platform quick launch buttons */}
          <div className="flex flex-wrap gap-2 justify-center">
            <Button
              onClick={() => handleAdPlatformClick("facebook")}
              variant="outline"
              size="sm"
              className="border-primary/30 hover:border-primary hover:bg-primary/10 transition-all duration-200"
            >
              Facebook
            </Button>
            <Button
              onClick={() => handleAdPlatformClick("instagram")}
              variant="outline"
              size="sm"
              className="border-primary/30 hover:border-primary hover:bg-primary/10 transition-all duration-200"
            >
              Instagram
            </Button>
            <Button
              onClick={() => handleAdPlatformClick("google")}
              variant="outline"
              size="sm"
              className="border-primary/30 hover:border-primary hover:bg-primary/10 transition-all duration-200"
            >
              Google
            </Button>
            <Button
              onClick={() => handleAdPlatformClick("linkedin")}
              variant="outline"
              size="sm"
              className="border-primary/30 hover:border-primary hover:bg-primary/10 transition-all duration-200"
            >
              LinkedIn
            </Button>
          </div>

          {/* Main CTA */}
          <Button
            onClick={() => navigate("/", { state: { view: "ad-builder" } })}
            size="lg"
            className="w-full h-14 bg-gradient-to-r from-primary via-primary/90 to-primary/80 hover:from-primary hover:via-primary/95 hover:to-primary/90 text-primary-foreground shadow-xl hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300 text-base font-semibold group"
          >
            <Sparkles className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
            Start Ad Campaign
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </CardContent>
      </Card>

      {/* Create Social Post */}
      <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-secondary/10 via-secondary/5 to-background shadow-2xl hover:shadow-secondary/20 transition-all duration-500 group">
        {/* Premium glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <CardContent className="relative p-10 flex flex-col items-center text-center space-y-6">
          {/* Icon with premium gradient */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-secondary to-secondary/40 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
            <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-secondary via-secondary to-secondary/70 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-500 border-2 border-secondary/20">
              <PenTool className="w-12 h-12 text-secondary-foreground" />
            </div>
          </div>
          
          <div className="space-y-3">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-secondary via-secondary/90 to-secondary/70 bg-clip-text text-transparent">
              Create Social Post
            </h2>
            <p className="text-muted-foreground text-sm max-w-md leading-relaxed">
              Design and publish engaging content across multiple platforms with AI-generated copy
            </p>
          </div>

          {/* Quick action buttons */}
          <div className="flex flex-wrap gap-2 justify-center">
            <Button
              onClick={handlePostBuilderClick}
              variant="outline"
              size="sm"
              className="border-secondary/30 hover:border-secondary hover:bg-secondary/10 transition-all duration-200"
            >
              All Platforms
            </Button>
            <Button
              onClick={() => navigate("/", { state: { view: "published-posts" } })}
              variant="outline"
              size="sm"
              className="border-secondary/30 hover:border-secondary hover:bg-secondary/10 transition-all duration-200"
            >
              View Published
            </Button>
            <Button
              onClick={() => navigate("/", { state: { view: "schedule" } })}
              variant="outline"
              size="sm"
              className="border-secondary/30 hover:border-secondary hover:bg-secondary/10 transition-all duration-200"
            >
              Scheduler
            </Button>
          </div>

          {/* Main CTA */}
          <Button
            onClick={handlePostBuilderClick}
            size="lg"
            className="w-full h-14 bg-gradient-to-r from-secondary via-secondary/90 to-secondary/80 hover:from-secondary hover:via-secondary/95 hover:to-secondary/90 text-secondary-foreground shadow-xl hover:shadow-2xl hover:shadow-secondary/30 transition-all duration-300 text-base font-semibold group"
          >
            <Sparkles className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
            Create Post Now
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
