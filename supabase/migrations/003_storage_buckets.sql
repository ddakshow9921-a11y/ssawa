-- 싸와! Storage buckets and object RLS policies.

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  ('quote-attachments', 'quote-attachments', false, 20971520, array['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'application/pdf', 'text/csv', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']),
  ('deal-attachments', 'deal-attachments', false, 20971520, array['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'application/pdf']),
  ('supplier-documents', 'supplier-documents', false, 20971520, array['image/jpeg', 'image/png', 'image/webp', 'application/pdf']),
  ('analysis-files', 'analysis-files', false, 20971520, array['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'application/pdf', 'text/csv', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']),
  ('feedback-attachments', 'feedback-attachments', false, 10485760, array['image/jpeg', 'image/png', 'image/webp', 'application/pdf'])
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "ssawa_storage_admin_all" on storage.objects;
create policy "ssawa_storage_admin_all" on storage.objects
for all to authenticated
using (
  bucket_id in ('quote-attachments', 'deal-attachments', 'supplier-documents', 'analysis-files', 'feedback-attachments')
  and public.is_admin()
)
with check (
  bucket_id in ('quote-attachments', 'deal-attachments', 'supplier-documents', 'analysis-files', 'feedback-attachments')
  and public.is_admin()
);

drop policy if exists "ssawa_storage_owner_select" on storage.objects;
create policy "ssawa_storage_owner_select" on storage.objects
for select to authenticated
using (
  bucket_id in ('quote-attachments', 'deal-attachments', 'supplier-documents', 'analysis-files', 'feedback-attachments')
  and (storage.foldername(name))[1] = auth.uid()::text
);

drop policy if exists "ssawa_storage_owner_insert" on storage.objects;
create policy "ssawa_storage_owner_insert" on storage.objects
for insert to authenticated
with check (
  bucket_id in ('quote-attachments', 'deal-attachments', 'supplier-documents', 'analysis-files', 'feedback-attachments')
  and (storage.foldername(name))[1] = auth.uid()::text
);

drop policy if exists "ssawa_storage_owner_update" on storage.objects;
create policy "ssawa_storage_owner_update" on storage.objects
for update to authenticated
using (
  bucket_id in ('quote-attachments', 'deal-attachments', 'supplier-documents', 'analysis-files', 'feedback-attachments')
  and (storage.foldername(name))[1] = auth.uid()::text
)
with check (
  bucket_id in ('quote-attachments', 'deal-attachments', 'supplier-documents', 'analysis-files', 'feedback-attachments')
  and (storage.foldername(name))[1] = auth.uid()::text
);

drop policy if exists "ssawa_storage_owner_delete" on storage.objects;
create policy "ssawa_storage_owner_delete" on storage.objects
for delete to authenticated
using (
  bucket_id in ('quote-attachments', 'deal-attachments', 'supplier-documents', 'analysis-files', 'feedback-attachments')
  and (storage.foldername(name))[1] = auth.uid()::text
);
