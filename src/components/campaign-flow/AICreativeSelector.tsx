import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Loader2, ImageIcon } from "lucide-react";
import { toast } from "sonner";

interface AICreative {
  id: string;
  image_url: string;
  thumbnail_url: string | null;
  refined_prompt: string;
  created_at: string;
}

interface AICreativeSelectorProps {
  onSelect: (imageUrl: string) => void;
  selectedImageUrl?: string | null;
}

export function AICreativeSelector({ onSelect, selectedImageUrl }: AICreativeSelectorProps) {
  const [creatives, setCreatives] = useState<AICreative[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCreatives();
  }, []);

  const fetchCreatives = async () => {
    try {
      const { data, error } = await supabase
        .from('ai_creatives')
        .select('id, image_url, thumbnail_url, refined_prompt, created_at')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setCreatives((data || []) as AICreative[]);
    } catch (error) {
      console.error('Error fetching creatives:', error);
      toast.error("Failed to load AI creatives");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (creatives.length === 0) {
    return (
      <Card className="p-12">
        <div className="text-center space-y-4">
          <ImageIcon className="h-16 w-16 mx-auto text-muted-foreground" />
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">No AI Creatives Yet</h3>
            <p className="text-sm text-muted-foreground">
              Generate creatives in the AI Creative Hub to use them here!
            </p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
      {creatives.map((creative) => (
        <button
          key={creative.id}
          onClick={() => onSelect(creative.image_url)}
          className={`relative group rounded-lg overflow-hidden border-2 transition-all ${
            selectedImageUrl === creative.image_url
              ? 'border-primary ring-2 ring-primary'
              : 'border-border hover:border-primary/50'
          }`}
        >
          <img
            src={creative.image_url}
            alt="AI Creative"
            className="w-full aspect-video object-cover"
          />
          {selectedImageUrl === creative.image_url && (
            <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
              <div className="bg-primary text-primary-foreground rounded-full p-2">
                <Check className="h-5 w-5" />
              </div>
            </div>
          )}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
            <p className="text-xs text-white line-clamp-2">
              {creative.refined_prompt}
            </p>
          </div>
        </button>
      ))}
    </div>
  );
}
