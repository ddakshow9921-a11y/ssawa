-- 싸와! MVP12 beta operations additions.
-- Adds test-user separation and optional invite-code foundation.

alter table public.profiles
  add column if not exists is_test_user boolean not null default false;

do $$
begin
  if exists (
    select 1
    from pg_constraint
    where conname = 'feedbacks_status_check'
      and conrelid = 'public.feedbacks'::regclass
  ) then
    alter table public.feedbacks drop constraint feedbacks_status_check;
  end if;
end;
$$;

alter table public.feedbacks
  add constraint feedbacks_status_check
  check (status in ('submitted', 'reviewing', 'planned', 'in_progress', 'resolved', 'dismissed'));

create table if not exists public.invite_codes (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  role_hint text not null default 'any' check (role_hint in ('buyer', 'supplier', 'any')),
  max_uses integer not null default 1 check (max_uses > 0),
  used_count integer not null default 0 check (used_count >= 0),
  expires_at timestamptz,
  is_active boolean not null default true,
  memo text,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists set_invite_codes_updated_at on public.invite_codes;
create trigger set_invite_codes_updated_at
before update on public.invite_codes
for each row execute function public.set_updated_at();

grant select, insert, update, delete on public.invite_codes to authenticated;
grant all privileges on public.invite_codes to service_role;
alter table public.invite_codes enable row level security;

drop policy if exists "invite_codes_admin_all" on public.invite_codes;
create policy "invite_codes_admin_all" on public.invite_codes
for all to authenticated
using (public.is_admin())
with check (public.is_admin());

insert into public.qa_checklists (id, category, title, description, status, memo, created_by_seed)
values
  ('00000000-0000-4000-8000-000000001006', 'Beta Ops', '베타 초대/테스트 계정 분리', '테스트 계정은 profiles.is_test_user=true로 표시하고 실제 비밀번호는 문서에 남기지 않는다.', 'unchecked', '', true),
  ('00000000-0000-4000-8000-000000001007', 'Deployment', 'Vercel SPA 라우팅 검증', '직접 URL /app/admin/supabase, /partners, /beta 접속이 200으로 열리는지 확인한다.', 'unchecked', '', true),
  ('00000000-0000-4000-8000-000000001008', 'Emergency', '롤백/공지 절차 확인', 'RLS/업로드/로그인 장애 발생 시 Vercel rollback 및 베타 공지 문구를 준비한다.', 'unchecked', '', true)
on conflict (id) do update
set
  category = excluded.category,
  title = excluded.title,
  description = excluded.description,
  updated_at = now();
