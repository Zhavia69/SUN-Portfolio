// Contact information loaded from environment variables
// These should ONLY be used in protected/controlled components
// NOT exposed publicly on hero sections or footers

const getContactInfo = () => {
  return {
    name: import.meta.env.VITE_CONTACT_NAME || 'Samuel Ryan Ndung\'u',
    email: import.meta.env.VITE_CONTACT_EMAIL || 'contact@example.com',
    phone: import.meta.env.VITE_CONTACT_PHONE || '+254 743 248 996',
    linkedin: import.meta.env.VITE_CONTACT_LINKEDIN || 'https://www.linkedin.com/in/ndunguintelops/',
    github: import.meta.env.VITE_CONTACT_GITHUB || 'https://github.com/Zhavia69',
    address: import.meta.env.VITE_CONTACT_ADDRESS || 'Nairobi, Kenya',
  };
};

const contactInfo = getContactInfo();

// Protected: Only use in modals and dedicated contact pages
export const CONTACT_NAME = contactInfo.name;
export const CONTACT_EMAIL = contactInfo.email;
export const CONTACT_EMAIL_HREF = `mailto:${contactInfo.email}`;
export const CONTACT_PHONE_DISPLAY = contactInfo.phone;
export const CONTACT_PHONE_NUMBER = contactInfo.phone.replace(/\s+/g, '');
export const CONTACT_PHONE_HREF = `tel:${CONTACT_PHONE_NUMBER}`;
export const CONTACT_WHATSAPP_HREF = `https://wa.me/${CONTACT_PHONE_NUMBER}`;
export const CONTACT_ADDRESS = contactInfo.address;
export const CONTACT_LINKEDIN_HREF = contactInfo.linkedin;
export const CONTACT_GITHUB_HREF = contactInfo.github;

// Public contact data: minimal information safe to display
export const PUBLIC_CONTACT_INFO = {
  name: CONTACT_NAME,
  address: CONTACT_ADDRESS,
  linkedin: CONTACT_LINKEDIN_HREF,
  github: CONTACT_GITHUB_HREF,
};

