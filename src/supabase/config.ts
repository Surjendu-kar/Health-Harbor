import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://hahlykzwykyeqcxowpku.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhhaGx5a3p3eWt5ZXFjeG93cGt1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk1MzU3MDEsImV4cCI6MjA2NTExMTcwMX0.7C7SGD6h_IpX57qxiiGfhBoixgrlQeohDCSFQ8Pvefo"
);
