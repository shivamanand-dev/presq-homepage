'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import ProjectCard from './ProjectCard';
import { projectsData } from '@/data/projects';

export default function ProjectCarousel() {
  const [currentProject, setCurrentProject] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentProject(prev => (prev + 1) % projectsData.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextProject = () => {
    setCurrentProject(prev => (prev + 1) % projectsData.length);
    setIsAutoPlaying(false);
  };

  const prevProject = () => {
    setCurrentProject(prev => (prev - 1 + projectsData.length) % projectsData.length);
    setIsAutoPlaying(false);
  };

  const currentProjectData = projectsData[currentProject];

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-200/50 rounded-full text-sm font-medium text-blue-700 mb-6">
            <Eye className="w-4 h-4 mr-2" />
            Featured Projects
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-gray-900">Our Latest</span>{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Creations
            </span>
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Explore our most recent projects that showcase innovation, creativity, and technical
            excellence.
          </p>
        </div>

        {/* Project Navigation */}
        <div className="flex justify-between items-center mb-12">
          <div className="flex space-x-3">
            {projectsData.map((project, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentProject(index);
                  setIsAutoPlaying(false);
                }}
                className={`group relative overflow-hidden transition-all duration-500 ${
                  index === currentProject ? 'w-16 h-4' : 'w-4 h-4 hover:w-6'
                }`}
              >
                <div
                  className={`w-full h-full rounded-full transition-all duration-500 ${
                    index === currentProject
                      ? `bg-gradient-to-r ${project.gradient}`
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                ></div>
                {index === currentProject && (
                  <div className="absolute inset-0 bg-white/30 rounded-full animate-pulse"></div>
                )}
              </button>
            ))}
          </div>

          <div className="flex space-x-3">
            <button
              onClick={prevProject}
              className="group w-12 h-12 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center hover:border-blue-300 hover:shadow-lg transition-all duration-300 hover:scale-110"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
            </button>
            <button
              onClick={nextProject}
              className="group w-12 h-12 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center hover:border-blue-300 hover:shadow-lg transition-all duration-300 hover:scale-110"
            >
              <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
            </button>
          </div>
        </div>

        {/* Project Card */}
        <ProjectCard project={currentProjectData} />
      </div>
    </section>
  );
}
