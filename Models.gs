/* AI-ARCHITECT-BANNER
 * Tác giả: TDA
 * Liên hệ: 0986509106
 * TDA — Think Daily. Act AI
 * © 2026
 */
const SHEET_STUDENTS = SHEET_NAMES.STUDENTS;
const SHEET_CLASSES = SHEET_NAMES.CLASSES;
const SHEET_SESSIONS = SHEET_NAMES.SESSIONS;
const SHEET_ATTENDANCE = SHEET_NAMES.ATTENDANCE;
const SHEET_SCORES = SHEET_NAMES.SCORES;
const SHEET_FEES = SHEET_NAMES.FEES;
const SHEET_PAYMENTS = SHEET_NAMES.PAYMENTS;
const SHEET_COMMENTS = SHEET_NAMES.COMMENTS;
const SHEET_MATERIALS = SHEET_NAMES.MATERIALS;
const SHEET_ASSIGNMENTS = SHEET_NAMES.ASSIGNMENTS;
const SHEET_SUBMISSIONS = SHEET_NAMES.SUBMISSIONS;

function getSheetByName_(sheetName) {
  var ss = getSpreadsheet();
  var sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
  }
  return sheet;
}

function rowToEntity_(headers, row) {
  var entity = {};
  for (var i = 0; i < headers.length; i++) {
    var val = row[i];
    if (val === "" || val === undefined) {
      val = null;
    }
    entity[headers[i]] = val;
  }
  return entity;
}

function entityToRow_(headers, entity) {
  var row = [];
  for (var i = 0; i < headers.length; i++) {
    var val = entity[headers[i]];
    if (val === undefined || val === null) {
      val = "";
    } else if (typeof val === "object" && !(val instanceof Date)) {
      val = JSON.stringify(val);
    }
    row.push(val);
  }
  return row;
}

function getTableData_(sheetName) {
  var sheet = getSheetByName_(sheetName);
  var rows = sheet.getDataRange().getValues();
  if (rows.length === 0) return [];
  var headers = rows[0];
  var data = [];
  for (var i = 1; i < rows.length; i++) {
    var row = rows[i];
    if (row[0] !== "") {
      data.push(rowToEntity_(headers, row));
    }
  }
  return data;
}

function saveTableData_(sheetName, data, idField) {
  var sheet = getSheetByName_(sheetName);
  var rows = sheet.getDataRange().getValues();
  if (rows.length === 0) return;
  var headers = rows[0];
  var map = {};
  for (var i = 1; i < rows.length; i++) {
    var id = rows[i][headers.indexOf(idField)];
    if (id) {
      map[id] = i + 1;
    }
  }

  for (var j = 0; j < data.length; j++) {
    var item = data[j];
    var idVal = item[idField];
    var rowArray = entityToRow_(headers, item);
    if (map[idVal]) {
      sheet.getRange(map[idVal], 1, 1, rowArray.length).setValues([rowArray]);
    } else {
      sheet.appendRow(rowArray);
    }
  }
}

function getEntityById_(sheetName, idField, idValue) {
  var data = getTableData_(sheetName);
  for (var i = 0; i < data.length; i++) {
    if (String(data[i][idField]) === String(idValue)) {
      return data[i];
    }
  }
  return null;
}

function deleteEntityById_(sheetName, idField, idValue) {
  var sheet = getSheetByName_(sheetName);
  var rows = sheet.getDataRange().getValues();
  if (rows.length <= 1) return false;
  var headers = rows[0];
  var index = headers.indexOf(idField);
  for (var i = 1; i < rows.length; i++) {
    if (String(rows[i][index]) === String(idValue)) {
      sheet.deleteRow(i + 1);
      return true;
    }
  }
  return false;
}

function getStudentById(studentId) {
  try {
    return getEntityById_(SHEET_STUDENTS, "studentId", studentId);
  } catch (e) {
    handleError(e, "getStudentById");
    return null;
  }
}

function getStudents(pageSize, pageToken) {
  try {
    var data = getTableData_(SHEET_STUDENTS);
    var size = pageSize || DEFAULT_PAGE_SIZE;
    var start = pageToken ? parseInt(pageToken, 10) : 0;
    return data.slice(start, start + size);
  } catch (e) {
    handleError(e, "getStudents");
    return [];
  }
}

function createStudent(studentData) {
  try {
    if (!studentData.studentId) studentData.studentId = generateId();
    if (!studentData.createdAt) studentData.createdAt = getCurrentTimestamp();
    if (!studentData.updatedAt) studentData.updatedAt = getCurrentTimestamp();
    if (!studentData.version) studentData.version = 1;
    if (!studentData.status) studentData.status = "ACTIVE";
    
    var sheet = getSheetByName_(SHEET_STUDENTS);
    var headers = sheet.getDataRange().getValues()[0];
    if (!headers || headers.length === 0 || headers[0] === "") {
      headers = ["studentId", "code", "fullName", "dob", "gender", "phone", "email", "parentName", "parentPhone", "parentEmail", "school", "grade", "status", "startDate", "note", "createdAt", "updatedAt", "version"];
      sheet.clear();
      sheet.appendRow(headers);
    }
    sheet.appendRow(entityToRow_(headers, studentData));
    return studentData;
  } catch (e) {
    handleError(e, "createStudent");
    throw e;
  }
}

function updateStudent(studentId, studentData) {
  try {
    var existing = getStudentById(studentId);
    if (!existing) throw new Error("Student not found");
    for (var key in studentData) {
      if (studentData.hasOwnProperty(key)) {
        existing[key] = studentData[key];
      }
    }
    existing.updatedAt = getCurrentTimestamp();
    existing.version = (parseInt(existing.version, 10) || 1) + 1;
    
    var sheet = getSheetByName_(SHEET_STUDENTS);
    var rows = sheet.getDataRange().getValues();
    var headers = rows[0];
    var idIdx = headers.indexOf("studentId");
    for (var i = 1; i < rows.length; i++) {
      if (String(rows[i][idIdx]) === String(studentId)) {
        sheet.getRange(i + 1, 1, 1, headers.length).setValues([entityToRow_(headers, existing)]);
        return existing;
      }
    }
    throw new Error("Student row not found for update");
  } catch (e) {
    handleError(e, "updateStudent");
    throw e;
  }
}

function deleteStudent(studentId) {
  try {
    return deleteEntityById_(SHEET_STUDENTS, "studentId", studentId);
  } catch (e) {
    handleError(e, "deleteStudent");
    return false;
  }
}

function getClassById(classId) {
  try {
    return getEntityById_(SHEET_CLASSES, "classId", classId);
  } catch (e) {
    handleError(e, "getClassById");
    return null;
  }
}

function getClasses(pageSize, pageToken) {
  try {
    var data = getTableData_(SHEET_CLASSES);
    var size = pageSize || DEFAULT_PAGE_SIZE;
    var start = pageToken ? parseInt(pageToken, 10) : 0;
    return data.slice(start, start + size);
  } catch (e) {
    handleError(e, "getClasses");
    return [];
  }
}

function createClass(classData) {
  try {
    if (!classData.classId) classData.classId = generateId();
    if (!classData.createdAt) classData.createdAt = getCurrentTimestamp();
    if (!classData.updatedAt) classData.updatedAt = getCurrentTimestamp();
    if (!classData.version) classData.version = 1;
    if (!classData.status) classData.status = "ACTIVE";
    if (!classData.color) classData.color = generateRandomColor();

    var sheet = getSheetByName_(SHEET_CLASSES);
    var headers = sheet.getDataRange().getValues()[0];
    if (!headers || headers.length === 0 || headers[0] === "") {
      headers = ["classId", "className", "subject", "level", "teacherId", "assistantIds", "room", "startDate", "endDate", "status", "tuitionType", "defaultFee", "color", "scheduleJson", "createdAt", "updatedAt", "version"];
      sheet.clear();
      sheet.appendRow(headers);
    }
    sheet.appendRow(entityToRow_(headers, classData));
    return classData;
  } catch (e) {
    handleError(e, "createClass");
    throw e;
  }
}

function updateClass(classId, classData) {
  try {
    var existing = getClassById(classId);
    if (!existing) throw new Error("Class not found");
    for (var key in classData) {
      if (classData.hasOwnProperty(key)) {
        existing[key] = classData[key];
      }
    }
    existing.updatedAt = getCurrentTimestamp();
    existing.version = (parseInt(existing.version, 10) || 1) + 1;

    var sheet = getSheetByName_(SHEET_CLASSES);
    var rows = sheet.getDataRange().getValues();
    var headers = rows[0];
    var idIdx = headers.indexOf("classId");
    for (var i = 1; i < rows.length; i++) {
      if (String(rows[i][idIdx]) === String(classId)) {
        sheet.getRange(i + 1, 1, 1, headers.length).setValues([entityToRow_(headers, existing)]);
        return existing;
      }
    }
    throw new Error("Class row not found for update");
  } catch (e) {
    handleError(e, "updateClass");
    throw e;
  }
}

function deleteClass(classId) {
  try {
    return deleteEntityById_(SHEET_CLASSES, "classId", classId);
  } catch (e) {
    handleError(e, "deleteClass");
    return false;
  }
}

function getSessionById(sessionId) {
  try {
    return getEntityById_(SHEET_SESSIONS, "sessionId", sessionId);
  } catch (e) {
    handleError(e, "getSessionById");
    return null;
  }
}

function getSessions(classId, pageSize, pageToken) {
  try {
    var data = getTableData_(SHEET_SESSIONS);
    var filtered = [];
    for (var i = 0; i < data.length; i++) {
      if (!classId || String(data[i].classId) === String(classId)) {
        filtered.push(data[i]);
      }
    }
    var size = pageSize || DEFAULT_PAGE_SIZE;
    var start = pageToken ? parseInt(pageToken, 10) : 0;
    return filtered.slice(start, start + size);
  } catch (e) {
    handleError(e, "getSessions");
    return [];
  }
}

function createSession(sessionData) {
  try {
    if (!sessionData.sessionId) sessionData.sessionId = generateId();
    if (!sessionData.createdAt) sessionData.createdAt = getCurrentTimestamp();
    if (!sessionData.updatedAt) sessionData.updatedAt = getCurrentTimestamp();
    if (!sessionData.version) sessionData.version = 1;
    if (!sessionData.status) sessionData.status = "SCHEDULED";
    if (sessionData.startTime && sessionData.endTime && !sessionData.duration) {
      sessionData.duration = calculateSessionDuration(sessionData.startTime, sessionData.endTime);
    }

    var sheet = getSheetByName_(SHEET_SESSIONS);
    var headers = sheet.getDataRange().getValues()[0];
    if (!headers || headers.length === 0 || headers[0] === "") {
      headers = ["sessionId", "classId", "startTime", "endTime", "duration", "teacherId", "assistantIds", "topic", "content", "homework", "status", "calendarEventId", "createdAt", "updatedAt", "version"];
      sheet.clear();
      sheet.appendRow(headers);
    }
    sheet.appendRow(entityToRow_(headers, sessionData));
    return sessionData;
  } catch (e) {
    handleError(e, "createSession");
    throw e;
  }
}

function updateSession(sessionId, sessionData) {
  try {
    var existing = getSessionById(sessionId);
    if (!existing) throw new Error("Session not found");
    for (var key in sessionData) {
      if (sessionData.hasOwnProperty(key)) {
        existing[key] = sessionData[key];
      }
    }
    existing.updatedAt = getCurrentTimestamp();
    existing.version = (parseInt(existing.version, 10) || 1) + 1;
    if (existing.startTime && existing.endTime) {
      existing.duration = calculateSessionDuration(existing.startTime, existing.endTime);
    }

    var sheet = getSheetByName_(SHEET_SESSIONS);
    var rows = sheet.getDataRange().getValues();
    var headers = rows[0];
    var idIdx = headers.indexOf("sessionId");
    for (var i = 1; i < rows.length; i++) {
      if (String(rows[i][idIdx]) === String(sessionId)) {
        sheet.getRange(i + 1, 1, 1, headers.length).setValues([entityToRow_(headers, existing)]);
        return existing;
      }
    }
    throw new Error("Session row not found for update");
  } catch (e) {
    handleError(e, "updateSession");
    throw e;
  }
}

function deleteSession(sessionId) {
  try {
    return deleteEntityById_(SHEET_SESSIONS, "sessionId", sessionId);
  } catch (e) {
    handleError(e, "deleteSession");
    return false;
  }
}

function getAttendanceBySession(sessionId) {
  try {
    var data = getTableData_(SHEET_ATTENDANCE);
    var res = [];
    for (var i = 0; i < data.length; i++) {
      if (String(data[i].sessionId) === String(sessionId)) {
        res.push(data[i]);
      }
    }
    return res;
  } catch (e) {
    handleError(e, "getAttendanceBySession");
    return [];
  }
}

function saveAttendance(attendanceData) {
  try {
    var sheet = getSheetByName_(SHEET_ATTENDANCE);
    var rows = sheet.getDataRange().getValues();
    var headers = rows[0];
    if (!headers || headers.length === 0 || headers[0] === "") {
      headers = ["attendanceId", "sessionId", "classId", "studentId", "status", "note", "feeCounted", "createdAt", "updatedAt", "version"];
      sheet.clear();
      sheet.appendRow(headers);
    }
    
    var saved = [];
    for (var j = 0; j < attendanceData.length; j++) {
      var item = attendanceData[j];
      if (!item.attendanceId) item.attendanceId = generateId();
      if (!item.createdAt) item.createdAt = getCurrentTimestamp();
      item.updatedAt = getCurrentTimestamp();
      if (!item.version) item.version = 1;
      else item.version = parseInt(item.version, 10) + 1;
      
      var foundIndex = -1;
      for (var r = 1; r < rows.length; r++) {
        if (String(rows[r][headers.indexOf("attendanceId")]) === String(item.attendanceId)) {
          foundIndex = r + 1;
          break;
        }
      }
      var rowArr = entityToRow_(headers, item);
      if (foundIndex !== -1) {
        sheet.getRange(foundIndex, 1, 1, headers.length).setValues([rowArr]);
      } else {
        sheet.appendRow(rowArr);
      }
      saved.push(item);
    }
    return saved;
  } catch (e) {
    handleError(e, "saveAttendance");
    throw e;
  }
}

function getScoresByStudent(studentId, classId) {
  try {
    var data = getTableData_(SHEET_SCORES);
    var res = [];
    for (var i = 0; i < data.length; i++) {
      var matchStudent = !studentId || String(data[i].studentId) === String(studentId);
      var matchClass = !classId || String(data[i].classId) === String(classId);
      if (matchStudent && matchClass) {
        res.push(data[i]);
      }
    }
    return res;
  } catch (e) {
    handleError(e, "getScoresByStudent");
    return [];
  }
}

function saveScores(scoresData) {
  try {
    var sheet = getSheetByName_(SHEET_SCORES);
    var rows = sheet.getDataRange().getValues();
    var headers = rows[0];
    if (!headers || headers.length === 0 || headers[0] === "") {
      headers = ["scoreId", "studentId", "classId", "scoreType", "score", "scale", "weight", "testDate", "comment", "fileUrl", "createdBy", "createdAt", "updatedAt", "version"];
      sheet.clear();
      sheet.appendRow(headers);
    }

    var saved = [];
    for (var j = 0; j < scoresData.length; j++) {
      var item = scoresData[j];
      if (!item.scoreId) item.scoreId = generateId();
      if (!item.createdAt) item.createdAt = getCurrentTimestamp();
      item.updatedAt = getCurrentTimestamp();
      if (!item.version) item.version = 1;
      else item.version = parseInt(item.version, 10) + 1;

      var foundIndex = -1;
      for (var r = 1; r < rows.length; r++) {
        if (String(rows[r][headers.indexOf("scoreId")]) === String(item.scoreId)) {
          foundIndex = r + 1;
          break;
        }
      }
      var rowArr = entityToRow_(headers, item);
      if (foundIndex !== -1) {
        sheet.getRange(foundIndex, 1, 1, headers.length).setValues([rowArr]);
      } else {
        sheet.appendRow(rowArr);
      }
      saved.push(item);
    }
    return saved;
  } catch (e) {
    handleError(e, "saveScores");
    throw e;
  }
}

function getFeesByStudent(studentId, classId) {
  try {
    var data = getTableData_(SHEET_FEES);
    var res = [];
    for (var i = 0; i < data.length; i++) {
      var matchStudent = !studentId || String(data[i].studentId) === String(studentId);
      var matchClass = !classId || String(data[i].classId) === String(classId);
      if (matchStudent && matchClass) {
        res.push(data[i]);
      }
    }
    return res;
  } catch (e) {
    handleError(e, "getFeesByStudent");
    return [];
  }
}

function createFee(feeData) {
  try {
    if (!feeData.feeId) feeData.feeId = generateId();
    if (!feeData.createdAt) feeData.createdAt = getCurrentTimestamp();
    feeData.updatedAt = getCurrentTimestamp();
    if (!feeData.version) feeData.version = 1;
    if (!feeData.status) feeData.status = "PENDING";
    if (feeData.subtotal === undefined) feeData.subtotal = calculateFeeTotal(feeData);
    if (feeData.total === undefined) feeData.total = feeData.subtotal + (feeData.surcharge || 0) - (feeData.discount || 0) + (feeData.previousDebt || 0);
    if (feeData.paid === undefined) feeData.paid = 0;
    if (feeData.balance === undefined) feeData.balance = calculateFeeBalance(feeData);

    var sheet = getSheetByName_(SHEET_FEES);
    var headers = sheet.getDataRange().getValues()[0];
    if (!headers || headers.length === 0 || headers[0] === "") {
      headers = ["feeId", "studentId", "classId", "period", "feeType", "sessionCount", "unitPrice", "subtotal", "surcharge", "discount", "previousDebt", "total", "paid", "balance", "status", "dueDate", "note", "createdAt", "updatedAt", "version"];
      sheet.clear();
      sheet.appendRow(headers);
    }
    sheet.appendRow(entityToRow_(headers, feeData));
    return feeData;
  } catch (e) {
    handleError(e, "createFee");
    throw e;
  }
}

function recordPayment(paymentData) {
  try {
    if (!paymentData.paymentId) paymentData.paymentId = generateId();
    if (!paymentData.createdAt) paymentData.createdAt = getCurrentTimestamp();
    if (!paymentData.paidAt) paymentData.paidAt = getCurrentTimestamp();
    if (!paymentData.version) paymentData.version = 1;
    if (!paymentData.transactionCode) paymentData.transactionCode = generateReceiptNumber();

    var sheet = getSheetByName_(SHEET_PAYMENTS);
    var headers = sheet.getDataRange().getValues()[0];
    if (!headers || headers.length === 0 || headers[0] === "") {
      headers = ["paymentId", "feeId", "studentId", "amount", "method", "paidAt", "transactionCode", "receiptUrl", "createdBy", "createdAt", "version"];
      sheet.clear();
      sheet.appendRow(headers);
    }
    sheet.appendRow(entityToRow_(headers, paymentData));

    // Update associated Fee
    var feeRows = getTableData_(SHEET_FEES);
    for (var i = 0; i < feeRows.length; i++) {
      if (String(feeRows[i].feeId) === String(paymentData.feeId)) {
        var fee = feeRows[i];
        fee.paid = (parseFloat(fee.paid) || 0) + parseFloat(paymentData.amount);
        fee.balance = calculateFeeBalance(fee);
        fee.status = fee.balance <= 0 ? "PAID" : "PARTIAL";
        fee.updatedAt = getCurrentTimestamp();
        fee.version = (parseInt(fee.version, 10) || 1) + 1;
        
        var feeSheet = getSheetByName_(SHEET_FEES);
        var fRows = feeSheet.getDataRange().getValues();
        var fHeaders = fRows[0];
        for (var r = 1; r < fRows.length; r++) {
          if (String(fRows[r][fHeaders.indexOf("feeId")]) === String(fee.feeId)) {
            feeSheet.getRange(r + 1, 1, 1, fHeaders.length).setValues([entityToRow_(fHeaders, fee)]);
            break;
          }
        }
        break;
      }
    }

    return paymentData;
  } catch (e) {
    handleError(e, "recordPayment");
    throw e;
  }
}

function getCommentsByStudent(studentId, classId) {
  try {
    var data = getTableData_(SHEET_COMMENTS);
    var res = [];
    for (var i = 0; i < data.length; i++) {
      var matchStudent = !studentId || String(data[i].studentId) === String(studentId);
      var matchClass = !classId || String(data[i].classId) === String(classId);
      if (matchStudent && matchClass) {
        res.push(data[i]);
      }
    }
    return res;
  } catch (e) {
    handleError(e, "getCommentsByStudent");
    return [];
  }
}

function createComment(commentData) {
  try {
    if (!commentData.commentId) commentData.commentId = generateId();
    if (!commentData.createdAt) commentData.createdAt = getCurrentTimestamp();
    if (!commentData.version) commentData.version = 1;
    if (!commentData.visibility) commentData.visibility = "PUBLIC";

    var sheet = getSheetByName_(SHEET_COMMENTS);
    var headers = sheet.getDataRange().getValues()[0];
    if (!headers || headers.length === 0 || headers[0] === "") {
      headers = ["commentId", "studentId", "classId", "sessionId", "type", "content", "aiGenerated", "visibility", "createdBy", "createdAt", "version"];
      sheet.clear();
      sheet.appendRow(headers);
    }
    sheet.appendRow(entityToRow_(headers, commentData));
    return commentData;
  } catch (e) {
    handleError(e, "createComment");
    throw e;
  }
}

function getMaterialsByClass(classId) {
  try {
    var data = getTableData_(SHEET_MATERIALS);
    var res = [];
    for (var i = 0; i < data.length; i++) {
      if (!classId || String(data[i].classId) === String(classId)) {
        res.push(data[i]);
      }
    }
    return res;
  } catch (e) {
    handleError(e, "getMaterialsByClass");
    return [];
  }
}

function uploadMaterial(materialData) {
  try {
    if (!materialData.materialId) materialData.materialId = generateId();
    if (!materialData.createdAt) materialData.createdAt = getCurrentTimestamp();
    if (!materialData.visibility) materialData.visibility = "PUBLIC";

    var sheet = getSheetByName_(SHEET_MATERIALS);
    var headers = sheet.getDataRange().getValues()[0];
    if (!headers || headers.length === 0 || headers[0] === "") {
      headers = ["materialId", "title", "type", "url", "classId", "studentId", "topic", "visibility", "createdBy", "createdAt"];
      sheet.clear();
      sheet.appendRow(headers);
    }
    sheet.appendRow(entityToRow_(headers, materialData));
    return materialData;
  } catch (e) {
    handleError(e, "uploadMaterial");
    throw e;
  }
}

function getAssignmentsByClass(classId) {
  try {
    var data = getTableData_(SHEET_ASSIGNMENTS);
    var res = [];
    for (var i = 0; i < data.length; i++) {
      if (!classId || String(data[i].classId) === String(classId)) {
        res.push(data[i]);
      }
    }
    return res;
  } catch (e) {
    handleError(e, "getAssignmentsByClass");
    return [];
  }
}

function createAssignment(assignmentData) {
  try {
    if (!assignmentData.assignmentId) assignmentData.assignmentId = generateId();
    if (!assignmentData.createdAt) assignmentData.createdAt = getCurrentTimestamp();
    assignmentData.updatedAt = getCurrentTimestamp();
    if (!assignmentData.version) assignmentData.version = 1;
    if (!assignmentData.status) assignmentData.status = "ACTIVE";

    var sheet = getSheetByName_(SHEET_ASSIGNMENTS);
    var headers = sheet.getDataRange().getValues()[0];
    if (!headers || headers.length === 0 || headers[0] === "") {
      headers = ["assignmentId", "title", "description", "classId", "studentId", "dueDate", "status", "createdBy", "createdAt", "updatedAt", "version"];
      sheet.clear();
      sheet.appendRow(headers);
    }
    sheet.appendRow(entityToRow_(headers, assignmentData));
    return assignmentData;
  } catch (e) {
    handleError(e, "createAssignment");
    throw e;
  }
}

function getSubmissionsByAssignment(assignmentId) {
  try {
    var data = getTableData_(SHEET_SUBMISSIONS);
    var res = [];
    for (var i = 0; i < data.length; i++) {
      if (!assignmentId || String(data[i].assignmentId) === String(assignmentId)) {
        res.push(data[i]);
      }
    }
    return res;
  } catch (e) {
    handleError(e, "getSubmissionsByAssignment");
    return [];
  }
}

function submitAssignment(submissionData) {
  try {
    if (!submissionData.submissionId) submissionData.submissionId = generateId();
    if (!submissionData.createdAt) submissionData.createdAt = getCurrentTimestamp();
    if (!submissionData.submittedAt) submissionData.submittedAt = getCurrentTimestamp();
    submissionData.updatedAt = getCurrentTimestamp();
    if (!submissionData.version) submissionData.version = 1;
    if (!submissionData.status) submissionData.status = "SUBMITTED";

    var sheet = getSheetByName_(SHEET_SUBMISSIONS);
    var headers = sheet.getDataRange().getValues()[0];
    if (!headers || headers.length === 0 || headers[0] === "") {
      headers = ["submissionId", "assignmentId", "studentId", "content", "fileUrl", "submittedAt", "status", "score", "feedback", "createdAt", "updatedAt", "version"];
      sheet.clear();
      sheet.appendRow(headers);
    }
    sheet.appendRow(entityToRow_(headers, submissionData));
    return submissionData;
  } catch (e) {
    handleError(e, "submitAssignment");
    throw e;
  }
}