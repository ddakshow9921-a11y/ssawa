# 싸와! MVP13 베타 운영/KPI/CRM 안내

## 목적

MVP13은 기능 작동 확인보다 베타 운영과 사업성 검증을 위한 데이터 보드를 만드는 단계다. 운영자는 아래 질문에 답할 수 있어야 한다.

- 구매자가 실제 견적요청을 올리는가?
- 공급업체가 실제 견적을 제출하는가?
- 요청 1건당 평균 견적 수와 첫 견적 도착 시간은 어떤가?
- 견적 선택과 거래 생성으로 이어지는가?
- 반복 구매자와 활성 공급업체가 늘어나는가?
- 어떤 카테고리에 집중해야 하는가?

## 주요 경로

- `/app/admin/beta`: 베타 운영 메인 대시보드
- `/app/admin/beta/kpi`: 핵심 KPI, 퍼널, 카테고리별 성과
- `/app/admin/beta/buyers`: 구매자 베타 테스트 관리
- `/app/admin/beta/suppliers`: 공급업체 베타 온보딩 관리
- `/app/admin/beta/pipeline`: 영업 파이프라인 CRM
- `/app/admin/beta/campaigns`: 베타 캠페인/실험 관리
- `/app/admin/beta/cs`: CS/피드백/신고 통합 티켓
- `/app/admin/beta/tasks`: 운영자 할 일
- `/app/admin/beta/reports`: 사업검증 리포트
- `/app/admin/beta/decision`: 런칭 전 의사결정 보드
- `/app/admin/beta/scripts`: 영업/CS 스크립트
- `/app/beta-guide`: 구매자 베타 가이드
- `/app/supplier/beta-guide`: 공급업체 베타 가이드

## KPI 계산 기준

- 요청 전환율 = 견적요청을 만든 구매자 수 / 가입 또는 온보딩 구매자 수
- 공급 응답률 = 견적이 1개 이상 도착한 요청 수 / 전체 견적요청 수
- 요청당 평균 견적 = 전체 견적 수 / 전체 견적요청 수
- 첫 견적 도착 시간 = 요청 생성 시각부터 첫 견적 생성 시각까지 평균 시간
- 견적 선택률 = 선택 또는 거래 전환된 요청 수 / 전체 견적요청 수
- 거래 전환율 = 거래 생성 수 / 전체 견적요청 수
- 반복 구매자율 = 2회 이상 견적요청 구매자 수 / 요청 구매자 수
- 활성 공급업체율 = 견적 제출 승인업체 수 / 승인 공급업체 수

## Supabase 준비

`supabase/migrations/006_beta_kpi_crm.sql`에 아래 테이블을 추가했다.

- `beta_targets`
- `beta_participants`
- `sales_leads`
- `sales_activities`
- `beta_experiments`
- `beta_feedback_insights`
- `operator_tasks`
- `business_validation_reports`

모든 신규 public 테이블은 RLS를 활성화하고 관리자 전용 정책을 기본으로 둔다. `beta_participants`만 본인 행 조회 정책을 추가했다.
