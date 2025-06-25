"use client";

import HeroSection from '@/components/home/HeroSection';
import ServicesSection from '@/components/home/ServicesSection';
import AboutSection from '@/components/home/AboutSection';
import WhyUsSection from '@/components/home/WhyUsSection';
import ClientLogoCarousel from '@/components/home/ClientLogoCarousel';

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <WhyUsSection />
      <ClientLogoCarousel />
    </>
  );
}