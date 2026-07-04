# 싸와! 베타 테스트 계정 구성

실제 비밀번호는 이 문서에 기록하지 않습니다. 비밀번호는 별도 안전한 채널로 전달합니다.

## 관리자

| 용도 | 이메일 | 역할 | 생성 방법 |
| --- | --- | --- | --- |
| 운영 관리자 | admin@example.com | admin | 가입 후 SQL로 `profiles.role='admin'` |

## 구매자

| 용도 | 이메일 | 역할 | 메모 |
| --- | --- | --- | --- |
| 음식점 구매자 | buyer1@example.com | buyer | 첫 견적요청 테스트 |
| 카페 구매자 | buyer2@example.com | buyer | 자료분석/구매내역 테스트 |

## 공급업체

| 용도 | 이메일 | 역할 | 메모 |
| --- | --- | --- | --- |
| 식자재 업체 | supplier_food@example.com | supplier | 식자재/육류/채소 |
| 포장재 업체 | supplier_packaging@example.com | supplier | 포장용기/소모품 |
| 설비 업체 | supplier_duct@example.com | supplier | 닥트/환기/설비자재 |

## DB 표시

테스트 계정은 `profiles.is_test_user = true`로 표시합니다.

```sql
update public.profiles
set is_test_user = true
where email like '%@example.com';
```

## 주의

- 실제 사용자 이메일과 예시 계정을 섞지 않습니다.
- 테스트 계정 삭제 전 관련 견적/거래/메시지 데이터를 확인합니다.
- 관리자 권한은 반드시 필요한 계정에만 부여합니다.
