(() => {
"use strict";

const input = document.getElementById("siteSearchInput");
const form = document.getElementById("siteSearchForm");
const results = document.getElementById("siteSearchResults");

if (!input || !form || !results) return;

const FULL_INDEX_URL = "/search-full-index.json";
const META_INDEX_URL = "/search-index.json";
const MAX_RESULTS = 12;
let fullIndexPromise;
let metaIndexPromise;
let debounceTimer;

const normalize = (value) =>
    String(value || "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLocaleLowerCase("it")
        .trim();

const escapeHTML = (value) =>
    String(value || "").replace(/[&<>"']/g, (char) => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[char]);

function loadJSON(url) {
    return fetch(url, { cache: "no-cache" }).then((response) => {
        if (!response.ok) throw new Error(`Errore HTTP ${response.status}: ${url}`);
        return response.json();
    });
}

function loadFullIndex() {
    if (!fullIndexPromise) {
        fullIndexPromise = loadJSON(FULL_INDEX_URL).catch((error) => {
            fullIndexPromise = null;
            throw error;
        });
    }
    return fullIndexPromise;
}

function loadMetaIndex() {
    if (!metaIndexPromise) {
        metaIndexPromise = loadJSON(META_INDEX_URL).catch(() => []);
    }
    return metaIndexPromise;
}

function getHomeContent() {
    const selectors = [
        ".hero",
        ".philosophy-quotes",
        ".scuola-card",
        ".resource",
        "main section"
    ];

    const elements = [...document.querySelectorAll(selectors.join(","))];
    const seen = new Set();

    return elements
        .filter((element) => {
            if (seen.has(element)) return false;
            seen.add(element);
            return !element.closest("#siteSearch");
        })
        .map((element) => {
            const title =
                element.querySelector("h1,h2,h3,h4")?.innerText?.trim() ||
                element.querySelector(".quote-author")?.innerText?.trim() ||
                "Contenuto della homepage";

            const text = (element.innerText || element.textContent || "")
                .replace(/\s+/g, " ")
                .trim();

            const link = element.matches("a[href]")
                ? element.href
                : element.querySelector("a[href]")?.href || "#";

            return {
                title,
                text,
                url: link,
                category: "Homepage"
            };
        });
}

function showStatus(message) {
    results.hidden = false;
    results.innerHTML = `<p class="site-search-status">${escapeHTML(message)}</p>`;
}

function renderItems(items, query) {
    if (!items.length) {
        showStatus(`Nessun risultato per “${query}”. Prova con un termine più generale.`);
        return;
    }

    results.hidden = false;
    results.innerHTML =
        `<p class="site-search-status">${items.length} risultati mostrati</p>` +
        items.map((item) => {
            const title = escapeHTML(item.title || "Senza titolo");
            const category = escapeHTML(item.category || "Articolo");
            const url = escapeHTML(item.url || "#");
            const rawText = String(item.text || item.desc || "");
            const words = normalize(rawText);
            const normalizedQuery = normalize(query);
            const position = words.indexOf(normalizedQuery);
            const start = position >= 0 ? Math.max(0, position - 100) : 0;
            const excerpt = rawText.slice(start, start + 230).trim();

            return `
                <article class="site-search-result">
                    <a href="${url}">${title}</a>
                    <p class="site-search-status">${category}</p>
                    ${excerpt ? `<p>${escapeHTML(excerpt)}${start + 230 < rawText.length ? "…" : ""}</p>` : ""}
                </article>`;
        }).join("");
}

async function search() {
    const query = input.value.trim();
    if (query.length < 2) {
        results.hidden = true;
        results.innerHTML = "";
        return;
    }

    showStatus("Sto cercando…");

    try {
        const [fullIndex, metaIndex] = await Promise.all([
            loadFullIndex(),
            loadMetaIndex()
        ]);

        const terms = normalize(query).split(/\s+/).filter(Boolean);
        const articles = Array.isArray(fullIndex) ? fullIndex : [];
        const metadata = Array.isArray(metaIndex) ? metaIndex : [];
        const home = getHomeContent();

        const combined = [
            ...articles,
            ...metadata.map((item) => ({
                ...item,
                text: item.text || item.desc || ""
            })),
            ...home
        ];

        const seen = new Set();
        const matches = combined
            .map((item) => {
                const title = String(item.title || "");
                const text = String(item.text || item.desc || "");
                const category = String(item.category || "");
                const searchable = normalize(`${title} ${category} ${text}`);
                const score = terms.reduce((total, term) => {
                    if (!searchable.includes(term)) return total;
                    return total + (normalize(title).includes(term) ? 5 : 1);
                }, 0);

                return { ...item, score, text };
            })
            .filter((item) => item.score > 0)
            .sort((a, b) => b.score - a.score)
            .filter((item) => {
                const key = item.url || item.title;
                if (!key || seen.has(key)) return false;
                seen.add(key);
                return true;
            })
            .slice(0, MAX_RESULTS);

        renderItems(matches, query);
    } catch (error) {
        console.error("Ricerca Echi di Sofia:", error);
        showStatus("Non riesco a caricare l'indice di ricerca. Riprova tra poco.");
    }
}


input.addEventListener("input", () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(search, 250);
});

form.addEventListener("submit", (event) => {
    event.preventDefault();
    clearTimeout(debounceTimer);
    search();
});

// Apertura e chiusura del pannello di ricerca
const toggleBtn = document.getElementById("searchToggleBtn");
const searchPanel = document.getElementById("siteSearch");

if (toggleBtn && searchPanel) {
    toggleBtn.addEventListener("click", () => {
        const isOpening = searchPanel.hidden;

        searchPanel.hidden = !isOpening;
        toggleBtn.setAttribute("aria-expanded", String(isOpening));
        toggleBtn.setAttribute(
            "aria-label",
            isOpening ? "Chiudi la ricerca" : "Apri la ricerca"
        );

        if (isOpening) {
            input.focus();
        } else {
            results.hidden = true;
        }
    });

    // Chiude il pannello con il tasto Esc
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && !searchPanel.hidden) {
            searchPanel.hidden = true;
            toggleBtn.setAttribute("aria-expanded", "false");
            toggleBtn.setAttribute("aria-label", "Apri la ricerca");
            results.hidden = true;
            toggleBtn.focus();
        }
    });
}

})();
