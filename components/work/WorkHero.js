'use client';

import { useState, useEffect } from 'react';
import { Award } from 'lucide-react';

export default function WorkHero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="pt-20 pb-16 bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-purple-900/20"></div>
        <div className="absolute top-20 right-20 w-64 h-64 border border-blue-500/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-48 h-48 border border-purple-500/20 rounded-full animate-bounce"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-100/5 to-purple-100/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
        >
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-full text-sm font-medium text-blue-300 mb-6">
            <Award className="w-4 h-4 mr-2" />
            Our Portfolio
          </div>

          <h1 className="text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-white">Crafting Digital</span>{' '}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Experiences
            </span>
          </h1>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
            Discover the innovative solutions we&apos;ve crafted for our clients. Each project
            represents our commitment to excellence and cutting-edge technology.
          </p>
        </div>
      </div>
    </section>
  );
}
