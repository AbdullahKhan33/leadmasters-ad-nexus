
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already authenticated on app load
    const checkAuth = () => {
      try {
        const authData = localStorage.getItem('leadmasters_auth');
        if (authData) {
          const parsed = JSON.parse(authData);
          setIsAuthenticated(true);
          setUser(parsed.user);
          console.log('User already authenticated:', parsed.user);
        }
      } catch (error) {
        console.error('Error checking auth:', error);
        // Clear corrupted auth data
        localStorage.removeItem('leadmasters_auth');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    console.log('Attempting login with:', username);
    // Simple authentication check - in production this would be an API call
    if (username === 'admin' && password === 'admin') {
      const authData = {
        user: { username },
        timestamp: Date.now()
      };
      
      localStorage.setItem('leadmasters_auth', JSON.stringify(authData));
      setIsAuthenticated(true);
      setUser({ username });
      console.log('Login successful');
      return true;
    }
    console.log('Login failed');
    return false;
  };

  const logout = () => {
    console.log('Logging out...');
    
    // Clear localStorage FIRST
    localStorage.removeItem('leadmasters_auth');
    
    // Clear auth state
    setUser(null);
    setIsAuthenticated(false);
    
    console.log('Auth data cleared, redirecting to home page');
    
    // Navigate to root and force reload to ensure clean state
    window.location.href = '/';
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
