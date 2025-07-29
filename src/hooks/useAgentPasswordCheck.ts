import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export function useAgentPasswordCheck() {
  const [needsPasswordChange, setNeedsPasswordChange] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user, userRole } = useAuth();

  useEffect(() => {
    checkPasswordChangeRequired();
  }, [user, userRole]);

  const checkPasswordChangeRequired = async () => {
    if (!user || userRole !== 'agent') {
      setNeedsPasswordChange(false);
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('agents')
        .select('first_login_password_changed')
        .eq('user_id', user.id)
        .single();

      if (error) {
        console.error('Error checking password change requirement:', error);
        return;
      }

      setNeedsPasswordChange(!data?.first_login_password_changed);
    } catch (error) {
      console.error('Error checking password change requirement:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const markPasswordChanged = () => {
    setNeedsPasswordChange(false);
  };

  return {
    needsPasswordChange,
    isLoading,
    markPasswordChanged,
    checkPasswordChangeRequired
  };
}