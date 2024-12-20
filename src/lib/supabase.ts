import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://phsvuctjbtgipqhwsujh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBoc3Z1Y3RqYnRnaXBxaHdzdWpoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ3MTExNDUsImV4cCI6MjA1MDI4NzE0NX0.paLsyXJdm97bhj865NGO31jI8F9NT0QvwuXQuskoPAE';

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