"use client";

import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/authcontext';
import { useRouter } from 'next/navigation';
import { 
  UserCircle, 
  Bell,
  Settings,
  Activity,
  Users,
  BarChart3
} from 'lucide-react';
import supabase from '../utils/supabase';
import Navbar from '../../components/superadmindashboard/navbar';
import CreateAdmin from '../../components/superadmindashboard/create-admin';
import DepartmentManagement from '../../components/superadmindashboard/department-management';
import HODManagement from '../../components/superadmindashboard/admin-management';

interface SuperadminProfile {
  id: string;
  name: string;
  email: string;
}

export default function SuperadminDashboard() {
  const { user, userRole, loading } = useAuth();
  const router = useRouter();
  const [profile, setProfile] = useState<SuperadminProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeDashboard = async () => {
      if (!loading) {
        if (!user || userRole !== 'superadmin') {
          router.push('/login');
          return;
        }

        try {
          const { data: profileData, error: profileError } = await supabase
            .from('superadmin')
            .select('id, name, email')
            .eq('email', user.email)
            .single();

          if (profileError) throw profileError;

          if (profileData) {
            setProfile({
              id: profileData.id,
              name: profileData.name || 'Superadmin',
              email: user.email || 'Email not available',
            });
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

  if (loading || isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-800"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Navbar />
      <main className="pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8 border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="h-16 w-16 rounded-full bg-gradient-to-r from-blue-600 to-blue-800 flex items-center justify-center">
                <UserCircle className="h-10 w-10 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{profile?.name}</h1>
                <p className="text-gray-600">{profile?.email} • Superadmin</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                <Bell className="h-6 w-6 text-gray-600" />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                <Settings className="h-6 w-6 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Department Management */}
        <section className="bg-white rounded-2xl shadow-sm p-6 mb-8 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Department Management</h2>
              <p className="text-sm text-gray-600 mt-1">Manage and organize academic departments</p>
            </div>
            <Activity className="h-5 w-5 text-gray-600" />
          </div>
          <DepartmentManagement />
        </section>

        {/* HOD Management Section - Side by Side Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Create Admin Section */}
          <section className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Add Head of Department</h2>
                <p className="text-sm text-gray-600 mt-1">Create new department administrators</p>
              </div>
              <Users className="h-5 w-5 text-gray-600" />
            </div>
            <CreateAdmin />
          </section>

          {/* HOD Management Section */}
          <section className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Manage HODs</h2>
                <p className="text-sm text-gray-600 mt-1">View and manage existing HODs</p>
              </div>
              <Users className="h-5 w-5 text-gray-600" />
            </div>
            <HODManagement />
          </section>
        </div>

        {/* Analytics Section */}
        <section className="bg-white rounded-2xl shadow-sm p-6 mb-8 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Department Analytics</h2>
              <p className="text-sm text-gray-600 mt-1">Track department performance and metrics</p>
            </div>
            <BarChart3 className="h-5 w-5 text-gray-600" />
          </div>
          <div className="h-96 bg-gray-50 rounded-xl flex items-center justify-center border border-gray-200">
            <p className="text-gray-500">Analytics visualization will be displayed here</p>
          </div>
        </section>
      </main>
    </div>
  );
}