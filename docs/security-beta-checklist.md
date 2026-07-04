# 싸와! 베타 배포 보안 체크리스트

- [x] service role key 클라이언트 코드 미사용
- [x] `.env.local` 커밋 차단
- [x] RLS 정책 SQL 작성
- [x] 2026 Supabase Data API explicit GRANT 반영
- [x] Storage private bucket 정책 작성
- [x] 파일 확장자/크기 제한 클라이언트 검증
- [x] 베타 제한사항 UI 표시
- [x] demo reset이 Supabase live 데이터에 직접 연결되지 않음
- [ ] 실제 Supabase Dashboard에서 RLS 활성화 확인
- [ ] 실제 Supabase Storage 업로드/조회 권한 테스트
- [ ] 관리자 페이지 role 보호를 실제 Auth 연결 후 검증
- [ ] 타인 거래/알림/메시지 접근 차단 API 테스트
- [ ] console log에 민감정보 없음 확인
- [ ] Vercel env var에 secret 값이 public prefix로 들어가지 않았는지 확인
- [ ] production 공개 전 mock flag off 검증
