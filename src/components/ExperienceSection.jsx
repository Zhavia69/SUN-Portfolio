import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, TrendingUp, Users, Clock } from 'lucide-react';

const ExperienceSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const experiences = [
    {
      role: 'IT Technical Officer',
      company: 'Stima Sacco Head Office',
      period: 'Apr 2024 – Dec 2024',
      icon: Briefcase,
      highlights: [
        {
          label: 'Production Systems Support',
          description: 'Supported web-based database systems ensuring high availability and performance in production environments',
        },
        {
          label: 'Database Optimization',
          description: 'Optimized MySQL queries and resolved data inconsistencies, improving application performance',
        },
        {
          label: 'API Integration & Testing',
          description: 'Performed API testing and validation using Postman, Insomnia, JavaScript, and Python',
        },
        {
          label: 'Cloud & Container Deployment',
          description: 'Supported deployments in Docker and Microsoft Azure environments, improving release workflows',
        },
        {
          label: 'Security Implementation',
          description: 'Implemented endpoint security and access controls, strengthening system protection',
        },
      ],
      metrics: [
        { value: '100%', label: 'System Uptime' },
        { value: 'Multi', label: 'Cloud Platforms' },
        { value: 'Production', label: 'Support Level' },
      ],
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      role: 'Helpdesk Technical Support → Engineering',
      company: 'Damu Sasa / JiJi Health',
      period: 'Apr 2022 – Aug 2022',
      icon: TrendingUp,
      highlights: [
        {
          label: 'Workflow Automation',
          description: 'Engineered Python-based web application that streamlined workflows, cutting task completion time by 40%',
        },
        {
          label: 'Cloud Migration',
          description: 'Played key role in cloud database migration, reducing infrastructure costs by 40%',
        },
        {
          label: 'Backend Systems',
          description: 'Strengthened backend reliability through data validation and database operations support',
        },
        {
          label: 'Security & Automation',
          description: 'Implemented security controls and workflow automation, increasing system reliability',
        },
        {
          label: 'End-User Excellence',
          description: 'Delivered end-user support and training, achieving 95% user satisfaction rate',
        },
      ],
      metrics: [
        { value: '40%', label: 'Efficiency Gain' },
        { value: '40%', label: 'Cost Reduction' },
        { value: '95%', label: 'Satisfaction' },
      ],
      gradient: 'from-emerald-500 to-green-500',
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
            Professional Experience
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Real-world impact across production systems, cloud infrastructure, and engineering transformation
          </p>
        </motion.div>

        {/* Timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-8 md:space-y-12"
        >
          {experiences.map((exp, idx) => {
            const Icon = exp.icon;
            return (
              <motion.div
                key={idx}
                variants={cardVariants}
                className="relative"
              >
                {/* Timeline connector */}
                {idx < experiences.length - 1 && (
                  <div className="hidden md:block absolute left-12 top-32 w-0.5 h-20 bg-gradient-to-b from-slate-300 to-transparent" />
                )}

                {/* Card */}
                <div className="group relative bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  {/* Gradient top border */}
                  <div
                    className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${exp.gradient}`}
                  />

                  {/* Timeline dot */}
                  <div className="hidden md:flex absolute left-0 top-8 -translate-x-1/2 w-6 h-6 rounded-full bg-white border-2 border-slate-300 group-hover:border-sky-500 transition-colors items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-slate-300 group-hover:bg-sky-500 transition-colors" />
                  </div>

                  <div className="p-8 md:pl-16">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                      <div className="flex items-start gap-4">
                        <div
                          className={`flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br ${exp.gradient} flex items-center justify-center`}
                        >
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-slate-900">
                            {exp.role}
                          </h3>
                          <p className="text-slate-600 font-medium">{exp.company}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-slate-500 text-sm whitespace-nowrap">
                        <Clock className="w-4 h-4" />
                        {exp.period}
                      </div>
                    </div>

                    {/* Highlights */}
                    <div className="mb-6 space-y-3">
                      {exp.highlights.map((highlight, i) => (
                        <div key={i} className="flex gap-3">
                          <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-sky-400 mt-2" />
                          <div>
                            <p className="font-semibold text-slate-900 text-sm mb-0.5">
                              {highlight.label}
                            </p>
                            <p className="text-slate-600 text-sm">
                              {highlight.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Metrics */}
                    <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200">
                      {exp.metrics.map((metric, i) => (
                        <div key={i} className="text-center">
                          <p
                            className={`text-xl font-bold bg-gradient-to-r ${exp.gradient} bg-clip-text text-transparent`}
                          >
                            {metric.value}
                          </p>
                          <p className="text-xs text-slate-600 mt-1">{metric.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Career narrative */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 p-8 rounded-xl bg-gradient-to-r from-slate-50 via-blue-50 to-slate-50 border border-slate-200"
        >
          <h4 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-sky-600" />
            Career Trajectory
          </h4>
          <p className="text-slate-700 leading-relaxed">
            Started in helpdesk support, quickly transitioned into engineering by building production systems and optimizing infrastructure. Specialized in backend architecture, database optimization, and cloud deployment. Now positioned as a systems-thinking engineer capable of handling the full stack from API design to infrastructure support. Continuous learner with cybersecurity certifications and deep hands-on experience in real production environments.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection;
