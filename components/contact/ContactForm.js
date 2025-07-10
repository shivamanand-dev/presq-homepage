'use client';

import { useState, useEffect } from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import { saveContactSubmission } from '@/lib/contactService';
import FormField from './form/FormField';
import FormSelect from './form/FormSelect';
import FormTextarea from './form/FormTextarea';
import FormRadioGroup from './form/FormRadioGroup';
import FormCheckbox from './form/FormCheckbox';
import FormPhoneField from './form/FormPhoneField';
import StatusMessage from './form/StatusMessage';
import SubmitButton from './form/SubmitButton';
import SuccessModal from './form/SuccessModal';
import { useContactForm } from '@/hooks/useContactForm';

export default function ContactForm() {
  const {
    formData,
    errors,
    isSubmitting,
    submitStatus,
    submitMessage,
    submissionData,
    isFormValid,
    handleInputChange,
    handleSubmit,
    resetForm,
  } = useContactForm();

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Show success modal when form is successfully submitted
  useEffect(() => {
    if (submitStatus === 'success') {
      setShowSuccessModal(true);
      // Scroll to top when success modal opens
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [submitStatus]);

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    resetForm();
  };

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

  const timeOptions = [
    'Morning (9 AM - 12 PM)',
    'Afternoon (12 PM - 5 PM)',
    'Evening (5 PM - 8 PM)',
    'Anytime',
  ];

  const contactMethodOptions = [
    { value: 'email', label: 'Email' },
    { value: 'phone', label: 'Phone Call' },
  ];

  return (
    <div className="lg:col-span-2">
      <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-10 border border-gray-100">
        <div className="mb-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">Send Us a Message</h2>
          <p className="text-gray-600">
            Fill out the form below and we&apos;ll get back to you as soon as possible.
          </p>
        </div>

        {/* Status Messages */}
        <StatusMessage status={submitStatus} message={submitMessage} />

        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          {/* Name Fields */}
          <div className="grid md:grid-cols-2 gap-6">
            <FormField
              id="firstName"
              name="firstName"
              type="text"
              label="First Name"
              value={formData.firstName}
              onChange={handleInputChange}
              error={errors.firstName}
              required
              placeholder="Enter your first name"
              icon="user"
            />

            <FormField
              id="lastName"
              name="lastName"
              type="text"
              label="Last Name"
              value={formData.lastName}
              onChange={handleInputChange}
              error={errors.lastName}
              optional
              placeholder="Enter your last name"
              icon="user"
            />
          </div>

          {/* Email Field */}
          <FormField
            id="email"
            name="email"
            type="email"
            label="Email Address"
            value={formData.email}
            onChange={handleInputChange}
            error={errors.email}
            required
            placeholder="Enter your email address"
            icon="mail"
          />

          {/* Phone Field */}
          <FormPhoneField
            phoneValue={formData.phone}
            countryCodeValue={formData.countryCode}
            onChange={handleInputChange}
            error={errors.phone}
          />

          {/* Company Field */}
          <FormField
            id="company"
            name="company"
            type="text"
            label="Company Name"
            value={formData.company}
            onChange={handleInputChange}
            placeholder="Enter your company name"
            icon="building"
            optional
          />

          {/* Subject Field */}
          <FormSelect
            id="subject"
            name="subject"
            label="Subject/Topic of Inquiry"
            value={formData.subject}
            onChange={handleInputChange}
            error={errors.subject}
            required
            options={subjectOptions}
            placeholder="Select a subject"
          />

          {/* Message Field */}
          <FormTextarea
            id="message"
            name="message"
            label="Detailed Message"
            value={formData.message}
            onChange={handleInputChange}
            error={errors.message}
            required
            rows={6}
            placeholder="Please provide details about your project, requirements, timeline, and any specific questions you have..."
            maxLength={500}
            minLength={10}
            showCharCount
            showWordCount
          />

          {/* Contact Preferences */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Preferred Contact Method */}
            <FormRadioGroup
              name="contactMethod"
              label="Preferred Contact Method"
              value={formData.contactMethod}
              onChange={handleInputChange}
              options={contactMethodOptions}
              required
            />

            {/* Best Time to Contact */}
            <FormSelect
              id="bestTime"
              name="bestTime"
              label="Best Time to Contact"
              value={formData.bestTime}
              onChange={handleInputChange}
              error={errors.bestTime}
              required
              options={timeOptions}
              placeholder="Select best time"
              icon="calendar"
            />
          </div>

          {/* GDPR Consent */}
          <FormCheckbox
            name="gdprConsent"
            checked={formData.gdprConsent}
            onChange={handleInputChange}
            error={errors.gdprConsent}
            required
          >
            I agree to the{' '}
            <a href="/privacy" className="text-blue-600 hover:text-blue-700 underline">
              Privacy Policy
            </a>{' '}
            and consent to PreSQ Innovation storing and processing my personal data for the purpose
            of responding to my inquiry.
          </FormCheckbox>

          {/* Submit Button */}
          <SubmitButton isSubmitting={isSubmitting} isFormValid={isFormValid()} />
        </form>
      </div>

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={handleCloseModal}
        submissionData={submissionData}
      />
    </div>
  );
}
