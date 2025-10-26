// sw.js — SAFE per GitHub Pages (solo asset same-origin reali)
const CACHE = 'echi-v5';  // ↑ incrementa a ogni modifica importante

// Metti SOLO file che esistono davvero nel tuo repo e sullo stesso dominio
const ASSETS = [
  '/',                                  // homepage (index.html alla root)
  '/index.html',
  '/stile.css',                         // il tuo CSS principale (adatta se nome diverso)
  '/script.js',                         // il tuo JS principale (adatta se nome diverso)
  '/favicon_io/favicon-32x32.png',
  '/favicon_io/apple-touch-icon.png',
  '/immagini%20per%20sito/Socrates_Louvre.jpg',
  '/suoni/Strauss.mp3'                  // opzionale: precache dell'audio
  // ⚠️ NON mettere URL esterni (no cdnjs, no fonts.googleapis.com, ecc.)
];

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    // Aggiunge uno per uno: se un file manca NON fallisce l'install
    await Promise.allSettled(ASSETS.map(u => cache.add(u)));
  })());
  self.skipWaiting(); // attiva subito il nuovo SW
});

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

// Strategia: network-first per search-index.json; cache-first per il resto.
// Cache dinamica solo per risorse same-origin via GET.
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // Network-first per l'indice di ricerca (sempre aggiornato se online)
  if (url.pathname.endsWith('search-index.json')) {
    event.respondWith((async () => {
      try {
        const fresh = await fetch(event.request);
        // cache solo se same-origin
        if (url.origin === self.location.origin) {
          const cache = await caches.open(CACHE);
          cache.put(event.request, fresh.clone());
        }
        return fresh;
      } catch {
        const cached = await caches.match(event.request);
        return cached || Response.error();
      }
    })());
    return;
  }

  // Default: cache-first con fallback alla rete
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
