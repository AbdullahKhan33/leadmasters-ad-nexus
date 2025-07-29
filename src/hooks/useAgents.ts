import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface Agent {
  id: string;
  user_id: string;
  agent_code: string;
  status: string;
  assigned_leads_count: number;
  total_leads_handled: number;
  performance_score?: number;
  specialization: string[];
  created_at: string;
  updated_at: string;
  // Joined data from profiles
  display_name?: string;
  email?: string;
  phone?: string;
}

export interface AgentLeadAssignment {
  id: string;
  agent_id: string;
  lead_id: string;
  assigned_at: string;
  assigned_by?: string;
  status: string;
  notes?: string;
}

export function useAgents() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user, userRole } = useAuth();

  const fetchAgents = async () => {
    if (!user) return;

    try {
      setIsLoading(true);
      
      // First get agents
      let agentsQuery = supabase.from('agents').select('*');
      
      // If user is not admin, only show their own agent record
      if (userRole !== 'admin') {
        agentsQuery = agentsQuery.eq('user_id', user.id);
      }

      const { data: agentsData, error: agentsError } = await agentsQuery;

      if (agentsError) {
        setError(agentsError.message);
        return;
      }

      // Then get profiles for those agents
      const userIds = agentsData.map(agent => agent.user_id);
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('user_id, display_name, email, phone')
        .in('user_id', userIds);

      if (profilesError) {
        console.warn('Failed to fetch profiles:', profilesError);
      }

      // Combine the data
      const combinedAgents = agentsData.map(agent => {
        const profile = profilesData?.find(p => p.user_id === agent.user_id);
        return {
          ...agent,
          display_name: profile?.display_name,
          email: profile?.email,
          phone: profile?.phone,
        };
      });

      setAgents(combinedAgents as Agent[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const createAgent = async (agentData: {
    user_id: string;
    agent_code: string;
    status?: string;
    specialization?: string[];
  }) => {
    try {
      const { data, error } = await supabase
        .from('agents')
        .insert([agentData])
        .select()
        .single();

      if (error) {
        throw error;
      }

      await fetchAgents();
      return data;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to create agent');
    }
  };

  const updateAgent = async (agentId: string, updates: Partial<Agent>) => {
    try {
      const { data, error } = await supabase
        .from('agents')
        .update(updates)
        .eq('id', agentId)
        .select()
        .single();

      if (error) {
        throw error;
      }

      await fetchAgents();
      return data;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to update agent');
    }
  };

  const deleteAgent = async (agentId: string) => {
    try {
      const { error } = await supabase
        .from('agents')
        .delete()
        .eq('id', agentId);

      if (error) {
        throw error;
      }

      await fetchAgents();
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to delete agent');
    }
  };

  const assignLeadToAgent = async (leadId: string, agentId: string, notes?: string) => {
    try {
      // First, update the lead with the assigned agent
      const { error: leadError } = await supabase
        .from('leads')
        .update({ assigned_agent_id: agentId })
        .eq('id', leadId);

      if (leadError) {
        throw leadError;
      }

      // Then, create the assignment record
      const { data, error } = await supabase
        .from('agent_lead_assignments')
        .insert([{
          agent_id: agentId,
          lead_id: leadId,
          assigned_by: user?.id,
          status: 'assigned',
          notes
        }])
        .select()
        .single();

      if (error) {
        throw error;
      }

      // Update agent's assigned leads count manually
      const { data: currentAgent } = await supabase
        .from('agents')
        .select('assigned_leads_count')
        .eq('id', agentId)
        .single();

      if (currentAgent) {
        await supabase
          .from('agents')
          .update({ assigned_leads_count: (currentAgent.assigned_leads_count || 0) + 1 })
          .eq('id', agentId);
      }

      await fetchAgents();
      return data;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to assign lead');
    }
  };

  useEffect(() => {
    if (user && userRole) {
      fetchAgents();
    }
  }, [user, userRole]);

  return {
    agents,
    isLoading,
    error,
    fetchAgents,
    createAgent,
    updateAgent,
    deleteAgent,
    assignLeadToAgent,
  };
}