
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  User, 
  ExternalLink,
  HelpCircle,
  Sparkles 
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  links?: { text: string; url: string; }[];
}

const FAQ_DATA = [
  {
    keywords: ['whatsapp', 'connect', 'social', 'messaging'],
    question: "How do I connect my WhatsApp?",
    answer: "Go to Settings → Social Logins → WhatsApp, and follow the on-screen steps.",
    links: [{ text: "Open Social Logins", url: "/?view=social-logins" }]
  },
  {
    keywords: ['post', 'create', 'builder', 'content'],
    question: "How do I create my first post?",
    answer: "Head to the Post Builder, click \"Create New Post,\" and follow the prompts.",
    links: [{ text: "Open Post Builder", url: "/post-builder" }]
  },
  {
    keywords: ['ads', 'advertising', 'business', 'verified'],
    question: "Can I run ads without a verified business?",
    answer: "We recommend verifying your business first. You can explore our Services section for help.",
    links: [{ text: "View Services", url: "/?view=services" }]
  },
  {
    keywords: ['premium', 'upgrade', 'subscription', 'plan'],
    question: "How do I upgrade to Premium?",
    answer: "Go to Settings → Subscription to view and purchase a Premium plan.",
    links: [{ text: "View Plans", url: "/?view=user-settings" }]
  },
  {
    keywords: ['support', 'help', 'contact', 'team'],
    question: "How do I get support?",
    answer: "You can chat with our team here or email support@leadmasters.ai.",
    links: [{ text: "Email Support", url: "mailto:support@leadmasters.ai" }]
  },
  {
    keywords: ['crm', 'leads', 'manage', 'customers'],
    question: "How do I manage my leads?",
    answer: "Use the CRM section to view, organize, and track all your leads in one place.",
    links: [{ text: "Open CRM", url: "/?view=crm" }]
  },
  {
    keywords: ['automations', 'workflow', 'automatic'],
    question: "How do I set up automations?",
    answer: "Visit the CRM Automations section to create automated workflows for your leads.",
    links: [{ text: "Open Automations", url: "/?view=crm-automations" }]
  }
];

export function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Show tooltip on first visit
    const hasSeenTooltip = localStorage.getItem('chatbot-tooltip-seen');
    if (!hasSeenTooltip) {
      setTimeout(() => {
        setShowTooltip(true);
        setTimeout(() => {
          setShowTooltip(false);
          localStorage.setItem('chatbot-tooltip-seen', 'true');
        }, 3000);
      }, 2000);
    }

    // Add welcome message when first opened
    if (isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        id: 'welcome',
        type: 'bot',
        content: "✨ Welcome to LeadMasters AI Premium Support! I'm here to help you maximize your platform experience. What can I assist you with today?",
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, messages.length]);

  const findFAQAnswer = (query: string): typeof FAQ_DATA[0] | null => {
    const lowerQuery = query.toLowerCase();
    return FAQ_DATA.find(faq => 
      faq.keywords.some(keyword => lowerQuery.includes(keyword))
    ) || null;
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Find FAQ answer
    const faqMatch = findFAQAnswer(inputValue);
    
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: faqMatch 
          ? faqMatch.answer 
          : "I couldn't find a specific answer to your question. For personalized premium support, please contact our expert team at support@leadmasters.ai or use the escalation option below.",
        timestamp: new Date(),
        links: faqMatch?.links || [{ text: "Contact Premium Support", url: "mailto:support@leadmasters.ai" }]
      };
      setMessages(prev => [...prev, botMessage]);
    }, 800);

    setInputValue("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const quickActions = [
    { label: "Connect WhatsApp", action: () => window.location.href = "/?view=social-logins", gradient: "from-green-500 to-emerald-500" },
    { label: "Create Post", action: () => window.location.href = "/post-builder", gradient: "from-blue-500 to-indigo-500" },
    { label: "View CRM", action: () => window.location.href = "/?view=crm", gradient: "from-purple-500 to-pink-500" },
    { label: "Upgrade Plan", action: () => window.location.href = "/?view=user-settings", gradient: "from-orange-500 to-red-500" }
  ];

  return (
    <>
      {/* Floating Icon */}
      <div className="fixed bottom-6 right-6 z-50">
        {showTooltip && (
          <div className="absolute bottom-full right-0 mb-3 px-4 py-3 bg-gradient-to-r from-gray-900 to-black text-white text-sm rounded-xl shadow-2xl whitespace-nowrap border border-gray-700 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span>Need premium support? Chat with us!</span>
            </div>
            <div className="absolute top-full right-6 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
          </div>
        )}
        
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className={cn(
            "w-16 h-16 rounded-full shadow-2xl transition-all duration-500 hover:scale-110 relative overflow-hidden group",
            "bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 hover:from-purple-700 hover:via-pink-600 hover:to-purple-700",
            "text-white border-2 border-white/30 backdrop-blur-sm"
          )}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <MessageCircle className="w-7 h-7 relative z-10" />
          <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full" />
        </Button>
      </div>

      {/* Chatbot Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-end p-6">
          {/* Premium Backdrop */}
          <div 
            className="absolute inset-0 bg-gradient-to-br from-black/30 via-purple-900/20 to-pink-900/20 backdrop-blur-lg"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Premium Chatbot Card */}
          <Card className="relative w-[420px] h-[700px] shadow-2xl border-0 bg-white/95 backdrop-blur-xl flex flex-col overflow-hidden">
            {/* Premium Gradient Border */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 p-[1px] rounded-lg">
              <div className="w-full h-full bg-white/95 backdrop-blur-xl rounded-lg" />
            </div>
            
            <CardHeader className="relative z-10 bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 text-white rounded-t-lg p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-bold">LeadMasters AI Assistant</CardTitle>
                    <p className="text-sm text-white/80">Premium Support</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-white/20 h-10 w-10 p-0 rounded-full transition-all duration-300"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col p-6 space-y-6 relative z-10">
              {/* Premium Quick Actions */}
              {messages.length <= 1 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-purple-600" />
                    <p className="text-sm text-gray-700 font-semibold">Quick Actions</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {quickActions.map((action, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={action.action}
                        className={`text-xs h-12 flex flex-col items-center justify-center gap-1 border-2 hover:shadow-lg transition-all duration-300 bg-gradient-to-r hover:text-white hover:border-transparent ${action.gradient} hover:from-current hover:to-current`}
                      >
                        <span className="font-semibold">{action.label}</span>
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Premium Messages */}
              <ScrollArea className="flex-1 pr-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={cn(
                        "flex gap-3 max-w-[90%]",
                        message.type === 'user' ? "justify-end ml-auto" : "justify-start"
                      )}
                    >
                      {message.type === 'bot' && (
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 flex items-center justify-center flex-shrink-0 border-2 border-purple-200">
                          <Bot className="w-4 h-4 text-purple-600" />
                        </div>
                      )}
                      
                      <div className={cn(
                        "rounded-2xl p-4 text-sm relative shadow-lg",
                        message.type === 'user' 
                          ? "bg-gradient-to-r from-purple-600 to-pink-500 text-white" 
                          : "bg-gradient-to-r from-gray-50 to-white text-gray-900 border border-gray-200"
                      )}>
                        <p className="leading-relaxed">{message.content}</p>
                        
                        {message.links && message.links.length > 0 && (
                          <div className="mt-3 space-y-2">
                            {message.links.map((link, index) => (
                              <a
                                key={index}
                                href={link.url}
                                className="inline-flex items-center gap-2 text-xs text-purple-600 hover:text-purple-700 underline underline-offset-2 font-medium transition-colors duration-200"
                                target={link.url.startsWith('http') ? '_blank' : '_self'}
                                rel={link.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                              >
                                {link.text}
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                      
                      {message.type === 'user' && (
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-gray-200 to-gray-300 flex items-center justify-center flex-shrink-0 border-2 border-gray-300">
                          <User className="w-4 h-4 text-gray-600" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* Premium Input */}
              <div className="space-y-3">
                <div className="flex gap-3">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me anything about LeadMasters..."
                    className="flex-1 h-12 rounded-xl border-2 border-gray-200 focus:border-purple-500 transition-colors duration-300 bg-white/80 backdrop-blur-sm"
                  />
                  <Button
                    onClick={handleSendMessage}
                    className="h-12 w-12 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Send className="w-5 h-5" />
                  </Button>
                </div>

                {/* Premium Support Badge */}
                <div className="flex justify-center">
                  <Badge variant="outline" className="text-xs text-gray-500 border-gray-300 bg-white/80 backdrop-blur-sm px-3 py-1">
                    <HelpCircle className="w-3 h-3 mr-2" />
                    Premium AI Support • LeadMasters
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
