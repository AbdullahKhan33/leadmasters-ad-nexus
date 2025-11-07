import { Sparkles, Brain, TrendingUp, Users, Zap, Target, MessageSquare, Award, Activity, BarChart3, CheckCircle2 } from "lucide-react";
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { PricingScreen } from "./PricingScreen";
import { useAuth } from "@/contexts/AuthContext";
import { useWhatsAppMetrics } from "@/hooks/useWhatsAppMetrics";
import { useLeadStats } from "@/hooks/useLeadStats";
import { useDashboardData } from "@/hooks/useDashboardData";
import { Button } from "@/components/ui/button";
import {
  AIAssistantCard,
  SmartGridCard,
  NotificationBar,
  WhatsAppEmptyState,
} from "./dashboard";
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

  // AI Insights data
  const aiInsights = useMemo(() => [
    {
      type: "opportunity" as const,
      title: "5 high-value leads need follow-up",
      description: "AI detected strong buying signals in recent conversations",
      action: "Review Now",
    },
    {
      type: "alert" as const,
      title: "3 leads at risk of going cold",
      description: "No contact in 5+ days, recommend immediate engagement",
      action: "Take Action",
    },
    {
      type: "suggestion" as const,
      title: "Optimize response time",
      description: "Leads contacted within 1 hour are 4x more likely to convert",
      action: "Learn More",
    },
  ], []);

  // Notifications
  const notifications = useMemo(() => [
    {
      id: "1",
      type: "success" as const,
      message: "🎉 2 new high-quality leads from WhatsApp",
    },
    {
      id: "2",
      type: "info" as const,
      message: "📊 Your win rate increased by 12% this week",
    },
    {
      id: "3",
      type: "warning" as const,
      message: "⚡ 8 leads require immediate follow-up",
    },
  ], []);

  // Smart grid metrics
  const totalLeads = whatsappMetrics?.totalWhatsAppLeads || 0;
  const activeWorkflows = dashboardData?.activeWorkflows || 0;
  const wonLeads = whatsappMetrics?.leadsByStatus?.Won || 0;
  const winRate = totalLeads > 0 ? Math.round((wonLeads / totalLeads) * 100) : 0;

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-purple-500/5 p-6">
        {/* Gradient mesh background */}
        <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent pointer-events-none" />
        
        <div className="max-w-[1800px] mx-auto space-y-6 relative">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold flex items-center gap-3 bg-gradient-to-r from-primary via-purple-600 to-primary bg-clip-text text-transparent">
                <Brain className="h-10 w-10 text-primary" />
                AI Intelligence Hub
              </h1>
              <p className="text-muted-foreground mt-2">
                Powered by artificial intelligence • Real-time insights
              </p>
            </div>
            <div className="flex gap-3">
              <Button onClick={() => navigateToView("crm")} variant="outline">
                <Users className="h-4 w-4 mr-2" />
                All Leads
              </Button>
              <Button onClick={() => navigateToView("ai-sales-automation")}>
                <Zap className="h-4 w-4 mr-2" />
                Automations
              </Button>
            </div>
          </div>

          {/* Notification Bar */}
          <NotificationBar notifications={notifications} />

          {/* AI Assistant Card - Full Width */}
          <AIAssistantCard
            insights={aiInsights}
            onActionClick={(insight) => {
              if (insight.type === "opportunity") {
                navigateToView("crm", { aiScore: "high" });
              }
            }}
          />

          {/* Smart Grid - 3x3 Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Lead Score Distribution */}
            <SmartGridCard
              title="Lead Score Distribution"
              icon={Target}
              value={`${Math.round((whatsappMetrics?.qualifiedLeads || 0) / Math.max(totalLeads, 1) * 100)}%`}
              subtitle="High-quality leads"
              trend={{ value: "8%", positive: true }}
              gradient="bg-gradient-to-br from-blue-500 to-blue-600"
              onClick={() => navigateToView("crm")}
            />

            {/* Active Automations */}
            <SmartGridCard
              title="Active Automations"
              icon={Zap}
              value={activeWorkflows}
              subtitle={`${dashboardData?.draftWorkflows || 0} drafts`}
              gradient="bg-gradient-to-br from-purple-500 to-purple-600"
              onClick={() => navigateToView("ai-sales-automation")}
            />

            {/* Revenue Forecast */}
            <SmartGridCard
              title="Revenue Forecast"
              icon={TrendingUp}
              value="$48.2K"
              subtitle="Expected this month"
              trend={{ value: "15%", positive: true }}
              gradient="bg-gradient-to-br from-green-500 to-green-600"
            />

            {/* Conversation Velocity */}
            <SmartGridCard
              title="Conversation Velocity"
              icon={MessageSquare}
              value={`${whatsappMetrics?.activeChats || 0}`}
              subtitle="Active conversations"
              trend={{ value: "12%", positive: true }}
              gradient="bg-gradient-to-br from-orange-500 to-orange-600"
              onClick={() => navigateToView("crm", { status: "active" })}
            />

            {/* Next Best Actions */}
            <SmartGridCard
              title="Next Best Actions"
              icon={CheckCircle2}
              value={`${whatsappMetrics?.agingLeads || 0}`}
              subtitle="Leads need follow-up"
              gradient="bg-gradient-to-br from-red-500 to-red-600"
              onClick={() => navigateToView("crm", { aging: true })}
            />

            {/* Pipeline Health */}
            <SmartGridCard
              title="Pipeline Health"
              icon={Activity}
              value="Excellent"
              subtitle="All stages balanced"
              progress={85}
              gradient="bg-gradient-to-br from-teal-500 to-teal-600"
            />

            {/* Engagement Trends */}
            <SmartGridCard
              title="Engagement Trends"
              icon={BarChart3}
              value={`${whatsappMetrics?.responseRate || 0}%`}
              subtitle="Response rate"
              trend={{ value: "5%", positive: true }}
              gradient="bg-gradient-to-br from-pink-500 to-pink-600"
            />

            {/* Win Rate Analysis */}
            <SmartGridCard
              title="Win Rate Analysis"
              icon={Award}
              value={`${winRate}%`}
              subtitle="Conversion rate"
              trend={{ value: "3%", positive: true }}
              gradient="bg-gradient-to-br from-indigo-500 to-indigo-600"
            />

            {/* Smart Insights */}
            <SmartGridCard
              title="Smart Insights"
              icon={Sparkles}
              value={totalLeads}
              subtitle="Total leads tracked"
              gradient="bg-gradient-to-br from-yellow-500 to-yellow-600"
              onClick={() => navigateToView("crm")}
            />
          </div>

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
