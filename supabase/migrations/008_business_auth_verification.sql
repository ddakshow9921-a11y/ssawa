-- Business-number based signup, login readiness, and NTS verification records.

alter table public.profiles
  add column if not exists representative_name text,
  add column if not exists business_opening_date date,
  add column if not exists business_address text,
  add column if not exists business_type text,
  add column if not exists business_status text not null default 'unknown'
    check (business_status in ('active', 'suspended', 'closed', 'unregistered', 'api_error', 'unknown')),
  add column if not exists business_tax_type text,
  add column if not exists business_verification_status text not null default 'not_started'
    check (business_verification_status in ('not_started', 'status_checked', 'verified', 'failed', 'manual_review_required', 'api_error')),
  add column if not exists business_verified_at timestamptz,
  add column if not exists onboarding_completed boolean not null default false,
  add column if not exists onboarding_completed_at timestamptz;

alter table public.supplier_profiles
  add column if not exists business_verification_id uuid,
  add column if not exists document_status text not null default 'uploaded'
    check (document_status in ('uploaded', 'pending_review', 'approved', 'rejected')),
  add column if not exists approved_by uuid references public.profiles(id) on delete set null,
  add column if not exists approved_at timestamptz;

create table if not exists public.business_verifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  role_requested text not null check (role_requested in ('buyer', 'supplier', 'admin')),
  business_name text not null,
  business_number text not null,
  representative_name text not null,
  opening_date date not null,
  phone text not null default '',
  email text not null default '',
  region text not null default '',
  business_address text not null default '',
  status_check_status text not null default 'unknown'
    check (status_check_status in ('active', 'suspended', 'closed', 'unregistered', 'api_error', 'unknown')),
  status_check_label text not null default '',
  tax_type text,
  verification_status text not null default 'not_started'
    check (verification_status in ('not_started', 'status_checked', 'verified', 'failed', 'manual_review_required', 'api_error')),
  verification_method text not null default 'nts_status'
    check (verification_method in ('nts_status', 'nts_validate', 'manual_review', 'local_mock')),
  can_register boolean not null default false,
  failure_reason text,
  attempt_count integer not null default 1,
  raw_status_code text,
  raw_valid_code text,
  manually_reviewed_by uuid references public.profiles(id) on delete set null,
  manually_reviewed_at timestamptz,
  admin_memo text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.supplier_profiles
  drop constraint if exists supplier_profiles_business_verification_id_fkey,
  add constraint supplier_profiles_business_verification_id_fkey
    foreign key (business_verification_id) references public.business_verifications(id) on delete set null;

create table if not exists public.business_manual_review_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  role_requested text not null check (role_requested in ('buyer', 'supplier', 'admin')),
  business_name text not null,
  business_number text not null,
  representative_name text not null,
  opening_date date not null,
  phone text not null default '',
  email text not null default '',
  reason text not null default '',
  status text not null default 'submitted'
    check (status in ('submitted', 'reviewing', 'approved', 'rejected', 'needs_revision')),
  document_name text,
  document_url text,
  admin_memo text,
  reviewed_by uuid references public.profiles(id) on delete set null,
  reviewed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists business_verifications_user_idx on public.business_verifications (user_id, created_at desc);
create index if not exists business_verifications_number_idx on public.business_verifications (business_number);
create index if not exists business_verifications_status_idx on public.business_verifications (verification_status, created_at desc);
create index if not exists business_manual_reviews_status_idx on public.business_manual_review_requests (status, created_at desc);
create index if not exists business_manual_reviews_user_idx on public.business_manual_review_requests (user_id, created_at desc);
create index if not exists supplier_profiles_business_verification_idx on public.supplier_profiles (business_verification_id);

drop trigger if exists set_business_verifications_updated_at on public.business_verifications;
create trigger set_business_verifications_updated_at
before update on public.business_verifications
for each row execute function public.set_updated_at();

drop trigger if exists set_business_manual_review_requests_updated_at on public.business_manual_review_requests;
create trigger set_business_manual_review_requests_updated_at
before update on public.business_manual_review_requests
for each row execute function public.set_updated_at();

grant select, insert, update, delete on
  public.business_verifications,
  public.business_manual_review_requests
to authenticated;
grant all privileges on
  public.business_verifications,
  public.business_manual_review_requests
to service_role;

alter table public.business_verifications enable row level security;
alter table public.business_manual_review_requests enable row level security;

drop policy if exists "business_verifications_own_or_admin_select" on public.business_verifications;
create policy "business_verifications_own_or_admin_select" on public.business_verifications
for select to authenticated
using (user_id = auth.uid() or public.is_admin());

drop policy if exists "business_verifications_own_insert" on public.business_verifications;
create policy "business_verifications_own_insert" on public.business_verifications
for insert to authenticated
with check (user_id = auth.uid() or public.is_admin());

drop policy if exists "business_verifications_own_or_admin_update" on public.business_verifications;
create policy "business_verifications_own_or_admin_update" on public.business_verifications
for update to authenticated
using (user_id = auth.uid() or public.is_admin())
with check (user_id = auth.uid() or public.is_admin());

drop policy if exists "business_manual_reviews_own_or_admin_select" on public.business_manual_review_requests;
create policy "business_manual_reviews_own_or_admin_select" on public.business_manual_review_requests
for select to authenticated
using (user_id = auth.uid() or public.is_admin());

drop policy if exists "business_manual_reviews_own_insert" on public.business_manual_review_requests;
create policy "business_manual_reviews_own_insert" on public.business_manual_review_requests
for insert to authenticated
with check (user_id = auth.uid() or public.is_admin());

drop policy if exists "business_manual_reviews_admin_update" on public.business_manual_review_requests;
create policy "business_manual_reviews_admin_update" on public.business_manual_review_requests
for update to authenticated
using (public.is_admin())
with check (public.is_admin());
