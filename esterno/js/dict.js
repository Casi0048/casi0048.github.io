/* ============================================================
   🔘 DIZIONARIO FILOSOFICO - STILE UNIFICATO
   ============================================================ */
/* ============================================================
   FAB DIZIONARIO – Pulsante Fisso
   ============================================================ */
#dict-fab {
  position: fixed;
  bottom: 150px; /* Sopra "Torna su" */
  right: 20px;
  background: linear-gradient(135deg, 
    rgba(255, 215, 0, 0.9) 0%, 
    rgba(255, 216, 106, 0.8) 100%);
  color: #0a0a1a;
  border: none;
  border-radius: 25px;
  padding: 12px 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  z-index: 9997;
  box-shadow: 
    0 6px 15px rgba(255, 215, 0, 0.3),
    0 0 20px rgba(255, 216, 106, 0.2);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  font-size: 0.95rem;
  letter-spacing: 0.3px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 215, 0, 0.4);
}

#dict-fab:hover {
  transform: translateY(-3px) scale(1.05);
  box-shadow: 
    0 10px 25px rgba(255, 215, 0, 0.4),
    0 0 30px rgba(255, 216, 106, 0.3);
  background: linear-gradient(135deg, 
    rgba(255, 215, 0, 1) 0%, 
    rgba(255, 216, 106, 0.9) 100%);
  border-color: rgba(255, 215, 0, 0.7);
}

#dict-fab:active {
  transform: translateY(0) scale(1);
  box-shadow: 
    0 4px 10px rgba(255, 215, 0, 0.3),
    0 0 15px rgba(255, 216, 106, 0.2);
}

.fab-icona {
  font-size: 1.3em;
  filter: drop-shadow(0 2px 3px rgba(0,0,0,0.2));
}

.fab-label {
  font-size: 0.95em;
  white-space: nowrap;
  text-shadow: 0 1px 2px rgba(0,0,0,0.1);
}

/* ============================================================
   OVERLAY DIZIONARIO
   ============================================================ */
#dict-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(3px);
  z-index: 9998;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
}

#dict-overlay.active {
  opacity: 1;
  visibility: visible;
}

/* ============================================================
   MODALE DIZIONARIO LATERALE
   ============================================================ */
#dict-modal {
  position: fixed;
  top: 0;
  right: 0;
  width: var(--modal-width);
  height: 100vh;
  background: var(--dark-bg);
  backdrop-filter: blur(20px);
  border-left: 1px solid rgba(255,255,255,0.1);
  transform: translateX(100%);
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  z-index: 9999;
  box-shadow: -5px 0 30px rgba(0,0,0,0.3);
  border-top: 3px solid transparent;
  border-image: linear-gradient(90deg, transparent, var(--border-gold), transparent) 1;
}

#dict-modal::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, 
    transparent, 
    var(--border-gold), 
    transparent);
  z-index: 1;
}

#dict-modal::after {
  content: '';
  position: absolute;
  top: 1px;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, 
    transparent, 
    rgba(255,215,0,0.3), 
    transparent);
  z-index: 1;
}

#dict-modal.open {
  transform: translateX(0);
  animation: modalSlideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

/* ============================================================
   HEADER MODALE
   ============================================================ */
.dict-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.4rem 1.8rem;
  border-bottom: 1px solid rgba(255,215,0,0.2);
  background: linear-gradient(
    135deg,
    rgba(10,10,20,0.95) 0%,
    rgba(20,20,40,0.95) 100%
  );
  flex-shrink: 0;
}

.dict-header h2 {
  color: var(--primary-gold);
  font-family: 'Cinzel Decorative', cursive;
  margin: 0;
  font-size: 1.4rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-shadow: 
    0 2px 4px rgba(0,0,0,0.3),
    0 0 20px rgba(255,216,106,0.2);
  display: flex;
  align-items: center;
  gap: 10px;
}

.dict-header h2::before {
  content: '📖';
  font-size: 1.2rem;
  opacity: 0.8;
}

#dict-close {
  background: rgba(255,215,0,0.9);
  border: none;
  color: #0a0a1a;
  font-size: 1.6rem;
  cursor: pointer;
  padding: 0;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  line-height: 1;
  font-weight: bold;
  box-shadow: 
    inset 0 2px 4px rgba(255,255,255,0.3),
    0 2px 8px rgba(0,0,0,0.2);
}

#dict-close:hover {
  background: var(--primary-gold);
  transform: scale(1.15) rotate(90deg);
  box-shadow: 
    inset 0 2px 4px rgba(255,255,255,0.4),
    0 4px 12px rgba(255,216,106,0.4);
  color: #000;
}

/* ============================================================
   CORPO MODALE
   ============================================================ */
.dict-modal-body {
  padding: 1.8rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  flex: 1;
  overflow-y: auto;
  background-image: 
    radial-gradient(circle at 10% 10%, rgba(255,215,0,0.02) 1px, transparent 1px),
    radial-gradient(circle at 90% 90%, rgba(0,204,255,0.02) 1px, transparent 1px);
  background-size: 40px 40px;
}

/* Scrollbar migliorata */
.dict-modal-body::-webkit-scrollbar {
  width: 8px;
}

.dict-modal-body::-webkit-scrollbar-track {
  background: rgba(255,255,255,0.03);
  border-radius: 4px;
  margin: 4px 0;
}

.dict-modal-body::-webkit-scrollbar-thumb {
  background: linear-gradient(
    to bottom,
    rgba(255,215,0,0.4),
    rgba(255,215,0,0.6)
  );
  border-radius: 4px;
  border: 1px solid rgba(255,215,0,0.2);
}

.dict-modal-body::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(
    to bottom,
    rgba(255,215,0,0.6),
    rgba(255,215,0,0.8)
  );
  box-shadow: 0 0 8px rgba(255,215,0,0.3);
}

/* ============================================================
   INPUT RICERCA
   ============================================================ */
#dict-q {
  width: 100%;
  padding: 1rem 3rem 1rem 1.2rem;
  border: 1px solid rgba(255,215,0,0.3);
  border-radius: 12px;
  background: linear-gradient(
    135deg,
    rgba(20,20,40,0.9) 0%,
    rgba(25,25,45,0.9) 100%
  );
  color: var(--accent-red);
  font-size: 1rem;
  transition: all 0.3s ease;
  font-family: 'Montserrat', sans-serif;
  box-sizing: border-box;
}

#dict-q::placeholder {
  color: rgba(233, 238, 245, 0.5);
  font-style: italic;
  transition: opacity 0.3s ease;
}

#dict-q:focus::placeholder {
  opacity: 0.3;
}

#dict-q:focus {
  outline: none;
  border-color: rgba(255,215,0,0.8);
  box-shadow: 
    0 0 0 3px rgba(255,215,0,0.15),
    inset 0 2px 8px rgba(0,0,0,0.2);
  transform: translateY(-1px);
}

/* ============================================================
   PULSANTI RICERCA (STILE UNIFICATO CON FAB)
   ============================================================ */
#dict-search,
#open-all {
  padding: 5px 20px;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  font-size: 0.95rem;
  letter-spacing: 0.3px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  position: relative;
  overflow: hidden;
}

#dict-search {
  background: linear-gradient(135deg, var(--accent-blue) 0%, #00b8eb 100%);
  color: #0a0a1a;
  box-shadow: 
    0 6px 15px rgba(0,204,255,0.3),
    0 0 20px rgba(0,204,255,0.2);
  border: 1px solid rgba(0,204,255,0.4);
}

#dict-search:hover {
  background: linear-gradient(135deg, #00b8eb 0%, #00a0d4 100%);
  transform: translateY(-3px) scale(1.05);
  box-shadow: 
    0 10px 25px rgba(0,204,255,0.4),
    0 0 30px rgba(0,204,255,0.3);
}

#open-all {
  background: linear-gradient(135deg, 
    rgba(255, 215, 0, 0.9) 0%, 
    rgba(255, 216, 106, 0.8) 100%);
  color: #0a0a1a;
  box-shadow: 
    0 6px 15px rgba(255, 215, 0, 0.3),
    0 0 20px rgba(255, 216, 106, 0.2);
  border: 1px solid rgba(255, 215, 0, 0.4);
}

#open-all:hover {
  background: linear-gradient(135deg, 
    rgba(255, 215, 0, 1) 0%, 
    rgba(255, 216, 106, 0.9) 100%);
  transform: translateY(-3px) scale(1.05);
  box-shadow: 
    0 10px 25px rgba(255, 215, 0, 0.4),
    0 0 30px rgba(255, 216, 106, 0.3);
}

/* ============================================================
   SUGGERIMENTI
   ============================================================ */
.dict-suggestions {
  margin: 10px 0;
  max-height: 200px;
  overflow-y: auto;
  border-radius: 12px;
  border: 1px solid rgba(255,215,0,0.2);
  background: linear-gradient(
    135deg,
    rgba(20,20,40,0.9) 0%,
    rgba(25,25,45,0.9) 100%
  );
}

.suggestion-item {
  padding: 12px 15px;
  cursor: pointer;
  border-bottom: 1px solid rgba(255,255,255,0.1);
  color: var(--text-light);
  font-family: 'Montserrat', sans-serif;
  font-size: 0.95rem;
  transition: all 0.2s ease;
}

.suggestion-item:hover {
  background: rgba(255,215,0,0.1);
  color: var(--primary-gold);
  padding-left: 20px;
}

.suggestion-item:last-child {
  border-bottom: none;
}

/* ============================================================
   FONTI (SOURCES)
   ============================================================ */
.sources {
  margin: 20px 0;
  padding: 15px;
  background: linear-gradient(
    135deg,
    rgba(20,20,40,0.7) 0%,
    rgba(25,25,45,0.7) 100%
  );
  border-radius: 12px;
  border: 1px solid rgba(255,215,0,0.2);
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.sources label {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  color: var(--text-light);
  font-family: 'Montserrat', sans-serif;
  font-size: 0.95rem;
  padding: 10px;
  border-radius: 8px;
  transition: all 0.3s ease;
  background: rgba(255,255,255,0.05);
}

.sources label:hover {
  background: rgba(255,215,0,0.1);
  transform: translateX(5px);
}

.sources input[type="checkbox"] {
  accent-color: var(--primary-gold);
  width: 18px;
  height: 18px;
  cursor: pointer;
}

/* ============================================================
   ANIMAZIONI
   ============================================================ */
@keyframes modalSlideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes modalSlideOut {
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
}

/* ============================================================
   RESPONSIVE DESIGN
   ============================================================ */
@media (max-width: 768px) {
  #dict-modal {
    width: 100vw;
    border-left: none;
  }
  
  .dict-header {
    padding: 1.2rem 1.4rem;
  }
  
  .dict-header h2 {
    font-size: 1.2rem;
  }
  
  .dict-modal-body {
    padding: 1.4rem;
    gap: 1.2rem;
  }
  
  #dict-fab {
    bottom: 120px;
    right: 15px;
    padding: 10px 16px;
    font-size: 0.9rem;
  }
  
  .fab-label {
    display: none; /* Nascondi testo su mobile */
  }
}

@media (max-width: 480px) {
  #dict-fab {
    bottom: 100px;
    padding: 10px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    justify-content: center;
  }
  
  .fab-icona {
    font-size: 1.5em;
    margin: 0;
  }
  
  .dict-modal-body {
    padding: 1rem;
  }
  
  #dict-search,
  #open-all {
    width: 100%;
    margin-bottom: 10px;
  }
}

/* ============================================================
   STATI ATTIVI/FOCUS
   ============================================================ */
#dict-fab:focus-visible,
#dict-close:focus-visible,
#dict-search:focus-visible,
#open-all:focus-visible,
#dict-q:focus-visible {
  outline: 2px solid var(--accent-blue);
  outline-offset: 2px;
}

/* ============================================================
   ACCESSIBILITÀ
   ============================================================ */
@media (prefers-reduced-motion: reduce) {
  #dict-fab,
  #dict-modal,
  #dict-close,
  #dict-search,
  #open-all,
  .sources label,
  .suggestion-item,
  #dict-q,
  #dict-overlay {
    transition: none !important;
    animation: none !important;
  }
  
  #dict-fab:hover,
  #dict-search:hover,
  #open-all:hover,
  .sources label:hover,
  .suggestion-item:hover,
  #dict-close:hover {
    transform: none !important;
  }
}

// ========== GESTIONE ERRORI GLOBALE ==========
window.addEventListener('error', function(e) {
  console.error('Errore globale:', e.error);
});

// Safe element selector con fallback
function safeQuery(selector, context = document) {
  try {
    return context.querySelector(selector);
  } catch (error) {
    console.warn(`Elemento ${selector} non trovato:`, error);
    return null;
  }
}

