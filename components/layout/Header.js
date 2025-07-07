'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { annotate } from 'rough-notation';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [annotationsLoaded, setAnnotationsLoaded] = useState(false);
  const pathname = usePathname();
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const workRef = useRef(null);
  const contactRef = useRef(null);
  const blogRef = useRef(null);
  const annotationsRef = useRef({});
  const timeoutRef = useRef(null);

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

  // Handle client-side mounting
  useEffect(() => {
    setIsClient(true);

    // Delay annotation loading to prevent flickering
    const timer = setTimeout(() => {
      setAnnotationsLoaded(true);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  // Handle rough-notation annotations
  useEffect(() => {
    if (!isClient || !annotationsLoaded) return;

    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Clear all existing annotations
    Object.values(annotationsRef.current).forEach(annotation => {
      if (annotation && annotation.hide) {
        try {
          annotation.hide();
        } catch (error) {
          console.warn('Error hiding annotation:', error);
        }
      }
    });
    annotationsRef.current = {};

    // Add new annotation with delay to ensure DOM is ready
    timeoutRef.current = setTimeout(() => {
      navItems.forEach(({ href, ref, name }) => {
        if (ref.current && pathname === href) {
          try {
            const annotation = annotate(ref.current, {
              type: 'underline',
              color: '#3B82F6',
              strokeWidth: 2,
              padding: [0, 2, 4, 2], // top, right, bottom, left
              animationDuration: 600,
              multiline: false,
            });
            annotation.show();
            annotationsRef.current[name] = annotation;
          } catch (error) {
            console.warn('Error creating annotation:', error);
          }
        }
      });
    }, 150);

    // Cleanup function
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      Object.values(annotationsRef.current).forEach(annotation => {
        if (annotation && annotation.hide) {
          try {
            annotation.hide();
          } catch (error) {
            console.warn('Error cleaning up annotation:', error);
          }
        }
      });
    };
  }, [pathname, isClient, annotationsLoaded]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      Object.values(annotationsRef.current).forEach(annotation => {
        if (annotation && annotation.hide) {
          try {
            annotation.hide();
          } catch (error) {
            console.warn('Error on unmount cleanup:', error);
          }
        }
      });
    };
  }, []);

  return (
    <header className="bg-black text-white sticky top-0 z-50 border-b border-gray-800/50">
      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <div className="transition-transform duration-300 group-hover:scale-105">
              <h1 className="text-2xl font-bold text-white">PreSQ Innovation</h1>
              <p className="text-xs text-gray-300">Transform Your Business with PreSQ</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-12">
            <nav className="flex items-center space-x-12">
              {navItems.map(({ name, href, ref }) => (
                <div key={name} className="nav-link-container">
                  <Link
                    href={href}
                    ref={ref}
                    className={`nav-link text-white hover:text-blue-400 font-medium transition-colors duration-200 relative inline-block ${
                      pathname === href ? 'text-blue-400' : ''
                    }`}
                  >
                    {name}
                  </Link>
                </div>
              ))}
            </nav>
          </div>

          {/* CTA Button and Mobile Menu Toggle */}
          <div className="flex items-center space-x-4">
            <Link href="/contact">
              <button className="hidden md:inline-flex bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                Get a Quote
              </button>
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 rounded-md text-white hover:text-blue-400 hover:bg-gray-800 transition-all duration-300"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`lg:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <div className="bg-gray-900 border-t border-gray-700">
          <div className="px-4 py-6 space-y-4">
            {navItems.map(({ name, href }) => (
              <Link
                key={name}
                href={href}
                className={`block py-3 px-4 rounded-lg text-white hover:text-blue-400 hover:bg-gray-800 font-medium transition-all duration-300 ${
                  pathname === href ? 'text-blue-400 bg-gray-800' : ''
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {name}
              </Link>
            ))}
            <Link href="/contact">
              <button
                className="w-full mt-4 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white py-3 rounded-lg font-medium transition-all duration-300 shadow-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Get a Quote
              </button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
