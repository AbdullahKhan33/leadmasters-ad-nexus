
import React from 'react';
import { CheckCircle, Users, Target, Zap, Heart, Award, Shield } from 'lucide-react';

export function AboutSection() {
  const values = [
    {
      icon: Heart,
      title: "Customer-First Approach",
      description: "Every feature we build starts with one question: How does this help our customers grow their business?"
    },
    {
      icon: Award,
      title: "Proven Results",
      description: "Our AI doesn't just sound smart - it delivers real, measurable results for businesses of all sizes."
    },
    {
      icon: Shield,
      title: "Trusted & Secure",
      description: "Your business data is protected with enterprise-grade security and privacy standards."
    }
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            About <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">LeadMasters.ai</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're on a mission to democratize lead generation. Every small business deserves access to the same powerful AI tools that big corporations use to dominate their markets.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16 items-center">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Story</h3>
            <div className="space-y-4 text-gray-600">
              <p>
                LeadMasters.ai was born from frustration. As entrepreneurs ourselves, we watched countless small businesses struggle with expensive marketing agencies and complex software that promised the world but delivered disappointment.
              </p>
              <p>
                We realized that AI could level the playing field. What if a local restaurant could create ads as compelling as a Fortune 500 company? What if a freelance consultant could automate lead generation like a massive corporation?
              </p>
              <p className="font-semibold text-purple-700">
                That's exactly what we built - AI that works for the little guy, because we are the little guys too.
              </p>
            </div>
          </div>
          <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl p-8">
            <div className="grid grid-cols-2 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-purple-600 mb-2">100+</div>
                <div className="text-gray-600">Happy Businesses</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600 mb-2">25K+</div>
                <div className="text-gray-600">Leads Generated</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600 mb-2">400%</div>
                <div className="text-gray-600">Avg ROI Increase</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
                <div className="text-gray-600">AI Support</div>
              </div>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">What Drives Us</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center p-6 rounded-xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl mb-4">
                  <value.icon className="w-6 h-6 text-purple-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">{value.title}</h4>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Mission Statement */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-500 rounded-2xl p-8 lg:p-12 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl lg:text-3xl font-bold mb-6">Our Mission is Simple</h3>
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-green-300 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-lg mb-2">Generate Leads</h4>
                  <p className="text-sm opacity-90">Help every business find and convert their ideal customers</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-green-300 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-lg mb-2">Keep It Simple</h4>
                  <p className="text-sm opacity-90">Make powerful marketing accessible to everyone, not just experts</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-green-300 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-lg mb-2">Drive Growth</h4>
                  <p className="text-sm opacity-90">Turn small businesses into thriving success stories</p>
                </div>
              </div>
            </div>
            <p className="text-lg font-medium">
              Ready to become our next success story? Let's grow your business together.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
