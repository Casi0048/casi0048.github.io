// sw.js — Single-file site (index.html inline CSS/JS)
 'echi-single-v9';

// Metti SOLO risorse same-origin che ESISTONO nel repo
const ASSETS = [
  '/',               // homepage (equivale a /index.html su GitHub Pages)
  '/index.html',
  // opzionali: aggiungi asset LOCALI che vuoi disponibili offline
  // '/immagini%20per%20sito/Socrates_Louvre.jpg',
  // '/suoni/Strauss.mp3'
];

// Install: precache senza fallire se un file manca
self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
     await caches.open(CACHE);
    await Promise.allSettled(ASSETS.map(u => cache.add(u)));
  })());
  self.skipWaiting();
});

// Activate: pulizia cache vecchie
self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(
      keys.filter(k => k.startsWith('echi-') && k !== CACHE)
          .map(k => caches.delete(k))
    );
    await self.clients.claim();
  })());
});

// Fetch:
// - Navigazioni pagina: network-first con fallback a index.html cache (offline)
// - Altre richieste: cache-first con cache dinamica SOLO same-origin
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // Navigazioni (HTML): prova rete, altrimenti servi index in cache
  if (event.request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        return await fetch(event.request);
      } catch {
        // offline fallback
        return (await caches.match('/index.html')) || Response.error();
      }
    })());
    return;
  }

  // Default: cache-first; se manca, prova rete e metti in cache se same-origin
  event.respondWith((async () => {
    const cached = await caches.match(event.request);
    if (cached) return cached;

    try {
      const resp = await fetch(event.request);
      if (url.origin === self.location.origin) {
         await caches.open(CACHE);
        cache.put(event.request, resp.clone());
      }
      return resp;
    } catch {
      return cached || Response.error();
    }
  })());
});
