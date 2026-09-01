/* ============================================================
   Payton Henry, portfolio scripts
   ============================================================ */

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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

    if (prefersReducedMotion) {
        el.textContent = text;
        const c = document.createElement('span');
        c.className = 'cursor';
        c.textContent = '|';
        el.appendChild(c);
        return;
    }

    el.textContent = '';
    let i = 0;
    const timer = setInterval(() => {
        if (i < text.length) {
            el.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
            const c = document.createElement('span');
            c.className = 'cursor';
            c.textContent = '|';
            el.appendChild(c);
        }
    }, 90);
});

/* ---------- sticky header state ---------- */
document.addEventListener('DOMContentLoaded', function () {
    const header = document.querySelector('.site-header');
    if (!header) return;
    const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
});

/* ---------- mobile nav toggle ---------- */
document.addEventListener('DOMContentLoaded', function () {
    const toggle = document.querySelector('.nav-toggle');
    const links = document.getElementById('nav-links');
    if (!toggle || !links) return;

    const close = () => {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
    };

    toggle.addEventListener('click', function () {
        const open = links.classList.toggle('open');
        toggle.setAttribute('aria-expanded', String(open));
    });

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
