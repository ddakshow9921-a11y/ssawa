const APP_ID = "ssawa";
const APP_NAME = "SSAWA";
const VERSION = "0.1.0";
const GEMINI_API_KEY_ENV_KEYS = ["GEMINI_API_KEY", "GOOGLE_AI_API_KEY", "GOOGLE_GENAI_API_KEY", "GOOGLE_API_KEY", "GOOGLE_GENERATIVE_AI_API_KEY"];

function statusPayload(request) {
  const url = readUrl(request);
  const geminiApiKey = readFirstEnv(GEMINI_API_KEY_ENV_KEYS);
  const environment = process.env.VITE_APP_ENV || process.env.NEXT_PUBLIC_APP_ENV || process.env.VERCEL_ENV || process.env.NODE_ENV || "unknown";
  const checks = {
    appUrlConfigured: Boolean(process.env.VITE_APP_URL || process.env.NEXT_PUBLIC_APP_URL),
    apiBaseUrlConfigured: Boolean(process.env.VITE_API_BASE_URL),
    supabaseUrlConfigured: Boolean(process.env.VITE_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL),
    supabaseAnonKeyConfigured: Boolean(process.env.VITE_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
    supabaseServiceRoleConfigured: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY),
    liveDataEnabled: readBoolean(process.env.VITE_USE_LIVE_DATA || process.env.NEXT_PUBLIC_USE_LIVE_DATA, false),
    ntsBusinessServiceKeyConfigured: Boolean(process.env.NTS_BUSINESS_SERVICE_KEY),
    demoDataEnabled: readBoolean(process.env.VITE_ENABLE_DEMO_DATA || process.env.NEXT_PUBLIC_ENABLE_DEMO_DATA, false),
    betaBadgeEnabled: readBoolean(process.env.VITE_ENABLE_BETA_BADGE || process.env.NEXT_PUBLIC_ENABLE_BETA_BADGE, false),
    mockAiEnabled: readBoolean(process.env.VITE_ENABLE_MOCK_AI || process.env.NEXT_PUBLIC_ENABLE_MOCK_AI, true),
    mockPaymentEnabled: readBoolean(process.env.VITE_ENABLE_MOCK_PAYMENT || process.env.NEXT_PUBLIC_ENABLE_MOCK_PAYMENT, true),
    mockSettlementEnabled: readBoolean(process.env.VITE_ENABLE_MOCK_SETTLEMENT || process.env.NEXT_PUBLIC_ENABLE_MOCK_SETTLEMENT, true),
    geminiApiKeyConfigured: Boolean(geminiApiKey),
    geminiApiKeyLooksValid: looksLikeGeminiApiKey(geminiApiKey),
  };
  const requiredChecks = [
    "appUrlConfigured",
    "supabaseUrlConfigured",
    "supabaseAnonKeyConfigured",
    "supabaseServiceRoleConfigured",
    "ntsBusinessServiceKeyConfigured",
  ];
  const missingRequired = requiredChecks.filter((key) => !checks[key]);
  const status = missingRequired.length ? "warning" : "ok";

  return {
    ok: status !== "error",
    status,
    app: APP_ID,
    displayName: APP_NAME,
    env: environment,
    environment,
    version: process.env.npm_package_version || VERSION,
    time: new Date().toISOString(),
    checks,
    missingRequired,
    appUrlConfigured: checks.appUrlConfigured,
    apiBaseUrlConfigured: checks.apiBaseUrlConfigured,
    supabaseUrlConfigured: checks.supabaseUrlConfigured,
    supabasePublishableKeyConfigured: checks.supabaseAnonKeyConfigured,
    supabaseAnonKeyConfigured: checks.supabaseAnonKeyConfigured,
    supabaseServiceRoleConfigured: checks.supabaseServiceRoleConfigured,
    liveDataEnabled: checks.liveDataEnabled,
    ntsBusinessServiceKeyConfigured: checks.ntsBusinessServiceKeyConfigured,
    demoDataEnabled: checks.demoDataEnabled,
    betaBadgeEnabled: checks.betaBadgeEnabled,
    mockAiEnabled: checks.mockAiEnabled,
    mockPaymentEnabled: checks.mockPaymentEnabled,
    mockSettlementEnabled: checks.mockSettlementEnabled,
    geminiApiKeyConfigured: checks.geminiApiKeyConfigured,
    geminiApiKeyLooksValid: checks.geminiApiKeyLooksValid,
    geminiApiKeyType: geminiApiKeyType(geminiApiKey),
    geminiModel: process.env.GEMINI_MODEL || "",
    vercelEnv: process.env.VERCEL_ENV || "",
    commitSha: process.env.VERCEL_GIT_COMMIT_SHA || "",
    deploymentUrl: process.env.VERCEL_URL || "",
    path: url.pathname,
    timestamp: new Date().toISOString(),
  };
}

export default async function handler(request, response) {
  const payload = statusPayload(request);
  if (!response) return toWebResponse(payload);
  response.statusCode = 200;
  response.setHeader("Content-Type", "application/json; charset=utf-8");
  response.setHeader("Cache-Control", "no-store");
  response.end(JSON.stringify(payload));
}

export async function fetch(request) {
  return toWebResponse(statusPayload(request));
}

function toWebResponse(payload) {
  return new Response(JSON.stringify(payload), {
    status: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

function readUrl(request) {
  const rawUrl = typeof request?.url === "string" ? request.url : request?.headers?.host ? `https://${request.headers.host}${request.url || "/"}` : "http://127.0.0.1/status";
  try {
    return new URL(rawUrl, "http://127.0.0.1");
  } catch {
    return new URL("http://127.0.0.1/status");
  }
}

function readBoolean(value, fallback) {
  if (value == null || value === "") return fallback;
  return ["1", "true", "yes", "on"].includes(String(value).toLowerCase());
}

function readFirstEnv(keys) {
  for (const key of keys) {
    const value = String(process.env[key] || "").trim();
    if (value) return value;
  }
  return "";
}

function looksLikeGeminiApiKey(value) {
  const text = String(value || "").trim();
  return text.startsWith("AIza") || text.startsWith("AQ.");
}

function geminiApiKeyType(value) {
  const text = String(value || "").trim();
  if (text.startsWith("AQ.")) return "auth";
  if (text.startsWith("AIza")) return "standard";
  return "";
}
