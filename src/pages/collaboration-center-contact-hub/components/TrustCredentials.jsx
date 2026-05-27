import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustCredentials = () => {
  const credentials = [
    {
      title: 'Education',
      description: 'Bachelor of Science in Computer Science',
      detail: 'Catholic University of Eastern Africa',
      icon: 'GraduationCap'
    },
    {
      title: 'Security Training',
      description: 'Security Analyst, Endpoint Security, Intro to Cyber Security, Ethical Hacking',
      detail: 'Cyber Shujaa and Cisco Networking Academy',
      icon: 'ShieldCheck'
    },
    {
      title: 'Programming Certifications',
      description: 'Python Programming and Java Programming, Java SE8',
      detail: 'JKUAT, June 2021',
      icon: 'Code2'
    },
    {
      title: 'Professional Experience',
      description: 'IT Technical Officer and Helpdesk Technical Support roles',
      detail: 'Stima Sacco, Damu Sasa / JiJi Health',
      icon: 'BriefcaseBusiness'
    }
  ];

  const workPrinciples = [
    'Confidential handling of system and user information',
    'Clear communication during troubleshooting and support',
    'Careful validation before deployment or handover',
    'Security-minded access control and endpoint protection',
    'Documentation and knowledge transfer where needed'
  ];

  return (
    <section className="py-24 sm:py-32 lg:py-40 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-primary mb-4">
            Credentials You Can Verify
          </h2>
          <p className="text-lg font-light text-text-secondary max-w-3xl mx-auto">
            This section only includes education, certifications, roles, and working principles supported by the CV.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {credentials.map((credential) => (
            <div key={credential.title} className="bg-surface rounded-xl p-6 border border-border card-hover shadow-luxury">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Icon name={credential.icon} size={24} className="text-primary" />
              </div>
              <h3 className="font-serif font-semibold text-primary mb-2">{credential.title}</h3>
              <p className="text-sm text-text-secondary font-light mb-3">{credential.description}</p>
              <p className="text-xs text-text-secondary rounded bg-white border border-border px-3 py-2">
                {credential.detail}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-primary/5 to-brand-blue/5 rounded-xl p-8 lg:p-12">
          <h3 className="text-3xl font-serif font-bold text-primary mb-8 text-center">Professional Working Principles</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
            {workPrinciples.map((principle) => (
              <div key={principle} className="bg-white rounded-xl p-5 border border-border text-center">
                <Icon name="CheckCircle" size={24} className="text-success mx-auto mb-3" />
                <p className="text-sm font-serif font-semibold text-text-primary">{principle}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustCredentials;
