# 싸와! Vercel 공개 접근 점검 체크리스트

## 1. 현재 문제 요약

현재 공유된 Vercel URL이 싸와! 앱 화면이 아니라 Vercel SSO 또는 Deployment Protection 화면으로 이동하면 외부 테스터, ChatGPT, 비로그인 브라우저가 앱을 검토할 수 없습니다.

확인 대상 URL:

- `https://ssawa-8ps8f8i48-ssawa.vercel.app/app`
- `https://ssawa-git-main-ssawa.vercel.app`

싸와!는 Next.js가 아니라 Vite + React SPA입니다. Vercel 배포 산출물은 `dist`이고, `vercel.json`의 rewrite가 `/app`, `/login`, `/status` 같은 직접 접근 URL을 `index.html`로 연결합니다.

## 2. 공개 접근 가능한 URL 확인 방법

1. 시크릿 브라우저 또는 로그아웃된 브라우저를 엽니다.
2. `https://공개-production-url.vercel.app/status`에 접속합니다.
3. Vercel 로그인/SSO 화면이 아니라 JSON 응답의 `ok: true`, `status: "OK"`가 보이면 보호가 해제된 것입니다.
4. `/app`으로 이동했을 때 싸와! 로그인 화면 또는 앱 홈이 보이는지 확인합니다.

권장 URL:

- `https://프로젝트명.vercel.app/app`
- `https://커스텀도메인/app`

비권장 URL:

- `https://프로젝트명-git-main-팀명.vercel.app/app`
- `https://프로젝트명-랜덤해시-팀명.vercel.app/app`

Preview/branch/deployment URL은 팀 설정에 따라 보호가 적용될 수 있습니다. 외부 테스트에는 Production Domain을 우선 사용합니다.

## 3. Vercel Production URL 확인 방법

1. Vercel Dashboard에 접속합니다.
2. 싸와! 프로젝트를 엽니다.
3. Project Overview에서 최신 Production Deployment를 확인합니다.
4. `Visit` 버튼으로 열린 URL을 복사합니다.
5. Domains 메뉴에서 Production Domain이 같은 배포를 가리키는지 확인합니다.

## 4. Deployment Protection 끄는 방법

Vercel Dashboard에서만 처리할 수 있습니다.

1. Project -> Settings -> Deployment Protection으로 이동합니다.
2. Vercel Authentication이 켜져 있으면 외부 테스트용 Production Domain에서는 끕니다.
3. Preview Protection이 켜져 있으면 Preview URL은 계속 보호될 수 있습니다.
4. 팀 정책상 보호를 끌 수 없으면 공개 가능한 Production Domain 또는 Protection Bypass/Exception을 발급합니다.
5. 변경 후 Redeploy 또는 최신 Production Deployment 재확인을 진행합니다.

코드에서 할 수 있는 일:

- `/status`, `/health`, `/beta-status` JSON 상태 응답 제공
- `vercel.json` rewrite 점검
- 환경변수와 배포 체크 문서화
- Supabase Redirect URL 문서화

코드로 할 수 없는 일:

- Vercel Authentication 해제
- Team/Project Deployment Protection 해제
- Production Domain 연결
- Protection Bypass 토큰 발급

## 5. Preview URL과 Production URL 차이

Preview URL은 특정 커밋/브랜치 배포입니다. 보통 아래 형태입니다.

- `https://프로젝트명-git-브랜치-팀명.vercel.app`
- `https://프로젝트명-랜덤해시-팀명.vercel.app`

Production URL은 외부 테스트 링크로 쓰기 좋습니다.

- `https://프로젝트명.vercel.app`
- `https://커스텀도메인`

Preview URL이 정상이어도 Production이 아니면 Supabase Redirect URL, 쿠키, 공개 접근 정책이 다를 수 있습니다.

## 6. Supabase Auth Redirect URL 설정 방법

Supabase Dashboard -> Authentication -> URL Configuration에서 설정합니다.

Site URL:

```text
https://공개-production-url.vercel.app
```

Redirect URLs:

```text
http://127.0.0.1:4173/**
http://localhost:4173/**
https://공개-production-url.vercel.app/**
https://커스텀도메인/**
```

자세한 설정은 `docs/supabase-auth-redirect-setup.md`를 따릅니다.

## 7. 배포 후 외부 접근 테스트 방법

1. Vercel 보호 설정 변경 후 Production Deployment를 확인합니다.
2. 시크릿 브라우저에서 `/status` 접속 후 JSON `ok: true` 확인
3. `/app` 접속
4. `/login` 접속
5. 테스트 계정으로 로그인
6. 구매자/공급업체/관리자별 화면 이동 확인
7. `/api/business/status`와 `/api/analyze-receipt`는 서버 환경변수 존재 여부에 따라 실제 API 또는 fallback으로 동작하는지 확인

## 8. 테스트 계정

구매자:

- email: `buyer@test.ssawa.local`
- password: `test1234!`

공급업체:

- email: `supplier@test.ssawa.local`
- password: `test1234!`

관리자:

- email: `admin@test.ssawa.local`
- password: `test1234!`

## 9. 문제 발생 시 체크리스트

- [ ] URL이 Production Domain인지 확인
- [ ] Project -> Settings -> Deployment Protection 확인
- [ ] Vercel Authentication이 외부 테스트용 URL에서 꺼져 있는지 확인
- [ ] Preview URL만 공유하고 있지 않은지 확인
- [ ] Domains에서 Production Domain 연결 확인
- [ ] Vercel Environment Variables에 `VITE_APP_URL` 입력
- [ ] Vercel Environment Variables에 `VITE_API_BASE_URL` 입력
- [ ] Supabase Auth Redirect URLs에 같은 공개 URL 등록
- [ ] `vercel.json` rewrite가 `/api/`, `/assets/`를 제외하고 `index.html`로 연결하는지 확인
- [ ] Redeploy 후 시크릿 브라우저에서 `/status` 접속

## 10. 운영자 직접 작업 체크리스트

- [ ] Vercel Project 접속
- [ ] Settings -> Deployment Protection 확인
- [ ] Vercel Authentication이 켜져 있으면 외부 테스트용으로 끄거나 Production Domain 사용
- [ ] Project Overview에서 Production Deployment의 Visit URL 복사
- [ ] Domains에서 공개 도메인 확인
- [ ] Vercel Environment Variables에 `VITE_APP_URL` 등록
- [ ] Vercel Environment Variables에 `VITE_API_BASE_URL` 등록
- [ ] Supabase Auth Redirect URLs에 동일한 URL 등록
- [ ] Redeploy 실행
- [ ] 시크릿/게스트 브라우저에서 앱 접속 테스트
- [ ] `/status` 접속 시 JSON `ok: true`가 나오는지 확인
- [ ] `/app` 접속 시 싸와 로그인 화면 또는 앱 홈이 나오는지 확인
- [ ] 구매자/공급업체/관리자 테스트 계정 로그인 확인
