import type { User } from "@supabase/supabase-js";
import { getSupabaseClient } from "./client";
import { logSupabaseError } from "./errors";

function metadataString(metadata: User["user_metadata"], key: string) {
  const value = metadata?.[key];
  return typeof value === "string" ? value.trim() : "";
}

function metadataRole(metadata: User["user_metadata"]) {
  const role = metadataString(metadata, "role");
  return role === "supplier" || role === "admin" ? role : "buyer";
}

function isMissingEmailColumn(error: unknown) {
  if (!error || typeof error !== "object") return false;
  const record = error as { code?: string; message?: string };
  return record.code === "42703" && /column "?email"? does not exist/i.test(record.message ?? "");
}

export async function getCurrentSession() {
  const client = getSupabaseClient();
  if (!client) return null;
  const { data, error } = await client.auth.getSession();
  if (error) logSupabaseError("auth.getSession", error);
  return data.session ?? null;
}

export async function getCurrentClaims() {
  const client = getSupabaseClient();
  if (!client) return null;
  const { data, error } = await client.auth.getClaims();
  if (error) logSupabaseError("auth.getClaims", error);
  return data?.claims ?? null;
}

export async function getCurrentUser() {
  const client = getSupabaseClient();
  if (!client) return null;
  const claims = await getCurrentClaims();
  if (!claims) return null;
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
  if (!data) return null;
  return { ...data, email: data.email ?? user.email ?? "" };
}

export async function ensureProfile(user: User) {
  const client = getSupabaseClient();
  if (!client) return null;
  const email = user.email ?? "";
  const metadata = user.user_metadata ?? {};
  const profilePayload = {
    id: user.id,
    email,
    name: metadataString(metadata, "name") || email.split("@")[0] || "사용자",
    role: metadataRole(metadata) as "buyer" | "supplier" | "admin",
    business_name: metadataString(metadata, "business_name") || null,
    business_number: metadataString(metadata, "business_number") || null,
    phone: metadataString(metadata, "phone") || null,
    region: metadataString(metadata, "region") || null,
  };
  const { data, error } = await client
    .from("profiles")
    .upsert(profilePayload, { onConflict: "id" })
    .select("*")
    .single();
  if (isMissingEmailColumn(error)) {
    const { email: _email, ...compatibleProfilePayload } = profilePayload;
    const retry = await client
      .from("profiles")
      .upsert(compatibleProfilePayload as any, { onConflict: "id" })
      .select("*")
      .single();
    if (retry.error) {
      logSupabaseError("profiles.ensure", retry.error);
      return null;
    }
    return { ...retry.data, email: retry.data.email ?? email };
  }
  if (error) {
    logSupabaseError("profiles.ensure", error);
    return null;
  }
  return { ...data, email: data.email ?? email };
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
