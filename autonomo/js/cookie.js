/* ==========================================================
   COOKIE CONSENT
========================================================== */

const CC_KEY = "cookieConsent.v1";

function ccLoad() {
    try { return JSON.parse(localStorage.getItem(CC_KEY)); }
    catch { return null; }
}

function ccStore(data) {
    localStorage.setItem(CC_KEY, JSON.stringify(data));
}

document.addEventListener("DOMContentLoaded", () => {
    const banner = document.getElementById("cookie-banner");
    const modal = document.getElementById("cookie-modal");
    const fab = document.getElementById("cookie-fab");

    const accept = document.getElementById("cc-accept");
    const decline = document.getElementById("cc-decline");
    const custom = document.getElementById("cc-customize");

    const save = document.getElementById("cc-save");
    const cancel = document.getElementById("cc-cancel");
    const rejectAll = document.getElementById("cc-reject-all");

    const pref = document.getElementById("cc-pref");
    const analytics = document.getElementById("cc-analytics");
    const marketing = document.getElementById("cc-marketing");

    const stored = ccLoad();

    if (!stored) banner.setAttribute("aria-hidden", "false");

    accept.addEventListener("click", () => {
        ccStore({ all: true });
        banner.setAttribute("aria-hidden", "true");
    });

    decline.addEventListener("click", () => {
        ccStore({ all: false });
        banner.setAttribute("aria-hidden", "true");
    });

    custom.addEventListener("click", () => {
        modal.setAttribute("aria-hidden", "false");
    });

    cancel.addEventListener("click", () => {
        modal.setAttribute("aria-hidden", "true");
    });

    rejectAll.addEventListener("click", () => {
        pref.checked = false;
        analytics.checked = false;
        marketing.checked = false;
    });

    save.addEventListener("click", () => {
        ccStore({
            pref: pref.checked,
            analytics: analytics.checked,
            marketing: marketing.checked
        });
        modal.setAttribute("aria-hidden", "true");
    });

    fab.addEventListener("click", () =>
        modal.setAttribute("aria-hidden", "false")
    );
});
