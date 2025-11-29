
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

