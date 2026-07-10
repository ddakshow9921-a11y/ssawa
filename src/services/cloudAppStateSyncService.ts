import type { AppData } from "../types";
import { appConfig, isLiveModeReady } from "../lib/env";
import { getCurrentSession } from "../lib/supabase/auth";

export type CloudAppStateSnapshot = {
  user_id: string;
  payload: Partial<AppData>;
  client_id?: string;
  client_updated_at?: string;
  updated_at: string;
};

export type CloudAppStateResult<T> =
  | { ok: true; data: T; relatedData?: CloudAppStateSnapshot | null; missingTable?: boolean }
  | { ok: false; data: T; error: string; relatedData?: CloudAppStateSnapshot | null; missingTable?: boolean };

const CLOUD_CLIENT_ID_KEY = "ssawa-cloud-app-state-client-id-v1";
const CLOUD_UPDATED_AT_KEY = "ssawa-cloud-app-state-updated-at-v1";
const CLOUD_SYNC_STATUS_KEY = "ssawa-cloud-app-state-status-v1";

const SYNC_UNAVAILABLE = "앱 상태 동기화 서버에 연결할 수 없습니다.";
const SYNC_NOT_READY = "운영 DB 동기화 환경이 아직 준비되지 않았습니다.";
const LOGIN_REQUIRED = "로그인이 필요합니다.";
const LOAD_FAILED = "앱 상태를 불러오지 못했습니다.";
const SAVE_FAILED = "앱 상태를 저장하지 못했습니다.";

export function getCloudAppStateClientId() {
  try {
    const existing = window.localStorage.getItem(CLOUD_CLIENT_ID_KEY);
    if (existing) return existing;
    const generated = `client-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
    window.localStorage.setItem(CLOUD_CLIENT_ID_KEY, generated);
    return generated;
  } catch {
    return "client-memory";
  }
}

export function getLastCloudAppStateUpdatedAt() {
  try {
    return window.localStorage.getItem(CLOUD_UPDATED_AT_KEY) || "";
  } catch {
    return "";
  }
}

export function markCloudAppStateSynced(updatedAt: string) {
  if (!updatedAt) return;
  try {
    window.localStorage.setItem(CLOUD_UPDATED_AT_KEY, updatedAt);
    window.localStorage.setItem(CLOUD_SYNC_STATUS_KEY, JSON.stringify({ ok: true, updatedAt, checkedAt: new Date().toISOString() }));
  } catch {
    // Sync markers are best-effort only.
  }
}

export function markCloudAppStateSyncFailed(error: string) {
  try {
    window.localStorage.setItem(CLOUD_SYNC_STATUS_KEY, JSON.stringify({ ok: false, error, checkedAt: new Date().toISOString() }));
  } catch {
    // Sync markers are best-effort only.
  }
}

export async function pullCloudAppStateSnapshot(): Promise<CloudAppStateResult<CloudAppStateSnapshot | null>> {
  if (!isLiveModeReady()) return { ok: false, data: null, error: SYNC_NOT_READY };
  const accessToken = await getAccessToken();
  if (!accessToken) return { ok: false, data: null, error: LOGIN_REQUIRED };

  return retryCloudRequest(async () => {
    const response = await fetch(apiEndpoint("/api/app-state/snapshot"), {
      method: "GET",
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const body = (await response.json().catch(() => ({}))) as { ok?: boolean; snapshot?: CloudAppStateSnapshot | null; relatedSnapshot?: CloudAppStateSnapshot | null; error?: string; missingTable?: boolean };
    if (!response.ok || !body.ok) {
      return { ok: false, data: null, relatedData: body.relatedSnapshot ?? null, error: body.error || LOAD_FAILED, missingTable: body.missingTable };
    }
    return { ok: true, data: body.snapshot ?? null, relatedData: body.relatedSnapshot ?? null, missingTable: body.missingTable };
  }, SYNC_UNAVAILABLE);
}

export async function pushCloudAppStateSnapshot(data: AppData): Promise<CloudAppStateResult<CloudAppStateSnapshot | null>> {
  if (!isLiveModeReady()) return { ok: false, data: null, error: SYNC_NOT_READY };
  const accessToken = await getAccessToken();
  if (!accessToken) return { ok: false, data: null, error: LOGIN_REQUIRED };

  const result = await retryCloudRequest(async () => {
    const response = await fetch(apiEndpoint("/api/app-state/snapshot"), {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        clientId: getCloudAppStateClientId(),
        clientUpdatedAt: new Date().toISOString(),
        payload: sanitizeAppStateForCloud(data),
      }),
    });
    const body = (await response.json().catch(() => ({}))) as { ok?: boolean; snapshot?: CloudAppStateSnapshot | null; error?: string; missingTable?: boolean };
    if (!response.ok || !body.ok) {
      return { ok: false, data: null, error: body.error || SAVE_FAILED, missingTable: body.missingTable };
    }
    return { ok: true, data: body.snapshot ?? null, missingTable: body.missingTable };
  }, SYNC_UNAVAILABLE);

  if (result.ok && result.data?.updated_at) markCloudAppStateSynced(result.data.updated_at);
  if (!result.ok) markCloudAppStateSyncFailed(result.error);
  return result;
}

export function sanitizeAppStateForCloud(data: AppData): Partial<AppData> {
  const { local_auth_accounts: _localAuthAccounts, ...safeData } = data;
  return safeData;
}

function apiEndpoint(path: string) {
  if (/^https?:\/\//i.test(path) || !appConfig.apiBaseUrl) return path;
  return `${appConfig.apiBaseUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

async function getAccessToken() {
  const session = await getCurrentSession();
  return session?.access_token ?? "";
}

async function retryCloudRequest<T>(request: () => Promise<CloudAppStateResult<T>>, fallbackError: string): Promise<CloudAppStateResult<T>> {
  let lastError = fallbackError;
  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      const result = await request();
      if (result.ok || result.missingTable) return result;
      lastError = result.error;
    } catch {
      lastError = fallbackError;
    }
    await wait(350 * (attempt + 1));
  }
  return { ok: false, data: null as T, error: lastError };
}

function wait(ms: number) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}
