// SISTEMA STELLARE COMPLETO CON VERIFICHE DI SICUREZZA - VERSIONE CORRETTA
document.addEventListener('DOMContentLoaded', function() {
    
    // 1. PRELOAD RISORSE CRITICHE - CORRETTO E SEMPLIFICATO
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

    // 2. PRELOAD CORRETTO - SOLO SE NON ESISTE GIÀ
    criticalResources.forEach(resource => {
        if (resource.includes('font-awesome')) {
            safeDOMOperation(() => {
                // Verifica se Font Awesome è già caricato
                const existingFA = document.querySelector('link[href*="font-awesome"]');
                if (existingFA) {
                    console.log('✅ Font Awesome già presente');
                    return;
                }
                
                const preload = document.createElement('link');
                preload.rel = 'preload';
                preload.href = resource;
                preload.as = 'style';
                preload.crossOrigin = 'anonymous';
                
                if (document.head) {
                    document.head.appendChild(preload);
                    console.log('✅ Preload risorsa con crossorigin:', resource);
                }
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

            const starCount = 800;
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

    // 6. INIZIALIZZAZIONE SICURA EFFETTI STELLARI - CORRETTA
    function initializeStarEffects() {
        safeDOMOperation(
            () => {
                const starsContainer = document.getElementById('starsContainer');
                if (starsContainer) {
                    // Se non esiste initStars, usa initializeStars
                    if (typeof initStars === 'function') {
                        initStars();
                        console.log('✅ Effetti stelle avanzati attivati');
                    } else {
                        initializeStars(); // Usa la funzione che esiste
                        console.log('✅ Effetti stelle base attivati');
                    }
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

// 9. GESTIONE ERRORI GLOBALE (FUORI DAL DOMContentLoaded)
window.addEventListener('error', (event) => {
    console.error('❌ Errore globale catturato:', event.error);
}); 

// 10. GESTIONE STATO CONNESSIONE (FUORI DAL DOMContentLoaded)
window.addEventListener('online', () => {
    console.log('📶 Connessione ripristinata');
    document.body?.classList?.remove('offline');
});

window.addEventListener('offline', () => {
    console.warn('📶 Connessione persa');
    document.body?.classList?.add('offline');
});

// 11. SAFE ELEMENT SELECTOR (FUORI DAL DOMContentLoaded)
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

/* ===== AGGIUTO ===== */

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
 /* ===== atro js ===== */
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
  

