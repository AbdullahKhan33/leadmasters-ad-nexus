
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, CheckCircle2, Circle } from "lucide-react";
import { TemplateSelection } from "./campaign/TemplateSelection";
import { TemplateCreation } from "./campaign/TemplateCreation";
import { CampaignConfiguration } from "./campaign/CampaignConfiguration";

interface Template {
  id: string;
  name: string;
  type: string;
  category: string;
  language: string;
  status: string;
  createdAt: string;
}

interface WhatsAppCampaignBuilderProps {
  onBack: () => void;
}

export function WhatsAppCampaignBuilder({ onBack }: WhatsAppCampaignBuilderProps) {
  const [currentStep, setCurrentStep] = useState<'template-selection' | 'template-creation' | 'configure-campaign'>('template-selection');
  const [templates, setTemplates] = useState<Template[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [isCreatingTemplate, setIsCreatingTemplate] = useState(false);

  const handleCreateNewTemplate = async () => {
    setIsCreatingTemplate(true);
    // Simulate loading time for template creation initialization
    await new Promise(resolve => setTimeout(resolve, 800));
    setCurrentStep('template-creation');
    setIsCreatingTemplate(false);
  };

  const handleTemplateCreated = (newTemplate: Template) => {
    setTemplates(prev => [...prev, newTemplate]);
    setCurrentStep('template-selection');
  };

  const handleTemplateSelected = (template: Template) => {
    setSelectedTemplate(template);
  };

  const handleNextStep = () => {
    if (selectedTemplate) {
      setCurrentStep('configure-campaign');
    }
  };

  // Campaign configuration handlers
  const handleCampaignBack = () => {
    setCurrentStep('template-selection');
  };

  const handleCampaignSubmit = (campaignData: any) => {
    console.log('Campaign submitted:', campaignData);
    console.log('Selected template:', selectedTemplate);
    // Here you would typically submit the campaign data to your backend
    // For now, we'll just log it and potentially show a success message
  };

  const handleRefreshTemplates = async () => {
    // Simulate API call to refresh templates
    console.log('Refreshing templates...');
    // Here you would typically fetch updated templates from your backend
    // For now, we'll just simulate a refresh
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 'template-selection':
        return 'Create Campaign in 2 Steps';
      case 'template-creation':
        return 'Create a New Template';
      case 'configure-campaign':
        return 'Configure Campaign';
      default:
        return 'Create Campaign';
    }
  };

  const renderStepIndicator = () => {
    if (currentStep === 'template-creation') return null;
    
    return (
      <div className="flex items-center justify-center space-x-8 mb-8">
        <div className="flex items-center space-x-2">
          {currentStep === 'template-selection' ? (
            <CheckCircle2 className="w-6 h-6 text-purple-600" />
          ) : (
            <Circle className="w-6 h-6 text-purple-600 fill-purple-600" />
          )}
          <span className={`font-medium ${currentStep === 'template-selection' ? 'text-purple-600' : 'text-gray-900'}`}>
            Step 1: Select Template
          </span>
        </div>
        
        <div className={`h-px w-16 ${currentStep === 'configure-campaign' ? 'bg-purple-600' : 'bg-gray-300'}`} />
        
        <div className="flex items-center space-x-2">
          {currentStep === 'configure-campaign' ? (
            <CheckCircle2 className="w-6 h-6 text-purple-600" />
          ) : (
            <Circle className="w-6 h-6 text-gray-300" />
          )}
          <span className={`font-medium ${currentStep === 'configure-campaign' ? 'text-purple-600' : 'text-gray-400'}`}>
            Step 2: Configure Campaign
          </span>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (currentStep) {
      case 'template-selection':
        return (
          <TemplateSelection
            templates={templates}
            selectedTemplate={selectedTemplate}
            onTemplateSelect={handleTemplateSelected}
            onCreateNewTemplate={handleCreateNewTemplate}
            onNext={handleNextStep}
            isCreatingTemplate={isCreatingTemplate}
            onRefresh={handleRefreshTemplates}
          />
        );
      case 'template-creation':
        return (
          <TemplateCreation
            onTemplateCreated={handleTemplateCreated}
            onCancel={() => setCurrentStep('template-selection')}
          />
        );
      case 'configure-campaign':
        return (
          <CampaignConfiguration
            onBack={handleCampaignBack}
            onSubmit={handleCampaignSubmit}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex-1 p-6 bg-gray-50">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>

        {/* Page Title */}
        <div className="text-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#7C3AED] to-[#D946EF] bg-clip-text text-transparent mb-2">
            {getStepTitle()}
          </h1>
          {currentStep !== 'template-creation' && (
            <p className="text-gray-600">
              Create and send personalized WhatsApp messages with AI assistance
            </p>
          )}
        </div>

        {/* Step Indicator */}
        {renderStepIndicator()}

        {/* Content */}
        {renderContent()}
      </div>
    </div>
  );
}
