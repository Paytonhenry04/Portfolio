/* ============================================================
   Payton Henry, portfolio scripts
   ============================================================ */

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

/* ---------- scroll reveal ---------- */
// Runs immediately (this script loads at the end of <body>) so .reveal elements are
// hidden before first paint. Elements that enter view together are staggered.
(function () {
    const els = document.querySelectorAll('.reveal');
    if (!els.length || prefersReducedMotion || !('IntersectionObserver' in window)) return;

    document.documentElement.classList.add('reveal-on');

    const io = new IntersectionObserver((entries) => {
        entries
            .filter((entry) => entry.isIntersecting)
            .forEach((entry, k) => {
                const el = entry.target;
                el.style.transitionDelay = k * 90 + 'ms';
                el.classList.add('in');
                io.unobserve(el);
                // drop the delay once revealed so hover transitions stay snappy
                setTimeout(() => { el.style.transitionDelay = ''; }, 900 + k * 90);
            });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });

    els.forEach((el) => io.observe(el));
})();

/* ---------- EmailJS contact form ---------- */
(function () {
    if (typeof emailjs !== 'undefined') {
        emailjs.init('Fkeo8O2APo1iRktRh');
    }
})();

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contact-form');
    const status = document.getElementById('form-status');
    if (!form || typeof emailjs === 'undefined') return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        status.textContent = 'Sending...';
        status.style.color = '';

        emailjs.sendForm('service_u9gg547', 'template_j9w31lj', form).then(
            function () {
                status.textContent = 'Message sent. Thanks, I\'ll be in touch.';
                status.style.color = '#4caf50';
                form.reset();
                setTimeout(() => { status.textContent = ''; }, 6000);
            },
            function (error) {
                status.textContent = 'Something went wrong. Please try again or email me directly.';
                status.style.color = '#ff7043';
                console.error('EmailJS error:', error);
            }
        );
    });
});

/* ---------- typed hero title ---------- */
document.addEventListener('DOMContentLoaded', function () {
    const el = document.querySelector('[data-typed]');
    if (!el) return;
    const text = el.getAttribute('data-typed');

    // an invisible full copy (with cursor) holds the final size; the live copy types over it
    const span = (cls, content) => {
        const s = document.createElement('span');
        s.className = cls;
        s.setAttribute('aria-hidden', 'true');
        if (content) s.textContent = content;
        return s;
    };
    const ghost = span('typed-ghost', text + '|');
    const live = span('typed-live');
    const typed = document.createTextNode('');
    live.append(typed, span('cursor', '|'));

    el.setAttribute('aria-label', text);
    el.textContent = '';
    el.classList.add('typed');
    el.append(ghost, live);

    if (prefersReducedMotion) {
        typed.data = text;
        return;
    }

    let i = 0;
    setTimeout(function step() {
        typed.data = text.slice(0, ++i);
        if (i < text.length) setTimeout(step, 70 + Math.random() * 60);
    }, 450);
});

/* ---------- sticky header state, scroll progress, back-to-top ---------- */
document.addEventListener('DOMContentLoaded', function () {
    const header = document.querySelector('.site-header');
    if (!header) return;

    const bar = document.createElement('div');
    bar.className = 'scroll-progress';
    header.appendChild(bar);

    const top = document.createElement('button');
    top.type = 'button';
    top.className = 'to-top';
    top.setAttribute('aria-label', 'Back to top');
    top.innerHTML = '<i class="fas fa-arrow-up"></i>';
    top.addEventListener('click', () => window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' }));
    document.body.appendChild(top);

    let ticking = false;
    const update = () => {
        const y = window.scrollY;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        header.classList.toggle('scrolled', y > 20);
        bar.style.setProperty('--progress', max > 0 ? Math.min(y / max, 1) : 0);
        top.classList.toggle('show', y > window.innerHeight * 0.9);
        ticking = false;
    };
    update();
    window.addEventListener('scroll', () => {
        if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    window.addEventListener('resize', update);
});

/* ---------- highlight the nav link for the section in view ---------- */
document.addEventListener('DOMContentLoaded', function () {
    if (!('IntersectionObserver' in window)) return;
    const links = new Map();
    document.querySelectorAll('.nav-links a[href^="#"]').forEach((a) => {
        const section = document.querySelector(a.getAttribute('href'));
        if (section) links.set(section, a);
    });
    if (!links.size) return;

    const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            const a = links.get(entry.target);
            if (entry.isIntersecting) {
                links.forEach((other) => other.classList.remove('active'));
                a.classList.add('active');
            } else {
                a.classList.remove('active');
            }
        });
    }, { rootMargin: '-45% 0px -50% 0px' });

    links.forEach((_, section) => io.observe(section));
});

/* ---------- cursor spotlight on cards ---------- */
document.addEventListener('DOMContentLoaded', function () {
    if (!finePointer || prefersReducedMotion) return;
    document.querySelectorAll('.project, .resume-card, .term, .stat').forEach((card) => {
        card.classList.add('spot');
        card.addEventListener('pointermove', (e) => {
            const r = card.getBoundingClientRect();
            card.style.setProperty('--mx', e.clientX - r.left + 'px');
            card.style.setProperty('--my', e.clientY - r.top + 'px');
        });
    });
});

/* ---------- mobile nav toggle ---------- */
document.addEventListener('DOMContentLoaded', function () {
    const toggle = document.querySelector('.nav-toggle');
    const links = document.getElementById('nav-links');
    if (!toggle || !links) return;

    const icon = toggle.querySelector('i');
    const setOpen = (open) => {
        links.classList.toggle('open', open);
        toggle.setAttribute('aria-expanded', String(open));
        if (icon) icon.className = open ? 'fas fa-xmark' : 'fas fa-bars';
    };
    const close = () => setOpen(false);

    toggle.addEventListener('click', function () {
        setOpen(!links.classList.contains('open'));
    });

    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });

    links.querySelectorAll('a').forEach((a) => a.addEventListener('click', close));

    document.addEventListener('click', function (e) {
        if (!links.classList.contains('open')) return;
        if (!links.contains(e.target) && !toggle.contains(e.target)) close();
    });
});

/* ---------- smooth scroll for in-page anchors ---------- */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
        const id = this.getAttribute('href');
        if (id === '#' || id.length < 2) return;
        const target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
    });
});

/* ---------- textarea auto-grow ---------- */
document.addEventListener('DOMContentLoaded', function () {
    const ta = document.getElementById('messageTextarea');
    if (!ta) return;
    const grow = () => {
        ta.style.height = 'auto';
        ta.style.height = ta.scrollHeight + 'px';
    };
    ta.addEventListener('input', grow);
});

/* ---------- count-up numbers (education stats) ---------- */
document.addEventListener('DOMContentLoaded', function () {
    const els = document.querySelectorAll('[data-count-to]');
    if (!els.length) return;

    const run = (el) => {
        const raw = el.getAttribute('data-count-to');
        const target = parseFloat(raw);
        if (isNaN(target)) return;
        const dot = raw.indexOf('.');
        const decimals = dot === -1 ? 0 : raw.length - dot - 1;

        if (prefersReducedMotion) {
            el.textContent = target.toFixed(decimals);
            return;
        }

        const duration = 1100;
        const start = performance.now();
        const tick = (now) => {
            const p = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            el.textContent = (target * eased).toFixed(decimals);
            if (p < 1) requestAnimationFrame(tick);
            else el.textContent = target.toFixed(decimals);
        };
        el.textContent = (0).toFixed(decimals);
        requestAnimationFrame(tick);
    };

    if (!('IntersectionObserver' in window)) {
        els.forEach(run);
        return;
    }

    const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                run(entry.target);
                io.unobserve(entry.target);
            }
        });
    }, { threshold: 0.4 });

    els.forEach((el) => io.observe(el));
});

/* ---------- limit screenshot strips with a "show more" button ---------- */
document.addEventListener('DOMContentLoaded', function () {
    const PREVIEW = 3;
    document.querySelectorAll('.shots').forEach((strip) => {
        const imgs = Array.from(strip.querySelectorAll('img'));
        if (imgs.length <= PREVIEW) return;

        const extra = imgs.slice(PREVIEW);
        extra.forEach((img) => { img.hidden = true; });

        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'shots-toggle';
        const showText = 'Show ' + extra.length + ' more';
        btn.textContent = showText;

        btn.addEventListener('click', () => {
            const willShow = extra[0].hidden;
            extra.forEach((img) => { img.hidden = !willShow; });
            btn.textContent = willShow ? 'Show fewer' : showText;
        });

        strip.insertAdjacentElement('afterend', btn);
    });
});

/* ---------- lightbox for project screenshots ---------- */
document.addEventListener('DOMContentLoaded', function () {
    const box = document.getElementById('lightbox');
    if (!box) return;
    const boxImg = box.querySelector('img');
    const closeBtn = box.querySelector('.lightbox-close');

    const open = (src, alt) => {
        boxImg.src = src;
        boxImg.alt = alt || '';
        box.classList.add('open');
        box.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    };
    const close = () => {
        box.classList.remove('open');
        box.setAttribute('aria-hidden', 'true');
        boxImg.src = '';
        document.body.style.overflow = '';
    };

    document.querySelectorAll('.shots img').forEach((img) => {
        img.addEventListener('click', () => open(img.currentSrc || img.src, img.alt));
    });

    closeBtn.addEventListener('click', close);
    box.addEventListener('click', (e) => { if (e.target === box) close(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && box.classList.contains('open')) close(); });
});
