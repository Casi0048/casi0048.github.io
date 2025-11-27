// ============================================================
//   DIZIONARIO FILOSOFICO — MODALE LATERALE
// ============================================================
document.addEventListener("DOMContentLoaded", () => {
  console.log("📘 Dict.js caricato - CERCO ELEMENTI...");

  // ===== Cerca TUTTI i possibili ID =====
  const possibleButtons = [
    "openDict", "dict-open", "btn-dict", "dictionary-btn", 
    "open-dictionary", "dict-button"
  ];

  let btnOpen = null;
  for (const id of possibleButtons) {
    btnOpen = document.getElementById(id);
    if (btnOpen) {
      console.log(`✅ Trovato bottone con ID: ${id}`);
      break;
    }
  }

  // ===== Elementi principali =====
  const modal = document.getElementById("dict-modal");
  const overlay = document.getElementById("dict-overlay");
  const btnClose = document.getElementById("dict-close");
  const input = document.getElementById("dict-q");
  const btnSearch = document.getElementById("dict-search");
  const btnOpenAll = document.getElementById("open-all");

  // ===== DEBUG COMPLETO =====
  console.log("=== DEBUG DIZIONARIO ===");
  console.log("btnOpen:", btnOpen);
  console.log("modal:", modal);
  console.log("overlay:", overlay);
  console.log("btnClose:", btnClose);
  console.log("input:", input);
  console.log("btnSearch:", btnSearch);
  console.log("btnOpenAll:", btnOpenAll);
  console.log("=========================");

  if (!btnOpen) {
    console.error("❌ Nessun bottone dizionario trovato! Cercato:", possibleButtons);
    
    // Mostra tutti i bottoni nella pagina
    const allButtons = document.querySelectorAll('button, [onclick]');
    console.log("Tutti i bottoni nella pagina:", allButtons);
    return;
  }

  if (!modal || !overlay) {
    console.error("❌ Modale o overlay non trovati!");
    return;
  }

  /* ========== Apertura modale ========== */
  btnOpen.addEventListener("click", (e) => {
    console.log("🎯 Click sul bottone dizionario!", e);
    
    overlay.style.pointerEvents = "auto";
    overlay.style.opacity = "1";
    modal.style.transform = "translateX(0)";
    
    console.log("📘 Modale aperto");
  });

  // [RESTANTE CODICE IDENTICO...]
});
