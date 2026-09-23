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

if (quoteText && quoteAuthor && quoteBlock) {
    const quotes = [
    {
        text: "Conosci te stesso.",
        author: "Iscrizione del tempio di Delfi"
    },
    {
        text: "L'uomo è misura di tutte le cose.",
        author: "Protagora"
    },
    {
        text: "La natura ama nascondersi.",
        author: "Eraclito"
    },
    {
        text: "Tutto scorre.",
        author: "Eraclito"
    },
    {
        text: "Il logos è comune a tutti.",
        author: "Eraclito"
    },
    {
        text: "Non è possibile entrare due volte nello stesso fiume.",
        author: "Eraclito"
    },
    {
        text: "L'essere è, il non essere non è.",
        author: "Parmenide"
    },
    {
        text: "Pensare ed essere sono la stessa cosa.",
        author: "Parmenide"
    },
    {
        text: "La guerra è padre di tutte le cose.",
        author: "Eraclito"
    },
    {
        text: "Nulla nasce dal nulla.",
        author: "Parmenide"
    },

    {
        text: "Una vita senza ricerca non è degna di essere vissuta.",
        author: "Socrate"
    },
    {
        text: "So di non sapere.",
        author: "Socrate"
    },
    {
        text: "È peggio commettere ingiustizia che subirla.",
        author: "Socrate"
    },
    {
        text: "La meraviglia è l'inizio della filosofia.",
        author: "Platone"
    },
    {
        text: "Il tempo è l'immagine mobile dell'eternità.",
        author: "Platone"
    },
    {
        text: "L'ignoranza è la radice e il fusto di ogni male.",
        author: "Platone"
    },
    {
        text: "Il corpo è la prigione dell'anima.",
        author: "Platone"
    },
    {
        text: "Conoscere è ricordare.",
        author: "Platone"
    },
    {
        text: "Il bene è ciò che ogni anima persegue.",
        author: "Platone"
    },
    {
        text: "L'uomo è per natura un animale politico.",
        author: "Aristotele"
    },

    {
        text: "La felicità è il fine ultimo della vita.",
        author: "Aristotele"
    },
    {
        text: "La virtù sta nel mezzo.",
        author: "Aristotele"
    },
    {
        text: "L'anima è in qualche modo tutte le cose.",
        author: "Aristotele"
    },
    {
        text: "Il tutto è maggiore della somma delle sue parti.",
        author: "Aristotele"
    },
    {
        text: "La conoscenza comincia dalla meraviglia.",
        author: "Aristotele"
    },
    {
        text: "La speranza è un sogno a occhi aperti.",
        author: "Aristotele"
    },
    {
        text: "La filosofia nasce dalla meraviglia.",
        author: "Aristotele"
    },
    {
        text: "La morte non è nulla per noi.",
        author: "Epicuro"
    },
    {
        text: "Non si può vivere felicemente senza vivere saggiamente.",
        author: "Epicuro"
    },
    {
        text: "Vana è la parola del filosofo che non cura alcuna sofferenza umana.",
        author: "Epicuro"
    },

    {
        text: "Non sono le cose a turbare gli uomini, ma i giudizi che essi formulano sulle cose.",
        author: "Epitteto"
    },
    {
        text: "Nessuno è libero se non è padrone di se stesso.",
        author: "Epitteto"
    },
    {
        text: "Sostieni e astieniti.",
        author: "Epitteto"
    },
    {
        text: "Hai potere sulla tua mente, non sugli eventi esterni.",
        author: "Marco Aurelio"
    },
    {
        text: "La felicità della tua vita dipende dalla qualità dei tuoi pensieri.",
        author: "Marco Aurelio"
    },
    {
        text: "Ciò che non giova all'alveare non giova neppure all'ape.",
        author: "Marco Aurelio"
    },
    {
        text: "Non è libero chi è schiavo delle proprie passioni.",
        author: "Seneca"
    },
    {
        text: "Non osiamo molte cose perché sono difficili; sono difficili perché non osiamo.",
        author: "Seneca"
    },
    {
        text: "La vita è lunga abbastanza, se la si sa usare.",
        author: "Seneca"
    },
    {
        text: "La fortuna non esiste: esiste il momento in cui il talento incontra l'occasione.",
        author: "Seneca"
    },

    {
        text: "Credo per comprendere.",
        author: "Anselmo d'Aosta"
    },
    {
        text: "Comprendi per credere.",
        author: "Agostino d'Ippona"
    },
    {
        text: "Il nostro cuore è inquieto finché non riposa in te.",
        author: "Agostino d'Ippona"
    },
    {
        text: "Ama e fa' ciò che vuoi.",
        author: "Agostino d'Ippona"
    },
    {
        text: "La verità abita nell'uomo interiore.",
        author: "Agostino d'Ippona"
    },
    {
        text: "La ragione è una luce naturale.",
        author: "Tommaso d'Aquino"
    },
    {
        text: "Temere Dio è l'inizio della sapienza.",
        author: "Tommaso d'Aquino"
    },
    {
        text: "La grazia non distrugge la natura, ma la perfeziona.",
        author: "Tommaso d'Aquino"
    },
    {
        text: "La verità è l'adeguazione dell'intelletto e della cosa.",
        author: "Tommaso d'Aquino"
    },
    {
        text: "La filosofia è ancella della teologia.",
        author: "Tradizione scolastica"
    },

    {
        text: "La filosofia è imparare a morire.",
        author: "Michel de Montaigne"
    },
    {
        text: "Che cosa so?",
        author: "Michel de Montaigne"
    },
    {
        text: "Il sapere è potere.",
        author: "Francis Bacon"
    },
    {
        text: "La conoscenza stessa è potere.",
        author: "Francis Bacon"
    },
    {
        text: "Penso, dunque sono.",
        author: "René Descartes"
    },
    {
        text: "Il dubbio è l'inizio della saggezza.",
        author: "René Descartes"
    },
    {
        text: "Non basta avere una buona mente; l'importante è usarla bene.",
        author: "René Descartes"
    },
    {
        text: "L'uomo è condannato a essere libero.",
        author: "Jean-Paul Sartre"
    },
    {
        text: "L'inferno sono gli altri.",
        author: "Jean-Paul Sartre"
    },
    {
        text: "L'esistenza precede l'essenza.",
        author: "Jean-Paul Sartre"
    },

    {
        text: "Il cuore ha le sue ragioni che la ragione non conosce.",
        author: "Blaise Pascal"
    },
    {
        text: "L'uomo supera infinitamente l'uomo.",
        author: "Blaise Pascal"
    },
    {
        text: "Tutta l'infelicità degli uomini deriva dal non saper restare tranquilli in una stanza.",
        author: "Blaise Pascal"
    },
    {
        text: "L'uomo nasce libero, ma ovunque è in catene.",
        author: "Jean-Jacques Rousseau"
    },
    {
        text: "L'uomo è buono per natura.",
        author: "Jean-Jacques Rousseau"
    },
    {
        text: "Abbi il coraggio di servirti della tua propria ragione.",
        author: "Immanuel Kant"
    },
    {
        text: "Il cielo stellato sopra di me e la legge morale dentro di me.",
        author: "Immanuel Kant"
    },
    {
        text: "Agisci in modo da trattare l'umanità sempre come fine e mai semplicemente come mezzo.",
        author: "Immanuel Kant"
    },
    {
        text: "La libertà è l'indipendenza dall'arbitrio coercitivo di un altro.",
        author: "Immanuel Kant"
    },
    {
        text: "Sapere aude!",
        author: "Immanuel Kant"
    },

    {
        text: "La ragione è e deve essere schiava delle passioni.",
        author: "David Hume"
    },
    {
        text: "Le belle cose sono difficili.",
        author: "David Hume"
    },
    {
        text: "L'abitudine è la grande guida della vita umana.",
        author: "David Hume"
    },
    {
        text: "L'uomo è nato libero.",
        author: "Jean-Jacques Rousseau"
    },
    {
        text: "L'uomo è ciò che legge.",
        author: "Joseph de Maistre"
    },
    {
        text: "Il sonno della ragione genera mostri.",
        author: "Francisco Goya"
    },
    {
        text: "La storia del mondo è il tribunale del mondo.",
        author: "Georg Wilhelm Friedrich Hegel"
    },
    {
        text: "Ciò che è razionale è reale; e ciò che è reale è razionale.",
        author: "Georg Wilhelm Friedrich Hegel"
    },
    {
        text: "La verità è l'intero.",
        author: "Georg Wilhelm Friedrich Hegel"
    },
    {
        text: "La storia universale è il progresso nella coscienza della libertà.",
        author: "Georg Wilhelm Friedrich Hegel"
    },

    {
        text: "La vita deve essere compresa all'indietro, ma vissuta in avanti.",
        author: "Søren Kierkegaard"
    },
    {
        text: "L'angoscia è la vertigine della libertà.",
        author: "Søren Kierkegaard"
    },
    {
        text: "La vita non è un problema da risolvere, ma una realtà da vivere.",
        author: "Søren Kierkegaard"
    },
    {
        text: "Dio è morto.",
        author: "Friedrich Nietzsche"
    },
    {
        text: "Diventa ciò che sei.",
        author: "Friedrich Nietzsche"
    },
    {
        text: "Ciò che non mi uccide mi rende più forte.",
        author: "Friedrich Nietzsche"
    },
    {
        text: "Chi ha un perché per vivere può sopportare quasi ogni come.",
        author: "Friedrich Nietzsche"
    },
    {
        text: "Bisogna avere ancora il caos dentro di sé per partorire una stella danzante.",
        author: "Friedrich Nietzsche"
    },
    {
        text: "L'uomo è qualcosa che deve essere superato.",
        author: "Friedrich Nietzsche"
    },
    {
        text: "Senza musica la vita sarebbe un errore.",
        author: "Friedrich Nietzsche"
    },

    {
        text: "Il limite del mio linguaggio significa il limite del mio mondo.",
        author: "Ludwig Wittgenstein"
    },
    {
        text: "Di ciò di cui non si può parlare, si deve tacere.",
        author: "Ludwig Wittgenstein"
    },
    {
        text: "Il significato di una parola è il suo uso nel linguaggio.",
        author: "Ludwig Wittgenstein"
    },
    {
        text: "La filosofia è una lotta contro l'incantamento della nostra intelligenza mediante il linguaggio.",
        author: "Ludwig Wittgenstein"
    },
    {
        text: "L'assurdo nasce dal confronto tra il bisogno umano e il silenzio irragionevole del mondo.",
        author: "Albert Camus"
    },
    {
        text: "Bisogna immaginare Sisifo felice.",
        author: "Albert Camus"
    },
    {
        text: "Nel mezzo dell'inverno ho scoperto che c'era in me un'invincibile estate.",
        author: "Albert Camus"
    },
    {
        text: "L'uomo è l'unico essere che rifiuta di essere ciò che è.",
        author: "Albert Camus"
    },
    {
        text: "L'uomo è destinato a essere libero.",
        author: "Jean-Paul Sartre"
    },
    {
        text: "La filosofia è la sua epoca colta nel pensiero.",
        author: "Georg Wilhelm Friedrich Hegel"
    }
];

    let currentQuote = 0;
    const DURATION = 8000;   // millisecondi tra una frase e l'altra
    const FADE     = 800;    // durata dissolvenza (deve combaciare col CSS)

    function showQuote(index) {
        const q = quotes[index];
        quoteText.textContent   = q.text;
        quoteAuthor.textContent = "— " + q.author;
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
