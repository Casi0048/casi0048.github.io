
// === SISTEMA PARTICELLE LUMINOSE AVANZATO ===
class ParticleSystem {
    constructor() {
        this.particles = [];
        this.canvas = null;
        this.ctx = null;
        this.initCanvas();
    }

    initCanvas() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 2147483600;
        `;
        document.body.appendChild(this.canvas);
        this.resize();
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createExplosion(x, y, intensity = 1) {
        const particleCount = Math.floor(80 * intensity);
        const colors = [
            '#FFD700', '#00CCFF', '#3DDC84', '#B967FF', 
            '#FF6B6B', '#4DFFFF', '#FFAA00', '#FF44FF'
        ];

        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x, y,
                vx: (Math.random() - 0.5) * 12 * intensity,
                vy: (Math.random() - 0.5) * 12 * intensity,
                life: 1,
                decay: 0.02 + Math.random() * 0.03,
                size: 2 + Math.random() * 6,
                color: colors[Math.floor(Math.random() * colors.length)],
                trail: []
            });
        }

        // Effetto shockwave luminoso
        this.createShockwave(x, y, intensity);
        
        // Effetto flash
        this.createFlash(x, y);
    }

    createShockwave(x, y, intensity) {
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                this.particles.push({
                    x, y,
                    vx: 0, vy: 0,
                    life: 1,
                    decay: 0.008,
                    size: 10 + i * 15,
                    color: `rgba(255, 215, 0, ${0.3 - i * 0.05})`,
                    isShockwave: true
                });
            }, i * 50);
        }
    }

    createFlash(x, y) {
        const flash = {
            x, y,
            vx: 0, vy: 0,
            life: 1,
            decay: 0.1,
            size: 100,
            color: 'rgba(255, 255, 255, 0.8)',
            isFlash: true
        };
        this.particles.push(flash);
    }

    update() {
        this.ctx.fillStyle = 'rgba(10, 10, 42, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            
            // Aggiorna posizione
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.1; // gravità

            // Aggiorna vita
            p.life -= p.decay;

            // Salva traccia per le particelle normali
            if (!p.isShockwave && !p.isFlash) {
                p.trail.push({x: p.x, y: p.y});
                if (p.trail.length > 8) p.trail.shift();
            }

            // Rimuovi particelle morte
            if (p.life <= 0) {
                this.particles.splice(i, 1);
                continue;
            }

            // Disegna particella
            this.drawParticle(p);
        }

        requestAnimationFrame(() => this.update());
    }

    drawParticle(p) {
        this.ctx.save();
        
        if (p.isShockwave) {
            // Shockwave circolare
            const gradient = this.ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
            gradient.addColorStop(0, p.color);
            gradient.addColorStop(1, 'transparent');
            
            this.ctx.globalAlpha = p.life * 0.5;
            this.ctx.fillStyle = gradient;
            this.ctx.fillRect(p.x - p.size, p.y - p.size, p.size * 2, p.size * 2);
        } 
        else if (p.isFlash) {
            // Flash luminoso
            const gradient = this.ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
            gradient.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
            gradient.addColorStop(0.3, 'rgba(255, 215, 0, 0.6)');
            gradient.addColorStop(1, 'transparent');
            
            this.ctx.globalAlpha = p.life;
            this.ctx.fillStyle = gradient;
            this.ctx.fillRect(p.x - p.size, p.y - p.size, p.size * 2, p.size * 2);
        } 
        else {
            // Particella normale con scia
            this.ctx.globalAlpha = p.life;
            this.ctx.fillStyle = p.color;
            
            // Disegna scia
            for (let j = 0; j < p.trail.length; j++) {
                const point = p.trail[j];
                const trailAlpha = (j / p.trail.length) * p.life * 0.5;
                this.ctx.globalAlpha = trailAlpha;
                this.ctx.fillRect(point.x - p.size/2, point.y - p.size/2, p.size, p.size);
            }
            
            // Disegna particella principale
            this.ctx.globalAlpha = p.life;
            this.ctx.fillStyle = p.color;
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Glow effect
            this.ctx.shadowColor = p.color;
            this.ctx.shadowBlur = 10;
            this.ctx.fill();
        }

        this.ctx.restore();
    }
}

// Inizializzazione
const particleSystem = new ParticleSystem();
particleSystem.update();

// Funzione globale per triggerare esplosioni
window.createSpectacularExplosion = function(x, y, intensity = 1) {
    particleSystem.createExplosion(x, y, intensity);
};

/* ===== integrazioe ===== */
