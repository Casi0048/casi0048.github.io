(()=>{"use strict";const o="echiCookieConsent.v1";function t(){try{var e=localStorage.getItem(o);return e?JSON.parse(e):null}catch{return null}}function c(e,i){try{localStorage.setItem(o,JSON.stringify({necessary:!0,preferences:Boolean(e),external:Boolean(i),savedAt:(new Date).toISOString()}))}catch{}}function n(){var e=document.getElementById("echi-cookie-banner"),i=document.getElementById("echi-cookie-settings");e&&(e.hidden=!0),i&&(i.hidden=!1)}function a(){var e,i,o,c=document.getElementById("echi-cookie-modal");c&&(e=t(),i=document.getElementById("echi-cookie-preferences"),o=document.getElementById("echi-cookie-external"),i&&(i.checked=Boolean(e&&e.preferences)),o&&(o.checked=Boolean(e&&e.external)),c.hidden=!1,document.body.classList.add("echi-cookie-modal-open"))}function d(){var e=document.getElementById("echi-cookie-modal");e&&(e.hidden=!0),document.body.classList.remove("echi-cookie-modal-open")}function s(e){switch(e){case"accept":c(!0,!0),n();break;case"reject":case"reject-all":c(!1,!1),d(),n();break;case"customize":a();break;case"save":i=document.getElementById("echi-cookie-preferences"),o=document.getElementById("echi-cookie-external"),c(!!i&&i.checked,!!o&&o.checked),d(),n();break;case"close":d();break;case"info":window.location.href="/pagine/privacy-policy.html"}var i,o}function e(){document.getElementById("echi-cookie-container")||((i=document.createElement("div")).id="echi-cookie-container",i.innerHTML=`
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
        `,document.body.appendChild(i));var e,i=t(),o=(document.addEventListener("click",e=>{e=e.target.closest("[data-cookie-action]");e&&s(e.getAttribute("data-cookie-action"))}),document.getElementById("echi-cookie-settings"));o&&o.addEventListener("click",a);const c=document.getElementById("echi-cookie-modal");c&&c.addEventListener("click",e=>{e.target===c&&d()}),document.addEventListener("keydown",e=>{"Escape"===e.key&&(e=document.getElementById("echi-cookie-modal"))&&!e.hidden&&d()}),i?n():(o=document.getElementById("echi-cookie-banner"),e=document.getElementById("echi-cookie-settings"),o&&(o.hidden=!1,e)&&(e.hidden=!0))}"loading"===document.readyState?document.addEventListener("DOMContentLoaded",e,{once:!0}):e()})();
