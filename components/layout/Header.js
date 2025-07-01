"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { annotate } from 'rough-notation';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const workRef = useRef(null);
  const contactRef = useRef(null);
  const blogRef = useRef(null);
  const annotationsRef = useRef({});

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Navigation items
  const navItems = [
    { name: 'Home', href: '/', ref: homeRef },
    { name: 'About', href: '/about', ref: aboutRef },
    { name: 'Work', href: '/work', ref: workRef },
    { name: 'Contact', href: '/contact', ref: contactRef },
    { name: 'Blog', href: '/blog', ref: blogRef },
  ];

  useEffect(() => {
    // Clear all existing annotations first
    Object.values(annotationsRef.current).forEach(annotation => {
      if (annotation && annotation.hide) {
        annotation.hide();
      }
    });
    annotationsRef.current = {};

    // Add annotation only to the current active item
    navItems.forEach(({ href, ref, name }) => {
      if (ref.current && pathname === href) {
        const annotation = annotate(ref.current, {
          type: 'underline',
          color: '#3B82F6',
          strokeWidth: 2,
          padding: [2, 4],
          animationDuration: 800,
        });
        annotation.show();
        annotationsRef.current[name] = annotation;
      }
    });

    // Cleanup function
    return () => {
      Object.values(annotationsRef.current).forEach(annotation => {
        if (annotation && annotation.hide) {
          annotation.hide();
        }
      });
    };
  }, [pathname]);

  return (
    <header className="bg-black text-white sticky top-0 z-50">
      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div>
              <h1 className="text-2xl font-bold text-white">PreSQ Innovation</h1>
              <p className="text-xs text-gray-300">Transform Your Business with PreSQ</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-12">
            <nav className="flex items-center space-x-12">
              {navItems.map(({ name, href, ref }) => (
                <Link
                  key={name}
                  href={href}
                  ref={ref}
                  className={`text-white hover:text-blue-400 font-medium transition-colors duration-200 relative ${
                    pathname === href ? 'text-blue-400' : ''
                  }`}
                >
                  {name}
                </Link>
              ))}
            </nav>
          </div>

          {/* CTA Button and Mobile Menu Toggle */}
          <div className="flex items-center space-x-4">
            <Link href="/contact">
              <button className="hidden md:inline-flex bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105">
                Get a Quote
              </button>
            </Link>
            
            {/* Mobile menu button */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 rounded-md text-white hover:text-blue-400 hover:bg-gray-800 transition-colors"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-gray-900 border-t border-gray-700">
          <div className="px-4 py-6 space-y-4">
            {navItems.map(({ name, href }) => (
              <Link
                key={name}
                href={href}
                className={`block py-2 text-white hover:text-blue-400 font-medium transition-colors ${
                  pathname === href ? 'text-blue-400' : ''
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {name}
              </Link>
            ))}
            <Link href="/contact">
              <button className="w-full mt-4 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white py-3 rounded-lg font-medium">
                Get a Quote
              </button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}