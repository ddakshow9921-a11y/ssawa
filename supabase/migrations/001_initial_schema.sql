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
