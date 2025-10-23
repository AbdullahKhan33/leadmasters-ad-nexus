import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreVertical, ExternalLink } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface LeadCardProps {
  name: string;
  source: string;
  time: string;
  detail: string;
  aiScore?: number;
}

export function LeadCard({ name, source, time, detail, aiScore }: LeadCardProps) {
  return (
    <Card className="hover:shadow-md transition-all duration-200 group">
      <CardContent className="p-4 space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h4 className="font-semibold text-sm group-hover:text-primary transition-colors">
              {name}
            </h4>
            <p className="text-xs text-muted-foreground">{source}</p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <ExternalLink className="mr-2 h-4 w-4" />
                View in CRM
              </DropdownMenuItem>
              <DropdownMenuItem>Reassign</DropdownMenuItem>
              <DropdownMenuItem>Add Note</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="space-y-2">
          <div className="text-xs text-muted-foreground">{time}</div>
          <p className="text-xs leading-relaxed">{detail}</p>
          {aiScore !== undefined && (
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium">AI Score:</span>
              <Badge variant={aiScore > 0.8 ? "default" : "secondary"} className="text-xs">
                {(aiScore * 100).toFixed(0)}%
              </Badge>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
