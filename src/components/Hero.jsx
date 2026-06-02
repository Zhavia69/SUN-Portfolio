import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Zap, Code2 } from 'lucide-react';

const Hero = () => {
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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const systemStatuses = [
    { label: 'APIs Online', icon: Code2, color: 'text-sky-500' },
    { label: 'Systems Optimized', icon: Zap, color: 'text-green-500' },
    { label: 'Databases Managed', icon: CheckCircle2, color: 'text-emerald-500' },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-50">
      {/* Animated gradient background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-sky-400 to-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-blue-400 to-sky-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-2000" />
      </div>

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        {/* Badge */}
        <motion.div variants={itemVariants} className="mb-8">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-sky-200">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm font-medium text-slate-700">Available for Projects & Opportunities</span>
          </span>
        </motion.div>

        {/* Main title */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 mb-6 leading-tight tracking-tight"
        >
          IT Systems & Backend <span className="bg-gradient-to-r from-sky-500 to-cyan-500 bg-clip-text text-transparent">Engineer</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-xl sm:text-2xl text-slate-600 max-w-2xl mx-auto mb-8 leading-relaxed"
        >
          I architect, optimize, and secure real-world production systems. From API integration to database optimization to cloud deployment—I solve problems that matter.
        </motion.p>

        {/* Skills quick preview */}
        <motion.p
          variants={itemVariants}
          className="text-lg text-slate-500 mb-12 font-medium"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-slate-100">
            Laravel • PHP • Python • JavaScript • MySQL • React • Docker • Azure
          </span>
        </motion.p>

        {/* System status indicators */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12 max-w-2xl mx-auto"
        >
          {systemStatuses.map((status, idx) => {
            const Icon = status.icon;
            return (
              <div
                key={idx}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-white border border-slate-200 hover:border-sky-300 transition-colors"
              >
                <Icon className={`w-5 h-5 ${status.color}`} />
                <span className="text-sm font-medium text-slate-700">{status.label}</span>
              </div>
            );
          })}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button className="px-8 py-4 bg-gradient-to-r from-sky-500 to-cyan-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-sky-500/30 transition-all duration-200 hover:scale-105 active:scale-95">
            View My Projects
          </button>
          <button className="px-8 py-4 bg-white border-2 border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 hover:border-sky-400 transition-all duration-200">
            Download My CV
          </button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          variants={itemVariants}
          className="mt-16 flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-slate-400"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
