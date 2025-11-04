// Aggiungi questo script per gestire lo slider
class VerticalSlider {
    constructor() {
        this.sliderInner = document.getElementById('sliderInner');
        this.toggleBtn = document.getElementById('slider-toggle');
        this.invertBtn = document.getElementById('slider-invert');
        this.speedSlider = document.getElementById('slider-speed');
        this.speedReadout = document.getElementById('speed-readout') || this.createSpeedReadout();
        
        this.isPlaying = true;
        this.direction = 1;
        this.speed = 8;
        this.animationId = null;
        this.position = 0;
        
        this.init();
    }
    
    createSpeedReadout() {
        const readout = document.createElement('span');
        readout.id = 'speed-readout';
        readout.textContent = '8';
        this.speedSlider.parentNode.appendChild(readout);
        return readout;
    }
    
    init() {
        // Event listeners
        this.toggleBtn.addEventListener('click', () => this.toggle());
        this.invertBtn.addEventListener('click', () => this.invert());
        this.speedSlider.addEventListener('input', (e) => this.setSpeed(e.target.value));
        
        // Espandi range velocità a 1-20
        this.speedSlider.min = 1;
        this.speedSlider.max = 20;
        this.speedSlider.value = 8;
        
        this.startAnimation();
    }
    
    setSpeed(value) {
        this.speed = parseInt(value);
        this.speedReadout.textContent = value;
        
        // Mappa valori a intervalli di tempo (più granulare)
        const speedMap = {
            1: 200,   // Molto lento
            5: 100,   // Lento
            8: 50,    // Normale
            12: 20,   // Veloce
            16: 10,   // Molto veloce
            20: 5     // Massima velocità
        };
        
        this.animationSpeed = speedMap[this.speed] || 50;
        
        if (this.isPlaying) {
            this.stopAnimation();
            this.startAnimation();
        }
    }
    
    toggle() {
        this.isPlaying = !this.isPlaying;
        this.toggleBtn.textContent = this.isPlaying ? '⏸️ Ferma' : '▶️ Avvia';
        
        if (this.isPlaying) {
            this.startAnimation();
        } else {
            this.stopAnimation();
        }
    }
    
    invert() {
        this.direction *= -1;
        this.invertBtn.textContent = this.direction === 1 ? '🔄 Inverti' : '🔄 Normale';
    }
    
    startAnimation() {
        if (this.animationId) return;
        
        const animate = () => {
            this.position += this.direction * (this.speed / 2);
            
            // Reset quando raggiunge la fine
            const maxScroll = this.sliderInner.scrollHeight - this.sliderInner.parentElement.clientHeight;
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
}

// Inizializza slider quando DOM è pronto
document.addEventListener('DOMContentLoaded', () => {
    new VerticalSlider();
});
(function(){
  const KEY = 'accent-theme';
  const order = ['gold','blue','green','red'];
  const saved = localStorage.getItem(KEY) || 'gold';
  applyAccent(saved);

  document.querySelectorAll('.welcome-switcher [data-variant]').forEach(btn=>{
    btn.addEventListener('click', ()=> applyAccent(btn.dataset.variant));
  });

  const title = document.getElementById('welcomeTitle');
  if (title) title.addEventListener('click', ()=>{
    const curr = localStorage.getItem(KEY) || 'gold';
    const next = order[(order.indexOf(curr)+1) % order.length];
    applyAccent(next);
  });

  function applyAccent(variant){
    if(!['gold','blue','green','red'].includes(variant)) variant = 'gold';
    if (variant === 'gold') document.body.removeAttribute('data-accent');
    else document.body.setAttribute('data-accent', variant);
    localStorage.setItem(KEY, variant);
    document.querySelectorAll('.welcome-switcher [data-variant]')
      .forEach(b => b.setAttribute('aria-pressed', b.dataset.variant===variant ? 'true':'false'));
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
            ctx.fillStyle = 'rgba(10, 10, 26, 0.1)';
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
/* ..explosion-theater-js. */
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
/* =========================
   timeline-bidirectional-scroll
========================= */
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
* === THEME TOGGLE FUNCTIONALITY === */
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
* === Timeline scroll reveal (IO) v2 === */
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
