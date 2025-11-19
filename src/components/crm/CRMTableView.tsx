
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Upload, Loader2, UserPlus } from "lucide-react";
import { usePremium } from "@/contexts/PremiumContext";
import { CRMSearchBar } from "./CRMSearchBar";
import { CRMAIFeaturesBanner } from "./CRMAIFeaturesBanner";
import { CRMTableHeader } from "./CRMTableHeader";
import { CRMTableRow } from "./CRMTableRow";
import { AddLeadModal } from "./AddLeadModal";
import { EditLeadModal } from "./EditLeadModal";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

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
  assignedAgentName?: string;
  source_metadata?: {
    company?: string;
    title?: string;
    first_name?: string;
    last_name?: string;
    mobile?: string;
    fax?: string;
    website?: string;
    industry?: string;
    employees_count?: string;
    annual_revenue?: string;
    rating?: string;
    secondary_email?: string;
    skype_id?: string;
    twitter?: string;
    email_opt_out?: boolean;
    street?: string;
    city?: string;
    state?: string;
    zip_code?: string;
    country?: string;
    description?: string;
  };
}

interface CRMTableViewProps {
  highlightLeadId?: string;
  onUpgradeClick: (feature: string) => void;
  onImportClick: () => void;
}

export function CRMTableView({ onUpgradeClick, onImportClick, highlightLeadId }: CRMTableViewProps) {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [assignmentFilter, setAssignmentFilter] = useState("all");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState({
    lead: true,
    contact: true,
    email: true,
    source: true,
    status: true,
    assignedAgent: true,
    lastMessage: true,
    aiScore: true,
    aiNextAction: true,
    actions: true
  });
  const { isPremium, premiumFeatures } = usePremium();
  
  const canShowAIScore = isPremium && premiumFeatures.aiLeadScoring;
  const canShowAIActions = isPremium && premiumFeatures.aiSuggestedTemplates;

  // Fetch leads from Supabase (excluding AI automation leads)
  const fetchLeads = async () => {
    setIsLoading(true);
    try {
      let query = supabase
        .from('leads')
        .select(`
          *,
          agents!leads_assigned_agent_id_fkey(
            id,
            user_id,
            profiles(display_name, email)
          )
        `)
        .neq('lead_source_type', 'ai_automation');
      
      // Apply assignment filter
      if (assignmentFilter === 'assigned') {
        query = query.not('assigned_agent_id', 'is', null);
      } else if (assignmentFilter === 'unassigned') {
        query = query.is('assigned_agent_id', null);
      } else if (assignmentFilter !== 'all') {
        query = query.eq('assigned_agent_id', assignmentFilter);
      }
      
      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) throw error;

      const convertedLeads: Lead[] = (data || []).map((dbLead: any) => {
        const ts = dbLead.last_interaction_at || dbLead.source_metadata?.last_interaction_at || dbLead.created_at || dbLead.timestamp;
        const agentName = dbLead.agents?.profiles?.display_name || dbLead.agents?.profiles?.email || 'Unknown Agent';
        
        return {
          id: dbLead.id,
          name: dbLead.name,
          phone: dbLead.phone,
          email: dbLead.email || '',
          source: dbLead.source || 'Unknown',
          status: dbLead.status || 'New',
          list: dbLead.list || 'general',
          category: dbLead.category || 'customer',
          lastMessage: dbLead.last_message || '',
          timestamp: ts ? new Date(ts).toLocaleString() : '',
          notes: dbLead.notes || '',
          reminderDate: dbLead.reminder_date,
          reminderNote: dbLead.reminder_note || '',
          aiScore: dbLead.ai_score,
          aiNextAction: dbLead.ai_next_action || '',
          assignedAgentName: dbLead.assigned_agent_id ? agentName : undefined,
          source_metadata: dbLead.source_metadata || {}
        };
      });

      setLeads(convertedLeads);
    } catch (error: any) {
      console.error('Error fetching CRM leads:', error);
      toast({
        title: "Error loading contacts",
        description: "Failed to load CRM contacts",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [assignmentFilter]);

  const handleDeleteLead = async (leadId: string) => {
    try {
      const { error } = await supabase
        .from('leads')
        .delete()
        .eq('id', leadId);

      if (error) throw error;

      setLeads(prevLeads => prevLeads.filter(lead => lead.id !== leadId));
      toast({
        title: "Lead deleted",
        description: "Contact has been removed successfully",
      });
    } catch (error) {
      console.error('Error deleting lead:', error);
      toast({
        title: "Error",
        description: "Failed to delete contact",
        variant: "destructive",
      });
    }
  };

  const handleLeadUpdate = async (leadId: string, updates: Partial<Lead>) => {
    try {
      // Map UI fields back to database columns
      const dbUpdates: any = {};
      if (updates.name) dbUpdates.name = updates.name;
      if (updates.phone) dbUpdates.phone = updates.phone;
      if (updates.email !== undefined) dbUpdates.email = updates.email;
      if (updates.source) dbUpdates.source = updates.source;
      if (updates.status) dbUpdates.status = updates.status;
      if (updates.list) dbUpdates.list = updates.list;
      if (updates.category) dbUpdates.category = updates.category;
      if (updates.notes !== undefined) dbUpdates.notes = updates.notes;
      if (updates.lastMessage !== undefined) dbUpdates.last_message = updates.lastMessage;
      if (updates.reminderDate !== undefined) dbUpdates.reminder_date = updates.reminderDate;
      if (updates.reminderNote !== undefined) dbUpdates.reminder_note = updates.reminderNote;
      if (updates.source_metadata !== undefined) dbUpdates.source_metadata = updates.source_metadata;

      const { error } = await supabase
        .from('leads')
        .update(dbUpdates)
        .eq('id', leadId);

      if (error) throw error;

      setLeads(prevLeads => 
        prevLeads.map(lead => 
          lead.id === leadId ? { ...lead, ...updates } : lead
        )
      );

      toast({
        title: "Contact updated",
        description: "Changes saved successfully",
      });
      
      // Refresh the lead data to get latest from DB
      await fetchLeads();
    } catch (error) {
      console.error('Error updating lead:', error);
      toast({
        title: "Error",
        description: "Failed to update contact",
        variant: "destructive",
      });
    }
  };

  const handleLeadClick = (lead: Lead) => {
    setSelectedLead(lead);
    setIsEditModalOpen(true);
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
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold text-gray-900">All Leads</h2>
              <div className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-semibold rounded-full shadow-md">
                Total Records: {leads.length.toLocaleString()}
              </div>
            </div>
            <p className="text-gray-600 mt-1">Complete overview of your lead pipeline</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button 
              size="sm" 
              className="shadow-sm hover:shadow-md transition-all duration-200 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
              onClick={() => setIsAddModalOpen(true)}
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Add New Lead
            </Button>
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
              assignmentFilter={assignmentFilter}
              onAssignmentFilterChange={setAssignmentFilter}
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
            {isLoading ? (
              <div className="flex items-center justify-center h-64">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : filteredLeads.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <p className="text-lg font-medium text-gray-900">No contacts found</p>
                <p className="text-sm text-gray-600 mt-2">
                  {searchQuery ? "Try adjusting your search" : "Import contacts or move leads from AI Sales Automation"}
                </p>
              </div>
            ) : (
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
                          onLeadClick={handleLeadClick}
                        />
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </ScrollArea>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Modals */}
      <AddLeadModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={fetchLeads}
      />
      
      {selectedLead && (
        <EditLeadModal
          lead={selectedLead}
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedLead(null);
          }}
          onUpdate={handleLeadUpdate}
        />
      )}
    </div>
  );
}
