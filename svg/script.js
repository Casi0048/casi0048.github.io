/* =========================================================
   ECHI DI SOFIA — script.js
   Caricato in index.html con:
     <script src="/svg/script.js" defer></script>
   "defer" garantisce che il DOM sia pronto prima dell'esecuzione.
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {
    "use strict";
    console.log("🎵 Echi di Sofia — Avvio script");

    /* =====================================================
       1) PLAYER MUSICALE — playlist con 2 brani
       ===================================================== */
    const player        = document.getElementById("musicPlayer");
    const playerToggle  = document.getElementById("playerToggle");
    const musicClose    = document.getElementById("musicClose");
    const playButton    = document.getElementById("playButton");
    const playerStatus  = document.getElementById("playerStatus");
    const progress      = document.getElementById("musicProgress");
    const volumeToggle  = document.getElementById("volumeToggle");
    const audio         = document.getElementById("myAudio");
    const musicTitle    = document.getElementById("musicTitle");
    const nextButton    = document.getElementById("nextButton");

    if (player && playerToggle && playButton && audio) {
        console.log("🎵 Player inizializzato");

        /* ----- PLAYLIST ----- */
      const tracks = [
    {
        src:   "/suoni/Strauss.mp3",
        title: "Strauss – 'Sul bel Danubio blu'"
    },
    {
        src:   "/suoni/notturno.mp3",           // ✅ nome reale del file
        title: "Beethoven – Sonata 'Chiaro di luna', Op. 27 n. 2"
    }
];

        let currentTrack = 0;

/* ----- RIFERIMENTO ALLA PLAYLIST ----- */
const playlistEl = document.getElementById("musicPlaylist");

/* ----- FUNZIONI ----- */
function loadTrack(index) {
    currentTrack = (index + tracks.length) % tracks.length;
    const track = tracks[currentTrack];
    audio.src = track.src;
    audio.load();
    if (musicTitle)   musicTitle.textContent = track.title;
    if (progress)     progress.value = 0;
    if (playerStatus) playerStatus.textContent = "In pausa";
    playButton.textContent = "▶";
    highlightActiveTrack();
}

function renderPlaylist() {
    if (!playlistEl) return;
    playlistEl.innerHTML = "";
    tracks.forEach(function (track, index) {
        const li = document.createElement("li");
        li.textContent = track.title;
        li.dataset.index = index;
        li.addEventListener("click", function (e) {
            e.stopPropagation();
            const wasPlaying = !audio.paused;
            loadTrack(index);
            if (wasPlaying) {
                audio.play().catch(function (err) {
                    console.warn("Riproduzione audio non avviata:", err);
                });
            }
        });
        playlistEl.appendChild(li);
    });
    highlightActiveTrack();
}

function highlightActiveTrack() {
    if (!playlistEl) return;
    playlistEl.querySelectorAll("li").forEach(function (li) {
        li.classList.toggle("active", Number(li.dataset.index) === currentTrack);
    });
}

/* ----- INIZIALIZZAZIONE ----- */
renderPlaylist();   // 1) costruisci la lista
loadTrack(0);       // 2) carica il primo brano (ora può evidenziarlo)
        function openPanel() {
            player.classList.add("open");
            playerToggle.setAttribute("aria-expanded", "true");
        }
        function closePanel() {
            player.classList.remove("open");
            playerToggle.setAttribute("aria-expanded", "false");
        }

        playerToggle.addEventListener("click", function (e) {
            e.stopPropagation();
            if (player.classList.contains("open")) closePanel();
            else openPanel();
        });

        if (musicClose) {
            musicClose.addEventListener("click", function (e) {
                e.stopPropagation();
                closePanel();
            });
        }

        // Click fuori dal player: chiude (con stopPropagation sul toggle
        // per evitare che il click di apertura lo chiuda subito)
        document.addEventListener("click", function (e) {
            if (!player.contains(e.target)) closePanel();
        });

        // ESC: chiude
        document.addEventListener("keydown", function (e) {
            if (e.key === "Escape" && player.classList.contains("open")) closePanel();
        });

        /* ----- PLAY / PAUSA ----- */
        playButton.addEventListener("click", function (e) {
            e.stopPropagation();
            if (audio.paused) {
                audio.play()
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

        /* ----- BRANO SUCCESSIVO ----- */
        if (nextButton) {
            nextButton.addEventListener("click", function (e) {
                e.stopPropagation();
                const wasPlaying = !audio.paused;
                loadTrack(currentTrack + 1);
                if (wasPlaying) {
                    audio.play().catch(function (err) {
                        console.warn("Riproduzione audio non avviata:", err);
                    });
                }
            });
        }

        /* ----- FINE BRANO → passa al successivo ----- */
        audio.addEventListener("ended", function () {
            loadTrack(currentTrack + 1);
            audio.play().catch(function (err) {
                console.warn("Autoplay bloccato:", err);
                playButton.textContent = "▶";
                if (playerStatus) playerStatus.textContent = "In pausa";
            });
        });

        /* ----- BARRA DI AVANZAMENTO ----- */
        if (progress) {
            audio.addEventListener("timeupdate", function () {
                if (audio.duration) {
                    progress.value = (audio.currentTime / audio.duration) * 100;
                }
            });
            progress.addEventListener("input", function () {
                if (audio.duration) {
                    audio.currentTime = (this.value / 100) * audio.duration;
                }
            });
        }

        /* ----- MUTE ----- */
        let isMuted = false;
        if (volumeToggle) {
            volumeToggle.addEventListener("click", function (e) {
                e.stopPropagation();
                isMuted = !isMuted;
                audio.muted = isMuted;
                this.textContent = isMuted ? "🔇" : "🔊";
            });
        }

    } else {
        console.warn("⚠️ Player: alcuni elementi DOM non trovati");
    }

    /* =====================================================
       2) VIDEO — sezione "Visioni"
       ===================================================== */
    const videoPlayer  = document.getElementById("videoPlayer");
    const videoToggle  = document.getElementById("videoToggle");
    const videoClose   = document.getElementById("videoClose");
    const visioniVideo = document.getElementById("visioniVideo");

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
            // Se è un <video> nativo, lo mette in pausa
            if (visioniVideo && visioniVideo.tagName === "VIDEO") {
                visioniVideo.pause();
            }
        }

        videoToggle.addEventListener("click", function (e) {
            e.stopPropagation();
            if (videoPlayer.classList.contains("open")) closeVideo();
            else openVideo();
        });

        if (videoClose) {
            videoClose.addEventListener("click", function (e) {
                e.stopPropagation();
                closeVideo();
            });
        }

        document.addEventListener("click", function (e) {
            if (!videoPlayer.contains(e.target)) closeVideo();
        });

        document.addEventListener("keydown", function (e) {
            if (e.key === "Escape" && videoPlayer.classList.contains("open")) closeVideo();
        });
    }

    /* =====================================================
       3) NEWSLETTER
       ===================================================== */
    const newsletterTrigger = document.getElementById("newsletterTrigger");
    const newsletterModal   = document.getElementById("newsletterModal");
    const closeNewsletter   = document.getElementById("closeNewsletter");
    const newsletterForm    = document.getElementById("newsletterForm");

    function openNewsletter() {
        newsletterModal.classList.add("open");
        newsletterModal.setAttribute("aria-hidden", "false");
    }
    function closeNewsletterModal() {
        newsletterModal.classList.remove("open");
        newsletterModal.setAttribute("aria-hidden", "true");
    }

    if (newsletterTrigger && newsletterModal) {
        newsletterTrigger.addEventListener("click", function (e) {
            e.preventDefault();
            openNewsletter();
        });
    }
    if (closeNewsletter && newsletterModal) {
        closeNewsletter.addEventListener("click", function (e) {
            e.preventDefault();
            closeNewsletterModal();
        });
    }
    if (newsletterModal) {
        newsletterModal.addEventListener("click", function (e) {
            if (e.target === newsletterModal) closeNewsletterModal();
        });
        document.addEventListener("keydown", function (e) {
            if (e.key === "Escape" && newsletterModal.classList.contains("open")) {
                closeNewsletterModal();
            }
        });
    }

    if (newsletterForm) {
        newsletterForm.addEventListener("submit", async function (e) {
            e.preventDefault();
            e.stopPropagation();

            const emailInput    = newsletterForm.querySelector('input[type="email"]');
            const consentInput  = newsletterForm.querySelector("#newsletterConsent");
            const submitButton  = newsletterForm.querySelector('button[type="submit"]');

            if (!emailInput || !consentInput) {
                console.error("Campi newsletter mancanti.");
                return;
            }

            const email = emailInput.value.trim();

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

            if (submitButton) {
                submitButton.disabled = true;
                submitButton.textContent = "Invio…";
            }

            try {
                const response = await fetch("https://weathered-snowflake-65e3.sylk76.workers.dev", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email: email })
                });
                const result = await response.json();

                if (response.ok && result.success) {
                    alert("Grazie! Iscrizione ricevuta.");
                    newsletterForm.reset();
                    closeNewsletterModal();
                } else {
                    console.error("Errore newsletter:", result);
                    alert(
                        "ERRORE BREVO:\n\n" +
                        (result.message || "Errore sconosciuto.") +
                        "\n\nDETTAGLI:\n" +
                        (result.details || "Nessun dettaglio restituito.")
                    );
                }
            } catch (error) {
                console.error("Errore di connessione al Worker:", error);
                alert("Impossibile contattare il servizio newsletter.\n\n" + error.message);
            } finally {
                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.textContent = "Iscriviti";
                }
            }
        });
    }

    /* =====================================================
       4) PULSANTE "TORNA SU"
       ===================================================== */
    const tornaSuBtn = document.getElementById("tornaSu");
    if (tornaSuBtn) {
        function toggleTornaSu() {
            if (window.scrollY > 150) tornaSuBtn.classList.add("visible");
            else tornaSuBtn.classList.remove("visible");
        }
        window.addEventListener("scroll", toggleTornaSu, { passive: true });
        tornaSuBtn.addEventListener("click", function (e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
        toggleTornaSu();
    }

    /* =====================================================
       5) TEMA CHIARO/SCURO
       ===================================================== */
    const themeToggle = document.getElementById("themeToggle");
    const themeLabel  = document.getElementById("themeLabel");
    const iconMoon    = document.getElementById("iconMoon");
    const iconSun     = document.getElementById("iconSun");

    if (themeToggle) {
        const savedTheme = localStorage.getItem("theme") || "dark";

        function setTheme(theme) {
            if (theme === "light") {
                document.body.classList.add("light-theme");
                themeLabel.textContent = "Chiaro";
                if (iconMoon) iconMoon.style.display = "none";
                if (iconSun)  iconSun.style.display  = "block";
            } else {
                document.body.classList.remove("light-theme");
                themeLabel.textContent = "Scuro";
                if (iconMoon) iconMoon.style.display = "block";
                if (iconSun)  iconSun.style.display  = "none";
            }
            localStorage.setItem("theme", theme);
        }

        setTheme(savedTheme);

        themeToggle.addEventListener("click", function () {
            const isLight = document.body.classList.contains("light-theme");
            setTheme(isLight ? "dark" : "light");
        });
    }

    console.log("✅ Script inizializzato correttamente");
});

/* =========================================================
   EFFETTO "ECO" AL CLICK
   ========================================================= */
document.addEventListener("click", function (event) {
    // Punto luminoso iniziale
    const origin = document.createElement("div");
    origin.className = "echo-origin";
    origin.style.left = event.clientX + "px";
    origin.style.top  = event.clientY + "px";
    document.body.appendChild(origin);
    origin.addEventListener("animationend", function () {
        origin.remove();
    });

    // Onda organica irregolare
    const ripple = document.createElement("div");
    ripple.className = "echo-ripple";
    ripple.style.left = event.clientX + "px";
    ripple.style.top  = event.clientY + "px";

    function createOrganicWave(radius, irregularity, phase) {
        const points   = [];
        const segments = 72;
        const center   = 230;
        for (let i = 0; i < segments; i++) {
            const angle = (Math.PI * 2 * i) / segments;
            const variation =
                Math.sin(angle * 3 + phase) * irregularity +
                Math.sin(angle * 5 - phase * 1.7) * irregularity * 0.45 +
                Math.sin(angle * 7 + phase * 0.8) * irregularity * 0.2;
            const r = radius + variation;
            const x = center + Math.cos(angle) * r;
            const y = center + Math.sin(angle) * r;
            points.push([x, y]);
        }
        let d = `M ${points[0][0]} ${points[0][1]}`;
        for (let i = 1; i < points.length; i++) {
            d += ` L ${points[i][0]} ${points[i][1]}`;
        }
        d += " Z";
        return d;
    }

    ripple.innerHTML = `
        <svg viewBox="0 0 460 460" xmlns="http://www.w3.org/2000/svg">
            <path class="ripple-1" d="${createOrganicWave(34, 2.8, 0.4)}" />
            <path class="ripple-2" d="${createOrganicWave(39, 2.3, 2.1)}" />
            <path class="ripple-3" d="${createOrganicWave(44, 1.8, 4.0)}" />
        </svg>
    `;
    document.body.appendChild(ripple);

    const firstWave = ripple.querySelector(".ripple-1");
    firstWave.style.opacity   = "0.82";
    firstWave.style.transform = "scale(.02)";
    requestAnimationFrame(() => firstWave.classList.add("start"));

    ripple.addEventListener("animationend", function (e) {
        if (e.animationName === "darkRipple1") ripple.remove();
    });
});

/* =========================================================
   OROLOGIO DI ERACLITO — lancette in tempo reale
   ========================================================= */
(function updateClock() {
    const now     = new Date();
    const hours   = now.getHours() % 12;
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    const hourAngle = hours * 30 + minutes * 0.5;
    const minAngle  = minutes * 6 + seconds * 0.1;

    const hourHand = document.getElementById("hourHand");
    const minHand  = document.getElementById("minHand");

    if (hourHand) hourHand.setAttribute("transform", "rotate(" + hourAngle + ", 100, 100)");
    if (minHand)  minHand.setAttribute("transform",  "rotate(" + minAngle  + ", 100, 100)");

    setTimeout(updateClock, 1000);
})();
