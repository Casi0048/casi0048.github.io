document.addEventListener("DOMContentLoaded", () => {
    const select = document.getElementById("customTranslate");

    function clearGT() {
        document.cookie = "googtrans=; expires=Thu, 01 Jan 1970; path=/;";
    }

    function loadGT() {
        if (!(window.google && google.translate)) {
            const s = document.createElement("script");
            s.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
            s.async = true;
            document.head.appendChild(s);
        }
    }

    function chooseLang(lang) {
        if (lang === "it") {
            clearGT();
            location.reload();
            return;
        }

        loadGT();
        setTimeout(() => {
            try {
                const combo = document.querySelector(".goog-te-combo");
                if (combo) {
                    combo.value = lang;
                    combo.dispatchEvent(new Event("change"));
                }
            } catch {}
        }, 800);
    }

    select.addEventListener("change", e => chooseLang(e.target.value));
});
