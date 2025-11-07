import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Megaphone, PenTool, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function CampaignHeroTiles() {
  const navigate = useNavigate();

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Create Ad Campaign */}
      <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-background to-background hover:border-primary/40 transition-all duration-300 shadow-lg hover:shadow-xl group">
        <CardContent className="p-8 flex flex-col items-center text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
            <Megaphone className="w-10 h-10 text-primary-foreground" />
          </div>
          
          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-foreground">Create Ad Campaign</h2>
            <p className="text-muted-foreground text-sm max-w-md">
              Launch targeted advertising campaigns on Facebook, Instagram, Google, or LinkedIn with AI-powered optimization
            </p>
          </div>

          <div className="flex flex-wrap gap-3 justify-center">
            <Button
              onClick={() => navigate("/", { state: { view: "ad-builder", platform: "facebook" } })}
              variant="outline"
              size="sm"
              className="hover:bg-primary/10"
            >
              Facebook
            </Button>
            <Button
              onClick={() => navigate("/", { state: { view: "ad-builder", platform: "instagram" } })}
              variant="outline"
              size="sm"
              className="hover:bg-primary/10"
            >
              Instagram
            </Button>
            <Button
              onClick={() => navigate("/", { state: { view: "ad-builder", platform: "google" } })}
              variant="outline"
              size="sm"
              className="hover:bg-primary/10"
            >
              Google
            </Button>
            <Button
              onClick={() => navigate("/", { state: { view: "ad-builder", platform: "linkedin" } })}
              variant="outline"
              size="sm"
              className="hover:bg-primary/10"
            >
              LinkedIn
            </Button>
          </div>

          <Button
            onClick={() => navigate("/", { state: { view: "ad-builder" } })}
            size="lg"
            className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground shadow-md"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Start Ad Campaign
          </Button>
        </CardContent>
      </Card>

      {/* Create Social Post */}
      <Card className="border-2 border-secondary/20 bg-gradient-to-br from-secondary/5 via-background to-background hover:border-secondary/40 transition-all duration-300 shadow-lg hover:shadow-xl group">
        <CardContent className="p-8 flex flex-col items-center text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-secondary to-secondary/60 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
            <PenTool className="w-10 h-10 text-secondary-foreground" />
          </div>
          
          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-foreground">Create Social Post</h2>
            <p className="text-muted-foreground text-sm max-w-md">
              Design and publish engaging content across multiple social media platforms with AI-generated copy
            </p>
          </div>

          <div className="flex flex-wrap gap-3 justify-center">
            <Button
              onClick={() => navigate("/post-builder")}
              variant="outline"
              size="sm"
              className="hover:bg-secondary/10"
            >
              All Platforms
            </Button>
            <Button
              onClick={() => navigate("/", { state: { view: "published-posts" } })}
              variant="outline"
              size="sm"
              className="hover:bg-secondary/10"
            >
              View Published
            </Button>
          </div>

          <Button
            onClick={() => navigate("/post-builder")}
            size="lg"
            className="w-full bg-gradient-to-r from-secondary to-secondary/80 hover:from-secondary/90 hover:to-secondary/70 text-secondary-foreground shadow-md"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Create Post Now
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
