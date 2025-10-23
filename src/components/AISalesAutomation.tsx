import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, Workflow, Plug, TrendingUp } from "lucide-react";

export function AISalesAutomation() {
  return (
    <div className="h-full w-full overflow-auto">
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent flex items-center gap-2">
              <Bot className="w-8 h-8 text-purple-600" />
              AI Sales Automation
            </h1>
            <p className="text-muted-foreground mt-1">
              Automate lead qualification, nurturing, and conversion with AI
            </p>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="pipeline" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="pipeline" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Pipeline
            </TabsTrigger>
            <TabsTrigger value="workflows" className="flex items-center gap-2">
              <Workflow className="w-4 h-4" />
              Workflows
            </TabsTrigger>
            <TabsTrigger value="integrations" className="flex items-center gap-2">
              <Plug className="w-4 h-4" />
              Integrations
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Analytics
            </TabsTrigger>
          </TabsList>

          {/* Pipeline Tab */}
          <TabsContent value="pipeline" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Automation Pipeline</CardTitle>
                <CardDescription>
                  Visualize leads moving through AI-powered qualification stages
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-6 gap-4">
                  {/* Placeholder Kanban Columns */}
                  {['New Leads', 'No Reply', 'Qualified', 'Nurturing', 'Long-Term', 'Won'].map((stage) => (
                    <div key={stage} className="space-y-2">
                      <div className="bg-muted rounded-lg p-3">
                        <h3 className="font-semibold text-sm">{stage}</h3>
                        <p className="text-xs text-muted-foreground mt-1">0 leads</p>
                      </div>
                      <div className="text-xs text-center text-muted-foreground">
                        Coming soon...
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Workflows Tab */}
          <TabsContent value="workflows" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Workflow Templates</CardTitle>
                <CardDescription>
                  Create and manage automated lead nurturing workflows
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Placeholder Workflow Cards */}
                  {[
                    { name: 'No Reply Follow-up', desc: '3-step reminder sequence' },
                    { name: 'Qualified Lead Routing', desc: 'Auto-assign to sales team' },
                    { name: '7-Day Nurturing', desc: 'Weekly engagement sequence' },
                    { name: 'Long-Term Nurturing', desc: 'Low-touch 15-day cycle' }
                  ].map((workflow) => (
                    <Card key={workflow.name} className="hover:shadow-md transition-shadow">
                      <CardHeader>
                        <CardTitle className="text-base">{workflow.name}</CardTitle>
                        <CardDescription className="text-xs">{workflow.desc}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">Coming soon...</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Integrations Tab */}
          <TabsContent value="integrations" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Lead Source Integrations</CardTitle>
                <CardDescription>
                  Connect external lead sources and message channels
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Lead Sources Section */}
                  <div>
                    <h3 className="font-semibold mb-3">Lead Sources</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {['99acres', 'Facebook Lead Ads', 'MagicBricks', 'Custom API'].map((source) => (
                        <Card key={source} className="hover:shadow-md transition-shadow">
                          <CardHeader className="p-4">
                            <CardTitle className="text-sm">{source}</CardTitle>
                          </CardHeader>
                          <CardContent className="p-4 pt-0">
                            <p className="text-xs text-muted-foreground">Not connected</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>

                  {/* Message Channels Section */}
                  <div>
                    <h3 className="font-semibold mb-3">Message Channels</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {['WhatsApp Business', 'Email (Future)', 'SMS (Future)'].map((channel) => (
                        <Card key={channel} className="hover:shadow-md transition-shadow">
                          <CardHeader className="p-4">
                            <CardTitle className="text-sm">{channel}</CardTitle>
                          </CardHeader>
                          <CardContent className="p-4 pt-0">
                            <p className="text-xs text-muted-foreground">Not configured</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Automation Analytics</CardTitle>
                <CardDescription>
                  Track performance metrics and AI accuracy
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {/* Placeholder Metric Cards */}
                  {[
                    { label: 'Total Leads', value: '0' },
                    { label: 'Response Rate', value: '0%' },
                    { label: 'Qualification Rate', value: '0%' },
                    { label: 'Avg Time to Qualify', value: '0h' },
                    { label: 'Conversion Rate', value: '0%' }
                  ].map((metric) => (
                    <Card key={metric.label}>
                      <CardHeader className="p-4">
                        <CardTitle className="text-xs text-muted-foreground">{metric.label}</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <p className="text-2xl font-bold">{metric.value}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <div className="mt-6 text-center text-muted-foreground">
                  <p>Analytics will populate once workflows are active</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
