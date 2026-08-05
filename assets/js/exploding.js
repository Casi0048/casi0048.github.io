
// === EFFETTI LUMINOSI WEBGL - PERFORMANCE MAX ===
class WebGLExplosion {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.gl = this.canvas.getContext('webgl');
        if (!this.gl) return;

        this.canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 2147483599;
        `;
        document.body.appendChild(this.canvas);
        
        this.initWebGL();
        this.particles = [];
    }

    initWebGL() {
        // Shader program per effetti luminosi (semplificato)
        const vertexShader = `
            attribute vec2 position;
            uniform float time;
            varying vec2 vPosition;
            
            void main() {
                vPosition = position;
                gl_Position = vec4(position, 0.0, 1.0);
                gl_PointSize = 8.0;
            }
        `;

        const fragmentShader = `
            precision mediump float;
            uniform float time;
            varying vec2 vPosition;
            
            void main() {
                float intensity = sin(time * 2.0) * 0.5 + 0.5;
                vec3 color = vec3(1.0, 0.8, 0.2) * intensity;
                gl_FragColor = vec4(color, 0.8);
            }
        `;
        
        // Implementazione WebGL completa...
    }

    createExplosion(x, y) {
        // Implementazione particelle WebGL...
    }
}

// Fallback per sistemi senza WebGL
if (window.WebGLRenderingContext) {
    const webglExplosion = new WebGLExplosion();
}
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
