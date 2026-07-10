import { defineConfig, loadEnv } from "vite";
import analyzeReceiptApi from "./api/analyze-receipt.js";
import analyzeVoiceOrderApi from "./api/analyze-voice-order.js";
import businessStatusApi from "./api/business/status.js";
import businessValidateApi from "./api/business/validate.js";
import statusApi from "./api/status.js";

const apiRoutes = new Map([
  ["/health", statusApi],
  ["/status", statusApi],
  ["/beta-status", statusApi],
  ["/api/status", statusApi],
  ["/api/analyze-receipt", analyzeReceiptApi],
  ["/api/analyze-voice-order", analyzeVoiceOrderApi],
  ["/api/business/status", businessStatusApi],
  ["/api/business/validate", businessValidateApi],
]);

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  for (const [key, value] of Object.entries(env)) {
    if (process.env[key] === undefined) process.env[key] = value;
  }

  return {
    envPrefix: ["VITE_", "NEXT_PUBLIC_"],
    plugins: [localApiPlugin()],
  };
});

function localApiPlugin() {
  return {
    name: "ssawa-local-api",
    configureServer(server) {
      server.middlewares.use(handleLocalApi);
    },
    configurePreviewServer(server) {
      server.middlewares.use(handleLocalApi);
    },
  };
}

async function handleLocalApi(request, response, next) {
  const pathname = new URL(request.url || "/", `http://${request.headers.host || "127.0.0.1"}`).pathname;
  const handler = apiRoutes.get(pathname);
  if (!handler) {
    next();
    return;
  }

  try {
    const webRequest = await toWebRequest(request);
    const webResponse = await invokeApiHandler(handler, webRequest);
    response.statusCode = webResponse.status;
    webResponse.headers.forEach((value, key) => response.setHeader(key, value));
    response.end(Buffer.from(await webResponse.arrayBuffer()));
  } catch (error) {
    response.statusCode = 500;
    response.setHeader("Content-Type", "application/json; charset=utf-8");
    response.setHeader("Cache-Control", "no-store");
    response.end(JSON.stringify({ ok: false, message: error instanceof Error ? error.message : "로컬 API 실행 중 오류가 발생했습니다." }));
  }
}

async function invokeApiHandler(handler, request) {
  if (typeof handler === "function") return handler(request);
  if (typeof handler?.fetch === "function") return handler.fetch(request);
  throw new Error("API handler 형식이 올바르지 않습니다.");
}

async function toWebRequest(request) {
  const url = new URL(request.url || "/", `http://${request.headers.host || "127.0.0.1"}`);
  const headers = new Headers();
  for (const [key, value] of Object.entries(request.headers)) {
    if (Array.isArray(value)) {
      for (const entry of value) headers.append(key, entry);
    } else if (value !== undefined) {
      headers.set(key, String(value));
    }
  }

  return new Request(url, {
    method: request.method,
    headers,
    body: request.method === "GET" || request.method === "HEAD" ? undefined : await readBody(request),
  });
}

async function readBody(request) {
  const chunks = [];
  for await (const chunk of request) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }
  return Buffer.concat(chunks);
}
