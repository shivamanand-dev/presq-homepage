"use client";

import { Users, Target, Award, Code, Smartphone, Search, TrendingUp, Globe, BarChart3, CheckCircle, ArrowRight, Mail, Phone, MapPin } from 'lucide-react';
import Link from 'next/link';

export default function About() {
  const services = [
    { icon: Code, name: "Custom Website Development", description: "Tailored solutions for your unique needs" },
    { icon: Globe, name: "E-commerce Solutions", description: "Complete online store development" },
    { icon: Smartphone, name: "Responsive Web Design", description: "Mobile-first approach for all devices" },
    { icon: Search, name: "SEO Optimization", description: "Boost your search engine rankings" },
    { icon: BarChart3, name: "Website Maintenance & Support", description: "Ongoing support and updates" },
    { icon: TrendingUp, name: "Digital Marketing", description: "Complete digital growth strategies" }
  ];

  const values = [
    {
      icon: Target,
      title: "Mission Driven",
      description: "We're committed to transforming your digital presence with innovative solutions that drive real results."
    },
    {
      icon: Users,
      title: "Client Focused",
      description: "Your success is our priority. We work closely with you to understand and exceed your expectations."
    },
    {
      icon: Award,
      title: "Quality Excellence",
      description: "We deliver premium solutions with meticulous attention to detail and cutting-edge technology."
    }
  ];

  const stats = [
    { number: "100+", label: "Projects Completed", color: "text-blue-600" },
    { number: "50+", label: "Happy Clients", color: "text-purple-600" },
    { number: "24/7", label: "Support Available", color: "text-green-600" },
    { number: "5+", label: "Years Experience", color: "text-orange-600" }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-32 h-32 border border-blue-200/30 rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 border border-purple-200/30 rounded-full animate-bounce"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-200/50 rounded-full text-sm font-medium text-blue-700 mb-8">
            <Users className="w-4 h-4 mr-2" />
            About PreSQ Innovation
          </div>

          <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-8">
            <span className="text-gray-900">Where</span>{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Creativity
            </span>
            <br />
            <span className="text-gray-900">Meets Technology</span>
          </h1>

          <p className="text-xl text-gray-600 leading-relaxed max-w-4xl mx-auto mb-12">
            Welcome to PreSQ Innovation, where creativity meets technology. We are a passionate team of web development experts dedicated to transforming your digital presence. Our mission is to create stunning, user-friendly websites that drive results and elevate your brand.
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={stat.label} className="text-center">
                <div className={`text-4xl font-bold ${stat.color} mb-2`}>{stat.number}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Our <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Values</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do and drive our commitment to excellence.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={value.title}
                className="group text-center p-8 bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 hover:scale-105"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Our <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Services</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive digital solutions to elevate your business and drive growth.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={service.name}
                className="group bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 hover:scale-105 border border-gray-100"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <service.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{service.name}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>
                  </div>
                </div>
              </div>
            ))}
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
            Ready to Transform Your Digital Presence?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Partner with PreSQ Innovation to bring your vision to life and achieve your online goals. Let's create something amazing together!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <button className="group relative px-8 py-4 bg-white text-blue-600 rounded-full font-semibold overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                <span className="relative z-10 flex items-center">
                  Get Started Today
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </Link>
            
            <Link href="/contact">
              <button className="px-8 py-4 border-2 border-white/30 rounded-full font-semibold text-white hover:bg-white/10 transition-all duration-300 hover:border-white/50">
                Contact Us
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}