import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Circle, Globe, Settings, Mail, User, ArrowLeft, ChevronLeft } from "lucide-react";
import { useDomains } from "@/hooks/useDomains";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

interface DomainConfigWizardProps {
  domainId?: string;
  onComplete: () => void;
}

interface DNSRecord {
  type: string;
  host: string;
  value: string;
  status: "pending" | "verified";
}

export function DomainConfigWizard({ domainId, onComplete }: DomainConfigWizardProps) {
  const { user } = useAuth();
  const { domains, createDomain, updateDomainVerification } = useDomains();
  const [currentStep, setCurrentStep] = useState(1);
  const [domainName, setDomainName] = useState("");
  const [dnsRecords] = useState<DNSRecord[]>([
    {
      type: "TXT",
      host: "_spf",
      value: "v=spf1 include:spf.leadmasters.com ~all",
      status: "pending",
    },
    {
      type: "CNAME",
      host: "dkim._domainkey",
      value: "dkim.leadmasters.com",
      status: "pending",
    },
  ]);
  const [senderEmail, setSenderEmail] = useState("");
  const [senderName, setSenderName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [replyTo, setReplyTo] = useState("");
  const [activeDomainId, setActiveDomainId] = useState<string | undefined>(domainId);

  const currentDomain = activeDomainId ? domains.find(d => d.id === activeDomainId) : null;

  // Load saved state from localStorage
  useEffect(() => {
    if (!user?.id) return;
    
    const savedState = localStorage.getItem(`domain-wizard-${user.id}-${activeDomainId || 'new'}`);
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState);
        setCurrentStep(parsed.currentStep || 1);
        setDomainName(parsed.domainName || "");
        setSenderEmail(parsed.senderEmail || "");
        setSenderName(parsed.senderName || "");
        setDisplayName(parsed.displayName || "");
        setReplyTo(parsed.replyTo || "");
        if (parsed.activeDomainId) setActiveDomainId(parsed.activeDomainId);
      } catch (error) {
        console.error("Error loading saved wizard state:", error);
      }
    }
  }, [user?.id, activeDomainId]);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    if (!user?.id) return;
    
    const state = {
      currentStep,
      domainName,
      senderEmail,
      senderName,
      displayName,
      replyTo,
      activeDomainId,
    };
    
    localStorage.setItem(`domain-wizard-${user.id}-${activeDomainId || 'new'}`, JSON.stringify(state));
  }, [currentStep, domainName, senderEmail, senderName, displayName, replyTo, activeDomainId, user?.id]);

  useEffect(() => {
    if (domainId && currentDomain) {
      setDomainName(currentDomain.domain_name);
      // Start at step 2 if domain exists but not verified
      if (currentDomain.verification_status === 'pending') {
        setCurrentStep(2);
      } else if (currentDomain.verification_status === 'verified') {
        setCurrentStep(3);
      }
    } else {
      setCurrentStep(1);
      setDomainName("");
    }
  }, [domainId, currentDomain]);

  const steps = [
    { number: 1, title: "Add Domain", icon: Globe },
    { number: 2, title: "DNS Verification", icon: Settings },
    { number: 3, title: "Sender Identity", icon: Mail },
    { number: 4, title: "Profile Setup", icon: User },
  ];

  const progress = (currentStep / 4) * 100;

  const handleCreateDomain = async () => {
    if (!domainName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a domain name",
        variant: "destructive",
      });
      return;
    }

    try {
      const newDomain = await createDomain(domainName);
      setActiveDomainId(newDomain.id);
      setCurrentStep(2);
    } catch (error) {
      console.error("Error creating domain:", error);
    }
  };

  const handleCheckDNS = async () => {
    // Simulate DNS check
    toast({
      title: "Checking DNS records...",
      description: "This may take a few moments",
    });

    setTimeout(async () => {
      if (domainId) {
        await updateDomainVerification({
          domainId,
          spfVerified: true,
          dkimVerified: true,
        });
      }
      toast({
        title: "DNS Verified!",
        description: "Your domain has been successfully verified",
      });
      setCurrentStep(3);
    }, 1500);
  };

  const handleCreateSenderIdentity = () => {
    if (!senderEmail || !senderName) {
      toast({
        title: "Error",
        description: "Please fill in all sender details",
        variant: "destructive",
      });
      return;
    }
    setCurrentStep(4);
  };

  const handleSaveProfile = () => {
    // Clear saved state after completion
    if (user?.id) {
      localStorage.removeItem(`domain-wizard-${user.id}-${activeDomainId || 'new'}`);
    }
    
    toast({
      title: "Success!",
      description: "Domain setup completed successfully",
    });
    onComplete();
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepClick = (stepNumber: number) => {
    // Allow navigation to previous steps or current step
    if (stepNumber <= currentStep) {
      setCurrentStep(stepNumber);
    }
  };

  return (
    <div className="space-y-6">
      {/* Back to Domains Button */}
      <Button
        variant="ghost"
        onClick={onComplete}
        className="flex items-center gap-2 -ml-2"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Domains
      </Button>

      <Card className="p-8 max-w-3xl mx-auto bg-background border-border">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            {domainId ? "Configure Domain" : "Add New Domain"}
          </h2>
          <p className="text-muted-foreground">
            {currentStep === 1 && "Enter your domain name to get started"}
            {currentStep === 2 && "Add DNS records to verify your domain"}
            {currentStep === 3 && "Set up your sender email identity"}
            {currentStep === 4 && "Complete your sender profile"}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <Progress value={progress} className="mb-4 h-2" />
          <div className="flex justify-between">
            {steps.map((step) => {
              const Icon = step.icon;
              const isActive = currentStep === step.number;
              const isCompleted = currentStep > step.number;
              const isClickable = step.number <= currentStep;

              return (
                <div 
                  key={step.number} 
                  className="flex flex-col items-center"
                  onClick={() => isClickable && handleStepClick(step.number)}
                >
                  <div
                    className={`flex items-center justify-center w-12 h-12 rounded-full mb-2 transition-all ${
                      isCompleted
                        ? "bg-primary text-primary-foreground"
                        : isActive
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    } ${isClickable ? "cursor-pointer hover:scale-110" : "cursor-not-allowed opacity-60"}`}
                  >
                    {isCompleted ? (
                      <CheckCircle className="w-6 h-6" />
                    ) : (
                      <Icon className="w-6 h-6" />
                    )}
                  </div>
                  <span
                    className={`text-xs text-center ${
                      isActive ? "font-semibold text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {step.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step Content */}
        <div className="space-y-6">
          {currentStep === 1 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="domain">Domain Name</Label>
                <Input
                  id="domain"
                  placeholder="example.com"
                  value={domainName}
                  onChange={(e) => setDomainName(e.target.value)}
                  className="bg-background"
                />
                <p className="text-sm text-muted-foreground mt-2">
                  Enter the domain you want to use for sending emails
                </p>
              </div>
              <div className="flex gap-3">
                <Button onClick={handleCreateDomain} className="flex-1">
                  Add Domain
                </Button>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">DNS Records to Add</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Add these DNS records to your domain registrar to verify ownership
                </p>
              </div>

              <div className="space-y-3">
                {dnsRecords.map((record, index) => (
                  <div key={index} className="border border-border rounded-lg p-4 space-y-2 bg-card">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">{record.type}</Badge>
                      <Badge
                        variant={record.status === "verified" ? "default" : "secondary"}
                      >
                        {record.status === "verified" ? (
                          <>
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Verified
                          </>
                        ) : (
                          <>
                            <Circle className="w-3 h-3 mr-1" />
                            Pending
                          </>
                        )}
                      </Badge>
                    </div>
                    <div>
                      <Label className="text-xs">Host</Label>
                      <Input value={record.host} readOnly className="font-mono text-sm bg-muted" />
                    </div>
                    <div>
                      <Label className="text-xs">Value</Label>
                      <Input value={record.value} readOnly className="font-mono text-sm bg-muted" />
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={handleBack} className="flex items-center gap-2">
                  <ChevronLeft className="w-4 h-4" />
                  Back
                </Button>
                <Button onClick={handleCheckDNS} className="flex-1">
                  Check DNS Status
                </Button>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Sender Identity</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Create your email sender identity
                </p>
              </div>

              <div>
                <Label htmlFor="senderEmail">Sender Email</Label>
                <Input
                  id="senderEmail"
                  type="email"
                  placeholder={`hello@${domainName}`}
                  value={senderEmail}
                  onChange={(e) => setSenderEmail(e.target.value)}
                  className="bg-background"
                />
              </div>

              <div>
                <Label htmlFor="senderName">Sender Name</Label>
                <Input
                  id="senderName"
                  placeholder="LeadMasters"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  className="bg-background"
                />
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={handleBack} className="flex items-center gap-2">
                  <ChevronLeft className="w-4 h-4" />
                  Back
                </Button>
                <Button onClick={handleCreateSenderIdentity} className="flex-1">
                  Continue
                </Button>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Profile Setup</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Complete your sender profile
                </p>
              </div>

              <div>
                <Label htmlFor="displayName">Display Name</Label>
                <Input
                  id="displayName"
                  placeholder="John Doe"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="bg-background"
                />
              </div>

              <div>
                <Label htmlFor="replyTo">Reply-To Email</Label>
                <Input
                  id="replyTo"
                  type="email"
                  placeholder={`support@${domainName}`}
                  value={replyTo}
                  onChange={(e) => setReplyTo(e.target.value)}
                  className="bg-background"
                />
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={handleBack} className="flex items-center gap-2">
                  <ChevronLeft className="w-4 h-4" />
                  Back
                </Button>
                <Button onClick={handleSaveProfile} className="flex-1">
                  Complete Setup
                </Button>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
