# 싸와! 배포 문제 해결

## `/status`에서 warning이 나오는 경우

`missingRequired` 배열을 먼저 확인합니다. 누락된 항목만 Vercel Environment Variables에 추가하고 재배포합니다.

| 누락 항목 | 확인할 변수 |
| --- | --- |
| `appUrlConfigured` | `VITE_APP_URL` 또는 `NEXT_PUBLIC_APP_URL` |
| `supabaseUrlConfigured` | `VITE_SUPABASE_URL` 또는 `NEXT_PUBLIC_SUPABASE_URL` |
| `supabaseAnonKeyConfigured` | `VITE_SUPABASE_PUBLISHABLE_KEY`, `VITE_SUPABASE_ANON_KEY`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` 중 하나 |
| `supabaseServiceRoleConfigured` | `SUPABASE_SERVICE_ROLE_KEY` |
| `ntsBusinessServiceKeyConfigured` | `NTS_BUSINESS_SERVICE_KEY` |

## Gemini 분석이 샘플 결과로 떨어지는 경우

1. Vercel 환경변수에 `GEMINI_API_KEY`가 있는지 확인합니다.
2. AI Studio API key는 보통 `AIza...` 형식입니다.
3. 기존 OAuth token 형태인 `AQ.` 값은 서버가 auth 형식으로 인식하지만, 장기 운영에는 AI Studio API key를 권장합니다.
4. 저장 후 반드시 재배포합니다.

## 사업자 인증 API 오류가 나는 경우

1. `NTS_BUSINESS_SERVICE_KEY`가 Production 환경에 입력됐는지 확인합니다.
2. 서버 API 응답에서 실제 키 값이 노출되지 않는지 확인합니다.
3. 국세청 API 오류나 신규 사업자 조회 실패 시 수동 검토 경로로 안내합니다.

## 역할별 화면이 잘못 보이는 경우

1. 로그인 계정의 `role`이 buyer/supplier/admin 중 하나인지 확인합니다.
2. buyer가 `/app/admin` 또는 `/app/supplier`에 직접 접근하면 권한 없음 화면이 떠야 합니다.
3. supplier가 `/app/admin`에 직접 접근하면 권한 없음 화면이 떠야 합니다.
4. 데모 초기화 버튼은 admin에서만 보여야 합니다.

## 배포 후 기본 점검 URL

- `/`
- `/status`
- `/login`
- `/app`
- `/app/requests/new`
- `/app/supplier`
- `/app/admin`
