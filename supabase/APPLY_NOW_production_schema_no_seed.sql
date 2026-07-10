-- 싸와 운영 Supabase 스키마 적용용 SQL
-- 생성일: 2026-07-08
-- 목적: quote_requests 등 운영 테이블/RLS/스토리지 정책 생성
-- 제외: 004_seed_beta_data.sql (샘플/가짜 데이터)
-- Supabase Dashboard > SQL Editor에서 전체 실행하세요.


-- ============================================================
-- SOURCE: supabase\migrations\001_initial_schema.sql
-- ============================================================

-- 싸와! MVP beta schema
-- Apply before RLS/storage policies.

create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text not null default '',
  email text not null,
  role text not null default 'buyer' check (role in ('buyer', 'supplier', 'admin')),
  business_name text,
  business_number text,
  phone text,
  region text,
  is_demo boolean not null default false,
  created_by_seed boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  parent_id uuid references public.categories(id) on delete set null,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  is_demo boolean not null default false,
  created_by_seed boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists categories_name_parent_idx on public.categories (name, coalesce(parent_id, '00000000-0000-0000-0000-000000000000'::uuid));
create index if not exists categories_active_sort_idx on public.categories (is_active, sort_order);

create table if not exists public.supplier_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  business_name text not null,
  business_number text not null,
  representative_name text not null,
  manager_name text,
  manager_phone text,
  phone text not null,
  email text,
  address text,
  description text,
  service_regions text[] not null default '{}',
  categories text[] not null default '{}',
  sub_categories text[] not null default '{}',
  min_order_amount integer,
  delivery_fee_policy text,
  tax_invoice_available boolean not null default false,
  card_payment_available boolean not null default false,
  bank_transfer_available boolean not null default true,
  approval_status text not null default 'pending' check (approval_status in ('pending', 'approved', 'needs_revision', 'rejected', 'suspended')),
  operational_status text not null default 'normal' check (operational_status in ('normal', 'warning', 'restricted', 'suspended', 'banned')),
  admin_memo text,
  rejection_reason text,
  is_demo boolean not null default false,
  created_by_seed boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id),
  unique (business_number)
);

create index if not exists supplier_profiles_approval_idx on public.supplier_profiles (approval_status, operational_status);
create index if not exists supplier_profiles_regions_gin_idx on public.supplier_profiles using gin (service_regions);
create index if not exists supplier_profiles_categories_gin_idx on public.supplier_profiles using gin (categories);

create table if not exists public.quote_requests (
  id uuid primary key default gen_random_uuid(),
  buyer_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  category_id uuid references public.categories(id) on delete set null,
  category_name text not null,
  delivery_region text not null,
  delivery_address text,
  desired_delivery_date date,
  need_tax_invoice boolean not null default false,
  card_payment_required boolean not null default false,
  description text,
  status text not null default 'open' check (status in ('open', 'quoted', 'selected', 'in_progress', 'completed', 'closed', 'cancelled')),
  selected_quote_id uuid,
  input_method text not null default 'manual' check (input_method in ('manual', 'photo', 'invoice', 'text', 'template', 'repeat')),
  request_quality_score integer,
  urgent boolean not null default false,
  budget_min integer,
  budget_max integer,
  preferred_brand text,
  allow_alternatives boolean not null default true,
  include_delivery_fee boolean not null default true,
  is_demo boolean not null default false,
  created_by_seed boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists quote_requests_buyer_status_idx on public.quote_requests (buyer_id, status, created_at desc);
create index if not exists quote_requests_status_region_idx on public.quote_requests (status, delivery_region, created_at desc);
create index if not exists quote_requests_category_idx on public.quote_requests (category_id, category_name);

create table if not exists public.quote_request_items (
  id uuid primary key default gen_random_uuid(),
  quote_request_id uuid not null references public.quote_requests(id) on delete cascade,
  item_name text not null,
  spec text,
  quantity numeric(12, 3) not null default 1,
  unit text not null default '개',
  memo text,
  is_required boolean not null default true,
  allow_alternative boolean not null default true,
  confidence_score integer,
  needs_review boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists quote_request_items_request_idx on public.quote_request_items (quote_request_id);

create table if not exists public.quote_attachments (
  id uuid primary key default gen_random_uuid(),
  quote_request_id uuid not null references public.quote_requests(id) on delete cascade,
  uploaded_by uuid not null references public.profiles(id) on delete cascade,
  bucket_id text not null default 'quote-attachments',
  storage_path text not null,
  file_name text not null,
  file_type text not null,
  analysis_status text not null default 'uploaded' check (analysis_status in ('uploaded', 'analyzing', 'analyzed', 'failed')),
  extracted_text text,
  extracted_items_json jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.quotes (
  id uuid primary key default gen_random_uuid(),
  quote_request_id uuid not null references public.quote_requests(id) on delete cascade,
  supplier_id uuid not null references public.supplier_profiles(id) on delete cascade,
  total_amount integer not null default 0,
  delivery_fee integer not null default 0,
  final_amount integer not null default 0,
  available_delivery_date date,
  tax_invoice_available boolean not null default false,
  card_payment_available boolean not null default false,
  alternative_proposal text,
  item_price_memo text,
  memo text,
  valid_until timestamptz,
  status text not null default 'submitted' check (status in ('submitted', 'selected', 'rejected', 'expired', 'cancelled')),
  is_demo boolean not null default false,
  created_by_seed boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (quote_request_id, supplier_id)
);

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'quote_requests_selected_quote_fk'
      and conrelid = 'public.quote_requests'::regclass
  ) then
    alter table public.quote_requests
      add constraint quote_requests_selected_quote_fk
      foreign key (selected_quote_id) references public.quotes(id) on delete set null
      not valid;
  end if;
end;
$$;

create index if not exists quotes_request_status_idx on public.quotes (quote_request_id, status);
create index if not exists quotes_supplier_status_idx on public.quotes (supplier_id, status, created_at desc);

create table if not exists public.deals (
  id uuid primary key default gen_random_uuid(),
  quote_request_id uuid not null references public.quote_requests(id) on delete restrict,
  selected_quote_id uuid not null references public.quotes(id) on delete restrict,
  buyer_id uuid not null references public.profiles(id) on delete restrict,
  supplier_id uuid not null references public.supplier_profiles(id) on delete restrict,
  title text not null,
  category_name text not null,
  delivery_region text not null,
  delivery_address text,
  desired_delivery_date date,
  confirmed_delivery_date date,
  subtotal_amount integer not null default 0,
  delivery_fee integer not null default 0,
  final_amount integer not null default 0,
  payment_method text not null default 'undecided' check (payment_method in ('bank_transfer', 'card', 'cash', 'later', 'undecided')),
  status text not null default 'pending_confirmation',
  buyer_memo text,
  supplier_memo text,
  cancellation_reason text,
  dispute_reason text,
  completed_at timestamptz,
  is_demo boolean not null default false,
  created_by_seed boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists deals_buyer_status_idx on public.deals (buyer_id, status, created_at desc);
create index if not exists deals_supplier_status_idx on public.deals (supplier_id, status, created_at desc);

create table if not exists public.deal_items (
  id uuid primary key default gen_random_uuid(),
  deal_id uuid not null references public.deals(id) on delete cascade,
  item_name text not null,
  spec text,
  quantity numeric(12, 3) not null default 1,
  unit text not null default '개',
  unit_price integer not null default 0,
  total_price integer not null default 0,
  memo text,
  alternative_item_name text,
  created_at timestamptz not null default now()
);

create table if not exists public.purchase_records (
  id uuid primary key default gen_random_uuid(),
  deal_id uuid references public.deals(id) on delete set null,
  quote_request_id uuid references public.quote_requests(id) on delete set null,
  buyer_id uuid not null references public.profiles(id) on delete cascade,
  supplier_id uuid references public.supplier_profiles(id) on delete set null,
  purchase_title text not null,
  purchase_date date not null default current_date,
  category_name text not null,
  total_amount integer not null default 0,
  payment_method text not null default 'undecided',
  tax_invoice_status text not null default 'none',
  receipt_status text not null default 'none',
  delivery_note_status text not null default 'none',
  accounting_status text not null default 'pending',
  sync_target text not null default 'none',
  memo text,
  is_demo boolean not null default false,
  created_by_seed boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists purchase_records_buyer_date_idx on public.purchase_records (buyer_id, purchase_date desc);

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  user_role text not null check (user_role in ('buyer', 'supplier', 'admin')),
  type text not null,
  title text not null,
  body text not null,
  link_url text,
  related_entity_type text,
  related_entity_id uuid,
  priority text not null default 'normal' check (priority in ('low', 'normal', 'high', 'urgent')),
  is_read boolean not null default false,
  read_at timestamptz,
  is_archived boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists notifications_user_read_idx on public.notifications (user_id, is_read, created_at desc);

create table if not exists public.message_threads (
  id uuid primary key default gen_random_uuid(),
  thread_type text not null check (thread_type in ('quote_request', 'deal', 'supplier', 'support')),
  related_entity_id uuid,
  buyer_id uuid references public.profiles(id) on delete set null,
  supplier_id uuid references public.supplier_profiles(id) on delete set null,
  admin_id uuid references public.profiles(id) on delete set null,
  title text not null,
  status text not null default 'open' check (status in ('open', 'closed', 'reported')),
  last_message_at timestamptz not null default now(),
  is_demo boolean not null default false,
  created_by_seed boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  thread_id uuid not null references public.message_threads(id) on delete cascade,
  sender_id uuid references public.profiles(id) on delete set null,
  sender_role text not null check (sender_role in ('buyer', 'supplier', 'admin', 'system')),
  body text not null,
  attachment_url text,
  attachment_name text,
  is_read boolean not null default false,
  read_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists messages_thread_created_idx on public.messages (thread_id, created_at);

create table if not exists public.feedbacks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  user_role text not null check (user_role in ('buyer', 'supplier', 'admin')),
  feedback_type text not null,
  title text not null,
  description text not null,
  page_url text,
  screenshot_url text,
  status text not null default 'submitted' check (status in ('submitted', 'reviewing', 'planned', 'resolved', 'dismissed')),
  admin_memo text,
  is_demo boolean not null default false,
  created_by_seed boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists feedbacks_status_created_idx on public.feedbacks (status, created_at desc);
create index if not exists feedbacks_user_idx on public.feedbacks (user_id, created_at desc);

create table if not exists public.reports (
  id uuid primary key default gen_random_uuid(),
  reporter_id uuid not null references public.profiles(id) on delete cascade,
  target_user_id uuid references public.profiles(id) on delete set null,
  report_type text not null,
  related_entity_type text not null,
  related_entity_id uuid,
  title text not null,
  description text not null,
  desired_resolution text,
  status text not null default 'submitted',
  priority text not null default 'normal',
  admin_memo text,
  resolution_summary text,
  is_demo boolean not null default false,
  created_by_seed boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  deal_id uuid not null references public.deals(id) on delete cascade,
  quote_request_id uuid not null references public.quote_requests(id) on delete cascade,
  buyer_id uuid not null references public.profiles(id) on delete cascade,
  supplier_id uuid not null references public.supplier_profiles(id) on delete cascade,
  rating_overall integer not null check (rating_overall between 1 and 5),
  rating_price integer not null check (rating_price between 1 and 5),
  rating_delivery integer not null check (rating_delivery between 1 and 5),
  rating_quality integer not null check (rating_quality between 1 and 5),
  rating_communication integer not null check (rating_communication between 1 and 5),
  content text not null,
  is_public boolean not null default true,
  would_reorder boolean not null default true,
  status text not null default 'active' check (status in ('active', 'hidden', 'reported', 'deleted')),
  is_demo boolean not null default false,
  created_by_seed boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (deal_id, buyer_id)
);

create table if not exists public.supplier_documents (
  id uuid primary key default gen_random_uuid(),
  supplier_id uuid not null references public.supplier_profiles(id) on delete cascade,
  uploaded_by uuid not null references public.profiles(id) on delete cascade,
  document_type text not null,
  bucket_id text not null default 'supplier-documents',
  storage_path text not null,
  file_name text not null,
  status text not null default 'pending_review',
  reviewed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.analysis_jobs (
  id uuid primary key default gen_random_uuid(),
  buyer_id uuid not null references public.profiles(id) on delete cascade,
  source_type text not null,
  original_file_url text,
  original_file_name text,
  original_file_type text,
  original_text_input text,
  status text not null default 'uploaded',
  analysis_engine text not null default 'mock',
  confidence_score integer not null default 0,
  detected_category text,
  detected_supplier_name text,
  detected_business_number text,
  detected_transaction_date date,
  detected_total_amount integer not null default 0,
  error_message text,
  is_demo boolean not null default false,
  created_by_seed boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  completed_at timestamptz
);

create table if not exists public.analysis_items (
  id uuid primary key default gen_random_uuid(),
  analysis_job_id uuid not null references public.analysis_jobs(id) on delete cascade,
  item_name text not null,
  normalized_item_name text,
  spec text,
  quantity numeric(12, 3) not null default 1,
  unit text not null default '개',
  unit_price integer not null default 0,
  total_price integer not null default 0,
  memo text,
  category_name text,
  confidence_score integer not null default 0,
  review_status text not null default 'extracted',
  review_reason text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.analysis_attachments (
  id uuid primary key default gen_random_uuid(),
  analysis_job_id uuid not null references public.analysis_jobs(id) on delete cascade,
  uploaded_by uuid not null references public.profiles(id) on delete cascade,
  bucket_id text not null default 'analysis-files',
  storage_path text not null,
  file_name text not null,
  file_type text not null,
  page_number integer not null default 1,
  preview_url text,
  created_at timestamptz not null default now()
);

create table if not exists public.qa_checklists (
  id uuid primary key default gen_random_uuid(),
  category text not null,
  title text not null,
  description text not null,
  status text not null default 'unchecked' check (status in ('unchecked', 'passed', 'failed', 'skipped')),
  memo text,
  checked_by uuid references public.profiles(id) on delete set null,
  checked_at timestamptz,
  is_demo boolean not null default false,
  created_by_seed boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists set_profiles_updated_at on public.profiles;
create trigger set_profiles_updated_at before update on public.profiles for each row execute function public.set_updated_at();

drop trigger if exists set_categories_updated_at on public.categories;
create trigger set_categories_updated_at before update on public.categories for each row execute function public.set_updated_at();

drop trigger if exists set_supplier_profiles_updated_at on public.supplier_profiles;
create trigger set_supplier_profiles_updated_at before update on public.supplier_profiles for each row execute function public.set_updated_at();

drop trigger if exists set_quote_requests_updated_at on public.quote_requests;
create trigger set_quote_requests_updated_at before update on public.quote_requests for each row execute function public.set_updated_at();

drop trigger if exists set_quotes_updated_at on public.quotes;
create trigger set_quotes_updated_at before update on public.quotes for each row execute function public.set_updated_at();

drop trigger if exists set_deals_updated_at on public.deals;
create trigger set_deals_updated_at before update on public.deals for each row execute function public.set_updated_at();

drop trigger if exists set_purchase_records_updated_at on public.purchase_records;
create trigger set_purchase_records_updated_at before update on public.purchase_records for each row execute function public.set_updated_at();

drop trigger if exists set_message_threads_updated_at on public.message_threads;
create trigger set_message_threads_updated_at before update on public.message_threads for each row execute function public.set_updated_at();

drop trigger if exists set_feedbacks_updated_at on public.feedbacks;
create trigger set_feedbacks_updated_at before update on public.feedbacks for each row execute function public.set_updated_at();

drop trigger if exists set_reports_updated_at on public.reports;
create trigger set_reports_updated_at before update on public.reports for each row execute function public.set_updated_at();

drop trigger if exists set_reviews_updated_at on public.reviews;
create trigger set_reviews_updated_at before update on public.reviews for each row execute function public.set_updated_at();

drop trigger if exists set_supplier_documents_updated_at on public.supplier_documents;
create trigger set_supplier_documents_updated_at before update on public.supplier_documents for each row execute function public.set_updated_at();

drop trigger if exists set_analysis_jobs_updated_at on public.analysis_jobs;
create trigger set_analysis_jobs_updated_at before update on public.analysis_jobs for each row execute function public.set_updated_at();

drop trigger if exists set_analysis_items_updated_at on public.analysis_items;
create trigger set_analysis_items_updated_at before update on public.analysis_items for each row execute function public.set_updated_at();

drop trigger if exists set_qa_checklists_updated_at on public.qa_checklists;
create trigger set_qa_checklists_updated_at before update on public.qa_checklists for each row execute function public.set_updated_at();


-- ============================================================
-- SOURCE: supabase\migrations\002_rls_policies.sql
-- ============================================================

-- 싸와! MVP beta RLS and explicit Data API grants.
-- Supabase 2026 projects can require explicit GRANTs in addition to RLS.

create or replace function public.current_profile_role()
returns text
language sql
stable
security definer
set search_path = ''
as $$
  select p.role from public.profiles p where p.id = auth.uid()
$$;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  )
$$;

create or replace function public.is_approved_supplier()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.supplier_profiles sp
    where sp.user_id = auth.uid()
      and sp.approval_status = 'approved'
      and sp.operational_status not in ('suspended', 'banned')
  )
$$;

create or replace function public.is_message_thread_participant(thread_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.message_threads mt
    left join public.supplier_profiles sp on sp.id = mt.supplier_id
    where mt.id = thread_id
      and (
        mt.buyer_id = auth.uid()
        or sp.user_id = auth.uid()
        or mt.admin_id = auth.uid()
        or public.is_admin()
      )
  )
$$;

revoke all on function public.current_profile_role() from public;
revoke all on function public.is_admin() from public;
revoke all on function public.is_approved_supplier() from public;
revoke all on function public.is_message_thread_participant(uuid) from public;
grant execute on function public.current_profile_role() to authenticated;
grant execute on function public.is_admin() to authenticated;
grant execute on function public.is_approved_supplier() to authenticated;
grant execute on function public.is_message_thread_participant(uuid) to authenticated;

grant usage on schema public to anon, authenticated, service_role;
grant select on public.categories to anon, authenticated;
grant select, insert, update, delete on
  public.profiles,
  public.supplier_profiles,
  public.quote_requests,
  public.quote_request_items,
  public.quote_attachments,
  public.quotes,
  public.deals,
  public.deal_items,
  public.purchase_records,
  public.notifications,
  public.message_threads,
  public.messages,
  public.feedbacks,
  public.reports,
  public.reviews,
  public.supplier_documents,
  public.analysis_jobs,
  public.analysis_items,
  public.analysis_attachments,
  public.qa_checklists
to authenticated;
grant all privileges on all tables in schema public to service_role;
grant usage, select on all sequences in schema public to authenticated, service_role;

alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.supplier_profiles enable row level security;
alter table public.quote_requests enable row level security;
alter table public.quote_request_items enable row level security;
alter table public.quote_attachments enable row level security;
alter table public.quotes enable row level security;
alter table public.deals enable row level security;
alter table public.deal_items enable row level security;
alter table public.purchase_records enable row level security;
alter table public.notifications enable row level security;
alter table public.message_threads enable row level security;
alter table public.messages enable row level security;
alter table public.feedbacks enable row level security;
alter table public.reports enable row level security;
alter table public.reviews enable row level security;
alter table public.supplier_documents enable row level security;
alter table public.analysis_jobs enable row level security;
alter table public.analysis_items enable row level security;
alter table public.analysis_attachments enable row level security;
alter table public.qa_checklists enable row level security;

drop policy if exists "profiles_select_own_or_admin" on public.profiles;
create policy "profiles_select_own_or_admin" on public.profiles
for select to authenticated
using (id = auth.uid() or public.is_admin());

drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own" on public.profiles
for insert to authenticated
with check (id = auth.uid());

drop policy if exists "profiles_update_own_or_admin" on public.profiles;
create policy "profiles_update_own_or_admin" on public.profiles
for update to authenticated
using (id = auth.uid() or public.is_admin())
with check (id = auth.uid() or public.is_admin());

drop policy if exists "categories_read_active" on public.categories;
create policy "categories_read_active" on public.categories
for select to anon, authenticated
using (is_active = true or public.is_admin());

drop policy if exists "categories_admin_write" on public.categories;
create policy "categories_admin_write" on public.categories
for all to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "supplier_profiles_read_approved_or_related" on public.supplier_profiles;
create policy "supplier_profiles_read_approved_or_related" on public.supplier_profiles
for select to authenticated
using (approval_status = 'approved' or user_id = auth.uid() or public.is_admin());

drop policy if exists "supplier_profiles_insert_own" on public.supplier_profiles;
create policy "supplier_profiles_insert_own" on public.supplier_profiles
for insert to authenticated
with check (user_id = auth.uid() or public.is_admin());

drop policy if exists "supplier_profiles_update_own_or_admin" on public.supplier_profiles;
create policy "supplier_profiles_update_own_or_admin" on public.supplier_profiles
for update to authenticated
using (user_id = auth.uid() or public.is_admin())
with check (user_id = auth.uid() or public.is_admin());

drop policy if exists "quote_requests_buyer_admin_supplier_read" on public.quote_requests;
create policy "quote_requests_buyer_admin_supplier_read" on public.quote_requests
for select to authenticated
using (
  buyer_id = auth.uid()
  or public.is_admin()
  or (
    status in ('open', 'quoted', 'selected')
    and public.is_approved_supplier()
  )
);

drop policy if exists "quote_requests_buyer_insert" on public.quote_requests;
create policy "quote_requests_buyer_insert" on public.quote_requests
for insert to authenticated
with check (buyer_id = auth.uid() or public.is_admin());

drop policy if exists "quote_requests_buyer_update" on public.quote_requests;
create policy "quote_requests_buyer_update" on public.quote_requests
for update to authenticated
using (buyer_id = auth.uid() or public.is_admin())
with check (buyer_id = auth.uid() or public.is_admin());

drop policy if exists "quote_request_items_related_read" on public.quote_request_items;
create policy "quote_request_items_related_read" on public.quote_request_items
for select to authenticated
using (
  exists (
    select 1 from public.quote_requests qr
    where qr.id = quote_request_id
      and (
        qr.buyer_id = auth.uid()
        or public.is_admin()
        or (qr.status in ('open', 'quoted', 'selected') and public.is_approved_supplier())
      )
  )
);

drop policy if exists "quote_request_items_buyer_write" on public.quote_request_items;
create policy "quote_request_items_buyer_write" on public.quote_request_items
for all to authenticated
using (
  exists (select 1 from public.quote_requests qr where qr.id = quote_request_id and (qr.buyer_id = auth.uid() or public.is_admin()))
)
with check (
  exists (select 1 from public.quote_requests qr where qr.id = quote_request_id and (qr.buyer_id = auth.uid() or public.is_admin()))
);

drop policy if exists "quote_attachments_related_read" on public.quote_attachments;
create policy "quote_attachments_related_read" on public.quote_attachments
for select to authenticated
using (
  uploaded_by = auth.uid()
  or public.is_admin()
  or exists (
    select 1 from public.quote_requests qr
    where qr.id = quote_request_id
      and (qr.buyer_id = auth.uid() or (qr.status in ('open', 'quoted', 'selected') and public.is_approved_supplier()))
  )
);

drop policy if exists "quote_attachments_related_write" on public.quote_attachments;
create policy "quote_attachments_related_write" on public.quote_attachments
for insert to authenticated
with check (
  uploaded_by = auth.uid()
  and exists (select 1 from public.quote_requests qr where qr.id = quote_request_id and qr.buyer_id = auth.uid())
);

drop policy if exists "quotes_related_read" on public.quotes;
create policy "quotes_related_read" on public.quotes
for select to authenticated
using (
  public.is_admin()
  or exists (
    select 1 from public.quote_requests qr
    where qr.id = quote_request_id and qr.buyer_id = auth.uid()
  )
  or exists (
    select 1 from public.supplier_profiles sp
    where sp.id = supplier_id and sp.user_id = auth.uid()
  )
);

drop policy if exists "quotes_supplier_insert" on public.quotes;
create policy "quotes_supplier_insert" on public.quotes
for insert to authenticated
with check (
  public.is_admin()
  or exists (
    select 1 from public.supplier_profiles sp
    where sp.id = supplier_id
      and sp.user_id = auth.uid()
      and sp.approval_status = 'approved'
      and sp.operational_status not in ('suspended', 'banned')
  )
);

drop policy if exists "quotes_supplier_update" on public.quotes;
create policy "quotes_supplier_update" on public.quotes
for update to authenticated
using (
  public.is_admin()
  or exists (select 1 from public.supplier_profiles sp where sp.id = supplier_id and sp.user_id = auth.uid())
)
with check (
  public.is_admin()
  or exists (select 1 from public.supplier_profiles sp where sp.id = supplier_id and sp.user_id = auth.uid())
);

drop policy if exists "deals_participants_read" on public.deals;
create policy "deals_participants_read" on public.deals
for select to authenticated
using (
  buyer_id = auth.uid()
  or public.is_admin()
  or exists (select 1 from public.supplier_profiles sp where sp.id = supplier_id and sp.user_id = auth.uid())
);

drop policy if exists "deals_participants_update" on public.deals;
create policy "deals_participants_update" on public.deals
for update to authenticated
using (
  buyer_id = auth.uid()
  or public.is_admin()
  or exists (select 1 from public.supplier_profiles sp where sp.id = supplier_id and sp.user_id = auth.uid())
)
with check (
  buyer_id = auth.uid()
  or public.is_admin()
  or exists (select 1 from public.supplier_profiles sp where sp.id = supplier_id and sp.user_id = auth.uid())
);

drop policy if exists "deal_items_participants_read" on public.deal_items;
create policy "deal_items_participants_read" on public.deal_items
for select to authenticated
using (
  exists (
    select 1 from public.deals d
    left join public.supplier_profiles sp on sp.id = d.supplier_id
    where d.id = deal_id and (d.buyer_id = auth.uid() or sp.user_id = auth.uid() or public.is_admin())
  )
);

drop policy if exists "purchase_records_buyer_admin" on public.purchase_records;
create policy "purchase_records_buyer_admin" on public.purchase_records
for all to authenticated
using (buyer_id = auth.uid() or public.is_admin())
with check (buyer_id = auth.uid() or public.is_admin());

drop policy if exists "notifications_owner_read" on public.notifications;
create policy "notifications_owner_read" on public.notifications
for select to authenticated
using (user_id = auth.uid() or public.is_admin());

drop policy if exists "notifications_owner_update" on public.notifications;
create policy "notifications_owner_update" on public.notifications
for update to authenticated
using (user_id = auth.uid() or public.is_admin())
with check (user_id = auth.uid() or public.is_admin());

drop policy if exists "notifications_admin_insert" on public.notifications;
create policy "notifications_admin_insert" on public.notifications
for insert to authenticated
with check (public.is_admin());

drop policy if exists "message_threads_participant_read" on public.message_threads;
create policy "message_threads_participant_read" on public.message_threads
for select to authenticated
using (public.is_message_thread_participant(id));

drop policy if exists "message_threads_participant_update" on public.message_threads;
create policy "message_threads_participant_update" on public.message_threads
for update to authenticated
using (public.is_message_thread_participant(id))
with check (public.is_message_thread_participant(id));

drop policy if exists "messages_participant_read" on public.messages;
create policy "messages_participant_read" on public.messages
for select to authenticated
using (public.is_message_thread_participant(thread_id));

drop policy if exists "messages_participant_insert" on public.messages;
create policy "messages_participant_insert" on public.messages
for insert to authenticated
with check (sender_id = auth.uid() and public.is_message_thread_participant(thread_id));

drop policy if exists "feedbacks_owner_or_admin_read" on public.feedbacks;
create policy "feedbacks_owner_or_admin_read" on public.feedbacks
for select to authenticated
using (user_id = auth.uid() or public.is_admin());

drop policy if exists "feedbacks_owner_insert" on public.feedbacks;
create policy "feedbacks_owner_insert" on public.feedbacks
for insert to authenticated
with check (user_id = auth.uid() or public.is_admin());

drop policy if exists "feedbacks_admin_update" on public.feedbacks;
create policy "feedbacks_admin_update" on public.feedbacks
for update to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "reports_related_read" on public.reports;
create policy "reports_related_read" on public.reports
for select to authenticated
using (reporter_id = auth.uid() or target_user_id = auth.uid() or public.is_admin());

drop policy if exists "reports_insert_reporter" on public.reports;
create policy "reports_insert_reporter" on public.reports
for insert to authenticated
with check (reporter_id = auth.uid() or public.is_admin());

drop policy if exists "reports_admin_update" on public.reports;
create policy "reports_admin_update" on public.reports
for update to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "reviews_public_and_related_read" on public.reviews;
create policy "reviews_public_and_related_read" on public.reviews
for select to authenticated
using (
  (is_public = true and status = 'active')
  or buyer_id = auth.uid()
  or public.is_admin()
  or exists (select 1 from public.supplier_profiles sp where sp.id = supplier_id and sp.user_id = auth.uid())
);

drop policy if exists "reviews_buyer_insert" on public.reviews;
create policy "reviews_buyer_insert" on public.reviews
for insert to authenticated
with check (
  buyer_id = auth.uid()
  and exists (select 1 from public.deals d where d.id = deal_id and d.buyer_id = auth.uid() and d.status in ('completed', 'closed'))
);

drop policy if exists "reviews_admin_update" on public.reviews;
create policy "reviews_admin_update" on public.reviews
for update to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "supplier_documents_related_read" on public.supplier_documents;
create policy "supplier_documents_related_read" on public.supplier_documents
for select to authenticated
using (
  uploaded_by = auth.uid()
  or public.is_admin()
  or exists (select 1 from public.supplier_profiles sp where sp.id = supplier_id and sp.user_id = auth.uid())
);

drop policy if exists "supplier_documents_owner_insert" on public.supplier_documents;
create policy "supplier_documents_owner_insert" on public.supplier_documents
for insert to authenticated
with check (
  uploaded_by = auth.uid()
  and exists (select 1 from public.supplier_profiles sp where sp.id = supplier_id and sp.user_id = auth.uid())
);

drop policy if exists "supplier_documents_admin_update" on public.supplier_documents;
create policy "supplier_documents_admin_update" on public.supplier_documents
for update to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "analysis_jobs_owner_admin" on public.analysis_jobs;
create policy "analysis_jobs_owner_admin" on public.analysis_jobs
for all to authenticated
using (buyer_id = auth.uid() or public.is_admin())
with check (buyer_id = auth.uid() or public.is_admin());

drop policy if exists "analysis_items_owner_admin" on public.analysis_items;
create policy "analysis_items_owner_admin" on public.analysis_items
for all to authenticated
using (
  exists (select 1 from public.analysis_jobs aj where aj.id = analysis_job_id and (aj.buyer_id = auth.uid() or public.is_admin()))
)
with check (
  exists (select 1 from public.analysis_jobs aj where aj.id = analysis_job_id and (aj.buyer_id = auth.uid() or public.is_admin()))
);

drop policy if exists "analysis_attachments_owner_admin" on public.analysis_attachments;
create policy "analysis_attachments_owner_admin" on public.analysis_attachments
for all to authenticated
using (uploaded_by = auth.uid() or public.is_admin())
with check (uploaded_by = auth.uid() or public.is_admin());

drop policy if exists "qa_checklists_admin_all" on public.qa_checklists;
create policy "qa_checklists_admin_all" on public.qa_checklists
for all to authenticated
using (public.is_admin())
with check (public.is_admin());


-- ============================================================
-- SOURCE: supabase\migrations\003_storage_buckets.sql
-- ============================================================

-- 싸와! Storage buckets and object RLS policies.

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  ('quote-attachments', 'quote-attachments', false, 20971520, array['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'application/pdf', 'text/csv', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']),
  ('deal-attachments', 'deal-attachments', false, 20971520, array['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'application/pdf']),
  ('supplier-documents', 'supplier-documents', false, 20971520, array['image/jpeg', 'image/png', 'image/webp', 'application/pdf']),
  ('analysis-files', 'analysis-files', false, 20971520, array['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'application/pdf', 'text/csv', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']),
  ('feedback-attachments', 'feedback-attachments', false, 10485760, array['image/jpeg', 'image/png', 'image/webp', 'application/pdf'])
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "ssawa_storage_admin_all" on storage.objects;
create policy "ssawa_storage_admin_all" on storage.objects
for all to authenticated
using (
  bucket_id in ('quote-attachments', 'deal-attachments', 'supplier-documents', 'analysis-files', 'feedback-attachments')
  and public.is_admin()
)
with check (
  bucket_id in ('quote-attachments', 'deal-attachments', 'supplier-documents', 'analysis-files', 'feedback-attachments')
  and public.is_admin()
);

drop policy if exists "ssawa_storage_owner_select" on storage.objects;
create policy "ssawa_storage_owner_select" on storage.objects
for select to authenticated
using (
  bucket_id in ('quote-attachments', 'deal-attachments', 'supplier-documents', 'analysis-files', 'feedback-attachments')
  and (storage.foldername(name))[1] = auth.uid()::text
);

drop policy if exists "ssawa_storage_owner_insert" on storage.objects;
create policy "ssawa_storage_owner_insert" on storage.objects
for insert to authenticated
with check (
  bucket_id in ('quote-attachments', 'deal-attachments', 'supplier-documents', 'analysis-files', 'feedback-attachments')
  and (storage.foldername(name))[1] = auth.uid()::text
);

drop policy if exists "ssawa_storage_owner_update" on storage.objects;
create policy "ssawa_storage_owner_update" on storage.objects
for update to authenticated
using (
  bucket_id in ('quote-attachments', 'deal-attachments', 'supplier-documents', 'analysis-files', 'feedback-attachments')
  and (storage.foldername(name))[1] = auth.uid()::text
)
with check (
  bucket_id in ('quote-attachments', 'deal-attachments', 'supplier-documents', 'analysis-files', 'feedback-attachments')
  and (storage.foldername(name))[1] = auth.uid()::text
);

drop policy if exists "ssawa_storage_owner_delete" on storage.objects;
create policy "ssawa_storage_owner_delete" on storage.objects
for delete to authenticated
using (
  bucket_id in ('quote-attachments', 'deal-attachments', 'supplier-documents', 'analysis-files', 'feedback-attachments')
  and (storage.foldername(name))[1] = auth.uid()::text
);


-- ============================================================
-- SOURCE: supabase\migrations\005_beta_operations.sql
-- ============================================================

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


-- ============================================================
-- SOURCE: supabase\migrations\006_beta_kpi_crm.sql
-- ============================================================

-- 싸와! MVP13 beta KPI/CRM schema.
-- Adds beta operation targets, participant tracking, CRM, experiments, tasks, and validation reports.

create table if not exists public.beta_targets (
  id uuid primary key default gen_random_uuid(),
  period_start date not null,
  period_end date not null,
  target_buyers integer not null default 100 check (target_buyers >= 0),
  target_suppliers integer not null default 30 check (target_suppliers >= 0),
  target_quote_requests integer not null default 50 check (target_quote_requests >= 0),
  target_quotes integer not null default 150 check (target_quotes >= 0),
  target_deals integer not null default 15 check (target_deals >= 0),
  target_completed_deals integer not null default 5 check (target_completed_deals >= 0),
  target_feedbacks integer not null default 30 check (target_feedbacks >= 0),
  target_repeat_buyers integer not null default 20 check (target_repeat_buyers >= 0),
  target_active_suppliers integer not null default 20 check (target_active_suppliers >= 0),
  notes text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.beta_participants (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete set null,
  participant_type text not null check (participant_type in ('buyer', 'supplier')),
  source text not null default 'manual' check (source in ('direct_sales', 'referral', 'community', 'partner', 'landing', 'manual', 'etc')),
  status text not null default 'invited' check (status in ('invited', 'signed_up', 'onboarded', 'active', 'inactive', 'dropped')),
  assigned_admin_id uuid references public.profiles(id) on delete set null,
  business_name text not null,
  contact_name text not null default '',
  phone text not null default '',
  email text not null default '',
  region text not null default '',
  category_interest text not null default '',
  memo text not null default '',
  quote_request_count integer not null default 0 check (quote_request_count >= 0),
  quote_selected_count integer not null default 0 check (quote_selected_count >= 0),
  deal_count integer not null default 0 check (deal_count >= 0),
  feedback_count integer not null default 0 check (feedback_count >= 0),
  tags text[] not null default '{}',
  invited_at timestamptz,
  signed_up_at timestamptz,
  onboarded_at timestamptz,
  activated_at timestamptz,
  dropped_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.sales_leads (
  id uuid primary key default gen_random_uuid(),
  lead_type text not null check (lead_type in ('buyer', 'supplier')),
  business_name text not null,
  contact_name text not null default '',
  phone text not null default '',
  email text not null default '',
  region text not null default '',
  category text not null default '',
  source text not null default 'manual' check (source in ('direct_sales', 'referral', 'community', 'partner', 'landing', 'manual', 'etc')),
  stage text not null default 'new' check (stage in ('new', 'contacted', 'interested', 'invited', 'signed_up', 'onboarded', 'active', 'rejected', 'lost')),
  priority text not null default 'normal' check (priority in ('low', 'normal', 'high', 'urgent')),
  assigned_admin_id uuid references public.profiles(id) on delete set null,
  next_action text not null default '',
  next_action_date date,
  memo text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.sales_activities (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.sales_leads(id) on delete cascade,
  activity_type text not null check (activity_type in ('call', 'sms', 'kakao', 'visit', 'email', 'meeting', 'demo', 'follow_up', 'note')),
  result text not null check (result in ('success', 'no_answer', 'interested', 'not_interested', 'need_follow_up', 'signed_up', 'rejected')),
  memo text not null default '',
  actor_id uuid references public.profiles(id) on delete set null,
  activity_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create table if not exists public.beta_experiments (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  hypothesis text not null default '',
  target_group text not null default 'both' check (target_group in ('buyers', 'suppliers', 'both')),
  start_date date,
  end_date date,
  status text not null default 'planned' check (status in ('planned', 'running', 'completed', 'stopped')),
  success_metric text not null default '',
  result_summary text not null default '',
  next_action text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.beta_feedback_insights (
  id uuid primary key default gen_random_uuid(),
  feedback_id uuid references public.feedbacks(id) on delete set null,
  category text not null default 'etc' check (category in ('ux', 'bug', 'pricing', 'supplier_quality', 'buyer_need', 'feature_request', 'onboarding', 'trust', 'etc')),
  severity text not null default 'normal' check (severity in ('low', 'normal', 'high', 'critical')),
  priority_score numeric(6, 2) not null default 0,
  impact integer not null default 3 check (impact between 1 and 5),
  frequency integer not null default 3 check (frequency between 1 and 5),
  effort integer not null default 3 check (effort between 1 and 5),
  decision text not null default 'needs_research' check (decision in ('do_now', 'do_later', 'reject', 'needs_research')),
  admin_memo text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.operator_tasks (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null default '',
  task_type text not null default 'etc' check (task_type in ('sales', 'cs', 'qa', 'supplier_onboarding', 'buyer_followup', 'bug_check', 'report', 'etc')),
  status text not null default 'todo' check (status in ('todo', 'doing', 'done', 'blocked', 'cancelled')),
  priority text not null default 'normal' check (priority in ('low', 'normal', 'high', 'urgent')),
  assigned_admin_id uuid references public.profiles(id) on delete set null,
  related_entity_type text not null default '',
  related_entity_id text,
  due_date date,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.business_validation_reports (
  id uuid primary key default gen_random_uuid(),
  period_start date not null,
  period_end date not null,
  summary text not null default '',
  buyer_findings text not null default '',
  supplier_findings text not null default '',
  kpi_findings text not null default '',
  risk_findings text not null default '',
  recommendation text not null default '',
  decision text not null default 'needs_more_data' check (decision in ('continue', 'pivot', 'pause', 'expand', 'needs_more_data')),
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists beta_participants_type_status_idx on public.beta_participants (participant_type, status);
create index if not exists beta_participants_user_idx on public.beta_participants (user_id);
create index if not exists sales_leads_stage_priority_idx on public.sales_leads (stage, priority, next_action_date);
create index if not exists sales_activities_lead_activity_idx on public.sales_activities (lead_id, activity_at desc);
create index if not exists beta_experiments_status_idx on public.beta_experiments (status, start_date);
create index if not exists beta_feedback_insights_priority_idx on public.beta_feedback_insights (priority_score desc, decision);
create index if not exists operator_tasks_status_due_idx on public.operator_tasks (status, priority, due_date);
create index if not exists business_validation_reports_period_idx on public.business_validation_reports (period_start, period_end);

drop trigger if exists set_beta_targets_updated_at on public.beta_targets;
create trigger set_beta_targets_updated_at
before update on public.beta_targets
for each row execute function public.set_updated_at();

drop trigger if exists set_beta_participants_updated_at on public.beta_participants;
create trigger set_beta_participants_updated_at
before update on public.beta_participants
for each row execute function public.set_updated_at();

drop trigger if exists set_sales_leads_updated_at on public.sales_leads;
create trigger set_sales_leads_updated_at
before update on public.sales_leads
for each row execute function public.set_updated_at();

drop trigger if exists set_beta_experiments_updated_at on public.beta_experiments;
create trigger set_beta_experiments_updated_at
before update on public.beta_experiments
for each row execute function public.set_updated_at();

drop trigger if exists set_beta_feedback_insights_updated_at on public.beta_feedback_insights;
create trigger set_beta_feedback_insights_updated_at
before update on public.beta_feedback_insights
for each row execute function public.set_updated_at();

drop trigger if exists set_operator_tasks_updated_at on public.operator_tasks;
create trigger set_operator_tasks_updated_at
before update on public.operator_tasks
for each row execute function public.set_updated_at();

drop trigger if exists set_business_validation_reports_updated_at on public.business_validation_reports;
create trigger set_business_validation_reports_updated_at
before update on public.business_validation_reports
for each row execute function public.set_updated_at();

grant select, insert, update, delete on
  public.beta_targets,
  public.beta_participants,
  public.sales_leads,
  public.sales_activities,
  public.beta_experiments,
  public.beta_feedback_insights,
  public.operator_tasks,
  public.business_validation_reports
to authenticated;

grant all privileges on
  public.beta_targets,
  public.beta_participants,
  public.sales_leads,
  public.sales_activities,
  public.beta_experiments,
  public.beta_feedback_insights,
  public.operator_tasks,
  public.business_validation_reports
to service_role;

alter table public.beta_targets enable row level security;
alter table public.beta_participants enable row level security;
alter table public.sales_leads enable row level security;
alter table public.sales_activities enable row level security;
alter table public.beta_experiments enable row level security;
alter table public.beta_feedback_insights enable row level security;
alter table public.operator_tasks enable row level security;
alter table public.business_validation_reports enable row level security;

drop policy if exists "beta_targets_admin_all" on public.beta_targets;
create policy "beta_targets_admin_all" on public.beta_targets
for all to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "beta_participants_admin_all" on public.beta_participants;
create policy "beta_participants_admin_all" on public.beta_participants
for all to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "beta_participants_self_read" on public.beta_participants;
create policy "beta_participants_self_read" on public.beta_participants
for select to authenticated
using ((select auth.uid()) = user_id);

drop policy if exists "sales_leads_admin_all" on public.sales_leads;
create policy "sales_leads_admin_all" on public.sales_leads
for all to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "sales_activities_admin_all" on public.sales_activities;
create policy "sales_activities_admin_all" on public.sales_activities
for all to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "beta_experiments_admin_all" on public.beta_experiments;
create policy "beta_experiments_admin_all" on public.beta_experiments
for all to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "beta_feedback_insights_admin_all" on public.beta_feedback_insights;
create policy "beta_feedback_insights_admin_all" on public.beta_feedback_insights
for all to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "operator_tasks_admin_all" on public.operator_tasks;
create policy "operator_tasks_admin_all" on public.operator_tasks
for all to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "business_validation_reports_admin_all" on public.business_validation_reports;
create policy "business_validation_reports_admin_all" on public.business_validation_reports
for all to authenticated
using (public.is_admin())
with check (public.is_admin());


-- ============================================================
-- SOURCE: supabase\migrations\007_product_focus_repeat_ops.sql
-- ============================================================

-- MVP 14: beta data based product focus, repeat purchase UX, and response ops.

alter table public.quote_requests
  add column if not exists ops_status text not null default 'normal'
    check (ops_status in ('normal', 'needs_supplier_match', 'waiting_quotes', 'no_quotes_risk', 'operator_assisting', 'resolved', 'failed'));

alter table public.business_validation_reports
  add column if not exists keep_features text[] not null default '{}',
  add column if not exists reduce_features text[] not null default '{}',
  add column if not exists hide_features text[] not null default '{}',
  add column if not exists strengthen_features text[] not null default '{}',
  add column if not exists focus_category text not null default '',
  add column if not exists priority_regions text[] not null default '{}',
  add column if not exists priority_buyer_segments text[] not null default '{}',
  add column if not exists next_product_priorities text[] not null default '{}',
  add column if not exists next_sales_priorities text[] not null default '{}',
  add column if not exists monetization_validation_status text not null default '',
  add column if not exists launch_blockers text[] not null default '{}';

create table if not exists public.focus_settings (
  id uuid primary key default gen_random_uuid(),
  focus_category_name text not null,
  focus_region text not null default '',
  focus_mode_enabled boolean not null default false,
  buyer_home_message text not null default '',
  supplier_home_message text not null default '',
  priority_template_names text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.feature_flags (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  name text not null,
  description text not null default '',
  enabled boolean not null default true,
  beta_label_enabled boolean not null default false,
  admin_only boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.favorite_item_groups (
  id uuid primary key default gen_random_uuid(),
  buyer_id uuid not null references public.profiles(id) on delete cascade,
  name text not null,
  category_name text not null,
  description text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.favorite_items (
  id uuid primary key default gen_random_uuid(),
  group_id uuid not null references public.favorite_item_groups(id) on delete cascade,
  item_name text not null,
  spec text not null default '',
  quantity numeric not null default 1,
  unit text not null default '개',
  memo text not null default '',
  allow_alternative boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.category_playbooks (
  id uuid primary key default gen_random_uuid(),
  category_name text not null unique,
  target_buyers text[] not null default '{}',
  supplier_types text[] not null default '{}',
  representative_items text[] not null default '{}',
  request_template text not null default '',
  supplier_sales_points text[] not null default '{}',
  buyer_message text not null default '',
  common_issues text[] not null default '{}',
  operator_response text[] not null default '{}',
  success_kpis text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.roadmap_items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null default '',
  week integer not null check (week between 1 and 4),
  priority text not null default 'normal' check (priority in ('low', 'normal', 'high', 'urgent')),
  owner_id uuid references public.profiles(id) on delete set null,
  status text not null default 'planned' check (status in ('planned', 'doing', 'done', 'blocked')),
  success_metric text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists quote_requests_ops_status_idx on public.quote_requests (ops_status, created_at);
create index if not exists focus_settings_enabled_idx on public.focus_settings (focus_mode_enabled, updated_at);
create index if not exists favorite_item_groups_buyer_idx on public.favorite_item_groups (buyer_id, category_name);
create index if not exists favorite_items_group_idx on public.favorite_items (group_id);
create index if not exists roadmap_items_week_status_idx on public.roadmap_items (week, status, priority);

drop trigger if exists set_focus_settings_updated_at on public.focus_settings;
create trigger set_focus_settings_updated_at
before update on public.focus_settings
for each row execute function public.set_updated_at();

drop trigger if exists set_feature_flags_updated_at on public.feature_flags;
create trigger set_feature_flags_updated_at
before update on public.feature_flags
for each row execute function public.set_updated_at();

drop trigger if exists set_favorite_item_groups_updated_at on public.favorite_item_groups;
create trigger set_favorite_item_groups_updated_at
before update on public.favorite_item_groups
for each row execute function public.set_updated_at();

drop trigger if exists set_favorite_items_updated_at on public.favorite_items;
create trigger set_favorite_items_updated_at
before update on public.favorite_items
for each row execute function public.set_updated_at();

drop trigger if exists set_category_playbooks_updated_at on public.category_playbooks;
create trigger set_category_playbooks_updated_at
before update on public.category_playbooks
for each row execute function public.set_updated_at();

drop trigger if exists set_roadmap_items_updated_at on public.roadmap_items;
create trigger set_roadmap_items_updated_at
before update on public.roadmap_items
for each row execute function public.set_updated_at();

grant select, insert, update, delete on table
  public.focus_settings,
  public.feature_flags,
  public.favorite_item_groups,
  public.favorite_items,
  public.category_playbooks,
  public.roadmap_items
to authenticated;

grant select, insert, update, delete on table
  public.focus_settings,
  public.feature_flags,
  public.favorite_item_groups,
  public.favorite_items,
  public.category_playbooks,
  public.roadmap_items
to service_role;

alter table public.focus_settings enable row level security;
alter table public.feature_flags enable row level security;
alter table public.favorite_item_groups enable row level security;
alter table public.favorite_items enable row level security;
alter table public.category_playbooks enable row level security;
alter table public.roadmap_items enable row level security;

drop policy if exists "focus_settings_admin_all" on public.focus_settings;
create policy "focus_settings_admin_all" on public.focus_settings
for all to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "feature_flags_admin_all" on public.feature_flags;
create policy "feature_flags_admin_all" on public.feature_flags
for all to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "feature_flags_authenticated_read" on public.feature_flags;
create policy "feature_flags_authenticated_read" on public.feature_flags
for select to authenticated
using (true);

drop policy if exists "favorite_item_groups_admin_all" on public.favorite_item_groups;
create policy "favorite_item_groups_admin_all" on public.favorite_item_groups
for all to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "favorite_item_groups_owner_all" on public.favorite_item_groups;
create policy "favorite_item_groups_owner_all" on public.favorite_item_groups
for all to authenticated
using (buyer_id = (select auth.uid()))
with check (buyer_id = (select auth.uid()));

drop policy if exists "favorite_items_admin_all" on public.favorite_items;
create policy "favorite_items_admin_all" on public.favorite_items
for all to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "favorite_items_owner_all" on public.favorite_items;
create policy "favorite_items_owner_all" on public.favorite_items
for all to authenticated
using (
  exists (
    select 1 from public.favorite_item_groups g
    where g.id = favorite_items.group_id
      and g.buyer_id = (select auth.uid())
  )
)
with check (
  exists (
    select 1 from public.favorite_item_groups g
    where g.id = favorite_items.group_id
      and g.buyer_id = (select auth.uid())
  )
);

drop policy if exists "category_playbooks_admin_all" on public.category_playbooks;
create policy "category_playbooks_admin_all" on public.category_playbooks
for all to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "category_playbooks_authenticated_read" on public.category_playbooks;
create policy "category_playbooks_authenticated_read" on public.category_playbooks
for select to authenticated
using (true);

drop policy if exists "roadmap_items_admin_all" on public.roadmap_items;
create policy "roadmap_items_admin_all" on public.roadmap_items
for all to authenticated
using (public.is_admin())
with check (public.is_admin());


-- ============================================================
-- SOURCE: supabase\migrations\008_business_auth_verification.sql
-- ============================================================

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


-- ============================================================
-- SOURCE: supabase\migrations\009_chat_inquiry_messaging.sql
-- ============================================================

-- 견적/거래 문의형 채팅 확장
-- 자유 DM이 아니라 quote_request/deal에 연결된 문의 스레드만 다루도록 기존 message_threads/messages를 보강한다.

alter table public.message_threads
  add column if not exists admin_memo text,
  add column if not exists is_admin_watching boolean not null default false;

do $$
begin
  if exists (
    select 1
    from pg_constraint
    where conrelid = 'public.message_threads'::regclass
      and conname = 'message_threads_status_check'
  ) then
    alter table public.message_threads drop constraint message_threads_status_check;
  end if;

  alter table public.message_threads
    add constraint message_threads_status_check
    check (status in ('open', 'closed', 'reported', 'blocked', 'archived'));
end;
$$;

alter table public.messages
  add column if not exists message_type text not null default 'text',
  add column if not exists is_deleted boolean not null default false,
  add column if not exists is_flagged boolean not null default false,
  add column if not exists flagged_reason text,
  add column if not exists updated_at timestamptz not null default now();

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conrelid = 'public.messages'::regclass
      and conname = 'messages_message_type_check'
  ) then
    alter table public.messages
      add constraint messages_message_type_check
      check (message_type in ('text', 'template', 'image', 'file', 'system', 'quote_condition', 'deal_update'));
  end if;
end;
$$;

create index if not exists message_threads_status_last_idx on public.message_threads (status, last_message_at desc);
create index if not exists messages_flagged_thread_idx on public.messages (thread_id, is_flagged, created_at desc);

create table if not exists public.message_read_states (
  id uuid primary key default gen_random_uuid(),
  thread_id uuid not null references public.message_threads(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  last_read_message_id uuid references public.messages(id) on delete set null,
  last_read_at timestamptz not null default now(),
  unread_count integer not null default 0 check (unread_count >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (thread_id, user_id)
);

create table if not exists public.message_reports (
  id uuid primary key default gen_random_uuid(),
  thread_id uuid not null references public.message_threads(id) on delete cascade,
  message_id uuid references public.messages(id) on delete set null,
  reported_by uuid references public.profiles(id) on delete set null,
  reason text not null,
  detail text,
  status text not null default 'pending' check (status in ('pending', 'reviewed', 'resolved', 'dismissed')),
  admin_memo text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.message_templates (
  id uuid primary key default gen_random_uuid(),
  template_for text not null check (template_for in ('buyer', 'supplier', 'both', 'admin')),
  context text not null check (context in ('quote', 'deal', 'delivery', 'tax_invoice', 'payment', 'item_check', 'etc')),
  label text not null,
  body text not null,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

insert into public.message_templates (template_for, context, label, body, sort_order)
values
  ('buyer', 'quote', '배송비', '배송비 포함인가요?', 10),
  ('buyer', 'tax_invoice', '세금계산서', '세금계산서 발행 가능한가요?', 20),
  ('buyer', 'payment', '카드결제', '카드결제 가능한가요?', 30),
  ('buyer', 'delivery', '납품일', '내일까지 납품 가능한가요?', 40),
  ('supplier', 'item_check', '규격 확인', '정확한 규격 확인이 필요합니다.', 10),
  ('supplier', 'quote', '대체품', '해당 품목은 대체품으로 견적 가능합니다.', 20),
  ('supplier', 'delivery', '납품 준비', '납품 준비 중입니다.', 30),
  ('supplier', 'delivery', '배송 출발', '배송 출발했습니다.', 40),
  ('admin', 'etc', '확인 중', '대화 내용을 확인 중입니다.', 10),
  ('admin', 'etc', '외부거래 경고', '외부거래 유도는 이용 제한 사유가 될 수 있습니다.', 20)
on conflict do nothing;

alter table public.message_read_states enable row level security;
alter table public.message_reports enable row level security;
alter table public.message_templates enable row level security;

grant select, insert, update, delete on
  public.message_read_states,
  public.message_reports,
  public.message_templates
to authenticated;
grant all privileges on
  public.message_read_states,
  public.message_reports,
  public.message_templates
to service_role;

drop policy if exists "message_read_states_participant" on public.message_read_states;
create policy "message_read_states_participant" on public.message_read_states
for all to authenticated
using (user_id = auth.uid() or public.is_admin() or public.is_message_thread_participant(thread_id))
with check (user_id = auth.uid() or public.is_admin() or public.is_message_thread_participant(thread_id));

drop policy if exists "message_reports_participant_insert" on public.message_reports;
create policy "message_reports_participant_insert" on public.message_reports
for insert to authenticated
with check (reported_by = auth.uid() and public.is_message_thread_participant(thread_id));

drop policy if exists "message_reports_related_read" on public.message_reports;
create policy "message_reports_related_read" on public.message_reports
for select to authenticated
using (public.is_admin() or public.is_message_thread_participant(thread_id));

drop policy if exists "message_reports_admin_update" on public.message_reports;
create policy "message_reports_admin_update" on public.message_reports
for update to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "message_templates_read_active" on public.message_templates;
create policy "message_templates_read_active" on public.message_templates
for select to authenticated
using (is_active = true or public.is_admin());

drop policy if exists "message_templates_admin_write" on public.message_templates;
create policy "message_templates_admin_write" on public.message_templates
for all to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "messages_participant_insert" on public.messages;
create policy "messages_participant_insert" on public.messages
for insert to authenticated
with check (
  sender_id = auth.uid()
  and public.is_message_thread_participant(thread_id)
  and exists (
    select 1
    from public.message_threads mt
    where mt.id = thread_id
      and mt.status not in ('closed', 'blocked', 'archived')
  )
);


-- ============================================================
-- SOURCE: supabase\migrations\010_supplier_product_catalog.sql
-- ============================================================

-- 싸와! supplier product catalog and mini storefront.

create table if not exists public.product_categories (
  id uuid primary key default gen_random_uuid(),
  parent_id uuid references public.product_categories(id) on delete set null,
  name text not null,
  slug text not null,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (slug)
);

create index if not exists product_categories_active_sort_idx on public.product_categories (is_active, sort_order);

create table if not exists public.supplier_store_profiles (
  id uuid primary key default gen_random_uuid(),
  supplier_id uuid not null references public.supplier_profiles(id) on delete cascade,
  store_name text not null,
  store_description text not null default '',
  store_logo_url text not null default '',
  store_banner_url text not null default '',
  main_categories text[] not null default '{}',
  delivery_regions text[] not null default '{}',
  business_hours_text text not null default '',
  contact_policy_text text not null default '',
  return_policy_text text not null default '',
  is_public boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (supplier_id)
);

create index if not exists supplier_store_profiles_supplier_idx on public.supplier_store_profiles (supplier_id, is_public);

create table if not exists public.supplier_products (
  id uuid primary key default gen_random_uuid(),
  supplier_id uuid not null references public.supplier_profiles(id) on delete cascade,
  category_id uuid references public.product_categories(id) on delete set null,
  title text not null,
  short_description text not null default '',
  description text not null default '',
  main_image_url text not null default '',
  image_urls text[] not null default '{}',
  sku text not null default '',
  brand text not null default '',
  origin text not null default '',
  unit_label text not null default '개',
  package_unit text not null default '',
  min_order_quantity numeric(12, 3) not null default 1 check (min_order_quantity > 0),
  price_type text not null default 'quote_only' check (price_type in ('fixed', 'from_price', 'quote_only')),
  price integer not null default 0 check (price >= 0),
  from_price integer not null default 0 check (from_price >= 0),
  vat_included boolean not null default true,
  delivery_fee_type text not null default 'quote' check (delivery_fee_type in ('included', 'separate', 'conditional', 'quote')),
  delivery_fee_amount integer not null default 0 check (delivery_fee_amount >= 0),
  available_regions text[] not null default '{}',
  tax_invoice_available boolean not null default false,
  card_payment_available boolean not null default false,
  safe_trade_available boolean not null default true,
  stock_status text not null default 'unknown' check (stock_status in ('in_stock', 'low_stock', 'out_of_stock', 'made_to_order', 'unknown')),
  lead_time_text text not null default '',
  is_featured boolean not null default false,
  is_public boolean not null default false,
  approval_status text not null default 'draft' check (approval_status in ('draft', 'pending', 'approved', 'rejected', 'hidden', 'suspended')),
  rejection_reason text not null default '',
  view_count integer not null default 0 check (view_count >= 0),
  inquiry_count integer not null default 0 check (inquiry_count >= 0),
  quote_add_count integer not null default 0 check (quote_add_count >= 0),
  order_request_count integer not null default 0 check (order_request_count >= 0),
  favorite_count integer not null default 0 check (favorite_count >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create index if not exists supplier_products_public_idx on public.supplier_products (approval_status, is_public, deleted_at, updated_at desc);
create index if not exists supplier_products_supplier_idx on public.supplier_products (supplier_id, approval_status, updated_at desc);
create index if not exists supplier_products_category_idx on public.supplier_products (category_id, approval_status);
create index if not exists supplier_products_regions_gin_idx on public.supplier_products using gin (available_regions);

create table if not exists public.product_inquiries (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.supplier_products(id) on delete cascade,
  buyer_id uuid not null references public.profiles(id) on delete cascade,
  supplier_id uuid not null references public.supplier_profiles(id) on delete cascade,
  inquiry_type text not null default 'question' check (inquiry_type in ('question', 'quote_request', 'order_request')),
  message text not null default '',
  quantity numeric(12, 3) not null default 1 check (quantity > 0),
  desired_delivery_date date,
  delivery_region text not null default '',
  status text not null default 'pending' check (status in ('pending', 'answered', 'converted_to_quote', 'converted_to_deal', 'closed')),
  thread_id uuid references public.message_threads(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists product_inquiries_product_idx on public.product_inquiries (product_id, created_at desc);
create index if not exists product_inquiries_supplier_idx on public.product_inquiries (supplier_id, status, created_at desc);
create index if not exists product_inquiries_buyer_idx on public.product_inquiries (buyer_id, created_at desc);

create table if not exists public.product_order_requests (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.supplier_products(id) on delete cascade,
  buyer_id uuid not null references public.profiles(id) on delete cascade,
  supplier_id uuid not null references public.supplier_profiles(id) on delete cascade,
  quantity numeric(12, 3) not null default 1 check (quantity > 0),
  unit_label text not null default '개',
  desired_delivery_date date,
  delivery_region text not null default '',
  buyer_memo text not null default '',
  supplier_response text not null default '',
  final_price integer not null default 0 check (final_price >= 0),
  status text not null default 'pending' check (status in ('pending', 'supplier_confirming', 'confirmed', 'converted_to_deal', 'rejected', 'cancelled')),
  deal_id uuid references public.deals(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists product_order_requests_product_idx on public.product_order_requests (product_id, created_at desc);
create index if not exists product_order_requests_supplier_idx on public.product_order_requests (supplier_id, status, created_at desc);
create index if not exists product_order_requests_buyer_idx on public.product_order_requests (buyer_id, status, created_at desc);

create table if not exists public.product_favorites (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.supplier_products(id) on delete cascade,
  buyer_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (product_id, buyer_id)
);

create index if not exists product_favorites_buyer_idx on public.product_favorites (buyer_id, created_at desc);

create table if not exists public.product_quote_items (
  id uuid primary key default gen_random_uuid(),
  quote_request_id uuid not null references public.quote_requests(id) on delete cascade,
  product_id uuid not null references public.supplier_products(id) on delete cascade,
  supplier_id uuid not null references public.supplier_profiles(id) on delete cascade,
  quantity numeric(12, 3) not null default 1 check (quantity > 0),
  unit_label text not null default '개',
  memo text not null default '',
  created_at timestamptz not null default now()
);

create index if not exists product_quote_items_request_idx on public.product_quote_items (quote_request_id);
create index if not exists product_quote_items_product_idx on public.product_quote_items (product_id);

create table if not exists public.product_reports (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.supplier_products(id) on delete cascade,
  reporter_id uuid not null references public.profiles(id) on delete cascade,
  reason text not null check (reason in ('wrong_info', 'prohibited_item', 'fake_price', 'offensive', 'external_trade', 'etc')),
  detail text not null default '',
  status text not null default 'pending' check (status in ('pending', 'reviewing', 'resolved', 'dismissed')),
  admin_memo text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists product_reports_status_idx on public.product_reports (status, created_at desc);
create index if not exists product_reports_product_idx on public.product_reports (product_id, created_at desc);

drop trigger if exists set_product_categories_updated_at on public.product_categories;
create trigger set_product_categories_updated_at before update on public.product_categories for each row execute function public.set_updated_at();

drop trigger if exists set_supplier_store_profiles_updated_at on public.supplier_store_profiles;
create trigger set_supplier_store_profiles_updated_at before update on public.supplier_store_profiles for each row execute function public.set_updated_at();

drop trigger if exists set_supplier_products_updated_at on public.supplier_products;
create trigger set_supplier_products_updated_at before update on public.supplier_products for each row execute function public.set_updated_at();

drop trigger if exists set_product_inquiries_updated_at on public.product_inquiries;
create trigger set_product_inquiries_updated_at before update on public.product_inquiries for each row execute function public.set_updated_at();

drop trigger if exists set_product_order_requests_updated_at on public.product_order_requests;
create trigger set_product_order_requests_updated_at before update on public.product_order_requests for each row execute function public.set_updated_at();

drop trigger if exists set_product_reports_updated_at on public.product_reports;
create trigger set_product_reports_updated_at before update on public.product_reports for each row execute function public.set_updated_at();

grant select on public.product_categories to anon, authenticated;
grant select on public.supplier_store_profiles, public.supplier_products to anon, authenticated;
grant select, insert, update, delete on
  public.product_categories,
  public.supplier_store_profiles,
  public.supplier_products,
  public.product_inquiries,
  public.product_order_requests,
  public.product_favorites,
  public.product_quote_items,
  public.product_reports
to authenticated;
grant all privileges on
  public.product_categories,
  public.supplier_store_profiles,
  public.supplier_products,
  public.product_inquiries,
  public.product_order_requests,
  public.product_favorites,
  public.product_quote_items,
  public.product_reports
to service_role;

alter table public.product_categories enable row level security;
alter table public.supplier_store_profiles enable row level security;
alter table public.supplier_products enable row level security;
alter table public.product_inquiries enable row level security;
alter table public.product_order_requests enable row level security;
alter table public.product_favorites enable row level security;
alter table public.product_quote_items enable row level security;
alter table public.product_reports enable row level security;

drop policy if exists "product_categories_public_read" on public.product_categories;
create policy "product_categories_public_read" on public.product_categories
for select to anon, authenticated
using (is_active = true);

drop policy if exists "product_categories_admin_all" on public.product_categories;
create policy "product_categories_admin_all" on public.product_categories
for all to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "supplier_store_profiles_public_read" on public.supplier_store_profiles;
create policy "supplier_store_profiles_public_read" on public.supplier_store_profiles
for select to anon, authenticated
using (
  is_public = true
  and exists (
    select 1 from public.supplier_profiles sp
    where sp.id = supplier_id
      and sp.approval_status = 'approved'
      and sp.operational_status not in ('suspended', 'banned')
  )
);

drop policy if exists "supplier_store_profiles_owner_read" on public.supplier_store_profiles;
create policy "supplier_store_profiles_owner_read" on public.supplier_store_profiles
for select to authenticated
using (
  public.is_admin()
  or exists (select 1 from public.supplier_profiles sp where sp.id = supplier_id and sp.user_id = auth.uid())
);

drop policy if exists "supplier_store_profiles_owner_write" on public.supplier_store_profiles;
create policy "supplier_store_profiles_owner_write" on public.supplier_store_profiles
for all to authenticated
using (
  public.is_admin()
  or exists (select 1 from public.supplier_profiles sp where sp.id = supplier_id and sp.user_id = auth.uid())
)
with check (
  public.is_admin()
  or exists (select 1 from public.supplier_profiles sp where sp.id = supplier_id and sp.user_id = auth.uid())
);

drop policy if exists "supplier_products_public_read" on public.supplier_products;
create policy "supplier_products_public_read" on public.supplier_products
for select to anon, authenticated
using (
  deleted_at is null
  and is_public = true
  and approval_status = 'approved'
  and exists (
    select 1 from public.supplier_profiles sp
    where sp.id = supplier_id
      and sp.approval_status = 'approved'
      and sp.operational_status not in ('suspended', 'banned')
  )
);

drop policy if exists "supplier_products_owner_read" on public.supplier_products;
create policy "supplier_products_owner_read" on public.supplier_products
for select to authenticated
using (
  public.is_admin()
  or exists (select 1 from public.supplier_profiles sp where sp.id = supplier_id and sp.user_id = auth.uid())
);

drop policy if exists "supplier_products_owner_write" on public.supplier_products;
create policy "supplier_products_owner_write" on public.supplier_products
for all to authenticated
using (
  public.is_admin()
  or exists (select 1 from public.supplier_profiles sp where sp.id = supplier_id and sp.user_id = auth.uid())
)
with check (
  public.is_admin()
  or exists (select 1 from public.supplier_profiles sp where sp.id = supplier_id and sp.user_id = auth.uid())
);

drop policy if exists "product_inquiries_related_read" on public.product_inquiries;
create policy "product_inquiries_related_read" on public.product_inquiries
for select to authenticated
using (
  buyer_id = auth.uid()
  or public.is_admin()
  or exists (select 1 from public.supplier_profiles sp where sp.id = supplier_id and sp.user_id = auth.uid())
);

drop policy if exists "product_inquiries_buyer_insert" on public.product_inquiries;
create policy "product_inquiries_buyer_insert" on public.product_inquiries
for insert to authenticated
with check (
  buyer_id = auth.uid()
  and exists (
    select 1 from public.supplier_products p
    where p.id = product_id
      and p.supplier_id = supplier_id
      and p.deleted_at is null
      and p.is_public = true
      and p.approval_status = 'approved'
  )
);

drop policy if exists "product_inquiries_related_update" on public.product_inquiries;
create policy "product_inquiries_related_update" on public.product_inquiries
for update to authenticated
using (
  public.is_admin()
  or exists (select 1 from public.supplier_profiles sp where sp.id = supplier_id and sp.user_id = auth.uid())
)
with check (
  public.is_admin()
  or exists (select 1 from public.supplier_profiles sp where sp.id = supplier_id and sp.user_id = auth.uid())
);

drop policy if exists "product_order_requests_related_read" on public.product_order_requests;
create policy "product_order_requests_related_read" on public.product_order_requests
for select to authenticated
using (
  buyer_id = auth.uid()
  or public.is_admin()
  or exists (select 1 from public.supplier_profiles sp where sp.id = supplier_id and sp.user_id = auth.uid())
);

drop policy if exists "product_order_requests_buyer_insert" on public.product_order_requests;
create policy "product_order_requests_buyer_insert" on public.product_order_requests
for insert to authenticated
with check (
  buyer_id = auth.uid()
  and exists (
    select 1 from public.supplier_products p
    where p.id = product_id
      and p.supplier_id = supplier_id
      and p.deleted_at is null
      and p.is_public = true
      and p.approval_status = 'approved'
  )
);

drop policy if exists "product_order_requests_related_update" on public.product_order_requests;
create policy "product_order_requests_related_update" on public.product_order_requests
for update to authenticated
using (
  buyer_id = auth.uid()
  or public.is_admin()
  or exists (select 1 from public.supplier_profiles sp where sp.id = supplier_id and sp.user_id = auth.uid())
)
with check (
  buyer_id = auth.uid()
  or public.is_admin()
  or exists (select 1 from public.supplier_profiles sp where sp.id = supplier_id and sp.user_id = auth.uid())
);

drop policy if exists "product_favorites_owner_read" on public.product_favorites;
create policy "product_favorites_owner_read" on public.product_favorites
for select to authenticated
using (buyer_id = auth.uid() or public.is_admin());

drop policy if exists "product_favorites_owner_insert" on public.product_favorites;
create policy "product_favorites_owner_insert" on public.product_favorites
for insert to authenticated
with check (
  buyer_id = auth.uid()
  and exists (
    select 1 from public.supplier_products p
    where p.id = product_id
      and p.deleted_at is null
      and p.is_public = true
      and p.approval_status = 'approved'
  )
);

drop policy if exists "product_favorites_owner_delete" on public.product_favorites;
create policy "product_favorites_owner_delete" on public.product_favorites
for delete to authenticated
using (buyer_id = auth.uid() or public.is_admin());

drop policy if exists "product_quote_items_related_read" on public.product_quote_items;
create policy "product_quote_items_related_read" on public.product_quote_items
for select to authenticated
using (
  public.is_admin()
  or exists (select 1 from public.quote_requests qr where qr.id = quote_request_id and qr.buyer_id = auth.uid())
  or exists (select 1 from public.supplier_profiles sp where sp.id = supplier_id and sp.user_id = auth.uid())
);

drop policy if exists "product_quote_items_buyer_insert" on public.product_quote_items;
create policy "product_quote_items_buyer_insert" on public.product_quote_items
for insert to authenticated
with check (
  exists (select 1 from public.quote_requests qr where qr.id = quote_request_id and qr.buyer_id = auth.uid())
  and exists (
    select 1 from public.supplier_products p
    where p.id = product_id
      and p.supplier_id = supplier_id
      and p.deleted_at is null
      and p.is_public = true
      and p.approval_status = 'approved'
  )
);

drop policy if exists "product_quote_items_admin_delete" on public.product_quote_items;
create policy "product_quote_items_admin_delete" on public.product_quote_items
for delete to authenticated
using (public.is_admin());

drop policy if exists "product_reports_related_read" on public.product_reports;
create policy "product_reports_related_read" on public.product_reports
for select to authenticated
using (
  reporter_id = auth.uid()
  or public.is_admin()
  or exists (
    select 1
    from public.supplier_products p
    join public.supplier_profiles sp on sp.id = p.supplier_id
    where p.id = product_id and sp.user_id = auth.uid()
  )
);

drop policy if exists "product_reports_reporter_insert" on public.product_reports;
create policy "product_reports_reporter_insert" on public.product_reports
for insert to authenticated
with check (reporter_id = auth.uid());

drop policy if exists "product_reports_admin_update" on public.product_reports;
create policy "product_reports_admin_update" on public.product_reports
for update to authenticated
using (public.is_admin())
with check (public.is_admin());

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('product-images', 'product-images', true, 10485760, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "ssawa_storage_admin_all" on storage.objects;
create policy "ssawa_storage_admin_all" on storage.objects
for all to authenticated
using (
  bucket_id in ('quote-attachments', 'deal-attachments', 'supplier-documents', 'analysis-files', 'feedback-attachments', 'product-images')
  and public.is_admin()
)
with check (
  bucket_id in ('quote-attachments', 'deal-attachments', 'supplier-documents', 'analysis-files', 'feedback-attachments', 'product-images')
  and public.is_admin()
);

drop policy if exists "ssawa_storage_owner_select" on storage.objects;
create policy "ssawa_storage_owner_select" on storage.objects
for select to authenticated
using (
  bucket_id in ('quote-attachments', 'deal-attachments', 'supplier-documents', 'analysis-files', 'feedback-attachments', 'product-images')
  and (storage.foldername(name))[1] = auth.uid()::text
);

drop policy if exists "ssawa_storage_owner_insert" on storage.objects;
create policy "ssawa_storage_owner_insert" on storage.objects
for insert to authenticated
with check (
  bucket_id in ('quote-attachments', 'deal-attachments', 'supplier-documents', 'analysis-files', 'feedback-attachments', 'product-images')
  and (storage.foldername(name))[1] = auth.uid()::text
);

drop policy if exists "ssawa_storage_owner_update" on storage.objects;
create policy "ssawa_storage_owner_update" on storage.objects
for update to authenticated
using (
  bucket_id in ('quote-attachments', 'deal-attachments', 'supplier-documents', 'analysis-files', 'feedback-attachments', 'product-images')
  and (storage.foldername(name))[1] = auth.uid()::text
)
with check (
  bucket_id in ('quote-attachments', 'deal-attachments', 'supplier-documents', 'analysis-files', 'feedback-attachments', 'product-images')
  and (storage.foldername(name))[1] = auth.uid()::text
);

drop policy if exists "ssawa_storage_owner_delete" on storage.objects;
create policy "ssawa_storage_owner_delete" on storage.objects
for delete to authenticated
using (
  bucket_id in ('quote-attachments', 'deal-attachments', 'supplier-documents', 'analysis-files', 'feedback-attachments', 'product-images')
  and (storage.foldername(name))[1] = auth.uid()::text
);

