import { createClient } from "@supabase/supabase-js";
import { jsonResult, readJsonBody, sendNodeResponse, toWebResponse } from "../_http.js";

const DEFAULT_SUPABASE_URL = "https://dewlendyeycxfmblecog.supabase.co";
const MAX_PAYLOAD_BYTES = 2_500_000;

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
  if (request.method !== "GET" && request.method !== "POST") return jsonResult(405, { ok: false, error: "GET 또는 POST 요청만 지원합니다." });

  const supabaseUrl = readFirstEnv(["VITE_SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_URL"]) || DEFAULT_SUPABASE_URL;
  const anonKey = readFirstEnv(["VITE_SUPABASE_PUBLISHABLE_KEY", "VITE_SUPABASE_ANON_KEY", "NEXT_PUBLIC_SUPABASE_ANON_KEY", "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY"]);
  const serviceKey = readFirstEnv(["SUPABASE_SERVICE_ROLE_KEY", "SUPABASE_SECRET_KEY"]);
  if (!supabaseUrl || !anonKey || !serviceKey) return jsonResult(500, { ok: false, error: "앱 상태 동기화 서버 환경변수가 설정되지 않았습니다." });

  const token = readBearerToken(request);
  if (!token) return jsonResult(401, { ok: false, error: "로그인이 필요합니다." });

  const authClient = createClient(supabaseUrl, anonKey, { auth: { persistSession: false, autoRefreshToken: false } });
  const { data: authData, error: authError } = await authClient.auth.getUser(token);
  const user = authData?.user;
  if (authError || !user) return jsonResult(401, { ok: false, error: "로그인 세션을 확인할 수 없습니다." });

  const serviceClient = createClient(supabaseUrl, serviceKey, { auth: { persistSession: false, autoRefreshToken: false } });
  if (request.method === "GET") return readSnapshot(serviceClient, user.id);
  return writeSnapshot(serviceClient, user.id, await readJsonBody(request));
}

async function readSnapshot(client, userId) {
  const result = await client
    .from("app_state_snapshots")
    .select("user_id,payload,client_id,client_updated_at,updated_at")
    .eq("user_id", userId)
    .maybeSingle();
  if (isMissingTable(result.error)) {
    return jsonResult(200, { ok: true, snapshot: null, missingTable: true, error: "app_state_snapshots 테이블이 아직 준비되지 않았습니다." });
  }
  if (result.error) return jsonResult(500, { ok: false, error: userFacingError(result.error) });

  const relatedResult = await client
    .from("app_state_snapshots")
    .select("user_id,payload,updated_at")
    .neq("user_id", userId)
    .order("updated_at", { ascending: false })
    .limit(100);

  if (relatedResult.error) return jsonResult(500, { ok: false, error: userFacingError(relatedResult.error) });

  const relatedSnapshot = buildRelatedSnapshot(userId, relatedResult.data ?? []);
  return jsonResult(200, { ok: true, snapshot: result.data ?? null, relatedSnapshot });
}

async function writeSnapshot(client, userId, body) {
  const incomingPayload = sanitizePayload(body?.payload);
  const existingResult = await client
    .from("app_state_snapshots")
    .select("payload")
    .eq("user_id", userId)
    .maybeSingle();

  if (isMissingTable(existingResult.error)) {
    return jsonResult(200, { ok: false, missingTable: true, error: "app_state_snapshots ?뚯씠釉붿씠 ?꾩쭅 以鍮꾨릺吏 ?딆븯?듬땲??" });
  }
  if (existingResult.error) return jsonResult(500, { ok: false, error: userFacingError(existingResult.error) });

  const payload = mergeSnapshotPayload(existingResult.data?.payload, incomingPayload);
  const serialized = JSON.stringify(payload);
  if (Buffer.byteLength(serialized, "utf8") > MAX_PAYLOAD_BYTES) {
    return jsonResult(413, { ok: false, error: "동기화 데이터가 너무 큽니다. 첨부 파일 또는 이미지 데이터를 줄인 뒤 다시 시도해 주세요." });
  }

  const now = new Date().toISOString();
  const result = await client
    .from("app_state_snapshots")
    .upsert({
      user_id: userId,
      payload,
      client_id: normalizeText(body?.clientId).slice(0, 120),
      client_updated_at: normalizeIsoDate(body?.clientUpdatedAt) || now,
      updated_at: now,
    }, { onConflict: "user_id" })
    .select("user_id,payload,client_id,client_updated_at,updated_at")
    .single();

  if (isMissingTable(result.error)) {
    return jsonResult(200, { ok: false, missingTable: true, error: "app_state_snapshots 테이블이 아직 준비되지 않았습니다." });
  }
  if (result.error || !result.data) return jsonResult(500, { ok: false, error: userFacingError(result.error) });
  return jsonResult(200, { ok: true, snapshot: result.data });
}

function sanitizePayload(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  const { local_auth_accounts: _localAuthAccounts, ...safePayload } = value;
  return safePayload;
}

function mergeSnapshotPayload(existing, incoming) {
  const existingPayload = existing && typeof existing === "object" && !Array.isArray(existing) ? existing : {};
  const incomingPayload = incoming && typeof incoming === "object" && !Array.isArray(incoming) ? incoming : {};
  const merged = { ...existingPayload };

  for (const [key, value] of Object.entries(incomingPayload)) {
    const current = merged[key];
    if (Array.isArray(value)) {
      merged[key] = mergeRecordArrays(Array.isArray(current) ? current : [], value);
    } else if (value && typeof value === "object" && !Array.isArray(value)) {
      merged[key] = { ...(current && typeof current === "object" && !Array.isArray(current) ? current : {}), ...value };
    } else if (value !== undefined) {
      merged[key] = value;
    }
  }

  return merged;
}

function mergeRecordArrays(existing, incoming) {
  if (!incoming.length) return existing;
  const byId = new Map();
  for (const record of existing) byId.set(recordKey(record), record);
  for (const record of incoming) byId.set(recordKey(record), record);
  return [...byId.values()];
}

function recordKey(record) {
  if (record && typeof record === "object" && typeof record.id === "string" && record.id) return record.id;
  return JSON.stringify(record);
}

function buildRelatedSnapshot(userId, snapshots) {
  const payloads = snapshots.map((snapshot) => snapshot?.payload).filter((payload) => payload && typeof payload === "object" && !Array.isArray(payload));
  if (!payloads.length) return null;

  const supplierIds = new Set();
  const supplierUserIds = new Set();
  const buyerIds = new Set([userId]);
  const dealIds = new Set();
  const quoteRequestIds = new Set();
  const quoteIds = new Set();
  const purchaseIds = new Set();
  const reviewIds = new Set();
  const threadIds = new Set();

  for (const payload of payloads) {
    for (const supplier of asArray(payload.supplier_profiles)) {
      if (supplier.user_id === userId) {
        supplierIds.add(supplier.id);
        supplierUserIds.add(supplier.user_id);
      }
    }
  }

  for (let pass = 0; pass < 3; pass += 1) {
    for (const payload of payloads) {
      for (const deal of asArray(payload.deals)) {
        if (deal.buyer_id === userId || supplierIds.has(deal.supplier_id) || quoteIds.has(deal.selected_quote_id)) {
          addValue(dealIds, deal.id);
          addValue(buyerIds, deal.buyer_id);
          addValue(supplierIds, deal.supplier_id);
          addValue(quoteRequestIds, deal.quote_request_id);
          addValue(quoteIds, deal.selected_quote_id);
        }
      }

      for (const purchase of asArray(payload.purchase_records)) {
        if (purchase.buyer_id === userId || purchase.business_id === userId || supplierIds.has(purchase.supplier_id) || dealIds.has(purchase.deal_id)) {
          addValue(purchaseIds, purchase.id);
          addValue(dealIds, purchase.deal_id);
          addValue(buyerIds, purchase.buyer_id);
          addValue(supplierIds, purchase.supplier_id);
          addValue(quoteRequestIds, purchase.quote_request_id);
        }
      }

      for (const review of asArray(payload.reviews)) {
        if (review.buyer_id === userId || supplierIds.has(review.supplier_id) || dealIds.has(review.deal_id)) {
          addValue(reviewIds, review.id);
          addValue(dealIds, review.deal_id);
          addValue(buyerIds, review.buyer_id);
          addValue(supplierIds, review.supplier_id);
          addValue(quoteRequestIds, review.quote_request_id);
        }
      }

      for (const request of asArray(payload.quote_requests)) {
        if (request.buyer_id === userId || quoteRequestIds.has(request.id)) {
          addValue(quoteRequestIds, request.id);
          addValue(buyerIds, request.buyer_id);
        }
      }

      for (const quote of asArray(payload.quotes)) {
        if (quoteRequestIds.has(quote.quote_request_id) || supplierIds.has(quote.supplier_id) || quoteIds.has(quote.id)) {
          addValue(quoteIds, quote.id);
          addValue(quoteRequestIds, quote.quote_request_id);
          addValue(supplierIds, quote.supplier_id);
        }
      }

      for (const thread of asArray(payload.message_threads)) {
        if (thread.buyer_id === userId || supplierIds.has(thread.supplier_id) || dealIds.has(thread.related_entity_id) || quoteRequestIds.has(thread.related_entity_id)) {
          addValue(threadIds, thread.id);
          addValue(buyerIds, thread.buyer_id);
          addValue(supplierIds, thread.supplier_id);
        }
      }

      for (const supplier of asArray(payload.supplier_profiles)) {
        if (supplierIds.has(supplier.id)) addValue(supplierUserIds, supplier.user_id);
      }
    }
  }

  const relatedPayload = {};
  for (const payload of payloads) {
    appendRelated(relatedPayload, "profiles", asArray(payload.profiles).filter((profile) => profile.id === userId || buyerIds.has(profile.id) || supplierUserIds.has(profile.id)));
    appendRelated(relatedPayload, "supplier_profiles", asArray(payload.supplier_profiles).filter((supplier) => supplierIds.has(supplier.id) || supplier.user_id === userId));
    appendRelated(relatedPayload, "quote_requests", asArray(payload.quote_requests).filter((request) => request.buyer_id === userId || quoteRequestIds.has(request.id)));
    appendRelated(relatedPayload, "quote_request_items", asArray(payload.quote_request_items).filter((item) => quoteRequestIds.has(item.quote_request_id)));
    appendRelated(relatedPayload, "quotes", asArray(payload.quotes).filter((quote) => quoteIds.has(quote.id) || quoteRequestIds.has(quote.quote_request_id) || supplierIds.has(quote.supplier_id)));
    appendRelated(relatedPayload, "quote_attachments", asArray(payload.quote_attachments).filter((file) => quoteIds.has(file.quote_id) || quoteRequestIds.has(file.quote_request_id)));
    appendRelated(relatedPayload, "deals", asArray(payload.deals).filter((deal) => dealIds.has(deal.id)));
    appendRelated(relatedPayload, "deal_items", asArray(payload.deal_items).filter((item) => dealIds.has(item.deal_id)));
    appendRelated(relatedPayload, "deal_attachments", asArray(payload.deal_attachments).filter((file) => dealIds.has(file.deal_id)));
    appendRelated(relatedPayload, "deal_status_logs", asArray(payload.deal_status_logs).filter((log) => dealIds.has(log.deal_id)));
    appendRelated(relatedPayload, "purchase_records", asArray(payload.purchase_records).filter((purchase) => purchaseIds.has(purchase.id) || dealIds.has(purchase.deal_id)));
    appendRelated(relatedPayload, "purchase_record_items", asArray(payload.purchase_record_items).filter((item) => purchaseIds.has(item.purchase_record_id)));
    appendRelated(relatedPayload, "purchase_documents", asArray(payload.purchase_documents).filter((document) => purchaseIds.has(document.purchase_record_id)));
    appendRelated(relatedPayload, "tax_documents", asArray(payload.tax_documents).filter((document) => purchaseIds.has(document.purchase_record_id)));
    appendRelated(relatedPayload, "tax_document_checks", asArray(payload.tax_document_checks).filter((check) => purchaseIds.has(check.purchase_record_id)));
    appendRelated(relatedPayload, "accounting_entries", asArray(payload.accounting_entries).filter((entry) => purchaseIds.has(entry.purchase_record_id) || dealIds.has(entry.deal_id)));
    appendRelated(relatedPayload, "reviews", asArray(payload.reviews).filter((review) => reviewIds.has(review.id) || dealIds.has(review.deal_id)));
    appendRelated(relatedPayload, "review_replies", asArray(payload.review_replies).filter((reply) => reviewIds.has(reply.review_id)));
    appendRelated(relatedPayload, "review_reports", asArray(payload.review_reports).filter((report) => reviewIds.has(report.review_id)));
    appendRelated(relatedPayload, "message_threads", asArray(payload.message_threads).filter((thread) => threadIds.has(thread.id)));
    appendRelated(relatedPayload, "messages", asArray(payload.messages).filter((message) => threadIds.has(message.thread_id)));
    appendRelated(relatedPayload, "message_read_states", asArray(payload.message_read_states).filter((state) => threadIds.has(state.thread_id) && (state.user_id === userId || supplierUserIds.has(state.user_id))));
    appendRelated(relatedPayload, "notifications", asArray(payload.notifications).filter((notification) => notification.user_id === userId || supplierUserIds.has(notification.user_id)));
    appendRelated(relatedPayload, "notification_events", asArray(payload.notification_events).filter((event) => event.user_id === userId || supplierUserIds.has(event.user_id)));
    appendRelated(relatedPayload, "supplier_sales_records", asArray(payload.supplier_sales_records).filter((record) => supplierIds.has(record.supplier_business_id) || dealIds.has(record.deal_id)));
    appendRelated(relatedPayload, "today_supplier_sync_logs", asArray(payload.today_supplier_sync_logs).filter((log) => supplierIds.has(log.supplier_business_id) || dealIds.has(log.deal_id)));
    appendRelated(relatedPayload, "today_ssawa_sync_logs", asArray(payload.today_ssawa_sync_logs).filter((log) => purchaseIds.has(log.purchase_record_id) || dealIds.has(log.deal_id)));
    appendRelated(relatedPayload, "platform_fees", asArray(payload.platform_fees).filter((fee) => supplierIds.has(fee.supplier_id) || dealIds.has(fee.deal_id)));
    appendRelated(relatedPayload, "settlement_items", asArray(payload.settlement_items).filter((item) => supplierIds.has(item.supplier_id) || dealIds.has(item.deal_id)));
    appendRelated(relatedPayload, "settlements", asArray(payload.settlements).filter((settlement) => supplierIds.has(settlement.supplier_id)));
    appendRelated(relatedPayload, "supplier_reputation_scores", asArray(payload.supplier_reputation_scores).filter((score) => supplierIds.has(score.supplier_id)));
    appendRelated(relatedPayload, "supplier_stats", asArray(payload.supplier_stats).filter((stat) => supplierIds.has(stat.supplier_id)));
  }

  const hasRecords = Object.values(relatedPayload).some((value) => Array.isArray(value) && value.length > 0);
  if (!hasRecords) return null;

  return {
    user_id: userId,
    payload: relatedPayload,
    updated_at: latestUpdatedAt(snapshots),
  };
}

function appendRelated(target, key, records) {
  if (!records.length) return;
  const current = Array.isArray(target[key]) ? target[key] : [];
  const byId = new Map(current.map((record) => [record?.id ?? JSON.stringify(record), record]));
  for (const record of records) {
    byId.set(record?.id ?? JSON.stringify(record), record);
  }
  target[key] = [...byId.values()];
}

function addValue(set, value) {
  if (value) set.add(value);
}

function asArray(value) {
  return Array.isArray(value) ? value : [];
}

function latestUpdatedAt(snapshots) {
  return snapshots.reduce((latest, snapshot) => {
    const value = normalizeIsoDate(snapshot?.updated_at);
    return value && (!latest || new Date(value).getTime() > new Date(latest).getTime()) ? value : latest;
  }, "");
}

function normalizeIsoDate(value) {
  const text = normalizeText(value);
  if (!text) return "";
  const date = new Date(text);
  return Number.isFinite(date.getTime()) ? date.toISOString() : "";
}

function normalizeText(value) {
  return String(value || "").trim();
}

function isMissingTable(error) {
  return Boolean(error && error.code === "PGRST205" && /app_state_snapshots/i.test(error.message || ""));
}

function userFacingError(error) {
  if (!error) return "";
  const message = error.message || String(error);
  if (/row-level security|permission denied|42501/i.test(message)) return "권한 설정 때문에 앱 상태를 동기화하지 못했습니다. RLS 또는 GRANT 설정을 확인해 주세요.";
  if (/schema cache|PGRST205|app_state_snapshots/i.test(message)) return "앱 상태 동기화 테이블이 아직 운영 DB에 반영되지 않았습니다.";
  return message;
}

function readBearerToken(request) {
  const header = typeof request.headers?.get === "function" ? request.headers.get("authorization") : request.headers?.authorization;
  const match = String(header || "").match(/^Bearer\s+(.+)$/i);
  return match?.[1]?.trim() ?? "";
}

function readFirstEnv(keys) {
  for (const key of keys) {
    const value = process.env[key];
    if (value && value.trim() && value.trim() !== "\"\"" && value.trim() !== "''") return value.trim();
  }
  return "";
}
