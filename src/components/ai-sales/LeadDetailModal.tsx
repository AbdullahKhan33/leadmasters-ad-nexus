import { useState, useEffect } from "react";
import { Lead } from "@/data/dummyLeads";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Phone,
  Mail,
  MapPin,
  Calendar,
  TrendingUp,
  MessageSquare,
  Clock,
  Sparkles,
  User,
  Edit2,
  Save,
  X as XIcon,
  ArrowRight,
  FileText,
  RefreshCw
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAgents } from "@/hooks/useAgents";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Loader2 } from "lucide-react";

interface LeadDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  lead: Lead | null;
  onLeadUpdated?: () => void;
}

const stageColors = {
  new: "bg-blue-500",
  "no-reply": "bg-orange-500",
  qualified: "bg-purple-500",
  nurturing: "bg-green-500",
  "long-term": "bg-gray-500",
  won: "bg-emerald-500"
};

export function LeadDetailModal({ open, onOpenChange, lead, onLeadUpdated }: LeadDetailModalProps) {
  const { agents } = useAgents();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editedLead, setEditedLead] = useState<Lead | null>(null);
  const [selectedAgentId, setSelectedAgentId] = useState<string>('');
  const [showMoveConfirm, setShowMoveConfirm] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const [showNoteDialog, setShowNoteDialog] = useState(false);
  const [noteText, setNoteText] = useState('');
  const [showStagePopover, setShowStagePopover] = useState(false);
  const [newStage, setNewStage] = useState('new');

  useEffect(() => {
    if (lead) {
      setEditedLead(lead);
      // Find agent ID if lead is assigned
      if (lead.assignedTo) {
        const agent = agents.find(a => 
          a.display_name === lead.assignedTo || 
          a.email === lead.assignedTo || 
          a.agent_code === lead.assignedTo
        );
        setSelectedAgentId(agent?.id || '');
      } else {
        setSelectedAgentId('');
      }
    }
  }, [lead, agents]);

  if (!lead || !editedLead) return null;

  const engagementRate = 0; // Placeholder for now

  // Move to CRM handler
  const handleMoveToCRM = async () => {
    if (!lead) return;
    
    setIsMoving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();

      const previousWorkflowId = lead.current_workflow_id;

      const { error: leadError } = await supabase
        .from('leads')
        .update({
          lead_source_type: 'crm_contact',
          current_workflow_id: null,
          source_metadata: {
            moved_to_crm_at: new Date().toISOString(),
            moved_by: user?.id,
            previous_workflow_id: previousWorkflowId,
            previous_source_type: 'ai_automation'
          }
        })
        .eq('id', lead.id);

      if (leadError) throw leadError;

      const { error: workflowError } = await supabase
        .from('workflow_executions')
        .update({ status: 'paused' })
        .eq('lead_id', lead.id)
        .eq('status', 'pending');

      if (workflowError) console.warn('Workflow pause warning:', workflowError);

      toast({
        title: "Lead moved to CRM",
        description: `${lead.name} has been moved to CRM Contacts and removed from automation pipeline.`,
      });

      onLeadUpdated?.();
      onOpenChange(false);
    } catch (error) {
      console.error('Error moving lead:', error);
      toast({
        title: "Error moving lead",
        variant: "destructive",
      });
    } finally {
      setIsMoving(false);
      setShowMoveConfirm(false);
    }
  };

  // Send message handler (WhatsApp)
  const handleSendMessage = () => {
    const phoneNumber = lead.phone.replace(/\D/g, '');
    window.open(`https://wa.me/${phoneNumber}`, '_blank');
    toast({ title: "Opening WhatsApp Web..." });
  };

  // Add note handler
  const handleAddNote = async () => {
    if (!noteText.trim()) return;

    const timestamp = new Date().toLocaleString();
    const newNote = `[${timestamp}] ${noteText}`;
    const updatedNotes = lead.notes 
      ? `${lead.notes}\n\n${newNote}` 
      : newNote;

    const { error } = await supabase
      .from('leads')
      .update({ notes: updatedNotes })
      .eq('id', lead.id);

    if (error) {
      toast({ title: "Error adding note", variant: "destructive" });
    } else {
      toast({ title: "Note added successfully" });
      setEditedLead({ ...editedLead, notes: updatedNotes });
      setNoteText('');
      setShowNoteDialog(false);
      onLeadUpdated?.();
    }
  };

  // Change stage handler
  const handleStageChange = async () => {
    const { error } = await supabase
      .from('leads')
      .update({ workflow_stage: newStage })
      .eq('id', lead.id);

    if (error) {
      toast({ title: "Error changing stage", variant: "destructive" });
    } else {
      toast({ title: "Stage updated" });
      onLeadUpdated?.();
      setShowStagePopover(false);
    }
  };

  const handleSave = async () => {
    if (!editedLead) return;

    try {
      setIsSaving(true);

      // Update lead in database
      const { error: leadError } = await supabase
        .from('leads')
        .update({
          phone: editedLead.phone,
          email: editedLead.email,
          assigned_agent_id: selectedAgentId || null
        })
        .eq('id', editedLead.id);

      if (leadError) throw leadError;

      // Get previous agent assignment to check if we need to update
      const previousAgent = agents.find(a => 
        a.display_name === lead.assignedTo || 
        a.email === lead.assignedTo || 
        a.agent_code === lead.assignedTo
      );
      const previousAgentId = previousAgent?.id;

      // If agent was newly assigned or changed, create assignment record
      if (selectedAgentId && selectedAgentId !== previousAgentId) {
        const agent = agents.find(a => a.id === selectedAgentId);
        if (agent) {
          const { error: assignError } = await supabase
            .from('agent_lead_assignments')
            .insert({
              agent_id: agent.id,
              lead_id: editedLead.id,
              status: 'assigned',
              notes: 'Assigned via AI Sales Automation'
            });

          if (assignError && !assignError.message.includes('duplicate')) {
            console.warn('Assignment record creation failed:', assignError);
          }

          // Update agent's assigned leads count (only if newly assigned)
          if (!previousAgentId) {
            await supabase
              .from('agents')
              .update({ 
                assigned_leads_count: (agent.assigned_leads_count || 0) + 1 
              })
              .eq('id', agent.id);
          }
        }
      }

      toast({
        title: "Lead updated",
        description: "Changes saved successfully"
      });

      setIsEditing(false);
      onLeadUpdated?.();

    } catch (error) {
      console.error('Error updating lead:', error);
      toast({
        title: "Error",
        description: "Failed to save changes",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setEditedLead(lead);
    // Reset selected agent ID
    if (lead?.assignedTo) {
      const agent = agents.find(a => 
        a.display_name === lead.assignedTo || 
        a.email === lead.assignedTo || 
        a.agent_code === lead.assignedTo
      );
      setSelectedAgentId(agent?.id || '');
    } else {
      setSelectedAgentId('');
    }
    setIsEditing(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <DialogTitle className="text-2xl">{lead.name}</DialogTitle>
                {!isEditing && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsEditing(true)}
                    className="h-8"
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <DialogDescription className="flex items-center gap-2 mt-2">
                <Badge variant="outline">{lead.source}</Badge>
                <Badge 
                  variant={lead.priority === 'urgent' ? 'destructive' : 'outline'}
                  className={cn(
                    lead.priority === 'high' && 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
                  )}
                >
                  {lead.priority}
                </Badge>
                <div className={cn("h-2 w-2 rounded-full", stageColors[lead.stage])} />
                <span className="text-sm capitalize">{lead.stage.replace('-', ' ')}</span>
              </DialogDescription>
            </div>
            {lead.aiScore && (
              <div className="text-right">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {Math.round(lead.aiScore * 100)}%
                </div>
                <div className="text-xs text-muted-foreground">AI Score</div>
              </div>
            )}
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Contact Info */}
          <div className="space-y-3">
            <h3 className="font-semibold flex items-center gap-2">
              <User className="h-4 w-4" />
              Contact Information
            </h3>
            {isEditing ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-xs flex items-center gap-1">
                    <Phone className="h-3 w-3" />
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    value={editedLead.phone}
                    onChange={(e) => setEditedLead({ ...editedLead, phone: e.target.value })}
                    placeholder="+91 1234567890"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-xs flex items-center gap-1">
                    <Mail className="h-3 w-3" />
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={editedLead.email}
                    onChange={(e) => setEditedLead({ ...editedLead, email: e.target.value })}
                    placeholder="email@example.com"
                  />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <a href={`tel:${lead.phone}`} className="text-sm hover:underline">
                    {lead.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <a href={`mailto:${lead.email}`} className="text-sm hover:underline truncate">
                    {lead.email}
                  </a>
                </div>
              </div>
            )}
            {lead.location && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{lead.location}</span>
              </div>
            )}
          </div>

          <Separator />

          {/* AI Insights */}
          {lead.aiScore && (
            <>
              <div className="space-y-3">
                <h3 className="font-semibold flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-purple-600" />
                  AI Insights
                </h3>
                <div className="p-4 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Confidence Score</span>
                    <span className="text-sm font-bold">{Math.round(lead.aiScore * 100)}%</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {lead.aiScore > 0.85 
                      ? "🎯 High conversion probability - prioritize for immediate follow-up"
                      : lead.aiScore > 0.7
                      ? "✅ Good potential - maintain regular engagement"
                      : "⏰ Moderate interest - continue nurturing"}
                  </div>
                  {lead.budget && (
                    <div className="pt-2 border-t border-purple-200 dark:border-purple-800">
                      <div className="text-sm">
                        <span className="text-muted-foreground">Budget: </span>
                        <span className="font-semibold">{lead.budget}</span>
                      </div>
                    </div>
                  )}
                  {lead.timeline && (
                    <div className="text-sm">
                      <span className="text-muted-foreground">Timeline: </span>
                      <span className="font-semibold">{lead.timeline}</span>
                    </div>
                  )}
                </div>
              </div>
              <Separator />
            </>
          )}

          {/* Engagement History */}
          <div className="space-y-3">
            <h3 className="font-semibold flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Engagement
            </h3>
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 rounded-lg bg-muted/50 text-center">
                <div className="text-2xl font-bold">{lead.engagement.messagesSent}</div>
                <div className="text-xs text-muted-foreground">Messages Sent</div>
              </div>
              <div className="p-3 rounded-lg bg-muted/50 text-center">
                <div className="text-2xl font-bold">{lead.engagement.messagesOpened}</div>
                <div className="text-xs text-muted-foreground">Opened</div>
              </div>
              <div className="p-3 rounded-lg bg-muted/50 text-center">
                <div className="text-2xl font-bold">{engagementRate}%</div>
                <div className="text-xs text-muted-foreground">Engagement</div>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <div className="text-sm">
                <span className="text-muted-foreground">Last interaction: </span>
                <span className="font-medium">{formatTimeAgo(lead.lastContact)}</span>
              </div>
            </div>
            {lead.nextAction && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div className="text-sm">
                  <span className="text-muted-foreground">Next action: </span>
                  <span className="font-medium">{formatTimeUntil(lead.nextAction)}</span>
                </div>
              </div>
            )}
          </div>

          <Separator />

          {/* Assignment */}
          <div className="space-y-3">
            <h3 className="font-semibold flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Assignment & Status
            </h3>
            {isEditing ? (
              <div className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="assignedTo" className="text-xs">
                    Assign to Agent
                  </Label>
                  <Select
                    value={selectedAgentId || 'unassigned'}
                    onValueChange={(value) => {
                      if (value === 'unassigned') {
                        setSelectedAgentId('');
                        setEditedLead({ ...editedLead, assignedTo: undefined });
                      } else {
                        setSelectedAgentId(value);
                        const agent = agents.find(a => a.id === value);
                        setEditedLead({ 
                          ...editedLead, 
                          assignedTo: agent?.display_name || agent?.email || agent?.agent_code
                        });
                      }
                    }}
                  >
                    <SelectTrigger id="assignedTo">
                      <SelectValue placeholder="Select agent" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="unassigned">Unassigned</SelectItem>
                      {agents.map(agent => (
                        <SelectItem key={agent.id} value={agent.id}>
                          {agent.display_name || agent.email || agent.agent_code}
                          {agent.assigned_leads_count > 0 && (
                            <span className="text-xs text-muted-foreground ml-2">
                              ({agent.assigned_leads_count} leads)
                            </span>
                          )}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="p-3 rounded-lg bg-muted/50">
                  <div className="text-sm">{lead.status}</div>
                </div>
              </div>
            ) : (
              <div className="p-3 rounded-lg bg-muted/50">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Assigned to:</span>
                  <span className="text-sm font-medium">
                    {lead.assignedTo || <span className="italic text-muted-foreground">Unassigned</span>}
                  </span>
                </div>
                <div className="mt-2 pt-2 border-t">
                  <div className="text-sm">{lead.status}</div>
                </div>
              </div>
            )}
            {lead.tags && lead.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {lead.tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          {isEditing ? (
            <div className="flex gap-2 pt-4 border-t">
              <Button 
                onClick={handleSave} 
                disabled={isSaving}
                className="flex-1"
              >
                {isSaving ? (
                  <>
                    <Clock className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </>
                )}
              </Button>
              <Button 
                variant="outline" 
                onClick={handleCancel}
                disabled={isSaving}
              >
                <XIcon className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </div>
          ) : (
            <div className="flex flex-wrap gap-2 pt-4">
              <Popover open={showStagePopover} onOpenChange={setShowStagePopover}>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Change Stage
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-56">
                  <div className="space-y-3">
                    <Select value={newStage} onValueChange={setNewStage}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">New Leads</SelectItem>
                        <SelectItem value="no-reply">No Reply</SelectItem>
                        <SelectItem value="qualified">Qualified</SelectItem>
                        <SelectItem value="nurturing">Nurturing</SelectItem>
                        <SelectItem value="long-term">Long-Term</SelectItem>
                        <SelectItem value="won">Won</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button onClick={handleStageChange} className="w-full" size="sm">
                      Update Stage
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>

              <Dialog open={showNoteDialog} onOpenChange={setShowNoteDialog}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <FileText className="h-4 w-4 mr-2" />
                    Add Note
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Note</DialogTitle>
                    <DialogDescription>
                      Add a timestamped note to {lead.name}'s record
                    </DialogDescription>
                  </DialogHeader>
                  <Textarea
                    placeholder="Enter your note here..."
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                    rows={5}
                  />
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setShowNoteDialog(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddNote}>
                      Add Note
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              <Button variant="outline" size="sm" onClick={handleSendMessage}>
                <MessageSquare className="h-4 w-4 mr-2" />
                Send Message
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowMoveConfirm(true)}
              >
                <ArrowRight className="h-4 w-4 mr-2" />
                Move to CRM
              </Button>
            </div>
          )}

          {/* Move to CRM Confirmation Dialog */}
          <Dialog open={showMoveConfirm} onOpenChange={setShowMoveConfirm}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Move {lead.name} to CRM?</DialogTitle>
                <DialogDescription>
                  This will remove this lead from the AI Sales Automation pipeline:
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Active workflows will be paused</li>
                    <li>Lead will no longer receive automated messages</li>
                    <li>Stage history will be preserved</li>
                    <li>Lead will appear in CRM Contacts tab</li>
                  </ul>
                </DialogDescription>
              </DialogHeader>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowMoveConfirm(false)}>
                  Cancel
                </Button>
                <Button onClick={handleMoveToCRM} disabled={isMoving}>
                  {isMoving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                  Confirm Move
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function formatTimeAgo(date: Date): string {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  
  if (seconds < 60) return 'Just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
  return `${Math.floor(seconds / 86400)} days ago`;
}

function formatTimeUntil(date: Date): string {
  const seconds = Math.floor((date.getTime() - new Date().getTime()) / 1000);
  
  if (seconds < 0) return 'Overdue';
  if (seconds < 3600) return `in ${Math.floor(seconds / 60)} minutes`;
  if (seconds < 86400) return `in ${Math.floor(seconds / 3600)} hours`;
  return `in ${Math.floor(seconds / 86400)} days`;
}
