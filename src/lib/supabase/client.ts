import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { appConfig } from "../env";
import type { Database } from "./database.types";

let browserClient: SupabaseClient<Database> | null = null;

export const SUPABASE_PROJECT_URL = appConfig.supabaseUrl;

export function isSupabaseConfigured() {
  return Boolean(appConfig.supabaseUrl && appConfig.supabasePublishableKey);
}

export function getSupabaseClient() {
  if (!isSupabaseConfigured()) return null;
  if (!browserClient) {
    browserClient = createClient<Database>(appConfig.supabaseUrl, appConfig.supabasePublishableKey, {
      auth: {
        autoRefreshToken: true,
        detectSessionInUrl: true,
        persistSession: true,
      },
    });
  }
  return browserClient;
}

export const supabase = getSupabaseClient();
