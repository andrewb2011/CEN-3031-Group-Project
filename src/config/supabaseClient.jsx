//File used to connect to supabase. Export default the constant returned from the supabase function createClient

import { createClient } from "@supabase/supabase-js";
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
