
import React from 'react';
import { PublicHeader } from './public/PublicHeader';
import { EnterpriseHero } from './public/EnterpriseHero';
import { ProblemSection } from './public/ProblemSection';
import { SolutionShowcase } from './public/SolutionShowcase';
import { ROICalculator } from './public/ROICalculator';
import { TestimonialsWall } from './public/TestimonialsWall';
import { IntegrationShowcase } from './public/IntegrationShowcase';
import { PricingSection } from './public/PricingSection';
import { FinalCTA } from './public/FinalCTA';
import { PublicFooter } from './public/PublicFooter';

export function PublicWebsite() {
  return (
    <div className="min-h-screen bg-background">
      <PublicHeader />
      <main>
        <EnterpriseHero />
        <ProblemSection />
        <SolutionShowcase />
        <ROICalculator />
        <TestimonialsWall />
        <IntegrationShowcase />
        <PricingSection />
        <FinalCTA />
      </main>
      <PublicFooter />
    </div>
  );
}
