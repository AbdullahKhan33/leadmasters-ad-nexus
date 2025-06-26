import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  MessageSquare, 
  Phone, 
  MoreHorizontal, 
  Search,
  Filter,
  Clock,
  CheckCircle2,
  Circle,
  MessageCircle,
  Bot,
  Sparkles,
  Lock
} from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { usePremium } from "@/contexts/PremiumContext";
import { PremiumBadge } from "@/components/premium/PremiumBadge";
import { PremiumLockCard } from "@/components/premium/PremiumLockCard";

interface Lead {
  id: string;
  name: string;
  avatar?: string;
  lastMessage: string;
  timestamp: string;
  status: 'new' | 'active' | 'awaitingReply' | 'responded' | 'closed';
  source: 'whatsapp' | 'facebook' | 'instagram';
  phone: string;
  unreadCount: number;
  isOnline: boolean;
  priority: 'high' | 'medium' | 'low';
  dateAdded: string;
  aiScore?: number;
}

interface CRMInboxViewProps {
  onUpgradeClick: (feature: string) => void;
}

const mockLeads: Lead[] = [
  {
    id: "1",
    name: "Ahmed Hassan",
    lastMessage: "I'm interested in your premium package. Can you tell me more about the pricing?",
    timestamp: "2 minutes ago",
    status: "new",
    source: "whatsapp",
    phone: "+971501234567",
    unreadCount: 2,
    isOnline: true,
    priority: "high",
    dateAdded: "2024-01-29",
    aiScore: 95
  },
  {
    id: "2",
    name: "Fatima Al Zahra",
    lastMessage: "Thank you for the quick response! I'll review the proposal and get back to you.",
    timestamp: "1 hour ago",
    status: "active",
    source: "whatsapp",
    phone: "+971509876543",
    unreadCount: 0,
    isOnline: true,
    priority: "medium",
    dateAdded: "2024-01-28",
    aiScore: 87
  },
  {
    id: "3",
    name: "Mohammed Ali",
    lastMessage: "Hello, I saw your ad on Facebook. I'm looking for a social media manager for my restaurant.",
    timestamp: "3 hours ago",
    status: "awaitingReply",
    source: "whatsapp",
    phone: "+971501111222",
    unreadCount: 1,
    isOnline: false,
    priority: "high",
    dateAdded: "2024-01-27",
    aiScore: 78
  },
  {
    id: "4",
    name: "Aisha Khan",
    lastMessage: "Perfect! Let's schedule a call for tomorrow at 2 PM.",
    timestamp: "5 hours ago",
    status: "responded",
    source: "facebook",
    phone: "+971502222333",
    unreadCount: 0,
    isOnline: false,
    priority: "medium",
    dateAdded: "2024-01-26",
    aiScore: 65
  },
  {
    id: "5",
    name: "Hassan Al Maktoum",
    lastMessage: "Great working with you! The campaign results exceeded our expectations.",
    timestamp: "1 day ago",
    status: "closed",
    source: "instagram",
    phone: "+971503333444",
    unreadCount: 0,
    isOnline: false,
    priority: "low",
    dateAdded: "2024-01-25",
    aiScore: 52
  }
];

const aiQuickReplies = [
  "Thank you for your interest! I'd be happy to share our pricing details with you.",
  "Let me send you our premium package information right away.",
  "I can schedule a quick call to discuss your specific needs. When works best for you?",
  "Here's what's included in our premium package..."
];

export function CRMInboxView({ onUpgradeClick }: CRMInboxViewProps) {
  const [searchParams] = useSearchParams();
  const [leads, setLeads] = useState<Lead[]>(mockLeads);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>(mockLeads);
  const [searchQuery, setSearchQuery] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const { isPremium, premiumFeatures } = usePremium();

  const canShowAIReplies = isPremium && premiumFeatures.aiSuggestedTemplates;
  const canShowAIScore = isPremium && premiumFeatures.aiLeadScoring;

  // Handle URL filters
  useEffect(() => {
    const source = searchParams.get('source');
    const status = searchParams.get('status');
    const dateRange = searchParams.get('dateRange');
    const sort = searchParams.get('sort');

    let filtered = [...leads];

    // Apply source filter
    if (source) {
      filtered = filtered.filter(lead => lead.source === source);
    }

    // Apply status filter
    if (status) {
      if (status === 'awaitingReply') {
        filtered = filtered.filter(lead => lead.status === 'awaitingReply');
      } else {
        filtered = filtered.filter(lead => lead.status === status);
      }
    }

    // Apply date range filter
    if (dateRange === 'thisWeek') {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      filtered = filtered.filter(lead => new Date(lead.dateAdded) >= oneWeekAgo);
    }

    // Apply sorting
    if (sort === 'oldestFirst') {
      filtered.sort((a, b) => new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime());
    }

    setFilteredLeads(filtered);
  }, [searchParams, leads]);

  // Handle search
  useEffect(() => {
    if (searchQuery) {
      const searched = filteredLeads.filter(lead => 
        lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredLeads(searched);
    }
  }, [searchQuery]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'awaitingReply':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'responded':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'closed':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'new':
        return <Circle className="w-3 h-3" />;
      case 'active':
        return <MessageCircle className="w-3 h-3" />;
      case 'awaitingReply':
        return <Clock className="w-3 h-3" />;
      case 'responded':
        return <CheckCircle2 className="w-3 h-3" />;
      case 'closed':
        return <CheckCircle2 className="w-3 h-3" />;
      default:
        return <Circle className="w-3 h-3" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'new':
        return 'New Lead';
      case 'active':
        return 'Active Chat';
      case 'awaitingReply':
        return 'Awaiting Reply';
      case 'responded':
        return 'Responded';
      case 'closed':
        return 'Closed';
      default:
        return status;
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim() === "" || !selectedLead) return;
    
    // Here you would typically send the message to your backend
    console.log("Sending message:", newMessage, "to lead:", selectedLead.name);
    setNewMessage("");
  };

  return (
    <div className="h-full bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20 flex">
      {/* Left Sidebar - Leads List */}
      <div className="w-1/3 bg-white/80 backdrop-blur-sm border-r border-gray-200/60 flex flex-col">
        <div className="p-6 border-b border-gray-200/50">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">WhatsApp Inbox</h2>
          
          {/* AI Features for Free Users */}
          {!isPremium && (
            <div className="mb-4 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Bot className="w-4 h-4 text-purple-600" />
                  <span className="text-sm font-medium text-purple-700">AI Features Available</span>
                </div>
                <Button
                  onClick={() => onUpgradeClick("AI Inbox Features")}
                  size="sm"
                  className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white text-xs px-2 py-1 h-6"
                >
                  Upgrade
                </Button>
              </div>
            </div>
          )}

          {/* Active Filters Display */}
          {(searchParams.get('source') || searchParams.get('status') || searchParams.get('dateRange')) && (
            <div className="mb-4 space-y-2">
              <p className="text-sm text-gray-600">Active filters:</p>
              <div className="flex flex-wrap gap-2">
                {searchParams.get('source') && (
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    Source: {searchParams.get('source')}
                  </Badge>
                )}
                {searchParams.get('status') && (
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Status: {getStatusLabel(searchParams.get('status') || '')}
                  </Badge>
                )}
                {searchParams.get('dateRange') && (
                  <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                    Period: This Week
                  </Badge>
                )}
              </div>
            </div>
          )}

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search conversations..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filteredLeads.map((lead) => (
            <div
              key={lead.id}
              onClick={() => setSelectedLead(lead)}
              className={`p-4 border-b border-gray-100 cursor-pointer transition-all duration-200 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-purple-50/50 ${
                selectedLead?.id === lead.id
                  ? 'bg-gradient-to-r from-blue-100/80 via-purple-100/80 to-pink-100/80 border-l-4 border-l-purple-500'
                  : ''
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className="relative">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 text-purple-700">
                      {lead.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  {lead.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-medium text-gray-900 truncate">{lead.name}</h3>
                    <span className="text-xs text-gray-500">{lead.timestamp}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 mb-2">
                    <Badge className={`text-xs flex items-center space-x-1 ${getStatusColor(lead.status)}`}>
                      {getStatusIcon(lead.status)}
                      <span>{getStatusLabel(lead.status)}</span>
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {lead.source}
                    </Badge>
                    {canShowAIScore && lead.aiScore && (
                      <PremiumBadge className="text-xs">
                        AI: {lead.aiScore}%
                      </PremiumBadge>
                    )}
                  </div>
                  
                  <p className="text-sm text-gray-600 truncate mb-2">
                    {lead.lastMessage}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{lead.phone}</span>
                    {lead.unreadCount > 0 && (
                      <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                        {lead.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Side - Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedLead ? (
          <>
            {/* Chat Header */}
            <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/60 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Avatar className="w-12 h-12">
                      <AvatarFallback className="bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 text-purple-700">
                        {selectedLead.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    {selectedLead.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{selectedLead.name}</h3>
                    <p className="text-sm text-gray-500 flex items-center space-x-2">
                      <span>{selectedLead.isOnline ? 'Online now' : `Last seen ${selectedLead.timestamp}`}</span>
                      {canShowAIScore && selectedLead.aiScore && (
                        <PremiumBadge className="text-xs">
                          Lead Score: {selectedLead.aiScore}%
                        </PremiumBadge>
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Phone className="w-4 h-4 mr-2" />
                    Call
                  </Button>
                  <Button variant="outline" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* AI Quick Replies Section */}
            {canShowAIReplies ? (
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-purple-200 p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <Sparkles className="w-4 h-4 text-purple-600" />
                  <span className="text-sm font-medium text-purple-700">AI Quick Replies</span>
                  <PremiumBadge>AI Powered</PremiumBadge>
                </div>
                <div className="flex flex-wrap gap-2">
                  {aiQuickReplies.map((reply, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => setNewMessage(reply)}
                      className="text-xs bg-white hover:bg-purple-50 border-purple-200 text-purple-700"
                    >
                      {reply.length > 50 ? `${reply.substring(0, 50)}...` : reply}
                    </Button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 border-b border-gray-200 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Lock className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">AI Quick Replies are a Premium feature</span>
                  </div>
                  <Button
                    onClick={() => onUpgradeClick("AI Quick Replies")}
                    size="sm"
                    className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white"
                  >
                    Upgrade Now
                  </Button>
                </div>
              </div>
            )}

            {/* Chat Messages */}
            <div className="flex-1 p-6 overflow-y-auto bg-gradient-to-br from-gray-50/50 via-blue-50/20 to-purple-50/20">
              <div className="space-y-4">
                {/* Sample messages */}
                <div className="flex justify-start">
                  <div className="bg-white rounded-lg p-3 max-w-xs shadow-sm">
                    <p className="text-sm">{selectedLead.lastMessage}</p>
                    <span className="text-xs text-gray-500 mt-1 block">{selectedLead.timestamp}</span>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-lg p-3 max-w-xs">
                    <p className="text-sm">Thank you for reaching out! I'd be happy to help you with that. Let me get some more details from you.</p>
                    <span className="text-xs text-blue-100 mt-1 block">5 minutes ago</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Message Input */}
            <div className="bg-white/80 backdrop-blur-sm border-t border-gray-200/60 p-6">
              <div className="flex space-x-4">
                <Textarea
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  rows={1}
                  className="flex-1 resize-none"
                />
                <Button
                  onClick={handleSendMessage}
                  className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 hover:from-blue-700 hover:via-purple-700 hover:to-pink-600 text-white"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Send
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-500 mb-2">Select a conversation</h3>
              <p className="text-gray-400">Choose a lead from the list to start chatting</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Utility functions
function getStatusColor(status: string) {
  switch (status) {
    case 'new':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'active':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'awaitingReply':
      return 'bg-orange-100 text-orange-800 border-orange-200';
    case 'responded':
      return 'bg-purple-100 text-purple-800 border-purple-200';
    case 'closed':
      return 'bg-gray-100 text-gray-800 border-gray-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
}

function getStatusIcon(status: string) {
  switch (status) {
    case 'new':
      return <Circle className="w-3 h-3" />;
    case 'active':
      return <MessageCircle className="w-3 h-3" />;
    case 'awaitingReply':
      return <Clock className="w-3 h-3" />;
    case 'responded':
      return <CheckCircle2 className="w-3 h-3" />;
    case 'closed':
      return <CheckCircle2 className="w-3 h-3" />;
    default:
      return <Circle className="w-3 h-3" />;
  }
}

function getStatusLabel(status: string) {
  switch (status) {
    case 'new':
      return 'New Lead';
    case 'active':
      return 'Active Chat';
    case 'awaitingReply':
      return 'Awaiting Reply';
    case 'responded':
      return 'Responded';
    case 'closed':
      return 'Closed';
    default:
      return status;
  }
}

function handleSendMessage() {
  // Implementation for sending message
}
