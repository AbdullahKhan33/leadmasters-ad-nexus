
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  MessageSquare, 
  Send, 
  Phone,
  Clock,
  Lock
} from "lucide-react";
import { usePremium } from "@/contexts/PremiumContext";
import { UpsellPrompt } from "@/components/premium/UpsellPrompt";

interface CRMInboxUpsellProps {
  onUpgradeClick: (feature: string) => void;
}

export function CRMInboxUpsell({ onUpgradeClick }: CRMInboxUpsellProps) {
  const { isPremium, premiumFeatures } = usePremium();
  const canUseSmartReplies = isPremium && premiumFeatures.smartWhatsAppDrips;

  const mockConversation = [
    {
      id: "1",
      sender: "Ahmed Hassan",
      message: "Hi, I'm interested in your premium social media package. Can you send me more details?",
      timestamp: "2 mins ago",
      isFromLead: true
    },
    {
      id: "2",
      sender: "You",
      message: "Hi Ahmed! Thanks for your interest. I'd be happy to share details about our premium package.",
      timestamp: "1 min ago",
      isFromLead: false
    }
  ];

  return (
    <div className="h-full bg-gradient-to-br from-gray-50/50 via-blue-50/20 to-purple-50/20 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">WhatsApp Inbox</h2>
          <p className="text-gray-600">Manage your WhatsApp conversations</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
          {/* Conversations List */}
          <Card className="lg:col-span-1">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Active Conversations</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-2 px-4 pb-4">
                <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-gradient-to-r from-blue-100 to-purple-100 text-purple-700 text-xs">
                        AH
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">Ahmed Hassan</p>
                      <p className="text-xs text-gray-500 truncate">Interested in premium package...</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800 text-xs">Active</Badge>
                  </div>
                </div>
                
                <div className="p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-gradient-to-r from-blue-100 to-purple-100 text-purple-700 text-xs">
                        FA
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">Fatima Al Zahra</p>
                      <p className="text-xs text-gray-500 truncate">Thank you for the proposal</p>
                    </div>
                    <Clock className="w-3 h-3 text-gray-400" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Chat Window */}
          <Card className="lg:col-span-2 flex flex-col">
            <CardHeader className="pb-3 border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-gradient-to-r from-blue-100 to-purple-100 text-purple-700 text-xs">
                      AH
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">Ahmed Hassan</CardTitle>
                    <p className="text-sm text-gray-500">+971 50 123 4567</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Phone className="w-4 h-4 mr-2" />
                  Call
                </Button>
              </div>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col p-4">
              {/* Messages */}
              <div className="flex-1 space-y-4 mb-4 overflow-y-auto">
                {mockConversation.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.isFromLead ? 'justify-start' : 'justify-end'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        msg.isFromLead
                          ? 'bg-gray-100 text-gray-900'
                          : 'bg-gradient-to-r from-purple-600 to-pink-500 text-white'
                      }`}
                    >
                      <p className="text-sm">{msg.message}</p>
                      <p
                        className={`text-xs mt-1 ${
                          msg.isFromLead ? 'text-gray-500' : 'text-purple-100'
                        }`}
                      >
                        {msg.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* AI Quick Replies Upsell */}
              {!canUseSmartReplies && (
                <div className="mb-3">
                  <UpsellPrompt
                    message="Smart WhatsApp Suggestions are a Premium feature."
                    onUpgrade={() => onUpgradeClick("Smart WhatsApp Suggestions")}
                    variant="inline"
                    className="text-center py-2 bg-gray-50 rounded-lg border border-gray-200"
                  />
                </div>
              )}

              {/* Message Input */}
              <div className="flex space-x-2">
                <Input
                  placeholder="Type your message..."
                  className="flex-1"
                />
                <Button size="sm" className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600">
                  <Send className="w-4 h-4" />
                </Button>
              </div>

              {/* Smart Replies (Premium Feature) */}
              {canUseSmartReplies && (
                <div className="mt-3 space-y-2">
                  <p className="text-xs text-gray-600">AI Suggested Replies:</p>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm" className="text-xs">
                      "I'll send you the detailed pricing shortly"
                    </Button>
                    <Button variant="outline" size="sm" className="text-xs">
                      "Would you like to schedule a call?"
                    </Button>
                    <Button variant="outline" size="sm" className="text-xs">
                      "Here are some success stories from similar clients"
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
