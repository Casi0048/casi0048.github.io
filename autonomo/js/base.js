<div aria-live="polite" id="quote-runner"></div>
 
/* === quote-runner (center slider) === */
(function(){
  function ready(fn){ if(document.readyState!=="loading") fn(); else document.addEventListener("DOMContentLoaded", fn); }
  ready(function(){
    var source = document.querySelectorAll(".floating-quotes .quote-bubble");
    var runner = document.getElementById("quote-runner");
    if(!runner) return;
    function hasBubbles(){ return document.querySelectorAll(".floating-quotes .quote-bubble").length; }
    var idx = 0;
    function showNext(){
      var src = document.querySelectorAll(".floating-quotes .quote-bubble");
      if(!src.length){ return; }
      runner.innerHTML = "";
      var clone = src[idx].cloneNode(true);
      clone.classList.add("slide-in");
      runner.appendChild(clone);
      idx = (idx + 1) % src.length;
    }
    showNext();
    setInterval(showNext, 9000);
  });
})();

/* === Timeline scroll reveal (IO) v2 === */
document.addEventListener("DOMContentLoaded", function(){
  var items = Array.prototype.slice.call(document.querySelectorAll(".timeline-item"));
  if (!items.length) return;
  items.forEach(function(el, i){
    el.classList.remove("left","right","visible");
    el.classList.add(i % 2 === 0 ? "left" : "right");
  });
  function computeDelay(el){
    var rect = el.getBoundingClientRect();
    var y = Math.max(0, Math.min(1, (rect.top / Math.max(1, window.innerHeight))));
    var w = Math.max(320, window.innerWidth || 0);
    var scale = (w >= 1200) ? 1.6 : (w >= 1024 ? 1.4 : (w >= 601 ? 1.1 : 0.8));
    var base = Math.round(y * 250 * scale);
    var jitter = Math.round((Math.random()*120));
    return base + jitter;
  }
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if (entry.isIntersecting) {
        var d = computeDelay(entry.target);
        entry.target.style.setProperty("--delay", d + "ms");
        entry.target.classList.add("visible");
        io.unobserve(entry.target);
      }
    });
  }, { root: null, rootMargin: "0px 0px -8% 0px", threshold: 0.18 });
  items.forEach(function(el){ io.observe(el); });
  // Sync iniziale + fallback
  function initialSync(){
    var vh = Math.max(1, window.innerHeight || 1);
    items.forEach(function(el){
      if (!el.classList.contains('visible')){
        var r = el.getBoundingClientRect();
        if (r.top < vh*0.88 && r.bottom > vh*0.12){ el.classList.add('visible'); }
      }
    });
  }
  function scrollFallback(){
    var vh = Math.max(1, window.innerHeight || 1);
    items.forEach(function(el){
      if (!el.classList.contains('visible')){
        var r = el.getBoundingClientRect();
        if (r.top < vh*0.9 && r.bottom > 0){ el.classList.add('visible'); }
      }
    });
  }
  requestAnimationFrame(initialSync);
  window.addEventListener('scroll', scrollFallback, {passive:true});
  window.addEventListener('resize', scrollFallback);
});
/* ===== quote-runner-js-solid-2025-10-08" ===== */


(function(){
  function ready(fn){ 
    if(document.readyState!=='loading') fn(); 
    else document.addEventListener('DOMContentLoaded', fn); 
  }
  
  function qsa(sel, root){
    return Array.prototype.slice.call((root || document).querySelectorAll(sel));
  }
  
  ready(function(){
    var runner = document.getElementById('quote-runner');
    if(!runner) return;
    var PERIOD = 9000;
    
    function readSource(){
      var list = qsa('.floating-quotes .quote-bubble');
      return list.map(function(q){
        var qt = q.querySelector('.quote-text');
        var qa = q.querySelector('.quote-author');
        return {
          t: (qt ? qt.textContent.trim() : ''), 
          a: (qa ? qa.textContent.trim() : '')
        };
      });
    }
    
    var data = readSource();
    if (!data.length){
      data = [
        {t:'“Conosci te stesso”', a:'— Socrate'},
        {t:'“La filosofia comincia con la meraviglia”', a:'— Platone'},
        {t:'“Cogito, ergo sum”', a:'— Cartesio'}
      ];
    }
    
    var idx = Math.floor(Math.random() * data.length);
    
    function render(item){
      runner.innerHTML = '';
      var b = document.createElement('div');
      b.className = 'quote-bubble slide-in';
      
      var qt = document.createElement('div');
      qt.className = 'quote-text';
      qt.textContent = item.t;
      
      var qa = document.createElement('div');
      qa.className = 'quote-author';
      qa.textContent = item.a;
      
      b.appendChild(qt);
      b.appendChild(qa);
      runner.appendChild(b);
    }
    
    function next(){
      render(data[idx]);
      idx = (idx + 1) % data.length;
    }
    
    next();
    setInterval(next, PERIOD);
  });
})();
/* ===== id="boomfx-js-2025-10-09 ===== */


  (function(){
  function byId(id){ return document.getElementById(id); }
  var exploding = byId('exploding');
  if(!exploding) return;
  if(!exploding.__wrapped){
    var wrap = document.createElement('span');
    wrap.className = 'exploding-stage';
    exploding.parentNode.insertBefore(wrap, exploding);
    wrap.appendChild(exploding);
    exploding.__wrapped = true;
  }
  function buildChars(target){
    if(target.__charsBuilt) return;
    var nodes = Array.from(target.childNodes);
    target.innerHTML = '';
    nodes.forEach(function(n){
      if(n.nodeType === 3){ // text
        var txt = n.nodeValue;
        for(var i=0;i<txt.length;i++){
          var span = document.createElement('span');
          span.className = 'char';
          span.textContent = txt[i];
          target.appendChild(span);
        }
      }else{
        target.appendChild(n); // keep tags like <b> etc.
      }
    });
    target.__charsBuilt = true;
  }
  function rand(min,max){ return Math.random()*(max-min)+min; }
  function spawnShockFlash(x,y){
    var root = document.body;
    var ring = document.createElement('div');
    ring.className = 'boom-shockwave';
    ring.style.setProperty('--x', x+'px');
    ring.style.setProperty('--y', y+'px');
    var flash = document.createElement('div');
    flash.className = 'boom-flash';
    flash.style.setProperty('--x', x+'px');
    flash.style.setProperty('--y', y+'px');
    root.appendChild(ring); root.appendChild(flash);
    setTimeout(function(){ ring.remove(); flash.remove(); }, 1200);
  }
  function spawnSparks(x,y){
    var root = document.body;
    var isMobile = (window.matchMedia && window.matchMedia('(max-width: 768px)').matches);
    var N = isMobile ? 50 : 110;
    for (var i=0;i<N;i++){
      var s = document.createElement('div');
      s.className = 'boom-spark';
      s.style.setProperty('--x', x+'px'); s.style.setProperty('--y', y+'px');
      var ang = Math.random()*Math.PI*2;
      var spd = rand(120, isMobile? 360 : 520);
      var dx = Math.cos(ang)*spd;
      var dy = Math.sin(ang)*spd + rand(40,120);
      var rot = rand(-540,540);
      var dur = rand(900,1400);
      var fade = dur + rand(0,200);
      var b0 = rand(0,.6), b1 = rand(.6,2.2);
      var size = rand(3,7);
      s.style.setProperty('--dx', dx.toFixed(1)+'px');
      s.style.setProperty('--dy', dy.toFixed(1)+'px');
      s.style.setProperty('--rot', rot.toFixed(1)+'deg');
      s.style.setProperty('--dur', Math.round(dur)+'ms');
      s.style.setProperty('--fade', Math.round(fade)+'ms');
      s.style.setProperty('--b0', b0.toFixed(2)+'px');
      s.style.setProperty('--b1', b1.toFixed(2)+'px');
      s.style.setProperty('--w', size.toFixed(1)+'px');
      s.style.setProperty('--h', size.toFixed(1)+'px');
      root.appendChild(s);
      setTimeout((function(el){ return function(){ el.remove(); }; })(s), fade+80);
    }
  }
  function explodeAt(target, x, y){
    buildChars(target);
    document.body.classList.add('boom-shake');
    setTimeout(function(){ document.body.classList.remove('boom-shake'); }, 560);
    target.classList.add('boom-primed');
    setTimeout(function(){
      target.classList.remove('boom-primed');
      target.classList.add('boom-active');
      var rect = target.getBoundingClientRect();
      var cx = rect.left + rect.width/2, cy = rect.top + rect.height/2;
      var chars = target.querySelectorAll('.char');
      for (var i=0;i<chars.length;i++){
        var el = chars[i];
        var bb = el.getBoundingClientRect();
        var vx = (bb.left + bb.width/2) - cx;
        var vy = (bb.top + bb.height/2) - cy;
        var dist = Math.max(1, Math.sqrt(vx*vx + vy*vy));
        var mult = rand(120, 300);
        var dx = (vx/dist) * mult + rand(-60,60);
        var dy = (vy/dist) * mult + rand(-60,60);
        var dz = rand(-140,140);
        el.style.setProperty('--dx', dx.toFixed(1)+'px');
        el.style.setProperty('--dy', dy.toFixed(1)+'px');
        el.style.setProperty('--dz', dz.toFixed(1)+'px');
        el.style.setProperty('--rx', rand(-40,40).toFixed(1)+'deg');
        el.style.setProperty('--ry', rand(-60,60).toFixed(1)+'deg');
        el.style.setProperty('--rz', rand(-120,120).toFixed(1)+'deg');
        el.style.setProperty('--blur', rand(.2,1.4).toFixed(2)+'px');
        el.style.setProperty('--td', Math.round(rand(820,1150))+'ms');
      }
      spawnShockFlash(x,y);
      spawnSparks(x,y);
      var boom = document.getElementById('explosionSound');
      try{ if(boom){ boom.currentTime=0; boom.volume=1.0; boom.muted=false; softPlay(boom, 1.0, 140).catch(function(){}); } }catch(_){}
      setTimeout(function(){
        target.classList.remove('boom-active');
        var chars2 = target.querySelectorAll('.char');
        for (var j=0;j<chars2.length;j++){
          (function(el,k){
            setTimeout(function(){
              el.style.setProperty('--dx','0px');
              el.style.setProperty('--dy','0px');
              el.style.setProperty('--dz','0px');
              el.style.setProperty('--rx','0deg');
              el.style.setProperty('--ry','0deg');
              el.style.setProperty('--rz','0deg');
              el.style.setProperty('--blur','0px');
              el.style.setProperty('--td', Math.round(rand(400,700))+'ms');
              el.style.opacity='1'; el.style.transform='translate3d(0,0,0)';
            }, k*8);
          })(chars2[j], j);
        }
      }, 1200);
    }, 120);
  }
  function onClick(e){
    var x = (e && 'clientX' in e) ? e.clientX : (window.innerWidth/2);
    var y = (e && 'clientY' in e) ? e.clientY : (window.innerHeight/2);
    explodeAt(exploding, x, y);
    setTimeout(function(){ explodeAt(exploding, x, y); }, 260); // boom–boom
  }
  exploding.style.cursor='pointer';
  exploding.addEventListener('click', onClick, true);
  var btn = document.getElementById('btn-explode') || document.getElementById('explode-btn');
  if(btn){ btn.addEventListener('click', function(ev){ ev.preventDefault(); onClick(ev); }, true); }
})();
/* ===== <script id="gt-wire"> ===== */


document.addEventListener('DOMContentLoaded', function() {
  var translateSelect = document.getElementById('customTranslate');
  function clearCookie(){
    var past='Thu, 01 Jan 1970 00:00:00 GMT';
    document.cookie='googtrans=; expires='+past+'; path=/;';
    document.cookie='googtrans=; expires='+past+'; path=/; domain='+location.hostname+';';
  }
  function openWebTranslate(lang){
    var u = location.href; var sl='it';
    var url='https://translate.google.com/translate?hl='+encodeURIComponent(lang)+'&sl='+encodeURIComponent(sl)+'&tl='+encodeURIComponent(lang)+'&u='+encodeURIComponent(u);
    window.open(url, '_blank', 'noopener');
  }
  function setCombo(lang){
    var combo = document.querySelector('.goog-te-combo');
    if(combo){
      combo.value = lang; combo.dispatchEvent(new Event('change')); return true;
    }
    var frame = document.querySelector('.goog-te-menu-frame');
    if(frame && frame.contentDocument){
      var select = frame.contentDocument.querySelector('.goog-te-combo');
      if(select){ select.value = lang; select.dispatchEvent(new Event('change')); return true; }
    }
    return false;
  }
  function loadGT(){
    if(!(window.google && google.translate)){
      var s=document.createElement('script');
      s.src='https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      s.async=true;
      s.onerror=function(){ document.documentElement.setAttribute('data-gt-error','load-failed'); };
      document.head.appendChild(s);
    }
  }
  function translatePage(lang){
    if(!lang) return;
    if(lang==='it'){ clearCookie(); setTimeout(function(){ location.reload(); }, 50); return; }
    loadGT();
    var tries=0;
    (function wait(){
      if(window.google && google.translate){
        try{ if(!document.querySelector('.goog-te-combo')) { window.googleTranslateElementInit(); } }catch(_){}
        if(setCombo(lang)) return;
      }
      if(tries++ < 60){ setTimeout(wait, 150); }
      else { document.documentElement.setAttribute('data-gt-error','load-failed'); openWebTranslate(lang); }
    })();
  }
  if(translateSelect){
    translateSelect.addEventListener('change', function(){ translatePage(this.value); }, {passive:true});
    try{
      var c=(document.cookie||'').split(';').map(function(s){return s.trim();}).find(function(s){return s.indexOf('googtrans=')===0;});
      if(!c){ translateSelect.value='it'; }
      else{
        var val=decodeURIComponent(c.split('=')[1]||''); var parts=val.split('/'); var l=parts[2]||'it';
        if(translateSelect.querySelector('option[value="'+l+'"]')) translateSelect.value=l;
      }
    }catch(_){ translateSelect.value='it'; }
  }
});

// SISTEMA STELLARE COMPLETO CON VERIFICHE DI SICUREZZA - VERSIONE CORRETTA
document.addEventListener('DOMContentLoaded', function() {
    
    // 1. PRELOAD RISORSE CRITICHE - CORRETTO
    const criticalResources = [
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css'
    ];

    // Funzione helper per operazioni DOM sicure
    function safeDOMOperation(operation, fallback = null) {
        try {
            if (typeof operation === 'function') {
                return operation();
            }
        } catch (error) {
            console.warn('DOM operation failed:', error.message);
            if (fallback && typeof fallback === 'function') {
                try {
                    return fallback();
                } catch (fallbackError) {
                    console.error('Fallback also failed:', fallbackError);
                }
            }
        }
        return null;
    }

    // 2. PRELOAD CORRETTO CON CROSSORIGIN
    criticalResources.forEach(resource => {
        if (resource.includes('font-awesome')) {
            safeDOMOperation(() => {
                const preload = document.createElement('link');
                preload.rel = 'preload';
                preload.href = resource;
                preload.as = 'style';
                preload.crossOrigin = 'anonymous'; // 👈 AGGIUNTO QUESTO
                
                if (document.head) {
                    document.head.appendChild(preload);
                    console.log('✅ Preload risorsa con crossorigin:', resource);
                    
                    // 👈 AGGIUNGI ANCHE IL LINK NORMALE PER EVITARE L'AVVISO
                    const normalLink = document.createElement('link');
                    normalLink.rel = 'stylesheet';
                    normalLink.href = resource;
                    normalLink.crossOrigin = 'anonymous';
                    document.head.appendChild(normalLink);
                }
            }, () => {
                console.warn('❌ Fallback preload per:', resource);
            });
        }
    });

    // [RESTANTE CODICE IDENTICO...]
    // 3. SISTEMA STELLARE CON VERIFICHE COMPLETE
    function initializeStars() {
        return safeDOMOperation(() => {
            const starsContainer = document.getElementById('starsContainer') || document.getElementById('stars');
            
            if (!starsContainer) {
                console.warn('❌ Container stelle non trovato nel DOM');
                return false;
            }
            
            if (!document.body.contains(starsContainer)) {
                console.warn('❌ Container stelle non presente nel document.body');
                return false;
            }

            const starCount = 200;
            let starsCreated = 0;
            let errors = 0;

            for (let i = 0; i < starCount; i++) {
                const success = safeDOMOperation(() => {
                    if (i % 50 === 0 && !document.body.contains(starsContainer)) {
                        console.warn('❌ Container stelle rimosso durante la creazione');
                        return false;
                    }

                    const star = document.createElement('div');
                    star.className = 'star';
                    
                    const size = Math.random() * 3;
                    star.style.width = `${size}px`;
                    star.style.height = `${size}px`;
                    star.style.left = `${Math.random() * 100}%`;
                    star.style.top = `${Math.random() * 100}%`;
                    star.style.opacity = Math.random() * 0.7 + 0.1;
                    star.style.animationDuration = `${3 + Math.random() * 7}s`;
                    star.style.animationDelay = `${Math.random() * 5}s`;
                    
                    starsContainer.appendChild(star);
                    starsCreated++;
                    return true;
                });

                if (!success) errors++;
                if (errors > 10) break;
            }

            console.log(`✅ ${starsCreated} stelle create, ${errors} errori`);
            return starsCreated > 0;
        });
    }

    // 4. LAZY LOADING IMMAGINI SICURO
    function initializeLazyLoading() {
        return safeDOMOperation(() => {
            const lazyImages = document.querySelectorAll('.timeline-content img[data-src]');
            
            if (lazyImages.length === 0) {
                console.log('ℹ️ Nessuna immagine per lazy loading');
                return false;
            }

            if ('IntersectionObserver' in window) {
                const imageObserver = new IntersectionObserver((entries, observer) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const img = entry.target;
                            safeDOMOperation(() => {
                                img.src = img.dataset.src;
                                img.removeAttribute('data-src');
                                img.classList.add('fade-in');
                                observer.unobserve(img);
                            });
                        }
                    });
                }, { 
                    rootMargin: '50px 0px',
                    threshold: 0.1
                });

                lazyImages.forEach(img => imageObserver.observe(img));
                console.log(`✅ Lazy loading attivo per ${lazyImages.length} immagini`);
            } else {
                lazyImages.forEach(img => {
                    safeDOMOperation(() => {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    });
                });
                console.log('ℹ️ Lazy loading fallback attivato');
            }
            return true;
        });
    }

    // 5. FALLBACK STELLE SEMPLIFICATO
    function createBasicStars() {
        return safeDOMOperation(() => {
            const container = document.getElementById('starsContainer');
            if (!container) return false;
            
            for (let i = 0; i < 50; i++) {
                const star = document.createElement('div');
                star.className = 'star small';
                star.style.left = Math.random() * 100 + '%';
                star.style.top = Math.random() * 100 + '%';
                star.style.animationDelay = Math.random() * 5 + 's';
                container.appendChild(star);
            }
            console.log('✅ Stelle basic create');
            return true;
        });
    }

    // 6. INIZIALIZZAZIONE SICURA EFFETTI STELLARI
    function initializeStarEffects() {
        safeDOMOperation(
            () => {
                const starsContainer = document.getElementById('starsContainer');
                if (starsContainer && typeof initStars === 'function') {
                    initStars();
                    console.log('✅ Effetti stelle avanzati attivati');
                } else if (starsContainer) {
                    createBasicStars();
                }
            },
            () => {
                console.log('ℹ️ Effetti stelle disabilitati per problemi di performance');
                const starsContainer = document.getElementById('starsContainer');
                if (starsContainer) {
                    starsContainer.style.display = 'none';
                }
            }
        );
    }

    // 7. CSS PER STATI SPECIALI
    function injectPerformanceCSS() {
        return safeDOMOperation(() => {
            if (!document.head) return false;
            
            const performanceCSS = `
                .fade-in {
                    animation: fadeIn 0.5s ease-in;
                }
                
                .offline {
                    opacity: 0.8;
                    filter: grayscale(0.3);
                }
                
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                
                @media (prefers-reduced-motion: reduce) {
                    .fade-in, .star {
                        animation: none !important;
                    }
                }
            `;

            const style = document.createElement('style');
            style.textContent = performanceCSS;
            document.head.appendChild(style);
            console.log('✅ CSS performance injectato');
            return true;
        });
    }

    // 8. INIZIALIZZAZIONE PRINCIPALE
    console.log('🚀 Inizializzazione sistema stellare...');
    
    injectPerformanceCSS();
    initializeStars();
    initializeLazyLoading();
    initializeStarEffects();

    console.log('✅ Sistema completamente inizializzato');
});

// 9. GESTIONE ERRORI GLOBALE
window.addEventListener('error', (event) => {
    console.error('❌ Errore globale catturato:', event.error);
});

// 10. GESTIONE STATO CONNESSIONE
window.addEventListener('online', () => {
    console.log('📶 Connessione ripristinata');
    safeDOMOperation(() => {
        document.body.classList.remove('offline');
    });
});

window.addEventListener('offline', () => {
    console.warn('📶 Connessione persa');
    safeDOMOperation(() => {
        document.body.classList.add('offline');
    });
});

// 11. SAFE ELEMENT SELECTOR
window.getElementSafe = function(selector) {
    try {
        const element = typeof selector === 'string' ? 
            document.querySelector(selector) : selector;
        return element && document.body.contains(element) ? element : null;
    } catch (error) {
        console.warn('getElementSafe error:', error);
        return null;
    }
};

console.log('⭐ Sistema stellare caricato e pronto');


  /* =====  ===== */

(function(){
  function setFill(el){
    if(!el) return;
    var min = +el.min || 0;
    var max = +el.max || 100;
    var val = +el.value || 0;
    var pct = ((val - min) * 100) / (max - min);
    el.style.setProperty('--fill', pct + '%');
  }
  function bind(el){
    if(!el) return;
    setFill(el);
    el.addEventListener('input', function(){ setFill(el); });
    el.addEventListener('change', function(){ setFill(el); });
  }
  document.addEventListener('DOMContentLoaded', function(){
    bind(document.querySelector('#audio-player #volume'));
    bind(document.querySelector('#slider-speed'));
  });
})();
/* ===== <script id="speed-readout-js"> ===== */


(function(){
  function clamp(n,min,max){ return Math.max(min, Math.min(max, n)); }
  function formatFactor(x){
    // Implementazione base per il formato del fattore di velocità
    return '×' + parseFloat(x).toFixed(1);
  }
  
  // Inizializzazione del speed readout
  document.addEventListener('DOMContentLoaded', function() {
    var speedSlider = document.getElementById('slider-speed');
    var speedReadout = document.getElementById('speed-readout');
    
    if(speedSlider && speedReadout) {
      function updateSpeedReadout() {
        var value = parseFloat(speedSlider.value) || 1;
        speedReadout.textContent = formatFactor(value);
      }
      
      speedSlider.addEventListener('input', updateSpeedReadout);
      updateSpeedReadout(); // Imposta il valore iniziale
    }
  });
})();
/* ===== <script id="russell-conservative-anim-js"> ===== */


(function(){
  function pingOnce(){
    var box = document.getElementById('russell-box');
    var btn = document.getElementById('russell-btn');
    if(!box) return;
    box.classList.add('ping');
    if(btn) btn.classList.add('ping');
    clearTimeout(pingOnce._t);
    pingOnce._t = setTimeout(function(){
      box.classList.remove('ping');
      if(btn) btn.classList.remove('ping');
    }, 520);
  }
  function isInside(el, id){
    while(el){ if(el.id === id) return true; el = el.parentElement; }
    return false;
  }
  function init(){
    var box = document.getElementById('russell-box');
    var btn = document.getElementById('russell-btn');
    if(!box) return;

    // Click on the button OR anywhere inside the box
    box.addEventListener('click', function(e){
      // avoid false positives from unrelated overlays
      if(isInside(e.target, 'russell-box') || isInside(e.target, 'russell-btn')){
        pingOnce();
      }
    });

    // Keyboard on button
    if(btn){
      if(!btn.hasAttribute('role')) btn.setAttribute('role','button');
      if(!btn.hasAttribute('tabindex')) btn.setAttribute('tabindex','0');
      if(!btn.hasAttribute('aria-label')) btn.setAttribute('aria-label','Apri Russell');
      btn.addEventListener('keydown', function(e){
        if(e.key === 'Enter' || e.key === ' ' || e.keyCode === 13 || e.keyCode === 32){
          e.preventDefault(); pingOnce();
        }
      });
    }
  }
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  }else{
    init();
  }
})();

<!-- removed duplicate script#speed-readout-js -->

(function(){
  var boom = document.getElementById('explosionSound');
  var thunder = document.getElementById('thunder-sound');
  var fired = false;
  async function unlockSilent(){
    if (fired) return; fired = true;
    var list = [boom, thunder].filter(Boolean);
    for (var i=0;i<list.length;i++){
      var a = list[i];
      try{
        var prevMuted = a.muted, prevVol = a.volume;
        a.muted = true; a.volume = 0.0;
        await a.play(); a.pause(); a.currentTime = 0;
        a.muted = prevMuted; a.volume = prevVol;
      }catch(_){}
    }
    window.removeEventListener('pointerdown', unlockSilent, true);
    window.removeEventListener('click', unlockSilent, true);
  }
  window.addEventListener('pointerdown', unlockSilent, { once:true, passive:true, capture:true });
  window.addEventListener('click', unlockSilent, { once:true, passive:true, capture:true });
})();
/* ===== 
<script id="sfx-soft-play"> ===== */

function softPlay(el, targetVol, ms){
  targetVol = (typeof targetVol === 'number') ? targetVol : 1.0;
  ms = (typeof ms === 'number') ? ms : 140;
  if(!el) return;
  try{
    el.muted = false;
    el.currentTime = 0;
    el.volume = 0.0001;
    el.play().then(function(){
      var steps = Math.max(1, Math.round(ms/30));
      var i=0, start = el.volume, diff = targetVol - start;
      var t = setInterval(function(){
        i++; el.volume = start + diff*(i/steps);
        if(i>=steps){ el.volume = targetVol; clearInterval(t); }
      }, 30);
    }).catch(function(){});
  }catch(_){}
}
/* ===== <script id="timeline-bidirectional-scroll"> ===== */


document.addEventListener('DOMContentLoaded', function() {
  const timelineItems = document.querySelectorAll('.timeline-item');
  
  if (!timelineItems.length) return;
  
  // Intersection Observer per entrambe le direzioni
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const item = entry.target;
      
      if (entry.isIntersecting) {
        // Item entra nella viewport - anima in
        item.classList.add('visible');
        
        // Rimuovi la classe dopo l'animazione per permettere il replay
        setTimeout(() => {
          if (entry.isIntersecting) {
            item.style.opacity = '1';
            item.style.transform = 'none';
          }
        }, 800);
      } else {
        // Item esce dalla viewport - resetta per nuova animazione
        item.classList.remove('visible');
        
        // Piccolo delay per evitare flickering
        setTimeout(() => {
          if (!entry.isIntersecting) {
            item.style.opacity = '0';
            if (item.classList.contains('left')) {
              item.style.transform = 'translateX(-80px) translateY(40px)';
            } else if (item.classList.contains('right')) {
              item.style.transform = 'translateX(80px) translateY(40px)';
            } else {
              item.style.transform = 'translateY(40px)';
            }
          }
        }, 50);
      }
    });
  }, {
    threshold: 0.15, // Trigger quando il 15% dell'elemento è visibile
    rootMargin: '-50px 0px -50px 0px' // Area di trigger ridotta
  });

  // Osserva tutti gli item
  timelineItems.forEach(item => {
    observer.observe(item);
  });

  // Forza un check iniziale
  setTimeout(() => {
    timelineItems.forEach(item => {
      const rect = item.getBoundingClientRect();
      const isVisible = (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
      
      if (isVisible) {
        item.classList.add('visible');
      }
    });
  }, 100);

  // Gestione del resize per ripristinare le animazioni
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      timelineItems.forEach(item => {
        const rect = item.getBoundingClientRect();
        const isVisible = (
          rect.top >= 0 &&
          rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
        );
        
        if (!isVisible) {
          item.classList.remove('visible');
        }
      });
    }, 250);
  });
});

// Versione alternativa più aggressiva per animazioni continue
function setupTimelineAnimations() {
  const items = document.querySelectorAll('.timeline-item');
  let ticking = false;
  
  function updateAnimations() {
    const windowHeight = window.innerHeight;
    const triggerPoint = windowHeight * 0.8;
    
    items.forEach(item => {
      const rect = item.getBoundingClientRect();
      const isInView = rect.top < triggerPoint && rect.bottom > 0;
      
      if (isInView && !item.classList.contains('visible')) {
        item.classList.add('visible');
      } else if (!isInView && item.classList.contains('visible')) {
        item.classList.remove('visible');
      }
    });
    
    ticking = false;
  }
  
  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(updateAnimations);
      ticking = true;
    }
  }
  
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  
  // Check iniziale
  updateAnimations();
}

// Avvia le animazioni
document.addEventListener('DOMContentLoaded', setupTimelineAnimations);

// Animazione delay progressivo per voci menu
document.addEventListener('DOMContentLoaded', function() {
    const megaMenus = document.querySelectorAll('.mega-menu');
    
    megaMenus.forEach(menu => {
        const links = menu.querySelectorAll('a');
        links.forEach((link, index) => {
            link.style.setProperty('--delay', index);
        });
    });
});

// Aggiungi questo script
document.addEventListener('DOMContentLoaded', function() {
  const progressBar = document.querySelector('.scroll-progress-bar');
  
  window.addEventListener('scroll', function() {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    progressBar.style.width = scrolled + '%';
  });
});

/* === THEME TOGGLE FUNCTIONALITY === */
document.addEventListener('DOMContentLoaded', function() {
  const themeToggle = document.getElementById('theme-toggle');
  if (!themeToggle) return;
  
  // Get saved theme or default to dark
  const savedTheme = localStorage.getItem('theme') || 'dark';
  
  // Apply saved theme
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateToggleButton(savedTheme);
  
  // Toggle theme on click
  themeToggle.addEventListener('click', function() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    // Apply new theme
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateToggleButton(newTheme);
    
    // Smooth transition
    document.documentElement.style.transition = 'all 0.5s ease';
    setTimeout(() => {
      document.documentElement.style.transition = '';
    }, 500);
  });
  
  function updateToggleButton(theme) {
    const icon = theme === 'dark' ? '🌙' : '☀️';
    const label = theme === 'dark' ? 'Attiva tema chiaro' : 'Attiva tema scuro';
    
    themeToggle.innerHTML = icon;
    themeToggle.setAttribute('aria-label', label);
    themeToggle.setAttribute('title', label);
    
    // Add click feedback
    themeToggle.style.transform = 'scale(0.9)';
    setTimeout(() => {
      themeToggle.style.transform = 'scale(1)';
    }, 150);
  }
  
  // Listen for system preference changes
  const systemTheme = window.matchMedia('(prefers-color-scheme: light)');
  systemTheme.addEventListener('change', function(e) {
    if (!localStorage.getItem('theme')) {
      const newTheme = e.matches ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      updateToggleButton(newTheme);
    }
  });
});

    const btn = document.getElementById('paradigma-btn');
    const overlay = document.getElementById('filosofi-overlay');
    
    let hideTimeout;
    
    function showOverlay() {
        clearTimeout(hideTimeout);
        overlay.style.display = 'block';
    }
    
    function hideOverlay() {
        hideTimeout = setTimeout(() => {
            overlay.style.display = 'none';
        }, 300);
    }
    
    // Apri overlay al passaggio mouse sul bottone
    btn.addEventListener('mouseenter', showOverlay);
    
    // Chiudi overlay dopo uscita mouse dal bottone
    btn.addEventListener('mouseleave', hideOverlay);
    
    // Se il mouse entra nell'overlay cancella la chiusura
    overlay.addEventListener('mouseenter', () => clearTimeout(hideTimeout));
    
    // Se il mouse esce dall'overlay, avvia chiusura
    overlay.addEventListener('mouseleave', hideOverlay);

// Funzioni per il modale
function showNewsletterModal() {
  document.getElementById('newsletterModal').style.display = 'flex';
}

function closeNewsletterModal() {
  document.getElementById('newsletterModal').style.display = 'none';
}

// Chiudi modale cliccando fuori
document.getElementById('newsletterModal').addEventListener('click', function(e) {
  if (e.target === this) closeNewsletterModal();
});

// Gestione form (base)
document.getElementById('newsletterForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const email = this.querySelector('input[type="email"]').value;
  alert('Grazie per esserti iscritto! Controlla la tua email: ' + email);
  closeNewsletterModal();
});

// Chiudi con ESC
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeNewsletterModal();
});

document.addEventListener('click', function(e){
  const link = e.target.closest('a[href="#lista-articoli"]');
  if(!link) return;
  const target = document.getElementById('lista-articoli');
  if(!target) return;
  e.preventDefault();
  try{ target.scrollIntoView({ behavior:'smooth', block:'start' }); }
  catch(_){ location.hash = '#lista-articoli'; }
});

  /* removed duplicate window.SEARCH_INDEX_URLS assignment */

  // Aggiungi questo script per ottimizzare le animazioni
document.addEventListener('DOMContentLoaded', function() {
  // Usa requestAnimationFrame per animazioni fluide
  function optimizeAnimations() {
    const animatedElements = document.querySelectorAll('.timeline-item, .mega-menu');
    animatedElements.forEach(el => {
      el.style.willChange = 'transform, opacity';
    });
  }
  optimizeAnimations();
});

    (function(){
      const panel = document.querySelector('#search-panel');
      const btnClose = document.getElementById('search-close');
      const backdrop = document.getElementById('search-backdrop');
      if(btnClose){
        btnClose.addEventListener('click', function(){
          panel && panel.classList.remove('open');
          if(backdrop){ backdrop.classList.remove('open'); setTimeout(()=>backdrop.hidden=true, 200); }
        });
      }
      // expose a helper to set results (optional)
      window.setSearchResults = function(html){
        const tgt = document.querySelector('#search-results, #searchResults, .search-results, .results-scroll');
        if(!tgt) return;
        tgt.innerHTML = html;
        window.animateSearchResults && window.animateSearchResults();
      };
    })();

   
// === Auto-open search panel when real results are injected ===
(function(){
  const panel    = document.querySelector('#search-panel, #searchPanel, .search-panel, .results-panel');
  const box      = document.querySelector('#search-results, #searchResults, .search-results, .results-scroll');
  const backdrop = document.getElementById('search-backdrop');
  if (!panel || !box) return;

  // Only count nodes that look like real results (not placeholders)
  function hasRealItems() {
    // Match common result item patterns, exclude placeholders
    const sel = '.sp-item:not([data-placeholder]), .search-result, .result, li.result-item, .result-title a';
    return box.querySelector(sel) !== null;
  }

  function forceClose(){
    panel.classList.remove('open');
    if (backdrop){ backdrop.classList.remove('open'); backdrop.hidden = true; }
  }
  function openPanel(){
    if (!panel.classList.contains('open')) panel.classList.add('open');
    if (backdrop){
      backdrop.hidden = false;
      backdrop.classList.add('open');
      backdrop.onclick = () => forceClose();
    }
    if (typeof window.animateSearchResults === 'function'){
      window.animateSearchResults();
    } else {
      Array.from(box.children).forEach((el,i)=> el.style.setProperty('--i', i));
    }
  }

  // Observe child changes
  const mo = new MutationObserver(()=>{
    if (hasRealItems()) openPanel();
    else forceClose();
  });
  mo.observe(box, { childList: true, subtree: true });

  // Ensure closed on load unless there are real items
  if (!hasRealItems()) forceClose();
  else openPanel();

  // ESC to close
  document.addEventListener('keydown', (e)=>{ if (e.key === 'Escape') forceClose(); });
})();

// === GENERATORE DI STELLE - VERSIONE CORRETTA ===
(function() {
    const container = document.getElementById('starsContainer');
    if (!container) return;
    
    // Crea stelle normali - CORRETTO
    const baseStars = Math.floor((window.innerWidth * window.innerHeight) / 800);
    const starCount = Math.min(600, Math.max(150, baseStars));
    
    // CREA LE STELLE NORMALI - QUESTA RIGA MANCAVA COMPLETAMENTE!
    for (let i = 0; i < starCount; i++) {
        createStar();
    }
    
    // Crea stelle cadenti immediatamente
    createMultipleShootingStars();
    
    // Programma la creazione continua
    setInterval(createMultipleShootingStars, 4000);
    
    function createStar() {
        const star = document.createElement('div');
        star.className = 'star';
        
        const sizes = ['small', 'medium', 'large', 'xlarge'];
        const size = sizes[Math.floor(Math.random() * sizes.length)];
        star.classList.add(size);
        
        // RIMUOVI QUESTE RIGHE CHE SOVRASCRIVONO LE DURATE CSS
        // star.style.setProperty('--duration', (4 + Math.random() * 8) + 's');
        // star.style.setProperty('--delay', (Math.random() * 15) + 's');
        
        // 75% di stelle colorate
        if (Math.random() < 0.75) {
            const colors = ['color-blue', 'color-gold', 'color-purple'];
            star.classList.add(colors[Math.floor(Math.random() * colors.length)]);
        }
        
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        
        container.appendChild(star);
    }
    
    function createShootingStar() {
        const shooter = document.createElement('div');
        shooter.className = 'shooting-star';
        
        // SELEZIONA DIREZIONE CASUALE
        const directions = ['diagonal', 'horizontal', 'vertical', 'reverse'];
        const direction = directions[Math.floor(Math.random() * directions.length)];
        shooter.classList.add(direction);
        
        // VARIETÀ DI VELOCITÀ
        if (Math.random() < 0.3) shooter.classList.add('fast');
        if (Math.random() < 0.2) shooter.classList.add('slow');
        
        // POSIZIONE IN BASE ALLA DIREZIONE
        if (direction === 'diagonal') {
            shooter.style.left = '-150px';
            shooter.style.top = Math.random() * 300 + 'px';
        } else if (direction === 'horizontal') {
            shooter.style.left = '-150px';
            shooter.style.top = (Math.random() * window.innerHeight) + 'px';
        } else if (direction === 'vertical') {
            shooter.style.left = (Math.random() * window.innerWidth) + 'px';
            shooter.style.top = '-150px';
        } else if (direction === 'reverse') {
            shooter.style.left = (window.innerWidth + 150) + 'px';
            shooter.style.top = Math.random() * 300 + 'px';
        }
        
        // RITARDO E DURATA
        shooter.style.animationDelay = (Math.random() * 3) + 's';
        
        container.appendChild(shooter);
        
        // RIMUOVI DOPO L'ANIMAZIONE
        const duration = shooter.classList.contains('fast') ? 8000 : 
                        shooter.classList.contains('slow') ? 15000 : 12000;
        
        setTimeout(() => {
            if (shooter.parentNode) {
                shooter.parentNode.removeChild(shooter);
            }
        }, duration);
    }
    
    function createMultipleShootingStars() {
        // Crea 1-2 stelle cadenti contemporaneamente
        const count = 1 + Math.floor(Math.random() * 2);
        for (let i = 0; i < count; i++) {
            setTimeout(() => createShootingStar(), i * 1000);
        }
    }
    
    // RESIZE HANDLER CORRETTO
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            container.innerHTML = '';
            const newBaseStars = Math.floor((window.innerWidth * window.innerHeight) / 800);
            const newStarCount = Math.min(600, Math.max(150, newBaseStars));
            for (let i = 0; i < newStarCount; i++) createStar();
            createMultipleShootingStars();
        }, 250);
    });
    
    // AVVIA SUBITO
    setTimeout(createMultipleShootingStars, 500);
})();

    (function() {
        const canvas = document.getElementById("tiny-comets");
        const ctx = canvas.getContext("2d");
        
        let w, h;
        const comets = [];
        const colors = [
            '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
            '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9',
            '#F8C471', '#82E0AA', '#F1948A', '#85C1E9', '#D7BDE2'
        ];
        
        function resizeCanvas() {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
        }
        
        class TinyComet {
            constructor() {
                this.reset();
                // Direzione casuale (0-360 gradi)
                this.angle = Math.random() * Math.PI * 2;
                this.speed = Math.random() * 2 + 0.5;
                this.color = colors[Math.floor(Math.random() * colors.length)];
                this.size = Math.random() * 3 + 1;
                this.trailLength = Math.floor(Math.random() * 8) + 4;
                this.trail = [];
            }
            
            reset() {
                // Posizione iniziale casuale su tutti i bordi
                const side = Math.floor(Math.random() * 4);
                switch(side) {
                    case 0: // Alto
                        this.x = Math.random() * w;
                        this.y = -10;
                        break;
                    case 1: // Destra
                        this.x = w + 10;
                        this.y = Math.random() * h;
                        break;
                    case 2: // Basso
                        this.x = Math.random() * w;
                        this.y = h + 10;
                        break;
                    case 3: // Sinistra
                        this.x = -10;
                        this.y = Math.random() * h;
                        break;
                }
                
                this.angle = Math.random() * Math.PI * 2;
                this.speed = Math.random() * 2 + 0.5;
                this.color = colors[Math.floor(Math.random() * colors.length)];
                this.size = Math.random() * 3 + 1;
                this.trailLength = Math.floor(Math.random() * 8) + 4;
                this.trail = [];
                this.life = 0;
                this.maxLife = 200 + Math.random() * 300;
            }
            
            update() {
                this.life++;
                
                // Movimento basato sull'angolo
                this.x += Math.cos(this.angle) * this.speed;
                this.y += Math.sin(this.angle) * this.speed;
                
                // Aggiungi punto alla scia
                this.trail.push({x: this.x, y: this.y});
                if (this.trail.length > this.trailLength) {
                    this.trail.shift();
                }
                
                // Reset se esce dallo schermo o vita terminata
                if (this.x < -50 || this.x > w + 50 || 
                    this.y < -50 || this.y > h + 50 ||
                    this.life > this.maxLife) {
                    this.reset();
                }
            }
            
            draw() {
                // Disegna la scia
                for (let i = 0; i < this.trail.length; i++) {
                    const point = this.trail[i];
                    const alpha = i / this.trail.length * 0.7;
                    const size = this.size * (i / this.trail.length);
                    
                    ctx.beginPath();
                    ctx.arc(point.x, point.y, size, 0, Math.PI * 2);
                    ctx.fillStyle = this.color.replace(')', `, ${alpha})`).replace('rgb', 'rgba');
                    ctx.fill();
                }
                
                // Disegna la testa della cometa
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();
                
                // Aggiungi un piccolo bagliore
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size * 1.5, 0, Math.PI * 2);
                const gradient = ctx.createRadialGradient(
                    this.x, this.y, 0,
                    this.x, this.y, this.size * 1.5
                );
                gradient.addColorStop(0, this.color.replace(')', ', 0.8)').replace('rgb', 'rgba'));
                gradient.addColorStop(1, this.color.replace(')', ', 0)').replace('rgb', 'rgba'));
                ctx.fillStyle = gradient;
                ctx.fill();
            }
        }
        
        function init() {
            resizeCanvas();
            
            // Crea 50 cometine
            for (let i = 0; i < 30; i++) {
                comets.push(new TinyComet());
                // Distribuisci l'inizio nel tempo
                comets[i].life = Math.random() * 100;
            }
            
            animate();
        }
        
        function animate() {
            ctx.clearRect(0, 0, w, h);
            
            // Sfumo leggero per effetto scia persistente
            ctx.fillStyle = 'rgba(10,10,26,0.1)';
            ctx.fillRect(0, 0, w, h);
            
            comets.forEach(comet => {
                comet.update();
                comet.draw();
            });
            
            requestAnimationFrame(animate);
        }
        
        window.addEventListener('resize', resizeCanvas);
        
        // Avvia quando la pagina è caricata
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
        } else {
            init();
        }
    })();

/* === SISTEMA DI ESPLOSIONE CORRETTO === */
document.addEventListener('DOMContentLoaded', function() {
  let explodingText = document.getElementById('exploding');
  if (!explodingText) {
    explodingText = Array.from(document.querySelectorAll('h1,h2,h3,p,span,.hero-title,.headline,.motto'))
      .find(el => el.textContent && el.textContent.includes('Sustine et abstine'));
  }
  const explodeBtn = document.querySelector('#btn-explode');
  const explosionSound = document.getElementById('explosionSound');
  if (!explodingText) return;

  // AGGIUNGI CSS FISSO PRIMA DI TUTTO
  const explosionStyles = `
    .explosion-char {
      display: inline-block;
      will-change: transform, opacity, filter;
    }
    
    .exploding-text.boom-active .explosion-char {
      animation: none !important; /* Disabilita animazioni CSS conflittuali */
    }
    
   .mega-shockwave {
    position: fixed;
    border-radius: 50%;
    background: radial-gradient(circle, 
        rgba(255,255,255,1) 0%, 
        rgba(255,215,0,0.9) 15%, 
        rgba(255,100,0,0.7) 30%, 
        rgba(0,204,255,0.5) 50%,
        transparent 70%
    );
    animation: megaShockwave 1.5s ease-out forwards;
    z-index: 2147483601;
    pointer-events: none;
}

@keyframes megaShockwave {
    0% { 
        transform: translate(-50%, -50%) scale(0.1); 
        opacity: 1; 
    }
    100% { 
        transform: translate(-50%, -50%) scale(25);  /* AUMENTA QUESTO VALORE! */
        opacity: 0; 
    }
}
    
    .mega-particle {
      position: fixed;
      border-radius: 50%;
      animation: megaParticleFly 2s ease-out forwards;
      z-index: 2147483600;
      pointer-events: none;
    }
    
    @keyframes megaParticleFly {
      0% { transform: translate(0, 0) scale(1); opacity: 1; }
      100% { transform: translate(var(--p-dx), var(--p-dy)) scale(0); opacity: 0; }
    }
  `;
  
  const styleSheet = document.createElement('style');
  styleSheet.textContent = explosionStyles;
  document.head.appendChild(styleSheet);

  const clean = s => (s||'')
    .normalize('NFC')
    .replace(/[\uFEFF\u200B-\u200D\u2060]/g, '')
    .replace(/\uFFFD/g, '');

  // PREPARAZIONE SEMPLIFICATA
  function prepareExplosion() {
    if (explodingText.__split) return;
    const text = clean(explodingText.textContent);
    explodingText.__originalText = text;
    explodingText.classList.add('exploding-text');
    explodingText.innerHTML = '';
    
    for (let i = 0; i < text.length; i++) {
      const charSpan = document.createElement('span');
      charSpan.className = 'explosion-char';
      charSpan.textContent = text[i];
      charSpan.style.setProperty('--index', i);
      explodingText.appendChild(charSpan);
    }
    explodingText.__split = true;
  }

  // EFFETTI VISIVI SEMPLIFICATI
  function createShockwave(element) {
    const rect = element.getBoundingClientRect();
    const shockwave = document.createElement('div');
    shockwave.className = 'mega-shockwave';
    shockwave.style.left = (rect.left + rect.width / 2) + 'px';
    shockwave.style.top = (rect.top + rect.height / 2) + 'px';
    shockwave.style.width = '90px';
    shockwave.style.height = '90px';
    document.body.appendChild(shockwave);
    setTimeout(() => shockwave.remove(), 1500);
  }

  function createParticles(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      particle.className = 'mega-particle';
      particle.style.left = centerX + 'px';
      particle.style.top = centerY + 'px';
      particle.style.setProperty('--p-dx', (Math.random() * 600 - 300) + 'px');
      particle.style.setProperty('--p-dy', (Math.random() * 400 - 300) + 'px');
      
      const size = 4 + Math.random() * 8;
      particle.style.width = size + 'px';
      particle.style.height = size + 'px';
      particle.style.background = ['#ff0000', '#ffd700', '#00ccff', '#b967ff'][i % 4];
      
      document.body.appendChild(particle);
      setTimeout(() => particle.remove(), 2000);
    }
  }

  // ANIMAZIONE PRINCIPALE CORRETTA
  function explodeTarget(element) {
    if (!element || element.__exploding) return;
    element.__exploding = true;

    // Audio
    if (explosionSound) {
      try {
        explosionSound.currentTime = 0;
        explosionSound.volume = 0.7;
        explosionSound.play().catch(() => {});
      } catch(_) {}
    }

    // Reset stato visivo
    element.classList.remove('boom-recomposing');
    element.classList.add('boom-active');
    element.style.border = '2px solid rgba(255,215,0,0.5)';

    // Effetti
    createShockwave(element);
    createParticles(element);

    const spans = Array.from(element.querySelectorAll('.explosion-char'));
    if (!spans.length) {
      prepareExplosion();
      return setTimeout(() => explodeTarget(element), 100);
    }

    let finished = 0;
    
    spans.forEach((span, index) => {
      // RESET PREVENTIVO
      span.style.transform = 'translate(0px, 0px) rotate(0deg)';
      span.style.opacity = '1';
      span.style.filter = 'blur(0px)';
      
      const dx = (Math.random() * 400 - 200);
      const dy = (Math.random() * 300 - 250);
      const rotation = (Math.random() * 360 - 180);
      const delay = index * 15;
      const duration = 800 + Math.random() * 400;

      // ANIMAZIONE USCITA - USA Web Animations API
      const exitKeyframes = [
        { 
          transform: 'translate(0px, 0px) rotate(0deg)',
          opacity: 1,
          filter: 'blur(0px)'
        },
        { 
          transform: `translate(${dx}px, ${dy}px) rotate(${rotation}deg)`,
          opacity: 0,
          filter: 'blur(8px)'
        }
      ];

      const exitAnimation = span.animate(exitKeyframes, {
        duration: duration,
        delay: delay,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
        fill: 'forwards'
      });

      // ANIMAZIONE RIENTRO - ATTESA ESPLICITA
      exitAnimation.onfinish = () => {
        setTimeout(() => {
          const returnKeyframes = [
            { 
              transform: `translate(${dx}px, ${dy}px) rotate(${rotation}deg)`,
              opacity: 0,
              filter: 'blur(8px)'
            },
            { 
              transform: 'translate(0px, 0px) rotate(0deg)',
              opacity: 1,
              filter: 'blur(0px)'
            }
          ];

          const returnAnimation = span.animate(returnKeyframes, {
            duration: duration * 0.8,
            easing: 'cubic-bezier(0.2, 0.8, 0.4, 1.2)',
            fill: 'forwards'
          });

          returnAnimation.onfinish = () => {
            // RESET FINALE ESPLICITO
            span.style.transform = 'translate(0px, 0px) rotate(0deg)';
            span.style.opacity = '1';
            span.style.filter = 'blur(0px)';
            
            finished++;
            
            if (finished === spans.length) {
              // PULIZIA FINALE
              element.classList.remove('boom-active');
              element.classList.add('boom-recomposing');
              
              setTimeout(() => {
                element.classList.remove('boom-recomposing');
                element.style.border = '';
                element.__exploding = false;
              }, 300);
            }
          };
        }, 300); // Ritardo fisso per il rientro
      };
    });
  }

  // INIZIALIZZAZIONE
  prepareExplosion();

  // EVENT LISTENERS
  if (explodeBtn) {
    explodeBtn.addEventListener('click', function(e){
      e.preventDefault();
      explodeTarget(explodingText);
    });
  }

  explodingText.addEventListener('click', function(){
    explodeTarget(this);
  });

  console.log('✅ Sistema esplosione caricato - Lettere si ricomporranno!');
});

// Helper semplificato
function softPlay(audio, volume, delay) {
  if (!audio) return Promise.reject('Audio element not found');
  return new Promise((resolve) => {
    setTimeout(() => {
      try {
        audio.volume = volume || 1.0;
        audio.muted = false;
        audio.play().then(resolve).catch(resolve);
      } catch (e) { resolve(); }
    }, delay || 0);
  });
}

// FUNZIONE TOPRELATED COMPLETATA
function topRelated(query, exclude, limit = 3) {
    const q = norm(query);
    if (!q) return [];
    
    const scored = INDEX
        .map(it => ({ it, s: score(q, it) }))
        .filter(x => x.s > 0 && !exclude.has(x.it.url))
        .sort((a, b) => b.s - a.s)
        .slice(0, limit)
        .map(x => x.it);
    
    return scored;
}

(function(){
  const motto = document.getElementById('exploding');
  if(!motto) return;
  let textEl = motto.querySelector('.m-text') || motto;
  if(!textEl.querySelector('.char')){
    const txt = textEl.textContent;
    textEl.textContent = '';
    for(const ch of [...txt]){
      const s = document.createElement('span');
      s.className = 'char';
      s.textContent = ch === ' ' ? ' ' : ch;
      textEl.appendChild(s);
    }
  }

  if(!document.querySelector('.fx-layer')){
    const layer = document.createElement('div');
    layer.className = 'fx-layer';
    layer.innerHTML = '<div class="fx-flash"></div><div class="fx-shock"></div><div class="fx-smoke"></div><canvas class="fx-embers"></canvas>';
    document.body.appendChild(layer);
  }
  const layer = document.querySelector('.fx-layer');
  const flash = layer.querySelector('.fx-flash');
  const shock = layer.querySelector('.fx-shock');
  const smoke = layer.querySelector('.fx-smoke');
  const canvas = layer.querySelector('.fx-embers');
  const ctx = canvas.getContext('2d');
  function resize(){ canvas.width = innerWidth; canvas.height = innerHeight; }
  resize(); addEventListener('resize', resize);

  const prefersReduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let animating = false;

  function centerOf(el){
    const r = el.getBoundingClientRect();
    return { x: r.left + r.width/2, y: r.top + r.height/2 };
  }

  let sparks = [];
  function seedSparks(x,y,count){
    for(let i=0;i<count;i++){
      const a = Math.random()*Math.PI*2;
      const sp = 2 + Math.random()*6;
      sparks.push({ x,y, vx: Math.cos(a)*sp, vy: Math.sin(a)*sp - (Math.random()*2), life: 40+Math.random()*50, age: 0, r: 1+Math.random()*2 });
    }
  }
  function tick(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for(let i=sparks.length-1;i>=0;i--){
      const s=sparks[i];
      s.age++;
      s.vy += 0.06; s.vx *= 0.99; s.vy *= 0.995;
      s.x += s.vx; s.y += s.vy;
      const t = 1 - (s.age/s.life);
      if(t<=0){ sparks.splice(i,1); continue; }
      ctx.globalAlpha = Math.max(0,t);
      const g = ctx.createRadialGradient(s.x,s.y,0,s.x,s.y,s.r*3);
      g.addColorStop(0,'rgba(255,240,180,1)');
      g.addColorStop(1,'rgba(255,120,0,0)');
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(s.x,s.y,s.r,0,Math.PI*2); ctx.fill();
    }
    if(animating) requestAnimationFrame(tick);
  }

  function shake(intensity, duration){
    const start = performance.now();
    (function step(now){
      const t = (now-start)/duration;
      if(t>=1){ document.body.style.transform=''; return; }
      const n = 1 - t;
      const dx = (Math.random()*2-1)*intensity*n;
      const dy = (Math.random()*2-1)*intensity*n;
      document.body.style.transform = 'translate('+dx+'px,'+dy+'px)';
      requestAnimationFrame(step);
    })(start);
  }

  function explode(){
    if(prefersReduce || animating) return;
    animating = true;

    const chars = [...textEl.querySelectorAll('.char')];
    motto.classList.add('preglow');
    flash.style.opacity = 1;
    setTimeout(()=> flash.style.opacity = 0, 120);

    shock.style.opacity = 1; shock.style.transform = 'translate(-50%,-50%) scale(.25)';
    smoke.style.opacity = .25; smoke.style.transform = 'translate(-50%,-50%) scale(.4)';
    const start = performance.now(), DUR=680;
    (function loop(now){
      const t = Math.min(1,(now-start)/DUR);
      const ease = t<.5 ? 2*t*t : -1+(4-2*t)*t;
      shock.style.transform = 'translate(-50%,-50%) scale('+(.25 + ease*2.0)+')';
      shock.style.opacity = String(1 - t);
      smoke.style.transform = 'translate(-50%,-50%) scale('+(.4 + ease*1.4)+')';
      smoke.style.opacity = String(.25 * (1 - t));
      if(t<1) requestAnimationFrame(loop);
    })(start);

    const {x:cx,y:cy}=centerOf(textEl);
    chars.forEach((ch)=>{
      const b = ch.getBoundingClientRect();
      const ox=b.left+b.width/2, oy=b.top+b.height/2;
      const dx=ox-cx, dy=oy-cy;
      const dist=Math.hypot(dx,dy)||1;
      const dirx=dx/dist, diry=dy/dist;
      const power = 90 + Math.random()*160;
      const rot = (Math.random()*720-360);
      const delay = (dist/600)*180;
      ch.style.willChange='transform,opacity';
      setTimeout(()=>{
        ch.animate([
          { transform:'translate3d(0,0,0) rotate(0deg)', opacity:1 },
          { transform:'translate3d('+(dirx*power)+'px,'+(diry*power)+'px,0) rotate('+rot+'deg)', opacity:0 }
        ], { duration: 620 + Math.random()*320, easing:'cubic-bezier(.2,.9,.2,1)', fill:'forwards' });
      }, delay);
    });

    const c = centerOf(textEl);
    seedSparks(c.x,c.y,110);
    tick();
    shake(4,380);

    setTimeout(()=>{ motto.classList.remove('preglow'); animating=false; }, 1200);
  }

  // Trigger: se esiste un bottone con id btn-explode
  const btn = document.getElementById('btn-explode');
  if(btn) btn.addEventListener('click', explode);

  // Esporta API globale minimale:
  window.EchiExplode = explode;
})();

  // === PULSANTE TORNA SU ===
(function(){
    const backToTop = document.getElementById('backToTop');
    if (!backToTop) return;
    
    // Mostra/nascondi il pulsante durante lo scroll
    function toggleBackToTop() {
        if (window.scrollY > 300) {
            backToTop.style.display = 'flex';
        } else {
            backToTop.style.display = 'none';
        }
    }
    
    // Scroll fluido verso l'alto
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    
    // Event listeners
    window.addEventListener('scroll', toggleBackToTop);
    backToTop.addEventListener('click', scrollToTop);
    
    // Anche con tasto Enter per accessibilità
    backToTop.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            scrollToTop();
        }
    });
    
    // Inizializza
    toggleBackToTop();
})();

// RICERCA SICURA CON CONTROLLI
document.addEventListener('DOMContentLoaded', function() {
    try {
        const input = document.getElementById('site-search');
        const wrap = input && input.closest('.search-container');
        
        if (wrap && input) {
            wrap.addEventListener('click', function(e) {
                // Se clicchi ovunque nel riquadro, il focus va all'input
                if (e.target !== input && document.body.contains(input)) {
                    input.focus();
                }
            });
            console.log('✅ Search container inizializzato');
        } else {
            console.warn('ℹ️ Search container non trovato');
        }
    } catch (error) {
        console.error('❌ Errore inizializzazione search:', error);
    }
});

(function(){
  try{
    window.showSearchPanelOnResults = function(panelSel, items){
      var panel = document.querySelector(panelSel || '#search-panel, #searchPanel, .search-panel');
      if(!panel) return;
      if(items && items.length){ panel.style.display = 'block'; panel.removeAttribute('aria-hidden'); }
    };
  }catch(_){}
})();


</body> -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.8/ScrollMagic.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.8/plugins/animation.gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/howler/2.2.3/howler.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/2.11.6/umd/popper.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/tippy.js/6.3.7/tippy-bundle.umd.min.js"></script>
<script src="script.js"></script>
<script>
// === ESPLOSIONE CHE SCUOTE LA PAGINA ===
function createPageShakingExplosion() {
    // Crea l'effetto visivo dell'esplosione
    const explosionOverlay = document.createElement('div');
    explosionOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: radial-gradient(circle at center, 
            rgba(255,255,255,0.8) 0%,
            rgba(255,215,0,0.6) 20%,
            rgba(255,100,0,0.4) 40%,
            rgba(255,0,0,0.2) 60%,
            transparent 80%
        );
        pointer-events: none;
        z-index: 2147483600;
        opacity: 0;
        animation: explosionFlash 0.8s ease-out;
    `;
    
    // Aggiungi i keyframes per l'esplosione
    const explosionStyle = document.createElement('style');
    explosionStyle.textContent = `
        @keyframes explosionFlash {
            0% { 
                opacity: 0; 
                transform: scale(0.1);
            }
            20% { 
                opacity: 1; 
                transform: scale(1.2);
            }
            40% { 
                opacity: 0.8; 
                transform: scale(1.5);
            }
            100% { 
                opacity: 0; 
                transform: scale(2);
            }
        }
        
        @keyframes shakePage {
            0%, 100% { transform: translateX(0) translateY(0) rotate(0); }
            10% { transform: translateX(-10px) translateY(-5px) rotate(-1deg); }
            20% { transform: translateX(8px) translateY(4px) rotate(1deg); }
            30% { transform: translateX(-6px) translateY(-3px) rotate(-0.5deg); }
            40% { transform: translateX(4px) translateY(2px) rotate(0.5deg); }
            50% { transform: translateX(-2px) translateY(-1px) rotate(-0.25deg); }
            60% { transform: translateX(1px) translateY(0.5px) rotate(0.25deg); }
        }
        
        .page-shake {
            animation: shakePage 0.8s ease-out;
        }
    `;
    
    document.head.appendChild(explosionStyle);
    document.body.appendChild(explosionOverlay);
    
    // Applica l'effetto di scuotimento a tutto il body
    document.body.classList.add('page-shake');
    
    // Riproduci il suono dell'esplosione se disponibile
    const explosionSound = document.getElementById('explosionSound');
    if (explosionSound) {
        explosionSound.currentTime = 0;
        explosionSound.volume = 0.7;
        explosionSound.play().catch(e => console.log('Audio non riprodotto:', e));
    }
    
    // Crea particelle esplosive aggiuntive
    createExplosionParticles();
    
    // Rimuovi gli effetti dopo l'animazione
    setTimeout(() => {
        if (explosionOverlay.parentNode) {
            explosionOverlay.parentNode.removeChild(explosionOverlay);
        }
        document.body.classList.remove('page-shake');
        if (explosionStyle.parentNode) {
            explosionStyle.parentNode.removeChild(explosionStyle);
        }
    }, 800);
}

// Crea particelle esplosive che si diffondono sullo schermo
function createExplosionParticles() {
    const colors = ['#FFD700', '#FF6B00', '#FF0000', '#FFFFFF', '#00CCFF'];
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        const size = Math.random() * 15 + 5;
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        particle.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            border-radius: 50%;
            pointer-events: none;
            z-index: 2147483601;
            opacity: 0.8;
            box-shadow: 0 0 10px ${color};
        `;
        
        document.body.appendChild(particle);
        
        // Animazione casuale per ogni particella
        const angle = Math.random() * Math.PI * 2;
        const distance = 100 + Math.random() * 200;
        const duration = 0.5 + Math.random() * 0.5;
        
        particle.animate([
            {
                transform: 'translate(-50%, -50%) scale(1)',
                opacity: 0.8
            },
            {
                transform: `translate(${Math.cos(angle) * distance - 50}%, ${Math.sin(angle) * distance - 50}%) scale(0)`,
                opacity: 0
            }
        ], {
            duration: duration * 1000,
            easing: 'ease-out',
            fill: 'forwards'
        });
        
        // Rimuovi la particella dopo l'animazione
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, duration * 1000);
    }
}

// === ATTIVA L'ESPLOSIONE CON IL PULSANTE ESISTENTE ===
document.addEventListener('DOMContentLoaded', function() {
    const explodeBtn = document.getElementById('btn-explode');
    if (explodeBtn) {
        explodeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            createPageShakingExplosion();
        });
    }
    
    // Aggiungi anche l'esplosione al click sul motto
    const explodingText = document.getElementById('exploding');
    if (explodingText) {
        explodingText.addEventListener('click', function() {
            createPageShakingExplosion();
        });
    }
});

// === ESPLOSIONE AUTOMATICA AL CARICAMENTO (OPZIONALE) ===
// Rimuovi il commento se vuoi l'esplosione automatica all'avvio
/*
window.addEventListener('load', function() {
    setTimeout(() => {
        createPageShakingExplosion();
    }, 2000);
});
*/

(function(){
  try{
    window.showSearchPanelOnResults = function(panelSel, items){
      var panel = document.querySelector(panelSel || '#search-panel, #searchPanel, .search-panel');
      if(!panel) return;
      if(items && items.length){ panel.style.display = 'block'; panel.removeAttribute('aria-hidden'); }
    };
  }catch(_){}
})();

(function(){
  if (!('serviceWorker' in navigator)) return;
  window.addEventListener('load', function(){
    navigator.serviceWorker.register('/sw.js')
      .then(reg => console.log('✅ SW registrato:', reg.scope))
      .catch(err => console.error('❌ SW registration failed:', err));
  });
})();

(function () {
  // 1) Se siamo su /index.html ⇒ sostituisci in barra con /
  if (location.pathname.toLowerCase() === '/index.html') {
    const clean = '/' + (location.search || '') + (location.hash || '');
    history.replaceState(null, '', clean);
  }

  // 2) Rewriter dei link: se un <a> punta a index.html, trasformalo in /
  function rewriteAnchor(a) {
    const href = a.getAttribute('href') || '';
    if (/(^|\/)index\.html(\?|#|$)/i.test(href)) {
      // conserva query e hash
      const u = new URL(href, location.origin);
      a.setAttribute('href', '/' + (u.search || '') + (u.hash || ''));
    }
  }

  // iniziale
  document.querySelectorAll('a[href]').forEach(rewriteAnchor);

  // 3) Intercetta i click (anche su link generati dinamicamente) e forza /
  document.addEventListener('click', function (e) {
    const a = e.target.closest('a[href]');
    if (!a) return;
    const href = a.getAttribute('href') || '';
    if (/(^|\/)index\.html(\?|#|$)/i.test(href)) {
      e.preventDefault();
      const u = new URL(a.href, location.origin);
      // naviga a "/" preservando query e hash
      location.assign('/' + (u.search || '') + (u.hash || ''));
    }
  }, { capture: true });
})();
