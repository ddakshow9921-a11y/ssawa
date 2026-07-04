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
