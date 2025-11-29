


<!-- ============================================================
        JAVASCRIPT DIZIONARIO - VERSIONE DEBUG
============================================================ -->

document.addEventListener("DOMContentLoaded", () => {

    const btnOpen   = document.getElementById("openDict");
    const btnClose  = document.getElementById("dict-close");
    const modal     = document.getElementById("dict-modal");
    const overlay   = document.getElementById("dict-overlay");

    console.log("DICT STATUS:", {btnOpen, btnClose, modal, overlay});

    if (!btnOpen || !modal || !overlay) {
        console.error("❌ Dizionario: elementi mancanti");
        return;
    }

    // Apri
    btnOpen.addEventListener("click", () => {
        modal.style.transform = "translateX(0)";
        overlay.style.opacity = "1";
        overlay.style.pointerEvents = "auto";
        console.log("📘 Modale aperto");
    });

    // Chiudi
    const close = () => {
        modal.style.transform = "translateX(100%)";
        overlay.style.opacity = "0";
        overlay.style.pointerEvents = "none";
    };

    btnClose.addEventListener("click", close);
    overlay.addEventListener("click", close);
});

