import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Sparkles, Calendar, Send } from "lucide-react";
import { usePostIdeas } from "@/hooks/usePostIdeas";
import { IdeaCard } from "./IdeaCard";
import { PublishSelectedModal } from "./PublishSelectedModal";
import { ScheduleSelectedModal } from "./ScheduleSelectedModal";

export const GenerateTab = () => {
  const [campaignDescription, setCampaignDescription] = useState("");
  const [generatedIdeas, setGeneratedIdeas] = useState<any[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);

  const { generateIdeas, deleteIdea } = usePostIdeas();

  const handleGenerate = async () => {
    const result = await generateIdeas.mutateAsync({
      campaignDescription,
    });
    setGeneratedIdeas(result);
    setSelectedIds([]);
  };

  const toggleSelection = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handlePublishComplete = () => {
    setSelectedIds([]);
  };

  const handleScheduleComplete = () => {
    setSelectedIds([]);
  };

  const selectedIdeasForAction = generatedIdeas.filter((idea) =>
    selectedIds.includes(idea.id)
  );

  const canGenerate = campaignDescription.trim().length > 20;

  return (
    <div className="w-full flex justify-center px-4">
      <div className="w-full max-w-3xl space-y-6">
        {/* Campaign Description Input */}
        <Card className="border-2 border-purple-100 shadow-lg">
        <CardContent className="pt-6 space-y-4">
          <div className="space-y-2">
            <label className="text-lg font-semibold text-gray-900">
              Describe your campaign idea
            </label>
            <p className="text-sm text-muted-foreground">
              Tell us about your business, what you want to post about, your target audience, which platform you're targeting, and any specific goals you have. Be as detailed as you'd like.
            </p>
            <Textarea
              placeholder="Example: I run a sustainable fashion brand targeting eco-conscious millennials. I want to create Instagram posts about our new summer collection made from recycled materials. The goal is to drive traffic to our website and increase brand awareness. I want the tone to be inspiring and authentic..."
              value={campaignDescription}
              onChange={(e) => setCampaignDescription(e.target.value)}
              className="min-h-[200px] text-base leading-relaxed resize-none"
            />
            <p className="text-xs text-muted-foreground">
              Minimum 20 characters • {campaignDescription.length} characters
            </p>
          </div>

          {/* Generate Button */}
          <Button
            onClick={handleGenerate}
            disabled={!canGenerate || generateIdeas.isPending}
            className="w-full h-12 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 hover:from-blue-700 hover:via-purple-700 hover:to-pink-600 text-white font-semibold text-base shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {generateIdeas.isPending ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Generating your posts...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 mr-2" />
                Generate Post Ideas
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Generated Ideas */}
      {generatedIdeas.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-purple-600" />
              Generated Posts
            </h3>
            <span className="text-sm text-muted-foreground">
              {selectedIds.length} of {generatedIdeas.length} selected
            </span>
          </div>

          {/* WhatsApp Posts Section */}
          {generatedIdeas.some(idea => idea.platform?.toLowerCase() === 'whatsapp') && (
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                💬 WhatsApp Posts
              </h4>
              {generatedIdeas
                .filter(idea => idea.platform?.toLowerCase() === 'whatsapp')
                .map((idea) => (
                  <IdeaCard
                    key={idea.id}
                    idea={idea}
                    isSelected={selectedIds.includes(idea.id)}
                    onToggleSelect={() => toggleSelection(idea.id)}
                    onDelete={(id) => {
                      deleteIdea.mutate(id);
                      setGeneratedIdeas((prev) => prev.filter((i) => i.id !== id));
                      setSelectedIds((prev) => prev.filter((i) => i !== id));
                    }}
                  />
                ))}
            </div>
          )}

          {/* Other Platform Posts Section */}
          {generatedIdeas.some(idea => idea.platform?.toLowerCase() !== 'whatsapp') && (
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                📱 Social Media Posts
              </h4>
              {generatedIdeas
                .filter(idea => idea.platform?.toLowerCase() !== 'whatsapp')
                .map((idea) => (
                  <IdeaCard
                    key={idea.id}
                    idea={idea}
                    isSelected={selectedIds.includes(idea.id)}
                    onToggleSelect={() => toggleSelection(idea.id)}
                    onDelete={(id) => {
                      deleteIdea.mutate(id);
                      setGeneratedIdeas((prev) => prev.filter((i) => i.id !== id));
                      setSelectedIds((prev) => prev.filter((i) => i !== id));
                    }}
                  />
                ))}
            </div>
          )}

          {/* Bottom padding to prevent overlap */}
          {selectedIds.length > 0 && <div className="h-24" />}
        </div>
      )}

      {/* Action Buttons - Fixed at bottom when posts are selected */}
      {selectedIds.length > 0 && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[min(92vw,72rem)] pointer-events-none z-40">
          <div className="bg-background border border-border p-4 rounded-xl shadow-lg flex items-center justify-between gap-4 pointer-events-auto">
            <p className="text-sm font-medium">
              {selectedIds.length} post{selectedIds.length > 1 ? "s" : ""} selected
            </p>
            <div className="flex gap-3">
              <Button
                onClick={() => setShowPublishModal(true)}
                className="gap-2 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 hover:from-blue-700 hover:via-purple-700 hover:to-pink-600 text-white"
                size="lg"
              >
                Publish Selected Posts
              </Button>
              <Button
                onClick={() => setShowScheduleModal(true)}
                variant="outline"
                className="gap-2"
                size="lg"
              >
                Schedule Selected Posts
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      <PublishSelectedModal
        open={showPublishModal}
        onOpenChange={setShowPublishModal}
        selectedIdeas={selectedIdeasForAction}
        onPublishComplete={handlePublishComplete}
      />
      <ScheduleSelectedModal
        open={showScheduleModal}
        onOpenChange={setShowScheduleModal}
        selectedIdeas={selectedIdeasForAction}
        onScheduleComplete={handleScheduleComplete}
      />
      </div>
    </div>
  );
};
