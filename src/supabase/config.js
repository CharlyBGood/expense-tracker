import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://buyyejpwbglqgxncrkam.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ1eXllanB3YmdscWd4bmNya2FtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE2MzAxNjksImV4cCI6MjA1NzIwNjE2OX0.4K0zS54A5FNWizr2i5sjXJFeOz06Iywz3vz_LbcCLP8"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)