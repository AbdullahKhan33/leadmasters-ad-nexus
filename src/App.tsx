import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthProvider } from './context/AuthContext';
import { PremiumProvider } from './context/PremiumContext';
import { WorkspaceProvider } from './context/WorkspaceContext';
import Index from './pages/public/Index';
import LoginPage from './pages/public/LoginPage';
import AboutUsPage from './pages/public/AboutUsPage';
import FeaturesPage from './pages/public/FeaturesPage';
import PricingPage from './pages/public/PricingPage';
import ContactPage from './pages/public/ContactPage';
import LegalPage from './pages/public/LegalPage';
import Dashboard from './pages/protected/Dashboard';
import ProtectedRoute from './components/auth/ProtectedRoute';
import NotFound from './pages/public/NotFound';
import FloatingChatbot from './components/chatbot/FloatingChatbot';
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
import BlogPage from './components/public/BlogPage';
import { BlogPostDetail } from './components/public/BlogPostDetail';

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
                  <Route path="/" element={<Index />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/about" element={<AboutUsPage />} />
                  <Route path="/features" element={<FeaturesPage />} />
                  <Route path="/pricing" element={<PricingPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/blog" element={<BlogPage />} />
                  <Route path="/blog/:id" element={<BlogPostDetail />} />
                  <Route path="/legal/*" element={<LegalPage />} />
                  
                  {/* Protected routes */}
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
