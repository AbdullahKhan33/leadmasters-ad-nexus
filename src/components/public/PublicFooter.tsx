import React from 'react';
import { Logo } from '@/components/ui/logo';
import { Separator } from '@/components/ui/separator';
import { MessageCircle, Linkedin, Instagram } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function PublicFooter() {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    scrollToTop();
  };

  const footerSections = {
    product: {
      title: "Product",
      links: [
        { name: "Features", action: () => handleNavigation('/') },
        { name: "Pricing", action: () => handleNavigation('/pricing') },
        { name: "Templates", action: () => handleNavigation('/') }
      ]
    },
    company: {
      title: "Company",
      links: [
        { name: "About Us", action: () => handleNavigation('/about-us') },
        { name: "Blog", action: () => handleNavigation('/blog') },
        { name: "Careers", action: () => handleNavigation('/') },
        { name: "Support", action: () => handleNavigation('/contact') },
        { name: "Help Center", action: () => handleNavigation('/contact') },
        { name: "Contact Us", action: () => handleNavigation('/contact') }
      ]
    },
    legal: {
      title: "Legal",
      links: [
        { name: "Terms of Service", action: () => handleNavigation('/terms-and-conditions') },
        { name: "Privacy Policy", action: () => handleNavigation('/privacy-policy') },
        { name: "Cancellation & Refund Policy", action: () => handleNavigation('/cancellation') }
      ]
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <Logo className="w-10 h-10" />
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  LeadMasters.ai
                </h3>
                <p className="text-sm text-gray-400 -mt-1">AI-Powered</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Simplifying lead generation for small businesses with AI-powered tools. 
              Get more leads, run better ads, and grow your business.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              <a
                href="#"
                className="bg-gray-800 hover:bg-gray-700 p-3 rounded-lg transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="bg-gray-800 hover:bg-gray-700 p-3 rounded-lg transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="bg-green-600 hover:bg-green-500 p-3 rounded-lg transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerSections).map(([key, section]) => (
            <div key={key}>
              <h4 className="text-lg font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={link.action}
                      className="text-gray-300 hover:text-white transition-colors cursor-pointer"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8 bg-gray-800" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-gray-400 text-sm">
            © {currentYear} LeadMasters.ai. All rights reserved.
          </div>
          
          <div className="flex items-center space-x-6 text-sm text-gray-400">
            <span>Made with ❤️ for small businesses</span>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>All systems operational</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
