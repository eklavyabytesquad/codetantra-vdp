"use client";
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import supabase from '@/app/utils/supabase';
import { User } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  userRole: string | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userRole: null,
  loading: true,
  signOut: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', { event, user: session?.user });
        
        setUser(session?.user ?? null);
  
        if (session?.user) {
          console.log('Fetching user role for:', session.user.email);
          
          const { data: profileData, error } = await supabase
            .from('profiles')
            .select('user_role')
            .eq('id', session.user.id)
            .single();
  
          if (error) {
            console.error('Error fetching user role:', error);
          } else {
            console.log('User role data:', profileData);
            setUserRole(profileData.user_role);
          }
        } else {
          console.log('No active session, clearing user role');
          setUserRole(null);
        }
  
        setLoading(false);
      }
    );
  
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, userRole, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};