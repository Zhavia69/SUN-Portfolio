import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Terminal,
  Database,
  Server,
  Code2,
  Activity,
  Download,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

/* ---------------- BOOT SEQUENCE ---------------- */

const bootLines = [
  'booting system...',
  'initializing backend services...',
  'loading APIs...',
  'establishing database connections...',
  'optimizing runtime...',
  'system online ✓',
];

/* ---------------- SYSTEM ENGINE ---------------- */

const Hero = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const yMove = useTransform(scrollYProgress, [0, 1], [0, -120]);

  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const [bootIndex, setBootIndex] = useState(0);
  const [bootComplete, setBootComplete] = useState(false);

  const [metrics, setMetrics] = useState({
    api: 41,
    db: 99,
    infra: 87,
  });

  /* ---------------- BOOT ANIMATION ---------------- */

  useEffect(() => {
    if (bootIndex < bootLines.length - 1) {
      const t = setTimeout(() => setBootIndex(bootIndex + 1), 650);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => setBootComplete(true), 500);
      return () => clearTimeout(t);
    }
  }, [bootIndex]);

  /* ---------------- LIVE SYSTEM SIMULATION ---------------- */

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) => ({
        api: 35 + Math.floor(Math.random() * 20),
        db: 95 + Math.floor(Math.random() * 5),
        infra: 80 + Math.floor(Math.random() * 15),
      }));
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  /* ---------------- MOUSE PARALLAX ---------------- */

  const handleMouseMove = (e) => {
    setMouse({
      x: (e.clientX / window.innerWidth - 0.5) * 60,
      y: (e.clientY / window.innerHeight - 0.5) * 60,
    });
  };

  /* ---------------- SYSTEM METRICS ---------------- */

  const systemStatuses = [
    { label: 'API Latency', value: '42ms', icon: Code2, pulse: true },
    { label: 'Database', value: 'Healthy', icon: Database, pulse: false },
    { label: 'Infra Load', value: 'Low', icon: Server, pulse: true },
  ];

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen overflow-hidden bg-[#050816] text-white flex items-center"
    >
      {/* VIDEO BACKGROUND */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/backend-systems.mp4" type="video/mp4" />
      </video>

      {/* DARK OVERLAYS */}
      <div className="absolute inset-0 bg-[#050816]/85" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#050816]/40 via-[#050816]/70 to-[#050816]" />

      {/* GRID */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.03)_1px,transparent_1px)] bg-[size:90px_90px]" />

      {/* AURORA */}
      <motion.div
        style={{ x: mouse.x, y: mouse.y }}
        className="absolute top-[10%] left-[10%] w-[600px] h-[600px] bg-cyan-500/20 blur-[180px] rounded-full"
      />
      <motion.div
        style={{ x: -mouse.x, y: -mouse.y }}
        className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-600/20 blur-[180px] rounded-full"
      />

      {/* ---------------- BOOT SEQUENCE OVERLAY ---------------- */}
      {!bootComplete && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-[#050816]">
          <div className="font-mono text-sm text-cyan-300 space-y-2">
            {bootLines.slice(0, bootIndex + 1).map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
              >
                &gt; {line}
              </motion.p>
            ))}
          </div>
        </div>
      )}

      {/* ---------------- MAIN CONTENT ---------------- */}
      {bootComplete && (
        <div className="relative z-20 mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2 gap-16 px-6 py-24">

          {/* LEFT SECTION */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            style={{ y: yMove }}
          >
             <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-cyan-500/20 bg-white/5 px-5 py-3 backdrop-blur-xl">

              <span className="w-2 h-2 bg-green-400 animate-pulse rounded-full" />

              <span className="text-sm text-slate-300">

                System Online • Production Ready

              </span>

            </div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-6xl font-bold leading-tight"
            >
              Engineering
              <span className="block bg-gradient-to-r from-cyan-300 to-blue-500 bg-clip-text text-transparent">
                High-Performance Systems
              </span>
              for the Cloud Era
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="mt-6 text-slate-300 max-w-xl"
            >
              Backend engineer focused on scalable APIs, distributed systems,
              cloud infrastructure, and production-grade reliability.
            </motion.p>
          </motion.div>

          {/* RIGHT SECTION */}
          <motion.div
            style={{
              transform: `translate(${mouse.x / 3}px, ${mouse.y / 3}px)`,
            }}
          >
            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-3xl p-8 shadow-[0_40px_120px_rgba(0,0,0,0.5)]">

              {/* HEADER */}
              <div className="flex items-center gap-3 mb-6">
                <Terminal className="text-cyan-400" />
                <span>System Control Panel</span>
              </div>

              {/* METRICS */}
              <div className="space-y-4">
                <Metric label="API Latency" value={`${metrics.api}ms`} />
                <Metric label="Database Health" value={`${metrics.db}%`} />
                <Metric label="Infrastructure Load" value={`${metrics.infra}%`} />
              </div>

              {/* ACTIONS */}
              <div className="mt-8 grid grid-cols-2 gap-3">
                <a
                href="#projects"
                className="bg-gradient-to-r from-cyan-500 to-blue-600 py-3 rounded-xl flex items-center justify-center gap-2 text-white hover:from-cyan-500 hover:to-blue-600"
                   >
                    <ArrowRight className="w-4 h-4 text-white" />
                    <span>Projects</span>
                    </a>
                    <button className="bg-white/5 border border-white/10 py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-white/5 focus:outline-none focus:ring-0">
                    <Download className="w-4 h-4" />
                        CV
                        </button>
                        
</div>

              {/* STATUS */}
              <div className="mt-6 p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center gap-2">
                <CheckCircle2 className="text-green-400" />
                <span className="text-sm text-slate-300">
                  System Stable • All Services Running
                </span>
              </div>

            </div>
          </motion.div>
        </div>
      )}

      {/* TRANSITION GLOW */}
      <div className="absolute bottom-0 w-full h-[420px] pointer-events-none">
        <div className="absolute bottom-[-120px] left-0 w-full h-[300px] bg-cyan-500/10 blur-[120px]" />
        <div className="absolute bottom-0 w-full h-[200px] bg-gradient-to-b from-transparent to-white" />
      </div>
    </section>
  );
};

/* ---------------- METRIC COMPONENT ---------------- */

const Metric = ({ label, value }) => (
  <div className="flex items-center justify-between p-4 rounded-xl bg-[#0c142c]/60 border border-white/10">
    <span className="text-slate-300">{label}</span>
    <span className="text-cyan-300 font-bold">{value}</span>
  </div>
);

export default Hero;