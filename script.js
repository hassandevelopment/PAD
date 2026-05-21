/* PAD — script.js */

/* ── Hero Photo Loop ────────────────────────────────────────── */
(function () {
  const slides = document.querySelectorAll('.hero-slide');
  if (!slides.length) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) {
    slides[0].classList.add('active');
    return;
  }

  let current = 0;
  const DISPLAY = 5000;
  const TRANSITION = 1200;

  /* Preload first two images */
  [0, 1].forEach(i => {
    if (slides[i]) {
      const img = slides[i].querySelector('img');
      if (img && img.dataset.src) {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
      }
    }
  });

  slides[current].classList.add('active');

  function advance() {
    const next = (current + 1) % slides.length;

    /* Lazy-load next image if not yet loaded */
    const nextImg = slides[next].querySelector('img');
    if (nextImg && nextImg.dataset.src) {
      nextImg.src = nextImg.dataset.src;
      nextImg.removeAttribute('data-src');
    }

    slides[current].classList.remove('active');
    slides[next].classList.add('active');
    current = next;

    /* Preload image after next */
    const afterNext = (next + 1) % slides.length;
    const afterImg = slides[afterNext].querySelector('img');
    if (afterImg && afterImg.dataset.src) {
      afterImg.src = afterImg.dataset.src;
      afterImg.removeAttribute('data-src');
    }
  }

  setInterval(advance, DISPLAY + TRANSITION);
})();

/* ── Nav Active State ───────────────────────────────────────── */
(function () {
  const path = window.location.pathname;
  const links = document.querySelectorAll('.nav-links a');

  links.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;

    const normalized = href.replace(/\/index\.html$/, '/').replace(/\.html$/, '');
    const currentNorm = path.replace(/\/index\.html$/, '/').replace(/\.html$/, '');

    if (
      (href === 'index.html' && (path === '/' || path.endsWith('/PAD/') || path.endsWith('/index.html'))) ||
      (href !== 'index.html' && currentNorm.endsWith(normalized) && href !== 'index.html')
    ) {
      link.classList.add('active');
    }
  });
})();

/* ── Project Prev / Next Keyboard Navigation ────────────────── */
(function () {
  const prevLink = document.querySelector('.project-nav .prev');
  const nextLink = document.querySelector('.project-nav .next');
  if (!prevLink && !nextLink) return;

  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft' && prevLink) prevLink.click();
    if (e.key === 'ArrowRight' && nextLink) nextLink.click();
  });
})();
