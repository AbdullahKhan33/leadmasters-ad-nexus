
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
      <DialogContent className="sm:max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
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

        <div className="grid grid-cols-2 gap-6 flex-1 overflow-hidden">
          {/* Left Column - Form Fields */}
          <div className="space-y-4 overflow-y-auto pr-2">
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
            <div className="space-y-2 flex-1 flex flex-col">
              <Label htmlFor="content">Template Content</Label>
              <textarea
                id="content"
                className="flex-1 min-h-[300px] p-4 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={editedTemplate.content}
                onChange={(e) => setEditedTemplate(prev => ({ ...prev, content: e.target.value }))}
                placeholder="Enter your template content here..."
              />
              <div className="flex flex-wrap gap-2 pt-2">
                <Badge variant="outline" className="text-xs">Available variables:</Badge>
                <Badge variant="secondary" className="text-xs">{`{{name}}`}</Badge>
                <Badge variant="secondary" className="text-xs">{`{{company}}`}</Badge>
                <Badge variant="secondary" className="text-xs">{`{{email}}`}</Badge>
                <Badge variant="secondary" className="text-xs">{`{{phone}}`}</Badge>
                <Badge variant="secondary" className="text-xs">{`{{date}}`}</Badge>
                <Badge variant="secondary" className="text-xs">{`{{time}}`}</Badge>
              </div>
            </div>
          </div>

          {/* Right Column - Live Preview */}
          <div className="space-y-2 border-l pl-6 overflow-y-auto">
            <Label className="flex items-center gap-2">
              <span>Live Preview</span>
              <Badge variant="secondary" className="text-xs">Updates in real-time</Badge>
            </Label>
            <div className="border rounded-lg p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-[500px] sticky top-0">
              {type === "email" ? (
                <div className="bg-white rounded-lg shadow-lg p-6">
                  {editedTemplate.subject && (
                    <div className="mb-4 pb-4 border-b">
                      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Subject</span>
                      <p className="font-semibold text-lg mt-1">{editedTemplate.subject}</p>
                    </div>
                  )}
                  <div className="prose prose-sm max-w-none">
                    <pre className="whitespace-pre-wrap text-sm font-sans text-gray-800 leading-relaxed">
                      {editedTemplate.content || "Template content will appear here as you type..."}
                    </pre>
                  </div>
                </div>
              ) : (
                <div className="flex justify-center items-start pt-8">
                  <div className="bg-white rounded-2xl p-4 shadow-xl max-w-sm w-full">
                    <div className="flex items-center gap-2 mb-3 pb-3 border-b">
                      <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                        <MessageSquare className="w-4 h-4 text-white" />
                      </div>
                      <span className="font-semibold text-sm">WhatsApp Message</span>
                    </div>
                    <div className="bg-green-50 rounded-lg p-3 border border-green-100">
                      <div className="text-sm whitespace-pre-wrap text-gray-900">
                        {editedTemplate.content || "Template content will appear here as you type..."}
                      </div>
                      <div className="flex items-center justify-end gap-1 mt-2">
                        <span className="text-xs text-gray-500">
                          {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        <svg className="w-4 h-4 text-blue-500" viewBox="0 0 16 16" fill="currentColor">
                          <path d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.88a.32.32 0 0 1-.484.032l-.358-.325a.32.32 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.54l1.32 1.267a.32.32 0 0 0 .484-.034l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.88a.32.32 0 0 1-.484.032L1.892 7.77a.366.366 0 0 0-.516.005l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t mt-4">
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
