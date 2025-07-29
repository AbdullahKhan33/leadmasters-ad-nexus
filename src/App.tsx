
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { PremiumProvider } from "@/contexts/PremiumContext";
import { WorkspaceProvider } from "@/contexts/WorkspaceContext";
import Index from "./pages/Index";
import { AuthPage } from "./pages/AuthPage";
import { PostBuilderPage } from "./pages/PostBuilderPage";
import NotFound from "./pages/NotFound";
import { PublicWebsite } from "./components/PublicWebsite";
import { AboutUsPage } from "./components/public/AboutUsPage";
import { ContactPage } from "./components/public/ContactPage";
import { PricingPage } from "./components/public/PricingPage";
import { FeaturesPage } from "./components/public/FeaturesPage";
import { BlogPage } from "./components/public/BlogPage";
import { BlogPostPage } from "./components/public/BlogPostPage";
import { LegalPage } from "./components/public/LegalPage";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { CreateAgentPage } from "./pages/CreateAgentPage";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <PremiumProvider>
            <WorkspaceProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<PublicWebsite />} />
                  <Route path="/login" element={<AuthPage />} />
                  <Route path="/agents" element={<ProtectedRoute><Index /></ProtectedRoute>} />
                  <Route path="/agents/create" element={<ProtectedRoute><CreateAgentPage /></ProtectedRoute>} />
                  <Route path="/about-us" element={<AboutUsPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/pricing" element={<PricingPage />} />
                  <Route path="/features" element={<FeaturesPage />} />
                  <Route path="/blog" element={<BlogPage />} />
                  <Route path="/blog/:slug" element={<BlogPostPage />} />
                  <Route path="/terms-and-conditions" element={<LegalPage type="terms" />} />
                  <Route path="/privacy-policy" element={<LegalPage type="privacy" />} />
                  <Route path="/cancellation" element={<LegalPage type="refund" />} />
                  <Route path="/app" element={
                    <ProtectedRoute>
                      <Index />
                    </ProtectedRoute>
                  } />
                  <Route path="/app/post-builder" element={
                    <ProtectedRoute>
                      <PostBuilderPage />
                    </ProtectedRoute>
                  } />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </WorkspaceProvider>
          </PremiumProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
