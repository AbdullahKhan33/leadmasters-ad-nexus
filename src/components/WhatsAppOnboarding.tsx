
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
  isConnected?: boolean;
  onDisconnect?: () => void;
}

interface OnboardingStep {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  status: 'completed' | 'pending' | 'error';
}

export function WhatsAppOnboarding({ 
  open, 
  onOpenChange, 
  isConnected = false,
  onDisconnect 
}: WhatsAppOnboardingProps) {
  const [showDisconnectConfirm, setShowDisconnectConfirm] = useState(false);
  
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

  const handleDisconnect = () => {
    if (onDisconnect) {
      onDisconnect();
      setShowDisconnectConfirm(false);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md mx-auto p-0 overflow-hidden">
        <div className="bg-white">
          <DialogHeader className="p-6 pb-4">
            <div className="flex items-center justify-center mb-4">
              <div className={`w-16 h-16 bg-gradient-to-br ${isConnected ? 'from-green-100 to-emerald-100' : 'from-green-100 to-emerald-100'} rounded-full flex items-center justify-center`}>
                {isConnected ? (
                  <CheckCircle2 className="w-8 h-8 text-green-600" />
                ) : (
                  <MessageCircle className="w-8 h-8 text-green-600" />
                )}
              </div>
            </div>
            <DialogTitle className="text-xl font-semibold text-center text-gray-900">
              {isConnected ? "WhatsApp Business Status" : "WhatsApp Business Onboarding"}
            </DialogTitle>
          </DialogHeader>

          <div className="px-6 pb-6">
            {isConnected ? (
              /* Connected View */
              <>
                {/* Success Message */}
                <div className="text-center mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
                  <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto mb-3" />
                  <h3 className="text-lg font-semibold text-green-900 mb-1">
                    Successfully Connected!
                  </h3>
                  <p className="text-sm text-green-700">
                    Your WhatsApp Business account is fully configured
                  </p>
                </div>

                {/* Verification Checklist */}
                <div className="space-y-3 mb-6">
                  <h4 className="font-medium text-gray-900 text-sm">Verified Components</h4>
                  {[
                    "Business Profile Verified",
                    "Phone Number Verified",
                    "API Access Granted",
                    "Webhook Configured",
                    "Message Templates Approved"
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-green-50 border border-green-100">
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-sm font-medium text-green-900">{item}</span>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                {showDisconnectConfirm ? (
                  <div className="space-y-3">
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-sm text-red-800 mb-3">
                        Are you sure you want to disconnect? This will remove all WhatsApp Business integration settings.
                      </p>
                      <div className="flex space-x-2">
                        <Button
                          onClick={handleDisconnect}
                          variant="destructive"
                          size="sm"
                          className="flex-1"
                        >
                          Yes, Disconnect
                        </Button>
                        <Button
                          onClick={() => setShowDisconnectConfirm(false)}
                          variant="outline"
                          size="sm"
                          className="flex-1"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Button 
                      onClick={handleAuthenticate}
                      variant="outline"
                      className="w-full border-green-600 text-green-700 hover:bg-green-50"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Add Another Account
                    </Button>
                    <Button
                      onClick={() => setShowDisconnectConfirm(true)}
                      variant="outline"
                      className="w-full text-red-600 border-red-300 hover:bg-red-50"
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      Disconnect
                    </Button>
                  </div>
                )}
              </>
            ) : (
              /* Not Connected View */
              <>
                {/* Connection Status */}
                <Card className="mb-6">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <XCircle className="w-6 h-6 text-red-600" />
                      <div>
                        <div className="font-medium text-red-800">Not Connected</div>
                        <div className="text-sm text-red-600">Authentication required</div>
                      </div>
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
              </>
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
