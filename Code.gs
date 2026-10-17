/** EduClass AI — Code.gs (Gói 1) */
function doGet(e) {
  return HtmlService.createTemplateFromFile('Index').evaluate()
    .setTitle('EduClass AI')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1, viewport-fit=cover');
}

/** Nhúng file HTML con (tên có "_" → trình duyệt không gọi được) */
function include_(name) {
  return HtmlService.createHtmlOutputFromFile(name).getContent();
}

function onOpen() {
  SpreadsheetApp.getUi().createMenu('🎓 EduClass AI')
    .addItem('1. Cài đặt / cập nhật cấu trúc', 'menuCaiDat')
    .addItem('2. Nạp dữ liệu mẫu', 'menuDuLieuMau')
    .addItem('3. Kiểm tra hệ thống', 'menuKiemTra')
    .addToUi();
}
function menuCaiDat()    { SpreadsheetApp.getUi().alert(caiDatHeThong()); }
function menuDuLieuMau() { SpreadsheetApp.getUi().alert(napDuLieuMau()); }
function menuKiemTra()   { SpreadsheetApp.getUi().alert(kiemTraHeThong()); }

/** Chạy 1 lần để cấp quyền gửi email + gọi Gemini */
function capQuyenGoi1() {
  var owner = assertRunByOwner_();
  var mail = MailApp.getRemainingDailyQuota();
  UrlFetchApp.fetch('https://generativelanguage.googleapis.com/', { muteHttpExceptions: true });
  var msg = '✅ Đã cấp quyền. Chủ sở hữu: ' + owner + ' · Còn ' + mail + ' email được gửi hôm nay.';
  console.log(msg);
  return msg;
}
