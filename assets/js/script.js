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
