# 싸와! MVP

B2B 자재 견적구매 플랫폼 “싸와!” 베타 준비 저장소입니다.

## Stack

- Vite
- React
- TypeScript
- Supabase Auth/Database/Storage 준비
- Vercel static deployment

## Local Run

```powershell
pnpm install
pnpm run dev
```

로컬 기본 URL은 `http://127.0.0.1:5173`입니다. 현재 미리보기 서버는 `http://127.0.0.1:4173`을 사용합니다.

## Checks

```powershell
pnpm run typecheck
pnpm run build
pnpm run check
```

## Beta Deployment

GitHub repository:

```text
https://github.com/ddakshow9921-a11y/ssawa.git
```

Vercel settings:

- Framework Preset: Vite
- Install Command: `pnpm install --frozen-lockfile`
- Build Command: `pnpm exec tsc --noEmit && pnpm exec vite build`
- Output Directory: `dist`

자세한 배포 절차는 `docs/vercel-beta-deployment.md`를 봅니다.

## Supabase

Project URL:

```text
https://dewlendyeycxfmblecog.supabase.co
```

SQL 적용 순서:

1. `supabase/migrations/001_initial_schema.sql`
2. `supabase/migrations/002_rls_policies.sql`
3. `supabase/migrations/003_storage_buckets.sql`
4. `supabase/migrations/004_seed_beta_data.sql`
5. `supabase/migrations/005_beta_operations.sql`

## Environment

`.env.example`을 기준으로 `.env.local`을 만들고 실제 키는 커밋하지 않습니다. 브라우저에 노출되는 값은 Vite 규칙에 따라 `VITE_` 접두사를 사용합니다.

## Docs

- `docs/env-vars.md`
- `docs/vercel-beta-deployment.md`
- `docs/supabase-beta-setup.md`
- `docs/beta-operation-manual.md`
- `docs/smoke-test-checklist.md`
- `docs/rollback-plan.md`
