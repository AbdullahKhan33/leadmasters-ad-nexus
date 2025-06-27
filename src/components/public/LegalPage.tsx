
import React from 'react';
import { PublicHeader } from './PublicHeader';
import { PublicFooter } from './PublicFooter';

interface LegalPageProps {
  type: 'terms' | 'privacy' | 'refund';
}

export function LegalPage({ type }: LegalPageProps) {
  const getContent = () => {
    switch (type) {
      case 'terms':
        return {
          title: 'Terms of Service',
          lastUpdated: 'December 1, 2024',
          content: (
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
                <p className="text-gray-600 mb-4">
                  By accessing and using LeadMasters.ai ("Service"), you accept and agree to be bound by the terms and provision of this agreement.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Description of Service</h2>
                <p className="text-gray-600 mb-4">
                  LeadMasters.ai provides AI-powered lead generation tools and services for small businesses, including but not limited to:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>AI-generated content creation</li>
                  <li>Lead capture and CRM tools</li>
                  <li>Marketing automation services</li>
                  <li>Business setup and consultation services</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. User Accounts</h2>
                <p className="text-gray-600 mb-4">
                  When you create an account with us, you must provide information that is accurate, complete, and current at all times. You are responsible for safeguarding the password and for all activities that occur under your account.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Payment Terms</h2>
                <p className="text-gray-600 mb-4">
                  Payment for services is due upon purchase. We accept various payment methods as displayed during checkout. All prices are subject to change with notice.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Refund Policy</h2>
                <p className="text-gray-600 mb-4">
                  We offer a 30-day money-back guarantee on all packages. Please refer to our Refund Policy for detailed terms and conditions.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Limitation of Liability</h2>
                <p className="text-gray-600 mb-4">
                  In no event shall LeadMasters.ai be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Contact Information</h2>
                <p className="text-gray-600">
                  If you have any questions about these Terms of Service, please contact us at hello@leadmasters.ai
                </p>
              </section>
            </div>
          )
        };

      case 'privacy':
        return {
          title: 'Privacy Policy',
          lastUpdated: 'December 1, 2024',
          content: (
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Information We Collect</h2>
                <p className="text-gray-600 mb-4">
                  We collect information you provide directly to us, such as when you create an account, use our services, or contact us for support.
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Personal information (name, email, phone number)</li>
                  <li>Business information (company name, industry, website)</li>
                  <li>Usage data and analytics</li>
                  <li>Communication preferences</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Your Information</h2>
                <p className="text-gray-600 mb-4">
                  We use the information we collect to:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Provide, maintain, and improve our services</li>
                  <li>Process transactions and send related information</li>
                  <li>Send technical notices and support messages</li>
                  <li>Communicate with you about products, services, and promotions</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Information Sharing</h2>
                <p className="text-gray-600 mb-4">
                  We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>With your consent</li>
                  <li>To comply with legal obligations</li>
                  <li>To protect our rights and safety</li>
                  <li>With service providers who assist us in operating our platform</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Data Security</h2>
                <p className="text-gray-600 mb-4">
                  We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Your Rights</h2>
                <p className="text-gray-600 mb-4">
                  You have the right to access, update, or delete your personal information. You can also opt out of certain communications from us.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Contact Us</h2>
                <p className="text-gray-600">
                  If you have any questions about this Privacy Policy, please contact us at privacy@leadmasters.ai
                </p>
              </section>
            </div>
          )
        };

      case 'refund':
        return {
          title: 'Cancellation & Refund Policy',
          lastUpdated: 'December 1, 2024',
          content: (
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. 30-Day Money-Back Guarantee</h2>
                <p className="text-gray-600 mb-4">
                  We offer a 30-day money-back guarantee on all our packages. If you're not completely satisfied with our service, you can request a full refund within 30 days of your purchase.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Refund Eligibility</h2>
                <p className="text-gray-600 mb-4">
                  To be eligible for a refund, you must:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Request the refund within 30 days of purchase</li>
                  <li>Provide a valid reason for the refund request</li>
                  <li>Allow us to attempt to resolve any issues first</li>
                  <li>Have made a good faith effort to use our services</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. What You Keep</h2>
                <p className="text-gray-600 mb-4">
                  Even if you request a refund, you get to keep:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Any websites we've built for you</li>
                  <li>Content we've created for your business</li>
                  <li>Social media accounts we've set up</li>
                  <li>Any leads generated during the service period</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Refund Process</h2>
                <p className="text-gray-600 mb-4">
                  To request a refund:
                </p>
                <ol className="list-decimal list-inside text-gray-600 space-y-2">
                  <li>Email us at hello@leadmasters.ai with "Refund Request" in the subject line</li>
                  <li>Include your order number and reason for the refund</li>
                  <li>We'll respond within 24 hours to discuss your concerns</li>
                  <li>If we can't resolve the issue, we'll process your refund within 5-7 business days</li>
                </ol>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Partial Refunds</h2>
                <p className="text-gray-600 mb-4">
                  In some cases, we may offer partial refunds for:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Services that have been partially completed</li>
                  <li>Requests made after the 30-day period</li>
                  <li>Situations where significant value has already been delivered</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Cancellation Policy</h2>
                <p className="text-gray-600 mb-4">
                  You can cancel your account at any time. Upon cancellation:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Your access to the platform will be terminated</li>
                  <li>You'll keep any work completed up to that point</li>
                  <li>No refund will be provided unless within the 30-day guarantee period</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Contact Information</h2>
                <p className="text-gray-600">
                  For any questions about refunds or cancellations, please contact us at hello@leadmasters.ai or call +1 (555) 123-4567.
                </p>
              </section>
            </div>
          )
        };

      default:
        return { title: '', lastUpdated: '', content: null };
    }
  };

  const { title, lastUpdated, content } = getContent();

  return (
    <div className="min-h-screen bg-white">
      <PublicHeader />
      <main className="pt-16">
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
              <p className="text-gray-600">Last updated: {lastUpdated}</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-8">
              {content}
            </div>
          </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}
