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
