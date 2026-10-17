/** EduClass AI — Db_.gs: đọc/ghi Sheets an toàn, version, settings, server version */
function err_(code, msg, details) {
  var e = new Error(msg); e.code = code; e.details = details || {}; return e;
}
function toText_(v) {
  if (v === undefined || v === null) return '';
  if (typeof v === 'object') return JSON.stringify(v);
  return String(v);
}
/** Chuẩn hóa ô: Date → chuỗi ISO (sửa lỗi B1), cột số → number */
function normCell_(h, v) {
  if (v instanceof Date) v = Utilities.formatDate(v, APP.TZ, "yyyy-MM-dd'T'HH:mm:ss") + APP.TZ_OFFSET;
  if (v === '' || v === null || v === undefined) return '';
  if (NUMERIC_FIELDS.indexOf(h) > -1) { var n = Number(v); return isNaN(n) ? '' : n; }
  return String(v);
}
function clean_(o) {
  var c = {}; Object.keys(o).forEach(function (k) { if (k !== '_row') c[k] = o[k]; }); return c;
}
/** Đọc cả bảng 1 lần (batch). Mặc định bỏ bản ghi đã xóa mềm */
function readTable_(name, withDeleted) {
  var sh = getSheet_(name), lr = sh.getLastRow(), lc = sh.getLastColumn();
  if (lr < 2) return [];
  var vals = sh.getRange(1, 1, lr, lc).getValues(), h = vals[0].map(String), out = [];
  for (var i = 1; i < vals.length; i++) {
    var o = {}, empty = true;
    for (var j = 0; j < h.length; j++) {
      if (!h[j]) continue;
      o[h[j]] = normCell_(h[j], vals[i][j]);
      if (o[h[j]] !== '') empty = false;
    }
    if (empty) continue;
    if (!withDeleted && o.deletedAt) continue;
    out.push(o);
  }
  return out;
}
/** Tìm số dòng theo giá trị cột (TextFinder – không đọc cả sheet) */
function findRow_(name, col, value) {
  var sh = getSheet_(name), idx = readHeaders_(sh).indexOf(col), lr = sh.getLastRow();
  if (idx < 0 || lr < 2 || value === '' || value === null || value === undefined) return -1;
  var cell = sh.getRange(2, idx + 1, lr - 1, 1).createTextFinder(String(value)).matchEntireCell(true).findNext();
  return cell ? cell.getRow() : -1;
}
function getRowObj_(name, row) {
  var sh = getSheet_(name), h = readHeaders_(sh);
  var vals = sh.getRange(row, 1, 1, h.length).getValues()[0], o = { _row: row };
  h.forEach(function (k, j) { if (k) o[k] = normCell_(k, vals[j]); });
  return o;
}
function getRecord_(name, id) {
  var row = findRow_(name, SCHEMA[name].id, id);
  return row < 0 ? null : getRowObj_(name, row);
}
function writeRecord_(name, obj) {
  var sh = getSheet_(name), h = readHeaders_(sh);
  var rg = sh.getRange(obj._row, 1, 1, h.length);
  rg.setNumberFormat('@');
  rg.setValues([h.map(function (k) { return toText_(obj[k]); })]);
}
/** Cập nhật có kiểm tra version (chống xung đột). Gọi khi ĐANG giữ Lock */
function updateRecord_(name, id, patch, clientVersion, by, allowed) {
  var cur = getRecord_(name, id);
  if (!cur || cur.deletedAt) throw err_('NOT_FOUND', 'Không tìm thấy dữ liệu');
  var meta = SCHEMA[name].meta;
  if (meta && clientVersion !== null && clientVersion !== undefined && clientVersion !== ''
      && Number(clientVersion) !== Number(cur.version)) {
    throw err_('VERSION_CONFLICT', 'Dữ liệu vừa được người khác sửa', { server: clean_(cur) });
  }
  var before = clean_(cur), next = Object.assign({}, cur);
  Object.keys(patch).forEach(function (k) { if (allowed.indexOf(k) > -1) next[k] = patch[k]; });
  if (meta) { next.version = Number(cur.version || 0) + 1; next.updatedAt = nowIso_(); next.updatedBy = by; }
  writeRecord_(name, next);
  return { before: before, after: clean_(next) };
}
function setCell_(name, row, col, value) {
  var sh = getSheet_(name), idx = readHeaders_(sh).indexOf(col);
  if (idx > -1) sh.getRange(row, idx + 1).setNumberFormat('@').setValue(toText_(value));
}
/* ---------- Server version (dùng cho syncSince) ---------- */
function getServerVersion_() {
  return Number(PropertiesService.getScriptProperties().getProperty('SERVER_VERSION') || 0);
}
function bumpServerVersion_() {
  var n = getServerVersion_() + 1;
  PropertiesService.getScriptProperties().setProperty('SERVER_VERSION', String(n));
  return n;
}
/* ---------- Settings (cache 5 phút, luôn có fallback đọc Sheets) ---------- */
function getSettings_() {
  var cache = CacheService.getScriptCache(), hit = cache.get('settings');
  if (hit) return JSON.parse(hit);
  var s = {};
  readTable_('Settings').forEach(function (r) {
    var v = r.value;
    if (r.type === 'number') v = Number(v);
    else if (r.type === 'boolean') v = String(v) === 'true';
    s[r.key] = v;
  });
  cache.put('settings', JSON.stringify(s), 300);
  return s;
}
function invalidateSettings_() { CacheService.getScriptCache().remove('settings'); }
