// ============================================================
//   DIZIONARIO FILOSOFICO — MODALE LATERALE CON GSAP
// ============================================================

document.addEventListener("DOMContentLoaded", () => {

  const openBtn  = document.getElementById("openDict");
  const modal    = document.getElementById("dict-modal");
  const overlay  = document.getElementById("dict-overlay");
  const closeBtn = document.getElementById("dict-close");

  const input    = document.getElementById("dict-q");
  const sugBox   = document.getElementById("dict-suggestions");

  const btnSearch = document.getElementById("dict-search");
  const btnAll    = document.getElementById("open-all");

  if (!openBtn || !modal || !overlay) return;

  // ======= GSAP TIMELINES =======
  const tlOpen = gsap.timeline({ paused: true });
  const tlClose = gsap.timeline({ paused: true });

  tlOpen
    .to(overlay, { opacity: 1, pointerEvents: "auto", duration: 0.25 })
    .to(modal,   { x: 0, duration: 0.35, ease: "power3.out" }, "<");

  tlClose
    .to(modal,   { x: "100%", duration: 0.3, ease: "power3.in" })
    .to(overlay, { opacity: 0, pointerEvents: "none", duration: 0.25 }, "<0.05");

  function openDict() {
    tlClose.pause(0);
    tlOpen.play();
    setTimeout(() => input.focus(), 300);
  }

  function closeDict() {
    tlOpen.pause(0);
    tlClose.play();
    sugBox.classList.remove("visible");
  }

  openBtn .addEventListener("click", openDict);
  closeBtn.addEventListener("click", closeDict);
  overlay .addEventListener("click", closeDict);

  // ======= Suggerimenti =======
  const SUGGESTIONS = [
    "arché","anima","logos","ente","virtù",
    "entelechia","causa prima","ragion pratica",
    "eudaimonia","metafisica","noumeno","intelletto"
  ];

  input.addEventListener("input", () => {
    const q = input.value.trim().toLowerCase();
    if (!q) { sugBox.classList.remove("visible"); return; }

    const list = SUGGESTIONS.filter(t => t.includes(q)).slice(0,20);

    sugBox.innerHTML =
      list.map(t => `<div data-v="${t}">${t}</div>`).join("");

    sugBox.classList.add("visible");
  });

  sugBox.addEventListener("click", e => {
    if (e.target.dataset.v) {
      input.value = e.target.dataset.v;
      sugBox.classList.remove("visible");
    }
  });

  // ======= URL Costruite =======
  const TRECCANI = q =>
    `https://www.treccani.it/enciclopedia/ricerca/${encodeURIComponent(q)}/`;

  const WIKI = q =>
    `https://it.wikipedia.org/wiki/${encodeURIComponent(q.replace(/\s+/g, "_"))}`;

  // ======= Funzione ricerca =======
  function performSearch() {
    const q = input.value.trim();
    if (!q) return;

    const checks = modal.querySelectorAll(".sources input:checked");

    checks.forEach(chk => {
      const tpl = chk.dataset.url;
      let url = "";

      if (/treccani/.test(tpl)) url = TRECCANI(q);
      else if (/wikipedia/.test(tpl)) url = WIKI(q);
      else url = tpl.replace("{q}", encodeURIComponent(q));

      window.open(url, "_blank", "noopener");
    });
  }

  btnSearch.addEventListener("click", performSearch);

  btnAll.addEventListener("click", () => {
    modal.querySelectorAll(".sources input").forEach(c => c.checked = true);
    performSearch();
  });

});

