
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { usePremium } from "@/contexts/PremiumContext";
import { CRMSearchBar } from "./CRMSearchBar";
import { CRMAIFeaturesBanner } from "./CRMAIFeaturesBanner";
import { CRMTableHeader } from "./CRMTableHeader";
import { CRMTableRow } from "./CRMTableRow";

interface Lead {
  id: string;
  name: string;
  phone: string;
  email?: string;
  source: string;
  status: string;
  list?: string;
  category?: string;
  lastMessage: string;
  timestamp: string;
  notes?: string;
  reminderDate?: string;
  reminderNote?: string;
  aiScore?: number;
  aiNextAction?: string;
}

interface CRMTableViewProps {
  onUpgradeClick: (feature: string) => void;
  onImportClick: () => void;
}

const mockLeads: Lead[] = [
  {
    id: "1",
    name: "Ahmed Hassan",
    phone: "+971501234567",
    email: "ahmed.hassan@gmail.com",
    source: "WhatsApp",
    status: "New",
    list: "premium",
    category: "customer",
    lastMessage: "Interested in premium package",
    timestamp: "2 mins ago",
    notes: "Very interested in our services",
    aiScore: 95,
    aiNextAction: "Send pricing details within 1 hour"
  },
  {
    id: "2",
    name: "Fatima Al Zahra",
    phone: "+971509876543",
    email: "fatima.alzahra@gmail.com",
    source: "Facebook",
    status: "Active",
    list: "general",
    category: "customer",
    lastMessage: "Thank you for the proposal",
    timestamp: "1 hour ago",
    aiScore: 87,
    aiNextAction: "Follow up on decision timeline"
  },
  {
    id: "3",
    name: "Mohammed Ali",
    phone: "+971501111222",
    email: "mohammed.ali@gmail.com",
    source: "Instagram",
    status: "Awaiting Reply",
    list: "general",
    category: "lead",
    lastMessage: "Looking for social media manager",
    timestamp: "3 hours ago",
    aiScore: 78,
    aiNextAction: "Share case studies and portfolio"
  },
  {
    id: "4",
    name: "Sara Al Rashid",
    phone: "+971502345678",
    email: "sara.rashid@gmail.com",
    source: "WhatsApp",
    status: "New",
    list: "vip",
    category: "prospect",
    lastMessage: "Need help with digital marketing",
    timestamp: "5 hours ago",
    aiScore: 82,
    aiNextAction: "Schedule consultation call"
  },
  {
    id: "5",
    name: "Omar Abdullah",
    phone: "+971503456789",
    email: "omar.abdullah@gmail.com",
    source: "LinkedIn",
    status: "Active",
    list: "general",
    category: "customer",
    lastMessage: "Interested in your services package",
    timestamp: "1 day ago",
    aiScore: 91,
    aiNextAction: "Send detailed proposal"
  }
];

export function CRMTableView({ onUpgradeClick, onImportClick }: CRMTableViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [leads, setLeads] = useState(mockLeads);
  const [visibleColumns, setVisibleColumns] = useState({
    lead: true,
    contact: true,
    source: true,
    status: true,
    lastMessage: true,
    aiScore: true,
    aiNextAction: true,
    actions: true
  });
  const { isPremium, premiumFeatures } = usePremium();
  
  const canShowAIScore = isPremium && premiumFeatures.aiLeadScoring;
  const canShowAIActions = isPremium && premiumFeatures.aiSuggestedTemplates;

  const handleDeleteLead = (leadId: string) => {
    setLeads(prevLeads => prevLeads.filter(lead => lead.id !== leadId));
  };

  const handleLeadUpdate = (leadId: string, updates: Partial<Lead>) => {
    setLeads(prevLeads => 
      prevLeads.map(lead => 
        lead.id === leadId ? { ...lead, ...updates } : lead
      )
    );
  };

  const filteredLeads = leads.filter((lead) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      lead.name.toLowerCase().includes(query) ||
      lead.phone.toLowerCase().includes(query) ||
      (lead.email && lead.email.toLowerCase().includes(query)) ||
      lead.source.toLowerCase().includes(query) ||
      lead.status.toLowerCase().includes(query) ||
      lead.lastMessage.toLowerCase().includes(query)
    );
  });

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
            <Button 
              variant="outline" 
              size="sm" 
              className="shadow-sm hover:shadow-md transition-all duration-200 border-gray-200/80 hover:border-blue-200 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-blue-50/50 hover:text-blue-700"
              onClick={onImportClick}
            >
              <Upload className="w-4 h-4 mr-2" />
              Import from CSV
            </Button>
            <CRMSearchBar 
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              visibleColumns={visibleColumns}
              onColumnVisibilityChange={setVisibleColumns}
            />
          </div>
        </div>

        {/* AI Features Banner for Free Users */}
        {!isPremium && (
          <CRMAIFeaturesBanner onUpgradeClick={onUpgradeClick} />
        )}

        {/* Table Card - Full width container */}
        <Card className="border border-gray-200 shadow-sm bg-white flex-1 flex flex-col min-h-0 w-full">
          <CardContent className="p-0 flex-1 flex flex-col min-h-0">
            <ScrollArea className="flex-1 w-full">
              <div className="min-w-[1200px]">
                <Table>
                  <CRMTableHeader 
                    canShowAIScore={canShowAIScore}
                    canShowAIActions={canShowAIActions}
                    visibleColumns={visibleColumns}
                  />
                  <TableBody>
                    {filteredLeads.map((lead) => (
                      <CRMTableRow
                        key={lead.id}
                        lead={lead}
                        canShowAIScore={canShowAIScore}
                        canShowAIActions={canShowAIActions}
                        onUpgradeClick={onUpgradeClick}
                        visibleColumns={visibleColumns}
                        onDelete={handleDeleteLead}
                        onLeadUpdate={handleLeadUpdate}
                      />
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
