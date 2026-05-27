import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';
import ContactHero from './components/ContactHero';
import QuickContactOptions from './components/QuickContactOptions';
import ProjectInquiryForm from './components/ProjectInquiryForm';
import TrustCredentials from './components/TrustCredentials';

const CollaborationCenterContactHub = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Contact Samuel Ryan Ndung'u | IT Professional</title>
        <meta
          name="description"
          content="Contact Samuel Ryan Ndung'u for web application development, systems support, database troubleshooting, REST API integration, and security-minded IT support."
        />
      </Helmet>
      <Header />
      
      <main className="pt-16">
        <ContactHero />
        <QuickContactOptions />
        <ProjectInquiryForm />
        <TrustCredentials />
      </main>
      
      <Footer showCTA={false} />
    </div>
  );
};

export default CollaborationCenterContactHub;
