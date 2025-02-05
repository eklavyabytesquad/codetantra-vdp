import { User } from '@supabase/supabase-js'

export type UserRole = 'student' | 'teacher' | 'admin';

export interface UserProfile {
  id: string;
  email: string;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export interface StudentProfile {
  id: string;
  user_id: string;
  name: string;
  registration_number: string;
  phone?: string;
  department_id: string;
  class_id: string;
  session: string;
  created_at: string;
}

export interface TeacherProfile {
  id: string;
  user_id: string;
  name: string;
  faculty_id: string;
  phone?: string;
  department_id: string;
  created_at: string;
}

export interface AdminProfile {
  id: string;
  user_id: string;
  name: string;
  department_id: string;
  created_at: string;
}

export interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  profileDetails: StudentProfile | TeacherProfile | AdminProfile | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  signUp: (email: string, password: string, role: UserRole, profileData: any) => Promise<{ error: Error | null }>;
}