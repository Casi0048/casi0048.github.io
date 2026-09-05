/* ================================================================
   ECHI DI SOFIA
   MOTORE SPERIMENTALE DI TRADUZIONE ARTICOLI
   IT / PL / EN

   TEST:
   - rileva automaticamente l'articolo corrente
   - cerca il relativo dizionario "translations"
   - se non esiste, NON modifica nulla
   - se esiste, applica le traduzioni disponibili
   - gestisce titolo, testi, immagini e lingua HTML
   ================================================================ */

document.addEventListener('DOMContentLoaded', function () {

    'use strict';

    console.log('🌐 Echi di Sofia — motore traduzione avviato');


    /* ============================================================
       1. VERIFICA DEL DIZIONARIO
       ============================================================ */

    if (typeof translations === 'undefined') {

        console.log(
            'ℹ️ Nessuna traduzione presente in questo articolo.'
        );

        return;
    }


    /* ============================================================
       2. CAMBIO LINGUA
       ============================================================ */

    function changeLanguage(lang) {

        const data = translations[lang];

        if (!data) {

            console.warn(
                '⚠️ Traduzione non disponibile:',
                lang
            );

            return;
        }


        /* --------------------------------------------------------
           TESTI CON data-i18n
           -------------------------------------------------------- */

        document
            .querySelectorAll('[data-i18n]')
            .forEach(function (element) {

                const key = element.dataset.i18n;

                if (data[key] !== undefined) {

                    element.innerHTML = data[key];
                }
            });


        /* --------------------------------------------------------
           TITOLO DELLA PAGINA
           -------------------------------------------------------- */

        const title =
            document.querySelector('title');

        if (title) {

            const attribute =
                'data-title-' + lang;

            if (title.hasAttribute(attribute)) {

                document.title =
                    title.getAttribute(attribute);

            } else if (data.title) {

                document.title =
                    data.title;
            }
        }


        /* --------------------------------------------------------
           ALT DELLE IMMAGINI
           -------------------------------------------------------- */

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


        /* --------------------------------------------------------
           JĘZYK / LANGUAGE HTML
           -------------------------------------------------------- */

        document.documentElement.lang = lang;


        /* --------------------------------------------------------
           PULSANTE ATTIVO
           -------------------------------------------------------- */

        document
            .querySelectorAll('.language-switcher button')
            .forEach(function (button) {

                button.classList.toggle(
                    'active',
                    button.dataset.lang === lang
                );
            });


        /* --------------------------------------------------------
           MEMORIA
           -------------------------------------------------------- */

        localStorage.setItem(
            'echiLanguage',
            lang
        );


        console.log(
            '🌐 Lingua cambiata:',
            lang
        );
    }


    /* ============================================================
       3. PULSANTI IT / PL / EN
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
       4. LINGUA INIZIALE
       ============================================================ */

    const savedLanguage =
        localStorage.getItem('echiLanguage') || 'it';

    changeLanguage(savedLanguage);


    /* ============================================================
       5. DIAGNOSTICA
       ============================================================ */

    console.log(
        '🌐 Lingue disponibili:',
        Object.keys(translations)
    );

    console.log(
        '🌐 Elementi traducibili:',
        document.querySelectorAll('[data-i18n]').length
    );

});
