// ============================================================
// MENU ESTERNO — CARICAMENTO + ANIMAZIONI GSAP
// ============================================================

document.addEventListener("DOMContentLoaded", async () => {

  console.log("📁 Caricamento menu esterno…");

  const container = document.getElementById("site-menu");
  if (!container) {
    console.error("❌ ERRORE: <div id='site-menu'> mancante in index.html");
    return;
  }

  try {
    const response = await fetch("/menu/menu.html");
    const html = await response.text();
    container.innerHTML = html;

    console.log("✅ Menu esterno caricato");

    /* ====== Animazione GSAP ====== */
    if (window.gsap) {
      gsap.from(".mega-nav .menu-root > li", {
        opacity: 0,
        y: -12,
        duration: 0.6,
        stagger: 0.08,
        ease: "power2.out"
      });

      console.log("✨ GSAP animazioni menu attive");
    } else {
      console.warn("⚠️ GSAP non presente, menu statico");
    }

  } catch (err) {
    console.error("❌ Errore nel caricamento menu esterno:", err);
  }
});

