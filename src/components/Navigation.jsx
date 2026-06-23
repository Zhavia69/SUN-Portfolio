import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Activity, Command } from 'lucide-react';

const Navigation = ({ bootComplete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState('home');
  const [showCommand, setShowCommand] = useState(false);

  const navLinks = [
    { label: 'Home', href: '#home', id: 'home' },
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Skills', href: '#skills', id: 'skills' },
    { label: 'Terminal', href: '#terminal', id: 'terminal' },
    { label: 'Tech Stack', href: '#tech-stack', id: 'tech' },
    { label: 'Code', href: '#code-snippets', id: 'code' },
    { label: 'Experience', href: '#experience', id: 'exp' },
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  /* ---------------- SCROLL SPY ---------------- */
  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map((l) =>
        document.querySelector(l.href)
      );

      sections.forEach((sec, i) => {
        if (!sec) return;

        const rect = sec.getBoundingClientRect();
        if (rect.top <= 120 && rect.bottom >= 120) {
          setActive(navLinks[i].id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* ---------------- COMMAND PALETTE ---------------- */
  useEffect(() => {
    const handleKey = (e) => {
      if (e.ctrlKey && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setShowCommand((v) => !v);
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={bootComplete ? { y: 0, opacity: 1 } : { y: -80, opacity: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <div className="absolute inset-0 bg-[#050816]/70 backdrop-blur-2xl border-b border-white/10" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">

            {/* LOGO */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3 font-bold cursor-pointer"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
                        <span className="hidden sm:inline-block bg-gradient-to-r from-cyan-300 to-blue-500 bg-clip-text text-transparent">
                Sr. Ndungu Portfolio
              </span>
            </motion.div>

            {/* DESKTOP NAV (NO INDICATOR POSITIONING) */}
            <div className="hidden md:flex items-center gap-8">

              {navLinks.map((link) => {
                const isActive = active === link.id;

                return (
                  <div key={link.href} className="relative">
                    <motion.a
                      href={link.href}
                      whileHover={{ y: -2 }}
                      className={`text-sm font-medium transition ${
                        isActive
                          ? 'text-cyan-300'
                          : 'text-slate-400 hover:text-cyan-200'
                      }`}
                    >
                      {link.label}
                    </motion.a>

                    {/* INLINE INDICATOR (ONLY ACTIVE TAB HAS IT) */}
                    {isActive && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute left-0 right-0 -bottom-2 h-[2px] bg-cyan-400 rounded-full"
                      />
                    )}
                  </div>
                );
              })}
            </div>

            {/* RIGHT CONTROLS */}
            <div className="flex items-center gap-3">

              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => setShowCommand(true)}
                className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-lg border border-white/10 bg-white/5"
              >
                <Command className="w-4 h-4 text-cyan-300" />
                <span className="text-xs text-slate-300">Ctrl K</span>
              </motion.button>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2 rounded-lg border border-white/10 bg-white/5"
              >
                {isOpen ? (
                  <X className="w-6 h-6 text-cyan-300" />
                ) : (
                  <Menu className="w-6 h-6 text-cyan-300" />
                )}
              </button>
            </div>

          </div>
        </div>

        {/* MOBILE MENU (UNCHANGED) */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="md:hidden px-4 pb-6 pt-2 border-t border-white/10 bg-[#050816]/95 backdrop-blur-2xl"
            >
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 rounded-xl text-slate-300 hover:text-cyan-300 hover:bg-white/5"
                >
                  {link.label}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* COMMAND PALETTE (UNCHANGED) */}
      <AnimatePresence>
        {showCommand && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-xl flex items-center justify-center"
            onClick={() => setShowCommand(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="w-[90%] max-w-lg p-6 rounded-2xl bg-[#0c142c]/90 border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="text-cyan-300 font-mono text-sm mb-4">
                &gt; command palette
              </p>

              <div className="space-y-2 text-sm text-slate-300">
                {navLinks.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setShowCommand(false)}
                    className="block p-3 rounded-lg hover:bg-white/5"
                  >
                    {l.label}
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;