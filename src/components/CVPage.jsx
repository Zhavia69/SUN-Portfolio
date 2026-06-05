import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Download,
  FileText,
  FileType,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  Award,
  Code2,
  Wrench,
  Users,
  Linkedin,
  Github,
} from 'lucide-react';

/* ============================================================
   CV DATA
   ============================================================ */

const cvData = {
  name: "SAMUEL RYAN NDUNG'U",
  location: 'Nairobi, Kenya',
  phone: '+254 743 248 996',
  email: 'Sammuelryan4050@gmail.com',
  linkedin: 'LinkedIn Profile',
  github: 'GitHub Link',

  summary:
    'Results-driven IT professional with a strong background in web application development, systems support, database management, and cloud-based environments. Skilled in building and optimizing secure, scalable, and high-performance applications using PHP (Laravel), JavaScript, Python, MySQL, HTML, and CSS. Demonstrated ability to troubleshoot complex technical issues, improve system efficiency, and support production environments with reliability and precision. Adept at API integration, backend development, and delivering user-focused digital solutions that enhance operational performance. Recognized for strong analytical thinking, adaptability, fast learning ability, and effective collaboration within cross-functional teams. Passionate about leveraging technology to drive innovation, streamline processes, and deliver measurable business impact.',

  experience: [
    {
      title: 'IT Technical Officer',
      company: 'Stima Sacco Head Office',
      period: 'Apr 2024 – Dec 2024',
      bullets: [
        'Supported web-based database systems, ensuring high availability, performance, and data integrity in production environments.',
        'Optimized and troubleshot MySQL databases, improving query performance and resolving data inconsistencies.',
        'Conducted system analysis and performance diagnostics, identifying bottlenecks and improving application efficiency.',
        'Performed API testing and integration validation using Postman, Insomnia, JavaScript, and Python requests to improve service reliability.',
        'Supported deployments in Docker and Microsoft Azure environments, improving application release and lifecycle workflows.',
        'Implemented endpoint security and access controls, strengthening system protection and reducing unauthorized access risks.',
        'Provided ongoing technical support and incident resolution, improving system usability and operational efficiency.',
      ],
    },
    {
      title: 'Helpdesk Technical Support',
      company: 'Damu Sasa / Jiji Health',
      period: 'Apr 2022 – Aug 2022',
      bullets: [
        'Engineered a Python-based web application that streamlined workflows, cutting task completion time by 40% and significantly improving operational efficiency.',
        'Strengthened backend system reliability by supporting data validation and database operations, ensuring accurate and consistent data processing.',
        'Played a key role in cloud database migration, reducing infrastructure maintenance costs by 40% while improving system scalability and accessibility.',
        'Implemented security controls and workflow automation, increasing system reliability and reducing operational risks.',
        'Delivered end-user support and training, achieving a 95% user satisfaction rate through fast issue resolution and proactive technical assistance.',
      ],
    },
  ],

  education: {
    institution: 'Catholic University of Eastern Africa',
    degree: 'Bachelor of Science in Computer Science',
    period: 'Sep 2019 – Oct 2023',
  },

  certifications: [
    'Security Analyst | Cyber Shujaa | Apr 2026',
    'Cisco Networking Academy | Endpoint Security | Jan 2025',
    'Cisco Networking Academy | Introduction to Cyber Security | Oct 2024',
    'Cisco Networking Academy | Ethical Hacking | Nov 2024',
    'JKUAT | Python Programming | June 2021',
    'JKUAT | Java Programming, Java SE8 | June 2021',
  ],

  projects: [
    'RESTful API Integration System – Built and tested backend APIs using JavaScript, Python, and Postman for system integration and reliable data exchange between services.',
    'CRUD Data Management System – Designed and implemented a MySQL-based CRUD application, optimizing queries and improving data processing efficiency.',
    'Authentication & Authorization System – Developed a secure login system with session management, password hashing concepts, and role-based access control (RBAC).',
    'Laravel MVC Backend System (In Progress) – Building a scalable backend using PHP Laravel (MVC, routing, controllers, migrations), enhanced with AI-assisted tools and agents for debugging, optimization, and development efficiency.',
  ],

  technicalSkills: {
    'Programming & Web': 'PHP, JavaScript, Python, Java, HTML5, CSS3, React, Vue.js',
    Databases: 'MySQL, PostgreSQL, SQLite, MariaDB, SQL Server',
    'Backend & Tools': 'Laravel, REST APIs, Git/GitHub, Postman, Docker, Azure, Linux',
    Concepts:
      'SDLC, MVC architecture, CRUD systems, authentication flows, system integration, application security basics',
  },

  softSkills: [
    'Problem-Solving',
    'Analytical Thinking',
    'Fast Learning',
    'Team Collaboration',
    'Clear Communication',
    'Adaptability',
    'Time Management',
    'Ownership & Accountability',
    'Continuous Improvement',
    'Attention to Detail',
    'Work Ethic',
  ],

  referees: [
    {
      name: 'Alphones Omesa',
      title: 'Applications Systems Officer TL',
      company: 'Stima Sacco',
      email: 'Aomesa@stima-sacco.com',
      phone: '+254 712747723',
    },
    {
      name: 'Abraham Kipruto',
      title: 'IT Technical Officer',
      company: 'Stima Sacco',
      email: 'Akipruto@stima-sacco.com',
      phone: '+254 707520362, +254703024223',
    },
    {
      name: 'Brian Orina',
      title: 'Software Developer',
      company: 'Damu Sasa / Jiji Health',
      email: 'brian.orina@damu-sasa.co.ke',
      phone: '+254 700072016',
    },
  ],
};

/* ============================================================
   SECTION COMPONENT
   ============================================================ */

const Section = ({ icon: Icon, title, children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    className="mb-10"
  >
    <div className="flex items-center gap-3 mb-4">
      <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
        <Icon className="w-4 h-4 text-cyan-400" />
      </div>
      <h2 className="text-lg font-bold text-white uppercase tracking-wider">
        {title}
      </h2>
    </div>
    <div className="ml-12">{children}</div>
  </motion.div>
);

/* ============================================================
   DOWNLOAD HELPERS
   ============================================================ */

const downloadAsPDF = async (ref) => {
  const html2canvas = (await import('html2canvas')).default;
  const { jsPDF } = await import('jspdf');

  const el = ref.current;
  const canvas = await html2canvas(el, {
    scale: 2,
    backgroundColor: '#0a0f1e',
    useCORS: true,
  });

  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pdfW = pdf.internal.pageSize.getWidth();
  const pdfH = pdf.internal.pageSize.getHeight();
  const imgW = canvas.width;
  const imgH = canvas.height;
  const ratio = pdfW / imgW;
  const scaledH = imgH * ratio;

  let yOffset = 0;
  while (yOffset < scaledH) {
    if (yOffset > 0) pdf.addPage();
    pdf.addImage(imgData, 'PNG', 0, -yOffset, pdfW, scaledH);
    yOffset += pdfH;
  }

  pdf.save('Samuel_Ryan_Ndungu_CV.pdf');
};

const downloadAsWord = () => {
  const html = `
    <html xmlns:o='urn:schemas-microsoft-com:office:office'
          xmlns:w='urn:schemas-microsoft-com:office:word'
          xmlns='http://www.w3.org/TR/REC-html40'>
    <head><meta charset="utf-8"><title>CV</title>
    <style>
      body { font-family: Calibri, sans-serif; font-size: 11pt; line-height: 1.5; color: #222; }
      h1 { font-size: 18pt; margin-bottom: 4pt; }
      h2 { font-size: 13pt; border-bottom: 1px solid #ccc; padding-bottom: 4pt; margin-top: 16pt; }
      h3 { font-size: 11pt; margin-bottom: 2pt; }
      ul { margin-top: 4pt; }
      .contact { font-size: 10pt; color: #555; }
      .period { font-size: 10pt; color: #777; float: right; }
    </style></head><body>
    <h1>${cvData.name}</h1>
    <p class="contact">${cvData.location} | ${cvData.phone} | ${cvData.email}</p>
    <h2>PROFESSIONAL SUMMARY</h2>
    <p>${cvData.summary}</p>
    <h2>PROFESSIONAL EXPERIENCE</h2>
    ${cvData.experience
      .map(
        (e) => `
      <h3>${e.title} – ${e.company} <span class="period">${e.period}</span></h3>
      <ul>${e.bullets.map((b) => `<li>${b}</li>`).join('')}</ul>
    `
      )
      .join('')}
    <h2>EDUCATION</h2>
    <h3>${cvData.education.institution} <span class="period">${cvData.education.period}</span></h3>
    <p>${cvData.education.degree}</p>
    <h2>CERTIFICATIONS</h2>
    <ul>${cvData.certifications.map((c) => `<li>${c}</li>`).join('')}</ul>
    <h2>SOFTWARE PROJECTS</h2>
    <ul>${cvData.projects.map((p) => `<li>${p}</li>`).join('')}</ul>
    <h2>CORE TECHNICAL SKILLS</h2>
    <ul>${Object.entries(cvData.technicalSkills)
      .map(([k, v]) => `<li><strong>${k}:</strong> ${v}</li>`)
      .join('')}</ul>
    <h2>SOFT SKILLS</h2>
    <p>${cvData.softSkills.join(' | ')}</p>
    <h2>REFEREES</h2>
    ${cvData.referees
      .map(
        (r) =>
          `<p><strong>${r.name}</strong> | ${r.title} | ${r.company}<br/>${r.email} | ${r.phone}</p>`
      )
      .join('')}
    </body></html>`;

  const blob = new Blob(['\ufeff', html], {
    type: 'application/msword',
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'Samuel_Ryan_Ndungu_CV.doc';
  a.click();
  URL.revokeObjectURL(url);
};

/* ============================================================
   CV PAGE COMPONENT
   ============================================================ */

const CVPage = () => {
  const cvRef = useRef(null);

  return (
    <div className="min-h-screen bg-[#050816] text-white">
      {/* BACKGROUND EFFECTS */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,.015)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,.015)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-cyan-500/5 blur-[200px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-600/5 blur-[200px] rounded-full" />
      </div>

      {/* STICKY HEADER */}
      <div className="sticky top-0 z-50 border-b border-white/10 bg-[#050816]/80 backdrop-blur-2xl">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-slate-400 hover:text-cyan-300 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-mono">← back to portfolio</span>
          </Link>

          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => downloadAsPDF(cvRef)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-medium hover:shadow-lg hover:shadow-cyan-500/20 transition-shadow"
            >
              <FileText className="w-4 h-4" />
              Download PDF
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={downloadAsWord}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-slate-300 text-sm font-medium hover:bg-white/10 transition"
            >
              <FileType className="w-4 h-4" />
              Download Word
            </motion.button>
          </div>
        </div>
      </div>

      {/* CV CONTENT */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-12" ref={cvRef}>
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-300 to-blue-500 bg-clip-text text-transparent mb-4">
            {cvData.name}
          </h1>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-slate-400">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-cyan-400" />
              {cvData.location}
            </span>
            <span className="flex items-center gap-1">
              <Phone className="w-3 h-3 text-cyan-400" />
              {cvData.phone}
            </span>
            <span className="flex items-center gap-1">
              <Mail className="w-3 h-3 text-cyan-400" />
              {cvData.email}
            </span>
          </div>
          <div className="flex items-center justify-center gap-4 mt-3">
            <span className="flex items-center gap-1 text-sm text-cyan-400 hover:text-cyan-300">
              <Linkedin className="w-3 h-3" />
              LinkedIn
            </span>
            <span className="flex items-center gap-1 text-sm text-cyan-400 hover:text-cyan-300">
              <Github className="w-3 h-3" />
              GitHub
            </span>
          </div>
        </motion.div>

        {/* DIVIDER */}
        <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent mb-10" />

        {/* PROFESSIONAL SUMMARY */}
        <Section icon={FileText} title="Professional Summary" delay={0.1}>
          <p className="text-slate-300 leading-relaxed">{cvData.summary}</p>
        </Section>

        {/* EXPERIENCE */}
        <Section icon={Briefcase} title="Professional Experience" delay={0.2}>
          {cvData.experience.map((exp, i) => (
            <div
              key={i}
              className="mb-8 p-5 rounded-xl bg-white/[0.02] border border-white/5"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                <div>
                  <h3 className="text-white font-semibold">{exp.title}</h3>
                  <p className="text-cyan-400 text-sm">{exp.company}</p>
                </div>
                <span className="text-xs text-slate-500 font-mono mt-1 sm:mt-0">
                  {exp.period}
                </span>
              </div>
              <ul className="space-y-2">
                {exp.bullets.map((b, j) => (
                  <li
                    key={j}
                    className="flex items-start gap-2 text-sm text-slate-400"
                  >
                    <span className="text-cyan-600 mt-1 shrink-0">▸</span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Section>

        {/* EDUCATION */}
        <Section icon={GraduationCap} title="Education" delay={0.3}>
          <div className="p-5 rounded-xl bg-white/[0.02] border border-white/5">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-white font-semibold">
                  {cvData.education.degree}
                </h3>
                <p className="text-cyan-400 text-sm">
                  {cvData.education.institution}
                </p>
              </div>
              <span className="text-xs text-slate-500 font-mono mt-1 sm:mt-0">
                {cvData.education.period}
              </span>
            </div>
          </div>
        </Section>

        {/* CERTIFICATIONS */}
        <Section icon={Award} title="Certifications" delay={0.35}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {cvData.certifications.map((cert, i) => (
              <div
                key={i}
                className="flex items-center gap-2 p-3 rounded-lg bg-white/[0.02] border border-white/5 text-sm text-slate-300"
              >
                <span className="w-2 h-2 rounded-full bg-cyan-400 shrink-0" />
                {cert}
              </div>
            ))}
          </div>
        </Section>

        {/* PROJECTS */}
        <Section icon={Code2} title="Software Projects" delay={0.4}>
          <div className="space-y-3">
            {cvData.projects.map((proj, i) => (
              <div
                key={i}
                className="p-4 rounded-lg bg-white/[0.02] border border-white/5 text-sm text-slate-300"
              >
                <span className="text-cyan-400 font-medium">
                  {proj.split('–')[0]}–
                </span>
                {proj.split('–').slice(1).join('–')}
              </div>
            ))}
          </div>
        </Section>

        {/* TECHNICAL SKILLS */}
        <Section icon={Wrench} title="Core Technical Skills" delay={0.45}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {Object.entries(cvData.technicalSkills).map(([cat, skills]) => (
              <div
                key={cat}
                className="p-4 rounded-lg bg-white/[0.02] border border-white/5"
              >
                <p className="text-xs text-cyan-400 font-mono uppercase tracking-wider mb-2">
                  {cat}
                </p>
                <p className="text-sm text-slate-300">{skills}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* SOFT SKILLS */}
        <Section icon={Users} title="Soft Skills" delay={0.5}>
          <div className="flex flex-wrap gap-2">
            {cvData.softSkills.map((skill, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs text-cyan-300 font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </Section>

        {/* REFEREES */}
        <Section icon={Users} title="Referees" delay={0.55}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {cvData.referees.map((ref, i) => (
              <div
                key={i}
                className="p-4 rounded-xl bg-white/[0.02] border border-white/5"
              >
                <p className="text-white font-semibold text-sm">{ref.name}</p>
                <p className="text-cyan-400 text-xs">{ref.title}</p>
                <p className="text-slate-500 text-xs mb-2">{ref.company}</p>
                <p className="text-slate-400 text-xs break-all">{ref.email}</p>
                <p className="text-slate-400 text-xs">{ref.phone}</p>
              </div>
            ))}
          </div>
        </Section>
      </div>
    </div>
  );
};

export default CVPage;
