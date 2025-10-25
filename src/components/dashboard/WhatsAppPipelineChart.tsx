import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

interface WhatsAppPipelineChartProps {
  leadsByStatus: {
    New: number;
    Active: number;
    Qualified: number;
    Won: number;
  };
  isLoading: boolean;
  onNavigate: (view: string, filter?: any) => void;
}

export function WhatsAppPipelineChart({
  leadsByStatus,
  isLoading,
  onNavigate,
}: WhatsAppPipelineChartProps) {
  const data = [
    { name: "New", value: leadsByStatus.New, color: "#10b981" },
    { name: "Active", value: leadsByStatus.Active, color: "#3b82f6" },
    { name: "Qualified", value: leadsByStatus.Qualified, color: "#f59e0b" },
    { name: "Won", value: leadsByStatus.Won, color: "#8b5cf6" },
  ];

  const totalLeads = Object.values(leadsByStatus).reduce((a, b) => a + b, 0);
  const conversionRate =
    totalLeads > 0 ? Math.round((leadsByStatus.Won / totalLeads) * 100) : 0;

  const handleBarClick = (status: string) => {
    onNavigate("crm", { status, source: "whatsapp" });
  };

  if (isLoading) {
    return (
      <Card className="animate-pulse">
        <CardHeader>
          <div className="h-6 bg-muted rounded w-1/3"></div>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-muted rounded"></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg font-bold">WhatsApp Lead Pipeline</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                fontSize: "12px",
              }}
            />
            <Bar
              dataKey="value"
              radius={[8, 8, 0, 0]}
              cursor="pointer"
              onClick={(data) => handleBarClick(data.name)}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>

        <div className="flex items-center justify-between text-sm pt-4 border-t">
          <div>
            <span className="text-muted-foreground">Conversion Rate:</span>{" "}
            <span className="font-semibold">{conversionRate}%</span>
          </div>
          <div>
            <span className="text-muted-foreground">Total Leads:</span>{" "}
            <span className="font-semibold">{totalLeads}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
