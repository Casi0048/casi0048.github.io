
/* ==========================================================
   ECHI DI SOFIA — COOKIE CONSENT
   Sistema autonomo di gestione delle preferenze
========================================================== */

(() => {
    "use strict";

    const CONSENT_KEY = "echiCookieConsent.v1";

    /* ------------------------------------------------------
       Lettura / salvataggio consenso
    ------------------------------------------------------ */

    function loadConsent() {
        try {
            const saved = localStorage.getItem(CONSENT_KEY);
            return saved ? JSON.parse(saved) : null;
        } catch {
            return null;
        }
    }

    function saveConsent(consent) {
        try {
            localStorage.setItem(
                CONSENT_KEY,
                JSON.stringify({
                    necessary: true,
                    preferences: Boolean(consent.preferences),
                    external: Boolean(consent.external),
                    savedAt: new Date().toISOString()
                })
            );
        } catch {
            /* Se localStorage non è disponibile, il sito continua a funzionare. */
        }
    }

    /* ------------------------------------------------------
       Creazione banner
    ------------------------------------------------------ */

    function createCookieInterface() {
        if (document.getElementById("echi-cookie-banner")) return;

        const wrapper = document.createElement("div");
        wrapper.id = "echi-cookie-container";

        wrapper.innerHTML = `
            <section
                id="echi-cookie-banner"
                class="echi-cookie-banner"
                role="dialog"
                aria-modal="false"
                aria-labelledby="echi-cookie-title"
                aria-describedby="echi-cookie-description"
                hidden
            >
                <div class="echi-cookie-content">

                    <div class="echi-cookie-text">
                        <h2 id="echi-cookie-title">La tua privacy conta</h2>

                        <p id="echi-cookie-description">
                            Echi di Sofia utilizza tecnologie necessarie
                            al funzionamento del sito e, quando richiesto,
                            contenuti forniti da servizi esterni.
                            Puoi scegliere come gestire le tue preferenze.
                        </p>
                    </div>

                    <div class="echi-cookie-actions">
                        <button
                            type="button"
                            class="echi-cookie-button echi-cookie-secondary"
                            data-cookie-action="reject"
                        >
                            Rifiuta
                        </button>

                        <button
                            type="button"
                            class="echi-cookie-button echi-cookie-secondary"
                            data-cookie-action="customize"
                        >
                            Personalizza cookie
                        </button>

                        <button
                            type="button"
                            class="echi-cookie-button echi-cookie-link"
                            data-cookie-action="info"
                        >
                            Maggiori informazioni
                        </button>

                        <button
                            type="button"
                            class="echi-cookie-button echi-cookie-primary"
                            data-cookie-action="accept"
                        >
                            Accetta
                        </button>
                    </div>

                </div>
            </section>

            <section
                id="echi-cookie-modal"
                class="echi-cookie-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="echi-cookie-modal-title"
                hidden
            >
                <div class="echi-cookie-modal-box">

                    <div class="echi-cookie-modal-header">
                        <h2 id="echi-cookie-modal-title">
                            Personalizza cookie
                        </h2>

                        <button
                            type="button"
                            class="echi-cookie-close"
                            data-cookie-action="close"
                            aria-label="Chiudi"
                        >
                            ×
                        </button>
                    </div>

                    <div class="echi-cookie-options">

                        <div class="echi-cookie-option">
                            <div>
                                <h3>Necessari</h3>
                                <p>
                                    Necessari per il funzionamento essenziale
                                    del sito. Sono sempre attivi.
                                </p>
                            </div>

                            <span class="echi-cookie-always">
                                Sempre attivi
                            </span>
                        </div>

                        <div class="echi-cookie-option">
                            <div>
                                <h3>Preferenze</h3>
                                <p>
                                    Permettono di ricordare alcune impostazioni
                                    scelte dall'utente, come preferenze
                                    dell'interfaccia.
                                </p>
                            </div>

                            <label class="echi-cookie-switch">
                                <input
                                    type="checkbox"
                                    id="echi-cookie-preferences"
                                >
                                <span></span>
                            </label>
                        </div>

                        <div class="echi-cookie-option">
                            <div>
                                <h3>Contenuti esterni</h3>
                                <p>
                                    Permettono di visualizzare contenuti
                                    incorporati forniti da servizi esterni,
                                    come YouTube.
                                </p>
                            </div>

                            <label class="echi-cookie-switch">
                                <input
                                    type="checkbox"
                                    id="echi-cookie-external"
                                >
                                <span></span>
                            </label>
                        </div>

                    </div>

                    <div class="echi-cookie-modal-footer">

                        <a
                            href="/pagine/privacy-policy.html"
                            class="echi-cookie-privacy"
                        >
                            Leggi la Privacy Policy
                        </a>

                        <div class="echi-cookie-modal-actions">

                            <button
                                type="button"
                                class="echi-cookie-button echi-cookie-secondary"
                                data-cookie-action="reject-all"
                            >
                                Rifiuta tutto
                            </button>

                            <button
                                type="button"
                                class="echi-cookie-button echi-cookie-primary"
                                data-cookie-action="save"
                            >
                                Salva preferenze
                            </button>

                        </div>

                    </div>

                </div>
            </section>

            <button
                id="echi-cookie-settings"
                class="echi-cookie-settings"
                type="button"
                aria-label="Gestisci preferenze cookie"
                title="Gestisci preferenze cookie"
                hidden
            >
                ⚙
            </button>
        `;

        document.body.appendChild(wrapper);
    }

    /* ------------------------------------------------------
       Apertura / chiusura
    ------------------------------------------------------ */

    function showBanner() {
        const banner = document.getElementById("echi-cookie-banner");
        const settings = document.getElementById("echi-cookie-settings");

        if (!banner) return;

        banner.hidden = false;

        if (settings) {
            settings.hidden = true;
        }
    }

    function hideBanner() {
        const banner = document.getElementById("echi-cookie-banner");
        const settings = document.getElementById("echi-cookie-settings");

        if (banner) banner.hidden = true;

        if (settings) {
            settings.hidden = false;
        }
    }

    function openModal() {
        const modal = document.getElementById("echi-cookie-modal");
        if (!modal) return;

        const consent = loadConsent();

        const preferences =
            document.getElementById("echi-cookie-preferences");

        const external =
            document.getElementById("echi-cookie-external");

        if (preferences) {
            preferences.checked = Boolean(consent?.preferences);
        }

        if (external) {
            external.checked = Boolean(consent?.external);
        }

        modal.hidden = false;
        document.body.classList.add("echi-cookie-modal-open");
    }

    function closeModal() {
        const modal = document.getElementById("echi-cookie-modal");

        if (modal) {
            modal.hidden = true;
        }

        document.body.classList.remove("echi-cookie-modal-open");
    }

    /* ------------------------------------------------------
       Azioni consenso
    ------------------------------------------------------ */

    function acceptAll() {
        saveConsent({
            preferences: true,
            external: true
        });

        hideBanner();
    }

    function rejectAll() {
        saveConsent({
            preferences: false,
            external: false
        });

        hideBanner();
    }

    function savePreferences() {
        const preferences =
            document.getElementById("echi-cookie-preferences");

        const external =
            document.getElementById("echi-cookie-external");

        saveConsent({
            preferences: Boolean(preferences?.checked),
            external: Boolean(external?.checked)
        });

        closeModal();
        hideBanner();
    }

    function openPrivacyPolicy() {
        window.location.href = "/pagine/privacy-policy.html";
    }

    /* ------------------------------------------------------
       Gestione click
    ------------------------------------------------------ */

    function handleAction(action) {
        switch (action) {

            case "accept":
                acceptAll();
                break;

            case "reject":
            case "reject-all":
                rejectAll();
                closeModal();
                break;

            case "customize":
                openModal();
                break;

            case "save":
                savePreferences();
                break;

            case "close":
                closeModal();
                break;

            case "info":
                openPrivacyPolicy();
                break;

            default:
                break;
        }
    }

    /* ------------------------------------------------------
       Inizializzazione
    ------------------------------------------------------ */

    function initCookieConsent() {
        createCookieInterface();

        const consent = loadConsent();

        document.addEventListener("click", (event) => {
            const actionElement =
                event.target.closest("[data-cookie-action]");

            if (!actionElement) return;

            handleAction(
                actionElement.getAttribute("data-cookie-action")
            );
        });

        const settings =
            document.getElementById("echi-cookie-settings");

        if (settings) {
            settings.addEventListener("click", openModal);
        }

        const modal =
            document.getElementById("echi-cookie-modal");

        if (modal) {
            modal.addEventListener("click", (event) => {
                if (event.target === modal) {
                    closeModal();
                }
            });
        }

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                const modal =
                    document.getElementById("echi-cookie-modal");

                if (modal && !modal.hidden) {
                    closeModal();
                }
            }
        });

        if (!consent) {
            showBanner();
        } else {
            hideBanner();
        }
    }

    if (document.readyState === "loading") {
        document.addEventListener(
            "DOMContentLoaded",
            initCookieConsent,
            { once: true }
        );
    } else {
        initCookieConsent();
    }

})();


