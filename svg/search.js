(() => {
  "use strict";

  /* =========================================================
     RIFERIMENTI DOM
     ========================================================= */
  const input    = document.getElementById("siteSearchInput");
  const form     = document.getElementById("siteSearchForm");
  const results  = document.getElementById("siteSearchResults");
  const toggleBtn = document.getElementById("searchToggleBtn");
  const panel     = document.getElementById("siteSearch");

  if (!input || !form || !results) return;

  /* =========================================================
     CONFIGURAZIONE
     ========================================================= */
  const FULL_INDEX_URL = "search-full-index.json";
  const META_INDEX_URL = "search-index.json";
  const MAX_RESULTS    = 12;
  const MIN_QUERY_LEN  = 2;
  const DEBOUNCE_MS    = 250;

  let fullIndexPromise;
  let metaIndexPromise;
  let debounceTimer;

  /* =========================================================
     UTILITY
     ========================================================= */
  const normalize = (value) =>
    String(value || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLocaleLowerCase("it")
      .trim();

  const escapeHTML = (value) =>
    String(value || "").replace(/[&<>"']/g, (char) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      }[char])
    );

  function loadJSON(url) {
    return fetch(url, { cache: "no-cache" }).then((response) => {
      if (!response.ok) {
        throw new Error(`Errore HTTP ${response.status}: ${url}`);
      }
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

  /* =========================================================
     INDICE DELLA HOMEPAGE
     Costruisce un indice dei contenuti direttamente dal DOM.
     ========================================================= */
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
        // Esclude il pannello di ricerca stesso
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

  /* =========================================================
     RENDERING
     ========================================================= */
  function showStatus(message) {
    results.hidden = false;
    results.innerHTML = `<p class="site-search-status">${escapeHTML(
      message
    )}</p>`;
  }

  function clearResults() {
    results.hidden = true;
    results.innerHTML = "";
  }

  function renderItems(items, query) {
    if (!items.length) {
      showStatus(
        `Nessun risultato per “${query}”. Prova con un termine più generale.`
      );
      return;
    }

    results.hidden = false;
    results.innerHTML =
      `<p class="site-search-status">${items.length} risultati mostrati</p>` +
      items
        .map((item) => {
          const title = escapeHTML(item.title || "Senza titolo");
          const category = escapeHTML(item.category || "Articolo");
          const url = escapeHTML(item.url || "#");
          const rawText = String(item.text || item.desc || "");
          const words = normalize(rawText);
          const normalizedQuery = normalize(query);
          const position = words.indexOf(normalizedQuery);
          const start = position >= 0 ? Math.max(0, position - 100) : 0;
          const excerpt = rawText.slice(start, start + 230).trim();
          const truncated = start + 230 < rawText.length ? "…" : "";

          return `
            <article class="site-search-result">
              <a href="${url}">${title}</a>
              <p class="site-search-status">${category}</p>
              ${
                excerpt
                  ? `<p>${escapeHTML(excerpt)}${truncated}</p>`
                  : ""
              }
            </article>`;
        })
        .join("");
  }

  /* =========================================================
     RICERCA
     ========================================================= */
  async function search() {
    const query = input.value.trim();

    if (query.length < MIN_QUERY_LEN) {
      clearResults();
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
      showStatus(
        "Non riesco a caricare l'indice di ricerca. Riprova tra poco."
      );
    }
  }

  /* =========================================================
     EVENTI SUL FORM
     ========================================================= */
  input.addEventListener("input", () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(search, DEBOUNCE_MS);
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    clearTimeout(debounceTimer);
    search();
  });

  /* =========================================================
     APERTURA / CHIUSURA PANNELLO
     ========================================================= */
  if (toggleBtn && panel) {
    function openPanel() {
      panel.hidden = false;
      toggleBtn.setAttribute("aria-expanded", "true");
      toggleBtn.setAttribute("aria-label", "Chiudi la ricerca");

      // Focus dopo il paint: necessario su iOS
      requestAnimationFrame(() => input.focus());
    }

    function closePanel({ returnFocus = false } = {}) {
      panel.hidden = true;
      toggleBtn.setAttribute("aria-expanded", "false");
      toggleBtn.setAttribute("aria-label", "Apri la ricerca");

      input.value = "";
      clearResults();

      if (returnFocus) toggleBtn.focus();
    }

    // --- Toggle sulla lente ---
    toggleBtn.addEventListener("click", (event) => {
      event.stopPropagation();
      if (panel.hidden) {
        openPanel();
      } else {
        closePanel();
      }
    });

    // --- Esc ---
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !panel.hidden) {
        closePanel({ returnFocus: true });
      }
    });

    // --- Click fuori dal pannello ---
    document.addEventListener("click", (event) => {
      if (panel.hidden) return;
      if (panel.contains(event.target)) return;
      if (toggleBtn.contains(event.target)) return;
      closePanel();
    });

    // --- Click su un risultato ---
    results.addEventListener("click", (event) => {
      if (event.target.closest("a")) {
        closePanel();
      }
    });
  }
})();
