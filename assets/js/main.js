/* ==========================================================================
   BLOCKS.EXPERT - SHARED JAVASCRIPT
   ========================================================================== */

(function() {
    'use strict';

    // --- Header HTML ---
    const headerHtml = `
        <div class="container header-inner">
            <a href="/" class="logo-lockup" aria-label="Blocks.expert Homepage">
                blocks<span>.expert</span>
            </a>
            <nav class="nav-links" aria-label="Primary">
                <a href="/pillars/play.html">Play</a>
                <a href="/pillars/learn.html">Learn</a>
                <a href="/pillars/organize.html">Organize</a>
                <a href="/pillars/focus.html">Focus</a>
                <a href="/pillars/grow.html">Grow</a>
                <a href="/about.html">About</a>
            </nav>
            <button class="menu-toggle" aria-label="Toggle navigation menu" aria-expanded="false" aria-controls="mobile-nav">
                <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
            </button>
        </div>
        <nav class="mobile-nav" id="mobile-nav" aria-label="Mobile">
            <a href="/pillars/play.html">Play</a>
            <a href="/pillars/learn.html">Learn</a>
            <a href="/pillars/organize.html">Organize</a>
            <a href="/pillars/focus.html">Focus</a>
            <a href="/pillars/grow.html">Grow</a>
            <a href="/about.html">About</a>
        </nav>
    `;

    // --- Footer HTML ---
    const footerHtml = `
        <div class="container">
            <div class="footer-grid">
                <div>
                    <div class="footer-logo">blocks<span>.expert</span></div>
                    <p>Structured Creativity for Every Mind.</p>
                </div>
                <div>
                    <h4>Explore</h4>
                    <ul>
                        <li><a href="/pillars/play.html">Play</a></li>
                        <li><a href="/pillars/learn.html">Learn</a></li>
                        <li><a href="/pillars/organize.html">Organize</a></li>
                        <li><a href="/pillars/focus.html">Focus</a></li>
                        <li><a href="/pillars/grow.html">Grow</a></li>
                    </ul>
                </div>
                <div>
                    <h4>Resources</h4>
                    <ul>
                        <li><a href="/articles/">Articles</a></li>
                        <li><a href="/sandbox/">Sandbox</a></li>
                        <li><a href="/about.html">About Us</a></li>
                    </ul>
                </div>
                <div>
                    <h4>Connect</h4>
                    <ul>
                        <li><a href="#" rel="noopener">Instagram</a></li>
                        <li><a href="#" rel="noopener">Substack</a></li>
                        <li><a href="mailto:hello@blocks.expert">Contact</a></li>
                    </ul>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; ${new Date().getFullYear()} Blocks.expert. All rights reserved.</p>
                <p>Blocks.expert participates in affiliate programs including Amazon Associates. We may earn a commission on purchases made through our links, at no extra cost to you.</p>
            </div>
        </div>
    `;

    // --- Email Validation Regex ---
    // Basic but practical: requires text@text.tld with reasonable boundaries
    const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    // --- Touch Detection ---
    const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

    // --- Init on DOM Ready ---
    document.addEventListener('DOMContentLoaded', init);

    function init() {
        injectHeaderFooter();
        initMobileMenu();
        initFallingB();
        initNewsletterForm();
        initFeedbackWidgets();
        initArticleFilters();
    }

    // --- 1. Header & Footer Injection ---
    function injectHeaderFooter() {
        const headerEl = document.getElementById('site-header');
        if (headerEl) headerEl.innerHTML = headerHtml;

        const footerEl = document.getElementById('site-footer');
        if (footerEl) footerEl.innerHTML = footerHtml;
    }

    // --- 2. Mobile Menu ---
    function initMobileMenu() {
        const menuToggle = document.querySelector('.menu-toggle');
        const mobileNav = document.querySelector('.mobile-nav');
        if (!menuToggle || !mobileNav) return;

        function closeMenu() {
            menuToggle.setAttribute('aria-expanded', 'false');
            mobileNav.classList.remove('active');
        }

        function openMenu() {
            menuToggle.setAttribute('aria-expanded', 'true');
            mobileNav.classList.add('active');
        }

        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
            isOpen ? closeMenu() : openMenu();
        });

        // Close on Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
                closeMenu();
                menuToggle.focus();
            }
        });

        // Close on click outside
        document.addEventListener('click', (e) => {
            if (!mobileNav.classList.contains('active')) return;
            if (!mobileNav.contains(e.target) && !menuToggle.contains(e.target)) {
                closeMenu();
            }
        });

        // Close on nav link click
        mobileNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeMenu);
        });
    }

    // --- 3. Falling-B Animation ---
    function initFallingB() {
        const fallingB = document.getElementById('falling-b');
        if (!fallingB) return;

        // Respect reduced motion
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return;
        }

        let resetTimer = null;

        function fall() {
            fallingB.classList.add('fallen');
        }

        function rise() {
            fallingB.classList.remove('fallen');
        }

        if (isTouchDevice) {
            // Touch: tap to toggle, auto-reset after 2s
            fallingB.addEventListener('click', () => {
                if (fallingB.classList.contains('fallen')) {
                    rise();
                    clearTimeout(resetTimer);
                } else {
                    fall();
                    clearTimeout(resetTimer);
                    resetTimer = setTimeout(rise, 2000);
                }
            });
        } else {
            // Desktop: hover to fall, leave to rise
            fallingB.addEventListener('mouseenter', fall);
            fallingB.addEventListener('mouseleave', rise);
            // Keyboard: focus + Enter/Space
            fallingB.setAttribute('tabindex', '0');
            fallingB.setAttribute('role', 'button');
            fallingB.setAttribute('aria-label', 'Animated Blocks.expert logo — press to play');
            fallingB.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    fall();
                    clearTimeout(resetTimer);
                    resetTimer = setTimeout(rise, 2000);
                }
            });
            fallingB.addEventListener('focus', fall);
            fallingB.addEventListener('blur', rise);
        }
    }

    // --- 4. Newsletter Form ---
    function initNewsletterForm() {
        const forms = document.querySelectorAll('#newsletter-form, .newsletter-form');
        forms.forEach(form => {
            // Avoid double-binding if both selectors match the same form
            if (form.dataset.bound) return;
            form.dataset.bound = 'true';

            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const emailInput = form.querySelector('input[type="email"]');
                const btn = form.querySelector('button[type="submit"]');
                // Find feedback element near this specific form
                const msg = form.parentElement.querySelector('.form-message') ||
                            document.getElementById('form-feedback');

                if (!emailInput || !btn || !msg) return;

                const email = emailInput.value.trim();

                // Validate
                if (!EMAIL_REGEX.test(email)) {
                    msg.textContent = 'Please enter a valid email address.';
                    msg.classList.add('visible', 'error');
                    return;
                }

                msg.classList.remove('error');
                btn.disabled = true;
                btn.textContent = 'Sending...';

                // Simulate submission (in production, replace with real endpoint)
                setTimeout(() => {
                    msg.textContent = 'Thank you — check your inbox to confirm.';
                    msg.classList.add('visible');
                    msg.classList.remove('error');
                    emailInput.value = '';
                    btn.disabled = false;
                    btn.textContent = 'Subscribe';
                }, 800);
            });
        });
    }

    // --- 5. Feedback Widget ---
    function initFeedbackWidgets() {
        const widgets = document.querySelectorAll('.feedback-widget');
        widgets.forEach(widget => {
            const buttons = widget.querySelectorAll('.feedback-btn');
            buttons.forEach(btn => {
                btn.addEventListener('click', () => {
                    const response = btn.dataset.response;
                    const message = response === 'yes'
                        ? 'Thank you — glad it helped.'
                        : 'Thanks for the feedback. We will work to improve it.';
                    widget.innerHTML = `<p style="padding: var(--space-4) 0;">${message}</p>`;
                });
            });
        });
    }

    // --- 6. Article Filters & Search ---
    function initArticleFilters() {
        const chipsContainer = document.getElementById('filter-chips');
        const searchInput = document.getElementById('article-search');
        const grid = document.getElementById('articles-grid');
        if (!chipsContainer || !grid) return;

        const chips = chipsContainer.querySelectorAll('.chip');
        const cards = grid.querySelectorAll('.article-card');
        let currentFilter = 'all';
        let currentSearch = '';

        function updateGrid() {
            cards.forEach(card => {
                const category = card.dataset.category || '';
                const titleEl = card.querySelector('.card-title') || card.querySelector('h4');
                const title = titleEl ? titleEl.textContent.toLowerCase() : '';
                const matchesFilter = currentFilter === 'all' || category === currentFilter;
                const matchesSearch = !currentSearch || title.includes(currentSearch);
                card.classList.toggle('hidden', !(matchesFilter && matchesSearch));
            });
        }

        chips.forEach(chip => {
            chip.addEventListener('click', () => {
                chips.forEach(c => c.classList.remove('active'));
                chip.classList.add('active');
                currentFilter = chip.dataset.filter;
                updateGrid();
            });
        });

        if (searchInput) {
            let debounce;
            searchInput.addEventListener('input', (e) => {
                clearTimeout(debounce);
                debounce = setTimeout(() => {
                    currentSearch = e.target.value.toLowerCase().trim();
                    updateGrid();
                }, 150);
            });
        }
    }
})();
