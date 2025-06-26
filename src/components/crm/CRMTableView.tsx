
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
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
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">New</Badge>;
      case 'active':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Active</Badge>;
      case 'awaiting reply':
        return <Badge className="bg-orange-100 text-orange-800 border-orange-200">Awaiting Reply</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="h-full bg-gradient-to-br from-gray-50/50 via-blue-50/20 to-purple-50/20 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
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
          <Card className="border-2 border-dashed border-purple-300 bg-gradient-to-r from-purple-50 to-pink-50">
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

        {/* Table */}
        <Card className="border border-gray-200 shadow-sm bg-white">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Lead</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Message</TableHead>
                  <TableHead className="flex items-center space-x-2">
                    <span>AI Score</span>
                    {!canShowAIScore && <Lock className="w-3 h-3 text-gray-400" />}
                  </TableHead>
                  <TableHead className="flex items-center space-x-2">
                    <span>AI Next Action</span>
                    {!canShowAIActions && <Lock className="w-3 h-3 text-gray-400" />}
                  </TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockLeads.map((lead) => (
                  <TableRow key={lead.id} className="hover:bg-gray-50">
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="bg-gradient-to-r from-blue-100 to-purple-100 text-purple-700 text-xs">
                            {lead.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-gray-900">{lead.name}</p>
                          <p className="text-sm text-gray-500">{lead.timestamp}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm font-medium">{lead.phone}</p>
                        <p className="text-xs text-gray-500">{lead.source}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {lead.source}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(lead.status)}
                    </TableCell>
                    <TableCell>
                      <p className="text-sm text-gray-900 max-w-xs truncate">{lead.lastMessage}</p>
                    </TableCell>
                    <TableCell>
                      {canShowAIScore ? (
                        <div className="flex items-center space-x-2">
                          <div className={`px-2 py-1 rounded-full text-xs font-medium ${getScoreColor(lead.aiScore!)}`}>
                            {lead.aiScore}%
                          </div>
                          <PremiumBadge>AI Score</PremiumBadge>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <div className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-400">
                            --
                          </div>
                          <Button
                            onClick={() => onUpgradeClick("AI Lead Scoring")}
                            size="sm"
                            variant="ghost"
                            className="text-xs text-purple-600 hover:text-purple-700 hover:bg-purple-50 p-1 h-auto"
                          >
                            Upgrade to unlock
                          </Button>
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      {canShowAIActions ? (
                        <div className="max-w-xs">
                          <p className="text-sm text-gray-900 mb-1">{lead.aiNextAction}</p>
                          <PremiumBadge>AI Suggested</PremiumBadge>
                        </div>
                      ) : (
                        <div className="max-w-xs">
                          <p className="text-sm text-gray-400 mb-1">Premium Only — Upgrade to unlock</p>
                          <Button
                            onClick={() => onUpgradeClick("AI Next Actions")}
                            size="sm"
                            variant="ghost"
                            className="text-xs text-purple-600 hover:text-purple-700 hover:bg-purple-50 p-1 h-auto"
                          >
                            Upgrade
                          </Button>
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MessageSquare className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Phone className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
