
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Check, 
  Clock, 
  Mail, 
  Shield, 
  Globe, 
  User,
  Info,
  Upload,
  Send
} from "lucide-react";

interface DNSRecord {
  type: string;
  host: string;
  value: string;
  status: 'pending' | 'verified';
}

export function DomainSetup() {
  const [currentStep, setCurrentStep] = useState(1);
  const [domainName, setDomainName] = useState("");
  const [isCreatingDomain, setIsCreatingDomain] = useState(false);
  const [isCheckingDNS, setIsCheckingDNS] = useState(false);
  const [senderDisplayName, setSenderDisplayName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [fromName, setFromName] = useState("");
  const [defaultFromEmail, setDefaultFromEmail] = useState("");
  
  const [dnsRecords] = useState<DNSRecord[]>([
    {
      type: "TXT",
      host: "@",
      value: "v=spf1 include:acs.azure.com ~all",
      status: "pending"
    },
    {
      type: "TXT", 
      host: "dkim._domainkey",
      value: "k=rsa; p=MIGfMA0GCSqGSIb3DQEBAQUAA...",
      status: "pending"
    }
  ]);

  const steps = [
    { number: 1, title: "Domain Creation", icon: Globe },
    { number: 2, title: "DNS Verification", icon: Shield },
    { number: 3, title: "Domain Linking & Sender Identity", icon: Mail },
    { number: 4, title: "Sender Profile Setup", icon: User }
  ];

  const handleCreateDomain = async () => {
    if (!domainName) return;
    
    setIsCreatingDomain(true);
    // Simulate API call
    setTimeout(() => {
      setIsCreatingDomain(false);
      setCurrentStep(2);
    }, 2000);
  };

  const handleCheckDNS = async () => {
    setIsCheckingDNS(true);
    // Simulate DNS check
    setTimeout(() => {
      setIsCheckingDNS(false);
      setCurrentStep(3);
    }, 3000);
  };

  const handleCreateSenderIdentity = async () => {
    setCurrentStep(4);
  };

  const handleSaveProfile = async () => {
    // Handle profile save
    console.log("Profile saved successfully");
  };

  const progressPercentage = (currentStep / 4) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50/30 p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
            Email Domain & Sender Setup
          </h1>
          <p className="text-gray-600 text-lg">
            Configure your email domain for secure sending with Azure Communication Services
          </p>
        </div>

        {/* Progress Bar */}
        <Card className="bg-white shadow-sm">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-600">Setup Progress</span>
                <span className="text-sm font-medium text-blue-600">{Math.round(progressPercentage)}% Complete</span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
              
              {/* Step Indicators */}
              <div className="flex justify-between items-center mt-6">
                {steps.map((step) => (
                  <div key={step.number} className="flex flex-col items-center space-y-2">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      currentStep >= step.number 
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' 
                        : 'bg-gray-200 text-gray-500'
                    }`}>
                      {currentStep > step.number ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        <step.icon className="w-5 h-5" />
                      )}
                    </div>
                    <div className="text-center">
                      <div className="text-xs font-medium text-gray-900">{step.number}. {step.title}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Step Content */}
        <div className="space-y-6">
          {/* Step 1: Domain Creation */}
          {currentStep === 1 && (
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Globe className="w-5 h-5 text-blue-600" />
                  <span>Step 1: Domain Creation</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">Add your sending domain to LeadMasters.</p>
                
                <div className="space-y-2">
                  <Label htmlFor="domain">Domain Name</Label>
                  <Input
                    id="domain"
                    placeholder="example.com"
                    value={domainName}
                    onChange={(e) => setDomainName(e.target.value)}
                  />
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <Info className="w-4 h-4 text-blue-600 mt-0.5" />
                    <p className="text-sm text-blue-800">
                      We'll provision your domain with Azure Communication Services (ACS) for secure email sending.
                    </p>
                  </div>
                </div>
                
                <Button 
                  onClick={handleCreateDomain}
                  disabled={!domainName || isCreatingDomain}
                  className="w-full"
                >
                  {isCreatingDomain ? (
                    <>
                      <Clock className="w-4 h-4 mr-2 animate-spin" />
                      Creating Domain...
                    </>
                  ) : (
                    "Create Domain"
                  )}
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Step 2: DNS Verification */}
          {currentStep === 2 && (
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-orange-600" />
                  <span>Step 2: DNS Verification</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">Add these DNS records to your domain provider.</p>
                
                {/* DNS Records Table */}
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Type</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Host/Name</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Value</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dnsRecords.map((record, index) => (
                        <tr key={index} className="border-t">
                          <td className="px-4 py-2 text-sm font-mono">{record.type}</td>
                          <td className="px-4 py-2 text-sm font-mono">{record.host}</td>
                          <td className="px-4 py-2 text-sm font-mono truncate max-w-xs" title={record.value}>
                            {record.value}
                          </td>
                          <td className="px-4 py-2">
                            <Badge variant={record.status === 'verified' ? 'default' : 'secondary'}>
                              {record.status === 'verified' ? (
                                <><Check className="w-3 h-3 mr-1" /> Verified</>
                              ) : (
                                <><Clock className="w-3 h-3 mr-1" /> Pending</>
                              )}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="bg-orange-50 p-4 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <Info className="w-4 h-4 text-orange-600 mt-0.5" />
                    <p className="text-sm text-orange-800">
                      Please add these TXT records to your domain's DNS. We'll automatically detect once they're active.
                    </p>
                  </div>
                </div>
                
                <Button 
                  onClick={handleCheckDNS}
                  disabled={isCheckingDNS}
                  className="w-full"
                >
                  {isCheckingDNS ? (
                    <>
                      <Clock className="w-4 h-4 mr-2 animate-spin" />
                      Checking DNS Status...
                    </>
                  ) : (
                    "Check DNS Status"
                  )}
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Domain Linking & Sender Identity */}
          {currentStep === 3 && (
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Mail className="w-5 h-5 text-green-600" />
                  <span>Step 3: Domain Linking & Sender Identity</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Check className="w-5 h-5 text-green-600" />
                    <p className="text-green-800 font-medium">Your domain is verified!</p>
                  </div>
                </div>
                
                <p className="text-gray-600">Link it to Azure Communication Service and create your sender identity.</p>
                
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="senderDisplayName">Sender Display Name</Label>
                    <Input
                      id="senderDisplayName"
                      placeholder="LeadMasters Notifications"
                      value={senderDisplayName}
                      onChange={(e) => setSenderDisplayName(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="senderEmail">Sender Email Address</Label>
                    <Input
                      id="senderEmail"
                      placeholder={`notifications@${domainName}`}
                      value={senderEmail}
                      onChange={(e) => setSenderEmail(e.target.value)}
                    />
                    <p className="text-xs text-gray-500">Must belong to the verified domain</p>
                  </div>
                </div>
                
                <Button 
                  onClick={handleCreateSenderIdentity}
                  disabled={!senderDisplayName || !senderEmail}
                  className="w-full"
                >
                  Create Sender Identity & Link Domain
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Step 4: Sender Profile Setup */}
          {currentStep === 4 && (
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="w-5 h-5 text-purple-600" />
                  <span>Step 4: Sender Profile Setup</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">Complete your sender profile configuration.</p>
                
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fromName">From Name</Label>
                    <Input
                      id="fromName"
                      placeholder="LeadMasters Team"
                      value={fromName}
                      onChange={(e) => setFromName(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="defaultFromEmail">Default From Email Address</Label>
                    <Input
                      id="defaultFromEmail"
                      placeholder={`hello@${domainName}`}
                      value={defaultFromEmail}
                      onChange={(e) => setDefaultFromEmail(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="logo">Company Logo (Optional)</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                      <p className="text-xs text-gray-500">PNG, JPG up to 2MB</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <Button 
                    onClick={handleSaveProfile}
                    disabled={!fromName || !defaultFromEmail}
                    className="flex-1"
                  >
                    Save Profile
                  </Button>
                  
                  <Button variant="outline" className="flex-1">
                    <Send className="w-4 h-4 mr-2" />
                    Send Test Email
                  </Button>
                </div>
                
                {currentStep === 4 && (
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Check className="w-5 h-5 text-green-600" />
                      <p className="text-green-800 font-medium">Setup Complete!</p>
                    </div>
                    <p className="text-green-700 text-sm mt-1">
                      Your email domain is now ready for secure sending through LeadMasters.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
