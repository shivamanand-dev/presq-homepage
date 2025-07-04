'use client';

import { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  AlertCircle,
  User,
  Building,
  MessageSquare,
  Calendar,
} from 'lucide-react';
import { saveContactSubmission } from '@/lib/contactService';

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    countryCode: '+91',
    company: '',
    subject: '',
    message: '',
    contactMethod: 'email',
    bestTime: '',
    gdprConsent: false,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null
  const [submitMessage, setSubmitMessage] = useState('');

  // Country codes for phone validation
  const countryCodes = [
    { code: '+91', country: 'India' },
    { code: '+1', country: 'USA/Canada' },
    { code: '+44', country: 'UK' },
    { code: '+61', country: 'Australia' },
    { code: '+49', country: 'Germany' },
    { code: '+33', country: 'France' },
  ];

  // Subject options
  const subjectOptions = [
    'Web Development',
    'Mobile App Development',
    'SEO Services',
    'Digital Marketing',
    'E-commerce Solutions',
    'Website Maintenance',
    'General Inquiry',
    'Partnership Opportunity',
    'Other',
  ];

  // Best time options
  const timeOptions = [
    'Morning (9 AM - 12 PM)',
    'Afternoon (12 PM - 5 PM)',
    'Evening (5 PM - 8 PM)',
    'Anytime',
  ];

  // Validation functions
  const validateEmail = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = phone => {
    const phoneRegex = /^[0-9]{10,15}$/;
    return phoneRegex.test(phone.replace(/\s+/g, ''));
  };

  // Check if all required fields are filled and valid
  const isFormValid = () => {
    const requiredFields = {
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      email: formData.email.trim() && validateEmail(formData.email),
      phone: formData.phone.trim() && validatePhone(formData.phone),
      subject: formData.subject,
      message: formData.message.trim() && formData.message.trim().length >= 10,
      bestTime: formData.bestTime,
      gdprConsent: formData.gdprConsent,
    };

    return Object.values(requiredFields).every(field => field);
  };

  const validateForm = () => {
    const newErrors = {};

    // Required field validation
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number (10-15 digits)';
    }
    if (!formData.subject) newErrors.subject = 'Please select a subject';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    if (formData.message.trim().length < 10)
      newErrors.message = 'Message must be at least 10 characters long';
    if (!formData.bestTime) newErrors.bestTime = 'Please select your preferred contact time';
    if (!formData.gdprConsent)
      newErrors.gdprConsent = 'You must agree to the privacy policy to continue';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = e => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);
    setSubmitMessage('');

    try {
      console.log('📤 Submitting contact form...');

      // Save to Firebase
      const result = await saveContactSubmission(formData);

      if (result.success) {
        setSubmitStatus('success');
        setSubmitMessage(result.message);

        // Reset form on success
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          countryCode: '+91',
          company: '',
          subject: '',
          message: '',
          contactMethod: 'email',
          bestTime: '',
          gdprConsent: false,
        });

        console.log('✅ Contact form submitted successfully:', result.data);
      } else {
        setSubmitStatus('error');
        setSubmitMessage(result.message || 'Failed to send message. Please try again.');
        console.error('❌ Contact form submission failed:', result);
      }
    } catch (error) {
      console.error('❌ Unexpected error during form submission:', error);
      setSubmitStatus('error');
      setSubmitMessage('An unexpected error occurred. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      {/* Hero Section */}
      <section className="py-12 lg:py-16 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-r from-blue-100/20 to-purple-100/20 rounded-full blur-2xl"></div>
          <div className="absolute bottom-20 left-20 w-24 h-24 bg-gradient-to-r from-purple-100/20 to-pink-100/20 rounded-full blur-2xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-200/50 rounded-full text-sm font-medium text-blue-700 mb-6">
              <MessageSquare className="w-4 h-4 mr-2" />
              Get In Touch
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              <span className="text-gray-900">Let&apos;s Start Your</span>{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Digital Journey
              </span>
            </h1>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Ready to transform your business? Get in touch with our expert team and let&apos;s
              discuss how we can help you achieve your digital goals.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Information */}
            <div className="lg:col-span-1 space-y-8">
              {/* Contact Cards */}
              <div className="space-y-6">
                {/* Phone Contact */}
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border border-gray-100">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Call Us</h3>
                      <p className="text-gray-600 mb-3">Speak directly with our team</p>
                      <a
                        href="tel:+918448334698"
                        className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
                        aria-label="Call PreSQ Innovation"
                      >
                        +91 8448334698
                      </a>
                    </div>
                  </div>
                </div>

                {/* Email Contact */}
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border border-gray-100">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Us</h3>
                      <p className="text-gray-600 mb-3">Send us a detailed message</p>
                      <a
                        href="mailto:admin@presq.co.in"
                        className="text-purple-600 hover:text-purple-700 font-medium transition-colors duration-200"
                        aria-label="Email PreSQ Innovation"
                      >
                        admin@presq.co.in
                      </a>
                    </div>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border border-gray-100">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Business Hours</h3>
                      <div className="space-y-1 text-gray-600">
                        <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                        <p>Saturday: 10:00 AM - 4:00 PM</p>
                        <p>Sunday: Closed</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Response Promise */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
                <div className="flex items-center space-x-3 mb-4">
                  <CheckCircle className="w-8 h-8 text-white" />
                  <h3 className="text-lg font-semibold">Quick Response Guarantee</h3>
                </div>
                <p className="text-blue-100 leading-relaxed">
                  We respond to all inquiries within 24 hours during business days. For urgent
                  matters, call us directly.
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-10 border border-gray-100">
                <div className="mb-8">
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                    Send Us a Message
                  </h2>
                  <p className="text-gray-600">
                    Fill out the form below and we&apos;ll get back to you as soon as possible.
                  </p>
                </div>

                {/* Success Message */}
                {submitStatus === 'success' && (
                  <div
                    className="mb-8 p-4 bg-green-50 border border-green-200 rounded-xl flex items-start space-x-3"
                    role="alert"
                    aria-live="polite"
                  >
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-green-800 font-semibold mb-1">
                        Message Sent Successfully!
                      </h3>
                      <p className="text-green-700 text-sm">{submitMessage}</p>
                    </div>
                  </div>
                )}

                {/* Error Message */}
                {submitStatus === 'error' && (
                  <div
                    className="mb-8 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start space-x-3"
                    role="alert"
                    aria-live="polite"
                  >
                    <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-red-800 font-semibold mb-1">Message Failed to Send</h3>
                      <p className="text-red-700 text-sm">{submitMessage}</p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  {/* Name Fields */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        First Name{' '}
                        <span className="text-red-500" aria-label="required">
                          *
                        </span>
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-colors duration-200 ${
                            errors.firstName
                              ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                              : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                          }`}
                          placeholder="Enter your first name"
                          aria-describedby={errors.firstName ? 'firstName-error' : undefined}
                          aria-invalid={errors.firstName ? 'true' : 'false'}
                        />
                      </div>
                      {errors.firstName && (
                        <p id="firstName-error" className="mt-2 text-sm text-red-600" role="alert">
                          {errors.firstName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="lastName"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Last Name{' '}
                        <span className="text-red-500" aria-label="required">
                          *
                        </span>
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-colors duration-200 ${
                            errors.lastName
                              ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                              : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                          }`}
                          placeholder="Enter your last name"
                          aria-describedby={errors.lastName ? 'lastName-error' : undefined}
                          aria-invalid={errors.lastName ? 'true' : 'false'}
                        />
                      </div>
                      {errors.lastName && (
                        <p id="lastName-error" className="mt-2 text-sm text-red-600" role="alert">
                          {errors.lastName}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Email Field */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address{' '}
                      <span className="text-red-500" aria-label="required">
                        *
                      </span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-colors duration-200 ${
                          errors.email
                            ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                            : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                        }`}
                        placeholder="Enter your email address"
                        aria-describedby={errors.email ? 'email-error' : undefined}
                        aria-invalid={errors.email ? 'true' : 'false'}
                      />
                    </div>
                    {errors.email && (
                      <p id="email-error" className="mt-2 text-sm text-red-600" role="alert">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Phone Field */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number{' '}
                      <span className="text-red-500" aria-label="required">
                        *
                      </span>
                    </label>
                    <div className="flex space-x-3">
                      <select
                        name="countryCode"
                        value={formData.countryCode}
                        onChange={handleInputChange}
                        className="px-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                        aria-label="Country code"
                      >
                        {countryCodes.map(country => (
                          <option key={country.code} value={country.code}>
                            {country.code} ({country.country})
                          </option>
                        ))}
                      </select>
                      <div className="relative flex-1">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-colors duration-200 ${
                            errors.phone
                              ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                              : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                          }`}
                          placeholder="Enter your phone number"
                          aria-describedby={errors.phone ? 'phone-error' : undefined}
                          aria-invalid={errors.phone ? 'true' : 'false'}
                        />
                      </div>
                    </div>
                    {errors.phone && (
                      <p id="phone-error" className="mt-2 text-sm text-red-600" role="alert">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  {/* Company Field */}
                  <div>
                    <label
                      htmlFor="company"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Company Name <span className="text-gray-400">(Optional)</span>
                    </label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                        placeholder="Enter your company name"
                      />
                    </div>
                  </div>

                  {/* Subject Field */}
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Subject/Topic of Inquiry{' '}
                      <span className="text-red-500" aria-label="required">
                        *
                      </span>
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-colors duration-200 bg-white ${
                        errors.subject
                          ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                          : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                      }`}
                      aria-describedby={errors.subject ? 'subject-error' : undefined}
                      aria-invalid={errors.subject ? 'true' : 'false'}
                    >
                      <option value="">Select a subject</option>
                      {subjectOptions.map(option => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    {errors.subject && (
                      <p id="subject-error" className="mt-2 text-sm text-red-600" role="alert">
                        {errors.subject}
                      </p>
                    )}
                  </div>

                  {/* Message Field */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Detailed Message{' '}
                      <span className="text-red-500" aria-label="required">
                        *
                      </span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={6}
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-colors duration-200 resize-vertical ${
                        errors.message
                          ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                          : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                      }`}
                      placeholder="Please provide details about your project, requirements, timeline, and any specific questions you have..."
                      aria-describedby={errors.message ? 'message-error' : undefined}
                      aria-invalid={errors.message ? 'true' : 'false'}
                    />
                    <div className="mt-1 text-sm text-gray-500">
                      {formData.message.length}/500 characters
                    </div>
                    {errors.message && (
                      <p id="message-error" className="mt-2 text-sm text-red-600" role="alert">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Contact Preferences */}
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Preferred Contact Method */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Preferred Contact Method{' '}
                        <span className="text-red-500" aria-label="required">
                          *
                        </span>
                      </label>
                      <div className="space-y-3">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="contactMethod"
                            value="email"
                            checked={formData.contactMethod === 'email'}
                            onChange={handleInputChange}
                            className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                          />
                          <span className="ml-3 text-gray-700">Email</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="contactMethod"
                            value="phone"
                            checked={formData.contactMethod === 'phone'}
                            onChange={handleInputChange}
                            className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                          />
                          <span className="ml-3 text-gray-700">Phone Call</span>
                        </label>
                      </div>
                    </div>

                    {/* Best Time to Contact */}
                    <div>
                      <label
                        htmlFor="bestTime"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Best Time to Contact{' '}
                        <span className="text-red-500" aria-label="required">
                          *
                        </span>
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <select
                          id="bestTime"
                          name="bestTime"
                          value={formData.bestTime}
                          onChange={handleInputChange}
                          className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-colors duration-200 bg-white ${
                            errors.bestTime
                              ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                              : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                          }`}
                          aria-describedby={errors.bestTime ? 'bestTime-error' : undefined}
                          aria-invalid={errors.bestTime ? 'true' : 'false'}
                        >
                          <option value="">Select best time</option>
                          {timeOptions.map(option => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>
                      {errors.bestTime && (
                        <p id="bestTime-error" className="mt-2 text-sm text-red-600" role="alert">
                          {errors.bestTime}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* GDPR Consent */}
                  <div>
                    <label className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        name="gdprConsent"
                        checked={formData.gdprConsent}
                        onChange={handleInputChange}
                        className={`w-5 h-5 text-blue-600 border-2 rounded focus:ring-blue-500 mt-0.5 ${
                          errors.gdprConsent ? 'border-red-300' : 'border-gray-300'
                        }`}
                        aria-describedby={errors.gdprConsent ? 'gdpr-error' : undefined}
                        aria-invalid={errors.gdprConsent ? 'true' : 'false'}
                      />
                      <span className="text-sm text-gray-700 leading-relaxed">
                        I agree to the{' '}
                        <a href="/privacy" className="text-blue-600 hover:text-blue-700 underline">
                          Privacy Policy
                        </a>{' '}
                        and consent to PreSQ Innovation storing and processing my personal data for
                        the purpose of responding to my inquiry.{' '}
                        <span className="text-red-500" aria-label="required">
                          *
                        </span>
                      </span>
                    </label>
                    {errors.gdprConsent && (
                      <p id="gdpr-error" className="mt-2 text-sm text-red-600" role="alert">
                        {errors.gdprConsent}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting || !isFormValid()}
                      className={`w-full flex items-center justify-center px-8 py-4 rounded-xl font-semibold text-white transition-all duration-300 ${
                        isSubmitting || !isFormValid()
                          ? 'bg-gray-400 cursor-not-allowed opacity-60'
                          : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/25'
                      }`}
                      aria-describedby="submit-button-description"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                          Sending Message...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 mr-3" />
                          Send Message
                        </>
                      )}
                    </button>
                    <p
                      id="submit-button-description"
                      className="mt-2 text-sm text-gray-500 text-center"
                    >
                      {!isFormValid()
                        ? 'Please fill in all required fields to send your message'
                        : "We'll respond within 24 hours during business days"}
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
