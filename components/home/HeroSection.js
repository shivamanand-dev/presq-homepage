"use client";

import { useState, useEffect } from 'react';
import { ChevronDown, Code, Smartphone, Search, Globe, Zap, ArrowRight } from 'lucide-react';

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const services = [
    { icon: Code, name: "Web Development", description: "Custom web applications" },
    { icon: Smartphone, name: "Mobile Apps", description: "iOS & Android development" },
    { icon: Search, name: "SEO Services", description: "Search engine optimization" },
    { icon: Globe, name: "Digital Marketing", description: "Complete digital solutions" }
  ];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-black to-purple-900/20"></div>
        
        {/* Animated Circles */}
        <div className="absolute top-20 left-10 w-32 h-32 border border-blue-500/30 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-20 h-20 border border-purple-500/30 rounded-full animate-bounce"></div>
        <div className="absolute bottom-40 left-1/4 w-16 h-16 border border-blue-400/20 rounded-full animate-ping"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-12 gap-4 h-full">
            {Array.from({ length: 144 }).map((_, i) => (
              <div key={i} className="border border-gray-800/50"></div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          
          {/* Left Side - Text Content */}
          <div className={`space-y-8 transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
            
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-full text-sm font-medium text-blue-300">
              <Zap className="w-4 h-4 mr-2" />
              Transform Your Business
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-6xl lg:text-7xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
                  Creative
                </span>
                <br />
                <span className="text-white">Solutions</span>
                <br />
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Real Results
                </span>
              </h1>
              
              {/* Large Brand Text */}
              <div className="text-8xl lg:text-9xl font-black text-white/10 leading-none -mt-4">
                PreSQ
              </div>
            </div>

            {/* Description */}
            <p className="text-xl text-gray-300 leading-relaxed max-w-lg">
              We specialize in cutting-edge web development, mobile applications, SEO optimization, and comprehensive digital services that drive your business forward.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full font-semibold text-white overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25">
                <span className="relative z-10 flex items-center">
                  Get Started
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              
              <button className="px-8 py-4 border-2 border-white/20 rounded-full font-semibold text-white hover:bg-white/10 transition-all duration-300 hover:border-white/40">
                View Our Work
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-800">
              <div>
                <div className="text-3xl font-bold text-blue-400">100+</div>
                <div className="text-sm text-gray-400">Projects Completed</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-400">50+</div>
                <div className="text-sm text-gray-400">Happy Clients</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-400">24/7</div>
                <div className="text-sm text-gray-400">Support</div>
              </div>
            </div>
          </div>

          {/* Right Side - Visual Elements */}
          <div className={`relative transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
            
            {/* Central Spiral/Torus Shape */}
            <div className="relative flex items-center justify-center">
              <div className="w-80 h-80 relative">
                {/* Animated Torus */}
                <div className="absolute inset-0 rounded-full border-4 border-blue-500/30 animate-spin" style={{ animationDuration: '20s' }}>
                  <div className="absolute inset-4 rounded-full border-4 border-purple-500/30 animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }}>
                    <div className="absolute inset-4 rounded-full border-4 border-blue-400/40 animate-spin" style={{ animationDuration: '10s' }}>
                      <div className="absolute inset-4 rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-white mb-2">PreSQ</div>
                          <div className="text-sm text-gray-300">Innovation</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Service Cards */}
              {services.map((service, index) => {
                const positions = [
                  { top: '10%', right: '10%' },
                  { bottom: '10%', right: '20%' },
                  { bottom: '20%', left: '10%' },
                  { top: '20%', left: '20%' }
                ];
                
                return (
                  <div
                    key={service.name}
                    className={`absolute w-32 h-32 bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 transform transition-all duration-500 hover:scale-110 hover:border-blue-500/50 animate-float`}
                    style={{
                      ...positions[index],
                      animationDelay: `${index * 0.5}s`,
                      animationDuration: '3s'
                    }}
                  >
                    <service.icon className="w-8 h-8 text-blue-400 mb-2" />
                    <div className="text-xs font-semibold text-white mb-1">{service.name}</div>
                    <div className="text-xs text-gray-400">{service.description}</div>
                  </div>
                );
              })}
            </div>

            {/* Get Quote Floating Button - Slower Animation */}
            <div className="absolute bottom-10 right-10">
              <button className="group w-24 h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex flex-col items-center justify-center text-white font-semibold text-sm transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-blue-500/25" style={{ animation: 'bounce 3s infinite' }}>
                <span>Get A</span>
                <span>Quote</span>
                <ChevronDown className="w-4 h-4 mt-1 group-hover:translate-y-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-6 h-6 text-gray-400" />
      </div>
    </div>
  );
}