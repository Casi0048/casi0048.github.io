
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
/*! Dizionario filosofico – handler compatto */
document.addEventListener('DOMContentLoaded', () => {
  const form  = document.getElementById('dict-form');
  const input = document.getElementById('dict-q');
  if (!form || !input) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const q = input.value.trim();
    if (!q) return;

    const checks = form.querySelectorAll('.sources input[type="checkbox"]:checked');
    checks.forEach(chk => {
      const urlTpl = chk.dataset.url || '';
      let finalURL;

      if (/treccani\.it/i.test(urlTpl)) {
        finalURL = treccaniURL(q, TRECCANI_SECTION);  // 'vocabolario' o 'enciclopedia'
      } else if (/wikipedia\.org/i.test(urlTpl)) {
        finalURL = wikipediaURL(q);
      } else {
        finalURL = urlTpl.replace('{q}', encodeURIComponent(q));
      }

      window.open(finalURL, '_blank', 'noopener');
    });
  });
});

/* ---- Config rapida ---- */
// Cambia qui se vuoi Treccani di default su enciclopedia
const TRECCANI_SECTION = 'vocabolario'; // oppure 'enciclopedia'

/* ---- Helpers ---- */
function slugifyIT(term) {
  return term.normalize('NFD').replace(/[\u0300-\u036f]/g, '') // virtù -> virtu
             .toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim();
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
