import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import {
  CONTACT_ADDRESS,
  CONTACT_EMAIL,
  CONTACT_EMAIL_HREF,
  CONTACT_GITHUB_HREF,
  CONTACT_LINKEDIN_HREF,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_HREF,
  CONTACT_WHATSAPP_HREF
} from '../../utils/contactInfo';

const Footer = ({ showCTA = true }) => {
  const currentYear = new Date()?.getFullYear();

  const contactInfo = [
    {
      id: 1,
      icon: "Phone",
      label: "Phone",
      value: CONTACT_PHONE_DISPLAY,
      href: CONTACT_PHONE_HREF,
      description: "Direct Contact"
    },
    {
      id: 2,
      icon: "Mail",
      label: "Email",
      value: CONTACT_EMAIL,
      href: CONTACT_EMAIL_HREF,
      description: "Professional Inquiries"
    },
    {
      id: 3,
      icon: "MessageCircle",
      label: "WhatsApp",
      value: CONTACT_PHONE_DISPLAY,
      href: CONTACT_WHATSAPP_HREF,
      description: "Quick Questions & Support"
    },
    {
      id: 4,
      icon: "MapPin",
      label: "Location",
      value: CONTACT_ADDRESS,
      href: "#",
      description: "East Africa Time (UTC+3)"
    }
  ];

  const socialLinks = [
    {
      id: 1,
      name: "LinkedIn",
      icon: "Linkedin",
      href: CONTACT_LINKEDIN_HREF,
    },
    {
      id: 2,
      name: "GitHub",
      icon: "Github",
      href: CONTACT_GITHUB_HREF,
    }
  ];

  const quickLinks = [
    { name: "Home", href: "/homepage-premium-it-professional" },
    { name: "About", href: "/about-professional-journey" },
    { name: "Expertise", href: "/technical-expertise-showcase" },
    { name: "Portfolio", href: "/project-portfolio-universe" },
    { name: "Contact", href: "/collaboration-center-contact-hub" }
  ];

  const handleContactClick = (href) => {
    if (href?.startsWith('mailto:') || href?.startsWith('tel:') || href?.startsWith('https://') || href?.startsWith('whatsapp:')) {
      window.open(href, '_blank');
    }
  };

  return (
    <footer className="bg-gradient-to-br from-primary via-brand-navy to-foreground text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-8">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-brand-gold to-brand-copper rounded-xl flex items-center justify-center shadow-luxury">
                  <span className="text-primary font-serif font-bold text-lg">S</span>
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-brand-gold rounded-full border-2 border-primary"></div>
              </div>
              <div>
                <h3 className="text-lg font-serif font-semibold">Samuel</h3>
                <p className="text-white/70 text-xs sm:text-sm font-light">Professional</p>
              </div>
            </div>
            
            <p className="text-white/70 text-sm leading-relaxed mb-8 font-light">
              Premium IT services based in Nairobi. Specializing in web applications, systems architecture, and secure digital solutions.
            </p>
            
            <div className="flex space-x-4">
              {socialLinks?.map((social) => (
                <a
                  key={social?.id}
                  href={social?.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 bg-white/10 rounded-xl flex items-center justify-center hover:bg-brand-gold hover:text-primary transition-luxury"
                  aria-label={social?.name}
                >
                  <Icon name={social?.icon} size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Contact Information */}
          <div className="lg:col-span-1">
            <h4 className="text-sm sm:text-base font-semibold mb-8 font-serif">Contact</h4>
            <div className="space-y-5">
              {contactInfo?.map((contact) => (
                <button
                  key={contact?.id}
                  onClick={() => handleContactClick(contact?.href)}
                  className="flex items-start space-x-3 text-left w-full hover:text-brand-gold transition-luxury group"
                >
                  <div className="w-9 h-9 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-brand-gold group-hover:text-primary transition-luxury">
                    <Icon name={contact?.icon} size={16} />
                  </div>
                  <div className="text-sm">
                    <p className="font-medium text-white">{contact?.value}</p>
                    <p className="text-xs text-white/60 font-light">{contact?.description}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-1">
            <h4 className="text-sm sm:text-base font-semibold mb-8 font-serif">Navigate</h4>
            <div className="space-y-4">
              {quickLinks?.map((link, index) => (
                <Link
                  key={index}
                  to={link?.href}
                  className="block text-white/70 hover:text-brand-gold transition-luxury text-sm font-light"
                >
                  {link?.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          {showCTA && (
            <div className="lg:col-span-1">
              <h4 className="text-sm sm:text-base font-semibold mb-8 font-serif">Get Started</h4>
              <p className="text-white/70 text-sm mb-8 leading-relaxed font-light">
                Ready to discuss a technical project or support need?
              </p>
              
              <Link to="/collaboration-center-contact-hub" className="block">
                <Button
                  variant="default"
                  fullWidth
                  iconName="MessageCircle"
                  iconPosition="left"
                  className="bg-brand-gold text-primary hover:bg-brand-copper font-semibold"
                >
                  Contact Now
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-white/10"></div>

      {/* Business Hours Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0 text-xs sm:text-sm">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-6 sm:gap-8">
            <div className="flex items-center space-x-2 text-white/70">
              <Icon name="Clock" size={16} />
              <span className="font-light">Mon-Fri: 8AM-6PM (EAT)</span>
            </div>
            <div className="hidden sm:flex items-center space-x-2 text-white/70">
              <Icon name="Shield" size={16} />
              <span className="font-light">Security-minded support</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 text-white/70">
            <div className="w-2 h-2 bg-brand-gold rounded-full animate-pulse"></div>
            <span className="font-light">Available for projects</span>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-white/10"></div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 text-xs sm:text-sm text-white/60 font-light">
          <div className="text-center sm:text-left">
            <p>&copy; {currentYear} Samuel Ryan Ndung'u. All rights reserved.</p>
          </div>
          
          <div className="flex items-center space-x-4 text-xs">
            <span>Nairobi, Kenya</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
