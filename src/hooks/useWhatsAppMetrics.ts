import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface WhatsAppMetrics {
  totalWhatsAppLeads: number;
  newLeads: number;
  activeChats: number;
  qualifiedLeads: number;
  agingLeads: number;
  responseRate: number;
  leadsByStatus: {
    New: number;
    Active: number;
    Qualified: number;
    Won: number;
  };
}

export function useWhatsAppMetrics(userId: string | undefined) {
  return useQuery({
    queryKey: ["whatsapp-metrics", userId],
    queryFn: async () => {
      if (!userId) throw new Error("User ID is required");

      const { data: leads, error } = await supabase
        .from("leads")
        .select("*")
        .eq("user_id", userId)
        .eq("source", "whatsapp");

      if (error) throw error;

      const now = new Date();
      const threeDaysAgo = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000);
      const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

      const totalWhatsAppLeads = leads.length;
      const newLeads = leads.filter((l) => l.status === "New").length;
      const activeChats = leads.filter((l) => l.status === "Active").length;
      const qualifiedLeads = leads.filter((l) => l.status === "Qualified").length;
      const wonLeads = leads.filter((l) => l.status === "Won").length;

      const agingLeads = leads.filter((l) => {
        if (!l.last_interaction_at) return true;
        return new Date(l.last_interaction_at) < threeDaysAgo;
      }).length;

      const respondedThisWeek = leads.filter((l) => {
        if (!l.last_interaction_at) return false;
        return new Date(l.last_interaction_at) >= sevenDaysAgo;
      }).length;

      const responseRate =
        totalWhatsAppLeads > 0
          ? Math.round((respondedThisWeek / totalWhatsAppLeads) * 100)
          : 0;

      const metrics: WhatsAppMetrics = {
        totalWhatsAppLeads,
        newLeads,
        activeChats,
        qualifiedLeads,
        agingLeads,
        responseRate,
        leadsByStatus: {
          New: newLeads,
          Active: activeChats,
          Qualified: qualifiedLeads,
          Won: wonLeads,
        },
      };

      return metrics;
    },
    enabled: !!userId,
  });
}
