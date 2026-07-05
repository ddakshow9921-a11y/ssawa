# 싸와! Supabase Auth Redirect URL 설정

Supabase 프로젝트 URL: `https://dewlendyeycxfmblecog.supabase.co`

이 문서는 Vercel 공개 URL에서 로그인/회원가입 후 앱으로 정상 복귀하도록 Supabase Auth URL 설정을 맞추는 절차입니다.

## 1. Supabase Dashboard 접속

1. Supabase Dashboard에 로그인합니다.
2. 프로젝트 `dewlendyeycxfmblecog`를 선택합니다.
3. 왼쪽 메뉴에서 Authentication을 엽니다.

## 2. URL Configuration 이동

Authentication -> URL Configuration으로 이동합니다.

Site URL은 사용자가 기본적으로 돌아올 공개 Production URL입니다.

```text
https://공개-production-url.vercel.app
```

커스텀 도메인을 연결했다면 Site URL은 커스텀 도메인을 우선 사용합니다.

```text
https://커스텀도메인
```

## 3. Redirect URLs 등록

로컬 개발과 Vercel 배포 URL을 모두 등록합니다.

```text
http://127.0.0.1:4173/**
http://localhost:4173/**
https://공개-production-url.vercel.app/**
https://커스텀도메인/**
```

Preview URL을 외부 테스트에 쓸 때는 해당 URL도 추가할 수 있지만, Preview Deployment Protection이 켜져 있으면 외부 사용자는 여전히 Vercel 보호 화면을 보게 됩니다.

## 4. Vercel 환경변수와 맞추기

Vercel Project -> Settings -> Environment Variables에 아래 값을 공개 URL과 일치시킵니다.

```env
VITE_APP_ENV=beta
VITE_APP_URL=https://공개-production-url.vercel.app
VITE_API_BASE_URL=https://공개-production-url.vercel.app
VITE_SUPABASE_URL=https://dewlendyeycxfmblecog.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_xxx
```

서버 전용 키는 브라우저 공개 변수로 만들지 않습니다.

```env
SUPABASE_SERVICE_ROLE_KEY=server_only
GEMINI_API_KEY=server_only
NTS_BUSINESS_SERVICE_KEY=server_only
```

## 5. 로그인 후 redirect 확인

1. 시크릿 브라우저에서 `https://공개-production-url.vercel.app/login` 접속
2. 테스트 계정 로그인
3. 구매자는 `/app`, 공급업체는 `/app/supplier`, 관리자는 `/app/admin`으로 이동하는지 확인
4. 브라우저 새로고침 후에도 세션이 유지되는지 확인
5. 로그아웃 후 `/app` 접속 시 로그인 또는 기본 앱 진입 흐름이 깨지지 않는지 확인

## 6. 테스트 계정

- 구매자: `buyer@test.ssawa.local` / `test1234!`
- 공급업체: `supplier@test.ssawa.local` / `test1234!`
- 관리자: `admin@test.ssawa.local` / `test1234!`

## 7. 흔한 오류

- Site URL이 Preview URL로 되어 있어 Production에서 redirect 불일치
- Redirect URLs에 `/app/**`만 등록하고 `/login` 또는 루트 경로 누락
- Vercel Preview URL을 공유했는데 Deployment Protection이 켜져 있음
- `SUPABASE_SERVICE_ROLE_KEY`를 `VITE_` 또는 `NEXT_PUBLIC_`로 등록해 브라우저에 노출
- Vercel 환경변수 변경 후 Redeploy를 하지 않음
