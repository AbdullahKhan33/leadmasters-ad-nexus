
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginScreen } from '@/components/LoginScreen';
import { useAuth } from '@/contexts/AuthContext';

export function LoginPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/app');
    }
  }, [isAuthenticated, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (isAuthenticated) {
    return null; // Will redirect in useEffect
  }

  return <LoginScreen />;
}
