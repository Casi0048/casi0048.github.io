/* =========================================================
   ECHI DI SOFIA — script.js
   Caricato con <script src="svg/script.js" defer></script>
   Il "defer" garantisce che il DOM sia pronto prima dell'esecuzione.
   ========================================================= */

/* ---------------------------------------------------------
   BLOCCO PRINCIPALE
   Aspetta che il DOM sia completamente costruito prima di
   cercare elementi (pulsanti, player, form, ecc.).
   Con "defer" questo listener è ridondante ma innocuo.
   --------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", function () {
    "use strict"; // Attiva modalità strict: errori più chiari, no variabili globali accidentali
    console.log("🎵 Echi di Sofia — Avvio script");

    /* =====================================================
       1) PLAYER MUSICALE
       Gestisce apertura/chiusura del pannello, play/pausa,
       barra di avanzamento e mute.
       ===================================================== */
    const player = document.getElementById("musicPlayer");       // contenitore del player
    const playerToggle = document.getElementById("playerToggle"); // pulsante che apre/chiude il pannello
    const musicClose = document.getElementById("musicClose");     // pulsante X di chiusura
    const playButton = document.getElementById("playButton");     // ▶ / ❚❚
    const playerStatus = document.getElementById("playerStatus"); // testo "In riproduzione" / "In pausa"
    const progress = document.getElementById("musicProgress");    // slider avanzamento
    const volumeToggle = document.getElementById("volumeToggle"); // pulsante muto
    const audio = document.getElementById("myAudio");             // elemento <audio>

    // Procede solo se gli elementi essenziali esistono nella pagina
    if (player && playerToggle && playButton && audio) {
        console.log("🎵 Player inizializzato");

        // Apre il pannello e aggiorna l'attributo di accessibilità
        function openPanel() {
            player.classList.add("open");
            playerToggle.setAttribute("aria-expanded", "true");
        }

        // Chiude il pannello
        function closePanel() {
            player.classList.remove("open");
            playerToggle.setAttribute("aria-expanded", "false");
        }

        // Click sul pulsante toggle: apre se chiuso, chiude se aperto
        playerToggle.addEventListener("click", function () {
            if (player.classList.contains("open")) closePanel();
            else openPanel();
        });

        // Click sulla X: chiude
        if (musicClose) musicClose.addEventListener("click", closePanel);

        // Click fuori dal player: chiude automaticamente
        document.addEventListener("click", function (e) {
            if (!player.contains(e.target)) closePanel();
        });

        // Tasto ESC: chiude se aperto
        document.addEventListener("keydown", function (e) {
            if (e.key === "Escape" && player.classList.contains("open")) closePanel();
        });

        // Play / Pausa
        playButton.addEventListener("click", function () {
            if (audio.paused) {
                // audio.play() restituisce una Promise: può fallire (es. autoplay bloccato)
                audio
                    .play()
                    .then(function () {
                        playButton.textContent = "❚❚";
                        if (playerStatus) playerStatus.textContent = "In riproduzione";
                    })
                    .catch(function (err) {
                        console.warn("Riproduzione audio non avviata:", err);
                        if (playerStatus) playerStatus.textContent = "Errore";
                    });
            } else {
                audio.pause();
                playButton.textContent = "▶";
                if (playerStatus) playerStatus.textContent = "In pausa";
            }
        });

        // Quando il brano finisce, riporta il pulsante a ▶
        audio.addEventListener("ended", function () {
            playButton.textContent = "▶";
            if (playerStatus) playerStatus.textContent = "In pausa";
        });

        // Barra di avanzamento: si aggiorna mentre l'audio procede
        if (audio && progress) {
            audio.addEventListener("timeupdate", function () {
                if (audio.duration) progress.value = (audio.currentTime / audio.duration) * 100;
            });
            // Se l'utente trascina la barra, sposta la riproduzione
            progress.addEventListener("input", function () {
                if (audio.duration) audio.currentTime = (this.value / 100) * audio.duration;
            });
        }

        // Mute on/off: cambia icona 🔊 / 🔇
        let isMuted = false;
        if (volumeToggle && audio) {
            volumeToggle.addEventListener("click", function () {
                isMuted = !isMuted;
                audio.muted = isMuted;
                this.textContent = isMuted ? "🔇" : "🔊";
            });
        }
    } else {
        // Avviso in console se manca qualche elemento (utile in fase di debug)
        console.warn("⚠️ Player: alcuni elementi DOM non trovati");
    }

    /* =====================================================
       2) VIDEO — sezione "Visioni"
       Apre/chiude un pannello con un video; mette in pausa
       il video alla chiusura.
       ===================================================== */
    const videoPlayer = document.getElementById("videoPlayer");   // contenitore
    const videoToggle = document.getElementById("videoToggle");   // pulsante apertura
    const videoClose = document.getElementById("videoClose");     // pulsante chiusura
    const visioniVideo = document.getElementById("visioniVideo"); // <video> o iframe

    if (videoPlayer && videoToggle) {
        function openVideo() {
            videoPlayer.classList.add("open");
            videoToggle.setAttribute("aria-expanded", "true");
            const panel = document.getElementById("videoPanel");
            if (panel) panel.setAttribute("aria-hidden", "false");
        }

        function closeVideo() {
            videoPlayer.classList.remove("open");
            videoToggle.setAttribute("aria-expanded", "false");
            const panel = document.getElementById("videoPanel");
            if (panel) panel.setAttribute("aria-hidden", "true");
            // Se è un <video>, lo mette in pausa (un iframe non si può controllare così)
            if (visioniVideo && visioniVideo.tagName === "VIDEO") {
                visioniVideo.pause();
            }
        }

        // toggle: stopPropagation evita che il click risalga al document
        // e faccia scattare la chiusura "click fuori" subito dopo
        videoToggle.addEventListener("click", function (e) {
            e.stopPropagation();
            if (videoPlayer.classList.contains("open")) closeVideo();
            else openVideo();
        });

        // X di chiusura
        if (videoClose) {
            videoClose.addEventListener("click", function (e) {
                e.stopPropagation();
                closeVideo();
            });
        }

        // Click fuori dal pannello: chiude
        document.addEventListener("click", function (e) {
            if (!videoPlayer.contains(e.target)) closeVideo();
        });

        // ESC: chiude
        document.addEventListener("keydown", function (e) {
            if (e.key === "Escape" && videoPlayer.classList.contains("open")) closeVideo();
        });
    }

    /* =====================================================
       3) NEWSLETTER
       Apre un modale, gestisce l'invio del form tramite
       un Cloudflare Worker che parla con Brevo.
       ===================================================== */
    const newsletterTrigger = document.getElementById("newsletterTrigger"); // link/pulsante apertura
    const newsletterModal = document.getElementById("newsletterModal");     // overlay modale
    const closeNewsletter = document.getElementById("closeNewsletter");     // pulsante X
    const newsletterForm = document.getElementById("newsletterForm");       // form iscrizione

    // Apri il modale
    if (newsletterTrigger && newsletterModal) {
        newsletterTrigger.addEventListener("click", function (e) {
            e.preventDefault();
            newsletterModal.classList.add("open");
            newsletterModal.setAttribute("aria-hidden", "false");
        });
    }

    // Chiudi con la X
    if (closeNewsletter && newsletterModal) {
        closeNewsletter.addEventListener("click", function (e) {
            e.preventDefault();
            newsletterModal.classList.remove("open");
            newsletterModal.setAttribute("aria-hidden", "true");
        });
    }

    // Chiudi cliccando sullo sfondo (non sul contenuto del modale)
    if (newsletterModal) {
        newsletterModal.addEventListener("click", function (e) {
            if (e.target === newsletterModal) {
                newsletterModal.classList.remove("open");
                newsletterModal.setAttribute("aria-hidden", "true");
            }
        });
    }

    // Chiudi con ESC
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && newsletterModal && newsletterModal.classList.contains("open")) {
            newsletterModal.classList.remove("open");
            newsletterModal.setAttribute("aria-hidden", "true");
        }
    });

    // Invio del form
    if (newsletterForm) {
        newsletterForm.addEventListener("submit", async function (e) {
            e.preventDefault();   // blocca il submit tradizionale
            e.stopPropagation();

            const emailInput = newsletterForm.querySelector('input[type="email"]');
            const consentInput = newsletterForm.querySelector("#newsletterConsent");
            const submitButton = newsletterForm.querySelector('button[type="submit"]');

            // Sicurezza: se mancano i campi attesi, esci
            if (!emailInput || !consentInput) {
                console.error("Campi newsletter mancanti.");
                return;
            }

            const email = emailInput.value.trim();

            // Validazione base lato client
            if (!email) {
                alert("Inserisci un indirizzo email valido.");
                emailInput.focus();
                return;
            }
            if (!consentInput.checked) {
                alert("Per iscriverti devi accettare la Privacy Policy.");
                consentInput.focus();
                return;
            }

            // Disabilita il bottone per evitare doppio invio
            if (submitButton) {
                submitButton.disabled = true;
                submitButton.textContent = "Invio…";
            }

            try {
                // Chiamata al Worker Cloudflare che inoltra a Brevo
                const response = await fetch("https://weathered-snowflake-65e3.sylk76.workers.dev", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email: email }),
                });
                const result = await response.json();

                if (response.ok && result.success) {
                    // Successo
                    alert("Grazie! Iscrizione ricevuta.");
                    newsletterForm.reset();
                    newsletterModal.classList.remove("open");
                    newsletterModal.setAttribute("aria-hidden", "true");
                } else {
                    // Errore lato server: mostra dettagli per debug
                    console.error("Errore newsletter:", result);
                    alert(
                        "ERRORE BREVO:\n\n" +
                            (result.message || "Errore sconosciuto.") +
                            "\n\nDETTAGLI:\n" +
                            (result.details || "Nessun dettaglio restituito.")
                    );
                }
            } catch (error) {
                // Errore di rete / Worker irraggiungibile
                console.error("Errore di connessione al Worker:", error);
                alert("Impossibile contattare il servizio newsletter.\n\n" + error.message);
            } finally {
                // Riabilita il bottone in ogni caso
                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.textContent = "Iscriviti";
                }
            }
        });
    }

    /* =====================================================
       4) PULSANTE "TORNA SU"
       Compare dopo 150px di scroll e riporta in cima.
       ===================================================== */
    const tornaSuBtn = document.getElementById("tornaSu");
    if (tornaSuBtn) {
        // Mostra/nascondi in base allo scroll
        function toggleTornaSu() {
            const scrollY = window.scrollY;
            if (scrollY > 150) tornaSuBtn.classList.add("visible");
            else tornaSuBtn.classList.remove("visible");
        }
        // passive:true migliora le performance dello scroll
        window.addEventListener("scroll", toggleTornaSu, { passive: true });

        // Click: scroll fluido verso l'alto
        tornaSuBtn.addEventListener("click", function (e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
        });

        toggleTornaSu(); // stato iniziale al caricamento
    }

    /* =====================================================
       5) TEMA CHIARO/SCURO
       Salva la scelta in localStorage e la ripristina
       ad ogni visita.
       ===================================================== */
    const themeToggle = document.getElementById("themeToggle");
    const themeLabel = document.getElementById("themeLabel");
    const iconMoon = document.getElementById("iconMoon");
    const iconSun = document.getElementById("iconSun");

    if (themeToggle) {
        // Legge il tema salvato; default "dark"
        const savedTheme = localStorage.getItem("theme") || "dark";

        // Applica il tema (classe su body + icona + label + storage)
        function setTheme(theme) {
            if (theme === "light") {
                document.body.classList.add("light-theme");
                themeLabel.textContent = "Chiaro";
                if (iconMoon) iconMoon.style.display = "none";
                if (iconSun) iconSun.style.display = "block";
            } else {
                document.body.classList.remove("light-theme");
                themeLabel.textContent = "Scuro";
                if (iconMoon) iconMoon.style.display = "block";
                if (iconSun) iconSun.style.display = "none";
            }
            localStorage.setItem("theme", theme);
        }

        setTheme(savedTheme); // applica all'avvio

        // Al click inverte il tema corrente
        themeToggle.addEventListener("click", function () {
            const isLight = document.body.classList.contains("light-theme");
            setTheme(isLight ? "dark" : "light");
        });
    }

    console.log("✅ Script inizializzato correttamente");
});

/* =========================================================
   EFFETTO "ECO" AL CLICK
   Questo blocco è FUORI dal DOMContentLoaded:
   - aggiunge al <body> un piccolo punto luminoso (echo-origin)
   - e un'onda SVG irregolare (echo-ripple) che parte dal click.
   Si auto-rimuovono quando l'animazione termina.
   ========================================================= */
document.addEventListener("click", function (event) {
    // 1) Punto iniziale
    const origin = document.createElement("div");
    origin.className = "echo-origin";
    origin.style.left = event.clientX + "px";
    origin.style.top = event.clientY + "px";
    document.body.appendChild(origin);
    // Rimuove l'elemento dal DOM a fine animazione (evita accumulo)
    origin.addEventListener("animationend", function () {
        origin.remove();
    });

    // 2) Onda organica irregolare
    const ripple = document.createElement("div");
    ripple.className = "echo-ripple";
    ripple.style.left = event.clientX + "px";
    ripple.style.top = event.clientY + "px";

    // Genera un path SVG "organico" (un cerchio con piccole variazioni)
    // radius: raggio base — irregularity: quanto è ondulato — phase: sfasamento
    function createOrganicWave(radius, irregularity, phase) {
        const points = [];
        const segments = 72;              // numero di punti lungo il perimetro
        const center = 230;               // centro dell'area SVG (460/2)
        for (let i = 0; i < segments; i++) {
            const angle = (Math.PI * 2 * i) / segments;
            // Somma di tre sinusoidi per ottenere un bordo irregolare ma fluido
            const variation =
                Math.sin(angle * 3 + phase) * irregularity +
                Math.sin(angle * 5 - phase * 1.7) * irregularity * 0.45 +
                Math.sin(angle * 7 + phase * 0.8) * irregularity * 0.2;
            const r = radius + variation;
            const x = center + Math.cos(angle) * r;
            const y = center + Math.sin(angle) * r;
            points.push([x, y]);
        }
        // Costruisce il path SVG: M (punto iniziale) + L (linee) + Z (chiude)
        let d = `M ${points[0][0]} ${points[0][1]}`;
        for (let i = 1; i < points.length; i++) d += ` L ${points[i][0]} ${points[i][1]}`;
        d += " Z";
        return d;
    }

    // Tre onde sovrapposte con parametri diversi (per un effetto più ricco)
    ripple.innerHTML = `
        <svg viewBox="0 0 460 460" xmlns="http://www.w3.org/2000/svg">
            <path class="ripple-1" d="${createOrganicWave(34, 2.8, 0.4)}" />
            <path class="ripple-2" d="${createOrganicWave(39, 2.3, 2.1)}" />
            <path class="ripple-3" d="${createOrganicWave(44, 1.8, 4.0)}" />
        </svg>
    `;
    document.body.appendChild(ripple);

    // Stato iniziale della prima onda: quasi invisibile e ridotta
    const firstWave = ripple.querySelector(".ripple-1");
    firstWave.style.opacity = "0.82";
    firstWave.style.transform = "scale(.02)";
    // Forza il browser a calcolare lo stile prima di aggiungere la classe .start
    // (serve per far partire correttamente la transizione/animazione CSS)
    requestAnimationFrame(() => firstWave.classList.add("start"));

    // Rimuove l'onda quando l'animazione "darkRipple1" termina
    ripple.addEventListener("animationend", function (e) {
        if (e.animationName === "darkRipple1") ripple.remove();
    });
});

/* =========================================================
   OROLOGIO DI ERACLITO — lancette in tempo reale
   Funzione auto-invocata che ogni secondo ruota le lancette
   dell'orologio SVG (#hourHand, #minHand).
   Essendo FUORI dal DOMContentLoaded, richiede che lo script
   sia caricato con "defer" (così il DOM esiste già).
   ========================================================= */
(function updateClock() {
    const now = new Date();
    const hours = now.getHours() % 12;   // formato 12 ore
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    // Angoli in gradi:
    // - ora: 30° per ora + 0.5° per minuto (movimento continuo)
    // - minuto: 6° per minuto + 0.1° per secondo
    const hourAngle = hours * 30 + minutes * 0.5;
    const minAngle = minutes * 6 + seconds * 0.1;

    const hourHand = document.getElementById("hourHand");
    const minHand = document.getElementById("minHand");

    // Ruota le lancette attorno al centro (100,100) del viewBox SVG
    if (hourHand) {
        hourHand.setAttribute("transform", "rotate(" + hourAngle + ", 100, 100)");
    }
    if (minHand) {
        minHand.setAttribute("transform", "rotate(" + minAngle + ", 100, 100)");
    }

    // Ripete ogni secondo
    setTimeout(updateClock, 1000);
})();
