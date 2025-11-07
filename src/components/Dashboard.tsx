import { Sparkles, Users, Target, Zap, TrendingUp } from "lucide-react";
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { PricingScreen } from "./PricingScreen";
import { useAuth } from "@/contexts/AuthContext";
import { useWhatsAppMetrics } from "@/hooks/useWhatsAppMetrics";
import { useLeadStats } from "@/hooks/useLeadStats";
import { useDashboardData } from "@/hooks/useDashboardData";
import { Button } from "@/components/ui/button";
import {
  DashboardMetricsBar,
  ConversionFunnelCard,
  PipelineKanban,
  AIAutomationStatusCard,
  WhatsAppEmptyState,
} from "./dashboard";
import { PriorityQueueCard } from "./ai-sales/PriorityQueueCard";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function Dashboard() {
  const [showPricing, setShowPricing] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const { data: whatsappMetrics, isLoading: metricsLoading } = useWhatsAppMetrics(user?.id);
  const { data: leadStats, isLoading: statsLoading } = useLeadStats(user?.id);
  const { data: dashboardData, isLoading: dashboardLoading } = useDashboardData(user?.id);

  // Fetch all leads for pipeline
  const { data: allLeads, isLoading: leadsLoading } = useQuery({
    queryKey: ["dashboard-leads", user?.id],
    queryFn: async () => {
      if (!user?.id) throw new Error("User ID required");
      
      const { data, error } = await supabase
        .from("leads")
        .select("*")
        .eq("user_id", user.id)
        .eq("source", "whatsapp");

      if (error) throw error;
      return data || [];
    },
    enabled: !!user?.id,
  });

  const isLoading = metricsLoading || statsLoading || dashboardLoading || leadsLoading;

  // Navigation helpers
  const navigateToView = (view: string, filter?: any) => {
    navigate("/app", { state: { view, filter } });
  };

  const handleLeadClick = (leadId: string) => {
    navigate("/app", { state: { view: "crm", leadId } });
  };

  // Prepare metrics data
  const metricsData = useMemo(() => [
    {
      label: "Total Leads",
      value: whatsappMetrics?.totalWhatsAppLeads || 0,
      trend: "up" as const,
      trendValue: "+12%",
      onClick: () => navigateToView("crm"),
    },
    {
      label: "Active Chats",
      value: whatsappMetrics?.activeChats || 0,
      trend: "up" as const,
      trendValue: "+8%",
      onClick: () => navigateToView("crm", { status: "active" }),
    },
    {
      label: "Qualified",
      value: whatsappMetrics?.qualifiedLeads || 0,
      trend: "stable" as const,
      onClick: () => navigateToView("crm", { status: "qualified" }),
    },
    {
      label: "Close Rate",
      value: whatsappMetrics?.responseRate ? `${whatsappMetrics.responseRate}%` : "0%",
      trend: "up" as const,
      trendValue: "+5%",
    },
  ], [whatsappMetrics]);

  // Prepare pipeline stages
  const pipelineStages = useMemo(() => {
    const stages = [
      { id: "new", title: "New", color: "bg-blue-500" },
      { id: "contacted", title: "Contacted", color: "bg-purple-500" },
      { id: "qualified", title: "Qualified", color: "bg-green-500" },
      { id: "proposal", title: "Proposal", color: "bg-yellow-500" },
      { id: "negotiation", title: "Negotiation", color: "bg-orange-500" },
      { id: "won", title: "Won", color: "bg-emerald-500" },
    ];

    return stages.map(stage => ({
      ...stage,
      leads: (allLeads || [])
        .filter(lead => lead.status?.toLowerCase() === stage.id)
        .map(lead => ({
          id: lead.id,
          name: lead.name || "Unknown",
          value: undefined,
          source: lead.source,
          status: lead.status,
        })),
    }));
  }, [allLeads]);

  // Prepare funnel data
  const funnelStages = useMemo(() => [
    {
      label: "New Leads",
      count: whatsappMetrics?.leadsByStatus?.New || 0,
      color: "bg-blue-500",
      onClick: () => navigateToView("crm", { status: "new" }),
    },
    {
      label: "Active",
      count: whatsappMetrics?.leadsByStatus?.Active || 0,
      color: "bg-purple-500",
      onClick: () => navigateToView("crm", { status: "active" }),
    },
    {
      label: "Qualified",
      count: whatsappMetrics?.leadsByStatus?.Qualified || 0,
      color: "bg-green-500",
      onClick: () => navigateToView("crm", { status: "qualified" }),
    },
    {
      label: "Won",
      count: whatsappMetrics?.leadsByStatus?.Won || 0,
      color: "bg-emerald-500",
      onClick: () => navigateToView("crm", { status: "won" }),
    },
  ], [whatsappMetrics]);

  // Prepare priority leads
  const priorityLeads = useMemo(() => {
    const now = new Date();
    const leads = allLeads || [];

    return {
      urgent: leads.filter(l => {
        const lastContact = l.updated_at ? new Date(l.updated_at) : new Date(l.created_at);
        const daysSince = (now.getTime() - lastContact.getTime()) / (1000 * 60 * 60 * 24);
        return daysSince > 3 && l.status !== "won" && l.status !== "lost";
      }).map(l => ({
        id: l.id,
        name: l.name || "Unknown",
        email: l.email,
        phone: l.phone,
        status: l.status || "new",
        source: (l.source || "whatsapp") as any,
        stage: l.status as any,
        lastContact: new Date(l.updated_at || l.created_at),
        createdAt: new Date(l.created_at),
        priority: "high" as const,
        engagement: { messagesSent: 0, messagesOpened: 0 },
        tags: [],
        notes: l.notes || "",
      })),
      highValue: leads.filter(l => l.ai_score && l.ai_score > 80).map(l => ({
        id: l.id,
        name: l.name || "Unknown",
        email: l.email,
        phone: l.phone,
        status: l.status || "new",
        source: (l.source || "whatsapp") as any,
        stage: l.status as any,
        lastContact: new Date(l.updated_at || l.created_at),
        createdAt: new Date(l.created_at),
        priority: "high" as const,
        engagement: { messagesSent: 0, messagesOpened: 0 },
        tags: [],
        notes: l.notes || "",
      })),
      expiring: leads.filter(l => {
        const created = new Date(l.created_at);
        const daysOld = (now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24);
        return daysOld > 7 && l.status !== "won" && l.status !== "lost";
      }).map(l => ({
        id: l.id,
        name: l.name || "Unknown",
        email: l.email,
        phone: l.phone,
        status: l.status || "new",
        source: (l.source || "whatsapp") as any,
        stage: l.status as any,
        lastContact: new Date(l.updated_at || l.created_at),
        createdAt: new Date(l.created_at),
        priority: "medium" as const,
        engagement: { messagesSent: 0, messagesOpened: 0 },
        tags: [],
        notes: l.notes || "",
      })),
    };
  }, [allLeads]);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/10 p-6">
        <div className="max-w-[1600px] mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-3">
                <Target className="h-8 w-8 text-primary" />
                Sales Pipeline
              </h1>
              <p className="text-muted-foreground mt-1">
                Track and close deals faster
              </p>
            </div>
            <div className="flex gap-3">
              <Button onClick={() => navigateToView("crm")}>
                <Users className="h-4 w-4 mr-2" />
                View All Leads
              </Button>
              <Button onClick={() => navigateToView("ai-sales-automation")} variant="outline">
                <Zap className="h-4 w-4 mr-2" />
                Automations
              </Button>
            </div>
          </div>

          {/* Metrics Bar */}
          <DashboardMetricsBar metrics={metricsData} isLoading={isLoading} />

          {/* Main Pipeline Kanban */}
          <PipelineKanban
            stages={pipelineStages}
            onLeadClick={handleLeadClick}
            onViewAll={(stageId) => navigateToView("crm", { status: stageId })}
            isLoading={isLoading}
          />

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Priority Queue */}
            <PriorityQueueCard
              urgent={priorityLeads.urgent}
              highValue={priorityLeads.highValue}
              expiring={priorityLeads.expiring}
              onViewAll={() => navigateToView("crm", { priority: true })}
              onLeadClick={handleLeadClick}
            />

            {/* Conversion Funnel */}
            <ConversionFunnelCard stages={funnelStages} isLoading={isLoading} />
          </div>

          {/* AI Automation Status */}
          <AIAutomationStatusCard
            totalWorkflows={dashboardData?.totalWorkflows ?? 0}
            draftWorkflows={dashboardData?.draftWorkflows ?? 0}
            activeWorkflows={dashboardData?.activeWorkflows ?? 0}
            isLoading={isLoading}
            onNavigate={navigateToView}
          />

          {/* Empty State */}
          {whatsappMetrics && whatsappMetrics.totalWhatsAppLeads === 0 && (
            <WhatsAppEmptyState
              hasOtherLeads={(leadStats?.otherLeads ?? 0) > 0}
              otherLeadsCount={leadStats?.otherLeads ?? 0}
              onNavigate={navigateToView}
            />
          )}
        </div>
      </div>
      
      {showPricing && (
        <PricingScreen 
          onClose={() => setShowPricing(false)}
        />
      )}
    </>
  );
}
