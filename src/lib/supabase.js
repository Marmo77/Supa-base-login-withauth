import { createClient} from '@supabase/supabase-js'

// #########################
// 1. Create a .env.local file in root directory
// 2. Add the following lines to the .env.local file

// VITE_SUPABASE_URL=your_supabase_url
// VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

// *optional* : you can also hardcode those values here (instead of import.meta...)
// #########################



const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// IN SUPABASE I turned off the email auth so user do not need to verify their email
// https://supabase.com/dashboard/project/upngittpwnvirwiwipvj/auth/providers