import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const TestimonialCarousel = () => {
  const [currentReference, setCurrentReference] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const references = [
    {
      id: 1,
      name: "Alphones Omesa",
      position: "Applications Systems Officer TL",
      company: "Stima Sacco",
      initials: "AO",
      accent: "from-blue-500 to-sky-500",
      relationship: "Professional referee from Samuel's Stima Sacco experience",
      summary: "Listed on the CV as a referee connected to Samuel's work supporting web-based database systems, production environments, MySQL troubleshooting, and incident resolution at Stima Sacco Head Office.",
      focus: ["Production systems", "Database support", "Application support"],
      context: {
        period: "Apr 2024 - Dec 2024",
        role: "IT Technical Officer",
        environment: "Stima Sacco Head Office"
      }
    },
    {
      id: 2,
      name: "Abraham Kipruto",
      position: "IT Technical Officer",
      company: "Stima Sacco",
      initials: "AK",
      accent: "from-green-500 to-emerald-500",
      relationship: "Professional referee from Samuel's systems support work",
      summary: "Listed on the CV as a referee for work involving technical support, access controls, endpoint security, deployment support, API testing, and production support workflows.",
      focus: ["Technical support", "Endpoint security", "API validation"],
      context: {
        period: "Apr 2024 - Dec 2024",
        role: "IT Technical Officer",
        environment: "Stima Sacco Head Office"
      }
    },
    {
      id: 3,
      name: "Brian Orina",
      position: "Software Developer",
      company: "Damu Sasa / JiJi Health",
      initials: "BO",
      accent: "from-orange-500 to-amber-500",
      relationship: "Professional referee from Samuel's helpdesk and web tooling experience",
      summary: "Listed on the CV as a referee connected to Samuel's helpdesk technical support role, Python-based workflow application, cloud database migration support, testing, troubleshooting, and end-user training.",
      focus: ["Python web tools", "Cloud database migration", "User support"],
      context: {
        period: "Apr 2022 - Aug 2022",
        role: "Helpdesk Technical Support",
        environment: "Damu Sasa / JiJi Health"
      }
    }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;

    const timer = setInterval(() => {
      setCurrentReference((prev) => (prev + 1) % references?.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [isAutoPlaying, references?.length]);

  const nextReference = () => {
    setCurrentReference((prev) => (prev + 1) % references?.length);
    setIsAutoPlaying(false);
  };

  const prevReference = () => {
    setCurrentReference((prev) => (prev - 1 + references?.length) % references?.length);
    setIsAutoPlaying(false);
  };

  const goToReference = (index) => {
    setCurrentReference(index);
    setIsAutoPlaying(false);
  };

  const current = references?.[currentReference];

  return (
    <section className="py-16 bg-background" aria-labelledby="references-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 id="references-heading" className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            Professional References
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            Referee information from Samuel's CV, presented as professional reference context.
          </p>
        </div>

        <div className="relative bg-card rounded-2xl shadow-premium border border-border overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-0">
            <div className="p-8 lg:p-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center gap-1 text-brand-gold">
                  {Array.from({ length: 5 }, (_, index) => (
                    <Icon key={index} name="CheckCircle" size={16} className="fill-current" />
                  ))}
                </div>
                <span className="text-sm font-medium text-text-secondary">
                  CV referee
                </span>
              </div>

              <blockquote className="text-lg text-text-primary mb-8 leading-relaxed">
                {current?.summary}
              </blockquote>

              <div className="flex items-center space-x-4 mb-8">
                <div className={`h-16 w-16 rounded-full bg-gradient-to-br ${current?.accent} flex items-center justify-center text-lg font-bold text-white`}>
                  {current?.initials}
                </div>
                <div>
                  <h4 className="font-semibold text-text-primary">{current?.name}</h4>
                  <p className="text-text-secondary text-sm">{current?.position}</p>
                  <p className="text-primary text-sm font-medium">{current?.company}</p>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {Object.entries(current?.context)?.map(([key, value], index) => (
                  <div key={index} className="bg-surface rounded-lg p-4">
                    <div className="text-xs font-semibold uppercase text-text-secondary mb-1">
                      {key?.replace(/([A-Z])/g, ' $1')?.trim()}
                    </div>
                    <div className="text-sm font-medium text-text-primary">{value}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative bg-surface p-8 lg:p-12">
              <div className="h-full flex flex-col justify-center">
                <div className="mb-8">
                  <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary mb-4">
                    <Icon name="UserCheck" size={14} aria-hidden="true" />
                    <span>{current?.relationship}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-text-primary mb-3">Reference Scope</h3>
                  <p className="text-text-secondary">
                    These areas match the work history and project outcomes listed in Samuel's CV.
                  </p>
                </div>

                <div className="grid gap-3">
                  {current?.focus?.map((item) => (
                    <div key={item} className="flex items-center gap-3 rounded-lg border border-border bg-card p-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10 text-success">
                        <Icon name="Check" size={18} aria-hidden="true" />
                      </div>
                      <span className="text-sm font-medium text-text-primary">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 rounded-lg border border-border bg-card p-4 text-sm text-text-secondary">
                  Referee contact details are available from the full CV when formal verification is required.
                </div>
              </div>
            </div>
          </div>

          <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
            <button
              onClick={prevReference}
              className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-premium hover:bg-white transition-smooth"
              aria-label="Show previous reference"
            >
              <Icon name="ChevronLeft" size={20} className="text-text-primary" />
            </button>
          </div>

          <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
            <button
              onClick={nextReference}
              className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-premium hover:bg-white transition-smooth"
              aria-label="Show next reference"
            >
              <Icon name="ChevronRight" size={20} className="text-text-primary" />
            </button>
          </div>
        </div>

        <div className="flex justify-center space-x-2 mt-8">
          {references?.map((reference, index) => (
            <button
              key={reference.id}
              onClick={() => goToReference(index)}
              className={`w-3 h-3 rounded-full transition-smooth ${
                index === currentReference ? 'bg-primary' : 'bg-border hover:bg-border/60'
              }`}
              aria-label={`Show reference for ${reference.name}`}
            />
          ))}
        </div>

        <div className="flex justify-center mt-6">
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="flex items-center space-x-2 text-text-secondary hover:text-primary transition-smooth text-sm"
          >
            <Icon name={isAutoPlaying ? "Pause" : "Play"} size={16} />
            <span>{isAutoPlaying ? "Pause" : "Play"} Reference Rotation</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;
