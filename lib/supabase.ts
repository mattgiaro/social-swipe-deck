import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  console.error('❌ Missing NEXT_PUBLIC_SUPABASE_URL');
  throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_URL');
}

if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  console.error('❌ Missing NEXT_PUBLIC_SUPABASE_ANON_KEY');
  throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_ANON_KEY');
}

if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌ Missing SUPABASE_SERVICE_ROLE_KEY');
  throw new Error('Missing env.SUPABASE_SERVICE_ROLE_KEY');
}

console.log('✅ Supabase environment variables found');

// Create a single supabase client for interacting with your database
export const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  {
    auth: {
      persistSession: false
    }
  }
);

// Create a service role client for server-side operations
export const supabaseAdmin = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  }
);

// Test the connection with more specific query
void (async () => {
  try {
    const { data, error } = await supabaseAdmin
      .from('creators')
      .select('*')
      .eq('creator_id', 'justin-welsh')
      .single();
    
    if (error) {
      console.error('❌ Supabase test query failed:', error.message);
    } else {
      console.log('✅ Supabase test query successful');
      console.log('📊 Found creator:', data?.name);
    }
  } catch (error: unknown) {
    console.error('❌ Supabase connection test error:', error);
  }
})(); 