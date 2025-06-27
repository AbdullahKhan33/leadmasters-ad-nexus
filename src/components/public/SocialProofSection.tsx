
import React, { useState, useEffect } from 'react';
import { Star, Quote, TrendingUp, Users, Zap } from 'lucide-react';

export function SocialProofSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Restaurant Owner",
      business: "Golden Dragon Cuisine",
      content: "LeadMasters.ai increased our takeout orders by 340% in just 3 months. The WhatsApp automation alone saves us 4 hours daily!",
      rating: 5,
      results: "+340% orders"
    },
    {
      name: "Marcus Rodriguez",
      role: "Fitness Coach",
      business: "Peak Performance Gym",
      content: "I was spending $2000/month on ads with poor results. Now I spend $500 and get 5x more qualified leads. The AI is incredible!",
      rating: 5,
      results: "5x more leads"
    },
    {
      name: "Priya Patel",
      role: "E-commerce Founder",
      business: "Artisan Crafts Co.",
      content: "From struggling to get 10 leads per month to generating 200+ qualified prospects. This platform changed everything for us.",
      rating: 5,
      results: "+200 leads/month"
    },
    {
      name: "Ahmed Hassan",
      role: "Real Estate Agent",
      business: "Dubai Properties",
      content: "The AI writes better ad copy than my expensive agency did. I've closed 3 properties this month directly from LeadMasters leads.",
      rating: 5,
      results: "3 closings/month"
    }
  ];

  const metrics = [
    { number: "100+", label: "Active Businesses", icon: Users },
    { number: "25,000+", label: "Leads Generated", icon: TrendingUp },
    { number: "400%", label: "Average ROI", icon: Zap },
    { number: "4.9/5", label: "Customer Rating", icon: Star }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section className="py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full mb-6">
            <Star className="w-4 h-4 text-green-600 mr-2" />
            <span className="text-sm font-medium text-green-700">Trusted by 100+ Growing Businesses</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            Real Results from 
            <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent"> Real Businesses</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it. See how businesses like yours are crushing their lead generation goals with proven strategies that work.
          </p>
        </div>

        {/* Metrics */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          {metrics.map((metric, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow duration-300 border border-white/50">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl mb-4">
                <metric.icon className="w-6 h-6 text-purple-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{metric.number}</div>
              <div className="text-gray-600 font-medium">{metric.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="relative bg-white rounded-3xl p-8 lg:p-12 shadow-xl border border-gray-100">
          <div className="absolute top-8 left-8">
            <Quote className="w-12 h-12 text-purple-200" />
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="transition-all duration-500 ease-in-out">
              <div className="text-center mb-8">
                <blockquote className="text-xl lg:text-2xl text-gray-700 font-medium leading-relaxed mb-6">
                  "{testimonials[currentTestimonial].content}"
                </blockquote>
                
                <div className="flex items-center justify-center space-x-1 mb-6">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-center space-x-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold text-xl mb-3">
                    {testimonials[currentTestimonial].name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="font-semibold text-gray-900">{testimonials[currentTestimonial].name}</div>
                  <div className="text-gray-600">{testimonials[currentTestimonial].role}</div>
                  <div className="text-sm text-gray-500">{testimonials[currentTestimonial].business}</div>
                </div>
                
                <div className="hidden sm:block w-px h-16 bg-gray-200" />
                
                <div className="text-center">
                  <div className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full">
                    <TrendingUp className="w-4 h-4 text-green-600 mr-2" />
                    <span className="text-green-700 font-semibold">{testimonials[currentTestimonial].results}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonial Navigation */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                  index === currentTestimonial ? 'bg-purple-600' : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Logo Cloud */}
        <div className="mt-16 text-center">
          <p className="text-gray-500 text-sm font-medium mb-8">Trusted by businesses across every industry</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {['Restaurant', 'Fitness', 'E-commerce', 'Real Estate', 'Consulting', 'Healthcare'].map((industry, index) => (
              <div key={index} className="bg-white px-6 py-3 rounded-lg border border-gray-200 text-gray-600 font-medium hover:border-purple-200 hover:text-purple-700 transition-colors">
                {industry}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
