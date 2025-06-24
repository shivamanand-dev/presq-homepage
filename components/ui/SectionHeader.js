"use client";

import { Zap } from 'lucide-react';

export default function SectionHeader({ 
  badge, 
  title, 
  subtitle, 
  description, 
  className = "" 
}) {
  return (
    <div className={`text-center ${className}`}>
      {badge && (
        <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-full text-sm font-medium text-blue-300 mb-6">
          <Zap className="w-4 h-4 mr-2" />
          {badge}
        </div>
      )}
      
      {(title || subtitle) && (
        <h2 className="text-5xl lg:text-6xl font-bold mb-6">
          {title && (
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              {title}
            </span>
          )}
          {title && subtitle && <br />}
          {subtitle && (
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {subtitle}
            </span>
          )}
        </h2>
      )}
      
      {description && (
        <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}