
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export function LogoutButton() {
  const { logout } = useAuth();
  const { toast } = useToast();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    
    // Show immediate feedback
    toast({
      title: "Signing out...",
      description: "Please wait",
    });

    // Small delay to ensure UI updates are visible
    setTimeout(() => {
      logout();
      setIsLoggingOut(false);
      toast({
        title: "Logged out",
        description: "You have been successfully logged out",
      });
    }, 100);
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleLogout}
      disabled={isLoggingOut}
      className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 disabled:opacity-50"
    >
      <LogOut className="w-4 h-4 mr-2" />
      {isLoggingOut ? "Signing out..." : "Logout"}
    </Button>
  );
}
