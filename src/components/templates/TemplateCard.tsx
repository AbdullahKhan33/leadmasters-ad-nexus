import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, MessageSquare, Edit, Copy, Trash2 } from "lucide-react";
import { CampaignTemplate } from "@/types/campaigns";

interface TemplateCardProps {
  template: CampaignTemplate;
  onEdit: (template: CampaignTemplate) => void;
  onDelete: (templateId: string) => void;
  onDuplicate: (template: CampaignTemplate) => void;
}

export function TemplateCard({ template, onEdit, onDelete, onDuplicate }: TemplateCardProps) {
  const [showActions, setShowActions] = useState(false);
  const isEmail = template.type === 'email';

  return (
    <Card 
      className="group relative overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border-0 shadow-lg backdrop-blur-sm bg-white/90"
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Action buttons overlay */}
      {showActions && (
        <div className="absolute top-2 right-2 z-20 flex gap-1">
          <Button
            size="sm"
            variant="secondary"
            className="h-8 w-8 p-0 bg-white/90 hover:bg-white shadow-lg"
            onClick={() => onEdit(template)}
          >
            <Edit className="w-3.5 h-3.5" />
          </Button>
          <Button
            size="sm"
            variant="secondary"
            className="h-8 w-8 p-0 bg-white/90 hover:bg-white shadow-lg"
            onClick={() => onDuplicate(template)}
          >
            <Copy className="w-3.5 h-3.5" />
          </Button>
          <Button
            size="sm"
            variant="secondary"
            className="h-8 w-8 p-0 bg-white/90 hover:bg-red-50 text-red-600 shadow-lg"
            onClick={() => onDelete(template.id)}
          >
            <Trash2 className="w-3.5 h-3.5" />
          </Button>
        </div>
      )}
      
      <CardHeader className="pb-3 relative z-10">
        <div className="flex items-start justify-between">
          <div className="flex-1 pr-2">
            <div className="flex items-center gap-2 mb-2">
              <div className={`p-2 rounded-xl shadow-lg ${
                isEmail 
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600' 
                  : 'bg-gradient-to-r from-green-600 to-emerald-600'
              }`}>
                {isEmail ? (
                  <Mail className="w-4 h-4 text-white" />
                ) : (
                  <MessageSquare className="w-4 h-4 text-white" />
                )}
              </div>
              <CardTitle className="text-base font-bold text-gray-900">
                {template.name}
              </CardTitle>
            </div>
            {template.subject && (
              <CardDescription className="text-sm text-gray-700 mb-2 font-medium">
                {template.subject}
              </CardDescription>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0 px-4 pb-4 relative z-10">
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 border border-white/60 shadow-inner">
          <pre className="text-sm text-gray-800 whitespace-pre-wrap font-sans leading-relaxed max-h-20 overflow-hidden">
            {template.content.length > 120 ? `${template.content.substring(0, 120)}...` : template.content}
          </pre>
        </div>
      </CardContent>
    </Card>
  );
}
