"use client";
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/authcontext';
import { useRouter } from 'next/navigation';
import { UserCircle } from 'lucide-react';
import supabase from '../utils/supabase';
import Navbar from '../../components/facultydashbaord/navbar';

interface FacultyProfile {
  id: string;
  name: string;
  email: string;
  department: string;
}

export default function FacultyDashboard() {
  // Get auth context data
  const { user, userRole, loading } = useAuth();
  const router = useRouter();
  const [facultyProfile, setFacultyProfile] = useState<FacultyProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeDashboard = async () => {
      // First, check if we have user data and correct role
      if (!loading) {
        if (!user || userRole !== 'faculty') {
          console.log('Auth state:', { user, userRole, loading });
          router.push('/login');
          return;
        }

        try {
          // Log the current auth state
          console.log('Current auth state:', {
            userEmail: user.email,
            userId: user.id,
            userRole: userRole
          });

          // Fetch faculty data from supabase
          const { data: facultyData, error: facultyError } = await supabase
            .from('faculty')
            .select(`
              id,
              name,
              department,
              user_id
            `)
            .eq('user_id', user.id)
            .single();

          if (facultyError) {
            console.error('Faculty data fetch error:', facultyError);
            throw facultyError;
          }

          // Log the retrieved faculty data
          console.log('Retrieved faculty data:', facultyData);

          // Combine auth user data with faculty data
          if (facultyData) {
            const profileData: FacultyProfile = {
              id: facultyData.id,
              name: facultyData.name || 'Faculty Name',
              email: user.email || 'Email not available', // Use email directly from auth context
              department: facultyData.department || 'Department',
            };

            console.log('Setting faculty profile:', profileData);
            setFacultyProfile(profileData);
          }
        } catch (error) {
          console.error('Dashboard initialization error:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    initializeDashboard();
  }, [user, userRole, loading, router]);

  // Show loading state while authentication or data fetching is in progress
  if (loading || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-800"></div>
      </div>
    );
  }

  // Render the dashboard with user data
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
          <div className="flex items-center space-x-4">
            <div className="h-16 w-16 rounded-full bg-gradient-to-r from-blue-800 to-blue-900 flex items-center justify-center">
              <UserCircle className="h-10 w-10 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {facultyProfile?.name}
              </h1>
              <p className="text-gray-600">
                {user?.email} • {facultyProfile?.department}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}