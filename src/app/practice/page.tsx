"use client";
import React from 'react';
import Navbar from '../../components/common/navbar';
import Footer from '../../components/common/footer';
import { Code2, Binary, Database, Brain, Terminal, GitBranch, Beaker, Bug, Cpu, Target, Trophy, Users } from 'lucide-react';

interface PracticeCategoryProps {
  icon: React.ElementType;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  count: number;
  color: string;
}

const PracticePage = () => {
  const categories: PracticeCategoryProps[] = [
    {
      icon: Code2,
      title: "Data Structures",
      description: "Practice implementing and manipulating various data structures",
      difficulty: "Intermediate",
      count: 45,
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Binary,
      title: "Algorithms",
      description: "Solve algorithmic challenges and optimize solutions",
      difficulty: "Advanced",
      count: 60,
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: Database,
      title: "SQL Challenges",
      description: "Master database queries and operations",
      difficulty: "Beginner",
      count: 30,
      color: "from-green-500 to-green-600"
    },
    {
      icon: Brain,
      title: "Problem Solving",
      description: "Enhance your logical thinking and problem-solving skills",
      difficulty: "Intermediate",
      count: 50,
      color: "from-orange-500 to-orange-600"
    },
    {
      icon: Terminal,
      title: "Command Line",
      description: "Learn essential command line operations",
      difficulty: "Beginner",
      count: 25,
      color: "from-teal-500 to-teal-600"
    },
    {
      icon: GitBranch,
      title: "Version Control",
      description: "Practice Git commands and workflows",
      difficulty: "Intermediate",
      count: 35,
      color: "from-red-500 to-red-600"
    },
    {
      icon: Beaker,
      title: "System Design",
      description: "Design scalable systems and architectures",
      difficulty: "Advanced",
      count: 40,
      color: "from-indigo-500 to-indigo-600"
    },
    {
      icon: Bug,
      title: "Debugging",
      description: "Find and fix bugs in code snippets",
      difficulty: "Intermediate",
      count: 30,
      color: "from-pink-500 to-pink-600"
    },
    {
      icon: Cpu,
      title: "Operating Systems",
      description: "Explore OS concepts and implementations",
      difficulty: "Advanced",
      count: 35,
      color: "from-cyan-500 to-cyan-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <div className="pt-16 bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Practice & Perfect Your Skills
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Choose from hundreds of coding challenges across different domains and difficulty levels
            </p>
            <div className="flex flex-wrap justify-center gap-8 text-gray-300">
              <div className="flex items-center">
                <Target className="h-5 w-5 mr-2" />
                <span>9 Categories</span>
              </div>
              <div className="flex items-center">
                <Trophy className="h-5 w-5 mr-2" />
                <span>350+ Challenges</span>
              </div>
              <div className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                <span>5000+ Solutions</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <div 
                key={category.title}
                className="group relative transform hover:-translate-y-1 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl opacity-50 blur group-hover:opacity-60 transition-opacity duration-300"></div>
                <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${category.color} mb-4`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 dark:text-white">{category.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{category.description}</p>
                  <div className="flex items-center justify-between">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      category.difficulty === 'Beginner' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                      category.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                      'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}>
                      {category.difficulty}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400">{category.count} challenges</span>
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

export default PracticePage;