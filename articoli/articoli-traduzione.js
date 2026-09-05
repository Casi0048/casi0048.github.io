/* ================================================================
   ECHI DI SOFIA — MOTORE COMUNE DI TRADUZIONE DEGLI ARTICOLI
   IT / PL / EN

   Ogni articolo deve possedere il proprio:
       const translations = { ... };

   Il presente file gestisce esclusivamente:
   - elementi [data-i18n]
   - <title>
   - attributi alt delle immagini
   - lingua HTML
   - pulsanti IT / PL / EN
   - memoria della lingua scelta
   ================================================================ */

document.addEventListener('DOMContentLoaded', function () {

    'use strict';

    /* ============================================================
       CAMBIO LINGUA
       ============================================================ */

    function changeLanguage(lang) {

        /* Controlla che l'articolo abbia le traduzioni richieste */
        if (
            typeof translations === 'undefined' ||
            !translations[lang]
        ) {
            console.warn(
                'Traduzione non disponibile:',
                lang
            );
            return;
        }

        const data = translations[lang];


        /* ========================================================
           1. TESTI DELL'ARTICOLO
           ======================================================== */

        document
            .querySelectorAll('[data-i18n]')
            .forEach(function (element) {

                const key = element.dataset.i18n;

                if (data[key] !== undefined) {
                    element.innerHTML = data[key];
                }
            });


        /* ========================================================
           2. TITOLO DELLA PAGINA
           ======================================================== */

        const titleElement =
            document.querySelector('title');

        if (titleElement) {

            const attribute =
                'data-title-' + lang;

            if (titleElement.hasAttribute(attribute)) {

                document.title =
                    titleElement.getAttribute(attribute);

            } else if (data.title) {

                document.title = data.title;
            }
        }


        /* ========================================================
           3. TESTO ALTERNATIVO DELLE IMMAGINI
           ======================================================== */

        document
            .querySelectorAll('img')
            .forEach(function (img) {

                const attribute =
                    'data-alt-' + lang;

                if (img.hasAttribute(attribute)) {

                    img.alt =
                        img.getAttribute(attribute);
                }
            });


        /* ========================================================
           4. LINGUA DEL DOCUMENTO HTML
           ======================================================== */

        document.documentElement.lang = lang;


        /* ========================================================
           5. PULSANTE LINGUA ATTIVO
           ======================================================== */

        document
            .querySelectorAll('.language-switcher button')
            .forEach(function (button) {

                button.classList.toggle(
                    'active',
                    button.dataset.lang === lang
                );
            });


        /* ========================================================
           6. MEMORIZZA LA LINGUA SCELTA
           ======================================================== */

        localStorage.setItem(
            'echiLanguage',
            lang
        );
    }


    /* ============================================================
       PULSANTI IT / PL / EN
       ============================================================ */

    document
        .querySelectorAll('.language-switcher button')
        .forEach(function (button) {

            button.addEventListener(
                'click',
                function () {

                    changeLanguage(
                        this.dataset.lang
                    );

                }
            );
        });


    /* ============================================================
       LINGUA INIZIALE
       ============================================================ */

    const savedLanguage =
        localStorage.getItem('echiLanguage') || 'it';

    changeLanguage(savedLanguage);

});
