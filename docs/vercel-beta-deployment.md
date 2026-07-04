# 싸와! Vercel 베타 배포 가이드

GitHub 저장소: `https://github.com/ddakshow9921-a11y/ssawa.git`

## 프로젝트 설정

- Framework Preset: Vite
- Install Command: `pnpm install --frozen-lockfile`
- Build Command: `pnpm exec tsc --noEmit && pnpm exec vite build`
- Output Directory: `dist`
- Node.js: `>=20`
- Production Branch: `main`

`vercel.json`에 SPA 직접 URL 접속을 위한 rewrite가 포함되어 있습니다.

## GitHub 연결

1. Vercel Dashboard에서 Add New Project
2. GitHub repository `ddakshow9921-a11y/ssawa` 선택
3. Vite preset 확인
4. Environment Variables 입력
5. 첫 배포 실행

Preview 배포는 main이 아닌 브랜치 push에서 생성됩니다. 베타 운영을 main에 바로 물릴지, `beta` 브랜치를 Preview로 쓸지는 운영자가 결정합니다.

## 베타 권장 흐름

1. 로컬에서 `pnpm run check`
2. `main` 또는 `beta` 브랜치에 push
3. Vercel 배포 로그 확인
4. 배포 URL 확인
5. Supabase Auth Site URL/Redirect URL에 배포 URL 등록
6. `docs/smoke-test-checklist.md` 실행
7. 문제 없을 때 베타 사용자에게 링크 공유

## Vercel Environment Variables

Preview/Beta에는 `docs/env-vars.md`의 Beta 값을 넣습니다. Secret 값은 Vercel 서버 환경 또는 Supabase Edge Function에서만 사용합니다.

## 배포 실패 가능 지점

- `VITE_SUPABASE_PUBLISHABLE_KEY` 미입력
- Supabase Auth redirect URL 누락
- migration 미적용으로 Data API 42501 또는 table not found
- Storage bucket 미생성
- `vercel.json` rewrite 누락 시 `/app/...` 직접 접속 404
- Vercel Project Settings에서 `Build Command`가 `vercel.json`과 다르게 override됨
- production에서 mock/live flag 혼합

## 배포 후 URL

배포 URL은 확정 후 `docs/deployment-report-template.md`에 기록합니다.
