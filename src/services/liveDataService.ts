import type { BetaFeedback, Category, Notification, Quote, QuoteDraft, QuoteRequest, QuoteRequestDraft, QuoteRequestItem, Review, ReviewReply, SupplierProfile } from "../types";
import { appConfig, isLiveModeReady } from "../lib/env";
import { getSupabaseClient, isSupabaseConfigured } from "../lib/supabase/client";
import { getCurrentSession } from "../lib/supabase/auth";
import { getUserFriendlySupabaseError, logSupabaseError } from "../lib/supabase/errors";

export type LiveResult<T> = { ok: true; data: T } | { ok: false; data: T; error: string };

const localCategoryNamesById: Record<string, string> = {
  "cat-1": "식자재",
  "cat-2": "포장재",
  "cat-3": "소모품",
  "cat-4": "주방용품",
  "cat-5": "건축/설비/닥트/환기자재",
  "cat-6": "건축/설비/닥트/환기자재",
  "cat-7": "공구/산업자재",
  "cat-8": "기타",
};

function isUuid(value: string | undefined) {
  return Boolean(value && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value));
}

export const liveFeatureMatrix = [
  { name: "Auth 세션", status: "prepared", note: "publishable key 입력 시 Supabase Auth 세션을 읽습니다." },
  { name: "프로필/권한", status: "prepared", note: "profiles.role 기반으로 buyer/supplier/admin을 분리합니다." },
  { name: "카테고리", status: "ready", note: "categories 테이블 read 전환 준비 완료" },
  { name: "견적요청", status: "ready", note: "quote_requests + quote_request_items 생성/조회 준비 완료" },
  { name: "견적서", status: "ready", note: "quotes 테이블 생성/조회/수정 준비 완료" },
  { name: "알림", status: "prepared", note: "사용자별 notifications 조회 준비 완료" },
  { name: "베타 피드백", status: "ready", note: "feedbacks 테이블 insert 준비 완료" },
  { name: "OCR/AI", status: "mock", note: "외부 OCR/AI 공급자 연결 전까지 mock 유지" },
  { name: "결제/정산", status: "mock", note: "PG 계약 및 웹훅 검증 전까지 mock 유지" },
] as const;

function unavailable<T>(fallback: T): LiveResult<T> {
  return { ok: false, data: fallback, error: "Supabase 환경변수가 아직 준비되지 않았습니다." };
}

export async function getLiveDataHealth() {
  const client = getSupabaseClient();
  if (!client || !isSupabaseConfigured()) {
    return { ok: false as const, error: "VITE_SUPABASE_PUBLISHABLE_KEY가 비어 있습니다." };
  }
  const { error } = await client.from("categories").select("id", { count: "exact", head: true });
  if (error) {
    logSupabaseError("health.categories", error);
    return { ok: false as const, error: getUserFriendlySupabaseError(error) };
  }
  return { ok: true as const };
}

export async function listLiveCategories(): Promise<LiveResult<Category[]>> {
  const client = getSupabaseClient();
  if (!client || !isLiveModeReady()) return unavailable([]);
  const { data, error } = await client.from("categories").select("*").eq("is_active", true).order("sort_order");
  if (error) return { ok: false, data: [], error: getUserFriendlySupabaseError(error) };
  return { ok: true, data: normalizeLiveCategories((data ?? []) as Category[]) };
}

export async function listMyLiveQuoteRequests(buyerId: string): Promise<LiveResult<QuoteRequest[]>> {
  const client = getSupabaseClient();
  if (!client || !isLiveModeReady()) return unavailable([]);
  const { data, error } = await client.from("quote_requests").select("*").eq("buyer_id", buyerId).order("created_at", { ascending: false });
  if (error) return { ok: false, data: [], error: getUserFriendlySupabaseError(error) };
  return { ok: true, data: (data ?? []).map(normalizeLiveQuoteRequest) };
}

export async function listVisibleLiveQuoteRequests(): Promise<LiveResult<QuoteRequest[]>> {
  const client = getSupabaseClient();
  if (!client || !isLiveModeReady()) return unavailable([]);
  const { data, error } = await client.from("quote_requests").select("*").order("created_at", { ascending: false });
  if (error) return { ok: false, data: [], error: getUserFriendlySupabaseError(error) };
  return { ok: true, data: (data ?? []).map(normalizeLiveQuoteRequest) };
}

export async function ensureLiveQuoteRequestExists(requestId: string): Promise<LiveResult<boolean>> {
  const client = getSupabaseClient();
  if (!client || !isLiveModeReady()) return unavailable(false);
  if (!isUuid(requestId)) {
    return { ok: true, data: false };
  }
  const { data, error } = await client
    .from("quote_requests")
    .select("id")
    .eq("id", requestId)
    .maybeSingle();
  if (error) return { ok: false, data: false, error: getUserFriendlySupabaseError(error) };
  return { ok: true, data: Boolean(data?.id) };
}

export async function listLiveQuoteRequestItems(requestId: string): Promise<LiveResult<QuoteRequestItem[]>> {
  const client = getSupabaseClient();
  if (!client || !isLiveModeReady()) return unavailable([]);
  const { data, error } = await client.from("quote_request_items").select("*").eq("quote_request_id", requestId).order("created_at");
  if (error) return { ok: false, data: [], error: getUserFriendlySupabaseError(error) };
  return { ok: true, data: (data ?? []).map(normalizeLiveQuoteRequestItem) };
}

export async function listLiveQuoteRequestItemsForRequests(requestIds: string[]): Promise<LiveResult<QuoteRequestItem[]>> {
  const client = getSupabaseClient();
  if (!client || !isLiveModeReady()) return unavailable([]);
  if (requestIds.length === 0) return { ok: true, data: [] };
  const { data, error } = await client
    .from("quote_request_items")
    .select("*")
    .in("quote_request_id", requestIds)
    .order("created_at");
  if (error) return { ok: false, data: [], error: getUserFriendlySupabaseError(error) };
  return { ok: true, data: (data ?? []).map(normalizeLiveQuoteRequestItem) };
}

export async function createLiveQuoteRequest(buyerId: string, draft: QuoteRequestDraft): Promise<LiveResult<QuoteRequest | null>> {
  const client = getSupabaseClient();
  if (!client || !isLiveModeReady()) return unavailable(null);
  const categoryName = await resolveLiveCategoryName(draft);
  const liveCategoryId = isUuid(draft.category_id) ? draft.category_id : null;

  const { data: request, error: requestError } = await client
    .from("quote_requests")
    .insert({
      buyer_id: buyerId,
      title: draft.title,
      category_id: liveCategoryId,
      category_name: categoryName,
      delivery_region: draft.delivery_region,
      delivery_address: draft.delivery_address || null,
      desired_delivery_date: draft.desired_delivery_date || null,
      need_tax_invoice: draft.need_tax_invoice,
      card_payment_required: draft.card_payment_required,
      description: draft.description || null,
      input_method: draft.input_method,
      urgent: draft.urgent,
      budget_min: draft.budget_min || null,
      budget_max: draft.budget_max || null,
      is_demo: false,
    })
    .select("*")
    .single();

  if (requestError || !request) {
    return { ok: false, data: null, error: getUserFriendlySupabaseError(requestError) };
  }

  if (draft.items.length > 0) {
    const { error: itemError } = await client.from("quote_request_items").insert(
      draft.items.map((item) => ({
        quote_request_id: request.id,
        item_name: item.item_name,
        spec: item.spec || null,
        quantity: item.quantity,
        unit: item.unit || "개",
        memo: item.memo || null,
        is_required: item.is_required ?? true,
        allow_alternative: item.allow_alternative ?? true,
        confidence_score: item.confidence_score ?? null,
        needs_review: item.needs_review ?? false,
      })),
    );
    if (itemError) return { ok: false, data: request as QuoteRequest, error: getUserFriendlySupabaseError(itemError) };
  }

  return { ok: true, data: normalizeLiveQuoteRequest(request) };
}

export async function listLiveQuotesForRequests(requestIds: string[]): Promise<LiveResult<Quote[]>> {
  const client = getSupabaseClient();
  if (!client || !isLiveModeReady()) return unavailable([]);
  if (requestIds.length === 0) return { ok: true, data: [] };
  const { data, error } = await client
    .from("quotes")
    .select("*")
    .in("quote_request_id", requestIds)
    .order("created_at", { ascending: false });
  if (error) return { ok: false, data: [], error: getUserFriendlySupabaseError(error) };
  return { ok: true, data: (data ?? []).map(normalizeLiveQuote) };
}

export async function listMyLiveSupplierQuotes(supplierId: string): Promise<LiveResult<Quote[]>> {
  const client = getSupabaseClient();
  if (!client || !isLiveModeReady()) return unavailable([]);
  if (!isUuid(supplierId)) return { ok: true, data: [] };
  const { data, error } = await client
    .from("quotes")
    .select("*")
    .eq("supplier_id", supplierId)
    .order("created_at", { ascending: false });
  if (error) return { ok: false, data: [], error: getUserFriendlySupabaseError(error) };
  return { ok: true, data: (data ?? []).map(normalizeLiveQuote) };
}

export async function listLiveSupplierProfiles(): Promise<LiveResult<SupplierProfile[]>> {
  const client = getSupabaseClient();
  if (!client || !isLiveModeReady()) return unavailable([]);
  const { data, error } = await client.from("supplier_profiles").select("*").order("created_at", { ascending: false });
  if (error) return { ok: false, data: [], error: getUserFriendlySupabaseError(error) };
  return { ok: true, data: (data ?? []).map(normalizeLiveSupplierProfile) };
}

export async function updateLiveSupplierApprovalStatus(supplierId: string, status: SupplierProfile["approval_status"], memo: string): Promise<LiveResult<SupplierProfile | null>> {
  if (!isLiveModeReady()) return unavailable(null);
  const session = await getCurrentSession();
  const accessToken = session?.access_token;
  if (!accessToken) return { ok: false, data: null, error: "로그인이 필요합니다. 다시 로그인 후 승인 상태를 변경해 주세요." };
  try {
    const response = await fetch(apiEndpoint("/api/admin/supplier-approval"), {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ supplierId, status, memo }),
    });
    const body = (await response.json().catch(() => ({}))) as { ok?: boolean; supplier?: Record<string, unknown>; error?: string };
    if (!response.ok || !body.ok || !body.supplier) {
      return { ok: false, data: null, error: body.error || "승인 상태 저장 서버 응답이 올바르지 않습니다." };
    }
    return { ok: true, data: normalizeLiveSupplierProfile(body.supplier) };
  } catch {
    return { ok: false, data: null, error: "승인 상태 저장 서버에 연결할 수 없습니다. 잠시 후 다시 시도해 주세요." };
  }
}

export async function updateLiveSupplierSettings(supplier: SupplierProfile): Promise<LiveResult<SupplierProfile | null>> {
  if (!isLiveModeReady()) return unavailable(null);
  const session = await getCurrentSession();
  const accessToken = session?.access_token;
  if (!accessToken) return { ok: false, data: null, error: "로그인이 필요합니다. 다시 로그인 후 업체 조건을 저장해 주세요." };
  try {
    const response = await fetch(apiEndpoint("/api/supplier/settings"), {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        supplierId: supplier.id,
        settings: {
          categories: supplier.categories,
          sub_categories: supplier.sub_categories ?? [],
          service_regions: supplier.service_regions,
          min_order_amount: supplier.min_order_amount ?? 0,
          delivery_fee_policy: supplier.delivery_fee_policy ?? "",
          free_delivery_min_amount: supplier.free_delivery_min_amount ?? 0,
          same_day_delivery_available: supplier.same_day_delivery_available ?? false,
          urgent_delivery_available: supplier.urgent_delivery_available ?? false,
          delivery_days: supplier.delivery_days ?? [],
          delivery_time_slots: supplier.delivery_time_slots ?? [],
          tax_invoice_available: supplier.tax_invoice_available,
          card_payment_available: supplier.card_payment_available,
          bank_transfer_available: supplier.bank_transfer_available ?? true,
          on_site_payment_available: supplier.on_site_payment_available ?? false,
          default_quote_valid_days: supplier.default_quote_valid_days ?? 3,
        },
      }),
    });
    const body = (await response.json().catch(() => ({}))) as { ok?: boolean; supplier?: Record<string, unknown>; error?: string };
    if (!response.ok || !body.ok || !body.supplier) {
      return { ok: false, data: null, error: body.error || "업체 조건 저장 서버 응답이 올바르지 않습니다." };
    }
    return { ok: true, data: normalizeLiveSupplierProfile(body.supplier) };
  } catch {
    return { ok: false, data: null, error: "업체 조건 저장 서버에 연결할 수 없습니다. 잠시 후 다시 시도해 주세요." };
  }
}

export async function createLiveQuote(requestId: string, draft: QuoteDraft): Promise<LiveResult<Quote | null>> {
  const client = getSupabaseClient();
  if (!client || !isLiveModeReady()) return unavailable(null);
  if (!isUuid(requestId) || !isUuid(draft.supplier_id)) {
    return { ok: false, data: null, error: "운영 DB 견적요청 또는 공급업체 ID가 올바르지 않습니다. 새로고침 후 다시 시도해 주세요." };
  }

  const payload = quoteDraftToLivePayload(requestId, draft);
  return submitLiveQuotePayload(payload);
}

export async function updateLiveQuote(quoteId: string, requestId: string, draft: QuoteDraft): Promise<LiveResult<Quote | null>> {
  const client = getSupabaseClient();
  if (!client || !isLiveModeReady()) return unavailable(null);
  if (!isUuid(quoteId) || !isUuid(requestId) || !isUuid(draft.supplier_id)) {
    return { ok: false, data: null, error: "운영 DB 견적 ID가 올바르지 않습니다. 새로고침 후 다시 시도해 주세요." };
  }

  const payload = quoteDraftToLivePayload(requestId, draft);
  return submitLiveQuotePayload(payload, quoteId);
}

export async function listMyLiveReviews(buyerId: string): Promise<LiveResult<Review[]>> {
  const client = getSupabaseClient();
  if (!client || !isLiveModeReady()) return unavailable([]);
  if (!isUuid(buyerId)) return { ok: true, data: [] };

  const { data, error } = await (client as any)
    .from("reviews")
    .select("*")
    .eq("buyer_id", buyerId)
    .order("created_at", { ascending: false });

  if (isMissingLiveReviewsTableError(error)) return { ok: true, data: [] };
  if (error) return { ok: false, data: [], error: getUserFriendlySupabaseError(error) };
  return { ok: true, data: (data ?? []).map(normalizeLiveReview) };
}

export async function listLiveReviewsForSupplier(supplierId: string): Promise<LiveResult<Review[]>> {
  const client = getSupabaseClient();
  if (!client || !isLiveModeReady()) return unavailable([]);
  if (!isUuid(supplierId)) return { ok: true, data: [] };

  const { data, error } = await (client as any)
    .from("reviews")
    .select("*")
    .eq("supplier_id", supplierId)
    .order("created_at", { ascending: false });

  if (isMissingLiveReviewsTableError(error)) return { ok: true, data: [] };
  if (error) return { ok: false, data: [], error: getUserFriendlySupabaseError(error) };
  return { ok: true, data: (data ?? []).map(normalizeLiveReview) };
}

export async function listLiveReviewRepliesForReviews(reviewIds: string[]): Promise<LiveResult<ReviewReply[]>> {
  const client = getSupabaseClient();
  if (!client || !isLiveModeReady()) return unavailable([]);
  const ids = Array.from(new Set(reviewIds.filter(isUuid)));
  if (!ids.length) return { ok: true, data: [] };

  const { data, error } = await (client as any)
    .from("review_replies")
    .select("*")
    .in("review_id", ids)
    .order("created_at", { ascending: false });

  if (isMissingLiveReviewRepliesTableError(error)) return { ok: true, data: [] };
  if (error) return { ok: false, data: [], error: getUserFriendlySupabaseError(error) };
  return { ok: true, data: (data ?? []).map(normalizeLiveReviewReply) };
}

export async function createLiveReviewReply(input: {
  reviewId: string;
  supplierId: string;
  content: string;
}): Promise<LiveResult<ReviewReply | null>> {
  const client = getSupabaseClient();
  if (!client || !isLiveModeReady()) return unavailable(null);
  if (!isUuid(input.reviewId) || !isUuid(input.supplierId)) {
    return { ok: true, data: null };
  }

  const { data, error } = await (client as any)
    .from("review_replies")
    .insert({
      review_id: input.reviewId,
      supplier_id: input.supplierId,
      content: input.content.trim(),
      status: "active",
      is_demo: false,
    })
    .select("*")
    .single();

  if (isMissingLiveReviewRepliesTableError(error)) return { ok: true, data: null };
  if (error || !data) return { ok: false, data: null, error: getUserFriendlySupabaseError(error) };
  return { ok: true, data: normalizeLiveReviewReply(data) };
}

export async function createLiveDealReview(input: {
  dealId: string;
  quoteRequestId: string;
  buyerId: string;
  supplierId: string;
  rating_overall: number;
  rating_price: number;
  rating_delivery: number;
  rating_quality: number;
  rating_communication: number;
  content: string;
  is_public: boolean;
  would_reorder: boolean;
}): Promise<LiveResult<Review | null>> {
  const client = getSupabaseClient();
  if (!client || !isLiveModeReady()) return unavailable(null);
  if (!isUuid(input.dealId) || !isUuid(input.quoteRequestId) || !isUuid(input.buyerId) || !isUuid(input.supplierId)) {
    return { ok: true, data: null };
  }

  const { data, error } = await (client as any)
    .from("reviews")
    .insert({
      deal_id: input.dealId,
      quote_request_id: input.quoteRequestId,
      buyer_id: input.buyerId,
      supplier_id: input.supplierId,
      rating_overall: input.rating_overall,
      rating_price: input.rating_price,
      rating_delivery: input.rating_delivery,
      rating_quality: input.rating_quality,
      rating_communication: input.rating_communication,
      content: input.content.trim(),
      is_public: input.is_public,
      would_reorder: input.would_reorder,
      status: "active",
      is_demo: false,
    })
    .select("*")
    .single();

  if (isMissingLiveReviewsTableError(error)) return { ok: true, data: null };
  if (error || !data) return { ok: false, data: null, error: getUserFriendlySupabaseError(error) };
  return { ok: true, data: normalizeLiveReview(data) };
}

function isMissingLiveReviewsTableError(error: unknown) {
  if (!error || typeof error !== "object") return false;
  const record = error as { code?: string; message?: string };
  return record.code === "PGRST205" && /reviews/i.test(record.message ?? "");
}

function isMissingLiveReviewRepliesTableError(error: unknown) {
  if (!error || typeof error !== "object") return false;
  const record = error as { code?: string; message?: string };
  return record.code === "PGRST205" && /review_replies/i.test(record.message ?? "");
}

async function submitLiveQuotePayload(payload: ReturnType<typeof quoteDraftToLivePayload>, quoteId?: string): Promise<LiveResult<Quote | null>> {
  const client = getSupabaseClient();
  if (!client || !isLiveModeReady()) return unavailable(null);
  const { data, error } = await (client as any).rpc("submit_supplier_quote", rpcQuotePayload(payload, quoteId));
  if (!error && data) return { ok: true, data: normalizeLiveQuote(data) };
  if (isServerQuoteFallbackError(error)) return submitLiveQuoteThroughApi(payload, quoteId);
  return { ok: false, data: null, error: getUserFriendlySupabaseError(error) };
}

async function submitLiveQuoteThroughApi(payload: ReturnType<typeof quoteDraftToLivePayload>, quoteId?: string): Promise<LiveResult<Quote | null>> {
  const session = await getCurrentSession();
  const accessToken = session?.access_token;
  if (!accessToken) return { ok: false, data: null, error: "로그인이 필요합니다. 다시 로그인 후 견적서를 제출해 주세요." };
  try {
    const response = await fetch(apiEndpoint("/api/quotes/submit"), {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quoteId: quoteId || null, payload }),
    });
    const body = (await response.json().catch(() => ({}))) as { ok?: boolean; quote?: Record<string, unknown>; error?: string };
    if (!response.ok || !body.ok || !body.quote) {
      return { ok: false, data: null, error: body.error || "견적 저장 서버 응답이 올바르지 않습니다." };
    }
    return { ok: true, data: normalizeLiveQuote(body.quote) };
  } catch {
    return { ok: false, data: null, error: "견적 저장 서버에 연결할 수 없습니다. 잠시 후 다시 시도해 주세요." };
  }
}

function isServerQuoteFallbackError(error: unknown) {
  if (!error || typeof error !== "object") return false;
  const record = error as { code?: string; message?: string };
  const message = record.message ?? "";
  return (
    record.code === "42703"
    || record.code === "42501"
    || record.code === "23503"
    || /column "?email"? does not exist|permission denied|row-level security|rls|grant|foreign key|quotes_quote_request_id_fkey/i.test(message)
  );
}

function apiEndpoint(path: string) {
  if (/^https?:\/\//i.test(path) || !appConfig.apiBaseUrl) return path;
  return `${appConfig.apiBaseUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

function normalizeLiveQuoteRequest(row: Record<string, unknown>): QuoteRequest {
  const createdAt = String(row.created_at ?? new Date().toISOString());
  return {
    id: String(row.id),
    buyer_id: String(row.buyer_id),
    title: String(row.title ?? "견적 요청"),
    category_id: String(row.category_id ?? ""),
    category_name: String(row.category_name ?? "기타"),
    delivery_region: String(row.delivery_region ?? ""),
    delivery_address: row.delivery_address ? String(row.delivery_address) : "",
    desired_delivery_date: row.desired_delivery_date ? String(row.desired_delivery_date) : "",
    need_tax_invoice: Boolean(row.need_tax_invoice),
    card_payment_required: Boolean(row.card_payment_required),
    description: row.description ? String(row.description) : "",
    status: (row.status as QuoteRequest["status"]) ?? "open",
    created_at: createdAt,
    updated_at: String(row.updated_at ?? createdAt),
    selected_quote_id: row.selected_quote_id ? String(row.selected_quote_id) : undefined,
    input_method: (row.input_method as QuoteRequest["input_method"]) ?? "manual",
    urgent: Boolean(row.urgent),
    budget_min: row.budget_min == null ? undefined : Number(row.budget_min),
    budget_max: row.budget_max == null ? undefined : Number(row.budget_max),
  };
}

function normalizeLiveCategories(rows: Category[]): Category[] {
  const byName = new Map<string, Category>();
  for (const row of rows) {
    const name = canonicalSupplierCategoryName(row.name);
    if (byName.has(name)) continue;
    byName.set(name, { ...row, name });
  }
  return [...byName.values()].sort((a, b) => a.sort_order - b.sort_order);
}

function canonicalSupplierCategoryName(value: string) {
  const compact = value.trim().replace(/\s+/g, "");
  if (compact === "설비/닥트/환기자재" || compact === "건축자재" || compact === "건축/설비/닥트/환기자재") {
    return "건축/설비/닥트/환기자재";
  }
  return value.trim();
}

function normalizeLiveQuote(row: Record<string, unknown>): Quote {
  const createdAt = String(row.created_at ?? new Date().toISOString());
  return {
    id: String(row.id),
    quote_request_id: String(row.quote_request_id),
    supplier_id: String(row.supplier_id),
    total_amount: Number(row.total_amount) || 0,
    delivery_fee: Number(row.delivery_fee) || 0,
    final_amount: Number(row.final_amount) || 0,
    available_delivery_date: row.available_delivery_date ? String(row.available_delivery_date).slice(0, 10) : "",
    tax_invoice_available: row.tax_invoice_available == null ? true : Boolean(row.tax_invoice_available),
    card_payment_available: Boolean(row.card_payment_available),
    alternative_proposal: row.alternative_proposal ? String(row.alternative_proposal) : "",
    item_price_memo: row.item_price_memo ? String(row.item_price_memo) : "",
    memo: row.memo ? String(row.memo) : "",
    valid_until: row.valid_until ? String(row.valid_until).slice(0, 10) : "",
    status: (row.status as Quote["status"]) ?? "submitted",
    created_at: createdAt,
    updated_at: String(row.updated_at ?? createdAt),
  };
}

function normalizeLiveReview(row: Record<string, unknown>): Review {
  const createdAt = String(row.created_at ?? new Date().toISOString());
  return {
    id: String(row.id),
    deal_id: String(row.deal_id),
    quote_request_id: String(row.quote_request_id),
    buyer_id: String(row.buyer_id),
    supplier_id: String(row.supplier_id),
    rating_overall: Number(row.rating_overall) || 5,
    rating_price: Number(row.rating_price) || 5,
    rating_delivery: Number(row.rating_delivery) || 5,
    rating_quality: Number(row.rating_quality) || 5,
    rating_communication: Number(row.rating_communication) || 5,
    content: String(row.content ?? ""),
    is_public: row.is_public == null ? true : Boolean(row.is_public),
    would_reorder: row.would_reorder == null ? true : Boolean(row.would_reorder),
    status: (row.status as Review["status"]) ?? "active",
    created_at: createdAt,
    updated_at: String(row.updated_at ?? createdAt),
  };
}

function normalizeLiveReviewReply(row: Record<string, unknown>): ReviewReply {
  const createdAt = String(row.created_at ?? new Date().toISOString());
  return {
    id: String(row.id),
    review_id: String(row.review_id),
    supplier_id: String(row.supplier_id),
    content: String(row.content ?? ""),
    status: (row.status as ReviewReply["status"]) ?? "active",
    created_at: createdAt,
    updated_at: String(row.updated_at ?? createdAt),
  };
}

function normalizeLiveSupplierProfile(row: Record<string, unknown>): SupplierProfile {
  const createdAt = String(row.created_at ?? new Date().toISOString());
  const serviceRegions = Array.isArray(row.service_regions) ? row.service_regions.map(String) : [];
  const categories = Array.isArray(row.categories) ? Array.from(new Set(row.categories.map((entry) => canonicalSupplierCategoryName(String(entry))))) : [];
  const subCategories = Array.isArray(row.sub_categories) ? row.sub_categories.map(String) : [];
  const deliveryDays = Array.isArray(row.delivery_days) ? row.delivery_days.map(String) : [];
  const deliveryTimeSlots = Array.isArray(row.delivery_time_slots) ? row.delivery_time_slots.map(String) : [];
  return {
    id: String(row.id),
    user_id: String(row.user_id),
    business_name: String(row.business_name ?? "공급업체"),
    business_number: String(row.business_number ?? ""),
    representative_name: String(row.representative_name ?? ""),
    manager_name: row.manager_name ? String(row.manager_name) : "",
    manager_phone: row.manager_phone ? String(row.manager_phone) : "",
    phone: String(row.phone ?? ""),
    email: row.email ? String(row.email) : "",
    address: row.address ? String(row.address) : "",
    description: row.description ? String(row.description) : "",
    service_regions: serviceRegions,
    categories,
    sub_categories: subCategories,
    min_order_amount: row.min_order_amount == null ? 0 : Number(row.min_order_amount),
    delivery_fee_policy: row.delivery_fee_policy ? String(row.delivery_fee_policy) : "",
    free_delivery_min_amount: row.free_delivery_min_amount == null ? 0 : Number(row.free_delivery_min_amount),
    same_day_delivery_available: Boolean(row.same_day_delivery_available),
    urgent_delivery_available: Boolean(row.urgent_delivery_available),
    delivery_days: deliveryDays,
    delivery_time_slots: deliveryTimeSlots,
    tax_invoice_available: Boolean(row.tax_invoice_available),
    card_payment_available: Boolean(row.card_payment_available),
    bank_transfer_available: row.bank_transfer_available == null ? true : Boolean(row.bank_transfer_available),
    on_site_payment_available: Boolean(row.on_site_payment_available),
    default_quote_valid_days: row.default_quote_valid_days == null ? 3 : Number(row.default_quote_valid_days),
    approval_status: (row.approval_status as SupplierProfile["approval_status"]) ?? "pending",
    operational_status: (row.operational_status as SupplierProfile["operational_status"]) ?? "normal",
    document_status: (row.document_status as SupplierProfile["document_status"]) ?? "uploaded",
    admin_memo: row.admin_memo ? String(row.admin_memo) : undefined,
    created_at: createdAt,
    updated_at: String(row.updated_at ?? createdAt),
  };
}

function quoteDraftToLivePayload(requestId: string, draft: QuoteDraft) {
  const itemizedPrices = draft.quote_mode === "itemized" ? draft.item_prices ?? [] : [];
  const itemizedSubtotal = itemizedPrices.reduce((sum, item) => sum + Math.max(0, Number(item.total_price) || 0), 0);
  const subtotalAmount = draft.quote_mode === "itemized" && itemizedSubtotal > 0 ? itemizedSubtotal : Number(draft.total_amount);
  const itemizedMemo = itemizedPrices.length > 0
    ? itemizedPrices
        .filter((item) => Number(item.total_price) > 0)
        .map((item) => {
          const quantityLabel = `${item.quantity.toLocaleString("ko-KR")}${item.unit}`;
          const unitPriceLabel = item.unit_price > 0 ? ` / 단가 ${item.unit_price.toLocaleString("ko-KR")}원` : "";
          const memo = item.memo?.trim() ? ` / ${item.memo.trim()}` : "";
          return `${item.item_name} ${quantityLabel}: ${item.total_price.toLocaleString("ko-KR")}원${unitPriceLabel}${memo}`;
        })
        .join("\n")
    : "";
  const itemPriceMemo = [itemizedMemo, draft.item_price_memo.trim()].filter(Boolean).join("\n");
  return {
    quote_request_id: requestId,
    supplier_id: draft.supplier_id,
    total_amount: Math.max(0, Math.round(subtotalAmount || 0)),
    delivery_fee: Math.max(0, Math.round(Number(draft.delivery_fee) || 0)),
    final_amount: Math.max(0, Math.round((subtotalAmount || 0) + (Number(draft.delivery_fee) || 0))),
    available_delivery_date: draft.available_delivery_date || null,
    tax_invoice_available: draft.tax_invoice_available,
    card_payment_available: draft.card_payment_available,
    alternative_proposal: draft.alternative_proposal.trim() || null,
    item_price_memo: itemPriceMemo || null,
    memo: draft.memo.trim() || null,
    valid_until: draft.valid_until || null,
    status: "submitted" as const,
    is_demo: false,
  };
}

function rpcQuotePayload(payload: ReturnType<typeof quoteDraftToLivePayload>, quoteId?: string) {
  return {
    p_quote_id: quoteId || null,
    p_quote_request_id: payload.quote_request_id,
    p_supplier_id: payload.supplier_id,
    p_total_amount: payload.total_amount,
    p_delivery_fee: payload.delivery_fee,
    p_available_delivery_date: payload.available_delivery_date,
    p_tax_invoice_available: payload.tax_invoice_available,
    p_card_payment_available: payload.card_payment_available,
    p_alternative_proposal: payload.alternative_proposal,
    p_item_price_memo: payload.item_price_memo,
    p_memo: payload.memo,
    p_valid_until: payload.valid_until,
  };
}

function normalizeLiveQuoteRequestItem(row: Record<string, unknown>): QuoteRequestItem {
  return {
    id: String(row.id),
    quote_request_id: String(row.quote_request_id),
    item_name: String(row.item_name ?? ""),
    spec: row.spec ? String(row.spec) : "",
    quantity: Number(row.quantity) || 1,
    unit: String(row.unit ?? "개"),
    memo: row.memo ? String(row.memo) : "",
    created_at: String(row.created_at ?? new Date().toISOString()),
    is_required: row.is_required == null ? true : Boolean(row.is_required),
    allow_alternative: row.allow_alternative == null ? true : Boolean(row.allow_alternative),
    confidence_score: row.confidence_score == null ? undefined : Number(row.confidence_score),
    needs_review: row.needs_review == null ? false : Boolean(row.needs_review),
  };
}

async function resolveLiveCategoryName(draft: QuoteRequestDraft): Promise<string> {
  const client = getSupabaseClient();
  if (client && isUuid(draft.category_id)) {
    const { data, error } = await client.from("categories").select("name").eq("id", draft.category_id).maybeSingle();
    if (!error && data?.name) return data.name;
  }
  if (draft.category_id && localCategoryNamesById[draft.category_id]) return localCategoryNamesById[draft.category_id];
  return draft.template_name || draft.title || "기타";
}

export async function listMyLiveNotifications(userId: string): Promise<LiveResult<Notification[]>> {
  const client = getSupabaseClient();
  if (!client || !isLiveModeReady()) return unavailable([]);
  const { data, error } = await client.from("notifications").select("*").eq("user_id", userId).eq("is_archived", false).order("created_at", { ascending: false });
  if (isMissingLiveNotificationsTableError(error)) return { ok: true, data: [] };
  if (error) return { ok: false, data: [], error: getUserFriendlySupabaseError(error) };
  return { ok: true, data: (data ?? []) as Notification[] };
}

function isMissingLiveNotificationsTableError(error: unknown) {
  if (!error || typeof error !== "object") return false;
  const record = error as { code?: string; message?: string };
  return record.code === "PGRST205" && /notifications/i.test(record.message ?? "");
}

export async function createLiveBetaFeedback(feedback: Omit<BetaFeedback, "id" | "created_at" | "updated_at">): Promise<LiveResult<BetaFeedback | null>> {
  const client = getSupabaseClient();
  if (!client || !isLiveModeReady()) return unavailable(null);
  const { data, error } = await client.from("feedbacks").insert(feedback).select("*").single();
  if (error) return { ok: false, data: null, error: getUserFriendlySupabaseError(error) };
  return { ok: true, data: data as BetaFeedback };
}
