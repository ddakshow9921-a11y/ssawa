import type { AuthError, PostgrestError, StorageApiError } from "@supabase/supabase-js";

type SupabaseLikeError = PostgrestError | AuthError | StorageApiError | Error | null | undefined;

export function isPermissionError(error: SupabaseLikeError) {
  const message = error?.message.toLowerCase() ?? "";
  const code = "code" in (error ?? {}) ? String((error as PostgrestError).code) : "";
  return code === "42501" || message.includes("permission denied") || message.includes("row-level security");
}

export function getUserFriendlySupabaseError(error: SupabaseLikeError) {
  if (!error) return "알 수 없는 Supabase 오류입니다.";
  if (isPermissionError(error)) return "권한이 없습니다. RLS 정책 또는 GRANT 설정을 확인해야 합니다.";
  if (error.message.includes("JWT")) return "로그인 세션이 만료되었습니다. 다시 로그인해 주세요.";
  if (error.message.includes("Network")) return "네트워크 연결을 확인해 주세요.";
  return error.message || "Supabase 요청 처리 중 오류가 발생했습니다.";
}

export function logSupabaseError(scope: string, error: SupabaseLikeError) {
  if (!error) return;
  console.warn(`[supabase:${scope}]`, getUserFriendlySupabaseError(error), error);
}
