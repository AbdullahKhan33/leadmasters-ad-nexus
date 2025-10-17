import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { CampaignFolder } from "@/types/campaigns";
import { useToast } from "@/hooks/use-toast";

export function useCampaignFolders() {
  const [folders, setFolders] = useState<CampaignFolder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchFolders = async () => {
    try {
      setIsLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('campaign_folders')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setFolders((data || []) as CampaignFolder[]);
    } catch (error: any) {
      console.error('Error fetching folders:', error);
      toast({
        title: "Error",
        description: "Failed to load folders",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const createFolder = async (name: string, color: string = '#8B5CF6') => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('campaign_folders')
        .insert([{ user_id: user.id, name, color }])
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Success",
        description: "Folder created successfully",
      });

      await fetchFolders();
      return data;
    } catch (error: any) {
      console.error('Error creating folder:', error);
      toast({
        title: "Error",
        description: "Failed to create folder",
        variant: "destructive",
      });
      return null;
    }
  };

  const updateFolder = async (id: string, updates: Partial<CampaignFolder>) => {
    try {
      const { error } = await supabase
        .from('campaign_folders')
        .update(updates)
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Folder updated successfully",
      });

      await fetchFolders();
    } catch (error: any) {
      console.error('Error updating folder:', error);
      toast({
        title: "Error",
        description: "Failed to update folder",
        variant: "destructive",
      });
    }
  };

  const deleteFolder = async (id: string) => {
    try {
      const { error } = await supabase
        .from('campaign_folders')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Folder deleted successfully",
      });

      await fetchFolders();
    } catch (error: any) {
      console.error('Error deleting folder:', error);
      toast({
        title: "Error",
        description: "Failed to delete folder",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchFolders();

    const channel = supabase
      .channel('campaign_folders_changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'campaign_folders' }, 
        () => {
          fetchFolders();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return {
    folders,
    isLoading,
    createFolder,
    updateFolder,
    deleteFolder,
    refetch: fetchFolders,
  };
}
