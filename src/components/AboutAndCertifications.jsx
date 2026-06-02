import React from 'react';
import { motion } from 'framer-motion';
import { Award, Target, Users, Zap, Code2, Shield, Database, Cloud, Lock, TrendingUp } from 'lucide-react';

const AboutSection = () => {
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

  const coreStrengths = [
    {
      icon: Code2,
      title: 'Backend Systems Builder',
      description:
        'Architect scalable, production-ready systems using Laravel, PHP, Python, and modern API design patterns.',
    },
    {
      icon: Database,
      title: 'Database & Performance Expert',
      description:
        'Optimize MySQL queries, design efficient schemas, and solve complex data challenges that impact business outcomes.',
    },
    {
      icon: Shield,
      title: 'Security-First Engineer',
      description:
        'Implement robust authentication, access controls, and security practices across all system layers.',
    },
    {
      icon: Cloud,
      title: 'Cloud & DevOps Practitioner',
      description:
        'Deploy and manage containerized applications in Docker and Microsoft Azure environments with confidence.',
    },
    {
      icon: Zap,
      title: 'API Integration Specialist',
      description:
        'Design, test, and validate robust APIs using Postman, Python, and JavaScript for seamless system integration.',
    },
    {
      icon: Users,
      title: 'Support-to-Engineering',
      description:
        'Transitioned from helpdesk support to engineering through problem-solving mindset and continuous learning.',
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-5xl mx-auto">
        {/* Main narrative */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-8">
            Building Systems That Matter
          </h2>

          <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
            <p>
              I'm <span className="font-semibold text-slate-900">Samuel Ryan Ndung'u</span>, an IT Systems & Backend Engineer from Nairobi, Kenya. My journey began in helpdesk support, where I discovered my true passion: solving complex technical problems that drive real business impact.
            </p>

            <p>
              Rather than just fixing issues, I became fascinated with <span className="font-semibold text-slate-900">why</span> systems work—and how to make them work better. This led me to transition into engineering, where I now architect, optimize, and secure production systems that serve real users.
            </p>

            <p>
              My expertise spans the full backend stack: from designing RESTful APIs and optimizing MySQL databases to deploying containerized applications in cloud environments. I'm deeply committed to security-first practices and I'm currently advancing my cybersecurity knowledge through industry certifications.
            </p>

            <p>
              What drives me is the intersection of <span className="font-semibold text-slate-900">systems thinking, engineering excellence, and continuous learning</span>. I believe that great technology is invisible—it just works, reliably and securely.
            </p>
          </div>
        </motion.div>

        {/* Core strengths grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-20"
        >
          <h3 className="text-2xl font-bold text-slate-900 mb-12 text-center">
            Core Capabilities
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreStrengths.map((strength, idx) => {
              const Icon = strength.icon;
              return (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="group p-6 rounded-lg bg-gradient-to-br from-slate-50 to-white border border-slate-200 hover:border-sky-300 transition-all duration-300 hover:shadow-lg"
                >
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-sky-500 to-cyan-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-bold text-slate-900 mb-2">{strength.title}</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {strength.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Values section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-20 p-8 rounded-lg bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200"
        >
          <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <Target className="w-6 h-6 text-sky-600" />
            My Philosophy
          </h3>
          <div className="space-y-4">
            <div>
              <p className="font-semibold text-slate-900 mb-2">Problem-First Mindset</p>
              <p className="text-slate-700">
                Every line of code serves a business problem. I focus on understanding the challenge before jumping to solutions.
              </p>
            </div>
            <div>
              <p className="font-semibold text-slate-900 mb-2">Production Reliability</p>
              <p className="text-slate-700">
                Systems I build are meant to run 24/7 without hiccups. I prioritize reliability, performance, and security.
              </p>
            </div>
            <div>
              <p className="font-semibold text-slate-900 mb-2">Continuous Growth</p>
              <p className="text-slate-700">
                Technology evolves rapidly. I invest in learning new tools, frameworks, and security practices to stay ahead.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const CertificationsSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 },
    },
  };

  const certifications = [
    {
      title: 'Security Analyst',
      issuer: 'Cyber Shujaa',
      date: 'Apr 2026',
      color: 'from-red-500 to-pink-500',
      icon: Shield,
      credential: 'Advanced',
    },
    {
      title: 'Endpoint Security',
      issuer: 'Cisco Networking Academy',
      date: 'Jan 2025',
      color: 'from-blue-500 to-cyan-500',
      icon: Award,
      credential: 'Verified',
    },
    {
      title: 'Ethical Hacking',
      issuer: 'Cisco Networking Academy',
      date: 'Nov 2024',
      color: 'from-purple-500 to-indigo-500',
      icon: Shield,
      credential: 'Verified',
    },
    {
      title: 'Introduction to Cybersecurity',
      issuer: 'Cisco Networking Academy',
      date: 'Oct 2024',
      color: 'from-amber-500 to-orange-500',
      icon: Award,
      credential: 'Verified',
    },
    {
      title: 'Python Programming',
      issuer: 'JKUAT',
      date: 'Jun 2021',
      color: 'from-green-500 to-emerald-500',
      icon: Code2,
      credential: 'Certified',
    },
    {
      title: 'Java Programming (SE8)',
      issuer: 'JKUAT',
      date: 'Jun 2021',
      color: 'from-orange-500 to-red-500',
      icon: Code2,
      credential: 'Certified',
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 to-white">
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
            Certifications & Credentials
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Continuous validation of technical expertise through industry-recognized certifications in cybersecurity, networking, and programming.
          </p>
        </motion.div>

        {/* Certifications grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {certifications.map((cert, idx) => {
            const Icon = cert.icon;
            return (
              <motion.div
                key={idx}
                variants={cardVariants}
                whileHover="hover"
                className="relative group overflow-hidden rounded-xl bg-white border border-slate-200 p-6 hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                {/* Top gradient bar */}
                <div
                  className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${cert.color}`}
                />

                {/* Icon */}
                <div
                  className={`w-12 h-12 rounded-lg bg-gradient-to-br ${cert.color} flex items-center justify-center mb-4`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>

                {/* Content */}
                <h3 className="font-bold text-slate-900 mb-1 text-lg">
                  {cert.title}
                </h3>
                <p className="text-sm text-slate-600 mb-3">{cert.issuer}</p>

                {/* Date and credential */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                  <span className="text-xs text-slate-500 font-medium">{cert.date}</span>
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded-full bg-gradient-to-r ${cert.color} bg-clip-text text-transparent border border-slate-200`}
                  >
                    {cert.credential}
                  </span>
                </div>

                {/* Hover indicator */}
                <div className="absolute inset-0 bg-gradient-to-br from-white to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl" />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Education highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 p-8 rounded-xl bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-200"
        >
          <h4 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-indigo-600" />
            Academic Background
          </h4>
          <p className="text-slate-700 mb-2">
            <span className="font-semibold">Bachelor of Science in Computer Science</span>
          </p>
          <p className="text-slate-600">
            Catholic University of Eastern Africa (Sep 2019 - Oct 2023)
          </p>
          <p className="text-sm text-slate-600 mt-3">
            Strong foundation in computer science principles, software development, and systems architecture. Complemented with hands-on experience in production environments and continuous professional development through industry certifications.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export { AboutSection, CertificationsSection };
