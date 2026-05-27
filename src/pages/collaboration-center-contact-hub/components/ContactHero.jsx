import React from 'react';
import Icon from '../../../components/AppIcon';

const ContactHero = () => {
  return (
    <section className="relative bg-gradient-to-br from-primary via-brand-blue to-brand-navy text-white py-24 sm:py-32 lg:py-40 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 mb-8">
            <Icon name="MessageCircle" size={20} />
            <span className="text-sm font-serif font-semibold">Contact Samuel</span>
          </div>

          <h1 className="text-5xl sm:text-6xl font-serif font-bold mb-6 leading-tight">
            Need Practical Help With
            <span className="block text-gradient-gold">Web or IT Systems?</span>
          </h1>

          <p className="text-xl text-white/90 mb-8 leading-relaxed font-light">
            Connect with Samuel for web application development, systems support, database troubleshooting, API integration, and security-minded technical assistance.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <div className="flex items-center space-x-2 text-white/80">
              <Icon name="Clock" size={20} />
              <span>Business-hours response</span>
            </div>
            <div className="hidden sm:block w-1 h-1 bg-white/40 rounded-full" />
            <div className="flex items-center space-x-2 text-white/80">
              <Icon name="MapPin" size={20} />
              <span>Based in Nairobi, Kenya</span>
            </div>
            <div className="hidden sm:block w-1 h-1 bg-white/40 rounded-full" />
            <div className="flex items-center space-x-2 text-white/80">
              <Icon name="Shield" size={20} />
              <span>Security-focused mindset</span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-brand-gold mb-2">4</div>
              <div className="text-sm text-white/80">CV Projects</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-brand-gold mb-2">6</div>
              <div className="text-sm text-white/80">Certifications</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-brand-gold mb-2">40%</div>
              <div className="text-sm text-white/80">Workflow Time Saved</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-brand-gold mb-2">95%</div>
              <div className="text-sm text-white/80">User Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactHero;
