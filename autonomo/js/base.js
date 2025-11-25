
// === PERFORMANCE & ERROR HANDLING - VERSIONE PULITA ===

document.addEventListener('DOMContentLoaded', function() {
  
  // 1. CARICAMENTO FONT AWESOME SEMPLIFICATO (senza preload problematico)
  const fontAwesomeCSS = document.createElement('link');
  fontAwesomeCSS.rel = 'stylesheet';
  fontAwesomeCSS.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css';
  fontAwesomeCSS.crossOrigin = 'anonymous';
  document.head.appendChild(fontAwesomeCSS);
  console.log('✅ Font Awesome caricato');

  // 2. LAZY LOADING IMMAGINI TIMELINE
  const lazyImages = document.querySelectorAll('.timeline-content img[data-src]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          safeEffect(() => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            img.classList.add('fade-in');
          }, () => {
            // Fallback: carica immediatamente
            img.src = img.dataset.src;
          });
          observer.unobserve(img);
        }
      });
    }, { 
      rootMargin: '50px 0px',
      threshold: 0.1
    });

    lazyImages.forEach(img => imageObserver.observe(img));
  } else {
    // Fallback per browser senza IntersectionObserver
    lazyImages.forEach(img => {
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
    });
  }

  // 3. GESTIONE ERRORI ROBUSTA
  function safeEffect(callback, fallback = null) {
    try {
      if (typeof callback === 'function') {
        callback();
      }
    } catch (error) {
      console.warn('Effect failed:', error.message);
      if (fallback && typeof fallback === 'function') {
        try {
          fallback();
        } catch (fallbackError) {
          console.error('Fallback also failed:', fallbackError);
        }
      }
    }
  }

  // 4. INIZIALIZZAZIONE SICURA EFFETTI STELLARI
  safeEffect(
    () => {
      // Qui va il tuo initStars() esistente
      if (typeof initStars === 'function') {
        initStars();
      } else {
        // Se initStars non esiste, fallback base
        createBasicStars();
      }
    },
    () => {
      console.log('Stars effect disabled due to performance issues');
      const starsContainer = document.getElementById('starsContainer');
      if (starsContainer) {
        starsContainer.style.display = 'none';
      }
    }
  );

  // 5. FALLBACK STELLE SEMPLIFICATO
  function createBasicStars() {
    const container = document.getElementById('starsContainer');
    if (!container) return;
    
    // Versione semplificata per performance
    for (let i = 0; i < 50; i++) {
      const star = document.createElement('div');
      star.className = 'star small';
      star.style.left = Math.random() * 100 + '%';
      star.style.top = Math.random() * 100 + '%';
      star.style.animationDelay = Math.random() * 5 + 's';
      container.appendChild(star);
    }
  }

  // 6. MONITORAGGIO PERFORMANCE - Versione sicura
  if ('performance' in window) {
    window.addEventListener('load', () => {
      safeDOMOperation(() => {
        // Usa l'API moderna se disponibile
        if (performance.getEntriesByType) {
          const navEntries = performance.getEntriesByType('navigation');
          if (navEntries.length > 0) {
            const navEntry = navEntries[0];
            const loadTime = navEntry.loadEventEnd - navEntry.startTime;
            if (loadTime > 0) {
              console.log(`Page loaded in ${Math.round(loadTime)}ms`);
            }
          }
        }
        // Fallback per browser più vecchi
        else if (performance.timing) {
          const timing = performance.timing;
          if (timing.loadEventEnd > 0 && timing.navigationStart > 0) {
            const loadTime = timing.loadEventEnd - timing.navigationStart;
            if (loadTime > 0) {
              console.log(`Page loaded in ${loadTime}ms`);
            }
          }
        }
      });
    });
  }

  // 7. GESTIONE ERRORI GLOBALE
  window.addEventListener('error', (event) => {
    console.error('Global error caught:', event.error);
    // Non bloccare l'esperienza utente per errori minori
  });

  // 8. GESTIONE OFFLINE
  window.addEventListener('online', () => {
    console.log('Connection restored');
    document.body.classList.remove('offline');
  });

  window.addEventListener('offline', () => {
    console.log('Connection lost');
    document.body.classList.add('offline');
  });

  // 9. CSS PER STATI SPECIALI
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
      .fade-in {
        animation: none;
      }
    }
  `;

 // Inietta CSS performance
const style = document.createElement('style');
style.textContent = performanceCSS;
document.head.appendChild(style);

console.log('✅ Sistema performance inizializzato');

});

// FUNZIONE safeDOMOperation - SOLO UNA VOLTA!
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

// === ESPLOSIONE CHE SCUOTE LA PAGINA - INTEGRATA ===
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
    
    // Aggiungi i keyframes per l'esplosione solo se non esistono già
    if (!document.getElementById('explosion-animations')) {
        const explosionStyle = document.createElement('style');
        explosionStyle.id = 'explosion-animations';
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
    }
    
    document.body.appendChild(explosionOverlay);
    
    // Applica l'effetto di scuotimento a tutto il body
    document.body.classList.add('page-shake');
    
    // Riproduci il suono dell'esplosione se disponibile
    const explosionSound = document.getElementById('explosionSound');
    if (explosionSound) {
        safeDOMOperation(() => {
            explosionSound.currentTime = 0;
            explosionSound.volume = 0.7;
            explosionSound.play().catch(e => console.log('Audio explosion non riprodotto:', e));
        });
    }
    
    // Crea particelle esplosive aggiuntive
    createExplosionParticles();
    
    // Rimuovi gli effetti dopo l'animazione
    setTimeout(() => {
        safeDOMOperation(() => {
            if (explosionOverlay.parentNode) {
                explosionOverlay.parentNode.removeChild(explosionOverlay);
            }
            document.body.classList.remove('page-shake');
        });
    }, 800);
}

// Crea particelle esplosive che si diffondono sullo schermo
function createExplosionParticles() {
    const colors = ['#FFD700', '#FF6B00', '#FF0000', '#FFFFFF', '#00CCFF'];
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        safeDOMOperation(() => {
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
            
            const animation = particle.animate([
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
            animation.onfinish = () => {
                safeDOMOperation(() => {
                    if (particle.parentNode) {
                        particle.parentNode.removeChild(particle);
                    }
                });
            };
        });
    }
}

// === INTEGRAZIONE CON IL CODICE ESISTENTE ===
document.addEventListener('DOMContentLoaded', function() {
    // Attiva l'esplosione con il pulsante esistente
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
        const originalClick = explodingText.onclick;
        explodingText.addEventListener('click', function(e) {
            // Esegui l'effetto originale se esiste
            if (typeof originalClick === 'function') {
                originalClick.call(this, e);
            }
            // Aggiungi l'esplosione della pagina
            createPageShakingExplosion();
        });
    }
    
    // Stili aggiuntivi per il pulsante esplosione
    const explosionStyles = `
        #btn-explode {
            background: linear-gradient(135deg, #ff6b00, #ff0000) !important;
            border: 2px solid rgba(255,255,255,0.5) !important;
            color: white !important;
            font-weight: bold !important;
            text-shadow: 0 1px 2px rgba(0,0,0,0.5) !important;
            box-shadow: 0 0 20px rgba(255,107,0,0.7) !important;
            transition: all 0.3s ease !important;
        }
        
        #btn-explode:hover {
            transform: scale(1.1) !important;
            box-shadow: 0 0 30px rgba(255,107,0,0.9) !important;
        }
        
        body {
            transform-origin: center center;
        }
    `;
    
    // Aggiungi gli stili solo se non esistono già
    if (!document.getElementById('explosion-styles')) {
        const styleEl = document.createElement('style');
        styleEl.id = 'explosion-styles';
        styleEl.textContent = explosionStyles;
        document.head.appendChild(styleEl);
    }
});

// ========== UTILITY SICURE AGGIUNTE ==========
// Safe DOM manipulation utility
function safeDOMOperation(operation) {
  try {
    if (typeof operation === 'function') {
      return operation();
    }
  } catch (error) {
    console.warn('DOM operation failed:', error.message);
    return null;
  }
}

// Safe element selector
function getElementSafe(selector) {
  return safeDOMOperation(() => {
    const element = typeof selector === 'string' ? 
      document.querySelector(selector) : selector;
    return element && document.body.contains(element) ? element : null;
  });
}

// Safe audio play
function softPlay(audio, volume, delay) {
  try {
    audio.volume = volume || 1.0;
    setTimeout(() => audio.play().catch(() => {}), delay || 0);
  } catch (_) {}
}

      document.addEventListener('DOMContentLoaded', ()=>{
        const effects = document.getElementById('effects-ctrl');
        if(effects && document.body.contains(effects)){
          const host = document.querySelector('.topbar, .top-bar, header .menu-desktop, header nav, header, .navbar');
          if(host && document.body.contains(host)){ 
            try{ 
              host.appendChild(effects); 
              effects.style.position=''; 
              effects.style.top=''; 
              effects.style.right=''; 
            }catch(_){ } 
          }
        }
      });

      // === SLIDER VERTICALE - VERSIONE VELOCITÀ MIGLIORATA ===
      (function(){
        const inner = document.getElementById('sliderInner');
        if(!inner) return;
        
        let pos = 0;
        let speed = 0.8; // VELOCITÀ BASE PIÙ ALTA
        let dir = 1;
        let running = true;
        
        function step(){
          if(!running){
            requestAnimationFrame(step);
            return;
          }
          pos += dir * speed;
          inner.style.transform = `translateY(${-pos}px)`;
          const total = inner.scrollHeight - inner.clientHeight;
          if(pos >= total) pos = 0;
          if(pos < 0) pos = total;
          requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
        
        const t = document.getElementById('slider-toggle'),
              i = document.getElementById('slider-invert'),
              sp = document.getElementById('slider-speed');
        
        t?.addEventListener('click', () => running = !running);
        i?.addEventListener('click', () => dir *= -1);
        
        // 🚀 REGOLAZIONE VELOCITÀ MIGLIORATA
        sp?.addEventListener('input', () => {
          const v = parseInt(sp.value, 10) || 5;
          
          // FORMULA MIGLIORATA: progressione più sensibile
          if(v <= 6) {
            speed = 0.2 + (v - 1) * 0.15;
          } else {
            speed = 0.2 + (v - 1) * 0.25;
          }
        });
        
        // Inizializza con velocità media
        if(sp) {
          sp.value = 8;
          sp.dispatchEvent(new Event('input'));
        }
      })();

      window.addEventListener('load',()=>{
        const a=document.getElementById('myAudio'),
              btn=document.getElementById('playPause'),
              tm=document.getElementById('time'),
              v=document.getElementById('volume');
        if(!a||!btn)return;
        function f(s){if(!isFinite(s))return'0:00';const m=Math.floor(s/60),c=Math.floor(s%60);return m+':'+(c<10?'0'+c:c)}
        function u(){tm.textContent=`${f(a.currentTime)} / ${f(a.duration)}`}
        v.value=.8;
        a.volume=parseFloat(v.value);
        btn.addEventListener('click',()=>{
          if(a.paused){
            a.play().catch(()=>{});
            btn.textContent='⏸️';
          }else{
            a.pause();
            btn.textContent='▶️';
          }
        });
        v.addEventListener('input',()=>a.volume=parseFloat(v.value));
        a.addEventListener('timeupdate',u);
        a.addEventListener('loadedmetadata',u);
        a.addEventListener('ended',()=>{btn.textContent='▶️'});
      });

      (function(){
        const b=document.getElementById('russell-btn'),
              h=document.getElementById('russell-hint'),
              a=document.getElementById('russell-audio');
        if(!b||!a)return;
        let u=false;
        function lk(){
          if(u)return;
          u=true;
          a.muted=false;
          a.play().then(()=>{a.pause();a.currentTime=0}).catch(()=>{});
          window.removeEventListener('pointerdown',lk,{capture:true});
          window.removeEventListener('keydown',lk,{capture:true});
        }
        window.addEventListener('pointerdown',lk,{once:true,capture:true,passive:true});
        window.addEventListener('keydown',lk,{once:true,capture:true});
        b.addEventListener('click',()=>{
          try{
            a.currentTime=0;
            a.play().catch(()=>{});
          }catch(_){ }
        });
      })();

      (function(){
        const btn=document.getElementById('btn-thunder'),
              th=document.getElementById('thunder-sound'),
              ex=document.getElementById('explosionSound'),
              ov=document.getElementById('lightning'),
              bo=document.getElementById('bolt');
        if(!btn||!th||!ov||!bo)return;
        let unlocked=false;
        async function unlockOnce(){
          if(unlocked)return;
          unlocked=true;
          for(const s of [th,ex]){
            try{
              s.muted=false;
              await s.play();
              s.pause();
              s.currentTime=0;
            }catch(_){}
          }
        }
        window.addEventListener('pointerdown',unlockOnce,{once:true,passive:true,capture:true});
        window.addEventListener('keydown',unlockOnce,{once:true,capture:true});
        let on=false;
        function up(){
          btn.classList.toggle('active',on);
          btn.setAttribute('aria-pressed',on?'true':'false');
          btn.textContent=on?'⚡ Tuono: ON':'⚡ Tuono';
        }
        btn.addEventListener('click',e=>{
          e.preventDefault();
          on=!on;
          if(on){
            try{
              th.currentTime=0;
              softPlay(th, 1.0, 140);
            }catch(_){}
          }else{
            try{
              th.pause();
              th.currentTime=0;
            }catch(_){}
          }
          up();
        });
        up();
        function flash(){
          const x=15+Math.random()*70,
                y=10+Math.random()*65,
                ang=-25+Math.random()*50,
                sy=.8+Math.random()*1.2;
          ov.style.transition='none';
          ov.offsetHeight;
          ov.style.background=`radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,.95), rgba(255,255,255,.22) 40%, transparent 65%)`;
          ov.style.opacity='1';
          ov.style.transition='opacity 80ms ease-out';
          setTimeout(()=>ov.style.opacity='0',140);
          bo.style.left=x+'%';
          bo.style.top=y+'%';
          bo.style.transform=`translate(-50%,-50%) rotate(${ang}deg) scaleY(${sy})`;
          bo.style.transition='transform 90ms ease-out, opacity 280ms ease-out';
          bo.style.opacity='1';
          setTimeout(()=>bo.style.opacity='0',180);
          if(on){
            try{
              th.currentTime=0;
              softPlay(th, 1.0, 140);
            }catch(_){}
          }
        }
        (function schedule(){
          setTimeout(()=>{
            flash();
            schedule();
          },10000+Math.random()*5000);
        })();
        document.getElementById('explode-btn')?.addEventListener('click',()=>{
          try{
            ex.muted=false;
            ex.volume=1.0;
            ex.currentTime=0;
            softPlay(ex, 1.0, 140);
          }catch(_){}
        });
      })();

<script id="search-init-smart">
      (function(){
        // Disattiva eventuale vecchio init (se presente)
        document.querySelectorAll('#search-init-robust').forEach(n => n.remove());
      
        const LIMIT = 20; // quante righe mostrare
        const input = document.getElementById('site-search');
        if (!input) return;
      
        // Pannello risultati: usa il tuo se c'è, altrimenti lo crea
        function ensurePanel(){
          let panel = document.querySelector('#search-panel, #searchPanel, .search-panel, .results-panel');
          if (!panel) {
            panel = document.createElement('div');
            panel.id = 'search-panel';
            panel.innerHTML = `
              <div class="search-header">
                <h4 class="search-title">Risultati della ricerca</h4>
                <button class="search-close" type="button" aria-label="Chiudi">Chiudi ✖</button>
              </div>
              <div id="search-results" class="search-results"></div>
            `;
            document.body.appendChild(panel);
          }
          // chiudi/ESC
          const closeBtn = panel.querySelector('.search-close, #search-close, [data-role="search-close"]');
          const close = ()=> panel.style.display='none';
          closeBtn && closeBtn.addEventListener('click', close);
          window.addEventListener('keydown', e=>{ if(e.key==='Escape') close(); });
          return panel;
        }
        const panel = ensurePanel();
        const resultsWrap = panel.querySelector('#search-results, .search-results, #searchResults');
      
        // ---------- caricamento indice ----------
        let INDEX = [];
        function haveIndex(){ return Array.isArray(INDEX) && INDEX.length; }
      
        function norm(s){
          const NORM_MAP = {'ł':'l','Ł':'l','ß':'ss','ø':'o','æ':'ae','œ':'oe'};
          return (s||'').toString().toLowerCase()
            .replace(/[łŁßøæœ]/g, m=>NORM_MAP[m]||m)
            .normalize('NFD').replace(/[\u0300-\u036f]/g,'')
            .replace(/\s+/g,' ').trim();
        }
        function escapeHTML(s){ return (s||'').replace(/[&<>"']/g, m=>({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[m])); }
        function hi(hay, q){ // evidenzia la query (semplice)
          if(!q) return escapeHTML(hay||'');
          const a = escapeHTML(hay||''); const n = norm(hay); const nq = norm(q);
          if(!nq) return a;
          // trova pos (prima occorrenza)
          const pos = n.indexOf(nq);
          if(pos<0) return a;
          // ricostruisci evidenziando il range (approssimando con lunghezze uguali: ok per ASCII)
          const pre  = escapeHTML((hay||'').slice(0,pos));
          const mid  = escapeHTML((hay||'').slice(pos, pos+nq.length));
          const post = escapeHTML((hay||'').slice(pos+nq.length));
          return `${pre}<mark>${mid}</mark>${post}`;
        }
      
        function score(query, item){
          const q = norm(query); if(!q) return 0;
          const t = norm(item.title), d = norm(item.desc), u = norm(item.url);
          // parziali: includes su titolo/desc/url
          let s = 0;
          if (t.includes(q)) s += 40;
          if (d.includes(q)) s += 20;
          if (u.includes(q)) s += 10;
          // piccoli bonus per token (migliora ordinamento)
          for (const tok of q.split(' ').filter(Boolean)){
            if (t.startsWith(tok+' ')||t.endsWith(' '+tok)||t.includes(' '+tok+' ')) s+=12;
            if (d.includes(tok)) s+=6;
          }
          return s;
        }
      
        async function loadIndex(){
          if (Array.isArray(window.SEARCH_INDEX) && window.SEARCH_INDEX.length){
            INDEX = window.SEARCH_INDEX;
            return;
          }
          const candidates = (window.SEARCH_INDEX_URLS && window.SEARCH_INDEX_URLS.length)
            ? window.SEARCH_INDEX_URLS
            : ['search-index.json','/search-index.json','/assets/search-index.json'];
          for (const url of candidates){
            try{
              const r = await fetch(url, {cache:'no-store'});
              if (r.ok) { INDEX = await r.json(); return; }
            }catch(e){}
          }
        }
      
        function render(results, q){
          resultsWrap.innerHTML = '';
          if (!results.length){
            resultsWrap.innerHTML = `<div class="result"><em>Nessun risultato</em></div>`;
            return;
          }
          for (const it of results.slice(0, LIMIT)){
            const title = hi(it.title, q);
            const desc  = hi(it.desc||'', q);
            const url   = escapeHTML(it.url||'#');
            const row = document.createElement('div');
            row.className = 'result';
            row.innerHTML = `
              <h4 class="result-title"><a href="${url}">${title}</a></h4>
              ${desc ? `<div class="result-desc">${desc}</div>` : ``}
              <div class="result-source">${escapeHTML((new URL(url, location.href)).hostname || '')}</div>
            `;
            resultsWrap.appendChild(row);
          }
        }
      
        function search(q){
          if(!haveIndex() || !q.trim()){
            panel.style.display = 'none';
            resultsWrap.innerHTML = '';
            return;
          }
          const ranked = INDEX
            .map(it => ({ it, s: score(q, it) }))
            .filter(x => x.s > 0)
            .sort((a,b)=> b.s - a.s)
            .map(x => x.it);
          panel.style.display = 'block';
          render(ranked, q);
        }
      
        // bind input (debounce leggero)
        let t = 0;
        input.addEventListener('input', ()=>{
          clearTimeout(t);
          const q = input.value;
          t = setTimeout(()=> search(q), 90);
        });
      
        // bootstrap: carica indice e se c'è testo in input, cerca subito
        loadIndex().then(()=>{ if (input.value.trim()) search(input.value); });
      })();
    
<script id="dict-compact-js">
(function(){
  const form = document.getElementById('dict-form');
  const input = document.getElementById('dict-q');
  if(!form || !input) return;
  
  form.addEventListener('submit', function(e){
    e.preventDefault();
    const q = (input.value || '').trim();
    if(!q) { 
      input.focus(); 
      return; 
    }
    
    const checks = form.querySelectorAll('.sources input[type="checkbox"]:checked');
    let opened = 0;
    
    checks.forEach(ch => {
      const tmpl = ch.getAttribute('data-url');
      if(!tmpl) return;
      const url = tmpl.replace('{q}', encodeURIComponent(q));
      const w = window.open(url, '_blank', 'noopener');
      if(w) opened++;
    });
    
    if(!opened){
      window.open('https://duckduckgo.com/?q=site%3Aiep.utm.edu+' + encodeURIComponent(q), '_blank', 'noopener');
    }
  });
})();



<script id="thunder-toggle-fix">
      (function(){
        const btn = document.getElementById('btn-thunder');
        const audio = document.getElementById('thunder-sound');
        const overlay = document.getElementById('lightning');
        const bolt = document.getElementById('bolt');
        if(!btn || !audio) return;
      
        // evita doppie bind: clona e rimpiazza
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
      
        // assicura che non vada in loop
        audio.loop = false;
      
        let playing = false;
        function ui() {
          newBtn.setAttribute('aria-pressed', playing ? 'true' : 'false');
          newBtn.textContent = playing ? '⚡ Tuono: ON' : '⚡ Tuono';
        }
        function flashOnce(){
          if(!(overlay && bolt)) return;
          overlay.style.opacity='1';
          setTimeout(()=> overlay.style.opacity='0', 140);
          bolt.style.left='70%'; bolt.style.top='20%';
          bolt.style.transform='translate(-50%,-50%) rotate(5deg) scaleY(1.1)';
          bolt.style.opacity='1';
          setTimeout(()=> bolt.style.opacity='0', 180);
        }
        function stop(){
          playing = false;
          try { audio.pause(); audio.currentTime = 0; } catch(_) {}
          ui();
        }
        function start(){
          playing = true;
          try { audio.currentTime = 0; audio.play().catch(()=>{}); } catch(_) {}
          flashOnce();
          ui();
          // 👇 se vuoi che si fermi da solo dopo 1.5s, decommenta:
          // setTimeout(stop, 1500);
        }
      
        newBtn.addEventListener('click', (e)=>{
          e.preventDefault();
          if (playing) stop(); else start();
        });
      
        // Esc per fermare
        window.addEventListener('keydown', (e)=>{ if(e.key === 'Escape') stop(); });
      
        // quando finisce naturalmente, aggiorna UI
        audio.addEventListener('ended', stop);
      
        ui();
      })();
  
<script id="audio-player-wrap-fix">
      // Se il genitore è un flex-row senza wrap, abilita il wrap così il player va sotto
      (function(){
        const ap = document.getElementById('audio-player');
        if(!ap) return;
        const parent = ap.parentElement;
        const cs = parent && getComputedStyle(parent);
        if (cs && cs.display.includes('flex') && cs.flexWrap === 'nowrap') {
          parent.style.flexWrap = 'wrap';
          // opzionale: distanza tra la riga dei controlli slider e il player
          parent.style.rowGap = parent.style.rowGap || '.5rem';
        }
      })();
   
<script id="search-related-augment">
      (function(){
        const input       = document.getElementById('site-search');
        const resultsWrap = document.querySelector('#search-results, .search-results, #searchResults');
        const INDEX       = Array.isArray(window.SEARCH_INDEX) ? window.SEARCH_INDEX : null;
        if(!input || !resultsWrap || !INDEX) return;
      
        // normalizza (accent-fold: it/pl ecc.)
        const NORM_MAP = {'ł':'l','Ł':'l','ß':'ss','ø':'o','æ':'ae','œ':'oe'};
        function norm(s){
          return (s||'').toString().toLowerCase()
            .replace(/[łŁßøæœ]/g, m=>NORM_MAP[m]||m)
            .normalize('NFD').replace(/[\u0300-\u036f]/g,'')
            .replace(/[^a-z0-9\s]/g,' ').replace(/\s+/g,' ').trim();
        }
      
        // scoring semplice: titolo >> descrizione > url + bonus per token match
        function score(query, item){
          const q = norm(query); if(!q) return 0;
          const t = norm(item.title), d = norm(item.desc), u = norm(item.url);
          let s=0;
          if(t===q) s+=100;
          if(t.includes(q)) s+=40;
          if(d.includes(q)) s+=20;
          if(u.includes(q)) s+=10;
          const toks = q.split(' ').filter(Boolean);
          for(const tok of toks){
            if(t.startsWith(tok+' ')||t.endsWith(' '+tok)||t.includes(' '+tok+' ')) s+=12;
            if(d.includes(tok)) s+=6;
            if(u.includes(tok)) s+=3;
          }
          return s;
        }
      
        function grabShownUrls(){
          const set = new Set();
          resultsWrap.querySelectorAll('a[href]').forEach(a=> set.add(a.getAttribute('href')));
          return set;
        }
      
        function topRelated(query, exclude, limit=6){
          return INDEX.map(it=>({it, s:score(query,it)}))
            .filter(x=>x.s>0 && !exclude.has(x.it.url))
            .sort((a,b)=>b.s-a.s)
            .slice(0, limit)
            .map(x=>x.it);
        }
      
        function ensureBox(){
          let box = document.getElementById('related-results');
          if(!box){
            box = document.createElement('div');
            box.id = 'related-results';
            box.className = 'related-results';
            box.innerHTML = '<h4 class="related-header">Risultati correlati (ricerca ampliata)</h4><ul class="related-list"></ul>';
            resultsWrap.appendChild(box);
          }
          return box;
        }
      
        function renderRelated(list){
          const box = ensureBox();
          const ul  = box.querySelector('.related-list');
          ul.innerHTML = '';
          list.forEach(it=>{
            const li = document.createElement('li');
            li.className = 'related-item';
            li.innerHTML = `<a href="${it.url}"><strong>${it.title}</strong></a>` +
                           (it.desc ? `<div class="meta">${it.desc}</div>` : '');
            ul.appendChild(li);
          });
          box.style.display = list.length ? 'block' : 'none';
        }
      
        function updateRelated(){
          const q = input.value || '';
          if(!q.trim()){ renderRelated([]); return; }
          const shown = grabShownUrls();
          // Se il pannello mostra *pochissimi* risultati (es. 0–1), proponi correlati
          const visibleItems = resultsWrap.querySelectorAll(':scope > *'); // fallback generico
          if(visibleItems.length <= 1){
            renderRelated(topRelated(q, shown, 6));
          }else{
            renderRelated([]);
          }
        }
      
        // osserva cambi al pannello + input
        const mo = new MutationObserver(()=> updateRelated());
        mo.observe(resultsWrap, {childList:true, subtree:true});
        input.addEventListener('input', ()=> setTimeout(updateRelated, 80));
        document.addEventListener('DOMContentLoaded', updateRelated);
      })();
  
<script id="search-clear-js">
document.addEventListener('DOMContentLoaded', ()=>{
  const input = document.getElementById('site-search');
  const box   = document.querySelector('.search-container');
  if(!input || !box) return;

  // crea il bottone solo se non esiste già
  let btn = box.querySelector('.clear-search');
  if(!btn){
    btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'clear-search';
    btn.setAttribute('aria-label','Cancella');
    box.appendChild(btn);
  }

  // fallback: mostra/nascondi anche dove :has non c'è
  function sync(){
    btn.style.display = input.value ? 'flex' : 'none';
  }
  input.addEventListener('input', sync);
  input.addEventListener('change', sync);

  // click: svuota, aggiorna risultati e rimetti focus
  btn.addEventListener('click', ()=>{
    input.value = '';
    input.dispatchEvent(new Event('input', {bubbles:true}));
    input.focus();
    sync();
  });

  // Esc cancella (comodo da tastiera)
  input.addEventListener('keydown', (e)=>{
    if(e.key === 'Escape'){
      e.preventDefault();
      btn.click();
    }
  });

  sync();
});
