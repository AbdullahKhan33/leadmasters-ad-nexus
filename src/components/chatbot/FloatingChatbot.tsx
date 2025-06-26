
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  User, 
  ExternalLink,
  HelpCircle,
  Sparkles,
  Minimize2,
  Ticket,
  ArrowLeft,
  Upload
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  links?: { text: string; url: string; action?: () => void; }[];
}

interface SupportForm {
  subject: string;
  description: string;
  priority: 'Low' | 'Medium' | 'High';
  file?: File;
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

const GREETING_KEYWORDS = ['hi', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening'];

export function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [showTooltip, setShowTooltip] = useState(false);
  const [isEnabled, setIsEnabled] = useState(true);
  const [showSupportForm, setShowSupportForm] = useState(false);
  const [supportForm, setSupportForm] = useState<SupportForm>({
    subject: '',
    description: '',
    priority: 'Medium'
  });
  const [isHovered, setIsHovered] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check if chatbot is disabled
    const chatbotDisabled = localStorage.getItem('chatbot-disabled') === 'true';
    setIsEnabled(!chatbotDisabled);

    if (chatbotDisabled) return;

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

  // Add function to disable chatbot (can be called from console or other components)
  useEffect(() => {
    (window as any).disableChatbot = () => {
      localStorage.setItem('chatbot-disabled', 'true');
      setIsEnabled(false);
      setIsOpen(false);
    };
    
    (window as any).enableChatbot = () => {
      localStorage.setItem('chatbot-disabled', 'false');
      setIsEnabled(true);
    };
  }, []);

  if (!isEnabled) {
    return null;
  }

  const isGreeting = (query: string): boolean => {
    const lowerQuery = query.toLowerCase().trim();
    return GREETING_KEYWORDS.some(greeting => lowerQuery.includes(greeting));
  };

  const getGreetingResponse = (): string => {
    const responses = [
      "Hello! 👋 I'm your LeadMasters AI assistant. How can I help you today?",
      "Hi there! 😊 Welcome to LeadMasters AI. What would you like to know?",
      "Hey! 🌟 I'm here to help you with your LeadMasters questions. What's on your mind?",
      "Hello! Great to see you here. How can I assist you with your LeadMasters experience?"
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

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

    // Check for greetings first
    const isGreetingMessage = isGreeting(inputValue);
    
    // Find FAQ answer
    const faqMatch = findFAQAnswer(inputValue);
    
    setTimeout(() => {
      let botContent: string;
      let botLinks: Message['links'] = [];

      if (isGreetingMessage) {
        botContent = getGreetingResponse();
      } else if (faqMatch) {
        botContent = faqMatch.answer;
        botLinks = faqMatch.links;
      } else {
        botContent = "I couldn't find a specific answer to your question. For personalized premium support, please contact our expert team at support@leadmasters.ai or create a support ticket below.";
        botLinks = [
          { 
            text: "Create Support Ticket", 
            url: "#", 
            action: () => setShowSupportForm(true)
          },
          { 
            text: "Email Support", 
            url: "mailto:support@leadmasters.ai" 
          }
        ];
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: botContent,
        timestamp: new Date(),
        links: botLinks
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

  const handleClose = () => {
    setIsOpen(false);
    // Update localStorage and trigger global function
    localStorage.setItem('chatbot-disabled', 'true');
    setIsEnabled(false);
    (window as any).disableChatbot?.();
  };

  const handleSupportFormSubmit = () => {
    if (!supportForm.subject.trim() || !supportForm.description.trim()) {
      toast({
        title: "Required fields missing",
        description: "Please fill in both subject and description.",
        variant: "destructive"
      });
      return;
    }

    // Simulate ticket submission
    const ticketId = Math.random().toString(36).substr(2, 9).toUpperCase();
    
    toast({
      title: "Support Ticket Created",
      description: `Your support ticket has been submitted. Our team will contact you soon. Ticket ID: ${ticketId}`,
    });

    // Reset form and show success in chatbot
    setSupportForm({ subject: '', description: '', priority: 'Medium' });
    setShowSupportForm(false);
    
    const successMessage: Message = {
      id: (Date.now() + 1).toString(),
      type: 'bot',
      content: `✅ Your support ticket has been submitted successfully!\n\nTicket ID: ${ticketId}\nOur team will contact you soon.`,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, successMessage]);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSupportForm(prev => ({ ...prev, file }));
    }
  };

  const handleLinkClick = (link: Message['links'][0]) => {
    if (link.action) {
      link.action();
    } else if (link.url.startsWith('#')) {
      // Handle internal actions
      return;
    } else if (link.url.startsWith('mailto:')) {
      window.location.href = link.url;
    } else {
      window.location.href = link.url;
    }
  };

  return (
    <>
      {/* Floating Icon */}
      <div 
        className="fixed bottom-6 right-6 z-50"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {showTooltip && (
          <div className="absolute bottom-full right-0 mb-3 px-4 py-3 bg-gradient-to-r from-gray-900 to-black text-white text-sm rounded-xl shadow-2xl whitespace-nowrap border border-gray-700 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span>Need premium support? Chat with us!</span>
            </div>
            <div className="absolute top-full right-6 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
          </div>
        )}
        
        {/* Close button on hover */}
        {isHovered && (
          <Button
            onClick={handleClose}
            size="sm"
            variant="ghost"
            className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white shadow-lg hover:bg-red-50 text-gray-600 hover:text-red-600 border border-gray-200 p-0 z-10"
          >
            <X className="w-3 h-3" />
          </Button>
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
                  {showSupportForm && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowSupportForm(false)}
                      className="text-white hover:bg-white/20 h-8 w-8 p-0 rounded-full transition-all duration-300 mr-2"
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </Button>
                  )}
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    {showSupportForm ? <Ticket className="w-5 h-5 text-white" /> : <Bot className="w-5 h-5 text-white" />}
                  </div>
                  <div>
                    <CardTitle className="text-lg font-bold">
                      {showSupportForm ? 'Create Support Ticket' : 'LeadMasters AI Assistant'}
                    </CardTitle>
                    <p className="text-sm text-white/80">
                      {showSupportForm ? 'Get help from our team' : 'Premium Support'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                    className="text-white hover:bg-white/20 h-8 w-8 p-0 rounded-full transition-all duration-300"
                    title="Minimize"
                  >
                    <Minimize2 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                    className="text-white hover:bg-white/20 h-8 w-8 p-0 rounded-full transition-all duration-300"
                    title="Close"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col p-6 space-y-6 relative z-10">
              {showSupportForm ? (
                /* Support Form */
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      value={supportForm.subject}
                      onChange={(e) => setSupportForm(prev => ({ ...prev, subject: e.target.value }))}
                      placeholder="Brief description of your issue"
                      className="border-gray-300 focus:border-purple-500"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      value={supportForm.description}
                      onChange={(e) => setSupportForm(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Please provide detailed information about your issue..."
                      rows={4}
                      className="border-gray-300 focus:border-purple-500"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority</Label>
                    <Select value={supportForm.priority} onValueChange={(value: 'Low' | 'Medium' | 'High') => setSupportForm(prev => ({ ...prev, priority: value }))}>
                      <SelectTrigger className="border-gray-300 focus:border-purple-500">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Low">Low</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="High">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="file">File Attachment (Optional)</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        id="file"
                        type="file"
                        onChange={handleFileUpload}
                        className="border-gray-300 focus:border-purple-500"
                      />
                      <Upload className="w-4 h-4 text-gray-400" />
                    </div>
                    {supportForm.file && (
                      <p className="text-sm text-gray-600">Selected: {supportForm.file.name}</p>
                    )}
                  </div>
                  
                  <Button
                    onClick={handleSupportFormSubmit}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white"
                  >
                    Submit Ticket
                  </Button>
                </div>
              ) : (
                <>
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
                            <p className="leading-relaxed whitespace-pre-line">{message.content}</p>
                            
                            {message.links && message.links.length > 0 && (
                              <div className="mt-3 space-y-2">
                                {message.links.map((link, index) => (
                                  <button
                                    key={index}
                                    onClick={() => handleLinkClick(link)}
                                    className="inline-flex items-center gap-2 text-xs text-purple-600 hover:text-purple-700 underline underline-offset-2 font-medium transition-colors duration-200 cursor-pointer"
                                  >
                                    {link.text}
                                    {!link.action && <ExternalLink className="w-3 h-3" />}
                                  </button>
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

                  {/* Need More Help Section */}
                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <HelpCircle className="w-4 h-4" />
                        Need more help?
                      </h3>
                    </div>
                    <Button
                      onClick={() => setShowSupportForm(true)}
                      variant="outline"
                      className="w-full text-purple-600 border-purple-200 hover:bg-purple-50"
                    >
                      <Ticket className="w-4 h-4 mr-2" />
                      Create Support Ticket
                    </Button>
                  </div>

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
                </>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
