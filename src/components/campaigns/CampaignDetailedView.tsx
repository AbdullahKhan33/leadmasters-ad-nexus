import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, X, Eye, MousePointerClick, Mail, CheckCheck } from "lucide-react";

interface CampaignDetailedViewProps {
  campaign: Campaign;
  onBack: () => void;
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

export function CampaignDetailedView({ campaign, onBack }: CampaignDetailedViewProps) {
  const [recipients, setRecipients] = useState<Recipient[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  
  const isWhatsApp = campaign.type === 'whatsapp';

  useEffect(() => {
    fetchRecipients();
    setActiveTab("overview");
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

  const totalSent = campaign.recipient_count || 0;
  const delivered = campaign.delivered_count || 0;
  const opened = campaign.opened_count || 0;
  const clicked = campaign.clicked_count || 0;
  const failed = campaign.failed_count || 0;
  
  const deliveryRate = totalSent > 0 ? ((delivered / totalSent) * 100).toFixed(2) : '0.00';
  const openRate = delivered > 0 ? ((opened / delivered) * 100).toFixed(2) : '0.00';
  const clickRate = totalSent > 0 ? ((clicked / totalSent) * 100).toFixed(2) : '0.00';
  const clickToOpenRate = opened > 0 ? ((clicked / opened) * 100).toFixed(2) : '0.00';
  
  // WhatsApp uses "reads" instead of "opens"
  const readRate = openRate;
  const clickToReadRate = clickToOpenRate;

  const MetricCard = ({ label, value, sublabel, subvalue }: { label: string; value: string | number; sublabel?: string; subvalue?: string }) => (
    <div className="space-y-1 p-4 rounded-lg bg-muted/30">
      <div className="text-sm text-muted-foreground font-medium">{label}</div>
      <div className="text-3xl font-bold">{value}</div>
      {sublabel && <div className="text-xs text-muted-foreground mt-2">{sublabel}</div>}
      {subvalue && <div className="text-xl font-semibold mt-1">{subvalue}</div>}
    </div>
  );

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20">
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/60 px-6 py-4">
        <Button variant="ghost" onClick={onBack} className="mb-2">
          ← Back to Campaigns
        </Button>
        <div>
          <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
            {campaign.name}
          </h2>
          {campaign.sent_at && (
            <p className="text-sm text-muted-foreground">
              Sent on {format(new Date(campaign.sent_at), 'MMM dd, yyyy HH:mm')}
            </p>
          )}
        </div>
      </div>
      
      <div className="flex-1 overflow-auto p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full bg-white" style={{ gridTemplateColumns: isWhatsApp ? 'repeat(4, 1fr)' : 'repeat(5, 1fr)' }}>
            <TabsTrigger className="transition-none border border-border data-[state=active]:border-primary" value="overview" onClick={() => setActiveTab("overview")}>Overview</TabsTrigger>
            <TabsTrigger className="transition-none border border-border data-[state=active]:border-primary" value="deliverability" onClick={() => setActiveTab("deliverability")}>Deliverability</TabsTrigger>
            <TabsTrigger className="transition-none border border-border data-[state=active]:border-primary" value={isWhatsApp ? "reads" : "opens"} onClick={() => setActiveTab(isWhatsApp ? "reads" : "opens")}>
              {isWhatsApp ? "Reads" : "Opens"}
            </TabsTrigger>
            <TabsTrigger className="transition-none border border-border data-[state=active]:border-primary" value="clicks" onClick={() => setActiveTab("clicks")}>Clicks</TabsTrigger>
            {!isWhatsApp && (
              <TabsTrigger className="transition-none border border-border data-[state=active]:border-primary" value="unsubscribes" onClick={() => setActiveTab("unsubscribes")}>Unsubscribes</TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Campaign performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`grid grid-cols-1 gap-4 ${isWhatsApp ? 'md:grid-cols-3' : 'md:grid-cols-4'}`}>
                  <MetricCard label="Delivered" value={delivered} sublabel="Delivery rate" subvalue={`${deliveryRate}%`} />
                  <MetricCard label={isWhatsApp ? "Reads" : "Opens"} value={opened} sublabel={isWhatsApp ? "Read rate" : "Open rate"} subvalue={`${isWhatsApp ? readRate : openRate}%`} />
                  <MetricCard label="Clicks" value={clicked} sublabel="Click-through rate" subvalue={`${clickRate}%`} />
                  {!isWhatsApp && (
                    <MetricCard label="Unsubscribes" value={0} sublabel="Unsubscribe rate" subvalue="0%" />
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="deliverability" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Deliverability details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`grid grid-cols-1 gap-4 ${isWhatsApp ? 'md:grid-cols-4' : 'md:grid-cols-5'}`}>
                  <MetricCard label="Sent to" value={totalSent} />
                  <MetricCard label="Delivered" value={delivered} />
                  <MetricCard label="Delivery rate" value={`${deliveryRate}%`} />
                  {!isWhatsApp && <MetricCard label="Soft bounces" value={0} />}
                  <MetricCard label={isWhatsApp ? "Failed" : "Hard bounces"} value={failed} />
                </div>
              </CardContent>
            </Card>

            {failed > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Reasons for failures</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Reason</TableHead>
                        <TableHead className="text-right">Failed recipients</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recipients
                        .filter(r => r.status === 'failed')
                        .reduce((acc, recipient) => {
                          const reason = recipient.failed_reason || 'Unknown error';
                          const existing = acc.find(item => item.reason === reason);
                          if (existing) {
                            existing.count++;
                          } else {
                            acc.push({ reason, count: 1 });
                          }
                          return acc;
                        }, [] as { reason: string; count: number }[])
                        .map((item, index) => (
                          <TableRow key={index}>
                            <TableCell>
                              <div className="font-medium">{item.reason}</div>
                              <div className="text-sm text-muted-foreground">
                                {((item.count / totalSent) * 100).toFixed(2)}% of recipients
                              </div>
                            </TableCell>
                            <TableCell className="text-right font-semibold">{item.count}</TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value={isWhatsApp ? "reads" : "opens"} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{isWhatsApp ? "Reads Details" : "Opens Details"}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <MetricCard label={isWhatsApp ? "Reads" : "Opens"} value={opened} />
                  <MetricCard label={isWhatsApp ? "Read rate" : "Open rate"} value={`${isWhatsApp ? readRate : openRate}%`} />
                  <MetricCard label={isWhatsApp ? "Total reads" : "Total opens"} value={opened} />
                  <MetricCard label={isWhatsApp ? "Unique reads" : "Unique opens"} value={opened} />
                </div>
              </CardContent>
            </Card>

            {isLoading ? (
              <div className="text-center py-8">Loading recipients...</div>
            ) : opened > 0 ? (
              <Card>
                <CardHeader>
                  <CardTitle>{isWhatsApp ? "Recipients who read" : "Recipients who opened"}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>{isWhatsApp ? "Read At" : "Opened At"}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recipients
                        .filter(r => r.opened_at)
                        .map((recipient) => {
                          const lead = recipient.leads as any;
                          return (
                            <TableRow key={recipient.id}>
                              <TableCell className="font-medium">{lead?.name || 'Unknown'}</TableCell>
                              <TableCell className="text-muted-foreground">{lead?.email || 'No email'}</TableCell>
                              <TableCell>
                                {recipient.opened_at && (
                                  <div className="flex items-center gap-1 text-blue-600">
                                    {isWhatsApp ? <CheckCheck className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                                    {format(new Date(recipient.opened_at), 'MMM dd, HH:mm')}
                                  </div>
                                )}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="text-center py-8 text-muted-foreground">
                  {isWhatsApp ? "No reads yet" : "No opens yet"}
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="clicks" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Clicks details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <MetricCard label="Click-through rate" value={`${clickRate}%`} />
                  <MetricCard label="Total clicks" value={clicked} />
                  <MetricCard label="Clicks" value={clicked} />
                  <MetricCard label={isWhatsApp ? "Click-to-read rate" : "Click-to-open rate"} value={`${isWhatsApp ? clickToReadRate : clickToOpenRate}%`} />
                </div>
              </CardContent>
            </Card>

            {isLoading ? (
              <div className="text-center py-8">Loading recipients...</div>
            ) : clicked > 0 ? (
              <Card>
                <CardHeader>
                  <CardTitle>Recipients who clicked</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Clicked At</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recipients
                        .filter(r => r.clicked_at)
                        .map((recipient) => {
                          const lead = recipient.leads as any;
                          return (
                            <TableRow key={recipient.id}>
                              <TableCell className="font-medium">{lead?.name || 'Unknown'}</TableCell>
                              <TableCell className="text-muted-foreground">{lead?.email || 'No email'}</TableCell>
                              <TableCell>
                                {recipient.clicked_at && (
                                  <div className="flex items-center gap-1 text-purple-600">
                                    <MousePointerClick className="w-3 h-3" />
                                    {format(new Date(recipient.clicked_at), 'MMM dd, HH:mm')}
                                  </div>
                                )}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="text-center py-8 text-muted-foreground">
                  No clicks yet
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="unsubscribes" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Unsubscribes details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <MetricCard label="Unsubscribes" value={0} />
                  <MetricCard label="Unsubscribe rate" value="0%" />
                  <MetricCard label="Spam complaints" value={0} />
                  <MetricCard label="Spam complaint rate" value="0%" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Unsubscribe reasons</CardTitle>
              </CardHeader>
              <CardContent className="text-center py-8 text-muted-foreground">
                No data to show
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
