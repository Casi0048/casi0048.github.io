
// ============================================================
//  MODALE DIZIONARIO — VERSIONE A (GSAP Smooth)
// ============================================================
document.addEventListener("DOMContentLoaded", () => {

    console.log("📘 Dizionario GSAP attivo");

    const btnOpen   = document.getElementById("openDict");
    const btnClose  = document.getElementById("dict-close");
    const modal     = document.getElementById("dict-modal");
    const overlay   = document.getElementById("dict-overlay");

    const input     = document.getElementById("dict-q");
    const btnSearch = document.getElementById("dict-search");
    const btnOpenAll = document.getElementById("open-all");

    if (!btnOpen || !modal || !btnClose || !overlay) {
        console.error("❌ Dizionario: elementi mancanti");
        return;
    }

    /* ========== APRI MODALE ========== */
    btnOpen.addEventListener("click", () => {
        gsap.to(modal, {
            x: 0,
            duration: 0.35,
            ease: "power3.out"
        });
        gsap.to(overlay, {
            opacity: 1,
            pointerEvents: "auto",
            duration: 0.25
        });
        console.log("📘 Modale aperto (GSAP)");
    });

    /* ========== CHIUDI MODALE ========== */
    function closeDict() {
        gsap.to(modal, {
            x: "100%",
            duration: 0.30,
            ease: "power3.in"
        });
        gsap.to(overlay, {
            opacity: 0,
            pointerEvents: "none",
            duration: 0.25
        });
    }

    btnClose.addEventListener("click", closeDict);
    overlay.addEventListener("click", closeDict);


    /* ========== RICERCA ========== */
    btnSearch.addEventListener("click", () => {
        const q = input.value.trim();
        if (!q) return;

        const enc = encodeURIComponent(q);
        const list = modal.querySelectorAll(".sources input:checked");

        list.forEach(chk => {
            const finalURL = chk.dataset.url.replace("{q}", enc);
            window.open(finalURL, "_blank", "noopener");
        });
    });

    /* ========== APRI TUTTE ========== */
    btnOpenAll.addEventListener("click", () => {
        const q = input.value.trim();
        if (!q) return;

        const enc = encodeURIComponent(q);
        const list = modal.querySelectorAll(".sources input");

        list.forEach(chk => {
            const finalURL = chk.dataset.url.replace("{q}", enc);
            window.open(finalURL, "_blank", "noopener");
        });
    });
});
/* ===== AGGIUNTO ===== */

// Gestione Dizionario Filosofico
document.addEventListener('DOMContentLoaded', function() {
    const dictBtn = document.getElementById('openDict');
    const dictModal = document.getElementById('dict-modal');
    const dictOverlay = document.getElementById('dict-overlay');
    const dictClose = document.getElementById('dict-close');
    const dictSearch = document.getElementById('dict-search');
    const dictQ = document.getElementById('dict-q');
    const openAll = document.getElementById('open-all');

    // Apri dizionario
    dictBtn.addEventListener('click', function() {
        dictModal.classList.add('open');
        dictOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        dictQ.focus();
    });

    // Chiudi dizionario
    function closeDict() {
        dictModal.classList.remove('open');
        dictOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    dictClose.addEventListener('click', closeDict);
    dictOverlay.addEventListener('click', closeDict);

    // Chiudi con ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && dictModal.classList.contains('open')) {
            closeDict();
        }
    });

    // Ricerca nel dizionario
    dictSearch.addEventListener('click', function() {
        const query = dictQ.value.trim();
        if (!query) return;

        const sources = document.querySelectorAll('.sources input:checked');
        sources.forEach(source => {
            const url = source.getAttribute('data-url').replace('{q}', encodeURIComponent(query));
            window.open(url, '_blank');
        });
    });

    // Apri tutte le fonti
    openAll.addEventListener('click', function() {
        const query = dictQ.value.trim() || 'philosophy';
        const sources = document.querySelectorAll('.sources input');
        sources.forEach(source => {
            const url = source.getAttribute('data-url').replace('{q}', encodeURIComponent(query));
            window.open(url, '_blank');
        });
    });

    // Ricerca con Enter
    dictQ.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            dictSearch.click();
        }
    });

    // Suggerimenti automatici
    dictQ.addEventListener('input', function() {
        const suggestions = document.getElementById('dict-suggestions');
        const query = this.value.trim().toLowerCase();
        
        if (query.length < 2) {
            suggestions.innerHTML = '';
            return;
        }

        const terms = [
            'metafisica', 'epistemologia', 'etica', 'estetica', 'logica',
            'ontologia', 'fenomenologia', 'ermeneutica', 'esistenzialismo',
            'stoicismo', 'epicureismo', 'scetticismo', 'razionalismo', 'empirismo',
            'idealismo', 'materialismo', 'pragmatismo', 'strutturalismo',
            'post-strutturalismo', 'decostruzionismo', 'filosofia analitica',
            'filosofia continentale'
        ];

        const filtered = terms.filter(term => 
            term.includes(query) || term.startsWith(query)
        ).slice(0, 5);

        suggestions.innerHTML = filtered.map(term => 
            `<div class="suggestion-item" data-term="${term}">${term}</div>`
        ).join('');

        // Click su suggerimento
        suggestions.querySelectorAll('.suggestion-item').forEach(item => {
            item.addEventListener('click', function() {
                dictQ.value = this.getAttribute('data-term');
                suggestions.innerHTML = '';
                dictSearch.click();
            });
        });
    });
});
<!-- ============================================================
        JAVASCRIPT DIZIONARIO - VERSIONE DEFINITIVA
============================================================ -->


document.addEventListener("DOMContentLoaded", () => {
    console.log("📘 Dizionario filosofico - Inizializzazione");

    // Riferimenti agli elementi
    const openBtn = document.getElementById("openDict");
    const closeBtn = document.getElementById("dict-close");
    const modal = document.getElementById("dict-modal");
    const overlay = document.getElementById("dict-overlay");
    const input = document.getElementById("dict-q");
    const btnSearch = document.getElementById("dict-search");
    const btnOpenAll = document.getElementById("open-all");
    const suggestions = document.getElementById("dict-suggestions");

    // Stato del modale
    let isModalOpen = false;

    // Verifica che tutti gli elementi essenziali esistano
    if (!modal || !overlay || !closeBtn) {
        console.error("❌ Elementi modale non trovati!");
        return;
    }

    /* ============================
       INIZIALIZZAZIONE GSAP
    ============================ */
    gsap.set(modal, { 
        x: "100%",
        position: "fixed",
        top: 0,
        right: 0
    });
    
    gsap.set(overlay, { 
        autoAlpha: 0,
        display: "none"
    });

    /* ============================
       APERTURA MODALE
    ============================ */
    function openDictionary() {
        if (isModalOpen) return;
      
        // Mostra overlay
        gsap.set(overlay, { display: "block" });
        
        // Animazioni
        gsap.to(overlay, {
            duration: 0.3,
            autoAlpha: 1,
            ease: "power2.out"
        });

        gsap.to(modal, {
            duration: 0.4,
            x: "0%",
            ease: "power3.out",
            onComplete: () => {
                // Focus sull'input
                if (input) {
                    input.focus();
                    input.select();
                }
            }
        });
    }

    /* ============================
       CHIUSURA MODALE
    ============================ */
    function closeDictionary() {
        if (!isModalOpen) return;
     
        gsap.to(modal, {
            duration: 0.35,
            x: "100%",
            ease: "power2.in"
        });

        gsap.to(overlay, {
            duration: 0.25,
            autoAlpha: 0,
            ease: "power2.out",
            onComplete: () => {
                gsap.set(overlay, { display: "none" });
            }
        });
    }

    /* ============================
       GESTIONE EVENTI
    ============================ */
    
    // Apertura con il bottone dizionario
    if (openBtn) {
        openBtn.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            openDictionary();
        });
    }

    // Chiusura con il bottone X
    if (closeBtn) {
        closeBtn.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            closeDictionary();
        });
    }

    // Chiusura cliccando sull'overlay
    if (overlay) {
        overlay.addEventListener("click", (e) => {
            if (e.target === overlay) {
                closeDictionary();
            }
        });
    }

    // Chiusura con ESC
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && isModalOpen) {
            closeDictionary();
        }
    });

    /* ============================
       FUNZIONALITÀ RICERCA
    ============================ */
    
    function performSearch() {
        const q = input.value.trim();
        if (!q) {
            showMessage("Inserisci un termine da cercare", "error");
            return;
        }

        const checkedSources = document.querySelectorAll(".sources input:checked");
        if (checkedSources.length === 0) {
            showMessage("Seleziona almeno una fonte", "error");
            return;
        }

        const encodedTerm = encodeURIComponent(q);
        
        checkedSources.forEach((source, index) => {
            const url = source.dataset.url.replace("{q}", encodedTerm);
            setTimeout(() => {
                window.open(url, "_blank");
            }, index * 100); // Delay per evitare blocchi del browser
        });

        showMessage(`Apertura ${checkedSources.length} fonte(i) per "${q}"`, "success");
    }

    function openAllSources() {
        const q = input.value.trim();
        if (!q) {
            showMessage("Inserisci un termine da cercare", "error");
            return;
        }

        const allSources = document.querySelectorAll(".sources input");
        const encodedTerm = encodeURIComponent(q);
        
        allSources.forEach((source, index) => {
            const url = source.dataset.url.replace("{q}", encodedTerm);
            setTimeout(() => {
                window.open(url, "_blank");
            }, index * 100);
        });

        showMessage(`Apertura tutte le ${allSources.length} fonti per "${q}"`, "success");
    }

   
    /* ============================
       UTILITIES
    ============================ */
    
    function showMessage(text, type = "info") {
        // Crea un messaggio temporaneo
        const message = document.createElement("div");
        message.textContent = text;
        message.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 12px 20px;
            background: ${type === "error" ? "#ff4444" : type === "success" ? "#44ff44" : "#4444ff"};
            color: white;
            border-radius: 8px;
            z-index: 100000;
            font-family: 'Montserrat', sans-serif;
            font-size: 14px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        `;
        
        document.body.appendChild(message);
        
        setTimeout(() => {
            if (message.parentNode) {
                message.parentNode.removeChild(message);
            }
        }, 3000);
    }

    /* ============================
       EVENT LISTENER RICERCA
    ============================ */
    
    if (btnSearch) {
        btnSearch.addEventListener("click", (e) => {
            e.preventDefault();
            performSearch();
        });
    }

    if (btnOpenAll) {
        btnOpenAll.addEventListener("click", (e) => {
            e.preventDefault();
            openAllSources();
        });
    }

    // Ricerca con Enter
    if (input) {
        input.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                performSearch();
            }
        });
    }

    // Debug
    console.log("✅ Dizionario inizializzato correttamente");
    
    // Esporta per debug
    window.dictionary = {
        open: openDictionary,
        close: closeDictionary,
        search: performSearch,
        openAll: openAllSources
    };

});
