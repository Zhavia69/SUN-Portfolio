import React from 'react';
import Icon from '../../../components/AppIcon';

const EducationSection = () => {
  const certifications = [
    {
      name: 'Security Analyst',
      issuer: 'Cyber Shujaa',
      date: 'Apr 2026',
      icon: 'Shield'
    },
    {
      name: 'Endpoint Security',
      issuer: 'Cisco Networking Academy',
      date: 'Jan 2025',
      icon: 'Server'
    },
    {
      name: 'Introduction to Cyber Security',
      issuer: 'Cisco Networking Academy',
      date: 'Oct 2024',
      icon: 'Globe'
    },
    {
      name: 'Ethical Hacking',
      issuer: 'Cisco Networking Academy',
      date: 'Nov 2024',
      icon: 'ShieldCheck'
    },
    {
      name: 'Python Programming',
      issuer: 'JKUAT',
      date: 'Jun 2021',
      icon: 'Code'
    },
    {
      name: 'Java Programming, Java SE8',
      issuer: 'JKUAT',
      date: 'Jun 2021',
      icon: 'Code2'
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
      description: 'Developed secure login concepts with session management, password hashing, and role-based access control.',
      icon: 'Lock'
    },
    {
      title: 'Laravel MVC Backend System',
      description: 'In progress backend using PHP Laravel, MVC architecture, routing, controllers, migrations, and AI-assisted debugging workflows.',
      icon: 'Code2'
    }
  ];

  return (
    <section className="py-24 sm:py-32 lg:py-40 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-12 h-1 bg-brand-gold" />
            <span className="text-brand-gold font-serif font-semibold text-lg">Education & Projects</span>
            <div className="w-12 h-1 bg-brand-gold" />
          </div>
          <h2 className="text-5xl sm:text-6xl font-serif font-bold text-primary mb-6">
            Academic Foundation and Practical Build Work
          </h2>
          <p className="text-lg font-light text-text-secondary max-w-3xl mx-auto leading-relaxed">
            The education, certifications, and software projects below are drawn directly from the CV you provided.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="bg-white rounded-xl shadow-luxury p-8">
            <div className="flex items-start space-x-6">
              <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-primary to-brand-blue flex items-center justify-center flex-shrink-0">
                <Icon name="GraduationCap" size={28} className="text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-serif font-semibold text-primary mb-2">Bachelor of Science in Computer Science</h3>
                <div className="text-lg text-brand-blue font-semibold mb-1">Catholic University of Eastern Africa</div>
                <div className="text-text-secondary font-light flex items-center space-x-2 mb-6">
                  <Icon name="MapPin" size={14} />
                  <span>Nairobi, Kenya</span>
                </div>
                <p className="text-text-secondary font-light leading-relaxed">
                  Academic grounding in computer science, software development, database systems, and problem-solving for practical technology delivery.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-luxury p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-brand-gold/20 rounded-lg flex items-center justify-center">
                <Icon name="BrainCircuit" size={22} className="text-brand-navy" />
              </div>
              <div>
                <h3 className="text-2xl font-serif font-semibold text-primary">Learning Strengths</h3>
                <p className="text-sm text-text-secondary font-light">How the CV positions Samuel professionally.</p>
              </div>
            </div>
            <div className="grid gap-3">
              {['Fast learning ability', 'Analytical thinking', 'Continuous improvement', 'Attention to detail', 'Ownership and accountability'].map((strength) => (
                <div key={strength} className="flex items-center gap-3 rounded-lg border border-border bg-surface p-3">
                  <Icon name="CheckCircle" size={18} className="text-success" />
                  <span className="text-sm font-medium text-text-primary">{strength}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h3 className="text-3xl font-serif font-bold text-primary mb-8 text-center">Professional Certifications</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert) => (
              <div key={`${cert.name}-${cert.date}`} className="bg-white rounded-xl shadow-luxury p-6 card-hover group">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-brand-blue flex items-center justify-center group-hover:scale-110 transition-luxury">
                    <Icon name={cert.icon} size={20} className="text-white" />
                  </div>
                  <div className="text-sm font-medium text-brand-gold">{cert.date}</div>
                </div>
                <h4 className="font-serif font-semibold text-primary mb-2 leading-tight">{cert.name}</h4>
                <div className="text-sm text-brand-blue font-semibold">{cert.issuer}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12">
          <h3 className="text-3xl font-serif font-bold text-primary mb-8 text-center">Software Projects</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {softwareProjects.map((project) => (
              <div key={project.title} className="bg-white rounded-xl shadow-luxury p-6 card-hover">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center flex-shrink-0">
                    <Icon name={project.icon} size={20} className="text-success" />
                  </div>
                  <div>
                    <h4 className="font-serif font-semibold text-primary mb-2">{project.title}</h4>
                    <p className="text-sm text-text-secondary font-light leading-relaxed">{project.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
