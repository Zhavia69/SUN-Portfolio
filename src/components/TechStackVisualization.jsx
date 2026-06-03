import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Layers, Zap } from 'lucide-react';

const TechStackVisualization = () => {
  const [selectedCategory, setSelectedCategory] = useState('backend');

  const techStack = {
    backend: {
      title: 'Backend Engineering Stack',
      icon: '⚙️',
      color: 'from-blue-500 to-purple-500',
      layers: [
        {
          layer: 'Framework Layer',
          tech: ['Laravel', 'PHP', 'Node.js'],
          details: 'MVC architecture, routing, middleware, ORM'
        },
        {
          layer: 'Business Logic',
          tech: ['Python', 'JavaScript', 'Java'],
          details: 'API development, algorithms, automation'
        },
        {
          layer: 'Data Layer',
          tech: ['MySQL', 'PostgreSQL', 'SQL'],
          details: 'Query optimization, indexing, transactions'
        },
        {
          layer: 'Infrastructure',
          tech: ['Docker', 'Azure', 'Linux'],
          details: 'Containerization, deployment, orchestration'
        }
      ]
    },
    database: {
      title: 'Database Stack',
      icon: '🗄️',
      color: 'from-green-500 to-emerald-500',
      layers: [
        {
          layer: 'Relational DB',
          tech: ['MySQL', 'PostgreSQL', 'SQL Server'],
          details: 'ACID compliance, complex queries, indexing'
        },
        {
          layer: 'Query Optimization',
          tech: ['Query Tuning', 'Index Strategy', 'Caching'],
          details: '70% performance improvement achieved'
        },
        {
          layer: 'Data Modeling',
          tech: ['Schema Design', 'Normalization', 'Integrity'],
          details: 'Efficient data structures, relationships'
        },
        {
          layer: 'Backup & Recovery',
          tech: ['Replication', 'Failover', 'Archive'],
          details: '100% uptime, disaster recovery'
        }
      ]
    },
    devops: {
      title: 'DevOps & Cloud Stack',
      icon: '☁️',
      color: 'from-orange-500 to-red-500',
      layers: [
        {
          layer: 'Containerization',
          tech: ['Docker', 'Container Registry', 'Compose'],
          details: 'Image building, registry management'
        },
        {
          layer: 'Cloud Platform',
          tech: ['Microsoft Azure', 'App Service', 'Database'],
          details: 'Managed services, scalability'
        },
        {
          layer: 'CI/CD Pipeline',
          tech: ['Deployment', 'Automation', 'Workflows'],
          details: 'Continuous integration and delivery'
        },
        {
          layer: 'Monitoring & Logging',
          tech: ['Performance', 'Health Checks', 'Analytics'],
          details: 'System diagnostics, debugging'
        }
      ]
    },
    security: {
      title: 'Security Stack',
      icon: '🔐',
      color: 'from-red-500 to-pink-500',
      layers: [
        {
          layer: 'Authentication',
          tech: ['JWT', 'OAuth', 'Session Management'],
          details: 'Secure token handling, user verification'
        },
        {
          layer: 'Authorization',
          tech: ['RBAC', 'Access Control', 'Permissions'],
          details: 'Role-based access control, fine-grained permissions'
        },
        {
          layer: 'Encryption',
          tech: ['bcrypt', 'SSL/TLS', 'Data Encryption'],
          details: 'Password hashing, secure communication'
        },
        {
          layer: 'Security Best Practices',
          tech: ['Input Validation', 'CORS', 'Security Headers'],
          details: 'Protection against common vulnerabilities'
        }
      ]
    }
  };

  const categories = Object.keys(techStack);
  const current = techStack[selectedCategory];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 via-slate-100 to-slate-50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-12"
        >
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <Layers className="w-8 h-8 text-slate-900" />
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
              Technical Stack Architecture
            </h2>
          </div>

          {/* Category Selector */}
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <motion.button
                key={cat}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all capitalize ${
                  selectedCategory === cat
                    ? `bg-gradient-to-r ${techStack[cat].color} text-white shadow-lg`
                    : 'bg-white border-2 border-slate-200 text-slate-700 hover:border-slate-300'
                }`}
              >
                {techStack[cat].icon} {techStack[cat].title.split(' ')[0]}
              </motion.button>
            ))}
          </div>

          {/* Stack Visualization */}
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 gap-4">
              {current.layers.map((layer, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02, translateX: 8 }}
                  className="group"
                >
                  <div className={`bg-gradient-to-r ${current.color} rounded-lg p-6 text-white shadow-lg hover:shadow-xl transition-all`}>
                    <div className="flex items-center gap-4">
                      {/* Layer Number */}
                      <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center font-bold text-lg">
                        {idx + 1}
                      </div>

                      {/* Layer Content */}
                      <div className="flex-grow">
                        <h3 className="font-bold text-lg mb-2">{layer.layer}</h3>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {layer.tech.map((tech, i) => (
                            <span
                              key={i}
                              className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium backdrop-blur-sm"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                        <p className="text-sm opacity-90">{layer.details}</p>
                      </div>

                      {/* Arrow */}
                      <motion.div
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="flex-shrink-0 text-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        →
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg border-2 border-slate-200 p-6"
            >
              <div className="flex items-start gap-4">
                <Zap className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-lg text-slate-900 mb-2">
                    {current.title}
                  </h4>
                  <p className="text-slate-600 leading-relaxed">
                    {selectedCategory === 'backend' && "Expertise in building scalable, production-ready backend systems using modern frameworks and design patterns. Focus on clean architecture, performance optimization, and API design."}
                    {selectedCategory === 'database' && "Advanced database design and optimization skills. Proven track record of 70% query performance improvements and ensuring 100% system uptime through efficient data modeling and query tuning."}
                    {selectedCategory === 'devops' && "Hands-on experience with containerization and cloud deployment. Successfully managed infrastructure scaling in Microsoft Azure and Docker environments with automated CI/CD pipelines."}
                    {selectedCategory === 'security' && "Security-first approach to application development. Implementation of enterprise-grade authentication, authorization, encryption, and comprehensive security controls across all layers."}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Legend */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-12"
          >
            <div className="bg-white rounded-lg p-4 border border-slate-200">
              <p className="text-sm text-slate-600">
                <span className="font-bold text-slate-900">Proficiency Level:</span> Expert
              </p>
              <div className="mt-2 h-2 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full" />
            </div>
            <div className="bg-white rounded-lg p-4 border border-slate-200">
              <p className="text-sm text-slate-600">
                <span className="font-bold text-slate-900">Production Experience:</span> 2+ years
              </p>
              <div className="mt-2 h-2 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default TechStackVisualization;
