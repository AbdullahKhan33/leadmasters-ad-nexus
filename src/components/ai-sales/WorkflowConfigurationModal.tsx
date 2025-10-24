import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Mail, MessageSquare, Clock, Layers, AlertCircle, Users, Play, Pause, BarChart3 } from "lucide-react";
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
  targetLeadCount?: number;
  processedLeadCount?: number;
  onSave: () => void;
}

export function WorkflowConfigurationModal({
  isOpen,
  onClose,
  workflowId,
  workflowName,
  currentSequence,
  currentSegmentId,
  workflowStatus = 'draft',
  targetLeadCount = 0,
  processedLeadCount = 0,
  onSave
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

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <div>
                <DialogTitle>Configure Automated Campaign</DialogTitle>
                <DialogDescription>
                  Set up targeting and message sequence for <span className="font-semibold text-foreground">{workflowName}</span>
                </DialogDescription>
              </div>
              {workflowStatus !== 'draft' && (
                <Badge variant={workflowStatus === 'active' ? 'default' : 'secondary'}>
                  {workflowStatus === 'active' ? 'Active' : workflowStatus === 'paused' ? 'Paused' : 'Completed'}
                </Badge>
              )}
            </div>
          </DialogHeader>

          <div className="space-y-6">
            {/* Status and Progress for Active Campaigns */}
            {workflowStatus !== 'draft' && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-blue-600" />
                    <h3 className="font-semibold text-blue-900">Campaign Progress</h3>
                  </div>
                  {workflowStatus === 'active' ? (
                    <Button size="sm" variant="outline" onClick={() => handleStatusChange('paused')}>
                      <Pause className="w-4 h-4 mr-1" />
                      Pause
                    </Button>
                  ) : (
                    <Button size="sm" onClick={() => handleStatusChange('active')}>
                      <Play className="w-4 h-4 mr-1" />
                      Resume
                    </Button>
                  )}
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Leads Processed</span>
                    <span className="font-semibold">{processedLeadCount} / {targetLeadCount}</span>
                  </div>
                  <div className="w-full bg-blue-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all"
                      style={{ width: `${targetLeadCount > 0 ? (processedLeadCount / targetLeadCount) * 100 : 0}%` }}
                    />
                  </div>
                </div>
              </div>
            )}

            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {workflowStatus === 'draft' 
                  ? 'Select a target segment and message sequence, then launch to start processing leads.'
                  : 'You can edit the configuration below. Changes will apply to new leads entering the campaign.'}
              </AlertDescription>
            </Alert>

            {/* Segment Selection */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Target Audience (Segment)
              </Label>
              <Select value={selectedSegmentId} onValueChange={handleSegmentChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a segment to target..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">None</SelectItem>
                  {segments.map((seg) => (
                    <SelectItem key={seg.id} value={seg.id}>
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: seg.color }}
                        />
                        {seg.name}
                        <Badge variant="outline" className="text-xs ml-2">
                          {seg.lead_count} leads
                        </Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedSegment && (
                <p className="text-xs text-muted-foreground mt-1">
                  {selectedSegment.description}
                </p>
              )}
            </div>

            {/* Sequence Selection */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Layers className="w-4 h-4" />
                Message Sequence
              </Label>
              <Select value={selectedSequenceId} onValueChange={handleSequenceChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a workflow sequence..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">None</SelectItem>
                  {sequences.map((seq) => (
                    <SelectItem key={seq.id} value={seq.id}>
                      <div className="flex items-center gap-2">
                        <Layers className="w-4 h-4" />
                        {seq.name}
                        <Badge variant="outline" className="text-xs ml-2">
                          {seq.total_steps} steps
                        </Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Eligible Leads Preview */}
            {selectedSegmentId && selectedSequenceId && workflowStatus === 'draft' && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-semibold text-green-900">Ready to Launch</p>
                    <p className="text-sm text-green-700">
                      {eligibleLeadsCount} eligible lead{eligibleLeadsCount !== 1 ? 's' : ''} will receive this {selectedSequence?.total_steps}-step sequence
                    </p>
                  </div>
                </div>
              </div>
            )}

          {/* Preview Selected Sequence */}
          {selectedSequence && (
            <div className="border rounded-lg p-4 space-y-4 bg-muted/30">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-base">{selectedSequence.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedSequence.description}</p>
                </div>
                <Badge>{selectedSequence.is_active ? "Active" : "Inactive"}</Badge>
              </div>

              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Layers className="w-4 h-4 text-muted-foreground" />
                  <span>{selectedSequence.total_steps} steps</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span>{formatDuration(selectedSequence.total_duration_hours)}</span>
                </div>
                {selectedSequence.email_count > 0 && (
                  <Badge variant="outline">
                    <Mail className="w-3 h-3 mr-1" />
                    {selectedSequence.email_count} Email
                  </Badge>
                )}
                {selectedSequence.whatsapp_count > 0 && (
                  <Badge variant="outline">
                    <MessageSquare className="w-3 h-3 mr-1" />
                    {selectedSequence.whatsapp_count} WhatsApp
                  </Badge>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-sm">Sequence Steps:</Label>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {selectedSequence.steps.map((step, index) => (
                    <div key={step.id} className="flex items-start gap-2 text-sm bg-background rounded-lg p-3 border">
                      <Badge variant="outline" className="mt-0.5">{step.step_order}</Badge>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          {step.channel === 'email' ? (
                            <Mail className="w-3 h-3 text-purple-600" />
                          ) : (
                            <MessageSquare className="w-3 h-3 text-green-600" />
                          )}
                          <span className="font-medium">{step.template.name}</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {step.delay_hours === 0 
                            ? 'Sent immediately' 
                            : `Sent after ${formatDuration(step.delay_hours)}`}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

            {/* Action Buttons */}
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
                Cancel
              </Button>
              {workflowStatus === 'draft' ? (
                <Button onClick={handleLaunch} disabled={isSubmitting || !selectedSegmentId || !selectedSequenceId}>
                  <Play className="w-4 h-4 mr-1" />
                  {isSubmitting ? 'Launching...' : 'Launch Campaign'}
                </Button>
              ) : (
                <Button onClick={handleSave} disabled={isSubmitting}>
                  {isSubmitting ? 'Saving...' : 'Save Changes'}
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Launch Confirmation Dialog */}
      <AlertDialog open={showLaunchDialog} onOpenChange={setShowLaunchDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Launch Campaign?</AlertDialogTitle>
            <AlertDialogDescription>
              You're about to launch <span className="font-semibold">{workflowName}</span> for:
              <div className="mt-3 p-3 bg-blue-50 rounded-lg space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Target Segment:</span>
                  <Badge>{selectedSegment?.name}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Message Sequence:</span>
                  <Badge variant="outline">{selectedSequence?.name}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Eligible Leads:</span>
                  <span className="font-bold text-blue-600">{eligibleLeadsCount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Total Steps:</span>
                  <span className="font-semibold">{selectedSequence?.total_steps}</span>
                </div>
              </div>
              <p className="mt-3 text-sm">
                Once launched, the campaign will automatically process leads from the selected segment.
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isSubmitting}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmLaunch} disabled={isSubmitting}>
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
            <AlertDialogAction onClick={confirmStatusChange} disabled={isSubmitting}>
              {isSubmitting ? 'Updating...' : 'Confirm'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}