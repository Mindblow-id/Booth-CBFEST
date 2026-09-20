// VERSION and ASSETS are inserted by the generator.
const PREFIX = `cbfest:${self.registration.scope}:`;
const CACHE = PREFIX + VERSION;
const absolute = path => new URL(path, self.registration.scope).href;
const INDEX = absolute('./index.html');
const URLS = new Set(ASSETS.map(asset => absolute(asset.url)));
let progress = null;

async function broadcast(message) {
  const clients = await self.clients.matchAll({ includeUncontrolled: true, type: 'window' });
  clients.filter(client => client.url.startsWith(self.registration.scope))
    .forEach(client => client.postMessage({ type: 'BOOTH_CACHE', ...message }));
}

let preparing;
function prepareCache() {
  if (preparing) return preparing;
  preparing = (async () => {
    const cache = await caches.open(CACHE);
    const queue = [...ASSETS];
    progress = { state: 'downloading', completed: 0, total: ASSETS.length };
    let failure;
    // Limit concurrent downloads; retain verified partial downloads for retries.
    await Promise.all(Array.from({ length: 4 }, async () => {
      while (queue.length && !failure) {
        const asset = queue.shift();
        try {
          const url = absolute(asset.url);
          if (!await cache.match(url)) {
            const response = await fetch(new Request(url, {
              cache: 'reload', integrity: asset.integrity, credentials: 'same-origin',
            }));
            if (!response.ok || response.status === 206) throw new Error(`HTTP ${response.status}: ${asset.url}`);
            await cache.put(url, response);
          }
          progress.completed++;
          await broadcast(progress);
        } catch (error) {
          failure = error;
        }
      }
    }));
    if (failure) {
      progress = { state: 'error' };
      await broadcast(progress);
      throw failure;
    }
    // Updates wait until all old tabs close, avoiding mixed versions during a game.
    progress = { state: 'installed' };
    await broadcast(progress);
  })().finally(() => { preparing = null; });
  return preparing;
}

self.addEventListener('install', event => {
  event.waitUntil(prepareCache());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(names.filter(name => name.startsWith(PREFIX) && name !== CACHE)
      .map(name => caches.delete(name)));
    await self.clients.claim();
    await broadcast({ state: 'ready' });
  })());
});

self.addEventListener('message', event => {
  if (event.data?.type === 'BOOTH_CACHE_REPAIR') {
    event.waitUntil(prepareCache().then(() => broadcast({ state: 'ready' })).catch(() => {}));
    return;
  }
  if (event.data?.type !== 'BOOTH_CACHE_STATUS') return;
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    const keys = new Set((await cache.keys()).map(request => request.url));
    const complete = [...URLS].every(url => keys.has(url));
    event.source?.postMessage({
      type: 'BOOTH_CACHE',
      ...(complete ? { state: 'ready' } : progress?.state === 'downloading' ? progress : { state: 'error' }),
    });
  })());
});

async function rangedResponse(response, range) {
  const blob = await response.blob();
  const match = /^bytes=(\d*)-(\d*)$/.exec(range);
  // Unsupported multipart ranges can legally receive the entire representation.
  if (!match || (!match[1] && !match[2])) return new Response(blob, { headers: response.headers });
  const size = blob.size;
  const start = match[1] ? Number(match[1]) : Math.max(0, size - Number(match[2]));
  const end = match[1] && match[2] ? Math.min(Number(match[2]), size - 1) : size - 1;
  if (start >= size || start > end) {
    return new Response(null, { status: 416, headers: { 'Content-Range': `bytes */${size}` } });
  }
  const headers = new Headers(response.headers);
  headers.delete('Content-Encoding');
  headers.set('Accept-Ranges', 'bytes');
  headers.set('Content-Range', `bytes ${start}-${end}/${size}`);
  headers.set('Content-Length', String(end - start + 1));
  return new Response(blob.slice(start, end + 1), { status: 206, headers });
}

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  const home = absolute('./');
  const cleanURL = url.origin + url.pathname;
  const isPage = request.mode === 'navigate' && (cleanURL === home || cleanURL === INDEX);
  if (!isPage && !URLS.has(cleanURL)) return;
  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    const cached = await cache.match(isPage ? INDEX : cleanURL);
    if (cached) {
      const range = request.headers.get('Range');
      return range ? rangedResponse(cached, range) : cached;
    }
    // Never turn an uncached image/API/unknown route into an HTML response.
    return fetch(request);
  })());
});
