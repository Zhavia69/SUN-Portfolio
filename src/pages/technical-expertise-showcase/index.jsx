import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const TechnicalExpertiseShowcase = () => {
  const skillGroups = [
    {
      title: 'Programming & Web',
      icon: 'Code2',
      skills: ['PHP', 'Laravel', 'JavaScript', 'Python', 'Java', 'HTML5', 'CSS3', 'React', 'Vue.js'],
      description: 'Web application development, backend logic, frontend interfaces, and practical debugging.'
    },
    {
      title: 'Databases',
      icon: 'Database',
      skills: ['MySQL', 'PostgreSQL', 'SQLite', 'MariaDB', 'SQL Server'],
      description: 'CRUD systems, query troubleshooting, data validation, and database-backed application workflows.'
    },
    {
      title: 'Backend & Tools',
      icon: 'ServerCog',
      skills: ['REST APIs', 'Git/GitHub', 'Postman', 'Insomnia', 'Docker', 'Azure', 'Linux'],
      description: 'API validation, integration testing, deployment support, version control, and systems support.'
    },
    {
      title: 'Security & Concepts',
      icon: 'ShieldCheck',
      skills: ['Endpoint Security', 'Ethical Hacking Basics', 'Authentication', 'RBAC', 'SDLC', 'MVC', 'Application Security Basics'],
      description: 'Security-minded development, access controls, authentication flows, and secure support practices.'
    }
  ];

  const certifications = [
    'Security Analyst | Cyber Shujaa | Apr 2026',
    'Endpoint Security | Cisco Networking Academy | Jan 2025',
    'Introduction to Cyber Security | Cisco Networking Academy | Oct 2024',
    'Ethical Hacking | Cisco Networking Academy | Nov 2024',
    'Python Programming | JKUAT | Jun 2021',
    'Java Programming, Java SE8 | JKUAT | Jun 2021'
  ];

  const appliedExperience = [
    {
      role: 'IT Technical Officer',
      organization: 'Stima Sacco Head Office',
      period: 'Apr 2024 - Dec 2024',
      points: [
        'Supported web-based database systems in production environments',
        'Optimized and troubleshot MySQL databases',
        'Performed API testing and integration validation',
        'Supported Docker and Microsoft Azure deployment workflows',
        'Implemented endpoint security and access controls'
      ]
    },
    {
      role: 'Helpdesk Technical Support',
      organization: 'Damu Sasa / JiJi Health',
      period: 'Apr 2022 - Aug 2022',
      points: [
        'Built a Python-based web application that reduced task completion time by 40%',
        'Supported data validation and database operations',
        'Contributed to cloud database migration reducing infrastructure maintenance costs by 40%',
        'Delivered end-user support and training with 95% user satisfaction'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Technical Expertise - Samuel Ryan Ndung'u</title>
        <meta
          name="description"
          content="CV-backed technical skills for Samuel Ryan Ndung'u, including PHP, Laravel, JavaScript, Python, MySQL, REST APIs, Docker, Azure, Linux, and cybersecurity fundamentals."
        />
      </Helmet>
      <Header />
      <main className="pt-16">
        <section className="bg-gradient-to-br from-primary via-brand-blue to-brand-navy text-white py-24 sm:py-32 lg:py-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl">
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 mb-8">
                <Icon name="Code" size={20} />
                <span className="text-sm font-serif font-semibold">Technical Expertise</span>
              </div>
              <h1 className="text-5xl sm:text-6xl font-serif font-bold mb-6 leading-tight">
                Practical Skills for
                <span className="block text-gradient-gold">Reliable Digital Systems</span>
              </h1>
              <p className="text-lg text-white/90 leading-relaxed font-light">
                My technical profile is grounded in the CV: web application development, systems support, database management, REST API integration, cloud-based environments, and application security fundamentals.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link to="/project-portfolio-universe">
                  <Button variant="secondary" size="lg" iconName="Briefcase" iconPosition="left" className="bg-brand-gold text-primary hover:shadow-luxury-elevated">
                    View Projects
                  </Button>
                </Link>
                <Link to="/collaboration-center-contact-hub">
                  <Button variant="outline" size="lg" iconName="MessageCircle" iconPosition="left" className="border-white text-white hover:bg-white/10">
                    Contact Me
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 sm:py-32 lg:py-40 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-text-primary mb-4">Core Technical Skills</h2>
              <p className="text-lg font-light text-text-secondary max-w-3xl mx-auto">
                Skills are grouped exactly around the capability areas listed in the CV.
              </p>
            </div>

            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
              {skillGroups.map((group) => (
                <article key={group.title} className="bg-card rounded-xl p-6 shadow-luxury border border-border card-hover">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5">
                    <Icon name={group.icon} size={22} className="text-primary" />
                  </div>
                  <h3 className="text-xl font-serif font-semibold text-text-primary mb-3">{group.title}</h3>
                  <p className="text-sm text-text-secondary font-light leading-relaxed mb-5">{group.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <span key={skill} className="rounded-full bg-surface px-3 py-1 text-xs font-medium text-primary border border-border">
                        {skill}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 bg-surface border-y border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-8">
              {appliedExperience.map((item) => (
                <article key={item.role} className="bg-card rounded-xl p-8 shadow-luxury border border-border">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center">
                      <Icon name="BriefcaseBusiness" size={22} className="text-success" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-serif font-bold text-text-primary">{item.role}</h3>
                      <p className="text-primary font-serif font-semibold">{item.organization}</p>
                      <p className="text-sm text-text-secondary font-light">{item.period}</p>
                    </div>
                  </div>
                  <div className="grid gap-3">
                    {item.points.map((point) => (
                      <div key={point} className="flex items-start gap-3">
                        <Icon name="CheckCircle" size={17} className="text-success mt-0.5" />
                        <span className="text-sm text-text-secondary font-light">{point}</span>
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 sm:py-32 lg:py-40 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-10 items-start">
              <div>
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-text-primary mb-4">Certifications</h2>
                <p className="text-text-secondary font-light leading-relaxed mb-6">
                  These are the certifications listed in the CV.
                </p>
              </div>
              <div className="grid gap-3">
                {certifications.map((cert) => (
                  <div key={cert} className="bg-card rounded-lg border border-border p-4 flex items-center gap-3">
                    <Icon name="Award" size={18} className="text-brand-gold" />
                    <span className="text-sm font-serif font-semibold text-text-primary">{cert}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer showCTA={true} />
    </div>
  );
};

export default TechnicalExpertiseShowcase;
