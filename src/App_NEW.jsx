import React from 'react';
import { motion } from 'framer-motion';

// Import all sections
import Hero from './components/Hero';
import { AboutSection, CertificationsSection } from './components/AboutAndCertifications';
import SkillsDashboard from './components/SkillsDashboard';
import ExperienceSection from './components/ExperienceSection';
import ProjectsSection from './components/ProjectsSection';
import ContactSection from './components/ContactSection';

// Navigation component
const Navigation = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="font-bold text-lg bg-gradient-to-r from-sky-500 to-cyan-500 bg-clip-text text-transparent"
          >
            SRN
          </motion.div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-slate-700 hover:text-sky-600 font-medium text-sm transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-slate-100"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block px-4 py-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

// Footer component
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About footer */}
          <div>
            <h4 className="text-white font-bold mb-4">Samuel Ryan Ndung'u</h4>
            <p className="text-sm leading-relaxed">
              IT Systems & Backend Engineer. Building, securing, and optimizing production systems.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#projects" className="hover:text-sky-400 transition-colors">Featured Projects</a></li>
              <li><a href="#skills" className="hover:text-sky-400 transition-colors">Technical Skills</a></li>
              <li><a href="#contact" className="hover:text-sky-400 transition-colors">Get In Touch</a></li>
            </ul>
          </div>

          {/* Social links */}
          <div>
            <h4 className="text-white font-bold mb-4">Connect</h4>
            <div className="space-y-2 text-sm">
              <a href="mailto:sammuelryan4050@gmail.com" className="block hover:text-sky-400 transition-colors">
                Email
              </a>
              <a href="https://wa.me/254743248996" target="_blank" rel="noopener noreferrer" className="block hover:text-sky-400 transition-colors">
                WhatsApp
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="block hover:text-sky-400 transition-colors">
                LinkedIn
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="block hover:text-sky-400 transition-colors">
                GitHub
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-700 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-sm text-slate-500">
              © {currentYear} Samuel Ryan Ndung'u. All rights reserved.
            </p>
            <p className="text-sm text-slate-500 mt-4 sm:mt-0">
              Designed & Built with React + Tailwind + Framer Motion
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Main App component
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
