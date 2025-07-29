
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  session: Session | null;
  userRole: string | null;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Force immediate logout on page load to clear any existing sessions
    const forceLogout = async () => {
      try {
        await supabase.auth.signOut({ scope: 'global' });
        localStorage.clear();
        sessionStorage.clear();
        
        // Clear all cookies
        document.cookie.split(";").forEach((c) => {
          document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
        });
      } catch (error) {
        console.log('Error during force logout:', error);
      }
    };
    
    // Force logout immediately
    forceLogout();
    
    // Set up auth state listener AFTER force logout
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email);
        setSession(session);
        setUser(session?.user ?? null);
        setIsAuthenticated(!!session);

        // Fetch user role if authenticated
        if (session?.user) {
          setTimeout(async () => {
            try {
              const { data, error } = await supabase
                .from('user_roles')
                .select('role')
                .eq('user_id', session.user.id)
                .maybeSingle(); // Use maybeSingle instead of single to handle no rows
              
              if (!error && data) {
                setUserRole(data.role);
              } else {
                setUserRole('user'); // Default to user role if no role found
              }
            } catch (error) {
              console.error('Error fetching user role:', error);
              setUserRole('user'); // Default to user role on error
            }
          }, 0);
        } else {
          setUserRole(null);
        }
        
        setIsLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const logout = async () => {
    console.log('Logging out - clearing auth state');
    try {
      // Clear local state first
      setIsAuthenticated(false);
      setUser(null);
      setSession(null);
      setUserRole(null);
      
      // Clear all browser storage completely
      localStorage.clear();
      sessionStorage.clear();
      
      // Clear all cookies
      document.cookie.split(";").forEach((c) => {
        document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
      });
      
      // Clear Supabase specific storage keys
      const supabaseKeys = Object.keys(localStorage).filter(key => 
        key.startsWith('sb-') || key.includes('supabase') || key.includes('auth')
      );
      supabaseKeys.forEach(key => localStorage.removeItem(key));
      
      // Sign out from Supabase with all scopes
      await supabase.auth.signOut({ scope: 'global' });
      
      // Force a complete page reload to root
      window.location.replace('/');
    } catch (error) {
      console.error('Error during logout:', error);
      // Force redirect even if signOut fails
      window.location.replace('/');
    }
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      user,
      session,
      userRole,
      logout,
      isLoading
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
