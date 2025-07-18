
import React, { createContext, useContext, useState } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  user: { username: string } | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  showLogin: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ username: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (username: string, password: string): Promise<boolean> => {
    console.log('Attempting login with:', username);
    // Simple authentication check
    if (username === 'admin' && password === 'admin') {
      setIsAuthenticated(true);
      setUser({ username });
      console.log('Login successful');
      return true;
    }
    console.log('Login failed');
    return false;
  };

  const logout = () => {
    console.log('Logging out - clearing auth state');
    // Clear authentication state immediately
    setIsAuthenticated(false);
    setUser(null);
    
    // Clear any stored session data
    localStorage.clear();
    sessionStorage.clear();
    
    // Use setTimeout to ensure state is cleared before redirect
    setTimeout(() => {
      // Force a complete reload to the home page
      window.location.replace('/');
    }, 100);
  };

  const showLogin = () => {
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      user, 
      login, 
      logout, 
      showLogin,
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
