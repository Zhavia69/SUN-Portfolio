import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import { CONTACT_EMAIL_HREF, CONTACT_WHATSAPP_HREF } from '../../../utils/contactInfo';

const ProjectInquiryForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    projectType: '',
    timeline: '',
    description: '',
    services: [],
    hasExistingInfrastructure: false,
    preferredMeetingType: ''
  });

  const projectTypes = [
    { value: 'web-app', label: 'Web Application Development' },
    { value: 'backend', label: 'Backend or Laravel Support' },
    { value: 'database', label: 'Database / MySQL Support' },
    { value: 'api', label: 'REST API Integration' },
    { value: 'technical-support', label: 'Systems Support / Troubleshooting' },
    { value: 'security', label: 'Application or Endpoint Security Basics' },
    { value: 'other', label: 'Other Technical Inquiry' }
  ];

  const timelines = [
    { value: 'urgent', label: 'Urgent' },
    { value: '1-month', label: 'Within 1 Month' },
    { value: '2-3-months', label: '2-3 Months' },
    { value: 'flexible', label: 'Flexible Timeline' },
    { value: 'hiring', label: 'Hiring / Interview Process' }
  ];

  const meetingTypes = [
    { value: 'video', label: 'Video Call' },
    { value: 'in-person', label: 'In-person (Nairobi)' },
    { value: 'phone', label: 'Phone Call' },
    { value: 'email', label: 'Email Discussion' }
  ];

  const serviceOptions = [
    'PHP / Laravel',
    'JavaScript / React',
    'Python automation',
    'MySQL troubleshooting',
    'REST API testing',
    'Authentication / RBAC',
    'Docker / Azure support',
    'Technical documentation'
  ];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleServiceToggle = (service) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((item) => item !== service)
        : [...prev.services, service]
    }));
  };

  const buildInquiryMessage = () => {
    return [
      'Hi Samuel, I am reaching out from your portfolio website.',
      `Name: ${formData.name || 'Not provided'}`,
      `Email: ${formData.email || 'Not provided'}`,
      `Phone: ${formData.phone || 'Not provided'}`,
      `Company: ${formData.company || 'Not provided'}`,
      `Inquiry type: ${formData.projectType || 'Not selected'}`,
      `Timeline: ${formData.timeline || 'Not selected'}`,
      `Preferred meeting: ${formData.preferredMeetingType || 'Not selected'}`,
      `Existing infrastructure: ${formData.hasExistingInfrastructure ? 'Yes' : 'No / Not sure'}`,
      `Relevant skills: ${formData.services.length ? formData.services.join(', ') : 'Not selected'}`,
      `Details: ${formData.description || 'Not provided'}`
    ].join('\n');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = encodeURIComponent(buildInquiryMessage());
    window.open(`${CONTACT_WHATSAPP_HREF}?text=${message}`, '_blank');
  };

  return (
    <section id="project-inquiry" className="py-24 sm:py-32 lg:py-40 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-primary mb-4">
            Project or Hiring Inquiry
          </h2>
          <p className="text-lg font-light text-text-secondary max-w-3xl mx-auto">
            This form prepares a WhatsApp message with your details. It does not pretend to submit to a backend or send an automatic email.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-surface rounded-xl p-8 border border-border">
            <h3 className="text-xl font-serif font-semibold text-primary mb-6 flex items-center">
              <Icon name="User" size={20} className="mr-2" />
              Contact Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Full Name"
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                required
              />

              <Input
                label="Email Address"
                type="email"
                placeholder="your.email@company.com"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                required
              />

              <Input
                label="Company/Organization"
                type="text"
                placeholder="Your company name"
                value={formData.company}
                onChange={(e) => handleInputChange('company', e.target.value)}
              />

              <Input
                label="Phone Number"
                type="tel"
                placeholder="+254 ..."
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
              />
            </div>
          </div>

          <div className="bg-surface rounded-xl p-8 border border-border">
            <h3 className="text-xl font-serif font-semibold text-primary mb-6 flex items-center">
              <Icon name="Briefcase" size={20} className="mr-2" />
              Inquiry Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <Select
                label="Inquiry Type"
                placeholder="Select inquiry type"
                options={projectTypes}
                value={formData.projectType}
                onChange={(value) => handleInputChange('projectType', value)}
                required
              />

              <Select
                label="Timeline"
                placeholder="Select timeline"
                options={timelines}
                value={formData.timeline}
                onChange={(value) => handleInputChange('timeline', value)}
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-primary mb-3">
                Relevant Areas
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {serviceOptions.map((service) => (
                  <Checkbox
                    key={service}
                    label={service}
                    checked={formData.services.includes(service)}
                    onChange={() => handleServiceToggle(service)}
                  />
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-primary mb-2">
                Details
              </label>
              <textarea
                className="w-full h-32 px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary resize-none"
                placeholder="Describe the project, role, technical issue, or collaboration you want to discuss..."
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                required
              />
            </div>

            <Checkbox
              label="There is existing infrastructure or code that needs to be reviewed"
              checked={formData.hasExistingInfrastructure}
              onChange={(e) => handleInputChange('hasExistingInfrastructure', e.target.checked)}
            />
          </div>

          <div className="bg-surface rounded-xl p-8 border border-border">
            <h3 className="text-xl font-serif font-semibold text-primary mb-6 flex items-center">
              <Icon name="Calendar" size={20} className="mr-2" />
              Meeting Preference
            </h3>

            <Select
              label="Preferred Meeting Type"
              placeholder="Select meeting preference"
              options={meetingTypes}
              value={formData.preferredMeetingType}
              onChange={(value) => handleInputChange('preferredMeetingType', value)}
            />
          </div>

          <div className="text-center">
            <Button
              type="submit"
              variant="default"
              size="lg"
              iconName="MessageCircle"
              iconPosition="right"
              className="bg-brand-gold hover:shadow-luxury-elevated px-12"
            >
              Continue on WhatsApp
            </Button>

            <p className="text-sm text-text-secondary font-light mt-4">
              Prefer email? <a href={CONTACT_EMAIL_HREF} className="text-brand-gold hover:underline font-semibold">Send a direct email instead.</a>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ProjectInquiryForm;
