import { jsonResult, runJsonPost } from "./_http.js";

const GEMINI_API_BASE = "https://generativelanguage.googleapis.com/v1beta/models";
const DEFAULT_MODEL = "gemini-3.5-flash";
const MAX_GEMINI_ATTEMPTS = 3;
const CATEGORY_NAMES = ["식자재비", "포장재비", "소모품비", "주방용품", "설비자재", "닥트/환기자재", "건축자재", "공구/산업자재", "배송비", "기타 매입", "미분류"];
const GEMINI_API_KEY_ENV_KEYS = ["GEMINI_API_KEY", "GOOGLE_AI_API_KEY", "GOOGLE_GENAI_API_KEY", "GOOGLE_API_KEY", "GOOGLE_GENERATIVE_AI_API_KEY"];
const OAUTH_CREDENTIAL_ENV_KEYS = ["GOOGLE_OAUTH_CLIENT_ID", "GOOGLE_OAUTH_CLIENT_SECRET", "GOOGLE_CLIENT_ID", "GOOGLE_CLIENT_SECRET"];

async function handleAnalyzeBody(input) {
  const transcript = cleanString(input.transcript);
  if (!transcript) {
    return json({ error: "분석할 음성 주문 내용이 없습니다." }, 400);
  }
  if (transcript.length > 8000) {
    return json({ error: "음성 주문 내용이 너무 깁니다. 핵심 주문 내용만 남겨 다시 분석해 주세요." }, 413);
  }

  const apiKey = getGeminiApiKey();
  if (!apiKey) {
    return json({ error: missingGeminiKeyMessage() }, 503);
  }
  if (looksLikeGoogleOAuthCredential(apiKey)) {
    return json({ error: googleOAuthCredentialMessage() }, 400);
  }

  const model = cleanModelName(process.env.GEMINI_MODEL || DEFAULT_MODEL);
  const geminiRequestBody = JSON.stringify({
    contents: [{ parts: [{ text: buildPrompt(transcript) }] }],
    generationConfig: {
      temperature: 0.1,
      response_mime_type: "application/json",
      response_schema: voiceOrderSchema(),
    },
  });

  let geminiResponse;
  let geminiPayload = {};
  for (let attempt = 1; attempt <= MAX_GEMINI_ATTEMPTS; attempt += 1) {
    geminiResponse = await globalThis.fetch(`${GEMINI_API_BASE}/${model}:generateContent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey,
      },
      body: geminiRequestBody,
    });
    geminiPayload = await geminiResponse.json().catch(() => ({}));
    if (geminiResponse.ok || !isTemporaryGeminiDemandError(geminiErrorMessage(geminiPayload), geminiResponse.status) || attempt === MAX_GEMINI_ATTEMPTS) {
      break;
    }
    await waitForRetry(attempt);
  }

  if (!geminiResponse.ok) {
    return json({ error: geminiErrorMessage(geminiPayload, geminiResponse.status) }, geminiResponse.status);
  }

  const text = extractGeminiText(geminiPayload);
  if (!text) {
    return json({ error: "AI 분석 응답에서 결과를 찾지 못했습니다." }, 502);
  }

  try {
    return json({ ...normalizeResult(JSON.parse(stripJsonFence(text))), source: "gemini", model });
  } catch {
    return json({ error: "AI 분석 결과를 해석하지 못했습니다.", rawText: text }, 502);
  }
}

export default async function handler(request, response) {
  return runJsonPost(request, response, handleAnalyzeBody);
}

export async function fetch(request) {
  return handler(request);
}

function buildPrompt(transcript) {
  return `
너는 B2B 자재 견적구매 플랫폼 "싸와!"의 오늘장사 음성 주문 정리 엔진이다.

사용자가 말한 주문 내용:
${transcript}

목표:
- 음식점/매장 운영자가 말로 남긴 주문 내용을 오늘장사 매입 장부에 저장할 수 있게 정리한다.
- 품목명, 수량, 단위, 단가, 총액을 가능한 한 추출한다.

규칙:
- 실제 구매/주문 품목만 items에 넣는다.
- "총액", "결제", "오늘", "주문했어" 같은 말은 품목명으로 넣지 않는다.
- 금액이 "2만5천원"이면 25000, "7천원"이면 7000으로 변환한다.
- 품목별 금액이 없고 전체 금액만 있으면 totalAmount에는 전체 금액을 넣고 해당 품목 needsReview를 true로 둔다.
- categoryName은 반드시 다음 중 하나로 선택한다: ${CATEGORY_NAMES.join(", ")}.
- supplierName이 말에 없으면 "음성 주문"으로 둔다.
- 날짜가 말에 없으면 purchaseDate는 빈 문자열로 둔다.
- JSON만 반환한다.
`;
}

function voiceOrderSchema() {
  return {
    type: "OBJECT",
    properties: {
      supplierName: { type: "STRING" },
      purchaseDate: { type: "STRING", description: "YYYY-MM-DD 형식. 없으면 빈 문자열" },
      categoryName: { type: "STRING", enum: CATEGORY_NAMES },
      totalAmount: { type: "NUMBER" },
      rawText: { type: "STRING" },
      confidenceScore: { type: "INTEGER", minimum: 30, maximum: 99 },
      items: {
        type: "ARRAY",
        items: {
          type: "OBJECT",
          properties: {
            itemName: { type: "STRING" },
            spec: { type: "STRING" },
            quantity: { type: "NUMBER" },
            unit: { type: "STRING" },
            unitPrice: { type: "NUMBER" },
            totalPrice: { type: "NUMBER" },
            memo: { type: "STRING" },
            confidenceScore: { type: "INTEGER", minimum: 30, maximum: 99 },
            needsReview: { type: "BOOLEAN" },
            reviewReason: { type: "STRING" },
          },
          required: ["itemName", "quantity", "unit", "confidenceScore", "needsReview"],
        },
      },
    },
    required: ["supplierName", "categoryName", "totalAmount", "rawText", "confidenceScore", "items"],
  };
}

function normalizeResult(result) {
  const items = Array.isArray(result.items) ? result.items : [];
  const normalizedItems = items.slice(0, 30).map((item) => normalizeItem(item));
  const totalAmount = positiveNumber(result.totalAmount, normalizedItems.reduce((sum, item) => sum + item.totalPrice, 0));
  return {
    supplierName: cleanString(result.supplierName) || "음성 주문",
    purchaseDate: cleanString(result.purchaseDate),
    categoryName: CATEGORY_NAMES.includes(result.categoryName) ? result.categoryName : "기타 매입",
    totalAmount,
    rawText: cleanString(result.rawText),
    confidenceScore: clampScore(positiveNumber(result.confidenceScore, normalizedItems.some((item) => item.needsReview) ? 68 : 82)),
    items: normalizedItems,
  };
}

function normalizeItem(item) {
  const source = item && typeof item === "object" ? item : {};
  const quantity = positiveNumber(source.quantity, 1) || 1;
  const unitPrice = positiveNumber(source.unitPrice, 0);
  const totalPrice = positiveNumber(source.totalPrice, unitPrice * quantity);
  const confidenceScore = clampScore(positiveNumber(source.confidenceScore, totalPrice > 0 ? 78 : 60));
  return {
    itemName: cleanString(source.itemName) || "품목명 확인 필요",
    spec: cleanString(source.spec),
    quantity,
    unit: cleanString(source.unit) || "개",
    unitPrice: unitPrice || (quantity > 0 ? Math.round(totalPrice / quantity) : totalPrice),
    totalPrice,
    memo: cleanString(source.memo),
    confidenceScore,
    needsReview: Boolean(source.needsReview) || confidenceScore < 75 || totalPrice <= 0,
    reviewReason: cleanString(source.reviewReason) || (totalPrice <= 0 ? "금액을 확인해 주세요." : ""),
  };
}

function cleanString(value) {
  return typeof value === "string" ? value.trim() : "";
}

function positiveNumber(value, fallback) {
  const numeric = typeof value === "number" ? value : typeof value === "string" ? Number(value.replace(/,/g, "")) : NaN;
  return Number.isFinite(numeric) && numeric >= 0 ? numeric : fallback;
}

function clampScore(value) {
  return Math.max(30, Math.min(99, Math.round(value)));
}

function cleanModelName(value) {
  return cleanString(value).replace(/^models\//, "") || DEFAULT_MODEL;
}

function extractGeminiText(payload) {
  return payload?.candidates?.[0]?.content?.parts?.map((part) => part.text || "").join("").trim() || "";
}

function stripJsonFence(text) {
  return text.replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/\s*```$/i, "").trim();
}

function geminiErrorMessage(payload, status = 0) {
  const message = payload?.error?.message || "AI 분석 요청이 실패했습니다.";
  if (isTemporaryGeminiDemandError(message, status)) return temporaryGeminiDemandMessage();
  return neutralizeAiProviderMessage(message);
}

function isTemporaryGeminiDemandError(message, status = 0) {
  const text = cleanString(message).toLowerCase();
  return status === 429
    || status === 503
    || text.includes("high demand")
    || text.includes("try again later")
    || text.includes("temporarily unavailable")
    || text.includes("overloaded")
    || text.includes("resource exhausted")
    || text.includes("rate limit");
}

function temporaryGeminiDemandMessage() {
  return "AI 분석 요청이 잠시 많아 분석이 지연되고 있습니다. 1~2분 후 다시 시도해 주세요. 급한 경우 앱 내부 분석 초안을 확인해 저장할 수 있습니다.";
}

function neutralizeAiProviderMessage(message) {
  return cleanString(message)
    .replace(/Gemini AI/gi, "AI 분석 서비스")
    .replace(/Gemini API/gi, "AI 분석 API")
    .replace(/Gemini/gi, "AI 분석 서비스")
    .replace(/Google AI Studio/gi, "AI 키 발급 페이지")
    .replace(/GEMINI_API_KEY/g, "음성 AI 분석용 서버 키");
}

function waitForRetry(attempt) {
  return new Promise((resolve) => setTimeout(resolve, 600 * attempt));
}

function looksLikeGoogleOAuthCredential(value) {
  const text = cleanString(value);
  return text.includes(".apps.googleusercontent.com") || text.startsWith("GOCSPX-");
}

function hasGoogleOAuthCredentials() {
  return OAUTH_CREDENTIAL_ENV_KEYS.some((key) => Boolean(process.env[key]));
}

function getGeminiApiKey() {
  for (const key of GEMINI_API_KEY_ENV_KEYS) {
    const value = cleanString(process.env[key]);
    if (value) return value;
  }
  return "";
}

function googleOAuthCredentialMessage() {
  return "현재 입력된 로그인용 OAuth 자격증명은 음성 분석 API 키가 아닙니다. 음성 AI 분석용 서버 키를 환경변수에 설정해야 합니다.";
}

function missingGeminiKeyMessage() {
  if (hasGoogleOAuthCredentials()) return googleOAuthCredentialMessage();
  if (process.env.VERCEL) return "음성 AI 분석용 서버 키가 Vercel 서버 환경변수에 설정되지 않았습니다. Vercel Environment Variables에 서버 전용 값으로 추가해 주세요.";
  return "음성 AI 분석용 서버 키가 로컬 서버 환경변수에 설정되지 않았습니다. .env.local에 서버 키를 추가한 뒤 로컬 서버를 재시작해 주세요.";
}

function json(payload, status = 200) {
  return jsonResult(status, payload);
}
