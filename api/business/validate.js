import { jsonResult, runJsonPost } from "../_http.js";

const NTS_VALIDATE_URL = "https://api.odcloud.kr/api/nts-businessman/v1/validate";

function cleanBusinessNumber(value) {
  return String(value ?? "").replace(/\D/g, "").slice(0, 10);
}

function cleanDate(value) {
  return String(value ?? "").replace(/\D/g, "").slice(0, 8);
}

function cleanText(value) {
  return String(value ?? "").normalize("NFKC").trim().slice(0, 80);
}

function mapStatus(record) {
  const statusCode = String(record?.status?.b_stt_cd ?? record?.b_stt_cd ?? "").trim();
  const statusLabel = String(record?.status?.b_stt ?? record?.b_stt ?? "").trim();
  if (statusCode === "01" || statusLabel.includes("계속")) return "active";
  if (statusCode === "02" || statusLabel.includes("휴업")) return "suspended";
  if (statusCode === "03" || statusLabel.includes("폐업")) return "closed";
  if (statusCode === "" || statusCode === "00") return "unregistered";
  return "unknown";
}

function isValidRecord(record) {
  const validCode = String(record?.valid ?? "").toUpperCase();
  return validCode === "01" || validCode === "Y";
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
  const representativeName = cleanText(body.representativeName);
  const openingDate = cleanDate(body.openingDate);

  if (businessNumber.length !== 10 || !representativeName || openingDate.length !== 8) {
    return jsonResult(400, {
      ok: false,
      status: "unregistered",
      label: "진위 확인 입력 오류",
      valid: false,
      canRegister: false,
      manualReviewRequired: false,
      message: "사업자번호 10자리, 대표자명, 개업일자 8자리를 모두 입력해 주세요.",
    });
  }

  if (!serviceKey) {
    return jsonResult(503, {
      ok: false,
      status: "api_error",
      label: "국세청 API 설정 필요",
      valid: false,
      canRegister: true,
      manualReviewRequired: true,
      message: "사업자 인증 서비스키가 설정되지 않아 수동 검토로 접수할 수 있습니다.",
    });
  }

  try {
    const response = await globalThis.fetch(`${NTS_VALIDATE_URL}?serviceKey=${encodeURIComponent(serviceKey)}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        businesses: [
          {
            b_no: businessNumber,
            start_dt: openingDate,
            p_nm: representativeName,
          },
        ],
      }),
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) {
      return jsonResult(502, {
        ok: false,
        status: "api_error",
        label: "국세청 API 오류",
        valid: false,
        canRegister: true,
        manualReviewRequired: true,
        message: ntsErrorMessage(result, "국세청 진위 확인이 지연되어 수동 검토로 접수할 수 있습니다."),
        rawStatusCode: String(response.status),
      });
    }
    const record = Array.isArray(result?.data) ? result.data[0] : null;
    const status = mapStatus(record);
    const valid = isValidRecord(record);
    return jsonResult(200, {
      ok: valid,
      status,
      label: record?.status?.b_stt || record?.b_stt || (valid ? "진위 확인 완료" : "확인 필요"),
      taxType: record?.status?.tax_type || record?.tax_type,
      valid,
      validCode: record?.valid,
      canRegister: valid || status === "unregistered" || status === "unknown",
      manualReviewRequired: !valid,
      message: valid ? "대표자명과 개업일자가 일치해 사업자 인증이 완료되었습니다." : "대표자명 또는 개업일자가 국세청 자료와 일치하지 않아 수동 검토가 필요합니다.",
      rawStatusCode: record?.status?.b_stt_cd || record?.b_stt_cd,
    });
  } catch {
    return jsonResult(502, {
      ok: false,
      status: "api_error",
      label: "국세청 API 오류",
      valid: false,
      canRegister: true,
      manualReviewRequired: true,
      message: "국세청 진위 확인 중 오류가 발생해 수동 검토로 접수할 수 있습니다.",
    });
  }
}

export default async function handler(request, response) {
  return runJsonPost(request, response, handlePostBody);
}

export async function fetch(request) {
  return handler(request);
}
