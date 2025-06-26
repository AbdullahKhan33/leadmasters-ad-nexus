
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
  HelpCircle 
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
    links: [{ text: "Open CRM", url: "/crm" }]
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
        content: "👋 Hi! I'm here to help you with LeadMasters AI. Ask me anything about using the platform!",
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
          : "I couldn't find a specific answer to your question. For personalized help, please contact our support team at support@leadmasters.ai or use the escalation option below.",
        timestamp: new Date(),
        links: faqMatch?.links || [{ text: "Contact Support", url: "mailto:support@leadmasters.ai" }]
      };
      setMessages(prev => [...prev, botMessage]);
    }, 500);

    setInputValue("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const quickActions = [
    { label: "Connect WhatsApp", action: () => window.location.href = "/?view=social-logins" },
    { label: "Create Post", action: () => window.location.href = "/post-builder" },
    { label: "View CRM", action: () => window.location.href = "/crm" },
    { label: "Upgrade Plan", action: () => window.location.href = "/?view=user-settings" }
  ];

  return (
    <>
      {/* Floating Icon */}
      <div className="fixed bottom-6 right-6 z-50">
        {showTooltip && (
          <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg whitespace-nowrap">
            Need help? Chat with us
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
          </div>
        )}
        
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className={cn(
            "w-14 h-14 rounded-full shadow-lg transition-all duration-300 hover:scale-110",
            "bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600",
            "text-white border-2 border-white/20"
          )}
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      </div>

      {/* Chatbot Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-end p-6">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Chatbot Card */}
          <Card className="relative w-96 h-[600px] shadow-2xl border-0 bg-white flex flex-col">
            <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-t-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Bot className="w-5 h-5" />
                  <CardTitle className="text-lg">LeadMasters AI Assistant</CardTitle>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-white/20 h-8 w-8 p-0"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col p-4 space-y-4">
              {/* Quick Actions */}
              {messages.length <= 1 && (
                <div className="space-y-2">
                  <p className="text-sm text-gray-600 font-medium">Quick Actions:</p>
                  <div className="grid grid-cols-2 gap-2">
                    {quickActions.map((action, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={action.action}
                        className="text-xs"
                      >
                        {action.label}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Messages */}
              <ScrollArea className="flex-1 pr-3">
                <div className="space-y-3">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={cn(
                        "flex gap-2",
                        message.type === 'user' ? "justify-end" : "justify-start"
                      )}
                    >
                      {message.type === 'bot' && (
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 flex items-center justify-center flex-shrink-0">
                          <Bot className="w-4 h-4 text-purple-600" />
                        </div>
                      )}
                      
                      <div className={cn(
                        "max-w-[80%] rounded-lg p-3 text-sm",
                        message.type === 'user' 
                          ? "bg-gradient-to-r from-purple-600 to-pink-500 text-white" 
                          : "bg-gray-100 text-gray-900"
                      )}>
                        <p>{message.content}</p>
                        
                        {message.links && message.links.length > 0 && (
                          <div className="mt-2 space-y-1">
                            {message.links.map((link, index) => (
                              <a
                                key={index}
                                href={link.url}
                                className="inline-flex items-center gap-1 text-xs text-purple-600 hover:text-purple-700 underline"
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
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                          <User className="w-4 h-4 text-gray-600" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* Input */}
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything..."
                  className="flex-1"
                />
                <Button
                  onClick={handleSendMessage}
                  size="sm"
                  className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>

              {/* Support Badge */}
              <div className="flex justify-center">
                <Badge variant="outline" className="text-xs text-gray-500">
                  <HelpCircle className="w-3 h-3 mr-1" />
                  Powered by LeadMasters AI
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
