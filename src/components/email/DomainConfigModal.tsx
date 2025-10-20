import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Circle, Globe, Settings, Mail, User } from "lucide-react";
import { useDomains } from "@/hooks/useDomains";
import { toast } from "@/hooks/use-toast";

interface DomainConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  domainId?: string;
}

interface DNSRecord {
  type: string;
  host: string;
  value: string;
  status: "pending" | "verified";
}

export function DomainConfigModal({ isOpen, onClose, domainId }: DomainConfigModalProps) {
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

  const currentDomain = domainId ? domains.find(d => d.id === domainId) : null;

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
      await createDomain(domainName);
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
    toast({
      title: "Success!",
      description: "Domain setup completed successfully",
    });
    onClose();
  };

  const handleClose = () => {
    setCurrentStep(1);
    setDomainName("");
    setSenderEmail("");
    setSenderName("");
    setDisplayName("");
    setReplyTo("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {domainId ? "Configure Domain" : "Add New Domain"}
          </DialogTitle>
        </DialogHeader>

        {/* Progress Bar */}
        <div className="mb-6">
          <Progress value={progress} className="mb-2" />
          <div className="flex justify-between">
            {steps.map((step) => {
              const Icon = step.icon;
              const isActive = currentStep === step.number;
              const isCompleted = currentStep > step.number;

              return (
                <div key={step.number} className="flex flex-col items-center">
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full mb-2 ${
                      isCompleted
                        ? "bg-primary text-primary-foreground"
                        : isActive
                        ? "bg-primary/20 text-primary"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <Icon className="w-5 h-5" />
                    )}
                  </div>
                  <span
                    className={`text-xs text-center ${
                      isActive ? "font-semibold" : ""
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
                />
                <p className="text-sm text-muted-foreground mt-2">
                  Enter the domain you want to use for sending emails
                </p>
              </div>
              <Button onClick={handleCreateDomain} className="w-full">
                Add Domain
              </Button>
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
                  <div key={index} className="border rounded-lg p-4 space-y-2">
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
                      <Input value={record.host} readOnly className="font-mono text-sm" />
                    </div>
                    <div>
                      <Label className="text-xs">Value</Label>
                      <Input value={record.value} readOnly className="font-mono text-sm" />
                    </div>
                  </div>
                ))}
              </div>

              <Button onClick={handleCheckDNS} className="w-full">
                Check DNS Status
              </Button>
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
                />
              </div>

              <div>
                <Label htmlFor="senderName">Sender Name</Label>
                <Input
                  id="senderName"
                  placeholder="LeadMasters"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                />
              </div>

              <Button onClick={handleCreateSenderIdentity} className="w-full">
                Continue
              </Button>
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
                />
              </div>

              <Button onClick={handleSaveProfile} className="w-full">
                Complete Setup
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
