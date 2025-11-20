// === SLIDER VERTICALE - Velocità 1–20, barra colorata + numeretto ===
class VerticalSlider {
    constructor() {
        this.sliderInner = document.getElementById('sliderInner');
        this.toggleBtn   = document.getElementById('slider-toggle');
        this.invertBtn   = document.getElementById('slider-invert');
        this.speedSlider = document.getElementById('slider-speed');
        
        this.isPlaying   = true;
        this.direction   = 1;
        this.speed       = 5;
        this.position    = 0;
        this.animationId = null;
        this.animationSpeed = 120;

        this.init();
    }
    
   createSpeedReadout() {
    const readout = document.createElement('div');
    readout.id = 'speed-readout';
    readout.textContent = `Velocità: ${this.speed} / 20`;
    
    // ✅ POSIZIONAMENTO CORRETTO - DOPO la barra
    if (this.speedSlider && this.speedSlider.parentNode) {
        this.speedSlider.parentNode.appendChild(readout);
    }
    
    return readout;
}
    
    init() {
        if (!this.sliderInner) {
            console.warn('VerticalSlider: #sliderInner non trovato, slider disattivato');
            return;
        }

        this.speedReadout = document.getElementById('speed-readout') || this.createSpeedReadout();
        
        if (this.speedSlider) {
            this.speedSlider.min   = 1;
            this.speedSlider.max   = 20;
            this.speedSlider.value = 5;

            this.speedSlider.addEventListener('input', (e) => {
                this.setSpeed(e.target.value);
            });
        }

        if (this.toggleBtn) {
            this.toggleBtn.addEventListener('click', () => this.toggle());
        }

        if (this.invertBtn) {
            this.invertBtn.addEventListener('click', () => this.invert());
        }

        // Velocità iniziale (aggiorna anche barra + numeretto)
        this.setSpeed(5);

        this.startAnimation();
    }
    
    setSpeed(value) {
        this.speed = parseInt(value, 10) || 5;

        if (this.speedReadout) {
            this.speedReadout.textContent = `Velocità: ${this.speed} / 20`;
        }
        
        const speedMap = {
            1: 200,   2: 180,   3: 160,   4: 140,
            5: 120,   6: 100,   7: 80,    8: 60,
            9: 50,   10: 40,   11: 35,   12: 30,
           13: 25,   14: 20,   15: 15,   16: 12,
           17: 10,   18: 8,    19: 6,    20: 4
        };
        
        this.animationSpeed = speedMap[this.speed] || 50;

        // aggiorna barra
        this.updateSpeedBar();
        
        if (this.isPlaying) {
            this.restartAnimation();
        }
    }

    // Colore in base alla velocità (opzionale: puoi cambiarli)
    getSpeedColor() {
        if (this.speed <= 5)  return '#00ff7f';   // verde
        if (this.speed <= 10) return '#ffd700';   // giallo
        if (this.speed <= 15) return '#ffa500';   // arancione
        return '#ff4500';                         // rosso
    }

    updateSpeedBar() {
        if (!this.speedSlider) return;

        const min = parseInt(this.speedSlider.min, 10) || 1;
        const max = parseInt(this.speedSlider.max, 10) || 20;
        const val = this.speed;
        const percent = ((val - min) / (max - min)) * 100;
        const color = this.getSpeedColor();

        // Un solo gradient: parte piena colorata, poi barra neutra
        this.speedSlider.style.background = `
          linear-gradient(
            90deg,
            ${color} 0%,
            ${color} ${percent}%,
            rgba(255,255,255,0.15) ${percent}%,
            rgba(255,255,255,0.15) 100%
          )
        `;
    }
    
    toggle() {
        this.isPlaying = !this.isPlaying;

        if (this.toggleBtn) {
            this.toggleBtn.textContent = this.isPlaying ? '⏸️ Ferma' : '▶️ Avvia';
            this.toggleBtn.title       = this.isPlaying ? 'Ferma slider' : 'Avvia slider';
        }
        
        if (this.isPlaying) {
            this.startAnimation();
        } else {
            this.stopAnimation();
        }
    }
    
    invert() {
        this.direction *= -1;

        if (this.invertBtn) {
            this.invertBtn.textContent = this.direction === 1 ? '🔄 Inverti' : '🔄 Normale';
            this.invertBtn.title       = this.direction === 1 ? 'Inverti direzione' : 'Direzione normale';
        }
    }
    
    startAnimation() {
        if (this.animationId) return;
        
        const animate = () => {
            this.position += this.direction * (this.speed / 3);
            
            const container = this.sliderInner.parentElement;
            if (!container) return;

            const containerHeight = container.clientHeight;
            const contentHeight   = this.sliderInner.scrollHeight;
            const maxScroll       = Math.max(0, contentHeight - containerHeight);
            
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
            window.verticalSlider = slider;
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
    .replace(/[^a-z00\s-]/g, '')
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

/* ===== ESPLOSIONE TEATRALE - VERSIONE MIGLIORATA ===== */
(function(){
    'use strict'; // <-- Aggiungi per sicurezza
    
    const motto = document.getElementById('exploding');
    if(!motto) {
        console.warn('❌ Elemento #exploding non trovato');
        return;
    }

    let textEl = motto.querySelector('.m-text') || motto;
    
    // Creazione caratteri con gestione errori
    if(!textEl.querySelector('.char')){
        try {
            const txt = textEl.textContent;
            textEl.textContent = '';
            for(const ch of [...txt]){
                const s = document.createElement('span');
                s.className = 'char';
                s.textContent = ch === ' ' ? '\u00A0' : ch; // Usa non-breaking space
                s.setAttribute('aria-hidden', 'true'); // Accessibilità
                textEl.appendChild(s);
            }
        } catch (error) {
            console.error('❌ Errore creazione caratteri:', error);
        }
    }

    // Creazione layer effetti con fallback
    if(!document.querySelector('.fx-layer')){
        try {
            const layer = document.createElement('div');
            layer.className = 'fx-layer';
            layer.setAttribute('aria-hidden', 'true');
            layer.innerHTML = '<div class="fx-flash"></div><div class="fx-shock"></div><div class="fx-smoke"></div><canvas class="fx-embers"></canvas>';
            document.body.appendChild(layer);
        } catch (error) {
            console.error('❌ Errore creazione layer effetti:', error);
        }
    }

    const layer = document.querySelector('.fx-layer');
    if (!layer) return;

    const flash = layer.querySelector('.fx-flash');
    const shock = layer.querySelector('.fx-shock');
    const smoke = layer.querySelector('.fx-smoke');
    const canvas = layer.querySelector('.fx-embers');
    
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        console.warn('❌ Canvas context non supportato');
        return;
    }

    function resize(){ 
        canvas.width = innerWidth; 
        canvas.height = innerHeight; 
    }
    
    resize(); 
    addEventListener('resize', resize);

    const prefersReduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let animating = false;

    function explode(){
        if(prefersReduce || animating) {
            console.log('🚫 Animazione disabilitata (reduced motion o già in corso)');
            return;
        }
        animating = true;
        console.log('💥 Esplosione attivata!');

        // ... resto del codice invariato ...
    }

    // Trigger con gestione errori
    const btn = document.getElementById('btn-explode');
    if(btn) {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            try {
                explode();
            } catch (error) {
                console.error('❌ Errore durante esplosione:', error);
            }
        });
    } else {
        console.warn('⚠️ Bottone #btn-explode non trovato');
    }

    // Esporta API globale con fallback
    window.EchiExplode = explode || function(){ 
        console.warn('🚫 Funzione esplosione non disponibile'); 
    };
    
    console.log('✅ Sistema esplosione teatrale caricato');
})();

/* ===== PULSANTE TORNA SU (compat Safari) ===== */
(() => {
  'use strict';

  const ready = (fn) => {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn, { once: true });
  };

  ready(() => {
    const btn = document.getElementById('backToTop');
    if (!btn) {
      console.warn('❌ backToTop non trovato');
      return;
    }

    const se = document.scrollingElement || document.documentElement;
    const getScrollTop = () =>
      se.scrollTop || window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    const toggle = () => {
      if (getScrollTop() > 300) {
        btn.classList.add('is-visible');
      } else {
        btn.classList.remove('is-visible');
      }
    };

    const scrollToTop = () => {
      if (se.scrollTo) {
        se.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        se.scrollTop = 0;
      }
    };

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          toggle();
          ticking = false;
        });
        ticking = true;
      }
    };

    // SOLO QUESTI EVENT LISTENER - NIENTE ALTRO!
    window.addEventListener('scroll', onScroll, { passive: true });
    btn.addEventListener('click', scrollToTop);
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        scrollToTop();
      }
    });

    // Inizializza
    toggle();
  });
})();

/* ===== TIMELINE COSMICA - VERSIONE SICURA ===== */
function initCosmicTimeline() {
  try {
    const timelineItems = document.querySelectorAll('.timeline-item');
    console.log('🎯 Timeline items trovati:', timelineItems.length);

    if (!timelineItems.length) {
      console.warn('❌ Nessun .timeline-item trovato!');
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const item = entry.target;
          const index = Array.from(timelineItems).indexOf(item);
          
          console.log('🚀 Animando item:', index);
          
          item.style.setProperty('--item-index', index);
          void item.offsetWidth; // Reflow
          item.classList.add('visible');
          
          console.log('✅ Classe "visible" aggiunta a item', index);
          observer.unobserve(item);
        }
      });
    }, {
      threshold: 0.05,
      rootMargin: '0px 0px -10% 0px'
    });

    timelineItems.forEach(item => observer.observe(item));
    
  } catch (error) {
    console.error('❌ Errore in initCosmicTimeline:', error);
  }
}

// INIZIALIZZAZIONE PRINCIPALE
document.addEventListener('DOMContentLoaded', function () {
  console.log('🎬 Inizializzazione applicazione');

  // Timeline con delay (animazioni "cosmiche")
  setTimeout(initCosmicTimeline, 1000);

  // Effetti extra sulla timeline (click + reveal)
  initTimelineInteractions();
});

// Re-init al resize
window.addEventListener('resize', initCosmicTimeline);

// Gestione errori globale - SOLO LOG, NON silenzia
window.addEventListener('error', function (e) {
  console.error('❌ Errore globale:', {
    message: e.message,
    file: e.filename,
    line: e.lineno,
    column: e.colno,
    error: e.error
  });
});

// Aggiunge effetti interattivi alla timeline
function initTimelineInteractions() {
  const timelineContents = document.querySelectorAll('.timeline-content');

  // Click per espandere/comprimere i contenuti
  timelineContents.forEach(item => {
    item.addEventListener('click', function () {
      this.classList.toggle('expanded');
    });
  });

  // Effetto scroll reveal (fadeInUp)
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.timeline-item').forEach(item => {
    observer.observe(item);
  });
}

/* === SCRIPT PARADIGMA ========================================================= */
document.addEventListener('DOMContentLoaded', function() {
    const btn = document.getElementById('paradigma-btn');
    const overlay = document.getElementById('filosofi-overlay');
    
    if (!btn || !overlay) return;
    
    let hideTimeout;
    
    function showOverlay() {
        clearTimeout(hideTimeout);
        
        // ✅ CALCOLO CENTRATURA DINAMICA INTELLIGENTE
        const btnRect = btn.getBoundingClientRect();
        const overlayWidth = overlay.offsetWidth;
        const viewportWidth = window.innerWidth;
        
        // Calcola la posizione ideale per centrare
        let leftPosition = btnRect.left + (btnRect.width / 2) - (overlayWidth / 2);
        
        // ✅ CONTROLLO BORDI SCHERMO
        // Se l'overlay esce a sinistra
        if (leftPosition < 20) {
            leftPosition = 20;
        }
        // Se l'overlay esce a destra
        if (leftPosition + overlayWidth > viewportWidth - 20) {
            leftPosition = viewportWidth - overlayWidth - 20;
        }
        
        // Applica la posizione calcolata
        overlay.style.left = leftPosition + 'px';
        overlay.style.transform = 'none'; // Rimuovi transform per posizionamento assoluto
        
        overlay.classList.add('show');
    }
    
    function hideOverlay() {
        hideTimeout = setTimeout(() => {
            overlay.classList.remove('show');
        }, 300);
    }
    
    // Event listeners
    btn.addEventListener('mouseenter', showOverlay);
    btn.addEventListener('mouseleave', hideOverlay);
    overlay.addEventListener('mouseenter', () => clearTimeout(hideTimeout));
    overlay.addEventListener('mouseleave', hideOverlay);
    
    // ✅ RICALCOLA POSIZIONE AL RESIZE
    window.addEventListener('resize', function() {
        if (overlay.classList.contains('show')) {
            showOverlay(); // Ricalcola la posizione
        }
    });
    
    // Chiudi con ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && overlay.classList.contains('show')) {
            hideOverlay();
        }
    });
});

// QUOTE BUBBLE MANAGEMENT
document.addEventListener('DOMContentLoaded', function() {
    const quotes = document.querySelectorAll('.quote-bubble');
    
    quotes.forEach(quote => {
        // Click per rimuovere
        quote.addEventListener('click', function() {
            this.classList.add('fade-out');
            setTimeout(() => {
                this.style.display = 'none';
            }, 500);
        });
        
        // Ricomparsa dopo 30 secondi
        setTimeout(() => {
            if (quote.style.display === 'none') {
                quote.style.display = 'block';
                quote.classList.remove('fade-out');
            }
        }, 30000);
    });
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
    .replace(/[^a-z00\s-]/g, '')
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

/* ===== ESPLOSIONE TEATRALE - VERSIONE MIGLIORATA ===== */
(function(){
    'use strict'; // <-- Aggiungi per sicurezza
    
    const motto = document.getElementById('exploding');
    if(!motto) {
        console.warn('❌ Elemento #exploding non trovato');
        return;
    }

    let textEl = motto.querySelector('.m-text') || motto;
    
    // Creazione caratteri con gestione errori
    if(!textEl.querySelector('.char')){
        try {
            const txt = textEl.textContent;
            textEl.textContent = '';
            for(const ch of [...txt]){
                const s = document.createElement('span');
                s.className = 'char';
                s.textContent = ch === ' ' ? '\u00A0' : ch; // Usa non-breaking space
                s.setAttribute('aria-hidden', 'true'); // Accessibilità
                textEl.appendChild(s);
            }
        } catch (error) {
            console.error('❌ Errore creazione caratteri:', error);
        }
    }

    // Creazione layer effetti con fallback
    if(!document.querySelector('.fx-layer')){
        try {
            const layer = document.createElement('div');
            layer.className = 'fx-layer';
            layer.setAttribute('aria-hidden', 'true');
            layer.innerHTML = '<div class="fx-flash"></div><div class="fx-shock"></div><div class="fx-smoke"></div><canvas class="fx-embers"></canvas>';
            document.body.appendChild(layer);
        } catch (error) {
            console.error('❌ Errore creazione layer effetti:', error);
        }
    }

    const layer = document.querySelector('.fx-layer');
    if (!layer) return;

    const flash = layer.querySelector('.fx-flash');
    const shock = layer.querySelector('.fx-shock');
    const smoke = layer.querySelector('.fx-smoke');
    const canvas = layer.querySelector('.fx-embers');
    
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        console.warn('❌ Canvas context non supportato');
        return;
    }

    function resize(){ 
        canvas.width = innerWidth; 
        canvas.height = innerHeight; 
    }
    
    resize(); 
    addEventListener('resize', resize);

    const prefersReduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let animating = false;

    function explode(){
        if(prefersReduce || animating) {
            console.log('🚫 Animazione disabilitata (reduced motion o già in corso)');
            return;
        }
        animating = true;
        console.log('💥 Esplosione attivata!');

        // ... resto del codice invariato ...
    }

    // Trigger con gestione errori
    const btn = document.getElementById('btn-explode');
    if(btn) {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            try {
                explode();
            } catch (error) {
                console.error('❌ Errore durante esplosione:', error);
            }
        });
    } else {
        console.warn('⚠️ Bottone #btn-explode non trovato');
    }

    // Esporta API globale con fallback
    window.EchiExplode = explode || function(){ 
        console.warn('🚫 Funzione esplosione non disponibile'); 
    };
    
    console.log('✅ Sistema esplosione teatrale caricato');
})();

/* ===== PULSANTE TORNA SU (compat Safari) ===== */
(() => {
  'use strict';

  const ready = (fn) => {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn, { once: true });
  };

  ready(() => {
    const btn = document.getElementById('backToTop');
    if (!btn) {
      console.warn('❌ backToTop non trovato');
      return;
    }

    const se = document.scrollingElement || document.documentElement;
    const getScrollTop = () =>
      se.scrollTop || window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    const toggle = () => {
      if (getScrollTop() > 300) {
        btn.classList.add('is-visible');
      } else {
        btn.classList.remove('is-visible');
      }
    };

    const scrollToTop = () => {
      if (se.scrollTo) {
        se.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        se.scrollTop = 0;
      }
    };

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          toggle();
          ticking = false;
        });
        ticking = true;
      }
    };

    // SOLO QUESTI EVENT LISTENER - NIENTE ALTRO!
    window.addEventListener('scroll', onScroll, { passive: true });
    btn.addEventListener('click', scrollToTop);
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        scrollToTop();
      }
    });

    // Inizializza
    toggle();
  });
})();

/* ===== TIMELINE COSMICA - VERSIONE SICURA ===== */
function initCosmicTimeline() {
  try {
    const timelineItems = document.querySelectorAll('.timeline-item');
    console.log('🎯 Timeline items trovati:', timelineItems.length);

    if (!timelineItems.length) {
      console.warn('❌ Nessun .timeline-item trovato!');
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const item = entry.target;
          const index = Array.from(timelineItems).indexOf(item);
          
          console.log('🚀 Animando item:', index);
          
          item.style.setProperty('--item-index', index);
          void item.offsetWidth; // Reflow
          item.classList.add('visible');
          
          console.log('✅ Classe "visible" aggiunta a item', index);
          observer.unobserve(item);
        }
      });
    }, {
      threshold: 0.05,
      rootMargin: '0px 0px -10% 0px'
    });

    timelineItems.forEach(item => observer.observe(item));
    
  } catch (error) {
    console.error('❌ Errore in initCosmicTimeline:', error);
  }
}

// INIZIALIZZAZIONE PRINCIPALE
document.addEventListener('DOMContentLoaded', function () {
  console.log('🎬 Inizializzazione applicazione');

  // Timeline con delay (animazioni "cosmiche")
  setTimeout(initCosmicTimeline, 1000);

  // Effetti extra sulla timeline (click + reveal)
  initTimelineInteractions();
});

// Re-init al resize
window.addEventListener('resize', initCosmicTimeline);

// Gestione errori globale - SOLO LOG, NON silenzia
window.addEventListener('error', function (e) {
  console.error('❌ Errore globale:', {
    message: e.message,
    file: e.filename,
    line: e.lineno,
    column: e.colno,
    error: e.error
  });
});

// Aggiunge effetti interattivi alla timeline
function initTimelineInteractions() {
  const timelineContents = document.querySelectorAll('.timeline-content');

  // Click per espandere/comprimere i contenuti
  timelineContents.forEach(item => {
    item.addEventListener('click', function () {
      this.classList.toggle('expanded');
    });
  });

  // Effetto scroll reveal (fadeInUp)
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.timeline-item').forEach(item => {
    observer.observe(item);
  });
}

/* === SCRIPT PARADIGMA ========================================================= */
document.addEventListener('DOMContentLoaded', function() {
    const btn = document.getElementById('paradigma-btn');
    const overlay = document.getElementById('filosofi-overlay');
    
    if (!btn || !overlay) return;
    
    let hideTimeout;
    
    function showOverlay() {
        clearTimeout(hideTimeout);
        
        // ✅ CALCOLO CENTRATURA DINAMICA INTELLIGENTE
        const btnRect = btn.getBoundingClientRect();
        const overlayWidth = overlay.offsetWidth;
        const viewportWidth = window.innerWidth;
        
        // Calcola la posizione ideale per centrare
        let leftPosition = btnRect.left + (btnRect.width / 2) - (overlayWidth / 2);
        
        // ✅ CONTROLLO BORDI SCHERMO
        // Se l'overlay esce a sinistra
        if (leftPosition < 20) {
            leftPosition = 20;
        }
        // Se l'overlay esce a destra
        if (leftPosition + overlayWidth > viewportWidth - 20) {
            leftPosition = viewportWidth - overlayWidth - 20;
        }
        
        // Applica la posizione calcolata
        overlay.style.left = leftPosition + 'px';
        overlay.style.transform = 'none'; // Rimuovi transform per posizionamento assoluto
        
        overlay.classList.add('show');
    }
    
    function hideOverlay() {
        hideTimeout = setTimeout(() => {
            overlay.classList.remove('show');
        }, 300);
    }
    
    // Event listeners
    btn.addEventListener('mouseenter', showOverlay);
    btn.addEventListener('mouseleave', hideOverlay);
    overlay.addEventListener('mouseenter', () => clearTimeout(hideTimeout));
    overlay.addEventListener('mouseleave', hideOverlay);
    
    // ✅ RICALCOLA POSIZIONE AL RESIZE
    window.addEventListener('resize', function() {
        if (overlay.classList.contains('show')) {
            showOverlay(); // Ricalcola la posizione
        }
    });
    
    // Chiudi con ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && overlay.classList.contains('show')) {
            hideOverlay();
        }
    });
});

// QUOTE BUBBLE MANAGEMENT
document.addEventListener('DOMContentLoaded', function() {
    const quotes = document.querySelectorAll('.quote-bubble');
    
    quotes.forEach(quote => {
        // Click per rimuovere
        quote.addEventListener('click', function() {
            this.classList.add('fade-out');
            setTimeout(() => {
                this.style.display = 'none';
            }, 500);
        });
        
        // Ricomparsa dopo 30 secondi
        setTimeout(() => {
            if (quote.style.display === 'none') {
                quote.style.display = 'block';
                quote.classList.remove('fade-out');
            }
        }, 30000);
    });
});
// === Slider velocità: colore barra + numeretto =========================
document.addEventListener('DOMContentLoaded', () => {
  const speed = document.getElementById('slider-speed');
  if (!speed) {
    console.warn('⚠️ #slider-speed non trovato');
    return;
  }

  // Crea / recupera il numeretto sotto
  let readout = document.getElementById('speed-readout');
  if (!readout) {
    readout = document.createElement('div');
    readout.id = 'speed-readout';
    speed.insertAdjacentElement('afterend', readout);
  }

  const min = parseInt(speed.min, 10) || 1;
  const max = parseInt(speed.max, 10) || 20;

  function updateSpeedUI() {
    const val = parseInt(speed.value, 10) || min;
    const percent = ((val - min) / (max - min)) * 100;

    // riempimento barra – usa i CSS con var(--fill)
    speed.style.setProperty('--fill', `${percent}%`);

    // numeretto
    readout.textContent = `Velocità: ${val} / ${max}`;
  }

  // aggiorna quando muovi la barretta
  speed.addEventListener('input', updateSpeedUI);

  // iniziale (alla load)
  updateSpeedUI();
});
sp?.addEventListener('input', () => {
  const v = parseInt(sp.value, 10) || 5;
  
  // FORMULA MIGLIORATA: progressione più sensibile
  if(v <= 6) {
    speed = 0.2 + (v - 1) * 0.15;
  } else {
    speed = 0.2 + (v - 1) * 0.25;
  }
  
  // AGGIORNA NUMERETTO
  const readout = document.getElementById('speed-readout');
  if(readout) readout.textContent = v;
});
  // AGGIORNA NUMERETTO
  const readout = document.getElementById('speed-readout');
  if(readout) readout.textContent = v;
});
  // AGGIORNA NUMERETTO
  const readout = document.getElementById('speed-readout');
  if(readout) readout.textContent = v;
});
/* === INIZIO JS SPOSTATI20 NOBEMBRE ========== */
// === ESPLOSIONE + SCIAME PARTICELLE - VERSIONE SPETTACOLARE ===
document.addEventListener('DOMContentLoaded', function() {
  const explodingText = document.getElementById('exploding');
  const explodeBtn = document.getElementById('btn-explode');
  const explosionSound = document.getElementById('explosionSound');
  
  if (!explodingText) return;
// AGGIUNGI CSS AL DOCUMENTO
  const style = document.createElement('style');
  style.textContent = explosionCSS;
  document.head.appendChild(style);

  // FUNZIONE COLORI CASUALI
  function getRandomColor() {
    const colors = [
      '#FF6B00', '#FF0000', '#00CCFF', '#B967FF', 
      '#FFD700', '#00FF88', '#FF00FF', '#FFFFFF',
      '#FF4500', '#00FFFF', '#FF1493', '#7CFC00'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  // CREA SCIAME DI PARTICELLE
  function createParticleSwarm(element, particleCount = 50) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'explosion-particle';
      
      // POSIZIONE INIZIALE
      particle.style.left = centerX + 'px';
      particle.style.top = centerY + 'px';
      
      // DIREZIONE CASUALE
      const angle = Math.random() * Math.PI * 2;
      const distance = 50 + Math.random() * 200;
      const dx = Math.cos(angle) * distance;
      const dy = Math.sin(angle) * distance;
      
      particle.style.setProperty('--particle-dx', dx + 'px');
      particle.style.setProperty('--particle-dy', dy + 'px');
      
      // DIMENSIONE E COLORE
      const size = 2 + Math.random() * 8;
      particle.style.width = size + 'px';
      particle.style.height = size + 'px';
      particle.style.background = getRandomColor();
      
      // EFFETTO GLOW PER METÀ DELLE PARTICELLE
      if (Math.random() > 0.5) {
        particle.classList.add('particle-glow');
      }
      
      // DURATA ANIMAZIONE VARIABILE
      const duration = 1000 + Math.random() * 1000;
      particle.style.animationDuration = duration + 'ms';
      
      // AGGIUNGI AL DOCUMENTO
      document.body.appendChild(particle);
      
      // RIMUOVI DOPO L'ANIMAZIONE
      setTimeout(() => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      }, duration + 100);
    }
  }

  // CREA PARTICELLE A FORMA DI STELLA
  function createStarParticles(element, count = 20) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < count; i++) {
      const star = document.createElement('div');
      star.className = 'explosion-particle';
      star.textContent = '✦';
      star.style.fontSize = (10 + Math.random() * 20) + 'px';
      star.style.color = getRandomColor();
      star.style.background = 'transparent';
      star.style.left = centerX + 'px';
      star.style.top = centerY + 'px';
      
      const angle = (i / count) * Math.PI * 2;
      const distance = 80 + Math.random() * 150;
      const dx = Math.cos(angle) * distance;
      const dy = Math.sin(angle) * distance;
      
      star.style.setProperty('--particle-dx', dx + 'px');
      star.style.setProperty('--particle-dy', dy + 'px');
      star.style.animationDuration = (1200 + Math.random() * 800) + 'ms';
      
      document.body.appendChild(star);
      setTimeout(() => {
        if (star.parentNode) star.parentNode.removeChild(star);
      }, 2500);
    }
  }

// FUNZIONE PRINCIPALE DI ESPLOSIONE

  function triggerExplosion() {
    if (explodingText.classList.contains('exploding')) return;

    // SUONO ESPLOSIONE
    if (explosionSound) {
      try {
        explosionSound.currentTime = 0;
        explosionSound.volume = 0.7;
        explosionSound.play().catch(e => console.log('Audio non riprodotto'));
      } catch(e) {}
    }

    // SCUOTI LA PAGINA
    document.body.classList.add('exploding-active');
    setTimeout(() => {
      document.body.classList.remove('exploding-active');
    }, 800);

    // 🔥 CREA SCIAME DI PARTICELLE
    createParticleSwarm(explodingText, 60); // 60 particelle normali
    createStarParticles(explodingText, 15); // 15 particelle a stella
    
    // PARTICELLE ADDIZIONALI RITARDATE
    setTimeout(() => {
      createParticleSwarm(explodingText, 30); // Altro sciame dopo un po'
    }, 200);

    // ESPLODI OGNI CARATTERE
    const chars = explodingText.querySelectorAll('.char');
    let completed = 0;

    chars.forEach((char, index) => {
      const distance = 30 + Math.random() * 70;
      const angle = Math.random() * Math.PI * 2;
      const dx = Math.cos(angle) * distance;
      const dy = Math.sin(angle) * distance;
      const rotation = (Math.random() - 0.5) * 360;
      
      char.style.setProperty('--explode-dx', dx + 'px');
      char.style.setProperty('--explode-dy', dy + 'px');
      char.style.setProperty('--explode-rotate', rotation + 'deg');
      
      const delay = index * 40;
      
      const animation = char.animate([
        {
          transform: 'translate(0, 0) rotate(0deg) scale(1)',
          opacity: 1,
          filter: 'blur(0px)',
          color: 'currentColor'
        },
        {
          transform: `translate(${dx}px, ${dy}px) rotate(${rotation}deg) scale(1.3)`,
          opacity: 0.7,
          filter: 'blur(3px)',
          color: getRandomColor()
        },
        {
          transform: `translate(${dx * 0.3}px, ${dy * 0.3}px) rotate(${rotation * 0.3}deg) scale(1.1)`,
          opacity: 0.9,
          filter: 'blur(1px)',
          color: 'currentColor'
        },
        {
          transform: 'translate(0, 0) rotate(0deg) scale(1)',
          opacity: 1,
          filter: 'blur(0px)',
          color: 'currentColor'
        }
      ], {
        duration: 800,
        delay: delay,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
        fill: 'forwards'
      });

      animation.onfinish = () => {
        completed++;
        char.style.transform = '';
        char.style.opacity = '';
        char.style.filter = '';
        char.style.color = '';
        
        if (completed === chars.length) {
          explodingText.classList.remove('exploding');
          
          // PARTICELLE FINALI DI CHIUSURA
          setTimeout(() => {
            createParticleSwarm(explodingText, 20);
          }, 100);
        }
      };
    });

    explodingText.classList.add('exploding');
    explodingText.style.transition = 'all 0.3s ease';
    explodingText.style.transform = 'scale(1.05)';
    explodingText.style.filter = 'brightness(1.3)';
    
    setTimeout(() => {
      explodingText.style.transform = '';
      explodingText.style.filter = '';
    }, 500);
  }

  // EVENT LISTENERS
  if (explodeBtn) {
    explodeBtn.addEventListener('click', function(e) {
      e.preventDefault();
      triggerExplosion();
    });
  }

  explodingText.addEventListener('click', function(e) {
    e.preventDefault();
    triggerExplosion();
  });

  console.log('💥💫 Sistema esplosione + particelle pronto!');
});

// TEST AUTOMATICO
setTimeout(() => {
  console.log('🔍 Test sistema particelle...');
  const testChars = document.querySelectorAll('.char');
  console.log('Caratteri pronti:', testChars.length);
  
  // Test visivo particelle
  setTimeout(() => {
    console.log('✅ Sistema particelle caricato - Pronto per esplodere!');
  }, 500);
}, 1000);
/* === RIPLE ========== */
// === FUNZIONE RIPPLE SUPER INTENSA ===
function createIntenseRippleEffect() {
    const rippleConfigs = [
        {
            class: 'ripple-intense-1 ripple-animation-fast',
            size: 60,
            delay: 0
        },
        {
            class: 'ripple-intense-2 ripple-animation-fast',
            size: 100,
            delay: 50
        },
        {
            class: 'ripple-intense-3 ripple-animation-medium',
            size: 150,
            delay: 100
        },
        {
            class: 'ripple-intense-4 ripple-animation-medium',
            size: 200,
            delay: 150
        },
        {
            class: 'ripple-intense-5 ripple-animation-slow',
            size: 250,
            delay: 200
        },
        {
            class: 'ripple-intense-1 ripple-animation-huge',
            size: 300,
            delay: 250
        },
        {
            class: 'ripple-intense-2 ripple-animation-huge',
            size: 400,
            delay: 300
        },
        {
            class: 'ripple-intense-3 ripple-animation-huge',
            size: 500,
            delay: 350
        }
    ];

    rippleConfigs.forEach((config, index) => {
        setTimeout(() => {
            const ripple = document.createElement('div');
            ripple.className = `explosion-ripple ${config.class}`;
            ripple.style.width = `${config.size}px`;
            ripple.style.height = `${config.size}px`;
            
            // Aggiungi un po' di variazione casuale alla posizione
            const randomX = (Math.random() - 0.5) * 20;
            const randomY = (Math.random() - 0.5) * 15;
            ripple.style.transform = `translate(calc(-50% + ${randomX}px), calc(-50% + ${randomY}px))`;
            
            document.body.appendChild(ripple);

            // Rimuovi dopo l'animazione
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.parentNode.removeChild(ripple);
                }
            }, 3000);

        }, config.delay);
    });
}

// === FUNZIONE ESPLOSIONE MEGA INTENSA ===
function megaExplosion() {
    console.log('💥💥💥 MEGA ESPLOSIONE ATTIVATA!');
    
    // SEQUENZA IPER-INTENSA:
    
    // T+0ms: Flash nucleare + Scossa pagina potente
    createFlashEffect('intense');
    shakePage();
    
    // T+20ms: Primi ripple esplosivi
    setTimeout(() => {
        createIntenseRippleEffect();
    }, 20);
    
    // T+50ms: Aurora boreale super colorata
    setTimeout(() => {
        createAuroraEffect();
    }, 50);
    
    // T+100ms: Secondo flash
    setTimeout(() => {
        createFlashEffect('normal');
    }, 100);
    
    // T+200ms: Terzo flash (debole)
    setTimeout(() => {
        createFlashEffect('normal');
    }, 200);
    
    // T+300ms: Ripple aggiuntivi casuali
    setTimeout(() => {
        createRandomRipples();
    }, 300);
    
    // T+400ms: Esplosione particelle
    setTimeout(() => {
        if (typeof createExplosionParticles === 'function') {
            createExplosionParticles();
        }
    }, 400);
    
    // SUONO ESPLOSIONE MASSIMA
    const explosionSound = document.getElementById('explosionSound');
    if (explosionSound) {
        try {
            explosionSound.currentTime = 0;
            explosionSound.volume = 1.0;
            explosionSound.play().catch(() => {});
        } catch (_) {}
    }
}

// === RIPPLE RANDOM AGGIUNTIVI ===
function createRandomRipples() {
    for (let i = 0; i < 6; i++) {
        setTimeout(() => {
            const randomX = 30 + Math.random() * 40;
            const randomY = 30 + Math.random() * 40;
            const randomSize = 30 + Math.random() * 100;
            const randomColor = Math.floor(Math.random() * 5) + 1;
            
            const ripple = document.createElement('div');
            ripple.className = `explosion-ripple ripple-intense-${randomColor} ripple-animation-fast`;
            ripple.style.width = `${randomSize}px`;
            ripple.style.height = `${randomSize}px`;
            ripple.style.left = `${randomX}%`;
            ripple.style.top = `${randomY}%`;
            ripple.style.transform = 'translate(-50%, -50%)';
            
            document.body.appendChild(ripple);

            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.parentNode.removeChild(ripple);
                }
            }, 2000);
            
        }, i * 80);
    }
}

// === AGGIORNA LA FUNZIONE PRINCIPALE ===
function enhancedExplosion() {
    // Usa la versione MEGA per massima intensità
    megaExplosion();
}

// === SCOSSA PAGINA PIÙ FORTE ===
function shakePage() {
    // Aggiungi una classe più intensa
    document.documentElement.classList.add('page-shake');
    
    // Rimuovi dopo l'animazione
    setTimeout(() => {
        document.documentElement.classList.remove('page-shake');
    }, 800);
}

// Aggiorna il CSS della scossa per renderla più intensa
const intenseShakeCSS = `
.page-shake {
    animation: pageShake 0.8s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
}

@keyframes pageShake {
    0%, 100% { transform: translateX(0) translateY(0) rotate(0deg) scale(1); }
    10% { transform: translateX(-15px) translateY(-8px) rotate(-1.5deg) scale(1.03); }
    20% { transform: translateX(12px) translateY(6px) rotate(1.2deg) scale(0.97); }
    30% { transform: translateX(-10px) translateY(-4px) rotate(-0.8deg) scale(1.02); }
    40% { transform: translateX(8px) translateY(2px) rotate(0.6deg) scale(0.985); }
    50% { transform: translateX(-6px) translateY(-1px) rotate(-0.3deg) scale(1.01); }
    60% { transform: translateX(4px) translateY(0px) rotate(0.2deg) scale(0.995); }
    70%, 100% { transform: translateX(0) translateY(0) rotate(0deg) scale(1); }
}
`;

// Inietta il CSS della scossa intensa
const style = document.createElement('style');
style.textContent = intenseShakeCSS;
document.head.appendChild(style);
/* === RESET & VARIABLES ========== */
// === FUNZIONE EFFETTO LAMPOSCOOP ===
function createFlashEffect(intensity = 'normal') {
    let flashOverlay = document.getElementById('flash-overlay');
    if (!flashOverlay) {
        flashOverlay = document.createElement('div');
        flashOverlay.id = 'flash-overlay';
        document.body.appendChild(flashOverlay);
    }
    
    if (intensity === 'intense') {
        flashOverlay.classList.add('intense');
    } else {
        flashOverlay.classList.remove('intense');
    }
    
    // Flash immediato
    flashOverlay.style.opacity = '1';
    
    setTimeout(() => {
        flashOverlay.style.opacity = '0';
    }, 100);
    
    setTimeout(() => {
        if (flashOverlay.parentNode && flashOverlay.style.opacity === '0') {
            flashOverlay.remove();
        }
    }, 500);
}

// === FUNZIONE SCOSSA PAGINA ===
function shakePage() {
    document.documentElement.classList.add('page-shake');
    setTimeout(() => {
        document.documentElement.classList.remove('page-shake');
    }, 600);
}

// === FUNZIONE RIPPLE MULTICOLORE ===
function createRippleEffect() {
    const colors = ['', 'ripple-color-1', 'ripple-color-2', 'ripple-color-3'];
    const sizes = [50, 80, 120, 160];
    
    colors.forEach((colorClass, index) => {
        setTimeout(() => {
            const ripple = document.createElement('div');
            ripple.className = `explosion-ripple ${colorClass}`;
            ripple.style.width = `${sizes[index]}px`;
            ripple.style.height = `${sizes[index]}px`;
            document.body.appendChild(ripple);
            
            // Animazione ripple
            const animation = ripple.animate([
                { 
                    transform: 'translate(-50%, -50%) scale(0.5)', 
                    opacity: 0.9,
                    borderWidth: '4px'
                },
                { 
                    transform: 'translate(-50%, -50%) scale(3)', 
                    opacity: 0,
                    borderWidth: '1px'
                }
            ], {
                duration: 1200,
                easing: 'cubic-bezier(0.2, 0.8, 0.4, 1)',
                fill: 'forwards'
            });
            
            animation.onfinish = () => {
                if (ripple.parentNode) {
                    ripple.parentNode.removeChild(ripple);
                }
            };
        }, index * 150); // Ripple sequenziali
    });
}

// === FUNZIONE AURORA BOREALE ===
function createAuroraEffect() {
    const aurora = document.createElement('div');
    aurora.id = 'aurora-effect';
    document.body.appendChild(aurora);
    
    // Appare gradualmente
    setTimeout(() => {
        aurora.style.opacity = '0.8';
    }, 50);
    
    // Scompare gradualmente con effetto onda
    setTimeout(() => {
        aurora.style.opacity = '0.4';
    }, 300);
    
    setTimeout(() => {
        aurora.style.opacity = '0.2';
    }, 500);
    
    setTimeout(() => {
        aurora.style.opacity = '0';
        setTimeout(() => {
            if (aurora.parentNode) {
                aurora.parentNode.removeChild(aurora);
            }
        }, 800);
    }, 700);
}

// === FUNZIONE ESPLOSIONE COMPLETA ===
function enhancedExplosion() {
    console.log('💥 Avvio esplosione spettacolare!');
    
    // SEQUENZA TIMING PERFETTA:
    
    // T+0ms: Flash principale + Scossa pagina
    createFlashEffect('intense');
    shakePage();
    
    // T+50ms: Primo ripple bianco
    setTimeout(() => {
        createRippleEffect();
    }, 50);
    
    // T+100ms: Aurora boreale
    setTimeout(() => {
        createAuroraEffect();
    }, 100);
    
    // T+200ms: Flash secondario più debole
    setTimeout(() => {
        createFlashEffect('normal');
    }, 200);
    
    // T+300ms: Esplosione particelle (la tua funzione esistente)
    setTimeout(() => {
        if (typeof createExplosionParticles === 'function') {
            createExplosionParticles();
        }
    }, 300);
    
    // SUONO ESPLOSIONE
    const explosionSound = document.getElementById('explosionSound');
    if (explosionSound) {
        try {
            explosionSound.currentTime = 0;
            explosionSound.volume = 0.8;
            explosionSound.play().catch(() => {});
        } catch (_) {}
    }
}

// === INIZIALIZZAZIONE ===
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎇 Sistema esplosione caricato!');
    
    // Bottone Esplodi
    const explodeBtn = document.getElementById('btn-explode');
    if (explodeBtn) {
        explodeBtn.onclick = function(e) {
            e.preventDefault();
            enhancedExplosion();
        };
    }
    
    // Testo "Sustine et abstine"
    const explodingText = document.getElementById('exploding');
    if (explodingText) {
        explodingText.addEventListener('click', function(e) {
            e.preventDefault();
            enhancedExplosion();
        });
    }
});

// === FUNZIONE DI DEBUG (opzionale) ===
function debugExplosion() {
    console.log('🔍 Debug esplosione:');
    console.log('- Flash overlay:', document.getElementById('flash-overlay'));
    console.log('- Ripple elements:', document.querySelectorAll('.explosion-ripple').length);
    console.log('- Aurora effect:', document.getElementById('aurora-effect'));
    console.log('- Page shake class:', document.documentElement.classList.contains('page-shake'));
}

// Per testare, puoi chiamare debugExplosion() nella console
// === FUNZIONE EFFETTO LAMPOSCOOP SPETTACOLARE ===
function createFlashEffect(intensity = 'normal') {
    // Crea o riutilizza l'overlay del flash
    let flashOverlay = document.getElementById('flash-overlay');
    if (!flashOverlay) {
        flashOverlay = document.createElement('div');
        flashOverlay.id = 'flash-overlay';
        document.body.appendChild(flashOverlay);
    }
    
    // Imposta l'intensità
    if (intensity === 'intense') {
        flashOverlay.classList.add('intense');
    } else {
        flashOverlay.classList.remove('intense');
    }
    
    // Animazione del flash
    flashOverlay.style.opacity = '1';
    
    // Rimuovi il flash dopo l'animazione
    setTimeout(() => {
        flashOverlay.style.opacity = '0';
    }, 150);
    
    // Rimuovi completamente dopo la transizione
    setTimeout(() => {
        if (flashOverlay.parentNode && flashOverlay.style.opacity === '0') {
            flashOverlay.remove();
        }
    }, 500);
}

// === FUNZIONE SCOSSA PAGINA ===
function shakePage() {
    document.documentElement.classList.add('page-shake');
    setTimeout(() => {
        document.documentElement.classList.remove('page-shake');
    }, 800);
}

// === MODIFICA LA FUNZIONE ESPLOSIONE ESISTENTE ===
function enhancedExplosion() {
    // 1. FLASH LUMINOSO (prima di tutto)
    createFlashEffect('intense');
    
    // 2. SCOSSA PAGINA 
    shakePage();
    
    // 3. ESPLOSIONE PARTICELARE (la tua funzione esistente)
    createExplosionParticles();
    
    // 4. SUONO ESPLOSIONE (se presente)
    const explosionSound = document.getElementById('explosionSound');
    if (explosionSound) {
        try {
            explosionSound.currentTime = 0;
            explosionSound.volume = 0.7;
            explosionSound.play().catch(() => {});
        } catch (_) {}
    }
}

// === AGGIORNA IL BOTTONE ESPLODI ===
document.addEventListener('DOMContentLoaded', function() {
    const explodeBtn = document.getElementById('btn-explode');
    if (explodeBtn) {
        // Sostituisci l'evento onclick esistente
        explodeBtn.onclick = function(e) {
            e.preventDefault();
            enhancedExplosion();
        };
    }
    
    // Anche per il motto "Sustine et abstine"
    const explodingText = document.getElementById('exploding');
    if (explodingText) {
        explodingText.addEventListener('click', function(e) {
            e.preventDefault();
            enhancedExplosion();
        });
    }
});

// === AGGIORNA LA TUA FUNZIONE createExplosionParticles PER COORDINAZIONE ===
// (Mantieni la tua funzione esistente, ma assicurati che venga chiamata da enhancedExplosion)
/* === RESET & VARIABLES ========== */
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
/* === RESET & VARIABLES ========== */
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
    } // ← ✅ AGGIUNTA LA PARENTESI DI CHIUSURA QUI!

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

    // 9. GESTIONE ERRORI GLOBALE (SOLO LOG, NON SILENZIA)
    window.addEventListener('error', (event) => {
      console.error('❌ Errore globale catturato:', event.error || event.message);
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
}); // ← ✅ CHIUSURA DEL DOMContentLoaded
/* === Floating Quotes Controller v2 === */
(function(){
  var timer = null, idx = 0, paused = false;
  function qs(a){ return document.querySelector(a); }
  function qsa(a){ return Array.prototype.slice.call(document.querySelectorAll(a)); }
  function step(bubbles){
    if(!bubbles.length) return;
     document.querySelector('.floating-quotes').style.zIndex = '20';
    // Remove show from all
    bubbles.forEach(function(b){ b.classList.remove("show"); });
    // Add to current
    bubbles[idx].classList.add("show");
    idx = (idx + 1) % bubbles.length;
  }
  function start(){
    var bubbles = qsa(".floating-quotes .quote-bubble");
    if(!bubbles.length) return;
     document.querySelector('.floating-quotes').style.zIndex = '20';
    // Sanitize initial: ensure only one .show
    var any = bubbles.some(function(b){ return b.classList.contains("show"); });
    if(!any){ idx = 0; }
    else { idx = (bubbles.findIndex(function(b){ return b.classList.contains("show"); }) + 1) % bubbles.length; }
    step(bubbles);
    clearInterval(timer);
    timer = setInterval(function(){ if(!paused) step(bubbles); }, 8000);
    // Pause on hover
    var box = qs(".floating-quotes");
    if(box){
      box.addEventListener("mouseenter", function(){ paused = true; });
      box.addEventListener("mouseleave", function(){ paused = false; });
    }
  }
  // Re-init safe on DOM ready and after 1s (in case of late inserts)
  if(document.readyState!=="loading") start(); else document.addEventListener("DOMContentLoaded", start);
  setTimeout(start, 1000);
})();
/* === Typing Controller v4 - FLUIDO === */
(function(){
  function ready(fn){ 
    if(document.readyState!=="loading") fn(); 
    else document.addEventListener("DOMContentLoaded", fn); 
  }
  
  ready(function(){
    var el = document.querySelector(".typing-effect");
    if(!el) return;
    
    // Aggiungi cursor se non esiste
    if(!el.querySelector('.cursor')) {
      el.innerHTML += '<span class="cursor">|</span>';
    }
    
    var phrases = [
      "“La filosofia comincia con la meraviglia.” — Platone",
      "“Sapere di non sapere è il principio della saggezza.” — Socrate",
      "“La misura dell’uomo è l’uomo.” — Protagora",
      "“La conoscenza è potere.” — Francis Bacon",
      "“L'uomo è un lupo per l'uomo.” — Thomas Hobbes",
      "“La mente è una tabula rasa.” — John Locke",
      "“Esse est percipi (essere è essere percepito).” — George Berkeley",
      "“La ragione è schiava delle passioni.” — David Hume",
      "“Il cielo stellato sopra di me e la legge morale in me.” — Immanuel Kant",
      "“Viviamo nel migliore dei mondi possibili.” — Gottfried Wilhelm Leibniz",
      "“Il cuore ha le sue ragioni che la ragione non conosce.” — Blaise Pascal",
      "“La libertà è il riconoscimento della necessità.” — G.W.F. Hegel",
      "“Dio è morto.” — Friedrich Nietzsche",
      "“Diventa ciò che sei.” — Friedrich Nietzsche",
      "“Il mondo è la mia rappresentazione.” — Arthur Schopenhauer",
      "“La vita può essere compresa solo all'indietro, ma va vissuta in avanti.” — Søren Kierkegaard",
      "“L'esistenza precede l'essenza.” — Jean-Paul Sartre",
      "“L'inferno sono gli altri.” — Jean-Paul Sartre",
      "“Bisogna immaginare Sisifo felice.” — Albert Camus",
      "“Donna non si nasce, lo si diventa.” — Simone de Beauvoir",
      "“La banalità del male.” — Hannah Arendt",
      "“La scienza avanza per congetture e confutazioni.” — Karl Popper",
      "“Il problema dell'umanità è che gli stupidi sono sicurissimi, mentre gli intelligenti sono pieni di dubbi.” — Bertrand Russell",
      "“La mente e il corpo sono una sola e medesima cosa.” — Baruch Spinoza",
      "“Non si scende due volte nello stesso fiume.” — Eraclito",
      "“L'essere è, il non-essere non è.” — Parmenide",
      "“Il piacere è il principio e il fine della vita felice.” — Epicuro",
      "“Non sono le cose a turbare gli uomini, ma i giudizi che essi formulano sulle cose.” — Epitteto",
      "“La felicità della tua vita dipende dalla qualità dei tuoi pensieri.” — Marco Aurelio",
      "“Non esiste vento favorevole per il marinaio che non sa dove andare.” — Seneca",
      "“Ama e fa' ciò che vuoi.” — Agostino d'Ippona",
      "“Temo l'uomo di un solo libro.” — Tommaso d'Aquino",
      "“Credo per comprendere.” — Anselmo d'Aosta",
      "“È meglio essere temuti che amati, se non si può essere entrambi.” — Niccolò Machiavelli",
      "“L'uomo nasce libero, ma ovunque è in catene.” — Jean-Jacques Rousseau",
      "“Se Dio non esistesse, bisognerebbe inventarlo.” — Voltaire",
      "“Il linguaggio è la casa dell'Essere.” — Martin Heidegger",
      "“Su ciò di cui non si può parlare si deve tacere.” — Ludwig Wittgenstein",
      "“Dove c'è potere, c'è resistenza.” — Michel Foucault",
      "“Essere che può essere compreso è linguaggio.” — Hans-Georg Gadamer",
      "“Un viaggio di mille miglia comincia con un solo passo.” — Laozi",
      "“Ciò che sappiamo è una goccia, ciò che ignoriamo è un oceano.” — Isaac Newton",
      "“Cogito, ergo sum.” — Cartesio"
    ];
    
    var i = 0, j = 0, isDeleting = false, pauseCount = 0;
    var baseSpeed = 60; // Velocità base più lenta per fluidità
    var pauseThreshold = 60; // Pausa più lunga
    
    function typeCharacter() {
      var currentPhrase = phrases[i];
      var cursor = '<span class="cursor">|</span>';
      
      if (!isDeleting) {
        // SCRITTURA - più fluida
        if (j <= currentPhrase.length) {
          el.innerHTML = currentPhrase.slice(0, j) + cursor;
          j++;
          
          // Velocità variabile per effetto più naturale
          var speed = baseSpeed + (Math.random() * 30 - 15); // ±15ms di variazione
          setTimeout(typeCharacter, speed);
        } else {
          // Fine scrittura - pausa
          pauseCount++;
          if (pauseCount > pauseThreshold) {
            isDeleting = true;
            pauseCount = 0;
            setTimeout(typeCharacter, 100);
          } else {
            setTimeout(typeCharacter, 50);
          }
        }
      } else {
        // CANCELLAZIONE - più fluida
        if (j >= 0) {
          el.innerHTML = currentPhrase.slice(0, j) + cursor;
          j--;
          
          // Cancellazione leggermente più veloce ma fluida
          var deleteSpeed = baseSpeed * 0.7 + (Math.random() * 20 - 10);
          setTimeout(typeCharacter, deleteSpeed);
        } else {
          // Fine cancellazione - passa alla frase successiva
          isDeleting = false;
          i = (i + 1) % phrases.length;
          j = 0;
          setTimeout(typeCharacter, 300); // Breve pausa tra le frasi
        }
      }
    }
    
    // Inizia dopo un breve delay
    setTimeout(typeCharacter, 1000);
  });
})();
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

// FUNZIONE safeDOMOperation
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
