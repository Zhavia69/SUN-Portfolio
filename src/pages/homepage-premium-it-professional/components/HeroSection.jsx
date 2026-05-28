import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import ContactModal from '../../../components/ContactModal';

const HeroSection = () => {
  const [currentCaseStudy, setCurrentCaseStudy] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showContactModal, setShowContactModal] = useState(false);

  const caseStudyHighlights = [
    {
      id: 1,
      title: "RESTful API Integration System",
      client: "Academic & Personal Project",
      result: "Reliable service-to-service data exchange",
      metric: "JavaScript, Python, Postman",
      status: "Completed",
      icon: "Workflow"
    },
    {
      id: 2,
      title: "CRUD Data Management System",
      client: "MySQL Application Project",
      result: "Optimized data processing workflows",
      metric: "MySQL, SQL queries, CRUD",
      status: "Completed",
      icon: "Database"
    },
    {
      id: 3,
      title: "Laravel MVC Backend System",
      client: "Personal Development Project",
      result: "Scalable PHP backend foundation",
      metric: "Laravel, MVC, migrations",
      status: "In Progress",
      icon: "Code2"
    }
  ];

  const systemStatus = [
    { name: "Web Applications", status: "Building", uptime: "PHP, JavaScript, React" },
    { name: "Database Support", status: "Hands-on", uptime: "MySQL, PostgreSQL, SQL" },
    { name: "Cloud & Tools", status: "Practical", uptime: "Docker, Azure, Linux" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    const caseStudyTimer = setInterval(() => {
      setCurrentCaseStudy((prev) => (prev + 1) % caseStudyHighlights.length);
    }, 4000);

    return () => {
      clearInterval(timer);
      clearInterval(caseStudyTimer);
    };
  }, [caseStudyHighlights.length]);

  const formatTime = (date) => {
    return date?.toLocaleTimeString('en-KE', {
      timeZone: 'Africa/Nairobi',
      hour12: false,
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <section aria-labelledby="hero-heading" className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 block md:hidden" aria-hidden="true">
        <img
          src="/assets/images/sun1.jpg"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <video
        autoPlay
        loop
        muted
        playsInline
        preload="none"
        poster="/assets/images/sun1.jpg"
        aria-hidden="true"
        className="hidden md:block absolute inset-0 w-full h-full object-cover"
      >
        <source src="https://assets.mixkit.co/videos/31029/31029-720.mp4" type="video/mp4" />
        <p className="sr-only">Background video for the hero section.</p>
      </video>

      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-br from-black/75 via-black/70 to-black/80" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          <div className="space-y-8 text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
            <div className="inline-flex items-center space-x-2 bg-success/20 text-success px-5 py-2.5 rounded-full text-sm font-medium backdrop-blur-md border border-success/30">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
              <span className="font-light">Available for IT Support & Web Projects</span>
              <time
                dateTime={currentTime.toISOString()}
                className="text-gray-300 font-light"
              >
                | {formatTime(currentTime)} EAT
              </time>
            </div>

            <div className="space-y-6">
              <h1 id="hero-heading" className="text-5xl sm:text-6xl lg:text-7xl font-serif font-bold leading-tight text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
                <span className="block">Samuel Ryan</span>
                <span className="block">Ndung'u</span>
                <span className="block text-gradient-luxury">
                  IT Professional.
                </span>
              </h1>
              <p className="text-xl sm:text-2xl font-medium text-brand-gold drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                Premium Web Development & Systems Architecture
              </p>
              <p className="text-lg text-gray-100 max-w-2xl leading-relaxed font-light drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                Results-driven computer science professional based in Nairobi. Specializing in PHP Laravel, JavaScript, Python, MySQL, REST APIs, Docker, and production-grade systems. Building secure, scalable solutions with precision.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 sm:gap-6 pt-4">
              <div className="rounded-xl bg-white/10 p-5 text-center backdrop-blur-md border border-white/10 hover:bg-white/15 transition-luxury">
                <div className="text-3xl font-serif font-bold text-brand-gold">40%</div>
                <div className="text-sm text-gray-300 font-light mt-2">Efficiency gain</div>
              </div>
              <div className="rounded-xl bg-white/10 p-5 text-center backdrop-blur-md border border-white/10 hover:bg-white/15 transition-luxury">
                <div className="text-3xl font-serif font-bold text-brand-copper">40%</div>
                <div className="text-sm text-gray-300 font-light mt-2">Cost savings</div>
              </div>
              <div className="rounded-xl bg-white/10 p-5 text-center backdrop-blur-md border border-white/10 hover:bg-white/15 transition-luxury">
                <div className="text-3xl font-serif font-bold text-brand-gold">95%</div>
                <div className="text-sm text-gray-300 font-light mt-2">Satisfaction</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact">
                <Button
                  variant="default"
                  size="lg"
                  iconName="Calendar"
                  iconPosition="left"
                  className="bg-brand-gold hover:bg-brand-gold/90 w-full sm:w-auto"
                >
                  Discuss a Project
                </Button>
              </Link>
              <Link to="/projects">
                <Button
                  variant="outline"
                  size="lg"
                  iconName="Briefcase"
                  iconPosition="left"
                  className="w-full sm:w-auto"
                >
                  View Software Projects
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-white/20">
              <Button
                variant="secondary"
                size="sm"
                iconName="Mail"
                iconPosition="left"
                onClick={() => setShowContactModal(true)}
                className="bg-white/10 hover:bg-white/20 text-white border-white/20"
              >
                Quick Contact
              </Button>
              <span className="text-sm text-gray-300">|</span>
              <a
                href="https://www.linkedin.com/in/ndunguintelops/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-gray-300 hover:text-brand-gold transition-smooth"
                aria-label="Connect on LinkedIn"
              >
                <Icon name="Linkedin" size={16} aria-hidden="true" />
                <span className="text-sm font-medium">LinkedIn</span>
              </a>
              <a
                href="https://github.com/Zhavia69"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-gray-300 hover:text-brand-gold transition-smooth"
                aria-label="Visit GitHub profile"
              >
                <Icon name="Github" size={16} aria-hidden="true" />
                <span className="text-sm font-medium">GitHub</span>
              </a>
            </div>
          </div>

          <div className="space-y-8">
            <div className="relative">
              <div className="relative w-80 h-80 mx-auto max-w-full">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/70 to-brand-blue/70 rounded-2xl blur-lg opacity-80" />
                <div className="relative h-full bg-white/5 rounded-2xl p-2 shadow-xl backdrop-blur-sm overflow-hidden group">
                  <Image
                    src="/assets/images/sun1.jpg"
                    alt="Samuel Ryan Ndung'u - IT Professional"
                    className="w-full h-full object-cover rounded-xl transition-transform duration-500 ease-in-out group-hover:scale-105"
                  />
                </div>
              </div>
            </div>

            <div className="bg-card rounded-xl p-6 shadow-premium border border-border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-text-primary">CV Project Highlights</h3>
                <div className="flex space-x-1" role="tablist" aria-label="Current project highlight indicators">
                  {caseStudyHighlights.map((item, index) => (
                    <button
                      key={item.id}
                      type="button"
                      role="tab"
                      aria-label={`Show project highlight: ${item.title}`}
                      aria-selected={index === currentCaseStudy}
                      onClick={() => setCurrentCaseStudy(index)}
                      className={`w-2 h-2 rounded-full transition-smooth ${
                        index === currentCaseStudy ? 'bg-primary' : 'bg-border'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-4" aria-live="polite">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name={caseStudyHighlights[currentCaseStudy]?.icon} size={20} className="text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="font-medium text-text-primary">
                      {caseStudyHighlights[currentCaseStudy]?.title}
                    </h4>
                    <p className="text-sm text-text-secondary">
                      {caseStudyHighlights[currentCaseStudy]?.client}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-success/10 rounded-lg p-3">
                    <div className="text-sm font-medium text-success">
                      {caseStudyHighlights?.[currentCaseStudy]?.result}
                    </div>
                  </div>
                  <div className="bg-brand-gold/10 rounded-lg p-3">
                    <div className="text-sm font-medium text-brand-navy">
                      {caseStudyHighlights?.[currentCaseStudy]?.metric}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-xl p-6 shadow-premium border border-border">
              <h3 className="font-semibold text-text-primary mb-4">Current Technical Focus</h3>
              <div className="space-y-3">
                {systemStatus?.map((system, index) => (
                  <div key={index} className="flex items-center justify-between gap-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-success rounded-full" />
                      <span className="text-sm text-text-primary">{system?.name}</span>
                    </div>
                    <div className="text-right">
                      <span className="block text-xs text-success font-medium">{system?.status}</span>
                      <span className="block text-xs text-text-secondary">{system?.uptime}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-border">
                <div className="text-xs text-text-secondary">
                  Nairobi, Kenya | Last updated: {formatTime(currentTime)} EAT
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ContactModal isOpen={showContactModal} onClose={() => setShowContactModal(false)} />
    </section>
  );
};

export default HeroSection;
