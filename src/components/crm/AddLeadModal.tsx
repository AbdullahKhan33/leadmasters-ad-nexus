import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

interface AddLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function AddLeadModal({ isOpen, onClose, onSuccess }: AddLeadModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    // Basic fields
    name: '',
    phone: '',
    email: '',
    source: 'Manual Entry',
    status: 'New',
    list: 'general',
    category: 'lead',
    notes: '',
    lastMessage: '',
    // Lead Information
    firstName: '',
    lastName: '',
    company: '',
    title: '',
    mobile: '',
    fax: '',
    website: '',
    industry: '',
    employeesCount: '',
    annualRevenue: '',
    rating: '',
    secondaryEmail: '',
    skypeId: '',
    twitter: '',
    emailOptOut: false,
    // Address Information
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    // Description
    description: ''
  });
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.phone.trim()) {
      toast({
        title: "Validation Error",
        description: "Name and phone are required fields",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error("User not authenticated");
      }

      // Prepare source_metadata with all additional fields
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

      const { error } = await supabase
        .from('leads')
        .insert({
          user_id: user.id,
          name: formData.name.trim(),
          phone: formData.phone.trim(),
          email: formData.email.trim() || null,
          source: formData.source,
          status: formData.status,
          list: formData.list,
          category: formData.category,
          notes: formData.notes.trim() || null,
          last_message: formData.lastMessage.trim() || null,
          lead_type: 'manual',
          lead_source_type: 'manual',
          last_interaction_at: new Date().toISOString(),
          source_metadata: sourceMetadata
        });

      if (error) throw error;

      toast({
        title: "Lead Added",
        description: `${formData.name} has been added to your contacts`,
      });

      // Reset form
      setFormData({
        name: '',
        phone: '',
        email: '',
        source: 'Manual Entry',
        status: 'New',
        list: 'general',
        category: 'lead',
        notes: '',
        lastMessage: '',
        firstName: '',
        lastName: '',
        company: '',
        title: '',
        mobile: '',
        fax: '',
        website: '',
        industry: '',
        employeesCount: '',
        annualRevenue: '',
        rating: '',
        secondaryEmail: '',
        skypeId: '',
        twitter: '',
        emailOptOut: false,
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
        description: ''
      });

      onSuccess();
      onClose();
    } catch (error: any) {
      console.error('Error adding lead:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to add lead",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Lead</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Lead Information */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground border-b pb-2">Lead Information</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name <span className="text-red-500">*</span></Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter full name"
                  required
                />
              </div>

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
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  placeholder="First name"
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
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Job title"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="Primary email"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone <span className="text-red-500">*</span></Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="Primary phone"
                  required
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
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  value={formData.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  placeholder="Website URL"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="source">Lead Source</Label>
                <Select value={formData.source} onValueChange={(value) => handleInputChange('source', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
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
                  </SelectContent>
                </Select>
              </div>

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
                <Label htmlFor="industry">Industry</Label>
                <Select value={formData.industry} onValueChange={(value) => handleInputChange('industry', value)}>
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
                <Label htmlFor="rating">Rating</Label>
                <Select value={formData.rating} onValueChange={(value) => handleInputChange('rating', value)}>
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
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="emailOptOut"
                checked={formData.emailOptOut}
                onChange={(e) => handleInputChange('emailOptOut', e.target.checked)}
                className="h-4 w-4"
              />
              <Label htmlFor="emailOptOut" className="cursor-pointer">Email Opt Out</Label>
            </div>
          </div>

          {/* Address Information */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground border-b pb-2">Address Information</h3>
            
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
          </div>

          {/* Description Information */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground border-b pb-2">Description Information</h3>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Detailed description about this lead"
                rows={4}
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
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-2 pt-4">
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
              className="flex-1"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Adding...
                </>
              ) : (
                'Add Lead'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}