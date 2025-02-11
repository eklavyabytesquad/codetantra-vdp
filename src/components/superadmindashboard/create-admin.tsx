"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Lock, User, GraduationCap, AlertCircle, CheckCircle2 } from 'lucide-react';
import supabase from '@/app/utils/supabase';

interface FormData {
  email: string;
  password: string;
  name: string;
  qualification: string;
}

const CreateAdmin = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    name: '',
    qualification: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Debug logging function - console only
  const logDebug = (message: string) => {
    console.log(`[Admin Creation] ${new Date().toISOString()}: ${message}`);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setError(null);
  };

  const checkExistingAdmin = async (email: string) => {
    logDebug(`Checking if admin exists with email: ${email}`);
    const { data, error } = await supabase
      .from('admin')
      .select('email')
      .eq('email', email)
      .single();

    if (error && error.code !== 'PGRST116') {
      logDebug(`Error checking existing admin: ${error.message}`);
      throw error;
    }

    if (data) {
      logDebug('Admin already exists with this email');
      throw new Error('An admin with this email already exists');
    }

    return false;
  };

  const createAdminRecord = async () => {
    logDebug('Attempting to create admin record');
    const { data, error } = await supabase
      .from('admin')
      .insert({
        email: formData.email,
        password: formData.password,
        name: formData.name,
        qualification: formData.qualification
      })
      .select()
      .single();

    if (error) {
      logDebug(`Error creating admin record: ${error.message}`);
      throw error;
    }

    return data;
  };

  const createAuthProfile = async () => {
    logDebug('Creating auth profile');
    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          user_role: 'admin'
        }
      }
    });

    if (error) {
      logDebug(`Error creating auth profile: ${error.message}`);
      throw error;
    }

    return data;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      logDebug('Starting admin creation process');
      await checkExistingAdmin(formData.email);
      
      // Create admin record first
      const adminRecord = await createAdminRecord();
      logDebug('Admin record created successfully');

      // Then create auth profile
      await createAuthProfile();
      logDebug('Auth profile created successfully');

      setSuccess(true);
      setFormData({
        email: '',
        password: '',
        name: '',
        qualification: ''
      });

      // Redirect after short delay to show success message
      setTimeout(() => {
        router.push('/superadmindashboard');
        router.refresh();
      }, 1500);

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      logDebug(`Error occurred: ${errorMessage}`);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 max-w-xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Create New Admin</h2>
          <p className="mt-1 text-sm text-gray-600">
            Add a new administrator to the system
          </p>
        </div>
        <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
          <User className="h-6 w-6 text-blue-600" />
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
          <div className="flex items-center space-x-3">
            <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
            <p className="text-sm text-red-700 font-medium">{error}</p>
          </div>
        </div>
      )}

      {success && (
        <div className="mb-6 p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
          <div className="flex items-center space-x-3">
            <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
            <div>
              <p className="font-medium text-green-700">Success!</p>
              <p className="text-sm text-green-600">
                Admin account created successfully. Redirecting...
              </p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Email Address
          </label>
          <div className="relative">
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="block w-full px-4 py-3 pl-11 bg-gray-50 border border-gray-300 
                rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent
                text-gray-900 transition-colors"
              placeholder="admin@srmist.edu.in"
            />
            <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Password
          </label>
          <div className="relative">
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="block w-full px-4 py-3 pl-11 bg-gray-50 border border-gray-300 
                rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent
                text-gray-900 transition-colors"
              placeholder="••••••••"
              minLength={6}
            />
            <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
          </div>
          <p className="mt-2 text-sm text-gray-500">Must be at least 6 characters long</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Full Name
            </label>
            <div className="relative">
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="block w-full px-4 py-3 pl-11 bg-gray-50 border border-gray-300 
                  rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent
                  text-gray-900 transition-colors"
                placeholder="Dr. John Doe"
              />
              <User className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Qualification
            </label>
            <div className="relative">
              <input
                type="text"
                name="qualification"
                required
                value={formData.qualification}
                onChange={handleChange}
                className="block w-full px-4 py-3 pl-11 bg-gray-50 border border-gray-300 
                  rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent
                  text-gray-900 transition-colors"
                placeholder="Ph.D. in Computer Science"
              />
              <GraduationCap className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium
            rounded-lg shadow-sm transition-all duration-200 transform hover:scale-[1.02]
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
            disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {loading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="h-5 w-5 border-t-2 border-b-2 border-white rounded-full animate-spin" />
              <span>Creating Admin...</span>
            </div>
          ) : (
            'Create Admin'
          )}
        </button>
      </form>
    </div>
  );
};

export default CreateAdmin;