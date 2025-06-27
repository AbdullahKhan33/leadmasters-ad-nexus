
import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  user: { username: string } | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  showLogin: () => void;
  isLoginVisible: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ username: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoginVisible, setIsLoginVisible] = useState(false);

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
      setIsLoginVisible(false);
      console.log('Login successful');
      return true;
    }
    console.log('Login failed');
    return false;
  };

  const logout = () => {
    console.log('Logging out...');
    // Clear localStorage first
    localStorage.removeItem('leadmasters_auth');
    // Then update state synchronously
    setUser(null);
    setIsAuthenticated(false);
    setIsLoginVisible(false);
    console.log('Logout completed');
  };

  const showLogin = () => {
    setIsLoginVisible(true);
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      user, 
      login, 
      logout, 
      isLoading, 
      showLogin, 
      isLoginVisible 
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
