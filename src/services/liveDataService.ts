import type { BetaFeedback, Category, Notification, QuoteRequest, QuoteRequestDraft, QuoteRequestItem } from "../types";
import { isLiveModeReady } from "../lib/env";
import { getSupabaseClient, isSupabaseConfigured } from "../lib/supabase/client";
import { getUserFriendlySupabaseError, logSupabaseError } from "../lib/supabase/errors";

export type LiveResult<T> = { ok: true; data: T } | { ok: false; data: T; error: string };

export const liveFeatureMatrix = [
  { name: "Auth 세션", status: "prepared", note: "publishable key 입력 시 Supabase Auth 세션을 읽습니다." },
  { name: "프로필/권한", status: "prepared", note: "profiles.role 기반으로 buyer/supplier/admin을 분리합니다." },
  { name: "카테고리", status: "ready", note: "categories 테이블 read 전환 준비 완료" },
  { name: "견적요청", status: "ready", note: "quote_requests + quote_request_items 생성/조회 준비 완료" },
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
  return { ok: true, data: (data ?? []) as Category[] };
}

export async function listMyLiveQuoteRequests(buyerId: string): Promise<LiveResult<QuoteRequest[]>> {
  const client = getSupabaseClient();
  if (!client || !isLiveModeReady()) return unavailable([]);
  const { data, error } = await client.from("quote_requests").select("*").eq("buyer_id", buyerId).order("created_at", { ascending: false });
  if (error) return { ok: false, data: [], error: getUserFriendlySupabaseError(error) };
  return { ok: true, data: (data ?? []) as QuoteRequest[] };
}

export async function listLiveQuoteRequestItems(requestId: string): Promise<LiveResult<QuoteRequestItem[]>> {
  const client = getSupabaseClient();
  if (!client || !isLiveModeReady()) return unavailable([]);
  const { data, error } = await client.from("quote_request_items").select("*").eq("quote_request_id", requestId).order("created_at");
  if (error) return { ok: false, data: [], error: getUserFriendlySupabaseError(error) };
  return { ok: true, data: (data ?? []) as QuoteRequestItem[] };
}

export async function createLiveQuoteRequest(buyerId: string, draft: QuoteRequestDraft): Promise<LiveResult<QuoteRequest | null>> {
  const client = getSupabaseClient();
  if (!client || !isLiveModeReady()) return unavailable(null);

  const { data: request, error: requestError } = await client
    .from("quote_requests")
    .insert({
      buyer_id: buyerId,
      title: draft.title,
      category_id: draft.category_id || null,
      category_name: draft.template_name || draft.title,
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

  return { ok: true, data: request as QuoteRequest };
}

export async function listMyLiveNotifications(userId: string): Promise<LiveResult<Notification[]>> {
  const client = getSupabaseClient();
  if (!client || !isLiveModeReady()) return unavailable([]);
  const { data, error } = await client.from("notifications").select("*").eq("user_id", userId).eq("is_archived", false).order("created_at", { ascending: false });
  if (error) return { ok: false, data: [], error: getUserFriendlySupabaseError(error) };
  return { ok: true, data: (data ?? []) as Notification[] };
}

export async function createLiveBetaFeedback(feedback: Omit<BetaFeedback, "id" | "created_at" | "updated_at">): Promise<LiveResult<BetaFeedback | null>> {
  const client = getSupabaseClient();
  if (!client || !isLiveModeReady()) return unavailable(null);
  const { data, error } = await client.from("feedbacks").insert(feedback).select("*").single();
  if (error) return { ok: false, data: null, error: getUserFriendlySupabaseError(error) };
  return { ok: true, data: data as BetaFeedback };
}
