import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Copy, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

interface DomainDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  domainName: string;
  isVerified: boolean;
}

export function DomainDetailsModal({ open, onOpenChange, domainName, isVerified }: DomainDetailsModalProps) {
  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied",
      description: `${label} copied to clipboard`,
    });
  };

  const dnsRecords = [
    {
      title: "SPF Record",
      type: "TXT",
      hostname: "@",
      value: "v=spf1 include:spf.leadmasters.com ~all",
    },
    {
      title: "DKIM 1 Record",
      type: "CNAME",
      hostname: "dkim1._domainkey",
      value: "dkim1.leadmasters.com",
    },
    {
      title: "DKIM 2 Record",
      type: "CNAME",
      hostname: "dkim2._domainkey",
      value: "dkim2.leadmasters.com",
    },
    {
      title: "DMARC Record",
      type: "TXT",
      hostname: "_dmarc",
      value: "v=DMARC1; p=none; rua=mailto:dmarc@leadmasters.com",
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
            {domainName}
          </DialogTitle>
          <p className="text-sm text-muted-foreground">DNS records for domain authentication</p>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {dnsRecords.map((record, index) => (
            <div key={index} className="space-y-3 pb-6 border-b last:border-b-0">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-foreground">{record.title}</h3>
                {isVerified && (
                  <Badge variant="default" className="bg-green-500">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Verified
                  </Badge>
                )}
              </div>

              <div className="space-y-2">
                <div>
                  <Label className="text-xs text-muted-foreground">Type</Label>
                  <div className="flex gap-2">
                    <Input
                      value={record.type}
                      readOnly
                      className="font-mono text-sm bg-muted"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(record.type, "Type")}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div>
                  <Label className="text-xs text-muted-foreground">Hostname</Label>
                  <div className="flex gap-2">
                    <Input
                      value={record.hostname}
                      readOnly
                      className="font-mono text-sm bg-muted"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(record.hostname, "Hostname")}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div>
                  <Label className="text-xs text-muted-foreground">Data</Label>
                  <div className="flex gap-2">
                    <Input
                      value={record.value}
                      readOnly
                      className="font-mono text-sm bg-muted"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(record.value, "Data")}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-3 mt-6">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
            Back to domains
          </Button>
          {!isVerified && (
            <Button
              className="flex-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 hover:from-blue-700 hover:via-purple-700 hover:to-pink-600 text-white shadow-lg"
              onClick={() => {
                toast({
                  title: "Checking configuration...",
                  description: "We'll verify your DNS records",
                });
              }}
            >
              Check configuration
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
