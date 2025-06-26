"use client";

import { useState, useEffect } from 'react';
import { ChevronDown, Code, Smartphone, Search, Globe, Zap, ArrowRight } from 'lucide-react';
import Link from 'next/link';

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
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 md:pb-20 lg:pb-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[calc(100vh-8rem)] md:min-h-[calc(100vh-10rem)] lg:min-h-[80vh]">
          
          {/* Left Side - Text Content */}
          <div className={`space-y-6 md:space-y-8 transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
            
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-full text-sm font-medium text-blue-300">
              <Zap className="w-4 h-4 mr-2" />
              Transform Your Business
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
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
              <div className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-white/10 leading-none -mt-4">
                PreSQ
              </div>
            </div>

            {/* Description */}
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-lg">
              We specialize in cutting-edge web development, mobile applications, SEO optimization, and comprehensive digital services that drive your business forward.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact">
                <button className="group relative px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full font-semibold text-white overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25">
                  <span className="relative z-10 flex items-center justify-center">
                    Get Started
                    <ArrowRight className="w-4 md:w-5 h-4 md:h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </Link>
              
              <button className="px-6 md:px-8 py-3 md:py-4 border-2 border-white/20 rounded-full font-semibold text-white hover:bg-white/10 transition-all duration-300 hover:border-white/40">
                View Our Work
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 md:gap-8 pt-6 md:pt-8 border-t border-gray-800">
              <div>
                <div className="text-2xl md:text-3xl font-bold text-blue-400">100+</div>
                <div className="text-xs md:text-sm text-gray-400">Projects Completed</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold text-purple-400">50+</div>
                <div className="text-xs md:text-sm text-gray-400">Happy Clients</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold text-green-400">24/7</div>
                <div className="text-xs md:text-sm text-gray-400">Support</div>
              </div>
            </div>
          </div>

          {/* Right Side - Visual Elements */}
          <div className={`relative transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
            
            {/* Central Spiral/Torus Shape */}
            <div className="relative flex items-center justify-center">
              <div className="w-64 md:w-80 h-64 md:h-80 relative">
                {/* Animated Torus */}
                <div className="absolute inset-0 rounded-full border-4 border-blue-500/30 animate-spin" style={{ animationDuration: '20s' }}>
                  <div className="absolute inset-4 rounded-full border-4 border-purple-500/30 animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }}>
                    <div className="absolute inset-4 rounded-full border-4 border-blue-400/40 animate-spin" style={{ animationDuration: '10s' }}>
                      <div className="absolute inset-4 rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm flex items-center justify-center">
                        <div className="text-center">
                          <svg className="w-full h-full" viewBox="0 0 320 320">
                      <defs>
                        <path
                          id="outer-circle"
                          d="M 160,160 m -130,0 a 130,130 0 1,1 260,0 a 130,130 0 1,1 -260,0"
                        />
                      </defs>
                      <text className="fill-gray-300 text-lg font-bold tracking-wider" style={{ fontSize: '16px' }}>
                        <textPath href="#outer-circle" startOffset="0%">
                          PRESQ INNOVATION • DIGITAL SOLUTIONS • WEB DEVELOPMENT • 
                        </textPath>
                      </text>
                    </svg>
                    {/* Inner Seal Ring */}
                  <div className="absolute inset-8 rounded-full border-4 border-purple-500/30 bg-none animate-spin" style={{ animationDuration: '40s', animationDirection: 'reverse' }}>
                    
                    {/* Inner Text Ring - Services */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg className="w-full h-full" viewBox="0 0 200 200">
                        <defs>
                          <path
                            id="inner-circle"
                            d="M 100,100 m -80,0 a 80,80 0 1,1 160,0 a 80,80 0 1,1 -160,0"
                          />
                        </defs>
                        <text className="fill-gray-500 text-sm font-semibold tracking-wide" style={{ fontSize: '12px' }}>
                          <textPath href="#inner-circle" startOffset="0%">
                            MOBILE APPS • SEO • MARKETING • DESIGN • 
                          </textPath>
                        </text>
                      </svg>
                    </div>
                  </div>
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
                    className={`absolute w-24 md:w-32 h-24 md:h-32 bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-xl p-3 md:p-4 transform transition-all duration-500 hover:scale-110 hover:border-blue-500/50 animate-float`}
                    style={{
                      ...positions[index],
                      animationDelay: `${index * 0.5}s`,
                      animationDuration: '3s'
                    }}
                  >
                    <service.icon className="w-6 md:w-8 h-6 md:h-8 text-blue-400 mb-2" />
                    <div className="text-xs font-semibold text-white mb-1">{service.name}</div>
                    <div className="text-xs text-gray-400 hidden md:block">{service.description}</div>
                  </div>
                );
              })}
            </div>

            {/* Get Quote Floating Button - Slower Animation */}
            <div className="absolute bottom-4 md:bottom-10 right-4 md:right-10">
              <Link href="/contact">
                <button className="group w-20 md:w-24 h-20 md:h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex flex-col items-center justify-center text-white font-semibold text-xs md:text-sm transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-blue-500/25" style={{ animation: 'bounce 3s infinite' }}>
                  <span>Get A</span>
                  <span>Quote</span>
                  <ChevronDown className="w-3 md:w-4 h-3 md:h-4 mt-1 group-hover:translate-y-1 transition-transform" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-5 md:w-6 h-5 md:h-6 text-gray-400" />
      </div>
    </div>
  );
}