import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2, User, Building2, MapPin, FileText, Bot, Mail, Phone } from "lucide-react";
import { useAgents } from "@/hooks/useAgents";
import { Card, CardContent } from "@/components/ui/card";

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

interface EditLeadModalProps {
  lead: Lead;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (leadId: string, updates: Partial<Lead>) => void;
}

export function EditLeadModal({ lead, isOpen, onClose, onUpdate }: EditLeadModalProps) {
  const { agents } = useAgents();
  const metadata = lead.source_metadata || {};
  const [isSubmitting, setIsSubmitting] = useState(false);
  const SOURCE_OPTIONS = [
    'Manual Entry',
    'WhatsApp',
    'Facebook',
    'Instagram',
    'LinkedIn',
    'Website',
    'Referral',
    'Walk-in',
    'Phone Call',
    'Advertisement',
    'Partner',
    'Trade Show',
    'CSV Import'
  ];
  
  // Parse name if firstName/lastName not in metadata
  let initialFirstName = metadata.first_name || '';
  let initialLastName = metadata.last_name || '';
  
  if (!initialFirstName && !initialLastName && lead.name) {
    const nameParts = lead.name.trim().split(' ');
    if (nameParts.length === 1) {
      initialFirstName = nameParts[0];
    } else if (nameParts.length >= 2) {
      initialFirstName = nameParts[0];
      initialLastName = nameParts.slice(1).join(' ');
    }
  }
  
  const [formData, setFormData] = useState({
    // Basic fields
    phone: lead.phone,
    email: lead.email || '',
    source: SOURCE_OPTIONS.includes(lead.source) ? lead.source : (lead.source?.trim() || 'Manual Entry'),
    status: lead.status,
    list: lead.list || 'general',
    category: lead.category || 'customer',
    notes: lead.notes || '',
    lastMessage: lead.lastMessage || '',
    assignedAgentId: (lead as any).assigned_agent_id || '',
    // Lead Information from metadata
    firstName: initialFirstName,
    lastName: initialLastName,
    company: metadata.company || '',
    title: metadata.title || '',
    mobile: metadata.mobile || '',
    fax: metadata.fax || '',
    website: metadata.website || '',
    industry: metadata.industry || '',
    employeesCount: metadata.employees_count || '',
    annualRevenue: metadata.annual_revenue || '',
    rating: metadata.rating || '',
    secondaryEmail: metadata.secondary_email || '',
    skypeId: metadata.skype_id || '',
    twitter: metadata.twitter || '',
    emailOptOut: metadata.email_opt_out || false,
    // Address Information
    street: metadata.street || '',
    city: metadata.city || '',
    state: metadata.state || '',
    zipCode: metadata.zip_code || '',
    country: metadata.country || '',
    // Description
    description: metadata.description || ''
  });
  const { toast } = useToast();

  // Update form when lead changes
  useEffect(() => {
    const metadata = lead.source_metadata || {};
    
    // Parse name if firstName/lastName not in metadata
    let firstName = metadata.first_name || '';
    let lastName = metadata.last_name || '';
    
    if (!firstName && !lastName && lead.name) {
      const nameParts = lead.name.trim().split(' ');
      if (nameParts.length === 1) {
        firstName = nameParts[0];
      } else if (nameParts.length >= 2) {
        firstName = nameParts[0];
        lastName = nameParts.slice(1).join(' ');
      }
    }
    
    setFormData({
      phone: lead.phone,
      email: lead.email || '',
      source: SOURCE_OPTIONS.includes(lead.source) ? lead.source : (lead.source?.trim() || 'Manual Entry'),
      status: lead.status,
      list: lead.list || 'general',
      category: lead.category || 'customer',
      notes: lead.notes || '',
      lastMessage: lead.lastMessage || '',
      assignedAgentId: (lead as any).assigned_agent_id || '',
      firstName: firstName,
      lastName: lastName,
      company: metadata.company || '',
      title: metadata.title || '',
      mobile: metadata.mobile || '',
      fax: metadata.fax || '',
      website: metadata.website || '',
      industry: metadata.industry || '',
      employeesCount: metadata.employees_count || '',
      annualRevenue: metadata.annual_revenue || '',
      rating: metadata.rating || '',
      secondaryEmail: metadata.secondary_email || '',
      skypeId: metadata.skype_id || '',
      twitter: metadata.twitter || '',
      emailOptOut: metadata.email_opt_out || false,
      street: metadata.street || '',
      city: metadata.city || '',
      state: metadata.state || '',
      zipCode: metadata.zip_code || '',
      country: metadata.country || '',
      description: metadata.description || ''
    });
  }, [lead]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if ((!formData.firstName.trim() && !formData.lastName.trim()) || !formData.phone.trim()) {
      toast({
        title: "Validation Error",
        description: "First name/Last name and phone are required fields",
        variant: "destructive",
      });
      return;
    }
    
    // Generate name from first and last name
    const fullName = `${formData.firstName.trim()} ${formData.lastName.trim()}`.trim() || 'Unnamed Lead';
    
    setIsSubmitting(true);
    
    // Prepare metadata
    const sourceMetadata: any = {};
    if (formData.company) sourceMetadata.company = formData.company.trim();
    if (formData.title) sourceMetadata.title = formData.title.trim();
    if (formData.mobile) sourceMetadata.mobile = formData.mobile.trim();
    if (formData.fax) sourceMetadata.fax = formData.fax.trim();
    if (formData.website) sourceMetadata.website = formData.website.trim();
    if (formData.industry) sourceMetadata.industry = formData.industry;
    if (formData.employeesCount) sourceMetadata.employees_count = formData.employeesCount.trim();
    if (formData.annualRevenue) sourceMetadata.annual_revenue = formData.annualRevenue.trim();
    if (formData.rating) sourceMetadata.rating = formData.rating;
    if (formData.secondaryEmail) sourceMetadata.secondary_email = formData.secondaryEmail.trim();
    if (formData.skypeId) sourceMetadata.skype_id = formData.skypeId.trim();
    if (formData.twitter) sourceMetadata.twitter = formData.twitter.trim();
    if (formData.street) sourceMetadata.street = formData.street.trim();
    if (formData.city) sourceMetadata.city = formData.city.trim();
    if (formData.state) sourceMetadata.state = formData.state.trim();
    if (formData.zipCode) sourceMetadata.zip_code = formData.zipCode.trim();
    if (formData.country) sourceMetadata.country = formData.country.trim();
    if (formData.description) sourceMetadata.description = formData.description.trim();
    if (formData.emailOptOut) sourceMetadata.email_opt_out = formData.emailOptOut;
    if (formData.firstName) sourceMetadata.first_name = formData.firstName.trim();
    if (formData.lastName) sourceMetadata.last_name = formData.lastName.trim();
    
    const updates = {
      name: fullName,
      phone: formData.phone,
      email: formData.email,
      source: formData.source,
      status: formData.status,
      list: formData.list,
      category: formData.category,
      notes: formData.notes,
      lastMessage: formData.lastMessage,
      source_metadata: sourceMetadata,
      assigned_agent_id: formData.assignedAgentId || null,
    };
    
    onUpdate(lead.id, updates);
    
    toast({
      title: "Lead Updated",
      description: `${fullName}'s information has been updated successfully`,
      variant: "default",
    });
    
    setIsSubmitting(false);
    onClose();
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Edit Lead Details
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Contact Information */}
          <Card className="border-l-4 border-l-blue-500 bg-gradient-to-r from-blue-50/50 to-transparent dark:from-blue-950/20">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100">Contact Information</h3>
              </div>
            
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="flex items-center gap-1">
                    <User className="w-3 h-3" /> First Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    placeholder="First name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    placeholder="Last name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-1">
                    <Mail className="w-3 h-3" /> Email <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="Primary email"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center gap-1">
                    <Phone className="w-3 h-3" /> Phone <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="Primary phone"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mobile">Mobile</Label>
                  <Input
                    id="mobile"
                    value={formData.mobile}
                    onChange={(e) => handleInputChange('mobile', e.target.value)}
                    placeholder="Mobile number"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="secondaryEmail">Secondary Email</Label>
                  <Input
                    id="secondaryEmail"
                    type="email"
                    value={formData.secondaryEmail}
                    onChange={(e) => handleInputChange('secondaryEmail', e.target.value)}
                    placeholder="Secondary email"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="skypeId">Skype ID</Label>
                  <Input
                    id="skypeId"
                    value={formData.skypeId}
                    onChange={(e) => handleInputChange('skypeId', e.target.value)}
                    placeholder="Skype ID"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="twitter">Twitter</Label>
                  <Input
                    id="twitter"
                    value={formData.twitter}
                    onChange={(e) => handleInputChange('twitter', e.target.value)}
                    placeholder="@username"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2 mt-4">
                <input
                  type="checkbox"
                  id="emailOptOut"
                  checked={formData.emailOptOut}
                  onChange={(e) => handleInputChange('emailOptOut', e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300"
                />
                <Label htmlFor="emailOptOut" className="cursor-pointer">Email Opt Out</Label>
              </div>

              {lead.timestamp && (
                <div className="pt-2 text-xs text-muted-foreground">
                  Lead added on: {lead.timestamp}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Company Information */}
          <Card className="border-l-4 border-l-purple-500 bg-gradient-to-r from-purple-50/50 to-transparent dark:from-purple-950/20">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 rounded-lg bg-purple-500/10">
                  <Building2 className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-100">Company & Business Details</h3>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                    placeholder="Company name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title">Job Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="Job title"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={formData.website}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                    placeholder="Website URL"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Select value={formData.industry || undefined} onValueChange={(value) => handleInputChange('industry', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Technology">Technology</SelectItem>
                      <SelectItem value="Healthcare">Healthcare</SelectItem>
                      <SelectItem value="Finance">Finance</SelectItem>
                      <SelectItem value="Real Estate">Real Estate</SelectItem>
                      <SelectItem value="Education">Education</SelectItem>
                      <SelectItem value="Retail">Retail</SelectItem>
                      <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                      <SelectItem value="Hospitality">Hospitality</SelectItem>
                      <SelectItem value="Automotive">Automotive</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="employeesCount">No. of Employees</Label>
                  <Input
                    id="employeesCount"
                    value={formData.employeesCount}
                    onChange={(e) => handleInputChange('employeesCount', e.target.value)}
                    placeholder="Number of employees"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="annualRevenue">Annual Revenue</Label>
                  <Input
                    id="annualRevenue"
                    value={formData.annualRevenue}
                    onChange={(e) => handleInputChange('annualRevenue', e.target.value)}
                    placeholder="e.g., $1,000,000"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fax">Fax</Label>
                  <Input
                    id="fax"
                    value={formData.fax}
                    onChange={(e) => handleInputChange('fax', e.target.value)}
                    placeholder="Fax number"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Lead Management */}
          <Card className="border-l-4 border-l-green-500 bg-gradient-to-r from-green-50/50 to-transparent dark:from-green-950/20">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 rounded-lg bg-green-500/10">
                  <Bot className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-lg font-semibold text-green-900 dark:text-green-100">Lead Management</h3>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="status">Lead Status</Label>
                  <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="New">New</SelectItem>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Contacted">Contacted</SelectItem>
                      <SelectItem value="Qualified">Qualified</SelectItem>
                      <SelectItem value="Awaiting Reply">Awaiting Reply</SelectItem>
                      <SelectItem value="Subscribed">Subscribed</SelectItem>
                      <SelectItem value="Closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="source">Lead Source</Label>
                  <Select value={formData.source} onValueChange={(value) => handleInputChange('source', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select source" />
                    </SelectTrigger>
                    <SelectContent>
                      {!SOURCE_OPTIONS.includes(formData.source) && formData.source && (
                        <SelectItem value={formData.source}>{formData.source}</SelectItem>
                      )}
                      <SelectItem value="Manual Entry">Manual Entry</SelectItem>
                      <SelectItem value="WhatsApp">WhatsApp</SelectItem>
                      <SelectItem value="Facebook">Facebook</SelectItem>
                      <SelectItem value="Instagram">Instagram</SelectItem>
                      <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                      <SelectItem value="Website">Website</SelectItem>
                      <SelectItem value="Referral">Referral</SelectItem>
                      <SelectItem value="Walk-in">Walk-in</SelectItem>
                      <SelectItem value="Phone Call">Phone Call</SelectItem>
                      <SelectItem value="Advertisement">Advertisement</SelectItem>
                      <SelectItem value="Partner">Partner</SelectItem>
                      <SelectItem value="Trade Show">Trade Show</SelectItem>
                      <SelectItem value="CSV Import">CSV Import</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rating">Rating</Label>
                  <Select value={formData.rating || undefined} onValueChange={(value) => handleInputChange('rating', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select rating" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Hot">Hot</SelectItem>
                      <SelectItem value="Warm">Warm</SelectItem>
                      <SelectItem value="Cold">Cold</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="list">List</Label>
                  <Select value={formData.list} onValueChange={(value) => handleInputChange('list', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General</SelectItem>
                      <SelectItem value="premium">Premium</SelectItem>
                      <SelectItem value="vip">VIP</SelectItem>
                      <SelectItem value="newsletter">Newsletter</SelectItem>
                      <SelectItem value="prospects">Prospects</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lead">Lead</SelectItem>
                      <SelectItem value="prospect">Prospect</SelectItem>
                      <SelectItem value="customer">Customer</SelectItem>
                      <SelectItem value="subscriber">Subscriber</SelectItem>
                      <SelectItem value="partner">Partner</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="assignedAgent">Assign to Agent</Label>
                  <Select value={formData.assignedAgentId || 'unassigned'} onValueChange={(value) => handleInputChange('assignedAgentId', value === 'unassigned' ? '' : value)}>
                    <SelectTrigger id="assignedAgent">
                      <SelectValue placeholder="Select agent (optional)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="unassigned">Unassigned</SelectItem>
                      {agents.map(agent => (
                        <SelectItem key={agent.id} value={agent.id}>
                          {agent.display_name || agent.email || agent.agent_code}
                          {agent.assigned_leads_count > 0 && ` (${agent.assigned_leads_count} leads)`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Address Information */}
          <Card className="border-l-4 border-l-orange-500 bg-gradient-to-r from-orange-50/50 to-transparent dark:from-orange-950/20">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 rounded-lg bg-orange-500/10">
                  <MapPin className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className="text-lg font-semibold text-orange-900 dark:text-orange-100">Address Information</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="street">Street</Label>
                  <Input
                    id="street"
                    value={formData.street}
                    onChange={(e) => handleInputChange('street', e.target.value)}
                    placeholder="Street address"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    placeholder="City"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    value={formData.state}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                    placeholder="State/Province"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="zipCode">Zip Code</Label>
                  <Input
                    id="zipCode"
                    value={formData.zipCode}
                    onChange={(e) => handleInputChange('zipCode', e.target.value)}
                    placeholder="Zip/Postal code"
                  />
                </div>

                <div className="space-y-2 col-span-2">
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    value={formData.country}
                    onChange={(e) => handleInputChange('country', e.target.value)}
                    placeholder="Country"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Description Information */}
          <Card className="border-l-4 border-l-pink-500 bg-gradient-to-r from-pink-50/50 to-transparent dark:from-pink-950/20">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 rounded-lg bg-pink-500/10">
                  <FileText className="w-5 h-5 text-pink-600 dark:text-pink-400" />
                </div>
                <h3 className="text-lg font-semibold text-pink-900 dark:text-pink-100">Notes & Description</h3>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Detailed description about this lead"
                    rows={4}
                    className="resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastMessage">Last Message</Label>
                  <Textarea
                    id="lastMessage"
                    value={formData.lastMessage}
                    onChange={(e) => handleInputChange('lastMessage', e.target.value)}
                    placeholder="Most recent communication or context"
                    rows={2}
                    className="resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Internal Notes</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => handleInputChange('notes', e.target.value)}
                    placeholder="Private notes (not visible to lead)"
                    rows={3}
                    className="resize-none"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex gap-3 pt-4 sticky bottom-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-4 border-t">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose} 
              className="flex-1"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="flex-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 hover:from-blue-700 hover:via-purple-700 hover:to-pink-600 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Updating...
                </>
              ) : (
                'Update Lead'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}