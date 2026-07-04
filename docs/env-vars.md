# 싸와! 환경변수 정리

싸와!는 Vite 앱입니다. 브라우저에서 읽는 값은 `VITE_` 접두사를 사용합니다. `NEXT_PUBLIC_` 값은 Next.js용 이름이므로 현재 앱에서는 사용하지 않습니다.

## Local

```env
VITE_APP_ENV=local
VITE_APP_URL=http://127.0.0.1:4173
VITE_SUPABASE_URL=https://dewlendyeycxfmblecog.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=
VITE_ENABLE_DEMO_DATA=true
VITE_USE_LIVE_DATA=false
VITE_ENABLE_MOCK_AI=true
VITE_ENABLE_MOCK_PAYMENT=true
VITE_ENABLE_MOCK_SETTLEMENT=true
VITE_ENABLE_BETA_BADGE=true
```

## Beta

```env
VITE_APP_ENV=beta
VITE_APP_URL=https://<beta-domain>.vercel.app
VITE_SUPABASE_URL=https://dewlendyeycxfmblecog.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=설정 완료
VITE_ENABLE_DEMO_DATA=false
VITE_USE_LIVE_DATA=true
VITE_ENABLE_MOCK_AI=true
VITE_ENABLE_MOCK_PAYMENT=true
VITE_ENABLE_MOCK_SETTLEMENT=true
VITE_ENABLE_BETA_BADGE=true
```

## Production 준비값

정식 출시 전까지 production은 공개하지 않는 것을 권장합니다.

```env
VITE_APP_ENV=production
VITE_APP_URL=https://<production-domain>
VITE_SUPABASE_URL=https://dewlendyeycxfmblecog.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=설정 완료
VITE_ENABLE_DEMO_DATA=false
VITE_USE_LIVE_DATA=true
VITE_ENABLE_MOCK_AI=false
VITE_ENABLE_MOCK_PAYMENT=false
VITE_ENABLE_MOCK_SETTLEMENT=false
VITE_ENABLE_BETA_BADGE=false
```

## Feature Flags

```env
VITE_ENABLE_ANALYSIS=true
VITE_ENABLE_SUPPLIER_QUOTES=true
VITE_ENABLE_DEALS=true
VITE_ENABLE_MESSAGES=true
VITE_ENABLE_FEEDBACK=true
```

장애 발생 시 Vercel Environment Variables에서 해당 값을 `false`로 바꾼 뒤 재배포합니다. 현재 앱은 주요 mock 표시와 운영 문서 기준으로 이 값을 관리하며, 완전한 기능 차단 UI는 다음 단계에서 더 세분화합니다.

## Upload Limits

```env
VITE_STORAGE_MAX_IMAGE_MB=10
VITE_STORAGE_MAX_PDF_MB=20
VITE_STORAGE_MAX_EXCEL_MB=10
```

## Public Support Info

```env
VITE_SUPPORT_EMAIL=
VITE_KAKAO_CHANNEL_URL=
VITE_COMPANY_NAME=싸와!
VITE_COMPANY_PHONE=
VITE_COMPANY_EMAIL=
```

## Server-only

아래 값은 브라우저 번들에 넣지 않습니다.

```env
SUPABASE_SECRET_KEY=설정 완료
SUPABASE_SERVICE_ROLE_KEY=설정 완료
ADMIN_EMAILS=운영자 이메일 목록
WEBHOOK_SIGNING_SECRET=설정 완료
```
