/** EduClass AI — Auth_.gs: OTP qua email, phiên 30 ngày, tự nhận chủ sở hữu */
function sha_(s) {
  return Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, String(s), Utilities.Charset.UTF_8)
    .map(function (b) { return ('0' + (b & 255).toString(16)).slice(-2); }).join('');
}
function findUserByEmail_(email) {
  var row = findRow_('Users', 'email', String(email || '').trim());
  if (row < 0) return null;
  var u = getRowObj_('Users', row);
  return u.deletedAt ? null : clean_(u);
}
function loadUser_(userId) {
  var cache = CacheService.getScriptCache(), hit = cache.get('usr_' + userId);
  if (hit) return JSON.parse(hit);
  var u = getRecord_('Users', userId);
  if (!u || u.deletedAt) return null;
  u = clean_(u);
  cache.put('usr_' + userId, JSON.stringify(u), 300);
  return u;
}
function ownerEmail_() {
  try {
    var a = Session.getActiveUser().getEmail() || '', o = Session.getEffectiveUser().getEmail() || '';
    return (a && a.toLowerCase() === o.toLowerCase()) ? o : '';
  } catch (e) { return ''; }
}
function createSession_(user, ua) {
  var token = Utilities.getUuid().replace(/-/g, '') + Utilities.getUuid().replace(/-/g, '');
  var days = Number(getSettings_().AUTH_SESSION_DAYS || 30);
  var exp = new Date(Date.now() + days * 86400000);
  appendObjects_('AuthSessions', [{
    tokenHash: sha_(token), userId: user.userId, email: user.email, role: user.role,
    createdAt: nowIso_(), expiresAt: exp.toISOString(), lastSeenAt: nowIso_(),
    userAgent: String(ua || '').substring(0, 200), revokedAt: ''
  }]);
  if (user._row || findRow_('Users', 'userId', user.userId) > 0) {
    setCell_('Users', findRow_('Users', 'userId', user.userId), 'lastLoginAt', nowIso_());
  }
  return token;
}
/** Bắt buộc có phiên hợp lệ → trả ctx {user, email, role, perms} */
function requireSession_(token) {
  if (!token) throw err_('AUTH_REQUIRED', 'Vui lòng đăng nhập');
  var h = sha_(token), cache = CacheService.getScriptCache(), ses = null, hit = cache.get('ses_' + h);
  if (hit) ses = JSON.parse(hit);
  else {
    var row = findRow_('AuthSessions', 'tokenHash', h);
    if (row < 0) throw err_('AUTH_REQUIRED', 'Phiên đăng nhập không hợp lệ, vui lòng đăng nhập lại');
    var r = getRowObj_('AuthSessions', row);
    if (r.revokedAt) throw err_('AUTH_REQUIRED', 'Phiên đã đăng xuất');
    ses = { userId: r.userId, expiresAt: r.expiresAt };
    cache.put('ses_' + h, JSON.stringify(ses), 1800);
  }
  if (new Date(ses.expiresAt).getTime() < Date.now()) throw err_('AUTH_REQUIRED', 'Phiên đã hết hạn');
  var user = loadUser_(ses.userId);
  if (!user) throw err_('AUTH_REQUIRED', 'Tài khoản không tồn tại');
  if (user.status !== 'ACTIVE') throw err_('ACCOUNT_LOCKED', 'Tài khoản đã bị khóa. Liên hệ quản trị viên.');
  return { user: user, email: user.email, role: user.role, perms: getEffectivePerms_(user) };
}
/** Bước 1: gửi OTP (luôn trả lời giống nhau để không lộ email nào tồn tại) */
function apiRequestOtp_(ctx, p) {
  var email = String(p.email || '').trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw err_('VALIDATION_ERROR', 'Email không hợp lệ');
  var cache = CacheService.getScriptCache(), eh = sha_(email);
  var n = Number(cache.get('otpn_' + eh) || 0);
  if (n >= 3) throw err_('QUOTA_LIMIT', 'Bạn đã yêu cầu mã quá nhiều lần. Thử lại sau 15 phút.');
  cache.put('otpn_' + eh, String(n + 1), 900);
  var generic = { sent: true, message: 'Nếu email có trong hệ thống, mã đăng nhập đã được gửi. Kiểm tra cả mục Spam.' };
  var user = findUserByEmail_(email);
  if (!user || user.status !== 'ACTIVE') return generic;
  if (MailApp.getRemainingDailyQuota() < 2) throw err_('QUOTA_LIMIT', 'Hôm nay hệ thống đã hết lượt gửi email. Thử lại ngày mai.');
  var code = String(Math.floor(100000 + Math.random() * 900000));
  var minutes = Number(getSettings_().OTP_MINUTES || 10);
  cache.put('otp_' + eh, JSON.stringify({ h: sha_(code + email), tries: 0 }), minutes * 60);
  var center = getSettings_().CENTER_NAME || 'EduClass AI';
  MailApp.sendEmail({
    to: email, name: center, subject: 'Mã đăng nhập ' + center + ': ' + code,
    htmlBody: '<div style="font-family:Arial;padding:16px"><p>Xin chào ' + (user.fullName || '') + ',</p>' +
      '<p>Mã đăng nhập của bạn là:</p><p style="font-size:28px;font-weight:bold;letter-spacing:6px;color:#4F46E5">' +
      code + '</p><p>Mã có hiệu lực ' + minutes + ' phút. Không chia sẻ mã này cho bất kỳ ai.</p></div>'
  });
  return generic;
}
/** Bước 2: xác minh OTP → tạo phiên */
function apiVerifyOtp_(ctx, p) {
  var email = String(p.email || '').trim().toLowerCase(), code = String(p.code || '').trim();
  var cache = CacheService.getScriptCache(), eh = sha_(email), raw = cache.get('otp_' + eh);
  if (!raw) throw err_('VALIDATION_ERROR', 'Mã đã hết hạn hoặc chưa được gửi. Bấm "Gửi lại mã".');
  var o = JSON.parse(raw);
  if (o.tries >= 5) { cache.remove('otp_' + eh); throw err_('QUOTA_LIMIT', 'Nhập sai quá 5 lần. Hãy yêu cầu mã mới.'); }
  if (sha_(code + email) !== o.h) {
    o.tries++; cache.put('otp_' + eh, JSON.stringify(o), 600);
    throw err_('VALIDATION_ERROR', 'Mã không đúng (còn ' + (5 - o.tries) + ' lần thử)');
  }
  cache.remove('otp_' + eh);
  var user = findUserByEmail_(email);
  if (!user) throw err_('AUTH_REQUIRED', 'Tài khoản không tồn tại');
  if (user.status !== 'ACTIVE') throw err_('ACCOUNT_LOCKED', 'Tài khoản đã bị khóa');
  var token = createSession_(user, p.ua);
  writeAudit_(user.email, 'LOGIN_OTP', 'Users', user.userId, null, null);
  return buildBoot_(requireSession_(token), token);
}
function apiLogout_(ctx, p, token) {
  var h = sha_(token), row = findRow_('AuthSessions', 'tokenHash', h);
  if (row > 0) setCell_('AuthSessions', row, 'revokedAt', nowIso_());
  CacheService.getScriptCache().remove('ses_' + h);
  return { loggedOut: true };
}
/** Mở app: dùng phiên cũ → hoặc tự nhận chủ sở hữu → hoặc yêu cầu đăng nhập */
function apiBootstrap_(ctx, p, token) {
  var c = null, newToken = null;
  if (token) {
    try { c = requireSession_(token); } catch (e) { if (e.code === 'ACCOUNT_LOCKED') throw e; }
  }
  if (!c) {
    var own = ownerEmail_(), u = own ? findUserByEmail_(own) : null;
    if (u && u.status === 'ACTIVE') { newToken = createSession_(u, p.ua); c = requireSession_(newToken); }
  }
  if (!c) return { needLogin: true, centerName: getSettings_().CENTER_NAME || 'EduClass AI' };
  return buildBoot_(c, newToken);
}
function buildBoot_(c, token) {
  var roles = getRoles_(), s = getSettings_();
  return {
    token: token || null,
    user: { userId: c.user.userId, email: c.user.email, fullName: c.user.fullName, role: c.role,
            roleName: (roles[c.role] || {}).roleName || c.role },
    perms: c.perms, menu: buildMenu_(c.perms), modules: PERMISSION_MODULES,
    settings: { CENTER_NAME: s.CENTER_NAME, THEME_COLOR: s.THEME_COLOR, SYNC_POLL_SECONDS: s.SYNC_POLL_SECONDS,
                AI_ENABLED: s.AI_ENABLED, CURRENCY: s.CURRENCY },
    aiQuota: getAiQuota_(c.user), serverVersion: getServerVersion_()
  };
}
