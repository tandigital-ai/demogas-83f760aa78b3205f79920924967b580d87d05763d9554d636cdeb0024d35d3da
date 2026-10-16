/* AI-ARCHITECT-BANNER
 * Tác giả: TDA
 * Liên hệ: 0986509106
 * TDA — Think Daily. Act AI
 * © 2026
 */
/**
 * SeedData.gs — DỮ LIỆU MẪU do AI System Architect tự sinh. KHÔNG cần sửa.
 * CÁCH DÙNG: trong trình soạn Apps Script, chọn hàm "aiaLoadSampleData" ở thanh trên cùng → bấm ▶ Chạy.
 * Sheet đã có dữ liệu được GIỮ NGUYÊN. Muốn xóa và nạp lại từ đầu: chạy "aiaReloadSampleData".
 */
var AIA_SEED_TABLES = [
  {
    "sheet": "Students",
    "fields": [
      "studentId",
      "code",
      "fullName",
      "dob",
      "gender",
      "phone",
      "email",
      "parentName",
      "parentPhone",
      "parentEmail",
      "school",
      "grade",
      "status",
      "startDate",
      "note",
      "createdAt",
      "updatedAt",
      "version"
    ],
    "rows": [
      {
        "studentId": "STU-001",
        "code": "HS001",
        "fullName": "Nguyễn Văn An",
        "dob": "2008-05-12",
        "gender": "Nam",
        "phone": "0901234567",
        "email": "an.nguyen@example.com",
        "parentName": "Nguyễn Văn Hùng",
        "parentPhone": "0908765432",
        "parentEmail": "hung.nguyen@example.com",
        "school": "THPT Chu Văn An",
        "grade": "10",
        "status": "Active",
        "startDate": "2023-09-01",
        "note": "Học sinh ngoan, chăm chỉ học toán.",
        "createdAt": "2023-09-01T08:00:00Z",
        "updatedAt": "2024-01-10T10:00:00Z",
        "version": 1
      },
      {
        "studentId": "STU-002",
        "code": "HS002",
        "fullName": "Trần Thị Bình",
        "dob": "2008-08-22",
        "gender": "Nữ",
        "phone": "0912345678",
        "email": "binh.tran@example.com",
        "parentName": "Trần Đức Hải",
        "parentPhone": "0918765432",
        "parentEmail": "hai.tran@example.com",
        "school": "THPT Amsterdam",
        "grade": "10",
        "status": "Active",
        "startDate": "2023-09-01",
        "note": "Giỏi tiếng Anh và văn học.",
        "createdAt": "2023-09-01T08:30:00Z",
        "updatedAt": "2024-01-11T09:00:00Z",
        "version": 1
      },
      {
        "studentId": "STU-003",
        "code": "HS003",
        "fullName": "Lê Hoàng Cường",
        "dob": "2007-02-15",
        "gender": "Nam",
        "phone": "0923456789",
        "email": "cuong.le@example.com",
        "parentName": "Lê Văn Minh",
        "parentPhone": "0928765432",
        "parentEmail": "minh.le@example.com",
        "school": "THPT chuyên Khoa học Tự nhiên",
        "grade": "11",
        "status": "Active",
        "startDate": "2023-09-05",
        "note": "Thế mạnh về môn Vật lý.",
        "createdAt": "2023-09-05T09:00:00Z",
        "updatedAt": "2024-01-12T11:00:00Z",
        "version": 1
      },
      {
        "studentId": "STU-004",
        "code": "HS004",
        "fullName": "Phạm Mai Dung",
        "dob": "2009-11-30",
        "gender": "Nữ",
        "phone": "0934567890",
        "email": "dung.pham@example.com",
        "parentName": "Phạm Thị Lan",
        "parentPhone": "0938765432",
        "parentEmail": "lan.pham@example.com",
        "school": "THCS Trưng Vương",
        "grade": "9",
        "status": "Active",
        "startDate": "2023-09-10",
        "note": "Cần chú ý thêm phần hình học.",
        "createdAt": "2023-09-10T14:00:00Z",
        "updatedAt": "2024-01-13T15:00:00Z",
        "version": 1
      }
    ]
  },
  {
    "sheet": "Classes",
    "fields": [
      "classId",
      "className",
      "subject",
      "level",
      "teacherId",
      "assistantIds",
      "room",
      "startDate",
      "endDate",
      "status",
      "tuitionType",
      "defaultFee",
      "color",
      "scheduleJson",
      "createdAt",
      "updatedAt",
      "version"
    ],
    "rows": [
      {
        "classId": "CLS-001",
        "className": "Toán Nâng Cao 10",
        "subject": "Toán",
        "level": "Nâng cao",
        "teacherId": "TCH-001",
        "assistantIds": [
          "AST-001"
        ],
        "room": "Phòng 302",
        "startDate": "2023-09-01",
        "endDate": "2024-06-01",
        "status": "Active",
        "tuitionType": "Monthly",
        "defaultFee": 1500000,
        "color": "#4A90E2",
        "scheduleJson": "{\"days\":[\"Mon\",\"Thu\"],\"time\":\"18:00-20:00\"}",
        "createdAt": "2023-08-20T10:00:00Z",
        "updatedAt": "2023-08-20T10:00:00Z",
        "version": 1
      },
      {
        "classId": "CLS-002",
        "className": "Vật Lý 11 Chuyên",
        "subject": "Vật Lý",
        "level": "Chuyên",
        "teacherId": "TCH-002",
        "assistantIds": [],
        "room": "Phòng 405",
        "startDate": "2023-09-05",
        "endDate": "2024-06-05",
        "status": "Active",
        "tuitionType": "PerSession",
        "defaultFee": 200000,
        "color": "#E94E77",
        "scheduleJson": "{\"days\":[\"Tue\",\"Fri\"],\"time\":\"18:00-20:00\"}",
        "createdAt": "2023-08-22T11:00:00Z",
        "updatedAt": "2023-08-22T11:00:00Z",
        "version": 1
      },
      {
        "classId": "CLS-003",
        "className": "Ôn Thi Vào 10 Môn Toán",
        "subject": "Toán",
        "level": "Cơ bản",
        "teacherId": "TCH-001",
        "assistantIds": [
          "AST-002"
        ],
        "room": "Phòng 101",
        "startDate": "2023-09-10",
        "endDate": "2024-06-15",
        "status": "Active",
        "tuitionType": "Monthly",
        "defaultFee": 1200000,
        "color": "#50E3C2",
        "scheduleJson": "{\"days\":[\"Wed\",\"Sat\"],\"time\":\"15:00-17:00\"}",
        "createdAt": "2023-08-25T14:00:00Z",
        "updatedAt": "2023-08-25T14:00:00Z",
        "version": 1
      }
    ]
  },
  {
    "sheet": "Sessions",
    "fields": [
      "sessionId",
      "classId",
      "startTime",
      "endTime",
      "duration",
      "teacherId",
      "assistantIds",
      "topic",
      "content",
      "homework",
      "status",
      "calendarEventId",
      "createdAt",
      "updatedAt",
      "version"
    ],
    "rows": [
      {
        "sessionId": "SES-001",
        "classId": "CLS-001",
        "startTime": "2024-02-01T18:00:00Z",
        "endTime": "2024-02-01T20:00:00Z",
        "duration": 120,
        "teacherId": "TCH-001",
        "assistantIds": [
          "AST-001"
        ],
        "topic": "Hệ phương trình bậc nhất nhiều ẩn",
        "content": "Giải và biện luận hệ phương trình, phương pháp định thức.",
        "homework": "Làm bài tập từ 1 đến 10 trang 45 sách bài tập.",
        "status": "Completed",
        "calendarEventId": "cal_evt_001",
        "createdAt": "2024-01-25T08:00:00Z",
        "updatedAt": "2024-02-01T20:30:00Z",
        "version": 1
      },
      {
        "sessionId": "SES-002",
        "classId": "CLS-001",
        "startTime": "2024-02-05T18:00:00Z",
        "endTime": "2024-02-05T20:00:00Z",
        "duration": 120,
        "teacherId": "TCH-001",
        "assistantIds": [
          "AST-001"
        ],
        "topic": "Bất đẳng thức Cauchy",
        "content": "Lý thuyết và các ứng dụng cơ bản của bất đẳng thức AM-GM.",
        "homework": "Hoàn thành phiếu bài tập số 5.",
        "status": "Scheduled",
        "calendarEventId": "cal_evt_002",
        "createdAt": "2024-01-25T08:00:00Z",
        "updatedAt": "2024-01-25T08:00:00Z",
        "version": 1
      },
      {
        "sessionId": "SES-003",
        "classId": "CLS-002",
        "startTime": "2024-02-02T18:00:00Z",
        "endTime": "2024-02-02T20:00:00Z",
        "duration": 120,
        "teacherId": "TCH-002",
        "assistantIds": [],
        "topic": "Định luật bảo toàn điện tích",
        "content": "Các bài toán về tụ điện và dòng điện không đổi.",
        "homework": "Làm các bài tập trắc nghiệm chương 2.",
        "status": "Completed",
        "calendarEventId": "cal_evt_003",
        "createdAt": "2024-01-26T09:00:00Z",
        "updatedAt": "2024-02-02T20:15:00Z",
        "version": 1
      }
    ]
  },
  {
    "sheet": "Attendance",
    "fields": [
      "attendanceId",
      "sessionId",
      "classId",
      "studentId",
      "status",
      "note",
      "feeCounted",
      "createdAt",
      "updatedAt",
      "version"
    ],
    "rows": [
      {
        "attendanceId": "ATT-001",
        "sessionId": "SES-001",
        "classId": "CLS-001",
        "studentId": "STU-001",
        "status": "Present",
        "note": "Đi học đúng giờ",
        "feeCounted": true,
        "createdAt": "2024-02-01T18:05:00Z",
        "updatedAt": "2024-02-01T18:05:00Z",
        "version": 1
      },
      {
        "attendanceId": "ATT-002",
        "sessionId": "SES-001",
        "classId": "CLS-001",
        "studentId": "STU-002",
        "status": "Present",
        "note": "Đóng góp ý kiến xây dựng bài tốt",
        "feeCounted": true,
        "createdAt": "2024-02-01T18:05:00Z",
        "updatedAt": "2024-02-01T18:05:00Z",
        "version": 1
      },
      {
        "attendanceId": "ATT-003",
        "sessionId": "SES-003",
        "classId": "CLS-002",
        "studentId": "STU-003",
        "status": "Excused",
        "note": "Xin phép nghỉ vì ốm",
        "feeCounted": false,
        "createdAt": "2024-02-02T17:30:00Z",
        "updatedAt": "2024-02-02T17:30:00Z",
        "version": 1
      }
    ]
  },
  {
    "sheet": "Scores",
    "fields": [
      "scoreId",
      "studentId",
      "classId",
      "scoreType",
      "score",
      "scale",
      "weight",
      "testDate",
      "comment",
      "fileUrl",
      "createdBy",
      "createdAt",
      "updatedAt",
      "version"
    ],
    "rows": [
      {
        "scoreId": "SCR-001",
        "studentId": "STU-001",
        "classId": "CLS-001",
        "scoreType": "Kiểm tra 15 phút",
        "score": 8.5,
        "scale": 10,
        "weight": 1,
        "testDate": "2024-01-15",
        "comment": "Làm bài tốt, trình bày sạch sẽ.",
        "fileUrl": "https://drive.google.com/file/d/example1",
        "createdBy": "TCH-001",
        "createdAt": "2024-01-16T10:00:00Z",
        "updatedAt": "2024-01-16T10:00:00Z",
        "version": 1
      },
      {
        "scoreId": "SCR-002",
        "studentId": "STU-002",
        "classId": "CLS-001",
        "scoreType": "Kiểm tra giữa kỳ",
        "score": 9,
        "scale": 10,
        "weight": 2,
        "testDate": "2024-01-20",
        "comment": "Xuất sắc, nắm vững kiến thức.",
        "fileUrl": "https://drive.google.com/file/d/example2",
        "createdBy": "TCH-001",
        "createdAt": "2024-01-22T14:00:00Z",
        "updatedAt": "2024-01-22T14:00:00Z",
        "version": 1
      },
      {
        "scoreId": "SCR-003",
        "studentId": "STU-003",
        "classId": "CLS-002",
        "scoreType": "Kiểm tra 1 tiết",
        "score": 7.5,
        "scale": 10,
        "weight": 1.5,
        "testDate": "2024-01-25",
        "comment": "Cần cẩn thận hơn ở phần tính toán.",
        "fileUrl": "https://drive.google.com/file/d/example3",
        "createdBy": "TCH-002",
        "createdAt": "2024-01-26T09:30:00Z",
        "updatedAt": "2024-01-26T09:30:00Z",
        "version": 1
      }
    ]
  },
  {
    "sheet": "Fees",
    "fields": [
      "feeId",
      "studentId",
      "classId",
      "period",
      "feeType",
      "sessionCount",
      "unitPrice",
      "subtotal",
      "surcharge",
      "discount",
      "previousDebt",
      "total",
      "paid",
      "balance",
      "status",
      "dueDate",
      "note",
      "createdAt",
      "updatedAt",
      "version"
    ],
    "rows": [
      {
        "feeId": "FEE-001",
        "studentId": "STU-001",
        "classId": "CLS-001",
        "period": "Tháng 02/2024",
        "feeType": "Học phí hàng tháng",
        "sessionCount": 8,
        "unitPrice": 187500,
        "subtotal": 1500000,
        "surcharge": 0,
        "discount": 0,
        "previousDebt": 0,
        "total": 1500000,
        "paid": 1500000,
        "balance": 0,
        "status": "Paid",
        "dueDate": "2024-02-10",
        "note": "Đã thanh toán đủ tiền học phí tháng 2",
        "createdAt": "2024-02-01T08:00:00Z",
        "updatedAt": "2024-02-01T09:00:00Z",
        "version": 1
      },
      {
        "feeId": "FEE-002",
        "studentId": "STU-002",
        "classId": "CLS-001",
        "period": "Tháng 02/2024",
        "feeType": "Học phí hàng tháng",
        "sessionCount": 8,
        "unitPrice": 187500,
        "subtotal": 1500000,
        "surcharge": 0,
        "discount": 100000,
        "previousDebt": 0,
        "total": 1400000,
        "paid": 500000,
        "balance": 900000,
        "status": "Partial",
        "dueDate": "2024-02-10",
        "note": "Giảm giá học sinh gương mẫu, còn nợ 900k",
        "createdAt": "2024-02-01T08:00:00Z",
        "updatedAt": "2024-02-02T10:00:00Z",
        "version": 1
      },
      {
        "feeId": "FEE-003",
        "studentId": "STU-003",
        "classId": "CLS-002",
        "period": "Tháng 02/2024",
        "feeType": "Học phí theo buổi",
        "sessionCount": 8,
        "unitPrice": 200000,
        "subtotal": 1600000,
        "surcharge": 0,
        "discount": 0,
        "previousDebt": 200000,
        "total": 1800000,
        "paid": 0,
        "balance": 1800000,
        "status": "Unpaid",
        "dueDate": "2024-02-15",
        "note": "Bao gồm nợ tháng trước",
        "createdAt": "2024-02-01T08:00:00Z",
        "updatedAt": "2024-02-01T08:00:00Z",
        "version": 1
      }
    ]
  },
  {
    "sheet": "Payments",
    "fields": [
      "paymentId",
      "feeId",
      "studentId",
      "amount",
      "method",
      "paidAt",
      "transactionCode",
      "receiptUrl",
      "createdBy",
      "createdAt",
      "version"
    ],
    "rows": [
      {
        "paymentId": "PAY-001",
        "feeId": "FEE-001",
        "studentId": "STU-001",
        "amount": 1500000,
        "method": "Chuyển khoản",
        "paidAt": "2024-02-01T09:00:00Z",
        "transactionCode": "FT24032ABC12",
        "receiptUrl": "https://drive.google.com/file/d/receipt1",
        "createdBy": "TCH-001",
        "createdAt": "2024-02-01T09:00:00Z",
        "version": 1
      },
      {
        "paymentId": "PAY-002",
        "feeId": "FEE-002",
        "studentId": "STU-002",
        "amount": 500000,
        "method": "Tiền mặt",
        "paidAt": "2024-02-02T10:00:00Z",
        "transactionCode": "TM001",
        "receiptUrl": "https://drive.google.com/file/d/receipt2",
        "createdBy": "TCH-001",
        "createdAt": "2024-02-02T10:00:00Z",
        "version": 1
      }
    ]
  },
  {
    "sheet": "Comments",
    "fields": [
      "commentId",
      "studentId",
      "classId",
      "sessionId",
      "type",
      "content",
      "aiGenerated",
      "visibility",
      "createdBy",
      "createdAt",
      "version"
    ],
    "rows": [
      {
        "commentId": "COM-001",
        "studentId": "STU-001",
        "classId": "CLS-001",
        "sessionId": "SES-001",
        "type": "Học tập",
        "content": "Em An có tinh thần xây dựng bài tốt, tiếp thu nhanh phần hệ phương trình.",
        "aiGenerated": false,
        "visibility": "Public",
        "createdBy": "TCH-001",
        "createdAt": "2024-02-01T20:30:00Z",
        "version": 1
      },
      {
        "commentId": "COM-002",
        "studentId": "STU-002",
        "classId": "CLS-001",
        "sessionId": "SES-001",
        "type": "Nhận xét chung",
        "content": "Học sinh hoàn thành xuất sắc các yêu cầu của buổi học, cần phát huy.",
        "aiGenerated": true,
        "visibility": "Public",
        "createdBy": "TCH-001",
        "createdAt": "2024-02-01T20:35:00Z",
        "version": 1
      }
    ]
  },
  {
    "sheet": "Materials",
    "fields": [
      "materialId",
      "title",
      "type",
      "url",
      "classId",
      "studentId",
      "topic",
      "visibility",
      "createdBy",
      "createdAt"
    ],
    "rows": [
      {
        "materialId": "MAT-001",
        "title": "Tài liệu lý thuyết hệ phương trình bậc nhất",
        "type": "PDF",
        "url": "https://drive.google.com/file/d/mat001",
        "classId": "CLS-001",
        "studentId": null,
        "topic": "Hệ phương trình",
        "visibility": "Public",
        "createdBy": "TCH-001",
        "createdAt": "2024-01-30T10:00:00Z"
      },
      {
        "materialId": "MAT-002",
        "title": "Video bài giảng Ôn tập chương 1 Vật lý 11",
        "type": "Video",
        "url": "https://youtube.com/watch?v=example",
        "classId": "CLS-002",
        "studentId": null,
        "topic": "Điện tích",
        "visibility": "Public",
        "createdBy": "TCH-002",
        "createdAt": "2024-01-31T15:00:00Z"
      }
    ]
  },
  {
    "sheet": "Assignments",
    "fields": [
      "assignmentId",
      "title",
      "description",
      "classId",
      "studentId",
      "dueDate",
      "status",
      "createdBy",
      "createdAt",
      "updatedAt",
      "version"
    ],
    "rows": [
      {
        "assignmentId": "ASM-001",
        "title": "Bài tập về nhà số 1 - Hệ phương trình",
        "description": "Giải chi tiết 10 bài toán tự luận trong file đính kèm.",
        "classId": "CLS-001",
        "studentId": null,
        "dueDate": "2024-02-05",
        "status": "Active",
        "createdBy": "TCH-001",
        "createdAt": "2024-02-01T20:00:00Z",
        "updatedAt": "2024-02-01T20:00:00Z",
        "version": 1
      },
      {
        "assignmentId": "ASM-002",
        "title": "Bài tập trắc nghiệm Vật lý tuần 1",
        "description": "Hoàn thành 20 câu hỏi trắc nghiệm trên hệ thống.",
        "classId": "CLS-002",
        "studentId": null,
        "dueDate": "2024-02-06",
        "status": "Active",
        "createdBy": "TCH-002",
        "createdAt": "2024-02-02T20:00:00Z",
        "updatedAt": "2024-02-02T20:00:00Z",
        "version": 1
      }
    ]
  },
  {
    "sheet": "Submissions",
    "fields": [
      "submissionId",
      "assignmentId",
      "studentId",
      "content",
      "fileUrl",
      "submittedAt",
      "status",
      "score",
      "feedback",
      "createdAt",
      "updatedAt",
      "version"
    ],
    "rows": [
      {
        "submissionId": "SUB-001",
        "assignmentId": "ASM-001",
        "studentId": "STU-001",
        "content": "Em đã hoàn thành bài tập, có file đính kèm bên dưới.",
        "fileUrl": "https://drive.google.com/file/d/sub001",
        "submittedAt": "2024-02-03T14:00:00Z",
        "status": "Submitted",
        "score": null,
        "feedback": null,
        "createdAt": "2024-02-03T14:00:00Z",
        "updatedAt": "2024-02-03T14:00:00Z",
        "version": 1
      },
      {
        "submissionId": "SUB-002",
        "assignmentId": "ASM-001",
        "studentId": "STU-002",
        "content": "Bài làm của em đây ạ.",
        "fileUrl": "https://drive.google.com/file/d/sub002",
        "submittedAt": "2024-02-03T16:00:00Z",
        "status": "Graded",
        "score": 9.5,
        "feedback": "Bài làm rất tốt, trình bày khoa học.",
        "createdAt": "2024-02-03T16:00:00Z",
        "updatedAt": "2024-02-04T09:00:00Z",
        "version": 1
      }
    ]
  }
];

function aiaLoadSampleData() { return aiaSeed_(false); }
function aiaReloadSampleData() { return aiaSeed_(true); }

function aiaFindSpreadsheet_() {
  var ss = null;
  try { ss = SpreadsheetApp.getActiveSpreadsheet(); } catch (e) { ss = null; }
  if (ss) return ss;
  var id = '';
  try { if (!id && typeof SPREADSHEET_ID === 'string' && SPREADSHEET_ID.length >= 30) id = SPREADSHEET_ID; } catch (e) {}
  var props = PropertiesService.getScriptProperties().getProperties();
  if (!id) id = props.SPREADSHEET_ID || props.SHEET_ID || props.DB_ID || '';
  if (!id) { for (var k in props) { if (/^[\w-]{30,}$/.test(props[k])) { id = props[k]; break; } } }
  if (id) return SpreadsheetApp.openById(id);
  ss = SpreadsheetApp.create('Du lieu mau - ' + new Date().toISOString().slice(0, 10));
  PropertiesService.getScriptProperties().setProperty('SPREADSHEET_ID', ss.getId());
  return ss;
}

function aiaSeed_(force) {
  var ss = aiaFindSpreadsheet_();
  var report = [];
  AIA_SEED_TABLES.forEach(function (t) {
    var sh = ss.getSheetByName(t.sheet) || ss.insertSheet(t.sheet);
    if (!force && sh.getLastRow() > 1) { report.push(t.sheet + ': đã có dữ liệu — bỏ qua'); return; }
    sh.clearContents();
    var values = [t.fields].concat(t.rows.map(function (r) {
      return t.fields.map(function (f) {
        var v = r[f];
        if (v === null || v === undefined) return '';
        return typeof v === 'object' ? JSON.stringify(v) : v;
      });
    }));
    sh.getRange(1, 1, values.length, t.fields.length).setValues(values);
    sh.setFrozenRows(1);
    sh.getRange(1, 1, 1, t.fields.length).setFontWeight('bold');
    report.push(t.sheet + ': ' + t.rows.length + ' dòng');
  });
  var msg = 'ĐÃ NẠP DỮ LIỆU MẪU vào: ' + ss.getUrl() + '\n' + report.join('\n');
  Logger.log(msg);
  return msg;
}
