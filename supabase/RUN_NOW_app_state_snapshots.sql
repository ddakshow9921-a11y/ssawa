-- Cross-device app state sync for Ssawa.
-- Keeps non-auth local app data consistent between PC and mobile for the same account.

create table if not exists public.app_state_snapshots (
  user_id uuid primary key references auth.users(id) on delete cascade,
  payload jsonb not null default '{}'::jsonb,
  client_id text,
  client_updated_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists set_app_state_snapshots_updated_at on public.app_state_snapshots;
create trigger set_app_state_snapshots_updated_at
before update on public.app_state_snapshots
for each row execute function public.set_updated_at();

grant select, insert, update, delete on public.app_state_snapshots to authenticated;
grant all privileges on public.app_state_snapshots to service_role;

alter table public.app_state_snapshots enable row level security;

drop policy if exists "app_state_snapshots_own_select" on public.app_state_snapshots;
create policy "app_state_snapshots_own_select" on public.app_state_snapshots
for select to authenticated
using (user_id = (select auth.uid()) or public.is_admin());

drop policy if exists "app_state_snapshots_own_insert" on public.app_state_snapshots;
create policy "app_state_snapshots_own_insert" on public.app_state_snapshots
for insert to authenticated
with check (user_id = (select auth.uid()) or public.is_admin());

drop policy if exists "app_state_snapshots_own_update" on public.app_state_snapshots;
create policy "app_state_snapshots_own_update" on public.app_state_snapshots
for update to authenticated
using (user_id = (select auth.uid()) or public.is_admin())
with check (user_id = (select auth.uid()) or public.is_admin());
