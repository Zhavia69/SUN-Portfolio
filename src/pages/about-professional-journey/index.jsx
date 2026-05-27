import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';
import HeroSection from './components/HeroSection';
import PhilosophySection from './components/PhilosophySection';
import TimelineSection from './components/TimelineSection';
import EducationSection from './components/EducationSection';

const AboutProfessionalJourney = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>About Samuel - Professional Journey | Samuel Portfolio</title>
        <meta 
          name="description" 
          content="Samuel Ryan Ndung'u is a Nairobi-based IT professional with experience in web application development, systems support, database management, cloud-based environments, API integration, and application security fundamentals." 
        />
        <meta name="keywords" content="Samuel Ryan Ndungu, Nairobi IT professional, web application development, systems support, database management, Laravel, Python, MySQL, cybersecurity" />
        <meta property="og:title" content="About Samuel - Professional Journey | Samuel Portfolio" />
        <meta property="og:description" content="A CV-backed overview of Samuel's education, certifications, software projects, and IT support experience." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/about-professional-journey" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main>
          {/* Hero Section with Professional Portrait */}
          <HeroSection />
          
          {/* Philosophy & Core Values */}
          <PhilosophySection />
          
          {/* Interactive Career Timeline */}
          <TimelineSection />
          
          {/* Education & Certifications */}
          <EducationSection />
          
        </main>

        {/* Footer */}
        <Footer showCTA={true} />
      </div>
    </>
  );
};

export default AboutProfessionalJourney;
