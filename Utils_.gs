/**
 * EduClass AI — Utils_.gs (Gói 0)
 * Hàm tiện ích nội bộ. Tên hàm kết thúc bằng "_" → trình duyệt KHÔNG gọi được.
 */
var __ssCache = null;

/** Thời điểm hiện tại dạng chữ, giờ Việt Nam: 2026-10-16T08:30:00+07:00 */
function nowIso_() {
  return Utilities.formatDate(new Date(), APP.TZ, "yyyy-MM-dd'T'HH:mm:ss") + APP.TZ_OFFSET;
}

/** Ngày dạng yyyy-MM-dd theo giờ Việt Nam (sửa lỗi B11) */
function dateStr_(d) {
  return Utilities.formatDate(d || new Date(), APP.TZ, 'yyyy-MM-dd');
}

/** Ngày hôm nay cộng/trừ n ngày */
function addDays_(n) {
  var d = new Date();
  d.setDate(d.getDate() + n);
  return d;
}

/** Ghép ngày + giờ thành chuỗi ISO giờ VN */
function dateTimeIso_(dateString, hhmm) {
  return dateString + 'T' + hhmm + ':00' + APP.TZ_OFFSET;
}

/** Tạo ID có tiền tố: stu_1a2b3c4d5e6f */
function newId_(prefix) {
  var raw = Utilities.getUuid().replace(/-/g, '').substring(0, 12);
  return prefix ? prefix + '_' + raw : raw;
}

/** Mở Spreadsheet (tự lưu ID ở lần đầu, không cần dán ID bằng tay) */
function getDb_() {
  if (__ssCache) return __ssCache;
  var props = PropertiesService.getScriptProperties();
  var id = props.getProperty('SPREADSHEET_ID');
  if (id) { __ssCache = SpreadsheetApp.openById(id); return __ssCache; }
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) throw new Error('Không tìm thấy Spreadsheet. Hãy mở Apps Script từ menu "Tiện ích mở rộng" của file Google Sheets.');
  props.setProperty('SPREADSHEET_ID', ss.getId());
  __ssCache = ss;
  return ss;
}

function getSheet_(name) {
  var sh = getDb_().getSheetByName(name);
  if (!sh) throw new Error('Thiếu sheet "' + name + '". Hãy chạy caiDatHeThong.');
  return sh;
}

function readHeaders_(sh) {
  var lastCol = sh.getLastColumn();
  if (lastCol === 0) return [];
  return sh.getRange(1, 1, 1, lastCol).getValues()[0].map(String);
}

/** Đọc 1 cột theo tên cột (không đọc cả sheet) */
function readColumn_(sheetName, colName) {
  var sh = getSheet_(sheetName);
  var idx = readHeaders_(sh).indexOf(colName);
  if (idx === -1 || sh.getLastRow() < 2) return [];
  return sh.getRange(2, idx + 1, sh.getLastRow() - 1, 1).getValues().map(function (r) { return String(r[0]); });
}

/** Ghi nhiều dòng một lần (batch) — nhanh, tiết kiệm quota */
function appendObjects_(sheetName, objs) {
  if (!objs || !objs.length) return 0;
  var sh = getSheet_(sheetName);
  var headers = readHeaders_(sh);
  var rows = objs.map(function (o) {
    return headers.map(function (h) {
      var v = o[h];
      if (v === undefined || v === null) return '';
      if (typeof v === 'object') return JSON.stringify(v);
      return String(v);
    });
  });
  var start = sh.getLastRow() + 1;
  var need = start + rows.length - 1;
  if (need > sh.getMaxRows()) sh.insertRowsAfter(sh.getMaxRows(), need - sh.getMaxRows() + 100);
  var rg = sh.getRange(start, 1, rows.length, headers.length);
  rg.setNumberFormat('@');
  rg.setValues(rows);
  return rows.length;
}

/** Tạo bản ghi mới có đủ cột hệ thống */
function buildRecord_(tableName, data, byEmail) {
  var rec = {};
  var t = nowIso_();
  schemaCols_(tableName).forEach(function (c) { rec[c] = ''; });
  Object.keys(data).forEach(function (k) { rec[k] = data[k]; });
  if (SCHEMA[tableName].meta) {
    rec.createdAt = t; rec.createdBy = byEmail;
    rec.updatedAt = t; rec.updatedBy = byEmail;
    rec.version = 1;
  }
  return rec;
}

/** Ghi AuditLog (thống nhất 1 cấu trúc — sửa lỗi B2) */
function writeAudit_(userEmail, action, entityType, entityId, before, after) {
  appendObjects_('AuditLog', [{
    logId: newId_('log'), userId: userEmail, userEmail: userEmail, action: action,
    entityType: entityType, entityId: entityId,
    beforeJson: before ? JSON.stringify(before) : '', afterJson: after ? JSON.stringify(after) : '',
    ipOrAgent: 'server', createdAt: nowIso_()
  }]);
}

/** Chỉ cho chủ sở hữu chạy (từ trình soạn thảo hoặc menu Sheets) */
function assertRunByOwner_() {
  var active = '';
  try { active = Session.getActiveUser().getEmail() || ''; } catch (e) { active = ''; }
  var owner = Session.getEffectiveUser().getEmail() || '';
  if (!active || active.toLowerCase() !== owner.toLowerCase()) {
    throw new Error('Chỉ chủ sở hữu được chạy hàm này từ trình soạn thảo Apps Script.');
  }
  return owner;
}
