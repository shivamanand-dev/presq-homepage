'use client';

import { Phone, Mail, Clock, CheckCircle } from 'lucide-react';

export default function ContactInfo() {
  const contactMethods = [
    {
      icon: Phone,
      title: 'Call Us',
      description: 'Speak directly with our team',
      value: '+91 8448334698',
      href: 'tel:+918448334698',
      color: 'from-blue-500 to-purple-500',
      textColor: 'text-blue-600 hover:text-blue-700',
    },
    {
      icon: Mail,
      title: 'Email Us',
      description: 'Send us a detailed message',
      value: 'contact@presq.co.in',
      href: 'mailto:contact@presq.co.in',
      color: 'from-purple-500 to-pink-500',
      textColor: 'text-purple-600 hover:text-purple-700',
    },
    {
      icon: Clock,
      title: 'Business Hours',
      description: null,
      value: null,
      href: null,
      color: 'from-green-500 to-emerald-500',
      textColor: null,
      customContent: (
        <div className="space-y-1 text-gray-600">
          <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
          <p>Saturday: 10:00 AM - 4:00 PM</p>
          <p>Sunday: Closed</p>
        </div>
      ),
    },
  ];

  return (
    <div className="lg:col-span-1 space-y-8">
      {/* Contact Cards */}
      <div className="space-y-6">
        {contactMethods.map((method, index) => (
          <div
            key={method.title}
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border border-gray-100"
          >
            <div className="flex items-start space-x-4">
              <div
                className={`w-12 h-12 bg-gradient-to-r ${method.color} rounded-xl flex items-center justify-center flex-shrink-0`}
              >
                <method.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{method.title}</h3>
                {method.description && <p className="text-gray-600 mb-3">{method.description}</p>}
                {method.value && method.href ? (
                  <a
                    href={method.href}
                    className={`${method.textColor} font-medium transition-colors duration-200`}
                    aria-label={`${method.title} PreSQ Innovation`}
                  >
                    {method.value}
                  </a>
                ) : method.customContent ? (
                  method.customContent
                ) : null}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Response Promise */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
        <div className="flex items-center space-x-3 mb-4">
          <CheckCircle className="w-8 h-8 text-white" />
          <h3 className="text-lg font-semibold">Quick Response Guarantee</h3>
        </div>
        <p className="text-blue-100 leading-relaxed">
          We respond to all inquiries within 24 hours during business days. For urgent matters, call
          us directly.
        </p>
      </div>
    </div>
  );
}
