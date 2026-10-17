/** EduClass AI — Api.gs: MỌI lệnh từ trình duyệt đi qua hàm api() */
function routes_() {
  return {
    bootstrap: { pub: true, fn: apiBootstrap_ }, peopleLoad: { fn: apiPeopleLoad_ },
    authRequestOtp: { pub: true, fn: apiRequestOtp_ },
    authVerifyOtp:  { pub: true, fn: apiVerifyOtp_ },
    logout:         { fn: apiLogout_ },
    getServerTime:  { fn: function () { return { now: nowIso_() }; } },
    syncSince:      { fn: apiSyncSince_ },
    mutate:         { fn: function (ctx, p) {
                        var r = runMutations_(ctx, [p])[0];
                        if (!r.ok) throw err_(r.errorCode, r.message, r.details);
                        return r; } },
    mutateBatch:    { fn: function (ctx, p) { return { results: runMutations_(ctx, (p.mutations || []).slice(0, 100)) }; } },
    usersList:      { perm: ['users', 'view'], fn: function () {
                        var roles = getRoles_();
                        return { users: readTable_('Users'), roles: Object.keys(roles).map(function (k) { return roles[k]; }) }; } },
    settingsGet:    { perm: ['settings', 'view'], fn: function () { return { settings: readTable_('Settings') }; } },
    aiStatus:       { perm: ['settings', 'view'], fn: aiStatus_ },
    aiTestKey:      { perm: ['settings', 'update'], fn: aiTestKey_ },
    aiListModels:   { perm: ['settings', 'update'], fn: aiListModels_ },
    aiSaveKey:      { perm: ['settings', 'update'], fn: aiSaveKey_ }
  };
}
function api(action, token, payload) {
  try {
    var route = routes_()[action];
    if (!route) throw err_('NOT_FOUND', 'Không có chức năng: ' + action);
    var ctx = null;
    if (!route.pub) {
      ctx = requireSession_(token);
      if (route.perm) need_(ctx, route.perm[0], route.perm[1]);
    }
    var data = route.fn(ctx, payload || {}, token);
    return { ok: true, data: data === undefined ? {} : data, message: '', serverVersion: getServerVersion_() };
  } catch (e) {
    if (!e.code) console.error(action, e && e.stack);
    return { ok: false, errorCode: e.code || 'UNKNOWN_ERROR',
             message: e.code ? e.message : 'Lỗi hệ thống: ' + (e.message || e), details: e.details || {} };
  }
}
