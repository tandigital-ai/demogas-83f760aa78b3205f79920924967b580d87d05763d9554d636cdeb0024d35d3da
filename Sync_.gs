/** EduClass AI — Sync_.gs: mutation (optimistic) + chống ghi lặp + version + log */
function mutators_() {
  return { Users: mutUsers_, Roles: mutRoles_, Settings: mutSettings_, Students: mutStudents_, Classes: mutClasses_, ClassMembers: mutMembers_ };
}
function runMutations_(ctx, list) {
  var lock = LockService.getScriptLock();
  if (!lock.tryLock(20000)) throw err_('QUOTA_LIMIT', 'Hệ thống đang bận, vui lòng thử lại');
  try {
    var results = [], logs = [], audits = [], t = nowIso_();
    list.forEach(function (m) {
      m = m || {};
      try {
        if (!/^txn_[a-z0-9]{8,40}$/.test(String(m.clientTxnId || ''))) throw err_('VALIDATION_ERROR', 'Thiếu mã giao dịch');
        var dupRow = findRow_('MutationLog', 'clientTxnId', m.clientTxnId);
        if (dupRow > 0 && getRowObj_('MutationLog', dupRow).status === 'OK') {
          var cur = getRecord_(m.entityType, m.entityId);
          results.push({ ok: true, duplicate: true, clientTxnId: m.clientTxnId, record: cur ? clean_(cur) : null });
          return;
        }
        var fn = mutators_()[m.entityType];
        if (!fn) throw err_('VALIDATION_ERROR', 'Loại dữ liệu chưa hỗ trợ: ' + m.entityType);
        var r = fn(ctx, m), sv = bumpServerVersion_();
        logs.push({ mutationId: newId_('mut'), clientTxnId: m.clientTxnId, userId: ctx.user.userId,
          entityType: m.entityType, entityId: m.entityId, action: m.op, payloadJson: JSON.stringify(m.payload || {}),
          status: 'OK', serverVersion: sv, errorMessage: '', createdAt: t });
        audits.push({ logId: newId_('log'), userId: ctx.user.userId, userEmail: ctx.email,
          action: m.entityType.toUpperCase() + '_' + String(m.op).toUpperCase(), entityType: m.entityType,
          entityId: m.entityId, beforeJson: r.before ? JSON.stringify(r.before) : '',
          afterJson: JSON.stringify(r.after), ipOrAgent: 'webapp', createdAt: t });
        results.push({ ok: true, clientTxnId: m.clientTxnId, record: r.after, serverVersion: sv, note: r.note || '' });
      } catch (e) {
        logs.push({ mutationId: newId_('mut'), clientTxnId: m.clientTxnId || '', userId: ctx.user.userId,
          entityType: m.entityType || '', entityId: m.entityId || '', action: m.op || '',
          payloadJson: JSON.stringify(m.payload || {}), status: e.code || 'UNKNOWN_ERROR', serverVersion: '',
          errorMessage: e.message, createdAt: t });
        results.push({ ok: false, clientTxnId: m.clientTxnId, errorCode: e.code || 'UNKNOWN_ERROR',
          message: e.message, details: e.details || {} });
      }
    });
    appendObjects_('MutationLog', logs);
    appendObjects_('AuditLog', audits);
    return results;
  } finally {
    lock.releaseLock();
  }
}
var USER_FIELDS = ['fullName', 'phone', 'role', 'status', 'permissionsOverrideJson', 'aiDailyLimit',
  'allowedClassIds', 'linkedStudentIds', 'note'];
function mutUsers_(ctx, m) {
  var p = Object.assign({}, m.payload || {}), self = m.entityId === ctx.user.userId;
  if (m.op === 'create') {
    need_(ctx, 'users', 'create');
    if (!/^user_[a-z0-9]{12}$/.test(m.entityId)) throw err_('VALIDATION_ERROR', 'Mã người dùng không hợp lệ');
    var email = String(p.email || '').trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw err_('VALIDATION_ERROR', 'Email không hợp lệ');
    if (findUserByEmail_(email)) throw err_('VALIDATION_ERROR', 'Email này đã có trong hệ thống');
    if (!getRoles_()[p.role]) throw err_('VALIDATION_ERROR', 'Vai trò không hợp lệ');
    if (!String(p.fullName || '').trim()) throw err_('VALIDATION_ERROR', 'Thiếu họ tên');
    var rec = buildRecord_('Users', { userId: m.entityId, email: email, fullName: String(p.fullName).trim(),
      role: p.role, status: 'ACTIVE', phone: String(p.phone || '') }, ctx.email);
    appendObjects_('Users', [rec]);
    return { before: null, after: rec };
  }
  if (m.op !== 'update') throw err_('VALIDATION_ERROR', 'Thao tác không hỗ trợ');
  need_(ctx, 'users', 'update');
  if ('status' in p) {
    need_(ctx, 'users', 'lock');
    if (self) throw err_('VALIDATION_ERROR', 'Không thể tự khóa tài khoản của mình');
    if (ENUMS.USER_STATUS.indexOf(p.status) < 0) throw err_('VALIDATION_ERROR', 'Trạng thái không hợp lệ');
  }
  if ('role' in p) {
    if (self) throw err_('VALIDATION_ERROR', 'Không thể tự đổi vai trò của mình');
    if (!getRoles_()[p.role]) throw err_('VALIDATION_ERROR', 'Vai trò không hợp lệ');
  }
  if ('permissionsOverrideJson' in p) {
    need_(ctx, 'roles', 'update');
    if (self) throw err_('VALIDATION_ERROR', 'Không thể tự sửa quyền của mình');
    p.permissionsOverrideJson = sanitizeOverride_(p.permissionsOverrideJson);
  }
  if ('aiDailyLimit' in p) p.aiDailyLimit = (p.aiDailyLimit === '' || p.aiDailyLimit === null) ? '' : Math.max(0, parseInt(p.aiDailyLimit, 10) || 0);
  var r = updateRecord_('Users', m.entityId, p, m.clientVersion, ctx.email, USER_FIELDS);
  CacheService.getScriptCache().remove('usr_' + m.entityId);
  return r;
}
function mutRoles_(ctx, m) {
  need_(ctx, 'roles', 'update');
  if (m.op !== 'update') throw err_('VALIDATION_ERROR', 'Thao tác không hỗ trợ');
  if (m.entityId === 'ADMIN') throw err_('VALIDATION_ERROR', 'Vai trò Quản trị viên luôn có toàn quyền, không sửa được');
  var p = m.payload || {}, patch = {};
  if ('permissions' in p) patch.permissionsJson = JSON.stringify(sanitizePermMap_(p.permissions));
  if ('roleName' in p) patch.roleName = String(p.roleName).substring(0, 60);
  var r = updateRecord_('Roles', m.entityId, patch, m.clientVersion, ctx.email, ['permissionsJson', 'roleName']);
  CacheService.getScriptCache().remove('roles');
  return r;
}
function mutSettings_(ctx, m) {
  need_(ctx, 'settings', 'update');
  var def = DEFAULT_SETTINGS.filter(function (s) { return s[1] === m.entityId; })[0];
  if (!def) throw err_('VALIDATION_ERROR', 'Cài đặt không tồn tại');
  var v = String((m.payload || {}).value === undefined ? '' : m.payload.value).trim();
  if (def[3] === 'number' && (v === '' || isNaN(Number(v)) || Number(v) < 0)) throw err_('VALIDATION_ERROR', def[4] + ': phải là số ≥ 0');
  if (def[3] === 'boolean' && ['true', 'false'].indexOf(v) < 0) throw err_('VALIDATION_ERROR', 'Giá trị phải là true/false');
  if (def[3] === 'color' && !/^#[0-9a-fA-F]{6}$/.test(v)) throw err_('VALIDATION_ERROR', 'Mã màu dạng #RRGGBB');
  if (def[3] === 'json') { try { JSON.parse(v); } catch (e) { throw err_('VALIDATION_ERROR', 'Sai định dạng JSON'); } }
  if (m.entityId === 'AI_MODEL') v = cleanModel_(v);
  var row = findRow_('Settings', 'key', m.entityId);
  if (row < 0) throw err_('NOT_FOUND', 'Thiếu dòng cài đặt, hãy chạy caiDatHeThong');
  var cur = getRowObj_('Settings', row), before = clean_(cur);
  cur.value = v; cur.updatedAt = nowIso_(); cur.updatedBy = ctx.email;
  writeRecord_('Settings', cur);
  invalidateSettings_();
  return { before: before, after: clean_(cur) };
}
/** Polling nhẹ: trả danh sách bản ghi đổi sau version client đang có */
function apiSyncSince_(ctx, p) {
  var since = Number(p.version || 0), sv = getServerVersion_();
  if (!since || since >= sv) return { serverVersion: sv, changes: [] };
  var sh = getSheet_('MutationLog'), lr = sh.getLastRow(), changes = {}, h = readHeaders_(sh);
  if (lr >= 2) {
    var start = Math.max(2, lr - 299);
    var vals = sh.getRange(start, 1, lr - start + 1, h.length).getValues();
    var iT = h.indexOf('entityType'), iI = h.indexOf('entityId'), iS = h.indexOf('status'), iV = h.indexOf('serverVersion');
    vals.forEach(function (r) {
      if (r[iS] === 'OK' && Number(r[iV]) > since) changes[r[iT] + '|' + r[iI]] = { entityType: r[iT], entityId: r[iI] };
    });
  }
  return { serverVersion: sv, changes: Object.keys(changes).map(function (k) { return changes[k]; }) };
}
