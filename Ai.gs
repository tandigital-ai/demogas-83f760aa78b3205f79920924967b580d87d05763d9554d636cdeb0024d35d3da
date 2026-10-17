/** EduClass AI — Ai_.gs: Gemini (key chính + dự phòng, test key, chọn model, hạn mức) */
var GEMINI_BASE = 'https://generativelanguage.googleapis.com/v1beta/';
var KEY_PROPS = { primary: 'GEMINI_API_KEY', backup: 'GEMINI_API_KEY_BACKUP' };

function geminiFetch_(key, path, body) {
  var opt = { method: body ? 'post' : 'get', headers: { 'x-goog-api-key': key }, muteHttpExceptions: true };
  if (body) { opt.contentType = 'application/json'; opt.payload = JSON.stringify(body); }
  var res = UrlFetchApp.fetch(GEMINI_BASE + path, opt), json = {};
  try { json = JSON.parse(res.getContentText()); } catch (e) { json = {}; }
  return { code: res.getResponseCode(), json: json };
}
function explainGeminiError_(r) {
  var raw = JSON.stringify(r.json.error || {}), msg = (r.json.error && r.json.error.message) || '';
  if (r.code === 400 && /API_KEY_INVALID|API key not valid/i.test(raw)) return 'API key không hợp lệ (gõ sai hoặc key đã bị xóa).';
  if (r.code === 401 || r.code === 403) return 'Google từ chối key. Có thể đây là key "Standard" cũ đã ngừng hỗ trợ, key bị chặn do lâu không dùng, hoặc key bị giới hạn sai API. Hãy tạo key mới tại aistudio.google.com/api-keys. (' + msg + ')';
  if (r.code === 404) return 'Model không tồn tại hoặc key không dùng được model này. Bấm "Tải danh sách model" để chọn lại.';
  if (r.code === 429) return 'Key đã hết hạn mức (quota) của Google. Thử lại sau hoặc dùng key khác.';
  if (r.code >= 500) return 'Máy chủ Gemini đang lỗi tạm thời, thử lại sau ít phút.';
  return 'Lỗi Gemini ' + r.code + ': ' + msg;
}
function keyFor_(which) { return PropertiesService.getScriptProperties().getProperty(KEY_PROPS[which] || KEY_PROPS.primary) || ''; }
function maskKey_(k) { return k ? k.substring(0, 4) + '••••••' + k.substring(k.length - 4) : ''; }
function cleanModel_(m) {
  m = String(m || '').replace(/^models\//, '').trim();
  if (!/^[a-z0-9][a-z0-9.\-]{2,80}$/i.test(m)) throw err_('VALIDATION_ERROR', 'Tên model không hợp lệ');
  return m;
}
function aiStatus_(ctx) {
  var s = getSettings_();
  return { model: s.AI_MODEL, enabled: s.AI_ENABLED, primary: maskKey_(keyFor_('primary')),
           backup: maskKey_(keyFor_('backup')), quota: getAiQuota_(ctx.user) };
}
function testKeyRaw_(key, model) {
  var t = Date.now();
  var r = geminiFetch_(key, 'models/' + model + ':generateContent', {
    contents: [{ role: 'user', parts: [{ text: 'Chỉ trả lời đúng một từ: OK' }] }],
    generationConfig: { temperature: 0, maxOutputTokens: 512 }
  });
  if (r.code !== 200) throw err_('AI_ERROR', explainGeminiError_(r), { httpCode: r.code });
  return { ok: true, model: model, latencyMs: Date.now() - t };
}
/** Test key: key mới gõ vào (p.key) hoặc key đã lưu (p.which) */
function aiTestKey_(ctx, p) {
  var key = p.key ? String(p.key).trim() : keyFor_(p.which);
  if (!key) throw err_('VALIDATION_ERROR', 'Chưa có key để test');
  return testKeyRaw_(key, cleanModel_(p.model || getSettings_().AI_MODEL));
}
/** Lấy danh sách model mà key dùng được (chỉ model tạo văn bản) */
function aiListModels_(ctx, p) {
  var key = p.key ? String(p.key).trim() : (keyFor_('primary') || keyFor_('backup'));
  if (!key) throw err_('VALIDATION_ERROR', 'Hãy lưu key trước');
  var r = geminiFetch_(key, 'models?pageSize=1000');
  if (r.code !== 200) throw err_('AI_ERROR', explainGeminiError_(r), { httpCode: r.code });
  var list = (r.json.models || []).filter(function (m) {
    var id = String(m.name || '').replace('models/', '');
    return (m.supportedGenerationMethods || []).indexOf('generateContent') > -1 && /^gemini/.test(id)
      && !/tts|image|live|audio|embedding|robotics|transcribe|banana/i.test(id);
  }).map(function (m) {
    return { id: m.name.replace('models/', ''), name: m.displayName || m.name, input: m.inputTokenLimit || '' };
  });
  list.sort(function (a, b) { return a.id < b.id ? 1 : -1; });
  return { models: list };
}
/** Lưu key: test trước, đạt mới lưu. remove=true để xóa key dự phòng */
function aiSaveKey_(ctx, p) {
  var which = p.which === 'backup' ? 'backup' : 'primary', props = PropertiesService.getScriptProperties();
  if (p.remove) {
    if (which === 'primary') throw err_('VALIDATION_ERROR', 'Không xóa key chính, hãy thay bằng key mới');
    props.deleteProperty(KEY_PROPS.backup);
  } else {
    var key = String(p.key || '').trim();
    if (key.length < 20) throw err_('VALIDATION_ERROR', 'Key quá ngắn, hãy dán đầy đủ');
    testKeyRaw_(key, cleanModel_(p.model || getSettings_().AI_MODEL));
    props.setProperty(KEY_PROPS[which], key);
  }
  writeAudit_(ctx.email, p.remove ? 'AI_KEY_REMOVE' : 'AI_KEY_SAVE', 'Settings', KEY_PROPS[which], null, { key: p.remove ? '' : maskKey_(String(p.key)) });
  return aiStatus_(ctx);
}
/* ---------- Hạn mức lượt AI/ngày ---------- */
function getAiLimit_(user) {
  var s = getSettings_();
  if (user.aiDailyLimit !== '' && user.aiDailyLimit !== null && user.aiDailyLimit !== undefined) return Number(user.aiDailyLimit);
  var byRole = s['AI_LIMIT_' + user.role];
  return byRole !== undefined && byRole !== '' ? Number(byRole) : Number(s.AI_LIMIT_DEFAULT || 0);
}
function usageCount_(key) {
  var row = findRow_('AiUsage', 'usageKey', key);
  return row > 0 ? (Number(getRowObj_('AiUsage', row).count) || 0) : 0;
}
function getAiQuota_(user) {
  return { used: usageCount_(user.userId + '|' + dateStr_()), limit: getAiLimit_(user) };
}
function incUsage_(key, userId) {
  var row = findRow_('AiUsage', 'usageKey', key);
  if (row > 0) {
    setCell_('AiUsage', row, 'count', (Number(getRowObj_('AiUsage', row).count) || 0) + 1);
    setCell_('AiUsage', row, 'updatedAt', nowIso_());
  } else {
    appendObjects_('AiUsage', [{ usageKey: key, userId: userId, date: dateStr_(), count: 1, updatedAt: nowIso_() }]);
  }
}
/** Hàm gọi AI dùng chung (Gói 7 sẽ dùng): kiểm hạn mức → key chính → dự phòng → ghi AiJobs */
function aiGenerate_(ctx, jobType, prompt, opts) {
  opts = opts || {};
  var s = getSettings_();
  if (!s.AI_ENABLED) throw err_('AI_ERROR', 'AI đang tắt trong Cài đặt');
  need_(ctx, 'ai', 'use');
  var day = dateStr_(), q = getAiQuota_(ctx.user);
  if (q.used >= q.limit) throw err_('QUOTA_LIMIT', 'Bạn đã dùng hết ' + q.limit + ' lượt AI hôm nay');
  if (usageCount_('CENTER|' + day) >= Number(s.AI_CENTER_DAILY_LIMIT || 0)) throw err_('QUOTA_LIMIT', 'Trung tâm đã hết lượt AI hôm nay');
  var model = cleanModel_(s.AI_MODEL), t = Date.now(), body = {
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
    generationConfig: { temperature: Number(s.AI_TEMPERATURE || 0.7), maxOutputTokens: opts.maxTokens || 4096 }
  };
  if (opts.json) body.generationConfig.responseMimeType = 'application/json';
  var r = null, keys = [keyFor_('primary'), keyFor_('backup')].filter(String);
  if (!keys.length) throw err_('AI_ERROR', 'Chưa cấu hình API key');
  for (var i = 0; i < keys.length; i++) {
    r = geminiFetch_(keys[i], 'models/' + model + ':generateContent', body);
    if (r.code === 200 || [401, 403, 429].indexOf(r.code) < 0) break;
  }
  var text = '';
  try { text = r.json.candidates[0].content.parts.map(function (x) { return x.text || ''; }).join(''); } catch (e) { text = ''; }
  var ok = r.code === 200 && text;
  appendObjects_('AiJobs', [{ jobId: newId_('ai'), userId: ctx.user.userId, jobType: jobType,
    inputJson: prompt.substring(0, 5000), outputText: text.substring(0, 20000), status: ok ? 'OK' : 'ERROR',
    model: model, tokenEstimate: Math.round((prompt.length + text.length) / 4), durationMs: Date.now() - t,
    errorMessage: ok ? '' : explainGeminiError_(r), createdAt: nowIso_() }]);
  if (!ok) throw err_('AI_ERROR', r.code === 200 ? 'AI không trả về nội dung' : explainGeminiError_(r));
  var lock = LockService.getScriptLock(); lock.waitLock(10000);
  try { incUsage_(ctx.user.userId + '|' + day, ctx.user.userId); incUsage_('CENTER|' + day, 'CENTER'); }
  finally { lock.releaseLock(); }
  return { text: text, model: model, quota: getAiQuota_(ctx.user) };
}
