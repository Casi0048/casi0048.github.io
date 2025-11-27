// ============================================================
//   DIZIONARIO FILOSOFICO — VERSIONE CORRETTA
// ============================================================
document.addEventListener("DOMContentLoaded", function() {
    console.log("📘 Dict.js - Inizializzazione");

    const btnOpen = document.getElementById("openDict");
    const modal = document.getElementById("dict-modal");
    const overlay = document.getElementById("dict-overlay");
    const btnClose = document.getElementById("dict-close");
    const input = document.getElementById("dict-q");
    const btnSearch = document.getElementById("dict-search");
    const btnOpenAll = document.getElementById("open-all");

    // Verifica elementi
    if (!btnOpen || !modal || !overlay) {
        console.error("❌ Elementi mancanti");
        return;
    }

    console.log("✅ Tutti gli elementi trovati");

    // === APERTURA MODALE ===
    function openDict() {
        console.log("🎯 Apertura modale attivata");
        overlay.style.display = 'block';
        modal.style.display = 'block';
        
        // Trigger reflow
        void overlay.offsetHeight;
        void modal.offsetHeight;
        
        overlay.style.opacity = '1';
        overlay.style.pointerEvents = 'auto';
        modal.style.transform = 'translateX(0)';
    }

    // === CHIUSURA MODALE ===
    function closeDict() {
        console.log("🔒 Chiusura modale");
        overlay.style.opacity = '0';
        overlay.style.pointerEvents = 'none';
        modal.style.transform = 'translateX(100%)';
        
        // Nascondi dopo animazione
        setTimeout(() => {
            overlay.style.display = 'none';
            modal.style.display = 'none';
        }, 300);
    }

    // === EVENT LISTENERS ===
    
    // 1. Click sul bottone - USARE CAPTURE
    btnOpen.addEventListener("click", openDict, true);
    
    // 2. Anche con mousedown per sicurezza
    btnOpen.addEventListener("mousedown", function(e) {
        e.preventDefault();
        openDict();
    });
    
    // 3. Chiusura
    btnClose.addEventListener("click", closeDict);
    overlay.addEventListener("click", closeDict);

    // 4. Previeni chiusura quando clicchi nella modale
    modal.addEventListener("click", function(e) {
        e.stopPropagation();
    });

    // === RICERCA ===
    function handleSearch(openAll = false) {
        const q = input.value.trim();
        if (!q) {
            alert("Inserisci un termine da cercare");
            return;
        }

        const encoded = encodeURIComponent(q);
        const sources = [
            { 
                name: "SEP", 
                url: `https://plato.stanford.edu/search/search.html?query=${encoded}`,
                checked: true
            },
            { 
                name: "IEP", 
                url: `https://iep.utm.edu/search/?q=${encoded}`,
                checked: true  
            },
            { 
                name: "Treccani", 
                url: `https://www.treccani.it/ricerca/?q=${encoded}`,
                checked: true
            }
        ];

        if (openAll) {
            // Apri tutte le fonti checked
            sources.forEach(source => {
                if (source.checked) {
                    window.open(source.url, "_blank", "noopener");
                }
            });
        } else {
            // Apri solo la prima
            window.open(sources[0].url, "_blank", "noopener");
        }
    }

    btnSearch.addEventListener("click", () => handleSearch(false));
    btnOpenAll.addEventListener("click", () => handleSearch(true));

    // Ricerca con Enter
    input.addEventListener("keypress", function(e) {
        if (e.key === "Enter") {
            handleSearch(false);
        }
    });

    console.log("✅ Dizionario inizializzato con successo");

    // === DEBUG: Test immediato ===
    console.log("🧪 Test: bottone cliccabile?", btnOpen);
    console.log("🧪 Test: modale esistente?", modal);
    
    // Forza visibilità bottone
    btnOpen.style.display = 'block';
    btnOpen.style.visibility = 'visible';
    btnOpen.style.opacity = '1';
    btnOpen.style.pointerEvents = 'auto';
    btnOpen.style.zIndex = '9999';
});

// === BACKUP: Se DOMContentLoaded è già passato ===
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(() => {
        const btnOpen = document.getElementById("openDict");
        if (btnOpen) {
            console.log("🔧 Backup initialization");
            btnOpen.addEventListener("click", function() {
                document.getElementById('dict-overlay').style.opacity = '1';
                document.getElementById('dict-overlay').style.pointerEvents = 'auto';
                document.getElementById('dict-modal').style.transform = 'translateX(0)';
            }, true);
        }
    }, 1000);
}
