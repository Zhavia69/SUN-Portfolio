import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, Linkedin, Github, Phone, Send, CheckCircle2 } from 'lucide-react';

const ContactSection = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("https://formsubmit.co/ajax/sammuelryan4050@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          subject: formState.subject,
          message: formState.message,
          _captcha: "false" // Disables the recaptcha for seamless AJAX
        })
      });

      if (response.ok) {
        setSubmitted(true);
        setFormState({ name: '', email: '', subject: '', message: '' });
      } else {
        console.error("Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setLoading(false);
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  const contactMethods = [
    {
      icon: Mail,
      label: 'Email',
      value: 'sammuelryan4050@gmail.com',
      href: 'mailto:sammuelryan4050@gmail.com',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Phone,
      label: 'WhatsApp / Phone',
      value: '+254 743 248 996',
      href: 'https://wa.me/254743248996',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'View Profile',
      href: 'https://www.linkedin.com/in/ndunguintelops/',
      color: 'from-blue-600 to-blue-400',
    },
    {
      icon: Github,
      label: 'GitHub',
      value: 'View Repositories',
      href: 'https://github.com/Zhavia69',
      color: 'from-slate-700 to-slate-900',
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
            Let's Build Something Together
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Available for new projects, consulting opportunities, and engineering roles. Let's discuss how I can help solve your technical challenges.
          </p>
        </motion.div>

        {/* Content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact methods - Left side */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-1 space-y-6"
          >
            <h3 className="text-2xl font-bold text-slate-900 mb-8">
              Quick Contact
            </h3>

            {contactMethods.map((method, idx) => {
              const Icon = method.icon;
              return (
                <motion.a
                  key={idx}
                  href={method.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: 8 }}
                  className="group flex items-start gap-4 p-4 rounded-lg hover:bg-white transition-all duration-200 border border-transparent hover:border-slate-200 cursor-pointer"
                >
                  <div
                    className={`flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br ${method.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-600 mb-1">
                      {method.label}
                    </p>
                    <p className="text-slate-900 font-medium break-all">
                      {method.value}
                    </p>
                  </div>
                </motion.a>
              );
            })}

            {/* Availability badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="mt-8 p-4 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <p className="text-sm font-semibold text-green-900">
                  Available for Opportunities
                </p>
              </div>
              <p className="text-sm text-green-700">
                Currently open to projects, full-time roles, and consulting engagements.
              </p>
            </motion.div>
          </motion.div>

          {/* Contact form - Right side */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name field */}
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-slate-900 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-200"
                  placeholder="Samuel"
                />
              </div>

              {/* Email field */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-slate-900 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-200"
                  placeholder="your@email.com"
                />
              </div>

              {/* Subject field */}
              <div>
                <label htmlFor="subject" className="block text-sm font-semibold text-slate-900 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formState.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-200"
                  placeholder="Project inquiry / Job opportunity / Consultation"
                />
              </div>

              {/* Message field */}
              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-slate-900 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-200 resize-none"
                  placeholder="Tell me about your project or opportunity..."
                />
              </div>

              {/* Submit button */}
              <motion.button
                type="submit"
                disabled={loading || submitted}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full px-6 py-4 rounded-lg font-semibold text-white transition-all duration-200 flex items-center justify-center gap-2 ${
                  submitted
                    ? 'bg-green-500 hover:bg-green-600'
                    : 'bg-gradient-to-r from-sky-500 to-cyan-500 hover:shadow-lg hover:shadow-sky-500/30'
                } disabled:opacity-75`}
              >
                {submitted ? (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    Message Sent!
                  </>
                ) : loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </motion.button>

              {/* Form note */}
              <p className="text-xs text-slate-500 text-center">
                I typically respond within 24-48 hours. For urgent inquiries, please call or WhatsApp me directly.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
