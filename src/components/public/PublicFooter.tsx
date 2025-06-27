
import React from 'react';
import { Logo } from '@/components/ui/logo';
import { Separator } from '@/components/ui/separator';
import { MessageCircle, Linkedin, Instagram, Facebook, Twitter, Youtube, Mail, Phone } from 'lucide-react';
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

  const socialLinks = [
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: '#',
      color: 'hover:bg-blue-600',
      bgColor: 'bg-blue-700'
    },
    {
      name: 'Facebook',
      icon: Facebook,
      href: '#',
      color: 'hover:bg-blue-500',
      bgColor: 'bg-blue-600'
    },
    {
      name: 'Instagram',
      icon: Instagram,
      href: '#',
      color: 'hover:bg-pink-500',
      bgColor: 'bg-gradient-to-r from-purple-500 to-pink-500'
    },
    {
      name: 'Twitter',
      icon: Twitter,
      href: '#',
      color: 'hover:bg-sky-400',
      bgColor: 'bg-sky-500'
    },
    {
      name: 'YouTube',
      icon: Youtube,
      href: '#',
      color: 'hover:bg-red-500',
      bgColor: 'bg-red-600'
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      href: '#',
      color: 'hover:bg-green-500',
      bgColor: 'bg-green-600'
    }
  ];

  const footerSections = {
    product: {
      title: "Product",
      links: [
        { name: "Features", action: () => handleNavigation('/') },
        { name: "Pricing", action: () => handleNavigation('/pricing') }
      ]
    },
    company: {
      title: "Company",
      links: [
        { name: "About Us", action: () => handleNavigation('/about-us') },
        { name: "Blog", action: () => handleNavigation('/blog') },
        { name: "Support", action: () => handleNavigation('/contact') },
        { name: "Contact Us", action: () => handleNavigation('/contact') }
      ]
    },
    legal: {
      title: "Legal",
      links: [
        { name: "Terms of Service", action: () => handleNavigation('/terms-and-conditions') },
        { name: "Privacy Policy", action: () => handleNavigation('/privacy-policy') },
        { name: "Cancellation & Refund", action: () => handleNavigation('/cancellation') }
      ]
    }
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(139, 92, 246, 0.1) 0%, transparent 50%), 
                           radial-gradient(circle at 75% 75%, rgba(236, 72, 153, 0.1) 0%, transparent 50%)`
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
                <Logo className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-300 bg-clip-text text-transparent">
                  LeadMasters.ai
                </h3>
                <p className="text-sm text-purple-300 font-medium">AI-Powered Growth</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
              Transform your business with AI-powered lead generation. 
              Get more leads, run smarter campaigns, and accelerate your growth.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-3 text-gray-300">
                <div className="p-2 bg-gray-800 rounded-lg">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="text-sm">hello@leadmasters.ai</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <div className="p-2 bg-gray-800 rounded-lg">
                  <Phone className="w-4 h-4" />
                </div>
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
            </div>
            
            {/* Social Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-gray-200">Connect With Us</h4>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className={`group relative p-3 rounded-xl ${social.bgColor} ${social.color} transition-all duration-300 transform hover:scale-110 hover:shadow-lg`}
                    aria-label={social.name}
                  >
                    <social.icon className="w-5 h-5 text-white" />
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                      {social.name}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerSections).map(([key, section]) => (
            <div key={key}>
              <h4 className="text-lg font-semibold mb-4 text-gray-200 relative">
                {section.title}
                <div className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
              </h4>
              <ul className="space-y-3">
                {section.links.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={link.action}
                      className="text-gray-300 hover:text-white transition-colors cursor-pointer hover:translate-x-1 transform duration-200 text-sm block text-left"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8 bg-gradient-to-r from-transparent via-gray-700 to-transparent" />

        {/* Bottom Section */}
        <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
          <div className="text-gray-400 text-sm">
            © {currentYear} LeadMasters.ai. All rights reserved.
          </div>
          
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 text-xs text-gray-400">
            <div className="flex items-center space-x-2">
              <span className="text-purple-300">🚀</span>
              <span>Empowering 10,000+ businesses worldwide</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>All systems operational</span>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-6 pt-6 border-t border-gray-700">
          <div className="flex flex-wrap justify-center items-center gap-6 opacity-60">
            <div className="text-xs text-gray-400 flex items-center space-x-2">
              <span className="w-3 h-3 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">✓</span>
              <span>SOC 2 Compliant</span>
            </div>
            <div className="text-xs text-gray-400 flex items-center space-x-2">
              <span className="w-3 h-3 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs">🔒</span>
              <span>Enterprise Grade Security</span>
            </div>
            <div className="text-xs text-gray-400 flex items-center space-x-2">
              <span className="w-3 h-3 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs">⚡</span>
              <span>99.9% Uptime SLA</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
