// ============================================================
//   DIZIONARIO FILOSOFICO — MODALE LATERALE CON GSAP
// ============================================================
document.addEventListener("DOMContentLoaded", () => {

  console.log("📘 Dict.js caricato");

  const btnOpen    = document.getElementById("openDict");
  const btnClose   = document.getElementById("dict-close");
  const modal      = document.getElementById("dict-modal");
  const overlay    = document.getElementById("dict-overlay");
  const input      = document.getElementById("dict-q");
  const btnSearch  = document.getElementById("dict-search");
  const btnOpenAll = document.getElementById("open-all");

  if (!btnOpen || !modal) {
    console.error("❌ Dizionario: elementi mancanti");
    return;
  }

  // -------------------------------------
  // Apertura modale
  // -------------------------------------
  btnOpen.addEventListener("click", () => {
    overlay.style.pointerEvents = "auto";
    overlay.style.opacity = "1";
    modal.style.transform = "translateX(0)";
  });

  // -------------------------------------
  // Chiusura modale
  // -------------------------------------
  function closeDict() {
    overlay.style.opacity = "0";
    overlay.style.pointerEvents = "none";
    modal.style.transform = "translateX(100%)";
  }

  overlay.addEventListener("click", closeDict);
  btnClose.addEventListener("click", closeDict);

  // -------------------------------------
  // Ricerca singola
  // -------------------------------------
  btnSearch.addEventListener("click", () => {
    const q = input.value.trim();
    if (!q) return;

    const encoded = encodeURIComponent(q);
    const checks = modal.querySelectorAll(".sources input:checked");

    checks.forEach(chk => {
      const url = chk.dataset.url.replace("{q}", encoded);
      window.open(url, "_blank");
    });
  });

  // -------------------------------------
  // Apri tutte
  // -------------------------------------
  btnOpenAll.addEventListener("click", () => {
    const q = input.value.trim();
    if (!q) return;

    const encoded = encodeURIComponent(q);
    const checks = modal.querySelectorAll(".sources input");

    checks.forEach(chk => {
      const url = chk.dataset.url.replace("{q}", encoded);
      window.open(url, "_blank");
    });
  });

});

document.addEventListener("DOMContentLoaded", () => {

  const form   = document.getElementById("dict-form");
  const input  = document.getElementById("dict-q");
  const sugBox = document.getElementById("dict-suggestions");
  const btnAll = document.getElementById("open-all");

  if (!form || !input) return;

  /* =============================
     LISTA SUGGERIMENTI
  ============================= */
  const TERMI = [
    "arché","anima","logos","ente","essere","entelechia","virtù","causa prima",
    "ragion pratica","noumeno","libertà","tempo","sostanza","dovere",
    "metafisica","trascendentale","giudizio","intelletto","cosmo","eudaimonia"
  ];

  function filterSuggestions(q) {
    return TERMI.filter(t => t.toLowerCase().includes(q.toLowerCase())).slice(0,20);
  }

  /* Suggerimenti live */
  function updateSug() {
    const q = input.value.trim();
    if (!q) { sugBox.innerHTML=""; sugBox.classList.remove("visible"); return; }

    const list = filterSuggestions(q);
    if (!list.length) { sugBox.classList.remove("visible"); return; }

    sugBox.innerHTML = list.map(t => `<div data-val="${t}">${t}</div>`).join("");
    sugBox.classList.add("visible");
  }

  input.addEventListener("input", updateSug);

  sugBox.addEventListener("click", e => {
    if (e.target.dataset.val) {
      input.value = e.target.dataset.val;
      sugBox.classList.remove("visible");
    }
  });


  /* =============================
     URL GENERATORI
  ============================= */

  const TRECCANI_URL = q =>
    `https://www.treccani.it/enciclopedia/ricerca/${encodeURIComponent(q)}/`;

  const WIKI_URL = q =>
    `https://it.wikipedia.org/wiki/${encodeURIComponent(q.replace(/\s+/g,"_"))}`;


  /* =============================
     SUBMIT
  ============================= */
  form.addEventListener("submit", e => {
    e.preventDefault();
    const q = input.value.trim();
    if (!q) return;

    const selected = form.querySelectorAll(".sources input[type='checkbox']:checked");
    if (!selected.length) return;

    selected.forEach(chk => {
      const tpl = chk.dataset.url || "";
      let url = "";

      if (/treccani\.it/.test(tpl)) url = TRECCANI_URL(q);
      else if (/wikipedia\.org/.test(tpl)) url = WIKI_URL(q);
      else url = tpl.replace("{q}", encodeURIComponent(q));

      window.open(url, "_blank", "noopener");
    });
  });


  /* =============================
     APRI TUTTE LE FONTI
  ============================= */
  btnAll.addEventListener("click", () => {
    document.querySelectorAll(".sources input").forEach(chk => chk.checked = true);
    form.dispatchEvent(new Event("submit"));
  });

});
