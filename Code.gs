/* AI-ARCHITECT-BANNER
 * Tác giả: TDA
 * Liên hệ: 0986509106
 * TDA — Think Daily. Act AI
 * © 2026
 */
/**
 * EduClass AI - Hệ thống quản lý lớp học thông minh
 * File: Code.gs
 * Vai trò: Entry point và khởi tạo ứng dụng, quản lý phiên và cấu hình
 */

/**
 * Xử lý yêu cầu HTTP GET gửi tới WebApp
 * @param {Object} e - Đối tượng sự kiện HTTP GET
 * @return {HtmlOutput} Giao diện HTML của WebApp
 */
function doGet(e) {
  try {
    var template = HtmlService.createTemplateFromFile('Index');
    var htmlOutput = template.evaluate();
    htmlOutput
      .setTitle('EduClass AI - Quản lý lớp học thông minh')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
      .addMetaTag('viewport', 'width=device-width, initial-scale=1, shrink-to-fit=no');
    return htmlOutput;
  } catch (error) {
    return HtmlService.createHtmlOutput(
      '<div style="font-family:sans-serif;padding:24px;text-align:center;">' +
      '<h2>Lỗi tải ứng dụng EduClass AI</h2>' +
      '<p>' + (error.message || error.toString()) + '</p>' +
      '</div>'
    );
  }
}

/**
 * Include nội dung file HTML phụ vào file chính (dùng cho Stylesheet và JavaScript)
 * @param {string} filename - Tên file HTML cần nhúng
 * @return {string} Nội dung chuỗi HTML
 */
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

/**
 * Tạo menu bổ trợ khi mở trực tiếp Google Sheets database
 * @param {Object} e - Sự kiện mở Google Sheets
 */
function onOpen(e) {
  try {
    var ui = SpreadsheetApp.getUi();
    ui.createMenu('EduClass AI')
      .addItem('Khởi tạo / Cập nhật cấu trúc Sheets', 'initializeApp')
      .addToUi();
  } catch (err) {
    Logger.log('Không thể tạo UI Menu (chế độ WebApp hoặc quyền giới hạn): ' + err.toString());
  }
}

/**
 * Lấy đối tượng Spreadsheet của dự án
 * @return {GoogleAppsScript.Spreadsheet.Spreadsheet} Đối tượng Spreadsheet
 */
function getSpreadsheet() {
  var ss = null;
  if (typeof SPREADSHEET_ID !== 'undefined' && SPREADSHEET_ID && SPREADSHEET_ID !== 'YOUR_SPREADSHEET_ID') {
    try {
      ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    } catch (e) {
      Logger.log('Không thể mở Spreadsheet theo SPREADSHEET_ID: ' + e.toString());
    }
  }
  if (!ss) {
    try {
      ss = SpreadsheetApp.getActiveSpreadsheet();
    } catch (e) {
      Logger.log('Không thể lấy ActiveSpreadsheet: ' + e.toString());
    }
  }
  if (!ss) {
    throw new Error('Chưa cấu hình SPREADSHEET_ID hợp lệ trong Config.gs hoặc Script chưa gắn vào Spreadsheet.');
  }
  return ss;
}

/**
 * Lấy giá trị cấu hình từ PropertiesService
 * @param {string} key - Tên khóa thuộc tính
 * @return {string|null} Giá trị thuộc tính hoặc null
 */
function getProperty(key) {
  if (!key) return null;
  return PropertiesService.getScriptProperties().getProperty(key);
}

/**
 * Thiết lập giá trị cấu hình vào PropertiesService
 * @param {string} key - Tên khóa thuộc tính
 * @param {string} value - Giá trị cần lưu
 */
function setProperty(key, value) {
  if (!key) return;
  PropertiesService.getScriptProperties().setProperty(key, value != null ? String(value) : '');
}

/**
 * Lấy email của người dùng hiện tại đang truy cập
 * @return {string} Địa chỉ email người dùng
 */
function getUserEmail() {
  var email = '';
  try {
    email = Session.getActiveUser().getEmail();
  } catch (e) {
    Logger.log('Lỗi lấy active user email: ' + e.toString());
  }
  if (!email) {
    try {
      email = Session.getEffectiveUser().getEmail();
    } catch (e) {
      Logger.log('Lỗi lấy effective user email: ' + e.toString());
    }
  }
  return email || 'system@educlass.local';
}

/**
 * Lấy vai trò (role) của người dùng hiện tại
 * @return {string} Vai trò: ADMIN, TEACHER, ASSISTANT, PARENT, hoặc GUEST
 */
function getUserRole() {
  var email = getUserEmail();
  if (!email || email === 'system@educlass.local') {
    return 'ADMIN';
  }

  try {
    var ss = getSpreadsheet();
    var usersSheet = ss.getSheetByName(SHEET_NAMES.USERS);
    if (usersSheet) {
      var data = usersSheet.getDataRange().getValues();
      if (data.length > 1) {
        var header = data[0];
        var emailIndex = header.indexOf('email');
        var roleIndex = header.indexOf('role');

        if (emailIndex !== -1 && roleIndex !== -1) {
          for (var i = 1; i < data.length; i++) {
            var rowEmail = String(data[i][emailIndex]).trim().toLowerCase();
            if (rowEmail === email.toLowerCase()) {
              var role = String(data[i][roleIndex]).trim().toUpperCase();
              return role || 'TEACHER';
            }
          }
        }
      }
    }
  } catch (err) {
    Logger.log('Lỗi tra cứu vai trò người dùng: ' + err.toString());
  }

  // Mặc định người tạo script/chạy đầu tiên là ADMIN
  var effectiveEmail = '';
  try {
    effectiveEmail = Session.getEffectiveUser().getEmail();
  } catch (e) {}

  if (effectiveEmail && email.toLowerCase() === effectiveEmail.toLowerCase()) {
    return 'ADMIN';
  }

  return 'TEACHER';
}

/**
 * Ghi nhật ký hoạt động hệ thống vào bảng AuditLog
 * @param {string} action - Hành động (CREATE, UPDATE, DELETE, LOGIN, v.v.)
 * @param {string} entity - Thực thể bị tác động (Student, Class, Session, v.v.)
 * @param {string} entityId - Mã định danh của bản ghi bị tác động
 * @param {string} userEmail - Email người thực hiện hành động
 */
function logAudit(action, entity, entityId, userEmail) {
  try {
    var ss = getSpreadsheet();
    var logSheet = ss.getSheetByName(SHEET_NAMES.AUDIT_LOG);
    var now = new Date();
    var actor = userEmail || getUserEmail();
    var logId = 'log_' + now.getTime() + '_' + Math.random().toString(36).substr(2, 6);

    if (!logSheet) {
      logSheet = ss.insertSheet(SHEET_NAMES.AUDIT_LOG);
      logSheet.appendRow(['logId', 'timestamp', 'userEmail', 'action', 'entity', 'entityId', 'details']);
      logSheet.getRange(1, 1, 1, 7).setFontWeight('bold');
    }

    logSheet.appendRow([
      logId,
      Utilities.formatDate(now, Session.getScriptTimeZone() || 'Asia/Ho_Chi_Minh', 'yyyy-MM-dd HH:mm:ss'),
      actor,
      action || '',
      entity || '',
      entityId || '',
      'Thao tác ' + (action || '') + ' trên ' + (entity || '') + ' [' + (entityId || '') + ']'
    ]);
  } catch (e) {
    Logger.log('Lỗi ghi AuditLog: ' + e.toString());
  }
}

/**
 * Lấy Gemini API Key từ Script Properties
 * @return {string} Khóa API Gemini
 */
function getGeminiApiKey() {
  return getProperty(PROPERTY_KEYS.GEMINI_API_KEY) || '';
}

/**
 * Lấy Calendar ID phục vụ đồng bộ lịch dạy
 * @return {string} Google Calendar ID
 */
function getCalendarId() {
  var calId = getProperty(PROPERTY_KEYS.CALENDAR_ID);
  return (calId && calId.trim() !== '') ? calId.trim() : 'primary';
}

/**
 * Lấy Google Drive Folder ID dùng để lưu tài liệu, phiếu thu, bảng điểm
 * @return {string} Drive Folder ID
 */
function getDriveFolderId() {
  return getProperty(PROPERTY_KEYS.DRIVE_FOLDER_ID) || '';
}

/**
 * Khởi tạo ứng dụng: tạo các sheets chuẩn theo schema nếu chưa có và gán header
 */
function initializeApp() {
  var ss = getSpreadsheet();

  // Định nghĩa các bảng và cột dữ liệu chuẩn theo dataSchema
  var schemaDefinitions = {};

  schemaDefinitions[SHEET_NAMES.STUDENTS] = [
    'studentId', 'code', 'fullName', 'dob', 'gender', 'phone', 'email',
    'parentName', 'parentPhone', 'parentEmail', 'school', 'grade',
    'status', 'startDate', 'note', 'createdAt', 'updatedAt', 'version'
  ];

  schemaDefinitions[SHEET_NAMES.CLASSES] = [
    'classId', 'className', 'subject', 'level', 'teacherId', 'assistantIds',
    'room', 'startDate', 'endDate', 'status', 'tuitionType', 'defaultFee',
    'color', 'scheduleJson', 'createdAt', 'updatedAt', 'version'
  ];

  schemaDefinitions[SHEET_NAMES.SESSIONS] = [
    'sessionId', 'classId', 'startTime', 'endTime', 'duration', 'teacherId',
    'assistantIds', 'topic', 'content', 'homework', 'status',
    'calendarEventId', 'createdAt', 'updatedAt', 'version'
  ];

  schemaDefinitions[SHEET_NAMES.ATTENDANCE] = [
    'attendanceId', 'sessionId', 'classId', 'studentId', 'status',
    'note', 'feeCounted', 'createdAt', 'updatedAt', 'version'
  ];

  schemaDefinitions[SHEET_NAMES.SCORES] = [
    'scoreId', 'studentId', 'classId', 'scoreType', 'score', 'scale',
    'weight', 'testDate', 'comment', 'fileUrl', 'createdBy',
    'createdAt', 'updatedAt', 'version'
  ];

  schemaDefinitions[SHEET_NAMES.FEES] = [
    'feeId', 'studentId', 'classId', 'period', 'feeType', 'sessionCount',
    'unitPrice', 'subtotal', 'surcharge', 'discount', 'previousDebt',
    'total', 'paid', 'balance', 'status', 'dueDate', 'note',
    'createdAt', 'updatedAt', 'version'
  ];

  schemaDefinitions[SHEET_NAMES.PAYMENTS] = [
    'paymentId', 'feeId', 'studentId', 'amount', 'method', 'paidAt',
    'transactionCode', 'receiptUrl', 'createdBy', 'createdAt', 'version'
  ];

  schemaDefinitions[SHEET_NAMES.COMMENTS] = [
    'commentId', 'studentId', 'classId', 'sessionId', 'type', 'content',
    'aiGenerated', 'visibility', 'createdBy', 'createdAt', 'version'
  ];

  schemaDefinitions[SHEET_NAMES.MATERIALS] = [
    'materialId', 'title', 'type', 'url', 'classId', 'studentId',
    'topic', 'visibility', 'createdBy', 'createdAt'
  ];

  schemaDefinitions[SHEET_NAMES.ASSIGNMENTS] = [
    'assignmentId', 'title', 'description', 'classId', 'studentId',
    'dueDate', 'status', 'createdBy', 'createdAt', 'updatedAt', 'version'
  ];

  schemaDefinitions[SHEET_NAMES.SUBMISSIONS] = [
    'submissionId', 'assignmentId', 'studentId', 'content', 'fileUrl',
    'submittedAt', 'status', 'score', 'feedback', 'createdAt', 'updatedAt', 'version'
  ];

  schemaDefinitions[SHEET_NAMES.USERS] = [
    'userId', 'email', 'role', 'name', 'status', 'createdAt', 'updatedAt'
  ];

  schemaDefinitions[SHEET_NAMES.SETTINGS] = [
    'key', 'value', 'description', 'updatedAt'
  ];

  schemaDefinitions[SHEET_NAMES.AI_JOBS] = [
    'jobId', 'prompt', 'response', 'type', 'status', 'createdBy', 'createdAt'
  ];

  schemaDefinitions[SHEET_NAMES.MUTATION_LOG] = [
    'mutationId', 'clientTxnId', 'entity', 'action', 'payload', 'status', 'createdAt'
  ];

  schemaDefinitions[SHEET_NAMES.AUDIT_LOG] = [
    'logId', 'timestamp', 'userEmail', 'action', 'entity', 'entityId', 'details'
  ];

  var sheetKeys = Object.keys(schemaDefinitions);
  for (var i = 0; i < sheetKeys.length; i++) {
    var sheetName = sheetKeys[i];
    var headers = schemaDefinitions[sheetName];
    var sheet = ss.getSheetByName(sheetName);

    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
    }

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(headers);
      sheet.getRange(1, 1, 1, headers.length)
        .setFontWeight('bold')
        .setBackground('#F3F4F6');
      sheet.setFrozenRows(1);
    }
  }

  // Khởi tạo người dùng quản trị hiện tại vào sheet Users nếu danh sách trống
  var usersSheet = ss.getSheetByName(SHEET_NAMES.USERS);
  if (usersSheet && usersSheet.getLastRow() <= 1) {
    var adminEmail = getUserEmail();
    var nowIso = Utilities.formatDate(new Date(), Session.getScriptTimeZone() || 'Asia/Ho_Chi_Minh', 'yyyy-MM-dd HH:mm:ss');
    usersSheet.appendRow(['usr_admin_1', adminEmail, 'ADMIN', 'Quản trị viên', 'ACTIVE', nowIso, nowIso]);
  }

  logAudit('INITIALIZE', 'System', 'ALL', getUserEmail());
}