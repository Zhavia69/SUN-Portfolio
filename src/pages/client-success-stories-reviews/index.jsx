import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const ClientSuccessStoriesReviews = () => {
  const references = [
    {
      name: 'Alphones Omesa',
      role: 'Applications Systems Officer TL',
      organization: 'Stima Sacco',
      context: 'Professional referee connected to Samuel\'s IT Technical Officer role at Stima Sacco Head Office.',
      scope: ['Web-based database systems', 'Production support', 'MySQL troubleshooting']
    },
    {
      name: 'Abraham Kipruto',
      role: 'IT Technical Officer',
      organization: 'Stima Sacco',
      context: 'Professional referee connected to systems support, access controls, endpoint security, and deployment support.',
      scope: ['Technical support', 'Endpoint security', 'API validation']
    },
    {
      name: 'Brian Orina',
      role: 'Software Developer',
      organization: 'Damu Sasa / JiJi Health',
      context: 'Professional referee connected to Samuel\'s helpdesk support role, Python workflow tooling, and database migration support.',
      scope: ['Python web tooling', 'Cloud database migration', 'End-user support']
    }
  ];

  const outcomes = [
    {
      value: '40%',
      label: 'Task Completion Time Reduced',
      source: 'Damu Sasa / JiJi Health',
      icon: 'Timer'
    },
    {
      value: '40%',
      label: 'Infrastructure Maintenance Cost Reduced',
      source: 'Cloud database migration support',
      icon: 'TrendingDown'
    },
    {
      value: '95%',
      label: 'User Satisfaction',
      source: 'End-user support and training',
      icon: 'Smile'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Professional References - Samuel Ryan Ndung'u</title>
        <meta
          name="description"
          content="Professional references and CV-backed outcomes for Samuel Ryan Ndung'u, including Stima Sacco and Damu Sasa / JiJi Health reference context."
        />
      </Helmet>

      <Header />
      <main className="pt-16">
        <section className="bg-gradient-to-br from-primary via-brand-blue to-brand-navy text-white py-24 sm:py-32 lg:py-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl">
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 mb-8">
                <Icon name="UserCheck" size={20} />
                <span className="text-sm font-serif font-semibold">Professional References</span>
              </div>
              <h1 className="text-5xl sm:text-6xl font-serif font-bold mb-6 leading-tight">
                References and
                <span className="block text-gradient-gold">Verified Outcomes</span>
              </h1>
              <p className="text-lg text-white/90 leading-relaxed font-light">
                A CV-backed view of referees and measurable outcomes from Samuel's professional experience.
              </p>
            </div>
          </div>
        </section>

        <section className="py-24 sm:py-32 lg:py-40 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-text-primary mb-4">CV Referees</h2>
              <p className="text-lg font-light text-text-secondary max-w-3xl mx-auto">
                Contact details are intentionally not published on the website. They can be shared from the full CV when a formal reference check is needed.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {references.map((reference) => (
                <article key={reference.name} className="bg-card rounded-xl p-6 shadow-luxury border border-border card-hover">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-5">
                    <span className="text-primary font-serif font-bold">
                      {reference.name.split(' ').map((part) => part[0]).join('')}
                    </span>
                  </div>
                  <h3 className="text-xl font-serif font-semibold text-text-primary">{reference.name}</h3>
                  <p className="text-primary font-serif font-semibold text-sm">{reference.role}</p>
                  <p className="text-text-secondary text-sm font-light mb-5">{reference.organization}</p>
                  <p className="text-sm text-text-secondary font-light leading-relaxed mb-5">{reference.context}</p>
                  <div className="grid gap-2">
                    {reference.scope.map((item) => (
                      <div key={item} className="flex items-center gap-2 text-sm text-text-secondary font-light">
                        <Icon name="CheckCircle" size={15} className="text-success" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 bg-surface border-y border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-text-primary mb-4">Measurable CV Outcomes</h2>
              <p className="text-lg font-light text-text-secondary max-w-3xl mx-auto">
                These numbers are taken from the professional experience section of the CV.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {outcomes.map((outcome) => (
                <div key={outcome.label} className="bg-card rounded-xl p-8 shadow-luxury border border-border text-center">
                  <div className="w-14 h-14 bg-brand-gold/20 rounded-lg flex items-center justify-center mx-auto mb-5">
                    <Icon name={outcome.icon} size={24} className="text-brand-navy" />
                  </div>
                  <div className="text-4xl font-serif font-bold text-primary mb-2">{outcome.value}</div>
                  <h3 className="font-serif font-semibold text-text-primary mb-2">{outcome.label}</h3>
                  <p className="text-sm text-text-secondary font-light">{outcome.source}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 bg-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-text-primary mb-4">Need Formal Reference Verification?</h2>
            <p className="text-lg font-light text-text-secondary mb-8">
              Samuel can provide the full CV with referee contact details during hiring, contracting, or formal due diligence conversations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/collaboration-center-contact-hub">
                <Button variant="default" size="lg" iconName="MessageCircle" iconPosition="left" className="bg-brand-gold hover:shadow-luxury-elevated">
                  Contact Samuel
                </Button>
              </Link>
              <Link to="/project-portfolio-universe">
                <Button variant="outline" size="lg" iconName="Briefcase" iconPosition="left">
                  View Projects
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer showCTA={true} />
    </div>
  );
};

export default ClientSuccessStoriesReviews;
