
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
            
            // Crea 80 cometine
            for (let i = 0; i < 60; i++) {
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

// === ESPLOSIONE + SCIAME PARTICELLE - VERSIONE SPETTACOLARE ===
document.addEventListener('DOMContentLoaded', function() {
  const explodingText = document.getElementById('exploding');
  const explodeBtn = document.getElementById('btn-explode');
  const explosionSound = document.getElementById('explosionSound');
  
  if (!explodingText) return;

  // CSS PER ESPLOSIONE E PARTICELLE
  const explosionCSS = `
    @keyframes letterExplode {
      0% {
        transform: translate(0, 0) rotate(0deg) scale(1);
        opacity: 1;
        filter: blur(0px);
      }
      50% {
        transform: translate(var(--explode-dx), var(--explode-dy)) rotate(var(--explode-rotate)) scale(1.2);
        opacity: 0.8;
        filter: blur(2px);
      }
      100% {
        transform: translate(0, 0) rotate(0deg) scale(1);
        opacity: 1;
        filter: blur(0px);
      }
    }
    
    @keyframes pageShake {
      0%, 100% { transform: translateX(0); }
      25% { transform: translateX(-5px) rotate(-0.5deg); }
      50% { transform: translateX(5px) rotate(0.5deg); }
      75% { transform: translateX(-3px) rotate(-0.3deg); }
    }
    
    .char {
      display: inline-block;
      transition: all 0.3s ease;
    }
    
    .exploding-active {
      animation: pageShake 0.8s ease-in-out;
    }
    
    /* STILE PARTICELLE */
    .explosion-particle {
      position: fixed;
      pointer-events: none;
      z-index: 214;
      border-radius: 50%;
      animation: particleFly 1.5s ease-out forwards;
    }
    
    @keyframes particleFly {
      0% {
        transform: translate(0, 0) scale(1) rotate(0deg);
        opacity: 1;
      }
      80% {
        opacity: 0.8;
      }
      100% {
        transform: translate(var(--particle-dx), var(--particle-dy)) scale(0) rotate(360deg);
        opacity: 0;
      }
    }
    
    .particle-glow {
      box-shadow: 0 0 10px currentColor, 0 0 20px currentColor;
    }
  `;
  
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
  if (!('serviceWorker' in navigator)) return;
  window.addEventListener('load', function(){
    navigator.serviceWorker.register('/sw.js')
      .then(reg => console.log('✅ SW registrato:', reg.scope))
      .catch(err => console.error('❌ SW registration failed:', err));
  });
})();

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


