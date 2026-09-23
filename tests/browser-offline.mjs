// Run with PLAYWRIGHT_MODULE=/absolute/path/to/playwright/index.mjs if not installed locally.
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const root = fileURLToPath(new URL('../', import.meta.url));
const generatedWorker = await readFile(path.join(root, 'sw.js'), 'utf8');
const expectedAssets = JSON.parse(generatedWorker.match(/const ASSETS = ([\s\S]*?);\n/)[1]).length;
const mime = { '.js': 'text/javascript', '.html': 'text/html', '.css': 'text/css', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.jpg': 'image/jpeg', '.png': 'image/png', '.gif': 'image/gif', '.mp3': 'audio/mpeg', '.mp4': 'video/mp4', '.ttf': 'font/ttf', '.json': 'application/json' };
let failAudio = true;
let nextVersion = false;
const server = createServer(async (req, res) => {
  try {
    let file = decodeURIComponent(new URL(req.url, 'http://localhost').pathname).replace(/^\/event\//, '/');
    if (file === '/') file = '/index.html';
    if (file.includes('..')) throw new Error('invalid path');
    if (failAudio && file.endsWith('quiz.mp3')) { res.writeHead(503).end(); return; }
    let body = await readFile(path.join(root, file));
    if (nextVersion && file === '/sw.js') body = Buffer.from(body.toString().replace(/const VERSION = "[^"]+";/, 'const VERSION = "browser-update-test";'));
    res.writeHead(200, { 'Content-Type': mime[path.extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-cache' });
    res.end(body);
  } catch { res.writeHead(404).end(); }
});
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
let browser;
try {
  browser = await chromium.launch({ headless: true, executablePath: process.env.BROWSER_EXECUTABLE || undefined });
  const context = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
  const base = `http://127.0.0.1:${server.address().port}`;
  for (const prefix of ['/event/', '/']) {
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(base + prefix);
    if (failAudio) {
      failAudio = false;
      await page.reload();
    }
    await page.waitForFunction(() => document.querySelector('[role=status]')?.textContent === 'Siap offline', null, { timeout: 120000 });
    const cachedCount = await page.evaluate(async () => {
      const names = await caches.keys();
      const scope = (await navigator.serviceWorker.getRegistration()).scope;
      const name = names.find(name => name.startsWith(`cbfest:${scope}:`));
      return (await (await caches.open(name)).keys()).length;
    });
    assert.equal(cachedCount, expectedAssets);
    await context.setOffline(true);
    await page.reload();
    await page.waitForFunction(() => document.querySelector('[role=status]')?.textContent.includes('Siap offline'));
    if (prefix === '/event/') {
      await page.setViewportSize({ width: 1080, height: 1920 });
      await page.goto(base + prefix + '?tab=ETIBI');
      await page.locator('button[data-next="FMDD"]').click();
      assert.equal(new URL(page.url()).searchParams.get('tab'), 'FMDD');
      assert.equal(await page.locator('#content nav c-button').count(), 4);
      if (process.env.SCREENSHOT_DIR) {
        await page.screenshot({ path: path.join(process.env.SCREENSHOT_DIR, 'fmdd-menu.png'), fullPage: true });
      }
      const sections = [
        { id: 'FMDD-MFI', folder: 'market-financial-infrastructure', pages: 3, title: 'Market Financial Structure' },
        { id: 'FMDD-DERIVATIVE', folder: 'puva-derivative', pages: 5, title: 'PUVA Derivative' },
        { id: 'FMDD-VASTRA', folder: 'puva-vastra', pages: 2, title: 'PUVA Vastra' },
        { id: 'FMDD-TERMINOLOGY', folder: 'terminology-notes', pages: 3, title: 'Terminology Notes' },
      ];
      for (const section of sections) {
        await page.locator(`c-button[data-next="${section.id}1"]`).click();
        for (let number = 1; number <= section.pages; number++) {
          assert.equal(new URL(page.url()).searchParams.get('tab'), `${section.id}${number}`);
          assert.equal((await page.locator('#content h3').textContent()).replace(/\s+/g, ' ').trim(), section.title);
          assert.equal(await page.locator('#content h4').count(), 0);
          const filename = number === 1 ? 'table.png' : `table-${number - 1}.png`;
          const contentImage = page.locator(`#content img[src="assets/img/FMDD/${section.folder}/${filename}"]`);
          await contentImage.evaluate(img => img.decode());
          assert.equal(await page.evaluate(() => window.scrollY), 0);
          assert.ok(await page.locator('#content nav').evaluate(nav => nav.getBoundingClientRect().bottom <= innerHeight), `${section.id}${number}: pagination should fit the portrait booth screen`);
          if (number === 1 && process.env.SCREENSHOT_DIR) {
            await page.screenshot({ path: path.join(process.env.SCREENSHOT_DIR, `${section.id}.png`), fullPage: true });
          }
          if (number < section.pages) await page.locator(`c-button[data-next="${section.id}${number + 1}"]`).click();
        }
        assert.equal(await page.locator('#content nav c-button[data-next]').count(), 0);
        for (let number = section.pages - 1; number >= 1; number--) {
          await page.locator(`c-button[data-previous="${section.id}${number}"]`).click();
          assert.equal(new URL(page.url()).searchParams.get('tab'), `${section.id}${number}`);
        }
        await page.locator('c-button[data-previous="FMDD"]').click();
      }
      await page.goto(base + prefix + '?tab=FMDD-DERIVATIVE3');
      await page.reload();
      await page.locator('#content img[src$="puva-derivative/table-2.png"]').evaluate(img => img.decode());
      console.log('FMDD: ETIBI entry, four menus, all 13 image pages, forward/back navigation and direct reload passed offline.');

      await page.goto(base + prefix + '?tab=PSPD');
      for (let number = 1; number <= 5; number++) {
        const tab = number === 1 ? 'PSPD' : `PSPD${number - 1}`;
        const filename = number === 1 ? 'table.png' : `table-${number - 1}.png`;
        assert.equal(new URL(page.url()).searchParams.get('tab'), tab);
        assert.equal((await page.locator('#content h3').textContent()).replace(/\s+/g, ' ').trim(), 'Payment System Policy Department');
        assert.equal((await page.locator('#content').textContent()).includes(`${number} / 5`), false, `${tab}: page indicator must be hidden`);
        await page.locator(`#content img[src="assets/img/PSPD/${filename}"]`).evaluate(img => img.decode());
        assert.ok(await page.locator('#content nav').evaluate(nav => nav.getBoundingClientRect().bottom <= innerHeight), `${tab}: pagination should fit the portrait booth screen`);
        if ((number === 1 || number === 5) && process.env.SCREENSHOT_DIR) {
          await page.screenshot({ path: path.join(process.env.SCREENSHOT_DIR, `PSPD${number === 1 ? '' : '4'}.png`), fullPage: true });
        }
        if (number < 5) await page.locator(`c-button[data-next="PSPD${number}"]`).click();
      }
      await page.locator('c-button[data-next="PSMD1"]').click();
      assert.equal(new URL(page.url()).searchParams.get('tab'), 'PSMD1');
      await page.goto(base + prefix + '?tab=PSPD4');
      assert.equal(await page.locator('#content nav c-button[data-previous]:not([data-previous="integrated-licensing"])').count(), 0, 'PSPD must not show a Previous Page button');
      await page.locator('c-button[data-previous="integrated-licensing"]').click();
      assert.equal(new URL(page.url()).searchParams.get('tab'), 'integrated-licensing');
      await page.goto(base + prefix + '?tab=PSPD2');
      await page.reload();
      await page.locator('#content img[src$="PSPD/table-2.png"]').evaluate(img => img.decode());
      console.log('PSPD: five supplied tables, forward/back navigation, return to menu and direct reload passed offline.');
    }
    assert.equal(await page.locator('[role=status]').isVisible(), false, 'offline status must not be visible to visitors');
    // Render every content page while offline, including previously unopened images.
    const result = await page.evaluate(async () => {
      const broken = [];
      for (const entry of data) {
        history.replaceState(null, '', `?tab=${entry.id}`);
        loadContentFromUrl();
        await Promise.all([...document.images].map(async img => {
          try { await img.decode(); } catch { broken.push(img.getAttribute('src')); }
        }));
      }
      const media = await fetch('assets/audio/quiz.mp3', { headers: { Range: 'bytes=0-99' } });
      return { pages: data.length, broken: [...new Set(broken)], mediaStatus: media.status, mediaBytes: (await media.arrayBuffer()).byteLength };
    });
    assert.deepEqual(result.broken, []);
    assert.equal(result.mediaStatus, 206);
    assert.equal(result.mediaBytes, 100);
    await page.goto(base + prefix + 'index.html?tab=MASMD2');
    await page.waitForFunction(() => document.querySelector('#content img[src*="table-2"]')?.naturalWidth > 0);
    // Simulate partial browser eviction and repair without changing the release version.
    await context.setOffline(false);
    await page.evaluate(async () => {
      const scope = (await navigator.serviceWorker.getRegistration()).scope;
      const name = (await caches.keys()).find(name => name.startsWith(`cbfest:${scope}:`));
      await (await caches.open(name)).delete(new URL('assets/audio/quiz.mp3', scope).href);
    });
    await page.reload();
    await page.evaluate(async () => (await navigator.serviceWorker.getRegistration()).active.postMessage({ type: 'BOOTH_CACHE_REPAIR' }));
    await page.waitForFunction(() => document.querySelector('[role=status]')?.textContent === 'Siap offline', null, { timeout: 60000 });
    assert.deepEqual(errors, []);
    console.log(`${prefix}: ${cachedCount} assets cached; ${result.pages} pages/images and media passed offline; retry and eviction repair passed.`);
    await page.close();
  }
  const page = await context.newPage();
  await page.goto(base + '/event/');
  await page.waitForFunction(() => !!navigator.serviceWorker.controller);
  nextVersion = true;
  await page.evaluate(async () => (await navigator.serviceWorker.getRegistration()).update());
  console.log('Checking update installation…');
  await page.waitForFunction(() => document.querySelector('[role=status]')?.textContent.includes('Pembaruan siap'), null, { timeout: 120000 });
  assert.ok((await page.evaluate(async () => caches.keys())).some(name => name.endsWith('browser-update-test')));
  console.log('Update installed; closing last tab…');
  await page.close();
  const reopened = await context.newPage();
  await reopened.goto(base + '/event/', { waitUntil: 'commit', timeout: 15000 });
  await reopened.waitForFunction(() => document.querySelector('[role=status]')?.textContent === 'Siap offline');
  await reopened.waitForFunction(async () => (await caches.keys()).filter(name => name.startsWith(`cbfest:${location.origin}/event/:`)).every(name => name.endsWith('browser-update-test')));
  console.log('Update waits for tabs to close, then activates and cleans old scoped cache.');
} finally {
  await browser?.close();
  await new Promise(resolve => server.close(resolve));
}
