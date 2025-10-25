import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { 
  User, Phone, Mail, MapPin, Tag, Calendar, 
  MessageSquare, FileText, Edit, ExternalLink 
} from "lucide-react";
import { EditLeadModal } from "./EditLeadModal";

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

interface LeadDetailModalProps {
  lead: Lead | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (leadId: string, updates: Partial<Lead>) => void;
}

export function LeadDetailModal({ lead, isOpen, onClose, onUpdate }: LeadDetailModalProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  if (!lead) return null;

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { bg: string; text: string; border: string }> = {
      'new': { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-200' },
      'active': { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-200' },
      'contacted': { bg: 'bg-purple-100', text: 'text-purple-800', border: 'border-purple-200' },
      'qualified': { bg: 'bg-emerald-100', text: 'text-emerald-800', border: 'border-emerald-200' },
      'awaiting reply': { bg: 'bg-orange-100', text: 'text-orange-800', border: 'border-orange-200' },
      'subscribed': { bg: 'bg-indigo-100', text: 'text-indigo-800', border: 'border-indigo-200' },
      'closed': { bg: 'bg-gray-100', text: 'text-gray-800', border: 'border-gray-200' },
    };
    const config = statusConfig[status.toLowerCase()] || { bg: 'bg-gray-100', text: 'text-gray-800', border: 'border-gray-200' };
    return (
      <Badge className={`${config.bg} ${config.text} ${config.border} border`}>
        {status}
      </Badge>
    );
  };

  const handleWhatsApp = () => {
    const url = `https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}`;
    window.open(url, '_blank');
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <DialogTitle className="text-2xl">Lead Details</DialogTitle>
            <Button 
              onClick={() => setIsEditModalOpen(true)} 
              size="sm"
              className="ml-auto"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
          </DialogHeader>

          <div className="space-y-6">
            {/* Header Section */}
            <div className="flex items-start space-x-4">
              <Avatar className="w-16 h-16">
                <AvatarFallback className="bg-gradient-to-r from-blue-100 to-purple-100 text-purple-700 text-xl">
                  {lead.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900">{lead.name}</h2>
                <div className="flex items-center gap-2 mt-2">
                  {getStatusBadge(lead.status)}
                  <Badge variant="outline">{lead.category}</Badge>
                  <Badge variant="outline" className="bg-blue-50">{lead.list}</Badge>
                </div>
              </div>
            </div>

            <Separator />

            {/* Contact Information */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-gray-900 flex items-center">
                <User className="w-4 h-4 mr-2" />
                Contact Information
              </h3>
              <div className="grid grid-cols-2 gap-4 pl-6">
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-xs text-gray-500">Phone</p>
                    <p className="text-sm font-medium">{lead.phone}</p>
                  </div>
                </div>
                {lead.email && (
                  <div className="flex items-center space-x-3">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <div>
                      <p className="text-xs text-gray-500">Email</p>
                      <p className="text-sm font-medium">{lead.email}</p>
                    </div>
                  </div>
                )}
                <div className="flex items-center space-x-3">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-xs text-gray-500">Source</p>
                    <p className="text-sm font-medium">{lead.source}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-xs text-gray-500">Added On</p>
                    <p className="text-sm font-medium">{lead.timestamp}</p>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Last Communication */}
            {lead.lastMessage && (
              <>
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-gray-900 flex items-center">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Last Communication
                  </h3>
                  <div className="pl-6">
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <p className="text-sm text-gray-700">{lead.lastMessage}</p>
                    </div>
                  </div>
                </div>
                <Separator />
              </>
            )}

            {/* AI Insights */}
            {(lead.aiScore || lead.aiNextAction) && (
              <>
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-gray-900 flex items-center">
                    <Tag className="w-4 h-4 mr-2" />
                    AI Insights
                  </h3>
                  <div className="grid grid-cols-2 gap-4 pl-6">
                    {lead.aiScore && (
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Lead Score</p>
                        <div className="flex items-center space-x-2">
                          <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                            lead.aiScore >= 90 ? 'bg-green-100 text-green-600' :
                            lead.aiScore >= 75 ? 'bg-orange-100 text-orange-600' :
                            'bg-red-100 text-red-600'
                          }`}>
                            {lead.aiScore}%
                          </div>
                        </div>
                      </div>
                    )}
                    {lead.aiNextAction && (
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Suggested Action</p>
                        <p className="text-sm font-medium text-gray-900">{lead.aiNextAction}</p>
                      </div>
                    )}
                  </div>
                </div>
                <Separator />
              </>
            )}

            {/* Reminders */}
            {(lead.reminderDate || lead.reminderNote) && (
              <>
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-gray-900 flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    Reminders
                  </h3>
                  <div className="pl-6 space-y-2">
                    {lead.reminderDate && (
                      <div className="bg-yellow-50 rounded-lg p-3 border border-yellow-200">
                        <p className="text-xs text-yellow-700 font-medium mb-1">Reminder Date</p>
                        <p className="text-sm text-yellow-900">
                          {new Date(lead.reminderDate).toLocaleString()}
                        </p>
                        {lead.reminderNote && (
                          <p className="text-sm text-yellow-800 mt-2">{lead.reminderNote}</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <Separator />
              </>
            )}

            {/* Notes */}
            {lead.notes && (
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-900 flex items-center">
                  <FileText className="w-4 h-4 mr-2" />
                  Notes
                </h3>
                <div className="pl-6">
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <p className="text-sm text-gray-700 whitespace-pre-wrap">{lead.notes}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2 pt-4 border-t">
            <Button 
              onClick={handleWhatsApp}
              variant="outline"
              className="flex-1"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Open WhatsApp
            </Button>
            <Button 
              onClick={() => setIsEditModalOpen(true)}
              className="flex-1"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit Details
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Modal */}
      <EditLeadModal
        lead={lead}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onUpdate={onUpdate}
      />
    </>
  );
}