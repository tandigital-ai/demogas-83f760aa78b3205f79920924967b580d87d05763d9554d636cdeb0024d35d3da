/**
 * EduClass AI — Config.gs  (Gói 0 · Schema v1)
 * Cấu hình chung: tên sheet, cấu trúc cột, vai trò mặc định, cài đặt mặc định.
 * Thêm cột mới: chỉ cần thêm tên cột vào đây rồi chạy lại caiDatHeThong.
 */
var APP = {
  NAME: 'EduClass AI',
  BUILD: 'goi-0',
  TZ: 'Asia/Ho_Chi_Minh',
  TZ_OFFSET: '+07:00',
  SCHEMA_VERSION: 1
};

// Cột hệ thống cho mọi bản ghi quan trọng (version + soft delete)
var META_COLS = ['createdAt', 'createdBy', 'updatedAt', 'updatedBy', 'version', 'deletedAt', 'deletedBy'];

// Cấu trúc bảng: id = cột khóa, prefix = tiền tố ID, meta = có cột hệ thống
var SCHEMA = {
  Settings:     { id: 'key', prefix: '', meta: false,
    cols: ['key', 'value', 'type', 'group', 'label', 'description', 'updatedAt', 'updatedBy'] },
  Users:        { id: 'userId', prefix: 'user', meta: true,
    cols: ['userId', 'email', 'fullName', 'role', 'status', 'phone', 'avatarUrl', 'allowedClassIds',
           'linkedStudentIds', 'permissionsOverrideJson', 'aiDailyLimit', 'lastLoginAt', 'note'] },
  Roles:        { id: 'roleId', prefix: '', meta: true,
    cols: ['roleId', 'roleName', 'permissionsJson', 'dataScope', 'description', 'isSystem'] },
  Students:     { id: 'studentId', prefix: 'stu', meta: true,
    cols: ['studentId', 'code', 'fullName', 'dob', 'gender', 'phone', 'email', 'address',
           'parentName', 'parentPhone', 'parentEmail', 'school', 'grade', 'goal', 'entryLevel',
           'source', 'status', 'startDate', 'note', 'avatarUrl'] },
  Classes:      { id: 'classId', prefix: 'cls', meta: true,
    cols: ['classId', 'code', 'className', 'subject', 'level', 'teacherId', 'assistantIds', 'room',
           'onlineLink', 'startDate', 'endDate', 'status', 'maxStudents', 'tuitionType', 'defaultFee',
           'color', 'scheduleJson', 'note'] },
  ClassMembers: { id: 'memberId', prefix: 'mem', meta: true,
    cols: ['memberId', 'classId', 'studentId', 'joinDate', 'leaveDate', 'status', 'customFee', 'note'] },
  Sessions:     { id: 'sessionId', prefix: 'ses', meta: true,
    cols: ['sessionId', 'classId', 'startTime', 'endTime', 'duration', 'teacherId', 'assistantIds',
           'room', 'onlineLink', 'topic', 'content', 'homework', 'objectives', 'completion',
           'internalNote', 'materialLinks', 'status', 'sessionType', 'originalSessionId', 'calendarEventId'] },
  Attendance:   { id: 'attendanceId', prefix: 'att', meta: true,
    cols: ['attendanceId', 'sessionId', 'classId', 'studentId', 'status', 'note', 'feeCounted'] },
  Scores:       { id: 'scoreId', prefix: 'score', meta: true,
    cols: ['scoreId', 'studentId', 'classId', 'scoreType', 'title', 'score', 'scale', 'weight',
           'testDate', 'comment', 'fileUrl'] },
  Fees:         { id: 'feeId', prefix: 'fee', meta: true,
    cols: ['feeId', 'studentId', 'classId', 'period', 'feeType', 'sessionCount', 'unitPrice', 'subtotal',
           'surcharge', 'discount', 'previousDebt', 'total', 'paid', 'balance', 'status', 'dueDate', 'note'] },
  Payments:     { id: 'paymentId', prefix: 'pay', meta: true,
    cols: ['paymentId', 'feeId', 'studentId', 'amount', 'method', 'paidAt', 'transactionCode',
           'receiptUrl', 'status', 'voidReason', 'note'] },
  Comments:     { id: 'commentId', prefix: 'cmt', meta: true,
    cols: ['commentId', 'studentId', 'classId', 'sessionId', 'type', 'tone', 'content', 'shortContent',
           'parentMessage', 'aiGenerated', 'visibility'] },
  Materials:    { id: 'materialId', prefix: 'mat', meta: true,
    cols: ['materialId', 'title', 'type', 'url', 'driveFileId', 'classId', 'studentId', 'subject',
           'topic', 'visibility', 'description'] },
  Assignments:  { id: 'assignmentId', prefix: 'asg', meta: true,
    cols: ['assignmentId', 'title', 'description', 'classId', 'studentId', 'dueDate', 'maxScore',
           'attachmentUrl', 'status'] },
  Submissions:  { id: 'submissionId', prefix: 'sub', meta: true,
    cols: ['submissionId', 'assignmentId', 'studentId', 'content', 'fileUrl', 'submittedAt', 'status',
           'score', 'feedback', 'gradedAt', 'gradedBy'] },
  AiJobs:       { id: 'jobId', prefix: 'ai', meta: false,
    cols: ['jobId', 'userId', 'jobType', 'entityType', 'entityId', 'inputJson', 'outputText', 'status',
           'model', 'tokenEstimate', 'durationMs', 'errorMessage', 'createdAt'] },
  AiUsage:      { id: 'usageKey', prefix: '', meta: false,
    cols: ['usageKey', 'userId', 'date', 'count', 'updatedAt'] },
  MutationLog:  { id: 'mutationId', prefix: 'mut', meta: false,
    cols: ['mutationId', 'clientTxnId', 'userId', 'entityType', 'entityId', 'action', 'payloadJson',
           'status', 'serverVersion', 'errorMessage', 'createdAt'] },
  AuditLog:     { id: 'logId', prefix: 'log', meta: false,
    cols: ['logId', 'userId', 'userEmail', 'action', 'entityType', 'entityId', 'beforeJson',
           'afterJson', 'ipOrAgent', 'createdAt'] },
  AuthSessions: { id: 'tokenHash', prefix: '', meta: false,
    cols: ['tokenHash', 'userId', 'email', 'role', 'createdAt', 'expiresAt', 'lastSeenAt',
           'userAgent', 'revokedAt'] }
};

// Các cột là số (Db sẽ tự đổi chữ → số khi đọc)
var NUMERIC_FIELDS = ['version', 'duration', 'maxStudents', 'defaultFee', 'customFee', 'score', 'scale',
  'weight', 'sessionCount', 'unitPrice', 'subtotal', 'surcharge', 'discount', 'previousDebt', 'total',
  'paid', 'balance', 'amount', 'maxScore', 'aiDailyLimit', 'count', 'tokenEstimate', 'durationMs',
  'serverVersion'];

// Mã trạng thái thống nhất (luôn VIẾT HOA — sửa lỗi B3 của bản mẫu)
var ENUMS = {
  USER_STATUS: ['ACTIVE', 'LOCKED'],
  ROLES: ['ADMIN', 'TEACHER', 'ASSISTANT', 'ACCOUNTANT', 'PARENT', 'STUDENT'],
  STUDENT_STATUS: { ACTIVE: 'Đang học', TRIAL: 'Học thử', PAUSED: 'Tạm nghỉ', QUIT: 'Nghỉ hẳn' },
  CLASS_STATUS: { ACTIVE: 'Đang hoạt động', PAUSED: 'Tạm dừng', ENDED: 'Đã kết thúc' },
  SESSION_STATUS: { SCHEDULED: 'Đã lên lịch', DONE: 'Đã dạy', CANCELLED: 'Đã hủy', RESCHEDULED: 'Đã đổi lịch' },
  ATTENDANCE: {
    PRESENT: 'Có mặt', ABSENT_EXCUSED: 'Vắng có phép', ABSENT_UNEXCUSED: 'Vắng không phép',
    LATE: 'Đi muộn', LEAVE_EARLY: 'Về sớm', ONLINE: 'Học online', MAKEUP: 'Bù buổi', RESERVED: 'Bảo lưu'
  },
  TUITION_TYPE: { PER_SESSION: 'Theo buổi', MONTHLY: 'Theo tháng', COURSE: 'Theo khóa', PACKAGE: 'Theo gói buổi', CUSTOM: 'Tùy chỉnh' },
  FEE_STATUS: { UNPAID: 'Chưa thanh toán', PARTIAL: 'Thanh toán một phần', PAID: 'Đã thanh toán', OVERDUE: 'Quá hạn', FREE: 'Miễn phí' }
};

// Danh sách module + hành động (dùng cho màn hình phân quyền động ở Gói 1)
var PERMISSION_MODULES = {
  dashboard: ['view'], students: ['view', 'create', 'update', 'delete', 'export', 'import'],
  classes: ['view', 'create', 'update', 'delete', 'export'], sessions: ['view', 'create', 'update', 'cancel'],
  attendance: ['view', 'update', 'export'], journal: ['view', 'update'],
  scores: ['view', 'create', 'update', 'delete', 'export'],
  fees: ['view', 'create', 'update', 'generate', 'export'], payments: ['view', 'create', 'void'],
  receipts: ['view', 'create', 'send'], comments: ['view', 'create', 'update', 'delete'],
  materials: ['view', 'create', 'update', 'delete'], assignments: ['view', 'create', 'update', 'delete'],
  submissions: ['view', 'create', 'grade'], reports: ['view', 'revenue', 'export'],
  ai: ['use'], notifications: ['send'], feedback: ['create'],
  settings: ['view', 'update'], users: ['view', 'create', 'update', 'lock'], roles: ['view', 'update'],
  audit: ['view']
};

// Vai trò mặc định (Admin chỉnh được sau này)
var DEFAULT_ROLES = [
  { roleId: 'ADMIN', roleName: 'Quản trị viên', dataScope: 'ALL', description: 'Toàn quyền hệ thống',
    permissions: { '*': ['*'] } },
  { roleId: 'TEACHER', roleName: 'Giáo viên', dataScope: 'ASSIGNED', description: 'Chỉ lớp được phân công',
    permissions: { dashboard: ['view'], students: ['view', 'update'], classes: ['view'],
      sessions: ['view', 'create', 'update', 'cancel'], attendance: ['view', 'update', 'export'],
      journal: ['view', 'update'], scores: ['view', 'create', 'update', 'delete', 'export'],
      comments: ['view', 'create', 'update', 'delete'], materials: ['view', 'create', 'update', 'delete'],
      assignments: ['view', 'create', 'update', 'delete'], submissions: ['view', 'grade'],
      reports: ['view'], ai: ['use'], notifications: ['send'] } },
  { roleId: 'ASSISTANT', roleName: 'Trợ giảng', dataScope: 'ASSIGNED', description: 'Không xem doanh thu, không xóa',
    permissions: { dashboard: ['view'], students: ['view'], classes: ['view'], sessions: ['view'],
      attendance: ['view', 'update'], journal: ['view', 'update'], assignments: ['view', 'update'],
      materials: ['view'], comments: ['view', 'create'], submissions: ['view'], ai: ['use'] } },
  { roleId: 'ACCOUNTANT', roleName: 'Kế toán', dataScope: 'ALL', description: 'Chỉ mảng tài chính',
    permissions: { dashboard: ['view'], students: ['view'], classes: ['view'], attendance: ['view'],
      fees: ['view', 'create', 'update', 'generate', 'export'], payments: ['view', 'create', 'void'],
      receipts: ['view', 'create', 'send'], reports: ['view', 'revenue', 'export'],
      notifications: ['send'], ai: ['use'] } },
  { roleId: 'PARENT', roleName: 'Phụ huynh', dataScope: 'CHILDREN', description: 'Chỉ dữ liệu của con',
    permissions: { dashboard: ['view'], sessions: ['view'], attendance: ['view'], scores: ['view'],
      comments: ['view'], fees: ['view'], payments: ['view'], receipts: ['view'], materials: ['view'],
      assignments: ['view'], feedback: ['create'] } },
  { roleId: 'STUDENT', roleName: 'Học sinh', dataScope: 'SELF', description: 'Chỉ dữ liệu bản thân',
    permissions: { dashboard: ['view'], sessions: ['view'], assignments: ['view'],
      submissions: ['view', 'create'], materials: ['view'], scores: ['view'] } }
];

// Cài đặt chung mặc định: [nhóm, key, giá trị, kiểu, nhãn hiển thị]
var DEFAULT_SETTINGS = [
  ['general', 'CENTER_NAME', 'Trung tâm EduClass', 'string', 'Tên trung tâm'],
  ['general', 'CENTER_LOGO_URL', '', 'string', 'Link logo'],
  ['general', 'CENTER_ADDRESS', '', 'string', 'Địa chỉ'],
  ['general', 'CENTER_PHONE', '', 'string', 'Số điện thoại'],
  ['general', 'THEME_COLOR', '#4F46E5', 'color', 'Màu chủ đạo'],
  ['general', 'TIMEZONE', 'Asia/Ho_Chi_Minh', 'string', 'Múi giờ'],
  ['general', 'CURRENCY', 'VND', 'string', 'Tiền tệ'],
  ['general', 'SCHOOL_YEAR', '2026-2027', 'string', 'Niên khóa'],
  ['fees', 'FEE_DEFAULT_TYPE', 'PER_SESSION', 'string', 'Kiểu thu phí mặc định'],
  ['fees', 'FEE_COUNTED_STATUSES', '["PRESENT","LATE","LEAVE_EARLY","ONLINE","ABSENT_UNEXCUSED","MAKEUP"]', 'json', 'Trạng thái điểm danh được tính phí'],
  ['fees', 'FEE_DUE_DAY', '10', 'number', 'Hạn đóng phí (ngày trong tháng)'],
  ['fees', 'BANK_NAME', '', 'string', 'Ngân hàng'],
  ['fees', 'BANK_BIN', '', 'string', 'Mã BIN ngân hàng (cho QR)'],
  ['fees', 'BANK_ACCOUNT', '', 'string', 'Số tài khoản'],
  ['fees', 'BANK_OWNER', '', 'string', 'Chủ tài khoản'],
  ['attendance', 'ATTENDANCE_WARN_ABSENT', '3', 'number', 'Cảnh báo khi vắng ≥ số buổi/tháng'],
  ['ai', 'AI_ENABLED', 'true', 'boolean', 'Bật AI'],
  ['ai', 'AI_MODEL', 'gemini-2.5-flash', 'string', 'Tên model Gemini'],
  ['ai', 'AI_TEMPERATURE', '0.7', 'number', 'Độ sáng tạo (0–1)'],
  ['ai', 'AI_LIMIT_DEFAULT', '50', 'number', 'Lượt AI/ngày mặc định'],
  ['ai', 'AI_LIMIT_ADMIN', '200', 'number', 'Lượt AI/ngày – Admin'],
  ['ai', 'AI_LIMIT_TEACHER', '50', 'number', 'Lượt AI/ngày – Giáo viên'],
  ['ai', 'AI_LIMIT_ASSISTANT', '20', 'number', 'Lượt AI/ngày – Trợ giảng'],
  ['ai', 'AI_LIMIT_ACCOUNTANT', '30', 'number', 'Lượt AI/ngày – Kế toán'],
  ['ai', 'AI_LIMIT_PARENT', '0', 'number', 'Lượt AI/ngày – Phụ huynh'],
  ['ai', 'AI_LIMIT_STUDENT', '0', 'number', 'Lượt AI/ngày – Học sinh'],
  ['ai', 'AI_CENTER_DAILY_LIMIT', '1000', 'number', 'Tổng lượt AI/ngày toàn trung tâm'],
  ['auth', 'AUTH_SESSION_DAYS', '30', 'number', 'Số ngày ghi nhớ đăng nhập'],
  ['auth', 'OTP_MINUTES', '10', 'number', 'Hiệu lực mã OTP (phút)'],
  ['sync', 'SYNC_POLL_SECONDS', '20', 'number', 'Chu kỳ đồng bộ (giây)'],
  ['storage', 'DRIVE_FOLDER_ID', '', 'string', 'ID thư mục Drive lưu file'],
  ['storage', 'CALENDAR_ID', '', 'string', 'ID Google Calendar'],
  ['backup', 'BACKUP_KEEP', '30', 'number', 'Số bản backup giữ lại']
];

/** Trả về danh sách cột đầy đủ của 1 bảng (gồm cột hệ thống nếu có) */
function schemaCols_(name) {
  var s = SCHEMA[name];
  if (!s) throw new Error('Không có bảng ' + name + ' trong SCHEMA');
  return s.meta ? s.cols.concat(META_COLS) : s.cols.slice();
}
