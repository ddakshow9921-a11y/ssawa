import { jsonResult, runJsonPost } from "./_http.js";

const GEMINI_API_BASE = "https://generativelanguage.googleapis.com/v1beta/models";
const DEFAULT_MODEL = "gemini-3.5-flash";
const MAX_BASE64_LENGTH = 14 * 1024 * 1024;
const MAX_GEMINI_ATTEMPTS = 3;
const CATEGORY_NAMES = ["식자재", "포장재", "소모품", "주방용품", "설비/닥트/환기자재", "건축자재", "공구/산업자재", "기타"];
const GEMINI_API_KEY_ENV_KEYS = ["GEMINI_API_KEY", "GOOGLE_AI_API_KEY", "GOOGLE_GENAI_API_KEY", "GOOGLE_API_KEY", "GOOGLE_GENERATIVE_AI_API_KEY"];
const OAUTH_CREDENTIAL_ENV_KEYS = ["GOOGLE_OAUTH_CLIENT_ID", "GOOGLE_OAUTH_CLIENT_SECRET", "GOOGLE_CLIENT_ID", "GOOGLE_CLIENT_SECRET"];

async function handleAnalyzeBody(input) {
    const apiKey = getGeminiApiKey();
    if (!apiKey) {
      return json({ error: missingGeminiKeyMessage() }, 503);
    }
    if (looksLikeGoogleOAuthCredential(apiKey)) {
      return json({ error: googleOAuthCredentialMessage() }, 400);
    }

    const fileName = cleanString(input.fileName) || "receipt-image.jpg";
    const mimeType = cleanString(input.mimeType) || "image/jpeg";
    const imageBase64 = cleanBase64(input.imageBase64);
    if (!mimeType.startsWith("image/")) {
      return json({ error: "이미지 파일만 분석할 수 있습니다." }, 400);
    }
    if (!imageBase64) {
      return json({ error: "분석할 이미지 데이터가 없습니다." }, 400);
    }
    if (imageBase64.length > MAX_BASE64_LENGTH) {
      return json({ error: "이미지 용량이 너무 큽니다. 10MB 이하 이미지로 다시 올려주세요." }, 413);
    }

    const model = cleanModelName(process.env.GEMINI_MODEL || DEFAULT_MODEL);
    const geminiRequestBody = JSON.stringify({
      contents: [
        {
          parts: [
            { text: buildPrompt(fileName) },
            {
              inline_data: {
                mime_type: mimeType,
                data: imageBase64,
              },
            },
          ],
        },
      ],
      generationConfig: {
        temperature: 0.1,
        response_mime_type: "application/json",
        response_schema: receiptSchema(),
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
      return json({ error: "Gemini 응답에서 분석 결과를 찾지 못했습니다." }, 502);
    }

    try {
      return json({ ...normalizeResult(JSON.parse(stripJsonFence(text))), source: "gemini", model });
    } catch {
      return json({ error: "Gemini 분석 결과 JSON을 해석하지 못했습니다.", rawText: text }, 502);
    }
}

export default async function handler(request, response) {
  return runJsonPost(request, response, handleAnalyzeBody);
}

export async function fetch(request) {
  return handler(request);
}

function buildPrompt(fileName) {
  return `
너는 B2B 자재 견적구매 플랫폼 "싸와!"의 OCR/품목 분석 엔진이다.
업로드 파일명: ${fileName}

이미지는 기존 구매영수증, 거래명세서 캡처, 자필 주문 메모 중 하나일 수 있다.
이미지에서 견적 요청에 필요한 품목 후보만 추출하라.

규칙:
- 음식점/카페/매장 운영자가 다시 견적받을 자재 품목만 items에 넣는다.
- 총액, 상호, 날짜 같은 메타데이터는 품목으로 넣지 않는다.
- 자필 메모는 오탈자가 있어도 가능한 한국어 품목명으로 정규화한다.
- categoryName은 반드시 다음 중 하나로 선택한다: ${CATEGORY_NAMES.join(", ")}.
- 수량이 애매하면 quantity는 1, unit은 "개", needsReview는 true로 둔다.
- 금액이 없으면 unitPrice와 totalPrice는 0으로 둔다.
- JSON만 반환한다.
`;
}

function receiptSchema() {
  return {
    type: "OBJECT",
    properties: {
      supplierName: { type: "STRING", description: "영수증 또는 명세서의 공급처명. 없으면 빈 문자열" },
      categoryName: { type: "STRING", enum: CATEGORY_NAMES },
      totalAmount: { type: "NUMBER", description: "이미지에 표시된 총 구매금액. 없으면 0" },
      rawText: { type: "STRING", description: "이미지에서 읽은 주요 원문 텍스트" },
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
  return {
    supplierName: cleanString(result.supplierName),
    categoryName: CATEGORY_NAMES.includes(result.categoryName) ? result.categoryName : "기타",
    totalAmount: positiveNumber(result.totalAmount, 0),
    rawText: cleanString(result.rawText),
    confidenceScore: clampScore(positiveNumber(result.confidenceScore, 82)),
    items: items.slice(0, 20).map((item) => normalizeItem(item)),
  };
}

function normalizeItem(item) {
  const source = item && typeof item === "object" ? item : {};
  const confidenceScore = clampScore(positiveNumber(source.confidenceScore, 82));
  return {
    itemName: cleanString(source.itemName) || "품목명 확인 필요",
    spec: cleanString(source.spec),
    quantity: positiveNumber(source.quantity, 1) || 1,
    unit: cleanString(source.unit) || "개",
    unitPrice: positiveNumber(source.unitPrice, 0),
    totalPrice: positiveNumber(source.totalPrice, 0),
    memo: cleanString(source.memo),
    confidenceScore,
    needsReview: Boolean(source.needsReview) || confidenceScore < 75,
    reviewReason: cleanString(source.reviewReason),
  };
}

function cleanBase64(value) {
  if (typeof value !== "string") return "";
  return value.replace(/^data:[^;]+;base64,/, "").replace(/\s/g, "");
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
  const message = payload?.error?.message || "Gemini API 분석 요청이 실패했습니다.";
  if (isTemporaryGeminiDemandError(message, status)) return temporaryGeminiDemandMessage();
  return message;
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
  return "Gemini AI 사용량이 잠시 많아 분석이 지연되고 있습니다. 1~2분 후 다시 'AI로 자동 입력'을 눌러 주세요. 급한 경우 품목을 직접 입력해 견적요청을 계속 진행할 수 있습니다.";
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
  return "Google OAuth 클라이언트 ID/Secret은 Gemini API 키가 아닙니다. 영수증 AI 분석은 Google AI Studio에서 발급한 Gemini API 키를 서버 환경변수 GEMINI_API_KEY로 설정해야 합니다.";
}

function missingGeminiKeyMessage() {
  if (hasGoogleOAuthCredentials()) return googleOAuthCredentialMessage();
  if (process.env.VERCEL) return "GEMINI_API_KEY가 Vercel 서버 환경변수에 설정되지 않았습니다. Google AI Studio에서 발급한 Gemini API 키를 Vercel Environment Variables에 서버 전용 값으로 추가해 주세요.";
  return "GEMINI_API_KEY가 로컬 서버 환경변수에 설정되지 않았습니다. Google AI Studio에서 발급한 Gemini API 키를 .env.local에 GEMINI_API_KEY=... 형식으로 추가한 뒤 로컬 서버를 재시작해 주세요.";
}

function json(payload, status = 200) {
  return jsonResult(status, payload);
}
