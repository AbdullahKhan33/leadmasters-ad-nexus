import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function useLeadStats(userId: string | undefined) {
  return useQuery({
    queryKey: ["lead-stats", userId],
    queryFn: async () => {
      if (!userId) throw new Error("User ID is required");

      const { data: leads, error } = await supabase
        .from("leads")
        .select("*")
        .eq("user_id", userId);

      if (error) throw error;

      const totalLeads = leads.length;
      const whatsappLeads = leads.filter((l) => l.source === "whatsapp").length;
      const otherLeads = totalLeads - whatsappLeads;

      return {
        totalLeads,
        whatsappLeads,
        otherLeads,
      };
    },
    enabled: !!userId,
  });
}
