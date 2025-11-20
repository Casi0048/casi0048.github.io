
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

    // ... resto del codice invariato ...

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
/* ===== FINE ESPLOSIONE TEATRALE ===== */
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
document.addEventListener('DOMContentLoaded', function() {
  console.log('🎬 Inizializzazione applicazione');
  
  // Timeline con delay
  setTimeout(initCosmicTimeline, 1000);
});

// Re-init al resize
window.addEventListener('resize', initCosmicTimeline);

// Gestione errori globale (aggiungi in cima se non ce l'hai)
window.addEventListener('error', function(e) {
  console.error('❌ Errore globale:', e.error);
  e.preventDefault();
  return true;
});
// Aggiunge effetti interattivi alla timeline
document.addEventListener('DOMContentLoaded', function() {
    const timelineItems = document.querySelectorAll('.timeline-content');
    
    timelineItems.forEach(item => {
        item.addEventListener('click', function() {
            this.classList.toggle('expanded');
        });
    });
    
   // Effetto scroll reveal
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

// COLORE IN BASE ALLA VELOCITÀ
 // ✅ TRASFORMA in funzione normale
function getSpeedColor(speed) {
    if (speed <= 300) return '#00ff00';
    if (speed <= 700) return '#ffff00';
    if (speed <= 1200) return '#ffa500';
    return '#ff0000';
}
    showSpeedFeedback() {
    const speedValue = this.speedDisplay.querySelector('.speed-value');
    speedValue.style.transform = 'scale(1.2)';
    speedValue.style.transition = 'transform 0.3s ease';
    
    setTimeout(() => {
        speedValue.style.transform = 'scale(1)';
    }, 300);
}
    
    createDots() {
        this.slides.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.className = `slider-dot ${index === 0 ? 'active' : ''}`;
            dot.innerHTML = `${index + 1}`; // Mostra numero slide
            dot.setAttribute('title', `Vai alla slide ${index + 1} (${this.speed}ms)`);
            dot.addEventListener('click', () => this.goToSlide(index));
            this.dotsContainer.appendChild(dot);
        });
    }
    
    goToSlide(slideIndex) {
        if (slideIndex < 0) {
            slideIndex = this.slides.length - 1;
        } else if (slideIndex >= this.slides.length) {
            slideIndex = 0;
        }
        
        this.currentSlide = slideIndex;
        const translateY = -slideIndex * this.slideHeight;
        this.track.style.transform = `translateY(${translateY}px)`;
        
        this.updateDots();
        
        // Log con info velocità
        console.log(`▶️ Slide ${slideIndex + 1} | Velocità: ${this.speed}ms`);
    }
    
    nextSlide() {
        console.log(`⏩ Next slide (${this.speed}ms)`);
        this.goToSlide(this.currentSlide + 1);
    }
    
    prevSlide() {
        console.log(`⏪ Prev slide (${this.speed}ms)`);
        this.goToSlide(this.currentSlide - 1);
    }
    
    updateDots() {
        const dots = this.dotsContainer.querySelectorAll('.slider-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentSlide);
            // Aggiorna tooltip con velocità corrente
            dot.setAttribute('title', `Vai alla slide ${index + 1} (${this.speed}ms)`);
        });
    }
    
    addTouchEvents() {
        let startY = 0;
        
        this.container.addEventListener('touchstart', (e) => {
            startY = e.touches[0].clientY;
            // Disabilita transizione durante swipe per fluidità
            this.track.style.transition = 'none';
        });
        
        this.container.addEventListener('touchend', (e) => {
            const endY = e.changedTouches[0].clientY;
            const diff = startY - endY;
            
            // Riabilita transizione
            this.track.style.transition = `transform ${this.speed}ms ease-in-out`;
            
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    this.nextSlide();
                } else {
                    this.prevSlide();
                }
            }
        });
    }
    
    startAutoPlay() {
        this.stopAutoPlay();
        console.log(`🔁 Autoplay avviato: ${this.autoPlayDelay}ms`);
        
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, this.autoPlayDelay);
    }
    
    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
            console.log('⏸️ Autoplay fermato');
        }
    }
    
    handleResize() {
        this.slideHeight = this.container.offsetHeight;
        this.slides.forEach(slide => {
            slide.style.height = `${this.slideHeight}px`;
        });
        this.goToSlide(this.currentSlide);
    }
    
    // METODI PUBBLICI PER CONTROLLO VELOCITÀ
    setSpeedFast() { this.setSpeed(200); }
    setSpeedNormal() { this.setSpeed(500); }
    setSpeedSlow() { this.setSpeed(1000); }
    setSpeedVerySlow() { this.setSpeed(1500); }
    
    getCurrentSpeed() {
        return this.speed;
    }
    
    getSpeedInfo() {
        return {
            speed: this.speed,
            autoplayDelay: this.autoPlayDelay,
            currentSlide: this.currentSlide + 1,
            totalSlides: this.slides.length
        };
    }
}

// INIZIALIZZAZIONE E USO
document.addEventListener('DOMContentLoaded', function() {
    const slider = new VerticalSlider('.vertical-slider');
    
    // Esempio: log info velocità ogni cambio slide
    document.querySelector('.vertical-slider').addEventListener('slideChange', function(e) {
        const info = slider.getSpeedInfo();
        console.log('📊 Info slider:', info);
    });
    
    // Esporta per controllo esterno
    window.verticalSlider = slider;
});

// USO DA CONSOLE:
// verticalSlider.setSpeed(300)       → Imposta velocità 300ms
// verticalSlider.setSpeedFast()      → Velocità rapida
// verticalSlider.getCurrentSpeed()   → Ottieni velocità corrente
// verticalSlider.getSpeedInfo()      → Tutte le info

// Aggiungi al tuo script.js
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
/* === script paradigmma ========================================================= */
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
