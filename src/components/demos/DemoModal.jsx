import React, { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Maximize2 } from 'lucide-react';

/**
 * DemoModal — Full-screen interactive demo shell.
 *
 * Design language: matches ProjectsSection dark futuristic aesthetic.
 * Pattern: follows the existing Command Palette modal pattern in Navigation.jsx.
 *
 * Props:
 *   isOpen    {boolean}   — controls visibility
 *   onClose   {function}  — called on ESC / backdrop / close button
 *   title     {string}    — project title for the header bar
 *   gradient  {string}    — Tailwind gradient classes (e.g. "from-blue-500 to-cyan-500")
 *   children  {ReactNode} — demo content
 */
const DemoModal = ({ isOpen, onClose, title, gradient, children }) => {
  /* ── ESC key handler ── */
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  return (
    <AnimatePresence>
      {isOpen && (
        /* ── Backdrop ── */
        <motion.div
          key="demo-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[80] bg-black/80 backdrop-blur-md flex flex-col"
          onClick={onClose}
        >
          {/* ── Modal panel ── */}
          <motion.div
            key="demo-modal-panel"
            initial={{ opacity: 0, scale: 0.97, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 20 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex flex-col w-full h-full bg-[#050816] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Background grid — matches ProjectsSection */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:60px_60px] opacity-20 pointer-events-none" />
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-600/8 blur-[150px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/8 blur-[150px] rounded-full pointer-events-none" />

            {/* ── Header bar ── */}
            <div className={`relative z-10 flex-shrink-0 flex items-center justify-between px-4 sm:px-6 py-3 border-b border-white/10 bg-[#0a0f1e]/80 backdrop-blur-xl`}>
              {/* Window dots */}
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <button
                    onClick={onClose}
                    className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors"
                    aria-label="Close demo"
                  />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>

                {/* Title */}
                <div className="flex items-center gap-2 ml-2">
                  <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${gradient} animate-pulse`} />
                  <span className="text-xs font-mono text-slate-400 hidden sm:inline">
                    nexus-enterprise://
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-white truncate max-w-[180px] sm:max-w-none">
                    {title}
                  </span>
                  <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-500/10 border border-green-500/20 text-[10px] font-mono text-green-400">
                    <span className="w-1 h-1 rounded-full bg-green-400 animate-pulse" />
                    LIVE DEMO
                  </span>
                </div>
              </div>

              {/* Right controls */}
              <div className="flex items-center gap-2">
                <span className="hidden md:block text-xs text-slate-500 font-mono">ESC to close</span>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-colors text-slate-400 hover:text-white"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* ── Gradient accent bar ── */}
            <div className={`h-[2px] flex-shrink-0 bg-gradient-to-r ${gradient} relative z-10`} />

            {/* ── Content area ── */}
            <div className="relative z-10 flex-1 overflow-y-auto overflow-x-hidden">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DemoModal;
