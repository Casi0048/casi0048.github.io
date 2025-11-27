// ============================================================
//   DIZIONARIO FILOSOFICO — MODALE LATERALE CON GSAP
// ============================================================
document.addEventListener("DOMContentLoaded", () => {

    const openBtn   = document.getElementById("openDict");
    const closeBtn  = document.getElementById("dict-close");
    const overlay   = document.getElementById("dict-overlay");
    const modal     = document.getElementById("dict-modal");
    const input     = document.getElementById("dict-q");
    const searchBtn = document.getElementById("dict-search");
    const openAllBtn = document.getElementById("open-all");

    // Sicurezza: se manca qualcosa → stop
    if (!openBtn || !closeBtn || !overlay || !modal) {
        console.warn("❌ Dizionario: elementi mancanti nel DOM");
        return;
    }

    /* -----------------------------------
       1) MOSTRA MODALE
    ------------------------------------ */
    function openModal() {
        overlay.style.pointerEvents = "auto";

        gsap.to(overlay, {
            opacity: 1,
            duration: 0.25,
            ease: "power2.out"
        });

        gsap.to(modal, {
            x: 0,
            duration: 0.35,
            ease: "power3.out",
            onComplete: () => input && input.focus()
        });
    }

    /* -----------------------------------
       2) NASCONDI MODALE
    ------------------------------------ */
    function closeModal() {
        overlay.style.pointerEvents = "none";

        gsap.to(overlay, {
            opacity: 0,
            duration: 0.25
        });

        gsap.to(modal, {
            x: "100%",
            duration: 0.35,
            ease: "power3.in"
        });
    }

    openBtn.addEventListener("click", openModal);
    closeBtn.addEventListener("click", closeModal);
    overlay.addEventListener("click", closeModal);

    /* ESC per chiudere */
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeModal();
    });


    /* -----------------------------------
       3) FUNZIONE DI RICERCA
    ------------------------------------ */
    function performSearch() {
        const q = input.value.trim();
        if (!q) return;

        const checks = modal.querySelectorAll(".sources input[type='checkbox']:checked");

        checks.forEach((chk) => {
            let tpl = chk.dataset.url || "";
            let url = tpl.replace("{q}", encodeURIComponent(q));
            window.open(url, "_blank", "noopener");
        });
    }

    searchBtn.addEventListener("click", performSearch);

    /* Enter lancia la ricerca */
    input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            performSearch();
        }
    });


    /* -----------------------------------
       4) APRI TUTTE LE FONTI
    ------------------------------------ */
    openAllBtn.addEventListener("click", performSearch);

});
