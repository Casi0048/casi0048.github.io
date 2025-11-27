// ============================================================
//   DIZIONARIO FILOSOFICO — MODALE LATERALE
// ============================================================
document.addEventListener("DOMContentLoaded", () => {

  console.log("📘 Dict.js caricato");

  // ===== Elementi =====
  const btnOpen    = document.getElementById("openDict");
  const btnClose   = document.getElementById("dict-close");
  const modal      = document.getElementById("dict-modal");
  const overlay    = document.getElementById("dict-overlay");
  const input      = document.getElementById("dict-q");
  const btnSearch  = document.getElementById("dict-search");
  const btnOpenAll = document.getElementById("open-all");

  console.log("btnOpen =", btnOpen);
  console.log("modal =", modal);

  if (!btnOpen || !modal || !overlay) {
    console.error("❌ Errore: elementi del dizionario NON trovati!");
    return;
  }

  /* ========== Apertura modale ========== */
  btnOpen.addEventListener("click", () => {
    overlay.style.pointerEvents = "auto";
    overlay.style.opacity = "1";

    modal.style.transform = "translateX(0)";
    console.log("📘 Modale aperto");
  });

  /* ========== Chiusura modale ========== */
  function closeDict() {
    overlay.style.opacity = "0";
    overlay.style.pointerEvents = "none";
    modal.style.transform = "translateX(100%)";
  }

  btnClose.addEventListener("click", closeDict);
  overlay.addEventListener("click", closeDict);

  /* ========== Ricerca singola ========== */
  btnSearch.addEventListener("click", () => {
    const q = input.value.trim();
    if (!q) return;

    const encoded = encodeURIComponent(q);
    const checks = modal.querySelectorAll(".sources input:checked");

    checks.forEach(chk => {
      const url = chk.dataset.url.replace("{q}", encoded);
      window.open(url, "_blank", "noopener");
    });
  });

  /* ========== Apri tutte ========== */
  btnOpenAll.addEventListener("click", () => {
    const q = input.value.trim();
    if (!q) return;

    const encoded = encodeURIComponent(q);
    const checks = modal.querySelectorAll(".sources input");

    checks.forEach(chk => {
      const url = chk.dataset.url.replace("{q}", encoded);
      window.open(url, "_blank", "noopener");
    });
  });

});
