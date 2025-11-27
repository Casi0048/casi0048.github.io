// ============================================================
//   DIZIONARIO - VERSIONE EMERGENZA
// ============================================================
function initDictionaryEmergency() {
    console.log("🚨 INIZIALIZZAZIONE EMERGENZA DIZIONARIO");
    
    const btnOpen = document.getElementById("openDict");
    if (!btnOpen) {
        console.error("🚨 Bottone non trovato!");
        return;
    }

    // RIMUOVI tutti gli event listener esistenti
    const newBtn = btnOpen.cloneNode(true);
    btnOpen.parentNode.replaceChild(newBtn, btnOpen);

    // Aggiungi listener SEMPLICE
    newBtn.addEventListener("click", function() {
        console.log("🚨 CLICK EMERGENZA FUNZIONA!");
        document.getElementById('dict-overlay').style.opacity = '1';
        document.getElementById('dict-overlay').style.pointerEvents = 'auto';
        document.getElementById('dict-modal').style.transform = 'translateX(0)';
    });

    console.log("🚨 Dizionario emergenza attivato");
}

// Esegui immediatamente
initDictionaryEmergency();

// E anche dopo il load
window.addEventListener('load', initDictionaryEmergency);
