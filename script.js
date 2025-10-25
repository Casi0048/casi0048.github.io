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
// === GENERATORE DI STELLE - VERSIONE CORRETTA ===
(function() {
    const container = document.getElementById('starsContainer');
    if (!container) return;
    
    // Crea stelle normali - QUESTA RIGA MANCAVA!
    const starCount = Math.min(900, Math.floor((window.innerWidth * window.innerHeight) / 2000));
    for (let i = 0; i < starCount; i++) createStar();
    
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
        star.style.setProperty('--duration', (4 + Math.random() * 8) + 's');
        star.style.setProperty('--delay', (Math.random() * 15) + 's');
        
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
            const newStarCount = Math.min(600, Math.floor((window.innerWidth * window.innerHeight) / 2000));
            for (let i = 0; i < newStarCount; i++) createStar();
            createMultipleShootingStars();
        }, 250);
    });
    
    // AVVIA SUBITO
    setTimeout(createMultipleShootingStars, 500);
})();
// === SCRIPT ESPLOSIONE ULTIMATE ===
document.addEventListener('DOMContentLoaded', function() {
    const motto = document.querySelector('.motto.exploding-text');
    if (!motto) return;
    
    // Aggiungi classe ultimate
    motto.classList.add('ultimate');
    
    // Prepara le lettere per l'esplosione
    function prepareExplosion() {
        const text = motto.querySelector('.m-text');
        if (!text) return;
        
        const originalText = text.textContent;
        text.innerHTML = '';
        
        // Crea span per ogni carattere
        for (let i = 0; i < originalText.length; i++) {
            const charSpan = document.createElement('span');
            charSpan.className = 'char';
            charSpan.textContent = originalText[i];
            charSpan.style.setProperty('--index', i);
            charSpan.style.animationDelay = `${i * 0.05}s`;
            text.appendChild(charSpan);
        }
    }
    
    // Effetto esplosione completo
    function triggerUltimateExplosion(event) {
        if (motto.classList.contains('boom-active')) {
            // Se già esploso, ricomponi
            recomposeText();
        } else {
            // Altrimenti, esplodi
            explodeText(event);
        }
    }
    
    function explodeText(event) {
        const rect = motto.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Effetto pre-esplosione
        motto.classList.add('boom-primed');
        
        setTimeout(() => {
            motto.classList.remove('boom-primed');
            motto.classList.add('boom-active');
            
            // Crea onda d'urto
            createShockwave(centerX, centerY);
            
            // Crea particelle esplosive
            createExplosionParticles(centerX, centerY);
            
            // Effetto sonoro (se disponibile)
            playExplosionSound();
            
        }, 800);
    }
    
    function recomposeText() {
        motto.classList.remove('boom-active');
        motto.classList.add('boom-recomposing');
        
        setTimeout(() => {
            motto.classList.remove('boom-recomposing');
        }, 2000);
    }
    
    function createShockwave(x, y) {
        const shockwave = document.createElement('div');
        shockwave.className = 'explosion-shockwave';
        shockwave.style.setProperty('--x', `${x}px`);
        shockwave.style.setProperty('--y', `${y}px`);
        document.body.appendChild(shockwave);
        
        setTimeout(() => {
            shockwave.remove();
        }, 1500);
    }
    
    function createExplosionParticles(x, y) {
        const colors = ['#ffd700', '#00ccff', '#b967ff', '#ff4444', '#00ff88'];
        const particleCount = 30;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'explosion-particles';
            particle.style.setProperty('--x', `${x}px`);
            particle.style.setProperty('--y', `${y}px`);
            particle.style.setProperty('--particle-color', colors[i % colors.length]);
            particle.style.setProperty('--p-dx', `${(Math.random() - 0.5) * 400}px`);
            particle.style.setProperty('--p-dy', `${(Math.random() - 0.5) * 400}px`);
            particle.style.animationDelay = `${Math.random() * 0.5}s`;
            
            document.body.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 2000);
        }
    }
    
    function playExplosionSound() {
        // Usa il suono esistente o creane uno nuovo
        const explosionSound = document.getElementById('explosionSound');
        if (explosionSound) {
            try {
                explosionSound.currentTime = 0;
                explosionSound.volume = 0.7;
                explosionSound.play().catch(() => {});
            } catch (e) {}
        }
    }
    
    // Inizializza
    prepareExplosion();
    
    // Event listeners
    motto.addEventListener('click', triggerUltimateExplosion);
    
    // Aggiungi anche l'event listener per il pulsante Esplodi esistente
    const explodeBtn = document.getElementById('btn-explode');
    if (explodeBtn) {
        explodeBtn.addEventListener('click', function() {
            triggerUltimateExplosion({});
        });
    }
});

// Helper per numeri random
Math.random = function() {
    return window.crypto ? window.crypto.getRandomValues(new Uint32Array(1))[0] / 4294967296 : Math.random();
};
/* === SISTEMA DI ESPLOSIONE COMPLETO (con animazione lettere) === */
document.addEventListener('DOMContentLoaded', function() {
  // 1) Target robusto
  let explodingText = document.getElementById('exploding');
  if (!explodingText) {
    explodingText = Array.from(document.querySelectorAll('h1,h2,h3,p,span,.hero-title,.headline,.motto'))
      .find(el => el.textContent && el.textContent.includes('Sustine et abstine'));
  }
  const explodeBtn = document.querySelector('#btn-explode');
  const explosionSound = document.getElementById('explosionSound');
  if (!explodingText) return;

  // 2) Igiene testo (evita i “��”)
  const clean = s => (s||'')
    .normalize('NFC')
    .replace(/[\uFEFF\u200B-\u200D\u2060]/g, '')  // BOM/zero-width
    .replace(/\uFFFD/g, '');                      // replacement char

  // 3) Split in span.char (una sola volta)
  function prepareExplosion() {
    if (explodingText.__split) return;
    const text = clean(explodingText.textContent);
    explodingText.__originalText = text;
    explodingText.classList.add('exploding-text');
    explodingText.innerHTML = '';
    for (let i = 0; i < text.length; i++) {
      const s = document.createElement('span');
      s.className = 'char';
      s.textContent = text[i];
      s.style.display = 'inline-block';
      s.style.willChange = 'transform,opacity,filter';
      s.style.setProperty('--index', i);
      explodingText.appendChild(s);
    }
    explodingText.__split = true;
  }

  // 4) Effetto shockwave (riusa i tuoi elementi)
  function createShockwave(element) {
    const rect = element.getBoundingClientRect();
    const shockwave = document.createElement('div');
    shockwave.className = 'explosion-shockwave';
    shockwave.style.setProperty('--x', rect.left + rect.width / 2 + 'px');
    shockwave.style.setProperty('--y', rect.top + rect.height / 2 + 'px');
    document.body.appendChild(shockwave);
    setTimeout(() => shockwave.remove(), 1500);
  }

  // 5) Particelle (riusa le tue classi)
  function createParticles(element) {
    const rect = element.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    for (let i = 0; i < 15; i++) {
      const p = document.createElement('div');
      p.className = 'explosion-particles';
      p.style.setProperty('--x', cx + 'px');
      p.style.setProperty('--y', cy + 'px');
      p.style.setProperty('--p-dx', (Math.random() * 400 - 200) + 'px');
      p.style.setProperty('--p-dy', (Math.random() * 300 - 250) + 'px');
      p.style.setProperty('--particle-color',
        ['#ffd700', '#00ccff', '#b967ff', '#ff6666'][Math.floor(Math.random() * 4)]
      );
      document.body.appendChild(p);
      setTimeout(() => p.remove(), 2000);
    }
  }

  // 6) ANIMAZIONE LETTERE (uscita → rientro)
  function explodeTarget(element) {
    if (!element || element.__exploding) return;
    element.__exploding = true;

    // audio
    if (explosionSound) {
      try {
        explosionSound.currentTime = 0;
        explosionSound.volume = 0.7;
        const pr = explosionSound.play();
        if (pr && pr.catch) pr.catch(()=>{});
      } catch(_) {}
    }

    // contorno visibile e classi decorative (se usi CSS su .boom-*)
    element.classList.remove('boom-recomposing');
    element.classList.add('boom-active');
    // “lock” del bordo contro override esterni
    element.style.border = '2px solid rgba(255,215,0,.30)';

    // effetti extra
    createShockwave(element);
    createParticles(element);

    const INTENSITY = 1.35;
    const DURATION  = 780;    // ms base
    const RETURN_DELAY = 280; // ms prima del rientro
    const STAGGER  = 14;      // ms per lettera

    const spans = Array.from(element.querySelectorAll('.char'));
    // se per qualche motivo non è split: fallo ora e riprendi i spans
    if (!spans.length) { prepareExplosion(); return explodeTarget(element); }

    let finished = 0;
    spans.forEach((s, i) => {
      const dx = (Math.random()*180 - 90) * INTENSITY;
      const dy = (Math.random()*140 - 70) * INTENSITY + (i%5===0 ? (12+Math.random()*14) : 0);
      const rz = (Math.random()*320 - 160);
      const delay = i * STAGGER * (0.7 + Math.random()*0.65);
      const dur = DURATION * (0.85 + Math.random()*0.4);

      // uscita
      const out = s.animate([
        { transform:'translate(0,0) rotate(0deg)',                     opacity:1, filter:'blur(0px)' },
        { transform:`translate(${dx*0.6}px,${dy*0.6}px) rotate(${rz*0.6}deg)`, opacity:1, filter:'blur(0.4px)' },
        { transform:`translate(${dx}px,${dy}px) rotate(${rz}deg)`,      opacity:0, filter:'blur(1px)' }
      ], { duration: dur, delay, easing:'cubic-bezier(.12,.74,0,.98)', fill:'forwards' });

      out.addEventListener?.('finish', ()=>{
        // rientro
        s.animate([
          { transform:`translate(${dx}px,${dy}px) rotate(${rz}deg)`, opacity:0, filter:'blur(1px)' },
          { transform:'translate(0,0) rotate(0deg)',                 opacity:1, filter:'blur(0px)' }
        ], { duration: dur*0.9, delay: RETURN_DELAY + Math.random()*150, easing:'cubic-bezier(.2,1.08,.2,1)', fill:'forwards' })
        .addEventListener?.('finish', ()=>{
          finished++;
          if (finished === spans.length) {
            element.classList.remove('boom-active');
            element.classList.add('boom-recomposing');
            setTimeout(()=>{
              element.classList.remove('boom-recomposing');
              element.__exploding = false;
            }, 300); // piccola coda
          }
        });
      });
    });
  }

  // 7) Prepare e bind eventi
  prepareExplosion();

  // globale (se serve altrove)
  window.explodeTarget = explodeTarget;

  if (explodeBtn) {
    explodeBtn.addEventListener('click', function(e){
      e.preventDefault();
      explodeTarget(explodingText);
    });
  }
  explodingText.addEventListener('click', function(){
    explodeTarget(this);
  });

  console.log('Sistema di esplosione caricato - Pronto per esplodere!');
});

// helper audio opzionale
function softPlay(audio, volume, delay) {
  if (!audio) return Promise.reject('Audio element not found');
  return new Promise((resolve) => {
    setTimeout(() => {
      try {
        audio.volume = volume || 1.0;
        audio.muted = false;
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise.then(resolve).catch(resolve);
        } else {
          resolve();
        }
      } catch (e) { resolve(); }
    }, delay || 0);
  });
}

function prepareExplosion(host){
  const wrap = host.querySelector('.m-text');
  if (!wrap || wrap.__split) return;

  const clean = s => (s||'')
    .normalize('NFC')
    .replace(/[\uFEFF\u200B-\u200D\u2060]/g,'')   // zero-width/BOM
    .replace(/\uFFFD/g,'');                       // replacement char

  const text = clean(wrap.textContent);
  wrap.__originalText = text;
  wrap.textContent = '';

  let i = 0;
  for (const ch of text) {                        // ✅ per-codepoint
    const span = document.createElement('span');
    span.className = 'char';
    span.textContent = ch;
    span.style.setProperty('--index', i++);
    span.style.display = 'inline-block';
    span.style.willChange = 'transform,opacity,filter';
    wrap.appendChild(span);
  }
  wrap.__split = true;
}
