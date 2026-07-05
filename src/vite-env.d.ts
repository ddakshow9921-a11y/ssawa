/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_ENV?: "local" | "beta" | "production";
  readonly VITE_APP_URL?: string;
  readonly VITE_API_BASE_URL?: string;
  readonly VITE_SUPABASE_URL?: string;
  readonly VITE_SUPABASE_PUBLISHABLE_KEY?: string;
  readonly VITE_SUPABASE_ANON_KEY?: string;
  readonly VITE_ENABLE_DEMO_DATA?: string;
  readonly VITE_USE_LIVE_DATA?: string;
  readonly VITE_ENABLE_MOCK_AI?: string;
  readonly VITE_ENABLE_MOCK_PAYMENT?: string;
  readonly VITE_ENABLE_MOCK_SETTLEMENT?: string;
  readonly VITE_ENABLE_BETA_BADGE?: string;
  readonly VITE_ENABLE_ANALYSIS?: string;
  readonly VITE_ENABLE_SUPPLIER_QUOTES?: string;
  readonly VITE_ENABLE_DEALS?: string;
  readonly VITE_ENABLE_MESSAGES?: string;
  readonly VITE_ENABLE_FEEDBACK?: string;
  readonly VITE_STORAGE_MAX_IMAGE_MB?: string;
  readonly VITE_STORAGE_MAX_PDF_MB?: string;
  readonly VITE_STORAGE_MAX_EXCEL_MB?: string;
  readonly VITE_SUPPORT_EMAIL?: string;
  readonly VITE_KAKAO_CHANNEL_URL?: string;
  readonly VITE_COMPANY_NAME?: string;
  readonly VITE_COMPANY_PHONE?: string;
  readonly VITE_COMPANY_EMAIL?: string;
  readonly NEXT_PUBLIC_APP_ENV?: "local" | "beta" | "production";
  readonly NEXT_PUBLIC_APP_URL?: string;
  readonly NEXT_PUBLIC_API_BASE_URL?: string;
  readonly NEXT_PUBLIC_SUPABASE_URL?: string;
  readonly NEXT_PUBLIC_SUPABASE_ANON_KEY?: string;
  readonly NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?: string;
  readonly NEXT_PUBLIC_USE_LIVE_DATA?: string;
  readonly NEXT_PUBLIC_ENABLE_DEMO_DATA?: string;
  readonly NEXT_PUBLIC_ENABLE_MOCK_AI?: string;
  readonly NEXT_PUBLIC_ENABLE_MOCK_PAYMENT?: string;
  readonly NEXT_PUBLIC_ENABLE_MOCK_SETTLEMENT?: string;
  readonly NEXT_PUBLIC_ENABLE_BETA_BADGE?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
