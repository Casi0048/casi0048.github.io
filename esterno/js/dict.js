
// ============================================================
//  MODALE DIZIONARIO — VERSIONE A (GSAP Smooth)
// ============================================================
document.addEventListener("DOMContentLoaded", () => {

    console.log("📘 Dizionario GSAP attivo");

    const btnOpen   = document.getElementById("openDict");
    const btnClose  = document.getElementById("dict-close");
    const modal     = document.getElementById("dict-modal");
    const overlay   = document.getElementById("dict-overlay");

    const input     = document.getElementById("dict-q");
    const btnSearch = document.getElementById("dict-search");
    const btnOpenAll = document.getElementById("open-all");

    if (!btnOpen || !modal || !btnClose || !overlay) {
        console.error("❌ Dizionario: elementi mancanti");
        return;
    }

    /* ========== APRI MODALE ========== */
    btnOpen.addEventListener("click", () => {
        gsap.to(modal, {
            x: 0,
            duration: 0.35,
            ease: "power3.out"
        });
        gsap.to(overlay, {
            opacity: 1,
            pointerEvents: "auto",
            duration: 0.25
        });
        console.log("📘 Modale aperto (GSAP)");
    });

    /* ========== CHIUDI MODALE ========== */
    function closeDict() {
        gsap.to(modal, {
            x: "100%",
            duration: 0.30,
            ease: "power3.in"
        });
        gsap.to(overlay, {
            opacity: 0,
            pointerEvents: "none",
            duration: 0.25
        });
    }

    btnClose.addEventListener("click", closeDict);
    overlay.addEventListener("click", closeDict);


    /* ========== RICERCA ========== */
    btnSearch.addEventListener("click", () => {
        const q = input.value.trim();
        if (!q) return;

        const enc = encodeURIComponent(q);
        const list = modal.querySelectorAll(".sources input:checked");

        list.forEach(chk => {
            const finalURL = chk.dataset.url.replace("{q}", enc);
            window.open(finalURL, "_blank", "noopener");
        });
    });

    /* ========== APRI TUTTE ========== */
    btnOpenAll.addEventListener("click", () => {
        const q = input.value.trim();
        if (!q) return;

        const enc = encodeURIComponent(q);
        const list = modal.querySelectorAll(".sources input");

        list.forEach(chk => {
            const finalURL = chk.dataset.url.replace("{q}", enc);
            window.open(finalURL, "_blank", "noopener");
        });
    });
});
/* ===== AGGIUNTO ===== */

// Gestione Dizionario Filosofico
document.addEventListener('DOMContentLoaded', function() {
    const dictBtn = document.getElementById('openDict');
    const dictModal = document.getElementById('dict-modal');
    const dictOverlay = document.getElementById('dict-overlay');
    const dictClose = document.getElementById('dict-close');
    const dictSearch = document.getElementById('dict-search');
    const dictQ = document.getElementById('dict-q');
    const openAll = document.getElementById('open-all');

    // Apri dizionario
    dictBtn.addEventListener('click', function() {
        dictModal.classList.add('open');
        dictOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        dictQ.focus();
    });

    // Chiudi dizionario
    function closeDict() {
        dictModal.classList.remove('open');
        dictOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    dictClose.addEventListener('click', closeDict);
    dictOverlay.addEventListener('click', closeDict);

    // Chiudi con ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && dictModal.classList.contains('open')) {
            closeDict();
        }
    });

    // Ricerca nel dizionario
    dictSearch.addEventListener('click', function() {
        const query = dictQ.value.trim();
        if (!query) return;

        const sources = document.querySelectorAll('.sources input:checked');
        sources.forEach(source => {
            const url = source.getAttribute('data-url').replace('{q}', encodeURIComponent(query));
            window.open(url, '_blank');
        });
    });

    // Apri tutte le fonti
    openAll.addEventListener('click', function() {
        const query = dictQ.value.trim() || 'philosophy';
        const sources = document.querySelectorAll('.sources input');
        sources.forEach(source => {
            const url = source.getAttribute('data-url').replace('{q}', encodeURIComponent(query));
            window.open(url, '_blank');
        });
    });

    // Ricerca con Enter
    dictQ.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            dictSearch.click();
        }
    });

    // Suggerimenti automatici
    dictQ.addEventListener('input', function() {
        const suggestions = document.getElementById('dict-suggestions');
        const query = this.value.trim().toLowerCase();
        
        if (query.length < 2) {
            suggestions.innerHTML = '';
            return;
        }

        const terms = [
            'metafisica', 'epistemologia', 'etica', 'estetica', 'logica',
            'ontologia', 'fenomenologia', 'ermeneutica', 'esistenzialismo',
            'stoicismo', 'epicureismo', 'scetticismo', 'razionalismo', 'empirismo',
            'idealismo', 'materialismo', 'pragmatismo', 'strutturalismo',
            'post-strutturalismo', 'decostruzionismo', 'filosofia analitica',
            'filosofia continentale'
        ];

        const filtered = terms.filter(term => 
            term.includes(query) || term.startsWith(query)
        ).slice(0, 5);

        suggestions.innerHTML = filtered.map(term => 
            `<div class="suggestion-item" data-term="${term}">${term}</div>`
        ).join('');

        // Click su suggerimento
        suggestions.querySelectorAll('.suggestion-item').forEach(item => {
            item.addEventListener('click', function() {
                dictQ.value = this.getAttribute('data-term');
                suggestions.innerHTML = '';
                dictSearch.click();
            });
        });
    });
});
/* ===== JS PARADIGMA ===== */

// Gestione Overlay Filosofi Paradigma
class FilosofiOverlay {
    constructor() {
        this.btn = document.getElementById('paradigma-btn');
        this.overlay = document.getElementById('filosofi-overlay');
        this.hideTimeout = null;
        this.isVisible = false;
        
        this.init();
    }

    init() {
        if (!this.btn || !this.overlay) {
            console.warn('Elementi overlay filosofi non trovati');
            return;
        }

        this.bindEvents();
        this.setupAccessibility();
    }

    bindEvents() {
        // Mouse events
        this.btn.addEventListener('mouseenter', () => this.showOverlay());
        this.btn.addEventListener('mouseleave', () => this.hideOverlay());
        this.overlay.addEventListener('mouseenter', () => this.cancelHide());
        this.overlay.addEventListener('mouseleave', () => this.hideOverlay());

        // Keyboard events
        this.btn.addEventListener('keydown', (e) => this.handleKeydown(e));
        this.overlay.addEventListener('keydown', (e) => this.handleKeydown(e));

        // Click outside to close
        document.addEventListener('click', (e) => this.handleClickOutside(e));

        // Prevent overlay close when interacting with form elements
        this.overlay.addEventListener('focusin', () => this.cancelHide());
        this.overlay.addEventListener('focusout', (e) => {
            if (!this.overlay.contains(e.relatedTarget)) {
                this.hideOverlay();
            }
        });
    }

    setupAccessibility() {
        this.btn.setAttribute('aria-haspopup', 'true');
        this.btn.setAttribute('aria-expanded', 'false');
        this.overlay.setAttribute('role', 'dialog');
        this.overlay.setAttribute('aria-label', 'I Filosofi che hanno cambiato il paradigma');
        this.overlay.setAttribute('aria-modal', 'true');
        this.overlay.setAttribute('aria-hidden', 'true');
    }

    showOverlay() {
        this.cancelHide();
        this.overlay.style.display = 'block';
        this.overlay.style.opacity = '0';
        
        requestAnimationFrame(() => {
            this.overlay.style.opacity = '1';
            this.overlay.style.transform = 'translateY(0)';
            this.overlay.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
        });

        this.isVisible = true;
        this.btn.setAttribute('aria-expanded', 'true');
        this.overlay.setAttribute('aria-hidden', 'false');
        
        // Focus management
        setTimeout(() => {
            const firstFocusable = this.overlay.querySelector('button, input, [tabindex]');
            if (firstFocusable) firstFocusable.focus();
        }, 100);
    }

    hideOverlay() {
        this.hideTimeout = setTimeout(() => {
            this.overlay.style.opacity = '0';
            this.overlay.style.transform = 'translateY(-10px)';
            
            setTimeout(() => {
                if (this.isVisible) {
                    this.overlay.style.display = 'none';
                    this.isVisible = false;
                    this.btn.setAttribute('aria-expanded', 'false');
                    this.overlay.setAttribute('aria-hidden', 'true');
                    this.btn.focus();
                }
            }, 200);
        }, 300);
    }

    cancelHide() {
        if (this.hideTimeout) {
            clearTimeout(this.hideTimeout);
            this.hideTimeout = null;
        }
    }

    handleKeydown(e) {
        switch(e.key) {
            case 'Escape':
                if (this.isVisible) {
                    e.preventDefault();
                    this.hideOverlay();
                }
                break;
            case 'Enter':
            case ' ':
                if (e.target === this.btn && !this.isVisible) {
                    e.preventDefault();
                    this.showOverlay();
                }
                break;
            case 'Tab':
                if (this.isVisible) {
                    this.trapFocus(e);
                }
                break;
        }
    }

    trapFocus(e) {
        const focusableElements = this.overlay.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
        }
    }

    handleClickOutside(e) {
        if (this.isVisible && 
            !this.btn.contains(e.target) && 
            !this.overlay.contains(e.target)) {
            this.hideOverlay();
        }
    }

    // Public methods
    open() {
        this.showOverlay();
    }

    close() {
        this.hideOverlay();
    }

    toggle() {
        if (this.isVisible) {
            this.close();
        } else {
            this.open();
        }
    }
}

// Gestione Modale Newsletter
class NewsletterModal {
    constructor() {
        this.modal = document.getElementById('newsletterModal');
        this.form = document.getElementById('newsletterForm');
        this.closeBtn = this.modal?.querySelector('.close-modal');
        
        this.init();
    }

    init() {
        if (!this.modal || !this.form) {
            console.warn('Elementi modale newsletter non trovati');
            return;
        }

        this.bindEvents();
        this.setupAccessibility();
    }

    bindEvents() {
        // Close events
        this.modal.addEventListener('click', (e) => this.handleBackdropClick(e));
        this.closeBtn?.addEventListener('click', () => this.close());
        
        // Form submission
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Keyboard events
        document.addEventListener('keydown', (e) => this.handleKeydown(e));
        
        // Prevent form submission on Enter in inputs
        this.form.querySelectorAll('input').forEach(input => {
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && e.target.type !== 'submit') {
                    e.preventDefault();
                }
            });
        });
    }

    setupAccessibility() {
        this.modal.setAttribute('role', 'dialog');
        this.modal.setAttribute('aria-label', 'Iscriviti alla Newsletter');
        this.modal.setAttribute('aria-modal', 'true');
        this.modal.setAttribute('aria-hidden', 'true');
        
        if (this.closeBtn) {
            this.closeBtn.setAttribute('aria-label', 'Chiudi modale');
        }
    }

    show() {
        this.modal.style.display = 'flex';
        this.modal.style.opacity = '0';
        
        requestAnimationFrame(() => {
            this.modal.style.opacity = '1';
            this.modal.style.transition = 'opacity 0.3s ease';
        });

        this.modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        
        // Focus management
        setTimeout(() => {
            const firstInput = this.form.querySelector('input[type="email"]');
            if (firstInput) firstInput.focus();
        }, 100);
    }

    close() {
        this.modal.style.opacity = '0';
        
        setTimeout(() => {
            this.modal.style.display = 'none';
            this.modal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
            
            // Restore focus to the element that opened the modal
            const previousActiveElement = document.activeElement;
            if (previousActiveElement && document.body.contains(previousActiveElement)) {
                previousActiveElement.focus();
            }
        }, 300);
    }

    handleBackdropClick(e) {
        if (e.target === this.modal) {
            this.close();
        }
    }

    handleKeydown(e) {
        if (e.key === 'Escape' && this.modal.style.display === 'flex') {
            this.close();
        }
        
        // Trap focus within modal when open
        if (e.key === 'Tab' && this.modal.style.display === 'flex') {
            this.trapFocus(e);
        }
    }

    trapFocus(e) {
        const focusableElements = this.modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
        }
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        const emailInput = this.form.querySelector('input[type="email"]');
        const email = emailInput.value.trim();
        
        if (!this.validateEmail(email)) {
            this.showMessage('Inserisci un indirizzo email valido', 'error');
            emailInput.focus();
            return;
        }

        // Disable form during submission
        this.setFormState(true);
        
        try {
            // Simula invio (sostituisci con la tua API)
            await this.submitNewsletter(email);
            this.showMessage('Grazie per esserti iscritto! Controlla la tua email.', 'success');
            this.form.reset();
            setTimeout(() => this.close(), 2000);
        } catch (error) {
            this.showMessage('Errore durante l\'iscrizione. Riprova più tardi.', 'error');
        } finally {
            this.setFormState(false);
        }
    }

    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    setFormState(disabled) {
        const inputs = this.form.querySelectorAll('input, button');
        inputs.forEach(input => {
            input.disabled = disabled;
        });
        
        const submitBtn = this.form.querySelector('button[type="submit"]');
        if (submitBtn) {
            submitBtn.textContent = disabled ? 'Invio in corso...' : 'Iscriviti';
        }
    }

    async submitNewsletter(email) {
        // Simula ritardo di rete
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Simula successo (90% di successo)
        if (Math.random() > 0.1) {
            return { success: true };
        } else {
            throw new Error('Network error');
        }
    }

    showMessage(message, type = 'info') {
        // Rimuovi messaggi precedenti
        const existingMessage = this.modal.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Crea nuovo messaggio
        const messageEl = document.createElement('div');
        messageEl.className = `form-message form-message--${type}`;
        messageEl.textContent = message;
        messageEl.style.cssText = `
            padding: 0.8rem;
            margin: 1rem 0;
            border-radius: 6px;
            font-weight: 600;
            text-align: center;
            background: ${type === 'success' ? 'rgba(0,255,0,0.1)' : 'rgba(255,0,0,0.1)'};
            color: ${type === 'success' ? '#00ff00' : '#ff6b6b'};
            border: 1px solid ${type === 'success' ? 'rgba(0,255,0,0.3)' : 'rgba(255,0,0,0.3)'};
        `;
        
        this.form.insertBefore(messageEl, this.form.firstChild);
        
        // Auto-remove success messages
        if (type === 'success') {
            setTimeout(() => messageEl.remove(), 5000);
        }
    }
}

// Inizializzazione
document.addEventListener('DOMContentLoaded', function() {
    // Inizializza overlay filosofi
    window.filosofiOverlay = new FilosofiOverlay();
    
    // Inizializza modale newsletter
    window.newsletterModal = new NewsletterModal();
    
    // Espone le funzioni globali per l'HTML
    window.showNewsletterModal = () => window.newsletterModal?.show();
    window.closeNewsletterModal = () => window.newsletterModal?.close();
});

// Gestione errori globale
window.addEventListener('error', function(e) {
    console.error('Errore JavaScript:', e.error);
});

// Aggiungi questa funzione al tuo JavaScript esistente
function setupClearButton() {
    const searchInput = document.getElementById('dict-q');
    const clearButton = document.querySelector('.dict-clear-btn');
    
    if (!searchInput || !clearButton) return;
    
    // Mostra/nascondi pulsante X
    function toggleClearButton() {
        if (searchInput.value.length > 0) {
            clearButton.classList.add('visible');
        } else {
            clearButton.classList.remove('visible');
        }
    }
    
    // Cancella input
    function clearInput() {
        searchInput.value = '';
        searchInput.focus();
        toggleClearButton();
    }
    
    // Event listeners
    searchInput.addEventListener('input', toggleClearButton);
    clearButton.addEventListener('click', clearInput);
    
    // Inizializza stato
    toggleClearButton();
}

// Chiama la funzione quando il dizionario viene aperto
document.addEventListener('DOMContentLoaded', function() {
    setupClearButton();
});
