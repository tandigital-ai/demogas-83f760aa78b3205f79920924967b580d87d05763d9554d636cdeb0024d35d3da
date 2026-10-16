/* AI-ARCHITECT-BANNER
 * Tác giả: TDA
 * Liên hệ: 0986509106
 * TDA — Think Daily. Act AI
 * © 2026
 */
// Handlers.gs — Hàm public gọi qua google.script.run (validate đầu vào)
// Dự án: EduClass AI

/**
 * Lấy thông tin khách hàng/học sinh theo ID (tương thích API contract)
 * @param {string} customerId
 * @return {Object|null}
 */
function getCustomerById(customerId) {
  try {
    if (!customerId) throw new Error("ID khách hàng không được để trống");
    const student = getStudentById(customerId);
    if (!student) return null;
    logAudit("READ", "Customer", customerId, getUserEmail());
    return student;
  } catch (error) {
    handleError(error, "getCustomerById");
    throw error;
  }
}

/**
 * Lấy danh sách khách hàng/học sinh phân trang
 * @param {number} pageSize
 * @param {string} pageToken
 * @return {Object}
 */
function getCustomers(pageSize, pageToken) {
  try {
    const size = pageSize || DEFAULT_PAGE_SIZE;
    const students = getStudents(size, pageToken);
    logAudit("READ_LIST", "Customer", "", getUserEmail());
    return {
      items: students,
      nextPageToken: students.length === size ? "next" : null
    };
  } catch (error) {
    handleError(error, "getCustomers");
    throw error;
  }
}

/**
 * Tạo khách hàng/học sinh mới
 * @param {Object} customer
 * @param {string} clientTxnId
 * @return {Object}
 */
function createCustomer(customer, clientTxnId) {
  try {
    if (!customer || !customer.fullName) {
      throw new Error("Thông tin khách hàng không hợp lệ hoặc thiếu tên");
    }
    const newStudent = createStudent(customer);
    logAudit("CREATE", "Customer", newStudent.studentId || "", getUserEmail());
    return newStudent;
  } catch (error) {
    handleError(error, "createCustomer");
    throw error;
  }
}

/**
 * Cập nhật thông tin khách hàng/học sinh
 * @param {Object} customer
 * @param {string} clientTxnId
 * @return {Object}
 */
function updateCustomer(customer, clientTxnId) {
  try {
    if (!customer || !customer.studentId) {
      throw new Error("ID khách hàng không hợp lệ để cập nhật");
    }
    const updated = updateStudent(customer.studentId, customer);
    logAudit("UPDATE", "Customer", customer.studentId, getUserEmail());
    return updated;
  } catch (error) {
    handleError(error, "updateCustomer");
    throw error;
  }
}

/**
 * Xóa khách hàng/học sinh
 * @param {string} customerId
 * @param {string} clientTxnId
 * @return {void}
 */
function deleteCustomer(customerId, clientTxnId) {
  try {
    if (!customerId) throw new Error("ID khách hàng không được để trống");
    const success = deleteStudent(customerId);
    if (!success) {
      throw new Error("Không tìm thấy khách hàng để xóa");
    }
    logAudit("DELETE", "Customer", customerId, getUserEmail());
  } catch (error) {
    handleError(error, "deleteCustomer");
    throw error;
  }
}