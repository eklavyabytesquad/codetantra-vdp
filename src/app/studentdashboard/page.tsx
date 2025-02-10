"use client";
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/authcontext';
import { useRouter } from 'next/navigation';
import {
  UserCircle,
  Book,
  GraduationCap,
  Calendar,
  Clock,
  BookOpen,
  Trophy,
  Target,
  LogOut
} from 'lucide-react';
import supabase from '../utils/supabase';

// Define the type for student profile data
interface StudentProfile {
  id: string;
  name: string;
  registration_number: string;
  department: string;
  year: string;
  semester: string;
  enrolled_courses: number;
  completed_courses: number;
}

export default function StudentDashboard() {
  const { user, userRole, loading, signOut } = useAuth();
  const router = useRouter();
  const [studentProfile, setStudentProfile] = useState<StudentProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Protect the route and fetch student data
    const initializeDashboard = async () => {
      if (!loading) {
        if (!user || userRole !== 'student') {
          router.push('/login');
          return;
        }

        try {
          // Fetch student profile data
          const { data, error } = await supabase
            .from('students')
            .select('*')
            .eq('user_id', user.id)
            .single();

          if (error) throw error;

          if (data) {
            setStudentProfile({
              id: data.id,
              name: data.name || 'Student Name',
              registration_number: data.registration_number || 'Reg. Number',
              department: data.department || 'Department',
              year: data.year || 'Current Year',
              semester: data.semester || 'Current Semester',
              enrolled_courses: data.enrolled_courses || 0,
              completed_courses: data.completed_courses || 0,
            });
          }
        } catch (error) {
          console.error('Error fetching student profile:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    initializeDashboard();
  }, [user, userRole, loading, router]);

  if (loading || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
      {/* Header Section */}
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                <UserCircle className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Welcome back, {studentProfile?.name}
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {user?.email} • {userRole}
                </p>
              </div>
            </div>
            <button
              onClick={() => signOut()}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors duration-200"
            >
              <LogOut className="h-5 w-5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Academic Information */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <GraduationCap className="h-6 w-6 mr-2 text-indigo-600" />
              Academic Information
            </h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <Book className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Registration Number</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{studentProfile?.registration_number}</p>
                </div>
              </div>
              <div className="flex items-center">
                <BookOpen className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Department</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{studentProfile?.department}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Current Session */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Calendar className="h-6 w-6 mr-2 text-indigo-600" />
              Current Session
            </h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Year</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{studentProfile?.year}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Target className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Semester</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{studentProfile?.semester}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Course Progress */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Trophy className="h-6 w-6 mr-2 text-indigo-600" />
              Course Progress
            </h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <Book className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Enrolled Courses</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{studentProfile?.enrolled_courses}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Target className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Completed Courses</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{studentProfile?.completed_courses}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}