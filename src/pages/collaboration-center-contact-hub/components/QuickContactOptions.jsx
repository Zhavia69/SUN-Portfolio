import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { CONTACT_EMAIL_HREF, CONTACT_LINKEDIN_HREF, CONTACT_PHONE_HREF, CONTACT_WHATSAPP_HREF } from '../../../utils/contactInfo';

const QuickContactOptions = () => {
  const contactOptions = [
    {
      id: 1,
      title: "WhatsApp Chat",
      description: "Quick questions about support, web projects, APIs, databases, or availability",
      icon: "MessageCircle",
      action: "Chat Now",
      href: CONTACT_WHATSAPP_HREF,
      color: "bg-green-500",
      urgency: "Quick",
      responseTime: "Best for short messages"
    },
    {
      id: 2,
      title: "Phone Call",
      description: "Direct contact for time-sensitive technical conversations",
      icon: "Phone",
      action: "Call Now",
      href: CONTACT_PHONE_HREF,
      color: "bg-brand-orange",
      urgency: "Direct",
      responseTime: "Subject to availability"
    },
    {
      id: 3,
      title: "Email",
      description: "Share detailed requirements, project context, or hiring information",
      icon: "Mail",
      action: "Send Email",
      href: CONTACT_EMAIL_HREF,
      color: "bg-brand-blue",
      urgency: "Detailed",
      responseTime: "Best for formal inquiries"
    },
    {
      id: 4,
      title: "LinkedIn Connect",
      description: "Professional networking, hiring conversations, and collaboration",
      icon: "Linkedin",
      action: "Connect",
      href: CONTACT_LINKEDIN_HREF,
      color: "bg-blue-600",
      urgency: "Professional",
      responseTime: "Professional profile"
    }
  ];

  const handleContactClick = (href) => {
    if (href?.startsWith('#')) {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.open(href, '_blank');
    }
  };

  return (
    <section className="py-24 sm:py-32 lg:py-40 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-primary mb-4">
            Choose Your Preferred Contact Method
          </h2>
          <p className="text-lg font-light text-text-secondary max-w-3xl mx-auto">
            Different situations require different communication channels. Select the option that best matches your urgency level and communication preference.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactOptions?.map((option) => (
            <div
              key={option?.id}
              className="bg-white rounded-xl shadow-luxury hover:shadow-luxury-elevated transition-luxury p-6 border border-border card-hover"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${option?.color} rounded-lg flex items-center justify-center`}>
                  <Icon name={option?.icon} size={24} color="white" />
                </div>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                  option?.urgency === 'Quick' ? 'bg-green-100 text-green-700' :
                  option?.urgency === 'Direct' ? 'bg-orange-100 text-orange-700' :
                  option?.urgency === 'Detailed'? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                }`}>
                  {option?.urgency}
                </span>
              </div>
              
              <h3 className="text-lg font-serif font-semibold text-primary mb-2">
                {option?.title}
              </h3>
              
              <p className="text-sm text-text-secondary font-light mb-4 leading-relaxed">
                {option?.description}
              </p>
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-1 text-xs text-text-secondary">
                  <Icon name="Clock" size={14} />
                  <span>{option?.responseTime}</span>
                </div>
              </div>
              
              <Button
                variant="outline"
                fullWidth
                onClick={() => handleContactClick(option?.href)}
                className="border-2 hover:bg-primary hover:text-white hover:border-primary"
              >
                {option?.action}
              </Button>
            </div>
          ))}
        </div>

        {/* Business Hours */}
        <div className="mt-12 bg-white rounded-xl shadow-luxury p-8 border border-border">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-serif font-bold text-primary mb-2">Business Hours & Availability</h3>
            <p className="text-text-secondary font-light">All times in East Africa Time (EAT - UTC+3)</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Clock" size={24} color="var(--color-success)" />
              </div>
              <h4 className="font-serif font-semibold text-primary mb-2">Regular Hours</h4>
              <p className="text-sm text-text-secondary font-light">Monday - Friday<br />8:00 AM - 6:00 PM</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Shield" size={24} color="var(--color-warning)" />
              </div>
              <h4 className="font-serif font-semibold text-primary mb-2">Direct Contact</h4>
              <p className="text-sm text-text-secondary font-light">Phone or WhatsApp<br />Subject to availability</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Calendar" size={24} color="var(--color-brand-blue)" />
              </div>
              <h4 className="font-serif font-semibold text-primary mb-2">Consultations</h4>
              <p className="text-sm text-text-secondary font-light">By Appointment<br />Flexible Scheduling</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuickContactOptions;
