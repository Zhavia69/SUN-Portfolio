import React, { useState } from 'react';
import Icon from './AppIcon';
import Button from './ui/Button';
import {
  CONTACT_EMAIL_HREF,
  CONTACT_PHONE_HREF,
  CONTACT_WHATSAPP_HREF,
  CONTACT_LINKEDIN_HREF,
  CONTACT_GITHUB_HREF,
  CONTACT_NAME
} from '../utils/contactInfo';

const ContactModal = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(null);

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-card rounded-2xl shadow-luxury-elevated max-w-md w-full border border-border animate-in fade-in duration-300">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div>
              <h2 className="text-2xl font-serif font-bold text-text-primary">
                Get in Touch
              </h2>
              <p className="text-sm text-text-secondary font-light mt-1">
                {CONTACT_NAME}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-surface rounded-lg transition-smooth"
              aria-label="Close contact modal"
            >
              <Icon name="X" size={20} className="text-text-secondary" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            {/* Email */}
            <div className="group">
              <label className="text-xs font-medium text-text-secondary uppercase tracking-wide">
                Email
              </label>
              <div className="flex items-center gap-2 mt-2">
                <a
                  href={CONTACT_EMAIL_HREF}
                  className="flex-1 px-4 py-2.5 rounded-lg bg-surface hover:bg-surface-hover transition-smooth text-text-primary font-light text-sm truncate"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Send Email
                </a>
                <button
                  onClick={() => {
                    const email = CONTACT_EMAIL_HREF.replace('mailto:', '');
                    handleCopy(email, 'email');
                  }}
                  className="px-3 py-2.5 rounded-lg bg-surface hover:bg-surface-hover transition-smooth"
                  aria-label="Copy email address"
                >
                  <Icon
                    name={copied === 'email' ? 'Check' : 'Copy'}
                    size={16}
                    className={copied === 'email' ? 'text-success' : 'text-text-secondary'}
                  />
                </button>
              </div>
            </div>

            {/* Phone */}
            <div className="group">
              <label className="text-xs font-medium text-text-secondary uppercase tracking-wide">
                Phone / WhatsApp
              </label>
              <div className="flex gap-2 mt-2">
                <a
                  href={CONTACT_WHATSAPP_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 px-4 py-2.5 rounded-lg bg-green-50 hover:bg-green-100 transition-smooth text-green-700 font-medium text-sm flex items-center justify-center gap-2"
                  aria-label="Chat on WhatsApp"
                >
                  <Icon name="MessageCircle" size={16} />
                  WhatsApp
                </a>
                <a
                  href={CONTACT_PHONE_HREF}
                  className="flex-1 px-4 py-2.5 rounded-lg bg-blue-50 hover:bg-blue-100 transition-smooth text-blue-700 font-medium text-sm flex items-center justify-center gap-2"
                  aria-label="Call by phone"
                >
                  <Icon name="Phone" size={16} />
                  Call
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="group pt-2">
              <label className="text-xs font-medium text-text-secondary uppercase tracking-wide">
                Professional
              </label>
              <div className="flex gap-2 mt-2">
                <a
                  href={CONTACT_LINKEDIN_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 transition-smooth text-white font-medium text-sm flex items-center justify-center gap-2"
                  aria-label="Connect on LinkedIn"
                >
                  <Icon name="Linkedin" size={16} />
                  LinkedIn
                </a>
                <a
                  href={CONTACT_GITHUB_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 px-4 py-2.5 rounded-lg bg-gray-800 hover:bg-gray-900 transition-smooth text-white font-medium text-sm flex items-center justify-center gap-2"
                  aria-label="Visit GitHub profile"
                >
                  <Icon name="Github" size={16} />
                  GitHub
                </a>
              </div>
            </div>

            {/* Status */}
            <div className="bg-success/10 rounded-lg p-4 border border-success/20 mt-4">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                <span className="text-success font-medium">Available for opportunities</span>
              </div>
              <p className="text-xs text-text-secondary font-light mt-2">
                Response time: 24 hours for emails, subject to availability for calls
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-border flex justify-end gap-3">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactModal;
