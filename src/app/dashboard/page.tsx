"use client"

import React, { useEffect, useState } from 'react';
import { 
  UserCircle, 
  Book, 
  GraduationCap,
  Phone,
  Mail,
  Building,
  Clock,
  CalendarDays
} from 'lucide-react';
import supabase from '../utils/supabase';

// Define the type for our student data structure
interface StudentDetails {
  id: string;
  name: string;
  email: string;
  registration_number: string;
  phone: string;
  session: string;
  department: {
    name: string;
    code: string;
  };
  class: {
    name: string;
    academic_year: string;
  };
}

export default function Dashboard() {
  const [studentDetails, setStudentDetails] = useState<StudentDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStudentDetails() {
      try {
        // Fetch the first student record with related information
        const { data, error } = await supabase
          .from('students')
          .select(`
            *,
            user:users(email),
            department:departments(name, code),
            class:classes(name, academic_year)
          `)
          .limit(1)
          .single();

        if (error) {
          console.error('Error details:', error);
          throw error;
        }

        if (data) {
          // Transform the data to match our interface
          const formattedData: StudentDetails = {
            id: data.id,
            name: data.name,
            email: data.user.email,
            registration_number: data.registration_number,
            phone: data.phone,
            session: data.session,
            department: data.department,
            class: data.class
          };
          
          console.log('Fetched student data:', formattedData);
          setStudentDetails(formattedData);
        }
      } catch (err) {
        console.error('Error fetching student details:', err);
        setError('Failed to load student information');
      } finally {
        setIsLoading(false);
      }
    }

    fetchStudentDetails();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">Loading student information...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16 flex items-center justify-center">
        <div className="text-center text-red-600 dark:text-red-400">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!studentDetails) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-300">No student information found in database</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
      {/* Welcome Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Welcome, {studentDetails.name}
              </h1>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Registration Number: {studentDetails.registration_number}
              </p>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Student Information Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Personal Information */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <UserCircle className="h-6 w-6 mr-2 text-indigo-600" />
              Personal Information
            </h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Email</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{studentDetails.email}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Phone</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{studentDetails.phone || 'Not provided'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Academic Information */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <GraduationCap className="h-6 w-6 mr-2 text-indigo-600" />
              Academic Information
            </h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <Building className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Department</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {studentDetails.department?.name} ({studentDetails.department?.code})
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <Book className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Class</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {studentDetails.class?.name}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Session Information */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <CalendarDays className="h-6 w-6 mr-2 text-indigo-600" />
              Session Information
            </h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Current Session</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{studentDetails.session}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Book className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Academic Year</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {studentDetails.class?.academic_year}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}