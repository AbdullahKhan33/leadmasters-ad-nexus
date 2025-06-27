
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/ui/logo';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export function PublicHeader() {
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { showLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const navigationItems = [
    { name: 'Home', path: '/', id: 'home' },
    { name: 'About Us', path: '/about-us', id: 'about' },
    { name: 'Blog', path: '/blog', id: 'blog' },
    { name: 'Pricing', path: '/pricing', id: 'pricing' },
    { name: 'Contact Us', path: '/contact', id: 'contact' }
  ];

  const handleNavigation = (path: string, id: string) => {
    if (path === '/' && location.pathname === '/') {
      // If we're on the home page and clicking home, scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (path === '/' && id !== 'home') {
      // If we're navigating to a section on the home page from another page
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else if (location.pathname === '/' && id !== 'home') {
      // If we're on the home page and clicking a section link
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Navigate to the specific page
      navigate(path);
    }
    setActiveSection(id);
    setIsMobileMenuOpen(false);
  };

  const handleLogin = () => {
    showLogin();
  };

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50 backdrop-blur-sm bg-white/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => navigate('/')}
          >
            <Logo className="w-8 h-8" />
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                LeadMasters.ai
              </h1>
              <p className="text-xs text-gray-500 -mt-1">AI-Powered</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.path, item.id)}
                className={`text-sm font-medium transition-colors ${
                  isActivePath(item.path)
                    ? 'text-purple-600' 
                    : 'text-gray-700 hover:text-purple-600'
                }`}
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-purple-600 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Login Button - Desktop */}
          <Button 
            onClick={handleLogin}
            className="hidden md:block bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white"
          >
            Login
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-100">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.path, item.id)}
                  className={`block w-full text-left px-3 py-2 text-base font-medium transition-colors ${
                    isActivePath(item.path)
                      ? 'text-purple-600 bg-purple-50' 
                      : 'text-gray-700 hover:text-purple-600 hover:bg-gray-50'
                  }`}
                >
                  {item.name}
                </button>
              ))}
              <Button 
                onClick={handleLogin}
                className="w-full mt-4 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white"
              >
                Login
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
