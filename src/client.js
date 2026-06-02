import { createClient } from '@supabase/supabase-js'

const URL = 'https://ffmnnjspfcuajgnjqenr.supabase.co'
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZmbW5uanNwZmN1YWpnbmpxZW5yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAyNzE2ODksImV4cCI6MjA5NTg0NzY4OX0.SE5FSF-zHg-3kgbg7owtk2-pnMj6iex0CfprUqeqg-M'

export const supabase = createClient(URL, API_KEY)
