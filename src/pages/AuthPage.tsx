import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PublicHeader } from '@/components/public/PublicHeader';
import { AuthForm } from '@/components/auth/AuthForm';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

export function AuthPage() {
  const { isAuthenticated, isLoading, user } = useAuth();
  const navigate = useNavigate();
  const [isCheckingRole, setIsCheckingRole] = useState(false);

  useEffect(() => {
    const handleAuthenticatedUser = async () => {
      if (isAuthenticated && user && !isCheckingRole) {
        setIsCheckingRole(true);
        
        try {
          // Check user role to determine redirect
          const { data: roleData, error } = await supabase
            .from('user_roles')
            .select('role')
            .eq('user_id', user.id)
            .single();

          if (error) {
            console.error('Error fetching user role:', error);
            navigate('/app'); // Fallback to default route
            return;
          }

          // Navigate to appropriate page based on role
          if (roleData.role === 'agent') {
            // For agents, go directly to dashboard
            navigate('/app', { state: { view: 'dashboard' } });
          } else {
            // For admins, go to main app (will handle workspace logic)
            navigate('/app');
          }
        } catch (error) {
          console.error('Error handling authentication:', error);
          navigate('/app');
        } finally {
          setIsCheckingRole(false);
        }
      }
    };

    handleAuthenticatedUser();
  }, [isAuthenticated, user, navigate, isCheckingRole]);

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

  const handleAuthSuccess = () => {
    navigate('/app');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <PublicHeader />
      
      <div className="flex items-center justify-center p-4 pt-8">
        <div className="w-full max-w-md space-y-8">
          {/* Logo/Brand */}
          <div className="text-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-[#7C3AED] to-[#D946EF] bg-clip-text text-transparent">
              LeadMasters
            </h1>
            <p className="text-gray-600 mt-2">Welcome to your dashboard</p>
          </div>

          <AuthForm onAuthSuccess={handleAuthSuccess} />
        </div>
      </div>
    </div>
  );
}