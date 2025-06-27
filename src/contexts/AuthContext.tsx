
import React, { createContext, useContext, useState, useEffect } from 'react';
import { LoginScreen } from '@/components/LoginScreen';

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
  const [isLoading, setIsLoading] = useState(true);
  const [isLoginVisible, setIsLoginVisible] = useState(false);

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
    console.log('showLogin called - current state:', { isAuthenticated, isLoginVisible });
    setIsLoginVisible(true);
    console.log('showLogin - setting isLoginVisible to true');
  };

  // Debug effect to monitor state changes
  useEffect(() => {
    console.log('Auth state changed:', { isAuthenticated, isLoginVisible });
  }, [isAuthenticated, isLoginVisible]);

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
      {/* Always show modal when isLoginVisible is true, regardless of auth status for debugging */}
      {isLoginVisible && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full">
            <button 
              onClick={() => {
                console.log('Close button clicked');
                setIsLoginVisible(false);
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors text-2xl font-bold z-10"
            >
              ✕
            </button>
            <div className="p-6">
              <LoginScreen />
            </div>
          </div>
        </div>
      )}
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
