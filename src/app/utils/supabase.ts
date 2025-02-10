// File: app/utils/supabase.ts

import { createClient } from '@supabase/supabase-js';

// Environment variables for Supabase configuration
const supabaseUrl = "https://iryywyjpfojymhrkfymo.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlyeXl3eWpwZm9qeW1ocmtmeW1vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkxNjUyNDEsImV4cCI6MjA1NDc0MTI0MX0.EHc7nRm5JlEbqg0MC-ETBgvTGBsyINF2BA02H-XHzcw";

// Initialize the Supabase client with proper configuration
const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  db: {
    schema: 'public'
  }
});

export default supabase;