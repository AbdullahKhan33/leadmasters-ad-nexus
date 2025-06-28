
import React from 'react';
import { Button } from '@/components/ui/button';

interface NewsletterProps {
  variant?: 'default' | 'hero';
}

export function Newsletter({ variant = 'default' }: NewsletterProps) {
  if (variant === 'hero') {
    return (
      <section className="py-16 bg-gradient-to-r from-purple-600 to-pink-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Never Miss a Growth Tip
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Get weekly insights on AI, marketing, and lead generation delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-white focus:outline-none"
            />
            <Button className="bg-white text-purple-600 hover:bg-gray-100 px-6 py-3">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-8 text-center border border-blue-100">
      <h3 className="text-2xl font-bold text-gray-900 mb-4">Never Miss a Growth Opportunity</h3>
      <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
        Get our latest insights, strategies, and case studies delivered straight to your inbox. Join 1,000+ business owners who rely on our weekly newsletter.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
        <input
          type="email"
          placeholder="Enter your email"
          className="flex-1 px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <Button className="bg-purple-600 hover:bg-purple-700 text-white px-6">
          Subscribe Free
        </Button>
      </div>
      <p className="text-xs text-gray-500 mt-3">No spam. Unsubscribe anytime.</p>
    </div>
  );
}
