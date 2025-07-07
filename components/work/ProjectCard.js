'use client';

import { ExternalLink, Play, Calendar, Globe, MessageSquare, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function ProjectCard({ project }) {
  return (
    <div className="relative">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 hover:shadow-3xl transition-all duration-700">
        {/* Project Header */}
        <div className={`relative h-80 bg-gradient-to-br ${project.darkGradient} overflow-hidden`}>
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            ></div>
          </div>

          {/* Project Image */}
          <div className="absolute right-8 top-8 bottom-8 w-1/2 rounded-2xl overflow-hidden shadow-2xl">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>

          {/* Project Info Overlay */}
          <div className="absolute left-8 top-8 bottom-8 w-1/2 flex flex-col justify-between text-white">
            {/* Top Section */}
            <div>
              {/* Category & Status */}
              <div className="flex items-center space-x-3 mb-6">
                <div className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium border border-white/30">
                  {project.category}
                </div>
                <div className="flex items-center px-3 py-1 bg-green-500/20 backdrop-blur-sm rounded-full text-sm font-medium border border-green-400/30">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                  {project.status}
                </div>
              </div>

              {/* Title & Subtitle */}
              <h3 className="text-4xl font-bold mb-3 leading-tight">{project.title}</h3>
              <p className="text-xl text-white/80 mb-6 leading-relaxed">{project.subtitle}</p>

              {/* Key Highlights */}
              <div className="space-y-2">
                {project.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-center text-white/90">
                    <div className="w-2 h-2 bg-white/60 rounded-full mr-3"></div>
                    <span className="text-sm font-medium">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Section */}
            <div>
              {/* Project Meta */}
              <div className="flex items-center space-x-6 text-white/70 text-sm mb-6">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  {project.year}
                </div>
                <div className="flex items-center">
                  <Globe className="w-4 h-4 mr-2" />
                  Live Project
                </div>
              </div>

              {/* Action Button */}
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center px-6 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full font-semibold text-white hover:bg-white/30 transition-all duration-300"
              >
                <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                View Live Demo
                <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>

        {/* Project Details */}
        <div className="p-8 lg:p-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Description & Features */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <div>
                <h4 className="text-2xl font-bold text-gray-900 mb-4">Project Overview</h4>
                <p className="text-gray-600 leading-relaxed text-lg">{project.description}</p>
              </div>

              {/* Key Features */}
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">Key Features</h4>
                <div className="grid md:grid-cols-2 gap-3">
                  {project.features.map((feature, index) => (
                    <div key={index} className="flex items-center group">
                      <div
                        className={`w-2 h-2 bg-gradient-to-r ${project.gradient} rounded-full mr-3 group-hover:scale-150 transition-transform duration-300`}
                      ></div>
                      <span className="text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technology Stack */}
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">Technology Stack</h4>
                <div className="flex flex-wrap gap-3">
                  {project.techStack.map((tech, index) => (
                    <span
                      key={index}
                      className={`px-4 py-2 bg-gradient-to-r ${project.bgGradient} border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:shadow-md transition-all duration-300 hover:scale-105`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Metrics & Actions */}
            <div className="space-y-8">
              {/* Project Metrics */}
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-6">Project Impact</h4>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(project.metrics).map(([key, value], index) => (
                    <div
                      key={index}
                      className={`relative p-4 bg-gradient-to-br ${project.bgGradient} rounded-2xl border border-gray-200 hover:shadow-lg transition-all duration-300 group overflow-hidden`}
                    >
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                      ></div>
                      <div className="relative">
                        <div
                          className={`text-2xl font-bold bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent mb-1`}
                        >
                          {value}
                        </div>
                        <div className="text-xs text-gray-600 capitalize font-medium">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group w-full flex items-center justify-center px-6 py-4 bg-gradient-to-r ${project.gradient} text-white rounded-2xl font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300 relative overflow-hidden`}
                >
                  <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <Globe className="w-5 h-5 mr-2 relative z-10" />
                  <span className="relative z-10">Visit Live Site</span>
                  <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform relative z-10" />
                </a>

                <Link href="/contact" className="block">
                  <button className="w-full flex items-center justify-center px-6 py-4 border-2 border-gray-300 text-gray-700 rounded-2xl font-semibold hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300">
                    <MessageSquare className="w-5 h-5 mr-2" />
                    Discuss Your Project
                  </button>
                </Link>
              </div>

              {/* Project Info */}
              <div className="p-6 bg-gray-50 rounded-2xl border border-gray-200">
                <h5 className="font-semibold text-gray-900 mb-3">Project Details</h5>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Year</span>
                    <span className="font-medium text-gray-900">{project.year}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Category</span>
                    <span className="font-medium text-gray-900">{project.category}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Status</span>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      <span className="font-medium text-gray-900">{project.status}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
