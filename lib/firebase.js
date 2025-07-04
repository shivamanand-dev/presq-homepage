/**
 * Firebase Configuration and Initialization
 *
 * This file sets up Firebase for the multi-platform data management system.
 * It includes configuration for Firestore database with scalable structure
 * and provides utility functions for database operations.
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator, collection, doc } from 'firebase/firestore';
import { getAnalytics, isSupported } from 'firebase/analytics';

// Firebase configuration object
// Replace these values with your actual Firebase project configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'your-api-key-here',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'your-project.firebaseapp.com',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'your-project-id',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'your-project.appspot.com',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '123456789',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '1:123456789:web:abcdef123456',
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || 'G-XXXXXXXXXX',
};

// Initialize Firebase app
let app;
try {
  app = initializeApp(firebaseConfig);
  console.log('✅ Firebase initialized successfully');
} catch (error) {
  console.error('❌ Firebase initialization error:', error);
  throw new Error('Failed to initialize Firebase. Please check your configuration.');
}

// Initialize Firestore
let db;
try {
  db = getFirestore(app);

  // Connect to Firestore emulator in development (optional)
  if (
    process.env.NODE_ENV === 'development' &&
    process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATOR === 'true'
  ) {
    try {
      connectFirestoreEmulator(db, 'localhost', 8080);
      console.log('🔧 Connected to Firestore emulator');
    } catch (emulatorError) {
      console.warn('⚠️ Firestore emulator connection failed:', emulatorError.message);
    }
  }

  console.log('✅ Firestore initialized successfully');
} catch (error) {
  console.error('❌ Firestore initialization error:', error);
  throw new Error('Failed to initialize Firestore database.');
}

// Initialize Analytics (optional, only in browser environment)
let analytics = null;
if (typeof window !== 'undefined') {
  isSupported()
    .then(supported => {
      if (supported) {
        analytics = getAnalytics(app);
        console.log('✅ Firebase Analytics initialized');
      }
    })
    .catch(error => {
      console.warn('⚠️ Firebase Analytics initialization failed:', error);
    });
}

/**
 * Database Structure Configuration
 *
 * Scalable path structure for multi-platform data management:
 *
 * Root Collection: "Presq"
 * ├── contact_submissions/
 * │   ├── website/
 * │   │   └── {submissionId}
 * │   ├── mobile_app/
 * │   │   └── {submissionId}
 * │   └── admin_panel/
 * │       └── {submissionId}
 * ├── user_data/
 * │   ├── website_users/
 * │   ├── app_users/
 * │   └── admin_users/
 * ├── analytics/
 * │   ├── website_analytics/
 * │   ├── app_analytics/
 * │   └── performance_metrics/
 * ├── content_management/
 * │   ├── blog_posts/
 * │   ├── portfolio_items/
 * │   └── service_pages/
 * └── system_logs/
 *     ├── error_logs/
 *     ├── activity_logs/
 *     └── security_logs/
 */

// Database path constants for better maintainability
export const DB_PATHS = {
  // Root collection
  ROOT: 'Presq',

  // Contact submissions by platform
  CONTACT_SUBMISSIONS: {
    BASE: 'contact_submissions',
    WEBSITE: 'contact_submissions/website',
    MOBILE_APP: 'contact_submissions/mobile_app',
    ADMIN_PANEL: 'contact_submissions/admin_panel',
    LANDING_PAGES: 'contact_submissions/landing_pages',
  },

  // User data by platform
  USER_DATA: {
    BASE: 'user_data',
    WEBSITE_USERS: 'user_data/website_users',
    APP_USERS: 'user_data/app_users',
    ADMIN_USERS: 'user_data/admin_users',
  },

  // Analytics and metrics
  ANALYTICS: {
    BASE: 'analytics',
    WEBSITE: 'analytics/website_analytics',
    MOBILE_APP: 'analytics/app_analytics',
    PERFORMANCE: 'analytics/performance_metrics',
    CONVERSION: 'analytics/conversion_tracking',
  },

  // Content management
  CONTENT: {
    BASE: 'content_management',
    BLOG_POSTS: 'content_management/blog_posts',
    PORTFOLIO: 'content_management/portfolio_items',
    SERVICES: 'content_management/service_pages',
    TESTIMONIALS: 'content_management/testimonials',
  },

  // System logs and monitoring
  SYSTEM: {
    BASE: 'system_logs',
    ERROR_LOGS: 'system_logs/error_logs',
    ACTIVITY_LOGS: 'system_logs/activity_logs',
    SECURITY_LOGS: 'system_logs/security_logs',
    PERFORMANCE_LOGS: 'system_logs/performance_logs',
  },

  // Business data
  BUSINESS: {
    BASE: 'business_data',
    LEADS: 'business_data/leads',
    CUSTOMERS: 'business_data/customers',
    PROJECTS: 'business_data/projects',
    INVOICES: 'business_data/invoices',
  },
};

// Platform identifiers
export const PLATFORMS = {
  WEBSITE: 'website',
  MOBILE_APP: 'mobile_app',
  ADMIN_PANEL: 'admin_panel',
  LANDING_PAGE: 'landing_page',
  SOCIAL_MEDIA: 'social_media',
};

// Data types for better organization
export const DATA_TYPES = {
  CONTACT_FORM: 'contact_form',
  NEWSLETTER_SIGNUP: 'newsletter_signup',
  QUOTE_REQUEST: 'quote_request',
  SUPPORT_TICKET: 'support_ticket',
  FEEDBACK: 'feedback',
  CONSULTATION_REQUEST: 'consultation_request',
};

/**
 * Utility function to build database paths
 * @param {string} category - Main category (e.g., 'contact_submissions')
 * @param {string} platform - Platform identifier (e.g., 'website')
 * @param {string} subcategory - Optional subcategory
 * @returns {string} Complete Firestore path
 */
export const buildDbPath = (category, platform, subcategory = null) => {
  let path = `${DB_PATHS.ROOT}/${category}/${platform}`;
  if (subcategory) {
    path += `/${subcategory}`;
  }
  return path;
};

/**
 * Get collection reference with proper path structure
 * @param {string} category - Main category
 * @param {string} platform - Platform identifier
 * @param {string} subcategory - Optional subcategory
 * @returns {CollectionReference} Firestore collection reference
 */
export const getCollection = (category, platform, subcategory = null) => {
  const path = buildDbPath(category, platform, subcategory);
  return collection(db, path);
};

/**
 * Get document reference with proper path structure
 * @param {string} category - Main category
 * @param {string} platform - Platform identifier
 * @param {string} documentId - Document ID
 * @param {string} subcategory - Optional subcategory
 * @returns {DocumentReference} Firestore document reference
 */
export const getDocument = (category, platform, documentId, subcategory = null) => {
  const path = buildDbPath(category, platform, subcategory);
  return doc(db, path, documentId);
};

// Export Firebase services
export { app, db, analytics };

// Export configuration for debugging
export const getFirebaseConfig = () => {
  return {
    projectId: firebaseConfig.projectId,
    authDomain: firebaseConfig.authDomain,
    // Don't expose sensitive keys in production
    isConfigured: !!(firebaseConfig.apiKey && firebaseConfig.projectId),
  };
};

// Health check function
export const checkFirebaseConnection = async () => {
  try {
    // Simple test to verify Firestore connection
    const testDoc = doc(db, DB_PATHS.ROOT, 'health-check');
    const { getDoc } = await import('firebase/firestore');
    await getDoc(testDoc);
    return { status: 'connected', timestamp: new Date().toISOString() };
  } catch (error) {
    console.error('Firebase connection check failed:', error);
    return { status: 'error', error: error.message, timestamp: new Date().toISOString() };
  }
};
