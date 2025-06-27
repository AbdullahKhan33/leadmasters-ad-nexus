
import React from 'react';
import { PublicHeader } from './PublicHeader';
import { PublicFooter } from './PublicFooter';
import { CheckCircle, Users, Target, Zap, Heart, Award } from 'lucide-react';

export function AboutUsPage() {
  return (
    <div className="min-h-screen bg-white">
      <PublicHeader />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                About <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">LeadMasters.ai</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We're on a mission to simplify lead generation for small businesses worldwide. 
                No complex software, no expensive agencies - just results.
              </p>
            </div>
          </div>
        </section>

        {/* Our Mission */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                  Our Mission
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Small businesses are the backbone of our economy, but they often struggle with lead generation. 
                  Traditional marketing is expensive, complex, and requires technical expertise most SMBs don't have.
                </p>
                <p className="text-lg text-gray-600 mb-8">
                  That's why we built LeadMasters.ai - to democratize lead generation and give every small business 
                  the tools they need to grow, without the complexity or cost.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-700">Make AI-powered marketing accessible to everyone</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-700">Eliminate the need for expensive agencies</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-700">Help small businesses compete with larger companies</p>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl p-8">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Impact</h3>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <div className="text-3xl font-bold text-purple-600">10,000+</div>
                        <div className="text-sm text-gray-600">Businesses Helped</div>
                      </div>
                      <div>
                        <div className="text-3xl font-bold text-pink-600">500%</div>
                        <div className="text-sm text-gray-600">Avg Lead Increase</div>
                      </div>
                      <div>
                        <div className="text-3xl font-bold text-blue-600">$50M+</div>
                        <div className="text-sm text-gray-600">Revenue Generated</div>
                      </div>
                      <div>
                        <div className="text-3xl font-bold text-green-600">95%</div>
                        <div className="text-sm text-gray-600">Success Rate</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why LeadMasters */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Why <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">LeadMasters.ai</span>?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We understand the challenges small businesses face because we've been there too.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-white rounded-xl shadow-sm">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
                  <Zap className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">AI-Powered Simplicity</h3>
                <p className="text-gray-600">Our AI does the heavy lifting so you can focus on running your business</p>
              </div>

              <div className="text-center p-6 bg-white rounded-xl shadow-sm">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mb-4">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Built for SMBs</h3>
                <p className="text-gray-600">Every feature is designed with small business needs and budgets in mind</p>
              </div>

              <div className="text-center p-6 bg-white rounded-xl shadow-sm">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mb-4">
                  <Target className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Results-Driven</h3>
                <p className="text-gray-600">We measure success by your success - more leads, more sales, more growth</p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">Our Values</h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full mb-4">
                  <Heart className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Small Business First</h3>
                <p className="text-gray-600">Every decision we make is filtered through: "Does this help small businesses grow?"</p>
              </div>

              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full mb-4">
                  <Zap className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Simplicity Over Complexity</h3>
                <p className="text-gray-600">If it's not simple enough for a busy business owner to use, we don't ship it.</p>
              </div>

              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-100 to-blue-100 rounded-full mb-4">
                  <Award className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Results Matter</h3>
                <p className="text-gray-600">We're not successful unless our customers are successful. Period.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}
