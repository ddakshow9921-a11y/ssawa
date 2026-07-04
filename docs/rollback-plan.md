# 싸와! 베타 롤백/비상 대응 계획

## Vercel 롤백

1. Vercel Dashboard > Deployments 진입
2. 직전 정상 배포 선택
3. Promote/Rollback 실행
4. 베타 사용자에게 장애 공지
5. smoke test 재실행

## Supabase migration 문제

1. 적용 전 백업 여부 확인
2. 오류 난 migration 번호 기록
3. RLS 오류면 Vercel에서 `VITE_USE_LIVE_DATA=false`로 전환
4. 심각한 데이터 노출 의심 시 베타 URL 공유 중단
5. SQL 수정 후 테스트 계정으로 재검증

## Feature flag 임시 차단

```env
VITE_ENABLE_ANALYSIS=false
VITE_ENABLE_SUPPLIER_QUOTES=false
VITE_ENABLE_DEALS=false
VITE_ENABLE_MESSAGES=false
VITE_ENABLE_FEEDBACK=true
```

## 사용자 공지 문구

> 현재 베타 서비스 점검 중입니다. 견적요청과 거래 데이터 보호를 위해 일부 기능을 임시 제한했습니다. 복구 후 다시 안내드리겠습니다.

## 운영 승인

- 데이터 삭제/수정은 운영 관리자 승인 후 진행
- 긴급 담당자: TODO
- 외부 공지 채널: TODO
