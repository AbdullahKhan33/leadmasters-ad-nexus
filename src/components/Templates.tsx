
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Copy, Edit, Eye, Mail, MessageSquare, Star } from "lucide-react";

const emailTemplates = [
  {
    id: 1,
    name: "Welcome Email",
    subject: "Welcome to LeadMasters!",
    category: "Onboarding",
    content: "Hi [NAME],\n\nWelcome to LeadMasters! We're excited to have you on board. Our platform will help you streamline your lead management and boost your sales.\n\nTo get started:\n1. Complete your profile setup\n2. Connect your social accounts\n3. Import your existing leads\n\nIf you have any questions, our support team is here to help.\n\nBest regards,\nThe LeadMasters Team",
    rating: 4.8
  },
  {
    id: 2,
    name: "Follow-up Email",
    subject: "Following up on our conversation",
    category: "Sales",
    content: "Hi [NAME],\n\nI wanted to follow up on our conversation about [TOPIC]. I believe our solution could be a great fit for [COMPANY].\n\nAs discussed, here are the key benefits:\n• [BENEFIT_1]\n• [BENEFIT_2]\n• [BENEFIT_3]\n\nWould you like to schedule a demo to see how this could work for your team?\n\nBest regards,\n[YOUR_NAME]",
    rating: 4.9
  },
  {
    id: 3,
    name: "Appointment Reminder",
    subject: "Reminder: Meeting tomorrow at [TIME]",
    category: "Scheduling",
    content: "Hi [NAME],\n\nThis is a friendly reminder about our meeting scheduled for tomorrow, [DATE] at [TIME].\n\nMeeting details:\n• Duration: [DURATION]\n• Location: [LOCATION]\n• Agenda: [AGENDA]\n\nPlease let me know if you need to reschedule.\n\nLooking forward to speaking with you!\n\nBest regards,\n[YOUR_NAME]",
    rating: 4.7
  },
  {
    id: 4,
    name: "Thank You Email",
    subject: "Thank you for your time",
    category: "Follow-up",
    content: "Hi [NAME],\n\nThank you for taking the time to meet with me today. I enjoyed our discussion about [TOPIC] and learning more about [COMPANY]'s goals.\n\nAs promised, I'm attaching [ATTACHMENT] for your review. Please feel free to share this with your team.\n\nNext steps:\n• [NEXT_STEP_1]\n• [NEXT_STEP_2]\n\nI'll follow up with you next week to discuss any questions you might have.\n\nBest regards,\n[YOUR_NAME]",
    rating: 4.6
  }
];

const whatsappTemplates = [
  {
    id: 1,
    name: "Quick Introduction",
    category: "Outreach",
    content: "Hi [NAME]! 👋\n\nI'm [YOUR_NAME] from LeadMasters. We help businesses like [COMPANY] streamline their lead management process.\n\nWould you be interested in a quick 15-minute chat about how we could help you increase your sales efficiency? 📈\n\nBest regards! 🚀",
    rating: 4.8
  },
  {
    id: 2,
    name: "Meeting Confirmation",
    category: "Scheduling",
    content: "Hi [NAME]! ✅\n\nJust confirming our meeting:\n📅 Date: [DATE]\n⏰ Time: [TIME]\n📍 Location: [LOCATION]\n\nLooking forward to our conversation!\n\nSee you soon! 👍",
    rating: 4.9
  },
  {
    id: 3,
    name: "Special Offer",
    category: "Promotion",
    content: "🎉 Special offer for [COMPANY]!\n\nHi [NAME], we have an exclusive 30% discount on our premium plan, valid until [DATE].\n\n✨ Features included:\n• Advanced analytics\n• Priority support\n• Custom integrations\n\nInterested? Let's schedule a quick call! 📞\n\nReply 'YES' to learn more! 💪",
    rating: 4.7
  },
  {
    id: 4,
    name: "Check-in Message",
    category: "Follow-up",
    content: "Hi [NAME]! 👋\n\nJust checking in to see how things are going with [PROJECT/TOPIC].\n\nIs there anything I can help you with? Our team is always here to support you! 💪\n\nHave a great day! ☀️",
    rating: 4.5
  },
  {
    id: 5,
    name: "Demo Invitation",
    category: "Sales",
    content: "🚀 Ready to see LeadMasters in action?\n\nHi [NAME]! Based on our conversation, I think you'd love to see how our platform can help [COMPANY] boost sales by 40%.\n\n📺 Free 20-minute demo available:\n• See live analytics\n• Explore automation features\n• Q&A session\n\nWhen works best for you? 📅",
    rating: 4.8
  }
];

export function Templates() {
  const [activeTab, setActiveTab] = useState("email");

  const handleCopyTemplate = (content: string) => {
    navigator.clipboard.writeText(content);
    // You could add a toast notification here
  };

  const renderTemplateCard = (template: any, type: "email" | "whatsapp") => (
    <Card key={template.id} className="hover:shadow-md transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold text-gray-900 mb-1">
              {template.name}
            </CardTitle>
            {type === "email" && (
              <CardDescription className="text-sm text-gray-600 mb-2">
                Subject: {template.subject}
              </CardDescription>
            )}
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-xs">
                {template.category}
              </Badge>
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs text-gray-600">{template.rating}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1 ml-2">
            {type === "email" ? (
              <Mail className="w-5 h-5 text-blue-600" />
            ) : (
              <MessageSquare className="w-5 h-5 text-green-600" />
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="bg-gray-50 rounded-lg p-3 mb-4">
          <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans leading-relaxed">
            {template.content}
          </pre>
        </div>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleCopyTemplate(template.content)}
            className="flex items-center gap-1"
          >
            <Copy className="w-3 h-3" />
            Copy
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="flex items-center gap-1"
          >
            <Edit className="w-3 h-3" />
            Edit
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="flex items-center gap-1"
          >
            <Eye className="w-3 h-3" />
            Preview
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Communication Templates</h1>
        <p className="text-gray-600">
          Ready-made templates for emails and WhatsApp to streamline your communication workflow.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="email" className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            Email Templates
          </TabsTrigger>
          <TabsTrigger value="whatsapp" className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            WhatsApp Templates
          </TabsTrigger>
        </TabsList>

        <TabsContent value="email" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Email Templates</h2>
            <Badge variant="outline">{emailTemplates.length} templates</Badge>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {emailTemplates.map((template) => renderTemplateCard(template, "email"))}
          </div>
        </TabsContent>

        <TabsContent value="whatsapp" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">WhatsApp Templates</h2>
            <Badge variant="outline">{whatsappTemplates.length} templates</Badge>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {whatsappTemplates.map((template) => renderTemplateCard(template, "whatsapp"))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
