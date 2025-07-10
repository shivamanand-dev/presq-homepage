/**
 * Contact Form Service - Firebase Function Integration
 *
 * This service now submits contact forms via Firebase Cloud Functions
 * instead of direct Firestore writes for better security and processing.
 * Updated to use company-specific Firestore paths.
 */

import { addDoc, serverTimestamp, Timestamp } from 'firebase/firestore';
import { getCollection, COMPANY_ID } from './firebase';

// Firebase Function URL for contact form submission
const FIREBASE_CONTACT_FUNCTION_URL = process.env.NEXT_PUBLIC_FIREBASE_CONTACT_FUNCTION_URL;

// Default values for required fields
const DEFAULT_SOURCE = 'website';
const DEFAULT_STATUS = 'new';

/**
 * Contact form data structure interface
 * @typedef {Object} ContactFormData
 * @property {string} firstName - User's first name
 * @property {string} lastName - User's last name (optional)
 * @property {string} email - User's email address
 * @property {string} phone - User's phone number
 * @property {string} countryCode - Phone country code
 * @property {string} company - Company name (optional)
 * @property {string} subject - Inquiry subject
 * @property {string} message - Detailed message
 * @property {string} contactMethod - Preferred contact method
 * @property {string} bestTime - Best time to contact
 * @property {boolean} gdprConsent - GDPR consent status
 */

/**
 * Validates contact form data
 * @param {ContactFormData} formData - The form data to validate
 * @returns {Object} Validation result with isValid boolean and errors array
 */
export const validateContactForm = formData => {
  const errors = [];

  // Required field validation
  const requiredFields = {
    firstName: 'First name is required',
    email: 'Email is required',
    phone: 'Phone number is required',
    subject: 'Subject is required',
    message: 'Message is required',
    bestTime: 'Best time to contact is required',
    gdprConsent: 'GDPR consent is required',
  };

  // Check required fields
  Object.entries(requiredFields).forEach(([field, errorMessage]) => {
    if (!formData[field] || (typeof formData[field] === 'string' && !formData[field].trim())) {
      errors.push({ field, message: errorMessage });
    }
  });

  // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (formData.email && !emailRegex.test(formData.email)) {
    errors.push({ field: 'email', message: 'Please enter a valid email address' });
  }

  // Phone number validation (basic)
  const phoneRegex = /^[0-9]{10,15}$/;
  if (formData.phone && !phoneRegex.test(formData.phone.replace(/\s+/g, ''))) {
    errors.push({ field: 'phone', message: 'Please enter a valid phone number (10-15 digits)' });
  }

  // Message length validation
  if (formData.message && formData.message.trim().length < 10) {
    errors.push({ field: 'message', message: 'Message must be at least 10 characters long' });
  }

  // Word count validation
  if (formData.message) {
    const wordCount = formData.message.trim().split(/\s+/).length;
    if (wordCount < 4) {
      errors.push({ field: 'message', message: 'Message must contain at least 4 words' });
    }
  }

  // GDPR consent validation
  if (!formData.gdprConsent) {
    errors.push({ field: 'gdprConsent', message: 'You must agree to the privacy policy' });
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Generates a unique submission ID
 * @returns {string} Unique ID for the submission
 */
export const generateSubmissionId = () => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  return `SUB_${timestamp}_${random}`;
};

/**
 * Prepares form data for Firebase Function submission
 * @param {ContactFormData} formData - Raw form data
 * @returns {Object} Prepared data for Firebase Function
 */
const prepareDataForSubmission = formData => {
  const submissionId = generateSubmissionId();

  const baseData = {
    // === REQUIRED FIELDS ===
    companyId: COMPANY_ID,
    source: DEFAULT_SOURCE,
    status: DEFAULT_STATUS,
    fullName: formData.lastName
      ? `${formData.firstName.trim()} ${formData.lastName.trim()}`
      : formData.firstName.trim(),
    email: formData.email.trim().toLowerCase(),
    message: formData.message.trim(),

    // === OPTIONAL FIELDS ===
    firstName: formData.firstName.trim(),
    phone: formData.phone.trim(),
    countryCode: formData.countryCode || '+91',
    subject: formData.subject,
    priority: determinePriority(formData),
    category: determineCategory(formData.subject),
    tags: generateTags(formData),

    // === SUBMISSION METADATA ===
    submissionId,
    sessionId: generateSessionId(),
    pageUrl: typeof window !== 'undefined' ? window.location.href : null,
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : null,
    timezone: getTimezone(),

    // === CONTACT PREFERENCES ===
    contactMethod: formData.contactMethod || 'email',
    bestTime: formData.bestTime,

    // === TRACKING & ANALYTICS ===
    screenResolution: getScreenResolution(),
    referrer: typeof document !== 'undefined' ? document.referrer : null,
    utmSource: getUtmParameter('utm_source'),
    utmMedium: getUtmParameter('utm_medium'),
    utmCampaign: getUtmParameter('utm_campaign'),

    // === BUSINESS INTELLIGENCE ===
    leadScore: calculateLeadScore(formData),
    customerSegment: determineCustomerSegment(formData),
    estimatedValue: estimateProjectValue(formData.subject),
    urgencyLevel: determineUrgency(formData),

    // === COMPLIANCE ===
    gdprConsent: formData.gdprConsent,
    privacyPolicyVersion: '1.0',
    termsAccepted: true,
    dataRetentionDate: calculateRetentionDate(),

    // === CUSTOM FIELDS ===
    customFields: {
      contactPreferences: {
        method: formData.contactMethod,
        bestTime: formData.bestTime,
      },
      formVersion: '2.0',
      platform: 'website',
    },
  };

  // Add optional fields only if they have values
  if (formData.lastName && formData.lastName.trim()) {
    baseData.lastName = formData.lastName.trim();
  }

  if (formData.company && formData.company.trim()) {
    baseData.company = formData.company.trim();
  }

  return baseData;
};

/**
 * Utility functions for enhanced data collection
 */

// Generate session ID for tracking user journey
const generateSessionId = () => {
  if (typeof window !== 'undefined' && window.sessionStorage) {
    let sessionId = sessionStorage.getItem('presq_session_id');
    if (!sessionId) {
      sessionId = `sess_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
      sessionStorage.setItem('presq_session_id', sessionId);
    }
    return sessionId;
  }
  return `sess_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
};

// Extract UTM parameters from URL for campaign tracking
const getUtmParameter = param => {
  if (typeof window !== 'undefined') {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }
  return null;
};

// Calculate lead score for admin prioritization
const calculateLeadScore = formData => {
  let score = 50; // Base score

  // Company provided (+20 points)
  if (formData.company && formData.company.trim()) score += 20;

  // Subject indicates high-value service (+30 points)
  const highValueSubjects = [
    'web development',
    'app development',
    'digital marketing',
    'e-commerce',
  ];
  if (highValueSubjects.some(subject => formData.subject.toLowerCase().includes(subject))) {
    score += 30;
  }

  // Detailed message (+10 points)
  if (formData.message && formData.message.length > 100) score += 10;

  // Phone provided (+15 points)
  if (formData.phone && formData.phone.trim()) score += 15;

  // Professional email domain (+10 points)
  if (
    formData.email &&
    !formData.email.includes('@gmail.') &&
    !formData.email.includes('@yahoo.')
  ) {
    score += 10;
  }

  return Math.min(score, 100); // Cap at 100
};

// Determine customer segment for admin categorization
const determineCustomerSegment = formData => {
  if (formData.company && formData.company.trim()) {
    return 'business';
  }

  const businessKeywords = [
    'startup',
    'company',
    'business',
    'enterprise',
    'organization',
    'firm',
    'agency',
  ];
  if (businessKeywords.some(keyword => formData.message.toLowerCase().includes(keyword))) {
    return 'business';
  }

  return 'individual';
};

// Estimate project value for admin prioritization
const estimateProjectValue = subject => {
  const valueMap = {
    'web development': 'high',
    'app development': 'high',
    'e-commerce': 'high',
    'digital marketing': 'medium',
    seo: 'medium',
    analytics: 'low',
    consultation: 'low',
    maintenance: 'low',
  };

  const subjectLower = subject.toLowerCase();
  for (const [key, value] of Object.entries(valueMap)) {
    if (subjectLower.includes(key)) {
      return value;
    }
  }

  return 'medium';
};

// Determine urgency level for admin response prioritization
const determineUrgency = formData => {
  const urgentKeywords = ['urgent', 'asap', 'immediately', 'emergency', 'critical', 'deadline'];
  const message = formData.message.toLowerCase();

  if (urgentKeywords.some(keyword => message.includes(keyword))) {
    return 'high';
  }

  // Business inquiries get medium urgency
  if (formData.company && formData.company.trim()) {
    return 'medium';
  }

  return 'normal';
};

// Determine priority based on lead score and urgency
const determinePriority = formData => {
  const urgency = determineUrgency(formData);
  const leadScore = calculateLeadScore(formData);

  if (urgency === 'high' || leadScore >= 80) return 'high';
  if (urgency === 'medium' || leadScore >= 60) return 'medium';
  return 'normal';
};

// Determine category based on subject
const determineCategory = subject => {
  const categoryMap = {
    'web development': 'development',
    'app development': 'development',
    mobile: 'development',
    seo: 'marketing',
    'digital marketing': 'marketing',
    analytics: 'analytics',
    consultation: 'consultation',
    support: 'support',
    maintenance: 'support',
  };

  const subjectLower = subject.toLowerCase();
  for (const [key, category] of Object.entries(categoryMap)) {
    if (subjectLower.includes(key)) {
      return category;
    }
  }

  return 'general';
};

// Generate tags for better organization
const generateTags = formData => {
  const tags = [DEFAULT_SOURCE, 'contact_form'];

  // Add subject-based tags
  tags.push(formData.subject.toLowerCase().replace(/\s+/g, '_'));

  // Add customer segment tag
  tags.push(determineCustomerSegment(formData));

  // Add urgency tag
  tags.push(determineUrgency(formData));

  // Add company tag if provided
  if (formData.company && formData.company.trim()) {
    tags.push('has_company');
  }

  return tags;
};

// Calculate data retention date (7 years for business records)
const calculateRetentionDate = () => {
  const retentionDate = new Date();
  retentionDate.setFullYear(retentionDate.getFullYear() + 7);
  return Timestamp.fromDate(retentionDate);
};

// Get screen resolution for analytics
const getScreenResolution = () => {
  if (typeof window === 'undefined') return null;

  return {
    width: window.screen.width,
    height: window.screen.height,
    availWidth: window.screen.availWidth,
    availHeight: window.screen.availHeight,
    colorDepth: window.screen.colorDepth,
  };
};

// Get timezone for admin scheduling
const getTimezone = () => {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch (error) {
    return null;
  }
};

/**
 * Saves contact form submission via Firebase Cloud Function
 * This replaces direct Firestore writes with HTTP requests to Firebase Functions
 *
 * @param {ContactFormData} formData - The validated form data
 * @returns {Promise<Object>} Result object with success status and data
 */
export const saveContactSubmission = async formData => {
  try {
    console.log('🚀 Starting contact form submission via Firebase Function...');

    // Check if Firebase Function URL is configured
    if (!FIREBASE_CONTACT_FUNCTION_URL) {
      console.error('❌ Firebase Function URL not configured');
      return {
        success: false,
        error: 'Configuration error',
        message:
          'Contact form service is not properly configured. Please try again later or contact us directly.',
        details: { error: 'FIREBASE_CONTACT_FUNCTION_URL not set' },
      };
    }

    // Validate form data
    const validation = validateContactForm(formData);
    if (!validation.isValid) {
      console.error('❌ Form validation failed:', validation.errors);
      return {
        success: false,
        error: 'Form validation failed',
        details: validation.errors,
        message: 'Please check your form and try again.',
      };
    }

    // Prepare data for Firebase Function submission
    const dataToSubmit = prepareDataForSubmission(formData);
    console.log('📝 Prepared data for Firebase Function submission:', {
      submissionId: dataToSubmit.submissionId,
      companyId: dataToSubmit.companyId,
      source: dataToSubmit.source,
      leadScore: dataToSubmit.leadScore,
      customerSegment: dataToSubmit.customerSegment,
      functionUrl: FIREBASE_CONTACT_FUNCTION_URL,
    });

    // Make HTTP POST request to Firebase Function
    const response = await fetch(FIREBASE_CONTACT_FUNCTION_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(dataToSubmit),
    });

    // Check if the response is ok
    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch (parseError) {
        errorData = {
          message: `HTTP ${response.status}: ${response.statusText}`,
          status: response.status,
        };
      }

      console.error('❌ Firebase Function call failed:', response.status, errorData);

      // Log error for admin monitoring (fallback to direct Firestore write with company path)
      try {
        await logError(
          'firebase_function_submission_error',
          new Error(errorData.message || 'Unknown error from function'),
          {
            companyId: COMPANY_ID,
            source: DEFAULT_SOURCE,
            statusCode: response.status,
            functionError: errorData,
            functionUrl: FIREBASE_CONTACT_FUNCTION_URL,
          }
        );
      } catch (logError) {
        console.warn('⚠️ Error logging failed:', logError);
      }

      return {
        success: false,
        error: 'Firebase Function submission failed',
        details: errorData,
        message:
          errorData.message ||
          'Sorry, there was an error sending your message. Please try again or contact us directly.',
      };
    }

    // Parse successful response
    const resultData = await response.json();
    console.log('✅ Firebase Function submission successful:', resultData);

    // Log analytics event for tracking (fallback to direct Firestore write with company path)
    try {
      await logAnalyticsEvent('contact_form_submission_via_function', {
        submissionId: dataToSubmit.submissionId,
        companyId: dataToSubmit.companyId,
        source: dataToSubmit.source,
        leadScore: dataToSubmit.leadScore,
        customerSegment: dataToSubmit.customerSegment,
        estimatedValue: dataToSubmit.estimatedValue,
        urgencyLevel: dataToSubmit.urgencyLevel,
        functionResponse: resultData,
        functionUrl: FIREBASE_CONTACT_FUNCTION_URL,
      });
    } catch (analyticsError) {
      console.warn('⚠️ Analytics logging failed:', analyticsError);
    }

    console.log('✅ Contact form submission completed successfully via Firebase Function');

    return {
      success: true,
      data: {
        submissionId: dataToSubmit.submissionId,
        companyId: dataToSubmit.companyId,
        source: dataToSubmit.source,
        timestamp: new Date().toISOString(),
        leadScore: dataToSubmit.leadScore,
        customerSegment: dataToSubmit.customerSegment,
        urgencyLevel: dataToSubmit.urgencyLevel,
        subject: dataToSubmit.subject,
        functionResponse: resultData,
      },
      message: "Your message has been sent successfully! We'll respond within 24 hours.",
    };
  } catch (error) {
    console.error('❌ Unexpected error during Firebase Function submission:', error);

    // Log error for admin monitoring (fallback to direct Firestore write with company path)
    try {
      await logError('unexpected_function_submission_error', error, {
        companyId: COMPANY_ID,
        source: DEFAULT_SOURCE,
        functionUrl: FIREBASE_CONTACT_FUNCTION_URL,
      });
    } catch (logError) {
      console.warn('⚠️ Error logging failed:', logError);
    }

    const errorDetails = {
      message: error.message,
      code: error.code,
      timestamp: new Date().toISOString(),
      companyId: COMPANY_ID,
      source: DEFAULT_SOURCE,
      functionUrl: FIREBASE_CONTACT_FUNCTION_URL,
    };

    console.error('Error details:', errorDetails);

    return {
      success: false,
      error: 'Failed to submit contact form via Firebase Function',
      details: errorDetails,
      message: 'Sorry, an unexpected error occurred. Please try again or contact us directly.',
    };
  }
};

/**
 * Analytics and logging functions (Fallback to direct Firestore writes with company paths)
 * These are used when Firebase Function calls fail or for additional tracking
 */

// Log analytics events for admin platform analysis (using company-specific path)
const logAnalyticsEvent = async (eventName, eventData) => {
  try {
    const analyticsCollection = getCollection('analytics', COMPANY_ID);
    await addDoc(analyticsCollection, {
      eventName,
      eventData,
      timestamp: serverTimestamp(),
      createdAt: Timestamp.now(),
      sessionId: generateSessionId(),
      pageUrl: typeof window !== 'undefined' ? window.location.href : null,
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : null,
      companyId: COMPANY_ID,
      source: DEFAULT_SOURCE,
    });
    console.log('📊 Analytics event logged to company-specific path:', eventName);
  } catch (error) {
    console.warn('⚠️ Failed to log analytics event:', error);
  }
};

// Log errors for admin platform monitoring (using company-specific path)
const logError = async (errorType, error, context = {}) => {
  try {
    const errorCollection = getCollection('system_logs', COMPANY_ID);
    await addDoc(errorCollection, {
      errorType,
      message: error.message,
      stack: error.stack,
      context: {
        ...context,
        companyId: COMPANY_ID,
        source: DEFAULT_SOURCE,
      },
      timestamp: serverTimestamp(),
      createdAt: Timestamp.now(),
      sessionId: generateSessionId(),
      pageUrl: typeof window !== 'undefined' ? window.location.href : null,
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : null,
    });
    console.log('🚨 Error logged to company-specific path for admin monitoring:', errorType);
  } catch (logError) {
    console.warn('⚠️ Failed to log error:', logError);
  }
};

/**
 * Performance tracking for admin platform optimization (using company-specific path)
 */
export const trackFormPerformance = async performanceData => {
  try {
    const performanceCollection = getCollection('analytics', COMPANY_ID);
    await addDoc(performanceCollection, {
      eventName: 'form_performance',
      eventData: performanceData,
      timestamp: serverTimestamp(),
      createdAt: Timestamp.now(),
      sessionId: generateSessionId(),
      pageUrl: typeof window !== 'undefined' ? window.location.href : null,
      companyId: COMPANY_ID,
      source: DEFAULT_SOURCE,
    });
    console.log('⚡ Performance data logged to company-specific path');
  } catch (error) {
    console.warn('⚠️ Failed to log performance data:', error);
  }
};

/**
 * User journey tracking for admin platform analysis (using company-specific path)
 */
export const trackUserJourney = async journeyData => {
  try {
    const journeyCollection = getCollection('analytics', COMPANY_ID);
    await addDoc(journeyCollection, {
      eventName: 'user_journey',
      eventData: journeyData,
      timestamp: serverTimestamp(),
      createdAt: Timestamp.now(),
      sessionId: generateSessionId(),
      companyId: COMPANY_ID,
      source: DEFAULT_SOURCE,
    });
    console.log('🛤️ User journey tracked to company-specific path');
  } catch (error) {
    console.warn('⚠️ Failed to track user journey:', error);
  }
};

// Export constants
export { COMPANY_ID, DEFAULT_SOURCE, DEFAULT_STATUS, FIREBASE_CONTACT_FUNCTION_URL };

// Note: This platform now uses Firebase Functions for contact submissions
// Fallback analytics and error logging use direct Firestore writes with company-specific paths
console.log('📝 Contact Service initialized with Firebase Function integration');
console.log('🏢 Company ID:', COMPANY_ID);
console.log('🗂️ Using company-specific Firestore paths: Presq/{companyId}/{collection}');
console.log('🔗 Firebase Function URL:', FIREBASE_CONTACT_FUNCTION_URL || 'NOT CONFIGURED');
console.log('🔒 Read/Edit operations are handled by the admin platform');
