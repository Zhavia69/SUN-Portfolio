import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Code2, Database, Shield, Zap, TrendingUp, Lock } from 'lucide-react';

const ProjectsSection = () => {
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

  const featuredLiveProjects = [
    {
      title: 'Suns Elite Luxury Travel',
      description: 'Premium luxury travel agency website showcasing elite destinations with a sophisticated design and immersive user experience.',
      stack: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion'],
      image: '/assets/images/suns-elite.png',
      liveUrl: 'https://suns-elite-luxury-travel.vercel.app/',
      githubUrl: '#',
      gradient: 'from-cyan-400 to-blue-500',
    },
    {
      title: 'Barbershop Web',
      description: 'Modern barbershop showcase and booking platform featuring a sleek, dark aesthetic and interactive services menu.',
      stack: ['React', 'Tailwind CSS', 'Vite', 'Node.js'],
      image: '/assets/images/barbershop.png',
      liveUrl: 'https://barbershop-web-peach.vercel.app/',
      githubUrl: '#',
      gradient: 'from-purple-400 to-pink-500',
    }
  ];

  const getTrendingIcon = () => (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
      <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
    </svg>
  );

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#050816] overflow-hidden">
      {/* Background Grid & Effects for entire section */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:60px_60px] opacity-20 pointer-events-none" />
      <div className="absolute top-[10%] left-[-10%] w-[600px] h-[600px] bg-cyan-600/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[600px] h-[600px] bg-purple-600/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto z-10">
        
        {/* =========================================
            PART 1: ARCHITECTURE & BACKEND PROJECTS
            ========================================= */}
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-cyan-500/30 text-cyan-400 text-sm font-mono mb-6">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            Core Infrastructure
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 tracking-tight">
            System <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Architecture</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Production-grade systems demonstrating backend architecture, database optimization, API design, and security implementation.
          </p>
        </motion.div>

        {/* Projects grid (Original layout converted to Dark Futuristic UI) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-24"
        >
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              whileHover="hover"
              className={`group relative rounded-2xl overflow-hidden bg-[#0a0f1e] border border-white/10 hover:border-cyan-500/30 transition-all duration-300 flex flex-col h-full ${
                project.featured ? 'lg:col-span-1' : ''
              }`}
            >
              {/* Card background */}
              <div className="relative flex flex-col h-full">
                {/* Top gradient bar */}
                <div className={`h-1 bg-gradient-to-r ${project.gradient}`} />

                {/* Content */}
                <div className="p-8 flex flex-col h-full">
                  {/* Header */}
                  <div className="mb-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <span className={`inline-block px-3 py-1.5 rounded-full text-xs font-semibold mb-3 bg-white/5 border border-white/10 text-slate-300 tracking-wide`}>
                          {project.category}
                        </span>
                      </div>
                      {project.status && (
                        <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                          {project.status}
                        </span>
                      )}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-slate-400 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Problem/Solution/Impact */}
                  <div className="space-y-4 mb-6 flex-grow">
                    <div>
                      <p className="text-xs font-mono text-cyan-400/80 uppercase tracking-wider mb-1.5">Problem</p>
                      <p className="text-sm text-slate-300">{project.problem}</p>
                    </div>
                    <div>
                      <p className="text-xs font-mono text-purple-400/80 uppercase tracking-wider mb-1.5">Solution</p>
                      <p className="text-sm text-slate-300">{project.solution}</p>
                    </div>
                    <div>
                      <p className="text-xs font-mono text-green-400/80 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                        {getTrendingIcon()} Impact
                      </p>
                      <p className="text-sm text-slate-300">{project.impact}</p>
                    </div>
                  </div>

                  {/* Tech stack */}
                  <div className="mb-8 pt-6 border-t border-white/10">
                    <div className="flex flex-wrap gap-2">
                      {project.stack.map((tech, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 rounded bg-[#131b2f] border border-white/5 text-slate-300 text-xs font-mono hover:bg-white/10 transition-colors cursor-default"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex gap-3 mt-auto">
                    <button className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 bg-gradient-to-r ${project.gradient} text-white hover:opacity-90 active:scale-95 shadow-lg shadow-cyan-500/10`}>
                      <ExternalLink className="w-4 h-4" /> View Details
                    </button>
                    <button className="px-4 py-2.5 rounded-lg text-sm font-semibold border border-white/10 text-white bg-white/5 hover:bg-white/10 transition-all duration-200 flex items-center justify-center gap-2">
                      <Github className="w-4 h-4" /> Code
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Hover Glow Ambient */}
              <div className={`absolute inset-0 bg-gradient-to-r ${project.gradient} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-300 pointer-events-none`} />
            </motion.div>
          ))}
        </motion.div>

        {/* Seamless Divider */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent my-24" />

        {/* =========================================
            PART 2: FEATURED LIVE WEBSITES (MOCKUPS)
            ========================================= */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-purple-500/30 text-purple-400 text-sm font-mono mb-6">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
            Live Deployments
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 tracking-tight">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Web Apps</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            High-performance web applications deployed in production environments, demonstrating modern architecture and premium UI/UX design.
          </p>
        </motion.div>

        {/* Featured Live Projects */}
        <div className="space-y-24">
          {featuredLiveProjects.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true, margin: "-100px" }}
              className={`flex flex-col ${idx % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 items-center`}
            >
              {/* Image / Browser Mockup */}
              <div className="w-full lg:w-3/5 group">
                <div className="relative rounded-xl overflow-hidden bg-[#0a0f1e] border border-white/10 shadow-2xl transition-all duration-500 hover:border-cyan-500/50 hover:shadow-cyan-500/20">
                  {/* Browser Chrome */}
                  <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-[#131b2f]">
                    <span className="w-3 h-3 rounded-full bg-red-500/80" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <span className="w-3 h-3 rounded-full bg-green-500/80" />
                    <div className="mx-auto px-4 py-1.5 rounded-md bg-black/40 border border-white/5 text-xs text-slate-400 font-mono flex-1 max-w-[60%] text-center truncate">
                      {project.liveUrl}
                    </div>
                  </div>
                  {/* Screenshot Image */}
                  <div className="relative aspect-video overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-[#050816]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-semibold flex items-center gap-2 hover:scale-105 transition-transform shadow-lg shadow-cyan-500/20">
                        <ExternalLink className="w-4 h-4" /> Visit Live Site
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="w-full lg:w-2/5 flex flex-col justify-center">
                <div className={`w-12 h-1 bg-gradient-to-r ${project.gradient} mb-6 rounded-full`} />
                <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors">{project.title}</h3>
                <p className="text-slate-400 leading-relaxed mb-8 text-lg">
                  {project.description}
                </p>
                
                <div className="mb-8">
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((tech, i) => (
                      <span key={i} className="px-4 py-1.5 rounded-lg bg-[#131b2f] border border-white/5 text-slate-300 text-sm font-mono whitespace-nowrap">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4">
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={`px-6 py-3 rounded-lg flex items-center justify-center gap-2 font-semibold text-white bg-gradient-to-r ${project.gradient} hover:opacity-90 transition-opacity shadow-lg shadow-purple-500/20`}>
                    <ExternalLink className="w-4 h-4" /> Live Website
                  </a>
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="px-6 py-3 rounded-lg flex items-center justify-center gap-2 font-semibold text-white bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                    <Github className="w-4 h-4" /> Source Code
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ProjectsSection;
