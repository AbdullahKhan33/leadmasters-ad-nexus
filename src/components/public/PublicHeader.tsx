
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/ui/logo';
import { useAuth } from '@/contexts/AuthContext';

export function PublicHeader() {
  const [activeSection, setActiveSection] = useState('home');
  const { showLogin } = useAuth();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  const handleLogin = () => {
    showLogin();
  };

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50 backdrop-blur-sm bg-white/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <Logo className="w-8 h-8" />
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                LeadMasters.ai
              </h1>
              <p className="text-xs text-gray-500 -mt-1">AI-Powered</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('home')}
              className={`text-sm font-medium transition-colors ${
                activeSection === 'home' 
                  ? 'text-purple-600' 
                  : 'text-gray-700 hover:text-purple-600'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className={`text-sm font-medium transition-colors ${
                activeSection === 'about' 
                  ? 'text-purple-600' 
                  : 'text-gray-700 hover:text-purple-600'
              }`}
            >
              About Us
            </button>
            <button
              onClick={() => scrollToSection('blog')}
              className={`text-sm font-medium transition-colors ${
                activeSection === 'blog' 
                  ? 'text-purple-600' 
                  : 'text-gray-700 hover:text-purple-600'
              }`}
            >
              Blog
            </button>
            <button
              onClick={() => scrollToSection('pricing')}
              className={`text-sm font-medium transition-colors ${
                activeSection === 'pricing' 
                  ? 'text-purple-600' 
                  : 'text-gray-700 hover:text-purple-600'
              }`}
            >
              Pricing
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className={`text-sm font-medium transition-colors ${
                activeSection === 'contact' 
                  ? 'text-purple-600' 
                  : 'text-gray-700 hover:text-purple-600'
              }`}
            >
              Contact Us
            </button>
          </nav>

          {/* Login Button */}
          <Button 
            onClick={handleLogin}
            className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white"
          >
            Login
          </Button>
        </div>
      </div>
    </header>
  );
}
