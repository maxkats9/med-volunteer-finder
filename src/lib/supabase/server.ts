import { createClient, SupabaseClient } from "@supabase/supabase-js";

export interface OpportunityRow {
  id: string;
  title: string;
  institution: string;
  institution_type: string;
  image_url: string;
  city: string;
  state: string;
  tags: string[];
  description: string;
  requirements: string[];
  schedule: string;
  contact_email: string;
  contact_phone: string;
  apply_url: string;
  deadline: string;
  created_at: string;
}

function getSupabaseUrl() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!url) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL. Copy .env.local.example to .env.local and add your Supabase credentials.",
    );
  }
  return url;
}

export function createSupabaseServerClient(): SupabaseClient {
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!anonKey) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_ANON_KEY. Copy .env.local.example to .env.local and add your Supabase credentials.",
    );
  }

  return createClient(getSupabaseUrl(), anonKey);
}

export function createSupabaseAdminClient(): SupabaseClient {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey) {
    throw new Error(
      "Missing SUPABASE_SERVICE_ROLE_KEY. Add it to .env.local (server-only, never expose to the browser).",
    );
  }

  return createClient(getSupabaseUrl(), serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
