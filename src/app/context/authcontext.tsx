"use client"
// src/contexts/AuthContext.tsx

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import supabase from '../utils/supabase';
import { AuthContextType, UserProfile, StudentProfile, TeacherProfile, AdminProfile, UserRole } from '../types/auth.types';

// Create the authentication context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create a provider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [profileDetails, setProfileDetails] = useState<StudentProfile | TeacherProfile | AdminProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Function to fetch user profile details based on role
  const fetchProfileDetails = async (userId: string, role: UserRole) => {
    let profileData = null;
    const { data, error } = await supabase
      .from(role + 's') // 'students', 'teachers', or 'admins'
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) {
      console.error(`Error fetching ${role} profile:`, error);
      return null;
    }

    return data;
  };

  // Function to fetch user's basic profile
  const fetchUserProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }

    return data;
  };

  // Effect to handle auth state changes
  useEffect(() => {
    // Check current auth session
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
        
        // Fetch user profile
        const profile = await fetchUserProfile(session.user.id);
        if (profile) {
          setUserProfile(profile);
          
          // Fetch role-specific details
          const details = await fetchProfileDetails(session.user.id, profile.role);
          setProfileDetails(details);
        }
      }
      setIsLoading(false);
    };

    checkSession();

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null);
      
      if (session?.user) {
        const profile = await fetchUserProfile(session.user.id);
        if (profile) {
          setUserProfile(profile);
          const details = await fetchProfileDetails(session.user.id, profile.role);
          setProfileDetails(details);
        }
      } else {
        setUserProfile(null);
        setProfileDetails(null);
      }
      
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Sign in function
  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Create or update session record
      if (data.user) {
        await supabase.from('sessions').upsert({
          user_id: data.user.id,
          token: data.session?.access_token,
          expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours from now
          is_active: true,
        });
      }

      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  };

  // Sign out function
  const signOut = async () => {
    // Update session record
    if (user) {
      await supabase
        .from('sessions')
        .update({ is_active: false })
        .eq('user_id', user.id);
    }
    
    await supabase.auth.signOut();
    setUser(null);
    setUserProfile(null);
    setProfileDetails(null);
  };

  // Sign up function
  const signUp = async (email: string, password: string, role: UserRole, profileData: any) => {
    try {
      // Create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) throw authError;

      if (authData.user) {
        // Create user profile
        const { error: userError } = await supabase
          .from('users')
          .insert({
            id: authData.user.id,
            email,
            role,
          });

        if (userError) throw userError;

        // Create role-specific profile
        const { error: profileError } = await supabase
          .from(`${role}s`)
          .insert({
            user_id: authData.user.id,
            ...profileData,
          });

        if (profileError) throw profileError;
      }

      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  };

  const value = {
    user,
    userProfile,
    profileDetails,
    isLoading,
    signIn,
    signOut,
    signUp,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use the auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}