import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://eraerhfcolqnyopznyyb.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVyYWVyaGZjb2xxbnlvcHpueXliIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDU1Nzk2MDMsImV4cCI6MjAyMTE1NTYwM30.g4LZvhcHgiFj2h_xh20g-nu6xO90-4Jl4YXkhzki4dc"
);
