import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Segment } from "@/types/campaigns";
import { useToast } from "@/hooks/use-toast";

export function useSegmentsData() {
  const [segments, setSegments] = useState<Segment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchSegments = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('segments')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setSegments((data || []) as Segment[]);
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
