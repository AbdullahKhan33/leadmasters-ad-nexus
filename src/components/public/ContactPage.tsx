
import React, { useState } from 'react';
import { PublicHeader } from './PublicHeader';
import { PublicFooter } from './PublicFooter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { MessageCircle, Phone, Mail, MapPin, Clock, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    interestedIn: ''
  });
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate form submission
    toast({
      title: "Message Sent Successfully!",
      description: "Thank you for contacting us. We'll get back to you within 24 hours with a personalized proposal.",
    });

    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      message: '',
      interestedIn: ''
    });
  };

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/1234567890?text=Hi! I\'m interested in LeadMasters.ai for my business.', '_blank');
  };

  const handleScheduleCall = () => {
    window.open('https://calendly.com/leadmasters-demo', '_blank');
  };

  return (
    <div className="min-h-screen bg-white">
      <PublicHeader />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Let's Grow Your <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">Business Together</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Ready to transform your lead generation? Get in touch with our team and we'll create a custom growth plan for your business.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Options */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-green-500 rounded-lg mb-4">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">WhatsApp Chat</h3>
                <p className="text-gray-600 mb-4">Get instant answers to your questions</p>
                <Button 
                  onClick={handleWhatsAppClick}
                  className="bg-green-500 hover:bg-green-600 text-white"
                >
                  Chat Now
                </Button>
              </div>

              <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-500 rounded-lg mb-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Schedule a Call</h3>
                <p className="text-gray-600 mb-4">Book a free strategy session</p>
                <Button 
                  onClick={handleScheduleCall}
                  className="bg-blue-500 hover:bg-blue-600 text-white"
                >
                  Book Call
                </Button>
              </div>

              <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-500 rounded-lg mb-4">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Send a Message</h3>
                <p className="text-gray-600 mb-4">Detailed inquiry form below</p>
                <Button 
                  onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-purple-500 hover:bg-purple-600 text-white"
                >
                  Fill Form
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section id="contact-form" className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Send us a Message</h2>
                <p className="text-gray-600 mb-8">
                  Tell us about your business and we'll create a custom growth plan just for you.
                </p>
                
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
                      <Label htmlFor="company">Company Name</Label>
                      <Input
                        id="company"
                        name="company"
                        type="text"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="mt-1"
                        placeholder="Your Business Name"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="interestedIn">What are you interested in?</Label>
                    <select
                      id="interestedIn"
                      name="interestedIn"
                      value={formData.interestedIn}
                      onChange={handleInputChange}
                      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="">Select an option</option>
                      <option value="lead-generation">Lead Generation Package</option>
                      <option value="business-launch">Business Launch Package</option>
                      <option value="growth-automation">Growth & Automation Package</option>
                      <option value="custom-solution">Custom Solution</option>
                      <option value="just-browsing">Just Getting Information</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="message">Tell us about your business *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      className="mt-1 min-h-[120px]"
                      placeholder="What type of business do you run? What are your main challenges with lead generation? What are your goals?"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white"
                  >
                    Send Message & Get Custom Proposal
                  </Button>
                </form>
              </div>

              {/* Contact Information */}
              <div className="space-y-8">
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-purple-100 rounded-lg p-3">
                        <Phone className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Phone Support</h4>
                        <p className="text-gray-600">+1 (555) 123-4567</p>
                        <p className="text-sm text-gray-500">Mon-Fri 9AM-6PM EST</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="bg-blue-100 rounded-lg p-3">
                        <Mail className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Email Support</h4>
                        <p className="text-gray-600">hello@leadmasters.ai</p>
                        <p className="text-sm text-gray-500">Response within 2 hours</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="bg-green-100 rounded-lg p-3">
                        <MapPin className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Office</h4>
                        <p className="text-gray-600">123 Business District</p>
                        <p className="text-gray-600">Tech City, TC 12345</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="bg-orange-100 rounded-lg p-3">
                        <Clock className="w-6 h-6 text-orange-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Business Hours</h4>
                        <p className="text-gray-600">Monday - Friday: 9AM - 6PM EST</p>
                        <p className="text-gray-600">Saturday: 10AM - 2PM EST</p>
                        <p className="text-gray-600">Sunday: Closed</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Response Time Promise */}
                <div className="bg-gradient-to-r from-purple-600 to-pink-500 rounded-2xl p-8 text-white text-center">
                  <h3 className="text-2xl font-bold mb-4">Our Promise to You</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-center space-x-2">
                      <Clock className="w-5 h-5" />
                      <span>24-hour response guarantee</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                      <Users className="w-5 h-5" />
                      <span>Free strategy consultation</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                      <MessageCircle className="w-5 h-5" />
                      <span>No pushy sales tactics</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}
