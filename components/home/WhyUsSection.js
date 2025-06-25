"use client";

import { Shield, Zap, Users, Clock, Award, CheckCircle, ArrowRight, Star } from 'lucide-react';

export default function WhyUsSection() {
  const reasons = [
    {
      icon: Shield,
      title: "Proven Expertise",
      description: "5+ years of experience delivering exceptional digital solutions with cutting-edge technology.",
      image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Zap,
      title: "Lightning Fast Delivery",
      description: "We deliver projects on time without compromising quality, ensuring your business stays ahead.",
      image: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: Users,
      title: "Dedicated Support",
      description: "24/7 support and maintenance to keep your digital presence running smoothly and efficiently.",
      image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: Award,
      title: "Award-Winning Quality",
      description: "Premium solutions that exceed expectations and drive measurable business results.",
      image: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=800",
      gradient: "from-orange-500 to-red-500"
    }
  ];

  const achievements = [
    { icon: Star, number: "100+", label: "Projects Delivered", color: "text-blue-600" },
    { icon: Users, number: "50+", label: "Happy Clients", color: "text-purple-600" },
    { icon: Award, number: "98%", label: "Success Rate", color: "text-green-600" },
    { icon: Clock, number: "24/7", label: "Support", color: "text-orange-600" }
  ];

  const testimonialHighlights = [
    "Exceptional quality and attention to detail",
    "Lightning-fast project delivery",
    "Outstanding customer support",
    "Innovative solutions that drive results"
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-r from-blue-100/20 to-purple-100/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-48 h-48 bg-gradient-to-r from-purple-100/20 to-pink-100/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-blue-200/20 rounded-full"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-200/50 rounded-full text-sm font-medium text-blue-700 mb-6">
            <Award className="w-4 h-4 mr-2" />
            Why Choose PreSQ Innovation
          </div>
          
          <h2 className="text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-gray-900">Why</span>{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              We're Different
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We don't just build websites – we craft digital experiences that transform businesses and drive real results. Here's what sets us apart.
          </p>
        </div>

        {/* Main Reasons Grid */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {reasons.map((reason, index) => (
            <div
              key={reason.title}
              className={`group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              }`}
            >
              {/* Image Section */}
              <div className="relative h-64 lg:h-80 overflow-hidden">
                <img
                  src={reason.image}
                  alt={reason.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className={`absolute inset-0 bg-gradient-to-br ${reason.gradient} opacity-20 group-hover:opacity-30 transition-opacity duration-500`}></div>
                
                {/* Floating Icon */}
                <div className={`absolute top-6 left-6 w-16 h-16 bg-gradient-to-r ${reason.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <reason.icon className="w-8 h-8 text-white" />
                </div>
              </div>

              {/* Content Section */}
              <div className="p-8 lg:p-10">
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                  {reason.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg mb-6">
                  {reason.description}
                </p>
                
                {/* Feature Badge */}
                <div className="inline-flex items-center px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-700">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                  Guaranteed Results
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Achievements Section */}
        <div className="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 rounded-3xl p-8 lg:p-12 text-white mb-16 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-10 right-10 w-32 h-32 border border-white/10 rounded-full animate-pulse"></div>
            <div className="absolute bottom-10 left-10 w-24 h-24 border border-white/10 rounded-full animate-bounce"></div>
          </div>
          
          <div className="relative z-10">
            <div className="text-center mb-12">
              <h3 className="text-3xl lg:text-4xl font-bold mb-4">
                Our Track Record Speaks for Itself
              </h3>
              <p className="text-blue-200 text-lg">
                Numbers that showcase our commitment to excellence
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {achievements.map((achievement, index) => (
                <div
                  key={achievement.label}
                  className="text-center group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-white/20 transition-colors duration-300">
                    <achievement.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-4xl font-bold text-white mb-2">{achievement.number}</div>
                  <div className="text-blue-200 font-medium">{achievement.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Testimonial Highlights */}
        <div className="bg-white rounded-3xl shadow-lg p-8 lg:p-12 mb-16">
          <div className="text-center mb-10">
            <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              What Our Clients Say
            </h3>
            <p className="text-gray-600 text-lg">
              The feedback that drives us to excel every day
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {testimonialHighlights.map((highlight, index) => (
              <div
                key={index}
                className="flex items-center space-x-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl hover:shadow-md transition-shadow duration-300"
              >
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <p className="text-gray-700 font-medium">{highlight}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 lg:p-12 text-white relative overflow-hidden">
            <div className="absolute inset-0">
              <div className="absolute top-6 right-6 w-20 h-20 border border-white/20 rounded-full"></div>
              <div className="absolute bottom-6 left-6 w-16 h-16 border border-white/20 rounded-full"></div>
            </div>
            
            <div className="relative z-10">
              <h3 className="text-3xl lg:text-4xl font-bold mb-4">
                Ready to Experience the PreSQ Difference?
              </h3>
              <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
                Join 50+ satisfied clients who've transformed their digital presence with our expert solutions.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="group relative px-8 py-4 bg-white text-blue-600 rounded-full font-semibold overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                  <span className="relative z-10 flex items-center">
                    Start Your Project
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
                
                <button className="px-8 py-4 border-2 border-white/30 rounded-full font-semibold text-white hover:bg-white/10 transition-all duration-300 hover:border-white/50">
                  View Our Portfolio
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}