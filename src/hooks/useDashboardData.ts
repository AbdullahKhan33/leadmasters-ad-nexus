import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function useDashboardData(userId: string | undefined) {
  return useQuery({
    queryKey: ["dashboard-data", userId],
    queryFn: async () => {
      if (!userId) throw new Error("User ID is required");

      const { data: workflows, error: workflowError } = await supabase
        .from("automation_workflows")
        .select("*")
        .eq("user_id", userId)
        .eq("type", "ai_sales");

      if (workflowError) throw workflowError;

      const draftWorkflows = workflows.filter((w) => w.workflow_status === "draft").length;
      const activeWorkflows = workflows.filter((w) => w.workflow_status === "active").length;

      return {
        workflows,
        draftWorkflows,
        activeWorkflows,
        totalWorkflows: workflows.length,
      };
    },
    enabled: !!userId,
  });
}
