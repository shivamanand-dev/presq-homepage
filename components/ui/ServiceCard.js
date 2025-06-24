"use client";

import { ArrowRight } from 'lucide-react';

export default function ServiceCard({ service, index }) {
  return (
    <div
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
        <button className={`group/btn relative px-6 py-3 bg-gradient-to-r ${service.gradient} rounded-full font-semibold text-white overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg`}>
          <span className="relative z-10 flex items-center">
            {service.buttonText}
            <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
          </span>
        </button>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-4 right-4 w-2 h-2 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="absolute bottom-4 left-4 w-1 h-1 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100"></div>
    </div>
  );
}