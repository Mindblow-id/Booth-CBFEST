# Booth CBFEST — penggunaan offline

Website menyimpan HTML, JavaScript, CSS, font, seluruh gambar, audio, video, dan data lokal di Cache Storage browser. Aset disiapkan sejak kunjungan pertama, termasuk gambar submenu yang belum dibuka. Setelah selesai, halaman dan aset dibaca langsung dari cache tanpa menunggu jaringan, termasuk URL `?tab=...`.

## Persiapan perangkat booth

1. Hosting seluruh project melalui **HTTPS**. Untuk pengujian lokal gunakan `python3 -m http.server 8000`, lalu buka `http://localhost:8000` (jangan membuka `index.html` lewat `file://`).
2. Buka situs pada browser/perangkat yang akan digunakan di booth dengan internet stabil. Tunggu indikator **Siap offline** di kanan bawah. Unduhan awal sekitar 105 MiB; tetap buka halaman sampai selesai.
3. Matikan internet, refresh halaman, lalu coba submenu dan quiz. Audio tetap mengikuti izin autoplay browser.
4. Gunakan profil browser yang sama, hindari mode incognito, dan jangan hapus data situs. Browser dapat menghapus cache jika penyimpanan penuh; periksa indikator lagi sebelum acara.

Jika unduhan gagal, sambungkan internet dan tekan **Coba lagi**. Unduhan yang sudah tersimpan untuk versi tersebut digunakan kembali. Situs eksternal seperti `ease.bi.go.id` dan tujuan QR code tetap membutuhkan internet.

## Financial Market Development Department

Dari `?tab=ETIBI`, tombol Financial Market Development Department membuka menu `?tab=FMDD`. Menu menggunakan komponen tombol dan background submenu yang sudah ada.

| Menu | Route halaman pertama | Jumlah halaman |
| --- | --- | --- |
| Market Financial Infrastructure | `?tab=FMDD-MFI1` | 3 |
| PUVA Derivative | `?tab=FMDD-DERIVATIVE1` | 5 |
| PUVA Vastra | `?tab=FMDD-VASTRA1` | 2 |
| Terminology Notes | `?tab=FMDD-TERMINOLOGY1` | 3 |

Setiap PNG dari ZIP menjadi satu halaman, berurutan dari `table.png`, `table-1.png`, dan seterusnya. Gunakan Next Page / Previous Page untuk berpindah dalam kategori dan Back to Menu untuk kembali ke empat pilihan. Seluruh halaman baru termasuk dalam cache offline. Definisi menu/halaman ada di `assets/js/data/perizinan-terpadu/FMDD.js`; route lama `FMDD1`–`FMDD5` tetap tersedia untuk tautan lama.

## Saat mengubah aset atau kode

Jalankan sebelum setiap deploy (Node.js 18+; tidak membutuhkan npm install):

```sh
node scripts/build-offline.mjs
node scripts/build-offline.mjs --check
node --test tests/offline.test.mjs
```

Upload `sw.js` hasil generator bersama `index.html`, `data.json`, dan seluruh folder `assets`, dengan struktur folder yang sama. Mendukung hosting di root maupun subfolder. Gunakan deployment atomik bila tersedia. Hash isi file mencegah cache dianggap lengkap jika file hilang, berubah, atau hosting mengembalikan HTML pengganti untuk aset yang tidak ditemukan.

Versi baru diunduh di latar belakang. Versi lama tetap melayani sesi aktif, sehingga pembaruan tidak memotong permainan. Ketika indikator menyatakan pembaruan siap, tutup **semua tab situs ini** lalu buka kembali untuk memakai versi baru. Cache lama dibersihkan setelah versi baru aktif. Jika pembaruan gagal, versi lama tetap tersedia.

Atur hosting agar `sw.js` memakai `Cache-Control: no-cache` dan tipe MIME JavaScript. Hindari cache CDN permanen untuk file tanpa nama hash; gunakan revalidasi (`Cache-Control: no-cache`) atau purge CDN saat deploy. Jangan arahkan aset hilang ke `index.html`.

Implementasi: `assets/js/offline.js` untuk registrasi/status; `scripts/sw-template.js` untuk logika service worker; `scripts/build-offline.mjs` untuk manifest/hash otomatis. Jangan edit `sw.js` langsung.

Pengujian browser tambahan: `node tests/browser-offline.mjs` dengan Playwright dan Chromium tersedia. Jika menggunakan instalasi di luar project, atur `PLAYWRIGHT_MODULE` ke path absolut `playwright/index.mjs` dan `BROWSER_EXECUTABLE` ke executable browser Chromium. Pengujian memakai server lokal dan profil sementara untuk memeriksa root/subfolder, semua halaman offline, audio, kegagalan unduhan, perbaikan cache, serta pergantian versi.
