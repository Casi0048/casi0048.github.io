console.log("📘 Dizionario con GSAP attivo");

document.addEventListener("DOMContentLoaded", () => {

    const btnOpen    = document.getElementById("openDict");
    const btnClose   = document.getElementById("dict-close");
    const modal      = document.getElementById("dict-modal");
    const overlay    = document.getElementById("dict-overlay");

    if (!btnOpen || !btnClose || !modal || !overlay) {
        console.error("❌ Dizionario: elementi non trovati");
        return;
    }

    /* ============================================================
       APRI MODALE (GSAP)
    ============================================================ */
   btnOpen.addEventListener("click", () => {
    modal.classList.add("open");
    overlay.classList.add("active");
    console.log("📘 Modale aperta");
});

btnClose.addEventListener("click", closeDict);
overlay.addEventListener("click", closeDict);

function closeDict(){
    modal.classList.remove("open");
    overlay.classList.remove("active");
}

    /* ============================================================
       CHIUDI MODALE (GSAP)
    ============================================================ */
    function closeDict() {

        gsap.to(modal, {
            duration: 0.35,
            x: "100%",
            ease: "power3.in"
        });

        gsap.to(overlay, {
            duration: 0.3,
            opacity: 0,
            ease: "power2.in",
            onComplete: () => {
                overlay.style.pointerEvents = "none";
            }
        });

        console.log("📘 Modale chiuso");
    }

    btnClose.addEventListener("click", closeDict);
    overlay.addEventListener("click", closeDict);

});
