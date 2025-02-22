"use client";
import React from 'react';
import Navbar from '../../components/common/navbar';
import Footer from '../../components/common/footer';
import { Code2, Binary, Database, Cpu, Network, Lock, Server, Globe } from 'lucide-react';

interface CourseProps {
  icon: React.ElementType;
  title: string;
  description: string;
  duration: string;
  instructors: number;
  students: number;
  color: string;
}

const CoursesPage = () => {
  const courses: CourseProps[] = [
    {
      icon: Code2,
      title: "Data Structures & Algorithms",
      description: "Master fundamental DSA concepts, problem-solving techniques, and optimization strategies",
      duration: "16 weeks",
      instructors: 4,
      students: 1200,
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Cpu,
      title: "Computer Organization & Architecture",
      description: "Learn computer hardware organization, processor architecture, and system design",
      duration: "14 weeks",
      instructors: 3,
      students: 850,
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: Database,
      title: "Database Management Systems",
      description: "Study database design, SQL, normalization, and transaction management",
      duration: "12 weeks",
      instructors: 3,
      students: 950,
      color: "from-green-500 to-green-600"
    },
    {
      icon: Network,
      title: "Computer Networks",
      description: "Explore networking protocols, architecture, and network security fundamentals",
      duration: "14 weeks",
      instructors: 4,
      students: 780,
      color: "from-orange-500 to-orange-600"
    },
    {
      icon: Lock,
      title: "Information Security",
      description: "Learn cryptography, network security, and cybersecurity best practices",
      duration: "12 weeks",
      instructors: 3,
      students: 650,
      color: "from-red-500 to-red-600"
    },
    {
      icon: Server,
      title: "Operating Systems",
      description: "Study process management, memory management, and file systems",
      duration: "15 weeks",
      instructors: 4,
      students: 890,
      color: "from-teal-500 to-teal-600"
    },
    {
      icon: Binary,
      title: "Theory of Computation",
      description: "Explore automata theory, formal languages, and computational complexity",
      duration: "13 weeks",
      instructors: 3,
      students: 580,
      color: "from-indigo-500 to-indigo-600"
    },
    {
      icon: Globe,
      title: "Web Technologies",
      description: "Master modern web development with React, Node.js, and related technologies",
      duration: "16 weeks",
      instructors: 5,
      students: 1500,
      color: "from-pink-500 to-pink-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <div className="pt-16 bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Explore Our Courses
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Comprehensive computer science courses taught by experienced faculty
            </p>
            <div className="flex flex-wrap justify-center gap-8 text-gray-300">
              <div className="flex items-center">
                <Binary className="h-5 w-5 mr-2" />
                <span>8 Courses</span>
              </div>
              <div className="flex items-center">
                <Code2 className="h-5 w-5 mr-2" />
                <span>29 Instructors</span>
              </div>
              <div className="flex items-center">
                <Database className="h-5 w-5 mr-2" />
                <span>7400+ Students</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => {
            const Icon = course.icon;
            return (
              <div 
                key={course.title}
                className="group relative transform hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl opacity-50 blur group-hover:opacity-60 transition-opacity duration-300"></div>
                <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${course.color} mb-4`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 dark:text-white">{course.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{course.description}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Duration: {course.duration}</span>
                    <span className="text-gray-500 dark:text-gray-400">{course.students} students</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default CoursesPage;