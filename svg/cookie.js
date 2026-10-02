
/* ==========================================================
   ECHI DI SOFIA — COOKIE CONSENT
   Gestione autonoma delle preferenze
========================================================== */

(() => {
    "use strict";

    const CONSENT_KEY = "echiCookieConsent.v1";

    /* ------------------------------------------------------
       Lettura e salvataggio
    ------------------------------------------------------ */

    function loadConsent() {
        try {
            const saved = localStorage.getItem(CONSENT_KEY);
            return saved ? JSON.parse(saved) : null;
        } catch {
            return null;
        }
    }

    function saveConsent(preferences, external) {
        try {
            localStorage.setItem(
                CONSENT_KEY,
                JSON.stringify({
                    necessary: true,
                    preferences: Boolean(preferences),
                    external: Boolean(external),
                    savedAt: new Date().toISOString()
                })
            );
        } catch {
            /* Il sito continua a funzionare anche senza localStorage. */
        }
    }

    /* ------------------------------------------------------
       Creazione dell'interfaccia
    ------------------------------------------------------ */

    function createInterface() {

        if (document.getElementById("echi-cookie-container")) {
            return;
        }

        const container = document.createElement("div");
        container.id = "echi-cookie-container";

        container.innerHTML = `
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

                        <h2 id="echi-cookie-title">
                            La tua privacy conta
                        </h2>

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
                                    Necessari per il funzionamento
                                    essenziale del sito. Sono sempre attivi.
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
                                    Permettono di ricordare alcune
                                    impostazioni scelte dall'utente,
                                    come le preferenze dell'interfaccia.
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

        document.body.appendChild(container);
    }


    /* ------------------------------------------------------
       Banner
    ------------------------------------------------------ */

    function showBanner() {

        const banner =
            document.getElementById("echi-cookie-banner");

        const settings =
            document.getElementById("echi-cookie-settings");

        if (!banner) return;

        banner.hidden = false;

        if (settings) {
            settings.hidden = true;
        }
    }


    function hideBanner() {

        const banner =
            document.getElementById("echi-cookie-banner");

        const settings =
            document.getElementById("echi-cookie-settings");

        if (banner) {
            banner.hidden = true;
        }

        if (settings) {
            settings.hidden = false;
        }
    }


    /* ------------------------------------------------------
       Finestra personalizzazione
    ------------------------------------------------------ */

    function openModal() {

        const modal =
            document.getElementById("echi-cookie-modal");

        if (!modal) return;

        const consent = loadConsent();

        const preferences =
            document.getElementById("echi-cookie-preferences");

        const external =
            document.getElementById("echi-cookie-external");

        if (preferences) {
            preferences.checked =
                Boolean(consent && consent.preferences);
        }

        if (external) {
            external.checked =
                Boolean(consent && consent.external);
        }

        modal.hidden = false;

        document.body.classList.add(
            "echi-cookie-modal-open"
        );
    }


    function closeModal() {

        const modal =
            document.getElementById("echi-cookie-modal");

        if (modal) {
            modal.hidden = true;
        }

        document.body.classList.remove(
            "echi-cookie-modal-open"
        );
    }


    /* ------------------------------------------------------
       Azioni
    ------------------------------------------------------ */

    function acceptAll() {

        saveConsent(true, true);

        hideBanner();
    }


    function rejectAll() {

        saveConsent(false, false);

        closeModal();
        hideBanner();
    }


    function savePreferences() {

        const preferences =
            document.getElementById("echi-cookie-preferences");

        const external =
            document.getElementById("echi-cookie-external");

        saveConsent(
            preferences ? preferences.checked : false,
            external ? external.checked : false
        );

        closeModal();
        hideBanner();
    }


    function openPrivacyPolicy() {

        window.location.href =
            "/pagine/privacy-policy.html";
    }


    /* ------------------------------------------------------
       Gestione delle azioni
    ------------------------------------------------------ */

    function handleAction(action) {

        switch (action) {

            case "accept":
                acceptAll();
                break;

            case "reject":
            case "reject-all":
                rejectAll();
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

        }
    }


    /* ------------------------------------------------------
       Inizializzazione
    ------------------------------------------------------ */

    function init() {

        createInterface();

        const consent = loadConsent();

        document.addEventListener("click", (event) => {

            const target =
                event.target.closest(
                    "[data-cookie-action]"
                );

            if (!target) return;

            handleAction(
                target.getAttribute(
                    "data-cookie-action"
                )
            );
        });


        const settings =
            document.getElementById(
                "echi-cookie-settings"
            );

        if (settings) {

            settings.addEventListener(
                "click",
                openModal
            );
        }


        const modal =
            document.getElementById(
                "echi-cookie-modal"
            );

        if (modal) {

            modal.addEventListener(
                "click",
                (event) => {

                    if (event.target === modal) {
                        closeModal();
                    }

                }
            );
        }


        document.addEventListener(
            "keydown",
            (event) => {

                if (event.key !== "Escape") {
                    return;
                }

                const modal =
                    document.getElementById(
                        "echi-cookie-modal"
                    );

                if (modal && !modal.hidden) {
                    closeModal();
                }

            }
        );


        if (consent) {
            hideBanner();
        } else {
            showBanner();
        }
    }


    /* ------------------------------------------------------
       Avvio
    ------------------------------------------------------ */

    if (document.readyState === "loading") {

        document.addEventListener(
            "DOMContentLoaded",
            init,
            { once: true }
        );

    } else {

        init();

    }

})();

