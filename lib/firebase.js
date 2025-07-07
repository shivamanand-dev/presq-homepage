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
 * Database Structure Configuration - Simplified Structure
 *
 * New simplified structure for PreSQ Innovation:
 *
 * Root Collection: "Presq"
 * ├── contact_submissions/        ← All contact submissions (flat structure)
 * │   └── {documentId}           ← Auto-generated document IDs
 * ├── analytics/                 ← Analytics and tracking data
 * │   └── {documentId}
 * └── system_logs/               ← Error logs and monitoring
 *     └── {documentId}
 *
 * Required fields for contact_submissions:
 * - companyId: "Xaq4HIl4v4uD1rIMpUmD"
 * - source: "website" | "mobile_app" | "admin_panel" | etc.
 * - status: "new" | "in_progress" | "responded" | "closed"
 * - fullName: string
 * - email: string
 * - message: string
 * - createdAt: Timestamp (auto)
 * - updatedAt: Timestamp (auto)
 */

// Simplified database paths
export const DB_PATHS = {
  ROOT: 'Presq',
  CONTACT_SUBMISSIONS: 'contact_submissions',
  ANALYTICS: 'analytics',
  SYSTEM_LOGS: 'system_logs',
};

// Source identifiers (replaces platform concept)
export const SOURCES = {
  WEBSITE: 'website',
  MOBILE_APP: 'mobile_app',
  ADMIN_PANEL: 'admin_panel',
  LANDING_PAGE: 'landing_page',
  SOCIAL_MEDIA: 'social_media',
  API: 'api',
};

// Status options for contact submissions
export const STATUSES = {
  NEW: 'new',
  IN_PROGRESS: 'in_progress',
  RESPONDED: 'responded',
  CLOSED: 'closed',
};

// Company ID for PreSQ Innovation (from environment variable)
export const COMPANY_ID = process.env.NEXT_PUBLIC_COMPANY_ID || 'Xaq4HIl4v4uD1rIMpUmD';

// Priority levels
export const PRIORITIES = {
  LOW: 'low',
  NORMAL: 'normal',
  MEDIUM: 'medium',
  HIGH: 'high',
};

/**
 * Get collection reference for simplified structure
 * @param {string} collectionName - Collection name (contact_submissions, analytics, system_logs)
 * @returns {CollectionReference} Firestore collection reference
 */
export const getCollection = collectionName => {
  return collection(db, DB_PATHS.ROOT, collectionName);
};

/**
 * Get document reference for simplified structure
 * @param {string} collectionName - Collection name
 * @param {string} documentId - Document ID
 * @returns {DocumentReference} Firestore document reference
 */
export const getDocument = (collectionName, documentId) => {
  return doc(db, DB_PATHS.ROOT, collectionName, documentId);
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
    const testDoc = doc(db, DB_PATHS.ROOT, 'system_logs', 'health-check');
    const { getDoc } = await import('firebase/firestore');
    await getDoc(testDoc);
    return { status: 'connected', timestamp: new Date().toISOString() };
  } catch (error) {
    console.error('Firebase connection check failed:', error);
    return { status: 'error', error: error.message, timestamp: new Date().toISOString() };
  }
};
