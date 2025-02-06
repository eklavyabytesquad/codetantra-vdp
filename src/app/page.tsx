"use client"

import React, { useEffect } from 'react';
import Link from 'next/link';
import Navbar from '../components/common/navbar';
import Footer from '../components/common/footer';
import { ArrowRight, Code, Users, Brain, Rocket, BookOpen, Target, Trophy } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

// Define interfaces for better type safety
interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  color: 'indigo' | 'purple';
}

const HomePage: React.FC = () => {
  useEffect(() => {
    const observerOptions: IntersectionObserverInit = {
      threshold: 0.1,
      rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((elem) => {
      observer.observe(elem);
    });

    return () => observer.disconnect();
  }, []);

  // Define features array with proper typing
  const features: Feature[] = [
    {
      icon: Code,
      title: "Learn to Code",
      description: "Start your coding journey with structured learning paths and hands-on projects.",
      color: "indigo"
    },
    {
      icon: Brain,
      title: "Practice & Grow",
      description: "Strengthen your skills with coding challenges and real-world problems.",
      color: "purple"
    },
    {
      icon: Rocket,
      title: "Build Projects",
      description: "Create amazing projects and build your portfolio with fellow students.",
      color: "indigo"
    },
    {
      icon: BookOpen,
      title: "Access Resources",
      description: "Get access to curated learning materials and documentation.",
      color: "purple"
    },
    {
      icon: Target,
      title: "Set Goals",
      description: "Track your progress and achieve your coding milestones.",
      color: "indigo"
    },
    {
      icon: Trophy,
      title: "Earn Certificates",
      description: "Get recognized for your achievements and skills.",
      color: "purple"
    }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      
      {/* Hero Section with proper navbar spacing */}
      <div className="relative overflow-hidden pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center animate-on-scroll opacity-0 transform translate-y-8 transition-all duration-1000">
            <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text leading-tight">
              For SRM Students,
              <br />
              By SRM Students
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Join the next generation of developers. Learn, code, and build amazing projects with your fellow students.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                href="/learn"
                className="group inline-flex items-center px-8 py-4 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold hover:opacity-90 transition-all duration-300 transform hover:scale-105"
              >
                Get Started with Learning
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/community"
                className="group inline-flex items-center px-8 py-4 rounded-full border-2 border-indigo-600 text-indigo-600 font-semibold hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-all duration-300 transform hover:scale-105"
              >
                Join Community
                <Users className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* Feature Cards with enhanced design */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className={`animate-on-scroll opacity-0 transform translate-y-8 transition-all duration-1000 transition-delay-${index * 100}`}
              >
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl opacity-50 blur-xl group-hover:opacity-75 transition-opacity duration-300"></div>
                  <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-1">
                    <feature.icon className={`h-12 w-12 text-${feature.color}-600 mb-4`} />
                    <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default HomePage;