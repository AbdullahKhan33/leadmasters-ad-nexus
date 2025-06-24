import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Building2, 
  Plus, 
  Search, 
  Filter, 
  TrendingUp, 
  TrendingDown, 
  MoreHorizontal,
  Calendar,
  BarChart3,
  Users,
  Globe,
  Eye,
  Edit3,
  Trash2
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useWorkspace } from "@/contexts/WorkspaceContext";

interface Workspace {
  id: string;
  name: string;
  clientName: string;
  industry: string;
  country: string;
  businessType: string;
  logo?: string;
  initials: string;
  metrics: {
    campaigns: number;
    scheduledPosts: number;
    engagementTrend: number;
    isPositive: boolean;
  };
  isActive: boolean;
  createdAt: string;
}

const sampleWorkspaces: Workspace[] = [
  {
    id: '1',
    name: 'TechFlow Solutions',
    clientName: 'TechFlow Solutions Inc.',
    industry: 'Technology',
    country: 'United States',
    businessType: 'SaaS',
    initials: 'TF',
    metrics: {
      campaigns: 12,
      scheduledPosts: 28,
      engagementTrend: 15.8,
      isPositive: true
    },
    isActive: true,
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    name: 'Green Earth Organics',
    clientName: 'Green Earth Organics',
    industry: 'Retail',
    country: 'Canada',
    businessType: 'E-commerce',
    initials: 'GE',
    metrics: {
      campaigns: 8,
      scheduledPosts: 15,
      engagementTrend: -3.2,
      isPositive: false
    },
    isActive: true,
    createdAt: '2024-02-01'
  },
  {
    id: '3',
    name: 'Fitness First Studio',
    clientName: 'Fitness First Studio',
    industry: 'Health & Fitness',
    country: 'United Kingdom',
    businessType: 'Local Business',
    initials: 'FF',
    metrics: {
      campaigns: 6,
      scheduledPosts: 22,
      engagementTrend: 8.5,
      isPositive: true
    },
    isActive: true,
    createdAt: '2024-01-28'
  },
  {
    id: '4',
    name: 'Urban Design Co.',
    clientName: 'Urban Design Co.',
    industry: 'Design',
    country: 'Australia',
    businessType: 'Agency',
    initials: 'UD',
    metrics: {
      campaigns: 15,
      scheduledPosts: 35,
      engagementTrend: 22.1,
      isPositive: true
    },
    isActive: true,
    createdAt: '2024-01-10'
  }
];

export function Workspaces() {
  const [workspaces, setWorkspaces] = useState<Workspace[]>(sampleWorkspaces);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterIndustry, setFilterIndustry] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');
  const { toast } = useToast();
  const { setActiveWorkspace } = useWorkspace();

  const handleViewWorkspace = (workspace: Workspace) => {
    setActiveWorkspace(workspace);
    toast({
      title: "Entering Workspace",
      description: `Now working in ${workspace.name} workspace.`,
    });
  };

  const handleEditWorkspace = (workspace: Workspace) => {
    toast({
      title: "Edit Workspace",
      description: `Opening settings for ${workspace.name}.`,
    });
  };

  const handleDeleteWorkspace = (workspaceId: string) => {
    const workspace = workspaces.find(w => w.id === workspaceId);
    setWorkspaces(prev => prev.filter(w => w.id !== workspaceId));
    toast({
      title: "Workspace Deleted",
      description: `${workspace?.name} has been removed.`,
      variant: "destructive",
    });
  };

  const handleCreateWorkspace = () => {
    toast({
      title: "Create New Workspace",
      description: "Opening workspace creation wizard.",
    });
  };

  const filteredWorkspaces = workspaces.filter(workspace => {
    const matchesSearch = workspace.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         workspace.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         workspace.industry.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIndustry = filterIndustry === 'all' || workspace.industry === filterIndustry;
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'active' && workspace.isActive) ||
                         (filterStatus === 'inactive' && !workspace.isActive);
    return matchesSearch && matchesIndustry && matchesStatus;
  });

  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
      <div className="w-32 h-32 mb-8 rounded-full bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center">
        <Building2 className="w-16 h-16 text-purple-600" />
      </div>
      <h3 className="text-3xl font-bold text-gray-800 mb-4">
        Start managing your first client workspace
      </h3>
      <p className="text-gray-600 mb-8 max-w-md text-lg">
        Create organized workspaces for each of your clients to manage campaigns, posts, and analytics efficiently.
      </p>
      <Button 
        onClick={handleCreateWorkspace}
        className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 hover:from-blue-700 hover:via-purple-700 hover:to-pink-600 text-white px-8 py-4 rounded-xl shadow-lg text-lg"
      >
        <Plus className="w-6 h-6 mr-3" />
        Create Workspace
      </Button>
    </div>
  );

  if (workspaces.length === 0) {
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
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent mb-2">
              Workspaces
            </h1>
            <p className="text-gray-600 text-xl">
              Manage your clients and projects with ease.
            </p>
          </div>
          <Button 
            onClick={handleCreateWorkspace}
            className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 hover:from-blue-700 hover:via-purple-700 hover:to-pink-600 text-white px-8 py-4 rounded-xl shadow-lg transition-all duration-200 hover:shadow-xl text-lg"
          >
            <Plus className="w-6 h-6 mr-3" />
            New Workspace
          </Button>
        </div>

        {/* Search and Filter Controls */}
        <div className="flex flex-col lg:flex-row gap-4 mt-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search workspaces..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl bg-white/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-300 transition-all duration-200 text-lg"
            />
          </div>
          <div className="flex gap-3">
            <select
              value={filterIndustry}
              onChange={(e) => setFilterIndustry(e.target.value)}
              className="px-4 py-4 border border-gray-200 rounded-xl bg-white/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-300 transition-all duration-200"
            >
              <option value="all">All Industries</option>
              <option value="Technology">Technology</option>
              <option value="Retail">Retail</option>
              <option value="Health & Fitness">Health & Fitness</option>
              <option value="Design">Design</option>
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as 'all' | 'active' | 'inactive')}
              className="px-4 py-4 border border-gray-200 rounded-xl bg-white/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-300 transition-all duration-200"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Workspaces Grid */}
      <div className="p-8">
        {filteredWorkspaces.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-xl">No workspaces match your search criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
            {filteredWorkspaces.map((workspace) => (
              <Card 
                key={workspace.id} 
                className="group bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] hover:bg-white/95 overflow-hidden"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                        {workspace.initials}
                      </div>
                      <div>
                        <CardTitle className="text-xl font-bold text-gray-800 group-hover:text-gray-900 transition-colors mb-1">
                          {workspace.name}
                        </CardTitle>
                        <p className="text-sm text-gray-500">{workspace.clientName}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <Badge 
                        variant={workspace.isActive ? "default" : "secondary"}
                        className={workspace.isActive ? "bg-green-100 text-green-800 border-green-200" : ""}
                      >
                        {workspace.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="outline" className="text-xs border-blue-200 text-blue-700 bg-blue-50">
                      <Building2 className="w-3 h-3 mr-1" />
                      {workspace.industry}
                    </Badge>
                    <Badge variant="outline" className="text-xs border-purple-200 text-purple-700 bg-purple-50">
                      <Globe className="w-3 h-3 mr-1" />
                      {workspace.country}
                    </Badge>
                    <Badge variant="outline" className="text-xs border-pink-200 text-pink-700 bg-pink-50">
                      {workspace.businessType}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  {/* Metrics */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-lg p-3">
                      <div className="flex items-center space-x-2 mb-1">
                        <BarChart3 className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-medium text-blue-800">Campaigns</span>
                      </div>
                      <p className="text-2xl font-bold text-blue-900">{workspace.metrics.campaigns}</p>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-lg p-3">
                      <div className="flex items-center space-x-2 mb-1">
                        <Calendar className="w-4 h-4 text-purple-600" />
                        <span className="text-sm font-medium text-purple-800">Scheduled</span>
                      </div>
                      <p className="text-2xl font-bold text-purple-900">{workspace.metrics.scheduledPosts}</p>
                    </div>
                  </div>

                  {/* Engagement Trend */}
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">Engagement Trend</span>
                      <div className="flex items-center space-x-1">
                        {workspace.metrics.isPositive ? (
                          <TrendingUp className="w-4 h-4 text-green-500" />
                        ) : (
                          <TrendingDown className="w-4 h-4 text-red-500" />
                        )}
                        <span className={`text-sm font-bold ${workspace.metrics.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                          {workspace.metrics.isPositive ? '+' : ''}{workspace.metrics.engagementTrend}%
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons - Updated to use handleViewWorkspace */}
                  <div className="flex space-x-2 pt-2">
                    <Button
                      onClick={() => handleViewWorkspace(workspace)}
                      className="flex-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 hover:from-blue-700 hover:via-purple-700 hover:to-pink-600 text-white rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Enter Workspace
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditWorkspace(workspace)}
                      className="border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 rounded-lg transition-all duration-200"
                    >
                      <Edit3 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteWorkspace(workspace.id)}
                      className="border-red-200 text-red-700 hover:bg-red-50 hover:border-red-300 rounded-lg transition-all duration-200"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
