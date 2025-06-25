
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Copy, Edit, Eye, Mail, MessageSquare, Star, Sparkles, Filter, Send, Users, Plus } from "lucide-react";
import { SendNowModal } from "./templates/SendNowModal";
import { MassSendModal } from "./templates/MassSendModal";
import { TemplatePreviewModal } from "./templates/TemplatePreviewModal";
import { TemplateEditorModal } from "./templates/TemplateEditorModal";

const initialEmailTemplates = [
  {
    id: 1,
    name: "Welcome Email",
    subject: "Welcome to LeadMasters!",
    category: "Onboarding",
    content: "Hi [NAME],\n\nWelcome to LeadMasters! We're excited to have you on board. Our platform will help you streamline your lead management and boost your sales.\n\nTo get started:\n1. Complete your profile setup\n2. Connect your social accounts\n3. Import your existing leads\n\nIf you have any questions, our support team is here to help.\n\nBest regards,\nThe LeadMasters Team",
    rating: 4.8,
    color: "bg-blue-50 border-blue-200"
  },
  {
    id: 2,
    name: "Follow-up Email",
    subject: "Following up on our conversation",
    category: "Sales",
    content: "Hi [NAME],\n\nI wanted to follow up on our conversation about [TOPIC]. I believe our solution could be a great fit for [COMPANY].\n\nAs discussed, here are the key benefits:\n• [BENEFIT_1]\n• [BENEFIT_2]\n• [BENEFIT_3]\n\nWould you like to schedule a demo to see how this could work for your team?\n\nBest regards,\n[YOUR_NAME]",
    rating: 4.9,
    color: "bg-green-50 border-green-200"
  },
  {
    id: 3,
    name: "Appointment Reminder",
    subject: "Reminder: Meeting tomorrow at [TIME]",
    category: "Scheduling",
    content: "Hi [NAME],\n\nThis is a friendly reminder about our meeting scheduled for tomorrow, [DATE] at [TIME].\n\nMeeting details:\n• Duration: [DURATION]\n• Location: [LOCATION]\n• Agenda: [AGENDA]\n\nPlease let me know if you need to reschedule.\n\nLooking forward to speaking with you!\n\nBest regards,\n[YOUR_NAME]",
    rating: 4.7,
    color: "bg-purple-50 border-purple-200"
  },
  {
    id: 4,
    name: "Thank You Email",
    subject: "Thank you for your time",
    category: "Follow-up",
    content: "Hi [NAME],\n\nThank you for taking the time to meet with me today. I enjoyed our discussion about [TOPIC] and learning more about [COMPANY]'s goals.\n\nAs promised, I'm attaching [ATTACHMENT] for your review. Please feel free to share this with your team.\n\nNext steps:\n• [NEXT_STEP_1]\n• [NEXT_STEP_2]\n\nI'll follow up with you next week to discuss any questions you might have.\n\nBest regards,\n[YOUR_NAME]",
    rating: 4.6,
    color: "bg-orange-50 border-orange-200"
  }
];

const initialWhatsappTemplates = [
  {
    id: 1,
    name: "Quick Introduction",
    category: "Outreach",
    content: "Hi [NAME]! 👋\n\nI'm [YOUR_NAME] from LeadMasters. We help businesses like [COMPANY] streamline their lead management process.\n\nWould you be interested in a quick 15-minute chat about how we could help you increase your sales efficiency? 📈\n\nBest regards! 🚀",
    rating: 4.8,
    color: "bg-emerald-50 border-emerald-200"
  },
  {
    id: 2,
    name: "Meeting Confirmation",
    category: "Scheduling",
    content: "Hi [NAME]! ✅\n\nJust confirming our meeting:\n📅 Date: [DATE]\n⏰ Time: [TIME]\n📍 Location: [LOCATION]\n\nLooking forward to our conversation!\n\nSee you soon! 👍",
    rating: 4.9,
    color: "bg-teal-50 border-teal-200"
  },
  {
    id: 3,
    name: "Special Offer",
    category: "Promotion",
    content: "🎉 Special offer for [COMPANY]!\n\nHi [NAME], we have an exclusive 30% discount on our premium plan, valid until [DATE].\n\n✨ Features included:\n• Advanced analytics\n• Priority support\n• Custom integrations\n\nInterested? Let's schedule a quick call! 📞\n\nReply 'YES' to learn more! 💪",
    rating: 4.7,
    color: "bg-rose-50 border-rose-200"
  },
  {
    id: 4,
    name: "Check-in Message",
    category: "Follow-up",
    content: "Hi [NAME]! 👋\n\nJust checking in to see how things are going with [PROJECT/TOPIC].\n\nIs there anything I can help you with? Our team is always here to support you! 💪\n\nHave a great day! ☀️",
    rating: 4.5,
    color: "bg-indigo-50 border-indigo-200"
  },
  {
    id: 5,
    name: "Demo Invitation",
    category: "Sales",
    content: "🚀 Ready to see LeadMasters in action?\n\nHi [NAME]! Based on our conversation, I think you'd love to see how our platform can help [COMPANY] boost sales by 40%.\n\n📺 Free 20-minute demo available:\n• See live analytics\n• Explore automation features\n• Q&A session\n\nWhen works best for you? 📅",
    rating: 4.8,
    color: "bg-cyan-50 border-cyan-200"
  }
];

export function Templates() {
  const [activeTab, setActiveTab] = useState("email");
  const [emailTemplates, setEmailTemplates] = useState(initialEmailTemplates);
  const [whatsappTemplates, setWhatsappTemplates] = useState(initialWhatsappTemplates);
  
  const [sendNowModal, setSendNowModal] = useState<{isOpen: boolean, template: any, type: "email" | "whatsapp"}>({
    isOpen: false,
    template: null,
    type: "email"
  });
  const [massSendModal, setMassSendModal] = useState<{isOpen: boolean, template: any, type: "email" | "whatsapp"}>({
    isOpen: false,
    template: null,
    type: "email"
  });
  const [previewModal, setPreviewModal] = useState<{isOpen: boolean, template: any, type: "email" | "whatsapp"}>({
    isOpen: false,
    template: null,
    type: "email"
  });
  const [editorModal, setEditorModal] = useState<{isOpen: boolean, template: any, type: "email" | "whatsapp", mode: "edit" | "create"}>({
    isOpen: false,
    template: null,
    type: "email",
    mode: "edit"
  });

  const handleSendNow = (template: any, type: "email" | "whatsapp") => {
    setSendNowModal({ isOpen: true, template, type });
  };

  const handleMassSend = (template: any, type: "email" | "whatsapp") => {
    setMassSendModal({ isOpen: true, template, type });
  };

  const handlePreviewTemplate = (template: any, type: "email" | "whatsapp") => {
    setPreviewModal({ isOpen: true, template, type });
  };

  const handleEditTemplate = (template: any, type: "email" | "whatsapp") => {
    setEditorModal({ isOpen: true, template, type, mode: "edit" });
  };

  const handleCreateTemplate = (type: "email" | "whatsapp") => {
    setEditorModal({ isOpen: true, template: null, type, mode: "create" });
  };

  const handleSaveTemplate = (template: any) => {
    if (editorModal.type === "email") {
      if (editorModal.mode === "create") {
        setEmailTemplates(prev => [...prev, template]);
      } else {
        setEmailTemplates(prev => prev.map(t => t.id === template.id ? template : t));
      }
    } else {
      if (editorModal.mode === "create") {
        setWhatsappTemplates(prev => [...prev, template]);
      } else {
        setWhatsappTemplates(prev => prev.map(t => t.id === template.id ? template : t));
      }
    }
  };

  const renderTemplateCard = (template: any, type: "email" | "whatsapp") => (
    <Card key={template.id} className={`group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${template.color} border overflow-hidden h-fit max-w-sm mx-auto`}>
      <CardHeader className="pb-2 relative">
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Sparkles className="w-3 h-3 text-yellow-500" />
        </div>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-1.5 mb-1">
              {type === "email" ? (
                <div className="p-1 bg-purple-600 rounded-md">
                  <Mail className="w-2.5 h-2.5 text-white" />
                </div>
              ) : (
                <div className="p-1 bg-green-600 rounded-md">
                  <MessageSquare className="w-2.5 h-2.5 text-white" />
                </div>
              )}
              <CardTitle className="text-base font-bold text-gray-900">
                {template.name}
              </CardTitle>
            </div>
            {type === "email" && (
              <CardDescription className="text-xs text-gray-700 mb-1.5 font-medium">
                📧 {template.subject}
              </CardDescription>
            )}
            <div className="flex items-center gap-1.5 mb-2">
              <Badge variant="secondary" className="text-xs font-semibold px-1.5 py-0.5 bg-white/80 backdrop-blur-sm">
                {template.category}
              </Badge>
              <div className="flex items-center gap-1 bg-yellow-100 rounded-full px-1.5 py-0.5">
                <Star className="w-2.5 h-2.5 fill-yellow-500 text-yellow-500" />
                <span className="text-xs font-bold text-yellow-700">{template.rating}</span>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0 px-4 pb-4">
        <div className="bg-white/70 backdrop-blur-sm rounded-lg p-2.5 mb-3 border border-white/50 shadow-inner">
          <pre className="text-xs text-gray-800 whitespace-pre-wrap font-sans leading-relaxed max-h-16 overflow-hidden">
            {template.content.length > 120 ? `${template.content.substring(0, 120)}...` : template.content}
          </pre>
        </div>
        
        <div className="space-y-1.5">
          {/* Primary Action - Send Now */}
          <Button
            onClick={() => handleSendNow(template, type)}
            className={`w-full font-bold py-1 h-7 flex items-center justify-center gap-1.5 text-xs ${
              type === "email" 
                ? "bg-purple-600 hover:bg-purple-700 text-white" 
                : "bg-green-600 hover:bg-green-700 text-white"
            }`}
          >
            <Send className="w-2.5 h-2.5" />
            Send Now
          </Button>
          
          {/* Secondary Action - Mass Send */}
          <Button
            onClick={() => handleMassSend(template, type)}
            variant="outline"
            className={`w-full font-semibold py-1 h-7 flex items-center justify-center gap-1.5 text-xs ${
              type === "email"
                ? "border-purple-200 text-purple-700 hover:bg-purple-50"
                : "border-green-200 text-green-700 hover:bg-green-50"
            }`}
          >
            <Users className="w-2.5 h-2.5" />
            Mass Send
          </Button>
          
          {/* Ghost Actions - Preview & Edit */}
          <div className="grid grid-cols-2 gap-1.5">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => handlePreviewTemplate(template, type)}
              className="h-6 flex items-center gap-1 hover:bg-white/60 transition-colors border border-gray-200 text-xs px-2"
            >
              <Eye className="w-2.5 h-2.5" />
              Preview
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => handleEditTemplate(template, type)}
              className="h-6 flex items-center gap-1 hover:bg-white/60 transition-colors border border-gray-200 text-xs px-2"
            >
              <Edit className="w-2.5 h-2.5" />
              Edit
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="flex-1 bg-gradient-to-br from-slate-50 via-white to-gray-50/30 min-h-screen">
      <div className="max-w-5xl mx-auto p-4 space-y-6">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-semibold mb-3">
            <Sparkles className="w-3 h-3" />
            Premium Templates
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">
            Communication Templates
          </h1>
          <p className="text-sm text-gray-600 max-w-2xl mx-auto">
            Professional, ready-to-use templates for emails and WhatsApp to accelerate your communication workflow and boost engagement.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex items-center justify-center mb-6">
            <TabsList className="grid w-full max-w-md grid-cols-2 h-10 bg-white shadow-lg border">
              <TabsTrigger 
                value="email" 
                className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white font-semibold text-xs"
              >
                <Mail className="w-3 h-3" />
                Email Templates
                <Badge variant="secondary" className="ml-1 bg-blue-100 text-blue-700 text-xs">
                  {emailTemplates.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger 
                value="whatsapp" 
                className="flex items-center gap-2 data-[state=active]:bg-green-600 data-[state=active]:text-white font-semibold text-xs"
              >
                <MessageSquare className="w-3 h-3" />
                WhatsApp Templates
                <Badge variant="secondary" className="ml-1 bg-green-100 text-green-700 text-xs">
                  {whatsappTemplates.length}
                </Badge>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="email" className="space-y-6">
            <div className="flex items-center justify-between bg-white rounded-lg p-4 shadow-sm border">
              <div>
                <h2 className="text-lg font-bold text-gray-900 mb-0.5">Email Templates</h2>
                <p className="text-xs text-gray-600">Professional email templates for every occasion</p>
              </div>
              <div className="flex items-center gap-2">
                <Button 
                  onClick={() => handleCreateTemplate("email")}
                  className="bg-purple-600 hover:bg-purple-700 text-white flex items-center gap-2 h-8 text-xs"
                >
                  <Plus className="w-3 h-3" />
                  New Email Template
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-2 h-8 text-xs">
                  <Filter className="w-3 h-3" />
                  Filter
                </Button>
                <Badge variant="outline" className="text-xs px-3 py-1 font-bold">
                  {emailTemplates.length} templates
                </Badge>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {emailTemplates.map((template) => renderTemplateCard(template, "email"))}
            </div>
          </TabsContent>

          <TabsContent value="whatsapp" className="space-y-6">
            <div className="flex items-center justify-between bg-white rounded-lg p-4 shadow-sm border">
              <div>
                <h2 className="text-lg font-bold text-gray-900 mb-0.5">WhatsApp Templates</h2>
                <p className="text-xs text-gray-600">Engaging WhatsApp messages that get responses</p>
              </div>
              <div className="flex items-center gap-2">
                <Button 
                  onClick={() => handleCreateTemplate("whatsapp")}
                  className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2 h-8 text-xs"
                >
                  <Plus className="w-3 h-3" />
                  New WhatsApp Template
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-2 h-8 text-xs">
                  <Filter className="w-3 h-3" />
                  Filter
                </Button>
                <Badge variant="outline" className="text-xs px-3 py-1 font-bold">
                  {whatsappTemplates.length} templates
                </Badge>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {whatsappTemplates.map((template) => renderTemplateCard(template, "whatsapp"))}
            </div>
          </TabsContent>
        </Tabs>

        {/* All Modals */}
        <SendNowModal
          isOpen={sendNowModal.isOpen}
          onClose={() => setSendNowModal({ isOpen: false, template: null, type: "email" })}
          template={sendNowModal.template}
          type={sendNowModal.type}
        />

        <MassSendModal
          isOpen={massSendModal.isOpen}
          onClose={() => setMassSendModal({ isOpen: false, template: null, type: "email" })}
          template={massSendModal.template}
          type={massSendModal.type}
        />

        <TemplatePreviewModal
          isOpen={previewModal.isOpen}
          onClose={() => setPreviewModal({ isOpen: false, template: null, type: "email" })}
          template={previewModal.template}
          type={previewModal.type}
          onUseTemplate={() => {
            setPreviewModal({ isOpen: false, template: null, type: "email" });
            setSendNowModal({ isOpen: true, template: previewModal.template, type: previewModal.type });
          }}
        />

        <TemplateEditorModal
          isOpen={editorModal.isOpen}
          onClose={() => setEditorModal({ isOpen: false, template: null, type: "email", mode: "edit" })}
          template={editorModal.template}
          type={editorModal.type}
          mode={editorModal.mode}
          onSave={handleSaveTemplate}
        />
      </div>
    </div>
  );
}
