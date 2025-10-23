import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface WorkflowTemplateCardProps {
  name: string;
  description: string;
  icon: LucideIcon;
  activeLeads: number;
  successRate: string;
  avgTime: string;
  steps: string;
  isActive: boolean;
  type: string;
}

export function WorkflowTemplateCard({
  name,
  description,
  icon: Icon,
  activeLeads,
  successRate,
  avgTime,
  steps,
  isActive,
  type
}: WorkflowTemplateCardProps) {
  return (
    <Card className="hover:shadow-lg transition-all duration-200 group relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 via-pink-50/30 to-blue-50/50 opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <CardHeader className="relative">
        <div className="flex items-start justify-between mb-3">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Icon className="w-6 h-6 text-purple-600" />
          </div>
          <Badge variant={isActive ? "default" : "secondary"} className={isActive ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0" : ""}>
            {isActive ? "Active" : "Inactive"}
          </Badge>
        </div>
        <CardTitle className="text-base group-hover:text-purple-600 transition-colors">
          {name}
        </CardTitle>
        <CardDescription className="text-xs">{description}</CardDescription>
      </CardHeader>

      <CardContent className="relative space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-xs text-muted-foreground">Active Leads</p>
            <p className="text-lg font-bold text-purple-600">{activeLeads}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Success Rate</p>
            <p className="text-lg font-bold text-green-600">{successRate}</p>
          </div>
        </div>

        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">Average Time</p>
          <p className="text-sm font-semibold">{avgTime}</p>
        </div>

        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">Workflow Steps</p>
          <p className="text-xs leading-relaxed">{steps}</p>
        </div>

        <div className="flex gap-2 pt-2">
          <Button 
            size="sm" 
            className="flex-1 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-500 hover:opacity-90"
          >
            View Details
          </Button>
          <Button size="sm" variant="outline" className="flex-1">
            Configure
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
