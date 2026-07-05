export type AppEnvironment = "local" | "beta" | "production";

const SUPABASE_URL = "https://dewlendyeycxfmblecog.supabase.co";

function normalizeEnvironment(value: string | undefined): AppEnvironment {
  if (value === "beta" || value === "production") return value;
  return "local";
}

function runtimeHostname() {
  if (typeof window === "undefined") return "";
  return window.location.hostname;
}

function isLocalHostname(hostname: string) {
  return hostname === "localhost" || hostname === "127.0.0.1" || hostname === "::1";
}

function inferEnvironment(value: string | undefined): AppEnvironment {
  const normalized = normalizeEnvironment(value);
  if (value) return normalized;
  const hostname = runtimeHostname();
  if (!hostname || isLocalHostname(hostname)) return "local";
  return "production";
}

function readBoolean(value: string | undefined, fallback: boolean) {
  if (value == null || value === "") return fallback;
  return ["1", "true", "yes", "on"].includes(value.toLowerCase());
}

function readNumber(value: string | undefined, fallback: number) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function normalizeBaseUrl(value: string | undefined) {
  const trimmed = value?.trim() ?? "";
  return trimmed.endsWith("/") ? trimmed.slice(0, -1) : trimmed;
}

const appEnv = inferEnvironment(import.meta.env.VITE_APP_ENV || import.meta.env.NEXT_PUBLIC_APP_ENV);
const supabasePublishableKey =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  import.meta.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  "";

export const appConfig = {
  appEnv,
  appUrl: import.meta.env.VITE_APP_URL || import.meta.env.NEXT_PUBLIC_APP_URL || (typeof window !== "undefined" ? window.location.origin : ""),
  apiBaseUrl: normalizeBaseUrl(import.meta.env.VITE_API_BASE_URL || import.meta.env.NEXT_PUBLIC_API_BASE_URL),
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL || import.meta.env.NEXT_PUBLIC_SUPABASE_URL || SUPABASE_URL,
  supabasePublishableKey,
  enableDemoData: readBoolean(import.meta.env.VITE_ENABLE_DEMO_DATA || import.meta.env.NEXT_PUBLIC_ENABLE_DEMO_DATA, appEnv === "local"),
  useLiveData: readBoolean(import.meta.env.VITE_USE_LIVE_DATA || import.meta.env.NEXT_PUBLIC_USE_LIVE_DATA, appEnv !== "local" && Boolean(supabasePublishableKey)),
  enableMockAi: readBoolean(import.meta.env.VITE_ENABLE_MOCK_AI || import.meta.env.NEXT_PUBLIC_ENABLE_MOCK_AI, true),
  enableMockPayment: readBoolean(import.meta.env.VITE_ENABLE_MOCK_PAYMENT || import.meta.env.NEXT_PUBLIC_ENABLE_MOCK_PAYMENT, true),
  enableMockSettlement: readBoolean(import.meta.env.VITE_ENABLE_MOCK_SETTLEMENT || import.meta.env.NEXT_PUBLIC_ENABLE_MOCK_SETTLEMENT, true),
  enableBetaBadge: readBoolean(import.meta.env.VITE_ENABLE_BETA_BADGE || import.meta.env.NEXT_PUBLIC_ENABLE_BETA_BADGE, appEnv !== "production"),
  enableAnalysis: readBoolean(import.meta.env.VITE_ENABLE_ANALYSIS, true),
  enableSupplierQuotes: readBoolean(import.meta.env.VITE_ENABLE_SUPPLIER_QUOTES, true),
  enableDeals: readBoolean(import.meta.env.VITE_ENABLE_DEALS, true),
  enableMessages: readBoolean(import.meta.env.VITE_ENABLE_MESSAGES, true),
  enableFeedback: readBoolean(import.meta.env.VITE_ENABLE_FEEDBACK, true),
  maxImageMb: readNumber(import.meta.env.VITE_STORAGE_MAX_IMAGE_MB, 10),
  maxPdfMb: readNumber(import.meta.env.VITE_STORAGE_MAX_PDF_MB, 20),
  maxExcelMb: readNumber(import.meta.env.VITE_STORAGE_MAX_EXCEL_MB, 10),
  supportEmail: import.meta.env.VITE_SUPPORT_EMAIL || "",
  kakaoChannelUrl: import.meta.env.VITE_KAKAO_CHANNEL_URL || "",
  companyName: import.meta.env.VITE_COMPANY_NAME || "싸와!",
  companyPhone: import.meta.env.VITE_COMPANY_PHONE || "",
  companyEmail: import.meta.env.VITE_COMPANY_EMAIL || "",
} as const;

export function isLiveModeReady() {
  return appConfig.useLiveData && Boolean(appConfig.supabaseUrl && appConfig.supabasePublishableKey);
}

export function environmentLabel(value: AppEnvironment) {
  if (value === "production") return "운영";
  if (value === "beta") return "베타";
  return "로컬";
}
