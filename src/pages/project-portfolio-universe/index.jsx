import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const ProjectPortfolioUniverse = () => {
  const softwareProjects = [
    {
      title: 'RESTful API Integration System',
      type: 'Academic & Personal',
      status: 'Completed',
      icon: 'Workflow',
      description: 'Built and tested backend APIs using JavaScript, Python, and Postman for reliable data exchange between services.',
      technologies: ['JavaScript', 'Python', 'Postman', 'REST APIs'],
      outcomes: ['API testing', 'System integration', 'Reliable data exchange']
    },
    {
      title: 'CRUD Data Management System',
      type: 'Academic & Personal',
      status: 'Completed',
      icon: 'Database',
      description: 'Designed and implemented a MySQL-based CRUD application, with attention to query optimization and efficient data processing.',
      technologies: ['MySQL', 'SQL', 'CRUD', 'Backend Logic'],
      outcomes: ['Data management', 'Query optimization', 'Database reliability']
    },
    {
      title: 'Authentication & Authorization System',
      type: 'Academic & Personal',
      status: 'Completed',
      icon: 'Lock',
      description: 'Developed a secure login system using session management, password hashing concepts, and role-based access control.',
      technologies: ['Authentication', 'Sessions', 'RBAC', 'Application Security'],
      outcomes: ['Access control', 'Secure login flow', 'Role-based permissions']
    },
    {
      title: 'Laravel MVC Backend System',
      type: 'Personal Development',
      status: 'In Progress',
      icon: 'Code2',
      description: 'Building a scalable backend with PHP Laravel using MVC architecture, routing, controllers, migrations, and AI-assisted debugging workflows.',
      technologies: ['PHP', 'Laravel', 'MVC', 'Migrations'],
      outcomes: ['Backend structure', 'Database migrations', 'Development efficiency']
    }
  ];

  const workOutcomes = [
    {
      value: '40%',
      label: 'Workflow Time Saved',
      description: 'Python-based web application at Damu Sasa / JiJi Health',
      icon: 'Timer'
    },
    {
      value: '40%',
      label: 'Infrastructure Cost Reduction',
      description: 'Cloud database migration support at Damu Sasa / JiJi Health',
      icon: 'TrendingDown'
    },
    {
      value: '95%',
      label: 'User Satisfaction',
      description: 'End-user support and training outcome from the CV',
      icon: 'Smile'
    }
  ];

  const experienceApplications = [
    'Supported web-based database systems in production environments',
    'Troubleshot and optimized MySQL databases and data inconsistencies',
    'Validated integrations using Postman, Insomnia, JavaScript, and Python requests',
    'Supported Docker and Microsoft Azure deployment workflows',
    'Implemented endpoint security and access controls'
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Software Projects - Samuel Ryan Ndung'u | IT Professional</title>
        <meta
          name="description"
          content="CV-backed software projects by Samuel Ryan Ndung'u, including API integration, CRUD systems, authentication, Laravel backend development, and measurable support outcomes."
        />
        <meta name="keywords" content="Samuel Ryan Ndungu projects, Laravel, REST API, MySQL, Python, JavaScript, authentication, Nairobi IT professional" />
      </Helmet>

      <Header />
      <main className="pt-16">
        <section className="bg-gradient-to-br from-primary via-brand-blue to-brand-navy text-white py-24 sm:py-32 lg:py-40 overflow-hidden">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 mb-8">
                <Icon name="Briefcase" size={20} />
                <span className="text-sm font-serif font-semibold">CV-Backed Portfolio</span>
              </div>

              <h1 className="text-5xl sm:text-6xl font-serif font-bold mb-6 leading-tight">
                Software Projects and
                <span className="block text-gradient-gold">Technical Outcomes</span>
              </h1>

              <p className="text-lg text-white/90 mb-8 leading-relaxed font-light">
                A focused portfolio based on my CV: backend APIs, database-driven applications, authentication flows, Laravel development, and practical production support experience.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
                {workOutcomes.map((outcome) => (
                  <div key={outcome.label} className="rounded-xl bg-white/10 p-5 backdrop-blur-sm">
                    <Icon name={outcome.icon} size={22} className="mx-auto mb-3 text-brand-gold" />
                    <div className="text-3xl font-bold text-brand-gold">{outcome.value}</div>
                    <div className="text-sm font-medium text-white">{outcome.label}</div>
                    <p className="mt-2 text-xs text-white/75">{outcome.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 sm:py-32 lg:py-40 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-5xl sm:text-6xl font-serif font-bold text-text-primary mb-4">
                Software Project Highlights
              </h2>
              <p className="text-lg font-light text-text-secondary max-w-3xl mx-auto">
                These are academic and personal development projects listed in the CV, focused on practical backend, database, API, and security concepts.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {softwareProjects.map((project) => (
                <article key={project.title} className="bg-card rounded-xl p-6 shadow-luxury border border-border card-hover">
                  <div className="flex items-start justify-between gap-4 mb-5">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon name={project.icon} size={22} className="text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-serif font-semibold text-text-primary">{project.title}</h3>
                        <p className="text-sm text-text-secondary font-light">{project.type}</p>
                      </div>
                    </div>
                    <span className="shrink-0 rounded-full bg-success/10 px-3 py-1 text-xs font-semibold text-success">
                      {project.status}
                    </span>
                  </div>

                  <p className="text-text-secondary font-light leading-relaxed mb-5">{project.description}</p>

                  <div className="mb-5">
                    <h4 className="text-sm font-serif font-semibold text-text-primary mb-3">Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span key={tech} className="rounded-full bg-surface px-3 py-1 text-xs font-medium text-primary border border-border">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-serif font-semibold text-text-primary mb-3">Focus Areas</h4>
                    <div className="grid gap-2">
                      {project.outcomes.map((outcome) => (
                        <div key={outcome} className="flex items-center gap-2 text-sm text-text-secondary font-light">
                          <Icon name="CheckCircle" size={15} className="text-success" />
                          <span>{outcome}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 bg-surface border-y border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-10 items-start">
              <div>
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-text-primary mb-4">Professional Application</h2>
                <p className="text-text-secondary font-light leading-relaxed mb-6">
                  Beyond standalone software projects, my CV includes hands-on support work in production environments at Stima Sacco Head Office and Damu Sasa / JiJi Health.
                </p>
                <div className="grid gap-3">
                  {experienceApplications.map((item) => (
                    <div key={item} className="flex items-start gap-3 rounded-lg bg-card border border-border p-4">
                      <Icon name="Check" size={18} className="text-success mt-0.5" />
                      <span className="text-sm text-text-primary font-light">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-card rounded-xl p-8 shadow-luxury border border-border">
                <h3 className="text-3xl font-serif font-bold text-text-primary mb-4">What I Can Discuss Confidently</h3>
                <p className="text-text-secondary font-light leading-relaxed mb-6">
                  API integration, Laravel backend structure, MySQL troubleshooting, CRUD workflows, authentication flows, endpoint security basics, Docker/Azure deployment support, and user-focused technical support.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link to="/skills" className="flex-1">
                    <Button variant="default" fullWidth iconName="Code" iconPosition="left" className="bg-brand-gold hover:shadow-luxury-elevated">
                      View Expertise
                    </Button>
                  </Link>
                  <Link to="/testimonials" className="flex-1">
                    <Button variant="outline" fullWidth iconName="UserCheck" iconPosition="left">
                      View References
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-gradient-to-br from-primary to-brand-blue">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="w-16 h-16 rounded-lg bg-white/20 flex items-center justify-center mx-auto mb-6">
              <Icon name="MessageCircle" size={32} color="white" />
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white mb-4">
              Want to Talk Through a Project?
            </h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed font-light">
              I can help with web application work, backend development, database support, API integration, and practical systems troubleshooting.
            </p>
            <Link to="/collaboration-center-contact-hub">
              <Button
                variant="secondary"
                size="lg"
                iconName="MessageCircle"
                iconPosition="left"
                className="bg-brand-gold text-primary hover:shadow-luxury-elevated"
              >
                Contact Samuel
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer showCTA={true} />
    </div>
  );
};

export default ProjectPortfolioUniverse;
