export type UserRole = "buyer" | "supplier" | "admin";

export type RequestStatus = "open" | "quoted" | "selected" | "in_progress" | "completed" | "closed" | "cancelled";

export type QuoteStatus = "submitted" | "selected" | "rejected" | "expired" | "cancelled";

export type ApprovalStatus = "pending" | "approved" | "needs_revision" | "rejected" | "suspended";

export type BusinessVerificationStatus =
  | "not_started"
  | "status_checked"
  | "verified"
  | "failed"
  | "manual_review_required"
  | "api_error";

export type BusinessOperatingStatus = "active" | "suspended" | "closed" | "unregistered" | "api_error" | "unknown";

export type BusinessManualReviewStatus = "submitted" | "reviewing" | "approved" | "rejected" | "needs_revision";

export type DealStatus =
  | "pending_confirmation"
  | "confirmed"
  | "preparing"
  | "delivering"
  | "delivered"
  | "completed"
  | "cancelled_by_buyer"
  | "cancelled_by_supplier"
  | "disputed"
  | "closed";

export type PaymentMethod = "bank_transfer" | "card" | "cash" | "later" | "undecided";

export type AttachmentType = "invoice" | "receipt" | "delivery_note" | "tax_invoice" | "photo" | "etc";

export type QuoteRequestInputMethod = "manual" | "photo" | "invoice" | "text" | "template" | "repeat";

export type AttachmentAnalysisStatus = "uploaded" | "analyzing" | "analyzed" | "failed";

export type SupplierDocumentType = "business_license" | "bankbook" | "store_photo" | "price_list" | "etc";

export type SupplierDocumentStatus = "uploaded" | "pending_review" | "approved" | "rejected";

export type TaxInvoiceStatus = "none" | "required" | "requested" | "received" | "not_needed" | "unknown" | "issued" | "pending" | "rejected";

export type ReceiptStatus = "none" | "uploaded" | "pending" | "confirmed";

export type DeliveryNoteStatus = "none" | "uploaded" | "pending" | "confirmed";

export type AccountingStatus = "pending" | "reviewed" | "synced" | "excluded" | "hold" | "failed";

export type SyncTarget = "today_jangsa" | "external" | "none";

export type PurchaseDocumentType = "invoice" | "receipt" | "tax_invoice" | "delivery_note" | "quote" | "photo" | "etc";

export type PurchaseDocumentStatus = "uploaded" | "pending_review" | "confirmed" | "rejected";

export type AccountingEntryType = "purchase" | "expense" | "refund" | "adjustment";

export type AccountingSyncStatus = "pending" | "synced" | "failed" | "excluded";
export type TodayPurchaseSource = "ssawa" | "manual" | "upload" | "card" | "hometax";
export type TodayEvidenceStatus = "complete" | "missing" | "needs_review" | "not_required";
export type TodaySsawaSyncAction = "auto_sync" | "manual_sync" | "resync" | "skip" | "fail";
export type TodaySsawaSyncStatus = "success" | "failed" | "skipped" | "needs_review";
export type TodaySsawaSyncTrigger = "system" | "buyer" | "admin";
export type TodayCategoryRuleType = "item_contains" | "supplier_contains" | "request_category" | "source_category";
export type TodayCategoryRuleSource = "system" | "user";
export type TodayCategoryClassificationAction = "auto_classified" | "user_confirmed" | "user_changed" | "reclassified";
export type TodaySalesSource = "manual" | "upload" | "card" | "delivery_app" | "pos";
export type TodaySalesType = "매장 매출" | "배달앱 매출" | "카드 매출" | "현금 매출" | "기타 매출";
export type TodaySalesPaymentMethod = "card" | "cash" | "transfer" | "delivery_app" | "mixed" | "unknown";
export type TodaySalesChannel = "store" | "baemin" | "yogiyo" | "coupang_eats" | "naver" | "phone_order" | "etc";
export type TodayExpenseType = "임대료" | "인건비" | "공과금" | "배달수수료" | "광고비" | "소모품" | "통신비" | "보험료" | "수리비" | "기타";
export type TodayExpensePaymentMethod = "card" | "cash" | "transfer" | "auto_withdrawal" | "unknown";
export type TodayRecurringRecordType = "expense" | "sales";
export type TodayRecurringRepeatType = "monthly" | "weekly" | "yearly";
export type TaxDocumentSourceType = "purchase" | "sales" | "expense" | "ssawa_deal" | "manual";
export type TaxDocumentType = "tax_invoice" | "receipt" | "card_receipt" | "cash_receipt" | "transaction_statement" | "quote" | "delivery_confirmation" | "bank_transfer" | "invoice" | "contract" | "etc";
export type TaxDocumentStatus = "attached" | "missing" | "needs_review" | "verified" | "rejected";
export type TaxDocumentCheckType = "tax_invoice_required" | "receipt_missing" | "evidence_missing" | "category_unclassified" | "amount_missing" | "supplier_info_missing" | "ssawa_document_available" | "duplicate_possible" | "refund_or_dispute_review";
export type TaxDocumentCheckStatus = "ok" | "warning" | "missing" | "needs_review";
export type TaxDocumentCheckSeverity = "low" | "medium" | "high";
export type TaxExportRequestStatus = "draft" | "generated" | "failed";
export type TaxExportType = "summary" | "csv" | "zip" | "accountant_package";
export type SupplierSaleSource = "ssawa" | "manual" | "upload";
export type SupplierSaleStatus = "pending" | "confirmed" | "completed" | "cancelled" | "refunded" | "disputed" | "needs_review";
export type SupplierSettlementStatus = "not_applicable" | "pending" | "scheduled" | "paid" | "held" | "failed" | "needs_review";
export type SupplierTaxInvoiceStatus = "not_needed" | "required" | "issued" | "requested" | "unknown";
export type SupplierSalePaymentMethod = "direct" | "bank_transfer" | "card" | "ssawa_safe" | "unknown";
export type TodaySupplierSyncAction = "auto_sync" | "manual_sync" | "resync" | "skip" | "fail";
export type TodaySupplierSyncStatus = "success" | "failed" | "skipped" | "needs_review";
export type TodaySupplierSyncTrigger = "system" | "supplier" | "admin";

export type AnalysisSourceType = "invoice" | "quotation" | "receipt" | "delivery_note" | "tax_invoice" | "photo" | "excel" | "text" | "etc";

export type AnalysisJobStatus = "uploaded" | "queued" | "analyzing" | "needs_review" | "completed" | "failed" | "cancelled";

export type AnalysisEngine = "mock" | "ocr" | "ai" | "manual";

export type AnalysisItemReviewStatus = "extracted" | "needs_review" | "confirmed" | "excluded";

export type AnalysisConvertedType = "quote_request" | "purchase_record";

export type AnalysisDisclosureScope = "items_only" | "items_and_conditions" | "total_only" | "item_prices";

export type NotificationType =
  | "quote_received"
  | "quote_updated"
  | "quote_expiring"
  | "supplier_message_received"
  | "buyer_quote_question"
  | "deal_message_received"
  | "deal_created"
  | "deal_confirmed"
  | "deal_preparing"
  | "deal_delivering"
  | "deal_delivered"
  | "deal_completed"
  | "deal_cancelled"
  | "deal_disputed"
  | "analysis_completed"
  | "analysis_needs_review"
  | "purchase_record_created"
  | "accounting_sync_ready"
  | "new_matched_request"
  | "request_updated"
  | "quote_selected"
  | "quote_rejected"
  | "buyer_message_received"
  | "deal_waiting_confirmation"
  | "deal_cancelled_by_buyer"
  | "deal_completed_by_buyer"
  | "document_review_result"
  | "supplier_apply_submitted"
  | "supplier_document_uploaded"
  | "high_value_deal_created"
  | "deal_dispute_created"
  | "analysis_failed"
  | "message_reported"
  | "chat_reported"
  | "suspicious_chat_detected"
  | "long_unanswered_chat"
  | "external_payment_keyword_detected"
  | "system_error"
  | "message_received"
  | "usage_limit_warning"
  | "usage_limit_reached"
  | "platform_fee_created"
  | "settlement_ready"
  | "plan_changed"
  | "trial_ending"
  | "high_revenue_deal_completed"
  | "platform_fee_waived"
  | "supplier_usage_limit_reached"
  | "settlement_pending"
  | "report_submitted"
  | "report_status_updated"
  | "review_reply_received"
  | "review_received"
  | "report_received"
  | "sanction_applied"
  | "reputation_score_updated"
  | "warning_received"
  | "new_report_submitted"
  | "urgent_report_submitted"
  | "low_reputation_supplier_detected"
  | "repeated_dispute_supplier"
  | "review_reported"
  | "product_inquiry_received"
  | "product_order_requested"
  | "product_approval_result"
  | "product_report_received";

export type NotificationEntityType =
  | "quote_request"
  | "quote"
  | "deal"
  | "analysis"
  | "purchase_record"
  | "supplier"
  | "system"
  | "message"
  | "platform_fee"
  | "settlement"
  | "supplier_plan"
  | "billing"
  | "report"
  | "review"
  | "sanction"
  | "reputation"
  | "product"
  | "product_inquiry"
  | "product_order_request";

export type NotificationPriority = "low" | "normal" | "high" | "urgent";

export type NotificationDeliveryStatus = "pending" | "sent" | "failed" | "skipped";

export type MessageThreadType = "quote_request" | "deal" | "supplier" | "support" | "product";

export type MessageThreadStatus = "open" | "closed" | "reported" | "blocked" | "archived";

export type MessageType = "text" | "template" | "image" | "file" | "system" | "quote_condition" | "deal_update";

export type MessageReportStatus = "pending" | "reviewed" | "resolved" | "dismissed";

export type CommissionFeeType = "percentage" | "fixed" | "mixed";

export type VatPolicy = "vat_included" | "vat_excluded" | "not_applicable";

export type PlatformFeeStatus = "estimated" | "pending" | "confirmed" | "invoiced" | "paid" | "waived" | "cancelled";

export type SupplierSubscriptionStatus = "trial" | "active" | "past_due" | "cancelled" | "expired" | "free";

export type QuoteCreditType = "free_monthly" | "purchased" | "admin_grant" | "promotion";

export type SettlementStatus = "draft" | "pending" | "confirmed" | "paid" | "cancelled";

export type SettlementMode = "direct_supplier_payment" | "platform_escrow" | "offline";

export type PaymentMethodStatus = "none" | "pending" | "connected" | "failed";

export type BillingPaymentMethodType = "card" | "bank_transfer" | "virtual_account" | "none";

export type ProductPriceType = "fixed" | "from_price" | "quote_only";

export type ProductDeliveryFeeType = "included" | "separate" | "conditional" | "quote";

export type ProductStockStatus = "in_stock" | "low_stock" | "out_of_stock" | "made_to_order" | "unknown";

export type ProductApprovalStatus = "draft" | "pending" | "approved" | "rejected" | "hidden" | "suspended";

export type ProductInquiryType = "question" | "quote_request" | "order_request";

export type ProductInquiryStatus = "pending" | "answered" | "converted_to_quote" | "converted_to_deal" | "closed";

export type ProductOrderRequestStatus = "pending" | "supplier_confirming" | "confirmed" | "converted_to_deal" | "rejected" | "cancelled";

export type ProductReportReason = "wrong_info" | "prohibited_item" | "fake_price" | "offensive" | "external_trade" | "etc";

export type ProductReportStatus = "pending" | "reviewing" | "resolved" | "dismissed";

export type ReportType =
  | "deal_dispute"
  | "message_report"
  | "supplier_report"
  | "buyer_report"
  | "quote_report"
  | "payment_issue"
  | "delivery_issue"
  | "quality_issue"
  | "tax_invoice_issue"
  | "etc";

export type ReportEntityType = "deal" | "quote_request" | "quote" | "message" | "supplier" | "purchase_record" | "settlement" | "etc";

export type ReportStatus = "submitted" | "reviewing" | "need_more_info" | "action_taken" | "resolved" | "dismissed" | "cancelled";

export type ReportActionType =
  | "memo"
  | "status_change"
  | "request_more_info"
  | "warning"
  | "temporary_restriction"
  | "suspension"
  | "fee_waiver"
  | "refund_guidance"
  | "dismissed"
  | "resolved";

export type ReviewStatus = "active" | "hidden" | "reported" | "deleted";

export type ReviewReportStatus = "pending" | "reviewed" | "dismissed" | "hidden";

export type SupplierGrade = "excellent" | "trusted" | "standard" | "watch" | "review";

export type OperationalStatus = "normal" | "warning" | "restricted" | "suspended" | "banned";

export type SanctionType = "warning" | "quote_restriction" | "deal_restriction" | "message_restriction" | "temporary_suspension" | "permanent_ban";

export type SanctionStatus = "active" | "expired" | "cancelled";

export type BlacklistTargetType = "user" | "business_number" | "phone" | "email" | "supplier";

export type BlacklistStatus = "active" | "inactive";

export type DemoEnvironment = "demo" | "beta" | "production";

export type FeedbackType = "bug" | "usability" | "feature_request" | "supplier_issue" | "quote_issue" | "deal_issue" | "etc";

export type FeedbackStatus = "submitted" | "reviewing" | "planned" | "in_progress" | "resolved" | "dismissed";

export type QaChecklistStatus = "unchecked" | "passed" | "failed" | "skipped";

export type BetaParticipantType = "buyer" | "supplier";

export type BetaParticipantSource = "direct_sales" | "referral" | "community" | "partner" | "landing" | "manual" | "etc";

export type BetaParticipantStatus = "invited" | "signed_up" | "onboarded" | "active" | "inactive" | "dropped";

export type SalesLeadStage = "new" | "contacted" | "interested" | "invited" | "signed_up" | "onboarded" | "active" | "rejected" | "lost";

export type SalesLeadPriority = "low" | "normal" | "high" | "urgent";

export type SalesActivityType = "call" | "sms" | "kakao" | "visit" | "email" | "meeting" | "demo" | "follow_up" | "note";

export type SalesActivityResult = "success" | "no_answer" | "interested" | "not_interested" | "need_follow_up" | "signed_up" | "rejected";

export type BetaExperimentTargetGroup = "buyers" | "suppliers" | "both";

export type BetaExperimentStatus = "planned" | "running" | "completed" | "stopped";

export type BetaFeedbackInsightCategory = "ux" | "bug" | "pricing" | "supplier_quality" | "buyer_need" | "feature_request" | "onboarding" | "trust" | "etc";

export type BetaFeedbackInsightSeverity = "low" | "normal" | "high" | "critical";

export type BetaFeedbackDecision = "do_now" | "do_later" | "reject" | "needs_research";

export type OperatorTaskType = "sales" | "cs" | "qa" | "supplier_onboarding" | "buyer_followup" | "bug_check" | "report" | "etc";

export type OperatorTaskStatus = "todo" | "doing" | "done" | "blocked" | "cancelled";

export type BusinessValidationDecision = "continue" | "pivot" | "pause" | "expand" | "needs_more_data";

export type CategoryFocusStatus = "recommended" | "maintain" | "need_supply" | "need_demand" | "hold" | "expand_candidate";

export type QuoteRiskLevel = "low" | "normal" | "high" | "urgent";

export type QuoteRequestOpsStatus = "normal" | "needs_supplier_match" | "waiting_quotes" | "no_quotes_risk" | "operator_assisting" | "resolved" | "failed";

export type SupplierResponseStatus = "fast" | "normal" | "slow" | "low_participation" | "dormant_risk" | "needs_contact" | "needs_education";

export type ImprovementPriorityStatus = "reviewing" | "apply_now" | "apply_next" | "hold" | "rejected" | "done";

export type FeatureFlagKey =
  | "enable_analysis"
  | "enable_accounting_sync"
  | "enable_supplier_billing"
  | "enable_settlements"
  | "enable_reviews"
  | "enable_reports"
  | "enable_messages"
  | "enable_beta_kpi"
  | "enable_quick_reorder"
  | "enable_favorite_items";

export type RoadmapItemStatus = "planned" | "doing" | "done" | "blocked";

export interface Profile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  business_name: string;
  business_number: string;
  phone: string;
  region: string;
  representative_name?: string;
  business_opening_date?: string;
  business_address?: string;
  business_type?: string;
  business_status?: BusinessOperatingStatus;
  business_tax_type?: string;
  business_verification_status?: BusinessVerificationStatus;
  business_verified_at?: string;
  onboarding_completed?: boolean;
  onboarding_completed_at?: string;
  is_test_user?: boolean;
  created_at: string;
}

export interface Category {
  id: string;
  name: string;
  parent_id: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
}

export interface QuoteRequest {
  id: string;
  buyer_id: string;
  title: string;
  category_id: string;
  category_name: string;
  delivery_region: string;
  delivery_address?: string;
  desired_delivery_date: string;
  need_tax_invoice: boolean;
  card_payment_required: boolean;
  description: string;
  status: RequestStatus;
  created_at: string;
  updated_at: string;
  selected_quote_id?: string;
  attachment_note?: string;
  previous_amount?: number;
  input_method?: QuoteRequestInputMethod;
  request_quality_score?: number;
  expected_supplier_count?: number;
  original_text_input?: string;
  template_name?: string;
  previous_request_id?: string;
  urgent?: boolean;
  preferred_delivery_time?: string;
  budget_min?: number;
  budget_max?: number;
  preferred_brand?: string;
  allow_alternatives?: boolean;
  include_delivery_fee?: boolean;
  estimated_savings_amount?: number;
  estimated_savings_rate?: number;
}

export interface QuoteRequestItem {
  id: string;
  quote_request_id: string;
  item_name: string;
  spec: string;
  quantity: number;
  unit: string;
  memo: string;
  created_at: string;
  is_required?: boolean;
  allow_alternative?: boolean;
  confidence_score?: number;
  needs_review?: boolean;
  review_reason?: string;
}

export interface SupplierProfile {
  id: string;
  user_id: string;
  business_name: string;
  business_number: string;
  representative_name: string;
  manager_name?: string;
  manager_phone?: string;
  phone: string;
  email?: string;
  address?: string;
  description?: string;
  service_regions: string[];
  categories: string[];
  sub_categories?: string[];
  min_order_amount?: number;
  delivery_fee_policy?: string;
  free_delivery_min_amount?: number;
  same_day_delivery_available?: boolean;
  urgent_delivery_available?: boolean;
  delivery_days?: string[];
  delivery_time_slots?: string[];
  tax_invoice_available: boolean;
  card_payment_available: boolean;
  bank_transfer_available?: boolean;
  on_site_payment_available?: boolean;
  default_quote_valid_days?: number;
  approval_status: ApprovalStatus;
  operational_status?: OperationalStatus;
  business_verification_id?: string;
  document_status?: SupplierDocumentStatus;
  approved_by?: string;
  approved_at?: string;
  admin_memo?: string;
  rejection_reason?: string;
  created_at: string;
  updated_at?: string;
}

export interface SupplierDocument {
  id: string;
  supplier_id: string;
  document_type: SupplierDocumentType;
  file_url: string;
  file_name: string;
  status: SupplierDocumentStatus;
  uploaded_at: string;
  reviewed_at?: string;
}

export interface SupplierStats {
  id: string;
  supplier_id: string;
  total_quotes_submitted: number;
  selected_quotes_count: number;
  response_rate: number;
  average_response_minutes: number;
  total_deal_amount: number;
  repeat_customer_rate: number;
  rating: number;
  review_count: number;
  updated_at: string;
}

export interface SupplierReview {
  id: string;
  supplier_id: string;
  buyer_id: string;
  quote_request_id: string;
  rating: number;
  content: string;
  created_at: string;
}

export interface ProductCategory {
  id: string;
  parent_id?: string;
  name: string;
  slug: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface SupplierStoreProfile {
  id: string;
  supplier_id: string;
  store_name: string;
  store_description: string;
  store_logo_url: string;
  store_banner_url: string;
  main_categories: string[];
  delivery_regions: string[];
  business_hours_text: string;
  contact_policy_text: string;
  return_policy_text: string;
  is_public: boolean;
  created_at: string;
  updated_at: string;
}

export interface SupplierProduct {
  id: string;
  supplier_id: string;
  category_id: string;
  title: string;
  short_description: string;
  description: string;
  main_image_url: string;
  image_urls: string[];
  sku: string;
  brand: string;
  origin: string;
  unit_label: string;
  package_unit: string;
  min_order_quantity: number;
  price_type: ProductPriceType;
  price: number;
  from_price: number;
  vat_included: boolean;
  delivery_fee_type: ProductDeliveryFeeType;
  delivery_fee_amount: number;
  available_regions: string[];
  tax_invoice_available: boolean;
  card_payment_available: boolean;
  safe_trade_available: boolean;
  stock_status: ProductStockStatus;
  lead_time_text: string;
  is_featured: boolean;
  is_public: boolean;
  approval_status: ProductApprovalStatus;
  rejection_reason: string;
  view_count: number;
  inquiry_count: number;
  quote_add_count: number;
  order_request_count: number;
  favorite_count: number;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface ProductInquiry {
  id: string;
  product_id: string;
  buyer_id: string;
  supplier_id: string;
  inquiry_type: ProductInquiryType;
  message: string;
  quantity: number;
  desired_delivery_date: string;
  delivery_region: string;
  status: ProductInquiryStatus;
  thread_id: string;
  created_at: string;
  updated_at: string;
}

export interface ProductOrderRequest {
  id: string;
  product_id: string;
  buyer_id: string;
  supplier_id: string;
  quantity: number;
  unit_label: string;
  desired_delivery_date: string;
  delivery_region: string;
  buyer_memo: string;
  supplier_response: string;
  final_price: number;
  status: ProductOrderRequestStatus;
  deal_id?: string;
  created_at: string;
  updated_at: string;
}

export interface ProductFavorite {
  id: string;
  product_id: string;
  buyer_id: string;
  created_at: string;
}

export interface ProductQuoteItem {
  id: string;
  quote_request_id: string;
  product_id: string;
  supplier_id: string;
  quantity: number;
  unit_label: string;
  memo: string;
  created_at: string;
}

export interface ProductReport {
  id: string;
  product_id: string;
  reporter_id: string;
  reason: ProductReportReason;
  detail: string;
  status: ProductReportStatus;
  admin_memo: string;
  created_at: string;
  updated_at: string;
}

export interface Quote {
  id: string;
  quote_request_id: string;
  supplier_id: string;
  total_amount: number;
  delivery_fee: number;
  final_amount: number;
  available_delivery_date: string;
  tax_invoice_available: boolean;
  card_payment_available: boolean;
  alternative_proposal: string;
  item_price_memo: string;
  memo: string;
  valid_until: string;
  status: QuoteStatus;
  created_at: string;
  updated_at: string;
}

export interface QuoteAttachment {
  id: string;
  quote_request_id: string;
  file_url: string;
  file_name: string;
  file_type: string;
  created_at: string;
  analysis_status?: AttachmentAnalysisStatus;
  extracted_text?: string;
  extracted_items_json?: string;
}

export interface Deal {
  id: string;
  quote_request_id: string;
  selected_quote_id: string;
  buyer_id: string;
  supplier_id: string;
  title: string;
  category_name: string;
  delivery_region: string;
  delivery_address: string;
  desired_delivery_date: string;
  confirmed_delivery_date: string;
  subtotal_amount: number;
  delivery_fee: number;
  final_amount: number;
  tax_invoice_required: boolean;
  tax_invoice_available: boolean;
  card_payment_required: boolean;
  card_payment_available: boolean;
  payment_method: PaymentMethod;
  status: DealStatus;
  buyer_memo: string;
  supplier_memo: string;
  cancellation_reason: string;
  dispute_reason: string;
  previous_amount?: number;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface DealItem {
  id: string;
  deal_id: string;
  item_name: string;
  spec: string;
  quantity: number;
  unit: string;
  unit_price: number;
  total_price: number;
  memo: string;
  alternative_item_name: string;
  created_at: string;
}

export interface DealAttachment {
  id: string;
  deal_id: string;
  file_url: string;
  file_name: string;
  file_type: string;
  attachment_type: AttachmentType;
  uploaded_by: "buyer" | "supplier" | "admin";
  created_at: string;
}

export interface PurchaseRecord {
  id: string;
  business_id?: string;
  source?: TodayPurchaseSource;
  source_id?: string;
  deal_id?: string;
  quote_request_id?: string;
  buyer_id: string;
  supplier_id: string;
  supplier_name: string;
  supplier_business_id?: string;
  supplier_business_number?: string;
  purchase_title: string;
  purchase_date: string;
  category_name: string;
  item_summary?: string;
  auto_category?: string;
  category_confidence?: number;
  category_reason?: string;
  category_needs_review?: boolean;
  category_confirmed_by_user?: boolean;
  category_confirmed_at?: string;
  category_rule_id?: string;
  accounting_category: string;
  sub_category?: string;
  item_count: number;
  total_amount: number;
  supply_amount: number;
  vat_amount: number;
  delivery_fee: number;
  discount_amount: number;
  estimated_savings_amount: number;
  estimated_savings_rate: number;
  previous_purchase_amount?: number;
  payment_method: PaymentMethod;
  tax_invoice_status: TaxInvoiceStatus;
  receipt_status: ReceiptStatus;
  delivery_note_status: DeliveryNoteStatus;
  evidence_status?: TodayEvidenceStatus;
  evidence_files_json?: string;
  accounting_status: AccountingStatus;
  sync_target: SyncTarget;
  ssawa_deal_id?: string;
  ssawa_quote_request_id?: string;
  ssawa_supplier_id?: string;
  memo: string;
  user_memo?: string;
  admin_memo?: string;
  created_by?: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface TodayCategory {
  id: string;
  business_id?: string;
  name: string;
  description: string;
  sort_order: number;
  is_default: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface TodayCategoryRule {
  id: string;
  business_id?: string;
  category_name: string;
  rule_type: TodayCategoryRuleType;
  pattern: string;
  confidence: number;
  source: TodayCategoryRuleSource;
  use_count: number;
  last_used_at?: string;
  created_by?: string;
  created_at: string;
  updated_at: string;
}

export interface TodayCategoryClassificationLog {
  id: string;
  business_id?: string;
  purchase_record_id: string;
  previous_category?: string;
  classified_category: string;
  confidence: number;
  reason: string;
  rule_id?: string;
  action: TodayCategoryClassificationAction;
  actor_user_id?: string;
  created_at: string;
}

export interface TodaySalesRecord {
  id: string;
  business_id: string;
  source: TodaySalesSource;
  sales_type: TodaySalesType;
  payment_method: TodaySalesPaymentMethod;
  sales_channel: TodaySalesChannel;
  amount: number;
  sales_date: string;
  memo: string;
  evidence_status: TodayEvidenceStatus;
  evidence_files_json?: string;
  source_id?: string;
  upload_batch_id?: string;
  created_by?: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface TodayExpenseRecord {
  id: string;
  business_id: string;
  expense_type: TodayExpenseType;
  payment_method: TodayExpensePaymentMethod;
  vendor_name: string;
  source?: "manual" | "upload" | "card" | "hometax";
  source_id?: string;
  upload_batch_id?: string;
  amount: number;
  expense_date: string;
  memo: string;
  evidence_status: TodayEvidenceStatus;
  evidence_files_json?: string;
  is_recurring: boolean;
  recurring_rule_id?: string;
  created_by?: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface TodayRecurringRule {
  id: string;
  business_id: string;
  record_type: TodayRecurringRecordType;
  title: string;
  amount: number;
  category: string;
  payment_method: string;
  repeat_type: TodayRecurringRepeatType;
  day_of_month?: number;
  day_of_week?: number;
  start_date: string;
  end_date?: string;
  is_active: boolean;
  created_by?: string;
  created_at: string;
  updated_at: string;
}

export interface TaxDocument {
  id: string;
  business_id: string;
  source_type: TaxDocumentSourceType;
  source_id: string;
  document_type: TaxDocumentType;
  document_name: string;
  file_url?: string;
  file_path?: string;
  file_mime_type?: string;
  file_size?: number;
  amount?: number;
  issued_at?: string;
  supplier_name?: string;
  memo?: string;
  status: TaxDocumentStatus;
  uploaded_by?: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface TaxDocumentCheck {
  id: string;
  business_id: string;
  source_type: TaxDocumentSourceType;
  source_id: string;
  check_type: TaxDocumentCheckType;
  status: TaxDocumentCheckStatus;
  message: string;
  severity: TaxDocumentCheckSeverity;
  created_at: string;
  updated_at: string;
}

export interface TaxExportRequest {
  id: string;
  business_id: string;
  period_start: string;
  period_end: string;
  status: TaxExportRequestStatus;
  export_type: TaxExportType;
  file_url?: string;
  created_by?: string;
  created_at: string;
  updated_at: string;
}

export interface SupplierSalesRecord {
  id: string;
  supplier_business_id: string;
  buyer_business_id: string;
  buyer_display_name: string;
  source: SupplierSaleSource;
  source_id: string;
  ssawa_deal_id?: string;
  ssawa_quote_request_id?: string;
  ssawa_quote_id?: string;
  ssawa_product_id?: string;
  item_summary: string;
  category: string;
  total_amount: number;
  supply_amount?: number;
  vat_amount?: number;
  payment_method: SupplierSalePaymentMethod;
  sale_status: SupplierSaleStatus;
  settlement_status: SupplierSettlementStatus;
  tax_invoice_status: SupplierTaxInvoiceStatus;
  evidence_status: TodayEvidenceStatus;
  sold_at: string;
  completed_at?: string;
  settled_at?: string;
  memo: string;
  created_by?: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface TodaySupplierSyncLog {
  id: string;
  supplier_business_id: string;
  buyer_business_id?: string;
  ssawa_deal_id?: string;
  supplier_sales_record_id?: string;
  action: TodaySupplierSyncAction;
  status: TodaySupplierSyncStatus;
  message: string;
  error_code?: string;
  error_detail?: string;
  triggered_by: TodaySupplierSyncTrigger;
  triggered_user_id?: string;
  payload_snapshot_json: string;
  created_at: string;
}

export interface TodaySsawaSyncLog {
  id: string;
  business_id: string;
  ssawa_deal_id: string;
  purchase_record_id?: string;
  action: TodaySsawaSyncAction;
  status: TodaySsawaSyncStatus;
  message: string;
  error_code?: string;
  error_detail?: string;
  triggered_by: TodaySsawaSyncTrigger;
  triggered_user_id?: string;
  payload_snapshot_json: string;
  created_at: string;
}

export interface PurchaseRecordItem {
  id: string;
  purchase_record_id: string;
  source_deal_item_id?: string;
  item_name: string;
  spec: string;
  quantity: number;
  unit: string;
  unit_price: number;
  total_price: number;
  memo: string;
  created_at: string;
}

export interface PurchaseDocument {
  id: string;
  purchase_record_id: string;
  document_type: PurchaseDocumentType;
  file_url: string;
  file_name: string;
  status: PurchaseDocumentStatus;
  uploaded_by: "buyer" | "supplier" | "admin" | "system";
  created_at: string;
  reviewed_at?: string;
}

export interface AccountingEntry {
  id: string;
  purchase_record_id: string;
  buyer_id: string;
  entry_type: AccountingEntryType;
  accounting_category: string;
  amount: number;
  supply_amount: number;
  vat_amount: number;
  sync_status: AccountingSyncStatus;
  sync_target: SyncTarget;
  synced_at?: string;
  failure_reason?: string;
  created_at: string;
  updated_at: string;
}

export interface AnalysisJob {
  id: string;
  buyer_id: string;
  source_type: AnalysisSourceType;
  original_file_url: string;
  original_file_name: string;
  original_file_type: string;
  original_text_input: string;
  status: AnalysisJobStatus;
  analysis_engine: AnalysisEngine;
  confidence_score: number;
  detected_category: string;
  detected_supplier_name: string;
  detected_business_number: string;
  detected_transaction_date: string;
  detected_total_amount: number;
  detected_supply_amount: number;
  detected_vat_amount: number;
  detected_delivery_fee: number;
  detected_payment_method: PaymentMethod;
  error_message: string;
  created_at: string;
  updated_at: string;
  completed_at?: string;
}

export interface AnalysisItem {
  id: string;
  analysis_job_id: string;
  item_name: string;
  normalized_item_name: string;
  spec: string;
  quantity: number;
  unit: string;
  unit_price: number;
  total_price: number;
  memo: string;
  category_name: string;
  confidence_score: number;
  review_status: AnalysisItemReviewStatus;
  review_reason: string;
  created_at: string;
  updated_at: string;
}

export interface AnalysisAttachment {
  id: string;
  analysis_job_id: string;
  file_url: string;
  file_name: string;
  file_type: string;
  page_number: number;
  preview_url: string;
  created_at: string;
}

export interface AnalysisRawResult {
  id: string;
  analysis_job_id: string;
  raw_text: string;
  raw_json: string;
  created_at: string;
}

export interface AnalysisConversion {
  id: string;
  analysis_job_id: string;
  converted_type: AnalysisConvertedType;
  converted_id: string;
  converted_at: string;
  created_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  user_role: UserRole;
  type: NotificationType;
  title: string;
  body: string;
  link_url: string;
  related_entity_type: NotificationEntityType;
  related_entity_id: string;
  priority: NotificationPriority;
  is_read: boolean;
  read_at?: string;
  is_archived: boolean;
  created_at: string;
}

export interface NotificationEvent {
  id: string;
  event_type: NotificationType;
  actor_user_id: string;
  target_user_id: string;
  target_role: UserRole;
  related_entity_type: NotificationEntityType;
  related_entity_id: string;
  payload_json: string;
  delivery_status: NotificationDeliveryStatus;
  delivery_channels_json: string;
  created_at: string;
  processed_at?: string;
}

export interface NotificationSettings {
  id: string;
  user_id: string;
  in_app_enabled: boolean;
  email_enabled: boolean;
  sms_enabled: boolean;
  kakao_enabled: boolean;
  push_enabled: boolean;
  quote_notifications_enabled: boolean;
  deal_notifications_enabled: boolean;
  analysis_notifications_enabled: boolean;
  accounting_notifications_enabled: boolean;
  message_notifications_enabled: boolean;
  marketing_notifications_enabled: boolean;
  quiet_hours_enabled: boolean;
  quiet_hours_start: string;
  quiet_hours_end: string;
  created_at: string;
  updated_at: string;
}

export interface MessageThread {
  id: string;
  thread_type: MessageThreadType;
  related_entity_id: string;
  buyer_id: string;
  supplier_id: string;
  admin_id: string;
  title: string;
  status: MessageThreadStatus;
  admin_memo?: string;
  is_admin_watching?: boolean;
  last_message_at: string;
  created_at: string;
  updated_at: string;
}

export interface Message {
  id: string;
  thread_id: string;
  sender_id: string;
  sender_role: UserRole | "system";
  message_type?: MessageType;
  body: string;
  attachment_url: string;
  attachment_name: string;
  is_deleted?: boolean;
  is_flagged?: boolean;
  flagged_reason?: string;
  is_read: boolean;
  read_at?: string;
  created_at: string;
}

export interface MessageReadState {
  id: string;
  thread_id: string;
  user_id: string;
  last_read_at: string;
  unread_count: number;
  updated_at: string;
}

export interface MessageReport {
  id: string;
  thread_id: string;
  message_id: string;
  reported_by: string;
  reason: string;
  detail: string;
  status: MessageReportStatus;
  created_at: string;
  updated_at: string;
}

export interface CommissionPolicy {
  id: string;
  category_name: string;
  commission_rate: number;
  fee_type: CommissionFeeType;
  fixed_fee_amount: number;
  min_fee_amount: number;
  max_fee_amount: number;
  vat_policy: VatPolicy;
  is_active: boolean;
  admin_memo: string;
  created_at: string;
  updated_at: string;
}

export interface PlatformFee {
  id: string;
  deal_id: string;
  supplier_id: string;
  buyer_id: string;
  category_name: string;
  deal_final_amount: number;
  commission_rate: number;
  fee_amount: number;
  vat_amount: number;
  total_fee_amount: number;
  fee_status: PlatformFeeStatus;
  settlement_id: string;
  settlement_mode: SettlementMode;
  is_waived: boolean;
  waiver_reason: string;
  waived_by_admin_id: string;
  waived_at?: string;
  created_at: string;
  updated_at: string;
}

export interface SupplierPlan {
  id: string;
  name: string;
  code: string;
  monthly_price: number;
  yearly_price: number;
  quote_participation_limit: number;
  matched_request_view_limit: number;
  priority_exposure_enabled: boolean;
  analytics_enabled: boolean;
  badge_enabled: boolean;
  badge_label: string;
  support_level: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface SupplierSubscription {
  id: string;
  supplier_id: string;
  plan_id: string;
  status: SupplierSubscriptionStatus;
  started_at: string;
  current_period_start: string;
  current_period_end: string;
  cancel_at_period_end: boolean;
  payment_provider: string;
  external_subscription_id: string;
  created_at: string;
  updated_at: string;
}

export interface SupplierUsage {
  id: string;
  supplier_id: string;
  period_start: string;
  period_end: string;
  quotes_submitted_count: number;
  matched_requests_viewed_count: number;
  messages_sent_count: number;
  deals_won_count: number;
  total_deal_amount: number;
  updated_at: string;
}

export interface QuoteParticipationCredit {
  id: string;
  supplier_id: string;
  credit_type: QuoteCreditType;
  total_credits: number;
  used_credits: number;
  remaining_credits: number;
  expires_at: string;
  created_at: string;
  updated_at: string;
}

export interface Settlement {
  id: string;
  supplier_id: string;
  period_start: string;
  period_end: string;
  total_deal_amount: number;
  total_platform_fee: number;
  total_vat_amount: number;
  total_settlement_amount: number;
  status: SettlementStatus;
  payout_due_date: string;
  paid_at?: string;
  memo: string;
  created_at: string;
  updated_at: string;
}

export interface SettlementItem {
  id: string;
  settlement_id: string;
  deal_id: string;
  platform_fee_id: string;
  deal_final_amount: number;
  fee_amount: number;
  vat_amount: number;
  settlement_amount: number;
  created_at: string;
}

export interface BillingEvent {
  id: string;
  event_type: string;
  supplier_id: string;
  deal_id: string;
  subscription_id: string;
  amount: number;
  status: string;
  payload_json: string;
  created_at: string;
}

export interface BillingAccount {
  id: string;
  supplier_id: string;
  billing_email: string;
  business_number: string;
  invoice_recipient_name: string;
  invoice_recipient_phone: string;
  invoice_recipient_email: string;
  payment_method_status: PaymentMethodStatus;
  default_payment_method_type: BillingPaymentMethodType;
  external_customer_id: string;
  created_at: string;
  updated_at: string;
}

export interface Report {
  id: string;
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
  status: ReportStatus;
  priority: NotificationPriority;
  admin_assignee_id: string;
  admin_memo: string;
  resolution_summary: string;
  created_at: string;
  updated_at: string;
  resolved_at?: string;
}

export interface ReportAttachment {
  id: string;
  report_id: string;
  file_url: string;
  file_name: string;
  file_type: string;
  uploaded_by: string;
  created_at: string;
}

export interface ReportAction {
  id: string;
  report_id: string;
  action_type: ReportActionType;
  actor_id: string;
  actor_role: "admin" | "system";
  from_status: ReportStatus;
  to_status: ReportStatus;
  memo: string;
  created_at: string;
}

export interface ReportComment {
  id: string;
  report_id: string;
  writer_id: string;
  writer_role: UserRole;
  body: string;
  is_internal: boolean;
  created_at: string;
}

export interface Review {
  id: string;
  deal_id: string;
  quote_request_id: string;
  buyer_id: string;
  supplier_id: string;
  rating_overall: number;
  rating_price: number;
  rating_delivery: number;
  rating_quality: number;
  rating_communication: number;
  content: string;
  is_public: boolean;
  would_reorder: boolean;
  status: ReviewStatus;
  created_at: string;
  updated_at: string;
}

export interface ReviewReply {
  id: string;
  review_id: string;
  supplier_id: string;
  content: string;
  status: ReviewStatus;
  created_at: string;
  updated_at: string;
}

export interface ReviewReport {
  id: string;
  review_id: string;
  reported_by: string;
  reason: string;
  detail: string;
  status: ReviewReportStatus;
  created_at: string;
  updated_at: string;
}

export interface SupplierReputationScore {
  id: string;
  supplier_id: string;
  total_score: number;
  response_score: number;
  completion_score: number;
  review_score: number;
  dispute_score: number;
  verification_score: number;
  repeat_score: number;
  grade: SupplierGrade;
  badges: string[];
  risk_level: "low" | "medium" | "high";
  updated_at: string;
}

export interface UserSanction {
  id: string;
  user_id: string;
  user_role: "buyer" | "supplier";
  sanction_type: SanctionType;
  reason: string;
  related_report_id: string;
  start_at: string;
  end_at?: string;
  status: SanctionStatus;
  created_by_admin_id: string;
  created_at: string;
  updated_at: string;
}

export interface BlacklistEntry {
  id: string;
  target_type: BlacklistTargetType;
  target_value: string;
  reason: string;
  status: BlacklistStatus;
  created_by_admin_id: string;
  created_at: string;
  updated_at: string;
}

export interface BetaFeedback {
  id: string;
  user_id: string;
  user_role: UserRole;
  feedback_type: FeedbackType;
  title: string;
  description: string;
  page_url: string;
  screenshot_url: string;
  status: FeedbackStatus;
  admin_memo: string;
  created_at: string;
  updated_at: string;
}

export interface QaChecklistItem {
  id: string;
  category: string;
  title: string;
  description: string;
  status: QaChecklistStatus;
  memo: string;
  checked_by: string;
  checked_at?: string;
  created_at: string;
  updated_at: string;
}

export interface BetaTarget {
  id: string;
  period_start: string;
  period_end: string;
  target_buyers: number;
  target_suppliers: number;
  target_quote_requests: number;
  target_quotes: number;
  target_deals: number;
  target_completed_deals: number;
  target_feedbacks: number;
  target_repeat_buyers: number;
  target_active_suppliers: number;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface BetaParticipant {
  id: string;
  user_id?: string;
  participant_type: BetaParticipantType;
  source: BetaParticipantSource;
  status: BetaParticipantStatus;
  assigned_admin_id: string;
  business_name: string;
  contact_name: string;
  phone: string;
  email: string;
  region: string;
  category_interest: string;
  memo: string;
  quote_request_count: number;
  quote_selected_count: number;
  deal_count: number;
  feedback_count: number;
  tags: string[];
  invited_at?: string;
  signed_up_at?: string;
  onboarded_at?: string;
  activated_at?: string;
  dropped_at?: string;
  created_at: string;
  updated_at: string;
}

export interface SalesLead {
  id: string;
  lead_type: BetaParticipantType;
  business_name: string;
  contact_name: string;
  phone: string;
  email: string;
  region: string;
  category: string;
  source: BetaParticipantSource;
  stage: SalesLeadStage;
  priority: SalesLeadPriority;
  assigned_admin_id: string;
  next_action: string;
  next_action_date: string;
  memo: string;
  created_at: string;
  updated_at: string;
}

export interface SalesActivity {
  id: string;
  lead_id: string;
  activity_type: SalesActivityType;
  result: SalesActivityResult;
  memo: string;
  actor_id: string;
  activity_at: string;
  created_at: string;
}

export interface BetaExperiment {
  id: string;
  name: string;
  hypothesis: string;
  target_group: BetaExperimentTargetGroup;
  start_date: string;
  end_date: string;
  status: BetaExperimentStatus;
  success_metric: string;
  result_summary: string;
  next_action: string;
  created_at: string;
  updated_at: string;
}

export interface BetaFeedbackInsight {
  id: string;
  feedback_id: string;
  category: BetaFeedbackInsightCategory;
  severity: BetaFeedbackInsightSeverity;
  priority_score: number;
  impact: number;
  frequency: number;
  effort: number;
  decision: BetaFeedbackDecision;
  admin_memo: string;
  created_at: string;
  updated_at: string;
}

export interface OperatorTask {
  id: string;
  title: string;
  description: string;
  task_type: OperatorTaskType;
  status: OperatorTaskStatus;
  priority: SalesLeadPriority;
  assigned_admin_id: string;
  related_entity_type: string;
  related_entity_id: string;
  due_date: string;
  completed_at?: string;
  created_at: string;
  updated_at: string;
}

export interface BusinessValidationReport {
  id: string;
  period_start: string;
  period_end: string;
  summary: string;
  buyer_findings: string;
  supplier_findings: string;
  kpi_findings: string;
  risk_findings: string;
  recommendation: string;
  decision: BusinessValidationDecision;
  keep_features?: string[];
  reduce_features?: string[];
  hide_features?: string[];
  strengthen_features?: string[];
  focus_category?: string;
  priority_regions?: string[];
  priority_buyer_segments?: string[];
  next_product_priorities?: string[];
  next_sales_priorities?: string[];
  monetization_validation_status?: string;
  launch_blockers?: string[];
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface BusinessVerification {
  id: string;
  user_id: string;
  role_requested: UserRole;
  business_name: string;
  business_number: string;
  representative_name: string;
  opening_date: string;
  phone: string;
  email: string;
  region: string;
  business_address?: string;
  status_check_status: BusinessOperatingStatus;
  status_check_label: string;
  tax_type?: string;
  verification_status: BusinessVerificationStatus;
  verification_method: "nts_status" | "nts_validate" | "manual_review" | "local_mock";
  can_register: boolean;
  failure_reason?: string;
  attempt_count: number;
  raw_status_code?: string;
  raw_valid_code?: string;
  manually_reviewed_by?: string;
  manually_reviewed_at?: string;
  admin_memo?: string;
  created_at: string;
  updated_at: string;
}

export interface BusinessManualReviewRequest {
  id: string;
  user_id: string;
  role_requested: UserRole;
  business_name: string;
  business_number: string;
  representative_name: string;
  opening_date: string;
  phone: string;
  email: string;
  reason: string;
  status: BusinessManualReviewStatus;
  document_name?: string;
  document_url?: string;
  admin_memo?: string;
  reviewed_by?: string;
  reviewed_at?: string;
  created_at: string;
  updated_at: string;
}

export interface BetaKpiSummary {
  target: BetaTarget;
  buyerCount: number;
  activeBuyerCount: number;
  supplierCandidateCount: number;
  approvedSupplierCount: number;
  activeSupplierCount: number;
  quoteRequestCount: number;
  quoteCount: number;
  averageQuotesPerRequest: number;
  averageFirstQuoteHours: number;
  quoteRequestConversionRate: number;
  quoteResponseRate: number;
  quoteSelectionRate: number;
  dealConversionRate: number;
  completedDealRate: number;
  repeatBuyerRate: number;
  activeSupplierRate: number;
  feedbackCount: number;
  openIssueCount: number;
  goalAchievementRate: number;
  estimatedRevenue: number;
}

export interface CategoryPerformance {
  category: string;
  requestCount: number;
  quoteCount: number;
  averageQuotes: number;
  selectedCount: number;
  dealCount: number;
  completedDealCount: number;
  averageDealAmount: number;
  disputeCount: number;
  feedbackCount: number;
  recommendation: "집중" | "유지" | "보류" | "공급망 보강";
}

export interface FunnelMetric {
  label: string;
  count: number;
  conversionRate: number;
  warning?: boolean;
}

export interface FocusSetting {
  id: string;
  focus_category_name: string;
  focus_region: string;
  focus_mode_enabled: boolean;
  buyer_home_message: string;
  supplier_home_message: string;
  priority_template_names: string[];
  created_at: string;
  updated_at: string;
}

export interface FeatureFlag {
  id: string;
  key: FeatureFlagKey;
  name: string;
  description: string;
  enabled: boolean;
  beta_label_enabled: boolean;
  admin_only: boolean;
  created_at: string;
  updated_at: string;
}

export interface FavoriteItemGroup {
  id: string;
  buyer_id: string;
  name: string;
  category_name: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface FavoriteItem {
  id: string;
  group_id: string;
  item_name: string;
  spec: string;
  quantity: number;
  unit: string;
  memo: string;
  allow_alternative: boolean;
  created_at: string;
  updated_at: string;
}

export interface CategoryPlaybook {
  id: string;
  category_name: string;
  target_buyers: string[];
  supplier_types: string[];
  representative_items: string[];
  request_template: string;
  supplier_sales_points: string[];
  buyer_message: string;
  common_issues: string[];
  operator_response: string[];
  success_kpis: string[];
  created_at: string;
  updated_at: string;
}

export interface RoadmapItem {
  id: string;
  title: string;
  description: string;
  week: 1 | 2 | 3 | 4;
  priority: SalesLeadPriority;
  owner_id: string;
  status: RoadmapItemStatus;
  success_metric: string;
  created_at: string;
  updated_at: string;
}

export interface CategoryFocusScore {
  category: string;
  requestCount: number;
  activeSupplierCount: number;
  averageQuotes: number;
  firstQuoteHours: number;
  selectionRate: number;
  dealRate: number;
  repeatRate: number;
  averageDealAmount: number;
  riskRate: number;
  demandScore: number;
  supplyScore: number;
  responseScore: number;
  dealScore: number;
  repeatScore: number;
  revenueScore: number;
  riskPenalty: number;
  focusScore: number;
  status: CategoryFocusStatus;
  reason: string;
}

export interface QuoteRequestOpsInsight {
  request: QuoteRequest;
  buyerName: string;
  elapsedHours: number;
  matchingSupplierCount: number;
  viewedSupplierCount: number;
  quoteCount: number;
  riskLevel: QuoteRiskLevel;
  opsStatus: QuoteRequestOpsStatus;
  assignedAdminName: string;
  nextAction: string;
}

export interface SupplierMatchCandidate {
  supplier: SupplierProfile;
  score: number;
  label: "강력 추천" | "적합" | "조건 일부 확인 필요" | "응답 느림" | "제외 권장";
  reasons: string[];
  responseRate: number;
  averageResponseMinutes: number;
  monthlyQuoteCount: number;
  remainingCredits: number;
  trustScore: number;
}

export interface SupplierResponseOpsRow {
  supplier: SupplierProfile;
  status: SupplierResponseStatus;
  matchedRequestCount: number;
  viewedRequestCount: number;
  quoteCount: number;
  quoteSubmitRate: number;
  averageResponseMinutes: number;
  selectedQuoteCount: number;
  dealWinRate: number;
  lastActiveAt: string;
  action: string;
}

export interface RepeatUsageInsight {
  buyerId: string;
  buyerName: string;
  requestCount: number;
  purchaseCount: number;
  lastCategory: string;
  riskLabel: string;
  recommendedAction: string;
}

export interface DropoffMetric {
  actor: BetaParticipantType;
  stage: string;
  count: number;
  rate: number;
  reason: string;
  action: string;
}

export interface ImprovementPriority {
  id: string;
  title: string;
  category: BetaFeedbackInsightCategory;
  userType: UserRole;
  severity: BetaFeedbackInsightSeverity;
  frequency: number;
  impact: number;
  effort: number;
  score: number;
  decision: BetaFeedbackDecision;
  linkedWork: string[];
  status: ImprovementPriorityStatus;
}

export interface DataQualityCheck {
  label: string;
  status: "good" | "warning" | "needs_review";
  value: string;
  action: string;
}

export interface DealStatusLog {
  id: string;
  deal_id: string;
  from_status: DealStatus | "created";
  to_status: DealStatus;
  changed_by: "buyer" | "supplier" | "admin" | "system";
  memo: string;
  created_at: string;
}

export type TodayRequoteRecommendationType = "category" | "item" | "supplier" | "purchase_record" | "mixed";
export type TodayRequoteRecommendationStatus = "active" | "dismissed" | "draft_created" | "request_submitted" | "expired";
export type TodayRequoteRecommendationLevel = "low" | "medium" | "high";
export type TodaySsawaQuoteDraftCreatedFrom = "today_requote" | "today_purchase" | "manual";
export type TodaySsawaQuoteDraftStatus = "draft" | "opened" | "submitted" | "cancelled" | "expired";
export type TodayRequoteLogAction = "recommendation_created" | "dismissed" | "draft_created" | "draft_opened" | "request_submitted" | "failed";
export type TodayUploadType = "sales" | "expense" | "purchase" | "mixed" | "unknown";
export type TodayUploadContext = "buyer_today" | "supplier_today";
export type TodayUploadBatchStatus = "uploaded" | "parsed" | "mapping_needed" | "ready_to_import" | "imported" | "partially_imported" | "failed" | "cancelled";
export type TodayUploadRecordType = "sales" | "expense" | "purchase" | "unknown";
export type TodayUploadFinalRecordType = TodayUploadRecordType | "skip";
export type TodayUploadValidationStatus = "valid" | "warning" | "invalid" | "duplicate" | "skipped" | "imported";
export type TodayUploadLogAction = "uploaded" | "parsed" | "mapping_changed" | "row_updated" | "imported" | "failed" | "cancelled";
export type TodayUploadTargetField =
  | "date"
  | "amount"
  | "record_type"
  | "category"
  | "counterparty_name"
  | "item_summary"
  | "payment_method"
  | "memo"
  | "tax_invoice_status"
  | "evidence_status"
  | "ignore";
export type SupplierProductEventType = "view" | "inquiry" | "quote_request" | "order_request" | "deal_created" | "deal_completed";
export type SupplierProductEventSource = "ssawa" | "today";
export type SupplierTodayInsightType = "sales_up" | "sales_down" | "quote_conversion_low" | "response_delay" | "settlement_needs_review" | "tax_invoice_needed" | "product_performing" | "product_info_missing";
export type SupplierTodayInsightSeverity = "low" | "medium" | "high";
export type SupplierTaskType = "quote_send" | "delivery_complete" | "buyer_confirmation_wait" | "settlement_check" | "tax_invoice_check" | "product_info_update" | "inquiry_reply";
export type SupplierTaskStatus = "open" | "done" | "dismissed";
export type TodayAIMode = "buyer" | "supplier" | "admin";
export type TodayAIMessageRole = "user" | "assistant" | "system";
export type TodayAIMessageStatus = "success" | "failed" | "blocked";
export type TodayAIInsightMode = "buyer" | "supplier";
export type TodayAIInsightSeverity = "low" | "medium" | "high";
export type TodayAIInsightStatus = "active" | "dismissed" | "resolved" | "expired";
export type TodaySecurityEventType =
  | "unauthorized_access_attempt"
  | "forbidden_business_access"
  | "forbidden_supplier_access"
  | "admin_route_denied"
  | "storage_access_denied"
  | "ai_scope_blocked"
  | "rls_violation_detected"
  | "suspicious_repeated_attempt";
export type TodaySecuritySeverity = "low" | "medium" | "high" | "critical";
export type AdminTodayActionType =
  | "resync_buyer_purchase"
  | "resync_supplier_sale"
  | "rerun_category_classification"
  | "rerun_tax_checks"
  | "reparse_upload"
  | "import_upload_rows"
  | "dismiss_alert"
  | "mark_reviewed"
  | "create_admin_memo"
  | "request_user_action"
  | "check_environment"
  | "view_sensitive_summary"
  | "update_settings";
export type AdminTodayActionResultStatus = "success" | "failed" | "skipped";
export type AdminTodayTargetType =
  | "sync_log"
  | "supplier_sync_log"
  | "upload_batch"
  | "ai_message"
  | "tax_check"
  | "settlement"
  | "security_event"
  | "environment"
  | "settings"
  | "business"
  | "supplier";
export type TodayAdminSettingKey =
  | "sync_failure_threshold"
  | "upload_error_threshold"
  | "large_amount_threshold"
  | "tax_missing_high_amount"
  | "ai_daily_request_limit"
  | "security_repeat_threshold"
  | "settlement_review_threshold"
  | "admin_alerts_enabled";
export type TodayAIInsightType =
  | "profit_summary"
  | "profit_drop_reason"
  | "cost_increase"
  | "requote_suggestion"
  | "missing_evidence"
  | "tax_invoice_check"
  | "data_quality_warning"
  | "supplier_sales_summary"
  | "quote_conversion"
  | "product_performance"
  | "settlement_risk"
  | "tax_invoice_issue"
  | "customer_repeat"
  | "task_priority";

export interface TodayRequoteRecommendation {
  id: string;
  business_id: string;
  recommendation_type: TodayRequoteRecommendationType;
  status: TodayRequoteRecommendationStatus;
  period_key: string;
  category: string;
  item_keyword: string;
  supplier_name?: string;
  related_purchase_record_ids_json: string;
  current_amount: number;
  previous_amount: number;
  delta_amount: number;
  delta_rate: number;
  score: number;
  recommendation_level: TodayRequoteRecommendationLevel;
  reason: string;
  action_label: string;
  action_url?: string;
  ssawa_quote_draft_id?: string;
  ssawa_quote_request_id?: string;
  dismissed_at?: string;
  expires_at?: string;
  created_at: string;
  updated_at: string;
}

export interface TodaySsawaQuoteDraft {
  id: string;
  business_id: string;
  created_from: TodaySsawaQuoteDraftCreatedFrom;
  recommendation_id?: string;
  source_purchase_record_ids_json: string;
  category: string;
  title: string;
  description: string;
  items_json: string;
  preferred_delivery_date?: string;
  delivery_address_snapshot: string;
  region: string;
  attachments_json: string;
  memo: string;
  status: TodaySsawaQuoteDraftStatus;
  ssawa_quote_request_id?: string;
  created_by: string;
  created_at: string;
  updated_at: string;
  expires_at?: string;
}

export interface TodayRequoteLog {
  id: string;
  business_id: string;
  recommendation_id?: string;
  draft_id?: string;
  quote_request_id?: string;
  action: TodayRequoteLogAction;
  message: string;
  payload_json: string;
  created_by: string;
  created_at: string;
}

export interface TodayUploadBatch {
  id: string;
  business_id: string;
  upload_context: TodayUploadContext;
  upload_type: TodayUploadType;
  status: TodayUploadBatchStatus;
  file_name: string;
  file_mime_type: string;
  file_size: number;
  original_header_json: string;
  detected_mapping_json: string;
  row_count: number;
  valid_count: number;
  warning_count: number;
  invalid_count: number;
  duplicate_count: number;
  imported_count: number;
  skipped_count: number;
  error_message?: string;
  created_by: string;
  created_at: string;
  updated_at: string;
  imported_at?: string;
  cancelled_at?: string;
}

export interface TodayUploadRow {
  id: string;
  business_id: string;
  batch_id: string;
  row_index: number;
  row_hash: string;
  raw_json: string;
  mapped_json: string;
  detected_record_type: TodayUploadRecordType;
  final_record_type: TodayUploadFinalRecordType;
  validation_status: TodayUploadValidationStatus;
  validation_messages_json: string;
  duplicate_candidate_json: string;
  import_target_table?: "sales_records" | "expense_records" | "purchase_records";
  import_target_id?: string;
  imported_at?: string;
  created_at: string;
  updated_at: string;
}

export interface TodayUploadColumnMapping {
  id: string;
  business_id: string;
  batch_id: string;
  source_column_name: string;
  target_field: TodayUploadTargetField;
  confidence: number;
  sample_values_json: string;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface TodayUploadLog {
  id: string;
  business_id: string;
  batch_id: string;
  row_id?: string;
  action: TodayUploadLogAction;
  message: string;
  payload_json: string;
  created_by: string;
  created_at: string;
}

export interface SupplierProductEvent {
  id: string;
  supplier_business_id: string;
  product_id?: string;
  buyer_business_id?: string;
  event_type: SupplierProductEventType;
  source: SupplierProductEventSource;
  metadata_json: string;
  created_at: string;
}

export interface SupplierTodayInsight {
  id: string;
  supplier_business_id: string;
  type: SupplierTodayInsightType;
  severity: SupplierTodayInsightSeverity;
  title: string;
  message: string;
  action_label: string;
  action_url: string;
  related_id?: string;
  created_at: string;
}

export interface SupplierTask {
  id: string;
  supplier_business_id: string;
  task_type: SupplierTaskType;
  title: string;
  message: string;
  status: SupplierTaskStatus;
  related_type?: string;
  related_id?: string;
  due_at?: string;
  created_at: string;
  updated_at: string;
}

export interface TodayAIConversation {
  id: string;
  business_id?: string;
  supplier_business_id?: string;
  user_id: string;
  mode: TodayAIMode;
  title: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface TodayAIMessage {
  id: string;
  conversation_id: string;
  business_id?: string;
  supplier_business_id?: string;
  user_id: string;
  role: TodayAIMessageRole;
  message_text: string;
  context_summary_json: string;
  evidence_json: string;
  actions_json: string;
  safety_warnings_json: string;
  model_name?: string;
  token_usage_json?: string;
  status: TodayAIMessageStatus;
  error_message?: string;
  created_at: string;
}

export interface TodayAIInsight {
  id: string;
  business_id?: string;
  supplier_business_id?: string;
  mode: TodayAIInsightMode;
  insight_type: TodayAIInsightType;
  severity: TodayAIInsightSeverity;
  title: string;
  message: string;
  evidence_json: string;
  actions_json: string;
  status: TodayAIInsightStatus;
  created_at: string;
  updated_at: string;
}

export interface TodayAIUsage {
  id: string;
  business_id?: string;
  supplier_business_id?: string;
  user_id: string;
  mode: TodayAIMode;
  request_count: number;
  token_count?: number;
  date: string;
  created_at: string;
  updated_at: string;
}

export interface TodaySecurityEvent {
  id: string;
  user_id?: string;
  role?: UserRole;
  business_id?: string;
  supplier_business_id?: string;
  event_type: TodaySecurityEventType;
  severity: TodaySecuritySeverity;
  route: string;
  resource_type: string;
  resource_id?: string;
  message: string;
  ip_hash?: string;
  user_agent_hash?: string;
  created_at: string;
}

export interface AdminTodayAction {
  id: string;
  admin_user_id: string;
  action_type: AdminTodayActionType;
  target_type: AdminTodayTargetType;
  target_id: string;
  business_id?: string;
  supplier_business_id?: string;
  before_status?: string;
  after_status?: string;
  memo: string;
  result_status: AdminTodayActionResultStatus;
  error_message?: string;
  created_at: string;
}

export interface TodayAdminSetting {
  id: string;
  setting_key: TodayAdminSettingKey;
  setting_value: string;
  value_type: "number" | "boolean" | "string";
  description: string;
  updated_by?: string;
  updated_at: string;
  created_at: string;
}

export type TodayNotificationAudience = "buyer" | "supplier" | "admin";
export type TodayNotificationStatus = "unread" | "read" | "done" | "dismissed";
export type TodayNotificationSeverity = "info" | "warning" | "critical" | "success";
export type TodayNotificationCategory = "tax" | "evidence" | "category" | "cost" | "requote" | "upload" | "ai" | "sync" | "quote" | "deal" | "settlement" | "security" | "env" | "feedback";
export type TodayNotificationChannel = "in_app" | "email" | "sms" | "kakao" | "push";
export type TodayReminderFrequency = "instant" | "daily" | "weekly" | "manual";
export type TodayGuideAudience = "common" | TodayNotificationAudience;
export type TodayLaunchChecklistStatus = "todo" | "doing" | "done" | "blocked";
export type TodayBetaApplicationType = "buyer" | "supplier";
export type TodayBetaApplicationStatus = "submitted" | "contacted" | "accepted" | "rejected";
export type TodaySupportTicketStatus = "open" | "reviewing" | "resolved";
export type TodayProductEventName = "page_view" | "cta_click" | "notification_action" | "onboarding_step" | "help_search" | "feedback_submit" | "beta_apply" | "upload_import" | "requote_draft";
export type TodayBacklogStatus = "new" | "triaged" | "planned" | "in_progress" | "done" | "wont_do";

export interface TodayNotification {
  id: string;
  audience: TodayNotificationAudience;
  user_id: string;
  business_id?: string;
  supplier_business_id?: string;
  category: TodayNotificationCategory;
  severity: TodayNotificationSeverity;
  status: TodayNotificationStatus;
  title: string;
  message: string;
  action_label: string;
  action_url: string;
  amount?: number;
  due_at?: string;
  group_key: string;
  dedupe_key: string;
  generated_from: string;
  created_at: string;
  read_at?: string;
  completed_at?: string;
  dismissed_at?: string;
}

export interface TodayNotificationPreference {
  id: string;
  audience: TodayNotificationAudience;
  user_id: string;
  category: TodayNotificationCategory;
  in_app_enabled: boolean;
  email_enabled: boolean;
  sms_enabled: boolean;
  kakao_enabled: boolean;
  push_enabled: boolean;
  frequency: TodayReminderFrequency;
  quiet_hours_start: string;
  quiet_hours_end: string;
  updated_at: string;
}

export interface TodayReminderRule {
  id: string;
  audience: TodayNotificationAudience;
  category: TodayNotificationCategory;
  name: string;
  condition_text: string;
  frequency: TodayReminderFrequency;
  channels: TodayNotificationChannel[];
  enabled: boolean;
  created_at: string;
  updated_at: string;
}

export interface TodayNotificationDeliveryLog {
  id: string;
  notification_id: string;
  channel: TodayNotificationChannel;
  status: "queued" | "skipped" | "sent" | "failed";
  provider: string;
  message: string;
  created_at: string;
}

export interface TodayOnboardingProgress {
  id: string;
  audience: TodayNotificationAudience;
  user_id: string;
  completed_step_ids: string[];
  dismissed_guide_ids: string[];
  last_opened_at: string;
  completed_at?: string;
  updated_at: string;
}

export interface TodayHelpArticle {
  id: string;
  audience: TodayGuideAudience;
  category: string;
  title: string;
  body: string;
  tags: string[];
  safe_copy: string;
  route_hint: string;
  updated_at: string;
}

export interface TodayLaunchChecklistItem {
  id: string;
  category: string;
  title: string;
  description: string;
  owner: string;
  status: TodayLaunchChecklistStatus;
  evidence_url: string;
  updated_at: string;
}

export interface TodayPricingPlan {
  id: string;
  audience: TodayBetaApplicationType;
  name: string;
  price_label: string;
  description: string;
  features: string[];
  beta_badge: string;
}

export interface TodayBetaApplication {
  id: string;
  application_type: TodayBetaApplicationType;
  business_name: string;
  contact_name: string;
  phone: string;
  email: string;
  region: string;
  memo: string;
  consent_marketing: boolean;
  status: TodayBetaApplicationStatus;
  created_at: string;
  updated_at: string;
}

export interface TodaySupportTicket {
  id: string;
  user_role: TodayGuideAudience;
  user_id?: string;
  title: string;
  description: string;
  page_url: string;
  status: TodaySupportTicketStatus;
  created_at: string;
  updated_at: string;
}

export interface TodayProductEvent {
  id: string;
  user_id?: string;
  user_role: TodayGuideAudience;
  event_name: TodayProductEventName;
  page_url: string;
  metadata_json: string;
  created_at: string;
}

export interface TodayBetaSurveyResponse {
  id: string;
  user_id: string;
  user_role: TodayNotificationAudience;
  score: number;
  nps_score: number;
  comment: string;
  pain_point: string;
  created_at: string;
}

export interface TodayBetaBacklogItem {
  id: string;
  source_type: "feedback" | "survey" | "analytics" | "operator";
  source_id: string;
  title: string;
  description: string;
  user_segment: string;
  impact_score: number;
  effort_score: number;
  priority_score: number;
  status: TodayBacklogStatus;
  owner: string;
  created_at: string;
  updated_at: string;
}

export interface TodayBetaSegment {
  id: string;
  label: string;
  audience: TodayNotificationAudience;
  user_count: number;
  activation_rate: number;
  retention_rate: number;
  feedback_count: number;
  risk_note: string;
}

export interface AppData {
  environment: DemoEnvironment;
  is_demo: boolean;
  demo_label: string;
  onboarding_completed: boolean;
  onboarding_completed_at?: string;
  profiles: Profile[];
  categories: Category[];
  quote_requests: QuoteRequest[];
  quote_request_items: QuoteRequestItem[];
  supplier_profiles: SupplierProfile[];
  supplier_documents: SupplierDocument[];
  supplier_stats: SupplierStats[];
  supplier_reviews: SupplierReview[];
  product_categories: ProductCategory[];
  supplier_store_profiles: SupplierStoreProfile[];
  supplier_products: SupplierProduct[];
  product_inquiries: ProductInquiry[];
  product_order_requests: ProductOrderRequest[];
  product_favorites: ProductFavorite[];
  product_quote_items: ProductQuoteItem[];
  product_reports: ProductReport[];
  quotes: Quote[];
  quote_attachments: QuoteAttachment[];
  deals: Deal[];
  deal_items: DealItem[];
  deal_attachments: DealAttachment[];
  purchase_records: PurchaseRecord[];
  purchase_record_items: PurchaseRecordItem[];
  purchase_documents: PurchaseDocument[];
  tax_documents: TaxDocument[];
  tax_document_checks: TaxDocumentCheck[];
  tax_export_requests: TaxExportRequest[];
  supplier_sales_records: SupplierSalesRecord[];
  today_supplier_sync_logs: TodaySupplierSyncLog[];
  sales_records: TodaySalesRecord[];
  expense_records: TodayExpenseRecord[];
  recurring_rules: TodayRecurringRule[];
  today_categories: TodayCategory[];
  today_category_rules: TodayCategoryRule[];
  today_category_classification_logs: TodayCategoryClassificationLog[];
  today_ssawa_sync_logs: TodaySsawaSyncLog[];
  accounting_entries: AccountingEntry[];
  analysis_jobs: AnalysisJob[];
  analysis_items: AnalysisItem[];
  analysis_attachments: AnalysisAttachment[];
  analysis_raw_results: AnalysisRawResult[];
  analysis_conversions: AnalysisConversion[];
  notifications: Notification[];
  notification_events: NotificationEvent[];
  notification_settings: NotificationSettings[];
  message_threads: MessageThread[];
  messages: Message[];
  message_read_states: MessageReadState[];
  message_reports: MessageReport[];
  commission_policies: CommissionPolicy[];
  platform_fees: PlatformFee[];
  supplier_plans: SupplierPlan[];
  supplier_subscriptions: SupplierSubscription[];
  supplier_usage: SupplierUsage[];
  quote_participation_credits: QuoteParticipationCredit[];
  settlements: Settlement[];
  settlement_items: SettlementItem[];
  billing_events: BillingEvent[];
  billing_accounts: BillingAccount[];
  reports: Report[];
  report_attachments: ReportAttachment[];
  report_actions: ReportAction[];
  report_comments: ReportComment[];
  reviews: Review[];
  review_replies: ReviewReply[];
  review_reports: ReviewReport[];
  supplier_reputation_scores: SupplierReputationScore[];
  user_sanctions: UserSanction[];
  blacklist_entries: BlacklistEntry[];
  business_verifications: BusinessVerification[];
  business_manual_review_requests: BusinessManualReviewRequest[];
  feedbacks: BetaFeedback[];
  qa_checklists: QaChecklistItem[];
  beta_targets: BetaTarget[];
  beta_participants: BetaParticipant[];
  sales_leads: SalesLead[];
  sales_activities: SalesActivity[];
  beta_experiments: BetaExperiment[];
  beta_feedback_insights: BetaFeedbackInsight[];
  operator_tasks: OperatorTask[];
  business_validation_reports: BusinessValidationReport[];
  focus_settings: FocusSetting[];
  feature_flags: FeatureFlag[];
  favorite_item_groups: FavoriteItemGroup[];
  favorite_items: FavoriteItem[];
  category_playbooks: CategoryPlaybook[];
  roadmap_items: RoadmapItem[];
  deal_status_logs: DealStatusLog[];
  today_requote_recommendations: TodayRequoteRecommendation[];
  today_ssawa_quote_drafts: TodaySsawaQuoteDraft[];
  today_requote_logs: TodayRequoteLog[];
  today_upload_batches: TodayUploadBatch[];
  today_upload_rows: TodayUploadRow[];
  today_upload_column_mappings: TodayUploadColumnMapping[];
  today_upload_logs: TodayUploadLog[];
  supplier_product_events: SupplierProductEvent[];
  supplier_today_insights: SupplierTodayInsight[];
  supplier_tasks: SupplierTask[];
  today_ai_conversations: TodayAIConversation[];
  today_ai_messages: TodayAIMessage[];
  today_ai_insights: TodayAIInsight[];
  today_ai_usage: TodayAIUsage[];
  today_security_events: TodaySecurityEvent[];
  admin_today_actions: AdminTodayAction[];
  today_admin_settings: TodayAdminSetting[];
  today_notifications: TodayNotification[];
  today_notification_preferences: TodayNotificationPreference[];
  today_reminder_rules: TodayReminderRule[];
  today_notification_delivery_logs: TodayNotificationDeliveryLog[];
  today_onboarding_progress: TodayOnboardingProgress[];
  today_help_articles: TodayHelpArticle[];
  today_launch_checklist: TodayLaunchChecklistItem[];
  today_pricing_plans: TodayPricingPlan[];
  today_beta_applications: TodayBetaApplication[];
  today_support_tickets: TodaySupportTicket[];
  today_product_events: TodayProductEvent[];
  today_beta_survey_responses: TodayBetaSurveyResponse[];
  today_beta_backlog: TodayBetaBacklogItem[];
  today_beta_segments: TodayBetaSegment[];
}

export interface AnalysisJobInput {
  source_type: AnalysisSourceType;
  file_name: string;
  file_type: string;
  original_text_input: string;
}

export interface ManualPurchaseDraft {
  purchase_title: string;
  supplier_name: string;
  supplier_business_number: string;
  purchase_date: string;
  category_name: string;
  accounting_category: string;
  sub_category: string;
  total_amount: number;
  supply_amount: number;
  vat_amount: number;
  delivery_fee: number;
  discount_amount: number;
  payment_method: PaymentMethod;
  tax_invoice_status: TaxInvoiceStatus;
  receipt_status: ReceiptStatus;
  delivery_note_status: DeliveryNoteStatus;
  memo: string;
  items: Array<{
    item_name: string;
    spec: string;
    quantity: number;
    unit: string;
    unit_price: number;
    total_price: number;
    memo: string;
  }>;
}

export interface QuoteRequestDraft {
  title: string;
  category_id: string;
  delivery_region: string;
  delivery_address: string;
  desired_delivery_date: string;
  need_tax_invoice: boolean;
  card_payment_required: boolean;
  description: string;
  attachment_note: string;
  previous_amount: number;
  input_method: QuoteRequestInputMethod;
  original_text_input: string;
  template_name: string;
  previous_request_id: string;
  urgent: boolean;
  preferred_delivery_time: string;
  budget_min: number;
  budget_max: number;
  preferred_brand: string;
  allow_alternatives: boolean;
  include_delivery_fee: boolean;
  items: Array<Omit<QuoteRequestItem, "id" | "quote_request_id" | "created_at">>;
  attachments: QuoteAttachmentDraft[];
}

export interface QuoteAttachmentDraft {
  file_name: string;
  file_type: string;
  analysis_status: AttachmentAnalysisStatus;
  extracted_text: string;
  extracted_items_json: string;
}

export interface SupplierDocumentDraft {
  document_type: SupplierDocumentType;
  file_name: string;
  status: SupplierDocumentStatus;
}

export interface SupplierProductDraft {
  title: string;
  category_id: string;
  short_description: string;
  description: string;
  main_image_url: string;
  sku: string;
  brand: string;
  origin: string;
  unit_label: string;
  package_unit: string;
  min_order_quantity: number;
  price_type: ProductPriceType;
  price: number;
  from_price: number;
  vat_included: boolean;
  delivery_fee_type: ProductDeliveryFeeType;
  delivery_fee_amount: number;
  available_regions: string[];
  tax_invoice_available: boolean;
  card_payment_available: boolean;
  safe_trade_available: boolean;
  stock_status: ProductStockStatus;
  lead_time_text: string;
  is_featured: boolean;
  is_public: boolean;
  approval_status: ProductApprovalStatus;
}

export interface ProductInquiryDraft {
  inquiry_type: ProductInquiryType;
  message: string;
  quantity: number;
  desired_delivery_date: string;
  delivery_region: string;
}

export interface ProductOrderRequestDraft {
  quantity: number;
  desired_delivery_date: string;
  delivery_region: string;
  buyer_memo: string;
}

export interface SupplierApplicationDraft {
  business_name: string;
  representative_name: string;
  business_number: string;
  phone: string;
  email: string;
  address: string;
  manager_name: string;
  manager_phone: string;
  description: string;
  categories: string[];
  sub_categories: string[];
  service_regions: string[];
  min_order_amount: number;
  delivery_fee_policy: string;
  free_delivery_min_amount: number;
  same_day_delivery_available: boolean;
  urgent_delivery_available: boolean;
  delivery_days: string[];
  delivery_time_slots: string[];
  tax_invoice_available: boolean;
  card_payment_available: boolean;
  bank_transfer_available: boolean;
  on_site_payment_available: boolean;
  default_quote_valid_days: number;
  documents: SupplierDocumentDraft[];
}

export interface QuoteDraft {
  supplier_id: string;
  total_amount: number;
  delivery_fee: number;
  available_delivery_date: string;
  tax_invoice_available: boolean;
  card_payment_available: boolean;
  alternative_proposal: string;
  item_price_memo: string;
  memo: string;
  valid_until: string;
}
