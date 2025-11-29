// ============================================================
//   DIZIONARIO FILOSOFICO — MODALE LATERALE FUNZIONANTE
// ============================================================

document.addEventListener("DOMContentLoaded", () => {

    console.log("🔥 dict.js caricato correttamente");

    const btnOpen    = document.getElementById("openDict");
    const btnClose   = document.getElementById("dict-close");
    const modal      = document.getElementById("dict-modal");
    const overlay    = document.getElementById("dict-overlay");

    const input      = document.getElementById("dict-q");
    const btnSearch  = document.getElementById("dict-search");
    const btnOpenAll = document.getElementById("open-all");

    console.log("DICT STATUS:", { btnOpen, btnClose, modal, overlay });

    // Blocca tutto se mancano elementi
    if (!btnOpen || !modal || !overlay || !btnClose) {
        console.error("❌ Dizionario: elementi mancanti nel DOM");
        return;
    }

    // === APRI MODALE ===
    btnOpen.addEventListener("click", () => {
        modal.style.transform = "translateX(0)";
        overlay.style.opacity = "1";
        overlay.style.pointerEvents = "auto";
        console.log("📘 Modale aperto");
    });

    // === CHIUDI MODALE ===
    function closeDict() {
        modal.style.transform = "translateX(100%)";
        overlay.style.opacity = "0";
        overlay.style.pointerEvents = "none";
        console.log("📘 Modale chiuso");
    }

    btnClose.addEventListener("click", closeDict);
    overlay.addEventListener("click", closeDict);

    // === RICERCA SINGOLA ===
    btnSearch.addEventListener("click", () => {
        const q = input.value.trim();
        if (!q) return;

        const enc = encodeURIComponent(q);
        const list = modal.querySelectorAll(".sources input:checked");

        list.forEach(chk => {
            const url = chk.dataset.url.replace("{q}", enc);
            window.open(url, "_blank");
        });
    });

    // === APRI TUTTE ===
    btnOpenAll.addEventListener("click", () => {
        const q = input.value.trim();
        if (!q) return;

        const enc = encodeURIComponent(q);
        const list = modal.querySelectorAll(".sources input");

        list.forEach(chk => {
            const url = chk.dataset.url.replace("{q}", enc);
            window.open(url, "_blank");
        });
    });

});
