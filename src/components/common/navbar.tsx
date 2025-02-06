"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Menu, 
  X, 
  BookOpen, 
  Code, 
  Users, 
  Lightbulb, 
  Library,
  GraduationCap,
  UserCircle,
  ChevronDown 
} from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const menuItems = [
    { name: 'Learn', icon: BookOpen, href: '/learn' },
    { name: 'Practice', icon: Code, href: '/practice' },
    { name: 'Community', icon: Users, href: '/community' },
    { name: 'Resources', icon: Library, href: '/resources' },
    { name: 'Materials', icon: Lightbulb, href: '/materials' },
  ];

  const loginOptions = [
    { name: 'Student Login', icon: GraduationCap, href: '/login' },
    { name: 'Faculty Login', icon: Users, href: '/login' },
    { name: 'Admin Login', icon: UserCircle, href: '/login' },
  ];

  return (
    <nav className="fixed w-full z-50 backdrop-blur-md bg-white/70 dark:bg-gray-900/70 border-b border-gray-200/20 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and brand name */}
          <div className="flex items-center space-x-3">
            <div className="text-2xl font-bold relative">
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text drop-shadow-sm">
                SRM CodeHub
              </span>
              {/* Decorative element */}
              <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full"></div>
            </div>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center space-x-2 text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
              >
                <item.icon className="h-5 w-5" />
                <span className="font-medium">{item.name}</span>
              </Link>
            ))}

            {/* Login Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsLoginOpen(!isLoginOpen)}
                className="flex items-center space-x-2 text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
              >
                <UserCircle className="h-5 w-5" />
                <span className="font-medium">Login</span>
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isLoginOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Apple-style dropdown */}
              {isLoginOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-lg backdrop-blur-xl bg-white/90 dark:bg-gray-800/90 shadow-lg ring-1 ring-black/5 dark:ring-white/10 p-1">
                  {loginOptions.map((option) => (
                    <Link
                      key={option.name}
                      href={option.href}
                      className="flex items-center space-x-2 px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-md transition-colors duration-200"
                      onClick={() => setIsLoginOpen(false)}
                    >
                      <option.icon className="h-5 w-5" />
                      <span>{option.name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden pb-4 backdrop-blur-xl bg-white/90 dark:bg-gray-800/90 rounded-lg mt-2">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center space-x-2 py-3 px-4 text-gray-700 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-md transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            ))}
            <div className="border-t border-gray-200 dark:border-gray-700 mt-2 pt-2">
              {loginOptions.map((option) => (
                <Link
                  key={option.name}
                  href={option.href}
                  className="flex items-center space-x-2 py-3 px-4 text-gray-700 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-md transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  <option.icon className="h-5 w-5" />
                  <span>{option.name}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;