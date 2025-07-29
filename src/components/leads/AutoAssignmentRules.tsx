import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Settings, 
  Zap, 
  Users, 
  Target, 
  Clock, 
  TrendingUp,
  Save,
  RotateCcw
} from "lucide-react";

interface AutoAssignmentRule {
  id?: string;
  name: string;
  enabled: boolean;
  criteria: {
    source?: string[];
    aiScoreMin?: number;
    aiScoreMax?: number;
    priority?: string;
  };
  assignment_method: 'round_robin' | 'least_load' | 'specialization' | 'performance';
  agent_filters: {
    specialization?: string[];
    minPerformance?: number;
    maxLeads?: number;
  };
  description?: string;
}

const DEFAULT_RULE: AutoAssignmentRule = {
  name: "",
  enabled: true,
  criteria: {},
  assignment_method: 'least_load',
  agent_filters: {},
  description: ""
};

export function AutoAssignmentRules() {
  const [rules, setRules] = useState<AutoAssignmentRule[]>([]);
  const [editingRule, setEditingRule] = useState<AutoAssignmentRule | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();
  const { userRole } = useAuth();

  useEffect(() => {
    fetchRules();
  }, []);

  const fetchRules = async () => {
    try {
      const { data, error } = await supabase
        .from('auto_assignment_rules')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRules(data || []);
    } catch (error) {
      console.error('Error fetching rules:', error);
      toast({
        title: "Error",
        description: "Failed to load assignment rules",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const saveRule = async (rule: AutoAssignmentRule) => {
    setIsSaving(true);
    try {
      if (rule.id) {
        // Update existing rule
        const { error } = await supabase
          .from('auto_assignment_rules')
          .update({
            name: rule.name,
            enabled: rule.enabled,
            criteria: rule.criteria,
            assignment_method: rule.assignment_method,
            agent_filters: rule.agent_filters,
            description: rule.description
          })
          .eq('id', rule.id);

        if (error) throw error;
      } else {
        // Create new rule
        const { error } = await supabase
          .from('auto_assignment_rules')
          .insert([{
            name: rule.name,
            enabled: rule.enabled,
            criteria: rule.criteria,
            assignment_method: rule.assignment_method,
            agent_filters: rule.agent_filters,
            description: rule.description
          }]);

        if (error) throw error;
      }

      toast({
        title: "Success",
        description: `Assignment rule ${rule.id ? 'updated' : 'created'} successfully`
      });

      await fetchRules();
      setEditingRule(null);
    } catch (error) {
      console.error('Error saving rule:', error);
      toast({
        title: "Error",
        description: "Failed to save assignment rule",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  const toggleRule = async (ruleId: string, enabled: boolean) => {
    try {
      const { error } = await supabase
        .from('auto_assignment_rules')
        .update({ enabled })
        .eq('id', ruleId);

      if (error) throw error;

      setRules(rules.map(rule => 
        rule.id === ruleId ? { ...rule, enabled } : rule
      ));

      toast({
        title: "Success",
        description: `Rule ${enabled ? 'enabled' : 'disabled'} successfully`
      });
    } catch (error) {
      console.error('Error toggling rule:', error);
      toast({
        title: "Error",
        description: "Failed to update rule status",
        variant: "destructive"
      });
    }
  };

  const getMethodBadge = (method: string) => {
    const badges = {
      'round_robin': <Badge variant="outline" className="text-blue-600">Round Robin</Badge>,
      'least_load': <Badge variant="outline" className="text-green-600">Least Load</Badge>,
      'specialization': <Badge variant="outline" className="text-purple-600">Specialization</Badge>,
      'performance': <Badge variant="outline" className="text-yellow-600">Performance</Badge>
    };
    return badges[method as keyof typeof badges] || <Badge variant="outline">{method}</Badge>;
  };

  if (userRole !== 'admin') {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Access denied. Admin privileges required.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Settings className="w-6 h-6" />
            Auto-Assignment Rules
          </h1>
          <p className="text-gray-600">Configure automatic lead assignment based on criteria</p>
        </div>
        <Button 
          onClick={() => setEditingRule(DEFAULT_RULE)}
          className="flex items-center gap-2"
        >
          <Zap className="w-4 h-4" />
          Create Rule
        </Button>
      </div>

      {/* Rules List */}
      <div className="grid gap-4">
        {rules.map((rule) => (
          <Card key={rule.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CardTitle className="text-lg">{rule.name}</CardTitle>
                  {getMethodBadge(rule.assignment_method)}
                  <Badge variant={rule.enabled ? "default" : "secondary"}>
                    {rule.enabled ? "Active" : "Inactive"}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={rule.enabled}
                    onCheckedChange={(enabled) => toggleRule(rule.id!, enabled)}
                  />
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setEditingRule(rule)}
                  >
                    Edit
                  </Button>
                </div>
              </div>
              {rule.description && (
                <p className="text-sm text-gray-600">{rule.description}</p>
              )}
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <Label className="text-xs font-medium text-gray-500">CRITERIA</Label>
                  <div className="mt-1">
                    {rule.criteria.source && (
                      <div>Source: {rule.criteria.source.join(', ')}</div>
                    )}
                    {rule.criteria.aiScoreMin && (
                      <div>AI Score: {rule.criteria.aiScoreMin}-{rule.criteria.aiScoreMax || 10}</div>
                    )}
                    {rule.criteria.priority && (
                      <div>Priority: {rule.criteria.priority}</div>
                    )}
                  </div>
                </div>
                <div>
                  <Label className="text-xs font-medium text-gray-500">ASSIGNMENT METHOD</Label>
                  <div className="mt-1 capitalize">
                    {rule.assignment_method.replace('_', ' ')}
                  </div>
                </div>
                <div>
                  <Label className="text-xs font-medium text-gray-500">AGENT FILTERS</Label>
                  <div className="mt-1">
                    {rule.agent_filters.specialization && (
                      <div>Specialization: {rule.agent_filters.specialization.join(', ')}</div>
                    )}
                    {rule.agent_filters.maxLeads && (
                      <div>Max Leads: {rule.agent_filters.maxLeads}</div>
                    )}
                    {rule.agent_filters.minPerformance && (
                      <div>Min Performance: {rule.agent_filters.minPerformance}/10</div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {rules.length === 0 && !isLoading && (
          <Card className="text-center py-8">
            <CardContent>
              <Zap className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Assignment Rules</h3>
              <p className="text-gray-600 mb-4">Create your first auto-assignment rule to automate lead distribution</p>
              <Button onClick={() => setEditingRule(DEFAULT_RULE)}>
                Create Rule
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Edit Rule Modal */}
      {editingRule && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">
                {editingRule.id ? 'Edit Assignment Rule' : 'Create Assignment Rule'}
              </h2>
              <Button variant="ghost" onClick={() => setEditingRule(null)}>×</Button>
            </div>

            <div className="space-y-6">
              {/* Basic Info */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="rule-name">Rule Name</Label>
                  <Input
                    id="rule-name"
                    value={editingRule.name}
                    onChange={(e) => setEditingRule({...editingRule, name: e.target.value})}
                    placeholder="e.g., High Priority Leads"
                  />
                </div>
                <div>
                  <Label htmlFor="rule-description">Description</Label>
                  <Textarea
                    id="rule-description"
                    value={editingRule.description || ""}
                    onChange={(e) => setEditingRule({...editingRule, description: e.target.value})}
                    placeholder="Describe when this rule should apply..."
                    rows={2}
                  />
                </div>
              </div>

              {/* Assignment Method */}
              <div>
                <Label>Assignment Method</Label>
                <Select
                  value={editingRule.assignment_method}
                  onValueChange={(value: any) => setEditingRule({...editingRule, assignment_method: value})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="least_load">Least Load (Balanced)</SelectItem>
                    <SelectItem value="round_robin">Round Robin (Sequential)</SelectItem>
                    <SelectItem value="specialization">By Specialization</SelectItem>
                    <SelectItem value="performance">By Performance</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Criteria */}
              <div className="space-y-4">
                <Label className="text-base font-medium">Lead Criteria</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Min AI Score</Label>
                    <Input
                      type="number"
                      min="0"
                      max="10"
                      value={editingRule.criteria.aiScoreMin || ""}
                      onChange={(e) => setEditingRule({
                        ...editingRule,
                        criteria: {...editingRule.criteria, aiScoreMin: parseInt(e.target.value) || undefined}
                      })}
                    />
                  </div>
                  <div>
                    <Label>Max AI Score</Label>
                    <Input
                      type="number"
                      min="0"
                      max="10"
                      value={editingRule.criteria.aiScoreMax || ""}
                      onChange={(e) => setEditingRule({
                        ...editingRule,
                        criteria: {...editingRule.criteria, aiScoreMax: parseInt(e.target.value) || undefined}
                      })}
                    />
                  </div>
                </div>
              </div>

              {/* Agent Filters */}
              <div className="space-y-4">
                <Label className="text-base font-medium">Agent Filters</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Max Leads per Agent</Label>
                    <Input
                      type="number"
                      min="1"
                      value={editingRule.agent_filters.maxLeads || ""}
                      onChange={(e) => setEditingRule({
                        ...editingRule,
                        agent_filters: {...editingRule.agent_filters, maxLeads: parseInt(e.target.value) || undefined}
                      })}
                    />
                  </div>
                  <div>
                    <Label>Min Performance Score</Label>
                    <Input
                      type="number"
                      min="0"
                      max="10"
                      step="0.1"
                      value={editingRule.agent_filters.minPerformance || ""}
                      onChange={(e) => setEditingRule({
                        ...editingRule,
                        agent_filters: {...editingRule.agent_filters, minPerformance: parseFloat(e.target.value) || undefined}
                      })}
                    />
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button variant="outline" onClick={() => setEditingRule(null)}>
                  Cancel
                </Button>
                <Button 
                  onClick={() => saveRule(editingRule)}
                  disabled={!editingRule.name || isSaving}
                  className="flex items-center gap-2"
                >
                  {isSaving ? (
                    <Clock className="w-4 h-4 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  {editingRule.id ? 'Update Rule' : 'Create Rule'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}