import React from 'react';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Hero from './components/Hero';
import { AboutSection, CertificationsSection } from './components/AboutAndCertifications';
import SkillsDashboard from './components/SkillsDashboard';
import ExperienceSection from './components/ExperienceSection';
import ProjectsSection from './components/ProjectsSection';
import InteractiveTerminal from './components/InteractiveTerminal';
import CodeSnippetShowcase from './components/CodeSnippetShowcase';
import TechStackVisualization from './components/TechStackVisualization';
import ContactSection from './components/ContactSection';

function App() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Navigation */}
      <Navigation />

      {/* Add padding for fixed nav */}
      <div className="pt-16">
        {/* Hero Section */}
        <section id="home">
          <Hero />
        </section>

        {/* About Section */}
        <section id="about">
          <AboutSection />
        </section>

        {/* Skills Dashboard */}
        <section id="skills">
          <SkillsDashboard />
        </section>

        {/* Interactive Terminal */}
        <section id="terminal">
          <InteractiveTerminal />
        </section>

        {/* Tech Stack Visualization */}
        <section id="tech-stack">
          <TechStackVisualization />
        </section>

        {/* Code Snippet Showcase */}
        <section id="code-snippets">
          <CodeSnippetShowcase />
        </section>

        {/* Experience Section */}
        <section id="experience">
          <ExperienceSection />
        </section>

        {/* Projects Section */}
        <section id="projects">
          <ProjectsSection />
        </section>

        {/* Certifications Section */}
        <section id="certifications">
          <CertificationsSection />
        </section>

        {/* Contact Section */}
        <section id="contact">
          <ContactSection />
        </section>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}

export default App;
