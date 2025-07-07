'use client';

import WorkHero from '@/components/work/WorkHero';
import ProjectCarousel from '@/components/work/ProjectCarousel';
import ServicesShowcase from '@/components/work/ServicesShowcase';
import WorkCTA from '@/components/work/WorkCTA';

export default function Work() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      <WorkHero />
      <ProjectCarousel />
      <ServicesShowcase />
      <WorkCTA />
    </div>
  );
}
