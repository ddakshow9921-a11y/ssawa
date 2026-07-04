# 싸와! Supabase 설정 가이드

프로젝트 URL: `https://dewlendyeycxfmblecog.supabase.co`

이 문서는 싸와! MVP 베타용 Supabase Auth, Database, RLS, Storage 적용 순서입니다. 현재 저장소에는 실제 비밀키를 넣지 않습니다.

## 1. 환경변수

로컬에서는 `.env.example`을 `.env.local`로 복사한 뒤 값을 채웁니다.

필수 클라이언트 값:

```env
VITE_APP_ENV=local
VITE_APP_URL=http://127.0.0.1:4173
VITE_SUPABASE_URL=https://dewlendyeycxfmblecog.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_xxx
VITE_USE_LIVE_DATA=false
```

서버 전용 값은 브라우저 앱에서 읽지 않습니다.

```env
SUPABASE_SECRET_KEY=설정 완료
SUPABASE_SERVICE_ROLE_KEY=설정 완료
ADMIN_EMAILS=owner@example.com,ops@example.com
WEBHOOK_SIGNING_SECRET=...
```

베타에서 실제 DB를 읽기 시작할 때만 `VITE_USE_LIVE_DATA=true`로 바꿉니다. OCR/AI와 결제는 외부 계약과 서버 함수가 붙기 전까지 `VITE_ENABLE_MOCK_AI=true`, `VITE_ENABLE_MOCK_PAYMENT=true`를 유지합니다.

## 2. 마이그레이션 적용 순서

Supabase SQL Editor 또는 Supabase CLI에서 아래 순서로 적용합니다.

1. `supabase/migrations/001_initial_schema.sql`
2. `supabase/migrations/002_rls_policies.sql`
3. `supabase/migrations/003_storage_buckets.sql`
4. `supabase/migrations/004_seed_beta_data.sql`
5. `supabase/migrations/005_beta_operations.sql`

로컬 PC에는 현재 `supabase` CLI가 설치되어 있지 않았습니다. CLI를 설치하면 다음 명령으로 원격 타입을 갱신합니다.

```powershell
supabase gen types typescript --project-id dewlendyeycxfmblecog --schema public > src/lib/supabase/database.types.ts
```

## 3. Auth 설정

Supabase Dashboard에서 다음을 확인합니다.

- Authentication > Providers: Email 활성화
- Authentication > URL Configuration:
  - Site URL: 베타 배포 URL
  - Redirect URLs: `http://127.0.0.1:4173/**`, 베타 URL, 운영 URL
- 신규 가입 시 기본 권한은 `profiles.role = 'buyer'`
- 공급업체 전환은 `supplier_profiles` 승인 흐름으로 처리
- 관리자 권한은 `profiles.role = 'admin'`으로 DB에서만 부여

권한 판단에는 `user_metadata`를 쓰지 않습니다. 클라이언트에서 보이는 메타데이터는 신뢰 권한원이 아닙니다.

## 4. Storage 버킷

생성되는 private 버킷:

- `quote-attachments`
- `deal-attachments`
- `supplier-documents`
- `analysis-files`
- `feedback-attachments`

클라이언트 업로드 경로는 `{userId}/{kind}/{YYYY-MM-DD}/{uuid}-{fileName}` 형식입니다. Storage RLS는 첫 번째 폴더가 `auth.uid()`와 일치할 때만 select/insert/update/delete를 허용합니다. 관리자만 전체 버킷을 볼 수 있습니다.

## 5. 현재 앱 연결 구조

추가된 코드:

- `src/lib/env.ts`: local/beta/production, mock/live 플래그
- `src/lib/supabase/client.ts`: publishable key가 있을 때만 Supabase client 생성
- `src/lib/supabase/auth.ts`: 세션/사용자/프로필 helper
- `src/lib/supabase/storage.ts`: 업로드 검증, 경로 생성, private bucket 업로드
- `src/services/liveDataService.ts`: 라이브 전환 준비 서비스

현재 화면 데이터는 기본적으로 localStorage mock입니다. 실제 DB 전환은 `VITE_SUPABASE_PUBLISHABLE_KEY`와 `VITE_USE_LIVE_DATA=true`가 모두 있을 때 단계적으로 켭니다.

## 6. 적용 후 첫 점검

1. SQL Editor에서 5개 migration 순서대로 실행
2. Dashboard > Table Editor에서 seed category 확인
3. Dashboard > Storage에서 5개 bucket 확인
4. 테스트 계정 3개 생성: buyer, supplier, admin
5. SQL Editor에서 `profiles.role`과 `supplier_profiles.approval_status` 수동 설정
6. 앱 `.env.local`에 publishable key 입력
7. `pnpm run typecheck`
8. `pnpm run build`
9. `/app/admin/supabase`에서 URL, 키, live 플래그 상태 확인
