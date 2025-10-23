import { useState } from "react";
import { dummyLeads, getLeadsByStage, getPriorityLeads, getStageMetrics, Lead } from "@/data/dummyLeads";
import { PriorityQueueCard } from "./PriorityQueueCard";
import { StageSummaryCard } from "./StageSummaryCard";
import { StageDetailView } from "./StageDetailView";
import { PriorityItemsView } from "./PriorityItemsView";
import { LeadDetailModal } from "./LeadDetailModal";

export function AutomationPipeline() {
  const [selectedStage, setSelectedStage] = useState<Lead['stage'] | null>(null);
  const [showPriorityDetail, setShowPriorityDetail] = useState(false);
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);

  const priorityLeads = getPriorityLeads();
  const stages: Lead['stage'][] = ['new', 'no-reply', 'qualified', 'nurturing', 'long-term', 'won'];

  const handleLeadClick = (leadId: string) => {
    setSelectedLeadId(leadId);
  };

  const handleViewStage = (stage: Lead['stage']) => {
    setSelectedStage(stage);
  };

  const selectedLead = selectedLeadId 
    ? dummyLeads.find(lead => lead.id === selectedLeadId) || null 
    : null;

  return (
    <div className="space-y-6">
      {/* Priority Queue */}
      <PriorityQueueCard
        urgent={priorityLeads.urgent}
        highValue={priorityLeads.highValue}
        expiring={priorityLeads.expiring}
        onViewAll={() => setShowPriorityDetail(true)}
        onLeadClick={handleLeadClick}
      />

      {/* Stage Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stages.map(stage => {
          const leads = getLeadsByStage(stage);
          const metric = getStageMetrics(stage);
          return (
            <StageSummaryCard
              key={stage}
              stage={stage}
              leads={leads}
              metric={metric}
              onViewAll={() => handleViewStage(stage)}
              onLeadClick={handleLeadClick}
            />
          );
        })}
      </div>

      {/* Stage Detail View */}
      <StageDetailView
        open={selectedStage !== null}
        onOpenChange={(open) => !open && setSelectedStage(null)}
        stage={selectedStage}
        leads={selectedStage ? getLeadsByStage(selectedStage) : []}
        onLeadClick={handleLeadClick}
      />

      {/* Priority Items View */}
      <PriorityItemsView
        open={showPriorityDetail}
        onOpenChange={setShowPriorityDetail}
        urgent={priorityLeads.urgent}
        highValue={priorityLeads.highValue}
        expiring={priorityLeads.expiring}
        onLeadClick={handleLeadClick}
      />

      {/* Lead Detail Modal */}
      <LeadDetailModal
        open={selectedLeadId !== null}
        onOpenChange={(open) => !open && setSelectedLeadId(null)}
        lead={selectedLead}
      />
    </div>
  );
}
