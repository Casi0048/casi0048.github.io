// sw.js — Single-file site (index.html inline CSS/JS)
// ⇦ Incrementa CACHE_VERSION ad ogni modifica di index.html
const CACHE_VERSION = 'v11';
const CACHE = `echi-single-${CACHE_VERSION}`;

// Risorse same-origin che esistono davvero
const ASSETS = [
  '/',
  '/index.html',
  // '/search-index.json',
  // '/search-full-index.json',
  // '/immagini%20per%20sito/Socrates_Louvre.jpg',
  // '/suoni/Strauss.mp3'
];

/* =========================================================
   INSTALL — precache non bloccante + attivazione immediata
   ========================================================= */
self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    await Promise.allSettled(ASSETS.map((u) => cache.add(u)));
  })());
  self.skipWaiting();
});

/* =========================================================
   ACTIVATE — elimina cache vecchie + prende il controllo
   ========================================================= */
self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(
      keys
        .filter((k) => k.startsWith('echi-') && k !== CACHE)
        .map((k) => caches.delete(k))
    );
    await self.clients.claim();
  })());
});

/* =========================================================
   FETCH
   - Navigazioni: network-first con cache: 'reload'
     (bypassa la cache HTTP di GitHub Pages, max-age=600)
   - Asset: cache-first + caching dinamico same-origin
   ========================================================= */
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // Richieste cross-origin: lascia passare senza intercettare
  if (url.origin !== self.location.origin) return;

  // Ignora richieste Range (video/audio streaming)
  if (event.request.headers.has('range')) return;

  // ---------- NAVIGAZIONI ----------
  if (event.request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        // cache: 'reload' → ignora la cache HTTP, va sempre al server
        const fresh = await fetch(event.request, { cache: 'reload' });

        // Aggiorna la cache con la versione fresca
        if (fresh && fresh.status === 200 && fresh.type === 'basic') {
          const cache = await caches.open(CACHE);
          cache.put('/index.html', fresh.clone());
        }

        return fresh;
      } catch {
        // Offline: serve la versione in cache
        return (await caches.match('/index.html')) || Response.error();
      }
    })());
    return;
  }

  // ---------- ASSET (CSS, JS, immagini, font) ----------
  event.respondWith((async () => {
    const cached = await caches.match(event.request);
    if (cached) return cached;

    try {
      const resp = await fetch(event.request);

      if (
        resp.status === 200 &&
        resp.type === 'basic' &&
        !event.request.headers.has('Range')
      ) {
        const cache = await caches.open(CACHE);
        await cache.put(event.request, resp.clone());
      }

      return resp;
    } catch {
      return cached || Response.error();
    }
  })());
});
