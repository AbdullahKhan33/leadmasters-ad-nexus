import { supabase } from "@/integrations/supabase/client";
import { CustomSegment, SEGMENT_TEMPLATES } from "@/types/segments";
import { useToast } from "@/hooks/use-toast";

export function useSegmentsDb() {
  const { toast } = useToast();

  const createSegment = async (segmentData: Omit<CustomSegment, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('segments')
        .insert({
          user_id: user.id,
          name: segmentData.name,
          description: segmentData.description || '',
          color: segmentData.color || '#8B5CF6',
          criteria: (segmentData.criteria || []) as any,
          is_active: segmentData.isActive !== false,
          lead_count: segmentData.leadCount || 0,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error: any) {
      console.error('Error creating segment:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to create segment",
        variant: "destructive",
      });
      throw error;
    }
  };

  const updateSegment = async (id: string, segmentData: Omit<CustomSegment, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const { data, error } = await supabase
        .from('segments')
        .update({
          name: segmentData.name,
          description: segmentData.description || '',
          color: segmentData.color || '#8B5CF6',
          criteria: (segmentData.criteria || []) as any,
          is_active: segmentData.isActive !== false,
          lead_count: segmentData.leadCount || 0,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error: any) {
      console.error('Error updating segment:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to update segment",
        variant: "destructive",
      });
      throw error;
    }
  };

  const deleteSegment = async (id: string) => {
    try {
      const { error } = await supabase
        .from('segments')
        .delete()
        .eq('id', id);

      if (error) throw error;
    } catch (error: any) {
      console.error('Error deleting segment:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to delete segment",
        variant: "destructive",
      });
      throw error;
    }
  };

  const duplicateSegment = async (id: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Fetch the original segment
      const { data: original, error: fetchError } = await supabase
        .from('segments')
        .select('*')
        .eq('id', id)
        .single();

      if (fetchError) throw fetchError;

      // Create duplicate
      const { data, error } = await supabase
        .from('segments')
        .insert({
          user_id: user.id,
          name: `${original.name} (Copy)`,
          description: original.description,
          color: original.color,
          criteria: original.criteria as any,
          is_active: true,
          lead_count: 0,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error: any) {
      console.error('Error duplicating segment:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to duplicate segment",
        variant: "destructive",
      });
      throw error;
    }
  };

  const createFromTemplate = async (templateId: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const template = SEGMENT_TEMPLATES.find(t => t.id === templateId);
      if (!template) throw new Error('Template not found');

      const { data, error } = await supabase
        .from('segments')
        .insert({
          user_id: user.id,
          name: template.name,
          description: template.description,
          color: '#8B5CF6',
          criteria: template.criteria as any,
          is_active: true,
          lead_count: 0,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error: any) {
      console.error('Error creating segment from template:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to create segment from template",
        variant: "destructive",
      });
      throw error;
    }
  };

  const deleteAllUserSegments = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('segments')
        .delete()
        .eq('user_id', user.id);

      if (error) throw error;
    } catch (error: any) {
      console.error('Error deleting all segments:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to delete segments",
        variant: "destructive",
      });
      throw error;
    }
  };

  const createDefaultSegments = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Select a few templates to create as default segments
      const defaultTemplateIds = [
        'template-india-career-switcher', // EdTech India
        'template-dubai-downtown-luxury', // Real Estate Dubai
        'template-tier2-first-home', // Real Estate India
        'template-dubai-expat-career', // EdTech Dubai
        'template-qatar-investment', // Real Estate Qatar
      ];

      const segmentsToCreate = SEGMENT_TEMPLATES
        .filter(t => defaultTemplateIds.includes(t.id))
        .map(template => ({
          user_id: user.id,
          name: template.name,
          description: template.description,
          color: '#8B5CF6',
          criteria: template.criteria as any,
          is_active: true,
          lead_count: 0,
        }));

      const { data, error } = await supabase
        .from('segments')
        .insert(segmentsToCreate)
        .select();

      if (error) throw error;
      return data;
    } catch (error: any) {
      console.error('Error creating default segments:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to create default segments",
        variant: "destructive",
      });
      throw error;
    }
  };

  return {
    createSegment,
    updateSegment,
    deleteSegment,
    duplicateSegment,
    createFromTemplate,
    deleteAllUserSegments,
    createDefaultSegments,
  };
}
