"use client";

import { Zap, ArrowRight, Code, Smartphone, Target, BarChart3, Search, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function ServicesSection() {
  // Services data from JSON
  const servicesData = [
    {
      title: "Web Development",
      description: "Crafting stunning, responsive websites that drive results and elevate your brand.",
      buttonText: "Contact Us",
      icon: Code,
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      title: "App Development",
      description: "Transforming ideas into engaging mobile experiences for your audience.",
      buttonText: "Contact Us",
      icon: Smartphone,
      gradient: "from-purple-500 to-pink-500"
    },
    {
      title: "Ads. Campaign",
      description: "Find your tribe and propell to cast your shadows way beyond in time and space.",
      buttonText: "Contact Us",
      icon: Target,
      gradient: "from-orange-500 to-red-500"
    },
    {
      title: "Analytics",
      description: "Optimize your digital strategy with our comprehensive analytics tools.",
      buttonText: "Contact Us",
      icon: BarChart3,
      gradient: "from-green-500 to-emerald-500"
    },
    {
      title: "SEO",
      description: "Achieve top search rankings and grow your business with SEO.",
      buttonText: "Contact Us",
      icon: Search,
      gradient: "from-indigo-500 to-blue-500"
    },
    {
      title: "Digital Marketing",
      description: "Achieve your marketing goals with our proven digital strategies.",
      buttonText: "Contact Us",
      icon: TrendingUp,
      gradient: "from-pink-500 to-rose-500"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 to-purple-900/10"></div>
        <div className="absolute top-20 right-20 w-64 h-64 border border-blue-500/10 rounded-full"></div>
        <div className="absolute bottom-20 left-20 w-48 h-48 border border-purple-500/10 rounded-full"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-full text-sm font-medium text-blue-300 mb-6">
            <Zap className="w-4 h-4 mr-2" />
            Our Services
          </div>
          
          <h2 className="text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              What We
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Deliver
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            From concept to completion, we provide comprehensive digital solutions that transform your business and drive measurable results.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service, index) => (
            <div
              key={service.title}
              className="group relative bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 hover:border-blue-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/10"
              style={{
                animationDelay: `${index * 0.1}s`
              }}
            >
              {/* Gradient Background Effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl`}></div>
              
              {/* Icon */}
              <div className={`relative w-16 h-16 bg-gradient-to-r ${service.gradient} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <service.icon className="w-8 h-8 text-white" />
              </div>

              {/* Content */}
              <div className="relative">
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-300 transition-colors duration-300">
                  {service.title}
                </h3>
                
                <p className="text-gray-300 leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Button */}
                <Link href="/contact">
                  <button className={`group/btn relative px-6 py-3 bg-gradient-to-r ${service.gradient} rounded-full font-semibold text-white overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg`}>
                    <span className="relative z-10 flex items-center">
                      {service.buttonText}
                      <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </span>
                  </button>
                </Link>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-4 right-4 w-2 h-2 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-4 left-4 w-1 h-1 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100"></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-300 mb-6">
            Ready to transform your business with our expert services?
          </p>
          <Link href="/contact">
            <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full font-semibold text-white overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25">
              <span className="relative z-10 flex items-center">
                Start Your Project
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}