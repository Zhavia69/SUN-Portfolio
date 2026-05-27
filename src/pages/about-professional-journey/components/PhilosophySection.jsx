import React from 'react';
import Icon from '../../../components/AppIcon';

const PhilosophySection = () => {
  const philosophyPrinciples = [
    {
      icon: "Target",
      title: "Purpose-Driven Technology",
      description: `Technology should solve real operational problems. I focus on systems that improve reliability, usability, data accuracy, and business workflows.`
    },
    {
      icon: "Search",
      title: "Analytical Problem-Solving",
      description: `Strong troubleshooting starts with careful analysis. I break down complex issues, test assumptions, and work toward practical fixes.`
    },
    {
      icon: "Lightbulb",
      title: "Continuous Improvement",
      description: `My CV reflects steady growth across programming, cybersecurity, databases, cloud tools, and backend development. I learn quickly and apply new skills to real work.`
    },
    {
      icon: "Users",
      title: "Collaborative Delivery",
      description: `Good technical work depends on clear communication, accountability, and teamwork. I value dependable support and clean handover across teams.`
    }
  ];

  return (
    <section className="py-24 sm:py-32 lg:py-40 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-12 h-1 bg-brand-gold"></div>
            <span className="text-brand-gold font-serif font-semibold text-lg">My Philosophy</span>
            <div className="w-12 h-1 bg-brand-gold"></div>
          </div>
          <h2 className="text-5xl sm:text-6xl font-serif font-bold text-primary mb-6">
            Guiding Principles That Drive Excellence
          </h2>
          <p className="text-lg font-light text-text-secondary max-w-3xl mx-auto leading-relaxed">
            My approach is shaped by the strengths in my CV: problem-solving, analytical thinking, fast learning, clear communication, adaptability, and ownership.
          </p>
        </div>

        {/* Philosophy Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {philosophyPrinciples?.map((principle, index) => (
            <div key={index} className="group">
              <div className="bg-white rounded-xl p-8 shadow-luxury hover:shadow-luxury-elevated card-hover">
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-brand-blue rounded-xl flex items-center justify-center group-hover:scale-110 transition-luxury">
                      <Icon name={principle?.icon} size={24} className="text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-serif font-semibold text-primary mb-4">
                      {principle?.title}
                    </h3>
                    <p className="text-text-secondary font-light leading-relaxed">
                      {principle?.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quote Section */}
        <div className="mt-20">
          <div className="bg-gradient-to-r from-primary to-brand-blue rounded-xl p-8 lg:p-12 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 opacity-10">
              <Icon name="Quote" size={120} />
            </div>
            <div className="relative z-10 max-w-4xl">
              <blockquote className="text-2xl lg:text-3xl font-serif font-semibold leading-relaxed mb-6">
                "I care about technology that works in real environments: secure, maintainable, scalable, and useful to the people depending on it."
              </blockquote>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-brand-gold rounded-full flex items-center justify-center">
                  <span className="text-primary font-bold text-lg">S</span>
                </div>
                <div>
                  <div className="font-serif font-semibold">Samuel Ryan Ndung'u</div>
                  <div className="text-white/80">IT Professional</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhilosophySection;
