import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { CampaignType } from "@/types/campaigns";
import { ChevronLeft, ChevronRight, X, Folder } from "lucide-react";
import { CampaignTypeStep } from "@/components/campaigns/wizard/CampaignTypeStep";
import { SegmentSelectionStep } from "@/components/campaigns/wizard/SegmentSelectionStep";
import { ContentEditorStep } from "@/components/campaigns/wizard/ContentEditorStep";
import { ScheduleStep } from "@/components/campaigns/wizard/ScheduleStep";
import { useCampaigns } from "@/hooks/useCampaigns";
import { useCampaignFolders } from "@/hooks/useCampaignFolders";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { SidebarProvider } from "@/components/ui/sidebar";
import { WorkspaceSidebar } from "@/components/WorkspaceSidebar";
import { TopBar } from "@/components/TopBar";
import { WorkspaceProvider, useWorkspace } from "@/contexts/WorkspaceContext";
import { PremiumProvider } from "@/contexts/PremiumContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CampaignFormData {
  name: string;
  type: CampaignType;
  segment_id: string | null;
  subject: string;
  message_content: string;
  scheduled_at: string | null;
  folder_id: string | null;
}

function CreateCampaignPageContent() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialType = (searchParams.get("type") as CampaignType) || "email";
  
  const [currentStep, setCurrentStep] = useState(0);
  const { createCampaign } = useCampaigns();
  const { folders } = useCampaignFolders(initialType);
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState<CampaignFormData>({
    name: "",
    type: initialType,
    segment_id: null,
    subject: "",
    message_content: "",
    scheduled_at: null,
    folder_id: null,
  });

  // Determine if we should skip campaign type selection based on URL parameter
  const hasInitialType = searchParams.has("type");

  const steps = hasInitialType
    ? [
        { title: "Campaign Details", description: "Enter campaign name" },
        { title: "Select Segment", description: "Choose your target audience" },
        { title: "Create Content", description: "Design your message" },
        ...(formData.type === "email" ? [{ title: "Schedule", description: "Choose when to send" }] : []),
      ]
    : [
        { title: "Campaign Type", description: "Choose your campaign type" },
        { title: "Select Segment", description: "Choose your target audience" },
        { title: "Create Content", description: "Design your message" },
        ...(formData.type === "email" ? [{ title: "Schedule", description: "Choose when to send" }] : []),
      ];

  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const newCampaign = await createCampaign({
        ...formData,
        status: formData.scheduled_at ? 'scheduled' : 'draft',
      });
      
      if (!newCampaign) {
        toast({
          title: "Error",
          description: "Failed to create campaign. Please check your inputs and try again.",
          variant: "destructive",
        });
        return;
      }
      
      // If email campaign without scheduling, trigger send immediately and update status
      if (formData.type === "email" && !formData.scheduled_at) {
        toast({
          title: "Sending Campaign",
          description: "Your campaign is being sent...",
        });
        await sendCampaignNow(newCampaign.id);
        
        // Update campaign status to 'sent'
        const { error: updateError } = await supabase
          .from('campaigns')
          .update({ status: 'sent', sent_at: new Date().toISOString() })
          .eq('id', newCampaign.id);
          
        if (updateError) {
          console.error('Error updating campaign status:', updateError);
        }
      } else {
        toast({
          title: "Success",
          description: formData.scheduled_at ? "Campaign scheduled successfully" : "Campaign created as draft",
        });
      }
      
      // Navigate back to campaigns dashboard
      navigate('/app', { state: { view: 'crm', campaignType: formData.type, refetch: true } });
    } catch (error) {
      console.error('Error creating campaign:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const sendCampaignNow = async (campaignId: string) => {
    try {
      const { data, error } = await supabase.functions.invoke("send-campaign-emails", {
        body: { campaignId },
      });

      if (error) throw error;

      toast({
        title: "Campaign Sent",
        description: `Successfully sent ${data.sent} emails${data.failed > 0 ? `, ${data.failed} failed` : ''}`,
      });
    } catch (error: any) {
      console.error("Error sending campaign:", error);
      toast({
        title: "Error",
        description: "Failed to send campaign emails",
        variant: "destructive",
      });
    }
  };

  const canProceed = () => {
    // Adjust step index if we skipped the type selection
    const stepIndex = hasInitialType ? currentStep + 1 : currentStep;
    
    switch (stepIndex) {
      case 0:
        return formData.name.trim() !== "" && formData.type !== null;
      case 1:
        return formData.name.trim() !== "";
      case 2:
        return formData.segment_id !== null;
      case 3:
        if (formData.type === "email") {
          return formData.subject.trim() !== "" && formData.message_content.trim() !== "";
        }
        return formData.message_content.trim() !== "";
      case 4:
        return true; // Schedule step is optional
      default:
        return false;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <WorkspaceSidebar 
          onDashboardClick={() => {}}
          onPostBuilderClick={() => {}}
          onAdBuilderClick={() => {}}
          onSocialLoginsClick={() => {}}
          onInspirationHubClick={() => {}}
          onAnalyticsClick={() => {}}
          onScheduleClick={() => {}}
          onWorkspacesClick={() => {}}
          onUserSettingsClick={() => {}}
          onCRMClick={() => {}}
          onDomainSetupClick={() => {}}
          onCRMAutomationsClick={() => {}}
          onTemplatesClick={() => {}}
          onAgentsClick={() => {}}
          onSmartAutomationsClick={() => {}}
          onServicesClick={() => {}}
          onPublishedPostsClick={() => {}}
          onAISalesAutomationClick={() => {}}
          currentView="crm"
        />
        
        <div className="flex-1 flex flex-col min-w-0">
          <TopBar />
          
          <div className="flex-1 bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20 overflow-auto">
            {/* Header */}
            <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/60 sticky top-0 z-10">
              <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => navigate('/app', { state: { view: 'crm' } })}
                      className="hover:bg-gray-100"
                    >
                      <X className="w-5 h-5" />
                    </Button>
                    <div>
                      <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
                        {hasInitialType && currentStep === 0
                          ? `Create ${initialType === 'email' ? 'an Email' : 'a WhatsApp'} Campaign`
                          : steps[currentStep].title
                        }
                      </h1>
                      <p className="text-sm text-muted-foreground">
                        {hasInitialType && currentStep === 0
                          ? "Enter your campaign details"
                          : steps[currentStep].description
                        }
                      </p>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Step {currentStep + 1} of {steps.length}
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="mt-4">
                  <Progress value={progress} className="h-2" />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-6 py-8">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/60 shadow-lg p-8">
                {!hasInitialType && currentStep === 0 && (
                  <CampaignTypeStep formData={formData} setFormData={setFormData} />
                )}
                {hasInitialType && currentStep === 0 && (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="campaign-name">Campaign Name</Label>
                      <Input
                        id="campaign-name"
                        placeholder="e.g., Summer Sale Announcement"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="folder-select">Folder (Optional)</Label>
                      <Select
                        value={formData.folder_id || "none"}
                        onValueChange={(value) => 
                          setFormData({ ...formData, folder_id: value === "none" ? null : value })
                        }
                      >
                        <SelectTrigger id="folder-select">
                          <SelectValue placeholder="Select a folder">
                            {formData.folder_id ? (
                              <div className="flex items-center gap-2">
                                <Folder 
                                  className="w-4 h-4" 
                                  style={{ color: folders.find(f => f.id === formData.folder_id)?.color }}
                                />
                                {folders.find(f => f.id === formData.folder_id)?.name}
                              </div>
                            ) : (
                              "Uncategorized"
                            )}
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">
                            <div className="flex items-center gap-2">
                              <Folder className="w-4 h-4 text-gray-400" />
                              Uncategorized
                            </div>
                          </SelectItem>
                          {folders.map((folder) => (
                            <SelectItem key={folder.id} value={folder.id}>
                              <div className="flex items-center gap-2">
                                <Folder 
                                  className="w-4 h-4" 
                                  style={{ color: folder.color }}
                                />
                                {folder.name}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground">
                        Organize your campaign by selecting a folder
                      </p>
                    </div>
                  </div>
                )}
                {((hasInitialType && currentStep === 1) || (!hasInitialType && currentStep === 1)) && (
                  <SegmentSelectionStep formData={formData} setFormData={setFormData} />
                )}
                {((hasInitialType && currentStep === 2) || (!hasInitialType && currentStep === 2)) && (
                  <ContentEditorStep formData={formData} setFormData={setFormData} />
                )}
                {((hasInitialType && currentStep === 3) || (!hasInitialType && currentStep === 3)) && formData.type === "email" && (
                  <ScheduleStep formData={formData} setFormData={setFormData} />
                )}
              </div>
            </div>

            {/* Footer Navigation */}
            <div className="bg-white/80 backdrop-blur-sm border-t border-gray-200/60 sticky bottom-0">
              <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                  <Button
                    variant="outline"
                    onClick={handleBack}
                    disabled={currentStep === 0}
                    size="lg"
                  >
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>

                  {currentStep === steps.length - 1 ? (
                    <Button
                      onClick={handleSubmit}
                      disabled={!canProceed() || isSubmitting}
                      className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 hover:from-blue-700 hover:via-purple-700 hover:to-pink-600 text-white"
                      size="lg"
                    >
              {isSubmitting ? "Creating..." : formData.scheduled_at ? "Schedule now" : "Launch Immediately"}
                    </Button>
                  ) : (
                    <Button
                      onClick={handleNext}
                      disabled={!canProceed()}
                      className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 hover:from-blue-700 hover:via-purple-700 hover:to-pink-600 text-white"
                      size="lg"
                    >
                      Next
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}

export default function CreateCampaignPage() {
  return <CreateCampaignPageContent />;
}

export function CreateCampaignInline() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialType = (searchParams.get("type") as CampaignType) || "email";
  
  const [currentStep, setCurrentStep] = useState(0);
  const { createCampaign } = useCampaigns();
  const { folders } = useCampaignFolders();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState<CampaignFormData>({
    name: "",
    type: initialType,
    segment_id: null,
    subject: "",
    message_content: "",
    scheduled_at: null,
    folder_id: null,
  });

  // Determine if we should skip campaign type selection based on URL parameter
  const hasInitialType = searchParams.has("type");

  const steps = hasInitialType
    ? [
        { title: "Campaign Details", description: "Enter campaign name" },
        { title: "Select Segment", description: "Choose your target audience" },
        { title: "Create Content", description: "Design your message" },
        ...(formData.type === "email" ? [{ title: "Schedule", description: "Choose when to send" }] : []),
      ]
    : [
        { title: "Campaign Type", description: "Choose your campaign type" },
        { title: "Select Segment", description: "Choose your target audience" },
        { title: "Create Content", description: "Design your message" },
        ...(formData.type === "email" ? [{ title: "Schedule", description: "Choose when to send" }] : []),
      ];

  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleNext = () => {
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
  };
  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const sendCampaignNow = async (campaignId: string) => {
    try {
      const { data, error } = await supabase.functions.invoke("send-campaign-emails", { body: { campaignId } });
      if (error) throw error;
      toast({ title: "Campaign Sent", description: `Successfully sent ${data.sent} emails${data.failed > 0 ? `, ${data.failed} failed` : ''}` });
    } catch (error: any) {
      console.error("Error sending campaign:", error);
      toast({ title: "Error", description: "Failed to send campaign emails", variant: "destructive" });
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const newCampaign = await createCampaign({ ...formData, status: formData.scheduled_at ? 'scheduled' : 'draft' });
      if (!newCampaign) {
        toast({ title: "Error", description: "Failed to create campaign. Please check your inputs and try again.", variant: "destructive" });
        return;
      }
      if (formData.type === "email" && !formData.scheduled_at) {
        toast({ title: "Sending Campaign", description: "Your campaign is being sent..." });
        await sendCampaignNow(newCampaign.id);
        const { error: updateError } = await supabase
          .from('campaigns')
          .update({ status: 'sent', sent_at: new Date().toISOString() })
          .eq('id', newCampaign.id);
        if (updateError) console.error('Error updating campaign status:', updateError);
      } else {
        toast({ title: "Success", description: formData.scheduled_at ? "Campaign scheduled successfully" : "Campaign created as draft" });
      }
      navigate('/app', { state: { view: 'crm', campaignType: formData.type, refetch: true } });
    } catch (error) {
      console.error('Error creating campaign:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const canProceed = () => {
    // Adjust step index if we skipped the type selection
    const stepIndex = hasInitialType ? currentStep + 1 : currentStep;
    
    switch (stepIndex) {
      case 0:
        return formData.name.trim() !== "" && formData.type !== null;
      case 1:
        return formData.name.trim() !== "";
      case 2:
        return formData.segment_id !== null;
      case 3:
        if (formData.type === "email") return formData.subject.trim() !== "" && formData.message_content.trim() !== "";
        return formData.message_content.trim() !== "";
      case 4:
        return true;
      default:
        return false;
    }
  };

  return (
    <div className="flex-1 bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20 overflow-auto">
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/60 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="hover:bg-gray-100">
                <X className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
                  {hasInitialType && currentStep === 0
                    ? `Create ${initialType === 'email' ? 'an Email' : 'a WhatsApp'} Campaign`
                    : steps[currentStep].title
                  }
                </h1>
                <p className="text-sm text-muted-foreground">
                  {hasInitialType && currentStep === 0
                    ? "Enter your campaign details"
                    : steps[currentStep].description
                  }
                </p>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">Step {currentStep + 1} of {steps.length}</div>
          </div>
          <div className="mt-4">
            <Progress value={progress} className="h-2" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/60 shadow-lg p-8">
          {!hasInitialType && currentStep === 0 && (<CampaignTypeStep formData={formData} setFormData={setFormData} />)}
                {hasInitialType && currentStep === 0 && (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="campaign-name-inline">Campaign Name</Label>
                      <Input
                        id="campaign-name-inline"
                        placeholder="e.g., Summer Sale Announcement"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="folder-select-inline">Folder (Optional)</Label>
                      <Select
                        value={formData.folder_id || "none"}
                        onValueChange={(value) => 
                          setFormData({ ...formData, folder_id: value === "none" ? null : value })
                        }
                      >
                        <SelectTrigger id="folder-select-inline">
                          <SelectValue placeholder="Select a folder">
                            {formData.folder_id ? (
                              <div className="flex items-center gap-2">
                                <Folder 
                                  className="w-4 h-4" 
                                  style={{ color: folders.find(f => f.id === formData.folder_id)?.color }}
                                />
                                {folders.find(f => f.id === formData.folder_id)?.name}
                              </div>
                            ) : (
                              "Uncategorized"
                            )}
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">
                            <div className="flex items-center gap-2">
                              <Folder className="w-4 h-4 text-gray-400" />
                              Uncategorized
                            </div>
                          </SelectItem>
                          {folders.map((folder) => (
                            <SelectItem key={folder.id} value={folder.id}>
                              <div className="flex items-center gap-2">
                                <Folder 
                                  className="w-4 h-4" 
                                  style={{ color: folder.color }}
                                />
                                {folder.name}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground">
                        Organize your campaign by selecting a folder
                      </p>
                    </div>
                  </div>
                )}
          {((hasInitialType && currentStep === 1) || (!hasInitialType && currentStep === 1)) && (<SegmentSelectionStep formData={formData} setFormData={setFormData} />)}
          {((hasInitialType && currentStep === 2) || (!hasInitialType && currentStep === 2)) && (<ContentEditorStep formData={formData} setFormData={setFormData} />)}
          {((hasInitialType && currentStep === 3) || (!hasInitialType && currentStep === 3)) && formData.type === "email" && (<ScheduleStep formData={formData} setFormData={setFormData} />)}
        </div>
      </div>

      <div className="bg-white/80 backdrop-blur-sm border-t border-gray-200/60 sticky bottom-0">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Button variant="outline" onClick={handleBack} disabled={currentStep === 0} size="lg">
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back
            </Button>

            {currentStep === steps.length - 1 ? (
              <Button onClick={handleSubmit} disabled={!canProceed() || isSubmitting} className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 hover:from-blue-700 hover:via-purple-700 hover:to-pink-600 text-white" size="lg">
                {isSubmitting ? "Creating..." : formData.scheduled_at ? "Schedule now" : "Launch Immediately"}
              </Button>
            ) : (
              <Button onClick={handleNext} disabled={!canProceed()} className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 hover:from-blue-700 hover:via-purple-700 hover:to-pink-600 text-white" size="lg">
                Next
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

