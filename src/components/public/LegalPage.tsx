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
          lastUpdated: 'October 2, 2024',
          content: (
            <div className="space-y-8">
              <section>
                <p className="text-gray-600 mb-4">
                  LEADMASTERS AI SOLUTIONS PRIVATE LIMITED, #81/16, Haralukunte, Hsr Layout, Bangalore, Karnataka, India, 560102. ("we," "us," or "our") operates the website leadmasters.ai and the associated services, including our mobile application (collectively referred to as the "LeadMasters AI App"). This Privacy Policy outlines how LEADMASTERS AI SOLUTIONS PRIVATE LIMITED, #81/16, Haralukunte, Hsr Layout, Bangalore, Karnataka, India, 560102 collects, uses, and safeguards your personal data when you use our services.
                </p>
                <p className="text-gray-600 mb-4">
                  We are committed to ensuring that your privacy is protected in accordance with applicable international data protection laws, including the General Data Protection Regulation (GDPR), California Consumer Privacy Act (CCPA), and other relevant standards. This Privacy Policy explains how we collect, use, disclose, and protect your personal information when using our services, including integrations with Meta platforms (Facebook, Instagram, Threads, WhatsApp), LinkedIn, X (formerly Twitter), Google Ads, and YouTube.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Definitions</h2>
                <div className="space-y-3 text-gray-600">
                  <p><strong>1.1</strong> "Platform" refers to LeadMasters AI, accessible via leadmasters.ai and leadmasters.site.</p>
                  <p><strong>1.2</strong> "We," "Us," or "Our" refers to LeadMasters AI, its affiliates, and subsidiaries.</p>
                  <p><strong>1.3</strong> "User," "You," or "Your" refers to the individual or entity accessing and using LeadMasters AI.</p>
                  <p><strong>1.4</strong> "Services" means the lead generation, ad optimization, and social media integration services provided by LeadMasters AI, including integrations with third-party platforms such as Meta, LinkedIn, X, Google Ads, and YouTube.</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Eligibility</h2>
                <p className="text-gray-600 mb-4">To use our Services, you must:</p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Be at least 18 years old or have reached the age of majority in your jurisdiction.</li>
                  <li>Comply with all applicable laws and regulations, including international privacy laws such as GDPR.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. User Responsibilities</h2>
                <p className="text-gray-600 mb-4">You agree not to:</p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Use the platform in any way that violates applicable laws or platform policies (e.g., Meta, LinkedIn, X).</li>
                  <li>Post or transmit content that is defamatory, abusive, obscene, or unlawful.</li>
                  <li>Interfere with the proper working of the platform, including uploading viruses or harmful code.</li>
                  <li>Use automated systems, such as bots or scripts, to interact with our Services without permission.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Account Registration</h2>
                <p className="text-gray-600 mb-4">To use our Services, you may be required to register and create an account. You agree to:</p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Provide accurate, current, and complete information during the registration process.</li>
                  <li>Maintain the confidentiality of your account credentials.</li>
                  <li>Be responsible for all activities that occur under your account.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Payment and Subscription</h2>
                <p className="text-gray-600 mb-4">By subscribing to any paid features of the platform, you agree to:</p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Provide accurate payment details.</li>
                  <li>Allow us to charge you for the selected service plan.</li>
                  <li>Comply with any subscription renewal terms.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Refund Policy</h2>
                <p className="text-gray-600 mb-4">
                  All payments are final unless otherwise specified. Refunds may be granted at our sole discretion under specific circumstances outlined in our Refund Policy. If you believe you are entitled to a refund, please contact us at support@leadmasters.ai within 30 days from the date of payment.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. License</h2>
                <p className="text-gray-600 mb-4">
                  LeadMasters AI grants you a limited, non-exclusive, non-transferable license to access and use the platform for your personal or business purposes, including ad generation and campaign management.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Intellectual Property</h2>
                <p className="text-gray-600 mb-4">
                  All content and materials on the platform, including but not limited to software, logos, graphics, and text, are owned by LeadMasters AI or its licensors. You are not permitted to reproduce, distribute, or modify any content without prior written permission from LeadMasters AI.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Termination</h2>
                <p className="text-gray-600 mb-4">
                  LeadMasters AI reserves the right to suspend or terminate your access to the platform without cause or notice if you violate these Terms, engage in any unlawful activity, or fail to comply with third-party integration policies.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Dispute Resolution</h2>
                <p className="text-gray-600 mb-4">
                  Any disputes arising under these Terms shall be resolved by binding arbitration in accordance with the Arbitration and Conciliation Act, 1996, of India. The location of arbitration shall be Bangalore, India, and the language of arbitration shall be English.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Limitation of Liability</h2>
                <p className="text-gray-600 mb-4">
                  LeadMasters AI shall not be liable for any indirect, incidental, special, or consequential damages arising out of your use of the platform, including but not limited to loss of data or profit. In no event shall our liability exceed the amount paid by you for the service in the preceding 12 months.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Indemnity</h2>
                <p className="text-gray-600 mb-4">
                  You agree to indemnify, defend, and hold harmless LeadMasters AI and its affiliates, officers, employees, and agents from any claims, liabilities, damages, losses, or expenses, including legal fees, arising out of your use of the platform or breach of these Terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Service Availability</h2>
                <p className="text-gray-600 mb-4">
                  While we strive to ensure continuous access to our platform, we cannot guarantee uninterrupted service. LeadMasters AI shall not be liable for any outages or disruptions caused by scheduled maintenance, third-party service outages, or events beyond our control.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">14. Third-Party Services</h2>
                <p className="text-gray-600 mb-4">
                  LeadMasters AI integrates with third-party services such as Google Ads, Facebook, LinkedIn, YouTube, and X. Your use of such third-party services is subject to their respective terms and conditions. LeadMasters AI is not responsible for any actions, policies, or data practices of these third-party services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">15. Acceptable Use Policy</h2>
                <p className="text-gray-600 mb-4">Users must comply with the Acceptable Use Policy while using LeadMasters AI. The following activities are prohibited:</p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Running campaigns that promote illegal, fraudulent, or harmful content.</li>
                  <li>Using the platform to harass or harm others.</li>
                  <li>Misusing the platform for unauthorized access, hacking, or security breaches.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">16. Termination Without Cause</h2>
                <p className="text-gray-600 mb-4">
                  LeadMasters AI reserves the right to terminate any account without cause and without prior notice. If your account is terminated, you may no longer access our platform or services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">17. No Waiver</h2>
                <p className="text-gray-600 mb-4">
                  Failure by LeadMasters AI to enforce any part of these Terms at any time does not constitute a waiver of our right to enforce it in the future.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">18. User-Generated Content</h2>
                <p className="text-gray-600 mb-4">
                  Any content created or uploaded by users (including ad copy, social media posts, etc.) remains the property of the user. However, by uploading such content, you grant LeadMasters AI a worldwide, royalty-free, non-exclusive, perpetual license to use, display, distribute, and modify such content in connection with the operation of the platform.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">19. Modifications to Terms</h2>
                <p className="text-gray-600 mb-4">
                  LeadMasters AI reserves the right to modify these Terms at any time. Any changes will be effective immediately upon posting to the platform. Your continued use of the platform after the posting of the modified Terms constitutes your agreement to the changes.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">20. Governing Law</h2>
                <p className="text-gray-600 mb-4">
                  These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of laws principles.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">21. Contact Information</h2>
                <p className="text-gray-600">
                  If you have any questions regarding these Terms, please contact us at:
                </p>
                <div className="mt-2 text-gray-600">
                  <p>Email: support@leadmasters.ai</p>
                  <p>Phone: +91 8179212829</p>
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
