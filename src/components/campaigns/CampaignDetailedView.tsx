import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Campaign } from "@/types/campaigns";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Check, X, Eye, MousePointerClick, Mail } from "lucide-react";

interface CampaignDetailedViewProps {
  campaign: Campaign;
}

interface Recipient {
  id: string;
  lead_id: string;
  status: string;
  sent_at: string | null;
  delivered_at: string | null;
  opened_at: string | null;
  clicked_at: string | null;
  failed_reason: string | null;
  leads: {
    name: string;
    email: string;
  };
}

export function CampaignDetailedView({ campaign }: CampaignDetailedViewProps) {
  const [recipients, setRecipients] = useState<Recipient[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchRecipients();
  }, [campaign.id]);

  const fetchRecipients = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("campaign_recipients")
        .select(`
          id,
          lead_id,
          status,
          sent_at,
          delivered_at,
          opened_at,
          clicked_at,
          failed_reason,
          leads (
            name,
            email
          )
        `)
        .eq("campaign_id", campaign.id)
        .order("sent_at", { ascending: false });

      if (error) throw error;

      setRecipients(data as any || []);
    } catch (error) {
      console.error("Error fetching recipients:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: any; label: string; icon: any }> = {
      pending: { variant: "secondary", label: "Pending", icon: null },
      sent: { variant: "default", label: "Sent", icon: Mail },
      delivered: { variant: "default", label: "Delivered", icon: Check },
      opened: { variant: "default", label: "Opened", icon: Eye },
      clicked: { variant: "default", label: "Clicked", icon: MousePointerClick },
      failed: { variant: "destructive", label: "Failed", icon: X },
    };

    const config = variants[status] || variants.pending;
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className="text-xs">
        {Icon && <Icon className="w-3 h-3 mr-1" />}
        {config.label}
      </Badge>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Campaign Recipients</CardTitle>
        <CardDescription>
          Detailed delivery and engagement data for {campaign.name}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="text-center py-8 text-muted-foreground">
            Loading recipients...
          </div>
        ) : recipients.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No recipients found for this campaign
          </div>
        ) : (
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Recipient</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Sent</TableHead>
                  <TableHead>Opened</TableHead>
                  <TableHead>Clicked</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recipients.map((recipient) => {
                  const lead = recipient.leads as any;
                  return (
                    <TableRow key={recipient.id}>
                      <TableCell className="font-medium">
                        {lead?.name || "Unknown"}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {lead?.email || "No email"}
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(recipient.status)}
                      </TableCell>
                      <TableCell className="text-sm">
                        {recipient.sent_at ? (
                          <div className="flex items-center gap-1 text-green-600">
                            <Check className="w-3 h-3" />
                            {format(new Date(recipient.sent_at), "MMM dd, HH:mm")}
                          </div>
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </TableCell>
                      <TableCell className="text-sm">
                        {recipient.opened_at ? (
                          <div className="flex items-center gap-1 text-blue-600">
                            <Eye className="w-3 h-3" />
                            {format(new Date(recipient.opened_at), "MMM dd, HH:mm")}
                          </div>
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </TableCell>
                      <TableCell className="text-sm">
                        {recipient.clicked_at ? (
                          <div className="flex items-center gap-1 text-purple-600">
                            <MousePointerClick className="w-3 h-3" />
                            {format(new Date(recipient.clicked_at), "MMM dd, HH:mm")}
                          </div>
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}

        {recipients.some(r => r.failed_reason) && (
          <div className="mt-4">
            <h4 className="text-sm font-semibold mb-2">Failed Recipients</h4>
            <div className="space-y-2">
              {recipients
                .filter(r => r.failed_reason)
                .map(recipient => {
                  const lead = recipient.leads as any;
                  return (
                    <div key={recipient.id} className="flex items-start gap-2 text-sm p-2 bg-red-50 rounded border border-red-200">
                      <X className="w-4 h-4 text-red-600 mt-0.5" />
                      <div className="flex-1">
                        <div className="font-medium">{lead?.name} ({lead?.email})</div>
                        <div className="text-muted-foreground">{recipient.failed_reason}</div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
