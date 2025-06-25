
import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/sonner";
import { Mail, MessageSquare, Save, FileText } from "lucide-react";

interface TemplateEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  template: any;
  type: "email" | "whatsapp";
  mode: "edit" | "create";
  onSave: (template: any) => void;
}

export function TemplateEditorModal({ isOpen, onClose, template, type, mode, onSave }: TemplateEditorModalProps) {
  const [editedTemplate, setEditedTemplate] = useState({
    name: template?.name || "",
    subject: template?.subject || "",
    content: template?.content || "",
    category: template?.category || ""
  });

  // Reset form when template changes or modal opens
  React.useEffect(() => {
    if (isOpen) {
      setEditedTemplate({
        name: template?.name || "",
        subject: template?.subject || "",
        content: template?.content || "",
        category: template?.category || ""
      });
    }
  }, [template, isOpen]);

  const categories = [
    "Onboarding",
    "Sales",
    "Follow-up", 
    "Scheduling",
    "Promotion",
    "Outreach",
    "Support"
  ];

  const handleSave = () => {
    if (!editedTemplate.name.trim()) {
      toast.error("Template name is required");
      return;
    }

    if (!editedTemplate.content.trim()) {
      toast.error("Template content is required");
      return;
    }

    if (type === "email" && !editedTemplate.subject.trim()) {
      toast.error("Email subject is required");
      return;
    }

    // Create the template object with proper structure
    const templateToSave = {
      id: template?.id || Date.now(),
      name: editedTemplate.name,
      subject: editedTemplate.subject,
      content: editedTemplate.content,
      category: editedTemplate.category,
      rating: template?.rating || 5.0,
      color: template?.color || (type === "email" ? "bg-blue-50 border-blue-200" : "bg-green-50 border-green-200")
    };

    onSave(templateToSave);
    toast.success(`Template ${mode === "create" ? "created" : "saved"} successfully!`);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {type === "email" ? (
              <Mail className="w-5 h-5 text-purple-600" />
            ) : (
              <MessageSquare className="w-5 h-5 text-green-600" />
            )}
            {mode === "create" ? "Create New Template" : "Edit Template"}
          </DialogTitle>
          <DialogDescription>
            {mode === "create" ? "Create a new" : "Customize your"} {type === "email" ? "email" : "WhatsApp"} template
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Template Name */}
          <div className="space-y-2">
            <Label htmlFor="templateName">Template Name</Label>
            <Input
              id="templateName"
              value={editedTemplate.name}
              onChange={(e) => setEditedTemplate(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Enter template name"
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label>Category</Label>
            <Select 
              value={editedTemplate.category} 
              onValueChange={(value) => setEditedTemplate(prev => ({ ...prev, category: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Email Subject (only for email templates) */}
          {type === "email" && (
            <div className="space-y-2">
              <Label htmlFor="subject">Email Subject</Label>
              <Input
                id="subject"
                value={editedTemplate.subject}
                onChange={(e) => setEditedTemplate(prev => ({ ...prev, subject: e.target.value }))}
                placeholder="Enter email subject"
              />
            </div>
          )}

          {/* Template Content */}
          <div className="space-y-2">
            <Label htmlFor="content">Template Content</Label>
            <textarea
              id="content"
              className="w-full h-80 p-4 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={editedTemplate.content}
              onChange={(e) => setEditedTemplate(prev => ({ ...prev, content: e.target.value }))}
              placeholder="Enter your template content here..."
            />
            <div className="flex flex-wrap gap-2 pt-2">
              <Badge variant="outline" className="text-xs">Available variables:</Badge>
              <Badge variant="secondary" className="text-xs">[NAME]</Badge>
              <Badge variant="secondary" className="text-xs">[COMPANY]</Badge>
              <Badge variant="secondary" className="text-xs">[EMAIL]</Badge>
              <Badge variant="secondary" className="text-xs">[PHONE]</Badge>
              <Badge variant="secondary" className="text-xs">[DATE]</Badge>
              <Badge variant="secondary" className="text-xs">[TIME]</Badge>
            </div>
          </div>

          {/* Preview */}
          <div className="space-y-2">
            <Label>Preview</Label>
            <div className="border rounded-lg p-4 bg-gray-50 min-h-32">
              {type === "email" ? (
                <div>
                  {editedTemplate.subject && (
                    <div className="mb-3 pb-3 border-b">
                      <span className="text-sm font-medium text-gray-600">Subject: </span>
                      <span className="font-medium">{editedTemplate.subject}</span>
                    </div>
                  )}
                  <pre className="whitespace-pre-wrap text-sm font-sans">
                    {editedTemplate.content || "Template content will appear here..."}
                  </pre>
                </div>
              ) : (
                <div className="bg-white rounded-lg p-3 shadow-sm max-w-xs">
                  <div className="text-sm whitespace-pre-wrap">
                    {editedTemplate.content || "Template content will appear here..."}
                  </div>
                  <div className="text-xs text-gray-500 mt-2 text-right">
                    {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 text-white">
            <Save className="w-4 h-4 mr-2" />
            {mode === "create" ? "Create Template" : "Save Template"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
