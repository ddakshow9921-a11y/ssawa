# 싸와! Vercel 환경변수 체크리스트

이 문서는 Vercel 배포본에서 `/status`가 false로 보일 때 확인할 환경변수 목록입니다. 실제 키 값은 이 문서나 코드에 저장하지 않습니다.

## Vercel 입력 위치

1. Vercel Dashboard에서 `ssawa` 프로젝트를 엽니다.
2. `Settings` → `Environment Variables`로 이동합니다.
3. Production과 Preview에 필요한 값을 모두 입력합니다.
4. 저장 후 `Redeploy`를 실행합니다.
5. 배포 완료 후 `https://ssawa-git-main-ssawa.vercel.app/status`에서 true/false를 확인합니다.

## 필수 공개 환경변수

| 이름 | 용도 |
| --- | --- |
| `VITE_APP_ENV` | Vite 클라이언트 실행 환경 |
| `VITE_APP_URL` | 공개 앱 URL |
| `VITE_SUPABASE_URL` | Supabase 프로젝트 URL |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | 브라우저용 Supabase publishable/anon key |
| `VITE_USE_LIVE_DATA` | Supabase 실데이터 사용 여부 |
| `VITE_ENABLE_DEMO_DATA` | 데모 데이터 허용 여부 |
| `VITE_ENABLE_MOCK_AI` | AI mock 허용 여부 |
| `VITE_ENABLE_MOCK_PAYMENT` | 결제 mock 허용 여부 |
| `VITE_ENABLE_MOCK_SETTLEMENT` | 정산 mock 허용 여부 |
| `VITE_ENABLE_BETA_BADGE` | 베타 배지 표시 여부 |

## Next 스타일 별칭

현재 앱은 Vite라 브라우저 코드는 `VITE_*`를 읽습니다. 다만 운영 런북과 `/status` 호환을 위해 아래 값도 함께 넣을 수 있습니다.

| 이름 | 매핑 |
| --- | --- |
| `NEXT_PUBLIC_APP_ENV` | `VITE_APP_ENV`와 동일 |
| `NEXT_PUBLIC_APP_URL` | `VITE_APP_URL`과 동일 |
| `NEXT_PUBLIC_SUPABASE_URL` | `VITE_SUPABASE_URL`과 동일 |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `VITE_SUPABASE_PUBLISHABLE_KEY`와 동일 |
| `NEXT_PUBLIC_USE_LIVE_DATA` | `VITE_USE_LIVE_DATA`와 동일 |
| `NEXT_PUBLIC_ENABLE_DEMO_DATA` | `VITE_ENABLE_DEMO_DATA`와 동일 |

## 서버 전용 환경변수

아래 값은 절대 클라이언트 코드, 문서, Git 커밋에 넣지 않습니다.

| 이름 | 용도 |
| --- | --- |
| `SUPABASE_SERVICE_ROLE_KEY` | 서버 전용 Supabase 관리 작업 |
| `NTS_BUSINESS_SERVICE_KEY` | 국세청 사업자 인증 API |
| `GEMINI_API_KEY` | Gemini 이미지 분석 |
| `GEMINI_MODEL` | Gemini 모델명 |

## 확인 기준

`/status` 응답의 `checks`에서 다음 값이 `true`면 기본 운영 연결 준비가 된 상태입니다.

- `appUrlConfigured`
- `supabaseUrlConfigured`
- `supabaseAnonKeyConfigured`
- `supabaseServiceRoleConfigured`
- `ntsBusinessServiceKeyConfigured`
- `liveDataEnabled`
