import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Mail, MessageSquare, Clock, Layers, AlertCircle, Users, Play, Pause, BarChart3, Zap, GitBranch } from "lucide-react";
import { WorkflowSequenceWithSteps, Segment } from "@/types/campaigns";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useSegmentsData } from "@/hooks/useSegmentsData";

interface WorkflowConfigurationModalProps {
  isOpen: boolean;
  onClose: () => void;
  workflowId: string;
  workflowName: string;
  currentSequence: WorkflowSequenceWithSteps | null;
  currentSegmentId?: string | null;
  workflowStatus?: string;
  workflowType?: string;
  targetLeadCount?: number;
  processedLeadCount?: number;
  onSave: () => void;
  onOpenFlowchart?: () => void;
}

export function WorkflowConfigurationModal({
  isOpen,
  onClose,
  workflowId,
  workflowName,
  currentSequence,
  currentSegmentId,
  workflowStatus = 'draft',
  workflowType,
  targetLeadCount = 0,
  processedLeadCount = 0,
  onSave,
  onOpenFlowchart
}: WorkflowConfigurationModalProps) {
  const { toast } = useToast();
  const { segments, isLoading: segmentsLoading } = useSegmentsData();
  const [sequences, setSequences] = useState<WorkflowSequenceWithSteps[]>([]);
  const [selectedSequenceId, setSelectedSequenceId] = useState<string>("");
  const [selectedSequence, setSelectedSequence] = useState<WorkflowSequenceWithSteps | null>(null);
  const [selectedSegmentId, setSelectedSegmentId] = useState<string>("");
  const [selectedSegment, setSelectedSegment] = useState<Segment | null>(null);
  const [eligibleLeadsCount, setEligibleLeadsCount] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showLaunchDialog, setShowLaunchDialog] = useState(false);
  const [showStatusChangeDialog, setShowStatusChangeDialog] = useState(false);
  const [pendingStatus, setPendingStatus] = useState<string>('');

  useEffect(() => {
    if (isOpen) {
      fetchSequences();
      if (currentSequence) {
        setSelectedSequenceId(currentSequence.id);
        setSelectedSequence(currentSequence);
      }
      if (currentSegmentId) {
        setSelectedSegmentId(currentSegmentId);
        const seg = segments.find(s => s.id === currentSegmentId);
        setSelectedSegment(seg || null);
      }
    }
  }, [isOpen, currentSequence, currentSegmentId, segments]);

  useEffect(() => {
    if (selectedSegmentId) {
      fetchEligibleLeadsCount();
    } else {
      setEligibleLeadsCount(0);
    }
  }, [selectedSegmentId]);

  const fetchSequences = async () => {
    try {
      const { data: seqData, error: seqError } = await supabase
        .from('workflow_sequences')
        .select('*')
        .eq('is_active', true)
        .order('name');

      if (seqError) throw seqError;

      // For each sequence, fetch its steps
      const sequencesWithSteps = await Promise.all(
        (seqData || []).map(async (seq) => {
          const { data: steps, error: stepsError } = await supabase
            .from('workflow_sequence_steps')
            .select(`
              *,
              template:campaign_templates(*)
            `)
            .eq('sequence_id', seq.id)
            .order('step_order', { ascending: true });

          if (stepsError) throw stepsError;

          const totalDuration = steps?.reduce((acc, step) => Math.max(acc, step.delay_hours), 0) || 0;
          const emailCount = steps?.filter(s => s.channel === 'email').length || 0;
          const whatsappCount = steps?.filter(s => s.channel === 'whatsapp').length || 0;

          return {
            ...seq,
            steps: steps || [],
            total_steps: steps?.length || 0,
            total_duration_hours: totalDuration,
            email_count: emailCount,
            whatsapp_count: whatsappCount
          } as WorkflowSequenceWithSteps;
        })
      );

      setSequences(sequencesWithSteps);
    } catch (error) {
      console.error('Error fetching sequences:', error);
      toast({
        title: "Error",
        description: "Failed to load workflow sequences",
        variant: "destructive"
      });
    }
  };

  const fetchEligibleLeadsCount = async () => {
    if (!selectedSegmentId) return;
    
    try {
      const segment = segments.find(s => s.id === selectedSegmentId);
      if (!segment) return;

      const { data: user } = await supabase.auth.getUser();
      if (!user.user) return;

      // Query leads matching segment criteria and not in another workflow
      let query = supabase
        .from('leads')
        .select('id', { count: 'exact', head: true })
        .eq('user_id', user.user.id)
        .is('current_workflow_id', null);

      const { count } = await query;
      setEligibleLeadsCount(count || 0);
    } catch (error) {
      console.error('Error fetching eligible leads:', error);
    }
  };

  const handleSegmentChange = (segmentId: string) => {
    setSelectedSegmentId(segmentId);
    const seg = segments.find(s => s.id === segmentId);
    setSelectedSegment(seg || null);
  };

  const handleSequenceChange = (sequenceId: string) => {
    setSelectedSequenceId(sequenceId);
    const seq = sequences.find(s => s.id === sequenceId);
    setSelectedSequence(seq || null);
  };

  const handleLaunch = () => {
    if (!selectedSegmentId || !selectedSequenceId) {
      toast({
        title: "Missing Configuration",
        description: "Please select both a segment and a workflow sequence",
        variant: "destructive"
      });
      return;
    }
    setShowLaunchDialog(true);
  };

  const confirmLaunch = async () => {
    setIsSubmitting(true);
    try {
      const { data: user } = await supabase.auth.getUser();
      
      const { error } = await supabase
        .from('automation_workflows')
        .update({
          segment_id: selectedSegmentId,
          workflow_sequence_id: selectedSequenceId,
          workflow_status: 'active',
          launched_at: new Date().toISOString(),
          launched_by: user.user?.id,
          target_lead_count: eligibleLeadsCount,
          updated_at: new Date().toISOString()
        })
        .eq('id', workflowId);

      if (error) throw error;

      toast({
        title: "Campaign Launched!",
        description: `Successfully launched campaign for ${eligibleLeadsCount} leads`
      });

      setShowLaunchDialog(false);
      onSave();
    } catch (error) {
      console.error('Error launching workflow:', error);
      toast({
        title: "Error",
        description: "Failed to launch workflow",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStatusChange = (newStatus: string) => {
    setPendingStatus(newStatus);
    setShowStatusChangeDialog(true);
  };

  const confirmStatusChange = async () => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('automation_workflows')
        .update({
          workflow_status: pendingStatus,
          updated_at: new Date().toISOString()
        })
        .eq('id', workflowId);

      if (error) throw error;

      toast({
        title: "Status Updated",
        description: `Campaign ${pendingStatus === 'paused' ? 'paused' : 'resumed'} successfully`
      });

      setShowStatusChangeDialog(false);
      onSave();
    } catch (error) {
      console.error('Error updating status:', error);
      toast({
        title: "Error",
        description: "Failed to update campaign status",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSave = async () => {
    setIsSubmitting(true);
    try {
      const updateData: any = {
        workflow_sequence_id: selectedSequenceId || null,
        segment_id: selectedSegmentId || null,
        updated_at: new Date().toISOString()
      };

      // If workflow is active, update target count
      if (workflowStatus === 'active' && selectedSegmentId) {
        updateData.target_lead_count = eligibleLeadsCount;
      }

      const { error } = await supabase
        .from('automation_workflows')
        .update(updateData)
        .eq('id', workflowId);

      if (error) throw error;

      toast({
        title: "Configuration Updated",
        description: "Campaign configuration saved successfully"
      });

      onSave();
    } catch (error) {
      console.error('Error saving workflow configuration:', error);
      toast({
        title: "Error",
        description: "Failed to save campaign configuration",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDuration = (hours: number) => {
    if (hours < 24) return `${hours} hours`;
    const days = Math.floor(hours / 24);
    return `${days} day${days !== 1 ? 's' : ''}`;
  };

  // Show loading state
  if (segmentsLoading) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl">
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading configuration...</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  const isConfigured = selectedSegmentId && selectedSequenceId;
  const canLaunch = isConfigured && workflowStatus === 'draft' && eligibleLeadsCount > 0;
  const isAdvancedBranching = workflowType === 'advanced_branching';

  // For advanced branching campaigns, show different UI
  if (isAdvancedBranching) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <GitBranch className="w-5 h-5" />
              {workflowName}
            </DialogTitle>
            <DialogDescription>
              Advanced Campaign with Visual Flowchart Builder
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* Edit Workflow Button */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-lg p-6 border-2 border-purple-200 dark:border-purple-800 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                  <GitBranch className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-1">Edit Workflow Design</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Modify your workflow logic, add branches, update messages, and adjust timing
                  </p>
                  <Button
                    onClick={() => {
                      if (onOpenFlowchart) {
                        onOpenFlowchart();
                        onClose();
                      }
                    }}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    <GitBranch className="w-4 h-4 mr-2" />
                    Open Workflow Editor
                  </Button>
                </div>
              </div>
            </div>

            {/* Campaign Configuration */}
            <div className="space-y-4">
              {workflowStatus !== 'draft' && (
                <div className="bg-muted rounded-lg p-4 border">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      <h3 className="font-semibold">Campaign Progress</h3>
                    </div>
                    <div className="flex gap-2">
                      {workflowStatus === 'active' && (
                        <Button size="sm" variant="outline" onClick={() => handleStatusChange('paused')}>
                          <Pause className="w-4 h-4 mr-1" />
                          Pause
                        </Button>
                      )}
                      {workflowStatus === 'paused' && (
                        <Button size="sm" onClick={() => handleStatusChange('active')}>
                          <Play className="w-4 h-4 mr-1" />
                          Resume
                        </Button>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Leads Processed</span>
                      <span className="font-semibold">
                        {processedLeadCount} / {targetLeadCount} ({targetLeadCount > 0 ? Math.round((processedLeadCount / targetLeadCount) * 100) : 0}%)
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{ width: `${targetLeadCount > 0 ? (processedLeadCount / targetLeadCount) * 100 : 0}%` }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Target Segment Selection */}
              <div className="bg-card rounded-lg p-4 border">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Target Audience
                </h3>
                <div className="space-y-3">
                  {segments.length === 0 ? (
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        No segments found. Create segments in the CRM to target specific groups of leads.
                      </AlertDescription>
                    </Alert>
                  ) : (
                    <Select value={selectedSegmentId} onValueChange={handleSegmentChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a segment..." />
                      </SelectTrigger>
                      <SelectContent>
                        {segments.map((seg) => (
                          <SelectItem key={seg.id} value={seg.id}>
                            {seg.name} ({seg.lead_count} leads)
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}

                  {selectedSegment && (
                    <div className="bg-muted/50 rounded-lg p-3 border">
                      <div className="flex items-center gap-2 mb-1">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: selectedSegment.color }}
                        />
                        <p className="font-medium text-sm">{selectedSegment.name}</p>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Users className="w-3 h-3" />
                        <span>{eligibleLeadsCount} eligible leads</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-2 pt-2">
              {workflowStatus === 'draft' && canLaunch && (
                <Button 
                  onClick={handleLaunch}
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Launch Campaign
                </Button>
              )}
              {isConfigured && workflowStatus === 'draft' && !canLaunch && (
                <Button onClick={handleSave} disabled={isSubmitting}>
                  Save Configuration
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <div>
                <DialogTitle className="text-2xl">Configure Campaign</DialogTitle>
                <DialogDescription className="mt-1">
                  {workflowName}
                </DialogDescription>
              </div>
              {workflowStatus !== 'draft' && (
                <Badge 
                  className={workflowStatus === 'active' ? 'bg-emerald-600' : 'bg-amber-600'}
                >
                  {workflowStatus === 'active' ? 'Active' : workflowStatus === 'paused' ? 'Paused' : 'Completed'}
                </Badge>
              )}
            </div>
          </DialogHeader>

          <div className="space-y-6 mt-4">
            {/* Progress for Active/Paused Campaigns */}
            {workflowStatus !== 'draft' && (
              <div className="bg-muted rounded-lg p-4 border">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    <h3 className="font-semibold">Campaign Progress</h3>
                  </div>
                  <div className="flex gap-2">
                    {workflowStatus === 'active' && (
                      <Button size="sm" variant="outline" onClick={() => handleStatusChange('paused')}>
                        <Pause className="w-4 h-4 mr-1" />
                        Pause Campaign
                      </Button>
                    )}
                    {workflowStatus === 'paused' && (
                      <Button size="sm" onClick={() => handleStatusChange('active')}>
                        <Play className="w-4 h-4 mr-1" />
                        Resume Campaign
                      </Button>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Leads Processed</span>
                    <span className="font-semibold">
                      {processedLeadCount} / {targetLeadCount} ({targetLeadCount > 0 ? Math.round((processedLeadCount / targetLeadCount) * 100) : 0}%)
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all"
                      style={{ width: `${targetLeadCount > 0 ? (processedLeadCount / targetLeadCount) * 100 : 0}%` }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Section 1: Target Audience */}
            <div className="bg-card rounded-lg p-6 border shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center shadow-sm">
                  <span className="text-lg font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">1</span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Target Audience</h3>
                  <p className="text-sm text-muted-foreground">Select which leads will receive this campaign</p>
                </div>
              </div>

              <div className="space-y-3">
                {segments.length === 0 ? (
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      No segments found. Create segments in the CRM to target specific groups of leads.
                    </AlertDescription>
                  </Alert>
                ) : (
                  <Select value={selectedSegmentId} onValueChange={handleSegmentChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a segment..." />
                    </SelectTrigger>
                    <SelectContent>
                      {segments.map((seg) => (
                        <SelectItem key={seg.id} value={seg.id}>
                          {seg.name} ({seg.lead_count} leads)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}

                {selectedSegment && (
                  <div className="bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-lg p-4 border-2 border-blue-200/50 dark:border-blue-800/50 shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <div 
                        className="w-4 h-4 rounded-full shadow-sm" 
                        style={{ backgroundColor: selectedSegment.color }}
                      />
                      <p className="font-semibold text-base">{selectedSegment.name}</p>
                    </div>
                    {selectedSegment.description && (
                      <p className="text-sm text-muted-foreground mb-3">{selectedSegment.description}</p>
                    )}
                    <div className="flex items-center gap-4 pt-2 border-t border-blue-200/50">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-semibold">
                          {selectedSegment.lead_count} total leads
                        </span>
                      </div>
                      {eligibleLeadsCount > 0 && workflowStatus === 'draft' && (
                        <Badge className="bg-emerald-500/10 text-emerald-700 border-emerald-500/20">
                          {eligibleLeadsCount} eligible
                        </Badge>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Section 2: Message Sequence */}
            <div className="bg-card rounded-lg p-6 border shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center shadow-sm">
                  <span className="text-lg font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">2</span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Message Sequence</h3>
                  <p className="text-sm text-muted-foreground">Choose what messages to send and when</p>
                </div>
              </div>

              <div className="space-y-3">
                {sequences.length === 0 ? (
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      No sequences found. Create workflow sequences in Templates to use here.
                    </AlertDescription>
                  </Alert>
                ) : (
                  <Select value={selectedSequenceId} onValueChange={handleSequenceChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a sequence..." />
                    </SelectTrigger>
                    <SelectContent>
                      {sequences.map((seq) => (
                        <SelectItem key={seq.id} value={seq.id}>
                          {seq.name} ({seq.total_steps} steps)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}

                {/* Sequence Preview */}
                {selectedSequence && (
                  <div className="bg-gradient-to-br from-purple-50/50 to-pink-50/50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-lg p-4 border-2 border-purple-200/50 dark:border-purple-800/50 shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                      <p className="font-semibold text-base">{selectedSequence.name}</p>
                      <Badge variant="outline" className="bg-white dark:bg-gray-900 shadow-sm">
                        <Layers className="w-3 h-3 mr-1" />
                        {selectedSequence.total_steps} steps
                      </Badge>
                    </div>
                    {selectedSequence.description && (
                      <p className="text-sm text-muted-foreground mb-3">{selectedSequence.description}</p>
                    )}
                    <div className="flex items-center gap-4 text-sm pt-2 border-t border-purple-200/50">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-purple-600" />
                        <span className="font-medium">{formatDuration(selectedSequence.total_duration_hours)}</span>
                      </div>
                      {selectedSequence.email_count > 0 && (
                        <div className="flex items-center gap-1.5">
                          <Mail className="w-4 h-4 text-purple-600" />
                          <span className="font-medium">{selectedSequence.email_count} emails</span>
                        </div>
                      )}
                      {selectedSequence.whatsapp_count > 0 && (
                        <div className="flex items-center gap-1.5">
                          <MessageSquare className="w-4 h-4 text-purple-600" />
                          <span className="font-medium">{selectedSequence.whatsapp_count} WhatsApp</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Section 3: Review & Launch */}
            {isConfigured && workflowStatus === 'draft' && (
              <div className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-950/30 dark:to-green-950/30 rounded-lg p-6 border-2 border-emerald-200/50 dark:border-emerald-800/50 shadow-lg">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500/20 to-green-500/20 flex items-center justify-center shadow-sm">
                    <span className="text-lg font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">3</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-emerald-900 dark:text-emerald-100">Review & Launch</h3>
                    <p className="text-sm text-emerald-700 dark:text-emerald-300">Campaign is ready to launch</p>
                  </div>
                </div>

                <div className="bg-white/80 dark:bg-gray-900/50 rounded-lg p-5 border border-emerald-200/50 shadow-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center flex-shrink-0 shadow-md">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-lg text-emerald-900 dark:text-emerald-100 mb-3">Ready to Launch</p>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="bg-emerald-50/50 dark:bg-emerald-950/20 rounded-lg p-3 border border-emerald-200/30">
                          <p className="text-emerald-700 dark:text-emerald-400 text-xs font-medium mb-1">Target Segment</p>
                          <p className="font-semibold text-emerald-900 dark:text-emerald-100">{selectedSegment?.name}</p>
                        </div>
                        <div className="bg-emerald-50/50 dark:bg-emerald-950/20 rounded-lg p-3 border border-emerald-200/30">
                          <p className="text-emerald-700 dark:text-emerald-400 text-xs font-medium mb-1">Message Sequence</p>
                          <p className="font-semibold text-emerald-900 dark:text-emerald-100">{selectedSequence?.name}</p>
                        </div>
                        <div className="bg-emerald-50/50 dark:bg-emerald-950/20 rounded-lg p-3 border border-emerald-200/30">
                          <p className="text-emerald-700 dark:text-emerald-400 text-xs font-medium mb-1">Eligible Leads</p>
                          <p className="font-bold text-emerald-900 dark:text-emerald-100 text-2xl">{eligibleLeadsCount}</p>
                        </div>
                        <div className="bg-emerald-50/50 dark:bg-emerald-950/20 rounded-lg p-3 border border-emerald-200/30">
                          <p className="text-emerald-700 dark:text-emerald-400 text-xs font-medium mb-1">Total Steps</p>
                          <p className="font-bold text-emerald-900 dark:text-emerald-100 text-2xl">{selectedSequence?.total_steps}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
                Cancel
              </Button>
              {workflowStatus === 'draft' ? (
                <Button 
                  onClick={handleLaunch} 
                  disabled={isSubmitting || !canLaunch}
                  className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 hover:from-blue-700 hover:via-purple-700 hover:to-pink-600 text-white"
                >
                  <Play className="w-4 h-4 mr-2" />
                  {isSubmitting ? 'Launching...' : 'Launch Campaign'}
                </Button>
              ) : (
                <Button 
                  onClick={handleSave} 
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 hover:from-blue-700 hover:via-purple-700 hover:to-pink-600 text-white"
                >
                  {isSubmitting ? 'Saving...' : 'Save Changes'}
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Launch Confirmation Dialog */}
      <AlertDialog open={showLaunchDialog} onOpenChange={setShowLaunchDialog}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center">
                <Play className="w-5 h-5 text-white" />
              </div>
              Launch Campaign?
            </AlertDialogTitle>
            <AlertDialogDescription className="space-y-4 pt-2">
              <p className="text-base">
                You're about to launch <span className="font-semibold text-foreground">{workflowName}</span>:
              </p>
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 rounded-lg p-4 space-y-3 border-2 border-blue-200/50 dark:border-blue-800/50 shadow-sm">
                <div className="flex items-center justify-between pb-2 border-b border-blue-200/50">
                  <span className="text-sm font-medium">Target Segment:</span>
                  <Badge className="bg-blue-500/10 text-blue-700 border-blue-500/20">{selectedSegment?.name}</Badge>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-purple-200/50">
                  <span className="text-sm font-medium">Message Sequence:</span>
                  <Badge variant="outline" className="bg-purple-500/10 text-purple-700 border-purple-500/20">{selectedSequence?.name}</Badge>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-emerald-200/50">
                  <span className="text-sm font-medium">Eligible Leads:</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 text-lg">{eligibleLeadsCount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Total Steps:</span>
                  <span className="font-semibold text-foreground">{selectedSequence?.total_steps}</span>
                </div>
              </div>
              <p className="text-sm bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3">
                Once launched, the campaign will automatically process leads from the selected segment.
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isSubmitting}>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmLaunch} 
              disabled={isSubmitting}
              className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 hover:from-blue-700 hover:via-purple-700 hover:to-pink-600 text-white"
            >
              {isSubmitting ? 'Launching...' : 'Confirm Launch'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Status Change Confirmation Dialog */}
      <AlertDialog open={showStatusChangeDialog} onOpenChange={setShowStatusChangeDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {pendingStatus === 'paused' ? 'Pause' : 'Resume'} Campaign?
            </AlertDialogTitle>
            <AlertDialogDescription>
              {pendingStatus === 'paused' 
                ? 'This will pause the campaign. No new messages will be sent until you resume it.'
                : 'This will resume the campaign and continue processing leads.'}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isSubmitting}>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmStatusChange} 
              disabled={isSubmitting}
              className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 hover:from-blue-700 hover:via-purple-700 hover:to-pink-600 text-white"
            >
              {isSubmitting ? 'Updating...' : 'Confirm'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}