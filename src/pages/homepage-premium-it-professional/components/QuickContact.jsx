import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import {
  CONTACT_EMAIL,
  CONTACT_EMAIL_HREF,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_HREF,
  CONTACT_WHATSAPP_HREF
} from '../../../utils/contactInfo';

const QuickContact = () => {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const [urgencyLevel, setUrgencyLevel] = useState('normal');

  const contactMethods = [
    {
      method: "WhatsApp",
      icon: "MessageCircle",
      color: "bg-green-500",
      description: "Fast contact for IT support, project questions, or quick coordination.",
      action: "Chat Now",
      link: CONTACT_WHATSAPP_HREF,
      bestFor: "Quick support",
      availability: "Mobile friendly"
    },
    {
      method: "Phone Call",
      icon: "Phone",
      color: "bg-blue-500",
      description: "Direct discussion for urgent technical issues or project scoping.",
      action: "Call Now",
      link: CONTACT_PHONE_HREF,
      bestFor: CONTACT_PHONE_DISPLAY,
      availability: "Nairobi, Kenya"
    },
    {
      method: "Email",
      icon: "Mail",
      color: "bg-purple-500",
      description: "Best for detailed project briefs, documentation, and formal follow-up.",
      action: "Send Email",
      link: CONTACT_EMAIL_HREF,
      bestFor: "Detailed inquiries",
      availability: CONTACT_EMAIL
    },
    {
      method: "Consultation",
      icon: "Calendar",
      color: "bg-orange-500",
      description: "Discuss web applications, database support, API integration, or cloud tooling.",
      action: "Request Session",
      link: "#consultation",
      bestFor: "Project planning",
      availability: "By appointment"
    }
  ];

  const serviceTypes = [
    "Web application development",
    "Laravel/PHP backend development",
    "REST API integration and testing",
    "MySQL/PostgreSQL database support",
    "Authentication and authorization flows",
    "Docker/Azure deployment support",
    "Endpoint security and access controls",
    "Helpdesk and systems support",
    "General inquiry"
  ];

  const urgencyLevels = [
    { value: 'low', label: 'Low Priority', description: 'Planning or exploratory discussion', color: 'text-green-600' },
    { value: 'normal', label: 'Normal Priority', description: 'Standard project or support request', color: 'text-blue-600' },
    { value: 'high', label: 'High Priority', description: 'Issue affecting active work', color: 'text-orange-600' },
    { value: 'urgent', label: 'Urgent', description: 'Production support or time-sensitive issue', color: 'text-red-600' }
  ];

  const handleConsultationRequest = () => {
    setIsConsultationOpen(true);
  };

  const handleQuickContact = (method) => {
    if (method?.link === "#consultation") {
      handleConsultationRequest();
    } else {
      window.open(method?.link, '_blank');
    }
  };

  const handleWhatsAppBooking = () => {
    const service = selectedService || 'General inquiry';
    const message = encodeURIComponent(
      `Hi Samuel, I would like to discuss: ${service}. Priority: ${urgencyLevel}.`
    );

    window.open(`${CONTACT_WHATSAPP_HREF}?text=${message}`, '_blank');
    setIsConsultationOpen(false);
  };

  return (
    <>
      <div className="hidden sm:block fixed bottom-6 right-6 z-40 space-y-3">
        <a
          href={CONTACT_WHATSAPP_HREF}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-premium transition-smooth hover-lift"
          title="Chat on WhatsApp"
          aria-label="Chat with Samuel Ryan on WhatsApp"
        >
          <Icon name="MessageCircle" size={24} aria-hidden="true" />
        </a>

        <button
          onClick={handleConsultationRequest}
          className="flex items-center justify-center w-14 h-14 bg-brand-orange hover:bg-brand-orange/90 text-white rounded-full shadow-premium transition-smooth hover-lift"
          title="Request Consultation"
          aria-label="Request a consultation"
        >
          <Icon name="Calendar" size={24} aria-hidden="true" />
        </button>
      </div>

      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
              Get In Touch With Samuel
            </h2>
            <p className="text-lg text-text-secondary max-w-3xl mx-auto">
              Reach out for web application development, systems support, database troubleshooting, API testing, cloud tooling, or technical support discussions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {contactMethods?.map((method, index) => (
              <div key={index} className="bg-card rounded-xl p-6 shadow-premium border border-border hover-lift">
                <div className="text-center">
                  <div className={`w-16 h-16 ${method?.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <Icon name={method?.icon} size={24} className="text-white" />
                  </div>

                  <h3 className="font-semibold text-text-primary mb-2">{method?.method}</h3>
                  <p className="text-text-secondary text-sm mb-4">{method?.description}</p>

                  <div className="space-y-2 mb-6">
                    <div className="flex items-center justify-between gap-3 text-xs">
                      <span className="text-text-secondary">Best for:</span>
                      <span className="font-medium text-success text-right">{method?.bestFor}</span>
                    </div>
                    <div className="flex items-center justify-between gap-3 text-xs">
                      <span className="text-text-secondary">Info:</span>
                      <span className="font-medium text-text-primary text-right break-all">{method?.availability}</span>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    fullWidth
                    onClick={() => handleQuickContact(method)}
                    iconName={method?.icon}
                    iconPosition="left"
                  >
                    {method?.action}
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-card rounded-xl p-6 shadow-premium border border-border">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-success rounded-full animate-pulse" />
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary">Based in Nairobi, Kenya</h3>
                  <p className="text-text-secondary text-sm">
                    Open to IT support, backend development, database, and web application opportunities.
                  </p>
                </div>
              </div>

              <div className="text-left sm:text-right">
                <div className="text-sm font-medium text-text-primary">
                  {new Date()?.toLocaleTimeString('en-KE', {
                    timeZone: 'Africa/Nairobi',
                    hour12: false,
                    hour: '2-digit',
                    minute: '2-digit'
                  })} EAT
                </div>
                <div className="text-xs text-text-secondary">{CONTACT_PHONE_DISPLAY}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {isConsultationOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" role="presentation">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="consultation-title"
            aria-describedby="consultation-description"
            className="bg-card rounded-xl shadow-premium border border-border w-full max-w-md max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 id="consultation-title" className="text-xl font-semibold text-text-primary">Request a Technical Consultation</h3>
                <button
                  onClick={() => setIsConsultationOpen(false)}
                  className="w-8 h-8 rounded-full bg-surface hover:bg-border transition-smooth flex items-center justify-center"
                  aria-label="Close consultation dialog"
                >
                  <Icon name="X" size={16} aria-hidden="true" />
                </button>
              </div>

              <p id="consultation-description" className="sr-only">
                Choose a service area and urgency level, then contact Samuel Ryan by WhatsApp or phone.
              </p>

              <div className="mb-6">
                <label className="block text-sm font-medium text-text-primary mb-3">
                  What can I help you with?
                </label>
                <div className="space-y-2">
                  {serviceTypes?.map((service, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedService(service)}
                      className={`w-full text-left p-3 rounded-lg border transition-smooth ${
                        selectedService === service
                          ? 'border-primary bg-primary/5 text-primary' : 'border-border hover:border-primary/50 text-text-primary'
                      }`}
                    >
                      <span className="text-sm">{service}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-text-primary mb-3">
                  Urgency Level
                </label>
                <div className="space-y-2">
                  {urgencyLevels?.map((level) => (
                    <button
                      key={level?.value}
                      onClick={() => setUrgencyLevel(level?.value)}
                      className={`w-full text-left p-3 rounded-lg border transition-smooth ${
                        urgencyLevel === level?.value
                          ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className={`text-sm font-medium ${level?.color}`}>
                          {level?.label}
                        </span>
                        <span className="text-xs text-text-secondary text-right">
                          {level?.description}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  variant="default"
                  fullWidth
                  iconName="MessageCircle"
                  iconPosition="left"
                  className="bg-brand-orange hover:bg-brand-orange/90"
                  onClick={handleWhatsAppBooking}
                >
                  Continue via WhatsApp
                </Button>

                <Button
                  variant="outline"
                  fullWidth
                  iconName="Phone"
                  iconPosition="left"
                  onClick={() => {
                    window.open(CONTACT_PHONE_HREF, '_blank');
                    setIsConsultationOpen(false);
                  }}
                >
                  Call Directly
                </Button>
              </div>

              <div className="mt-6 pt-6 border-t border-border text-center">
                <p className="text-xs text-text-secondary">
                  Prefer email? Reach out at{' '}
                  <a href={CONTACT_EMAIL_HREF} className="text-primary hover:underline">
                    {CONTACT_EMAIL}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default QuickContact;
