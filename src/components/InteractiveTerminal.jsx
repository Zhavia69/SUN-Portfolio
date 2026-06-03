import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Copy, Check } from 'lucide-react';

const InteractiveTerminal = () => {
  const [copied, setCopied] = useState(null);
  const [activeTab, setActiveTab] = useState('about');

  const commands = {
    about: {
      label: 'whoami',
      output: `samuel@portfolio:~$ whoami
samuel-ryan-ndung-u
$ whois samuel
┌─────────────────────────────────────────────┐
│ IT Systems & Backend Engineer               │
│ API Integration Specialist                  │
│ Database Optimization Expert                │
│ Cloud & DevOps Practitioner                 │
│ Security-Aware Technical Analyst            │
│ Location: Nairobi, Kenya 🇰🇪               │
└─────────────────────────────────────────────┘`
    },
    skills: {
      label: 'skills --list',
      output: `samuel@portfolio:~$ skills --list
┌─ Backend Engineering ─────┐
│ ✓ Laravel (MVC)           │
│ ✓ PHP                     │
│ ✓ Python                  │
│ ✓ JavaScript/Node.js      │
└───────────────────────────┘

┌─ Databases ───────────────┐
│ ✓ MySQL Optimization      │
│ ✓ PostgreSQL              │
│ ✓ SQL Server              │
│ ✓ Data Modeling           │
└───────────────────────────┘

┌─ APIs & Integration ──────┐
│ ✓ REST APIs               │
│ ✓ Postman                 │
│ ✓ Insomnia                │
│ ✓ API Testing             │
└───────────────────────────┘

┌─ Cloud & DevOps ──────────┐
│ ✓ Docker                  │
│ ✓ Microsoft Azure         │
│ ✓ Linux                   │
│ ✓ Deployment              │
└───────────────────────────┘`
    },
    experience: {
      label: 'cat experience.log',
      output: `samuel@portfolio:~$ cat experience.log
═══════════════════════════════════════════════════
[2024-04-01] IT Technical Officer @ Stima Sacco
═══════════════════════════════════════════════════
✓ Production System Support        [████████░░] 100%
✓ MySQL Query Optimization         [██████████] 95%
✓ API Integration & Testing        [█████████░] 90%
✓ Docker/Azure Deployment          [████████░░] 85%
✓ Security Controls Implementation [████████░░] 88%

═══════════════════════════════════════════════════
[2022-04-01] Helpdesk Support → Engineering
═══════════════════════════════════════════════════
✓ Built Python Workflow Automation [████████░░] 40% efficiency
✓ Cloud Migration Architecture     [████████░░] 40% cost savings
✓ Customer Satisfaction Rate       [██████████] 95%`
    },
    projects: {
      label: 'ls -la projects/',
      output: `samuel@portfolio:~$ ls -la projects/
total 42
-rw-r--r-- 1 samuel portfolio  12K May 20 16:45 rest-api-system.js
-rw-r--r-- 1 samuel portfolio   8K May 19 14:22 mysql-crud-system.sql
-rw-r--r-- 1 samuel portfolio   6K May 18 09:10 auth-rbac-system.php
-rw-r--r-- 1 samuel portfolio  15K May 17 11:35 laravel-mvc-backend.php

Projects:
[1] REST API Integration System
    └─ Tech: JavaScript, Python, Postman
    └─ Impact: 60% reduction in integration bugs

[2] CRUD MySQL Optimization System
    └─ Tech: MySQL, Query Optimization
    └─ Impact: 70% query performance improvement

[3] Authentication & RBAC System
    └─ Tech: PHP, bcrypt, JWT
    └─ Impact: Enterprise-grade security

[4] Laravel MVC Backend System [IN_PROGRESS]
    └─ Tech: Laravel, PHP, MVC Pattern
    └─ Impact: Scalable backend architecture`
    }
  };

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const currentCommand = commands[activeTab];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-950">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <Terminal className="w-8 h-8 text-green-400" />
            <h2 className="text-3xl font-bold text-green-400 font-mono">
              Interactive Terminal
            </h2>
          </div>

          {/* Terminal Window */}
          <div className="bg-slate-900 rounded-lg border border-green-500/30 overflow-hidden shadow-2xl">
            {/* Terminal Header */}
            <div className="bg-slate-800 border-b border-green-500/30 px-4 py-3 flex items-center gap-2">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <span className="text-xs text-green-400 font-mono ml-4">
                samuel@portfolio ~ <span className="text-cyan-400">Terminal</span>
              </span>
            </div>

            {/* Command Tabs */}
            <div className="bg-slate-900 border-b border-green-500/20 px-4 py-2 flex gap-2 overflow-x-auto">
              {Object.entries(commands).map(([key, cmd]) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`px-3 py-1 text-xs font-mono rounded transition-all ${
                    activeTab === key
                      ? 'bg-green-500/20 text-green-400 border border-green-500'
                      : 'text-green-300/60 hover:text-green-400'
                  }`}
                >
                  $ {cmd.label}
                </button>
              ))}
            </div>

            {/* Terminal Content */}
            <div className="p-6 font-mono text-sm text-green-400 relative">
              {/* Cursor animation */}
              <motion.div
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="absolute top-6 right-6"
              >
                ▋
              </motion.div>

              {/* Output */}
              <motion.pre
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="whitespace-pre-wrap break-words text-green-400 text-xs sm:text-sm leading-relaxed"
              >
                {currentCommand.output}
              </motion.pre>

              {/* Copy Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleCopy(currentCommand.output, activeTab)}
                className="absolute bottom-4 right-4 p-2 bg-green-500/20 hover:bg-green-500/30 border border-green-500 rounded transition-all"
              >
                {copied === activeTab ? (
                  <Check className="w-4 h-4 text-green-400" />
                ) : (
                  <Copy className="w-4 h-4 text-green-400" />
                )}
              </motion.button>
            </div>
          </div>

          {/* Legend */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-green-400/70 font-mono">
            <div>
              <p>✓ = Implemented</p>
              <p>█ = Proficiency Level</p>
            </div>
            <div>
              <p>[IN_PROGRESS] = Active Development</p>
              <p>→ = Career Growth Path</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default InteractiveTerminal;
