import { useState, useEffect, useMemo } from "react";
import { Lead } from "@/data/dummyLeads";
import { PriorityQueueCard } from "./PriorityQueueCard";
import { StageSummaryCard } from "./StageSummaryCard";
import { AILeadDetailModal } from "./AILeadDetailModal";
import { TableFilters } from "./AllLeadsTableView";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ensureSeedAiAutomationLeads } from "@/utils/seedAiLeads";

interface AutomationPipelineProps {
  onNavigateToTable: (filters: Partial<TableFilters>) => void;
  onLeadClick: (leadId: string) => void;
}

export function AutomationPipeline({ onNavigateToTable, onLeadClick }: AutomationPipelineProps) {
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const fetchLeads = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .eq('lead_source_type', 'ai_automation')
        .order('created_at', { ascending: false });
      if (error) throw error;

      const mapDbStageToUiStage = (dbStage?: string | null): Lead['stage'] => {
        switch (dbStage) {
          case 'no_reply': return 'no-reply';
          case 'nurturing_7day': return 'nurturing';
          case 'long_term': return 'long-term';
          case 'qualified': return 'qualified';
          case 'won': return 'won';
          default: return 'new';
        }
      };
      const converted: Lead[] = (data || []).map((dbLead: any) => {
        const stage = mapDbStageToUiStage(dbLead.workflow_stage);
        const aiScoreNum = dbLead.ai_score ? dbLead.ai_score / 100 : undefined;
        let priority: Lead['priority'] = 'medium';
        if (stage === 'no-reply' || (aiScoreNum && aiScoreNum >= 0.85) || (typeof dbLead.status === 'string' && /urgent/i.test(dbLead.status))) {
          priority = 'urgent';
        } else if ((aiScoreNum && aiScoreNum >= 0.75) || stage === 'qualified') {
          priority = 'high';
        } else if (stage === 'long-term') {
          priority = 'low';
        }
        return {
          id: dbLead.id,
          name: dbLead.name,
          phone: dbLead.phone,
          email: dbLead.email || '',
          source: (dbLead.source || 'Custom API') as Lead['source'],
          stage,
          status: dbLead.status || '',
          lastMessage: dbLead.last_message || '',
          timestamp: new Date(dbLead.created_at).toLocaleString(),
          aiScore: aiScoreNum,
          lastContact: new Date(dbLead.last_interaction_at || dbLead.created_at),
          priority,
          engagement: { messagesSent: 0, messagesOpened: 0 },
          assignedTo: dbLead.assigned_agent_id ? 'Agent' : undefined,
          tags: [],
          createdAt: new Date(dbLead.created_at),
          notes: dbLead.notes,
          user_id: dbLead.user_id,
          lead_source_type: dbLead.lead_source_type,
          workflow_stage: dbLead.workflow_stage,
          current_workflow_id: dbLead.current_workflow_id,
          assigned_agent_id: dbLead.assigned_agent_id,
          last_interaction_at: dbLead.last_interaction_at,
          created_at: dbLead.created_at,
          source_metadata: dbLead.source_metadata,
        } as Lead;
      });
      setLeads(converted);
    } catch (e) {
      console.error('Failed to load leads', e);
      toast({ title: 'Error', description: 'Failed to load pipeline leads', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      await ensureSeedAiAutomationLeads(150);
      await fetchLeads();
    })();
  }, []);

  const stages: Lead['stage'][] = ['new', 'no-reply', 'qualified', 'nurturing', 'long-term', 'won'];

  const leadsByStage = useMemo(() => {
    const init: Record<Lead['stage'], Lead[]> = {
      'new': [], 'no-reply': [], 'qualified': [], 'nurturing': [], 'long-term': [], 'won': []
    };
    leads.forEach(l => {
      const s = (l.stage || 'new') as Lead['stage'];
      if (init[s]) init[s].push(l);
    });
    return init;
  }, [leads]);

  const priorityLeads = useMemo(() => {
    const urgent = leads.filter(l => l.stage === 'no-reply' || (l.aiScore && l.aiScore >= 0.85)).slice(0, 5);
    const highValue = leads.filter(l => l.aiScore && l.aiScore > 0.85 && l.stage === 'qualified').slice(0, 3);
    const sevenDays = 7 * 24 * 60 * 60 * 1000;
    const expiring = leads.filter(l => (Date.now() - l.lastContact.getTime()) > sevenDays).slice(0, 5);
    return { urgent, highValue, expiring };
  }, [leads]);

  const getMetric = (stage: Lead['stage']) => {
    const stageLeads = leadsByStage[stage] || [];
    if (stage === 'new') {
      const today = stageLeads.filter(l => Date.now() - l.createdAt.getTime() < 24 * 60 * 60 * 1000).length;
      return `${today} today`;
    }
    if (stage === 'qualified') {
      if (stageLeads.length === 0) return 'Avg 0h to qualify';
      const avgMs = stageLeads.reduce((acc, l) => acc + (l.lastContact.getTime() - l.createdAt.getTime()), 0) / stageLeads.length;
      const hours = Math.max(0, Math.round((avgMs / (1000 * 60 * 60)) * 10) / 10);
      return `Avg ${hours}h to qualify`;
    }
    return `${stageLeads.length} leads`;
  };

  const handleLeadClick = (leadId: string) => {
    setSelectedLeadId(leadId);
    onLeadClick(leadId);
  };

  const handleViewStage = (stage: Lead['stage']) => {
    onNavigateToTable({
      stages: [stage],
      sortBy: 'created_at',
      sortOrder: 'desc',
    });
  };

  const handleViewPriority = () => {
    onNavigateToTable({
      priorities: ['urgent', 'high'],
      sortBy: 'priority',
      sortOrder: 'desc',
    });
  };

  const selectedLead = selectedLeadId ? (leads.find(l => l.id === selectedLeadId) || null) : null;

  const handleLeadUpdate = async (leadId: string, updates: any) => {
    try {
      const payload: any = {
        name: updates.name,
        phone: updates.phone,
        email: updates.email,
        source: updates.source,
        status: updates.status,
        list: updates.list,
        category: updates.category,
        notes: updates.notes,
        last_message: updates.lastMessage,
        source_metadata: updates.source_metadata,
        updated_at: new Date().toISOString(),
      };
      Object.keys(payload).forEach((k) => payload[k] === undefined && delete payload[k]);
      const { error } = await supabase.from('leads').update(payload).eq('id', leadId);
      if (error) throw error;
      setLeads(prev => prev.map(l => l.id === leadId ? { ...l, ...{
        name: payload.name ?? l.name,
        phone: payload.phone ?? l.phone,
        email: payload.email ?? l.email,
        source: (payload.source as any) ?? l.source,
        status: payload.status ?? l.status,
        notes: payload.notes ?? l.notes,
      }} : l));
      toast({ title: 'Lead updated', description: 'Changes saved successfully.' });
    } catch (e) {
      console.error('Failed to update lead', e);
      toast({ title: 'Update failed', description: 'Could not save changes', variant: 'destructive' });
    } finally {
      setSelectedLeadId(null);
    }
  };

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
        {stages.map(stage => (
          <StageSummaryCard
            key={stage}
            stage={stage}
            leads={leadsByStage[stage]}
            metric={getMetric(stage)}
            onViewAll={() => handleViewStage(stage)}
            onLeadClick={handleLeadClick}
          />
        ))}
      </div>

      {/* Lead Detail Modal */}
      <AILeadDetailModal
        lead={selectedLead}
        isOpen={selectedLeadId !== null}
        onClose={() => setSelectedLeadId(null)}
        onUpdate={handleLeadUpdate}
      />
    </div>
  );
}
