// ============================================================
//   DIZIONARIO FILOSOFICO — MODALE LATERALE CON GSAP
// ============================================================
console.log("DICT.JS LOADED");

// Apertura/chiusura modale
document.addEventListener("DOMContentLoaded", () => {

    const openBtn   = document.getElementById("openDict");
    const modal     = document.getElementById("dict-modal");
    const overlay   = document.getElementById("dict-overlay");
    const closeBtn  = document.getElementById("dict-close");

    const input     = document.getElementById("dict-q");
    const btnSearch = document.getElementById("dict-search");
    const btnAll    = document.getElementById("open-all");

    console.log("openBtn =", openBtn);
    console.log("modal   =", modal);

    if (!openBtn || !modal || !overlay) {
        console.error("❌ DIZIONARIO: elementi mancanti nel DOM");
        return;
    }

    // Apri
    openBtn.addEventListener("click", () => {
        overlay.style.opacity = "1";
        overlay.style.pointerEvents = "auto";

        modal.style.transform = "translateX(0)";
        console.log("📘 Modale aperto");
    });

    // Chiudi
    function closeDict() {
        overlay.style.opacity = "0";
        overlay.style.pointerEvents = "none";
        modal.style.transform = "translateX(100%)";
    }

    closeBtn.addEventListener("click", closeDict);
    overlay.addEventListener("click", closeDict);

    // Ricerca singola
    btnSearch.addEventListener("click", () => {
        const q = input.value.trim();
        if (!q) return;

        const checks = modal.querySelectorAll(".sources input:checked");
        if (!checks.length) return;

        checks.forEach(chk => {
            const url = chk.dataset.url.replace("{q}", encodeURIComponent(q));
            window.open(url, "_blank");
        });
    });

    // Apri tutte
    btnAll.addEventListener("click", () => {
        const q = input.value.trim();
        if (!q) return;

        const checks = modal.querySelectorAll(".sources input");
        checks.forEach(chk => {
            const url = chk.dataset.url.replace("{q}", encodeURIComponent(q));
            window.open(url, "_blank");
        });
    });
});


