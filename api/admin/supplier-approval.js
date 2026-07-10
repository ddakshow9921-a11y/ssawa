import { createClient } from "@supabase/supabase-js";
import { jsonResult, readJsonBody, sendNodeResponse, toWebResponse } from "../_http.js";

const DEFAULT_SUPABASE_URL = "https://dewlendyeycxfmblecog.supabase.co";
const ALLOWED_STATUSES = new Set(["pending", "approved", "needs_revision", "rejected", "suspended"]);

export default async function handler(request, response) {
  const result = await handleRequest(request);
  if (response) return sendNodeResponse(response, result);
  return toWebResponse(result);
}

export async function fetch(request) {
  return toWebResponse(await handleRequest(request));
}

async function handleRequest(request) {
  if (request.method === "OPTIONS") return jsonResult(204, {});
  if (request.method !== "POST") return jsonResult(405, { ok: false, error: "POST 요청만 지원합니다." });

  const supabaseUrl = readFirstEnv(["VITE_SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_URL"]) || DEFAULT_SUPABASE_URL;
  const anonKey = readFirstEnv(["VITE_SUPABASE_PUBLISHABLE_KEY", "VITE_SUPABASE_ANON_KEY", "NEXT_PUBLIC_SUPABASE_ANON_KEY", "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY"]);
  const serviceKey = readFirstEnv(["SUPABASE_SERVICE_ROLE_KEY", "SUPABASE_SECRET_KEY"]);
  if (!supabaseUrl || !anonKey || !serviceKey) return jsonResult(500, { ok: false, error: "서버 승인 저장 환경변수가 설정되지 않았습니다." });

  const token = readBearerToken(request);
  if (!token) return jsonResult(401, { ok: false, error: "로그인이 필요합니다." });

  const authClient = createClient(supabaseUrl, anonKey, { auth: { persistSession: false, autoRefreshToken: false } });
  const { data: authData, error: authError } = await authClient.auth.getUser(token);
  const user = authData?.user;
  if (authError || !user) return jsonResult(401, { ok: false, error: "로그인 세션을 확인할 수 없습니다." });

  const body = await readJsonBody(request);
  const supplierId = normalizeUuid(body?.supplierId);
  const status = String(body?.status || "").trim();
  const memo = normalizeText(body?.memo);
  if (!supplierId || !ALLOWED_STATUSES.has(status)) return jsonResult(400, { ok: false, error: "승인 상태 저장 데이터가 올바르지 않습니다." });

  const serviceClient = createClient(supabaseUrl, serviceKey, { auth: { persistSession: false, autoRefreshToken: false } });
  const profileResult = await serviceClient.from("profiles").select("id, role").eq("id", user.id).maybeSingle();
  if (profileResult.error) return jsonResult(500, { ok: false, error: userFacingError(profileResult.error) });
  if (profileResult.data?.role !== "admin") return jsonResult(403, { ok: false, error: "관리자 권한이 필요합니다." });

  const patch = {
    approval_status: status,
    admin_memo: memo,
    rejection_reason: status === "rejected" || status === "needs_revision" ? memo : "",
    updated_at: new Date().toISOString(),
  };
  const updated = await updateWithoutMissingColumns(serviceClient, "supplier_profiles", patch, { id: supplierId });
  if (updated.error) return jsonResult(500, { ok: false, error: userFacingError(updated.error) });

  const supplier = await serviceClient.from("supplier_profiles").select("*").eq("id", supplierId).maybeSingle();
  if (supplier.error || !supplier.data) return jsonResult(500, { ok: false, error: userFacingError(supplier.error) || "공급업체 정보를 다시 읽지 못했습니다." });

  return jsonResult(200, { ok: true, supplier: supplier.data });
}

async function updateWithoutMissingColumns(client, table, payload, filters) {
  let nextPayload = { ...payload };
  for (let attempt = 0; attempt < 8; attempt += 1) {
    let query = client.from(table).update(nextPayload);
    for (const [key, value] of Object.entries(filters)) query = query.eq(key, value);
    const result = await query;
    const column = missingSchemaColumn(result.error);
    if (!column || !(column in nextPayload)) return result;
    const { [column]: _removed, ...rest } = nextPayload;
    nextPayload = rest;
  }
  let query = client.from(table).update(nextPayload);
  for (const [key, value] of Object.entries(filters)) query = query.eq(key, value);
  return query;
}

function normalizeUuid(value) {
  const text = String(value || "").trim();
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(text) ? text : "";
}

function normalizeText(value) {
  const text = String(value || "").trim();
  return text ? text : "";
}

function readBearerToken(request) {
  const header = typeof request.headers?.get === "function" ? request.headers.get("authorization") : request.headers?.authorization;
  const match = String(header || "").match(/^Bearer\s+(.+)$/i);
  return match?.[1]?.trim() ?? "";
}

function readFirstEnv(keys) {
  for (const key of keys) {
    const value = String(process.env[key] || "").trim();
    if (value) return value;
  }
  return "";
}

function userFacingError(error) {
  const message = String(error?.message || "");
  if (/permission denied|row-level security|rls|grant/i.test(message)) return "권한이 없습니다. 서버 저장 권한 또는 RLS 설정을 확인해야 합니다.";
  if (/schema cache|Could not find|column .* does not exist/i.test(message)) return "운영 DB 스키마가 최신 승인 저장 구조와 맞지 않습니다.";
  return message || "";
}

function missingSchemaColumn(error) {
  const message = String(error?.message || "");
  const schemaCacheMatch = message.match(/Could not find the '([^']+)' column/i);
  if (schemaCacheMatch?.[1]) return schemaCacheMatch[1];
  const sqlColumnMatch = message.match(/column "?([a-zA-Z0-9_]+)"? does not exist/i);
  return sqlColumnMatch?.[1] ?? "";
}
