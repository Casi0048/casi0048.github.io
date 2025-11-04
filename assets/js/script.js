
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
