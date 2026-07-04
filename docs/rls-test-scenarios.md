# 싸와! RLS 테스트 시나리오

아래 테스트는 Supabase SQL Editor 또는 API 테스트 도구에서 buyer/supplier/admin 세션을 바꿔가며 실행합니다.

## 테스트 계정

- buyer A: `profiles.role = 'buyer'`
- buyer B: `profiles.role = 'buyer'`
- supplier A: `profiles.role = 'supplier'`, `supplier_profiles.approval_status = 'approved'`
- supplier B: `profiles.role = 'supplier'`, `supplier_profiles.approval_status = 'pending'`
- admin: `profiles.role = 'admin'`

## 핵심 시나리오

1. buyer A는 본인 `quote_requests`를 select/insert/update할 수 있다.
2. buyer A는 buyer B의 `quote_requests`를 select/update할 수 없다.
3. 승인 supplier A는 `status in ('open','quoted','selected')` 요청을 조회할 수 있다.
4. 미승인 supplier B는 공개 견적요청을 조회할 수 없다.
5. supplier A는 본인 `supplier_profiles.id`로만 `quotes`를 insert할 수 있다.
6. buyer A는 본인 요청에 제출된 `quotes`를 조회할 수 있다.
7. supplier A는 다른 공급업체의 `quotes`를 조회할 수 없다.
8. deal 참여자 buyer/supplier/admin만 `deals`, `deal_items`를 조회할 수 있다.
9. 알림은 `notifications.user_id = auth.uid()` 행만 조회/읽음 처리할 수 있다.
10. 메시지는 thread 참여자만 `message_threads`, `messages`를 조회/작성할 수 있다.
11. feedback 작성자는 본인 feedback만 조회할 수 있고, 상태 변경은 admin만 가능하다.
12. `qa_checklists`는 admin만 조회/수정할 수 있다.
13. Storage 업로드는 `{auth.uid()}/...` 경로만 허용된다.
14. Storage upsert/update는 owner 또는 admin만 가능하다.
15. anon role은 active categories 외 public table을 읽을 수 없다.

## SQL 빠른 점검

RLS 활성화 확인:

```sql
select schemaname, tablename, rowsecurity
from pg_tables
where schemaname = 'public'
order by tablename;
```

테이블별 정책 확인:

```sql
select schemaname, tablename, policyname, roles, cmd
from pg_policies
where schemaname in ('public', 'storage')
order by schemaname, tablename, policyname;
```

명시적 GRANT 확인:

```sql
select table_schema, table_name, grantee, privilege_type
from information_schema.role_table_grants
where table_schema = 'public'
  and grantee in ('anon', 'authenticated', 'service_role')
order by table_name, grantee, privilege_type;
```

## 실패 시 우선 확인

- PostgREST 오류 코드 `42501`: RLS가 아니라 GRANT 누락일 수 있음
- SELECT 정책 없음: UPDATE/DELETE가 있어도 row를 찾지 못함
- Storage upsert 실패: INSERT 외 SELECT/UPDATE 정책 필요
- SECURITY DEFINER 함수: `set search_path = ''`와 schema-qualified table 사용 여부 확인
