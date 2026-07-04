# 싸와! 배포 후 Smoke Test 체크리스트

## 공통

- [ ] 베타 URL 접속 가능
- [ ] `/app` 홈 표시
- [ ] `/beta` 베타 안내 표시
- [ ] `/partners` 파트너 모집 표시
- [ ] `/supplier/apply` 입점 CTA 표시
- [ ] 로그인/회원가입 가능
- [ ] 로그아웃 가능
- [ ] 모바일 390px 폭에서 주요 화면 깨짐 없음
- [ ] 직접 URL `/app/admin/supabase` 200 응답
- [ ] console error 없음

## 구매자

- [ ] 견적요청 생성 가능
- [ ] 견적요청 목록 표시
- [ ] 견적요청 상세 표시
- [ ] 알림센터 표시
- [ ] 자료분석 화면 표시
- [ ] 피드백 제출 가능

## 공급업체

- [ ] 입점 신청 가능
- [ ] 승인 대기 흐름 확인
- [ ] 승인된 공급업체 견적 제출 가능
- [ ] 공급업체 대시보드 표시
- [ ] 정산/청구 mock 제한 문구 표시

## 관리자

- [ ] 관리자 로그인 가능
- [ ] 공급업체 승인 가능
- [ ] 거래/신고/피드백 화면 접근 가능
- [ ] QA 체크리스트 표시
- [ ] Supabase 준비 화면 표시

## DB/Storage

- [ ] Supabase 연결 정상
- [ ] RLS로 타인 데이터 접근 차단
- [ ] 파일 업로드 성공
- [ ] 파일 조회 권한 정상
- [ ] seed category 표시

## 배포

- [ ] Vercel build 성공
- [ ] Vercel deployment URL 확인
- [ ] Supabase Auth redirect URL 확인
- [ ] Vercel env var 누락 없음
