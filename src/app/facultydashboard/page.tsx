"use client";

import React from 'react';
import { 
  Users, 
  Code2,
  Trophy,
  PlusCircle,
  BellRing,
  Book,
  Binary,
  Database,
  Calendar,
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock data for the performance graph
const performanceData = [
  { month: 'Jan', python: 82, cpp: 75, dsa: 68 },
  { month: 'Feb', python: 85, cpp: 78, dsa: 72 },
  { month: 'Mar', python: 88, cpp: 82, dsa: 75 },
  { month: 'Apr', python: 85, cpp: 80, dsa: 78 },
  { month: 'May', python: 90, cpp: 85, dsa: 80 },
  { month: 'Jun', python: 92, cpp: 88, dsa: 83 },
];

const FacultyDashboard = () => {

  // Mock data for quick stats
  const stats = [
    { 
      label: 'Total Students', 
      value: '284', 
      icon: Users, 
      color: 'bg-blue-500',
      subtext: '+12 this week'
    },
    { 
      label: 'Course Completion', 
      value: '76%', 
      icon: Trophy, 
      color: 'bg-green-500',
      subtext: 'Avg. completion rate'
    },
    { 
      label: 'Active Assignments', 
      value: '18', 
      icon: Code2, 
      color: 'bg-purple-500',
      subtext: '5 due this week'
    },
    { 
      label: 'Success Rate', 
      value: '82%', 
      icon: Trophy, 
      color: 'bg-orange-500',
      subtext: '+5% from last month'
    },
  ];

  // Mock data for recent activities
  const recentActivities = [
    { 
      id: 1, 
      title: 'Advanced DSA Assignment', 
      date: '2025-02-10', 
      type: 'assignment',
      status: 'ongoing',
      submissions: 45,
      totalStudents: 56
    },
    { 
      id: 2, 
      title: 'Python OOP Concepts', 
      date: '2025-02-08', 
      type: 'quiz',
      status: 'completed',
      avgScore: 85
    },
    { 
      id: 3, 
      title: 'C++ Templates Test', 
      date: '2025-02-07', 
      type: 'test',
      status: 'grading',
      submissions: 52,
      totalStudents: 52
    },
  ];

  // Mock student data
  const currentStudents = [
    {
      id: 1001,
      name: "Alex Johnson",
      pythonProgress: 85,
      cppProgress: 78,
      dsaProgress: 72,
      recentSubmission: "Binary Search Implementation",
      lastActive: "2 hours ago",
      submissionHistory: [
        { score: 88 },
        { score: 75 }
      ]
    },
    {
      id: 1002,
      name: "Sarah Chen",
      pythonProgress: 92,
      cppProgress: 88,
      dsaProgress: 85,
      recentSubmission: "AVL Trees",
      lastActive: "1 day ago",
      submissionHistory: [
        { score: 95 },
        { score: 92 }
      ]
    },
    {
      id: 1003,
      name: "Miguel Rodriguez",
      pythonProgress: 75,
      cppProgress: 82,
      dsaProgress: 68,
      recentSubmission: "Dynamic Programming",
      lastActive: "3 hours ago",
      submissionHistory: [
        { score: 72 },
        { score: 85 }
      ]
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Code2 className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-800">CodeMentor Dashboard</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3 bg-gray-100 rounded-full px-4 py-2">
                <Binary className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-medium">DSA Track</span>
              </div>
              <button className="p-2 rounded-full hover:bg-gray-100 relative">
                <BellRing className="h-6 w-6 text-gray-600" />
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
              </button>
              <div className="flex items-center">
                <img
                  className="h-8 w-8 rounded-full border-2 border-blue-500"
                  src="/api/placeholder/32/32"
                  alt="Profile"
                />
                <div className="ml-2">
                  <span className="block text-sm font-medium text-gray-700">Dr. MEENAKSHI K</span>
                  <span className="block text-xs text-gray-500">Senior Instructor</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Course Track Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {[
            { name: 'Python Track', icon: Book, students: 156, activeModules: 8, color: 'bg-blue-500' },
            { name: 'C++ Track', icon: Database, students: 142, activeModules: 6, color: 'bg-green-500' },
            { name: 'DSA Track', icon: Binary, students: 198, activeModules: 10, color: 'bg-purple-500' },
          ].map((track, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`${track.color} rounded-full p-3`}>
                    <track.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">{track.name}</h3>
                    <p className="text-sm text-gray-500">{track.students} enrolled students</p>
                  </div>
                </div>
                <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-green-100 text-green-800">
                  {track.activeModules} active modules
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-6 border border-gray-100">
              <div className="flex items-center">
                <div className={`${stat.color} rounded-full p-3`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                  <p className="text-xs text-gray-500 mt-1">{stat.subtext}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Create Test Button */}
        <div className="mb-8 flex justify-between items-center">
          <button 
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-sm"
          >
            <PlusCircle className="h-5 w-5 mr-2" />
            Create New Assessment
          </button>
          <div className="flex space-x-2">
            <select className="border border-gray-300 rounded-md text-sm px-3 py-2">
              <option>All Tracks</option>
              <option>Python</option>
              <option>C++</option>
              <option>DSA</option>
            </select>
            <select className="border border-gray-300 rounded-md text-sm px-3 py-2">
              <option>This Month</option>
              <option>Last Month</option>
              <option>Last 3 Months</option>
            </select>
          </div>
        </div>

        {/* Three Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Performance Graph */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow p-6 border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Performance by Track</h2>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                  <span className="text-sm text-gray-600">Python</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-sm text-gray-600">C++</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                  <span className="text-sm text-gray-600">DSA</span>
                </div>
              </div>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="python" 
                    stroke="#3B82F6" 
                    strokeWidth={2}
                    dot={{ fill: '#3B82F6' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="cpp" 
                    stroke="#10B981" 
                    strokeWidth={2}
                    dot={{ fill: '#10B981' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="dsa" 
                    stroke="#8B5CF6" 
                    strokeWidth={2}
                    dot={{ fill: '#8B5CF6' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Activities */}
          <div className="bg-white rounded-lg shadow p-6 border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Assessments</h2>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 text-gray-600" />
                      <h3 className="ml-2 text-sm font-medium text-gray-900">{activity.title}</h3>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      activity.status === 'ongoing' ? 'bg-yellow-100 text-yellow-800' :
                      activity.status === 'completed' ? 'bg-green-100 text-green-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {activity.status}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500">
                    {new Date(activity.date).toLocaleDateString()}
                  </div>
                  {activity.submissions && (
                    <div className="mt-2 flex items-center text-sm text-gray-600">
                      <Users className="h-4 w-4 mr-1" />
                      {activity.submissions}/{activity.totalStudents} submissions
                    </div>
                  )}
                  {activity.avgScore && (
                    <div className="mt-2 flex items-center text-sm text-gray-600">
                      <Trophy className="h-4 w-4 mr-1" />
                      Average Score: {activity.avgScore}%
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Student Progress Section */}
          <div className="lg:col-span-3 bg-white rounded-lg shadow p-6 border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Student Progress Overview</h2>
              <div className="flex space-x-2"><button className="px-3 py-1 text-sm bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200">
                  Export Report
                </button>
                <select className="text-sm border rounded-md px-2">
                  <option>All Students</option>
                  <option>Top Performers</option>
                  <option>Needs Attention</option>
                </select>
              </div>
            </div>
            
            <div className="overflow-x-auto rounded-lg border border-gray-200">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Student
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Python Track
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      C++ Track
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      DSA Track
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Recent Activity
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentStudents.map((student) => (
                    <tr 
                      key={student.id} 
                      className="hover:bg-gray-50 transition-colors duration-150 ease-in-out"
                    >
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img 
                            className="h-8 w-8 rounded-full border border-gray-200" 
                            src={`/api/placeholder/32/32`}
                            alt={student.name} 
                          />
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900">{student.name}</div>
                            <div className="text-sm text-gray-500">ID: {student.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="space-y-1">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${student.pythonProgress}%` }}
                            />
                          </div>
                          <div className="flex justify-between text-xs">
                            <span className="text-gray-600">{student.pythonProgress}%</span>
                            <span className="text-gray-500">
                              {student.submissionHistory[0].score}% last score
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="space-y-1">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-green-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${student.cppProgress}%` }}
                            />
                          </div>
                          <div className="flex justify-between text-xs">
                            <span className="text-gray-600">{student.cppProgress}%</span>
                            <span className="text-gray-500">
                              {student.submissionHistory[1].score}% last score
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="space-y-1">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${student.dsaProgress}%` }}
                            />
                          </div>
                          <div className="flex justify-between text-xs">
                            <span className="text-gray-600">{student.dsaProgress}%</span>
                            <span className="text-gray-500">+5% this week</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm text-gray-900">{student.recentSubmission}</div>
                          <div className="text-xs text-gray-500">{student.lastActive}</div>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        {Math.min(student.pythonProgress, student.cppProgress, student.dsaProgress) < 75 ? (
                          <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800 flex items-center w-fit">
                            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            Needs Attention
                          </span>
                        ) : (
                          <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 flex items-center w-fit">
                            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            On Track
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FacultyDashboard;