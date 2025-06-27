
import React from 'react';
import { CheckCircle, Users, Target, Zap } from 'lucide-react';

export function AboutSection() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            About <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">LeadMasters.ai</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            LeadMasters.ai is built for small businesses who want to grow — without complex software or expensive agencies.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-100">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
              <Zap className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">AI-Powered</h3>
            <p className="text-gray-600">Built with AI to make marketing simple and effective for everyone</p>
          </div>

          <div className="text-center p-6 rounded-xl bg-gradient-to-br from-green-50 to-blue-50 border border-green-100">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mb-4">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Trusted by Businesses</h3>
            <p className="text-gray-600">Used by startups, freelancers, and local businesses worldwide</p>
          </div>

          <div className="text-center p-6 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mb-4">
              <Target className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Our Mission</h3>
            <p className="text-gray-600">Leads. Simplicity. Growth. Everything you need in one place</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-600 to-pink-500 rounded-2xl p-8 lg:p-12 text-white">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl lg:text-3xl font-bold mb-6">Why Choose LeadMasters.ai?</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-300 flex-shrink-0 mt-0.5" />
                  <p className="text-lg">Built with AI to make marketing simple</p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-300 flex-shrink-0 mt-0.5" />
                  <p className="text-lg">Used by startups, freelancers, and local businesses</p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-300 flex-shrink-0 mt-0.5" />
                  <p className="text-lg">Our mission: Leads. Simplicity. Growth.</p>
                </div>
              </div>
            </div>
            <div className="text-center lg:text-right">
              <div className="inline-block bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="text-4xl font-bold">10,000+</div>
                <div className="text-lg opacity-90">Businesses Growing</div>
                <div className="text-4xl font-bold mt-4">500%</div>
                <div className="text-lg opacity-90">Average Lead Increase</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
