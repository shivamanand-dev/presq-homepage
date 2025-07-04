/**
 * Contact Form Service - Write-Only Data Collection Platform
 *
 * This service is designed for data collection only. It provides:
 * - Contact form submission handling
 * - Data validation and sanitization
 * - Scalable Firebase storage structure
 * - Analytics and tracking
 *
 * Note: This platform does NOT provide read/edit/delete operations.
 * All data management is handled by a separate admin platform.
 */

import { addDoc, serverTimestamp, Timestamp } from 'firebase/firestore';
import { getCollection, PLATFORMS, DATA_TYPES, buildDbPath } from './firebase';

// Default platform for website contact forms
const DEFAULT_PLATFORM = PLATFORMS.WEBSITE;
const DEFAULT_DATA_TYPE = DATA_TYPES.CONTACT_FORM;

/**
 * Contact form data structure interface
 * @typedef {Object} ContactFormData
 * @property {string} firstName - User's first name
 * @property {string} lastName - User's last name
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
    lastName: 'Last name is required',
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
 * Generates a unique submission ID with platform and type prefixes
 * @param {string} platform - Platform identifier
 * @param {string} dataType - Data type identifier
 * @returns {string} Unique ID for the submission
 */
export const generateSubmissionId = (platform = DEFAULT_PLATFORM, dataType = DEFAULT_DATA_TYPE) => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  return `${platform}_${dataType}_${timestamp}_${random}`;
};

/**
 * Prepares form data for database storage with enhanced metadata
 * @param {ContactFormData} formData - Raw form data
 * @param {string} platform - Platform identifier
 * @param {string} dataType - Data type identifier
 * @returns {Object} Prepared data for database storage
 */
const prepareDataForStorage = (
  formData,
  platform = DEFAULT_PLATFORM,
  dataType = DEFAULT_DATA_TYPE
) => {
  const submissionId = generateSubmissionId(platform, dataType);

  return {
    // Unique identifiers
    submissionId,
    platform,
    dataType,

    // Personal Information
    firstName: formData.firstName.trim(),
    lastName: formData.lastName.trim(),
    fullName: `${formData.firstName.trim()} ${formData.lastName.trim()}`,
    email: formData.email.trim().toLowerCase(),
    phone: formData.phone.trim(),
    countryCode: formData.countryCode || '+91',
    company: formData.company ? formData.company.trim() : null,

    // Inquiry Details
    subject: formData.subject,
    message: formData.message.trim(),
    contactMethod: formData.contactMethod || 'email',
    bestTime: formData.bestTime,

    // Consent and Legal
    gdprConsent: formData.gdprConsent,
    privacyPolicyVersion: '1.0',
    termsAccepted: true,

    // System Fields (Read-only for admin platform)
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    isRead: false,
    status: 'new',
    priority: 'normal',
    source: `${platform}_contact_form`,

    // Enhanced Metadata for Admin Analytics
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : null,
    referrer: typeof document !== 'undefined' ? document.referrer : null,
    pageUrl: typeof window !== 'undefined' ? window.location.href : null,
    timestamp: Timestamp.now(),

    // Tracking and Analytics
    sessionId: generateSessionId(),
    utmSource: getUtmParameter('utm_source'),
    utmMedium: getUtmParameter('utm_medium'),
    utmCampaign: getUtmParameter('utm_campaign'),
    utmContent: getUtmParameter('utm_content'),
    utmTerm: getUtmParameter('utm_term'),

    // Business Intelligence (for admin platform analysis)
    leadScore: calculateLeadScore(formData),
    customerSegment: determineCustomerSegment(formData),
    estimatedValue: estimateProjectValue(formData.subject),
    urgencyLevel: determineUrgency(formData),

    // Admin Management Fields (initialized for admin platform)
    responseRequired: true,
    responseDeadline: null,
    assignedTo: null,
    tags: [platform, dataType, formData.subject.toLowerCase().replace(/\s+/g, '_')],
    notes: [],
    followUpDate: null,

    // Compliance and Security
    ipAddress: null, // To be populated server-side if needed
    geoLocation: null, // To be populated server-side if needed
    dataRetentionDate: calculateRetentionDate(),
    encryptionStatus: 'standard',

    // Platform-specific metadata
    deviceInfo: getDeviceInfo(),
    browserInfo: getBrowserInfo(),
    screenResolution: getScreenResolution(),
    timezone: getTimezone(),
  };
};

/**
 * Utility functions for enhanced data collection
 */

// Generate session ID for tracking user journey
const generateSessionId = () => {
  if (typeof window !== 'undefined' && window.sessionStorage) {
    let sessionId = sessionStorage.getItem('presq_session_id');
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
      sessionStorage.setItem('presq_session_id', sessionId);
    }
    return sessionId;
  }
  return `session_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
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

// Calculate data retention date (7 years for business records)
const calculateRetentionDate = () => {
  const retentionDate = new Date();
  retentionDate.setFullYear(retentionDate.getFullYear() + 7);
  return Timestamp.fromDate(retentionDate);
};

// Get device information for analytics
const getDeviceInfo = () => {
  if (typeof navigator === 'undefined') return null;

  return {
    platform: navigator.platform,
    language: navigator.language,
    cookieEnabled: navigator.cookieEnabled,
    onLine: navigator.onLine,
  };
};

// Get browser information for analytics
const getBrowserInfo = () => {
  if (typeof navigator === 'undefined') return null;

  return {
    userAgent: navigator.userAgent,
    vendor: navigator.vendor,
    appName: navigator.appName,
    appVersion: navigator.appVersion,
  };
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
 * Saves contact form submission to Firebase Firestore
 * This is the ONLY write operation available on this platform
 *
 * @param {ContactFormData} formData - The validated form data
 * @param {string} platform - Platform identifier (default: 'website')
 * @param {string} dataType - Data type identifier (default: 'contact_form')
 * @returns {Promise<Object>} Result object with success status and data
 */
export const saveContactSubmission = async (
  formData,
  platform = DEFAULT_PLATFORM,
  dataType = DEFAULT_DATA_TYPE
) => {
  try {
    console.log('🚀 Starting contact form submission process...', { platform, dataType });

    // Validate form data
    const validation = validateContactForm(formData);
    if (!validation.isValid) {
      console.error('❌ Form validation failed:', validation.errors);
      return {
        success: false,
        error: 'Form validation failed',
        details: validation.errors,
      };
    }

    // Prepare data for storage
    const dataToStore = prepareDataForStorage(formData, platform, dataType);
    console.log('📝 Prepared data for storage:', {
      submissionId: dataToStore.submissionId,
      platform: dataToStore.platform,
      path: buildDbPath('contact_submissions', platform),
      leadScore: dataToStore.leadScore,
      customerSegment: dataToStore.customerSegment,
    });

    // Get collection reference with scalable path structure
    const contactCollection = getCollection('contact_submissions', platform);

    // Save to Firestore (WRITE-ONLY operation)
    const docRef = await addDoc(contactCollection, dataToStore);
    console.log('✅ Document written with ID:', docRef.id);

    // Log analytics event for tracking (separate collection)
    try {
      await logAnalyticsEvent('contact_form_submission', {
        platform,
        dataType,
        submissionId: dataToStore.submissionId,
        leadScore: dataToStore.leadScore,
        customerSegment: dataToStore.customerSegment,
        estimatedValue: dataToStore.estimatedValue,
        urgencyLevel: dataToStore.urgencyLevel,
      });
    } catch (analyticsError) {
      console.warn('⚠️ Analytics logging failed:', analyticsError);
    }

    console.log('✅ Contact form submission saved successfully');

    return {
      success: true,
      data: {
        submissionId: dataToStore.submissionId,
        platform,
        dataType,
        timestamp: new Date().toISOString(),
        leadScore: dataToStore.leadScore,
        customerSegment: dataToStore.customerSegment,
      },
      message: "Your message has been sent successfully! We'll respond within 24 hours.",
    };
  } catch (error) {
    console.error('❌ Error saving contact submission:', error);

    // Log error for admin monitoring (separate collection)
    try {
      await logError('contact_submission_error', error, { platform, dataType });
    } catch (logError) {
      console.warn('⚠️ Error logging failed:', logError);
    }

    const errorDetails = {
      message: error.message,
      code: error.code,
      timestamp: new Date().toISOString(),
      platform,
      dataType,
    };

    console.error('Error details:', errorDetails);

    return {
      success: false,
      error: 'Failed to save contact submission',
      details: errorDetails,
      message:
        'Sorry, there was an error sending your message. Please try again or contact us directly.',
    };
  }
};

/**
 * Analytics and logging functions (Write-only for admin platform monitoring)
 */

// Log analytics events for admin platform analysis
const logAnalyticsEvent = async (eventName, eventData) => {
  try {
    const analyticsCollection = getCollection('analytics', 'website');
    await addDoc(analyticsCollection, {
      eventName,
      eventData,
      timestamp: serverTimestamp(),
      createdAt: Timestamp.now(),
      sessionId: generateSessionId(),
      pageUrl: typeof window !== 'undefined' ? window.location.href : null,
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : null,
    });
    console.log('📊 Analytics event logged:', eventName);
  } catch (error) {
    console.warn('⚠️ Failed to log analytics event:', error);
  }
};

// Log errors for admin platform monitoring
const logError = async (errorType, error, context = {}) => {
  try {
    const errorCollection = getCollection('system_logs', 'error_logs');
    await addDoc(errorCollection, {
      errorType,
      message: error.message,
      stack: error.stack,
      context,
      timestamp: serverTimestamp(),
      createdAt: Timestamp.now(),
      sessionId: generateSessionId(),
      pageUrl: typeof window !== 'undefined' ? window.location.href : null,
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : null,
    });
    console.log('🚨 Error logged for admin monitoring:', errorType);
  } catch (logError) {
    console.warn('⚠️ Failed to log error:', logError);
  }
};

/**
 * Performance tracking for admin platform optimization
 */
export const trackFormPerformance = async performanceData => {
  try {
    const performanceCollection = getCollection('analytics', 'performance_metrics');
    await addDoc(performanceCollection, {
      ...performanceData,
      timestamp: serverTimestamp(),
      createdAt: Timestamp.now(),
      sessionId: generateSessionId(),
      pageUrl: typeof window !== 'undefined' ? window.location.href : null,
    });
    console.log('⚡ Performance data logged');
  } catch (error) {
    console.warn('⚠️ Failed to log performance data:', error);
  }
};

/**
 * User journey tracking for admin platform analysis
 */
export const trackUserJourney = async journeyData => {
  try {
    const journeyCollection = getCollection('analytics', 'user_journey');
    await addDoc(journeyCollection, {
      ...journeyData,
      timestamp: serverTimestamp(),
      createdAt: Timestamp.now(),
      sessionId: generateSessionId(),
    });
    console.log('🛤️ User journey tracked');
  } catch (error) {
    console.warn('⚠️ Failed to track user journey:', error);
  }
};

// Export platform and data type constants
export { PLATFORMS, DATA_TYPES, DEFAULT_PLATFORM, DEFAULT_DATA_TYPE };

// Note: This platform provides ONLY write operations
// All read, update, delete operations are handled by the separate admin platform
console.log('📝 Contact Service initialized in WRITE-ONLY mode');
console.log('🔒 Read/Edit operations are handled by the admin platform');
