import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { 
  User, Phone, Mail, MapPin, Tag, Calendar, 
  MessageSquare, FileText, Edit, ExternalLink, Building2,
  Briefcase, Globe, Users, DollarSign, Star, Twitter as TwitterIcon
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

interface LeadDetailModalProps {
  lead: Lead | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (leadId: string, updates: Partial<Lead>) => void;
}

export function LeadDetailModal({ lead, isOpen, onClose, onUpdate }: LeadDetailModalProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  if (!lead) return null;

  const metadata = lead.source_metadata || {};

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
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
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
                <AvatarFallback className="bg-gradient-to-r from-primary/20 to-primary/10 text-primary text-xl">
                  {lead.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="text-2xl font-bold">{lead.name}</h2>
                {metadata.company && (
                  <p className="text-muted-foreground mt-1">{metadata.company}</p>
                )}
                {metadata.title && (
                  <p className="text-sm text-muted-foreground">{metadata.title}</p>
                )}
                <div className="flex items-center gap-2 mt-2 flex-wrap">
                  {getStatusBadge(lead.status)}
                  {lead.category && <Badge variant="outline">{lead.category}</Badge>}
                  {lead.list && <Badge variant="outline" className="bg-primary/10">{lead.list}</Badge>}
                  {metadata.rating && (
                    <Badge variant="outline" className={
                      metadata.rating === 'Hot' ? 'bg-red-50 text-red-700 border-red-200' :
                      metadata.rating === 'Warm' ? 'bg-orange-50 text-orange-700 border-orange-200' :
                      'bg-blue-50 text-blue-700 border-blue-200'
                    }>
                      <Star className="w-3 h-3 mr-1" />
                      {metadata.rating}
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            <Separator />

            {/* Lead Information */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold flex items-center">
                <User className="w-4 h-4 mr-2" />
                Lead Information
              </h3>
              <div className="grid grid-cols-2 gap-4 pl-6">
                {metadata.first_name && (
                  <div>
                    <p className="text-xs text-muted-foreground">First Name</p>
                    <p className="text-sm font-medium">{metadata.first_name}</p>
                  </div>
                )}
                {metadata.last_name && (
                  <div>
                    <p className="text-xs text-muted-foreground">Last Name</p>
                    <p className="text-sm font-medium">{metadata.last_name}</p>
                  </div>
                )}
                <div>
                  <p className="text-xs text-muted-foreground">Phone</p>
                  <p className="text-sm font-medium">{lead.phone}</p>
                </div>
                {metadata.mobile && (
                  <div>
                    <p className="text-xs text-muted-foreground">Mobile</p>
                    <p className="text-sm font-medium">{metadata.mobile}</p>
                  </div>
                )}
                {lead.email && (
                  <div>
                    <p className="text-xs text-muted-foreground">Email</p>
                    <p className="text-sm font-medium">{lead.email}</p>
                  </div>
                )}
                {metadata.secondary_email && (
                  <div>
                    <p className="text-xs text-muted-foreground">Secondary Email</p>
                    <p className="text-sm font-medium">{metadata.secondary_email}</p>
                  </div>
                )}
                {metadata.fax && (
                  <div>
                    <p className="text-xs text-muted-foreground">Fax</p>
                    <p className="text-sm font-medium">{metadata.fax}</p>
                  </div>
                )}
                {metadata.website && (
                  <div>
                    <p className="text-xs text-muted-foreground">Website</p>
                    <p className="text-sm font-medium">
                      <a href={metadata.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                        {metadata.website}
                      </a>
                    </p>
                  </div>
                )}
                <div>
                  <p className="text-xs text-muted-foreground">Lead Source</p>
                  <p className="text-sm font-medium">{lead.source}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Added On</p>
                  <p className="text-sm font-medium">{lead.timestamp}</p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Company Information */}
            {(metadata.company || metadata.industry || metadata.employees_count || metadata.annual_revenue) && (
              <>
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold flex items-center">
                    <Building2 className="w-4 h-4 mr-2" />
                    Company Information
                  </h3>
                  <div className="grid grid-cols-2 gap-4 pl-6">
                    {metadata.company && (
                      <div>
                        <p className="text-xs text-muted-foreground">Company</p>
                        <p className="text-sm font-medium">{metadata.company}</p>
                      </div>
                    )}
                    {metadata.industry && (
                      <div>
                        <p className="text-xs text-muted-foreground">Industry</p>
                        <p className="text-sm font-medium">{metadata.industry}</p>
                      </div>
                    )}
                    {metadata.employees_count && (
                      <div>
                        <p className="text-xs text-muted-foreground">No. of Employees</p>
                        <p className="text-sm font-medium">{metadata.employees_count}</p>
                      </div>
                    )}
                    {metadata.annual_revenue && (
                      <div>
                        <p className="text-xs text-muted-foreground">Annual Revenue</p>
                        <p className="text-sm font-medium">{metadata.annual_revenue}</p>
                      </div>
                    )}
                  </div>
                </div>
                <Separator />
              </>
            )}

            {/* Social & Communication */}
            {(metadata.skype_id || metadata.twitter || metadata.email_opt_out) && (
              <>
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold flex items-center">
                    <Globe className="w-4 h-4 mr-2" />
                    Social & Communication
                  </h3>
                  <div className="grid grid-cols-2 gap-4 pl-6">
                    {metadata.skype_id && (
                      <div>
                        <p className="text-xs text-muted-foreground">Skype ID</p>
                        <p className="text-sm font-medium">{metadata.skype_id}</p>
                      </div>
                    )}
                    {metadata.twitter && (
                      <div>
                        <p className="text-xs text-muted-foreground">Twitter</p>
                        <p className="text-sm font-medium">{metadata.twitter}</p>
                      </div>
                    )}
                    {metadata.email_opt_out && (
                      <div className="col-span-2">
                        <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                          Email Opt Out - Do Not Email
                        </Badge>
                      </div>
                    )}
                  </div>
                </div>
                <Separator />
              </>
            )}

            {/* Address Information */}
            {(metadata.street || metadata.city || metadata.state || metadata.zip_code || metadata.country) && (
              <>
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    Address Information
                  </h3>
                  <div className="pl-6">
                    <div className="bg-muted/50 rounded-lg p-4 border">
                      {metadata.street && <p className="text-sm">{metadata.street}</p>}
                      <p className="text-sm">
                        {[metadata.city, metadata.state, metadata.zip_code]
                          .filter(Boolean)
                          .join(', ')}
                      </p>
                      {metadata.country && <p className="text-sm">{metadata.country}</p>}
                    </div>
                  </div>
                </div>
                <Separator />
              </>
            )}

            {/* Description */}
            {metadata.description && (
              <>
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold flex items-center">
                    <FileText className="w-4 h-4 mr-2" />
                    Description
                  </h3>
                  <div className="pl-6">
                    <div className="bg-muted/50 rounded-lg p-4 border">
                      <p className="text-sm whitespace-pre-wrap">{metadata.description}</p>
                    </div>
                  </div>
                </div>
                <Separator />
              </>
            )}

            {/* Last Communication */}
            {lead.lastMessage && (
              <>
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold flex items-center">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Last Communication
                  </h3>
                  <div className="pl-6">
                    <div className="bg-muted/50 rounded-lg p-4 border">
                      <p className="text-sm">{lead.lastMessage}</p>
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
              <>
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold flex items-center">
                    <FileText className="w-4 h-4 mr-2" />
                    Internal Notes
                  </h3>
                  <div className="pl-6">
                    <div className="bg-muted/50 rounded-lg p-4 border">
                      <p className="text-sm whitespace-pre-wrap">{lead.notes}</p>
                    </div>
                  </div>
                </div>
                <Separator />
              </>
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