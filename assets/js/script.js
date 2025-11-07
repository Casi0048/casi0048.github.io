
// SLIDER VERTICALE - Velocità iniziale 5
class VerticalSlider {
    constructor() {
        this.sliderInner = document.getElementById('sliderInner');
        this.toggleBtn = document.getElementById('slider-toggle');
        this.invertBtn = document.getElementById('slider-invert');
        this.speedSlider = document.getElementById('slider-speed');
        
        this.isPlaying = true;
        this.direction = 1;
        this.speed = 5;
        this.animationId = null;
        this.position = 0;
        
        this.init();
    }
    
    createSpeedReadout() {
        const readout = document.createElement('span');
        readout.id = 'speed-readout';
        readout.textContent = '5';
        readout.style.cssText = `
            display: inline-block;
            min-width: 3.5ch;
            margin-left: .6rem;
            padding: .15rem .4rem;
            border-radius: .5rem;
            font-variant-numeric: tabular-nums;
            font-size: .9rem;
            line-height: 1.1;
            background: rgba(255,255,255,.15);
            border: 1px solid rgba(212,175,55,.55);
            box-shadow: 0 0 6px rgba(255,215,0,.25);
        `;
        this.speedSlider.parentNode.appendChild(readout);
        return readout;
    }
    
    init() {
        if (!this.sliderInner) {
            console.warn('Slider elements not found');
            return;
        }
        
        this.speedReadout = document.getElementById('speed-readout') || this.createSpeedReadout();
        
        // Event listeners
        this.toggleBtn.addEventListener('click', () => this.toggle());
        this.invertBtn.addEventListener('click', () => this.invert());
        this.speedSlider.addEventListener('input', (e) => this.setSpeed(e.target.value));
        
        // Espandi range velocità a 1-20
        this.speedSlider.min = 1;
        this.speedSlider.max = 20;
        this.speedSlider.value = 5;
        
        // Imposta velocità iniziale
        this.setSpeed(5);
        
        this.startAnimation();
    }
    
    setSpeed(value) {
        this.speed = parseInt(value);
        this.speedReadout.textContent = value;
        
        // Mappa valori a intervalli di tempo (più granulare)
        const speedMap = {
            1: 200,   // Molto lento
            2: 180,   // Molto lento
            3: 160,   // Lento
            4: 140,   // Lento
            5: 120,   // Lento-Medio ⭐ VELOCITÀ INIZIALE
            6: 100,   // Lento-Medio
            7: 80,    // Medio
            8: 60,    // Medio
            9: 50,    // Medio-Veloce
            10: 40,   // Medio-Veloce
            11: 35,   // Veloce
            12: 30,   // Veloce
            13: 25,   // Veloce
            14: 20,   // Molto veloce
            15: 15,   // Molto veloce
            16: 12,   // Estremamente veloce
            17: 10,   // Estremamente veloce
            18: 8,    // Massima velocità
            19: 6,    // Massima velocità
            20: 4     // Massima velocità
        };
        
        this.animationSpeed = speedMap[this.speed] || 50;
        
        if (this.isPlaying) {
            this.restartAnimation();
        }
    }
    
    toggle() {
        this.isPlaying = !this.isPlaying;
        this.toggleBtn.textContent = this.isPlaying ? '⏸️ Ferma' : '▶️ Avvia';
        this.toggleBtn.title = this.isPlaying ? 'Ferma slider' : 'Avvia slider';
        
        if (this.isPlaying) {
            this.startAnimation();
        } else {
            this.stopAnimation();
        }
    }
    
    invert() {
        this.direction *= -1;
        this.invertBtn.textContent = this.direction === 1 ? '🔄 Inverti' : '🔄 Normale';
        this.invertBtn.title = this.direction === 1 ? 'Inverti direzione' : 'Direzione normale';
    }
    
    startAnimation() {
        if (this.animationId) return;
        
        const animate = () => {
            // Movimento basato sulla velocità (più fluido)
            this.position += this.direction * (this.speed / 3);
            
            // Calcola dimensioni per il loop
            const containerHeight = this.sliderInner.parentElement.clientHeight;
            const contentHeight = this.sliderInner.scrollHeight;
            const maxScroll = Math.max(0, contentHeight - containerHeight);
            
            // Gestisci loop continuo
            if (this.position >= maxScroll) {
                this.position = 0;
            } else if (this.position < 0) {
                this.position = maxScroll;
            }
            
            this.sliderInner.style.transform = `translateY(-${this.position}px)`;
            this.animationId = requestAnimationFrame(animate);
        };
        
        this.animationId = requestAnimationFrame(animate);
    }
    
    stopAnimation() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }
    
    restartAnimation() {
        this.stopAnimation();
        this.startAnimation();
    }
    
    // Metodo per debug
    getStatus() {
        return {
            playing: this.isPlaying,
            direction: this.direction,
            speed: this.speed,
            position: Math.round(this.position),
            animationSpeed: this.animationSpeed + 'ms'
        };
    }
}

// Inizializza slider quando DOM è pronto
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        try {
            const slider = new VerticalSlider();
            console.log('✅ Vertical Slider initialized - Speed: 5');
            window.verticalSlider = slider; // Per debug
        } catch (error) {
            console.error('❌ Slider initialization failed:', error);
        }
    }, 100);
});
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
/*! Dizionario filosofico – handler unico */
document.addEventListener('DOMContentLoaded', () => {
  const form  = document.getElementById('dict-form');
  const input = document.getElementById('dict-q');
  if (!form || !input) {
    console.warn('EDS dizionario: form o input non trovati');
    return;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const q = input.value.trim();
    if (!q) return;

    const checks = form.querySelectorAll('.sources input[type="checkbox"]:checked');
    if (!checks.length) {
      console.warn('EDS dizionario: nessuna fonte selezionata');
      return;
    }

    checks.forEach((chk, i) => {
      const urlTpl = chk.dataset.url || '';
      let finalURL;

      if (/treccani\.it/i.test(urlTpl)) {
        finalURL = treccaniURL(q, TRECCANI_SECTION); // 'vocabolario' o 'enciclopedia'
      } else if (/wikipedia\.org/i.test(urlTpl)) {
        finalURL = wikipediaURL(q);
      } else {
        finalURL = urlTpl.replace('{q}', encodeURIComponent(q));
      }

      // Apri in nuove schede. Alcuni browser potrebbero bloccare molte schede:
      // prova con 1-2 fonti alla volta per test.
      window.open(finalURL, '_blank', 'noopener');
      if (i === 0) {
        console.log('EDS dizionario: aperta', finalURL);
      }
    });
  });
});

/* ---- Config rapida ---- */
const TRECCANI_SECTION = 'vocabolario'; // oppure 'enciclopedia'

/* ---- Helpers ---- */
function slugifyIT(term) {
  return term
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // virtù -> virtu
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim();
}
function treccaniURL(term, section = 'vocabolario') {
  const base = 'https://www.treccani.it';
  const simple = slugifyIT(term).replace(/\s+/g, ''); // "causa prima" -> "causaprima"
  return section === 'enciclopedia'
    ? `${base}/enciclopedia/${simple}/`
    : `${base}/vocabolario/${simple}/`;
}
function wikipediaURL(term) {
  return `https://it.wikipedia.org/wiki/${encodeURIComponent(term.trim().replace(/\s+/g, '_'))}`;
}

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
/* ===== ESPLOSIONE TEATRALE ===== */
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
/* =====FINE ESPLOSIONE TEATRALE ===== */

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
/* =====FINE PULSANTE TORNA SU ===== 
