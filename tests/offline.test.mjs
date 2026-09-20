import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { readFile } from 'node:fs/promises';

const template = await readFile(new URL('../scripts/sw-template.js', import.meta.url), 'utf8');
const scope = 'https://booth.example/event/';
const files = ['./index.html', './assets/img/Sub%20Menu.webp', './assets/audio/quiz.mp3'];
function harness() {
  const handlers = {};
  const stores = new Map();
  const messages = [];
  let offline = false;
  let failURL;
  let fetches = 0;
  let claimed = false;
  const key = value => typeof value === 'string' ? value : value.url;
  const caches = {
    async open(name) {
      if (!stores.has(name)) stores.set(name, new Map());
      const entries = stores.get(name);
      return {
        async match(request) { return entries.get(key(request))?.clone(); },
        async put(request, response) { entries.set(key(request), response.clone()); },
        async keys() { return [...entries.keys()].map(url => ({ url })); },
      };
    },
    async keys() { return [...stores.keys()]; },
    async delete(name) { return stores.delete(name); },
  };
  const self = {
    registration: { scope },
    clients: {
      async matchAll() { return [{ url: scope, postMessage: value => messages.push(value) }]; },
      async claim() { claimed = true; },
    },
    addEventListener(type, callback) { handlers[type] = callback; },
  };
  vm.runInNewContext(`const VERSION = 'test'; const ASSETS = ${JSON.stringify(files.map(url => ({ url })))};\n${template}`, {
    self, caches, URL, Request, Response, Headers,
    fetch: async request => {
      fetches++;
      if (offline || request.url === failURL) throw new Error('network down');
      return new Response(request.url.endsWith('.mp3') ? '0123456789' : request.url);
    },
  });
  return {
    stores, messages, caches,
    get fetches() { return fetches; },
    get claimed() { return claimed; },
    set offline(value) { offline = value; },
    set failURL(value) { failURL = value; },
    run(type, extra = {}) {
      let result;
      handlers[type]({ ...extra, waitUntil(promise) { result = promise; }, respondWith(promise) { result = promise; } });
      return result;
    },
    request(relative, options = {}) {
      return { url: new URL(relative, scope).href, method: 'GET', mode: 'cors', headers: new Headers(), ...options };
    },
  };
}

test('precache covers unopened assets and serves deep links offline under a subfolder', async () => {
  const h = harness();
  await h.run('install');
  await h.run('activate');
  assert.ok(h.claimed);
  h.offline = true;
  const before = h.fetches;
  for (const page of ['./?tab=quiz', './index.html?tab=MASMD2']) {
    const response = await h.run('fetch', { request: h.request(page, { mode: 'navigate' }) });
    assert.equal(await response.text(), scope + 'index.html');
  }
  const image = await h.run('fetch', { request: h.request('./assets/img/Sub%20Menu.webp?test=1') });
  assert.equal(image.status, 200);
  assert.equal(h.fetches, before, 'cached requests must never wait for network');
  assert.equal(h.run('fetch', { request: h.request('./missing', { mode: 'navigate' }) }), undefined);
  assert.equal(h.run('fetch', { request: h.request('https://external.example/image.png') }), undefined);
  assert.equal(h.run('fetch', { request: h.request('./index.html', { method: 'POST' }) }), undefined);
});

test('media supports byte ranges, suffixes and unsatisfiable ranges offline', async () => {
  const h = harness();
  await h.run('install');
  h.offline = true;
  for (const [range, expected] of [['bytes=2-5', '2345'], ['bytes=7-', '789'], ['bytes=-3', '789']]) {
    const response = await h.run('fetch', { request: h.request('./assets/audio/quiz.mp3', { headers: new Headers({ Range: range }) }) });
    assert.equal(response.status, 206);
    assert.equal(await response.text(), expected);
    assert.equal(Number(response.headers.get('Content-Length')), expected.length);
  }
  const response = await h.run('fetch', { request: h.request('./assets/audio/quiz.mp3', { headers: new Headers({ Range: 'bytes=20-' }) }) });
  assert.equal(response.status, 416);
  assert.equal(response.headers.get('Content-Range'), 'bytes */10');
});

test('failed install preserves old cache and resumes completed downloads on retry', async () => {
  const h = harness();
  const old = `cbfest:${scope}:old`;
  await h.caches.open(old);
  h.failURL = scope + 'assets/audio/quiz.mp3';
  await assert.rejects(h.run('install'), /network down/);
  assert.ok(h.stores.has(old));
  assert.equal(h.messages.at(-1).state, 'error');
  const before = h.fetches;
  h.failURL = undefined;
  await h.run('install');
  assert.equal(h.fetches - before, 1);
  await h.caches.open('another-app-cache');
  await h.caches.open('cbfest:https://booth.example/other/:old');
  await h.run('activate');
  assert.ok(!h.stores.has(old));
  assert.ok(h.stores.has('another-app-cache'));
  assert.ok(h.stores.has('cbfest:https://booth.example/other/:old'));
});

test('status checks stored entries and detects evicted cache after activation', async () => {
  const h = harness();
  await h.run('install');
  await h.run('activate');
  const replies = [];
  const event = { data: { type: 'BOOTH_CACHE_STATUS' }, source: { postMessage: message => replies.push(message) } };
  await h.run('message', event);
  assert.equal(replies.at(-1).state, 'ready');
  h.stores.get(`cbfest:${scope}:test`).delete(scope + 'index.html');
  await h.run('message', event);
  assert.equal(replies.at(-1).state, 'error');
  const before = h.fetches;
  await h.run('message', { data: { type: 'BOOTH_CACHE_REPAIR' } });
  assert.equal(h.fetches - before, 1);
  await h.run('message', event);
  assert.equal(replies.at(-1).state, 'ready');
});
