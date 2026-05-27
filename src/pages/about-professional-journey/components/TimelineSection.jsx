import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const TimelineSection = () => {
  const [activeYear, setActiveYear] = useState(2024);

  const timelineData = [
    {
      year: 2024,
      title: "IT Technical Officer",
      company: "Stima Sacco Head Office",
      location: "Nairobi, Kenya",
      period: "Apr 2024 - Dec 2024",
      type: "current",
      achievements: [
        "Supported web-based database systems, focusing on availability, performance, and data integrity",
        "Optimized and troubleshot MySQL databases, resolving query performance and data consistency issues",
        "Validated API integrations using Postman, Insomnia, JavaScript, and Python requests",
        "Supported deployments in Docker and Microsoft Azure environments"
      ],
      technologies: ["MySQL", "Postman", "Insomnia", "JavaScript", "Python", "Docker", "Azure"],
      icon: "ServerCog"
    },
    {
      year: 2022,
      title: "Helpdesk Technical Support",
      company: "Damu Sasa / JiJi Health",
      location: "Nairobi, Kenya",
      period: "Apr 2022 - Aug 2022",
      type: "milestone",
      achievements: [
        "Built a Python-based web application that reduced task completion time by 40%",
        "Supported database operations and improved data validation accuracy",
        "Participated in cloud database migration reducing infrastructure costs by 40%",
        "Delivered end-user support and training with a 95% satisfaction rate"
      ],
      technologies: ["Python", "Web Applications", "Databases", "Cloud Migration", "Technical Support"],
      icon: "Headset"
    },
    {
      year: 2021,
      title: "Programming Foundations",
      company: "JKUAT",
      location: "Nairobi, Kenya",
      period: "June 2021",
      type: "foundation",
      achievements: [
        "Completed Python Programming certification",
        "Completed Java Programming, Java SE8 certification",
        "Strengthened object-oriented programming and backend scripting foundations"
      ],
      technologies: ["Python", "Java", "Java SE8", "OOP"],
      icon: "Code"
    },
    {
      year: 2024,
      title: "Cybersecurity Certifications",
      company: "Cisco Networking Academy",
      location: "Nairobi, Kenya",
      period: "Oct 2024 - Jan 2025",
      type: "growth",
      achievements: [
        "Completed Introduction to Cyber Security",
        "Completed Ethical Hacking",
        "Completed Endpoint Security",
        "Applied security knowledge to access controls and endpoint protection"
      ],
      technologies: ["Endpoint Security", "Ethical Hacking", "Cybersecurity Basics"],
      icon: "ShieldCheck"
    },
    {
      year: 2026,
      title: "Security Analyst",
      company: "Cyber Shujaa",
      location: "Nairobi, Kenya",
      period: "Apr 2026",
      type: "growth",
      achievements: [
        "Security Analyst certification listed in CV",
        "Continued growth in security analysis and threat detection fundamentals"
      ],
      technologies: ["Security Analysis", "Threat Detection", "Application Security Basics"],
      icon: "Shield"
    }
  ];

  const getTypeColor = (type) => {
    switch (type) {
      case 'current': return 'from-brand-gold to-brand-orange';
      case 'milestone': return 'from-primary to-brand-blue';
      case 'growth': return 'from-brand-green to-success';
      case 'foundation': return 'from-brand-blue to-primary';
      case 'beginning': return 'from-text-secondary to-muted-foreground';
      default: return 'from-primary to-brand-blue';
    }
  };

  return (
    <section className="py-24 sm:py-32 lg:py-40 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-12 h-1 bg-brand-gold"></div>
            <span className="text-brand-gold font-serif font-semibold text-lg">Career Journey</span>
            <div className="w-12 h-1 bg-brand-gold"></div>
          </div>
          <h2 className="text-5xl sm:text-6xl font-serif font-bold text-primary mb-6">
            CV-Backed Professional Journey
          </h2>
          <p className="text-lg font-light text-text-secondary max-w-3xl mx-auto leading-relaxed">
            A concise view of the roles, training, and measurable outcomes included in my CV.
          </p>
        </div>

        {/* Interactive Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-brand-gold via-primary to-text-secondary hidden lg:block"></div>

          {/* Timeline Items */}
          <div className="space-y-12">
            {timelineData?.map((item, index) => (
              <div
                key={`${item?.year}-${item?.title}`}
                className={`relative cursor-pointer transition-smooth ${
                  activeYear === item?.year ? 'scale-105' : 'hover:scale-102'
                }`}
                onClick={() => setActiveYear(item?.year)}
              >
                {/* Timeline Dot */}
                <div className="absolute left-6 w-6 h-6 rounded-full border-4 border-white shadow-luxury bg-gradient-to-r hidden lg:flex items-center justify-center z-10"
                     style={{ background: `linear-gradient(135deg, var(--color-${item?.type === 'current' ? 'brand-gold' : 'primary'}), var(--color-${item?.type === 'current' ? 'brand-copper' : 'brand-blue'}))` }}>
                </div>

                {/* Content Card */}
                <div className={`lg:ml-20 bg-white rounded-xl shadow-luxury border-2 transition-luxury ${
                  activeYear === item?.year ? 'border-brand-gold shadow-luxury-elevated' : 'border-transparent hover:border-border'
                }`}>
                  <div className="p-8">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center space-x-4">
                        <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${getTypeColor(item?.type)} flex items-center justify-center`}>
                          <Icon name={item?.icon} size={24} className="text-white" />
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-primary">{item?.title}</div>
                          <div className="text-lg text-brand-blue font-medium">{item?.company}</div>
                          <div className="text-text-secondary flex items-center space-x-2">
                            <Icon name="MapPin" size={14} />
                            <span>{item?.location}</span>
                          </div>
                          <div className="text-sm text-text-secondary flex items-center space-x-2 mt-1">
                            <Icon name="Calendar" size={14} />
                            <span>{item?.period}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-brand-gold">{item?.year}</div>
                        <div className="text-sm text-text-secondary capitalize">{item?.type}</div>
                      </div>
                    </div>

                    {/* Achievements */}
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-primary mb-4">Key Achievements</h4>
                      <div className="grid md:grid-cols-2 gap-3">
                        {item?.achievements?.map((achievement, idx) => (
                          <div key={idx} className="flex items-start space-x-3">
                            <Icon name="CheckCircle" size={16} className="text-success mt-1 flex-shrink-0" />
                            <span className="text-text-secondary text-sm leading-relaxed">{achievement}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Technologies */}
                    <div>
                      <h4 className="text-lg font-semibold text-primary mb-4">Technologies Used</h4>
                      <div className="flex flex-wrap gap-2">
                        {item?.technologies?.map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-surface text-primary text-sm font-medium rounded-full border border-border"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary Stats */}
        <div className="mt-20 bg-gradient-to-r from-primary to-brand-blue rounded-xl p-8 lg:p-12 text-white">
          <div className="text-center mb-8">
            <h3 className="text-4xl font-serif font-bold mb-4">Career Highlights</h3>
            <p className="text-white/90 text-lg font-light">Measurable outcomes and credentials from the CV</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-serif font-bold text-brand-gold mb-2">40%</div>
              <div className="text-white/80 font-light">Workflow Time Saved</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-serif font-bold text-brand-gold mb-2">40%</div>
              <div className="text-white/80 font-light">Infrastructure Cost Reduction</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-serif font-bold text-brand-gold mb-2">95%</div>
              <div className="text-white/80 font-light">User Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-serif font-bold text-brand-gold mb-2">6</div>
              <div className="text-white/80 font-light">Certifications</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
