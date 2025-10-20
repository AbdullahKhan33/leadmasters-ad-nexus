import { Settings, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface DomainTileProps {
  domainName: string;
  domainId: string;
  isDummy?: boolean;
  onConfigure: () => void;
  onDelete?: () => void;
}

export function DomainTile({ domainName, isDummy, onConfigure, onDelete }: DomainTileProps) {
  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Globe className="w-5 h-5 text-muted-foreground" />
          <div>
            <p className="font-medium text-foreground">
              {domainName}
            </p>
            {isDummy && (
              <Badge variant="secondary" className="mt-1">Demo</Badge>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            size="sm" 
            onClick={onConfigure}
            className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 hover:from-blue-700 hover:via-purple-700 hover:to-pink-600 text-white shadow-sm"
          >
            <Settings className="w-4 h-4 mr-2" />
            Configure
          </Button>
          {onDelete && (
            <Button variant="outline" size="sm" onClick={onDelete}>
              Delete
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
