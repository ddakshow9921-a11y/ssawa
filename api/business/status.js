import { jsonResult, runJsonPost } from "../_http.js";

const NTS_STATUS_URL = "https://api.odcloud.kr/api/nts-businessman/v1/status";

function cleanBusinessNumber(value) {
  return String(value ?? "").replace(/\D/g, "").slice(0, 10);
}

function mapStatus(record) {
  const statusCode = String(record?.b_stt_cd ?? "").trim();
  const statusLabel = String(record?.b_stt ?? "").trim();
  if (statusCode === "01" || statusLabel.includes("계속")) return "active";
  if (statusCode === "02" || statusLabel.includes("휴업")) return "suspended";
  if (statusCode === "03" || statusLabel.includes("폐업")) return "closed";
  if (statusCode === "" || statusCode === "00") return "unregistered";
  return "unknown";
}

function statusMessage(status) {
  if (status === "active") return "계속사업자로 확인되었습니다. 대표자명과 개업일자로 진위 확인을 진행해 주세요.";
  if (status === "suspended") return "휴업 상태 사업자는 싸와! 가입이 제한됩니다.";
  if (status === "closed") return "폐업 상태 사업자는 싸와! 가입이 제한됩니다.";
  if (status === "unregistered") return "국세청 상태 조회에 표시되지 않아 수동 검토로 접수할 수 있습니다.";
  return "사업자 상태를 추가 확인해야 합니다.";
}

function ntsErrorMessage(payload, fallback) {
  const message = String(payload?.message ?? payload?.msg ?? payload?.returnAuthMsg ?? payload?.error ?? "").trim();
  if (message.includes("SERVICE_KEY") || message.includes("service key") || message.includes("인증키")) {
    return "공공데이터포털 사업자등록정보 서비스키가 유효하지 않거나 아직 활성화되지 않았습니다.";
  }
  return message || fallback;
}

async function handlePostBody(body) {
  const serviceKey = process.env.NTS_BUSINESS_SERVICE_KEY;
  const businessNumber = cleanBusinessNumber(body.businessNumber);

  if (businessNumber.length !== 10) {
    return jsonResult(400, {
      ok: false,
      status: "unregistered",
      label: "사업자번호 형식 오류",
      canRegister: false,
      manualReviewRequired: false,
      message: "사업자등록번호 10자리를 입력해 주세요.",
    });
  }

  if (!serviceKey) {
    return jsonResult(503, {
      ok: false,
      status: "api_error",
      label: "국세청 API 설정 필요",
      canRegister: true,
      manualReviewRequired: true,
      message: "사업자 인증 서비스키가 설정되지 않아 수동 검토로 접수할 수 있습니다.",
    });
  }

  try {
    const response = await globalThis.fetch(`${NTS_STATUS_URL}?serviceKey=${encodeURIComponent(serviceKey)}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ b_no: [businessNumber] }),
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) {
      return jsonResult(502, {
        ok: false,
        status: "api_error",
        label: "국세청 API 오류",
        canRegister: true,
        manualReviewRequired: true,
        message: ntsErrorMessage(result, "국세청 상태 확인이 지연되어 수동 검토로 접수할 수 있습니다."),
        rawStatusCode: String(response.status),
      });
    }
    const record = Array.isArray(result?.data) ? result.data[0] : null;
    const status = mapStatus(record);
    const canRegister = status === "active" || status === "unregistered" || status === "unknown";
    return jsonResult(200, {
      ok: status === "active",
      status,
      label: record?.b_stt || (status === "api_error" ? "API 오류" : "확인 필요"),
      taxType: record?.tax_type,
      canRegister,
      manualReviewRequired: status === "unregistered" || status === "unknown",
      message: statusMessage(status),
      rawStatusCode: record?.b_stt_cd,
    });
  } catch {
    return jsonResult(502, {
      ok: false,
      status: "api_error",
      label: "국세청 API 오류",
      canRegister: true,
      manualReviewRequired: true,
      message: "국세청 상태 확인 중 오류가 발생해 수동 검토로 접수할 수 있습니다.",
    });
  }
}

export default async function handler(request, response) {
  return runJsonPost(request, response, handlePostBody);
}

export async function fetch(request) {
  return handler(request);
}
