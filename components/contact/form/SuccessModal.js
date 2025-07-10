'use client';

import { useState, useEffect } from 'react';
import { CheckCircle, X, Home, ArrowRight, Phone, Mail } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SuccessModal({ isOpen, onClose, submissionData }) {
  const [isVisible, setIsVisible] = useState(false);
  const [countdown, setCountdown] = useState(10);
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      // Scroll to top when modal opens
      window.scrollTo({ top: 0, behavior: 'smooth' });

      setIsVisible(true);

      // Start countdown
      const timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            handleRedirect();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isOpen]);

  const handleRedirect = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
      router.push('/');
    }, 300);
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 ${
          isVisible ? 'bg-opacity-50' : 'bg-opacity-0'
        }`}
        onClick={handleClose}
      />

      {/* Modal Container */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div
          className={`relative w-full max-w-lg transform transition-all duration-300 ${
            isVisible ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-4'
          }`}
        >
          {/* Modal Content */}
          <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-10 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors duration-200"
              aria-label="Close modal"
            >
              <X className="w-4 h-4 text-gray-600" />
            </button>

            {/* Header with Animation */}
            <div className="relative bg-gradient-to-br from-green-500 to-emerald-600 px-8 py-12 text-center overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                  }}
                ></div>
              </div>

              {/* Floating Elements */}
              <div className="absolute top-4 left-8 w-3 h-3 bg-white/30 rounded-full animate-bounce"></div>
              <div className="absolute top-8 right-12 w-2 h-2 bg-white/40 rounded-full animate-pulse"></div>
              <div className="absolute bottom-6 left-12 w-4 h-4 bg-white/20 rounded-full animate-ping"></div>

              {/* Success Icon */}
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                  <CheckCircle className="w-12 h-12 text-white animate-bounce" />
                </div>
                <div
                  className="absolute inset-0 w-20 h-20 mx-auto border-4 border-white/30 rounded-full animate-spin"
                  style={{ animationDuration: '3s' }}
                ></div>
              </div>

              {/* Success Message */}
              <h2 className="text-3xl font-bold text-white mb-3">Message Sent Successfully! 🎉</h2>
              <p className="text-green-100 text-lg font-medium">Thank you for reaching out to us</p>
            </div>

            {/* Content */}
            <div className="px-8 py-8">
              {/* Confirmation Details */}
              <div className="space-y-6">
                {/* What's Next */}
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">What happens next?</h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white font-bold text-sm">1</span>
                      </div>
                      <div className="text-left">
                        <p className="font-semibold text-gray-900">Review & Analysis</p>
                        <p className="text-sm text-gray-600">
                          Our team will carefully review your requirements
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
                      <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white font-bold text-sm">2</span>
                      </div>
                      <div className="text-left">
                        <p className="font-semibold text-gray-900">Personal Response</p>
                        <p className="text-sm text-gray-600">
                          You&apos;ll receive a detailed response within 24 hours
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3 p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border border-orange-100">
                      <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white font-bold text-sm">3</span>
                      </div>
                      <div className="text-left">
                        <p className="font-semibold text-gray-900">Consultation</p>
                        <p className="text-sm text-gray-600">
                          We&apos;ll schedule a consultation to discuss your project
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submission Details */}
                {submissionData && (
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-3 text-center">
                      Submission Details
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Subject:</span>
                        <span className="font-medium text-gray-900">{submissionData.subject}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Lead Score:</span>
                        <span className="font-medium text-blue-600">
                          {submissionData.leadScore}/100
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Priority:</span>
                        <span
                          className={`font-medium capitalize ${
                            submissionData.urgencyLevel === 'high'
                              ? 'text-red-600'
                              : submissionData.urgencyLevel === 'medium'
                                ? 'text-orange-600'
                                : 'text-green-600'
                          }`}
                        >
                          {submissionData.urgencyLevel}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Contact Information */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100">
                  <h4 className="font-semibold text-gray-900 mb-4 text-center">
                    Need Immediate Assistance?
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <a
                      href="tel:+918448334698"
                      className="flex items-center justify-center space-x-2 p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-300 group"
                    >
                      <Phone className="w-4 h-4 text-blue-600 group-hover:scale-110 transition-transform" />
                      <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600">
                        Call Us
                      </span>
                    </a>
                    <a
                      href="mailto:admin@presq.co.in"
                      className="flex items-center justify-center space-x-2 p-3 bg-white rounded-lg border border-gray-200 hover:border-purple-300 hover:shadow-md transition-all duration-300 group"
                    >
                      <Mail className="w-4 h-4 text-purple-600 group-hover:scale-110 transition-transform" />
                      <span className="text-sm font-medium text-gray-700 group-hover:text-purple-600">
                        Email Us
                      </span>
                    </a>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={handleRedirect}
                    className="group w-full flex items-center justify-center px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  >
                    <Home className="w-5 h-5 mr-2" />
                    Go to Homepage
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <button
                    onClick={handleClose}
                    className="w-full px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-300"
                  >
                    Stay on Contact Page
                  </button>
                </div>

                {/* Auto Redirect Notice */}
                <div className="text-center">
                  <p className="text-sm text-gray-500">
                    Automatically redirecting to homepage in{' '}
                    <span className="font-bold text-blue-600">{countdown}</span> seconds
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-1 mt-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-1 rounded-full transition-all duration-1000 ease-linear"
                      style={{ width: `${((10 - countdown) / 10) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
