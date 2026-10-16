Bạn là chuyên gia bậc thầy về thiết kế, đặc tả, kiến trúc và lập trình ứng dụng giáo dục có sử dụng AI trên nền tảng Google Apps Script WebApp, HTML, CSS, JavaScript, Google Sheets, Google Drive, Google Calendar và Gemini API.

Tôi là người mới, cần bạn hướng dẫn và/hoặc tạo ứng dụng từng bước một cách rõ ràng, có hệ thống, dễ hiểu, không bỏ sót thành phần quan trọng.

Bối cảnh sản phẩm:

Tôi muốn xây dựng một ứng dụng "EduClass AI là nền tảng quản lý lớp học thông minh chạy trên Google Apps Script WebApp, được thiết kế để giúp giáo viên, trung tâm giáo dục và gia sư quản lý toàn bộ hoạt động lớp học một cách chuyên nghiệp và hiệu quả. Ứng dụng cung cấp các tính năng quản lý học sinh, lớp học, lịch dạy, điểm danh, điểm số, học phí, học liệu và nhận xét học sinh, đồng thời tích hợp AI để hỗ trợ giáo viên trong công việc hàng ngày."  giao diện, logo hay nội dung độc quyền. Ứng dụng mới cần chuyên nghiệp hơn, có nhiều tính năng hơn, đặc biệt là có sử dụng AI và có trải nghiệm cập nhật tức thì theo cơ chế optimistic update.

Tên tạm gọi của ứng dụng là:

EduClass AI – Nền tảng quản lý lớp học thông minh bằng Google Apps Script.

Ứng dụng cần chạy dưới dạng WebApp Google Apps Script, dùng được trên điện thoại và máy tính, giao diện đẹp, hiện đại, mobile-first, dễ thao tác khi giáo viên đang đứng lớp.

Mục tiêu sản phẩm:

Ứng dụng giúp giáo viên, trợ giảng, kế toán, quản trị viên, phụ huynh và học sinh quản lý toàn bộ hoạt động lớp học gồm:

1. Quản lý học sinh.
2. Quản lý lớp học.
3. Quản lý lịch dạy.
4. Điểm danh.
5. Nhật ký buổi học.
6. Nhập và theo dõi điểm số.
7. Quản lý học phí.
8. Ghi nhận thanh toán.
9. Xuất phiếu thu.
10. Quản lý nhận xét học sinh.
11. Quản lý học liệu.
12. Quản lý bài tập.
13. Báo cáo học tập, chuyên cần, doanh thu.
14. Đồng bộ Google Calendar.
15. Ứng dụng AI để hỗ trợ giáo viên.
16. Phân quyền theo vai trò.
17. Optimistic update cho mọi thao tác chính.

Triết lý sản phẩm:

Không chỉ là nơi lưu dữ liệu lớp học, ứng dụng phải trở thành “trợ lý vận hành lớp học bằng AI”, giúp giáo viên giảm giấy tờ, giảm thao tác lặp lại, tăng chất lượng chăm sóc học sinh/phụ huynh và quản lý lớp học chuyên nghiệp hơn.

Đối tượng sử dụng:

1. Giáo viên dạy thêm.
2. Trung tâm giáo dục nhỏ.
3. Gia sư có nhiều học sinh.
4. Trung tâm luyện thi.
5. Trung tâm ngoại ngữ.
6. Trung tâm kỹ năng.
7. Nhóm lớp online/offline.

Vai trò người dùng:

1. Admin / Chủ trung tâm:
   - Quản lý toàn bộ dữ liệu.
   - Quản lý giáo viên, trợ giảng, kế toán.
   - Xem doanh thu, công nợ, báo cáo.
   - Cấu hình hệ thống, AI, học phí, mẫu phiếu.
   - Khóa/mở tài khoản.
   - Xem audit log.

2. Giáo viên:
   - Xem lớp mình phụ trách.
   - Điểm danh.
   - Nhập điểm.
   - Viết nhận xét.
   - Xem tiến độ học sinh.
   - Tạo bài tập, học liệu.
   - Dùng AI để viết nhận xét, tạo đề, phân tích học sinh.

3. Trợ giảng:
   - Điểm danh.
   - Ghi chú buổi học.
   - Cập nhật bài tập.
   - Xem thông tin giới hạn.
   - Không được xem doanh thu tổng.
   - Không được xóa dữ liệu quan trọng.

4. Kế toán:
   - Xem học phí.
   - Ghi nhận thanh toán.
   - Xuất phiếu thu.
   - Gửi nhắc phí.
   - Không sửa điểm số hoặc nội dung học tập.

5. Phụ huynh:
   - Xem lịch học của con.
   - Xem chuyên cần.
   - Xem điểm.
   - Xem nhận xét.
   - Xem học phí.
   - Tải phiếu thu.
   - Gửi phản hồi.

6. Học sinh:
   - Xem lịch học.
   - Xem bài tập.
   - Xem tài liệu.
   - Xem điểm.
   - Nộp bài nếu có module bài tập.

Yêu cầu nền tảng kỹ thuật:

Ứng dụng phải được thiết kế để triển khai trên Google Apps Script WebApp.

Backend:
- Google Apps Script.
- Các file gợi ý:
  - Code.gs
  - Router.gs
  - Auth.gs
  - Permissions.gs
  - Students.gs
  - Classes.gs
  - Sessions.gs
  - Attendance.gs
  - Scores.gs
  - Fees.gs
  - Payments.gs
  - Reports.gs
  - CalendarSync.gs
  - AiService.gs
  - OptimisticSync.gs
  - Cache.gs
  - Lock.gs
  - DriveFiles.gs
  - Utils.gs

Frontend:
- HTMLService.
- HTML, CSS, JavaScript.
- Có thể dùng CSS thuần hoặc Tailwind CDN.
- Có thể dùng Chart.js cho biểu đồ.
- Có thể dùng FullCalendar nếu cần lịch đẹp.
- Có thể dùng SweetAlert2 cho popup.
- Cần responsive, mobile-first.

Database:
- Google Sheets.
- Mỗi bảng dữ liệu là một sheet.
- Dùng ID riêng cho từng record.
- Mỗi dòng dữ liệu quan trọng cần có:
  - id
  - createdAt
  - createdBy
  - updatedAt
  - updatedBy
  - version
  - deletedAt nếu soft delete
  - deletedBy nếu soft delete

File storage:
- Google Drive.
- Lưu phiếu thu PDF, báo cáo PDF, học liệu, bài nộp.

Calendar:
- Google Calendar.
- Đồng bộ lịch học.
- Có thể dùng CalendarApp hoặc Advanced Calendar Service.

AI:
- Dùng Gemini API hoặc API AI tương đương.
- API key tuyệt đối không để ở frontend.
- API key lưu trong Script Properties.
- Gọi AI từ Apps Script thông qua UrlFetchApp.
- AI cần dùng cho nhận xét, báo cáo, phân tích, tạo đề, tạo bài tập, tin nhắn phụ huynh.

Cache:
- Dùng CacheService để cache settings, dashboard, quyền người dùng, danh sách lớp.
- Luôn có fallback đọc lại từ Sheets vì cache không bảo đảm tồn tại đến hết hạn.

Lock:
- Dùng LockService khi ghi dữ liệu quan trọng như thanh toán, điểm danh batch, sinh phiếu thu, cập nhật học phí, cập nhật version.

Yêu cầu bắt buộc về optimistic update:

Đây là yêu cầu cốt lõi của toàn hệ thống.

Mọi thao tác chính phải cập nhật tức thì trên giao diện trước khi server phản hồi.

Các thao tác bắt buộc có optimistic update:

1. Thêm học sinh.
2. Sửa thông tin học sinh.
3. Thêm học sinh vào lớp.
4. Tạo/sửa/hủy buổi học.
5. Điểm danh học sinh.
6. Đánh dấu tất cả có mặt.
7. Nhập/sửa điểm.
8. Ghi nhận thanh toán.
9. Cập nhật học phí.
10. Tạo/sửa nhận xét.
11. Giao bài tập.
12. Nộp bài tập.
13. Gán học liệu.
14. Một số cấu hình nhanh.

Cơ chế optimistic update:

Khi người dùng thao tác:

1. Frontend cập nhật UI ngay lập tức.
2. Gắn trạng thái record là pending.
3. Tạo clientTxnId duy nhất.
4. Gửi mutation lên server bằng google.script.run.
5. Server xác thực quyền.
6. Server kiểm tra clientTxnId để chống ghi lặp.
7. Server dùng LockService nếu cần.
8. Server kiểm tra version để phát hiện xung đột.
9. Server ghi dữ liệu vào Google Sheets.
10. Server ghi MutationLog và AuditLog.
11. Server trả dữ liệu mới.
12. Frontend reconcile:
    - Nếu thành công: đổi trạng thái sang synced.
    - Nếu lỗi: rollback dữ liệu cũ hoặc hiển thị lỗi.
    - Nếu xung đột: hiển thị conflict resolver.
    - Nếu mất mạng: đưa vào hàng đợi retry.

Mỗi record trên frontend nên có trạng thái sync:

- synced
- pending
- error
- conflict
- deletedPending
- offlineQueued

Cần có MutationLog để lưu:

- mutationId
- clientTxnId
- userId
- entityType
- entityId
- action
- payloadJson
- status
- serverVersion
- errorMessage
- createdAt

Cần có cơ chế version:

- Client gửi clientVersion.
- Server đọc serverVersion.
- Nếu clientVersion bằng serverVersion thì cho cập nhật.
- Nếu khác thì báo conflict hoặc merge.
- Sau khi ghi thành công thì version = version + 1.

Cần có cơ chế batch mutation:

- Không gửi 30 request khi điểm danh 30 học sinh.
- Gửi một batch request.
- Server xử lý hàng loạt.

Cần có cơ chế syncSince:

- Frontend lưu lastServerVersion hoặc lastSyncTime.
- Định kỳ gọi syncSince để lấy thay đổi mới.
- Vì GAS không có WebSocket realtime, dùng polling nhẹ 15–30 giây/lần.

Cấu trúc Google Sheets đề xuất:

1. Sheet Settings:
   - key
   - value
   - type
   - updatedAt
   - updatedBy

2. Sheet Users:
   - userId
   - email
   - fullName
   - role
   - status
   - phone
   - avatarUrl
   - allowedClassIds
   - createdAt
   - updatedAt

3. Sheet Roles:
   - roleId
   - roleName
   - permissionsJson
   - description

4. Sheet Students:
   - studentId
   - code
   - fullName
   - dob
   - gender
   - phone
   - email
   - parentName
   - parentPhone
   - parentEmail
   - school
   - grade
   - status
   - startDate
   - note
   - createdAt
   - updatedAt
   - version

5. Sheet Classes:
   - classId
   - className
   - subject
   - level
   - teacherId
   - assistantIds
   - room
   - startDate
   - endDate
   - status
   - tuitionType
   - defaultFee
   - color
   - scheduleJson
   - createdAt
   - updatedAt
   - version

6. Sheet ClassMembers:
   - id
   - classId
   - studentId
   - joinDate
   - leaveDate
   - status
   - customFee
   - note

7. Sheet Sessions:
   - sessionId
   - classId
   - startTime
   - endTime
   - duration
   - teacherId
   - assistantIds
   - topic
   - content
   - homework
   - status
   - calendarEventId
   - createdAt
   - updatedAt
   - version

8. Sheet Attendance:
   - attendanceId
   - sessionId
   - classId
   - studentId
   - status
   - note
   - feeCounted
   - createdAt
   - updatedAt
   - version

9. Sheet Scores:
   - scoreId
   - studentId
   - classId
   - scoreType
   - score
   - scale
   - weight
   - testDate
   - comment
   - fileUrl
   - createdBy
   - createdAt
   - updatedAt
   - version

10. Sheet Fees:
   - feeId
   - studentId
   - classId
   - period
   - feeType
   - sessionCount
   - unitPrice
   - subtotal
   - surcharge
   - discount
   - previousDebt
   - total
   - paid
   - balance
   - status
   - dueDate
   - note
   - createdAt
   - updatedAt
   - version

11. Sheet Payments:
   - paymentId
   - feeId
   - studentId
   - amount
   - method
   - paidAt
   - transactionCode
   - receiptUrl
   - createdBy
   - createdAt
   - version

12. Sheet Comments:
   - commentId
   - studentId
   - classId
   - sessionId
   - type
   - content
   - aiGenerated
   - visibility
   - createdBy
   - createdAt
   - version

13. Sheet Materials:
   - materialId
   - title
   - type
   - url
   - classId
   - studentId
   - topic
   - visibility
   - createdBy
   - createdAt

14. Sheet Assignments:
   - assignmentId
   - title
   - description
   - classId
   - studentId
   - dueDate
   - status
   - createdBy
   - createdAt
   - updatedAt
   - version

15. Sheet Submissions:
   - submissionId
   - assignmentId
   - studentId
   - content
   - fileUrl
   - submittedAt
   - status
   - score
   - feedback
   - createdAt
   - updatedAt
   - version

16. Sheet AiJobs:
   - jobId
   - userId
   - jobType
   - inputJson
   - outputText
   - status
   - tokenEstimate
   - errorMessage
   - createdAt

17. Sheet MutationLog:
   - mutationId
   - clientTxnId
   - userId
   - entityType
   - entityId
   - action
   - payloadJson
   - status
   - serverVersion
   - errorMessage
   - createdAt

18. Sheet AuditLog:
   - logId
   - userId
   - action
   - entityType
   - entityId
   - beforeJson
   - afterJson
   - ipOrAgent
   - createdAt

Các module chức năng chi tiết:

MODULE 1: Dashboard

Dashboard cho Admin:
- Tổng số lớp đang hoạt động.
- Tổng học sinh.
- Số buổi học trong tháng.
- Doanh thu tháng.
- Công nợ.
- Tỷ lệ chuyên cần.
- Học sinh nghỉ nhiều.
- Học sinh chưa đóng phí.
- Lịch dạy hôm nay.
- Biểu đồ doanh thu 6 tháng.
- Biểu đồ chuyên cần.
- AI cảnh báo học sinh/lớp cần chú ý.

Dashboard cho giáo viên:
- Lịch dạy hôm nay.
- Lớp phụ trách.
- Buổi cần điểm danh.
- Học sinh cần nhận xét.
- Bài tập cần chấm.
- AI gợi ý học sinh cần quan tâm.

Dashboard cho phụ huynh/học sinh:
- Lịch học gần nhất.
- Điểm gần đây.
- Nhận xét mới.
- Học phí cần thanh toán.
- Tài liệu/bài tập mới.

MODULE 2: Quản lý học sinh

Thông tin:
- Mã học sinh.
- Họ tên.
- Ngày sinh.
- Giới tính.
- Trường/lớp hiện tại.
- SĐT học sinh.
- Email học sinh.
- Phụ huynh.
- SĐT phụ huynh.
- Email phụ huynh.
- Địa chỉ.
- Mục tiêu học tập.
- Trình độ đầu vào.
- Ghi chú.
- Trạng thái: đang học, học thử, tạm nghỉ, nghỉ hẳn.
- Ngày bắt đầu.
- Nguồn tuyển sinh.

Tính năng:
- Thêm/sửa/xóa mềm học sinh.
- Import từ Google Sheets.
- Tìm kiếm.
- Lọc theo lớp, trạng thái, công nợ, chuyên cần.
- Hồ sơ học sinh 360 độ.
- Lịch sử lớp.
- Lịch sử điểm.
- Lịch sử thanh toán.
- Lịch sử nhận xét.
- Tệp đính kèm.

AI:
- Tóm tắt hồ sơ học sinh.
- Gợi ý lộ trình học.
- Phân tích nguy cơ nghỉ học.
- Viết nhận xét cá nhân hóa.
- Gợi ý cách trao đổi với phụ huynh.

MODULE 3: Quản lý lớp học

Thông tin:
- Mã lớp.
- Tên lớp.
- Môn học.
- Cấp độ.
- Giáo viên chính.
- Trợ giảng.
- Phòng học/link online.
- Ngày bắt đầu.
- Ngày kết thúc.
- Trạng thái.
- Sĩ số tối đa.
- Kiểu thu phí.
- Học phí mặc định.
- Lịch học cố định.
- Màu lớp.

Tính năng:
- Tạo lớp.
- Sửa lớp.
- Nhân bản lớp.
- Gán học sinh vào lớp.
- Chuyển lớp.
- Tạm dừng lớp.
- Kết thúc lớp.
- Xem danh sách học sinh.
- Xem lịch sử buổi học.
- Xem công nợ theo lớp.
- Xuất danh sách lớp.
- Xuất bảng điểm lớp.

AI:
- Gợi ý phân nhóm học sinh.
- Gợi ý tốc độ dạy.
- Tóm tắt tình hình lớp.
- Tạo báo cáo lớp cuối tháng.
- Gợi ý nội dung buổi học tiếp theo.

MODULE 4: Lịch dạy

Tính năng:
- Tạo buổi học một lần.
- Tạo lịch học lặp lại.
- Tạo lịch nhiều thứ trong tuần.
- Đổi lịch.
- Hủy buổi.
- Dạy bù.
- Gán phòng học/link online.
- Gán giáo viên/trợ giảng.
- Màu hóa theo lớp.
- Xem dạng ngày/tuần/tháng/danh sách.
- Đồng bộ Google Calendar.
- Lưu calendarEventId.

MODULE 5: Điểm danh

Trạng thái:
- Có mặt.
- Vắng có phép.
- Vắng không phép.
- Đi muộn.
- Về sớm.
- Học online.
- Bù buổi.
- Bảo lưu buổi.

Tính năng:
- Điểm danh một chạm.
- Chọn tất cả có mặt.
- Ghi chú từng học sinh.
- Tự tính số buổi đã học.
- Tự tính học phí nếu thu theo buổi.
- Cảnh báo vắng nhiều.
- Gửi thông báo vắng cho phụ huynh.
- Xuất báo cáo chuyên cần.
- Optimistic update từng học sinh và cả batch.

AI:
- Tóm tắt chuyên cần tháng.
- Nhận diện học sinh có nguy cơ nghỉ học.
- Gợi ý tin nhắn chăm sóc phụ huynh.
- Phân tích quan hệ giữa chuyên cần và điểm số.

MODULE 6: Nhật ký buổi học

Thông tin:
- Nội dung đã dạy.
- Bài tập giao.
- Tài liệu sử dụng.
- Mục tiêu buổi học.
- Mức độ hoàn thành.
- Nhận xét chung.
- Ghi chú nội bộ.
- Ảnh bảng/ảnh bài làm.
- Link tài liệu.

AI:
- Từ vài gạch đầu dòng viết nhật ký hoàn chỉnh.
- Từ nhật ký tạo tin nhắn gửi phụ huynh.
- Từ nội dung buổi học tạo bài tập.
- Tóm tắt nhiều buổi thành báo cáo tuần/tháng.

MODULE 7: Điểm số

Loại điểm:
- Miệng.
- 15 phút.
- 1 tiết.
- Giữa kỳ.
- Cuối kỳ.
- Bài tập.
- Dự án.
- Mock test.
- Tùy chỉnh.

Tính năng:
- Nhập điểm dạng bảng.
- Nhập điểm nhanh trên điện thoại.
- Import từ Google Sheets.
- Tính điểm trung bình.
- Quy đổi thang điểm.
- Vẽ biểu đồ tiến bộ.
- So sánh với trung bình lớp.
- Xuất bảng điểm PDF/Excel.
- Gửi điểm cho phụ huynh.
- Optimistic update khi nhập/sửa điểm.

AI:
- Phân tích điểm mạnh/yếu.
- Gợi ý kỹ năng cần cải thiện.
- Viết nhận xét theo điểm.
- Phát hiện điểm bất thường.
- Tạo kế hoạch ôn tập cá nhân.

MODULE 8: Học phí

Các kiểu thu phí:
1. Theo buổi.
2. Theo tháng.
3. Theo khóa.
4. Theo gói số buổi.
5. Tùy chỉnh từng học sinh.

Thông tin học phí:
- Kỳ thu.
- Học sinh.
- Lớp.
- Số buổi tính phí.
- Đơn giá.
- Phụ thu.
- Giảm phí.
- Nợ cũ.
- Tổng phải thu.
- Đã thanh toán.
- Còn lại.
- Trạng thái: chưa thanh toán, thanh toán một phần, đã thanh toán, quá hạn, miễn phí.
- Phương thức thanh toán.
- Mã giao dịch.
- Ghi chú.

Tính năng:
- Tự sinh học phí tháng.
- Đối soát thanh toán.
- Ghi nhận thanh toán.
- Xuất phiếu thu PDF.
- Xuất công nợ.
- Gửi nhắc phí.
- Lọc học sinh còn nợ.
- Báo cáo doanh thu theo lớp/giáo viên/tháng.
- Lịch sử thanh toán.
- Hủy/hoàn tiền có log.
- Optimistic update khi ghi nhận thanh toán.

AI:
- Viết tin nhắn nhắc phí lịch sự.
- Tóm tắt công nợ tháng.
- Dự báo doanh thu tháng tới.
- Phát hiện thanh toán bất thường.
- Gợi ý chính sách ưu đãi.

MODULE 9: Phiếu thu, báo cáo PDF/Excel

Tính năng:
- Tạo phiếu thu từng học sinh.
- Tạo phiếu học phí tháng.
- Tạo báo cáo công nợ.
- Tạo báo cáo điểm.
- Tạo báo cáo chuyên cần.
- Tạo báo cáo tiến độ.
- Tạo báo cáo doanh thu.
- Lưu PDF vào Google Drive.
- Gửi email kèm file.
- Dùng Google Docs template hoặc HTML template để xuất PDF.

Phiếu thu cần có:
- Logo trung tâm.
- Tên trung tâm.
- Thông tin học sinh.
- Kỳ thu.
- Chi tiết học phí.
- Tổng tiền.
- Đã thanh toán.
- Còn lại.
- QR chuyển khoản nếu có.
- Người lập phiếu.
- Ngày lập.

MODULE 10: Học liệu

Tính năng:
- Upload file.
- Link Google Drive.
- Link YouTube.
- Link tài liệu.
- Phân loại theo lớp/môn/chủ đề.
- Gán cho học sinh/lớp.
- Theo dõi ai đã xem nếu có thể.
- Tìm kiếm.
- Quyền hiển thị: nội bộ, theo lớp, công khai.

AI:
- Tóm tắt tài liệu.
- Tạo câu hỏi từ tài liệu.
- Tạo flashcard.
- Tạo quiz.
- Gợi ý tài liệu phù hợp.

MODULE 11: Bài tập

Tính năng:
- Tạo bài tập.
- Giao cho lớp hoặc cá nhân.
- Hạn nộp.
- Học sinh nộp file/link/text.
- Giáo viên chấm điểm.
- Nhận xét.
- Trạng thái: chưa nộp, đã nộp, nộp muộn, cần sửa, đã chấm.
- Nhắc học sinh chưa nộp.
- Optimistic update khi giao/nộp/chấm bài.

AI:
- Tạo bài tập theo bài học.
- Tạo đáp án mẫu.
- Gợi ý rubric chấm.
- Nhận xét bài làm dạng văn bản.
- Phân tích lỗi thường gặp.

MODULE 12: Nhận xét học sinh

Loại nhận xét:
- Sau buổi học.
- Theo tuần.
- Theo tháng.
- Sau bài kiểm tra.
- Nhận xét nội bộ.
- Nhận xét gửi phụ huynh.

AI phải hỗ trợ:
- Giáo viên nhập vài dòng ngắn, AI viết thành nhận xét tự nhiên.
- Có nhiều tone:
  - Thân thiện.
  - Trang trọng.
  - Ngắn gọn.
  - Chi tiết.
  - Khích lệ.
  - Nghiêm túc.
- Có thể tạo bản ngắn và bản dài.
- Có thể tạo tin nhắn gửi phụ huynh.

MODULE 13: Thông báo

Kênh:
- Trong app.
- Email.
- Tin nhắn copy nhanh để gửi Zalo.
- Có thể tích hợp SMS/Zalo OA nếu có API.

Loại thông báo:
- Nhắc lịch học.
- Báo vắng.
- Nhắc học phí.
- Gửi điểm.
- Gửi nhận xét.
- Gửi bài tập.
- Thông báo nghỉ/bù buổi.
- Thông báo tài liệu mới.

MODULE 14: Cài đặt

Admin cấu hình:
- Tên trung tâm.
- Logo.
- Màu giao diện.
- Múi giờ.
- Tiền tệ.
- Niên khóa.
- Mẫu phiếu thu.
- Mẫu nhận xét AI.
- Mẫu email.
- Mẫu nhắc phí.
- Quy tắc tính học phí.
- Quy tắc điểm danh.
- Quyền từng vai trò.
- API key AI.
- Google Calendar ID.
- Thư mục Drive lưu file.

Yêu cầu AI Assistant:

Ứng dụng cần có module AI Assistant như một trợ lý giáo viên.

Người dùng có thể hỏi:
- Tuần này lớp 9A học sinh nào vắng nhiều?
- Tóm tắt tiến độ của An trong tháng này.
- Viết nhận xét cho học sinh có điểm trung bình 7.2, vắng 2 buổi.
- Tạo đề kiểm tra 15 phút về phương trình bậc nhất.
- Những học sinh nào còn nợ học phí?
- Soạn tin nhắn nhắc phụ huynh đóng phí, giọng lịch sự.
- Tạo kế hoạch ôn thi 4 tuần cho lớp IELTS 5.5.

Các workflow AI cần có:

1. AI viết nhận xét:
   Đầu vào:
   - Tên học sinh.
   - Điểm số gần đây.
   - Chuyên cần.
   - Ghi chú giáo viên.
   - Mục tiêu học.
   - Giọng văn.

   Đầu ra:
   - Nhận xét ngắn.
   - Nhận xét dài.
   - Gợi ý bài tập.
   - Tin nhắn phụ huynh.

2. AI phân tích rủi ro:
   Dựa trên:
   - Số buổi vắng.
   - Điểm giảm.
   - Chậm đóng phí.
   - Ít nộp bài.
   - Ghi chú tiêu cực.

   Đầu ra:
   - Mức rủi ro: thấp/trung bình/cao.
   - Lý do.
   - Hành động gợi ý.

3. AI tạo đề kiểm tra:
   Đầu vào:
   - Môn học.
   - Chủ đề.
   - Cấp độ.
   - Số câu.
   - Dạng câu hỏi.
   - Thời lượng.
   - Có/không đáp án.

   Đầu ra:
   - Đề kiểm tra.
   - Đáp án.
   - Rubric chấm.

4. AI báo cáo tháng:
   Đầu vào:
   - Điểm.
   - Chuyên cần.
   - Nhật ký học.
   - Nhận xét.
   - Bài tập.

   Đầu ra:
   - Báo cáo gửi phụ huynh.
   - Báo cáo nội bộ.
   - Kế hoạch tháng sau.

5. AI học phí:
   Đầu vào:
   - Công nợ.
   - Lịch sử thanh toán.
   - Học phí tháng.

   Đầu ra:
   - Tin nhắn nhắc phí.
   - Danh sách ưu tiên cần liên hệ.
   - Tổng hợp doanh thu.

Prompt mẫu cho AI viết nhận xét:

Bạn là giáo viên giàu kinh nghiệm, viết nhận xét gửi phụ huynh bằng tiếng Việt.

Thông tin:
- Học sinh: {{studentName}}
- Lớp: {{className}}
- Điểm gần đây: {{scores}}
- Chuyên cần: {{attendance}}
- Ghi chú giáo viên: {{teacherNote}}
- Mục tiêu học tập: {{goal}}

Yêu cầu:
- Giọng văn {{tone}}
- Độ dài {{length}}
- Có 3 phần: điểm tích cực, điểm cần cải thiện, gợi ý phụ huynh hỗ trợ
- Không phóng đại
- Không dùng từ tiêu cực quá nặng
- Viết tự nhiên, chuyên nghiệp

Prompt mẫu cho AI phân tích rủi ro:

Hãy phân tích nguy cơ học sinh giảm tiến độ hoặc nghỉ học.

Dữ liệu:
{{studentData}}

Trả về JSON:
{
  "riskLevel": "low|medium|high",
  "reasons": [],
  "recommendedActions": [],
  "parentMessage": ""
}

Prompt mẫu tạo đề kiểm tra:

Bạn là giáo viên {{subject}}.
Tạo đề kiểm tra cho lớp {{level}}.

Chủ đề: {{topics}}
Thời lượng: {{duration}}
Số câu: {{questionCount}}
Mức độ: {{difficulty}}
Định dạng: {{format}}

Yêu cầu:
- Có đáp án.
- Có thang điểm.
- Câu hỏi rõ ràng.
- Phù hợp học sinh Việt Nam.

Yêu cầu giao diện:

Ứng dụng phải đẹp, hiện đại, responsive.

Phong cách:
- Sạch.
- Tối giản.
- Giáo dục.
- Dễ thao tác.
- Card rõ ràng.
- Màu pastel chuyên nghiệp.
- Có dark/light mode nếu khả thi.

Gợi ý màu:
- Primary: xanh dương hoặc tím.
- Success: xanh lá.
- Warning: vàng/cam.
- Danger: đỏ nhẹ.
- Background: xám rất nhạt.
- Card: trắng.
- Text: đen/xám dễ đọc.

Desktop layout:
- Sidebar trái.
- Topbar.
- Nội dung chính.
- Panel phụ bên phải nếu cần.

Menu desktop:
1. Tổng quan.
2. Lịch dạy.
3. Lớp học.
4. Học sinh.
5. Điểm danh.
6. Điểm số.
7. Học phí.
8. Bài tập.
9. Học liệu.
10. Nhận xét.
11. Báo cáo.
12. AI Assistant.
13. Cài đặt.

Mobile layout:
- Header gọn.
- Bottom navigation.
- Floating action button.
- Card dạng dọc.

Tab mobile:
1. Hôm nay.
2. Lớp.
3. Học sinh.
4. Học phí.
5. AI.

Màn hình “Hôm nay” là màn hình quan trọng nhất trên mobile:
- Lịch dạy hôm nay.
- Lớp sắp dạy.
- Nút Điểm danh.
- Nút Ghi nhật ký.
- Học sinh sinh nhật hôm nay.
- Học phí cần nhắc.
- Bài tập đến hạn.
- AI nhắc việc.

Yêu cầu API nội bộ Apps Script:

Thiết kế các hàm backend như API.

Auth API:
- getCurrentUser()
- checkPermission(action, entityType, entityId)
- getUserMenu()

Dashboard API:
- getDashboardData(role, filters)
- getTodayOverview()
- getStats(period)

Student API:
- listStudents(filters)
- getStudentProfile(studentId)
- createStudent(payload)
- updateStudent(studentId, payload, clientVersion)
- archiveStudent(studentId)
- importStudents(rows)

Class API:
- listClasses(filters)
- getClassDetail(classId)
- createClass(payload)
- updateClass(classId, payload)
- addStudentToClass(classId, studentId)
- removeStudentFromClass(classId, studentId)

Session API:
- listSessions(filters)
- createSession(payload)
- createRecurringSessions(payload)
- updateSession(sessionId, payload)
- cancelSession(sessionId)
- rescheduleSession(sessionId, newTime)
- syncSessionToCalendar(sessionId)

Attendance API:
- getAttendanceSheet(sessionId)
- saveAttendanceBatch(payload)
- markAllPresent(sessionId)
- getAttendanceReport(filters)

Score API:
- listScores(filters)
- saveScore(payload)
- saveScoreBatch(payload)
- getScoreAnalytics(studentId/classId)

Fee API:
- generateMonthlyFees(period)
- listFees(filters)
- updateFee(feeId, payload)
- recordPayment(payload)
- generateReceipt(paymentId)
- getDebtReport(filters)

AI API:
- aiGenerateComment(input)
- aiSummarizeStudent(studentId)
- aiAnalyzeClass(classId)
- aiCreateQuiz(input)
- aiGenerateParentMessage(input)
- aiGenerateMonthlyReport(input)

Sync API:
- submitMutation(mutation)
- submitMutationBatch(mutations)
- syncSince(version)
- getServerTime()

Yêu cầu bảo mật:

1. Không để API key ở frontend.
2. Mọi API backend phải kiểm tra quyền.
3. Không tin dữ liệu từ client.
4. Có AuditLog.
5. Có phân quyền theo email.
6. Phụ huynh chỉ xem dữ liệu của con mình.
7. Giáo viên chỉ xem lớp được phân công.
8. Không xóa cứng dữ liệu quan trọng, dùng soft delete.
9. Có trạng thái khóa tài khoản.
10. Có giới hạn sử dụng AI theo người dùng/vai trò/ngày nếu cần.

Yêu cầu hiệu năng:

Vì Google Apps Script có giới hạn quota và thời gian thực thi, cần:
- Không đọc toàn bộ Google Sheets quá nhiều.
- Dùng batch read/write.
- Dùng CacheService.
- Dùng LockService.
- Dùng phân trang.
- Dùng chỉ mục theo ID.
- Không gọi server quá nhiều lần liên tiếp.
- Với điểm danh/nhập điểm, dùng batch mutation.
- Dashboard nên cache hoặc có sheet tổng hợp.
- Nếu dữ liệu lớn, tách mỗi trung tâm một Spreadsheet riêng.

Yêu cầu backup:

- Có backup tự động hằng ngày nếu có thể.
- Copy Spreadsheet sang thư mục backup.
- Giữ 7 hoặc 30 bản gần nhất.
- Log người xóa/sửa dữ liệu.
- Có khả năng export CSV/Excel.

Lộ trình triển khai:

Giai đoạn 1 – MVP:
Làm trước các phần:
1. Khởi tạo Google Sheets database.
2. Tạo WebApp GAS.
3. Giao diện dashboard cơ bản.
4. Đăng nhập/phân quyền bằng email.
5. Quản lý học sinh.
6. Quản lý lớp.
7. Tạo lịch học.
8. Điểm danh.
9. Nhập điểm.
10. Tính học phí cơ bản.
11. Ghi nhận thanh toán.
12. AI viết nhận xét.
13. Optimistic update cho:
    - Điểm danh.
    - Nhập điểm.
    - Ghi nhận thanh toán.
    - Tạo nhận xét.
    - Thêm học sinh.

Giai đoạn 2 – Bản chuyên nghiệp:
1. Đồng bộ Google Calendar.
2. Xuất phiếu thu PDF.
3. Báo cáo Excel/PDF.
4. AI tóm tắt học sinh.
5. AI tạo tin nhắn phụ huynh.
6. AI tạo đề/bài tập.
7. Quản lý học liệu.
8. Cổng phụ huynh.
9. AuditLog đầy đủ.
10. Mobile UI hoàn thiện.

Giai đoạn 3 – Bản nâng cao:
1. AI phân tích rủi ro.
2. AI báo cáo tháng.
3. Bài tập/nộp bài.
4. Đa chi nhánh.
5. SaaS nhiều trung tâm.
6. Gói dịch vụ và khóa tài khoản.
7. Thanh toán online nếu có tích hợp.
8. Đồng bộ Calendar nâng cao.

Yêu cầu cách phản hồi của bạn:

Khi tôi yêu cầu thiết kế hoặc lập trình, hãy:
1. Giải thích ngắn gọn mục tiêu phần đó.
2. Đưa cấu trúc rõ ràng.
3. Nếu viết code, hãy chia file rõ ràng.
4. Code phải phù hợp Google Apps Script.
5. Không viết code quá rời rạc, phải có luồng chạy được.
6. Luôn chú ý optimistic update.
7. Luôn chú ý phân quyền.
8. Luôn chú ý mobile-first.
9. Luôn chú ý dữ liệu có version để chống xung đột.
10. Luôn chú ý Apps Script quota.
11. Nếu có nhiều cách làm, hãy khuyên cách phù hợp cho người mới.
12. Nếu cần triển khai từng bước, hãy chia thành các bước nhỏ dễ làm.
13. Không giả định tôi đã biết sâu về lập trình.
14. Ưu tiên giải pháp đơn giản nhưng có thể mở rộng.

Yêu cầu khi viết code:

Nếu tôi yêu cầu tạo code, hãy ưu tiên cấu trúc sau:

Backend Apps Script:
- Code.gs: doGet, include HTML, cấu hình chung.
- Config.gs: ID Spreadsheet, tên sheet, constants.
- Auth.gs: current user, role, permission.
- Db.gs: đọc/ghi sheet, findById, updateById, appendRow, batch update.
- OptimisticSync.gs: submitMutation, submitMutationBatch, syncSince.
- Students.gs: API học sinh.
- Classes.gs: API lớp.
- Sessions.gs: API buổi học.
- Attendance.gs: API điểm danh.
- Scores.gs: API điểm số.
- Fees.gs: API học phí.
- AiService.gs: gọi Gemini API.
- Utils.gs: uuid, date, json, response wrapper.

Frontend:
- Index.html.
- CSS.
- App state.
- API wrapper cho google.script.run.
- Optimistic store.
- Router đơn giản.
- Components:
  - Dashboard
  - Students
  - Classes
  - Attendance
  - Scores
  - Fees
  - AI Assistant
  - Settings

Quy chuẩn response API:
Mọi hàm backend trả về object dạng:

{
  "ok": true,
  "data": {},
  "message": "",
  "serverVersion": 1
}

Nếu lỗi:

{
  "ok": false,
  "errorCode": "PERMISSION_DENIED",
  "message": "Bạn không có quyền thực hiện thao tác này",
  "details": {}
}

Quy chuẩn lỗi:
- PERMISSION_DENIED
- NOT_FOUND
- VALIDATION_ERROR
- VERSION_CONFLICT
- DUPLICATE_MUTATION
- QUOTA_LIMIT
- AI_ERROR
- UNKNOWN_ERROR

Quy chuẩn ID:
- user_xxx
- stu_xxx
- cls_xxx
- ses_xxx
- att_xxx
- score_xxx
- fee_xxx
- pay_xxx
- cmt_xxx
- mat_xxx
- asg_xxx
- sub_xxx
- txn_xxx
- log_xxx

Yêu cầu đặc biệt:

Luôn nhớ rằng yêu cầu quan trọng nhất của tôi là:

1. Ứng dụng quản lý lớp học chuyên nghiệp.
2. Có AI hỗ trợ giáo viên.
3. Chạy trên Google Apps Script WebApp.
4. Dùng Google Sheets làm database.
5. Giao diện đẹp trên điện thoại và máy tính.
6. Có optimistic update cho thao tác tức thì.
7. Có phân quyền.
8. Có version, lock, mutation log, audit log.
9. Phù hợp người mới triển khai từng bước.

Hãy luôn bám sát đặc tả này trong mọi câu trả lời tiếp theo.
