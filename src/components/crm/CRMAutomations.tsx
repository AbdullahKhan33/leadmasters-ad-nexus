
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Play, 
  Pause,
  Edit,
  Copy,
  Trash2,
  Plus,
  Zap,
  MessageSquare,
  Calendar,
  Bell,
  Filter,
  ArrowDown,
  ArrowRight
} from "lucide-react";

interface Automation {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  trigger: string;
  conditions: string[];
  actions: string[];
  runsCount: number;
  lastRun: string;
}

const mockAutomations: Automation[] = [
  {
    id: "1",
    name: "WhatsApp Welcome Flow",
    description: "Send welcome message to new WhatsApp leads",
    isActive: true,
    trigger: "New WhatsApp Lead",
    conditions: ["Lead source is WhatsApp"],
    actions: ["Send WhatsApp welcome message", "Add to follow-up list"],
    runsCount: 45,
    lastRun: "2 hours ago"
  },
  {
    id: "2",
    name: "Dubai Lead Priority",
    description: "Mark Dubai leads as high priority",
    isActive: true,
    trigger: "Facebook Lead Form Submitted",
    conditions: ["Lead location is Dubai", "Budget > AED 500k"],
    actions: ["Add 'Priority' tag", "Assign to Sarah", "Send alert to manager"],
    runsCount: 12,
    lastRun: "5 hours ago"
  },
  {
    id: "3",
    name: "Follow-up Reminder",
    description: "Remind agents about pending follow-ups",
    isActive: false,
    trigger: "Lead Not Contacted",
    conditions: ["24 hours since lead creation", "No messages sent"],
    actions: ["Send reminder to agent", "Add to urgent list"],
    runsCount: 8,
    lastRun: "Yesterday"
  }
];

const templates = [
  {
    id: "welcome",
    name: "WhatsApp Welcome",
    description: "Send welcome message to new leads",
    icon: MessageSquare
  },
  {
    id: "followup",
    name: "Follow-Up Reminder",
    description: "Remind agents about pending follow-ups",
    icon: Bell
  },
  {
    id: "hotlead",
    name: "Hot Lead Alert",
    description: "Alert agents about high-score leads",
    icon: Zap
  },
  {
    id: "calendar",
    name: "Calendar Scheduling",
    description: "Auto-schedule meetings with qualified leads",
    icon: Calendar
  }
];

export function CRMAutomations() {
  const [automations, setAutomations] = useState(mockAutomations);
  const [selectedAutomation, setSelectedAutomation] = useState<Automation | null>(null);

  const toggleAutomation = (id: string) => {
    setAutomations(prev => 
      prev.map(automation => 
        automation.id === id 
          ? { ...automation, isActive: !automation.isActive }
          : automation
      )
    );
  };

  return (
    <div className="h-full bg-gray-50 flex">
      {/* Left Panel - Automation List */}
      <div className="w-1/2 border-r border-gray-200 bg-white">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-gray-900">Smart Flows</h2>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Create Flow
            </Button>
          </div>
          <p className="text-gray-600">Automate your lead management with smart workflows</p>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            {automations.map((automation) => (
              <Card
                key={automation.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedAutomation?.id === automation.id ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => setSelectedAutomation(automation)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-medium text-gray-900">{automation.name}</h3>
                        <Badge 
                          className={automation.isActive 
                            ? "bg-green-100 text-green-800" 
                            : "bg-gray-100 text-gray-800"
                          }
                        >
                          {automation.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{automation.description}</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleAutomation(automation.id);
                      }}
                    >
                      {automation.isActive ? (
                        <Pause className="w-4 h-4" />
                      ) : (
                        <Play className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{automation.runsCount} runs</span>
                    <span>Last run: {automation.lastRun}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel - Flow Builder or Templates */}
      <div className="flex-1 bg-gray-50">
        {selectedAutomation ? (
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{selectedAutomation.name}</h3>
                <p className="text-gray-600">{selectedAutomation.description}</p>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                <Button variant="outline" size="sm">
                  <Copy className="w-4 h-4 mr-2" />
                  Clone
                </Button>
                <Button variant="outline" size="sm">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>

            {/* Flow Visualization */}
            <div className="space-y-6">
              {/* Trigger */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Zap className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Trigger</h4>
                      <p className="text-sm text-gray-600">{selectedAutomation.trigger}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-center">
                <ArrowDown className="w-5 h-5 text-gray-400" />
              </div>

              {/* Conditions */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                      <Filter className="w-4 h-4 text-orange-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 mb-2">Conditions</h4>
                      <div className="space-y-2">
                        {selectedAutomation.conditions.map((condition, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                            <span className="text-sm text-gray-600">{condition}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-center">
                <ArrowDown className="w-5 h-5 text-gray-400" />
              </div>

              {/* Actions */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <Play className="w-4 h-4 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 mb-2">Actions</h4>
                      <div className="space-y-2">
                        {selectedAutomation.actions.map((action, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                            <span className="text-sm text-gray-600">{action}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Statistics */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{selectedAutomation.runsCount}</div>
                    <div className="text-sm text-gray-600">Total Runs</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">95%</div>
                    <div className="text-sm text-gray-600">Success Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">12</div>
                    <div className="text-sm text-gray-600">Leads Converted</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Quick Start Templates</h3>
            <div className="grid grid-cols-2 gap-4">
              {templates.map((template) => (
                <Card key={template.id} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <template.icon className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 mb-1">{template.name}</h4>
                        <p className="text-sm text-gray-600">{template.description}</p>
                        <Button variant="outline" size="sm" className="mt-3">
                          Use Template
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
