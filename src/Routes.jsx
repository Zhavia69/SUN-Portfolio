import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route, Navigate } from "react-router-dom";
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
        {/* Primary Routes - Clean URLs */}
        <Route path="/" element={<HomepagePremiumItProfessional />} />
        <Route path="/about" element={<AboutProfessionalJourney />} />
        <Route path="/projects" element={<ProjectPortfolioUniverse />} />
        <Route path="/skills" element={<TechnicalExpertiseShowcase />} />
        <Route path="/contact" element={<CollaborationCenterContactHub />} />
        <Route path="/testimonials" element={<ClientSuccessStoriesReviews />} />
        
        {/* Legacy Routes - Redirect for backward compatibility */}
        <Route path="/homepage-premium-it-professional" element={<Navigate to="/" replace />} />
        <Route path="/about-professional-journey" element={<Navigate to="/about" replace />} />
        <Route path="/project-portfolio-universe" element={<Navigate to="/projects" replace />} />
        <Route path="/technical-expertise-showcase" element={<Navigate to="/skills" replace />} />
        <Route path="/collaboration-center-contact-hub" element={<Navigate to="/contact" replace />} />
        <Route path="/professional-references" element={<Navigate to="/testimonials" replace />} />
        <Route path="/client-success-stories-reviews" element={<Navigate to="/testimonials" replace />} />
        
        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
