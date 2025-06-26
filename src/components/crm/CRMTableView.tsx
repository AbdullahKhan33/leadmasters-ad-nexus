
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Search, 
  Filter, 
  Phone, 
  MessageSquare, 
  MoreHorizontal,
  Lock,
  Star
} from "lucide-react";
import { usePremium } from "@/contexts/PremiumContext";
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

interface CRMTableViewProps {
  onUpgradeClick: (feature: string) => void;
}

const mockLeads: Lead[] = [
  {
    id: "1",
    name: "Ahmed Hassan",
    phone: "+971501234567",
    source: "WhatsApp",
    status: "New",
    lastMessage: "Interested in premium package",
    timestamp: "2 mins ago",
    aiScore: 95,
    aiNextAction: "Send pricing details within 1 hour"
  },
  {
    id: "2",
    name: "Fatima Al Zahra",
    phone: "+971509876543",
    source: "Facebook",
    status: "Active",
    lastMessage: "Thank you for the proposal",
    timestamp: "1 hour ago",
    aiScore: 87,
    aiNextAction: "Follow up on decision timeline"
  },
  {
    id: "3",
    name: "Mohammed Ali",
    phone: "+971501111222",
    source: "Instagram",
    status: "Awaiting Reply",
    lastMessage: "Looking for social media manager",
    timestamp: "3 hours ago",
    aiScore: 78,
    aiNextAction: "Share case studies and portfolio"
  },
  {
    id: "4",
    name: "Sara Al Rashid",
    phone: "+971502345678",
    source: "WhatsApp",
    status: "New",
    lastMessage: "Need help with digital marketing",
    timestamp: "5 hours ago",
    aiScore: 82,
    aiNextAction: "Schedule consultation call"
  },
  {
    id: "5",
    name: "Omar Abdullah",
    phone: "+971503456789",
    source: "LinkedIn",
    status: "Active",
    lastMessage: "Interested in your services package",
    timestamp: "1 day ago",
    aiScore: 91,
    aiNextAction: "Send detailed proposal"
  }
];

export function CRMTableView({ onUpgradeClick }: CRMTableViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const { isPremium, premiumFeatures } = usePremium();
  
  const canShowAIScore = isPremium && premiumFeatures.aiLeadScoring;
  const canShowAIActions = isPremium && premiumFeatures.aiSuggestedTemplates;

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
    <div className="h-full bg-gradient-to-br from-gray-50/50 via-blue-50/20 to-purple-50/20 p-4 flex flex-col">
      <div className="w-full flex flex-col h-full space-y-4 max-w-none">
        {/* Header */}
        <div className="flex items-center justify-between flex-shrink-0">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">All Leads</h2>
            <p className="text-gray-600">Complete overview of your lead pipeline</p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search leads..."
                className="pl-10 w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        {/* AI Features Banner for Free Users */}
        {!isPremium && (
          <Card className="border-2 border-dashed border-purple-300 bg-gradient-to-r from-purple-50 to-pink-50 flex-shrink-0">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                    <Star className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Unlock AI-Powered Lead Management</h3>
                    <p className="text-sm text-gray-600">Get AI lead scoring, smart suggestions, and automated actions</p>
                  </div>
                </div>
                <Button
                  onClick={() => onUpgradeClick("AI Lead Management")}
                  className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white"
                >
                  Upgrade Now
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Table Card - Full width container */}
        <Card className="border border-gray-200 shadow-sm bg-white flex-1 flex flex-col min-h-0 w-full">
          <CardContent className="p-0 flex-1 flex flex-col min-h-0">
            <ScrollArea className="flex-1 w-full">
              <div className="min-w-[1200px]">
                <Table>
                  <TableHeader className="sticky top-0 bg-white z-10 border-b">
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="w-[250px] px-6 py-4">Lead</TableHead>
                      <TableHead className="w-[180px] px-4 py-4">Contact</TableHead>
                      <TableHead className="w-[120px] px-4 py-4">Source</TableHead>
                      <TableHead className="w-[140px] px-4 py-4">Status</TableHead>
                      <TableHead className="w-[250px] px-4 py-4">Last Message</TableHead>
                      <TableHead className="w-[180px] px-4 py-4">
                        <div className="flex items-center space-x-2">
                          <span className="whitespace-nowrap">AI Score</span>
                          {!canShowAIScore && <Lock className="w-3 h-3 text-gray-400 flex-shrink-0" />}
                        </div>
                      </TableHead>
                      <TableHead className="w-[220px] px-4 py-4">
                        <div className="flex items-center space-x-2">
                          <span className="whitespace-nowrap">AI Next Action</span>
                          {!canShowAIActions && <Lock className="w-3 h-3 text-gray-400 flex-shrink-0" />}
                        </div>
                      </TableHead>
                      <TableHead className="w-[140px] px-4 py-4">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockLeads.map((lead) => (
                      <TableRow key={lead.id} className="hover:bg-gray-50/50">
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
                    ))}
                  </TableBody>
                </Table>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
