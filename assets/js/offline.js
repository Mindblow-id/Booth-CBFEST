(() => {
  const panel = document.createElement('div');
  // Cache stays active for the booth, but its operational messages stay out of the visitor UI.
  panel.hidden = true;
  panel.style.cssText = 'position:fixed;bottom:10px;right:10px;z-index:10000;padding:8px 12px;border-radius:8px;background:rgba(0,0,0,.8);color:#fff;font:12px Arial,sans-serif;max-width:360px';
  const status = document.createElement('span');
  status.setAttribute('role', 'status');
  status.style.fontFamily = 'Arial, sans-serif';
  const retry = document.createElement('button');
  retry.textContent = 'Coba lagi';
  retry.style.cssText = 'margin-left:10px;text-decoration:underline;font:inherit;cursor:pointer';
  retry.hidden = true;
  panel.append(status, retry);
  document.body.append(panel);

  function show(message, failed = false) {
    status.textContent = message;
    retry.hidden = !failed;
  }
  if (!window.isSecureContext || !('serviceWorker' in navigator)) {
    show('Offline tidak tersedia. Gunakan HTTPS dan browser yang mendukung.');
    return;
  }
  let registration;
  let ready = false;
  function readyLabel() {
    return navigator.onLine ? 'Siap offline' : 'Siap offline · Tanpa internet';
  }
  function waitingLabel() {
    show('Pembaruan siap. Tutup semua tab situs ini lalu buka kembali.');
  }
  function checkStatus() {
    if (registration?.waiting) return waitingLabel();
    (registration?.installing || navigator.serviceWorker.controller)?.postMessage({ type: 'BOOTH_CACHE_STATUS' });
  }
  navigator.serviceWorker.addEventListener('message', event => {
    if (event.data?.type !== 'BOOTH_CACHE') return;
    const message = event.data;
    if (message.state === 'downloading') {
      show(`Menyimpan aset ${message.completed}/${message.total}…${ready ? ' Versi lama tetap tersedia.' : ''}`);
    } else if (message.state === 'ready') {
      ready = true;
      if (registration?.waiting) waitingLabel();
      else show(readyLabel());
      // Best effort: browser decides whether persistent storage can be granted.
      navigator.storage?.persist?.().catch(() => {});
    } else if (message.state === 'error') {
      if (event.source === navigator.serviceWorker.controller) ready = false;
      show(ready ? 'Pembaruan gagal. Versi lama tetap tersedia.' : 'Belum siap offline. Periksa koneksi/ruang penyimpanan.', true);
    }
  });
  navigator.serviceWorker.addEventListener('controllerchange', checkStatus);
  function watch(worker) {
    if (!worker) return;
    worker.addEventListener('statechange', () => {
      if (worker.state === 'installed' && navigator.serviceWorker.controller) waitingLabel();
      if (worker.state === 'redundant') show(ready ? 'Pembaruan gagal. Versi lama tetap tersedia.' : 'Cache belum lengkap. Sambungkan internet lalu coba lagi.', true);
      if (worker.state === 'activated') checkStatus();
    });
  }
  async function start(repair = false) {
    show(ready ? 'Memeriksa pembaruan…' : 'Menyiapkan akses offline…');
    try {
      registration = await navigator.serviceWorker.register('./sw.js', { updateViaCache: 'none' });
      registration.addEventListener('updatefound', () => watch(registration.installing));
      watch(registration.installing);
      if (repair && !registration.installing && !registration.waiting && registration.active) {
        registration.active.postMessage({ type: 'BOOTH_CACHE_REPAIR' });
      } else checkStatus();
    } catch (error) {
      console.error('Booth offline:', error);
      show('Cache belum tersedia. Periksa koneksi dan konfigurasi hosting.', true);
    }
  }
  retry.addEventListener('click', () => start(true));
  window.addEventListener('online', () => { if (!retry.hidden) start(true); else checkStatus(); });
  window.addEventListener('offline', () => { if (ready && !registration?.installing && !registration?.waiting) show(readyLabel()); });
  start();
})();
