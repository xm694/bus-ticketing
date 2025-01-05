//connect to database:supabase client (a cloud database)
import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://tjxjugvjfiynoyffmicf.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
export const supabase = createClient(supabaseUrl, supabaseKey);
