import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Loader2, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface PromptInputSectionProps {
  onSubmit: (prompt: string) => void;
  isLoading: boolean;
  onLoadingChange: (loading: boolean) => void;
  onRefinedPrompts: (prompts: string[]) => void;
}

export function PromptInputSection({
  onSubmit,
  isLoading,
  onLoadingChange,
  onRefinedPrompts,
}: PromptInputSectionProps) {
  const [prompt, setPrompt] = useState("");

  const handleSubmit = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt");
      return;
    }

    onLoadingChange(true);
    onSubmit(prompt);

    try {
      const { data, error } = await supabase.functions.invoke('refine-ad-prompt', {
        body: { prompt: prompt.trim() }
      });

      if (error) {
        console.error('Error refining prompt:', error);
        throw error;
      }

      if (data?.error) {
        throw new Error(data.error);
      }

      if (data?.refinedPrompts && Array.isArray(data.refinedPrompts)) {
        onRefinedPrompts(data.refinedPrompts);
        toast.success("Generated 3 refined prompts!");
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error: any) {
      console.error('Error:', error);
      if (error.message?.includes('Rate limit')) {
        toast.error("Rate limit exceeded. Please try again in a moment.");
      } else if (error.message?.includes('Credits')) {
        toast.error("Credits exhausted. Please add credits to continue.");
      } else {
        toast.error("Failed to refine prompt. Please try again.");
      }
    } finally {
      onLoadingChange(false);
    }
  };

  return (
    <Card className="p-6 space-y-4">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-primary" />
          Describe Your Creative
        </h2>
        <p className="text-muted-foreground">
          Tell us what kind of ad creative you want. Don't worry about being perfect - our AI will refine your idea into professional prompts.
        </p>
      </div>

      <div className="space-y-3">
        <Textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Example: A luxury real estate house with a beautiful garden for my property listing ad"
          className="min-h-32 resize-none"
          disabled={isLoading}
        />
        
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {prompt.length} characters
          </p>
          <Button
            onClick={handleSubmit}
            disabled={isLoading || !prompt.trim()}
            size="lg"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Refining Prompt...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate Refined Prompts
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Example Prompts */}
      <div className="pt-4 border-t">
        <p className="text-sm font-medium mb-2">Need inspiration? Try these:</p>
        <div className="flex flex-wrap gap-2">
          {[
            "Luxury car ad with sleek design",
            "Healthy meal delivery service",
            "Modern tech startup office",
            "Fashion brand spring collection",
          ].map((example) => (
            <Button
              key={example}
              variant="outline"
              size="sm"
              onClick={() => setPrompt(example)}
              disabled={isLoading}
            >
              {example}
            </Button>
          ))}
        </div>
      </div>
    </Card>
  );
}