import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Code2, Database, Shield, Zap, TrendingUp } from 'lucide-react';

const ProjectsSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
    hover: {
      y: -8,
      transition: { duration: 0.2 },
    },
  };

  const projects = [
    {
      title: 'REST API Integration System',
      description: 'Built and tested comprehensive REST API backend system enabling reliable service-to-service communication and data exchange.',
      problem: 'Services needed standardized API contracts for reliable inter-system communication and data validation',
      solution: 'Designed and implemented RESTful API architecture with proper validation, error handling, and integration testing',
      impact: 'Enabled seamless integration between multiple backend services, reducing integration bugs by 60%',
      stack: ['JavaScript', 'Python', 'REST APIs', 'Postman', 'Testing'],
      stackIcons: [Code2, Code2, Zap, Code2, Shield],
      gradient: 'from-blue-500 to-cyan-500',
      category: 'API Design & Integration',
      featured: true,
    },
    {
      title: 'CRUD MySQL Optimization System',
      description: 'Engineered optimized MySQL database layer with comprehensive CRUD operations and query performance tuning.',
      problem: 'Legacy database queries were slow, causing application latency and poor user experience',
      solution: 'Refactored queries with proper indexing, implemented connection pooling, and optimized data access patterns',
      impact: 'Improved query performance by 70%, reduced database load by 40%, enhanced application response time',
      stack: ['MySQL', 'Database Design', 'Query Optimization', 'Performance Tuning'],
      stackIcons: [Database, Database, Zap, TrendingUp],
      gradient: 'from-green-500 to-emerald-500',
      category: 'Database Architecture',
      featured: false,
    },
    {
      title: 'Authentication & RBAC System',
      description: 'Developed secure login system with session management, password hashing, and role-based access control.',
      problem: 'System needed granular access control with secure authentication and session management',
      solution: 'Implemented bcrypt-based password hashing, JWT session tokens, and role-based permission layers',
      impact: 'Prevented unauthorized access, enabled user permission segmentation, improved security posture significantly',
      stack: ['Authentication', 'RBAC', 'Security', 'Session Management'],
      stackIcons: [Shield, Lock, Shield, Code2],
      gradient: 'from-red-500 to-pink-500',
      category: 'Security & Access Control',
      featured: false,
    },
    {
      title: 'Laravel MVC Backend System',
      description: 'Building scalable backend using PHP Laravel with MVC architecture, migrations, and AI-assisted development.',
      problem: 'Need for maintainable, scalable backend architecture following industry best practices',
      solution: 'Architecting Laravel MVC structure with eloquent ORM, migrations, routing, and controller layers',
      impact: 'Establishing foundation for rapid feature development with clean code architecture and testability',
      stack: ['Laravel', 'PHP', 'MVC', 'Eloquent ORM', 'Migrations'],
      stackIcons: [Code2, Code2, Code2, Database, Code2],
      gradient: 'from-orange-500 to-amber-500',
      category: 'Backend Architecture',
      featured: true,
      status: 'In Progress',
    },
  ];

  const getTrendingIcon = () => (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
      <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
    </svg>
  );

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
            Featured Projects
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Production-grade systems demonstrating backend architecture, database optimization, API design, and security implementation.
          </p>
        </motion.div>

        {/* Projects grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12"
        >
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              whileHover="hover"
              className={`group relative rounded-xl overflow-hidden border border-slate-200 hover:border-slate-300 transition-all duration-300 ${
                project.featured ? 'lg:col-span-1' : ''
              }`}
            >
              {/* Card background */}
              <div className="relative bg-white h-full flex flex-col">
                {/* Top gradient bar */}
                <div
                  className={`h-1 bg-gradient-to-r ${project.gradient}`}
                />

                {/* Content */}
                <div className="p-8 flex flex-col h-full">
                  {/* Header */}
                  <div className="mb-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent border border-slate-200`}
                        >
                          {project.category}
                        </span>
                      </div>
                      {project.status && (
                        <span className="text-xs font-semibold px-2 py-1 rounded-full bg-amber-100 text-amber-700">
                          {project.status}
                        </span>
                      )}
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">
                      {project.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Problem/Solution/Impact */}
                  <div className="space-y-4 mb-6 flex-grow">
                    <div>
                      <p className="text-sm font-semibold text-slate-700 uppercase tracking-wide mb-1">
                        Problem
                      </p>
                      <p className="text-sm text-slate-600">
                        {project.problem}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-700 uppercase tracking-wide mb-1">
                        Solution
                      </p>
                      <p className="text-sm text-slate-600">
                        {project.solution}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-700 uppercase tracking-wide mb-1 flex items-center gap-1">
                        {getTrendingIcon()}
                        Impact
                      </p>
                      <p className="text-sm text-slate-600">
                        {project.impact}
                      </p>
                    </div>
                  </div>

                  {/* Tech stack */}
                  <div className="mb-6 pt-6 border-t border-slate-200">
                    <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-3">
                      Tech Stack
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.stack.map((tech, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-medium hover:bg-slate-200 transition-colors cursor-default"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex gap-3 pt-4 border-t border-slate-200">
                    <button
                      className={`flex-1 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 bg-gradient-to-r ${project.gradient} text-white hover:shadow-lg hover:shadow-blue-500/30 active:scale-95`}
                    >
                      <ExternalLink className="w-4 h-4" />
                      View Details
                    </button>
                    <button className="px-4 py-2 rounded-lg text-sm font-semibold border border-slate-300 text-slate-700 hover:bg-slate-50 transition-all duration-200 flex items-center justify-center gap-2">
                      <Github className="w-4 h-4" />
                      Code
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View all projects CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <button className="px-8 py-3 rounded-lg border-2 border-slate-300 text-slate-700 font-semibold hover:bg-slate-50 hover:border-sky-400 transition-all duration-200">
            View All Projects & Case Studies
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
