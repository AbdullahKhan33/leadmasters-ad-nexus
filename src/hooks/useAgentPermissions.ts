import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface AgentPermissions {
  crm: boolean;
  post_builder: boolean;
  ad_builder?: boolean;
  analytics?: boolean;
  schedule?: boolean;
  content_hub?: boolean;
  social_logins?: boolean;
  inspiration_hub?: boolean;
}

export function useAgentPermissions() {
  const [permissions, setPermissions] = useState<AgentPermissions | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user, userRole } = useAuth();

  useEffect(() => {
    const fetchAgentPermissions = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }

      // If user is admin, they have all permissions
      if (userRole === 'admin') {
        setPermissions({
          crm: true,
          post_builder: true,
          ad_builder: true,
          analytics: true,
          schedule: true,
          content_hub: true,
          social_logins: true,
          inspiration_hub: true,
        });
        setIsLoading(false);
        return;
      }

      // If user is agent, fetch their specific permissions
      if (userRole === 'agent') {
        try {
          const { data: agentData, error } = await supabase
            .from('agents')
            .select('permissions')
            .eq('user_id', user.id)
            .single();

          if (error) {
            console.error('Error fetching agent permissions:', error);
            setPermissions(null);
          } else {
            const agentPermissions = agentData?.permissions;
            // Type-safe permission parsing
            if (agentPermissions && typeof agentPermissions === 'object' && !Array.isArray(agentPermissions)) {
              // Parse the permissions object safely
              const parsedPermissions: AgentPermissions = {
                crm: Boolean(agentPermissions.crm),
                post_builder: Boolean(agentPermissions.post_builder),
                ad_builder: Boolean(agentPermissions.ad_builder),
                analytics: Boolean(agentPermissions.analytics),
                schedule: Boolean(agentPermissions.schedule),
                content_hub: Boolean(agentPermissions.content_hub),
                social_logins: Boolean(agentPermissions.social_logins),
                inspiration_hub: Boolean(agentPermissions.inspiration_hub),
              };
              setPermissions(parsedPermissions);
            } else {
              setPermissions(null);
            }
          }
        } catch (error) {
          console.error('Error fetching agent permissions:', error);
          setPermissions(null);
        }
      } else {
        // Regular users get no permissions
        setPermissions(null);
      }

      setIsLoading(false);
    };

    fetchAgentPermissions();
  }, [user, userRole]);

  return { permissions, isLoading };
}