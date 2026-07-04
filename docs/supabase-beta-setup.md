# 싸와! Supabase Beta 설정

프로젝트 URL: `https://dewlendyeycxfmblecog.supabase.co`

## 적용 순서

1. SQL Editor에서 migration 5개 순서대로 실행
2. Storage bucket 5개 확인
3. Auth Email provider 활성화
4. Site URL과 Redirect URLs 입력
5. 관리자 계정 생성 후 `profiles.role = 'admin'`
6. 테스트 계정 생성 후 `profiles.is_test_user = true`
7. Vercel Beta 환경변수에 publishable key 입력

## Auth URL

Site URL:

```text
https://<beta-domain>.vercel.app
```

Redirect URLs:

```text
http://127.0.0.1:4173/**
http://localhost:4173/**
https://<beta-domain>.vercel.app/**
https://<custom-beta-domain>/**
```

Supabase Auth는 redirect allowlist에 없는 URL로 로그인 후 이동하지 않습니다. Vercel Preview URL을 쓰는 경우 Preview 도메인도 추가해야 합니다.

## 관리자 세팅

관리자 이메일로 가입 후 SQL Editor에서 실행합니다.

```sql
update public.profiles
set role = 'admin'
where email = '관리자이메일@example.com';
```

관리자는 `/app/admin`, `/app/admin/supabase`, `/app/admin/feedback`, `/app/admin/qa` 접근을 확인합니다.

## 테스트 계정 표시

```sql
update public.profiles
set is_test_user = true
where email in (
  'buyer1@example.com',
  'buyer2@example.com',
  'supplier_food@example.com',
  'supplier_packaging@example.com',
  'supplier_duct@example.com'
);
```

## 공급업체 승인

```sql
update public.supplier_profiles
set approval_status = 'approved', operational_status = 'normal'
where business_number = '테스트사업자번호';
```

## Data API 권한

2026년 Supabase 변경으로 public schema table이 Data API에 자동 노출되지 않을 수 있습니다. `002_rls_policies.sql`에는 `authenticated`, `anon`, `service_role` GRANT가 포함되어 있습니다. RLS와 GRANT는 둘 다 필요합니다.
