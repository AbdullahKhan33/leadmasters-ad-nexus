import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Campaign } from "@/types/campaigns";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { format } from "date-fns";

interface CampaignPerformanceChartProps {
  campaigns: Campaign[];
}

export function CampaignPerformanceChart({ campaigns }: CampaignPerformanceChartProps) {
  // Group campaigns by date and calculate metrics
  const chartData = campaigns
    .filter(c => c.sent_at)
    .sort((a, b) => new Date(a.sent_at!).getTime() - new Date(b.sent_at!).getTime())
    .map(campaign => {
      const openRate = campaign.delivered_count
        ? ((campaign.opened_count || 0) / campaign.delivered_count * 100)
        : 0;
      
      const clickRate = campaign.opened_count
        ? ((campaign.clicked_count || 0) / campaign.opened_count * 100)
        : 0;

      return {
        name: campaign.name,
        date: format(new Date(campaign.sent_at!), "MMM dd"),
        openRate: parseFloat(openRate.toFixed(1)),
        clickRate: parseFloat(clickRate.toFixed(1)),
        sent: campaign.recipient_count || 0,
      };
    });

  if (chartData.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Trends</CardTitle>
        <CardDescription>
          Track engagement rates across campaigns
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 12 }}
            />
            <YAxis
              tick={{ fontSize: 12 }}
              label={{ value: 'Rate (%)', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-white p-3 border rounded-lg shadow-lg">
                      <p className="font-semibold mb-2">{payload[0].payload.name}</p>
                      <p className="text-sm text-muted-foreground mb-1">
                        {payload[0].payload.date}
                      </p>
                      <div className="space-y-1">
                        <p className="text-sm flex items-center gap-2">
                          <span className="w-3 h-3 rounded-full bg-blue-500" />
                          Open Rate: <span className="font-medium">{payload[0].value}%</span>
                        </p>
                        <p className="text-sm flex items-center gap-2">
                          <span className="w-3 h-3 rounded-full bg-purple-500" />
                          Click Rate: <span className="font-medium">{payload[1].value}%</span>
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Sent to {payload[0].payload.sent} recipients
                        </p>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="openRate"
              stroke="#3b82f6"
              strokeWidth={2}
              name="Open Rate"
              dot={{ fill: '#3b82f6' }}
            />
            <Line
              type="monotone"
              dataKey="clickRate"
              stroke="#8b5cf6"
              strokeWidth={2}
              name="Click Rate"
              dot={{ fill: '#8b5cf6' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
