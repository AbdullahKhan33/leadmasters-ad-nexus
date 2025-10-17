import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CampaignType } from "@/types/campaigns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CampaignTypeStep } from "./wizard/CampaignTypeStep";
import { SegmentSelectionStep } from "./wizard/SegmentSelectionStep";
import { ContentEditorStep } from "./wizard/ContentEditorStep";
import { ScheduleStep } from "./wizard/ScheduleStep";
import { useCampaigns } from "@/hooks/useCampaigns";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface CampaignWizardProps {
  isOpen: boolean;
  onClose: () => void;
  initialType?: CampaignType;
}

interface CampaignFormData {
  name: string;
  type: CampaignType;
  segment_id: string | null;
  subject: string;
  message_content: string;
  scheduled_at: string | null;
}

export function CampaignWizard({ isOpen, onClose, initialType }: CampaignWizardProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const { createCampaign } = useCampaigns();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState<CampaignFormData>({
    name: "",
    type: initialType || "email",
    segment_id: null,
    subject: "",
    message_content: "",
    scheduled_at: null,
  });

  const steps = [
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
      
      // If email campaign without scheduling, trigger send immediately
      if (formData.type === "email" && !formData.scheduled_at) {
        toast({
          title: "Sending Campaign",
          description: "Your campaign is being sent...",
        });
        await sendCampaignNow(newCampaign.id);
      } else {
        toast({
          title: "Success",
          description: formData.scheduled_at ? "Campaign scheduled successfully" : "Campaign created as draft",
        });
      }
      
      onClose();
      resetForm();
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

  const resetForm = () => {
    setCurrentStep(0);
    setFormData({
      name: "",
      type: initialType || "email",
      segment_id: null,
      subject: "",
      message_content: "",
      scheduled_at: null,
    });
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return formData.name.trim() !== "" && formData.type !== null;
      case 1:
        return formData.segment_id !== null;
      case 2:
        if (formData.type === "email") {
          return formData.subject.trim() !== "" && formData.message_content.trim() !== "";
        }
        return formData.message_content.trim() !== "";
      case 3:
        return true; // Schedule step is optional
      default:
        return false;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
            {steps[currentStep].title}
          </DialogTitle>
          <DialogDescription>{steps[currentStep].description}</DialogDescription>
        </DialogHeader>

        {/* Progress Bar */}
        <div className="space-y-2">
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Step {currentStep + 1} of {steps.length}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
        </div>

        {/* Step Content */}
        <div className="py-6">
          {currentStep === 0 && (
            <CampaignTypeStep formData={formData} setFormData={setFormData} />
          )}
          {currentStep === 1 && (
            <SegmentSelectionStep formData={formData} setFormData={setFormData} />
          )}
          {currentStep === 2 && (
            <ContentEditorStep formData={formData} setFormData={setFormData} />
          )}
          {currentStep === 3 && formData.type === "email" && (
            <ScheduleStep formData={formData} setFormData={setFormData} />
          )}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-4 border-t">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 0}
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          {currentStep === steps.length - 1 ? (
            <Button
              onClick={handleSubmit}
              disabled={!canProceed() || isSubmitting}
              className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 hover:from-blue-700 hover:via-purple-700 hover:to-pink-600 text-white"
            >
              {isSubmitting ? "Creating..." : formData.scheduled_at ? "Schedule Campaign" : "Create Campaign"}
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              disabled={!canProceed()}
              className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 hover:from-blue-700 hover:via-purple-700 hover:to-pink-600 text-white"
            >
              Next
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
