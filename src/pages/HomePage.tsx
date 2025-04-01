
import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import HowItWorksSection from '@/components/home/HowItWorksSection';
import CallToActionSection from '@/components/home/CallToActionSection';

interface HomePageProps {
  heroImage?: string;
}

const HomePage = ({ heroImage }: HomePageProps) => {
  return (
    <div className="container mx-auto px-4 py-12">
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <CallToActionSection />
    </div>
  );
};

export default HomePage;
