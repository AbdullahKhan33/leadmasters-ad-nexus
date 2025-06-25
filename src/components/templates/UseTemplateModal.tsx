
import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/sonner";
import { Mail, MessageSquare, User, Building2 } from "lucide-react";

interface UseTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  template: any;
  type: "email" | "whatsapp";
}

export function UseTemplateModal({ isOpen, onClose, template, type }: UseTemplateModalProps) {
  const [formData, setFormData] = useState({
    sender: "",
    recipient: "",
    recipientName: "",
    recipientCompany: "",
    phoneNumber: "",
    leadName: ""
  });

  const handleApplyTemplate = () => {
    if (type === "email") {
      if (!formData.sender || !formData.recipient) {
        toast.error("Please fill in sender and recipient fields");
        return;
      }
    } else {
      if (!formData.phoneNumber && !formData.leadName) {
        toast.error("Please select a lead or enter a phone number");
        return;
      }
    }

    toast.success("Template applied. You can edit before sending.");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {type === "email" ? (
              <Mail className="w-5 h-5 text-blue-600" />
            ) : (
              <MessageSquare className="w-5 h-5 text-green-600" />
            )}
            Use Template: {template?.name}
          </DialogTitle>
          <DialogDescription>
            Configure the details to apply this template
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {type === "email" ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="sender">From (Verified Sender)</Label>
                <Select onValueChange={(value) => setFormData({...formData, sender: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select sender email" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sales@leadmasters.com">sales@leadmasters.com</SelectItem>
                    <SelectItem value="support@leadmasters.com">support@leadmasters.com</SelectItem>
                    <SelectItem value="hello@leadmasters.com">hello@leadmasters.com</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="recipient">To (Recipient Email)</Label>
                <Input
                  id="recipient"
                  type="email"
                  placeholder="recipient@company.com"
                  value={formData.recipient}
                  onChange={(e) => setFormData({...formData, recipient: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="recipientName">Recipient Name</Label>
                  <Input
                    id="recipientName"
                    placeholder="John Doe"
                    value={formData.recipientName}
                    onChange={(e) => setFormData({...formData, recipientName: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="recipientCompany">Company</Label>
                  <Input
                    id="recipientCompany"
                    placeholder="Company Inc."
                    value={formData.recipientCompany}
                    onChange={(e) => setFormData({...formData, recipientCompany: e.target.value})}
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="space-y-2">
                <Label>Select Lead or Enter Phone Number</Label>
                <Select onValueChange={(value) => setFormData({...formData, leadName: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select from CRM leads" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="John Doe - Acme Corp">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        John Doe - Acme Corp
                      </div>
                    </SelectItem>
                    <SelectItem value="Sarah Wilson - TechStart">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Sarah Wilson - TechStart
                      </div>
                    </SelectItem>
                    <SelectItem value="Mike Johnson - GrowthCo">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Mike Johnson - GrowthCo
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="text-center text-sm text-gray-500">or</div>

              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input
                  id="phoneNumber"
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                />
              </div>
            </>
          )}
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleApplyTemplate} className="bg-blue-600 hover:bg-blue-700">
            Apply Template
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
