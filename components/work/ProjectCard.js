'use client';

import {
  ExternalLink,
  Play,
  Calendar,
  Globe,
  MessageSquare,
  CheckCircle,
  Star,
  TrendingUp,
  BarChart3,
} from 'lucide-react';
import Link from 'next/link';

export default function ProjectCard({ project }) {
  return (
    <div className="relative">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 hover:shadow-3xl transition-all duration-700">
        {/* Project Header */}
        <div className="relative h-80 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
          {/* Animated Background Pattern */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 animate-pulse"></div>
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            ></div>
          </div>

          {/* Floating Geometric Shapes */}
          <div className="absolute top-8 right-20 w-16 h-16 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full opacity-20 animate-bounce"></div>
          <div className="absolute bottom-12 right-32 w-8 h-8 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full opacity-30 animate-pulse"></div>
          <div className="absolute top-20 right-12 w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-25 animate-ping"></div>

          {/* Project Image */}
          <div className="absolute right-8 top-8 bottom-8 w-1/2 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>

            {/* Image Overlay Badge */}
            <div className="absolute top-4 left-4">
              <div className="flex items-center px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-bold text-gray-900 shadow-lg">
                <Star className="w-3 h-3 mr-1 text-yellow-500" />
                Featured
              </div>
            </div>
          </div>

          {/* Project Info Overlay */}
          <div className="absolute left-8 top-8 bottom-8 w-1/2 flex flex-col justify-between z-10">
            {/* Top Section */}
            <div>
              {/* Category & Status */}
              <div className="flex items-center space-x-3 mb-6">
                <div className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full text-sm font-bold text-white shadow-lg border-2 border-white/20">
                  {project.category}
                </div>
                <div className="flex items-center px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full text-sm font-bold text-white shadow-lg border-2 border-white/20">
                  <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
                  {project.status}
                </div>
              </div>

              {/* Title & Subtitle */}
              <div className="space-y-4">
                <h3 className="text-4xl font-black leading-tight text-white drop-shadow-2xl">
                  <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                    {project.title}
                  </span>
                </h3>
                <p className="text-xl text-gray-100 leading-relaxed font-bold drop-shadow-lg">
                  {project.subtitle}
                </p>
              </div>

              {/* Key Highlights */}
              <div className="mt-6 space-y-3">
                {project.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-center text-white">
                    <div className="w-3 h-3 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mr-3 shadow-lg"></div>
                    <span className="text-sm font-bold drop-shadow-lg">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Section */}
            <div>
              {/* Project Meta */}
              <div className="flex items-center space-x-6 text-gray-200 text-sm mb-6 font-bold">
                <div className="flex items-center bg-white/10 backdrop-blur-sm px-3 py-2 rounded-full">
                  <Calendar className="w-4 h-4 mr-2 text-cyan-400" />
                  {project.year}
                </div>
                <div className="flex items-center bg-white/10 backdrop-blur-sm px-3 py-2 rounded-full">
                  <Globe className="w-4 h-4 mr-2 text-green-400" />
                  Live Project
                </div>
              </div>

              {/* Action Button */}
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full font-bold text-white hover:from-cyan-400 hover:to-blue-500 hover:shadow-2xl transition-all duration-300 shadow-lg border-2 border-white/20"
              >
                <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                View Live Demo
                <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>

        {/* Project Details */}
        <div className="p-8 lg:p-12 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Description & Features */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <div>
                <h4 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg mr-3 flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-white" />
                  </div>
                  Project Overview
                </h4>
                <p className="text-gray-700 leading-relaxed text-lg font-medium">
                  {project.description}
                </p>
              </div>

              {/* Key Features */}
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg mr-3 flex items-center justify-center">
                    <CheckCircle className="w-3 h-3 text-white" />
                  </div>
                  Key Features
                </h4>
                <div className="grid md:grid-cols-2 gap-4">
                  {project.features.map((feature, index) => (
                    <div
                      key={index}
                      className="group flex items-center p-3 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-300"
                    >
                      <div
                        className={`w-3 h-3 bg-gradient-to-r ${project.gradient} rounded-full mr-3 group-hover:scale-125 transition-transform duration-300 shadow-lg`}
                      ></div>
                      <span className="text-gray-800 group-hover:text-gray-900 transition-colors duration-300 font-semibold">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technology Stack */}
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <div className="w-6 h-6 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg mr-3 flex items-center justify-center">
                    <Star className="w-3 h-3 text-white" />
                  </div>
                  Technology Stack
                </h4>
                <div className="flex flex-wrap gap-3">
                  {project.techStack.map((tech, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full text-sm font-bold hover:shadow-lg hover:scale-105 transition-all duration-300 border-2 border-white shadow-md"
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
                <h4 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <div className="w-6 h-6 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg mr-3 flex items-center justify-center">
                    <BarChart3 className="w-3 h-3 text-white" />
                  </div>
                  Project Impact
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(project.metrics).map(([key, value], index) => {
                    const gradients = [
                      'from-blue-500 to-cyan-500',
                      'from-purple-500 to-pink-500',
                      'from-green-500 to-emerald-500',
                      'from-orange-500 to-red-500',
                    ];
                    const bgGradients = [
                      'from-blue-50 to-cyan-50',
                      'from-purple-50 to-pink-50',
                      'from-green-50 to-emerald-50',
                      'from-orange-50 to-red-50',
                    ];

                    return (
                      <div
                        key={index}
                        className={`relative p-4 bg-gradient-to-br ${bgGradients[index % 4]} rounded-2xl border-2 border-white hover:shadow-xl transition-all duration-300 group overflow-hidden`}
                      >
                        <div
                          className={`absolute inset-0 bg-gradient-to-br ${gradients[index % 4]} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                        ></div>
                        <div className="relative">
                          <div
                            className={`text-2xl font-black bg-gradient-to-r ${gradients[index % 4]} bg-clip-text text-transparent mb-1`}
                          >
                            {value}
                          </div>
                          <div className="text-xs text-gray-700 capitalize font-bold">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-full flex items-center justify-center px-6 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-2xl font-bold hover:from-cyan-400 hover:to-blue-500 hover:shadow-2xl hover:scale-105 transition-all duration-300 relative overflow-hidden border-2 border-white shadow-lg"
                >
                  <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <Globe className="w-5 h-5 mr-2 relative z-10" />
                  <span className="relative z-10">Visit Live Site</span>
                  <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform relative z-10" />
                </a>

                <Link href="/contact" className="block">
                  <button className="w-full flex items-center justify-center px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-bold hover:from-purple-400 hover:to-pink-400 hover:shadow-xl hover:scale-105 transition-all duration-300 border-2 border-white shadow-lg">
                    <MessageSquare className="w-5 h-5 mr-2" />
                    Discuss Your Project
                  </button>
                </Link>
              </div>

              {/* Project Info */}
              <div className="p-6 bg-gradient-to-br from-white to-gray-50 rounded-2xl border-2 border-gray-200 shadow-lg">
                <h5 className="font-bold text-gray-900 mb-4 flex items-center">
                  <div className="w-5 h-5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg mr-2 flex items-center justify-center">
                    <Star className="w-2 h-2 text-white" />
                  </div>
                  Project Details
                </h5>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                    <span className="text-gray-700 font-semibold">Year</span>
                    <span className="font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      {project.year}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                    <span className="text-gray-700 font-semibold">Category</span>
                    <span className="font-bold text-gray-900 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                      {project.category}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                    <span className="text-gray-700 font-semibold">Status</span>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                      <span className="font-bold text-gray-900 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                        {project.status}
                      </span>
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
