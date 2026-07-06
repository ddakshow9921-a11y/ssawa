import { appConfig } from "../env";
import { getSupabaseClient } from "./client";
import { logSupabaseError } from "./errors";

export type UploadKind = "quote" | "deal" | "supplierDocument" | "analysis" | "feedback" | "productImage";

export const storageBuckets: Record<UploadKind, string> = {
  quote: "quote-attachments",
  deal: "deal-attachments",
  supplierDocument: "supplier-documents",
  analysis: "analysis-files",
  feedback: "feedback-attachments",
  productImage: "product-images",
};

const allowedExtensions = new Set(["jpg", "jpeg", "png", "webp", "heic", "pdf", "xlsx", "xls", "csv"]);

export function sanitizeFileName(fileName: string) {
  const normalized = fileName.normalize("NFKC").replace(/[\\/:*?"<>|#%{}^~[\]`]+/g, "-");
  return normalized.replace(/\s+/g, "-").replace(/-+/g, "-").slice(0, 120) || "upload";
}

export function validateUploadFile(file: File) {
  const extension = file.name.split(".").pop()?.toLowerCase() ?? "";
  const isImage = file.type.startsWith("image/");
  const isPdf = file.type === "application/pdf" || extension === "pdf";
  const isSpreadsheet = ["xlsx", "xls", "csv"].includes(extension);
  const maxMb = isImage ? appConfig.maxImageMb : isPdf ? appConfig.maxPdfMb : isSpreadsheet ? appConfig.maxExcelMb : appConfig.maxPdfMb;
  const maxBytes = maxMb * 1024 * 1024;

  if (!allowedExtensions.has(extension)) {
    return { ok: false, message: "허용되지 않은 파일 형식입니다. 이미지, PDF, 엑셀/CSV만 업로드할 수 있습니다." };
  }
  if (file.size > maxBytes) {
    return { ok: false, message: `파일은 ${maxMb}MB 이하만 업로드할 수 있습니다.` };
  }
  return { ok: true, message: "" };
}

export function generateStoragePath(kind: UploadKind, userId: string, fileName: string) {
  const today = new Date().toISOString().slice(0, 10);
  const safeName = sanitizeFileName(fileName);
  const id = globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  return `${userId}/${kind}/${today}/${id}-${safeName}`;
}

export async function uploadAppFile(kind: UploadKind, userId: string, file: File) {
  const client = getSupabaseClient();
  if (!client) return { ok: false as const, message: "Supabase publishable key가 없어 업로드를 실행할 수 없습니다." };

  const validation = validateUploadFile(file);
  if (!validation.ok) return { ok: false as const, message: validation.message };

  const bucket = storageBuckets[kind];
  const path = generateStoragePath(kind, userId, file.name);
  const { data, error } = await client.storage.from(bucket).upload(path, file, {
    cacheControl: "3600",
    contentType: file.type || undefined,
    upsert: false,
  });

  if (error) {
    logSupabaseError(`storage.${bucket}.upload`, error);
    return { ok: false as const, message: error.message };
  }
  const publicUrl = client.storage.from(bucket).getPublicUrl(data.path).data.publicUrl;
  return { ok: true as const, bucket, path: data.path, publicUrl };
}
