import React from 'react';
import { PublicHeader } from './PublicHeader';
import { PublicFooter } from './PublicFooter';
import { CheckCircle, Users, Target, Zap, Heart, Award, Rocket, Star, TrendingUp, Shield, Crown, ArrowRight } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

export function AboutUsPage() {
  return (
    <div className="min-h-screen bg-white">
      <PublicHeader />
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center">
              <div className="inline-flex items-center px-6 py-3 bg-purple-100 rounded-full mb-8">
                <Star className="w-5 h-5 text-purple-600 mr-2" />
                <span className="text-purple-700 font-medium">Meet the Team Behind Your Success</span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 text-gray-900">
                About <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">LeadMasters.ai</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                We're revolutionizing how small businesses grow through AI-powered lead generation and marketing automation.
              </p>
            </div>
          </div>
        </section>

        {/* Founder Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1">
                <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full mb-6">
                  <Crown className="w-5 h-5 text-blue-600 mr-2" />
                  <span className="text-blue-700 font-medium">Leadership</span>
                </div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  Meet Abdullah Khan
                </h2>
                <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full mb-8">
                  <span className="text-purple-700 font-semibold">Founder & CEO</span>
                </div>
                
                <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
                  <p>
                    At the helm of LeadMasters AI is <strong className="text-purple-700">Abdullah Khan</strong>, a seasoned 
                    tech entrepreneur and AI strategist with over <strong className="text-green-600">18 years of experience</strong> in driving 
                    software innovation and business transformation.
                  </p>
                  
                  <p>
                    Abdullah's vision for LeadMasters AI is simple yet powerful — make AI-driven marketing and 
                    lead generation effortless for businesses of all sizes. With expertise spanning technical leadership, 
                    product development, and global training, he has built LeadMasters to help businesses 
                    cut through complexity and turn AI into real, <strong className="text-green-600">measurable growth</strong>.
                  </p>
                  
                  <p>
                    Under his leadership, LeadMasters AI is reshaping how companies approach modern marketing — 
                    combining intelligent automation, data-driven insights, and intuitive simplicity in one seamless platform 
                    that transforms lead generation, campaign management, and customer engagement.
                  </p>
                </div>

                <div className="mt-8 grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-purple-50 rounded-xl border border-purple-200">
                    <div className="text-2xl font-bold text-purple-600">18+</div>
                    <div className="text-sm text-gray-600">Years Experience</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-xl border border-blue-200">
                    <div className="text-2xl font-bold text-blue-600">AI</div>
                    <div className="text-sm text-gray-600">Strategist</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-xl border border-green-200">
                    <div className="text-2xl font-bold text-green-600">Tech</div>
                    <div className="text-sm text-gray-600">Entrepreneur</div>
                  </div>
                </div>
              </div>

              <div className="order-1 lg:order-2 flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full blur-2xl opacity-20 animate-pulse"></div>
                  <div className="relative">
                    <Avatar className="w-80 h-80 mx-auto border-8 border-white shadow-2xl">
                      <AvatarImage 
                        src="/lovable-uploads/48cafaad-828c-4d8a-b3c0-14398ac867f3.png" 
                        alt="Abdullah Khan - Founder & CEO"
                        className="object-cover"
                      />
                      <AvatarFallback className="text-6xl font-bold bg-gradient-to-br from-purple-600 to-blue-600 text-white">
                        AK
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
                      <div className="bg-white px-6 py-3 rounded-full shadow-lg border border-gray-200">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                          <span className="text-sm font-medium text-gray-700">Available for consultation</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 bg-purple-100 rounded-full mb-6">
                <Target className="w-5 h-5 text-purple-600 mr-2" />
                <span className="text-purple-700 font-medium">Our Mission</span>
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Democratizing AI-Powered Growth
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We believe every small business deserves access to enterprise-level AI tools without the complexity or cost.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">The Challenge We're Solving</h3>
                <div className="space-y-6 text-gray-700">
                  <p>
                    Small businesses are the heartbeat of innovation, but they've been left behind in the AI revolution. 
                    Traditional marketing is expensive, complex, and requires expertise most SMBs can't afford.
                  </p>
                  <p className="text-xl font-semibold text-purple-600">
                    That's where we come in. LeadMasters.ai levels the playing field.
                  </p>
                </div>
                
                <div className="mt-8 space-y-4">
                  <div className="flex items-start space-x-4 p-4 bg-green-50 rounded-xl border-l-4 border-green-500">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-700">Turn AI complexity into business simplicity</p>
                  </div>
                  <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-xl border-l-4 border-blue-500">
                    <CheckCircle className="w-6 h-6 text-blue-500 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-700">Replace expensive agencies with intelligent automation</p>
                  </div>
                  <div className="flex items-start space-x-4 p-4 bg-purple-50 rounded-xl border-l-4 border-purple-500">
                    <CheckCircle className="w-6 h-6 text-purple-500 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-700">Empower every business to compete with industry giants</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-xl">
                <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Our Impact</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center p-6 bg-purple-50 rounded-xl">
                    <div className="text-4xl font-bold text-purple-600 mb-2">100+</div>
                    <div className="text-sm text-gray-600">Early Adopters</div>
                  </div>
                  <div className="text-center p-6 bg-blue-50 rounded-xl">
                    <div className="text-4xl font-bold text-blue-600 mb-2">500%</div>
                    <div className="text-sm text-gray-600">Average Growth</div>
                  </div>
                  <div className="text-center p-6 bg-green-50 rounded-xl">
                    <div className="text-4xl font-bold text-green-600 mb-2">10K+</div>
                    <div className="text-sm text-gray-600">Leads Generated</div>
                  </div>
                  <div className="text-center p-6 bg-orange-50 rounded-xl">
                    <div className="text-4xl font-bold text-orange-600 mb-2">95%</div>
                    <div className="text-sm text-gray-600">Success Rate</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full mb-6">
                <Zap className="w-5 h-5 text-blue-600 mr-2" />
                <span className="text-blue-700 font-medium">Why Choose Us</span>
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                What Makes Us Different
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We don't just understand your challenges—we've engineered the perfect solution.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-8 bg-blue-50 rounded-2xl hover:shadow-lg transition-shadow">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-2xl mb-6">
                  <Zap className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">AI-Powered Simplicity</h3>
                <p className="text-gray-600">Our intelligent automation handles the complexity while you focus on growing your business.</p>
              </div>

              <div className="text-center p-8 bg-green-50 rounded-2xl hover:shadow-lg transition-shadow">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 text-white rounded-2xl mb-6">
                  <Users className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">SMB-First Design</h3>
                <p className="text-gray-600">Built specifically for small businesses—every feature considers your budget and time constraints.</p>
              </div>

              <div className="text-center p-8 bg-purple-50 rounded-2xl hover:shadow-lg transition-shadow">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-600 text-white rounded-2xl mb-6">
                  <Target className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Results-Obsessed</h3>
                <p className="text-gray-600">Your success is our success. We measure everything by your business growth and customer acquisition.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 bg-red-100 rounded-full mb-6">
                <Heart className="w-5 h-5 text-red-600 mr-2" />
                <span className="text-red-700 font-medium">Our Values</span>
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">What Drives Us Forward</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our values aren't just words—they're the principles that guide every decision and innovation.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-purple-100 rounded-full mb-8">
                  <Heart className="w-10 h-10 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Small Business Champions</h3>
                <p className="text-gray-600">Every innovation passes through one filter: "Does this genuinely help small businesses thrive?"</p>
              </div>

              <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-8">
                  <Zap className="w-10 h-10 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Elegance in Simplicity</h3>
                <p className="text-gray-600">Complex problems deserve elegant solutions. If it's not intuitive for entrepreneurs, we rebuild it.</p>
              </div>

              <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-8">
                  <Award className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Success Partnership</h3>
                <p className="text-gray-600">We don't succeed unless you succeed. Your growth metrics are our performance indicators.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full mb-8">
              <Rocket className="w-5 h-5 text-white mr-2" />
              <span className="text-white font-medium">Ready to Transform Your Business?</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-8">
              Join the Growth Revolution
            </h2>
            <p className="text-xl text-purple-100 mb-12 leading-relaxed">
              Don't let your competitors get ahead. Start generating more leads and growing faster with AI that works.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="px-8 py-4 bg-white text-purple-600 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center">
                Get Started Today
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
              <button className="px-8 py-4 bg-transparent text-white font-semibold rounded-xl border-2 border-white hover:bg-white hover:text-purple-600 transition-all duration-300">
                Schedule Demo
              </button>
            </div>
          </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}
