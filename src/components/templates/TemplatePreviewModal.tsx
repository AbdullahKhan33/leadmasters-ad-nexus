
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, MessageSquare, Star, Copy } from "lucide-react";

interface TemplatePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  template: any;
  type: "email" | "whatsapp";
  onUseTemplate: () => void;
}

export function TemplatePreviewModal({ isOpen, onClose, template, type, onUseTemplate }: TemplatePreviewModalProps) {
  if (!template) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(template.content);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {type === "email" ? (
                <Mail className="w-5 h-5 text-blue-600" />
              ) : (
                <MessageSquare className="w-5 h-5 text-green-600" />
              )}
              <span>{template.name}</span>
              <Badge variant="secondary">{template.category}</Badge>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
              <span className="text-sm font-medium">{template.rating}</span>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto">
          {type === "email" ? (
            <div className="bg-white border rounded-lg overflow-hidden">
              <div className="bg-gray-50 px-4 py-3 border-b">
                <div className="space-y-1">
                  <div className="flex text-sm">
                    <span className="font-medium text-gray-600 w-16">From:</span>
                    <span className="text-gray-900">sales@leadmasters.com</span>
                  </div>
                  <div className="flex text-sm">
                    <span className="font-medium text-gray-600 w-16">To:</span>
                    <span className="text-gray-900">[RECIPIENT_EMAIL]</span>
                  </div>
                  <div className="flex text-sm">
                    <span className="font-medium text-gray-600 w-16">Subject:</span>
                    <span className="text-gray-900 font-medium">{template.subject}</span>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="prose prose-sm max-w-none">
                  <pre className="whitespace-pre-wrap font-sans text-gray-800 leading-relaxed">
                    {template.content}
                  </pre>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gradient-to-b from-gray-100 to-gray-200 rounded-lg p-4 min-h-[400px]">
              <div className="bg-white rounded-lg p-4 max-w-xs ml-auto shadow-sm">
                <div className="text-sm text-gray-800 whitespace-pre-wrap leading-relaxed">
                  {template.content}
                </div>
                <div className="text-xs text-gray-500 mt-2 text-right">
                  {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          )}

          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Variables in this template:</strong> Placeholders like [NAME], [COMPANY], etc. will be automatically replaced when you use this template.
            </p>
          </div>
        </div>

        <div className="flex justify-between items-center pt-4 border-t flex-shrink-0">
          <Button variant="outline" onClick={handleCopy} className="flex items-center gap-2">
            <Copy className="w-4 h-4" />
            Copy Content
          </Button>
          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button onClick={onUseTemplate} className="bg-blue-600 hover:bg-blue-700">
              Use This Template
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
