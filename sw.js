// sw.js — Single-file site (index.html inline CSS/JS)
const CACHE = 'echi-single-v10';   // ⇦ aumenta il nome quando cambi qualcosa

// Metti SOLO risorse same-origin che ESISTONO davvero
const ASSETS = [
  '/',                // homepage (equivale a /index.html su GitHub Pages)
  '/index.html',
  // Facoltativi (solo se esistono davvero nel repo):
  // '/search-index.json',
  // '/immagini%20per%20sito/Socrates_Louvre.jpg',
  // '/suoni/Strauss.mp3'
];

// Install: precache senza fallire se un file manca
self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    await Promise.allSettled(ASSETS.map(u => cache.add(u)));
  })());
  self.skipWaiting();
});

// Activate: pulizia cache vecchie e presa controllo immediata
self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(
      keys
        .filter(k => k.startsWith('echi-') && k !== CACHE)
        .map(k => caches.delete(k))
    );
    await self.clients.claim();
  })());
});

// Fetch:
// - Navigazioni (HTML): network-first con fallback a index.html cache (offline)
// - Altre richieste: cache-first con cache dinamica SOLO same-origin
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // Navigazioni pagina
  if (event.request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        return await fetch(event.request);
      } catch {
        return (await caches.match('/index.html')) || Response.error();
      }
    })());
    return;
  }

  // Statiche/asset: cache-first + caching dinamico same-origin
  event.respondWith((async () => {
    const cached = await caches.match(event.request);
    if (cached) return cached;

    try {
      const resp = await fetch(event.request);
      if (url.origin === self.location.origin) {
        const cache = await caches.open(CACHE);
        cache.put(event.request, resp.clone());
      }
      return resp;
    } catch {
      return cached || Response.error();
    }
  })());
});
