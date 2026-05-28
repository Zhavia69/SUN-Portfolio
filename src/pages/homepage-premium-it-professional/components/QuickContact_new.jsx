import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import ContactModal from '../../../components/ContactModal';

const QuickContact = () => {
  const [showContactModal, setShowContactModal] = useState(false);

  const contactMethods = [
    {
      method: "WhatsApp",
      icon: "MessageCircle",
      color: "bg-green-500",
      description: "Fast contact for IT support, project questions, or quick coordination.",
      action: "Chat Now"
    },
    {
      method: "Phone Call",
      icon: "Phone",
      color: "bg-blue-500",
      description: "Direct discussion for urgent technical issues or project scoping.",
      action: "Call Now"
    },
    {
      method: "Email",
      icon: "Mail",
      color: "bg-purple-500",
      description: "Best for detailed project briefs, documentation, and formal follow-up.",
      action: "Send Email"
    },
    {
      method: "Professional Network",
      icon: "Linkedin",
      color: "bg-blue-600",
      description: "Connect on LinkedIn for professional networking and opportunities.",
      action: "Connect"
    }
  ];

  return (
    <>
      <div className="hidden sm:block fixed bottom-6 right-6 z-40 space-y-3">
        <button
          onClick={() => setShowContactModal(true)}
          className="flex items-center justify-center w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-premium transition-smooth hover-lift"
          title="Quick Contact"
          aria-label="Quick contact options"
        >
          <Icon name="MessageCircle" size={24} aria-hidden="true" />
        </button>

        <button
          onClick={() => setShowContactModal(true)}
          className="flex items-center justify-center w-14 h-14 bg-brand-gold hover:bg-brand-gold/90 text-primary rounded-full shadow-premium transition-smooth hover-lift"
          title="Contact Information"
          aria-label="Open contact information"
        >
          <Icon name="Mail" size={24} aria-hidden="true" />
        </button>
      </div>

      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
              Get In Touch
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
                  <p className="text-text-secondary text-sm mb-6">{method?.description}</p>

                  <Button
                    variant="outline"
                    size="sm"
                    fullWidth
                    onClick={() => setShowContactModal(true)}
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
                <div className="text-xs text-text-secondary">Nairobi, Kenya</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactModal isOpen={showContactModal} onClose={() => setShowContactModal(false)} />
    </>
  );
};

export default QuickContact;
