/** EduClass AI — Classes_.gs (Gói 2): lớp học + thành viên lớp */
var CLASS_FIELDS = ['code', 'className', 'subject', 'level', 'teacherId', 'assistantIds', 'room', 'onlineLink',
  'startDate', 'endDate', 'status', 'maxStudents', 'tuitionType', 'defaultFee', 'color', 'scheduleJson', 'note'];
var __clsMax = null;

function cleanSchedule_(v) {
  var arr = [];
  try { arr = typeof v === 'string' ? (v ? JSON.parse(v) : []) : (v || []); } catch (e) { throw err_('VALIDATION_ERROR', 'Lịch học sai định dạng'); }
  return JSON.stringify(arr.filter(function (x) {
    return x && Number(x.weekday) >= 0 && Number(x.weekday) <= 6 && /^\d{2}:\d{2}$/.test(x.start)
      && /^\d{2}:\d{2}$/.test(x.end) && x.end > x.start;
  }).map(function (x) { return { weekday: Number(x.weekday), start: x.start, end: x.end }; }));
}
function nextClassCode_() {
  if (__clsMax === null) {
    __clsMax = 0;
    readColumn_('Classes', 'code').forEach(function (c) { var m = /^L(\d+)$/.exec(c); if (m) __clsMax = Math.max(__clsMax, Number(m[1])); });
  }
  __clsMax++;
  return 'L' + ('00' + __clsMax).slice(-3);
}

function mutClasses_(ctx, m) {
  var p = m.payload || {}, d = {};
  CLASS_FIELDS.forEach(function (k) { if (k in p) d[k] = typeof p[k] === 'string' ? p[k].trim().substring(0, 1000) : p[k]; });
  if ('scheduleJson' in d) d.scheduleJson = cleanSchedule_(d.scheduleJson);
  ['maxStudents', 'defaultFee'].forEach(function (k) {
    if (k in d) { var n = Number(d[k] || 0); if (isNaN(n) || n < 0) throw err_('VALIDATION_ERROR', k + ' phải là số ≥ 0'); d[k] = n; }
  });
  if (d.status && !ENUMS.CLASS_STATUS[d.status]) throw err_('VALIDATION_ERROR', 'Trạng thái lớp không hợp lệ');
  if (d.tuitionType && !ENUMS.TUITION_TYPE[d.tuitionType]) throw err_('VALIDATION_ERROR', 'Kiểu thu phí không hợp lệ');
  if (d.teacherId && !getRecord_('Users', d.teacherId)) throw err_('VALIDATION_ERROR', 'Giáo viên không tồn tại');
  if ('color' in d && !/^#[0-9a-fA-F]{6}$/.test(d.color || '')) d.color = '#4F46E5';
  if ('className' in d && !d.className) throw err_('VALIDATION_ERROR', 'Thiếu tên lớp');

  if (m.op === 'create') {
    need_(ctx, 'classes', 'create');
    if (!/^cls_[a-z0-9]{12}$/.test(m.entityId)) throw err_('VALIDATION_ERROR', 'Mã lớp không hợp lệ');
    if (!d.className) throw err_('VALIDATION_ERROR', 'Thiếu tên lớp');
    d.classId = m.entityId;
    d.code = d.code || nextClassCode_();
    d.status = d.status || 'ACTIVE';
    d.tuitionType = d.tuitionType || getSettings_().FEE_DEFAULT_TYPE || 'PER_SESSION';
    var rec = buildRecord_('Classes', d, ctx.email);
    appendObjects_('Classes', [rec]);
    return { before: null, after: rec };
  }
  if (m.op !== 'update') throw err_('VALIDATION_ERROR', 'Thao tác không hỗ trợ');
  need_(ctx, 'classes', 'update');
  inScopeClass_(ctx, m.entityId);
  return updateRecord_('Classes', m.entityId, d, m.clientVersion, ctx.email, CLASS_FIELDS);
}

function mutMembers_(ctx, m) {
  need_(ctx, 'classes', 'update');
  var p = m.payload || {};
  if (m.op === 'create') {
    if (!/^mem_[a-z0-9]{12}$/.test(m.entityId)) throw err_('VALIDATION_ERROR', 'Mã thành viên không hợp lệ');
    var cls = getRecord_('Classes', p.classId), stu = getRecord_('Students', p.studentId);
    if (!cls || cls.deletedAt) throw err_('NOT_FOUND', 'Không tìm thấy lớp');
    if (!stu || stu.deletedAt) throw err_('NOT_FOUND', 'Không tìm thấy học sinh');
    inScopeClass_(ctx, cls.classId);
    var active = readTable_('ClassMembers').filter(function (x) { return x.classId === cls.classId && x.status === 'ACTIVE'; });
    if (active.some(function (x) { return x.studentId === stu.studentId; })) throw err_('VALIDATION_ERROR', stu.fullName + ' đã ở trong lớp ' + cls.className);
    if (Number(cls.maxStudents) > 0 && active.length >= Number(cls.maxStudents)) throw err_('VALIDATION_ERROR', 'Lớp ' + cls.className + ' đã đủ sĩ số');
    var fee = (p.customFee === '' || p.customFee === null || p.customFee === undefined) ? '' : Math.max(0, Number(p.customFee) || 0);
    var rec = buildRecord_('ClassMembers', { memberId: m.entityId, classId: cls.classId, studentId: stu.studentId,
      joinDate: /^\d{4}-\d{2}-\d{2}$/.test(p.joinDate || '') ? p.joinDate : dateStr_(), status: 'ACTIVE',
      customFee: fee, note: String(p.note || '').substring(0, 300) }, ctx.email);
    appendObjects_('ClassMembers', [rec]);
    return { before: null, after: rec };
  }
  var cur = getRecord_('ClassMembers', m.entityId);
  if (!cur) throw err_('NOT_FOUND', 'Không tìm thấy thành viên lớp');
  inScopeClass_(ctx, cur.classId);
  if (m.op === 'leave') {
    return updateRecord_('ClassMembers', m.entityId, { status: 'LEFT', leaveDate: dateStr_(), note: String(p.note || cur.note || '') },
      m.clientVersion, ctx.email, ['status', 'leaveDate', 'note']);
  }
  if (m.op === 'update') {
    var d = {};
    if ('customFee' in p) d.customFee = (p.customFee === '' || p.customFee === null) ? '' : Math.max(0, Number(p.customFee) || 0);
    if ('note' in p) d.note = String(p.note || '').substring(0, 300);
    return updateRecord_('ClassMembers', m.entityId, d, m.clientVersion, ctx.email, ['customFee', 'note']);
  }
  throw err_('VALIDATION_ERROR', 'Thao tác không hỗ trợ');
}
