/**
 * SoulSync – Comprehensive API Test Suite
 * Run: node test-api.js
 * Tests every backend endpoint against the live Render deployment.
 */

require('dotenv').config({ path: './backend/.env' });
const https = require('https');

const BASE_URL = 'https://soulsync-api-m84h.onrender.com/api/v1';

// ─── helpers ─────────────────────────────────────────────────────────────────

const request = (method, path, body = null, token = null) =>
  new Promise((resolve) => {
    const url = new URL(BASE_URL + path);
    const payload = body ? JSON.stringify(body) : null;
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;
    if (payload) headers['Content-Length'] = Buffer.byteLength(payload);

    const req = https.request(
      { hostname: url.hostname, path: url.pathname + url.search, method, headers },
      (res) => {
        let raw = '';
        res.on('data', (c) => (raw += c));
        res.on('end', () => {
          let json;
          try { json = JSON.parse(raw); } catch { json = { raw }; }
          resolve({ status: res.statusCode, body: json });
        });
      }
    );
    req.on('error', (e) => resolve({ status: 0, body: { error: e.message } }));
    if (payload) req.write(payload);
    req.end();
  });

// ─── test runner ─────────────────────────────────────────────────────────────

const results = [];
let pass = 0, fail = 0;

async function test(name, fn) {
  try {
    const { status, body, note } = await fn();
    const ok = status >= 200 && status < 300;
    const icon = ok ? '✅' : '❌';
    const info = note || '';
    console.log(`${icon} [${status}] ${name}${info ? '  (' + info + ')' : ''}`);
    if (!ok) console.log('   body:', JSON.stringify(body).slice(0, 200));
    ok ? pass++ : fail++;
    results.push({ name, status, ok });
  } catch (err) {
    console.log(`💥 ${name} – THREW: ${err.message}`);
    fail++;
    results.push({ name, status: 0, ok: false });
  }
}

// ─── state shared between tests ───────────────────────────────────────────────

const TS     = Date.now();
const EMAIL  = `apitest_${TS}@soulsync.test`;
const PASS   = 'SoulSync@Test123!';
const UNAME  = `apitest${TS}`;

let accessToken  = null;
let refreshToken = null;
let userId       = null;
let coupleId     = null;
let memoryId     = null;
let letterId     = null;
let questionId   = null;
let answerId     = null;
let moodId       = null;
let notifId      = null;
let saySomethingId = null;
let inviteCode   = null;

// ─── test suites ─────────────────────────────────────────────────────────────

(async () => {
  console.log('\n═══════════════════════════════════════════════');
  console.log('   SoulSync API Test Suite – ' + new Date().toLocaleTimeString());
  console.log('   Target: ' + BASE_URL);
  console.log('═══════════════════════════════════════════════\n');

  // ── HEALTH ──────────────────────────────────────────────────────────────────
  console.log('── Health ──────────────────────────────────────');

  await test('GET /health', async () => {
    const r = await request('GET', '/health');
    return r;
  });

  // ── AUTH ─────────────────────────────────────────────────────────────────────
  console.log('\n── Auth ────────────────────────────────────────');

  await test('POST /auth/register', async () => {
    const r = await request('POST', '/auth/register', {
      first_name: 'Api', last_name: 'Tester',
      username: UNAME, email: EMAIL, password: PASS,
    });
    if (r.body?.data) {
      accessToken  = r.body.data.accessToken;
      refreshToken = r.body.data.refreshToken;
      userId       = r.body.data.user?.id;
    }
    return r;
  });

  await test('POST /auth/login', async () => {
    const r = await request('POST', '/auth/login', { email: EMAIL, password: PASS });
    if (r.body?.data) {
      accessToken  = r.body.data.accessToken;
      refreshToken = r.body.data.refreshToken;
      userId       = r.body.data.user?.id;
    }
    return r;
  });

  await test('GET /auth/me', async () => request('GET', '/auth/me', null, accessToken));

  await test('POST /auth/refresh', async () => {
    const r = await request('POST', '/auth/refresh', { refreshToken });
    if (r.body?.data) {
      accessToken  = r.body.data.accessToken;
      refreshToken = r.body.data.refreshToken;
    }
    return r;
  });

  await test('POST /auth/register – duplicate email (expect 409)', async () => {
    const r = await request('POST', '/auth/register', {
      first_name: 'Dup', last_name: 'User',
      username: UNAME + '_2', email: EMAIL, password: PASS,
    });
    return { status: r.status === 409 ? 200 : 500, body: r.body, note: `got ${r.status}` };
  });

  await test('POST /auth/login – wrong password (expect 401)', async () => {
    const r = await request('POST', '/auth/login', { email: EMAIL, password: 'wrongpass' });
    return { status: r.status === 401 ? 200 : 500, body: r.body, note: `got ${r.status}` };
  });

  // ── PROFILE ──────────────────────────────────────────────────────────────────
  console.log('\n── Profile ─────────────────────────────────────');

  await test('GET /profile', async () => request('GET', '/profile', null, accessToken));

  await test('PUT /profile', async () =>
    request('PUT', '/profile', { first_name: 'Updated', last_name: 'Tester' }, accessToken)
  );

  await test('PUT /profile/password', async () =>
    request('PUT', '/profile/password', { current_password: PASS, new_password: PASS }, accessToken)
  );

  // ── QUESTIONS ────────────────────────────────────────────────────────────────
  console.log('\n── Questions ───────────────────────────────────');

  await test('GET /questions', async () => {
    const r = await request('GET', '/questions', null, accessToken);
    if (r.body?.data?.length > 0) questionId = r.body.data[0].id;
    return { ...r, note: `count=${r.body?.data?.length ?? 0}` };
  });

  await test('GET /questions/daily/romantic', async () => {
    const r = await request('GET', '/questions/daily/romantic', null, accessToken);
    if (!questionId && r.body?.data?.question?.id) questionId = r.body.data.question.id;
    return r;
  });

  await test('GET /questions/daily/happy', async () =>
    request('GET', '/questions/daily/happy', null, accessToken)
  );

  await test('GET /questions/daily/sad', async () =>
    request('GET', '/questions/daily/sad', null, accessToken)
  );

  await test('GET /questions/mood/funny', async () =>
    request('GET', '/questions/mood/funny', null, accessToken)
  );

  if (questionId) {
    await test('GET /questions/:id', async () =>
      request('GET', `/questions/${questionId}`, null, accessToken)
    );
  }

  // ── MOODS ────────────────────────────────────────────────────────────────────
  console.log('\n── Moods ───────────────────────────────────────');

  await test('POST /moods', async () => {
    const r = await request('POST', '/moods',
      { mood_type: 'romantic', note: 'Feeling romantic today 💕' }, accessToken
    );
    if (r.body?.data?.id) moodId = r.body.data.id;
    return r;
  });

  await test('GET /moods/history', async () =>
    request('GET', '/moods/history', null, accessToken)
  );

  // ── COUPLE INVITATIONS ───────────────────────────────────────────────────────
  console.log('\n── Couple Invitations ──────────────────────────');

  await test('GET /couple-invitations/sent', async () =>
    request('GET', '/couple-invitations/sent', null, accessToken)
  );

  await test('GET /couple-invitations/received', async () =>
    request('GET', '/couple-invitations/received', null, accessToken)
  );

  // ── NOTIFICATIONS ────────────────────────────────────────────────────────────
  console.log('\n── Notifications ───────────────────────────────');

  await test('GET /notifications', async () => {
    const r = await request('GET', '/notifications', null, accessToken);
    if (r.body?.data?.length > 0) notifId = r.body.data[0].id;
    return { ...r, note: `count=${r.body?.data?.length ?? 0}` };
  });

  await test('PATCH /notifications/read-all', async () =>
    request('PATCH', '/notifications/read-all', null, accessToken)
  );

  // ── DASHBOARD ────────────────────────────────────────────────────────────────
  console.log('\n── Dashboard ───────────────────────────────────');

  await test('GET /dashboard', async () =>
    request('GET', '/dashboard', null, accessToken)
  );

  await test('GET /dashboard/stats', async () =>
    request('GET', '/dashboard/stats', null, accessToken)
  );

  await test('GET /dashboard/activity', async () =>
    request('GET', '/dashboard/activity', null, accessToken)
  );

  // ── TIMELINE ─────────────────────────────────────────────────────────────────
  console.log('\n── Timeline ────────────────────────────────────');

  await test('GET /timeline', async () =>
    request('GET', '/timeline', null, accessToken)
  );

  // ── LETTERS ──────────────────────────────────────────────────────────────────
  console.log('\n── Letters ─────────────────────────────────────');

  await test('POST /letters', async () => {
    const r = await request('POST', '/letters', {
      title: 'My First Letter 💌',
      content: 'This is a test love letter.',
      recipient_id: userId,
    }, accessToken);
    if (r.body?.data?.id) letterId = r.body.data.id;
    return r;
  });

  await test('GET /letters', async () =>
    request('GET', '/letters', null, accessToken)
  );

  if (letterId) {
    await test('GET /letters/:id', async () =>
      request('GET', `/letters/${letterId}`, null, accessToken)
    );
    await test('PUT /letters/:id', async () =>
      request('PUT', `/letters/${letterId}`, { title: 'Updated Letter', content: 'Updated content.' }, accessToken)
    );
    await test('DELETE /letters/:id', async () =>
      request('DELETE', `/letters/${letterId}`, null, accessToken)
    );
  }

  // ── MEMORIES (couple-required) ───────────────────────────────────────────────
  console.log('\n── Memories (no couple – expect 4xx) ──────────');

  await test('POST /memories (no couple – expect 4xx)', async () => {
    const r = await request('POST', '/memories', {
      title: 'Test Memory', description: 'Test', memory_date: '2026-01-01',
    }, accessToken);
    return { status: r.status >= 400 && r.status < 500 ? 200 : r.status, body: r.body, note: `got ${r.status}` };
  });

  // ── ANSWERS (no couple) ──────────────────────────────────────────────────────
  console.log('\n── Answers ─────────────────────────────────────');

  await test('GET /answers/my-answers', async () =>
    request('GET', '/answers/my-answers', null, accessToken)
  );

  if (questionId) {
    await test('POST /answers/question/:id', async () => {
      const r = await request('POST', `/answers/question/${questionId}`,
        { content: 'This is my test answer 💕' }, accessToken
      );
      if (r.body?.data?.id) answerId = r.body.data.id;
      return r;
    });

    await test('GET /answers/my/:questionId', async () =>
      request('GET', `/answers/my/${questionId}`, null, accessToken)
    );
  }

  if (answerId) {
    await test('PUT /answers/:id', async () =>
      request('PUT', `/answers/${answerId}`, { content: 'Updated answer content' }, accessToken)
    );
    await test('GET /answers/:id', async () =>
      request('GET', `/answers/${answerId}`, null, accessToken)
    );
    await test('DELETE /answers/:id', async () =>
      request('DELETE', `/answers/${answerId}`, null, accessToken)
    );
  }

  // ── LOGOUT ───────────────────────────────────────────────────────────────────
  console.log('\n── Auth Cleanup ────────────────────────────────');

  await test('POST /auth/logout', async () =>
    request('POST', '/auth/logout', { refreshToken }, accessToken)
  );

  // ── SUMMARY ──────────────────────────────────────────────────────────────────
  console.log('\n═══════════════════════════════════════════════');
  console.log(`   Results: ${pass} passed  |  ${fail} failed  |  ${pass + fail} total`);
  console.log('═══════════════════════════════════════════════\n');

  if (fail > 0) {
    console.log('Failed tests:');
    results.filter(r => !r.ok).forEach(r => console.log(`  ❌ [${r.status}] ${r.name}`));
    console.log('');
  }
})();
