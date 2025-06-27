
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/ui/logo';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Zap, MessageCircle, BarChart3 } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export function PublicHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { showLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const navigationItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about-us' },
    { name: 'Blog', path: '/blog' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Contact', path: '/contact' }
  ];

  const features = [
    {
      title: "AI Ad Builder",
      description: "Create high-converting ads in minutes",
      icon: Zap,
      href: "#features"
    },
    {
      title: "WhatsApp Marketing",
      description: "Automate customer engagement",
      icon: MessageCircle,
      href: "#features"
    },
    {
      title: "Smart Analytics",
      description: "Track performance with AI insights",
      icon: BarChart3,
      href: "#features"
    }
  ];

  const handleNavigation = (path: string) => {
    if (path.startsWith('#')) {
      const element = document.getElementById(path.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(path);
    }
    setIsMobileMenuOpen(false);
  };

  const handleLogin = () => {
    showLogin();
  };

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => navigate('/')}
          >
            <Logo className="w-8 h-8 group-hover:scale-110 transition-transform duration-200" />
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                LeadMasters.ai
              </h1>
              <p className="text-xs text-gray-500 -mt-1">AI-Powered Growth</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList className="space-x-2">
              <NavigationMenuItem>
                <button
                  onClick={() => handleNavigation('/')}
                  className={`px-4 py-2 text-sm font-medium transition-colors rounded-lg ${
                    isActivePath('/')
                      ? 'text-purple-600 bg-purple-50' 
                      : 'text-gray-700 hover:text-purple-600 hover:bg-gray-50'
                  }`}
                >
                  Home
                </button>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-gray-700 hover:text-purple-600 font-medium">
                  Features
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-80 gap-3 p-4">
                    {features.map((feature) => (
                      <div
                        key={feature.title}
                        className="group grid h-auto w-full items-center justify-start gap-1 rounded-md p-4 text-sm font-medium hover:bg-gray-50 cursor-pointer"
                        onClick={() => handleNavigation(feature.href)}
                      >
                        <div className="flex items-center gap-3">
                          <feature.icon className="h-5 w-5 text-purple-600" />
                          <div>
                            <div className="font-semibold text-gray-900">{feature.title}</div>
                            <div className="text-gray-500">{feature.description}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {navigationItems.slice(1).map((item) => (
                <NavigationMenuItem key={item.path}>
                  <button
                    onClick={() => handleNavigation(item.path)}
                    className={`px-4 py-2 text-sm font-medium transition-colors rounded-lg ${
                      isActivePath(item.path)
                        ? 'text-purple-600 bg-purple-50' 
                        : 'text-gray-700 hover:text-purple-600 hover:bg-gray-50'
                    }`}
                  >
                    {item.name}
                  </button>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-purple-600 transition-colors p-2"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            <Button 
              variant="ghost"
              onClick={handleLogin}
              className="text-gray-700 hover:text-purple-600 hover:bg-purple-50"
            >
              Sign In
            </Button>
            <Button 
              onClick={handleLogin}
              className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white shadow-lg hover:shadow-xl"
            >
              Sign In
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-100 shadow-lg rounded-b-lg">
              {navigationItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={`block w-full text-left px-3 py-2 text-base font-medium transition-colors rounded-lg ${
                    isActivePath(item.path)
                      ? 'text-purple-600 bg-purple-50' 
                      : 'text-gray-700 hover:text-purple-600 hover:bg-gray-50'
                  }`}
                >
                  {item.name}
                </button>
              ))}
              
              <div className="pt-4 border-t border-gray-200 space-y-2">
                <Button 
                  variant="ghost"
                  onClick={handleLogin}
                  className="w-full justify-center text-gray-700"
                >
                  Sign In
                </Button>
                <Button 
                  onClick={handleLogin}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white"
                >
                  Sign In
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
