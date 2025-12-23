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

