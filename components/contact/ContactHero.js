'use client';

import { MessageSquare } from 'lucide-react';

export default function ContactHero() {
  return (
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
  );
}
