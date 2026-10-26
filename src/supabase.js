import { createClient } from '@supabase/supabase-js'

const fallbackUrl = 'https://yxzdvilzlbxomzfayrvs.supabase.co'
const fallbackAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl4emR2aWx6bGJ4b216ZmF5cnZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk3MDUxMTIsImV4cCI6MjEwNTI4MTExMn0.VCHx3wxlZIa2brrIB_xKtfqxK3RL3I9B5qtx1MU8-HA'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || fallbackUrl
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || fallbackAnonKey

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
