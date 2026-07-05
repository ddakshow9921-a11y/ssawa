const APP_NAME = "싸와!";
const GEMINI_API_KEY_ENV_KEYS = ["GEMINI_API_KEY", "GOOGLE_AI_API_KEY", "GOOGLE_GENAI_API_KEY", "GOOGLE_API_KEY", "GOOGLE_GENERATIVE_AI_API_KEY"];

function statusPayload(request) {
  const url = readUrl(request);
  const geminiApiKey = readFirstEnv(GEMINI_API_KEY_ENV_KEYS);
  return {
    ok: true,
    status: "OK",
    app: APP_NAME,
    environment: process.env.VITE_APP_ENV || process.env.NEXT_PUBLIC_APP_ENV || process.env.NODE_ENV || "unknown",
    appUrlConfigured: Boolean(process.env.VITE_APP_URL || process.env.NEXT_PUBLIC_APP_URL),
    apiBaseUrlConfigured: Boolean(process.env.VITE_API_BASE_URL),
    supabaseUrlConfigured: Boolean(process.env.VITE_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL),
    supabasePublishableKeyConfigured: Boolean(process.env.VITE_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
    liveDataEnabled: readBoolean(process.env.VITE_USE_LIVE_DATA || process.env.NEXT_PUBLIC_USE_LIVE_DATA, false),
    geminiApiKeyConfigured: Boolean(geminiApiKey),
    geminiApiKeyLooksValid: looksLikeGeminiApiKey(geminiApiKey),
    geminiModel: process.env.GEMINI_MODEL || "",
    ntsBusinessServiceKeyConfigured: Boolean(process.env.NTS_BUSINESS_SERVICE_KEY),
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
  return String(value || "").startsWith("AIza");
}
