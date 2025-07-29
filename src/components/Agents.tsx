
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { AgentManagement } from "./agents/AgentManagement";
import { AgentDashboard } from "./agents/AgentDashboard";
import { AgentAnalytics } from "./agents/AgentAnalytics";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function Agents() {
  const { userRole } = useAuth();

  if (userRole === 'admin') {
    return (
      <Tabs defaultValue="management" className="p-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="management">Agent Management</TabsTrigger>
          <TabsTrigger value="analytics">Performance Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="management">
          <AgentManagement />
        </TabsContent>
        <TabsContent value="analytics">
          <AgentAnalytics />
        </TabsContent>
      </Tabs>
    );
  }

  if (userRole === 'agent') {
    return <AgentDashboard />;
  }

  return (
    <div className="flex items-center justify-center h-64">
      <p className="text-gray-500">Access denied. Please contact your administrator.</p>
    </div>
  );
}
