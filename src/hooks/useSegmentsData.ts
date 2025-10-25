import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Segment } from "@/types/campaigns";
import { useToast } from "@/hooks/use-toast";
import { matchesCriteria } from "@/utils/segmentMatching";
import { SegmentCriteria } from "@/types/segments";

export function useSegmentsData() {
  const [segments, setSegments] = useState<Segment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchSegments = async () => {
    try {
      setIsLoading(true);
      
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Fetch segments
      const { data: segmentsData, error: segError } = await supabase
        .from('segments')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (segError) throw segError;

      // Fetch leads to compute counts (with all needed fields for criteria matching)
      const { data: leadsData, error: leadsError } = await supabase
        .from('leads')
        .select('id, source_metadata, status, source, email, phone, created_at, updated_at, last_interaction_at, timestamp')
        .eq('user_id', user.id);

      if (leadsError) throw leadsError;

      const leads = leadsData || [];
      
      // Compute lead count for each segment
      const segmentsWithCounts = (segmentsData || []).map(segment => {
        let leadCount = 0;
        
        try {
          // Parse criteria (it's stored as jsonb, could be array or object)
          const criteria = segment.criteria;
          
          if (Array.isArray(criteria)) {
            // Template-style criteria
            leadCount = leads.filter(lead => matchesCriteria(lead, criteria as any)).length;
          }
        } catch (err) {
          console.warn('Error computing lead count for segment:', segment.id, err);
        }

        return {
          ...segment,
          lead_count: leadCount
        } as Segment;
      });

      setSegments(segmentsWithCounts);
    } catch (error: any) {
      console.error('Error fetching segments:', error);
      toast({
        title: "Error",
        description: "Failed to load segments",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSegments();
  }, []);

  return {
    segments,
    isLoading,
    refetch: fetchSegments,
  };
}
