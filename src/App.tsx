import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './contexts/AuthContext';
import { PremiumProvider } from './contexts/PremiumContext';
import { WorkspaceProvider } from './contexts/WorkspaceContext';
import { PublicWebsite } from './components/PublicWebsite';
import { LoginPage } from './pages/LoginPage';
import { AboutUsPage } from './components/public/AboutUsPage';
import { FeaturesPage } from './components/public/FeaturesPage';
import { PricingPage } from './components/public/PricingPage';
import { ContactPage } from './components/public/ContactPage';
import { LegalPage } from './components/public/LegalPage';
import Dashboard from './pages/protected/Dashboard';
import { ProtectedRoute } from './components/ProtectedRoute';
import NotFound from './pages/NotFound';
import { FloatingChatbot } from './components/chatbot/FloatingChatbot';
import Settings from './pages/protected/Settings';
import Tasks from './pages/protected/Tasks';
import Team from './pages/protected/Team';
import Projects from './pages/protected/Projects';
import Clients from './pages/protected/Clients';
import CalendarPage from './pages/protected/CalendarPage';
import Files from './pages/protected/Files';
import Billing from './pages/protected/Billing';
import Integrations from './pages/protected/Integrations';
import Help from './pages/protected/Help';
import { BlogPage } from './components/public/BlogPage';
import { BlogPostDetail } from './components/public/BlogPostDetail';
import Index from './pages/Index';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <PremiumProvider>
          <WorkspaceProvider>
            <div className="App">
              <BrowserRouter>
                <Routes>
                  {/* Public routes */}
                  <Route path="/" element={<PublicWebsite />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/about" element={<AboutUsPage />} />
                  <Route path="/features" element={<FeaturesPage />} />
                  <Route path="/pricing" element={<PricingPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/blog" element={<BlogPage />} />
                  <Route path="/blog/:id" element={<BlogPostDetail />} />
                  <Route path="/legal/*" element={<LegalPage type="terms" />} />
                  
                  {/* Main application (workspace system) */}
                  <Route path="/app" element={
                    <ProtectedRoute>
                      <Index />
                    </ProtectedRoute>
                  } />
                  
                  {/* Protected routes - legacy, but keeping for compatibility */}
                  <Route path="/dashboard" element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/settings" element={
                    <ProtectedRoute>
                      <Settings />
                    </ProtectedRoute>
                  } />
                  <Route path="/tasks" element={
                    <ProtectedRoute>
                      <Tasks />
                    </ProtectedRoute>
                  } />
                  <Route path="/team" element={
                    <ProtectedRoute>
                      <Team />
                    </ProtectedRoute>
                  } />
                  <Route path="/projects" element={
                    <ProtectedRoute>
                      <Projects />
                    </ProtectedRoute>
                  } />
                  <Route path="/clients" element={
                    <ProtectedRoute>
                      <Clients />
                    </ProtectedRoute>
                  } />
                  <Route path="/calendar" element={
                    <ProtectedRoute>
                      <CalendarPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/files" element={
                    <ProtectedRoute>
                      <Files />
                    </ProtectedRoute>
                  } />
                  <Route path="/billing" element={
                    <ProtectedRoute>
                      <Billing />
                    </ProtectedRoute>
                  } />
                  <Route path="/integrations" element={
                    <ProtectedRoute>
                      <Integrations />
                    </ProtectedRoute>
                  } />
                  <Route path="/help" element={
                    <ProtectedRoute>
                      <Help />
                    </ProtectedRoute>
                  } />
                  
                  <Route path="*" element={<NotFound />} />
                </Routes>
                <FloatingChatbot />
              </BrowserRouter>
            </div>
          </WorkspaceProvider>
        </PremiumProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
