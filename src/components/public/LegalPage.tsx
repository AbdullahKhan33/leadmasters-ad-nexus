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
          lastUpdated: 'October 2, 2024',
          content: (
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
                <p className="text-gray-600 mb-4">
                  LEADMASTERS AI SOLUTIONS PRIVATE LIMITED, #81/16, Haralukunte, Hsr Layout, Bangalore, Karnataka, India, 560102. ("we," "us," or "our") operates the website leadmasters.ai and the associated services, including our mobile application (collectively referred to as the "LeadMasters AI App"). This Privacy Policy outlines how LEADMASTERS AI SOLUTIONS PRIVATE LIMITED, #81/16, Haralukunte, Hsr Layout, Bangalore, Karnataka, India, 560102 collects, uses, and safeguards your personal data when you use our services.
                </p>
                <p className="text-gray-600 mb-4">
                  We are committed to ensuring that your privacy is protected in accordance with applicable international data protection laws, including the General Data Protection Regulation (GDPR), California Consumer Privacy Act (CCPA), and other relevant standards. This Privacy Policy explains how we collect, use, disclose, and protect your personal information when using our services, including integrations with Meta platforms (Facebook, Instagram, Threads, WhatsApp), LinkedIn, X (formerly Twitter), Google Ads, and YouTube.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Data Collection</h2>
                <p className="text-gray-600 mb-4">We collect personal information in the following ways:</p>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Information You Provide Directly:</h3>
                    <p className="text-gray-600 mb-4">This includes information provided by creating an account, subscribing to our services, interacting with our platform, and connecting to third-party services like LinkedIn, X, Google Ads, and YouTube. This may include your name, email address, profile information, and other contact details.</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Meta Platforms Integration:</h3>
                    <p className="text-gray-600 mb-2">We collect data when you connect Meta platforms to our services, including:</p>
                    <ul className="list-disc list-inside text-gray-600 space-y-1 mb-4">
                      <li><strong>Instagram:</strong> Profile information, content, engagement metrics, and any data necessary for our automation and ad features.</li>
                      <li><strong>WhatsApp:</strong> Contact details, messaging data, and user interactions.</li>
                      <li><strong>Threads and Facebook:</strong> Public profile data, posts, usage analytics, and ad campaign metrics.</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">LinkedIn Integration:</h3>
                    <p className="text-gray-600 mb-2">When you connect your LinkedIn account to LeadMasters AI, we collect:</p>
                    <ul className="list-disc list-inside text-gray-600 space-y-1 mb-4">
                      <li><strong>Profile Information:</strong> Such as your name, profile photo, headline, and other public information.</li>
                      <li><strong>Engagement Metrics:</strong> Data on post interactions, connections, and other engagement data for automated post creation, scheduling, and ad generation.</li>
                      <li><strong>Content Data:</strong> Information you provide to generate posts or ad campaigns.</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">X (formerly Twitter) Integration:</h3>
                    <p className="text-gray-600 mb-2">When you use LeadMasters AI to integrate with X, we collect:</p>
                    <ul className="list-disc list-inside text-gray-600 space-y-1 mb-4">
                      <li><strong>Profile Information:</strong> Username, public tweets, followers, and engagement metrics.</li>
                      <li><strong>Content Data:</strong> Information to schedule and publish posts, generate leads, and create ad content.</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Google Ads and YouTube Integration:</h3>
                    <p className="text-gray-600 mb-2">When you connect Google Ads or YouTube to LeadMasters AI, we collect:</p>
                    <ul className="list-disc list-inside text-gray-600 space-y-1 mb-4">
                      <li><strong>Google Ads Campaign Data:</strong> Including keywords, performance metrics, demographics, and ad analytics to facilitate ad generation, campaign optimization, and reporting.</li>
                      <li><strong>YouTube Profile and Engagement Data:</strong> Public channel information, video interactions, and analytics to optimize content strategies and enhance ad targeting.</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Usage Information:</h3>
                    <p className="text-gray-600 mb-4">We collect data automatically through cookies, web beacons, and similar technologies to understand how users interact with our platform. This includes pages visited, time spent, actions performed, and interaction data from our integrations.</p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. How We Use Your Data</h2>
                <p className="text-gray-600 mb-4">We use the collected data to:</p>
                <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
                  <li><strong>Provide and Improve Services:</strong> Including integrating with Meta, LinkedIn, X, Google Ads, and YouTube, managing ad campaigns, creating and posting content, generating ads, and generating leads.</li>
                  <li><strong>Communications:</strong> Sending service-related communications such as updates, promotional offers, and newsletters, based on user consent.</li>
                  <li><strong>Personalization and Marketing:</strong> Customizing your experience and providing tailored recommendations, including targeted advertising on LinkedIn, Meta, X, Google Ads, and YouTube platforms.</li>
                  <li><strong>Compliance and Legal Requirements:</strong> To adhere to applicable legal obligations, industry standards, and platform policies.</li>
                </ul>

                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Ad Generation and Advertising Activities:</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    <li><strong>Meta Platforms:</strong> We use collected data for generating targeted advertisements, managing ad campaigns, and analyzing engagement metrics to improve ad performance.</li>
                    <li><strong>LinkedIn:</strong> We use LinkedIn data to generate ad content targeting specific professional demographics, using engagement data to create, optimize, and schedule ads tailored to user segments.</li>
                    <li><strong>X:</strong> We use X data for ad campaign creation, analyzing post performance, and generating targeted ads, including automated tools to craft engaging ads and deploy them effectively.</li>
                    <li><strong>Google Ads Integration:</strong> We use Google Ads data to create, manage, and optimize ad campaigns. This includes analyzing campaign metrics to improve targeting, adjust ad spend, and enhance overall ad performance.</li>
                    <li><strong>YouTube Integration:</strong> Data from YouTube is used to optimize video content, create targeted ads, and enhance engagement through personalized ad strategies.</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Sharing of Information</h2>
                <p className="text-gray-600 mb-4">We may share your data with:</p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li><strong>Service Providers:</strong> Third-party vendors who support our services, including hosting, analytics, customer support, data processing, and ad management.</li>
                  <li><strong>Business Partners and Advertisers:</strong> Where permitted by law and based on user consent, we may share information with our business partners to provide co-branded services or to help with advertising and marketing initiatives.</li>
                  <li><strong>Meta, LinkedIn, X, Google, and YouTube Platforms:</strong> Data is shared with these platforms to facilitate integrations, including ad generation, ensuring compliance with their respective privacy policies and terms.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. User Consent</h2>
                <p className="text-gray-600 mb-4">
                  By using our services, you consent to our data collection practices. You may withdraw your consent at any time by contacting us at support@leadmasters.ai. Withdrawal of consent may limit your access to specific features of our platform, including ad generation services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Contact Us</h2>
                <p className="text-gray-600">
                  If you have any questions about this Privacy Policy, please contact us at:
                </p>
                <div className="mt-2 text-gray-600">
                  <p>Email: support@leadmasters.ai</p>
                  <p>Website: https://leadmasters.ai</p>
                </div>
              </section>
            </div>
          )
        };

      case 'refund':
        return {
          title: 'Cancellation & Refund Policy',
          lastUpdated: '30 aug 2024',
          content: (
            <div className="space-y-8">
              <section>
                <p className="text-gray-600 mb-4">
                  At LeadMasters AI, we strive to ensure customer satisfaction with our services. However, we understand that sometimes situations arise where you may need to cancel a service or request a refund. This Cancellation and Refund Policy outlines the terms and conditions for cancellations and refunds.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Cancellation Policy</h2>
                
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">1.1 Subscription Cancellations</h3>
                  <p className="text-gray-600 mb-4">
                    You may cancel your subscription to any of our services at any time through your account settings. Upon cancellation, your subscription will remain active until the end of the current billing cycle. No further payments will be charged after the cancellation is processed.
                  </p>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">1.2 One-Time Service Cancellations</h3>
                  <p className="text-gray-600 mb-4">
                    If you have purchased a one-time service, cancellations are accepted within 24 hours of purchase, provided that the service has not been initiated or delivered. After the 24-hour window, or if the service has commenced, cancellations will no longer be accepted.
                  </p>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">1.3 Workshop/Event Cancellations</h3>
                  <p className="text-gray-600 mb-4">
                    Cancellations for workshops, events, or scheduled sessions must be made at least 48 hours prior to the start of the event for a full refund. Cancellations made within 48 hours of the event may not be eligible for a refund but may be eligible for rescheduling or credits towards future events.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Refund Policy</h2>
                
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">2.1 Refund Eligibility</h3>
                  <p className="text-gray-600 mb-4">Refunds may be granted at our sole discretion under the following circumstances:</p>
                  <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
                    <li>Technical issues that prevent you from accessing the platform or services for an extended period (e.g., system downtime).</li>
                    <li>Errors in billing or duplicate charges.</li>
                    <li>Refunds for unused portions of a subscription if the service is terminated by LeadMasters AI without cause.</li>
                  </ul>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">2.2 Non-Refundable Services</h3>
                  <p className="text-gray-600 mb-4">
                    Certain services and products may be marked as non-refundable. This includes digital products, downloadable materials, or services that have already been delivered or initiated. Payments for completed services, such as campaigns that have already been executed or delivered, are non-refundable.
                  </p>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">2.3 How to Request a Refund</h3>
                  <p className="text-gray-600 mb-4">
                    If you believe you are entitled to a refund, please contact us at support@leadmasters.ai within 30 days of your purchase or the date the issue occurred. All refund requests must include your account information, the transaction details, and a description of the issue.
                  </p>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">2.4 Processing of Refunds</h3>
                  <p className="text-gray-600 mb-4">
                    Approved refunds will be processed within 14 business days of the request being granted. Refunds will be issued to the original payment method. If that method is no longer valid, an alternative refund method will be arranged. Any bank or transaction fees incurred during the refund process will be deducted from the refunded amount, where applicable.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. No Refund Policy</h2>
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">3.1 Subscription and Usage</h3>
                  <p className="text-gray-600 mb-4">
                    Refunds will not be issued for partially used subscriptions or for failure to use the platform's services. It is the user's responsibility to manage their subscription and use of the services. Refunds will not be granted for services that are suspended or terminated due to a violation of our Terms and Conditions or Acceptable Use Policy.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Modifications to the Policy</h2>
                <p className="text-gray-600 mb-4">
                  LeadMasters AI reserves the right to modify this Cancellation and Refund Policy at any time. Any changes to this policy will be effective immediately upon posting on our website. Continued use of our platform or services after changes to the policy constitutes your acceptance of the revised policy.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Contact Information</h2>
                <p className="text-gray-600">
                  If you have any questions or concerns about this policy, please contact us at:
                </p>
                <div className="mt-2 text-gray-600">
                  <p>Email: support@leadmasters.ai</p>
                  <p>Phone: +91 8147808161</p>
                </div>
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
