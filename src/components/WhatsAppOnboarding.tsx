
import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  MessageCircle, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle,
  HelpCircle,
  User,
  Phone,
  Key
} from "lucide-react";

interface WhatsAppOnboardingProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface OnboardingStep {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  status: 'completed' | 'pending' | 'error';
}

export function WhatsAppOnboarding({ open, onOpenChange }: WhatsAppOnboardingProps) {
  // Mock connection status - in real app this would come from your backend
  const [isConnected] = useState(false);
  
  const steps: OnboardingStep[] = [
    {
      id: 'profile',
      title: 'Business Profile Setup',
      icon: User,
      status: isConnected ? 'completed' : 'pending'
    },
    {
      id: 'verification',
      title: 'Number Verification',
      icon: Phone,
      status: isConnected ? 'completed' : 'pending'
    },
    {
      id: 'api',
      title: 'API Access Granted',
      icon: Key,
      status: isConnected ? 'completed' : 'pending'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
    }
  };

  const handleAuthenticate = () => {
    console.log("Starting WhatsApp Business authentication...");
    // In a real app, this would trigger the authentication flow
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md mx-auto p-0 overflow-hidden">
        <div className="bg-white">
          <DialogHeader className="p-6 pb-4">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center">
                <MessageCircle className="w-8 h-8 text-green-600" />
              </div>
            </div>
            <DialogTitle className="text-xl font-semibold text-center text-gray-900">
              WhatsApp Business Onboarding
            </DialogTitle>
          </DialogHeader>

          <div className="px-6 pb-6">
            {/* Connection Status */}
            <Card className="mb-6">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  {isConnected ? (
                    <>
                      <CheckCircle2 className="w-6 h-6 text-green-600" />
                      <div>
                        <div className="font-medium text-green-800">Connected</div>
                        <div className="text-sm text-green-600">WhatsApp Business is ready</div>
                      </div>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-6 h-6 text-red-600" />
                      <div>
                        <div className="font-medium text-red-800">Not Connected</div>
                        <div className="text-sm text-red-600">Authentication required</div>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Onboarding Steps */}
            <div className="space-y-4 mb-6">
              <h3 className="font-medium text-gray-900">Setup Progress</h3>
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm">
                    <step.icon className="w-4 h-4 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm text-gray-900">{step.title}</div>
                  </div>
                  {getStatusIcon(step.status)}
                </div>
              ))}
            </div>

            {/* Action Section */}
            {isConnected ? (
              <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                <CheckCircle2 className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-sm text-green-800 font-medium mb-1">
                  Your WhatsApp Business account is connected and ready to use.
                </p>
                <p className="text-xs text-green-600">
                  You can now start creating campaigns and sending messages.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <Button 
                  onClick={handleAuthenticate}
                  className="w-full bg-gradient-to-r from-[#7C3AED] to-[#D946EF] hover:from-purple-700 hover:to-pink-600 text-white transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Authenticate WhatsApp
                </Button>
                
                {/* How it works link */}
                <div className="text-center">
                  <Button variant="ghost" size="sm" className="text-purple-600 hover:text-purple-700 hover:bg-purple-50">
                    <HelpCircle className="w-4 h-4 mr-1" />
                    How it works?
                  </Button>
                </div>
              </div>
            )}

            {/* Error Message Area (when applicable) */}
            {/* This would be conditionally rendered based on actual error state */}
            {false && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-start space-x-2">
                  <XCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-sm font-medium text-red-800">Authentication Failed</div>
                    <div className="text-xs text-red-600 mt-1">
                      Please check your credentials and try again.
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
