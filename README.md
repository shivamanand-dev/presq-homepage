# PreSQ Innovation Website

A modern, responsive website for PreSQ Innovation built with Next.js, featuring scalable Firebase integration for multi-platform data management.

## 🚀 Features

### Frontend

- **Modern Design**: Beautiful, production-ready design with Tailwind CSS
- **Responsive Layout**: Mobile-first approach with seamless device compatibility
- **Interactive Components**: Smooth animations and micro-interactions
- **Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation
- **Performance Optimized**: Fast loading times and optimized assets

### Scalable Firebase Integration

- **Multi-Platform Support**: Organized data structure for website, mobile app, admin panel
- **Contact Form Management**: Complete form submission handling with Firebase Firestore
- **Real-time Database**: Instant data synchronization and storage
- **Advanced Analytics**: Comprehensive tracking and business intelligence
- **Data Validation**: Comprehensive client and server-side validation
- **Error Handling**: Robust error handling with user-friendly messages

## 🛠️ Tech Stack

- **Framework**: Next.js 13.5.1
- **Styling**: Tailwind CSS
- **Database**: Firebase Firestore (Scalable Structure)
- **Icons**: Lucide React
- **Animations**: CSS Transitions & Keyframes
- **Form Handling**: React Hooks with Firebase integration

## 📊 Scalable Database Structure

### Root Collection: `Presq`

```
Presq/
├── contact_submissions/
│   ├── website/
│   │   └── {submissionId}
│   ├── mobile_app/
│   │   └── {submissionId}
│   ├── admin_panel/
│   │   └── {submissionId}
│   └── landing_pages/
│       └── {submissionId}
├── user_data/
│   ├── website_users/
│   ├── app_users/
│   └── admin_users/
├── analytics/
│   ├── website_analytics/
│   ├── app_analytics/
│   ├── performance_metrics/
│   └── conversion_tracking/
├── content_management/
│   ├── blog_posts/
│   ├── portfolio_items/
│   ├── service_pages/
│   └── testimonials/
├── business_data/
│   ├── leads/
│   ├── customers/
│   ├── projects/
│   └── invoices/
└── system_logs/
    ├── error_logs/
    ├── activity_logs/
    ├── security_logs/
    └── performance_logs/
```

### Benefits of This Structure:

- **Scalability**: Easy to add new platforms and data types
- **Organization**: Clear separation of concerns
- **Performance**: Optimized queries with proper indexing
- **Security**: Granular security rules per collection
- **Analytics**: Built-in tracking and monitoring
- **Maintenance**: Easy to backup and manage specific data types

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

### 4. Security Rules (Production)

For production, update your Firestore security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Root collection access
    match /Presq/{document=**} {
      // Contact submissions - allow write for new submissions
      match /contact_submissions/{platform}/{submissionId} {
        allow read: if request.auth != null; // Admin access only
        allow write: if true; // Allow public form submissions
      }

      // Analytics - allow write for tracking
      match /analytics/{platform}/{eventId} {
        allow read: if request.auth != null;
        allow write: if true;
      }

      // System logs - admin only
      match /system_logs/{logType}/{logId} {
        allow read, write: if request.auth != null &&
          request.auth.token.admin == true;
      }

      // Business data - admin only
      match /business_data/{dataType}/{documentId} {
        allow read, write: if request.auth != null &&
          request.auth.token.admin == true;
      }

      // Default deny
      allow read, write: if false;
    }
  }
}
```

## 📊 Enhanced Contact Form Features

### Data Structure

Each contact submission includes:

- **Unique Identifiers**: Platform-specific submission IDs
- **Personal Information**: Name, email, phone, company
- **Inquiry Details**: Subject, message, preferred contact method
- **System Fields**: Timestamps, unique IDs, read status, platform info
- **Business Intelligence**: Lead scoring, customer segmentation
- **Analytics**: UTM tracking, session data, conversion metrics
- **Compliance**: GDPR consent, data retention dates

### Advanced Features

- **Lead Scoring**: Automatic scoring based on form data
- **Customer Segmentation**: Business vs individual classification
- **UTM Tracking**: Campaign and source attribution
- **Session Tracking**: User journey analysis
- **Geo-location**: IP-based location tracking (server-side)
- **A/B Testing**: Form variant performance tracking

### Database Schema Example

```javascript
{
  // Identifiers
  submissionId: "website_contact_form_1234567890_abc123",
  platform: "website",
  dataType: "contact_form",
  firestoreId: "auto-generated-id",

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

  // Business Intelligence
  leadScore: 85,
  customerSegment: "business",
  estimatedValue: "high",

  // Analytics
  sessionId: "session_1234567890_xyz789",
  utmSource: "google",
  utmMedium: "cpc",
  utmCampaign: "web-development",
  pageUrl: "https://presq.co.in/contact",
  referrer: "https://google.com",

  // System
  createdAt: Timestamp,
  updatedAt: Timestamp,
  isRead: false,
  status: "new",
  priority: "normal",
  tags: ["website", "contact_form", "web_development"],

  // Compliance
  gdprConsent: true,
  privacyPolicyVersion: "1.0",
  dataRetentionDate: Timestamp,
  encryptionStatus: "standard"
}
```

## 🎨 Multi-Platform Usage

### Website Contact Form

```javascript
import { saveContactSubmission, PLATFORMS, DATA_TYPES } from '@/lib/contactService';

// Save website contact form
await saveContactSubmission(formData, PLATFORMS.WEBSITE, DATA_TYPES.CONTACT_FORM);
```

### Mobile App Integration

```javascript
// Save mobile app contact form
await saveContactSubmission(formData, PLATFORMS.MOBILE_APP, DATA_TYPES.CONTACT_FORM);
```

### Admin Panel

```javascript
// Save admin panel inquiry
await saveContactSubmission(formData, PLATFORMS.ADMIN_PANEL, DATA_TYPES.SUPPORT_TICKET);
```

### Landing Page

```javascript
// Save landing page lead
await saveContactSubmission(formData, PLATFORMS.LANDING_PAGE, DATA_TYPES.QUOTE_REQUEST);
```

## 📈 Analytics and Reporting

### Built-in Analytics

- **Form Conversion Rates**: Track submission success rates
- **Lead Quality Scoring**: Automatic lead qualification
- **Source Attribution**: UTM and referrer tracking
- **User Journey**: Session-based behavior analysis
- **Performance Metrics**: Form completion times and drop-off points

### Custom Queries

```javascript
// Get high-value leads from website
const highValueLeads = await getContactSubmissions({
  platform: PLATFORMS.WEBSITE,
  filters: { leadScore: { '>=': 80 } },
});

// Get unread mobile app submissions
const unreadMobile = await getContactSubmissions({
  platform: PLATFORMS.MOBILE_APP,
  unreadOnly: true,
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

### Adding New Platforms

1. Add platform constant to `lib/firebase.js`
2. Update database paths in `DB_PATHS`
3. Create platform-specific collection
4. Update security rules

### Adding New Data Types

1. Add data type to `DATA_TYPES` in `lib/firebase.js`
2. Update form validation if needed
3. Create specific handlers in `contactService.js`

## 🐛 Troubleshooting

### Common Issues

1. **Firebase Connection Error**
   - Verify environment variables are correct
   - Check Firebase project settings
   - Ensure Firestore is enabled

2. **Path Structure Issues**
   - Verify collection paths in Firebase console
   - Check security rules for proper access
   - Ensure platform constants are correct

3. **Form Submission Fails**
   - Check browser console for errors
   - Verify Firebase security rules
   - Test with Firebase emulator

## 📄 License

This project is proprietary software owned by PreSQ Innovation.

## 🤝 Support

For technical support or questions:

- Email: admin@presq.co.in
- Phone: +91 8448334698

---

Built with ❤️ by PreSQ Innovation
