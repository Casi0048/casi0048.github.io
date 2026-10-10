(() => {
  "use strict";

  const STORAGE_KEY = "echiCookieConsent.v1";

  /* =========================================================
     STORAGE
     ========================================================= */
  function readConsent() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }

  function writeConsent(preferences, external) {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          necessary: true,
          preferences: Boolean(preferences),
          external: Boolean(external),
          savedAt: new Date().toISOString()
        })
      );
    } catch {}
  }

  /* =========================================================
     UI
     ========================================================= */
  function showSettingsButtonOnly() {
    const banner = document.getElementById("echi-cookie-banner");
    const settings = document.getElementById("echi-cookie-settings");
    if (banner) banner.hidden = true;
    if (settings) settings.hidden = false;
  }

  function openModal() {
    const modal = document.getElementById("echi-cookie-modal");
    if (!modal) return;

    const consent = readConsent();
    const prefs = document.getElementById("echi-cookie-preferences");
    const ext = document.getElementById("echi-cookie-external");

    if (prefs) prefs.checked = Boolean(consent && consent.preferences);
    if (ext) ext.checked = Boolean(consent && consent.external);

    modal.hidden = false;
    document.body.classList.add("echi-cookie-modal-open");
  }

  function closeModal() {
    const modal = document.getElementById("echi-cookie-modal");
    if (modal) modal.hidden = true;
    document.body.classList.remove("echi-cookie-modal-open");
  }

  function saveCustomPreferences() {
    const prefs = document.getElementById("echi-cookie-preferences");
    const ext = document.getElementById("echi-cookie-external");
    writeConsent(!!prefs && prefs.checked, !!ext && ext.checked);
    closeModal();
    showSettingsButtonOnly();
  }

  function handleAction(action) {
    switch (action) {
      case "accept":
        writeConsent(true, true);
        showSettingsButtonOnly();
        break;
      case "reject":
      case "reject-all":
        writeConsent(false, false);
        closeModal();
        showSettingsButtonOnly();
        break;
      case "customize":
        openModal();
        break;
      case "save":
        saveCustomPreferences();
        break;
      case "close":
        closeModal();
        break;
      case "info":
        window.location.href = "pagine/privacy-policy.html";
        break;
    }
  }

  /* =========================================================
     INIT
     ========================================================= */
  function init() {
    const consent = readConsent();

    if (consent) {
      // Ha già scelto → niente banner, mostra solo ingranaggio
      showSettingsButtonOnly();
    }
    // Altrimenti: il banner è già visibile nell'HTML → non fare nulla

    // Click handler unico (delega)
    document.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-cookie-action]");
      if (btn) handleAction(btn.getAttribute("data-cookie-action"));
    });

    // Apri modale dall'ingranaggio
    const settings = document.getElementById("echi-cookie-settings");
    if (settings) settings.addEventListener("click", openModal);

    // Chiudi cliccando fuori
    const modal = document.getElementById("echi-cookie-modal");
    if (modal) {
      modal.addEventListener("click", (e) => {
        if (e.target === modal) closeModal();
      });
    }

    // Chiudi con Esc
    document.addEventListener("keydown", (e) => {
      if (e.key !== "Escape") return;
      const m = document.getElementById("echi-cookie-modal");
      if (m && !m.hidden) closeModal();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
