/**
 * EduClass AI — Setup_.gs (Gói 0)
 * 3 hàm anh chạy trực tiếp: caiDatHeThong · napDuLieuMau · kiemTraHeThong
 * An toàn chạy lại nhiều lần: chỉ THÊM, không bao giờ XÓA dữ liệu.
 */

/** ① Tạo/cập nhật toàn bộ cấu trúc database */
function caiDatHeThong() {
  var owner = assertRunByOwner_();
  var lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    var ss = getDb_();
    ss.setSpreadsheetTimeZone(APP.TZ);
    var report = [];
    Object.keys(SCHEMA).forEach(function (name) {
      report.push(ensureSheet_(ss, name, schemaCols_(name)));
    });
    removeDefaultSheet_(ss);
    report.push(seedSettings_(owner));
    report.push(seedRoles_(owner));
    report.push(seedAdmin_(owner));

    var props = PropertiesService.getScriptProperties();
    if (!props.getProperty('SERVER_VERSION')) props.setProperty('SERVER_VERSION', '0');
    props.setProperty('SCHEMA_VERSION', String(APP.SCHEMA_VERSION));

    writeAudit_(owner, 'SETUP', 'System', 'ALL', null, { schema: APP.SCHEMA_VERSION, build: APP.BUILD });
    SpreadsheetApp.flush();
    var msg = '✅ CÀI ĐẶT XONG (schema v' + APP.SCHEMA_VERSION + ')\n' + report.join('\n');
    console.log(msg);
    return msg;
  } finally {
    lock.releaseLock();
  }
}

/** Tạo sheet nếu thiếu, thêm cột còn thiếu vào cuối, định dạng văn bản */
function ensureSheet_(ss, name, columns) {
  var sh = ss.getSheetByName(name);
  var created = false;
  if (!sh) { sh = ss.insertSheet(name); created = true; }
  var headers = readHeaders_(sh).filter(function (h) { return h !== ''; });
  var missing = columns.filter(function (c) { return headers.indexOf(c) === -1; });
  if (missing.length) {
    var start = headers.length + 1;
    var total = headers.length + missing.length;
    if (sh.getMaxColumns() < total) sh.insertColumnsAfter(sh.getMaxColumns(), total - sh.getMaxColumns());
    sh.getRange(1, start, 1, missing.length).setValues([missing]);
  }
  var totalCols = headers.length + missing.length;
  // Lưu mọi ô dạng văn bản → tránh Sheets tự đổi thành Date (sửa lỗi B1)
  sh.getRange(1, 1, sh.getMaxRows(), totalCols).setNumberFormat('@');
  sh.getRange(1, 1, 1, totalCols).setFontWeight('bold').setBackground('#EEF2FF').setFontColor('#3730A3');
  sh.setFrozenRows(1);
  if (created) return '🆕 Tạo mới sheet ' + name + ' (' + totalCols + ' cột)';
  if (missing.length) return '➕ ' + name + ': bổ sung ' + missing.length + ' cột (' + missing.join(', ') + ')';
  return '✔️ ' + name + ': đã đầy đủ';
}

/** Xóa "Trang tính1/Sheet1" nếu còn trống */
function removeDefaultSheet_(ss) {
  ['Trang tính1', 'Sheet1'].forEach(function (n) {
    var sh = ss.getSheetByName(n);
    if (sh && sh.getLastRow() === 0 && ss.getSheets().length > 1) ss.deleteSheet(sh);
  });
}

function seedSettings_(by) {
  var existing = readColumn_('Settings', 'key');
  var t = nowIso_();
  var add = DEFAULT_SETTINGS.filter(function (s) { return existing.indexOf(s[1]) === -1; })
    .map(function (s) {
      return { group: s[0], key: s[1], value: s[2], type: s[3], label: s[4], description: '', updatedAt: t, updatedBy: by };
    });
  appendObjects_('Settings', add);
  return '⚙️ Settings: thêm ' + add.length + ' mục (giữ nguyên ' + existing.length + ' mục cũ)';
}

function seedRoles_(by) {
  var existing = readColumn_('Roles', 'roleId');
  var add = DEFAULT_ROLES.filter(function (r) { return existing.indexOf(r.roleId) === -1; })
    .map(function (r) {
      return buildRecord_('Roles', {
        roleId: r.roleId, roleName: r.roleName, permissionsJson: JSON.stringify(r.permissions),
        dataScope: r.dataScope, description: r.description, isSystem: 'true'
      }, by);
    });
  appendObjects_('Roles', add);
  return '🛡️ Roles: thêm ' + add.length + ' vai trò';
}

function seedAdmin_(owner) {
  var emails = readColumn_('Users', 'email').map(function (e) { return e.toLowerCase(); });
  if (emails.indexOf(owner.toLowerCase()) !== -1) return '👤 Admin ' + owner + ': đã có';
  appendObjects_('Users', [buildRecord_('Users', {
    userId: newId_('user'), email: owner, fullName: 'Quản trị viên', role: 'ADMIN', status: 'ACTIVE'
  }, owner)]);
  return '👤 Đã tạo Admin: ' + owner;
}

/** ② Nạp dữ liệu mẫu tiếng Việt (bỏ qua nếu đã có học sinh) */
function napDuLieuMau() {
  var by = assertRunByOwner_();
  var lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    if (getSheet_('Students').getLastRow() > 1) {
      var skip = 'ℹ️ Sheet Students đã có dữ liệu → bỏ qua để không ghi đè.';
      console.log(skip); return skip;
    }
    var today = dateStr_(new Date());
    var tomorrow = dateStr_(addDays_(1));
    var bdayToday = '2011-' + today.substring(5); // 1 học sinh sinh nhật hôm nay

    var teacher = buildRecord_('Users', { userId: newId_('user'), email: 'giaovien.mau@example.com',
      fullName: 'Cô Trần Thu Hà (mẫu)', role: 'TEACHER', status: 'ACTIVE', phone: '0900000001' }, by);

    var raw = [
      ['HS001', 'Nguyễn Minh An', bdayToday, 'Nam', 'Nguyễn Thị Hoa', '0912000001', 'THCS Nguyễn Du', '9'],
      ['HS002', 'Trần Bảo Ngọc', '2011-07-21', 'Nữ', 'Trần Văn Long', '0912000002', 'THCS Lê Lợi', '9'],
      ['HS003', 'Lê Gia Huy', '2011-01-05', 'Nam', 'Lê Thị Mai', '0912000003', 'THCS Nguyễn Du', '9'],
      ['HS004', 'Phạm Khánh Linh', '2011-11-30', 'Nữ', 'Phạm Văn Đức', '0912000004', 'THCS Trưng Vương', '9'],
      ['HS005', 'Võ Thành Đạt', '2009-04-18', 'Nam', 'Võ Thị Lan', '0912000005', 'THPT Chu Văn An', '11'],
      ['HS006', 'Đỗ Phương Anh', '2009-09-09', 'Nữ', 'Đỗ Văn Nam', '0912000006', 'THPT Chu Văn An', '11']
    ];
    var students = raw.map(function (s) {
      return buildRecord_('Students', { studentId: newId_('stu'), code: s[0], fullName: s[1], dob: s[2],
        gender: s[3], parentName: s[4], parentPhone: s[5], school: s[6], grade: s[7],
        status: 'ACTIVE', startDate: dateStr_(addDays_(-60)), source: 'Giới thiệu' }, by);
    });

    var math = buildRecord_('Classes', { classId: newId_('cls'), code: 'TOAN9A', className: 'Toán 9A',
      subject: 'Toán', level: 'Lớp 9', teacherId: teacher.userId, room: 'P.101', status: 'ACTIVE',
      maxStudents: 15, tuitionType: 'PER_SESSION', defaultFee: 150000, color: '#4F46E5',
      startDate: dateStr_(addDays_(-60)),
      scheduleJson: [{ weekday: 1, start: '17:30', end: '19:00' }, { weekday: 3, start: '17:30', end: '19:00' }, { weekday: 5, start: '17:30', end: '19:00' }] }, by);
    var ielts = buildRecord_('Classes', { classId: newId_('cls'), code: 'IELTS55', className: 'IELTS 5.5',
      subject: 'Tiếng Anh', level: 'IELTS 5.5', teacherId: teacher.userId, room: 'Online',
      onlineLink: 'https://meet.google.com/', status: 'ACTIVE', maxStudents: 10, tuitionType: 'MONTHLY',
      defaultFee: 1800000, color: '#10B981', startDate: dateStr_(addDays_(-30)),
      scheduleJson: [{ weekday: 2, start: '19:15', end: '20:45' }, { weekday: 4, start: '19:15', end: '20:45' }, { weekday: 6, start: '19:15', end: '20:45' }] }, by);

    teacher.allowedClassIds = [math.classId, ielts.classId].join(',');
    var parent = buildRecord_('Users', { userId: newId_('user'), email: 'phuhuynh.mau@example.com',
      fullName: 'Nguyễn Thị Hoa (PH mẫu)', role: 'PARENT', status: 'ACTIVE',
      linkedStudentIds: students[0].studentId }, by);

    var members = [];
    [0, 1, 2, 3].forEach(function (i) { members.push(memberOf_(math, students[i], by)); });
    [3, 4, 5].forEach(function (i) { members.push(memberOf_(ielts, students[i], by)); });

    var sessions = [
      sessionOf_(math, today, '17:30', '19:00', 'Phương trình bậc nhất một ẩn', by),
      sessionOf_(ielts, today, '19:15', '20:45', 'Writing Task 1 – Line graph', by),
      sessionOf_(math, tomorrow, '17:30', '19:00', 'Hệ phương trình', by),
      sessionOf_(ielts, tomorrow, '19:15', '20:45', 'Speaking Part 2', by)
    ];

    appendObjects_('Users', [teacher, parent]);
    appendObjects_('Students', students);
    appendObjects_('Classes', [math, ielts]);
    appendObjects_('ClassMembers', members);
    appendObjects_('Sessions', sessions);
    writeAudit_(by, 'SEED_SAMPLE', 'System', 'ALL', null, { students: students.length });

    var msg = '✅ Đã nạp dữ liệu mẫu: 2 người dùng, ' + students.length + ' học sinh, 2 lớp, '
      + members.length + ' thành viên lớp, ' + sessions.length + ' buổi học (hôm nay & ngày mai).';
    console.log(msg);
    return msg;
  } finally {
    lock.releaseLock();
  }
}

function memberOf_(cls, stu, by) {
  return buildRecord_('ClassMembers', { memberId: newId_('mem'), classId: cls.classId,
    studentId: stu.studentId, joinDate: cls.startDate, status: 'ACTIVE' }, by);
}

function sessionOf_(cls, day, start, end, topic, by) {
  return buildRecord_('Sessions', { sessionId: newId_('ses'), classId: cls.classId,
    startTime: dateTimeIso_(day, start), endTime: dateTimeIso_(day, end), duration: 90,
    teacherId: cls.teacherId, room: cls.room, onlineLink: cls.onlineLink, topic: topic,
    status: 'SCHEDULED', sessionType: 'NORMAL' }, by);
}

/** ③ Kiểm tra sức khỏe hệ thống */
function kiemTraHeThong() {
  assertRunByOwner_();
  var ss = getDb_();
  var lines = ['🩺 KIỂM TRA HỆ THỐNG – ' + ss.getName()];
  var ok = true;
  Object.keys(SCHEMA).forEach(function (name) {
    var sh = ss.getSheetByName(name);
    if (!sh) { ok = false; lines.push('❌ Thiếu sheet ' + name); return; }
    var headers = readHeaders_(sh);
    var missing = schemaCols_(name).filter(function (c) { return headers.indexOf(c) === -1; });
    if (missing.length) ok = false;
    lines.push((missing.length ? '⚠️ ' : '✔️ ') + name + ': ' + Math.max(sh.getLastRow() - 1, 0) + ' dòng'
      + (missing.length ? ' · thiếu cột: ' + missing.join(', ') : ''));
  });
  var props = PropertiesService.getScriptProperties();
  lines.push('🔑 GEMINI_API_KEY: ' + (props.getProperty('GEMINI_API_KEY') ? 'Đã có ✅' : 'CHƯA CÓ ❌'));
  lines.push('🕒 Múi giờ file: ' + ss.getSpreadsheetTimeZone());
  lines.push('🔢 SERVER_VERSION: ' + props.getProperty('SERVER_VERSION'));
  lines.push(ok ? '🎉 KẾT LUẬN: Database sẵn sàng cho Gói 1' : '👉 Hãy chạy lại caiDatHeThong');
  var msg = lines.join('\n');
  console.log(msg);
  return msg;
}
