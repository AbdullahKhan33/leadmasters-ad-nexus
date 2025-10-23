import { useState } from "react";
import { dummyLeads, getLeadsByStage, getPriorityLeads, getStageMetrics, Lead } from "@/data/dummyLeads";
import { PriorityQueueCard } from "./PriorityQueueCard";
import { StageSummaryCard } from "./StageSummaryCard";
import { LeadDetailModal } from "./LeadDetailModal";
import { TableFilters } from "./AllLeadsTableView";

interface AutomationPipelineProps {
  onNavigateToTable: (filters: Partial<TableFilters>) => void;
  onLeadClick: (leadId: string) => void;
}

export function AutomationPipeline({ onNavigateToTable, onLeadClick }: AutomationPipelineProps) {
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);

  const priorityLeads = getPriorityLeads();
  const stages: Lead['stage'][] = ['new', 'no-reply', 'qualified', 'nurturing', 'long-term', 'won'];

  const handleLeadClick = (leadId: string) => {
    setSelectedLeadId(leadId);
    onLeadClick(leadId);
  };

  const handleViewStage = (stage: Lead['stage']) => {
    onNavigateToTable({
      stages: [stage],
      sortBy: 'createdAt',
      sortOrder: 'desc'
    });
  };

  const handleViewPriority = () => {
    onNavigateToTable({
      priorities: ['urgent', 'high'],
      sortBy: 'priority',
      sortOrder: 'desc'
    });
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
        onViewAll={handleViewPriority}
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

      {/* Lead Detail Modal */}
      <LeadDetailModal
        open={selectedLeadId !== null}
        onOpenChange={(open) => !open && setSelectedLeadId(null)}
        lead={selectedLead}
        onLeadUpdated={() => {
          // Could trigger a refresh here if using real data
          setSelectedLeadId(null);
        }}
      />
    </div>
  );
}
