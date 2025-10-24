import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Mail, MessageSquare, Clock, Layers, AlertCircle } from "lucide-react";
import { WorkflowSequenceWithSteps } from "@/types/campaigns";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface WorkflowConfigurationModalProps {
  isOpen: boolean;
  onClose: () => void;
  workflowId: string;
  workflowName: string;
  currentSequence: WorkflowSequenceWithSteps | null;
  onSave: () => void;
}

export function WorkflowConfigurationModal({
  isOpen,
  onClose,
  workflowId,
  workflowName,
  currentSequence,
  onSave
}: WorkflowConfigurationModalProps) {
  const { toast } = useToast();
  const [sequences, setSequences] = useState<WorkflowSequenceWithSteps[]>([]);
  const [selectedSequenceId, setSelectedSequenceId] = useState<string>("");
  const [selectedSequence, setSelectedSequence] = useState<WorkflowSequenceWithSteps | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchSequences();
      if (currentSequence) {
        setSelectedSequenceId(currentSequence.id);
        setSelectedSequence(currentSequence);
      }
    }
  }, [isOpen, currentSequence]);

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

  const handleSequenceChange = (sequenceId: string) => {
    setSelectedSequenceId(sequenceId);
    const seq = sequences.find(s => s.id === sequenceId);
    setSelectedSequence(seq || null);
  };

  const handleSave = async () => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('automation_workflows')
        .update({
          workflow_sequence_id: selectedSequenceId || null,
          updated_at: new Date().toISOString()
        })
        .eq('id', workflowId);

      if (error) throw error;

      toast({
        title: "Success",
        description: selectedSequenceId 
          ? "Workflow sequence configured successfully"
          : "Workflow sequence removed"
      });

      onSave();
    } catch (error) {
      console.error('Error saving workflow configuration:', error);
      toast({
        title: "Error",
        description: "Failed to save workflow configuration",
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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Configure Workflow Template Sequence</DialogTitle>
          <DialogDescription>
            Link a template sequence to <span className="font-semibold text-foreground">{workflowName}</span>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              When a lead enters this workflow stage, the selected sequence will automatically execute.
            </AlertDescription>
          </Alert>

          <div className="space-y-2">
            <Label>Select Template Sequence</Label>
            <Select value={selectedSequenceId} onValueChange={handleSequenceChange}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a workflow sequence..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">None (Remove sequence)</SelectItem>
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

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Save Configuration'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}