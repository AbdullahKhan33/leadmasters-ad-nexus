
import React from 'react';
import { PublicHeader } from './PublicHeader';
import { PublicFooter } from './PublicFooter';
import { CheckCircle, Users, Target, Zap, Heart, Award, Rocket, Star, TrendingUp, Shield, Crown } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

export function AboutUsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <PublicHeader />
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-purple-900/20 to-pink-900/20 backdrop-blur-sm relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%239C92AC\" fill-opacity=\"0.1\"%3E%3Ccircle cx=\"20\" cy=\"20\" r=\"2\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full border border-purple-500/30 backdrop-blur-sm mb-6">
                <Rocket className="w-5 h-5 text-purple-400 mr-2" />
                <span className="text-purple-200 text-sm font-medium">Revolutionizing Lead Generation</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold mb-6">
                <span className="text-white">Powering the </span>
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                  Future
                </span>
                <br />
                <span className="text-white">of Business Growth</span>
              </h1>
              <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                We're not just another lead generation platform. We're your AI-powered growth accelerator, 
                transforming how businesses connect with their ideal customers in the digital age.
              </p>
              <div className="mt-12 flex flex-wrap justify-center gap-6">
                <div className="bg-gradient-to-r from-purple-600/10 to-pink-600/10 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-6">
                  <div className="text-3xl font-bold text-purple-400">500%</div>
                  <div className="text-gray-300">Average Lead Increase</div>
                </div>
                <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-6">
                  <div className="text-3xl font-bold text-blue-400">10K+</div>
                  <div className="text-gray-300">Businesses Transformed</div>
                </div>
                <div className="bg-gradient-to-r from-pink-600/10 to-purple-600/10 backdrop-blur-sm border border-pink-500/20 rounded-2xl p-6">
                  <div className="text-3xl font-bold text-pink-400">$50M+</div>
                  <div className="text-gray-300">Revenue Generated</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Founder Section */}
        <section className="py-24 bg-gradient-to-br from-slate-800 to-purple-900 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 to-pink-600/5"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full border border-purple-500/30 backdrop-blur-sm mb-6">
                <Star className="w-5 h-5 text-yellow-400 mr-2" />
                <span className="text-purple-200 text-sm font-medium">Meet the Visionary</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                The Mind Behind the Revolution
              </h2>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1">
                <h3 className="text-3xl font-bold text-white mb-8 flex items-center">
                  Abdullah Khan
                  <div className="ml-4 flex items-center px-3 py-1 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full border border-purple-500/30">
                    <span className="text-purple-300 text-sm font-medium">Founder & CEO</span>
                  </div>
                </h3>
                <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                  <p className="border-l-4 border-purple-500 pl-6 bg-gradient-to-r from-purple-900/20 to-transparent p-4 rounded-r-lg">
                    At the helm of LeadMasters AI is Abdullah Khan, a seasoned tech entrepreneur and AI strategist with over 18 years of experience in driving software innovation and business transformation.
                  </p>
                  <p className="border-l-4 border-pink-500 pl-6 bg-gradient-to-r from-pink-900/20 to-transparent p-4 rounded-r-lg">
                    Abdullah's vision for LeadMasters AI is simple yet powerful — make AI-driven marketing and lead generation effortless for businesses of all sizes. With a background spanning technical leadership, product development, and global training, he has built LeadMasters to help businesses cut through complexity and turn AI into real, measurable growth.
                  </p>
                  <p className="border-l-4 border-blue-500 pl-6 bg-gradient-to-r from-blue-900/20 to-transparent p-4 rounded-r-lg">
                    Under his leadership, LeadMasters AI is reshaping how companies approach lead generation, campaign management, and customer engagement — combining automation, intelligent insights, and simplicity in one seamless platform.
                  </p>
                </div>
                <div className="mt-8 grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-gradient-to-br from-purple-600/10 to-pink-600/10 rounded-xl border border-purple-500/20">
                    <div className="text-2xl font-bold text-purple-400">18+</div>
                    <div className="text-xs text-gray-400">Years Experience</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-blue-600/10 to-purple-600/10 rounded-xl border border-blue-500/20">
                    <div className="text-2xl font-bold text-blue-400">AI</div>
                    <div className="text-xs text-gray-400">Strategist</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-pink-600/10 to-purple-600/10 rounded-xl border border-pink-500/20">
                    <div className="text-2xl font-bold text-pink-400">Tech</div>
                    <div className="text-xs text-gray-400">Entrepreneur</div>
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2 flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur-2xl opacity-30 animate-pulse"></div>
                  <div className="relative bg-gradient-to-br from-slate-800 to-purple-800 rounded-3xl p-8 border border-purple-500/30 backdrop-blur-sm">
                    <div className="text-center">
                      <div className="relative mb-8">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-xl opacity-40"></div>
                        <Avatar className="w-48 h-48 mx-auto relative border-4 border-purple-500/50">
                          <AvatarImage 
                            src="/lovable-uploads/899e2f92-5c59-42a4-95b3-4f4fdac4e429.png" 
                            alt="Abdullah Khan - Founder & CEO"
                            className="object-cover"
                          />
                          <AvatarFallback className="text-4xl font-bold bg-gradient-to-br from-purple-600 to-pink-600 text-white">
                            AK
                          </AvatarFallback>
                        </Avatar>
                      </div>
                      <h4 className="text-2xl font-bold text-white mb-2">Abdullah Khan</h4>
                      <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-600/30 to-pink-600/30 rounded-full border border-purple-500/40 mb-6">
                        <Crown className="w-4 h-4 text-yellow-400 mr-2" />
                        <span className="text-purple-200 font-semibold">Founder & CEO</span>
                      </div>
                      <div className="space-y-3 text-gray-300">
                        <div className="flex items-center justify-center space-x-2">
                          <TrendingUp className="w-4 h-4 text-green-400" />
                          <span className="text-sm">Growth Accelerator</span>
                        </div>
                        <div className="flex items-center justify-center space-x-2">
                          <Shield className="w-4 h-4 text-blue-400" />
                          <span className="text-sm">Innovation Leader</span>
                        </div>
                        <div className="flex items-center justify-center space-x-2">
                          <Zap className="w-4 h-4 text-purple-400" />
                          <span className="text-sm">AI Pioneer</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Mission Section */}
        <section className="py-24 bg-gradient-to-br from-purple-900 to-slate-900 relative">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"100\" height=\"100\" viewBox=\"0 0 100 100\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cpath d=\"M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\" fill=\"%239C92AC\" fill-opacity=\"0.05\" fill-rule=\"evenodd\"/%3E%3C/svg%3E')] opacity-30"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full border border-purple-500/30 backdrop-blur-sm mb-6">
                  <Target className="w-5 h-5 text-purple-400 mr-2" />
                  <span className="text-purple-200 text-sm font-medium">Our Mission</span>
                </div>
                <h2 className="text-4xl lg:text-5xl font-bold text-white mb-8">
                  Democratizing <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">AI-Powered</span> Growth
                </h2>
                <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                  <p>
                    Small businesses are the heartbeat of innovation, but they've been left behind in the AI revolution. 
                    Traditional marketing is expensive, complex, and requires expertise most SMBs can't afford.
                  </p>
                  <p className="text-xl font-semibold text-purple-300">
                    That's where we come in. LeadMasters.ai levels the playing field.
                  </p>
                </div>
                <div className="mt-10 space-y-4">
                  <div className="flex items-start space-x-4 p-4 bg-gradient-to-r from-green-900/20 to-transparent rounded-xl border-l-4 border-green-400">
                    <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-300">Turn AI complexity into business simplicity</p>
                  </div>
                  <div className="flex items-start space-x-4 p-4 bg-gradient-to-r from-blue-900/20 to-transparent rounded-xl border-l-4 border-blue-400">
                    <CheckCircle className="w-6 h-6 text-blue-400 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-300">Replace expensive agencies with intelligent automation</p>
                  </div>
                  <div className="flex items-start space-x-4 p-4 bg-gradient-to-r from-purple-900/20 to-transparent rounded-xl border-l-4 border-purple-400">
                    <CheckCircle className="w-6 h-6 text-purple-400 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-300">Empower every business to compete with industry giants</p>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-slate-800/50 to-purple-800/50 backdrop-blur-sm rounded-3xl p-8 border border-purple-500/30">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-white mb-6">Transforming Businesses Worldwide</h3>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-2xl p-6 border border-purple-500/30">
                        <div className="text-4xl font-bold text-purple-400 mb-2">10,000+</div>
                        <div className="text-sm text-gray-300">Success Stories</div>
                      </div>
                      <div className="bg-gradient-to-br from-pink-600/20 to-blue-600/20 rounded-2xl p-6 border border-pink-500/30">
                        <div className="text-4xl font-bold text-pink-400 mb-2">500%</div>
                        <div className="text-sm text-gray-300">Growth Acceleration</div>
                      </div>
                      <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-2xl p-6 border border-blue-500/30">
                        <div className="text-4xl font-bold text-blue-400 mb-2">$50M+</div>
                        <div className="text-sm text-gray-300">Revenue Unlocked</div>
                      </div>
                      <div className="bg-gradient-to-br from-green-600/20 to-blue-600/20 rounded-2xl p-6 border border-green-500/30">
                        <div className="text-4xl font-bold text-green-400 mb-2">95%</div>
                        <div className="text-sm text-gray-300">Success Rate</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why LeadMasters Section */}
        <section className="py-24 bg-gradient-to-br from-slate-900 to-purple-900 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full border border-purple-500/30 backdrop-blur-sm mb-6">
                <Zap className="w-5 h-5 text-yellow-400 mr-2" />
                <span className="text-purple-200 text-sm font-medium">Competitive Advantage</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                Why Choose <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">LeadMasters.ai</span>?
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                We don't just understand your challenges—we've engineered the perfect solution.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                <div className="relative bg-gradient-to-br from-slate-800/80 to-blue-800/80 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/30 hover:border-blue-400/50 transition-all duration-300">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-2xl mb-6 border border-blue-500/30">
                    <Zap className="w-8 h-8 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">AI-Powered Simplicity</h3>
                  <p className="text-gray-300 leading-relaxed">Our intelligent automation handles the complexity while you focus on what matters most—growing your business and serving your customers.</p>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-blue-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                <div className="relative bg-gradient-to-br from-slate-800/80 to-green-800/80 backdrop-blur-sm rounded-2xl p-8 border border-green-500/30 hover:border-green-400/50 transition-all duration-300">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-600/20 to-blue-600/20 rounded-2xl mb-6 border border-green-500/30">
                    <Users className="w-8 h-8 text-green-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">SMB-First Design</h3>
                  <p className="text-gray-300 leading-relaxed">Built specifically for small businesses—every feature considers your budget, time constraints, and growth ambitions.</p>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                <div className="relative bg-gradient-to-br from-slate-800/80 to-purple-800/80 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-2xl mb-6 border border-purple-500/30">
                    <Target className="w-8 h-8 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">Results-Obsessed</h3>
                  <p className="text-gray-300 leading-relaxed">Your success is our success. We measure everything by one metric: your business growth and customer acquisition.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-24 bg-gradient-to-br from-purple-900 to-slate-900 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 to-pink-600/5"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full border border-purple-500/30 backdrop-blur-sm mb-6">
                <Heart className="w-5 h-5 text-pink-400 mr-2" />
                <span className="text-purple-200 text-sm font-medium">Core Values</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">What Drives Us Forward</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Our values aren't just words on a wall—they're the principles that guide every decision and innovation.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
                <div className="relative text-center bg-gradient-to-br from-slate-800/50 to-purple-800/50 backdrop-blur-sm rounded-3xl p-10 border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-full mb-8 border border-purple-500/40">
                    <Heart className="w-10 h-10 text-purple-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Small Business Champions</h3>
                  <p className="text-gray-300 leading-relaxed">Every innovation, every feature, every decision passes through one filter: "Does this genuinely help small businesses thrive?"</p>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
                <div className="relative text-center bg-gradient-to-br from-slate-800/50 to-blue-800/50 backdrop-blur-sm rounded-3xl p-10 border border-blue-500/30 hover:border-blue-400/50 transition-all duration-300">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-full mb-8 border border-blue-500/40">
                    <Zap className="w-10 h-10 text-blue-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Elegance in Simplicity</h3>
                  <p className="text-gray-300 leading-relaxed">Complex problems deserve elegant solutions. If it's not intuitive enough for a busy entrepreneur, we rebuild it.</p>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 to-blue-600/10 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
                <div className="relative text-center bg-gradient-to-br from-slate-800/50 to-green-800/50 backdrop-blur-sm rounded-3xl p-10 border border-green-500/30 hover:border-green-400/50 transition-all duration-300">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-600/20 to-blue-600/20 rounded-full mb-8 border border-green-500/40">
                    <Award className="w-10 h-10 text-green-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Success Partnership</h3>
                  <p className="text-gray-300 leading-relaxed">We don't succeed unless you succeed. Your growth metrics are our performance indicators. Period.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%239C92AC\" fill-opacity=\"0.1\"%3E%3Ccircle cx=\"20\" cy=\"20\" r=\"2\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full border border-purple-500/30 backdrop-blur-sm mb-8">
              <Rocket className="w-5 h-5 text-purple-400 mr-2" />
              <span className="text-purple-200 text-sm font-medium">Ready to Transform?</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-8">
              Join the <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Growth Revolution</span>
            </h2>
            <p className="text-xl text-gray-300 mb-12 leading-relaxed">
              Don't let your competitors get ahead. Start generating more leads, closing more deals, 
              and growing faster with AI that actually works for small businesses.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-2xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-2xl hover:shadow-purple-500/25 transform hover:scale-105">
                Get Started Today
              </button>
              <button className="px-8 py-4 bg-gradient-to-r from-slate-800 to-purple-800 text-white font-semibold rounded-2xl border border-purple-500/50 hover:border-purple-400 transition-all duration-300 backdrop-blur-sm">
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
