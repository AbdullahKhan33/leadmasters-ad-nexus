
import React from 'react';
import { PublicHeader } from './public/PublicHeader';
import { HeroSection } from './public/HeroSection';
import { AboutSection } from './public/AboutSection';
import { BlogSection } from './public/BlogSection';
import { PricingSection } from './public/PricingSection';
import { ContactSection } from './public/ContactSection';
import { PublicFooter } from './public/PublicFooter';

export function PublicWebsite() {
  return (
    <div className="min-h-screen bg-white">
      <PublicHeader />
      <main>
        <HeroSection />
        <AboutSection />
        <BlogSection />
        <PricingSection />
        <ContactSection />
      </main>
      <PublicFooter />
    </div>
  );
}
