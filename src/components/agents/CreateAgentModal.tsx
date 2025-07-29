import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useAgents } from "@/hooks/useAgents";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, X, Plus } from "lucide-react";

interface CreateAgentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SPECIALIZATION_OPTIONS = [
  "Real Estate",
  "Insurance", 
  "Technology",
  "Healthcare",
  "Finance",
  "Education",
  "Retail",
  "Automotive",
  "B2B Sales",
  "B2C Sales"
];

export function CreateAgentModal({ open, onOpenChange }: CreateAgentModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    displayName: "",
    phone: "",
    agentCode: "",
    status: "active",
    specialization: [] as string[]
  });
  const [newSpecialization, setNewSpecialization] = useState("");
  const { createAgent } = useAgents();
  const { toast } = useToast();

  const generateAgentCode = () => {
    const code = 'AG' + Math.random().toString(36).substr(2, 6).toUpperCase();
    setFormData(prev => ({ ...prev, agentCode: code }));
  };

  const addSpecialization = (spec: string) => {
    if (spec && !formData.specialization.includes(spec)) {
      setFormData(prev => ({
        ...prev,
        specialization: [...prev.specialization, spec]
      }));
    }
    setNewSpecialization("");
  };

  const removeSpecialization = (spec: string) => {
    setFormData(prev => ({
      ...prev,
      specialization: prev.specialization.filter(s => s !== spec)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Call the edge function to create the agent
      const { data, error } = await supabase.functions.invoke("create-agent-user", {
        body: {
          email: formData.email,
          displayName: formData.displayName,
          phone: formData.phone,
          agentCode: formData.agentCode,
          status: formData.status,
          specialization: formData.specialization,
        },
      });

      if (error) {
        throw new Error(`Failed to create agent: ${error.message}`);
      }

      if (data.error) {
        throw new Error(data.error);
      }

      toast({
        title: "Success",
        description: "Agent created successfully. Welcome email sent with login instructions."
      });

      // Reset form
      setFormData({
        email: "",
        displayName: "",
        phone: "",
        agentCode: "",
        status: "active",
        specialization: []
      });
      onOpenChange(false);

    } catch (error) {
      console.error('Error creating agent:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create agent",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Agent</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              placeholder="agent@example.com"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="displayName">Display Name *</Label>
            <Input
              id="displayName"
              value={formData.displayName}
              onChange={(e) => setFormData(prev => ({ ...prev, displayName: e.target.value }))}
              placeholder="John Doe"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              placeholder="+1 (555) 123-4567"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="agentCode">Agent Code *</Label>
            <div className="flex gap-2">
              <Input
                id="agentCode"
                value={formData.agentCode}
                onChange={(e) => setFormData(prev => ({ ...prev, agentCode: e.target.value.toUpperCase() }))}
                placeholder="AG123456"
                required
              />
              <Button type="button" variant="outline" onClick={generateAgentCode}>
                Generate
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={formData.status} onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Specialization</Label>
            <div className="flex gap-2">
              <Select value={newSpecialization} onValueChange={setNewSpecialization}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Add specialization" />
                </SelectTrigger>
                <SelectContent>
                  {SPECIALIZATION_OPTIONS.map(option => (
                    <SelectItem key={option} value={option}>{option}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button 
                type="button" 
                variant="outline" 
                size="sm"
                onClick={() => addSpecialization(newSpecialization)}
                disabled={!newSpecialization}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            
            {formData.specialization.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {formData.specialization.map(spec => (
                  <Badge key={spec} variant="secondary" className="flex items-center gap-1">
                    {spec}
                    <X 
                      className="w-3 h-3 cursor-pointer hover:text-red-600" 
                      onClick={() => removeSpecialization(spec)}
                    />
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Create Agent
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}