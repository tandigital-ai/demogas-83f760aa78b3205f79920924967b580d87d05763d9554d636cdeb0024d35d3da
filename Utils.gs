/* AI-ARCHITECT-BANNER
 * Tác giả: TDA
 * Liên hệ: 0986509106
 * TDA — Think Daily. Act AI
 * © 2026
 */
const DATE_FORMAT = "dd/MM/yyyy";
const DATETIME_FORMAT = "dd/MM/yyyy HH:mm";
const CURRENCY_FORMAT = "VND";

function generateId() {
  return Utilities.getUuid();
}

function formatDate(date, format) {
  if (!date) return "";
  try {
    const d = new Date(date);
    if (isNaN(d.getTime())) return "";
    return Utilities.formatDate(d, Session.getScriptTimeZone(), format || DATE_FORMAT);
  } catch (e) {
    return "";
  }
}

function formatCurrency(amount) {
  if (typeof amount !== "number" || isNaN(amount)) {
    amount = Number(amount) || 0;
  }
  return amount.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
}

function validateEmail(email) {
  if (!email || typeof email !== "string") return false;
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validatePhone(phone) {
  if (!phone || typeof phone !== "string") return false;
  const re = /^[0-9\+\-\s\(\)]{8,15}$/;
  return re.test(phone);
}

function handleError(error, context) {
  const message = `[Lỗi trong ${context || "Hệ thống"}]: ${error.message || error}`;
  console.error(message, error.stack);
  try {
    const ss = getSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAMES.AUDIT_LOG);
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAMES.AUDIT_LOG);
      sheet.appendRow(["Timestamp", "Action", "Entity", "EntityId", "UserEmail", "Details"]);
    }
    sheet.appendRow([getCurrentTimestamp(), "ERROR", context || "SYSTEM", "", getUserEmail ? getUserEmail() : "system", message]);
  } catch (logErr) {
    console.error("Không thể ghi log lỗi vào sheet AuditLog:", logErr);
  }
}

function getCurrentTimestamp() {
  return new Date();
}

function isValidDateRange(startDate, endDate) {
  if (!startDate || !endDate) return false;
  const start = new Date(startDate);
  const end = new Date(endDate);
  return !isNaN(start.getTime()) && !isNaN(end.getTime()) && start <= end;
}

function calculateAge(dob) {
  if (!dob) return 0;
  const birthDate = new Date(dob);
  if (isNaN(birthDate.getTime())) return 0;
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

function generateRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function parseScheduleJson(scheduleJson) {
  if (!scheduleJson) return {};
  try {
    if (typeof scheduleJson === "object") return scheduleJson;
    return JSON.parse(scheduleJson);
  } catch (e) {
    return {};
  }
}

function stringifySchedule(schedule) {
  if (!schedule) return "{}";
  try {
    if (typeof schedule === "string") return schedule;
    return JSON.stringify(schedule);
  } catch (e) {
    return "{}";
  }
}

function calculateSessionDuration(startTime, endTime) {
  if (!startTime || !endTime) return 0;
  const start = new Date(startTime);
  const end = new Date(endTime);
  if (isNaN(start.getTime()) || isNaN(end.getTime())) return 0;
  const diffMs = end - start;
  return Math.round(diffMs / (1000 * 60)); // trả về số phút
}

function calculateFeeTotal(fee) {
  if (!fee) return 0;
  const sessionCount = Number(fee.sessionCount) || 0;
  const unitPrice = Number(fee.unitPrice) || 0;
  const subtotal = sessionCount * unitPrice;
  const surcharge = Number(fee.surcharge) || 0;
  const discount = Number(fee.discount) || 0;
  const previousDebt = Number(fee.previousDebt) || 0;
  return subtotal + surcharge - discount + previousDebt;
}

function calculateFeeBalance(fee) {
  if (!fee) return 0;
  const total = Number(fee.total) || calculateFeeTotal(fee);
  const paid = Number(fee.paid) || 0;
  return total - paid;
}

function generateReceiptNumber() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `PT-${year}${month}${day}-${rand}`;
}

function calculateAverageScore(scores) {
  if (!Array.isArray(scores) || scores.length === 0) return 0;
  let totalWeight = 0;
  let weightedSum = 0;
  for (let i = 0; i < scores.length; i++) {
    const s = scores[i];
    const scoreVal = Number(s.score) || 0;
    const weightVal = Number(s.weight) || 1;
    weightedSum += scoreVal * weightVal;
    totalWeight += weightVal;
  }
  if (totalWeight === 0) return 0;
  return Number((weightedSum / totalWeight).toFixed(2));
}

function generateCommentSummary(comments) {
  if (!Array.isArray(comments) || comments.length === 0) return "Chưa có nhận xét.";
  let summary = `Tổng hợp ${comments.length} nhận xét gần nhất:\n`;
  for (let i = 0; i < comments.length; i++) {
    summary += `- [${comments[i].type || "Chung"}]: ${comments[i].content}\n`;
  }
  return summary;
}

function validateAttendanceStatus(status) {
  const validStatuses = ["PRESENT", "ABSENT", "LATE", "EXCUSED"];
  return validStatuses.includes(status);
}

function validateScoreType(scoreType) {
  const validTypes = ["15M", "45M", "MIDTERM", "FINAL", "ORAL", "QUIZ"];
  return validTypes.includes(scoreType) || (typeof scoreType === "string" && scoreType.length > 0);
}

function validateFeeType(feeType) {
  const validTypes = ["MONTHLY", "PER_SESSION", "COURSE", "OTHER"];
  return validTypes.includes(feeType) || (typeof feeType === "string" && feeType.length > 0);
}

function validateCommentType(commentType) {
  const validTypes = ["GENERAL", "BEHAVIOR", "ACADEMIC", "HOMEWORK", "WARNING"];
  return validTypes.includes(commentType) || (typeof commentType === "string" && commentType.length > 0);
}

function validateMaterialType(materialType) {
  const validTypes = ["PDF", "VIDEO", "LINK", "DOCUMENT", "IMAGE"];
  return validTypes.includes(materialType) || (typeof materialType === "string" && materialType.length > 0);
}

function validateAssignmentStatus(status) {
  const validStatuses = ["DRAFT", "PUBLISHED", "CLOSED"];
  return validStatuses.includes(status);
}

function validateSubmissionStatus(status) {
  const validStatuses = ["SUBMITTED", "GRADED", "LATE", "MISSING"];
  return validStatuses.includes(status);
}

function generateAiPrompt(context, params) {
  let prompt = `Ngữ cảnh: ${context}\n`;
  if (params && typeof params === "object") {
    prompt += `Tham số:\n`;
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        prompt += `- ${key}: ${JSON.stringify(params[key])}\n`;
      }
    }
  }
  return prompt;
}

function parseAiResponse(response) {
  if (!response) return {};
  try {
    if (typeof response === "object") return response;
    // Cố gắng lọc JSON nếu AI trả về kèm text markdown
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    return JSON.parse(response);
  } catch (e) {
    return { rawResponse: response };
  }
}

function calculateAttendancePercentage(attendanceRecords) {
  if (!Array.isArray(attendanceRecords) || attendanceRecords.length === 0) return 100;
  let presentCount = 0;
  for (let i = 0; i < attendanceRecords.length; i++) {
    const status = attendanceRecords[i].status;
    if (status === "PRESENT" || status === "LATE") {
      presentCount++;
    }
  }
  return Number(((presentCount / attendanceRecords.length) * 100).toFixed(1));
}

function generateReportData(reportType, params) {
  return {
    reportType: reportType,
    generatedAt: new Date(),
    params: params || {},
    data: []
  };
}

function generatePdfContent(template, data) {
  return `<html><head><title>${template}</title></head><body><h1>Báo cáo ${template}</h1><pre>${JSON.stringify(data, null, 2)}</pre></body></html>`;
}

function generateExcelData(reportType, data) {
  const rows = [];
  rows.push(["Báo cáo:", reportType]);
  rows.push(["Thời gian:", new Date().toLocaleString()]);
  rows.push([]);
  if (Array.isArray(data) && data.length > 0) {
    const headers = Object.keys(data[0]);
    rows.push(headers);
    for (let i = 0; i < data.length; i++) {
      const row = [];
      for (let j = 0; j < headers.length; j++) {
        row.push(data[i][headers[j]] !== undefined ? data[i][headers[j]] : "");
      }
      rows.push(row);
    }
  }
  return rows;
}

function generateNotificationMessage(type, params) {
  let message = `Thông báo từ EduClass AI: `;
  if (type === "FEE_REMINDER") {
    message += `Kính gửi phụ huynh, học phí kỳ ${params.period || ""} của học sinh ${params.studentName || ""} còn thiếu ${formatCurrency(params.balance || 0)}. Quý phụ huynh vui lòng thanh toán sớm.`;
  } else if (type === "SCORE_UPDATE") {
    message += `Học sinh ${params.studentName || ""} vừa có điểm môn ${params.subject || ""}: ${params.score || 0} (${params.scoreType || ""}).`;
  } else {
    message += `Bạn có thông báo mới về lớp học ${params.className || ""}.`;
  }
  return message;
}