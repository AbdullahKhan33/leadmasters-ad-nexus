
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Phone, MessageSquare, MoreHorizontal } from "lucide-react";
import { PremiumBadge } from "@/components/premium/PremiumBadge";

interface Lead {
  id: string;
  name: string;
  phone: string;
  source: string;
  status: string;
  lastMessage: string;
  timestamp: string;
  aiScore?: number;
  aiNextAction?: string;
}

interface CRMTableRowProps {
  lead: Lead;
  canShowAIScore: boolean;
  canShowAIActions: boolean;
  onUpgradeClick: (feature: string) => void;
}

export function CRMTableRow({ lead, canShowAIScore, canShowAIActions, onUpgradeClick }: CRMTableRowProps) {
  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600 bg-green-100";
    if (score >= 75) return "text-orange-600 bg-orange-100";
    return "text-red-600 bg-red-100";
  };

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'new':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200 whitespace-nowrap">New</Badge>;
      case 'active':
        return <Badge className="bg-green-100 text-green-800 border-green-200 whitespace-nowrap">Active</Badge>;
      case 'awaiting reply':
        return <Badge className="bg-orange-100 text-orange-800 border-orange-200 whitespace-nowrap">Awaiting Reply</Badge>;
      default:
        return <Badge variant="outline" className="whitespace-nowrap">{status}</Badge>;
    }
  };

  return (
    <TableRow className="hover:bg-gray-50/50">
      <TableCell className="px-6 py-4">
        <div className="flex items-center space-x-3">
          <Avatar className="w-8 h-8 flex-shrink-0">
            <AvatarFallback className="bg-gradient-to-r from-blue-100 to-purple-100 text-purple-700 text-xs">
              {lead.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="font-medium text-gray-900 truncate">{lead.name}</p>
            <p className="text-sm text-gray-500 truncate">{lead.timestamp}</p>
          </div>
        </div>
      </TableCell>
      <TableCell className="px-4 py-4">
        <div className="min-w-0">
          <p className="text-sm font-medium truncate">{lead.phone}</p>
          <p className="text-xs text-gray-500 truncate">{lead.source}</p>
        </div>
      </TableCell>
      <TableCell className="px-4 py-4">
        <Badge variant="outline" className="text-xs whitespace-nowrap">
          {lead.source}
        </Badge>
      </TableCell>
      <TableCell className="px-4 py-4">
        {getStatusBadge(lead.status)}
      </TableCell>
      <TableCell className="px-4 py-4">
        <p className="text-sm text-gray-900 truncate" title={lead.lastMessage}>
          {lead.lastMessage}
        </p>
      </TableCell>
      <TableCell className="px-4 py-4">
        {canShowAIScore ? (
          <div className="flex items-center space-x-2">
            <div className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${getScoreColor(lead.aiScore!)}`}>
              {lead.aiScore}%
            </div>
            <PremiumBadge className="flex-shrink-0">AI Score</PremiumBadge>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <div className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-400 whitespace-nowrap">
              --
            </div>
            <Button
              onClick={() => onUpgradeClick("AI Lead Scoring")}
              size="sm"
              variant="ghost"
              className="text-xs text-purple-600 hover:text-purple-700 hover:bg-purple-50 p-1 h-auto whitespace-nowrap"
            >
              Upgrade to unlock
            </Button>
          </div>
        )}
      </TableCell>
      <TableCell className="px-4 py-4">
        {canShowAIActions ? (
          <div className="min-w-0">
            <p className="text-sm text-gray-900 mb-1 truncate" title={lead.aiNextAction}>
              {lead.aiNextAction}
            </p>
            <PremiumBadge className="flex-shrink-0">AI Suggested</PremiumBadge>
          </div>
        ) : (
          <div className="min-w-0">
            <p className="text-sm text-gray-400 mb-1 whitespace-nowrap">Premium Only</p>
            <Button
              onClick={() => onUpgradeClick("AI Next Actions")}
              size="sm"
              variant="ghost"
              className="text-xs text-purple-600 hover:text-purple-700 hover:bg-purple-50 p-1 h-auto whitespace-nowrap"
            >
              Upgrade
            </Button>
          </div>
        )}
      </TableCell>
      <TableCell className="px-4 py-4">
        <div className="flex items-center space-x-1">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-gray-100">
            <MessageSquare className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-gray-100">
            <Phone className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-gray-100">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}
