// SISTEMA STELLARE COMPLETO CON VERIFICHE DI SICUREZZA - VERSIONE CORRETTA
document.addEventListener('DOMContentLoaded', function() {
    
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

    // 1. SISTEMA STELLE BASE
    function initializeStars() {
        return safeDOMOperation(() => {
            const starsContainer = document.getElementById('starsContainer') || document.querySelector('.stars-container');
            
            if (!starsContainer) {
                console.warn('❌ Container stelle non trovato nel DOM');
                return false;
            }
            
            if (!document.body.contains(starsContainer)) {
                console.warn('❌ Container stelle non presente nel document.body');
                return false;
            }

            const starCount = 400; // Ridotto per performance
            let starsCreated = 0;

            for (let i = 0; i < starCount; i++) {
                safeDOMOperation(() => {
                    const star = document.createElement('div');
                    star.className = 'star';
                    
                    // Dimensioni e proprietà casuali
                    const sizeClass = ['small', 'medium', 'large', 'xlarge'][Math.floor(Math.random() * 4)];
                    star.classList.add(sizeClass);
                    
                    // Colori casuali
                    if (Math.random() < 0.7) {
                        const colorClass = ['color-blue', 'color-gold', 'color-purple'][Math.floor(Math.random() * 3)];
                        star.classList.add(colorClass);
                    }
                    
                    star.style.left = Math.random() * 100 + '%';
                    star.style.top = Math.random() * 100 + '%';
                    
                    starsContainer.appendChild(star);
                    starsCreated++;
                });
            }

            console.log(`✅ ${starsCreated} stelle base create`);
            return starsCreated > 0;
        });
    }

    // 2. GENERATORE DI STELLE CADENTI
    function initializeShootingStars() {
        return safeDOMOperation(() => {
            const container = document.getElementById('starsContainer') || document.querySelector('.stars-container');
            if (!container) return false;
            
            function createShootingStar() {
                const shooter = document.createElement('div');
                shooter.className = 'shooting-star';
                
                // Direzione casuale
                const directions = ['diagonal', 'horizontal', 'vertical', 'reverse'];
                const direction = directions[Math.floor(Math.random() * directions.length)];
                shooter.classList.add(direction);
                
                // Varianti di velocità
                if (Math.random() < 0.3) shooter.classList.add('fast');
                if (Math.random() < 0.2) shooter.classList.add('slow');
                
                // Posizione iniziale
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
                
                shooter.style.animationDelay = (Math.random() * 2) + 's';
                container.appendChild(shooter);
                
                // Rimuovi dopo l'animazione
                setTimeout(() => {
                    if (shooter.parentNode) {
                        shooter.parentNode.removeChild(shooter);
                    }
                }, 8000);
            }
            
            // Crea stelle cadenti periodicamente
            function createMultipleShootingStars() {
                const count = 1 + Math.floor(Math.random() * 2);
                for (let i = 0; i < count; i++) {
                    setTimeout(() => createShootingStar(), i * 800);
                }
            }
            
            // Avvia il sistema
            createMultipleShootingStars();
            setInterval(createMultipleShootingStars, 5000);
            
            console.log('✅ Stelle cadenti inizializzate');
            return true;
        });
    }

    // 3. SISTEMA COMETE CANVAS (VERSIONE UNICA E MIGLIORATA)
    function initializeComets() {
        return safeDOMOperation(() => {
            const canvas = document.getElementById("tiny-comets");
            if (!canvas) {
                console.warn('❌ Canvas comete non trovato');
                return false;
            }
            
            const ctx = canvas.getContext("2d");
            let w, h;
            const comets = [];
            
            // COLORI SUPER LUMINOSI
            const colors = [
                '#FF4444', '#00FFFF', '#44B7D1', '#88FF88', '#FFFF00',
                '#FF88FF', '#88D8FF', '#FFFF88', '#DD88FF', '#88C1FF',
                '#FFB844', '#88FFAA', '#FF8888', '#88AAFF', '#FF88DD'
            ];
            
            function resizeCanvas() {
                w = canvas.width = window.innerWidth;
                h = canvas.height = window.innerHeight;
            }
            
            class TinyComet {
                constructor() {
                    this.reset();
                }
                
                reset() {
                    // Posizione iniziale casuale sui bordi
                    const side = Math.floor(Math.random() * 4);
                    const margin = 50;
                    
                    switch(side) {
                        case 0: // Alto
                            this.x = Math.random() * w;
                            this.y = -margin;
                            break;
                        case 1: // Destra
                            this.x = w + margin;
                            this.y = Math.random() * h;
                            break;
                        case 2: // Basso
                            this.x = Math.random() * w;
                            this.y = h + margin;
                            break;
                        case 3: // Sinistra
                            this.x = -margin;
                            this.y = Math.random() * h;
                            break;
                    }
                    
                    // Direzione verso il centro
                    const centerX = w / 2;
                    const centerY = h / 2;
                    this.angle = Math.atan2(centerY - this.y, centerX - this.x);
                    
                    // Proprietà
                    this.speed = Math.random() * 3 + 1.5;
                    this.color = colors[Math.floor(Math.random() * colors.length)];
                    this.size = Math.random() * 4 + 2;
                    this.trailLength = Math.floor(Math.random() * 10) + 6;
                    this.trail = [];
                    this.life = 0;
                    this.maxLife = 300 + Math.random() * 400;
                    this.hasGlow = Math.random() > 0.3;
                }
                
                update() {
                    this.life++;
                    this.x += Math.cos(this.angle) * this.speed;
                    this.y += Math.sin(this.angle) * this.speed;
                    
                    // Gestione scia
                    this.trail.push({
                        x: this.x, 
                        y: this.y,
                        size: this.size,
                        alpha: 1.0
                    });
                    
                    this.trail.forEach(point => {
                        point.alpha *= 0.88;
                        point.size *= 0.96;
                    });
                    
                    if (this.trail.length > this.trailLength) {
                        this.trail.shift();
                    }
                    
                    // Reset se necessario
                    const margin = 100;
                    if (this.x < -margin || this.x > w + margin || 
                        this.y < -margin || this.y > h + margin ||
                        this.life > this.maxLife) {
                        this.reset();
                    }
                }
                
                draw() {
                    // Disegna scia
                    for (let i = 0; i < this.trail.length; i++) {
                        const point = this.trail[i];
                        const progress = i / this.trail.length;
                        const alpha = point.alpha * progress * 0.8;
                        
                        ctx.beginPath();
                        ctx.arc(point.x, point.y, point.size, 0, Math.PI * 2);
                        ctx.fillStyle = this.color.replace(')', `, ${alpha})`).replace('rgb', 'rgba');
                        ctx.fill();
                    }
                    
                    // Testa cometa
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                    ctx.fillStyle = this.color;
                    ctx.fill();
                    
                    // Bagliore
                    if (this.hasGlow) {
                        ctx.beginPath();
                        ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
                        const gradient = ctx.createRadialGradient(
                            this.x, this.y, 0,
                            this.x, this.y, this.size * 2
                        );
                        gradient.addColorStop(0, this.color.replace(')', ', 0.8)').replace('rgb', 'rgba'));
                        gradient.addColorStop(1, this.color.replace(')', ', 0)').replace('rgb', 'rgba'));
                        ctx.fillStyle = gradient;
                        ctx.fill();
                    }
                }
            }
            
            function init() {
                resizeCanvas();
                
                // Crea comete
                for (let i = 0; i < 25; i++) {
                    comets.push(new TinyComet());
                    comets[i].life = Math.random() * 150;
                }
                
                animate();
            }
            
            function animate() {
                // Sfumo molto leggero
                ctx.fillStyle = 'rgba(10, 10, 26, 0.03)';
                ctx.fillRect(0, 0, w, h);
                
                comets.forEach(comet => {
                    comet.update();
                    comet.draw();
                });
                
                requestAnimationFrame(animate);
            }
            
            // Gestione resize
            window.addEventListener('resize', () => {
                resizeCanvas();
            });
            
            init();
            console.log('✅ Sistema comete inizializzato');
            return true;
        });
    }

    // INIZIALIZZAZIONE PRINCIPALE
    console.log('🚀 Inizializzazione sistema stellare...');
    
    initializeStars();
    initializeShootingStars();
    initializeComets();
    
    console.log('✅ Sistema stellare completamente inizializzato');
});

// Gestione errori globale
window.addEventListener('error', (event) => {
    console.error('❌ Errore globale catturato:', event.error);
});
