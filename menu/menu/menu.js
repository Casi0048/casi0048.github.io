
document.addEventListener("DOMContentLoaded", () => {
    console.log("📚 MENU esterno caricato");

    // Hover animato per il mega menu
    document.querySelectorAll(".menu-item.has-sub").forEach(item => {
        
        let panel = item.querySelector(".mega-panel");

        item.addEventListener("mouseenter", () => {
            if (!panel) return;
            panel.style.display = "grid";

            if (window.gsap) {
                gsap.fromTo(panel,
                    { opacity: 0, y: -10 },
                    { opacity: 1, y: 0, duration: 0.25, ease: "power2.out" }
                );
            }
        });

        item.addEventListener("mouseleave", () => {
            if (!panel) return;
            if (window.gsap) {
                gsap.to(panel, {
                    opacity: 0,
                    y: -10,
                    duration: 0.25,
                    ease: "power2.in",
                    onComplete: () => panel.style.display = "none"
                });
            } else {
                panel.style.display = "none";
            }
        });
    });

});
