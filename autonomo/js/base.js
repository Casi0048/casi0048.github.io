
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


/* === Timeline scroll reveal (IO) v2 === */
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


(function(){
  function ready(fn){ 
    if(document.readyState!=='loading') fn(); 
    else document.addEventListener('DOMContentLoaded', fn); 
  }
  
  function qsa(sel, root){
    return Array.prototype.slice.call((root || document).querySelectorAll(sel));
  }
  
  ready(function(){
    var runner = document.getElementById('quote-runner');
    if(!runner) return;
    var PERIOD = 9000;
    
    function readSource(){
      var list = qsa('.floating-quotes .quote-bubble');
      return list.map(function(q){
        var qt = q.querySelector('.quote-text');
        var qa = q.querySelector('.quote-author');
        return {
          t: (qt ? qt.textContent.trim() : ''), 
          a: (qa ? qa.textContent.trim() : '')
        };
      });
    }
    
    var data = readSource();
    if (!data.length){
      data = [
        {t:'“Conosci te stesso”', a:'— Socrate'},
        {t:'“La filosofia comincia con la meraviglia”', a:'— Platone'},
        {t:'“Cogito, ergo sum”', a:'— Cartesio'}
      ];
    }
    
    var idx = Math.floor(Math.random() * data.length);
    
    function render(item){
      runner.innerHTML = '';
      var b = document.createElement('div');
      b.className = 'quote-bubble slide-in';
      
      var qt = document.createElement('div');
      qt.className = 'quote-text';
      qt.textContent = item.t;
      
      var qa = document.createElement('div');
      qa.className = 'quote-author';
      qa.textContent = item.a;
      
      b.appendChild(qt);
      b.appendChild(qa);
      runner.appendChild(b);
    }
    
    function next(){
      render(data[idx]);
      idx = (idx + 1) % data.length;
    }
    
    next();
    setInterval(next, PERIOD);
  });
})();



document.addEventListener('DOMContentLoaded', function() {
  var translateSelect = document.getElementById('customTranslate');
  function clearCookie(){
    var past='Thu, 01 Jan 1970 00:00:00 GMT';
    document.cookie='googtrans=; expires='+past+'; path=/;';
    document.cookie='googtrans=; expires='+past+'; path=/; domain='+location.hostname+';';
  }
  function openWebTranslate(lang){
    var u = location.href; var sl='it';
    var url='https://translate.google.com/translate?hl='+encodeURIComponent(lang)+'&sl='+encodeURIComponent(sl)+'&tl='+encodeURIComponent(lang)+'&u='+encodeURIComponent(u);
    window.open(url, '_blank', 'noopener');
  }
  function setCombo(lang){
    var combo = document.querySelector('.goog-te-combo');
    if(combo){
      combo.value = lang; combo.dispatchEvent(new Event('change')); return true;
    }
    var frame = document.querySelector('.goog-te-menu-frame');
    if(frame && frame.contentDocument){
      var select = frame.contentDocument.querySelector('.goog-te-combo');
      if(select){ select.value = lang; select.dispatchEvent(new Event('change')); return true; }
    }
    return false;
  }
  function loadGT(){
    if(!(window.google && google.translate)){
      var s=document.createElement('script');
      s.src='https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      s.async=true;
      s.onerror=function(){ document.documentElement.setAttribute('data-gt-error','load-failed'); };
      document.head.appendChild(s);
    }
  }
  function translatePage(lang){
    if(!lang) return;
    if(lang==='it'){ clearCookie(); setTimeout(function(){ location.reload(); }, 50); return; }
    loadGT();
    var tries=0;
    (function wait(){
      if(window.google && google.translate){
        try{ if(!document.querySelector('.goog-te-combo')) { window.googleTranslateElementInit(); } }catch(_){}
        if(setCombo(lang)) return;
      }
      if(tries++ < 60){ setTimeout(wait, 150); }
      else { document.documentElement.setAttribute('data-gt-error','load-failed'); openWebTranslate(lang); }
    })();
  }
  if(translateSelect){
    translateSelect.addEventListener('change', function(){ translatePage(this.value); }, {passive:true});
    try{
      var c=(document.cookie||'').split(';').map(function(s){return s.trim();}).find(function(s){return s.indexOf('googtrans=')===0;});
      if(!c){ translateSelect.value='it'; }
      else{
        var val=decodeURIComponent(c.split('=')[1]||''); var parts=val.split('/'); var l=parts[2]||'it';
        if(translateSelect.querySelector('option[value="'+l+'"]')) translateSelect.value=l;
      }
    }catch(_){ translateSelect.value='it'; }
  }
});

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

(function(){
  function setFill(el){
    if(!el) return;
    var min = +el.min || 0;
    var max = +el.max || 100;
    var val = +el.value || 0;
    var pct = ((val - min) * 100) / (max - min);
    el.style.setProperty('--fill', pct + '%');
  }
  function bind(el){
    if(!el) return;
    setFill(el);
    el.addEventListener('input', function(){ setFill(el); });
    el.addEventListener('change', function(){ setFill(el); });
  }
  document.addEventListener('DOMContentLoaded', function(){
    bind(document.querySelector('#audio-player #volume'));
    bind(document.querySelector('#slider-speed'));
  });
})();


(function(){
  function clamp(n,min,max){ return Math.max(min, Math.min(max, n)); }
  function formatFactor(x){
    // Implementazione base per il formato del fattore di velocità
    return '×' + parseFloat(x).toFixed(1);
  }
  
  // Inizializzazione del speed readout
  document.addEventListener('DOMContentLoaded', function() {
    var speedSlider = document.getElementById('slider-speed');
    var speedReadout = document.getElementById('speed-readout');
    
    if(speedSlider && speedReadout) {
      function updateSpeedReadout() {
        var value = parseFloat(speedSlider.value) || 1;
        speedReadout.textContent = formatFactor(value);
      }
      
      speedSlider.addEventListener('input', updateSpeedReadout);
      updateSpeedReadout(); // Imposta il valore iniziale
    }
  });
})();


(function(){
  function pingOnce(){
    var box = document.getElementById('russell-box');
    var btn = document.getElementById('russell-btn');
    if(!box) return;
    box.classList.add('ping');
    if(btn) btn.classList.add('ping');
    clearTimeout(pingOnce._t);
    pingOnce._t = setTimeout(function(){
      box.classList.remove('ping');
      if(btn) btn.classList.remove('ping');
    }, 520);
  }
  function isInside(el, id){
    while(el){ if(el.id === id) return true; el = el.parentElement; }
    return false;
  }
  function init(){
    var box = document.getElementById('russell-box');
    var btn = document.getElementById('russell-btn');
    if(!box) return;

    // Click on the button OR anywhere inside the box
    box.addEventListener('click', function(e){
      // avoid false positives from unrelated overlays
      if(isInside(e.target, 'russell-box') || isInside(e.target, 'russell-btn')){
        pingOnce();
      }
    });

    // Keyboard on button
    if(btn){
      if(!btn.hasAttribute('role')) btn.setAttribute('role','button');
      if(!btn.hasAttribute('tabindex')) btn.setAttribute('tabindex','0');
      if(!btn.hasAttribute('aria-label')) btn.setAttribute('aria-label','Apri Russell');
      btn.addEventListener('keydown', function(e){
        if(e.key === 'Enter' || e.key === ' ' || e.keyCode === 13 || e.keyCode === 32){
          e.preventDefault(); pingOnce();
        }
      });
    }
  }
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  }else{
    init();
  }
})();



(function(){
  var boom = document.getElementById('explosionSound');
  var thunder = document.getElementById('thunder-sound');
  var fired = false;
  async function unlockSilent(){
    if (fired) return; fired = true;
    var list = [boom, thunder].filter(Boolean);
    for (var i=0;i<list.length;i++){
      var a = list[i];
      try{
        var prevMuted = a.muted, prevVol = a.volume;
        a.muted = true; a.volume = 0.0;
        await a.play(); a.pause(); a.currentTime = 0;
        a.muted = prevMuted; a.volume = prevVol;
      }catch(_){}
    }
    window.removeEventListener('pointerdown', unlockSilent, true);
    window.removeEventListener('click', unlockSilent, true);
  }
  window.addEventListener('pointerdown', unlockSilent, { once:true, passive:true, capture:true });
  window.addEventListener('click', unlockSilent, { once:true, passive:true, capture:true });
})();


function softPlay(el, targetVol, ms){
  targetVol = (typeof targetVol === 'number') ? targetVol : 1.0;
  ms = (typeof ms === 'number') ? ms : 140;
  if(!el) return;
  try{
    el.muted = false;
    el.currentTime = 0;
    el.volume = 0.0001;
    el.play().then(function(){
      var steps = Math.max(1, Math.round(ms/30));
      var i=0, start = el.volume, diff = targetVol - start;
      var t = setInterval(function(){
        i++; el.volume = start + diff*(i/steps);
        if(i>=steps){ el.volume = targetVol; clearInterval(t); }
      }, 30);
    }).catch(function(){});
  }catch(_){}
}

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

// Animazione delay progressivo per voci menu
document.addEventListener('DOMContentLoaded', function() {
    const megaMenus = document.querySelectorAll('.mega-menu');
    
    megaMenus.forEach(menu => {
        const links = menu.querySelectorAll('a');
        links.forEach((link, index) => {
            link.style.setProperty('--delay', index);
        });
    });
});

// Aggiungi questo script
document.addEventListener('DOMContentLoaded', function() {
  const progressBar = document.querySelector('.scroll-progress-bar');
  
  window.addEventListener('scroll', function() {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    progressBar.style.width = scrolled + '%';
  });
});

/* === THEME TOGGLE FUNCTIONALITY === */
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

    const btn = document.getElementById('paradigma-btn');
    const overlay = document.getElementById('filosofi-overlay');
    
    let hideTimeout;
    
    function showOverlay() {
        clearTimeout(hideTimeout);
        overlay.style.display = 'block';
    }
    
    function hideOverlay() {
        hideTimeout = setTimeout(() => {
            overlay.style.display = 'none';
        }, 300);
    }
    
    // Apri overlay al passaggio mouse sul bottone
    btn.addEventListener('mouseenter', showOverlay);
    
    // Chiudi overlay dopo uscita mouse dal bottone
    btn.addEventListener('mouseleave', hideOverlay);
    
    // Se il mouse entra nell'overlay cancella la chiusura
    overlay.addEventListener('mouseenter', () => clearTimeout(hideTimeout));
    
    // Se il mouse esce dall'overlay, avvia chiusura
    overlay.addEventListener('mouseleave', hideOverlay);

// Funzioni per il modale
function showNewsletterModal() {
  document.getElementById('newsletterModal').style.display = 'flex';
}

function closeNewsletterModal() {
  document.getElementById('newsletterModal').style.display = 'none';
}

// Chiudi modale cliccando fuori
document.getElementById('newsletterModal').addEventListener('click', function(e) {
  if (e.target === this) closeNewsletterModal();
});

// Gestione form (base)
document.getElementById('newsletterForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const email = this.querySelector('input[type="email"]').value;
  alert('Grazie per esserti iscritto! Controlla la tua email: ' + email);
  closeNewsletterModal();
});

// Chiudi con ESC
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeNewsletterModal();
});

document.addEventListener('click', function(e){
  const link = e.target.closest('a[href="#lista-articoli"]');
  if(!link) return;
  const target = document.getElementById('lista-articoli');
  if(!target) return;
  e.preventDefault();
  try{ target.scrollIntoView({ behavior:'smooth', block:'start' }); }
  catch(_){ location.hash = '#lista-articoli'; }
});


  // Aggiungi questo script per ottimizzare le animazioni
document.addEventListener('DOMContentLoaded', function() {
  // Usa requestAnimationFrame per animazioni fluide
  function optimizeAnimations() {
    const animatedElements = document.querySelectorAll('.timeline-item, .mega-menu');
    animatedElements.forEach(el => {
      el.style.willChange = 'transform, opacity';
    });
  }
  optimizeAnimations();
});

    (function(){
      const panel = document.querySelector('#search-panel');
      const btnClose = document.getElementById('search-close');
      const backdrop = document.getElementById('search-backdrop');
      if(btnClose){
        btnClose.addEventListener('click', function(){
          panel && panel.classList.remove('open');
          if(backdrop){ backdrop.classList.remove('open'); setTimeout(()=>backdrop.hidden=true, 200); }
        });
      }
      // expose a helper to set results (optional)
      window.setSearchResults = function(html){
        const tgt = document.querySelector('#search-results, #searchResults, .search-results, .results-scroll');
        if(!tgt) return;
        tgt.innerHTML = html;
        window.animateSearchResults && window.animateSearchResults();
      };
    })();
    
// === Auto-open search panel when real results are injected ===
(function(){
  const panel    = document.querySelector('#search-panel, #searchPanel, .search-panel, .results-panel');
  const box      = document.querySelector('#search-results, #searchResults, .search-results, .results-scroll');
  const backdrop = document.getElementById('search-backdrop');
  if (!panel || !box) return;

  // Only count nodes that look like real results (not placeholders)
  function hasRealItems() {
    // Match common result item patterns, exclude placeholders
    const sel = '.sp-item:not([data-placeholder]), .search-result, .result, li.result-item, .result-title a';
    return box.querySelector(sel) !== null;
  }

  function forceClose(){
    panel.classList.remove('open');
    if (backdrop){ backdrop.classList.remove('open'); backdrop.hidden = true; }
  }
  function openPanel(){
    if (!panel.classList.contains('open')) panel.classList.add('open');
    if (backdrop){
      backdrop.hidden = false;
      backdrop.classList.add('open');
      backdrop.onclick = () => forceClose();
    }
    if (typeof window.animateSearchResults === 'function'){
      window.animateSearchResults();
    } else {
      Array.from(box.children).forEach((el,i)=> el.style.setProperty('--i', i));
    }
  }

  // Observe child changes
  const mo = new MutationObserver(()=>{
    if (hasRealItems()) openPanel();
    else forceClose();
  });
  mo.observe(box, { childList: true, subtree: true });

  // Ensure closed on load unless there are real items
  if (!hasRealItems()) forceClose();
  else openPanel();

  // ESC to close
  document.addEventListener('keydown', (e)=>{ if (e.key === 'Escape') forceClose(); });
})();

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
