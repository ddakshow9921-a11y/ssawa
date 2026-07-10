-- RUN NOW: fix supplier quote submit/update permission with a checked RPC.
-- Supabase SQL Editor > paste all > Run.

create extension if not exists pgcrypto;

alter table if exists public.profiles
  add column if not exists email text;

alter table if exists public.supplier_profiles
  add column if not exists email text;

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

grant usage on schema public to authenticated, service_role;
grant select, insert, update, delete on public.quotes to authenticated;
grant all privileges on public.quotes to service_role;
grant usage, select on all sequences in schema public to authenticated, service_role;

alter table public.quotes enable row level security;

create or replace function public.submit_supplier_quote(
  p_quote_id uuid,
  p_quote_request_id uuid,
  p_supplier_id uuid,
  p_total_amount integer,
  p_delivery_fee integer,
  p_available_delivery_date date,
  p_tax_invoice_available boolean,
  p_card_payment_available boolean,
  p_alternative_proposal text,
  p_item_price_memo text,
  p_memo text,
  p_valid_until date
)
returns public.quotes
language plpgsql
security definer
set search_path = public
as $$
declare
  v_quote public.quotes;
  v_supplier public.supplier_profiles;
  v_profile public.profiles;
begin
  if auth.uid() is null then
    raise exception 'login required' using errcode = '42501';
  end if;

  select *
    into v_profile
  from public.profiles
  where id = auth.uid()
  limit 1;

  select *
    into v_supplier
  from public.supplier_profiles
  where id = p_supplier_id
    and (
      user_id = auth.uid()
      or (
        v_profile.id is not null
        and regexp_replace(coalesce(business_number, ''), '\D', '', 'g')
          = regexp_replace(coalesce(v_profile.business_number, ''), '\D', '', 'g')
      )
    )
  limit 1;

  if v_supplier.id is null then
    select *
      into v_supplier
    from public.supplier_profiles
    where user_id = auth.uid()
      or (
        v_profile.id is not null
        and regexp_replace(coalesce(business_number, ''), '\D', '', 'g')
          = regexp_replace(coalesce(v_profile.business_number, ''), '\D', '', 'g')
      )
    order by
      case when user_id = auth.uid() then 0 else 1 end,
      created_at desc
    limit 1;
  end if;

  if v_supplier.id is not null and v_supplier.user_id is distinct from auth.uid() then
    update public.supplier_profiles
    set user_id = auth.uid(),
        updated_at = now()
    where id = v_supplier.id;
    v_supplier.user_id := auth.uid();
  end if;

  if v_supplier.id is null then
    raise exception '현재 로그인 계정과 연결된 공급업체 정보를 찾을 수 없습니다. 업체 프로필의 사업자등록번호 또는 계정 연결 상태를 확인해 주세요.';
  end if;

  if coalesce(v_profile.role, '') <> 'supplier' then
    raise exception '현재 계정이 공급업체 권한이 아닙니다. 공급업체 계정으로 로그인해 주세요.';
  end if;

  if not exists (
    select 1
    from public.quote_requests qr
    where qr.id = p_quote_request_id
  ) then
    raise exception '견적요청을 찾을 수 없습니다. 새로고침 후 다시 시도해 주세요.';
  end if;

  p_supplier_id := v_supplier.id;

  insert into public.quotes (
    id,
    quote_request_id,
    supplier_id,
    total_amount,
    delivery_fee,
    final_amount,
    available_delivery_date,
    tax_invoice_available,
    card_payment_available,
    alternative_proposal,
    item_price_memo,
    memo,
    valid_until,
    status,
    is_demo,
    updated_at
  )
  values (
    coalesce(p_quote_id, gen_random_uuid()),
    p_quote_request_id,
    p_supplier_id,
    greatest(coalesce(p_total_amount, 0), 0),
    greatest(coalesce(p_delivery_fee, 0), 0),
    greatest(coalesce(p_total_amount, 0), 0) + greatest(coalesce(p_delivery_fee, 0), 0),
    p_available_delivery_date,
    coalesce(p_tax_invoice_available, false),
    coalesce(p_card_payment_available, false),
    nullif(p_alternative_proposal, ''),
    nullif(p_item_price_memo, ''),
    nullif(p_memo, ''),
    p_valid_until,
    'submitted',
    false,
    now()
  )
  on conflict (quote_request_id, supplier_id)
  do update set
    total_amount = excluded.total_amount,
    delivery_fee = excluded.delivery_fee,
    final_amount = excluded.final_amount,
    available_delivery_date = excluded.available_delivery_date,
    tax_invoice_available = excluded.tax_invoice_available,
    card_payment_available = excluded.card_payment_available,
    alternative_proposal = excluded.alternative_proposal,
    item_price_memo = excluded.item_price_memo,
    memo = excluded.memo,
    valid_until = excluded.valid_until,
    updated_at = now()
  returning * into v_quote;

  update public.quote_requests
  set status = case when status = 'open' then 'quoted' else status end,
      updated_at = now()
  where id = p_quote_request_id;

  return v_quote;
end;
$$;

revoke all on function public.submit_supplier_quote(
  uuid, uuid, uuid, integer, integer, date, boolean, boolean, text, text, text, date
) from public;

grant execute on function public.submit_supplier_quote(
  uuid, uuid, uuid, integer, integer, date, boolean, boolean, text, text, text, date
) to authenticated;

drop policy if exists "quotes_related_read" on public.quotes;
create policy "quotes_related_read" on public.quotes
for select to authenticated
using (
  exists (
    select 1 from public.quote_requests qr
    where qr.id = quote_request_id and qr.buyer_id = auth.uid()
  )
  or exists (
    select 1 from public.supplier_profiles sp
    where sp.id = supplier_id and sp.user_id = auth.uid()
  )
  or exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  )
);

select pg_notify('pgrst', 'reload schema');

select 'quote submit rpc ready' as status;
