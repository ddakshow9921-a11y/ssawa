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
  if (!supabaseUrl || !anonKey || !serviceKey) {
    return jsonResult(500, { ok: false, error: "서버 견적 저장 환경변수가 설정되지 않았습니다." });
  }

  const token = readBearerToken(request);
  if (!token) return jsonResult(401, { ok: false, error: "로그인이 필요합니다." });

  const authClient = createClient(supabaseUrl, anonKey, { auth: { persistSession: false, autoRefreshToken: false } });
  const { data: authData, error: authError } = await authClient.auth.getUser(token);
  const user = authData?.user;
  if (authError || !user) return jsonResult(401, { ok: false, error: "로그인 세션을 확인할 수 없습니다." });

  const body = await readJsonBody(request);
  const payload = normalizeQuotePayload(body?.payload);
  const quoteId = normalizeUuid(body?.quoteId);
  if (!payload) return jsonResult(400, { ok: false, error: "견적 저장 데이터가 올바르지 않습니다." });

  const serviceClient = createClient(supabaseUrl, serviceKey, { auth: { persistSession: false, autoRefreshToken: false } });
  const profileResult = await serviceClient
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();
  if (profileResult.error) return jsonResult(500, { ok: false, error: userFacingError(profileResult.error) });

  const profile = profileResult.data;
  if (!profile || profile.role !== "supplier") {
    return jsonResult(403, { ok: false, error: "현재 계정이 공급업체 권한이 아닙니다. 공급업체 계정으로 로그인해 주세요." });
  }

  const supplierResult = await findSupplierForUser(serviceClient, payload.supplier_id, user, profile);
  if (!supplierResult.ok) return supplierResult.result;
  const supplier = supplierResult.supplier;

  const requestResult = await serviceClient
    .from("quote_requests")
    .select("id")
    .eq("id", payload.quote_request_id)
    .maybeSingle();
  if (requestResult.error) {
    return jsonResult(500, { ok: false, error: userFacingError(requestResult.error) });
  }
  if (!requestResult.data) {
    return jsonResult(409, {
      ok: false,
      error: "운영 DB에 저장되지 않은 견적요청입니다. 구매자가 요청을 다시 등록했는지 확인한 뒤 목록을 새로고침해 주세요.",
    });
  }

  const quoteRow = {
    ...(quoteId ? { id: quoteId } : {}),
    ...payload,
    supplier_id: supplier.id,
    status: "submitted",
    is_demo: false,
    updated_at: new Date().toISOString(),
  };
  const quoteResult = await upsertWithoutMissingColumns(serviceClient, "quotes", quoteRow, { onConflict: "quote_request_id,supplier_id" });
  if (quoteResult.error || !quoteResult.data) {
    return jsonResult(500, { ok: false, error: userFacingError(quoteResult.error) });
  }

  const markResult = await updateWithoutMissingColumns(
    serviceClient,
    "quote_requests",
    { status: "quoted", updated_at: new Date().toISOString() },
    { id: payload.quote_request_id, status: "open" },
  );
  if (markResult.error) {
    return jsonResult(500, { ok: false, error: userFacingError(markResult.error) });
  }

  return jsonResult(200, { ok: true, quote: quoteResult.data });
}

async function findSupplierForUser(client, requestedSupplierId, user, profile) {
  const requested = await client
    .from("supplier_profiles")
    .select("id, user_id, business_number")
    .eq("id", requestedSupplierId)
    .maybeSingle();
  if (requested.error) return { ok: false, result: jsonResult(500, { ok: false, error: userFacingError(requested.error) }) };
  if (isSupplierMatch(requested.data, user.id, profile.business_number)) {
    return { ok: true, supplier: await ensureSupplierUser(client, requested.data, user.id) };
  }

  const byUser = await client
    .from("supplier_profiles")
    .select("id, user_id, business_number")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (byUser.error) return { ok: false, result: jsonResult(500, { ok: false, error: userFacingError(byUser.error) }) };
  if (byUser.data) return { ok: true, supplier: byUser.data };

  const normalizedProfileBusinessNumber = normalizeBusinessNumber(profile.business_number);
  if (normalizedProfileBusinessNumber) {
    const byExactBusinessNumber = await client
      .from("supplier_profiles")
      .select("id, user_id, business_number")
      .eq("business_number", normalizedProfileBusinessNumber)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    if (byExactBusinessNumber.error) return { ok: false, result: jsonResult(500, { ok: false, error: userFacingError(byExactBusinessNumber.error) }) };
    if (byExactBusinessNumber.data) {
      return { ok: true, supplier: await ensureSupplierUser(client, byExactBusinessNumber.data, user.id) };
    }

    const supplierList = await client
      .from("supplier_profiles")
      .select("id, user_id, business_number")
      .limit(1000);
    if (supplierList.error) return { ok: false, result: jsonResult(500, { ok: false, error: userFacingError(supplierList.error) }) };
    const byNormalizedBusinessNumber = (supplierList.data ?? []).find((supplier) => normalizeBusinessNumber(supplier.business_number) === normalizedProfileBusinessNumber);
    if (byNormalizedBusinessNumber) {
      return { ok: true, supplier: await ensureSupplierUser(client, byNormalizedBusinessNumber, user.id) };
    }
  }

  return {
    ok: false,
    result: jsonResult(403, { ok: false, error: "현재 로그인 계정과 연결된 기존 공급업체 정보를 찾을 수 없습니다. 업체 프로필의 사업자등록번호 또는 계정 연결 상태를 확인해 주세요." }),
  };
}

async function ensureSupplierUser(client, supplier, userId) {
  if (supplier.user_id === userId) return supplier;
  await updateWithoutMissingColumns(client, "supplier_profiles", { user_id: userId, updated_at: new Date().toISOString() }, { id: supplier.id });
  return { ...supplier, user_id: userId };
}

function isSupplierMatch(supplier, userId, profileBusinessNumber) {
  if (!supplier) return false;
  return supplier.user_id === userId || normalizeBusinessNumber(supplier.business_number) === normalizeBusinessNumber(profileBusinessNumber);
}

function normalizeQuotePayload(value) {
  if (!value || typeof value !== "object") return null;
  const quoteRequestId = normalizeUuid(value.quote_request_id);
  const supplierId = normalizeUuid(value.supplier_id);
  if (!quoteRequestId || !supplierId) return null;
  return {
    quote_request_id: quoteRequestId,
    supplier_id: supplierId,
    total_amount: Math.max(0, Math.round(Number(value.total_amount) || 0)),
    delivery_fee: Math.max(0, Math.round(Number(value.delivery_fee) || 0)),
    final_amount: Math.max(0, Math.round(Number(value.final_amount) || 0)),
    available_delivery_date: normalizeDate(value.available_delivery_date),
    tax_invoice_available: Boolean(value.tax_invoice_available),
    card_payment_available: Boolean(value.card_payment_available),
    alternative_proposal: normalizeText(value.alternative_proposal),
    item_price_memo: normalizeText(value.item_price_memo),
    memo: normalizeText(value.memo),
    valid_until: normalizeDate(value.valid_until),
  };
}

async function upsertWithoutMissingColumns(client, table, payload, options) {
  let nextPayload = { ...payload };
  for (let attempt = 0; attempt < 12; attempt += 1) {
    const result = await client.from(table).upsert(nextPayload, options).select("*").single();
    const column = missingSchemaColumn(result.error);
    if (!column || !(column in nextPayload)) return result;
    const { [column]: _removed, ...rest } = nextPayload;
    nextPayload = rest;
  }
  return client.from(table).upsert(nextPayload, options).select("*").single();
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

function normalizeDate(value) {
  const text = String(value || "").trim();
  return /^\d{4}-\d{2}-\d{2}$/.test(text) ? text : null;
}

function normalizeText(value) {
  const text = String(value || "").trim();
  return text ? text : null;
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
    if (value) return value;
  }
  return "";
}

function userFacingError(error) {
  const message = String(error?.message || "");
  if (/permission denied|row-level security|rls|grant/i.test(message)) return "권한이 없습니다. 서버 저장 권한 또는 RLS 설정을 확인해야 합니다.";
  if (/column "?email"? does not exist/i.test(message)) return "운영 DB 스키마가 최신 견적 저장 구조와 맞지 않습니다.";
  if (/foreign key|quotes_quote_request_id_fkey/i.test(message)) return "운영 DB에 없는 견적요청입니다. 목록을 새로고침한 뒤 실제 운영 요청을 선택해 주세요.";
  return message || "견적 저장 중 서버 오류가 발생했습니다.";
}

function missingSchemaColumn(error) {
  const message = String(error?.message || "");
  const schemaCacheMatch = message.match(/Could not find the '([^']+)' column/i);
  if (schemaCacheMatch?.[1]) return schemaCacheMatch[1];
  const sqlColumnMatch = message.match(/column "?([a-zA-Z0-9_]+)"? does not exist/i);
  return sqlColumnMatch?.[1] ?? "";
}
