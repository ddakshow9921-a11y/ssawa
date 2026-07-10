import { createClient } from "@supabase/supabase-js";
import { jsonResult, readJsonBody, sendNodeResponse, toWebResponse } from "../_http.js";

const DEFAULT_SUPABASE_URL = "https://dewlendyeycxfmblecog.supabase.co";

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
  if (!supabaseUrl || !anonKey || !serviceKey) return jsonResult(500, { ok: false, error: "서버 업체 조건 저장 환경변수가 설정되지 않았습니다." });

  const token = readBearerToken(request);
  if (!token) return jsonResult(401, { ok: false, error: "로그인이 필요합니다." });

  const authClient = createClient(supabaseUrl, anonKey, { auth: { persistSession: false, autoRefreshToken: false } });
  const { data: authData, error: authError } = await authClient.auth.getUser(token);
  const user = authData?.user;
  if (authError || !user) return jsonResult(401, { ok: false, error: "로그인 세션을 확인할 수 없습니다." });

  const body = await readJsonBody(request);
  const supplierId = normalizeUuid(body?.supplierId);
  const settings = normalizeSupplierSettings(body?.settings);
  if (!supplierId || !settings) return jsonResult(400, { ok: false, error: "업체 조건 저장 데이터가 올바르지 않습니다." });
  if (!settings.categories.length) return jsonResult(400, { ok: false, error: "취급 카테고리를 1개 이상 선택해 주세요." });

  const serviceClient = createClient(supabaseUrl, serviceKey, { auth: { persistSession: false, autoRefreshToken: false } });
  const profileResult = await serviceClient.from("profiles").select("id, role, business_number").eq("id", user.id).maybeSingle();
  if (profileResult.error) return jsonResult(500, { ok: false, error: userFacingError(profileResult.error) });
  const profile = profileResult.data;
  if (!profile || profile.role !== "supplier") return jsonResult(403, { ok: false, error: "공급업체 계정으로 로그인해 주세요." });

  const supplierResult = await findSupplierForUser(serviceClient, supplierId, user.id, profile.business_number);
  if (!supplierResult.ok) return supplierResult.result;

  const patch = {
    ...settings,
    updated_at: new Date().toISOString(),
  };
  const updated = await updateWithoutMissingColumns(serviceClient, "supplier_profiles", patch, { id: supplierResult.supplier.id });
  if (updated.error) return jsonResult(500, { ok: false, error: userFacingError(updated.error) });

  const supplier = await serviceClient.from("supplier_profiles").select("*").eq("id", supplierResult.supplier.id).maybeSingle();
  if (supplier.error || !supplier.data) return jsonResult(500, { ok: false, error: userFacingError(supplier.error) || "업체 조건을 저장했지만 다시 읽지 못했습니다." });

  return jsonResult(200, { ok: true, supplier: supplier.data });
}

async function findSupplierForUser(client, requestedSupplierId, userId, profileBusinessNumber) {
  const requested = await client
    .from("supplier_profiles")
    .select("id, user_id, business_number")
    .eq("id", requestedSupplierId)
    .maybeSingle();
  if (requested.error) return { ok: false, result: jsonResult(500, { ok: false, error: userFacingError(requested.error) }) };
  if (isSupplierMatch(requested.data, userId, profileBusinessNumber)) {
    return { ok: true, supplier: await ensureSupplierUser(client, requested.data, userId) };
  }

  const byUser = await client
    .from("supplier_profiles")
    .select("id, user_id, business_number")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (byUser.error) return { ok: false, result: jsonResult(500, { ok: false, error: userFacingError(byUser.error) }) };
  if (byUser.data) return { ok: true, supplier: byUser.data };

  const normalizedBusinessNumber = normalizeBusinessNumber(profileBusinessNumber);
  if (normalizedBusinessNumber) {
    const supplierList = await client.from("supplier_profiles").select("id, user_id, business_number").limit(1000);
    if (supplierList.error) return { ok: false, result: jsonResult(500, { ok: false, error: userFacingError(supplierList.error) }) };
    const byBusinessNumber = (supplierList.data ?? []).find((supplier) => normalizeBusinessNumber(supplier.business_number) === normalizedBusinessNumber);
    if (byBusinessNumber) return { ok: true, supplier: await ensureSupplierUser(client, byBusinessNumber, userId) };
  }

  return {
    ok: false,
    result: jsonResult(403, { ok: false, error: "현재 로그인 계정과 연결된 공급업체 정보를 찾을 수 없습니다." }),
  };
}

async function ensureSupplierUser(client, supplier, userId) {
  if (supplier.user_id === userId) return supplier;
  await updateWithoutMissingColumns(client, "supplier_profiles", { user_id: userId, updated_at: new Date().toISOString() }, { id: supplier.id });
  return { ...supplier, user_id: userId };
}

function normalizeSupplierSettings(value) {
  if (!value || typeof value !== "object") return null;
  return {
    categories: normalizeCategoryArray(value.categories),
    sub_categories: normalizeTextArray(value.sub_categories),
    service_regions: normalizeTextArray(value.service_regions),
    min_order_amount: normalizeNonNegativeInteger(value.min_order_amount),
    delivery_fee_policy: normalizeText(value.delivery_fee_policy),
    free_delivery_min_amount: normalizeNonNegativeInteger(value.free_delivery_min_amount),
    tax_invoice_available: Boolean(value.tax_invoice_available),
    card_payment_available: Boolean(value.card_payment_available),
    default_quote_valid_days: Math.max(1, Math.round(Number(value.default_quote_valid_days) || 3)),
  };
}

async function updateWithoutMissingColumns(client, table, payload, filters) {
  let nextPayload = { ...payload };
  for (let attempt = 0; attempt < 12; attempt += 1) {
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

function isSupplierMatch(supplier, userId, profileBusinessNumber) {
  if (!supplier) return false;
  return supplier.user_id === userId || normalizeBusinessNumber(supplier.business_number) === normalizeBusinessNumber(profileBusinessNumber);
}

function normalizeTextArray(value) {
  if (!Array.isArray(value)) return [];
  return Array.from(new Set(value.map(normalizeText).filter(Boolean))).slice(0, 80);
}

function normalizeCategoryArray(value) {
  if (!Array.isArray(value)) return [];
  return Array.from(new Set(value.map((entry) => canonicalSupplierCategoryName(normalizeText(entry))).filter(Boolean))).slice(0, 80);
}

function canonicalSupplierCategoryName(value) {
  const compact = value.replace(/\s+/g, "");
  if (compact === "설비/닥트/환기자재" || compact === "건축자재" || compact === "건축/설비/닥트/환기자재") {
    return "건축/설비/닥트/환기자재";
  }
  return value;
}

function normalizeText(value) {
  return String(value || "").trim();
}

function normalizeNonNegativeInteger(value) {
  return Math.max(0, Math.round(Number(value) || 0));
}

function normalizeUuid(value) {
  const text = String(value || "").trim();
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(text) ? text : "";
}

function normalizeBusinessNumber(value) {
  return String(value || "").replace(/\D/g, "");
}

function readBearerToken(request) {
  const header = typeof request.headers?.get === "function" ? request.headers.get("authorization") : request.headers?.authorization;
  const match = String(header || "").match(/^Bearer\s+(.+)$/i);
  return match?.[1]?.trim() ?? "";
}

function readFirstEnv(keys) {
  for (const key of keys) {
    const value = String(process.env[key] || "").trim();
    if (value && value !== "\"\"" && value !== "''") return value;
  }
  return "";
}

function userFacingError(error) {
  const message = String(error?.message || "");
  if (/permission denied|row-level security|rls|grant/i.test(message)) return "권한이 없습니다. 서버 저장 권한 또는 RLS 설정을 확인해야 합니다.";
  if (/schema cache|Could not find|column .* does not exist/i.test(message)) return "운영 DB 스키마가 업체 조건 저장 구조와 맞지 않습니다.";
  return message || "";
}

function missingSchemaColumn(error) {
  const message = String(error?.message || "");
  const schemaCacheMatch = message.match(/Could not find the '([^']+)' column/i);
  if (schemaCacheMatch?.[1]) return schemaCacheMatch[1];
  const sqlColumnMatch = message.match(/column "?([a-zA-Z0-9_]+)"? does not exist/i);
  return sqlColumnMatch?.[1] ?? "";
}
