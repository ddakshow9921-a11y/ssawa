-- RUN NOW: create missing public.quotes table for Ssawa quote sync.
-- Supabase SQL Editor > paste all > Run.

create extension if not exists pgcrypto;

alter table public.quote_requests
  add column if not exists selected_quote_id uuid,
  add column if not exists is_demo boolean not null default false,
  add column if not exists updated_at timestamptz not null default now();

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
  valid_until date,
  status text not null default 'submitted'
    check (status in ('submitted', 'selected', 'rejected', 'expired', 'cancelled')),
  is_demo boolean not null default false,
  created_by_seed boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint quotes_quote_request_supplier_unique unique (quote_request_id, supplier_id)
);

create index if not exists quotes_request_status_idx on public.quotes (quote_request_id, status);
create index if not exists quotes_supplier_status_idx on public.quotes (supplier_id, status, created_at desc);

grant usage on schema public to anon, authenticated, service_role;
grant select, insert, update, delete on public.quotes to authenticated;
grant all privileges on public.quotes to service_role;
grant usage, select on all sequences in schema public to authenticated, service_role;

alter table public.quotes enable row level security;

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
    where sp.id = supplier_id and sp.user_id = auth.uid()
  )
);

drop policy if exists "quotes_supplier_update" on public.quotes;
create policy "quotes_supplier_update" on public.quotes
for update to authenticated
using (
  public.is_admin()
  or exists (
    select 1 from public.supplier_profiles sp
    where sp.id = supplier_id and sp.user_id = auth.uid()
  )
)
with check (
  public.is_admin()
  or exists (
    select 1 from public.supplier_profiles sp
    where sp.id = supplier_id and sp.user_id = auth.uid()
  )
);

create or replace function public.mark_quote_request_quoted()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.quote_requests
  set status = case when status = 'open' then 'quoted' else status end,
      updated_at = now()
  where id = new.quote_request_id;
  return new;
end;
$$;

drop trigger if exists trg_mark_quote_request_quoted on public.quotes;
create trigger trg_mark_quote_request_quoted
after insert on public.quotes
for each row execute function public.mark_quote_request_quoted();

select pg_notify('pgrst', 'reload schema');

select
  'quotes table ready' as status,
  to_regclass('public.quotes') as table_name;
