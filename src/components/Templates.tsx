
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Copy, Edit, Eye, Mail, MessageSquare, Star, Sparkles, Filter } from "lucide-react";

const emailTemplates = [
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

const whatsappTemplates = [
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

  const handleCopyTemplate = (content: string) => {
    navigator.clipboard.writeText(content);
    // You could add a toast notification here
  };

  const renderTemplateCard = (template: any, type: "email" | "whatsapp") => (
    <Card key={template.id} className={`group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${template.color} border-2 overflow-hidden`}>
      <CardHeader className="pb-4 relative">
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Sparkles className="w-5 h-5 text-yellow-500" />
        </div>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              {type === "email" ? (
                <div className="p-2 bg-blue-600 rounded-lg">
                  <Mail className="w-4 h-4 text-white" />
                </div>
              ) : (
                <div className="p-2 bg-green-600 rounded-lg">
                  <MessageSquare className="w-4 h-4 text-white" />
                </div>
              )}
              <CardTitle className="text-xl font-bold text-gray-900">
                {template.name}
              </CardTitle>
            </div>
            {type === "email" && (
              <CardDescription className="text-sm text-gray-700 mb-3 font-medium">
                📧 {template.subject}
              </CardDescription>
            )}
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="text-xs font-semibold px-3 py-1 bg-white/80 backdrop-blur-sm">
                {template.category}
              </Badge>
              <div className="flex items-center gap-1 bg-yellow-100 rounded-full px-2 py-1">
                <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                <span className="text-xs font-bold text-yellow-700">{template.rating}</span>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 mb-5 border border-white/50 shadow-inner">
          <pre className="text-sm text-gray-800 whitespace-pre-wrap font-sans leading-relaxed max-h-32 overflow-y-auto">
            {template.content}
          </pre>
        </div>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleCopyTemplate(template.content)}
            className="flex items-center gap-2 hover:bg-blue-50 hover:border-blue-300 transition-colors"
          >
            <Copy className="w-4 h-4" />
            Copy
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="flex items-center gap-2 hover:bg-green-50 hover:border-green-300 transition-colors"
          >
            <Edit className="w-4 h-4" />
            Edit
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="flex items-center gap-2 hover:bg-purple-50 hover:border-purple-300 transition-colors"
          >
            <Eye className="w-4 h-4" />
            Preview
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="p-8 max-w-7xl mx-auto bg-gradient-to-br from-gray-50 to-white min-h-screen">
      <div className="mb-10 text-center">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
          <Sparkles className="w-4 h-4" />
          Premium Templates
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">
          Communication Templates
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Professional, ready-to-use templates for emails and WhatsApp to accelerate your communication workflow and boost engagement.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex items-center justify-center mb-8">
          <TabsList className="grid w-full max-w-md grid-cols-2 h-12 bg-white shadow-lg border-2">
            <TabsTrigger 
              value="email" 
              className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white font-semibold"
            >
              <Mail className="w-4 h-4" />
              Email Templates
              <Badge variant="secondary" className="ml-1 bg-blue-100 text-blue-700">
                {emailTemplates.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger 
              value="whatsapp" 
              className="flex items-center gap-2 data-[state=active]:bg-green-600 data-[state=active]:text-white font-semibold"
            >
              <MessageSquare className="w-4 h-4" />
              WhatsApp Templates
              <Badge variant="secondary" className="ml-1 bg-green-100 text-green-700">
                {whatsappTemplates.length}
              </Badge>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="email" className="space-y-8">
          <div className="flex items-center justify-between bg-white rounded-xl p-6 shadow-sm border">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">Email Templates</h2>
              <p className="text-gray-600">Professional email templates for every occasion</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filter
              </Button>
              <Badge variant="outline" className="text-lg px-4 py-2 font-bold">
                {emailTemplates.length} templates
              </Badge>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {emailTemplates.map((template) => renderTemplateCard(template, "email"))}
          </div>
        </TabsContent>

        <TabsContent value="whatsapp" className="space-y-8">
          <div className="flex items-center justify-between bg-white rounded-xl p-6 shadow-sm border">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">WhatsApp Templates</h2>
              <p className="text-gray-600">Engaging WhatsApp messages that get responses</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filter
              </Button>
              <Badge variant="outline" className="text-lg px-4 py-2 font-bold">
                {whatsappTemplates.length} templates
              </Badge>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {whatsappTemplates.map((template) => renderTemplateCard(template, "whatsapp"))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
