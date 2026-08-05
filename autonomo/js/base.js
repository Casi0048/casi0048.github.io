/* ==========================================================
   UTILITÀ GLOBALI
========================================================== */
function safeDOM(fn, fallback = null) {
    try { return fn(); }
    catch (err) { console.warn("safeDOM error:", err); return fallback?.(); }
}

function safeQuery(s, c=document) {
    try { return c.querySelector(s); }
    catch { return null; }
}

/* ==========================================================
   STARFIELD
========================================================== */
function initStarfield() {
    safeDOM(() => {
        const box = safeQuery("#starsContainer");
        if (!box) return;

        for (let i = 0; i < 180; i++) {
            const s = document.createElement("div");
            s.className = "star";
            s.style.width = s.style.height = (Math.random()*3)+"px";
            s.style.left = (Math.random()*100)+"%";
            s.style.top = (Math.random()*100)+"%";
            s.style.opacity = (Math.random()*0.7)+0.2;
            s.style.animationDelay = (Math.random()*5)+"s";
            s.style.animationDuration = (3 + Math.random()*6)+"s";
            box.appendChild(s);
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
        imgs.forEach(img => img.src = img.dataset.src);
        return;
    }

    const obs = new IntersectionObserver((entries, self) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                const img = e.target;
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
   EXPLODING TEXT
========================================================== */
function initExplodingText() {
    const el = safeQuery("#exploding");
    if (!el) return;

    const txt = el.textContent.trim();
    el.textContent = "";

    [...txt].forEach(ch => {
        const span = document.createElement("span");
        span.className = "char";
        span.textContent = ch;
        el.appendChild(span);
    });

    el.addEventListener("click", () => explodeChars(el));
}

function explodeChars(box) {
    [...box.querySelectorAll(".char")].forEach(ch => {
        const dx = (Math.random()*200)-100;
        const dy = (Math.random()*200)-100;
        const rot = (Math.random()*720)-360;

        ch.style.transition = "transform .7s, opacity .7s";
        ch.style.transform = `translate(${dx}px, ${dy}px) rotate(${rot}deg)`;
        ch.style.opacity = "0";

        setTimeout(() => {
            ch.style.transition = "";
            ch.style.transform = "";
            ch.style.opacity = "1";
        }, 900);
    });
}

/* ==========================================================
   SEARCH BOX CLEAR
========================================================== */
function initSearchBox() {
    const box = safeQuery("#searchBox");
    const clear = safeQuery("#clearSearch");
    if (!box || !clear) return;

    box.addEventListener("input", () => {
        clear.style.display = box.value ? "block" : "none";
    });

    clear.addEventListener("click", () => {
        box.value = "";
        clear.style.display = "none";
        box.focus();
    });
}

/* ==========================================================
   GLOBAL ERROR HANDLER
========================================================== */
window.addEventListener("error", e => {
    console.warn("⚠️ Errore globale:", e.message);
});

/* ==========================================================
   ONLINE / OFFLINE
========================================================== */
window.addEventListener("offline", () =>
    document.body.classList.add("offline")
);

window.addEventListener("online", () =>
    document.body.classList.remove("offline")
);

/* ==========================================================
   INIT
========================================================== */
document.addEventListener("DOMContentLoaded", () => {
    initStarfield();
    initLazyLoading();
    initExplodingText();
    initSearchBox();
    console.log("🌙 Base.js inizializzato");
});
