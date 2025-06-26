"use client";

import { Facebook, Twitter, Instagram, Phone, Mail, MapPin } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  // Updated JSON data with social media links
  const footerData = {
    "company": "PreSQ Innovation",
    "description": "Expert Web Development, SEO, and Digital Marketing Services Tailored for Your Success.",
    "links": {
      "terms": "Terms and Conditions",
      "privacy": "Privacy Policy"
    },
    "socialMedia": [
      {
        "name": "Facebook", 
        "link": "https://www.facebook.com/presqinnovation/"
      }, 
      {
        "name": "X", 
        "link": "https://x.com/PreSQInnovation"
      }, 
      {
        "name": "Instagram", 
        "link": "https://www.instagram.com/presq.co.in/"
      }
    ],
    "webDesignThemes": [
      "Corporate",
      "E-Commerce",
      "Portfolio",
      "Blogs and Personal Websites",
      "Landing Pages",
      "Membership Websites"
    ],
    "services": [
      "Web Development",
      "App Development",
      "Analytics",
      "Search Engine Optimization",
      "Digital Marketing"
    ],
    "contact": {
      "helpText": "Need help or have a question?",
      "phone": "+91 8448334698",
      "email": "info@presq.co.in"
    },
    "copyright": "© 2025 - PreSQ Innovation Private Limited"
  };

  // Social media icons mapping
  const socialIcons = {
    Facebook: Facebook,
    X: Twitter,
    Instagram: Instagram
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/5 to-purple-900/5"></div>
        <div className="absolute top-20 right-20 w-64 h-64 border border-blue-500/5 rounded-full"></div>
        <div className="absolute bottom-20 left-20 w-48 h-48 border border-purple-500/5 rounded-full"></div>
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          
          {/* Company Header */}
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {footerData.company}
              </span>
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
              {footerData.description}
            </p>
          </div>

          {/* Main Footer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
            
            {/* Services Column */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white mb-4 relative">
                Our Services
                <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"></div>
              </h3>
              <ul className="space-y-3">
                {footerData.services.map((service, index) => (
                  <li key={index}>
                    <Link 
                      href="#" 
                      className="text-gray-300 hover:text-blue-400 transition-colors duration-300 hover:translate-x-1 transform inline-block"
                    >
                      {service}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Web Design Themes Column */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white mb-4 relative">
                Design Solutions
                <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"></div>
              </h3>
              <ul className="space-y-3">
                {footerData.webDesignThemes.map((theme, index) => (
                  <li key={index}>
                    <Link 
                      href="#" 
                      className="text-gray-300 hover:text-purple-400 transition-colors duration-300 hover:translate-x-1 transform inline-block"
                    >
                      {theme}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white mb-4 relative">
                Contact Us
                <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"></div>
              </h3>
              <div className="space-y-4">
                <p className="text-gray-300 mb-4">{footerData.contact.helpText}</p>
                
                {/* Phone */}
                <div className="flex items-center space-x-3 group">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <a 
                    href={`tel:${footerData.contact.phone}`}
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-300"
                  >
                    {footerData.contact.phone}
                  </a>
                </div>

                {/* Email */}
                <div className="flex items-center space-x-3 group">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <a 
                    href={`mailto:${footerData.contact.email}`}
                    className="text-gray-300 hover:text-purple-400 transition-colors duration-300"
                  >
                    {footerData.contact.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Social Media & Newsletter */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white mb-4 relative">
                Connect With Us
                <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"></div>
              </h3>
              
              {/* Social Media Icons */}
              <div className="flex space-x-4">
                {footerData.socialMedia.map((platform, index) => {
                  const IconComponent = socialIcons[platform.name];
                  const gradients = [
                    'from-blue-500 to-blue-600',
                    'from-gray-700 to-gray-800',
                    'from-pink-500 to-purple-600'
                  ];
                  
                  return (
                    <a
                      key={platform.name}
                      href={platform.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group w-12 h-12 bg-gradient-to-r ${gradients[index]} rounded-lg flex items-center justify-center hover:scale-110 hover:shadow-lg transition-all duration-300`}
                      aria-label={`Follow us on ${platform.name}`}
                    >
                      <IconComponent className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-300" />
                    </a>
                  );
                })}
              </div>

              {/* Newsletter Signup */}
              <div className="space-y-3">
                <p className="text-gray-300 text-sm">Stay updated with our latest news</p>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors duration-300"
                  />
                  <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-semibold text-white hover:scale-105 transition-transform duration-300">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              
              {/* Copyright */}
              <div className="text-gray-400 text-sm">
                {footerData.copyright}
              </div>

              {/* Legal Links */}
              <div className="flex space-x-6">
                <Link 
                  href="/terms" 
                  className="text-gray-400 hover:text-blue-400 text-sm transition-colors duration-300"
                >
                  {footerData.links.terms}
                </Link>
                <span className="text-gray-600">|</span>
                <Link 
                  href="/privacy" 
                  className="text-gray-400 hover:text-purple-400 text-sm transition-colors duration-300"
                >
                  {footerData.links.privacy}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}