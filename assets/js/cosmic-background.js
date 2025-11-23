// SISTEMA STELLARE COMPLETO CON VERIFICHE DI SICUREZZA
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
            const starsContainer = document.getElementById('starsContainer') || document.getElementById('stars');
            
            if (!starsContainer) {
                console.warn('❌ Container stelle non trovato nel DOM');
                return false;
            }
            
            if (!document.body.contains(starsContainer)) {
                console.warn('❌ Container stelle non presente nel document.body');
                return false;
            }

            const starCount = 600;
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

            console.log(`✅ ${starsCreated} stelle base create, ${errors} errori`);
            return starsCreated > 0;
        });
    }

    // 2. GENERATORE DI STELLE AVANZATO
    function initializeAdvancedStars() {
        return safeDOMOperation(() => {
            const container = document.getElementById('starsContainer');
            if (!container) return false;
            
            // Crea stelle normali
            const baseStars = Math.floor((window.innerWidth * window.innerHeight) / 800);
            const starCount = Math.min(600, Math.max(150, baseStars));
            
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
            
            // RESIZE HANDLER
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
            
            console.log('✅ Stelle avanzate create');
            return true;
        });
    }

    // 3. SISTEMA COMETE
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
                
                // Crea 30 cometine
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
            init();
            
            console.log('✅ Sistema comete inizializzato');
            return true;
        });
    }

    // INIZIALIZZAZIONE PRINCIPALE
    console.log('🚀 Inizializzazione sistema stellare...');
    
    initializeStars();
    initializeAdvancedStars();
    initializeComets();
    
    console.log('✅ Sistema stellare completamente inizializzato');
});

// Gestione errori globale
window.addEventListener('error', (event) => {
    console.error('❌ Errore globale catturato:', event.error);
});

    (function() {
        const canvas = document.getElementById("tiny-comets");
        if (!canvas) {
            console.warn('Canvas "tiny-comets" non trovato');
            return;
        }
        
        const ctx = canvas.getContext("2d");
        let w, h;
        const comets = [];
        
        // COLORI PIÙ LUMINOSI E SATURI
        const colors = [
            '#FF4444', '#00FFFF', '#44B7D1', '#88FF88', '#FFFF00',
            '#FF88FF', '#88D8FF', '#FFFF88', '#DD88FF', '#88C1FF',
            '#FFB844', '#88FFAA', '#FF8888', '#88AAFF', '#FF88DD',
            '#FFAA00', '#00FFAA', '#AA00FF', '#FF0088', '#88FF00'
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
                // Posizione iniziale casuale su tutti i bordi
                const side = Math.floor(Math.random() * 4);
                const margin = 20;
                
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
                
                // Angolo verso il centro dello schermo
                const centerX = w / 2;
                const centerY = h / 2;
                this.angle = Math.atan2(centerY - this.y, centerX - this.x);
                
                // Velocità e dimensioni aumentate
                this.speed = Math.random() * 3 + 1.5;
                this.color = colors[Math.floor(Math.random() * colors.length)];
                this.size = Math.random() * 4 + 2; // Da 2 a 6 px
                this.trailLength = Math.floor(Math.random() * 12) + 6; // Scia più lunga
                this.trail = [];
                this.life = 0;
                this.maxLife = 300 + Math.random() * 400;
                
                // Effetti speciali casuali
                this.hasGlow = Math.random() > 0.3;
                this.isFast = Math.random() > 0.7;
                if (this.isFast) this.speed *= 1.5;
            }
            
            update() {
                this.life++;
                
                // Movimento basato sull'angolo
                this.x += Math.cos(this.angle) * this.speed;
                this.y += Math.sin(this.angle) * this.speed;
                
                // Aggiungi punto alla scia con posizione precisa
                this.trail.push({
                    x: this.x, 
                    y: this.y,
                    size: this.size,
                    alpha: 1.0
                });
                
                // Aggiorna alpha della scia esistente
                this.trail.forEach(point => {
                    point.alpha *= 0.85; // Fade più lento
                    point.size *= 0.95;
                });
                
                // Rimuovi punti troppo trasparenti
                if (this.trail.length > this.trailLength) {
                    this.trail.shift();
                }
                
                // Reset se esce dallo schermo o vita terminata
                const margin = 100;
                if (this.x < -margin || this.x > w + margin || 
                    this.y < -margin || this.y > h + margin ||
                    this.life > this.maxLife) {
                    this.reset();
                }
            }
            
            draw() {
                // Disegna la scia - VERSIONE MIGLIORATA
                for (let i = 0; i < this.trail.length; i++) {
                    const point = this.trail[i];
                    const progress = i / this.trail.length;
                    const alpha = point.alpha * progress * 0.9;
                    
                    ctx.beginPath();
                    ctx.arc(point.x, point.y, point.size, 0, Math.PI * 2);
                    
                    // Colore della scia con fade
                    const trailColor = this.color.replace(')', `, ${alpha})`).replace('rgb', 'rgba');
                    ctx.fillStyle = trailColor;
                    ctx.fill();
                    
                    // Aggiungi un bordo glow alla scia
                    if (this.hasGlow) {
                        ctx.beginPath();
                        ctx.arc(point.x, point.y, point.size * 1.8, 0, Math.PI * 2);
                        const glowColor = this.color.replace(')', `, ${alpha * 0.3})`).replace('rgb', 'rgba');
                        ctx.fillStyle = glowColor;
                        ctx.fill();
                    }
                }
                
                // Disegna la testa della cometa - PIÙ LUMINOSA
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();
                
                // Bagliore principale - MOLTO PIÙ LUMINOSO
                if (this.hasGlow) {
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.size * 2.5, 0, Math.PI * 2);
                    const gradient = ctx.createRadialGradient(
                        this.x, this.y, 0,
                        this.x, this.y, this.size * 2.5
                    );
                    gradient.addColorStop(0, this.color.replace(')', ', 0.9)').replace('rgb', 'rgba'));
                    gradient.addColorStop(0.5, this.color.replace(')', ', 0.4)').replace('rgb', 'rgba'));
                    gradient.addColorStop(1, this.color.replace(')', ', 0)').replace('rgb', 'rgba'));
                    ctx.fillStyle = gradient;
                    ctx.fill();
                }
                
                // Effetto stella brillante per le comete veloci
                if (this.isFast) {
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.size * 0.5, 0, Math.PI * 2);
                    ctx.fillStyle = '#FFFFFF';
                    ctx.fill();
                }
            }
        }
        
        function init() {
            resizeCanvas();
            
            // Crea più cometine (40 invece di 30)
            for (let i = 0; i < 40; i++) {
                comets.push(new TinyComet());
                // Distribuisci l'inizio nel tempo più uniformemente
                comets[i].life = Math.random() * 200;
            }
            
            console.log('✅ Comete inizializzate:', comets.length);
            animate();
        }
        
        function animate() {
            // Sfumo più leggero per non scurire troppo
            ctx.fillStyle = 'rgba(10, 10, 26, 0.05)';
            ctx.fillRect(0, 0, w, h);
            
            // Aggiorna e disegna tutte le comete
            comets.forEach(comet => {
                comet.update();
                comet.draw();
            });
            
            requestAnimationFrame(animate);
        }
        
        // Gestione resize ottimizzata
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                resizeCanvas();
                // Ricrea le comete per adattarsi alle nuove dimensioni
                comets.length = 0;
                for (let i = 0; i < 40; i++) {
                    comets.push(new TinyComet());
                }
            }, 250);
        });
        
        // Avvia quando la pagina è caricata
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
        } else {
            init();
        }
        
    })();

