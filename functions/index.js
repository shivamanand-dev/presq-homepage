/**
 * Firebase Cloud Functions for PreSQ Innovation
 * Email Notification System for Contact Form Submissions
 */

const { onDocumentCreated } = require('firebase-functions/v2/firestore');
const { onCall } = require('firebase-functions/v2/https');
const { onRequest } = require('firebase-functions/v2/https');
const { initializeApp } = require('firebase-admin/app');
const { getFirestore, FieldValue } = require('firebase-admin/firestore');
const nodemailer = require('nodemailer');

// Initialize Firebase Admin SDK
initializeApp();
const db = getFirestore();

/**
 * Email transporter configuration
 * Uses Zoho SMTP configuration
 */
const createEmailTransporter = () => {
  const emailConfig = {
    host: process.env.EMAIL_HOST || 'smtppro.zoho.in',
    port: parseInt(process.env.EMAIL_PORT || '587'),
    secure: false, // Use STARTTLS
    requireTLS: true,
    auth: {
      user: process.env.EMAIL_USER || '',
      pass: process.env.EMAIL_PASSWORD || '', // Zoho email password
    },
  };

  return nodemailer.createTransporter(emailConfig);
};

/**
 * Generate admin notification email HTML template
 */
const generateAdminEmailTemplate = submission => {
  const urgencyColors = {
    high: '#ef4444',
    medium: '#f59e0b',
    normal: '#10b981',
    low: '#6b7280',
  };

  const valueColors = {
    high: '#059669',
    medium: '#d97706',
    low: '#6b7280',
  };

  const urgencyColor = urgencyColors[submission.urgencyLevel] || '#6b7280';
  const valueColor = valueColors[submission.estimatedValue] || '#6b7280';

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Contact Form Submission - PreSQ Innovation</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f8fafc; }
        .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); }
        .header { background: linear-gradient(135deg, #3b82f6, #8b5cf6); color: white; padding: 30px; text-align: center; }
        .header h1 { margin: 0; font-size: 24px; font-weight: 700; }
        .header p { margin: 8px 0 0; opacity: 0.9; }
        .content { padding: 30px; }
        .priority-badge { display: inline-block; padding: 6px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; text-transform: uppercase; margin-bottom: 20px; }
        .section { margin-bottom: 25px; }
        .section h3 { color: #1f2937; margin: 0 0 12px; font-size: 16px; font-weight: 600; border-bottom: 2px solid #e5e7eb; padding-bottom: 8px; }
        .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 15px; }
        .info-item { background: #f8fafc; padding: 12px; border-radius: 8px; border-left: 3px solid #3b82f6; }
        .info-label { font-size: 12px; color: #6b7280; text-transform: uppercase; font-weight: 600; margin-bottom: 4px; }
        .info-value { color: #1f2937; font-weight: 500; }
        .message-box { background: #f8fafc; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin: 15px 0; }
        .analytics-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 12px; margin: 15px 0; }
        .metric { text-align: center; background: #f8fafc; padding: 15px; border-radius: 8px; border: 1px solid #e5e7eb; }
        .metric-value { font-size: 20px; font-weight: 700; color: #1f2937; margin-bottom: 4px; }
        .metric-label { font-size: 12px; color: #6b7280; text-transform: uppercase; }
        .cta-section { background: linear-gradient(135deg, #3b82f6, #8b5cf6); color: white; padding: 25px; text-align: center; margin-top: 30px; border-radius: 8px; }
        .cta-button { display: inline-block; background: white; color: #3b82f6; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 600; margin-top: 15px; }
        .footer { background: #f8fafc; padding: 20px; text-align: center; color: #6b7280; font-size: 14px; border-top: 1px solid #e5e7eb; }
        @media (max-width: 600px) {
          .info-grid { grid-template-columns: 1fr; }
          .analytics-grid { grid-template-columns: 1fr 1fr; }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <!-- Header -->
        <div class="header">
          <h1>🚀 New Contact Submission</h1>
          <p>PreSQ Innovation Admin Notification</p>
        </div>

        <!-- Content -->
        <div class="content">
          <!-- Priority Badge -->
          <div class="priority-badge" style="background-color: ${urgencyColor}; color: white;">
            ${submission.urgencyLevel.toUpperCase()} PRIORITY
          </div>

          <!-- Contact Information -->
          <div class="section">
            <h3>👤 Contact Information</h3>
            <div class="info-grid">
              <div class="info-item">
                <div class="info-label">Full Name</div>
                <div class="info-value">${submission.fullName}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Email</div>
                <div class="info-value">${submission.email}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Phone</div>
                <div class="info-value">${submission.countryCode} ${submission.phone}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Company</div>
                <div class="info-value">${submission.company || 'Not provided'}</div>
              </div>
            </div>
          </div>

          <!-- Inquiry Details -->
          <div class="section">
            <h3>💼 Inquiry Details</h3>
            <div class="info-grid">
              <div class="info-item">
                <div class="info-label">Subject</div>
                <div class="info-value">${submission.subject}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Preferred Contact</div>
                <div class="info-value">${submission.contactMethod} (${submission.bestTime})</div>
              </div>
            </div>
            <div class="message-box">
              <div class="info-label">Message</div>
              <div class="info-value">${submission.message}</div>
            </div>
          </div>

          <!-- Business Intelligence -->
          <div class="section">
            <h3>📊 Business Intelligence</h3>
            <div class="analytics-grid">
              <div class="metric">
                <div class="metric-value" style="color: #3b82f6;">${submission.leadScore}</div>
                <div class="metric-label">Lead Score</div>
              </div>
              <div class="metric">
                <div class="metric-value" style="color: ${valueColor};">${submission.estimatedValue.toUpperCase()}</div>
                <div class="metric-label">Est. Value</div>
              </div>
              <div class="metric">
                <div class="metric-value" style="color: #8b5cf6;">${submission.customerSegment.toUpperCase()}</div>
                <div class="metric-label">Segment</div>
              </div>
              <div class="metric">
                <div class="metric-value" style="color: ${urgencyColor};">${submission.urgencyLevel.toUpperCase()}</div>
                <div class="metric-label">Urgency</div>
              </div>
            </div>
          </div>

          <!-- Tracking Information -->
          <div class="section">
            <h3>🔍 Tracking Information</h3>
            <div class="info-grid">
              <div class="info-item">
                <div class="info-label">Submission ID</div>
                <div class="info-value">${submission.submissionId}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Platform</div>
                <div class="info-value">${submission.platform}</div>
              </div>
              <div class="info-item">
                <div class="info-label">UTM Source</div>
                <div class="info-value">${submission.utmSource || 'Direct'}</div>
              </div>
              <div class="info-item">
                <div class="info-label">UTM Campaign</div>
                <div class="info-value">${submission.utmCampaign || 'None'}</div>
              </div>
            </div>
          </div>

          <!-- Call to Action -->
          <div class="cta-section">
            <h3 style="margin: 0 0 10px; color: white;">⚡ Action Required</h3>
            <p style="margin: 0; opacity: 0.9;">This ${submission.urgencyLevel} priority lead requires your attention.</p>
            <a href="https://admin.presq.co.in/contacts/${submission.submissionId}" class="cta-button">
              View in Admin Panel
            </a>
          </div>
        </div>

        <!-- Footer -->
        <div class="footer">
          <p>PreSQ Innovation Admin Notification System</p>
          <p>Submission received on ${new Date(submission.createdAt.seconds * 1000).toLocaleString()}</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

/**
 * Generate customer confirmation email template
 */
const generateCustomerEmailTemplate = submission => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Thank You - PreSQ Innovation</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f8fafc; }
        .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); }
        .header { background: linear-gradient(135deg, #3b82f6, #8b5cf6); color: white; padding: 40px 30px; text-align: center; }
        .header h1 { margin: 0; font-size: 28px; font-weight: 700; }
        .header p { margin: 12px 0 0; opacity: 0.9; font-size: 16px; }
        .content { padding: 40px 30px; }
        .section { margin-bottom: 30px; }
        .section h3 { color: #1f2937; margin: 0 0 15px; font-size: 18px; font-weight: 600; }
        .highlight-box { background: linear-gradient(135deg, #dbeafe, #e0e7ff); border: 1px solid #3b82f6; border-radius: 12px; padding: 25px; margin: 25px 0; text-align: center; }
        .info-box { background: #f8fafc; border-left: 4px solid #3b82f6; padding: 20px; margin: 20px 0; border-radius: 0 8px 8px 0; }
        .contact-info { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 25px 0; }
        .contact-item { text-align: center; padding: 20px; background: #f8fafc; border-radius: 8px; }
        .contact-icon { font-size: 24px; margin-bottom: 10px; }
        .footer { background: #1f2937; color: white; padding: 30px; text-align: center; }
        .social-links { margin: 20px 0; }
        .social-links a { display: inline-block; margin: 0 10px; color: #60a5fa; text-decoration: none; }
        @media (max-width: 600px) {
          .contact-info { grid-template-columns: 1fr; }
          .header { padding: 30px 20px; }
          .content { padding: 30px 20px; }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <!-- Header -->
        <div class="header">
          <h1>🎉 Thank You, ${submission.firstName}!</h1>
          <p>Your message has been received successfully</p>
        </div>

        <!-- Content -->
        <div class="content">
          <!-- Confirmation Message -->
          <div class="highlight-box">
            <h3 style="color: #1f2937; margin: 0 0 15px;">✅ Message Received</h3>
            <p style="margin: 0; color: #4b5563; font-size: 16px;">
              We've received your inquiry about <strong>${submission.subject}</strong> and our team will respond within 24 hours during business days.
            </p>
          </div>

          <!-- What Happens Next -->
          <div class="section">
            <h3>🚀 What Happens Next?</h3>
            <div class="info-box">
              <p><strong>1. Review & Analysis</strong><br>
              Our team will carefully review your requirements and prepare a tailored response.</p>
            </div>
            <div class="info-box">
              <p><strong>2. Personal Response</strong><br>
              You'll receive a detailed response via ${submission.contactMethod} within 24 hours.</p>
            </div>
            <div class="info-box">
              <p><strong>3. Consultation</strong><br>
              We'll schedule a consultation to discuss your project in detail.</p>
            </div>
          </div>

          <!-- Contact Information -->
          <div class="section">
            <h3>📞 Need Immediate Assistance?</h3>
            <div class="contact-info">
              <div class="contact-item">
                <div class="contact-icon">📞</div>
                <strong>Call Us</strong><br>
                <a href="tel:+918448334698" style="color: #3b82f6; text-decoration: none;">+91 8448334698</a>
              </div>
              <div class="contact-item">
                <div class="contact-icon">✉️</div>
                <strong>Email Us</strong><br>
                <a href="mailto:admin@presq.co.in" style="color: #3b82f6; text-decoration: none;">admin@presq.co.in</a>
              </div>
            </div>
          </div>

          <!-- Company Information -->
          <div class="section">
            <h3>🏢 About PreSQ Innovation</h3>
            <p>We're a passionate team of web development experts dedicated to transforming your digital presence. With 5+ years of experience and 100+ successful projects, we create stunning, user-friendly solutions that drive results.</p>
          </div>
        </div>

        <!-- Footer -->
        <div class="footer">
          <h3 style="margin: 0 0 15px; color: white;">PreSQ Innovation</h3>
          <p style="margin: 0 0 10px; opacity: 0.8;">Transform Your Business with PreSQ</p>
          
          <div class="social-links">
            <a href="https://www.facebook.com/presqinnovation/">Facebook</a>
            <a href="https://x.com/PreSQInnovation">Twitter</a>
            <a href="https://www.instagram.com/presq.co.in/">Instagram</a>
          </div>
          
          <p style="margin: 15px 0 0; opacity: 0.6; font-size: 14px;">
            © 2025 PreSQ Innovation Private Limited. All rights reserved.
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
};

/**
 * Cloud Function: Send email notifications on new contact submissions
 * Triggers when a new document is added to any contact_submissions collection
 */
exports.sendContactNotificationEmails = onDocumentCreated(
  'Presq/contact_submissions/{platform}/{submissionId}',
  async event => {
    try {
      console.log('🚀 New contact submission detected:', event.params.submissionId);

      const submission = event.data.data();
      const transporter = createEmailTransporter();

      // Admin notification email
      const adminEmailOptions = {
        from: `"PreSQ Innovation System" <${process.env.EMAIL_USER}>`,
        to: process.env.ADMIN_EMAIL || 'admin@presq.co.in',
        cc: process.env.CC_EMAILS || '', // Optional CC emails
        subject: `🚨 New ${submission.urgencyLevel.toUpperCase()} Priority Lead - ${submission.subject}`,
        html: generateAdminEmailTemplate(submission),
        priority: submission.urgencyLevel === 'high' ? 'high' : 'normal',
      };

      // Customer confirmation email
      const customerEmailOptions = {
        from: `"PreSQ Innovation" <${process.env.EMAIL_USER}>`,
        to: submission.email,
        subject: `Thank you for contacting PreSQ Innovation - We'll respond within 24 hours`,
        html: generateCustomerEmailTemplate(submission),
      };

      // Send both emails
      const [adminResult, customerResult] = await Promise.allSettled([
        transporter.sendMail(adminEmailOptions),
        transporter.sendMail(customerEmailOptions),
      ]);

      // Log results
      if (adminResult.status === 'fulfilled') {
        console.log('✅ Admin notification email sent successfully:', adminResult.value.messageId);
      } else {
        console.error('❌ Failed to send admin notification:', adminResult.reason);
      }

      if (customerResult.status === 'fulfilled') {
        console.log(
          '✅ Customer confirmation email sent successfully:',
          customerResult.value.messageId
        );
      } else {
        console.error('❌ Failed to send customer confirmation:', customerResult.reason);
      }

      // Update submission with email status
      await event.data.ref.update({
        emailNotifications: {
          adminEmailSent: adminResult.status === 'fulfilled',
          customerEmailSent: customerResult.status === 'fulfilled',
          sentAt: FieldValue.serverTimestamp(),
          adminMessageId: adminResult.status === 'fulfilled' ? adminResult.value.messageId : null,
          customerMessageId:
            customerResult.status === 'fulfilled' ? customerResult.value.messageId : null,
        },
        updatedAt: FieldValue.serverTimestamp(),
      });

      console.log(
        '✅ Email notification process completed for submission:',
        event.params.submissionId
      );

      return {
        success: true,
        submissionId: event.params.submissionId,
        adminEmailSent: adminResult.status === 'fulfilled',
        customerEmailSent: customerResult.status === 'fulfilled',
      };
    } catch (error) {
      console.error('❌ Error in email notification function:', error);

      // Log error to Firestore for admin monitoring
      await db.collection('Presq/system_logs/error_logs').add({
        errorType: 'email_notification_error',
        submissionId: event.params.submissionId,
        error: error.message,
        stack: error.stack,
        timestamp: FieldValue.serverTimestamp(),
      });

      throw error;
    }
  }
);

/**
 * Cloud Function: Manual email sending for admin panel
 * Can be called from admin panel to resend emails
 */
exports.resendContactEmails = onCall(async request => {
  try {
    // Verify admin authentication (implement your auth logic)
    if (!request.auth || !request.auth.token.admin) {
      throw new Error('Admin access required');
    }

    const { submissionId, emailType } = request.data; // emailType: 'admin', 'customer', or 'both'

    // Get submission data
    const submissionDoc = await db.doc(`Presq/contact_submissions/website/${submissionId}`).get();

    if (!submissionDoc.exists) {
      throw new Error('Submission not found');
    }

    const submission = submissionDoc.data();
    const transporter = createEmailTransporter();

    const results = {};

    // Send admin email
    if (emailType === 'admin' || emailType === 'both') {
      const adminEmailOptions = {
        from: `"PreSQ Innovation System" <${process.env.EMAIL_USER}>`,
        to: process.env.ADMIN_EMAIL || 'admin@presq.co.in',
        subject: `🔄 RESENT: ${submission.urgencyLevel.toUpperCase()} Priority Lead - ${submission.subject}`,
        html: generateAdminEmailTemplate(submission),
      };

      try {
        const adminResult = await transporter.sendMail(adminEmailOptions);
        results.adminEmail = { success: true, messageId: adminResult.messageId };
      } catch (error) {
        results.adminEmail = { success: false, error: error.message };
      }
    }

    // Send customer email
    if (emailType === 'customer' || emailType === 'both') {
      const customerEmailOptions = {
        from: `"PreSQ Innovation" <${process.env.EMAIL_USER}>`,
        to: submission.email,
        subject: `Thank you for contacting PreSQ Innovation - We'll respond within 24 hours`,
        html: generateCustomerEmailTemplate(submission),
      };

      try {
        const customerResult = await transporter.sendMail(customerEmailOptions);
        results.customerEmail = { success: true, messageId: customerResult.messageId };
      } catch (error) {
        results.customerEmail = { success: false, error: error.message };
      }
    }

    console.log('✅ Manual email resend completed:', results);
    return results;
  } catch (error) {
    console.error('❌ Error in manual email resend:', error);
    throw error;
  }
});

/**
 * Cloud Function: Health check for email system
 */
exports.emailSystemHealthCheck = onRequest(async (req, res) => {
  try {
    const transporter = createEmailTransporter();

    // Verify email configuration
    await transporter.verify();

    res.status(200).json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      emailService: 'operational',
      configuration: 'valid',
    });
  } catch (error) {
    console.error('❌ Email system health check failed:', error);
    res.status(500).json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: error.message,
    });
  }
});
