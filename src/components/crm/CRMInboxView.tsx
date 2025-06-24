
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { 
  Search, 
  Filter, 
  Send, 
  MoreVertical,
  Star,
  User,
  MessageSquare,
  Phone,
  Tag,
  Calendar
} from "lucide-react";

interface Lead {
  id: string;
  name: string;
  phone: string;
  avatar?: string;
  lastMessage: string;
  timestamp: string;
  score: number;
  isUnread: boolean;
  source: string;
  tags: string[];
  assignedAgent?: string;
  messages: {
    id: string;
    content: string;
    timestamp: string;
    isFromLead: boolean;
  }[];
}

const mockLeads: Lead[] = [
  {
    id: "1",
    name: "Ahmed Hassan",
    phone: "+971 50 123 4567",
    lastMessage: "Hi, I'm interested in your real estate services",
    timestamp: "2m ago",
    score: 85,
    isUnread: true,
    source: "WhatsApp",
    tags: ["Hot", "Dubai"],
    assignedAgent: "Sarah",
    messages: [
      { id: "1", content: "Hi, I'm interested in your real estate services", timestamp: "2m ago", isFromLead: true },
      { id: "2", content: "Thank you for reaching out! I'd be happy to help you find the perfect property.", timestamp: "1m ago", isFromLead: false }
    ]
  },
  {
    id: "2",
    name: "Fatima Al Zahra",
    phone: "+971 55 987 6543",
    lastMessage: "What are the payment plans available?",
    timestamp: "15m ago",
    score: 72,
    isUnread: false,
    source: "Facebook",
    tags: ["Premium", "Abu Dhabi"],
    messages: [
      { id: "3", content: "What are the payment plans available?", timestamp: "15m ago", isFromLead: true }
    ]
  },
  {
    id: "3",
    name: "Mohammed Ali",
    phone: "+971 56 456 7890",
    lastMessage: "Can we schedule a viewing?",
    timestamp: "1h ago",
    score: 90,
    isUnread: true,
    source: "Instagram",
    tags: ["Priority", "Sharjah"],
    assignedAgent: "Omar",
    messages: [
      { id: "4", content: "Can we schedule a viewing?", timestamp: "1h ago", isFromLead: true }
    ]
  }
];

export function CRMInboxView() {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(mockLeads[0]);
  const [messageText, setMessageText] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = ["All", "Unread", "Hot Leads", "Assigned to Me"];
  const sources = ["WhatsApp", "Facebook", "Instagram"];

  const getScoreColor = (score: number) => {
    if (score >= 80) return "bg-green-100 text-green-800 border-green-200";
    if (score >= 60) return "bg-yellow-100 text-yellow-800 border-yellow-200";
    return "bg-red-100 text-red-800 border-red-200";
  };

  const aiSuggestions = [
    "Thanks for your interest! Let me share our latest properties.",
    "I'd be happy to schedule a viewing for you.",
    "What's your budget range for this purchase?"
  ];

  return (
    <div className="h-full flex bg-white">
      {/* Left Panel - Lead List */}
      <div className="w-80 border-r border-gray-200 flex flex-col">
        {/* Search and Filters */}
        <div className="p-4 border-b border-gray-100">
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search by name or number"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-gray-200 rounded-lg"
            />
          </div>
          
          <div className="flex flex-wrap gap-2 mb-3">
            {filters.map((filter) => (
              <Button
                key={filter}
                variant={activeFilter === filter ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveFilter(filter)}
                className="text-xs"
              >
                {filter}
              </Button>
            ))}
          </div>

          <div className="flex gap-2">
            {sources.map((source) => (
              <Badge key={source} variant="outline" className="text-xs">
                {source}
              </Badge>
            ))}
          </div>
        </div>

        {/* Lead Cards */}
        <div className="flex-1 overflow-y-auto">
          {mockLeads.map((lead) => (
            <div
              key={lead.id}
              onClick={() => setSelectedLead(lead)}
              className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                selectedLead?.id === lead.id ? 'bg-blue-50 border-r-2 border-r-blue-500' : ''
              }`}
            >
              <div className="flex items-start space-x-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={lead.avatar} />
                  <AvatarFallback className="bg-gray-200 text-gray-600">
                    {lead.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-medium text-gray-900 truncate">{lead.name}</h3>
                    <span className="text-xs text-gray-500">{lead.timestamp}</span>
                  </div>
                  
                  <p className="text-sm text-gray-600 truncate mb-2">{lead.lastMessage}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Badge className={`text-xs ${getScoreColor(lead.score)}`}>
                        {lead.score}
                      </Badge>
                      {lead.isUnread && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      )}
                    </div>
                    
                    {lead.assignedAgent && (
                      <span className="text-xs text-gray-500">{lead.assignedAgent}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Middle Panel - Chat Window */}
      <div className="flex-1 flex flex-col">
        {selectedLead ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 bg-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-gray-200 text-gray-600">
                      {selectedLead.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="font-medium text-gray-900">{selectedLead.name}</h2>
                    <p className="text-sm text-gray-500">{selectedLead.phone}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {selectedLead.messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isFromLead ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.isFromLead
                        ? 'bg-gray-100 text-gray-900'
                        : 'bg-blue-500 text-white'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <span className={`text-xs ${
                      message.isFromLead ? 'text-gray-500' : 'text-blue-100'
                    }`}>
                      {message.timestamp}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* AI Suggestions */}
            <div className="px-4 py-2 border-t border-gray-100">
              <div className="flex flex-wrap gap-2">
                {aiSuggestions.map((suggestion, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => setMessageText(suggestion)}
                    className="text-xs bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100"
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <Textarea
                  placeholder="Type your message..."
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  className="flex-1 min-h-[40px] max-h-32 resize-none border-gray-200 rounded-lg"
                />
                <Button size="sm" className="px-3">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Select a lead to view conversation
          </div>
        )}
      </div>

      {/* Right Sidebar - Lead Info */}
      {selectedLead && (
        <div className="w-80 border-l border-gray-200 bg-gray-50 p-4 overflow-y-auto">
          <div className="space-y-6">
            {/* Profile Details */}
            <Card>
              <CardContent className="p-4">
                <div className="text-center mb-4">
                  <Avatar className="w-16 h-16 mx-auto mb-3">
                    <AvatarFallback className="bg-gray-200 text-gray-600 text-lg">
                      {selectedLead.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="font-medium text-gray-900">{selectedLead.name}</h3>
                  <p className="text-sm text-gray-500">{selectedLead.phone}</p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Source:</span>
                    <Badge variant="outline">{selectedLead.source}</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Score:</span>
                    <Badge className={getScoreColor(selectedLead.score)}>
                      {selectedLead.score}
                    </Badge>
                  </div>
                  
                  {selectedLead.assignedAgent && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Agent:</span>
                      <span className="text-sm font-medium">{selectedLead.assignedAgent}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Tags */}
            <Card>
              <CardContent className="p-4">
                <h4 className="font-medium text-gray-900 mb-3">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedLead.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      <Tag className="w-3 h-3 mr-1" />
                      {tag}
                    </Badge>
                  ))}
                  <Button variant="outline" size="sm" className="text-xs">
                    + Add Tag
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardContent className="p-4">
                <h4 className="font-medium text-gray-900 mb-3">Quick Actions</h4>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Phone className="w-4 h-4 mr-2" />
                    Call Lead
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule Meeting
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Star className="w-4 h-4 mr-2" />
                    Mark as Priority
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Notes */}
            <Card>
              <CardContent className="p-4">
                <h4 className="font-medium text-gray-900 mb-3">Notes</h4>
                <Textarea
                  placeholder="Add notes about this lead..."
                  className="min-h-[80px] border-gray-200"
                />
                <Button size="sm" className="mt-2">Save Notes</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
