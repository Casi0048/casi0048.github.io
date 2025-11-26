/* ==========================================================
   UTILITÀ GLOBALI
========================================================== */

function safeDOM(fn, fallback = null) {
    try { return fn(); }
    catch (err) {
        console.warn("safeDOM error:", err);
        if (typeof fallback === "function") {
            try { return fallback(); } catch(e2) {}
        }
        return null;
    }
}

function safeQuery(sel, ctx = document) {
    try { return ctx.querySelector(sel); }
    catch (_) { return null; }
}

window.EchiLog = function(...msg) {
    console.log("📘 ECHI:", ...msg);
};
/* ==========================================================
   STARFIELD (sfondo stelle)
========================================================== */

function initStarfield() {
    safeDOM(() => {
        const container = safeQuery("#starsContainer");
        if (!container) return;

        const STAR_COUNT = 180;

        for (let i = 0; i < STAR_COUNT; i++) {
            const s = document.createElement("div");
            s.className = "star";

            const size = Math.random() * 3;
            s.style.width = size + "px";
            s.style.height = size + "px";

            s.style.left = (Math.random() * 100) + "%";
            s.style.top = (Math.random() * 100) + "%";

            s.style.opacity = (Math.random() * 0.6) + 0.2;

            s.style.animationDelay = (Math.random() * 5) + "s";
            s.style.animationDuration = (3 + Math.random() * 7) + "s";

            container.appendChild(s);
        }
    });
}
/* ==========================================================
   LAZY LOADING IMMAGINI
========================================================== */

function initLazyLoading() {
    const imgs = document.querySelectorAll("img[data-src]");
    if (!imgs.length) return;

    if (!("IntersectionObserver" in window)) {
        imgs.forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute("data-src");
        });
        return;
    }

    const obs = new IntersectionObserver((entries, self) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.onload = () => img.classList.add("fade-in");
                img.removeAttribute("data-src");
                self.unobserve(img);
            }
        });
    });

    imgs.forEach(img => obs.observe(img));
}
/* ==========================================================
   ANIMAZIONE TESTO ESPLOSIVO
========================================================== */

function initExplodingText() {
    const box = document.getElementById("exploding");
    if (!box) return;

    const textEl = box.querySelector(".m-text") || box;
    const original = textEl.textContent.trim();

    textEl.innerHTML = "";

    [...original].forEach(ch => {
        const span = document.createElement("span");
        span.className = "char";
        span.textContent = ch;
        textEl.appendChild(span);
    });

    textEl.addEventListener("click", () => explodeChars(textEl));
}

function explodeChars(container) {
    const chars = [...container.querySelectorAll(".char")];
    const rect = container.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    chars.forEach(ch => {
        const r = ch.getBoundingClientRect();
        const dx = (r.left + r.width/2) - cx;
        const dy = (r.top + r.height/2) - cy;
        const dist = Math.hypot(dx, dy);

        const power = 80 + Math.random()*150;
        const angle = Math.atan2(dy, dx);

        const tx = Math.cos(angle) * power;
        const ty = Math.sin(angle) * power;

        ch.style.transition = "transform .7s cubic-bezier(.2,.9,.2,1), opacity .7s";
        ch.style.transform = `translate(${tx}px, ${ty}px) rotate(${(Math.random()*720)-360}deg)`;
        ch.style.opacity = "0";
    });

    setTimeout(() => {
        chars.forEach(ch => {
            ch.style.transition = "";
            ch.style.transform = "";
            ch.style.opacity = "1";
        });
    }, 900);
}
/* ==========================================================
   SEARCH BOX (clear button + focus)
========================================================== */

function initSearchBox() {
    const box = document.getElementById("searchBox");
    const clearBtn = document.getElementById("clearSearch");

    if (!box) return;

    box.addEventListener("input", () => {
        clearBtn.style.display = box.value ? "block" : "none";
    });

    clearBtn.addEventListener("click", () => {
        box.value = "";
        clearBtn.style.display = "none";
        box.focus();
    });
}
/* ==========================================================
   COOKIE CONSENT
========================================================== */

const CC_KEY = "cookieConsent.v1";

function ccLoad() {
    try { return JSON.parse(localStorage.getItem(CC_KEY)); }
    catch (_) { return null; }
}

function ccStore(data) {
    localStorage.setItem(CC_KEY, JSON.stringify(data));
}

function initCookieConsent() {
    const banner = safeQuery("#cookie-banner");
    const modal  = safeQuery("#cookie-modal");
    const fab    = safeQuery("#cookie-fab");

    const accept = safeQuery("#cc-accept");
    const decline = safeQuery("#cc-decline");
    const customize = safeQuery("#cc-customize");

    const save = safeQuery("#cc-save");
    const cancel = safeQuery("#cc-cancel");
    const rejectAll = safeQuery("#cc-reject-all");

    const pref = safeQuery("#cc-pref");
    const analytics = safeQuery("#cc-analytics");
    const marketing = safeQuery("#cc-marketing");

    const stored = ccLoad();

    if (!stored) {
        banner?.setAttribute("aria-hidden", "false");
    }

    accept?.addEventListener("click", () => {
        ccStore({ all: true });
        banner.setAttribute("aria-hidden", "true");
    });

    decline?.addEventListener("click", () => {
        ccStore({ all: false });
        banner.setAttribute("aria-hidden", "true");
    });

    customize?.addEventListener("click", () => {
        modal.setAttribute("aria-hidden", "false");
    });

    cancel?.addEventListener("click", () => {
        modal.setAttribute("aria-hidden", "true");
    });

    rejectAll?.addEventListener("click", () => {
        pref.checked = false;
        analytics.checked = false;
        marketing.checked = false;
    });

    fab?.addEventListener("click", () => {
        modal.setAttribute("aria-hidden", "false");
    });

    save?.addEventListener("click", () => {
        ccStore({
            pref: pref.checked,
            analytics: analytics.checked,
            marketing: marketing.checked
        });
        modal.setAttribute("aria-hidden", "true");
    });
}
/* ==========================================================
   STATO CONNESSIONE
========================================================== */

window.addEventListener("online", () =>
    document.body.classList.remove("offline")
);

window.addEventListener("offline", () =>
    document.body.classList.add("offline")
);
/* ==========================================================
   GLOBAL ERROR HANDLER
========================================================== */

window.addEventListener("error", e => {
    console.warn("⚠️ Errore globale:", e.message);
});
/* ==========================================================
   INIT COMPLETO
========================================================== */

document.addEventListener("DOMContentLoaded", () => {
    initStarfield();
    initLazyLoading();
    initExplodingText();
    initSearchBox();
    initCookieConsent();

    EchiLog("Sistema inizializzato");
});
