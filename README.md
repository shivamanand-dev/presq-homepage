# PreSQ Innovation Website - Data Collection Platform

A modern, responsive website for PreSQ Innovation built with Next.js, featuring **write-only** Firebase integration for multi-platform data collection.

## 🎯 Platform Purpose

This is a **data collection platform** designed specifically for:

- ✅ **Contact form submissions**
- ✅ **Analytics tracking**
- ✅ **User journey monitoring**
- ✅ **Performance metrics collection**
- ❌ **NO read/edit/delete operations**

> **Important**: All data management, admin operations, and analytics viewing are handled by a separate admin platform.

## 🚀 Features

### Frontend

- **Modern Design**: Beautiful, production-ready design with Tailwind CSS
- **Responsive Layout**: Mobile-first approach with seamless device compatibility
- **Interactive Components**: Smooth animations and micro-interactions
- **Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation
- **Performance Optimized**: Fast loading times and optimized assets

### Write-Only Firebase Integration

- **Multi-Platform Data Collection**: Organized structure for website, mobile app, admin panel
- **Contact Form Management**: Complete form submission handling with Firebase Firestore
- **Real-time Data Storage**: Instant data synchronization and storage
- **Advanced Analytics Tracking**: Comprehensive user behavior and performance tracking
- **Data Validation**: Comprehensive client-side validation
- **Error Logging**: Robust error handling with admin monitoring

## 🛠️ Tech Stack

- **Framework**: Next.js 13.5.1
- **Styling**: Tailwind CSS
- **Database**: Firebase Firestore (Write-Only Structure)
- **Icons**: Lucide React
- **Animations**: CSS Transitions & Keyframes
- **Form Handling**: React Hooks with Firebase integration

## 📊 Scalable Database Structure

### Root Collection: `Presq`

```
Presq/
├── contact_submissions/          ← WRITE-ONLY: Form submissions
│   ├── website/
│   │   └── {submissionId}
│   ├── mobile_app/
│   │   └── {submissionId}
│   ├── admin_panel/
│   │   └── {submissionId}
│   └── landing_pages/
│       └── {submissionId}
├── analytics/                    ← WRITE-ONLY: Analytics data
│   ├── website_analytics/
│   ├── app_analytics/
│   ├── performance_metrics/
│   ├── conversion_tracking/
│   └── user_journey/
└── system_logs/                  ← WRITE-ONLY: Error & monitoring logs
    ├── error_logs/
    ├── activity_logs/
    ├── security_logs/
    └── performance_logs/
```

### Data Collection Benefits:

- **Scalability**: Easy to add new platforms and data types
- **Organization**: Clear separation of concerns
- **Performance**: Optimized for write operations
- **Analytics**: Comprehensive tracking for admin platform analysis
- **Security**: Write-only access prevents data tampering
- **Monitoring**: Built-in error logging and performance tracking

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd presq-innovation-website
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up Firebase**
   - Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Firestore Database
   - Copy your Firebase configuration

4. **Environment Setup**
   - Copy `.env.local.example` to `.env.local`
   - Replace the placeholder values with your actual Firebase configuration:

   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your-firebase-api-key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012
   NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:abcdef123456
   NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX

   # Company Configuration
   NEXT_PUBLIC_COMPANY_ID=Xaq4HIl4v4uD1rIMpUmD
   ```

5. **Run the development server**

   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔥 Firebase Setup Guide

### 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Follow the setup wizard

### 2. Enable Firestore

1. In your Firebase project, go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode" for development
4. Select a location for your database

### 3. Get Configuration

1. Go to Project Settings (gear icon)
2. Scroll down to "Your apps"
3. Click "Web" icon to add a web app
4. Copy the configuration object

### 4. Security Rules (Write-Only Platform)

For this write-only platform, update your Firestore security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Root collection access
    match /Presq/{document=**} {

      // Contact submissions - WRITE-ONLY for public forms
      match /contact_submissions/{platform}/{submissionId} {
        allow read: if false; // No read access on this platform
        allow write: if true; // Allow public form submissions
        allow update, delete: if false; // No edit/delete on this platform
      }

      // Analytics - WRITE-ONLY for tracking
      match /analytics/{platform}/{eventId} {
        allow read: if false; // No read access on this platform
        allow write: if true; // Allow analytics tracking
        allow update, delete: if false; // No edit/delete on this platform
      }

      // System logs - WRITE-ONLY for monitoring
      match /system_logs/{logType}/{logId} {
        allow read: if false; // No read access on this platform
        allow write: if true; // Allow error logging
        allow update, delete: if false; // No edit/delete on this platform
      }

      // Default deny all other operations
      allow read, write: if false;
    }
  }
}
```

## 📊 Enhanced Contact Form Features

### Data Collection Structure

Each contact submission includes:

- **Unique Identifiers**: Platform-specific submission IDs
- **Personal Information**: Name, email, phone, company
- **Inquiry Details**: Subject, message, preferred contact method
- **System Fields**: Timestamps, unique IDs, platform info
- **Business Intelligence**: Lead scoring, customer segmentation
- **Analytics**: UTM tracking, session data, conversion metrics
- **Device Information**: Browser, screen resolution, timezone
- **Compliance**: GDPR consent, data retention dates

### Advanced Tracking Features

- **Lead Scoring**: Automatic scoring (0-100) based on form data
- **Customer Segmentation**: Business vs individual classification
- **UTM Tracking**: Complete campaign and source attribution
- **Session Tracking**: User journey analysis across pages
- **Performance Monitoring**: Form completion times and errors
- **Device Analytics**: Browser, screen, and device information

### Database Schema Example

```javascript
{
  // Identifiers
  submissionId: "website_contact_form_1234567890_abc123",
  platform: "website",
  dataType: "contact_form",

  // Personal Data
  firstName: "John",
  lastName: "Doe",
  fullName: "John Doe",
  email: "john@example.com",
  phone: "1234567890",
  countryCode: "+1",
  company: "Example Corp",

  // Inquiry
  subject: "Web Development",
  message: "I need a website...",
  contactMethod: "email",
  bestTime: "Morning (9 AM - 12 PM)",

  // Business Intelligence (for admin platform)
  leadScore: 85,
  customerSegment: "business",
  estimatedValue: "high",
  urgencyLevel: "medium",

  // Analytics & Tracking
  sessionId: "session_1234567890_xyz789",
  utmSource: "google",
  utmMedium: "cpc",
  utmCampaign: "web-development",
  pageUrl: "https://presq.co.in/contact",
  referrer: "https://google.com",

  // Device Information
  deviceInfo: { platform: "Win32", language: "en-US" },
  browserInfo: { userAgent: "...", vendor: "Google Inc." },
  screenResolution: { width: 1920, height: 1080 },
  timezone: "Asia/Kolkata",

  // System (for admin platform management)
  createdAt: Timestamp,
  updatedAt: Timestamp,
  isRead: false,
  status: "new",
  priority: "normal",

  // Compliance
  gdprConsent: true,
  privacyPolicyVersion: "1.0",
  dataRetentionDate: Timestamp
}
```

## 🎨 Multi-Platform Data Collection

### Website Contact Form

```javascript
import { saveContactSubmission } from '@/lib/contactService';

// Save website contact form (default)
await saveContactSubmission(formData);
```

### Mobile App Integration

```javascript
import { saveContactSubmission, PLATFORMS, DATA_TYPES } from '@/lib/contactService';

// Save mobile app contact form
await saveContactSubmission(formData, PLATFORMS.MOBILE_APP, DATA_TYPES.CONTACT_FORM);
```

### Landing Page Leads

```javascript
// Save landing page lead
await saveContactSubmission(formData, PLATFORMS.LANDING_PAGE, DATA_TYPES.QUOTE_REQUEST);
```

## 📈 Analytics and Performance Tracking

### Built-in Analytics Collection

- **Form Conversion Rates**: Track submission success rates
- **Lead Quality Scoring**: Automatic lead qualification
- **Source Attribution**: Complete UTM and referrer tracking
- **User Journey**: Session-based behavior analysis
- **Performance Metrics**: Form completion times and error rates
- **Device Analytics**: Browser, screen, and platform information

### Performance Tracking

```javascript
import { trackFormPerformance } from '@/lib/contactService';

// Track form performance metrics
await trackFormPerformance({
  formLoadTime: 1200,
  formCompletionTime: 45000,
  fieldErrors: ['email'],
  abandonmentPoint: null,
});
```

### User Journey Tracking

```javascript
import { trackUserJourney } from '@/lib/contactService';

// Track user journey events
await trackUserJourney({
  event: 'form_started',
  page: '/contact',
  timestamp: Date.now(),
  sessionDuration: 120000,
});
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Firebase Hosting

```bash
npm install -g firebase-tools
firebase login
firebase init hosting
npm run build
firebase deploy
```

## 🔧 Development

### Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run start`: Start production server
- `npm run lint`: Run ESLint

### Available Operations (Write-Only)

✅ **Allowed Operations:**

- `saveContactSubmission()` - Save contact form data
- `trackFormPerformance()` - Log performance metrics
- `trackUserJourney()` - Track user behavior
- Analytics event logging
- Error logging

❌ **Not Available (Admin Platform Only):**

- Reading contact submissions
- Updating submission status
- Deleting submissions
- User management
- Data analytics viewing

### Adding New Platforms

1. Add platform constant to `lib/firebase.js`
2. Update database paths in `DB_PATHS`
3. Use new platform in `saveContactSubmission()`

## 🔒 Security & Compliance

### Write-Only Security

- **No Read Access**: This platform cannot read existing data
- **No Edit Access**: Cannot modify or delete existing submissions
- **Write-Only Permissions**: Only allows new data creation
- **Validation**: All data validated before storage
- **Error Logging**: Comprehensive error tracking for monitoring

### GDPR Compliance

- **Consent Tracking**: Records user consent and policy version
- **Data Retention**: Automatic retention date calculation
- **Privacy Controls**: Built-in privacy policy compliance
- **Data Minimization**: Only collects necessary information

## 🐛 Troubleshooting

### Common Issues

1. **Firebase Connection Error**
   - Verify environment variables are correct
   - Check Firebase project settings
   - Ensure Firestore is enabled

2. **Write Permission Denied**
   - Check Firebase security rules
   - Verify collection paths are correct
   - Ensure write permissions are enabled

3. **Form Submission Fails**
   - Check browser console for errors
   - Verify form validation
   - Check network connectivity

### Debug Mode

Enable debug logging by setting:

```env
NEXT_PUBLIC_DEBUG=true
```

## 📄 License

This project is proprietary software owned by PreSQ Innovation.

## 🤝 Support

For technical support or questions:

- Email: admin@presq.co.in
- Phone: +91 8448334698

---

**Note**: This is a data collection platform only. All data management and analytics viewing are handled by the separate PreSQ Innovation Admin Platform.

Built with ❤️ by PreSQ Innovation
