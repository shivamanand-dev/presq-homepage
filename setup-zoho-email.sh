#!/bin/bash

# PreSQ Innovation - Zoho Email Setup Script for Firebase Functions
# This script configures Firebase Functions to use Zoho Mail SMTP

echo "🚀 Setting up Zoho Email for Firebase Functions..."
echo "=================================================="

# Check if Firebase CLI is installed
if ! command -v firebase &> /dev/null; then
    echo "❌ Firebase CLI is not installed. Please install it first:"
    echo "npm install -g firebase-tools"
    exit 1
fi

# Check if user is logged in to Firebase
if ! firebase projects:list &> /dev/null; then
    echo "❌ Please login to Firebase first:"
    echo "firebase login"
    exit 1
fi

echo ""
echo "📧 Configuring Zoho Email Settings..."
echo "======================================"

# Set Zoho SMTP configuration
firebase functions:config:set email.service="zoho"
firebase functions:config:set email.host="smtppro.zoho.in"
firebase functions:config:set email.port="587"
firebase functions:config:set email.secure="false"
firebase functions:config:set email.require_tls="true"

# Prompt for email credentials
echo ""
read -p "Enter your Zoho email address (e.g., admin@presq.co.in): " EMAIL_USER
firebase functions:config:set email.user="$EMAIL_USER"

echo ""
read -s -p "Enter your Zoho email password: " EMAIL_PASSWORD
echo ""
firebase functions:config:set email.password="$EMAIL_PASSWORD"

# Set admin email (can be the same as user email)
echo ""
read -p "Enter admin notification email (default: $EMAIL_USER): " ADMIN_EMAIL
ADMIN_EMAIL=${ADMIN_EMAIL:-$EMAIL_USER}
firebase functions:config:set email.admin_email="$ADMIN_EMAIL"

# Optional: Set CC emails for admin notifications
echo ""
read -p "Enter CC emails for admin notifications (optional, comma-separated): " CC_EMAILS
if [ ! -z "$CC_EMAILS" ]; then
    firebase functions:config:set email.cc_emails="$CC_EMAILS"
fi

echo ""
echo "✅ Email configuration completed!"
echo ""
echo "📋 Current Configuration:"
echo "========================"
firebase functions:config:get

echo ""
echo "🚀 Next Steps:"
echo "=============="
echo "1. Deploy the functions:"
echo "   firebase deploy --only functions"
echo ""
echo "2. Test the email system:"
echo "   Submit a contact form on your website"
echo ""
echo "3. Monitor function logs:"
echo "   firebase functions:log"
echo ""
echo "✨ Setup completed successfully!"