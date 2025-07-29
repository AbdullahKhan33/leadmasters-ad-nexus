
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
    // Set up auth state listener FIRST
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
                .single();
              
              if (!error && data) {
                setUserRole(data.role);
              }
            } catch (error) {
              console.error('Error fetching user role:', error);
            }
          }, 0);
        } else {
          setUserRole(null);
        }
        
        setIsLoading(false);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Initial session check:', session?.user?.email);
      setSession(session);
      setUser(session?.user ?? null);
      setIsAuthenticated(!!session);
      
      if (session?.user) {
        setTimeout(async () => {
          try {
            const { data, error } = await supabase
              .from('user_roles')
              .select('role')
              .eq('user_id', session.user.id)
              .single();
            
            if (!error && data) {
              setUserRole(data.role);
            }
          } catch (error) {
            console.error('Error fetching user role:', error);
          }
        }, 0);
      }
      
      setIsLoading(false);
    });

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
      
      // Clear all storage
      localStorage.clear();
      sessionStorage.clear();
      
      // Sign out from Supabase (this may fail if session is already invalid)
      await supabase.auth.signOut({ scope: 'global' });
      
      // Force a complete reload to the home page
      window.location.replace('/');
    } catch (error) {
      console.error('Error during logout:', error);
      // Even if signOut fails, still redirect to ensure logout
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
