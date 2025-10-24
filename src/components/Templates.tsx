import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Mail, MessageSquare, Sparkles, Filter, Plus, Workflow } from "lucide-react";
import { CampaignTemplate, WorkflowSequenceWithSteps } from "@/types/campaigns";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { WorkflowSequenceCard } from "./templates/WorkflowSequenceCard";
import { WorkflowSequenceBuilderModal } from "./templates/WorkflowSequenceBuilderModal";
import { TemplatesUpsell } from "./templates/TemplatesUpsell";
import { TemplateEditorModal } from "./templates/TemplateEditorModal";
import { TemplateCard } from "./templates/TemplateCard";

interface GroupedTemplates {
  sequenceId: string;
  sequenceName: string;
  sequenceColor: string;
  sequenceIcon: string;
  templates: CampaignTemplate[];
}

export function Templates() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"email" | "whatsapp" | "workflows">("email");
  const [groupedEmailTemplates, setGroupedEmailTemplates] = useState<GroupedTemplates[]>([]);
  const [groupedWhatsappTemplates, setGroupedWhatsappTemplates] = useState<GroupedTemplates[]>([]);
  const [standaloneEmailTemplates, setStandaloneEmailTemplates] = useState<CampaignTemplate[]>([]);
  const [standaloneWhatsappTemplates, setStandaloneWhatsappTemplates] = useState<CampaignTemplate[]>([]);
  const [workflowSequences, setWorkflowSequences] = useState<WorkflowSequenceWithSteps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const [sequenceBuilderModal, setSequenceBuilderModal] = useState<{
    isOpen: boolean;
    sequence: WorkflowSequenceWithSteps | null;
  }>({
    isOpen: false,
    sequence: null
  });

  const [templateEditorModal, setTemplateEditorModal] = useState<{
    isOpen: boolean;
    type: "email" | "whatsapp";
    mode: "create" | "edit";
    template: any;
  }>({
    isOpen: false,
    type: "email",
    mode: "create",
    template: null
  });

  useEffect(() => {
    if (activeTab === "email" || activeTab === "whatsapp") {
      fetchTemplates();
    } else if (activeTab === "workflows") {
      fetchWorkflowSequences();
    }
  }, [activeTab]);

  const fetchTemplates = async () => {
    setIsLoading(true);
    try {
      // Fetch all templates first
      const { data: allTemplates, error: allError } = await supabase
        .from('campaign_templates')
        .select('*')
        .eq('is_active', true)
        .order('name');

      if (allError) throw allError;

      // Fetch templates with their sequence information
      const { data: templatesWithSequences, error } = await supabase
        .from('campaign_templates')
        .select(`
          *,
          workflow_sequence_steps!inner(
            sequence_id,
            workflow_sequences(id, name, color, icon)
          )
        `)
        .eq('is_active', true)
        .order('name');
      
      if (error && error.code !== 'PGRST116') throw error;

      // Group templates by sequence
      const emailGroups = new Map<string, GroupedTemplates>();
      const whatsappGroups = new Map<string, GroupedTemplates>();
      const templatesInSequences = new Set<string>();

      if (templatesWithSequences) {
        templatesWithSequences.forEach((template: any) => {
          templatesInSequences.add(template.id);
          const step = template.workflow_sequence_steps?.[0];
          if (!step?.workflow_sequences) return;

          const sequence = step.workflow_sequences;
          const isEmail = template.type === 'email';
          const targetMap = isEmail ? emailGroups : whatsappGroups;

          if (!targetMap.has(sequence.id)) {
            targetMap.set(sequence.id, {
              sequenceId: sequence.id,
              sequenceName: sequence.name,
              sequenceColor: sequence.color || '#8B5CF6',
              sequenceIcon: sequence.icon || 'Workflow',
              templates: []
            });
          }

          targetMap.get(sequence.id)!.templates.push(template);
        });
      }

      setGroupedEmailTemplates(Array.from(emailGroups.values()));
      setGroupedWhatsappTemplates(Array.from(whatsappGroups.values()));
      
      // Filter standalone templates (not in any sequence)
      if (allTemplates) {
        const standalone = allTemplates.filter(t => !templatesInSequences.has(t.id));
        setStandaloneEmailTemplates(standalone.filter(t => t.type === 'email') as CampaignTemplate[]);
        setStandaloneWhatsappTemplates(standalone.filter(t => t.type === 'whatsapp') as CampaignTemplate[]);
      }
    } catch (error) {
      console.error('Error fetching templates:', error);
      toast({
        title: "Error",
        description: "Failed to load templates",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchWorkflowSequences = async () => {
    setIsLoading(true);
    try {
      // Fetch sequences
      const { data: sequences, error: seqError } = await supabase
        .from('workflow_sequences')
        .select('*')
        .order('created_at', { ascending: false });

      if (seqError) throw seqError;

      // For each sequence, fetch its steps with templates
      const sequencesWithSteps = await Promise.all(
        (sequences || []).map(async (seq) => {
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

          return {
            ...seq,
            steps: steps || [],
            total_steps: steps?.length || 0,
            total_duration_hours: totalDuration,
            email_count: emailCount,
            whatsapp_count: whatsappCount
          };
        })
      );

      setWorkflowSequences(sequencesWithSteps as WorkflowSequenceWithSteps[]);
    } catch (error) {
      console.error('Error fetching workflow sequences:', error);
      toast({
        title: "Error",
        description: "Failed to load workflow sequences",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateSequence = () => {
    setSequenceBuilderModal({ isOpen: true, sequence: null });
  };

  const handleEditSequence = (sequence: WorkflowSequenceWithSteps) => {
    setSequenceBuilderModal({ isOpen: true, sequence });
  };

  const handleDuplicateSequence = async (sequence: WorkflowSequenceWithSteps) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      // Create duplicate sequence
      const { data: newSeq, error: seqError } = await supabase
        .from('workflow_sequences')
        .insert([{
          user_id: user.id,
          name: `${sequence.name} (Copy)`,
          description: sequence.description,
          icon: sequence.icon,
          color: sequence.color,
          is_active: sequence.is_active
        }])
        .select()
        .single();

      if (seqError) throw seqError;

      // Duplicate steps
      const stepsToInsert = sequence.steps.map(step => ({
        sequence_id: newSeq.id,
        template_id: step.template_id,
        step_order: step.step_order,
        delay_hours: step.delay_hours,
        channel: step.channel,
        condition: step.condition
      }));

      const { error: stepsError } = await supabase
        .from('workflow_sequence_steps')
        .insert(stepsToInsert);

      if (stepsError) throw stepsError;

      toast({
        title: "Success",
        description: "Workflow sequence duplicated successfully"
      });

      fetchWorkflowSequences();
    } catch (error) {
      console.error('Error duplicating sequence:', error);
      toast({
        title: "Error",
        description: "Failed to duplicate workflow sequence",
        variant: "destructive"
      });
    }
  };

  const handleDeleteSequence = async (sequenceId: string) => {
    if (!confirm("Are you sure you want to delete this workflow sequence?")) return;

    try {
      const { error } = await supabase
        .from('workflow_sequences')
        .delete()
        .eq('id', sequenceId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Workflow sequence deleted successfully"
      });

      fetchWorkflowSequences();
    } catch (error) {
      console.error('Error deleting sequence:', error);
      toast({
        title: "Error",
        description: "Failed to delete workflow sequence",
        variant: "destructive"
      });
    }
  };

  const handleCreateTemplate = (type: "email" | "whatsapp") => {
    setTemplateEditorModal({
      isOpen: true,
      type,
      mode: "create",
      template: null
    });
  };

  const handleEditTemplate = (template: CampaignTemplate) => {
    setTemplateEditorModal({
      isOpen: true,
      type: template.type as "email" | "whatsapp",
      mode: "edit",
      template
    });
  };

  const handleDuplicateTemplate = async (template: CampaignTemplate) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      const { error } = await supabase
        .from("campaign_templates")
        .insert({
          user_id: user.id,
          name: `${template.name} (Copy)`,
          type: template.type,
          content: template.content,
          subject: template.subject,
          is_active: true
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Template duplicated successfully"
      });
      
      fetchTemplates();
    } catch (error) {
      console.error("Error duplicating template:", error);
      toast({
        title: "Error",
        description: "Failed to duplicate template",
        variant: "destructive"
      });
    }
  };

  const handleDeleteTemplate = async (templateId: string) => {
    if (!confirm("Are you sure you want to delete this template?")) return;

    try {
      const { error } = await supabase
        .from("campaign_templates")
        .update({ is_active: false })
        .eq('id', templateId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Template deleted successfully"
      });
      
      fetchTemplates();
    } catch (error) {
      console.error("Error deleting template:", error);
      toast({
        title: "Error",
        description: "Failed to delete template",
        variant: "destructive"
      });
    }
  };

  const handleSaveTemplate = async (template: any) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      if (templateEditorModal.mode === "edit" && template.id) {
        // Update existing template
        const { error } = await supabase
          .from("campaign_templates")
          .update({
            name: template.name,
            content: template.content,
            subject: template.subject,
          })
          .eq('id', template.id);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Template updated successfully"
        });
      } else {
        // Create new template
        const { error } = await supabase
          .from("campaign_templates")
          .insert({
            user_id: user.id,
            name: template.name,
            type: templateEditorModal.type,
            content: template.content,
            subject: template.subject,
            is_active: true
          });

        if (error) throw error;

        toast({
          title: "Success",
          description: "Template created successfully"
        });
      }
      
      fetchTemplates();
      setTemplateEditorModal({ ...templateEditorModal, isOpen: false });
    } catch (error: any) {
      console.error("Error saving template:", error);
      toast({
        title: "Error",
        description: "Failed to save template",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="flex-1 bg-gradient-to-br from-slate-50 via-white to-purple-50/30 min-h-screen">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Premium Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-bold mb-4 shadow-lg">
            <Sparkles className="w-4 h-4" />
            Premium Templates
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-purple-900 to-pink-900 bg-clip-text text-transparent mb-3">
            Professional Communication Templates
          </h1>
          <p className="text-gray-600 max-w-3xl mx-auto text-base leading-relaxed">
            Elevate your communication with our premium collection of professionally crafted templates. 
            Designed to boost engagement and drive results across all your channels.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)} className="w-full">
          <div className="flex items-center justify-center mb-8">
            <TabsList className="grid w-full max-w-2xl grid-cols-3 h-12 bg-white shadow-xl border-0 p-1">
              <TabsTrigger 
                value="email" 
                className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white font-bold text-sm transition-all duration-300 data-[state=active]:shadow-lg"
              >
                <Mail className="w-4 h-4" />
                Email Templates
                <Badge variant="secondary" className="ml-1 bg-purple-100 text-purple-700 text-xs font-bold">
                  {groupedEmailTemplates.reduce((acc, g) => acc + g.templates.length, 0) + standaloneEmailTemplates.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger 
                value="whatsapp" 
                className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600 data-[state=active]:to-emerald-600 data-[state=active]:text-white font-bold text-sm transition-all duration-300 data-[state=active]:shadow-lg"
              >
                <MessageSquare className="w-4 h-4" />
                WhatsApp Templates
                <Badge variant="secondary" className="ml-1 bg-green-100 text-green-700 text-xs font-bold">
                  {groupedWhatsappTemplates.reduce((acc, g) => acc + g.templates.length, 0) + standaloneWhatsappTemplates.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger 
                value="workflows" 
                className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white font-bold text-sm transition-all duration-300 data-[state=active]:shadow-lg"
              >
                <Workflow className="w-4 h-4" />
                Workflow Sequences
                <Badge variant="secondary" className="ml-1 bg-blue-100 text-blue-700 text-xs font-bold">
                  {workflowSequences.length}
                </Badge>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="email" className="space-y-8">
            <div className="flex items-center justify-between bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-1">Email Templates</h2>
                <p className="text-sm text-gray-600">Professional email templates for every occasion</p>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm" className="flex items-center gap-2 h-10 text-sm px-4 border-gray-200 hover:bg-gray-50 transition-all duration-300">
                  <Filter className="w-4 h-4" />
                  Filter
                </Button>
                <Button 
                  onClick={() => handleCreateTemplate("email")}
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white flex items-center gap-2 h-10 text-sm px-4 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Plus className="w-4 h-4" />
                  New Email Template
                </Button>
              </div>
            </div>
            
            {isLoading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                <p className="mt-4 text-sm text-muted-foreground">Loading templates...</p>
              </div>
            ) : groupedEmailTemplates.length === 0 && standaloneEmailTemplates.length === 0 ? (
              <div className="text-center py-12 border-2 border-dashed rounded-lg">
                <Mail className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No email templates found</p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Grouped by Workflow Sequences */}
                {groupedEmailTemplates.length > 0 && (
                  <Accordion type="multiple" className="space-y-4">
                    {groupedEmailTemplates.map((group) => (
                      <AccordionItem 
                        key={group.sequenceId} 
                        value={group.sequenceId}
                        className="border rounded-lg bg-white shadow-sm"
                      >
                        <AccordionTrigger className="px-6 hover:no-underline">
                          <div className="flex items-center gap-3">
                            <div 
                              className="w-3 h-3 rounded-full" 
                              style={{ backgroundColor: group.sequenceColor }}
                            />
                            <span className="font-bold text-lg">{group.sequenceName}</span>
                            <Badge variant="secondary" className="ml-2">
                              {group.templates.length} templates
                            </Badge>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-4">
                            {group.templates.map((template) => (
                              <TemplateCard
                                key={template.id}
                                template={template}
                                onEdit={handleEditTemplate}
                                onDelete={handleDeleteTemplate}
                                onDuplicate={handleDuplicateTemplate}
                              />
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                )}

                {/* Standalone Templates */}
                {standaloneEmailTemplates.length > 0 && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 px-2">
                      <div className="w-3 h-3 rounded-full bg-gray-400" />
                      <h3 className="font-bold text-lg">Standalone Templates</h3>
                      <Badge variant="secondary">
                        {standaloneEmailTemplates.length} templates
                      </Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {standaloneEmailTemplates.map((template) => (
                        <TemplateCard
                          key={template.id}
                          template={template}
                          onEdit={handleEditTemplate}
                          onDelete={handleDeleteTemplate}
                          onDuplicate={handleDuplicateTemplate}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </TabsContent>

          <TabsContent value="whatsapp" className="space-y-8">
            <div className="flex items-center justify-between bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-1">WhatsApp Templates</h2>
                <p className="text-sm text-gray-600">Engaging WhatsApp messages that get responses</p>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm" className="flex items-center gap-2 h-10 text-sm px-4 border-gray-200 hover:bg-gray-50 transition-all duration-300">
                  <Filter className="w-4 h-4" />
                  Filter
                </Button>
                <Button 
                  onClick={() => handleCreateTemplate("whatsapp")}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white flex items-center gap-2 h-10 text-sm px-4 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Plus className="w-4 h-4" />
                  New WhatsApp Template
                </Button>
              </div>
            </div>
            
            {isLoading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                <p className="mt-4 text-sm text-muted-foreground">Loading templates...</p>
              </div>
            ) : groupedWhatsappTemplates.length === 0 && standaloneWhatsappTemplates.length === 0 ? (
              <div className="text-center py-12 border-2 border-dashed rounded-lg">
                <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No WhatsApp templates found</p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Grouped by Workflow Sequences */}
                {groupedWhatsappTemplates.length > 0 && (
                  <Accordion type="multiple" className="space-y-4">
                    {groupedWhatsappTemplates.map((group) => (
                      <AccordionItem 
                        key={group.sequenceId} 
                        value={group.sequenceId}
                        className="border rounded-lg bg-white shadow-sm"
                      >
                        <AccordionTrigger className="px-6 hover:no-underline">
                          <div className="flex items-center gap-3">
                            <div 
                              className="w-3 h-3 rounded-full" 
                              style={{ backgroundColor: group.sequenceColor }}
                            />
                            <span className="font-bold text-lg">{group.sequenceName}</span>
                            <Badge variant="secondary" className="ml-2">
                              {group.templates.length} templates
                            </Badge>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-4">
                            {group.templates.map((template) => (
                              <TemplateCard
                                key={template.id}
                                template={template}
                                onEdit={handleEditTemplate}
                                onDelete={handleDeleteTemplate}
                                onDuplicate={handleDuplicateTemplate}
                              />
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                )}

                {/* Standalone Templates */}
                {standaloneWhatsappTemplates.length > 0 && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 px-2">
                      <div className="w-3 h-3 rounded-full bg-gray-400" />
                      <h3 className="font-bold text-lg">Standalone Templates</h3>
                      <Badge variant="secondary">
                        {standaloneWhatsappTemplates.length} templates
                      </Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {standaloneWhatsappTemplates.map((template) => (
                        <TemplateCard
                          key={template.id}
                          template={template}
                          onEdit={handleEditTemplate}
                          onDelete={handleDeleteTemplate}
                          onDuplicate={handleDuplicateTemplate}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </TabsContent>

          <TabsContent value="workflows" className="space-y-8">
            <div className="flex items-center justify-between bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-1">Workflow Sequences</h2>
                <p className="text-sm text-gray-600">Multi-step automation sequences for your workflows</p>
              </div>
              <div className="flex items-center gap-3">
                <Button 
                  onClick={handleCreateSequence}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white flex items-center gap-2 h-10 text-sm px-4 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Plus className="w-4 h-4" />
                  New Sequence
                </Button>
              </div>
            </div>
            
            {isLoading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <p className="mt-4 text-sm text-muted-foreground">Loading workflow sequences...</p>
              </div>
            ) : workflowSequences.length === 0 ? (
              <div className="text-center py-12 border-2 border-dashed rounded-lg">
                <Workflow className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">No workflow sequences found</p>
                <Button 
                  onClick={handleCreateSequence}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Your First Sequence
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {workflowSequences.map((sequence) => (
                  <WorkflowSequenceCard 
                    key={sequence.id} 
                    sequence={sequence}
                    onEdit={handleEditSequence}
                    onDuplicate={handleDuplicateSequence}
                    onDelete={handleDeleteSequence}
                  />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Workflow Sequence Builder Modal */}
        <WorkflowSequenceBuilderModal
          isOpen={sequenceBuilderModal.isOpen}
          onClose={() => setSequenceBuilderModal({ isOpen: false, sequence: null })}
          sequence={sequenceBuilderModal.sequence}
          onSave={() => {
            fetchWorkflowSequences();
            setSequenceBuilderModal({ isOpen: false, sequence: null });
          }}
        />

        {/* Template Editor Modal */}
        <TemplateEditorModal
          isOpen={templateEditorModal.isOpen}
          onClose={() => setTemplateEditorModal({ ...templateEditorModal, isOpen: false })}
          template={templateEditorModal.template}
          type={templateEditorModal.type}
          mode={templateEditorModal.mode}
          onSave={handleSaveTemplate}
        />
      </div>
    </div>
  );
}