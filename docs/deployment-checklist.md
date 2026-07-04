# 싸와! 베타 배포 체크리스트

## 배포 전

- [ ] `supabase/migrations/001_initial_schema.sql` 적용
- [ ] `supabase/migrations/002_rls_policies.sql` 적용
- [ ] `supabase/migrations/003_storage_buckets.sql` 적용
- [ ] `supabase/migrations/004_seed_beta_data.sql` 적용
- [ ] `supabase/migrations/005_beta_operations.sql` 적용
- [ ] Supabase Dashboard에서 RLS가 모든 public table에 켜져 있는지 확인
- [ ] Supabase Storage private bucket 5개 확인
- [ ] `profiles.role = 'admin'` 계정 1개 이상 생성
- [ ] 승인 공급업체 테스트 계정 1개 이상 생성
- [ ] 구매자 테스트 계정 1개 이상 생성
- [ ] `.env.local` 또는 배포 환경에 `VITE_SUPABASE_PUBLISHABLE_KEY` 입력
- [ ] 서버 secret/service role 키는 Vercel/Supabase 서버 함수에만 저장
- [ ] `VITE_USE_LIVE_DATA=false`로 첫 배포 후 smoke test

## Vercel 환경변수

Preview/Beta:

```env
VITE_APP_ENV=beta
VITE_SUPABASE_URL=https://dewlendyeycxfmblecog.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_xxx
VITE_USE_LIVE_DATA=false
VITE_ENABLE_DEMO_DATA=true
VITE_ENABLE_MOCK_AI=true
VITE_ENABLE_MOCK_PAYMENT=true
VITE_ENABLE_MOCK_SETTLEMENT=true
```

Production:

```env
VITE_APP_ENV=production
VITE_SUPABASE_URL=https://dewlendyeycxfmblecog.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_xxx
VITE_USE_LIVE_DATA=true
VITE_ENABLE_DEMO_DATA=false
VITE_ENABLE_MOCK_AI=false
VITE_ENABLE_MOCK_PAYMENT=false
VITE_ENABLE_MOCK_SETTLEMENT=false
```

## 빌드 검증

```powershell
pnpm run check
```

## 베타 smoke test

- [ ] `/app` 홈 진입
- [ ] `/app/requests/new` 견적요청 작성 흐름
- [ ] `/app/analyze` mock OCR 흐름
- [ ] `/app/notifications` 알림 읽음/보관
- [ ] `/app/feedback` 베타 피드백 작성
- [ ] `/app/admin` 관리자 대시보드
- [ ] `/app/admin/supabase` Supabase 준비 화면
- [ ] 모바일 390px 폭에서 주요 버튼/텍스트 겹침 없음

## 운영 전 차단 조건

- [ ] RLS 테스트 실패
- [ ] service role key가 브라우저 번들에 포함됨
- [ ] production에서 `VITE_ENABLE_DEMO_DATA=true`
- [ ] production에서 결제/OCR mock 플래그가 켜짐
- [ ] Storage private 파일을 다른 사용자 계정으로 읽을 수 있음
- [ ] 관리자 권한을 user_metadata만으로 판정하지 않음
