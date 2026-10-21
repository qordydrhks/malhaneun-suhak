/* 새 앱 — 바탕(서버·저장·AI·시간). 옛 앱 dodream.html 과 같은 Supabase·AI 서버를 쓴다.
   같은 주소(github.io) 아래라 로그인(dd:autoLogin)·학원 기기(dd:academyDevice)·친구(dd:char:)가 옛 앱과 함께 쓰인다. */
(() => {
  'use strict';
  const A = window.APP = window.APP || {};
  A.VERSION = 'app 0.18.3 (2026-10-20)';
  const URL = 'https://cnyrbxsmxwajhlrvcdml.supabase.co';
  const KEY = 'sb_publishable_e2iVXV5K1sl7-kJ-d3v1Ow_VEzNUJGv';
  A.esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[c]));
  A.fm = t => (typeof window.mfmt === 'function' ? window.mfmt(String(t ?? '')) : A.esc(t));
  A.ls = {
    get(k, d) { try { const v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} },
    del(k) { try { localStorage.removeItem(k); } catch (e) {} },
    raw(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  };

  // ── 서버 ──
  const H = extra => Object.assign({apikey: KEY, Authorization: 'Bearer ' + KEY, 'Content-Type': 'application/json'}, extra || {});
  async function sb(path, opts) {
    const res = await fetch(URL + '/rest/v1/' + path, opts);
    if (!res.ok) { const t = await res.text().catch(() => ''); const e = new Error('DB 오류(' + res.status + ') ' + t.slice(0, 160)); e.body = t; throw e; }
    const txt = await res.text(); return txt ? JSON.parse(txt) : null;
  }
  A.sbSelect = (t, q) => sb(t + (q ? '?' + q : ''), {headers: H()});
  A.sbInsert = (t, row) => sb(t, {method: 'POST', headers: H({Prefer: 'return=minimal'}), body: JSON.stringify(row)});
  A.sbDelete = (t, q) => sb(t + '?' + q, {method: 'DELETE', headers: H({Prefer: 'return=minimal'})});
  A.sbUpsert = (t, row) => sb(t, {method: 'POST', headers: H({Prefer: 'resolution=merge-duplicates,return=minimal'}), body: JSON.stringify(row)});

  // 공유 저장소(ai_cache) — 다른 기기에서도 이어지게. 서버가 안 되면 이 기기에만.
  A.store = {
    async get(key) {
      try { const r = await A.sbSelect('ai_cache', 'key=eq.' + encodeURIComponent(key) + '&select=value&limit=1'); if (r && r.length) return r[0].value; } catch (e) {}
      return A.ls.get('dd:' + key, null);
    },
    async set(key, value) {
      A.ls.set('dd:' + key, value);
      try { await A.sbUpsert('ai_cache', {key, value}); return true; } catch (e) { return false; }
    }
  };

  A.sha256 = async text => Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text)))).map(b => b.toString(16).padStart(2, '0')).join('');

  // ── 학생 ──
  A.session = {student: null};
  A.loadStudents = async () => ((await A.sbSelect('students', 'select=id,name,grade,pin_hash&order=created_at.asc')) || []);
  A.login = async (name, pw) => {
    const all = await A.loadStudents();
    const s = all.find(x => x.name === name.trim());
    if (!s) throw new Error('등록되지 않은 이름이에요. 선생님께 말씀해 주세요.');
    if ((await A.sha256(pw)) !== s.pin_hash) throw new Error('비밀번호가 맞지 않아요.');
    A.session.student = {id: s.id, name: s.name, grade: s.grade || ''};
    A.ls.set('dd:autoLogin', {id: s.id, name: s.name});
    return A.session.student;
  };
  A.autoLogin = async () => {
    const saved = A.ls.get('dd:autoLogin', null); if (!saved || !saved.id) return null;
    const all = await A.loadStudents(); const s = all.find(x => x.id === saved.id); if (!s) return null;
    return (A.session.student = {id: s.id, name: s.name, grade: s.grade || ''});
  };
  A.logout = () => { A.ls.del('dd:autoLogin'); A.session.student = null; document.getElementById('sclock')?.remove(); try { sessionStorage.removeItem('app:sessionStart'); } catch (e) {} };
  A.checkPin = async v => { const saved = await A.store.get('config:teacherPin'); const want = saved && saved.hash ? saved.hash : await A.sha256('0000'); return (await A.sha256(String(v || ''))) === want; };
  /* 음성 인식 자동 교정 — 옛 앱 window.fixMathSpeech 와 같은 표(실제 단어가 아닌 오인식만). 필요하면 여기에 추가 */
  A.fixSpeech = text => {
    if (!text) return text;
    let s = ' ' + text + ' ';
    const map = {'바다올림': '받아올림', '바다 올림': '받아올림', '받아 올림': '받아올림', '바다내림': '받아내림', '바다 내림': '받아내림', '받아 내림': '받아내림',
      '분보': '분모', '곰셈': '곱셈', '곱 셈': '곱셈', '나누셈': '나눗셈', '나눈셈': '나눗셈', '나눗 셈': '나눗셈',
      '지각삼각형': '직각삼각형', '직각 삼각형': '직각삼각형', '정 사각형': '정사각형', '직 사각형': '직사각형'};
    for (const k in map) s = s.split(k).join(map[k]);
    return s.replace(/\s+/g, ' ').trim();
  };
  A.isTester = () => /테스트/.test(A.session.student?.name || '');
  /* 과정(학기) — 마스터 10/19 「5학년도 앱에서 테스트」. 데이터 파일이 들어온 과정(window.APP_DATA)만.
     학생의 학년(초5 → e5-2)으로 정하고, 시험 학생('테스트')은 홈에서 바꿀 수 있다(고른 것은 이 기기에 기억). */
  A.courses = () => Object.keys(window.APP_DATA || {}).sort();
  A.cid = () => A.session.cid || 'e4-2';
  A.courseFor = st => {
    const L = A.courses(), saved = st && A.ls.raw('app:course:' + st.id);
    if (saved && L.includes(saved) && A.isTester()) return saved;
    const m = /(\d)/.exec((st && st.grade) || ''), g = m ? 'e' + m[1] + '-2' : '';
    return L.includes(g) ? g : (L.includes('e4-2') ? 'e4-2' : L[0]);
  };
  A.setCourse = id => { A.session.cid = id; try { localStorage.setItem('app:course:' + A.session.student.id, id); } catch (e) {} };
  A.gradeNo = () => (/e(\d)/.exec(A.cid()) || [0, 4])[1];
  A.isAcademyDevice = () => A.ls.raw('dd:academyDevice') === '1';

  // ── AI (서버 중계만 — 키는 서버에) ──
  A.ai = async (payload) => {
    const st = A.session.student;
    const body = {task: payload.task || 'grade', system: payload.system || '', messages: payload.messages || [], max_tokens: payload.max_tokens || 900,
                  student_id: st ? st.id : null, grade_id: payload.grade_id || null, unit_id: payload.unit_id ?? null};
    let res;
    try { res = await fetch(URL + '/functions/v1/ai', {method: 'POST', headers: {'Content-Type': 'application/json', apikey: KEY}, body: JSON.stringify(body)}); }
    catch (e) { throw new Error('AI 서버에 연결하지 못했어요. 인터넷을 확인해 줘.'); }
    let data = null; try { data = await res.json(); } catch (e) {}
    if (!res.ok) throw new Error((data && data.error && data.error.message) || ('AI 서버 오류 (' + res.status + ')'));
    const text = (data && Array.isArray(data.content)) ? data.content.map(b => b.text || '').join('') : (data && (data.text || data.output) || '');
    return String(text).trim();
  };

  // ── 시간: 하루는 새벽 4시에 바뀐다(마스터 10/8) ──
  A.dayKey = (t) => { const d = new Date((t || Date.now()) - 4 * 3600e3); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); };
  A.today = () => A.dayKey(Date.now());
})();
