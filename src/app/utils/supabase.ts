import { createClient } from '@supabase/supabase-js';

// Environment variables for Supabase configuration
const supabaseUrl = "https://wvlkqoyngzifsjakqjna.supabase.co";  // Removed the trailing space
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind2bGtxb3luZ3ppZnNqYWtxam5hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc5MDkyMDMsImV4cCI6MjA1MzQ4NTIwM30.DcF5E8upAvq0Y5PYLrkL4YuhhBCCMEeGM3shDtYp148";

// Initialize the Supabase client with error handling
const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true
  }
});

export default supabase;