
import React from 'react';
import { PublicHeader } from './PublicHeader';
import { PublicFooter } from './PublicFooter';
import { ContactSection } from './ContactSection';

export function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <PublicHeader />
      <main>
        <ContactSection />
      </main>
      <PublicFooter />
    </div>
  );
}
