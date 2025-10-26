import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { 
  User, Phone, Mail, MapPin, Tag, Calendar, 
  MessageSquare, FileText, Edit, ExternalLink, Building2,
  Briefcase, Globe, Users, DollarSign, Star, Twitter as TwitterIcon,
  Bot, TrendingUp, Clock, Target, Zap, Activity
} from "lucide-react";
import { EditLeadModal } from "@/components/crm/EditLeadModal";

interface CRMLead {
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
  aiScore?: number;
  aiNextAction?: string;
  source_metadata?: any;
}

interface AILead {
  id: string;
  name: string;
  phone: string;
  email?: string;
  source: string;
  status: string;
  list?: string;
  category?: string;
  lastMessage?: string;
  timestamp?: string;
  notes?: string;
  reminderDate?: string;
  reminderNote?: string;
  aiScore?: number;
  aiNextAction?: string;
  // AI Sales specific fields
  stage?: 'new' | 'no-reply' | 'qualified' | 'nurturing' | 'long-term' | 'won';
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  lastContact?: Date;
  engagement?: { messagesSent: number; messagesOpened: number };
  workflow_stage?: string;
  assigned_agent_id?: string;
  createdAt?: Date;
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

interface AILeadDetailModalProps {
  lead: AILead | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (leadId: string, updates: Partial<AILead>) => void;
}

export function AILeadDetailModal({ lead, isOpen, onClose, onUpdate }: AILeadDetailModalProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  if (!lead) return null;

  const metadata = lead.source_metadata || {};

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { bg: string; text: string; border: string }> = {
      'new': { bg: 'bg-blue-500/10', text: 'text-blue-700 dark:text-blue-300', border: 'border-blue-500/20' },
      'active': { bg: 'bg-green-500/10', text: 'text-green-700 dark:text-green-300', border: 'border-green-500/20' },
      'contacted': { bg: 'bg-purple-500/10', text: 'text-purple-700 dark:text-purple-300', border: 'border-purple-500/20' },
      'qualified': { bg: 'bg-emerald-500/10', text: 'text-emerald-700 dark:text-emerald-300', border: 'border-emerald-500/20' },
      'awaiting reply': { bg: 'bg-orange-500/10', text: 'text-orange-700 dark:text-orange-300', border: 'border-orange-500/20' },
      'subscribed': { bg: 'bg-indigo-500/10', text: 'text-indigo-700 dark:text-indigo-300', border: 'border-indigo-500/20' },
      'closed': { bg: 'bg-gray-500/10', text: 'text-gray-700 dark:text-gray-300', border: 'border-gray-500/20' },
      'no reply': { bg: 'bg-red-500/10', text: 'text-red-700 dark:text-red-300', border: 'border-red-500/20' },
    };
    const config = statusConfig[status.toLowerCase()] || { bg: 'bg-muted', text: 'text-muted-foreground', border: 'border-border' };
    return (
      <Badge className={`${config.bg} ${config.text} ${config.border} border`}>
        {status}
      </Badge>
    );
  };

  const getStageBadge = (stage: string) => {
    const stageConfig: Record<string, { bg: string; text: string; border: string; label: string }> = {
      'new': { bg: 'bg-cyan-500/10', text: 'text-cyan-700 dark:text-cyan-300', border: 'border-cyan-500/20', label: 'New Lead' },
      'no-reply': { bg: 'bg-red-500/10', text: 'text-red-700 dark:text-red-300', border: 'border-red-500/20', label: 'No Reply' },
      'qualified': { bg: 'bg-emerald-500/10', text: 'text-emerald-700 dark:text-emerald-300', border: 'border-emerald-500/20', label: 'Qualified' },
      'nurturing': { bg: 'bg-amber-500/10', text: 'text-amber-700 dark:text-amber-300', border: 'border-amber-500/20', label: 'Nurturing' },
      'long-term': { bg: 'bg-blue-500/10', text: 'text-blue-700 dark:text-blue-300', border: 'border-blue-500/20', label: 'Long Term' },
      'won': { bg: 'bg-green-500/10', text: 'text-green-700 dark:text-green-300', border: 'border-green-500/20', label: 'Won' },
    };
    const config = stageConfig[stage] || { bg: 'bg-muted', text: 'text-muted-foreground', border: 'border-border', label: stage };
    return (
      <Badge className={`${config.bg} ${config.text} ${config.border} border`}>
        <Activity className="w-3 h-3 mr-1" />
        {config.label}
      </Badge>
    );
  };

  const getPriorityBadge = (priority: string) => {
    const priorityConfig: Record<string, { bg: string; text: string; border: string; icon: string }> = {
      'urgent': { bg: 'bg-red-500/10', text: 'text-red-700 dark:text-red-300', border: 'border-red-500/20', icon: '🔥' },
      'high': { bg: 'bg-orange-500/10', text: 'text-orange-700 dark:text-orange-300', border: 'border-orange-500/20', icon: '⚡' },
      'medium': { bg: 'bg-yellow-500/10', text: 'text-yellow-700 dark:text-yellow-300', border: 'border-yellow-500/20', icon: '📌' },
      'low': { bg: 'bg-gray-500/10', text: 'text-gray-700 dark:text-gray-300', border: 'border-gray-500/20', icon: '📋' },
    };
    const config = priorityConfig[priority] || priorityConfig['medium'];
    return (
      <Badge className={`${config.bg} ${config.text} ${config.border} border`}>
        <span className="mr-1">{config.icon}</span>
        {priority.charAt(0).toUpperCase() + priority.slice(1)} Priority
      </Badge>
    );
  };

  const handleWhatsApp = () => {
    const url = `https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}`;
    window.open(url, '_blank');
  };

  const formatTimeAgo = (date: Date) => {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-background via-background to-primary/5">
          <DialogHeader className="pb-4">
            <DialogTitle className="text-2xl flex items-center gap-2">
              <Bot className="w-6 h-6 text-primary" />
              AI Sales Lead Details
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Header Section */}
            <div className="flex items-start space-x-4 bg-card/50 rounded-lg p-4 border border-border/50">
              <Avatar className="w-16 h-16 ring-2 ring-primary/20">
                <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 text-primary text-xl font-semibold">
                  {lead.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="text-2xl font-bold">{lead.name}</h2>
                {metadata.company && (
                  <p className="text-muted-foreground mt-1 flex items-center gap-1">
                    <Building2 className="w-4 h-4" />
                    {metadata.company}
                  </p>
                )}
                {metadata.title && (
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Briefcase className="w-3 h-3" />
                    {metadata.title}
                  </p>
                )}
                <div className="flex items-center gap-2 mt-3 flex-wrap">
                  {getStatusBadge(lead.status)}
                  {lead.stage && getStageBadge(lead.stage)}
                  {lead.priority && getPriorityBadge(lead.priority)}
                  {lead.category && <Badge variant="outline">{lead.category}</Badge>}
                  {lead.list && <Badge variant="outline" className="bg-primary/10">{lead.list}</Badge>}
                  {metadata.rating && (
                    <Badge variant="outline" className={
                      metadata.rating === 'Hot' ? 'bg-red-50 text-red-700 border-red-200 dark:bg-red-500/10 dark:text-red-300' :
                      metadata.rating === 'Warm' ? 'bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-500/10 dark:text-orange-300' :
                      'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-500/10 dark:text-blue-300'
                    }>
                      <Star className="w-3 h-3 mr-1" />
                      {metadata.rating}
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            {/* AI Automation Status - PROMINENTLY DISPLAYED */}
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg p-4 border border-primary/20">
              <h3 className="text-sm font-semibold flex items-center mb-3">
                <Bot className="w-4 h-4 mr-2 text-primary" />
                AI Automation Status
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {lead.aiScore !== undefined && (
                  <div className="bg-background/50 rounded-md p-3 border border-border/50">
                    <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      AI Score
                    </p>
                    <div className={`text-2xl font-bold ${
                      lead.aiScore >= 90 ? 'text-green-600 dark:text-green-400' :
                      lead.aiScore >= 75 ? 'text-orange-600 dark:text-orange-400' :
                      'text-red-600 dark:text-red-400'
                    }`}>
                      {lead.aiScore}%
                    </div>
                  </div>
                )}
                {lead.lastContact && (
                  <div className="bg-background/50 rounded-md p-3 border border-border/50">
                    <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Last Contacted
                    </p>
                    <p className="text-sm font-medium">{formatTimeAgo(lead.lastContact)}</p>
                  </div>
                )}
                {lead.engagement && (
                  <div className="bg-background/50 rounded-md p-3 border border-border/50">
                    <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                      <MessageSquare className="w-3 h-3" />
                      Messages Sent
                    </p>
                    <p className="text-sm font-medium">{lead.engagement.messagesSent}</p>
                  </div>
                )}
                {lead.assigned_agent_id && (
                  <div className="bg-background/50 rounded-md p-3 border border-border/50">
                    <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      Assigned Agent
                    </p>
                    <p className="text-sm font-medium">Agent Assigned</p>
                  </div>
                )}
              </div>
            </div>

            <Separator />

            {/* AI Suggested Action */}
            {lead.aiNextAction && (
              <>
                <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 rounded-lg p-4 border border-emerald-500/20">
                  <h3 className="text-sm font-semibold flex items-center mb-2">
                    <Zap className="w-4 h-4 mr-2 text-emerald-600 dark:text-emerald-400" />
                    AI Suggested Next Action
                  </h3>
                  <p className="text-sm text-foreground">{lead.aiNextAction}</p>
                </div>
                <Separator />
              </>
            )}

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
                  <p className="text-sm font-medium">{lead.timestamp || new Date(lead.createdAt || Date.now()).toLocaleString()}</p>
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
                        <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-500/10 dark:text-yellow-300">
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
                    <div className="bg-muted/50 rounded-lg p-4 border border-border/50">
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
                    <div className="bg-muted/50 rounded-lg p-4 border border-border/50">
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
                    <div className="bg-muted/50 rounded-lg p-4 border border-border/50">
                      <p className="text-sm">{lead.lastMessage}</p>
                    </div>
                  </div>
                </div>
                <Separator />
              </>
            )}

            {/* Reminders */}
            {(lead.reminderDate || lead.reminderNote) && (
              <>
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    Reminders
                  </h3>
                  <div className="pl-6 space-y-2">
                    {lead.reminderDate && (
                      <div className="bg-yellow-50 dark:bg-yellow-500/10 rounded-lg p-3 border border-yellow-200 dark:border-yellow-500/20">
                        <p className="text-xs text-yellow-700 dark:text-yellow-300 font-medium mb-1">Reminder Date</p>
                        <p className="text-sm text-yellow-900 dark:text-yellow-200">
                          {new Date(lead.reminderDate).toLocaleString()}
                        </p>
                        {lead.reminderNote && (
                          <p className="text-sm text-yellow-800 dark:text-yellow-300 mt-2">{lead.reminderNote}</p>
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
                    <div className="bg-muted/50 rounded-lg p-4 border border-border/50">
                      <p className="text-sm whitespace-pre-wrap">{lead.notes}</p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2 pt-4 border-t border-border/50">
            <Button 
              onClick={onClose}
              variant="outline"
              className="flex-1"
            >
              Cancel
            </Button>
            <Button 
              onClick={() => setIsEditModalOpen(true)}
              className="flex-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 hover:from-blue-700 hover:via-purple-700 hover:to-pink-600 text-white"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit Lead
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Modal */}
      {lead && (
        <EditLeadModal
          lead={{
            ...lead,
            lastMessage: lead.lastMessage || '',
            timestamp: lead.timestamp || new Date(lead.createdAt || Date.now()).toLocaleString(),
          } as CRMLead}
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onUpdate={onUpdate}
        />
      )}
    </>
  );
}
