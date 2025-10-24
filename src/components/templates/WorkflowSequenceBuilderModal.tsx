import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, GripVertical, Mail, MessageSquare } from "lucide-react";
import { WorkflowSequenceWithSteps, CampaignTemplate } from "@/types/campaigns";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface WorkflowSequenceBuilderModalProps {
  isOpen: boolean;
  onClose: () => void;
  sequence?: WorkflowSequenceWithSteps | null;
  onSave: () => void;
}

interface SequenceStepForm {
  template_id: string;
  step_order: number;
  delay_hours: number;
  channel: 'email' | 'whatsapp';
}

export function WorkflowSequenceBuilderModal({ 
  isOpen, 
  onClose, 
  sequence, 
  onSave 
}: WorkflowSequenceBuilderModalProps) {
  const { toast } = useToast();
  const [templates, setTemplates] = useState<CampaignTemplate[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("#8B5CF6");
  const [steps, setSteps] = useState<SequenceStepForm[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchTemplates();
      if (sequence) {
        setName(sequence.name);
        setDescription(sequence.description || "");
        setColor(sequence.color);
        setSteps(sequence.steps.map(step => ({
          template_id: step.template_id,
          step_order: step.step_order,
          delay_hours: step.delay_hours,
          channel: step.channel
        })));
      } else {
        resetForm();
      }
    }
  }, [isOpen, sequence]);

  const fetchTemplates = async () => {
    const { data, error } = await supabase
      .from('campaign_templates')
      .select('*')
      .eq('is_active', true)
      .order('name');
    
    if (!error && data) {
      setTemplates(data as CampaignTemplate[]);
    }
  };

  const resetForm = () => {
    setName("");
    setDescription("");
    setColor("#8B5CF6");
    setSteps([]);
  };

  const addStep = () => {
    setSteps([...steps, {
      template_id: "",
      step_order: steps.length + 1,
      delay_hours: 0,
      channel: 'email'
    }]);
  };

  const removeStep = (index: number) => {
    const newSteps = steps.filter((_, i) => i !== index);
    // Reorder steps
    setSteps(newSteps.map((step, i) => ({ ...step, step_order: i + 1 })));
  };

  const updateStep = (index: number, field: keyof SequenceStepForm, value: any) => {
    const newSteps = [...steps];
    newSteps[index] = { ...newSteps[index], [field]: value };
    
    // Auto-update channel based on selected template
    if (field === 'template_id') {
      const template = templates.find(t => t.id === value);
      if (template) {
        newSteps[index].channel = template.type;
      }
    }
    
    setSteps(newSteps);
  };

  const handleSubmit = async () => {
    if (!name.trim() || steps.length === 0) {
      toast({
        title: "Validation Error",
        description: "Please provide a name and at least one step",
        variant: "destructive"
      });
      return;
    }

    // Validate all steps have templates selected
    const invalidStep = steps.find(s => !s.template_id);
    if (invalidStep) {
      toast({
        title: "Validation Error",
        description: "All steps must have a template selected",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    try {
      if (sequence) {
        // Update existing sequence
        const { error: seqError } = await supabase
          .from('workflow_sequences')
          .update({
            name,
            description,
            color,
            updated_at: new Date().toISOString()
          })
          .eq('id', sequence.id);

        if (seqError) throw seqError;

        // Delete old steps
        await supabase
          .from('workflow_sequence_steps')
          .delete()
          .eq('sequence_id', sequence.id);

        // Insert new steps
        const { error: stepsError } = await supabase
          .from('workflow_sequence_steps')
          .insert(steps.map(step => ({
            sequence_id: sequence.id,
            ...step
          })));

        if (stepsError) throw stepsError;
      } else {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("Not authenticated");

        // Create new sequence
        const { data: newSeq, error: seqError } = await supabase
          .from('workflow_sequences')
          .insert([{
            user_id: user.id,
            name,
            description,
            color,
            icon: 'Workflow',
            is_active: true
          }])
          .select()
          .single();

        if (seqError) throw seqError;

        // Insert steps
        const { error: stepsError } = await supabase
          .from('workflow_sequence_steps')
          .insert(steps.map(step => ({
            sequence_id: newSeq.id,
            ...step
          })));

        if (stepsError) throw stepsError;
      }

      toast({
        title: "Success",
        description: `Workflow sequence ${sequence ? 'updated' : 'created'} successfully`
      });
      
      onSave();
      onClose();
    } catch (error) {
      console.error('Error saving workflow sequence:', error);
      toast({
        title: "Error",
        description: "Failed to save workflow sequence",
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
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {sequence ? 'Edit Workflow Sequence' : 'Create New Workflow Sequence'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Sequence Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., No Reply Follow-up Sequence"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="color">Color</Label>
              <Input
                id="color"
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description of this sequence..."
              rows={2}
            />
          </div>

          {/* Steps */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-base font-semibold">Sequence Steps</Label>
              <Button onClick={addStep} size="sm" variant="outline">
                <Plus className="w-4 h-4 mr-1" />
                Add Step
              </Button>
            </div>

            {steps.length === 0 && (
              <div className="text-center py-8 border-2 border-dashed rounded-lg">
                <p className="text-muted-foreground">No steps added yet. Click "Add Step" to begin.</p>
              </div>
            )}

            {steps.map((step, index) => (
              <div key={index} className="flex items-start gap-3 p-4 border rounded-lg">
                <div className="flex items-center gap-2 mt-2">
                  <GripVertical className="w-4 h-4 text-muted-foreground cursor-move" />
                  <Badge>{index + 1}</Badge>
                </div>
                
                <div className="flex-1 space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <Label className="text-xs">Template</Label>
                      <Select 
                        value={step.template_id} 
                        onValueChange={(value) => updateStep(index, 'template_id', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select template..." />
                        </SelectTrigger>
                        <SelectContent>
                          {templates.map(template => (
                            <SelectItem key={template.id} value={template.id}>
                              <div className="flex items-center gap-2">
                                {template.type === 'email' ? (
                                  <Mail className="w-3 h-3" />
                                ) : (
                                  <MessageSquare className="w-3 h-3" />
                                )}
                                {template.name}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-1">
                      <Label className="text-xs">Delay (hours)</Label>
                      <Input
                        type="number"
                        min="0"
                        value={step.delay_hours}
                        onChange={(e) => updateStep(index, 'delay_hours', parseInt(e.target.value) || 0)}
                        placeholder="0"
                      />
                    </div>
                  </div>

                  {step.template_id && (
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      {step.channel === 'email' ? (
                        <Mail className="w-3 h-3 text-purple-600" />
                      ) : (
                        <MessageSquare className="w-3 h-3 text-green-600" />
                      )}
                      <span>
                        {step.delay_hours === 0 
                          ? 'Sent immediately' 
                          : `Sent after ${formatDuration(step.delay_hours)}`}
                      </span>
                    </div>
                  )}
                </div>

                <Button
                  onClick={() => removeStep(index)}
                  variant="ghost"
                  size="sm"
                  className="text-red-600 hover:bg-red-50 mt-2"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>

          {/* Preview Timeline */}
          {steps.length > 0 && (
            <div className="border rounded-lg p-4 bg-muted/30">
              <Label className="text-sm font-semibold mb-3 block">Timeline Preview</Label>
              <div className="space-y-2">
                {steps.map((step, index) => {
                  const template = templates.find(t => t.id === step.template_id);
                  return (
                    <div key={index} className="flex items-center gap-3 text-sm">
                      <Badge variant="outline">{index + 1}</Badge>
                      {template && (
                        <>
                          {template.type === 'email' ? (
                            <Mail className="w-4 h-4 text-purple-600" />
                          ) : (
                            <MessageSquare className="w-4 h-4 text-green-600" />
                          )}
                          <span className="font-medium">{template.name}</span>
                          <span className="text-muted-foreground">
                            {step.delay_hours === 0 ? '→ Immediate' : `→ +${formatDuration(step.delay_hours)}`}
                          </span>
                        </>
                      )}
                    </div>
                  );
                })}
                <div className="pt-2 border-t">
                  <span className="text-xs text-muted-foreground">
                    Total Duration: {formatDuration(Math.max(...steps.map(s => s.delay_hours), 0))}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : (sequence ? 'Update Sequence' : 'Create Sequence')}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}