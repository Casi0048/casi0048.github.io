

// === ESPLOSIONE CHE SCUOTE LA PAGINA ===
function createPageShakingExplosion() {
    // Crea l'effetto visivo dell'esplosione
    const explosionOverlay = document.createElement('div');
    explosionOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: radial-gradient(circle at center, 
            rgba(255,255,255,0.8) 0%,
            rgba(255,215,0,0.6) 20%,
            rgba(255,100,0,0.4) 40%,
            rgba(255,0,0,0.2) 60%,
            transparent 80%
        );
        pointer-events: none;
        z-index: 2147483600;
        opacity: 0;
        animation: explosionFlash 0.8s ease-out;
    `;
    
    // Aggiungi i keyframes per l'esplosione
    const explosionStyle = document.createElement('style');
    explosionStyle.textContent = `
        @keyframes explosionFlash {
            0% { 
                opacity: 0; 
                transform: scale(0.1);
            }
            20% { 
                opacity: 1; 
                transform: scale(1.2);
            }
            40% { 
                opacity: 0.8; 
                transform: scale(1.5);
            }
            100% { 
                opacity: 0; 
                transform: scale(2);
            }
        }
        
        @keyframes shakePage {
            0%, 100% { transform: translateX(0) translateY(0) rotate(0); }
            10% { transform: translateX(-10px) translateY(-5px) rotate(-1deg); }
            20% { transform: translateX(8px) translateY(4px) rotate(1deg); }
            30% { transform: translateX(-6px) translateY(-3px) rotate(-0.5deg); }
            40% { transform: translateX(4px) translateY(2px) rotate(0.5deg); }
            50% { transform: translateX(-2px) translateY(-1px) rotate(-0.25deg); }
            60% { transform: translateX(1px) translateY(0.5px) rotate(0.25deg); }
        }
        
        .page-shake {
            animation: shakePage 0.8s ease-out;
        }
    `;
    
    document.head.appendChild(explosionStyle);
    document.body.appendChild(explosionOverlay);
    
    // Applica l'effetto di scuotimento a tutto il body
    document.body.classList.add('page-shake');
    
    // Riproduci il suono dell'esplosione se disponibile
    const explosionSound = document.getElementById('explosionSound');
    if (explosionSound) {
        explosionSound.currentTime = 0;
        explosionSound.volume = 0.7;
        explosionSound.play().catch(e => console.log('Audio non riprodotto:', e));
    }
    
    // Crea particelle esplosive aggiuntive
    createExplosionParticles();
    
    // Rimuovi gli effetti dopo l'animazione
    setTimeout(() => {
        if (explosionOverlay.parentNode) {
            explosionOverlay.parentNode.removeChild(explosionOverlay);
        }
        document.body.classList.remove('page-shake');
        if (explosionStyle.parentNode) {
            explosionStyle.parentNode.removeChild(explosionStyle);
        }
    }, 800);
}

// Crea particelle esplosive che si diffondono sullo schermo
function createExplosionParticles() {
    const colors = ['#FFD700', '#FF6B00', '#FF0000', '#FFFFFF', '#00CCFF'];
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        const size = Math.random() * 15 + 5;
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        particle.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            border-radius: 50%;
            pointer-events: none;
            z-index: 2147483601;
            opacity: 0.8;
            box-shadow: 0 0 10px ${color};
        `;
        
        document.body.appendChild(particle);
        
        // Animazione casuale per ogni particella
        const angle = Math.random() * Math.PI * 2;
        const distance = 100 + Math.random() * 200;
        const duration = 0.5 + Math.random() * 0.5;
        
        particle.animate([
            {
                transform: 'translate(-50%, -50%) scale(1)',
                opacity: 0.8
            },
            {
                transform: `translate(${Math.cos(angle) * distance - 50}%, ${Math.sin(angle) * distance - 50}%) scale(0)`,
                opacity: 0
            }
        ], {
            duration: duration * 1000,
            easing: 'ease-out',
            fill: 'forwards'
        });
        
        // Rimuovi la particella dopo l'animazione
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, duration * 1000);
    }
}

// === ATTIVA L'ESPLOSIONE CON IL PULSANTE ESISTENTE ===
document.addEventListener('DOMContentLoaded', function() {
    const explodeBtn = document.getElementById('btn-explode');
    if (explodeBtn) {
        explodeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            createPageShakingExplosion();
        });
    }
    
    // Aggiungi anche l'esplosione al click sul motto
    const explodingText = document.getElementById('exploding');
    if (explodingText) {
        explodingText.addEventListener('click', function() {
            createPageShakingExplosion();
        });
    }
});

// === ESPLOSIONE AUTOMATICA AL CARICAMENTO (OPZIONALE) ===
// Rimuovi il commento se vuoi l'esplosione automatica all'avvio
/*
window.addEventListener('load', function() {
    setTimeout(() => {
        createPageShakingExplosion();
    }, 2000);
});
*/

(function(){
  try{
    window.showSearchPanelOnResults = function(panelSel, items){
      var panel = document.querySelector(panelSel || '#search-panel, #searchPanel, .search-panel');
      if(!panel) return;
      if(items && items.length){ panel.style.display = 'block'; panel.removeAttribute('aria-hidden'); }
    };
  }catch(_){}
})();
</script>
<script>
(function(){
  if (!('serviceWorker' in navigator)) return;
  window.addEventListener('load', function(){
    navigator.serviceWorker.register('/sw.js')
      .then(reg => console.log('✅ SW registrato:', reg.scope))
      .catch(err => console.error('❌ SW registration failed:', err));
  });
})();

(function () {
  // 1) Se siamo su /index.html ⇒ sostituisci in barra con /
  if (location.pathname.toLowerCase() === '/index.html') {
    const clean = '/' + (location.search || '') + (location.hash || '');
    history.replaceState(null, '', clean);
  }

  // 2) Rewriter dei link: se un <a> punta a index.html, trasformalo in /
  function rewriteAnchor(a) {
    const href = a.getAttribute('href') || '';
    if (/(^|\/)index\.html(\?|#|$)/i.test(href)) {
      // conserva query e hash
      const u = new URL(href, location.origin);
      a.setAttribute('href', '/' + (u.search || '') + (u.hash || ''));
    }
  }

  // iniziale
  document.querySelectorAll('a[href]').forEach(rewriteAnchor);

  // 3) Intercetta i click (anche su link generati dinamicamente) e forza /
  document.addEventListener('click', function (e) {
    const a = e.target.closest('a[href]');
    if (!a) return;
    const href = a.getAttribute('href') || '';
    if (/(^|\/)index\.html(\?|#|$)/i.test(href)) {
      e.preventDefault();
      const u = new URL(a.href, location.origin);
      // naviga a "/" preservando query e hash
      location.assign('/' + (u.search || '') + (u.hash || ''));
    }
  }, { capture: true });
})();
