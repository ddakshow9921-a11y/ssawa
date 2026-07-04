import { FormEvent, ReactNode, useEffect, useMemo, useState } from "react";
import {
  addDealAttachment,
  addPurchaseDocument,
  addReportComment,
  addReviewReply,
  analysisDisclosureScopeLabels,
  analysisItemReviewStatusLabels,
  analysisSourceTypeLabels,
  analysisStatusLabels,
  accountingStatusLabels,
  applyUserSanction,
  blacklistStatusLabels,
  blacklistTargetTypeLabels,
  archiveNotification,
  calculateEstimatedSavings,
  calculateEstimatedSavingsSummary,
  calculateCommissionAmount,
  calculatePurchaseSummary,
  calculateRequestQuality,
  calculateSupplierMatchScore,
  canSubmitQuoteByPlan,
  categoryDescriptions,
  commissionFeeTypeLabels,
  convertAnalysisToPurchaseRecord,
  convertAnalysisToQuoteRequest,
  createAnalysisJob,
  createBetaFeedback,
  createDealReview,
  createManualPurchaseRecord,
  createReport,
  createQuote,
  createDealFromQuote,
  createQuoteRequest,
  createSupplierApplication,
  dealStatusLabels,
  deliveryNoteStatusLabels,
  closeMessageThread,
  ensureDealMessageThread,
  ensureRequestMessageThread,
  estimateSupplierMatches,
  getAccountingCategory,
  getCategoryRevenueBreakdown,
  getCommissionPolicyForCategory,
  getMonthlyRevenueTrend,
  getMatchedSuppliersForRequest,
  getNotificationsForUser,
  getOperationsSummary,
  getPlatformFeesBySupplier,
  getRevenueSummary,
  getSupplierReputation,
  getSupplierCurrentPlan,
  getSupplierSettlements,
  getSupplierSubscription,
  getSupplierUsageSummary,
  getSupplierUsageForCurrentPeriod,
  getSupplierRevenueRanking,
  getUnreadNotificationCount,
  getVisibleRequestsForSupplier,
  environmentLabels,
  feedbackStatusLabels,
  feedbackTypeLabels,
  groupPurchasesByCategory,
  groupPurchasesBySupplier,
  isDemoMode,
  loadData,
  markOnboardingCompleted,
  markAllNotificationsAsRead,
  markNotificationAsRead,
  markThreadAsRead,
  messageThreadStatusLabels,
  messageThreadTypeLabels,
  notificationEntityLabels,
  notificationPriorityLabels,
  notificationTypeLabels,
  operationalStatusLabels,
  paymentMethodLabels,
  paymentMethodStatusLabels,
  parseItemsFromText,
  platformFeeStatusLabels,
  purchaseDocumentStatusLabels,
  purchaseDocumentTypeLabels,
  quoteStatusLabels,
  qaChecklistStatusLabels,
  receiptStatusLabels,
  recalculateSupplierReputation,
  requestInputMethodLabels,
  requestStatusLabels,
  requestTemplates,
  resetData,
  resetDemoData,
  reportActionTypeLabels,
  reportEntityTypeLabels,
  reportMessage,
  reportReview,
  reportStatusLabels,
  reportTypeLabels,
  reviewReportStatusLabels,
  reviewStatusLabels,
  runMockAnalysis,
  sendThreadMessage,
  settlementModeLabels,
  settlementStatusLabels,
  sanctionStatusLabels,
  sanctionTypeLabels,
  supplierGradeLabels,
  supplierApprovalLabels,
  supplierDocumentStatusLabels,
  supplierDocumentTypeLabels,
  supplierSubscriptionStatusLabels,
  supplierSubCategoryOptions,
  taxInvoiceStatusLabels,
  commonServiceRegions,
  updateBillingAccount,
  updateBlacklistStatus,
  updateCommissionPolicy,
  updateDealStatus,
  updateAnalysisItem,
  updateAnalysisJob,
  updateFeedback,
  updateMessageReportStatus,
  updateNotificationSettings,
  updatePlatformFeeStatus,
  updatePurchaseAccountingStatus,
  updatePurchaseRecord,
  updateReportStatus,
  updateReviewStatus,
  updateSanctionStatus,
  updateSettlementStatus,
  updateQaChecklist,
  updateSupplierApprovalStatus,
  updateSupplierPlan,
  updateSupplierSubscriptionPlan,
  updateSupplierProfile,
  vatPolicyLabels,
  waivePlatformFee,
} from "./data/sawaData";
import type { AccountingStatus, AnalysisDisclosureScope, AnalysisItem, AnalysisItemReviewStatus, AnalysisJobStatus, AnalysisSourceType, AppData, AttachmentAnalysisStatus, AttachmentType, BetaFeedback, BillingAccount, BlacklistStatus, CommissionPolicy, Deal, DealStatus, DeliveryNoteStatus, FeedbackStatus, FeedbackType, ManualPurchaseDraft, Message, MessageReportStatus, MessageThread, Notification, NotificationPriority, PaymentMethod, PlatformFee, PlatformFeeStatus, PurchaseDocumentType, PurchaseRecord, QaChecklistStatus, Quote, QuoteAttachmentDraft, QuoteDraft, QuoteRequest, QuoteRequestDraft, QuoteRequestInputMethod, QuoteRequestItem, ReceiptStatus, Report, ReportActionType, ReportEntityType, ReportStatus, ReportType, Review, ReviewReportStatus, ReviewStatus, SanctionStatus, SanctionType, Settlement, SettlementStatus, SupplierApplicationDraft, SupplierDocumentDraft, SupplierPlan, SupplierProfile, SupplierReputationScore, TaxInvoiceStatus, UserRole } from "./types";
import { appConfig, environmentLabel, isLiveModeReady } from "./lib/env";
import { isSupabaseConfigured, SUPABASE_PROJECT_URL } from "./lib/supabase/client";
import { storageBuckets } from "./lib/supabase/storage";
import { liveFeatureMatrix } from "./services/liveDataService";

const today = "2026-07-04";

const navItems = [
  { label: "홈", path: "/app", icon: Home },
  { label: "견적요청", path: "/app/requests", icon: ClipboardList },
  { label: "분석", path: "/app/analyze", icon: SearchCheck },
  { label: "거래", path: "/app/deals", icon: ReceiptText },
  { label: "장부", path: "/app/accounting", icon: Landmark },
  { label: "알림", path: "/app/notifications", icon: Bell },
  { label: "공급업체", path: "/app/supplier", icon: Store },
  { label: "관리자", path: "/app/admin", icon: ShieldCheck },
];

const mobileNavItems = [
  { label: "홈", path: "/app", icon: Home },
  { label: "견적", path: "/app/requests", icon: ClipboardList },
  { label: "거래", path: "/app/deals", icon: ReceiptText },
  { label: "자료", path: "/app/analyze", icon: SearchCheck },
  { label: "알림", path: "/app/notifications", icon: Bell },
];

const emptyItem = {
  item_name: "",
  spec: "",
  quantity: 1,
  unit: "개",
  memo: "",
  is_required: true,
  allow_alternative: true,
  confidence_score: 96,
  needs_review: false,
  review_reason: "",
};

export default function App() {
  const [path, setPath] = useState(normalizePath(window.location.pathname));
  const [data, setData] = useState<AppData>(() => loadData());

  useEffect(() => {
    const onPopState = () => setPath(normalizePath(window.location.pathname));
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  function navigate(nextPath: string) {
    const normalized = normalizePath(nextPath);
    window.history.pushState({}, "", normalized);
    setPath(normalized);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function replaceData(nextData: AppData) {
    setData(nextData);
  }

  const page = renderRoute(path, data, navigate, replaceData);
  const buyerUnreadNotifications = getUnreadNotificationCount(data, "buyer-1");

  return (
    <div className="appShell">
      <aside className="sidebar" aria-label="주요 메뉴">
        <button className="brandButton" type="button" onClick={() => navigate("/app")}>
          <img src="/아이콘.png" alt="" className="brandIcon" />
          <span>
            <strong>싸와!</strong>
            <small>자재 견적구매</small>
          </span>
        </button>
        <nav className="sideNav">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = path === item.path || (item.path !== "/app" && path.startsWith(item.path));
            return (
              <button className={active ? "navButton active" : "navButton"} type="button" onClick={() => navigate(item.path)} key={item.path}>
                <span className="navIconWrap">
                  <Icon size={18} />
                  {item.path === "/app/notifications" && buyerUnreadNotifications > 0 && <UnreadBadge count={buyerUnreadNotifications} />}
                </span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
        <div className="sidebarFooter">
          <span>오늘 기준 샘플 데이터</span>
          <strong>{today}</strong>
        </div>
      </aside>

      <main className="mainPane">
        <header className="topbar">
          <button className="mobileBrand" type="button" onClick={() => navigate("/app")} aria-label="홈으로 이동">
            <img src="/아이콘.png" alt="" />
            <span>싸와!</span>
          </button>
          <div className="topbarActions">
            {isDemoMode(data) && <span className="demoBadge">{environmentLabels[data.environment]} 데이터</span>}
            <button className="ghostButton" type="button" onClick={() => replaceData(resetDemoData())}>
              <RefreshCcw size={16} />
              데모 초기화
            </button>
            <button className="ghostButton compact notificationTopButton" type="button" onClick={() => navigate("/app/notifications")}>
              <Bell size={16} />
              알림
              {buyerUnreadNotifications > 0 && <UnreadBadge count={buyerUnreadNotifications} />}
            </button>
            <button className="primaryButton compact" type="button" onClick={() => navigate("/app/requests/new")}>
              <Plus size={16} />
              견적요청
            </button>
          </div>
        </header>
        {page}
      </main>

      <nav className="bottomNav" aria-label="모바일 주요 메뉴">
        {mobileNavItems.map((item) => {
          const Icon = item.icon;
          const active = path === item.path || (item.path !== "/app" && path.startsWith(item.path));
          return (
            <button className={active ? "bottomNavButton active" : "bottomNavButton"} type="button" onClick={() => navigate(item.path)} key={item.path}>
              <span className="navIconWrap">
                <Icon size={18} />
                {item.path === "/app/notifications" && buyerUnreadNotifications > 0 && <UnreadBadge count={buyerUnreadNotifications} />}
              </span>
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}

function renderRoute(path: string, data: AppData, navigate: Navigate, setData: (data: AppData) => void) {
  if (path === "/terms") return <PolicyPage type="terms" navigate={navigate} />;
  if (path === "/privacy") return <PolicyPage type="privacy" navigate={navigate} />;
  if (path === "/operation-policy") return <PolicyPage type="operation" navigate={navigate} />;
  if (path === "/safety") return <PolicyPage type="safety" navigate={navigate} />;
  if (path === "/beta") return <BetaNoticePage navigate={navigate} appMode={false} />;
  if (path === "/beta-notice") return <BetaNoticePage navigate={navigate} appMode={false} />;
  if (path === "/partners" || path === "/supplier/apply") return <PartnersPage navigate={navigate} />;
  if (path === "/app" || path === "/") return <HomePage data={data} navigate={navigate} />;
  if (path === "/app/onboarding" || path === "/app/buyer/onboarding") return <OnboardingPage data={data} navigate={navigate} setData={setData} role="buyer" />;
  if (path === "/app/supplier/onboarding") return <OnboardingPage data={data} navigate={navigate} setData={setData} role="supplier" />;
  if (path === "/app/beta") return <BetaNoticePage navigate={navigate} appMode />;
  if (path === "/app/feedback") return <FeedbackPage data={data} navigate={navigate} setData={setData} />;
  if (path === "/app/notifications/settings") return <NotificationSettingsPage data={data} setData={setData} userId="buyer-1" navigate={navigate} />;
  if (path === "/app/notifications") return <NotificationsPage data={data} navigate={navigate} setData={setData} userId="buyer-1" userRole="buyer" />;
  if (path === "/app/analyze") return <AnalyzePage data={data} navigate={navigate} setData={setData} />;
  if (path === "/app/analyze/history") return <AnalysisHistoryPage data={data} navigate={navigate} />;
  if (path.startsWith("/app/analyze/")) return <AnalysisDetailPage data={data} navigate={navigate} setData={setData} analysisId={path.split("/").pop() ?? ""} />;
  if (path.startsWith("/app/requests/new/from-analysis/")) return <AnalysisToRequestPage data={data} navigate={navigate} setData={setData} analysisId={path.split("/").pop() ?? ""} />;
  if (path === "/app/requests/new") return <NewRequestPage data={data} navigate={navigate} setData={setData} />;
  if (path === "/app/requests") return <RequestsPage data={data} navigate={navigate} />;
  if (path.startsWith("/app/requests/") && path.endsWith("/messages")) return <RequestMessagesPage data={data} navigate={navigate} setData={setData} requestId={path.split("/")[3] ?? ""} />;
  if (path.startsWith("/app/requests/")) return <RequestDetailPage data={data} navigate={navigate} setData={setData} requestId={path.split("/").pop() ?? ""} />;
  if (path.startsWith("/app/purchases/from-analysis/")) return <AnalysisToPurchasePage data={data} navigate={navigate} setData={setData} analysisId={path.split("/").pop() ?? ""} />;
  if (path === "/app/purchases/new") return <NewPurchasePage data={data} navigate={navigate} setData={setData} />;
  if (path === "/app/purchases") return <PurchasesPage data={data} navigate={navigate} />;
  if (path.startsWith("/app/purchases/")) return <PurchaseDetailPage data={data} navigate={navigate} setData={setData} purchaseId={path.split("/").pop() ?? ""} />;
  if (path === "/app/reports/new") return <NewReportPage data={data} navigate={navigate} setData={setData} />;
  if (path === "/app/reports") return <UserReportsPage data={data} navigate={navigate} />;
  if (path.startsWith("/app/reports/") && !path.startsWith("/app/reports/purchases") && !path.startsWith("/app/reports/savings")) return <UserReportDetailPage data={data} navigate={navigate} setData={setData} reportId={path.split("/").pop() ?? ""} />;
  if (path === "/app/reports/purchases") return <PurchaseReportPage data={data} navigate={navigate} />;
  if (path === "/app/reports/savings") return <SavingsReportPage data={data} navigate={navigate} />;
  if (path === "/app/accounting") return <AccountingDashboardPage data={data} navigate={navigate} setData={setData} />;
  if (path === "/app/accounting/pending") return <AccountingPendingPage data={data} navigate={navigate} setData={setData} />;
  if (path === "/app/deals") return <BuyerDealsPage data={data} navigate={navigate} />;
  if (path.startsWith("/app/deals/") && path.endsWith("/messages")) return <DealMessagesPage data={data} navigate={navigate} setData={setData} dealId={path.split("/")[3] ?? ""} />;
  if (path.startsWith("/app/deals/") && path.endsWith("/review")) return <DealReviewPage data={data} navigate={navigate} setData={setData} dealId={path.split("/")[3] ?? ""} />;
  if (path.startsWith("/app/deals/")) return <DealDetailPage data={data} navigate={navigate} setData={setData} dealId={path.split("/").pop() ?? ""} role="buyer" />;
  if (path.startsWith("/app/suppliers/")) return <SupplierPublicProfilePage data={data} navigate={navigate} supplierId={path.split("/").pop() ?? ""} />;
  if (path === "/app/supplier") return <SupplierDashboard data={data} navigate={navigate} />;
  if (path === "/app/supplier/notifications") return <NotificationsPage data={data} navigate={navigate} setData={setData} userId="sup-1-user" userRole="supplier" />;
  if (path === "/app/supplier/reputation") return <SupplierReputationPage data={data} navigate={navigate} setData={setData} />;
  if (path === "/app/supplier/billing") return <SupplierBillingPage data={data} navigate={navigate} setData={setData} />;
  if (path === "/app/supplier/usage") return <SupplierUsagePage data={data} navigate={navigate} />;
  if (path === "/app/supplier/settlements") return <SupplierSettlementsPage data={data} navigate={navigate} setData={setData} />;
  if (path === "/app/supplier/apply") return <SupplierApplyPage data={data} navigate={navigate} setData={setData} />;
  if (path === "/app/supplier/profile") return <SupplierProfilePage data={data} navigate={navigate} setData={setData} />;
  if (path === "/app/supplier/settings") return <SupplierSettingsPage data={data} navigate={navigate} setData={setData} />;
  if (path === "/app/supplier/deals") return <SupplierDealsPage data={data} navigate={navigate} />;
  if (path === "/app/supplier/requests") return <SupplierRequestsPage data={data} navigate={navigate} />;
  if (path.startsWith("/app/supplier/requests/")) return <SupplierRequestDetailPage data={data} navigate={navigate} setData={setData} requestId={path.split("/").pop() ?? ""} />;
  if (path === "/app/supplier/quotes") return <SupplierQuotesPage data={data} navigate={navigate} />;
  if (path === "/app/admin") return <AdminDashboard data={data} navigate={navigate} />;
  if (path === "/app/admin/notifications") return <NotificationsPage data={data} navigate={navigate} setData={setData} userId="admin-1" userRole="admin" admin />;
  if (path === "/app/admin/messages") return <AdminMessagesPage data={data} navigate={navigate} />;
  if (path.startsWith("/app/admin/messages/")) return <AdminMessageDetailPage data={data} navigate={navigate} setData={setData} threadId={path.split("/").pop() ?? ""} />;
  if (path === "/app/admin/reports") return <AdminReportsPage data={data} navigate={navigate} />;
  if (path.startsWith("/app/admin/reports/")) return <AdminReportDetailPage data={data} navigate={navigate} setData={setData} reportId={path.split("/").pop() ?? ""} />;
  if (path === "/app/admin/reviews") return <AdminReviewsPage data={data} navigate={navigate} setData={setData} />;
  if (path === "/app/admin/reputation") return <AdminReputationPage data={data} navigate={navigate} setData={setData} />;
  if (path === "/app/admin/sanctions") return <AdminSanctionsPage data={data} navigate={navigate} setData={setData} />;
  if (path === "/app/admin/operations") return <AdminOperationsPage data={data} navigate={navigate} />;
  if (path === "/app/admin/feedback") return <AdminFeedbackPage data={data} navigate={navigate} setData={setData} />;
  if (path === "/app/admin/qa") return <AdminQaPage data={data} navigate={navigate} setData={setData} />;
  if (path === "/app/admin/supabase") return <AdminSupabasePage data={data} navigate={navigate} />;
  if (path === "/app/admin/revenue") return <AdminRevenuePage data={data} navigate={navigate} />;
  if (path === "/app/admin/commissions") return <AdminCommissionsPage data={data} setData={setData} />;
  if (path === "/app/admin/plans") return <AdminPlansPage data={data} setData={setData} />;
  if (path === "/app/admin/settlements") return <AdminSettlementsPage data={data} setData={setData} />;
  if (path === "/app/admin/billing") return <AdminBillingPage data={data} navigate={navigate} setData={setData} />;
  if (path === "/app/admin/analysis") return <AdminAnalysisPage data={data} navigate={navigate} />;
  if (path.startsWith("/app/admin/analysis/")) return <AdminAnalysisDetailPage data={data} navigate={navigate} analysisId={path.split("/").pop() ?? ""} />;
  if (path === "/app/admin/deals") return <AdminDealsPage data={data} navigate={navigate} />;
  if (path === "/app/admin/purchases") return <AdminPurchasesPage data={data} navigate={navigate} setData={setData} />;
  if (path === "/app/admin/accounting") return <AdminAccountingPage data={data} navigate={navigate} setData={setData} />;
  if (path === "/app/admin/requests") return <AdminRequestsPage data={data} navigate={navigate} />;
  if (path === "/app/admin/suppliers") return <AdminSuppliersPage data={data} setData={setData} />;
  if (path === "/app/admin/categories") return <AdminCategoriesPage data={data} />;
  return <NotFound navigate={navigate} />;
}

function OnboardingPage({ data, navigate, setData, role }: MutatingPageProps & { role: "buyer" | "supplier" }) {
  const steps = role === "buyer"
    ? [
        ["필요한 자재를 올리세요", "사진, 거래명세서, 문장으로 쉽게 견적요청을 만들 수 있습니다."],
        ["업체들이 견적합니다", "지역과 카테고리에 맞는 공급업체가 견적을 제출합니다."],
        ["비교하고 선택하세요", "금액, 배송일, 세금계산서, 후기, 신뢰도를 비교하세요."],
        ["구매내역은 장부로 정리됩니다", "거래 완료 후 구매내역을 오늘장사 장부에 반영할 수 있습니다."],
      ]
    : [
        ["입점 신청하세요", "사업자 정보와 취급 카테고리를 등록합니다."],
        ["지역 견적요청을 받아보세요", "납품 가능 지역과 카테고리에 맞는 요청을 확인합니다."],
        ["빠르게 견적하세요", "빠른 응답과 정확한 견적은 선택 확률을 높입니다."],
        ["거래와 정산을 관리하세요", "거래 상태, 후기, 신뢰도, 수수료 내역을 확인합니다."],
      ];

  function complete() {
    window.localStorage.setItem(`ssawa-onboarding-${role}`, new Date().toISOString());
    setData(markOnboardingCompleted(data));
    navigate(role === "buyer" ? "/app/requests/new" : "/app/supplier");
  }

  return (
    <Page>
      <PageTitle eyebrow={role === "buyer" ? "구매자 온보딩" : "공급업체 온보딩"} title="싸와! 베타를 빠르게 시작해보세요." desc="처음 사용하는 흐름을 네 단계로 정리했습니다." />
      <div className="onboardingGrid">
        {steps.map(([title, desc], index) => (
          <article className="onboardingCard" key={title}>
            <span>{index + 1}</span>
            <h2>{title}</h2>
            <p>{desc}</p>
          </article>
        ))}
      </div>
      {data.onboarding_completed && <p className="savingText">온보딩 완료 기록: {data.onboarding_completed_at?.slice(0, 10) ?? "저장됨"}</p>}
      <div className="formActions">
        <button className="secondaryButton" type="button" onClick={() => navigate(role === "buyer" ? "/app" : "/app/supplier")}>나중에 보기</button>
        <button className="primaryButton" type="button" onClick={complete}>{role === "buyer" ? "견적요청 시작" : "공급업체 홈으로"}</button>
      </div>
    </Page>
  );
}

function PolicyPage({ type, navigate }: { type: "terms" | "privacy" | "operation" | "safety"; navigate: Navigate }) {
  const content = policyContent(type);
  return (
    <Page narrow>
      <BackButton onClick={() => navigate("/app")} label="싸와 홈" />
      <PageTitle eyebrow="베타 정책 초안" title={content.title} desc="본 문서는 베타 테스트 안내용 초안이며, 정식 약관 확정 전 전문가 검토가 필요합니다." />
      <section className="policyNotice">
        <ShieldCheck />
        <p>TODO: 정식 출시 전 법률 전문가 검토, 회사 정보, 문의처, 보관 기간, 수수료 정책 확정본을 반영해야 합니다.</p>
      </section>
      <div className="policyList">
        {content.sections.map((section) => (
          <article className="toolPanel" key={section.title}>
            <h2>{section.title}</h2>
            <p>{section.body}</p>
          </article>
        ))}
      </div>
      <PolicyLinks navigate={navigate} />
    </Page>
  );
}

function BetaNoticePage({ navigate, appMode }: { navigate: Navigate; appMode: boolean }) {
  const available = ["견적요청 등록", "공급업체 견적 제출", "견적 비교", "거래 상태 관리", "자료 업로드/분석 mock", "구매내역 정리 mock", "알림/문의", "후기/신고"];
  const limited = ["실제 카드결제", "실제 에스크로", "세금계산서 자동 발행", "홈택스 연동", "카카오/문자 알림", "실제 AI/OCR API는 환경에 따라 mock"];
  return (
    <Page>
      {appMode && <BackButton onClick={() => navigate("/app")} label="앱 홈" />}
      <PageTitle eyebrow="베타 테스트" title="싸와!는 현재 베타 테스트 단계입니다." desc="견적요청, 견적제출, 거래상태 관리, 자료분석 흐름을 검증하고 있습니다." />
      <section className="betaHero">
        <div>
          <span className="eyebrow">Beta</span>
          <h2>실제 운영 전, 핵심 흐름을 먼저 검증합니다.</h2>
          <p>테스트 데이터와 실제 데이터가 혼동되지 않도록 데모 표시를 유지하고, 제한 기능은 명확히 안내합니다.</p>
        </div>
        <button className="primaryButton" type="button" onClick={() => navigate("/app/feedback")}>불편한 점 남기기</button>
      </section>
      <div className="twoColumn">
        <InfoPanel title="베타에서 가능한 기능" items={available} />
        <InfoPanel title="베타에서 제한되는 기능" items={limited} />
      </div>
      <section className="quickGrid">
        <ActionTile title="오류 신고하기" desc="현재 페이지 URL과 함께 피드백을 남깁니다." icon={<Bell />} onClick={() => navigate("/app/feedback")} />
        <ActionTile title="공급업체 입점 문의" desc="입점 신청과 승인 상태 흐름을 확인합니다." icon={<Store />} onClick={() => navigate("/app/supplier/apply")} />
        <ActionTile title="안전거래 안내" desc="외부 결제 주의와 신고 방법을 확인합니다." icon={<ShieldCheck />} onClick={() => navigate("/safety")} />
      </section>
    </Page>
  );
}

function PartnersPage({ navigate }: { navigate: Navigate }) {
  return (
    <Page>
      <BackButton onClick={() => navigate("/app")} label="앱 홈" />
      <section className="betaHero">
        <div>
          <span className="eyebrow">Beta Partners</span>
          <h2>구매자는 더 나은 견적을, 공급업체는 신규 거래처를 만납니다.</h2>
          <p>싸와! 베타는 식자재, 포장재, 소모품, 설비자재 공급업체와 실제 구매 의사가 있는 사업자를 제한적으로 연결합니다.</p>
        </div>
        <div className="heroActions">
          <button className="primaryButton" type="button" onClick={() => navigate("/app/requests/new")}>견적요청 베타 참여</button>
          <button className="secondaryButton" type="button" onClick={() => navigate("/app/supplier/apply")}>파트너 입점 신청</button>
        </div>
      </section>
      <div className="twoColumn">
        <InfoPanel title="구매자 베타" items={[
          "기존 거래명세서만 올려도 비교 견적 흐름을 테스트할 수 있습니다.",
          "식자재, 포장재, 소모품 구매 요청을 한 번에 등록합니다.",
          "베타 기간에는 앱 안 결제 없이 견적/거래 상태를 먼저 검증합니다.",
        ]} />
        <InfoPanel title="공급업체 파트너" items={[
          "초기 베타 입점비 없이 신규 거래처 요청을 받아볼 수 있습니다.",
          "지역/카테고리 기반 요청 매칭과 견적 제출 흐름을 검증합니다.",
          "거래, 후기, 신뢰도 관리 구조를 함께 테스트합니다.",
        ]} />
      </div>
      <section className="quickGrid">
        <ActionTile title="파트너 혜택" desc="초기 입점비 없음, 지역 기반 요청 매칭, 거래처 확보." icon={<Store />} onClick={() => navigate("/app/supplier/apply")} />
        <ActionTile title="베타 안내" desc="가능 기능과 제한 기능을 확인합니다." icon={<ShieldCheck />} onClick={() => navigate("/beta")} />
        <ActionTile title="피드백 남기기" desc="테스트 중 불편한 점을 운영팀에 전달합니다." icon={<Bell />} onClick={() => navigate("/app/feedback")} />
      </section>
    </Page>
  );
}

function FeedbackPage({ data, navigate, setData }: MutatingPageProps) {
  const [feedbackType, setFeedbackType] = useState<FeedbackType>("usability");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [pageUrl, setPageUrl] = useState(() => window.location.href);
  const [screenshotUrl, setScreenshotUrl] = useState("");
  const [submittedId, setSubmittedId] = useState("");

  function submit(event: FormEvent) {
    event.preventDefault();
    const result = createBetaFeedback(data, {
      user_id: "buyer-1",
      user_role: "buyer",
      feedback_type: feedbackType,
      title,
      description,
      page_url: pageUrl,
      screenshot_url: screenshotUrl,
    });
    setData(result.data);
    setSubmittedId(result.feedbackId);
    setTitle("");
    setDescription("");
  }

  return (
    <Page narrow>
      <BackButton onClick={() => navigate("/app/beta")} label="베타 안내" />
      <PageTitle eyebrow="베타 피드백" title="사용 중 불편한 점을 알려주세요." desc="오류, 사용성, 기능 요청을 베타 운영팀이 확인합니다." />
      {submittedId && <p className="savingText">피드백이 접수되었습니다. 접수번호 {submittedId}</p>}
      <form className="formStack" onSubmit={submit}>
        <Field label="유형">
          <select value={feedbackType} onChange={(event) => setFeedbackType(event.target.value as FeedbackType)}>
            {Object.entries(feedbackTypeLabels).map(([key, label]) => <option value={key} key={key}>{label}</option>)}
          </select>
        </Field>
        <Field label="제목">
          <input value={title} onChange={(event) => setTitle(event.target.value)} required placeholder="예: 모바일에서 정산 표가 좁게 보여요" />
        </Field>
        <Field label="내용">
          <textarea value={description} onChange={(event) => setDescription(event.target.value)} required placeholder="문제가 발생한 상황과 기대한 동작을 적어주세요." />
        </Field>
        <Field label="현재 페이지 URL">
          <input value={pageUrl} onChange={(event) => setPageUrl(event.target.value)} />
        </Field>
        <Field label="첨부 파일명 또는 스크린샷 URL mock">
          <input value={screenshotUrl} onChange={(event) => setScreenshotUrl(event.target.value)} placeholder="예: mobile-settlement.png" />
        </Field>
        <button className="primaryButton full" type="submit">피드백 접수</button>
      </form>
    </Page>
  );
}

function AdminFeedbackPage({ data, navigate, setData }: MutatingPageProps) {
  const [filter, setFilter] = useState("전체");
  const visibleFeedbacks = data.feedbacks
    .filter((entry) => filter === "전체" || feedbackStatusLabels[entry.status] === filter)
    .sort((a, b) => b.created_at.localeCompare(a.created_at));
  const statusCounts = countBy(data.feedbacks, (entry) => feedbackStatusLabels[entry.status]);

  return (
    <Page>
      <BackButton onClick={() => navigate("/app/admin")} label="관리자 홈" />
      <PageTitle eyebrow="베타 운영" title="베타 피드백 관리" desc="테스터가 남긴 오류, 사용성 의견, 기능 요청을 상태별로 관리합니다." />
      <div className="dashboardGrid">
        <Metric label="전체 피드백" value={`${data.feedbacks.length}건`} icon={<Bell />} />
        <Metric label="오류 신고" value={`${data.feedbacks.filter((entry) => entry.feedback_type === "bug").length}건`} icon={<ShieldCheck />} />
        <Metric label="검토 중" value={`${data.feedbacks.filter((entry) => entry.status === "reviewing").length}건`} icon={<RefreshCcw />} />
        <Metric label="반영 예정" value={`${data.feedbacks.filter((entry) => entry.status === "planned").length}건`} icon={<Check />} />
      </div>
      <div className="adminInsightGrid">
        <StatList title="상태별 피드백" items={statusCounts} />
        <InfoPanel title="운영 기준" items={["오류 신고는 재현 경로와 화면 URL을 확인합니다.", "사용성 의견은 모바일 우선순위로 분류합니다.", "기능 요청은 11단계 이후 backlog로 분리합니다."]} />
      </div>
      <FilterTabs options={["전체", ...Object.values(feedbackStatusLabels)]} active={filter} onChange={setFilter} />
      <div className="reviewModerationGrid">
        {visibleFeedbacks.map((feedback) => <FeedbackAdminCard key={feedback.id} data={data} feedback={feedback} setData={setData} />)}
      </div>
    </Page>
  );
}

function FeedbackAdminCard({ data, feedback, setData }: { data: AppData; feedback: BetaFeedback; setData: (data: AppData) => void }) {
  const [memo, setMemo] = useState(feedback.admin_memo);
  return (
    <article className="toolPanel">
      <div className="listHeader">
        <div>
          <strong>{feedback.title}</strong>
          <p>{feedback.description}</p>
        </div>
        <StatusBadge tone={feedbackStatusTone(feedback.status)}>{feedbackStatusLabels[feedback.status]}</StatusBadge>
      </div>
      <div className="detailMeta">
        <span>{feedbackTypeLabels[feedback.feedback_type]}</span>
        <span>{roleLabel(feedback.user_role)} · {userLabel(data, feedback.user_id)}</span>
        <span>{feedback.page_url}</span>
      </div>
      <Field label="처리 상태">
        <select value={feedback.status} onChange={(event) => setData(updateFeedback(data, feedback.id, { status: event.target.value as FeedbackStatus }))}>
          {Object.entries(feedbackStatusLabels).map(([key, label]) => <option value={key} key={key}>{label}</option>)}
        </select>
      </Field>
      <Field label="관리자 메모">
        <textarea value={memo} onChange={(event) => setMemo(event.target.value)} />
      </Field>
      <button className="ghostButton" type="button" onClick={() => setData(updateFeedback(data, feedback.id, { admin_memo: memo }))}>메모 저장</button>
    </article>
  );
}

function AdminQaPage({ data, navigate, setData }: MutatingPageProps) {
  const [failedOnly, setFailedOnly] = useState(false);
  const items = failedOnly ? data.qa_checklists.filter((entry) => entry.status === "failed") : data.qa_checklists;
  const completeCount = data.qa_checklists.filter((entry) => entry.status === "passed" || entry.status === "skipped").length;
  const completionRate = Math.round((completeCount / Math.max(1, data.qa_checklists.length)) * 100);

  return (
    <Page>
      <BackButton onClick={() => navigate("/app/admin")} label="관리자 홈" />
      <PageTitle eyebrow="베타 QA" title="출시 전 QA 체크리스트" desc="구매자, 공급업체, 관리자, 모바일, 정책, 배포 항목을 점검합니다." />
      <div className="dashboardGrid">
        <Metric label="전체 항목" value={`${data.qa_checklists.length}개`} icon={<ClipboardList />} />
        <Metric label="완료율" value={`${completionRate}%`} icon={<BadgeCheck />} />
        <Metric label="실패 항목" value={`${data.qa_checklists.filter((entry) => entry.status === "failed").length}개`} icon={<ShieldCheck />} />
        <Metric label="미점검" value={`${data.qa_checklists.filter((entry) => entry.status === "unchecked").length}개`} icon={<Bell />} />
      </div>
      <section className="statusNotice">
        <div>
          <h2>데모/베타 데이터 구분</h2>
          <p>{environmentLabels[data.environment]} 환경 · {data.demo_label} · 실제 사용자 데이터와 분리하기 위한 mock 표시입니다.</p>
        </div>
        <button className="secondaryButton" type="button" onClick={() => setData(resetDemoData())}>데모 데이터 복구</button>
      </section>
      <Toggle checked={failedOnly} label="실패 항목만 보기" onChange={setFailedOnly} />
      <div className="qaList">
        {items.map((item) => <QaChecklistCard key={item.id} data={data} item={item} setData={setData} />)}
      </div>
    </Page>
  );
}

function QaChecklistCard({ data, item, setData }: { data: AppData; item: AppData["qa_checklists"][number]; setData: (data: AppData) => void }) {
  const [memo, setMemo] = useState(item.memo);
  return (
    <article className="qaCard">
      <div className="listHeader">
        <div>
          <span className="eyebrow">{item.category}</span>
          <strong>{item.title}</strong>
          <p>{item.description}</p>
        </div>
        <StatusBadge tone={qaStatusTone(item.status)}>{qaChecklistStatusLabels[item.status]}</StatusBadge>
      </div>
      <div className="formGrid">
        <Field label="점검 상태">
          <select value={item.status} onChange={(event) => setData(updateQaChecklist(data, item.id, { status: event.target.value as QaChecklistStatus }))}>
            {Object.entries(qaChecklistStatusLabels).map(([key, label]) => <option value={key} key={key}>{label}</option>)}
          </select>
        </Field>
        <Field label="메모">
          <input value={memo} onChange={(event) => setMemo(event.target.value)} />
        </Field>
      </div>
      <button className="ghostButton compact" type="button" onClick={() => setData(updateQaChecklist(data, item.id, { memo }))}>메모 저장</button>
    </article>
  );
}

function HomePage({ data, navigate }: PageProps) {
  const activeRequests = data.quote_requests.filter((request) => request.status === "open" || request.status === "quoted").length;
  const submittedQuotes = data.quotes.length;
  const approvedSuppliers = data.supplier_profiles.filter((supplier) => supplier.approval_status === "approved").length;
  const purchaseSummary = calculatePurchaseSummary(data.purchase_records.filter((record) => record.buyer_id === "buyer-1"));

  return (
    <Page>
      <section className="heroBand">
        <div className="heroCopy">
          <img src="/로고.png" alt="싸와!" className="heroLogo" />
          <h1 className="heroLead">필요한 자재를 올리면, 업체들이 견적합니다.</h1>
          <p className="heroSub">식자재부터 포장재, 소모품, 설비자재까지 사업자 구매견적을 한 번에 비교하세요.</p>
          <div className="heroActions">
            <button className="primaryButton" type="button" onClick={() => navigate("/app/requests/new")}>
              <FilePlus2 size={18} />
              견적요청하기
            </button>
            <button className="secondaryButton" type="button" onClick={() => navigate("/partners")}>
              <Store size={18} />
              공급업체 입점
            </button>
          </div>
        </div>
        <div className="heroPanel" aria-label="싸와 핵심 지표">
          <Metric label="열린 요청" value={`${activeRequests}건`} icon={<ClipboardList />} />
          <Metric label="도착 견적" value={`${submittedQuotes}건`} icon={<ReceiptText />} />
          <Metric label="승인 업체" value={`${approvedSuppliers}곳`} icon={<BadgeCheck />} />
          <Metric label="장부 대기" value={`${purchaseSummary.pendingCount}건`} icon={<Landmark />} />
        </div>
      </section>

      <BetaLimitationsNotice navigate={navigate} context="home" />

      <section className="quickGrid" aria-label="주요 작업">
        <ActionTile title="견적요청하기" desc="필요한 자재와 납품 조건을 등록합니다." icon={<FilePlus2 />} onClick={() => navigate("/app/requests/new")} />
        <ActionTile title="자료 자동분석" desc="거래명세서, 견적서, 카톡 내용을 품목으로 정리합니다." icon={<SearchCheck />} onClick={() => navigate("/app/analyze")} />
        <ActionTile title="구매내역 보기" desc="완료 거래와 수동 등록 매입을 장부 기준으로 정리합니다." icon={<ReceiptText />} onClick={() => navigate("/app/purchases")} />
        <ActionTile title="오늘장사 장부" desc="매입비 반영 대기 건을 확인하고 mock 반영합니다." icon={<Landmark />} onClick={() => navigate("/app/accounting")} />
        <ActionTile title="지난 구매 다시 견적" desc="반복 구매 재견적 흐름을 준비합니다." icon={<RefreshCcw />} disabled />
        <ActionTile title="공급업체 입점하기" desc="지역과 카테고리 기반 요청을 확인합니다." icon={<Store />} onClick={() => navigate("/app/supplier")} />
      </section>

      <section className="landingSection">
        <SectionHeader title="구매자 이용 흐름" />
        <div className="flowGrid">
          {["올리기", "견적받기", "비교하기", "거래하기", "장부정리"].map((step, index) => (
            <div className="flowStep" key={step}><span>{index + 1}</span><strong>{step}</strong></div>
          ))}
        </div>
      </section>

      <section className="landingSection">
        <SectionHeader title="공급업체 이용 흐름" />
        <div className="flowGrid supplierFlow">
          {["입점하기", "요청받기", "견적하기", "거래하기"].map((step, index) => (
            <div className="flowStep" key={step}><span>{index + 1}</span><strong>{step}</strong></div>
          ))}
        </div>
      </section>

      <section className="landingSection">
        <SectionHeader title="주요 카테고리" />
        <div className="categoryPillGrid">
          {data.categories.map((category) => <span key={category.id}>{category.name}</span>)}
        </div>
      </section>

      <section className="betaHero">
        <div>
          <span className="eyebrow">오늘장사 연동 가치</span>
          <h2>구매내역 자동정리부터 매입비 리포트까지 이어집니다.</h2>
          <p>거래 완료 후 구매내역을 장부 반영 대기 자료로 정리하고, 세금자료 준비와 절감 리포트까지 확인할 수 있습니다.</p>
        </div>
        <button className="secondaryButton" type="button" onClick={() => navigate("/app/accounting")}>장부 흐름 보기</button>
      </section>

      <section className="landingSection">
        <SectionHeader title="베타 테스트 안내" action="자세히" onAction={() => navigate("/app/beta")} />
        <div className="faqGrid">
          {[
            ["구매자는 무료인가요?", "베타 기간 동안 구매자 견적요청은 무료로 제공합니다."],
            ["공급업체 입점비가 있나요?", "초기 베타 기간에는 무료 입점을 지원합니다. 추후 요금제는 별도 안내됩니다."],
            ["실제 결제도 앱에서 하나요?", "초기 MVP에서는 견적과 거래 상태 관리를 중심으로 제공하며, 결제 기능은 추후 단계적으로 연동됩니다."],
            ["세금계산서 발행도 가능한가요?", "세금계산서 가능 업체를 확인할 수 있으며, 실제 발행은 공급업체와 협의합니다."],
          ].map(([question, answer]) => (
            <article className="faqCard" key={question}>
              <strong>{question}</strong>
              <p>{answer}</p>
            </article>
          ))}
        </div>
      </section>

      <PolicyLinks navigate={navigate} />

      <SectionHeader title="최근 견적요청" action="전체 보기" onAction={() => navigate("/app/requests")} />
      <RequestList data={data} requests={data.quote_requests.slice(0, 3)} navigate={navigate} />
    </Page>
  );
}

function NewRequestPage({ data, navigate, setData }: MutatingPageProps) {
  const wizardSteps = ["입력 방식", "카테고리", "품목 검토", "납품 조건", "최종 확인"];
  const [step, setStep] = useState(0);
  const [textInput, setTextInput] = useState("치킨박스 1000개, 소스컵 2000개, 배달봉투 대형 1000장 필요해요.");
  const [draft, setDraft] = useState<QuoteRequestDraft>({
    title: "",
    category_id: data.categories[0]?.id ?? "",
    delivery_region: "",
    delivery_address: "",
    desired_delivery_date: "2026-07-10",
    need_tax_invoice: true,
    card_payment_required: false,
    description: "",
    attachment_note: "",
    previous_amount: 0,
    input_method: "manual",
    original_text_input: "",
    template_name: "",
    previous_request_id: "",
    urgent: false,
    preferred_delivery_time: "오전 납품 선호",
    budget_min: 0,
    budget_max: 0,
    preferred_brand: "",
    allow_alternatives: true,
    include_delivery_fee: true,
    items: [{ ...emptyItem }],
    attachments: [],
  });
  const [error, setError] = useState("");
  const selectedCategory = data.categories.find((category) => category.id === draft.category_id) ?? data.categories[0];
  const qualityScore = useMemo(() => calculateRequestQuality({ ...draft, category_name: selectedCategory?.name }, draft.items, draft.attachments), [draft, selectedCategory]);
  const expectedSupplierCount = useMemo(
    () => estimateSupplierMatches(data, selectedCategory?.name ?? "", draft.delivery_region, draft.need_tax_invoice, draft.card_payment_required),
    [data, selectedCategory, draft.delivery_region, draft.need_tax_invoice, draft.card_payment_required],
  );
  const cleanItems = draft.items.filter((entry) => entry.item_name.trim());

  function updateItem(index: number, key: keyof QuoteRequestDraft["items"][number], value: string | number | boolean) {
    setDraft((current) => ({
      ...current,
      items: current.items.map((entry, itemIndex) => (itemIndex === index ? { ...entry, [key]: value } : entry)),
    }));
  }

  function selectMethod(method: QuoteRequestInputMethod) {
    setDraft((current) => ({ ...current, input_method: method }));
    setStep(1);
  }

  function selectTemplate(templateName: string) {
    const template = requestTemplates.find((entry) => entry.name === templateName);
    if (!template) return;
    const category = data.categories.find((entry) => entry.name === template.category_name) ?? selectedCategory;
    setDraft((current) => ({
      ...current,
      input_method: "template",
      template_name: template.name,
      title: template.title,
      category_id: category?.id ?? current.category_id,
      description: template.description,
      items: template.items.map((entry) => ({ ...entry })),
    }));
    setStep(2);
  }

  function repeatRequest(previousRequest: QuoteRequest) {
    const previousItems = data.quote_request_items.filter((entry) => entry.quote_request_id === previousRequest.id);
    setDraft((current) => ({
      ...current,
      input_method: "repeat",
      previous_request_id: previousRequest.id,
      title: `${previousRequest.title} 재견적`,
      category_id: previousRequest.category_id,
      delivery_region: previousRequest.delivery_region,
      delivery_address: previousRequest.delivery_address ?? previousRequest.delivery_region,
      desired_delivery_date: current.desired_delivery_date,
      need_tax_invoice: previousRequest.need_tax_invoice,
      card_payment_required: previousRequest.card_payment_required,
      description: previousRequest.description,
      previous_amount: previousRequest.previous_amount ?? 0,
      preferred_delivery_time: previousRequest.preferred_delivery_time ?? current.preferred_delivery_time,
      budget_max: previousRequest.budget_max ?? 0,
      allow_alternatives: previousRequest.allow_alternatives ?? true,
      include_delivery_fee: previousRequest.include_delivery_fee ?? true,
      items: previousItems.map((entry) => ({
        item_name: entry.item_name,
        spec: entry.spec,
        quantity: entry.quantity,
        unit: entry.unit,
        memo: entry.memo,
        is_required: entry.is_required ?? true,
        allow_alternative: entry.allow_alternative ?? true,
        confidence_score: entry.confidence_score ?? 96,
        needs_review: false,
        review_reason: "",
      })),
    }));
    setStep(2);
  }

  function parseTextInput() {
    const parsedItems = parseItemsFromText(textInput);
    setDraft((current) => ({
      ...current,
      input_method: "text",
      original_text_input: textInput,
      title: current.title || `${selectedCategory?.name ?? "자재"} 견적 요청`,
      description: current.description || textInput,
      items: parsedItems,
    }));
  }

  function addMockAttachment(status: AttachmentAnalysisStatus = "analyzed") {
    const defaults: Record<QuoteRequestInputMethod, string> = {
      manual: "요청_참고자료.pdf",
      photo: "자재_사진.jpg",
      invoice: "기존_거래명세서.pdf",
      text: "문장입력_메모.txt",
      template: "템플릿_참고자료.xlsx",
      repeat: "이전요청_자료.pdf",
    };
    const fileName = defaults[draft.input_method];
    const attachment: QuoteAttachmentDraft = {
      file_name: fileName,
      file_type: fileName.split(".").pop() ?? "file",
      analysis_status: status,
      extracted_text: status === "analyzed" ? "첨부파일에서 품목명, 규격, 수량 후보를 추출한 목업 결과입니다." : "",
      extracted_items_json: status === "analyzed" ? JSON.stringify({ items: cleanItems.map((entry) => entry.item_name) }) : "",
    };
    setDraft((current) => ({ ...current, attachment_note: current.attachment_note || fileName, attachments: [...current.attachments, attachment] }));
  }

  function goNext() {
    setError("");
    if (step === 2 && !draft.items.some((entry) => entry.item_name.trim())) {
      setError("품목을 1개 이상 입력하거나 템플릿/문장 분석으로 추가해 주세요.");
      return;
    }
    if (step === 3 && (!draft.delivery_region.trim() || !draft.desired_delivery_date)) {
      setError("배송 지역과 희망 납품일을 입력해 주세요.");
      return;
    }
    setStep((current) => Math.min(wizardSteps.length - 1, current + 1));
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    if (!draft.delivery_region.trim() || !draft.desired_delivery_date || !draft.items.some((entry) => entry.item_name.trim())) {
      setError("배송 지역, 희망 납품일, 품목을 입력해 주세요.");
      return;
    }

    const result = createQuoteRequest(data, {
      ...draft,
      title: draft.title.trim() || `${selectedCategory?.name ?? "자재"} 견적 요청`,
    });
    setData(result.data);
    navigate(`/app/requests/${result.requestId}`);
  }

  return (
    <Page>
      <BackButton onClick={() => navigate("/app/requests")} label="요청 목록" />
      <PageTitle eyebrow="구매자" title="필요한 자재를 편하게 알려주세요." desc="사진, 거래명세서, 문장, 템플릿, 이전 요청 중 편한 방식으로 시작하고 마지막에 품목과 납품 조건만 확인합니다." />
      <form className="wizardShell" onSubmit={submit}>
        <div className="wizardSteps" aria-label="견적요청 작성 단계">
          {wizardSteps.map((label, index) => (
            <button className={index === step ? "wizardStep active" : index < step ? "wizardStep done" : "wizardStep"} type="button" onClick={() => setStep(index)} key={label}>
              <span>{index + 1}</span>
              <strong>{label}</strong>
            </button>
          ))}
        </div>
        {error && <div className="alert">{error}</div>}
        {step === 0 && (
          <section className="wizardPanel">
            <SectionHeader title="어떤 방식으로 시작할까요?" />
            <div className="methodGrid">
              <MethodCard icon={<FilePlus2 />} title="직접 입력" desc="품목을 하나씩 입력합니다." active={draft.input_method === "manual"} onClick={() => selectMethod("manual")} />
              <MethodCard icon={<Upload />} title="사진 업로드" desc="자재 사진을 올리고 품목 후보를 확인합니다." active={draft.input_method === "photo"} onClick={() => selectMethod("photo")} />
              <MethodCard icon={<ReceiptText />} title="거래명세서" desc="기존 명세서를 기준으로 재견적합니다." active={draft.input_method === "invoice"} onClick={() => selectMethod("invoice")} />
              <MethodCard icon={<ClipboardList />} title="문장으로 입력" desc="한 문장을 품목 목록으로 나눕니다." active={draft.input_method === "text"} onClick={() => selectMethod("text")} />
              <MethodCard icon={<Boxes />} title="템플릿" desc="업종별 자주 쓰는 세트를 불러옵니다." active={draft.input_method === "template"} onClick={() => selectMethod("template")} />
              <MethodCard icon={<RefreshCcw />} title="이전 요청 반복" desc="지난 요청을 복사해 다시 견적합니다." active={draft.input_method === "repeat"} onClick={() => selectMethod("repeat")} />
            </div>
          </section>
        )}
        {step === 1 && (
          <section className="wizardPanel">
            <SectionHeader title="카테고리를 선택하세요" />
            <div className="categoryChoiceGrid">
              {data.categories.map((category) => (
                <button className={draft.category_id === category.id ? "categoryChoiceCard active" : "categoryChoiceCard"} type="button" onClick={() => setDraft({ ...draft, category_id: category.id })} key={category.id}>
                  <strong>{category.name}</strong>
                  <span>{categoryDescriptions[category.name] ?? "요청 품목의 성격에 가장 가까운 카테고리"}</span>
                </button>
              ))}
            </div>
          </section>
        )}
        {step === 2 && (
          <section className="wizardPanel">
            <div className="splitPanel">
              <div>
                <SectionHeader title="품목 후보를 다듬어 주세요" action="품목 추가" onAction={() => setDraft({ ...draft, items: [...draft.items, { ...emptyItem }] })} />
                {draft.input_method === "text" && (
                  <div className="aiReviewPanel">
                    <Field label="문장 입력">
                      <textarea value={textInput} onChange={(event) => setTextInput(event.target.value)} placeholder="예: 치킨박스 1000개, 소스컵 2000개, 봉투 대형 1000장 필요해요." />
                    </Field>
                    <button className="primaryButton compact" type="button" onClick={parseTextInput}>품목 후보 만들기</button>
                  </div>
                )}
                {(draft.input_method === "photo" || draft.input_method === "invoice") && (
                  <UploadMockPanel attachments={draft.attachments} onAdd={() => addMockAttachment("analyzed")} />
                )}
                {draft.input_method === "template" && <TemplatePicker onSelect={selectTemplate} selectedName={draft.template_name} />}
                {draft.input_method === "repeat" && <RepeatRequestPanel data={data} onSelect={repeatRequest} selectedId={draft.previous_request_id} />}
                <ItemReviewEditor items={draft.items} onUpdate={updateItem} onRemove={(index) => setDraft({ ...draft, items: draft.items.filter((_, itemIndex) => itemIndex !== index) })} />
              </div>
              <QualityPreview score={qualityScore} expectedSupplierCount={expectedSupplierCount} />
            </div>
          </section>
        )}
        {step === 3 && (
          <section className="wizardPanel">
            <SectionHeader title="납품 조건을 입력하세요" />
            <div className="conditionGrid">
              <Field label="요청 제목">
                <input value={draft.title} onChange={(event) => setDraft({ ...draft, title: event.target.value })} placeholder={`${selectedCategory?.name ?? "자재"} 견적 요청`} />
              </Field>
              <Field label="배송 지역">
                <input value={draft.delivery_region} onChange={(event) => setDraft({ ...draft, delivery_region: event.target.value })} placeholder="예: 서울 노원구" />
              </Field>
              <Field label="상세 주소 또는 대략 위치">
                <input value={draft.delivery_address} onChange={(event) => setDraft({ ...draft, delivery_address: event.target.value })} placeholder="예: 월계역 인근 매장" />
              </Field>
              <Field label="희망 납품일">
                <input type="date" value={draft.desired_delivery_date} onChange={(event) => setDraft({ ...draft, desired_delivery_date: event.target.value })} />
              </Field>
              <Field label="희망 시간">
                <input value={draft.preferred_delivery_time} onChange={(event) => setDraft({ ...draft, preferred_delivery_time: event.target.value })} placeholder="예: 오전 10시 전" />
              </Field>
              <Field label="선호 브랜드">
                <input value={draft.preferred_brand} onChange={(event) => setDraft({ ...draft, preferred_brand: event.target.value })} placeholder="없으면 비워두세요" />
              </Field>
              <Field label="기존 거래가">
                <input type="number" min="0" value={draft.previous_amount} onChange={(event) => setDraft({ ...draft, previous_amount: Number(event.target.value) })} />
              </Field>
              <Field label="예산 최소">
                <input type="number" min="0" value={draft.budget_min} onChange={(event) => setDraft({ ...draft, budget_min: Number(event.target.value) })} />
              </Field>
              <Field label="예산 최대">
                <input type="number" min="0" value={draft.budget_max} onChange={(event) => setDraft({ ...draft, budget_max: Number(event.target.value) })} />
              </Field>
            </div>
            <Field label="요청 메모">
              <textarea value={draft.description} onChange={(event) => setDraft({ ...draft, description: event.target.value })} placeholder="납품 조건, 대체품 허용 범위, 견적 비교 시 중요한 기준을 적어주세요." />
            </Field>
            <div className="toggleGrid">
              <Toggle checked={draft.need_tax_invoice} label="세금계산서 필요" onChange={(checked) => setDraft({ ...draft, need_tax_invoice: checked })} />
              <Toggle checked={draft.card_payment_required} label="카드결제 가능 업체만" onChange={(checked) => setDraft({ ...draft, card_payment_required: checked })} />
              <Toggle checked={draft.include_delivery_fee} label="배송비 포함 견적 요청" onChange={(checked) => setDraft({ ...draft, include_delivery_fee: checked })} />
              <Toggle checked={draft.urgent} label="긴급 요청" onChange={(checked) => setDraft({ ...draft, urgent: checked })} />
              <Toggle checked={draft.allow_alternatives} label="대체품 제안 허용" onChange={(checked) => setDraft({ ...draft, allow_alternatives: checked })} />
            </div>
          </section>
        )}
        {step === 4 && (
          <section className="wizardPanel">
            <SectionHeader title="요청 내용을 확인하세요" />
            <div className="summaryPanel">
              <QualityMeter score={qualityScore} />
              <div className="summaryFacts">
                <span>입력 방식: {requestInputMethodLabels[draft.input_method]}</span>
                <span>카테고리: {selectedCategory?.name}</span>
                <span>품목: {cleanItems.length}개</span>
                <span>예상 응답 업체: {expectedSupplierCount}곳</span>
                <span>희망 납품: {draft.desired_delivery_date} {draft.preferred_delivery_time}</span>
                <span>배송 지역: {draft.delivery_region || "미입력"}</span>
              </div>
              <div className="summaryItemList">
                {cleanItems.map((entry, index) => (
                  <span key={`${entry.item_name}-${index}`}>{entry.item_name} · {entry.quantity}{entry.unit} · {entry.spec || "규격 미입력"}</span>
                ))}
              </div>
              {draft.attachments.length > 0 && <AttachmentStatusList attachments={draft.attachments} />}
              <SavingsNotice savings={calculateEstimatedSavings(Number(draft.previous_amount) || undefined, Number(draft.budget_max) || undefined)} previousAmount={Number(draft.previous_amount) || undefined} />
            </div>
          </section>
        )}
        <div className="wizardActions">
          <button className="secondaryButton" type="button" onClick={() => (step === 0 ? navigate("/app/requests") : setStep((current) => current - 1))}>
            {step === 0 ? "취소" : "이전"}
          </button>
          {step < wizardSteps.length - 1 ? (
            <button className="primaryButton" type="button" onClick={goNext}>
              다음
              <ArrowRight size={17} />
            </button>
          ) : (
            <button className="primaryButton" type="submit">
              <Check size={18} />
              요청 등록
            </button>
          )}
        </div>
      </form>
    </Page>
  );
}

function RequestsPage({ data, navigate }: PageProps) {
  return (
    <Page>
      <PageTitle eyebrow="구매자" title="내 견적요청" desc="등록한 요청과 도착한 견적을 한곳에서 확인합니다." />
      <div className="toolbar">
        <button className="primaryButton compact" type="button" onClick={() => navigate("/app/requests/new")}>
          <Plus size={16} />
          새 요청
        </button>
      </div>
      <RequestList data={data} requests={data.quote_requests} navigate={navigate} />
    </Page>
  );
}

function RequestDetailPage({ data, navigate, setData, requestId }: MutatingPageProps & { requestId: string }) {
  const [quoteToConfirm, setQuoteToConfirm] = useState<Quote | null>(null);
  const request = data.quote_requests.find((entry) => entry.id === requestId);
  if (!request) return <NotFound navigate={navigate} />;
  const currentRequest = request;

  const items = data.quote_request_items.filter((entry) => entry.quote_request_id === currentRequest.id);
  const quotes = data.quotes.filter((entry) => entry.quote_request_id === currentRequest.id);
  const deal = data.deals.find((entry) => entry.quote_request_id === currentRequest.id);
  const selectedQuote = quotes.find((entry) => entry.id === currentRequest.selected_quote_id || entry.id === deal?.selected_quote_id);
  const cheapest = quotes.reduce<Quote | null>((winner, current) => (!winner || current.final_amount < winner.final_amount ? current : winner), null);
  const fastest = quotes.reduce<Quote | null>((winner, current) => (!winner || current.available_delivery_date < winner.available_delivery_date ? current : winner), null);

  function confirmQuoteSelection() {
    if (!quoteToConfirm) return;
    const result = createDealFromQuote(data, currentRequest.id, quoteToConfirm.id);
    setData(result.data);
    setQuoteToConfirm(null);
    if (result.dealId) navigate(`/app/deals/${result.dealId}`);
  }

  return (
    <Page>
      <BackButton onClick={() => navigate("/app/requests")} label="요청 목록" />
      <RequestSummary data={data} request={currentRequest} items={items} />
      <div className="toolbar messageShortcut">
        <button className="secondaryButton compact" type="button" onClick={() => navigate(`/app/requests/${currentRequest.id}/messages`)}>
          <Bell size={16} />
          업체에 문의하기
        </button>
      </div>
      {deal && selectedQuote && (
        <DealNotice data={data} deal={deal} quote={selectedQuote} onOpen={() => navigate(`/app/deals/${deal.id}`)} />
      )}
      <SectionHeader title="도착한 견적 비교" action="공급업체 화면" onAction={() => navigate(`/app/supplier/requests/${currentRequest.id}`)} />
      {quotes.length === 0 ? (
        <EmptyState icon={<SearchCheck />} title="아직 도착한 견적이 없습니다." desc="공급업체 화면에서 샘플 견적을 제출해 흐름을 확인할 수 있습니다." />
      ) : (
        <div className="quoteCompareGrid">
          {quotes.map((quoteEntry) => (
            <QuoteCard
              key={quoteEntry.id}
              data={data}
              quote={quoteEntry}
              isCheapest={cheapest?.id === quoteEntry.id}
              isFastest={fastest?.id === quoteEntry.id}
              isSelected={selectedQuote?.id === quoteEntry.id}
              isRejected={quoteEntry.status === "rejected"}
              onSelect={() => setQuoteToConfirm(quoteEntry)}
              onOpenSupplier={() => navigate(`/app/suppliers/${quoteEntry.supplier_id}`)}
            />
          ))}
        </div>
      )}
      {quoteToConfirm && (
        <QuoteConfirmModal
          data={data}
          quote={quoteToConfirm}
          onCancel={() => setQuoteToConfirm(null)}
          onConfirm={confirmQuoteSelection}
        />
      )}
    </Page>
  );
}

function BuyerDealsPage({ data, navigate }: PageProps) {
  const [filter, setFilter] = useState("전체");
  const buyerDeals = data.deals.filter((deal) => deal.buyer_id === "buyer-1");
  const visibleDeals = buyerDeals.filter((deal) => filter === "전체" || dealGroup(deal.status) === filter);
  const inProgress = buyerDeals.filter((deal) => ["pending_confirmation", "confirmed", "preparing", "delivering", "delivered"].includes(deal.status)).length;
  const completed = buyerDeals.filter((deal) => deal.status === "completed").length;
  const monthAmount = buyerDeals.reduce((sum, deal) => sum + deal.final_amount, 0);
  const savings = buyerDeals.reduce((sum, deal) => sum + calculateEstimatedSavings(deal.previous_amount, deal.final_amount).amount, 0);
  const accountingPending = data.purchase_records.filter((record) => record.buyer_id === "buyer-1" && record.accounting_status === "pending").length;

  return (
    <Page>
      <PageTitle eyebrow="구매자" title="거래내역" desc="선택한 견적이 거래로 전환된 뒤 납품 상태와 구매내역을 관리합니다." />
      <div className="dashboardGrid">
        <Metric label="진행 중 거래" value={`${inProgress}건`} icon={<PackageCheck />} />
        <Metric label="완료 거래" value={`${completed}건`} icon={<Check />} />
        <Metric label="이번 달 구매액" value={money(monthAmount)} icon={<ReceiptText />} />
        <Metric label="예상 절감액" value={money(savings)} icon={<BadgeCheck />} />
      </div>
      <div className="ledgerShortcut">
        <p className="mutedText summaryLine">장부 반영 대기 {accountingPending}건</p>
        <div className="toolbar">
          <button className="secondaryButton compact" type="button" onClick={() => navigate("/app/purchases")}>
            <ReceiptText size={16} />
            구매내역
          </button>
          <button className="primaryButton compact" type="button" onClick={() => navigate("/app/accounting/pending")}>
            <Landmark size={16} />
            장부 대기
          </button>
        </div>
      </div>
      <FilterTabs options={["전체", "진행 중", "완료", "취소", "문제 발생"]} active={filter} onChange={setFilter} />
      <DealTable data={data} deals={visibleDeals} navigate={navigate} basePath="/app/deals" role="buyer" />
    </Page>
  );
}

function SupplierDealsPage({ data, navigate }: PageProps) {
  const [filter, setFilter] = useState("전체");
  const supplierId = "sup-1";
  const supplierDeals = data.deals.filter((deal) => deal.supplier_id === supplierId || data.quotes.some((quote) => quote.id === deal.selected_quote_id && quote.supplier_id === supplierId));
  const visibleDeals = supplierDeals.filter((deal) => filter === "전체" || dealStatusLabels[deal.status] === filter || dealGroup(deal.status) === filter);
  const pending = supplierDeals.filter((deal) => deal.status === "pending_confirmation").length;
  const progressing = supplierDeals.filter((deal) => ["confirmed", "preparing", "delivering", "delivered"].includes(deal.status)).length;
  const completed = supplierDeals.filter((deal) => deal.status === "completed").length;
  const amount = supplierDeals.reduce((sum, deal) => sum + deal.final_amount, 0);

  return (
    <Page>
      <PageTitle eyebrow="공급업체" title="거래관리" desc="선택된 거래를 수락하고 납품 진행 상태를 관리합니다." />
      <div className="dashboardGrid">
        <Metric label="확인 대기" value={`${pending}건`} icon={<SearchCheck />} />
        <Metric label="진행 중 거래" value={`${progressing}건`} icon={<PackageCheck />} />
        <Metric label="이번 달 완료" value={`${completed}건`} icon={<Check />} />
        <Metric label="이번 달 거래액" value={money(amount)} icon={<ReceiptText />} />
      </div>
      <div className="dashboardGrid compactStats">
        <Metric label="완료율 mock" value="82%" icon={<BadgeCheck />} />
        <Metric label="취소율 mock" value="6%" icon={<ShieldCheck />} />
      </div>
      <FilterTabs options={["전체", "거래 확인 대기", "거래 확정", "납품 준비 중", "배송/납품 중", "납품 완료", "거래 완료", "취소", "문제 발생"]} active={filter} onChange={setFilter} />
      <DealTable data={data} deals={visibleDeals} navigate={navigate} basePath="/app/deals" role="supplier" />
    </Page>
  );
}

function AdminDealsPage({ data, navigate }: PageProps) {
  const [filter, setFilter] = useState("전체");
  const visibleDeals = data.deals.filter((deal) => filter === "전체" || dealGroup(deal.status) === filter || deal.category_name === filter || deal.delivery_region.includes(filter));
  const progressing = data.deals.filter((deal) => ["pending_confirmation", "confirmed", "preparing", "delivering", "delivered"].includes(deal.status)).length;
  const completed = data.deals.filter((deal) => deal.status === "completed").length;
  const cancelled = data.deals.filter((deal) => deal.status.includes("cancelled")).length;
  const disputed = data.deals.filter((deal) => deal.status === "disputed").length;
  const totalAmount = data.deals.reduce((sum, deal) => sum + deal.final_amount, 0);
  const average = data.deals.length ? Math.round(totalAmount / data.deals.length) : 0;

  return (
    <Page>
      <PageTitle eyebrow="관리자" title="거래 모니터링" desc="전체 거래 상태, 취소/문제 발생 여부, 거래액을 한눈에 봅니다." />
      <div className="dashboardGrid">
        <Metric label="전체 거래" value={`${data.deals.length}건`} icon={<ClipboardList />} />
        <Metric label="진행 중" value={`${progressing}건`} icon={<PackageCheck />} />
        <Metric label="완료" value={`${completed}건`} icon={<Check />} />
        <Metric label="취소" value={`${cancelled}건`} icon={<ShieldCheck />} />
        <Metric label="문제 발생" value={`${disputed}건`} icon={<Landmark />} />
        <Metric label="총 거래액" value={money(totalAmount)} icon={<ReceiptText />} />
        <Metric label="이번 달 거래액" value={money(totalAmount)} icon={<CalendarDays />} />
        <Metric label="평균 거래금액" value={money(average)} icon={<BadgeCheck />} />
      </div>
      <FilterTabs options={["전체", "진행 중", "완료", "취소", "문제 발생", "포장재", "식자재", "설비/닥트/환기자재"]} active={filter} onChange={setFilter} />
      <DealTable data={data} deals={visibleDeals} navigate={navigate} basePath="/app/deals" role="admin" />
    </Page>
  );
}

function DealDetailPage({ data, navigate, setData, dealId, role }: MutatingPageProps & { dealId: string; role: "buyer" | "supplier" | "admin" }) {
  const [modalMode, setModalMode] = useState<"cancel" | "dispute" | null>(null);
  const [memo, setMemo] = useState("");
  const [reason, setReason] = useState("일정 변경");
  const [attachmentType, setAttachmentType] = useState<AttachmentType>("delivery_note");
  const [fileName, setFileName] = useState("");
  const deal = data.deals.find((entry) => entry.id === dealId);
  if (!deal) return <NotFound navigate={navigate} />;
  const currentDeal = deal;

  const buyer = data.profiles.find((entry) => entry.id === currentDeal.buyer_id);
  const items = data.deal_items.filter((entry) => entry.deal_id === currentDeal.id);
  const attachments = data.deal_attachments.filter((entry) => entry.deal_id === currentDeal.id);
  const logs = data.deal_status_logs.filter((entry) => entry.deal_id === currentDeal.id);
  const purchaseRecord = data.purchase_records.find((entry) => entry.deal_id === currentDeal.id);
  const savings = calculateEstimatedSavings(currentDeal.previous_amount, currentDeal.final_amount);

  function changeStatus(nextStatus: DealStatus, changedBy: "buyer" | "supplier" | "admin", statusMemo: string) {
    setData(updateDealStatus(data, currentDeal.id, nextStatus, changedBy, statusMemo));
  }

  function submitModal() {
    const fullMemo = `${reason}${memo ? ` - ${memo}` : ""}`;
    if (modalMode === "cancel") {
      changeStatus(role === "supplier" ? "cancelled_by_supplier" : "cancelled_by_buyer", role === "admin" ? "admin" : role, fullMemo);
    }
    if (modalMode === "dispute") {
      const reporterId = role === "supplier" ? `${currentDeal.supplier_id}-user` : role === "admin" ? "admin-1" : currentDeal.buyer_id;
      const targetUserId = role === "supplier" ? currentDeal.buyer_id : `${currentDeal.supplier_id}-user`;
      const result = createReport(data, {
        reporter_id: reporterId,
        reporter_role: role,
        target_user_id: targetUserId,
        target_role: role === "supplier" ? "buyer" : "supplier",
        report_type: reason.includes("세금") ? "tax_invoice_issue" : reason.includes("품질") ? "quality_issue" : reason.includes("납품") ? "delivery_issue" : "deal_dispute",
        related_entity_type: "deal",
        related_entity_id: currentDeal.id,
        title: `${currentDeal.title} - ${reason}`,
        description: fullMemo,
        desired_resolution: "운영팀 확인 후 거래 조정 또는 보호 안내 요청",
        priority: "high",
      });
      setData(result.data);
    }
    setModalMode(null);
    setMemo("");
  }

  function submitAttachment() {
    setData(addDealAttachment(data, currentDeal.id, attachmentType, fileName, role));
    setFileName("");
  }

  function syncPurchaseToAccounting() {
    if (!purchaseRecord) return;
    setData(updatePurchaseAccountingStatus(data, purchaseRecord.id, "synced", "거래 상세에서 오늘장사 장부 반영"));
  }

  return (
    <Page>
      <BackButton onClick={() => navigate(role === "supplier" ? "/app/supplier/deals" : role === "admin" ? "/app/admin/deals" : "/app/deals")} label="거래 목록" />
      <section className="detailBand">
        <div className="detailHeader">
          <div>
            <span className="eyebrow">{deal.category_name}</span>
            <h1>{deal.title}</h1>
            <p>{supplierName(data, deal.supplier_id)} · {buyer?.business_name ?? "구매자"} · {money(deal.final_amount)}</p>
          </div>
          <StatusBadge tone={deal.status === "completed" ? "green" : deal.status === "disputed" ? "orange" : deal.status.includes("cancelled") ? "gray" : "blue"}>
            {dealStatusLabels[deal.status]}
          </StatusBadge>
        </div>
        <DealStepper status={deal.status} />
        <div className="detailMeta">
          <span>배송 지역: {deal.delivery_region}</span>
          <span>납품 주소: {deal.delivery_address}</span>
          <span>희망 납품일: {deal.desired_delivery_date}</span>
          <span>확정 납품일: {deal.confirmed_delivery_date}</span>
          <span>결제 방식: {paymentMethodLabels[deal.payment_method]}</span>
          <span>세금계산서: {yesNo(deal.tax_invoice_available)}</span>
          <span>카드결제: {yesNo(deal.card_payment_available)}</span>
        </div>
        <div className="priceSummary">
          <Metric label="상품금액" value={money(deal.subtotal_amount)} icon={<PackageCheck />} />
          <Metric label="배송비" value={money(deal.delivery_fee)} icon={<Store />} />
          <Metric label="최종금액" value={money(deal.final_amount)} icon={<ReceiptText />} />
        </div>
        <SavingsNotice savings={savings} previousAmount={deal.previous_amount} />
      </section>

      <SectionHeader title="품목 리스트" />
      <div className="itemsList">
        {items.map((itemEntry) => (
          <div className="itemPill" key={itemEntry.id}>
            <strong>{itemEntry.item_name}</strong>
            <span>{itemEntry.spec || `${itemEntry.quantity}${itemEntry.unit}`}</span>
            <small>{itemEntry.unit_price ? `${money(itemEntry.unit_price)} / ${itemEntry.unit}` : "단가 메모 확인"}</small>
          </div>
        ))}
      </div>

      <section className="twoColumn dealColumns">
        <div className="toolPanel">
          <SectionHeader title="요청/견적 메모" />
          <p className="mutedText">구매자 요청: {deal.buyer_memo || "없음"}</p>
          <p className="mutedText">공급업체 메모: {deal.supplier_memo || "없음"}</p>
          {deal.cancellation_reason && <p className="dangerText">취소 사유: {deal.cancellation_reason}</p>}
          {deal.dispute_reason && <p className="dangerText">문제 신고: {deal.dispute_reason}</p>}
        </div>
        <div className="toolPanel">
          <SectionHeader title="상태 변경" />
          <DealActions deal={deal} role={role} onChange={changeStatus} onCancel={() => setModalMode("cancel")} onDispute={() => setModalMode("dispute")} navigate={navigate} purchaseRecordId={purchaseRecord?.id} />
          <button className="secondaryButton full" type="button" onClick={() => navigate(`/app/deals/${currentDeal.id}/messages`)}>
            <Bell size={16} />
            거래 문의 보기
          </button>
        </div>
      </section>

      <section className="toolPanel">
        <SectionHeader title="거래 증빙자료" />
        <div className="attachmentForm">
          <select value={attachmentType} onChange={(event) => setAttachmentType(event.target.value as AttachmentType)}>
            <option value="delivery_note">거래명세서</option>
            <option value="receipt">영수증</option>
            <option value="tax_invoice">세금계산서</option>
            <option value="photo">납품 사진</option>
            <option value="etc">기타 첨부파일</option>
          </select>
          <input value={fileName} onChange={(event) => setFileName(event.target.value)} placeholder="파일명 예: 거래명세서.pdf" />
          <button className="primaryButton compact" type="button" onClick={submitAttachment}>추가</button>
        </div>
        <div className="attachmentGrid">
          {attachments.map((attachmentEntry) => (
            <article className="attachmentCard" key={attachmentEntry.id}>
              <strong>{attachmentEntry.file_name}</strong>
              <span>{attachmentTypeLabel(attachmentEntry.attachment_type)} · {uploadedByLabel(attachmentEntry.uploaded_by)}</span>
              <small>{attachmentEntry.created_at.slice(0, 10)}</small>
              <button className="ghostButton compact" type="button">삭제</button>
            </article>
          ))}
        </div>
      </section>

      <section className="toolPanel">
        <SectionHeader title="상태 변경 이력" />
        <div className="logList">
          {logs.map((logEntry) => (
            <div className="logRow" key={logEntry.id}>
              <span>{dealStatusLabels[logEntry.to_status]}</span>
              <strong>{logEntry.memo}</strong>
              <small>{logEntry.changed_by} · {logEntry.created_at.slice(0, 10)}</small>
            </div>
          ))}
        </div>
      </section>

      {purchaseRecord && (
        <section className="completionPanel">
          <h2>거래가 완료되었습니다.</h2>
          <p>이 구매내역은 오늘장사 장부에 반영할 수 있도록 저장되었습니다.</p>
          <div className="formActions">
            <button className="secondaryButton" type="button" onClick={() => navigate(`/app/purchases/${purchaseRecord.id}`)}>구매내역 보기</button>
            <button className="ghostButton" type="button" onClick={syncPurchaseToAccounting}>오늘장사 장부로 보내기</button>
            <button className="primaryButton" type="button" onClick={() => navigate("/app/requests/new")}>같은 품목 다시 견적받기</button>
          </div>
        </section>
      )}

      {modalMode && (
        <ReasonModal
          mode={modalMode}
          reason={reason}
          memo={memo}
          onReason={setReason}
          onMemo={setMemo}
          onCancel={() => setModalMode(null)}
          onSubmit={submitModal}
        />
      )}
    </Page>
  );
}

function NewReportPage({ data, navigate, setData }: MutatingPageProps) {
  const [reportType, setReportType] = useState<ReportType>("deal_dispute");
  const [relatedEntityType, setRelatedEntityType] = useState<ReportEntityType>("deal");
  const [dealId, setDealId] = useState(data.deals[0]?.id ?? "");
  const [supplierId, setSupplierId] = useState(data.supplier_profiles[0]?.id ?? "");
  const [priority, setPriority] = useState<NotificationPriority>("high");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [desiredResolution, setDesiredResolution] = useState("거래 보호 안내와 운영팀 중재를 요청합니다.");
  const [attachmentName, setAttachmentName] = useState("");

  const selectedDeal = data.deals.find((entry) => entry.id === dealId);
  const selectedSupplierId = relatedEntityType === "deal" ? selectedDeal?.supplier_id ?? supplierId : supplierId;
  const selectedSupplier = data.supplier_profiles.find((entry) => entry.id === selectedSupplierId) ?? data.supplier_profiles[0];

  function submit(event: FormEvent) {
    event.preventDefault();
    if (!selectedSupplier) return;
    const result = createReport(data, {
      reporter_id: "buyer-1",
      reporter_role: "buyer",
      target_user_id: selectedSupplier.user_id,
      target_role: "supplier",
      report_type: reportType,
      related_entity_type: relatedEntityType,
      related_entity_id: relatedEntityType === "deal" ? dealId : selectedSupplier.id,
      title: title || `${reportTypeLabels[reportType]} 접수`,
      description,
      desired_resolution: desiredResolution,
      priority,
      attachment_name: attachmentName,
    });
    setData(result.data);
    navigate(`/app/reports/${result.reportId}`);
  }

  return (
    <Page>
      <BackButton onClick={() => navigate("/app/reports")} label="내 신고 목록" />
      <PageTitle eyebrow="신고/분쟁" title="문제 신고 접수" desc="납품, 품질, 결제, 메시지 문제를 운영팀에 접수하고 처리 이력을 확인합니다." />
      <section className="protectionNotice">
        <ShieldCheck />
        <div>
          <strong>구매자 보호 안내</strong>
          <p>싸와! 안에서 진행한 견적, 메시지, 거래 이력은 분쟁 확인 자료로 함께 검토됩니다. 외부 결제 유도나 품목 누락은 상세 내용과 첨부자료를 남겨주세요.</p>
        </div>
      </section>
      <form className="formStack" onSubmit={submit}>
        <div className="formGrid">
          <Field label="신고 유형">
            <select value={reportType} onChange={(event) => setReportType(event.target.value as ReportType)}>
              {Object.entries(reportTypeLabels).map(([key, label]) => <option value={key} key={key}>{label}</option>)}
            </select>
          </Field>
          <Field label="관련 대상">
            <select value={relatedEntityType} onChange={(event) => setRelatedEntityType(event.target.value as ReportEntityType)}>
              <option value="deal">거래</option>
              <option value="supplier">공급업체</option>
            </select>
          </Field>
          {relatedEntityType === "deal" ? (
            <Field label="거래 선택">
              <select value={dealId} onChange={(event) => setDealId(event.target.value)}>
                {data.deals.map((deal) => <option value={deal.id} key={deal.id}>{deal.title} · {supplierName(data, deal.supplier_id)}</option>)}
              </select>
            </Field>
          ) : (
            <Field label="공급업체 선택">
              <select value={supplierId} onChange={(event) => setSupplierId(event.target.value)}>
                {data.supplier_profiles.map((supplier) => <option value={supplier.id} key={supplier.id}>{supplier.business_name}</option>)}
              </select>
            </Field>
          )}
          <Field label="처리 우선순위">
            <select value={priority} onChange={(event) => setPriority(event.target.value as NotificationPriority)}>
              {Object.entries(notificationPriorityLabels).map(([key, label]) => <option value={key} key={key}>{label}</option>)}
            </select>
          </Field>
        </div>
        <Field label="제목">
          <input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="예: 납품 수량이 견적과 다릅니다." />
        </Field>
        <Field label="상세 내용">
          <textarea value={description} onChange={(event) => setDescription(event.target.value)} required placeholder="상황, 날짜, 약속 내용, 확인이 필요한 자료를 적어주세요." />
        </Field>
        <Field label="희망 해결 방식">
          <textarea value={desiredResolution} onChange={(event) => setDesiredResolution(event.target.value)} />
        </Field>
        <Field label="첨부 파일명 mock">
          <input value={attachmentName} onChange={(event) => setAttachmentName(event.target.value)} placeholder="예: 납품사진.jpg" />
        </Field>
        <div className="formActions">
          <button className="secondaryButton" type="button" onClick={() => navigate("/app/reports")}>취소</button>
          <button className="primaryButton" type="submit">신고 접수</button>
        </div>
      </form>
    </Page>
  );
}

function UserReportsPage({ data, navigate }: PageProps) {
  const reports = data.reports.filter((report) => report.reporter_id === "buyer-1" || report.target_user_id === "buyer-1");
  const openReports = reports.filter((report) => !["resolved", "dismissed", "cancelled"].includes(report.status));
  const resolvedReports = reports.filter((report) => report.status === "resolved");

  return (
    <Page>
      <PageTitle eyebrow="신고/분쟁" title="내 신고 처리 현황" desc="접수한 신고, 추가 확인 요청, 처리 결과를 한곳에서 확인합니다." />
      <div className="dashboardGrid">
        <Metric label="전체 신고" value={`${reports.length}건`} icon={<Bell />} />
        <Metric label="진행 중" value={`${openReports.length}건`} icon={<RefreshCcw />} />
        <Metric label="해결됨" value={`${resolvedReports.length}건`} icon={<Check />} />
        <Metric label="긴급" value={`${reports.filter((report) => report.priority === "urgent").length}건`} icon={<ShieldCheck />} />
      </div>
      <SectionHeader title="신고 목록" action="새 신고" onAction={() => navigate("/app/reports/new")} />
      {reports.length ? (
      <div className="tableWrap">
        <table>
          <thead>
            <tr>
              <th>제목</th>
              <th>유형</th>
              <th>대상</th>
              <th>상태</th>
              <th>접수일</th>
              <th>상세</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report.id}>
                <td><strong>{report.title}</strong></td>
                <td>{reportTypeLabels[report.report_type]}</td>
                <td>{reportRelatedTitle(data, report)}</td>
                <td><StatusBadge tone={reportStatusTone(report.status)}>{reportStatusLabels[report.status]}</StatusBadge></td>
                <td>{report.created_at.slice(0, 10)}</td>
                <td><button className="ghostButton compact" type="button" onClick={() => navigate(`/app/reports/${report.id}`)}>보기</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      ) : (
        <EmptyState icon={<ShieldCheck />} title="신고 내역이 없습니다." desc="거래나 메시지에서 문제가 생기면 운영팀에 신고할 수 있습니다." actionLabel="문제 신고하기" onAction={() => navigate("/app/reports/new")} />
      )}
    </Page>
  );
}

function UserReportDetailPage({ data, navigate, setData, reportId }: MutatingPageProps & { reportId: string }) {
  const report = data.reports.find((entry) => entry.id === reportId);
  const [comment, setComment] = useState("");
  if (!report) return <NotFound navigate={navigate} />;
  const currentReport = report;
  const comments = data.report_comments.filter((entry) => entry.report_id === currentReport.id && !entry.is_internal).sort((a, b) => a.created_at.localeCompare(b.created_at));
  const actions = data.report_actions.filter((entry) => entry.report_id === currentReport.id).sort((a, b) => b.created_at.localeCompare(a.created_at));
  const attachments = data.report_attachments.filter((entry) => entry.report_id === currentReport.id);

  function addComment() {
    setData(addReportComment(data, currentReport.id, "buyer-1", "buyer", comment));
    setComment("");
  }

  return (
    <Page>
      <BackButton onClick={() => navigate("/app/reports")} label="내 신고 목록" />
      <section className="detailBand">
        <div className="detailHeader">
          <div>
            <span className="eyebrow">{reportTypeLabels[currentReport.report_type]} · {reportEntityTypeLabels[currentReport.related_entity_type]}</span>
            <h1>{currentReport.title}</h1>
            <p>{reportRelatedTitle(data, currentReport)} · {currentReport.created_at.slice(0, 10)}</p>
          </div>
          <StatusBadge tone={reportStatusTone(currentReport.status)}>{reportStatusLabels[currentReport.status]}</StatusBadge>
        </div>
        <p>{currentReport.description}</p>
        <p className="mutedText">희망 해결: {currentReport.desired_resolution}</p>
        {currentReport.resolution_summary && <p className="savingText">처리 결과: {currentReport.resolution_summary}</p>}
      </section>
      <section className="twoColumn">
        <div className="toolPanel">
          <SectionHeader title="처리 이력" />
          <div className="actionHistory">
            {actions.map((action) => (
              <div className="historyRow" key={action.id}>
                <strong>{reportActionTypeLabels[action.action_type]}</strong>
                <span>{reportStatusLabels[action.from_status]} → {reportStatusLabels[action.to_status]}</span>
                <small>{action.memo} · {action.created_at.slice(0, 10)}</small>
              </div>
            ))}
          </div>
        </div>
        <div className="toolPanel">
          <SectionHeader title="첨부 자료" />
          {attachments.length ? attachments.map((file) => <p className="mutedText" key={file.id}>{file.file_name} · {file.file_type}</p>) : <p className="mutedText">첨부 자료가 없습니다.</p>}
        </div>
      </section>
      <section className="toolPanel">
        <SectionHeader title="운영팀 문의" />
        <div className="commentList">
          {comments.map((entry) => (
            <div className="commentBubble" key={entry.id}>
              <strong>{roleLabel(entry.writer_role)}</strong>
              <p>{entry.body}</p>
              <small>{entry.created_at.slice(0, 10)}</small>
            </div>
          ))}
        </div>
        <div className="messageComposer">
          <textarea value={comment} onChange={(event) => setComment(event.target.value)} placeholder="추가 설명을 남겨주세요." />
          <button className="primaryButton" type="button" onClick={addComment}>등록</button>
        </div>
      </section>
    </Page>
  );
}

function DealReviewPage({ data, navigate, setData, dealId }: MutatingPageProps & { dealId: string }) {
  const deal = data.deals.find((entry) => entry.id === dealId);
  const [overall, setOverall] = useState(5);
  const [price, setPrice] = useState(5);
  const [delivery, setDelivery] = useState(5);
  const [quality, setQuality] = useState(5);
  const [communication, setCommunication] = useState(5);
  const [content, setContent] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [wouldReorder, setWouldReorder] = useState(true);
  if (!deal) return <NotFound navigate={navigate} />;
  const currentDeal = deal;
  const existing = data.reviews.find((entry) => entry.deal_id === currentDeal.id);
  const canReview = currentDeal.status === "completed" && !existing;

  function submit(event: FormEvent) {
    event.preventDefault();
    if (!canReview) return;
    const nextData = createDealReview(data, currentDeal.id, {
      rating_overall: overall,
      rating_price: price,
      rating_delivery: delivery,
      rating_quality: quality,
      rating_communication: communication,
      content,
      is_public: isPublic,
      would_reorder: wouldReorder,
    });
    setData(nextData);
    navigate(`/app/suppliers/${currentDeal.supplier_id}`);
  }

  return (
    <Page narrow>
      <BackButton onClick={() => navigate(`/app/deals/${currentDeal.id}`)} label="거래 상세" />
      <PageTitle eyebrow="후기/평점" title="거래 후기 작성" desc={`${supplierName(data, currentDeal.supplier_id)} 거래 경험을 남겨 다른 사장님의 선택을 도와주세요.`} />
      {!canReview && (
        <section className="protectionNotice">
          <Bell />
          <div>
            <strong>{existing ? "이미 작성한 후기입니다." : "거래 완료 후 후기를 작성할 수 있습니다."}</strong>
            <p>현재 거래 상태는 {dealStatusLabels[currentDeal.status]}입니다.</p>
          </div>
        </section>
      )}
      <form className="formStack" onSubmit={submit}>
        <div className="ratingGrid">
          <RatingInput label="전체" value={overall} onChange={setOverall} />
          <RatingInput label="가격" value={price} onChange={setPrice} />
          <RatingInput label="납품" value={delivery} onChange={setDelivery} />
          <RatingInput label="품질" value={quality} onChange={setQuality} />
          <RatingInput label="소통" value={communication} onChange={setCommunication} />
        </div>
        <Field label="후기 내용">
          <textarea value={content} onChange={(event) => setContent(event.target.value)} required placeholder="가격, 납품, 품목 정확도, 응답 속도를 중심으로 작성해 주세요." />
        </Field>
        <div className="toggleGrid">
          <Toggle checked={isPublic} label="공개 후기" onChange={setIsPublic} />
          <Toggle checked={wouldReorder} label="재거래 의향 있음" onChange={setWouldReorder} />
        </div>
        <button className="primaryButton full" type="submit" disabled={!canReview}>후기 등록</button>
      </form>
    </Page>
  );
}

function SupplierReputationPage({ data, navigate, setData }: MutatingPageProps) {
  const supplier = getActiveSupplier(data);
  const reputation = getSupplierReputation(data, supplier.id);
  const stats = supplierStatsFor(data, supplier.id);
  const reviews = data.reviews.filter((entry) => entry.supplier_id === supplier.id).sort((a, b) => b.created_at.localeCompare(a.created_at));
  const reports = data.reports.filter((entry) => entry.target_user_id === supplier.user_id);
  const sanctions = data.user_sanctions.filter((entry) => entry.user_id === supplier.user_id && entry.status === "active");
  const [replyReviewId, setReplyReviewId] = useState("");
  const [replyContent, setReplyContent] = useState("");

  function saveReply() {
    if (!replyReviewId) return;
    setData(addReviewReply(data, replyReviewId, supplier.id, replyContent));
    setReplyReviewId("");
    setReplyContent("");
  }

  return (
    <Page>
      <BackButton onClick={() => navigate("/app/supplier")} label="공급업체 홈" />
      <PageTitle eyebrow="신뢰도/후기" title={`${supplier.business_name} 운영 신뢰도`} desc="구매자에게 노출되는 신뢰도 점수, 후기, 운영 상태를 확인합니다." />
      <section className="reputationHero">
        <ScoreCircle score={reputation.total_score} label={supplierGradeLabels[reputation.grade]} />
        <div className="reputationHeroCopy">
          <StatusBadge tone={reputationTone(reputation)}>{riskLabel(reputation.risk_level)}</StatusBadge>
          <h2>{supplierGradeLabels[reputation.grade]}</h2>
          <p>운영상태: {operationalStatusLabels[supplier.operational_status ?? "normal"]} · 최근 업데이트 {reputation.updated_at.slice(0, 10)}</p>
          <div className="badgeList">
            {reputation.badges.map((badge) => <span key={badge}>{badge}</span>)}
          </div>
          <button className="secondaryButton" type="button" onClick={() => setData(recalculateSupplierReputation(data, supplier.id))}>신뢰도 다시 계산</button>
        </div>
      </section>
      <div className="dashboardGrid">
        <Metric label="응답 점수" value={`${reputation.response_score}점`} icon={<RefreshCcw />} />
        <Metric label="거래 완료 점수" value={`${reputation.completion_score}점`} icon={<PackageCheck />} />
        <Metric label="후기 점수" value={`${reputation.review_score}점`} icon={<BadgeCheck />} />
        <Metric label="분쟁 점수" value={`${reputation.dispute_score}점`} icon={<ShieldCheck />} />
        <Metric label="인증 점수" value={`${reputation.verification_score}점`} icon={<Upload />} />
        <Metric label="재거래 점수" value={`${reputation.repeat_score}점`} icon={<ReceiptText />} />
      </div>
      <section className="twoColumn">
        <InfoPanel title="운영 개선 가이드" items={[
          `평균 응답 시간 ${stats.average_response_minutes}분을 30분 이하로 낮추면 응답 점수가 개선됩니다.`,
          "납품 지연이나 품목 누락 신고는 처리 결과까지 남겨 분쟁 점수 하락을 줄이세요.",
          "후기 답변은 공개 신뢰도에 긍정적인 운영 신호로 표시됩니다.",
        ]} />
        <InfoPanel title="구매자 보호 기준" items={[
          "싸와! 내 거래와 메시지 이력을 기준으로 운영팀이 분쟁을 확인합니다.",
          "외부 결제 유도, 허위 견적, 반복 지연은 제재 또는 제한 대상입니다.",
          "세금계산서/영수증 약속 불이행은 별도 신고 유형으로 관리됩니다.",
        ]} />
      </section>
      <SectionHeader title="후기와 답변" />
      <div className="reviewList">
        {reviews.map((review) => {
          const reply = data.review_replies.find((entry) => entry.review_id === review.id);
          return (
            <article className="reviewCard" key={review.id}>
              <strong>{review.rating_overall.toFixed(1)}점 · {reviewStatusLabels[review.status]}</strong>
              <p>{review.content}</p>
              <small>{review.created_at.slice(0, 10)} · 재거래 {review.would_reorder ? "희망" : "미정"}</small>
              {reply ? <p className="replyText">답변: {reply.content}</p> : (
                <button className="ghostButton compact" type="button" onClick={() => setReplyReviewId(review.id)}>답변 작성</button>
              )}
            </article>
          );
        })}
      </div>
      {replyReviewId && (
        <section className="toolPanel">
          <SectionHeader title="후기 답변 작성" />
          <textarea value={replyContent} onChange={(event) => setReplyContent(event.target.value)} placeholder="구매자에게 보이는 답변을 입력하세요." />
          <div className="formActions">
            <button className="secondaryButton" type="button" onClick={() => setReplyReviewId("")}>취소</button>
            <button className="primaryButton" type="button" onClick={saveReply}>답변 등록</button>
          </div>
        </section>
      )}
      <section className="twoColumn">
        <InfoPanel title="최근 신고" items={reports.slice(0, 4).map((report) => `${reportStatusLabels[report.status]} · ${report.title}`)} />
        <InfoPanel title="활성 제재" items={sanctions.length ? sanctions.map((sanction) => `${sanctionTypeLabels[sanction.sanction_type]} · ${sanction.reason}`) : ["활성 제재 없음"]} />
      </section>
    </Page>
  );
}

function AdminReportsPage({ data, navigate }: PageProps) {
  const [status, setStatus] = useState("전체");
  const reports = data.reports
    .filter((report) => status === "전체" || reportStatusLabels[report.status] === status)
    .sort((a, b) => b.created_at.localeCompare(a.created_at));
  const urgentCount = data.reports.filter((report) => report.priority === "urgent" && !["resolved", "dismissed", "cancelled"].includes(report.status)).length;

  return (
    <Page>
      <BackButton onClick={() => navigate("/app/admin")} label="관리자 홈" />
      <PageTitle eyebrow="운영관리" title="신고/분쟁 관리" desc="신규 신고를 검토하고 상태 변경, 조치, 제재까지 이어서 처리합니다." />
      <div className="dashboardGrid">
        <Metric label="신규 접수" value={`${data.reports.filter((report) => report.status === "submitted").length}건`} icon={<Bell />} />
        <Metric label="검토 중" value={`${data.reports.filter((report) => report.status === "reviewing").length}건`} icon={<RefreshCcw />} />
        <Metric label="긴급" value={`${urgentCount}건`} icon={<ShieldCheck />} />
        <Metric label="해결" value={`${data.reports.filter((report) => report.status === "resolved").length}건`} icon={<Check />} />
      </div>
      <FilterTabs options={["전체", ...Object.values(reportStatusLabels)]} active={status} onChange={setStatus} />
      {reports.length ? (
      <div className="tableWrap">
        <table>
          <thead>
            <tr>
              <th>제목</th>
              <th>유형</th>
              <th>신고자</th>
              <th>대상</th>
              <th>상태</th>
              <th>우선순위</th>
              <th>상세</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report.id}>
                <td><strong>{report.title}</strong></td>
                <td>{reportTypeLabels[report.report_type]}</td>
                <td>{userLabel(data, report.reporter_id)}</td>
                <td>{userLabel(data, report.target_user_id)}</td>
                <td><StatusBadge tone={reportStatusTone(report.status)}>{reportStatusLabels[report.status]}</StatusBadge></td>
                <td>{notificationPriorityLabels[report.priority]}</td>
                <td><button className="ghostButton compact" type="button" onClick={() => navigate(`/app/admin/reports/${report.id}`)}>처리</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      ) : (
        <EmptyState icon={<Bell />} title="처리할 신고가 없습니다." desc="새 신고가 접수되면 이곳에서 상태 변경과 제재 처리를 할 수 있습니다." />
      )}
    </Page>
  );
}

function AdminReportDetailPage({ data, navigate, setData, reportId }: MutatingPageProps & { reportId: string }) {
  const report = data.reports.find((entry) => entry.id === reportId);
  const [status, setStatus] = useState<ReportStatus>(report?.status ?? "reviewing");
  const [actionType, setActionType] = useState<ReportActionType>("status_change");
  const [memo, setMemo] = useState("");
  const [comment, setComment] = useState("");
  const [sanctionType, setSanctionType] = useState<SanctionType>("warning");
  const [days, setDays] = useState(7);
  if (!report) return <NotFound navigate={navigate} />;
  const currentReport = report;
  const actions = data.report_actions.filter((entry) => entry.report_id === currentReport.id).sort((a, b) => b.created_at.localeCompare(a.created_at));
  const comments = data.report_comments.filter((entry) => entry.report_id === currentReport.id).sort((a, b) => b.created_at.localeCompare(a.created_at));

  function saveStatus() {
    setData(updateReportStatus(data, currentReport.id, status, memo, actionType));
    setMemo("");
  }

  function addInternalComment() {
    setData(addReportComment(data, currentReport.id, "admin-1", "admin", comment, true));
    setComment("");
  }

  function applySanction() {
    if (currentReport.target_role !== "buyer" && currentReport.target_role !== "supplier") return;
    setData(applyUserSanction(data, {
      user_id: currentReport.target_user_id,
      user_role: currentReport.target_role,
      sanction_type: sanctionType,
      reason: memo || currentReport.title,
      related_report_id: currentReport.id,
      days: sanctionType === "warning" || sanctionType === "permanent_ban" ? undefined : days,
    }));
  }

  return (
    <Page>
      <BackButton onClick={() => navigate("/app/admin/reports")} label="신고/분쟁 관리" />
      <section className="detailBand">
        <div className="detailHeader">
          <div>
            <span className="eyebrow">{reportTypeLabels[currentReport.report_type]} · {notificationPriorityLabels[currentReport.priority]}</span>
            <h1>{currentReport.title}</h1>
            <p>{userLabel(data, currentReport.reporter_id)} → {userLabel(data, currentReport.target_user_id)} · {reportRelatedTitle(data, currentReport)}</p>
          </div>
          <StatusBadge tone={reportStatusTone(currentReport.status)}>{reportStatusLabels[currentReport.status]}</StatusBadge>
        </div>
        <p>{currentReport.description}</p>
        <p className="mutedText">희망 해결: {currentReport.desired_resolution}</p>
      </section>
      <section className="adminSupplierLayout">
        <div className="toolPanel">
          <SectionHeader title="상태/조치 처리" />
          <div className="formGrid">
            <Field label="상태">
              <select value={status} onChange={(event) => setStatus(event.target.value as ReportStatus)}>
                {Object.entries(reportStatusLabels).map(([key, label]) => <option value={key} key={key}>{label}</option>)}
              </select>
            </Field>
            <Field label="조치 유형">
              <select value={actionType} onChange={(event) => setActionType(event.target.value as ReportActionType)}>
                {Object.entries(reportActionTypeLabels).map(([key, label]) => <option value={key} key={key}>{label}</option>)}
              </select>
            </Field>
          </div>
          <Field label="처리 메모">
            <textarea value={memo} onChange={(event) => setMemo(event.target.value)} placeholder="처리 내용 또는 구매자/공급업체 안내를 입력하세요." />
          </Field>
          <div className="formActions">
            <button className="primaryButton" type="button" onClick={saveStatus}>상태 저장</button>
            <button className="secondaryButton" type="button" onClick={() => navigate(`/app/reports/${currentReport.id}`)}>사용자 화면 보기</button>
          </div>
        </div>
        <aside className="adminSupplierDetail">
          <SectionHeader title="제재 적용" />
          <Field label="제재 유형">
            <select value={sanctionType} onChange={(event) => setSanctionType(event.target.value as SanctionType)}>
              {Object.entries(sanctionTypeLabels).map(([key, label]) => <option value={key} key={key}>{label}</option>)}
            </select>
          </Field>
          <Field label="제한 일수">
            <input type="number" min="1" value={days} onChange={(event) => setDays(Number(event.target.value))} />
          </Field>
          <button className="secondaryButton full" type="button" onClick={applySanction}>대상자 제재 적용</button>
        </aside>
      </section>
      <section className="twoColumn">
        <div className="toolPanel">
          <SectionHeader title="처리 이력" />
          <div className="actionHistory">
            {actions.map((action) => (
              <div className="historyRow" key={action.id}>
                <strong>{reportActionTypeLabels[action.action_type]}</strong>
                <span>{reportStatusLabels[action.from_status]} → {reportStatusLabels[action.to_status]}</span>
                <small>{action.memo} · {action.actor_role}</small>
              </div>
            ))}
          </div>
        </div>
        <div className="toolPanel">
          <SectionHeader title="내부/외부 댓글" />
          <div className="commentList">
            {comments.map((entry) => (
              <div className={entry.is_internal ? "commentBubble internal" : "commentBubble"} key={entry.id}>
                <strong>{roleLabel(entry.writer_role)}{entry.is_internal ? " 내부" : ""}</strong>
                <p>{entry.body}</p>
              </div>
            ))}
          </div>
          <textarea value={comment} onChange={(event) => setComment(event.target.value)} placeholder="내부 검토 메모를 남기세요." />
          <button className="ghostButton" type="button" onClick={addInternalComment}>내부 메모 등록</button>
        </div>
      </section>
    </Page>
  );
}

function AdminReviewsPage({ data, navigate, setData }: MutatingPageProps) {
  const [status, setStatus] = useState("전체");
  const reviews = data.reviews
    .filter((review) => status === "전체" || reviewStatusLabels[review.status] === status)
    .sort((a, b) => b.created_at.localeCompare(a.created_at));

  return (
    <Page>
      <BackButton onClick={() => navigate("/app/admin")} label="관리자 홈" />
      <PageTitle eyebrow="운영관리" title="후기 관리" desc="구매자 후기, 공급업체 답변, 신고된 후기를 검토합니다." />
      <div className="dashboardGrid">
        <Metric label="전체 후기" value={`${data.reviews.length}건`} icon={<BadgeCheck />} />
        <Metric label="신고된 후기" value={`${data.reviews.filter((review) => review.status === "reported").length}건`} icon={<Bell />} />
        <Metric label="숨김" value={`${data.reviews.filter((review) => review.status === "hidden").length}건`} icon={<ShieldCheck />} />
        <Metric label="후기 신고" value={`${data.review_reports.length}건`} icon={<ClipboardList />} />
      </div>
      <FilterTabs options={["전체", ...Object.values(reviewStatusLabels)]} active={status} onChange={setStatus} />
      <div className="reviewModerationGrid">
        {reviews.map((review) => {
          const supplier = data.supplier_profiles.find((entry) => entry.id === review.supplier_id);
          const report = data.review_reports.find((entry) => entry.review_id === review.id);
          return (
            <article className="toolPanel" key={review.id}>
              <div className="listHeader">
                <div>
                  <strong>{supplier?.business_name ?? review.supplier_id} · {review.rating_overall.toFixed(1)}점</strong>
                  <p>{review.content}</p>
                </div>
                <StatusBadge tone={reviewStatusTone(review.status)}>{reviewStatusLabels[review.status]}</StatusBadge>
              </div>
              <div className="detailMeta">
                <span>가격 {review.rating_price}</span>
                <span>납품 {review.rating_delivery}</span>
                <span>품질 {review.rating_quality}</span>
                <span>소통 {review.rating_communication}</span>
              </div>
              {report && <p className="dangerText">신고: {reviewReportStatusLabels[report.status]} · {report.reason}</p>}
              <div className="formActions">
                <button className="secondaryButton" type="button" onClick={() => setData(updateReviewStatus(data, review.id, "hidden"))}>숨김</button>
                <button className="ghostButton" type="button" onClick={() => setData(updateReviewStatus(data, review.id, "active"))}>공개</button>
                <button className="ghostButton" type="button" onClick={() => setData(reportReview(data, review.id, "admin-1", "운영자 검토 필요", "관리자 화면에서 직접 신고 처리"))}>신고 등록</button>
              </div>
            </article>
          );
        })}
      </div>
    </Page>
  );
}

function AdminReputationPage({ data, navigate, setData }: MutatingPageProps) {
  const rows = data.supplier_profiles.map((supplier) => ({ supplier, reputation: getSupplierReputation(data, supplier.id) })).sort((a, b) => b.reputation.total_score - a.reputation.total_score);
  const lowRisk = rows.filter((row) => row.reputation.risk_level === "low").length;
  const highRisk = rows.filter((row) => row.reputation.risk_level === "high").length;

  return (
    <Page>
      <BackButton onClick={() => navigate("/app/admin")} label="관리자 홈" />
      <PageTitle eyebrow="운영관리" title="공급업체 신뢰도 관리" desc="응답, 거래 완료, 후기, 분쟁, 인증 자료를 기준으로 공급업체 리스크를 확인합니다." />
      <div className="dashboardGrid">
        <Metric label="관리 공급업체" value={`${rows.length}곳`} icon={<Store />} />
        <Metric label="낮은 리스크" value={`${lowRisk}곳`} icon={<BadgeCheck />} />
        <Metric label="높은 리스크" value={`${highRisk}곳`} icon={<ShieldCheck />} />
        <Metric label="평균 점수" value={`${Math.round(rows.reduce((sum, row) => sum + row.reputation.total_score, 0) / Math.max(1, rows.length))}점`} icon={<ReceiptText />} />
      </div>
      <div className="tableWrap">
        <table>
          <thead>
            <tr>
              <th>공급업체</th>
              <th>점수</th>
              <th>등급</th>
              <th>리스크</th>
              <th>운영상태</th>
              <th>배지</th>
              <th>관리</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(({ supplier, reputation }) => (
              <tr key={supplier.id}>
                <td><strong>{supplier.business_name}</strong></td>
                <td>{reputation.total_score}점</td>
                <td>{supplierGradeLabels[reputation.grade]}</td>
                <td><StatusBadge tone={reputationTone(reputation)}>{riskLabel(reputation.risk_level)}</StatusBadge></td>
                <td>{operationalStatusLabels[supplier.operational_status ?? "normal"]}</td>
                <td>{reputation.badges.slice(0, 3).join(", ") || "없음"}</td>
                <td>
                  <button className="ghostButton compact" type="button" onClick={() => setData(recalculateSupplierReputation(data, supplier.id))}>재계산</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Page>
  );
}

function AdminSanctionsPage({ data, navigate, setData }: MutatingPageProps) {
  return (
    <Page>
      <BackButton onClick={() => navigate("/app/admin")} label="관리자 홈" />
      <PageTitle eyebrow="운영관리" title="제재/블랙리스트 관리" desc="경고, 견적 제한, 메시지 제한, 정지와 블랙리스트 상태를 관리합니다." />
      <div className="dashboardGrid">
        <Metric label="활성 제재" value={`${data.user_sanctions.filter((entry) => entry.status === "active").length}건`} icon={<ShieldCheck />} />
        <Metric label="만료 제재" value={`${data.user_sanctions.filter((entry) => entry.status === "expired").length}건`} icon={<Check />} />
        <Metric label="블랙리스트" value={`${data.blacklist_entries.filter((entry) => entry.status === "active").length}건`} icon={<Bell />} />
        <Metric label="신고 연동" value={`${data.user_sanctions.filter((entry) => entry.related_report_id).length}건`} icon={<ClipboardList />} />
      </div>
      <section className="toolPanel">
        <SectionHeader title="제재 목록" />
        <div className="tableWrap">
          <table>
            <thead>
              <tr>
                <th>대상</th>
                <th>유형</th>
                <th>사유</th>
                <th>기간</th>
                <th>상태</th>
                <th>관리</th>
              </tr>
            </thead>
            <tbody>
              {data.user_sanctions.map((sanction) => (
                <tr key={sanction.id}>
                  <td>{userLabel(data, sanction.user_id)}</td>
                  <td>{sanctionTypeLabels[sanction.sanction_type]}</td>
                  <td>{sanction.reason}</td>
                  <td>{sanction.start_at}{sanction.end_at ? ` ~ ${sanction.end_at}` : ""}</td>
                  <td><StatusBadge tone={sanctionStatusTone(sanction.status)}>{sanctionStatusLabels[sanction.status]}</StatusBadge></td>
                  <td>
                    <select value={sanction.status} onChange={(event) => setData(updateSanctionStatus(data, sanction.id, event.target.value as SanctionStatus))}>
                      {Object.entries(sanctionStatusLabels).map(([key, label]) => <option value={key} key={key}>{label}</option>)}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <section className="toolPanel">
        <SectionHeader title="블랙리스트" />
        <div className="tableWrap">
          <table>
            <thead>
              <tr>
                <th>대상 유형</th>
                <th>값</th>
                <th>사유</th>
                <th>상태</th>
                <th>관리</th>
              </tr>
            </thead>
            <tbody>
              {data.blacklist_entries.map((entry) => (
                <tr key={entry.id}>
                  <td>{blacklistTargetTypeLabels[entry.target_type]}</td>
                  <td>{entry.target_value}</td>
                  <td>{entry.reason}</td>
                  <td><StatusBadge tone={blacklistStatusTone(entry.status)}>{blacklistStatusLabels[entry.status]}</StatusBadge></td>
                  <td>
                    <select value={entry.status} onChange={(event) => setData(updateBlacklistStatus(data, entry.id, event.target.value as BlacklistStatus))}>
                      {Object.entries(blacklistStatusLabels).map(([key, label]) => <option value={key} key={key}>{label}</option>)}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </Page>
  );
}

function AdminOperationsPage({ data, navigate }: PageProps) {
  const summary = getOperationsSummary(data);
  const riskSuppliers = data.supplier_profiles
    .map((supplier) => ({ supplier, reputation: getSupplierReputation(data, supplier.id) }))
    .sort((a, b) => a.reputation.total_score - b.reputation.total_score)
    .slice(0, 5);
  const openReports = data.reports.filter((report) => !["resolved", "dismissed", "cancelled"].includes(report.status)).slice(0, 5);

  return (
    <Page>
      <BackButton onClick={() => navigate("/app/admin")} label="관리자 홈" />
      <PageTitle eyebrow="운영관리" title="운영 대시보드" desc="신고, 후기, 신뢰도, 제재 흐름을 운영 지표로 확인합니다." />
      <div className="dashboardGrid">
        <Metric label="신규 신고" value={`${summary.newReports}건`} icon={<Bell />} />
        <Metric label="미해결 신고" value={`${summary.openReports}건`} icon={<RefreshCcw />} />
        <Metric label="긴급 신고" value={`${summary.urgentReports}건`} icon={<ShieldCheck />} />
        <Metric label="평균 처리 mock" value={`${summary.averageHandleHours}시간`} icon={<CalendarDays />} />
        <Metric label="분쟁률" value={`${summary.disputeRate}%`} icon={<ClipboardList />} />
        <Metric label="거래 완료율" value={`${summary.completionRate}%`} icon={<PackageCheck />} />
        <Metric label="평균 후기" value={`${summary.averageRating.toFixed(1)}점`} icon={<BadgeCheck />} />
        <Metric label="활성 제재" value={`${summary.activeSanctions}건`} icon={<ShieldCheck />} />
      </div>
      <section className="operationsGrid">
        <div className="toolPanel">
          <SectionHeader title="처리 우선 신고" action="전체 보기" onAction={() => navigate("/app/admin/reports")} />
          <div className="riskList">
            {openReports.map((report) => (
              <button className="riskRow" type="button" key={report.id} onClick={() => navigate(`/app/admin/reports/${report.id}`)}>
                <strong>{report.title}</strong>
                <span>{reportStatusLabels[report.status]} · {notificationPriorityLabels[report.priority]}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="toolPanel">
          <SectionHeader title="리스크 공급업체" action="신뢰도 관리" onAction={() => navigate("/app/admin/reputation")} />
          <div className="riskList">
            {riskSuppliers.map(({ supplier, reputation }) => (
              <div className="riskRow" key={supplier.id}>
                <strong>{supplier.business_name}</strong>
                <span>{reputation.total_score}점 · {supplierGradeLabels[reputation.grade]} · {riskLabel(reputation.risk_level)}</span>
              </div>
            ))}
          </div>
        </div>
        <InfoPanel title="운영 정책 체크리스트" items={[
          "긴급 신고는 당일 1차 응답을 목표로 처리합니다.",
          "반복 분쟁 공급업체는 경고 후 견적/메시지 제한을 검토합니다.",
          "후기 숨김은 신고 사유와 내부 메모를 함께 남깁니다.",
          "신뢰도 70점 미만 업체는 인증자료와 납품 이력을 재검토합니다.",
        ]} />
      </section>
    </Page>
  );
}

function AnalyzePage({ data, navigate, setData }: MutatingPageProps) {
  const [sourceType, setSourceType] = useState<AnalysisSourceType>("invoice");
  const [fileName, setFileName] = useState("동대문식자재_거래명세서.jpg");
  const [textInput, setTextInput] = useState("닭정육 20kg 120,000원\n양파 15kg 28,000원\n식용유 18L 2통 76,000원\n배달봉투 대형 1000장 45,000원");
  const sourceCards: Array<{ type: AnalysisSourceType; title: string; desc: string; icon: ReactNode }> = [
    { type: "invoice", title: "거래명세서 올리기", desc: "기존 거래처에서 구매한 품목과 금액을 분석합니다.", icon: <ReceiptText /> },
    { type: "quotation", title: "기존 견적서 올리기", desc: "기존 견적을 기준으로 더 저렴한 견적을 받을 수 있습니다.", icon: <ClipboardList /> },
    { type: "receipt", title: "영수증 올리기", desc: "구매내역으로 자동 정리할 수 있습니다.", icon: <Upload /> },
    { type: "tax_invoice", title: "세금계산서/PDF 올리기", desc: "공급가, 부가세, 거래처 정보를 추출합니다.", icon: <Landmark /> },
    { type: "excel", title: "엑셀/CSV 올리기", desc: "여러 품목을 한 번에 견적요청으로 변환합니다.", icon: <Boxes /> },
    { type: "text", title: "카톡 주문내역 붙여넣기", desc: "복사한 주문 내용을 품목 리스트로 정리합니다.", icon: <FilePlus2 /> },
    { type: "photo", title: "품목 사진 올리기", desc: "사진 속 물건을 기준으로 견적요청을 만들 수 있습니다.", icon: <SearchCheck /> },
  ];

  function startAnalysis(event: FormEvent) {
    event.preventDefault();
    const result = createAnalysisJob(data, {
      source_type: sourceType,
      file_name: fileName,
      file_type: fileName.split(".").pop() || (sourceType === "text" ? "txt" : "jpg"),
      original_text_input: textInput,
    });
    setData(result.data);
    navigate(`/app/analyze/${result.analysisId}`);
  }

  return (
    <Page>
      <PageTitle eyebrow="OCR/AI 분석 mock" title="거래명세서나 견적서를 올려보세요." desc="품목을 자동으로 정리해서 견적요청이나 장부 입력으로 바꿔드립니다." />
      <BetaLimitationsNotice navigate={navigate} context="analysis" />
      <section className="securityNotice">
        <ShieldCheck size={20} />
        <p>업로드한 자료는 견적요청 및 장부 정리를 위해 사용됩니다. 민감한 정보가 포함된 경우, 견적요청 전 공개 범위를 확인해주세요.</p>
      </section>
      <div className="analysisSourceGrid">
        {sourceCards.map((card) => (
          <button className={sourceType === card.type ? "analysisSourceCard active" : "analysisSourceCard"} type="button" key={card.type} onClick={() => { setSourceType(card.type); setFileName(defaultAnalysisUiFileName(card.type)); }}>
            <span className="tileIcon">{card.icon}</span>
            <strong>{card.title}</strong>
            <span>{card.desc}</span>
          </button>
        ))}
      </div>
      <form className="formStack" onSubmit={startAnalysis}>
        <SectionHeader title="분석 자료" action="분석 이력" onAction={() => navigate("/app/analyze/history")} />
        <div className="formGrid">
          <label className="field">
            자료 유형
            <select value={sourceType} onChange={(event) => setSourceType(event.target.value as AnalysisSourceType)}>
              {Object.entries(analysisSourceTypeLabels).map(([value, label]) => <option value={value} key={value}>{label}</option>)}
            </select>
          </label>
          <label className="field">
            파일명
            <input value={fileName} onChange={(event) => setFileName(event.target.value)} placeholder="예: 거래명세서.jpg" />
          </label>
        </div>
        <label className="field">
          카톡/문자/파일 추출 텍스트 mock
          <textarea value={textInput} onChange={(event) => setTextInput(event.target.value)} />
        </label>
        <div className="analysisSteps">
          {["파일 업로드 완료", "텍스트 추출 중", "품목 분석 중", "금액/거래처 정보 확인 중", "검토 화면 준비 중"].map((step, index) => (
            <div className="analysisStep" key={step}><span>{index + 1}</span><strong>{step}</strong></div>
          ))}
        </div>
        <button className="primaryButton full" type="submit">자료 업로드하고 분석 시작</button>
      </form>
    </Page>
  );
}

function AnalysisDetailPage({ data, navigate, setData, analysisId }: MutatingPageProps & { analysisId: string }) {
  const job = data.analysis_jobs.find((entry) => entry.id === analysisId);
  const [started, setStarted] = useState(false);
  useEffect(() => {
    if (!job || started || !["uploaded", "queued", "analyzing"].includes(job.status)) return;
    setStarted(true);
    setData(updateAnalysisJob(data, job.id, { status: "analyzing" }));
    window.setTimeout(() => setData(runMockAnalysis(data, job.id)), 700);
  }, [data, job, setData, started]);

  if (!job) return <NotFound navigate={navigate} />;
  const items = data.analysis_items.filter((entry) => entry.analysis_job_id === job.id);
  const attachments = data.analysis_attachments.filter((entry) => entry.analysis_job_id === job.id);
  const rawResult = data.analysis_raw_results.find((entry) => entry.analysis_job_id === job.id);
  const conversions = data.analysis_conversions.filter((entry) => entry.analysis_job_id === job.id);
  const needsReview = items.filter((itemEntry) => itemEntry.review_status === "needs_review");

  return (
    <Page>
      <BackButton onClick={() => navigate("/app/analyze/history")} label="분석 이력" />
      <section className="detailBand">
        <div className="detailHeader">
          <div>
            <span className="eyebrow">{analysisSourceTypeLabels[job.source_type]}</span>
            <h1>{job.original_file_name}</h1>
            <p>{analysisStatusMessage(job.status)}</p>
          </div>
          <StatusBadge tone={analysisStatusTone(job.status)}>{analysisStatusLabels[job.status]}</StatusBadge>
        </div>
        <div className="analysisProgress">
          {analysisProgressSteps(job.status).map((step) => <span className={step.done ? "done" : ""} key={step.label}>{step.label}</span>)}
        </div>
        <div className="dashboardGrid">
          <Metric label="신뢰도" value={`${job.confidence_score || 0}점`} icon={<BadgeCheck />} />
          <Metric label="추정 카테고리" value={job.detected_category || "분석 중"} icon={<Boxes />} />
          <Metric label="추출 품목" value={`${items.length}개`} icon={<ClipboardList />} />
          <Metric label="총액" value={money(job.detected_total_amount)} icon={<ReceiptText />} />
        </div>
      </section>

      <section className="analysisReviewGrid">
        <div className="toolPanel">
          <SectionHeader title="원본 자료 미리보기" />
          <div className="filePreview">
            <Upload size={34} />
            <strong>{job.original_file_name}</strong>
            <span>{job.original_file_type.toUpperCase()} · {attachments.length || 1}개 파일</span>
          </div>
          {rawResult && <pre className="rawTextPreview">{rawResult.raw_text}</pre>}
          {job.error_message && <p className="dangerText">{job.error_message}</p>}
        </div>
        <div className="toolPanel">
          <SectionHeader title="거래처/금액 정보" />
          <div className="analysisInfoGrid">
            <InfoPair label="공급업체명" value={job.detected_supplier_name || "확인 필요"} />
            <InfoPair label="사업자번호" value={job.detected_business_number || "확인 필요"} />
            <InfoPair label="거래일" value={job.detected_transaction_date || "확인 필요"} />
            <InfoPair label="공급가" value={money(job.detected_supply_amount)} />
            <InfoPair label="부가세" value={money(job.detected_vat_amount)} />
            <InfoPair label="배송비" value={money(job.detected_delivery_fee)} />
            <InfoPair label="결제수단" value={paymentMethodLabels[job.detected_payment_method]} />
          </div>
        </div>
      </section>

      {needsReview.length > 0 && (
        <section className="reviewNotice">
          <SearchCheck size={22} />
          <div>
            <h2>확인 필요한 항목만 체크하면 됩니다.</h2>
            <p>아래 항목은 정확한 견적이나 장부 반영을 위해 확인이 필요합니다.</p>
          </div>
        </section>
      )}

      <section className="toolPanel">
        <SectionHeader title="추출된 품목 리스트" />
        <div className="analysisItemList">
          {items.map((itemEntry) => <AnalysisItemCard key={itemEntry.id} item={itemEntry} data={data} setData={setData} />)}
          {items.length === 0 && <EmptyState icon={<SearchCheck />} title="분석 결과를 준비하고 있습니다." desc="잠시 후 mock 분석 결과가 표시됩니다." />}
        </div>
      </section>

      <section className="conversionPanel">
        <div>
          <h2>분석 결과를 바로 활용하세요.</h2>
          <p>기존 단가는 기본적으로 업체에게 공개되지 않습니다.</p>
        </div>
        <div className="toolbar">
          <button className="primaryButton" type="button" onClick={() => navigate(`/app/requests/new/from-analysis/${job.id}`)} disabled={items.length === 0}>이 품목으로 견적요청 만들기</button>
          <button className="secondaryButton" type="button" onClick={() => navigate(`/app/purchases/from-analysis/${job.id}`)} disabled={items.length === 0}>구매내역으로 저장하기</button>
        </div>
      </section>

      {conversions.length > 0 && (
        <section className="toolPanel">
          <SectionHeader title="변환 이력" />
          <div className="miniList">
            {conversions.map((conversion) => (
              <button className="miniRow" type="button" key={conversion.id} onClick={() => navigate(conversion.converted_type === "quote_request" ? `/app/requests/${conversion.converted_id}` : `/app/purchases/${conversion.converted_id}`)}>
                <span>{conversion.converted_type === "quote_request" ? "견적요청" : "구매내역"} 변환</span>
                <strong>{conversion.converted_at.slice(0, 10)}</strong>
              </button>
            ))}
          </div>
        </section>
      )}
    </Page>
  );
}

function AnalysisItemCard({ item, data, setData }: { item: AnalysisItem; data: AppData; setData: (data: AppData) => void }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(item);

  function savePatch(status: AnalysisItemReviewStatus = "confirmed") {
    setData(updateAnalysisItem(data, item.id, { ...draft, review_status: status, review_reason: status === "confirmed" ? "" : draft.review_reason }));
    setEditing(false);
  }

  return (
    <article className={item.review_status === "excluded" ? "analysisItemCard excluded" : "analysisItemCard"}>
      <div className="analysisItemMain">
        <StatusBadge tone={item.review_status === "confirmed" ? "green" : item.review_status === "needs_review" ? "orange" : item.review_status === "excluded" ? "gray" : "blue"}>{analysisItemReviewStatusLabels[item.review_status]}</StatusBadge>
        {editing ? (
          <div className="analysisEditGrid">
            <input value={draft.item_name} onChange={(event) => setDraft({ ...draft, item_name: event.target.value })} />
            <input value={draft.spec} onChange={(event) => setDraft({ ...draft, spec: event.target.value })} />
            <input type="number" value={draft.quantity} onChange={(event) => setDraft({ ...draft, quantity: Number(event.target.value) })} />
            <input value={draft.unit} onChange={(event) => setDraft({ ...draft, unit: event.target.value })} />
            <input type="number" value={draft.total_price} onChange={(event) => setDraft({ ...draft, total_price: Number(event.target.value) })} />
          </div>
        ) : (
          <>
            <h3>{item.item_name}</h3>
            <p>{item.spec || `${item.quantity}${item.unit}`} · {item.quantity}{item.unit} · {item.total_price ? money(item.total_price) : "금액 확인 필요"}</p>
            {item.review_reason && <small>{item.review_reason}</small>}
          </>
        )}
      </div>
      <div className="analysisItemActions">
        {editing ? (
          <>
            <button className="primaryButton compact" type="button" onClick={() => savePatch("confirmed")}>수정 후 확정</button>
            <button className="ghostButton compact" type="button" onClick={() => setEditing(false)}>취소</button>
          </>
        ) : (
          <>
            <button className="secondaryButton compact" type="button" onClick={() => setEditing(true)}>수정</button>
            <button className="primaryButton compact" type="button" onClick={() => savePatch("confirmed")}>이대로 확정</button>
            <button className="ghostButton compact" type="button" onClick={() => savePatch("excluded")}>제외하기</button>
          </>
        )}
      </div>
    </article>
  );
}

function AnalysisToRequestPage({ data, navigate, setData, analysisId }: MutatingPageProps & { analysisId: string }) {
  const job = data.analysis_jobs.find((entry) => entry.id === analysisId);
  const [disclosureScope, setDisclosureScope] = useState<AnalysisDisclosureScope>("items_only");
  const [deliveryRegion, setDeliveryRegion] = useState("서울 노원구");
  const [deliveryAddress, setDeliveryAddress] = useState("서울 노원구");
  const [desiredDate, setDesiredDate] = useState("2026-07-10");
  const [needTaxInvoice, setNeedTaxInvoice] = useState(true);
  if (!job) return <NotFound navigate={navigate} />;
  const currentJob = job;

  function submit(event: FormEvent) {
    event.preventDefault();
    const result = convertAnalysisToQuoteRequest(data, currentJob.id, {
      delivery_region: deliveryRegion,
      delivery_address: deliveryAddress,
      desired_delivery_date: desiredDate,
      need_tax_invoice: needTaxInvoice,
      disclosure_scope: disclosureScope,
    });
    setData(result.data);
    navigate(`/app/requests/${result.requestId}`);
  }

  return (
    <Page narrow>
      <BackButton onClick={() => navigate(`/app/analyze/${currentJob.id}`)} label="분석 상세" />
      <PageTitle eyebrow="분석 결과 변환" title="기존 거래내역을 기준으로 더 저렴한 견적을 받아보세요." desc="공급업체에게 공개할 정보 범위를 먼저 선택합니다." />
      <form className="formStack" onSubmit={submit}>
        <section className="securityNotice">
          <ShieldCheck size={20} />
          <p>기존 거래처명과 기존 단가는 기본적으로 공개하지 않습니다. 기본값은 품목/수량만 공개입니다.</p>
        </section>
        <label className="field">
          공개 범위
          <select value={disclosureScope} onChange={(event) => setDisclosureScope(event.target.value as AnalysisDisclosureScope)}>
            {Object.entries(analysisDisclosureScopeLabels).map(([value, label]) => <option value={value} key={value}>{label}</option>)}
          </select>
        </label>
        <div className="formGrid">
          <label className="field">
            배송 지역
            <input value={deliveryRegion} onChange={(event) => setDeliveryRegion(event.target.value)} />
          </label>
          <label className="field">
            납품 주소
            <input value={deliveryAddress} onChange={(event) => setDeliveryAddress(event.target.value)} />
          </label>
        </div>
        <div className="formGrid">
          <label className="field">
            희망 납품일
            <input type="date" value={desiredDate} onChange={(event) => setDesiredDate(event.target.value)} />
          </label>
          <Toggle label="세금계산서 필요" checked={needTaxInvoice} onChange={setNeedTaxInvoice} />
        </div>
        <button className="primaryButton full" type="submit">견적요청 생성</button>
      </form>
    </Page>
  );
}

function AnalysisToPurchasePage({ data, navigate, setData, analysisId }: MutatingPageProps & { analysisId: string }) {
  const job = data.analysis_jobs.find((entry) => entry.id === analysisId);
  const [accountingCategory, setAccountingCategory] = useState(job ? getAccountingCategory(job.detected_category || "기타") : "자재구매");
  const [taxStatus, setTaxStatus] = useState<TaxInvoiceStatus>("pending");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("undecided");
  if (!job) return <NotFound navigate={navigate} />;
  const currentJob = job;

  function submit(event: FormEvent) {
    event.preventDefault();
    const result = convertAnalysisToPurchaseRecord(data, currentJob.id, {
      accounting_category: accountingCategory,
      tax_invoice_status: taxStatus,
      payment_method: paymentMethod,
    });
    setData(result.data);
    navigate(`/app/purchases/${result.purchaseId}`);
  }

  return (
    <Page narrow>
      <BackButton onClick={() => navigate(`/app/analyze/${currentJob.id}`)} label="분석 상세" />
      <PageTitle eyebrow="오늘장사 장부 준비" title="이 자료를 구매내역으로 저장하면 오늘장사 장부에 반영할 수 있습니다." desc="거래처, 품목, 금액을 확인한 뒤 매입 카테고리와 증빙 상태를 선택합니다." />
      <form className="formStack" onSubmit={submit}>
        <div className="analysisInfoGrid">
          <InfoPair label="거래처" value={currentJob.detected_supplier_name || "확인 필요"} />
          <InfoPair label="거래일" value={currentJob.detected_transaction_date || today} />
          <InfoPair label="총액" value={money(currentJob.detected_total_amount)} />
          <InfoPair label="품목 수" value={`${data.analysis_items.filter((itemEntry) => itemEntry.analysis_job_id === currentJob.id && itemEntry.review_status !== "excluded").length}개`} />
        </div>
        <div className="formGrid">
          <label className="field">
            매입 카테고리
            <select value={accountingCategory} onChange={(event) => setAccountingCategory(event.target.value)}>
              {accountingCategoryOptions(data).map((option) => <option key={option}>{option}</option>)}
            </select>
          </label>
          <label className="field">
            세금계산서 상태
            <select value={taxStatus} onChange={(event) => setTaxStatus(event.target.value as TaxInvoiceStatus)}>
              {Object.entries(taxInvoiceStatusLabels).map(([value, label]) => <option value={value} key={value}>{label}</option>)}
            </select>
          </label>
        </div>
        <label className="field">
          결제수단
          <select value={paymentMethod} onChange={(event) => setPaymentMethod(event.target.value as PaymentMethod)}>
            {Object.entries(paymentMethodLabels).map(([value, label]) => <option value={value} key={value}>{label}</option>)}
          </select>
        </label>
        <section className="reviewNotice ready">
          <Landmark size={22} />
          <div>
            <h2>장부 반영 준비 완료 상태로 저장됩니다.</h2>
            <p>구매내역 상세에서 장부 반영하기, 수정하기, 제외하기를 계속 처리할 수 있습니다.</p>
          </div>
        </section>
        <button className="primaryButton full" type="submit">구매내역으로 저장</button>
      </form>
    </Page>
  );
}

function AnalysisHistoryPage({ data, navigate }: PageProps) {
  const [filter, setFilter] = useState("전체");
  const [search, setSearch] = useState("");
  const jobs = filterAnalysisJobs(data, filter, search);

  return (
    <Page>
      <PageTitle eyebrow="분석 이력" title="업로드 자료 분석 이력" desc="자료명, 상태, 변환 여부를 기준으로 이전 분석 결과를 다시 확인합니다." />
      <section className="filterPanel">
        <select value={filter} onChange={(event) => setFilter(event.target.value)}>
          {["전체", "분석 완료", "검토 필요", "실패", "견적요청으로 변환됨", "구매내역으로 저장됨"].map((option) => <option key={option}>{option}</option>)}
        </select>
        <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="파일명, 거래처명, 품목명 검색" />
        <button className="primaryButton compact" type="button" onClick={() => navigate("/app/analyze")}>새 분석</button>
      </section>
      <AnalysisJobTable data={data} jobs={jobs} navigate={navigate} />
    </Page>
  );
}

function AdminAnalysisPage({ data, navigate }: PageProps) {
  const completed = data.analysis_jobs.filter((job) => job.status === "completed").length;
  const needsReview = data.analysis_jobs.filter((job) => job.status === "needs_review").length;
  const failed = data.analysis_jobs.filter((job) => job.status === "failed").length;
  const requestConversions = data.analysis_conversions.filter((conversion) => conversion.converted_type === "quote_request").length;
  const purchaseConversions = data.analysis_conversions.filter((conversion) => conversion.converted_type === "purchase_record").length;
  const averageConfidence = data.analysis_jobs.length ? Math.round(data.analysis_jobs.reduce((sum, job) => sum + job.confidence_score, 0) / data.analysis_jobs.length) : 0;

  return (
    <Page>
      <PageTitle eyebrow="관리자" title="분석 요청 모니터링" desc="OCR/AI 분석 요청 상태, 실패 여부, 변환 수를 운영자 관점에서 확인합니다." />
      <div className="dashboardGrid">
        <Metric label="전체 분석" value={`${data.analysis_jobs.length}건`} icon={<SearchCheck />} />
        <Metric label="분석 완료" value={`${completed}건`} icon={<Check />} />
        <Metric label="검토 필요" value={`${needsReview}건`} icon={<BadgeCheck />} />
        <Metric label="실패" value={`${failed}건`} icon={<ShieldCheck />} />
        <Metric label="견적 변환" value={`${requestConversions}건`} icon={<ClipboardList />} />
        <Metric label="구매 변환" value={`${purchaseConversions}건`} icon={<ReceiptText />} />
        <Metric label="평균 신뢰도" value={`${averageConfidence}점`} icon={<Landmark />} />
      </div>
      <AnalysisJobTable data={data} jobs={data.analysis_jobs} navigate={navigate} admin />
    </Page>
  );
}

function AdminAnalysisDetailPage({ data, navigate, analysisId }: PageProps & { analysisId: string }) {
  const job = data.analysis_jobs.find((entry) => entry.id === analysisId);
  if (!job) return <NotFound navigate={navigate} />;
  const items = data.analysis_items.filter((entry) => entry.analysis_job_id === job.id);
  const rawResults = data.analysis_raw_results.filter((entry) => entry.analysis_job_id === job.id);
  const conversions = data.analysis_conversions.filter((entry) => entry.analysis_job_id === job.id);

  return (
    <Page>
      <BackButton onClick={() => navigate("/app/admin/analysis")} label="분석 모니터링" />
      <PageTitle eyebrow="관리자" title={job.original_file_name} desc="원본 파일 정보, raw text/json, 추출 품목, 사용자 변환 이력을 확인합니다." />
      <div className="dashboardGrid">
        <Metric label="상태" value={analysisStatusLabels[job.status]} icon={<SearchCheck />} />
        <Metric label="신뢰도" value={`${job.confidence_score}점`} icon={<BadgeCheck />} />
        <Metric label="품목" value={`${items.length}개`} icon={<ClipboardList />} />
        <Metric label="변환" value={`${conversions.length}건`} icon={<ReceiptText />} />
      </div>
      <div className="twoColumn">
        <section className="toolPanel">
          <SectionHeader title="Raw Text" />
          <pre className="rawTextPreview">{rawResults[0]?.raw_text || job.error_message || "raw text 없음"}</pre>
        </section>
        <section className="toolPanel">
          <SectionHeader title="Raw JSON" />
          <pre className="rawTextPreview">{rawResults[0]?.raw_json || "{}"}</pre>
        </section>
      </div>
      <section className="toolPanel">
        <SectionHeader title="추출 품목" />
        <div className="tableWrap">
          <table>
            <thead><tr><th>품목</th><th>규격</th><th>수량</th><th>금액</th><th>상태</th></tr></thead>
            <tbody>
              {items.map((itemEntry) => (
                <tr key={itemEntry.id}>
                  <td>{itemEntry.item_name}</td>
                  <td>{itemEntry.spec}</td>
                  <td>{itemEntry.quantity}{itemEntry.unit}</td>
                  <td>{money(itemEntry.total_price)}</td>
                  <td>{analysisItemReviewStatusLabels[itemEntry.review_status]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </Page>
  );
}

function NotificationsPage({ data, navigate, setData, userId, userRole, admin = false }: MutatingPageProps & { userId: string; userRole: UserRole; admin?: boolean }) {
  const [filter, setFilter] = useState("전체");
  const notifications = getNotificationsForUser(data, userId);
  const visibleNotifications = filterNotifications(notifications, filter);
  const unread = notifications.filter((entry) => !entry.is_read).length;
  const quoteCount = notifications.filter((entry) => notificationCategory(entry) === "견적").length;
  const dealCount = notifications.filter((entry) => notificationCategory(entry) === "거래").length;
  const highCount = notifications.filter((entry) => entry.priority === "high" || entry.priority === "urgent").length;

  function openNotification(entry: Notification) {
    const nextData = entry.is_read ? data : markNotificationAsRead(data, entry.id);
    setData(nextData);
    navigate(entry.link_url || "/app");
  }

  return (
    <Page>
      <PageTitle eyebrow={admin ? "관리자" : userRole === "supplier" ? "공급업체" : "알림"} title="알림센터" desc="견적, 거래, 분석, 장부 반영 소식을 한곳에서 확인하세요." />
      <div className="dashboardGrid">
        <Metric label="전체 알림" value={`${notifications.length}건`} icon={<Bell />} />
        <Metric label="읽지 않음" value={`${unread}건`} icon={<SearchCheck />} />
        <Metric label="견적 알림" value={`${quoteCount}건`} icon={<ClipboardList />} />
        <Metric label="거래 알림" value={`${dealCount}건`} icon={<ReceiptText />} />
        <Metric label="확인 필요" value={`${highCount}건`} icon={<ShieldCheck />} />
      </div>
      <div className="notificationToolbar">
        <FilterTabs options={["전체", "안 읽음", "견적", "거래", "분석", "장부", "문의", "시스템"]} active={filter} onChange={setFilter} />
        <div className="toolbar">
          <button className="secondaryButton compact" type="button" onClick={() => setData(markAllNotificationsAsRead(data, userId))}>모두 읽음</button>
          {!admin && <button className="ghostButton compact" type="button" onClick={() => navigate("/app/notifications/settings")}>알림 설정</button>}
        </div>
      </div>
      <div className="notificationList">
        {visibleNotifications.map((entry) => (
          <article className={entry.is_read ? "notificationCard read" : "notificationCard unread"} key={entry.id}>
            <div className="notificationCardMain" onClick={() => openNotification(entry)}>
              <div className="notificationTitleLine">
                <StatusBadge tone={priorityTone(entry.priority)}>{notificationPriorityLabels[entry.priority]}</StatusBadge>
                <span>{notificationEntityLabels[entry.related_entity_type]}</span>
                {!entry.is_read && <strong>안 읽음</strong>}
              </div>
              <h3>{entry.title}</h3>
              <p>{entry.body}</p>
              <small>{entry.created_at.slice(0, 16).replace("T", " ")} · {notificationTypeLabels[entry.type]}</small>
            </div>
            <div className="notificationActions">
              <button className="primaryButton compact" type="button" onClick={() => openNotification(entry)}>바로가기</button>
              {!entry.is_read && <button className="secondaryButton compact" type="button" onClick={() => setData(markNotificationAsRead(data, entry.id))}>읽음</button>}
              <button className="ghostButton compact" type="button" onClick={() => setData(archiveNotification(data, entry.id))}>보관</button>
            </div>
          </article>
        ))}
        {visibleNotifications.length === 0 && <EmptyState icon={<Bell />} title="표시할 알림이 없습니다." desc="새 견적, 거래 상태, 문의가 도착하면 이곳에 표시됩니다." />}
      </div>
    </Page>
  );
}

function NotificationSettingsPage({ data, setData, userId, navigate }: { data: AppData; setData: (data: AppData) => void; userId: string; navigate: Navigate }) {
  const settings = data.notification_settings.find((entry) => entry.user_id === userId) ?? {
    id: `nsetting-${userId}`,
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
    created_at: today,
    updated_at: today,
  };

  function patch(key: keyof typeof settings, value: boolean | string) {
    setData(updateNotificationSettings(data, userId, { [key]: value }));
  }

  return (
    <Page narrow>
      <BackButton onClick={() => navigate("/app/notifications")} label="알림센터" />
      <PageTitle eyebrow="설정" title="알림 설정" desc="앱 안 알림은 즉시 동작하고, 문자/카카오/이메일은 다음 단계 연동을 위한 설정만 준비합니다." />
      <section className="formStack">
        <SectionHeader title="알림 채널" />
        <div className="toggleGrid">
          <Toggle label="앱 안 알림 받기" checked={settings.in_app_enabled} onChange={(value) => patch("in_app_enabled", value)} />
          <Toggle label="이메일 알림 받기" checked={settings.email_enabled} onChange={(value) => patch("email_enabled", value)} />
          <Toggle label="문자 알림 받기" checked={settings.sms_enabled} onChange={(value) => patch("sms_enabled", value)} />
          <Toggle label="카카오 알림톡 받기" checked={settings.kakao_enabled} onChange={(value) => patch("kakao_enabled", value)} />
          <Toggle label="푸시 알림 받기" checked={settings.push_enabled} onChange={(value) => patch("push_enabled", value)} />
        </div>
        <p className="mutedText">문자, 카카오 알림톡, 이메일 알림은 다음 단계에서 연동 예정입니다.</p>
        <SectionHeader title="알림 종류" />
        <div className="toggleGrid">
          <Toggle label="견적 알림" checked={settings.quote_notifications_enabled} onChange={(value) => patch("quote_notifications_enabled", value)} />
          <Toggle label="거래 상태 알림" checked={settings.deal_notifications_enabled} onChange={(value) => patch("deal_notifications_enabled", value)} />
          <Toggle label="분석 결과 알림" checked={settings.analysis_notifications_enabled} onChange={(value) => patch("analysis_notifications_enabled", value)} />
          <Toggle label="장부/구매내역 알림" checked={settings.accounting_notifications_enabled} onChange={(value) => patch("accounting_notifications_enabled", value)} />
          <Toggle label="문의/메시지 알림" checked={settings.message_notifications_enabled} onChange={(value) => patch("message_notifications_enabled", value)} />
          <Toggle label="마케팅/이벤트 알림" checked={settings.marketing_notifications_enabled} onChange={(value) => patch("marketing_notifications_enabled", value)} />
        </div>
        <SectionHeader title="방해금지 시간" />
        <Toggle label="방해금지 사용" checked={settings.quiet_hours_enabled} onChange={(value) => patch("quiet_hours_enabled", value)} />
        <div className="formGrid">
          <label className="field">시작 시간<input type="time" value={settings.quiet_hours_start} onChange={(event) => patch("quiet_hours_start", event.target.value)} /></label>
          <label className="field">종료 시간<input type="time" value={settings.quiet_hours_end} onChange={(event) => patch("quiet_hours_end", event.target.value)} /></label>
        </div>
      </section>
    </Page>
  );
}

function RequestMessagesPage({ data, navigate, setData, requestId }: MutatingPageProps & { requestId: string }) {
  const request = data.quote_requests.find((entry) => entry.id === requestId);
  const [selectedThreadId, setSelectedThreadId] = useState("");
  if (!request) return <NotFound navigate={navigate} />;
  const requestThreads = data.message_threads.filter((entry) => entry.thread_type === "quote_request" && entry.related_entity_id === requestId);
  const selectedThread = data.message_threads.find((entry) => entry.id === (selectedThreadId || requestThreads[0]?.id));
  const availableSuppliers = data.supplier_profiles.filter((supplier) => supplier.approval_status === "approved" && supplier.categories.includes(request.category_name)).slice(0, 4);

  function startThread(supplierId: string) {
    const result = ensureRequestMessageThread(data, requestId, supplierId);
    setData(result.data);
    setSelectedThreadId(result.threadId);
  }

  return (
    <Page>
      <BackButton onClick={() => navigate(`/app/requests/${requestId}`)} label="견적요청 상세" />
      <PageTitle eyebrow="견적요청 문의" title={request.title} desc="업체에 추가 조건을 문의해보세요. 개인정보나 외부 결제 요청은 주의해주세요." />
      <section className="messageLayout">
        <aside className="threadListPanel">
          <SectionHeader title="공급업체별 문의" />
          {requestThreads.map((thread) => (
            <ThreadListButton key={thread.id} data={data} thread={thread} active={selectedThread?.id === thread.id} onClick={() => setSelectedThreadId(thread.id)} />
          ))}
          <SectionHeader title="문의 시작" />
          {availableSuppliers.map((supplier) => (
            <button className="miniRow" type="button" key={supplier.id} onClick={() => startThread(supplier.id)}>
              <span>{supplier.business_name}</span>
              <strong>문의</strong>
            </button>
          ))}
        </aside>
        {selectedThread ? (
          <MessageThreadPanel data={data} setData={setData} thread={selectedThread} currentUserId="buyer-1" currentRole="buyer" />
        ) : (
          <EmptyState icon={<Bell />} title="문의할 업체를 선택해주세요." desc="공급업체별로 문의 스레드가 분리됩니다." />
        )}
      </section>
    </Page>
  );
}

function DealMessagesPage({ data, navigate, setData, dealId }: MutatingPageProps & { dealId: string }) {
  const deal = data.deals.find((entry) => entry.id === dealId);
  if (!deal) return <NotFound navigate={navigate} />;
  const thread = data.message_threads.find((entry) => entry.thread_type === "deal" && entry.related_entity_id === dealId);

  function startThread() {
    const result = ensureDealMessageThread(data, dealId);
    setData(result.data);
  }

  return (
    <Page>
      <BackButton onClick={() => navigate(`/app/deals/${dealId}`)} label="거래 상세" />
      <PageTitle eyebrow="거래 문의" title={deal.title} desc="납품 시간, 배송 위치, 증빙자료 같은 거래 전후 내용을 안전하게 남깁니다." />
      <section className="detailBand">
        <div className="detailHeader">
          <div>
            <span className="eyebrow">{deal.category_name}</span>
            <h1>{supplierName(data, deal.supplier_id)} · {dealStatusLabels[deal.status]}</h1>
            <p>{deal.delivery_address} · {money(deal.final_amount)}</p>
          </div>
          <StatusBadge tone={deal.status === "disputed" ? "orange" : deal.status === "completed" ? "green" : "blue"}>{dealStatusLabels[deal.status]}</StatusBadge>
        </div>
      </section>
      {thread ? (
        <MessageThreadPanel data={data} setData={setData} thread={thread} currentUserId="buyer-1" currentRole="buyer" />
      ) : (
        <EmptyState icon={<ReceiptText />} title="아직 거래 문의가 없습니다." desc="거래 조율이 필요하면 문의 스레드를 시작하세요." />
      )}
      {!thread && <button className="primaryButton full" type="button" onClick={startThread}>거래 문의 시작</button>}
    </Page>
  );
}

function MessageThreadPanel({ data, setData, thread, currentUserId, currentRole }: { data: AppData; setData: (data: AppData) => void; thread: MessageThread; currentUserId: string; currentRole: Message["sender_role"] }) {
  const [body, setBody] = useState("");
  const [attachmentName, setAttachmentName] = useState("");
  const [reportTargetId, setReportTargetId] = useState("");
  const [reportReason, setReportReason] = useState("외부 결제 유도");
  const [reportDetail, setReportDetail] = useState("");
  const messages = data.messages.filter((entry) => entry.thread_id === thread.id).sort((a, b) => a.created_at.localeCompare(b.created_at));

  useEffect(() => {
    const readState = data.message_read_states.find((entry) => entry.thread_id === thread.id && entry.user_id === currentUserId);
    if (readState && readState.unread_count > 0) {
      setData(markThreadAsRead(data, thread.id, currentUserId));
    }
  }, [currentUserId, data, setData, thread.id]);

  function submitMessage(event: FormEvent) {
    event.preventDefault();
    setData(sendThreadMessage(data, thread.id, currentUserId, currentRole, body, attachmentName));
    setBody("");
    setAttachmentName("");
  }

  function submitReport() {
    setData(reportMessage(data, thread.id, reportTargetId, currentUserId, reportReason, reportDetail));
    setReportTargetId("");
    setReportDetail("");
  }

  return (
    <section className="messagePanel">
      <div className="messagePanelHeader">
        <div>
          <span className="eyebrow">{messageThreadTypeLabels[thread.thread_type]}</span>
          <h2>{thread.title}</h2>
          <p>{messageThreadStatusLabels[thread.status]}</p>
        </div>
        <StatusBadge tone={thread.status === "reported" ? "orange" : thread.status === "closed" ? "gray" : "green"}>{messageThreadStatusLabels[thread.status]}</StatusBadge>
      </div>
      <div className="messageList">
        {messages.map((entry) => (
          <article className={entry.sender_role === "system" ? "messageBubble system" : entry.sender_id === currentUserId ? "messageBubble mine" : "messageBubble theirs"} key={entry.id}>
            <strong>{messageSenderLabel(data, entry)}</strong>
            <p>{entry.body}</p>
            {entry.attachment_name && <small>첨부: {entry.attachment_name}</small>}
            <div className="messageMeta">
              <span>{entry.created_at.slice(0, 16).replace("T", " ")}</span>
              {entry.sender_role !== "system" && entry.sender_id !== currentUserId && <button type="button" onClick={() => setReportTargetId(entry.id)}>신고</button>}
            </div>
          </article>
        ))}
      </div>
      <form className="messageComposer" onSubmit={submitMessage}>
        <input value={body} onChange={(event) => setBody(event.target.value)} placeholder="문의 내용을 입력하세요." />
        <input value={attachmentName} onChange={(event) => setAttachmentName(event.target.value)} placeholder="첨부파일명 mock" />
        <button className="primaryButton compact" type="submit">전송</button>
      </form>
      {reportTargetId && (
        <div className="reportBox">
          <SectionHeader title="메시지 신고" />
          <select value={reportReason} onChange={(event) => setReportReason(event.target.value)}>
            {["부적절한 메시지", "외부 결제 유도", "허위 견적", "욕설/비방", "거래 조건 위반", "개인정보 요구", "기타"].map((reason) => <option key={reason}>{reason}</option>)}
          </select>
          <textarea value={reportDetail} onChange={(event) => setReportDetail(event.target.value)} placeholder="상세 내용을 입력하세요." />
          <div className="toolbar">
            <button className="primaryButton compact" type="button" onClick={submitReport}>신고 접수</button>
            <button className="ghostButton compact" type="button" onClick={() => setReportTargetId("")}>취소</button>
          </div>
        </div>
      )}
    </section>
  );
}

function AdminMessagesPage({ data, navigate }: PageProps) {
  const [filter, setFilter] = useState("전체");
  const threads = data.message_threads.filter((thread) => {
    if (filter === "견적요청 문의") return thread.thread_type === "quote_request";
    if (filter === "거래 문의") return thread.thread_type === "deal";
    if (filter === "신고됨") return thread.status === "reported";
    if (filter === "종료됨") return thread.status === "closed";
    if (filter === "관리자 확인 필요") return data.message_reports.some((report) => report.thread_id === thread.id && report.status === "pending");
    return true;
  });

  return (
    <Page>
      <PageTitle eyebrow="관리자" title="문의/분쟁 메시지 모니터링" desc="견적요청과 거래 문의, 신고된 메시지를 운영자가 확인합니다." />
      <FilterTabs options={["전체", "견적요청 문의", "거래 문의", "신고됨", "종료됨", "관리자 확인 필요"]} active={filter} onChange={setFilter} />
      <div className="tableWrap">
        <table>
          <thead><tr><th>스레드</th><th>유형</th><th>구매자</th><th>공급업체</th><th>상태</th><th>미읽음</th><th>마지막 메시지</th></tr></thead>
          <tbody>
            {threads.map((thread) => (
              <tr key={thread.id} onClick={() => navigate(`/app/admin/messages/${thread.id}`)}>
                <td>{thread.title}</td>
                <td>{messageThreadTypeLabels[thread.thread_type]}</td>
                <td>{buyerNameForUi(data, thread.buyer_id)}</td>
                <td>{supplierName(data, thread.supplier_id)}</td>
                <td><StatusBadge tone={thread.status === "reported" ? "orange" : thread.status === "closed" ? "gray" : "green"}>{messageThreadStatusLabels[thread.status]}</StatusBadge></td>
                <td>{data.message_read_states.filter((entry) => entry.thread_id === thread.id).reduce((sum, entry) => sum + entry.unread_count, 0)}건</td>
                <td>{thread.last_message_at.slice(0, 16).replace("T", " ")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Page>
  );
}

function AdminMessageDetailPage({ data, navigate, setData, threadId }: MutatingPageProps & { threadId: string }) {
  const thread = data.message_threads.find((entry) => entry.id === threadId);
  if (!thread) return <NotFound navigate={navigate} />;
  const reports = data.message_reports.filter((entry) => entry.thread_id === thread.id);

  return (
    <Page>
      <BackButton onClick={() => navigate("/app/admin/messages")} label="메시지 모니터링" />
      <PageTitle eyebrow="관리자" title={thread.title} desc="참여자, 전체 메시지, 신고 내역과 처리 상태를 확인합니다." />
      <div className="dashboardGrid">
        <Metric label="메시지" value={`${data.messages.filter((entry) => entry.thread_id === thread.id).length}개`} icon={<Bell />} />
        <Metric label="신고" value={`${reports.length}건`} icon={<ShieldCheck />} />
        <Metric label="상태" value={messageThreadStatusLabels[thread.status]} icon={<ReceiptText />} />
        <Metric label="유형" value={messageThreadTypeLabels[thread.thread_type]} icon={<ClipboardList />} />
      </div>
      <MessageThreadPanel data={data} setData={setData} thread={thread} currentUserId="admin-1" currentRole="admin" />
      <section className="toolPanel">
        <SectionHeader title="신고 내역" />
        <div className="reportList">
          {reports.map((report) => (
            <article className="reportCard" key={report.id}>
              <strong>{report.reason}</strong>
              <p>{report.detail || "상세 내용 없음"}</p>
              <span>{report.status}</span>
              <div className="toolbar">
                {(["reviewed", "resolved", "dismissed"] as MessageReportStatus[]).map((status) => (
                  <button className="secondaryButton compact" type="button" key={status} onClick={() => setData(updateMessageReportStatus(data, report.id, status))}>{status}</button>
                ))}
              </div>
            </article>
          ))}
          {reports.length === 0 && <p className="mutedText">신고 내역이 없습니다.</p>}
        </div>
        <button className="ghostButton compact" type="button" onClick={() => setData(closeMessageThread(data, thread.id))}>스레드 종료</button>
      </section>
    </Page>
  );
}

function PurchasesPage({ data, navigate }: PageProps) {
  const [filter, setFilter] = useState("전체");
  const records = data.purchase_records.filter((record) => record.buyer_id === "buyer-1");
  const visibleRecords = filterPurchaseRecords(records, filter);
  const summary = calculatePurchaseSummary(records);

  return (
    <Page>
      <PageTitle eyebrow="구매자" title="구매내역 자동정리" desc="완료된 거래와 직접 등록한 매입을 장부 반영 상태 기준으로 확인합니다." />
      <div className="dashboardGrid">
        <Metric label="구매액" value={money(summary.totalAmount)} icon={<ReceiptText />} />
        <Metric label="장부 대기" value={`${summary.pendingCount}건`} icon={<Landmark />} />
        <Metric label="증빙 누락" value={`${summary.missingDocumentCount}건`} icon={<Upload />} />
        <Metric label="예상 절감" value={money(summary.savingsAmount)} icon={<BadgeCheck />} />
      </div>
      <div className="purchaseToolbar">
        <FilterTabs options={["전체", "이번 달", "장부 반영 대기", "반영 완료", "세금계산서 대기", "증빙자료 누락", "제외/보류"]} active={filter} onChange={setFilter} />
        <button className="primaryButton compact" type="button" onClick={() => navigate("/app/purchases/new")}>
          <Plus size={16} />
          수동 등록
        </button>
      </div>
      <PurchaseList data={data} records={visibleRecords} navigate={navigate} />
    </Page>
  );
}

function PurchaseDetailPage({ data, navigate, setData, purchaseId }: MutatingPageProps & { purchaseId: string }) {
  const record = data.purchase_records.find((entry) => entry.id === purchaseId);
  if (!record) return <NotFound navigate={navigate} />;
  const currentRecord = record;

  const items = data.purchase_record_items.filter((entry) => entry.purchase_record_id === currentRecord.id);
  const documents = data.purchase_documents.filter((entry) => entry.purchase_record_id === currentRecord.id);
  const accountingEntry = data.accounting_entries.find((entry) => entry.purchase_record_id === currentRecord.id);
  const deal = currentRecord.deal_id ? data.deals.find((entry) => entry.id === currentRecord.deal_id) : null;
  const request = currentRecord.quote_request_id ? data.quote_requests.find((entry) => entry.id === currentRecord.quote_request_id) : null;
  const [accountingCategory, setAccountingCategory] = useState(currentRecord.accounting_category);
  const [userMemo, setUserMemo] = useState(currentRecord.user_memo ?? currentRecord.memo);
  const [documentType, setDocumentType] = useState<PurchaseDocumentType>("receipt");
  const [fileName, setFileName] = useState("");

  function saveRecordPatch() {
    setData(updatePurchaseRecord(data, currentRecord.id, { accounting_category: accountingCategory, user_memo: userMemo }));
  }

  function changeAccountingStatus(status: AccountingStatus, memo: string) {
    setData(updatePurchaseAccountingStatus(data, currentRecord.id, status, memo));
  }

  function submitDocument() {
    setData(addPurchaseDocument(data, currentRecord.id, documentType, fileName, "buyer"));
    setFileName("");
  }

  return (
    <Page>
      <BackButton onClick={() => navigate("/app/purchases")} label="구매내역" />
      <section className="detailBand">
        <div className="detailHeader">
          <div>
            <span className="eyebrow">{record.category_name}</span>
            <h1>{record.purchase_title}</h1>
            <p>{record.supplier_name} · {record.purchase_date} · {money(record.total_amount)}</p>
          </div>
          <StatusBadge tone={purchaseStatusTone(record.accounting_status)}>{accountingStatusLabels[record.accounting_status]}</StatusBadge>
        </div>
        <div className="priceSummary">
          <Metric label="공급가액" value={money(record.supply_amount)} icon={<ReceiptText />} />
          <Metric label="부가세" value={money(record.vat_amount)} icon={<Landmark />} />
          <Metric label="총 매입" value={money(record.total_amount)} icon={<PackageCheck />} />
        </div>
        <div className="detailMeta">
          <span>결제: {paymentMethodLabels[record.payment_method]}</span>
          <span>세금계산서: {taxInvoiceStatusLabels[record.tax_invoice_status]}</span>
          <span>영수증: {receiptStatusLabels[record.receipt_status]}</span>
          <span>납품서: {deliveryNoteStatusLabels[record.delivery_note_status]}</span>
          <span>동기화 대상: 오늘장사</span>
        </div>
      </section>

      <section className="purchaseDetailGrid">
        <div className="toolPanel">
          <SectionHeader title="장부 분류" />
          <label className="field">
            장부 계정
            <select value={accountingCategory} onChange={(event) => setAccountingCategory(event.target.value)}>
              {accountingCategoryOptions(data).map((option) => <option key={option}>{option}</option>)}
            </select>
          </label>
          <label className="field">
            메모
            <textarea value={userMemo} onChange={(event) => setUserMemo(event.target.value)} />
          </label>
          <button className="secondaryButton full" type="button" onClick={saveRecordPatch}>분류/메모 저장</button>
        </div>

        <div className="toolPanel">
          <SectionHeader title="오늘장사 장부 반영" />
          <div className="ledgerState">
            <strong>{accountingStatusLabels[record.accounting_status]}</strong>
            <span>{accountingEntry ? `${accountingEntry.accounting_category} · ${money(accountingEntry.amount)}` : "전표 생성 대기"}</span>
          </div>
          <div className="accountingActions">
            <button className="primaryButton compact" type="button" onClick={() => changeAccountingStatus("synced", "구매상세에서 오늘장사 장부 반영")}>오늘장사 장부에 반영</button>
            <button className="secondaryButton compact" type="button" onClick={() => changeAccountingStatus("pending", "장부 반영 대기로 되돌림")}>대기로 변경</button>
            <button className="ghostButton compact" type="button" onClick={() => changeAccountingStatus("hold", "증빙 확인 보류")}>보류</button>
            <button className="ghostButton compact" type="button" onClick={() => changeAccountingStatus("excluded", "장부 반영 제외")}>제외</button>
          </div>
        </div>
      </section>

      <section className="twoColumn">
        <div className="toolPanel">
          <SectionHeader title="구매 품목" />
          <div className="itemsList purchaseItems">
            {items.map((itemEntry) => (
              <div className="itemPill" key={itemEntry.id}>
                <strong>{itemEntry.item_name}</strong>
                <span>{itemEntry.spec || `${itemEntry.quantity}${itemEntry.unit}`}</span>
                <small>{money(itemEntry.total_price)}</small>
              </div>
            ))}
          </div>
        </div>
        <div className="toolPanel">
          <SectionHeader title="연결 원본" />
          <div className="originLinks">
            {deal && <button className="secondaryButton compact" type="button" onClick={() => navigate(`/app/deals/${deal.id}`)}>거래 상세</button>}
            {request && <button className="secondaryButton compact" type="button" onClick={() => navigate(`/app/requests/${request.id}`)}>견적요청</button>}
            <button className="secondaryButton compact" type="button" onClick={() => navigate(`/app/suppliers/${record.supplier_id}`)}>공급업체</button>
          </div>
          <p className="mutedText">{record.memo}</p>
        </div>
      </section>

      <section className="toolPanel">
        <SectionHeader title="증빙자료" />
        <div className="attachmentForm">
          <select value={documentType} onChange={(event) => setDocumentType(event.target.value as PurchaseDocumentType)}>
            {Object.entries(purchaseDocumentTypeLabels).map(([value, label]) => <option value={value} key={value}>{label}</option>)}
          </select>
          <input value={fileName} onChange={(event) => setFileName(event.target.value)} placeholder="파일명 예: 영수증.jpg" />
          <button className="primaryButton compact" type="button" onClick={submitDocument}>추가</button>
        </div>
        <div className="documentList">
          {documents.map((document) => (
            <article className="documentRow" key={document.id}>
              <strong>{document.file_name}</strong>
              <span>{purchaseDocumentTypeLabels[document.document_type]} · {purchaseDocumentStatusLabels[document.status]} · {uploadedByLabel(document.uploaded_by === "system" ? "admin" : document.uploaded_by)}</span>
              <small>{document.created_at.slice(0, 10)}</small>
            </article>
          ))}
          {documents.length === 0 && <p className="mutedText">아직 등록된 증빙자료가 없습니다.</p>}
        </div>
      </section>
    </Page>
  );
}

function NewPurchasePage({ data, navigate, setData }: MutatingPageProps) {
  const [draft, setDraft] = useState<ManualPurchaseDraft>({
    purchase_title: "수동 구매내역",
    supplier_name: "현장 직접구매",
    supplier_business_number: "000-00-00000",
    purchase_date: today,
    category_name: "기타",
    accounting_category: "자재구매",
    sub_category: "",
    total_amount: 120000,
    supply_amount: 0,
    vat_amount: 0,
    delivery_fee: 0,
    discount_amount: 0,
    payment_method: "card",
    tax_invoice_status: "none",
    receipt_status: "uploaded",
    delivery_note_status: "none",
    memo: "수동 등록",
    items: [{ item_name: "수동 구매 품목", spec: "", quantity: 1, unit: "건", unit_price: 120000, total_price: 120000, memo: "" }],
  });

  function updateDraft<K extends keyof ManualPurchaseDraft>(key: K, value: ManualPurchaseDraft[K]) {
    setDraft((current) => ({ ...current, [key]: value }));
  }

  function updateManualItem(key: keyof ManualPurchaseDraft["items"][number], value: string | number) {
    setDraft((current) => ({
      ...current,
      items: current.items.map((itemEntry, index) => (index === 0 ? { ...itemEntry, [key]: value } : itemEntry)),
    }));
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    const result = createManualPurchaseRecord(data, {
      ...draft,
      accounting_category: draft.accounting_category || getAccountingCategory(draft.category_name),
    });
    setData(result.data);
    navigate(`/app/purchases/${result.purchaseId}`);
  }

  return (
    <Page narrow>
      <BackButton onClick={() => navigate("/app/purchases")} label="구매내역" />
      <PageTitle eyebrow="구매자" title="구매내역 수동 등록" desc="싸와 거래 밖에서 구매한 영수증도 오늘장사 장부 반영 대기 자료로 등록합니다." />
      <form className="formStack" onSubmit={submit}>
        <label className="field">
          구매 제목
          <input value={draft.purchase_title} onChange={(event) => updateDraft("purchase_title", event.target.value)} />
        </label>
        <div className="formGrid">
          <label className="field">
            거래처명
            <input value={draft.supplier_name} onChange={(event) => updateDraft("supplier_name", event.target.value)} />
          </label>
          <label className="field">
            사업자번호
            <input value={draft.supplier_business_number} onChange={(event) => updateDraft("supplier_business_number", event.target.value)} />
          </label>
        </div>
        <div className="formGrid">
          <label className="field">
            구매일
            <input type="date" value={draft.purchase_date} onChange={(event) => updateDraft("purchase_date", event.target.value)} />
          </label>
          <label className="field">
            카테고리
            <select value={draft.category_name} onChange={(event) => updateDraft("category_name", event.target.value)}>
              {data.categories.map((category) => <option key={category.id}>{category.name}</option>)}
            </select>
          </label>
        </div>
        <div className="formGrid">
          <label className="field">
            장부 계정
            <select value={draft.accounting_category} onChange={(event) => updateDraft("accounting_category", event.target.value)}>
              {accountingCategoryOptions(data).map((option) => <option key={option}>{option}</option>)}
            </select>
          </label>
          <label className="field">
            총 금액
            <input type="number" value={draft.total_amount} onChange={(event) => updateDraft("total_amount", Number(event.target.value))} />
          </label>
        </div>
        <div className="formGrid">
          <label className="field">
            결제 방식
            <select value={draft.payment_method} onChange={(event) => updateDraft("payment_method", event.target.value as PaymentMethod)}>
              {Object.entries(paymentMethodLabels).map(([value, label]) => <option value={value} key={value}>{label}</option>)}
            </select>
          </label>
          <label className="field">
            세금계산서
            <select value={draft.tax_invoice_status} onChange={(event) => updateDraft("tax_invoice_status", event.target.value as TaxInvoiceStatus)}>
              {Object.entries(taxInvoiceStatusLabels).map(([value, label]) => <option value={value} key={value}>{label}</option>)}
            </select>
          </label>
        </div>
        <div className="formGrid">
          <label className="field">
            영수증
            <select value={draft.receipt_status} onChange={(event) => updateDraft("receipt_status", event.target.value as ReceiptStatus)}>
              {Object.entries(receiptStatusLabels).map(([value, label]) => <option value={value} key={value}>{label}</option>)}
            </select>
          </label>
          <label className="field">
            납품서
            <select value={draft.delivery_note_status} onChange={(event) => updateDraft("delivery_note_status", event.target.value as DeliveryNoteStatus)}>
              {Object.entries(deliveryNoteStatusLabels).map(([value, label]) => <option value={value} key={value}>{label}</option>)}
            </select>
          </label>
        </div>
        <section className="manualItemBox">
          <SectionHeader title="품목 1개" />
          <div className="formGrid">
            <label className="field">
              품목명
              <input value={draft.items[0]?.item_name ?? ""} onChange={(event) => updateManualItem("item_name", event.target.value)} />
            </label>
            <label className="field">
              금액
              <input type="number" value={draft.items[0]?.total_price ?? 0} onChange={(event) => updateManualItem("total_price", Number(event.target.value))} />
            </label>
          </div>
        </section>
        <label className="field">
          메모
          <textarea value={draft.memo} onChange={(event) => updateDraft("memo", event.target.value)} />
        </label>
        <button className="primaryButton full" type="submit">구매내역 등록</button>
      </form>
    </Page>
  );
}

function AccountingDashboardPage({ data, navigate, setData }: MutatingPageProps) {
  const records = data.purchase_records.filter((record) => record.buyer_id === "buyer-1");
  const pending = records.filter((record) => record.accounting_status === "pending");
  const summary = calculatePurchaseSummary(records);
  const categoryGroups = groupPurchasesByCategory(records);

  function syncPendingTop() {
    let nextData = data;
    pending.slice(0, 3).forEach((record) => {
      nextData = updatePurchaseAccountingStatus(nextData, record.id, "synced", "장부 대시보드 빠른 반영");
    });
    setData(nextData);
  }

  return (
    <Page>
      <PageTitle eyebrow="오늘장사 연동 mock" title="장부 반영 대시보드" desc="구매내역을 매입비 전표로 정리하고 오늘장사 장부 반영 상태를 관리합니다." />
      <BetaLimitationsNotice navigate={navigate} context="accounting" />
      <div className="dashboardGrid">
        <Metric label="이번 달 매입" value={money(summary.totalAmount)} icon={<ReceiptText />} />
        <Metric label="반영 대기" value={`${summary.pendingCount}건`} icon={<Landmark />} />
        <Metric label="반영 완료" value={`${summary.syncedCount}건`} icon={<Check />} />
        <Metric label="부가세" value={money(summary.vatAmount)} icon={<BadgeCheck />} />
      </div>
      <section className="ledgerPanel">
        <div>
          <h2>오늘장사 장부 반영 대기</h2>
          <p className="mutedText">실제 API 없이 mock 상태만 변경합니다.</p>
        </div>
        <div className="toolbar">
          <button className="secondaryButton" type="button" onClick={() => navigate("/app/accounting/pending")}>대기 목록</button>
          <button className="primaryButton" type="button" onClick={syncPendingTop} disabled={pending.length === 0}>상위 3건 반영</button>
        </div>
      </section>
      <div className="twoColumn">
        <CategorySpendBars title="계정별 매입비" groups={categoryGroups} total={summary.totalAmount} />
        <PurchaseMiniList title="최근 장부 대기" records={pending.slice(0, 5)} navigate={navigate} />
      </div>
      <section className="quickGrid">
        <ActionTile title="구매내역" desc="원본 구매 자료를 확인합니다." icon={<ReceiptText />} onClick={() => navigate("/app/purchases")} />
        <ActionTile title="매입비 리포트" desc="월별/계정별 매입비를 봅니다." icon={<CalendarDays />} onClick={() => navigate("/app/reports/purchases")} />
        <ActionTile title="절감 리포트" desc="이전 구매 대비 절감 효과를 봅니다." icon={<BadgeCheck />} onClick={() => navigate("/app/reports/savings")} />
        <ActionTile title="수동 등록" desc="외부 영수증을 추가합니다." icon={<Plus />} onClick={() => navigate("/app/purchases/new")} />
      </section>
    </Page>
  );
}

function AccountingPendingPage({ data, navigate, setData }: MutatingPageProps) {
  const records = data.purchase_records.filter((record) => record.accounting_status === "pending" || record.accounting_status === "failed" || record.accounting_status === "hold");

  function changeStatus(record: PurchaseRecord, status: AccountingStatus) {
    setData(updatePurchaseAccountingStatus(data, record.id, status, `대기 목록에서 ${accountingStatusLabels[status]} 처리`));
  }

  return (
    <Page>
      <BackButton onClick={() => navigate("/app/accounting")} label="장부 대시보드" />
      <PageTitle eyebrow="오늘장사 연동 mock" title="장부 반영 대기" desc="증빙과 계정 분류를 확인한 뒤 오늘장사 장부 반영 상태로 전환합니다." />
      <div className="purchaseList">
        {records.map((record) => (
          <article className="purchaseCard" key={record.id}>
            <div>
              <span className="eyebrow">{record.accounting_category}</span>
              <h3>{record.purchase_title}</h3>
              <p>{record.supplier_name} · {record.purchase_date}</p>
            </div>
            <strong>{money(record.total_amount)}</strong>
            <div className="purchaseStatusLine">
              <StatusBadge tone={purchaseStatusTone(record.accounting_status)}>{accountingStatusLabels[record.accounting_status]}</StatusBadge>
              <span>세금계산서 {taxInvoiceStatusLabels[record.tax_invoice_status]}</span>
              <span>영수증 {receiptStatusLabels[record.receipt_status]}</span>
            </div>
            <div className="toolbar">
              <button className="primaryButton compact" type="button" onClick={() => changeStatus(record, "synced")}>장부 반영</button>
              <button className="secondaryButton compact" type="button" onClick={() => navigate(`/app/purchases/${record.id}`)}>상세</button>
              <button className="ghostButton compact" type="button" onClick={() => changeStatus(record, "hold")}>보류</button>
              <button className="ghostButton compact" type="button" onClick={() => changeStatus(record, "excluded")}>제외</button>
            </div>
          </article>
        ))}
      </div>
      {records.length === 0 && <EmptyState icon={<Check />} title="장부 반영 대기 건이 없습니다." desc="구매내역이 완료되거나 수동 등록되면 이곳에 표시됩니다." />}
    </Page>
  );
}

function PurchaseReportPage({ data, navigate }: PageProps) {
  const records = data.purchase_records.filter((record) => record.buyer_id === "buyer-1");
  const monthRecords = records.filter((record) => record.purchase_date.startsWith("2026-07"));
  const summary = calculatePurchaseSummary(monthRecords);
  const categoryGroups = groupPurchasesByCategory(monthRecords);
  const supplierGroups = groupPurchasesBySupplier(monthRecords);

  return (
    <Page>
      <BackButton onClick={() => navigate("/app/accounting")} label="장부 대시보드" />
      <PageTitle eyebrow="리포트" title="월간 매입비 리포트" desc="2026년 7월 기준 매입금액, 부가세, 계정별 비중을 계산합니다." />
      <div className="dashboardGrid">
        <Metric label="매입 건수" value={`${summary.count}건`} icon={<ClipboardList />} />
        <Metric label="총 매입" value={money(summary.totalAmount)} icon={<ReceiptText />} />
        <Metric label="공급가액" value={money(summary.supplyAmount)} icon={<PackageCheck />} />
        <Metric label="부가세" value={money(summary.vatAmount)} icon={<Landmark />} />
      </div>
      <div className="twoColumn">
        <CategorySpendBars title="계정별 매입" groups={categoryGroups} total={summary.totalAmount} />
        <CategorySpendBars title="거래처별 매입" groups={supplierGroups} total={summary.totalAmount} />
      </div>
      <PurchaseList data={data} records={monthRecords} navigate={navigate} />
    </Page>
  );
}

function SavingsReportPage({ data, navigate }: PageProps) {
  const records = data.purchase_records.filter((record) => record.buyer_id === "buyer-1");
  const savingsSummary = calculateEstimatedSavingsSummary(records);
  const savedRecords = records.filter((record) => record.estimated_savings_amount > 0).sort((a, b) => b.estimated_savings_amount - a.estimated_savings_amount);

  return (
    <Page>
      <BackButton onClick={() => navigate("/app/accounting")} label="장부 대시보드" />
      <PageTitle eyebrow="리포트" title="구매 절감 리포트" desc="이전 구매금액 대비 견적 비교로 절감된 예상 금액을 보여줍니다." />
      <div className="dashboardGrid">
        <Metric label="비교 기준 구매액" value={money(savingsSummary.totalPrevious)} icon={<ReceiptText />} />
        <Metric label="예상 절감액" value={money(savingsSummary.totalSavings)} icon={<BadgeCheck />} />
        <Metric label="평균 절감률" value={`${savingsSummary.averageRate}%`} icon={<Check />} />
        <Metric label="절감 발생 건" value={`${savingsSummary.recordCount}건`} icon={<ClipboardList />} />
      </div>
      <div className="purchaseList">
        {savedRecords.map((record) => (
          <article className="purchaseCard savingsCard" key={record.id}>
            <div>
              <span className="eyebrow">{record.accounting_category}</span>
              <h3>{record.purchase_title}</h3>
              <p>{record.supplier_name} · 이전 {money(record.previous_purchase_amount ?? 0)} → 현재 {money(record.total_amount)}</p>
            </div>
            <strong>{money(record.estimated_savings_amount)}</strong>
            <div className="purchaseStatusLine">
              <StatusBadge tone="green">{record.estimated_savings_rate}% 절감</StatusBadge>
              <span>{record.purchase_date}</span>
            </div>
            <button className="secondaryButton compact" type="button" onClick={() => navigate(`/app/purchases/${record.id}`)}>상세 보기</button>
          </article>
        ))}
      </div>
    </Page>
  );
}

function AdminPurchasesPage({ data, navigate, setData }: MutatingPageProps) {
  const [filter, setFilter] = useState("전체");
  const records = filterPurchaseRecords(data.purchase_records, filter);
  const summary = calculatePurchaseSummary(data.purchase_records);

  return (
    <Page>
      <PageTitle eyebrow="관리자" title="구매내역 모니터링" desc="구매자별 매입 자료와 증빙 상태, 장부 반영 상태를 운영자가 확인합니다." />
      <div className="dashboardGrid">
        <Metric label="전체 구매" value={`${summary.count}건`} icon={<ClipboardList />} />
        <Metric label="총 매입" value={money(summary.totalAmount)} icon={<ReceiptText />} />
        <Metric label="대기" value={`${summary.pendingCount}건`} icon={<Landmark />} />
        <Metric label="증빙 누락" value={`${summary.missingDocumentCount}건`} icon={<Upload />} />
      </div>
      <FilterTabs options={["전체", "이번 달", "장부 반영 대기", "반영 완료", "세금계산서 대기", "증빙자료 누락", "제외/보류"]} active={filter} onChange={setFilter} />
      <AdminPurchaseTable data={data} records={records} navigate={navigate} setData={setData} />
    </Page>
  );
}

function AdminAccountingPage({ data, navigate, setData }: MutatingPageProps) {
  const entries = data.accounting_entries;
  const failed = entries.filter((entry) => entry.sync_status === "failed").length;
  const pending = entries.filter((entry) => entry.sync_status === "pending").length;
  const synced = entries.filter((entry) => entry.sync_status === "synced").length;

  return (
    <Page>
      <PageTitle eyebrow="관리자" title="오늘장사 장부 연동 관리" desc="전표 생성 상태와 mock 동기화 결과를 전체 관점에서 확인합니다." />
      <div className="dashboardGrid">
        <Metric label="전표" value={`${entries.length}건`} icon={<ReceiptText />} />
        <Metric label="대기" value={`${pending}건`} icon={<Landmark />} />
        <Metric label="완료" value={`${synced}건`} icon={<Check />} />
        <Metric label="실패" value={`${failed}건`} icon={<ShieldCheck />} />
      </div>
      <div className="tableWrap">
        <table>
          <thead>
            <tr>
              <th>구매내역</th>
              <th>구매자</th>
              <th>계정</th>
              <th>금액</th>
              <th>상태</th>
              <th>작업</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => {
              const record = data.purchase_records.find((purchase) => purchase.id === entry.purchase_record_id);
              const buyer = data.profiles.find((profile) => profile.id === entry.buyer_id);
              return (
                <tr key={entry.id} onClick={() => record && navigate(`/app/purchases/${record.id}`)}>
                  <td>{record?.purchase_title ?? entry.purchase_record_id}</td>
                  <td>{buyer?.business_name ?? entry.buyer_id}</td>
                  <td>{entry.accounting_category}</td>
                  <td>{money(entry.amount)}</td>
                  <td><StatusBadge tone={entry.sync_status === "synced" ? "green" : entry.sync_status === "failed" ? "orange" : entry.sync_status === "excluded" ? "gray" : "blue"}>{entry.sync_status}</StatusBadge></td>
                  <td>
                    {record && (
                      <button className="primaryButton compact" type="button" onClick={(event) => { event.stopPropagation(); setData(updatePurchaseAccountingStatus(data, record.id, "synced", "관리자 전표 반영")); }}>
                        반영
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Page>
  );
}

function PurchaseList({ data, records, navigate }: { data: AppData; records: PurchaseRecord[]; navigate: Navigate }) {
  if (!records.length) {
    return <EmptyState icon={<ReceiptText />} title="구매내역이 없습니다." desc="거래 완료 또는 수동 등록 후 구매내역이 표시됩니다." />;
  }

  return (
    <div className="purchaseList">
      {records.map((record) => {
        const buyer = data.profiles.find((profile) => profile.id === record.buyer_id);
        return (
          <article className="purchaseCard" key={record.id} onClick={() => navigate(`/app/purchases/${record.id}`)}>
            <div>
              <span className="eyebrow">{record.accounting_category}</span>
              <h3>{record.purchase_title}</h3>
              <p>{record.supplier_name} · {buyer?.business_name ?? "구매자"} · {record.purchase_date}</p>
            </div>
            <strong>{money(record.total_amount)}</strong>
            <div className="purchaseStatusLine">
              <StatusBadge tone={purchaseStatusTone(record.accounting_status)}>{accountingStatusLabels[record.accounting_status]}</StatusBadge>
              <span>세금계산서 {taxInvoiceStatusLabels[record.tax_invoice_status]}</span>
              <span>영수증 {receiptStatusLabels[record.receipt_status]}</span>
              <span>납품서 {deliveryNoteStatusLabels[record.delivery_note_status]}</span>
            </div>
          </article>
        );
      })}
    </div>
  );
}

function PurchaseMiniList({ title, records, navigate }: { title: string; records: PurchaseRecord[]; navigate: Navigate }) {
  return (
    <section className="toolPanel">
      <SectionHeader title={title} />
      <div className="miniList">
        {records.map((record) => (
          <button className="miniRow" type="button" key={record.id} onClick={() => navigate(`/app/purchases/${record.id}`)}>
            <span>{record.purchase_title}</span>
            <strong>{money(record.total_amount)}</strong>
          </button>
        ))}
        {records.length === 0 && <p className="mutedText">대기 건이 없습니다.</p>}
      </div>
    </section>
  );
}

function CategorySpendBars({ title, groups, total }: { title: string; groups: Array<{ label: string; count: number; totalAmount: number; savingsAmount: number }>; total: number }) {
  return (
    <section className="toolPanel">
      <SectionHeader title={title} />
      <div className="barList">
        {groups.map((group) => {
          const percent = total > 0 ? Math.round((group.totalAmount / total) * 100) : 0;
          return (
            <div className="barRow" key={group.label}>
              <div>
                <strong>{group.label}</strong>
                <span>{group.count}건 · {money(group.totalAmount)}</span>
              </div>
              <div className="barTrack" aria-hidden="true">
                <span style={{ width: `${Math.max(4, percent)}%` }} />
              </div>
              <em>{percent}%</em>
            </div>
          );
        })}
        {groups.length === 0 && <p className="mutedText">계산할 구매내역이 없습니다.</p>}
      </div>
    </section>
  );
}

function AdminPurchaseTable({ data, records, navigate, setData }: { data: AppData; records: PurchaseRecord[]; navigate: Navigate; setData: (data: AppData) => void }) {
  return (
    <div className="tableWrap">
      <table>
        <thead>
          <tr>
            <th>구매내역</th>
            <th>구매자</th>
            <th>거래처</th>
            <th>금액</th>
            <th>증빙</th>
            <th>장부</th>
            <th>작업</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => {
            const buyer = data.profiles.find((profile) => profile.id === record.buyer_id);
            return (
              <tr key={record.id} onClick={() => navigate(`/app/purchases/${record.id}`)}>
                <td>{record.purchase_title}</td>
                <td>{buyer?.business_name ?? record.buyer_id}</td>
                <td>{record.supplier_name}</td>
                <td>{money(record.total_amount)}</td>
                <td>{taxInvoiceStatusLabels[record.tax_invoice_status]} / {receiptStatusLabels[record.receipt_status]}</td>
                <td><StatusBadge tone={purchaseStatusTone(record.accounting_status)}>{accountingStatusLabels[record.accounting_status]}</StatusBadge></td>
                <td>
                  <button className="primaryButton compact" type="button" onClick={(event) => { event.stopPropagation(); setData(updatePurchaseAccountingStatus(data, record.id, "synced", "관리자 구매내역 반영")); }}>
                    반영
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function filterPurchaseRecords(records: PurchaseRecord[], filter: string) {
  if (filter === "이번 달") return records.filter((record) => record.purchase_date.startsWith("2026-07"));
  if (filter === "장부 반영 대기") return records.filter((record) => record.accounting_status === "pending");
  if (filter === "반영 완료") return records.filter((record) => record.accounting_status === "synced");
  if (filter === "세금계산서 대기") return records.filter((record) => record.tax_invoice_status === "requested" || record.tax_invoice_status === "pending");
  if (filter === "증빙자료 누락") return records.filter((record) => record.receipt_status === "none" || record.delivery_note_status === "none");
  if (filter === "제외/보류") return records.filter((record) => record.accounting_status === "excluded" || record.accounting_status === "hold");
  return records;
}

function purchaseStatusTone(status: AccountingStatus): "orange" | "blue" | "green" | "gray" {
  if (status === "synced") return "green";
  if (status === "hold" || status === "failed") return "orange";
  if (status === "excluded") return "gray";
  return "blue";
}

function accountingCategoryOptions(data: AppData) {
  const defaults = ["매입비", "포장재비", "소모품비", "주방용품비", "수선비", "시설비", "공구소모품비", "자재구매", "잡비"];
  const fromData = data.categories.map((category) => getAccountingCategory(category.name));
  return Array.from(new Set([...defaults, ...fromData]));
}

function InfoPair({ label, value }: { label: string; value: string }) {
  return (
    <div className="infoPair">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function UnreadBadge({ count }: { count: number }) {
  return <span className="unreadBadge">{count > 99 ? "99+" : count}</span>;
}

function ThreadListButton({ data, thread, active, onClick }: { data: AppData; thread: MessageThread; active: boolean; onClick: () => void }) {
  const unread = data.message_read_states.filter((entry) => entry.thread_id === thread.id).reduce((sum, entry) => sum + entry.unread_count, 0);
  return (
    <button className={active ? "threadListButton active" : "threadListButton"} type="button" onClick={onClick}>
      <span>{thread.title}</span>
      <small>{supplierName(data, thread.supplier_id)} · {thread.last_message_at.slice(5, 16).replace("T", " ")}</small>
      {unread > 0 && <UnreadBadge count={unread} />}
    </button>
  );
}

function filterNotifications(notifications: Notification[], filter: string) {
  return notifications.filter((entry) => {
    if (filter === "안 읽음") return !entry.is_read;
    if (filter === "견적") return notificationCategory(entry) === "견적";
    if (filter === "거래") return notificationCategory(entry) === "거래";
    if (filter === "분석") return notificationCategory(entry) === "분석";
    if (filter === "장부") return notificationCategory(entry) === "장부";
    if (filter === "문의") return notificationCategory(entry) === "문의";
    if (filter === "시스템") return notificationCategory(entry) === "시스템";
    return true;
  });
}

function notificationCategory(notification: Notification) {
  if (notification.related_entity_type === "quote" || notification.related_entity_type === "quote_request" || notification.type.includes("quote") || notification.type.includes("request")) return "견적";
  if (notification.related_entity_type === "deal" || notification.type.startsWith("deal_")) return "거래";
  if (notification.related_entity_type === "analysis" || notification.type.startsWith("analysis_")) return "분석";
  if (notification.related_entity_type === "purchase_record" || notification.type.includes("accounting") || notification.type.includes("purchase")) return "장부";
  if (notification.related_entity_type === "message" || notification.type.includes("message")) return "문의";
  return "시스템";
}

function priorityTone(priority: NotificationPriority): "orange" | "blue" | "green" | "gray" {
  if (priority === "urgent" || priority === "high") return "orange";
  if (priority === "low") return "gray";
  return "blue";
}

function messageSenderLabel(data: AppData, entry: Message) {
  if (entry.sender_role === "system") return "시스템";
  if (entry.sender_role === "buyer") return buyerNameForUi(data, entry.sender_id);
  if (entry.sender_role === "supplier") {
    const supplier = data.supplier_profiles.find((candidate) => candidate.user_id === entry.sender_id || `${candidate.id}-user` === entry.sender_id);
    return supplier?.business_name ?? "공급업체";
  }
  return "관리자";
}

function buyerNameForUi(data: AppData, buyerId: string) {
  return data.profiles.find((entry) => entry.id === buyerId)?.business_name ?? "구매자";
}

function AnalysisJobTable({ data, jobs, navigate, admin = false }: { data: AppData; jobs: typeof data.analysis_jobs; navigate: Navigate; admin?: boolean }) {
  return (
    <div className="tableWrap">
      <table>
        <thead>
          <tr>
            <th>자료명</th>
            <th>유형</th>
            <th>상태</th>
            <th>품목</th>
            <th>총액</th>
            <th>거래처</th>
            <th>생성일</th>
            <th>변환</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => {
            const itemCount = data.analysis_items.filter((itemEntry) => itemEntry.analysis_job_id === job.id).length;
            const conversionCount = data.analysis_conversions.filter((conversion) => conversion.analysis_job_id === job.id).length;
            return (
              <tr key={job.id} onClick={() => navigate(admin ? `/app/admin/analysis/${job.id}` : `/app/analyze/${job.id}`)}>
                <td>{job.original_file_name}</td>
                <td>{analysisSourceTypeLabels[job.source_type]}</td>
                <td><StatusBadge tone={analysisStatusTone(job.status)}>{analysisStatusLabels[job.status]}</StatusBadge></td>
                <td>{itemCount}개</td>
                <td>{money(job.detected_total_amount)}</td>
                <td>{job.detected_supplier_name || "확인 필요"}</td>
                <td>{job.created_at.slice(0, 10)}</td>
                <td>{conversionCount ? `${conversionCount}건` : "없음"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function filterAnalysisJobs(data: AppData, filter: string, search: string) {
  const term = search.trim().toLowerCase();
  return data.analysis_jobs
    .filter((job) => {
      if (filter === "분석 완료") return job.status === "completed";
      if (filter === "검토 필요") return job.status === "needs_review";
      if (filter === "실패") return job.status === "failed";
      if (filter === "견적요청으로 변환됨") return data.analysis_conversions.some((conversion) => conversion.analysis_job_id === job.id && conversion.converted_type === "quote_request");
      if (filter === "구매내역으로 저장됨") return data.analysis_conversions.some((conversion) => conversion.analysis_job_id === job.id && conversion.converted_type === "purchase_record");
      return true;
    })
    .filter((job) => {
      if (!term) return true;
      const itemText = data.analysis_items
        .filter((itemEntry) => itemEntry.analysis_job_id === job.id)
        .map((itemEntry) => itemEntry.item_name)
        .join(" ")
        .toLowerCase();
      return `${job.original_file_name} ${job.detected_supplier_name} ${itemText}`.toLowerCase().includes(term);
    });
}

function analysisStatusTone(status: AnalysisJobStatus): "orange" | "blue" | "green" | "gray" {
  if (status === "completed") return "green";
  if (status === "needs_review" || status === "failed") return "orange";
  if (status === "cancelled") return "gray";
  return "blue";
}

function analysisStatusMessage(status: AnalysisJobStatus) {
  const messages: Record<AnalysisJobStatus, string> = {
    uploaded: "파일이 업로드되었습니다.",
    queued: "분석을 준비하고 있습니다.",
    analyzing: "품목과 금액 정보를 정리하는 중입니다.",
    needs_review: "확인이 필요한 항목이 있습니다.",
    completed: "분석이 완료되었습니다.",
    failed: "분석에 실패했습니다. 직접 입력하거나 다시 업로드해주세요.",
    cancelled: "분석이 취소되었습니다.",
  };
  return messages[status];
}

function analysisProgressSteps(status: AnalysisJobStatus) {
  const indexByStatus: Record<AnalysisJobStatus, number> = {
    uploaded: 0,
    queued: 1,
    analyzing: 2,
    needs_review: 4,
    completed: 4,
    failed: 2,
    cancelled: 0,
  };
  return ["파일 업로드 완료", "텍스트 추출", "품목 분석", "금액/거래처 확인", "검토 화면 준비"].map((label, index) => ({
    label,
    done: index <= indexByStatus[status],
  }));
}

function defaultAnalysisUiFileName(sourceType: AnalysisSourceType) {
  const names: Record<AnalysisSourceType, string> = {
    invoice: "동대문식자재_거래명세서.jpg",
    quotation: "서울포장_견적서.pdf",
    receipt: "영수증_샘플.jpg",
    delivery_note: "납품서_샘플.pdf",
    tax_invoice: "세금계산서_샘플.pdf",
    photo: "품목사진_샘플.jpg",
    excel: "충주닥트자재_견적.xlsx",
    text: "카톡_주문내역.txt",
    etc: "분석자료_샘플.txt",
  };
  return names[sourceType];
}

function SupplierApplyPage({ data, navigate, setData }: MutatingPageProps) {
  const steps = ["기본 정보", "취급 카테고리", "납품 지역", "거래 조건", "인증 자료", "신청 완료"];
  const [step, setStep] = useState(0);
  const [regionInput, setRegionInput] = useState("");
  const [draft, setDraft] = useState<SupplierApplicationDraft>({
    business_name: "",
    representative_name: "",
    business_number: "",
    phone: "",
    email: "",
    address: "",
    manager_name: "",
    manager_phone: "",
    description: "",
    categories: [],
    sub_categories: [],
    service_regions: ["서울 동대문구"],
    min_order_amount: 100000,
    delivery_fee_policy: "지역/금액에 따라 배송비 협의",
    free_delivery_min_amount: 300000,
    same_day_delivery_available: false,
    urgent_delivery_available: false,
    delivery_days: ["월", "화", "수", "목", "금"],
    delivery_time_slots: ["오전", "오후"],
    tax_invoice_available: true,
    card_payment_available: false,
    bank_transfer_available: true,
    on_site_payment_available: false,
    default_quote_valid_days: 3,
    documents: [
      { document_type: "business_license", file_name: "", status: "pending_review" },
      { document_type: "bankbook", file_name: "", status: "uploaded" },
      { document_type: "store_photo", file_name: "", status: "uploaded" },
      { document_type: "price_list", file_name: "", status: "uploaded" },
    ],
  });
  const [submittedId, setSubmittedId] = useState("");
  const availableSubCategories = draft.categories.flatMap((category) => supplierSubCategoryOptions[category] ?? []);

  function submitApplication() {
    const result = createSupplierApplication(data, {
      ...draft,
      business_name: draft.business_name || "신규 싸와 파트너",
      representative_name: draft.representative_name || "대표자",
      business_number: draft.business_number || "000-00-00000",
      phone: draft.phone || draft.manager_phone || "010-0000-0000",
      email: draft.email || "partner@ssawa.local",
      address: draft.address || draft.service_regions[0] || "서울",
      categories: draft.categories.length ? draft.categories : ["포장재"],
      sub_categories: draft.sub_categories.length ? draft.sub_categories : ["배달용기"],
      service_regions: draft.service_regions.length ? draft.service_regions : ["서울 전체"],
    });
    setData(result.data);
    setSubmittedId(result.supplierId);
    setStep(5);
  }

  return (
    <Page>
      <BackButton onClick={() => navigate("/app/supplier")} label="공급업체 홈" />
      <PageTitle eyebrow="공급업체 입점" title="싸와! 파트너가 되어 구매 의사가 있는 사장님들의 견적요청을 받아보세요." desc="초기 입점비 없이 시작하고, 지역과 카테고리에 맞는 견적요청을 받을 수 있습니다." />
      <section className="wizardShell">
        <div className="wizardSteps" aria-label="공급업체 입점 신청 단계">
          {steps.map((label, index) => (
            <button className={index === step ? "wizardStep active" : index < step ? "wizardStep done" : "wizardStep"} type="button" onClick={() => setStep(index)} key={label}>
              <span>{index + 1}</span>
              <strong>{label}</strong>
            </button>
          ))}
        </div>

        {step === 0 && (
          <div className="wizardPanel">
            <SectionHeader title="기본 정보를 입력하세요" />
            <div className="conditionGrid">
              <Field label="업체명"><input value={draft.business_name} onChange={(event) => setDraft({ ...draft, business_name: event.target.value })} placeholder="예: 서울포장" /></Field>
              <Field label="대표자명"><input value={draft.representative_name} onChange={(event) => setDraft({ ...draft, representative_name: event.target.value })} /></Field>
              <Field label="사업자등록번호"><input value={draft.business_number} onChange={(event) => setDraft({ ...draft, business_number: event.target.value })} placeholder="000-00-00000" /></Field>
              <Field label="연락처"><input value={draft.phone} onChange={(event) => setDraft({ ...draft, phone: event.target.value })} /></Field>
              <Field label="이메일"><input value={draft.email} onChange={(event) => setDraft({ ...draft, email: event.target.value })} /></Field>
              <Field label="사업장 주소"><input value={draft.address} onChange={(event) => setDraft({ ...draft, address: event.target.value })} /></Field>
              <Field label="담당자명"><input value={draft.manager_name} onChange={(event) => setDraft({ ...draft, manager_name: event.target.value })} /></Field>
              <Field label="담당자 연락처"><input value={draft.manager_phone} onChange={(event) => setDraft({ ...draft, manager_phone: event.target.value })} /></Field>
            </div>
            <Field label="소개글"><textarea value={draft.description} onChange={(event) => setDraft({ ...draft, description: event.target.value })} placeholder="취급 품목, 배송 강점, 빠른 응답 가능 여부를 적어주세요." /></Field>
          </div>
        )}

        {step === 1 && (
          <div className="wizardPanel">
            <SectionHeader title="취급 카테고리와 세부 품목을 선택하세요" />
            <div className="categoryChoiceGrid">
              {data.categories.map((category) => (
                <button className={draft.categories.includes(category.name) ? "categoryChoiceCard active" : "categoryChoiceCard"} type="button" onClick={() => setDraft({ ...draft, categories: toggleArray(draft.categories, category.name) })} key={category.id}>
                  <strong>{category.name}</strong>
                  <span>{categoryDescriptions[category.name]}</span>
                </button>
              ))}
            </div>
            <div className="chipSelector">
              {availableSubCategories.map((subCategory) => (
                <button className={draft.sub_categories.includes(subCategory) ? "chipButton active" : "chipButton"} type="button" onClick={() => setDraft({ ...draft, sub_categories: toggleArray(draft.sub_categories, subCategory) })} key={subCategory}>
                  {subCategory}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="wizardPanel">
            <SectionHeader title="납품 가능 지역을 설정하세요" />
            <div className="chipSelector">
              {commonServiceRegions.map((region) => (
                <button className={draft.service_regions.includes(region) ? "chipButton active" : "chipButton"} type="button" onClick={() => setDraft({ ...draft, service_regions: toggleArray(draft.service_regions, region) })} key={region}>
                  {region}
                </button>
              ))}
            </div>
            <div className="inlineForm">
              <input value={regionInput} onChange={(event) => setRegionInput(event.target.value)} placeholder="직접 입력: 경기 구리시" />
              <button className="secondaryButton compact" type="button" onClick={() => { if (regionInput.trim()) setDraft({ ...draft, service_regions: [...draft.service_regions, regionInput.trim()] }); setRegionInput(""); }}>지역 추가</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="wizardPanel">
            <SectionHeader title="거래 조건을 설정하세요" />
            <div className="conditionGrid">
              <Field label="최소 주문금액"><input type="number" min="0" value={draft.min_order_amount} onChange={(event) => setDraft({ ...draft, min_order_amount: Number(event.target.value) })} /></Field>
              <Field label="무료배송 기준 금액"><input type="number" min="0" value={draft.free_delivery_min_amount} onChange={(event) => setDraft({ ...draft, free_delivery_min_amount: Number(event.target.value) })} /></Field>
              <Field label="견적 유효기간 기본값"><input type="number" min="1" value={draft.default_quote_valid_days} onChange={(event) => setDraft({ ...draft, default_quote_valid_days: Number(event.target.value) })} /></Field>
            </div>
            <Field label="배송비 조건"><input value={draft.delivery_fee_policy} onChange={(event) => setDraft({ ...draft, delivery_fee_policy: event.target.value })} /></Field>
            <div className="chipSelector">
              {["월", "화", "수", "목", "금", "토", "일"].map((day) => (
                <button className={draft.delivery_days.includes(day) ? "chipButton active" : "chipButton"} type="button" onClick={() => setDraft({ ...draft, delivery_days: toggleArray(draft.delivery_days, day) })} key={day}>{day}</button>
              ))}
            </div>
            <div className="chipSelector">
              {["새벽", "오전", "오후", "야간 협의"].map((slot) => (
                <button className={draft.delivery_time_slots.includes(slot) ? "chipButton active" : "chipButton"} type="button" onClick={() => setDraft({ ...draft, delivery_time_slots: toggleArray(draft.delivery_time_slots, slot) })} key={slot}>{slot}</button>
              ))}
            </div>
            <div className="toggleGrid">
              <Toggle checked={draft.same_day_delivery_available} label="당일배송 가능" onChange={(checked) => setDraft({ ...draft, same_day_delivery_available: checked })} />
              <Toggle checked={draft.urgent_delivery_available} label="긴급배송 가능" onChange={(checked) => setDraft({ ...draft, urgent_delivery_available: checked })} />
              <Toggle checked={draft.tax_invoice_available} label="세금계산서 발행 가능" onChange={(checked) => setDraft({ ...draft, tax_invoice_available: checked })} />
              <Toggle checked={draft.card_payment_available} label="카드결제 가능" onChange={(checked) => setDraft({ ...draft, card_payment_available: checked })} />
              <Toggle checked={draft.bank_transfer_available} label="계좌이체 가능" onChange={(checked) => setDraft({ ...draft, bank_transfer_available: checked })} />
              <Toggle checked={draft.on_site_payment_available} label="현장결제 가능" onChange={(checked) => setDraft({ ...draft, on_site_payment_available: checked })} />
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="wizardPanel">
            <SectionHeader title="인증 자료를 등록하세요" />
            <p className="mutedText">인증자료를 등록하면 구매자에게 더 신뢰도 높은 업체로 표시됩니다.</p>
            <div className="documentUploadGrid">
              {draft.documents.map((document, index) => (
                <div className="documentUploadCard" key={`${document.document_type}-${index}`}>
                  <strong>{supplierDocumentTypeLabels[document.document_type]}</strong>
                  <input value={document.file_name} onChange={(event) => setDraft({ ...draft, documents: draft.documents.map((entry, itemIndex) => itemIndex === index ? { ...entry, file_name: event.target.value } : entry) })} placeholder="파일명 입력" />
                  <span>{supplierDocumentStatusLabels[document.status]}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="wizardPanel completionPanelLite">
            <BadgeCheck size={40} />
            <h2>입점 신청이 완료되었습니다.</h2>
            <p>관리자가 확인 후 승인하면 견적요청을 받을 수 있습니다.</p>
            <StatusBadge tone="orange">승인 대기</StatusBadge>
            {submittedId && <p className="mutedText">신청 ID: {submittedId}</p>}
            <div className="formActions">
              <button className="primaryButton" type="button" onClick={() => navigate("/app/admin/suppliers")}>관리자 승인 화면 보기</button>
              <button className="secondaryButton" type="button" onClick={() => navigate("/app/supplier")}>공급업체 홈</button>
            </div>
          </div>
        )}

        <div className="wizardActions">
          <button className="secondaryButton" type="button" onClick={() => (step === 0 ? navigate("/app/supplier") : setStep((current) => Math.max(0, current - 1)))}>{step === 0 ? "취소" : "이전"}</button>
          {step < 4 && <button className="primaryButton" type="button" onClick={() => setStep((current) => current + 1)}>다음 <ArrowRight size={17} /></button>}
          {step === 4 && <button className="primaryButton" type="button" onClick={submitApplication}><Check size={17} /> 신청 완료</button>}
        </div>
      </section>
    </Page>
  );
}

function SupplierProfilePage({ data, navigate, setData }: MutatingPageProps) {
  const supplier = getActiveSupplier(data);
  const [draft, setDraft] = useState<SupplierProfile>({ ...supplier });

  function saveProfile() {
    setData(updateSupplierProfile(data, draft));
    navigate("/app/supplier");
  }

  return (
    <Page>
      <BackButton onClick={() => navigate("/app/supplier")} label="공급업체 홈" />
      <PageTitle eyebrow="공급업체" title="공급업체 프로필 관리" desc="구매자가 견적 비교에서 확인하는 업체 신뢰 정보입니다." />
      <section className="formStack">
        <div className="conditionGrid">
          <Field label="업체명"><input value={draft.business_name} onChange={(event) => setDraft({ ...draft, business_name: event.target.value })} /></Field>
          <Field label="대표자명"><input value={draft.representative_name} onChange={(event) => setDraft({ ...draft, representative_name: event.target.value })} /></Field>
          <Field label="사업자등록번호"><input value={draft.business_number} onChange={(event) => setDraft({ ...draft, business_number: event.target.value })} /></Field>
          <Field label="연락처"><input value={draft.phone} onChange={(event) => setDraft({ ...draft, phone: event.target.value })} /></Field>
          <Field label="이메일"><input value={draft.email ?? ""} onChange={(event) => setDraft({ ...draft, email: event.target.value })} /></Field>
          <Field label="주소"><input value={draft.address ?? ""} onChange={(event) => setDraft({ ...draft, address: event.target.value })} /></Field>
          <Field label="담당자명"><input value={draft.manager_name ?? ""} onChange={(event) => setDraft({ ...draft, manager_name: event.target.value })} /></Field>
          <Field label="담당자 연락처"><input value={draft.manager_phone ?? ""} onChange={(event) => setDraft({ ...draft, manager_phone: event.target.value })} /></Field>
        </div>
        <Field label="소개글"><textarea value={draft.description ?? ""} onChange={(event) => setDraft({ ...draft, description: event.target.value })} /></Field>
        <div className="formActions">
          <button className="primaryButton" type="button" onClick={saveProfile}><Check size={17} /> 저장</button>
          <button className="secondaryButton" type="button" onClick={() => navigate(`/app/suppliers/${supplier.id}`)}>공개 프로필 보기</button>
        </div>
      </section>
    </Page>
  );
}

function SupplierSettingsPage({ data, navigate, setData }: MutatingPageProps) {
  const supplier = getActiveSupplier(data);
  const [draft, setDraft] = useState<SupplierProfile>({ ...supplier });
  const availableSubCategories = draft.categories.flatMap((category) => supplierSubCategoryOptions[category] ?? []);

  function saveSettings() {
    setData(updateSupplierProfile(data, draft));
    navigate("/app/supplier");
  }

  return (
    <Page>
      <BackButton onClick={() => navigate("/app/supplier")} label="공급업체 홈" />
      <PageTitle eyebrow="공급업체" title="납품/카테고리/결제 조건 관리" desc="지역과 카테고리 조건은 견적요청 매칭에 직접 반영됩니다." />
      <section className="formStack">
        <SectionHeader title="취급 카테고리" />
        <div className="chipSelector">
          {data.categories.map((category) => (
            <button className={draft.categories.includes(category.name) ? "chipButton active" : "chipButton"} type="button" onClick={() => setDraft({ ...draft, categories: toggleArray(draft.categories, category.name) })} key={category.id}>{category.name}</button>
          ))}
        </div>
        <SectionHeader title="세부 취급 품목" />
        <div className="chipSelector">
          {availableSubCategories.map((subCategory) => (
            <button className={(draft.sub_categories ?? []).includes(subCategory) ? "chipButton active" : "chipButton"} type="button" onClick={() => setDraft({ ...draft, sub_categories: toggleArray(draft.sub_categories ?? [], subCategory) })} key={subCategory}>{subCategory}</button>
          ))}
        </div>
        <SectionHeader title="납품 가능 지역" />
        <div className="chipSelector">
          {commonServiceRegions.map((region) => (
            <button className={draft.service_regions.includes(region) ? "chipButton active" : "chipButton"} type="button" onClick={() => setDraft({ ...draft, service_regions: toggleArray(draft.service_regions, region) })} key={region}>{region}</button>
          ))}
        </div>
        <div className="conditionGrid">
          <Field label="최소 주문금액"><input type="number" value={draft.min_order_amount ?? 0} onChange={(event) => setDraft({ ...draft, min_order_amount: Number(event.target.value) })} /></Field>
          <Field label="무료배송 기준 금액"><input type="number" value={draft.free_delivery_min_amount ?? 0} onChange={(event) => setDraft({ ...draft, free_delivery_min_amount: Number(event.target.value) })} /></Field>
          <Field label="견적 유효기간 기본값"><input type="number" value={draft.default_quote_valid_days ?? 3} onChange={(event) => setDraft({ ...draft, default_quote_valid_days: Number(event.target.value) })} /></Field>
        </div>
        <Field label="배송비 조건"><input value={draft.delivery_fee_policy ?? ""} onChange={(event) => setDraft({ ...draft, delivery_fee_policy: event.target.value })} /></Field>
        <div className="toggleGrid">
          <Toggle checked={draft.same_day_delivery_available ?? false} label="당일배송 가능" onChange={(checked) => setDraft({ ...draft, same_day_delivery_available: checked })} />
          <Toggle checked={draft.urgent_delivery_available ?? false} label="긴급배송 가능" onChange={(checked) => setDraft({ ...draft, urgent_delivery_available: checked })} />
          <Toggle checked={draft.tax_invoice_available} label="세금계산서 가능" onChange={(checked) => setDraft({ ...draft, tax_invoice_available: checked })} />
          <Toggle checked={draft.card_payment_available} label="카드결제 가능" onChange={(checked) => setDraft({ ...draft, card_payment_available: checked })} />
          <Toggle checked={draft.bank_transfer_available ?? true} label="계좌이체 가능" onChange={(checked) => setDraft({ ...draft, bank_transfer_available: checked })} />
          <Toggle checked={draft.on_site_payment_available ?? false} label="현장결제 가능" onChange={(checked) => setDraft({ ...draft, on_site_payment_available: checked })} />
        </div>
        <button className="primaryButton" type="button" onClick={saveSettings}><Check size={17} /> 조건 저장</button>
      </section>
    </Page>
  );
}

function SupplierPublicProfilePage({ data, navigate, supplierId }: PageProps & { supplierId: string }) {
  const supplier = data.supplier_profiles.find((entry) => entry.id === supplierId);
  if (!supplier) return <NotFound navigate={navigate} />;
  const stats = supplierStatsFor(data, supplier.id);
  const documents = data.supplier_documents.filter((document) => document.supplier_id === supplier.id);
  const reviews = data.supplier_reviews.filter((review) => review.supplier_id === supplier.id);
  return (
    <Page>
      <BackButton onClick={() => navigate("/app/requests")} label="요청 목록" />
      <section className="supplierProfileHero">
        <div>
          <span className="eyebrow">공급업체 프로필</span>
          <h1>{supplier.business_name}</h1>
          <p>{supplier.description ?? "싸와 등록 공급업체입니다."}</p>
          <div className="chipLine">
            <StatusBadge tone={supplier.approval_status === "approved" ? "green" : "orange"}>{supplierApprovalLabels[supplier.approval_status]}</StatusBadge>
            {supplier.urgent_delivery_available && <span className="chip">긴급배송 가능</span>}
            {supplier.tax_invoice_available && <span className="chip">세금계산서 가능</span>}
            {supplier.card_payment_available && <span className="chip">카드결제 가능</span>}
          </div>
        </div>
        <div className="supplierRatingBlock">
          <strong>{stats.rating ? stats.rating.toFixed(1) : "신규"}</strong>
          <span>후기 {stats.review_count}개 · 거래 {stats.selected_quotes_count}건</span>
        </div>
      </section>
      <div className="dashboardGrid">
        <Metric label="평균 응답 시간" value={stats.average_response_minutes ? `${stats.average_response_minutes}분` : "신규"} icon={<RefreshCcw />} />
        <Metric label="견적 응답률" value={`${stats.response_rate}%`} icon={<BadgeCheck />} />
        <Metric label="재거래율" value={`${stats.repeat_customer_rate}%`} icon={<ReceiptText />} />
        <Metric label="인증자료" value={`${documents.length}개`} icon={<Upload />} />
      </div>
      <section className="twoColumn">
        <InfoPanel title="취급 카테고리" items={[...supplier.categories, ...(supplier.sub_categories ?? [])]} />
        <InfoPanel title="납품 가능 지역" items={supplier.service_regions} />
        <InfoPanel title="거래 조건" items={[`최소 주문 ${money(supplier.min_order_amount ?? 0)}`, supplier.delivery_fee_policy ?? "배송비 협의", `견적 유효 ${supplier.default_quote_valid_days ?? 3}일`]} />
        <InfoPanel title="결제/증빙" items={[`세금계산서 ${yesNo(supplier.tax_invoice_available)}`, `카드결제 ${yesNo(supplier.card_payment_available)}`, `계좌이체 ${yesNo(supplier.bank_transfer_available ?? true)}`]} />
      </section>
      <SectionHeader title="구매자 후기" />
      <div className="reviewList">
        {reviews.length ? reviews.map((review) => <ReviewCard key={review.id} review={review} />) : <EmptyState icon={<ReceiptText />} title="아직 후기가 없습니다." desc="거래가 완료되면 후기가 표시됩니다." />}
      </div>
      <button className="primaryButton" type="button">문의하기 UI</button>
    </Page>
  );
}

function SupplierDashboard({ data, navigate }: PageProps) {
  const supplier = getActiveSupplier(data);
  const stats = supplierStatsFor(data, supplier.id);
  const matchingRequests = getVisibleRequestsForSupplier(supplier, data.quote_requests);
  const myQuotes = data.quotes.filter((quoteEntry) => quoteEntry.supplier_id === supplier.id);
  const selectedQuotes = myQuotes.filter((quoteEntry) => quoteEntry.status === "selected").length;
  const pendingQuoteRequests = matchingRequests.filter((request) => !myQuotes.some((quote) => quote.quote_request_id === request.id));
  const todayRequests = matchingRequests.filter((request) => request.created_at.slice(0, 10) === today || request.status === "open").length;

  return (
    <Page>
      <PageTitle eyebrow="공급업체" title="구매 의사가 있는 사장님을 만나보세요." desc={`${supplier.business_name} 기준으로 지역과 카테고리에 맞는 견적요청을 확인합니다.`} />
      <SupplierStatusNotice supplier={supplier} navigate={navigate} />
      <div className="dashboardGrid">
        <Metric label="오늘 도착한 요청" value={`${todayRequests}건`} icon={<ClipboardList />} />
        <Metric label="견적 제출 대기" value={`${pendingQuoteRequests.length}건`} icon={<SearchCheck />} />
        <Metric label="제출한 견적" value={`${myQuotes.length}건`} icon={<ReceiptText />} />
        <Metric label="선택된 견적" value={`${selectedQuotes}건`} icon={<PackageCheck />} />
        <Metric label="이번 달 예상 거래액" value={money(stats.total_deal_amount)} icon={<ReceiptText />} />
        <Metric label="견적 응답률" value={`${stats.response_rate}%`} icon={<BadgeCheck />} />
        <Metric label="평균 응답 시간" value={stats.average_response_minutes ? `${stats.average_response_minutes}분` : "신규"} icon={<RefreshCcw />} />
        <Metric label="승인 상태" value={supplierApprovalLabels[supplier.approval_status]} icon={<BadgeCheck />} />
      </div>
      <section className="dealNotice">
        <div>
          <span className="eyebrow">응답 가이드</span>
          <h2>빠른 견적 제출이 거래 성사율을 높입니다.</h2>
          <p>{supplier.categories.join(", ")} 카테고리에서 응답 가능한 요청 {matchingRequests.length}건이 있습니다.</p>
        </div>
        <button className="primaryButton" type="button" onClick={() => navigate("/app/supplier/requests")}>견적요청 보기</button>
      </section>
      <div className="twoColumn">
        <ActionTile title="견적 가능한 요청" desc="지역과 카테고리에 맞는 요청을 봅니다." icon={<SearchCheck />} onClick={() => navigate("/app/supplier/requests")} />
        <ActionTile title="제출한 견적" desc="내가 제출한 견적과 선택 여부를 확인합니다." icon={<ReceiptText />} onClick={() => navigate("/app/supplier/quotes")} />
        <ActionTile title="거래관리" desc="선택된 거래의 납품 상태를 관리합니다." icon={<PackageCheck />} onClick={() => navigate("/app/supplier/deals")} />
        <ActionTile title="신뢰도/후기" desc="내 업체 신뢰도, 후기, 운영 가이드를 봅니다." icon={<ShieldCheck />} onClick={() => navigate("/app/supplier/reputation")} />
        <ActionTile title="요금제/이용현황" desc="견적 참여 한도와 업그레이드 안내를 봅니다." icon={<BadgeCheck />} onClick={() => navigate("/app/supplier/billing")} />
        <ActionTile title="정산 예정 내역" desc="거래 완료 후 플랫폼 수수료를 확인합니다." icon={<Landmark />} onClick={() => navigate("/app/supplier/settlements")} />
        <ActionTile title="견적 참여 사용량" desc="월 참여권과 남은 건수를 확인합니다." icon={<Bell />} onClick={() => navigate("/app/supplier/usage")} />
        <ActionTile title="프로필 관리" desc="구매자에게 보이는 업체 정보를 관리합니다." icon={<Store />} onClick={() => navigate("/app/supplier/profile")} />
        <ActionTile title="매칭 조건 설정" desc="납품 지역, 카테고리, 결제 조건을 관리합니다." icon={<Boxes />} onClick={() => navigate("/app/supplier/settings")} />
        <ActionTile title="입점 신청 체험" desc="신규 파트너 신청 흐름을 확인합니다." icon={<FilePlus2 />} onClick={() => navigate("/app/supplier/apply")} />
      </div>
      <SectionHeader title="최근 요청" action="전체 보기" onAction={() => navigate("/app/supplier/requests")} />
      {supplier.approval_status === "approved" ? (
        <SupplierRequestList data={data} supplier={supplier} requests={matchingRequests.slice(0, 3)} navigate={navigate} />
      ) : (
        <EmptyState icon={<ShieldCheck />} title="승인 후 견적요청에 참여할 수 있습니다." desc="프로필 수정과 인증자료 보완은 계속 진행할 수 있습니다." />
      )}
    </Page>
  );
}

function SupplierRequestsPage({ data, navigate }: PageProps) {
  const supplier = getActiveSupplier(data);
  const [categoryFilter, setCategoryFilter] = useState("전체");
  const [regionFilter, setRegionFilter] = useState("전체");
  const [sort, setSort] = useState("요청 완성도 높은순");
  const [taxOnly, setTaxOnly] = useState(false);
  const [cardOnly, setCardOnly] = useState(false);
  const [urgentOnly, setUrgentOnly] = useState(false);
  const [unquotedOnly, setUnquotedOnly] = useState(false);
  const myQuotes = data.quotes.filter((quote) => quote.supplier_id === supplier.id);
  const baseRequests = getVisibleRequestsForSupplier(supplier, data.quote_requests);
  const requests = baseRequests
    .filter((request) => categoryFilter === "전체" || request.category_name === categoryFilter)
    .filter((request) => regionFilter === "전체" || request.delivery_region.includes(regionFilter) || regionFilter.includes(request.delivery_region.split(" ")[0]))
    .filter((request) => !taxOnly || request.need_tax_invoice)
    .filter((request) => !cardOnly || request.card_payment_required)
    .filter((request) => !urgentOnly || request.urgent)
    .filter((request) => !unquotedOnly || !myQuotes.some((quote) => quote.quote_request_id === request.id))
    .sort((a, b) => sortSupplierRequests(a, b, sort, supplier));

  return (
    <Page>
      <PageTitle eyebrow="공급업체" title="견적 가능한 요청" desc="귀사의 취급 카테고리와 납품 지역에 적합한 요청만 우선 표시합니다." />
      <SupplierStatusNotice supplier={supplier} navigate={navigate} />
      {supplier.approval_status !== "approved" ? (
        <AccessState status={supplier.approval_status} navigate={navigate} />
      ) : (
        <>
          <section className="filterPanel">
            <select value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)}>
              <option>전체</option>
              {supplier.categories.map((category) => <option key={category}>{category}</option>)}
            </select>
            <select value={regionFilter} onChange={(event) => setRegionFilter(event.target.value)}>
              <option>전체</option>
              {supplier.service_regions.map((region) => <option key={region}>{region}</option>)}
            </select>
            <select value={sort} onChange={(event) => setSort(event.target.value)}>
              {["최신순", "마감 임박순", "희망 납품일 빠른순", "요청 완성도 높은순", "예상 금액 높은순", "지역 가까운순 mock"].map((option) => <option key={option}>{option}</option>)}
            </select>
            <Toggle checked={taxOnly} label="세금계산서 필요" onChange={setTaxOnly} />
            <Toggle checked={cardOnly} label="카드결제 필요" onChange={setCardOnly} />
            <Toggle checked={urgentOnly} label="긴급 요청" onChange={setUrgentOnly} />
            <Toggle checked={unquotedOnly} label="내가 제출한 요청 제외" onChange={setUnquotedOnly} />
          </section>
          <SupplierRequestList data={data} supplier={supplier} requests={requests} navigate={navigate} />
        </>
      )}
    </Page>
  );
}

function SupplierRequestDetailPage({ data, navigate, setData, requestId }: MutatingPageProps & { requestId: string }) {
  const request = data.quote_requests.find((entry) => entry.id === requestId);
  const supplier = getActiveSupplier(data);
  const [draft, setDraft] = useState<QuoteDraft>({
    supplier_id: supplier.id,
    total_amount: 0,
    delivery_fee: supplier.free_delivery_min_amount ? 0 : 30000,
    available_delivery_date: "2026-07-08",
    tax_invoice_available: supplier.tax_invoice_available,
    card_payment_available: supplier.card_payment_available,
    alternative_proposal: "",
    item_price_memo: "",
    memo: "",
    valid_until: "2026-07-09",
  });
  const [error, setError] = useState("");
  const [showUpgradePrompt, setShowUpgradePrompt] = useState(false);

  if (!request) return <NotFound navigate={navigate} />;
  const currentRequest = request;
  const items = data.quote_request_items.filter((entry) => entry.quote_request_id === currentRequest.id);
  const attachments = data.quote_attachments.filter((entry) => entry.quote_request_id === currentRequest.id);
  const qualityScore = currentRequest.request_quality_score ?? calculateRequestQuality(currentRequest, items, attachments);
  const quickBaseAmount = currentRequest.budget_max || currentRequest.previous_amount || Math.max(120000, items.reduce((sum, entry) => sum + entry.quantity * 1200, 0));

  function applyQuickQuote(mode: "standard" | "lowest" | "fast") {
    const discount = mode === "lowest" ? 0.92 : mode === "fast" ? 1.04 : 1;
    setDraft((current) => ({
      ...current,
      total_amount: Math.round(quickBaseAmount * discount),
      delivery_fee: currentRequest.include_delivery_fee === false ? 30000 : quickBaseAmount >= (supplier.free_delivery_min_amount ?? 0) ? 0 : 30000,
      available_delivery_date: mode === "fast" ? currentRequest.desired_delivery_date : current.available_delivery_date,
      item_price_memo: mode === "lowest" ? "최저가 대응 단가로 입력한 목업 견적입니다." : "품목별 단가는 상세 확인 후 조정 가능합니다.",
      memo: mode === "fast" ? "빠른 납품 가능 여부를 우선 반영한 견적입니다." : "요청 조건 기준으로 산정한 견적입니다.",
    }));
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    if (draft.total_amount <= 0 || !draft.available_delivery_date || !draft.valid_until) {
      setError("총 견적금액, 납품 가능일, 견적 유효기간을 입력해 주세요.");
      return;
    }
    const gate = canSubmitQuoteByPlan(data, draft.supplier_id);
    if (!gate.allowed) {
      setShowUpgradePrompt(true);
      setError("");
      return;
    }
    const nextData = createQuote(data, currentRequest.id, draft);
    setData(nextData);
    navigate(`/app/requests/${currentRequest.id}`);
  }

  return (
    <Page>
      <BackButton onClick={() => navigate("/app/supplier/requests")} label="견적 가능 요청" />
      <RequestSummary data={data} request={currentRequest} items={items} />
      <SupplierStatusNotice supplier={supplier} navigate={navigate} />
      <SupplierRequestInsight request={currentRequest} qualityScore={qualityScore} attachmentsCount={attachments.length} />
      <SupplierQuoteFitPanel supplier={supplier} request={currentRequest} />
      <UsageLimitNotice data={data} supplierId={draft.supplier_id} navigate={navigate} />
      {supplier.approval_status !== "approved" ? (
        <EmptyState icon={<ShieldCheck />} title="승인 후 견적을 제출할 수 있습니다." desc="프로필 수정과 인증자료 보완을 먼저 진행해 주세요." />
      ) : (
        <>
      <PageTitle eyebrow="견적 제출" title="공급업체 견적 입력" desc="필수 금액과 납품 조건을 입력하면 구매자 상세 화면에 즉시 반영됩니다." />
      {showUpgradePrompt && (
        <section className="limitModalInline">
          <h2>이번 달 무료 견적 참여 한도를 모두 사용했습니다.</h2>
          <p>더 많은 견적요청에 참여하려면 요금제를 업그레이드하거나 다음 달 초기화를 기다려주세요.</p>
          <div className="formActions">
            <button className="primaryButton" type="button" onClick={() => navigate("/app/supplier/billing")}>요금제 보기</button>
            <button className="secondaryButton" type="button" onClick={() => setShowUpgradePrompt(false)}>닫기</button>
          </div>
        </section>
      )}
      <div className="quickQuoteButtons">
        <button className="secondaryButton compact" type="button" onClick={() => applyQuickQuote("standard")}>기본 견적 채우기</button>
        <button className="secondaryButton compact" type="button" onClick={() => applyQuickQuote("lowest")}>최저가 대응</button>
        <button className="secondaryButton compact" type="button" onClick={() => applyQuickQuote("fast")}>빠른 납품</button>
      </div>
      <form className="formStack" onSubmit={submit}>
        {error && <div className="alert">{error}</div>}
        <Field label="제출 업체">
          <select value={draft.supplier_id} onChange={(event) => setDraft({ ...draft, supplier_id: event.target.value })}>
            {data.supplier_profiles.map((entry) => (
              <option key={entry.id} value={entry.id}>
                {entry.business_name}
              </option>
            ))}
          </select>
        </Field>
        <div className="formGrid">
          <Field label="총 견적금액">
            <input type="number" min="0" value={draft.total_amount} onChange={(event) => setDraft({ ...draft, total_amount: Number(event.target.value) })} />
          </Field>
          <Field label="배송비">
            <input type="number" min="0" value={draft.delivery_fee} onChange={(event) => setDraft({ ...draft, delivery_fee: Number(event.target.value) })} />
          </Field>
        </div>
        <div className="formGrid">
          <Field label="납품 가능일">
            <input type="date" value={draft.available_delivery_date} onChange={(event) => setDraft({ ...draft, available_delivery_date: event.target.value })} />
          </Field>
          <Field label="견적 유효기간">
            <input type="date" value={draft.valid_until} onChange={(event) => setDraft({ ...draft, valid_until: event.target.value })} />
          </Field>
        </div>
        <div className="toggleGrid">
          <Toggle checked={draft.tax_invoice_available} label="세금계산서 가능" onChange={(checked) => setDraft({ ...draft, tax_invoice_available: checked })} />
          <Toggle checked={draft.card_payment_available} label="카드결제 가능" onChange={(checked) => setDraft({ ...draft, card_payment_available: checked })} />
        </div>
        <Field label="품목별 단가 메모">
          <textarea value={draft.item_price_memo} onChange={(event) => setDraft({ ...draft, item_price_memo: event.target.value })} placeholder="예: 박스 560원, 봉투 330원" />
        </Field>
        <Field label="대체품 제안">
          <textarea value={draft.alternative_proposal} onChange={(event) => setDraft({ ...draft, alternative_proposal: event.target.value })} placeholder="대체 브랜드나 규격 제안이 있으면 입력하세요." />
        </Field>
        <Field label="추가 설명">
          <textarea value={draft.memo} onChange={(event) => setDraft({ ...draft, memo: event.target.value })} placeholder="배송 시간, 재고 조건, 결제 조건 등을 입력하세요." />
        </Field>
        <div className="formActions">
          <button className="secondaryButton" type="button" onClick={() => navigate("/app/supplier/requests")}>
            취소
          </button>
          <button className="primaryButton" type="submit">
            <ReceiptText size={18} />
            견적 제출
          </button>
        </div>
      </form>
        </>
      )}
    </Page>
  );
}

function SupplierQuotesPage({ data, navigate }: PageProps) {
  return (
    <Page>
      <PageTitle eyebrow="공급업체" title="제출한 견적" desc="공급업체별 제출 견적과 거래 성사 여부를 확인합니다." />
      <div className="tableWrap">
        <table>
          <thead>
            <tr>
              <th>공급업체</th>
              <th>요청</th>
              <th>최종금액</th>
              <th>상태</th>
              <th>납품 가능일</th>
              <th>거래</th>
            </tr>
          </thead>
          <tbody>
            {data.quotes.map((quoteEntry) => {
              const supplier = supplierName(data, quoteEntry.supplier_id);
              const request = data.quote_requests.find((entry) => entry.id === quoteEntry.quote_request_id);
              const deal = data.deals.find((entry) => entry.selected_quote_id === quoteEntry.id);
              return (
                <tr key={quoteEntry.id} onClick={() => request && navigate(`/app/supplier/requests/${request.id}`)}>
                  <td>{supplier}</td>
                  <td>{request?.title ?? "삭제된 요청"}</td>
                  <td>{money(quoteEntry.final_amount)}</td>
                  <td>
                    <StatusBadge tone={quoteEntry.status === "selected" ? "green" : "blue"}>{quoteStatusLabels[quoteEntry.status]}</StatusBadge>
                  </td>
                  <td>{quoteEntry.available_delivery_date}</td>
                  <td>
                    {deal ? (
                      <button className="primaryButton compact" type="button" onClick={(event) => { event.stopPropagation(); navigate(`/app/deals/${deal.id}`); }}>
                        거래 상세
                      </button>
                    ) : "없음"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Page>
  );
}

function SupplierBillingPage({ data, navigate, setData }: MutatingPageProps) {
  const supplier = getActiveSupplier(data);
  const plan = getSupplierCurrentPlan(data, supplier.id);
  const subscription = getSupplierSubscription(data, supplier.id);
  const summary = getSupplierUsageSummary(data, supplier.id);
  const billingAccount = data.billing_accounts.find((entry) => entry.supplier_id === supplier.id) ?? defaultBillingAccount(supplier);
  const [accountDraft, setAccountDraft] = useState<BillingAccount>({ ...billingAccount });

  function changePlan(planId: string) {
    setData(updateSupplierSubscriptionPlan(data, supplier.id, planId, supplier.user_id));
  }

  function saveBillingAccount() {
    setData(updateBillingAccount(data, supplier.id, accountDraft));
  }

  return (
    <Page>
      <BackButton onClick={() => navigate("/app/supplier")} label="공급업체 홈" />
      <PageTitle eyebrow="요금제/이용현황" title="이번 달 견적 참여와 수수료를 확인하세요." desc="실제 결제는 아직 연결하지 않고, 요금제와 청구 기준만 mock으로 관리합니다." />
      <BetaLimitationsNotice navigate={navigate} context="payment" />
      <section className="billingHero">
        <div>
          <span className="eyebrow">현재 요금제</span>
          <h2>{plan.name}</h2>
          <p>{subscription.current_period_start} ~ {subscription.current_period_end} · {supplierSubscriptionStatusLabels[subscription.status]}</p>
          <div className="chipLine">
            <span className="chip">{planLimitLabel(plan.quote_participation_limit)} 견적 참여</span>
            {plan.badge_enabled && <span className="chip">{plan.badge_label}</span>}
            {plan.priority_exposure_enabled && <span className="chip">상위노출 가능</span>}
            {plan.analytics_enabled && <span className="chip">통계 제공</span>}
          </div>
        </div>
        <button className="secondaryButton" type="button" onClick={() => navigate("/app/supplier/usage")}>이용내역 보기</button>
      </section>
      <div className="dashboardGrid">
        <Metric label="견적 참여 사용량" value={summary.quoteLimit <= 0 ? `${summary.usage.quotes_submitted_count}건` : `${summary.usage.quotes_submitted_count}/${summary.quoteLimit}건`} icon={<ReceiptText />} />
        <Metric label="남은 참여 가능" value={summary.remaining === Infinity ? "무제한" : `${summary.remaining}건`} icon={<ClipboardList />} />
        <Metric label="이번 달 거래 성사" value={`${summary.usage.deals_won_count}건`} icon={<PackageCheck />} />
        <Metric label="이번 달 거래액" value={money(summary.usage.total_deal_amount)} icon={<Landmark />} />
        <Metric label="예상 플랫폼 수수료" value={money(summary.expectedPlatformFees)} icon={<ReceiptText />} />
        <Metric label="다음 갱신일" value={subscription.current_period_end} icon={<RefreshCcw />} />
      </div>
      <UsageLimitNotice data={data} supplierId={supplier.id} navigate={navigate} />
      <SectionHeader title="요금제 변경 mock" />
      <div className="planGrid">
        {data.supplier_plans.filter((entry) => entry.is_active).sort((a, b) => a.sort_order - b.sort_order).map((entry) => (
          <PlanCard key={entry.id} plan={entry} active={entry.id === plan.id} onChange={() => changePlan(entry.id)} />
        ))}
      </div>
      <section className="billingAccountPanel">
        <div>
          <span className="eyebrow">청구 정보</span>
          <h2>결제수단 연결은 추후 제공됩니다.</h2>
          <p>현재는 관리자 정산 기준으로 수수료가 계산됩니다. 실제 PG/구독 연동 시 아래 정보가 고객/청구 계정으로 이전됩니다.</p>
          <div className="chipLine">
            <span className="chip">결제수단 {paymentMethodStatusLabels[billingAccount.payment_method_status]}</span>
            <span className="chip">{billingAccount.default_payment_method_type === "none" ? "기본 결제수단 없음" : billingAccount.default_payment_method_type}</span>
          </div>
        </div>
        <div className="formGrid">
          <Field label="청구 이메일">
            <input value={accountDraft.billing_email} onChange={(event) => setAccountDraft({ ...accountDraft, billing_email: event.target.value })} />
          </Field>
          <Field label="세금계산서 받을 이메일">
            <input value={accountDraft.invoice_recipient_email} onChange={(event) => setAccountDraft({ ...accountDraft, invoice_recipient_email: event.target.value })} />
          </Field>
          <Field label="담당자명">
            <input value={accountDraft.invoice_recipient_name} onChange={(event) => setAccountDraft({ ...accountDraft, invoice_recipient_name: event.target.value })} />
          </Field>
          <Field label="담당자 연락처">
            <input value={accountDraft.invoice_recipient_phone} onChange={(event) => setAccountDraft({ ...accountDraft, invoice_recipient_phone: event.target.value })} />
          </Field>
        </div>
        <div className="formActions">
          <button className="secondaryButton" type="button" onClick={saveBillingAccount}>청구정보 저장</button>
          <button className="ghostButton" type="button" disabled>결제수단 연결 예정</button>
        </div>
      </section>
    </Page>
  );
}

function SupplierUsagePage({ data, navigate }: PageProps) {
  const supplier = getActiveSupplier(data);
  const summary = getSupplierUsageSummary(data, supplier.id);
  const credits = data.quote_participation_credits.filter((credit) => credit.supplier_id === supplier.id);

  return (
    <Page>
      <BackButton onClick={() => navigate("/app/supplier/billing")} label="요금제/이용현황" />
      <PageTitle eyebrow="견적 참여 사용량" title="이번 달 참여 한도와 남은 건수를 확인하세요." desc="무료 플랜은 월 견적 참여 한도가 있으며, 한도 도달 시 업그레이드 안내가 표시됩니다." />
      <UsageLimitNotice data={data} supplierId={supplier.id} navigate={navigate} />
      <div className="dashboardGrid">
        <Metric label="현재 플랜" value={summary.plan.name} icon={<BadgeCheck />} />
        <Metric label="월 견적 한도" value={planLimitLabel(summary.quoteLimit)} icon={<ClipboardList />} />
        <Metric label="사용한 견적" value={`${summary.usage.quotes_submitted_count}건`} icon={<ReceiptText />} />
        <Metric label="남은 견적" value={summary.remaining === Infinity ? "무제한" : `${summary.remaining}건`} icon={<PackageCheck />} />
        <Metric label="매칭 조회" value={`${summary.usage.matched_requests_viewed_count}건`} icon={<SearchCheck />} />
        <Metric label="메시지" value={`${summary.usage.messages_sent_count}건`} icon={<Bell />} />
      </div>
      <SectionHeader title="견적 참여권 mock" />
      <div className="tableWrap">
        <table>
          <thead>
            <tr>
              <th>유형</th>
              <th>총 제공</th>
              <th>사용</th>
              <th>잔여</th>
              <th>만료일</th>
            </tr>
          </thead>
          <tbody>
            {credits.map((credit) => (
              <tr key={credit.id}>
                <td>{credit.credit_type}</td>
                <td>{credit.total_credits}건</td>
                <td>{credit.used_credits}건</td>
                <td>{credit.remaining_credits}건</td>
                <td>{credit.expires_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Page>
  );
}

function SupplierSettlementsPage({ data, navigate, setData }: MutatingPageProps) {
  const supplier = getActiveSupplier(data);
  const [filter, setFilter] = useState("전체");
  const fees = getPlatformFeesBySupplier(data, supplier.id);
  const settlements = getSupplierSettlements(data, supplier.id).filter((entry) => filter === "전체" || settlementStatusLabels[entry.status] === filter);
  const pendingFees = fees.filter((fee) => !["paid", "waived", "cancelled"].includes(fee.fee_status));

  return (
    <Page>
      <BackButton onClick={() => navigate("/app/supplier")} label="공급업체 홈" />
      <PageTitle eyebrow="정산 예정 내역" title="거래 완료 후 계산된 플랫폼 이용 수수료입니다." desc="실제 정산/납부 기능은 추후 결제 시스템 연동 후 제공됩니다." />
      <BetaLimitationsNotice navigate={navigate} context="payment" />
      <div className="dashboardGrid">
        <Metric label="이번 달 완료 거래액" value={money(settlements.reduce((sum, entry) => sum + entry.total_deal_amount, 0))} icon={<ReceiptText />} />
        <Metric label="플랫폼 수수료" value={money(settlements.reduce((sum, entry) => sum + entry.total_platform_fee, 0))} icon={<Landmark />} />
        <Metric label="미납/대기 수수료" value={money(pendingFees.reduce((sum, fee) => sum + fee.fee_amount, 0))} icon={<Bell />} />
        <Metric label="완료 거래 수" value={`${fees.length}건`} icon={<PackageCheck />} />
        <Metric label="면제 거래 수" value={`${fees.filter((fee) => fee.is_waived).length}건`} icon={<BadgeCheck />} />
        <Metric label="VAT mock" value={money(settlements.reduce((sum, entry) => sum + entry.total_vat_amount, 0))} icon={<ReceiptText />} />
      </div>
      <FilterTabs options={["전체", "정산 대기", "확정", "납부 완료", "취소"]} active={filter} onChange={setFilter} />
      <div className="settlementLayout">
        <div className="tableWrap">
          <table>
            <thead>
              <tr>
                <th>정산 기간</th>
                <th>거래금액</th>
                <th>수수료</th>
                <th>VAT mock</th>
                <th>정산 기준 금액</th>
                <th>상태</th>
                <th>예정일</th>
              </tr>
            </thead>
            <tbody>
              {settlements.map((entry) => (
                <tr key={entry.id}>
                  <td>{entry.period_start} ~ {entry.period_end}</td>
                  <td>{money(entry.total_deal_amount)}</td>
                  <td>{money(entry.total_platform_fee)}</td>
                  <td>{money(entry.total_vat_amount)}</td>
                  <td>{money(entry.total_settlement_amount)}</td>
                  <td><StatusBadge tone={settlementTone(entry.status)}>{settlementStatusLabels[entry.status]}</StatusBadge></td>
                  <td>{entry.payout_due_date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <section className="detailPanel">
          <span className="eyebrow">거래별 수수료</span>
          <h2>플랫폼 이용 수수료 내역</h2>
          {fees.map((fee) => {
            const deal = data.deals.find((entry) => entry.id === fee.deal_id);
            return (
              <div className="feeRow" key={fee.id}>
                <strong>{deal?.title ?? fee.deal_id}</strong>
                <span>{fee.category_name} · {(fee.commission_rate * 100).toFixed(1)}%</span>
                <span>{money(fee.deal_final_amount)} / 수수료 {money(fee.fee_amount)}</span>
                <StatusBadge tone={feeStatusTone(fee.fee_status)}>{platformFeeStatusLabels[fee.fee_status]}</StatusBadge>
              </div>
            );
          })}
          <button className="ghostButton" type="button" onClick={() => setData(data)}>정산 확인 mock</button>
        </section>
      </div>
    </Page>
  );
}

function AdminDashboard({ data, navigate }: PageProps) {
  const selected = data.quote_requests.filter((request) => request.status === "selected").length;
  const qualityScores = data.quote_requests.map((request) => request.request_quality_score ?? calculateRequestQuality(request, data.quote_request_items.filter((item) => item.quote_request_id === request.id)));
  const averageQuality = qualityScores.length ? Math.round(qualityScores.reduce((sum, score) => sum + score, 0) / qualityScores.length) : 0;
  const templateOrRepeat = data.quote_requests.filter((request) => request.input_method === "template" || request.input_method === "repeat").length;
  const noQuoteCount = data.quote_requests.filter((request) => data.quotes.every((quote) => quote.quote_request_id !== request.id)).length;
  const attachmentRequestCount = data.quote_requests.filter((request) => data.quote_attachments.some((attachment) => attachment.quote_request_id === request.id) || request.attachment_note).length;
  const categoryCounts = countBy(data.quote_requests, (request) => request.category_name);
  const regionCounts = countBy(data.quote_requests, (request) => request.delivery_region.split(" ")[0] || "미입력");

  return (
    <Page>
      <PageTitle eyebrow="관리자" title="관리자 대시보드" desc="전체 요청, 견적, 공급업체 현황을 운영자가 빠르게 확인합니다." />
      <div className="dashboardGrid">
        <Metric label="전체 요청" value={`${data.quote_requests.length}건`} icon={<ClipboardList />} />
        <Metric label="전체 견적" value={`${data.quotes.length}건`} icon={<ReceiptText />} />
        <Metric label="공급업체" value={`${data.supplier_profiles.length}곳`} icon={<Building2 />} />
        <Metric label="선택 완료" value={`${selected}건`} icon={<PackageCheck />} />
        <Metric label="평균 요청 품질" value={`${averageQuality}점`} icon={<BadgeCheck />} />
        <Metric label="첨부 요청" value={`${attachmentRequestCount}건`} icon={<Upload />} />
        <Metric label="템플릿/반복" value={`${templateOrRepeat}건`} icon={<RefreshCcw />} />
        <Metric label="무견적 요청" value={`${noQuoteCount}건`} icon={<SearchCheck />} />
      </div>
      <div className="adminInsightGrid">
        <StatList title="카테고리별 요청" items={categoryCounts} />
        <StatList title="지역별 요청" items={regionCounts} />
      </div>
      <div className="quickGrid">
        <ActionTile title="운영 대시보드" desc="신고, 후기, 신뢰도, 제재 지표를 봅니다." icon={<ShieldCheck />} onClick={() => navigate("/app/admin/operations")} />
        <ActionTile title="QA 체크리스트" desc="베타 출시 전 기능별 점검 상태를 관리합니다." icon={<Check />} onClick={() => navigate("/app/admin/qa")} />
        <ActionTile title="Supabase/배포 준비" desc="DB, RLS, Storage, 환경변수 상태를 점검합니다." icon={<ShieldCheck />} onClick={() => navigate("/app/admin/supabase")} />
        <ActionTile title="베타 피드백" desc="테스터 오류와 사용성 의견을 분류합니다." icon={<Bell />} onClick={() => navigate("/app/admin/feedback")} />
        <ActionTile title="신고/분쟁 관리" desc="접수된 신고와 거래 분쟁을 처리합니다." icon={<Bell />} onClick={() => navigate("/app/admin/reports")} />
        <ActionTile title="후기 관리" desc="후기 신고와 숨김 처리를 검토합니다." icon={<BadgeCheck />} onClick={() => navigate("/app/admin/reviews")} />
        <ActionTile title="신뢰도 관리" desc="공급업체 점수와 배지를 재계산합니다." icon={<Store />} onClick={() => navigate("/app/admin/reputation")} />
        <ActionTile title="제재/블랙리스트" desc="경고, 이용제한, 차단 목록을 관리합니다." icon={<ShieldCheck />} onClick={() => navigate("/app/admin/sanctions")} />
        <ActionTile title="견적요청 관리" desc="전체 요청 상태와 견적 수를 봅니다." icon={<ClipboardList />} onClick={() => navigate("/app/admin/requests")} />
        <ActionTile title="분석 모니터링" desc="OCR/AI 분석 요청과 변환 이력을 봅니다." icon={<SearchCheck />} onClick={() => navigate("/app/admin/analysis")} />
        <ActionTile title="거래 모니터링" desc="전체 거래 상태와 문제 발생 여부를 봅니다." icon={<ReceiptText />} onClick={() => navigate("/app/admin/deals")} />
        <ActionTile title="구매내역 모니터링" desc="매입 자료와 증빙 상태를 봅니다." icon={<PackageCheck />} onClick={() => navigate("/app/admin/purchases")} />
        <ActionTile title="장부 연동 관리" desc="오늘장사 전표 반영 상태를 봅니다." icon={<Landmark />} onClick={() => navigate("/app/admin/accounting")} />
        <ActionTile title="매출 대시보드" desc="거래액, 수수료, 구독 예상 매출을 봅니다." icon={<Landmark />} onClick={() => navigate("/app/admin/revenue")} />
        <ActionTile title="수수료 정책" desc="카테고리별 플랫폼 이용 수수료율을 관리합니다." icon={<Boxes />} onClick={() => navigate("/app/admin/commissions")} />
        <ActionTile title="요금제 관리" desc="공급업체 플랜과 참여 한도를 관리합니다." icon={<BadgeCheck />} onClick={() => navigate("/app/admin/plans")} />
        <ActionTile title="정산 관리" desc="공급업체별 수수료와 면제 처리를 봅니다." icon={<ReceiptText />} onClick={() => navigate("/app/admin/settlements")} />
        <ActionTile title="공급업체 관리" desc="승인 상태와 대응 카테고리를 확인합니다." icon={<UsersRound />} onClick={() => navigate("/app/admin/suppliers")} />
        <ActionTile title="카테고리 관리" desc="초기 카테고리 구조를 확인합니다." icon={<Boxes />} onClick={() => navigate("/app/admin/categories")} />
        <ActionTile title="청구 통합 관리" desc="PG/구독/청구 연동 준비 데이터를 확인합니다." icon={<Bell />} onClick={() => navigate("/app/admin/billing")} />
      </div>
    </Page>
  );
}

function AdminSupabasePage({ data, navigate }: PageProps) {
  const configured = isSupabaseConfigured();
  const liveReady = isLiveModeReady();
  const buckets = Object.values(storageBuckets);
  const envRows = [
    { label: "환경", value: environmentLabel(appConfig.appEnv), status: appConfig.appEnv === "production" ? "운영" : appConfig.appEnv === "beta" ? "베타" : "로컬" },
    { label: "Supabase URL", value: SUPABASE_PROJECT_URL, status: "입력됨" },
    { label: "Publishable key", value: configured ? "설정됨" : "미입력", status: configured ? "준비" : "필요" },
    { label: "Live data", value: appConfig.useLiveData ? "ON" : "OFF", status: liveReady ? "활성" : "대기" },
    { label: "Demo data", value: appConfig.enableDemoData ? "ON" : "OFF", status: appConfig.enableDemoData ? "허용" : "차단" },
    { label: "Mock AI", value: appConfig.enableMockAi ? "ON" : "OFF", status: appConfig.enableMockAi ? "mock" : "live" },
    { label: "Mock payment", value: appConfig.enableMockPayment ? "ON" : "OFF", status: appConfig.enableMockPayment ? "mock" : "live" },
    { label: "Mock settlement", value: appConfig.enableMockSettlement ? "ON" : "OFF", status: appConfig.enableMockSettlement ? "mock" : "live" },
  ];

  return (
    <Page>
      <BackButton onClick={() => navigate("/app/admin")} label="관리자 홈" />
      <PageTitle eyebrow="Supabase" title="DB/RLS/Storage 배포 준비 상태" desc="실제 DB 연결 전환에 필요한 환경, 마이그레이션, 보안 정책을 한곳에서 확인합니다." />
      <div className="dashboardGrid">
        <Metric label="프로젝트 URL" value="dewlendyeycxfmblecog" icon={<ShieldCheck />} />
        <Metric label="Publishable key" value={configured ? "설정됨" : "미입력"} icon={<BadgeCheck />} />
        <Metric label="Live 전환" value={liveReady ? "가능" : "대기"} icon={<RefreshCcw />} />
        <Metric label="Storage bucket" value={`${buckets.length}개`} icon={<Upload />} />
        <Metric label="작성 migration" value="5개" icon={<ClipboardList />} />
        <Metric label="현재 앱 데이터" value={data.is_demo ? "demo" : data.environment} icon={<PackageCheck />} />
      </div>

      <div className="twoColumn">
        <section className="toolPanel">
          <SectionHeader title="환경변수 상태" />
          <div className="tableWrap">
            <table>
              <thead><tr><th>항목</th><th>값</th><th>상태</th></tr></thead>
              <tbody>
                {envRows.map((row) => (
                  <tr key={row.label}>
                    <td>{row.label}</td>
                    <td><code>{row.value}</code></td>
                    <td><StatusBadge tone={row.status === "필요" ? "orange" : row.status === "활성" || row.status === "준비" ? "green" : "blue"}>{row.status}</StatusBadge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="toolPanel">
          <SectionHeader title="마이그레이션 적용 순서" />
          <div className="stackList">
            {[
              "001_initial_schema.sql",
              "002_rls_policies.sql",
              "003_storage_buckets.sql",
              "004_seed_beta_data.sql",
              "005_beta_operations.sql",
            ].map((file, index) => (
              <div className="stackRow" key={file}>
                <strong>{index + 1}. {file}</strong>
                <span>supabase/migrations</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="toolPanel">
        <SectionHeader title="라이브 전환 기능표" />
        <div className="tableWrap">
          <table>
            <thead><tr><th>기능</th><th>상태</th><th>메모</th></tr></thead>
            <tbody>
              {liveFeatureMatrix.map((feature) => (
                <tr key={feature.name}>
                  <td>{feature.name}</td>
                  <td><StatusBadge tone={liveFeatureTone(feature.status)}>{liveFeatureLabel(feature.status)}</StatusBadge></td>
                  <td>{feature.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="twoColumn">
        <section className="toolPanel">
          <SectionHeader title="Storage bucket" />
          <div className="chipList">
            {buckets.map((bucket) => <span className="tag" key={bucket}>{bucket}</span>)}
          </div>
          <p className="mutedText">private bucket이며 `{`{userId}/{kind}/{date}/{file}`}` 경로 기준으로 RLS가 적용됩니다.</p>
        </section>
        <section className="toolPanel">
          <SectionHeader title="배포 문서" />
          <div className="stackList">
            <div className="stackRow"><strong>Supabase 설정</strong><span>docs/supabase-setup.md</span></div>
            <div className="stackRow"><strong>배포 체크리스트</strong><span>docs/deployment-checklist.md</span></div>
            <div className="stackRow"><strong>RLS 테스트</strong><span>docs/rls-test-scenarios.md</span></div>
            <div className="stackRow"><strong>보안 점검표</strong><span>docs/security-checklist.md</span></div>
          </div>
        </section>
      </div>
    </Page>
  );
}

function AdminRevenuePage({ data, navigate }: PageProps) {
  const summary = getRevenueSummary(data);
  const categoryBreakdown = getCategoryRevenueBreakdown(data);
  const supplierRanking = getSupplierRevenueRanking(data);
  const monthlyTrend = getMonthlyRevenueTrend(data);
  const planCounts = countBy(data.supplier_subscriptions, (subscription) => data.supplier_plans.find((plan) => plan.id === subscription.plan_id)?.name ?? "미지정");

  return (
    <Page>
      <BackButton onClick={() => navigate("/app/admin")} label="관리자 홈" />
      <PageTitle eyebrow="매출 대시보드" title="플랫폼 거래액과 예상 수익을 한눈에 확인하세요." desc="실제 결제 연동 전까지는 수수료와 구독 예상 매출을 mock 기준으로 계산합니다." />
      <div className="dashboardGrid">
        <Metric label="총 거래액" value={money(summary.totalDealAmount)} icon={<ReceiptText />} />
        <Metric label="완료/수수료 대상 거래액" value={money(summary.completedDealAmount)} icon={<PackageCheck />} />
        <Metric label="예상 플랫폼 수수료" value={money(summary.expectedPlatformFees)} icon={<Landmark />} />
        <Metric label="확정 수수료" value={money(summary.confirmedPlatformFees)} icon={<BadgeCheck />} />
        <Metric label="납부 완료액 mock" value={money(summary.paidPlatformFees)} icon={<Check />} />
        <Metric label="미납/대기액 mock" value={money(summary.pendingPlatformFees)} icon={<Bell />} />
        <Metric label="유료 공급업체 수" value={`${summary.paidSupplierCount}곳`} icon={<Store />} />
        <Metric label="월 구독 예상 매출" value={money(summary.monthlySubscriptionRevenue)} icon={<RefreshCcw />} />
        <Metric label="총 예상 매출" value={money(summary.totalExpectedRevenue)} icon={<Landmark />} />
      </div>
      <div className="adminInsightGrid">
        <MoneyStatList title="월별 플랫폼 수수료" items={monthlyTrend} secondaryLabel="거래액" />
        <MoneyStatList title="카테고리별 수수료" items={categoryBreakdown} secondaryLabel="거래액" />
        <MoneyStatList title="공급업체 수수료 TOP" items={supplierRanking} secondaryLabel="거래액" />
        <StatList title="요금제별 공급업체 수" items={planCounts} />
      </div>
    </Page>
  );
}

function AdminCommissionsPage({ data, setData }: { data: AppData; setData: (data: AppData) => void }) {
  const [selectedPolicyId, setSelectedPolicyId] = useState(data.commission_policies[0]?.id ?? "");
  const selectedPolicy = data.commission_policies.find((policy) => policy.id === selectedPolicyId) ?? data.commission_policies[0];
  const [draft, setDraft] = useState<CommissionPolicy | null>(selectedPolicy ? { ...selectedPolicy } : null);

  useEffect(() => {
    if (selectedPolicy) setDraft({ ...selectedPolicy });
  }, [selectedPolicy?.id]);

  function savePolicy() {
    if (!draft) return;
    setData(updateCommissionPolicy(data, draft.id, draft));
  }

  return (
    <Page>
      <PageTitle eyebrow="수수료 정책" title="카테고리별 플랫폼 이용 수수료를 관리하세요." desc="수수료율 변경은 이후 완료되는 거래부터 적용됩니다. 기존 완료 거래의 수수료는 변경하지 않습니다." />
      <div className="adminSupplierLayout">
        <div className="tableWrap">
          <table>
            <thead>
              <tr>
                <th>카테고리</th>
                <th>수수료율</th>
                <th>최소</th>
                <th>최대</th>
                <th>VAT</th>
                <th>상태</th>
                <th>예상 예시</th>
              </tr>
            </thead>
            <tbody>
              {data.commission_policies.map((policy) => (
                <tr className={selectedPolicy?.id === policy.id ? "selectedRow" : ""} key={policy.id} onClick={() => setSelectedPolicyId(policy.id)}>
                  <td>{policy.category_name}</td>
                  <td>{(policy.commission_rate * 100).toFixed(1)}%</td>
                  <td>{money(policy.min_fee_amount)}</td>
                  <td>{policy.max_fee_amount ? money(policy.max_fee_amount) : "없음"}</td>
                  <td>{vatPolicyLabels[policy.vat_policy]}</td>
                  <td><StatusBadge tone={policy.is_active ? "green" : "gray"}>{policy.is_active ? "활성" : "비활성"}</StatusBadge></td>
                  <td>{money(calculateCommissionAmount(500000, policy.commission_rate, policy.min_fee_amount, policy.max_fee_amount, policy.fixed_fee_amount))}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {draft && (
          <aside className="adminSupplierDetail">
            <span className="eyebrow">정책 수정 mock</span>
            <h2>{draft.category_name}</h2>
            <Field label="수수료율 %">
              <input type="number" step="0.1" value={Number((draft.commission_rate * 100).toFixed(2))} onChange={(event) => setDraft({ ...draft, commission_rate: Number(event.target.value) / 100 })} />
            </Field>
            <Field label="최소 수수료">
              <input type="number" min="0" value={draft.min_fee_amount} onChange={(event) => setDraft({ ...draft, min_fee_amount: Number(event.target.value) })} />
            </Field>
            <Field label="최대 수수료">
              <input type="number" min="0" value={draft.max_fee_amount} onChange={(event) => setDraft({ ...draft, max_fee_amount: Number(event.target.value) })} />
            </Field>
            <Field label="VAT 정책">
              <select value={draft.vat_policy} onChange={(event) => setDraft({ ...draft, vat_policy: event.target.value as CommissionPolicy["vat_policy"] })}>
                {Object.entries(vatPolicyLabels).map(([value, label]) => <option value={value} key={value}>{label}</option>)}
              </select>
            </Field>
            <Toggle checked={draft.is_active} label="정책 활성화" onChange={(checked) => setDraft({ ...draft, is_active: checked })} />
            <Field label="관리자 메모">
              <textarea value={draft.admin_memo} onChange={(event) => setDraft({ ...draft, admin_memo: event.target.value })} />
            </Field>
            <div className="summaryFacts">
              <span>수수료 방식: {commissionFeeTypeLabels[draft.fee_type]}</span>
              <span>500,000원 예시: {money(calculateCommissionAmount(500000, draft.commission_rate, draft.min_fee_amount, draft.max_fee_amount, draft.fixed_fee_amount))}</span>
            </div>
            <button className="primaryButton" type="button" onClick={savePolicy}>정책 저장 mock</button>
          </aside>
        )}
      </div>
    </Page>
  );
}

function AdminPlansPage({ data, setData }: { data: AppData; setData: (data: AppData) => void }) {
  const [selectedPlanId, setSelectedPlanId] = useState(data.supplier_plans[0]?.id ?? "");
  const selectedPlan = data.supplier_plans.find((plan) => plan.id === selectedPlanId) ?? data.supplier_plans[0];
  const [draft, setDraft] = useState<SupplierPlan | null>(selectedPlan ? { ...selectedPlan } : null);
  const [supplierId, setSupplierId] = useState(data.supplier_profiles[0]?.id ?? "");
  const [targetPlanId, setTargetPlanId] = useState(data.supplier_plans[0]?.id ?? "");

  useEffect(() => {
    if (selectedPlan) setDraft({ ...selectedPlan });
  }, [selectedPlan?.id]);

  function savePlan() {
    if (!draft) return;
    setData(updateSupplierPlan(data, draft.id, draft));
  }

  return (
    <Page>
      <PageTitle eyebrow="요금제 관리" title="공급업체 플랜과 견적 참여 한도를 관리하세요." desc="실제 구독 결제 없이 관리자 수동 변경과 mock 요금제만 제공합니다." />
      <div className="planGrid">
        {data.supplier_plans.sort((a, b) => a.sort_order - b.sort_order).map((plan) => {
          const count = data.supplier_subscriptions.filter((subscription) => subscription.plan_id === plan.id).length;
          return (
            <button className={selectedPlanId === plan.id ? "planAdminCard active" : "planAdminCard"} type="button" key={plan.id} onClick={() => setSelectedPlanId(plan.id)}>
              <strong>{plan.name}</strong>
              <span>{money(plan.monthly_price)} / 월</span>
              <span>{planLimitLabel(plan.quote_participation_limit)} 견적 참여</span>
              <StatusBadge tone={plan.is_active ? "green" : "gray"}>{plan.is_active ? "활성" : "비활성"}</StatusBadge>
              <small>가입 공급업체 {count}곳</small>
            </button>
          );
        })}
      </div>
      {draft && (
        <section className="billingAccountPanel">
          <div>
            <span className="eyebrow">요금제 수정 mock</span>
            <h2>{draft.name}</h2>
            <p>상위노출, 통계 제공, 파트너 배지를 기능 플래그로 관리합니다.</p>
          </div>
          <div className="formGrid">
            <Field label="요금제명"><input value={draft.name} onChange={(event) => setDraft({ ...draft, name: event.target.value })} /></Field>
            <Field label="월 가격"><input type="number" min="0" value={draft.monthly_price} onChange={(event) => setDraft({ ...draft, monthly_price: Number(event.target.value) })} /></Field>
            <Field label="연 가격"><input type="number" min="0" value={draft.yearly_price} onChange={(event) => setDraft({ ...draft, yearly_price: Number(event.target.value) })} /></Field>
            <Field label="월 견적 참여 한도"><input type="number" min="0" value={draft.quote_participation_limit} onChange={(event) => setDraft({ ...draft, quote_participation_limit: Number(event.target.value) })} /></Field>
            <Field label="매칭 요청 조회 한도"><input type="number" min="0" value={draft.matched_request_view_limit} onChange={(event) => setDraft({ ...draft, matched_request_view_limit: Number(event.target.value) })} /></Field>
            <Field label="배지명"><input value={draft.badge_label} onChange={(event) => setDraft({ ...draft, badge_label: event.target.value })} /></Field>
          </div>
          <div className="toggleGrid">
            <Toggle checked={draft.priority_exposure_enabled} label="상위노출 가능" onChange={(checked) => setDraft({ ...draft, priority_exposure_enabled: checked })} />
            <Toggle checked={draft.analytics_enabled} label="통계 제공" onChange={(checked) => setDraft({ ...draft, analytics_enabled: checked })} />
            <Toggle checked={draft.badge_enabled} label="배지 제공" onChange={(checked) => setDraft({ ...draft, badge_enabled: checked })} />
            <Toggle checked={draft.is_active} label="요금제 활성화" onChange={(checked) => setDraft({ ...draft, is_active: checked })} />
          </div>
          <button className="primaryButton" type="button" onClick={savePlan}>요금제 저장 mock</button>
        </section>
      )}
      <section className="billingAccountPanel">
        <div>
          <span className="eyebrow">공급업체 플랜 수동 변경</span>
          <h2>관리자가 공급업체 플랜을 즉시 변경할 수 있습니다.</h2>
        </div>
        <div className="formGrid">
          <Field label="공급업체">
            <select value={supplierId} onChange={(event) => setSupplierId(event.target.value)}>
              {data.supplier_profiles.map((supplier) => <option value={supplier.id} key={supplier.id}>{supplier.business_name}</option>)}
            </select>
          </Field>
          <Field label="변경할 요금제">
            <select value={targetPlanId} onChange={(event) => setTargetPlanId(event.target.value)}>
              {data.supplier_plans.map((plan) => <option value={plan.id} key={plan.id}>{plan.name}</option>)}
            </select>
          </Field>
        </div>
        <button className="secondaryButton" type="button" onClick={() => setData(updateSupplierSubscriptionPlan(data, supplierId, targetPlanId))}>플랜 변경 mock</button>
      </section>
    </Page>
  );
}

function AdminSettlementsPage({ data, setData }: { data: AppData; setData: (data: AppData) => void }) {
  const [filter, setFilter] = useState("전체");
  const [waiverReason, setWaiverReason] = useState("초기 입점 프로모션");
  const settlements = data.settlements.filter((entry) => filter === "전체" || settlementStatusLabels[entry.status] === filter);
  const waivableFees = data.platform_fees.filter((fee) => !fee.is_waived && fee.fee_status !== "paid");

  return (
    <Page>
      <PageTitle eyebrow="정산 관리" title="전체 정산 예정/완료 내역을 관리하세요." desc="실제 지급, 청구, 송금은 아직 수행하지 않고 상태와 면제 처리만 mock으로 제공합니다." />
      <FilterTabs options={["전체", "초안", "정산 대기", "확정", "납부 완료", "취소"]} active={filter} onChange={setFilter} />
      <div className="settlementLayout">
        <div className="tableWrap">
          <table>
            <thead>
              <tr>
                <th>공급업체</th>
                <th>정산 기간</th>
                <th>완료 거래액</th>
                <th>플랫폼 수수료</th>
                <th>VAT mock</th>
                <th>상태</th>
                <th>예정일</th>
                <th>액션</th>
              </tr>
            </thead>
            <tbody>
              {settlements.map((entry) => (
                <tr key={entry.id}>
                  <td>{supplierName(data, entry.supplier_id)}</td>
                  <td>{entry.period_start} ~ {entry.period_end}</td>
                  <td>{money(entry.total_deal_amount)}</td>
                  <td>{money(entry.total_platform_fee)}</td>
                  <td>{money(entry.total_vat_amount)}</td>
                  <td><StatusBadge tone={settlementTone(entry.status)}>{settlementStatusLabels[entry.status]}</StatusBadge></td>
                  <td>{entry.payout_due_date}</td>
                  <td>
                    <select value={entry.status} onChange={(event) => setData(updateSettlementStatus(data, entry.id, event.target.value as SettlementStatus))}>
                      {Object.entries(settlementStatusLabels).map(([value, label]) => <option value={value} key={value}>{label}</option>)}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <section className="detailPanel">
          <span className="eyebrow">수수료 면제 mock</span>
          <h2>프로모션/운영 조정</h2>
          <Field label="면제 사유">
            <select value={waiverReason} onChange={(event) => setWaiverReason(event.target.value)}>
              {["초기 입점 프로모션", "운영자 조정", "거래 취소 보정", "분쟁 보정", "테스트 거래", "VIP 공급업체"].map((reason) => <option key={reason}>{reason}</option>)}
            </select>
          </Field>
          {waivableFees.slice(0, 6).map((fee) => (
            <div className="feeRow" key={fee.id}>
              <strong>{supplierName(data, fee.supplier_id)}</strong>
              <span>{fee.category_name} · {money(fee.fee_amount)}</span>
              <button className="ghostButton compact" type="button" onClick={() => setData(waivePlatformFee(data, fee.id, waiverReason))}>면제 처리</button>
            </div>
          ))}
        </section>
      </div>
    </Page>
  );
}

function AdminBillingPage({ data, navigate, setData }: MutatingPageProps) {
  const summary = getRevenueSummary(data);
  const [feeStatus, setFeeStatus] = useState<PlatformFeeStatus>("confirmed");

  return (
    <Page>
      <BackButton onClick={() => navigate("/app/admin")} label="관리자 홈" />
      <PageTitle eyebrow="청구/수수료 통합" title="PG, 구독, 정산 연동 준비 데이터를 확인하세요." desc="외부 결제 provider ID는 mock 또는 빈 값으로 유지합니다." />
      <div className="dashboardGrid">
        <Metric label="청구 계정" value={`${data.billing_accounts.length}곳`} icon={<Store />} />
        <Metric label="과금 이벤트" value={`${data.billing_events.length}건`} icon={<Bell />} />
        <Metric label="구독 예상 매출" value={money(summary.monthlySubscriptionRevenue)} icon={<RefreshCcw />} />
        <Metric label="총 예상 매출" value={money(summary.totalExpectedRevenue)} icon={<Landmark />} />
      </div>
      <div className="adminInsightGrid">
        <section className="detailPanel">
          <span className="eyebrow">최근 과금 이벤트</span>
          <h2>billing_events</h2>
          {data.billing_events.slice(0, 8).map((event) => (
            <div className="feeRow" key={event.id}>
              <strong>{event.event_type}</strong>
              <span>{supplierName(data, event.supplier_id)} · {money(event.amount)} · {event.status}</span>
            </div>
          ))}
        </section>
        <section className="detailPanel">
          <span className="eyebrow">청구 계정</span>
          <h2>billing_accounts</h2>
          {data.billing_accounts.map((account) => (
            <div className="feeRow" key={account.id}>
              <strong>{supplierName(data, account.supplier_id)}</strong>
              <span>{account.billing_email} · {paymentMethodStatusLabels[account.payment_method_status]}</span>
            </div>
          ))}
        </section>
      </div>
      <SectionHeader title="수수료 상태 변경 mock" />
      <section className="filterPanel">
        <select value={feeStatus} onChange={(event) => setFeeStatus(event.target.value as PlatformFeeStatus)}>
          {Object.entries(platformFeeStatusLabels).map(([value, label]) => <option value={value} key={value}>{label}</option>)}
        </select>
      </section>
      <div className="tableWrap">
        <table>
          <thead>
            <tr>
              <th>공급업체</th>
              <th>거래</th>
              <th>수수료</th>
              <th>상태</th>
              <th>상태 변경</th>
            </tr>
          </thead>
          <tbody>
            {data.platform_fees.map((fee) => (
              <tr key={fee.id}>
                <td>{supplierName(data, fee.supplier_id)}</td>
                <td>{data.deals.find((deal) => deal.id === fee.deal_id)?.title ?? fee.deal_id}</td>
                <td>{money(fee.fee_amount)}</td>
                <td><StatusBadge tone={feeStatusTone(fee.fee_status)}>{platformFeeStatusLabels[fee.fee_status]}</StatusBadge></td>
                <td><button className="ghostButton compact" type="button" onClick={() => setData(updatePlatformFeeStatus(data, fee.id, feeStatus))}>적용</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Page>
  );
}

function AdminRequestsPage({ data, navigate }: PageProps) {
  return (
    <Page>
      <PageTitle eyebrow="관리자" title="전체 견적요청 관리" desc="요청별 상태, 품목 수, 도착 견적 수를 확인합니다." />
      <RequestList data={data} requests={data.quote_requests} navigate={navigate} />
    </Page>
  );
}

function AdminSuppliersPage({ data, setData }: { data: AppData; setData: (data: AppData) => void }) {
  const [statusFilter, setStatusFilter] = useState("전체");
  const [categoryFilter, setCategoryFilter] = useState("전체");
  const [regionFilter, setRegionFilter] = useState("");
  const [selectedSupplierId, setSelectedSupplierId] = useState(data.supplier_profiles[0]?.id ?? "");
  const [adminMemo, setAdminMemo] = useState("관리자 검토 완료");
  const suppliers = data.supplier_profiles
    .filter((supplier) => statusFilter === "전체" || supplier.approval_status === statusFilter)
    .filter((supplier) => categoryFilter === "전체" || supplier.categories.includes(categoryFilter))
    .filter((supplier) => !regionFilter.trim() || supplier.service_regions.some((region) => region.includes(regionFilter.trim())) || (supplier.address ?? "").includes(regionFilter.trim()));
  const selectedSupplier = data.supplier_profiles.find((supplier) => supplier.id === selectedSupplierId) ?? suppliers[0] ?? data.supplier_profiles[0];
  const selectedDocs = selectedSupplier ? data.supplier_documents.filter((document) => document.supplier_id === selectedSupplier.id) : [];
  const selectedStats = selectedSupplier ? supplierStatsFor(data, selectedSupplier.id) : null;

  function changeStatus(status: SupplierProfile["approval_status"]) {
    if (!selectedSupplier) return;
    const nextData = updateSupplierApprovalStatus(data, selectedSupplier.id, status, adminMemo || supplierApprovalLabels[status]);
    setData(nextData);
  }

  return (
    <Page>
      <PageTitle eyebrow="관리자" title="공급업체 승인/관리" desc="입점 신청을 확인하고 승인, 보완 요청, 반려, 이용 제한 상태를 즉시 반영합니다." />
      <section className="filterPanel">
        <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
          <option value="전체">전체</option>
          {Object.entries(supplierApprovalLabels).map(([value, label]) => <option value={value} key={value}>{label}</option>)}
        </select>
        <select value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)}>
          <option>전체</option>
          {data.categories.map((category) => <option key={category.id}>{category.name}</option>)}
        </select>
        <input value={regionFilter} onChange={(event) => setRegionFilter(event.target.value)} placeholder="지역 검색" />
      </section>
      <div className="adminSupplierLayout">
        <div className="tableWrap">
          <table>
            <thead>
              <tr>
                <th>업체명</th>
                <th>대표자</th>
                <th>사업자번호</th>
                <th>카테고리</th>
                <th>납품 지역</th>
                <th>신청일</th>
                <th>상태</th>
                <th>인증</th>
                <th>견적/거래</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.map((supplier) => {
                const docs = data.supplier_documents.filter((document) => document.supplier_id === supplier.id);
                const stats = supplierStatsFor(data, supplier.id);
                return (
                  <tr className={selectedSupplier?.id === supplier.id ? "selectedRow" : ""} key={supplier.id} onClick={() => setSelectedSupplierId(supplier.id)}>
                    <td>{supplier.business_name}</td>
                    <td>{supplier.representative_name}</td>
                    <td>{supplier.business_number}</td>
                    <td>{supplier.categories.join(", ")}</td>
                    <td>{supplier.service_regions.slice(0, 2).join(", ")}</td>
                    <td>{supplier.created_at.slice(0, 10)}</td>
                    <td><StatusBadge tone={supplier.approval_status === "approved" ? "green" : supplier.approval_status === "rejected" || supplier.approval_status === "suspended" ? "gray" : "orange"}>{supplierApprovalLabels[supplier.approval_status]}</StatusBadge></td>
                    <td>{docs.filter((document) => document.status === "approved").length}/{docs.length}</td>
                    <td>{stats.total_quotes_submitted}건/{stats.selected_quotes_count}건</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {selectedSupplier && selectedStats && (
          <aside className="adminSupplierDetail">
            <span className="eyebrow">관리자 상세</span>
            <h2>{selectedSupplier.business_name}</h2>
            <p>{selectedSupplier.description}</p>
            <div className="summaryFacts">
              <span>대표자: {selectedSupplier.representative_name}</span>
              <span>담당자: {selectedSupplier.manager_name ?? "미입력"}</span>
              <span>연락처: {selectedSupplier.phone}</span>
              <span>주소: {selectedSupplier.address ?? "미입력"}</span>
              <span>응답률: {selectedStats.response_rate}%</span>
              <span>평점: {selectedStats.rating || "신규"}</span>
            </div>
            <InfoPanel title="인증자료" items={selectedDocs.length ? selectedDocs.map((document) => `${supplierDocumentTypeLabels[document.document_type]} · ${supplierDocumentStatusLabels[document.status]}`) : ["등록된 인증자료 없음"]} />
            <InfoPanel title="취급/납품 조건" items={[...selectedSupplier.categories, ...selectedSupplier.service_regions, selectedSupplier.delivery_fee_policy ?? "배송비 협의"]} />
            <Field label="관리자 메모">
              <textarea value={adminMemo} onChange={(event) => setAdminMemo(event.target.value)} />
            </Field>
            <div className="adminActionGrid">
              <button className="primaryButton compact" type="button" onClick={() => changeStatus("approved")}>승인</button>
              <button className="secondaryButton compact" type="button" onClick={() => changeStatus("needs_revision")}>보완 요청</button>
              <button className="ghostButton compact" type="button" onClick={() => changeStatus("rejected")}>반려</button>
              <button className="ghostButton compact" type="button" onClick={() => changeStatus("suspended")}>이용 제한</button>
            </div>
          </aside>
        )}
      </div>
    </Page>
  );
}

function AdminCategoriesPage({ data }: { data: AppData }) {
  return (
    <Page>
      <PageTitle eyebrow="관리자" title="카테고리 관리" desc="MVP 초기 카테고리입니다. 추후 Supabase categories 테이블로 옮길 수 있습니다." />
      <div className="categoryList">
        {data.categories.map((category) => (
          <div className="categoryRow" key={category.id}>
            <span>{category.sort_order}</span>
            <strong>{category.name}</strong>
            <StatusBadge tone={category.is_active ? "green" : "gray"}>{category.is_active ? "활성" : "비활성"}</StatusBadge>
          </div>
        ))}
      </div>
    </Page>
  );
}

function SupplierStatusNotice({ supplier, navigate }: { supplier: SupplierProfile; navigate: Navigate }) {
  const copy: Record<SupplierProfile["approval_status"], { title: string; desc: string; action: string }> = {
    pending: { title: "입점 신청 검토 중입니다.", desc: "승인 후 견적요청을 받을 수 있습니다.", action: "프로필 보완" },
    needs_revision: { title: "보완이 필요한 항목이 있습니다.", desc: supplier.admin_memo || "관리자 안내에 따라 정보를 수정해 주세요.", action: "정보 수정" },
    approved: { title: "입점 승인이 완료되었습니다.", desc: "지금부터 견적요청에 참여할 수 있습니다.", action: "매칭 조건 관리" },
    rejected: { title: "입점 신청이 반려되었습니다.", desc: supplier.rejection_reason || "자세한 사유는 관리자 안내를 확인해 주세요.", action: "재신청 UI" },
    suspended: { title: "운영 정책에 따라 일시적으로 이용이 제한되었습니다.", desc: "견적 제출 기능이 제한됩니다.", action: "프로필 확인" },
  };
  const item = copy[supplier.approval_status];
  return (
    <section className={supplier.approval_status === "approved" ? "statusNotice approved" : "statusNotice"}>
      <div>
        <StatusBadge tone={supplier.approval_status === "approved" ? "green" : supplier.approval_status === "rejected" || supplier.approval_status === "suspended" ? "gray" : "orange"}>
          {supplierApprovalLabels[supplier.approval_status]}
        </StatusBadge>
        <h2>{item.title}</h2>
        <p>{item.desc}</p>
      </div>
      <button className="secondaryButton" type="button" onClick={() => navigate(supplier.approval_status === "approved" ? "/app/supplier/settings" : "/app/supplier/profile")}>{item.action}</button>
    </section>
  );
}

function SupplierRequestList({ data, supplier, requests, navigate }: { data: AppData; supplier: SupplierProfile; requests: QuoteRequest[]; navigate: Navigate }) {
  if (requests.length === 0) {
    return <EmptyState icon={<SearchCheck />} title="조건에 맞는 요청이 없습니다." desc="카테고리와 납품 가능 지역을 조정하면 더 많은 요청을 볼 수 있습니다." />;
  }

  return (
    <div className="requestGrid">
      {requests.map((request) => {
        const itemCount = data.quote_request_items.filter((item) => item.quote_request_id === request.id).length;
        const quoteCount = data.quotes.filter((quote) => quote.quote_request_id === request.id).length;
        const submitted = data.quotes.some((quote) => quote.quote_request_id === request.id && quote.supplier_id === supplier.id);
        const matchScore = calculateSupplierMatchScore(supplier, request);
        return (
          <article className="requestCard supplierRequestCard" key={request.id} onClick={() => navigate(`/app/supplier/requests/${request.id}`)}>
            <div className="cardTopline">
              <StatusBadge tone={submitted ? "green" : request.urgent ? "orange" : "blue"}>{submitted ? "제출 완료" : request.urgent ? "긴급" : "견적 가능"}</StatusBadge>
              <span>매칭 {matchScore}점</span>
            </div>
            <h3>{request.title}</h3>
            <p>{request.description}</p>
            <div className="cardQualityLine">
              <span>{request.category_name}</span>
              <span>{request.delivery_region}</span>
              <span>품질 {request.request_quality_score ?? calculateRequestQuality(request, [])}점</span>
            </div>
            <div className="cardMeta">
              <span><CalendarDays size={15} /> {request.desired_delivery_date}</span>
              <span><PackageCheck size={15} /> 품목 {itemCount}개</span>
              <span><ReceiptText size={15} /> 견적 {quoteCount}건</span>
              <span>세금계산서 {yesNo(request.need_tax_invoice)}</span>
              <span>카드 {yesNo(request.card_payment_required)}</span>
            </div>
            <button className="textLink" type="button">견적 입력 <ArrowRight size={15} /></button>
          </article>
        );
      })}
    </div>
  );
}

function InfoPanel({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="infoPanel">
      <h2>{title}</h2>
      <div className="chipLine">
        {items.map((item) => <span className="chip" key={item}>{item}</span>)}
      </div>
    </section>
  );
}

function BetaLimitationsNotice({ navigate, context }: { navigate: Navigate; context: "home" | "analysis" | "accounting" | "payment" }) {
  if (!appConfig.enableBetaBadge && appConfig.appEnv === "production") return null;
  const copy = {
    home: {
      title: "베타 테스트 안내",
      body: "현재는 제한된 베타 단계입니다. 앱 내 결제, 세금계산서 자동 발행, 문자/카카오 알림은 제공하지 않습니다.",
    },
    analysis: {
      title: "자료분석은 테스트 단계입니다.",
      body: "베타 기간의 OCR/AI 결과는 검토용이며 실제 품목, 금액, 세금 정보는 직접 확인해야 합니다.",
    },
    accounting: {
      title: "장부 연동은 mock 상태입니다.",
      body: "베타 기간의 오늘장사 전표 반영과 세금 관련 정보는 참고용이며 실제 신고 전 별도 확인이 필요합니다.",
    },
    payment: {
      title: "결제/정산은 실제 청구가 아닙니다.",
      body: "베타 기간의 요금제, 수수료, 정산 내역은 테스트 계산값이며 결제나 지급이 발생하지 않습니다.",
    },
  }[context];

  return (
    <section className="betaLimitNotice">
      <ShieldCheck size={20} />
      <div>
        <strong>{copy.title}</strong>
        <p>{copy.body}</p>
      </div>
      <button className="ghostButton compact" type="button" onClick={() => navigate("/beta")}>자세히</button>
    </section>
  );
}

function ReviewCard({ review }: { review: { id: string; rating: number; content: string; created_at: string } }) {
  return (
    <article className="reviewCard">
      <strong>평점 {review.rating}</strong>
      <p>{review.content}</p>
      <small>{review.created_at.slice(0, 10)}</small>
    </article>
  );
}

function RequestList({ data, requests, navigate }: { data: AppData; requests: QuoteRequest[]; navigate: Navigate }) {
  if (requests.length === 0) return <EmptyState icon={<ClipboardList />} title="표시할 요청이 없습니다." desc="새 견적요청을 등록해 보세요." />;

  return (
    <div className="requestGrid">
      {requests.map((request) => {
        const items = data.quote_request_items.filter((entry) => entry.quote_request_id === request.id);
        const quotes = data.quotes.filter((entry) => entry.quote_request_id === request.id);
        const qualityScore = request.request_quality_score ?? calculateRequestQuality(request, items);
        return (
          <article className="requestCard" key={request.id} onClick={() => navigate(`/app/requests/${request.id}`)}>
            <div className="cardTopline">
              <StatusBadge tone={request.status === "selected" ? "green" : request.status === "open" ? "orange" : "blue"}>
                {requestStatusLabels[request.status]}
              </StatusBadge>
              <span>{request.category_name}</span>
            </div>
            <h3>{request.title}</h3>
            <p>{request.description}</p>
            <div className="cardQualityLine">
              <span>품질 {qualityScore}점</span>
              <span>{request.input_method ? requestInputMethodLabels[request.input_method] : "직접 입력"}</span>
              {request.urgent && <span>긴급</span>}
            </div>
            <div className="cardMeta">
              <span><CalendarDays size={15} /> {request.desired_delivery_date}</span>
              <span><PackageCheck size={15} /> 품목 {items.length}개</span>
              <span><ReceiptText size={15} /> 견적 {quotes.length}건</span>
            </div>
            <button className="textLink" type="button">
              상세 보기 <ArrowRight size={15} />
            </button>
          </article>
        );
      })}
    </div>
  );
}

function RequestSummary({ data, request, items }: { data: AppData; request: QuoteRequest; items: QuoteRequestItem[] }) {
  const quoteCount = data.quotes.filter((quoteEntry) => quoteEntry.quote_request_id === request.id).length;
  const attachments = data.quote_attachments.filter((attachment) => attachment.quote_request_id === request.id);
  const qualityScore = request.request_quality_score ?? calculateRequestQuality(request, items, attachments);
  const expectedSupplierCount = request.expected_supplier_count ?? estimateSupplierMatches(data, request.category_name, request.delivery_region, request.need_tax_invoice, request.card_payment_required);
  const estimatedSelectedAmount = request.previous_amount && request.estimated_savings_amount ? request.previous_amount - request.estimated_savings_amount : undefined;
  const savings = calculateEstimatedSavings(request.previous_amount, estimatedSelectedAmount);

  return (
    <section className="detailBand">
      <div className="detailHeader">
        <div>
          <span className="eyebrow">{request.category_name}</span>
          <h1>{request.title}</h1>
          <p>{request.description}</p>
        </div>
        <StatusBadge tone={request.status === "selected" ? "green" : request.status === "open" ? "orange" : "blue"}>{requestStatusLabels[request.status]}</StatusBadge>
      </div>
      <div className="requestInsightGrid">
        <QualityMeter score={qualityScore} />
        <div className="matchEstimate">
          <span>예상 응답 업체</span>
          <strong>{expectedSupplierCount}곳</strong>
        </div>
        <div className="matchEstimate">
          <span>예상 절감</span>
          <strong>{request.estimated_savings_amount ? money(request.estimated_savings_amount) : savings.amount ? money(savings.amount) : "계산 전"}</strong>
        </div>
      </div>
      <div className="detailMeta">
        <span>입력 방식: {request.input_method ? requestInputMethodLabels[request.input_method] : "직접 입력"}</span>
        <span>배송 지역: {request.delivery_region}</span>
        {request.delivery_address && <span>위치: {request.delivery_address}</span>}
        <span>희망 납품일: {request.desired_delivery_date}</span>
        {request.preferred_delivery_time && <span>희망 시간: {request.preferred_delivery_time}</span>}
        <span>세금계산서: {yesNo(request.need_tax_invoice)}</span>
        <span>카드결제 필수: {yesNo(request.card_payment_required)}</span>
        <span>배송비 포함: {yesNo(request.include_delivery_fee ?? true)}</span>
        <span>대체품 허용: {yesNo(request.allow_alternatives ?? true)}</span>
        {request.urgent && <span>긴급 요청</span>}
        {request.budget_min || request.budget_max ? <span>예산: {request.budget_min ? money(request.budget_min) : "하한 없음"} ~ {request.budget_max ? money(request.budget_max) : "상한 없음"}</span> : null}
        {request.preferred_brand && <span>선호 브랜드: {request.preferred_brand}</span>}
        <span>도착 견적: {quoteCount}건</span>
      </div>
      <div className="itemsList">
        {items.map((itemEntry) => (
          <div className="itemPill" key={itemEntry.id}>
            <strong>{itemEntry.item_name}</strong>
            <span>{itemEntry.spec || `${itemEntry.quantity}${itemEntry.unit}`}</span>
            {itemEntry.memo && <small>{itemEntry.memo}</small>}
            <div className="miniBadges">
              <span>{itemEntry.is_required === false ? "선택" : "필수"}</span>
              <span>{itemEntry.allow_alternative === false ? "대체 불가" : "대체 가능"}</span>
              {itemEntry.needs_review && <span>확인 필요</span>}
            </div>
          </div>
        ))}
      </div>
      {attachments.length > 0 && <AttachmentStatusList attachments={attachments.map((attachment) => ({
        file_name: attachment.file_name,
        file_type: attachment.file_type,
        analysis_status: attachment.analysis_status ?? "uploaded",
        extracted_text: attachment.extracted_text ?? "",
      }))} />}
      {request.attachment_note && <p className="mutedText">첨부 메모: {request.attachment_note}</p>}
    </section>
  );
}

function MethodCard({ icon, title, desc, active, onClick }: { icon: ReactNode; title: string; desc: string; active: boolean; onClick: () => void }) {
  return (
    <button className={active ? "methodCard active" : "methodCard"} type="button" onClick={onClick}>
      <span className="tileIcon">{icon}</span>
      <strong>{title}</strong>
      <span>{desc}</span>
    </button>
  );
}

function QualityPreview({ score, expectedSupplierCount }: { score: number; expectedSupplierCount: number }) {
  return (
    <aside className="qualityPreview">
      <QualityMeter score={score} />
      <div className="matchEstimate">
        <span>예상 응답 업체</span>
        <strong>{expectedSupplierCount}곳</strong>
      </div>
      <p className="mutedText">품목명, 규격, 납품 조건, 예산 정보가 채워질수록 공급업체가 빠르게 견적할 수 있습니다.</p>
    </aside>
  );
}

function SupplierRequestInsight({ request, qualityScore, attachmentsCount }: { request: QuoteRequest; qualityScore: number; attachmentsCount: number }) {
  return (
    <section className="supplierInsight">
      <QualityMeter score={qualityScore} />
      <div className="summaryFacts">
        <span>입력 방식: {request.input_method ? requestInputMethodLabels[request.input_method] : "직접 입력"}</span>
        <span>첨부: {attachmentsCount}개</span>
        <span>배송비 포함 요청: {yesNo(request.include_delivery_fee ?? true)}</span>
        <span>대체품 제안: {yesNo(request.allow_alternatives ?? true)}</span>
        {request.budget_max && <span>예산 상한: {money(request.budget_max)}</span>}
      </div>
    </section>
  );
}

function SupplierQuoteFitPanel({ supplier, request }: { supplier: SupplierProfile; request: QuoteRequest }) {
  const matchScore = calculateSupplierMatchScore(supplier, request);
  const checks = [
    { label: "카테고리 일치", ok: supplier.categories.includes(request.category_name) },
    { label: "납품 지역 적합", ok: calculateSupplierMatchScore(supplier, { ...request, need_tax_invoice: false, card_payment_required: false }) >= 70 },
    { label: "세금계산서 조건", ok: !request.need_tax_invoice || supplier.tax_invoice_available },
    { label: "카드결제 조건", ok: !request.card_payment_required || supplier.card_payment_available },
    { label: "긴급 대응", ok: !request.urgent || !!supplier.urgent_delivery_available },
  ];
  return (
    <section className="supplierFitPanel">
      <div>
        <span className="eyebrow">내 업체 조건과의 일치 여부</span>
        <h2>이 요청은 귀사의 취급 카테고리와 납품 지역에 적합합니다.</h2>
        <p>매칭 점수 {matchScore}점 · 기본 견적 유효기간 {supplier.default_quote_valid_days ?? 3}일 · 배송비 정책: {supplier.delivery_fee_policy ?? "협의"}</p>
      </div>
      <div className="fitCheckGrid">
        {checks.map((check) => (
          <span className={check.ok ? "fitCheck ok" : "fitCheck warn"} key={check.label}>{check.label}</span>
        ))}
      </div>
    </section>
  );
}

function QualityMeter({ score }: { score: number }) {
  const label = score >= 85 ? "매우 좋음" : score >= 70 ? "좋음" : score >= 55 ? "보완 권장" : "정보 부족";
  return (
    <div className="qualityMeter">
      <div>
        <span>요청 품질</span>
        <strong>{score}점</strong>
      </div>
      <div className="qualityBar" aria-label={`요청 품질 ${score}점`}>
        <span style={{ width: `${score}%` }} />
      </div>
      <small>{label}</small>
    </div>
  );
}

function UploadMockPanel({ attachments, onAdd }: { attachments: QuoteAttachmentDraft[]; onAdd: () => void }) {
  return (
    <div className="uploadMockPanel">
      <button className="secondaryButton compact" type="button" onClick={onAdd}>
        <Upload size={16} />
        샘플 파일 추가
      </button>
      <AttachmentStatusList attachments={attachments} />
    </div>
  );
}

function TemplatePicker({ selectedName, onSelect }: { selectedName: string; onSelect: (name: string) => void }) {
  return (
    <div className="templateGrid">
      {requestTemplates.map((template) => (
        <button className={selectedName === template.name ? "templateCard active" : "templateCard"} type="button" onClick={() => onSelect(template.name)} key={template.name}>
          <strong>{template.name}</strong>
          <span>{template.category_name} · {template.items.length}개 품목</span>
          <small>{template.description}</small>
        </button>
      ))}
    </div>
  );
}

function RepeatRequestPanel({ data, selectedId, onSelect }: { data: AppData; selectedId: string; onSelect: (request: QuoteRequest) => void }) {
  return (
    <div className="repeatList">
      {data.quote_requests.slice(0, 4).map((request) => {
        const itemCount = data.quote_request_items.filter((entry) => entry.quote_request_id === request.id).length;
        return (
          <button className={selectedId === request.id ? "repeatCard active" : "repeatCard"} type="button" onClick={() => onSelect(request)} key={request.id}>
            <strong>{request.title}</strong>
            <span>{request.category_name} · {itemCount}개 품목 · {request.delivery_region}</span>
          </button>
        );
      })}
    </div>
  );
}

function ItemReviewEditor({
  items,
  onUpdate,
  onRemove,
}: {
  items: QuoteRequestDraft["items"];
  onUpdate: (index: number, key: keyof QuoteRequestDraft["items"][number], value: string | number | boolean) => void;
  onRemove: (index: number) => void;
}) {
  return (
    <div className="itemReviewEditor">
      {items.map((entry, index) => (
        <article className={entry.needs_review ? "itemReviewRow needsReview" : "itemReviewRow"} key={`item-${index}`}>
          <div className="itemReviewFields">
            <input value={entry.item_name} onChange={(event) => onUpdate(index, "item_name", event.target.value)} placeholder="품목명" />
            <input value={entry.spec} onChange={(event) => onUpdate(index, "spec", event.target.value)} placeholder="규격" />
            <input type="number" min="1" value={entry.quantity} onChange={(event) => onUpdate(index, "quantity", Number(event.target.value))} aria-label="수량" />
            <input value={entry.unit} onChange={(event) => onUpdate(index, "unit", event.target.value)} aria-label="단위" />
            <input value={entry.memo} onChange={(event) => onUpdate(index, "memo", event.target.value)} placeholder="메모" />
          </div>
          <div className="itemReviewMeta">
            <Toggle checked={entry.is_required ?? true} label="필수" onChange={(checked) => onUpdate(index, "is_required", checked)} />
            <Toggle checked={entry.allow_alternative ?? true} label="대체 가능" onChange={(checked) => onUpdate(index, "allow_alternative", checked)} />
            <span>신뢰도 {entry.confidence_score ?? 96}%</span>
            {entry.review_reason && <small>{entry.review_reason}</small>}
            <button className="ghostButton compact" type="button" onClick={() => onRemove(index)}>삭제</button>
          </div>
        </article>
      ))}
    </div>
  );
}

function AttachmentStatusList({ attachments }: { attachments: Array<Pick<QuoteAttachmentDraft, "file_name" | "file_type" | "analysis_status" | "extracted_text">> }) {
  if (attachments.length === 0) {
    return <p className="mutedText">첨부된 파일이 없습니다.</p>;
  }

  return (
    <div className="attachmentStatusList">
      {attachments.map((attachment, index) => (
        <div className="attachmentStatusCard" key={`${attachment.file_name}-${index}`}>
          <strong>{attachment.file_name}</strong>
          <span>{attachment.file_type.toUpperCase()} · {analysisStatusLabel(attachment.analysis_status)}</span>
          {attachment.extracted_text && <small>{attachment.extracted_text}</small>}
        </div>
      ))}
    </div>
  );
}

function StatList({ title, items }: { title: string; items: Array<{ label: string; value: number }> }) {
  return (
    <section className="statList">
      <h2>{title}</h2>
      {items.map((item) => (
        <div className="statRow" key={item.label}>
          <span>{item.label}</span>
          <strong>{item.value}건</strong>
        </div>
      ))}
    </section>
  );
}

function MoneyStatList({ title, items, secondaryLabel }: { title: string; items: Array<{ label: string; value: number; amount?: number }>; secondaryLabel?: string }) {
  return (
    <section className="statList">
      <h2>{title}</h2>
      {items.length === 0 && <p className="mutedText">표시할 데이터가 없습니다.</p>}
      {items.map((item) => (
        <div className="statRow" key={item.label}>
          <span>{item.label}</span>
          <strong>{money(item.value)}</strong>
          {typeof item.amount === "number" && <small>{secondaryLabel ?? "거래액"} {money(item.amount)}</small>}
        </div>
      ))}
    </section>
  );
}

function UsageLimitNotice({ data, supplierId, navigate }: { data: AppData; supplierId: string; navigate: Navigate }) {
  const gate = canSubmitQuoteByPlan(data, supplierId);
  if (gate.limit <= 0) {
    return (
      <section className="usageNotice ok">
        <div>
          <span className="eyebrow">견적 참여 한도</span>
          <h2>현재 {gate.plan.name} 플랜은 견적 참여가 무제한입니다.</h2>
          <p>상위노출과 통계 제공 상태는 요금제 설정에 따라 mock으로 표시됩니다.</p>
        </div>
      </section>
    );
  }
  const ratio = Math.min(100, Math.round((gate.usage.quotes_submitted_count / gate.limit) * 100));
  return (
    <section className={gate.allowed ? "usageNotice" : "usageNotice blocked"}>
      <div>
        <span className="eyebrow">견적 참여 한도</span>
        <h2>{gate.allowed ? `이번 달 ${gate.limit}건 중 ${gate.usage.quotes_submitted_count}건을 사용했습니다.` : "이번 달 무료 견적 참여 한도를 모두 사용했습니다."}</h2>
        <p>{gate.allowed ? `남은 참여 가능 건수는 ${gate.remaining}건입니다.` : "더 많은 견적요청에 참여하려면 요금제를 업그레이드하거나 다음 달 초기화를 기다려주세요."}</p>
        <div className="usageBar"><span style={{ width: `${ratio}%` }} /></div>
      </div>
      {!gate.allowed && <button className="primaryButton" type="button" onClick={() => navigate("/app/supplier/billing")}>요금제 보기</button>}
    </section>
  );
}

function PlanCard({ plan, active, onChange }: { plan: SupplierPlan; active: boolean; onChange: () => void }) {
  return (
    <article className={active ? "planCard active" : "planCard"}>
      <div>
        <span className="eyebrow">{plan.code}</span>
        <h3>{plan.name}</h3>
        <strong>{money(plan.monthly_price)} / 월</strong>
      </div>
      <p>{planLimitLabel(plan.quote_participation_limit)} 견적 참여 · 매칭 조회 {planLimitLabel(plan.matched_request_view_limit)}</p>
      <div className="chipLine">
        {plan.priority_exposure_enabled && <span className="chip">상위노출</span>}
        {plan.analytics_enabled && <span className="chip">통계</span>}
        {plan.badge_enabled && <span className="chip">{plan.badge_label}</span>}
        <span className="chip">{plan.support_level}</span>
      </div>
      <button className={active ? "secondaryButton" : "primaryButton"} type="button" onClick={onChange} disabled={active}>
        {active ? "현재 요금제" : "요금제 변경하기"}
      </button>
    </article>
  );
}

function QuoteCard({ data, quote, isCheapest, isFastest, isSelected, isRejected, onSelect, onOpenSupplier }: {
  data: AppData;
  quote: Quote;
  isCheapest: boolean;
  isFastest: boolean;
  isSelected: boolean;
  isRejected: boolean;
  onSelect: () => void;
  onOpenSupplier: () => void;
}) {
  const supplier = data.supplier_profiles.find((entry) => entry.id === quote.supplier_id);
  const stats = supplier ? supplierStatsFor(data, supplier.id) : null;
  const documents = supplier ? data.supplier_documents.filter((document) => document.supplier_id === supplier.id) : [];
  return (
    <article className={isSelected ? "quoteCard selected" : "quoteCard"}>
      <div className="quoteHeader">
        <div>
          <span className="eyebrow">공급업체</span>
          <h3>{supplierName(data, quote.supplier_id)}</h3>
        </div>
        {isCheapest && <StatusBadge tone="green">최저가</StatusBadge>}
        {isSelected && <StatusBadge tone="green">선택된 견적</StatusBadge>}
        {isRejected && <StatusBadge tone="gray">미선택 처리됨</StatusBadge>}
      </div>
      {supplier && (
        <div className="supplierTrustLine">
          <span>승인된 공급업체의 견적입니다.</span>
          <span>평점 {stats?.rating ? stats.rating.toFixed(1) : "신규"}</span>
          <span>응답 {stats?.average_response_minutes ? `${stats.average_response_minutes}분` : "신규"}</span>
          <span>거래 {stats?.selected_quotes_count ?? 0}건</span>
          {supplier.tax_invoice_available && <span>세금계산서 가능</span>}
          {supplier.card_payment_available && <span>카드결제 가능</span>}
          {supplier.urgent_delivery_available && <span>긴급배송 가능</span>}
          {documents.some((document) => document.status === "approved") && <span>인증자료 확인</span>}
        </div>
      )}
      <div className="priceBlock">
        <strong>{money(quote.final_amount)}</strong>
        <span>상품 {money(quote.total_amount)} · 배송 {money(quote.delivery_fee)}</span>
      </div>
      <div className="quoteFacts">
        <span className={isFastest ? "fact strong" : "fact"}>납품 {quote.available_delivery_date}</span>
        <span className="fact">세금계산서 {yesNo(quote.tax_invoice_available)}</span>
        <span className="fact">카드결제 {yesNo(quote.card_payment_available)}</span>
        {quote.alternative_proposal && <span className="fact strong">대체품 제안 있음</span>}
      </div>
      <dl className="quoteDetails">
        <div>
          <dt>단가 메모</dt>
          <dd>{quote.item_price_memo || "미입력"}</dd>
        </div>
        <div>
          <dt>업체 메모</dt>
          <dd>{quote.memo || "미입력"}</dd>
        </div>
        <div>
          <dt>유효기간</dt>
          <dd>{quote.valid_until}</dd>
        </div>
      </dl>
      {quote.alternative_proposal && <p className="proposal">{quote.alternative_proposal}</p>}
      <div className="quoteActions">
        <button className="secondaryButton full" type="button" onClick={onOpenSupplier}>
          <Store size={17} />
          업체 상세보기
        </button>
        <button className="ghostButton full" type="button">
          <ReceiptText size={17} />
          문의하기
        </button>
      </div>
      <button className={isSelected ? "selectedButton" : "primaryButton full"} type="button" onClick={onSelect} disabled={isSelected}>
        <Check size={17} />
        {isSelected ? "선택된 견적" : "이 업체 선택하기"}
      </button>
    </article>
  );
}

function DealNotice({ data, deal, quote, onOpen }: { data: AppData; deal: Deal; quote: Quote; onOpen: () => void }) {
  return (
    <section className="dealNotice">
      <div>
        <span className="eyebrow">선택된 거래</span>
        <h2>{supplierName(data, quote.supplier_id)} 견적으로 거래가 생성되었습니다.</h2>
        <p>거래 상태: {dealStatusLabels[deal.status]} · 최종금액 {money(deal.final_amount)}</p>
      </div>
      <button className="primaryButton" type="button" onClick={onOpen}>
        거래 상세보기
        <ArrowRight size={16} />
      </button>
    </section>
  );
}

function QuoteConfirmModal({ data, quote, onCancel, onConfirm }: { data: AppData; quote: Quote; onCancel: () => void; onConfirm: () => void }) {
  return (
    <div className="modalBackdrop" role="dialog" aria-modal="true" aria-labelledby="quote-confirm-title">
      <section className="modalPanel">
        <h2 id="quote-confirm-title">이 견적으로 거래를 진행할까요?</h2>
        <div className="confirmGrid">
          <span>공급업체명</span><strong>{supplierName(data, quote.supplier_id)}</strong>
          <span>총 견적금액</span><strong>{money(quote.total_amount)}</strong>
          <span>배송비</span><strong>{money(quote.delivery_fee)}</strong>
          <span>최종금액</span><strong>{money(quote.final_amount)}</strong>
          <span>납품 가능일</span><strong>{quote.available_delivery_date}</strong>
          <span>세금계산서</span><strong>{yesNo(quote.tax_invoice_available)}</strong>
          <span>카드결제</span><strong>{yesNo(quote.card_payment_available)}</strong>
          <span>대체품 제안</span><strong>{quote.alternative_proposal || "없음"}</strong>
          <span>견적 유효기간</span><strong>{quote.valid_until}</strong>
        </div>
        <p className="modalGuide">업체를 선택하면 다른 견적은 미선택 처리되고, 거래가 생성됩니다. 실제 결제는 아직 진행되지 않습니다.</p>
        <div className="formActions">
          <button className="secondaryButton" type="button" onClick={onCancel}>취소</button>
          <button className="primaryButton" type="button" onClick={onConfirm}>
            <Check size={17} />
            거래 진행하기
          </button>
        </div>
      </section>
    </div>
  );
}

function FilterTabs({ options, active, onChange }: { options: string[]; active: string; onChange: (option: string) => void }) {
  return (
    <div className="filterTabs">
      {options.map((option) => (
        <button className={active === option ? "filterTab active" : "filterTab"} type="button" onClick={() => onChange(option)} key={option}>
          {option}
        </button>
      ))}
    </div>
  );
}

function DealTable({ data, deals, navigate, basePath, role }: { data: AppData; deals: Deal[]; navigate: Navigate; basePath: string; role: "buyer" | "supplier" | "admin" }) {
  if (deals.length === 0) {
    return <EmptyState icon={<ReceiptText />} title="표시할 거래가 없습니다." desc="견적을 선택하면 거래가 생성됩니다." />;
  }

  return (
    <div className="tableWrap">
      <table>
        <thead>
          <tr>
            <th>거래명</th>
            <th>{role === "buyer" ? "공급업체" : "구매자"}</th>
            <th>지역</th>
            <th>납품일</th>
            <th>최종금액</th>
            <th>상태</th>
            <th>생성일</th>
            <th>상세</th>
          </tr>
        </thead>
        <tbody>
          {deals.map((deal) => {
            const buyer = data.profiles.find((entry) => entry.id === deal.buyer_id);
            return (
              <tr key={deal.id} onClick={() => navigate(`${basePath}/${deal.id}`)}>
                <td>{deal.title}</td>
                <td>{role === "buyer" ? supplierName(data, deal.supplier_id) : buyer?.business_name ?? "구매자"}</td>
                <td>{deal.delivery_region}</td>
                <td>{deal.confirmed_delivery_date || deal.desired_delivery_date}</td>
                <td>{money(deal.final_amount)}</td>
                <td>
                  <StatusBadge tone={deal.status === "completed" ? "green" : deal.status === "disputed" ? "orange" : deal.status.includes("cancelled") ? "gray" : "blue"}>
                    {dealStatusLabels[deal.status]}
                  </StatusBadge>
                </td>
                <td>{deal.created_at.slice(0, 10)}</td>
                <td>
                  <button className="ghostButton compact" type="button">상세보기</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function DealStepper({ status }: { status: DealStatus }) {
  const steps: Array<{ key: DealStatus; label: string }> = [
    { key: "pending_confirmation", label: "견적 선택" },
    { key: "confirmed", label: "거래 확인" },
    { key: "preparing", label: "납품 준비" },
    { key: "delivering", label: "배송/납품" },
    { key: "completed", label: "거래 완료" },
  ];
  const activeIndex = status === "delivered" ? 4 : Math.max(0, steps.findIndex((step) => step.key === status));

  return (
    <div className="dealStepper">
      {steps.map((step, index) => (
        <div className={index <= activeIndex && !status.includes("cancelled") && status !== "disputed" ? "step active" : "step"} key={step.key}>
          <span>{index + 1}</span>
          <strong>{step.label}</strong>
        </div>
      ))}
    </div>
  );
}

function DealActions({
  deal,
  role,
  onChange,
  onCancel,
  onDispute,
  navigate,
  purchaseRecordId,
}: {
  deal: Deal;
  role: "buyer" | "supplier" | "admin";
  onChange: (status: DealStatus, changedBy: "buyer" | "supplier" | "admin", memo: string) => void;
  onCancel: () => void;
  onDispute: () => void;
  navigate: Navigate;
  purchaseRecordId?: string;
}) {
  if (deal.status === "completed") {
    return (
      <div className="actionStack">
        <p className="mutedText">거래 완료됨</p>
        <button className="secondaryButton" type="button" onClick={() => purchaseRecordId && navigate(`/app/purchases/${purchaseRecordId}`)}>구매내역 보기</button>
        <button className="primaryButton" type="button" onClick={() => navigate("/app/requests/new")}>다시 견적요청하기</button>
        <button className="ghostButton" type="button" onClick={() => navigate(`/app/deals/${deal.id}/review`)}>후기 작성</button>
        {purchaseRecordId && <p className="mutedText">구매내역 ID: {purchaseRecordId}</p>}
      </div>
    );
  }

  if (deal.status.includes("cancelled") || deal.status === "disputed") {
    return <p className="mutedText">현재 상태에서는 추가 진행 버튼을 제공하지 않습니다.</p>;
  }

  if (role === "supplier") {
    const supplierActions: Partial<Record<DealStatus, Array<{ label: string; next: DealStatus; memo: string }>>> = {
      pending_confirmation: [
        { label: "거래 수락", next: "confirmed", memo: "공급업체가 거래를 수락했습니다." },
        { label: "거래 거절", next: "cancelled_by_supplier", memo: "공급업체가 거래를 거절했습니다." },
      ],
      confirmed: [{ label: "납품 준비 시작", next: "preparing", memo: "납품 준비를 시작했습니다." }],
      preparing: [{ label: "배송/납품 시작", next: "delivering", memo: "배송/납품을 시작했습니다." }],
      delivering: [{ label: "납품 완료 처리", next: "delivered", memo: "납품 완료 처리했습니다." }],
    };
    return <ActionButtons actions={supplierActions[deal.status] ?? []} role="supplier" onChange={onChange} />;
  }

  if (role === "buyer") {
    const buyerActions: Partial<Record<DealStatus, Array<{ label: string; next: DealStatus; memo: string }>>> = {
      pending_confirmation: [{ label: "업체에 확인 요청 UI", next: "pending_confirmation", memo: "업체 확인을 요청했습니다." }],
      confirmed: [{ label: "납품 완료 확인", next: "delivered", memo: "구매자가 납품 완료를 확인했습니다." }],
      preparing: [{ label: "납품 완료 확인", next: "delivered", memo: "구매자가 납품 완료를 확인했습니다." }],
      delivering: [{ label: "납품 완료 확인", next: "delivered", memo: "구매자가 납품 완료를 확인했습니다." }],
      delivered: [{ label: "거래 완료하기", next: "completed", memo: "구매자가 거래 완료를 확정했습니다." }],
    };
    return (
      <div className="actionStack">
        <ActionButtons actions={buyerActions[deal.status] ?? []} role="buyer" onChange={onChange} />
        <button className="secondaryButton" type="button" onClick={onCancel}>거래 취소</button>
        <button className="ghostButton" type="button" onClick={onDispute}>문제 신고</button>
      </div>
    );
  }

  return (
    <div className="actionStack">
      <button className="secondaryButton" type="button" onClick={onDispute}>관리자 문제 표시</button>
      <button className="ghostButton" type="button">관리자 메모 UI</button>
    </div>
  );
}

function ActionButtons({ actions, role, onChange }: { actions: Array<{ label: string; next: DealStatus; memo: string }>; role: "buyer" | "supplier" | "admin"; onChange: (status: DealStatus, changedBy: "buyer" | "supplier" | "admin", memo: string) => void }) {
  return (
    <div className="actionStack">
      {actions.map((action) => (
        <button className="primaryButton" type="button" onClick={() => onChange(action.next, role, action.memo)} key={`${action.label}-${action.next}`}>
          {action.label}
        </button>
      ))}
    </div>
  );
}

function ReasonModal({
  mode,
  reason,
  memo,
  onReason,
  onMemo,
  onCancel,
  onSubmit,
}: {
  mode: "cancel" | "dispute";
  reason: string;
  memo: string;
  onReason: (value: string) => void;
  onMemo: (value: string) => void;
  onCancel: () => void;
  onSubmit: () => void;
}) {
  const reasons = mode === "cancel"
    ? ["일정 변경", "금액 조건 변경", "업체와 별도 협의", "품목 변경 필요", "잘못 선택함", "기타"]
    : ["납품 지연", "품목 누락", "수량 불일치", "품질 문제", "금액 불일치", "세금계산서 문제", "기타"];

  return (
    <div className="modalBackdrop" role="dialog" aria-modal="true">
      <section className="modalPanel">
        <h2>{mode === "cancel" ? "거래 취소" : "문제 신고"}</h2>
        <Field label={mode === "cancel" ? "취소 사유" : "문제 유형"}>
          <select value={reason} onChange={(event) => onReason(event.target.value)}>
            {reasons.map((entry) => <option key={entry}>{entry}</option>)}
          </select>
        </Field>
        <Field label="상세 내용">
          <textarea value={memo} onChange={(event) => onMemo(event.target.value)} placeholder="상세 내용을 입력하세요." />
        </Field>
        {mode === "dispute" && (
          <div className="uploadBox">
            <Upload size={20} />
            <input placeholder="사진 첨부 UI: 파일명만 입력" />
          </div>
        )}
        <div className="formActions">
          <button className="secondaryButton" type="button" onClick={onCancel}>취소</button>
          <button className="primaryButton" type="button" onClick={onSubmit}>확인</button>
        </div>
      </section>
    </div>
  );
}

function SavingsNotice({ savings, previousAmount }: { savings: { amount: number; rate: number }; previousAmount?: number }) {
  if (!previousAmount) {
    return <p className="mutedText">기존 거래가를 입력하면 절감액을 계산할 수 있습니다.</p>;
  }

  if (savings.amount <= 0) {
    return <p className="mutedText">기존 거래가 {money(previousAmount)} 기준 절감액이 아직 없습니다.</p>;
  }

  return <p className="savingText">기존 거래가 대비 약 {money(savings.amount)} 절감되었습니다. 절감률 {savings.rate}%</p>;
}

function Page({ children, narrow = false }: { children: ReactNode; narrow?: boolean }) {
  return <div className={narrow ? "page narrow" : "page"}>{children}</div>;
}

function PageTitle({ eyebrow, title, desc }: { eyebrow: string; title: string; desc: string }) {
  return (
    <section className="pageTitle">
      <span className="eyebrow">{eyebrow}</span>
      <h1>{title}</h1>
      <p>{desc}</p>
    </section>
  );
}

function SectionHeader({ title, action, onAction }: { title: string; action?: string; onAction?: () => void }) {
  return (
    <div className="sectionHeader">
      <h2>{title}</h2>
      {action && onAction && (
        <button className="ghostButton compact" type="button" onClick={onAction}>
          {action}
          <ArrowRight size={15} />
        </button>
      )}
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="field">
      <span>{label}</span>
      {children}
    </label>
  );
}

function Toggle({ checked, label, onChange }: { checked: boolean; label: string; onChange: (checked: boolean) => void }) {
  return (
    <label className="toggle">
      <input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} />
      <span aria-hidden="true" />
      {label}
    </label>
  );
}

function Metric({ label, value, icon }: { label: string; value: string; icon: ReactNode }) {
  return (
    <div className="metric">
      <div className="metricIcon">{icon}</div>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function RatingInput({ label, value, onChange }: { label: string; value: number; onChange: (value: number) => void }) {
  return (
    <Field label={label}>
      <select value={value} onChange={(event) => onChange(Number(event.target.value))}>
        {[5, 4, 3, 2, 1].map((score) => <option value={score} key={score}>{score}점</option>)}
      </select>
    </Field>
  );
}

function ScoreCircle({ score, label }: { score: number; label: string }) {
  return (
    <div className="scoreCircle" aria-label={`${label} ${score}점`}>
      <strong>{score}</strong>
      <span>{label}</span>
    </div>
  );
}

function ActionTile({ title, desc, icon, onClick, disabled = false }: { title: string; desc: string; icon: ReactNode; onClick?: () => void; disabled?: boolean }) {
  return (
    <button className={disabled ? "actionTile disabled" : "actionTile"} type="button" onClick={onClick} disabled={disabled}>
      <span className="tileIcon">{icon}</span>
      <strong>{title}</strong>
      <span>{desc}</span>
    </button>
  );
}

function EmptyState({ icon, title, desc, actionLabel, onAction, variant = "default" }: { icon: ReactNode; title: string; desc: string; actionLabel?: string; onAction?: () => void; variant?: "default" | "compact" | "warning" }) {
  return (
    <div className={`emptyState ${variant}`}>
      <span>{icon}</span>
      <strong>{title}</strong>
      <p>{desc}</p>
      {actionLabel && onAction && <button className="secondaryButton compact" type="button" onClick={onAction}>{actionLabel}</button>}
    </div>
  );
}

function LoadingState({ title = "정보를 불러오는 중입니다.", description = "잠시만 기다려주세요." }: { title?: string; description?: string }) {
  return (
    <div className="loadingState" role="status" aria-live="polite">
      <span className="spinner" />
      <strong>{title}</strong>
      <p>{description}</p>
    </div>
  );
}

function ErrorState({
  icon,
  title,
  description,
  detail,
  retryLabel,
  onRetry,
  homeLabel,
  onHome,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  detail?: string;
  retryLabel?: string;
  onRetry?: () => void;
  homeLabel?: string;
  onHome?: () => void;
}) {
  return (
    <div className="errorState">
      <span>{icon}</span>
      <strong>{title}</strong>
      <p>{description}</p>
      {detail && <small>{detail}</small>}
      <div className="formActions">
        {onRetry && <button className="secondaryButton" type="button" onClick={onRetry}>{retryLabel ?? "다시 시도"}</button>}
        {onHome && <button className="primaryButton" type="button" onClick={onHome}>{homeLabel ?? "홈으로"}</button>}
      </div>
    </div>
  );
}

function AccessState({ status, navigate }: { status: SupplierProfile["approval_status"] | "forbidden"; navigate: Navigate }) {
  const messages = {
    pending: ["입점 신청 검토 중입니다.", "승인 후 견적요청에 참여할 수 있습니다."],
    needs_revision: ["보완이 필요한 항목이 있습니다.", "관리자 안내에 따라 정보를 수정해주세요."],
    rejected: ["입점 신청이 반려되었습니다.", "사유를 확인하고 재신청할 수 있습니다."],
    suspended: ["현재 이용이 제한된 상태입니다.", "자세한 내용은 운영팀 안내를 확인해주세요."],
    approved: ["승인 완료 상태입니다.", "견적요청에 참여할 수 있습니다."],
    forbidden: ["접근 권한이 없습니다.", "이 화면은 해당 역할의 사용자만 볼 수 있습니다."],
  };
  const [title, desc] = messages[status];
  return (
    <ErrorState
      icon={<ShieldCheck />}
      title={title}
      description={desc}
      retryLabel="업체 정보 확인"
      onRetry={() => navigate("/app/supplier/profile")}
      homeLabel="홈으로"
      onHome={() => navigate("/app")}
    />
  );
}

function StatusBadge({ children, tone }: { children: ReactNode; tone: "orange" | "blue" | "green" | "gray" }) {
  return <span className={`statusBadge ${tone}`}>{children}</span>;
}

function BackButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button className="backButton" type="button" onClick={onClick}>
      <ChevronLeft size={17} />
      {label}
    </button>
  );
}

function NotFound({ navigate }: { navigate: Navigate }) {
  return (
    <Page narrow>
      <ErrorState
        icon={<SearchCheck />}
        title="페이지를 찾을 수 없습니다."
        description="주소가 잘못되었거나 이동된 페이지입니다."
        retryLabel="이전 페이지로"
        onRetry={() => window.history.back()}
        homeLabel="홈으로 가기"
        onHome={() => navigate("/app")}
      />
    </Page>
  );
}

function PolicyLinks({ navigate }: { navigate: Navigate }) {
  return (
    <div className="policyLinks">
      <button className="ghostButton compact" type="button" onClick={() => navigate("/terms")}>이용약관</button>
      <button className="ghostButton compact" type="button" onClick={() => navigate("/privacy")}>개인정보처리방침</button>
      <button className="ghostButton compact" type="button" onClick={() => navigate("/operation-policy")}>운영정책</button>
      <button className="ghostButton compact" type="button" onClick={() => navigate("/safety")}>안전거래</button>
      <button className="ghostButton compact" type="button" onClick={() => navigate("/beta-notice")}>베타 안내</button>
    </div>
  );
}

function policyContent(type: "terms" | "privacy" | "operation" | "safety") {
  const contents = {
    terms: {
      title: "싸와! 이용약관 초안",
      sections: [
        ["서비스 목적", "싸와!는 사업자가 필요한 자재 견적요청을 등록하고 공급업체가 견적을 제출할 수 있도록 돕는 B2B 견적구매 플랫폼입니다."],
        ["회원 역할", "구매자는 견적요청과 거래 관리를, 공급업체는 견적 제출과 납품 상태 관리를, 관리자는 운영 품질과 신고 처리를 담당합니다."],
        ["거래 당사자 책임", "초기 MVP에서 실제 결제와 세금계산서 발행은 당사자 간 협의로 진행되며, 플랫폼은 견적 비교와 이력 관리 도구를 제공합니다."],
        ["금지 행위와 제재", "허위 견적, 외부 결제 강요, 부적절한 메시지, 후기 조작, 반복 분쟁은 신고와 제재 대상이 될 수 있습니다."],
        ["수수료/요금제", "베타 기간의 요금제와 수수료는 mock 또는 안내용이며, 정식 과금 전 별도 고지를 전제로 합니다."],
      ],
    },
    privacy: {
      title: "개인정보처리방침 초안",
      sections: [
        ["수집 항목", "이름, 연락처, 사업자 정보, 견적요청, 거래 상태, 메시지, 신고/후기, 업로드 파일명과 분석 결과 mock을 수집할 수 있습니다."],
        ["이용 목적", "견적 매칭, 거래 관리, 알림, 분쟁 처리, 서비스 품질 개선, 베타 피드백 확인을 위해 사용합니다."],
        ["보관 기간", "베타 기간에는 테스트 목적의 localStorage/mock 데이터로 보관하며, 정식 DB 전환 시 보관 기간과 파기 기준을 별도 확정해야 합니다."],
        ["제3자 제공", "현재 MVP는 외부 결제, 문자, 세금계산서 자동 발행 연동을 수행하지 않습니다. 추후 연동 시 별도 동의와 고지가 필요합니다."],
        ["업로드 자료 처리", "거래명세서, 견적서, 사진 등 파일은 품목 분석 mock과 거래 증빙 확인 용도로만 표시됩니다."],
      ],
    },
    operation: {
      title: "운영정책 초안",
      sections: [
        ["공급업체 승인 기준", "사업자 정보, 취급 카테고리, 납품 가능 지역, 증빙자료를 기준으로 승인/보완/반려 상태를 관리합니다."],
        ["견적 제출 기준", "공급업체는 실제 납품 가능한 금액, 일정, 세금계산서/결제 조건을 정확히 입력해야 합니다."],
        ["후기/신고 정책", "거래 기반 후기와 신고만 운영 검토 대상으로 삼고, 허위/비방성 내용은 숨김 또는 제재될 수 있습니다."],
        ["제재 기준", "경고, 견적 제한, 메시지 제한, 일시정지, 영구정지는 분쟁 반복성과 위반 정도를 고려해 적용합니다."],
        ["분쟁 처리 절차", "신고 접수, 운영 검토, 추가 정보 요청, 조치/기각/해결 순서로 처리 이력을 남깁니다."],
      ],
    },
    safety: {
      title: "안전거래 안내",
      sections: [
        ["거래 전 확인사항", "품목명, 규격, 수량, 납품일, 배송비, 세금계산서 가능 여부를 거래 확정 전에 확인하세요."],
        ["외부 결제 주의", "앱 밖에서 무리하게 선입금이나 계좌 직거래를 요구하면 메시지 신고 또는 거래 신고를 이용하세요."],
        ["세금자료 확인", "초기 MVP에서는 세금계산서 자동 발행이 아니므로 공급업체와 발행 가능 여부 및 시점을 확인해야 합니다."],
        ["배송/납품 조건", "현장 주소, 수령 시간, 차량 진입, 하역 조건은 메시지나 거래 메모에 남겨 분쟁을 줄이세요."],
        ["신고 방법", "거래 상세의 문제 신고, 메시지 신고, 신고/분쟁 메뉴를 통해 운영팀 검토 요청을 남길 수 있습니다."],
      ],
    },
  } as const;
  return {
    title: contents[type].title,
    sections: contents[type].sections.map(([title, body]) => ({ title, body })),
  };
}

function normalizePath(pathname: string) {
  if (pathname === "/") return "/app";
  return pathname.replace(/\/$/, "") || "/app";
}

function supplierName(data: AppData, supplierId: string) {
  return data.supplier_profiles.find((supplier) => supplier.id === supplierId)?.business_name ?? "알 수 없는 업체";
}

function userLabel(data: AppData, userId: string) {
  const profile = data.profiles.find((entry) => entry.id === userId);
  if (profile) return profile.business_name || profile.name;
  const supplier = data.supplier_profiles.find((entry) => entry.user_id === userId);
  return supplier?.business_name ?? userId;
}

function reportRelatedTitle(data: AppData, report: Report) {
  if (report.related_entity_type === "deal") return data.deals.find((deal) => deal.id === report.related_entity_id)?.title ?? report.related_entity_id;
  if (report.related_entity_type === "supplier") return data.supplier_profiles.find((supplier) => supplier.id === report.related_entity_id)?.business_name ?? report.related_entity_id;
  if (report.related_entity_type === "quote_request") return data.quote_requests.find((request) => request.id === report.related_entity_id)?.title ?? report.related_entity_id;
  if (report.related_entity_type === "quote") return data.quotes.find((quote) => quote.id === report.related_entity_id)?.memo ?? report.related_entity_id;
  return report.related_entity_id;
}

function roleLabel(role: UserRole) {
  if (role === "buyer") return "구매자";
  if (role === "supplier") return "공급업체";
  if (role === "admin") return "관리자";
  return "시스템";
}

function reportStatusTone(status: ReportStatus): "orange" | "blue" | "green" | "gray" {
  if (status === "resolved" || status === "action_taken") return "green";
  if (status === "dismissed" || status === "cancelled") return "gray";
  if (status === "submitted" || status === "need_more_info") return "orange";
  return "blue";
}

function reviewStatusTone(status: ReviewStatus): "orange" | "blue" | "green" | "gray" {
  if (status === "active") return "green";
  if (status === "hidden" || status === "deleted") return "gray";
  if (status === "reported") return "orange";
  return "blue";
}

function sanctionStatusTone(status: SanctionStatus): "orange" | "blue" | "green" | "gray" {
  if (status === "active") return "orange";
  if (status === "expired") return "green";
  return "gray";
}

function blacklistStatusTone(status: BlacklistStatus): "orange" | "blue" | "green" | "gray" {
  return status === "active" ? "orange" : "gray";
}

function feedbackStatusTone(status: FeedbackStatus): "orange" | "blue" | "green" | "gray" {
  if (status === "resolved" || status === "planned") return "green";
  if (status === "dismissed") return "gray";
  if (status === "submitted") return "orange";
  if (status === "in_progress") return "blue";
  return "blue";
}

function qaStatusTone(status: QaChecklistStatus): "orange" | "blue" | "green" | "gray" {
  if (status === "passed") return "green";
  if (status === "failed") return "orange";
  if (status === "skipped") return "gray";
  return "blue";
}

function liveFeatureTone(status: (typeof liveFeatureMatrix)[number]["status"]): "orange" | "blue" | "green" | "gray" {
  if (status === "ready") return "green";
  if (status === "mock") return "orange";
  return "blue";
}

function liveFeatureLabel(status: (typeof liveFeatureMatrix)[number]["status"]) {
  if (status === "ready") return "라이브 준비";
  if (status === "mock") return "mock 유지";
  return "준비됨";
}

function reputationTone(reputation: SupplierReputationScore): "orange" | "blue" | "green" | "gray" {
  if (reputation.risk_level === "high") return "orange";
  if (reputation.risk_level === "medium") return "blue";
  return "green";
}

function riskLabel(level: SupplierReputationScore["risk_level"]) {
  if (level === "high") return "높은 리스크";
  if (level === "medium") return "주의 리스크";
  return "낮은 리스크";
}

function getActiveSupplier(data: AppData) {
  return data.supplier_profiles.find((supplier) => supplier.id === "sup-1") ?? data.supplier_profiles[0];
}

function supplierStatsFor(data: AppData, supplierId: string) {
  return data.supplier_stats.find((stats) => stats.supplier_id === supplierId) ?? {
    id: `stat-${supplierId}`,
    supplier_id: supplierId,
    total_quotes_submitted: data.quotes.filter((quote) => quote.supplier_id === supplierId).length,
    selected_quotes_count: data.quotes.filter((quote) => quote.supplier_id === supplierId && quote.status === "selected").length,
    response_rate: 0,
    average_response_minutes: 0,
    total_deal_amount: data.deals.filter((deal) => deal.supplier_id === supplierId).reduce((sum, deal) => sum + deal.final_amount, 0),
    repeat_customer_rate: 0,
    rating: 0,
    review_count: 0,
    updated_at: today,
  };
}

function defaultBillingAccount(supplier: SupplierProfile): BillingAccount {
  return {
    id: `ba-${supplier.id}`,
    supplier_id: supplier.id,
    billing_email: supplier.email ?? "",
    business_number: supplier.business_number,
    invoice_recipient_name: supplier.manager_name ?? supplier.representative_name,
    invoice_recipient_phone: supplier.manager_phone ?? supplier.phone,
    invoice_recipient_email: supplier.email ?? "",
    payment_method_status: "none",
    default_payment_method_type: "none",
    external_customer_id: "",
    created_at: today,
    updated_at: today,
  };
}

function planLimitLabel(limit: number) {
  return limit <= 0 ? "무제한" : `${limit}건`;
}

function settlementTone(status: SettlementStatus): "orange" | "blue" | "green" | "gray" {
  if (status === "paid" || status === "confirmed") return "green";
  if (status === "pending") return "orange";
  if (status === "cancelled") return "gray";
  return "blue";
}

function feeStatusTone(status: PlatformFeeStatus): "orange" | "blue" | "green" | "gray" {
  if (status === "paid" || status === "confirmed") return "green";
  if (status === "pending" || status === "estimated" || status === "invoiced") return "orange";
  if (status === "waived" || status === "cancelled") return "gray";
  return "blue";
}

function toggleArray<T>(items: T[], value: T) {
  return items.includes(value) ? items.filter((item) => item !== value) : [...items, value];
}

function sortSupplierRequests(a: QuoteRequest, b: QuoteRequest, sort: string, supplier: SupplierProfile) {
  if (sort === "최신순") return b.created_at.localeCompare(a.created_at);
  if (sort === "마감 임박순" || sort === "희망 납품일 빠른순") return a.desired_delivery_date.localeCompare(b.desired_delivery_date);
  if (sort === "예상 금액 높은순") return (b.budget_max ?? b.previous_amount ?? 0) - (a.budget_max ?? a.previous_amount ?? 0);
  if (sort === "지역 가까운순 mock") return calculateSupplierMatchScore(supplier, b) - calculateSupplierMatchScore(supplier, a);
  return (b.request_quality_score ?? 0) - (a.request_quality_score ?? 0);
}

function money(value: number) {
  return new Intl.NumberFormat("ko-KR", { style: "currency", currency: "KRW", maximumFractionDigits: 0 }).format(value);
}

function yesNo(value: boolean) {
  return value ? "가능" : "불가";
}

function analysisStatusLabel(status: AttachmentAnalysisStatus) {
  const labels: Record<AttachmentAnalysisStatus, string> = {
    uploaded: "업로드됨",
    analyzing: "분석 중",
    analyzed: "분석 완료",
    failed: "분석 실패",
  };
  return labels[status];
}

function countBy<T>(items: T[], getter: (item: T) => string) {
  const counts = items.reduce<Record<string, number>>((acc, item) => {
    const label = getter(item) || "미입력";
    acc[label] = (acc[label] ?? 0) + 1;
    return acc;
  }, {});

  return Object.entries(counts)
    .map(([label, value]) => ({ label, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 6);
}

function dealGroup(status: DealStatus) {
  if (["pending_confirmation", "confirmed", "preparing", "delivering", "delivered"].includes(status)) return "진행 중";
  if (status === "completed" || status === "closed") return "완료";
  if (status.includes("cancelled")) return "취소";
  if (status === "disputed") return "문제 발생";
  return dealStatusLabels[status];
}

function attachmentTypeLabel(type: AttachmentType) {
  const labels: Record<AttachmentType, string> = {
    invoice: "거래명세서",
    receipt: "영수증",
    delivery_note: "납품서",
    tax_invoice: "세금계산서",
    photo: "납품 사진",
    etc: "기타",
  };
  return labels[type];
}

function uploadedByLabel(role: "buyer" | "supplier" | "admin") {
  return role === "buyer" ? "구매자" : role === "supplier" ? "공급업체" : "관리자";
}

type Navigate = (path: string) => void;

type IconProps = {
  size?: number;
};

function LineIcon({ size = 20, children }: IconProps & { children: ReactNode }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {children}
    </svg>
  );
}

function ArrowRight(props: IconProps) {
  return <LineIcon {...props}><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></LineIcon>;
}

function BadgeCheck(props: IconProps) {
  return <LineIcon {...props}><path d="M8 12.5 11 15l5-6" /><path d="M12 2 4 5v6c0 5 3.4 9 8 11 4.6-2 8-6 8-11V5Z" /></LineIcon>;
}

function Bell(props: IconProps) {
  return <LineIcon {...props}><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" /><path d="M10 21h4" /></LineIcon>;
}

function Boxes(props: IconProps) {
  return <LineIcon {...props}><path d="M3 7.5 12 3l9 4.5-9 4.5Z" /><path d="M3 7.5V16l9 5 9-5V7.5" /><path d="M12 12v9" /></LineIcon>;
}

function Building2(props: IconProps) {
  return <LineIcon {...props}><path d="M4 21V5a2 2 0 0 1 2-2h8v18" /><path d="M14 8h4a2 2 0 0 1 2 2v11" /><path d="M8 7h2M8 11h2M8 15h2" /></LineIcon>;
}

function CalendarDays(props: IconProps) {
  return <LineIcon {...props}><path d="M7 2v4M17 2v4" /><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M3 10h18" /></LineIcon>;
}

function Check(props: IconProps) {
  return <LineIcon {...props}><path d="m5 12 4 4L19 6" /></LineIcon>;
}

function ChevronLeft(props: IconProps) {
  return <LineIcon {...props}><path d="m15 18-6-6 6-6" /></LineIcon>;
}

function ClipboardList(props: IconProps) {
  return <LineIcon {...props}><path d="M9 4h6l1 2h3v16H5V6h3Z" /><path d="M9 12h6M9 16h6" /></LineIcon>;
}

function FilePlus2(props: IconProps) {
  return <LineIcon {...props}><path d="M14 2H6v20h12V8Z" /><path d="M14 2v6h6" /><path d="M12 12v6M9 15h6" /></LineIcon>;
}

function Home(props: IconProps) {
  return <LineIcon {...props}><path d="M3 11 12 3l9 8" /><path d="M5 10v11h14V10" /><path d="M9 21v-7h6v7" /></LineIcon>;
}

function Landmark(props: IconProps) {
  return <LineIcon {...props}><path d="m3 10 9-6 9 6Z" /><path d="M5 10v8M9 10v8M15 10v8M19 10v8M3 21h18" /></LineIcon>;
}

function PackageCheck(props: IconProps) {
  return <LineIcon {...props}><path d="M3 7.5 12 3l9 4.5-9 4.5Z" /><path d="M3 7.5V16l9 5 9-5V7.5" /><path d="m9 16 2 2 4-5" /></LineIcon>;
}

function Plus(props: IconProps) {
  return <LineIcon {...props}><path d="M12 5v14M5 12h14" /></LineIcon>;
}

function ReceiptText(props: IconProps) {
  return <LineIcon {...props}><path d="M5 3v18l2-1 2 1 2-1 2 1 2-1 2 1 2-1V3Z" /><path d="M8 8h8M8 12h8M8 16h5" /></LineIcon>;
}

function RefreshCcw(props: IconProps) {
  return <LineIcon {...props}><path d="M3 12a8 8 0 0 1 13.7-5.6L19 9" /><path d="M19 4v5h-5" /><path d="M21 12a8 8 0 0 1-13.7 5.6L5 15" /><path d="M5 20v-5h5" /></LineIcon>;
}

function SearchCheck(props: IconProps) {
  return <LineIcon {...props}><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /><path d="m8.5 11 1.8 1.8 3.5-4" /></LineIcon>;
}

function ShieldCheck(props: IconProps) {
  return <LineIcon {...props}><path d="M12 2 4 5v6c0 5 3.4 9 8 11 4.6-2 8-6 8-11V5Z" /><path d="m8.5 12 2 2 5-5" /></LineIcon>;
}

function Store(props: IconProps) {
  return <LineIcon {...props}><path d="M4 10h16l-1-6H5Z" /><path d="M5 10v10h14V10" /><path d="M9 20v-6h6v6" /></LineIcon>;
}

function Upload(props: IconProps) {
  return <LineIcon {...props}><path d="M12 16V4" /><path d="m7 9 5-5 5 5" /><path d="M4 20h16" /></LineIcon>;
}

function UsersRound(props: IconProps) {
  return <LineIcon {...props}><path d="M16 11a4 4 0 1 0-8 0" /><path d="M4 21a8 8 0 0 1 16 0" /><path d="M20 8a3 3 0 0 1 0 6" /><path d="M4 8a3 3 0 0 0 0 6" /></LineIcon>;
}

interface PageProps {
  data: AppData;
  navigate: Navigate;
}

interface MutatingPageProps extends PageProps {
  setData: (data: AppData) => void;
}
