import React from 'react';
import { motion } from 'framer-motion';
import {
  Code2,
  Database,
  Zap,
  Shield,
  Cloud,
  GitBranch,
  BarChart3,
  Lock,
} from 'lucide-react';

const SkillsDashboard = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
    hover: {
      y: -8,
      transition: { duration: 0.2 },
    },
  };

  const skills = [
    {
      category: 'Backend Engineering',
      icon: Code2,
      items: ['Laravel (MVC)', 'PHP', 'Python', 'JavaScript/Node.js'],
      proficiency: 95,
      color: 'from-blue-500 to-cyan-500',
      row: '',
    },
    {
      category: 'Databases & SQL',
      icon: Database,
      items: ['MySQL Optimization', 'PostgreSQL', 'SQL Server', 'Data Modeling'],
      proficiency: 90,
      color: 'from-green-500 to-emerald-500',
      row: '',
    },
    {
      category: 'API Integration',
      icon: Zap,
      items: ['REST APIs', 'Postman', 'Insomnia', 'API Testing & Validation'],
      proficiency: 92,
      color: 'from-amber-500 to-orange-500',
      row: '',
    },
    {
      category: 'Cloud & DevOps',
      icon: Cloud,
      items: ['Docker', 'Microsoft Azure', 'Linux', 'Deployment Workflows'],
      proficiency: 85,
      color: 'from-purple-500 to-indigo-500',
      row: '',
    },
    {
      category: 'Security Foundations',
      icon: Shield,
      items: ['Endpoint Security', 'Access Control (RBAC)', 'Authentication', 'Cyber Security Basics'],
      proficiency: 88,
      color: 'from-red-500 to-pink-500',
      row: '',
    },
    {
      category: 'Frontend & Tools',
      icon: GitBranch,
      items: ['React', 'Vue.js', 'HTML5/CSS3', 'Git/GitHub'],
      proficiency: 85,
      color: 'from-teal-500 to-cyan-500',
      row: '',
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
            Technical Skills Dashboard
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl">
            Complete technical stack covering backend engineering, databases, APIs, cloud infrastructure, and security foundations built through production experience.
          </p>
        </motion.div>

        {/* Skills grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max"
        >
          {skills.map((skill, idx) => {
            const Icon = skill.icon;
            return (
              <motion.div
                key={idx}
                variants={cardVariants}
                whileHover="hover"
                className={`group relative overflow-hidden rounded-xl bg-white border border-slate-200 p-6 hover:border-slate-300 transition-all duration-300 cursor-pointer ${skill.row}`}
              >
                {/* Background gradient on hover */}
                <div
                  className={`absolute inset-0 opacity-0 group-hover:opacity-5 bg-gradient-to-br ${skill.color} transition-opacity duration-300`}
                />

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div
                    className={`w-12 h-12 rounded-lg bg-gradient-to-br ${skill.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  {/* Category title */}
                  <h3 className="text-lg font-bold text-slate-900 mb-3">
                    {skill.category}
                  </h3>

                  {/* Skills list */}
                  <ul className="space-y-2 mb-4">
                    {skill.items.map((item, i) => (
                      <li key={i} className="text-sm text-slate-600 flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-1.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Proficiency bar */}
                  <div className="mt-4 pt-4 border-t border-slate-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-slate-600 uppercase tracking-wide">
                        Proficiency
                      </span>
                      <span className="text-sm font-bold text-slate-900">
                        {skill.proficiency}%
                      </span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.proficiency}%` }}
                        transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
                        viewport={{ once: true }}
                        className={`h-full bg-gradient-to-r ${skill.color} rounded-full`}
                      />
                    </div>
                  </div>
                </div>

                {/* Border highlight on hover */}
                <div
                  className={`absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none rounded-xl transition-opacity duration-300`}
                  style={{
                    background: `linear-gradient(135deg, ${skill.color.includes('blue') ? '#0EA5E9' : skill.color.includes('green') ? '#10B981' : '#F59E0B'} 0%, transparent 50%, transparent 100%)`,
                    opacity: 0,
                  }}
                />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 p-6 rounded-xl bg-gradient-to-r from-slate-50 to-blue-50 border border-slate-200"
        >
          <div className="flex items-start gap-4">
            <Lock className="w-6 h-6 text-sky-600 flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-bold text-slate-900 mb-2">
                Production-Ready Experience
              </h4>
              <p className="text-slate-600">
                All skills validated through real-world production systems, cloud deployments, and IT support engineering. Certified in cybersecurity fundamentals with hands-on API testing, database optimization, and system administration experience.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsDashboard;
