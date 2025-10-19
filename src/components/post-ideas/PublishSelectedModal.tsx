import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Facebook, Instagram, Linkedin, Twitter, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { GeneratedIdea } from "@/hooks/usePostIdeas";

interface PublishSelectedModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedIdeas: GeneratedIdea[];
  onPublishComplete: () => void;
}

export const PublishSelectedModal = ({
  open,
  onOpenChange,
  selectedIdeas,
  onPublishComplete,
}: PublishSelectedModalProps) => {
  const { toast } = useToast();
  
  // Extract locked platforms from selected ideas
  const lockedPlatforms = Array.from(
    new Set(selectedIdeas.map((idea) => idea.platform.toLowerCase()))
  );
  
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(lockedPlatforms);
  const [isPublishing, setIsPublishing] = useState(false);

  const platforms = [
    { id: "facebook", name: "Facebook", icon: Facebook, color: "text-blue-600" },
    { id: "instagram", name: "Instagram", icon: Instagram, color: "text-pink-600" },
    { id: "linkedin", name: "LinkedIn", icon: Linkedin, color: "text-blue-700" },
    { id: "twitter", name: "Twitter", icon: Twitter, color: "text-sky-500" },
    { id: "whatsapp", name: "WhatsApp", icon: MessageCircle, color: "text-green-600" },
  ];

  const togglePlatform = (platformId: string) => {
    // Prevent deselecting locked platforms
    if (lockedPlatforms.includes(platformId)) {
      return;
    }
    
    setSelectedPlatforms((prev) =>
      prev.includes(platformId)
        ? prev.filter((p) => p !== platformId)
        : [...prev, platformId]
    );
  };

  const handlePublish = async () => {
    if (selectedPlatforms.length === 0) {
      toast({
        title: "No platforms selected",
        description: "Please select at least one platform to publish to.",
        variant: "destructive",
      });
      return;
    }

    setIsPublishing(true);

    try {
      // Simulate publishing process
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast({
        title: "Posts Published! 🎉",
        description: `Successfully published ${selectedIdeas.length} post${
          selectedIdeas.length > 1 ? "s" : ""
        } to ${selectedPlatforms.length} platform${
          selectedPlatforms.length > 1 ? "s" : ""
        }.`,
      });

      onPublishComplete();
      onOpenChange(false);
      setSelectedPlatforms([]);
    } catch (error) {
      toast({
        title: "Publishing Failed",
        description: "There was an error publishing your posts. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Publish Selected Posts</DialogTitle>
          <DialogDescription>
            You're about to publish {selectedIdeas.length} post
            {selectedIdeas.length > 1 ? "s" : ""}. Select the platforms where
            you'd like to publish.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Platform Selection */}
          <div className="space-y-4">
            <Label className="text-base font-semibold">Select Platforms</Label>
            <div className="grid grid-cols-2 gap-4">
              {platforms.map((platform) => {
                const Icon = platform.icon;
                const isSelected = selectedPlatforms.includes(platform.id);
                const isLocked = lockedPlatforms.includes(platform.id);
                return (
                  <div
                    key={platform.id}
                    onClick={() => togglePlatform(platform.id)}
                    className={`flex items-center space-x-3 p-4 border-2 rounded-lg transition-all ${
                      isLocked
                        ? "border-primary bg-primary/10 cursor-default"
                        : isSelected
                        ? "border-primary bg-primary/5 cursor-pointer"
                        : "border-border hover:border-primary/50 cursor-pointer"
                    }`}
                  >
                    <Checkbox
                      checked={isSelected}
                      disabled={isLocked}
                      onCheckedChange={() => togglePlatform(platform.id)}
                    />
                    <Icon className={`w-5 h-5 ${platform.color}`} />
                    <span className="font-medium">{platform.name}</span>
                    {isLocked && (
                      <span className="ml-auto text-xs text-muted-foreground">(Required)</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Post Preview */}
          <div className="space-y-2">
            <Label className="text-base font-semibold">Posts to Publish</Label>
            <div className="max-h-40 overflow-y-auto space-y-2">
              {selectedIdeas.map((idea, index) => (
                <div
                  key={idea.id}
                  className="p-3 bg-muted rounded-lg text-sm"
                >
                  <p className="font-medium">Post {index + 1}</p>
                  <p className="text-muted-foreground line-clamp-2">
                    {idea.post_caption}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isPublishing}
          >
            Cancel
          </Button>
          <Button onClick={handlePublish} disabled={isPublishing}>
            {isPublishing ? "Publishing..." : "Publish Now"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
