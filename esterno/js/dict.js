
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


