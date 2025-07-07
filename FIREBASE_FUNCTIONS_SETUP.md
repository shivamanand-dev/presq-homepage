# Firebase Cloud Functions Email Setup Guide

This guide will help you set up Firebase Cloud Functions to automatically send email notifications when contact forms are submitted.

## 🚀 Quick Setup

### 1. Initialize Firebase Functions

```bash
# Install Firebase CLI globally
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize functions in your project
firebase init functions
```

### 2. Install Dependencies

```bash
cd functions
npm install
```

### 3. Configure Email Service

#### Option A: Zoho Mail (Recommended for Business)

1. **Set up Zoho Mail account** with your domain
2. **Configure SMTP settings** in Zoho Mail
3. **Set Firebase Config**:

```bash
firebase functions:config:set email.service="zoho"
firebase functions:config:set email.host="smtppro.zoho.in"
firebase functions:config:set email.port="587"
firebase functions:config:set email.user="your-email@yourdomain.com"
firebase functions:config:set email.password="your-zoho-password"
firebase functions:config:set email.admin_email="contact@presq.co.in"
```

#### Option B: Gmail (Alternative)

```bash
firebase functions:config:set email.service="gmail"
firebase functions:config:set email.host="smtp.gmail.com"
firebase functions:config:set email.port="587"
firebase functions:config:set email.user="your-email@gmail.com"
firebase functions:config:set email.password="your-app-password"
firebase functions:config:set email.admin_email="contact@presq.co.in"
```

### 4. Deploy Functions

```bash
# Deploy all functions
firebase deploy --only functions

# Deploy specific function
firebase deploy --only functions:sendContactNotificationEmails
```

## 🔧 JavaScript Setup (No TypeScript Compilation)

The functions are now written in JavaScript, which means:

- **No build step required** - Deploy directly
- **Faster development** - No TypeScript compilation
- **Simpler debugging** - Direct JavaScript execution
- **Easier maintenance** - Standard JavaScript syntax

### Quick Start Commands

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login and initialize
firebase login
firebase init functions

# Choose JavaScript (not TypeScript) when prompted

# Install dependencies
cd functions && npm install

# Configure email
firebase functions:config:set email.user="your-email@gmail.com"
firebase functions:config:set email.password="your-app-password"
firebase functions:config:set email.admin_email="contact@presq.co.in"

# Deploy immediately (no build step needed)
firebase deploy --only functions
```

## 📧 Email Templates

### Admin Notification Email Features:

- **Priority-based styling** (High/Medium/Normal/Low)
- **Business intelligence metrics** (Lead score, estimated value)
- **Complete contact information**
- **UTM tracking data**
- **Direct link to admin panel**
- **Mobile-responsive design**

### Customer Confirmation Email Features:

- **Personalized greeting**
- **Clear next steps**
- **Contact information**
- **Company branding**
- **Social media links**
- **Professional design**

## 🔧 Configuration Options

### Environment Variables

```bash
# Required
firebase functions:config:set email.user="your-email@domain.com"
firebase functions:config:set email.password="your-password"
firebase functions:config:set email.admin_email="contact@presq.co.in"

# Optional
firebase functions:config:set email.cc_emails="manager@presq.co.in,support@presq.co.in"
firebase functions:config:set email.host="smtp.gmail.com"
firebase functions:config:set email.port="587"
firebase functions:config:set email.secure="false"
```

### View Current Configuration

```bash
firebase functions:config:get
```

## 🎯 Function Triggers

### 1. Automatic Email Sending

- **Trigger**: New document in `Presq/contact_submissions/{platform}/{submissionId}`
- **Function**: `sendContactNotificationEmails`
- **Emails Sent**:
  - Admin notification (with business intelligence)
  - Customer confirmation (with next steps)

### 2. Manual Email Resending

- **Trigger**: HTTPS callable function
- **Function**: `resendContactEmails`
- **Usage**: From admin panel to resend failed emails
- **Parameters**:
  ```javascript
  {
    submissionId: "website_contact_form_123456",
    emailType: "both" // "admin", "customer", or "both"
  }
  ```

### 3. Health Check

- **Trigger**: HTTPS request
- **Function**: `emailSystemHealthCheck`
- **URL**: `https://us-central1-your-project.cloudfunctions.net/emailSystemHealthCheck`
- **Usage**: Monitor email system status

## 📊 Email Analytics

Each email sent updates the submission document with:

```javascript
{
  emailNotifications: {
    adminEmailSent: true,
    customerEmailSent: true,
    sentAt: Timestamp,
    adminMessageId: "message-id-123",
    customerMessageId: "message-id-456"
  }
}
```

## 🔒 Security Features

### Authentication

- Admin functions require authenticated users with `admin` token
- Public functions (email sending) are triggered by database changes
- CORS protection for allowed origins

### Data Protection

- Email credentials stored in Firebase environment config
- No sensitive data in function code
- Error logging for monitoring

## 🚨 Error Handling

### Automatic Error Logging

- Failed emails logged to `Presq/system_logs/error_logs`
- Includes error details, stack trace, and submission ID
- Admin panel can monitor and retry failed emails

### Retry Mechanism

- Manual retry via admin panel
- Automatic retry for transient failures
- Email status tracking in submission documents

## 📱 Testing

### Local Development

```bash
# Start Firebase emulators
firebase emulators:start

# Test functions locally
firebase functions:shell
```

### Test Email Sending

```javascript
// In Firebase Functions shell
sendContactNotificationEmails({
  data: () => ({
    firstName: 'Test',
    lastName: 'User',
    email: 'test@example.com',
    // ... other fields
  }),
});
```

## 🔧 Troubleshooting

### Common Issues

1. **"Permission denied" error**
   - Check Firebase security rules
   - Verify admin authentication tokens

2. **"Invalid login" for Gmail**
   - Enable 2-Factor Authentication
   - Use App Password, not regular password
   - Check email/password configuration

3. **Function timeout**
   - Increase timeout in function configuration
   - Optimize email template size
   - Check email service response time

4. **Emails not sending**
   - Check function logs: `firebase functions:log`
   - Verify email configuration: `firebase functions:config:get`
   - Test email service connectivity

### Debug Commands

```bash
# View function logs
firebase functions:log

# View specific function logs
firebase functions:log --only sendContactNotificationEmails

# Check configuration
firebase functions:config:get

# Test function locally
firebase emulators:start --only functions
```

## 📈 Monitoring

### Firebase Console

- Monitor function executions
- View error rates and performance
- Check billing usage

### Email Metrics

- Track delivery rates
- Monitor bounce rates
- Analyze response times

### Admin Panel Integration

- View email status in contact submissions
- Retry failed emails
- Monitor system health

## 🔄 Maintenance

### Regular Tasks

1. **Monitor email delivery rates**
2. **Check error logs weekly**
3. **Update email templates as needed**
4. **Review and rotate email credentials**
5. **Monitor Firebase billing**

### Updates

- Keep Firebase Functions SDK updated
- Update Nodemailer for security patches
- Review and update email templates
- Monitor email service provider changes

## 📞 Support

For issues with email setup:

- Check Firebase Console logs
- Review email service provider documentation
- Contact PreSQ Innovation support: contact@presq.co.in

---

**Note**: This email system integrates seamlessly with your existing contact form and admin platform, providing automated notifications and professional customer communication.
