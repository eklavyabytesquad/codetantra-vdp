import { createClient } from '@supabase/supabase-js';

// Environment variables for Supabase configuration
const supabaseUrl = "https://wvlkqoyngzifsjakqjna.supabase.co ";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind2bGtxb3luZ3ppZnNqYWtxam5hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc5MDkyMDMsImV4cCI6MjA1MzQ4NTIwM30.DcF5E8upAvq0Y5PYLrkL4YuhhBCCMEeGM3shDtYp148";
// Create a single instance of the Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;