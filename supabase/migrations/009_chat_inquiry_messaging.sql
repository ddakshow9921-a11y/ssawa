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
