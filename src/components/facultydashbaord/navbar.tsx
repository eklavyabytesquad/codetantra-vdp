"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/context/authcontext';
import {
  Menu,
  PlusCircle,
  BarChart2,
  Users,
  Award,
  Settings,
  LogOut,
  ChevronDown,
  BookOpen,
  GraduationCap,
  Code2,
  Layers,
  Activity,
  Sun,
  Moon
} from 'lucide-react';

const Navbar = () => {
  const { user, signOut } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // Theme toggle handler
  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const menuItems = [
    {
      label: 'Assessment',
      icon: Code2,
      items: [
        { label: 'Create Test', icon: PlusCircle, href: '/create-test' },
        { label: 'Test Results', icon: BarChart2, href: '/results' },
        { label: 'Performance Analytics', icon: Activity, href: '/analytics' }
      ]
    },
    {
      label: 'Management',
      icon: Layers,
      items: [
        { label: 'Student Directory', icon: Users, href: '/students' },
        { label: 'Class Rankings', icon: Award, href: '/rankings' },
        { label: 'Course Materials', icon: BookOpen, href: '/materials' }
      ]
    }
  ];

  return (
    <nav className="fixed top-0 w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl z-50
      border-b border-gray-200/50 dark:border-gray-700/50
      shadow-[0_4px_20px_-4px_rgba(66,153,225,0.2),0_4px_10px_-6px_rgba(0,0,0,0.1)]
      transition-all duration-300">
      
      {/* Binary Pattern Overlay - Subtle background effect */}
      <div className="absolute inset-0 overflow-hidden opacity-5">
        <div className="animate-slide-left whitespace-nowrap text-[8px] leading-none text-black dark:text-white">
          {Array(100).fill('01').join('')}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <Link href="/dashboard" className="relative group">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 
              bg-clip-text text-transparent tracking-tight transition-all duration-300
              group-hover:from-blue-700 group-hover:to-blue-900">
              ClassPro<span className="text-blue-600 dark:text-blue-400">.io</span>
            </div>
            
            {/* Logo hover effect */}
            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r 
              from-blue-600 to-blue-800 group-hover:w-full transition-all duration-300"></div>
          </Link>

          {/* Right-aligned Menu Items */}
          <div className="hidden md:flex items-center space-x-6">
            {menuItems.map((item) => (
              <div key={item.label} className="relative group">
                <button className="flex items-center space-x-2 px-3 py-2 text-gray-700 dark:text-gray-200 
                  hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  <span>{item.label}</span>
                  <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform duration-200" />
                </button>
                
                <div className="absolute right-0 invisible group-hover:visible opacity-0 
                  group-hover:opacity-100 transition-all duration-200 w-56 pt-2">
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg 
                    border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-xl 
                    overflow-hidden">
                    {item.items.map((subItem) => (
                      <Link
                        key={subItem.label}
                        href={subItem.href}
                        className="flex items-center px-4 py-2.5 text-sm text-gray-700 
                          dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-blue-900/20 
                          hover:text-blue-600 dark:hover:text-blue-400 transition-all"
                      >
                        <subItem.icon className="w-4 h-4 mr-3" />
                        <span>{subItem.label}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            {/* Profile Menu */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-3 text-gray-700 dark:text-gray-200"
              >
                <div className="w-9 h-9 rounded-full bg-gradient-to-r from-blue-600 to-blue-800 
                  flex items-center justify-center text-white font-medium text-lg 
                  shadow-lg transition-transform hover:scale-105">
                  {user?.email?.[0].toUpperCase()}
                </div>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 
                  ${isProfileOpen ? 'rotate-180' : ''} hidden md:block`} />
              </button>

              {/* Profile Dropdown */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-3 w-72 bg-white dark:bg-gray-800 
                  rounded-lg shadow-lg border border-gray-200/50 dark:border-gray-700/50 
                  backdrop-blur-xl py-2 animate-fade-in">
                  <div className="px-4 py-3 border-b border-gray-200/80 dark:border-gray-700/80">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Signed in as</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{user?.email}</p>
                  </div>

                  {/* Theme Toggle */}
                  <div className="px-4 py-3 border-b border-gray-200/80 dark:border-gray-700/80">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700 dark:text-gray-300">Theme</span>
                      <button
                        onClick={toggleTheme}
                        className="relative w-16 h-8 rounded-full bg-gradient-to-r from-blue-600 to-blue-800 
                          p-1 shadow-[0_2px_10px_-2px_rgba(66,153,225,0.4)] transition-all duration-300
                          hover:shadow-[0_4px_12px_-2px_rgba(66,153,225,0.6)]"
                      >
                        <div className={`absolute top-1 w-6 h-6 rounded-full bg-white shadow-md
                          transform transition-transform duration-300 flex items-center justify-center
                          ${isDark ? 'translate-x-8 bg-gray-800' : 'translate-x-0'}`}>
                          {isDark ? (
                            <Moon className="w-4 h-4 text-blue-400" />
                          ) : (
                            <Sun className="w-4 h-4 text-blue-600" />
                          )}
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Profile Options */}
                  <div className="py-2">
                    <Link href="/settings" 
                      className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 
                        hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                      <Settings className="w-4 h-4 mr-3 text-gray-500 dark:text-gray-400" />
                      Settings
                    </Link>
                    
                    <button
                      onClick={() => signOut()}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 
                        dark:text-red-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                    >
                      <LogOut className="w-4 h-4 mr-3" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-700 dark:text-gray-200 
              hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-700 bg-white/95 dark:bg-gray-900/95">
          <div className="px-4 py-3 space-y-4">
            {menuItems.map((section) => (
              <div key={section.label}>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{section.label}</h3>
                <div className="mt-2 space-y-1">
                  {section.items.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="flex items-center px-3 py-2 text-sm text-gray-700 dark:text-gray-200 
                        rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      <item.icon className="w-4 h-4 mr-3 text-gray-500 dark:text-gray-400" />
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;