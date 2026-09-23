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
            loadTrack(index);
            audio.play()
                .then(function () {
                    playButton.textContent = "❚❚";
                    if (playerStatus) playerStatus.textContent = "In riproduzione";
                })
                .catch(function (err) {
                    console.warn("Riproduzione audio non avviata:", err);
                    if (playerStatus) playerStatus.textContent = "Errore";
                });
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
/* =====================================================
   6) FRASI FILOSOFICHE ROTANTI
   ===================================================== */
const quoteText   = document.getElementById("quoteText");
const quoteAuthor = document.getElementById("quoteAuthor");
const quoteBlock  = document.querySelector(".quote-block");
const quoteInfo   = document.getElementById("quoteInfo");
const quoteSource = document.getElementById("quoteSource");

if (quoteText && quoteAuthor && quoteBlock) {
   const quotes = [

    // =====================================================
    // PRESOCRATICI
    // =====================================================

    {
        text: "L'uomo è misura di tutte le cose.",
        author: "Protagora",
        source: "Frammento B1, traduzione italiana"
    },
    {
        text: "La natura ama nascondersi.",
        author: "Eraclito",
        source: "Frammento B123, traduzione italiana"
    },
    {
        text: "Il logos è comune a tutti.",
        author: "Eraclito",
        source: "Frammento B2, formulazione sintetica"
    },
    {
        text: "La guerra è padre di tutte le cose.",
        author: "Eraclito",
        source: "Frammento B53, traduzione italiana"
    },
    {
        text: "Tutto è uno.",
        author: "Eraclito",
        source: "Frammento B50, formulazione sintetica"
    },
    {
        text: "L'essere è, il non essere non è.",
        author: "Parmenide",
        source: "Poema, frammento B6, formulazione sintetica"
    },
    {
        text: "Pensare ed essere sono la stessa cosa.",
        author: "Parmenide",
        source: "Poema, frammento B3, traduzione italiana"
    },
    {
        text: "Nulla nasce dal nulla.",
        author: "Parmenide",
        source: "Poema, frammento B8, formulazione sintetica"
    },

    // =====================================================
    // SOCRATE, PLATONE E ARISTOTELE
    // =====================================================

    {
        text: "Una vita senza ricerca non è degna di essere vissuta.",
        author: "Socrate",
        source: "Platone, Apologia di Socrate, 38a, traduzione italiana"
    },
    {
        text: "So di non essere sapiente.",
        author: "Socrate",
        source: "Platone, Apologia di Socrate, 21b–d, formulazione sintetica"
    },
    {
        text: "È peggio commettere ingiustizia che subirla.",
        author: "Socrate",
        source: "Platone, Gorgia, 469b–c, formulazione sintetica"
    },
    {
        text: "La meraviglia è l'inizio della filosofia.",
        author: "Platone",
        source: "Teeteto, 155d, traduzione italiana"
    },
    {
        text: "Conoscere è ricordare.",
        author: "Platone",
        source: "Menone, 81c–d, formulazione sintetica della dottrina della reminiscenza"
    },
    {
        text: "Il tempo è l'immagine mobile dell'eternità.",
        author: "Platone",
        source: "Timeo, 37d, traduzione italiana"
    },
    {
        text: "Il corpo è la tomba dell'anima.",
        author: "Platone",
        source: "Cratilo, 400c, traduzione italiana"
    },
    {
        text: "Il bene è ciò che ogni anima persegue.",
        author: "Platone",
        source: "Repubblica, VI, formulazione sintetica"
    },
    {
        text: "L'uomo è per natura un animale politico.",
        author: "Aristotele",
        source: "Politica, I, 1253a, traduzione italiana"
    },
    {
        text: "La felicità è il fine ultimo della vita umana.",
        author: "Aristotele",
        source: "Etica Nicomachea, I, 1097b, formulazione sintetica"
    },
    {
        text: "La virtù è una disposizione a scegliere il giusto mezzo.",
        author: "Aristotele",
        source: "Etica Nicomachea, II, 1106b, formulazione sintetica"
    },
    {
        text: "La conoscenza comincia dalla meraviglia.",
        author: "Aristotele",
        source: "Metafisica, I, 982b, formulazione sintetica"
    },
    {
        text: "L'anima è in qualche modo tutte le cose.",
        author: "Aristotele",
        source: "De anima, III, 431b, traduzione italiana"
    },
    {
        text: "Tutti gli uomini aspirano per natura al sapere.",
        author: "Aristotele",
        source: "Metafisica, I, 980a, traduzione italiana"
    },

    // =====================================================
    // ELLENISMO E STOICISMO
    // =====================================================

    {
        text: "La morte non è nulla per noi.",
        author: "Epicuro",
        source: "Lettera a Meneceo, 124–127, traduzione italiana"
    },
    {
        text: "Non si può vivere felicemente senza vivere saggiamente, bene e giustamente.",
        author: "Epicuro",
        source: "Massime capitali, V, traduzione italiana"
    },
    {
        text: "Di tutte le cose, la più grande è l'amicizia.",
        author: "Epicuro",
        source: "Sentenze vaticane, 23, traduzione italiana"
    },
    {
        text: "Alcune cose dipendono da noi, altre non dipendono da noi.",
        author: "Epitteto",
        source: "Manuale, 1, traduzione italiana"
    },
    {
        text: "Non sono le cose a turbare gli uomini, ma i giudizi che essi formulano sulle cose.",
        author: "Epitteto",
        source: "Manuale, 5, formulazione sintetica"
    },
    {
        text: "Sostieni e astieniti.",
        author: "Epitteto",
        source: "Manuale, 8, formulazione tradizionale italiana"
    },
    {
        text: "Nessuno è libero se non è padrone di se stesso.",
        author: "Epitteto",
        source: "Discorsi, formulazione sintetica"
    },
    {
        text: "Ciò che non giova all'alveare non giova neppure all'ape.",
        author: "Marco Aurelio",
        source: "Meditazioni, VI, traduzione italiana"
    },
    {
        text: "La miglior vendetta è non essere come chi ha commesso l'ingiustizia.",
        author: "Marco Aurelio",
        source: "Meditazioni, VI, formulazione sintetica"
    },
    {
        text: "Non è libero chi è schiavo delle proprie passioni.",
        author: "Seneca",
        source: "Lettere a Lucilio, formulazione sintetica"
    },
    {
        text: "Non osiamo molte cose perché sono difficili; sono difficili perché non osiamo.",
        author: "Seneca",
        source: "Lettere a Lucilio, 104, traduzione italiana"
    },
    {
        text: "La vita è lunga abbastanza, se la si sa usare.",
        author: "Seneca",
        source: "La brevità della vita, I, formulazione sintetica"
    },

    // =====================================================
    // TARDA ANTICHITÀ E MEDIOEVO
    // =====================================================

    {
        text: "Il nostro cuore è inquieto finché non riposa in te.",
        author: "Agostino d'Ippona",
        source: "Confessioni, I, 1, traduzione italiana"
    },
    {
        text: "Ama e fa' ciò che vuoi.",
        author: "Agostino d'Ippona",
        source: "Commento alla Prima Lettera di Giovanni, VII, 8, formulazione italiana tradizionale"
    },
    {
        text: "La verità abita nell'uomo interiore.",
        author: "Agostino d'Ippona",
        source: "La vera religione, 39, 72, formulazione sintetica"
    },
    {
        text: "Comprendi per credere, credi per comprendere.",
        author: "Agostino d'Ippona",
        source: "Sermone 43, 9, formulazione tradizionale"
    },
    {
        text: "Credo per comprendere.",
        author: "Anselmo d'Aosta",
        source: "Proslogion, I, formulazione tradizionale"
    },
    {
        text: "La grazia non distrugge la natura, ma la perfeziona.",
        author: "Tommaso d'Aquino",
        source: "Summa Theologiae, I, q. 1, a. 8, formulazione sintetica"
    },
    {
        text: "La verità è l'adeguazione dell'intelletto e della cosa.",
        author: "Tommaso d'Aquino",
        source: "De veritate, q. 1, a. 1, formulazione italiana tradizionale"
    },
    {
        text: "È meglio illuminare che brillare soltanto.",
        author: "Tommaso d'Aquino",
        source: "Summa Theologiae, II-II, q. 188, a. 6, traduzione italiana"
    },
    {
        text: "L'essere e l'essenza sono distinti nelle creature.",
        author: "Tommaso d'Aquino",
        source: "De ente et essentia, IV, formulazione sintetica"
    },
    {
        text: "Le entità non devono essere moltiplicate oltre necessità.",
        author: "Guglielmo di Ockham",
        source: "Principio tradizionalmente associato al rasoio di Ockham, formulazione sintetica"
    },

    // =====================================================
    // UMANESIMO E RINASCIMENTO
    // =====================================================

    {
        text: "Gli uomini giudicano più dagli occhi che dalle mani.",
        author: "Niccolò Machiavelli",
        source: "Il Principe, XVIII, traduzione italiana"
    },
    {
        text: "La fortuna è arbitra della metà delle nostre azioni.",
        author: "Niccolò Machiavelli",
        source: "Il Principe, XXV, traduzione italiana"
    },
    {
        text: "Che cosa so?",
        author: "Michel de Montaigne",
        source: "Saggi, II, 12, formulazione tradizionale"
    },
    {
        text: "La filosofia è imparare a morire.",
        author: "Michel de Montaigne",
        source: "Saggi, I, 20, formulazione sintetica"
    },

    // =====================================================
    // RAZIONALISMO
    // =====================================================

    {
        text: "Penso, dunque sono.",
        author: "René Descartes",
        source: "Discorso sul metodo, IV, formulazione italiana tradizionale"
    },
    {
        text: "Non basta avere una buona mente; l'importante è usarla bene.",
        author: "René Descartes",
        source: "Discorso sul metodo, I, formulazione sintetica"
    },
    {
        text: "Dividere ciascuna delle difficoltà che esaminavo in tante parti quante fosse possibile.",
        author: "René Descartes",
        source: "Discorso sul metodo, II, traduzione italiana"
    },
    {
        text: "Il cuore ha le sue ragioni che la ragione non conosce.",
        author: "Blaise Pascal",
        source: "Pensieri, fr. 423, traduzione italiana tradizionale"
    },
    {
        text: "L'uomo supera infinitamente l'uomo.",
        author: "Blaise Pascal",
        source: "Pensieri, fr. 434, traduzione italiana"
    },
    {
        text: "Tutta l'infelicità degli uomini deriva dal non saper restare tranquilli in una stanza.",
        author: "Blaise Pascal",
        source: "Pensieri, fr. 139, traduzione italiana"
    },
    {
        text: "Deus sive Natura.",
        author: "Baruch Spinoza",
        source: "Etica, IV, Prefazione"
    },
    {
        text: "Non piangere, non ridere, non detestare, ma comprendere.",
        author: "Baruch Spinoza",
        source: "Trattato politico, I, 4, traduzione italiana"
    },
    {
        text: "L'uomo libero pensa meno di ogni altra cosa alla morte.",
        author: "Baruch Spinoza",
        source: "Etica, IV, prop. 67, traduzione italiana"
    },

    // =====================================================
    // ILLUMINISMO
    // =====================================================

    {
        text: "Abbi il coraggio di servirti della tua propria ragione.",
        author: "Immanuel Kant",
        source: "Risposta alla domanda: che cos'è l'Illuminismo?, traduzione italiana"
    },
    {
        text: "Il cielo stellato sopra di me e la legge morale dentro di me.",
        author: "Immanuel Kant",
        source: "Critica della ragion pratica, conclusione, traduzione italiana"
    },
    {
        text: "Agisci in modo da trattare l'umanità sempre come fine e mai semplicemente come mezzo.",
        author: "Immanuel Kant",
        source: "Fondazione della metafisica dei costumi, II, traduzione italiana"
    },
    {
        text: "I pensieri senza contenuto sono vuoti; le intuizioni senza concetti sono cieche.",
        author: "Immanuel Kant",
        source: "Critica della ragion pura, A51/B75, traduzione italiana"
    },
    {
        text: "La ragione umana ha il particolare destino di essere assillata da questioni che non può evitare.",
        author: "Immanuel Kant",
        source: "Critica della ragion pura, Prefazione alla prima edizione, traduzione italiana"
    },
    {
        text: "La ragione è e deve essere schiava delle passioni.",
        author: "David Hume",
        source: "Trattato sulla natura umana, II, 3, 3, traduzione italiana"
    },
    {
        text: "L'abitudine è la grande guida della vita umana.",
        author: "David Hume",
        source: "Ricerca sull'intelletto umano, V, traduzione italiana"
    },
    {
        text: "L'uomo nasce libero, ma ovunque è in catene.",
        author: "Jean-Jacques Rousseau",
        source: "Il contratto sociale, I, 1, traduzione italiana"
    },
    {
        text: "La libertà è obbedire alla legge che ci siamo prescritti.",
        author: "Jean-Jacques Rousseau",
        source: "Il contratto sociale, I, 8, formulazione sintetica"
    },

    // =====================================================
    // IDEALISMO E OTTOCENTO
    // =====================================================

    {
        text: "La verità è l'intero.",
        author: "Georg Wilhelm Friedrich Hegel",
        source: "Fenomenologia dello spirito, Prefazione, traduzione italiana"
    },
    {
        text: "La filosofia è la sua epoca colta nel pensiero.",
        author: "Georg Wilhelm Friedrich Hegel",
        source: "Lineamenti di filosofia del diritto, Prefazione, traduzione italiana"
    },
    {
        text: "La storia del mondo è il tribunale del mondo.",
        author: "Georg Wilhelm Friedrich Hegel",
        source: "Lineamenti di filosofia del diritto, Prefazione, traduzione italiana"
    },
    {
        text: "La vita deve essere compresa all'indietro, ma vissuta in avanti.",
        author: "Søren Kierkegaard",
        source: "Diari, 1843, traduzione italiana"
    },
    {
        text: "L'angoscia è la vertigine della libertà.",
        author: "Søren Kierkegaard",
        source: "Il concetto dell'angoscia, traduzione italiana"
    },
    {
        text: "La soggettività è la verità.",
        author: "Søren Kierkegaard",
        source: "Postilla conclusiva non scientifica, formulazione sintetica"
    },
    {
        text: "Il mondo è la mia rappresentazione.",
        author: "Arthur Schopenhauer",
        source: "Il mondo come volontà e rappresentazione, I, §1, traduzione italiana"
    },
    {
        text: "La vita oscilla come un pendolo tra il dolore e la noia.",
        author: "Arthur Schopenhauer",
        source: "Il mondo come volontà e rappresentazione, IV, §57, formulazione sintetica"
    },
    {
        text: "La compassione è la base di ogni moralità.",
        author: "Arthur Schopenhauer",
        source: "Sul fondamento della morale, formulazione sintetica"
    },
    {
        text: "Il sonno della ragione genera mostri.",
        author: "Francisco Goya",
        source: "Los Caprichos, n. 43, traduzione italiana tradizionale"
    },

    // =====================================================
    // NIETZSCHE
    // =====================================================

    {
        text: "Dio è morto.",
        author: "Friedrich Nietzsche",
        source: "La gaia scienza, §125, traduzione italiana"
    },
    {
        text: "Diventa ciò che sei.",
        author: "Friedrich Nietzsche",
        source: "La gaia scienza, §270, traduzione italiana"
    },
    {
        text: "Ciò che non mi uccide mi rende più forte.",
        author: "Friedrich Nietzsche",
        source: "Il crepuscolo degli idoli, Massime e frecce, §8, traduzione italiana"
    },
    {
        text: "Bisogna avere ancora il caos dentro di sé per partorire una stella danzante.",
        author: "Friedrich Nietzsche",
        source: "Così parlò Zarathustra, Prologo, traduzione italiana"
    },
    {
        text: "Senza musica la vita sarebbe un errore.",
        author: "Friedrich Nietzsche",
        source: "Il crepuscolo degli idoli, Massime e frecce, §33, traduzione italiana"
    },
    {
        text: "L'uomo è qualcosa che deve essere superato.",
        author: "Friedrich Nietzsche",
        source: "Così parlò Zarathustra, Prologo, traduzione italiana"
    },
    {
        text: "Non ci sono fatti, ma solo interpretazioni.",
        author: "Friedrich Nietzsche",
        source: "Frammenti postumi, 1886–1887, formulazione tradizionale"
    },
    {
        text: "Chi ha un perché per vivere può sopportare quasi ogni come.",
        author: "Friedrich Nietzsche",
        source: "Il crepuscolo degli idoli, Massime e frecce, §12, traduzione italiana"
    },

    // =====================================================
    // NOVECENTO
    // =====================================================

    {
        text: "Il limite del mio linguaggio significa il limite del mio mondo.",
        author: "Ludwig Wittgenstein",
        source: "Tractatus logico-philosophicus, 5.6, traduzione italiana"
    },
    {
        text: "Di ciò di cui non si può parlare, si deve tacere.",
        author: "Ludwig Wittgenstein",
        source: "Tractatus logico-philosophicus, 7, traduzione italiana"
    },
    {
        text: "Il significato di una parola è il suo uso nel linguaggio.",
        author: "Ludwig Wittgenstein",
        source: "Ricerche filosofiche, §43, formulazione sintetica"
    },
    {
        text: "La filosofia è una lotta contro l'incantamento della nostra intelligenza mediante il linguaggio.",
        author: "Ludwig Wittgenstein",
        source: "Ricerche filosofiche, §109, traduzione italiana"
    },
    {
        text: "L'esistenza precede l'essenza.",
        author: "Jean-Paul Sartre",
        source: "L'esistenzialismo è un umanismo, traduzione italiana"
    },
    {
        text: "L'inferno sono gli altri.",
        author: "Jean-Paul Sartre",
        source: "A porte chiuse, traduzione italiana"
    },
    {
        text: "L'uomo è condannato a essere libero.",
        author: "Jean-Paul Sartre",
        source: "L'essere e il nulla, traduzione italiana"
    },
    {
        text: "Bisogna immaginare Sisifo felice.",
        author: "Albert Camus",
        source: "Il mito di Sisifo, conclusione, traduzione italiana"
    },
    {
        text: "L'assurdo nasce dal confronto tra il bisogno umano e il silenzio irragionevole del mondo.",
        author: "Albert Camus",
        source: "Il mito di Sisifo, formulazione sintetica"
    },
    {
        text: "Nel mezzo dell'inverno ho scoperto che c'era in me un'invincibile estate.",
        author: "Albert Camus",
        source: "Ritorno a Tipasa, traduzione italiana"
    }
];

    let currentQuote = 0;
    const DURATION = 8000;   // millisecondi tra una frase e l'altra
    const FADE     = 800;    // durata dissolvenza (deve combaciare col CSS)

    function showQuote(index) {
        const q = quotes[index];

        quoteText.textContent   = q.text;
        quoteAuthor.textContent = "— " + q.author;

        /* -------------------------------------------------
           Fonte della citazione
           ------------------------------------------------- */
        if (quoteSource && quoteInfo) {
            if (q.source) {
                quoteSource.textContent = q.source;
                quoteSource.classList.remove("visible");

                quoteInfo.hidden = false;
                quoteInfo.setAttribute("aria-expanded", "false");
                quoteSource.setAttribute("aria-hidden", "true");
            } else {
                quoteSource.textContent = "";
                quoteSource.classList.remove("visible");

                quoteInfo.hidden = true;
                quoteInfo.setAttribute("aria-expanded", "false");
                quoteSource.setAttribute("aria-hidden", "true");
            }
        }
    }

    /* -----------------------------------------------------
       Mostra / nasconde la fonte
       ----------------------------------------------------- */
    if (quoteInfo && quoteSource) {
        quoteInfo.addEventListener("click", function () {
            const isVisible = quoteSource.classList.toggle("visible");

            quoteInfo.setAttribute(
                "aria-expanded",
                isVisible ? "true" : "false"
            );

            quoteSource.setAttribute(
                "aria-hidden",
                isVisible ? "false" : "true"
            );
        });
    }

    function nextQuote() {
        // 1) dissolvi
        quoteBlock.classList.add("fade-out");

        // 2) cambia testo a metà della dissolvenza
        setTimeout(function () {
            currentQuote = (currentQuote + 1) % quotes.length;
            showQuote(currentQuote);
            quoteBlock.classList.remove("fade-out");
        }, FADE);

        // 3) programma la prossima rotazione
        setTimeout(nextQuote, DURATION + FADE);
    }

    // Mostra la prima frase senza dissolvenza
    showQuote(0);

    // Avvia il ciclo (rispetta prefers-reduced-motion)
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!reducedMotion && quotes.length > 1) {
        setTimeout(nextQuote, DURATION);
    }
}
