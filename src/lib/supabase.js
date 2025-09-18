import { createClient} from '@supabase/supabase-js'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient('https://upngittpwnvirwiwipvj.supabase.co','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVwbmdpdHRwd252aXJ3aXdpcHZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgxMTczMTksImV4cCI6MjA3MzY5MzMxOX0.hWiOMA8ElOPaAXx3keFjrqfGKSaRjyGwJhzpHupkmvY')

// IN SUPABASE I turned off the email auth so user do not need to verify their email
// https://supabase.com/dashboard/project/upngittpwnvirwiwipvj/auth/providers