import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useWorkspace } from '@/contexts/WorkspaceContext';
import { 
  Building2, 
  Plus, 
  Search, 
  Filter, 
  Users, 
  MoreHorizontal,
  Edit,
  Trash2,
  Globe,
  Briefcase,
  Settings,
  ArrowLeft,
  Sparkles
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { OnboardingWorkspaceForm } from './OnboardingWorkspaceForm';

interface Workspace {
  id: string;
  name: string;
  description: string;
  country: string;
  industry: string;
  businessType: string;
  memberCount: number;
  isActive: boolean;
}

export function Workspaces({ onWorkspaceSettingsClick }: { onWorkspaceSettingsClick?: (workspace: Workspace) => void }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterActive, setFilterActive] = useState<'all' | 'active' | 'inactive'>('all');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [createFormData, setCreateFormData] = useState({
    name: '',
    description: '',
    country: '',
    industry: '',
    businessType: ''
  });
  const [deleteConfirmation, setDeleteConfirmation] = useState<{ isOpen: boolean; workspace: Workspace | null }>({ 
    isOpen: false, 
    workspace: null 
  });
  const { workspaces, selectWorkspace, activeWorkspace, addWorkspace, deleteWorkspace, hasWorkspaces } = useWorkspace();
  const { toast } = useToast();

  const countries = [
    'Afghanistan', 'Albania', 'Algeria', 'Argentina', 'Armenia', 'Australia', 'Austria', 'Azerbaijan',
    'Bahrain', 'Bangladesh', 'Belarus', 'Belgium', 'Bolivia', 'Bosnia and Herzegovina', 'Brazil', 'Bulgaria',
    'Cambodia', 'Canada', 'Chile', 'China', 'Colombia', 'Croatia', 'Czech Republic', 'Denmark',
    'Ecuador', 'Egypt', 'Estonia', 'Ethiopia', 'Finland', 'France', 'Georgia', 'Germany', 'Ghana',
    'Greece', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy',
    'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kuwait', 'Latvia', 'Lebanon', 'Lithuania', 'Luxembourg',
    'Malaysia', 'Mexico', 'Morocco', 'Netherlands', 'New Zealand', 'Nigeria', 'Norway', 'Oman',
    'Pakistan', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Qatar', 'Romania', 'Russia', 'Saudi Arabia',
    'Singapore', 'Slovakia', 'Slovenia', 'South Africa', 'South Korea', 'Spain', 'Sri Lanka',
    'Sweden', 'Switzerland', 'Thailand', 'Turkey', 'Ukraine', 'United Arab Emirates', 'United Kingdom',
    'United States', 'Uruguay', 'Venezuela', 'Vietnam'
  ];

  const industries = [
    'Technology',
    'Marketing',
    'Finance',
    'Healthcare',
    'Education',
    'Retail',
    'Manufacturing',
    'Real Estate',
    'Consulting',
    'Media & Entertainment'
  ];

  const businessTypes = ['B2B', 'B2C', 'B2B2C'];

  const filteredWorkspaces = workspaces.filter(workspace => {
    const matchesSearch = workspace.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         workspace.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         workspace.industry.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterActive === 'all' || 
                         (filterActive === 'active' && workspace.isActive) ||
                         (filterActive === 'inactive' && !workspace.isActive);
    return matchesSearch && matchesFilter;
  });

  const handleWorkspaceSelect = (workspace: Workspace) => {
    selectWorkspace(workspace);
    toast({
      title: "Workspace Selected",
      description: `Switched to ${workspace.name}`,
    });
  };

  const handleWorkspaceSettings = (workspace: Workspace, event: React.MouseEvent) => {
    event.stopPropagation();
    if (onWorkspaceSettingsClick) {
      onWorkspaceSettingsClick(workspace);
    }
  };

  const handleDeleteWorkspace = (workspace: Workspace, event: React.MouseEvent) => {
    event.stopPropagation();
    setDeleteConfirmation({ isOpen: true, workspace });
  };

  const confirmDeleteWorkspace = () => {
    if (deleteConfirmation.workspace) {
      deleteWorkspace(deleteConfirmation.workspace.id);
      toast({
        title: "Workspace Deleted",
        description: `${deleteConfirmation.workspace.name} has been deleted successfully.`,
        variant: "destructive",
      });
      setDeleteConfirmation({ isOpen: false, workspace: null });
    }
  };

  const handleCreateWorkspace = (e: React.FormEvent) => {
    e.preventDefault();
    if (createFormData.name && createFormData.description && createFormData.country && createFormData.industry && createFormData.businessType) {
      const newWorkspace: Workspace = {
        id: Date.now().toString(),
        ...createFormData,
        memberCount: 1,
        isActive: true
      };

      addWorkspace(newWorkspace);
      
      toast({
        title: "Workspace Created",
        description: `${createFormData.name} has been created successfully.`,
      });

      // Reset form and hide it
      setCreateFormData({
        name: '',
        description: '',
        country: '',
        industry: '',
        businessType: ''
      });
      setShowCreateForm(false);
    }
  };

  const handleOnboardingWorkspaceCreate = (workspaceData: {
    fullName: string;
    name: string;
    description: string;
    address: string;
    country: string;
    state: string;
    industry: string;
    companySize: string;
    websiteUrl: string;
    mobileNumber: string;
    timezone: string;
  }) => {
    const newWorkspace: Workspace = {
      id: Date.now().toString(),
      name: workspaceData.name,
      description: workspaceData.description,
      country: workspaceData.country,
      industry: workspaceData.industry,
      businessType: 'B2B', // Default for onboarding
      memberCount: 1,
      isActive: true
    };

    addWorkspace(newWorkspace);
    
    toast({
      title: "Welcome to Your Workspace!",
      description: `${workspaceData.name} has been created successfully. Let's start your journey!`,
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setCreateFormData(prev => ({ ...prev, [field]: value }));
  };

  const isWorkspaceSelected = (workspace: Workspace) => {
    return activeWorkspace?.id === workspace.id;
  };

  // Show onboarding form for new users
  if (!hasWorkspaces) {
    return <OnboardingWorkspaceForm onCreateWorkspace={handleOnboardingWorkspaceCreate} />;
  }

  // Show create workspace form
  if (showCreateForm) {
    return (
      <div className="flex-1 overflow-auto bg-gradient-to-br from-gray-50/50 via-blue-50/30 to-purple-50/50 p-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={() => setShowCreateForm(false)}
            className="mb-6 hover:bg-white/70"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Workspaces
          </Button>

          {/* Create Workspace Form */}
          <Card className="bg-white/95 backdrop-blur-md border border-gray-200/50 shadow-2xl rounded-3xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 border-b border-gray-200/50 p-8">
              <div className="flex items-center space-x-3 mb-2">
                <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 text-white shadow-lg">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
                    Create New Workspace
                  </CardTitle>
                  <CardDescription className="text-gray-600 mt-1">
                    Set up a new workspace to organize your campaigns and content.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-8">
              <form onSubmit={handleCreateWorkspace} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="text-sm font-semibold text-gray-700 mb-2 block">
                      Workspace Name *
                    </Label>
                    <Input
                      id="name"
                      value={createFormData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Enter workspace name..."
                      className="h-12 border border-gray-200 rounded-xl bg-white/70 backdrop-blur-sm focus:ring-2 focus:ring-purple-500/50 focus:border-purple-300"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="description" className="text-sm font-semibold text-gray-700 mb-2 block">
                      Description *
                    </Label>
                    <Textarea
                      id="description"
                      value={createFormData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      placeholder="Describe your workspace..."
                      className="border border-gray-200 rounded-xl bg-white/70 backdrop-blur-sm focus:ring-2 focus:ring-purple-500/50 focus:border-purple-300 min-h-[100px] resize-none"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-semibold text-gray-700 mb-2 block flex items-center">
                        <Globe className="w-4 h-4 mr-2" />
                        Country *
                      </Label>
                      <Select value={createFormData.country} onValueChange={(value) => handleInputChange('country', value)} required>
                        <SelectTrigger className="h-12 border border-gray-200 rounded-xl bg-white/70 backdrop-blur-sm focus:ring-2 focus:ring-purple-500/50 focus:border-purple-300">
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent>
                          {countries.map((country) => (
                            <SelectItem key={country} value={country}>
                              {country}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-sm font-semibold text-gray-700 mb-2 block flex items-center">
                        <Briefcase className="w-4 h-4 mr-2" />
                        Industry *
                      </Label>
                      <Select value={createFormData.industry} onValueChange={(value) => handleInputChange('industry', value)} required>
                        <SelectTrigger className="h-12 border border-gray-200 rounded-xl bg-white/70 backdrop-blur-sm focus:ring-2 focus:ring-purple-500/50 focus:border-purple-300">
                          <SelectValue placeholder="Select industry" />
                        </SelectTrigger>
                        <SelectContent>
                          {industries.map((industry) => (
                            <SelectItem key={industry} value={industry}>
                              {industry}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-semibold text-gray-700 mb-2 block flex items-center">
                      <Users className="w-4 h-4 mr-2" />
                      Business Type *
                    </Label>
                    <Select value={createFormData.businessType} onValueChange={(value) => handleInputChange('businessType', value)} required>
                      <SelectTrigger className="h-12 border border-gray-200 rounded-xl bg-white/70 backdrop-blur-sm focus:ring-2 focus:ring-purple-500/50 focus:border-purple-300">
                        <SelectValue placeholder="Select business type" />
                      </SelectTrigger>
                      <SelectContent>
                        {businessTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex space-x-3 pt-6 border-t border-gray-200/50">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowCreateForm(false)}
                    className="flex-1 border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 rounded-xl transition-all duration-200 h-12"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 hover:from-blue-700 hover:via-purple-700 hover:to-pink-600 text-white rounded-xl shadow-lg transition-all duration-200 hover:shadow-xl h-12"
                  >
                    <Sparkles className="w-5 h-5 mr-2" />
                    Create Workspace
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
      <div className="w-24 h-24 mb-6 rounded-full bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center">
        <Building2 className="w-12 h-12 text-purple-600" />
      </div>
      <h3 className="text-2xl font-semibold text-gray-800 mb-3">
        No workspaces yet
      </h3>
      <p className="text-gray-600 mb-8 max-w-md">
        Create your first workspace to start organizing your campaigns and posts by team, client, or project.
      </p>
      <Button 
        onClick={() => setShowCreateForm(true)}
        className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 hover:from-blue-700 hover:via-purple-700 hover:to-pink-600 text-white px-8 py-3 rounded-xl shadow-lg"
      >
        <Plus className="w-5 h-5 mr-2" />
        Create First Workspace
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
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent mb-2">
              Workspaces
            </h1>
            <p className="text-gray-600 text-lg">
              Organize your campaigns and posts by team, client, or project.
            </p>
          </div>
          <Button 
            onClick={() => setShowCreateForm(true)}
            className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 hover:from-blue-700 hover:via-purple-700 hover:to-pink-600 text-white px-6 py-3 rounded-xl shadow-lg transition-all duration-200 hover:shadow-xl"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create Workspace
          </Button>
        </div>

        {/* Search and Filter Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search workspaces..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-3 border border-gray-200 rounded-xl bg-white/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-300 transition-all duration-200"
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

      {/* Workspaces Grid */}
      <div className="p-8">
        {filteredWorkspaces.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No workspaces match your search criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredWorkspaces.map((workspace) => {
              const isSelected = isWorkspaceSelected(workspace);
              return (
                <Card 
                  key={workspace.id} 
                  className={`group bg-white/70 backdrop-blur-sm border rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] hover:bg-white/90 cursor-pointer h-full ${
                    isSelected 
                      ? 'border-blue-500 bg-blue-50/50 ring-2 ring-blue-200' 
                      : 'border-gray-200/50'
                  }`}
                  onClick={() => handleWorkspaceSelect(workspace)}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className={`p-3 rounded-xl transition-all duration-300 ${
                          isSelected
                            ? 'bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 text-white shadow-lg'
                            : workspace.isActive 
                              ? 'bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 text-white shadow-lg' 
                              : 'bg-gray-100 text-gray-500'
                        }`}>
                          <Building2 className="w-6 h-6" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <CardTitle className={`text-xl font-semibold transition-colors truncate ${
                            isSelected ? 'text-blue-800' : 'text-gray-800 group-hover:text-gray-900'
                          }`}>
                            {workspace.name}
                          </CardTitle>
                          <div className="flex items-center space-x-2 mt-2">
                            <Badge 
                              variant="default"
                              className={`text-xs ${isSelected 
                                ? 'bg-green-100 text-green-700 border-green-200' 
                                : 'bg-gray-100 text-gray-600 border-gray-200'
                              }`}
                            >
                              {isSelected ? 'Active' : 'Inactive'}
                            </Badge>
                            {isSelected && (
                              <Badge className="text-xs bg-blue-100 text-blue-700 border-blue-200">
                                Selected
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="opacity-0 group-hover:opacity-100 transition-all duration-200 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg shadow-sm"
                          onClick={(e) => handleWorkspaceSettings(workspace, e)}
                          title="Workspace Settings"
                        >
                          <Settings className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-gray-600 hover:text-gray-700"
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4 flex-1 flex flex-col">
                    <CardDescription className="text-gray-600 leading-relaxed text-sm line-clamp-2">
                      {workspace.description}
                    </CardDescription>
                    
                    <div className="space-y-3 flex-1">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-2 text-gray-500">
                          <Globe className="w-4 h-4" />
                          <span>{workspace.country}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-500">
                          <Briefcase className="w-4 h-4" />
                          <span>{workspace.industry}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <Users className="w-4 h-4" />
                          <span>{workspace.memberCount} members</span>
                        </div>
                        <Badge variant="outline" className="text-xs border-gray-200 text-gray-600">
                          {workspace.businessType}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex space-x-2 pt-4 border-t border-gray-100">
                      <Button
                        variant="outline"
                        size="sm"
                        className={`flex-1 rounded-lg transition-all duration-200 ${
                          isSelected
                            ? 'border-blue-500 bg-blue-500 text-white hover:bg-blue-600'
                            : 'border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300'
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleWorkspaceSelect(workspace);
                        }}
                      >
                        {isSelected ? 'Selected' : 'Select'}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 rounded-lg transition-all duration-200"
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-red-200 text-red-700 hover:bg-red-50 hover:border-red-300 rounded-lg transition-all duration-200"
                        onClick={(e) => handleDeleteWorkspace(workspace, e)}
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

      <AlertDialog open={deleteConfirmation.isOpen} onOpenChange={(open) => 
        setDeleteConfirmation({ isOpen: open, workspace: deleteConfirmation.workspace })
      }>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Workspace</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{deleteConfirmation.workspace?.name}"? This action cannot be undone and will permanently remove all data associated with this workspace.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDeleteWorkspace}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Delete Workspace
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
