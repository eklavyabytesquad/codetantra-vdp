"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Lock, UserCircle, Check, AlertCircle, Home } from 'lucide-react';
import Link from 'next/link';
import supabase from '../utils/supabase';

// Define the type for user roles to match our database
type UserRole = 'student' | 'faculty' | 'admin' | 'superadmin';

// Define error type for better type safety
interface LoginError extends Error {
  message: string;
}

export default function LoginPage() {
  const router = useRouter();
  
  // Form state with proper typing for user role
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    userRole: '' as UserRole | ''
  });

  // State for form validation and UI feedback
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidated, setIsValidated] = useState(false);

  // Email validation helper function
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValidEmail(emailRegex.test(email));
  };

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === 'email') validateEmail(value);
    setError(null);
  };

  // Map user roles to their corresponding dashboard routes
  const handleDashboardRouting = (userRole: string) => {
    const dashboardRoutes: Record<string, string> = {
      student: '/studentdashboard',
      faculty: '/facultydashboard',
      admin: '/admindashboard',
      superadmin: '/superadmindashboard'
    };
    return dashboardRoutes[userRole] || '/dashboard';
  };

  // Handle form submission
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // First attempt to authenticate the user
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password
      });

      if (authError) throw authError;

      if (authData.user) {
        // After successful authentication, verify user role
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('user_role')
          .eq('id', authData.user.id)
          .single();

        if (profileError) throw profileError;

        // Verify the selected role matches the user's actual role
        if (profileData?.user_role !== formData.userRole) {
          throw new Error('Selected role does not match your account permissions');
        }

        setIsValidated(true);

        // Successfully validated, redirect to appropriate dashboard
        setTimeout(() => {
          router.push(handleDashboardRouting(profileData.user_role));
        }, 1000);
      }
    } catch (err) {
      const error = err as LoginError;
      setError(error.message);
      setIsValidated(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-50 p-4">
      {/* Home Button */}
      <Link
        href="/"
        className="absolute top-4 left-4 p-2 flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors rounded-lg hover:bg-blue-50"
      >
        <Home className="h-5 w-5" />
        <span className="font-medium">Back to Home</span>
      </Link>

      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="inline-flex p-3 rounded-full bg-blue-50 mb-4">
              <UserCircle className="h-10 w-10 text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
            <p className="text-gray-500 mt-2">Sign in to your account</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Error Display */}
            {error && (
              <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-lg p-4">
                <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                {isValidEmail && (
                  <Check className="absolute right-3 top-3.5 h-5 w-5 text-green-500" />
                )}
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className={`pl-10 pr-10 w-full h-12 bg-gray-50 text-gray-900 rounded-lg border 
                    ${isValidEmail ? 'border-green-500' : 'border-gray-300'} 
                    focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                {isValidated && (
                  <Check className="absolute right-3 top-3.5 h-5 w-5 text-green-500" />
                )}
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className={`pl-10 pr-10 w-full h-12 bg-gray-50 text-gray-900 rounded-lg border 
                    ${isValidated ? 'border-green-500' : 'border-gray-300'} 
                    focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  placeholder="Enter your password"
                />
              </div>
            </div>

            {/* User Role Selection */}
            <div className="space-y-2">
              <label htmlFor="userRole" className="block text-sm font-medium text-gray-700">
                Select User Role
              </label>
              <select
                id="userRole"
                name="userRole"
                required
                value={formData.userRole}
                onChange={handleChange}
                className="w-full h-12 bg-gray-50 text-gray-900 rounded-lg border border-gray-300 
                  focus:ring-2 focus:ring-blue-500 focus:border-transparent pl-4 pr-10"
              >
                <option value="">Select your role</option>
                <option value="student">Student</option>
                <option value="faculty">Faculty</option>
                <option value="admin">Admin</option>
                <option value="superadmin">Super Admin</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 
                hover:to-blue-800 text-white font-medium rounded-lg transition-all duration-200 
                flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin" />
                  <span>Signing in...</span>
                </div>
              ) : (
                'Sign In'
              )}
            </button>

            {/* Additional Links */}
            <div className="text-center space-y-4">
              <Link href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-700">
                Forgot your password?
              </Link>
              <p className="text-sm text-gray-500">
                Do not have an account?{' '}
                <Link href="/register" className="text-blue-600 hover:text-blue-700 font-medium">
                  Create account
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}