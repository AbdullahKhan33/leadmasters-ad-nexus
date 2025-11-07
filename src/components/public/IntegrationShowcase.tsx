import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export function IntegrationShowcase() {
  const integrations = {
    'Real Estate Portals': [
      { name: 'Property Finder', logo: '🏢', status: 'live' },
      { name: 'Bayut', logo: '🏘️', status: 'live' },
      { name: 'Dubizzle', logo: '🏗️', status: 'live' },
      { name: 'Emirates.Estate', logo: '🏛️', status: 'live' }
    ],
    'Ad Platforms': [
      { name: 'Facebook Ads', logo: '📘', status: 'live' },
      { name: 'Instagram Ads', logo: '📸', status: 'live' },
      { name: 'Google Ads', logo: '🔍', status: 'live' },
      { name: 'LinkedIn Ads', logo: '💼', status: 'live' }
    ],
    'Messaging': [
      { name: 'WhatsApp Business', logo: '💬', status: 'live' },
      { name: 'Email', logo: '📧', status: 'live' },
      { name: 'SMS', logo: '📱', status: 'live' },
      { name: 'Telegram', logo: '✈️', status: 'coming' }
    ],
    'CRM & Tools': [
      { name: 'Salesforce', logo: '☁️', status: 'live' },
      { name: 'HubSpot', logo: '🔶', status: 'live' },
      { name: 'Zapier', logo: '⚡', status: 'live' },
      { name: 'Slack', logo: '💬', status: 'live' }
    ]
  };

  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Connects With Everything You Use
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            50+ integrations built-in. No complex setup. No middleware needed.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Integration grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {Object.entries(integrations).map(([category, items]) => (
              <div key={category} className="bg-background rounded-2xl border-2 border-border p-8">
                <h3 className="text-xl font-bold text-foreground mb-6">{category}</h3>
                <div className="grid grid-cols-2 gap-4">
                  {items.map((integration, index) => (
                    <div key={index} className="relative group">
                      <div className="bg-muted hover:bg-muted/70 rounded-lg p-4 transition-all duration-300 border border-border hover:border-primary/50">
                        <div className="flex items-center gap-3">
                          <span className="text-3xl">{integration.logo}</span>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-foreground text-sm truncate">
                              {integration.name}
                            </p>
                            {integration.status === 'live' ? (
                              <div className="flex items-center gap-1 text-xs text-green-500">
                                <CheckCircle2 className="w-3 h-3" />
                                <span>Live</span>
                              </div>
                            ) : (
                              <span className="text-xs text-muted-foreground">Coming Soon</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* API access */}
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl border-2 border-primary/20 p-8 text-center">
            <h3 className="text-2xl font-bold text-foreground mb-3">
              Need a Custom Integration?
            </h3>
            <p className="text-muted-foreground mb-6">
              Full REST API & Webhooks available. Build any integration you need.
            </p>
            <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              <span>API Documentation</span>
              <span className="text-border">•</span>
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              <span>Webhook Support</span>
              <span className="text-border">•</span>
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              <span>Developer Support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
