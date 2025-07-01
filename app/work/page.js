"use client";

import { useState, useEffect } from 'react';
import { 
  ExternalLink, 
  Play, 
  Users, 
  BarChart3, 
  Clock, 
  Award, 
  Shield, 
  Zap, 
  Target, 
  Brain,
  CheckCircle,
  ArrowRight,
  Monitor,
  Smartphone,
  Globe,
  Database,
  Settings,
  TrendingUp,
  FileText,
  Upload,
  MessageSquare
} from 'lucide-react';
import Link from 'next/link';

export default function Work() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Project data
  const project = {
    title: "PhysicsClasses Live",
    subtitle: "Interactive Quiz Learning Platform",
    url: "https://www.physicsclasseslive.com/",
    description: "A comprehensive quiz platform designed to revolutionize physics education through interactive learning, real-time analytics, and personalized progress tracking.",
    image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1200",
    category: "Educational Technology",
    year: "2024",
    status: "Live & Active"
  };

  // Admin features
  const adminFeatures = [
    {
      icon: Settings,
      title: "Quiz Management",
      description: "Create and publish quizzes with customizable settings, manage drafts with auto-save functionality",
      details: [
        "Drag-and-drop quiz builder",
        "Auto-save functionality",
        "Custom time limits and scoring",
        "Rich media content support"
      ]
    },
    {
      icon: Upload,
      title: "Bulk Content Upload",
      description: "Upload questions via CSV for efficient bulk creation and content management",
      details: [
        "CSV import/export",
        "Batch question processing",
        "Media file management",
        "Content validation"
      ]
    },
    {
      icon: Database,
      title: "Content Organization",
      description: "Organize quizzes by category, difficulty level, and performance metrics",
      details: [
        "Category management",
        "Difficulty progression",
        "Thumbnail uploads",
        "Performance tracking"
      ]
    },
    {
      icon: Users,
      title: "User Management",
      description: "Comprehensive user profile management and progress tracking system",
      details: [
        "User profile management",
        "Progress analytics",
        "Payment history tracking",
        "Support message handling"
      ]
    },
    {
      icon: BarChart3,
      title: "Analytics & Reporting",
      description: "Detailed analytics on quiz performance, user engagement, and revenue tracking",
      details: [
        "Completion rate analysis",
        "Score distribution metrics",
        "Revenue tracking",
        "Engagement statistics"
      ]
    }
  ];

  // User features
  const userFeatures = [
    {
      icon: Play,
      title: "Interactive Quiz Interface",
      description: "Engaging quiz-taking experience with real-time feedback and progress tracking",
      details: [
        "Real-time progress tracking",
        "Instant answer feedback",
        "Detailed explanations",
        "Reaction time monitoring"
      ]
    },
    {
      icon: Target,
      title: "Personal Dashboard",
      description: "Comprehensive personal progress tracking and performance analytics",
      details: [
        "Progress visualization",
        "Attempt history",
        "Performance metrics",
        "Transaction records"
      ]
    },
    {
      icon: Brain,
      title: "Learning Features",
      description: "Advanced learning tools with category-based browsing and difficulty progression",
      details: [
        "Category-based browsing",
        "Difficulty progression",
        "Performance feedback",
        "Reaction time improvement"
      ]
    }
  ];

  // Technical specifications
  const techSpecs = [
    { icon: Monitor, label: "Frontend", value: "React.js, Next.js" },
    { icon: Database, label: "Backend", value: "Node.js, Express" },
    { icon: Shield, label: "Security", value: "JWT Authentication" },
    { icon: Globe, label: "Deployment", value: "Cloud Infrastructure" },
    { icon: Smartphone, label: "Responsive", value: "Mobile-First Design" },
    { icon: Zap, label: "Performance", value: "Optimized Loading" }
  ];

  // Key metrics
  const metrics = [
    { icon: Users, number: "1000+", label: "Active Users", color: "text-blue-600" },
    { icon: FileText, number: "500+", label: "Quiz Questions", color: "text-purple-600" },
    { icon: Clock, number: "99.9%", label: "Uptime", color: "text-green-600" },
    { icon: TrendingUp, number: "95%", label: "User Satisfaction", color: "text-orange-600" }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Globe },
    { id: 'admin', label: 'Admin Features', icon: Settings },
    { id: 'user', label: 'User Features', icon: Users },
    { id: 'technical', label: 'Technical', icon: Monitor }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-purple-900/20"></div>
          <div className="absolute top-20 right-20 w-64 h-64 border border-blue-500/20 rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-48 h-48 border border-purple-500/20 rounded-full animate-bounce"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-full text-sm font-medium text-blue-300 mb-6">
              <Award className="w-4 h-4 mr-2" />
              Our Portfolio
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-white">Our</span>{' '}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Work
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
              Discover the innovative solutions we&apos;ve crafted for our clients. Each project represents our commitment to excellence and cutting-edge technology.
            </p>

            {/* Project Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {metrics.map((metric, index) => (
                <div key={metric.label} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <metric.icon className="w-8 h-8 text-blue-400" />
                  </div>
                  <div className={`text-3xl font-bold ${metric.color} mb-2`}>{metric.number}</div>
                  <div className="text-sm text-gray-400">{metric.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Project Showcase */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Project Header */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div className={`transform transition-all duration-1000 delay-200 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
              <div className="space-y-6">
                <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-200/50 rounded-full text-sm font-medium text-blue-700">
                  <Brain className="w-4 h-4 mr-2" />
                  {project.category}
                </div>
                
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">
                  {project.title}
                </h2>
                
                <p className="text-xl text-gray-600 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {project.year}
                  </span>
                  <span className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-1 text-green-500" />
                    {project.status}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <a 
                    href={project.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full font-semibold text-white overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25"
                  >
                    <span className="relative z-10 flex items-center">
                      Visit Live Site
                      <ExternalLink className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </a>
                  
                  <Link href="/contact">
                    <button className="px-8 py-4 border-2 border-gray-300 rounded-full font-semibold text-gray-700 hover:bg-gray-50 transition-all duration-300 hover:border-blue-300">
                      Discuss Your Project
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            <div className={`transform transition-all duration-1000 delay-400 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
              <div className="relative">
                <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4">
                      <h3 className="font-semibold text-gray-900 mb-1">{project.title}</h3>
                      <p className="text-sm text-gray-600">{project.subtitle}</p>
                    </div>
                  </div>
                </div>
                
                {/* Floating elements */}
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg animate-float">
                  <Brain className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Feature Tabs */}
          <div className="mb-16">
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <tab.icon className="w-4 h-4 mr-2" />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-12">
              
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div className="space-y-8">
                  <div className="text-center">
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">Project Overview</h3>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                      PhysicsClasses Live represents a complete educational technology solution, combining intuitive design with powerful functionality to create an engaging learning experience.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-3 gap-8">
                    <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Users className="w-8 h-8 text-white" />
                      </div>
                      <h4 className="text-xl font-bold text-gray-900 mb-2">User-Centric Design</h4>
                      <p className="text-gray-600">Intuitive interface designed for both educators and students</p>
                    </div>

                    <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl">
                      <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <BarChart3 className="w-8 h-8 text-white" />
                      </div>
                      <h4 className="text-xl font-bold text-gray-900 mb-2">Advanced Analytics</h4>
                      <p className="text-gray-600">Comprehensive tracking and reporting capabilities</p>
                    </div>

                    <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl">
                      <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Zap className="w-8 h-8 text-white" />
                      </div>
                      <h4 className="text-xl font-bold text-gray-900 mb-2">High Performance</h4>
                      <p className="text-gray-600">Optimized for speed and reliability</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Admin Features Tab */}
              {activeTab === 'admin' && (
                <div className="space-y-8">
                  <div className="text-center">
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">Admin Dashboard Features</h3>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                      Comprehensive administrative tools designed to streamline content management and provide deep insights into platform performance.
                    </p>
                  </div>

                  <div className="grid lg:grid-cols-2 gap-8">
                    {adminFeatures.map((feature, index) => (
                      <div key={feature.title} className="group p-6 bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl hover:shadow-lg transition-all duration-300">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                            <feature.icon className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h4>
                            <p className="text-gray-600 mb-4">{feature.description}</p>
                            <ul className="space-y-2">
                              {feature.details.map((detail, idx) => (
                                <li key={idx} className="flex items-center text-sm text-gray-500">
                                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                                  {detail}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* User Features Tab */}
              {activeTab === 'user' && (
                <div className="space-y-8">
                  <div className="text-center">
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">User Experience Features</h3>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                      Engaging and intuitive features designed to enhance the learning experience and provide meaningful progress tracking.
                    </p>
                  </div>

                  <div className="grid lg:grid-cols-3 gap-8">
                    {userFeatures.map((feature, index) => (
                      <div key={feature.title} className="group text-center p-8 bg-gradient-to-br from-gray-50 to-purple-50 rounded-2xl hover:shadow-xl transition-all duration-300 hover:scale-105">
                        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                          <feature.icon className="w-8 h-8 text-white" />
                        </div>
                        <h4 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h4>
                        <p className="text-gray-600 mb-6">{feature.description}</p>
                        <ul className="space-y-2 text-left">
                          {feature.details.map((detail, idx) => (
                            <li key={idx} className="flex items-center text-sm text-gray-500">
                              <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Technical Tab */}
              {activeTab === 'technical' && (
                <div className="space-y-8">
                  <div className="text-center">
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">Technical Specifications</h3>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                      Built with modern technologies and best practices to ensure scalability, security, and optimal performance.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {techSpecs.map((spec, index) => (
                      <div key={spec.label} className="flex items-center p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl hover:shadow-md transition-shadow duration-300">
                        <div className="w-12 h-12 bg-gradient-to-r from-gray-600 to-gray-700 rounded-xl flex items-center justify-center mr-4">
                          <spec.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{spec.label}</div>
                          <div className="text-sm text-gray-600">{spec.value}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
                    <h4 className="text-2xl font-bold text-gray-900 mb-4 text-center">Key Technical Achievements</h4>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-center">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                          <span className="text-gray-700">Real-time data synchronization</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                          <span className="text-gray-700">Scalable cloud architecture</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                          <span className="text-gray-700">Advanced security measures</span>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-center">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                          <span className="text-gray-700">Mobile-responsive design</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                          <span className="text-gray-700">Optimized performance</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                          <span className="text-gray-700">Comprehensive analytics</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-600 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-32 h-32 border border-white/20 rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 border border-white/20 rounded-full animate-bounce"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Ready to Build Something Amazing?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Let&apos;s discuss your project and create a solution that exceeds your expectations. Our team is ready to bring your vision to life.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <button className="group relative px-8 py-4 bg-white text-blue-600 rounded-full font-semibold overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                <span className="relative z-10 flex items-center">
                  Start Your Project
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </Link>
            
            <a 
              href={project.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-8 py-4 border-2 border-white/30 rounded-full font-semibold text-white hover:bg-white/10 transition-all duration-300 hover:border-white/50 flex items-center justify-center"
            >
              <ExternalLink className="w-5 h-5 mr-2" />
              View Live Demo
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}