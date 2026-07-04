# 싸와! 보안 점검표

## 키와 환경변수

- [x] 브라우저 번들은 `VITE_SUPABASE_PUBLISHABLE_KEY`만 사용
- [x] `SUPABASE_SECRET_KEY`, `SUPABASE_SERVICE_ROLE_KEY`는 `.env.example`에 이름만 존재
- [x] `.gitignore`에서 `.env`, `.env.*` 제외
- [x] 실제 키는 저장소에 커밋하지 않음

## Auth/권한

- [x] 권한은 `profiles.role` 기준
- [x] 관리자 권한은 DB 행으로만 부여
- [x] `user_metadata`를 권한 판단에 사용하지 않음
- [x] 공급업체 권한은 `supplier_profiles.approval_status`와 `operational_status` 확인

## Database/RLS

- [x] public 핵심 테이블 RLS 활성화 SQL 작성
- [x] owner/admin/participant 기준 정책 작성
- [x] 2026 Supabase Data API 변경 대비 명시적 GRANT 작성
- [x] UPDATE 정책에 `USING`과 `WITH CHECK` 모두 작성
- [x] helper 함수는 `security definer`와 `set search_path = ''` 사용

## Storage

- [x] 첨부/증빙/분석/피드백 bucket은 private
- [x] 업로드 경로 첫 segment를 `auth.uid()`로 강제
- [x] select/insert/update/delete 정책 분리
- [x] 파일 확장자와 크기 제한을 클라이언트와 bucket 양쪽에서 검증

## 아직 남은 보안 작업

- [ ] Supabase Dashboard Security Advisor 결과 확인
- [ ] 실제 원격 DB에 migration 적용 후 RLS 테스트 수행
- [ ] Edge Function 또는 서버 API에서 service role 사용 구간 별도 감사
- [ ] production에서 mock 플래그 off 확인
- [ ] 결제/웹훅 서명 검증 구현 전 운영 결제 비활성 유지
