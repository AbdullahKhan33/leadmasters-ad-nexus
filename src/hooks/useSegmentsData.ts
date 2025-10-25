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
      function transformLegacyCriteria(criteriaObj: any): SegmentCriteria[] {
        if (!criteriaObj || typeof criteriaObj !== 'object') return [];
        const arr: SegmentCriteria[] = [] as any;
        if (Array.isArray(criteriaObj.status) && criteriaObj.status.length)
          arr.push({ id: 'status', field: 'status', operator: 'in', value: criteriaObj.status, label: '' } as any);
        if (Array.isArray(criteriaObj.source) && criteriaObj.source.length)
          arr.push({ id: 'source', field: 'source', operator: 'in', value: criteriaObj.source, label: '' } as any);
        if (Array.isArray(criteriaObj.category) && criteriaObj.category.length)
          arr.push({ id: 'category', field: 'category', operator: 'in', value: criteriaObj.category, label: '' } as any);
        if (Array.isArray(criteriaObj.list) && criteriaObj.list.length)
          arr.push({ id: 'list', field: 'list', operator: 'in', value: criteriaObj.list, label: '' } as any);
        if (typeof criteriaObj.ai_score_min === 'number')
          arr.push({ id: 'lead_score_min', field: 'lead_score', operator: 'greater_than', value: criteriaObj.ai_score_min, label: '' } as any);
        if (typeof criteriaObj.ai_score_max === 'number')
          arr.push({ id: 'lead_score_max', field: 'lead_score', operator: 'less_than', value: criteriaObj.ai_score_max, label: '' } as any);
        if (criteriaObj.created_after)
          arr.push({ id: 'created_after', field: 'created_at', operator: 'after', value: criteriaObj.created_after, label: '' } as any);
        if (criteriaObj.created_before)
          arr.push({ id: 'created_before', field: 'created_at', operator: 'before', value: criteriaObj.created_before, label: '' } as any);
        if (typeof criteriaObj.has_email === 'boolean')
          arr.push({ id: 'email_status', field: 'email_status', operator: 'equals', value: criteriaObj.has_email ? 'has_email' : 'no_email', label: '' } as any);
        if (typeof criteriaObj.has_phone === 'boolean')
          arr.push({ id: 'phone_status', field: 'phone_status', operator: 'equals', value: criteriaObj.has_phone ? 'has_phone' : 'no_phone', label: '' } as any);
        return arr;
      }

      const segmentsWithCounts = (segmentsData || []).map(segment => {
        let leadCount = 0;
        
        try {
          // Parse criteria (it's stored as jsonb, could be array or object)
          const criteria = segment.criteria;
          let criteriaArray: SegmentCriteria[] = [] as any;
          
          if (Array.isArray(criteria)) {
            // Template-style criteria
            criteriaArray = criteria as any;
          } else if (criteria && typeof criteria === 'object') {
            // Legacy object-style criteria
            criteriaArray = transformLegacyCriteria(criteria);
          }

          if (criteriaArray.length > 0) {
            leadCount = leads.filter(lead => matchesCriteria(lead, criteriaArray as any)).length;
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
