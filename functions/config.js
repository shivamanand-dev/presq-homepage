/**
 * Configuration file for Firebase Cloud Functions
 * Email service configuration and environment variables
 */

/**
 * Default configuration values
 * Override these with Firebase environment configuration
 */
const defaultConfig = {
  region: 'us-central1',
  email: {
    service: 'zoho',
    host: 'smtppro.zoho.in',
    port: 587,
    secure: false,
    requireTLS: true,
    companyName: 'PreSQ Innovation',
    supportEmail: 'admin@presq.co.in',
    websiteUrl: 'https://presq.co.in',
    user: '', // Set via Firebase config
    password: '', // Set via Firebase config
    adminEmail: 'admin@presq.co.in', // Set via Firebase config
  },
  adminPanelUrl: 'https://admin.presq.co.in',
  allowedOrigins: ['https://presq.co.in', 'https://www.presq.co.in', 'https://admin.presq.co.in'],
};

/**
 * Email templates configuration
 */
const emailTemplates = {
  admin: {
    subject: (urgency, subject) => `🚨 New ${urgency.toUpperCase()} Priority Lead - ${subject}`,

    subjectResend: (urgency, subject) =>
      `🔄 RESENT: ${urgency.toUpperCase()} Priority Lead - ${subject}`,
  },

  customer: {
    subject: "Thank you for contacting PreSQ Innovation - We'll respond within 24 hours",

    subjectCustom: firstName => `Thank you ${firstName} - Your message has been received`,
  },
};

/**
 * Business rules configuration
 */
const businessRules = {
  // Response time commitments
  responseTime: {
    high: '2 hours',
    medium: '12 hours',
    normal: '24 hours',
    low: '48 hours',
  },

  // Lead scoring thresholds
  leadScoring: {
    hot: 80,
    warm: 60,
    cold: 40,
  },

  // Email priority mapping
  emailPriority: {
    high: 'high',
    medium: 'normal',
    normal: 'normal',
    low: 'low',
  },
};

module.exports = {
  defaultConfig,
  emailTemplates,
  businessRules,
};
