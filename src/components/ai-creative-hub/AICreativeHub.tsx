import { useState } from "react";
import { PromptInputSection } from "./PromptInputSection";
import { PromptRefinementCards } from "./PromptRefinementCards";
import { ImageGenerationDisplay } from "./ImageGenerationDisplay";
import { CreativeGallery } from "./CreativeGallery";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AICreative {
  id: string;
  user_id: string;
  workspace_id: string | null;
  original_prompt: string;
  refined_prompt: string;
  other_refined_prompts: string[];
  image_url: string;
  thumbnail_url: string | null;
  generation_metadata: Record<string, any>;
  used_in_campaigns: string[];
  created_at: string;
  updated_at: string;
}

export function AICreativeHub() {
  const [currentPrompt, setCurrentPrompt] = useState("");
  const [refinedPrompts, setRefinedPrompts] = useState<string[]>([]);
  const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null);
  const [generatedCreatives, setGeneratedCreatives] = useState<AICreative[]>([]);
  const [isRefining, setIsRefining] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [refreshGallery, setRefreshGallery] = useState(0);

  const handlePromptSubmit = (prompt: string) => {
    setCurrentPrompt(prompt);
    setRefinedPrompts([]);
    setSelectedPrompt(null);
    setGeneratedCreatives([]);
  };

  const handleRefinedPromptsGenerated = (prompts: string[]) => {
    setRefinedPrompts(prompts);
  };

  const handlePromptSelected = (prompt: string) => {
    setSelectedPrompt(prompt);
  };

  const handleCreativesGenerated = (creatives: AICreative[]) => {
    setGeneratedCreatives(creatives);
    setRefreshGallery(prev => prev + 1);
  };

  const handleReset = () => {
    setCurrentPrompt("");
    setRefinedPrompts([]);
    setSelectedPrompt(null);
    setGeneratedCreatives([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent mb-2">
            AI Creative Hub
          </h1>
          <p className="text-muted-foreground">
            Generate professional ad creatives using AI. Describe what you want, and we'll create stunning images for your campaigns.
          </p>
        </div>

        <Tabs defaultValue="generate" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="generate">Generate New</TabsTrigger>
            <TabsTrigger value="gallery">My Creatives</TabsTrigger>
          </TabsList>

          <TabsContent value="generate" className="space-y-6">
            {/* Step 1: Prompt Input */}
            <PromptInputSection
              onSubmit={handlePromptSubmit}
              isLoading={isRefining}
              onLoadingChange={setIsRefining}
              onRefinedPrompts={handleRefinedPromptsGenerated}
            />

            {/* Step 2: Refined Prompts Selection */}
            {refinedPrompts.length > 0 && !selectedPrompt && (
              <PromptRefinementCards
                prompts={refinedPrompts}
                onSelect={handlePromptSelected}
              />
            )}

            {/* Step 3: Image Generation */}
            {selectedPrompt && (
              <ImageGenerationDisplay
                originalPrompt={currentPrompt}
                selectedPrompt={selectedPrompt}
                otherPrompts={refinedPrompts.filter(p => p !== selectedPrompt)}
                isGenerating={isGenerating}
                onGeneratingChange={setIsGenerating}
                onCreativesGenerated={handleCreativesGenerated}
                onReset={handleReset}
              />
            )}

            {/* Step 4: Generated Results */}
            {generatedCreatives.length > 0 && (
              <div className="bg-card border rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  Successfully Generated
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {generatedCreatives.map((creative) => (
                    <div key={creative.id} className="space-y-2">
                      <img
                        src={creative.image_url}
                        alt="Generated creative"
                        className="w-full rounded-lg border shadow-sm"
                      />
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {creative.refined_prompt}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="gallery">
            <CreativeGallery key={refreshGallery} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}