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
