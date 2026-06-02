import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About footer */}
          <div>
            <h4 className="text-white font-bold mb-4">Samuel Ryan Ndung'u</h4>
            <p className="text-sm leading-relaxed">
              IT Systems & Backend Engineer. Building, securing, and optimizing production systems.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#projects" className="hover:text-sky-400 transition-colors">Featured Projects</a></li>
              <li><a href="#skills" className="hover:text-sky-400 transition-colors">Technical Skills</a></li>
              <li><a href="#contact" className="hover:text-sky-400 transition-colors">Get In Touch</a></li>
            </ul>
          </div>

          {/* Social links */}
          <div>
            <h4 className="text-white font-bold mb-4">Connect</h4>
            <div className="space-y-2 text-sm">
              <a href="mailto:sammuelryan4050@gmail.com" className="block hover:text-sky-400 transition-colors">
                Email
              </a>
              <a href="https://wa.me/254743248996" target="_blank" rel="noopener noreferrer" className="block hover:text-sky-400 transition-colors">
                WhatsApp
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="block hover:text-sky-400 transition-colors">
                LinkedIn
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="block hover:text-sky-400 transition-colors">
                GitHub
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-700 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-sm text-slate-500">
              © {currentYear} Samuel Ryan Ndung'u. All rights reserved.
            </p>
            <p className="text-sm text-slate-500 mt-4 sm:mt-0">
              Designed & Built with React + Tailwind + Framer Motion
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
