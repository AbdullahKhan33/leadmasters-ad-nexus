import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Layers, Clock, Mail, MessageSquare, Users, BarChart3, Rocket, Play, Pause, Settings } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { WorkflowSequenceWithSteps, Segment } from "@/types/campaigns";
import { WorkflowConfigurationModal } from "./WorkflowConfigurationModal";

interface WorkflowTemplateCardProps {
  workflowId: string;
  onRefresh?: () => void;
}

export function WorkflowTemplateCard({ workflowId, onRefresh }: WorkflowTemplateCardProps) {
  const [workflow, setWorkflow] = useState<any>(null);
  const [sequence, setSequence] = useState<WorkflowSequenceWithSteps | null>(null);
  const [segment, setSegment] = useState<Segment | null>(null);
  const [eligibleLeads, setEligibleLeads] = useState<number>(0);
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchWorkflowData();
  }, [workflowId]);

  const fetchWorkflowData = async () => {
    setIsLoading(true);
    try {
      // Fetch the workflow
      const { data: workflowData, error: workflowError } = await supabase
        .from('automation_workflows')
        .select('*')
        .eq('id', workflowId)
        .maybeSingle();

      if (workflowError) throw workflowError;
      if (!workflowData) return;

      setWorkflow(workflowData);

      // Fetch segment if exists
      if (workflowData.segment_id) {
        const { data: segmentData, error: segError } = await supabase
          .from('segments')
          .select('*')
          .eq('id', workflowData.segment_id)
          .maybeSingle();

        if (!segError && segmentData) {
          setSegment(segmentData as Segment);
          
          // Calculate eligible leads
          const { count } = await supabase
            .from('leads')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', workflowData.user_id)
            .is('current_workflow_id', null);
          
          setEligibleLeads(count || 0);
        }
      }

      // Fetch sequence if exists
      if (workflowData.workflow_sequence_id) {
        const { data: seqData, error: seqError } = await supabase
          .from('workflow_sequences')
          .select('*')
          .eq('id', workflowData.workflow_sequence_id)
          .maybeSingle();

        if (!seqError && seqData) {
          // Fetch steps
          const { data: stepsData, error: stepsError } = await supabase
            .from('workflow_sequence_steps')
            .select('*')
            .eq('sequence_id', seqData.id)
            .order('step_order', { ascending: true });

          if (!stepsError && stepsData) {
            const totalDuration = stepsData.reduce((acc, step) => Math.max(acc, step.delay_hours), 0);
            const emailCount = stepsData.filter(s => s.channel === 'email').length;
            const whatsappCount = stepsData.filter(s => s.channel === 'whatsapp').length;

            setSequence({
              ...seqData,
              steps: stepsData || [],
              total_steps: stepsData.length,
              total_duration_hours: totalDuration,
              email_count: emailCount,
              whatsapp_count: whatsappCount
            } as WorkflowSequenceWithSteps);
          }
        }
      }
    } catch (error) {
      console.error('Error fetching workflow data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDuration = (hours: number) => {
    if (hours < 24) return `${hours}h`;
    const days = Math.floor(hours / 24);
    return `${days}d`;
  };

  if (isLoading || !workflow) {
    return (
      <Card className="animate-pulse">
        <CardHeader>
          <div className="h-4 bg-muted rounded w-3/4" />
          <div className="h-3 bg-muted rounded w-1/2 mt-2" />
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="h-20 bg-muted rounded" />
            <div className="h-10 bg-muted rounded" />
          </div>
        </CardContent>
      </Card>
    );
  }

  const isConfigured = workflow.segment_id && workflow.workflow_sequence_id;
  const isActive = workflow.workflow_status === 'active';
  const isPaused = workflow.workflow_status === 'paused';
  const isDraft = workflow.workflow_status === 'draft';

  const getStatusBadge = () => {
    if (isActive) return <Badge className="bg-emerald-600 hover:bg-emerald-700">Active</Badge>;
    if (isPaused) return <Badge className="bg-amber-600 hover:bg-amber-700">Paused</Badge>;
    return <Badge variant="outline">Draft</Badge>;
  };

  const handleStatusChange = async (newStatus: string) => {
    try {
      const { error } = await supabase
        .from('automation_workflows')
        .update({ workflow_status: newStatus })
        .eq('id', workflowId);

      if (error) throw error;
      
      await fetchWorkflowData();
      onRefresh?.();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
    <>
      <Card className="hover:shadow-lg transition-all duration-200">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                {getStatusBadge()}
                {isActive && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleStatusChange('paused')}
                    className="h-6 px-2"
                  >
                    <Pause className="w-3 h-3 mr-1" />
                    Pause
                  </Button>
                )}
                {isPaused && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleStatusChange('active')}
                    className="h-6 px-2"
                  >
                    <Play className="w-3 h-3 mr-1" />
                    Resume
                  </Button>
                )}
              </div>
              <CardTitle className="text-lg">{workflow.name}</CardTitle>
              {workflow.description && (
                <CardDescription className="mt-1">{workflow.description}</CardDescription>
              )}
            </div>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setIsConfigModalOpen(true)}
            >
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Show configuration status for draft campaigns */}
          {isDraft && !isConfigured && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-amber-900 mb-2">Setup Required</p>
                  <ul className="text-sm text-amber-800 space-y-1">
                    {!workflow.segment_id && <li>• Target segment not selected</li>}
                    {!workflow.workflow_sequence_id && <li>• Message sequence not selected</li>}
                  </ul>
                  <Button
                    size="sm"
                    className="mt-3 bg-amber-600 hover:bg-amber-700"
                    onClick={() => setIsConfigModalOpen(true)}
                  >
                    Configure Campaign
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Show configured status for draft campaigns that are ready */}
          {isDraft && isConfigured && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <BarChart3 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="font-semibold text-emerald-900 mb-3">✓ Fully Configured</p>
                  
                  {segment && (
                    <div className="flex items-center gap-2 text-sm text-emerald-800 mb-2">
                      <Users className="w-4 h-4" />
                      <span>Segment: <strong>{segment.name}</strong> ({segment.lead_count} leads)</span>
                    </div>
                  )}
                  
                  {sequence && (
                    <div className="flex items-center gap-2 text-sm text-emerald-800 mb-2">
                      <Layers className="w-4 h-4" />
                      <span>Sequence: <strong>{sequence.name}</strong> ({sequence.total_steps} steps, {formatDuration(sequence.total_duration_hours)})</span>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-2 text-sm text-emerald-800">
                    <Rocket className="w-4 h-4" />
                    <span>Ready to launch for <strong>{eligibleLeads} eligible leads</strong></span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Segment Info for active/paused */}
          {!isDraft && segment && (
            <div className="bg-muted rounded-lg p-3 border">
              <div className="flex items-center gap-2 mb-1">
                <Users className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">Target Segment</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: segment.color }} />
                <p className="text-sm font-semibold">{segment.name}</p>
              </div>
            </div>
          )}

          {/* Sequence Info for active/paused */}
          {!isDraft && sequence && (
            <div className="bg-muted rounded-lg p-3 border">
              <div className="flex items-center gap-2 mb-2">
                <Layers className="w-4 h-4 text-muted-foreground" />
                <p className="text-sm font-medium">{sequence.name}</p>
              </div>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <Badge variant="outline" className="text-xs">
                  {sequence.total_steps} steps
                </Badge>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{formatDuration(sequence.total_duration_hours)}</span>
                </div>
                {sequence.email_count > 0 && (
                  <div className="flex items-center gap-1">
                    <Mail className="w-3 h-3" />
                    <span>{sequence.email_count}</span>
                  </div>
                )}
                {sequence.whatsapp_count > 0 && (
                  <div className="flex items-center gap-1">
                    <MessageSquare className="w-3 h-3" />
                    <span>{sequence.whatsapp_count}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Progress Bar for Active/Paused */}
          {!isDraft && workflow.target_lead_count > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-semibold">
                  {workflow.processed_lead_count}/{workflow.target_lead_count} leads ({Math.round((workflow.processed_lead_count / workflow.target_lead_count) * 100)}%)
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all"
                  style={{ width: `${(workflow.processed_lead_count / workflow.target_lead_count) * 100}%` }}
                />
              </div>
            </div>
          )}

          {/* Action buttons */}
          {isDraft && isConfigured && (
            <Button
              className="w-full"
              onClick={() => setIsConfigModalOpen(true)}
            >
              <Rocket className="w-4 h-4 mr-2" />
              Launch Campaign
            </Button>
          )}
        </CardContent>
      </Card>

      <WorkflowConfigurationModal
        isOpen={isConfigModalOpen}
        onClose={() => setIsConfigModalOpen(false)}
        workflowId={workflowId}
        workflowName={workflow.name}
        currentSequence={sequence}
        currentSegmentId={workflow.segment_id}
        workflowStatus={workflow.workflow_status}
        targetLeadCount={workflow.target_lead_count}
        processedLeadCount={workflow.processed_lead_count}
        onSave={() => {
          fetchWorkflowData();
          onRefresh?.();
          setIsConfigModalOpen(false);
        }}
      />
    </>
  );
}