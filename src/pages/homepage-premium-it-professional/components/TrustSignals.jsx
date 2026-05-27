import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustSignals = () => {
  const experienceHighlights = [
    {
      title: 'IT Technical Officer',
      organization: 'Stima Sacco Head Office',
      period: 'Apr 2024 - Dec 2024',
      icon: 'Building2',
      accent: 'from-blue-500 to-sky-500',
      points: ['Web-based database systems', 'MySQL troubleshooting', 'API testing', 'Docker and Azure deployment support']
    },
    {
      title: 'Helpdesk Technical Support',
      organization: 'Damu Sasa / JiJi Health',
      period: 'Apr 2022 - Aug 2022',
      icon: 'Headphones',
      accent: 'from-green-500 to-emerald-500',
      points: ['Python workflow application', 'Cloud database migration', 'Testing and troubleshooting', 'End-user training']
    },
    {
      title: 'BSc Computer Science',
      organization: 'Catholic University of Eastern Africa',
      period: 'Education',
      icon: 'GraduationCap',
      accent: 'from-orange-500 to-amber-500',
      points: ['Computer science foundation', 'Software development', 'Databases', 'Systems thinking']
    }
  ];

  const certifications = [
    {
      title: 'Security Analyst',
      issuer: 'Cyber Shujaa',
      date: 'Apr 2026',
      status: 'Security'
    },
    {
      title: 'Endpoint Security',
      issuer: 'Cisco Networking Academy',
      date: 'Jan 2025',
      status: 'Endpoint'
    },
    {
      title: 'Introduction to Cyber Security',
      issuer: 'Cisco Networking Academy',
      date: 'Oct 2024',
      status: 'Cybersecurity'
    },
    {
      title: 'Ethical Hacking',
      issuer: 'Cisco Networking Academy',
      date: 'Nov 2024',
      status: 'Security'
    },
    {
      title: 'Python Programming',
      issuer: 'JKUAT',
      date: 'Jun 2021',
      status: 'Programming'
    },
    {
      title: 'Java Programming, Java SE8',
      issuer: 'JKUAT',
      date: 'Jun 2021',
      status: 'Programming'
    }
  ];

  const softwareProjects = [
    {
      title: 'RESTful API Integration System',
      description: 'Built and tested backend APIs using JavaScript, Python, and Postman for reliable data exchange between services.',
      icon: 'Workflow'
    },
    {
      title: 'CRUD Data Management System',
      description: 'Designed and implemented a MySQL-based CRUD application, optimizing queries and improving data processing efficiency.',
      icon: 'Database'
    },
    {
      title: 'Authentication & Authorization System',
      description: 'Developed secure login flows with session management, password hashing concepts, and role-based access control.',
      icon: 'Lock'
    },
    {
      title: 'Laravel MVC Backend System',
      description: 'In progress backend system using PHP Laravel, MVC architecture, routing, controllers, and migrations.',
      icon: 'Code2'
    }
  ];

  const operatingStrengths = [
    {
      title: 'Production Support',
      description: 'Supported web-based database systems for availability, performance, and data integrity.',
      icon: 'Activity'
    },
    {
      title: 'Database Reliability',
      description: 'Troubleshot MySQL databases, improved query performance, and resolved data inconsistencies.',
      icon: 'DatabaseZap'
    },
    {
      title: 'API Validation',
      description: 'Used Postman, Insomnia, JavaScript, and Python requests to validate integrations.',
      icon: 'Cable'
    },
    {
      title: 'Security Controls',
      description: 'Implemented endpoint security and access controls to reduce unauthorized access risks.',
      icon: 'ShieldCheck'
    }
  ];

  return (
    <section aria-labelledby="trust-heading" className="py-16 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 id="trust-heading" className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            CV Credentials & Experience
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            A grounded profile of Samuel Ryan Ndung'u's education, certifications, work history, technical projects, and support experience.
          </p>
        </div>

        <div className="grid gap-8 xl:grid-cols-2">
          <div className="bg-card rounded-xl p-8 shadow-premium border border-border">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-semibold text-text-primary">Experience & Education</h3>
                <p className="text-text-secondary text-sm">Roles and education listed in the CV.</p>
              </div>
              <Icon name="BriefcaseBusiness" size={24} className="text-primary" aria-hidden="true" />
            </div>
            <div className="grid gap-4">
              {experienceHighlights.map((item) => (
                <div key={item.title} className="rounded-xl border border-border bg-surface p-4">
                  <div className="flex items-start gap-4">
                    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${item.accent} text-white`}>
                      <Icon name={item.icon} size={20} aria-hidden="true" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-sm font-semibold text-text-primary">{item.title}</p>
                        <span className="text-xs font-medium text-primary">{item.period}</span>
                      </div>
                      <p className="text-xs text-text-secondary mb-3">{item.organization}</p>
                      <div className="flex flex-wrap gap-2">
                        {item.points.map((point) => (
                          <span key={point} className="rounded-full bg-card px-2 py-1 text-xs text-text-secondary border border-border">
                            {point}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card rounded-xl p-8 shadow-premium border border-border">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-semibold text-text-primary">Certifications</h3>
                <p className="text-text-secondary text-sm">Security, programming, and networking credentials from the CV.</p>
              </div>
              <Icon name="Award" size={24} className="text-primary" aria-hidden="true" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {certifications.map((cert) => (
                <div key={`${cert.title}-${cert.date}`} className="rounded-xl border border-border bg-surface p-4">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <p className="text-sm font-medium text-text-primary">{cert.title}</p>
                    <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-semibold text-primary">{cert.date}</span>
                  </div>
                  <p className="text-xs text-text-secondary">{cert.issuer}</p>
                  <p className="mt-2 text-xs font-medium text-success">{cert.status}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-8 xl:grid-cols-2 mt-8">
          <div className="bg-card rounded-xl p-8 shadow-premium border border-border">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-semibold text-text-primary">Software Projects</h3>
                <p className="text-text-secondary text-sm">Academic and personal projects from the CV.</p>
              </div>
              <Icon name="FolderGit2" size={24} className="text-success" aria-hidden="true" />
            </div>
            <div className="grid gap-4">
              {softwareProjects.map((project) => (
                <div key={project.title} className="rounded-xl border border-border bg-surface p-4 flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon name={project.icon} size={20} aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text-primary">{project.title}</p>
                    <p className="text-xs leading-relaxed text-text-secondary">{project.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card rounded-xl p-8 shadow-premium border border-border">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-semibold text-text-primary">Operating Strengths</h3>
                <p className="text-text-secondary text-sm">Practical strengths demonstrated in support and development roles.</p>
              </div>
              <Icon name="Settings2" size={24} className="text-brand-gold" aria-hidden="true" />
            </div>
            <div className="grid gap-4">
              {operatingStrengths.map((strength) => (
                <div key={strength.title} className="rounded-xl border border-border bg-surface p-4 flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-brand-gold/15 text-brand-navy">
                    <Icon name={strength.icon} size={20} aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text-primary">{strength.title}</p>
                    <p className="text-xs leading-relaxed text-text-secondary">{strength.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-xl border border-border bg-primary/5 p-6 text-sm text-text-secondary">
          <div className="flex items-start gap-3">
            <Icon name="Info" size={20} className="text-primary mt-0.5" aria-hidden="true" />
            <p>
              This section reflects the CV content provided: education, certifications, software projects, and hands-on support experience.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSignals;
