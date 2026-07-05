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
