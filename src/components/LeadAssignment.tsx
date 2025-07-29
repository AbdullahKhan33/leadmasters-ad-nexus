import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { LeadAssignmentWorkflow } from "./leads/LeadAssignmentWorkflow";
import { AutoAssignmentRules } from "./leads/AutoAssignmentRules";
import { UserCheck, Settings } from "lucide-react";

export function LeadAssignment() {
  const { userRole } = useAuth();

  if (userRole !== 'admin') {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Access denied. Admin privileges required.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Lead Assignment</h1>
        <p className="text-gray-600">Manage lead assignments and automation rules</p>
      </div>

      <Tabs defaultValue="manual" className="w-full">
        <TabsList>
          <TabsTrigger value="manual" className="flex items-center gap-2">
            <UserCheck className="w-4 h-4" />
            Manual Assignment
          </TabsTrigger>
          <TabsTrigger value="rules" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Auto-Assignment Rules
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="manual" className="mt-6">
          <LeadAssignmentWorkflow />
        </TabsContent>
        
        <TabsContent value="rules" className="mt-6">
          <AutoAssignmentRules />
        </TabsContent>
      </Tabs>
    </div>
  );
}