# 싸와! MVP14 제품개선/카테고리 집중 안내

## 목적

베타 운영 데이터에서 확인된 무견적, 공급업체 응답률, 반복 요청 문제를 해결하고 1차 집중 카테고리를 정하기 위한 운영 화면이다.

## 주요 화면

- `/app/admin/product-focus`: 핵심 카테고리 선택, 집중 모드, 데이터 품질 필터
- `/app/admin/matching-assist`: 견적 미도착 요청 위험도 분류와 수동 매칭 후보
- `/app/admin/response-ops`: 공급업체 응답률 상태 분류와 독려 액션
- `/app/admin/repeat-insights`: 반복 요청/재구매 가능성 분석
- `/app/admin/dropoff`: 구매자/공급업체 이탈 구간 분석
- `/app/admin/improvement-priorities`: 피드백 기반 제품 개선 우선순위와 30일 로드맵
- `/app/admin/mvp-cleanup`: feature flag, 베타 표시, 관리자 전용 설정
- `/app/admin/playbooks`: 카테고리별 운영 플레이북
- `/app/quick-reorder`: 지난 요청/구매/품목 묶음 기반 빠른 재요청
- `/app/favorites/items`: 자주 쓰는 품목 묶음
- `/app/supplier/response-guide`: 공급업체 응답 개선 가이드

## 계산 기준

카테고리 집중 점수는 수요, 공급, 응답, 거래, 반복, 수익성 점수를 더하고 리스크 점수를 차감한다.

견적 미도착 위험도는 견적 0건인 요청의 등록 후 경과 시간, 긴급 여부, 매칭 공급업체 수로 분류한다.

공급업체 매칭 점수는 카테고리, 지역, 세금계산서, 카드결제, 최근 응답률, 평균 응답 시간, 신뢰도, 과거 유사 요청 응답 경험을 합산한다.

## Supabase 준비

`supabase/migrations/007_product_focus_repeat_ops.sql`에 아래 구조를 추가했다.

- `focus_settings`
- `feature_flags`
- `favorite_item_groups`
- `favorite_items`
- `category_playbooks`
- `roadmap_items`
- `quote_requests.ops_status`
- `business_validation_reports` 리빌드 제안 컬럼

public 스키마 테이블은 Supabase Data API 접근을 고려해 명시 grant와 RLS를 함께 둔다.
