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
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-semibold text-primary">1</span>
                </div>
                <div>
                  <h3 className="font-semibold">Target Audience</h3>
                  <p className="text-sm text-muted-foreground">Select which leads will receive this campaign</p>
                </div>
              </div>

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
                  <div className="flex items-center gap-2 mb-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: selectedSegment.color }}
                    />
                    <p className="font-medium">{selectedSegment.name}</p>
                  </div>
                  {selectedSegment.description && (
                    <p className="text-sm text-muted-foreground">{selectedSegment.description}</p>
                  )}
                  <p className="text-sm font-medium mt-2">
                    Total leads in segment: {selectedSegment.lead_count}
                  </p>
                  {eligibleLeadsCount > 0 && workflowStatus === 'draft' && (
                    <p className="text-sm text-emerald-600 font-medium">
                      Eligible for campaign: {eligibleLeadsCount}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Section 2: Message Sequence */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-semibold text-primary">2</span>
                </div>
                <div>
                  <h3 className="font-semibold">Message Sequence</h3>
                  <p className="text-sm text-muted-foreground">Choose what messages to send and when</p>
                </div>
              </div>

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
                <div className="bg-muted/50 rounded-lg p-4 border space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">{selectedSequence.name}</p>
                    <Badge variant="outline">{selectedSequence.total_steps} steps</Badge>
                  </div>
                  {selectedSequence.description && (
                    <p className="text-sm text-muted-foreground">{selectedSequence.description}</p>
                  )}
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{formatDuration(selectedSequence.total_duration_hours)}</span>
                    </div>
                    {selectedSequence.email_count > 0 && (
                      <div className="flex items-center gap-1">
                        <Mail className="w-4 h-4" />
                        <span>{selectedSequence.email_count} emails</span>
                      </div>
                    )}
                    {selectedSequence.whatsapp_count > 0 && (
                      <div className="flex items-center gap-1">
                        <MessageSquare className="w-4 h-4" />
                        <span>{selectedSequence.whatsapp_count} WhatsApp</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Section 3: Review & Launch */}
            {isConfigured && workflowStatus === 'draft' && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-semibold text-primary">3</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">Review & Launch</h3>
                    <p className="text-sm text-muted-foreground">Campaign is ready to launch</p>
                  </div>
                </div>

                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                      <Users className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-emerald-900 mb-2">Ready to Launch</p>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <p className="text-emerald-700">Target Segment</p>
                          <p className="font-semibold text-emerald-900">{selectedSegment?.name}</p>
                        </div>
                        <div>
                          <p className="text-emerald-700">Message Sequence</p>
                          <p className="font-semibold text-emerald-900">{selectedSequence?.name}</p>
                        </div>
                        <div>
                          <p className="text-emerald-700">Eligible Leads</p>
                          <p className="font-semibold text-emerald-900 text-lg">{eligibleLeadsCount}</p>
                        </div>
                        <div>
                          <p className="text-emerald-700">Total Steps</p>
                          <p className="font-semibold text-emerald-900 text-lg">{selectedSequence?.total_steps}</p>
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