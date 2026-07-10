-- Apply this to the Supabase project used by ssawa.co.kr.
-- It enables supplier replies to buyer reviews through the Data API.

create table if not exists public.review_replies (
  id uuid primary key default gen_random_uuid(),
  review_id uuid not null references public.reviews(id) on delete cascade,
  supplier_id uuid not null references public.supplier_profiles(id) on delete cascade,
  content text not null,
  status text not null default 'active' check (status in ('active', 'hidden', 'reported', 'deleted')),
  is_demo boolean not null default false,
  created_by_seed boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (review_id, supplier_id)
);

create index if not exists review_replies_review_idx on public.review_replies (review_id, created_at desc);
create index if not exists review_replies_supplier_idx on public.review_replies (supplier_id, created_at desc);

drop trigger if exists set_review_replies_updated_at on public.review_replies;
create trigger set_review_replies_updated_at
before update on public.review_replies
for each row execute function public.set_updated_at();

grant select, insert, update, delete on public.review_replies to authenticated;
grant all privileges on public.review_replies to service_role;

alter table public.review_replies enable row level security;

drop policy if exists "review_replies_related_read" on public.review_replies;
create policy "review_replies_related_read" on public.review_replies
for select to authenticated
using (
  exists (
    select 1
    from public.reviews r
    left join public.supplier_profiles sp on sp.id = r.supplier_id
    where r.id = review_id
      and (
        r.buyer_id = auth.uid()
        or sp.user_id = auth.uid()
        or public.is_admin()
      )
  )
);

drop policy if exists "review_replies_supplier_insert" on public.review_replies;
create policy "review_replies_supplier_insert" on public.review_replies
for insert to authenticated
with check (
  exists (
    select 1
    from public.reviews r
    join public.supplier_profiles sp on sp.id = r.supplier_id
    where r.id = review_id
      and r.supplier_id = supplier_id
      and sp.user_id = auth.uid()
      and r.status = 'active'
  )
);

drop policy if exists "review_replies_supplier_update" on public.review_replies;
create policy "review_replies_supplier_update" on public.review_replies
for update to authenticated
using (
  exists (
    select 1
    from public.supplier_profiles sp
    where sp.id = supplier_id
      and sp.user_id = auth.uid()
  )
)
with check (
  exists (
    select 1
    from public.supplier_profiles sp
    where sp.id = supplier_id
      and sp.user_id = auth.uid()
  )
);

drop policy if exists "review_replies_admin_update" on public.review_replies;
create policy "review_replies_admin_update" on public.review_replies
for update to authenticated
using (public.is_admin())
with check (public.is_admin());
