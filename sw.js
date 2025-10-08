// sw.js (versione pulita e compatibile)
const CACHE = 'echi-v3';              // <— cambia versione quando aggiorni il sito
const ASSETS = ['./'];                 // metti qui i file che vuoi in cache (per ora solo la home)

self.addEventListener('install', function(e){
  console.log('[SW] install');
  e.waitUntil(caches.open(CACHE).then(function(c){ return c.addAll(ASSETS); }));
  self.skipWaiting();
});

self.addEventListener('activate', function(e){
  console.log('[SW] activate');
  e.waitUntil(
    caches.keys().then(function(keys){
      return Promise.all(keys.filter(function(k){ return k !== CACHE; })
                             .map(function(k){ return caches.delete(k); }));
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', function(e){
  e.respondWith(
    caches.match(e.request).then(function(r){ return r || fetch(e.request); })
  );
});
