const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
  "Access-Control-Allow-Headers": "authorization,content-type,x-client-info,apikey",
  "Access-Control-Max-Age": "86400",
};

export function jsonResult(status, body) {
  return {
    status,
    body,
    headers: {
      ...CORS_HEADERS,
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
    },
  };
}

export function toWebResponse(result) {
  const body = result.status === 204 || result.status === 304 ? undefined : JSON.stringify(result.body);
  return new Response(body, {
    status: result.status,
    headers: result.headers,
  });
}

export function sendNodeResponse(response, result) {
  response.statusCode = result.status;
  for (const [key, value] of Object.entries(result.headers)) {
    response.setHeader(key, value);
  }
  response.end(result.status === 204 || result.status === 304 ? undefined : JSON.stringify(result.body));
}

export async function readJsonBody(request) {
  if (typeof request?.json === "function") {
    return request.json().catch(() => ({}));
  }

  if (request?.body !== undefined && typeof request.body !== "function" && !isReadableStream(request.body)) {
    if (typeof request.body === "string") return JSON.parse(request.body || "{}");
    return request.body && typeof request.body === "object" ? request.body : {};
  }

  const chunks = [];
  for await (const chunk of request) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }
  const raw = Buffer.concat(chunks).toString("utf8").trim();
  if (!raw) return {};
  try {
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

export async function runJsonPost(request, response, handleBody) {
  if (request.method !== "POST") {
    const result = jsonResult(405, { ok: false, message: "POST 요청만 지원합니다." });
    if (response) return sendNodeResponse(response, result);
    return toWebResponse(result);
  }

  const body = await readJsonBody(request);
  const result = await handleBody(body);
  if (response) return sendNodeResponse(response, result);
  return toWebResponse(result);
}

function isReadableStream(value) {
  return value && typeof value === "object" && typeof value.pipe === "function";
}
