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
