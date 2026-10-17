/** EduClass AI — Students_.gs (Gói 2): phạm vi dữ liệu, học sinh, tài khoản phụ huynh */
var STUDENT_FIELDS = ['fullName', 'dob', 'gender', 'phone', 'email', 'address', 'parentName', 'parentPhone',
  'parentEmail', 'school', 'grade', 'goal', 'entryLevel', 'source', 'status', 'startDate', 'note'];
var __stuMax = null;

/* ---------- PHẠM VI DỮ LIỆU THEO VAI TRÒ ---------- */
function scopeOf_(ctx) { return (getRoles_()[ctx.role] || {}).dataScope || 'SELF'; }
/** null = xem tất cả; mảng = chỉ các lớp này */
function scopeClassIds_(ctx) {
  var sc = scopeOf_(ctx);
  if (sc === 'ALL') return null;
  if (sc !== 'ASSIGNED') return [];
  var uid = ctx.user.userId, extra = String(ctx.user.allowedClassIds || '').split(',').filter(String);
  return readTable_('Classes').filter(function (c) {
    return c.teacherId === uid || String(c.assistantIds || '').split(',').indexOf(uid) > -1 || extra.indexOf(c.classId) > -1;
  }).map(function (c) { return c.classId; });
}
function scopeStudentIds_(ctx, members) {
  var sc = scopeOf_(ctx);
  if (sc === 'ALL') return null;
  if (sc === 'CHILDREN' || sc === 'SELF') return String(ctx.user.linkedStudentIds || '').split(',').filter(String);
  var cids = scopeClassIds_(ctx);
  return (members || readTable_('ClassMembers')).filter(function (m) { return cids.indexOf(m.classId) > -1; })
    .map(function (m) { return m.studentId; });
}
function inScopeStudent_(ctx, sid) {
  var ids = scopeStudentIds_(ctx);
  if (ids && ids.indexOf(sid) < 0) throw err_('PERMISSION_DENIED', 'Học sinh này không thuộc phạm vi của bạn');
}
function inScopeClass_(ctx, cid) {
  var ids = scopeClassIds_(ctx);
  if (ids && ids.indexOf(cid) < 0) throw err_('PERMISSION_DENIED', 'Lớp này không thuộc phạm vi của bạn');
}

/* ---------- TẢI DỮ LIỆU MÀN HỌC SINH + LỚP (1 lần gọi) ---------- */
function apiPeopleLoad_(ctx) {
  var canS = can_(ctx.perms, 'students', 'view'), canC = can_(ctx.perms, 'classes', 'view');
  if (!canS && !canC) throw err_('PERMISSION_DENIED', 'Bạn không có quyền xem dữ liệu này');
  var members = readTable_('ClassMembers'), cids = scopeClassIds_(ctx), sids = scopeStudentIds_(ctx, members);
  var out = { students: [], classes: [], members: [], staff: [] };
  out.classes = readTable_('Classes').filter(function (c) { return !cids || cids.indexOf(c.classId) > -1; });
  var visible = {}; out.classes.forEach(function (c) { visible[c.classId] = 1; });
  out.members = members.filter(function (m) { return visible[m.classId] && (!sids || sids.indexOf(m.studentId) > -1); });
  if (canS) out.students = readTable_('Students').filter(function (s) { return !sids || sids.indexOf(s.studentId) > -1; });
  if (canC) out.staff = readTable_('Users').filter(function (u) {
    return u.status === 'ACTIVE' && ['ADMIN', 'TEACHER', 'ASSISTANT'].indexOf(u.role) > -1;
  }).map(function (u) { return { userId: u.userId, fullName: u.fullName, role: u.role }; });
  return out;
}

/* ---------- KIỂM TRA DỮ LIỆU ---------- */
function validateStudent_(d, isCreate) {
  if (isCreate && !d.fullName) throw err_('VALIDATION_ERROR', 'Thiếu họ tên học sinh');
  if ('fullName' in d && !d.fullName) throw err_('VALIDATION_ERROR', 'Họ tên không được để trống');
  ['dob', 'startDate'].forEach(function (k) {
    if (d[k] && !/^\d{4}-\d{2}-\d{2}$/.test(d[k])) throw err_('VALIDATION_ERROR', 'Ngày không hợp lệ (yyyy-mm-dd): ' + k);
  });
  ['email', 'parentEmail'].forEach(function (k) {
    if (d[k] && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d[k])) throw err_('VALIDATION_ERROR', 'Email không hợp lệ: ' + d[k]);
  });
  if (d.gender && ['Nam', 'Nữ', 'Khác'].indexOf(d.gender) < 0) throw err_('VALIDATION_ERROR', 'Giới tính không hợp lệ');
  if (d.status && !ENUMS.STUDENT_STATUS[d.status]) throw err_('VALIDATION_ERROR', 'Trạng thái không hợp lệ');
  if (d.parentEmail) d.parentEmail = d.parentEmail.toLowerCase();
}
function nextStudentCode_() {
  if (__stuMax === null) {
    __stuMax = 0;
    readColumn_('Students', 'code').forEach(function (c) {
      var m = /^HS(\d+)$/.exec(c); if (m) __stuMax = Math.max(__stuMax, Number(m[1]));
    });
  }
  __stuMax++;
  return 'HS' + ('000' + __stuMax).slice(-4);
}

/** Tạo/gắn tài khoản phụ huynh theo email (gom nhiều con) */
function linkParent_(ctx, stu) {
  var email = String(stu.parentEmail || '').trim().toLowerCase();
  if (!email) return '';
  var u = findUserByEmail_(email);
  if (!u) {
    appendObjects_('Users', [buildRecord_('Users', { userId: newId_('user'), email: email,
      fullName: stu.parentName || ('Phụ huynh ' + stu.fullName), role: 'PARENT', status: 'ACTIVE',
      phone: stu.parentPhone || '', linkedStudentIds: stu.studentId }, ctx.email)]);
    return 'Đã lưu ✓ · Đã tạo tài khoản phụ huynh ' + email;
  }
  if (u.role !== 'PARENT') return 'Đã lưu ✓ · Email phụ huynh trùng tài khoản ' + u.role + ' nên không gắn tự động';
  var ids = String(u.linkedStudentIds || '').split(',').filter(String);
  if (ids.indexOf(stu.studentId) > -1) return '';
  ids.push(stu.studentId);
  setCell_('Users', findRow_('Users', 'userId', u.userId), 'linkedStudentIds', ids.join(','));
  CacheService.getScriptCache().remove('usr_' + u.userId);
  return 'Đã lưu ✓ · Đã gắn vào tài khoản phụ huynh ' + email + ' (' + ids.length + ' con)';
}

/* ---------- MUTATION HỌC SINH ---------- */
function mutStudents_(ctx, m) {
  var p = m.payload || {}, d = {};
  STUDENT_FIELDS.forEach(function (k) { if (k in p) d[k] = String(p[k] === null || p[k] === undefined ? '' : p[k]).trim().substring(0, 500); });
  if (m.op === 'create') {
    need_(ctx, 'students', 'create');
    if (!/^stu_[a-z0-9]{12}$/.test(m.entityId)) throw err_('VALIDATION_ERROR', 'Mã học sinh không hợp lệ');
    validateStudent_(d, true);
    d.studentId = m.entityId;
    d.code = nextStudentCode_();
    d.status = d.status || 'ACTIVE';
    d.startDate = d.startDate || dateStr_();
    var rec = buildRecord_('Students', d, ctx.email);
    appendObjects_('Students', [rec]);
    return { before: null, after: rec, note: linkParent_(ctx, rec) };
  }
  inScopeStudent_(ctx, m.entityId);
  if (m.op === 'archive') {
    need_(ctx, 'students', 'delete');
    var r0 = updateRecord_('Students', m.entityId, { deletedAt: nowIso_(), deletedBy: ctx.email }, null, ctx.email, ['deletedAt', 'deletedBy']);
    readTable_('ClassMembers').filter(function (x) { return x.studentId === m.entityId && x.status === 'ACTIVE'; })
      .forEach(function (x) { updateRecord_('ClassMembers', x.memberId, { status: 'LEFT', leaveDate: dateStr_() }, null, ctx.email, ['status', 'leaveDate']); });
    return r0;
  }
  if (m.op !== 'update') throw err_('VALIDATION_ERROR', 'Thao tác không hỗ trợ');
  need_(ctx, 'students', 'update');
  validateStudent_(d, false);
  var r = updateRecord_('Students', m.entityId, d, m.clientVersion, ctx.email, STUDENT_FIELDS);
  if (d.parentEmail && d.parentEmail !== r.before.parentEmail) r.note = linkParent_(ctx, r.after);
  return r;
}
