
import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/sonner";
import { Mail, MessageSquare, User, Send } from "lucide-react";

interface SendNowModalProps {
  isOpen: boolean;
  onClose: () => void;
  template: any;
  type: "email" | "whatsapp";
}

export function SendNowModal({ isOpen, onClose, template, type }: SendNowModalProps) {
  const [recipient, setRecipient] = useState("");
  const [customRecipient, setCustomRecipient] = useState("");
  const [editableContent, setEditableContent] = useState(template?.content || "");

  const recentLeads = [
    "John Doe - Acme Corp (john@acme.com)",
    "Sarah Wilson - TechStart (sarah@techstart.com)",
    "Mike Johnson - GrowthCo (mike@growthco.com)",
    "Lisa Chen - InnovateLab (lisa@innovatelab.com)"
  ];

  const handleSendNow = () => {
    const targetRecipient = recipient === "custom" ? customRecipient : recipient;
    
    if (!targetRecipient) {
      toast.error("Please select or enter a recipient");
      return;
    }

    if (!editableContent.trim()) {
      toast.error("Message content cannot be empty");
      return;
    }

    // Simulate sending
    toast.success(`${type === "email" ? "Email" : "WhatsApp message"} sent successfully to ${targetRecipient.split(" - ")[0] || targetRecipient}!`);
    onClose();
  };

  if (!template) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {type === "email" ? (
              <Mail className="w-5 h-5 text-purple-600" />
            ) : (
              <MessageSquare className="w-5 h-5 text-green-600" />
            )}
            Send Now: {template.name}
          </DialogTitle>
          <DialogDescription>
            Send this template to a single recipient
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Recipient Selection */}
          <div className="space-y-3">
            <Label>Select Recipient</Label>
            <Select value={recipient} onValueChange={setRecipient}>
              <SelectTrigger>
                <SelectValue placeholder="Choose from recent leads or enter custom" />
              </SelectTrigger>
              <SelectContent>
                {recentLeads.map((lead, index) => (
                  <SelectItem key={index} value={lead}>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      {lead}
                    </div>
                  </SelectItem>
                ))}
                <SelectItem value="custom">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Enter custom recipient
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>

            {recipient === "custom" && (
              <div className="space-y-2">
                <Label htmlFor="customRecipient">
                  {type === "email" ? "Email Address" : "Phone Number"}
                </Label>
                <Input
                  id="customRecipient"
                  type={type === "email" ? "email" : "tel"}
                  placeholder={type === "email" ? "recipient@company.com" : "+1 (555) 123-4567"}
                  value={customRecipient}
                  onChange={(e) => setCustomRecipient(e.target.value)}
                />
              </div>
            )}
          </div>

          {/* Editable Template Preview */}
          <div className="space-y-3">
            <Label>Message Content (Editable)</Label>
            <div className="border rounded-lg p-4 bg-gray-50">
              {type === "email" && template.subject && (
                <div className="mb-4 pb-4 border-b">
                  <Label className="text-sm font-medium text-gray-600">Subject:</Label>
                  <p className="font-medium text-gray-900">{template.subject}</p>
                </div>
              )}
              <textarea
                className="w-full h-40 p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={editableContent}
                onChange={(e) => setEditableContent(e.target.value)}
                placeholder="Edit your message content here..."
              />
            </div>
            <p className="text-xs text-gray-500">
              Variables like [NAME], [COMPANY] will be automatically replaced
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleSendNow}
            className={type === "email" ? 
              "bg-purple-600 hover:bg-purple-700 text-white" : 
              "bg-green-600 hover:bg-green-700 text-white"
            }
          >
            <Send className="w-4 h-4 mr-2" />
            Send Now
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
