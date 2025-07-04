'use client';

import { useState } from 'react';
import { saveContactSubmission } from '@/lib/contactService';

export function useContactForm() {
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
  const [submitStatus, setSubmitStatus] = useState(null);
  const [submitMessage, setSubmitMessage] = useState('');

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

  const resetForm = () => {
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
    setErrors({});
    setSubmitStatus(null);
    setSubmitMessage('');
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
        resetForm();
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

  return {
    formData,
    errors,
    isSubmitting,
    submitStatus,
    submitMessage,
    isFormValid,
    handleInputChange,
    handleSubmit,
    resetForm,
  };
}
