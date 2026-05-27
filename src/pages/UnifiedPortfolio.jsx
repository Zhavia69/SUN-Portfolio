import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../components/ui/Header';
import Footer from '../components/ui/Footer';
import ScrollProgress from '../components/ScrollProgress';
import Icon from '../components/AppIcon';

// Import section components from existing pages
import HeroSection from './homepage-premium-it-professional/components/HeroSection';
import SkillsMatrix from './homepage-premium-it-professional/components/SkillsMatrix';
import TestimonialCarousel from './homepage-premium-it-professional/components/TestimonialCarousel';
import QuickContact from './homepage-premium-it-professional/components/QuickContact';

const UnifiedPortfolio = () => {
  const [activeSection, setActiveSection] = useState('home');
  const sectionRefs = useRef({});

  const sections = [
    { id: 'home', label: 'Home', icon: 'Home' },
    { id: 'about', label: 'About', icon: 'User' },
    { id: 'expertise', label: 'Expertise', icon: 'Code' },
    { id: 'portfolio', label: 'Portfolio', icon: 'Briefcase' },
    { id: 'contact', label: 'Contact', icon: 'MessageCircle' }
  ];

  // Handle smooth scroll to section
  const scrollToSection = (sectionId) => {
    const element = sectionRefs.current[sectionId];
    if (element) {
      const headerHeight = 80;
      const targetPosition = element.offsetTop - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
      
      setActiveSection(sectionId);
    }
  };

  // Track scroll position for active section
  useEffect(() => {
    const handleScroll = () => {
      const headerHeight = 80;
      
      for (const sectionId of sections.map(s => s.id)) {
        const element = sectionRefs.current[sectionId];
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= headerHeight + 100 && rect.bottom > headerHeight + 100) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>Samuel Ryan Ndung'u - Premium IT Professional | Nairobi</title>
        <meta
          name="description"
          content="Samuel Ryan Ndung'u - IT Professional specializing in web development, systems architecture, and database management."
        />
      </Helmet>

      {/* Unified Header with scroll navigation */}
      <UnifiedHeader sections={sections} activeSection={activeSection} onSectionClick={scrollToSection} />
      
      {/* Scroll progress indicator */}
      <ScrollProgress />

      {/* Main content */}
      <main className="pt-20">
        {/* Hero Section */}
        <section ref={(el) => sectionRefs.current.home = el} id="home-section">
          <HeroSection />
        </section>

        {/* About Section */}
        <section ref={(el) => sectionRefs.current.about = el} id="about-section" className="py-24 sm:py-32 lg:py-40 bg-surface">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-5xl sm:text-6xl font-serif font-bold text-foreground mb-6 animate-fadeIn">
                Professional Journey
              </h2>
              <div className="w-16 h-1 bg-gradient-to-r from-transparent via-brand-gold to-transparent mx-auto"></div>
            </div>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 animate-slideUp">
                <p className="text-lg text-text-secondary font-light leading-relaxed">
                  Computer Science professional based in Nairobi with expertise in building secure, scalable systems. Specialized in web application development, backend architecture, database optimization, and enterprise support.
                </p>
                <div className="space-y-4">
                  <div className="p-6 bg-card rounded-xl border border-border shadow-luxury hover:shadow-luxury-elevated transition-luxury">
                    <h3 className="font-serif font-semibold text-brand-gold mb-2">Core Expertise</h3>
                    <p className="text-sm text-text-secondary font-light">PHP Laravel • JavaScript • Python • MySQL • REST APIs • Docker • Azure</p>
                  </div>
                  <div className="p-6 bg-card rounded-xl border border-border shadow-luxury hover:shadow-luxury-elevated transition-luxury">
                    <h3 className="font-serif font-semibold text-brand-copper mb-2">Certifications</h3>
                    <p className="text-sm text-text-secondary font-light">Endpoint Security • Cybersecurity • Ethical Hacking (Cisco Networking Academy)</p>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-primary/10 to-brand-gold/10 rounded-2xl p-8 border border-brand-gold/20 min-h-96 flex items-center justify-center shadow-luxury animate-fadeIn">
                <div className="text-center">
                  <div className="text-6xl font-serif font-bold text-gradient-luxury mb-4">5+</div>
                  <p className="text-lg text-text-secondary font-light">Years of Professional Experience</p>
                  <p className="text-sm text-text-secondary font-light mt-4">Building production-grade systems</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Expertise Section */}
        <section ref={(el) => sectionRefs.current.expertise = el} id="expertise-section">
          <SkillsMatrix />
        </section>

        {/* Portfolio Section */}
        <section ref={(el) => sectionRefs.current.portfolio = el} id="portfolio-section" className="py-24 sm:py-32 lg:py-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-5xl sm:text-6xl font-serif font-bold text-foreground mb-6 animate-fadeIn">
                Featured Projects
              </h2>
              <div className="w-16 h-1 bg-gradient-to-r from-transparent via-brand-gold to-transparent mx-auto mb-8"></div>
              <p className="text-lg text-text-secondary max-w-3xl mx-auto font-light">
                Curated selection of projects showcasing technical expertise and innovative problem-solving.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { 
                  title: 'RESTful API Integration System', 
                  tech: ['JavaScript', 'Python', 'Postman'], 
                  impact: 'Reliable service-to-service data exchange',
                  icon: '🔄'
                },
                { 
                  title: 'CRUD Data Management', 
                  tech: ['MySQL', 'SQL', 'Optimization'], 
                  impact: 'Optimized data processing workflows',
                  icon: '📊'
                },
                { 
                  title: 'Laravel MVC Backend', 
                  tech: ['Laravel', 'PHP', 'Migrations'], 
                  impact: 'Scalable PHP backend foundation',
                  icon: '🛠️'
                }
              ].map((project, idx) => (
                <div key={idx} className="bg-card rounded-xl p-8 shadow-luxury border border-border card-hover hover:border-brand-gold/50 animate-slideUp" style={{animationDelay: `${idx * 0.1}s`}}>
                  <div className="text-4xl mb-4">{project.icon}</div>
                  <h3 className="text-xl font-serif font-semibold text-foreground mb-4">{project.title}</h3>
                  <p className="text-sm text-text-secondary font-light mb-6">{project.impact}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t, i) => (
                      <span key={i} className="px-3 py-1 bg-brand-gold/10 text-primary text-xs rounded-lg font-medium">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section ref={(el) => sectionRefs.current.testimonials = el} id="testimonials-section">
          <TestimonialCarousel />
        </section>

        {/* Contact Section */}
        <section ref={(el) => sectionRefs.current.contact = el} id="contact-section" className="py-24 sm:py-32 lg:py-40 bg-gradient-to-br from-primary via-brand-navy to-foreground text-white relative overflow-hidden">
          {/* Animated tech background */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-gold rounded-full mix-blend-multiply filter blur-3xl animate-pulse-slow"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-copper rounded-full mix-blend-multiply filter blur-3xl animate-pulse-slow" style={{animationDelay: '2s'}}></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16 animate-slideUp">
              <h2 className="text-5xl sm:text-6xl font-serif font-bold mb-6">
                Let's Build Together
              </h2>
              <p className="text-xl text-white/80 font-light max-w-2xl mx-auto">
                Ready to discuss your next project or technical challenge? I'm available for collaborations and consultations.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {[
                { title: 'Email', desc: 'Professional responses within 24 hours', icon: '✉️' },
                { title: 'WhatsApp', desc: 'Quick questions and real-time support', icon: '💬' },
                { title: 'Location', desc: 'Nairobi, Kenya (EAT UTC+3)', icon: '📍' }
              ].map((item, idx) => (
                <div key={idx} className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20 text-center shadow-luxury hover:bg-white/20 transition-luxury animate-slideUp" style={{animationDelay: `${idx * 0.1}s`}}>
                  <div className="text-5xl mb-4">{item.icon}</div>
                  <h3 className="font-serif font-semibold mb-2 text-lg">{item.title}</h3>
                  <p className="text-white/80 font-light text-sm">{item.desc}</p>
                </div>
              ))}
            </div>

            <QuickContact />
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer showCTA={false} />
    </div>
  );
};

// Custom unified Header
const UnifiedHeader = ({ sections, activeSection, onSectionClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId) => {
    onSectionClick(sectionId);
    setIsMenuOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-luxury ${
        isScrolled 
          ? 'bg-background/98 backdrop-blur-lg shadow-luxury border-b border-border' 
          : 'bg-background/95 backdrop-blur-md'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-20 px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <button 
            onClick={() => handleNavClick('home')}
            className="flex items-center space-x-3 hover:opacity-90 transition-luxury"
          >
            <div className="relative">
              <div className="w-11 h-11 bg-gradient-to-br from-brand-gold to-brand-copper rounded-xl flex items-center justify-center shadow-luxury">
                <span className="text-primary font-serif font-bold text-lg">S</span>
              </div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-serif font-semibold text-foreground">Samuel</h1>
              <p className="text-xs text-text-secondary -mt-1 font-light">Professional</p>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => handleNavClick(section.id)}
                className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-luxury ${
                  activeSection === section.id
                    ? 'bg-primary text-primary-foreground shadow-luxury border border-brand-gold/50'
                    : 'text-text-secondary hover:text-primary hover:bg-surface'
                }`}
              >
                <span>{section.label}</span>
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-text-secondary hover:text-primary hover:bg-surface transition-luxury"
          >
            <Icon name={isMenuOpen ? 'X' : 'Menu'} size={24} />
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-border bg-background/98 backdrop-blur-lg">
            <nav className="px-4 py-4 space-y-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => handleNavClick(section.id)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-luxury ${
                    activeSection === section.id
                      ? 'bg-primary text-primary-foreground shadow-luxury'
                      : 'text-text-secondary hover:text-primary hover:bg-surface'
                  }`}
                >
                  {section.label}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default UnifiedPortfolio;
