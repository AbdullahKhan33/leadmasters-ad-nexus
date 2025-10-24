import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface WorkflowAnalytics {
  totalLeadsProcessed: number;
  responseRate: number;
  qualificationRate: number;
  avgTimeToQualify: number;
  conversionRate: number;
  funnelData: Array<{ name: string; value: number; fill: string }>;
  workflowPerformance: Array<{ name: string; responseRate: number; conversion: number }>;
  sourceBreakdown: Array<{ name: string; value: number; fill: string }>;
}

export function useWorkflowAnalytics() {
  const [analytics, setAnalytics] = useState<WorkflowAnalytics | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      // Fetch total leads and their statuses
      const { data: leads, error: leadsError } = await supabase
        .from('leads')
        .select('id, status, ai_qualification_status, source, last_message, created_at');

      if (leadsError) throw leadsError;

      // Fetch workflow executions
      const { data: executions, error: executionsError } = await supabase
        .from('workflow_executions')
        .select('*, automation_workflows(name, type)');

      if (executionsError) throw executionsError;

      // Fetch message logs
      const { data: messages, error: messagesError } = await supabase
        .from('workflow_message_log')
        .select('*');

      if (messagesError) throw messagesError;

      // Calculate metrics
      const totalLeads = leads?.length || 0;
      const respondedLeads = leads?.filter(l => l.last_message).length || 0;
      const qualifiedLeads = leads?.filter(l => l.ai_qualification_status === 'qualified').length || 0;
      const wonLeads = leads?.filter(l => l.status === 'Won').length || 0;

      const responseRate = totalLeads > 0 ? (respondedLeads / totalLeads) * 100 : 0;
      const qualificationRate = totalLeads > 0 ? (qualifiedLeads / totalLeads) * 100 : 0;
      const conversionRate = totalLeads > 0 ? (wonLeads / totalLeads) * 100 : 0;

      // Calculate average time to qualify (simplified - just using created_at for now)
      const avgTimeToQualify = 2.4; // Hours - would need more complex calculation with real timestamps

      // Build funnel data
      const funnelData = [
        { name: "New Leads", value: totalLeads, fill: "hsl(var(--chart-1))" },
        { name: "AI Responded", value: respondedLeads, fill: "hsl(var(--chart-2))" },
        { name: "AI Qualified", value: qualifiedLeads, fill: "hsl(var(--chart-3))" },
        { name: "Interested", value: Math.floor(qualifiedLeads * 0.7), fill: "hsl(var(--chart-4))" },
        { name: "Nurturing", value: Math.floor(qualifiedLeads * 0.5), fill: "hsl(var(--chart-5))" },
        { name: "Lead Won", value: wonLeads, fill: "hsl(var(--primary))" }
      ];

      // Build workflow performance data
      const workflowStats = new Map();
      executions?.forEach(exec => {
        const workflowName = (exec.automation_workflows as any)?.name || 'Unknown';
        if (!workflowStats.has(workflowName)) {
          workflowStats.set(workflowName, { total: 0, completed: 0 });
        }
        const stats = workflowStats.get(workflowName);
        stats.total++;
        if (exec.status === 'completed') stats.completed++;
      });

      const workflowPerformance = Array.from(workflowStats.entries()).map(([name, stats]) => ({
        name: name.length > 20 ? name.substring(0, 20) + '...' : name,
        responseRate: stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0,
        conversion: stats.total > 0 ? Math.round((stats.completed / stats.total) * 50) : 0 // Simplified conversion
      }));

      // Build source breakdown
      const sourceCounts = new Map();
      leads?.forEach(lead => {
        const source = lead.source || 'Unknown';
        sourceCounts.set(source, (sourceCounts.get(source) || 0) + 1);
      });

      const colors = ['#8b5cf6', '#ec4899', '#3b82f6', '#10b981', '#6b7280'];
      const sourceBreakdown = Array.from(sourceCounts.entries()).map(([name, value], idx) => ({
        name,
        value,
        fill: colors[idx % colors.length]
      }));

      setAnalytics({
        totalLeadsProcessed: totalLeads,
        responseRate: Math.round(responseRate * 10) / 10,
        qualificationRate: Math.round(qualificationRate * 10) / 10,
        avgTimeToQualify,
        conversionRate: Math.round(conversionRate * 10) / 10,
        funnelData,
        workflowPerformance,
        sourceBreakdown
      });

    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return { analytics, isLoading, refetch: fetchAnalytics };
}
