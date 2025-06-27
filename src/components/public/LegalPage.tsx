
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
          lastUpdated: 'December 27, 2024',
          content: (
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
                <p className="text-gray-600 mb-4">
                  By accessing and using LeadMasters.ai ("Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Description of Service</h2>
                <p className="text-gray-600 mb-4">
                  LeadMasters.ai provides AI-powered lead generation tools and services for small businesses, including but not limited to:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
                  <li>AI-generated content creation for social media and marketing</li>
                  <li>Lead capture forms and landing page creation</li>
                  <li>CRM tools and customer relationship management</li>
                  <li>Marketing automation services and workflows</li>
                  <li>Website design and development services</li>
                  <li>Business setup and consultation services</li>
                  <li>Social media account setup and management</li>
                  <li>WhatsApp Business integration and automation</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. User Accounts and Registration</h2>
                <p className="text-gray-600 mb-4">
                  When you create an account with us, you must provide information that is accurate, complete, and current at all times. You are responsible for safeguarding the password and for all activities that occur under your account. You agree not to disclose your password to any third party.
                </p>
                <p className="text-gray-600 mb-4">
                  You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account. We will not be liable for any loss or damage arising from your failure to comply with this section.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Payment Terms and Billing</h2>
                <p className="text-gray-600 mb-4">
                  Payment for services is due upon purchase unless otherwise specified. We accept various payment methods as displayed during checkout. All prices are subject to change with 30 days notice.
                </p>
                <p className="text-gray-600 mb-4">
                  Subscription services will automatically renew unless cancelled at least 24 hours before the renewal date. You may cancel your subscription at any time through your account settings or by contacting our support team.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Intellectual Property Rights</h2>
                <p className="text-gray-600 mb-4">
                  The Service and its original content, features, and functionality are and will remain the exclusive property of LeadMasters.ai and its licensors. The Service is protected by copyright, trademark, and other laws.
                </p>
                <p className="text-gray-600 mb-4">
                  Content created for your business (websites, social media content, etc.) becomes your property upon full payment. You retain all rights to your business data and content you provide to us.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. User Conduct and Prohibited Uses</h2>
                <p className="text-gray-600 mb-4">
                  You may not use our Service:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
                  <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
                  <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
                  <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
                  <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                  <li>To submit false or misleading information</li>
                  <li>To upload or transmit viruses or any other type of malicious code</li>
                  <li>To spam, phish, pharm, pretext, spider, crawl, or scrape</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Service Availability</h2>
                <p className="text-gray-600 mb-4">
                  We strive to maintain 99.9% uptime but cannot guarantee uninterrupted service. We reserve the right to modify or discontinue the Service at any time with reasonable notice.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Limitation of Liability</h2>
                <p className="text-gray-600 mb-4">
                  In no event shall LeadMasters.ai, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the Service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Governing Law</h2>
                <p className="text-gray-600 mb-4">
                  These Terms shall be interpreted and governed by the laws of the State of Delaware, United States, without regard to conflict of law provisions.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Changes to Terms</h2>
                <p className="text-gray-600 mb-4">
                  We reserve the right to update these Terms of Service at any time. We will notify users of any material changes via email or through our Service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Contact Information</h2>
                <p className="text-gray-600">
                  If you have any questions about these Terms of Service, please contact us at:
                </p>
                <div className="mt-2 text-gray-600">
                  <p>Email: legal@leadmasters.ai</p>
                  <p>Phone: +1 (555) 123-4567</p>
                  <p>Address: 123 Business Ave, Suite 100, Business City, BC 12345</p>
                </div>
              </section>
            </div>
          )
        };

      case 'privacy':
        return {
          title: 'Privacy Policy',
          lastUpdated: 'December 27, 2024',
          content: (
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Information We Collect</h2>
                <p className="text-gray-600 mb-4">
                  We collect information you provide directly to us, such as when you create an account, use our services, or contact us for support.
                </p>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Personal Information:</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
                  <li>Name, email address, phone number</li>
                  <li>Business information (company name, industry, website)</li>
                  <li>Payment information (processed securely through third-party providers)</li>
                  <li>Communication preferences and history</li>
                </ul>

                <h3 className="text-lg font-semibold text-gray-900 mb-2">Usage Data:</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
                  <li>Log data (IP address, browser type, pages visited)</li>
                  <li>Device information and unique identifiers</li>
                  <li>Usage patterns and feature interactions</li>
                  <li>Performance and analytics data</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Your Information</h2>
                <p className="text-gray-600 mb-4">
                  We use the information we collect to:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
                  <li>Provide, maintain, and improve our services</li>
                  <li>Process transactions and send related information</li>
                  <li>Send technical notices, updates, and support messages</li>
                  <li>Respond to your comments and questions</li>
                  <li>Communicate with you about products, services, and promotions</li>
                  <li>Monitor and analyze trends and usage</li>
                  <li>Detect and prevent fraudulent transactions</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Information Sharing and Disclosure</h2>
                <p className="text-gray-600 mb-4">
                  We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
                  <li><strong>With your consent:</strong> When you explicitly agree to share information</li>
                  <li><strong>Service providers:</strong> Third-party companies that help us operate our platform (payment processors, analytics providers, etc.)</li>
                  <li><strong>Legal compliance:</strong> When required by law or to protect our rights</li>
                  <li><strong>Business transfers:</strong> In connection with any merger, sale, or acquisition</li>
                  <li><strong>Safety and security:</strong> To protect the rights, property, or safety of our users</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Data Security</h2>
                <p className="text-gray-600 mb-4">
                  We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
                  <li>Encryption of sensitive data in transit and at rest</li>
                  <li>Regular security audits and vulnerability assessments</li>
                  <li>Access controls and authentication measures</li>
                  <li>Employee training on data protection practices</li>
                  <li>Secure data centers with physical security measures</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Data Retention</h2>
                <p className="text-gray-600 mb-4">
                  We retain your personal information for as long as necessary to provide our services and fulfill the purposes outlined in this policy, unless a longer retention period is required by law.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Your Rights and Choices</h2>
                <p className="text-gray-600 mb-4">
                  You have the following rights regarding your personal information:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
                  <li><strong>Access:</strong> Request access to your personal information</li>
                  <li><strong>Correction:</strong> Request correction of inaccurate information</li>
                  <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                  <li><strong>Portability:</strong> Request a copy of your data in a structured format</li>
                  <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
                  <li><strong>Restriction:</strong> Request limitation on processing of your data</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Cookies and Tracking</h2>
                <p className="text-gray-600 mb-4">
                  We use cookies and similar tracking technologies to collect information about your browsing activities. You can control cookies through your browser settings.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Third-Party Services</h2>
                <p className="text-gray-600 mb-4">
                  Our Service may contain links to third-party websites or services. We are not responsible for the privacy practices of these third parties.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">9. International Data Transfers</h2>
                <p className="text-gray-600 mb-4">
                  Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place for such transfers.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Children's Privacy</h2>
                <p className="text-gray-600 mb-4">
                  Our Service is not intended for children under 13. We do not knowingly collect personal information from children under 13.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Contact Us</h2>
                <p className="text-gray-600">
                  If you have any questions about this Privacy Policy, please contact us at:
                </p>
                <div className="mt-2 text-gray-600">
                  <p>Email: privacy@leadmasters.ai</p>
                  <p>Phone: +1 (555) 123-4567</p>
                  <p>Address: 123 Business Ave, Suite 100, Business City, BC 12345</p>
                </div>
              </section>
            </div>
          )
        };

      case 'refund':
        return {
          title: 'Cancellation & Refund Policy',
          lastUpdated: 'December 27, 2024',
          content: (
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. 30-Day Money-Back Guarantee</h2>
                <p className="text-gray-600 mb-4">
                  We stand behind our work with a comprehensive 30-day money-back guarantee on all our packages. If you're not completely satisfied with our service, you can request a full refund within 30 days of your purchase date.
                </p>
                <p className="text-gray-600 mb-4">
                  This guarantee covers all our service packages including Lead Generation Starter Pack, Business Launch Package, and Growth & Automation Pro.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Refund Eligibility Criteria</h2>
                <p className="text-gray-600 mb-4">
                  To be eligible for a refund, you must meet the following criteria:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
                  <li>Request the refund within 30 calendar days of your initial purchase</li>
                  <li>Provide a detailed explanation of your dissatisfaction</li>
                  <li>Allow our team to attempt to resolve any issues first</li>
                  <li>Have made a good faith effort to use and implement our services</li>
                  <li>Respond to our support team's requests for information within 5 business days</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. What You Keep After Refund</h2>
                <p className="text-gray-600 mb-4">
                  Even if you request and receive a refund, you get to keep all the valuable assets we've created for your business:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
                  <li>Any websites we've designed and built for you</li>
                  <li>All social media content we've created</li>
                  <li>Social media accounts we've set up and optimized</li>
                  <li>Lead capture forms and landing pages</li>
                  <li>Brand identity elements (logos, color schemes, etc.)</li>
                  <li>Any leads generated during the service period</li>
                  <li>Email templates and marketing materials</li>
                  <li>CRM setup and data (if applicable)</li>
                </ul>
                <p className="text-gray-600 mb-4">
                  This means you receive significant value even in the unlikely event that you're not satisfied with our service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Refund Request Process</h2>
                <p className="text-gray-600 mb-4">
                  To request a refund, please follow these steps:
                </p>
                <ol className="list-decimal list-inside text-gray-600 space-y-2 mb-4">
                  <li>Email us at hello@leadmasters.ai with "Refund Request" in the subject line</li>
                  <li>Include your full name, order number, and purchase date</li>
                  <li>Provide a detailed explanation of why you're requesting a refund</li>
                  <li>Our team will respond within 24 hours to discuss your concerns</li>
                  <li>We'll work with you to address any issues and find a solution</li>
                  <li>If we can't resolve the issue to your satisfaction, we'll process your refund within 5-7 business days</li>
                </ol>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Refund Processing</h2>
                <p className="text-gray-600 mb-4">
                  Once approved, refunds will be processed as follows:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
                  <li>Credit card payments: 5-7 business days to appear on your statement</li>
                  <li>PayPal payments: 3-5 business days</li>
                  <li>Bank transfers: 7-10 business days</li>
                  <li>Other payment methods: As specified by the payment provider</li>
                </ul>
                <p className="text-gray-600 mb-4">
                  Refunds will be processed using the same payment method used for the original purchase.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Partial Refunds</h2>
                <p className="text-gray-600 mb-4">
                  In certain circumstances, we may offer partial refunds:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
                  <li>Services that have been substantially completed</li>
                  <li>Requests made after the 30-day guarantee period</li>
                  <li>Situations where significant business value has already been delivered</li>
                  <li>Custom work that cannot be returned or reused</li>
                </ul>
                <p className="text-gray-600 mb-4">
                  Partial refund amounts will be determined based on the work completed and value delivered.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Subscription Cancellation Policy</h2>
                <p className="text-gray-600 mb-4">
                  For ongoing subscription services:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
                  <li>You can cancel your subscription at any time through your account dashboard</li>
                  <li>Cancellations take effect at the end of your current billing period</li>
                  <li>No refunds for partial billing periods unless within the 30-day guarantee</li>
                  <li>You retain access to all services until the end of your paid period</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Non-Refundable Items</h2>
                <p className="text-gray-600 mb-4">
                  The following items are generally non-refundable:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
                  <li>Third-party service fees (domain registrations, hosting, etc.)</li>
                  <li>Advertising spend on your behalf</li>
                  <li>Custom development work after approval and delivery</li>
                  <li>Training sessions that have been completed</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Dispute Resolution</h2>
                <p className="text-gray-600 mb-4">
                  If you're not satisfied with our refund decision, we encourage you to:
                </p>
                <ol className="list-decimal list-inside text-gray-600 space-y-2 mb-4">
                  <li>Contact our customer service manager for a review</li>
                  <li>Request mediation through a neutral third party</li>
                  <li>Provide additional documentation to support your case</li>
                </ol>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Contact Information</h2>
                <p className="text-gray-600">
                  For any questions about refunds, cancellations, or this policy, please contact us:
                </p>
                <div className="mt-2 text-gray-600">
                  <p><strong>Email:</strong> hello@leadmasters.ai</p>
                  <p><strong>Phone:</strong> +1 (555) 123-4567</p>
                  <p><strong>Business Hours:</strong> Monday-Friday, 9 AM - 6 PM EST</p>
                  <p><strong>Address:</strong> 123 Business Ave, Suite 100, Business City, BC 12345</p>
                </div>
                <p className="text-gray-600 mt-4">
                  Our customer service team is committed to resolving any issues promptly and fairly.
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
            
            <div className="bg-white rounded-lg shadow-sm p-8 lg:p-12">
              <div className="max-w-none prose prose-gray prose-lg">
                {content}
              </div>
            </div>
          </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}
