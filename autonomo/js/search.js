/* Ricerca dizionario */
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("dict-form");
    const input = document.getElementById("dict-q");

    if (!form || !input) return;

    form.addEventListener("submit", e => {
        e.preventDefault();
        const q = input.value.trim();
        if (!q) return;

        const checks = form.querySelectorAll(".sources input:checked");
        if (!checks.length) return;

        checks.forEach((check, i) => {
            const template = check.dataset.url;
            const url = template.replace("{q}", encodeURIComponent(q));
            window.open(url, "_blank", "noopener");
        });
    });
});
