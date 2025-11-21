
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
  
