import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://sua-clinica-mock.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.mock_key'

// Inicializador Universal do Supabase
// Utilizamos um fail-back mockado para que sua interface front-end não falhe caso o .env não esteja populado ainda.
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
