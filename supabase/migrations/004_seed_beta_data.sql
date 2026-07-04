-- 싸와! beta seed data. These rows are safe to re-run.

insert into public.categories (id, name, parent_id, sort_order, is_active, created_by_seed)
values
  ('00000000-0000-4000-8000-000000000101', '식자재', null, 10, true, true),
  ('00000000-0000-4000-8000-000000000102', '육류', '00000000-0000-4000-8000-000000000101', 11, true, true),
  ('00000000-0000-4000-8000-000000000103', '수산', '00000000-0000-4000-8000-000000000101', 12, true, true),
  ('00000000-0000-4000-8000-000000000104', '채소/과일', '00000000-0000-4000-8000-000000000101', 13, true, true),
  ('00000000-0000-4000-8000-000000000201', '주방소모품', null, 20, true, true),
  ('00000000-0000-4000-8000-000000000202', '포장용기', '00000000-0000-4000-8000-000000000201', 21, true, true),
  ('00000000-0000-4000-8000-000000000301', '청소/위생', null, 30, true, true)
on conflict (id) do update
set
  name = excluded.name,
  parent_id = excluded.parent_id,
  sort_order = excluded.sort_order,
  is_active = excluded.is_active,
  updated_at = now();

insert into public.qa_checklists (id, category, title, description, status, memo, created_by_seed)
values
  ('00000000-0000-4000-8000-000000001001', 'Auth/RLS', '구매자 본인 견적요청만 조회', 'buyer A가 buyer B의 quote_requests를 읽을 수 없는지 확인', 'unchecked', '', true),
  ('00000000-0000-4000-8000-000000001002', 'Auth/RLS', '승인 공급업체만 공개 요청 조회', 'approval_status=approved 공급업체만 open 요청을 볼 수 있는지 확인', 'unchecked', '', true),
  ('00000000-0000-4000-8000-000000001003', 'Storage', '업로드 경로 userId 격리', '다른 사용자 폴더 파일 select/update/delete가 거부되는지 확인', 'unchecked', '', true),
  ('00000000-0000-4000-8000-000000001004', 'Deployment', '환경변수 분리', 'local/beta/production 키와 mock/live 플래그가 분리됐는지 확인', 'unchecked', '', true),
  ('00000000-0000-4000-8000-000000001005', 'Data', 'mock/live 혼합 방지', '운영 환경에서 is_demo 데이터가 핵심 쿼리에 섞이지 않는지 확인', 'unchecked', '', true)
on conflict (id) do update
set
  category = excluded.category,
  title = excluded.title,
  description = excluded.description,
  updated_at = now();
