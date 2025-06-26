
import { useLocation } from "react-router-dom";
import { useWorkspace } from "@/contexts/WorkspaceContext";

export function useChatbotVisibility() {
  const location = useLocation();
  const { isInWorkspace } = useWorkspace();

  // Define routes where chatbot should NOT be visible
  const hiddenRoutes = [
    '/login',
    '/register',
    '/auth',
    '/signup',
    '/signin'
  ];

  // Check if current route should hide chatbot
  const shouldHideChatbot = hiddenRoutes.some(route => 
    location.pathname.toLowerCase().includes(route)
  );

  // Show chatbot on authenticated screens
  // This includes dashboard, CRM, automations, services, settings, etc.
  const shouldShowChatbot = !shouldHideChatbot && (
    isInWorkspace || 
    location.pathname === '/' ||
    location.pathname.startsWith('/crm') ||
    location.pathname.startsWith('/post-builder') ||
    location.pathname.startsWith('/ad-builder')
  );

  return shouldShowChatbot;
}
