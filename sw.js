// sw.js — cache smart
const CACHE = 'echi-v4';     // <— incrementa a ogni release
const ASSETS = [
  './',                      // index
  './styles/main.css',       // metti i tuoi file reali (se li usi)
  './styles/animations.css',
  './js/app.js',
  './img/logo.svg'
];

self.addEventListener('install', e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e=>{
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e=>{
  const url = new URL(e.request.url);

  // Esempio: network-first per risorsa “dinamica”
  if (url.pathname.endsWith('search-index.json')) {
    e.respondWith(
      fetch(e.request).then(r=>{
        const copy = r.clone();
        caches.open(CACHE).then(c=>c.put(e.request, copy));
        return r;
      }).catch(()=> caches.match(e.request))
    );
    return;
  }

  // Default: cache-first
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
