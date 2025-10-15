
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { MessageCircle, Phone, Mail, MapPin, Clock, CheckCircle, ArrowRight, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function ContactSection() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    business: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Message Sent Successfully!",
      description: "Thank you for reaching out. We'll get back to you within 4 hours during business hours.",
    });

    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      business: '',
      message: ''
    });
    setIsSubmitting(false);
  };

  const handleWhatsAppClick = () => {
    const message = "Hi! I'm interested in learning more about LeadMasters.ai for my business.";
    window.open(`https://wa.me/1234567890?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleCallClick = () => {
    window.open('tel:+15551234567', '_self');
  };

  const contactMethods = [
    {
      icon: MessageCircle,
      title: "WhatsApp Chat",
      description: "Get instant answers",
      action: "Chat Now",
      color: "green",
      onClick: handleWhatsAppClick
    },
    {
      icon: Phone,
      title: "Schedule a Call",
      description: "15-min strategy session",
      action: "Book Call",
      color: "blue",
      onClick: handleCallClick
    },
    {
      icon: Mail,
      title: "Send Email",
      description: "Detailed inquiry",
      action: "Email Us",
      color: "purple",
      onClick: () => window.open('mailto:hello@leadmasters.ai')
    }
  ];

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            Ready to <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">Grow Your Business?</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Let's discuss how LeadMasters.ai can help you generate more leads, save time, and scale your business. Choose your preferred way to connect with us.
          </p>
        </div>

        {/* Quick Contact Options */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {contactMethods.map((method, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 text-center shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group">
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 bg-gradient-to-r ${
                method.color === 'green' ? 'from-green-400 to-green-500' :
                method.color === 'blue' ? 'from-blue-400 to-blue-500' :
                'from-purple-400 to-purple-500'
              } group-hover:scale-110 transition-transform`}>
                <method.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{method.title}</h3>
              <p className="text-gray-600 mb-4">{method.description}</p>
              <Button
                onClick={method.onClick}
                className={`w-full ${
                  method.color === 'green' ? 'bg-green-500 hover:bg-green-600' :
                  method.color === 'blue' ? 'bg-blue-500 hover:bg-blue-600' :
                  'bg-purple-500 hover:bg-purple-600'
                } text-white`}
              >
                {method.action}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 h-fit">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Send us a Message</h3>
              <p className="text-gray-600">Fill out the form below and we'll get back to you within 4 hours.</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="mt-1"
                    placeholder="John Smith"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="mt-1"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="mt-1"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div>
                  <Label htmlFor="business">Business Name</Label>
                  <Input
                    id="business"
                    name="business"
                    type="text"
                    value={formData.business}
                    onChange={handleInputChange}
                    className="mt-1"
                    placeholder="Your Business Name"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="message">How can we help you? *</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  className="mt-1 min-h-[120px]"
                  placeholder="Tell us about your business goals and how many leads you'd like to generate per month..."
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white text-lg py-3"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
                {!isSubmitting && <ArrowRight className="ml-2 w-4 h-4" />}
              </Button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-purple-100 rounded-lg p-3">
                    <Phone className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Phone Support</h4>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                    <p className="text-sm text-gray-500 flex items-center mt-1">
                      <Clock className="w-4 h-4 mr-1" />
                      Mon-Fri 9AM-6PM EST
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 rounded-lg p-3">
                    <Mail className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Email Support</h4>
                    <p className="text-gray-600">hello@leadmasters.ai</p>
                    <p className="text-sm text-gray-500 flex items-center mt-1">
                      <CheckCircle className="w-4 h-4 mr-1 text-green-500" />
                      4-hour response guarantee
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 rounded-lg p-3">
                    <MapPin className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Headquarters - Bengaluru</h4>
                    <p className="text-gray-600">#81/16, Haralukunte, HSR Layout</p>
                    <p className="text-gray-600">Bangalore, 560102</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-indigo-100 rounded-lg p-3">
                    <MapPin className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Hyderabad Office</h4>
                    <p className="text-gray-600">Spellbound Towers, Plot No 147, OUT Colony</p>
                    <p className="text-gray-600">Hightension Road, Sainikpuri</p>
                    <p className="text-gray-600">Hyderabad Telangana 500094</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-orange-100 rounded-lg p-3">
                    <MapPin className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Dubai Office</h4>
                    <p className="text-gray-600">IFZA, Technohub 1</p>
                    <p className="text-gray-600">Dubai Silicon Oasis, Dubai, UAE</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Business Discovery CTA */}
        <div className="mt-16">
          <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 rounded-3xl p-8 md:p-12 text-center shadow-2xl">
            <div className="max-w-3xl mx-auto">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm mb-6">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Are You a Business Owner?
              </h3>
              <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Take our 2-minute Business Discovery Questionnaire and get a tailored lead generation, automation, and marketing strategy crafted specifically for your business.
              </p>
              <Button
                onClick={() => navigate('/business-discovery')}
                size="lg"
                className="bg-white text-purple-600 hover:bg-gray-100 text-lg px-8 py-6 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                <FileText className="mr-2 w-5 h-5" />
                Start Business Discovery Questionnaire
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <p className="text-white/80 text-sm mt-4">
                ✨ Personalized insights • 📊 Strategic recommendations • 🚀 Fast ROI path
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
