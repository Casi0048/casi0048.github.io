// ============================================================
//   DIZIONARIO FILOSOFICO — MODALE LATERALE CON GSAP
// ============================================================
document.addEventListener("DOMContentLoaded", () => {

    const openBtn = document.getElementById("openDict");
    const closeBtn = document.getElementById("dict-close");
    const overlay = document.getElementById("dict-overlay");
    const modal = document.getElementById("dict-modal");

    const input = document.getElementById("dict-q");
    const searchBtn = document.getElementById("dict-search");
    const openAllBtn = document.getElementById("open-all");

    /* ========= APERTURA ========= */
    function openModal() {
        if (!modal) return;
        modal.classList.add("open");
        overlay.style.opacity = "1";
        overlay.style.pointerEvents = "auto";
        input.focus();

        gsap.fromTo(modal, {x: 360}, {x: 0, duration: .35, ease: "power3.out"});
    }

    /* ========= CHIUSURA ========= */
    function closeModal() {
        if (!modal) return;
        modal.classList.remove("open");
        overlay.style.opacity = "0";
        overlay.style.pointerEvents = "none";

        gsap.to(modal, {x: 360, duration: .3, ease: "power2.in"});
    }

    /* ========= EVENTI ========= */
    if (openBtn)   openBtn.addEventListener("click", openModal);
    if (closeBtn)  closeBtn.addEventListener("click", closeModal);
    if (overlay)   overlay.addEventListener("click", closeModal);

    /* ========= RICERCA ========= */
    function doSearch() {
        const q = input.value.trim();
        if (!q) return;

        const checks = modal.querySelectorAll(".sources input[type=checkbox]:checked");
        if (!checks.length) return;

        checks.forEach(chk => {
            const tpl = chk.dataset.url || "";
            const url = tpl.replace("{q}", encodeURIComponent(q));
            window.open(url, "_blank", "noopener");
        });
    }

    searchBtn.addEventListener("click", doSearch);
    openAllBtn.addEventListener("click", doSearch);

    input.addEventListener("keydown", e => {
        if (e.key === "Enter") doSearch();
    });
});

