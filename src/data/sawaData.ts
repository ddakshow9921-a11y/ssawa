import type {
  AccountingEntry,
  AccountingStatus,
  AnalysisAttachment,
  AnalysisConversion,
  AnalysisDisclosureScope,
  AnalysisItem,
  AnalysisItemReviewStatus,
  AnalysisJob,
  AnalysisJobInput,
  AnalysisJobStatus,
  AnalysisRawResult,
  AnalysisSourceType,
  AppData,
  BetaFeedback,
  BetaFeedbackDecision,
  BetaFeedbackInsight,
  BetaFeedbackInsightCategory,
  BetaFeedbackInsightSeverity,
  BetaKpiSummary,
  BetaParticipant,
  BetaParticipantSource,
  BetaParticipantStatus,
  BetaParticipantType,
  BetaTarget,
  BetaExperiment,
  BetaExperimentStatus,
  BetaExperimentTargetGroup,
  CategoryFocusScore,
  CategoryFocusStatus,
  CategoryPlaybook,
  BillingAccount,
  BillingPaymentMethodType,
  BillingEvent,
  BlacklistEntry,
  BlacklistStatus,
  BlacklistTargetType,
  BusinessManualReviewRequest,
  BusinessManualReviewStatus,
  BusinessOperatingStatus,
  BusinessVerification,
  BusinessVerificationStatus,
  Category,
  CommissionFeeType,
  CommissionPolicy,
  DataQualityCheck,
  Deal,
  DealAttachment,
  DealItem,
  DealStatus,
  DealStatusLog,
  DeliveryNoteStatus,
  DemoEnvironment,
  DropoffMetric,
  FeedbackStatus,
  FeedbackType,
  FavoriteItem,
  FavoriteItemGroup,
  FeatureFlag,
  FeatureFlagKey,
  FocusSetting,
  ImprovementPriority,
  ImprovementPriorityStatus,
  LocalAuthAccount,
  ManualPurchaseDraft,
  Message,
  MessageReadState,
  MessageReport,
  MessageThread,
  MessageThreadStatus,
  MessageType,
  PaymentMethod,
  PaymentMethodStatus,
  ProductApprovalStatus,
  ProductCategory,
  ProductDeliveryFeeType,
  ProductFavorite,
  ProductInquiry,
  ProductInquiryDraft,
  ProductInquiryStatus,
  ProductInquiryType,
  ProductOrderRequest,
  ProductOrderRequestDraft,
  ProductOrderRequestStatus,
  ProductPriceType,
  ProductQuoteItem,
  ProductReport,
  ProductReportReason,
  ProductReportStatus,
  ProductStockStatus,
  Profile,
  Notification,
  NotificationDeliveryStatus,
  NotificationEntityType,
  NotificationEvent,
  NotificationPriority,
  NotificationSettings,
  NotificationType,
  PurchaseDocument,
  PurchaseDocumentStatus,
  PurchaseDocumentType,
  PurchaseRecord,
  PurchaseRecordItem,
  BusinessValidationDecision,
  BusinessValidationReport,
  QaChecklistItem,
  QaChecklistStatus,
  PlatformFee,
  PlatformFeeStatus,
  QuoteRequestOpsInsight,
  QuoteRequestOpsStatus,
  QuoteCreditType,
  QuoteParticipationCredit,
  Quote,
  QuoteAttachment,
  QuoteDraft,
  QuoteRequest,
  QuoteRequestDraft,
  QuoteRequestItem,
  QuoteRiskLevel,
  ReceiptStatus,
  RepeatUsageInsight,
  Report,
  ReportAction,
  ReportActionType,
  ReportAttachment,
  ReportComment,
  ReportEntityType,
  ReportStatus,
  ReportType,
  Review,
  ReviewReply,
  ReviewReport,
  ReviewReportStatus,
  ReviewStatus,
  RoadmapItem,
  RoadmapItemStatus,
  CategoryPerformance,
  FunnelMetric,
  OperatorTask,
  OperatorTaskStatus,
  OperatorTaskType,
  Settlement,
  SettlementItem,
  SettlementMode,
  SettlementStatus,
  SanctionStatus,
  SanctionType,
  SupplierPlan,
  SupplierSubscription,
  SupplierSubscriptionStatus,
  SupplierApplicationDraft,
  SupplierDocument,
  SupplierDocumentStatus,
  SupplierDocumentType,
  SupplierProduct,
  SupplierProductDraft,
  SupplierProductEvent,
  SupplierProfile,
  SupplierReputationScore,
  SupplierStoreProfile,
  SupplierTask,
  SupplierTodayInsight,
  SupplierMatchCandidate,
  SupplierResponseOpsRow,
  SupplierResponseStatus,
  SupplierGrade,
  SupplierSalesRecord,
  SupplierStats,
  SupplierTaxInvoiceStatus,
  SupplierUsage,
  TaxInvoiceStatus,
  TaxDocument,
  TaxDocumentCheck,
  TaxDocumentStatus,
  TaxDocumentType,
  TaxExportRequest,
  AdminTodayAction,
  TodayAIConversation,
  TodayAIInsight,
  TodayAIMessage,
  TodayAIUsage,
  TodayAdminSetting,
  TodayBacklogStatus,
  TodayBetaApplication,
  TodayBetaBacklogItem,
  TodayBetaSegment,
  TodayBetaSurveyResponse,
  TodayCategory,
  TodayCategoryClassificationLog,
  TodayCategoryRule,
  TodayEvidenceStatus,
  TodayExpenseRecord,
  TodayHelpArticle,
  TodayLaunchChecklistItem,
  TodayNotification,
  TodayNotificationAudience,
  TodayNotificationCategory,
  TodayNotificationDeliveryLog,
  TodayNotificationPreference,
  TodayNotificationStatus,
  TodayOnboardingProgress,
  TodayPricingPlan,
  TodayProductEvent,
  TodayProductEventName,
  TodayRecurringRule,
  TodayReminderRule,
  TodayRequoteLog,
  TodayRequoteLogAction,
  TodayRequoteRecommendation,
  TodayRequoteRecommendationLevel,
  TodayRequoteRecommendationType,
  TodaySalesRecord,
  TodaySsawaQuoteDraft,
  TodayUploadBatch,
  TodayUploadColumnMapping,
  TodayUploadFinalRecordType,
  TodayUploadRecordType,
  TodayUploadRow,
  TodayUploadTargetField,
  TodayUploadType,
  TodayUploadValidationStatus,
  TodaySecurityEvent,
  TodaySupplierSyncLog,
  TodaySupplierSyncTrigger,
  TodaySsawaSyncLog,
  TodaySsawaSyncTrigger,
  TodaySupportTicket,
  UserRole,
  UserSanction,
  VatPolicy,
  SalesActivity,
  SalesActivityResult,
  SalesActivityType,
  SalesLead,
  SalesLeadPriority,
  SalesLeadStage,
} from "../types";
import { appConfig } from "../lib/env";

const STORAGE_KEY = appConfig.enableDemoData ? "ssawa-mvp-data-v7" : "ssawa-production-data-v1";

const now = "2026-07-04T12:00:00.000Z";

const sampleTodaySalesRecords: TodaySalesRecord[] = [
  {
    id: "today-sale-1",
    business_id: "buyer-1",
    source: "manual",
    sales_type: "매장 매출",
    payment_method: "card",
    sales_channel: "store",
    amount: 820000,
    sales_date: "2026-07-06",
    memo: "점심/저녁 매장 매출",
    evidence_status: "not_required",
    evidence_files_json: "[]",
    created_by: "buyer-1",
    created_at: "2026-07-06T12:00:00.000Z",
    updated_at: "2026-07-06T12:00:00.000Z",
  },
  {
    id: "today-sale-2",
    business_id: "buyer-1",
    source: "manual",
    sales_type: "배달앱 매출",
    payment_method: "delivery_app",
    sales_channel: "baemin",
    amount: 410000,
    sales_date: "2026-07-05",
    memo: "배달앱 정산 전 참고 금액",
    evidence_status: "needs_review",
    evidence_files_json: "[]",
    created_by: "buyer-1",
    created_at: "2026-07-05T12:00:00.000Z",
    updated_at: "2026-07-05T12:00:00.000Z",
  },
  {
    id: "today-sale-previous-1",
    business_id: "buyer-1",
    source: "manual",
    sales_type: "매장 매출",
    payment_method: "card",
    sales_channel: "store",
    amount: 960000,
    sales_date: "2026-06-06",
    memo: "지난달 비교용 매출",
    evidence_status: "not_required",
    evidence_files_json: "[]",
    created_by: "buyer-1",
    created_at: "2026-06-06T12:00:00.000Z",
    updated_at: "2026-06-06T12:00:00.000Z",
  },
  {
    id: "today-sale-3",
    business_id: "buyer-2",
    source: "manual",
    sales_type: "매장 매출",
    payment_method: "cash",
    sales_channel: "store",
    amount: 1380000,
    sales_date: "2026-07-06",
    memo: "관리자 확인용 다른 사업장 샘플",
    evidence_status: "not_required",
    evidence_files_json: "[]",
    created_by: "buyer-2",
    created_at: "2026-07-06T12:00:00.000Z",
    updated_at: "2026-07-06T12:00:00.000Z",
  },
];

const sampleTodayExpenseRecords: TodayExpenseRecord[] = [
  {
    id: "today-expense-1",
    business_id: "buyer-1",
    expense_type: "임대료",
    payment_method: "transfer",
    vendor_name: "건물주",
    amount: 1200000,
    expense_date: "2026-07-01",
    memo: "월 고정비",
    evidence_status: "complete",
    evidence_files_json: "[]",
    is_recurring: true,
    recurring_rule_id: "today-recurring-1",
    created_by: "buyer-1",
    created_at: "2026-07-01T09:00:00.000Z",
    updated_at: "2026-07-01T09:00:00.000Z",
  },
  {
    id: "today-expense-2",
    business_id: "buyer-1",
    expense_type: "광고비",
    payment_method: "card",
    vendor_name: "지역 광고",
    amount: 120000,
    expense_date: "2026-07-06",
    memo: "주간 광고 집행",
    evidence_status: "missing",
    evidence_files_json: "[]",
    is_recurring: false,
    created_by: "buyer-1",
    created_at: "2026-07-06T11:30:00.000Z",
    updated_at: "2026-07-06T11:30:00.000Z",
  },
  {
    id: "today-expense-previous-1",
    business_id: "buyer-1",
    expense_type: "광고비",
    payment_method: "card",
    vendor_name: "지역 광고",
    amount: 70000,
    expense_date: "2026-06-06",
    memo: "지난달 비교용 광고비",
    evidence_status: "complete",
    evidence_files_json: "[]",
    is_recurring: false,
    created_by: "buyer-1",
    created_at: "2026-06-06T11:30:00.000Z",
    updated_at: "2026-06-06T11:30:00.000Z",
  },
  {
    id: "today-expense-3",
    business_id: "buyer-2",
    expense_type: "공과금",
    payment_method: "auto_withdrawal",
    vendor_name: "전기요금",
    amount: 210000,
    expense_date: "2026-07-04",
    memo: "관리자 확인용 다른 사업장 샘플",
    evidence_status: "needs_review",
    evidence_files_json: "[]",
    is_recurring: true,
    created_by: "buyer-2",
    created_at: "2026-07-04T12:00:00.000Z",
    updated_at: "2026-07-04T12:00:00.000Z",
  },
];

const sampleTaxDocuments: TaxDocument[] = [
  {
    id: "tax-doc-1",
    business_id: "buyer-1",
    source_type: "purchase",
    source_id: "purchase-1",
    document_type: "transaction_statement",
    document_name: "서울포장_거래명세서.pdf",
    file_url: "#",
    file_path: "tax-documents/buyer-1/2026/07/tax-doc-1.pdf",
    file_mime_type: "application/pdf",
    file_size: 412000,
    amount: 420000,
    issued_at: "2026-07-04",
    supplier_name: "서울포장",
    memo: "싸와 거래자료에서 연결된 거래명세서 샘플",
    status: "verified",
    uploaded_by: "system",
    created_at: "2026-07-04T09:30:00.000Z",
    updated_at: "2026-07-04T09:30:00.000Z",
  },
  {
    id: "tax-doc-2",
    business_id: "buyer-1",
    source_type: "expense",
    source_id: "today-expense-1",
    document_type: "bank_transfer",
    document_name: "7월_임대료_이체내역.pdf",
    file_url: "#",
    file_path: "tax-documents/buyer-1/2026/07/tax-doc-2.pdf",
    file_mime_type: "application/pdf",
    file_size: 218000,
    amount: 1200000,
    issued_at: "2026-07-01",
    supplier_name: "건물주",
    memo: "월 임대료 이체내역",
    status: "verified",
    uploaded_by: "buyer-1",
    created_at: "2026-07-01T09:20:00.000Z",
    updated_at: "2026-07-01T09:20:00.000Z",
  },
];

const sampleTaxDocumentChecks: TaxDocumentCheck[] = [
  {
    id: "tax-check-1",
    business_id: "buyer-1",
    source_type: "purchase",
    source_id: "purchase-4",
    check_type: "receipt_missing",
    status: "missing",
    message: "영수증 또는 거래 증빙을 확인해주세요.",
    severity: "high",
    created_at: "2026-07-01T13:05:00.000Z",
    updated_at: "2026-07-01T13:05:00.000Z",
  },
];

const sampleTaxExportRequests: TaxExportRequest[] = [];

const sampleSupplierSalesRecords: SupplierSalesRecord[] = [
  {
    id: "supplier-sale-1",
    supplier_business_id: "sup-1",
    buyer_business_id: "buyer-1",
    buyer_display_name: "테스트식당",
    source: "ssawa",
    source_id: "deal-1",
    ssawa_deal_id: "deal-1",
    ssawa_quote_request_id: "req-1",
    ssawa_quote_id: "quote-1",
    item_summary: "치킨박스 외 2건",
    category: "포장재",
    total_amount: 420000,
    supply_amount: 381818,
    vat_amount: 38182,
    payment_method: "bank_transfer",
    sale_status: "confirmed",
    settlement_status: "scheduled",
    tax_invoice_status: "required",
    evidence_status: "needs_review",
    sold_at: "2026-07-04",
    memo: "싸와 거래에서 공급업체 매출로 정리된 샘플입니다.",
    created_by: "system",
    created_at: "2026-07-04T09:20:00.000Z",
    updated_at: "2026-07-04T09:20:00.000Z",
  },
  {
    id: "supplier-sale-2",
    supplier_business_id: "sup-1",
    buyer_business_id: "buyer-1",
    buyer_display_name: "테스트식당",
    source: "ssawa",
    source_id: "deal-1-prev",
    ssawa_deal_id: "deal-1-prev",
    ssawa_quote_request_id: "req-1",
    ssawa_quote_id: "quote-1-prev",
    item_summary: "지난달 포장재",
    category: "포장재",
    total_amount: 260000,
    supply_amount: 236364,
    vat_amount: 23636,
    payment_method: "bank_transfer",
    sale_status: "completed",
    settlement_status: "paid",
    tax_invoice_status: "issued",
    evidence_status: "complete",
    sold_at: "2026-06-04",
    completed_at: "2026-06-04T09:20:00.000Z",
    settled_at: "2026-06-10T09:00:00.000Z",
    memo: "정산 완료 샘플입니다.",
    created_by: "system",
    created_at: "2026-06-04T09:20:00.000Z",
    updated_at: "2026-06-10T09:00:00.000Z",
  },
  {
    id: "supplier-sale-3",
    supplier_business_id: "sup-2",
    buyer_business_id: "buyer-2",
    buyer_display_name: "강남분식",
    source: "ssawa",
    source_id: "deal-2",
    ssawa_deal_id: "deal-2",
    ssawa_quote_request_id: "req-2",
    ssawa_quote_id: "quote-3",
    item_summary: "식자재 3건",
    category: "식자재",
    total_amount: 780000,
    supply_amount: 709091,
    vat_amount: 70909,
    payment_method: "direct",
    sale_status: "confirmed",
    settlement_status: "not_applicable",
    tax_invoice_status: "requested",
    evidence_status: "needs_review",
    sold_at: "2026-07-03",
    memo: "다른 공급업체 권한 분리 확인용 샘플입니다.",
    created_by: "system",
    created_at: "2026-07-03T08:40:00.000Z",
    updated_at: "2026-07-03T08:40:00.000Z",
  },
];

const sampleTodaySupplierSyncLogs: TodaySupplierSyncLog[] = [
  {
    id: "supplier-sync-1",
    supplier_business_id: "sup-1",
    buyer_business_id: "buyer-1",
    ssawa_deal_id: "deal-1",
    supplier_sales_record_id: "supplier-sale-1",
    action: "auto_sync",
    status: "success",
    message: "싸와 거래를 공급업체 매출로 정리했습니다.",
    triggered_by: "system",
    triggered_user_id: "system",
    payload_snapshot_json: JSON.stringify({ dealId: "deal-1", status: "confirmed" }),
    created_at: "2026-07-04T09:20:00.000Z",
  },
];

const sampleSupplierProductEvents: SupplierProductEvent[] = [
  { id: "spevent-1", supplier_business_id: "sup-1", product_id: "prod-1", buyer_business_id: "buyer-1", event_type: "view", source: "ssawa", metadata_json: "{}", created_at: "2026-07-04T08:20:00.000Z" },
  { id: "spevent-2", supplier_business_id: "sup-1", product_id: "prod-1", buyer_business_id: "buyer-1", event_type: "inquiry", source: "ssawa", metadata_json: "{}", created_at: "2026-07-04T08:25:00.000Z" },
  { id: "spevent-3", supplier_business_id: "sup-1", product_id: "prod-3", buyer_business_id: "buyer-1", event_type: "order_request", source: "ssawa", metadata_json: "{}", created_at: "2026-07-03T10:00:00.000Z" },
  { id: "spevent-4", supplier_business_id: "sup-1", product_id: "prod-1", buyer_business_id: "buyer-1", event_type: "deal_completed", source: "ssawa", metadata_json: JSON.stringify({ dealId: "deal-1" }), created_at: "2026-07-04T09:20:00.000Z" },
];

const sampleSupplierTodayInsights: SupplierTodayInsight[] = [];
const sampleSupplierTasks: SupplierTask[] = [];
const sampleTodayAIConversations: TodayAIConversation[] = [];
const sampleTodayAIMessages: TodayAIMessage[] = [];
const sampleTodayAIInsights: TodayAIInsight[] = [];
const sampleTodayAIUsage: TodayAIUsage[] = [];
const sampleTodaySecurityEvents: TodaySecurityEvent[] = [
  {
    id: "today-sec-1",
    user_id: "buyer-1",
    role: "buyer",
    business_id: "buyer-1",
    event_type: "ai_scope_blocked",
    severity: "medium",
    route: "/app/today/ai",
    resource_type: "today_ai_messages",
    resource_id: "sample-blocked-ai",
    message: "AI 권한 범위 밖 질문이 안전가드에서 차단되었습니다.",
    ip_hash: "hash-demo-buyer",
    user_agent_hash: "hash-demo-browser",
    created_at: "2026-07-06T08:50:00.000Z",
  },
  {
    id: "today-sec-2",
    user_id: "sup-1-user",
    role: "supplier",
    supplier_business_id: "sup-1",
    event_type: "admin_route_denied",
    severity: "high",
    route: "/app/admin/today",
    resource_type: "admin_route",
    message: "공급업체 계정의 관리자 운영 화면 접근이 차단되었습니다.",
    ip_hash: "hash-demo-supplier",
    user_agent_hash: "hash-demo-browser",
    created_at: "2026-07-06T08:44:00.000Z",
  },
];
const sampleAdminTodayActions: AdminTodayAction[] = [
  {
    id: "today-admin-action-1",
    admin_user_id: "admin-1",
    action_type: "check_environment",
    target_type: "environment",
    target_id: "status",
    memo: "출시 전 환경 설정 요약을 확인했습니다.",
    result_status: "success",
    created_at: "2026-07-06T08:55:00.000Z",
  },
];
const sampleTodayAdminSettings: TodayAdminSetting[] = [
  { id: "today-admin-setting-1", setting_key: "sync_failure_threshold", setting_value: "3", value_type: "number", description: "동기화 실패 긴급 알림 기준", updated_by: "admin-1", created_at: "2026-07-06T08:00:00.000Z", updated_at: "2026-07-06T08:00:00.000Z" },
  { id: "today-admin-setting-2", setting_key: "upload_error_threshold", setting_value: "5", value_type: "number", description: "업로드 오류 확인 기준", updated_by: "admin-1", created_at: "2026-07-06T08:00:00.000Z", updated_at: "2026-07-06T08:00:00.000Z" },
  { id: "today-admin-setting-3", setting_key: "large_amount_threshold", setting_value: "1000000", value_type: "number", description: "큰 금액 증빙 확인 기준", updated_by: "admin-1", created_at: "2026-07-06T08:00:00.000Z", updated_at: "2026-07-06T08:00:00.000Z" },
  { id: "today-admin-setting-4", setting_key: "tax_missing_high_amount", setting_value: "500000", value_type: "number", description: "세무자료 누락 high 기준 금액", updated_by: "admin-1", created_at: "2026-07-06T08:00:00.000Z", updated_at: "2026-07-06T08:00:00.000Z" },
  { id: "today-admin-setting-5", setting_key: "ai_daily_request_limit", setting_value: "30", value_type: "number", description: "AI 일일 요청 제한 점검 기준", updated_by: "admin-1", created_at: "2026-07-06T08:00:00.000Z", updated_at: "2026-07-06T08:00:00.000Z" },
  { id: "today-admin-setting-6", setting_key: "security_repeat_threshold", setting_value: "3", value_type: "number", description: "반복 접근 차단 알림 기준", updated_by: "admin-1", created_at: "2026-07-06T08:00:00.000Z", updated_at: "2026-07-06T08:00:00.000Z" },
  { id: "today-admin-setting-7", setting_key: "settlement_review_threshold", setting_value: "1", value_type: "number", description: "정산 확인 필요 알림 기준", updated_by: "admin-1", created_at: "2026-07-06T08:00:00.000Z", updated_at: "2026-07-06T08:00:00.000Z" },
  { id: "today-admin-setting-8", setting_key: "admin_alerts_enabled", setting_value: "true", value_type: "boolean", description: "관리자 홈 알림 표시 여부", updated_by: "admin-1", created_at: "2026-07-06T08:00:00.000Z", updated_at: "2026-07-06T08:00:00.000Z" },
];

const sampleTodayRecurringRules: TodayRecurringRule[] = [
  {
    id: "today-recurring-1",
    business_id: "buyer-1",
    record_type: "expense",
    title: "월 임대료",
    amount: 1200000,
    category: "임대료",
    payment_method: "transfer",
    repeat_type: "monthly",
    day_of_month: 1,
    start_date: "2026-07-01",
    is_active: true,
    created_by: "buyer-1",
    created_at: "2026-07-01T09:00:00.000Z",
    updated_at: "2026-07-01T09:00:00.000Z",
  },
];

export const todayPurchaseCategoryNames = [
  "식자재비",
  "포장재비",
  "소모품비",
  "주방용품",
  "설비자재",
  "닥트/환기자재",
  "건축자재",
  "공구/산업자재",
  "배송비",
  "기타 매입",
  "미분류",
] as const;

const todayCategoryDescriptions: Record<(typeof todayPurchaseCategoryNames)[number], string> = {
  "식자재비": "식당 운영에 쓰는 원재료와 식품 매입",
  "포장재비": "배달, 테이크아웃, 보관용 포장 자재",
  "소모품비": "청소, 위생, 매장 운영 소모품",
  "주방용품": "조리 도구와 주방 비품",
  "설비자재": "매장 설비와 보수 자재",
  "닥트/환기자재": "닥트, 환풍, 배기 관련 자재",
  "건축자재": "인테리어와 공사 관련 자재",
  "공구/산업자재": "공구, 철물, 산업 자재",
  "배송비": "구매와 별도 표시된 배송비",
  "기타 매입": "다른 분류에 바로 맞지 않는 매입",
  "미분류": "사용자 확인이 필요한 매입",
};

export const defaultTodayCategories: TodayCategory[] = todayPurchaseCategoryNames.map((name, index) => ({
  id: `today-category-${index + 1}`,
  name,
  description: todayCategoryDescriptions[name],
  sort_order: index + 1,
  is_default: true,
  is_active: true,
  created_at: now,
  updated_at: now,
}));

const systemTodayCategoryRuleDrafts: Array<Pick<TodayCategoryRule, "category_name" | "rule_type" | "pattern" | "confidence">> = [
  { category_name: "식자재비", rule_type: "item_contains", pattern: "고기,쌀,김치,채소,야채,대파,양파,마늘,식용유,소스,면,냉동,식자재,농산,수산,축산", confidence: 0.9 },
  { category_name: "포장재비", rule_type: "item_contains", pattern: "포장,박스,봉투,비닐,용기,컵,빨대,랩,쇼핑백,테이크아웃,배달용기", confidence: 0.88 },
  { category_name: "소모품비", rule_type: "item_contains", pattern: "세제,장갑,물티슈,청소,휴지,위생,소모품,행주,수세미,살균", confidence: 0.86 },
  { category_name: "주방용품", rule_type: "item_contains", pattern: "냄비,팬,칼,도마,집게,국자,주방용품,조리도구,그릇,식기", confidence: 0.84 },
  { category_name: "설비자재", rule_type: "item_contains", pattern: "모터,펌프,필터,배관,설비,수리,냉장고,냉동고,부품", confidence: 0.82 },
  { category_name: "닥트/환기자재", rule_type: "item_contains", pattern: "닥트,환기,후드,배기,환풍기,플렉시블,댐퍼,스파이럴", confidence: 0.9 },
  { category_name: "건축자재", rule_type: "item_contains", pattern: "목재,철판,타일,시멘트,석고,페인트,건축,인테리어,실리콘", confidence: 0.84 },
  { category_name: "공구/산업자재", rule_type: "item_contains", pattern: "공구,드릴,나사,볼트,용접,전선,산업,테이프,케이블타이", confidence: 0.84 },
  { category_name: "배송비", rule_type: "item_contains", pattern: "배송비,운임,퀵,택배,화물,운송료", confidence: 0.92 },
  { category_name: "기타 매입", rule_type: "request_category", pattern: "기타,잡화,일반", confidence: 0.72 },
];

export const defaultTodayCategoryRules: TodayCategoryRule[] = systemTodayCategoryRuleDrafts.map((rule, index) => ({
  id: `today-rule-system-${index + 1}`,
  ...rule,
  source: "system",
  use_count: 0,
  created_at: now,
  updated_at: now,
}));

export const testLoginAccounts = [
  { role: "buyer", label: "테스트 고객", email: "buyer@test.ssawa.local", password: "test1234!" },
  { role: "supplier", label: "테스트 업체", email: "supplier@test.ssawa.local", password: "test1234!" },
  { role: "admin", label: "테스트 관리자", email: "admin@test.ssawa.local", password: "test1234!" },
] as const;

const testProfileIdByRole: Record<(typeof testLoginAccounts)[number]["role"], string> = {
  buyer: "test-buyer-1",
  supplier: "test-supplier-1",
  admin: "test-admin-1",
};

const sampleLocalAuthAccounts: LocalAuthAccount[] = testLoginAccounts.map((account) => ({
  id: `local-auth-${account.role}`,
  profile_id: testProfileIdByRole[account.role],
  email: account.email,
  password: account.password,
  created_at: now,
  updated_at: now,
}));

const testProfiles: Profile[] = [
  {
    ...profile("test-buyer-1", "테스트 고객", "buyer@test.ssawa.local", "buyer", "테스트식당", "900-11-00001", "010-9001-0001", "서울 강남구"),
    representative_name: "테스트고객",
    business_opening_date: "2020-01-01",
    business_address: "서울 강남구 테스트로 1",
    business_status: "active",
    business_verification_status: "verified",
    business_verified_at: now,
    onboarding_completed: true,
    onboarding_completed_at: now,
    is_test_user: true,
  },
  {
    ...profile("test-supplier-1", "테스트 업체", "supplier@test.ssawa.local", "supplier", "테스트포장상사", "900-22-00002", "010-9002-0002", "서울 동대문구"),
    representative_name: "테스트업체",
    business_opening_date: "2019-03-15",
    business_address: "서울 동대문구 테스트로 2",
    business_status: "active",
    business_verification_status: "verified",
    business_verified_at: now,
    onboarding_completed: true,
    onboarding_completed_at: now,
    is_test_user: true,
  },
  {
    ...profile("test-admin-1", "테스트 관리자", "admin@test.ssawa.local", "admin", "싸와 테스트 운영팀", "900-33-00003", "02-9003-0003", "서울"),
    representative_name: "테스트관리자",
    business_opening_date: "2026-01-01",
    business_address: "서울 테스트센터",
    business_status: "active",
    business_verification_status: "verified",
    business_verified_at: now,
    onboarding_completed: true,
    onboarding_completed_at: now,
    is_test_user: true,
  },
];

const testSupplierProfiles: SupplierProfile[] = [
  {
    id: "test-supplier-profile-1",
    user_id: "test-supplier-1",
    business_name: "테스트포장상사",
    business_number: "900-22-00002",
    representative_name: "테스트업체",
    manager_name: "테스트 담당자",
    manager_phone: "010-9002-0002",
    phone: "02-9002-0002",
    email: "supplier@test.ssawa.local",
    address: "서울 동대문구 테스트로 2",
    description: "테스트용 승인 공급업체입니다. 포장재와 소모품 견적 흐름을 확인할 수 있습니다.",
    service_regions: ["서울 강남구", "서울 동대문구", "서울 성동구", "서울 중구"],
    categories: ["포장재", "소모품"],
    sub_categories: ["배달용기", "박스", "봉투", "일회용품"],
    min_order_amount: 50000,
    delivery_fee_policy: "테스트 거래는 배송비 협의",
    free_delivery_min_amount: 300000,
    same_day_delivery_available: true,
    urgent_delivery_available: true,
    delivery_days: ["월", "화", "수", "목", "금"],
    delivery_time_slots: ["오전", "오후"],
    tax_invoice_available: true,
    card_payment_available: true,
    bank_transfer_available: true,
    on_site_payment_available: false,
    default_quote_valid_days: 3,
    approval_status: "approved",
    operational_status: "normal",
    document_status: "approved",
    admin_memo: "테스트 로그인용 승인 공급업체",
    created_at: now,
    updated_at: now,
  },
];

export const requestStatusLabels: Record<QuoteRequest["status"], string> = {
  open: "견적 받는 중",
  quoted: "견적 도착",
  selected: "업체 선택 완료",
  in_progress: "거래 진행 중",
  completed: "거래 완료",
  closed: "거래 완료",
  cancelled: "요청 취소",
};

export const quoteStatusLabels: Record<Quote["status"], string> = {
  submitted: "제출됨",
  selected: "선택됨",
  rejected: "미선택",
  expired: "만료됨",
  cancelled: "취소됨",
};

export const dealStatusLabels: Record<DealStatus, string> = {
  pending_confirmation: "거래 확인 대기",
  confirmed: "거래 확정",
  preparing: "납품 준비 중",
  delivering: "배송/납품 중",
  delivered: "납품 완료",
  completed: "거래 완료",
  cancelled_by_buyer: "구매자 취소",
  cancelled_by_supplier: "공급업체 취소",
  disputed: "문제 발생",
  closed: "종료됨",
};

export const paymentMethodLabels: Record<PaymentMethod, string> = {
  bank_transfer: "계좌이체",
  card: "카드결제",
  cash: "현금",
  later: "후불",
  undecided: "미정",
};

export const productPriceTypeLabels: Record<ProductPriceType, string> = {
  fixed: "고정가",
  from_price: "시작가",
  quote_only: "견적 문의",
};

export const productDeliveryFeeTypeLabels: Record<ProductDeliveryFeeType, string> = {
  included: "배송비 포함",
  separate: "배송비 별도",
  conditional: "조건부 무료",
  quote: "납품지별 협의",
};

export const productStockStatusLabels: Record<ProductStockStatus, string> = {
  in_stock: "재고 있음",
  low_stock: "소량 남음",
  out_of_stock: "품절",
  made_to_order: "주문 제작",
  unknown: "문의 필요",
};

export const productApprovalStatusLabels: Record<SupplierProduct["approval_status"], string> = {
  draft: "임시저장",
  pending: "검토 중",
  approved: "공개 승인",
  rejected: "반려",
  hidden: "관리자 숨김",
  suspended: "제재 숨김",
};

export const productInquiryTypeLabels: Record<ProductInquiryType, string> = {
  question: "상품 문의",
  quote_request: "견적 문의",
  order_request: "주문 요청",
};

export const productInquiryStatusLabels: Record<ProductInquiryStatus, string> = {
  pending: "답변 대기",
  answered: "답변 완료",
  converted_to_quote: "견적 전환",
  converted_to_deal: "거래 전환",
  closed: "종료",
};

export const productOrderRequestStatusLabels: Record<ProductOrderRequestStatus, string> = {
  pending: "요청 접수",
  supplier_confirming: "업체 확인 중",
  confirmed: "주문 가능",
  converted_to_deal: "거래 전환",
  rejected: "진행 불가",
  cancelled: "취소",
};

export const productReportReasonLabels: Record<ProductReportReason, string> = {
  wrong_info: "정보가 달라요",
  prohibited_item: "취급 제한 상품",
  fake_price: "가격 표시가 부정확해요",
  offensive: "부적절한 내용",
  external_trade: "외부거래 유도",
  etc: "기타",
};

export const productReportStatusLabels: Record<ProductReportStatus, string> = {
  pending: "접수",
  reviewing: "검토 중",
  resolved: "처리 완료",
  dismissed: "기각",
};

export const supplierApprovalLabels: Record<SupplierProfile["approval_status"], string> = {
  pending: "승인 대기",
  approved: "승인 완료",
  needs_revision: "보완 요청",
  rejected: "반려",
  suspended: "이용 제한",
};

export const businessVerificationStatusLabels: Record<BusinessVerificationStatus, string> = {
  not_started: "검증 전",
  status_checked: "상태 확인",
  verified: "인증 완료",
  failed: "인증 실패",
  manual_review_required: "수동 검토 필요",
  api_error: "API 확인 필요",
};

export const businessOperatingStatusLabels: Record<BusinessOperatingStatus, string> = {
  active: "계속사업자",
  suspended: "휴업자",
  closed: "폐업자",
  unregistered: "미등록/조회불가",
  api_error: "API 오류",
  unknown: "확인 필요",
};

export const businessManualReviewStatusLabels: Record<BusinessManualReviewStatus, string> = {
  submitted: "접수",
  reviewing: "검토 중",
  approved: "승인",
  rejected: "반려",
  needs_revision: "보완 요청",
};

export const supplierDocumentTypeLabels: Record<SupplierDocumentType, string> = {
  business_license: "사업자등록증",
  bankbook: "통장사본",
  store_photo: "대표 상품/창고/매장 사진",
  price_list: "가격표/취급 품목표",
  etc: "기타 인증자료",
};

export const supplierDocumentStatusLabels: Record<SupplierDocumentStatus, string> = {
  uploaded: "업로드됨",
  pending_review: "검토 대기",
  approved: "승인됨",
  rejected: "반려됨",
};

export const taxInvoiceStatusLabels: Record<TaxInvoiceStatus, string> = {
  none: "발행 없음",
  required: "요청 필요",
  requested: "요청됨",
  received: "수령 완료",
  not_needed: "불필요",
  unknown: "확인 필요",
  issued: "발행 완료",
  pending: "확인 대기",
  rejected: "반려",
};

export const receiptStatusLabels: Record<ReceiptStatus, string> = {
  none: "없음",
  uploaded: "업로드됨",
  pending: "확인 대기",
  confirmed: "확인 완료",
};

export const deliveryNoteStatusLabels: Record<DeliveryNoteStatus, string> = {
  none: "없음",
  uploaded: "업로드됨",
  pending: "확인 대기",
  confirmed: "확인 완료",
};

export const accountingStatusLabels: Record<AccountingStatus, string> = {
  pending: "반영 대기",
  reviewed: "검토 완료",
  synced: "반영 완료",
  excluded: "제외",
  hold: "보류",
  failed: "실패",
};

export const purchaseDocumentTypeLabels: Record<PurchaseDocumentType, string> = {
  invoice: "거래명세서",
  receipt: "영수증",
  tax_invoice: "세금계산서",
  delivery_note: "납품서",
  quote: "견적서",
  photo: "납품 사진",
  etc: "기타",
};

export const purchaseDocumentStatusLabels: Record<PurchaseDocumentStatus, string> = {
  uploaded: "업로드됨",
  pending_review: "검토 대기",
  confirmed: "확인 완료",
  rejected: "반려",
};

export const analysisSourceTypeLabels: Record<AnalysisSourceType, string> = {
  invoice: "거래명세서",
  quotation: "견적서",
  receipt: "영수증",
  delivery_note: "납품서",
  tax_invoice: "세금계산서",
  photo: "품목 사진",
  excel: "엑셀/CSV",
  text: "카톡/문자",
  etc: "기타 자료",
};

export const analysisStatusLabels: Record<AnalysisJobStatus, string> = {
  uploaded: "업로드 완료",
  queued: "분석 대기",
  analyzing: "분석 중",
  needs_review: "검토 필요",
  completed: "분석 완료",
  failed: "분석 실패",
  cancelled: "취소됨",
};

export const analysisItemReviewStatusLabels: Record<AnalysisItemReviewStatus, string> = {
  extracted: "추출됨",
  needs_review: "확인 필요",
  confirmed: "확정됨",
  excluded: "제외됨",
};

export const analysisDisclosureScopeLabels: Record<AnalysisDisclosureScope, string> = {
  items_only: "품목/수량만 공개",
  items_and_conditions: "품목/수량/희망조건 공개",
  total_only: "기존 총액만 공개",
  item_prices: "기존 품목별 금액 공개",
};

export const notificationTypeLabels: Record<NotificationType, string> = {
  quote_received: "새 견적 도착",
  quote_updated: "견적 수정",
  quote_expiring: "견적 만료 임박",
  supplier_message_received: "공급업체 문의",
  buyer_quote_question: "구매자 견적 문의",
  deal_message_received: "거래 문의",
  deal_created: "거래 생성",
  deal_confirmed: "거래 수락",
  deal_preparing: "납품 준비",
  deal_delivering: "배송/납품 시작",
  deal_delivered: "납품 완료",
  deal_completed: "거래 완료",
  deal_cancelled: "거래 취소",
  deal_disputed: "문제 신고",
  analysis_completed: "분석 완료",
  analysis_needs_review: "분석 검토 필요",
  purchase_record_created: "구매내역 생성",
  accounting_sync_ready: "장부 반영 준비",
  new_matched_request: "새 매칭 요청",
  request_updated: "요청 수정",
  quote_selected: "견적 선택",
  quote_rejected: "견적 미선택",
  buyer_message_received: "구매자 문의",
  deal_waiting_confirmation: "거래 확인 대기",
  deal_cancelled_by_buyer: "구매자 취소",
  deal_completed_by_buyer: "구매자 완료 확인",
  document_review_result: "자료 검토 결과",
  supplier_apply_submitted: "입점 신청",
  supplier_document_uploaded: "인증자료 업로드",
  high_value_deal_created: "고액 거래",
  deal_dispute_created: "거래 문제 신고",
  analysis_failed: "분석 실패",
  message_reported: "메시지 신고",
  chat_reported: "대화 신고",
  suspicious_chat_detected: "위험 대화 감지",
  long_unanswered_chat: "장기 미응답 문의",
  external_payment_keyword_detected: "외부거래 키워드",
  system_error: "시스템 오류",
  message_received: "문의 도착",
  usage_limit_warning: "견적 참여 한도 임박",
  usage_limit_reached: "견적 참여 한도 도달",
  platform_fee_created: "플랫폼 수수료 생성",
  settlement_ready: "정산 내역 확인",
  plan_changed: "요금제 변경",
  trial_ending: "체험 종료 임박",
  high_revenue_deal_completed: "고액 거래 완료",
  platform_fee_waived: "수수료 면제",
  supplier_usage_limit_reached: "공급업체 한도 도달",
  settlement_pending: "정산 대기",
  report_submitted: "신고 접수",
  report_status_updated: "신고 상태 변경",
  review_reply_received: "후기 답변",
  review_received: "새 후기",
  report_received: "신고 접수됨",
  sanction_applied: "운영 제재",
  reputation_score_updated: "신뢰도 업데이트",
  warning_received: "운영 경고",
  new_report_submitted: "새 신고 접수",
  urgent_report_submitted: "긴급 신고",
  low_reputation_supplier_detected: "낮은 신뢰도 감지",
  repeated_dispute_supplier: "반복 분쟁 업체",
  review_reported: "후기 신고",
  product_inquiry_received: "상품 문의",
  product_order_requested: "상품 주문요청",
  product_approval_result: "상품 검토 결과",
  product_report_received: "상품 신고",
};

export const notificationPriorityLabels: Record<NotificationPriority, string> = {
  low: "일반 안내",
  normal: "일반",
  high: "중요",
  urgent: "긴급",
};

export const notificationEntityLabels: Record<NotificationEntityType, string> = {
  quote_request: "견적요청",
  quote: "견적",
  deal: "거래",
  analysis: "분석",
  purchase_record: "구매내역",
  supplier: "공급업체",
  system: "시스템",
  message: "문의",
  platform_fee: "플랫폼 수수료",
  settlement: "정산",
  supplier_plan: "요금제",
  billing: "청구",
  report: "신고",
  review: "후기",
  sanction: "제재",
  reputation: "신뢰도",
  product: "상품",
  product_inquiry: "상품 문의",
  product_order_request: "상품 주문요청",
};

export const messageThreadTypeLabels: Record<MessageThread["thread_type"], string> = {
  quote_request: "견적요청 문의",
  deal: "거래 문의",
  supplier: "공급업체 문의",
  support: "운영 문의",
  product: "상품 문의",
};

export const messageThreadStatusLabels: Record<MessageThreadStatus, string> = {
  open: "진행 중",
  closed: "종료됨",
  reported: "신고됨",
  blocked: "차단됨",
  archived: "보관됨",
};

export const chatQuickTemplates = {
  buyerQuote: [
    "배송비 포함인가요?",
    "세금계산서 발행 가능한가요?",
    "카드결제 가능한가요?",
    "내일까지 납품 가능한가요?",
    "이 품목은 정품/동일 규격인가요?",
    "수량을 늘리면 단가가 낮아지나요?",
  ],
  buyerDeal: [
    "납품 예정 시간을 확인해주세요.",
    "거래 조건 확인 부탁드립니다.",
    "세금계산서 발행 정보를 확인해주세요.",
    "최종 거래 전 확인 부탁드립니다.",
  ],
  supplierQuote: [
    "정확한 규격 확인이 필요합니다.",
    "해당 품목은 대체품으로 견적 가능합니다.",
    "배송비는 별도입니다.",
    "세금계산서 발행 가능합니다.",
    "카드결제 가능합니다.",
    "희망 납품일 조정이 필요합니다.",
  ],
  supplierDeal: [
    "납품 준비 중입니다.",
    "배송 출발했습니다.",
    "도착 예정 시간은 오늘 오후입니다.",
    "세금계산서 발행 정보를 확인해주세요.",
    "거래 완료 확인 부탁드립니다.",
  ],
  admin: [
    "대화 내용을 확인 중입니다.",
    "거래 조건을 채팅에 남겨주세요.",
    "외부거래 유도는 이용 제한 사유가 될 수 있습니다.",
    "신고가 접수되어 확인 중입니다.",
  ],
};

const suspiciousChatKeywords = [
  "010",
  "전화",
  "연락처",
  "카톡",
  "카카오",
  "오픈채팅",
  "문자",
  "번호",
  "계좌",
  "입금",
  "현금",
  "송금",
  "외부결제",
  "따로 결제",
  "플랫폼 밖",
  "카카오페이",
  "토스",
  "직접 거래",
  "싸와 밖",
  "수수료 없이",
  "따로 연락",
];

export function detectSuspiciousMessage(body: string) {
  const normalized = body.replace(/\s+/g, " ").toLowerCase();
  const matchedKeyword = suspiciousChatKeywords.find((keyword) => normalized.includes(keyword.toLowerCase()));
  return {
    isSuspicious: Boolean(matchedKeyword),
    keyword: matchedKeyword ?? "",
    reason: matchedKeyword ? `외부거래/연락처 의심 키워드: ${matchedKeyword}` : "",
  };
}

export const commissionFeeTypeLabels: Record<CommissionFeeType, string> = {
  percentage: "정률",
  fixed: "정액",
  mixed: "정률+정액",
};

export const vatPolicyLabels: Record<VatPolicy, string> = {
  vat_included: "VAT 포함",
  vat_excluded: "VAT 별도",
  not_applicable: "VAT 미적용",
};

export const platformFeeStatusLabels: Record<PlatformFeeStatus, string> = {
  estimated: "예상",
  pending: "정산 대기",
  confirmed: "확정",
  invoiced: "청구됨",
  paid: "납부 완료",
  waived: "면제",
  cancelled: "취소",
};

export const supplierSubscriptionStatusLabels: Record<SupplierSubscriptionStatus, string> = {
  trial: "체험",
  active: "이용 중",
  past_due: "결제 지연",
  cancelled: "취소됨",
  expired: "만료",
  free: "무료",
};

export const quoteCreditTypeLabels: Record<QuoteCreditType, string> = {
  free_monthly: "월 무료 제공",
  purchased: "구매한 참여권",
  admin_grant: "관리자 지급",
  promotion: "프로모션",
};

export const settlementStatusLabels: Record<SettlementStatus, string> = {
  draft: "초안",
  pending: "정산 대기",
  confirmed: "확정",
  paid: "납부 완료",
  cancelled: "취소",
};

export const settlementModeLabels: Record<SettlementMode, string> = {
  direct_supplier_payment: "공급업체 직접 결제 후 수수료 청구",
  platform_escrow: "플랫폼 결제 수령 후 정산",
  offline: "오프라인 협의",
};

export const paymentMethodStatusLabels: Record<PaymentMethodStatus, string> = {
  none: "미연결",
  pending: "연결 대기",
  connected: "연결됨",
  failed: "연결 실패",
};

export const billingPaymentMethodTypeLabels: Record<BillingPaymentMethodType, string> = {
  card: "카드",
  bank_transfer: "계좌이체",
  virtual_account: "가상계좌",
  none: "없음",
};

export const reportTypeLabels: Record<ReportType, string> = {
  deal_dispute: "거래 분쟁",
  message_report: "메시지 신고",
  supplier_report: "공급업체 신고",
  buyer_report: "구매자 신고",
  quote_report: "견적 신고",
  payment_issue: "결제/정산 문제",
  delivery_issue: "납품 지연",
  quality_issue: "품질 문제",
  tax_invoice_issue: "세금계산서 문제",
  etc: "기타",
};

export const reportEntityTypeLabels: Record<ReportEntityType, string> = {
  deal: "거래",
  quote_request: "견적요청",
  quote: "견적",
  message: "메시지",
  supplier: "공급업체",
  purchase_record: "구매내역",
  settlement: "정산",
  etc: "기타",
};

export const reportStatusLabels: Record<ReportStatus, string> = {
  submitted: "신규 접수",
  reviewing: "검토 중",
  need_more_info: "추가 정보 필요",
  action_taken: "조치 완료",
  resolved: "해결됨",
  dismissed: "기각됨",
  cancelled: "취소됨",
};

export const reportActionTypeLabels: Record<ReportActionType, string> = {
  memo: "메모",
  status_change: "상태 변경",
  request_more_info: "추가 정보 요청",
  warning: "경고",
  temporary_restriction: "일시 제한",
  suspension: "정지",
  fee_waiver: "수수료 면제 검토",
  refund_guidance: "환불 안내",
  dismissed: "기각",
  resolved: "해결",
};

export const reviewStatusLabels: Record<ReviewStatus, string> = {
  active: "공개",
  hidden: "숨김",
  reported: "신고됨",
  deleted: "삭제됨",
};

export const reviewReportStatusLabels: Record<ReviewReportStatus, string> = {
  pending: "검토 대기",
  reviewed: "검토 완료",
  dismissed: "기각",
  hidden: "숨김 처리",
};

export const supplierGradeLabels: Record<SupplierGrade, string> = {
  excellent: "우수 파트너",
  trusted: "신뢰 파트너",
  standard: "일반 파트너",
  watch: "주의 필요",
  review: "검토 필요",
};

export const operationalStatusLabels: Record<NonNullable<SupplierProfile["operational_status"]>, string> = {
  normal: "정상",
  warning: "주의",
  restricted: "제한",
  suspended: "정지",
  banned: "차단",
};

export const sanctionTypeLabels: Record<SanctionType, string> = {
  warning: "경고",
  quote_restriction: "견적 제한",
  deal_restriction: "거래 제한",
  message_restriction: "메시지 제한",
  temporary_suspension: "일시정지",
  permanent_ban: "영구정지",
};

export const sanctionStatusLabels: Record<SanctionStatus, string> = {
  active: "활성",
  expired: "만료",
  cancelled: "해제",
};

export const blacklistTargetTypeLabels: Record<BlacklistTargetType, string> = {
  user: "사용자",
  business_number: "사업자번호",
  phone: "연락처",
  email: "이메일",
  supplier: "공급업체",
};

export const blacklistStatusLabels: Record<BlacklistStatus, string> = {
  active: "활성",
  inactive: "비활성",
};

export const feedbackTypeLabels: Record<FeedbackType, string> = {
  bug: "오류 신고",
  usability: "사용성 의견",
  feature_request: "기능 요청",
  supplier_issue: "공급업체 이슈",
  quote_issue: "견적 이슈",
  deal_issue: "거래 이슈",
  etc: "기타",
};

export const feedbackStatusLabels: Record<FeedbackStatus, string> = {
  submitted: "접수됨",
  reviewing: "검토 중",
  planned: "반영 예정",
  in_progress: "처리 중",
  resolved: "해결됨",
  dismissed: "보류/기각",
};

export const qaChecklistStatusLabels: Record<QaChecklistStatus, string> = {
  unchecked: "미점검",
  passed: "통과",
  failed: "실패",
  skipped: "보류",
};

export const betaParticipantTypeLabels: Record<BetaParticipantType, string> = {
  buyer: "구매자",
  supplier: "공급업체",
};

export const betaParticipantSourceLabels: Record<BetaParticipantSource, string> = {
  direct_sales: "직접 영업",
  referral: "추천",
  community: "커뮤니티",
  partner: "파트너",
  landing: "랜딩",
  manual: "수기 등록",
  etc: "기타",
};

export const betaParticipantStatusLabels: Record<BetaParticipantStatus, string> = {
  invited: "초대",
  signed_up: "가입",
  onboarded: "온보딩",
  active: "활성",
  inactive: "비활성",
  dropped: "이탈",
};

export const salesLeadStageLabels: Record<SalesLeadStage, string> = {
  new: "신규 리드",
  contacted: "연락 완료",
  interested: "관심 있음",
  invited: "초대 발송",
  signed_up: "가입 완료",
  onboarded: "온보딩 완료",
  active: "활성 사용자",
  rejected: "거절",
  lost: "이탈/실패",
};

export const salesLeadPriorityLabels: Record<SalesLeadPriority, string> = {
  low: "낮음",
  normal: "보통",
  high: "높음",
  urgent: "긴급",
};

export const salesActivityTypeLabels: Record<SalesActivityType, string> = {
  call: "전화",
  sms: "문자",
  kakao: "카카오톡",
  visit: "방문",
  email: "이메일",
  meeting: "미팅",
  demo: "데모",
  follow_up: "후속 연락",
  note: "메모",
};

export const salesActivityResultLabels: Record<SalesActivityResult, string> = {
  success: "성공",
  no_answer: "부재",
  interested: "관심",
  not_interested: "관심 없음",
  need_follow_up: "후속 필요",
  signed_up: "가입 완료",
  rejected: "거절",
};

export const betaExperimentStatusLabels: Record<BetaExperimentStatus, string> = {
  planned: "예정",
  running: "진행 중",
  completed: "완료",
  stopped: "중단",
};

export const betaExperimentTargetGroupLabels: Record<BetaExperimentTargetGroup, string> = {
  buyers: "구매자",
  suppliers: "공급업체",
  both: "양쪽",
};

export const betaFeedbackInsightCategoryLabels: Record<BetaFeedbackInsightCategory, string> = {
  ux: "UX",
  bug: "버그",
  pricing: "가격/요금제",
  supplier_quality: "공급업체 품질",
  buyer_need: "구매자 니즈",
  feature_request: "기능 요청",
  onboarding: "온보딩",
  trust: "신뢰/안전",
  etc: "기타",
};

export const betaFeedbackInsightSeverityLabels: Record<BetaFeedbackInsightSeverity, string> = {
  low: "낮음",
  normal: "보통",
  high: "높음",
  critical: "치명",
};

export const betaFeedbackDecisionLabels: Record<BetaFeedbackDecision, string> = {
  do_now: "지금 처리",
  do_later: "다음 배포",
  reject: "기각",
  needs_research: "추가 조사",
};

export const operatorTaskTypeLabels: Record<OperatorTaskType, string> = {
  sales: "영업",
  cs: "CS",
  qa: "QA",
  supplier_onboarding: "공급업체 온보딩",
  buyer_followup: "구매자 후속",
  bug_check: "버그 확인",
  report: "리포트",
  etc: "기타",
};

export const operatorTaskStatusLabels: Record<OperatorTaskStatus, string> = {
  todo: "대기",
  doing: "진행 중",
  done: "완료",
  blocked: "막힘",
  cancelled: "취소",
};

export const businessValidationDecisionLabels: Record<BusinessValidationDecision, string> = {
  continue: "계속 진행",
  pivot: "방향 전환",
  pause: "일시 중단",
  expand: "확장 준비",
  needs_more_data: "추가 데이터 필요",
};

export const categoryFocusStatusLabels: Record<CategoryFocusStatus, string> = {
  recommended: "집중 추천",
  maintain: "유지",
  need_supply: "공급업체 보강 필요",
  need_demand: "수요 검증 필요",
  hold: "보류",
  expand_candidate: "확장 후보",
};

export const quoteRiskLevelLabels: Record<QuoteRiskLevel, string> = {
  low: "낮음",
  normal: "보통",
  high: "높음",
  urgent: "긴급",
};

export const quoteRequestOpsStatusLabels: Record<QuoteRequestOpsStatus, string> = {
  normal: "정상",
  needs_supplier_match: "공급업체 매칭 필요",
  waiting_quotes: "견적 대기",
  no_quotes_risk: "미도착 위험",
  operator_assisting: "운영자 개입 중",
  resolved: "해결",
  failed: "실패",
};

export const supplierResponseStatusLabels: Record<SupplierResponseStatus, string> = {
  fast: "빠른응답",
  normal: "정상",
  slow: "응답느림",
  low_participation: "견적참여저조",
  dormant_risk: "휴면위험",
  needs_contact: "연락필요",
  needs_education: "교육필요",
};

export const improvementPriorityStatusLabels: Record<ImprovementPriorityStatus, string> = {
  reviewing: "검토 중",
  apply_now: "이번 단계 반영",
  apply_next: "다음 단계 반영",
  hold: "보류",
  rejected: "기각",
  done: "완료",
};

export const featureFlagKeyLabels: Record<FeatureFlagKey, string> = {
  enable_analysis: "자료 자동분석",
  enable_accounting_sync: "오늘장사 장부 연동",
  enable_supplier_billing: "공급업체 요금제",
  enable_settlements: "정산 관리",
  enable_reviews: "후기/평점",
  enable_reports: "신고/분쟁",
  enable_messages: "문의 스레드",
  enable_beta_kpi: "베타 KPI",
  enable_quick_reorder: "빠른 재요청",
  enable_favorite_items: "자주 쓰는 품목",
};

export const roadmapItemStatusLabels: Record<RoadmapItemStatus, string> = {
  planned: "예정",
  doing: "진행 중",
  done: "완료",
  blocked: "막힘",
};

export const environmentLabels: Record<DemoEnvironment, string> = {
  demo: "데모",
  beta: "베타",
  production: "운영",
};

export const categories: Category[] = [
  "식자재",
  "포장재",
  "소모품",
  "주방용품",
  "설비/닥트/환기자재",
  "건축자재",
  "공구/산업자재",
  "기타",
].map((name, index) => ({
  id: `cat-${index + 1}`,
  name,
  parent_id: null,
  sort_order: index + 1,
  is_active: true,
  created_at: now,
}));

export const categoryDescriptions: Record<string, string> = {
  "식자재": "육류, 채소, 소스, 식용유처럼 매장 운영에 반복적으로 필요한 품목",
  "포장재": "배달 박스, 봉투, 컵, 라벨처럼 규격과 수량 비교가 중요한 품목",
  "소모품": "장갑, 세제, 휴지, 위생용품처럼 단가와 납품 주기가 중요한 품목",
  "주방용품": "조리도구, 용기, 집기처럼 브랜드와 내구성 확인이 필요한 품목",
  "설비/닥트/환기자재": "닥트, 후렉시블, 댐퍼처럼 현장 규격 확인이 필요한 자재",
  "건축자재": "인테리어, 보수, 시공 자재처럼 납품 조건이 중요한 품목",
  "공구/산업자재": "공구, 안전용품, 산업 소모재처럼 정확한 모델명이 중요한 품목",
  "기타": "카테고리가 애매하거나 여러 품목이 섞인 요청",
};

export const supplierSubCategoryOptions: Record<string, string[]> = {
  "식자재": ["육류", "수산물", "채소/과일", "냉동식품", "소스/양념", "쌀/면/분말", "가공식품"],
  "포장재": ["배달용기", "도시락용기", "컵/뚜껑/빨대", "봉투/쇼핑백", "소스컵", "박스/완충재", "스티커/테이프"],
  "소모품": ["위생장갑", "세제", "휴지", "청소용품", "주방 소모품", "일회용품"],
  "주방용품": ["조리도구", "보관용기", "집기", "식기", "주방 전자제품"],
  "설비/닥트/환기자재": ["후드", "배기팬", "스파이럴덕트", "후렉시블", "디퓨저", "댐퍼", "필터", "방화댐퍼", "배관자재"],
  "건축자재": ["목재", "금속자재", "타일", "페인트", "보수자재", "인테리어 자재"],
  "공구/산업자재": ["전동공구", "수공구", "안전용품", "산업 소모재", "측정공구"],
  "기타": ["맞춤 견적", "복합 품목"],
};

export const commonServiceRegions = ["서울 전체", "서울 동대문구", "서울 성동구", "서울 중구", "서울 종로구", "경기 남양주시", "경기 구리시", "경기 하남시", "충북 충주시", "충북 음성군", "충북 제천시"];

export const requestInputMethodLabels: Record<NonNullable<QuoteRequest["input_method"]>, string> = {
  manual: "직접 입력",
  photo: "사진 업로드",
  invoice: "거래명세서 업로드",
  text: "문장으로 입력",
  template: "템플릿 사용",
  repeat: "이전 요청 반복",
};

export const requestTemplates: Array<{
  name: string;
  category_name: string;
  title: string;
  description: string;
  items: QuoteRequestDraft["items"];
}> = [
  {
    name: "치킨집 포장재 세트",
    category_name: "포장재",
    title: "치킨집 포장재 견적 요청",
    description: "배달 포장에 필요한 박스, 소스컵, 봉투를 한 번에 비교하고 싶습니다.",
    items: [
      draftItem("치킨박스", "소형/중형 혼합", 1000, "개", "인쇄 없는 무지 가능"),
      draftItem("소스컵", "뚜껑 포함", 2000, "개", "치킨무/소스 공용"),
      draftItem("배달봉투", "대형", 1000, "장", "흰색 또는 무지"),
    ],
  },
  {
    name: "카페 포장재 세트",
    category_name: "포장재",
    title: "카페 포장재 견적 요청",
    description: "테이크아웃 컵과 홀더, 캐리어를 묶음 단가로 받고 싶습니다.",
    items: [
      draftItem("아이스컵", "16oz", 3000, "개", "평뚜껑 포함"),
      draftItem("종이컵", "13oz", 2000, "개", "무지 또는 친환경"),
      draftItem("컵홀더", "13~16oz 공용", 3000, "개", ""),
      draftItem("컵캐리어", "2구", 500, "개", ""),
    ],
  },
  {
    name: "고깃집 식자재 세트",
    category_name: "식자재",
    title: "고깃집 식자재 견적 요청",
    description: "주말 장사 전 납품 가능한 식자재 견적을 비교합니다.",
    items: [
      draftItem("삼겹살", "냉장", 30, "kg", "원산지 표기 필요"),
      draftItem("양파", "15kg", 1, "망", "국내산 선호"),
      draftItem("쌈장", "업소용 14kg", 1, "통", ""),
      draftItem("식용유", "18L", 2, "통", "대두유 가능"),
    ],
  },
  {
    name: "닥트/환기 보수 세트",
    category_name: "설비/닥트/환기자재",
    title: "닥트/환기자재 견적 요청",
    description: "주방 환기 보수용 자재입니다. 규격 호환 여부를 함께 확인해 주세요.",
    items: [
      draftItem("스파이럴덕트", "300파이", 10, "m", "현장 절단 가능 여부 확인"),
      draftItem("후렉시블", "300파이", 2, "BOX", ""),
      draftItem("디퓨저", "300파이", 4, "개", ""),
      draftItem("댐퍼", "300파이", 2, "개", ""),
    ],
  },
];

const requestItems: QuoteRequestItem[] = [
  item("item-1", "req-1", "치킨박스", "1,000개", 1000, "개", "소형/중형 혼합 가능"),
  item("item-2", "req-1", "소스컵", "2,000개", 2000, "개", "뚜껑 포함"),
  item("item-3", "req-1", "배달봉투 대형", "1,000장", 1000, "장", "흰색 또는 무지"),
  item("item-4", "req-2", "삼겹살", "30kg", 30, "kg", "냉장 선호"),
  item("item-5", "req-2", "양파", "15kg", 1, "망", "국내산"),
  item("item-6", "req-2", "쌈장", "14kg", 14, "kg", "업소용"),
  item("item-7", "req-2", "식용유", "18L 2통", 2, "통", "대두유 가능"),
  item("item-8", "req-3", "스파이럴덕트", "300파이 10m", 10, "m", "현장 절단 가능 여부 확인"),
  item("item-9", "req-3", "후렉시블", "300파이 2BOX", 2, "BOX", ""),
  item("item-10", "req-3", "디퓨저", "4개", 4, "개", ""),
  item("item-11", "req-3", "댐퍼", "2개", 2, "개", ""),
];

const samplePurchaseRecords: PurchaseRecord[] = [
  {
    id: "purchase-1",
    deal_id: "deal-1",
    quote_request_id: "req-1",
    buyer_id: "buyer-1",
    supplier_id: "sup-1",
    supplier_name: "서울포장",
    supplier_business_number: "120-81-55221",
    purchase_title: "치킨집 포장재 정기 구매",
    purchase_date: "2026-07-04",
    category_name: "포장재",
    accounting_category: "포장재비",
    sub_category: "배달 포장",
    item_count: 3,
    total_amount: 420000,
    supply_amount: 381818,
    vat_amount: 38182,
    delivery_fee: 30000,
    discount_amount: 0,
    estimated_savings_amount: 80000,
    estimated_savings_rate: 16,
    previous_purchase_amount: 500000,
    payment_method: "bank_transfer",
    tax_invoice_status: "issued",
    receipt_status: "uploaded",
    delivery_note_status: "confirmed",
    accounting_status: "pending",
    sync_target: "today_jangsa",
    memo: "거래 완료로 자동 생성된 구매내역입니다.",
    user_memo: "다음 달에도 같은 품목 반복 구매 예정",
    admin_memo: "",
    created_at: "2026-07-04T09:20:00.000Z",
    updated_at: "2026-07-04T09:20:00.000Z",
  },
  {
    id: "purchase-2",
    deal_id: "deal-2",
    quote_request_id: "req-2",
    buyer_id: "buyer-2",
    supplier_id: "sup-2",
    supplier_name: "동대문식자재",
    supplier_business_number: "204-86-77891",
    purchase_title: "고깃집 식자재 납품",
    purchase_date: "2026-07-03",
    category_name: "식자재",
    accounting_category: "매입비",
    sub_category: "육류/채소",
    item_count: 3,
    total_amount: 780000,
    supply_amount: 709091,
    vat_amount: 70909,
    delivery_fee: 0,
    discount_amount: 0,
    estimated_savings_amount: 70000,
    estimated_savings_rate: 8,
    previous_purchase_amount: 850000,
    payment_method: "later",
    tax_invoice_status: "requested",
    receipt_status: "pending",
    delivery_note_status: "uploaded",
    accounting_status: "pending",
    sync_target: "today_jangsa",
    memo: "후불 결제 예정. 세금계산서 발행 요청 상태입니다.",
    user_memo: "주말 행사 전 납품",
    admin_memo: "",
    created_at: "2026-07-03T08:40:00.000Z",
    updated_at: "2026-07-03T08:40:00.000Z",
  },
  {
    id: "purchase-3",
    deal_id: "deal-3",
    quote_request_id: "req-3",
    buyer_id: "buyer-1",
    supplier_id: "sup-3",
    supplier_name: "충주닥트자재",
    supplier_business_number: "303-90-11842",
    purchase_title: "닥트/환기자재 현장 구매",
    purchase_date: "2026-07-02",
    category_name: "설비/닥트/환기자재",
    accounting_category: "수선비",
    sub_category: "환기 설비",
    item_count: 3,
    total_amount: 1250000,
    supply_amount: 1136364,
    vat_amount: 113636,
    delivery_fee: 50000,
    discount_amount: 0,
    estimated_savings_amount: 150000,
    estimated_savings_rate: 11,
    previous_purchase_amount: 1400000,
    payment_method: "undecided",
    tax_invoice_status: "issued",
    receipt_status: "confirmed",
    delivery_note_status: "confirmed",
    accounting_status: "synced",
    sync_target: "today_jangsa",
    memo: "오늘장사 장부 반영 완료 샘플입니다.",
    user_memo: "현장 규격 확인 완료",
    admin_memo: "",
    created_at: "2026-07-02T10:10:00.000Z",
    updated_at: "2026-07-02T10:20:00.000Z",
  },
  {
    id: "purchase-4",
    deal_id: "deal-4",
    quote_request_id: "req-1",
    buyer_id: "buyer-1",
    supplier_id: "sup-4",
    supplier_name: "경기소모품센터",
    supplier_business_number: "135-44-99120",
    purchase_title: "카페 소모품 보류 구매",
    purchase_date: "2026-07-01",
    category_name: "소모품",
    accounting_category: "소모품비",
    sub_category: "위생/청소",
    item_count: 2,
    total_amount: 310000,
    supply_amount: 281818,
    vat_amount: 28182,
    delivery_fee: 20000,
    discount_amount: 0,
    estimated_savings_amount: 0,
    estimated_savings_rate: 0,
    previous_purchase_amount: 0,
    payment_method: "card",
    tax_invoice_status: "pending",
    receipt_status: "none",
    delivery_note_status: "pending",
    accounting_status: "hold",
    sync_target: "today_jangsa",
    memo: "증빙자료 확인 전까지 보류된 구매내역입니다.",
    user_memo: "영수증 재요청 필요",
    admin_memo: "증빙 누락",
    created_at: "2026-07-01T13:00:00.000Z",
    updated_at: "2026-07-01T13:00:00.000Z",
  },
  {
    id: "purchase-5",
    buyer_id: "buyer-1",
    supplier_id: "manual-supplier",
    supplier_name: "현장 직접구매",
    supplier_business_number: "000-00-00000",
    purchase_title: "시장 직접 구매 영수증",
    purchase_date: "2026-06-29",
    category_name: "기타",
    accounting_category: "잡비",
    sub_category: "현장구매",
    item_count: 1,
    total_amount: 92000,
    supply_amount: 83636,
    vat_amount: 8364,
    delivery_fee: 0,
    discount_amount: 0,
    estimated_savings_amount: 0,
    estimated_savings_rate: 0,
    previous_purchase_amount: 0,
    payment_method: "cash",
    tax_invoice_status: "none",
    receipt_status: "uploaded",
    delivery_note_status: "none",
    accounting_status: "excluded",
    sync_target: "today_jangsa",
    memo: "수동 등록 후 장부 제외 처리한 샘플입니다.",
    user_memo: "대표자 현금 구매",
    admin_memo: "",
    created_at: "2026-06-29T15:30:00.000Z",
    updated_at: "2026-06-29T15:30:00.000Z",
  },
  {
    id: "purchase-6",
    deal_id: "deal-1-prev",
    quote_request_id: "req-1",
    buyer_id: "buyer-1",
    supplier_id: "sup-1",
    supplier_name: "서울포장",
    supplier_business_number: "120-81-55221",
    purchase_title: "지난달 포장재 구매",
    purchase_date: "2026-06-04",
    category_name: "포장재",
    accounting_category: "포장재비",
    sub_category: "배달 포장",
    item_count: 2,
    total_amount: 260000,
    supply_amount: 236364,
    vat_amount: 23636,
    delivery_fee: 10000,
    discount_amount: 0,
    estimated_savings_amount: 0,
    estimated_savings_rate: 0,
    previous_purchase_amount: 0,
    payment_method: "bank_transfer",
    tax_invoice_status: "issued",
    receipt_status: "uploaded",
    delivery_note_status: "confirmed",
    accounting_status: "synced",
    sync_target: "today_jangsa",
    memo: "비용 상승 감지 비교용 지난달 포장재 구매입니다.",
    user_memo: "",
    admin_memo: "",
    created_at: "2026-06-04T09:20:00.000Z",
    updated_at: "2026-06-04T09:20:00.000Z",
  },
];

const samplePurchaseRecordItems: PurchaseRecordItem[] = [
  purchaseItem("purchase-item-1", "purchase-1", "치킨박스", "1,000개", 1000, "개", 280, "무지 박스", "deal-item-1"),
  purchaseItem("purchase-item-2", "purchase-1", "소스컵", "2,000개", 2000, "개", 55, "뚜껑 포함", "deal-item-2"),
  purchaseItem("purchase-item-3", "purchase-1", "배달봉투 대형", "1,000장", 1000, "장", 0, "묶음 할인", "deal-item-3"),
  purchaseItem("purchase-item-4", "purchase-2", "삼겹살", "30kg", 30, "kg", 19500, "냉장", "deal-item-4"),
  purchaseItem("purchase-item-5", "purchase-2", "양파", "15kg", 1, "망", 26000, "국내산", "deal-item-5"),
  purchaseItem("purchase-item-6", "purchase-2", "쌈장", "14kg", 14, "kg", 12000, "업소용", "deal-item-6"),
  purchaseItem("purchase-item-7", "purchase-3", "스파이럴덕트", "300파이 10m", 10, "m", 55000, "", "deal-item-7"),
  purchaseItem("purchase-item-8", "purchase-3", "후렉시블", "300파이 2BOX", 2, "BOX", 160000, "", "deal-item-8"),
  purchaseItem("purchase-item-9", "purchase-3", "디퓨저", "4개", 4, "개", 45000, "", "deal-item-9"),
  purchaseItem("purchase-item-10", "purchase-4", "니트릴 장갑", "M 20박스", 20, "박스", 9500, "증빙 확인 필요"),
  purchaseItem("purchase-item-11", "purchase-4", "친환경 세제", "18L 4통", 4, "통", 22500, ""),
  purchaseItem("purchase-item-12", "purchase-5", "시장 구매 자재", "영수증 기준", 1, "건", 92000, "수동 등록"),
];

const samplePurchaseDocuments: PurchaseDocument[] = [
  purchaseDocument("pdoc-1", "purchase-1", "delivery_note", "서울포장_거래명세서.pdf", "confirmed", "supplier", "2026-07-04T09:22:00.000Z"),
  purchaseDocument("pdoc-2", "purchase-1", "tax_invoice", "서울포장_세금계산서.pdf", "confirmed", "supplier", "2026-07-04T10:10:00.000Z"),
  purchaseDocument("pdoc-3", "purchase-2", "delivery_note", "동대문식자재_납품서.jpg", "uploaded", "supplier", "2026-07-03T08:45:00.000Z"),
  purchaseDocument("pdoc-4", "purchase-3", "invoice", "충주닥트자재_거래명세서.pdf", "confirmed", "supplier", "2026-07-02T10:12:00.000Z"),
  purchaseDocument("pdoc-5", "purchase-3", "tax_invoice", "충주닥트자재_세금계산서.pdf", "confirmed", "supplier", "2026-07-02T10:18:00.000Z"),
  purchaseDocument("pdoc-6", "purchase-5", "receipt", "시장직접구매_영수증.jpg", "uploaded", "buyer", "2026-06-29T15:35:00.000Z"),
];

const sampleAccountingEntries: AccountingEntry[] = samplePurchaseRecords.map((record) => createAccountingEntryFromPurchaseRecord(record, record.created_at));

const sampleAnalysisJobs: AnalysisJob[] = [
  analysisJob({
    id: "analysis-1",
    sourceType: "invoice",
    fileName: "동대문식자재_거래명세서.jpg",
    fileType: "jpg",
    status: "completed",
    supplierName: "동대문식자재",
    businessNumber: "204-86-77891",
    transactionDate: "2026-07-03",
    category: "식자재",
    totalAmount: 780000,
    confidence: 92,
    rawText: "삼겹살 30kg 450,000원\n양파 15kg 32,000원\n쌈장 14kg 58,000원\n식용유 18L 2통 76,000원",
  }),
  analysisJob({
    id: "analysis-2",
    sourceType: "quotation",
    fileName: "서울포장_견적서.pdf",
    fileType: "pdf",
    status: "needs_review",
    supplierName: "서울포장",
    businessNumber: "120-81-55221",
    transactionDate: "2026-07-04",
    category: "포장재",
    totalAmount: 420000,
    confidence: 84,
    rawText: "치킨박스 1,000개 210,000원\n소스컵 2,000개 80,000원\n배달봉투 대형 1,000장 95,000원",
  }),
  analysisJob({
    id: "analysis-3",
    sourceType: "excel",
    fileName: "충주닥트자재_견적.xlsx",
    fileType: "xlsx",
    status: "completed",
    supplierName: "충주닥트자재",
    businessNumber: "303-90-11842",
    transactionDate: "2026-07-02",
    category: "설비/닥트/환기자재",
    totalAmount: 1250000,
    confidence: 88,
    rawText: "스파이럴덕트 300파이 10m 550,000원\n후렉시블 300파이 2BOX 320,000원\n디퓨저 4개 180,000원\n댐퍼 2개 200,000원",
  }),
  analysisJob({
    id: "analysis-4",
    sourceType: "photo",
    fileName: "흐릿한_품목사진.jpg",
    fileType: "jpg",
    status: "failed",
    supplierName: "",
    businessNumber: "",
    transactionDate: "2026-07-04",
    category: "기타",
    totalAmount: 0,
    confidence: 28,
    rawText: "",
    errorMessage: "이미지가 흐릿하여 품목을 인식하지 못했습니다.",
  }),
  analysisJob({
    id: "analysis-5",
    sourceType: "text",
    fileName: "카톡_주문내역.txt",
    fileType: "txt",
    status: "needs_review",
    supplierName: "",
    businessNumber: "",
    transactionDate: "2026-07-04",
    category: "식자재",
    totalAmount: 0,
    confidence: 76,
    rawText: "사장님 이번 주 주문\n삼겹살 30키로\n양파 한 망\n식용유 18리터 2통\n배달봉투 대자 1000장\n금요일 오전 배송 부탁드립니다.",
  }),
];

const sampleAnalysisItems: AnalysisItem[] = [
  analysisItem("analysis-item-1", "analysis-1", "삼겹살", "삼겹살", "30kg", 30, "kg", 15000, 450000, "식자재", 95, "confirmed", ""),
  analysisItem("analysis-item-2", "analysis-1", "양파", "양파", "15kg", 15, "kg", 2133, 32000, "식자재", 92, "confirmed", ""),
  analysisItem("analysis-item-3", "analysis-1", "쌈장", "쌈장", "14kg", 14, "kg", 4143, 58000, "식자재", 90, "confirmed", ""),
  analysisItem("analysis-item-4", "analysis-1", "식용유", "식용유", "18L 2통", 2, "통", 38000, 76000, "식자재", 88, "confirmed", ""),
  analysisItem("analysis-item-5", "analysis-2", "치킨박스", "치킨박스", "1,000개", 1000, "개", 210, 210000, "포장재", 91, "extracted", ""),
  analysisItem("analysis-item-6", "analysis-2", "소스컵", "소스컵", "2,000개", 2000, "개", 40, 80000, "포장재", 82, "needs_review", "품목 단가가 흐릿합니다."),
  analysisItem("analysis-item-7", "analysis-2", "배달봉투", "배달봉투", "대형 1,000장", 1000, "장", 95, 95000, "포장재", 79, "needs_review", "규격 대형 여부를 확인해주세요."),
  analysisItem("analysis-item-8", "analysis-3", "스파이럴덕트", "스파이럴덕트", "300파이 10m", 10, "m", 55000, 550000, "설비/닥트/환기자재", 90, "confirmed", ""),
  analysisItem("analysis-item-9", "analysis-3", "후렉시블", "후렉시블", "300파이 2BOX", 2, "BOX", 160000, 320000, "설비/닥트/환기자재", 89, "confirmed", ""),
  analysisItem("analysis-item-10", "analysis-3", "디퓨저", "디퓨저", "4개", 4, "개", 45000, 180000, "설비/닥트/환기자재", 86, "confirmed", ""),
  analysisItem("analysis-item-11", "analysis-3", "댐퍼", "댐퍼", "2개", 2, "개", 100000, 200000, "설비/닥트/환기자재", 84, "confirmed", ""),
  analysisItem("analysis-item-12", "analysis-5", "삼겹살", "삼겹살", "30키로", 30, "kg", 0, 0, "식자재", 76, "needs_review", "금액이 없습니다."),
  analysisItem("analysis-item-13", "analysis-5", "양파", "양파", "한 망", 1, "망", 0, 0, "식자재", 68, "needs_review", "수량 표현을 확인해주세요."),
  analysisItem("analysis-item-14", "analysis-5", "식용유", "식용유", "18리터 2통", 2, "통", 0, 0, "식자재", 74, "extracted", ""),
  analysisItem("analysis-item-15", "analysis-5", "배달봉투", "배달봉투", "대자 1000장", 1000, "장", 0, 0, "포장재", 70, "extracted", ""),
];

const sampleAnalysisAttachments: AnalysisAttachment[] = sampleAnalysisJobs.map((job, index) => ({
  id: `analysis-attach-${index + 1}`,
  analysis_job_id: job.id,
  file_url: "#",
  file_name: job.original_file_name,
  file_type: job.original_file_type,
  page_number: 1,
  preview_url: "#",
  created_at: job.created_at,
}));

const sampleAnalysisRawResults: AnalysisRawResult[] = sampleAnalysisJobs
  .filter((job) => job.status !== "failed")
  .map((job, index) => ({
    id: `analysis-raw-${index + 1}`,
    analysis_job_id: job.id,
    raw_text: job.original_text_input,
    raw_json: JSON.stringify({ engine: job.analysis_engine, supplier: job.detected_supplier_name, total: job.detected_total_amount }),
    created_at: job.updated_at,
  }));

const sampleAnalysisConversions: AnalysisConversion[] = [
  analysisConversion("analysis-conversion-1", "analysis-1", "purchase_record", "purchase-2", "2026-07-03T08:46:00.000Z"),
  analysisConversion("analysis-conversion-2", "analysis-2", "quote_request", "req-1", "2026-07-04T09:30:00.000Z"),
];

const sampleNotifications: Notification[] = [
  notification("notif-1", "buyer-1", "buyer", "quote_received", "새 견적이 도착했어요.", "서울포장이 치킨집 포장재 견적 요청에 견적을 제출했습니다.", "/app/requests/req-1", "quote_request", "req-1", "normal", false, "2026-07-04T10:12:00.000Z"),
  notification("notif-2", "buyer-1", "buyer", "deal_confirmed", "공급업체가 거래를 수락했어요.", "서울포장이 거래를 수락했습니다. 납품 일정을 확인해주세요.", "/app/deals/deal-1", "deal", "deal-1", "high", false, "2026-07-04T10:30:00.000Z"),
  notification("notif-3", "buyer-1", "buyer", "analysis_needs_review", "분석 결과 확인이 필요해요.", "거래명세서에서 수량이 불명확한 품목 2개가 있습니다.", "/app/analyze/analysis-2", "analysis", "analysis-2", "high", false, "2026-07-04T11:00:00.000Z"),
  notification("notif-4", "buyer-1", "buyer", "accounting_sync_ready", "장부 반영 대기 중인 구매내역이 있어요.", "치킨집 포장재 구매내역을 오늘장사 장부에 반영할 수 있습니다.", "/app/accounting/pending", "purchase_record", "purchase-1", "normal", true, "2026-07-04T11:10:00.000Z"),
  notification("notif-5", "sup-1-user", "supplier", "new_matched_request", "새 견적요청이 도착했어요.", "서울 동대문구 포장재 요청에 견적을 제출할 수 있습니다.", "/app/supplier/requests/req-1", "quote_request", "req-1", "normal", false, "2026-07-04T09:50:00.000Z"),
  notification("notif-6", "sup-1-user", "supplier", "quote_selected", "내 견적이 선택되었습니다.", "월계치킨이 서울포장의 견적을 선택했습니다. 거래 확인이 필요합니다.", "/app/deals/deal-1", "quote", "quote-1", "high", false, "2026-07-04T10:22:00.000Z"),
  notification("notif-7", "admin-1", "admin", "supplier_apply_submitted", "공급업체 입점 신청이 들어왔습니다.", "서울주방파트너가 입점 신청을 완료했습니다.", "/app/admin/suppliers", "supplier", "sup-5", "normal", false, "2026-07-04T09:20:00.000Z"),
  notification("notif-8", "admin-1", "admin", "deal_dispute_created", "거래 문제 신고가 접수되었습니다.", "고깃집 식자재 거래에서 문제가 신고되었습니다.", "/app/admin/deals", "deal", "deal-5", "urgent", false, "2026-07-04T10:40:00.000Z"),
  notification("notif-9", "admin-1", "admin", "chat_reported", "문의 메시지 신고가 접수되었습니다.", "외부 결제 유도 의심 메시지가 신고되었습니다.", "/app/admin/chats/thread-deal-1", "message", "msg-deal-2", "urgent", false, "2026-07-04T11:20:00.000Z"),
  notification("notif-10", "sup-1-user", "supplier", "platform_fee_created", "플랫폼 수수료가 정산 예정에 추가되었습니다.", "치킨집 포장재 거래 수수료 16,800원을 확인해 주세요.", "/app/supplier/settlements", "platform_fee", "fee-deal-1", "normal", false, "2026-07-04T12:00:00.000Z"),
  notification("notif-11", "sup-2-user", "supplier", "usage_limit_reached", "이번 달 무료 견적 참여 한도에 도달했습니다.", "무료 플랜 월 5건을 모두 사용했습니다. 요금제 업그레이드를 검토해 주세요.", "/app/supplier/billing", "supplier_plan", "plan-free", "high", false, "2026-07-04T12:05:00.000Z"),
  notification("notif-12", "admin-1", "admin", "settlement_pending", "정산 대기 건이 생성되었습니다.", "서울포장 7월 플랫폼 이용 수수료가 정산 대기 상태입니다.", "/app/admin/settlements", "settlement", "settlement-sup-1-july", "normal", false, "2026-07-04T12:10:00.000Z"),
];

const sampleNotificationEvents: NotificationEvent[] = sampleNotifications.map((entry, index) =>
  notificationEvent(`nevent-${index + 1}`, entry.type, "system", entry.user_id, entry.user_role, entry.related_entity_type, entry.related_entity_id, { notification_id: entry.id }, "sent", entry.created_at),
);

const sampleNotificationSettings: NotificationSettings[] = [
  notificationSettings("nsetting-buyer-1", "buyer-1"),
  notificationSettings("nsetting-sup-1", "sup-1-user"),
  notificationSettings("nsetting-admin-1", "admin-1"),
];

const sampleMessageThreads: MessageThread[] = [
  messageThread("thread-req-1-sup-1", "quote_request", "req-1", "buyer-1", "sup-1", "치킨집 포장재 견적 요청 - 서울포장 문의", "open", "2026-07-04T10:25:00.000Z"),
  messageThread("thread-req-1-sup-4", "quote_request", "req-1", "buyer-1", "sup-4", "치킨집 포장재 견적 요청 - 경기소모품센터 문의", "open", "2026-07-04T10:05:00.000Z"),
  messageThread("thread-deal-1", "deal", "deal-1", "buyer-1", "sup-1", "치킨집 포장재 거래 문의", "reported", "2026-07-04T11:22:00.000Z"),
];

const sampleMessages: Message[] = [
  message("msg-req-1", "thread-req-1-sup-1", "buyer-1", "buyer", "소스컵은 투명 제품으로 가능한가요?", "", "", false, "2026-07-04T10:01:00.000Z"),
  message("msg-req-2", "thread-req-1-sup-1", "sup-1-user", "supplier", "네, 투명 2온스 기준으로 견적드렸습니다.", "", "", false, "2026-07-04T10:13:00.000Z"),
  message("msg-req-3", "thread-req-1-sup-1", "buyer-1", "buyer", "세금계산서도 가능한가요?", "", "", false, "2026-07-04T10:20:00.000Z"),
  message("msg-req-4", "thread-req-1-sup-1", "sup-1-user", "supplier", "가능합니다.", "", "", false, "2026-07-04T10:25:00.000Z"),
  message("msg-deal-system-1", "thread-deal-1", "system", "system", "거래가 생성되었습니다.", "", "", true, "2026-07-04T10:30:00.000Z"),
  message("msg-deal-1", "thread-deal-1", "sup-1-user", "supplier", "내일 오전 10시 전 납품 가능합니다.", "", "", false, "2026-07-04T10:48:00.000Z"),
  message("msg-deal-2", "thread-deal-1", "buyer-1", "buyer", "가게 뒷문으로 납품 부탁드립니다.", "", "", false, "2026-07-04T11:02:00.000Z"),
  message("msg-deal-system-2", "thread-deal-1", "system", "system", "공급업체가 납품 준비를 시작했습니다.", "", "", true, "2026-07-04T11:18:00.000Z"),
  message("msg-deal-3", "thread-deal-1", "buyer-1", "buyer", "연락은 010으로 따로 드려도 될까요?", "", "", false, "2026-07-04T11:22:00.000Z", "text", "외부거래/연락처 의심 키워드: 010"),
];

const sampleMessageReadStates: MessageReadState[] = [
  readState("mrs-1", "thread-req-1-sup-1", "buyer-1", 1, "2026-07-04T10:12:00.000Z"),
  readState("mrs-2", "thread-req-1-sup-1", "sup-1-user", 1, "2026-07-04T10:20:00.000Z"),
  readState("mrs-3", "thread-deal-1", "buyer-1", 2, "2026-07-04T10:50:00.000Z"),
  readState("mrs-4", "thread-deal-1", "sup-1-user", 1, "2026-07-04T11:02:00.000Z"),
];

const sampleMessageReports: MessageReport[] = [
  {
    id: "mreport-1",
    thread_id: "thread-deal-1",
    message_id: "msg-deal-2",
    reported_by: "sup-1-user",
    reason: "거래 조건 위반",
    detail: "납품 위치 변경 요청 확인 필요",
    status: "pending",
    created_at: "2026-07-04T11:20:00.000Z",
    updated_at: "2026-07-04T11:20:00.000Z",
  },
];

const sampleCommissionPolicies: CommissionPolicy[] = [
  commissionPolicy("cp-food", "식자재", 0.02, 0, 0, 150000, "vat_excluded", true, "마진이 낮은 반복 매입 카테고리"),
  commissionPolicy("cp-package", "포장재", 0.04, 0, 0, 200000, "vat_excluded", true, "비교 견적 효용이 큰 카테고리"),
  commissionPolicy("cp-supplies", "소모품", 0.04, 0, 0, 200000, "vat_excluded", true, "초기 기본 수수료"),
  commissionPolicy("cp-kitchen", "주방용품", 0.03, 0, 0, 200000, "vat_excluded", true, "단발성 구매 대응"),
  commissionPolicy("cp-duct", "설비/닥트/환기자재", 0.03, 0, 0, 300000, "vat_excluded", true, "현장 상담형 거래"),
  commissionPolicy("cp-building", "건축자재", 0.02, 0, 0, 250000, "vat_excluded", true, "금액대가 큰 자재 카테고리"),
  commissionPolicy("cp-tools", "공구/산업자재", 0.03, 0, 0, 200000, "vat_excluded", true, "산업 소모성 자재"),
  commissionPolicy("cp-etc", "기타", 0.03, 0, 0, 200000, "vat_excluded", true, "기본 정책"),
];

const sampleSupplierPlans: SupplierPlan[] = [
  supplierPlan("plan-free", "무료", "free", 0, 0, 5, 20, false, false, false, "", "이메일 지원", true, 1),
  supplierPlan("plan-basic", "베이직", "basic", 49000, 490000, 30, 100, false, false, true, "베이직 파트너", "기본 지원", true, 2),
  supplierPlan("plan-pro", "프로", "pro", 99000, 990000, 200, 500, true, true, true, "프로 파트너", "우선 지원", true, 3),
  supplierPlan("plan-premium", "프리미엄", "premium", 199000, 1990000, 0, 0, true, true, true, "추천 파트너", "전담 지원", true, 4),
];

const sampleSupplierSubscriptions: SupplierSubscription[] = [
  supplierSubscription("sub-sup-1", "sup-1", "plan-pro", "active", "mock-pg", "sub_mock_sup_1"),
  supplierSubscription("sub-sup-2", "sup-2", "plan-free", "free", "", ""),
  supplierSubscription("sub-sup-3", "sup-3", "plan-basic", "active", "mock-pg", "sub_mock_sup_3"),
  supplierSubscription("sub-sup-4", "sup-4", "plan-free", "free", "", ""),
];

const sampleSupplierUsage: SupplierUsage[] = [
  supplierUsage("usage-sup-1", "sup-1", 42, 86, 18, 8, 4200000),
  supplierUsage("usage-sup-2", "sup-2", 5, 20, 6, 2, 1240000),
  supplierUsage("usage-sup-3", "sup-3", 12, 34, 9, 3, 3750000),
  supplierUsage("usage-sup-4", "sup-4", 4, 12, 3, 1, 330000),
];

const sampleQuoteParticipationCredits: QuoteParticipationCredit[] = [
  quoteCredit("credit-sup-1-monthly", "sup-1", "free_monthly", 200, 42, "2026-07-31"),
  quoteCredit("credit-sup-2-monthly", "sup-2", "free_monthly", 5, 5, "2026-07-31"),
  quoteCredit("credit-sup-3-monthly", "sup-3", "free_monthly", 30, 12, "2026-07-31"),
  quoteCredit("credit-sup-4-promo", "sup-4", "promotion", 10, 4, "2026-08-31"),
];

const samplePlatformFees: PlatformFee[] = [
  platformFee("fee-deal-1", "deal-1", "sup-1", "buyer-1", "포장재", 420000, 0.04, 16800, "pending", "settlement-sup-1-july", "direct_supplier_payment"),
  platformFee("fee-deal-2", "deal-2", "sup-2", "buyer-2", "식자재", 780000, 0.02, 15600, "confirmed", "settlement-sup-2-july", "direct_supplier_payment"),
  platformFee("fee-deal-3", "deal-3", "sup-3", "buyer-1", "설비/닥트/환기자재", 1250000, 0.03, 37500, "pending", "settlement-sup-3-july", "direct_supplier_payment"),
  platformFee("fee-deal-4", "deal-4", "sup-4", "buyer-1", "소모품", 330000, 0.04, 13200, "waived", "settlement-sup-4-july", "offline", true, "초기 입점 프로모션", "admin-1", "2026-07-04T12:20:00.000Z"),
];

const sampleSettlements: Settlement[] = [
  settlement("settlement-sup-1-july", "sup-1", 420000, 16800, "pending", "2026-08-05", "7월 플랫폼 이용 수수료 확인 필요"),
  settlement("settlement-sup-2-july", "sup-2", 780000, 15600, "confirmed", "2026-08-05", "식자재 거래 수수료 확정"),
  settlement("settlement-sup-3-july", "sup-3", 1250000, 37500, "pending", "2026-08-05", "닥트자재 거래 수수료 예정"),
  settlement("settlement-sup-4-july", "sup-4", 330000, 0, "draft", "2026-08-05", "초기 입점 프로모션 면제"),
];

const sampleSettlementItems: SettlementItem[] = [
  settlementItem("sitem-1", "settlement-sup-1-july", "deal-1", "fee-deal-1", 420000, 16800),
  settlementItem("sitem-2", "settlement-sup-2-july", "deal-2", "fee-deal-2", 780000, 15600),
  settlementItem("sitem-3", "settlement-sup-3-july", "deal-3", "fee-deal-3", 1250000, 37500),
  settlementItem("sitem-4", "settlement-sup-4-july", "deal-4", "fee-deal-4", 330000, 0),
];

const sampleBillingAccounts: BillingAccount[] = [
  billingAccount("ba-sup-1", "sup-1", "billing@seoulpack.local", "120-81-55221", "이포장", "010-2222-1100", "tax@seoulpack.local", "pending", "none", ""),
  billingAccount("ba-sup-2", "sup-2", "bill@food.local", "204-86-77891", "박식자재", "010-2222-2200", "tax@food.local", "none", "none", ""),
  billingAccount("ba-sup-3", "sup-3", "billing@duct.local", "303-90-11842", "최닥트", "010-2222-3300", "tax@duct.local", "connected", "bank_transfer", "cus_mock_sup_3"),
];

const sampleBillingEvents: BillingEvent[] = [
  billingEvent("bevent-1", "platform_fee_created", "sup-1", "deal-1", "", 16800, "pending", { fee_id: "fee-deal-1" }),
  billingEvent("bevent-2", "subscription_mock_cycle", "sup-1", "", "sub-sup-1", 99000, "mocked", { plan: "프로" }),
  billingEvent("bevent-3", "platform_fee_waived", "sup-4", "deal-4", "", 13200, "waived", { reason: "초기 입점 프로모션" }),
];

const sampleReports: Report[] = [
  operationReport("report-1", "buyer-1", "buyer", "sup-1-user", "supplier", "delivery_issue", "deal", "deal-1", "납품 시간이 지연되었습니다.", "오전 10시 납품 약속이었는데 아직 도착하지 않았습니다.", "공급업체와 조율 요청", "reviewing", "high", "admin-1", "서울포장과 납품 기사 확인 중입니다.", ""),
  operationReport("report-2", "buyer-2", "buyer", "sup-2-user", "supplier", "quality_issue", "deal", "deal-2", "식자재 품목 일부가 누락되었습니다.", "양파 1망이 거래명세서에는 있으나 실제 납품에서 누락되었습니다.", "품목 누락 확인 요청", "submitted", "normal", "admin-1", "", ""),
  operationReport("report-3", "buyer-1", "buyer", "sup-1-user", "supplier", "message_report", "message", "msg-deal-2", "외부 결제 유도 의심 메시지", "계좌 직거래를 유도하는 표현이 있어 운영팀 확인이 필요합니다.", "관리자 확인 요청", "submitted", "urgent", "admin-1", "", ""),
];

const sampleReportAttachments: ReportAttachment[] = [
  reportAttachment("rattach-1", "report-1", "납품지연_대화캡처.png", "png", "buyer-1"),
  reportAttachment("rattach-2", "report-2", "누락품목_사진.jpg", "jpg", "buyer-2"),
];

const sampleReportActions: ReportAction[] = [
  reportAction("raction-1", "report-1", "status_change", "admin-1", "admin", "submitted", "reviewing", "운영자가 검토를 시작했습니다.", "2026-07-04T12:30:00.000Z"),
  reportAction("raction-2", "report-1", "request_more_info", "admin-1", "admin", "reviewing", "need_more_info", "납품 예정 시간 증빙을 요청했습니다.", "2026-07-04T12:42:00.000Z"),
  reportAction("raction-3", "report-3", "memo", "admin-1", "admin", "submitted", "submitted", "메시지 원문 확인 필요", "2026-07-04T12:50:00.000Z"),
];

const sampleReportComments: ReportComment[] = [
  reportComment("rcomment-1", "report-1", "buyer-1", "buyer", "매장 오픈 전이라 빠른 확인 부탁드립니다.", false, "2026-07-04T12:35:00.000Z"),
  reportComment("rcomment-2", "report-1", "admin-1", "admin", "기사 연락처 확인 후 사용자에게 안내 예정", true, "2026-07-04T12:44:00.000Z"),
];

const sampleReviews: Review[] = [
  review("review-new-1", "deal-1", "req-1", "buyer-1", "sup-1", 4.8, 4.7, 4.9, 4.8, 4.9, "납품이 빠르고 포장재 품질도 괜찮았습니다.", true, true, "active", "2026-07-04T13:00:00.000Z"),
  review("review-new-2", "deal-2", "req-2", "buyer-2", "sup-2", 4.5, 4.6, 4.2, 4.7, 4.4, "새벽 배송은 좋았지만 일부 품목 확인이 필요했습니다.", true, true, "active", "2026-07-04T13:10:00.000Z"),
  review("review-new-3", "deal-3", "req-3", "buyer-1", "sup-3", 4.9, 4.8, 4.9, 5, 4.8, "현장 규격 상담이 꼼꼼했고 자재 품질도 만족스럽습니다.", true, true, "active", "2026-07-04T13:20:00.000Z"),
];

const sampleReviewReplies: ReviewReply[] = [
  reviewReply("reply-1", "review-new-1", "sup-1", "이용해 주셔서 감사합니다. 다음 납품도 일정에 맞춰 준비하겠습니다.", "active", "2026-07-04T13:25:00.000Z"),
];

const sampleReviewReports: ReviewReport[] = [
  reviewReport("review-report-1", "review-new-2", "sup-2-user", "사실과 다른 내용", "누락 품목은 당일 재배송 완료했습니다.", "pending", "2026-07-04T13:30:00.000Z"),
];

const sampleSupplierReputationScores: SupplierReputationScore[] = [
  reputationScore("rep-sup-1", "sup-1", 92, 18, 19, 19, 8, 15, 13, ["승인업체", "빠른응답", "후기 우수", "거래완료 우수"]),
  reputationScore("rep-sup-2", "sup-2", 78, 15, 16, 17, 5, 15, 10, ["세금계산서 가능", "당일배송 가능"]),
  reputationScore("rep-sup-3", "sup-3", 94, 18, 20, 20, 9, 15, 12, ["승인업체", "현장 상담 우수", "후기 우수"]),
  reputationScore("rep-sup-4", "sup-4", 64, 10, 13, 13, 4, 15, 9, ["승인업체"]),
];

const sampleUserSanctions: UserSanction[] = [
  userSanction("sanction-1", "sup-1-user", "supplier", "warning", "외부 결제 유도 표현 경고", "report-3", "active", "2026-07-04", "2026-08-04"),
  userSanction("sanction-2", "sup-4-user", "supplier", "message_restriction", "반복 부적절 메시지로 3일 제한", "report-3", "active", "2026-07-04", "2026-07-07"),
  userSanction("sanction-3", "sup-2-user", "supplier", "quote_restriction", "품목 누락 반복 확인 전 견적 제한", "report-2", "active", "2026-07-04", "2026-07-11"),
];

const sampleBlacklistEntries: BlacklistEntry[] = [
  blacklistEntry("blacklist-1", "business_number", "000-00-00000", "테스트 거래처 차단 예시", "active"),
  blacklistEntry("blacklist-2", "email", "spam@supplier.local", "스팸 가입 시도", "active"),
];

const sampleFeedbacks: BetaFeedback[] = [
  betaFeedback("feedback-1", "buyer-1", "buyer", "usability", "모바일 견적요청 단계가 길게 느껴집니다.", "사진 업로드 후 다음 단계로 넘어가는 버튼이 더 눈에 띄면 좋겠습니다.", "/app/requests/new", "", "reviewing", "모바일 CTA 강조 검토"),
  betaFeedback("feedback-2", "sup-1-user", "supplier", "feature_request", "견적 복사 기능이 필요합니다.", "지난 견적을 복사해서 단가만 수정하면 빠르게 응답할 수 있을 것 같습니다.", "/app/supplier/quotes", "", "planned", "11단계 이후 backlog"),
  betaFeedback("feedback-3", "admin-1", "admin", "bug", "정산 화면 모바일 테이블 확인 필요", "작은 화면에서 정산 테이블 가로 스크롤 안내가 필요합니다.", "/app/admin/settlements", "", "submitted", ""),
];

const sampleQaChecklists: QaChecklistItem[] = [
  qaChecklist("qa-1", "구매자 기능", "견적요청 생성 가능", "필수 품목, 납품 지역, 희망일 입력 후 요청이 생성되는지 확인", "passed", "기본 시나리오 통과"),
  qaChecklist("qa-2", "구매자 기능", "견적 비교와 선택 가능", "도착한 견적의 금액, 납품일, 증빙 조건 비교 후 선택", "unchecked", ""),
  qaChecklist("qa-3", "공급업체 기능", "입점 승인 상태 표시", "pending/needs_revision/rejected/suspended 문구와 CTA 확인", "passed", "상태 안내 문구 확인"),
  qaChecklist("qa-4", "공급업체 기능", "견적 제출 가능", "요금제 한도, 필수 금액, 유효기간 검증", "unchecked", ""),
  qaChecklist("qa-5", "관리자 기능", "공급업체 승인 가능", "승인/보완/반려/제한 상태 변경", "unchecked", ""),
  qaChecklist("qa-6", "견적/거래 흐름", "거래 상태 변경 가능", "수락, 납품 준비, 배송, 완료, 신고 흐름", "passed", "거래 상세 버튼 확인"),
  qaChecklist("qa-7", "자료분석 흐름", "샘플 분석 변환 가능", "분석 결과를 견적요청과 구매내역으로 전환", "unchecked", ""),
  qaChecklist("qa-8", "알림/메시지", "알림 읽음/문의 전송 가능", "구매자/공급업체/관리자 알림과 메시지 스레드 확인", "unchecked", ""),
  qaChecklist("qa-9", "신고/후기/신뢰도", "신고 처리와 후기 관리 가능", "신고 상태 변경, 제재, 후기 숨김/공개 확인", "passed", "9단계 라우트 검증 완료"),
  qaChecklist("qa-10", "수익화/정산 샘플", "수수료와 정산 상태 확인", "정산 상태 변경과 수수료 면제 처리", "unchecked", ""),
  qaChecklist("qa-11", "모바일 반응형", "하단 탭과 주요 화면 깨짐 없음", "360px~768px에서 홈, 견적, 거래, 관리자 테이블 확인", "failed", "정산/관리자 테이블 모바일 추가 확인 필요"),
  qaChecklist("qa-12", "정책/약관", "베타 정책 화면 접근 가능", "약관, 개인정보, 운영정책, 안전거래, 베타 안내 링크 확인", "unchecked", ""),
  qaChecklist("qa-13", "보안/권한", "권한 없음 화면 확인", "역할별 화면 접근 제한 안내 확인", "skipped", "실제 auth 도입 후 재점검"),
  qaChecklist("qa-14", "배포/환경변수", "빌드와 환경 구분 확인", "샘플/demo와 beta/production 데이터 경계 표시", "unchecked", ""),
];

const sampleBetaTargets: BetaTarget[] = [
  {
    id: "beta-target-2026-07",
    period_start: "2026-07-01",
    period_end: "2026-07-31",
    target_buyers: 100,
    target_suppliers: 30,
    target_quote_requests: 50,
    target_quotes: 150,
    target_deals: 15,
    target_completed_deals: 5,
    target_feedbacks: 30,
    target_repeat_buyers: 20,
    target_active_suppliers: 20,
    notes: "7월 제한 베타: 구매자 100명, 승인 공급업체 30곳, 거래 15건 검증",
    created_at: now,
    updated_at: now,
  },
];

const sampleBetaParticipants: BetaParticipant[] = [
  betaParticipant("bp-buyer-1", "buyer", "active", "direct_sales", "buyer-1", "월계치킨", "김사장", "010-1111-2222", "owner@ssawa.local", "서울 노원구", "포장재", "첫 요청 완료, 포장재 단가 비교 니즈 높음", 2, 1, 1, 1, ["치킨집", "반복사용 가능성 높음"]),
  betaParticipant("bp-buyer-2", "buyer", "active", "referral", "buyer-2", "고깃집오늘", "박대표", "010-3333-4444", "meat@ssawa.local", "경기 성남시", "식자재", "식자재 새벽납품 테스트 중", 1, 1, 1, 0, ["고깃집", "세금계산서 중요"]),
  betaParticipant("bp-buyer-3", "buyer", "onboarded", "community", undefined, "성수카페", "이매니저", "010-4545-2020", "cafe@ssawa.local", "서울 성동구", "포장재, 소모품", "거래명세서 업로드 테스트 예정", 0, 0, 0, 1, ["카페", "첫 요청 유도 필요"]),
  betaParticipant("bp-buyer-4", "buyer", "invited", "landing", undefined, "강남치킨", "최점주", "010-5656-3030", "gangnam@ssawa.local", "서울 강남구", "포장재", "초대 링크 발송, 전화 후속 필요", 0, 0, 0, 0, ["초대", "연락 필요"]),
  betaParticipant("bp-buyer-5", "buyer", "signed_up", "partner", undefined, "동네문구깍집", "오대표", "010-6767-4040", "corner@ssawa.local", "서울 동작구", "소모품", "가입 완료, 첫 요청 작성 중단", 0, 0, 0, 0, ["이탈 위험", "첫 요청 보조"]),
  betaParticipant("bp-supplier-1", "supplier", "active", "direct_sales", "sup-1-user", "서울포장", "최민지", "010-1111-3001", "sup-1@supplier.ssawa.local", "서울 동대문구", "포장재", "응답 빠름, 포장재 초기 집중 카테고리 후보", 0, 0, 1, 1, ["빠른응답", "유료전환 후보"]),
  betaParticipant("bp-supplier-2", "supplier", "active", "direct_sales", "sup-2-user", "동대문식자재", "김소연", "010-2222-3002", "sup-2@supplier.ssawa.local", "서울 동대문구", "식자재", "새벽배송 강점, 첫 견적 제출 완료", 0, 0, 1, 0, ["식자재", "응답 안정"]),
  betaParticipant("bp-supplier-3", "supplier", "active", "manual", "sup-3-user", "충주닥트자재", "파트너 담당자", "010-0000-0000", "sup-3@supplier.ssawa.local", "충북 충주시", "설비/닥트/환기자재", "현장 상담 우수, 고단가 카테고리 검증", 0, 0, 1, 0, ["고단가", "현장상담"]),
  betaParticipant("bp-supplier-4", "supplier", "onboarded", "direct_sales", "sup-5-user", "서울주방파트너", "파트너 담당자", "010-0000-0000", "sup-5@supplier.ssawa.local", "서울 성동구", "주방용품", "자료 보완 후 승인 예정", 0, 0, 0, 0, ["승인 대기", "자료 보완"]),
  betaParticipant("bp-supplier-5", "supplier", "inactive", "community", "sup-6-user", "한강포장물류", "파트너 담당자", "010-0000-0000", "sup-6@supplier.ssawa.local", "서울 강서구", "포장재", "통장사본 반려 후 응답 지연", 0, 0, 0, 0, ["이탈 위험", "보완 요청"]),
];

const sampleSalesLeads: SalesLead[] = [
  salesLead("lead-1", "buyer", "강남치킨", "최점주", "010-5656-3030", "gangnam@ssawa.local", "서울 강남구", "포장재", "landing", "invited", "high", "초대 링크 확인 전화", "2026-07-05", "포장재 단가 비교 니즈 강함"),
  salesLead("lead-2", "buyer", "성수카페", "이매니저", "010-4545-2020", "cafe@ssawa.local", "서울 성동구", "포장재", "community", "onboarded", "normal", "거래명세서 업로드 안내", "2026-07-06", "첫 요청까지 운영자 보조 필요"),
  salesLead("lead-3", "supplier", "동대문식자재", "김소연", "010-2222-3002", "sup-2@supplier.ssawa.local", "서울 동대문구", "식자재", "direct_sales", "active", "high", "유료 전환 의향 인터뷰", "2026-07-08", "새벽배송 강점"),
  salesLead("lead-4", "supplier", "서울주방파트너", "파트너 담당자", "010-0000-0000", "sup-5@supplier.ssawa.local", "서울 성동구", "주방용품", "direct_sales", "onboarded", "urgent", "사업자 자료 보완 요청", "2026-07-05", "승인 지연 방지 필요"),
  salesLead("lead-5", "supplier", "서부산업공구", "파트너 담당자", "010-0000-0000", "sup-8@supplier.ssawa.local", "경기 하남시", "공구/산업자재", "manual", "contacted", "normal", "정책 위반 이슈 확인", "2026-07-09", "운영 제한 상태"),
];

const sampleSalesActivities: SalesActivity[] = [
  salesActivity("activity-1", "lead-1", "call", "interested", "기존 포장재 거래명세서 업로드를 안내했고 베타 무료 테스트에 관심 있음", "2026-07-04T10:10:00.000Z"),
  salesActivity("activity-2", "lead-2", "kakao", "need_follow_up", "사진 업로드 방법 캡처 안내 필요", "2026-07-04T11:20:00.000Z"),
  salesActivity("activity-3", "lead-3", "meeting", "success", "거래 수수료보다 월 구독 선호. 5곳 이상 요청이 들어오면 유료 검토 가능", "2026-07-04T13:10:00.000Z"),
  salesActivity("activity-4", "lead-4", "sms", "no_answer", "사업자등록증 재업로드 요청 문자 발송", "2026-07-04T15:30:00.000Z"),
  salesActivity("activity-5", "lead-5", "note", "need_follow_up", "외부 결제 유도 표현 교육 필요", "2026-07-04T16:40:00.000Z"),
];

const sampleBetaExperiments: BetaExperiment[] = [
  betaExperiment("exp-1", "거래명세서 업로드 첫 요청 유도", "기존 거래명세서 업로드 CTA를 강조하면 첫 견적요청 전환율이 오른다.", "buyers", "running", "첫 요청 전환율 30% 이상", "성수카페, 강남치킨 대상으로 테스트 중", "CTA 문구를 포장재/식자재별로 분리"),
  betaExperiment("exp-2", "공급업체 무료 입점 캠페인", "초기 무료 입점과 첫 거래 데이터 제공이 공급업체 가입률을 높인다.", "suppliers", "running", "입점 신청률 20% 이상", "5곳 중 2곳 자료 보완 단계", "자료 보완 안내 문구 정리"),
  betaExperiment("exp-3", "포장재 집중 카테고리 검증", "치킨/카페 포장재는 요청-응답 균형이 가장 빠르게 맞는다.", "both", "planned", "요청당 평균 견적 3개 이상", "서울포장, 한강포장물류 응답률 비교 예정", "포장재 공급업체 5곳 추가 컨택"),
];

const sampleBetaFeedbackInsights: BetaFeedbackInsight[] = [
  feedbackInsight("insight-1", "feedback-1", "ux", "high", 5, 4, 2, "do_now", "모바일 견적요청 CTA와 단계 안내를 14단계 우선순위에 반영"),
  feedbackInsight("insight-2", "feedback-2", "feature_request", "normal", 4, 3, 3, "do_later", "공급업체 반복 견적 UX 개선 후보"),
  feedbackInsight("insight-3", "feedback-3", "bug", "normal", 3, 2, 2, "needs_research", "관리자 테이블 모바일 가로 스크롤 검수 필요"),
];

const sampleOperatorTasks: OperatorTask[] = [
  operatorTask("task-1", "서울주방파트너 사업자자료 보완 요청", "승인 대기 업체의 사업자등록증과 가격표 보완을 요청합니다.", "supplier_onboarding", "todo", "urgent", "supplier", "sup-5", "2026-07-05"),
  operatorTask("task-2", "강남치킨 첫 견적요청 전화 보조", "초대 링크 발송 후 포장재 첫 요청 등록까지 안내합니다.", "buyer_followup", "doing", "high", "lead", "lead-1", "2026-07-05"),
  operatorTask("task-3", "무견적 요청 공급업체 수동 매칭", "닥트/환기자재 요청에 추가 공급업체 2곳을 수동 매칭합니다.", "sales", "todo", "high", "quote_request", "req-3", "2026-07-05"),
  operatorTask("task-4", "정산 화면 모바일 QA", "베타 QA 체크리스트 실패 항목을 모바일에서 재검수합니다.", "qa", "doing", "normal", "qa", "qa-11", "2026-07-07"),
  operatorTask("task-5", "유료 전환 의향 인터뷰 5곳 예약", "활성 공급업체 대상으로 월 구독/거래 수수료 선호를 확인합니다.", "report", "todo", "normal", "experiment", "exp-2", "2026-07-10"),
];

const sampleBusinessValidationReports: BusinessValidationReport[] = [
  {
    id: "bvr-1",
    period_start: "2026-07-01",
    period_end: "2026-07-07",
    summary: "초기 베타는 포장재와 식자재에서 요청-응답 균형이 가장 빠르게 형성되고 있습니다.",
    buyer_findings: "구매자는 거래명세서 업로드와 기존 단가 비교에 반응합니다. 첫 요청 작성 중단 구간은 모바일 CTA와 품목 입력 단계입니다.",
    supplier_findings: "공급업체는 무료 입점보다 실제 요청 수와 응답 후 선택 가능성에 더 민감합니다.",
    kpi_findings: "요청당 평균 견적과 첫 견적 도착 시간은 초기 검증 핵심 지표이며, 무견적 요청은 운영자가 즉시 개입해야 합니다.",
    risk_findings: "승인 대기 공급업체 자료 보완 지연과 관리자 테이블 모바일 QA가 베타 운영 리스크입니다.",
    recommendation: "포장재를 1차 집중 카테고리로 두고, 구매자 첫 요청 유도와 공급업체 응답 교육을 동시에 강화합니다.",
    decision: "continue",
    keep_features: ["견적요청", "견적비교", "공급업체 매칭", "빠른 재요청"],
    reduce_features: ["복잡한 정산 리포트", "전체 카테고리 동시 확장"],
    hide_features: ["정산 고급 리포트", "건축자재 전국 확장", "상용 AI 자동화 메뉴"],
    strengthen_features: ["견적 미도착 대응", "포장재 템플릿", "공급업체 응답 독려", "반복 요청 UX"],
    focus_category: "포장재",
    priority_regions: ["서울", "경기"],
    priority_buyer_segments: ["치킨집", "카페", "배달전문점"],
    next_product_priorities: ["수동 매칭 보조", "빠른 재요청", "자주 쓰는 품목 묶음"],
    next_sales_priorities: ["포장재 공급업체 10곳 추가 확보", "치킨집/카페 첫 요청 캠페인"],
    monetization_validation_status: "공급업체는 실제 요청 수가 보일 때 성과형 또는 월 구독 검토 의향이 있습니다.",
    launch_blockers: ["무견적 요청 12시간 초과 방지", "첫 요청 작성 중단 구간 축소", "포장재 공급업체 응답 안정화"],
    created_by: "admin-1",
    created_at: now,
    updated_at: now,
  },
];

const sampleFocusSettings: FocusSetting[] = [
  {
    id: "focus-1",
    focus_category_name: "포장재",
    focus_region: "서울/경기",
    focus_mode_enabled: true,
    buyer_home_message: "배달용기, 컵, 봉투 견적을 빠르게 받아보세요.",
    supplier_home_message: "포장재 견적요청이 늘고 있습니다. 빠른 견적으로 신규 거래처를 확보하세요.",
    priority_template_names: ["치킨집 포장재 기본세트", "카페 포장재 기본세트"],
    created_at: now,
    updated_at: now,
  },
];

const sampleFeatureFlags: FeatureFlag[] = [
  featureFlag("flag-1", "enable_analysis", "자료 자동분석", "OCR/AI 분석 샘플 메뉴", true, true, false),
  featureFlag("flag-2", "enable_accounting_sync", "오늘장사 장부 연동", "구매내역 장부 반영 준비", true, true, false),
  featureFlag("flag-3", "enable_supplier_billing", "공급업체 요금제", "요금제/이용현황 샘플", true, true, false),
  featureFlag("flag-4", "enable_settlements", "정산 관리", "정산 예정 내역과 수수료 관리", true, true, true),
  featureFlag("flag-5", "enable_reviews", "후기/평점", "거래 후기와 공급업체 신뢰도", true, false, false),
  featureFlag("flag-6", "enable_reports", "신고/분쟁", "안전거래 신고와 운영 처리", true, false, false),
  featureFlag("flag-7", "enable_messages", "문의 스레드", "요청/거래별 메시지", true, false, false),
  featureFlag("flag-8", "enable_beta_kpi", "베타 KPI", "관리자 KPI와 사업검증", true, false, true),
  featureFlag("flag-9", "enable_quick_reorder", "빠른 재요청", "지난 요청/구매 기반 재견적", true, false, false),
  featureFlag("flag-10", "enable_favorite_items", "자주 쓰는 품목", "반복 구매 품목 묶음", true, false, false),
];

const sampleFavoriteItemGroups: FavoriteItemGroup[] = [
  favoriteItemGroup("fav-group-1", "buyer-1", "치킨집 포장재 기본세트", "포장재", "월계치킨이 매월 반복 구매하는 포장재 묶음"),
  favoriteItemGroup("fav-group-2", "buyer-1", "카페 포장재 기본세트", "포장재", "성수카페 온보딩에 추천할 컵/뚜껑/캐리어 묶음"),
];

const sampleFavoriteItems: FavoriteItem[] = [
  favoriteItem("fav-item-1", "fav-group-1", "치킨박스", "무지 10호", 1000, "개", "인쇄 없음", true),
  favoriteItem("fav-item-2", "fav-group-1", "소스컵", "70ml+뚜껑", 2000, "개", "뚜껑 포함", true),
  favoriteItem("fav-item-3", "fav-group-1", "배달봉투 대형", "무지", 1000, "장", "두께 확인", true),
  favoriteItem("fav-item-4", "fav-group-1", "나무젓가락", "일회용", 1000, "개", "", true),
  favoriteItem("fav-item-5", "fav-group-1", "물티슈", "개별 포장", 1000, "개", "", true),
  favoriteItem("fav-item-6", "fav-group-2", "아이스컵", "16oz", 1000, "개", "PET", true),
  favoriteItem("fav-item-7", "fav-group-2", "컵뚜껑", "16oz 돔리드", 1000, "개", "", true),
  favoriteItem("fav-item-8", "fav-group-2", "빨대", "개별 포장", 1000, "개", "", true),
  favoriteItem("fav-item-9", "fav-group-2", "컵홀더", "무지", 1000, "개", "", true),
  favoriteItem("fav-item-10", "fav-group-2", "캐리어", "2구", 500, "개", "", true),
];

const sampleCategoryPlaybooks: CategoryPlaybook[] = [
  categoryPlaybook(
    "playbook-1",
    "포장재",
    ["치킨집", "카페", "배달전문점", "디저트샵"],
    ["포장재 도매", "배달용기 전문", "인쇄 포장재 업체"],
    ["배달용기", "치킨박스", "소스컵", "아이스컵", "봉투", "컵홀더", "캐리어"],
    "기존 포장재 거래명세서만 올리면 같은 품목을 더 좋은 조건으로 비교합니다.",
    ["반복구매 고객 확보", "초기 무료 입점", "실제 견적요청 기반 신규 거래처"],
    "기존 포장재 거래명세서만 올려보세요. 같은 품목 더 좋은 견적을 비교해드립니다.",
    ["규격 불명확", "인쇄 여부 누락", "배송비 조건 누락"],
    ["템플릿에서 규격 필드 강조", "인쇄 여부 질문 추가", "배송비 포함 여부 필수 확인"],
    ["요청당 견적 3개 이상", "첫 견적 3시간 이내", "선택률 35% 이상"],
  ),
  categoryPlaybook(
    "playbook-2",
    "식자재",
    ["고깃집", "분식집", "한식당"],
    ["식자재 도매", "새벽배송 가능 업체", "지역 농수산 납품업체"],
    ["육류", "채소", "소스류", "식용유", "쌈장"],
    "납품 시간과 세금계산서 조건을 먼저 확인하는 식자재 견적 템플릿",
    ["새벽배송 수요", "정기 거래 가능성", "가격 변동 비교 니즈"],
    "주말 장사 전 필요한 식자재를 한 번에 비교하세요.",
    ["시세 변동", "새벽배송 가능 여부", "최소 주문금액"],
    ["납품 가능 시간 필수 입력", "시세 변동 안내", "최소 주문금액 표시"],
    ["첫 견적 6시간 이내", "반복 요청 20% 이상", "공급업체 8곳 확보"],
  ),
  categoryPlaybook(
    "playbook-3",
    "설비/닥트/환기자재",
    ["음식점 주방", "공사현장", "설비 보수 업체"],
    ["닥트 자재상", "환기 설비 업체", "현장 상담 가능 업체"],
    ["스파이럴덕트", "후렉시블", "디퓨저", "환풍기"],
    "현장 사진과 규격을 함께 올리는 설비자재 견적 템플릿",
    ["고단가 거래", "현장 상담 기반 신뢰 확보", "반복 보수 수요"],
    "현장 사진만 올려도 규격 상담 가능한 업체를 찾아드립니다.",
    ["규격 호환성", "현장 방문 필요", "배송/설치 구분"],
    ["사진 업로드 유도", "현장 상담 여부 표시", "설치 포함 여부 확인"],
    ["추천 업체 2곳 이상", "상담 응답 24시간 이내", "거래금액 100만원 이상"],
  ),
];

const sampleProductCategories: ProductCategory[] = [
  { id: "pcat-packaging", parent_id: "cat-2", name: "포장재", slug: "packaging", sort_order: 10, is_active: true, created_at: now, updated_at: now },
  { id: "pcat-food", parent_id: "cat-1", name: "식자재", slug: "food-materials", sort_order: 20, is_active: true, created_at: now, updated_at: now },
  { id: "pcat-consumable", parent_id: "cat-4", name: "소모품", slug: "consumables", sort_order: 30, is_active: true, created_at: now, updated_at: now },
  { id: "pcat-facility", parent_id: "cat-5", name: "설비/닥트", slug: "facility-duct", sort_order: 40, is_active: true, created_at: now, updated_at: now },
];

const sampleSupplierStoreProfiles: SupplierStoreProfile[] = [
  {
    id: "store-sup-1",
    supplier_id: "sup-1",
    store_name: "서울포장 상품관",
    store_description: "강남·성동권 식당에서 자주 쓰는 포장재와 소모품을 빠르게 안내합니다.",
    store_logo_url: "/아이콘.png",
    store_banner_url: "",
    main_categories: ["포장재", "소모품"],
    delivery_regions: ["서울 강남구", "서울 성동구", "서울 중구"],
    business_hours_text: "평일 09:00-18:00, 긴급 납품은 문의",
    contact_policy_text: "상품 문의 후 수량과 납품지를 확인해 최종 조건을 안내합니다.",
    return_policy_text: "인쇄/맞춤 상품은 제작 전 확인 후 진행합니다.",
    is_public: true,
    created_at: now,
    updated_at: now,
  },
  {
    id: "store-sup-2",
    supplier_id: "sup-2",
    store_name: "동대문식자재 상품관",
    store_description: "채소와 냉장 식자재를 매장 단위로 견적 안내합니다.",
    store_logo_url: "/아이콘.png",
    store_banner_url: "",
    main_categories: ["식자재"],
    delivery_regions: ["서울 동대문구", "서울 중랑구", "서울 성북구"],
    business_hours_text: "새벽 입고 후 오전 납품 중심",
    contact_policy_text: "단가 변동 품목은 견적 문의로 확인합니다.",
    return_policy_text: "신선식품 특성상 납품 당일 확인이 필요합니다.",
    is_public: true,
    created_at: now,
    updated_at: now,
  },
  {
    id: "store-sup-3",
    supplier_id: "sup-3",
    store_name: "충주닥트자재 상품관",
    store_description: "주방 배기와 닥트 보수에 필요한 기본 자재를 안내합니다.",
    store_logo_url: "/아이콘.png",
    store_banner_url: "",
    main_categories: ["설비/닥트"],
    delivery_regions: ["충북 충주시", "충북 음성군", "충북 제천시"],
    business_hours_text: "현장 규격 확인 후 납품",
    contact_policy_text: "규격이 필요한 상품은 사진과 치수를 함께 보내주세요.",
    return_policy_text: "절단·가공 자재는 발주 후 취소가 제한됩니다.",
    is_public: true,
    created_at: now,
    updated_at: now,
  },
];

const sampleSupplierProducts: SupplierProduct[] = [
  {
    id: "prod-1",
    supplier_id: "sup-1",
    category_id: "pcat-packaging",
    title: "치킨 박스 무지 1000매",
    short_description: "배달 포장용 기본 박스, 매장 로고 스티커와 함께 쓰기 좋습니다.",
    description: "치킨·분식 매장에서 반복 구매하는 무지 박스입니다. 대량 구매 시 인쇄 옵션과 묶음 견적을 별도 안내합니다.",
    main_image_url: "/아이콘.png",
    image_urls: [],
    sku: "PACK-CHICKEN-1000",
    brand: "서울포장",
    origin: "국내",
    unit_label: "박스",
    package_unit: "1000매",
    min_order_quantity: 1,
    price_type: "from_price",
    price: 0,
    from_price: 68000,
    vat_included: true,
    delivery_fee_type: "conditional",
    delivery_fee_amount: 3000,
    available_regions: ["서울 강남구", "서울 성동구", "서울 중구"],
    tax_invoice_available: true,
    card_payment_available: true,
    safe_trade_available: true,
    stock_status: "in_stock",
    lead_time_text: "평일 기준 1-2일",
    is_featured: true,
    is_public: true,
    approval_status: "approved",
    rejection_reason: "",
    view_count: 184,
    inquiry_count: 7,
    quote_add_count: 12,
    order_request_count: 4,
    favorite_count: 9,
    created_at: now,
    updated_at: now,
  },
  {
    id: "prod-2",
    supplier_id: "sup-1",
    category_id: "pcat-packaging",
    title: "배달 봉투 대형 1000장",
    short_description: "배달 주문 많은 매장에서 자주 쓰는 대형 봉투입니다.",
    description: "대형 봉투는 두께와 손잡이 형태에 따라 단가가 달라질 수 있어 수량별 견적 문의를 권장합니다.",
    main_image_url: "/아이콘.png",
    image_urls: [],
    sku: "BAG-L-1000",
    brand: "서울포장",
    origin: "국내",
    unit_label: "묶음",
    package_unit: "1000장",
    min_order_quantity: 1,
    price_type: "quote_only",
    price: 0,
    from_price: 0,
    vat_included: true,
    delivery_fee_type: "quote",
    delivery_fee_amount: 0,
    available_regions: ["서울 강남구", "서울 성동구", "서울 중구"],
    tax_invoice_available: true,
    card_payment_available: true,
    safe_trade_available: true,
    stock_status: "made_to_order",
    lead_time_text: "재고 확인 후 안내",
    is_featured: false,
    is_public: true,
    approval_status: "approved",
    rejection_reason: "",
    view_count: 96,
    inquiry_count: 5,
    quote_add_count: 6,
    order_request_count: 2,
    favorite_count: 4,
    created_at: now,
    updated_at: now,
  },
  {
    id: "prod-3",
    supplier_id: "sup-2",
    category_id: "pcat-food",
    title: "국내산 양파 15kg",
    short_description: "식당 기본 식자재, 당일 시세 기준 견적 안내",
    description: "국내산 양파 15kg 박스 상품입니다. 시장 시세 변동이 있어 시작가로 안내하며, 납품일 기준 최종 단가를 확정합니다.",
    main_image_url: "/아이콘.png",
    image_urls: [],
    sku: "FOOD-ONION-15KG",
    brand: "동대문식자재",
    origin: "국내",
    unit_label: "망",
    package_unit: "15kg",
    min_order_quantity: 1,
    price_type: "from_price",
    price: 0,
    from_price: 26000,
    vat_included: true,
    delivery_fee_type: "included",
    delivery_fee_amount: 0,
    available_regions: ["서울 동대문구", "서울 중랑구", "서울 성북구"],
    tax_invoice_available: true,
    card_payment_available: false,
    safe_trade_available: true,
    stock_status: "low_stock",
    lead_time_text: "오전 주문 시 당일 가능",
    is_featured: true,
    is_public: true,
    approval_status: "approved",
    rejection_reason: "",
    view_count: 143,
    inquiry_count: 8,
    quote_add_count: 10,
    order_request_count: 5,
    favorite_count: 11,
    created_at: now,
    updated_at: now,
  },
  {
    id: "prod-4",
    supplier_id: "sup-3",
    category_id: "pcat-facility",
    title: "스파이럴 닥트 300파이 10m",
    short_description: "주방 배기 보수용 기본 닥트 자재",
    description: "현장 규격 확인이 필요한 설비 자재입니다. 사진과 설치 위치를 함께 보내면 필요한 부속까지 견적 안내합니다.",
    main_image_url: "/아이콘.png",
    image_urls: [],
    sku: "DUCT-300-10M",
    brand: "충주닥트자재",
    origin: "국내",
    unit_label: "m",
    package_unit: "10m",
    min_order_quantity: 10,
    price_type: "fixed",
    price: 55000,
    from_price: 0,
    vat_included: false,
    delivery_fee_type: "separate",
    delivery_fee_amount: 50000,
    available_regions: ["충북 충주시", "충북 음성군", "충북 제천시"],
    tax_invoice_available: true,
    card_payment_available: true,
    safe_trade_available: false,
    stock_status: "in_stock",
    lead_time_text: "현장 확인 후 2-3일",
    is_featured: true,
    is_public: true,
    approval_status: "approved",
    rejection_reason: "",
    view_count: 72,
    inquiry_count: 4,
    quote_add_count: 5,
    order_request_count: 1,
    favorite_count: 2,
    created_at: now,
    updated_at: now,
  },
  {
    id: "prod-5",
    supplier_id: "sup-1",
    category_id: "pcat-consumable",
    title: "매장 청소용 니트릴 장갑 1000매",
    short_description: "주방·홀 공용 소모품",
    description: "사이즈별 재고 확인이 필요한 상품입니다. 외부 연락처 안내 없이 싸와 문의로 조건을 확인합니다.",
    main_image_url: "/아이콘.png",
    image_urls: [],
    sku: "GLOVE-NITRILE-1000",
    brand: "서울포장",
    origin: "수입",
    unit_label: "박스",
    package_unit: "1000매",
    min_order_quantity: 1,
    price_type: "fixed",
    price: 42000,
    from_price: 0,
    vat_included: true,
    delivery_fee_type: "separate",
    delivery_fee_amount: 3000,
    available_regions: ["서울 강남구", "서울 성동구", "서울 중구"],
    tax_invoice_available: true,
    card_payment_available: true,
    safe_trade_available: true,
    stock_status: "unknown",
    lead_time_text: "재고 확인 후 당일 안내",
    is_featured: false,
    is_public: false,
    approval_status: "pending",
    rejection_reason: "",
    view_count: 0,
    inquiry_count: 0,
    quote_add_count: 0,
    order_request_count: 0,
    favorite_count: 0,
    created_at: now,
    updated_at: now,
  },
];

const sampleProductInquiries: ProductInquiry[] = [
  {
    id: "pinquiry-1",
    product_id: "prod-1",
    buyer_id: "buyer-1",
    supplier_id: "sup-1",
    inquiry_type: "question",
    message: "강남구 매장으로 이번 주 금요일까지 받을 수 있나요?",
    quantity: 1,
    desired_delivery_date: "2026-07-10",
    delivery_region: "서울 강남구",
    status: "pending",
    thread_id: "thread-product-1",
    created_at: now,
    updated_at: now,
  },
];

const sampleProductOrderRequests: ProductOrderRequest[] = [
  {
    id: "porder-1",
    product_id: "prod-3",
    buyer_id: "buyer-1",
    supplier_id: "sup-2",
    quantity: 2,
    unit_label: "망",
    desired_delivery_date: "2026-07-09",
    delivery_region: "서울 동대문구",
    buyer_memo: "오전 납품 가능 여부 확인 부탁드립니다.",
    supplier_response: "",
    final_price: 0,
    status: "supplier_confirming",
    created_at: now,
    updated_at: now,
  },
];

const sampleProductFavorites: ProductFavorite[] = [
  { id: "pfav-1", product_id: "prod-1", buyer_id: "buyer-1", created_at: now },
  { id: "pfav-2", product_id: "prod-3", buyer_id: "buyer-1", created_at: now },
];

const sampleProductQuoteItems: ProductQuoteItem[] = [];

const sampleProductReports: ProductReport[] = [
  {
    id: "preport-1",
    product_id: "prod-2",
    reporter_id: "buyer-1",
    reason: "fake_price",
    detail: "가격 문의만 있고 기준 단가가 부족해 보여요.",
    status: "reviewing",
    admin_memo: "MVP 샘플 신고",
    created_at: now,
    updated_at: now,
  },
];

const sampleRoadmapItems: RoadmapItem[] = [
  roadmapItem("roadmap-1", "견적 미도착 요청 운영 개선", "위험도 분류와 수동 매칭 보조를 운영 루틴에 넣습니다.", 1, "urgent", "admin-1", "doing", "12시간 초과 무견적 0건"),
  roadmapItem("roadmap-2", "공급업체 응답 독려", "응답 느림 업체에 교육 링크와 연락 태스크를 발송합니다.", 1, "high", "admin-1", "doing", "공급 응답률 75% 이상"),
  roadmapItem("roadmap-3", "반복 요청 UX 강화", "지난 요청과 구매내역에서 수량/납품일만 바꿔 재요청합니다.", 2, "high", "admin-1", "planned", "재요청 10건 이상"),
  roadmapItem("roadmap-4", "자주 쓰는 품목 묶음", "포장재 기본세트를 견적요청 템플릿처럼 사용합니다.", 2, "normal", "admin-1", "planned", "묶음 기반 요청 5건"),
  roadmapItem("roadmap-5", "집중 카테고리 템플릿 개선", "포장재 랜딩/홈 CTA와 요청 템플릿을 강화합니다.", 3, "high", "admin-1", "planned", "포장재 요청당 견적 3개"),
  roadmapItem("roadmap-6", "구매자 온보딩 개선", "첫 요청 작성 전 이탈 구간에 템플릿과 사진 업로드 CTA를 노출합니다.", 3, "normal", "admin-1", "planned", "첫 요청 전환율 35%"),
  roadmapItem("roadmap-7", "유료화 의향 인터뷰", "활성 공급업체 5곳과 가격정책 인터뷰를 진행합니다.", 4, "normal", "admin-1", "planned", "유료 의향 3곳 이상"),
  roadmapItem("roadmap-8", "정식 런칭 판단 리포트", "집중 카테고리, 공급망, 재요청 데이터를 기반으로 런칭 판단을 정리합니다.", 4, "high", "admin-1", "planned", "런칭/보류 기준 확정"),
];

const sampleTodayNotifications: TodayNotification[] = [
  {
    id: "today-noti-buyer-tax-1",
    audience: "buyer",
    user_id: "buyer-1",
    business_id: "buyer-1",
    category: "tax",
    severity: "warning",
    status: "unread",
    title: "세금계산서 확인이 필요한 매입 2건",
    message: "싸와 구매내역에서 반영된 매입 중 세금계산서 상태가 확인 전입니다. 세무자료 제출 전에 증빙 상태를 확인하세요.",
    action_label: "세무자료 보기",
    action_url: "/app/today/tax",
    amount: 1240000,
    due_at: "2026-07-10T09:00:00.000Z",
    group_key: "buyer-1-tax",
    dedupe_key: "buyer-1-tax-2026-07-06",
    generated_from: "tax_document_check",
    created_at: "2026-07-06T08:30:00.000Z",
  },
  {
    id: "today-noti-buyer-requote-1",
    audience: "buyer",
    user_id: "buyer-1",
    business_id: "buyer-1",
    category: "requote",
    severity: "info",
    status: "unread",
    title: "포장재비 재견적 초안이 준비되었습니다",
    message: "최근 구매 단가가 전월 대비 올라 재견적 추천을 만들었습니다. 수량과 납품일만 확인하면 싸와 견적요청으로 넘길 수 있습니다.",
    action_label: "재견적 확인",
    action_url: "/app/today/requotes",
    amount: 390000,
    group_key: "buyer-1-requote",
    dedupe_key: "buyer-1-requote-packaging-2026-07",
    generated_from: "requote_recommendation",
    created_at: "2026-07-06T09:10:00.000Z",
  },
  {
    id: "today-noti-supplier-settlement-1",
    audience: "supplier",
    user_id: "sup-1-user",
    supplier_business_id: "sup-1",
    category: "settlement",
    severity: "warning",
    status: "unread",
    title: "정산 확인이 필요한 매출 1건",
    message: "거래 완료 매출 중 정산 상태가 보류로 표시된 항목이 있습니다. 입금 여부와 증빙 발행 상태를 확인하세요.",
    action_label: "정산 보기",
    action_url: "/app/today/supplier/settlements",
    amount: 390000,
    due_at: "2026-07-09T18:00:00.000Z",
    group_key: "sup-1-settlement",
    dedupe_key: "sup-1-settlement-deal-1",
    generated_from: "supplier_sales_record",
    created_at: "2026-07-06T09:35:00.000Z",
  },
  {
    id: "today-noti-supplier-quote-1",
    audience: "supplier",
    user_id: "sup-1-user",
    supplier_business_id: "sup-1",
    category: "quote",
    severity: "info",
    status: "read",
    title: "응답 가능한 견적요청이 있습니다",
    message: "주력 지역과 취급 품목이 맞는 구매요청이 감지되었습니다. 응답 시간을 줄이면 선택률이 올라갑니다.",
    action_label: "견적 검토",
    action_url: "/app/today/supplier/quotes",
    group_key: "sup-1-quotes",
    dedupe_key: "sup-1-quotes-2026-07-06",
    generated_from: "quote_matching",
    created_at: "2026-07-06T10:00:00.000Z",
    read_at: "2026-07-06T10:05:00.000Z",
  },
  {
    id: "today-noti-admin-env-1",
    audience: "admin",
    user_id: "admin-1",
    category: "env",
    severity: "critical",
    status: "unread",
    title: "운영 환경 설정 점검 필요",
    message: "국세청 API, 앱 대표 URL, 알림 발송 채널 같은 운영 변수를 상태 화면에서 확인해야 합니다.",
    action_label: "운영 상태 보기",
    action_url: "/app/admin/today/settings",
    group_key: "admin-env",
    dedupe_key: "admin-env-2026-07-06",
    generated_from: "environment_audit",
    created_at: "2026-07-06T07:50:00.000Z",
  },
  {
    id: "today-noti-admin-upload-1",
    audience: "admin",
    user_id: "admin-1",
    category: "upload",
    severity: "warning",
    status: "unread",
    title: "업로드 검증 오류가 누적되었습니다",
    message: "엑셀/CSV 일괄 입력에서 중복 의심과 필수값 누락이 함께 발견되었습니다. 운영자가 일괄 반영 전 샘플을 확인해야 합니다.",
    action_label: "업로드 오류 보기",
    action_url: "/app/admin/today/uploads",
    group_key: "admin-upload",
    dedupe_key: "admin-upload-2026-07-06",
    generated_from: "upload_validation",
    created_at: "2026-07-06T10:15:00.000Z",
  },
];

const todayNotificationPreferenceUsers: Array<{ audience: TodayNotificationAudience; userId: string }> = [
  { audience: "buyer", userId: "buyer-1" },
  { audience: "supplier", userId: "sup-1-user" },
  { audience: "admin", userId: "admin-1" },
];

const todayNotificationCategories: TodayNotificationCategory[] = ["tax", "evidence", "category", "cost", "requote", "upload", "ai", "sync", "quote", "deal", "settlement", "security", "env", "feedback"];

const sampleTodayNotificationPreferences: TodayNotificationPreference[] = todayNotificationPreferenceUsers.flatMap((user) =>
  todayNotificationCategories.map((category) => ({
    id: `today-pref-${user.audience}-${user.userId}-${category}`,
    audience: user.audience,
    user_id: user.userId,
    category,
    in_app_enabled: true,
    email_enabled: user.audience === "admin",
    sms_enabled: false,
    kakao_enabled: false,
    push_enabled: category === "tax" || category === "settlement" || category === "env",
    frequency: category === "env" || category === "security" ? "instant" : "daily",
    quiet_hours_start: "22:00",
    quiet_hours_end: "08:00",
    updated_at: "2026-07-06T08:00:00.000Z",
  })),
);

const sampleTodayReminderRules: TodayReminderRule[] = [
  { id: "today-rule-buyer-tax", audience: "buyer", category: "tax", name: "세무자료 마감 전 확인", condition_text: "증빙 누락 또는 세금계산서 미확인 상태가 있으면 매일 오전 알림", frequency: "daily", channels: ["in_app", "push"], enabled: true, created_at: now, updated_at: now },
  { id: "today-rule-buyer-requote", audience: "buyer", category: "requote", name: "매입 단가 상승 재견적", condition_text: "최근 매입 단가가 전월 대비 10% 이상 상승하면 재견적 추천", frequency: "weekly", channels: ["in_app"], enabled: true, created_at: now, updated_at: now },
  { id: "today-rule-supplier-settlement", audience: "supplier", category: "settlement", name: "정산 보류 확인", condition_text: "정산 보류/실패/확인 필요 매출 발생 시 공급업체에 인앱 알림", frequency: "instant", channels: ["in_app", "push"], enabled: true, created_at: now, updated_at: now },
  { id: "today-rule-admin-security", audience: "admin", category: "security", name: "보안/RLS 운영 감시", condition_text: "권한 차단, 반복 접근, 환경 변수 누락은 관리자 즉시 알림", frequency: "instant", channels: ["in_app", "email"], enabled: true, created_at: now, updated_at: now },
];

const sampleTodayNotificationDeliveryLogs: TodayNotificationDeliveryLog[] = [
  { id: "today-delivery-1", notification_id: "today-noti-buyer-tax-1", channel: "in_app", status: "sent", provider: "local", message: "인앱 알림 생성", created_at: "2026-07-06T08:30:01.000Z" },
  { id: "today-delivery-2", notification_id: "today-noti-buyer-tax-1", channel: "kakao", status: "skipped", provider: "not_configured", message: "외부 발송 연동은 베타 범위에서 제외", created_at: "2026-07-06T08:30:01.000Z" },
  { id: "today-delivery-3", notification_id: "today-noti-admin-env-1", channel: "email", status: "skipped", provider: "not_configured", message: "메일 발송은 운영 서버 연동 후 활성화", created_at: "2026-07-06T07:50:01.000Z" },
];

const sampleTodayOnboardingProgress: TodayOnboardingProgress[] = [
  { id: "today-onboarding-buyer-1", audience: "buyer", user_id: "buyer-1", completed_step_ids: ["connect-ssawa"], dismissed_guide_ids: [], last_opened_at: "2026-07-06T08:00:00.000Z", updated_at: "2026-07-06T08:00:00.000Z" },
  { id: "today-onboarding-supplier-1", audience: "supplier", user_id: "sup-1-user", completed_step_ids: ["confirm-sales"], dismissed_guide_ids: [], last_opened_at: "2026-07-06T08:10:00.000Z", updated_at: "2026-07-06T08:10:00.000Z" },
  { id: "today-onboarding-admin-1", audience: "admin", user_id: "admin-1", completed_step_ids: ["check-env", "review-qa"], dismissed_guide_ids: [], last_opened_at: "2026-07-06T08:20:00.000Z", updated_at: "2026-07-06T08:20:00.000Z" },
];

const sampleTodayHelpArticles: TodayHelpArticle[] = [
  { id: "today-help-buyer-1", audience: "buyer", category: "매입/세무", title: "싸와 구매내역이 오늘장사 매입으로 들어오는 방식", body: "거래 완료된 싸와 구매내역은 매입 장부 후보로 들어오며, 금액·공급업체·증빙 상태를 검토한 뒤 장부에 반영합니다.", tags: ["매입", "싸와", "세무"], safe_copy: "오늘장사는 세무 판단을 대신하지 않습니다. 신고 전 세무사 또는 담당자 확인이 필요합니다.", route_hint: "/app/today/purchases", updated_at: now },
  { id: "today-help-buyer-2", audience: "buyer", category: "재견적", title: "재견적 추천을 싸와 견적요청으로 넘기기", body: "최근 매입 가격, 반복 구매 품목, 수량을 기준으로 견적 초안을 만들고 구매자가 납품일과 조건을 확인한 뒤 전송합니다.", tags: ["재견적", "견적", "단가"], safe_copy: "AI 추천은 초안이며, 실제 발송 전 품목·수량·납기 확인이 필요합니다.", route_hint: "/app/today/requotes", updated_at: now },
  { id: "today-help-supplier-1", audience: "supplier", category: "매출/정산", title: "싸와 거래가 공급업체 매출로 정리되는 방식", body: "선택·완료된 거래는 공급업체용 매출 장부에 반영됩니다. 정산 상태와 세금계산서 발행 필요 여부를 함께 확인하세요.", tags: ["매출", "정산", "세금계산서"], safe_copy: "정산 표시 금액은 거래 상태 기반 참고값입니다. 실제 입금 여부는 별도 확인이 필요합니다.", route_hint: "/app/today/supplier/settlements", updated_at: now },
  { id: "today-help-admin-1", audience: "admin", category: "운영", title: "오늘장사 운영 모니터링 우선순위", body: "환경 변수, 동기화 실패, 업로드 검증, AI 차단, 보안/RLS 이벤트를 우선 확인합니다.", tags: ["운영", "QA", "환경"], safe_copy: "관리자 화면은 운영 판단 보조용이며, 외부 API 키나 민감정보 원문을 노출하지 않습니다.", route_hint: "/app/admin/today", updated_at: now },
  { id: "today-help-common-1", audience: "common", category: "FAQ", title: "오늘장사와 싸와는 어떤 관계인가요?", body: "싸와는 구매·견적·거래 흐름을 담당하고, 오늘장사는 그 결과를 매입·매출·세무·정산 장부로 정리합니다.", tags: ["FAQ", "싸와", "오늘장사"], safe_copy: "연동 데이터는 사용자가 확인하고 반영하는 흐름을 기본으로 합니다.", route_hint: "/app/help/today", updated_at: now },
];

const sampleTodayLaunchChecklist: TodayLaunchChecklistItem[] = [
  { id: "launch-qa", category: "QA", title: "구매자/공급업체/관리자 E2E 점검", description: "핵심 라우트, 권한 차단, 빈 상태, 오류 상태, 모바일 폭을 점검합니다.", owner: "admin-1", status: "doing", evidence_url: "/app/admin/qa", updated_at: now },
  { id: "launch-env", category: "운영", title: "대표 URL과 국세청 API 환경값 확인", description: "배포 URL, 앱 대표 URL, 사업자 인증 API 상태를 /status와 관리자 설정에서 확인합니다.", owner: "admin-1", status: "done", evidence_url: "/status", updated_at: now },
  { id: "launch-policy", category: "정책", title: "약관/개인정보/세무 고지 공개", description: "베타 출시 전 필수 고지 페이지와 지원 채널을 열어둡니다.", owner: "admin-1", status: "done", evidence_url: "/terms", updated_at: now },
  { id: "launch-feedback", category: "피드백", title: "피드백 위젯과 백로그 운영", description: "사용자 피드백이 관리자 백로그로 이어지는 흐름을 확인합니다.", owner: "admin-1", status: "todo", evidence_url: "/app/admin/beta/backlog", updated_at: now },
];

const sampleTodayPricingPlans: TodayPricingPlan[] = [
  { id: "price-buyer-beta", audience: "buyer", name: "오늘장사 베타", price_label: "베타 기간 무료", description: "싸와 구매내역을 매입 장부로 정리하고 세무자료 누락을 확인합니다.", features: ["매입/매출/지출 장부", "싸와 구매내역 자동 반영", "세무자료 누락 알림", "재견적 추천"], beta_badge: "선착순 베타" },
  { id: "price-supplier-beta", audience: "supplier", name: "공급업체 베타", price_label: "베타 기간 무료", description: "싸와 거래 매출과 정산 상태를 공급업체 관점에서 정리합니다.", features: ["거래 매출 정리", "정산 확인", "세금계산서 발행 체크", "견적 전환 분석"], beta_badge: "공급업체 파일럿" },
];

const sampleTodayBetaApplications: TodayBetaApplication[] = [
  { id: "beta-apply-1", application_type: "buyer", business_name: "한강치킨", contact_name: "김사장", phone: "010-1111-2222", email: "owner@ssawa.local", region: "서울 강남구", memo: "포장재비와 식자재 매입 정리를 먼저 써보고 싶습니다.", consent_marketing: true, status: "accepted", created_at: "2026-07-05T09:00:00.000Z", updated_at: "2026-07-05T09:00:00.000Z" },
  { id: "beta-apply-2", application_type: "supplier", business_name: "서울포장", contact_name: "박팀장", phone: "010-2222-3333", email: "supplier@ssawa.local", region: "서울 동대문구", memo: "거래 매출과 정산 확인 기능을 테스트하고 싶습니다.", consent_marketing: true, status: "contacted", created_at: "2026-07-05T10:00:00.000Z", updated_at: "2026-07-05T10:00:00.000Z" },
];

const sampleTodaySupportTickets: TodaySupportTicket[] = [
  { id: "support-1", user_role: "buyer", user_id: "buyer-1", title: "업로드 후 중복 표시 문의", description: "엑셀 업로드에서 같은 거래가 중복 의심으로 표시됩니다.", page_url: "/app/today/uploads", status: "reviewing", created_at: "2026-07-06T11:00:00.000Z", updated_at: "2026-07-06T11:00:00.000Z" },
];

const sampleTodayProductEvents: TodayProductEvent[] = [
  { id: "event-1", user_id: "buyer-1", user_role: "buyer", event_name: "page_view", page_url: "/app/today", metadata_json: "{\"section\":\"home\"}", created_at: "2026-07-06T09:00:00.000Z" },
  { id: "event-2", user_id: "buyer-1", user_role: "buyer", event_name: "requote_draft", page_url: "/app/today/requotes", metadata_json: "{\"category\":\"packaging\"}", created_at: "2026-07-06T09:12:00.000Z" },
  { id: "event-3", user_id: "sup-1-user", user_role: "supplier", event_name: "notification_action", page_url: "/app/today/supplier/settlements", metadata_json: "{\"category\":\"settlement\"}", created_at: "2026-07-06T09:40:00.000Z" },
  { id: "event-4", user_id: "admin-1", user_role: "admin", event_name: "page_view", page_url: "/app/admin/today", metadata_json: "{\"section\":\"overview\"}", created_at: "2026-07-06T10:00:00.000Z" },
];

const sampleTodayBetaSurveyResponses: TodayBetaSurveyResponse[] = [
  { id: "survey-1", user_id: "buyer-1", user_role: "buyer", score: 4, nps_score: 8, comment: "매입 정리는 편하지만 세무 용어 설명이 더 필요합니다.", pain_point: "세무자료", created_at: "2026-07-06T12:00:00.000Z" },
  { id: "survey-2", user_id: "sup-1-user", user_role: "supplier", score: 3, nps_score: 6, comment: "정산 상태 기준을 더 명확하게 보고 싶습니다.", pain_point: "정산", created_at: "2026-07-06T12:20:00.000Z" },
];

const sampleTodayBetaBacklog: TodayBetaBacklogItem[] = [
  { id: "backlog-1", source_type: "survey", source_id: "survey-1", title: "세무자료 용어 도움말 강화", description: "세금계산서, 영수증, 거래명세서 상태 차이를 화면에서 바로 설명합니다.", user_segment: "buyer", impact_score: 5, effort_score: 2, priority_score: 13, status: "planned", owner: "product", created_at: now, updated_at: now },
  { id: "backlog-2", source_type: "analytics", source_id: "event-3", title: "공급업체 정산 기준 안내 추가", description: "정산 보류/예정/완료 상태의 기준과 다음 행동을 알림과 화면에 함께 표시합니다.", user_segment: "supplier", impact_score: 4, effort_score: 2, priority_score: 10, status: "triaged", owner: "ops", created_at: now, updated_at: now },
];

const sampleTodayBetaSegments: TodayBetaSegment[] = [
  { id: "segment-buyer-active", label: "활성 구매자", audience: "buyer", user_count: 18, activation_rate: 72, retention_rate: 61, feedback_count: 7, risk_note: "세무 도움말 부족 시 이탈 가능" },
  { id: "segment-supplier-active", label: "활성 공급업체", audience: "supplier", user_count: 11, activation_rate: 64, retention_rate: 54, feedback_count: 5, risk_note: "정산 기준 안내 필요" },
  { id: "segment-admin-ops", label: "운영 관리자", audience: "admin", user_count: 2, activation_rate: 100, retention_rate: 100, feedback_count: 3, risk_note: "환경값과 알림 피로도 모니터링 필요" },
];

export const initialData: AppData = {
  environment: "demo",
  is_demo: true,
  demo_label: "데모 데이터",
  onboarding_completed: false,
  profiles: [
    ...testProfiles,
    profile("buyer-1", "김사장", "owner@ssawa.local", "buyer", "월계치킨", "111-22-33333", "010-1111-2222", "서울 노원구"),
    profile("buyer-2", "박대표", "meat@ssawa.local", "buyer", "고깃집오늘", "222-33-44444", "010-3333-4444", "경기 성남시"),
    profile("admin-1", "운영자", "admin@ssawa.local", "admin", "싸와 운영팀", "000-00-00000", "02-000-0000", "서울"),
  ],
  local_auth_accounts: sampleLocalAuthAccounts,
  categories,
  quote_requests: [
  request("req-1", "buyer-1", "치킨집 포장재 견적 요청", "cat-2", "포장재", "서울 노원구", "2026-07-10", true, true, "배달 주문량이 늘어 포장재를 한 번에 비교하고 싶습니다.", "quoted"),
  request("req-2", "buyer-2", "고깃집 식자재 견적 요청", "cat-1", "식자재", "경기 성남시", "2026-07-09", true, false, "주말 장사 전까지 납품 가능한 업체를 찾습니다.", "quoted"),
  request("req-3", "buyer-1", "닥트/환기자재 견적 요청", "cat-5", "설비/닥트/환기자재", "충북 충주시", "2026-07-14", false, false, "매장 주방 환기 보수용 자재입니다. 규격 호환 여부 메모 부탁드립니다.", "open"),
  ],
  quote_request_items: requestItems,
  supplier_profiles: [
    ...testSupplierProfiles,
    supplier("sup-1", "서울포장", "서울 동대문구", ["서울 동대문구", "서울 성동구", "서울 중구", "서울 종로구"], ["포장재", "소모품"], true, true, "approved"),
    supplier("sup-2", "동대문식자재", "서울 동대문구", ["서울 동대문구", "서울 중랑구", "서울 성북구"], ["식자재"], true, false, "approved"),
    supplier("sup-3", "충주닥트자재", "충북 충주시", ["충북 충주시", "충북 음성군", "충북 제천시"], ["설비/닥트/환기자재"], true, true, "approved"),
    supplier("sup-4", "경기소모품센터", "경기 남양주시", ["경기 남양주시", "경기 구리시", "경기 하남시"], ["소모품", "공구/산업자재"], true, true, "approved"),
    supplier("sup-5", "서울주방파트너", "서울 성동구", ["서울 성동구", "서울 광진구"], ["주방용품", "소모품"], true, true, "pending"),
    supplier("sup-6", "한강포장물류", "서울 강서구", ["서울 강서구", "서울 양천구"], ["포장재"], true, false, "needs_revision"),
    supplier("sup-7", "우리식품도매", "경기 구리시", ["경기 구리시", "경기 남양주시"], ["식자재"], true, false, "rejected"),
    supplier("sup-8", "서부산업공구", "경기 하남시", ["경기 하남시", "경기 광주시"], ["공구/산업자재"], false, true, "suspended"),
  ],
  supplier_documents: [
    supplierDocument("doc-1", "sup-1", "business_license", "서울포장_사업자등록증.pdf", "approved"),
    supplierDocument("doc-2", "sup-1", "price_list", "서울포장_가격표.xlsx", "approved"),
    supplierDocument("doc-3", "sup-2", "business_license", "동대문식자재_사업자등록증.pdf", "approved"),
    supplierDocument("doc-4", "sup-3", "store_photo", "충주닥트_창고사진.jpg", "pending_review"),
    supplierDocument("doc-5", "sup-5", "business_license", "서울주방파트너_사업자등록증.pdf", "pending_review"),
    supplierDocument("doc-6", "sup-6", "bankbook", "한강포장물류_통장사본.pdf", "rejected"),
  ],
  supplier_stats: [
    supplierStats("stat-1", "sup-1", 42, 15, 92, 38, 18400000, 61, 4.8, 31),
    supplierStats("stat-2", "sup-2", 28, 9, 84, 55, 12600000, 44, 4.6, 18),
    supplierStats("stat-3", "sup-3", 19, 7, 88, 41, 21100000, 52, 4.9, 12),
    supplierStats("stat-4", "sup-4", 31, 11, 79, 66, 9300000, 37, 4.7, 22),
    supplierStats("stat-5", "sup-5", 0, 0, 0, 0, 0, 0, 0, 0),
    supplierStats("stat-6", "sup-6", 3, 0, 42, 180, 0, 0, 3.9, 2),
    supplierStats("stat-7", "sup-7", 1, 0, 20, 240, 0, 0, 3.2, 1),
    supplierStats("stat-8", "sup-8", 9, 1, 48, 210, 1200000, 8, 3.8, 4),
  ],
  supplier_reviews: [
    supplierReview("review-1", "sup-1", "buyer-1", "req-1", 5, "응답이 빠르고 포장재 단가가 명확했습니다."),
    supplierReview("review-2", "sup-2", "buyer-2", "req-2", 4.5, "새벽 납품 시간이 안정적이었습니다."),
    supplierReview("review-3", "sup-3", "buyer-1", "req-3", 5, "현장 규격 상담이 꼼꼼했습니다."),
  ],
  product_categories: sampleProductCategories,
  supplier_store_profiles: sampleSupplierStoreProfiles,
  supplier_products: sampleSupplierProducts,
  product_inquiries: sampleProductInquiries,
  product_order_requests: sampleProductOrderRequests,
  product_favorites: sampleProductFavorites,
  product_quote_items: sampleProductQuoteItems,
  product_reports: sampleProductReports,
  quotes: [
    quote("quote-1", "req-1", "sup-1", 1240000, 40000, "2026-07-09", true, true, "", "치킨박스 560원, 소스컵 85원, 봉투 330원 기준", "인쇄 없는 무지 기준입니다.", "2026-07-08"),
    quote("quote-2", "req-1", "sup-4", 1185000, 70000, "2026-07-08", true, true, "소스컵 동일 규격 대체 브랜드 가능", "묶음 단가 적용 가능", "납품은 오전 11시 전 가능합니다.", "2026-07-07"),
    quote("quote-3", "req-2", "sup-2", 862000, 0, "2026-07-08", true, false, "쌈장 14kg 재고 부족 시 7kg 2통 대체", "삼겹살 kg당 19,500원", "새벽 배송 가능합니다.", "2026-07-07"),
    quote("quote-4", "req-2", "sup-4", 898000, 25000, "2026-07-09", true, true, "", "식용유 행사 단가 반영", "카드 결제 시 최종금액 동일합니다.", "2026-07-08"),
  ],
  quote_attachments: [
    requestAttachment("qattach-1", "req-1", "기존_포장재_거래명세서.pdf", "pdf", "analyzed", "치킨박스 1,000개, 소스컵 2,000개, 배달봉투 1,000장"),
    requestAttachment("qattach-2", "req-3", "닥트_현장사진.jpg", "jpg", "analyzing", "주방 환기 덕트 현장 사진"),
  ],
  deals: [
    deal("deal-1", "req-1", "quote-1", "buyer-1", "sup-1", "치킨집 포장재 견적", "포장재", "서울 강남구", "서울 강남구 테헤란로 12", "2026-07-10", "2026-07-10", 390000, 30000, true, true, true, true, "bank_transfer", "confirmed", "오전 납품 희망", "오전 10시 이전 납품 가능합니다.", 500000),
    deal("deal-2", "req-2", "quote-3", "buyer-2", "sup-2", "고깃집 식자재 견적", "식자재", "서울 동대문구", "서울 동대문구 장한로 8", "2026-07-09", "2026-07-09", 780000, 0, true, true, false, false, "later", "preparing", "주말 전 납품 부탁드립니다.", "냉장차 준비 중입니다.", 850000),
    deal("deal-3", "req-3", "quote-sample-duct", "buyer-1", "sup-3", "닥트/환기자재 견적", "설비/닥트/환기자재", "충북 충주시", "충북 충주시 중앙로 21", "2026-07-14", "2026-07-13", 1200000, 50000, false, false, false, false, "undecided", "delivering", "현장 도착 전 연락 주세요.", "기사 배차 완료", 1400000),
    deal("deal-4", "req-1", "quote-sample-cancel", "buyer-1", "sup-4", "소모품 긴급 견적", "소모품", "경기 수원시", "경기 수원시 팔달구", "2026-07-11", "2026-07-11", 310000, 20000, true, true, true, true, "card", "cancelled_by_buyer", "품목 변경으로 취소", "", 0),
    deal("deal-5", "req-2", "quote-sample-dispute", "buyer-2", "sup-2", "식자재 추가 납품", "식자재", "경기 성남시", "경기 성남시 수정구", "2026-07-12", "2026-07-12", 460000, 0, true, true, false, false, "later", "disputed", "수량 확인 필요", "현장 확인 중", 500000),
  ],
  deal_items: [
    dealItem("deal-item-1", "deal-1", "치킨박스", "1,000개", 1000, "개", 280, "무지 박스"),
    dealItem("deal-item-2", "deal-1", "소스컵", "2,000개", 2000, "개", 55, "뚜껑 포함"),
    dealItem("deal-item-3", "deal-1", "배달봉투 대형", "1,000장", 1000, "장", 0, "묶음 단가"),
    dealItem("deal-item-4", "deal-2", "삼겹살", "30kg", 30, "kg", 19500, "냉장"),
    dealItem("deal-item-5", "deal-2", "양파", "15kg", 1, "망", 26000, "국내산"),
    dealItem("deal-item-6", "deal-2", "쌈장", "14kg", 14, "kg", 12000, "업소용"),
    dealItem("deal-item-7", "deal-3", "스파이럴덕트", "300파이 10m", 10, "m", 55000, ""),
    dealItem("deal-item-8", "deal-3", "후렉시블", "300파이 2BOX", 2, "BOX", 160000, ""),
    dealItem("deal-item-9", "deal-3", "디퓨저", "4개", 4, "개", 45000, ""),
  ],
  deal_attachments: [
    attachment("attach-1", "deal-1", "거래명세서_서울포장.pdf", "delivery_note", "supplier"),
    attachment("attach-2", "deal-2", "납품사진_동대문식자재.jpg", "photo", "supplier"),
  ],
  purchase_records: samplePurchaseRecords,
  purchase_record_items: samplePurchaseRecordItems,
  purchase_documents: samplePurchaseDocuments,
  tax_documents: sampleTaxDocuments,
  tax_document_checks: sampleTaxDocumentChecks,
  tax_export_requests: sampleTaxExportRequests,
  supplier_sales_records: sampleSupplierSalesRecords,
  today_supplier_sync_logs: sampleTodaySupplierSyncLogs,
  sales_records: sampleTodaySalesRecords,
  expense_records: sampleTodayExpenseRecords,
  recurring_rules: sampleTodayRecurringRules,
  today_categories: defaultTodayCategories,
  today_category_rules: defaultTodayCategoryRules,
  today_category_classification_logs: [],
  today_ssawa_sync_logs: [],
  accounting_entries: sampleAccountingEntries,
  analysis_jobs: sampleAnalysisJobs,
  analysis_items: sampleAnalysisItems,
  analysis_attachments: sampleAnalysisAttachments,
  analysis_raw_results: sampleAnalysisRawResults,
  analysis_conversions: sampleAnalysisConversions,
  notifications: sampleNotifications,
  notification_events: sampleNotificationEvents,
  notification_settings: sampleNotificationSettings,
  message_threads: sampleMessageThreads,
  messages: sampleMessages,
  message_read_states: sampleMessageReadStates,
  message_reports: sampleMessageReports,
  commission_policies: sampleCommissionPolicies,
  platform_fees: samplePlatformFees,
  supplier_plans: sampleSupplierPlans,
  supplier_subscriptions: sampleSupplierSubscriptions,
  supplier_usage: sampleSupplierUsage,
  quote_participation_credits: sampleQuoteParticipationCredits,
  settlements: sampleSettlements,
  settlement_items: sampleSettlementItems,
  billing_events: sampleBillingEvents,
  billing_accounts: sampleBillingAccounts,
  reports: sampleReports,
  report_attachments: sampleReportAttachments,
  report_actions: sampleReportActions,
  report_comments: sampleReportComments,
  reviews: sampleReviews,
  review_replies: sampleReviewReplies,
  review_reports: sampleReviewReports,
  supplier_reputation_scores: sampleSupplierReputationScores,
  user_sanctions: sampleUserSanctions,
  blacklist_entries: sampleBlacklistEntries,
  business_verifications: [],
  business_manual_review_requests: [],
  feedbacks: sampleFeedbacks,
  qa_checklists: sampleQaChecklists,
  beta_targets: sampleBetaTargets,
  beta_participants: sampleBetaParticipants,
  sales_leads: sampleSalesLeads,
  sales_activities: sampleSalesActivities,
  beta_experiments: sampleBetaExperiments,
  beta_feedback_insights: sampleBetaFeedbackInsights,
  operator_tasks: sampleOperatorTasks,
  business_validation_reports: sampleBusinessValidationReports,
  focus_settings: sampleFocusSettings,
  feature_flags: sampleFeatureFlags,
  favorite_item_groups: sampleFavoriteItemGroups,
  favorite_items: sampleFavoriteItems,
  category_playbooks: sampleCategoryPlaybooks,
  roadmap_items: sampleRoadmapItems,
  deal_status_logs: [
    log("log-1", "deal-1", "created", "pending_confirmation", "system", "견적 선택으로 거래가 생성되었습니다."),
    log("log-2", "deal-1", "pending_confirmation", "confirmed", "supplier", "공급업체가 거래를 수락했습니다."),
    log("log-3", "deal-2", "created", "pending_confirmation", "system", "견적 선택으로 거래가 생성되었습니다."),
    log("log-4", "deal-2", "pending_confirmation", "confirmed", "supplier", "거래 수락"),
    log("log-5", "deal-2", "confirmed", "preparing", "supplier", "납품 준비 시작"),
    log("log-6", "deal-3", "created", "pending_confirmation", "system", "샘플 거래 생성"),
    log("log-7", "deal-3", "pending_confirmation", "confirmed", "supplier", "거래 확정"),
    log("log-8", "deal-3", "confirmed", "preparing", "supplier", "자재 준비"),
    log("log-9", "deal-3", "preparing", "delivering", "supplier", "배송 출발"),
  ],
  today_requote_recommendations: [],
  today_ssawa_quote_drafts: [],
  today_requote_logs: [],
  today_upload_batches: [],
  today_upload_rows: [],
  today_upload_column_mappings: [],
  today_upload_logs: [],
  supplier_product_events: sampleSupplierProductEvents,
  supplier_today_insights: sampleSupplierTodayInsights,
  supplier_tasks: sampleSupplierTasks,
  today_ai_conversations: sampleTodayAIConversations,
  today_ai_messages: sampleTodayAIMessages,
  today_ai_insights: sampleTodayAIInsights,
  today_ai_usage: sampleTodayAIUsage,
  today_security_events: sampleTodaySecurityEvents,
  admin_today_actions: sampleAdminTodayActions,
  today_admin_settings: sampleTodayAdminSettings,
  today_notifications: sampleTodayNotifications,
  today_notification_preferences: sampleTodayNotificationPreferences,
  today_reminder_rules: sampleTodayReminderRules,
  today_notification_delivery_logs: sampleTodayNotificationDeliveryLogs,
  today_onboarding_progress: sampleTodayOnboardingProgress,
  today_help_articles: sampleTodayHelpArticles,
  today_launch_checklist: sampleTodayLaunchChecklist,
  today_pricing_plans: sampleTodayPricingPlans,
  today_beta_applications: sampleTodayBetaApplications,
  today_support_tickets: sampleTodaySupportTickets,
  today_product_events: sampleTodayProductEvents,
  today_beta_survey_responses: sampleTodayBetaSurveyResponses,
  today_beta_backlog: sampleTodayBetaBacklog,
  today_beta_segments: sampleTodayBetaSegments,
};

// Production/beta launches must not bootstrap fake users, quote requests, deals, or messages.
// Keep only taxonomy and configuration records that the app needs to create real data.
const productionInitialData: AppData = {
  ...initialData,
  environment: "production",
  is_demo: false,
  demo_label: "Production beta data",
  onboarding_completed: false,
  onboarding_completed_at: undefined,
  profiles: [],
  local_auth_accounts: [],
  quote_requests: [],
  quote_request_items: [],
  supplier_profiles: [],
  supplier_documents: [],
  supplier_stats: [],
  supplier_reviews: [],
  supplier_store_profiles: [],
  supplier_products: [],
  product_inquiries: [],
  product_order_requests: [],
  product_favorites: [],
  product_quote_items: [],
  product_reports: [],
  quotes: [],
  quote_attachments: [],
  deals: [],
  deal_items: [],
  deal_attachments: [],
  purchase_records: [],
  purchase_record_items: [],
  purchase_documents: [],
  tax_documents: [],
  tax_document_checks: [],
  tax_export_requests: [],
  supplier_sales_records: [],
  today_supplier_sync_logs: [],
  sales_records: [],
  expense_records: [],
  recurring_rules: [],
  today_category_classification_logs: [],
  today_ssawa_sync_logs: [],
  accounting_entries: [],
  analysis_jobs: [],
  analysis_items: [],
  analysis_attachments: [],
  analysis_raw_results: [],
  analysis_conversions: [],
  notifications: [],
  notification_events: [],
  notification_settings: [],
  message_threads: [],
  messages: [],
  message_read_states: [],
  message_reports: [],
  platform_fees: [],
  supplier_subscriptions: [],
  supplier_usage: [],
  quote_participation_credits: [],
  settlements: [],
  settlement_items: [],
  billing_events: [],
  billing_accounts: [],
  reports: [],
  report_attachments: [],
  report_actions: [],
  report_comments: [],
  reviews: [],
  review_replies: [],
  review_reports: [],
  supplier_reputation_scores: [],
  user_sanctions: [],
  blacklist_entries: [],
  business_verifications: [],
  business_manual_review_requests: [],
  feedbacks: [],
  beta_participants: [],
  sales_leads: [],
  sales_activities: [],
  beta_experiments: [],
  beta_feedback_insights: [],
  operator_tasks: [],
  business_validation_reports: [],
  favorite_item_groups: [],
  favorite_items: [],
  deal_status_logs: [],
  today_requote_recommendations: [],
  today_ssawa_quote_drafts: [],
  today_requote_logs: [],
  today_upload_batches: [],
  today_upload_rows: [],
  today_upload_column_mappings: [],
  today_upload_logs: [],
  supplier_product_events: [],
  supplier_today_insights: [],
  supplier_tasks: [],
  today_ai_conversations: [],
  today_ai_messages: [],
  today_ai_insights: [],
  today_ai_usage: [],
  today_security_events: [],
  admin_today_actions: [],
  today_notifications: [],
  today_notification_preferences: [],
  today_reminder_rules: [],
  today_notification_delivery_logs: [],
  today_onboarding_progress: [],
  today_beta_applications: [],
  today_support_tickets: [],
  today_product_events: [],
  today_beta_survey_responses: [],
  today_beta_backlog: [],
  today_beta_segments: [],
};

function baseInitialData() {
  return appConfig.enableDemoData ? initialData : productionInitialData;
}

export function loadData(): AppData {
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    const seedData = baseInitialData();
    saveData(seedData);
    return seedData;
  }

  try {
    const parsed = JSON.parse(raw) as Partial<AppData>;
    return normalizeData(parsed);
  } catch {
    const seedData = baseInitialData();
    saveData(seedData);
    return seedData;
  }
}

export function saveData(data: AppData): void {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function localId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function resetData(): AppData {
  const seedData = baseInitialData();
  saveData(seedData);
  return seedData;
}

type UploadRawRow = Record<string, string>;
type UploadMappedRow = {
  date?: string;
  amount?: number;
  record_type?: string;
  category?: string;
  counterparty_name?: string;
  item_summary?: string;
  payment_method?: string;
  memo?: string;
  tax_invoice_status?: string;
  evidence_status?: string;
};

export const todayUploadTypeLabels: Record<TodayUploadType, string> = {
  sales: "매출",
  expense: "지출",
  purchase: "매입",
  mixed: "혼합",
  unknown: "자동 판단",
};

export const todayUploadBatchStatusLabels: Record<TodayUploadBatch["status"], string> = {
  uploaded: "업로드됨",
  parsed: "분석됨",
  mapping_needed: "매핑 확인 필요",
  ready_to_import: "반영 준비",
  imported: "반영 완료",
  partially_imported: "일부 반영",
  failed: "실패",
  cancelled: "취소됨",
};

export const todayUploadValidationStatusLabels: Record<TodayUploadValidationStatus, string> = {
  valid: "반영 가능",
  warning: "확인 필요",
  invalid: "오류",
  duplicate: "중복 의심",
  skipped: "건너뜀",
  imported: "반영 완료",
};

export const todayUploadRecordTypeLabels: Record<TodayUploadFinalRecordType, string> = {
  sales: "매출",
  expense: "지출",
  purchase: "매입",
  unknown: "미확정",
  skip: "건너뛰기",
};

export const todayUploadTargetFieldLabels: Record<TodayUploadTargetField, string> = {
  date: "날짜",
  amount: "금액",
  record_type: "구분",
  category: "카테고리",
  counterparty_name: "거래처",
  item_summary: "품목",
  payment_method: "결제수단",
  memo: "메모",
  tax_invoice_status: "세금계산서",
  evidence_status: "증빙",
  ignore: "무시",
};

export const todayUploadTargetFields: TodayUploadTargetField[] = ["date", "amount", "record_type", "category", "counterparty_name", "item_summary", "payment_method", "memo", "tax_invoice_status", "evidence_status", "ignore"];

const uploadColumnKeywords: Record<Exclude<TodayUploadTargetField, "ignore">, string[]> = {
  date: ["date", "일자", "날짜", "거래일", "매출일", "지출일", "매입일", "purchase date", "sales date"],
  amount: ["amount", "금액", "합계", "총액", "매출액", "지출액", "결제금액", "입금", "출금", "total", "price"],
  record_type: ["구분", "유형", "타입", "type", "record", "매출매입", "수입지출"],
  category: ["카테고리", "분류", "계정", "항목", "category", "expense type"],
  counterparty_name: ["거래처", "상호", "업체", "공급업체", "매입처", "판매처", "vendor", "supplier", "customer"],
  item_summary: ["품목", "상품", "내역", "내용", "item", "description", "title"],
  payment_method: ["결제", "결제수단", "지급", "payment", "method", "카드", "현금"],
  memo: ["메모", "비고", "note", "memo", "remark"],
  tax_invoice_status: ["세금계산서", "계산서", "tax", "invoice"],
  evidence_status: ["증빙", "영수증", "receipt", "evidence", "첨부"],
};

function safeJsonParse<T>(input: string | undefined, fallback: T): T {
  if (!input) return fallback;
  try {
    return JSON.parse(input) as T;
  } catch {
    return fallback;
  }
}

function stableUploadHash(input: string) {
  let hash = 0;
  for (let index = 0; index < input.length; index += 1) {
    hash = (hash << 5) - hash + input.charCodeAt(index);
    hash |= 0;
  }
  return Math.abs(hash).toString(36);
}

export function sanitizeUploadCell(value: unknown) {
  const raw = String(value ?? "").replace(/\u0000/g, "").trim();
  if (!raw) return "";
  const cardMasked = raw.replace(/\b(\d{4})[-\s]?(\d{4})[-\s]?(\d{4})[-\s]?(\d{4})\b/g, "$1-****-****-$4");
  return cardMasked.replace(/\b(\d{6})[-\s]?(\d{7})\b/g, "$1-*******");
}

export function parseCsvText(text: string): { headers: string[]; rows: UploadRawRow[]; error?: string } {
  const normalized = text.replace(/^\uFEFF/, "");
  const lines: string[][] = [];
  let current = "";
  let row: string[] = [];
  let quoted = false;
  for (let index = 0; index < normalized.length; index += 1) {
    const char = normalized[index];
    const next = normalized[index + 1];
    if (char === "\"") {
      if (quoted && next === "\"") {
        current += "\"";
        index += 1;
      } else {
        quoted = !quoted;
      }
      continue;
    }
    if (!quoted && (char === "," || char === "\t")) {
      row.push(current);
      current = "";
      continue;
    }
    if (!quoted && (char === "\n" || char === "\r")) {
      if (char === "\r" && next === "\n") index += 1;
      row.push(current);
      if (row.some((cell) => cell.trim())) lines.push(row);
      row = [];
      current = "";
      continue;
    }
    current += char;
  }
  row.push(current);
  if (row.some((cell) => cell.trim())) lines.push(row);
  if (!lines.length) return { headers: [], rows: [], error: "파일에 읽을 수 있는 행이 없습니다." };
  const headers = lines[0].map((header, index) => sanitizeUploadCell(header) || `열${index + 1}`);
  const rows = lines.slice(1).map((cells) => Object.fromEntries(headers.map((header, index) => [header, sanitizeUploadCell(cells[index])])) as UploadRawRow);
  return { headers, rows };
}

function normalizeUploadHeader(header: string) {
  return header.toLowerCase().replace(/\s+/g, "");
}

export function detectUploadColumnMappings(headers: string[], rows: UploadRawRow[] = [], businessId = "buyer-1", batchId = "preview", createdBy = businessId): TodayUploadColumnMapping[] {
  const used = new Set<TodayUploadTargetField>();
  const createdAt = new Date().toISOString();
  return headers.map((header, index) => {
    const normalized = normalizeUploadHeader(header);
    let target: TodayUploadTargetField = "ignore";
    let confidence = 0.2;
    for (const [field, keywords] of Object.entries(uploadColumnKeywords) as Array<[Exclude<TodayUploadTargetField, "ignore">, string[]]>) {
      if (used.has(field)) continue;
      const matched = keywords.some((keyword) => normalized.includes(normalizeUploadHeader(keyword)));
      if (matched) {
        target = field;
        confidence = 0.9;
        break;
      }
    }
    used.add(target);
    return {
      id: `${batchId}-mapping-${index + 1}`,
      business_id: businessId,
      batch_id: batchId,
      source_column_name: header,
      target_field: target,
      confidence,
      sample_values_json: JSON.stringify(rows.slice(0, 3).map((rowEntry) => rowEntry[header]).filter(Boolean)),
      created_by: createdBy,
      created_at: createdAt,
      updated_at: createdAt,
    };
  });
}

function parseUploadAmount(value: unknown) {
  const normalized = String(value ?? "").replace(/[^\d.-]/g, "");
  const amount = Number(normalized);
  return Number.isFinite(amount) ? Math.abs(Math.round(amount)) : 0;
}

function parseUploadDate(value: unknown) {
  const raw = String(value ?? "").trim();
  if (!raw) return "";
  const excelSerial = Number(raw);
  if (Number.isFinite(excelSerial) && excelSerial > 30000 && excelSerial < 60000) {
    const date = new Date(Math.round((excelSerial - 25569) * 86400 * 1000));
    return date.toISOString().slice(0, 10);
  }
  const ymd = raw.match(/(20\d{2})[./-](\d{1,2})[./-](\d{1,2})/);
  if (ymd) return `${ymd[1]}-${ymd[2].padStart(2, "0")}-${ymd[3].padStart(2, "0")}`;
  const mdy = raw.match(/(\d{1,2})[./-](\d{1,2})[./-](20\d{2})/);
  if (mdy) return `${mdy[3]}-${mdy[1].padStart(2, "0")}-${mdy[2].padStart(2, "0")}`;
  return "";
}

function mapUploadRow(raw: UploadRawRow, mappings: TodayUploadColumnMapping[]): UploadMappedRow {
  const mapped: UploadMappedRow = {};
  mappings.forEach((mapping) => {
    if (mapping.target_field === "ignore") return;
    const value = sanitizeUploadCell(raw[mapping.source_column_name]);
    if (!value) return;
    if (mapping.target_field === "amount") mapped.amount = parseUploadAmount(value);
    else if (mapping.target_field === "date") mapped.date = parseUploadDate(value);
    else mapped[mapping.target_field] = value;
  });
  return mapped;
}

function detectUploadRecordType(mapped: UploadMappedRow, uploadType: TodayUploadType): TodayUploadRecordType {
  if (uploadType === "sales" || uploadType === "expense" || uploadType === "purchase") return uploadType;
  const merged = `${mapped.record_type ?? ""} ${mapped.category ?? ""} ${mapped.memo ?? ""}`.toLowerCase();
  if (/매출|입금|sales|sale|revenue/.test(merged)) return "sales";
  if (/매입|구매|purchase|supplier|자재/.test(merged)) return "purchase";
  if (/지출|비용|출금|expense|fee|rent|임대|인건비/.test(merged)) return "expense";
  return "unknown";
}

function normalizeUploadEvidence(value: string | undefined): TodayEvidenceStatus {
  const raw = (value ?? "").toLowerCase();
  if (/완료|있음|첨부|complete|ok|yes|y/.test(raw)) return "complete";
  if (/불필요|not/.test(raw)) return "not_required";
  if (/확인|review/.test(raw)) return "needs_review";
  return "missing";
}

function normalizeUploadPayment(value: string | undefined, finalType: TodayUploadFinalRecordType) {
  const raw = (value ?? "").toLowerCase();
  if (/카드|card/.test(raw)) return "card";
  if (/현금|cash/.test(raw)) return "cash";
  if (/계좌|이체|transfer|bank/.test(raw)) return finalType === "purchase" ? "bank_transfer" : "transfer";
  if (/배달/.test(raw)) return "delivery_app";
  if (/자동|auto/.test(raw)) return "auto_withdrawal";
  return finalType === "purchase" ? "undecided" : "unknown";
}

function normalizeUploadTaxInvoice(value: string | undefined): TaxInvoiceStatus {
  const raw = (value ?? "").toLowerCase();
  if (/발행|수취|received|issued|complete/.test(raw)) return "received";
  if (/요청|required|requested/.test(raw)) return "requested";
  if (/불필요|not/.test(raw)) return "not_needed";
  if (/없음|none/.test(raw)) return "none";
  return "unknown";
}

function buildUploadRowHash(mapped: UploadMappedRow, finalType: TodayUploadFinalRecordType, raw: UploadRawRow) {
  const base = finalType === "unknown" ? raw : { finalType, date: mapped.date, amount: mapped.amount, counterparty: mapped.counterparty_name ?? "", item: mapped.item_summary ?? "", category: mapped.category ?? "" };
  return stableUploadHash(JSON.stringify(base));
}

function getDuplicateCandidates(data: AppData, businessId: string, mapped: UploadMappedRow, finalType: TodayUploadFinalRecordType, rowHash: string, localDuplicate: boolean) {
  const candidates: Array<{ type: string; id: string; title: string }> = [];
  if (localDuplicate || data.today_upload_rows.some((row) => row.business_id === businessId && row.row_hash === rowHash && row.import_target_id)) {
    candidates.push({ type: "upload_row", id: rowHash, title: "같은 내용의 업로드 반영 이력이 있습니다." });
  }
  if (!mapped.date || !mapped.amount) return candidates;
  if (finalType === "sales") {
    data.sales_records.forEach((record) => {
      if (!record.deleted_at && record.business_id === businessId && record.sales_date === mapped.date && record.amount === mapped.amount) candidates.push({ type: "sales_records", id: record.id, title: record.sales_type });
    });
  }
  if (finalType === "expense") {
    data.expense_records.forEach((record) => {
      if (!record.deleted_at && record.business_id === businessId && record.expense_date === mapped.date && record.amount === mapped.amount && (!mapped.counterparty_name || record.vendor_name.includes(mapped.counterparty_name))) candidates.push({ type: "expense_records", id: record.id, title: record.expense_type });
    });
  }
  if (finalType === "purchase") {
    data.purchase_records.forEach((record) => {
      if (!record.deleted_at && (record.business_id === businessId || record.buyer_id === businessId) && record.purchase_date === mapped.date && record.total_amount === mapped.amount && (!mapped.counterparty_name || record.supplier_name.includes(mapped.counterparty_name))) candidates.push({ type: "purchase_records", id: record.id, title: record.purchase_title });
    });
  }
  return candidates;
}

function validateUploadRow(data: AppData, businessId: string, mapped: UploadMappedRow, finalType: TodayUploadFinalRecordType, rowHash: string, localDuplicate: boolean): { status: TodayUploadValidationStatus; messages: string[]; duplicateCandidates: Array<{ type: string; id: string; title: string }> } {
  if (finalType === "skip") return { status: "skipped", messages: ["반영 제외로 표시되었습니다."], duplicateCandidates: [] };
  const messages: string[] = [];
  if (finalType === "unknown") messages.push("매출/지출/매입 구분을 확인해 주세요.");
  if (!mapped.date) messages.push("날짜를 확인해 주세요.");
  if (!mapped.amount || mapped.amount <= 0) messages.push("금액을 확인해 주세요.");
  const duplicateCandidates = getDuplicateCandidates(data, businessId, mapped, finalType, rowHash, localDuplicate);
  if (duplicateCandidates.length) return { status: "duplicate", messages: ["중복 가능성이 있어 반영 전 확인이 필요합니다."], duplicateCandidates };
  if (messages.length) return { status: "invalid", messages, duplicateCandidates };
  if (!mapped.counterparty_name && finalType !== "sales") messages.push("거래처가 비어 있습니다.");
  if (!mapped.category) messages.push("카테고리가 비어 있습니다.");
  if (finalType !== "sales" && normalizeUploadEvidence(mapped.evidence_status) !== "complete") messages.push("증빙 상태 확인이 필요합니다.");
  return { status: messages.length ? "warning" : "valid", messages, duplicateCandidates };
}

function summarizeUploadBatch(batch: TodayUploadBatch, rows: TodayUploadRow[]): TodayUploadBatch {
  const validCount = rows.filter((row) => row.validation_status === "valid").length;
  const warningCount = rows.filter((row) => row.validation_status === "warning").length;
  const invalidCount = rows.filter((row) => row.validation_status === "invalid").length;
  const duplicateCount = rows.filter((row) => row.validation_status === "duplicate").length;
  const skippedCount = rows.filter((row) => row.validation_status === "skipped").length;
  const importedCount = rows.filter((row) => row.imported_at).length;
  const importableCount = validCount + warningCount;
  return {
    ...batch,
    status: importedCount > 0 ? (importedCount + skippedCount >= rows.length ? "imported" : "partially_imported") : invalidCount + duplicateCount > 0 || importableCount === 0 ? "mapping_needed" : "ready_to_import",
    row_count: rows.length,
    valid_count: validCount,
    warning_count: warningCount,
    invalid_count: invalidCount,
    duplicate_count: duplicateCount,
    imported_count: importedCount,
    skipped_count: skippedCount,
    updated_at: new Date().toISOString(),
  };
}

function rebuildUploadRows(data: AppData, batch: TodayUploadBatch, mappings: TodayUploadColumnMapping[], rows: TodayUploadRow[]) {
  const seen = new Set<string>();
  const rebuilt = rows.map((row) => {
    const raw = safeJsonParse<UploadRawRow>(row.raw_json, {});
    const mapped = mapUploadRow(raw, mappings);
    const detected = detectUploadRecordType(mapped, batch.upload_type);
    const finalType: TodayUploadFinalRecordType = row.final_record_type === "skip" ? "skip" : row.final_record_type === "unknown" ? detected : row.final_record_type;
    const rowHash = buildUploadRowHash(mapped, finalType, raw);
    const localDuplicate = seen.has(rowHash);
    seen.add(rowHash);
    const validation = validateUploadRow(data, batch.business_id, mapped, finalType, rowHash, localDuplicate);
    return {
      ...row,
      row_hash: rowHash,
      mapped_json: JSON.stringify(mapped),
      detected_record_type: detected,
      final_record_type: finalType,
      validation_status: validation.status,
      validation_messages_json: JSON.stringify(validation.messages),
      duplicate_candidate_json: JSON.stringify(validation.duplicateCandidates),
      updated_at: new Date().toISOString(),
    };
  });
  return rebuilt;
}

export function createUploadPreview(data: AppData, input: { businessId?: string; uploadType: TodayUploadType; fileName: string; fileMimeType: string; fileSize: number; headers: string[]; rows: UploadRawRow[]; createdBy?: string }): { data: AppData; batchId: string; error?: string } {
  const businessId = input.businessId ?? "buyer-1";
  if (!input.rows.length) return { data, batchId: "", error: "미리볼 행이 없습니다." };
  if (input.fileSize > 10 * 1024 * 1024) return { data, batchId: "", error: "10MB 이하 파일만 업로드할 수 있습니다." };
  const createdAt = new Date().toISOString();
  const batchId = `today-upload-${Date.now()}`;
  const mappings = detectUploadColumnMappings(input.headers, input.rows, businessId, batchId, input.createdBy ?? businessId);
  const batch: TodayUploadBatch = {
    id: batchId,
    business_id: businessId,
    upload_context: "buyer_today",
    upload_type: input.uploadType,
    status: "parsed",
    file_name: sanitizeUploadCell(input.fileName),
    file_mime_type: input.fileMimeType,
    file_size: input.fileSize,
    original_header_json: JSON.stringify(input.headers),
    detected_mapping_json: JSON.stringify(Object.fromEntries(mappings.map((mapping) => [mapping.source_column_name, mapping.target_field]))),
    row_count: input.rows.length,
    valid_count: 0,
    warning_count: 0,
    invalid_count: 0,
    duplicate_count: 0,
    imported_count: 0,
    skipped_count: 0,
    created_by: input.createdBy ?? businessId,
    created_at: createdAt,
    updated_at: createdAt,
  };
  const draftRows: TodayUploadRow[] = input.rows.map((raw, index) => ({
    id: `${batchId}-row-${index + 1}`,
    business_id: businessId,
    batch_id: batchId,
    row_index: index + 1,
    row_hash: "",
    raw_json: JSON.stringify(raw),
    mapped_json: "{}",
    detected_record_type: "unknown",
    final_record_type: "unknown",
    validation_status: "invalid",
    validation_messages_json: "[]",
    duplicate_candidate_json: "[]",
    created_at: createdAt,
    updated_at: createdAt,
  }));
  const rows = rebuildUploadRows(data, batch, mappings, draftRows);
  const summarizedBatch = summarizeUploadBatch(batch, rows);
  const nextData: AppData = {
    ...data,
    today_upload_batches: [summarizedBatch, ...data.today_upload_batches],
    today_upload_rows: [...rows, ...data.today_upload_rows],
    today_upload_column_mappings: [...mappings, ...data.today_upload_column_mappings],
    today_upload_logs: [{
      id: `${batchId}-log-uploaded`,
      business_id: businessId,
      batch_id: batchId,
      action: "uploaded",
      message: `${input.fileName} 파일을 미리보기로 분석했습니다.`,
      payload_json: JSON.stringify({ fileSize: input.fileSize, rowCount: rows.length }),
      created_by: input.createdBy ?? businessId,
      created_at: createdAt,
    }, ...data.today_upload_logs],
  };
  saveData(nextData);
  return { data: nextData, batchId };
}

export function updateUploadColumnMapping(data: AppData, batchId: string, sourceColumnName: string, targetField: TodayUploadTargetField): AppData {
  const batch = data.today_upload_batches.find((entry) => entry.id === batchId);
  if (!batch) return data;
  const mappings = data.today_upload_column_mappings.map((mapping) => mapping.batch_id === batchId && mapping.source_column_name === sourceColumnName ? { ...mapping, target_field: targetField, confidence: 1, updated_at: new Date().toISOString() } : mapping);
  const batchMappings = mappings.filter((mapping) => mapping.batch_id === batchId);
  const rebuiltRows = rebuildUploadRows(data, batch, batchMappings, data.today_upload_rows.filter((row) => row.batch_id === batchId));
  const summarizedBatch = summarizeUploadBatch(batch, rebuiltRows);
  const nextData = {
    ...data,
    today_upload_batches: data.today_upload_batches.map((entry) => entry.id === batchId ? { ...summarizedBatch, detected_mapping_json: JSON.stringify(Object.fromEntries(batchMappings.map((mapping) => [mapping.source_column_name, mapping.target_field]))) } : entry),
    today_upload_column_mappings: mappings,
    today_upload_rows: data.today_upload_rows.map((row) => rebuiltRows.find((rebuilt) => rebuilt.id === row.id) ?? row),
    today_upload_logs: [{
      id: `${batchId}-log-mapping-${Date.now()}`,
      business_id: batch.business_id,
      batch_id: batchId,
      action: "mapping_changed" as const,
      message: `${sourceColumnName} 컬럼 매핑을 변경했습니다.`,
      payload_json: JSON.stringify({ sourceColumnName, targetField }),
      created_by: batch.business_id,
      created_at: new Date().toISOString(),
    }, ...data.today_upload_logs],
  };
  saveData(nextData);
  return nextData;
}

export function updateUploadRow(data: AppData, rowId: string, patch: Partial<UploadMappedRow> & { final_record_type?: TodayUploadFinalRecordType }): AppData {
  const row = data.today_upload_rows.find((entry) => entry.id === rowId);
  if (!row) return data;
  const batch = data.today_upload_batches.find((entry) => entry.id === row.batch_id);
  if (!batch) return data;
  const mapped = { ...safeJsonParse<UploadMappedRow>(row.mapped_json, {}), ...patch };
  const finalType = patch.final_record_type ?? row.final_record_type;
  const raw = safeJsonParse<UploadRawRow>(row.raw_json, {});
  const rowHash = buildUploadRowHash(mapped, finalType, raw);
  const validation = validateUploadRow(data, row.business_id, mapped, finalType, rowHash, false);
  const updatedRow: TodayUploadRow = {
    ...row,
    row_hash: rowHash,
    mapped_json: JSON.stringify(mapped),
    final_record_type: finalType,
    validation_status: validation.status,
    validation_messages_json: JSON.stringify(validation.messages),
    duplicate_candidate_json: JSON.stringify(validation.duplicateCandidates),
    updated_at: new Date().toISOString(),
  };
  const batchRows = data.today_upload_rows.map((entry) => entry.id === rowId ? updatedRow : entry).filter((entry) => entry.batch_id === batch.id);
  const summarizedBatch = summarizeUploadBatch(batch, batchRows);
  const nextData = {
    ...data,
    today_upload_rows: data.today_upload_rows.map((entry) => entry.id === rowId ? updatedRow : entry),
    today_upload_batches: data.today_upload_batches.map((entry) => entry.id === batch.id ? summarizedBatch : entry),
    today_upload_logs: [{
      id: `${batch.id}-log-row-${Date.now()}`,
      business_id: batch.business_id,
      batch_id: batch.id,
      row_id: rowId,
      action: "row_updated" as const,
      message: `${row.row_index}행을 수정했습니다.`,
      payload_json: JSON.stringify(patch),
      created_by: batch.business_id,
      created_at: new Date().toISOString(),
    }, ...data.today_upload_logs],
  };
  saveData(nextData);
  return nextData;
}

export function cancelUploadBatch(data: AppData, batchId: string): AppData {
  const updatedAt = new Date().toISOString();
  const nextData = {
    ...data,
    today_upload_batches: data.today_upload_batches.map((batch) => batch.id === batchId ? { ...batch, status: "cancelled" as const, cancelled_at: updatedAt, updated_at: updatedAt } : batch),
  };
  saveData(nextData);
  return nextData;
}

export function importUploadRows(data: AppData, batchId: string, options: { selectedRowIds?: string[]; validOnly?: boolean; allowWarnings?: boolean; skipDuplicates?: boolean; actorUserId?: string } = {}): { data: AppData; importedCount: number; skippedCount: number; error?: string } {
  const batch = data.today_upload_batches.find((entry) => entry.id === batchId);
  if (!batch) return { data, importedCount: 0, skippedCount: 0, error: "업로드 묶음을 찾을 수 없습니다." };
  const selected = options.selectedRowIds ? new Set(options.selectedRowIds) : null;
  let nextData = data;
  let importedCount = 0;
  let skippedCount = 0;
  const rows = data.today_upload_rows.filter((row) => row.batch_id === batchId && (!selected || selected.has(row.id)));
  for (const row of rows) {
    if (row.imported_at || row.final_record_type === "skip" || row.validation_status === "skipped") {
      skippedCount += 1;
      continue;
    }
    if (row.validation_status === "invalid" || row.validation_status === "duplicate" || (row.validation_status === "warning" && !options.allowWarnings) || (options.validOnly && row.validation_status !== "valid")) {
      skippedCount += 1;
      continue;
    }
    const mapped = safeJsonParse<UploadMappedRow>(row.mapped_json, {});
    const type = row.final_record_type;
    let targetTable: TodayUploadRow["import_target_table"];
    let targetId = "";
    if (type === "sales") {
      const result = createSalesRecord(nextData, {
        business_id: row.business_id,
        sales_type: (mapped.category || "기타 매출") as TodaySalesRecord["sales_type"],
        payment_method: normalizeUploadPayment(mapped.payment_method, type) as TodaySalesRecord["payment_method"],
        sales_channel: "etc",
        amount: mapped.amount ?? 0,
        sales_date: mapped.date ?? "",
        memo: [mapped.item_summary, mapped.memo, `업로드: ${batch.file_name}`].filter(Boolean).join(" / "),
        evidence_status: normalizeUploadEvidence(mapped.evidence_status),
        created_by: options.actorUserId ?? row.business_id,
      });
      if (result.error) {
        skippedCount += 1;
        continue;
      }
      nextData = {
        ...result.data,
        sales_records: result.data.sales_records.map((record) => record.id === result.salesId ? { ...record, source: "upload", source_id: row.id, upload_batch_id: batchId } : record),
      };
      targetTable = "sales_records";
      targetId = result.salesId;
    }
    if (type === "expense") {
      const result = createExpenseRecord(nextData, {
        business_id: row.business_id,
        expense_type: (mapped.category || "기타") as TodayExpenseRecord["expense_type"],
        payment_method: normalizeUploadPayment(mapped.payment_method, type) as TodayExpenseRecord["payment_method"],
        vendor_name: mapped.counterparty_name ?? "",
        amount: mapped.amount ?? 0,
        expense_date: mapped.date ?? "",
        memo: [mapped.item_summary, mapped.memo, `업로드: ${batch.file_name}`].filter(Boolean).join(" / "),
        evidence_status: normalizeUploadEvidence(mapped.evidence_status),
        created_by: options.actorUserId ?? row.business_id,
      });
      if (result.error) {
        skippedCount += 1;
        continue;
      }
      nextData = {
        ...result.data,
        expense_records: result.data.expense_records.map((record) => record.id === result.expenseId ? { ...record, source: "upload", source_id: row.id, upload_batch_id: batchId } : record),
      };
      targetTable = "expense_records";
      targetId = result.expenseId;
    }
    if (type === "purchase") {
      const result = createManualPurchaseRecord(nextData, {
        purchase_title: mapped.item_summary || mapped.category || "업로드 매입",
        supplier_name: mapped.counterparty_name || "업로드 거래처",
        supplier_business_number: "",
        purchase_date: mapped.date ?? "",
        category_name: mapped.category || "기타",
        accounting_category: getAccountingCategory(mapped.category || "기타"),
        sub_category: "",
        total_amount: mapped.amount ?? 0,
        supply_amount: 0,
        vat_amount: 0,
        delivery_fee: 0,
        discount_amount: 0,
        payment_method: normalizeUploadPayment(mapped.payment_method, type) as PaymentMethod,
        tax_invoice_status: normalizeUploadTaxInvoice(mapped.tax_invoice_status),
        receipt_status: normalizeUploadEvidence(mapped.evidence_status) === "complete" ? "confirmed" : "pending",
        delivery_note_status: "none",
        memo: [mapped.memo, `업로드: ${batch.file_name}`].filter(Boolean).join(" / "),
        items: [{
          item_name: mapped.item_summary || mapped.category || "업로드 매입",
          spec: "",
          quantity: 1,
          unit: "건",
          unit_price: mapped.amount ?? 0,
          total_price: mapped.amount ?? 0,
          memo: mapped.memo ?? "",
        }],
      });
      nextData = {
        ...result.data,
        purchase_records: result.data.purchase_records.map((record) => record.id === result.purchaseId ? { ...record, source: "upload", source_id: row.id, business_id: row.business_id, evidence_status: normalizeUploadEvidence(mapped.evidence_status), evidence_files_json: "[]" } : record),
      };
      targetTable = "purchase_records";
      targetId = result.purchaseId;
    }
    if (!targetId || !targetTable) {
      skippedCount += 1;
      continue;
    }
    const importedAt = new Date().toISOString();
    nextData = {
      ...nextData,
      today_upload_rows: nextData.today_upload_rows.map((entry) => entry.id === row.id ? { ...entry, validation_status: "imported", import_target_table: targetTable, import_target_id: targetId, imported_at: importedAt, updated_at: importedAt } : entry),
    };
    importedCount += 1;
  }
  const batchRows = nextData.today_upload_rows.filter((row) => row.batch_id === batchId);
  const summarizedBatch = summarizeUploadBatch(batch, batchRows);
  const importedAt = new Date().toISOString();
  nextData = {
    ...nextData,
    today_upload_batches: nextData.today_upload_batches.map((entry) => entry.id === batchId ? { ...summarizedBatch, imported_at: summarizedBatch.imported_count > 0 ? importedAt : entry.imported_at } : entry),
    today_upload_logs: [{
      id: `${batchId}-log-import-${Date.now()}`,
      business_id: batch.business_id,
      batch_id: batchId,
      action: importedCount > 0 ? "imported" : "failed",
      message: `${importedCount}건을 장부에 반영하고 ${skippedCount}건을 건너뛰었습니다.`,
      payload_json: JSON.stringify({ importedCount, skippedCount }),
      created_by: options.actorUserId ?? batch.business_id,
      created_at: importedAt,
    }, ...nextData.today_upload_logs],
  };
  saveData(nextData);
  return { data: nextData, importedCount, skippedCount };
}

export function getTodayUploadTemplateRows(type: TodayUploadType): string[][] {
  const base = ["날짜", "구분", "카테고리", "거래처", "품목", "금액", "결제수단", "증빙", "세금계산서", "메모"];
  const rowType = type === "mixed" || type === "unknown" ? "매입" : todayUploadTypeLabels[type];
  return [
    base,
    ["2026-07-06", rowType, type === "sales" ? "매장 매출" : type === "expense" ? "소모품" : "포장재", type === "sales" ? "" : "서울포장", type === "sales" ? "점심 매출" : "치킨박스", "120000", "카드", "있음", type === "sales" ? "불필요" : "수취", "검수 후 반영"],
  ];
}

export function parseItemsFromText(input: string): QuoteRequestDraft["items"] {
  const chunks = input
    .replace(/\s+(그리고|및|랑|와|과)\s+/g, ",")
    .split(/[\n,;]/)
    .map((entry) => entry.trim())
    .filter(Boolean);

  const items = chunks.map((chunk) => {
    const quantityMatch = chunk.match(/(\d[\d,]*)\s*(개|장|kg|g|통|박스|box|BOX|m|미터|망|팩|봉|롤|L|리터)?/);
    const quantity = quantityMatch ? Number(quantityMatch[1].replace(/,/g, "")) || 1 : 1;
    const unit = quantityMatch?.[2]?.replace("box", "BOX") ?? "개";
    const specMatch = chunk.match(/(\d+\s?(?:oz|파이|kg|g|L|리터|m|미터)|[가-힣A-Za-z]+형|대형|중형|소형)/i);
    const spec = specMatch?.[1]?.replace(/\s+/g, "") ?? "";
    const itemName = chunk
      .replace(quantityMatch?.[0] ?? "", "")
      .replace(specMatch?.[0] ?? "", "")
      .replace(/필요|구매|견적|요청|정도|쯤|주세요/g, "")
      .trim();

    return draftItem(itemName || chunk.slice(0, 24), spec, quantity, unit, "", false, true, itemName ? 82 : 62, !itemName, itemName ? "" : "품목명이 명확하지 않아 확인이 필요합니다.");
  });

  if (items.length > 0) return items.slice(0, 8);

  return [draftItem(input.slice(0, 24) || "품목명 확인 필요", "", 1, "개", "", false, true, 55, true, "문장에서 품목과 수량을 찾지 못했습니다.")];
}

export function analyzeReceiptPhotoForQuoteRequest(fileName: string, sourceType: Extract<AnalysisSourceType, "photo" | "receipt" | "invoice"> = "photo") {
  const normalizedFileName = fileName.trim() || defaultAnalysisFileName(sourceType);
  const profile = receiptAnalysisProfile(normalizedFileName);
  const createdAt = new Date().toISOString();
  const analysisId = `receipt-preview-${createdAt.replace(/\D/g, "")}`;
  const analysisItems = parseTextToAnalysisItems(profile.rawText, analysisId, createdAt);
  const totalAmount = extractAmountsFromText(profile.rawText, analysisItems);
  const confidenceScore = calculateAnalysisConfidence(analysisItems, { supplierName: profile.supplierName, totalAmount });
  const attachment = {
    file_name: normalizedFileName,
    file_type: fileTypeFromName(normalizedFileName) || (sourceType === "invoice" ? "pdf" : "jpg"),
    analysis_status: "analyzed",
    extracted_text: `${profile.supplierName} 영수증에서 ${analysisItems.length}개 품목을 추출했습니다.`,
    extracted_items_json: JSON.stringify({
      sourceType,
      supplierName: profile.supplierName,
      categoryName: profile.categoryName,
      confidenceScore,
      totalAmount,
      rawText: profile.rawText,
      items: analysisItems,
    }),
  } satisfies QuoteRequestDraft["attachments"][number];

  return {
    fileName: normalizedFileName,
    sourceType,
    supplierName: profile.supplierName,
    categoryName: profile.categoryName,
    confidenceScore,
    totalAmount,
    rawText: profile.rawText,
    attachment,
    items: analysisItems.map((itemEntry) =>
      draftItem(
        itemEntry.item_name,
        itemEntry.spec,
        itemEntry.quantity,
        itemEntry.unit,
        itemEntry.review_reason || `이전 구매 단가 ${formatWon(itemEntry.unit_price)}`,
        true,
        true,
        itemEntry.confidence_score,
        itemEntry.review_status === "needs_review",
        itemEntry.review_reason,
      ),
    ),
  };
}

export function calculateRequestQuality(
  requestLike: Partial<QuoteRequest> & Partial<QuoteRequestDraft>,
  items: Array<Partial<QuoteRequestItem>>,
  attachments: Array<Partial<QuoteAttachment>> = [],
): number {
  const cleanItems = items.filter((entry) => entry.item_name?.trim());
  const itemCompleteness = cleanItems.length
    ? cleanItems.reduce((score, entry) => {
        const detailScore = (entry.spec ? 1 : 0) + (entry.quantity ? 1 : 0) + (entry.unit ? 1 : 0) + (entry.memo ? 0.5 : 0);
        return score + Math.min(1, detailScore / 3);
      }, 0) / cleanItems.length
    : 0;

  let score = 0;
  if (requestLike.title?.trim()) score += 8;
  if (requestLike.category_id || requestLike.category_name) score += 8;
  if (requestLike.delivery_region?.trim()) score += 10;
  if (requestLike.desired_delivery_date?.trim()) score += 8;
  if (requestLike.delivery_address?.trim()) score += 5;
  if (requestLike.preferred_delivery_time?.trim()) score += 5;
  if (cleanItems.length > 0) score += 14;
  score += Math.round(itemCompleteness * 22);
  if (requestLike.description?.trim()) score += 8;
  if (requestLike.attachment_note?.trim() || attachments.length > 0) score += 6;
  if (Number(requestLike.previous_amount) > 0 || Number(requestLike.budget_min) > 0 || Number(requestLike.budget_max) > 0) score += 8;
  if (typeof requestLike.need_tax_invoice === "boolean") score += 3;
  if (typeof requestLike.card_payment_required === "boolean") score += 3;
  if (typeof requestLike.include_delivery_fee === "boolean") score += 2;

  return Math.max(20, Math.min(100, score));
}

export function estimateSupplierMatches(
  data: AppData,
  categoryName: string,
  deliveryRegion: string,
  needTaxInvoice = false,
  cardPaymentRequired = false,
): number {
  return data.supplier_profiles.filter((supplier) => matchesSupplierRequestConditions(supplier, categoryName, deliveryRegion, needTaxInvoice, cardPaymentRequired)).length;
}

export function calculateSupplierMatchScore(supplier: SupplierProfile, request: QuoteRequest, data?: AppData): number {
  if (supplier.approval_status !== "approved") return 0;
  let score = 0;
  const stats = data?.supplier_stats.find((entry) => entry.supplier_id === supplier.id);
  const reputation = data ? getSupplierReputation(data, supplier.id) : undefined;
  const categoryMatch = matchesSupplierCategory(supplier, request.category_name);
  const regionMatch = matchesSupplierRegion(supplier, request.delivery_region);
  const requestPrimaryRegion = primaryRegion(request.delivery_region);
  const nearbyRegion = !regionMatch && Boolean(requestPrimaryRegion && supplier.service_regions.some((region) => primaryRegion(region) === requestPrimaryRegion));
  const subCategoryMatch = (supplier.sub_categories ?? []).some((subCategory) => request.description.includes(subCategory) || request.title.includes(subCategory));
  const taxMatch = !request.need_tax_invoice || supplier.tax_invoice_available;
  const cardMatch = !request.card_payment_required || supplier.card_payment_available;

  if (categoryMatch) score += 35;
  if (subCategoryMatch) score += 10;
  if (regionMatch) score += 25;
  else if (nearbyRegion) score += 10;
  if (taxMatch) score += 6;
  if (cardMatch) score += 6;
  if (stats && stats.average_response_minutes <= 90) score += 8;
  if (stats && stats.response_rate >= 80) score += 8;
  if ((reputation?.total_score ?? 0) >= 80) score += 8;
  if (data?.quotes.some((quoteRecord) => quoteRecord.supplier_id === supplier.id && data.quote_requests.some((requestRecord) => requestRecord.id === quoteRecord.quote_request_id && requestRecord.category_name === request.category_name))) score += 10;
  if ((supplier.default_quote_valid_days ?? 3) <= 3) score += 3;
  if (supplier.urgent_delivery_available && request.urgent) score += 5;
  if ((stats?.response_rate ?? 100) < 45) score -= 10;
  if ((reputation?.risk_level ?? "normal") === "high" || supplier.approval_status !== "approved") score -= 20;
  if (categoryMatch && regionMatch && taxMatch && cardMatch && score < SUPPLIER_VISIBLE_MATCH_THRESHOLD) score = SUPPLIER_VISIBLE_MATCH_THRESHOLD;
  return Math.max(0, Math.min(100, score));
}

export function getMatchedSuppliersForRequest(request: QuoteRequest, suppliers: SupplierProfile[], data?: AppData): SupplierProfile[] {
  return suppliers
    .filter((supplier) => calculateSupplierMatchScore(supplier, request, data) >= SUPPLIER_VISIBLE_MATCH_THRESHOLD)
    .sort((a, b) => calculateSupplierMatchScore(b, request, data) - calculateSupplierMatchScore(a, request, data));
}

export function getVisibleRequestsForSupplier(supplier: SupplierProfile, requests: QuoteRequest[], data?: AppData): QuoteRequest[] {
  if (supplier.approval_status !== "approved") return [];
  return requests
    .filter((request) => calculateSupplierMatchScore(supplier, request, data) >= SUPPLIER_VISIBLE_MATCH_THRESHOLD)
    .sort((a, b) => calculateSupplierMatchScore(supplier, b, data) - calculateSupplierMatchScore(supplier, a, data));
}

export function createSupplierApplication(data: AppData, draft: SupplierApplicationDraft): { data: AppData; supplierId: string } {
  const createdAt = new Date().toISOString();
  const supplierId = `sup-${Date.now()}`;
  const supplierRecord: SupplierProfile = {
    id: supplierId,
    user_id: `user-${supplierId}`,
    business_name: draft.business_name.trim(),
    business_number: draft.business_number.trim(),
    representative_name: draft.representative_name.trim(),
    manager_name: draft.manager_name.trim(),
    manager_phone: draft.manager_phone.trim(),
    phone: draft.phone.trim(),
    email: draft.email.trim(),
    address: draft.address.trim(),
    description: draft.description.trim(),
    service_regions: draft.service_regions,
    categories: draft.categories,
    sub_categories: draft.sub_categories,
    min_order_amount: Number(draft.min_order_amount) || 0,
    delivery_fee_policy: draft.delivery_fee_policy.trim(),
    free_delivery_min_amount: Number(draft.free_delivery_min_amount) || 0,
    same_day_delivery_available: draft.same_day_delivery_available,
    urgent_delivery_available: draft.urgent_delivery_available,
    delivery_days: draft.delivery_days,
    delivery_time_slots: draft.delivery_time_slots,
    tax_invoice_available: draft.tax_invoice_available,
    card_payment_available: draft.card_payment_available,
    bank_transfer_available: draft.bank_transfer_available,
    on_site_payment_available: draft.on_site_payment_available,
    default_quote_valid_days: Number(draft.default_quote_valid_days) || 3,
    approval_status: "pending",
    admin_memo: "신규 입점 신청 검토 대기",
    rejection_reason: "",
    created_at: createdAt,
    updated_at: createdAt,
  };

  const documents = draft.documents
    .filter((document) => document.file_name.trim())
    .map((document, index): SupplierDocument => ({
      id: `${supplierId}-doc-${index + 1}`,
      supplier_id: supplierId,
      document_type: document.document_type,
      file_url: "#",
      file_name: document.file_name.trim(),
      status: document.status,
      uploaded_at: createdAt,
    }));

  const stats = supplierStats(`stat-${supplierId}`, supplierId, 0, 0, 0, 0, 0, 0, 0, 0);
  let nextData: AppData = {
    ...data,
    supplier_profiles: [supplierRecord, ...data.supplier_profiles],
    supplier_documents: [...documents, ...data.supplier_documents],
    supplier_stats: [stats, ...data.supplier_stats],
  };
  nextData = appendNotification(nextData, {
    user_id: adminUserId(nextData),
    user_role: "admin",
    type: "supplier_apply_submitted",
    title: "공급업체 입점 신청이 들어왔습니다.",
    body: `${supplierRecord.business_name}이 입점 신청을 완료했습니다.`,
    link_url: "/app/admin/suppliers",
    related_entity_type: "supplier",
    related_entity_id: supplierId,
    priority: "normal",
    actor_user_id: supplierRecord.user_id,
  });

  saveData(nextData);
  return { data: nextData, supplierId };
}

export function updateSupplierApprovalStatus(
  data: AppData,
  supplierId: string,
  status: SupplierProfile["approval_status"],
  memo: string,
): AppData {
  const updatedAt = new Date().toISOString();
  const targetSupplier = data.supplier_profiles.find((entry) => entry.id === supplierId);
  let nextData: AppData = {
    ...data,
    supplier_profiles: data.supplier_profiles.map((supplier) =>
      supplier.id === supplierId
        ? {
            ...supplier,
            approval_status: status,
            admin_memo: memo,
            rejection_reason: status === "rejected" || status === "needs_revision" ? memo : "",
            updated_at: updatedAt,
          }
        : supplier,
    ),
  };
  if (targetSupplier) {
    nextData = appendNotification(nextData, {
      user_id: targetSupplier.user_id,
      user_role: "supplier",
      type: "document_review_result",
      title: "입점/인증자료 검토 결과가 도착했습니다.",
      body: `${targetSupplier.business_name} 상태가 ${supplierApprovalLabels[status]}로 변경되었습니다.`,
      link_url: "/app/supplier/profile",
      related_entity_type: "supplier",
      related_entity_id: supplierId,
      priority: status === "approved" ? "normal" : "high",
      actor_user_id: adminUserId(nextData),
    });
  }
  saveData(nextData);
  return nextData;
}

export function updateSupplierProfile(data: AppData, supplier: SupplierProfile): AppData {
  let nextData: AppData = {
    ...data,
    supplier_profiles: data.supplier_profiles.map((entry) => (entry.id === supplier.id ? { ...supplier, updated_at: new Date().toISOString() } : entry)),
  };
  saveData(nextData);
  return nextData;
}

export function getProductCategoryName(data: AppData, categoryId: string) {
  return data.product_categories.find((entry) => entry.id === categoryId)?.name
    ?? data.categories.find((entry) => entry.id === categoryId)?.name
    ?? "기타";
}

function moneyLabel(value: number) {
  return `${Math.round(value || 0).toLocaleString("ko-KR")}원`;
}

export function getSupplierProductPriceLabel(product: SupplierProduct) {
  if (product.price_type === "fixed") return `${moneyLabel(product.price)} / ${product.unit_label}`;
  if (product.price_type === "from_price") return `${moneyLabel(product.from_price)}부터 / ${product.unit_label}`;
  return "견적 문의";
}

export function getVisibleSupplierProducts(data: AppData) {
  return data.supplier_products
    .filter((product) => !product.deleted_at && product.is_public && product.approval_status === "approved")
    .filter((product) => data.supplier_profiles.some((supplier) => supplier.id === product.supplier_id && supplier.approval_status === "approved"))
    .sort((a, b) => Number(b.is_featured) - Number(a.is_featured) || b.updated_at.localeCompare(a.updated_at));
}

export function getSupplierProducts(data: AppData, supplierId: string) {
  return data.supplier_products
    .filter((product) => product.supplier_id === supplierId && !product.deleted_at)
    .sort((a, b) => b.updated_at.localeCompare(a.updated_at));
}

export function getSupplierStoreProfile(data: AppData, supplierId: string) {
  const supplier = data.supplier_profiles.find((entry) => entry.id === supplierId);
  const existing = data.supplier_store_profiles.find((entry) => entry.supplier_id === supplierId);
  if (existing) return existing;
  return supplier
    ? {
        id: `store-${supplier.id}`,
        supplier_id: supplier.id,
        store_name: `${supplier.business_name} 상품관`,
        store_description: supplier.description || "공급업체가 등록한 상품을 확인하고 문의할 수 있습니다.",
        store_logo_url: "/아이콘.png",
        store_banner_url: "",
        main_categories: supplier.categories,
        delivery_regions: supplier.service_regions,
        business_hours_text: "영업시간은 상품 문의 후 확인합니다.",
        contact_policy_text: "싸와 문의/견적요청으로 조건을 확인합니다.",
        return_policy_text: "상품 특성에 따라 공급업체가 조건을 안내합니다.",
        is_public: supplier.approval_status === "approved",
        created_at: supplier.created_at,
        updated_at: supplier.updated_at ?? supplier.created_at,
      }
    : undefined;
}

export function getSupplierProductSummary(data: AppData, supplierId?: string) {
  const products = supplierId ? getSupplierProducts(data, supplierId) : data.supplier_products.filter((product) => !product.deleted_at);
  return {
    total: products.length,
    publicCount: products.filter((product) => product.is_public && product.approval_status === "approved").length,
    pendingCount: products.filter((product) => product.approval_status === "pending").length,
    hiddenCount: products.filter((product) => product.approval_status === "hidden" || !product.is_public).length,
    inquiryCount: data.product_inquiries.filter((entry) => !supplierId || entry.supplier_id === supplierId).length,
    orderRequestCount: data.product_order_requests.filter((entry) => !supplierId || entry.supplier_id === supplierId).length,
    reportCount: data.product_reports.filter((entry) => products.some((product) => product.id === entry.product_id) && entry.status !== "dismissed").length,
  };
}

function hasExternalTradeSignal(value: string) {
  return /(010[-\s]?\d{3,4}[-\s]?\d{4}|카톡|카카오|계좌|직거래|전화\s*주세요|문자\s*주세요|외부\s*결제)/i.test(value);
}

function productNeedsReview(draft: SupplierProductDraft) {
  return hasExternalTradeSignal(`${draft.title} ${draft.short_description} ${draft.description}`);
}

export function createSupplierProduct(data: AppData, supplierId: string, draft: SupplierProductDraft): { data: AppData; productId: string } {
  const supplier = data.supplier_profiles.find((entry) => entry.id === supplierId);
  const createdAt = new Date().toISOString();
  const productId = `prod-${Date.now()}`;
  const publicAllowed = supplier?.approval_status === "approved" && draft.is_public;
  const reviewRequired = publicAllowed || productNeedsReview(draft);
  const productRecord: SupplierProduct = {
    id: productId,
    supplier_id: supplierId,
    category_id: draft.category_id,
    title: draft.title.trim(),
    short_description: draft.short_description.trim(),
    description: draft.description.trim(),
    main_image_url: draft.main_image_url.trim() || "/아이콘.png",
    image_urls: [],
    sku: draft.sku.trim(),
    brand: draft.brand.trim(),
    origin: draft.origin.trim(),
    unit_label: draft.unit_label.trim() || "개",
    package_unit: draft.package_unit.trim(),
    min_order_quantity: Math.max(1, Number(draft.min_order_quantity) || 1),
    price_type: draft.price_type,
    price: Number(draft.price) || 0,
    from_price: Number(draft.from_price) || 0,
    vat_included: draft.vat_included,
    delivery_fee_type: draft.delivery_fee_type,
    delivery_fee_amount: Number(draft.delivery_fee_amount) || 0,
    available_regions: draft.available_regions.length ? draft.available_regions : supplier?.service_regions ?? [],
    tax_invoice_available: draft.tax_invoice_available,
    card_payment_available: draft.card_payment_available,
    safe_trade_available: draft.safe_trade_available,
    stock_status: draft.stock_status,
    lead_time_text: draft.lead_time_text.trim(),
    is_featured: draft.is_featured,
    is_public: publicAllowed,
    approval_status: reviewRequired ? "pending" : "draft",
    rejection_reason: "",
    view_count: 0,
    inquiry_count: 0,
    quote_add_count: 0,
    order_request_count: 0,
    favorite_count: 0,
    created_at: createdAt,
    updated_at: createdAt,
  };
  let nextData: AppData = {
    ...data,
    supplier_products: [productRecord, ...data.supplier_products],
  };
  if (reviewRequired) {
    nextData = appendNotification(nextData, {
      user_id: adminUserId(nextData),
      user_role: "admin",
      type: "product_approval_result",
      title: "상품 공개 검토가 필요합니다.",
      body: `${supplier?.business_name ?? "공급업체"}가 ${productRecord.title} 상품 공개를 요청했습니다.`,
      link_url: "/app/admin/products",
      related_entity_type: "product",
      related_entity_id: productId,
      priority: productNeedsReview(draft) ? "high" : "normal",
      actor_user_id: supplier?.user_id ?? supplierUserId(supplierId),
    });
  }
  saveData(nextData);
  return { data: nextData, productId };
}

export function updateSupplierProduct(data: AppData, productId: string, patch: Partial<SupplierProduct>): AppData {
  const updatedAt = new Date().toISOString();
  const current = data.supplier_products.find((entry) => entry.id === productId);
  const wantsPublic = patch.is_public === true || (patch.is_public === undefined && current?.is_public);
  const nextData: AppData = {
    ...data,
    supplier_products: data.supplier_products.map((product) =>
      product.id === productId
        ? {
            ...product,
            ...patch,
            approval_status: wantsPublic && product.approval_status !== "approved" ? "pending" : patch.approval_status ?? product.approval_status,
            updated_at: updatedAt,
          }
        : product,
    ),
  };
  saveData(nextData);
  return nextData;
}

export function deleteSupplierProduct(data: AppData, productId: string): AppData {
  const updatedAt = new Date().toISOString();
  const nextData: AppData = {
    ...data,
    supplier_products: data.supplier_products.map((product) =>
      product.id === productId
        ? { ...product, is_public: false, approval_status: "hidden", deleted_at: updatedAt, updated_at: updatedAt }
        : product,
    ),
  };
  saveData(nextData);
  return nextData;
}

export function updateProductApprovalStatus(data: AppData, productId: string, status: ProductApprovalStatus, reason = ""): AppData {
  const updatedAt = new Date().toISOString();
  const product = data.supplier_products.find((entry) => entry.id === productId);
  const supplier = product ? data.supplier_profiles.find((entry) => entry.id === product.supplier_id) : undefined;
  let nextData: AppData = {
    ...data,
    supplier_products: data.supplier_products.map((entry) =>
      entry.id === productId
        ? {
            ...entry,
            approval_status: status,
            is_public: status === "approved" ? true : status === "hidden" || status === "suspended" || status === "rejected" ? false : entry.is_public,
            rejection_reason: status === "rejected" ? reason : "",
            updated_at: updatedAt,
          }
        : entry,
    ),
  };
  if (product && supplier) {
    nextData = appendNotification(nextData, {
      user_id: supplier.user_id,
      user_role: "supplier",
      type: "product_approval_result",
      title: "상품 공개 검토 결과가 도착했습니다.",
      body: `${product.title} 상태가 ${productApprovalStatusLabels[status]}로 변경되었습니다.${reason ? ` ${reason}` : ""}`,
      link_url: "/app/supplier/products",
      related_entity_type: "product",
      related_entity_id: productId,
      priority: status === "approved" ? "normal" : "high",
      actor_user_id: adminUserId(nextData),
    });
  }
  saveData(nextData);
  return nextData;
}

function ensureProductMessageThread(data: AppData, product: SupplierProduct, buyerId: string, createdAt: string) {
  const existing = data.message_threads.find((entry) => entry.thread_type === "product" && entry.related_entity_id === product.id && entry.buyer_id === buyerId);
  if (existing) return { data, threadId: existing.id };
  const supplier = data.supplier_profiles.find((entry) => entry.id === product.supplier_id);
  const threadId = `thread-product-${product.id}-${buyerId}-${Date.now()}`;
  const threadRecord = messageThread(threadId, "product", product.id, buyerId, product.supplier_id, `${product.title} 상품 문의`, "open", createdAt);
  const nextData: AppData = {
    ...data,
    message_threads: [threadRecord, ...data.message_threads],
    message_read_states: [
      readState(`mrs-${threadId}-${buyerId}`, threadId, buyerId, 0, createdAt),
      readState(`mrs-${threadId}-${supplier?.user_id ?? supplierUserId(product.supplier_id)}`, threadId, supplier?.user_id ?? supplierUserId(product.supplier_id), 1, createdAt),
      ...data.message_read_states,
    ],
  };
  return { data: nextData, threadId };
}

export function createProductInquiry(data: AppData, productId: string, buyerId: string, draft: ProductInquiryDraft): { data: AppData; inquiryId: string; threadId: string } {
  const product = data.supplier_products.find((entry) => entry.id === productId);
  if (!product || product.deleted_at || product.approval_status !== "approved" || !product.is_public) return { data, inquiryId: "", threadId: "" };
  const createdAt = new Date().toISOString();
  const threadResult = ensureProductMessageThread(data, product, buyerId, createdAt);
  const inquiryId = `pinquiry-${Date.now()}`;
  const inquiryRecord: ProductInquiry = {
    id: inquiryId,
    product_id: product.id,
    buyer_id: buyerId,
    supplier_id: product.supplier_id,
    inquiry_type: draft.inquiry_type,
    message: draft.message.trim(),
    quantity: Math.max(1, Number(draft.quantity) || 1),
    desired_delivery_date: draft.desired_delivery_date,
    delivery_region: draft.delivery_region.trim(),
    status: "pending",
    thread_id: threadResult.threadId,
    created_at: createdAt,
    updated_at: createdAt,
  };
  const supplier = threadResult.data.supplier_profiles.find((entry) => entry.id === product.supplier_id);
  let nextData: AppData = {
    ...threadResult.data,
    product_inquiries: [inquiryRecord, ...threadResult.data.product_inquiries],
    supplier_products: threadResult.data.supplier_products.map((entry) => entry.id === product.id ? { ...entry, inquiry_count: entry.inquiry_count + 1, updated_at: createdAt } : entry),
    messages: [
      message(`msg-${threadResult.threadId}-${Date.now()}`, threadResult.threadId, buyerId, "buyer", inquiryRecord.message || `${product.title} 상품 문의입니다.`, "", "", false, createdAt),
      ...threadResult.data.messages,
    ],
  };
  nextData = appendNotification(nextData, {
    user_id: supplier?.user_id ?? supplierUserId(product.supplier_id),
    user_role: "supplier",
    type: "product_inquiry_received",
    title: "상품 문의가 도착했습니다.",
    body: `${product.title} 상품에 대한 ${productInquiryTypeLabels[draft.inquiry_type]}가 접수되었습니다.`,
    link_url: `/app/supplier/chats/${threadResult.threadId}`,
    related_entity_type: "product_inquiry",
    related_entity_id: inquiryId,
    priority: draft.inquiry_type === "order_request" ? "high" : "normal",
    actor_user_id: buyerId,
  });
  saveData(nextData);
  return { data: nextData, inquiryId, threadId: threadResult.threadId };
}

export function createProductOrderRequest(data: AppData, productId: string, buyerId: string, draft: ProductOrderRequestDraft): { data: AppData; orderRequestId: string } {
  const product = data.supplier_products.find((entry) => entry.id === productId);
  if (!product || product.deleted_at || product.approval_status !== "approved" || !product.is_public) return { data, orderRequestId: "" };
  const createdAt = new Date().toISOString();
  const orderRequestId = `porder-${Date.now()}`;
  const orderRecord: ProductOrderRequest = {
    id: orderRequestId,
    product_id: product.id,
    buyer_id: buyerId,
    supplier_id: product.supplier_id,
    quantity: Math.max(1, Number(draft.quantity) || 1),
    unit_label: product.unit_label,
    desired_delivery_date: draft.desired_delivery_date,
    delivery_region: draft.delivery_region.trim(),
    buyer_memo: draft.buyer_memo.trim(),
    supplier_response: "",
    final_price: product.price_type === "fixed" ? product.price * Math.max(1, Number(draft.quantity) || 1) : 0,
    status: "supplier_confirming",
    created_at: createdAt,
    updated_at: createdAt,
  };
  const inquiryResult = createProductInquiry(data, product.id, buyerId, {
    inquiry_type: "order_request",
    message: draft.buyer_memo || `${product.title} ${orderRecord.quantity}${product.unit_label} 주문 가능 여부를 확인해주세요.`,
    quantity: orderRecord.quantity,
    desired_delivery_date: draft.desired_delivery_date,
    delivery_region: draft.delivery_region,
  });
  let nextData: AppData = {
    ...inquiryResult.data,
    product_order_requests: [orderRecord, ...inquiryResult.data.product_order_requests],
    supplier_products: inquiryResult.data.supplier_products.map((entry) => entry.id === product.id ? { ...entry, order_request_count: entry.order_request_count + 1, updated_at: createdAt } : entry),
  };
  const supplier = nextData.supplier_profiles.find((entry) => entry.id === product.supplier_id);
  nextData = appendNotification(nextData, {
    user_id: supplier?.user_id ?? supplierUserId(product.supplier_id),
    user_role: "supplier",
    type: "product_order_requested",
    title: "상품 주문요청이 도착했습니다.",
    body: `${product.title} ${orderRecord.quantity}${product.unit_label} 주문 가능 여부를 확인해주세요.`,
    link_url: "/app/supplier/products",
    related_entity_type: "product_order_request",
    related_entity_id: orderRequestId,
    priority: "high",
    actor_user_id: buyerId,
  });
  saveData(nextData);
  return { data: nextData, orderRequestId };
}

export function updateProductOrderRequest(data: AppData, orderRequestId: string, patch: Partial<ProductOrderRequest>): AppData {
  const updatedAt = new Date().toISOString();
  const nextData: AppData = {
    ...data,
    product_order_requests: data.product_order_requests.map((entry) => entry.id === orderRequestId ? { ...entry, ...patch, updated_at: updatedAt } : entry),
  };
  saveData(nextData);
  return nextData;
}

export function toggleProductFavorite(data: AppData, productId: string, buyerId: string): AppData {
  const existing = data.product_favorites.find((entry) => entry.product_id === productId && entry.buyer_id === buyerId);
  const createdAt = new Date().toISOString();
  const nextFavorites = existing
    ? data.product_favorites.filter((entry) => entry.id !== existing.id)
    : [{ id: `pfav-${Date.now()}`, product_id: productId, buyer_id: buyerId, created_at: createdAt }, ...data.product_favorites];
  const nextData: AppData = {
    ...data,
    product_favorites: nextFavorites,
    supplier_products: data.supplier_products.map((entry) =>
      entry.id === productId
        ? { ...entry, favorite_count: Math.max(0, entry.favorite_count + (existing ? -1 : 1)), updated_at: createdAt }
        : entry,
    ),
  };
  saveData(nextData);
  return nextData;
}

export function createQuoteRequestFromProduct(data: AppData, productId: string, buyerId: string, quantity: number, deliveryRegion: string, desiredDeliveryDate: string, memo = ""): { data: AppData; requestId: string } {
  const product = data.supplier_products.find((entry) => entry.id === productId);
  if (!product || product.deleted_at || product.approval_status !== "approved" || !product.is_public) return { data, requestId: "" };
  const category = data.categories.find((entry) => entry.name === getProductCategoryName(data, product.category_id)) ?? data.categories[0];
  const createdAt = new Date().toISOString();
  const draft: QuoteRequestDraft = {
    title: `${product.title} 견적 문의`,
    category_id: category.id,
    delivery_region: deliveryRegion,
    delivery_address: "",
    desired_delivery_date: desiredDeliveryDate,
    need_tax_invoice: product.tax_invoice_available,
    card_payment_required: false,
    description: memo || `${product.title} 상품을 기준으로 견적을 받고 싶습니다.`,
    attachment_note: "",
    previous_amount: 0,
    input_method: "template",
    original_text_input: "",
    template_name: "상품관 견적 문의",
    previous_request_id: "",
    urgent: false,
    preferred_delivery_time: "",
    budget_min: 0,
    budget_max: 0,
    preferred_brand: product.brand,
    allow_alternatives: true,
    include_delivery_fee: product.delivery_fee_type !== "included",
    items: [{
      item_name: product.title,
      spec: product.package_unit,
      quantity: Math.max(1, Number(quantity) || 1),
      unit: product.unit_label,
      memo,
      is_required: true,
      allow_alternative: true,
    }],
    attachments: [],
  };
  const result = createQuoteRequest(data, draft);
  let nextData: AppData = {
    ...result.data,
    product_quote_items: [{
      id: `pquoteitem-${Date.now()}`,
      quote_request_id: result.requestId,
      product_id: product.id,
      supplier_id: product.supplier_id,
      quantity: Math.max(1, Number(quantity) || 1),
      unit_label: product.unit_label,
      memo,
      created_at: createdAt,
    }, ...result.data.product_quote_items],
    supplier_products: result.data.supplier_products.map((entry) => entry.id === product.id ? { ...entry, quote_add_count: entry.quote_add_count + 1, updated_at: createdAt } : entry),
  };
  const supplier = nextData.supplier_profiles.find((entry) => entry.id === product.supplier_id);
  nextData = appendNotification(nextData, {
    user_id: supplier?.user_id ?? supplierUserId(product.supplier_id),
    user_role: "supplier",
    type: "new_matched_request",
    title: "상품 기반 견적요청이 도착했습니다.",
    body: `${product.title} 상품을 보고 구매자가 견적요청을 만들었습니다.`,
    link_url: `/app/supplier/requests/${result.requestId}`,
    related_entity_type: "quote_request",
    related_entity_id: result.requestId,
    priority: "high",
    actor_user_id: buyerId,
  });
  saveData(nextData);
  return { data: nextData, requestId: result.requestId };
}

export function createProductReport(data: AppData, productId: string, reporterId: string, reason: ProductReportReason, detail: string): AppData {
  const product = data.supplier_products.find((entry) => entry.id === productId);
  if (!product) return data;
  const createdAt = new Date().toISOString();
  const reportId = `preport-${Date.now()}`;
  let nextData: AppData = {
    ...data,
    product_reports: [{
      id: reportId,
      product_id: productId,
      reporter_id: reporterId,
      reason,
      detail: detail.trim(),
      status: "pending",
      admin_memo: "",
      created_at: createdAt,
      updated_at: createdAt,
    }, ...data.product_reports],
  };
  nextData = appendNotification(nextData, {
    user_id: adminUserId(nextData),
    user_role: "admin",
    type: "product_report_received",
    title: "상품 신고가 접수되었습니다.",
    body: `${product.title} 상품 신고: ${productReportReasonLabels[reason]}`,
    link_url: "/app/admin/products",
    related_entity_type: "product",
    related_entity_id: productId,
    priority: reason === "external_trade" || reason === "prohibited_item" ? "high" : "normal",
    actor_user_id: reporterId,
  });
  saveData(nextData);
  return nextData;
}

export function updateProductReportStatus(data: AppData, reportId: string, status: ProductReportStatus, adminMemo = ""): AppData {
  const updatedAt = new Date().toISOString();
  const nextData: AppData = {
    ...data,
    product_reports: data.product_reports.map((entry) => entry.id === reportId ? { ...entry, status, admin_memo: adminMemo || entry.admin_memo, updated_at: updatedAt } : entry),
  };
  saveData(nextData);
  return nextData;
}

export function createQuoteRequest(data: AppData, draft: QuoteRequestDraft): { data: AppData; requestId: string } {
  const category = data.categories.find((entry) => entry.id === draft.category_id) ?? data.categories[0];
  const createdAt = new Date().toISOString();
  const requestId = `req-${Date.now()}`;
  const qualityScore = calculateRequestQuality({ ...draft, category_name: category.name }, draft.items, draft.attachments);
  const expectedSupplierCount = estimateSupplierMatches(data, category.name, draft.delivery_region, draft.need_tax_invoice, draft.card_payment_required);
  const savings = calculateEstimatedSavings(Number(draft.previous_amount) || undefined, Number(draft.budget_max) || undefined);
  const requestRecord: QuoteRequest = {
    id: requestId,
    buyer_id: "buyer-1",
    title: draft.title,
    category_id: category.id,
    category_name: category.name,
    delivery_region: draft.delivery_region,
    delivery_address: draft.delivery_address.trim(),
    desired_delivery_date: draft.desired_delivery_date,
    need_tax_invoice: draft.need_tax_invoice,
    card_payment_required: draft.card_payment_required,
    description: draft.description,
    status: "open",
    created_at: createdAt,
    updated_at: createdAt,
    attachment_note: draft.attachment_note,
    previous_amount: Number(draft.previous_amount) || undefined,
    input_method: draft.input_method,
    request_quality_score: qualityScore,
    expected_supplier_count: expectedSupplierCount,
    original_text_input: draft.original_text_input.trim(),
    template_name: draft.template_name.trim(),
    previous_request_id: draft.previous_request_id,
    urgent: draft.urgent,
    preferred_delivery_time: draft.preferred_delivery_time.trim(),
    budget_min: Number(draft.budget_min) || undefined,
    budget_max: Number(draft.budget_max) || undefined,
    preferred_brand: draft.preferred_brand.trim(),
    allow_alternatives: draft.allow_alternatives,
    include_delivery_fee: draft.include_delivery_fee,
    estimated_savings_amount: savings.amount || undefined,
    estimated_savings_rate: savings.rate || undefined,
  };

  const items = draft.items
    .filter((entry) => entry.item_name.trim())
    .map((entry, index): QuoteRequestItem => ({
      id: `${requestId}-item-${index + 1}`,
      quote_request_id: requestId,
      item_name: entry.item_name.trim(),
      spec: entry.spec.trim(),
      quantity: Number(entry.quantity) || 1,
      unit: entry.unit.trim() || "개",
      memo: entry.memo.trim(),
      created_at: createdAt,
      is_required: entry.is_required ?? true,
      allow_alternative: entry.allow_alternative ?? draft.allow_alternatives,
      confidence_score: entry.confidence_score ?? 96,
      needs_review: entry.needs_review ?? false,
      review_reason: entry.review_reason ?? "",
    }));

  const attachments = draft.attachments
    .filter((entry) => entry.file_name.trim())
    .map((entry, index): QuoteAttachment => ({
      id: `${requestId}-attachment-${index + 1}`,
      quote_request_id: requestId,
      file_url: "#",
      file_name: entry.file_name.trim(),
      file_type: entry.file_type.trim() || entry.file_name.split(".").pop() || "file",
      created_at: createdAt,
      analysis_status: entry.analysis_status,
      extracted_text: entry.extracted_text,
      extracted_items_json: entry.extracted_items_json,
    }));

  let nextData: AppData = {
    ...data,
    quote_requests: [requestRecord, ...data.quote_requests],
    quote_request_items: [...items, ...data.quote_request_items],
    quote_attachments: [...attachments, ...data.quote_attachments],
  };

  const matchedSuppliers = getMatchedSuppliersForRequest(requestRecord, data.supplier_profiles, nextData);
  matchedSuppliers.forEach((supplier) => {
    nextData = appendNotification(nextData, {
      user_id: supplier.user_id,
      user_role: "supplier",
      type: "new_matched_request",
      title: "새 견적요청이 도착했어요.",
      body: `${requestRecord.delivery_region} ${requestRecord.category_name} 요청에 견적을 제출할 수 있습니다.`,
      link_url: `/app/supplier/requests/${requestId}`,
      related_entity_type: "quote_request",
      related_entity_id: requestId,
      priority: requestRecord.urgent ? "high" : "normal",
      actor_user_id: requestRecord.buyer_id,
    });
  });

  saveData(nextData);
  return { data: nextData, requestId };
}

type RequoteCandidate = {
  businessId: string;
  recommendationType: TodayRequoteRecommendationType;
  periodKey: string;
  category: string;
  itemKeyword: string;
  supplierName?: string;
  records: PurchaseRecord[];
  currentAmount: number;
  previousAmount: number;
  deltaAmount: number;
  deltaRate: number;
  purchaseFrequency: number;
  recentPurchaseDays: number;
  hasSsawaHistory: boolean;
  categoryFit: boolean;
  hasItemInfo: boolean;
  hasRegionInfo: boolean;
  hasInvalidStatus: boolean;
};

const requoteCandidateCategories = ["포장", "식자재", "소모", "자재", "공구", "설비", "주방", "농산", "축산", "수산", "용기", "봉투"];

export const todayRequoteRecommendationLevelLabels: Record<TodayRequoteRecommendationLevel, string> = {
  high: "우선 확인",
  medium: "추천",
  low: "참고",
};

export const todayRequoteRecommendationStatusLabels: Record<TodayRequoteRecommendation["status"], string> = {
  active: "추천 중",
  dismissed: "숨김",
  draft_created: "초안 생성",
  request_submitted: "요청 제출",
  expired: "만료",
};

function getRecordOwnerBusinessId(record: PurchaseRecord) {
  return record.business_id || record.buyer_id;
}

function safePurchaseAmount(value: number | null | undefined) {
  return Number.isFinite(value) && Number(value) > 0 ? Number(value) : 0;
}

function isSsawaPurchaseRecord(record: PurchaseRecord) {
  return record.source === "ssawa" || Boolean(record.ssawa_deal_id || record.deal_id);
}

function isRequoteEligiblePurchase(record: PurchaseRecord) {
  if (record.deleted_at) return false;
  if (record.total_amount < 10000) return false;
  if (record.accounting_status === "excluded" || record.accounting_status === "failed") return false;
  const text = `${record.purchase_title} ${record.category_name} ${record.accounting_category} ${record.item_summary ?? ""}`.toLowerCase();
  if (/취소|환불|분쟁|cancel|refund|dispute/.test(text)) return false;
  if (/임대|월세|인건비|급여|공과금|전기|가스|수도|세금|보험|수수료/.test(text)) return false;
  return true;
}

function isRequoteFitCategory(category: string) {
  return requoteCandidateCategories.some((keyword) => category.includes(keyword));
}

function parseJsonArray(value: string | undefined): string[] {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.map(String) : [];
  } catch {
    return [];
  }
}

function buildRequotePeriodKey(createdAt = new Date()) {
  return `${createdAt.getFullYear()}-${String(createdAt.getMonth() + 1).padStart(2, "0")}`;
}

function monthsAgoDate(months: number, base = new Date()) {
  return new Date(base.getFullYear(), base.getMonth() - months, base.getDate());
}

function daysSinceDate(dateText: string, base = new Date()) {
  const time = new Date(`${dateText}T00:00:00`).getTime();
  if (!Number.isFinite(time)) return 999;
  return Math.max(0, Math.round((base.getTime() - time) / 86400000));
}

function groupByKey<T>(rows: T[], getKey: (row: T) => string) {
  const map = new Map<string, T[]>();
  rows.forEach((row) => {
    const key = getKey(row).trim() || "기타";
    map.set(key, [...(map.get(key) ?? []), row]);
  });
  return map;
}

function sumPurchaseAmount(records: PurchaseRecord[]) {
  return records.reduce((sum, record) => sum + safePurchaseAmount(record.total_amount), 0);
}

function buildRequoteReason(candidate: RequoteCandidate, level: TodayRequoteRecommendationLevel) {
  if (candidate.deltaRate >= 30 && candidate.purchaseFrequency >= 2) return "최근 자주 구매했고 이전 기간보다 금액이 많이 늘어난 품목이에요.";
  if (candidate.hasSsawaHistory) return "싸와 구매 이력이 있어 지난 구매내역으로 초안을 만들기 좋아요.";
  if (candidate.deltaAmount >= 50000) return "이전 기간보다 매입 금액이 커져 다시 비교해볼 만해요.";
  if (level === "low") return "견적 대상이 될 수 있어 참고 추천으로 모았어요.";
  return "최근 매입 흐름을 기준으로 다시 견적받아볼 수 있어요.";
}

export function scoreRequoteCandidate(candidate: RequoteCandidate): { score: number; level: TodayRequoteRecommendationLevel | null } {
  let score = 0;
  if (candidate.deltaRate >= 30) score += 30;
  else if (candidate.deltaRate >= 15) score += 18;
  if (candidate.deltaAmount >= 50000) score += 20;
  else if (candidate.deltaAmount >= 20000) score += 10;
  if (candidate.purchaseFrequency >= 2 && candidate.recentPurchaseDays <= 60) score += 20;
  else if (candidate.purchaseFrequency >= 2) score += 10;
  if (candidate.hasSsawaHistory) score += 15;
  if (candidate.categoryFit) score += 10;
  if (candidate.hasItemInfo) score += 10;
  if (candidate.hasRegionInfo) score += 5;
  if (candidate.hasInvalidStatus) score -= 50;
  if (!candidate.hasItemInfo) score -= 20;
  if (score >= 80) return { score, level: "high" };
  if (score >= 50) return { score, level: "medium" };
  if (score >= 30) return { score, level: "low" };
  return { score, level: null };
}

function buildRequoteRecommendation(candidate: RequoteCandidate, existing: TodayRequoteRecommendation | undefined, createdAt: string): TodayRequoteRecommendation | null {
  const scored = scoreRequoteCandidate(candidate);
  if (!scored.level) return null;
  const ids = candidate.records.map((record) => record.id);
  const base: TodayRequoteRecommendation = {
    id: existing?.id ?? `today-requote-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    business_id: candidate.businessId,
    recommendation_type: candidate.recommendationType,
    status: existing?.status ?? "active",
    period_key: candidate.periodKey,
    category: candidate.category,
    item_keyword: candidate.itemKeyword,
    supplier_name: candidate.supplierName,
    related_purchase_record_ids_json: JSON.stringify(ids),
    current_amount: candidate.currentAmount,
    previous_amount: candidate.previousAmount,
    delta_amount: candidate.deltaAmount,
    delta_rate: candidate.deltaRate,
    score: scored.score,
    recommendation_level: scored.level,
    reason: buildRequoteReason(candidate, scored.level),
    action_label: "견적요청 초안 만들기",
    action_url: `/app/today/requotes?recommendationId=${encodeURIComponent(existing?.id ?? "")}`,
    ssawa_quote_draft_id: existing?.ssawa_quote_draft_id,
    ssawa_quote_request_id: existing?.ssawa_quote_request_id,
    dismissed_at: existing?.dismissed_at,
    expires_at: existing?.expires_at,
    created_at: existing?.created_at ?? createdAt,
    updated_at: createdAt,
  };
  return { ...base, action_url: `/app/today/requotes?recommendationId=${encodeURIComponent(base.id)}` };
}

export function generateRequoteRecommendations(data: AppData, businessId = "buyer-1", now = new Date()): AppData {
  const currentStart = monthsAgoDate(1, now);
  const previousStart = monthsAgoDate(3, now);
  const periodKey = buildRequotePeriodKey(now);
  const purchases = data.purchase_records.filter((record) => getRecordOwnerBusinessId(record) === businessId && isRequoteEligiblePurchase(record));
  const currentRecords = purchases.filter((record) => new Date(record.purchase_date) >= currentStart);
  const previousRecords = purchases.filter((record) => new Date(record.purchase_date) >= previousStart && new Date(record.purchase_date) < currentStart);
  const candidates: RequoteCandidate[] = [];

  const buildCandidate = (type: TodayRequoteRecommendationType, key: string, records: PurchaseRecord[], previous: PurchaseRecord[], supplierName?: string) => {
    const currentAmount = sumPurchaseAmount(records);
    const previousAmount = sumPurchaseAmount(previous);
    const deltaAmount = currentAmount - previousAmount;
    const deltaRate = previousAmount > 0 ? (deltaAmount / previousAmount) * 100 : currentAmount >= 50000 ? 100 : 0;
    if (deltaAmount <= 0 && records.length < 2) return;
    const newest = records.reduce((latest, record) => (record.purchase_date > latest ? record.purchase_date : latest), records[0]?.purchase_date ?? "");
    const category = records[0]?.category_name || records[0]?.accounting_category || key;
    const itemKeyword = type === "category" ? category : key;
    candidates.push({
      businessId,
      recommendationType: type,
      periodKey,
      category,
      itemKeyword,
      supplierName,
      records,
      currentAmount,
      previousAmount,
      deltaAmount: Math.max(0, deltaAmount),
      deltaRate: Math.max(0, deltaRate),
      purchaseFrequency: records.length,
      recentPurchaseDays: daysSinceDate(newest, now),
      hasSsawaHistory: records.some(isSsawaPurchaseRecord),
      categoryFit: records.some((record) => isRequoteFitCategory(`${record.category_name} ${record.accounting_category} ${record.purchase_title}`)),
      hasItemInfo: records.some((record) => Boolean((record.item_summary || record.purchase_title).trim())),
      hasRegionInfo: true,
      hasInvalidStatus: records.some((record) => !isRequoteEligiblePurchase(record)),
    });
  };

  groupByKey(currentRecords, (record) => record.category_name || record.accounting_category).forEach((records, key) => {
    buildCandidate("category", key, records, previousRecords.filter((record) => (record.category_name || record.accounting_category) === key));
  });
  groupByKey(currentRecords, (record) => record.item_summary || record.purchase_title).forEach((records, key) => {
    buildCandidate("item", key, records, previousRecords.filter((record) => (record.item_summary || record.purchase_title) === key));
  });
  groupByKey(currentRecords, (record) => record.supplier_name).forEach((records, key) => {
    buildCandidate("supplier", key, records, previousRecords.filter((record) => record.supplier_name === key), key);
  });

  const existingMap = new Map(data.today_requote_recommendations.map((entry) => [`${entry.business_id}|${entry.period_key}|${entry.recommendation_type}|${entry.category}|${entry.item_keyword}|${entry.supplier_name ?? ""}`, entry]));
  const generated = candidates
    .map((candidate) => {
      const key = `${candidate.businessId}|${candidate.periodKey}|${candidate.recommendationType}|${candidate.category}|${candidate.itemKeyword}|${candidate.supplierName ?? ""}`;
      return buildRequoteRecommendation(candidate, existingMap.get(key), now.toISOString());
    })
    .filter((entry): entry is TodayRequoteRecommendation => Boolean(entry));
  const generatedIds = new Set(generated.map((entry) => entry.id));
  const logs = generated
    .filter((entry) => !data.today_requote_recommendations.some((existing) => existing.id === entry.id))
    .map((entry): TodayRequoteLog => ({
      id: `requote-log-${Date.now()}-${entry.id}`,
      business_id: businessId,
      recommendation_id: entry.id,
      action: "recommendation_created",
      message: "재견적 추천이 생성되었습니다.",
      payload_json: JSON.stringify({ category: entry.category, item_keyword: entry.item_keyword, level: entry.recommendation_level }),
      created_by: businessId,
      created_at: now.toISOString(),
    }));
  const nextData: AppData = {
    ...data,
    today_requote_recommendations: [
      ...generated,
      ...data.today_requote_recommendations.filter((entry) => entry.business_id !== businessId || !generatedIds.has(entry.id)),
    ],
    today_requote_logs: [...logs, ...data.today_requote_logs],
  };
  saveData(nextData);
  return nextData;
}

function purchaseRecordToQuoteDraftItem(data: AppData, record: PurchaseRecord): QuoteRequestDraft["items"][number][] {
  const items = data.purchase_record_items.filter((item) => item.purchase_record_id === record.id);
  if (items.length) {
    return items.map((item) => draftItem(item.item_name, item.spec, item.quantity || 1, item.unit || "개", "지난 구매내역 기준 수량입니다.", true, true, 88, false, ""));
  }
  return [draftItem(record.item_summary || record.purchase_title, "", Math.max(1, record.item_count || 1), "개", "수량과 규격을 확인해주세요.", true, true, record.item_summary ? 76 : 58, !record.item_summary, record.item_summary ? "" : "품목 정보가 부족해 확인이 필요합니다.")];
}

export function createRequoteDraftFromPurchaseRecords(data: AppData, input: { businessId?: string; purchaseRecordIds: string[]; category?: string; recommendationId?: string; createdBy?: string }): { data: AppData; draftId?: string; url?: string; error?: string } {
  const businessId = input.businessId ?? "buyer-1";
  const ids = Array.from(new Set(input.purchaseRecordIds));
  const records = data.purchase_records.filter((record) => ids.includes(record.id) && getRecordOwnerBusinessId(record) === businessId && isRequoteEligiblePurchase(record));
  const createdAt = new Date().toISOString();
  if (!records.length) {
    const failedData = appendRequoteLog(data, { business_id: businessId, recommendation_id: input.recommendationId, action: "failed", message: "초안을 만들 수 있는 매입내역이 없습니다.", payload_json: JSON.stringify({ purchaseRecordIds: ids }), created_by: input.createdBy ?? businessId, created_at: createdAt });
    return { data: failedData, error: "초안을 만들 수 있는 매입내역이 없습니다." };
  }
  const categoryName = input.category || records[0].category_name || records[0].accounting_category || "구매 품목";
  const category = data.categories.find((entry) => entry.name === categoryName || categoryName.includes(entry.name) || entry.name.includes(categoryName)) ?? data.categories[0];
  const items = records.flatMap((record) => purchaseRecordToQuoteDraftItem(data, record)).slice(0, 12);
  const draftId = `today-draft-${Date.now()}`;
  const draft: TodaySsawaQuoteDraft = {
    id: draftId,
    business_id: businessId,
    created_from: input.recommendationId ? "today_requote" : "today_purchase",
    recommendation_id: input.recommendationId,
    source_purchase_record_ids_json: JSON.stringify(records.map((record) => record.id)),
    category: category?.name ?? categoryName,
    title: records.length === 1 ? `${records[0].purchase_title} 다시 견적 요청` : `${categoryName} 외 ${records.length}건 견적 요청`,
    description: "지난 구매내역을 바탕으로 만든 견적요청 초안입니다. 수량, 규격, 납품일을 확인해주세요.",
    items_json: JSON.stringify(items),
    preferred_delivery_date: "",
    delivery_address_snapshot: "",
    region: "",
    attachments_json: "[]",
    memo: "구매자 확인 전 초안입니다.",
    status: "draft",
    created_by: input.createdBy ?? businessId,
    created_at: createdAt,
    updated_at: createdAt,
    expires_at: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString(),
  };
  const nextRecommendations = data.today_requote_recommendations.map((entry) => entry.id === input.recommendationId ? { ...entry, status: "draft_created" as const, ssawa_quote_draft_id: draftId, updated_at: createdAt } : entry);
  let nextData: AppData = {
    ...data,
    today_ssawa_quote_drafts: [draft, ...data.today_ssawa_quote_drafts],
    today_requote_recommendations: nextRecommendations,
  };
  nextData = appendRequoteLog(nextData, { business_id: businessId, recommendation_id: input.recommendationId, draft_id: draftId, action: "draft_created", message: "견적요청 초안이 생성되었습니다.", payload_json: JSON.stringify({ source_purchase_record_ids: records.map((record) => record.id), category: category?.name ?? categoryName }), created_by: input.createdBy ?? businessId, created_at: createdAt });
  saveData(nextData);
  return { data: nextData, draftId, url: `/app/requests/new?source=today&draftId=${encodeURIComponent(draftId)}` };
}

export function createRequoteDraftFromRecommendation(data: AppData, recommendationId: string, businessId = "buyer-1") {
  const recommendation = data.today_requote_recommendations.find((entry) => entry.id === recommendationId && entry.business_id === businessId);
  if (!recommendation) return { data, error: "추천을 찾을 수 없습니다." };
  return createRequoteDraftFromPurchaseRecords(data, {
    businessId,
    recommendationId,
    category: recommendation.category,
    purchaseRecordIds: parseJsonArray(recommendation.related_purchase_record_ids_json),
  });
}

export function dismissRequoteRecommendation(data: AppData, recommendationId: string, businessId = "buyer-1"): AppData {
  const updatedAt = new Date().toISOString();
  let nextData: AppData = {
    ...data,
    today_requote_recommendations: data.today_requote_recommendations.map((entry) => entry.id === recommendationId && entry.business_id === businessId ? { ...entry, status: "dismissed", dismissed_at: updatedAt, updated_at: updatedAt } : entry),
  };
  nextData = appendRequoteLog(nextData, { business_id: businessId, recommendation_id: recommendationId, action: "dismissed", message: "재견적 추천이 숨겨졌습니다.", payload_json: "{}", created_by: businessId, created_at: updatedAt });
  saveData(nextData);
  return nextData;
}

export function getTodayQuoteDraft(data: AppData, draftId: string, businessId = "buyer-1") {
  return data.today_ssawa_quote_drafts.find((draft) => draft.id === draftId && draft.business_id === businessId);
}

export function markTodayQuoteDraftOpened(data: AppData, draftId: string, businessId = "buyer-1"): AppData {
  const draft = getTodayQuoteDraft(data, draftId, businessId);
  if (!draft || draft.status !== "draft") return data;
  const updatedAt = new Date().toISOString();
  let nextData: AppData = {
    ...data,
    today_ssawa_quote_drafts: data.today_ssawa_quote_drafts.map((entry) => entry.id === draftId ? { ...entry, status: "opened", updated_at: updatedAt } : entry),
  };
  nextData = appendRequoteLog(nextData, { business_id: businessId, recommendation_id: draft.recommendation_id, draft_id: draftId, action: "draft_opened", message: "견적요청 초안이 열렸습니다.", payload_json: "{}", created_by: businessId, created_at: updatedAt });
  saveData(nextData);
  return nextData;
}

export function linkRequoteDraftToQuoteRequest(data: AppData, draftId: string, quoteRequestId: string, businessId = "buyer-1"): AppData {
  const draft = getTodayQuoteDraft(data, draftId, businessId);
  if (!draft || draft.status === "submitted") return data;
  const updatedAt = new Date().toISOString();
  let nextData: AppData = {
    ...data,
    today_ssawa_quote_drafts: data.today_ssawa_quote_drafts.map((entry) => entry.id === draftId ? { ...entry, status: "submitted", ssawa_quote_request_id: quoteRequestId, updated_at: updatedAt } : entry),
    today_requote_recommendations: data.today_requote_recommendations.map((entry) => entry.id === draft.recommendation_id ? { ...entry, status: "request_submitted", ssawa_quote_request_id: quoteRequestId, updated_at: updatedAt } : entry),
  };
  nextData = appendRequoteLog(nextData, { business_id: businessId, recommendation_id: draft.recommendation_id, draft_id: draftId, quote_request_id: quoteRequestId, action: "request_submitted", message: "견적요청 제출 후 초안과 추천이 연결되었습니다.", payload_json: "{}", created_by: businessId, created_at: updatedAt });
  saveData(nextData);
  return nextData;
}

function appendRequoteLog(data: AppData, logDraft: Omit<TodayRequoteLog, "id">): AppData {
  const logEntry: TodayRequoteLog = {
    id: `today-requote-log-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    ...logDraft,
  };
  return { ...data, today_requote_logs: [logEntry, ...data.today_requote_logs] };
}

export function createQuote(data: AppData, requestId: string, draft: QuoteDraft): AppData {
  const createdAt = new Date().toISOString();
  const gate = canSubmitQuoteByPlan(data, draft.supplier_id);
  if (!gate.allowed) {
    let blockedData = appendNotification(data, {
      user_id: supplierUserId(draft.supplier_id),
      user_role: "supplier",
      type: "usage_limit_reached",
      title: "이번 달 견적 참여 한도에 도달했습니다.",
      body: `${gate.plan.name} 플랜의 월 견적 참여 한도를 모두 사용했습니다.`,
      link_url: "/app/supplier/billing",
      related_entity_type: "supplier_plan",
      related_entity_id: gate.plan.id,
      priority: "high",
      actor_user_id: "system",
    });
    blockedData = appendNotification(blockedData, {
      user_id: adminUserId(blockedData),
      user_role: "admin",
      type: "supplier_usage_limit_reached",
      title: "공급업체 견적 참여 한도 도달",
      body: `${supplierNameFromId(blockedData, draft.supplier_id)}가 ${gate.plan.name} 플랜 한도에 도달했습니다.`,
      link_url: "/app/admin/plans",
      related_entity_type: "supplier_plan",
      related_entity_id: gate.plan.id,
      priority: "normal",
      actor_user_id: "system",
    });
    saveData(blockedData);
    return blockedData;
  }
  const finalAmount = Number(draft.total_amount) + Number(draft.delivery_fee);
  const quoteRecord: Quote = {
    id: `quote-${Date.now()}`,
    quote_request_id: requestId,
    supplier_id: draft.supplier_id,
    total_amount: Number(draft.total_amount),
    delivery_fee: Number(draft.delivery_fee),
    final_amount: finalAmount,
    available_delivery_date: draft.available_delivery_date,
    tax_invoice_available: draft.tax_invoice_available,
    card_payment_available: draft.card_payment_available,
    alternative_proposal: draft.alternative_proposal.trim(),
    item_price_memo: draft.item_price_memo.trim(),
    memo: draft.memo.trim(),
    valid_until: draft.valid_until,
    status: "submitted",
    created_at: createdAt,
    updated_at: createdAt,
  };

  const requestRecord = data.quote_requests.find((entry) => entry.id === requestId);
  const supplier = data.supplier_profiles.find((entry) => entry.id === draft.supplier_id);
  let nextData: AppData = {
    ...data,
    quotes: [quoteRecord, ...data.quotes],
    quote_requests: data.quote_requests.map((entry) =>
      entry.id === requestId ? { ...entry, status: "quoted" as const, updated_at: createdAt } : entry,
    ),
  };
  if (requestRecord) {
    nextData = appendNotification(nextData, {
      user_id: requestRecord.buyer_id,
      user_role: "buyer",
      type: "quote_received",
      title: "새 견적이 도착했어요.",
      body: `${supplier?.business_name ?? "공급업체"}가 "${requestRecord.title}"에 견적을 제출했습니다.`,
      link_url: `/app/requests/${requestId}`,
      related_entity_type: "quote",
      related_entity_id: quoteRecord.id,
      priority: "normal",
      actor_user_id: supplier?.user_id ?? supplierUserId(draft.supplier_id),
    });
  }
  nextData = incrementQuoteUsage(nextData, draft.supplier_id, createdAt);

  saveData(nextData);
  return nextData;
}

export function selectQuote(data: AppData, requestId: string, quoteId: string): AppData {
  const updatedAt = new Date().toISOString();
  let nextData: AppData = {
    ...data,
    quote_requests: data.quote_requests.map((requestEntry) =>
      requestEntry.id === requestId
        ? { ...requestEntry, status: "selected" as const, selected_quote_id: quoteId, updated_at: updatedAt }
        : requestEntry,
    ),
    quotes: data.quotes.map((quoteEntry) =>
      quoteEntry.quote_request_id === requestId
        ? { ...quoteEntry, status: quoteEntry.id === quoteId ? ("selected" as const) : ("rejected" as const), updated_at: updatedAt }
        : quoteEntry,
    ),
  };

  saveData(nextData);
  return nextData;
}

export function createDealFromQuote(data: AppData, requestId: string, quoteId: string): { data: AppData; dealId: string } {
  const requestRecord = data.quote_requests.find((entry) => entry.id === requestId);
  const quoteRecord = data.quotes.find((entry) => entry.id === quoteId);
  if (!requestRecord || !quoteRecord) return { data, dealId: "" };

  const existingDeal = data.deals.find((entry) => entry.selected_quote_id === quoteId);
  if (existingDeal) {
    return { data: selectQuote(data, requestId, quoteId), dealId: existingDeal.id };
  }

  const createdAt = new Date().toISOString();
  const dealId = `deal-${Date.now()}`;
  const dealRecord: Deal = {
    id: dealId,
    quote_request_id: requestId,
    selected_quote_id: quoteId,
    buyer_id: requestRecord.buyer_id,
    supplier_id: quoteRecord.supplier_id,
    title: requestRecord.title,
    category_name: requestRecord.category_name,
    delivery_region: requestRecord.delivery_region,
    delivery_address: requestRecord.delivery_region,
    desired_delivery_date: requestRecord.desired_delivery_date,
    confirmed_delivery_date: quoteRecord.available_delivery_date,
    subtotal_amount: quoteRecord.total_amount,
    delivery_fee: quoteRecord.delivery_fee,
    final_amount: quoteRecord.final_amount,
    tax_invoice_required: requestRecord.need_tax_invoice,
    tax_invoice_available: quoteRecord.tax_invoice_available,
    card_payment_required: requestRecord.card_payment_required,
    card_payment_available: quoteRecord.card_payment_available,
    payment_method: quoteRecord.card_payment_available && requestRecord.card_payment_required ? "card" : "undecided",
    status: "pending_confirmation",
    buyer_memo: requestRecord.description,
    supplier_memo: quoteRecord.memo,
    cancellation_reason: "",
    dispute_reason: "",
    previous_amount: requestRecord.previous_amount,
    completed_at: null,
    created_at: createdAt,
    updated_at: createdAt,
  };

  const requestItems = data.quote_request_items.filter((entry) => entry.quote_request_id === requestId);
  const unitFallback = requestItems.length > 0 ? Math.floor(quoteRecord.total_amount / requestItems.length) : quoteRecord.total_amount;
  const dealItems = requestItems.map((entry, index): DealItem => ({
    id: `${dealId}-item-${index + 1}`,
    deal_id: dealId,
    item_name: entry.item_name,
    spec: entry.spec,
    quantity: entry.quantity,
    unit: entry.unit,
    unit_price: entry.quantity > 0 ? Math.round(unitFallback / entry.quantity) : unitFallback,
    total_price: unitFallback,
    memo: entry.memo,
    alternative_item_name: quoteRecord.alternative_proposal ? "대체품 제안 확인 필요" : "",
    created_at: createdAt,
  }));

  let nextData: AppData = {
    ...data,
    quote_requests: data.quote_requests.map((entry) =>
      entry.id === requestId ? { ...entry, status: "selected" as const, selected_quote_id: quoteId, updated_at: createdAt } : entry,
    ),
    quotes: data.quotes.map((entry) =>
      entry.quote_request_id === requestId
        ? { ...entry, status: entry.id === quoteId ? ("selected" as const) : ("rejected" as const), updated_at: createdAt }
        : entry,
    ),
    deals: [dealRecord, ...data.deals],
    deal_items: [...dealItems, ...data.deal_items],
    deal_status_logs: [log(`${dealId}-log-created`, dealId, "created", "pending_confirmation", "system", "견적 선택으로 거래가 생성되었습니다."), ...data.deal_status_logs],
  };
  const selectedSupplier = data.supplier_profiles.find((entry) => entry.id === quoteRecord.supplier_id);
  nextData = appendNotification(nextData, {
    user_id: quoteRecord.supplier_id ? supplierUserId(quoteRecord.supplier_id) : "",
    user_role: "supplier",
    type: "quote_selected",
    title: "내 견적이 선택되었습니다.",
    body: `${buyerName(data, requestRecord.buyer_id)}이 ${selectedSupplier?.business_name ?? "공급업체"}의 견적을 선택했습니다. 거래 확인이 필요합니다.`,
    link_url: `/app/deals/${dealId}`,
    related_entity_type: "quote",
    related_entity_id: quoteRecord.id,
    priority: "high",
    actor_user_id: requestRecord.buyer_id,
  });
  data.quotes
    .filter((entry) => entry.quote_request_id === requestId && entry.id !== quoteId)
    .forEach((rejectedQuote) => {
      nextData = appendNotification(nextData, {
        user_id: supplierUserId(rejectedQuote.supplier_id),
        user_role: "supplier",
        type: "quote_rejected",
        title: "이번 견적은 선택되지 않았습니다.",
        body: `"${requestRecord.title}" 요청에서 다른 견적이 선택되었습니다.`,
        link_url: `/app/supplier/quotes`,
        related_entity_type: "quote",
        related_entity_id: rejectedQuote.id,
        priority: "low",
        actor_user_id: requestRecord.buyer_id,
      });
    });
  nextData = appendNotification(nextData, {
    user_id: requestRecord.buyer_id,
    user_role: "buyer",
    type: "deal_created",
    title: "거래가 생성되었습니다.",
    body: `${selectedSupplier?.business_name ?? "공급업체"}와 거래가 생성되었습니다.`,
    link_url: `/app/deals/${dealId}`,
    related_entity_type: "deal",
    related_entity_id: dealId,
    priority: "normal",
    actor_user_id: requestRecord.buyer_id,
  });
  nextData = appendNotification(nextData, {
    user_id: supplierUserId(quoteRecord.supplier_id),
    user_role: "supplier",
    type: "deal_waiting_confirmation",
    title: "거래 확인이 필요해요.",
    body: `"${dealRecord.title}" 거래를 확인해주세요.`,
    link_url: `/app/deals/${dealId}`,
    related_entity_type: "deal",
    related_entity_id: dealId,
    priority: "high",
    actor_user_id: requestRecord.buyer_id,
  });
  if (dealRecord.final_amount >= 1000000) {
    nextData = appendNotification(nextData, {
      user_id: adminUserId(nextData),
      user_role: "admin",
      type: "high_value_deal_created",
      title: "고액 거래가 생성되었습니다.",
      body: `${dealRecord.title} 거래가 생성되었습니다.`,
      link_url: `/app/admin/deals`,
      related_entity_type: "deal",
      related_entity_id: dealId,
      priority: "high",
      actor_user_id: requestRecord.buyer_id,
    });
  }

  saveData(nextData);
  return { data: nextData, dealId };
}

type SsawaPurchaseSyncStatus = "created" | "updated" | "skipped" | "failed" | "not_eligible" | "needs_review";

export type SsawaPurchaseSyncResult = {
  data: AppData;
  ok: boolean;
  status: SsawaPurchaseSyncStatus;
  purchaseRecordId?: string;
  message: string;
  errorCode?: string;
};

type SsawaPurchaseSyncOptions = {
  force?: boolean;
  actorUserId?: string;
  triggeredBy?: TodaySsawaSyncTrigger;
};

export function getSsawaPurchaseSyncStatus(data: AppData, dealId: string) {
  const dealRecord = data.deals.find((entry) => entry.id === dealId);
  const record = findPurchaseRecordForDeal(data, dealId);
  if (!dealRecord) return { label: "반영 대상 아님", tone: "gray" as const, record };
  if (record?.accounting_status === "failed") return { label: "반영 실패", tone: "orange" as const, record };
  if (record?.evidence_status === "needs_review" || record?.accounting_status === "hold") return { label: "확인 필요", tone: "orange" as const, record };
  if (record) return { label: "반영 완료", tone: "green" as const, record };
  if (!isDealEligibleForTodayPurchase(dealRecord)) return { label: "반영 대상 아님", tone: "gray" as const, record };
  return { label: "미반영", tone: "blue" as const, record };
}

export function syncCompletedSsawaDealsToToday(data: AppData, businessId = "buyer-1", options: SsawaPurchaseSyncOptions = {}): SsawaPurchaseSyncResult {
  const completedDeals = data.deals.filter((dealRecord) => dealRecord.buyer_id === businessId && isDealEligibleForTodayPurchase(dealRecord));
  let nextData = data;
  let created = 0;
  let updated = 0;
  let skipped = 0;
  let needsReview = 0;
  completedDeals.forEach((dealRecord) => {
    const result = syncSsawaDealToTodayPurchase(nextData, dealRecord.id, { ...options, triggeredBy: options.triggeredBy ?? "admin" });
    nextData = result.data;
    if (result.status === "created") created += 1;
    if (result.status === "updated") updated += 1;
    if (result.status === "skipped") skipped += 1;
    if (result.status === "needs_review") needsReview += 1;
  });
  return {
    data: nextData,
    ok: true,
    status: created || updated ? "updated" : "skipped",
    message: `완료 거래 ${completedDeals.length}건 확인, 생성 ${created}건, 업데이트 ${updated}건, 확인 필요 ${needsReview}건, 중복 ${skipped}건`,
  };
}

export function rebuildTodayPurchaseFromSsawaDeal(data: AppData, dealId: string, options: SsawaPurchaseSyncOptions = {}) {
  return syncSsawaDealToTodayPurchase(data, dealId, { ...options, force: true, triggeredBy: options.triggeredBy ?? "admin" });
}

export function syncSsawaDealToTodayPurchase(
  data: AppData,
  dealId: string,
  options: SsawaPurchaseSyncOptions = {},
): SsawaPurchaseSyncResult {
  const triggeredBy = options.triggeredBy ?? "system";
  const createdAt = new Date().toISOString();
  const dealRecord = data.deals.find((entry) => entry.id === dealId);
  if (!dealRecord) {
    return syncFailure(data, dealId, "", "fail", "failed", "deal_not_found", "거래 정보를 찾을 수 없습니다.", triggeredBy, options.actorUserId, createdAt);
  }

  const existing = findPurchaseRecordForDeal(data, dealId);
  const businessId = dealRecord.buyer_id;
  if (!businessId) {
    return syncFailure(data, dealId, "", "fail", "failed", "business_missing", "사업장 정보를 확인해주세요.", triggeredBy, options.actorUserId, createdAt, snapshotDeal(dealRecord));
  }

  if (!isDealEligibleForTodayPurchase(dealRecord)) {
    const nextData: AppData = existing && (dealRecord.status === "disputed" || dealRecord.status.includes("cancelled"))
      ? {
          ...data,
          purchase_records: data.purchase_records.map((record) =>
            record.id === existing.id
              ? {
                  ...record,
                  accounting_status: "hold" as const,
                  evidence_status: "needs_review" as const,
                  admin_memo: `${dealStatusLabels[dealRecord.status]} 상태로 거래 상태 확인 필요`,
                  updated_at: createdAt,
                }
              : record,
          ),
        }
      : data;
    return appendSyncLogResult(nextData, {
      businessId,
      dealId,
      purchaseRecordId: existing?.id,
      action: "skip",
      logStatus: dealRecord.status === "disputed" ? "needs_review" : "skipped",
      resultStatus: dealRecord.status === "disputed" ? "needs_review" : "not_eligible",
      ok: false,
      message: dealRecord.status === "disputed" ? "문제 신고 거래라 확인 필요 상태로 표시했습니다." : "거래 완료 후 반영할 수 있습니다.",
      triggeredBy,
      triggeredUserId: options.actorUserId,
      payload: snapshotDeal(dealRecord),
      createdAt,
    });
  }

  const mapped = mapDealToTodayPurchase(dealRecord, data, existing?.id ?? `purchase-${Date.now()}`, createdAt);
  const mappedRecord = existing?.category_confirmed_by_user && !options.force
    ? {
        ...mapped,
        category_name: existing.category_name,
        accounting_category: existing.accounting_category,
        auto_category: existing.auto_category,
        category_confidence: existing.category_confidence,
        category_reason: existing.category_reason,
        category_needs_review: existing.category_needs_review,
        category_confirmed_by_user: existing.category_confirmed_by_user,
        category_confirmed_at: existing.category_confirmed_at,
        category_rule_id: existing.category_rule_id,
      }
    : mapped;
  const needsReview = mappedRecord.evidence_status === "needs_review" || mappedRecord.evidence_status === "missing" || mappedRecord.total_amount <= 0 || mappedRecord.category_needs_review || mappedRecord.accounting_category === "미분류";
  const nextStatus: SsawaPurchaseSyncStatus = existing ? options.force ? "updated" : "skipped" : needsReview ? "needs_review" : "created";
  const action = existing ? options.force ? "resync" : "skip" : triggeredBy === "system" ? "auto_sync" : "manual_sync";
  const purchaseItems = existing ? [] : createPurchaseRecordItemsFromDeal(dealRecord, data, mappedRecord.id, createdAt);
  const purchaseDocuments = existing ? [] : createPurchaseDocumentsFromDeal(dealRecord, data, mappedRecord.id, createdAt);
  const accountingEntry = existing ? null : createAccountingEntryFromPurchaseRecord(mappedRecord, createdAt);
  const purchaseRecords: PurchaseRecord[] = existing
    ? data.purchase_records.map((record) =>
        record.id === existing.id
          ? {
              ...record,
              ...mappedRecord,
              id: existing.id,
              created_at: record.created_at,
              updated_at: createdAt,
              accounting_status: needsReview ? "hold" as const : record.accounting_status === "synced" ? "synced" as const : "pending" as const,
            }
          : record,
      )
    : [mappedRecord, ...data.purchase_records];

  let nextData: AppData = {
    ...data,
    purchase_records: purchaseRecords,
    purchase_record_items: purchaseItems.length ? [...purchaseItems, ...data.purchase_record_items] : data.purchase_record_items,
    purchase_documents: purchaseDocuments.length ? [...purchaseDocuments, ...data.purchase_documents] : data.purchase_documents,
    accounting_entries: accountingEntry ? [accountingEntry, ...data.accounting_entries] : data.accounting_entries,
  };

  nextData = appendSyncLog(nextData, {
    business_id: businessId,
    ssawa_deal_id: dealId,
    purchase_record_id: mappedRecord.id,
    action,
    status: nextStatus === "skipped" ? "skipped" : needsReview ? "needs_review" : "success",
    message: nextStatus === "skipped" ? "이미 오늘장사에 반영된 거래입니다." : needsReview ? "오늘장사 매입장부에 반영되었고 일부 정보 확인이 필요합니다." : "오늘장사 매입장부에 반영되었습니다.",
    triggered_by: triggeredBy,
    triggered_user_id: options.actorUserId,
    payload_snapshot_json: JSON.stringify(snapshotDeal(dealRecord)),
    created_at: createdAt,
  });
  saveData(nextData);
  return {
    data: nextData,
    ok: true,
    status: nextStatus,
    purchaseRecordId: mappedRecord.id,
    message: nextStatus === "skipped" ? "이미 오늘장사에 반영된 거래입니다." : needsReview ? "오늘장사 매입장부에 반영되었습니다. 일부 정보 확인이 필요합니다." : "오늘장사 매입장부에 반영되었습니다.",
  };
}

type SupplierSaleSyncStatus = "created" | "updated" | "skipped" | "failed" | "not_eligible" | "needs_review";

export type SupplierSaleSyncResult = {
  data: AppData;
  ok: boolean;
  status: SupplierSaleSyncStatus;
  supplierSaleRecordId?: string;
  message: string;
  errorCode?: string;
};

type SupplierSaleSyncOptions = {
  force?: boolean;
  actorUserId?: string;
  triggeredBy?: TodaySupplierSyncTrigger;
};

export function syncCompletedSsawaDealsToSupplierSales(data: AppData, supplierBusinessId = "sup-1", options: SupplierSaleSyncOptions = {}): SupplierSaleSyncResult {
  const targetDeals = data.deals.filter((dealRecord) => dealRecord.supplier_id === supplierBusinessId && isDealEligibleForSupplierSale(dealRecord));
  let nextData = data;
  let created = 0;
  let updated = 0;
  let skipped = 0;
  let needsReview = 0;
  targetDeals.forEach((dealRecord) => {
    const result = syncSsawaDealToSupplierSale(nextData, dealRecord.id, { ...options, triggeredBy: options.triggeredBy ?? "admin" });
    nextData = result.data;
    if (result.status === "created") created += 1;
    if (result.status === "updated") updated += 1;
    if (result.status === "skipped") skipped += 1;
    if (result.status === "needs_review") needsReview += 1;
  });
  return {
    data: nextData,
    ok: true,
    status: created || updated ? "updated" : "skipped",
    message: `공급업체 매출 후보 ${targetDeals.length}건 확인, 생성 ${created}건, 업데이트 ${updated}건, 확인 필요 ${needsReview}건, 중복 ${skipped}건`,
  };
}

export function syncSsawaDealToSupplierSale(data: AppData, dealId: string, options: SupplierSaleSyncOptions = {}): SupplierSaleSyncResult {
  const triggeredBy = options.triggeredBy ?? "system";
  const createdAt = new Date().toISOString();
  const dealRecord = data.deals.find((entry) => entry.id === dealId);
  if (!dealRecord) {
    return appendSupplierSyncLogResult(data, {
      supplierBusinessId: "unknown",
      dealId,
      action: "fail",
      logStatus: "failed",
      resultStatus: "failed",
      ok: false,
      message: "거래 정보를 찾을 수 없습니다.",
      errorCode: "deal_not_found",
      triggeredBy,
      triggeredUserId: options.actorUserId,
      createdAt,
    });
  }

  const existing = findSupplierSalesRecordForDeal(data, dealId, dealRecord.supplier_id);
  if (!isDealEligibleForSupplierSale(dealRecord)) {
    const nextData: AppData = existing && (dealRecord.status === "disputed" || dealRecord.status.includes("cancelled"))
      ? {
          ...data,
          supplier_sales_records: data.supplier_sales_records.map((record) =>
            record.id === existing.id
              ? {
                  ...record,
                  sale_status: dealRecord.status === "disputed" ? "disputed" : "cancelled",
                  settlement_status: "needs_review",
                  evidence_status: "needs_review",
                  memo: `${dealStatusLabels[dealRecord.status]} 상태라 매출 반영 확인이 필요합니다.`,
                  updated_at: createdAt,
                }
              : record,
          ),
        }
      : data;
    return appendSupplierSyncLogResult(nextData, {
      supplierBusinessId: dealRecord.supplier_id,
      buyerBusinessId: dealRecord.buyer_id,
      dealId,
      supplierSaleRecordId: existing?.id,
      action: "skip",
      logStatus: dealRecord.status === "disputed" ? "needs_review" : "skipped",
      resultStatus: dealRecord.status === "disputed" ? "needs_review" : "not_eligible",
      ok: false,
      message: dealRecord.status === "disputed" ? "분쟁 거래라 공급업체 매출 확인이 필요합니다." : "공급업체 매출 반영 대상 거래가 아닙니다.",
      triggeredBy,
      triggeredUserId: options.actorUserId,
      payload: snapshotDeal(dealRecord),
      createdAt,
    });
  }

  const mapped = mapDealToSupplierSale(dealRecord, data, existing?.id ?? `supplier-sale-${Date.now()}`, createdAt);
  const needsReview = mapped.sale_status === "needs_review" || mapped.evidence_status === "needs_review" || mapped.evidence_status === "missing" || mapped.tax_invoice_status === "unknown" || mapped.total_amount <= 0;
  const nextStatus: SupplierSaleSyncStatus = existing ? options.force ? "updated" : "skipped" : needsReview ? "needs_review" : "created";
  const action = existing ? options.force ? "resync" : "skip" : triggeredBy === "system" ? "auto_sync" : "manual_sync";
  const supplierSalesRecords = existing
    ? data.supplier_sales_records.map((record) =>
        record.id === existing.id
          ? {
              ...record,
              ...mapped,
              id: existing.id,
              created_at: record.created_at,
              updated_at: createdAt,
            }
          : record,
      )
    : [mapped, ...data.supplier_sales_records];
  const nextData = appendSupplierSyncLog({
    ...data,
    supplier_sales_records: supplierSalesRecords,
  }, {
    supplier_business_id: dealRecord.supplier_id,
    buyer_business_id: dealRecord.buyer_id,
    ssawa_deal_id: dealId,
    supplier_sales_record_id: mapped.id,
    action,
    status: nextStatus === "skipped" ? "skipped" : needsReview ? "needs_review" : "success",
    message: nextStatus === "skipped" ? "이미 공급업체 매출로 정리된 거래입니다." : needsReview ? "공급업체 매출로 정리했고 일부 확인이 필요합니다." : "공급업체 매출로 정리했습니다.",
    triggered_by: triggeredBy,
    triggered_user_id: options.actorUserId,
    payload_snapshot_json: JSON.stringify(snapshotDeal(dealRecord)),
    created_at: createdAt,
  });
  saveData(nextData);
  return {
    data: nextData,
    ok: true,
    status: nextStatus,
    supplierSaleRecordId: mapped.id,
    message: nextStatus === "skipped" ? "이미 공급업체 매출로 정리된 거래입니다." : needsReview ? "공급업체 매출로 정리했고 일부 확인이 필요합니다." : "공급업체 매출로 정리했습니다.",
  };
}

export function createSupplierManualSalesRecord(data: AppData, input: Omit<SupplierSalesRecord, "id" | "source" | "source_id" | "created_at" | "updated_at">): { data: AppData; recordId: string } {
  const createdAt = new Date().toISOString();
  const recordId = `supplier-sale-${Date.now()}`;
  const record: SupplierSalesRecord = normalizeSupplierSalesRecord({
    ...input,
    id: recordId,
    source: "manual",
    source_id: recordId,
    created_at: createdAt,
    updated_at: createdAt,
  });
  const nextData = { ...data, supplier_sales_records: [record, ...data.supplier_sales_records] };
  saveData(nextData);
  return { data: nextData, recordId };
}

export function updateSupplierSaleTaxInvoiceStatus(data: AppData, recordId: string, status: SupplierTaxInvoiceStatus): AppData {
  const updatedAt = new Date().toISOString();
  const nextData = {
    ...data,
    supplier_sales_records: data.supplier_sales_records.map((record) => record.id === recordId ? { ...record, tax_invoice_status: status, updated_at: updatedAt } : record),
  };
  saveData(nextData);
  return nextData;
}

export function updateDealStatus(
  data: AppData,
  dealId: string,
  nextStatus: DealStatus,
  changedBy: "buyer" | "supplier" | "admin",
  memo: string,
): AppData {
  const targetDeal = data.deals.find((entry) => entry.id === dealId);
  if (!targetDeal) return data;

  const updatedAt = new Date().toISOString();
  const completedAt = nextStatus === "completed" ? updatedAt : targetDeal.completed_at;

  const requestStatus =
    nextStatus === "completed"
      ? "completed"
      : nextStatus === "cancelled_by_buyer" || nextStatus === "cancelled_by_supplier"
        ? "cancelled"
        : nextStatus === "confirmed" || nextStatus === "preparing" || nextStatus === "delivering" || nextStatus === "delivered"
          ? "in_progress"
          : "selected";

  let nextData: AppData = {
    ...data,
    deals: data.deals.map((entry) =>
      entry.id === dealId
        ? {
            ...entry,
            status: nextStatus,
            updated_at: updatedAt,
            completed_at: completedAt,
            cancellation_reason: nextStatus.includes("cancelled") ? memo : entry.cancellation_reason,
            dispute_reason: nextStatus === "disputed" ? memo : entry.dispute_reason,
          }
        : entry,
    ),
    quote_requests: data.quote_requests.map((entry) =>
      entry.id === targetDeal.quote_request_id ? { ...entry, status: requestStatus, updated_at: updatedAt } : entry,
    ),
    deal_status_logs: [
      log(`log-${Date.now()}`, dealId, targetDeal.status, nextStatus, changedBy, memo || dealStatusLabels[nextStatus]),
      ...data.deal_status_logs,
    ],
  };
  nextData = appendDealStatusMessage(nextData, dealId, dealStatusLabels[nextStatus], updatedAt);
  const todaySync = syncSsawaDealToTodayPurchase(nextData, dealId, {
    triggeredBy: "system",
    actorUserId: changedBy === "buyer" ? targetDeal.buyer_id : changedBy === "admin" ? adminUserId(nextData) : "system",
  });
  nextData = todaySync.data;
  const supplierSaleSync = syncSsawaDealToSupplierSale(nextData, dealId, {
    triggeredBy: "system",
    actorUserId: changedBy === "supplier" ? supplierUserId(targetDeal.supplier_id) : changedBy === "admin" ? adminUserId(nextData) : "system",
  });
  nextData = supplierSaleSync.data;
  const syncedPurchaseRecord = todaySync.purchaseRecordId
    ? nextData.purchase_records.find((entry) => entry.id === todaySync.purchaseRecordId)
    : undefined;
  const syncedSupplierSaleRecord = supplierSaleSync.supplierSaleRecordId
    ? nextData.supplier_sales_records.find((entry) => entry.id === supplierSaleSync.supplierSaleRecordId)
    : undefined;
  const supplierIdForNotification = supplierUserId(targetDeal.supplier_id);
  const actorId = changedBy === "buyer" ? targetDeal.buyer_id : changedBy === "supplier" ? supplierIdForNotification : adminUserId(nextData);
  if (["confirmed", "preparing", "delivering", "delivered"].includes(nextStatus)) {
    const typeMap: Partial<Record<DealStatus, NotificationType>> = {
      confirmed: "deal_confirmed",
      preparing: "deal_preparing",
      delivering: "deal_delivering",
      delivered: "deal_delivered",
    };
    nextData = appendNotification(nextData, {
      user_id: targetDeal.buyer_id,
      user_role: "buyer",
      type: typeMap[nextStatus] ?? "deal_confirmed",
      title: dealStatusNotificationTitle(nextStatus),
      body: `${supplierNameFromId(nextData, targetDeal.supplier_id)} 거래 상태가 변경되었습니다.`,
      link_url: `/app/deals/${dealId}`,
      related_entity_type: "deal",
      related_entity_id: dealId,
      priority: "high",
      actor_user_id: actorId,
    });
  }
  if (nextStatus === "completed") {
    const feeResult = ensurePlatformFeeForCompletedDeal(nextData, { ...targetDeal, status: nextStatus, completed_at: completedAt, updated_at: updatedAt }, updatedAt);
    nextData = feeResult.data;
    if (feeResult.fee) {
      nextData = appendNotification(nextData, {
        user_id: supplierIdForNotification,
        user_role: "supplier",
        type: "platform_fee_created",
        title: "플랫폼 수수료가 정산 예정에 추가되었습니다.",
        body: `${feeResult.fee.category_name} 거래 수수료 ${feeResult.fee.fee_amount.toLocaleString("ko-KR")}원을 확인해 주세요.`,
        link_url: "/app/supplier/settlements",
        related_entity_type: "platform_fee",
        related_entity_id: feeResult.fee.id,
        priority: "normal",
        actor_user_id: "system",
      });
      nextData = appendNotification(nextData, {
        user_id: supplierIdForNotification,
        user_role: "supplier",
        type: "settlement_ready",
        title: "정산 예정 내역을 확인해 주세요.",
        body: `"${targetDeal.title}" 거래가 정산 예정 내역에 반영되었습니다.`,
        link_url: "/app/supplier/settlements",
        related_entity_type: "settlement",
        related_entity_id: feeResult.fee.settlement_id,
        priority: "normal",
        actor_user_id: "system",
      });
      nextData = appendNotification(nextData, {
        user_id: adminUserId(nextData),
        user_role: "admin",
        type: targetDeal.final_amount >= 1000000 ? "high_revenue_deal_completed" : "settlement_pending",
        title: targetDeal.final_amount >= 1000000 ? "고액 거래가 완료되었습니다." : "정산 대기 건이 생성되었습니다.",
        body: `${targetDeal.title} 거래 수수료가 계산되었습니다.`,
        link_url: "/app/admin/revenue",
        related_entity_type: "platform_fee",
        related_entity_id: feeResult.fee.id,
        priority: targetDeal.final_amount >= 1000000 ? "high" : "normal",
        actor_user_id: "system",
      });
    }
    nextData = appendNotification(nextData, {
      user_id: supplierIdForNotification,
      user_role: "supplier",
      type: "deal_completed_by_buyer",
      title: "구매자가 거래 완료를 확인했습니다.",
      body: `"${targetDeal.title}" 거래가 완료되었습니다.`,
      link_url: `/app/deals/${dealId}`,
      related_entity_type: "deal",
      related_entity_id: dealId,
      priority: "high",
      actor_user_id: actorId,
    });
    if (syncedPurchaseRecord && (todaySync.status === "created" || todaySync.status === "updated" || todaySync.status === "needs_review")) {
      nextData = appendNotification(nextData, {
        user_id: targetDeal.buyer_id,
        user_role: "buyer",
        type: "purchase_record_created",
        title: "구매내역이 오늘장사 장부에 정리되었습니다.",
        body: `${syncedPurchaseRecord.purchase_title} 매입이 오늘장사에 반영되었습니다.`,
        link_url: `/app/today/purchases`,
        related_entity_type: "purchase_record",
        related_entity_id: syncedPurchaseRecord.id,
        priority: "normal",
        actor_user_id: "system",
      });
      nextData = appendNotification(nextData, {
        user_id: targetDeal.buyer_id,
        user_role: "buyer",
        type: "accounting_sync_ready",
        title: "오늘장사 매입을 확인해 주세요.",
        body: todaySync.status === "needs_review" ? "일부 정보 확인이 필요한 싸와 매입이 있습니다." : "오늘장사 장부에 자동 반영되었습니다.",
        link_url: "/app/today/ssawa",
        related_entity_type: "purchase_record",
        related_entity_id: syncedPurchaseRecord.id,
        priority: "normal",
        actor_user_id: "system",
      });
    }
    if (syncedSupplierSaleRecord && (supplierSaleSync.status === "created" || supplierSaleSync.status === "updated" || supplierSaleSync.status === "needs_review")) {
      nextData = appendNotification(nextData, {
        user_id: supplierIdForNotification,
        user_role: "supplier",
        type: "settlement_ready",
        title: "오늘장사 매출에 싸와 거래가 정리되었습니다.",
        body: `${syncedSupplierSaleRecord.item_summary} 매출과 정산 상태를 확인해 주세요.`,
        link_url: "/app/today/supplier/sales",
        related_entity_type: "settlement",
        related_entity_id: syncedSupplierSaleRecord.id,
        priority: "normal",
        actor_user_id: "system",
      });
    }
  }
  if (nextStatus === "cancelled_by_buyer" || nextStatus === "cancelled_by_supplier") {
    const targetUserId = nextStatus === "cancelled_by_buyer" ? supplierIdForNotification : targetDeal.buyer_id;
    nextData = appendNotification(nextData, {
      user_id: targetUserId,
      user_role: nextStatus === "cancelled_by_buyer" ? "supplier" : "buyer",
      type: nextStatus === "cancelled_by_buyer" ? "deal_cancelled_by_buyer" : "deal_cancelled",
      title: "거래가 취소되었습니다.",
      body: `"${targetDeal.title}" 거래 취소 사유를 확인해주세요.`,
      link_url: `/app/deals/${dealId}`,
      related_entity_type: "deal",
      related_entity_id: dealId,
      priority: "urgent",
      actor_user_id: actorId,
    });
  }
  if (nextStatus === "disputed") {
    [
      { user_id: targetDeal.buyer_id, user_role: "buyer" as const, type: "deal_disputed" as const },
      { user_id: supplierIdForNotification, user_role: "supplier" as const, type: "deal_disputed" as const },
      { user_id: adminUserId(nextData), user_role: "admin" as const, type: "deal_dispute_created" as const },
    ].forEach((target) => {
      nextData = appendNotification(nextData, {
        user_id: target.user_id,
        user_role: target.user_role,
        type: target.type,
        title: "거래 문제 신고가 접수되었습니다.",
        body: `"${targetDeal.title}" 거래에서 문제가 신고되었습니다.`,
        link_url: target.user_role === "admin" ? "/app/admin/deals" : `/app/deals/${dealId}`,
        related_entity_type: "deal",
        related_entity_id: dealId,
        priority: "urgent",
        actor_user_id: actorId,
      });
    });
  }

  saveData(nextData);
  return nextData;
}

export function addDealAttachment(
  data: AppData,
  dealId: string,
  attachmentType: DealAttachment["attachment_type"],
  fileName: string,
  uploadedBy: DealAttachment["uploaded_by"],
): AppData {
  if (!fileName.trim()) return data;
  const createdAt = new Date().toISOString();
  const nextData: AppData = {
    ...data,
    deal_attachments: [
      {
        id: `attach-${Date.now()}`,
        deal_id: dealId,
        file_url: "#",
        file_name: fileName.trim(),
        file_type: fileName.split(".").pop() ?? "file",
        attachment_type: attachmentType,
        uploaded_by: uploadedBy,
        created_at: createdAt,
      },
      ...data.deal_attachments,
    ],
  };
  saveData(nextData);
  return nextData;
}

export function calculateVatAmount(finalAmount: number): { supplyAmount: number; vatAmount: number } {
  const supplyAmount = Math.round(finalAmount / 1.1);
  return { supplyAmount, vatAmount: finalAmount - supplyAmount };
}

export function calculateVatIncluded(finalAmount: number): { supplyAmount: number; vatAmount: number } {
  return calculateVatAmount(finalAmount);
}

export function calculateEstimatedSavings(previousAmount?: number, selectedAmount?: number) {
  if (!previousAmount || !selectedAmount || previousAmount <= selectedAmount) {
    return { amount: 0, rate: 0 };
  }
  const amount = previousAmount - selectedAmount;
  return { amount, rate: Math.round((amount / previousAmount) * 100) };
}

export function getAccountingCategoryFromDeal(dealRecord: Deal) {
  return getAccountingCategory(dealRecord.category_name);
}

export function getAccountingCategory(categoryName: string) {
  if (categoryName.includes("식자재")) return "매입비";
  if (categoryName.includes("포장재")) return "포장재비";
  if (categoryName.includes("소모품")) return "소모품비";
  if (categoryName.includes("주방")) return "주방용품비";
  if (categoryName.includes("설비") || categoryName.includes("닥트") || categoryName.includes("환기")) return "수선비";
  if (categoryName.includes("건축")) return "시설비";
  if (categoryName.includes("공구") || categoryName.includes("산업")) return "공구소모품비";
  return "자재구매";
}

export function calculatePurchaseSummary(records: PurchaseRecord[]) {
  const totalAmount = records.reduce((sum, record) => sum + record.total_amount, 0);
  const supplyAmount = records.reduce((sum, record) => sum + record.supply_amount, 0);
  const vatAmount = records.reduce((sum, record) => sum + record.vat_amount, 0);
  const deliveryFee = records.reduce((sum, record) => sum + record.delivery_fee, 0);
  const savingsAmount = records.reduce((sum, record) => sum + record.estimated_savings_amount, 0);
  const pendingCount = records.filter((record) => record.accounting_status === "pending").length;
  const syncedCount = records.filter((record) => record.accounting_status === "synced").length;
  const missingDocumentCount = records.filter((record) => record.receipt_status === "none" || record.delivery_note_status === "none").length;
  return {
    count: records.length,
    totalAmount,
    supplyAmount,
    vatAmount,
    deliveryFee,
    savingsAmount,
    pendingCount,
    syncedCount,
    missingDocumentCount,
  };
}

export function groupPurchasesByCategory(records: PurchaseRecord[]) {
  return groupPurchases(records, (record) => record.accounting_category || record.auto_category || record.category_name);
}

export function groupPurchasesBySupplier(records: PurchaseRecord[]) {
  return groupPurchases(records, (record) => record.supplier_name);
}

export function calculateEstimatedSavingsSummary(records: PurchaseRecord[]) {
  const totalPrevious = records.reduce((sum, record) => sum + (record.previous_purchase_amount ?? 0), 0);
  const totalSavings = records.reduce((sum, record) => sum + record.estimated_savings_amount, 0);
  return {
    totalPrevious,
    totalSavings,
    averageRate: totalPrevious > 0 ? Math.round((totalSavings / totalPrevious) * 100) : 0,
    recordCount: records.filter((record) => record.estimated_savings_amount > 0).length,
  };
}

export type PurchaseClassificationResult = {
  category: string;
  confidence: number;
  reason: string;
  ruleId?: string;
  needsReview: boolean;
};

function normalizeCategoryText(value = "") {
  return value.toLowerCase().replace(/\s+/g, " ").trim();
}

function splitRulePattern(pattern: string) {
  return pattern
    .split(",")
    .map((entry) => normalizeCategoryText(entry))
    .filter(Boolean);
}

function getRecordBusinessId(record: PurchaseRecord) {
  return record.business_id || record.buyer_id;
}

function directCategoryMatch(value = "") {
  const source = normalizeCategoryText(value);
  return todayPurchaseCategoryNames.find((category) => source.includes(normalizeCategoryText(category)));
}

function getPurchaseClassificationSource(data: AppData, record: PurchaseRecord) {
  const items = data.purchase_record_items.filter((entry) => entry.purchase_record_id === record.id).map((entry) => entry.item_name);
  return normalizeCategoryText([
    record.item_summary,
    record.purchase_title,
    record.category_name,
    record.sub_category,
    record.supplier_name,
    ...items,
  ].filter(Boolean).join(" "));
}

function buildClassificationResult(category: string, confidence: number, reason: string, ruleId?: string): PurchaseClassificationResult {
  const normalizedConfidence = Math.max(0, Math.min(0.99, Number(confidence.toFixed(2))));
  const lowConfidence = normalizedConfidence < 0.7;
  return {
    category: lowConfidence ? "미분류" : category,
    confidence: normalizedConfidence,
    reason: lowConfidence ? `${reason} / 신뢰도 낮음` : reason,
    ruleId,
    needsReview: normalizedConfidence < 0.9,
  };
}

function findMatchingRule(data: AppData, record: PurchaseRecord, source: string, sourceType: "user" | "system") {
  const businessId = getRecordBusinessId(record);
  return (data.today_category_rules ?? [])
    .filter((rule) => rule.source === sourceType)
    .filter((rule) => !rule.business_id || rule.business_id === businessId)
    .filter((rule) => todayPurchaseCategoryNames.includes(rule.category_name as (typeof todayPurchaseCategoryNames)[number]))
    .sort((a, b) => b.confidence - a.confidence || b.use_count - a.use_count)
    .find((rule) => {
      const patterns = splitRulePattern(rule.pattern);
      if (!patterns.length) return false;
      if (rule.rule_type === "request_category") return patterns.some((pattern) => normalizeCategoryText(record.category_name).includes(pattern));
      if (rule.rule_type === "supplier_contains") return patterns.some((pattern) => normalizeCategoryText(record.supplier_name).includes(pattern));
      return patterns.some((pattern) => source.includes(pattern));
    });
}

export function classifyPurchaseRecord(data: AppData, record: PurchaseRecord): PurchaseClassificationResult {
  const source = getPurchaseClassificationSource(data, record);
  const direct = directCategoryMatch(`${record.item_summary ?? ""} ${record.category_name}`);
  if (direct && direct !== "미분류") {
    return buildClassificationResult(direct, 0.93, `품목/요청 카테고리에서 '${direct}'를 찾았습니다.`);
  }

  const userRule = findMatchingRule(data, record, source, "user");
  if (userRule) {
    return buildClassificationResult(userRule.category_name, Math.max(userRule.confidence, 0.91), `사용자 학습 규칙 '${userRule.pattern}' 적용`, userRule.id);
  }

  const systemRule = findMatchingRule(data, record, source, "system");
  if (systemRule) {
    return buildClassificationResult(systemRule.category_name, systemRule.confidence, `기본 키워드 규칙 '${systemRule.pattern}' 적용`, systemRule.id);
  }

  const supplier = data.supplier_profiles.find((entry) => entry.id === record.supplier_id);
  const supplierCategory = supplier?.categories.map(directCategoryMatch).find(Boolean);
  if (supplierCategory && supplierCategory !== "미분류") {
    return buildClassificationResult(supplierCategory, 0.74, `공급업체 취급 카테고리 '${supplierCategory}' 참고`);
  }

  const fallback = directCategoryMatch(record.category_name);
  if (fallback && fallback !== "미분류") {
    return buildClassificationResult(fallback, 0.72, `요청 카테고리 '${record.category_name}' 참고`);
  }

  return buildClassificationResult("미분류", 0.45, "일치하는 분류 규칙이 없습니다.");
}

function applyClassificationToRecord(data: AppData, record: PurchaseRecord, force = false): PurchaseRecord {
  if (record.category_confirmed_by_user && !force) return record;
  const classification = classifyPurchaseRecord(data, record);
  return {
    ...record,
    category_name: classification.category,
    accounting_category: classification.category,
    auto_category: classification.category,
    category_confidence: classification.confidence,
    category_reason: classification.reason,
    category_needs_review: classification.needsReview,
    category_confirmed_by_user: false,
    category_rule_id: classification.ruleId,
  };
}

function appendCategoryClassificationLog(
  data: AppData,
  record: PurchaseRecord,
  input: Omit<TodayCategoryClassificationLog, "id" | "business_id" | "purchase_record_id" | "created_at">,
) {
  const createdAt = new Date().toISOString();
  const logEntry: TodayCategoryClassificationLog = {
    id: `today-category-log-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    business_id: getRecordBusinessId(record),
    purchase_record_id: record.id,
    created_at: createdAt,
    ...input,
  };
  return {
    ...data,
    today_category_classification_logs: [logEntry, ...(data.today_category_classification_logs ?? [])],
  };
}

export function applyPurchaseClassification(data: AppData, purchaseId: string, options: { force?: boolean; actorUserId?: string } = {}): AppData {
  const record = data.purchase_records.find((entry) => entry.id === purchaseId);
  if (!record) return data;
  const updatedAt = new Date().toISOString();
  const classified = applyClassificationToRecord(data, record, Boolean(options.force));
  const nextData = appendCategoryClassificationLog(
    {
      ...data,
      purchase_records: data.purchase_records.map((entry) =>
        entry.id === purchaseId ? { ...classified, updated_at: updatedAt } : entry,
      ),
    },
    classified,
    {
      previous_category: record.accounting_category,
      classified_category: classified.accounting_category,
      confidence: classified.category_confidence ?? 0,
      reason: classified.category_reason ?? "",
      rule_id: classified.category_rule_id,
      action: options.force ? "reclassified" : "auto_classified",
      actor_user_id: options.actorUserId,
    },
  );
  saveData(nextData);
  return nextData;
}

function buildLearningPattern(record: PurchaseRecord) {
  const source = `${record.item_summary ?? ""} ${record.purchase_title}`.trim();
  const token = source.split(/[\s,./|·]+/).find((entry) => entry.trim().length >= 2);
  return (token || source || record.supplier_name || record.category_name || "기타").slice(0, 40);
}

export function confirmPurchaseCategory(data: AppData, purchaseId: string, actorUserId = "buyer-1"): AppData {
  const record = data.purchase_records.find((entry) => entry.id === purchaseId);
  if (!record) return data;
  const updatedAt = new Date().toISOString();
  const nextRecord: PurchaseRecord = {
    ...record,
    category_needs_review: false,
    category_confirmed_by_user: true,
    category_confirmed_at: updatedAt,
    updated_at: updatedAt,
  };
  const nextData = appendCategoryClassificationLog(
    {
      ...data,
      purchase_records: data.purchase_records.map((entry) => entry.id === purchaseId ? nextRecord : entry),
    },
    nextRecord,
    {
      previous_category: record.accounting_category,
      classified_category: nextRecord.accounting_category,
      confidence: nextRecord.category_confidence ?? 1,
      reason: "사용자가 분류를 확인했습니다.",
      rule_id: nextRecord.category_rule_id,
      action: "user_confirmed",
      actor_user_id: actorUserId,
    },
  );
  saveData(nextData);
  return nextData;
}

export function changePurchaseCategory(
  data: AppData,
  purchaseId: string,
  categoryName: string,
  options: { learnSimilar?: boolean; actorUserId?: string } = {},
): AppData {
  const record = data.purchase_records.find((entry) => entry.id === purchaseId);
  if (!record) return data;
  const selected = todayPurchaseCategoryNames.includes(categoryName as (typeof todayPurchaseCategoryNames)[number]) ? categoryName : "기타 매입";
  const updatedAt = new Date().toISOString();
  const businessId = getRecordBusinessId(record);
  const pattern = buildLearningPattern(record);
  const rule: TodayCategoryRule | null = options.learnSimilar
    ? {
        id: `today-rule-user-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        business_id: businessId,
        category_name: selected,
        rule_type: "item_contains",
        pattern,
        confidence: 0.96,
        source: "user",
        use_count: 1,
        last_used_at: updatedAt,
        created_by: options.actorUserId ?? record.buyer_id,
        created_at: updatedAt,
        updated_at: updatedAt,
      }
    : null;
  const nextRecord: PurchaseRecord = {
    ...record,
    category_name: selected,
    accounting_category: selected,
    auto_category: record.auto_category || selected,
    category_confidence: 1,
    category_reason: options.learnSimilar ? `사용자 변경 및 유사 품목 규칙 '${pattern}' 저장` : "사용자가 이 건의 분류를 변경했습니다.",
    category_needs_review: false,
    category_confirmed_by_user: true,
    category_confirmed_at: updatedAt,
    category_rule_id: rule?.id ?? record.category_rule_id,
    updated_at: updatedAt,
  };
  const nextData = appendCategoryClassificationLog(
    {
      ...data,
      purchase_records: data.purchase_records.map((entry) => entry.id === purchaseId ? nextRecord : entry),
      today_category_rules: rule ? [rule, ...(data.today_category_rules ?? [])] : data.today_category_rules,
    },
    nextRecord,
    {
      previous_category: record.accounting_category,
      classified_category: selected,
      confidence: 1,
      reason: nextRecord.category_reason ?? "",
      rule_id: rule?.id,
      action: "user_changed",
      actor_user_id: options.actorUserId ?? record.buyer_id,
    },
  );
  saveData(nextData);
  return nextData;
}

export function getPurchaseCategorySummary(records: PurchaseRecord[]) {
  return todayPurchaseCategoryNames
    .map((category) => {
      const matches = records.filter((record) => (record.accounting_category || record.category_name) === category);
      return {
        category,
        count: matches.length,
        amount: matches.reduce((sum, record) => sum + record.total_amount, 0),
        reviewCount: matches.filter((record) => record.category_needs_review || record.accounting_category === "미분류").length,
      };
    })
    .filter((entry) => entry.count > 0 || entry.category === "미분류");
}

export function updatePurchaseRecord(data: AppData, purchaseId: string, patch: Partial<PurchaseRecord>): AppData {
  const updatedAt = new Date().toISOString();
  const nextData: AppData = {
    ...data,
    purchase_records: data.purchase_records.map((record) =>
      record.id === purchaseId ? { ...record, ...patch, updated_at: updatedAt } : record,
    ),
  };
  saveData(nextData);
  return nextData;
}

export function updatePurchaseAccountingStatus(data: AppData, purchaseId: string, status: AccountingStatus, memo = ""): AppData {
  const updatedAt = new Date().toISOString();
  const nextData: AppData = {
    ...data,
    purchase_records: data.purchase_records.map((record) =>
      record.id === purchaseId
        ? {
            ...record,
            accounting_status: status,
            admin_memo: memo || record.admin_memo,
            updated_at: updatedAt,
          }
        : record,
    ),
    accounting_entries: data.accounting_entries.map((entry) =>
      entry.purchase_record_id === purchaseId
        ? {
            ...entry,
            sync_status: status === "synced" ? "synced" : status === "excluded" ? "excluded" : status === "failed" ? "failed" : "pending",
            synced_at: status === "synced" ? updatedAt : entry.synced_at,
            failure_reason: status === "failed" ? memo || "장부 반영 실패 샘플" : entry.failure_reason,
            updated_at: updatedAt,
          }
        : entry,
    ),
  };
  saveData(nextData);
  return nextData;
}

export function addPurchaseDocument(
  data: AppData,
  purchaseId: string,
  documentType: PurchaseDocumentType,
  fileName: string,
  uploadedBy: PurchaseDocument["uploaded_by"],
): AppData {
  if (!fileName.trim()) return data;
  const createdAt = new Date().toISOString();
  const document = purchaseDocument(`pdoc-${Date.now()}`, purchaseId, documentType, fileName.trim(), "uploaded", uploadedBy, createdAt);
  const statusPatch: Partial<PurchaseRecord> = {};
  if (documentType === "receipt") statusPatch.receipt_status = "uploaded";
  if (documentType === "delivery_note" || documentType === "invoice") statusPatch.delivery_note_status = "uploaded";
  if (documentType === "tax_invoice") statusPatch.tax_invoice_status = "pending";

  const nextData: AppData = {
    ...data,
    purchase_documents: [document, ...data.purchase_documents],
    purchase_records: data.purchase_records.map((record) =>
      record.id === purchaseId ? { ...record, ...statusPatch, updated_at: createdAt } : record,
    ),
  };
  saveData(nextData);
  return nextData;
}

export type TaxDocumentInput = {
  business_id?: string;
  source_type: TaxDocument["source_type"];
  source_id: string;
  document_type: TaxDocumentType;
  document_name: string;
  file_mime_type?: string;
  file_size?: number;
  amount?: number;
  issued_at?: string;
  supplier_name?: string;
  memo?: string;
  status?: TaxDocumentStatus;
  uploaded_by?: string;
};

export function createTaxDocument(data: AppData, input: TaxDocumentInput): { data: AppData; documentId: string; error?: string } {
  if (!input.source_id.trim()) return { data, documentId: "", error: "자료를 연결할 내역을 찾지 못했습니다." };
  if (!input.document_name.trim()) return { data, documentId: "", error: "파일명을 입력해 주세요." };
  const allowed = [".jpg", ".jpeg", ".png", ".webp", ".pdf"];
  if (!allowed.some((ext) => input.document_name.toLowerCase().endsWith(ext))) {
    return { data, documentId: "", error: "지원하지 않는 파일 형식입니다." };
  }
  if ((input.file_size ?? 0) > 10 * 1024 * 1024) return { data, documentId: "", error: "파일 크기는 10MB 이하로 올려주세요." };

  const createdAt = new Date().toISOString();
  const documentId = `tax-doc-${Date.now()}`;
  const businessId = input.business_id || "buyer-1";
  const yearMonth = (input.issued_at || createdAt.slice(0, 10)).slice(0, 7).replace("-", "/");
  const document: TaxDocument = {
    id: documentId,
    business_id: businessId,
    source_type: input.source_type,
    source_id: input.source_id,
    document_type: input.document_type,
    document_name: input.document_name.trim(),
    file_url: "#",
    file_path: `tax-documents/${businessId}/${yearMonth}/${documentId}-${input.document_name.trim()}`,
    file_mime_type: input.file_mime_type ?? guessTaxDocumentMime(input.document_name),
    file_size: input.file_size ?? 0,
    amount: input.amount,
    issued_at: input.issued_at,
    supplier_name: input.supplier_name,
    memo: input.memo?.trim() ?? "",
    status: input.status ?? "attached",
    uploaded_by: input.uploaded_by ?? businessId,
    created_at: createdAt,
    updated_at: createdAt,
  };

  const nextData: AppData = {
    ...data,
    tax_documents: [document, ...(data.tax_documents ?? [])],
    purchase_records: data.purchase_records.map((record) => {
      if ((input.source_type === "purchase" || input.source_type === "ssawa_deal") && (record.id === input.source_id || record.ssawa_deal_id === input.source_id || record.deal_id === input.source_id)) {
        return {
          ...record,
          evidence_status: "complete",
          receipt_status: input.document_type === "receipt" || input.document_type === "card_receipt" || input.document_type === "cash_receipt" ? "uploaded" : record.receipt_status,
          delivery_note_status: input.document_type === "transaction_statement" || input.document_type === "delivery_confirmation" || input.document_type === "invoice" ? "uploaded" : record.delivery_note_status,
          tax_invoice_status: input.document_type === "tax_invoice" ? "received" : record.tax_invoice_status,
          updated_at: createdAt,
        };
      }
      return record;
    }),
    sales_records: data.sales_records.map((record) => input.source_type === "sales" && record.id === input.source_id ? { ...record, evidence_status: "complete", updated_at: createdAt } : record),
    expense_records: data.expense_records.map((record) => input.source_type === "expense" && record.id === input.source_id ? { ...record, evidence_status: "complete", updated_at: createdAt } : record),
  };
  saveData(nextData);
  return { data: nextData, documentId };
}

export function updateTaxDocumentStatus(data: AppData, documentId: string, status: TaxDocumentStatus): AppData {
  const updatedAt = new Date().toISOString();
  const nextData = {
    ...data,
    tax_documents: data.tax_documents.map((document) => document.id === documentId ? { ...document, status, updated_at: updatedAt } : document),
  };
  saveData(nextData);
  return nextData;
}

export function updatePurchaseTaxInvoiceStatus(data: AppData, purchaseId: string, status: TaxInvoiceStatus): AppData {
  const updatedAt = new Date().toISOString();
  const nextData = {
    ...data,
    purchase_records: data.purchase_records.map((record) => record.id === purchaseId ? { ...record, tax_invoice_status: status, updated_at: updatedAt } : record),
  };
  saveData(nextData);
  return nextData;
}

export function createTaxExportRequest(data: AppData, input: Omit<TaxExportRequest, "id" | "status" | "created_at" | "updated_at">): { data: AppData; exportId: string } {
  const createdAt = new Date().toISOString();
  const exportId = `tax-export-${Date.now()}`;
  const request: TaxExportRequest = {
    ...input,
    id: exportId,
    status: "generated",
    created_at: createdAt,
    updated_at: createdAt,
  };
  const nextData = { ...data, tax_export_requests: [request, ...data.tax_export_requests] };
  saveData(nextData);
  return { data: nextData, exportId };
}

function guessTaxDocumentMime(fileName: string) {
  const lower = fileName.toLowerCase();
  if (lower.endsWith(".pdf")) return "application/pdf";
  if (lower.endsWith(".png")) return "image/png";
  if (lower.endsWith(".webp")) return "image/webp";
  return "image/jpeg";
}

export function createManualPurchaseRecord(data: AppData, draft: ManualPurchaseDraft): { data: AppData; purchaseId: string } {
  const createdAt = new Date().toISOString();
  const purchaseId = localId("purchase");
  const totalAmount = Math.max(0, Math.round(draft.total_amount));
  const vat = draft.supply_amount && draft.vat_amount ? { supplyAmount: draft.supply_amount, vatAmount: draft.vat_amount } : calculateVatAmount(totalAmount);
  const items = draft.items.filter((itemEntry) => itemEntry.item_name.trim());
  let record: PurchaseRecord = {
    id: purchaseId,
    buyer_id: "buyer-1",
    supplier_id: localId("manual"),
    supplier_name: draft.supplier_name.trim() || "수동 등록 거래처",
    supplier_business_number: draft.supplier_business_number.trim() || "000-00-00000",
    purchase_title: draft.purchase_title.trim() || `${draft.category_name || "자재"} 수동 구매`,
    purchase_date: draft.purchase_date || createdAt.slice(0, 10),
    category_name: draft.category_name || "기타",
    accounting_category: draft.accounting_category || getAccountingCategory(draft.category_name),
    sub_category: draft.sub_category,
    item_count: Math.max(1, items.length),
    total_amount: totalAmount,
    supply_amount: vat.supplyAmount,
    vat_amount: vat.vatAmount,
    delivery_fee: Math.max(0, Math.round(draft.delivery_fee)),
    discount_amount: Math.max(0, Math.round(draft.discount_amount)),
    estimated_savings_amount: 0,
    estimated_savings_rate: 0,
    previous_purchase_amount: 0,
    payment_method: draft.payment_method,
    tax_invoice_status: draft.tax_invoice_status,
    receipt_status: draft.receipt_status,
    delivery_note_status: draft.delivery_note_status,
    accounting_status: "pending",
    sync_target: "today_jangsa",
    memo: draft.memo || "수동 등록한 구매내역입니다.",
    user_memo: draft.memo,
    admin_memo: "",
    created_at: createdAt,
    updated_at: createdAt,
  };
  record = applyClassificationToRecord(data, record, true);
  const purchaseItems = (items.length ? items : [{
    item_name: record.purchase_title,
    spec: "",
    quantity: 1,
    unit: "건",
    unit_price: totalAmount,
    total_price: totalAmount,
    memo: "",
  }]).map((itemEntry, index) => ({
    id: `${purchaseId}-item-${index + 1}`,
    purchase_record_id: purchaseId,
    item_name: itemEntry.item_name,
    spec: itemEntry.spec,
    quantity: itemEntry.quantity,
    unit: itemEntry.unit,
    unit_price: itemEntry.unit_price,
    total_price: itemEntry.total_price || itemEntry.unit_price * itemEntry.quantity,
    memo: itemEntry.memo,
    created_at: createdAt,
  }));
  const accountingEntry = createAccountingEntryFromPurchaseRecord(record, createdAt);
  let nextData: AppData = {
    ...data,
    purchase_records: [record, ...data.purchase_records],
    purchase_record_items: [...purchaseItems, ...data.purchase_record_items],
    accounting_entries: [accountingEntry, ...data.accounting_entries],
  };
  nextData = appendNotification(nextData, {
    user_id: record.buyer_id,
    user_role: "buyer",
    type: "purchase_record_created",
    title: "구매내역이 저장되었습니다.",
    body: `${record.purchase_title} 구매내역이 장부 반영 대기 자료로 저장되었습니다.`,
    link_url: `/app/purchases/${purchaseId}`,
    related_entity_type: "purchase_record",
    related_entity_id: purchaseId,
    priority: "normal",
    actor_user_id: record.buyer_id,
  });
  nextData = appendNotification(nextData, {
    user_id: record.buyer_id,
    user_role: "buyer",
    type: "accounting_sync_ready",
    title: "장부 반영 준비가 완료되었습니다.",
    body: "오늘장사 장부에 반영할 구매내역을 확인해주세요.",
    link_url: "/app/accounting/pending",
    related_entity_type: "purchase_record",
    related_entity_id: purchaseId,
    priority: "normal",
    actor_user_id: "system",
  });
  saveData(nextData);
  return { data: nextData, purchaseId };
}

export type TodaySalesRecordInput = {
  business_id?: string;
  sales_type: TodaySalesRecord["sales_type"];
  payment_method: TodaySalesRecord["payment_method"];
  sales_channel: TodaySalesRecord["sales_channel"];
  amount: number;
  sales_date: string;
  memo?: string;
  evidence_status?: TodayEvidenceStatus;
  evidence_files_json?: string;
  created_by?: string;
};

export type TodayExpenseRecordInput = {
  business_id?: string;
  expense_type: TodayExpenseRecord["expense_type"];
  payment_method: TodayExpenseRecord["payment_method"];
  vendor_name?: string;
  amount: number;
  expense_date: string;
  memo?: string;
  evidence_status?: TodayEvidenceStatus;
  evidence_files_json?: string;
  is_recurring?: boolean;
  recurring_rule_id?: string;
  created_by?: string;
};

function requirePositiveAmount(amount: number) {
  return Number.isFinite(amount) && amount > 0;
}

export function createSalesRecord(data: AppData, input: TodaySalesRecordInput): { data: AppData; salesId: string; error?: string } {
  if (!requirePositiveAmount(input.amount)) return { data, salesId: "", error: "금액을 입력해 주세요." };
  if (!input.sales_date) return { data, salesId: "", error: "날짜를 선택해 주세요." };
  if (!input.sales_type) return { data, salesId: "", error: "구분을 선택해 주세요." };
  const createdAt = new Date().toISOString();
  const record: TodaySalesRecord = {
    id: localId("today-sale"),
    business_id: input.business_id || "buyer-1",
    source: "manual",
    sales_type: input.sales_type,
    payment_method: input.payment_method,
    sales_channel: input.sales_channel,
    amount: Math.round(input.amount),
    sales_date: input.sales_date,
    memo: input.memo?.trim() ?? "",
    evidence_status: input.evidence_status ?? "not_required",
    evidence_files_json: input.evidence_files_json ?? "[]",
    created_by: input.created_by ?? input.business_id ?? "buyer-1",
    created_at: createdAt,
    updated_at: createdAt,
  };
  const nextData = { ...data, sales_records: [record, ...data.sales_records] };
  saveData(nextData);
  return { data: nextData, salesId: record.id };
}

export function updateSalesRecord(data: AppData, salesId: string, patch: Partial<TodaySalesRecordInput>): AppData {
  const updatedAt = new Date().toISOString();
  const nextData = {
    ...data,
    sales_records: data.sales_records.map((record) =>
      record.id === salesId
        ? {
            ...record,
            ...patch,
            amount: patch.amount === undefined ? record.amount : Math.max(0, Math.round(patch.amount)),
            memo: patch.memo ?? record.memo,
            updated_at: updatedAt,
          }
        : record,
    ),
  };
  saveData(nextData);
  return nextData;
}

export function deleteSalesRecord(data: AppData, salesId: string): AppData {
  const updatedAt = new Date().toISOString();
  const nextData = {
    ...data,
    sales_records: data.sales_records.map((record) => record.id === salesId ? { ...record, deleted_at: updatedAt, updated_at: updatedAt } : record),
  };
  saveData(nextData);
  return nextData;
}

export function createExpenseRecord(data: AppData, input: TodayExpenseRecordInput): { data: AppData; expenseId: string; error?: string } {
  if (!requirePositiveAmount(input.amount)) return { data, expenseId: "", error: "금액을 입력해 주세요." };
  if (!input.expense_date) return { data, expenseId: "", error: "날짜를 선택해 주세요." };
  if (!input.expense_type) return { data, expenseId: "", error: "구분을 선택해 주세요." };
  const createdAt = new Date().toISOString();
  let recurringRule: TodayRecurringRule | null = null;
  if (input.is_recurring) {
    recurringRule = {
      id: localId("today-recurring"),
      business_id: input.business_id || "buyer-1",
      record_type: "expense",
      title: `${input.expense_type} 반복 지출`,
      amount: Math.round(input.amount),
      category: input.expense_type,
      payment_method: input.payment_method,
      repeat_type: "monthly",
      day_of_month: Number(input.expense_date.slice(-2)),
      start_date: input.expense_date,
      is_active: true,
      created_by: input.created_by ?? input.business_id ?? "buyer-1",
      created_at: createdAt,
      updated_at: createdAt,
    };
  }
  const record: TodayExpenseRecord = {
    id: localId("today-expense"),
    business_id: input.business_id || "buyer-1",
    expense_type: input.expense_type,
    payment_method: input.payment_method,
    vendor_name: input.vendor_name?.trim() ?? "",
    amount: Math.round(input.amount),
    expense_date: input.expense_date,
    memo: input.memo?.trim() ?? "",
    evidence_status: input.evidence_status ?? "missing",
    evidence_files_json: input.evidence_files_json ?? "[]",
    is_recurring: Boolean(input.is_recurring),
    recurring_rule_id: recurringRule?.id ?? input.recurring_rule_id,
    created_by: input.created_by ?? input.business_id ?? "buyer-1",
    created_at: createdAt,
    updated_at: createdAt,
  };
  const nextData = {
    ...data,
    expense_records: [record, ...data.expense_records],
    recurring_rules: recurringRule ? [recurringRule, ...data.recurring_rules] : data.recurring_rules,
  };
  saveData(nextData);
  return { data: nextData, expenseId: record.id };
}

export function updateExpenseRecord(data: AppData, expenseId: string, patch: Partial<TodayExpenseRecordInput>): AppData {
  const updatedAt = new Date().toISOString();
  const nextData = {
    ...data,
    expense_records: data.expense_records.map((record) =>
      record.id === expenseId
        ? {
            ...record,
            ...patch,
            amount: patch.amount === undefined ? record.amount : Math.max(0, Math.round(patch.amount)),
            memo: patch.memo ?? record.memo,
            vendor_name: patch.vendor_name ?? record.vendor_name,
            updated_at: updatedAt,
          }
        : record,
    ),
  };
  saveData(nextData);
  return nextData;
}

export function deleteExpenseRecord(data: AppData, expenseId: string): AppData {
  const updatedAt = new Date().toISOString();
  const nextData = {
    ...data,
    expense_records: data.expense_records.map((record) => record.id === expenseId ? { ...record, deleted_at: updatedAt, updated_at: updatedAt } : record),
  };
  saveData(nextData);
  return nextData;
}

export function deleteManualPurchaseRecord(data: AppData, purchaseId: string): AppData {
  const record = data.purchase_records.find((entry) => entry.id === purchaseId);
  if (!record || record.source === "ssawa" || record.ssawa_deal_id) return data;
  const updatedAt = new Date().toISOString();
  const nextData = {
    ...data,
    purchase_records: data.purchase_records.map((entry) => entry.id === purchaseId ? { ...entry, deleted_at: updatedAt, updated_at: updatedAt } : entry),
  };
  saveData(nextData);
  return nextData;
}

export function createAnalysisJob(data: AppData, input: AnalysisJobInput): { data: AppData; analysisId: string } {
  const createdAt = new Date().toISOString();
  const analysisId = `analysis-${Date.now()}`;
  const fallbackText = input.original_text_input.trim() || defaultAnalysisText(input.source_type);
  const job: AnalysisJob = {
    id: analysisId,
    buyer_id: "buyer-1",
    source_type: input.source_type,
    original_file_url: "#",
    original_file_name: input.file_name.trim() || defaultAnalysisFileName(input.source_type),
    original_file_type: input.file_type || fileTypeFromName(input.file_name) || (input.source_type === "text" ? "txt" : "jpg"),
    original_text_input: fallbackText,
    status: "queued",
    analysis_engine: "mock",
    confidence_score: 0,
    detected_category: "",
    detected_supplier_name: detectSupplierFromText(fallbackText, input.file_name),
    detected_business_number: "",
    detected_transaction_date: todayLikeDate(createdAt),
    detected_total_amount: 0,
    detected_supply_amount: 0,
    detected_vat_amount: 0,
    detected_delivery_fee: 0,
    detected_payment_method: "undecided",
    error_message: "",
    created_at: createdAt,
    updated_at: createdAt,
  };
  const attachment: AnalysisAttachment = {
    id: `${analysisId}-attachment-1`,
    analysis_job_id: analysisId,
    file_url: "#",
    file_name: job.original_file_name,
    file_type: job.original_file_type,
    page_number: 1,
    preview_url: "#",
    created_at: createdAt,
  };
  const nextData = {
    ...data,
    analysis_jobs: [job, ...data.analysis_jobs],
    analysis_attachments: [attachment, ...data.analysis_attachments],
  };
  saveData(nextData);
  return { data: nextData, analysisId };
}

export function runMockAnalysis(data: AppData, analysisId: string): AppData {
  const job = data.analysis_jobs.find((entry) => entry.id === analysisId);
  if (!job || ["completed", "needs_review", "failed", "cancelled"].includes(job.status)) return data;

  const updatedAt = new Date().toISOString();
  const rawText = job.original_text_input || defaultAnalysisText(job.source_type);
  const parsedItems = parseTextToAnalysisItems(rawText, job.id, updatedAt);
  const category = detectCategoryFromAnalysisItems(parsedItems) || getAccountingCategory(job.detected_category || "기타");
  const totalAmount = extractAmountsFromText(rawText, parsedItems);
  const vat = calculateVatAmount(totalAmount);
  const confidence = calculateAnalysisConfidence(parsedItems, { supplierName: job.detected_supplier_name, totalAmount });
  const needsReview = parsedItems.some((itemEntry) => itemEntry.review_status === "needs_review") || confidence < 85;
  const nextJob: AnalysisJob = {
    ...job,
    status: parsedItems.length ? (needsReview ? "needs_review" : "completed") : "failed",
    confidence_score: parsedItems.length ? confidence : 24,
    detected_category: normalizeDetectedCategory(category),
    detected_supplier_name: job.detected_supplier_name || detectSupplierFromText(rawText, job.original_file_name),
    detected_business_number: job.detected_business_number || detectBusinessNumber(rawText),
    detected_transaction_date: job.detected_transaction_date || todayLikeDate(updatedAt),
    detected_total_amount: totalAmount,
    detected_supply_amount: vat.supplyAmount,
    detected_vat_amount: vat.vatAmount,
    detected_delivery_fee: 0,
    detected_payment_method: "undecided",
    error_message: parsedItems.length ? "" : "품목을 인식하지 못했습니다. 직접 입력하거나 다시 업로드해주세요.",
    updated_at: updatedAt,
    completed_at: updatedAt,
  };
  const rawResult: AnalysisRawResult = {
    id: `${analysisId}-raw-${Date.now()}`,
    analysis_job_id: analysisId,
    raw_text: rawText,
    raw_json: JSON.stringify({ sourceType: job.source_type, items: parsedItems, totalAmount }),
    created_at: updatedAt,
  };
  let nextData: AppData = {
    ...data,
    analysis_jobs: data.analysis_jobs.map((entry) => (entry.id === analysisId ? nextJob : entry)),
    analysis_items: [...parsedItems, ...data.analysis_items.filter((entry) => entry.analysis_job_id !== analysisId)],
    analysis_raw_results: [rawResult, ...data.analysis_raw_results.filter((entry) => entry.analysis_job_id !== analysisId)],
  };
  if (nextJob.status === "completed" || nextJob.status === "needs_review") {
    nextData = appendNotification(nextData, {
      user_id: nextJob.buyer_id,
      user_role: "buyer",
      type: nextJob.status === "completed" ? "analysis_completed" : "analysis_needs_review",
      title: nextJob.status === "completed" ? "자료 분석이 완료되었습니다." : "분석 결과 확인이 필요해요.",
      body: nextJob.status === "completed" ? `${nextJob.original_file_name} 품목 분석이 완료되었습니다.` : "정확한 견적이나 장부 반영을 위해 확인이 필요한 품목이 있습니다.",
      link_url: `/app/analyze/${nextJob.id}`,
      related_entity_type: "analysis",
      related_entity_id: nextJob.id,
      priority: nextJob.status === "completed" ? "normal" : "high",
      actor_user_id: "system",
    });
  }
  if (nextJob.status === "failed") {
    nextData = appendNotification(nextData, {
      user_id: adminUserId(nextData),
      user_role: "admin",
      type: "analysis_failed",
      title: "분석 실패가 발생했습니다.",
      body: `${nextJob.original_file_name} 분석에 실패했습니다.`,
      link_url: `/app/admin/analysis/${nextJob.id}`,
      related_entity_type: "analysis",
      related_entity_id: nextJob.id,
      priority: "high",
      actor_user_id: "system",
    });
  }
  saveData(nextData);
  return nextData;
}

export function parseTextToAnalysisItems(text: string, analysisJobId = "analysis-preview", createdAt = new Date().toISOString()): AnalysisItem[] {
  return text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !/사장님|주문|배송|부탁|합계|총액/.test(line))
    .map((line, index) => parseLineToAnalysisItem(line, analysisJobId, index, createdAt))
    .filter((itemEntry) => itemEntry.item_name.trim());
}

export function extractAmountsFromText(text: string, items: AnalysisItem[] = []) {
  const explicitTotal = text.match(/(?:총액|합계|총\s*금액)\s*[:：]?\s*(\d[\d,]*)\s*원?/);
  if (explicitTotal) return Number(explicitTotal[1].replace(/,/g, ""));
  return items.reduce((sum, itemEntry) => sum + itemEntry.total_price, 0);
}

export function calculateAnalysisConfidence(items: AnalysisItem[], metadata: { supplierName?: string; totalAmount?: number }) {
  if (!items.length) return 20;
  const itemAverage = Math.round(items.reduce((sum, itemEntry) => sum + itemEntry.confidence_score, 0) / items.length);
  const supplierBonus = metadata.supplierName ? 4 : 0;
  const amountBonus = metadata.totalAmount ? 4 : 0;
  const reviewPenalty = items.filter((itemEntry) => itemEntry.review_status === "needs_review").length * 4;
  return Math.max(30, Math.min(98, itemAverage + supplierBonus + amountBonus - reviewPenalty));
}

export function updateAnalysisItem(data: AppData, itemId: string, patch: Partial<AnalysisItem>): AppData {
  const updatedAt = new Date().toISOString();
  const nextData: AppData = {
    ...data,
    analysis_items: data.analysis_items.map((itemEntry) => (itemEntry.id === itemId ? { ...itemEntry, ...patch, updated_at: updatedAt } : itemEntry)),
  };
  saveData(nextData);
  return nextData;
}

export function updateAnalysisJob(data: AppData, analysisId: string, patch: Partial<AnalysisJob>): AppData {
  const updatedAt = new Date().toISOString();
  const nextData: AppData = {
    ...data,
    analysis_jobs: data.analysis_jobs.map((job) => (job.id === analysisId ? { ...job, ...patch, updated_at: updatedAt } : job)),
  };
  saveData(nextData);
  return nextData;
}

export function convertAnalysisToQuoteRequest(
  data: AppData,
  analysisId: string,
  options: {
    delivery_region: string;
    delivery_address: string;
    desired_delivery_date: string;
    need_tax_invoice: boolean;
    disclosure_scope: AnalysisDisclosureScope;
  },
): { data: AppData; requestId: string } {
  const job = data.analysis_jobs.find((entry) => entry.id === analysisId);
  if (!job) return { data, requestId: "" };
  const category = data.categories.find((entry) => entry.name === job.detected_category) ?? data.categories.find((entry) => entry.name === "기타") ?? data.categories[0];
  const includeItemPrices = options.disclosure_scope === "item_prices";
  const includeTotal = options.disclosure_scope === "total_only" || options.disclosure_scope === "item_prices";
  const selectedItems = data.analysis_items.filter((itemEntry) => itemEntry.analysis_job_id === analysisId && itemEntry.review_status !== "excluded");
  const result = createQuoteRequest(data, {
    title: `${job.detected_category || "자재"} 재견적 요청`,
    category_id: category?.id ?? "cat-8",
    delivery_region: options.delivery_region,
    delivery_address: options.delivery_address,
    desired_delivery_date: options.desired_delivery_date,
    need_tax_invoice: options.need_tax_invoice,
    card_payment_required: false,
    description: "업로드 자료에서 자동 정리한 품목입니다. 기존 거래처명과 품목별 단가는 기본적으로 공개하지 않습니다.",
    attachment_note: job.original_file_name,
    previous_amount: includeTotal ? job.detected_total_amount : 0,
    input_method: job.source_type === "text" ? "text" : job.source_type === "photo" ? "photo" : "invoice",
    original_text_input: job.original_text_input,
    template_name: "",
    previous_request_id: "",
    urgent: false,
    preferred_delivery_time: "오전 납품 선호",
    budget_min: 0,
    budget_max: includeTotal ? job.detected_total_amount : 0,
    preferred_brand: "",
    allow_alternatives: true,
    include_delivery_fee: true,
    items: selectedItems.map((itemEntry) => ({
      item_name: itemEntry.item_name,
      spec: itemEntry.spec,
      quantity: itemEntry.quantity,
      unit: itemEntry.unit,
      memo: includeItemPrices && itemEntry.total_price ? `${itemEntry.memo} 기존 금액 ${itemEntry.total_price.toLocaleString("ko-KR")}원`.trim() : itemEntry.memo,
      is_required: true,
      allow_alternative: true,
      confidence_score: itemEntry.confidence_score,
      needs_review: itemEntry.review_status === "needs_review",
      review_reason: itemEntry.review_reason,
    })),
    attachments: [
      {
        file_name: job.original_file_name,
        file_type: job.original_file_type,
        analysis_status: "analyzed",
        extracted_text: job.original_text_input,
        extracted_items_json: JSON.stringify({ analysisId, disclosure_scope: options.disclosure_scope }),
      },
    ],
  });
  const convertedAt = new Date().toISOString();
  const nextData: AppData = {
    ...result.data,
    analysis_conversions: [analysisConversion(`analysis-conversion-${Date.now()}`, analysisId, "quote_request", result.requestId, convertedAt), ...result.data.analysis_conversions],
  };
  saveData(nextData);
  return { data: nextData, requestId: result.requestId };
}

export function convertAnalysisToPurchaseRecord(
  data: AppData,
  analysisId: string,
  options: {
    accounting_category: string;
    tax_invoice_status: TaxInvoiceStatus;
    payment_method: PaymentMethod;
  },
): { data: AppData; purchaseId: string } {
  const job = data.analysis_jobs.find((entry) => entry.id === analysisId);
  if (!job) return { data, purchaseId: "" };
  const selectedItems = data.analysis_items.filter((itemEntry) => itemEntry.analysis_job_id === analysisId && itemEntry.review_status !== "excluded");
  const result = createManualPurchaseRecord(data, {
    purchase_title: `${job.detected_supplier_name || analysisSourceTypeLabels[job.source_type]} 구매내역`,
    supplier_name: job.detected_supplier_name || "분석 자료 거래처",
    supplier_business_number: job.detected_business_number || "000-00-00000",
    purchase_date: job.detected_transaction_date || todayLikeDate(new Date().toISOString()),
    category_name: job.detected_category || "기타",
    accounting_category: options.accounting_category || getAccountingCategory(job.detected_category || "기타"),
    sub_category: selectedItems[0]?.item_name ?? "",
    total_amount: job.detected_total_amount || selectedItems.reduce((sum, itemEntry) => sum + itemEntry.total_price, 0),
    supply_amount: job.detected_supply_amount,
    vat_amount: job.detected_vat_amount,
    delivery_fee: job.detected_delivery_fee,
    discount_amount: 0,
    payment_method: options.payment_method,
    tax_invoice_status: options.tax_invoice_status,
    receipt_status: job.source_type === "receipt" ? "uploaded" : "none",
    delivery_note_status: job.source_type === "invoice" || job.source_type === "delivery_note" ? "uploaded" : "none",
    memo: "분석 결과에서 구매내역으로 저장했습니다. 오늘장사 장부 반영 전 검토 대상입니다.",
    items: selectedItems.map((itemEntry) => ({
      item_name: itemEntry.item_name,
      spec: itemEntry.spec,
      quantity: itemEntry.quantity,
      unit: itemEntry.unit,
      unit_price: itemEntry.unit_price,
      total_price: itemEntry.total_price,
      memo: itemEntry.review_reason || itemEntry.memo,
    })),
  });
  const convertedAt = new Date().toISOString();
  let nextData = updatePurchaseRecord(result.data, result.purchaseId, {
    accounting_status: "reviewed",
    admin_memo: "분석 결과 변환. 장부 반영 준비 완료",
  });
  nextData = {
    ...nextData,
    analysis_conversions: [analysisConversion(`analysis-conversion-${Date.now()}`, analysisId, "purchase_record", result.purchaseId, convertedAt), ...nextData.analysis_conversions],
  };
  saveData(nextData);
  return { data: nextData, purchaseId: result.purchaseId };
}

export function createNotification(
  data: AppData,
  input: Omit<Notification, "id" | "is_read" | "read_at" | "is_archived" | "created_at"> & { actor_user_id?: string },
): AppData {
  const nextData = appendNotification(data, input);
  saveData(nextData);
  return nextData;
}

export function createNotificationEvent(
  data: AppData,
  input: Omit<NotificationEvent, "id" | "created_at" | "processed_at" | "delivery_status" | "delivery_channels_json"> & {
    payload?: Record<string, unknown>;
    delivery_status?: NotificationDeliveryStatus;
  },
): AppData {
  const createdAt = new Date().toISOString();
  const nextData: AppData = {
    ...data,
    notification_events: [
      notificationEvent(
        `nevent-${Date.now()}`,
        input.event_type,
        input.actor_user_id,
        input.target_user_id,
        input.target_role,
        input.related_entity_type,
        input.related_entity_id,
        input.payload ?? {},
        input.delivery_status ?? "pending",
        createdAt,
      ),
      ...data.notification_events,
    ],
  };
  saveData(nextData);
  return nextData;
}

export function markNotificationAsRead(data: AppData, notificationId: string): AppData {
  const readAt = new Date().toISOString();
  const nextData: AppData = {
    ...data,
    notifications: data.notifications.map((entry) =>
      entry.id === notificationId ? { ...entry, is_read: true, read_at: readAt } : entry,
    ),
  };
  saveData(nextData);
  return nextData;
}

export function markAllNotificationsAsRead(data: AppData, userId: string): AppData {
  const readAt = new Date().toISOString();
  const nextData: AppData = {
    ...data,
    notifications: data.notifications.map((entry) =>
      entry.user_id === userId && !entry.is_archived ? { ...entry, is_read: true, read_at: entry.read_at ?? readAt } : entry,
    ),
  };
  saveData(nextData);
  return nextData;
}

export function archiveNotification(data: AppData, notificationId: string): AppData {
  const nextData: AppData = {
    ...data,
    notifications: data.notifications.map((entry) => (entry.id === notificationId ? { ...entry, is_archived: true } : entry)),
  };
  saveData(nextData);
  return nextData;
}

export function getUnreadNotificationCount(data: AppData, userId: string) {
  return data.notifications.filter((entry) => entry.user_id === userId && !entry.is_read && !entry.is_archived).length;
}

export function getNotificationsForUser(data: AppData, userId: string) {
  return data.notifications
    .filter((entry) => entry.user_id === userId && !entry.is_archived)
    .sort((a, b) => b.created_at.localeCompare(a.created_at));
}

export function updateNotificationSettings(data: AppData, userId: string, patch: Partial<NotificationSettings>): AppData {
  const updatedAt = new Date().toISOString();
  const existing = data.notification_settings.find((entry) => entry.user_id === userId);
  const nextSettings = existing
    ? data.notification_settings.map((entry) => (entry.user_id === userId ? { ...entry, ...patch, updated_at: updatedAt } : entry))
    : [notificationSettings(`nsetting-${userId}`, userId), ...data.notification_settings];
  const nextData: AppData = {
    ...data,
    notification_settings: nextSettings.map((entry) => (entry.user_id === userId ? { ...entry, ...patch, updated_at: updatedAt } : entry)),
  };
  saveData(nextData);
  return nextData;
}

export const todayNotificationAudienceLabels: Record<TodayNotificationAudience, string> = {
  buyer: "구매자",
  supplier: "공급업체",
  admin: "관리자",
};

export const todayNotificationStatusLabels: Record<TodayNotificationStatus, string> = {
  unread: "읽지 않음",
  read: "읽음",
  done: "완료",
  dismissed: "숨김",
};

export const todayNotificationCategoryLabels: Record<TodayNotificationCategory, string> = {
  tax: "세무자료",
  evidence: "증빙",
  category: "카테고리",
  cost: "원가",
  requote: "재견적",
  upload: "업로드",
  ai: "AI",
  sync: "연동",
  quote: "견적",
  deal: "거래",
  settlement: "정산",
  security: "보안",
  env: "환경",
  feedback: "피드백",
};

export const todayBacklogStatusLabels: Record<TodayBacklogStatus, string> = {
  new: "신규",
  triaged: "분류됨",
  planned: "계획",
  in_progress: "진행",
  done: "완료",
  wont_do: "보류",
};

export function getTodayNotifications(data: AppData, audience: TodayNotificationAudience, userId: string) {
  return data.today_notifications
    .filter((entry) => entry.audience === audience && entry.user_id === userId)
    .sort((a, b) => b.created_at.localeCompare(a.created_at));
}

export function getTodayUnreadNotificationCount(data: AppData, audience: TodayNotificationAudience, userId: string) {
  return getTodayNotifications(data, audience, userId).filter((entry) => entry.status === "unread").length;
}

export function updateTodayNotificationStatus(data: AppData, notificationId: string, status: TodayNotificationStatus): AppData {
  const updatedAt = new Date().toISOString();
  const nextData: AppData = {
    ...data,
    today_notifications: data.today_notifications.map((entry) =>
      entry.id === notificationId
        ? {
            ...entry,
            status,
            read_at: status === "read" || status === "done" ? entry.read_at ?? updatedAt : entry.read_at,
            completed_at: status === "done" ? updatedAt : entry.completed_at,
            dismissed_at: status === "dismissed" ? updatedAt : entry.dismissed_at,
          }
        : entry,
    ),
  };
  saveData(nextData);
  return nextData;
}

export function markAllTodayNotificationsRead(data: AppData, audience: TodayNotificationAudience, userId: string): AppData {
  const readAt = new Date().toISOString();
  const nextData: AppData = {
    ...data,
    today_notifications: data.today_notifications.map((entry) =>
      entry.audience === audience && entry.user_id === userId && entry.status === "unread"
        ? { ...entry, status: "read", read_at: readAt }
        : entry,
    ),
  };
  saveData(nextData);
  return nextData;
}

export function updateTodayNotificationPreference(data: AppData, preferenceId: string, patch: Partial<TodayNotificationPreference>): AppData {
  const updatedAt = new Date().toISOString();
  const nextData: AppData = {
    ...data,
    today_notification_preferences: data.today_notification_preferences.map((entry) =>
      entry.id === preferenceId ? { ...entry, ...patch, updated_at: updatedAt } : entry,
    ),
  };
  saveData(nextData);
  return nextData;
}

export function updateTodayOnboardingProgress(data: AppData, audience: TodayNotificationAudience, userId: string, stepId: string): AppData {
  const updatedAt = new Date().toISOString();
  const existing = data.today_onboarding_progress.find((entry) => entry.audience === audience && entry.user_id === userId);
  const completed = existing?.completed_step_ids.includes(stepId)
    ? existing.completed_step_ids.filter((id) => id !== stepId)
    : [...(existing?.completed_step_ids ?? []), stepId];
  const nextProgress: TodayOnboardingProgress = {
    id: existing?.id ?? localId("today-onboarding"),
    audience,
    user_id: userId,
    completed_step_ids: completed,
    dismissed_guide_ids: existing?.dismissed_guide_ids ?? [],
    last_opened_at: updatedAt,
    completed_at: completed.length >= (audience === "admin" ? 4 : 3) ? updatedAt : undefined,
    updated_at: updatedAt,
  };
  const nextData: AppData = {
    ...data,
    today_onboarding_progress: existing
      ? data.today_onboarding_progress.map((entry) => (entry.id === existing.id ? nextProgress : entry))
      : [nextProgress, ...data.today_onboarding_progress],
  };
  saveData(nextData);
  return nextData;
}

export function dismissTodayGuide(data: AppData, audience: TodayNotificationAudience, userId: string, guideId: string): AppData {
  const updatedAt = new Date().toISOString();
  const existing = data.today_onboarding_progress.find((entry) => entry.audience === audience && entry.user_id === userId);
  const dismissed = Array.from(new Set([...(existing?.dismissed_guide_ids ?? []), guideId]));
  const nextProgress: TodayOnboardingProgress = {
    id: existing?.id ?? localId("today-onboarding"),
    audience,
    user_id: userId,
    completed_step_ids: existing?.completed_step_ids ?? [],
    dismissed_guide_ids: dismissed,
    last_opened_at: updatedAt,
    completed_at: existing?.completed_at,
    updated_at: updatedAt,
  };
  const nextData: AppData = {
    ...data,
    today_onboarding_progress: existing
      ? data.today_onboarding_progress.map((entry) => (entry.id === existing.id ? nextProgress : entry))
      : [nextProgress, ...data.today_onboarding_progress],
  };
  saveData(nextData);
  return nextData;
}

export function createTodayBetaApplication(data: AppData, input: Omit<TodayBetaApplication, "id" | "status" | "created_at" | "updated_at">): AppData {
  const createdAt = new Date().toISOString();
  const nextData: AppData = {
    ...data,
    today_beta_applications: [{
      ...input,
      id: localId("today-beta-apply"),
      status: "submitted",
      created_at: createdAt,
      updated_at: createdAt,
    }, ...data.today_beta_applications],
  };
  saveData(nextData);
  return nextData;
}

export function createTodaySupportTicket(data: AppData, input: Omit<TodaySupportTicket, "id" | "status" | "created_at" | "updated_at">): AppData {
  const createdAt = new Date().toISOString();
  const nextData: AppData = {
    ...data,
    today_support_tickets: [{
      ...input,
      id: localId("today-support"),
      status: "open",
      created_at: createdAt,
      updated_at: createdAt,
    }, ...data.today_support_tickets],
  };
  saveData(nextData);
  return nextData;
}

export function trackTodayProductEvent(data: AppData, input: { user_id?: string; user_role: TodayProductEvent["user_role"]; event_name: TodayProductEventName; page_url: string; metadata?: Record<string, unknown> }): AppData {
  const safeMetadata = Object.fromEntries(
    Object.entries(input.metadata ?? {}).filter(([key]) => !/phone|email|token|key|secret|password/i.test(key)),
  );
  const nextData: AppData = {
    ...data,
    today_product_events: [{
      id: localId("today-event"),
      user_id: input.user_id,
      user_role: input.user_role,
      event_name: input.event_name,
      page_url: input.page_url,
      metadata_json: JSON.stringify(safeMetadata),
      created_at: new Date().toISOString(),
    }, ...data.today_product_events],
  };
  saveData(nextData);
  return nextData;
}

export function createTodayBetaSurveyResponse(data: AppData, input: Omit<TodayBetaSurveyResponse, "id" | "created_at">): AppData {
  const createdAt = new Date().toISOString();
  const surveyId = localId("today-survey");
  const priority = Math.max(1, Math.round((6 - input.score) + (10 - input.nps_score) / 2));
  const nextData: AppData = {
    ...data,
    today_beta_survey_responses: [{ ...input, id: surveyId, created_at: createdAt }, ...data.today_beta_survey_responses],
    today_beta_backlog: [{
      id: localId("today-backlog"),
      source_type: "survey",
      source_id: surveyId,
      title: input.pain_point ? `${input.pain_point} 개선 요청` : "베타 피드백 개선 요청",
      description: input.comment,
      user_segment: input.user_role,
      impact_score: priority,
      effort_score: 2,
      priority_score: priority * 2,
      status: "new",
      owner: "product",
      created_at: createdAt,
      updated_at: createdAt,
    }, ...data.today_beta_backlog],
  };
  saveData(nextData);
  return nextData;
}

export function updateTodayBacklogItem(data: AppData, backlogId: string, patch: Partial<Pick<TodayBetaBacklogItem, "status" | "owner">>): AppData {
  const updatedAt = new Date().toISOString();
  const nextData: AppData = {
    ...data,
    today_beta_backlog: data.today_beta_backlog.map((entry) => (entry.id === backlogId ? { ...entry, ...patch, updated_at: updatedAt } : entry)),
  };
  saveData(nextData);
  return nextData;
}

export function updateTodayLaunchChecklist(data: AppData, itemId: string, status: TodayLaunchChecklistItem["status"]): AppData {
  const updatedAt = new Date().toISOString();
  const nextData: AppData = {
    ...data,
    today_launch_checklist: data.today_launch_checklist.map((entry) => (entry.id === itemId ? { ...entry, status, updated_at: updatedAt } : entry)),
  };
  saveData(nextData);
  return nextData;
}

export function calculateCommissionAmount(finalAmount: number, rate: number, minFee = 0, maxFee = 0, fixedFee = 0) {
  const percentageFee = Math.round(Number(finalAmount) * Number(rate));
  const withFixed = percentageFee + Number(fixedFee || 0);
  const minApplied = Math.max(Number(minFee || 0), withFixed);
  return Number(maxFee || 0) > 0 ? Math.min(Number(maxFee), minApplied) : minApplied;
}

export function calculatePlatformFee(dealRecord: Deal, policy: CommissionPolicy) {
  const feeAmount = calculateCommissionAmount(dealRecord.final_amount, policy.commission_rate, policy.min_fee_amount, policy.max_fee_amount, policy.fixed_fee_amount);
  const vatAmount = policy.vat_policy === "vat_excluded" ? Math.round(feeAmount * 0.1) : policy.vat_policy === "vat_included" ? Math.round(feeAmount / 11) : 0;
  const totalFeeAmount = policy.vat_policy === "vat_excluded" ? feeAmount + vatAmount : feeAmount;
  return {
    fee_amount: feeAmount,
    vat_amount: vatAmount,
    total_fee_amount: totalFeeAmount,
  };
}

export function getCommissionPolicyForCategory(data: AppData, categoryName: string) {
  return data.commission_policies.find((policy) => policy.category_name === categoryName && policy.is_active)
    ?? data.commission_policies.find((policy) => policy.category_name === "기타" && policy.is_active)
    ?? sampleCommissionPolicies[sampleCommissionPolicies.length - 1];
}

export function updateCommissionPolicy(data: AppData, policyId: string, patch: Partial<CommissionPolicy>): AppData {
  const updatedAt = new Date().toISOString();
  const nextData: AppData = {
    ...data,
    commission_policies: data.commission_policies.map((policy) => (policy.id === policyId ? { ...policy, ...patch, updated_at: updatedAt } : policy)),
  };
  saveData(nextData);
  return nextData;
}

export function getSupplierSubscription(data: AppData, supplierId: string) {
  return data.supplier_subscriptions.find((entry) => entry.supplier_id === supplierId)
    ?? supplierSubscription(`sub-${supplierId}-free`, supplierId, "plan-free", "free", "", "");
}

export function getSupplierCurrentPlan(data: AppData, supplierId: string) {
  const subscription = getSupplierSubscription(data, supplierId);
  return data.supplier_plans.find((plan) => plan.id === subscription.plan_id)
    ?? data.supplier_plans.find((plan) => plan.code === "free")
    ?? sampleSupplierPlans[0];
}

export function getSupplierUsageForCurrentPeriod(data: AppData, supplierId: string) {
  return data.supplier_usage.find((usage) => usage.supplier_id === supplierId)
    ?? supplierUsage(`usage-${supplierId}`, supplierId, 0, 0, 0, 0, data.deals.filter((dealRecord) => dealRecord.supplier_id === supplierId).reduce((sum, dealRecord) => sum + dealRecord.final_amount, 0));
}

export function getRemainingQuoteLimit(data: AppData, supplierId: string) {
  const plan = getSupplierCurrentPlan(data, supplierId);
  const usage = getSupplierUsageForCurrentPeriod(data, supplierId);
  if (plan.quote_participation_limit <= 0) return Infinity;
  return Math.max(0, plan.quote_participation_limit - usage.quotes_submitted_count);
}

export function canSubmitQuoteByPlan(data: AppData, supplierId: string) {
  const plan = getSupplierCurrentPlan(data, supplierId);
  const usage = getSupplierUsageForCurrentPeriod(data, supplierId);
  const remaining = getRemainingQuoteLimit(data, supplierId);
  return {
    allowed: plan.quote_participation_limit <= 0 || remaining > 0,
    plan,
    usage,
    remaining,
    limit: plan.quote_participation_limit,
  };
}

export function getSupplierUsageSummary(data: AppData, supplierId: string) {
  const usage = getSupplierUsageForCurrentPeriod(data, supplierId);
  const plan = getSupplierCurrentPlan(data, supplierId);
  const fees = data.platform_fees.filter((fee) => fee.supplier_id === supplierId && fee.fee_status !== "cancelled");
  const expectedFees = fees.filter((fee) => fee.fee_status !== "paid" && fee.fee_status !== "waived").reduce((sum, fee) => sum + fee.fee_amount, 0);
  const remaining = getRemainingQuoteLimit(data, supplierId);
  return {
    plan,
    usage,
    remaining,
    quoteLimit: plan.quote_participation_limit,
    expectedPlatformFees: expectedFees,
    wonDeals: data.deals.filter((dealRecord) => dealRecord.supplier_id === supplierId && ["confirmed", "preparing", "delivering", "delivered", "completed"].includes(dealRecord.status)).length,
  };
}

export function updateSupplierSubscriptionPlan(data: AppData, supplierId: string, planId: string, changedBy = "admin-1"): AppData {
  const updatedAt = new Date().toISOString();
  const existing = data.supplier_subscriptions.find((entry) => entry.supplier_id === supplierId);
  const plan = data.supplier_plans.find((entry) => entry.id === planId) ?? sampleSupplierPlans[0];
  let nextData: AppData = {
    ...data,
    supplier_subscriptions: existing
      ? data.supplier_subscriptions.map((entry) => entry.supplier_id === supplierId ? { ...entry, plan_id: plan.id, status: plan.monthly_price > 0 ? "active" : "free", updated_at: updatedAt } : entry)
      : [supplierSubscription(`sub-${supplierId}-${Date.now()}`, supplierId, plan.id, plan.monthly_price > 0 ? "active" : "free", "mock-pg", ""), ...data.supplier_subscriptions],
  };
  nextData = appendNotification(nextData, {
    user_id: supplierUserId(supplierId),
    user_role: "supplier",
    type: "plan_changed",
    title: "요금제가 변경되었습니다.",
    body: `${plan.name} 플랜이 적용되었습니다. 이번 달 견적 참여 한도를 확인해 주세요.`,
    link_url: "/app/supplier/billing",
    related_entity_type: "supplier_plan",
    related_entity_id: plan.id,
    priority: "normal",
    actor_user_id: changedBy,
  });
  saveData(nextData);
  return nextData;
}

export function updateSupplierPlan(data: AppData, planId: string, patch: Partial<SupplierPlan>): AppData {
  const updatedAt = new Date().toISOString();
  const nextData: AppData = {
    ...data,
    supplier_plans: data.supplier_plans.map((plan) => (plan.id === planId ? { ...plan, ...patch, updated_at: updatedAt } : plan)),
  };
  saveData(nextData);
  return nextData;
}

export function updateBillingAccount(data: AppData, supplierId: string, patch: Partial<BillingAccount>): AppData {
  const updatedAt = new Date().toISOString();
  const existing = data.billing_accounts.find((entry) => entry.supplier_id === supplierId);
  const fallbackSupplier = data.supplier_profiles.find((supplier) => supplier.id === supplierId);
  const created = billingAccount(
    `ba-${supplierId}-${Date.now()}`,
    supplierId,
    fallbackSupplier?.email ?? "",
    fallbackSupplier?.business_number ?? "",
    fallbackSupplier?.manager_name ?? fallbackSupplier?.representative_name ?? "",
    fallbackSupplier?.manager_phone ?? fallbackSupplier?.phone ?? "",
    fallbackSupplier?.email ?? "",
    "none",
    "none",
    "",
  );
  const nextData: AppData = {
    ...data,
    billing_accounts: existing
      ? data.billing_accounts.map((entry) => entry.supplier_id === supplierId ? { ...entry, ...patch, updated_at: updatedAt } : entry)
      : [{ ...created, ...patch, updated_at: updatedAt }, ...data.billing_accounts],
  };
  saveData(nextData);
  return nextData;
}

export function getPlatformFeesBySupplier(data: AppData, supplierId: string) {
  return data.platform_fees.filter((fee) => fee.supplier_id === supplierId).sort((a, b) => b.created_at.localeCompare(a.created_at));
}

export function getSupplierSettlements(data: AppData, supplierId: string) {
  return data.settlements.filter((entry) => entry.supplier_id === supplierId).sort((a, b) => b.period_start.localeCompare(a.period_start));
}

export function updatePlatformFeeStatus(data: AppData, feeId: string, status: PlatformFeeStatus): AppData {
  const updatedAt = new Date().toISOString();
  const nextData: AppData = {
    ...data,
    platform_fees: data.platform_fees.map((fee) => (fee.id === feeId ? { ...fee, fee_status: status, updated_at: updatedAt } : fee)),
  };
  saveData(nextData);
  return nextData;
}

export function waivePlatformFee(data: AppData, feeId: string, reason: string, adminId = "admin-1"): AppData {
  const updatedAt = new Date().toISOString();
  const fee = data.platform_fees.find((entry) => entry.id === feeId);
  if (!fee) return data;
  const nextFee = { ...fee, fee_amount: 0, vat_amount: 0, total_fee_amount: 0, fee_status: "waived" as const, is_waived: true, waiver_reason: reason, waived_by_admin_id: adminId, waived_at: updatedAt, updated_at: updatedAt };
  let nextData: AppData = {
    ...data,
    platform_fees: data.platform_fees.map((entry) => (entry.id === feeId ? nextFee : entry)),
    settlement_items: data.settlement_items.map((item) => item.platform_fee_id === feeId ? { ...item, fee_amount: 0, vat_amount: 0, settlement_amount: item.deal_final_amount } : item),
    billing_events: [billingEvent(`bevent-${Date.now()}`, "platform_fee_waived", fee.supplier_id, fee.deal_id, "", fee.total_fee_amount, "waived", { fee_id: feeId, reason }), ...data.billing_events],
  };
  nextData = recalculateSettlementTotals(nextData, fee.settlement_id);
  nextData = appendNotification(nextData, {
    user_id: adminUserId(nextData),
    user_role: "admin",
    type: "platform_fee_waived",
    title: "수수료 면제 처리가 완료되었습니다.",
    body: `${supplierNameFromId(nextData, fee.supplier_id)} 수수료가 면제 처리되었습니다.`,
    link_url: "/app/admin/settlements",
    related_entity_type: "platform_fee",
    related_entity_id: feeId,
    priority: "normal",
    actor_user_id: adminId,
  });
  saveData(nextData);
  return nextData;
}

export function updateSettlementStatus(data: AppData, settlementId: string, status: SettlementStatus): AppData {
  const updatedAt = new Date().toISOString();
  const nextData: AppData = {
    ...data,
    settlements: data.settlements.map((settlementEntry) => settlementEntry.id === settlementId ? { ...settlementEntry, status, paid_at: status === "paid" ? updatedAt : settlementEntry.paid_at, updated_at: updatedAt } : settlementEntry),
  };
  saveData(nextData);
  return nextData;
}

export function getRevenueSummary(data: AppData) {
  const completedDeals = data.deals.filter((dealRecord) => dealRecord.status === "completed" || data.platform_fees.some((fee) => fee.deal_id === dealRecord.id));
  const activeFees = data.platform_fees.filter((fee) => fee.fee_status !== "cancelled");
  const paidFees = activeFees.filter((fee) => fee.fee_status === "paid");
  const unpaidFees = activeFees.filter((fee) => !["paid", "waived"].includes(fee.fee_status));
  const activeSubscriptions = data.supplier_subscriptions.filter((subscription) => ["active", "trial"].includes(subscription.status));
  const monthlySubscriptionRevenue = activeSubscriptions.reduce((sum, subscription) => sum + (data.supplier_plans.find((plan) => plan.id === subscription.plan_id)?.monthly_price ?? 0), 0);
  const expectedPlatformFees = unpaidFees.reduce((sum, fee) => sum + fee.fee_amount, 0);
  const confirmedPlatformFees = activeFees.filter((fee) => ["confirmed", "invoiced", "paid"].includes(fee.fee_status)).reduce((sum, fee) => sum + fee.fee_amount, 0);
  return {
    totalDealAmount: data.deals.reduce((sum, dealRecord) => sum + dealRecord.final_amount, 0),
    completedDealAmount: completedDeals.reduce((sum, dealRecord) => sum + dealRecord.final_amount, 0),
    expectedPlatformFees,
    confirmedPlatformFees,
    paidPlatformFees: paidFees.reduce((sum, fee) => sum + fee.fee_amount, 0),
    pendingPlatformFees: unpaidFees.reduce((sum, fee) => sum + fee.fee_amount, 0),
    paidSupplierCount: activeSubscriptions.filter((subscription) => (data.supplier_plans.find((plan) => plan.id === subscription.plan_id)?.monthly_price ?? 0) > 0).length,
    monthlySubscriptionRevenue,
    totalExpectedRevenue: expectedPlatformFees + monthlySubscriptionRevenue,
  };
}

export function getCategoryRevenueBreakdown(data: AppData) {
  return Object.entries(
    data.platform_fees.reduce<Record<string, { label: string; value: number; amount: number }>>((acc, fee) => {
      const key = fee.category_name || "기타";
      acc[key] = acc[key] ?? { label: key, value: 0, amount: 0 };
      acc[key].value += fee.fee_amount;
      acc[key].amount += fee.deal_final_amount;
      return acc;
    }, {}),
  ).map(([, entry]) => entry).sort((a, b) => b.value - a.value);
}

export function getSupplierRevenueRanking(data: AppData) {
  return Object.entries(
    data.platform_fees.reduce<Record<string, { label: string; value: number; amount: number }>>((acc, fee) => {
      const label = supplierNameFromId(data, fee.supplier_id);
      acc[fee.supplier_id] = acc[fee.supplier_id] ?? { label, value: 0, amount: 0 };
      acc[fee.supplier_id].value += fee.fee_amount;
      acc[fee.supplier_id].amount += fee.deal_final_amount;
      return acc;
    }, {}),
  ).map(([, entry]) => entry).sort((a, b) => b.value - a.value).slice(0, 10);
}

export function getMonthlyRevenueTrend(data: AppData) {
  return Object.entries(
    data.platform_fees.reduce<Record<string, { label: string; value: number; amount: number }>>((acc, fee) => {
      const key = fee.created_at.slice(0, 7);
      acc[key] = acc[key] ?? { label: key, value: 0, amount: 0 };
      acc[key].value += fee.fee_amount;
      acc[key].amount += fee.deal_final_amount;
      return acc;
    }, {}),
  ).map(([, entry]) => entry).sort((a, b) => a.label.localeCompare(b.label));
}

export function getSupplierGrade(score: number): SupplierGrade {
  if (score >= 90) return "excellent";
  if (score >= 80) return "trusted";
  if (score >= 70) return "standard";
  if (score >= 60) return "watch";
  return "review";
}

export function getSupplierRiskLevel(score: number, disputeCount = 0, activeSanctions = 0): "low" | "medium" | "high" {
  if (score < 60 || disputeCount >= 3 || activeSanctions >= 2) return "high";
  if (score < 80 || disputeCount >= 1 || activeSanctions >= 1) return "medium";
  return "low";
}

export function calculateSupplierReputationScore(data: AppData, supplierId: string): SupplierReputationScore {
  const supplier = data.supplier_profiles.find((entry) => entry.id === supplierId);
  const stats = data.supplier_stats.find((entry) => entry.supplier_id === supplierId);
  const documents = data.supplier_documents.filter((document) => document.supplier_id === supplierId);
  const reviews = data.reviews.filter((entry) => entry.supplier_id === supplierId && entry.status === "active");
  const reports = data.reports.filter((entry) => entry.target_user_id === supplierUserId(supplierId) && !["dismissed", "cancelled"].includes(entry.status));
  const activeSanctions = data.user_sanctions.filter((entry) => entry.user_id === supplierUserId(supplierId) && entry.status === "active").length;
  const supplierDeals = data.deals.filter((dealRecord) => dealRecord.supplier_id === supplierId);
  const completedDeals = supplierDeals.filter((dealRecord) => ["completed", "closed"].includes(dealRecord.status)).length;
  const cancelledDeals = supplierDeals.filter((dealRecord) => dealRecord.status.includes("cancelled")).length;
  const averageReview = reviews.length ? reviews.reduce((sum, entry) => sum + entry.rating_overall, 0) / reviews.length : stats?.rating ?? 0;
  const verificationScore = supplier?.approval_status === "approved" && documents.some((document) => document.status === "approved") ? 15 : supplier?.approval_status === "approved" ? 10 : 3;
  const responseScore = Math.round(Math.min(20, Math.max(0, ((stats?.response_rate ?? 0) / 100) * 20)));
  const responseTimeScore = Math.round(Math.max(0, 10 - Math.min(10, ((stats?.average_response_minutes ?? 120) / 120) * 10)));
  const completionScore = supplierDeals.length ? Math.round((completedDeals / supplierDeals.length) * 20) : Math.min(20, Math.round(((stats?.selected_quotes_count ?? 0) / Math.max(1, stats?.total_quotes_submitted ?? 1)) * 20));
  const reviewScore = Math.round(Math.min(20, Math.max(0, (averageReview / 5) * 20)));
  const disputeScore = Math.max(0, 10 - reports.length * 5 - activeSanctions * 3);
  const repeatScore = Math.round(Math.min(5, ((stats?.repeat_customer_rate ?? 0) / 100) * 5));
  const cancellationPenalty = supplierDeals.length ? Math.min(15, Math.round((cancelledDeals / supplierDeals.length) * 15)) : 0;
  const totalScore = Math.max(0, Math.min(100, verificationScore + responseScore + responseTimeScore + completionScore + reviewScore + disputeScore + repeatScore - cancellationPenalty));
  const badges = getSupplierBadges(data, supplierId, totalScore, averageReview);
  return {
    id: data.supplier_reputation_scores.find((entry) => entry.supplier_id === supplierId)?.id ?? `rep-${supplierId}`,
    supplier_id: supplierId,
    total_score: totalScore,
    response_score: responseScore + responseTimeScore,
    completion_score: completionScore,
    review_score: reviewScore,
    dispute_score: disputeScore,
    verification_score: verificationScore,
    repeat_score: repeatScore,
    grade: getSupplierGrade(totalScore),
    badges,
    risk_level: getSupplierRiskLevel(totalScore, reports.length, activeSanctions),
    updated_at: new Date().toISOString(),
  };
}

export function getSupplierReputation(data: AppData, supplierId: string) {
  return data.supplier_reputation_scores.find((entry) => entry.supplier_id === supplierId) ?? calculateSupplierReputationScore(data, supplierId);
}

export function getSupplierBadges(data: AppData, supplierId: string, score = getSupplierReputation(data, supplierId).total_score, averageReview?: number) {
  const supplier = data.supplier_profiles.find((entry) => entry.id === supplierId);
  const stats = data.supplier_stats.find((entry) => entry.supplier_id === supplierId);
  const reviews = data.reviews.filter((entry) => entry.supplier_id === supplierId && entry.status === "active");
  const rating = averageReview ?? (reviews.length ? reviews.reduce((sum, entry) => sum + entry.rating_overall, 0) / reviews.length : stats?.rating ?? 0);
  const badges = new Set<string>();
  if (supplier?.approval_status === "approved") badges.add("승인업체");
  if ((stats?.response_rate ?? 0) >= 85) badges.add("빠른응답");
  if ((stats?.selected_quotes_count ?? 0) >= 7) badges.add("거래완료 우수");
  if (rating >= 4.7) badges.add("후기 우수");
  if (supplier?.tax_invoice_available) badges.add("세금계산서 가능");
  if (supplier?.card_payment_available) badges.add("카드결제 가능");
  if (supplier?.urgent_delivery_available) badges.add("긴급배송 가능");
  if ((stats?.repeat_customer_rate ?? 0) >= 50) badges.add("재거래 많은 업체");
  if ((stats?.total_quotes_submitted ?? 0) === 0) badges.add("신규업체");
  if (score >= 90) badges.add("우수 파트너");
  return Array.from(badges);
}

export function recalculateSupplierReputation(data: AppData, supplierId: string): AppData {
  const updatedScore = calculateSupplierReputationScore(data, supplierId);
  let nextData: AppData = {
    ...data,
    supplier_reputation_scores: data.supplier_reputation_scores.some((entry) => entry.supplier_id === supplierId)
      ? data.supplier_reputation_scores.map((entry) => (entry.supplier_id === supplierId ? updatedScore : entry))
      : [updatedScore, ...data.supplier_reputation_scores],
  };
  nextData = appendNotification(nextData, {
    user_id: supplierUserId(supplierId),
    user_role: "supplier",
    type: "reputation_score_updated",
    title: "신뢰도 점수가 업데이트되었습니다.",
    body: `현재 신뢰도 점수는 ${updatedScore.total_score}점입니다.`,
    link_url: "/app/supplier/reputation",
    related_entity_type: "reputation",
    related_entity_id: updatedScore.id,
    priority: updatedScore.total_score < 70 ? "high" : "normal",
    actor_user_id: "system",
  });
  if (updatedScore.total_score < 70) {
    nextData = appendNotification(nextData, {
      user_id: adminUserId(nextData),
      user_role: "admin",
      type: "low_reputation_supplier_detected",
      title: "신뢰도 낮은 공급업체가 감지되었습니다.",
      body: `${supplierNameFromId(nextData, supplierId)} 신뢰도 점수가 ${updatedScore.total_score}점입니다.`,
      link_url: "/app/admin/reputation",
      related_entity_type: "reputation",
      related_entity_id: updatedScore.id,
      priority: "high",
      actor_user_id: "system",
    });
  }
  saveData(nextData);
  return nextData;
}

function recalculateSupplierReputationWithoutSaving(data: AppData, supplierId: string): AppData {
  const updatedScore = calculateSupplierReputationScore(data, supplierId);
  return {
    ...data,
    supplier_reputation_scores: data.supplier_reputation_scores.some((entry) => entry.supplier_id === supplierId)
      ? data.supplier_reputation_scores.map((entry) => (entry.supplier_id === supplierId ? updatedScore : entry))
      : [updatedScore, ...data.supplier_reputation_scores],
  };
}

function updateSupplierStatsAfterReview(data: AppData, supplierId: string): AppData {
  const activeReviews = data.reviews.filter((entry) => entry.supplier_id === supplierId && entry.status === "active");
  const existing = data.supplier_stats.find((entry) => entry.supplier_id === supplierId);
  const rating = activeReviews.length
    ? Math.round((activeReviews.reduce((sum, entry) => sum + entry.rating_overall, 0) / activeReviews.length) * 10) / 10
    : existing?.rating ?? 0;
  const updatedAt = new Date().toISOString();
  const nextStats = existing
    ? { ...existing, rating, review_count: activeReviews.length, updated_at: updatedAt }
    : supplierStats(`stat-${supplierId}`, supplierId, 0, 0, 0, 0, 0, 0, rating, activeReviews.length);
  return {
    ...data,
    supplier_stats: existing
      ? data.supplier_stats.map((entry) => (entry.supplier_id === supplierId ? nextStats : entry))
      : [nextStats, ...data.supplier_stats],
  };
}

function sanctionToOperationalStatus(type: SanctionType): NonNullable<SupplierProfile["operational_status"]> {
  if (type === "warning") return "warning";
  if (type === "temporary_suspension") return "suspended";
  if (type === "permanent_ban") return "banned";
  return "restricted";
}

export function hasActiveSanction(data: AppData, userId: string, types: SanctionType[] = []) {
  return data.user_sanctions.some((entry) => entry.user_id === userId && entry.status === "active" && (types.length === 0 || types.includes(entry.sanction_type)));
}

export function createReport(
  data: AppData,
  input: {
    reporter_id: string;
    reporter_role: UserRole;
    target_user_id: string;
    target_role: UserRole;
    report_type: ReportType;
    related_entity_type: ReportEntityType;
    related_entity_id: string;
    title: string;
    description: string;
    desired_resolution: string;
    priority: NotificationPriority;
    attachment_name?: string;
  },
): { data: AppData; reportId: string } {
  const createdAt = new Date().toISOString();
  const reportId = `report-${Date.now()}`;
  const reportRecord: Report = {
    id: reportId,
    reporter_id: input.reporter_id,
    reporter_role: input.reporter_role,
    target_user_id: input.target_user_id,
    target_role: input.target_role,
    report_type: input.report_type,
    related_entity_type: input.related_entity_type,
    related_entity_id: input.related_entity_id,
    title: input.title.trim() || reportTypeLabels[input.report_type],
    description: input.description.trim(),
    desired_resolution: input.desired_resolution,
    status: "submitted",
    priority: input.priority,
    admin_assignee_id: adminUserId(data),
    admin_memo: "",
    resolution_summary: "",
    created_at: createdAt,
    updated_at: createdAt,
  };
  const attachment = input.attachment_name?.trim()
    ? reportAttachment(`rattach-${Date.now()}`, reportId, input.attachment_name.trim(), input.attachment_name.split(".").pop() ?? "file", input.reporter_id)
    : null;
  let nextData: AppData = {
    ...data,
    reports: [reportRecord, ...data.reports],
    report_attachments: attachment ? [attachment, ...data.report_attachments] : data.report_attachments,
    report_actions: [reportAction(`raction-${Date.now()}`, reportId, "status_change", "system", "system", "submitted", "submitted", "신고가 접수되었습니다.", createdAt), ...data.report_actions],
    report_comments: input.description.trim() ? [reportComment(`rcomment-${Date.now()}`, reportId, input.reporter_id, input.reporter_role, input.description.trim(), false, createdAt), ...data.report_comments] : data.report_comments,
  };
  if (input.related_entity_type === "deal" && input.report_type !== "message_report") {
    const dealRecord = data.deals.find((deal) => deal.id === input.related_entity_id);
    if (dealRecord && dealRecord.status !== "disputed") {
      nextData = {
        ...nextData,
        deals: nextData.deals.map((deal) => (deal.id === dealRecord.id ? { ...deal, status: "disputed", dispute_reason: reportRecord.title, updated_at: createdAt } : deal)),
        deal_status_logs: [log(`log-report-${Date.now()}`, dealRecord.id, dealRecord.status, "disputed", input.reporter_role === "admin" ? "admin" : input.reporter_role === "supplier" ? "supplier" : "buyer", reportRecord.title), ...nextData.deal_status_logs],
      };
    }
  }
  nextData = appendNotification(nextData, {
    user_id: input.reporter_id,
    user_role: input.reporter_role,
    type: "report_submitted",
    title: "신고가 접수되었습니다.",
    body: `"${reportRecord.title}" 신고를 운영팀이 확인합니다.`,
    link_url: `/app/reports/${reportId}`,
    related_entity_type: "report",
    related_entity_id: reportId,
    priority: "normal",
    actor_user_id: input.reporter_id,
  });
  nextData = appendNotification(nextData, {
    user_id: input.target_user_id,
    user_role: input.target_role,
    type: "report_received",
    title: "관련 신고가 접수되었습니다.",
    body: `"${reportRecord.title}" 건이 운영팀 검토에 들어갔습니다.`,
    link_url: `/app/reports/${reportId}`,
    related_entity_type: "report",
    related_entity_id: reportId,
    priority: input.priority,
    actor_user_id: input.reporter_id,
  });
  nextData = appendNotification(nextData, {
    user_id: adminUserId(nextData),
    user_role: "admin",
    type: input.priority === "urgent" ? "urgent_report_submitted" : "new_report_submitted",
    title: input.priority === "urgent" ? "긴급 신고가 접수되었습니다." : "새 신고가 접수되었습니다.",
    body: reportRecord.title,
    link_url: `/app/admin/reports/${reportId}`,
    related_entity_type: "report",
    related_entity_id: reportId,
    priority: input.priority,
    actor_user_id: input.reporter_id,
  });
  saveData(nextData);
  return { data: nextData, reportId };
}

export function updateReportStatus(data: AppData, reportId: string, status: ReportStatus, memo: string, actionType: ReportActionType = "status_change"): AppData {
  const report = data.reports.find((entry) => entry.id === reportId);
  if (!report) return data;
  const updatedAt = new Date().toISOString();
  let nextData: AppData = {
    ...data,
    reports: data.reports.map((entry) =>
      entry.id === reportId
        ? {
            ...entry,
            status,
            admin_memo: memo || entry.admin_memo,
            resolution_summary: ["resolved", "dismissed", "action_taken"].includes(status) ? memo || entry.resolution_summary : entry.resolution_summary,
            resolved_at: status === "resolved" ? updatedAt : entry.resolved_at,
            updated_at: updatedAt,
          }
        : entry,
    ),
    report_actions: [reportAction(`raction-${Date.now()}`, reportId, actionType, adminUserId(data), "admin", report.status, status, memo || reportStatusLabels[status], updatedAt), ...data.report_actions],
  };
  if (memo.trim()) {
    nextData = {
      ...nextData,
      report_comments: [reportComment(`rcomment-${Date.now()}`, reportId, adminUserId(data), "admin", memo.trim(), actionType === "memo", updatedAt), ...nextData.report_comments],
    };
  }
  nextData = appendNotification(nextData, {
    user_id: report.reporter_id,
    user_role: report.reporter_role,
    type: "report_status_updated",
    title: "신고 처리 상태가 변경되었습니다.",
    body: `${reportStatusLabels[status]} 상태로 변경되었습니다.`,
    link_url: `/app/reports/${reportId}`,
    related_entity_type: "report",
    related_entity_id: reportId,
    priority: status === "need_more_info" ? "high" : "normal",
    actor_user_id: adminUserId(nextData),
  });
  saveData(nextData);
  return nextData;
}

export function addReportComment(data: AppData, reportId: string, writerId: string, writerRole: UserRole, body: string, isInternal = false): AppData {
  if (!body.trim()) return data;
  const createdAt = new Date().toISOString();
  const nextData: AppData = {
    ...data,
    report_comments: [reportComment(`rcomment-${Date.now()}`, reportId, writerId, writerRole, body.trim(), isInternal, createdAt), ...data.report_comments],
  };
  saveData(nextData);
  return nextData;
}

export function createDealReview(
  data: AppData,
  dealId: string,
  input: {
    rating_overall: number;
    rating_price: number;
    rating_delivery: number;
    rating_quality: number;
    rating_communication: number;
    content: string;
    is_public: boolean;
    would_reorder: boolean;
  },
): AppData {
  const dealRecord = data.deals.find((deal) => deal.id === dealId);
  if (!dealRecord || dealRecord.status !== "completed" || data.reviews.some((entry) => entry.deal_id === dealId)) return data;
  const createdAt = new Date().toISOString();
  const reviewRecord = review(
    `review-${Date.now()}`,
    dealRecord.id,
    dealRecord.quote_request_id,
    dealRecord.buyer_id,
    dealRecord.supplier_id,
    input.rating_overall,
    input.rating_price,
    input.rating_delivery,
    input.rating_quality,
    input.rating_communication,
    input.content.trim(),
    input.is_public,
    input.would_reorder,
    "active",
    createdAt,
  );
  let nextData: AppData = {
    ...data,
    reviews: [reviewRecord, ...data.reviews],
  };
  nextData = updateSupplierStatsAfterReview(nextData, dealRecord.supplier_id);
  nextData = recalculateSupplierReputationWithoutSaving(nextData, dealRecord.supplier_id);
  nextData = appendNotification(nextData, {
    user_id: supplierUserId(dealRecord.supplier_id),
    user_role: "supplier",
    type: "review_received",
    title: "새 후기가 등록되었습니다.",
    body: `${reviewRecord.rating_overall.toFixed(1)}점 후기가 등록되었습니다.`,
    link_url: "/app/supplier/reputation",
    related_entity_type: "review",
    related_entity_id: reviewRecord.id,
    priority: "normal",
    actor_user_id: dealRecord.buyer_id,
  });
  saveData(nextData);
  return nextData;
}

export function addReviewReply(data: AppData, reviewId: string, supplierId: string, content: string): AppData {
  if (!content.trim()) return data;
  const targetReview = data.reviews.find((entry) => entry.id === reviewId);
  if (!targetReview) return data;
  const createdAt = new Date().toISOString();
  let nextData: AppData = {
    ...data,
    review_replies: [reviewReply(`reply-${Date.now()}`, reviewId, supplierId, content.trim(), "active", createdAt), ...data.review_replies],
  };
  nextData = appendNotification(nextData, {
    user_id: targetReview.buyer_id,
    user_role: "buyer",
    type: "review_reply_received",
    title: "공급업체가 후기에 답변했습니다.",
    body: targetReview.content.slice(0, 40),
    link_url: `/app/suppliers/${supplierId}`,
    related_entity_type: "review",
    related_entity_id: reviewId,
    priority: "normal",
    actor_user_id: supplierUserId(supplierId),
  });
  saveData(nextData);
  return nextData;
}

export function updateReviewStatus(data: AppData, reviewId: string, status: ReviewStatus): AppData {
  const updatedAt = new Date().toISOString();
  const reviewRecord = data.reviews.find((entry) => entry.id === reviewId);
  let nextData: AppData = {
    ...data,
    reviews: data.reviews.map((entry) => (entry.id === reviewId ? { ...entry, status, updated_at: updatedAt } : entry)),
  };
  if (reviewRecord) {
    nextData = updateSupplierStatsAfterReview(nextData, reviewRecord.supplier_id);
    nextData = recalculateSupplierReputationWithoutSaving(nextData, reviewRecord.supplier_id);
  }
  saveData(nextData);
  return nextData;
}

export function reportReview(data: AppData, reviewId: string, reportedBy: string, reason: string, detail: string): AppData {
  const createdAt = new Date().toISOString();
  let nextData: AppData = {
    ...data,
    review_reports: [reviewReport(`review-report-${Date.now()}`, reviewId, reportedBy, reason, detail, "pending", createdAt), ...data.review_reports],
    reviews: data.reviews.map((entry) => (entry.id === reviewId ? { ...entry, status: "reported", updated_at: createdAt } : entry)),
  };
  nextData = appendNotification(nextData, {
    user_id: adminUserId(nextData),
    user_role: "admin",
    type: "review_reported",
    title: "후기 신고가 접수되었습니다.",
    body: reason,
    link_url: "/app/admin/reviews",
    related_entity_type: "review",
    related_entity_id: reviewId,
    priority: "high",
    actor_user_id: reportedBy,
  });
  saveData(nextData);
  return nextData;
}

export function applyUserSanction(data: AppData, input: { user_id: string; user_role: "buyer" | "supplier"; sanction_type: SanctionType; reason: string; related_report_id: string; days?: number }): AppData {
  const createdAt = new Date().toISOString();
  const startDate = createdAt.slice(0, 10);
  const endAt = input.days ? new Date(Date.now() + input.days * 24 * 60 * 60 * 1000).toISOString().slice(0, 10) : undefined;
  const sanctionRecord = userSanction(`sanction-${Date.now()}`, input.user_id, input.user_role, input.sanction_type, input.reason, input.related_report_id, "active", startDate, endAt);
  let nextData: AppData = {
    ...data,
    user_sanctions: [sanctionRecord, ...data.user_sanctions],
    supplier_profiles: input.user_role === "supplier"
      ? data.supplier_profiles.map((supplier) => supplier.user_id === input.user_id ? { ...supplier, operational_status: sanctionToOperationalStatus(input.sanction_type), updated_at: createdAt } : supplier)
      : data.supplier_profiles,
  };
  const supplier = nextData.supplier_profiles.find((entry) => entry.user_id === input.user_id);
  if (supplier) nextData = recalculateSupplierReputationWithoutSaving(nextData, supplier.id);
  nextData = appendNotification(nextData, {
    user_id: input.user_id,
    user_role: input.user_role,
    type: input.sanction_type === "warning" ? "warning_received" : "sanction_applied",
    title: input.sanction_type === "warning" ? "운영 경고가 적용되었습니다." : "운영 제재가 적용되었습니다.",
    body: input.reason,
    link_url: input.user_role === "supplier" ? "/app/supplier/reputation" : "/app/reports",
    related_entity_type: "sanction",
    related_entity_id: sanctionRecord.id,
    priority: "high",
    actor_user_id: adminUserId(nextData),
  });
  saveData(nextData);
  return nextData;
}

export function updateSanctionStatus(data: AppData, sanctionId: string, status: SanctionStatus): AppData {
  const updatedAt = new Date().toISOString();
  const nextData: AppData = {
    ...data,
    user_sanctions: data.user_sanctions.map((entry) => (entry.id === sanctionId ? { ...entry, status, updated_at: updatedAt } : entry)),
  };
  saveData(nextData);
  return nextData;
}

export function updateBlacklistStatus(data: AppData, blacklistId: string, status: BlacklistStatus): AppData {
  const updatedAt = new Date().toISOString();
  const nextData: AppData = {
    ...data,
    blacklist_entries: data.blacklist_entries.map((entry) => (entry.id === blacklistId ? { ...entry, status, updated_at: updatedAt } : entry)),
  };
  saveData(nextData);
  return nextData;
}

export function getOperationsSummary(data: AppData) {
  const openReports = data.reports.filter((entry) => !["resolved", "dismissed", "cancelled"].includes(entry.status));
  const urgentReports = data.reports.filter((entry) => entry.priority === "urgent" && !["resolved", "dismissed", "cancelled"].includes(entry.status));
  const completedDeals = data.deals.filter((dealRecord) => ["completed", "closed"].includes(dealRecord.status)).length;
  const cancelledDeals = data.deals.filter((dealRecord) => dealRecord.status.includes("cancelled")).length;
  const averageRating = data.reviews.length ? data.reviews.reduce((sum, entry) => sum + entry.rating_overall, 0) / data.reviews.length : 0;
  return {
    newReports: data.reports.filter((entry) => entry.status === "submitted").length,
    openReports: openReports.length,
    urgentReports: urgentReports.length,
    resolvedReports: data.reports.filter((entry) => entry.status === "resolved").length,
    averageHandleHours: 18,
    disputeRate: Math.round((data.reports.filter((entry) => entry.report_type === "deal_dispute").length / Math.max(1, data.deals.length)) * 100),
    completionRate: Math.round((completedDeals / Math.max(1, data.deals.length)) * 100),
    cancellationRate: Math.round((cancelledDeals / Math.max(1, data.deals.length)) * 100),
    averageRating,
    trustedSuppliers: data.supplier_reputation_scores.filter((entry) => entry.total_score >= 80).length,
    watchSuppliers: data.supplier_reputation_scores.filter((entry) => entry.total_score < 70).length,
    activeSanctions: data.user_sanctions.filter((entry) => entry.status === "active").length,
    messageReports: data.message_reports.length,
  };
}

export function calculateFeedbackPriorityScore(impact: number, frequency: number, effort: number) {
  return Math.max(0, Math.round(impact * 2 + frequency * 1.5 - effort));
}

export function calculateBetaKpis(data: AppData): BetaKpiSummary {
  const target = data.beta_targets[0] ?? sampleBetaTargets[0];
  const buyerParticipants = data.beta_participants.filter((entry) => entry.participant_type === "buyer");
  const supplierParticipants = data.beta_participants.filter((entry) => entry.participant_type === "supplier");
  const approvedSupplierCount = data.supplier_profiles.filter((entry) => entry.approval_status === "approved").length;
  const quoteRequestCount = data.quote_requests.length;
  const quoteCount = data.quotes.length;
  const selectedRequestCount = data.quote_requests.filter((entry) => entry.selected_quote_id || ["selected", "in_progress", "completed", "closed"].includes(entry.status)).length;
  const completedDealCount = data.deals.filter((entry) => ["completed", "closed"].includes(entry.status)).length;
  const activeSupplierCount = getActiveSupplierRate(data, "count");
  const goalScores = [
    ratioPercent(buyerParticipants.length, target.target_buyers),
    ratioPercent(approvedSupplierCount, target.target_suppliers),
    ratioPercent(quoteRequestCount, target.target_quote_requests),
    ratioPercent(quoteCount, target.target_quotes),
    ratioPercent(data.deals.length, target.target_deals),
    ratioPercent(completedDealCount, target.target_completed_deals),
    ratioPercent(data.feedbacks.length, target.target_feedbacks),
  ];

  return {
    target,
    buyerCount: buyerParticipants.length,
    activeBuyerCount: buyerParticipants.filter((entry) => entry.status === "active").length,
    supplierCandidateCount: supplierParticipants.length,
    approvedSupplierCount,
    activeSupplierCount,
    quoteRequestCount,
    quoteCount,
    averageQuotesPerRequest: round1(quoteCount / Math.max(1, quoteRequestCount)),
    averageFirstQuoteHours: getAverageFirstQuoteTime(data),
    quoteRequestConversionRate: getQuoteRequestConversionRate(data),
    quoteResponseRate: getQuoteResponseRate(data),
    quoteSelectionRate: Math.round((selectedRequestCount / Math.max(1, quoteRequestCount)) * 100),
    dealConversionRate: getDealConversionRate(data),
    completedDealRate: Math.round((completedDealCount / Math.max(1, data.deals.length)) * 100),
    repeatBuyerRate: getRepeatBuyerRate(data),
    activeSupplierRate: getActiveSupplierRate(data),
    feedbackCount: data.feedbacks.length,
    openIssueCount: data.reports.filter((entry) => !["resolved", "dismissed", "cancelled"].includes(entry.status)).length + data.message_reports.filter((entry) => entry.status === "pending").length,
    goalAchievementRate: Math.round(goalScores.reduce((sum, score) => sum + Math.min(100, score), 0) / Math.max(1, goalScores.length)),
    estimatedRevenue: getRevenueSummary(data).totalExpectedRevenue,
  };
}

export function getQuoteRequestConversionRate(data: AppData) {
  const signedOrOnboarded = data.beta_participants.filter((entry) => entry.participant_type === "buyer" && ["signed_up", "onboarded", "active"].includes(entry.status)).length;
  const requestBuyers = new Set(data.quote_requests.map((entry) => entry.buyer_id)).size;
  return Math.round((requestBuyers / Math.max(1, signedOrOnboarded)) * 100);
}

export function getQuoteResponseRate(data: AppData) {
  const requestWithQuotes = new Set(data.quotes.map((entry) => entry.quote_request_id)).size;
  return Math.round((requestWithQuotes / Math.max(1, data.quote_requests.length)) * 100);
}

export function getDealConversionRate(data: AppData) {
  return Math.round((data.deals.length / Math.max(1, data.quote_requests.length)) * 100);
}

export function getRepeatBuyerRate(data: AppData) {
  const requestCounts = countBy(data.quote_requests, (entry) => entry.buyer_id);
  const repeatBuyers = requestCounts.filter((entry) => entry.value >= 2).length;
  const allBuyers = new Set(data.quote_requests.map((entry) => entry.buyer_id)).size;
  return Math.round((repeatBuyers / Math.max(1, allBuyers)) * 100);
}

export function getActiveSupplierRate(data: AppData): number;
export function getActiveSupplierRate(data: AppData, mode: "count"): number;
export function getActiveSupplierRate(data: AppData, mode?: "count") {
  const approved = data.supplier_profiles.filter((entry) => entry.approval_status === "approved");
  const quoteSupplierIds = new Set(data.quotes.map((entry) => entry.supplier_id));
  const activeCount = approved.filter((entry) => quoteSupplierIds.has(entry.id)).length;
  if (mode === "count") return activeCount;
  return Math.round((activeCount / Math.max(1, approved.length)) * 100);
}

export function getAverageFirstQuoteTime(data: AppData) {
  const firstQuoteHours = data.quote_requests
    .map((requestRecord) => {
      const firstQuote = data.quotes
        .filter((entry) => entry.quote_request_id === requestRecord.id)
        .sort((a, b) => a.created_at.localeCompare(b.created_at))[0];
      if (!firstQuote) return null;
      const requestMs = Date.parse(requestRecord.created_at);
      const quoteMs = Date.parse(firstQuote.created_at);
      if (!Number.isFinite(requestMs) || !Number.isFinite(quoteMs)) return 4;
      return Math.max(0.5, (quoteMs - requestMs) / 36e5);
    })
    .filter((value): value is number => typeof value === "number");
  if (!firstQuoteHours.length) return 0;
  return round1(firstQuoteHours.reduce((sum, value) => sum + value, 0) / firstQuoteHours.length);
}

export function getCategoryPerformance(data: AppData): CategoryPerformance[] {
  return categories.map((category) => {
    const requests = data.quote_requests.filter((entry) => entry.category_name === category.name);
    const requestIds = new Set(requests.map((entry) => entry.id));
    const quotes = data.quotes.filter((entry) => requestIds.has(entry.quote_request_id));
    const selectedCount = requests.filter((entry) => entry.selected_quote_id || ["selected", "in_progress", "completed", "closed"].includes(entry.status)).length;
    const deals = data.deals.filter((entry) => entry.category_name === category.name);
    const completedDeals = deals.filter((entry) => ["completed", "closed"].includes(entry.status));
    const disputeCount = data.reports.filter((entry) => entry.report_type === "deal_dispute" && deals.some((dealRecord) => dealRecord.id === entry.related_entity_id)).length;
    const feedbackCount = data.feedbacks.filter((entry) => entry.description.includes(category.name) || entry.title.includes(category.name)).length;
    const averageQuotes = round1(quotes.length / Math.max(1, requests.length));
    const averageDealAmount = deals.length ? Math.round(deals.reduce((sum, entry) => sum + entry.final_amount, 0) / deals.length) : 0;
    const recommendation: CategoryPerformance["recommendation"] =
      requests.length >= 2 && averageQuotes >= 2 ? "집중" : requests.length > 0 && quotes.length === 0 ? "공급망 보강" : requests.length > 0 ? "유지" : "보류";

    return {
      category: category.name,
      requestCount: requests.length,
      quoteCount: quotes.length,
      averageQuotes,
      selectedCount,
      dealCount: deals.length,
      completedDealCount: completedDeals.length,
      averageDealAmount,
      disputeCount,
      feedbackCount,
      recommendation,
    };
  }).filter((entry) => entry.requestCount > 0 || entry.quoteCount > 0 || entry.dealCount > 0);
}

export function getFunnelMetrics(data: AppData): FunnelMetric[] {
  const buyerInvited = data.beta_participants.filter((entry) => entry.participant_type === "buyer" && ["invited", "signed_up", "onboarded", "active", "inactive", "dropped"].includes(entry.status)).length;
  const buyerSignedUp = data.beta_participants.filter((entry) => entry.participant_type === "buyer" && ["signed_up", "onboarded", "active"].includes(entry.status)).length;
  const requestBuyers = new Set(data.quote_requests.map((entry) => entry.buyer_id)).size;
  const quotedRequests = new Set(data.quotes.map((entry) => entry.quote_request_id)).size;
  const selectedRequests = data.quote_requests.filter((entry) => entry.selected_quote_id || ["selected", "in_progress", "completed", "closed"].includes(entry.status)).length;
  const supplierLeads = data.sales_leads.filter((entry) => entry.lead_type === "supplier").length;
  const contactedSuppliers = data.sales_leads.filter((entry) => entry.lead_type === "supplier" && entry.stage !== "new").length;
  const onboardedSuppliers = data.beta_participants.filter((entry) => entry.participant_type === "supplier" && ["onboarded", "active"].includes(entry.status)).length;
  const activeSuppliers = getActiveSupplierRate(data, "count");

  return [
    funnelMetric("구매자 초대", buyerInvited, buyerInvited),
    funnelMetric("구매자 가입", buyerSignedUp, buyerInvited),
    funnelMetric("첫 견적요청", requestBuyers, buyerSignedUp),
    funnelMetric("견적 도착", quotedRequests, data.quote_requests.length),
    funnelMetric("견적 선택", selectedRequests, quotedRequests),
    funnelMetric("거래 생성", data.deals.length, selectedRequests),
    funnelMetric("거래 완료", data.deals.filter((entry) => ["completed", "closed"].includes(entry.status)).length, data.deals.length),
    funnelMetric("공급업체 리드", supplierLeads, supplierLeads),
    funnelMetric("공급업체 연락", contactedSuppliers, supplierLeads),
    funnelMetric("온보딩 완료", onboardedSuppliers, contactedSuppliers),
    funnelMetric("견적 제출 업체", activeSuppliers, onboardedSuppliers),
  ];
}

const categoryFocusBenchmarks: Record<string, Partial<CategoryFocusScore>> = {
  "포장재": { requestCount: 34, averageQuotes: 3.4, firstQuoteHours: 2.1, selectionRate: 42, dealRate: 38, repeatRate: 32, averageDealAmount: 520000, riskRate: 6 },
  "식자재": { requestCount: 41, averageQuotes: 1.8, firstQuoteHours: 7.2, selectionRate: 22, dealRate: 18, repeatRate: 18, averageDealAmount: 780000, riskRate: 12 },
  "설비/닥트/환기자재": { requestCount: 8, averageQuotes: 2.5, firstQuoteHours: 5.4, selectionRate: 35, dealRate: 28, repeatRate: 8, averageDealAmount: 1400000, riskRate: 8 },
  "건축자재": { requestCount: 5, averageQuotes: 1.2, firstQuoteHours: 12, selectionRate: 10, dealRate: 8, repeatRate: 0, averageDealAmount: 900000, riskRate: 25 },
};

export function getActiveFocusSetting(data: AppData): FocusSetting {
  return data.focus_settings.find((entry) => entry.focus_mode_enabled) ?? data.focus_settings[0] ?? sampleFocusSettings[0];
}

export function calculateCategoryFocusScores(data: AppData): CategoryFocusScore[] {
  return categories.map((category) => {
    const requests = data.quote_requests.filter((entry) => entry.category_name === category.name);
    const requestIds = new Set(requests.map((entry) => entry.id));
    const quotes = data.quotes.filter((entry) => requestIds.has(entry.quote_request_id));
    const deals = data.deals.filter((entry) => entry.category_name === category.name);
    const supplierCount = data.supplier_profiles.filter((entry) => entry.approval_status === "approved" && entry.categories.includes(category.name)).length;
    const benchmark = categoryFocusBenchmarks[category.name] ?? {};
    const requestCount = Math.max(requests.length, benchmark.requestCount ?? 0);
    const activeSupplierCount = Math.max(supplierCount, category.name === "포장재" ? 6 : category.name === "식자재" ? 4 : supplierCount);
    const averageQuotes = Math.max(round1(quotes.length / Math.max(1, requests.length)), benchmark.averageQuotes ?? 0);
    const firstQuoteHours = requests.length ? getAverageFirstQuoteTime({ ...data, quote_requests: requests, quotes }) || (benchmark.firstQuoteHours ?? 12) : (benchmark.firstQuoteHours ?? 12);
    const selectedCount = requests.filter((entry) => entry.selected_quote_id || ["selected", "in_progress", "completed", "closed"].includes(entry.status)).length;
    const selectionRate = Math.max(Math.round((selectedCount / Math.max(1, requests.length)) * 100), benchmark.selectionRate ?? 0);
    const dealRate = Math.max(Math.round((deals.length / Math.max(1, requests.length)) * 100), benchmark.dealRate ?? 0);
    const buyerCounts = countBy(requests, (entry) => entry.buyer_id);
    const repeatRate = Math.max(Math.round((buyerCounts.filter((entry) => entry.value >= 2).length / Math.max(1, buyerCounts.length)) * 100), benchmark.repeatRate ?? 0);
    const averageDealAmount = Math.max(deals.length ? Math.round(deals.reduce((sum, entry) => sum + entry.final_amount, 0) / deals.length) : 0, benchmark.averageDealAmount ?? 0);
    const riskyDeals = deals.filter((entry) => entry.status.includes("cancelled") || entry.status === "disputed").length;
    const riskRate = Math.max(Math.round((riskyDeals / Math.max(1, deals.length)) * 100), benchmark.riskRate ?? 0);
    const demandScore = scaledScore(requestCount, 40, 20);
    const supplyScore = scaledScore(activeSupplierCount, 8, 15);
    const responseScore = scaledScore(averageQuotes, 3.5, 15);
    const dealScore = Math.min(20, Math.round((selectionRate * 0.6 + dealRate * 0.4) / 5));
    const repeatScore = scaledScore(repeatRate, 40, 10);
    const revenueScore = scaledScore(averageDealAmount, 1200000, 10);
    const riskPenalty = scaledScore(riskRate, 40, 10);
    const focusScore = Math.max(0, Math.min(100, demandScore + supplyScore + responseScore + dealScore + repeatScore + revenueScore - riskPenalty));
    const status: CategoryFocusStatus =
      focusScore >= 70 ? "recommended"
      : requestCount >= 8 && averageDealAmount >= 1000000 ? "expand_candidate"
      : requestCount >= 15 && activeSupplierCount < 4 ? "need_supply"
      : requestCount < 8 && activeSupplierCount >= 3 ? "need_demand"
      : riskRate >= 20 ? "hold"
      : "maintain";
    const reason = status === "recommended"
      ? "수요, 응답, 거래 전환이 동시에 확인됩니다."
      : status === "need_supply"
        ? "수요는 있으나 응답 가능한 공급업체가 부족합니다."
        : status === "need_demand"
          ? "공급 기반은 있으나 구매자 요청 검증이 더 필요합니다."
          : status === "expand_candidate"
            ? "요청 수는 적지만 거래금액과 응답 가능성이 높습니다."
            : status === "hold"
              ? "운영 난이도와 분쟁 리스크가 높아 보류가 안전합니다."
              : "핵심 흐름을 유지하며 추가 데이터를 봅니다.";

    return {
      category: category.name,
      requestCount,
      activeSupplierCount,
      averageQuotes,
      firstQuoteHours: round1(firstQuoteHours),
      selectionRate,
      dealRate,
      repeatRate,
      averageDealAmount,
      riskRate,
      demandScore,
      supplyScore,
      responseScore,
      dealScore,
      repeatScore,
      revenueScore,
      riskPenalty,
      focusScore,
      status,
      reason,
    };
  }).sort((a, b) => b.focusScore - a.focusScore);
}

export function getQuoteRequestOpsInsights(data: AppData): QuoteRequestOpsInsight[] {
  return data.quote_requests.map((requestRecord) => {
    const quoteCount = data.quotes.filter((entry) => entry.quote_request_id === requestRecord.id).length;
    const matchingSupplierCount = estimateSupplierMatches(data, requestRecord.category_name, requestRecord.delivery_region, requestRecord.need_tax_invoice, requestRecord.card_payment_required);
    const elapsedHours = getElapsedDemoHours(requestRecord.created_at);
    const riskLevel = getQuoteRiskLevel(elapsedHours, quoteCount, matchingSupplierCount, requestRecord.urgent ?? false);
    const opsStatus: QuoteRequestOpsStatus = quoteCount > 0
      ? "resolved"
      : matchingSupplierCount === 0
        ? "needs_supplier_match"
        : riskLevel === "urgent" || riskLevel === "high"
          ? "no_quotes_risk"
          : "waiting_quotes";
    return {
      request: requestRecord,
      buyerName: buyerName(data, requestRecord.buyer_id),
      elapsedHours,
      matchingSupplierCount,
      viewedSupplierCount: Math.min(matchingSupplierCount, requestRecord.expected_supplier_count ?? matchingSupplierCount),
      quoteCount,
      riskLevel,
      opsStatus,
      assignedAdminName: "운영자",
      nextAction: getQuoteOpsAction(riskLevel, matchingSupplierCount, quoteCount),
    };
  }).sort((a, b) => riskRank(b.riskLevel) - riskRank(a.riskLevel) || b.elapsedHours - a.elapsedHours);
}

export function getSupplierMatchCandidates(data: AppData, requestId: string): SupplierMatchCandidate[] {
  const requestRecord = data.quote_requests.find((entry) => entry.id === requestId) ?? data.quote_requests[0];
  if (!requestRecord) return [];
  return data.supplier_profiles
    .map((supplierRecord) => {
      const stats = data.supplier_stats.find((entry) => entry.supplier_id === supplierRecord.id);
      const reputation = getSupplierReputation(data, supplierRecord.id);
      const credits = data.quote_participation_credits.filter((entry) => entry.supplier_id === supplierRecord.id);
      const remainingCredits = credits.length ? credits.reduce((sum, entry) => sum + entry.remaining_credits, 0) : Math.max(0, (getSupplierCurrentPlan(data, supplierRecord.id)?.quote_participation_limit ?? 0) - (data.supplier_usage.find((entry) => entry.supplier_id === supplierRecord.id)?.quotes_submitted_count ?? 0));
      const score = calculateSupplierMatchScore(supplierRecord, requestRecord, data);
      const reasons = [
        matchesSupplierCategory(supplierRecord, requestRecord.category_name) ? "카테고리 일치" : "카테고리 확인 필요",
        matchesSupplierRegion(supplierRecord, requestRecord.delivery_region) ? "지역 일치" : "인접/수동 확인",
        (stats?.response_rate ?? 0) >= 80 ? "응답률 우수" : "응답 독려 필요",
        reputation.total_score >= 80 ? "신뢰도 우수" : "신뢰도 확인",
      ];
      const label: SupplierMatchCandidate["label"] = score >= 85 ? "강력 추천" : score >= 70 ? "적합" : score >= 50 ? "조건 일부 확인 필요" : (stats?.response_rate ?? 0) < 50 ? "응답 느림" : "제외 권장";
      return {
        supplier: supplierRecord,
        score,
        label,
        reasons,
        responseRate: stats?.response_rate ?? 0,
        averageResponseMinutes: stats?.average_response_minutes ?? 0,
        monthlyQuoteCount: data.supplier_usage.find((entry) => entry.supplier_id === supplierRecord.id)?.quotes_submitted_count ?? stats?.total_quotes_submitted ?? 0,
        remainingCredits,
        trustScore: reputation.total_score,
      };
    })
    .sort((a, b) => b.score - a.score);
}

export function getSupplierResponseOps(data: AppData): SupplierResponseOpsRow[] {
  return data.supplier_profiles
    .filter((supplierRecord) => supplierRecord.approval_status === "approved")
    .map((supplierRecord) => {
      const stats = data.supplier_stats.find((entry) => entry.supplier_id === supplierRecord.id);
      const usage = data.supplier_usage.find((entry) => entry.supplier_id === supplierRecord.id);
      const matchedRequestCount = data.quote_requests.filter((requestRecord) => calculateSupplierMatchScore(supplierRecord, requestRecord, data) >= 60).length;
      const quoteCount = data.quotes.filter((entry) => entry.supplier_id === supplierRecord.id).length;
      const quoteSubmitRate = Math.round((quoteCount / Math.max(1, matchedRequestCount)) * 100);
      const selectedQuoteCount = data.quotes.filter((entry) => entry.supplier_id === supplierRecord.id && entry.status === "selected").length;
      const dealWinRate = Math.round((selectedQuoteCount / Math.max(1, quoteCount)) * 100);
      const averageResponseMinutes = stats?.average_response_minutes ?? 0;
      const status: SupplierResponseStatus =
        (stats?.response_rate ?? 0) >= 85 && averageResponseMinutes <= 60 ? "fast"
        : quoteSubmitRate === 0 ? "needs_education"
        : (stats?.response_rate ?? 0) < 50 ? "slow"
        : quoteSubmitRate < 30 ? "low_participation"
        : averageResponseMinutes >= 180 ? "needs_contact"
        : "normal";
      return {
        supplier: supplierRecord,
        status,
        matchedRequestCount,
        viewedRequestCount: usage?.matched_requests_viewed_count ?? Math.min(matchedRequestCount, stats?.total_quotes_submitted ?? 0),
        quoteCount,
        quoteSubmitRate,
        averageResponseMinutes,
        selectedQuoteCount,
        dealWinRate,
        lastActiveAt: usage?.updated_at ?? stats?.updated_at ?? supplierRecord.updated_at ?? supplierRecord.created_at,
        action: getSupplierResponseAction(status),
      };
    })
    .sort((a, b) => responseStatusRank(b.status) - responseStatusRank(a.status) || a.quoteSubmitRate - b.quoteSubmitRate);
}

export function getRepeatUsageInsights(data: AppData): RepeatUsageInsight[] {
  return data.profiles
    .filter((profileRecord) => profileRecord.role === "buyer")
    .map((profileRecord) => {
      const requests = data.quote_requests.filter((entry) => entry.buyer_id === profileRecord.id);
      const purchases = data.purchase_records.filter((entry) => entry.buyer_id === profileRecord.id);
      const lastCategory = requests[0]?.category_name ?? purchases[0]?.category_name ?? "포장재";
      const riskLabel = requests.length >= 2 ? "반복 사용 가능성 높음" : requests.length === 1 ? "재요청 유도 필요" : "첫 요청 필요";
      const recommendedAction = requests.length >= 2 ? "가격 변동 비교 CTA 노출" : requests.length === 1 ? "지난 요청 다시 견적받기 알림" : "거래명세서 업로드 안내";
      return {
        buyerId: profileRecord.id,
        buyerName: profileRecord.business_name,
        requestCount: requests.length,
        purchaseCount: purchases.length,
        lastCategory,
        riskLabel,
        recommendedAction,
      };
    })
    .sort((a, b) => b.requestCount - a.requestCount || b.purchaseCount - a.purchaseCount);
}

export function getBuyerDropoffMetrics(data: AppData): DropoffMetric[] {
  const buyers = data.beta_participants.filter((entry) => entry.participant_type === "buyer");
  const signed = buyers.filter((entry) => ["signed_up", "onboarded", "active"].includes(entry.status)).length;
  const onboarded = buyers.filter((entry) => ["onboarded", "active"].includes(entry.status)).length;
  const requestBuyerIds = new Set(data.quote_requests.map((entry) => entry.buyer_id));
  const quotedRequestIds = new Set(data.quotes.map((entry) => entry.quote_request_id));
  const selectedRequests = data.quote_requests.filter((entry) => entry.selected_quote_id || ["selected", "in_progress", "completed", "closed"].includes(entry.status));
  const dealBuyerIds = new Set(data.deals.map((entry) => entry.buyer_id));
  const repeatInsights = getRepeatUsageInsights(data);
  return [
    dropoffMetric("buyer", "가입했지만 온보딩 미완료", Math.max(0, signed - onboarded), signed, "시작 후 첫 행동이 명확하지 않습니다.", "첫 요청 작성 유도 메시지"),
    dropoffMetric("buyer", "온보딩 완료 후 견적요청 없음", Math.max(0, onboarded - requestBuyerIds.size), onboarded, "거래명세서/사진 업로드 CTA가 약합니다.", "포장재 템플릿 추천"),
    dropoffMetric("buyer", "견적요청 등록 후 견적 미도착", getQuoteRequestOpsInsights(data).filter((entry) => entry.quoteCount === 0).length, data.quote_requests.length, "공급업체 수동 매칭이 필요합니다.", "운영자 매칭 보조"),
    dropoffMetric("buyer", "견적 도착 후 선택 안 함", Math.max(0, quotedRequestIds.size - selectedRequests.length), quotedRequestIds.size, "비교 기준과 문의 동선이 부족합니다.", "견적 비교 가이드 제공"),
    dropoffMetric("buyer", "거래 생성 후 완료 안 함", data.deals.filter((entry) => !["completed", "closed"].includes(entry.status)).length, data.deals.length, "납품 상태 확인과 증빙 안내가 필요합니다.", "거래 상태 리마인드"),
    dropoffMetric("buyer", "첫 사용 후 재요청 없음", repeatInsights.filter((entry) => entry.requestCount === 1).length, repeatInsights.length, "반복 구매 품목을 다시 입력해야 합니다.", "지난 요청 다시 견적받기 알림"),
  ];
}

export function getSupplierDropoffMetrics(data: AppData): DropoffMetric[] {
  const supplierLeads = data.sales_leads.filter((entry) => entry.lead_type === "supplier");
  const supplierParticipants = data.beta_participants.filter((entry) => entry.participant_type === "supplier");
  const approved = data.supplier_profiles.filter((entry) => entry.approval_status === "approved");
  const activeSupplierIds = new Set(data.quotes.map((entry) => entry.supplier_id));
  return [
    dropoffMetric("supplier", "리드 등록 후 연락 안 됨", supplierLeads.filter((entry) => entry.stage === "new").length, supplierLeads.length, "초기 연락 루틴이 누락됩니다.", "가입 링크와 전화 태스크 생성"),
    dropoffMetric("supplier", "관심 있음 후 가입 안 함", supplierLeads.filter((entry) => entry.stage === "interested").length, supplierLeads.length, "실제 요청 수 신뢰가 부족합니다.", "포장재 요청 사례 공유"),
    dropoffMetric("supplier", "가입했지만 입점 신청 안 함", supplierParticipants.filter((entry) => entry.status === "signed_up").length, supplierParticipants.length, "입점 자료 준비가 번거롭습니다.", "필수 자료 안내"),
    dropoffMetric("supplier", "입점 신청 후 자료 보완 안 함", data.supplier_profiles.filter((entry) => entry.approval_status === "needs_revision" || entry.approval_status === "pending").length, data.supplier_profiles.length, "보완 항목이 명확하지 않습니다.", "관리자 보완 요청"),
    dropoffMetric("supplier", "승인 후 요청 조회 안 함", approved.filter((entry) => !(data.supplier_usage.find((usage) => usage.supplier_id === entry.id)?.matched_requests_viewed_count ?? 0)).length, approved.length, "알림과 추천 요청 노출이 약합니다.", "적합 요청 알림 강화"),
    dropoffMetric("supplier", "요청 조회 후 견적 제출 안 함", approved.filter((entry) => !activeSupplierIds.has(entry.id)).length, approved.length, "첫 견적 작성 가이드가 필요합니다.", "견적 제출 가이드 발송"),
    dropoffMetric("supplier", "첫 견적 후 반복 제출 없음", getSupplierResponseOps(data).filter((entry) => entry.quoteCount === 1).length, approved.length, "선택 실패 후 개선 피드백이 없습니다.", "가격 외 선택 요소 안내"),
  ];
}

export function getImprovementPriorities(data: AppData): ImprovementPriority[] {
  return data.beta_feedback_insights
    .map((insight) => {
      const feedback = data.feedbacks.find((entry) => entry.id === insight.feedback_id);
      const status: ImprovementPriorityStatus = insight.decision === "do_now" ? "apply_now" : insight.decision === "do_later" ? "apply_next" : insight.decision === "reject" ? "rejected" : "reviewing";
      const linkedWork = insight.category === "ux"
        ? ["빠른 재요청", "집중형 홈 CTA", "견적요청 단계 축소"]
        : insight.category === "feature_request"
          ? ["반복 견적 복사", "자주 쓰는 품목 묶음"]
          : insight.category === "supplier_quality"
            ? ["응답률 운영", "수동 매칭"]
            : ["QA 확인", "운영 태스크"];
      return {
        id: insight.id,
        title: feedback?.title ?? insight.admin_memo,
        category: insight.category,
        userType: feedback?.user_role ?? "admin",
        severity: insight.severity,
        frequency: insight.frequency,
        impact: insight.impact,
        effort: insight.effort,
        score: insight.priority_score,
        decision: insight.decision,
        linkedWork,
        status,
      };
    })
    .sort((a, b) => b.score - a.score);
}

export function getDataQualityChecks(data: AppData): DataQualityCheck[] {
  const categoryNames = new Set(data.categories.map((entry) => entry.name));
  const duplicateRequestTitles = countBy(data.quote_requests, (entry) => `${entry.buyer_id}:${entry.title}`).filter((entry) => entry.value > 1).length;
  const unknownCategories = data.quote_requests.filter((entry) => !categoryNames.has(entry.category_name)).length;
  const cancelledRequests = data.quote_requests.filter((entry) => entry.status === "cancelled").length;
  const openDeals = data.deals.filter((entry) => !["completed", "closed", "cancelled_by_buyer", "cancelled_by_supplier"].includes(entry.status)).length;
  const testUsers = data.profiles.filter((entry) => entry.is_test_user || entry.email.includes("@ssawa.local")).length;
  return [
    qualityCheck("데모/live 구분", data.is_demo ? "warning" : "good", data.is_demo ? "demo 포함" : data.environment, data.is_demo ? "KPI 화면에서 live only 필터를 함께 표시" : "운영 데이터 기준으로 유지"),
    qualityCheck("테스트 계정 제외", testUsers > 0 ? "warning" : "good", `${testUsers}명`, "실제 KPI 계산 전 테스트 계정 필터 적용"),
    qualityCheck("중복 견적요청", duplicateRequestTitles > 0 ? "needs_review" : "good", `${duplicateRequestTitles}건`, "동일 구매자/제목 중복 여부 확인"),
    qualityCheck("취소 요청", cancelledRequests > 0 ? "warning" : "good", `${cancelledRequests}건`, "취소 요청은 전환율에서 별도 표시"),
    qualityCheck("미완료 거래", openDeals > 0 ? "warning" : "good", `${openDeals}건`, "완료/미완료 거래를 리포트에서 분리"),
    qualityCheck("카테고리명 통일", unknownCategories > 0 ? "needs_review" : "good", `${unknownCategories}건`, "카테고리 master와 요청 카테고리 동기화"),
    qualityCheck("지역명 통일", "warning", `${new Set(data.quote_requests.map((entry) => entry.delivery_region.split(" ")[0])).size}개 권역`, "시/도/구 단위 표준화 필요"),
    qualityCheck("기간 필터", "good", "2026-07 베타", "KPI 화면에 기간/카테고리/지역 필터 노출"),
  ];
}

function scaledScore(value: number, target: number, maxScore: number) {
  return Math.min(maxScore, Math.round((value / Math.max(1, target)) * maxScore));
}

function getElapsedDemoHours(createdAt: string) {
  const demoNowMs = Date.parse("2026-07-05T09:00:00.000+09:00");
  const createdMs = Date.parse(createdAt);
  if (!Number.isFinite(createdMs)) return 0;
  return round1(Math.max(0.5, (demoNowMs - createdMs) / 36e5));
}

function getQuoteRiskLevel(elapsedHours: number, quoteCount: number, matchingSupplierCount: number, urgent = false): QuoteRiskLevel {
  if (quoteCount > 0) return "low";
  if (matchingSupplierCount === 0 || elapsedHours >= 12 || (urgent && elapsedHours >= 2)) return "urgent";
  if (elapsedHours >= 6) return "high";
  if (elapsedHours >= 3) return "normal";
  return "low";
}

function getQuoteOpsAction(riskLevel: QuoteRiskLevel, matchingSupplierCount: number, quoteCount: number) {
  if (quoteCount > 0) return "견적 비교와 선택 유도";
  if (matchingSupplierCount === 0) return "CRM에서 신규 공급업체 리드 추가";
  if (riskLevel === "urgent") return "구매자 지연 안내와 공급업체 전화 연락";
  if (riskLevel === "high") return "수동 알림 발송과 운영자 담당 배정";
  if (riskLevel === "normal") return "추천 공급업체에 견적 제출 리마인드";
  return "1시간 내 자동 모니터링";
}

function riskRank(level: QuoteRiskLevel) {
  return level === "urgent" ? 4 : level === "high" ? 3 : level === "normal" ? 2 : 1;
}

function getSupplierResponseAction(status: SupplierResponseStatus) {
  if (status === "fast") return "우수 응답 유지와 유료화 인터뷰";
  if (status === "normal") return "적합 요청 알림 유지";
  if (status === "slow") return "응답 독려 알림 생성";
  if (status === "low_participation") return "전화 연락 태스크 생성";
  if (status === "dormant_risk") return "휴면 위험 안내";
  if (status === "needs_contact") return "카테고리/지역 설정 점검 요청";
  return "견적 제출 가이드 보내기";
}

function responseStatusRank(status: SupplierResponseStatus) {
  return status === "needs_education" ? 7 : status === "needs_contact" ? 6 : status === "dormant_risk" ? 5 : status === "low_participation" ? 4 : status === "slow" ? 3 : status === "normal" ? 2 : 1;
}

function dropoffMetric(actor: BetaParticipantType, stage: string, count: number, previousCount: number, reason: string, action: string): DropoffMetric {
  return {
    actor,
    stage,
    count,
    rate: ratioPercent(count, previousCount),
    reason,
    action,
  };
}

function qualityCheck(label: string, status: DataQualityCheck["status"], value: string, action: string): DataQualityCheck {
  return { label, status, value, action };
}

function ratioPercent(value: number, target: number) {
  return Math.round((value / Math.max(1, target)) * 100);
}

function round1(value: number) {
  return Math.round(value * 10) / 10;
}

function funnelMetric(label: string, count: number, previousCount: number): FunnelMetric {
  const conversionRate = ratioPercent(count, previousCount);
  return {
    label,
    count,
    conversionRate,
    warning: previousCount > 0 && conversionRate < 50,
  };
}

function countBy<T>(items: T[], getter: (item: T) => string) {
  const map = new Map<string, number>();
  items.forEach((item) => {
    const key = getter(item);
    map.set(key, (map.get(key) ?? 0) + 1);
  });
  return Array.from(map.entries()).map(([label, value]) => ({ label, value }));
}

export function createBetaFeedback(
  data: AppData,
  input: {
    user_id: string;
    user_role: UserRole;
    feedback_type: FeedbackType;
    title: string;
    description: string;
    page_url: string;
    screenshot_url?: string;
  },
): { data: AppData; feedbackId: string } {
  const createdAt = new Date().toISOString();
  const feedbackId = `feedback-${Date.now()}`;
  const feedbackRecord: BetaFeedback = {
    id: feedbackId,
    user_id: input.user_id,
    user_role: input.user_role,
    feedback_type: input.feedback_type,
    title: input.title.trim(),
    description: input.description.trim(),
    page_url: input.page_url,
    screenshot_url: input.screenshot_url ?? "",
    status: "submitted",
    admin_memo: "",
    created_at: createdAt,
    updated_at: createdAt,
  };
  let nextData: AppData = {
    ...data,
    feedbacks: [feedbackRecord, ...data.feedbacks],
  };
  nextData = appendNotification(nextData, {
    user_id: adminUserId(nextData),
    user_role: "admin",
    type: "new_report_submitted",
    title: "새 베타 피드백이 접수되었습니다.",
    body: feedbackRecord.title,
    link_url: "/app/admin/feedback",
    related_entity_type: "system",
    related_entity_id: feedbackId,
    priority: input.feedback_type === "bug" ? "high" : "normal",
    actor_user_id: input.user_id,
  });
  saveData(nextData);
  return { data: nextData, feedbackId };
}

export function updateFeedback(data: AppData, feedbackId: string, patch: Partial<Pick<BetaFeedback, "status" | "admin_memo">>): AppData {
  const updatedAt = new Date().toISOString();
  const nextData: AppData = {
    ...data,
    feedbacks: data.feedbacks.map((entry) => (entry.id === feedbackId ? { ...entry, ...patch, updated_at: updatedAt } : entry)),
  };
  saveData(nextData);
  return nextData;
}

export function updateQaChecklist(data: AppData, itemId: string, patch: Partial<Pick<QaChecklistItem, "status" | "memo">>, adminId = "admin-1"): AppData {
  const updatedAt = new Date().toISOString();
  const nextData: AppData = {
    ...data,
    qa_checklists: data.qa_checklists.map((entry) =>
      entry.id === itemId
        ? {
            ...entry,
            ...patch,
            checked_by: patch.status && patch.status !== "unchecked" ? adminId : entry.checked_by,
            checked_at: patch.status && patch.status !== "unchecked" ? updatedAt : entry.checked_at,
            updated_at: updatedAt,
          }
        : entry,
    ),
  };
  saveData(nextData);
  return nextData;
}

export function markOnboardingCompleted(data: AppData): AppData {
  const updatedAt = new Date().toISOString();
  const nextData: AppData = {
    ...data,
    onboarding_completed: true,
    onboarding_completed_at: updatedAt,
  };
  saveData(nextData);
  return nextData;
}

export function resetDemoData(): AppData {
  return resetData();
}

export function isDemoMode(data: AppData) {
  return data.is_demo || data.environment === "demo";
}

export function ensureRequestMessageThread(data: AppData, requestId: string, supplierId: string): { data: AppData; threadId: string } {
  const existing = data.message_threads.find((entry) => entry.thread_type === "quote_request" && entry.related_entity_id === requestId && entry.supplier_id === supplierId);
  if (existing) return { data, threadId: existing.id };
  const requestRecord = data.quote_requests.find((entry) => entry.id === requestId);
  const supplier = data.supplier_profiles.find((entry) => entry.id === supplierId);
  const hasSubmittedQuote = data.quotes.some((entry) => entry.quote_request_id === requestId && entry.supplier_id === supplierId);
  const isMatchedSupplier = requestRecord && supplier ? calculateSupplierMatchScore(supplier, requestRecord, data) >= 70 : false;
  if (!requestRecord || !supplier || (!hasSubmittedQuote && !isMatchedSupplier)) return { data, threadId: "" };
  const createdAt = new Date().toISOString();
  const threadId = `thread-${requestId}-${supplierId}-${Date.now()}`;
  const threadRecord: MessageThread = {
    id: threadId,
    thread_type: "quote_request",
    related_entity_id: requestId,
    buyer_id: requestRecord?.buyer_id ?? "buyer-1",
    supplier_id: supplierId,
    admin_id: "admin-1",
    title: `${requestRecord?.title ?? "견적요청"} - ${supplier?.business_name ?? "공급업체"} 문의`,
    status: "open",
    last_message_at: createdAt,
    created_at: createdAt,
    updated_at: createdAt,
  };
  const systemMessage = message(`msg-${Date.now()}`, threadId, "system", "system", "문의 스레드가 생성되었습니다.", "", "", true, createdAt);
  const nextData: AppData = {
    ...data,
    message_threads: [threadRecord, ...data.message_threads],
    messages: [systemMessage, ...data.messages],
    message_read_states: [
      readState(`mrs-${threadId}-buyer`, threadId, threadRecord.buyer_id, 0, createdAt),
      readState(`mrs-${threadId}-supplier`, threadId, supplierUserId(supplierId), 0, createdAt),
      ...data.message_read_states,
    ],
  };
  saveData(nextData);
  return { data: nextData, threadId };
}

export function ensureDealMessageThread(data: AppData, dealId: string): { data: AppData; threadId: string } {
  const existing = data.message_threads.find((entry) => entry.thread_type === "deal" && entry.related_entity_id === dealId);
  if (existing) return { data, threadId: existing.id };
  const dealRecord = data.deals.find((entry) => entry.id === dealId);
  if (!dealRecord) return { data, threadId: "" };
  const createdAt = new Date().toISOString();
  const threadId = `thread-${dealId}-${Date.now()}`;
  const threadRecord = messageThread(threadId, "deal", dealId, dealRecord.buyer_id, dealRecord.supplier_id, `${dealRecord.title} 거래 문의`, "open", createdAt);
  const systemMessage = message(`msg-${Date.now()}`, threadId, "system", "system", "거래가 생성되었습니다.", "", "", true, createdAt);
  const nextData: AppData = {
    ...data,
    message_threads: [threadRecord, ...data.message_threads],
    messages: [systemMessage, ...data.messages],
    message_read_states: [
      readState(`mrs-${threadId}-buyer`, threadId, dealRecord.buyer_id, 0, createdAt),
      readState(`mrs-${threadId}-supplier`, threadId, supplierUserId(dealRecord.supplier_id), 0, createdAt),
      ...data.message_read_states,
    ],
  };
  saveData(nextData);
  return { data: nextData, threadId };
}

export function sendThreadMessage(
  data: AppData,
  threadId: string,
  senderId: string,
  senderRole: Message["sender_role"],
  body: string,
  attachmentName = "",
): AppData {
  if (!body.trim() && !attachmentName.trim()) return data;
  const thread = data.message_threads.find((entry) => entry.id === threadId);
  if (!thread) return data;
  if (thread.status === "closed" || thread.status === "blocked" || thread.status === "archived") return data;
  const participantIds = threadRecipientIds(thread);
  if (senderRole !== "admin" && senderRole !== "system" && !participantIds.includes(senderId)) return data;
  const createdAt = new Date().toISOString();
  const suspicious = detectSuspiciousMessage(body);
  const messageRecord = message(
    `msg-${Date.now()}`,
    threadId,
    senderId,
    senderRole,
    body.trim(),
    attachmentName.trim() ? "#" : "",
    attachmentName.trim(),
    false,
    createdAt,
    attachmentName.trim() ? "file" : body.trim().length < 80 ? "template" : "text",
    suspicious.reason,
  );
  const recipients = threadRecipientIds(thread).filter((userId) => userId !== senderId);
  let nextData: AppData = {
    ...data,
    messages: [messageRecord, ...data.messages],
    message_threads: data.message_threads.map((entry) =>
      entry.id === threadId ? { ...entry, is_admin_watching: entry.is_admin_watching || suspicious.isSuspicious, last_message_at: createdAt, updated_at: createdAt } : entry,
    ),
    message_read_states: updateMessageUnreadCounts(data.message_read_states, thread, recipients, createdAt),
  };

  recipients.forEach((recipientId) => {
    const recipientRole = recipientId === thread.buyer_id ? "buyer" : recipientId === "admin-1" ? "admin" : "supplier";
    const notificationType: NotificationType =
      thread.thread_type === "deal"
        ? "deal_message_received"
        : senderRole === "buyer"
          ? "buyer_quote_question"
          : senderRole === "supplier"
            ? "supplier_message_received"
            : "message_received";
    nextData = appendNotification(nextData, {
      user_id: recipientId,
      user_role: recipientRole,
      type: notificationType,
      title: thread.thread_type === "deal" ? "거래 문의 메시지가 도착했어요." : senderRole === "buyer" ? "구매자 문의가 도착했어요." : senderRole === "supplier" ? "공급업체 답변이 도착했어요." : "문의 메시지가 도착했어요.",
      body: thread.title,
      link_url:
        recipientRole === "supplier"
          ? thread.thread_type === "deal"
            ? `/app/supplier/deals/${thread.related_entity_id}/messages`
            : `/app/supplier/requests/${thread.related_entity_id}/messages`
          : thread.thread_type === "deal"
            ? `/app/deals/${thread.related_entity_id}/messages`
            : `/app/requests/${thread.related_entity_id}/messages`,
      related_entity_type: "message",
      related_entity_id: threadId,
      priority: "normal",
      actor_user_id: senderId,
    });
  });

  if (suspicious.isSuspicious && senderRole !== "admin" && senderRole !== "system") {
    nextData = appendNotification(nextData, {
      user_id: "admin-1",
      user_role: "admin",
      type: suspicious.keyword?.includes("계좌") || suspicious.keyword?.includes("결제") || suspicious.keyword?.includes("입금") || suspicious.keyword?.includes("송금") ? "external_payment_keyword_detected" : "suspicious_chat_detected",
      title: "외부거래 의심 메시지가 감지되었습니다.",
      body: `${thread.title} · ${suspicious.keyword}`,
      link_url: `/app/admin/chats/${threadId}`,
      related_entity_type: "message",
      related_entity_id: messageRecord.id,
      priority: "urgent",
      actor_user_id: senderId,
    });
  }

  saveData(nextData);
  return nextData;
}

export function markThreadAsRead(data: AppData, threadId: string, userId: string): AppData {
  const readAt = new Date().toISOString();
  const nextData: AppData = {
    ...data,
    message_read_states: data.message_read_states.map((entry) =>
      entry.thread_id === threadId && entry.user_id === userId ? { ...entry, unread_count: 0, last_read_at: readAt, updated_at: readAt } : entry,
    ),
    messages: data.messages.map((entry) => (entry.thread_id === threadId && entry.sender_id !== userId ? { ...entry, is_read: true, read_at: entry.read_at ?? readAt } : entry)),
  };
  saveData(nextData);
  return nextData;
}

export function reportMessage(data: AppData, threadId: string, messageId: string, reportedBy: string, reason: string, detail: string): AppData {
  const createdAt = new Date().toISOString();
  const thread = data.message_threads.find((entry) => entry.id === threadId);
  const reportRecord: MessageReport = {
    id: `mreport-${Date.now()}`,
    thread_id: threadId,
    message_id: messageId,
    reported_by: reportedBy,
    reason,
    detail,
    status: "pending",
    created_at: createdAt,
    updated_at: createdAt,
  };
  let nextData: AppData = {
    ...data,
    message_reports: [reportRecord, ...data.message_reports],
    message_threads: data.message_threads.map((entry) => (entry.id === threadId ? { ...entry, status: "reported", updated_at: createdAt } : entry)),
  };
  nextData = appendNotification(nextData, {
    user_id: "admin-1",
    user_role: "admin",
    type: "chat_reported",
    title: "문의 메시지 신고가 접수되었습니다.",
    body: thread?.title ?? "문의 스레드 신고",
    link_url: `/app/admin/chats/${threadId}`,
    related_entity_type: "message",
    related_entity_id: messageId,
    priority: "urgent",
    actor_user_id: reportedBy,
  });
  saveData(nextData);
  return nextData;
}

export function updateMessageReportStatus(data: AppData, reportId: string, status: MessageReport["status"]): AppData {
  const updatedAt = new Date().toISOString();
  const nextData: AppData = {
    ...data,
    message_reports: data.message_reports.map((entry) => (entry.id === reportId ? { ...entry, status, updated_at: updatedAt } : entry)),
  };
  saveData(nextData);
  return nextData;
}

export function closeMessageThread(data: AppData, threadId: string): AppData {
  const updatedAt = new Date().toISOString();
  const nextData: AppData = {
    ...data,
    message_threads: data.message_threads.map((entry) => (entry.id === threadId ? { ...entry, status: "closed", updated_at: updatedAt } : entry)),
  };
  saveData(nextData);
  return nextData;
}

export function blockMessageThread(data: AppData, threadId: string, adminMemo: string): AppData {
  const updatedAt = new Date().toISOString();
  const nextData: AppData = {
    ...data,
    message_threads: data.message_threads.map((entry) =>
      entry.id === threadId ? { ...entry, status: "blocked", admin_memo: adminMemo.trim() || entry.admin_memo, is_admin_watching: true, updated_at: updatedAt } : entry,
    ),
  };
  saveData(nextData);
  return nextData;
}

export function updateMessageThreadAdminMemo(data: AppData, threadId: string, adminMemo: string): AppData {
  const updatedAt = new Date().toISOString();
  const nextData: AppData = {
    ...data,
    message_threads: data.message_threads.map((entry) =>
      entry.id === threadId ? { ...entry, admin_memo: adminMemo.trim(), is_admin_watching: true, updated_at: updatedAt } : entry,
    ),
  };
  saveData(nextData);
  return nextData;
}

function groupPurchases(records: PurchaseRecord[], getter: (record: PurchaseRecord) => string) {
  const grouped = records.reduce<Record<string, { label: string; count: number; totalAmount: number; savingsAmount: number }>>((acc, record) => {
    const label = getter(record) || "미분류";
    if (!acc[label]) acc[label] = { label, count: 0, totalAmount: 0, savingsAmount: 0 };
    acc[label].count += 1;
    acc[label].totalAmount += record.total_amount;
    acc[label].savingsAmount += record.estimated_savings_amount;
    return acc;
  }, {});

  return Object.values(grouped).sort((a, b) => b.totalAmount - a.totalAmount);
}

function parseLineToAnalysisItem(line: string, analysisJobId: string, index: number, createdAt: string): AnalysisItem {
  const amountMatch = line.match(/(\d[\d,]*)\s*원/);
  const totalPrice = amountMatch ? Number(amountMatch[1].replace(/,/g, "")) : 0;
  const quantityMatches = [...line.matchAll(/(\d[\d,]*)\s*(kg|키로|g|개|장|통|망|BOX|box|m|L|리터)/gi)];
  const koreanOneMatch = line.match(/한\s*(망|통|개|장)/);
  const quantityMatch = quantityMatches.length > 1 ? quantityMatches[quantityMatches.length - 1] : quantityMatches[0];
  const quantity = quantityMatch ? Number(quantityMatch[1].replace(/,/g, "")) : koreanOneMatch ? 1 : 1;
  const unit = quantityMatch ? normalizeUnit(quantityMatch[2]) : koreanOneMatch ? koreanOneMatch[1] : "개";
  const spec = quantityMatches.map((match) => `${match[1]}${normalizeUnit(match[2])}`).join(" ") || (koreanOneMatch ? koreanOneMatch[0] : "");
  const itemName = line
    .replace(amountMatch?.[0] ?? "", "")
    .replace(/(\d[\d,]*)\s*(kg|키로|g|개|장|통|망|BOX|box|m|L|리터)/gi, "")
    .replace(/한\s*(망|통|개|장)/g, "")
    .replace(/대자|대형|중형|소형/g, "")
    .trim();
  const normalizedName = itemName || line.slice(0, 18);
  const categoryName = detectCategoryFromText(normalizedName);
  const unitPrice = totalPrice && quantity ? Math.round(totalPrice / quantity) : 0;
  const confidence = totalPrice ? 84 : 68;
  return {
    id: `${analysisJobId}-item-${index + 1}`,
    analysis_job_id: analysisJobId,
    item_name: normalizedName,
    normalized_item_name: normalizedName.replace(/\s+/g, ""),
    spec,
    quantity,
    unit,
    unit_price: unitPrice,
    total_price: totalPrice,
    memo: "",
    category_name: categoryName,
    confidence_score: confidence,
    review_status: totalPrice && itemName ? "extracted" : "needs_review",
    review_reason: totalPrice ? "" : "금액 또는 단위를 확인해주세요.",
    created_at: createdAt,
    updated_at: createdAt,
  };
}

function normalizeUnit(unit: string) {
  if (unit.toLowerCase() === "box") return "BOX";
  if (unit === "키로") return "kg";
  if (unit === "리터") return "L";
  return unit;
}

function formatWon(value: number) {
  if (!value) return "확인 필요";
  return `${new Intl.NumberFormat("ko-KR", { maximumFractionDigits: 0 }).format(value)}원`;
}

function detectCategoryFromAnalysisItems(items: AnalysisItem[]) {
  const scores = items.reduce<Record<string, number>>((acc, itemEntry) => {
    acc[itemEntry.category_name] = (acc[itemEntry.category_name] ?? 0) + 1;
    return acc;
  }, {});
  return Object.entries(scores).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "기타";
}

function detectCategoryFromText(text: string) {
  if (/삼겹살|양파|식용유|쌈장|닭|정육|채소|고기|식품/.test(text)) return "식자재";
  if (/봉투|박스|컵|소스컵|포장|라벨|용기/.test(text)) return "포장재";
  if (/장갑|세제|휴지|청소|소모/.test(text)) return "소모품";
  if (/닥트|덕트|후렉시블|디퓨저|댐퍼|환기/.test(text)) return "설비/닥트/환기자재";
  if (/공구|안전|산업/.test(text)) return "공구/산업자재";
  return "기타";
}

function normalizeDetectedCategory(category: string) {
  if (["매입비", "포장재비", "소모품비", "수선비", "시설비", "공구소모품비", "자재구매"].includes(category)) {
    if (category === "매입비") return "식자재";
    if (category === "포장재비") return "포장재";
    if (category === "소모품비") return "소모품";
    if (category === "수선비") return "설비/닥트/환기자재";
    if (category === "공구소모품비") return "공구/산업자재";
  }
  return category || "기타";
}

function detectSupplierFromText(text: string, fileName: string) {
  const known = ["동대문식자재", "서울포장", "충주닥트자재", "경기소모품센터"];
  return known.find((name) => text.includes(name) || fileName.includes(name)) ?? "";
}

function detectBusinessNumber(text: string) {
  return text.match(/\d{3}-\d{2}-\d{5}/)?.[0] ?? "";
}

function fileTypeFromName(fileName: string) {
  return fileName.split(".").pop()?.toLowerCase() ?? "";
}

function todayLikeDate(value: string) {
  return value.slice(0, 10);
}

function defaultAnalysisFileName(sourceType: AnalysisSourceType) {
  const names: Record<AnalysisSourceType, string> = {
    invoice: "거래명세서_샘플.jpg",
    quotation: "견적서_샘플.pdf",
    receipt: "영수증_샘플.jpg",
    delivery_note: "납품서_샘플.pdf",
    tax_invoice: "세금계산서_샘플.pdf",
    photo: "품목사진_샘플.jpg",
    excel: "품목목록_샘플.xlsx",
    text: "카톡주문_샘플.txt",
    etc: "분석자료_샘플.txt",
  };
  return names[sourceType];
}

function defaultAnalysisText(sourceType: AnalysisSourceType) {
  if (sourceType === "quotation" || sourceType === "invoice") {
    return "치킨박스 1000개 210,000원\n소스컵 2000개 80,000원\n배달봉투 대형 1000장 95,000원";
  }
  if (sourceType === "excel") {
    return "스파이럴덕트 300파이 10m 550,000원\n후렉시블 300파이 2BOX 320,000원\n디퓨저 4개 180,000원\n댐퍼 2개 200,000원";
  }
  if (sourceType === "receipt" || sourceType === "tax_invoice") {
    return "삼겹살 30kg 450,000원\n양파 15kg 32,000원\n쌈장 14kg 58,000원\n식용유 18L 2통 76,000원";
  }
  return "삼겹살 30키로\n양파 한 망\n식용유 18리터 2통\n배달봉투 대자 1000장";
}

function receiptAnalysisProfile(fileName: string) {
  const normalized = fileName.toLowerCase();
  if (/카페|커피|컵|홀더|빨대/.test(normalized)) {
    return {
      supplierName: "성수카페팩",
      categoryName: "포장재",
      rawText: "아이스컵 16oz 1000개 72,000원\n돔뚜껑 98파이 1000개 45,000원\n종이빨대 1000개 18,000원\n컵홀더 1000개 36,000원\n컵캐리어 200개 24,000원\n합계 195,000원",
    };
  }
  if (/식자재|마트|고기|삼겹|정육|야채|시장|영수증/.test(normalized) && !/치킨|포장|박스|봉투|컵/.test(normalized)) {
    return {
      supplierName: "동대문식자재",
      categoryName: "식자재",
      rawText: "삼겹살 30kg 450,000원\n양파 15kg 32,000원\n쌈장 14kg 58,000원\n식용유 18L 2통 76,000원\n합계 616,000원",
    };
  }
  if (/닥트|덕트|환기|후드/.test(normalized)) {
    return {
      supplierName: "충주닥트자재",
      categoryName: "설비/닥트/환기자재",
      rawText: "스파이럴덕트 300파이 10m 550,000원\n후렉시블 300파이 2BOX 320,000원\n디퓨저 4개 180,000원\n댐퍼 2개 200,000원\n합계 1,250,000원",
    };
  }
  return {
    supplierName: "서울포장",
    categoryName: "포장재",
    rawText: "치킨박스 1,000개 210,000원\n소스컵 2,000개 80,000원\n배달봉투 대형 1,000장 95,000원\n나무젓가락 1,000개 28,000원\n물티슈 1,000개 35,000원\n합계 448,000원",
  };
}

function incrementQuoteUsage(data: AppData, supplierId: string, updatedAt: string): AppData {
  const plan = getSupplierCurrentPlan(data, supplierId);
  const currentUsage = getSupplierUsageForCurrentPeriod(data, supplierId);
  const nextUsage: SupplierUsage = {
    ...currentUsage,
    quotes_submitted_count: currentUsage.quotes_submitted_count + 1,
    updated_at: updatedAt,
  };
  const nextCredit = data.quote_participation_credits.find((credit) => credit.supplier_id === supplierId && credit.expires_at >= updatedAt.slice(0, 10));
  let nextData: AppData = {
    ...data,
    supplier_usage: data.supplier_usage.some((usage) => usage.id === currentUsage.id)
      ? data.supplier_usage.map((usage) => (usage.id === currentUsage.id ? nextUsage : usage))
      : [nextUsage, ...data.supplier_usage],
    quote_participation_credits: nextCredit
      ? data.quote_participation_credits.map((credit) =>
          credit.id === nextCredit.id
            ? { ...credit, used_credits: credit.used_credits + 1, remaining_credits: Math.max(0, credit.remaining_credits - 1), updated_at: updatedAt }
            : credit,
        )
      : data.quote_participation_credits,
  };
  const remaining = plan.quote_participation_limit <= 0 ? Infinity : Math.max(0, plan.quote_participation_limit - nextUsage.quotes_submitted_count);
  if (remaining === 1) {
    nextData = appendNotification(nextData, {
      user_id: supplierUserId(supplierId),
      user_role: "supplier",
      type: "usage_limit_warning",
      title: "견적 참여 한도가 거의 다 찼습니다.",
      body: `이번 달 ${plan.name} 플랜 견적 참여 가능 건수가 1건 남았습니다.`,
      link_url: "/app/supplier/billing",
      related_entity_type: "supplier_plan",
      related_entity_id: plan.id,
      priority: "high",
      actor_user_id: "system",
    });
  }
  if (remaining === 0) {
    nextData = appendNotification(nextData, {
      user_id: supplierUserId(supplierId),
      user_role: "supplier",
      type: "usage_limit_reached",
      title: "이번 달 견적 참여 한도에 도달했습니다.",
      body: `${plan.name} 플랜 월 견적 참여 ${plan.quote_participation_limit}건을 모두 사용했습니다.`,
      link_url: "/app/supplier/billing",
      related_entity_type: "supplier_plan",
      related_entity_id: plan.id,
      priority: "high",
      actor_user_id: "system",
    });
    nextData = appendNotification(nextData, {
      user_id: adminUserId(nextData),
      user_role: "admin",
      type: "supplier_usage_limit_reached",
      title: "공급업체가 견적 참여 한도에 도달했습니다.",
      body: `${supplierNameFromId(nextData, supplierId)}가 ${plan.name} 플랜 한도에 도달했습니다.`,
      link_url: "/app/admin/plans",
      related_entity_type: "supplier_plan",
      related_entity_id: plan.id,
      priority: "normal",
      actor_user_id: "system",
    });
  }
  return nextData;
}

function ensurePlatformFeeForCompletedDeal(data: AppData, dealRecord: Deal, updatedAt: string): { data: AppData; fee?: PlatformFee; created: boolean } {
  const existing = data.platform_fees.find((fee) => fee.deal_id === dealRecord.id);
  if (existing) {
    return { data, fee: existing, created: false };
  }
  const policy = getCommissionPolicyForCategory(data, dealRecord.category_name);
  const calculated = calculatePlatformFee(dealRecord, policy);
  const { periodStart, periodEnd, dueDate } = settlementPeriodFor(updatedAt);
  const settlementId = `settlement-${dealRecord.supplier_id}-${periodStart.slice(0, 7)}`;
  const fee: PlatformFee = {
    id: `fee-${dealRecord.id}`,
    deal_id: dealRecord.id,
    supplier_id: dealRecord.supplier_id,
    buyer_id: dealRecord.buyer_id,
    category_name: dealRecord.category_name,
    deal_final_amount: dealRecord.final_amount,
    commission_rate: policy.commission_rate,
    fee_amount: calculated.fee_amount,
    vat_amount: calculated.vat_amount,
    total_fee_amount: calculated.total_fee_amount,
    fee_status: "pending",
    settlement_id: settlementId,
    settlement_mode: "direct_supplier_payment",
    is_waived: false,
    waiver_reason: "",
    waived_by_admin_id: "",
    created_at: updatedAt,
    updated_at: updatedAt,
  };
  const item: SettlementItem = {
    id: `sitem-${dealRecord.id}`,
    settlement_id: settlementId,
    deal_id: dealRecord.id,
    platform_fee_id: fee.id,
    deal_final_amount: dealRecord.final_amount,
    fee_amount: fee.fee_amount,
    vat_amount: fee.vat_amount,
    settlement_amount: Math.max(0, dealRecord.final_amount - fee.fee_amount - fee.vat_amount),
    created_at: updatedAt,
  };
  const existingSettlement = data.settlements.find((entry) => entry.id === settlementId);
  let nextData: AppData = {
    ...data,
    platform_fees: [fee, ...data.platform_fees],
    settlement_items: [item, ...data.settlement_items],
    settlements: existingSettlement
      ? data.settlements
      : [
          {
            id: settlementId,
            supplier_id: dealRecord.supplier_id,
            period_start: periodStart,
            period_end: periodEnd,
            total_deal_amount: 0,
            total_platform_fee: 0,
            total_vat_amount: 0,
            total_settlement_amount: 0,
            status: "pending",
            payout_due_date: dueDate,
            memo: "거래 완료로 자동 생성된 정산 예정 내역입니다.",
            created_at: updatedAt,
            updated_at: updatedAt,
          },
          ...data.settlements,
        ],
    billing_events: [billingEvent(`bevent-${Date.now()}`, "platform_fee_created", dealRecord.supplier_id, dealRecord.id, "", fee.fee_amount, "pending", { fee_id: fee.id }), ...data.billing_events],
  };
  nextData = recalculateSettlementTotals(nextData, settlementId);
  return { data: nextData, fee, created: true };
}

function recalculateSettlementTotals(data: AppData, settlementId: string): AppData {
  const items = data.settlement_items.filter((item) => item.settlement_id === settlementId);
  const totalDealAmount = items.reduce((sum, item) => sum + item.deal_final_amount, 0);
  const totalPlatformFee = items.reduce((sum, item) => sum + item.fee_amount, 0);
  const totalVatAmount = items.reduce((sum, item) => sum + item.vat_amount, 0);
  const totalSettlementAmount = items.reduce((sum, item) => sum + item.settlement_amount, 0);
  return {
    ...data,
    settlements: data.settlements.map((settlementEntry) =>
      settlementEntry.id === settlementId
        ? {
            ...settlementEntry,
            total_deal_amount: totalDealAmount,
            total_platform_fee: totalPlatformFee,
            total_vat_amount: totalVatAmount,
            total_settlement_amount: totalSettlementAmount,
            updated_at: new Date().toISOString(),
          }
        : settlementEntry,
    ),
  };
}

function settlementPeriodFor(value: string) {
  const date = new Date(value);
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth();
  const periodStartDate = new Date(Date.UTC(year, month, 1));
  const periodEndDate = new Date(Date.UTC(year, month + 1, 0));
  const dueDate = new Date(Date.UTC(year, month + 1, 5));
  return {
    periodStart: periodStartDate.toISOString().slice(0, 10),
    periodEnd: periodEndDate.toISOString().slice(0, 10),
    dueDate: dueDate.toISOString().slice(0, 10),
  };
}

function appendNotification(
  data: AppData,
  input: Omit<Notification, "id" | "is_read" | "read_at" | "is_archived" | "created_at"> & { actor_user_id?: string },
): AppData {
  const createdAt = new Date().toISOString();
  const settings = data.notification_settings.find((entry) => entry.user_id === input.user_id) ?? notificationSettings(`nsetting-${input.user_id}`, input.user_id);
  const shouldCreate = settings.in_app_enabled && notificationTypeEnabled(settings, input.type);
  const eventRecord = notificationEvent(
    `nevent-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    input.type,
    input.actor_user_id ?? "system",
    input.user_id,
    input.user_role,
    input.related_entity_type,
    input.related_entity_id,
    { title: input.title, link_url: input.link_url },
    shouldCreate ? "sent" : "skipped",
    createdAt,
  );
  if (!shouldCreate) {
    return {
      ...data,
      notification_events: [eventRecord, ...data.notification_events],
      notification_settings: data.notification_settings.some((entry) => entry.user_id === input.user_id)
        ? data.notification_settings
        : [settings, ...data.notification_settings],
    };
  }
  const notificationRecord = notification(
    `notif-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    input.user_id,
    input.user_role,
    input.type,
    input.title,
    input.body,
    input.link_url,
    input.related_entity_type,
    input.related_entity_id,
    input.priority,
    false,
    createdAt,
  );
  return {
    ...data,
    notifications: [notificationRecord, ...data.notifications],
    notification_events: [eventRecord, ...data.notification_events],
    notification_settings: data.notification_settings.some((entry) => entry.user_id === input.user_id)
      ? data.notification_settings
      : [settings, ...data.notification_settings],
  };
}

function notificationTypeEnabled(settings: NotificationSettings, type: NotificationType) {
  if (["quote_received", "quote_updated", "quote_expiring", "quote_selected", "quote_rejected", "new_matched_request", "request_updated"].includes(type)) {
    return settings.quote_notifications_enabled;
  }
  if (type.startsWith("deal_") || ["high_value_deal_created"].includes(type)) return settings.deal_notifications_enabled;
  if (type.startsWith("analysis_")) return settings.analysis_notifications_enabled;
  if (["purchase_record_created", "accounting_sync_ready"].includes(type)) return settings.accounting_notifications_enabled;
  if (type.includes("message")) return settings.message_notifications_enabled;
  return true;
}

function supplierUserId(supplierId: string) {
  return `${supplierId}-user`;
}

function threadRecipientIds(thread: MessageThread) {
  const recipients = [thread.buyer_id, supplierUserId(thread.supplier_id)];
  if (thread.status === "reported") recipients.push(thread.admin_id);
  return Array.from(new Set(recipients));
}

function updateMessageUnreadCounts(states: MessageReadState[], thread: MessageThread, recipients: string[], updatedAt: string) {
  const nextStates = [...states];
  recipients.forEach((userId) => {
    const index = nextStates.findIndex((entry) => entry.thread_id === thread.id && entry.user_id === userId);
    if (index >= 0) {
      nextStates[index] = {
        ...nextStates[index],
        unread_count: nextStates[index].unread_count + 1,
        updated_at: updatedAt,
      };
    } else {
      nextStates.unshift(readState(`mrs-${thread.id}-${userId}-${Date.now()}`, thread.id, userId, 1, updatedAt));
    }
  });
  return nextStates;
}

function adminUserId(data: AppData) {
  return data.profiles.find((entry) => entry.role === "admin")?.id ?? "admin-1";
}

function buyerName(data: AppData, buyerId: string) {
  return data.profiles.find((entry) => entry.id === buyerId)?.business_name ?? "구매자";
}

function supplierNameFromId(data: AppData, supplierId: string) {
  return data.supplier_profiles.find((entry) => entry.id === supplierId)?.business_name ?? "공급업체";
}

function dealStatusNotificationTitle(status: DealStatus) {
  const titles: Partial<Record<DealStatus, string>> = {
    confirmed: "공급업체가 거래를 수락했어요.",
    preparing: "납품 준비가 시작되었습니다.",
    delivering: "배송/납품이 시작되었습니다.",
    delivered: "납품 완료로 처리되었습니다.",
  };
  return titles[status] ?? "거래 상태가 변경되었습니다.";
}

function appendDealStatusMessage(data: AppData, dealId: string, statusLabel: string, createdAt: string): AppData {
  const thread = data.message_threads.find((entry) => entry.thread_type === "deal" && entry.related_entity_id === dealId);
  if (!thread) return data;
  const systemMessage = message(`msg-system-${Date.now()}`, thread.id, "system", "system", statusLabel, "", "", true, createdAt);
  return {
    ...data,
    messages: [systemMessage, ...data.messages],
    message_threads: data.message_threads.map((entry) => (entry.id === thread.id ? { ...entry, last_message_at: createdAt, updated_at: createdAt } : entry)),
  };
}

function profile(
  id: string,
  name: string,
  email: string,
  role: "buyer" | "supplier" | "admin",
  business_name: string,
  business_number: string,
  phone: string,
  region: string,
) {
  return { id, name, email, role, business_name, business_number, phone, region, created_at: now };
}

function betaParticipant(
  id: string,
  participantType: BetaParticipantType,
  status: BetaParticipantStatus,
  source: BetaParticipantSource,
  userId: string | undefined,
  businessName: string,
  contactName: string,
  phone: string,
  email: string,
  region: string,
  categoryInterest: string,
  memo: string,
  quoteRequestCount: number,
  quoteSelectedCount: number,
  dealCount: number,
  feedbackCount: number,
  tags: string[],
): BetaParticipant {
  return {
    id,
    user_id: userId,
    participant_type: participantType,
    source,
    status,
    assigned_admin_id: "admin-1",
    business_name: businessName,
    contact_name: contactName,
    phone,
    email,
    region,
    category_interest: categoryInterest,
    memo,
    quote_request_count: quoteRequestCount,
    quote_selected_count: quoteSelectedCount,
    deal_count: dealCount,
    feedback_count: feedbackCount,
    tags,
    invited_at: "2026-07-01T09:00:00.000Z",
    signed_up_at: ["signed_up", "onboarded", "active", "inactive", "dropped"].includes(status) ? "2026-07-02T10:00:00.000Z" : undefined,
    onboarded_at: ["onboarded", "active", "inactive", "dropped"].includes(status) ? "2026-07-03T10:00:00.000Z" : undefined,
    activated_at: status === "active" ? "2026-07-04T10:00:00.000Z" : undefined,
    dropped_at: status === "dropped" ? "2026-07-04T18:00:00.000Z" : undefined,
    created_at: now,
    updated_at: now,
  };
}

function salesLead(
  id: string,
  leadType: BetaParticipantType,
  businessName: string,
  contactName: string,
  phone: string,
  email: string,
  region: string,
  category: string,
  source: BetaParticipantSource,
  stage: SalesLeadStage,
  priority: SalesLeadPriority,
  nextAction: string,
  nextActionDate: string,
  memo: string,
): SalesLead {
  return {
    id,
    lead_type: leadType,
    business_name: businessName,
    contact_name: contactName,
    phone,
    email,
    region,
    category,
    source,
    stage,
    priority,
    assigned_admin_id: "admin-1",
    next_action: nextAction,
    next_action_date: nextActionDate,
    memo,
    created_at: now,
    updated_at: now,
  };
}

function salesActivity(id: string, leadId: string, activityType: SalesActivityType, result: SalesActivityResult, memo: string, activityAt: string): SalesActivity {
  return {
    id,
    lead_id: leadId,
    activity_type: activityType,
    result,
    memo,
    actor_id: "admin-1",
    activity_at: activityAt,
    created_at: activityAt,
  };
}

function betaExperiment(
  id: string,
  name: string,
  hypothesis: string,
  targetGroup: BetaExperimentTargetGroup,
  status: BetaExperimentStatus,
  successMetric: string,
  resultSummary: string,
  nextAction: string,
): BetaExperiment {
  return {
    id,
    name,
    hypothesis,
    target_group: targetGroup,
    start_date: "2026-07-01",
    end_date: "2026-07-31",
    status,
    success_metric: successMetric,
    result_summary: resultSummary,
    next_action: nextAction,
    created_at: now,
    updated_at: now,
  };
}

function feedbackInsight(
  id: string,
  feedbackId: string,
  category: BetaFeedbackInsightCategory,
  severity: BetaFeedbackInsightSeverity,
  impact: number,
  frequency: number,
  effort: number,
  decision: BetaFeedbackDecision,
  adminMemo: string,
): BetaFeedbackInsight {
  return {
    id,
    feedback_id: feedbackId,
    category,
    severity,
    priority_score: calculateFeedbackPriorityScore(impact, frequency, effort),
    impact,
    frequency,
    effort,
    decision,
    admin_memo: adminMemo,
    created_at: now,
    updated_at: now,
  };
}

function operatorTask(
  id: string,
  title: string,
  description: string,
  taskType: OperatorTaskType,
  status: OperatorTaskStatus,
  priority: SalesLeadPriority,
  relatedEntityType: string,
  relatedEntityId: string,
  dueDate: string,
): OperatorTask {
  return {
    id,
    title,
    description,
    task_type: taskType,
    status,
    priority,
    assigned_admin_id: "admin-1",
    related_entity_type: relatedEntityType,
    related_entity_id: relatedEntityId,
    due_date: dueDate,
    completed_at: status === "done" ? now : undefined,
    created_at: now,
    updated_at: now,
  };
}

function featureFlag(
  id: string,
  key: FeatureFlagKey,
  name: string,
  description: string,
  enabled: boolean,
  betaLabelEnabled: boolean,
  adminOnly: boolean,
): FeatureFlag {
  return {
    id,
    key,
    name,
    description,
    enabled,
    beta_label_enabled: betaLabelEnabled,
    admin_only: adminOnly,
    created_at: now,
    updated_at: now,
  };
}

function favoriteItemGroup(id: string, buyerId: string, name: string, categoryName: string, description: string): FavoriteItemGroup {
  return {
    id,
    buyer_id: buyerId,
    name,
    category_name: categoryName,
    description,
    created_at: now,
    updated_at: now,
  };
}

function favoriteItem(id: string, groupId: string, itemName: string, spec: string, quantity: number, unit: string, memo: string, allowAlternative: boolean): FavoriteItem {
  return {
    id,
    group_id: groupId,
    item_name: itemName,
    spec,
    quantity,
    unit,
    memo,
    allow_alternative: allowAlternative,
    created_at: now,
    updated_at: now,
  };
}

function categoryPlaybook(
  id: string,
  categoryName: string,
  targetBuyers: string[],
  supplierTypes: string[],
  representativeItems: string[],
  requestTemplate: string,
  supplierSalesPoints: string[],
  buyerMessage: string,
  commonIssues: string[],
  operatorResponse: string[],
  successKpis: string[],
): CategoryPlaybook {
  return {
    id,
    category_name: categoryName,
    target_buyers: targetBuyers,
    supplier_types: supplierTypes,
    representative_items: representativeItems,
    request_template: requestTemplate,
    supplier_sales_points: supplierSalesPoints,
    buyer_message: buyerMessage,
    common_issues: commonIssues,
    operator_response: operatorResponse,
    success_kpis: successKpis,
    created_at: now,
    updated_at: now,
  };
}

function roadmapItem(
  id: string,
  title: string,
  description: string,
  week: RoadmapItem["week"],
  priority: SalesLeadPriority,
  ownerId: string,
  status: RoadmapItemStatus,
  successMetric: string,
): RoadmapItem {
  return {
    id,
    title,
    description,
    week,
    priority,
    owner_id: ownerId,
    status,
    success_metric: successMetric,
    created_at: now,
    updated_at: now,
  };
}

function supplier(
  id: string,
  businessName: string,
  region: string,
  serviceRegions: string[],
  supplierCategories: string[],
  taxInvoice: boolean,
  cardPayment: boolean,
  approval_status: SupplierProfile["approval_status"],
): SupplierProfile {
  const detail = supplierDetail(id, businessName, supplierCategories, serviceRegions);
  return {
    id,
    user_id: `${id}-user`,
    business_name: businessName,
    business_number: detail.business_number,
    representative_name: detail.representative_name,
    manager_name: detail.manager_name,
    manager_phone: detail.manager_phone,
    phone: detail.phone,
    email: detail.email,
    address: region,
    description: detail.description,
    service_regions: serviceRegions,
    categories: supplierCategories,
    sub_categories: detail.sub_categories,
    min_order_amount: detail.min_order_amount,
    delivery_fee_policy: detail.delivery_fee_policy,
    free_delivery_min_amount: detail.free_delivery_min_amount,
    same_day_delivery_available: detail.same_day_delivery_available,
    urgent_delivery_available: detail.urgent_delivery_available,
    delivery_days: detail.delivery_days,
    delivery_time_slots: detail.delivery_time_slots,
    tax_invoice_available: taxInvoice,
    card_payment_available: cardPayment,
    bank_transfer_available: true,
    on_site_payment_available: detail.on_site_payment_available,
    default_quote_valid_days: detail.default_quote_valid_days,
    approval_status,
    operational_status: id === "sup-4" ? "warning" : id === "sup-8" ? "suspended" : "normal",
    admin_memo: approval_status === "approved" ? "관리자 승인 완료" : approval_status === "needs_revision" ? "통장사본 재업로드 필요" : approval_status === "rejected" ? "취급 지역 확인 불가" : approval_status === "suspended" ? "운영 정책 검토 중" : "신규 신청 검토 대기",
    rejection_reason: approval_status === "rejected" ? "사업자 정보와 납품 가능 지역 증빙이 부족합니다." : "",
    created_at: now,
    updated_at: now,
  };
}

function supplierDetail(id: string, businessName: string, categoriesForSupplier: string[], serviceRegions: string[]) {
  const categoryName = categoriesForSupplier[0] ?? "기타";
  const subCategories = categoriesForSupplier.flatMap((category) => supplierSubCategoryOptions[category]?.slice(0, 4) ?? []);
  const base = {
    business_number: "123-45-67890",
    representative_name: `${businessName} 대표`,
    manager_name: "파트너 담당자",
    manager_phone: "010-0000-0000",
    phone: "02-000-0000",
    email: `${id}@supplier.ssawa.local`,
    description: `${serviceRegions.join(", ")} 지역에서 ${categoriesForSupplier.join(", ")} 견적을 빠르게 대응합니다.`,
    sub_categories: subCategories,
    min_order_amount: 100000,
    delivery_fee_policy: "지역/금액에 따라 배송비 협의",
    free_delivery_min_amount: 300000,
    same_day_delivery_available: false,
    urgent_delivery_available: false,
    delivery_days: ["월", "화", "수", "목", "금"],
    delivery_time_slots: ["오전", "오후"],
    on_site_payment_available: false,
    default_quote_valid_days: 3,
  };

  const overrides: Record<string, Partial<typeof base>> = {
    "sup-1": {
      business_number: "101-22-33445",
      representative_name: "이포장",
      manager_name: "최민지",
      manager_phone: "010-1111-3001",
      phone: "02-2233-1000",
      description: "배달용기, 소스컵, 박스류를 빠르게 견적하는 서울 포장재 파트너입니다.",
      min_order_amount: 100000,
      free_delivery_min_amount: 500000,
      delivery_fee_policy: "서울 중심권 50만원 이상 무료배송",
      same_day_delivery_available: true,
      urgent_delivery_available: true,
      delivery_time_slots: ["오전", "오후", "야간 협의"],
    },
    "sup-2": {
      business_number: "204-88-12001",
      representative_name: "정식재",
      manager_name: "김소연",
      manager_phone: "010-2222-3002",
      phone: "02-963-2000",
      description: "식당용 육류, 채소, 양념류를 새벽 납품 중심으로 공급합니다.",
      min_order_amount: 200000,
      free_delivery_min_amount: 700000,
      delivery_fee_policy: "동대문 권역 20만원 이상 배송 가능",
      same_day_delivery_available: true,
      delivery_time_slots: ["새벽", "오전"],
    },
    "sup-3": {
      business_number: "303-11-77889",
      representative_name: "박닥트",
      manager_name: "오현장",
      manager_phone: "010-3333-3003",
      phone: "043-851-3000",
      description: "충주권 주방 환기, 닥트, 배기 자재를 현장 규격에 맞춰 제안합니다.",
      min_order_amount: 150000,
      free_delivery_min_amount: 800000,
      delivery_fee_policy: "현장 거리와 자재 부피 기준 협의",
      urgent_delivery_available: true,
      delivery_days: ["월", "화", "수", "목", "금", "토"],
    },
    "sup-4": {
      business_number: "132-44-55667",
      representative_name: "윤소모",
      manager_name: "문지훈",
      manager_phone: "010-4444-3004",
      phone: "031-555-4000",
      description: "매장 소모품과 산업 공구류를 소량 주문부터 대응합니다.",
      min_order_amount: 50000,
      free_delivery_min_amount: 300000,
      same_day_delivery_available: true,
      urgent_delivery_available: true,
    },
  };

  return { ...base, ...overrides[id], sub_categories: overrides[id]?.sub_categories ?? subCategories, description: overrides[id]?.description ?? `${businessName}은 ${categoryName} 중심 공급업체입니다.` };
}

function supplierDocument(
  id: string,
  supplierId: string,
  documentType: SupplierDocumentType,
  fileName: string,
  status: SupplierDocumentStatus,
): SupplierDocument {
  return {
    id,
    supplier_id: supplierId,
    document_type: documentType,
    file_url: "#",
    file_name: fileName,
    status,
    uploaded_at: now,
    reviewed_at: status === "approved" || status === "rejected" ? now : undefined,
  };
}

function supplierStats(
  id: string,
  supplierId: string,
  totalQuotes: number,
  selectedQuotes: number,
  responseRate: number,
  averageResponseMinutes: number,
  totalDealAmount: number,
  repeatCustomerRate: number,
  rating: number,
  reviewCount: number,
): SupplierStats {
  return {
    id,
    supplier_id: supplierId,
    total_quotes_submitted: totalQuotes,
    selected_quotes_count: selectedQuotes,
    response_rate: responseRate,
    average_response_minutes: averageResponseMinutes,
    total_deal_amount: totalDealAmount,
    repeat_customer_rate: repeatCustomerRate,
    rating,
    review_count: reviewCount,
    updated_at: now,
  };
}

function supplierReview(id: string, supplierId: string, buyerId: string, requestId: string, rating: number, content: string) {
  return {
    id,
    supplier_id: supplierId,
    buyer_id: buyerId,
    quote_request_id: requestId,
    rating,
    content,
    created_at: now,
  };
}

const SUPPLIER_VISIBLE_MATCH_THRESHOLD = 70;

function normalizeCategoryForMatch(value: string): string {
  return value.trim().replace(/\s+/g, "");
}

function matchesSupplierCategory(supplier: SupplierProfile, categoryName: string): boolean {
  const targetCategory = normalizeCategoryForMatch(categoryName);
  return supplier.categories.some((category) => normalizeCategoryForMatch(category) === targetCategory);
}

function normalizeRegionForMatch(value: string): string {
  return value
    .trim()
    .replace(/[,\u00b7/]+/g, " ")
    .replace(/\s+/g, " ")
    .replace(/서울특별시/g, "서울")
    .replace(/부산광역시/g, "부산")
    .replace(/대구광역시/g, "대구")
    .replace(/인천광역시/g, "인천")
    .replace(/광주광역시/g, "광주")
    .replace(/대전광역시/g, "대전")
    .replace(/울산광역시/g, "울산")
    .replace(/세종특별자치시/g, "세종")
    .replace(/경기도/g, "경기")
    .replace(/강원특별자치도/g, "강원")
    .replace(/강원도/g, "강원")
    .replace(/충청북도/g, "충북")
    .replace(/충청남도/g, "충남")
    .replace(/전라북도/g, "전북")
    .replace(/전북특별자치도/g, "전북")
    .replace(/전라남도/g, "전남")
    .replace(/경상북도/g, "경북")
    .replace(/경상남도/g, "경남")
    .replace(/제주특별자치도/g, "제주");
}

function compactRegionForMatch(value: string): string {
  return normalizeRegionForMatch(value).replace(/\s+/g, "");
}

function regionTokens(value: string): string[] {
  return normalizeRegionForMatch(value).split(/\s+/).filter(Boolean);
}

function primaryRegion(value: string): string {
  return regionTokens(value)[0] ?? "";
}

function isWholeRegion(value: string): boolean {
  const normalized = normalizeRegionForMatch(value);
  const tokens = regionTokens(value);
  return tokens.length <= 1 || /전체|전지역|전 지역/.test(normalized);
}

function serviceRegionMatchesDelivery(serviceRegion: string, deliveryRegion: string): boolean {
  const service = compactRegionForMatch(serviceRegion);
  const delivery = compactRegionForMatch(deliveryRegion);
  if (!delivery) return true;
  if (!service) return false;
  if (/전국/.test(service)) return true;
  if (/수도권/.test(service)) return ["서울", "경기", "인천"].includes(primaryRegion(deliveryRegion));
  if (service.includes(delivery) || delivery.includes(service)) return true;
  const servicePrimary = primaryRegion(serviceRegion);
  const deliveryPrimary = primaryRegion(deliveryRegion);
  return Boolean(servicePrimary && servicePrimary === deliveryPrimary && (isWholeRegion(serviceRegion) || isWholeRegion(deliveryRegion)));
}

function matchesSupplierRegion(supplier: SupplierProfile, deliveryRegion: string): boolean {
  if (!deliveryRegion.trim()) return true;
  return supplier.service_regions.some((region) => serviceRegionMatchesDelivery(region, deliveryRegion));
}

function matchesSupplierRequestConditions(
  supplier: SupplierProfile,
  categoryName: string,
  deliveryRegion: string,
  needTaxInvoice = false,
  cardPaymentRequired = false,
): boolean {
  return supplier.approval_status === "approved"
    && matchesSupplierCategory(supplier, categoryName)
    && matchesSupplierRegion(supplier, deliveryRegion)
    && (!needTaxInvoice || supplier.tax_invoice_available)
    && (!cardPaymentRequired || supplier.card_payment_available);
}

function draftItem(
  itemName: string,
  spec: string,
  quantity: number,
  unit: string,
  memo: string,
  isRequired = true,
  allowAlternative = true,
  confidenceScore = 96,
  needsReview = false,
  reviewReason = "",
): QuoteRequestDraft["items"][number] {
  return {
    item_name: itemName,
    spec,
    quantity,
    unit,
    memo,
    is_required: isRequired,
    allow_alternative: allowAlternative,
    confidence_score: confidenceScore,
    needs_review: needsReview,
    review_reason: reviewReason,
  };
}

function request(
  id: string,
  buyerId: string,
  title: string,
  categoryId: string,
  categoryName: string,
  region: string,
  deliveryDate: string,
  taxInvoice: boolean,
  cardPayment: boolean,
  description: string,
  status: QuoteRequest["status"],
): QuoteRequest {
  return {
    id,
    buyer_id: buyerId,
    title,
    category_id: categoryId,
    category_name: categoryName,
    delivery_region: region,
    desired_delivery_date: deliveryDate,
    need_tax_invoice: taxInvoice,
    card_payment_required: cardPayment,
    description,
    status,
    created_at: now,
    updated_at: now,
    input_method: id === "req-1" ? "invoice" : id === "req-3" ? "photo" : "manual",
    request_quality_score: id === "req-1" ? 92 : id === "req-2" ? 84 : 76,
    expected_supplier_count: id === "req-3" ? 1 : 2,
    urgent: id === "req-2",
    preferred_delivery_time: id === "req-2" ? "새벽 또는 오전" : "오전 납품 선호",
    delivery_address: region,
    allow_alternatives: true,
    include_delivery_fee: true,
    previous_amount: id === "req-1" ? 1320000 : id === "req-2" ? 910000 : undefined,
    budget_max: id === "req-1" ? 1250000 : id === "req-2" ? 900000 : undefined,
    estimated_savings_amount: id === "req-1" ? 70000 : id === "req-2" ? 10000 : undefined,
    estimated_savings_rate: id === "req-1" ? 5 : id === "req-2" ? 1 : undefined,
  };
}

function item(
  id: string,
  quoteRequestId: string,
  itemName: string,
  spec: string,
  quantity: number,
  unit: string,
  memo: string,
): QuoteRequestItem {
  return {
    id,
    quote_request_id: quoteRequestId,
    item_name: itemName,
    spec,
    quantity,
    unit,
    memo,
    created_at: now,
    is_required: true,
    allow_alternative: true,
    confidence_score: 96,
    needs_review: false,
    review_reason: "",
  };
}

function requestAttachment(
  id: string,
  quoteRequestId: string,
  fileName: string,
  fileType: string,
  analysisStatus: NonNullable<QuoteAttachment["analysis_status"]>,
  extractedText: string,
): QuoteAttachment {
  return {
    id,
    quote_request_id: quoteRequestId,
    file_url: "#",
    file_name: fileName,
    file_type: fileType,
    created_at: now,
    analysis_status: analysisStatus,
    extracted_text: extractedText,
    extracted_items_json: JSON.stringify({ source: "mock", text: extractedText }),
  };
}

function quote(
  id: string,
  requestId: string,
  supplierId: string,
  totalAmount: number,
  deliveryFee: number,
  deliveryDate: string,
  taxInvoice: boolean,
  cardPayment: boolean,
  alternative: string,
  itemMemo: string,
  memo: string,
  validUntil: string,
): Quote {
  return {
    id,
    quote_request_id: requestId,
    supplier_id: supplierId,
    total_amount: totalAmount,
    delivery_fee: deliveryFee,
    final_amount: totalAmount + deliveryFee,
    available_delivery_date: deliveryDate,
    tax_invoice_available: taxInvoice,
    card_payment_available: cardPayment,
    alternative_proposal: alternative,
    item_price_memo: itemMemo,
    memo,
    valid_until: validUntil,
    status: "submitted",
    created_at: now,
    updated_at: now,
  };
}

function deal(
  id: string,
  quoteRequestId: string,
  selectedQuoteId: string,
  buyerId: string,
  supplierId: string,
  title: string,
  categoryName: string,
  deliveryRegion: string,
  deliveryAddress: string,
  desiredDeliveryDate: string,
  confirmedDeliveryDate: string,
  subtotalAmount: number,
  deliveryFee: number,
  taxInvoiceRequired: boolean,
  taxInvoiceAvailable: boolean,
  cardPaymentRequired: boolean,
  cardPaymentAvailable: boolean,
  paymentMethod: PaymentMethod,
  status: DealStatus,
  buyerMemo: string,
  supplierMemo: string,
  previousAmount: number,
): Deal {
  return {
    id,
    quote_request_id: quoteRequestId,
    selected_quote_id: selectedQuoteId,
    buyer_id: buyerId,
    supplier_id: supplierId,
    title,
    category_name: categoryName,
    delivery_region: deliveryRegion,
    delivery_address: deliveryAddress,
    desired_delivery_date: desiredDeliveryDate,
    confirmed_delivery_date: confirmedDeliveryDate,
    subtotal_amount: subtotalAmount,
    delivery_fee: deliveryFee,
    final_amount: subtotalAmount + deliveryFee,
    tax_invoice_required: taxInvoiceRequired,
    tax_invoice_available: taxInvoiceAvailable,
    card_payment_required: cardPaymentRequired,
    card_payment_available: cardPaymentAvailable,
    payment_method: paymentMethod,
    status,
    buyer_memo: buyerMemo,
    supplier_memo: supplierMemo,
    cancellation_reason: status.includes("cancelled") ? buyerMemo : "",
    dispute_reason: status === "disputed" ? buyerMemo : "",
    previous_amount: previousAmount || undefined,
    completed_at: status === "completed" ? now : null,
    created_at: now,
    updated_at: now,
  };
}

function dealItem(
  id: string,
  dealId: string,
  itemName: string,
  spec: string,
  quantity: number,
  unit: string,
  unitPrice: number,
  memo: string,
): DealItem {
  return {
    id,
    deal_id: dealId,
    item_name: itemName,
    spec,
    quantity,
    unit,
    unit_price: unitPrice,
    total_price: unitPrice * quantity,
    memo,
    alternative_item_name: "",
    created_at: now,
  };
}

function attachment(
  id: string,
  dealId: string,
  fileName: string,
  attachmentType: DealAttachment["attachment_type"],
  uploadedBy: DealAttachment["uploaded_by"],
): DealAttachment {
  return {
    id,
    deal_id: dealId,
    file_url: "#",
    file_name: fileName,
    file_type: fileName.split(".").pop() ?? "file",
    attachment_type: attachmentType,
    uploaded_by: uploadedBy,
    created_at: now,
  };
}

function purchaseItem(
  id: string,
  purchaseRecordId: string,
  itemName: string,
  spec: string,
  quantity: number,
  unit: string,
  unitPrice: number,
  memo: string,
  sourceDealItemId?: string,
): PurchaseRecordItem {
  return {
    id,
    purchase_record_id: purchaseRecordId,
    source_deal_item_id: sourceDealItemId,
    item_name: itemName,
    spec,
    quantity,
    unit,
    unit_price: unitPrice,
    total_price: unitPrice * quantity,
    memo,
    created_at: now,
  };
}

function purchaseDocument(
  id: string,
  purchaseRecordId: string,
  documentType: PurchaseDocumentType,
  fileName: string,
  status: PurchaseDocumentStatus,
  uploadedBy: PurchaseDocument["uploaded_by"],
  createdAt: string,
): PurchaseDocument {
  return {
    id,
    purchase_record_id: purchaseRecordId,
    document_type: documentType,
    file_url: "#",
    file_name: fileName,
    status,
    uploaded_by: uploadedBy,
    created_at: createdAt,
    reviewed_at: status === "confirmed" || status === "rejected" ? createdAt : undefined,
  };
}

function notification(
  id: string,
  userId: string,
  userRole: UserRole,
  type: NotificationType,
  title: string,
  body: string,
  linkUrl: string,
  relatedEntityType: NotificationEntityType,
  relatedEntityId: string,
  priority: NotificationPriority,
  isRead: boolean,
  createdAt: string,
): Notification {
  return {
    id,
    user_id: userId,
    user_role: userRole,
    type,
    title,
    body,
    link_url: linkUrl,
    related_entity_type: relatedEntityType,
    related_entity_id: relatedEntityId,
    priority,
    is_read: isRead,
    read_at: isRead ? createdAt : undefined,
    is_archived: false,
    created_at: createdAt,
  };
}

function notificationEvent(
  id: string,
  eventType: NotificationType,
  actorUserId: string,
  targetUserId: string,
  targetRole: UserRole,
  relatedEntityType: NotificationEntityType,
  relatedEntityId: string,
  payload: Record<string, unknown>,
  deliveryStatus: NotificationDeliveryStatus,
  createdAt: string,
): NotificationEvent {
  return {
    id,
    event_type: eventType,
    actor_user_id: actorUserId,
    target_user_id: targetUserId,
    target_role: targetRole,
    related_entity_type: relatedEntityType,
    related_entity_id: relatedEntityId,
    payload_json: JSON.stringify(payload),
    delivery_status: deliveryStatus,
    delivery_channels_json: JSON.stringify(["in_app"]),
    created_at: createdAt,
    processed_at: deliveryStatus === "sent" || deliveryStatus === "skipped" ? createdAt : undefined,
  };
}

function notificationSettings(id: string, userId: string): NotificationSettings {
  return {
    id,
    user_id: userId,
    in_app_enabled: true,
    email_enabled: false,
    sms_enabled: false,
    kakao_enabled: false,
    push_enabled: false,
    quote_notifications_enabled: true,
    deal_notifications_enabled: true,
    analysis_notifications_enabled: true,
    accounting_notifications_enabled: true,
    message_notifications_enabled: true,
    marketing_notifications_enabled: false,
    quiet_hours_enabled: false,
    quiet_hours_start: "22:00",
    quiet_hours_end: "08:00",
    created_at: now,
    updated_at: now,
  };
}

function messageThread(
  id: string,
  threadType: MessageThread["thread_type"],
  relatedEntityId: string,
  buyerId: string,
  supplierId: string,
  title: string,
  status: MessageThreadStatus,
  lastMessageAt: string,
): MessageThread {
  return {
    id,
    thread_type: threadType,
    related_entity_id: relatedEntityId,
    buyer_id: buyerId,
    supplier_id: supplierId,
    admin_id: "admin-1",
    title,
    status,
    last_message_at: lastMessageAt,
    created_at: now,
    updated_at: lastMessageAt,
  };
}

function message(
  id: string,
  threadId: string,
  senderId: string,
  senderRole: Message["sender_role"],
  body: string,
  attachmentUrl: string,
  attachmentName: string,
  isRead: boolean,
  createdAt: string,
  messageType: MessageType = senderRole === "system" ? "system" : attachmentName ? "file" : "text",
  flaggedReason = "",
): Message {
  return {
    id,
    thread_id: threadId,
    sender_id: senderId,
    sender_role: senderRole,
    message_type: messageType,
    body,
    attachment_url: attachmentUrl,
    attachment_name: attachmentName,
    is_deleted: false,
    is_flagged: Boolean(flaggedReason),
    flagged_reason: flaggedReason,
    is_read: isRead,
    read_at: isRead ? createdAt : undefined,
    created_at: createdAt,
  };
}

function readState(id: string, threadId: string, userId: string, unreadCount: number, updatedAt: string): MessageReadState {
  return {
    id,
    thread_id: threadId,
    user_id: userId,
    last_read_at: updatedAt,
    unread_count: unreadCount,
    updated_at: updatedAt,
  };
}

function analysisJob(config: {
  id: string;
  sourceType: AnalysisSourceType;
  fileName: string;
  fileType: string;
  status: AnalysisJobStatus;
  supplierName: string;
  businessNumber: string;
  transactionDate: string;
  category: string;
  totalAmount: number;
  confidence: number;
  rawText: string;
  errorMessage?: string;
}): AnalysisJob {
  const vat = calculateVatAmount(config.totalAmount);
  return {
    id: config.id,
    buyer_id: "buyer-1",
    source_type: config.sourceType,
    original_file_url: "#",
    original_file_name: config.fileName,
    original_file_type: config.fileType,
    original_text_input: config.rawText,
    status: config.status,
    analysis_engine: "mock",
    confidence_score: config.confidence,
    detected_category: config.category,
    detected_supplier_name: config.supplierName,
    detected_business_number: config.businessNumber,
    detected_transaction_date: config.transactionDate,
    detected_total_amount: config.totalAmount,
    detected_supply_amount: vat.supplyAmount,
    detected_vat_amount: vat.vatAmount,
    detected_delivery_fee: 0,
    detected_payment_method: "undecided",
    error_message: config.errorMessage ?? "",
    created_at: now,
    updated_at: now,
    completed_at: config.status === "completed" || config.status === "needs_review" || config.status === "failed" ? now : undefined,
  };
}

function analysisItem(
  id: string,
  analysisJobId: string,
  itemName: string,
  normalizedItemName: string,
  spec: string,
  quantity: number,
  unit: string,
  unitPrice: number,
  totalPrice: number,
  categoryName: string,
  confidenceScore: number,
  reviewStatus: AnalysisItemReviewStatus,
  reviewReason: string,
): AnalysisItem {
  return {
    id,
    analysis_job_id: analysisJobId,
    item_name: itemName,
    normalized_item_name: normalizedItemName,
    spec,
    quantity,
    unit,
    unit_price: unitPrice,
    total_price: totalPrice,
    memo: "",
    category_name: categoryName,
    confidence_score: confidenceScore,
    review_status: reviewStatus,
    review_reason: reviewReason,
    created_at: now,
    updated_at: now,
  };
}

function analysisConversion(id: string, analysisJobId: string, convertedType: AnalysisConversion["converted_type"], convertedId: string, convertedAt: string): AnalysisConversion {
  return {
    id,
    analysis_job_id: analysisJobId,
    converted_type: convertedType,
    converted_id: convertedId,
    converted_at: convertedAt,
    created_at: convertedAt,
  };
}

function log(
  id: string,
  dealId: string,
  fromStatus: DealStatusLog["from_status"],
  toStatus: DealStatus,
  changedBy: DealStatusLog["changed_by"],
  memo: string,
): DealStatusLog {
  return {
    id,
    deal_id: dealId,
    from_status: fromStatus,
    to_status: toStatus,
    changed_by: changedBy,
    memo,
    created_at: new Date().toISOString(),
  };
}

function commissionPolicy(
  id: string,
  categoryName: string,
  commissionRate: number,
  fixedFeeAmount: number,
  minFeeAmount: number,
  maxFeeAmount: number,
  vatPolicyValue: VatPolicy,
  isActive: boolean,
  adminMemo: string,
): CommissionPolicy {
  return {
    id,
    category_name: categoryName,
    commission_rate: commissionRate,
    fee_type: fixedFeeAmount > 0 ? "mixed" : "percentage",
    fixed_fee_amount: fixedFeeAmount,
    min_fee_amount: minFeeAmount,
    max_fee_amount: maxFeeAmount,
    vat_policy: vatPolicyValue,
    is_active: isActive,
    admin_memo: adminMemo,
    created_at: now,
    updated_at: now,
  };
}

function supplierPlan(
  id: string,
  name: string,
  code: string,
  monthlyPrice: number,
  yearlyPrice: number,
  quoteLimit: number,
  viewLimit: number,
  priorityExposure: boolean,
  analytics: boolean,
  badge: boolean,
  badgeLabel: string,
  supportLevel: string,
  isActive: boolean,
  sortOrder: number,
): SupplierPlan {
  return {
    id,
    name,
    code,
    monthly_price: monthlyPrice,
    yearly_price: yearlyPrice,
    quote_participation_limit: quoteLimit,
    matched_request_view_limit: viewLimit,
    priority_exposure_enabled: priorityExposure,
    analytics_enabled: analytics,
    badge_enabled: badge,
    badge_label: badgeLabel,
    support_level: supportLevel,
    is_active: isActive,
    sort_order: sortOrder,
    created_at: now,
    updated_at: now,
  };
}

function supplierSubscription(id: string, supplierId: string, planId: string, status: SupplierSubscriptionStatus, provider: string, externalId: string): SupplierSubscription {
  return {
    id,
    supplier_id: supplierId,
    plan_id: planId,
    status,
    started_at: "2026-07-01",
    current_period_start: "2026-07-01",
    current_period_end: "2026-07-31",
    cancel_at_period_end: false,
    payment_provider: provider,
    external_subscription_id: externalId,
    created_at: now,
    updated_at: now,
  };
}

function supplierUsage(id: string, supplierId: string, quotes: number, views: number, messages: number, dealsWon: number, dealAmount: number): SupplierUsage {
  return {
    id,
    supplier_id: supplierId,
    period_start: "2026-07-01",
    period_end: "2026-07-31",
    quotes_submitted_count: quotes,
    matched_requests_viewed_count: views,
    messages_sent_count: messages,
    deals_won_count: dealsWon,
    total_deal_amount: dealAmount,
    updated_at: now,
  };
}

function quoteCredit(id: string, supplierId: string, creditType: QuoteCreditType, totalCredits: number, usedCredits: number, expiresAt: string): QuoteParticipationCredit {
  return {
    id,
    supplier_id: supplierId,
    credit_type: creditType,
    total_credits: totalCredits,
    used_credits: usedCredits,
    remaining_credits: Math.max(0, totalCredits - usedCredits),
    expires_at: expiresAt,
    created_at: now,
    updated_at: now,
  };
}

function platformFee(
  id: string,
  dealId: string,
  supplierId: string,
  buyerId: string,
  categoryName: string,
  finalAmount: number,
  commissionRate: number,
  feeAmount: number,
  status: PlatformFeeStatus,
  settlementId: string,
  settlementModeValue: SettlementMode,
  isWaived = false,
  waiverReason = "",
  waivedByAdminId = "",
  waivedAt?: string,
): PlatformFee {
  const effectiveFee = isWaived ? 0 : feeAmount;
  const vatAmount = Math.round(effectiveFee * 0.1);
  return {
    id,
    deal_id: dealId,
    supplier_id: supplierId,
    buyer_id: buyerId,
    category_name: categoryName,
    deal_final_amount: finalAmount,
    commission_rate: commissionRate,
    fee_amount: effectiveFee,
    vat_amount: vatAmount,
    total_fee_amount: effectiveFee + vatAmount,
    fee_status: status,
    settlement_id: settlementId,
    settlement_mode: settlementModeValue,
    is_waived: isWaived,
    waiver_reason: waiverReason,
    waived_by_admin_id: waivedByAdminId,
    waived_at: waivedAt,
    created_at: now,
    updated_at: now,
  };
}

function settlement(id: string, supplierId: string, dealAmount: number, feeAmount: number, status: SettlementStatus, dueDate: string, memo: string): Settlement {
  const vatAmount = Math.round(feeAmount * 0.1);
  return {
    id,
    supplier_id: supplierId,
    period_start: "2026-07-01",
    period_end: "2026-07-31",
    total_deal_amount: dealAmount,
    total_platform_fee: feeAmount,
    total_vat_amount: vatAmount,
    total_settlement_amount: Math.max(0, dealAmount - feeAmount - vatAmount),
    status,
    payout_due_date: dueDate,
    paid_at: status === "paid" ? now : undefined,
    memo,
    created_at: now,
    updated_at: now,
  };
}

function settlementItem(id: string, settlementId: string, dealId: string, platformFeeId: string, dealAmount: number, feeAmount: number): SettlementItem {
  const vatAmount = Math.round(feeAmount * 0.1);
  return {
    id,
    settlement_id: settlementId,
    deal_id: dealId,
    platform_fee_id: platformFeeId,
    deal_final_amount: dealAmount,
    fee_amount: feeAmount,
    vat_amount: vatAmount,
    settlement_amount: Math.max(0, dealAmount - feeAmount - vatAmount),
    created_at: now,
  };
}

function billingAccount(
  id: string,
  supplierId: string,
  billingEmail: string,
  businessNumber: string,
  recipientName: string,
  recipientPhone: string,
  recipientEmail: string,
  methodStatus: PaymentMethodStatus,
  methodType: BillingPaymentMethodType,
  externalCustomerId: string,
): BillingAccount {
  return {
    id,
    supplier_id: supplierId,
    billing_email: billingEmail,
    business_number: businessNumber,
    invoice_recipient_name: recipientName,
    invoice_recipient_phone: recipientPhone,
    invoice_recipient_email: recipientEmail,
    payment_method_status: methodStatus,
    default_payment_method_type: methodType,
    external_customer_id: externalCustomerId,
    created_at: now,
    updated_at: now,
  };
}

function billingEvent(id: string, eventType: string, supplierId: string, dealId: string, subscriptionId: string, amount: number, status: string, payload: Record<string, unknown>): BillingEvent {
  return {
    id,
    event_type: eventType,
    supplier_id: supplierId,
    deal_id: dealId,
    subscription_id: subscriptionId,
    amount,
    status,
    payload_json: JSON.stringify(payload),
    created_at: now,
  };
}

function operationReport(
  id: string,
  reporterId: string,
  reporterRole: UserRole,
  targetUserId: string,
  targetRole: UserRole,
  reportType: ReportType,
  entityType: ReportEntityType,
  entityId: string,
  title: string,
  description: string,
  desiredResolution: string,
  status: ReportStatus,
  priority: NotificationPriority,
  assigneeId: string,
  adminMemo: string,
  resolutionSummary: string,
): Report {
  return {
    id,
    reporter_id: reporterId,
    reporter_role: reporterRole,
    target_user_id: targetUserId,
    target_role: targetRole,
    report_type: reportType,
    related_entity_type: entityType,
    related_entity_id: entityId,
    title,
    description,
    desired_resolution: desiredResolution,
    status,
    priority,
    admin_assignee_id: assigneeId,
    admin_memo: adminMemo,
    resolution_summary: resolutionSummary,
    created_at: now,
    updated_at: now,
    resolved_at: status === "resolved" ? now : undefined,
  };
}

function reportAttachment(id: string, reportId: string, fileName: string, fileType: string, uploadedBy: string): ReportAttachment {
  return {
    id,
    report_id: reportId,
    file_url: "#",
    file_name: fileName,
    file_type: fileType,
    uploaded_by: uploadedBy,
    created_at: now,
  };
}

function reportAction(
  id: string,
  reportId: string,
  actionType: ReportActionType,
  actorId: string,
  actorRole: "admin" | "system",
  fromStatus: ReportStatus,
  toStatus: ReportStatus,
  memo: string,
  createdAt: string,
): ReportAction {
  return {
    id,
    report_id: reportId,
    action_type: actionType,
    actor_id: actorId,
    actor_role: actorRole,
    from_status: fromStatus,
    to_status: toStatus,
    memo,
    created_at: createdAt,
  };
}

function reportComment(id: string, reportId: string, writerId: string, writerRole: UserRole, body: string, isInternal: boolean, createdAt: string): ReportComment {
  return {
    id,
    report_id: reportId,
    writer_id: writerId,
    writer_role: writerRole,
    body,
    is_internal: isInternal,
    created_at: createdAt,
  };
}

function review(
  id: string,
  dealId: string,
  requestId: string,
  buyerId: string,
  supplierId: string,
  overall: number,
  price: number,
  delivery: number,
  quality: number,
  communication: number,
  content: string,
  isPublic: boolean,
  wouldReorder: boolean,
  status: ReviewStatus,
  createdAt: string,
): Review {
  return {
    id,
    deal_id: dealId,
    quote_request_id: requestId,
    buyer_id: buyerId,
    supplier_id: supplierId,
    rating_overall: overall,
    rating_price: price,
    rating_delivery: delivery,
    rating_quality: quality,
    rating_communication: communication,
    content,
    is_public: isPublic,
    would_reorder: wouldReorder,
    status,
    created_at: createdAt,
    updated_at: createdAt,
  };
}

function reviewReply(id: string, reviewId: string, supplierId: string, content: string, status: ReviewStatus, createdAt: string): ReviewReply {
  return {
    id,
    review_id: reviewId,
    supplier_id: supplierId,
    content,
    status,
    created_at: createdAt,
    updated_at: createdAt,
  };
}

function reviewReport(id: string, reviewId: string, reportedBy: string, reason: string, detail: string, status: ReviewReportStatus, createdAt: string): ReviewReport {
  return {
    id,
    review_id: reviewId,
    reported_by: reportedBy,
    reason,
    detail,
    status,
    created_at: createdAt,
    updated_at: createdAt,
  };
}

function reputationScore(
  id: string,
  supplierId: string,
  totalScore: number,
  responseScore: number,
  completionScore: number,
  reviewScore: number,
  disputeScore: number,
  verificationScore: number,
  repeatScore: number,
  badges: string[],
): SupplierReputationScore {
  return {
    id,
    supplier_id: supplierId,
    total_score: totalScore,
    response_score: responseScore,
    completion_score: completionScore,
    review_score: reviewScore,
    dispute_score: disputeScore,
    verification_score: verificationScore,
    repeat_score: repeatScore,
    grade: getSupplierGrade(totalScore),
    badges,
    risk_level: totalScore >= 80 ? "low" : totalScore >= 65 ? "medium" : "high",
    updated_at: now,
  };
}

function userSanction(id: string, userId: string, userRole: "buyer" | "supplier", sanctionType: SanctionType, reason: string, reportId: string, status: SanctionStatus, startAt: string, endAt?: string): UserSanction {
  return {
    id,
    user_id: userId,
    user_role: userRole,
    sanction_type: sanctionType,
    reason,
    related_report_id: reportId,
    start_at: startAt,
    end_at: endAt,
    status,
    created_by_admin_id: "admin-1",
    created_at: now,
    updated_at: now,
  };
}

function blacklistEntry(id: string, targetType: BlacklistTargetType, targetValue: string, reason: string, status: BlacklistStatus): BlacklistEntry {
  return {
    id,
    target_type: targetType,
    target_value: targetValue,
    reason,
    status,
    created_by_admin_id: "admin-1",
    created_at: now,
    updated_at: now,
  };
}

function betaFeedback(id: string, userId: string, userRole: UserRole, feedbackType: FeedbackType, title: string, description: string, pageUrl: string, screenshotUrl: string, status: FeedbackStatus, adminMemo: string): BetaFeedback {
  return {
    id,
    user_id: userId,
    user_role: userRole,
    feedback_type: feedbackType,
    title,
    description,
    page_url: pageUrl,
    screenshot_url: screenshotUrl,
    status,
    admin_memo: adminMemo,
    created_at: now,
    updated_at: now,
  };
}

function qaChecklist(id: string, category: string, title: string, description: string, status: QaChecklistStatus, memo: string): QaChecklistItem {
  return {
    id,
    category,
    title,
    description,
    status,
    memo,
    checked_by: status === "unchecked" ? "" : "admin-1",
    checked_at: status === "unchecked" ? undefined : now,
    created_at: now,
    updated_at: now,
  };
}

export function createPurchaseRecordFromDeal(dealRecord: Deal, data: AppData, createdAt: string): PurchaseRecord {
  const { supplyAmount, vatAmount } = calculateVatAmount(dealRecord.final_amount);
  const supplier = data.supplier_profiles.find((entry) => entry.id === dealRecord.supplier_id);
  const supplierName = supplier?.business_name ?? "알 수 없는 업체";
  const dealItems = data.deal_items.filter((entry) => entry.deal_id === dealRecord.id);
  const savings = calculateEstimatedSavings(dealRecord.previous_amount, dealRecord.final_amount);
  const evidenceStatus = getDealEvidenceStatus(dealRecord, data);
  const taxStatus: TaxInvoiceStatus = dealRecord.tax_invoice_required ? "requested" : "not_needed";

  const record: PurchaseRecord = {
    id: `purchase-${Date.now()}`,
    business_id: dealRecord.buyer_id,
    source: "ssawa",
    source_id: dealRecord.id,
    deal_id: dealRecord.id,
    quote_request_id: dealRecord.quote_request_id,
    buyer_id: dealRecord.buyer_id,
    supplier_id: dealRecord.supplier_id,
    supplier_name: supplierName,
    supplier_business_id: supplier?.user_id,
    supplier_business_number: supplier?.business_number,
    purchase_title: dealRecord.title,
    purchase_date: createdAt.slice(0, 10),
    category_name: dealRecord.category_name || "미분류",
    item_summary: summarizeDealItems(dealItems, dealRecord.title),
    accounting_category: dealRecord.category_name || "미분류",
    sub_category: dealItems[0]?.item_name ?? "",
    item_count: Math.max(1, dealItems.length),
    total_amount: dealRecord.final_amount,
    supply_amount: supplyAmount,
    vat_amount: vatAmount,
    delivery_fee: dealRecord.delivery_fee,
    discount_amount: 0,
    estimated_savings_amount: savings.amount,
    estimated_savings_rate: savings.rate,
    previous_purchase_amount: dealRecord.previous_amount ?? 0,
    payment_method: dealRecord.payment_method,
    tax_invoice_status: taxStatus,
    receipt_status: "none",
    delivery_note_status: "pending",
    evidence_status: evidenceStatus,
    evidence_files_json: JSON.stringify(getDealEvidenceFiles(dealRecord, data)),
    accounting_status: evidenceStatus === "complete" ? "pending" : "hold",
    sync_target: "today_jangsa",
    ssawa_deal_id: dealRecord.id,
    ssawa_quote_request_id: dealRecord.quote_request_id,
    ssawa_supplier_id: dealRecord.supplier_id,
    memo: "싸와 거래에서 자동 반영됨",
    user_memo: "",
    admin_memo: "",
    created_by: dealRecord.buyer_id,
    created_at: createdAt,
    updated_at: createdAt,
  };
  return applyClassificationToRecord(data, record);
}

function mapDealToTodayPurchase(dealRecord: Deal, data: AppData, purchaseId: string, createdAt: string): PurchaseRecord {
  return { ...createPurchaseRecordFromDeal(dealRecord, data, createdAt), id: purchaseId };
}

function findPurchaseRecordForDeal(data: AppData, dealId: string) {
  return data.purchase_records.find((entry) => entry.ssawa_deal_id === dealId || entry.source_id === dealId || entry.deal_id === dealId);
}

function isDealEligibleForTodayPurchase(dealRecord: Deal) {
  return dealRecord.status === "completed";
}

function appendSyncLog(data: AppData, logDraft: Omit<TodaySsawaSyncLog, "id">): AppData {
  const logEntry: TodaySsawaSyncLog = {
    id: `today-sync-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    ...logDraft,
  };
  return {
    ...data,
    today_ssawa_sync_logs: [logEntry, ...(data.today_ssawa_sync_logs ?? [])],
  };
}

function appendSyncLogResult(
  data: AppData,
  input: {
    businessId: string;
    dealId: string;
    purchaseRecordId?: string;
    action: TodaySsawaSyncLog["action"];
    logStatus: TodaySsawaSyncLog["status"];
    resultStatus: SsawaPurchaseSyncStatus;
    ok: boolean;
    message: string;
    errorCode?: string;
    errorDetail?: string;
    triggeredBy: TodaySsawaSyncTrigger;
    triggeredUserId?: string;
    payload?: Record<string, unknown>;
    createdAt: string;
  },
): SsawaPurchaseSyncResult {
  const nextData = appendSyncLog(data, {
    business_id: input.businessId,
    ssawa_deal_id: input.dealId,
    purchase_record_id: input.purchaseRecordId,
    action: input.action,
    status: input.logStatus,
    message: input.message,
    error_code: input.errorCode,
    error_detail: input.errorDetail,
    triggered_by: input.triggeredBy,
    triggered_user_id: input.triggeredUserId,
    payload_snapshot_json: JSON.stringify(input.payload ?? { dealId: input.dealId }),
    created_at: input.createdAt,
  });
  saveData(nextData);
  return {
    data: nextData,
    ok: input.ok,
    status: input.resultStatus,
    purchaseRecordId: input.purchaseRecordId,
    message: input.message,
    errorCode: input.errorCode,
  };
}

function syncFailure(
  data: AppData,
  dealId: string,
  businessId: string,
  action: TodaySsawaSyncLog["action"],
  logStatus: TodaySsawaSyncLog["status"],
  errorCode: string,
  message: string,
  triggeredBy: TodaySsawaSyncTrigger,
  triggeredUserId: string | undefined,
  createdAt: string,
  payload?: Record<string, unknown>,
): SsawaPurchaseSyncResult {
  return appendSyncLogResult(data, {
    businessId: businessId || "unknown",
    dealId,
    action,
    logStatus,
    resultStatus: "failed",
    ok: false,
    message,
    errorCode,
    triggeredBy,
    triggeredUserId,
    payload,
    createdAt,
  });
}

function snapshotDeal(dealRecord: Deal) {
  return {
    id: dealRecord.id,
    buyer_id: dealRecord.buyer_id,
    supplier_id: dealRecord.supplier_id,
    quote_request_id: dealRecord.quote_request_id,
    status: dealRecord.status,
    final_amount: dealRecord.final_amount,
    category_name: dealRecord.category_name,
    completed_at: dealRecord.completed_at,
  };
}

function summarizeDealItems(items: Array<{ item_name: string }>, fallback: string) {
  if (!items.length) return fallback;
  const first = items[0]?.item_name || fallback;
  return items.length > 1 ? `${first} 외 ${items.length - 1}건` : first;
}

function getDealEvidenceFiles(dealRecord: Deal, data: AppData) {
  return data.deal_attachments
    .filter((entry) => entry.deal_id === dealRecord.id)
    .map((entry) => ({
      type: entry.attachment_type,
      file_name: entry.file_name,
      file_url: entry.file_url,
      uploaded_by: entry.uploaded_by,
    }));
}

function getDealEvidenceStatus(dealRecord: Deal, data: AppData): TodayEvidenceStatus {
  const attachments = data.deal_attachments.filter((entry) => entry.deal_id === dealRecord.id);
  if (!attachments.length) return dealRecord.tax_invoice_required ? "needs_review" : "missing";
  if (attachments.some((entry) => entry.attachment_type === "tax_invoice" || entry.attachment_type === "receipt" || entry.attachment_type === "delivery_note" || entry.attachment_type === "invoice")) {
    return dealRecord.tax_invoice_required && !attachments.some((entry) => entry.attachment_type === "tax_invoice") ? "needs_review" : "complete";
  }
  return "needs_review";
}

function mapDealToSupplierSale(dealRecord: Deal, data: AppData, recordId: string, createdAt: string): SupplierSalesRecord {
  const dealItems = data.deal_items.filter((entry) => entry.deal_id === dealRecord.id);
  const quote = data.quotes.find((entry) => entry.id === dealRecord.selected_quote_id);
  const buyer = data.profiles.find((entry) => entry.id === dealRecord.buyer_id);
  const { supplyAmount, vatAmount } = calculateVatAmount(dealRecord.final_amount);
  return {
    id: recordId,
    supplier_business_id: dealRecord.supplier_id,
    buyer_business_id: dealRecord.buyer_id,
    buyer_display_name: buyer?.business_name ?? "구매처",
    source: "ssawa",
    source_id: dealRecord.id,
    ssawa_deal_id: dealRecord.id,
    ssawa_quote_request_id: dealRecord.quote_request_id,
    ssawa_quote_id: quote?.id ?? dealRecord.selected_quote_id,
    item_summary: summarizeDealItems(dealItems, dealRecord.title),
    category: dealRecord.category_name || "기타",
    total_amount: dealRecord.final_amount,
    supply_amount: supplyAmount,
    vat_amount: vatAmount,
    payment_method: mapSupplierSalePaymentMethod(dealRecord.payment_method),
    sale_status: mapSupplierSaleStatus(dealRecord.status),
    settlement_status: mapSupplierSettlementStatus(dealRecord),
    tax_invoice_status: mapSupplierTaxInvoiceStatus(dealRecord),
    evidence_status: getDealEvidenceStatus(dealRecord, data),
    sold_at: dealRecord.completed_at?.slice(0, 10) ?? dealRecord.confirmed_delivery_date ?? createdAt.slice(0, 10),
    completed_at: dealRecord.completed_at ?? undefined,
    settled_at: dealRecord.status === "completed" && dealRecord.payment_method !== "later" ? dealRecord.completed_at ?? createdAt : undefined,
    memo: "싸와 거래에서 공급업체 매출로 정리했습니다.",
    created_by: "system",
    created_at: createdAt,
    updated_at: createdAt,
  };
}

function findSupplierSalesRecordForDeal(data: AppData, dealId: string, supplierBusinessId: string) {
  return data.supplier_sales_records.find((entry) =>
    entry.supplier_business_id === supplierBusinessId
    && (entry.ssawa_deal_id === dealId || entry.source_id === dealId),
  );
}

function isDealEligibleForSupplierSale(dealRecord: Deal) {
  return dealRecord.status === "confirmed" || dealRecord.status === "preparing" || dealRecord.status === "delivering" || dealRecord.status === "delivered" || dealRecord.status === "completed";
}

function mapSupplierSaleStatus(status: DealStatus): SupplierSalesRecord["sale_status"] {
  if (status === "completed" || status === "closed") return "completed";
  if (status === "disputed") return "disputed";
  if (status.includes("cancelled")) return "cancelled";
  if (status === "pending_confirmation") return "pending";
  if (status === "confirmed" || status === "preparing" || status === "delivering" || status === "delivered") return "confirmed";
  return "needs_review";
}

function mapSupplierSettlementStatus(dealRecord: Deal): SupplierSalesRecord["settlement_status"] {
  if (dealRecord.status === "disputed" || dealRecord.status.includes("cancelled")) return "needs_review";
  if (dealRecord.payment_method === "bank_transfer" || dealRecord.payment_method === "cash") return "not_applicable";
  if (dealRecord.status === "completed" && dealRecord.payment_method !== "later") return "paid";
  if (dealRecord.status === "completed") return "scheduled";
  if (dealRecord.payment_method === "later") return "pending";
  return "scheduled";
}

function mapSupplierSalePaymentMethod(paymentMethod: PaymentMethod): SupplierSalesRecord["payment_method"] {
  if (paymentMethod === "bank_transfer") return "bank_transfer";
  if (paymentMethod === "card") return "card";
  if (paymentMethod === "cash") return "direct";
  if (paymentMethod === "later") return "direct";
  return "unknown";
}

function mapSupplierTaxInvoiceStatus(dealRecord: Deal): SupplierTaxInvoiceStatus {
  if (!dealRecord.tax_invoice_required) return "not_needed";
  if (dealRecord.status === "completed" && dealRecord.tax_invoice_available) return "issued";
  if (dealRecord.tax_invoice_available) return "required";
  return "unknown";
}

function appendSupplierSyncLog(data: AppData, logDraft: Omit<TodaySupplierSyncLog, "id">): AppData {
  const logEntry: TodaySupplierSyncLog = {
    id: `supplier-sync-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    ...logDraft,
  };
  return {
    ...data,
    today_supplier_sync_logs: [logEntry, ...(data.today_supplier_sync_logs ?? [])],
  };
}

function appendSupplierSyncLogResult(
  data: AppData,
  input: {
    supplierBusinessId: string;
    buyerBusinessId?: string;
    dealId?: string;
    supplierSaleRecordId?: string;
    action: TodaySupplierSyncLog["action"];
    logStatus: TodaySupplierSyncLog["status"];
    resultStatus: SupplierSaleSyncStatus;
    ok: boolean;
    message: string;
    errorCode?: string;
    errorDetail?: string;
    triggeredBy: TodaySupplierSyncTrigger;
    triggeredUserId?: string;
    payload?: Record<string, unknown>;
    createdAt: string;
  },
): SupplierSaleSyncResult {
  const nextData = appendSupplierSyncLog(data, {
    supplier_business_id: input.supplierBusinessId,
    buyer_business_id: input.buyerBusinessId,
    ssawa_deal_id: input.dealId,
    supplier_sales_record_id: input.supplierSaleRecordId,
    action: input.action,
    status: input.logStatus,
    message: input.message,
    error_code: input.errorCode,
    error_detail: input.errorDetail,
    triggered_by: input.triggeredBy,
    triggered_user_id: input.triggeredUserId,
    payload_snapshot_json: JSON.stringify(input.payload ?? { dealId: input.dealId }),
    created_at: input.createdAt,
  });
  saveData(nextData);
  return {
    data: nextData,
    ok: input.ok,
    status: input.resultStatus,
    supplierSaleRecordId: input.supplierSaleRecordId,
    message: input.message,
    errorCode: input.errorCode,
  };
}

export function categorizeSsawaPurchase(items: string[], requestCategory = "", supplier?: SupplierProfile) {
  const source = normalizeCategoryText(`${requestCategory} ${items.join(" ")} ${(supplier?.categories ?? []).join(" ")}`);
  const direct = directCategoryMatch(source);
  if (direct && direct !== "미분류") return direct;
  const rule = defaultTodayCategoryRules.find((entry) => splitRulePattern(entry.pattern).some((pattern) => source.includes(pattern)));
  return rule?.category_name ?? "미분류";
}

function createPurchaseRecordItemsFromDeal(dealRecord: Deal, data: AppData, purchaseId: string, createdAt: string): PurchaseRecordItem[] {
  const dealItems = data.deal_items.filter((entry) => entry.deal_id === dealRecord.id);
  if (!dealItems.length) {
    return [
      {
        id: `${purchaseId}-item-1`,
        purchase_record_id: purchaseId,
        item_name: dealRecord.title,
        spec: "",
        quantity: 1,
        unit: "건",
        unit_price: dealRecord.final_amount,
        total_price: dealRecord.final_amount,
        memo: "거래 품목 미등록",
        created_at: createdAt,
      },
    ];
  }

  return dealItems.map((entry, index) => ({
    id: `${purchaseId}-item-${index + 1}`,
    purchase_record_id: purchaseId,
    source_deal_item_id: entry.id,
    item_name: entry.item_name,
    spec: entry.spec,
    quantity: entry.quantity,
    unit: entry.unit,
    unit_price: entry.unit_price,
    total_price: entry.total_price,
    memo: entry.memo,
    created_at: createdAt,
  }));
}

function createPurchaseDocumentsFromDeal(dealRecord: Deal, data: AppData, purchaseId: string, createdAt: string): PurchaseDocument[] {
  const attachments = data.deal_attachments.filter((entry) => entry.deal_id === dealRecord.id);
  return attachments.map((entry, index) =>
    purchaseDocument(
      `${purchaseId}-doc-${index + 1}`,
      purchaseId,
      entry.attachment_type,
      entry.file_name,
      entry.attachment_type === "photo" ? "uploaded" : "pending_review",
      entry.uploaded_by,
      createdAt,
    ),
  );
}

function createAccountingEntryFromPurchaseRecord(record: PurchaseRecord, createdAt: string): AccountingEntry {
  return {
    id: `accounting-${record.id}`,
    purchase_record_id: record.id,
    buyer_id: record.buyer_id,
    entry_type: "purchase",
    accounting_category: record.accounting_category,
    amount: record.total_amount,
    supply_amount: record.supply_amount,
    vat_amount: record.vat_amount,
    sync_status: record.accounting_status === "synced" ? "synced" : record.accounting_status === "excluded" ? "excluded" : record.accounting_status === "failed" ? "failed" : "pending",
    sync_target: record.sync_target,
    synced_at: record.accounting_status === "synced" ? createdAt : undefined,
    failure_reason: record.accounting_status === "failed" ? "장부 반영 실패 샘플" : undefined,
    created_at: createdAt,
    updated_at: record.updated_at || createdAt,
  };
}

function normalizeData(data: Partial<AppData>): AppData {
  const fallbackData = baseInitialData();
  const requiredProfiles = appConfig.enableDemoData ? testProfiles : [];
  const requiredLocalAuthAccounts = appConfig.enableDemoData ? sampleLocalAuthAccounts : [];
  const requiredSupplierProfiles = appConfig.enableDemoData ? testSupplierProfiles : [];
  const merged: AppData = {
    ...fallbackData,
    ...data,
    environment: data.environment ?? fallbackData.environment,
    is_demo: data.is_demo ?? fallbackData.is_demo,
    demo_label: data.demo_label ?? fallbackData.demo_label,
    onboarding_completed: data.onboarding_completed ?? fallbackData.onboarding_completed,
    onboarding_completed_at: data.onboarding_completed_at ?? fallbackData.onboarding_completed_at,
    profiles: mergeRequiredRecords(data.profiles ?? fallbackData.profiles, requiredProfiles),
    local_auth_accounts: mergeRequiredRecords(data.local_auth_accounts ?? fallbackData.local_auth_accounts, requiredLocalAuthAccounts),
    categories: data.categories ?? fallbackData.categories,
    quote_requests: normalizeQuoteRequests(data.quote_requests ?? fallbackData.quote_requests, data.categories ?? fallbackData.categories),
    quote_request_items: data.quote_request_items ?? fallbackData.quote_request_items,
    supplier_profiles: mergeRequiredRecords(data.supplier_profiles ?? fallbackData.supplier_profiles, requiredSupplierProfiles),
    supplier_documents: data.supplier_documents ?? fallbackData.supplier_documents,
    supplier_stats: data.supplier_stats ?? fallbackData.supplier_stats,
    supplier_reviews: data.supplier_reviews ?? fallbackData.supplier_reviews,
    product_categories: data.product_categories ?? fallbackData.product_categories,
    supplier_store_profiles: data.supplier_store_profiles ?? fallbackData.supplier_store_profiles,
    supplier_products: data.supplier_products ?? fallbackData.supplier_products,
    product_inquiries: data.product_inquiries ?? fallbackData.product_inquiries,
    product_order_requests: data.product_order_requests ?? fallbackData.product_order_requests,
    product_favorites: data.product_favorites ?? fallbackData.product_favorites,
    product_quote_items: data.product_quote_items ?? fallbackData.product_quote_items,
    product_reports: data.product_reports ?? fallbackData.product_reports,
    quotes: data.quotes ?? fallbackData.quotes,
    quote_attachments: data.quote_attachments ?? fallbackData.quote_attachments,
    deals: data.deals ?? fallbackData.deals,
    deal_items: data.deal_items ?? fallbackData.deal_items,
    deal_attachments: data.deal_attachments ?? fallbackData.deal_attachments,
    purchase_records: (data.purchase_records ?? fallbackData.purchase_records).map(normalizePurchaseRecord),
    purchase_record_items: data.purchase_record_items ?? fallbackData.purchase_record_items,
    purchase_documents: data.purchase_documents ?? fallbackData.purchase_documents,
    tax_documents: (data.tax_documents ?? fallbackData.tax_documents).map(normalizeTaxDocument),
    tax_document_checks: data.tax_document_checks ?? fallbackData.tax_document_checks,
    tax_export_requests: data.tax_export_requests ?? fallbackData.tax_export_requests,
    supplier_sales_records: (data.supplier_sales_records ?? fallbackData.supplier_sales_records).map(normalizeSupplierSalesRecord),
    today_supplier_sync_logs: data.today_supplier_sync_logs ?? fallbackData.today_supplier_sync_logs,
    sales_records: (data.sales_records ?? fallbackData.sales_records).map(normalizeTodaySalesRecord),
    expense_records: (data.expense_records ?? fallbackData.expense_records).map(normalizeTodayExpenseRecord),
    recurring_rules: data.recurring_rules ?? fallbackData.recurring_rules,
    today_categories: data.today_categories ?? fallbackData.today_categories,
    today_category_rules: data.today_category_rules ?? fallbackData.today_category_rules,
    today_category_classification_logs: data.today_category_classification_logs ?? fallbackData.today_category_classification_logs,
    today_ssawa_sync_logs: data.today_ssawa_sync_logs ?? fallbackData.today_ssawa_sync_logs,
    accounting_entries: data.accounting_entries ?? fallbackData.accounting_entries,
    analysis_jobs: data.analysis_jobs ?? fallbackData.analysis_jobs,
    analysis_items: data.analysis_items ?? fallbackData.analysis_items,
    analysis_attachments: data.analysis_attachments ?? fallbackData.analysis_attachments,
    analysis_raw_results: data.analysis_raw_results ?? fallbackData.analysis_raw_results,
    analysis_conversions: data.analysis_conversions ?? fallbackData.analysis_conversions,
    notifications: data.notifications ?? fallbackData.notifications,
    notification_events: data.notification_events ?? fallbackData.notification_events,
    notification_settings: data.notification_settings ?? fallbackData.notification_settings,
    message_threads: data.message_threads ?? fallbackData.message_threads,
    messages: data.messages ?? fallbackData.messages,
    message_read_states: data.message_read_states ?? fallbackData.message_read_states,
    message_reports: data.message_reports ?? fallbackData.message_reports,
    commission_policies: data.commission_policies ?? fallbackData.commission_policies,
    platform_fees: data.platform_fees ?? fallbackData.platform_fees,
    supplier_plans: data.supplier_plans ?? fallbackData.supplier_plans,
    supplier_subscriptions: data.supplier_subscriptions ?? fallbackData.supplier_subscriptions,
    supplier_usage: data.supplier_usage ?? fallbackData.supplier_usage,
    quote_participation_credits: data.quote_participation_credits ?? fallbackData.quote_participation_credits,
    settlements: data.settlements ?? fallbackData.settlements,
    settlement_items: data.settlement_items ?? fallbackData.settlement_items,
    billing_events: data.billing_events ?? fallbackData.billing_events,
    billing_accounts: data.billing_accounts ?? fallbackData.billing_accounts,
    reports: data.reports ?? fallbackData.reports,
    report_attachments: data.report_attachments ?? fallbackData.report_attachments,
    report_actions: data.report_actions ?? fallbackData.report_actions,
    report_comments: data.report_comments ?? fallbackData.report_comments,
    reviews: data.reviews ?? fallbackData.reviews,
    review_replies: data.review_replies ?? fallbackData.review_replies,
    review_reports: data.review_reports ?? fallbackData.review_reports,
    supplier_reputation_scores: data.supplier_reputation_scores ?? fallbackData.supplier_reputation_scores,
    user_sanctions: data.user_sanctions ?? fallbackData.user_sanctions,
    blacklist_entries: data.blacklist_entries ?? fallbackData.blacklist_entries,
    business_verifications: data.business_verifications ?? fallbackData.business_verifications,
    business_manual_review_requests: data.business_manual_review_requests ?? fallbackData.business_manual_review_requests,
    feedbacks: data.feedbacks ?? fallbackData.feedbacks,
    qa_checklists: data.qa_checklists ?? fallbackData.qa_checklists,
    beta_targets: data.beta_targets ?? fallbackData.beta_targets,
    beta_participants: data.beta_participants ?? fallbackData.beta_participants,
    sales_leads: data.sales_leads ?? fallbackData.sales_leads,
    sales_activities: data.sales_activities ?? fallbackData.sales_activities,
    beta_experiments: data.beta_experiments ?? fallbackData.beta_experiments,
    beta_feedback_insights: data.beta_feedback_insights ?? fallbackData.beta_feedback_insights,
    operator_tasks: data.operator_tasks ?? fallbackData.operator_tasks,
    business_validation_reports: data.business_validation_reports ?? fallbackData.business_validation_reports,
    focus_settings: data.focus_settings ?? fallbackData.focus_settings,
    feature_flags: data.feature_flags ?? fallbackData.feature_flags,
    favorite_item_groups: data.favorite_item_groups ?? fallbackData.favorite_item_groups,
    favorite_items: data.favorite_items ?? fallbackData.favorite_items,
    category_playbooks: data.category_playbooks ?? fallbackData.category_playbooks,
    roadmap_items: data.roadmap_items ?? fallbackData.roadmap_items,
    deal_status_logs: data.deal_status_logs ?? fallbackData.deal_status_logs,
    today_requote_recommendations: data.today_requote_recommendations ?? fallbackData.today_requote_recommendations,
    today_ssawa_quote_drafts: data.today_ssawa_quote_drafts ?? fallbackData.today_ssawa_quote_drafts,
    today_requote_logs: data.today_requote_logs ?? fallbackData.today_requote_logs,
    today_upload_batches: data.today_upload_batches ?? fallbackData.today_upload_batches,
    today_upload_rows: data.today_upload_rows ?? fallbackData.today_upload_rows,
    today_upload_column_mappings: data.today_upload_column_mappings ?? fallbackData.today_upload_column_mappings,
    today_upload_logs: data.today_upload_logs ?? fallbackData.today_upload_logs,
    supplier_product_events: data.supplier_product_events ?? fallbackData.supplier_product_events,
    supplier_today_insights: data.supplier_today_insights ?? fallbackData.supplier_today_insights,
    supplier_tasks: data.supplier_tasks ?? fallbackData.supplier_tasks,
    today_ai_conversations: data.today_ai_conversations ?? fallbackData.today_ai_conversations,
    today_ai_messages: data.today_ai_messages ?? fallbackData.today_ai_messages,
    today_ai_insights: data.today_ai_insights ?? fallbackData.today_ai_insights,
    today_ai_usage: data.today_ai_usage ?? fallbackData.today_ai_usage,
    today_security_events: data.today_security_events ?? fallbackData.today_security_events,
    admin_today_actions: data.admin_today_actions ?? fallbackData.admin_today_actions,
    today_admin_settings: data.today_admin_settings ?? fallbackData.today_admin_settings,
    today_notifications: data.today_notifications ?? fallbackData.today_notifications,
    today_notification_preferences: data.today_notification_preferences ?? fallbackData.today_notification_preferences,
    today_reminder_rules: data.today_reminder_rules ?? fallbackData.today_reminder_rules,
    today_notification_delivery_logs: data.today_notification_delivery_logs ?? fallbackData.today_notification_delivery_logs,
    today_onboarding_progress: data.today_onboarding_progress ?? fallbackData.today_onboarding_progress,
    today_help_articles: data.today_help_articles ?? fallbackData.today_help_articles,
    today_launch_checklist: data.today_launch_checklist ?? fallbackData.today_launch_checklist,
    today_pricing_plans: data.today_pricing_plans ?? fallbackData.today_pricing_plans,
    today_beta_applications: data.today_beta_applications ?? fallbackData.today_beta_applications,
    today_support_tickets: data.today_support_tickets ?? fallbackData.today_support_tickets,
    today_product_events: data.today_product_events ?? fallbackData.today_product_events,
    today_beta_survey_responses: data.today_beta_survey_responses ?? fallbackData.today_beta_survey_responses,
    today_beta_backlog: data.today_beta_backlog ?? fallbackData.today_beta_backlog,
    today_beta_segments: data.today_beta_segments ?? fallbackData.today_beta_segments,
  };

  saveData(merged);
  return merged;
}

function mergeRequiredRecords<T extends { id: string }>(records: T[], requiredRecords: T[]) {
  const recordIds = new Set(records.map((record) => record.id));
  return [
    ...requiredRecords.filter((record) => !recordIds.has(record.id)),
    ...records,
  ];
}

function normalizeQuoteRequests(records: QuoteRequest[], categoryRecords: Category[]): QuoteRequest[] {
  const categoryNameById = new Map(categoryRecords.map((category) => [category.id, category.name]));
  return records.map((record) => {
    const categoryName = record.category_id ? categoryNameById.get(record.category_id) : "";
    if (categoryName && record.category_name !== categoryName) return { ...record, category_name: categoryName };
    if (!record.category_name?.trim()) return { ...record, category_name: "기타" };
    return record;
  });
}

function normalizeTaxDocument(record: TaxDocument): TaxDocument {
  return {
    ...record,
    document_type: record.document_type ?? "etc",
    document_name: record.document_name ?? "증빙자료",
    status: record.status ?? "needs_review",
    file_path: record.file_path ?? `tax-documents/${record.business_id}/unknown/${record.id}`,
    memo: record.memo ?? "",
    updated_at: record.updated_at ?? record.created_at,
  };
}

function normalizeSupplierSalesRecord(record: SupplierSalesRecord): SupplierSalesRecord {
  const vat = calculateVatAmount(record.total_amount ?? 0);
  return {
    ...record,
    source: record.source ?? "ssawa",
    source_id: record.source_id ?? record.ssawa_deal_id ?? record.id,
    buyer_display_name: record.buyer_display_name ?? "구매처",
    item_summary: record.item_summary ?? "판매 내역",
    category: record.category ?? "기타",
    total_amount: Math.max(0, Math.round(record.total_amount ?? 0)),
    supply_amount: record.supply_amount ?? vat.supplyAmount,
    vat_amount: record.vat_amount ?? vat.vatAmount,
    payment_method: record.payment_method ?? "unknown",
    sale_status: record.sale_status ?? "needs_review",
    settlement_status: record.settlement_status ?? "pending",
    tax_invoice_status: record.tax_invoice_status ?? "unknown",
    evidence_status: record.evidence_status ?? "needs_review",
    sold_at: record.sold_at ?? record.created_at?.slice(0, 10) ?? "2026-07-06",
    memo: record.memo ?? "",
    created_at: record.created_at ?? new Date().toISOString(),
    updated_at: record.updated_at ?? record.created_at ?? new Date().toISOString(),
  };
}

function normalizeTodaySalesRecord(record: TodaySalesRecord): TodaySalesRecord {
  return {
    ...record,
    source: record.source ?? "manual",
    payment_method: record.payment_method ?? "unknown",
    sales_channel: record.sales_channel ?? "store",
    amount: Math.max(0, Math.round(record.amount ?? 0)),
    memo: record.memo ?? "",
    evidence_status: record.evidence_status ?? "not_required",
    evidence_files_json: record.evidence_files_json ?? "[]",
    created_by: record.created_by ?? record.business_id,
  };
}

function normalizeTodayExpenseRecord(record: TodayExpenseRecord): TodayExpenseRecord {
  return {
    ...record,
    payment_method: record.payment_method ?? "unknown",
    vendor_name: record.vendor_name ?? "",
    amount: Math.max(0, Math.round(record.amount ?? 0)),
    memo: record.memo ?? "",
    evidence_status: record.evidence_status ?? "missing",
    evidence_files_json: record.evidence_files_json ?? "[]",
    is_recurring: record.is_recurring ?? false,
    created_by: record.created_by ?? record.business_id,
  };
}

function normalizePurchaseRecord(record: PurchaseRecord): PurchaseRecord {
  const fallbackVat = calculateVatAmount(record.total_amount);
  return {
    ...record,
    business_id: record.business_id ?? record.buyer_id,
    source: record.source ?? (record.deal_id ? "ssawa" : "manual"),
    source_id: record.source_id ?? record.deal_id ?? record.id,
    supplier_business_id: record.supplier_business_id ?? record.supplier_id,
    purchase_title: record.purchase_title ?? record.memo ?? "구매내역",
    category_name: record.category_name ?? "기타",
    accounting_category: record.accounting_category ?? record.category_name ?? "자재구매",
    item_summary: record.item_summary ?? record.sub_category ?? record.purchase_title ?? "매입 내역",
    auto_category: record.auto_category ?? record.accounting_category ?? record.category_name ?? "미분류",
    category_confidence: record.category_confidence ?? (record.accounting_category === "미분류" ? 0.45 : 0.72),
    category_reason: record.category_reason ?? "기존 매입 데이터를 기준으로 기본 분류했습니다.",
    category_needs_review: record.category_needs_review ?? (record.accounting_category === "미분류" || record.category_name === "기타"),
    category_confirmed_by_user: record.category_confirmed_by_user ?? false,
    category_confirmed_at: record.category_confirmed_at,
    category_rule_id: record.category_rule_id,
    item_count: record.item_count ?? 1,
    supply_amount: record.supply_amount ?? fallbackVat.supplyAmount,
    vat_amount: record.vat_amount ?? fallbackVat.vatAmount,
    delivery_fee: record.delivery_fee ?? 0,
    discount_amount: record.discount_amount ?? 0,
    estimated_savings_amount: record.estimated_savings_amount ?? 0,
    estimated_savings_rate: record.estimated_savings_rate ?? 0,
    receipt_status: record.receipt_status ?? "none",
    delivery_note_status: record.delivery_note_status ?? "none",
    evidence_status: record.evidence_status ?? (record.receipt_status === "none" && record.delivery_note_status === "none" ? "missing" : "needs_review"),
    evidence_files_json: record.evidence_files_json ?? "[]",
    sync_target: record.sync_target ?? "today_jangsa",
    ssawa_deal_id: record.ssawa_deal_id ?? record.deal_id,
    ssawa_quote_request_id: record.ssawa_quote_request_id ?? record.quote_request_id,
    ssawa_supplier_id: record.ssawa_supplier_id ?? record.supplier_id,
    created_by: record.created_by ?? record.buyer_id,
    user_memo: record.user_memo ?? "",
    admin_memo: record.admin_memo ?? "",
  };
}
