import { createClient } from '@supabase/supabase-js';

// 這裡一定要用 process.env.REACT_APP_...
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
