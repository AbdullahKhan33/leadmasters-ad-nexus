import { Settings, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface DomainTileProps {
  domainName: string;
  domainId: string;
  isDummy?: boolean;
  verificationStatus?: string;
  onConfigure?: () => void;
  onDelete?: () => void;
  onResume?: () => void;
}

export function DomainTile({ domainName, isDummy, verificationStatus, onConfigure, onDelete, onResume }: DomainTileProps) {
  const isVerified = verificationStatus === 'verified';
  const isPending = verificationStatus === 'pending';

  return (
    <Card 
      className={`p-4 transition-shadow ${isPending ? 'cursor-pointer hover:shadow-lg' : 'hover:shadow-md'}`}
      onClick={isPending ? onResume : undefined}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Globe className="w-5 h-5 text-muted-foreground" />
          <div>
            <p className="font-medium text-foreground mb-1">
              {domainName}
            </p>
            <div className="flex gap-2">
              {isDummy && (
                <Badge variant="secondary">Demo</Badge>
              )}
              {isVerified && (
                <Badge className="bg-green-500">Active</Badge>
              )}
              {isPending && (
                <Badge variant="secondary">Pending</Badge>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {isVerified && onConfigure && (
            <Button 
              size="sm" 
              onClick={(e) => {
                e.stopPropagation();
                onConfigure();
              }}
              className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 hover:from-blue-700 hover:via-purple-700 hover:to-pink-600 text-white shadow-sm"
            >
              <Settings className="w-4 h-4 mr-2" />
              Configure
            </Button>
          )}
          {onDelete && !isDummy && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
            >
              Delete
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
