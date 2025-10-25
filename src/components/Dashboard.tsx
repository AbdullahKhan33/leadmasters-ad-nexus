import { Sparkles } from "lucide-react";
import { useState } from "react";
import { PricingScreen } from "./PricingScreen";
import { useAuth } from "@/contexts/AuthContext";
import { useWhatsAppMetrics } from "@/hooks/useWhatsAppMetrics";
import { useLeadStats } from "@/hooks/useLeadStats";
import { useDashboardData } from "@/hooks/useDashboardData";
import {
  WhatsAppHeroSection,
  WhatsAppMetricsRow,
  HybridQuickActions,
  WhatsAppPipelineChart,
  AIAutomationStatusCard,
  WhatsAppEmptyState,
} from "./dashboard";

export function Dashboard() {
  const [showPricing, setShowPricing] = useState(false);
  const { user } = useAuth();
  
  const { data: whatsappMetrics, isLoading: metricsLoading } = useWhatsAppMetrics(user?.id);
  const { data: leadStats, isLoading: statsLoading } = useLeadStats(user?.id);
  const { data: dashboardData, isLoading: dashboardLoading } = useDashboardData(user?.id);

  const isLoading = metricsLoading || statsLoading || dashboardLoading;

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50/30 p-4">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Welcome Header */}
          <div className="text-center space-y-3 py-6">
            <div className="flex items-center justify-center space-x-2">
              <span className="text-2xl">👋</span>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Welcome back!
              </h1>
              <Sparkles className="w-6 h-6 text-gray-400 animate-pulse" />
            </div>
            <p className="text-sm text-gray-600 max-w-2xl mx-auto">
              Let's close more deals on WhatsApp today
            </p>
          </div>

          {/* WhatsApp Hero Section */}
          <WhatsAppHeroSection
            totalWhatsAppLeads={whatsappMetrics?.totalWhatsAppLeads ?? 0}
            agingLeads={whatsappMetrics?.agingLeads ?? 0}
            isLoading={isLoading}
          />

          {/* WhatsApp Metrics Row */}
          <WhatsAppMetricsRow
            qualifiedLeads={whatsappMetrics?.qualifiedLeads ?? 0}
            activeChats={whatsappMetrics?.activeChats ?? 0}
            agingLeads={whatsappMetrics?.agingLeads ?? 0}
            responseRate={whatsappMetrics?.responseRate ?? 0}
            totalLeads={whatsappMetrics?.totalWhatsAppLeads ?? 0}
            isLoading={isLoading}
          />

          {/* Hybrid Quick Actions */}
          <HybridQuickActions
            agingLeads={whatsappMetrics?.agingLeads ?? 0}
            activeWorkflows={dashboardData?.activeWorkflows ?? 0}
          />

          {/* WhatsApp Pipeline Chart */}
          {whatsappMetrics && whatsappMetrics.totalWhatsAppLeads > 0 && (
            <WhatsAppPipelineChart
              leadsByStatus={whatsappMetrics.leadsByStatus}
              isLoading={isLoading}
            />
          )}

          {/* AI Automation Status */}
          <AIAutomationStatusCard
            totalWorkflows={dashboardData?.totalWorkflows ?? 0}
            draftWorkflows={dashboardData?.draftWorkflows ?? 0}
            activeWorkflows={dashboardData?.activeWorkflows ?? 0}
            isLoading={isLoading}
          />

          {/* Empty State (only show if no WhatsApp leads) */}
          {whatsappMetrics && whatsappMetrics.totalWhatsAppLeads === 0 && (
            <WhatsAppEmptyState
              hasOtherLeads={(leadStats?.otherLeads ?? 0) > 0}
              otherLeadsCount={leadStats?.otherLeads ?? 0}
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
