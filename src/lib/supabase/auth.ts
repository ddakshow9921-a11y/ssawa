import type { User } from "@supabase/supabase-js";
import { getSupabaseClient } from "./client";
import { logSupabaseError } from "./errors";

export async function getCurrentSession() {
  const client = getSupabaseClient();
  if (!client) return null;
  const { data, error } = await client.auth.getSession();
  if (error) logSupabaseError("auth.getSession", error);
  return data.session ?? null;
}

export async function getCurrentUser() {
  const client = getSupabaseClient();
  if (!client) return null;
  const { data, error } = await client.auth.getUser();
  if (error) logSupabaseError("auth.getUser", error);
  return data.user ?? null;
}

export async function getCurrentProfile() {
  const client = getSupabaseClient();
  const user = await getCurrentUser();
  if (!client || !user) return null;
  const { data, error } = await client.from("profiles").select("*").eq("id", user.id).maybeSingle();
  if (error) logSupabaseError("profiles.selectCurrent", error);
  return data ?? null;
}

export async function ensureProfile(user: User) {
  const client = getSupabaseClient();
  if (!client) return null;
  const email = user.email ?? "";
  const { data, error } = await client
    .from("profiles")
    .upsert(
      {
        id: user.id,
        email,
        name: email.split("@")[0] || "사용자",
        role: "buyer",
      },
      { onConflict: "id" },
    )
    .select("*")
    .single();
  if (error) {
    logSupabaseError("profiles.ensure", error);
    return null;
  }
  return data;
}

export async function getMyRole() {
  const profile = await getCurrentProfile();
  return profile?.role ?? null;
}

export async function signOut() {
  const client = getSupabaseClient();
  if (!client) return;
  const { error } = await client.auth.signOut();
  if (error) logSupabaseError("auth.signOut", error);
}
