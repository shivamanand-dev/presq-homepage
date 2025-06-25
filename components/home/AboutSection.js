"use client";

import { Users, Target, Award, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function AboutSection() {
  const highlights = [
    {
      icon: Users,
      title: "Expert Team",
      description: "Passionate developers & designers"
    },
    {
      icon: Target,
      title: "Results Driven",
      description: "Focused on your success"
    },
    {
      icon: Award,
      title: "Quality First",
      description: "Premium solutions delivered"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 border border-blue-200/30 rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 border border-purple-200/30 rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-100/20 to-purple-100/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side - Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-200/50 rounded-full text-sm font-medium text-blue-700">
              <Users className="w-4 h-4 mr-2" />
              About PreSQ Innovation
            </div>

            {/* Heading */}
            <div className="space-y-4">
              <h2 className="text-5xl lg:text-6xl font-bold leading-tight">
                <span className="text-gray-900">Where</span>
                <br />
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Creativity
                </span>
                <br />
                <span className="text-gray-900">Meets Technology</span>
              </h2>
            </div>

            {/* Description */}
            <p className="text-xl text-gray-600 leading-relaxed">
              We are a passionate team of web development experts dedicated to transforming your digital presence. Our mission is to create stunning, user-friendly solutions that drive results and elevate your brand.
            </p>

            {/* Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {highlights.map((highlight, index) => (
                <div
                  key={highlight.title}
                  className="group p-4 bg-white/60 backdrop-blur-sm border border-gray-200/50 rounded-xl hover:bg-white/80 hover:border-blue-200/50 transition-all duration-300 hover:scale-105"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                    <highlight.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{highlight.title}</h3>
                  <p className="text-sm text-gray-600">{highlight.description}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/about">
                <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full font-semibold text-white overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25">
                  <span className="relative z-10 flex items-center">
                    Learn More About Us
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </Link>
            </div>
          </div>

          {/* Right Side - Visual Elements */}
          <div className="relative">
            {/* Main Circle with Team Representation */}
            <div className="relative flex items-center justify-center">
              <div className="w-80 h-80 relative">
                {/* Outer Ring */}
                <div className="absolute inset-0 rounded-full border-4 border-blue-200/40 animate-spin" style={{ animationDuration: '30s' }}>
                  {/* Inner Ring */}
                  <div className="absolute inset-8 rounded-full border-4 border-purple-200/40 animate-spin" style={{ animationDuration: '20s', animationDirection: 'reverse' }}>
                    {/* Core */}
                    <div className="absolute inset-8 rounded-full bg-gradient-to-br from-blue-50 to-purple-50 border-4 border-white shadow-2xl flex items-center justify-center">
                      <div className="text-center">
                         <svg className="w-full h-full" viewBox="0 0 320 320">
                      <defs>
                        <path
                          id="outer-circle"
                          d="M 160,160 m -130,0 a 130,130 0 1,1 260,0 a 130,130 0 1,1 -260,0"
                        />
                      </defs>
                      <text className="fill-gray-800 text-lg font-bold tracking-wider" style={{ fontSize: '16px' }}>
                        <textPath href="#outer-circle" startOffset="0%">
                          PRESQ INNOVATION • DIGITAL SOLUTIONS • WEB DEVELOPMENT • 
                        </textPath>
                      </text>
                    </svg>

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
                        <text className="fill-gray-500 text-base font-semibold tracking-wide">
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

                {/* Floating Elements */}
                <div className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center animate-float">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                
                <div className="absolute bottom-4 left-4 w-14 h-14 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center animate-float" style={{ animationDelay: '1s' }}>
                  <Target className="w-7 h-7 text-purple-600" />
                </div>
                
                <div className="absolute top-1/2 right-0 w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center animate-float" style={{ animationDelay: '2s' }}>
                  <Award className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="absolute -bottom-8 -left-8 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-xl p-4 shadow-lg">
              <div className="text-2xl font-bold text-blue-600">100+</div>
              <div className="text-sm text-gray-600">Projects Delivered</div>
            </div>
            
            <div className="absolute -top-8 -right-8 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-xl p-4 shadow-lg">
              <div className="text-2xl font-bold text-purple-600">50+</div>
              <div className="text-sm text-gray-600">Happy Clients</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}