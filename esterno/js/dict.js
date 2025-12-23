// ========== GESTIONE ERRORI GLOBALE ==========
window.addEventListener('error', function(e) {
  console.error('Errore globale:', e.error);
});

// Safe element selector con fallback
function safeQuery(selector, context = document) {
  try {
    return context.querySelector(selector);
  } catch (error) {
    console.warn(`Elemento ${selector} non trovato:`, error);
    return null;
  }
}

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
/* ===== FINE: ESPLOSIONE TEATRALE ===== */

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
