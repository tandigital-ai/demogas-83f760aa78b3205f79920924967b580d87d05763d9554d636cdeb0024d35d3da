/** EduClass AI — Perm_.gs: Quyền = Vai trò + grant − deny (phân quyền động) */
function getRoles_() {
  var cache = CacheService.getScriptCache(), hit = cache.get('roles');
  if (hit) return JSON.parse(hit);
  var map = {};
  readTable_('Roles').forEach(function (r) {
    var perms = {};
    try { perms = JSON.parse(r.permissionsJson || '{}'); } catch (e) { perms = {}; }
    map[r.roleId] = { roleId: r.roleId, roleName: r.roleName, dataScope: r.dataScope, permissions: perms,
                      description: r.description, version: r.version };
  });
  cache.put('roles', JSON.stringify(map), 600);
  return map;
}
function allPerms_() {
  var o = {}; Object.keys(PERMISSION_MODULES).forEach(function (m) { o[m] = PERMISSION_MODULES[m].slice(); }); return o;
}
/** Chỉ giữ module/hành động hợp lệ (không tin dữ liệu từ client) */
function sanitizePermMap_(obj) {
  var out = {};
  Object.keys(obj || {}).forEach(function (m) {
    if (!PERMISSION_MODULES[m] || !Array.isArray(obj[m])) return;
    var acts = obj[m].filter(function (a) { return PERMISSION_MODULES[m].indexOf(a) > -1; });
    if (acts.length) out[m] = acts;
  });
  return out;
}
function sanitizeOverride_(json) {
  var o = {};
  try { o = typeof json === 'string' ? JSON.parse(json || '{}') : (json || {}); } catch (e) { o = {}; }
  return JSON.stringify({ grant: sanitizePermMap_(o.grant), deny: sanitizePermMap_(o.deny) });
}
function getEffectivePerms_(user) {
  var role = getRoles_()[user.role];
  if (!role) return {};
  var base = role.permissions['*'] ? allPerms_() : sanitizePermMap_(role.permissions);
  var ov = {};
  try { ov = JSON.parse(user.permissionsOverrideJson || '{}'); } catch (e) { ov = {}; }
  var grant = sanitizePermMap_(ov.grant), deny = sanitizePermMap_(ov.deny);
  Object.keys(grant).forEach(function (m) {
    base[m] = base[m] || [];
    grant[m].forEach(function (a) { if (base[m].indexOf(a) < 0) base[m].push(a); });
  });
  Object.keys(deny).forEach(function (m) {
    if (!base[m]) return;
    base[m] = base[m].filter(function (a) { return deny[m].indexOf(a) < 0; });
    if (!base[m].length) delete base[m];
  });
  return base;
}
function can_(perms, m, a) { return !!(perms && perms[m] && perms[m].indexOf(a) > -1); }
function need_(ctx, m, a) {
  if (!can_(ctx.perms, m, a)) throw err_('PERMISSION_DENIED', 'Bạn không có quyền thực hiện thao tác này', { module: m, action: a });
}
var MENU_DEF = [
  { id: 'today', label: 'Hôm nay', icon: '🏠', module: 'dashboard', mobile: true },
  { id: 'schedule', label: 'Lịch dạy', icon: '📅', module: 'sessions' },
  { id: 'classes', label: 'Lớp học', icon: '🏫', module: 'classes', mobile: true },
  { id: 'students', label: 'Học sinh', icon: '👨‍🎓', module: 'students', mobile: true },
  { id: 'attendance', label: 'Điểm danh', icon: '✅', module: 'attendance' },
  { id: 'scores', label: 'Điểm số', icon: '📝', module: 'scores' },
  { id: 'fees', label: 'Học phí', icon: '💰', module: 'fees', mobile: true },
  { id: 'assignments', label: 'Bài tập', icon: '📚', module: 'assignments' },
  { id: 'materials', label: 'Học liệu', icon: '📂', module: 'materials' },
  { id: 'comments', label: 'Nhận xét', icon: '💬', module: 'comments' },
  { id: 'reports', label: 'Báo cáo', icon: '📊', module: 'reports' },
  { id: 'ai', label: 'AI Assistant', icon: '✨', module: 'ai', action: 'use', mobile: true },
  { id: 'users', label: 'Người dùng', icon: '👥', module: 'users' },
  { id: 'settings', label: 'Cài đặt', icon: '⚙️', module: 'settings' }
];
function buildMenu_(perms) {
  return MENU_DEF.filter(function (x) { return can_(perms, x.module, x.action || 'view'); });
}
