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
    <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
      {/* Create Ad Campaign */}
      <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-primary/10 via-primary/5 to-background shadow-2xl hover:shadow-primary/30 transition-all duration-500 group">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-primary via-primary/50 to-primary opacity-20 blur-xl group-hover:opacity-30 transition-opacity" />
        
        <CardContent className="relative p-10 lg:p-12 flex flex-col items-center text-center space-y-8">
          {/* Icon with premium gradient and animation */}
          <div className="relative animate-float">
            <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-full blur-2xl opacity-60 animate-pulse-slow" />
            <div className="relative w-28 h-28 rounded-full bg-gradient-to-br from-primary via-primary to-secondary flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-500 border-4 border-primary/30">
              <Megaphone className="w-14 h-14 text-primary-foreground" />
            </div>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
              Create Ad Campaign
            </h2>
            <p className="text-muted-foreground leading-relaxed max-w-md">
              Launch targeted advertising campaigns with AI-powered optimization across major platforms
            </p>
          </div>

          {/* Platform quick launch buttons */}
          <div className="flex flex-wrap gap-3 justify-center">
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
                className="border-2 border-primary/30 hover:border-primary hover:bg-primary/10 hover:text-primary transition-all duration-300 font-medium"
              >
                {item.name}
              </Button>
            ))}
          </div>

          {/* Main CTA */}
          <Button
            onClick={() => navigate("/", { state: { view: "ad-builder" } })}
            size="lg"
            className="w-full h-16 bg-gradient-to-r from-primary via-primary to-secondary hover:from-primary/90 hover:via-primary/95 hover:to-secondary/90 text-primary-foreground shadow-2xl hover:shadow-primary/50 transition-all duration-500 text-lg font-bold group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <Sparkles className="w-6 h-6 mr-2 group-hover:rotate-180 transition-transform duration-500" />
            Start Ad Campaign
            <ArrowRight className="w-6 h-6 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
          </Button>
        </CardContent>
      </Card>

      {/* Create Social Post */}
      <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-secondary/10 via-secondary/5 to-background shadow-2xl hover:shadow-secondary/30 transition-all duration-500 group">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 via-secondary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-secondary via-secondary/50 to-secondary opacity-20 blur-xl group-hover:opacity-30 transition-opacity" />
        
        <CardContent className="relative p-10 lg:p-12 flex flex-col items-center text-center space-y-8">
          {/* Icon with premium gradient and animation */}
          <div className="relative animate-float delay-500">
            <div className="absolute inset-0 bg-gradient-to-br from-secondary to-primary rounded-full blur-2xl opacity-60 animate-pulse-slow" />
            <div className="relative w-28 h-28 rounded-full bg-gradient-to-br from-secondary via-secondary to-primary flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-500 border-4 border-secondary/30">
              <PenTool className="w-14 h-14 text-secondary-foreground" />
            </div>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-secondary via-secondary/80 to-secondary bg-clip-text text-transparent">
              Create Social Post
            </h2>
            <p className="text-muted-foreground leading-relaxed max-w-md">
              Design and publish engaging content across multiple platforms with AI-generated copy
            </p>
          </div>

          {/* Quick action buttons */}
          <div className="flex flex-wrap gap-3 justify-center">
            {[
              { name: "All Platforms", action: handlePostBuilderClick },
              { name: "View Published", action: () => navigate("/", { state: { view: "published-posts" } }) },
              { name: "Scheduler", action: () => navigate("/", { state: { view: "schedule" } }) }
            ].map((item, index) => (
              <Button
                key={index}
                onClick={item.action}
                variant="outline"
                size="sm"
                className="border-2 border-secondary/30 hover:border-secondary hover:bg-secondary/10 hover:text-secondary transition-all duration-300 font-medium"
              >
                {item.name}
              </Button>
            ))}
          </div>

          {/* Main CTA */}
          <Button
            onClick={handlePostBuilderClick}
            size="lg"
            className="w-full h-16 bg-gradient-to-r from-secondary via-secondary to-primary hover:from-secondary/90 hover:via-secondary/95 hover:to-primary/90 text-secondary-foreground shadow-2xl hover:shadow-secondary/50 transition-all duration-500 text-lg font-bold group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <Sparkles className="w-6 h-6 mr-2 group-hover:rotate-180 transition-transform duration-500" />
            Create Post Now
            <ArrowRight className="w-6 h-6 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
