import { useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Image as ImageIcon, RotateCcw } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface ImageGenerationDisplayProps {
  originalPrompt: string;
  selectedPrompt: string;
  otherPrompts: string[];
  isGenerating: boolean;
  onGeneratingChange: (generating: boolean) => void;
  onCreativesGenerated: (creatives: any[]) => void;
  onReset: () => void;
}

export function ImageGenerationDisplay({
  originalPrompt,
  selectedPrompt,
  otherPrompts,
  isGenerating,
  onGeneratingChange,
  onCreativesGenerated,
  onReset,
}: ImageGenerationDisplayProps) {
  useEffect(() => {
    generateImages();
  }, []);

  const generateImages = async () => {
    onGeneratingChange(true);

    try {
      const { data, error } = await supabase.functions.invoke('generate-ad-creative', {
        body: {
          originalPrompt,
          refinedPrompt: selectedPrompt,
          otherRefinedPrompts: otherPrompts,
        }
      });

      if (error) {
        console.error('Error generating images:', error);
        throw error;
      }

      if (data?.error) {
        throw new Error(data.error);
      }

      if (data?.creatives && Array.isArray(data.creatives)) {
        onCreativesGenerated(data.creatives);
        toast.success("Successfully generated 2 creative images!");
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
        toast.error("Failed to generate images. Please try again.");
      }
    } finally {
      onGeneratingChange(false);
    }
  };

  return (
    <Card className="p-6 space-y-4">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <ImageIcon className="h-6 w-6 text-primary" />
          {isGenerating ? "Generating Your Creatives..." : "Generation Complete"}
        </h2>
        <p className="text-muted-foreground">
          Using: <span className="font-medium text-foreground">{selectedPrompt}</span>
        </p>
      </div>

      {isGenerating && (
        <div className="flex flex-col items-center justify-center py-12 space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <div className="text-center space-y-2">
            <p className="text-lg font-medium">Creating 2 unique variations...</p>
            <p className="text-sm text-muted-foreground">
              This usually takes 10-15 seconds
            </p>
          </div>
          <div className="flex gap-2 mt-4">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="w-24 h-24 rounded-lg bg-muted animate-pulse"
              />
            ))}
          </div>
        </div>
      )}

      {!isGenerating && (
        <div className="flex justify-center">
          <Button onClick={onReset} variant="outline">
            <RotateCcw className="mr-2 h-4 w-4" />
            Create Another
          </Button>
        </div>
      )}
    </Card>
  );
}