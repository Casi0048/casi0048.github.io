<!-- ============================================================
        JAVASCRIPT DIZIONARIO - VERSIONE DEBUG
============================================================ -->

document.addEventListener("DOMContentLoaded", () => {
    console.log("🔍 INIZIO INIZIALIZZAZIONE DIZIONARIO");

    // Riferimenti agli elementi - li cercheremo dinamicamente
    let openBtn, closeBtn, modal, overlay, input, btnSearch, btnOpenAll;

    // Stato del modale
    let isModalOpen = false;

    /* ============================
       FUNZIONE PER TROVARE ELEMENTI
    ============================ */
    function getElements() {
        openBtn = document.getElementById("openDict");
        closeBtn = document.getElementById("dict-close");
        modal = document.getElementById("dict-modal");
        overlay = document.getElementById("dict-overlay");
        input = document.getElementById("dict-q");
        btnSearch = document.getElementById("dict-search");
        btnOpenAll = document.getElementById("open-all");

        console.log("🔍 Elementi trovati:", {
            openBtn: !!openBtn,
            closeBtn: !!closeBtn,
            modal: !!modal,
            overlay: !!overlay,
            input: !!input,
            btnSearch: !!btnSearch,
            btnOpenAll: !!btnOpenAll
        });

        return modal && overlay && closeBtn;
    }

    /* ============================
       INIZIALIZZAZIONE GSAP
    ============================ */
    function initGSAP() {
        if (!modal || !overlay) return;
        
        console.log("🎬 Inizializzazione GSAP");
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
    }

    /* ============================
       INIZIALIZZAZIONE PRINCIPALE
    ============================ */
    function initDictionary() {
        console.log("🔄 Tentativo inizializzazione...");
        
        if (!getElements()) {
            console.warn("⚠️ Elementi non trovati, riprovo...");
            setTimeout(initDictionary, 100);
            return;
        }

        initGSAP();
        setupEventListeners();
        
        console.log("✅ Dizionario inizializzato correttamente");
    }

    /* ============================
       GESTIONE EVENTI
    ============================ */
    function setupEventListeners() {
        console.log("🎯 Configurando event listeners...");

        // Apertura con il bottone dizionario
        if (openBtn) {
            openBtn.addEventListener("click", openDictionary);
            console.log("✅ Listener apertura aggiunto");
        } else {
            console.error("❌ Bottone apertura non trovato");
        }

        // Chiusura con il bottone X - USA EVENT DELEGATION
        document.addEventListener('click', function(e) {
            // Debug: log di tutti i click
            if (e.target.id === 'dict-close' || e.target.closest('#dict-close')) {
                console.log("🎯 CLICK SU BOTTONE CHIUDI RILEVATO");
                e.preventDefault();
                e.stopPropagation();
                closeDictionary();
            }
        });

        // Chiusura cliccando sull'overlay
        if (overlay) {
            overlay.addEventListener("click", function(e) {
                console.log("🎯 Click su overlay");
                if (e.target === overlay) {
                    closeDictionary();
                }
            });
        }

        // Chiusura con ESC
        document.addEventListener("keydown", function(e) {
            if (e.key === "Escape" && isModalOpen) {
                console.log("🎯 ESC premuto");
                closeDictionary();
            }
        });

        // Ricerca
        if (btnSearch) {
            btnSearch.addEventListener("click", performSearch);
        }

        if (btnOpenAll) {
            btnOpenAll.addEventListener("click", openAllSources);
        }

        if (input) {
            input.addEventListener("keypress", function(e) {
                if (e.key === "Enter") {
                    performSearch();
                }
            });
        }
    }

    /* ============================
       APERTURA MODALE
    ============================ */
    function openDictionary(e) {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        
        console.log("🚀 APERTURA MODALE - Stato attuale:", isModalOpen);
        
        if (isModalOpen) {
            console.log("⚠️ Modale già aperto, ignoro");
            return;
        }

        // Ricrea i riferimenti (nel caso siano cambiati)
        getElements();
        
        if (!modal || !overlay) {
            console.error("❌ Modale o overlay non trovati per l'apertura");
            return;
        }

        isModalOpen = true;
        console.log("🔄 Imposto isModalOpen = true");

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
                console.log("✅ Animazione apertura completata");
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
        console.log("🛑 CHIUSURA MODALE - Stato attuale:", isModalOpen);
        
        if (!isModalOpen) {
            console.log("⚠️ Modale già chiuso, ignoro");
            return;
        }

        // Ricrea i riferimenti
        getElements();
        
        if (!modal || !overlay) {
            console.error("❌ Modale o overlay non trovati per la chiusura");
            return;
        }

        isModalOpen = false;
        console.log("🔄 Imposto isModalOpen = false");

        gsap.to(modal, {
            duration: 0.35,
            x: "100%",
            ease: "power2.in",
            onComplete: () => {
                console.log("✅ Animazione chiusura modale completata");
            }
        });

        gsap.to(overlay, {
            duration: 0.25,
            autoAlpha: 0,
            ease: "power2.out",
            onComplete: () => {
                gsap.set(overlay, { display: "none" });
                console.log("✅ Animazione chiusura overlay completata");
            }
        });
    }

    /* ============================
       FUNZIONALITÀ RICERCA (semplificata)
    ============================ */
    function performSearch() {
        console.log("🔍 Ricerca avviata");
        if (!input) return;
        
        const q = input.value.trim();
        if (!q) {
            alert("Inserisci un termine da cercare");
            return;
        }

        const checkedSources = document.querySelectorAll(".sources input:checked");
        if (checkedSources.length === 0) {
            alert("Seleziona almeno una fonte");
            return;
        }

        const encodedTerm = encodeURIComponent(q);
        
        checkedSources.forEach((source, index) => {
            const url = source.dataset.url.replace("{q}", encodedTerm);
            setTimeout(() => {
                window.open(url, "_blank");
            }, index * 100);
        });
    }

    function openAllSources() {
        if (!input) return;
        
        const q = input.value.trim();
        if (!q) {
            alert("Inserisci un termine da cercare");
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
    }

    /* ============================
       INIZIALIZZAZIONE E DEBUG
    ============================ */
    
    // Avvia l'inizializzazione
    setTimeout(initDictionary, 10);

    // Esporta funzioni per debug nella console
    window.dictionary = {
        open: openDictionary,
        close: closeDictionary,
        search: performSearch,
        openAll: openAllSources,
        getState: () => ({ isModalOpen, elements: getElements() }),
        debug: () => {
            console.log("=== DEBUG DIZIONARIO ===");
            console.log("Stato:", { isModalOpen });
            console.log("Elementi:", getElements());
            console.log("GSAP:", gsap);
        }
    };

    console.log("🎉 Script dizionario caricato - usa dictionary.debug() per testare");

});
