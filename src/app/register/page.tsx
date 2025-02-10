"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { UserCircle, Mail, Lock, ChevronDown, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import supabase from '../utils/supabase';

// Define the allowed user roles to match our database constraints
type UserRole = 'student' | 'faculty' | 'admin' | 'superadmin';

// Define custom error type for better type safety
interface RegistrationError extends Error {
  message: string;
}

export default function RegisterPage() {
  const router = useRouter();
  
  // Define our form state with proper typing
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    userRole: '' as UserRole | ''
  });

  // State for handling various form states
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState('');

  // Function to validate password requirements
  const validatePassword = (password: string) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    const isValid = password.length >= minLength && 
                   hasUpperCase && 
                   hasLowerCase && 
                   hasNumbers && 
                   hasSpecialChar;

    setIsPasswordValid(isValid);
    
    if (!password) {
      setPasswordMessage('');
    } else if (!isValid) {
      setPasswordMessage('Password must be at least 8 characters and contain uppercase, lowercase, numbers, and special characters');
    } else {
      setPasswordMessage('Password meets requirements');
    }

    return isValid;
  };

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (name === 'password') {
      validatePassword(value);
    }
    
    setError(null);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Validate passwords match
      if (formData.password !== formData.confirmPassword) {
        throw new Error('Passwords do not match');
      }

      // Validate password requirements
      if (!isPasswordValid) {
        throw new Error('Password does not meet requirements');
      }

      // Create the auth user with role metadata
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            user_role: formData.userRole
          }
        }
      });

      if (signUpError) throw signUpError;

      if (signUpData.user) {
        // Show success message and redirect
        router.push('/login?registration=success');
      }

    } catch (err) {
      const error = err as RegistrationError;
      setError(error.message);
      console.error('Registration error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-50 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="inline-flex p-3 rounded-full bg-blue-50 mb-4">
              <UserCircle className="h-10 w-10 text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Create Account</h1>
            <p className="text-gray-500 mt-2">Join our learning platform</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
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
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="pl-10 w-full h-12 bg-gray-50 text-gray-900 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Password Fields */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  className={`pl-10 w-full h-12 bg-gray-50 text-gray-900 rounded-lg border 
                    ${isPasswordValid ? 'border-green-500' : 'border-gray-300'} 
                    focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                />
              </div>
              {passwordMessage && (
                <p className={`text-sm ${isPasswordValid ? 'text-green-600' : 'text-gray-500'}`}>
                  {passwordMessage}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  className="pl-10 w-full h-12 bg-gray-50 text-gray-900 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* User Role Selection */}
            <div className="space-y-2">
              <label htmlFor="userRole" className="block text-sm font-medium text-gray-700">
                Select User Role
              </label>
              <div className="relative">
                <select
                  id="userRole"
                  name="userRole"
                  required
                  value={formData.userRole}
                  onChange={handleChange}
                  className="w-full h-12 bg-gray-50 text-gray-900 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent pl-4 pr-10 appearance-none"
                >
                  <option value="">Choose your role</option>
                  <option value="student">Student</option>
                  <option value="faculty">Faculty</option>
                  <option value="admin">Admin</option>
                  <option value="superadmin">Super Admin</option>
                </select>
                <ChevronDown className="absolute right-3 top-3.5 h-5 w-5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-lg transition-all duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin" />
                  <span>Creating Account...</span>
                </div>
              ) : (
                'Create Account'
              )}
            </button>

            {/* Login Link */}
            <p className="text-center text-sm text-gray-500">
              Already have an account?{' '}
              <Link href="/login" className="text-blue-600 hover:text-blue-700 font-medium">
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}