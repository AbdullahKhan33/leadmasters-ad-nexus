import { Settings, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface DomainTileProps {
  domainName: string;
  domainId: string;
  isDummy?: boolean;
  onConfigure: () => void;
}

export function DomainTile({ domainName, isDummy, onConfigure }: DomainTileProps) {
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
        
        <Button variant="outline" size="sm" onClick={onConfigure}>
          <Settings className="w-4 h-4 mr-2" />
          Configure
        </Button>
      </div>
    </Card>
  );
}
