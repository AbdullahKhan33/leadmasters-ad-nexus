import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCampaigns } from "@/hooks/useCampaigns";
import { CampaignMetrics } from "./CampaignMetrics";
import { CampaignPerformanceChart } from "./CampaignPerformanceChart";
import { CampaignDetailedView } from "./CampaignDetailedView";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { BarChart3, TrendingUp, DollarSign } from "lucide-react";

export function CampaignAnalytics() {
  const { campaigns, isLoading } = useCampaigns();
  const [selectedCampaignId, setSelectedCampaignId] = useState<string>("all");
  const [timeRange, setTimeRange] = useState<"7d" | "30d" | "90d" | "all">("30d");

  const sentCampaigns = campaigns.filter(c => c.status === "sent" && c.sent_at);

  // Calculate aggregate metrics
  const totalSent = sentCampaigns.reduce((sum, c) => sum + (c.recipient_count || 0), 0);
  const totalDelivered = sentCampaigns.reduce((sum, c) => sum + (c.delivered_count || 0), 0);
  const totalOpened = sentCampaigns.reduce((sum, c) => sum + (c.opened_count || 0), 0);
  const totalClicked = sentCampaigns.reduce((sum, c) => sum + (c.clicked_count || 0), 0);
  const totalFailed = sentCampaigns.reduce((sum, c) => sum + (c.failed_count || 0), 0);

  const openRate = totalDelivered > 0 ? ((totalOpened / totalDelivered) * 100).toFixed(1) : "0";
  const clickRate = totalOpened > 0 ? ((totalClicked / totalOpened) * 100).toFixed(1) : "0";
  const deliveryRate = totalSent > 0 ? ((totalDelivered / totalSent) * 100).toFixed(1) : "0";
  const bounceRate = totalSent > 0 ? ((totalFailed / totalSent) * 100).toFixed(1) : "0";

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-muted-foreground">Loading analytics...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
            Campaign Analytics
          </h2>
          <p className="text-muted-foreground mt-1">
            Track performance and engagement metrics
          </p>
        </div>

        <div className="flex gap-2">
          <Select value={timeRange} onValueChange={(v: any) => setTimeRange(v)}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="all">All time</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {sentCampaigns.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <BarChart3 className="w-12 h-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No campaign data yet</h3>
            <p className="text-sm text-muted-foreground text-center max-w-sm">
              Send your first campaign to see analytics and performance metrics here
            </p>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Overview Metrics */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Total Sent</CardDescription>
                <CardTitle className="text-3xl">{totalSent.toLocaleString()}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  Across {sentCampaigns.length} campaign{sentCampaigns.length !== 1 ? 's' : ''}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Delivery Rate</CardDescription>
                <CardTitle className="text-3xl">{deliveryRate}%</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  {totalDelivered.toLocaleString()} delivered
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Open Rate</CardDescription>
                <CardTitle className="text-3xl">{openRate}%</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  {totalOpened.toLocaleString()} opens
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Click Rate</CardDescription>
                <CardTitle className="text-3xl">{clickRate}%</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  {totalClicked.toLocaleString()} clicks
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Metrics */}
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="campaigns">By Campaign</TabsTrigger>
              <TabsTrigger value="roi">ROI Analysis</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <CampaignPerformanceChart campaigns={sentCampaigns} />
              
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Engagement Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Delivered</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 bg-muted h-2 rounded-full overflow-hidden">
                          <div
                            className="bg-green-500 h-full"
                            style={{ width: `${deliveryRate}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium w-12 text-right">{deliveryRate}%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Opened</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 bg-muted h-2 rounded-full overflow-hidden">
                          <div
                            className="bg-blue-500 h-full"
                            style={{ width: `${openRate}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium w-12 text-right">{openRate}%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Clicked</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 bg-muted h-2 rounded-full overflow-hidden">
                          <div
                            className="bg-purple-500 h-full"
                            style={{ width: `${clickRate}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium w-12 text-right">{clickRate}%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Bounced</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 bg-muted h-2 rounded-full overflow-hidden">
                          <div
                            className="bg-red-500 h-full"
                            style={{ width: `${bounceRate}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium w-12 text-right">{bounceRate}%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Top Performing Campaigns</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {sentCampaigns
                        .sort((a, b) => {
                          const aRate = a.delivered_count ? (a.opened_count || 0) / a.delivered_count : 0;
                          const bRate = b.delivered_count ? (b.opened_count || 0) / b.delivered_count : 0;
                          return bRate - aRate;
                        })
                        .slice(0, 5)
                        .map((campaign) => {
                          const rate = campaign.delivered_count
                            ? ((campaign.opened_count || 0) / campaign.delivered_count * 100).toFixed(1)
                            : "0";
                          return (
                            <div key={campaign.id} className="flex items-center justify-between">
                              <span className="text-sm truncate flex-1">{campaign.name}</span>
                              <span className="text-sm font-medium text-green-600">{rate}%</span>
                            </div>
                          );
                        })}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="campaigns" className="space-y-4">
              <Select value={selectedCampaignId} onValueChange={setSelectedCampaignId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a campaign" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Campaigns</SelectItem>
                  {sentCampaigns.map((campaign) => (
                    <SelectItem key={campaign.id} value={campaign.id}>
                      {campaign.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {selectedCampaignId === "all" ? (
                <div className="grid gap-4">
                  {sentCampaigns.map((campaign) => (
                    <CampaignMetrics key={campaign.id} campaign={campaign} />
                  ))}
                </div>
              ) : (
                <CampaignDetailedView
                  campaign={sentCampaigns.find((c) => c.id === selectedCampaignId)!}
                />
              )}
            </TabsContent>

            <TabsContent value="roi" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5" />
                    ROI Analysis
                  </CardTitle>
                  <CardDescription>
                    Track return on investment for your campaigns
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <TrendingUp className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">ROI Tracking Coming Soon</h3>
                    <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                      Connect your revenue data to track campaign ROI and conversion value
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
}
