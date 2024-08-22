import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://pjughuiqwjdzamdzzrgb.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBqdWdodWlxd2pkemFtZHp6cmdiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjM4MDY5MjcsImV4cCI6MjAzOTM4MjkyN30.n2ynATMW4FeUt4bcCVWU7lXDis_UJB21clJnAX9xB_Y";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
