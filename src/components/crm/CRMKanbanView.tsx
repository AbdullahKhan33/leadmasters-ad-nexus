
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Eye, MessageSquare, User } from "lucide-react";

interface KanbanLead {
  id: string;
  name: string;
  avatar?: string;
  score: number;
  lastInteraction: string;
  assignedAgent: string;
  source: string;
  stage: string;
}

const mockKanbanLeads: KanbanLead[] = [
  {
    id: "1",
    name: "Ahmed Hassan",
    score: 85,
    lastInteraction: "2 hours ago",
    assignedAgent: "Sarah",
    source: "WhatsApp",
    stage: "new"
  },
  {
    id: "2",
    name: "Fatima Al Zahra",
    score: 72,
    lastInteraction: "5 hours ago",
    assignedAgent: "Omar",
    source: "Facebook",
    stage: "contacted"
  },
  {
    id: "3",
    name: "Mohammed Ali",
    score: 90,
    lastInteraction: "1 hour ago",
    assignedAgent: "Sarah",
    source: "Instagram",
    stage: "hot"
  },
  {
    id: "4",
    name: "Aisha Khan",
    score: 78,
    lastInteraction: "3 hours ago",
    assignedAgent: "Omar",
    source: "WhatsApp",
    stage: "follow-up"
  },
  {
    id: "5",
    name: "Hassan Al Maktoum",
    score: 95,
    lastInteraction: "Yesterday",
    assignedAgent: "Sarah",
    source: "Facebook",
    stage: "won"
  }
];

const stages = [
  { id: "new", title: "New", color: "bg-gray-100" },
  { id: "contacted", title: "Contacted", color: "bg-blue-100" },
  { id: "hot", title: "Hot", color: "bg-orange-100" },
  { id: "follow-up", title: "Follow-Up", color: "bg-yellow-100" },
  { id: "won", title: "Won", color: "bg-green-100" }
];

export function CRMKanbanView() {
  const [leads, setLeads] = useState(mockKanbanLeads);

  const getLeadsForStage = (stageId: string) => {
    return leads.filter(lead => lead.stage === stageId);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "bg-green-100 text-green-800 border-green-200 hover:bg-green-200 hover:border-green-300";
    if (score >= 60) return "bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-200 hover:border-yellow-300";
    return "bg-red-100 text-red-800 border-red-200 hover:bg-red-200 hover:border-red-300";
  };

  const handleDragStart = (e: React.DragEvent, leadId: string) => {
    e.dataTransfer.setData("text/plain", leadId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, newStage: string) => {
    e.preventDefault();
    const leadId = e.dataTransfer.getData("text/plain");
    
    setLeads(prevLeads => 
      prevLeads.map(lead => 
        lead.id === leadId ? { ...lead, stage: newStage } : lead
      )
    );
  };

  return (
    <div className="h-full bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20 p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Pipeline View</h2>
        <p className="text-gray-600">Drag and drop leads to change their stage</p>
      </div>

      <div className="grid grid-cols-5 gap-6 h-full">
        {stages.map((stage) => {
          const stageLeads = getLeadsForStage(stage.id);
          
          return (
            <div key={stage.id} className="flex flex-col">
              {/* Stage Header */}
              <div className={`${stage.color} rounded-lg p-4 mb-4 shadow-sm hover:shadow-md transition-shadow duration-200`}>
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-gray-900">{stage.title}</h3>
                  <Badge variant="secondary" className="bg-white text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                    {stageLeads.length}
                  </Badge>
                </div>
              </div>

              {/* Lead Cards */}
              <div 
                className="flex-1 space-y-3 min-h-96"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, stage.id)}
              >
                {stageLeads.map((lead) => (
                  <Card
                    key={lead.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, lead.id)}
                    className="cursor-move hover:shadow-lg transition-all duration-200 bg-white border border-gray-200 rounded-lg hover:border-purple-200 hover:bg-gradient-to-br hover:from-white hover:via-blue-50/20 hover:to-purple-50/20"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback className="bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 text-purple-700 text-xs">
                              {lead.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-medium text-gray-900 text-sm">{lead.name}</h4>
                            <p className="text-xs text-gray-500">{lead.lastInteraction}</p>
                          </div>
                        </div>
                        <Badge className={`text-xs transition-all duration-200 ${getScoreColor(lead.score)}`}>
                          {lead.score}
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between mb-3">
                        <Badge variant="outline" className="text-xs hover:bg-gradient-to-r hover:from-blue-50 hover:via-purple-50 hover:to-pink-50 hover:border-purple-200 hover:text-purple-700 transition-all duration-200">
                          {lead.source}
                        </Badge>
                        <span className="text-xs text-gray-500">{lead.assignedAgent}</span>
                      </div>

                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="flex-1 text-xs hover:bg-gradient-to-r hover:from-blue-50 hover:via-purple-50 hover:to-pink-50 hover:border-purple-200 hover:text-purple-700 transition-all duration-200">
                          <Eye className="w-3 h-3 mr-1" />
                          View
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1 text-xs hover:bg-gradient-to-r hover:from-blue-50 hover:via-purple-50 hover:to-pink-50 hover:border-purple-200 hover:text-purple-700 transition-all duration-200">
                          <MessageSquare className="w-3 h-3 mr-1" />
                          Contact
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {stageLeads.length === 0 && (
                  <div className="text-center text-gray-400 text-sm py-8">
                    No leads in this stage
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
