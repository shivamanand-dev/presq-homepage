"use client";

import { useState, useEffect } from 'react';
import { Home, Search, ArrowLeft, Mail, Phone, Zap, AlertTriangle, RefreshCw } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  const [isVisible, setIsVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const popularPages = [
    { name: 'Home', href: '/', icon: Home, description: 'Return to our homepage' },
    { name: 'About Us', href: '/about', icon: Zap, description: 'Learn about our company' },
    { name: 'Contact', href: '/contact', icon: Mail, description: 'Get in touch with us' },
    { name: 'Blog', href: '/blog', icon: Search, description: 'Read our latest insights' }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // In a real application, this would redirect to a search results page
      window.location.href = `/?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 to-purple-900/10"></div>
        <div className="absolute top-20 right-20 w-64 h-64 border border-blue-500/10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-48 h-48 border border-purple-500/10 rounded-full animate-bounce"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-100/5 to-purple-100/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className={`text-center transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          
          {/* Error Icon */}
          <div className="mb-8">
            <div className="w-32 h-32 mx-auto bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-full flex items-center justify-center border border-orange-500/30">
              <AlertTriangle className="w-16 h-16 text-orange-400" />
            </div>
          </div>

          {/* 404 Display */}
          <div className="mb-8">
            <h1 className="text-8xl lg:text-9xl font-black mb-4">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                404
              </span>
            </h1>
            <div className="text-6xl lg:text-7xl font-black text-white/10 leading-none -mt-8">
              ERROR
            </div>
          </div>

          {/* Main Message */}
          <div className="mb-12 max-w-2xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              <span className="text-white">Oops! Page</span>{' '}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Not Found
              </span>
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed">
              The page you&apos;re looking for seems to have vanished into the digital void. 
              Don&apos;t worry though – we&apos;ll help you find your way back to something amazing.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="mb-16">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/">
                <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full font-semibold text-white overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25">
                  <span className="relative z-10 flex items-center">
                    <Home className="w-5 h-5 mr-2" />
                    Go Home
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </Link>
              
              <button 
                onClick={() => window.history.back()}
                className="px-8 py-4 border-2 border-white/20 rounded-full font-semibold text-white hover:bg-white/10 transition-all duration-300 hover:border-white/40 flex items-center"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Go Back
              </button>

              <button 
                onClick={() => window.location.reload()}
                className="px-8 py-4 border-2 border-gray-600/50 rounded-full font-semibold text-gray-300 hover:bg-gray-600/20 transition-all duration-300 hover:border-gray-500/50 flex items-center"
              >
                <RefreshCw className="w-5 h-5 mr-2" />
                Refresh
              </button>
            </div>
          </div>
        </div>

        {/* Popular Pages Section */}
        <div className={`transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="text-center mb-12">
            <h3 className="text-2xl lg:text-3xl font-bold mb-4">
              <span className="text-white">Popular</span>{' '}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Destinations
              </span>
            </h3>
            <p className="text-gray-300">
              Here are some popular pages you might be looking for
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {popularPages.map((page, index) => (
              <Link key={page.name} href={page.href}>
                <div 
                  className="group bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-blue-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/10 cursor-pointer"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <page.icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-300 transition-colors duration-300">
                    {page.name}
                  </h4>
                  <p className="text-gray-400 text-sm">
                    {page.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Help Section */}
        <div className={`mt-20 text-center transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-blue-500/20 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Still Need Help?
            </h3>
            <p className="text-gray-300 mb-6">
              If you can&apos;t find what you&apos;re looking for, our team is here to help you navigate to the right place.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <button className="group flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full font-semibold text-white hover:scale-105 transition-transform duration-300">
                  <Mail className="w-4 h-4 mr-2" />
                  Contact Support
                </button>
              </Link>
              <a href="tel:+918448334698">
                <button className="flex items-center px-6 py-3 border border-gray-600 rounded-full font-semibold text-gray-300 hover:bg-gray-600/20 transition-all duration-300">
                  <Phone className="w-4 h-4 mr-2" />
                  Call Us
                </button>
              </a>
            </div>
          </div>
        </div>

        {/* Fun Element */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-full text-sm font-medium text-blue-300">
            <Zap className="w-4 h-4 mr-2" />
            Error 404 - But Our Service is Always 100%
          </div>
        </div>
      </div>
    </div>
  );
}