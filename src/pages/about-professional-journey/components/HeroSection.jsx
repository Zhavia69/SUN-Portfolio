import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-primary via-brand-blue to-brand-navy min-h-screen flex items-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 border border-white/20 rounded-full"></div>
        <div className="absolute top-40 right-20 w-24 h-24 border border-white/20 rounded-full"></div>
        <div className="absolute bottom-32 left-1/4 w-16 h-16 border border-white/20 rounded-full"></div>
        <div className="absolute bottom-20 right-1/3 w-20 h-20 border border-white/20 rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="text-white space-y-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-1 bg-brand-gold"></div>
                <span className="text-brand-gold font-serif font-semibold text-lg">About Samuel</span>
              </div>
              <h1 className="text-5xl sm:text-6xl font-serif font-bold leading-tight">
                Secure Web Apps, Reliable Systems, and{' '}
                <span className="text-gradient-gold">Practical Support</span>
              </h1>
              <p className="text-xl text-white/90 leading-relaxed max-w-2xl">
                Results-driven IT professional from Nairobi with a strong background in web application development, systems support, database management, and cloud-based environments. I build secure, scalable, user-focused solutions and support production systems with reliability and precision.
              </p>
            </div>

            {/* Key Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-brand-gold">2+</div>
                <div className="text-sm text-white/80">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-brand-gold">6</div>
                <div className="text-sm text-white/80">Certifications</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-brand-gold">B.Sc</div>
                <div className="text-sm text-white/80">Computer Science</div>
              </div>
            </div>

            {/* Core Values */}
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <Icon name="Shield" size={16} className="text-brand-gold" />
                <span className="text-sm font-medium">Security First</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <Icon name="Zap" size={16} className="text-brand-gold" />
                <span className="text-sm font-medium">Fast Learner</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <Icon name="Users" size={16} className="text-brand-gold" />
                <span className="text-sm font-medium">Team Focused</span>
              </div>
            </div>
          </div>

          {/* Professional Portrait */}
          <div className="relative">
            <div className="relative z-10">
              <div className="w-full max-w-lg mx-auto">
                <div className="relative overflow-hidden rounded-xl shadow-luxury">
                  <Image
                    src="/assets/images/a.jpg"
                    alt="Samuel Ryan Ndung'u - IT Professional"
                    className="w-full h-[600px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-6 -right-6 bg-brand-gold text-primary rounded-xl p-4 shadow-luxury-elevated">
              <Icon name="Award" size={24} />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white text-primary rounded-xl p-4 shadow-luxury-elevated">
              <Icon name="Code" size={24} />
            </div>
            <div className="absolute top-1/2 -right-8 bg-brand-copper text-white rounded-xl p-3 shadow-luxury-elevated">
              <Icon name="Globe" size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 animate-bounce">
        <Icon name="ChevronDown" size={24} />
      </div>
    </section>
  );
};

export default HeroSection;
