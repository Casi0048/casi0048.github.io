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
        readout.style.marginTop = '.25rem';
        readout.style.fontSize = '.8rem';
        readout.style.opacity = '.8';
        
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

            // inizializza riempimento barra
            this.updateSpeedBar();
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
             1: 200,  2: 180,  3: 160,  4: 140,
             5: 120,  6: 100,  7: 80,   8: 60,
             9: 50,  10: 40,  11: 35,  12: 30,
            13: 25,  14: 20,  15: 15,  16: 12,
            17: 10,  18: 8,   19: 6,   20: 4
        };
        
        this.animationSpeed = speedMap[this.speed] || 50;

        this.updateSpeedBar();
        
        if (this.isPlaying) {
            this.restartAnimation();
        }
    }

    // Colore / riempimento barra in base alla velocità
    updateSpeedBar() {
        if (!this.speedSlider) return;
        
        const min = parseInt(this.speedSlider.min || '1', 10);
        const max = parseInt(this.speedSlider.max || '20', 10);
        const val = this.speed;
        const perc = ((val - min) / (max - min)) * 100;

        // usa una variabile CSS per il riempimento
        this.speedSlider.style.setProperty('--fill', `${perc}%`);
    }
    
    toggle() {
        this.isPlaying = !this.isPlaying;
        if (this.toggleBtn) {
            this.toggleBtn.textContent = this.isPlaying ? '⏸️ Ferma' : '▶️ Avvia';
            this.toggleBtn.title = this.isPlaying ? 'Ferma slider' : 'Avvia slider';
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
            this.invertBtn.title = this.direction === 1 ? 'Inverti direzione' : 'Direzione normale';
        }
    }
    
    startAnimation() {
        if (this.animationId) return;
        
        const animate = () => {
            this.position += this.direction * (this.speed / 3);
            
            const containerHeight = this.sliderInner.parentElement.clientHeight;
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
            console.log('✅ Vertical Slider initialized - Speed:', slider.speed);
            window.verticalSlider = slider; // per debug da console
        } catch (error) {
            console.error('❌ Slider initialization failed:', error);
        }
    }, 100);
});


// === SISTEMA DI ESPLOSIONE UNIFICATO ===
document.addEventListener('DOMContentLoaded', function() {
    let explodingText = document.getElementById('exploding');
    if (!explodingText) {
        explodingText = Array.from(document.querySelectorAll('h1,h2,h3,p,span,.hero-title,.headline,.motto'))
            .find(el => el.textContent && el.textContent.includes('Sustine et abstine'));
    }
    const explodeBtn = document.querySelector('#btn-explode');
    const explosionSound = document.getElementById('explosionSound');
    if (!explodingText) return;

    const explosionStyles = `
        .explosion-char {
            display: inline-block;
            will-change: transform, opacity, filter;
        }
        
        .exploding-text.boom-active .explosion-char {
            animation: none !important;
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
                transform: translate(-50%, -50%) scale(25);
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

    function explodeTarget(element) {
        if (!element || element.__exploding) return;
        element.__exploding = true;

        if (explosionSound) {
            try {
                explosionSound.currentTime = 0;
                explosionSound.volume = 0.7;
                explosionSound.play().catch(() => {});
            } catch(_) {}
        }

        element.classList.remove('boom-recomposing');
        element.classList.add('boom-active');
        element.style.border = '2px solid rgba(255,215,0,0.5)';

        createShockwave(element);
        createParticles(element);

        const spans = Array.from(element.querySelectorAll('.explosion-char'));
        if (!spans.length) {
            prepareExplosion();
            return setTimeout(() => explodeTarget(element), 100);
        }

        let finished = 0;
        
        spans.forEach((span, index) => {
            span.style.transform = 'translate(0px, 0px) rotate(0deg)';
            span.style.opacity = '1';
            span.style.filter = 'blur(0px)';
            
            const dx = (Math.random() * 400 - 200);
            const dy = (Math.random() * 300 - 250);
            const rotation = (Math.random() * 360 - 180);
            const delay = index * 15;
            const duration = 800 + Math.random() * 400;

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
                        span.style.transform = 'translate(0px, 0px) rotate(0deg)';
                        span.style.opacity = '1';
                        span.style.filter = 'blur(0px)';
                        
                        finished++;
                        
                        if (finished === spans.length) {
                            element.classList.remove('boom-active');
                            element.classList.add('boom-recomposing');
                            
                            setTimeout(() => {
                                element.classList.remove('boom-recomposing');
                                element.style.border = '';
                                element.__exploding = false;
                            }, 300);
                        }
                    };
                }, 300);
            };
        });
    }

    prepareExplosion();

    if (explodeBtn) {
        explodeBtn.addEventListener('click', function(e){
            e.preventDefault();
            explodeTarget(explodingText);
        });
    }

    explodingText.addEventListener('click', function(){
        explodeTarget(this);
    });
});

// === TIMELINE COSMICA ===
function initCosmicTimeline() {
    try {
        const timelineItems = document.querySelectorAll('.timeline-item');
        if (!timelineItems.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const item = entry.target;
                    const index = Array.from(timelineItems).indexOf(item);
                    
                    item.style.setProperty('--item-index', index);
                    void item.offsetWidth;
                    item.classList.add('visible');
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

// === DIZIONARIO FILOSOFICO ===
document.addEventListener('DOMContentLoaded', () => {
    const form  = document.getElementById('dict-form');
    const input = document.getElementById('dict-q');
    if (!form || !input) return;

    const TRECCANI_SECTION = 'vocabolario';

    function slugifyIT(term) {
        return term
            .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .trim();
    }

    function treccaniURL(term, section = 'vocabolario') {
        const base = 'https://www.treccani.it';
        const simple = slugifyIT(term).replace(/\s+/g, '');
        return section === 'enciclopedia'
            ? `${base}/enciclopedia/${simple}/`
            : `${base}/vocabolario/${simple}/`;
    }

    function wikipediaURL(term) {
        return `https://it.wikipedia.org/wiki/${encodeURIComponent(term.trim().replace(/\s+/g, '_'))}`;
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const q = input.value.trim();
        if (!q) return;

        const checks = form.querySelectorAll('.sources input[type="checkbox"]:checked');
        if (!checks.length) return;

        checks.forEach((chk) => {
            const urlTpl = chk.dataset.url || '';
            let finalURL;

            if (/treccani\.it/i.test(urlTpl)) {
                finalURL = treccaniURL(q, TRECCANI_SECTION);
            } else if (/wikipedia\.org/i.test(urlTpl)) {
                finalURL = wikipediaURL(q);
            } else {
                finalURL = urlTpl.replace('{q}', encodeURIComponent(q));
            }

            window.open(finalURL, '_blank', 'noopener');
        });
    });
});

// === PULSANTE TORNA SU ===
(() => {
    'use strict';

    const ready = (fn) => {
        if (document.readyState !== 'loading') fn();
        else document.addEventListener('DOMContentLoaded', fn, { once: true });
    };

    ready(() => {
        const btn = document.getElementById('backToTop');
        if (!btn) return;

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

        window.addEventListener('scroll', onScroll, { passive: true });
        btn.addEventListener('click', scrollToTop);
        btn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                scrollToTop();
            }
        });

        toggle();
    });
})();


// === QUOTE BUBBLE ===
document.addEventListener('DOMContentLoaded', function() {
    const quotes = document.querySelectorAll('.quote-bubble');
    
    quotes.forEach(quote => {
        quote.addEventListener('click', function() {
            this.classList.add('fade-out');
            setTimeout(() => {
                this.style.display = 'none';
            }, 500);
        });
        
        setTimeout(() => {
            if (quote.style.display === 'none') {
                quote.style.display = 'block';
                quote.classList.remove('fade-out');
            }
        }, 30000);
    });
});

// === INIZIALIZZAZIONE PRINCIPALE ===
document.addEventListener('DOMContentLoaded', function () {
    console.log('🎬 Inizializzazione applicazione');

    // Slider verticale
    setTimeout(() => {
        try {
            const slider = new VerticalSlider();
            window.verticalSlider = slider;
        } catch (error) {
            console.error('❌ Slider initialization failed:', error);
        }
    }, 100);

    // Timeline con delay
    setTimeout(initCosmicTimeline, 1000);
});

// Re-init al resize
window.addEventListener('resize', initCosmicTimeline);
