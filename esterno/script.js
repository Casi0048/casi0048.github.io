 ! function() {
        "use strict";
        var e = document.getElementById("hoverElement"),
          n = document.getElementById("audio");
        if (e && n) {
          var o = !1,
            t = !1;
          document.addEventListener("click", c), document.addEventListener("touchstart", c, {
            passive: !0
          }), document.addEventListener("keydown", c), e.addEventListener("mouseenter", (function() {
            o ? (n.currentTime = 0, n.play().then((function() {
              console.log("🎵 Musica in riproduzione")
            })).catch((function(e) {
              console.warn("Play fallito:", e.name)
            }))) : console.log("ℹ️ Hover rilevato, ma audio non ancora sbloccato.")
          })), e.addEventListener("mouseleave", (function() {
            n.pause(), n.currentTime = 0
          }))
        }

        function c(e) {
          if (!(e && e.target.closest("#searchToggleBtn, #siteSearch") || o)) {
            ! function() {
              if (!t && !o) {
                t = !0;
                var e = document.createElement("source");
                e.src = "/suoni/gymnopedie.opus", e.type = "audio/ogg; codecs=opus", n.appendChild(e);
                var c = document.createElement("source");
                c.src = "/suoni/gymnopedie.mp3", c.type = "audio/mpeg", n.appendChild(c), n.load(), console.log("📥 Audio in caricamento...")
              }
            }();
            var c = function() {
              var e = n.volume;
              n.volume = 0, n.play().then((function() {
                n.pause(), n.currentTime = 0, n.volume = e, o = !0, console.log("🔓 Audio sbloccato! Ora l'hover funziona.")
              })).catch((function(o) {
                n.volume = e, console.warn("⚠️ Sblocco fallito:", o.name)
              }))
            };
            n.readyState >= 2 ? c() : n.addEventListener("canplay", c, {
              once: !0
            })
          }
        }
      }()

  const translations = {
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

      function changeLanguage(e) {
        const i = translations[e];
        i && (document.querySelectorAll("[data-i18n]").forEach((e => {
          const o = e.dataset.i18n;
          void 0 !== i[o] && (e.innerHTML = i[o])
        })), document.querySelectorAll("[data-i18n-aria]").forEach((e => {
          const o = e.dataset.i18nAria;
          void 0 !== i[o] && e.setAttribute("aria-label", i[o])
        })), document.querySelectorAll(".language-switcher button").forEach((i => {
          i.classList.toggle("active", i.dataset.lang === e)
        })), document.documentElement.lang = e, localStorage.setItem("echiLanguage", e))
      }
      document.addEventListener("DOMContentLoaded", (() => {
        document.querySelectorAll(".language-switcher button").forEach((e => {
          e.addEventListener("click", (function() {
            changeLanguage(this.dataset.lang)
          }))
        })), changeLanguage(localStorage.getItem("echiLanguage") || "it")
      }))

 ! function() {
        const e = document.getElementById("hourHand"),
          t = document.getElementById("minHand");

        function o() {
          const o = new Date,
            a = o.getHours() % 12,
            i = o.getMinutes(),
            n = 6 * i,
            r = (30 * a + .5 * i - 90) * Math.PI / 180,
            s = (n - 90) * Math.PI / 180;
          e.setAttribute("x2", 100 + 50 * Math.cos(r)), e.setAttribute("y2", 100 + 50 * Math.sin(r)), t.setAttribute("x2", 100 + 65 * Math.cos(s)), t.setAttribute("y2", 100 + 65 * Math.sin(s))
        }
        e && t && (o(), setInterval(o, 1e3))
      }(), document.addEventListener("DOMContentLoaded", (function() {
        "use strict";
        const e = document.getElementById("musicPlayer"),
          t = document.getElementById("playerToggle"),
          o = document.getElementById("musicClose"),
          a = document.getElementById("playButton"),
          i = document.getElementById("playerStatus"),
          n = document.getElementById("musicProgress"),
          r = document.getElementById("volumeToggle"),
          s = document.getElementById("myAudio"),
          c = document.getElementById("nextButton");
        if (e && t && a && s) {
          const E = [{
            src: "/suoni/Strauss.mp3",
            title: "Strauss – 'Sul bel Danubio blu'"
          }, {
            src: "/suoni/notturno.mp3",
            title: "Beethoven – Sonata 'Chiaro di luna', Op. 27 n. 2"
          }];
          let z = 0;
          const S = document.getElementById("musicPlaylist");

          function P(e, t = !0) {
            z = (e + E.length) % E.length;
            const o = E[z];
            t && (s.src = o.src, s.load()), n && (n.value = 0), i && (i.textContent = "In pausa"), a.textContent = "▶", A()
          }

          function q() {
            S && (S.innerHTML = "", E.forEach(((e, t) => {
              const o = document.createElement("li");
              o.textContent = e.title, o.dataset.index = t, o.addEventListener("click", (e => {
                e.stopPropagation(), P(t), s.play().then((() => {
                  a.textContent = "❚❚", i && (i.textContent = "In riproduzione")
                })).catch((e => {
                  console.warn(e), i && (i.textContent = "Errore")
                }))
              })), S.appendChild(o)
            })), A())
          }

          function A() {
            S && S.querySelectorAll("li").forEach((e => {
              e.classList.toggle("active", Number(e.dataset.index) === z)
            }))
          }

          function B() {
            e.classList.remove("open"), t.setAttribute("aria-expanded", "false")
          }
          q(), P(0, !1), t.addEventListener("click", (o => {
            o.stopPropagation(), e.classList.contains("open") ? B() : (e.classList.add("open"), t.setAttribute("aria-expanded", "true"))
          })), o && o.addEventListener("click", (e => {
            e.stopPropagation(), B()
          })), document.addEventListener("click", (t => {
            e.contains(t.target) || B()
          })), document.addEventListener("keydown", (t => {
            "Escape" === t.key && e.classList.contains("open") && B()
          })), a.addEventListener("click", (e => {
            e.stopPropagation(), s.paused ? (s.src || P(z), s.play().then((() => {
              a.textContent = "❚❚", i && (i.textContent = "In riproduzione")
            })).catch((e => {
              console.warn(e), i && (i.textContent = "Errore")
            }))) : (s.pause(), a.textContent = "▶", i && (i.textContent = "In pausa"))
          })), c && c.addEventListener("click", (e => {
            e.stopPropagation();
            const t = !s.paused;
            P(z + 1), t && s.play().catch((e => console.warn(e)))
          })), s.addEventListener("ended", (() => {
            P(z + 1), s.play().catch((e => {
              a.textContent = "▶", i && (i.textContent = "In pausa")
            }))
          })), n && (s.addEventListener("timeupdate", (() => {
            s.duration && (n.value = s.currentTime / s.duration * 100)
          })), n.addEventListener("input", (function() {
            s.duration && (s.currentTime = this.value / 100 * s.duration)
          })));
          let C = !1;
          r && r.addEventListener("click", (function(e) {
            e.stopPropagation(), C = !C, s.muted = C, this.textContent = C ? "🔇" : "🔊"
          }))
        }
        const l = document.getElementById("videoPlayer"),
          u = document.getElementById("videoToggle"),
          d = document.getElementById("videoClose"),
          m = document.getElementById("visioniVideo");
        if (l && u) {
          function k() {
            l.classList.add("open"), u.setAttribute("aria-expanded", "true");
            const e = document.getElementById("videoPanel");
            e && e.setAttribute("aria-hidden", "false");
            let t = !1;
            try {
              const e = JSON.parse(localStorage.getItem("echiCookieConsent.v1"));
              t = e && !0 === e.external
            } catch {
              t = !1
            }
            if (m && !m.src && t) {
              const e = m.getAttribute("data-src");
              e && (m.src = e)
            }
          }

          function M() {
            const e = l.classList.contains("open");
            l.classList.remove("open"), u.setAttribute("aria-expanded", "false"), e && u.focus();
            const t = document.getElementById("videoPanel");
            t && t.setAttribute("aria-hidden", "true"), m && "VIDEO" === m.tagName && m.pause()
          }
          u.addEventListener("click", (e => {
            e.stopPropagation(), l.classList.contains("open") ? M() : k()
          })), d && d.addEventListener("click", (e => {
            e.stopPropagation(), M()
          })), document.addEventListener("click", (e => {
            l.contains(e.target) || M()
          })), document.addEventListener("keydown", (e => {
            "Escape" === e.key && l.classList.contains("open") && M()
          }))
        }
        const h = document.getElementById("newsletterTrigger"),
          p = document.getElementById("newsletterModal"),
          g = document.getElementById("closeNewsletter"),
          v = document.getElementById("newsletterForm");

        function x() {
          p.classList.remove("open"), p.setAttribute("aria-hidden", "true")
        }
        h && p && h.addEventListener("click", (e => {
          e.preventDefault(), p.classList.add("open"), p.setAttribute("aria-hidden", "false")
        })), g && p && g.addEventListener("click", (e => {
          e.preventDefault(), x()
        })), p && (p.addEventListener("click", (e => {
          e.target === p && x()
        })), document.addEventListener("keydown", (e => {
          "Escape" === e.key && p.classList.contains("open") && x()
        }))), v && v.addEventListener("submit", (async function(e) {
          e.preventDefault(), e.stopPropagation();
          const t = v.querySelector('input[type="email"]'),
            o = v.querySelector("#newsletterConsent"),
            a = v.querySelector('button[type="submit"]');
          if (!t || !o) return;
          const i = t.value.trim();
          if (!i) return alert("Inserisci un indirizzo email valido."), void t.focus();
          if (!o.checked) return alert("Per iscriverti devi accettare la Privacy Policy."), void o.focus();
          a && (a.disabled = !0, a.textContent = "Invio…");
          try {
            const e = await fetch("https://weathered-snowflake-65e3.sylk76.workers.dev", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({
                  email: i
                })
              }),
              t = await e.json();
            e.ok && t.success ? (alert("Grazie! Iscrizione ricevuta."), v.reset(), x()) : alert("Errore: " + (t.message || "sconosciuto"))
          } catch (e) {
            alert("Impossibile contattare il servizio newsletter.")
          } finally {
            a && (a.disabled = !1, a.textContent = "Iscriviti")
          }
        }));
        const I = document.getElementById("tornaSu");
        if (I) {
          function w() {
            window.scrollY > 150 ? I.classList.add("visible") : I.classList.remove("visible")
          }
          window.addEventListener("scroll", w, {
            passive: !0
          }), I.addEventListener("click", (e => {
            e.preventDefault(), window.scrollTo({
              top: 0,
              behavior: "smooth"
            })
          })), w()
        }
        const f = document.getElementById("themeToggle"),
          L = document.getElementById("themeLabel"),
          b = document.getElementById("iconMoon"),
          y = document.getElementById("iconSun");
        if (f) {
          function T(e) {
            "light" === e ? (document.body.classList.add("light-theme"), L.textContent = "Chiaro", b && (b.style.display = "none"), y && (y.style.display = "block")) : (document.body.classList.remove("light-theme"), L.textContent = "Scuro", b && (b.style.display = "block"), y && (y.style.display = "none")), localStorage.setItem("theme", e)
          }
          T(localStorage.getItem("theme") || "dark"), f.addEventListener("click", (() => {
            T(document.body.classList.contains("light-theme") ? "dark" : "light")
          }))
        }
      })), document.addEventListener("click", (e => {
        const t = document.createElement("div");
        t.className = "echo-origin", t.style.left = e.clientX + "px", t.style.top = e.clientY + "px", document.body.appendChild(t), t.addEventListener("animationend", (() => t.remove()));
        const o = document.createElement("div");

        function a(e, t, o) {
          const a = [];
          for (let i = 0; i < 72; i++) {
            const n = 2 * Math.PI * i / 72,
              r = e + (Math.sin(3 * n + o) * t + Math.sin(5 * n - 1.7 * o) * t * .45 + Math.sin(7 * n + .8 * o) * t * .2),
              s = 230 + Math.cos(n) * r,
              c = 230 + Math.sin(n) * r;
            a.push([s, c])
          }
          let i = `M ${a[0][0]} ${a[0][1]}`;
          for (let e = 1; e < a.length; e++) i += ` L ${a[e][0]} ${a[e][1]}`;
          return i + " Z"
        }
        o.className = "echo-ripple", o.style.left = e.clientX + "px", o.style.top = e.clientY + "px", o.innerHTML = `<svg viewBox="0 0 460 460" xmlns="http://www.w3.org/2000/svg"><path class="ripple-1" d="${a(34,2.8,.4)}"/><path class="ripple-2" d="${a(39,2.3,2.1)}"/><path class="ripple-3" d="${a(44,1.8,4)}"/></svg>`, document.body.appendChild(o);
        const i = o.querySelector(".ripple-1");
        i.style.opacity = "0.82", i.style.transform = "scale(.02)", requestAnimationFrame((() => i.classList.add("start"))), o.addEventListener("animationend", (e => {
          o.remove()
        }))
      }));
      const quoteText = document.getElementById("quoteText"),
        quoteAuthor = document.getElementById("quoteAuthor"),
        quoteBlock = document.querySelector(".quote-block"),
        quoteInfo = document.getElementById("quoteInfo"),
        quoteSource = document.getElementById("quoteSource");
      if (quoteText && quoteAuthor && quoteBlock) {
        const e = [{
          text: "L'uomo è misura di tutte le cose.",
          author: "Protagora",
          source: "Frammento B1"
        }, {
          text: "La natura ama nascondersi.",
          author: "Eraclito",
          source: "Frammento B123"
        }, {
          text: "Il logos è comune a tutti.",
          author: "Eraclito",
          source: "Frammento B2"
        }, {
          text: "La guerra è padre di tutte le cose.",
          author: "Eraclito",
          source: "Frammento B53"
        }, {
          text: "Tutto è uno.",
          author: "Eraclito",
          source: "Frammento B50"
        }, {
          text: "L'essere è, il non essere non è.",
          author: "Parmenide",
          source: "Poema, frammento B6"
        }, {
          text: "Pensare ed essere sono la stessa cosa.",
          author: "Parmenide",
          source: "Poema, frammento B3"
        }, {
          text: "Nulla nasce dal nulla.",
          author: "Parmenide",
          source: "Poema, frammento B8"
        }, {
          text: "Una vita senza ricerca non è degna di essere vissuta.",
          author: "Socrate",
          source: "Platone, Apologia di Socrate, 38a"
        }, {
          text: "So di non essere sapiente.",
          author: "Socrate",
          source: "Platone, Apologia di Socrate, 21b–d"
        }, {
          text: "È peggio commettere ingiustizia che subirla.",
          author: "Socrate",
          source: "Platone, Gorgia, 469b–c"
        }, {
          text: "La meraviglia è l'inizio della filosofia.",
          author: "Platone",
          source: "Teeteto, 155d"
        }, {
          text: "Conoscere è ricordare.",
          author: "Platone",
          source: "Menone, 81c–d"
        }, {
          text: "Il tempo è l'immagine mobile dell'eternità.",
          author: "Platone",
          source: "Timeo, 37d"
        }, {
          text: "Il corpo è la tomba dell'anima.",
          author: "Platone",
          source: "Cratilo, 400c"
        }, {
          text: "Il bene è ciò che ogni anima persegue.",
          author: "Platone",
          source: "Repubblica, VI"
        }, {
          text: "L'uomo è per natura un animale politico.",
          author: "Aristotele",
          source: "Politica, I, 1253a"
        }, {
          text: "La felicità è il fine ultimo della vita umana.",
          author: "Aristotele",
          source: "Etica Nicomachea, I, 1097b"
        }, {
          text: "La virtù è una disposizione a scegliere il giusto mezzo.",
          author: "Aristotele",
          source: "Etica Nicomachea, II, 1106b"
        }, {
          text: "La conoscenza comincia dalla meraviglia.",
          author: "Aristotele",
          source: "Metafisica, I, 982b"
        }, {
          text: "L'anima è in qualche modo tutte le cose.",
          author: "Aristotele",
          source: "De anima, III, 431b"
        }, {
          text: "Tutti gli uomini aspirano per natura al sapere.",
          author: "Aristotele",
          source: "Metafisica, I, 980a"
        }, {
          text: "La morte non è nulla per noi.",
          author: "Epicuro",
          source: "Lettera a Meneceo, 124–127"
        }, {
          text: "Non si può vivere felicemente senza vivere saggiamente, bene e giustamente.",
          author: "Epicuro",
          source: "Massime capitali, V"
        }, {
          text: "Di tutte le cose, la più grande è l'amicizia.",
          author: "Epicuro",
          source: "Sentenze vaticane, 23"
        }, {
          text: "Alcune cose dipendono da noi, altre non dipendono da noi.",
          author: "Epitteto",
          source: "Manuale, 1"
        }, {
          text: "Non sono le cose a turbare gli uomini, ma i giudizi che essi formulano sulle cose.",
          author: "Epitteto",
          source: "Manuale, 5"
        }, {
          text: "Sostieni e astieniti.",
          author: "Epitteto",
          source: "Manuale, 8"
        }, {
          text: "Nessuno è libero se non è padrone di se stesso.",
          author: "Epitteto",
          source: "Discorsi"
        }, {
          text: "Ciò che non giova all'alveare non giova neppure all'ape.",
          author: "Marco Aurelio",
          source: "Meditazioni, VI"
        }, {
          text: "La miglior vendetta è non essere come chi ha commesso l'ingiustizia.",
          author: "Marco Aurelio",
          source: "Meditazioni, VI"
        }, {
          text: "Non è libero chi è schiavo delle proprie passioni.",
          author: "Seneca",
          source: "Lettere a Lucilio"
        }, {
          text: "Non osiamo molte cose perché sono difficili; sono difficili perché non osiamo.",
          author: "Seneca",
          source: "Lettere a Lucilio, 104"
        }, {
          text: "La vita è lunga abbastanza, se la si sa usare.",
          author: "Seneca",
          source: "La brevità della vita, I"
        }, {
          text: "Il nostro cuore è inquieto finché non riposa in te.",
          author: "Agostino d'Ippona",
          source: "Confessioni, I, 1"
        }, {
          text: "Ama e fa' ciò che vuoi.",
          author: "Agostino d'Ippona",
          source: "Commento alla Prima Lettera di Giovanni, VII, 8"
        }, {
          text: "La verità abita nell'uomo interiore.",
          author: "Agostino d'Ippona",
          source: "La vera religione, 39, 72"
        }, {
          text: "Comprendi per credere, credi per comprendere.",
          author: "Agostino d'Ippona",
          source: "Sermone 43, 9"
        }, {
          text: "Credo per comprendere.",
          author: "Anselmo d'Aosta",
          source: "Proslogion, I"
        }, {
          text: "La grazia non distrugge la natura, ma la perfeziona.",
          author: "Tommaso d'Aquino",
          source: "Summa Theologiae, I, q. 1, a. 8"
        }, {
          text: "La verità è l'adeguazione dell'intelletto e della cosa.",
          author: "Tommaso d'Aquino",
          source: "De veritate, q. 1, a. 1"
        }, {
          text: "È meglio illuminare che brillare soltanto.",
          author: "Tommaso d'Aquino",
          source: "Summa Theologiae, II-II, q. 188, a. 6"
        }, {
          text: "L'essere e l'essenza sono distinti nelle creature.",
          author: "Tommaso d'Aquino",
          source: "De ente et essentia, IV"
        }, {
          text: "Le entità non devono essere moltiplicate oltre necessità.",
          author: "Guglielmo di Ockham",
          source: "Rasoio di Ockham"
        }, {
          text: "Gli uomini giudicano più dagli occhi che dalle mani.",
          author: "Niccolò Machiavelli",
          source: "Il Principe, XVIII"
        }, {
          text: "La fortuna è arbitra della metà delle nostre azioni.",
          author: "Niccolò Machiavelli",
          source: "Il Principe, XXV"
        }, {
          text: "Che cosa so?",
          author: "Michel de Montaigne",
          source: "Saggi, II, 12"
        }, {
          text: "La filosofia è imparare a morire.",
          author: "Michel de Montaigne",
          source: "Saggi, I, 20"
        }, {
          text: "Penso, dunque sono.",
          author: "René Descartes",
          source: "Discorso sul metodo, IV"
        }, {
          text: "Non basta avere una buona mente; l'importante è usarla bene.",
          author: "René Descartes",
          source: "Discorso sul metodo, I"
        }, {
          text: "Il cuore ha le sue ragioni che la ragione non conosce.",
          author: "Blaise Pascal",
          source: "Pensieri, fr. 423"
        }, {
          text: "L'uomo supera infinitamente l'uomo.",
          author: "Blaise Pascal",
          source: "Pensieri, fr. 434"
        }, {
          text: "Tutta l'infelicità degli uomini deriva dal non saper restare tranquilli in una stanza.",
          author: "Blaise Pascal",
          source: "Pensieri, fr. 139"
        }, {
          text: "Deus sive Natura.",
          author: "Baruch Spinoza",
          source: "Etica, IV, Prefazione"
        }, {
          text: "Non piangere, non ridere, non detestare, ma comprendere.",
          author: "Baruch Spinoza",
          source: "Trattato politico, I, 4"
        }, {
          text: "L'uomo libero pensa meno di ogni altra cosa alla morte.",
          author: "Baruch Spinoza",
          source: "Etica, IV, prop. 67"
        }, {
          text: "Abbi il coraggio di servirti della tua propria ragione.",
          author: "Immanuel Kant",
          source: "Che cos'è l'Illuminismo?"
        }, {
          text: "Il cielo stellato sopra di me e la legge morale dentro di me.",
          author: "Immanuel Kant",
          source: "Critica della ragion pratica, conclusione"
        }, {
          text: "Agisci in modo da trattare l'umanità sempre come fine e mai semplicemente come mezzo.",
          author: "Immanuel Kant",
          source: "Fondazione della metafisica dei costumi, II"
        }, {
          text: "I pensieri senza contenuto sono vuoti; le intuizioni senza concetti sono cieche.",
          author: "Immanuel Kant",
          source: "Critica della ragion pura, A51/B75"
        }, {
          text: "La ragione umana ha il particolare destino di essere assillata da questioni che non può evitare.",
          author: "Immanuel Kant",
          source: "Critica della ragion pura, Prefazione"
        }, {
          text: "La ragione è e deve essere schiava delle passioni.",
          author: "David Hume",
          source: "Trattato sulla natura umana, II, 3, 3"
        }, {
          text: "L'abitudine è la grande guida della vita umana.",
          author: "David Hume",
          source: "Ricerca sull'intelletto umano, V"
        }, {
          text: "L'uomo nasce libero, ma ovunque è in catene.",
          author: "Jean-Jacques Rousseau",
          source: "Il contratto sociale, I, 1"
        }, {
          text: "La libertà è obbedire alla legge che ci siamo prescritti.",
          author: "Jean-Jacques Rousseau",
          source: "Il contratto sociale, I, 8"
        }, {
          text: "La verità è l'intero.",
          author: "Georg Wilhelm Friedrich Hegel",
          source: "Fenomenologia dello spirito, Prefazione"
        }, {
          text: "La filosofia è la sua epoca colta nel pensiero.",
          author: "Georg Wilhelm Friedrich Hegel",
          source: "Lineamenti di filosofia del diritto, Prefazione"
        }, {
          text: "La storia del mondo è il tribunale del mondo.",
          author: "Georg Wilhelm Friedrich Hegel",
          source: "Lineamenti di filosofia del diritto, Prefazione"
        }, {
          text: "La vita deve essere compresa all'indietro, ma vissuta in avanti.",
          author: "Søren Kierkegaard",
          source: "Diari, 1843"
        }, {
          text: "L'angoscia è la vertigine della libertà.",
          author: "Søren Kierkegaard",
          source: "Il concetto dell'angoscia"
        }, {
          text: "La soggettività è la verità.",
          author: "Søren Kierkegaard",
          source: "Postilla conclusiva non scientifica"
        }, {
          text: "Il mondo è la mia rappresentazione.",
          author: "Arthur Schopenhauer",
          source: "Il mondo come volontà e rappresentazione, I, §1"
        }, {
          text: "La vita oscilla come un pendolo tra il dolore e la noia.",
          author: "Arthur Schopenhauer",
          source: "Il mondo come volontà e rappresentazione, IV, §57"
        }, {
          text: "La compassione è la base di ogni moralità.",
          author: "Arthur Schopenhauer",
          source: "Sul fondamento della morale"
        }, {
          text: "Il sonno della ragione genera mostri.",
          author: "Francisco Goya",
          source: "Los Caprichos, n. 43"
        }, {
          text: "Dio è morto.",
          author: "Friedrich Nietzsche",
          source: "La gaia scienza, §125"
        }, {
          text: "Diventa ciò che sei.",
          author: "Friedrich Nietzsche",
          source: "La gaia scienza, §270"
        }, {
          text: "Ciò che non mi uccide mi rende più forte.",
          author: "Friedrich Nietzsche",
          source: "Il crepuscolo degli idoli, Massime e frecce, §8"
        }, {
          text: "Bisogna avere ancora il caos dentro di sé per partorire una stella danzante.",
          author: "Friedrich Nietzsche",
          source: "Così parlò Zarathustra, Prologo"
        }, {
          text: "Senza musica la vita sarebbe un errore.",
          author: "Friedrich Nietzsche",
          source: "Il crepuscolo degli idoli, Massime e frecce, §33"
        }, {
          text: "L'uomo è qualcosa che deve essere superato.",
          author: "Friedrich Nietzsche",
          source: "Così parlò Zarathustra, Prologo"
        }, {
          text: "Non ci sono fatti, ma solo interpretazioni.",
          author: "Friedrich Nietzsche",
          source: "Frammenti postumi, 1886–1887"
        }, {
          text: "Chi ha un perché per vivere può sopportare quasi ogni come.",
          author: "Friedrich Nietzsche",
          source: "Il crepuscolo degli idoli, Massime e frecce, §12"
        }, {
          text: "Il limite del mio linguaggio significa il limite del mio mondo.",
          author: "Ludwig Wittgenstein",
          source: "Tractatus logico-philosophicus, 5.6"
        }, {
          text: "Di ciò di cui non si può parlare, si deve tacere.",
          author: "Ludwig Wittgenstein",
          source: "Tractatus logico-philosophicus, 7"
        }, {
          text: "Il significato di una parola è il suo uso nel linguaggio.",
          author: "Ludwig Wittgenstein",
          source: "Ricerche filosofiche, §43"
        }, {
          text: "La filosofia è una lotta contro l'incantamento della nostra intelligenza mediante il linguaggio.",
          author: "Ludwig Wittgenstein",
          source: "Ricerche filosofiche, §109"
        }, {
          text: "L'esistenza precede l'essenza.",
          author: "Jean-Paul Sartre",
          source: "L'esistenzialismo è un umanismo"
        }, {
          text: "L'inferno sono gli altri.",
          author: "Jean-Paul Sartre",
          source: "A porte chiuse"
        }, {
          text: "L'uomo è condannato a essere libero.",
          author: "Jean-Paul Sartre",
          source: "L'essere e il nulla"
        }, {
          text: "Bisogna immaginare Sisifo felice.",
          author: "Albert Camus",
          source: "Il mito di Sisifo, conclusione"
        }, {
          text: "L'assurdo nasce dal confronto tra il bisogno umano e il silenzio irragionevole del mondo.",
          author: "Albert Camus",
          source: "Il mito di Sisifo"
        }, {
          text: "Nel mezzo dell'inverno ho scoperto che c'era in me un'invincibile estate.",
          author: "Albert Camus",
          source: "Ritorno a Tipasa"
        }];
        let t = 0;
        const o = 8e3,
          a = 800;

        function showQuote(t) {
          const o = e[t];
          quoteText.textContent = o.text, quoteAuthor.textContent = "— " + o.author, quoteSource && quoteInfo && (o.source ? (quoteSource.textContent = o.source, quoteSource.classList.remove("visible"), quoteInfo.hidden = !1, quoteInfo.setAttribute("aria-expanded", "false"), quoteSource.setAttribute("aria-hidden", "true")) : (quoteSource.textContent = "", quoteSource.classList.remove("visible"), quoteInfo.hidden = !0, quoteInfo.setAttribute("aria-expanded", "false"), quoteSource.setAttribute("aria-hidden", "true")))
        }

        function nextQuote() {
          quoteBlock.classList.add("fade-out"), setTimeout((() => {
            t = (t + 1) % e.length, showQuote(t), quoteBlock.classList.remove("fade-out")
          }), a), setTimeout(nextQuote, o + a)
        }
        quoteInfo && quoteSource && quoteInfo.addEventListener("click", (() => {
          const e = quoteSource.classList.toggle("visible");
          quoteInfo.setAttribute("aria-expanded", e ? "true" : "false"), quoteSource.setAttribute("aria-hidden", e ? "false" : "true")
        })), showQuote(0), !window.matchMedia("(prefers-reduced-motion: reduce)").matches && e.length > 1 && setTimeout(nextQuote, o)
      }

 (() => {
        "use strict";
        const e = "echiCookieConsent.v1";

        function t() {
          try {
            const t = localStorage.getItem(e);
            return t ? JSON.parse(t) : null
          } catch {
            return null
          }
        }

        function n(t, n) {
          try {
            localStorage.setItem(e, JSON.stringify({
              necessary: !0,
              preferences: Boolean(t),
              external: Boolean(n),
              savedAt: (new Date).toISOString()
            }))
          } catch {}
        }

        function c() {
          const e = document.getElementById("echi-cookie-banner"),
            t = document.getElementById("echi-cookie-settings");
          e && (e.hidden = !0), t && (t.hidden = !1)
        }

        function r() {
          const e = document.getElementById("echi-cookie-modal");
          if (!e) return;
          const n = t(),
            c = document.getElementById("echi-cookie-preferences"),
            r = document.getElementById("echi-cookie-external");
          c && (c.checked = Boolean(n && n.preferences)), r && (r.checked = Boolean(n && n.external)), e.hidden = !1, document.body.classList.add("echi-cookie-modal-open")
        }

        function o() {
          const e = document.getElementById("echi-cookie-modal");
          e && (e.hidden = !0), document.body.classList.remove("echi-cookie-modal-open")
        }

        function i(e) {
          switch (e) {
            case "accept":
              n(!0, !0), c();
              break;
            case "reject":
            case "reject-all":
              n(!1, !1), o(), c();
              break;
            case "customize":
              r();
              break;
            case "save":
              ! function() {
                const e = document.getElementById("echi-cookie-preferences"),
                  t = document.getElementById("echi-cookie-external");
                n(!!e && e.checked, !!t && t.checked), o(), c()
              }();
              break;
            case "close":
              o();
              break;
            case "info":
              window.location.href = "pagine/privacy-policy.html"
          }
        }

        function a() {
          t() && c(), document.addEventListener("click", (e => {
            const t = e.target.closest("[data-cookie-action]");
            t && i(t.getAttribute("data-cookie-action"))
          }));
          const e = document.getElementById("echi-cookie-settings");
          e && e.addEventListener("click", r);
          const n = document.getElementById("echi-cookie-modal");
          n && n.addEventListener("click", (e => {
            e.target === n && o()
          })), document.addEventListener("keydown", (e => {
            if ("Escape" !== e.key) return;
            const t = document.getElementById("echi-cookie-modal");
            t && !t.hidden && o()
          }))
        }
        "loading" === document.readyState ? document.addEventListener("DOMContentLoaded", a, {
          once: !0
        }) : a()
      })(), (() => {
        "use strict";
        const e = document.getElementById("siteSearchInput"),
          t = document.getElementById("siteSearchForm"),
          n = document.getElementById("siteSearchResults"),
          c = document.getElementById("searchToggleBtn"),
          r = document.getElementById("siteSearch");
        if (!e || !t || !n) return;
        let o, i, a;
        const s = e => String(e || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("it").trim(),
          l = e => String(e || "").replace(/[&<>"']/g, (e => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
          } [e])));

        function d(e, t) {
          const n = l(e);
          if (!t || t.length < 2) return n;
          const c = s(t).split(/\s+/).filter((e => e.length >= 2)).sort(((e, t) => t.length - e.length));
          if (!c.length) return n;
          const r = c.map((e => e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))).join("|"),
            o = new RegExp(`(${r})`, "gi");
          return n.replace(o, '<mark class="site-search-hit">$1</mark>')
        }

        function u(e) {
          return fetch(e, {
            cache: "no-cache"
          }).then((t => {
            if (!t.ok) throw new Error(`Errore HTTP ${t.status}: ${e}`);
            return t.json()
          }))
        }

        function h(e) {
          n.hidden = !1, n.innerHTML = `<p class="site-search-status">${l(e)}</p>`
        }

        function m() {
          n.hidden = !0, n.innerHTML = ""
        }
        async function g() {
          const t = e.value.trim();
          if (t.length < 2) m();
          else {
            h("Sto cercando…");
            try {
              const [e, c] = await Promise.all([(o || (o = u("search-full-index.json").catch((e => {
                throw o = null, e
              }))), o), (i || (i = u("search-index.json").catch((() => []))), i)]), r = s(t).split(/\s+/).filter(Boolean), a = Array.isArray(e) ? e : [], m = Array.isArray(c) ? c : [], g = function() {
                const e = [...document.querySelectorAll([".hero", ".philosophy-quotes", ".scuola-card", ".resource", "main section"].join(","))],
                  t = new Set;
                return e.filter((e => !t.has(e) && (t.add(e), !e.closest("#siteSearch")))).map((e => ({
                  title: e.querySelector("h1,h2,h3,h4")?.innerText?.trim() || e.querySelector(".quote-author")?.innerText?.trim() || "Contenuto della homepage",
                  text: (e.innerText || e.textContent || "").replace(/\s+/g, " ").trim(),
                  url: e.matches("a[href]") ? e.href : e.querySelector("a[href]")?.href || "#",
                  category: "Homepage"
                })))
              }(), f = [...a, ...m.map((e => ({
                ...e,
                text: e.text || e.desc || ""
              }))), ...g], p = new Set;
              ! function(e, t) {
                e.length ? (n.hidden = !1, n.innerHTML = `<p class="site-search-status">${e.length} risultati mostrati</p>` + e.map((e => {
                  const n = d(e.title || "Senza titolo", t),
                    c = l(e.category || "Articolo"),
                    r = l(e.url || "#"),
                    o = String(e.text || e.desc || ""),
                    i = s(o),
                    a = s(t),
                    u = i.indexOf(a),
                    h = u >= 0 ? Math.max(0, u - 100) : 0,
                    m = o.slice(h, h + 230).trim(),
                    g = h + 230 < o.length ? "…" : "",
                    f = d(m, t);
                  return `<article class="site-search-result"><a href="${r}">${n}</a><p class="site-search-status">${c}</p>${m?`<p>${f}${g}</p>`:""}</article>`
                })).join("")) : h(`Nessun risultato per "${t}". Prova con un termine più generale.`)
              }(f.map((e => {
                const t = String(e.title || ""),
                  n = String(e.text || e.desc || ""),
                  c = String(e.category || ""),
                  o = s(`${t} ${c} ${n}`),
                  i = r.reduce(((e, n) => o.includes(n) ? e + (s(t).includes(n) ? 5 : 1) : e), 0);
                return {
                  ...e,
                  score: i,
                  text: n
                }
              })).filter((e => e.score > 0)).sort(((e, t) => t.score - e.score)).filter((e => {
                const t = e.url || e.title;
                return !(!t || p.has(t) || (p.add(t), 0))
              })).slice(0, 12), t)
            } catch (e) {
              console.error("Ricerca:", e), h("Non riesco a caricare l'indice di ricerca.")
            }
          }
        }
        if (e.addEventListener("input", (() => {
            clearTimeout(a), a = setTimeout(g, 250)
          })), t.addEventListener("submit", (e => {
            e.preventDefault(), clearTimeout(a), g()
          })), c && r) {
          function f({
            returnFocus: t = !1
          } = {}) {
            r.hidden = !0, c.setAttribute("aria-expanded", "false"), c.setAttribute("aria-label", "Apri la ricerca"), e.value = "", m(), t && c.focus()
          }
          c.addEventListener("click", (t => {
            t.stopPropagation(), r.hidden ? (r.hidden = !1, c.setAttribute("aria-expanded", "true"), c.setAttribute("aria-label", "Chiudi la ricerca"), requestAnimationFrame((() => e.focus()))) : f()
          })), document.addEventListener("keydown", (e => {
            "Escape" !== e.key || r.hidden || f({
              returnFocus: !0
            })
          })), document.addEventListener("click", (e => {
            r.hidden || r.contains(e.target) || c.contains(e.target) || f()
          })), n.addEventListener("click", (e => {
            e.target.closest("a") && f()
          }))
        }
      })()

   ! function() {
        "use strict";
        const e = document.getElementById("celebrationCanvas"),
          t = document.getElementById("celebrationTrigger");
        if (!e || !t) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const n = e.getContext("2d");
        let i = [],
          a = null,
          o = 1;
        const r = ["#45e6a1", "#d6ae52", "#e2bf6b", "#a8d8bb", "#ffffff", "#ffd76a"];

        function d(e, t, n) {
          for (let a = 0; a < n; a++) {
            const n = Math.random() * Math.PI * 2,
              a = 2 + 7 * Math.random();
            i.push({
              x: e,
              y: t,
              vx: Math.cos(n) * a,
              vy: Math.sin(n) * a - 2 - 3 * Math.random(),
              size: 2 + 5 * Math.random(),
              color: r[Math.floor(Math.random() * r.length)],
              life: 1,
              decay: .006 + .014 * Math.random(),
              gravity: .14,
              rotation: Math.random() * Math.PI * 2,
              rotationSpeed: .25 * (Math.random() - .5),
              shape: Math.random() > .4 ? "circle" : "rect",
              glow: Math.random() > .7
            })
          }
        }

        function c() {
          n.clearRect(0, 0, e.width, e.height), i = i.filter((e => e.life > 0)), i.forEach((e => {
            e.x += e.vx, e.y += e.vy, e.vy += e.gravity, e.vx *= .99, e.vy *= .99, e.life -= e.decay, e.rotation += e.rotationSpeed;
            const t = Math.max(0, e.life);
            n.save(), n.globalAlpha = t, n.translate(e.x, e.y), n.rotate(e.rotation), n.fillStyle = e.color, e.glow && (n.shadowColor = e.color, n.shadowBlur = 15), "circle" === e.shape ? (n.beginPath(), n.arc(0, 0, e.size, 0, 2 * Math.PI), n.fill()) : n.fillRect(-e.size / 2, -e.size / 2, e.size, .6 * e.size), n.restore()
          })), i.length > 0 ? a = requestAnimationFrame(c) : (cancelAnimationFrame(a), a = null, e.classList.remove("active"))
        }
        t.addEventListener("click", (() => function(t) {
          o = window.devicePixelRatio || 1, e.width = window.innerWidth * o, e.height = window.innerHeight * o, e.style.width = window.innerWidth + "px", e.style.height = window.innerHeight + "px", n.setTransform(o, 0, 0, o, 0, 0), e.classList.add("active");
          const i = window.innerWidth / 2,
            r = window.innerHeight / 2;
          d(i, r, 120), setTimeout((() => d(.4 * i, .7 * r, 70)), 180), setTimeout((() => d(1.6 * i, .6 * r, 70)), 320), setTimeout((() => d(i, .35 * r, 90)), 500),
            function() {
              const e = document.createElement("div");
              e.className = "score-celebration", e.setAttribute("aria-hidden", "true"), e.textContent = "eureka εὕρηκα", document.body.appendChild(e), e.addEventListener("animationend", (() => e.remove()))
            }(), a || c()
        }()))
      }()

     ! function() {
        "use strict";
        const o = [{
            nome: "Socrate",
            iniziale: "Σ",
            anno: "470–399 a.C.",
            citazione: "Una vita senza ricerca non è degna di essere vissuta.",
            fonte: "Platone, Apologia di Socrate, 38a",
            commento: "Socrate non scrisse nulla e non fondò una scuola. Fece della domanda la sua pratica filosofica, e per questo fu condannato a morte. La sua figura segna il confine simbolico tra il pensiero che cerca e il potere che teme la ricerca.",
            link: "filosofia/classica.html",
            linkTesto: "Esplora la filosofia classica"
          }, {
            nome: "Eraclito",
            iniziale: "Η",
            anno: "535–475 a.C.",
            citazione: "Nessun uomo entra due volte nello stesso fiume.",
            fonte: "Frammento B91",
            commento: "Il fiume è l'immagine del divenire: tutto scorre, nulla resta identico. Eraclito pensa il mondo come tensione e armonia degli opposti. Il suo frammento è forse il più citato della filosofia antica, e il più frainteso.",
            link: "filosofia/antica.html",
            linkTesto: "Esplora la filosofia antica"
          }, {
            nome: "Platone",
            iniziale: "Π",
            anno: "427–347 a.C.",
            citazione: "La meraviglia è l'inizio della filosofia.",
            fonte: "Teeteto, 155d",
            commento: "La meraviglia è ciò che ci apre al pensiero. Platone fonda la filosofia come domanda radicale sull'essere, e la sua caverna resta la metafora più potente della condizione umana: prigionieri di ombre, in cerca della luce.",
            link: "articoli/platonismo.html",
            linkTesto: "Approfondisci il platonismo"
          }, {
            nome: "Aristotele",
            iniziale: "Α",
            anno: "384–322 a.C.",
            citazione: "L'uomo è per natura un animale politico.",
            fonte: "Politica, I, 1253a",
            commento: "L'uomo non è un atomo isolato: è un essere che si realizza nella città. Aristotele pensa la politica come continuazione dell'etica, e la felicità come attività dell'anima secondo virtù. La sua enciclopedia del sapere ha formato il pensiero occidentale per duemila anni.",
            link: "filosofia/classica.html",
            linkTesto: "Esplora la filosofia classica"
          }, {
            nome: "Epicuro",
            iniziale: "Ε",
            anno: "341–270 a.C.",
            citazione: "La morte non è nulla per noi.",
            fonte: "Lettera a Meneceo, 124",
            commento: "La morte non ci riguarda: quando ci siamo noi, non c'è lei; quando c'è lei, non ci siamo noi. Epicuro non predica la fuga dal mondo, ma la liberazione dalle paure che ci impediscono di vivere. Il piacere, per lui, è assenza di dolore e serenità dell'anima.",
            link: "articoli/epicureismo.html",
            linkTesto: "Approfondisci l'epicureismo"
          }, {
            nome: "Epitteto",
            iniziale: "Ε",
            anno: "50–135 d.C.",
            citazione: "Alcune cose dipendono da noi, altre non dipendono da noi.",
            fonte: "Manuale, 1",
            commento: "Ciò che dipende da noi è solo il nostro giudizio. Epitteto, schiavo liberato, fa della filosofia una disciplina quotidiana di libertà interiore. La sua distinzione tra ciò che è in nostro potere e ciò che non lo è resta uno dei gesti più radicali del pensiero antico.",
            link: "articoli/stoicismo.html",
            linkTesto: "Approfondisci lo stoicismo"
          }, {
            nome: "Agostino d'Ippona",
            iniziale: "Α",
            anno: "354–430",
            citazione: "Il nostro cuore è inquieto finché non riposa in te.",
            fonte: "Confessioni, I, 1",
            commento: "Il cuore inquieto è il motore della ricerca. Agostino attraversa il pensiero greco e lo trasforma in preghiera: la verità non è un oggetto da possedere, ma una persona da amare. Le Confessioni sono il primo grande racconto dell'interiorità occidentale.",
            link: "filosofia/medievale.html",
            linkTesto: "Esplora la filosofia medievale"
          }, {
            nome: "René Descartes",
            iniziale: "R",
            anno: "1596–1650",
            citazione: "Penso, dunque sono.",
            fonte: "Discorso sul metodo, IV",
            commento: "Il dubbio è il metodo, non la meta. Descartes cerca un fondamento indubitabile e lo trova nel cogito: anche dubitando, penso. La filosofia moderna nasce da questa certezza minima e la costruzione del sapere riparte da zero.",
            link: "filosofia/moderna.html",
            linkTesto: "Esplora la filosofia moderna"
          }, {
            nome: "Blaise Pascal",
            iniziale: "B",
            anno: "1623–1662",
            citazione: "Il cuore ha le sue ragioni che la ragione non conosce.",
            fonte: "Pensieri, fr. 423",
            commento: "La ragione non basta a se stessa. Pascal, scienziato e credente, pensa l'uomo come essere fragile e grande insieme: schiavo della distrazione, capace di Dio. I Pensieri sono un'opera aperta, un laboratorio di domande radicali.",
            link: "filosofia/moderna.html",
            linkTesto: "Esplora la filosofia moderna"
          }, {
            nome: "Baruch Spinoza",
            iniziale: "B",
            anno: "1632–1677",
            citazione: "Deus sive Natura.",
            fonte: "Etica, IV, Prefazione",
            commento: "Dio non è fuori dalla natura: è la natura stessa. Spinoza costruisce un sistema in cui tutto segue necessità geometrica, e la libertà è comprendere questa necessità. L'Etica è forse il libro più radicale e più frainteso della filosofia moderna.",
            link: "filosofia/moderna.html",
            linkTesto: "Esplora la filosofia moderna"
          }, {
            nome: "Immanuel Kant",
            iniziale: "I",
            anno: "1724–1804",
            citazione: "Abbi il coraggio di servirti della tua propria ragione.",
            fonte: "Che cos'è l'Illuminismo?",
            commento: "L'Illuminismo è l'uscita dell'uomo dallo stato di minorità. Kant fa della ragione una pratica pubblica e politica: osa pensare, ma pensa in modo critico. La sua rivoluzione copernicana sposta il centro del conoscere dal mondo al soggetto.",
            link: "filosofia/moderna.html",
            linkTesto: "Esplora la filosofia moderna"
          }, {
            nome: "G.W.F. Hegel",
            iniziale: "G",
            anno: "1770–1831",
            citazione: "La verità è l'intero.",
            fonte: "Fenomenologia dello spirito, Prefazione",
            commento: "La verità non è una proposizione, è un processo. Hegel pensa la storia come dispiegarsi dello spirito, e il negativo come momento necessario del positivo. Il suo sistema è la cattedrale del pensiero moderno: grandioso, inquietante, inattuale.",
            link: "filosofia/moderna.html",
            linkTesto: "Esplora la filosofia moderna"
          }, {
            nome: "Søren Kierkegaard",
            iniziale: "S",
            anno: "1813–1855",
            citazione: "L'angoscia è la vertigine della libertà.",
            fonte: "Il concetto dell'angoscia",
            commento: "L'angoscia non è una malattia: è la vertigine della libertà. Kierkegaard oppone all'idealismo hegeliano l'esistenza singolare, fatta di scelte, salti, fede. La sua voce è quella di un pensatore che non vuole essere sistematico, ma esistenziale.",
            link: "filosofia/contemporanea.html",
            linkTesto: "Esplora la filosofia contemporanea"
          }, {
            nome: "Friedrich Nietzsche",
            iniziale: "F",
            anno: "1844–1900",
            citazione: "Dio è morto.",
            fonte: "La gaia scienza, §125",
            commento: "Dio è morto: non è una notizia teologica, è un evento culturale. Nietzsche diagnostica la crisi dei valori e annuncia l'oltreuomo. Il suo pensiero è una martellata sulla filosofia tradizionale, e una sfida a pensare senza consolazioni.",
            link: "filosofia/contemporanea.html",
            linkTesto: "Esplora la filosofia contemporanea"
          }, {
            nome: "Ludwig Wittgenstein",
            iniziale: "L",
            anno: "1889–1951",
            citazione: "Di ciò di cui non si può parlare, si deve tacere.",
            fonte: "Tractatus logico-philosophicus, 7",
            commento: "Il limite del linguaggio è il limite del mondo. Wittgenstein attraversa due volte la filosofia del Novecento: prima con il Tractatus, poi con le Ricerche filosofiche. Il suo pensiero è una terapia contro gli incantesimi del linguaggio.",
            link: "filosofia/contemporanea.html",
            linkTesto: "Esplora la filosofia contemporanea"
          }, {
            nome: "Albert Camus",
            iniziale: "A",
            anno: "1913–1960",
            citazione: "Bisogna immaginare Sisifo felice.",
            fonte: "Il mito di Sisifo",
            commento: "L'assurdo nasce dall'incontro tra la domanda umana e il silenzio del mondo. Camus non propone una soluzione, ma una rivolta: vivere senza consolazione, con lucidità. Sisifo, che spinge il masso, è felice perché sa.",
            link: "filosofia/contemporanea.html",
            linkTesto: "Esplora la filosofia contemporanea"
          }],
          e = o => document.getElementById(o),
          i = e("ecoGiornoDate"),
          a = e("ecoGiornoPortrait"),
          n = e("ecoGiornoNome"),
          t = e("ecoGiornoAnno"),
          l = e("ecoGiornoCitazione"),
          r = e("ecoGiornoFonte"),
          s = e("ecoGiornoCommento"),
          c = e("ecoGiornoLink"),
          m = e("ecoGiornoAltro");
        if (!n) return;
        let d = 0;

        function f(e) {
          const m = o[e];
          m && (d = e, a.innerHTML = '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><defs><radialGradient id="ecoPortraitGrad" cx="50%" cy="40%" r="60%"><stop offset="0%" stop-color="var(--gold)" stop-opacity="0.20"/><stop offset="100%" stop-color="var(--gold)" stop-opacity="0"/></radialGradient></defs><circle cx="50" cy="50" r="48" fill="var(--bg-soft)" stroke="var(--gold)" stroke-width="1.2"/><circle cx="50" cy="50" r="48" fill="url(#ecoPortraitGrad)"/><circle cx="50" cy="50" r="42" fill="none" stroke="var(--gold-line)" stroke-width="0.6" stroke-dasharray="2 4"/><text x="50" y="50" text-anchor="middle" dy="0.35em" font-family="Cinzel, serif" font-size="30" fill="var(--gold)" font-weight="500">' + m.iniziale + "</text></svg>", n.textContent = m.nome, t.textContent = m.anno, l.textContent = "«" + m.citazione + "»", r.textContent = m.fonte, s.textContent = m.commento, c.textContent = (m.linkTesto || "Leggi il pensiero completo") + " →", c.href = m.link || "#", i && (i.textContent = function() {
            const o = new Date;
            return ["domenica", "lunedì", "martedì", "mercoledì", "giovedì", "venerdì", "sabato"][o.getDay()] + " " + o.getDate() + " " + ["gennaio", "febbraio", "marzo", "aprile", "maggio", "giugno", "luglio", "agosto", "settembre", "ottobre", "novembre", "dicembre"][o.getMonth()]
          }()))
        }
        f(function() {
          const o = new Date,
            e = new Date(o.getFullYear(), 0, 0);
          return Math.floor((o - e) / 864e5)
        }() % o.length), m && m.addEventListener("click", (function() {
          if (o.length < 2) return void f(0);
          let e;
          do {
            e = Math.floor(Math.random() * o.length)
          } while (e === d);
          f(e)
        }))
      }()

  ! function() {
        "use strict";
        const e = {
            Bene: {
              titolo: "Bene",
              desc: "Che cos'è il bene? Per Platone è l'Idea suprema, il sole che illumina tutte le altre. Per Aristotele è la felicità come attività conforme a virtù. Per Kant è la legge morale dentro di noi. Per Lévinas è l'altro che ci chiama alla responsabilità.",
              filosofi: ["Platone", "Aristotele", "Kant", "Lévinas"],
              link: "articoli/platonismo.html"
            },
            "Verità": {
              titolo: "Verità",
              desc: "La verità è ciò che è. Ma come la conosciamo? Parmenide la identifica con l'essere; Platone la vede come reminiscenza; Aristotele la definisce adeguazione dell'intelletto alla cosa; Heidegger la pensa come disvelamento. La filosofia è, da sempre, una lotta per la verità.",
              filosofi: ["Parmenide", "Platone", "Aristotele", "Tommaso", "Heidegger"],
              link: "filosofia/classica.html"
            },
            "Libertà": {
              titolo: "Libertà",
              desc: "Siamo davvero liberi? Gli stoici la pensano come accettazione del destino; Spinoza come comprensione della necessità; Kant come autonomia della volontà; Sartre come condanna. La libertà è il problema più radicale dell'esistenza umana.",
              filosofi: ["Epitteto", "Spinoza", "Kant", "Sartre"],
              link: "articoli/stoicismo.html"
            },
            Anima: {
              titolo: "Anima",
              desc: "L'anima è ciò che anima il corpo. Per Platone è prigioniera e cerca il ritorno alle Idee; per Aristotele è forma del corpo; per Agostino è l'uomo interiore; per Descartes è la res cogitans. Il rapporto anima-corpo attraversa tutta la storia della filosofia.",
              filosofi: ["Platone", "Aristotele", "Agostino", "Descartes"],
              link: "filosofia/antica.html"
            },
            Tempo: {
              titolo: "Tempo",
              desc: "Che cos'è il tempo? Eraclito vede il divenire come fiume; Agostino confessa di non saperlo, ma lo pensa come distensione dell'anima; Kant lo considera forma del senso interno; Bergson lo distingue dalla durata; Heidegger lo lega all'essere-per-la-morte.",
              filosofi: ["Eraclito", "Agostino", "Kant", "Bergson", "Heidegger"],
              link: "filosofia/contemporanea.html"
            },
            Male: {
              titolo: "Male",
              desc: "Da dove viene il male? Agostino lo pensa come privazione del bene; Leibniz come parte di un ordine più grande; Kant come male radicale; Nietzsche come eredità del platonismo; Arendt come banalità. Il problema del male è il cuore della teodicea.",
              filosofi: ["Agostino", "Leibniz", "Kant", "Nietzsche", "Arendt"],
              link: "filosofia/moderna.html"
            },
            Dio: {
              titolo: "Dio",
              desc: "Dio è il nome di ciò che ci supera. Anselmo lo dimostra con l'argomento ontologico; Tommaso con le cinque vie; Spinoza lo identifica con la Natura; Pascal ne fa il Dio del cuore; Nietzsche ne annuncia la morte. Ogni epoca ha pensato Dio a modo suo.",
              filosofi: ["Anselmo", "Tommaso", "Spinoza", "Pascal", "Nietzsche"],
              link: "filosofia/medievale.html"
            },
            Amore: {
              titolo: "Amore",
              desc: "L'amore è forza cosmica e legame umano. Per Platone è Eros, figlio di Poros e Penia, che spinge verso il bello; per Aristotele è philia, amicizia politica; per Agostino è caritas; per Kierkegaard è dono che si fa senza garanzia. Amare è pensare l'altro.",
              filosofi: ["Platone", "Aristotele", "Agostino", "Kierkegaard"],
              link: "filosofia/classica.html"
            }
          },
          o = e => document.getElementById(e),
          a = o("atlanteMap");
        if (!a) return;
        const i = o("atlanteInfoEmpty"),
          t = o("atlanteInfoContent"),
          l = o("atlanteInfoTitle"),
          n = o("atlanteInfoDesc"),
          s = o("atlanteFilosofi"),
          r = o("atlanteInfoLink"),
          c = o("atlanteInfoClose");
        let d = null;

        function m(o) {
          const c = e[o];
          if (!c) return;
          a.querySelectorAll(".atlante-node.active").forEach((e => e.classList.remove("active"))), a.querySelectorAll(".atlante-links line.active").forEach((e => e.classList.remove("active")));
          const m = a.querySelector('.atlante-node[data-concept="' + o + '"]');
          m && m.classList.add("active");
          const f = a.querySelector('.atlante-links line[data-link="' + o + '"]');
          f && f.classList.add("active"), l.textContent = c.titolo, n.textContent = c.desc, s.innerHTML = c.filosofi.map((e => "<span>" + e + "</span>")).join(""), r.href = c.link || "#", i.hidden = !0, t.hidden = !1, d = o
        }
        a.querySelectorAll(".atlante-node[data-concept]").forEach((e => {
          const o = e.dataset.concept;
          e.addEventListener("click", (() => m(o))), e.addEventListener("keydown", (e => {
            "Enter" !== e.key && " " !== e.key || (e.preventDefault(), m(o))
          }))
        })), c && c.addEventListener("click", (function() {
          a.querySelectorAll(".atlante-node.active").forEach((e => e.classList.remove("active"))), a.querySelectorAll(".atlante-links line.active").forEach((e => e.classList.remove("active"))), d = null, t.hidden = !0, i.hidden = !1
        }))
      }()

   ! function() {
        "use strict";
        const e = document.getElementById("uaGrid");
        if (!e) return;
        const t = [{
            title: "La caverna di Platone",
            category: "Platonismo",
            date: "2025-01-15",
            excerpt: "La metafora più celebre della filosofia occidentale, letta come percorso di liberazione dalla superficie delle apparenze.",
            url: "articoli/platonismo.html"
          }, {
            title: "Lo stoicismo oggi",
            category: "Stoicismo",
            date: "2025-01-10",
            excerpt: "Perché Epitteto e Marco Aurelio parlano ancora al nostro presente: virtù, destino, padronanza di sé.",
            url: "articoli/stoicismo.html"
          }, {
            title: "Epicuro e il piacere",
            category: "Epicureismo",
            date: "2025-01-06",
            excerpt: "Il piacere non è eccesso: è assenza di dolore e serenità dell'anima. Una lettura del Giardino.",
            url: "articoli/epicureismo.html"
          }, {
            title: "Le Upanishad",
            category: "Filosofia indiana",
            date: "2025-01-02",
            excerpt: "Un viaggio nel pensiero vedico, tra atman e brahman, e il problema dell'identità ultima.",
            url: "articoli/filosofia-indiana.html"
          }],
          a = ["gennaio", "febbraio", "marzo", "aprile", "maggio", "giugno", "luglio", "agosto", "settembre", "ottobre", "novembre", "dicembre"];

        function i(e) {
          return String(e || "").replace(/[&<>"']/g, (e => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
          } [e])))
        }

        function o(t) {
          const o = t.slice().sort(((e, t) => {
            const a = e.date ? new Date(e.date).getTime() : 0;
            return (t.date ? new Date(t.date).getTime() : 0) - a
          })).slice(0, 4);
          o.length ? e.innerHTML = o.map((e => {
            const t = function(e) {
                if (!e) return "";
                const t = new Date(e);
                return isNaN(t) ? e : t.getDate() + " " + a[t.getMonth()] + " " + t.getFullYear()
              }(e.date),
              o = e.category || "Articolo",
              r = e.url || "#",
              n = e.excerpt || e.text || "";
            return '<a class="ua-card" href="' + i(r) + '"><span class="ua-cat">' + i(o) + "</span><h4>" + i(e.title || "Senza titolo") + "</h4>" + (t ? '<span class="ua-date">' + i(t) + "</span>" : "") + '<p class="ua-excerpt">' + i(n) + '</p><span class="ua-link">Leggi →</span></a>'
          })).join("") : e.innerHTML = '<p class="ua-empty">Nessun articolo ancora pubblicato.</p>'
        }!async function() {
          try {
            const e = await fetch("articoli-index.json", {
              cache: "no-cache"
            });
            if (!e.ok) throw new Error("no file");
            const t = await e.json();
            if (Array.isArray(t) && t.length) return void o(t);
            throw new Error("empty")
          } catch (e) {
            o(t)
          }
        }()
      }()

 ! function() {
        "use strict";
        const e = document.getElementById("diFeatured");
        if (!e) return;
        const i = [{
          sinistra: {
            nome: "Socrate",
            iniziale: "Σ"
          },
          destra: {
            nome: "Nietzsche",
            iniziale: "N"
          },
          tema: "La virtù",
          titolo: "La virtù è insegnabile?",
          abstract: "Socrate sostiene che la virtù sia conoscenza e quindi insegnabile. Nietzsche ribatte che la virtù è creazione di valori, e nessuno può insegnare a creare. Un dialogo sull'educazione, la libertà e il ruolo del maestro.",
          link: "articoli/dialoghi/socrate-nietzsche.html"
        }, {
          sinistra: {
            nome: "Ipazia",
            iniziale: "Υ"
          },
          destra: {
            nome: "Kant",
            iniziale: "K"
          },
          tema: "Lo spazio",
          titolo: "Lo spazio è dentro o fuori di noi?",
          abstract: "Ipazia, astronoma e filosofa alessandrina, pensa lo spazio come ordine cosmico. Kant lo pensa come forma a priori della sensibilità. Un dialogo sul confine tra matematica, esperienza e conoscenza.",
          link: "articoli/dialoghi/ipazia-kant.html"
        }, {
          sinistra: {
            nome: "Eraclito",
            iniziale: "Η"
          },
          destra: {
            nome: "Heidegger",
            iniziale: "H"
          },
          tema: "Il tempo",
          titolo: "Il fiume è lo stesso o sempre altro?",
          abstract: "Eraclito vede nel fiume l'immagine del divenire. Heidegger legge il frammento come esperienza originaria dell'essere. Un dialogo sul tempo, la permanenza e la differenza.",
          link: "articoli/dialoghi/eraclito-heidegger.html"
        }, {
          sinistra: {
            nome: "Agostino",
            iniziale: "Α"
          },
          destra: {
            nome: "Sartre",
            iniziale: "S"
          },
          tema: "Il tempo interiore",
          titolo: "Il passato esiste ancora?",
          abstract: "Agostino pensa il tempo come distensione dell'anima: passato, presente e futuro esistono solo nell'interiorità. Sartre pensa l'esistenza come progetto gettato verso il futuro. Un dialogo sulla memoria, l'attesa e la libertà.",
          link: "articoli/dialoghi/agostino-sartre.html"
        }, {
          sinistra: {
            nome: "Diogene",
            iniziale: "Δ"
          },
          destra: {
            nome: "Machiavelli",
            iniziale: "M"
          },
          tema: "Potere e libertà",
          titolo: "Si può vivere senza potere?",
          abstract: "Diogene cerca la libertà riducendo i bisogni e rifiutando le convenzioni. Machiavelli studia come limitare il potere e difendere la libertà civile. Un dialogo sull'ambizione, la responsabilità e il prezzo della libertà.",
          link: "articoli/dialoghi/diogene-machiavelli.html"
        }, {
          sinistra: {
            nome: "Gesù",
            iniziale: "Ι"
          },
          destra: {
            nome: "Nietzsche",
            iniziale: "N"
          },
          tema: "Amore e libertà",
          titolo: "E se il cristianesimo avesse tradito Gesù?",
          abstract: "Nietzsche accusa il cristianesimo di aver trasformato la debolezza in merito. Gesù lo interroga sul rischio opposto: che la forza diventi innocenza. Un dialogo su amore, compassione e risentimento.",
          link: "articoli/dialoghi/gesu-nietzsche.html"
        }, {
          sinistra: {
            nome: "Socrate",
            iniziale: "Σ"
          },
          destra: {
            nome: "Dostoevskij",
            iniziale: "Ф"
          },
          tema: "Ragione, fede e libertà",
          titolo: "L'uomo vuole davvero conoscere la verità?",
          abstract: "Socrate crede nella forza delle domande; Dostoevskij porta in scena un uomo capace di rifiutare perfino la felicità pur di non rinunciare alla propria libertà.",
          link: "articoli/dialoghi/socrate-dostoevskij.html"
        }, {
          sinistra: {
            nome: "Diogene",
            iniziale: "Δ"
          },
          destra: {
            nome: "Buddha",
            iniziale: "B"
          },
          tema: "Desiderio, distacco e libertà",
          titolo: "Per essere liberi bisogna smettere di desiderare?",
          abstract: "Il cinico greco provoca la società smascherandone le convenzioni; il Buddha cerca una via d'uscita dalla sofferenza attraverso la comprensione del desiderio.",
          link: "articoli/dialoghi/diogene-buddha.html"
              }, {
          sinistra: { nome: "Pascal", iniziale: "B" },
          destra:   { nome: "Epicuro", iniziale: "Ε" },
          tema: "Felicità e infinito",
          titolo: "Si può essere felici senza Dio?",
          abstract: "Pascal diagnostica l'inquietudine umana e il divertissement. Epicuro cerca la pace nel finito, tra desideri ridotti e amicizia. Un dialogo sulla felicità, la paura e l'infinito.",
          link: "articoli/dialoghi/pascal-epicuro.html"
        }, {
          sinistra: { nome: "Schopenhauer", iniziale: "A" },
          destra:   { nome: "Spinoza", iniziale: "B" },
          tema: "Necessità e libertà",
          titolo: "La libertà è comprendere o negare la necessità?",
          abstract: "Schopenhauer vede il mondo come volontà cieca e propone la negazione. Spinoza vede Deus sive Natura e propone la comprensione gioiosa. Un dialogo sulla necessità, la libertà e il senso della vita.",
          link: "articoli/dialoghi/schopenhauer-spinoza.html"
        }];

        function a(e) {
          return '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><circle cx="50" cy="50" r="48" fill="var(--bg-soft)" stroke="var(--gold)" stroke-width="1.2"/><circle cx="50" cy="50" r="42" fill="none" stroke="var(--gold-line)" stroke-width="0.6" stroke-dasharray="2 4"/><text x="50" y="50" text-anchor="middle" dy="0.35em" font-family="Cinzel, serif" font-size="32" fill="var(--gold)" font-weight="500">' + e + "</text></svg>"
        }

        function t(e) {
          return String(e || "").replace(/[&<>"']/g, (e => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
          } [e])))
        }
        let o = 0;

        function n(n) {
          const l = i[n];
          l && (o = n, e.innerHTML = '<div class="di-portraits"><div class="di-portrait">' + a(l.sinistra.iniziale) + '<span class="di-name">' + t(l.sinistra.nome) + '</span></div><div class="di-vs" aria-hidden="true">×</div><div class="di-portrait">' + a(l.destra.iniziale) + '<span class="di-name">' + t(l.destra.nome) + '</span></div></div><div class="di-content"><span class="di-theme">Tema: ' + t(l.tema) + '</span><h4 class="di-title">' + t(l.titolo) + '</h4><p class="di-abstract">' + t(l.abstract) + '</p><a class="di-link" href="' + t(l.link) + '">Leggi il dialogo completo →</a></div>')
        }
        const l = new Date,
          r = new Date(l.getFullYear(), 0, 0);
        n(Math.floor((l - r) / 864e5) % i.length);
        const s = document.getElementById("diAltro");
        s && s.addEventListener("click", (function() {
          if (i.length < 2) return;
          let e;
          do {
            e = Math.floor(Math.random() * i.length)
          } while (e === o);
          n(e)
        }))
      }()

     ! function() {
        "use strict";
        const e = document.getElementById("dilTitolo"),
          o = document.getElementById("dilScenario"),
          i = document.getElementById("dilOptions"),
          a = document.getElementById("dilResult"),
          n = document.getElementById("dilResultLabel"),
          s = document.getElementById("dilFilosofi"),
          l = document.getElementById("dilCommento"),
          t = document.getElementById("dilResultClose"),
          r = document.getElementById("dilAltro");
        if (!e || !i) return;
        const c = [{
          titolo: "Il carrello impazzito",
          scenario: "Un carrello ferroviario fuori controllo sta per travolgere cinque persone legate sui binari. Puoi azionare una leva che devierà il carrello su un binario secondario, dove è legata una sola persona. <em>Che cosa fai?</em>",
          opzioni: [{
            breve: "Tiro la leva",
            testo: "Salvo cinque persone al costo di una.",
            filosofi: [{
              nome: "Bentham",
              scuola: "Utilitarismo",
              risposta: "Tirare la leva. La morale consiste nel massimizzare la felicità del maggior numero: cinque vite pesano più di una. Non c'è spazio per i sentimentalismi."
            }, {
              nome: "Mill",
              scuola: "Utilitarismo",
              risposta: "Tirare la leva, ma con cautela: non tutte le vite hanno lo stesso «valore qualitativo». L'utilitarismo non è aritmetica cieca, è calcolo ragionato delle conseguenze."
            }, {
              nome: "Sartre",
              scuola: "Esistenzialismo",
              risposta: "Qualunque scelta è legittima, purché tu la assuma fino in fondo. Non esiste una risposta giusta in astratto: esiste la tua scelta, e la responsabilità che ne porti."
            }],
            commento: "L'utilitarismo classico è la posizione più intuitiva per molti: scegliere di salvare il maggior numero di vite. Ma è anche la più contestata, perché tratta le persone come contenitori di utilità."
          }, {
            breve: "Non faccio nulla",
            testo: "Lascio che il carrello prosegua la sua corsa.",
            filosofi: [{
              nome: "Kant",
              scuola: "Deontologia",
              risposta: "Non tirare la leva. Non puoi usare la persona legata sul binario secondario come mezzo per salvare le altre: l'umanità va trattata sempre anche come fine, mai solo come mezzo."
            }, {
              nome: "Tommaso d'Aquino",
              scuola: "Tomismo",
              risposta: "Non tirare la leva. Il male non va mai commesso, nemmeno per ottenere un bene maggiore. La dottrina del duplice effetto non giustifica l'uccisione diretta di un innocente."
            }, {
              nome: "Arendt",
              scuola: "Fenomenologia politica",
              risposta: "Non tirare la leva. Agire significa assumersi la responsabilità del mondo che si contribuisce a creare. Non ogni calcolo è una scelta morale: a volte la scelta è proprio rifiutare il calcolo."
            }],
            commento: "La posizione deontologica difende l'intangibilità della persona: non si usa un essere umano come strumento, anche per un bene più grande. È una posizione scomoda, ma coerente."
          }]
        }, {
          titolo: "La nave di Teseo",
          scenario: "La nave di Teseo è conservata in porto. A poco a poco, ogni asse marcio viene sostituito con uno nuovo, finché tutte le parti originali sono state rimpiazzate. Le vecchie assi vengono rimontate in una seconda nave. <em>Quale delle due è la nave di Teseo?</em>",
          opzioni: [{
            breve: "La nave ricostruita",
            testo: "È la stessa nave solo se è fatta degli stessi pezzi originali.",
            filosofi: [{
              nome: "Aristotele",
              scuola: "Metafisica",
              risposta: "La nave ricostruita. L'identità dipende dalla materia e dalla forma: se le parti originali sono ricomposte secondo la stessa struttura, allora è la stessa nave."
            }, {
              nome: "Wittgenstein",
              scuola: "Filosofia del linguaggio",
              risposta: "La domanda è mal posta. «La stessa nave» non ha un significato univoco: dipende da ciò che intendiamo per «stessa». Il problema non è nella nave, ma nel nostro linguaggio."
            }],
            commento: "Chi privilegia la materia pensa che l'identità sia nei pezzi. Chi privilegia il linguaggio pensa che il problema sia un gioco di parole, non un fatto del mondo."
          }, {
            breve: "La nave in porto",
            testo: "È la stessa nave anche se ha tutti pezzi nuovi: conta la continuità.",
            filosofi: [{
              nome: "Locke",
              scuola: "Empirismo",
              risposta: "La nave in porto. L'identità non è nella materia ma nella continuità della coscienza e della funzione: la nave che ha continuato a navigare è la stessa, come un uomo che cambia tutte le cellule ma resta lo stesso uomo."
            }, {
              nome: "Hume",
              scuola: "Empirismo scettico",
              risposta: "Nessuna delle due. L'identità è una finzione della nostra mente: percepiamo solo un fascio di impressioni che si susseguono. La «nave» è un nome che diamo a un insieme di sensazioni, non una sostanza."
            }, {
              nome: "Parfit",
              scuola: "Filosofia analitica",
              risposta: "Nessuna delle due, e non importa. L'identità personale non è ciò che conta davvero: contano la continuità psicologica e la sopravvivenza di ciò che ci sta a cuore. Il problema della nave è un falso problema."
            }],
            commento: "Locke anticipa le teorie moderne della continuità psicologica; Hume e Parfit dissolvono il problema. L'identità, per loro, non è una cosa che si possiede: è una costruzione, o un'illusione utile."
          }]
        }, {
          titolo: "L'anello di Gige",
          scenario: "Un pastore trova un anello che, ruotato, lo rende invisibile. Nessuno può vederlo, nessuno può giudicarlo, nessuno può punirlo. Può fare qualunque cosa senza conseguenze. <em>Che cosa faresti?</em>",
          opzioni: [{
            breve: "Userei l'anello",
            testo: "Se nessuno mi vede, posso agire secondo il mio interesse.",
            filosofi: [{
              nome: "Glaucone",
              scuola: "Platone, Repubblica",
              risposta: "Userei l'anello. La giustizia è una convenzione: chi è davvero libero dalle conseguenze agisce per il proprio vantaggio. L'uomo giusto lo è solo perché teme la punizione."
            }, {
              nome: "Callicle",
              scuola: "Sofistica",
              risposta: "Userei l'anello, senza ipocrisia. La legge è dei deboli contro i forti: chi ha la forza di fare ciò che vuole, lo faccia. La morale è una gabbia per chi non ha potere."
            }, {
              nome: "Nietzsche",
              scuola: "Filosofia della potenza",
              risposta: "Dipende da chi sei. Se sei forte, l'anello non ti serve: la tua virtù è la tua potenza. Se sei debole, userai l'anello per vendicarti — e rivelerai la tua schiavitù interiore."
            }],
            commento: "La posizione di Glaucone è la sfida più radicale alla morale: se puoi fare ciò che vuoi senza conseguenze, perché dovresti essere giusto? È il problema che Platone cerca di risolvere in tutta la Repubblica."
          }, {
            breve: "Non userei l'anello",
            testo: "La giustizia vale anche quando nessuno mi vede.",
            filosofi: [{
              nome: "Socrate",
              scuola: "Platone, Repubblica",
              risposta: "Non userei l'anello. L'ingiustizia danneggia l'anima di chi la commette: chi agisce male, anche invisibile, si rende schiavo delle proprie passioni. Meglio subire l'ingiustizia che commetterla."
            }, {
              nome: "Kant",
              scuola: "Deontologia",
              risposta: "Non userei l'anello. La legge morale non dipende dalle conseguenze: agisci in modo che la tua massima possa diventare legge universale. L'invisibilità non cambia nulla."
            }, {
              nome: "Epitteto",
              scuola: "Stoicismo",
              risposta: "Non userei l'anello. Ciò che dipende da me è solo il mio giudizio: la virtù non ha bisogno di testimoni. L'anello non mi rende più libero, mi rende più solo."
            }],
            commento: "La posizione di Socrate ribalta il problema: non è la punizione esterna a rendere morale l'atto, ma lo stato dell'anima. La morale non è un contratto sociale, è una cura di sé."
          }]
        }, {
          titolo: "La stanza cinese",
          scenario: "Un uomo chiuso in una stanza riceve fogli con simboli cinesi e, seguendo un manuale, risponde con altri simboli cinesi. Dall'esterno, le risposte sembrano quelle di un parlante cinese. <em>L'uomo capisce il cinese?</em>",
          opzioni: [{
            breve: "No, non capisce",
            testo: "Manipola simboli senza comprenderne il significato.",
            filosofi: [{
              nome: "Searle",
              scuola: "Filosofia della mente",
              risposta: "No. La sintassi non è semantica: manipolare simboli secondo regole non equivale a comprendere. Un computer non capisce il linguaggio, esegue istruzioni. La mente non è un programma."
            }, {
              nome: "Nagel",
              scuola: "Filosofia della mente",
              risposta: "No. C'è qualcosa che si prova a essere un parlante cinese, un'esperienza soggettiva che nessuna descrizione funzionale può catturare. La coscienza non è calcolabile."
            }],
            commento: "Searle vuole mostrare che l'intelligenza artificiale forte è impossibile: la comprensione richiede un'intenzionalità che nessun algoritmo può produrre. La stanza cinese è il suo argomento più celebre."
          }, {
            breve: "Sì, in un certo senso",
            testo: "Il sistema nel suo insieme capisce, anche se l'uomo no.",
            filosofi: [{
              nome: "Dennett",
              scuola: "Funzionalismo",
              risposta: "Sì, in un certo senso. La domanda «l'uomo capisce?» è mal posta: il soggetto cognitivo non è l'uomo, è il sistema uomo+manuale+stanza. La comprensione è una funzione, non un luogo."
            }, {
              nome: "Putnam",
              scuola: "Funzionalismo",
              risposta: "Sì, se la funzione è realizzata. La mente è ciò che il cervello fa, non ciò di cui è fatto. Se il sistema produce comportamenti linguistici appropriati, allora in qualche misura comprende."
            }, {
              nome: "Chalmers",
              scuola: "Filosofia della mente",
              risposta: "La domanda è giusta, la risposta è difficile. La comprensione richiede coscienza, e la coscienza è il «problema difficile». La stanza cinese mostra che l'AI può simulare, non che possa essere cosciente."
            }],
            commento: "I funzionalisti spostano il problema: la comprensione non è un fatto privato, è una funzione del sistema. Searle risponde che nessuna funzione, per quanto complessa, produce l'esperienza soggettiva. Il dibattito è ancora aperto."
          }]
        }];

        function u(e) {
          return String(e || "").replace(/[&<>"']/g, (e => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
          } [e])))
        }
        let m = 0,
          d = null;

        function p(t) {
          m = t, d = c[t];
          const r = d;
          e.textContent = r.titolo, o.innerHTML = r.scenario, a.hidden = !0, s.innerHTML = "", l.textContent = "", n.textContent = "", i.innerHTML = "", r.opzioni.forEach(((e, o) => {
            const t = document.createElement("button");
            t.type = "button", t.className = "dil-option", t.dataset.idx = o, t.innerHTML = '<span class="label">Opzione ' + String.fromCharCode(65 + o) + '</span><span class="text">' + u(e.breve) + "</span>", t.addEventListener("click", (() => function(e) {
              if (!d) return;
              const o = d.opzioni[e];
              o && (i.querySelectorAll(".dil-option").forEach(((o, i) => {
                i === e ? o.classList.add("selected") : o.classList.add("dimmed")
              })), n.textContent = "Hai scelto: " + o.breve, s.innerHTML = o.filosofi.map((e => '<div class="dil-filosofo"><div class="nome">' + u(e.nome) + "<small>" + u(e.scuola) + '</small></div><div class="risposta">' + u(e.risposta) + "</div></div>")).join(""), l.textContent = o.commento || "", a.hidden = !1, a.scrollIntoView({
                behavior: "smooth",
                block: "nearest"
              }))
            }(o))), i.appendChild(t)
          }))
        }

        function g() {
          d && p(m)
        }
        const v = new Date,
          f = new Date(v.getFullYear(), 0, 0);
        p(Math.floor((v - f) / 864e5) % c.length), r && r.addEventListener("click", (function() {
          if (c.length < 2) return void g();
          let e;
          do {
            e = Math.floor(Math.random() * c.length)
          } while (e === m);
          p(e)
        })), t && t.addEventListener("click", g)
      }()

  ! function() {
        "use strict";
        const e = document.getElementById("filoTema"),
          o = document.getElementById("filoSub"),
          i = document.getElementById("filoSettimana"),
          t = document.getElementById("filoTappe"),
          a = document.getElementById("filoAltro");
        if (!e || !t) return;
        const l = {
            citazione: "Citazione",
            lettura: "Lettura",
            dialogo: "Dialogo",
            video: "Video",
            glossario: "Termine",
            esercizio: "Esercizio"
          },
          n = [{
            tema: "Il coraggio",
            sub: "Che cosa significa essere coraggiosi? Tra virtù e paura, tra misura e audacia. Un percorso in cinque tappe.",
            tappe: [{
              tipo: "citazione",
              titolo: "Aristotele, Etica Nicomachea",
              testo: "«Il coraggio è il giusto mezzo tra la temerarietà e la viltà.» La virtù non è l'assenza di paura, ma la sua misura.",
              link: null
            }, {
              tipo: "lettura",
              titolo: "La virtù in Aristotele",
              testo: "Il coraggio come virtù etica: la disposizione a scegliere il giusto mezzo tra gli estremi, secondo ragione.",
              link: "/filosofia/classica.html"
            }, {
              tipo: "dialogo",
              titolo: "Socrate × Nietzsche — La virtù è insegnabile?",
              testo: "Due modi opposti di pensare la virtù: conoscenza che si insegna, o creazione che nessuno può trasmettere.",
              link: "/articoli/dialoghi/socrate-nietzsche.html"
            }, {
              tipo: "glossario",
              titolo: "Phronesis",
              testo: "La saggezza pratica che guida il coraggio nelle situazioni concrete: non regola astratta, ma occhio che vede il caso.",
              link: "/pagine/glossario.html"
            }, {
              tipo: "esercizio",
              titolo: "Scrivi per cinque minuti",
              testo: "Racconta un momento in cui hai scelto di essere coraggioso. Che cosa hai temuto? Che cosa hai guadagnato? Il coraggio, per Aristotele, è sempre un atto concreto, mai una teoria.",
              link: null
            }]
          }, {
            tema: "Il tempo",
            sub: "Che cos'è il tempo? Passato che non è più, futuro che non è ancora, presente che sfugge. Un percorso in cinque tappe.",
            tappe: [{
              tipo: "citazione",
              titolo: "Agostino, Confessioni XI",
              testo: "«Che cos'è dunque il tempo? Se nessuno me lo chiede, lo so; se voglio spiegarlo a chi me lo chiede, non lo so.»",
              link: null
            }, {
              tipo: "lettura",
              titolo: "Il tempo in Agostino",
              testo: "Il tempo come distensione dell'anima: passato nella memoria, presente nell'attenzione, futuro nell'attesa.",
              link: "/filosofia/medievale.html"
            }, {
              tipo: "dialogo",
              titolo: "Eraclito × Heidegger — Il fiume è lo stesso o sempre altro?",
              testo: "Il divenire come logos o come evento dell'essere: due pensatori del tempo a confronto.",
              link: "/articoli/dialoghi/eraclito-heidegger.html"
            }, {
              tipo: "dialogo",
              titolo: "Agostino × Sartre — Il passato esiste ancora?",
              testo: "La memoria come luogo dell'incontro con Dio, o come zavorra che la libertà deve assumere.",
              link: "/articoli/dialoghi/agostino-sartre.html"
            }, {
              tipo: "esercizio",
              titolo: "Un minuto di presenza",
              testo: "Fermati un minuto. Che cosa stai vivendo? Non il passato, non il futuro: solo il presente. Prova a stare lì, senza giudicare. Il tempo, per Agostino, è abitabile solo nell'attenzione.",
              link: null
            }]
          }, {
            tema: "La libertà",
            sub: "Siamo davvero liberi? Tra destino, necessità e scelta. Un percorso in cinque tappe.",
            tappe: [{
              tipo: "citazione",
              titolo: "Epitteto, Manuale",
              testo: "«Alcune cose dipendono da noi, altre non dipendono da noi.» La libertà comincia dalla distinzione tra ciò che possiamo governare e ciò che dobbiamo accettare.",
              link: null
            }, {
              tipo: "lettura",
              titolo: "Lo stoicismo oggi",
              testo: "La libertà interiore come padronanza di sé: Epitteto, Seneca, Marco Aurelio. Non dipende dal mondo, dipende dal giudizio.",
              link: "/articoli/stoicismo.html"
            }, {
              tipo: "dialogo",
              titolo: "Socrate × Nietzsche — La virtù è insegnabile?",
              testo: "La libertà come conoscenza o come creazione: due vie opposte per pensare la scelta.",
              link: "/articoli/dialoghi/socrate-nietzsche.html"
            }, {
              tipo: "dialogo",
              titolo: "Agostino × Sartre — Il passato esiste ancora?",
              testo: "La libertà come grazia ricevuta o come condanna a scegliere senza fondamento.",
              link: "/articoli/dialoghi/agostino-sartre.html"
            }, {
              tipo: "esercizio",
              titolo: "Che cosa dipende da te?",
              testo: "Scrivi tre cose che ti preoccupano. Per ognuna, chiediti: dipende da me? Se sì, agisci. Se no, lasciarla andare è già un atto di libertà.",
              link: null
            }]
          }, {
            tema: "L'amore",
            sub: "Che cos'è l'amore? Mito, desiderio, dono, legame. Un percorso in cinque tappe.",
            tappe: [{
              tipo: "citazione",
              titolo: "Platone, Simposio",
              testo: "«Eros è figlio di Poros e Penia: non è dio né uomo, ma un demone che sta in mezzo, tra la ricchezza e la povertà, tra il sapere e l'ignoranza.»",
              link: null
            }, {
              tipo: "lettura",
              titolo: "Il platonismo",
              testo: "Eros come scala: dal corpo al bello, dal bello alla Bellezza, dalla Bellezza al Bene. L'amore come via filosofica.",
              link: "/articoli/platonismo.html"
            }, {
              tipo: "dialogo",
              titolo: "Socrate × Nietzsche — La virtù è insegnabile?",
              testo: "Il ruolo dell'altro nella formazione di sé: maestro o provocatore? Socrate e Nietzsche sull'educazione.",
              link: "/articoli/dialoghi/socrate-nietzsche.html"
            }, {
              tipo: "glossario",
              titolo: "Henosis",
              testo: "L'unione con l'Uno nel neoplatonismo: l'amore come desiderio di ciò che ci supera, culmine del percorso filosofico.",
              link: "/pagine/glossario.html"
            }, {
              tipo: "esercizio",
              titolo: "Che cosa ami davvero?",
              testo: "Pensa a una persona che ami. Che cosa ami di lei: un aspetto, un'azione, l'idea che hai di lei? Platone direbbe: ami l'idea del bello che in lei si manifesta. Prova a distinguere.",
              link: null
            }]
          }, {
            tema: "La verità",
            sub: "Che cos'è la verità? Corrispondenza, disvelamento, coerenza, funzione. Un percorso in cinque tappe.",
            tappe: [{
              tipo: "citazione",
              titolo: "Parmenide, Poema",
              testo: "«L'essere è, il non essere non è.» La prima grande distinzione della filosofia occidentale: tra la via della verità e la via dell'opinione.",
              link: null
            }, {
              tipo: "lettura",
              titolo: "La filosofia antica",
              testo: "Dai presocratici a Parmenide: la verità come essere, come necessità, come ciò che non muta.",
              link: "/filosofia/antica.html"
            }, {
              tipo: "dialogo",
              titolo: "Eraclito × Heidegger — Il fiume è lo stesso o sempre altro?",
              testo: "La verità come disvelamento che lotta contro il nascondimento: aletheia contro la verità-certezza della metafisica.",
              link: "/articoli/dialoghi/eraclito-heidegger.html"
            }, {
              tipo: "glossario",
              titolo: "Aletheia",
              testo: "Verità come «non-nascondimento»: il termine greco che Heidegger riscopre contro la tradizione latina della veritas.",
              link: "/pagine/glossario.html"
            }, {
              tipo: "esercizio",
              titolo: "Una cosa vera",
              testo: "Scrivi una cosa che sai essere vera senza ombra di dubbio. Poi chiediti: come lo so? Su che cosa si fonda la mia certezza? La verità, per molti filosofi, comincia da questa domanda.",
              link: null
            }]
          }, {
            tema: "La morte",
            sub: "Che cos'è la morte? Nulla, passaggio, compimento, enigma. Un percorso in cinque tappe.",
            tappe: [{
              tipo: "citazione",
              titolo: "Epicuro, Lettera a Meneceo",
              testo: "«La morte non è nulla per noi: quando ci siamo noi, non c'è lei; quando c'è lei, non ci siamo noi.»",
              link: null
            }, {
              tipo: "lettura",
              titolo: "L'epicureismo",
              testo: "La morte come evento che non ci riguarda: la filosofia come liberazione dalla paura che impedisce di vivere.",
              link: "/articoli/epicureismo.html"
            }, {
              tipo: "dialogo",
              titolo: "Agostino × Sartre — Il passato esiste ancora?",
              testo: "La memoria, l'attesa, la libertà di fronte all'ultima soglia: due modi di pensare il tempo finito.",
              link: "/articoli/dialoghi/agostino-sartre.html"
            }, {
              tipo: "glossario",
              titolo: "Atarassia",
              testo: "L'imperturbabilità dell'anima: l'ideale etico che nasce, in Epicuro, proprio dalla liberazione dalla paura della morte.",
              link: "/pagine/glossario.html"
            }, {
              tipo: "esercizio",
              titolo: "Memento mori",
              testo: "La tradizione stoica invita a ricordare la morte non per angoscia, ma per lucidità. Scrivi: se avessi un anno, che cosa faresti diversamente? La risposta dice che cosa conta per te.",
              link: null
            }]
          }];

        function s() {
          const e = new Date,
            o = new Date(e.getFullYear(), 0, 1),
            i = Math.floor((e - o) / 864e5);
          return Math.floor(i / 7)
        }

        function r(e) {
          return String(e || "").replace(/[&<>"']/g, (e => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
          } [e])))
        }
        let c = 0;

        function m(a) {
          const m = n[a];
          m && (c = a, e.textContent = m.tema, o.textContent = m.sub, i && (i.textContent = "Settimana " + (s() + 1)), t.innerHTML = m.tappe.map(((e, o) => {
            const i = l[e.tipo] || e.tipo,
              t = e.link ? '<a class="filo-link" href="' + r(e.link) + '">Vai →</a>' : "";
            return '<li class="filo-tappa"><div class="filo-num">' + (o + 1) + '</div><div class="filo-contenuto"><span class="filo-tipo tipo-' + r(e.tipo) + '">' + r(i) + '</span><h4 class="filo-titolo">' + r(e.titolo) + '</h4><p class="filo-testo">' + r(e.testo) + "</p>" + t + "</div></li>"
          })).join(""))
        }
        m(s() % n.length), a && a.addEventListener("click", (function() {
          m((c + 1) % n.length)
        }))
      }()
