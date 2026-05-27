import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const SkillsMatrix = () => {
  const [hoveredSkill, setHoveredSkill] = useState(null);

  const skillCategories = [
    {
      category: "Programming & Web",
      icon: "Code2",
      color: "bg-blue-500",
      skills: [
        { name: "PHP & Laravel", proficiency: "Core", detail: "MVC routing, controllers, migrations, backend development", technologies: ["PHP", "Laravel", "MVC", "Migrations"] },
        { name: "JavaScript", proficiency: "Core", detail: "Frontend behavior, API testing workflows, and integration logic", technologies: ["JavaScript", "React", "Vue.js", "REST APIs"] },
        { name: "Python", proficiency: "Core", detail: "Automation, workflow tools, request testing, and web application support", technologies: ["Python", "Requests", "Automation", "Postman"] },
        { name: "HTML5 & CSS3", proficiency: "Core", detail: "Responsive user interfaces and structured web pages", technologies: ["HTML5", "CSS3", "Responsive UI"] }
      ]
    },
    {
      category: "Databases",
      icon: "Database",
      color: "bg-green-500",
      skills: [
        { name: "MySQL", proficiency: "Core", detail: "Query optimization, troubleshooting, CRUD systems, and data consistency", technologies: ["MySQL", "SQL", "CRUD", "Optimization"] },
        { name: "PostgreSQL", proficiency: "Hands-on", detail: "Relational database support and application data workflows", technologies: ["PostgreSQL", "SQL", "Schema Design"] },
        { name: "SQLite & MariaDB", proficiency: "Hands-on", detail: "Lightweight database use cases and relational data handling", technologies: ["SQLite", "MariaDB", "SQL"] },
        { name: "SQL Server", proficiency: "Exposure", detail: "Listed database capability from CV skill set", technologies: ["SQL Server", "Relational Data"] }
      ]
    },
    {
      category: "Backend & Tools",
      icon: "ServerCog",
      color: "bg-orange-500",
      skills: [
        { name: "REST API Integration", proficiency: "Core", detail: "Built and tested backend APIs for reliable data exchange", technologies: ["REST", "Postman", "Insomnia", "Python Requests"] },
        { name: "Git/GitHub", proficiency: "Core", detail: "Version control and collaborative project workflows", technologies: ["Git", "GitHub", "Branches"] },
        { name: "Docker & Azure", proficiency: "Hands-on", detail: "Supported deployments and lifecycle workflows in production environments", technologies: ["Docker", "Microsoft Azure", "Deployments"] },
        { name: "Linux", proficiency: "Hands-on", detail: "Systems support and technical troubleshooting environment", technologies: ["Linux", "CLI", "Support"] }
      ]
    },
    {
      category: "Security & Concepts",
      icon: "ShieldCheck",
      color: "bg-red-500",
      skills: [
        { name: "Authentication & RBAC", proficiency: "Project", detail: "Secure login, session management, password hashing concepts, and role-based access control", technologies: ["Auth", "Sessions", "RBAC", "Password Hashing"] },
        { name: "Endpoint Security", proficiency: "Certified", detail: "Cisco Networking Academy Endpoint Security certification, Jan 2025", technologies: ["Endpoint Security", "Access Controls"] },
        { name: "Cybersecurity Basics", proficiency: "Certified", detail: "Intro to Cyber Security and Ethical Hacking certifications from Cisco Networking Academy", technologies: ["Cybersecurity", "Ethical Hacking", "Security Analyst"] },
        { name: "SDLC & MVC", proficiency: "Core", detail: "Software development lifecycle, MVC architecture, CRUD systems, and application security basics", technologies: ["SDLC", "MVC", "CRUD", "System Integration"] }
      ]
    }
  ];

  const softSkills = [
    "Problem-Solving",
    "Analytical Thinking",
    "Fast Learning",
    "Team Collaboration",
    "Clear Communication",
    "Adaptability",
    "Time Management",
    "Ownership & Accountability",
    "Continuous Improvement",
    "Attention to Detail",
    "Work Ethic"
  ];

  return (
    <section className="py-24 sm:py-32 lg:py-40 bg-surface" aria-labelledby="skills-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 lg:mb-20">
          <h2 id="skills-heading" className="text-5xl sm:text-6xl font-serif font-bold text-foreground mb-6">
            Technical Expertise
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-transparent via-brand-gold to-transparent mx-auto mb-8"></div>
          <p className="text-lg sm:text-xl text-text-secondary max-w-3xl mx-auto font-light leading-relaxed">
            Mastery across web development, backend systems, databases, cloud infrastructure, API integration, and enterprise security fundamentals.
          </p>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mb-16">
          {skillCategories?.map((category, categoryIndex) => (
            <div key={categoryIndex} className="bg-card rounded-xl p-7 shadow-luxury border border-border card-hover">
              <div className="flex items-center space-x-4 mb-8">
                <div className={`w-14 h-14 ${category?.color} rounded-xl flex items-center justify-center shadow-luxury`}>
                  <Icon name={category?.icon} size={26} className="text-white" />
                </div>
                <h3 className="text-lg font-serif font-semibold text-foreground">{category?.category}</h3>
              </div>

              <div className="space-y-5">
                {category?.skills?.map((skill, skillIndex) => (
                  <button
                    key={skillIndex}
                    type="button"
                    className="relative w-full text-left transition-luxury rounded-lg p-3 -m-3 border border-transparent focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-brand-gold hover:bg-surface/70"
                    onMouseEnter={() => setHoveredSkill(`${categoryIndex}-${skillIndex}`)}
                    onMouseLeave={() => setHoveredSkill(null)}
                    onFocus={() => setHoveredSkill(`${categoryIndex}-${skillIndex}`)}
                    onBlur={() => setHoveredSkill(null)}
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <span className="font-medium text-foreground text-sm">{skill?.name}</span>
                      <span className="shrink-0 rounded-full bg-brand-gold/15 px-2.5 py-1 text-xs font-medium text-primary">
                        {skill?.proficiency}
                      </span>
                    </div>

                    <p className="text-xs leading-relaxed text-text-secondary font-light">{skill?.detail}</p>

                    {hoveredSkill === `${categoryIndex}-${skillIndex}` && (
                      <div className="absolute top-full left-0 right-0 bg-white border border-border rounded-xl shadow-luxury-elevated p-4 z-10 mt-2">
                        <div className="text-xs font-semibold text-text-primary mb-3">Technologies:</div>
                        <div className="flex flex-wrap gap-2">
                          {skill?.technologies?.map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className="inline-block bg-brand-gold/10 text-primary text-xs px-2.5 py-1.5 rounded-lg font-medium"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-card rounded-xl p-8 shadow-luxury border border-border">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-brand-gold to-brand-copper rounded-xl flex items-center justify-center shadow-luxury">
              <Icon name="BrainCircuit" size={22} className="text-white" aria-hidden="true" />
            </div>
            <div>
              <h3 className="text-xl font-serif font-semibold text-foreground">Professional Strengths</h3>
              <p className="text-sm text-text-secondary font-light">Core competencies and personal attributes.</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {softSkills.map((skill) => (
              <span key={skill} className="rounded-full bg-surface px-4 py-2 text-sm font-medium text-foreground border border-border hover:border-brand-gold hover:bg-surface-hover transition-luxury">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsMatrix;
