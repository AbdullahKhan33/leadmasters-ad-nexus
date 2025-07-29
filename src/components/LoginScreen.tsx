
import { useNavigate } from "react-router-dom";
import { PublicHeader } from "@/components/public/PublicHeader";
import { AuthForm } from "@/components/auth/AuthForm";

export function LoginScreen() {
  const navigate = useNavigate();

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
            <p className="text-gray-600 mt-2">Welcome back to your dashboard</p>
          </div>

          <AuthForm onAuthSuccess={handleAuthSuccess} />
        </div>
      </div>
    </div>
  );
}
