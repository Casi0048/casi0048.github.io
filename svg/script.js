
<!-- ============================================================
     JAVASCRIPT
     ============================================================ -->

const translations = {
    /* ============================================================
       🇮🇹 ITALIANO
       ============================================================ */
    it: {
        heroKicker: "Filosofia · Pensiero · Cultura",
        heroLead: "Un viaggio attraverso le domande che l'uomo continua a porre a se stesso, al mondo e alla verità.",
        philosophyTitle: "Il pensiero attraverso i secoli",
        philosophyIntro: "Sei percorsi. Una lunga conversazione dell'umanità con se stessa.",
        ancientTitle: "Filosofia antica",
        ancientText: "Dalle prime domande sulla natura del cosmo alla nascita della filosofia greca.",
        classicalTitle: "Filosofia classica",
        classicalText: "Socrate, Platone, Aristotele e le grandi scuole che hanno formato il pensiero occidentale.",
        medievalTitle: "Filosofia medievale",
        medievalText: "Fede, ragione, metafisica e incontro tra tradizioni cristiane, islamiche ed ebraiche.",
        modernTitle: "Filosofia moderna",
        modernText: "Dalla rivoluzione scientifica all'Illuminismo, dal razionalismo all'idealismo.",
        contemporaryTitle: "Filosofia contemporanea",
        contemporaryText: "Linguaggio, esistenza, scienza, società e le nuove forme del pensiero filosofico.",
        polishTitle: "Filosofia polacca",
        polishText: "Una tradizione originale tra romanticismo, logica, fenomenologia e pensiero contemporaneo.",
        explore: "Esplora →",
        schoolsTitle: "✦ Scuole e tradizioni",
        schoolsIntro: "Sei percorsi del pensiero che hanno attraversato epoche e culture diverse.",
        cynicismTitle: "Cinismo",
        cynicismText: "Libertà radicale e vita secondo natura.",
        epicureanismTitle: "Epicureismo",
        epicureanismText: "Il piacere come assenza di dolore.",
        stoicismTitle: "Stoicismo",
        stoicismText: "Virtù, destino e padronanza di sé.",
        platonismTitle: "Platonismo",
        platonismText: "Il mondo delle Idee e il Bene.",
        skepticismTitle: "Scetticismo",
        skepticismText: "Sospensione del giudizio per serenità.",
        indianTitle: "Filosofia indiana",
        indianText: "Veda, Upanishad, Buddha e scuole.",
        orientarsi: "Orientarsi",
        conceptMapTitle: "Mappa concettuale",
        conceptMapText: "Idee, scuole e filosofi collegati in una rete di pensiero.",
        throughCenturies: "Attraversare i secoli",
        timelineTitle: "Linea del tempo",
        timelineText: "Un percorso cronologico attraverso la storia della filosofia.",
        newsletterTitle: "Filosofia in posta",
        newsletterIntro: "Pensieri, articoli e percorsi filosofici occasionalmente nella tua casella di posta.",
        newsletterButton: "📧 Filosofia in posta",
        footerAbout: "Un luogo dedicato alla filosofia, al pensiero e alle domande che attraversano i secoli.",
        footerNavigation: "Navigazione",
        footerInformation: "Informazioni",
        navIncipit: "Incipit",
        navPhilosophy: "Filosofia",
        navArticles: "Articoli",
        navContacts: "Contatti",
        navPrivacy: "Privacy Policy",
        navLegal: "Note legali",
        navCredits: "Crediti e Copyright",
        musicLabel: "MUSICA PER LO STUDIO",
        musicPaused: "In pausa",
        visioniLabel: "VISIONI",
        visioniTitle: "Una finestra sul pensiero",
        closeVideo: "Chiudi video",
        visioniVideoTitle: "Schopenhauer e Nietzsche — Hans Georg Gadamer",
        visioniNote: "Visioni — immagini, parole e pensiero."
    },

    /* ============================================================
       🇵🇱 POLSKI
       ============================================================ */
    pl: {
        heroKicker: "Filozofia · Myśl · Kultura",
        heroLead: "Podróż przez pytania, które człowiek nieustannie zadaje sobie, światu i prawdzie.",
        philosophyTitle: "Myśl poprzez wieki",
        philosophyIntro: "Sześć ścieżek. Długa rozmowa ludzkości z samą sobą.",
        ancientTitle: "Filozofia starożytna",
        ancientText: "Od pierwszych pytań o naturę kosmosu do narodzin filozofii greckiej.",
        classicalTitle: "Filozofia klasyczna",
        classicalText: "Sokrates, Platon, Arystoteles i wielkie szkoły, które ukształtowały myśl Zachodu.",
        medievalTitle: "Filozofia średniowieczna",
        medievalText: "Wiara, rozum, metafizyka i spotkanie tradycji chrześcijańskiej, islamskiej i żydowskiej.",
        modernTitle: "Filozofia nowożytna",
        modernText: "Od rewolucji naukowej do oświecenia, od racjonalizmu do idealizmu.",
        contemporaryTitle: "Filozofia współczesna",
        contemporaryText: "Język, egzystencja, nauka, społeczeństwo i nowe formy myśli filozoficznej.",
        polishTitle: "Filozofia polska",
        polishText: "Oryginalna tradycja łącząca romantyzm, logikę, fenomenologię i myśl współczesną.",
        explore: "Odkryj →",
        schoolsTitle: "✦ Szkoły i tradycje",
        schoolsIntro: "Sześć ścieżek myśli, które przemierzały różne epoki i kultury.",
        cynicismTitle: "Cynizm",
        cynicismText: "Radykalna wolność i życie zgodne z naturą.",
        epicureanismTitle: "Epikureizm",
        epicureanismText: "Przyjemność jako brak cierpienia.",
        stoicismTitle: "Stoicyzm",
        stoicismText: "Cnota, los i panowanie nad sobą.",
        platonismTitle: "Platonizm",
        platonismText: "Świat Idei i Dobro.",
        skepticismTitle: "Sceptycyzm",
        skepticismText: "Zawieszenie sądu dla osiągnięcia spokoju.",
        indianTitle: "Filozofia indyjska",
        indianText: "Wedy, Upaniszady, Budda i szkoły.",
        orientarsi: "Orientacja",
        conceptMapTitle: "Mapa pojęciowa",
        conceptMapText: "Idee, szkoły i filozofowie połączeni w sieć myśli.",
        throughCenturies: "Przez wieki",
        timelineTitle: "Oś czasu",
        timelineText: "Chronologiczna podróż przez historię filozofii.",
        newsletterTitle: "Filozofia w skrzynce",
        newsletterIntro: "Myśli, artykuły i ścieżki filozoficzne od czasu do czasu w Twojej skrzynce.",
        newsletterButton: "📧 Filozofia w skrzynce",
        footerAbout: "Miejsce poświęcone filozofii, myśli i pytaniom, które przemierzają wieki.",
        footerNavigation: "Nawigacja",
        footerInformation: "Informacje",
        navIncipit: "Incipit",
        navPhilosophy: "Filozofia",
        navArticles: "Artykuły",
        navContacts: "Kontakt",
        navPrivacy: "Polityka prywatności",
        navLegal: "Informacje prawne",
        navCredits: "Autorzy i prawa autorskie",
        musicLabel: "MUZYKA DO NAUKI",
        musicPaused: "Wstrzymano",
        visioniLabel: "WIZJE",
        visioniTitle: "Okno na myśl",
        closeVideo: "Zamknij wideo",
        visioniVideoTitle: "Schopenhauer i Nietzsche — Hans Georg Gadamer",
        visioniNote: "Wizje — obrazy, słowa i myśl."
    },

    /* ============================================================
       🇬🇧 ENGLISH
       ============================================================ */
    en: {
        heroKicker: "Philosophy · Thought · Culture",
        heroLead: "A journey through the questions that humanity continues to ask itself, the world and the truth.",
        philosophyTitle: "Thought through the Ages",
        philosophyIntro: "Six paths. A long conversation of humanity with itself.",
        ancientTitle: "Ancient Philosophy",
        ancientText: "From the first questions about the nature of the cosmos to the birth of Greek philosophy.",
        classicalTitle: "Classical Philosophy",
        classicalText: "Socrates, Plato, Aristotle and the great schools that shaped Western thought.",
        medievalTitle: "Medieval Philosophy",
        medievalText: "Faith, reason, metaphysics and the encounter of Christian, Islamic and Jewish traditions.",
        modernTitle: "Modern Philosophy",
        modernText: "From the Scientific Revolution to the Enlightenment, from rationalism to idealism.",
        contemporaryTitle: "Contemporary Philosophy",
        contemporaryText: "Language, existence, science, society and new forms of philosophical thought.",
        polishTitle: "Polish Philosophy",
        polishText: "An original tradition spanning Romanticism, logic, phenomenology and contemporary thought.",
        explore: "Explore →",
        schoolsTitle: "✦ Schools and Traditions",
        schoolsIntro: "Six paths of thought that have crossed different eras and cultures.",
        cynicismTitle: "Cynicism",
        cynicismText: "Radical freedom and life according to nature.",
        epicureanismTitle: "Epicureanism",
        epicureanismText: "Pleasure as the absence of pain.",
        stoicismTitle: "Stoicism",
        stoicismText: "Virtue, fate and self-mastery.",
        platonismTitle: "Platonism",
        platonismText: "The world of Ideas and the Good.",
        skepticismTitle: "Skepticism",
        skepticismText: "Suspension of judgment for serenity.",
        indianTitle: "Indian Philosophy",
        indianText: "Vedas, Upanishads, Buddha and schools.",
        orientarsi: "Explore",
        conceptMapTitle: "Concept Map",
        conceptMapText: "Ideas, schools and philosophers connected in a network of thought.",
        throughCenturies: "Across the Centuries",
        timelineTitle: "Timeline",
        timelineText: "A chronological journey through the history of philosophy.",
        newsletterTitle: "Philosophy in your inbox",
        newsletterIntro: "Thoughts, articles and philosophical paths occasionally delivered to your inbox.",
        newsletterButton: "📧 Philosophy in your inbox",
        footerAbout: "A place dedicated to philosophy, thought and the questions that cross the centuries.",
        footerNavigation: "Navigation",
        footerInformation: "Information",
        navIncipit: "Incipit",
        navPhilosophy: "Philosophy",
        navArticles: "Articles",
        navContacts: "Contact",
        navPrivacy: "Privacy Policy",
        navLegal: "Legal Information",
        navCredits: "Credits and Copyright",
        musicLabel: "MUSIC FOR STUDY",
        musicPaused: "Paused",
        visioniLabel: "VISIONS",
        visioniTitle: "A Window into Thought",
        closeVideo: "Close video",
        visioniVideoTitle: "Schopenhauer and Nietzsche — Hans Georg Gadamer",
        visioniNote: "Visions — images, words and thought."
    }
};

/* ============================================================
   CAMBIO LINGUA
   ============================================================ */

function changeLanguage(lang) {
    const data = translations[lang];
    if (!data) return;

    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.dataset.i18n;
        if (data[key] !== undefined) {
            element.innerHTML = data[key];
        }
    });

    document.querySelectorAll('[data-i18n-aria]').forEach(element => {
        const key = element.dataset.i18nAria;
        if (data[key] !== undefined) {
            element.setAttribute('aria-label', data[key]);
        }
    });

    document.querySelectorAll('.language-switcher button').forEach(button => {
        button.classList.toggle('active', button.dataset.lang === lang);
    });

    document.documentElement.lang = lang;
    localStorage.setItem('echiLanguage', lang);
}

/* ============================================================
   AVVIO
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.language-switcher button').forEach(button => {
        button.addEventListener('click', function () {
            changeLanguage(this.dataset.lang);
        });
    });

    const savedLanguage = localStorage.getItem('echiLanguage') || 'it';
    changeLanguage(savedLanguage);
});

document.addEventListener('DOMContentLoaded', function() {
    "use strict";
    console.log('🎵 Echi di Sofia — Avvio script');

    // PLAYER
    const player = document.getElementById('musicPlayer');
    const playerToggle = document.getElementById('playerToggle');
    const musicClose = document.getElementById('musicClose');
    const playButton = document.getElementById('playButton');
    const playerStatus = document.getElementById('playerStatus');
    const progress = document.getElementById('musicProgress');
    const volumeToggle = document.getElementById('volumeToggle');
    const audio = document.getElementById('myAudio');

    if (player && playerToggle && playButton && audio) {
        console.log('🎵 Player inizializzato');
        function openPanel() {
            player.classList.add('open');
            playerToggle.setAttribute('aria-expanded', 'true');
        }
        function closePanel() {
            player.classList.remove('open');
            playerToggle.setAttribute('aria-expanded', 'false');
        }
        playerToggle.addEventListener('click', function() {
            if (player.classList.contains('open')) closePanel();
            else openPanel();
        });
        if (musicClose) musicClose.addEventListener('click', closePanel);
        document.addEventListener('click', function(e) {
            if (!player.contains(e.target)) closePanel();
        });
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && player.classList.contains('open')) closePanel();
        });
        playButton.addEventListener('click', function() {
            if (audio.paused) {
                audio.play().then(function() {
                    playButton.textContent = '❚❚';
                    if (playerStatus) playerStatus.textContent = 'In riproduzione';
                }).catch(function(err) {
                    console.warn('Riproduzione audio non avviata:', err);
                    if (playerStatus) playerStatus.textContent = 'Errore';
                });
            } else {
                audio.pause();
                playButton.textContent = '▶';
                if (playerStatus) playerStatus.textContent = 'In pausa';
            }
        });
        audio.addEventListener('ended', function() {
            playButton.textContent = '▶';
            if (playerStatus) playerStatus.textContent = 'In pausa';
        });
        if (audio && progress) {
            audio.addEventListener('timeupdate', function() {
                if (audio.duration) progress.value = (audio.currentTime / audio.duration) * 100;
            });
            progress.addEventListener('input', function() {
                if (audio.duration) audio.currentTime = (this.value / 100) * audio.duration;
            });
        }
        let isMuted = false;
        if (volumeToggle && audio) {
            volumeToggle.addEventListener('click', function() {
                isMuted = !isMuted;
                audio.muted = isMuted;
                this.textContent = isMuted ? '🔇' : '🔊';
            });
        }
    } else {
        console.warn('⚠️ Player: alcuni elementi DOM non trovati');
    }

    // VIDEO — VISIONI
    const videoPlayer = document.getElementById('videoPlayer');
    const videoToggle = document.getElementById('videoToggle');
    const videoClose = document.getElementById('videoClose');
    const visioniVideo = document.getElementById('visioniVideo');

    if (videoPlayer && videoToggle) {
        function openVideo() {
            videoPlayer.classList.add('open');
            videoToggle.setAttribute('aria-expanded', 'true');
            const panel = document.getElementById('videoPanel');
            if (panel) panel.setAttribute('aria-hidden', 'false');
        }

        function closeVideo() {
            videoPlayer.classList.remove('open');
            videoToggle.setAttribute('aria-expanded', 'false');
            const panel = document.getElementById('videoPanel');
            if (panel) panel.setAttribute('aria-hidden', 'true');
            if (visioniVideo && visioniVideo.tagName === 'VIDEO') {
                visioniVideo.pause();
            }
        }

        videoToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            if (videoPlayer.classList.contains('open')) closeVideo();
            else openVideo();
        });

        if (videoClose) {
            videoClose.addEventListener('click', function(e) {
                e.stopPropagation();
                closeVideo();
            });
        }

        document.addEventListener('click', function(e) {
            if (!videoPlayer.contains(e.target)) closeVideo();
        });

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && videoPlayer.classList.contains('open')) closeVideo();
        });
    }

    // NEWSLETTER
    const newsletterTrigger = document.getElementById('newsletterTrigger');
    const newsletterModal = document.getElementById('newsletterModal');
    const closeNewsletter = document.getElementById('closeNewsletter');
    const newsletterForm = document.getElementById('newsletterForm');

    if (newsletterTrigger && newsletterModal) {
        newsletterTrigger.addEventListener('click', function(e) {
            e.preventDefault();
            newsletterModal.classList.add('open');
            newsletterModal.setAttribute('aria-hidden', 'false');
        });
    }
    if (closeNewsletter && newsletterModal) {
        closeNewsletter.addEventListener('click', function(e) {
            e.preventDefault();
            newsletterModal.classList.remove('open');
            newsletterModal.setAttribute('aria-hidden', 'true');
        });
    }
    if (newsletterModal) {
        newsletterModal.addEventListener('click', function(e) {
            if (e.target === newsletterModal) {
                newsletterModal.classList.remove('open');
                newsletterModal.setAttribute('aria-hidden', 'true');
            }
        });
    }
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && newsletterModal && newsletterModal.classList.contains('open')) {
            newsletterModal.classList.remove('open');
            newsletterModal.setAttribute('aria-hidden', 'true');
        }
    });

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            e.stopPropagation();
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            const consentInput = newsletterForm.querySelector('#newsletterConsent');
            const submitButton = newsletterForm.querySelector('button[type="submit"]');
            if (!emailInput || !consentInput) { console.error('Campi newsletter mancanti.'); return; }
            const email = emailInput.value.trim();
            if (!email) { alert('Inserisci un indirizzo email valido.'); emailInput.focus(); return; }
            if (!consentInput.checked) { alert('Per iscriverti devi accettare la Privacy Policy.'); consentInput.focus(); return; }
            if (submitButton) { submitButton.disabled = true; submitButton.textContent = 'Invio…'; }
            try {
                const response = await fetch('https://weathered-snowflake-65e3.sylk76.workers.dev', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: email })
                });
                const result = await response.json();
                if (response.ok && result.success) {
                    alert('Grazie! Iscrizione ricevuta.');
                    newsletterForm.reset();
                    newsletterModal.classList.remove('open');
                    newsletterModal.setAttribute('aria-hidden', 'true');
                } else {
                    console.error('Errore newsletter:', result);
                    alert('ERRORE BREVO:\n\n' + (result.message || 'Errore sconosciuto.') + '\n\nDETTAGLI:\n' + (result.details || 'Nessun dettaglio restituito.'));
                }
            } catch (error) {
                console.error('Errore di connessione al Worker:', error);
                alert('Impossibile contattare il servizio newsletter.\n\n' + error.message);
            } finally {
                if (submitButton) { submitButton.disabled = false; submitButton.textContent = 'Iscriviti'; }
            }
        });
    }

    // TORNA SU
    const tornaSuBtn = document.getElementById('tornaSu');
    if (tornaSuBtn) {
        function toggleTornaSu() {
            const scrollY = window.scrollY;
            if (scrollY > 150) tornaSuBtn.classList.add('visible');
            else tornaSuBtn.classList.remove('visible');
        }
        window.addEventListener('scroll', toggleTornaSu, { passive: true });
        tornaSuBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        toggleTornaSu();
    }

    // TEMA
    const themeToggle = document.getElementById('themeToggle');
    const themeLabel = document.getElementById('themeLabel');
    const iconMoon = document.getElementById('iconMoon');
    const iconSun = document.getElementById('iconSun');

    if (themeToggle) {
        const savedTheme = localStorage.getItem('theme') || 'dark';

        function setTheme(theme) {
            if (theme === 'light') {
                document.body.classList.add('light-theme');
                themeLabel.textContent = 'Chiaro';
                if (iconMoon) iconMoon.style.display = 'none';
                if (iconSun) iconSun.style.display = 'block';
            } else {
                document.body.classList.remove('light-theme');
                themeLabel.textContent = 'Scuro';
                if (iconMoon) iconMoon.style.display = 'block';
                if (iconSun) iconSun.style.display = 'none';
            }
            localStorage.setItem('theme', theme);
        }

        setTheme(savedTheme);

        themeToggle.addEventListener('click', function() {
            const isLight = document.body.classList.contains('light-theme');
            setTheme(isLight ? 'dark' : 'light');
        });
    }

    console.log('✅ Script inizializzato correttamente');
});

// ECO DA CLICK
document.addEventListener('click', function(event) {
    const origin = document.createElement('div');
    origin.className = 'echo-origin';
    origin.style.left = event.clientX + 'px';
    origin.style.top = event.clientY + 'px';
    document.body.appendChild(origin);
    origin.addEventListener('animationend', function() { origin.remove(); });

    const ripple = document.createElement('div');
    ripple.className = 'echo-ripple';
    ripple.style.left = event.clientX + 'px';
    ripple.style.top = event.clientY + 'px';
    function createOrganicWave(radius, irregularity, phase) {
        const points = [];
        const segments = 72;
        const center = 230;
        for (let i = 0; i < segments; i++) {
            const angle = (Math.PI * 2 * i) / segments;
            const variation = Math.sin(angle * 3 + phase) * irregularity +
                             Math.sin(angle * 5 - phase * 1.7) * irregularity * 0.45 +
                             Math.sin(angle * 7 + phase * 0.8) * irregularity * 0.20;
            const r = radius + variation;
            const x = center + Math.cos(angle) * r;
            const y = center + Math.sin(angle) * r;
            points.push([x, y]);
        }
        let d = `M ${points[0][0]} ${points[0][1]}`;
        for (let i = 1; i < points.length; i++) d += ` L ${points[i][0]} ${points[i][1]}`;
        d += ' Z';
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
    const firstWave = ripple.querySelector('.ripple-1');
    firstWave.style.opacity = '0.82';
    firstWave.style.transform = 'scale(.02)';
    requestAnimationFrame(() => firstWave.classList.add('start'));
    ripple.addEventListener('animationend', function(e) {
        if (e.animationName === 'darkRipple1') ripple.remove();
    });
});

// OROLOGIO DI ERACLITO — lancette in tempo reale
(function updateClock() {
    const now = new Date();
    const hours = now.getHours() % 12;
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    const hourAngle = (hours * 30) + (minutes * 0.5);
    const minAngle = (minutes * 6) + (seconds * 0.1);

    const hourHand = document.getElementById('hourHand');
    const minHand = document.getElementById('minHand');

    if (hourHand) {
        hourHand.setAttribute('transform', 'rotate(' + hourAngle + ', 100, 100)');
    }
    if (minHand) {
        minHand.setAttribute('transform', 'rotate(' + minAngle + ', 100, 100)');
    }

    setTimeout(updateClock, 1000);
})();
