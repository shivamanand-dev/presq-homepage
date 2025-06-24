"use client";

import { ArrowRight } from 'lucide-react';

export default function CTAButton({ 
  children, 
  variant = "primary", 
  size = "default",
  onClick,
  className = "",
  ...props 
}) {
  const baseClasses = "group relative font-semibold overflow-hidden transition-all duration-300 hover:scale-105";
  
  const variants = {
    primary: "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-2xl hover:shadow-blue-500/25",
    secondary: "border-2 border-white/20 text-white hover:bg-white/10 hover:border-white/40",
    outline: "border-2 border-blue-500/50 text-blue-400 hover:bg-blue-500/10 hover:border-blue-400"
  };

  const sizes = {
    small: "px-6 py-3 text-sm rounded-full",
    default: "px-8 py-4 rounded-full",
    large: "px-10 py-5 text-lg rounded-full"
  };

  const variantClasses = variants[variant] || variants.primary;
  const sizeClasses = sizes[size] || sizes.default;

  return (
    <button 
      className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className}`}
      onClick={onClick}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center">
        {children}
        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
      </span>
      {variant === "primary" && (
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
      )}
    </button>
  );
}