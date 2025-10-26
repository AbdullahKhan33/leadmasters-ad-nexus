import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CustomSelect } from "@/components/ui/custom-select";
import { 
  Building2, 
  Users, 
  CreditCard, 
  Settings, 
  AlertTriangle, 
  Plus, 
  Upload,
  Trash2,
  UserPlus,
  ArrowLeft
} from "lucide-react";
import { useWorkspace } from "@/contexts/WorkspaceContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface WorkspaceSettingsProps {
  onBackClick?: () => void;
}

export function WorkspaceSettings({ onBackClick }: WorkspaceSettingsProps) {
  const { activeWorkspace, updateWorkspaceRegion } = useWorkspace();
  const [workspaceName, setWorkspaceName] = useState(activeWorkspace?.name || "");
  const [description, setDescription] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState(activeWorkspace?.industry || "");
  const [selectedCountry, setSelectedCountry] = useState(activeWorkspace?.country || "");
  const [selectedRegion, setSelectedRegion] = useState(activeWorkspace?.region || 'global');
  const [aiSuggestions, setAiSuggestions] = useState(true);
  const [smartAutomations, setSmartAutomations] = useState(false);
  const [selectedAiModel, setSelectedAiModel] = useState("gpt-4");

  const industries = [
    { value: "technology", label: "Technology" },
    { value: "healthcare", label: "Healthcare" },
    { value: "finance", label: "Finance" },
    { value: "education", label: "Education" },
    { value: "retail", label: "Retail" },
    { value: "real-estate", label: "Real Estate" },
    { value: "consulting", label: "Consulting" },
    { value: "other", label: "Other" }
  ];

  const countries = [
    { value: "us", label: "United States" },
    { value: "uk", label: "United Kingdom" },
    { value: "ca", label: "Canada" },
    { value: "au", label: "Australia" },
    { value: "de", label: "Germany" },
    { value: "fr", label: "France" },
    { value: "other", label: "Other" }
  ];

  const aiModels = [
    { value: "gpt-4", label: "GPT-4 (Recommended)" },
    { value: "gpt-3.5", label: "GPT-3.5 Turbo" },
    { value: "claude", label: "Claude AI" }
  ];

  const regions = [
    { value: 'uae', label: '🇦🇪 UAE (Dubai)' },
    { value: 'qatar', label: '🇶🇦 Qatar' },
    { value: 'saudi_arabia', label: '🇸🇦 Saudi Arabia (Riyadh)' },
    { value: 'india', label: '🇮🇳 India' },
    { value: 'global', label: '🌍 Global (All Regions)' }
  ];

  const roles = [
    { value: "admin", label: "Admin" },
    { value: "editor", label: "Editor" },
    { value: "viewer", label: "Viewer" }
  ];

  const teamMembers = [
    { id: 1, name: "John Doe", email: "john@company.com", role: "admin" },
    { id: 2, name: "Sarah Wilson", email: "sarah@company.com", role: "editor" },
    { id: 3, name: "Mike Johnson", email: "mike@company.com", role: "viewer" }
  ];

  const handleSaveSettings = async () => {
    if (!activeWorkspace) return;
    
    try {
      const { error: nameError } = await supabase
        .from('workspaces')
        .update({ name: workspaceName })
        .eq('id', activeWorkspace.id);
        
      if (nameError) throw nameError;

      await updateWorkspaceRegion(activeWorkspace.id, selectedRegion);
      
      toast.success('Workspace settings updated successfully');
    } catch (error) {
      console.error('Error updating workspace:', error);
      toast.error('Failed to update workspace settings');
    }
  };

  return (
    <div className="flex-1 p-6 bg-gray-50">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center space-x-4">
          {onBackClick && (
            <Button
              variant="outline"
              onClick={onBackClick}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 border-gray-300 hover:bg-gray-100"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Workspaces</span>
            </Button>
          )}
          <div className="flex-1">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#7C3AED] to-[#D946EF] bg-clip-text text-transparent mb-2">
              Workspace Settings
            </h1>
            <p className="text-gray-600">Manage your workspace configuration and team settings</p>
          </div>
        </div>

        {/* General Settings */}
        <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 bg-white">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center space-x-2 text-xl font-semibold text-gray-900">
              <Building2 className="w-5 h-5 text-purple-600" />
              <span>General Settings</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="workspace-name">Workspace Name</Label>
                <Input
                  id="workspace-name"
                  value={workspaceName}
                  onChange={(e) => setWorkspaceName(e.target.value)}
                  className="border-gray-300 focus:border-purple-400 focus:ring-purple-500/20"
                />
              </div>
              <div className="space-y-2">
                <Label>Workspace Logo</Label>
                <div className="flex items-center space-x-4">
                  <Avatar className="w-16 h-16">
                    <AvatarFallback className="bg-gradient-to-br from-purple-100 to-pink-100 text-purple-600 text-lg font-semibold">
                      {workspaceName.charAt(0) || "W"}
                    </AvatarFallback>
                  </Avatar>
                  <Button variant="outline" size="sm" className="text-purple-600 border-purple-200 hover:bg-purple-50">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Logo
                  </Button>
                </div>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Industry</Label>
                <CustomSelect
                  options={industries}
                  value={selectedIndustry}
                  onValueChange={setSelectedIndustry}
                  placeholder="Select industry"
                />
              </div>
              <div className="space-y-2">
                <Label>Country/Location</Label>
                <CustomSelect
                  options={countries}
                  value={selectedCountry}
                  onValueChange={setSelectedCountry}
                  placeholder="Select country"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Primary Operating Region</Label>
              <CustomSelect
                options={regions}
                value={selectedRegion}
                onValueChange={setSelectedRegion}
                placeholder="Select your primary region"
              />
              <p className="text-xs text-muted-foreground">
                This determines which regional portals appear in your AI Sales Automation integrations
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Short Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your workspace and business..."
                className="border-gray-300 focus:border-purple-400 focus:ring-purple-500/20"
                rows={3}
              />
            </div>
            <Button 
              onClick={handleSaveSettings}
              className="bg-gradient-to-r from-[#7C3AED] to-[#D946EF] hover:from-purple-700 hover:to-pink-600 text-white"
            >
              Save Changes
            </Button>
          </CardContent>
        </Card>

        {/* Team Members & Access Control */}
        <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 bg-white">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-xl font-semibold text-gray-900">
                <Users className="w-5 h-5 text-purple-600" />
                <span>Team Members & Access Control</span>
              </div>
              <Button size="sm" className="bg-gradient-to-r from-[#7C3AED] to-[#D946EF] hover:from-purple-700 hover:to-pink-600 text-white">
                <UserPlus className="w-4 h-4 mr-2" />
                Invite Member
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {teamMembers.map((member) => (
                <div key={member.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarFallback className="bg-gradient-to-br from-blue-100 to-purple-100 text-purple-600">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-gray-900">{member.name}</p>
                      <p className="text-sm text-gray-500">{member.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CustomSelect
                      options={roles}
                      value={member.role}
                      onValueChange={() => {}}
                      className="w-32"
                    />
                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-red-500">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Plan & Usage */}
        <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 bg-white">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center space-x-2 text-xl font-semibold text-gray-900">
              <CreditCard className="w-5 h-5 text-purple-600" />
              <span>Plan & Usage</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-900">Current Plan</h3>
                <div className="flex items-center space-x-2 mt-1">
                  <Badge className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border-purple-200">
                    Professional
                  </Badge>
                </div>
              </div>
              <Button className="bg-gradient-to-r from-[#7C3AED] to-[#D946EF] hover:from-purple-700 hover:to-pink-600 text-white">
                Upgrade Plan
              </Button>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Posts Created</span>
                  <span className="text-gray-900">142 / 500</span>
                </div>
                <Progress value={28} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Campaigns Active</span>
                  <span className="text-gray-900">8 / 25</span>
                </div>
                <Progress value={32} className="h-2" />
              </div>
            </div>
            <Button variant="outline" className="w-full text-purple-600 border-purple-200 hover:bg-purple-50">
              View Invoices & Payment Method
            </Button>
          </CardContent>
        </Card>

        {/* AI & Automation Preferences */}
        <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 bg-white">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center space-x-2 text-xl font-semibold text-gray-900">
              <Settings className="w-5 h-5 text-purple-600" />
              <span>AI & Automation Preferences</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base font-medium">Enable AI Suggestions</Label>
                <p className="text-sm text-gray-500 mt-1">Get AI-powered content recommendations</p>
              </div>
              <Switch checked={aiSuggestions} onCheckedChange={setAiSuggestions} />
            </div>
            <div className="space-y-2">
              <Label>Preferred AI Model</Label>
              <CustomSelect
                options={aiModels}
                value={selectedAiModel}
                onValueChange={setSelectedAiModel}
                className="w-full"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base font-medium">Enable Smart Automations</Label>
                <p className="text-sm text-gray-500 mt-1">Automatically optimize campaigns and posts</p>
              </div>
              <Switch checked={smartAutomations} onCheckedChange={setSmartAutomations} />
            </div>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="border border-red-200 shadow-sm bg-white">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center space-x-2 text-xl font-semibold text-red-600">
              <AlertTriangle className="w-5 h-5" />
              <span>Danger Zone</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-4 border border-red-200 rounded-lg bg-red-50">
              <h3 className="font-semibold text-red-800 mb-2">Delete Workspace</h3>
              <p className="text-sm text-red-600 mb-4">
                Once you delete this workspace, there is no going back. Please be certain.
              </p>
              <Button variant="destructive" className="bg-red-600 hover:bg-red-700">
                Delete Workspace
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
