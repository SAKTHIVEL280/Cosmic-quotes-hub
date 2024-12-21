import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bkhvniiauprcabtwhdoz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJraHZuaWlhdXByY2FidHdoZG96Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ3NDgzNDcsImV4cCI6MjA1MDMyNDM0N30.8sHMYqYpMsjYNdRfTFYMzF0etd5vDRiLPqHSwGt6c30';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Type for our quotes table
export type Quote = {
  id: number;
  created_at: string;
  quote: string;
  author: string;
  category: string;
  likes: number;
};