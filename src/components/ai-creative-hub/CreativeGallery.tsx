import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Trash2, Image as ImageIcon, Loader2 } from "lucide-react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

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

export function CreativeGallery() {
  const [creatives, setCreatives] = useState<AICreative[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    fetchCreatives();
  }, []);

  const fetchCreatives = async () => {
    try {
      const { data, error } = await supabase
        .from('ai_creatives')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setCreatives((data || []) as AICreative[]);
    } catch (error) {
      console.error('Error fetching creatives:', error);
      toast.error("Failed to load creatives");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = async (creative: AICreative) => {
    try {
      const response = await fetch(creative.image_url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `creative-${creative.id}.png`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      toast.success("Downloaded successfully");
    } catch (error) {
      console.error('Error downloading:', error);
      toast.error("Failed to download");
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      const { error } = await supabase
        .from('ai_creatives')
        .delete()
        .eq('id', deleteId);

      if (error) throw error;

      setCreatives(prev => prev.filter(c => c.id !== deleteId));
      toast.success("Creative deleted");
    } catch (error) {
      console.error('Error deleting:', error);
      toast.error("Failed to delete");
    } finally {
      setDeleteId(null);
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
            <h3 className="text-xl font-semibold">No Creatives Yet</h3>
            <p className="text-muted-foreground">
              Generate your first AI creative to see it here!
            </p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {creatives.map((creative) => (
          <Card key={creative.id} className="overflow-hidden group">
            <div className="relative aspect-video">
              <img
                src={creative.image_url}
                alt="AI Generated Creative"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <Button
                  size="icon"
                  variant="secondary"
                  onClick={() => handleDownload(creative)}
                >
                  <Download className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="destructive"
                  onClick={() => setDeleteId(creative.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="p-4 space-y-2">
              <p className="text-sm line-clamp-2 text-muted-foreground">
                {creative.refined_prompt}
              </p>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>
                  {new Date(creative.created_at).toLocaleDateString()}
                </span>
                {creative.used_in_campaigns.length > 0 && (
                  <span className="bg-primary/10 text-primary px-2 py-1 rounded">
                    Used in {creative.used_in_campaigns.length} campaigns
                  </span>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Creative?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this creative from your gallery.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}