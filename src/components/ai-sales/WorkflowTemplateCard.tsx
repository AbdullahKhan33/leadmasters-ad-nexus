import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LucideIcon, Layers, Clock, Mail, MessageSquare, Users, BarChart3 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { WorkflowSequenceWithSteps, Segment } from "@/types/campaigns";
import { WorkflowConfigurationModal } from "./WorkflowConfigurationModal";

interface WorkflowTemplateCardProps {
  workflowId: string;
  name: string;
  description: string;
  icon: LucideIcon;
  activeLeads: number;
  successRate: string;
  avgTime: string;
  steps: string;
  isActive: boolean;
  type: string;
}

export function WorkflowTemplateCard({
  workflowId,
  name,
  description,
  icon: Icon,
  activeLeads,
  successRate,
  avgTime,
  steps,
  isActive,
  type
}: WorkflowTemplateCardProps) {
  const [sequence, setSequence] = useState<WorkflowSequenceWithSteps | null>(null);
  const [segment, setSegment] = useState<Segment | null>(null);
  const [workflowStatus, setWorkflowStatus] = useState<string>('draft');
  const [targetLeadCount, setTargetLeadCount] = useState<number>(0);
  const [processedLeadCount, setProcessedLeadCount] = useState<number>(0);
  const [segmentId, setSegmentId] = useState<string | null>(null);
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchWorkflowSequence();
  }, [workflowId]);

  const fetchWorkflowSequence = async () => {
    setIsLoading(true);
    try {
      // Fetch the workflow with all its data
      const { data: workflow, error: workflowError } = await supabase
        .from('automation_workflows')
        .select('workflow_sequence_id, segment_id, workflow_status, target_lead_count, processed_lead_count')
        .eq('id', workflowId)
        .maybeSingle();

      if (workflowError) throw workflowError;

      if (workflow) {
        setWorkflowStatus(workflow.workflow_status || 'draft');
        setTargetLeadCount(workflow.target_lead_count || 0);
        setProcessedLeadCount(workflow.processed_lead_count || 0);
        setSegmentId(workflow.segment_id);

        // Fetch segment if exists
        if (workflow.segment_id) {
          const { data: seg, error: segError } = await supabase
            .from('segments')
            .select('*')
            .eq('id', workflow.segment_id)
            .maybeSingle();

          if (!segError && seg) {
            setSegment(seg as Segment);
          }
        }
      }

      if (workflow?.workflow_sequence_id) {
        // Fetch the sequence with its steps
        const { data: seq, error: seqError } = await supabase
          .from('workflow_sequences')
          .select('*')
          .eq('id', workflow.workflow_sequence_id)
          .single();

        if (seqError) throw seqError;

        // Fetch steps with templates
        const { data: steps, error: stepsError } = await supabase
          .from('workflow_sequence_steps')
          .select(`
            *,
            template:campaign_templates(*)
          `)
          .eq('sequence_id', seq.id)
          .order('step_order', { ascending: true });

        if (stepsError) throw stepsError;

        // Calculate metrics
        const totalDuration = steps?.reduce((acc, step) => Math.max(acc, step.delay_hours), 0) || 0;
        const emailCount = steps?.filter(s => s.channel === 'email').length || 0;
        const whatsappCount = steps?.filter(s => s.channel === 'whatsapp').length || 0;

        setSequence({
          ...seq,
          steps: steps || [],
          total_steps: steps?.length || 0,
          total_duration_hours: totalDuration,
          email_count: emailCount,
          whatsapp_count: whatsappCount
        } as WorkflowSequenceWithSteps);
      }
    } catch (error) {
      console.error('Error fetching workflow sequence:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDuration = (hours: number) => {
    if (hours < 24) return `${hours}h`;
    const days = Math.floor(hours / 24);
    return `${days}d`;
  };

  const getStatusBadge = () => {
    switch (workflowStatus) {
      case 'active':
        return <Badge className="bg-green-600">Active</Badge>;
      case 'paused':
        return <Badge variant="secondary">Paused</Badge>;
      case 'completed':
        return <Badge variant="outline">Completed</Badge>;
      default:
        return <Badge variant="outline">Not Launched</Badge>;
    }
  };

  return (
    <>
      <Card className="hover:shadow-lg transition-all duration-200 group relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 via-pink-50/30 to-blue-50/50 opacity-0 group-hover:opacity-100 transition-opacity" />
        
        <CardHeader className="relative">
          <div className="flex items-start justify-between mb-3">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Icon className="w-6 h-6 text-purple-600" />
            </div>
            {getStatusBadge()}
          </div>
          <CardTitle className="text-base group-hover:text-purple-600 transition-colors">
            {name}
          </CardTitle>
          <CardDescription className="text-xs">{description}</CardDescription>
        </CardHeader>

        <CardContent className="relative space-y-4">
          {/* Segment Info */}
          {segment && (
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-3 border border-indigo-200">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-indigo-600" />
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: segment.color }} />
                  <p className="text-sm font-semibold text-indigo-900">{segment.name}</p>
                </div>
              </div>
            </div>
          )}

          {/* Progress Bar for Active/Paused Workflows */}
          {workflowStatus !== 'draft' && targetLeadCount > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <BarChart3 className="w-3 h-3" />
                  <span>Progress</span>
                </div>
                <span className="font-semibold">{processedLeadCount}/{targetLeadCount} leads</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-1.5 rounded-full transition-all"
                  style={{ width: `${(processedLeadCount / targetLeadCount) * 100}%` }}
                />
              </div>
            </div>
          )}
          {/* Sequence Info */}
          {sequence ? (
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-3 border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <Layers className="w-4 h-4 text-blue-600" />
                <p className="text-sm font-semibold text-blue-900">{sequence.name}</p>
              </div>
              <div className="flex items-center gap-4 text-xs text-blue-700">
                <div className="flex items-center gap-1">
                  <Badge variant="outline" className="text-xs">
                    {sequence.total_steps} steps
                  </Badge>
                </div>
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
          ) : (
            <div className="bg-amber-50 rounded-lg p-3 border border-amber-200">
              <p className="text-xs text-amber-800 font-medium">
                ⚠️ No template sequence configured
              </p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-xs text-muted-foreground">Active Leads</p>
              <p className="text-lg font-bold text-purple-600">{activeLeads}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Success Rate</p>
              <p className="text-lg font-bold text-green-600">{successRate}</p>
            </div>
          </div>

          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Average Time</p>
            <p className="text-sm font-semibold">{avgTime}</p>
          </div>

          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Workflow Steps</p>
            <p className="text-xs leading-relaxed">{steps}</p>
          </div>

          <div className="flex gap-2 pt-2">
            <Button 
              size="sm" 
              className="flex-1 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-500 hover:opacity-90"
            >
              View Details
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              className="flex-1"
              onClick={() => setIsConfigModalOpen(true)}
            >
              Configure
            </Button>
          </div>
        </CardContent>
      </Card>

      <WorkflowConfigurationModal
        isOpen={isConfigModalOpen}
        onClose={() => setIsConfigModalOpen(false)}
        workflowId={workflowId}
        workflowName={name}
        currentSequence={sequence}
        currentSegmentId={segmentId}
        workflowStatus={workflowStatus}
        targetLeadCount={targetLeadCount}
        processedLeadCount={processedLeadCount}
        onSave={() => {
          fetchWorkflowSequence();
          setIsConfigModalOpen(false);
        }}
      />
    </>
  );
}