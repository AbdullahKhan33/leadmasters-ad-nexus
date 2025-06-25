
import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/sonner";
import { Mail, MessageSquare, Users, Send, User, Building2 } from "lucide-react";

interface MassSendModalProps {
  isOpen: boolean;
  onClose: () => void;
  template: any;
  type: "email" | "whatsapp";
}

interface Lead {
  id: string;
  name: string;
  company: string;
  email?: string;
  phone?: string;
  status: string;
}

const mockLeads: Lead[] = [
  { id: "1", name: "John Doe", company: "Acme Corp", email: "john@acme.com", phone: "+1-555-0101", status: "new" },
  { id: "2", name: "Sarah Wilson", company: "TechStart", email: "sarah@techstart.com", phone: "+1-555-0102", status: "contacted" },
  { id: "3", name: "Mike Johnson", company: "GrowthCo", email: "mike@growthco.com", phone: "+1-555-0103", status: "qualified" },
  { id: "4", name: "Lisa Chen", company: "InnovateLab", email: "lisa@innovatelab.com", phone: "+1-555-0104", status: "new" },
  { id: "5", name: "David Brown", company: "StartupX", email: "david@startupx.com", phone: "+1-555-0105", status: "interested" },
  { id: "6", name: "Emma Davis", company: "FutureTech", email: "emma@futuretech.com", phone: "+1-555-0106", status: "new" }
];

export function MassSendModal({ isOpen, onClose, template, type }: MassSendModalProps) {
  const [selectedLeads, setSelectedLeads] = useState<string[]>([]);
  const [personalizationEnabled, setPersonalizationEnabled] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const handleLeadToggle = (leadId: string) => {
    setSelectedLeads(prev => 
      prev.includes(leadId) 
        ? prev.filter(id => id !== leadId)
        : [...prev, leadId]
    );
  };

  const handleSelectAll = () => {
    const filteredLeads = getFilteredLeads();
    if (selectedLeads.length === filteredLeads.length) {
      setSelectedLeads([]);
    } else {
      setSelectedLeads(filteredLeads.map(lead => lead.id));
    }
  };

  const getFilteredLeads = () => {
    return filterStatus === "all" 
      ? mockLeads 
      : mockLeads.filter(lead => lead.status === filterStatus);
  };

  const handleMassSend = () => {
    if (selectedLeads.length === 0) {
      toast.error("Please select at least one lead");
      return;
    }

    // Simulate mass send
    toast.success(`${type === "email" ? "Emails" : "WhatsApp messages"} sent to ${selectedLeads.length} leads successfully!`);
    onClose();
  };

  const filteredLeads = getFilteredLeads();
  const isAllSelected = selectedLeads.length === filteredLeads.length && filteredLeads.length > 0;

  if (!template) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {type === "email" ? (
              <Mail className="w-5 h-5 text-purple-600" />
            ) : (
              <MessageSquare className="w-5 h-5 text-green-600" />
            )}
            Mass Send: {template.name}
          </DialogTitle>
          <DialogDescription>
            Send this template to multiple leads at once
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Personalization Toggle */}
          <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
            <div className="space-y-1">
              <Label className="text-sm font-medium">Personalization</Label>
              <p className="text-xs text-gray-600">
                Use variables like [NAME], [COMPANY] for personalized messages
              </p>
            </div>
            <Switch
              checked={personalizationEnabled}
              onCheckedChange={setPersonalizationEnabled}
            />
          </div>

          {/* Lead Selection */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-lg font-semibold">Select Leads</Label>
              <div className="flex items-center gap-4">
                {/* Filter by Status */}
                <select
                  className="border rounded px-3 py-1 text-sm"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="all">All Statuses</option>
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="qualified">Qualified</option>
                  <option value="interested">Interested</option>
                </select>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSelectAll}
                  className="text-xs"
                >
                  {isAllSelected ? "Deselect All" : "Select All"}
                </Button>
              </div>
            </div>

            {/* Leads List */}
            <div className="border rounded-lg max-h-80 overflow-y-auto">
              {filteredLeads.map((lead) => (
                <div
                  key={lead.id}
                  className="flex items-center gap-3 p-4 border-b last:border-b-0 hover:bg-gray-50"
                >
                  <Checkbox
                    checked={selectedLeads.includes(lead.id)}
                    onCheckedChange={() => handleLeadToggle(lead.id)}
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <User className="w-4 h-4 text-gray-500" />
                      <span className="font-medium">{lead.name}</span>
                      <Badge variant="secondary" className="text-xs">
                        {lead.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Building2 className="w-3 h-3" />
                        {lead.company}
                      </div>
                      {type === "email" ? (
                        <span>{lead.email}</span>
                      ) : (
                        <span>{lead.phone}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {selectedLeads.length > 0 && (
              <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                <Users className="w-4 h-4 inline mr-1" />
                {selectedLeads.length} lead{selectedLeads.length !== 1 ? 's' : ''} selected
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleMassSend}
            disabled={selectedLeads.length === 0}
            className={type === "email" ? 
              "bg-purple-600 hover:bg-purple-700 text-white disabled:bg-gray-300" : 
              "bg-green-600 hover:bg-green-700 text-white disabled:bg-gray-300"
            }
          >
            <Send className="w-4 h-4 mr-2" />
            Send to {selectedLeads.length} Lead{selectedLeads.length !== 1 ? 's' : ''}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
