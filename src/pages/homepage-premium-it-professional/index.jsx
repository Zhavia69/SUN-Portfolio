import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';
import HeroSection from './components/HeroSection';
import SkillsMatrix from './components/SkillsMatrix';
import TestimonialCarousel from './components/TestimonialCarousel';
import TrustSignals from './components/TrustSignals';
import QuickContact from './components/QuickContact';

const HomepagePremiumItProfessional = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Samuel Ryan Ndung'u - IT Professional | Nairobi</title>
        <meta
          name="description"
          content="Samuel Ryan Ndung'u is a Nairobi-based IT professional focused on web application development, systems support, database management, REST API integration, and security-minded technical support."
        />
      </Helmet>
      <Header />
      {/* Hero Section */}
      <HeroSection />
      {/* Skills Matrix */}
      <SkillsMatrix />
      {/* Testimonial Carousel */}
      <TestimonialCarousel />
      {/* Trust Signals */}
      <TrustSignals />
      {/* Quick Contact - includes floating widgets */}
      <QuickContact />
      {/* Footer */}
      <Footer showCTA={true} />
    </div>
  );
};

export default HomepagePremiumItProfessional;
