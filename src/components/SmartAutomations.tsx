
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { 
  Bot, 
  Calendar, 
  BarChart3, 
  Target, 
  Repeat, 
  Mail, 
  Play, 
  Edit3, 
  Trash2,
  Plus,
  Search,
  Filter
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface Automation {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  isActive: boolean;
  nextRun: string;
  category: 'Ads' | 'Posts' | 'Notifications';
}

const initialAutomations: Automation[] = [
  {
    id: '1',
    name: 'Schedule Ads',
    description: 'Automatically schedule and publish ads at optimal times',
    icon: Calendar,
    isActive: true,
    nextRun: 'Tomorrow at 9:00 AM',
    category: 'Ads'
  },
  {
    id: '2',
    name: 'Ad Performance Alerts',
    description: 'Get notified when ad performance metrics change significantly',
    icon: BarChart3,
    isActive: true,
    nextRun: 'Next check in 2 hours',
    category: 'Notifications'
  },
  {
    id: '3',
    name: 'Automated Ad Optimization',
    description: 'AI-powered budget and targeting adjustments for better ROI',
    icon: Target,
    isActive: false,
    nextRun: 'Not scheduled',
    category: 'Ads'
  },
  {
    id: '4',
    name: 'A/B Testing Automation',
    description: 'Automatically create and test ad variations',
    icon: Bot,
    isActive: true,
    nextRun: 'Daily at 10:00 AM',
    category: 'Ads'
  },
  {
    id: '5',
    name: 'Repost Top-Performing Ads',
    description: 'Automatically republish your best-performing content',
    icon: Repeat,
    isActive: false,
    nextRun: 'Weekly on Mondays',
    category: 'Posts'
  },
  {
    id: '6',
    name: 'Email Notifications',
    description: 'Send campaign updates and performance summaries',
    icon: Mail,
    isActive: true,
    nextRun: 'Daily at 8:00 AM',
    category: 'Notifications'
  }
];

export function SmartAutomations() {
  const [automations, setAutomations] = useState<Automation[]>(initialAutomations);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterActive, setFilterActive] = useState<'all' | 'active' | 'inactive'>('all');
  const { toast } = useToast();

  const toggleAutomation = (id: string) => {
    setAutomations(prev => 
      prev.map(automation => 
        automation.id === id 
          ? { ...automation, isActive: !automation.isActive }
          : automation
      )
    );
    
    const automation = automations.find(a => a.id === id);
    toast({
      title: automation?.isActive ? "Automation Deactivated" : "Automation Activated",
      description: `${automation?.name} has been ${automation?.isActive ? 'deactivated' : 'activated'}.`,
    });
  };

  const runNow = (automation: Automation) => {
    toast({
      title: "Running Automation",
      description: `${automation.name} is being executed now.`,
    });
  };

  const editAutomation = (automation: Automation) => {
    toast({
      title: "Edit Automation",
      description: `Opening configuration for ${automation.name}.`,
    });
  };

  const deleteAutomation = (id: string) => {
    const automation = automations.find(a => a.id === id);
    setAutomations(prev => prev.filter(a => a.id !== id));
    toast({
      title: "Automation Deleted",
      description: `${automation?.name} has been removed.`,
      variant: "destructive",
    });
  };

  const filteredAutomations = automations.filter(automation => {
    const matchesSearch = automation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         automation.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterActive === 'all' || 
                         (filterActive === 'active' && automation.isActive) ||
                         (filterActive === 'inactive' && !automation.isActive);
    return matchesSearch && matchesFilter;
  });

  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
      <div className="w-24 h-24 mb-6 rounded-full bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center">
        <Bot className="w-12 h-12 text-purple-600" />
      </div>
      <h3 className="text-2xl font-semibold text-gray-800 mb-3">
        No automations yet
      </h3>
      <p className="text-gray-600 mb-8 max-w-md">
        Let AI handle repetitive tasks for you. Create your first automation to boost efficiency and engagement.
      </p>
      <Button className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 hover:from-blue-700 hover:via-purple-700 hover:to-pink-600 text-white px-8 py-3 rounded-xl shadow-lg">
        <Plus className="w-5 h-5 mr-2" />
        Add First Automation
      </Button>
    </div>
  );

  if (automations.length === 0) {
    return (
      <div className="flex-1 overflow-auto bg-gradient-to-br from-gray-50/50 via-blue-50/30 to-purple-50/50 p-8">
        <EmptyState />
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto bg-gradient-to-br from-gray-50/50 via-blue-50/30 to-purple-50/50">
      {/* Header Section */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-200/50 p-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent mb-2">
              Smart Automations
            </h1>
            <p className="text-gray-600 text-lg">
              Automate repetitive tasks and boost engagement with AI-powered workflows.
            </p>
          </div>
          <Button className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 hover:from-blue-700 hover:via-purple-700 hover:to-pink-600 text-white px-6 py-3 rounded-xl shadow-lg transition-all duration-200 hover:shadow-xl">
            <Plus className="w-5 h-5 mr-2" />
            Add New Automation
          </Button>
        </div>

        {/* Search and Filter Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search automations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl bg-white/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-300 transition-all duration-200"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={filterActive === 'all' ? 'default' : 'outline'}
              onClick={() => setFilterActive('all')}
              className="px-4 py-3 rounded-xl"
            >
              <Filter className="w-4 h-4 mr-2" />
              All
            </Button>
            <Button
              variant={filterActive === 'active' ? 'default' : 'outline'}
              onClick={() => setFilterActive('active')}
              className="px-4 py-3 rounded-xl"
            >
              Active
            </Button>
            <Button
              variant={filterActive === 'inactive' ? 'default' : 'outline'}
              onClick={() => setFilterActive('inactive')}
              className="px-4 py-3 rounded-xl"
            >
              Inactive
            </Button>
          </div>
        </div>
      </div>

      {/* Automations Grid */}
      <div className="p-8">
        {filteredAutomations.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No automations match your search criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredAutomations.map((automation) => {
              const IconComponent = automation.icon;
              return (
                <Card 
                  key={automation.id} 
                  className="group bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] hover:bg-white/90"
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`p-3 rounded-xl ${automation.isActive 
                          ? 'bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 text-white shadow-lg' 
                          : 'bg-gray-100 text-gray-500'
                        } transition-all duration-300`}>
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <div>
                          <CardTitle className="text-xl font-semibold text-gray-800 group-hover:text-gray-900 transition-colors">
                            {automation.name}
                          </CardTitle>
                          <Badge 
                            variant="outline" 
                            className="mt-1 text-xs border-gray-200 text-gray-600"
                          >
                            {automation.category}
                          </Badge>
                        </div>
                      </div>
                      <Switch
                        checked={automation.isActive}
                        onCheckedChange={() => toggleAutomation(automation.id)}
                        className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-blue-500 data-[state=checked]:to-purple-500"
                      />
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <CardDescription className="text-gray-600 leading-relaxed">
                      {automation.description}
                    </CardDescription>
                    
                    <div className="flex items-center text-sm text-gray-500 bg-gray-50/80 rounded-lg p-3">
                      <Calendar className="w-4 h-4 mr-2 text-purple-500" />
                      <span className="font-medium">Next run:</span>
                      <span className="ml-2">{automation.nextRun}</span>
                    </div>

                    <div className="flex space-x-2 pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => runNow(automation)}
                        className="flex-1 border-green-200 text-green-700 hover:bg-green-50 hover:border-green-300 rounded-lg transition-all duration-200"
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Run Now
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => editAutomation(automation)}
                        className="flex-1 border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300 rounded-lg transition-all duration-200"
                      >
                        <Edit3 className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteAutomation(automation.id)}
                        className="border-red-200 text-red-700 hover:bg-red-50 hover:border-red-300 rounded-lg transition-all duration-200"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
