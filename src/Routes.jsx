import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import CollaborationCenterContactHub from './pages/collaboration-center-contact-hub';
import AboutProfessionalJourney from './pages/about-professional-journey';
import ClientSuccessStoriesReviews from './pages/client-success-stories-reviews';
import ProjectPortfolioUniverse from './pages/project-portfolio-universe';
import TechnicalExpertiseShowcase from './pages/technical-expertise-showcase';
import HomepagePremiumItProfessional from './pages/homepage-premium-it-professional';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<HomepagePremiumItProfessional />} />
        <Route path="/collaboration-center-contact-hub" element={<CollaborationCenterContactHub />} />
        <Route path="/about-professional-journey" element={<AboutProfessionalJourney />} />
        <Route path="/professional-references" element={<ClientSuccessStoriesReviews />} />
        <Route path="/client-success-stories-reviews" element={<ClientSuccessStoriesReviews />} />
        <Route path="/project-portfolio-universe" element={<ProjectPortfolioUniverse />} />
        <Route path="/technical-expertise-showcase" element={<TechnicalExpertiseShowcase />} />
        <Route path="/homepage-premium-it-professional" element={<HomepagePremiumItProfessional />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
